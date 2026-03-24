import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    if (window.matchMedia('(max-width: 768px)').matches) return

    let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0
    let rafId

    const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
    document.addEventListener('mousemove', onMove)

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08
      glowY += (mouseY - glowY) * 0.08
      glow.style.left = glowX + 'px'
      glow.style.top = glowY + 'px'
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return <div className="cursor-glow" ref={glowRef} />
}
