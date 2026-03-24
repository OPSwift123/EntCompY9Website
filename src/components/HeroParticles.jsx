import { useEffect, useRef } from 'react'

export default function HeroParticles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // create particles
    const count = 30
    const particles = []
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.classList.add('particle')
      const size = Math.random() * 4 + 2
      p.style.width = size + 'px'
      p.style.height = size + 'px'
      p.style.left = Math.random() * 100 + '%'
      p.style.animationDuration = (Math.random() * 10 + 8) + 's'
      p.style.animationDelay = (Math.random() * 10) + 's'
      p.style.opacity = Math.random() * 0.4 + 0.1
      container.appendChild(p)
      particles.push(p)
    }
    return () => particles.forEach(p => p.remove())
  }, [])

  return <div className="hero-particles" ref={containerRef} />
}
