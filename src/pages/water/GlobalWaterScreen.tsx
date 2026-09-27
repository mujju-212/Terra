import { useState } from 'react';
import {
  Sparkles,
  Droplet,
  Layers,
  Waves,
  Mountain,
  AlertTriangle,
  Lightbulb,
  Check,
  PieChart,
} from 'lucide-react';
import {
  globalDistributionData,
  accessibleBreakdownData,
  globalTakeawaysData,
} from './waterData';

export function GlobalWaterScreen() {
  const [selectedGlobalCallout, setSelectedGlobalCallout] = useState<'saltwater' | 'freshwater' | 'accessible' | null>(null);
  const [activeDistribRow, setActiveDistribRow] = useState<number | null>(null);

  return (
        <section className="water-global-chapter-section" id="ch-03" data-chapter="04">
          {/* Background Earth globe scenery */}
          <div className="water-global-canvas-bg" />
          <div className="water-global-scrim-left" />
          <div className="water-global-scrim-top" />
          <div className="water-global-scrim-bottom" />

          {/* Top Row: Header (Left) and Quote (Right) */}
          <div className="water-global-top-row">
            <div className="water-global-header">
              <p className="water-global-eyebrow">CHAPTER 03</p>
              <h2 className="water-global-title">
                Global<br />
                <span className="title-accent">Water</span> Resources
              </h2>
              <p className="water-global-desc">
                Earth has a vast amount of water, but only a small fraction is freshwater, and an even smaller fraction is easily accessible for human use.
              </p>
            </div>

            <div className="water-global-quote-card">
              <span className="water-global-quote-mark">“</span>
              <p className="water-global-quote-text">
                Though Earth is called the blue planet, only a small fraction of its water is available for our use.
              </p>
            </div>
          </div>

          {/* 3 Interactive Glowing Callouts pointing to the Earth Globe */}
          <div className="water-globe-callouts-layer" role="group" aria-label="Global water proportions">
            {/* Callout 1: 97.5% Saltwater (top) */}
            <div
              className={`water-globe-callout callout-saltwater ${selectedGlobalCallout === 'saltwater' ? 'is-active' : ''}`}
              onClick={() => setSelectedGlobalCallout(selectedGlobalCallout === 'saltwater' ? null : 'saltwater')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedGlobalCallout(selectedGlobalCallout === 'saltwater' ? null : 'saltwater');
              }}
              title="Click to explore Saltwater"
            >
              <div className="water-globe-callout-val">97.5%</div>
              <div className="water-globe-callout-label">Saltwater</div>
              <div className="water-globe-callout-sub">(Oceans and Seas)</div>
              <div className="water-globe-callout-pointer pointer-down" />
            </div>

            {/* Callout 2: 2.5% Freshwater (upper right) */}
            <div
              className={`water-globe-callout callout-freshwater ${selectedGlobalCallout === 'freshwater' ? 'is-active' : ''}`}
              onClick={() => setSelectedGlobalCallout(selectedGlobalCallout === 'freshwater' ? null : 'freshwater')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedGlobalCallout(selectedGlobalCallout === 'freshwater' ? null : 'freshwater');
              }}
              title="Click to highlight Freshwater distribution"
            >
              <div className="water-globe-callout-val">2.5%</div>
              <div className="water-globe-callout-label">Freshwater</div>
              <div className="water-globe-callout-sub">(Total)</div>
              <div className="water-globe-callout-pointer pointer-left-top" />
            </div>

            {/* Callout 3: ~1% Accessible (middle right) */}
            <div
              className={`water-globe-callout callout-accessible ${selectedGlobalCallout === 'accessible' ? 'is-active' : ''}`}
              onClick={() => setSelectedGlobalCallout(selectedGlobalCallout === 'accessible' ? null : 'accessible')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedGlobalCallout(selectedGlobalCallout === 'accessible' ? null : 'accessible');
              }}
              title="Click to highlight Accessible breakdown"
            >
              <div className="water-globe-callout-val">~1%</div>
              <div className="water-globe-callout-label">Easily Accessible</div>
              <div className="water-globe-callout-sub">Freshwater</div>
              <div className="water-globe-callout-pointer pointer-left-bottom" />
            </div>
          </div>

          {/* Middle Row: Two Grand Cards (Distribution of Earth's Water & Accessible Freshwater) */}
          <div className="water-global-middle-deck">
            {/* Card 1: Distribution of Earth's Water */}
            <div className={`water-distrib-card ${selectedGlobalCallout === 'freshwater' ? 'is-highlighted' : ''}`}>
              <h3 className="water-distrib-title">
                Distribution of <span className="title-accent">Earth's Water</span>
              </h3>

              <div className="water-distrib-body">
                {/* Left Droplet Globe Visual */}
                <div className="water-droplet-col">
                  {/* Callout 1: 97.5% Saltwater (top-left) */}
                  <div className="water-droplet-callout callout-droplet-salt">
                    <span className="water-droplet-val">97.5%</span>
                    <span className="water-droplet-sub">Saltwater<br />(Oceans and Seas)</span>
                  </div>

                  <div className="water-droplet-frame">
                    <img
                      src="/images/water-droplet-globe.jpg"
                      alt="Water droplet earth sphere representation"
                      className="water-droplet-img"
                    />
                    <div className="water-droplet-glow" />
                  </div>

                  {/* Callout 2: 2.5% Freshwater (bottom-right) */}
                  <div className="water-droplet-callout callout-droplet-fresh">
                    <div className="water-droplet-fresh-row">
                      <PieChart size={13} className="water-mini-pie" />
                      <span className="water-droplet-val">2.5%</span>
                    </div>
                    <span className="water-droplet-sub">Freshwater<br />(Total)</span>
                  </div>
                </div>

                {/* Right Breakdown Rows */}
                <div className="water-distrib-col-right">
                  <h4 className="water-distrib-subheading">Of the 2.5% Freshwater:</h4>
                  <div className="water-distrib-rows">
                    {globalDistributionData.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`water-distrib-row ${activeDistribRow === idx ? 'is-active' : ''}`}
                        onMouseEnter={() => setActiveDistribRow(idx)}
                        onMouseLeave={() => setActiveDistribRow(null)}
                      >
                        <div
                          className="water-distrib-thumb"
                          style={{ backgroundImage: `url(${item.thumb})` }}
                          role="img"
                          aria-label={item.title}
                        />
                        <div className="water-distrib-cyan-bar" />
                        <span className="water-distrib-item-pct">{item.percentage}</span>
                        <span className="water-distrib-item-title">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Accessible Freshwater ( ~1% ) */}
            <div className={`water-accessible-card ${selectedGlobalCallout === 'accessible' ? 'is-highlighted' : ''}`}>
              <h3 className="water-accessible-title">Accessible Freshwater ( ~1% )</h3>

              <div className="water-accessible-grid">
                {accessibleBreakdownData.map((item) => (
                  <div key={item.id} className="water-accessible-item">
                    <div className="water-accessible-circle-frame">
                      <img
                        src={item.circle}
                        alt={item.title}
                        className="water-accessible-circle-img"
                      />
                    </div>
                    <div className="water-accessible-texts">
                      <span className="water-accessible-name">{item.title}</span>
                      <span className="water-accessible-pct">{item.percentage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row: Key Takeaways (Left) & Real-World Perspective (Right) */}
          <div className="water-global-bottom-row">
            {/* Key Takeaways */}
            <div className="water-takeaways-deck">
              <h3 className="water-takeaways-title">Key Takeaways</h3>
              <div className="water-takeaways-grid">
                {globalTakeawaysData.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div key={t.title} className="water-takeaway-card">
                      <div className="water-takeaway-icon-circle">
                        <Icon size={16} />
                      </div>
                      <h4 className="water-takeaway-card-title">{t.title}</h4>
                      <p className="water-takeaway-desc">{t.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Real-World Perspective */}
            <div className="water-perspective-card">
              <h3 className="water-perspective-title">Real-World Perspective</h3>
              <div className="water-perspective-float-box">
                <p className="water-perspective-quote">
                  Earth has enough water to sustain all life, but its uneven distribution and limited accessibility make water a precious and strategic resource.
                </p>
              </div>
            </div>
          </div>
        </section>


  );
}
