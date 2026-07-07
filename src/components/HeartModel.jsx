import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'

// Interactive 3D point-cloud anatomical heart (Three.js).
// The cloud is sampled from a procedurally built cardiac anatomy:
// ventricular mass with apex, left/right atria, aortic arch,
// pulmonary trunk, and superior vena cava. It beats at the same
// period as the acoustic wavefield, tilts toward the cursor, and
// emits a 'heartbeat' event on each systole so the 2D wavefield
// can ripple in sync.
export const BEAT_PERIOD = 1.8 // seconds

// ventricular mass: sphere tapered below the equator into an apex,
// sheared slightly so the apex points down-left (anatomical position)
function ventricleGeometry() {
  const geo = new THREE.SphereGeometry(1, 48, 48)
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i)
    let y = pos.getY(i)
    let z = pos.getZ(i)
    if (y < 0) {
      const s = Math.max(1 + y * 0.6, 0.06)
      x *= s
      z *= s
      y *= 1.3
      x -= y * 0.22 // shear apex toward the left
    }
    pos.setXYZ(i, x, y, z)
  }
  geo.computeVertexNormals()
  return geo
}

function tube(points, radius) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
  )
  return new THREE.TubeGeometry(curve, 40, radius, 12)
}

// parts: [geometry, transform, count, colorA, colorB]
function buildParts() {
  const chamberA = '#38bdf8'
  const chamberB = '#2dd4bf'
  const vesselA = '#7dd3fc'
  const vesselB = '#5eead4'

  const ventricles = ventricleGeometry()

  const leftAtrium = new THREE.SphereGeometry(0.45, 32, 32)
  const rightAtrium = new THREE.SphereGeometry(0.5, 32, 32)

  const aorta = tube(
    [
      [0.1, 0.55, 0.02],
      [0.12, 1.05, 0],
      [-0.15, 1.3, -0.02],
      [-0.5, 1.15, -0.05],
      [-0.62, 0.75, -0.08],
      [-0.55, 0.35, -0.1],
    ],
    0.155,
  )
  const pulmonary = tube(
    [
      [0.32, 0.5, 0.2],
      [0.15, 0.9, 0.3],
      [-0.18, 1.0, 0.32],
      [-0.42, 0.88, 0.3],
    ],
    0.115,
  )
  const venaCava = tube(
    [
      [0.62, 1.18, 0],
      [0.58, 0.8, 0.03],
      [0.5, 0.55, 0.05],
    ],
    0.1,
  )

  const t = (px, py, pz, sx = 1, sy = 1, sz = 1) => {
    const m = new THREE.Matrix4()
    m.compose(
      new THREE.Vector3(px, py, pz),
      new THREE.Quaternion(),
      new THREE.Vector3(sx, sy, sz),
    )
    return m
  }

  return [
    [ventricles, t(0, -0.18, 0, 0.98, 1.05, 0.88), 2400, chamberA, chamberB],
    [leftAtrium, t(-0.42, 0.62, -0.12, 1, 0.82, 0.9), 420, chamberA, chamberB],
    [rightAtrium, t(0.45, 0.55, 0.02, 0.95, 0.85, 0.9), 480, chamberA, chamberB],
    [aorta, t(0, 0, 0), 620, vesselA, vesselB],
    [pulmonary, t(0, 0, 0), 330, vesselA, vesselB],
    [venaCava, t(0, 0, 0), 230, vesselA, vesselB],
  ]
}

export default function HeartModel() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 4.2)

    const parts = buildParts()
    const total = parts.reduce((n, p) => n + p[2], 0)
    const positions = new Float32Array(total * 3)
    const colors = new Float32Array(total * 3)

    const v = new THREE.Vector3()
    const tmp = new THREE.Color()
    let offset = 0
    for (const [geo, matrix, count, colA, colB] of parts) {
      const mesh = new THREE.Mesh(geo)
      const sampler = new MeshSurfaceSampler(mesh).build()
      const a = new THREE.Color(colA)
      const b = new THREE.Color(colB)
      for (let i = 0; i < count; i++) {
        sampler.sample(v)
        v.applyMatrix4(matrix)
        positions[(offset + i) * 3] = v.x
        positions[(offset + i) * 3 + 1] = v.y
        positions[(offset + i) * 3 + 2] = v.z
        tmp.copy(a).lerp(b, Math.random())
        colors[(offset + i) * 3] = tmp.r
        colors[(offset + i) * 3 + 1] = tmp.g
        colors[(offset + i) * 3 + 2] = tmp.b
      }
      offset += count
      geo.dispose()
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const heart = new THREE.Points(geometry, material)
    heart.scale.setScalar(0.82)
    heart.rotation.x = 0.12
    scene.add(heart)

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    // cursor parallax (whole window, so it works despite pointer-events:none)
    let targetRX = 0.12
    let targetRY = 0
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      targetRY = nx * 0.55
      targetRX = 0.12 + ny * 0.3
    }
    window.addEventListener('pointermove', onMove)

    // spiky systole curve, period 1
    const beat = (t) => {
      const ph = ((t % 1) + 1) % 1
      return (
        Math.exp(-(((ph - 0.12) / 0.05) ** 2)) +
        0.45 * Math.exp(-(((ph - 0.32) / 0.08) ** 2))
      )
    }

    const emitBeat = () => {
      const rect = mount.getBoundingClientRect()
      window.dispatchEvent(
        new CustomEvent('heartbeat', {
          detail: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          },
        }),
      )
    }

    let raf = 0
    let start = performance.now()
    let lastBeatIndex = -1
    const frame = (now) => {
      const t = (now - start) / 1000
      const phase = t / BEAT_PERIOD

      const beatIndex = Math.floor(phase)
      if (beatIndex !== lastBeatIndex) {
        lastBeatIndex = beatIndex
        emitBeat()
      }

      const s = 0.82 * (1 + beat(phase) * 0.08)
      heart.scale.setScalar(s)
      heart.rotation.y += (targetRY + t * 0.1 - heart.rotation.y) * 0.04
      heart.rotation.x += (targetRX - heart.rotation.x) * 0.06
      material.opacity = 0.72 + beat(phase) * 0.25

      renderer.render(scene, camera)
      raf = requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      renderer.render(scene, camera)
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="heart-canvas" aria-hidden="true" />
}
