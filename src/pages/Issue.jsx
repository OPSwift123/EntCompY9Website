import FadeIn from '../components/FadeIn'

export default function Issue() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <FadeIn>
            <h1>Why Littering Matters in Rouse Hill</h1>
            <p>Understanding the impact of improper waste disposal on our environment, community, and future.</p>
          </FadeIn>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="issue-content">
              <FadeIn>
                <p>Littering is the improper disposal of waste in public areas. In Rouse Hill, this issue has become more noticeable in parks, walkways, bus stops, and around the Town Centre. Litter not only harms the environment but also affects the appearance and reputation of the community.</p>
                <p>Local data shows that littering contributes to pollution, harms wildlife, and increases the cost of cleaning for the local council. Common types of litter found in Rouse Hill include plastic packaging, drink containers, food wrappers, and cigarette butts.</p>
                <p>Littering impacts the community by reducing the quality of shared spaces, creating health risks, and discouraging people from using parks and recreational areas. It also contributes to long term environmental damage when waste enters waterways or breaks down into microplastics.</p>
              </FadeIn>
            </div>

            <FadeIn>
              <div className="placeholder-media glass-card" style={{ marginBottom: 'var(--spacing-md)', height: '300px' }}>
                <div>
                  <i className="fas fa-map-marked-alt fa-3x" style={{ display: 'block', textAlign: 'center', marginBottom: '15px', color: 'var(--primary)' }}></i>
                  Map of Affected Areas<br />
                  <span style={{ fontSize: '0.9rem' }}>(Google Map Embed showing Rouse Hill Town Centre boundaries)</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="grid-3" style={{ marginTop: 'var(--spacing-xl)' }}>
            {[
              'Image 1: Park Litter',
              'Image 2: Town Centre Waste',
              'Image 3: Bus Stop Overflow',
            ].map(label => (
              <FadeIn key={label}>
                <div className="placeholder-media glass-card" style={{ height: '250px' }}>
                  <div><i className="fas fa-image fa-2x"></i><br />{label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
