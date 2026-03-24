import FadeIn from '../components/FadeIn'
import TiltCard from '../components/TiltCard'

const steps = [
  {
    side: 'left',
    title: '1. Planning & Tools',
    text: 'The website was created using a modern website approach due to its ease of use, responsive design features, and support for interactive elements such as forms, maps, and embedded media.',
    note: 'Tools used: Google Forms (data), Google Sheets (analysis), Canva (infographics), and Google Maps.',
  },
  {
    side: 'right',
    title: '2. Prototyping',
    text: 'Throughout development, several versions of the website were created. Early versions focused on layout and navigation.',
  },
  {
    side: 'left',
    title: '3. Iteration',
    text: 'Later versions added data visualisation, interactive forms, and improved colour and font choices based on user feedback to create a modern, nature-inspired palette.',
  },
  {
    side: 'right',
    title: '4. User Testing',
    text: 'User testing was conducted with a small group of peers who provided feedback on clarity, navigation, and visual design. Their suggestions led to improvements such as clearer headings, reorganised content sections, and the addition of a pledge form to increase engagement.',
  },
]

export default function Development() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <FadeIn>
            <h1>Project Development</h1>
            <p>An overview of how the website was planned, designed, and developed through research, testing, and iteration.</p>
          </FadeIn>
        </div>
      </header>

      <section className="section" style={{ background: '#fdfdfd' }}>
        <div className="container">
          <FadeIn style={{ maxWidth: '900px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <p>This page provides an overview of how the website was planned, designed, and developed. The project followed a structured process that included research, data collection, design decisions, user testing, and iterative improvements.</p>
          </FadeIn>

          <div className="timeline">
            {steps.map(({ side, title, text, note }) => (
              <FadeIn key={title} className={`timeline-item ${side}`} style={{}}>
                <TiltCard className="timeline-content">
                  <h2>{title}</h2>
                  <p>{text}</p>
                  {note && <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '10px' }}><strong>Tools used:</strong> Google Forms (data), Google Sheets (analysis), Canva (infographics), and Google Maps.</p>}
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
