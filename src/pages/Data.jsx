import FadeIn from '../components/FadeIn'

export default function Data() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <FadeIn>
            <h1>Community Data and Insights</h1>
            <p>To understand how littering affects Rouse Hill, data was collected through surveys, online polls, and public environmental datasets. The information gathered helps identify patterns, community attitudes, and areas that require the most attention.</p>
          </FadeIn>
        </div>
      </header>

      <section className="section" style={{ background: 'rgba(45,106,79,0.02)' }}>
        <div className="container">

          <FadeIn>
            <div className="data-section">
              <h2>Survey Results</h2>
              <div className="grid-2">
                <div>
                  <p>A survey was conducted to gather opinions from local residents. The results show that a large majority of respondents notice litter in public areas at least once a week. Many participants identified parks, bus stops, and shopping areas as the most affected locations.</p>
                  <p>These findings emphasize that it is not an isolated problem, but rather widespread throughout the most commonly shared community areas.</p>
                </div>
                <div className="placeholder-media" style={{ height: '250px' }}>
                  <div>
                    <i className="fas fa-chart-pie fa-3x" style={{ color: 'var(--primary)', marginBottom: '10px', display: 'block' }}></i>
                    Google Form Charts Placeholder
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="data-section">
              <h2>Poll Results</h2>
              <div className="grid-2">
                <div className="placeholder-media" style={{ height: '250px' }}>
                  <div>
                    <i className="fas fa-poll fa-3x" style={{ color: 'var(--primary)', marginBottom: '10px', display: 'block' }}></i>
                    Online Poll Screenshot Placeholder
                  </div>
                </div>
                <div>
                  <p>An online poll was used to quickly measure community attitudes. The poll results support the survey findings, showing that most people believe littering is a growing issue and that more bins and awareness campaigns would help reduce the problem.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="data-section">
              <h2>Public Dataset</h2>
              <div className="grid-2">
                <div>
                  <p>Data from environmental reports and NSW Government sources shows that littering continues to be a significant issue across many suburbs, including Rouse Hill. Trends indicate that plastic waste and food packaging are the most common forms of litter.</p>
                </div>
                <div className="placeholder-media" style={{ height: '250px' }}>
                  <div>
                    <i className="fas fa-chart-bar fa-3x" style={{ color: 'var(--primary)', marginBottom: '10px', display: 'block' }}></i>
                    Google Sheets Chart Placeholder
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="glass-card" style={{ marginTop: '2rem', background: 'var(--primary)', color: 'white', borderColor: 'var(--primary-light)' }}>
              <h3 style={{ color: 'white', marginBottom: '1rem' }}>
                <i className="fas fa-lightbulb" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Data Analysis Summary
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: 0 }}>The combined data suggests that littering in Rouse Hill is caused by convenience, lack of awareness, and insufficient disposal options in busy areas. The results also show strong community support for solutions such as more bins, better signage, and organised clean up events.</p>
            </div>
          </FadeIn>

        </div>
      </section>
    </>
  )
}
