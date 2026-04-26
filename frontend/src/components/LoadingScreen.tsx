import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  /** Duration in ms before auto-dismissing. Default: 2800 */
  duration?: number;
  /** Called when the loader finishes */
  onComplete?: () => void;
}

export default function LoadingScreen({ duration = 2800, onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: [0.215, 0.61, 0.355, 1.0] }}
          className="loading-screen"
          aria-label="Loading Visualix"
          role="status"
        >
          {/* Noise overlay */}
          <div className="ls-noise" aria-hidden="true" />

          {/* Ambient gold orbs */}
          <div className="ls-orb ls-orb-1" aria-hidden="true" />
          <div className="ls-orb ls-orb-2" aria-hidden="true" />

          {/* Horizontal speed lines (long fazers) */}
          <div className="ls-longfazers" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* ── Speeder character loader ── */}
          <div className="ls-loader" aria-hidden="true">
            {/* Trail sparks */}
            <span className="ls-trail">
              <span />
              <span />
              <span />
              <span />
            </span>
            {/* Body */}
            <div className="ls-base">
              <span />
              <div className="ls-face" />
            </div>
          </div>

          {/* Branded text block */}
          <div className="ls-content">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="ls-logo-row"
            >
              {/* Visualix SVG icon */}
              <svg width="32" height="30" viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="ls-grad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop offset="0%"   stopColor="#7A5C10" />
                    <stop offset="30%"  stopColor="#C9962A" />
                    <stop offset="55%"  stopColor="#F5E67A" />
                    <stop offset="80%"  stopColor="#C9962A" />
                    <stop offset="100%" stopColor="#7A5C10" />
                  </linearGradient>
                </defs>
                <polygon points="50,5 97,80 3,80"    fill="none" stroke="url(#ls-grad)" strokeWidth="6"   strokeLinejoin="round" />
                <polygon points="50,22 84,73 16,73"  fill="none" stroke="url(#ls-grad)" strokeWidth="3.5" strokeLinejoin="round" opacity="0.55" />
                <polygon points="36,35 36,60 58,47"  fill="url(#ls-grad)" />
                <rect x="61" y="38" width="4.5" height="20" rx="2" fill="url(#ls-grad)" />
                <rect x="69" y="32" width="4.5" height="32" rx="2" fill="url(#ls-grad)" />
                <rect x="77" y="40" width="4.5" height="16" rx="2" fill="url(#ls-grad)" />
              </svg>
              <span className="ls-wordmark shimmer-text">VISUALIX</span>
            </motion.div>

            <motion.h1
              className="ls-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
            >
              Initializing Experience
            </motion.h1>

            <motion.p
              className="ls-subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Synchronizing creative vectors
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="ls-progress-wrap"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <div className="ls-progress-track">
                <div className="ls-progress-bar" />
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="ls-corner ls-corner-tl" aria-hidden="true">
            <span className="ls-corner-dot" />
            <span className="ls-corner-label">VISUALIX ENGINE v4.0</span>
          </div>
          <div className="ls-corner ls-corner-tr" aria-hidden="true">
            <span className="ls-corner-label">LATENCY: 14 ms</span>
            <span className="ls-corner-dot ls-dot-gold" />
          </div>
          <div className="ls-corner ls-corner-bl" aria-hidden="true">
            <span className="ls-status-dot" />
            <span className="ls-corner-label">SYSTEMS NOMINAL</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
