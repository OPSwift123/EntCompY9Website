import FadeIn from '../components/FadeIn'

export default function About() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <FadeIn>
            <h1>About This Project</h1>
            <p>Bringing education, media, and community together to solve local issues in Rouse Hill.</p>
          </FadeIn>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <FadeIn>
              <div className="about-content">
                <h2 style={{ marginBottom: '1.5rem' }}>
                  <i className="fas fa-info-circle" style={{ color: 'var(--primary)' }}></i> Project Context
                </h2>
                <p>This website was created as part of a school project focused on interactive media, user experience, and community issues. The aim is to raise awareness about littering in Rouse Hill and present data driven insights and solutions that encourage positive change.</p>
                <p>The project combines research, community feedback, and interactive elements to communicate the impact of littering and highlight ways the community can work together to reduce it.</p>

                <div style={{ marginTop: '2.5rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>Share this Initiative</h3>
                  <div className="social-links">
                    <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" target="_blank" rel="noreferrer" style={{ background: '#3b5998', color: 'white' }}><i className="fab fa-facebook-f"></i></a>
                    <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" target="_blank" rel="noreferrer" style={{ background: '#1da1f2', color: 'white' }}><i className="fab fa-twitter"></i></a>
                    <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" target="_blank" rel="noreferrer" style={{ background: '#0e76a8', color: 'white' }}><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://www.youtube.com/watch?v=Aq5WXmQQooo" target="_blank" rel="noreferrer" style={{ background: '#25d366', color: 'white' }}><i className="fab fa-whatsapp"></i></a>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="glass-card" id="contact" style={{ background: '#f8fcf8' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Get in Touch</h2>
                <div className="placeholder-media" style={{ height: '400px', background: '#fff', border: '2px dashed var(--primary-light)' }}>
                  <div>
                    <i className="fas fa-envelope-open-text fa-3x" style={{ color: 'var(--primary)', marginBottom: '15px', display: 'block' }}></i>
                    Contact Form Placeholder<br />
                    <span style={{ fontSize: '0.9rem' }}>(For project inquiries and community outreach)</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
