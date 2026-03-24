import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <NavLink to="/" className="nav-brand">
          <span className="brand-icon"><i className="fas fa-leaf"></i></span>
          Clean Rouse Hill
        </NavLink>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/issue', label: 'The Issue' },
            { to: '/data', label: 'Data & Insights' },
            { to: '/solutions', label: 'Solutions' },
            { to: '/help', label: 'How to Help' },
            { to: '/about', label: 'About & Contact' },
            { to: '/development', label: 'Project Dev' },
          ].map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div
          className="mobile-toggle"
          onClick={() => setMenuOpen(o => !o)}
          role="button"
          aria-label="Toggle menu"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  )
}
