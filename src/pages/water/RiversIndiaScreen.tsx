import { useState } from 'react';
import {
  Droplets,
  Droplet,
  Layers,
  MapPin,
  Waves,
  Mountain,
  Navigation,
  GitBranch,
  Building2,
  ChevronLeft,
  ChevronRight,
  Users2,
  Sprout,
  Target,
} from 'lucide-react';
import { riverBasinsData } from './waterData';
import { IndiaRiversInteractiveMap } from '../../components/IndiaRiversInteractiveMap';

export function RiversIndiaScreen() {
  const [selectedBasinId, setSelectedBasinId] = useState<string>('ganga');
  const selectedBasin = riverBasinsData.find((b) => b.id === selectedBasinId) || riverBasinsData[0];
  const [hoveredRiverId, setHoveredRiverId] = useState<string | null>(null);

  return (
        <section className="water-rivers-chapter-section" id="ch-04" data-chapter="05">
          {/* Background Scenery: Himalayan mountains + India Relief Map */}
          <div className="water-rivers-canvas-bg" />
          <div className="water-rivers-scrim-left" />
          <div className="water-rivers-scrim-top" />
          <div className="water-rivers-scrim-bottom" />

          {/* Top Row: Header (Left) and Quote (Right) */}
          <div className="water-rivers-top-row">
            <div className="water-rivers-header">
              <p className="water-rivers-eyebrow">CHAPTER 04</p>
              <h2 className="water-rivers-title">
                Rivers <span className="title-accent">in India</span>
              </h2>
              <p className="water-rivers-desc">
                India has a vast network of rivers, which are grouped into major <strong>river basins</strong>. These <strong>rivers</strong> are vital for agriculture, industry, drinking water and ecosystems.
              </p>
            </div>

            <div className="water-rivers-quote-card">
              <span className="water-rivers-quote-mark">“</span>
              <p className="water-rivers-quote-text">
                Rivers are the lifelines of India, shaping its geography, economy and culture.
              </p>
            </div>
          </div>

          {/* 3-Column Middle Deck: Left Controls, Center Map Stage (680x740), Right River Details Card */}
          <div className="water-rivers-middle-deck">
            {/* COLUMN 1: Basins Selector Card + 4 Metric Stat Pills */}
            <div className="water-rivers-left-col">
              {/* Card 1: Major River Basins in India */}
              <div className="water-basins-selector-card">
                <h3 className="water-basins-selector-title">Major River Basins in India</h3>
                <div className="water-basins-selector-grid">
                  {/* Left Column of Basins */}
                  <div className="water-basins-btn-col">
                    {riverBasinsData.slice(0, 3).map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className={`water-basin-select-btn ${selectedBasinId === b.id ? 'is-active' : ''}`}
                        onClick={() => setSelectedBasinId(b.id)}
                      >
                        <div className="water-basin-btn-left">
                          <span className="water-basin-dot" style={{ background: b.color, boxShadow: `0 0 8px ${b.color}` }} />
                          <span className="water-basin-name">{b.name}</span>
                        </div>
                        <ChevronRight size={14} className="water-basin-chevron" />
                      </button>
                    ))}
                  </div>

                  {/* Right Column of Basins */}
                  <div className="water-basins-btn-col">
                    {riverBasinsData.slice(3, 6).map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className={`water-basin-select-btn ${selectedBasinId === b.id ? 'is-active' : ''}`}
                        onClick={() => setSelectedBasinId(b.id)}
                      >
                        <div className="water-basin-btn-left">
                          <span className="water-basin-dot" style={{ background: b.color, boxShadow: `0 0 8px ${b.color}` }} />
                          <span className="water-basin-name">{b.name}</span>
                        </div>
                        <ChevronRight size={14} className="water-basin-chevron" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4 Metric Stats (2x2 Grid) */}
              <div className="water-rivers-stats-grid">
                <div className="water-river-stat-card">
                  <div className="water-river-stat-icon-wrap">
                    <Waves size={20} className="water-stat-icon" />
                  </div>
                  <div className="water-river-stat-info">
                    <div className="water-river-stat-number">14+</div>
                    <div className="water-river-stat-label">Major River Basins</div>
                  </div>
                </div>

                <div className="water-river-stat-card">
                  <div className="water-river-stat-icon-wrap">
                    <Droplet size={20} className="water-stat-icon" />
                  </div>
                  <div className="water-river-stat-info">
                    <div className="water-river-stat-number">~70%</div>
                    <div className="water-river-stat-label">of annual rainfall flows through rivers</div>
                  </div>
                </div>

                <div className="water-river-stat-card">
                  <div className="water-river-stat-icon-wrap">
                    <Users2 size={20} className="water-stat-icon" />
                  </div>
                  <div className="water-river-stat-info">
                    <div className="water-river-stat-number">500+</div>
                    <div className="water-river-stat-label">Million people depend on rivers</div>
                  </div>
                </div>

                <div className="water-river-stat-card">
                  <div className="water-river-stat-icon-wrap">
                    <Sprout size={20} className="water-stat-icon" />
                  </div>
                  <div className="water-river-stat-info">
                    <div className="water-river-stat-number">Critical</div>
                    <div className="water-river-stat-label">for agriculture, industry and biodiversity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2: DEDICATED INTERACTIVE INDIA MAP COMPONENT (100% Vector SVG, Zero Raster Map) */}
            <div className="water-rivers-center-map-col" role="region" aria-label="Interactive India River Basins Map">
              <IndiaRiversInteractiveMap
                basins={riverBasinsData}
                selectedBasinId={selectedBasinId}
                onSelectBasin={(id) => setSelectedBasinId(id)}
                hoveredRiverId={hoveredRiverId}
                onHoverRiver={(id) => setHoveredRiverId(id)}
              />
            </div>

            {/* COLUMN 3: Selected River Details Panel */}
            <div className="water-river-details-card">
              {/* Photo Banner with Authentic River Photograph */}
              <div className="water-river-banner-frame">
                <img
                  src={selectedBasin.banner}
                  alt={selectedBasin.riverName}
                  className="water-river-banner-img"
                />
              </div>

              {/* River Heading */}
              <div className="water-river-details-head">
                <span
                  className="water-river-head-dot"
                  style={{ background: selectedBasin.color, boxShadow: `0 0 10px ${selectedBasin.color}` }}
                />
                <div>
                  <h3 className="water-river-head-title">{selectedBasin.riverName}</h3>
                  <span className="water-river-head-sub">{selectedBasin.name}</span>
                </div>
              </div>

              {/* 5 Specification Rows */}
              <div className="water-river-specs-list">
                <div className="water-river-spec-item">
                  <div className="water-spec-icon-wrap">
                    <Waves size={15} />
                  </div>
                  <div className="water-spec-content">
                    <span className="water-spec-value-strong">{selectedBasin.length}</span>
                  </div>
                </div>

                <div className="water-river-spec-item">
                  <div className="water-spec-icon-wrap">
                    <Mountain size={15} />
                  </div>
                  <div className="water-spec-content">
                    <span className="water-spec-label">Origin</span>
                    <span className="water-spec-value">{selectedBasin.origin}</span>
                  </div>
                </div>

                <div className="water-river-spec-item">
                  <div className="water-spec-icon-wrap">
                    <MapPin size={15} />
                  </div>
                  <div className="water-spec-content">
                    <span className="water-spec-label">Flows through</span>
                    <span className="water-spec-value">{selectedBasin.flowsThrough}</span>
                  </div>
                </div>

                <div className="water-river-spec-item">
                  <div className="water-spec-icon-wrap">
                    <Waves size={15} />
                  </div>
                  <div className="water-spec-content">
                    <span className="water-spec-label">Empties into</span>
                    <span className="water-spec-value">{selectedBasin.emptiesInto}</span>
                  </div>
                </div>

                <div className="water-river-spec-item">
                  <div className="water-spec-icon-wrap">
                    <Target size={15} />
                  </div>
                  <div className="water-spec-content">
                    <span className="water-spec-label">Importance</span>
                    <span className="water-spec-value">{selectedBasin.importance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Major Rivers in Each Basin (Carousel) */}
          <div className="water-rivers-carousel-card">
            <div className="water-carousel-header">
              <h3 className="water-carousel-title">Major Rivers in Each Basin</h3>
              <div className="water-carousel-nav-arrows">
                <button
                  type="button"
                  className="water-carousel-arrow-btn"
                  onClick={() => {
                    const currIdx = riverBasinsData.findIndex((b) => b.id === selectedBasinId);
                    const prevIdx = (currIdx - 1 + riverBasinsData.length) % riverBasinsData.length;
                    setSelectedBasinId(riverBasinsData[prevIdx].id);
                  }}
                  aria-label="Previous river basin"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="water-carousel-arrow-btn"
                  onClick={() => {
                    const currIdx = riverBasinsData.findIndex((b) => b.id === selectedBasinId);
                    const nextIdx = (currIdx + 1) % riverBasinsData.length;
                    setSelectedBasinId(riverBasinsData[nextIdx].id);
                  }}
                  aria-label="Next river basin"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="water-carousel-slides-deck">
              {riverBasinsData.map((basin) => (
                <div
                  key={basin.id}
                  className={`water-carousel-slide-item ${selectedBasinId === basin.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedBasinId(basin.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedBasinId(basin.id);
                  }}
                >
                  <div
                    className="water-carousel-thumb"
                    style={{ backgroundImage: `url(${basin.thumb})` }}
                  />
                  <div className="water-carousel-item-info">
                    <div className="water-carousel-item-name-row">
                      <span className="water-carousel-dot" style={{ background: basin.color, boxShadow: `0 0 6px ${basin.color}` }} />
                      <strong className="water-carousel-basin-name">{basin.name}</strong>
                    </div>
                    <p className="water-carousel-tributaries">{basin.tributaries}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


  );
}
