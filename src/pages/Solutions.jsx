import { Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import TiltCard from '../components/TiltCard'

const solutions = [
  { icon: 'fa-trash-alt', title: 'More Public Bins', text: 'Increasing the number of public bins in high traffic areas such as parks, bus stops, and the Town Centre would make it easier for people to dispose of waste properly.' },
  { icon: 'fa-bullhorn', title: 'Awareness Posters', text: 'Awareness posters and signs placed in common littering areas can remind people to dispose of their waste responsibly.' },
  { icon: 'fa-users', title: 'Community Clean Up Events', text: 'Community clean up events encourage residents to take pride in their environment and help remove existing litter.' },
  { icon: 'fa-map-marker-alt', title: 'Reporting Hotspots', text: 'A simple reporting system for litter hotspots allows residents to notify the council or community groups about areas that need attention.' },
]

export default function Solutions() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <FadeIn>
            <h1>Proposed Solutions for Rouse Hill</h1>
            <p>Based on the data collected and feedback from the community, several practical solutions can help reduce littering in Rouse Hill. These solutions aim to increase awareness, improve waste disposal options, and encourage community participation.</p>
          </FadeIn>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
            {solutions.map(({ icon, title, text }) => (
              <TiltCard key={title} className="glass-card solution-card">
                <div className="solution-icon"><i className={`fas ${icon}`}></i></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </TiltCard>
            ))}
          </div>

          <FadeIn>
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="placeholder-media" style={{ height: '400px', borderColor: 'var(--primary)' }}>
                <div>
                  <i className="fas fa-object-group fa-3x" style={{ color: 'var(--primary)', marginBottom: '15px', display: 'block' }}></i>
                  Canva Infographic Placeholder<br />
                  <span style={{ fontSize: '0.9rem' }}>(Visual summary of proposed solutions)</span>
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to make a difference?</h2>
                <p style={{ marginBottom: '2rem' }}>Your commitment is the first step towards a cleaner, healthier Rouse Hill. Join hundreds of other residents who have already pledged to keep our community beautiful.</p>
                <Link to="/help" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '15px 35px' }}>
                  Take the Clean Rouse Hill Pledge <i className="fas fa-check-circle" style={{ marginLeft: '10px' }}></i>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
