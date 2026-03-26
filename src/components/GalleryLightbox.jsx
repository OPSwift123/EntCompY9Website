import { useState, useEffect, useCallback, useRef } from 'react'

const galleryImages = [
  { src: '/images/hero_aerial.png', caption: 'Aerial view of Rouse Hill parklands' },
  { src: '/images/litter_in_park.png', caption: 'Litter scattered across a park' },
  { src: '/images/community_volunteers.png', caption: 'Community volunteers doing a cleanup' },
  { src: '/images/before_after_cleanup.png', caption: 'Before and after cleanup comparison' },
  { src: '/images/litter_impact.png', caption: 'Impact of litter on local wildlife and environment' },
  { src: '/images/community_cleanup.png', caption: 'Students leading a local park cleanup' },
]

export default function GalleryLightbox() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const gridRef = useRef(null)

  // Observe gallery items for fade-in
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const items = grid.querySelectorAll('.gallery-item.fade-in')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  const open = (i) => { setLightboxIndex(i); document.body.style.overflow = 'hidden' }
  const close = useCallback(() => { setLightboxIndex(null); document.body.style.overflow = '' }, [])
  const prev = useCallback(() => setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length), [])
  const next = useCallback(() => setLightboxIndex(i => (i + 1) % galleryImages.length), [])

  useEffect(() => {
    const onKey = e => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, close, prev, next])

  // Clean up overflow on unmount
  useEffect(() => () => { document.body.style.overflow = '' }, [])

  return (
    <>
      <div className="gallery-grid" id="gallery" ref={gridRef}>
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="gallery-item fade-in"
            onClick={() => open(i)}
          >
            <img src={img.src} alt={img.caption} loading="lazy" />
            <div className="gallery-overlay">
              <i className="fas fa-expand"></i>
              <span>{img.caption.split(' ').slice(0, 3).join(' ')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox${lightboxIndex !== null ? ' active' : ''}`}
        onClick={e => { if (e.target.classList.contains('lightbox')) close() }}
      >
        <button className="lightbox-close" onClick={close}><i className="fas fa-times"></i></button>
        <button className="lightbox-nav lightbox-prev" onClick={prev}><i className="fas fa-chevron-left"></i></button>
        <button className="lightbox-nav lightbox-next" onClick={next}><i className="fas fa-chevron-right"></i></button>
        <div className="lightbox-content">
          {lightboxIndex !== null && (
            <>
              <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].caption} />
              <div className="lightbox-caption">{galleryImages[lightboxIndex].caption}</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
