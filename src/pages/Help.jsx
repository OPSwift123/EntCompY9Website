import FadeIn from '../components/FadeIn'

export default function Help() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <FadeIn>
            <h1>How You Can Help Today</h1>
            <p>Every resident can play a role in reducing litter in Rouse Hill. Small actions, when shared widely, make an enormous difference to our community.</p>
          </FadeIn>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--surface-tint)' }}>
        <div className="container">
          <FadeIn className="text-center" style={{ maxWidth: '760px', margin: '0 auto 3.5rem' }}>
            <p style={{ fontSize: '1.15rem' }}>Simple steps include disposing of rubbish properly, carrying waste until a bin is found, and encouraging those around you. Participating in local clean-up events and reporting hotspots also makes a huge collective impact.</p>
          </FadeIn>

          <div className="grid-2" style={{ alignItems: 'start', gap: '2.5rem' }}>
            {/* Pledge Form */}
            <FadeIn className="form-section" id="pledge">
              <h2>
                <span className="form-icon"><i className="fas fa-hand-sparkles"></i></span>
                Take the Pledge
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-mid)' }}>Make a personal commitment to keep Rouse Hill clean. Your pledge matters — sign it below and join the movement.</p>
              <iframe
                className="jotform-embed"
                src="https://form.jotform.com/260737827140862"
                title="Clean Rouse Hill Pledge Form"
                allow="geolocation; microphone; camera"
                scrolling="yes"
              />
            </FadeIn>

            {/* Feedback Form */}
            <FadeIn className="form-section" id="feedback">
              <h2>
                <span className="form-icon"><i className="fas fa-comments"></i></span>
                Share Your Feedback
              </h2>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-mid)' }}>Your opinions help us improve. Share your thoughts on littering in Rouse Hill and how the community can do better.</p>
              <iframe
                className="jotform-embed"
                src="https://form.jotform.com/260737955450868"
                title="Clean Rouse Hill Feedback Form"
                allow="geolocation; microphone; camera"
                scrolling="yes"
              />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
