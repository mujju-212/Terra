import React, { useState } from 'react';
import './HealthEffectsScreen.css';
import { useModalScrollLock } from './useModalScrollLock';

interface OrganDetail {
  id: string;
  category: string;
  title: string;
  icon: string;
  themeColor: string;
  bullets: string[];
  clinicalNotes: string;
  primaryPollutants: string[];
  safeInterventions: string[];
}

export function HealthEffectsScreen() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedOrgan, setSelectedOrgan] = useState<OrganDetail | null>(null);

  // Lock scroll, pause Lenis, route wheel delta and handle Escape
  useModalScrollLock(Boolean(selectedOrgan), () => setSelectedOrgan(null));

  const filterTabs = [
    { id: 'all', label: 'All Effects', icon: '✦' },
    { id: 'respiratory', label: 'Respiratory', icon: '🫁' },
    { id: 'cardiovascular', label: 'Cardiovascular', icon: '❤️' },
    { id: 'neurological', label: 'Neurological', icon: '🧠' },
    { id: 'reproductive', label: 'Reproductive', icon: '⚧' },
    { id: 'others', label: 'Others', icon: '•••' },
  ];

  const organData: Record<string, OrganDetail> = {
    brain: {
      id: 'brain',
      category: 'neurological',
      title: 'Brain',
      icon: '🧠',
      themeColor: '#f59e0b',
      bullets: [
        'Headache & migraines',
        'Anxiety & depressive moods',
        'Reduced cognitive function & memory',
        'Elevated stroke risk',
      ],
      clinicalNotes:
        'Ultrafine PM0.1 and lead penetrate the olfactory bulb and blood-brain barrier, triggering neuro-inflammation, oxidative stress, and acceleration of neurodegenerative diseases such as Alzheimer’s and Parkinson’s.',
      primaryPollutants: ['PM2.5', 'Ultrafine PM0.1', 'Lead (Pb)', 'Carbon Monoxide (CO)'],
      safeInterventions: ['Indoor HEPA filtration', 'Antioxidant-rich nutrition', 'Avoiding high-traffic jogging'],
    },
    'eyes-nose': {
      id: 'eyes-nose',
      category: 'others',
      title: 'Eyes, Nose & Throat',
      icon: '👁️',
      themeColor: '#38bdf8',
      bullets: [
        'Irritation & burning sensations',
        'Redness & conjunctivitis',
        'Watery eyes & rhinitis',
        'Allergic reactions & pharyngitis',
      ],
      clinicalNotes:
        'Acid gases (SO₂, NO₂) and ozone react instantly with moist mucous membranes to produce dilute corrosive acids, irritating nerve endings and stripping protective tear films.',
      primaryPollutants: ['Ozone (O₃)', 'Sulphur Dioxide (SO₂)', 'Nitrogen Dioxide (NO₂)', 'VOCs'],
      safeInterventions: ['Lubricating eye drops', 'Saline nasal rinses', 'Protective eyewear during smog spikes'],
    },
    respiratory: {
      id: 'respiratory',
      category: 'respiratory',
      title: 'Respiratory System',
      icon: '🫁',
      themeColor: '#f43f5e',
      bullets: [
        'Irritation of eyes, nose & throat',
        'Asthma exacerbations',
        'Chronic bronchitis & COPD',
        'Reduced lung function capacity',
        'Lung cancer (Group 1 carcinogen)',
      ],
      clinicalNotes:
        'Inhaled fine particulates (PM2.5) lodge deeply into the pulmonary alveoli, inhibiting gas exchange and paralyzing bronchial cilia motility. Chronic exposure permanently degrades FEV1 vital lung capacity.',
      primaryPollutants: ['PM2.5 / PM10', 'Ozone (O₃)', 'Sulphur Dioxide (SO₂)', 'Radon'],
      safeInterventions: ['Certified N95 / FFP2 respirators', 'Closed-window HEPA ventilation', 'Proactive bronchodilator care'],
    },
    cardio: {
      id: 'cardio',
      category: 'cardiovascular',
      title: 'Cardiovascular System',
      icon: '❤️',
      themeColor: '#e11d48',
      bullets: [
        'Increased heart rate & arrhythmia',
        'High blood pressure (hypertension)',
        'Acute heart attacks (myocardial infarction)',
        'Arteriosclerosis & stroke',
      ],
      clinicalNotes:
        'Ultrafine particles translocate into the capillary bloodstream, accelerating arterial plaque formation and causing vascular endothelial dysfunction, heightened blood viscosity, and sudden thrombotic events.',
      primaryPollutants: ['PM2.5', 'Carbon Monoxide (CO)', 'Nitrogen Dioxide (NO₂)'],
      safeInterventions: ['Blood pressure monitoring', 'Limiting physical exertion on High AQI days', 'HEPA-purified sleep environments'],
    },
    reproductive: {
      id: 'reproductive',
      category: 'reproductive',
      title: 'Reproductive System',
      icon: '⚧',
      themeColor: '#a855f7',
      bullets: [
        'Reduced fertility in men and women',
        'Adverse pregnancy outcomes',
        'Low birth weight (< 2,500g)',
        'Elevated preterm birth risks',
      ],
      clinicalNotes:
        'Combustion byproducts cross the maternal-fetal placental barrier, restricting fetal microvascular circulation and impairing spermatogenesis through toxic hormonal endocrine disruption.',
      primaryPollutants: ['PM2.5', 'Polycyclic Aromatic Hydrocarbons (PAHs)', 'Lead (Pb)', 'Heavy Metals'],
      safeInterventions: ['Strict indoor air purification for expectant mothers', 'Prenatal micronutrient protection', 'Zero direct combustion exposure'],
    },
    'other-organs': {
      id: 'other-organs',
      category: 'others',
      title: 'Other Organs',
      icon: '⚙️',
      themeColor: '#10b981',
      bullets: [
        'Liver and kidney filtration damage',
        'Weakened immune system surveillance',
        'Systemic inflammation across tissue beds',
      ],
      clinicalNotes:
        'Heavy metals and organic toxins absorbed through the alveolar capillary barrier accumulate in renal tubules and hepatic parenchyma, overwhelming phase I/II detoxification enzymes.',
      primaryPollutants: ['Heavy Metals (Cd, Hg, Pb)', 'Dioxins', 'Volatile Organic Compounds (VOCs)'],
      safeInterventions: ['Adequate hydration to aid renal clearance', 'Anti-inflammatory diets', 'Minimizing chemical solvent inhalation'],
    },
    skin: {
      id: 'skin',
      category: 'others',
      title: 'Skin',
      icon: '✋',
      themeColor: '#f97316',
      bullets: [
        'Topical irritation & dermatitis',
        'Allergic reactions & eczema flare-ups',
        'Premature ageing & collagen breakdown',
      ],
      clinicalNotes:
        'Polycyclic aromatic hydrocarbons (PAHs) and ground-level ozone penetrate the epidermal stratum corneum, generating reactive oxygen species (ROS) that degrade elastin and skin barrier integrity.',
      primaryPollutants: ['Ground-level Ozone (O₃)', 'PM2.5 Surface Soot', 'PAHs', 'VOCs'],
      safeInterventions: ['Barrier repair creams with ceramides', 'Daily antioxidant serums (Vitamin C/E)', 'Gentle evening deep cleansing'],
    },
  };

  const isOrganActive = (organCat: string, organId: string) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === organCat) return true;
    if (activeFilter === 'others' && (organId === 'eyes-nose' || organId === 'other-organs' || organId === 'skin')) return true;
    return false;
  };

  const vulnerableGroups = [
    {
      name: 'Children',
      photo: '/images/air-vulnerable-child-square.jpg',
      bullets: [
        'Developing lungs with immature alveolar trees',
        'Higher breathing rate per kg body weight',
        'Significantly more sensitive to pollutants',
      ],
    },
    {
      name: 'Elderly',
      photo: '/images/air-vulnerable-elderly.jpg',
      bullets: [
        'Pre-existing cardiovascular & pulmonary conditions',
        'Weaker immune defenses & slower repair',
        'Substantially higher risk of severe hospitalization',
      ],
    },
    {
      name: 'Pregnant Women',
      photo: '/images/air-vulnerable-pregnant.jpg',
      bullets: [
        'Heightened risk of low birth weight (< 2,500g)',
        'Increased incidence of premature births',
        'Fetal developmental & neurocognitive issues',
      ],
    },
    {
      name: 'Outdoor Workers',
      photo: '/images/air-vulnerable-workers.jpg',
      bullets: [
        'Direct, unmitigated vehicle exhaust exposure',
        'Extended duration (8+ hours daily) at high exertion',
        'Compounded occupational and respiratory strain',
      ],
    },
  ];

  const keyPollutants = [
    {
      tag: 'PM2.5 / PM10',
      badgeClass: 'pm',
      effects: 'Respiratory and cardiovascular diseases, lung cancer',
      category: 'respiratory',
    },
    {
      tag: 'NO₂',
      badgeClass: 'no2',
      effects: 'Lung inflammation, reduced lung function, asthma',
      category: 'respiratory',
    },
    {
      tag: 'SO₂',
      badgeClass: 'so2',
      effects: 'Respiratory irritation, worsens asthma',
      category: 'respiratory',
    },
    {
      tag: 'O₃ (Ground-level)',
      badgeClass: 'o3',
      effects: 'Lung irritation, reduced lung function',
      category: 'respiratory',
    },
    {
      tag: 'CO',
      badgeClass: 'co',
      effects: 'Reduces oxygen delivery, causes headache, dizziness',
      category: 'cardiovascular',
    },
    {
      tag: 'Lead (Pb)',
      badgeClass: 'lead',
      effects: 'Affects brain development in children, neurological damage',
      category: 'neurological',
    },
    {
      tag: 'VOCs',
      badgeClass: 'voc',
      effects: 'Irritation, some are carcinogenic',
      category: 'others',
    },
  ];

  const longTermImpacts = [
    {
      icon: '🫁',
      circleClass: 'cyan',
      label: 'Chronic respiratory diseases (COPD, asthma)',
      category: 'respiratory',
    },
    {
      icon: '❤️',
      circleClass: 'red',
      label: 'Heart disease and stroke',
      category: 'cardiovascular',
    },
    {
      icon: '🎗️',
      circleClass: 'pink',
      label: 'Lung cancer and other cancers',
      category: 'respiratory',
    },
    {
      icon: '🧠',
      circleClass: 'purple',
      label: 'Neurological disorders',
      category: 'neurological',
    },
    {
      icon: '👶',
      circleClass: 'rose',
      label: 'Developmental and reproductive effects',
      category: 'reproductive',
    },
  ];

  return (
    <section className="air-health-section" id="ch-health">
      <div className="air-health-container">
        {/* ─── 1. HERO HEADER WITH SUNRISE BREATHING WOMAN BACKGROUND ─── */}
        <div className="air-health-hero-stage">
          <img
            src="/images/air-health-hero-bg.jpg"
            alt="Woman inhaling fresh air over city at sunrise"
            className="air-health-hero-bg"
          />
          <div className="air-health-hero-overlay" />

          <div className="air-health-hero-content">
            <div className="air-health-hero-text">
              <span className="air-health-hero-badge">CHAPTER 06</span>
              <h2 className="air-health-hero-title">
                <span className="air-health-title-main">Health Effects</span>
                <span className="air-health-title-highlight">of Air Pollution</span>
              </h2>
              <p className="air-health-hero-desc">
                Air pollution can cause a wide range of health problems, from mild irritation to serious chronic diseases.
                The effects depend on the type and concentration of pollutants, duration of exposure, and individual susceptibility.
              </p>

              {/* Filter Pills Bar directly below hero text matching Image 2 */}
              <div className="air-health-filter-bar">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`air-health-pill-btn ${activeFilter === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(tab.id)}
                  >
                    <span className="air-health-pill-icon">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Quote Card */}
            <div className="air-health-quote-card">
              <div className="air-health-quote-icon">“</div>
              <p className="air-health-quote-text">
                Air pollution affects every breath we take. It can harm our lungs, heart, brain and overall well-being,
                especially in vulnerable groups like children and the elderly.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 2. MAIN BENTO GRID (3 COLUMNS) ─── */}
        <div className="air-health-bento-grid">
          {/* ─── COLUMN 1: EFFECTS ON HUMAN BODY ─── */}
          <div className="air-health-bento-card air-health-anatomy-card">
            <div className="air-health-card-header">
              <h3 className="air-health-card-title">
                <span className="air-health-card-title-icon">👤</span>
                Effects on Human Body
              </h3>
            </div>

            <div className="air-health-anatomy-stage">
              {/* Centered Holographic Body (Image 3) */}
              <img
                src="/images/air-human-body-centered.jpg"
                alt="Holographic human anatomy"
                className="air-health-body-centered"
              />

              {/* Precision 1.5px Non-Scaling SVG Circuit Connectors */}
              <svg className="air-health-connector-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Brain: from right edge of card (x:30, y:11) to head node (x:49, y:9) */}
                <path
                  d="M 30,11 H 43 L 49,9"
                  stroke="#f59e0b"
                  className={`air-health-connector-path ${isOrganActive('neurological', 'brain') ? 'active' : ''}`}
                />
                <circle cx="30" cy="11" r="1.5" fill="#f59e0b" className="air-health-anchor-dot" />

                {/* Respiratory: from card (x:30, y:46) to lungs (x:41, y:43) */}
                <path
                  d="M 30,46 H 37 L 41,43"
                  stroke="#f43f5e"
                  className={`air-health-connector-path ${isOrganActive('respiratory', 'respiratory') ? 'active' : ''}`}
                />
                <circle cx="30" cy="46" r="1.5" fill="#f43f5e" className="air-health-anchor-dot" />

                {/* Reproductive: from card (x:30, y:87) to pelvis (x:49, y:85) */}
                <path
                  d="M 30,87 H 44 L 49,85"
                  stroke="#a855f7"
                  className={`air-health-connector-path ${isOrganActive('reproductive', 'reproductive') ? 'active' : ''}`}
                />
                <circle cx="30" cy="87" r="1.5" fill="#a855f7" className="air-health-anchor-dot" />

                {/* Eyes, Nose & Throat: from left edge of card (x:70, y:11) to throat (x:52, y:20) */}
                <path
                  d="M 70,11 H 58 L 52,20"
                  stroke="#38bdf8"
                  className={`air-health-connector-path ${isOrganActive('others', 'eyes-nose') ? 'active' : ''}`}
                />
                <circle cx="70" cy="11" r="1.5" fill="#38bdf8" className="air-health-anchor-dot" />

                {/* Cardio: from left edge of card (x:70, y:36) to heart (x:58, y:43) */}
                <path
                  d="M 70,36 H 63 L 58,43"
                  stroke="#e11d48"
                  className={`air-health-connector-path ${isOrganActive('cardiovascular', 'cardio') ? 'active' : ''}`}
                />
                <circle cx="70" cy="36" r="1.5" fill="#e11d48" className="air-health-anchor-dot" />

                {/* Other Organs: from left edge of card (x:70, y:62) to abdomen (x:45, y:60) */}
                <path
                  d="M 70,62 H 52 L 45,60"
                  stroke="#10b981"
                  className={`air-health-connector-path ${isOrganActive('others', 'other-organs') ? 'active' : ''}`}
                />
                <circle cx="70" cy="62" r="1.5" fill="#10b981" className="air-health-anchor-dot" />

                {/* Skin: from left edge of card (x:70, y:88) to arm/hand (x:25, y:58) */}
                <path
                  d="M 70,88 H 45 L 25,58"
                  stroke="#f97316"
                  className={`air-health-connector-path ${isOrganActive('others', 'skin') ? 'active' : ''}`}
                />
                <circle cx="70" cy="88" r="1.5" fill="#f97316" className="air-health-anchor-dot" />
              </svg>

              {/* Pulsing Glowing Hotspots on Body */}
              <div
                className="air-health-hotspot"
                style={{ top: '9%', left: '49%', color: '#f59e0b' }}
                onClick={() => setSelectedOrgan(organData.brain)}
                title="Click for clinical brain pathology"
              >
                <div className="air-health-hotspot-core" />
                <div className="air-health-hotspot-ring" />
              </div>

              <div
                className="air-health-hotspot"
                style={{ top: '20%', left: '52%', color: '#38bdf8' }}
                onClick={() => setSelectedOrgan(organData['eyes-nose'])}
                title="Click for ENT pathology"
              >
                <div className="air-health-hotspot-core" />
                <div className="air-health-hotspot-ring" />
              </div>

              <div
                className="air-health-hotspot"
                style={{ top: '43%', left: '41%', color: '#f43f5e' }}
                onClick={() => setSelectedOrgan(organData.respiratory)}
                title="Click for pulmonary pathology"
              >
                <div className="air-health-hotspot-core" />
                <div className="air-health-hotspot-ring" />
              </div>

              <div
                className="air-health-hotspot"
                style={{ top: '43%', left: '58%', color: '#e11d48' }}
                onClick={() => setSelectedOrgan(organData.cardio)}
                title="Click for cardiovascular pathology"
              >
                <div className="air-health-hotspot-core" />
                <div className="air-health-hotspot-ring" />
              </div>

              <div
                className="air-health-hotspot"
                style={{ top: '60%', left: '45%', color: '#10b981' }}
                onClick={() => setSelectedOrgan(organData['other-organs'])}
                title="Click for hepatic/renal pathology"
              >
                <div className="air-health-hotspot-core" />
                <div className="air-health-hotspot-ring" />
              </div>

              <div
                className="air-health-hotspot"
                style={{ top: '58%', left: '25%', color: '#f97316' }}
                onClick={() => setSelectedOrgan(organData.skin)}
                title="Click for dermal pathology"
              >
                <div className="air-health-hotspot-core" />
                <div className="air-health-hotspot-ring" />
              </div>

              <div
                className="air-health-hotspot"
                style={{ top: '85%', left: '49%', color: '#a855f7' }}
                onClick={() => setSelectedOrgan(organData.reproductive)}
                title="Click for reproductive pathology"
              >
                <div className="air-health-hotspot-core" />
                <div className="air-health-hotspot-ring" />
              </div>

              {/* Left Flank Callout Cards (30% width) */}
              <div className="air-health-callouts-left">
                {/* Brain */}
                <div
                  className={`air-health-callout-card ${isOrganActive('neurological', 'brain') ? 'highlighted' : 'dimmed'}`}
                  data-organ="brain"
                  onClick={() => setSelectedOrgan(organData.brain)}
                >
                  <div className="air-health-callout-header">
                    <span className="air-health-callout-icon" style={{ color: '#f59e0b' }}>🧠</span>
                    <h4 className="air-health-callout-title">Brain</h4>
                  </div>
                  <ul className="air-health-callout-list">
                    {organData.brain.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Respiratory */}
                <div
                  className={`air-health-callout-card ${isOrganActive('respiratory', 'respiratory') ? 'highlighted' : 'dimmed'}`}
                  data-organ="respiratory"
                  onClick={() => setSelectedOrgan(organData.respiratory)}
                >
                  <div className="air-health-callout-header">
                    <span className="air-health-callout-icon" style={{ color: '#f43f5e' }}>🫁</span>
                    <h4 className="air-health-callout-title">Respiratory System</h4>
                  </div>
                  <ul className="air-health-callout-list">
                    {organData.respiratory.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Reproductive */}
                <div
                  className={`air-health-callout-card ${isOrganActive('reproductive', 'reproductive') ? 'highlighted' : 'dimmed'}`}
                  data-organ="reproductive"
                  onClick={() => setSelectedOrgan(organData.reproductive)}
                >
                  <div className="air-health-callout-header">
                    <span className="air-health-callout-icon" style={{ color: '#a855f7' }}>⚧</span>
                    <h4 className="air-health-callout-title">Reproductive System</h4>
                  </div>
                  <ul className="air-health-callout-list">
                    {organData.reproductive.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Flank Callout Cards (30% width) */}
              <div className="air-health-callouts-right">
                {/* Eyes, Nose & Throat */}
                <div
                  className={`air-health-callout-card ${isOrganActive('others', 'eyes-nose') ? 'highlighted' : 'dimmed'}`}
                  data-organ="eyes-nose"
                  onClick={() => setSelectedOrgan(organData['eyes-nose'])}
                >
                  <div className="air-health-callout-header">
                    <span className="air-health-callout-icon" style={{ color: '#38bdf8' }}>👁️</span>
                    <h4 className="air-health-callout-title">Eyes, Nose & Throat</h4>
                  </div>
                  <ul className="air-health-callout-list">
                    {organData['eyes-nose'].bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Cardio */}
                <div
                  className={`air-health-callout-card ${isOrganActive('cardiovascular', 'cardio') ? 'highlighted' : 'dimmed'}`}
                  data-organ="cardio"
                  onClick={() => setSelectedOrgan(organData.cardio)}
                >
                  <div className="air-health-callout-header">
                    <span className="air-health-callout-icon" style={{ color: '#e11d48' }}>❤️</span>
                    <h4 className="air-health-callout-title">Cardiovascular System</h4>
                  </div>
                  <ul className="air-health-callout-list">
                    {organData.cardio.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Other Organs */}
                <div
                  className={`air-health-callout-card ${isOrganActive('others', 'other-organs') ? 'highlighted' : 'dimmed'}`}
                  data-organ="other-organs"
                  onClick={() => setSelectedOrgan(organData['other-organs'])}
                >
                  <div className="air-health-callout-header">
                    <span className="air-health-callout-icon" style={{ color: '#10b981' }}>⚙️</span>
                    <h4 className="air-health-callout-title">Other Organs</h4>
                  </div>
                  <ul className="air-health-callout-list">
                    {organData['other-organs'].bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Skin */}
                <div
                  className={`air-health-callout-card ${isOrganActive('others', 'skin') ? 'highlighted' : 'dimmed'}`}
                  data-organ="skin"
                  onClick={() => setSelectedOrgan(organData.skin)}
                >
                  <div className="air-health-callout-header">
                    <span className="air-health-callout-icon" style={{ color: '#f97316' }}>✋</span>
                    <h4 className="air-health-callout-title">Skin</h4>
                  </div>
                  <ul className="air-health-callout-list">
                    {organData.skin.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ─── COLUMN 2: VULNERABLE GROUPS ─── */}
          <div className="air-health-bento-card air-health-vulnerable-card-container">
            <div className="air-health-card-header">
              <h3 className="air-health-card-title">
                <span className="air-health-card-title-icon">👥</span>
                Vulnerable Groups
              </h3>
            </div>

            <div className="air-health-vulnerable-list">
              {vulnerableGroups.map((group) => (
                <div key={group.name} className="air-health-vulnerable-item">
                  <div className="air-health-vulnerable-thumb">
                    <img src={group.photo} alt={group.name} />
                  </div>
                  <div className="air-health-vulnerable-info">
                    <h4 className="air-health-vulnerable-name">{group.name}</h4>
                    <ul className="air-health-vulnerable-bullets">
                      {group.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── COLUMN 3: KEY POLLUTANTS & LONG-TERM IMPACTS ─── */}
          <div className="air-health-col-right">
            {/* Top: Key Pollutants and Health Effects */}
            <div className="air-health-bento-card air-health-pollutants-card">
              <div className="air-health-card-header">
                <h3 className="air-health-card-title">
                  <span className="air-health-card-title-icon" style={{ color: '#38bdf8' }}>⚠️</span>
                  Key Pollutants and Health Effects
                </h3>
              </div>

              <div className="air-health-pollutants-list">
                {keyPollutants.map((item) => {
                  const isHighlighted =
                    activeFilter === 'all' ||
                    activeFilter === item.category ||
                    (activeFilter === 'others' && item.category === 'others');
                  return (
                    <div
                      key={item.tag}
                      className={`air-health-pollutant-row ${isHighlighted ? 'highlighted' : ''}`}
                    >
                      <span className={`air-health-pollutant-tag ${item.badgeClass}`}>{item.tag}</span>
                      <span className="air-health-pollutant-desc">{item.effects}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom: Long-term Health Impacts */}
            <div className="air-health-bento-card air-health-impacts-card">
              <div className="air-health-card-header">
                <h3 className="air-health-card-title">
                  <span className="air-health-card-title-icon" style={{ color: '#38bdf8' }}>📊</span>
                  Long-term Health Impacts
                </h3>
              </div>

              <div className="air-health-impacts-grid">
                {longTermImpacts.map((item, idx) => (
                  <div key={idx} className="air-health-impact-item">
                    <div className={`air-health-impact-circle ${item.circleClass}`}>
                      <span>{item.icon}</span>
                    </div>
                    <span className="air-health-impact-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── CLINICAL DETAIL MODAL ─── */}
      {selectedOrgan && (
        <div
          className="air-health-modal-backdrop"
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedOrgan(null)}
        >
          <div
            className="air-health-modal-box"
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
          >
            <button className="air-health-modal-close" onClick={() => setSelectedOrgan(null)}>
              ✕
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '2rem' }}>{selectedOrgan.icon}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.35rem', color: selectedOrgan.themeColor }}>
                  {selectedOrgan.title} Pathology
                </h3>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Organ-Specific Atmospheric Infiltration Profile
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '16px' }}>
              {selectedOrgan.clinicalNotes}
            </p>

            <div style={{ marginBottom: '14px' }}>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Primary Causative Pollutants
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedOrgan.primaryPollutants.map((p, i) => (
                  <span
                    key={i}
                    style={{
                      background: 'rgba(56, 189, 248, 0.15)',
                      color: '#7dd3fc',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      fontSize: '0.76rem',
                      fontFamily: 'monospace',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Recommended Clinical & Preventive Interventions
              </h5>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#cbd5e1', fontSize: '0.82rem', lineHeight: 1.55 }}>
                {selectedOrgan.safeInterventions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
export default HealthEffectsScreen;
