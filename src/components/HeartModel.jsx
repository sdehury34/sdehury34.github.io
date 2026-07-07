import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Interactive 3D point-cloud heart (Three.js). The cloud is sampled from
// the Taubin heart implicit surface, beats at the same period as the
// acoustic wavefield, tilts toward the cursor, and emits a 'heartbeat'
// event on each systole so the 2D wavefield can ripple in sync.
export const BEAT_PERIOD = 1.8 // seconds

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

    // Taubin heart: negative inside the heart volume (y up after swap)
    const heartField = (x, y, z) => {
      const a = x * x + (9 / 4) * z * z + y * y - 1
      return a * a * a - x * x * y * y * y - (9 / 80) * z * z * y * y * y
    }

    // rejection-sample points inside the volume, denser near the surface
    const COUNT = 4200
    const positions = new Float32Array(COUNT * 3)
    const shades = new Float32Array(COUNT) // 0..1 mixes sky→teal
    let placed = 0
    while (placed < COUNT) {
      const x = (Math.random() * 2 - 1) * 1.4
      const y = (Math.random() * 2 - 1) * 1.4
      const z = (Math.random() * 2 - 1) * 1.4
      const f = heartField(x, y, z)
      if (f < 0) {
        // keep mostly shell points: resample deep-interior ones sparsely
        const nearSurface = f > -0.05
        if (!nearSurface && Math.random() > 0.18) continue
        positions[placed * 3] = x
        positions[placed * 3 + 1] = y
        positions[placed * 3 + 2] = z
        shades[placed] = Math.random()
        placed++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const colors = new Float32Array(COUNT * 3)
    const sky = new THREE.Color('#38bdf8')
    const teal = new THREE.Color('#2dd4bf')
    const tmp = new THREE.Color()
    for (let i = 0; i < COUNT; i++) {
      tmp.copy(sky).lerp(teal, shades[i])
      colors[i * 3] = tmp.r
      colors[i * 3 + 1] = tmp.g
      colors[i * 3 + 2] = tmp.b
    }
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
    heart.rotation.x = 0.15
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
    let targetRX = 0.15
    let targetRY = 0
    const onMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      targetRY = nx * 0.55
      targetRX = 0.15 + ny * 0.3
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

      const s = 1 + beat(phase) * 0.09
      heart.scale.setScalar(s)
      heart.rotation.y += (targetRY + t * 0.12 - heart.rotation.y) * 0.04
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
