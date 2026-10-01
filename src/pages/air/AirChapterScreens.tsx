import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wind,
  Shield,
  Activity,
  Layers,
  Zap,
  TrendingDown,
  Sun,
  Flame,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ModuleContent } from '../../content/types';
import { airCompositionData } from './airData';

/* ─── CH-03: AIR POLLUTION DEFINITION & FORMS ─── */
export function AirPollutionScreen() {
  const [viewState, setViewState] = useState<'clean' | 'polluted'>('clean');

  return (
    <section className="air-chapter-screen" id="ch-pollution">
      <div className="air-chapter-header">
        <span className="air-chapter-tag">PART 02 · CONTAMINATION</span>
        <h2 className="air-chapter-title">Air Pollution & Aerosols</h2>
        <p className="air-chapter-subtitle">
          "Presence in the atmosphere of one or more air contaminants injurious to human health or welfare, animal or plant life, or property."
        </p>
      </div>

      {/* Interactive Clean vs Polluted Toggle Banner */}
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          onClick={() => setViewState('clean')}
          style={{
            padding: '8px 20px',
            borderRadius: '9999px',
            background: viewState === 'clean' ? '#0284c7' : 'rgba(255, 255, 255, 0.06)',
            color: '#fff',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Pristine Natural Atmosphere
        </button>
        <button
          type="button"
          onClick={() => setViewState('polluted')}
          style={{
            padding: '8px 20px',
            borderRadius: '9999px',
            background: viewState === 'polluted' ? '#c2410c' : 'rgba(255, 255, 255, 0.06)',
            color: '#fff',
            border: '1px solid rgba(249, 115, 22, 0.4)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          Anthropogenic Haze Active
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Form 1: Gases */}
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0', fontSize: '1.1rem' }}>1. Gaseous Pollutants</h4>
          <p style={{ fontSize: '0.86rem', color: 'rgba(224, 242, 254, 0.8)', lineHeight: 1.55 }}>
            Exist in gaseous state at normal temperature and pressure. Examples include <strong>Carbon Monoxide (CO), Sulphur Dioxide (SO₂), and Nitrogen Oxides (NOₓ)</strong>.
          </p>
        </div>

        {/* Form 2: Solid Aerosols */}
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0', fontSize: '1.1rem' }}>2. Solid Aerosols</h4>
          <p style={{ fontSize: '0.86rem', color: 'rgba(224, 242, 254, 0.8)', lineHeight: 1.55 }}>
            Suspended solid particulate matter including <strong>dust, smoke, carbon soot, metallic fumes, and natural windblown dust</strong>.
          </p>
        </div>

        {/* Form 3: Liquid Aerosols */}
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0', fontSize: '1.1rem' }}>3. Liquid Aerosols</h4>
          <p style={{ fontSize: '0.86rem', color: 'rgba(224, 242, 254, 0.8)', lineHeight: 1.55 }}>
            Finely dispersed liquid droplets suspended in air, such as <strong>acid mists (H₂SO₄ mist), chemical sprays, and photochemical condensation</strong>.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '16px 20px', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#e0f2fe' }}>
          <strong>Critical Course Fact:</strong> Anthropogenic (human-made) sources have changed the composition of global air by <strong>less than 0.01%</strong>, yet this fraction causes massive regional health and climate disruptions.
        </p>
      </div>
    </section>
  );
}

/* ─── CH-07: HEALTH EFFECTS SCREEN ─── */
export function HealthEffectsScreen() {
  const [selectedPollutant, setSelectedPollutant] = useState(0);

  const healthData = [
    { name: 'Suspended Particulate Matter (SPM)', organ: 'Lungs & Heart', danger: 'Critical', detail: 'Lodges deeply into alveoli and enters bloodstream. Special emphasis: affects more people globally than any other pollutant, with the deepest epidemiological records.' },
    { name: 'Carbon Monoxide (CO)', organ: 'Blood & Brain', danger: 'Severe', detail: 'Binds with hemoglobin to form carboxyhemoglobin, cutting oxygen delivery. Causes slowed reflexes, confusion, and cardiovascular impairment.' },
    { name: 'Sulphur Dioxide (SO₂)', organ: 'Respiratory Tract', danger: 'High', detail: 'Oxidizes to sulphuric acid mist. Induces wheezing, shortness of breath, and severe chronic bronchitis.' },
    { name: 'Lead (Pb)', organ: 'Nervous System & Digestion', danger: 'Hazardous', detail: 'Damages central nervous system and cognitive development in children. Linked to digestive failure and carcinogenicity.' },
    { name: 'Radon', organ: 'Lungs', danger: 'Radioactive', detail: 'Inert radioactive decay product from soil and bedrock under homes. Leading cause of lung cancer in non-smokers.' },
  ];

  return (
    <section className="air-chapter-screen" id="ch-health">
      <div className="air-chapter-header">
        <span className="air-chapter-tag">PART 06 · HUMAN PATHOLOGY</span>
        <h2 className="air-chapter-title">Effects of Air Pollution on Human Health</h2>
        <p className="air-chapter-subtitle">
          Trace how atmospheric toxins penetrate human respiratory, cardiovascular, and neurological systems.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Selector List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {healthData.map((item, idx) => (
            <div
              key={item.name}
              onClick={() => setSelectedPollutant(idx)}
              style={{
                padding: '14px 18px',
                borderRadius: '12px',
                background: selectedPollutant === idx ? 'rgba(56, 189, 248, 0.2)' : 'rgba(8, 20, 32, 0.65)',
                border: `1px solid ${selectedPollutant === idx ? '#38bdf8' : 'rgba(159, 184, 196, 0.18)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{item.name}</strong>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{item.organ}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pathology Detail Card */}
        <div style={{ background: 'rgba(8, 20, 32, 0.8)', padding: '24px', borderRadius: '18px', border: '1px solid rgba(159, 184, 196, 0.25)' }}>
          <span style={{ fontSize: '0.75rem', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
            Impact Profile · {healthData[selectedPollutant].danger}
          </span>
          <h3 style={{ color: '#fff', fontSize: '1.4rem', margin: '6px 0 12px 0' }}>{healthData[selectedPollutant].name}</h3>
          <p style={{ color: '#7dd3fc', fontSize: '0.9rem', marginBottom: '14px', fontWeight: 600 }}>
            Primary Target: {healthData[selectedPollutant].organ}
          </p>
          <p style={{ color: 'rgba(224, 242, 254, 0.85)', lineHeight: 1.65, fontSize: '0.9rem' }}>
            {healthData[selectedPollutant].detail}
          </p>
        </div>
      </div>
    </section>
  );
}



/* ─── CH-10: SMOKE & ITS CONTROL ─── */
export function SmokeControlScreen() {
  return (
    <section className="air-chapter-screen" id="ch-smoke">
      <div className="air-chapter-header">
        <span className="air-chapter-tag">PART 09 · COMBUSTION CONTROL</span>
        <h2 className="air-chapter-title">Smoke & Its Control</h2>
        <p className="air-chapter-subtitle">
          Smoke is a dense aerosol of unburned carbon soot, ash, and volatile organic particles emitted during combustion.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>Cleaner Alternate Fuels</h4>
          <p style={{ fontSize: '0.85rem', color: 'rgba(224, 242, 254, 0.8)', margin: 0 }}>
            Transitioning from high-ash raw coal and heavy bunker fuels to natural gas (methane) and renewable biofuels.
          </p>
        </div>
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>Combustion Engineering</h4>
          <p style={{ fontSize: '0.85rem', color: 'rgba(224, 242, 254, 0.8)', margin: 0 }}>
            Ensuring high turbulence, optimal air-fuel ratios, and sufficient residence time to achieve complete combustion.
          </p>
        </div>
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <h4 style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>Vehicle Catalytic Converters</h4>
          <p style={{ fontSize: '0.85rem', color: 'rgba(224, 242, 254, 0.8)', margin: 0 }}>
            Three-way catalytic converters utilizing platinum/palladium/rhodium to convert CO and unburned hydrocarbons into CO₂ and water.
          </p>
        </div>
      </div>
    </section>
  );
}



/* ─── CH-12: PHOTOCHEMICAL SMOG & REACTIONS ─── */
export function PhotochemicalScreen() {
  return (
    <section className="air-chapter-screen" id="ch-photochemical" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="air-chapter-header">
        <span className="air-chapter-tag">PART 11 · ATMOSPHERIC PHOTOCHEMISTRY</span>
        <h2 className="air-chapter-title">Photochemical Changes &amp; Smog</h2>
        <p className="air-chapter-subtitle">
          Photochemical reactions occur when solar radiation provides activation energy for reactions between primary vehicle pollutants (NOₓ and volatile hydrocarbons) to synthesize hazardous secondary oxidants.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Left Card: 3 Key Chain Reactions */}
        <div style={{ background: 'rgba(8, 20, 36, 0.82)', padding: '24px', borderRadius: '18px', border: '1px solid rgba(56, 189, 248, 0.25)', boxShadow: '0 12px 32px rgba(0,0,0,0.45)' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700 }}>
            Tropospheric Reaction Mechanism
          </span>
          <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '6px 0 16px 0' }}>Formation of Photochemical Smog</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--mono, monospace)', fontSize: '0.86rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '12px 14px', borderRadius: '10px', borderLeft: '3px solid #38bdf8', color: '#e0f2fe' }}>
              <div style={{ fontSize: '0.72rem', color: '#7dd3fc', marginBottom: '4px', textTransform: 'uppercase' }}>Step 1 · Photolysis of NO₂</div>
              <strong>NO₂ + Sunlight (hν) → NO + O (Atomic Oxygen)</strong>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '12px 14px', borderRadius: '10px', borderLeft: '3px solid #38bdf8', color: '#e0f2fe' }}>
              <div style={{ fontSize: '0.72rem', color: '#7dd3fc', marginBottom: '4px', textTransform: 'uppercase' }}>Step 2 · Ground-Level Ozone Synthesis</div>
              <strong>O + O₂ → O₃ (Tropospheric Ozone)</strong>
            </div>

            <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '12px 14px', borderRadius: '10px', borderLeft: '3px solid #f97316', color: '#fed7aa' }}>
              <div style={{ fontSize: '0.72rem', color: '#fdba74', marginBottom: '4px', textTransform: 'uppercase' }}>Step 3 · Peroxyacetyl Nitrate (PAN)</div>
              <strong>O₃ + Hydrocarbons (VOCs) → PAN + Aldehydes</strong>
            </div>
          </div>
        </div>

        {/* Right Card: Smog Effects & Symptoms */}
        <div style={{ background: 'rgba(8, 20, 36, 0.82)', padding: '24px', borderRadius: '18px', border: '1px solid rgba(56, 189, 248, 0.25)', boxShadow: '0 12px 32px rgba(0,0,0,0.45)' }}>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: '#f87171', textTransform: 'uppercase', fontWeight: 700 }}>
            Pathological &amp; Environmental Impact
          </span>
          <h3 style={{ color: '#ffffff', fontSize: '1.25rem', margin: '6px 0 16px 0' }}>Consequences of Smog Episode</h3>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', marginTop: '6px', flexShrink: 0 }} />
              <span><strong>Severe Eye &amp; Throat Irritation:</strong> PAN and acrolein are potent lacrimators that cause burning eyes and respiratory distress.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b', marginTop: '6px', flexShrink: 0 }} />
              <span><strong>Atmospheric Brown Haze:</strong> Optical scattering by aerosol particulates significantly cuts aviation and urban driving visibility.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', marginTop: '6px', flexShrink: 0 }} />
              <span><strong>Vegetation &amp; Crop Necrosis:</strong> Ozone attacks plant stomata, suppresses photosynthesis, and damages sensitive food crops like tobacco, spinach, and beans.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', marginTop: '6px', flexShrink: 0 }} />
              <span><strong>Aggravation of Asthma:</strong> Triggers acute bronchial constriction, reduced lung capacity, and increased emergency admissions during summer peak heat.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Summary Table: Troposphere vs Stratosphere Photochemistry */}
      <div style={{ background: 'rgba(8, 20, 36, 0.75)', padding: '20px 24px', borderRadius: '16px', border: '1px solid rgba(148, 163, 184, 0.18)', marginBottom: '16px' }}>
        <h4 style={{ color: '#38bdf8', fontSize: '1rem', margin: '0 0 12px 0' }}>Photochemical Effects by Atmospheric Altitude (Syllabus Summary)</h4>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', color: '#e2e8f0' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(56, 189, 248, 0.3)', textAlign: 'left', color: '#93c5fd' }}>
                <th style={{ padding: '8px 12px' }}>Atmospheric Layer</th>
                <th style={{ padding: '8px 12px' }}>Photochemical Reactants</th>
                <th style={{ padding: '8px 12px' }}>Resulting Phenomenon</th>
                <th style={{ padding: '8px 12px' }}>Environmental Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#ffffff' }}>Troposphere (Ground Level)</td>
                <td style={{ padding: '10px 12px' }}>Sunlight (hν) + NOₓ + VOCs</td>
                <td style={{ padding: '10px 12px' }}>Photochemical Smog &amp; Ground-level Ozone (O₃)</td>
                <td style={{ padding: '10px 12px', color: '#f87171' }}>Harmful Secondary Pollutant</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#ffffff' }}>Stratosphere (~24 km)</td>
                <td style={{ padding: '10px 12px' }}>Solar UV + CFCs / Halons</td>
                <td style={{ padding: '10px 12px' }}>Photolytic Cl radical release &amp; Ozone Layer Depletion</td>
                <td style={{ padding: '10px 12px', color: '#f87171' }}>Harmful Depletion of Protective Shield</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─── CH-13: SUMMARY & RECAP SCREEN ─── */
export function AirSummaryScreen({ module }: { module: ModuleContent }) {
  return (
    <section className="air-chapter-screen" id="ch-summary">
      <div className="air-chapter-header">
        <span className="air-chapter-tag">[ END OF MODULE 03 ] · FIELD NOTES</span>
        <h2 className="air-chapter-title">Module 03 Summary & Recap</h2>
        <p className="air-chapter-subtitle">
          Consolidate your knowledge of atmospheric physics, pollution taxonomy, standards, and environmental treaties.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <span style={{ fontSize: '0.72rem', color: '#7dd3fc' }}>01 · DRY AIR N₂</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0 0 0', color: '#fff' }}>78.084%</p>
        </div>
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <span style={{ fontSize: '0.72rem', color: '#7dd3fc' }}>02 · TROPOSPHERE</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0 0 0', color: '#fff' }}>~12 km / ~80% mass</p>
        </div>
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <span style={{ fontSize: '0.72rem', color: '#7dd3fc' }}>03 · ANTHROPOGENIC</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0 0 0', color: '#fff' }}>&lt; 0.01% global air</p>
        </div>
        <div style={{ background: 'rgba(8, 20, 32, 0.7)', padding: '18px', borderRadius: '14px', border: '1px solid rgba(159, 184, 196, 0.2)' }}>
          <span style={{ fontSize: '0.72rem', color: '#7dd3fc' }}>04 · MONTREAL PROTOCOL</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0 0 0', color: '#fff' }}>1987 / ~2050 recovery</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
        <Link
          to="/quiz?module=air"
          className="air-btn-primary"
          style={{ textDecoration: 'none' }}
        >
          <span>Take the Module 03 Quiz</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          to="/module/biodiversity"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.06)',
            color: '#e0f2fe',
            border: '1px solid rgba(159, 184, 196, 0.25)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          <span>Continue to Biodiversity</span>
          <ChevronRight size={16} />
        </Link>
        <a
          href="/notes/module-03-air.md"
          download
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            borderRadius: '9999px',
            background: 'transparent',
            color: '#38bdf8',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            textDecoration: 'none',
            fontSize: '0.88rem',
          }}
        >
          <BookOpen size={15} />
          <span>Download Syllabus Notes</span>
        </a>
      </div>
    </section>
  );
}
