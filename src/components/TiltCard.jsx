import { useEffect, useRef } from 'react'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const card = ref.current
    if (!card) return
    if (window.matchMedia('(max-width: 768px)').matches) return

    const onMove = e => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    }
    const onLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className={`tilt-card ${className}`} ref={ref}>
      {children}
    </div>
  )
}
