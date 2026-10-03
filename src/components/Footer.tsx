import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mountain,
  Droplet,
  Wind,
  Trees,
  Globe,
  FileText,
  Download,
  BookOpen,
  BarChart3,
  ExternalLink,
  Mail,
  ArrowRight,
  Github,
  Linkedin,
  Youtube,
  CheckCircle2,
} from 'lucide-react';

export default function Footer() {
  const reduced = useReducedMotion();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <footer className="site-footer-reference" id="footer" aria-label="Site Footer">
      {/* Upper Banner: Same Planet. Brighter Tomorrow */}
      <div className="footer-banner-header">
        <div className="footer-banner-scrim" />
        <div className="footer-banner-content">
          <motion.div
            className="footer-banner-left"
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="footer-brand-overline">
              <span className="footer-brand-logo-mark">T</span>
              <span>TERRA | Conservation of Natural Resources</span>
            </div>
            <h2 className="footer-banner-title">
              Same Planet.
              <br />
              <em>Brighter Tomorrow.</em>
            </h2>
            <p className="footer-banner-desc">
              Explore, learn and take action for a more sustainable and balanced planet through
              land, water, air, biodiversity and global warming.
            </p>
          </motion.div>
          <motion.div
            className="footer-script-tag"
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            A Greener
            <br />
            Future Together.
          </motion.div>
        </div>
      </div>

      {/* 4 Main Footer Columns */}
      <div className="footer-main-columns">
        {/* Column 1: Explore Modules */}
        <motion.div
          className="footer-col"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="footer-col-title">Explore Modules</h3>
          <div className="footer-module-list">
            <Link to="/module/land" className="footer-module-item is-highlighted">
              <Mountain size={14} />
              <span className="footer-item-num">01</span>
              <span>Land</span>
            </Link>
            <Link to="/module/water" className="footer-module-item">
              <Droplet size={13} />
              <span className="footer-item-num">02</span>
              <span>Water</span>
            </Link>
            <Link to="/module/air" className="footer-module-item">
              <Wind size={13} />
              <span className="footer-item-num">03</span>
              <span>Air</span>
            </Link>
            <Link to="/module/biodiversity" className="footer-module-item">
              <Trees size={13} />
              <span className="footer-item-num">04</span>
              <span>Biodiversity</span>
            </Link>
            <Link to="/module/warming" className="footer-module-item">
              <Globe size={13} />
              <span className="footer-item-num">05</span>
              <span>Global Warming</span>
            </Link>
          </div>
        </motion.div>

        {/* Column 2: Quick Links (All Site Pages, FAQs removed) */}
        <motion.div
          className="footer-col"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="footer-col-title">Quick Links</h3>
          <div className="footer-quick-list">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/modules">Modules</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/resources">Resources</Link>
          </div>
        </motion.div>

        {/* Column 3: Resources (All items direct directly to /resources) */}
        <motion.div
          className="footer-col"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="footer-col-title">Resources</h3>
          <div className="footer-resources-list">
            <Link to="/resources" className="footer-resource-item">
              <FileText size={13} />
              <span>Study Materials</span>
            </Link>
            <Link to="/resources" className="footer-resource-item">
              <Download size={13} />
              <span>Module Notes (PDF)</span>
            </Link>
            <Link to="/resources" className="footer-resource-item">
              <BookOpen size={13} />
              <span>Syllabus & Guides</span>
            </Link>
            <Link to="/resources" className="footer-resource-item">
              <BarChart3 size={13} />
              <span>Knowledge Check</span>
            </Link>
            <Link to="/resources" className="footer-resource-item">
              <ExternalLink size={13} />
              <span>Course Details</span>
            </Link>
          </div>
        </motion.div>

        {/* Column 4: Stay Connected */}
        <motion.div
          className="footer-col footer-stay-col"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="footer-col-title">Stay Connected</h3>
          <p className="footer-stay-desc">Get the latest updates, new modules and resources.</p>
          {subscribed ? (
            <div className="footer-subscribe-success" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(74, 222, 128, 0.35)', borderRadius: '12px', color: '#86efac', fontSize: '0.86rem' }}>
              <CheckCircle2 size={16} />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form className="footer-subscribe-box" onSubmit={handleSubscribe}>
              <Mail size={14} />
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="footer-subscribe-btn">
                <span>Subscribe</span>
                <ArrowRight size={11} />
              </button>
            </form>
          )}
          <label className="footer-agree-row">
            <input type="checkbox" defaultChecked />
            <span>I agree to receive educational updates from TERRA.</span>
          </label>
        </motion.div>
      </div>

      {/* Bottom Bar: Brand | Motto | Developer Social Accounts */}
      <motion.div
        className="footer-bottom-reference"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="footer-bottom-brand">
          <span className="footer-bottom-brand-circle">T</span>
          <span>TERRA | Conservation of Natural Resources</span>
        </div>

        <div className="footer-bottom-motto">
          KNOWLEDGE TODAY. A BRIGHTER TOMORROW.
        </div>

        {/* Developer accounts exclusively from the About page (Mujutaba M N) */}
        <div className="footer-bottom-socials">
          <a
            href="https://github.com/mujju-212"
            target="_blank"
            rel="noreferrer"
            aria-label="Developer GitHub (mujju-212)"
            title="GitHub: mujju-212"
            className="footer-social-btn"
          >
            <Github size={13} />
          </a>
          <a
            href="https://www.linkedin.com/in/mujutaba-mn/"
            target="_blank"
            rel="noreferrer"
            aria-label="Developer LinkedIn (Mujutaba M N)"
            title="LinkedIn: Mujutaba M N"
            className="footer-social-btn"
          >
            <Linkedin size={13} />
          </a>
          <a
            href="https://www.youtube.com/@mujjumn3615"
            target="_blank"
            rel="noreferrer"
            aria-label="Developer YouTube (@mujjumn3615)"
            title="YouTube: @mujjumn3615"
            className="footer-social-btn"
          >
            <Youtube size={13} />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
