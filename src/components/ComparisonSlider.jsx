import { useEffect, useRef, useState } from 'react'

export default function ComparisonSlider({ beforeSrc, afterSrc }) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)

  const updatePos = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    let p = ((clientX - rect.left) / rect.width) * 100
    p = Math.max(2, Math.min(98, p))
    setPosition(p)
  }

  useEffect(() => {
    const onMouseMove = e => { if (dragging.current) updatePos(e.clientX) }
    const onMouseUp = () => { dragging.current = false }
    const onTouchMove = e => { if (dragging.current) updatePos(e.touches[0].clientX) }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onMouseUp)
    }
  }, [])

  return (
    <div
      className="comparison-container fade-in"
      ref={containerRef}
      onMouseDown={e => { dragging.current = true; updatePos(e.clientX); e.preventDefault() }}
      onTouchStart={e => { dragging.current = true; updatePos(e.touches[0].clientX) }}
    >
      {/* Before */}
      <div className="comparison-image comparison-before">
        <img src={beforeSrc} alt="Before cleanup" />
        <span className="comparison-label comparison-label-before">Before</span>
      </div>
      {/* After */}
      <div className="comparison-image comparison-after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <img src={afterSrc} alt="After cleanup" />
        <span className="comparison-label comparison-label-after">After</span>
      </div>
      {/* Handle */}
      <div className="comparison-handle" style={{ left: `${position}%` }}>
        <div className="handle-line" />
        <div className="handle-circle"><i className="fas fa-arrows-alt-h"></i></div>
        <div className="handle-line" />
      </div>
    </div>
  )
}
