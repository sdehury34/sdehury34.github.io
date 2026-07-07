import { useEffect, useRef } from 'react'

// Interactive "acoustic wavefield" — a nod to ultrasound imaging.
// A grid of tissue-like particles that expanding wavefronts propagate
// through: a periodic heartbeat pulse, small pulses along the cursor
// path, and a strong pulse on click. A faint ECG trace scrolls along
// the bottom. Renders behind the hero content; static when the user
// prefers reduced motion.
export default function UltrasoundField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const SPACING = 46
    const WAVE_SPEED = 240 // px per second
    const BAND = 30 // wavefront thickness
    let width = 0
    let height = 0
    let points = []
    let ripples = []
    let raf = 0
    let beatTimer = 0.6
    let ecgOffset = 0
    let lastMouse = null

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      points = []
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          points.push({ x, y })
        }
      }
      if (reduceMotion) drawStatic()
    }

    const pulse = (x, y, strength) => {
      if (ripples.length > 14) ripples.shift()
      ripples.push({ x, y, r: 0, strength })
    }

    // idealized ECG beat (P wave, QRS complex, T wave), period = 1
    const ecg = (t) => {
      const ph = ((t % 1) + 1) % 1
      const g = (center, sigma, amp) =>
        amp * Math.exp(-((ph - center) ** 2) / (2 * sigma * sigma))
      return (
        g(0.18, 0.025, 0.15) +
        g(0.37, 0.012, -0.1) +
        g(0.4, 0.009, 1) +
        g(0.44, 0.014, -0.2) +
        g(0.62, 0.045, 0.3)
      )
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(154, 163, 181, 0.18)'
      for (const p of points) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let last = performance.now()
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      ctx.clearRect(0, 0, width, height)

      // fallback heartbeat pulse if the 3D heart isn't emitting (~66 bpm)
      beatTimer -= dt
      if (beatTimer <= 0) {
        pulse(width * 0.72, height * 0.42, 1.3)
        beatTimer = 1.8
      }

      const maxR = Math.max(width, height) * 1.1
      ripples.forEach((rp) => (rp.r += WAVE_SPEED * dt))
      ripples = ripples.filter((rp) => rp.r < maxR)

      // tissue particles, displaced radially as wavefronts pass
      for (const p of points) {
        let dx = 0
        let dy = 0
        let energy = 0
        for (const rp of ripples) {
          const ddx = p.x - rp.x
          const ddy = p.y - rp.y
          const dist = Math.hypot(ddx, ddy) || 1
          const band = Math.exp(-((dist - rp.r) ** 2) / (2 * BAND * BAND))
          const fade = Math.max(0, 1 - rp.r / 750) * rp.strength
          const f = band * fade
          if (f > 0.01) {
            dx += (ddx / dist) * f * 13
            dy += (ddy / dist) * f * 13
            energy += f
          }
        }
        ctx.beginPath()
        ctx.arc(p.x + dx, p.y + dy, 1.1 + Math.min(energy, 1) * 1.7, 0, Math.PI * 2)
        ctx.fillStyle =
          energy > 0.08
            ? `rgba(56, 189, 248, ${Math.min(0.12 + energy * 0.55, 0.85)})`
            : 'rgba(154, 163, 181, 0.15)'
        ctx.fill()
      }

      // faint wavefront rings
      for (const rp of ripples) {
        const fade = Math.max(0, 1 - rp.r / 750) * rp.strength
        if (fade <= 0.03) continue
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.09 * fade})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // scrolling ECG trace near the bottom
      ecgOffset += dt * 150
      const base = height - 84
      ctx.beginPath()
      for (let x = 0; x <= width; x += 3) {
        const y = base - ecg((x + ecgOffset) / 420) * 44
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)'
      ctx.lineWidth = 1.4
      ctx.stroke()

      raf = requestAnimationFrame(frame)
    }

    const toLocal = (e) => {
      const rect = host.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMove = (e) => {
      const { x, y } = toLocal(e)
      // emit a small pulse every ~90px of cursor travel
      if (!lastMouse || Math.hypot(x - lastMouse.x, y - lastMouse.y) > 90) {
        lastMouse = { x, y }
        pulse(x, y, 0.55)
      }
    }
    const onClick = (e) => {
      const { x, y } = toLocal(e)
      pulse(x, y, 2)
    }
    // ripple in sync with the 3D heart's systole
    const onHeartbeat = (e) => {
      const rect = host.getBoundingClientRect()
      pulse(e.detail.x - rect.left, e.detail.y - rect.top, 1.3)
      beatTimer = 3 // suppress the fallback while the heart is beating
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) {
      host.addEventListener('pointermove', onMove)
      host.addEventListener('click', onClick)
      window.addEventListener('heartbeat', onHeartbeat)
      raf = requestAnimationFrame(frame)
    }
    return () => {
      window.removeEventListener('resize', resize)
      host.removeEventListener('pointermove', onMove)
      host.removeEventListener('click', onClick)
      window.removeEventListener('heartbeat', onHeartbeat)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="us-canvas" aria-hidden="true" />
}
