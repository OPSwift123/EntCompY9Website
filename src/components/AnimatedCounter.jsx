import { useEffect, useRef } from 'react'

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (num >= 1000) return num.toLocaleString()
  return num.toString()
}

export default function AnimatedCounter({ target, prefix = '', suffix = '' }) {
  const el = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const node = el.current
    if (!node) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          observer.unobserve(node)
          const duration = 2000
          const start = performance.now()
          const easeOutQuart = t => 1 - Math.pow(1 - t, 4)
          const update = now => {
            const progress = Math.min((now - start) / duration, 1)
            const current = Math.floor(easeOutQuart(progress) * target)
            node.textContent = prefix + formatNumber(current) + suffix
            if (progress < 1) requestAnimationFrame(update)
            else node.textContent = prefix + formatNumber(target) + suffix
          }
          requestAnimationFrame(update)
        }
      })
    }, { threshold: 0.5 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, prefix, suffix])

  return <div className="stat-number" ref={el}>0</div>
}
