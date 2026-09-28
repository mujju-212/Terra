with open('src/pages/LandModuleExperience.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

target = """function LandPlanningScreen({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const [activeEra, setActiveEra] = useState(3);

  const eras = [
    { period: '1700s', concept: 'Land = Wealth', desc: 'Land was primarily seen as a source of wealth â€” ownership of land equated to power and prosperity.' },

        onPrev={() => scrollToChapterById('ch-soilhealth')}
        onNext={() => scrollToChapterById('ch-soilconservation')}
      />
      <SoilConservationScreen
        onPrev={() => scrollToChapterById('ch-degradation')}
        onNext={() => scrollToChapterById('ch-planning')}
      />
      <LandPlanningScreen
        onPrev={() => scrollToChapterById('ch-soilconservation')}
        onNext={() => scrollToChapterById('ch-summary')}
      />"""

replacement = """function LandPlanningScreen({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  const [activeEra, setActiveEra] = useState(3);

  const eras = [
    { period: '1700s', concept: 'Land = Wealth', desc: 'Land was primarily seen as a source of wealth — ownership of land equated to power and prosperity.' },
    { period: 'Later', concept: 'Land = Commodity', desc: 'As markets developed, land became a tradeable commodity — bought, sold, and leased for economic gain.' },
    { period: 'Further Later', concept: 'Land = Scarce Resource', desc: 'Industrialization and population growth revealed that land is finite and limited — scarcity became recognized.' },
    { period: '1980s onwards', concept: 'Land = Scarce Community Resource', desc: 'Land now represents both commodity and wealth — understood as a shared community resource requiring collective stewardship.' },
  ];

  return (
    <section className="land-screen land-planning-screen" id="ch-planning">
      <div className="land-content-wrap">
        <div className="soilcons-hero-header">
          <div className="land-badge land-badge-forest">SCREEN 14 · SUSTAINABLE LAND PLANNING</div>
          <h2 className="land-h1">Sustainable Land-Use Planning</h2>
          <p className="soilcons-hero-desc">
            Explore the historical evolution of land perception and modern multi-objective land allocation frameworks.
          </p>
        </div>

        <div className="land-planning-eras-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', margin: '24px 0' }}>
          {eras.map((era, i) => (
            <div
              key={era.period}
              className={`soilcons-strategy-tile ${activeEra === i ? 'is-active' : ''}`}
              onClick={() => setActiveEra(i)}
              style={{ cursor: 'pointer', padding: '16px' }}
            >
              <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: 700 }}>{era.period}</span>
              <h4 style={{ margin: '6px 0', fontSize: '1rem', color: '#fff' }}>{era.concept}</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4 }}>{era.desc}</p>
            </div>
          ))}
        </div>

        <div className="land-nav-bar">
          <button type="button" className="bar-prev-btn" onClick={onPrev}>
            <ArrowLeft size={13} />
            <span>Previous: Soil Conservation</span>
          </button>
          <div className="bar-dots-pills">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <span key={i} className={`bar-dot ${i === 10 ? 'is-active' : ''}`} />
            ))}
          </div>
          <button type="button" className="bar-next-btn" onClick={onNext}>
            <span>Next: Summary</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

// In the main page:
// Calling SoilConservationScreen and LandPlanningScreen before summary:
// (Note: in the parent export, SoilConservationScreen and LandPlanningScreen are rendered)"""

if target in text:
    text = text.replace(target, replacement)
    with open('src/pages/LandModuleExperience.tsx', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully replaced!")
else:
    print("Target not found directly, checking partial matches...")
    idx = text.find("function LandPlanningScreen")
    print("LandPlanningScreen index:", idx)
    if idx != -1:
        print("Surrounding 300 chars:")
        print(repr(text[idx:idx+300]))
