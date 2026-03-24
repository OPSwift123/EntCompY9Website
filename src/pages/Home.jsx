import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import TiltCard from '../components/TiltCard'
import AnimatedCounter from '../components/AnimatedCounter'
import ComparisonSlider from '../components/ComparisonSlider'
import HeroParticles from '../components/HeroParticles'
import GalleryLightbox from '../components/GalleryLightbox'

export default function Home() {
  const heroImgRef = useRef(null)

  // Parallax
  useEffect(() => {
    const img = heroImgRef.current
    if (!img) return
    img.style.transform = 'scale(1.1)'
    const onScroll = () => {
      const scrollY = window.scrollY
      if (scrollY < window.innerHeight) {
        img.style.transform = `translateY(${scrollY * 0.3}px) scale(1.1)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ===== HERO ===== */}
      <header className="hero" id="hero">
        <div className="hero-bg-image">
          <img
            ref={heroImgRef}
            src="https://images.pexels.com/photos/1528361/pexels-photo-1528361.jpeg"
            alt="Aerial view of Rouse Hill parklands"
          />
        </div>
        <div className="hero-overlay" />
        <HeroParticles />

        <div className="container hero-container">
          <FadeIn className="hero-glass-panel" id="heroPanel">
            <span className="hero-badge">
              <i className="fas fa-leaf"></i> Rouse Hill Community Initiative
            </span>
            <h1>Reducing Littering<br />in <span className="gradient-text">Rouse Hill</span></h1>
            <p>Littering has become a growing issue in Rouse Hill — affecting our parks, wildlife, and community spaces. This website uses real data, community voices, and interactive media to explore the impact and drive change.</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/issue" className="btn btn-primary btn-glow">Explore the Issue <i className="fas fa-arrow-right"></i></Link>
              <Link to="/help" className="btn btn-outline btn-glass">Take the Pledge <i className="fas fa-check"></i></Link>
            </div>
            <div className="stat-chips">
              <span className="stat-chip glass-chip"><span>🌿</span> Community-led initiative</span>
              <span className="stat-chip glass-chip"><span>📍</span> Rouse Hill, NSW</span>
              <span className="stat-chip glass-chip"><span>♻️</span> Real data &amp; insights</span>
            </div>
          </FadeIn>

          <div className="hero-video-panel fade-in">
            <div className="video-glass-wrap">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/2W1iC3YIpao"
                title="Introduction to the Rouse Hill littering issue"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </header>

      {/* Wave Divider */}
      <div className="wave-divider" style={{ background: 'var(--background)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ height: '60px' }}>
          <path fill="#1b4332" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* ===== IMPACT STATS ===== */}
      <section className="section stats-section" id="statsSection">
        <div className="container">
          <FadeIn className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-badge"><i className="fas fa-chart-bar"></i> The Numbers</span>
            <h2>The Impact of <span className="gradient-text">Littering</span></h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>The data paints a stark picture — littering affects ecosystems, costs communities millions, and threatens wildlife.</p>
          </FadeIn>
          <div className="grid-4 stats-grid">
            {[
              { icon: 'fa-weight-hanging', target: 8700000, suffix: ' tonnes', label: 'Litter generated in Australia annually' },
              { icon: 'fa-water', target: 75, suffix: '%', label: 'Ends up in waterways' },
              { icon: 'fa-dollar-sign', target: 350, prefix: '$', suffix: 'M+', label: 'Cost to clean up each year' },
              { icon: 'fa-fish', target: 100000, suffix: '+', label: 'Marine animals harmed annually' },
            ].map(({ icon, target, prefix, suffix, label }) => (
              <TiltCard key={label} className="glass-card stat-card">
                <div className="stat-icon"><i className={`fas ${icon}`}></i></div>
                <AnimatedCounter target={target} prefix={prefix} suffix={suffix} />
                <div className="stat-label">{label}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="section" style={{ background: 'var(--background)' }}>
        <div className="container">
          <FadeIn className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-badge"><i className="fas fa-bullseye"></i> Our Approach</span>
            <h2>Our Mission</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Three pillars guide everything we do — from research to real-world action.</p>
          </FadeIn>
          <div className="grid-3">
            {[
              { icon: 'fa-search', title: 'Identify', text: 'Collect real data from surveys, public datasets, and resident reports to understand where and how littering happens most.' },
              { icon: 'fa-bullhorn', title: 'Educate', text: 'Raise awareness about the long-term environmental and social effects of improper waste disposal through media and storytelling.' },
              { icon: 'fa-hands-helping', title: 'Resolve', text: 'Implement community-driven solutions — clean-up events, more bins, better signage, and smarter reporting tools.' },
            ].map(({ icon, title, text }) => (
              <TiltCard key={title} className="glass-card mission-card" style={{ textAlign: 'center' }}>
                <div className="mission-icon pulse-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEFORE & AFTER ===== */}
      <section className="section section-dark">
        <div className="container">
          <FadeIn className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-badge badge-light"><i className="fas fa-exchange-alt"></i> See the Difference</span>
            <h2 style={{ color: 'white' }}>Before &amp; After <span className="gradient-text">Cleanup</span></h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'rgba(255,255,255,0.7)' }}>Drag the slider to see the impact that community action can make.</p>
          </FadeIn>
          <ComparisonSlider beforeSrc="/images/litter_in_park.png" afterSrc="/images/community_volunteers.png" />
        </div>
      </section>

      {/* ===== DID YOU KNOW ===== */}
      <section className="section">
        <div className="container">
          <FadeIn className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-badge"><i className="fas fa-lightbulb"></i> Quick Facts</span>
            <h2>Did You <span className="gradient-text">Know?</span></h2>
          </FadeIn>
          <div className="grid-3 facts-grid">
            {[
              { icon: 'fa-smoking', title: 'Cigarette Butts', back: 'Cigarette butts are the #1 most littered item worldwide. A single butt can contaminate up to 500 litres of water.' },
              { icon: 'fa-clock', front: '450 Years', title: '450 Years', back: 'A single plastic bottle takes approximately 450 years to decompose. Most plastic waste ultimately breaks down into microplastics.' },
              { icon: 'fa-users', title: 'Community Power', back: 'Studies show that clean areas tend to stay clean — a single cleanup event can reduce future littering by up to 40% in that area.' },
            ].map(({ icon, title, back }) => (
              <FadeIn key={title} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front glass-card">
                    <div className="flip-icon"><i className={`fas ${icon}`}></i></div>
                    <h3>{title}</h3>
                    <p className="flip-hint">Hover to learn more →</p>
                  </div>
                  <div className="flip-card-back">
                    <p>{back}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section" style={{ background: 'var(--surface-tint)' }}>
        <div className="container">
          <FadeIn className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-badge"><i className="fas fa-images"></i> Visual Journey</span>
            <h2>Gallery</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Click any image to view it full size.</p>
          </FadeIn>
          <GalleryLightbox />
        </div>
      </section>
    </>
  )
}
