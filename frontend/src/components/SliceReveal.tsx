import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode, type CSSProperties } from 'react';

interface SliceRevealProps {
  children: ReactNode;
  /** Number of horizontal slices */
  slices?: number;
  /** Stagger delay between slices in seconds */
  stagger?: number;
  /** Duration of each slice wipe */
  duration?: number;
  /** Direction of slice reveal: 'left' | 'right' | 'alternate' */
  direction?: 'left' | 'right' | 'alternate';
  /** Initial delay before animation starts */
  delay?: number;
  className?: string;
  /** Trigger only once when scrolled into view */
  once?: boolean;
}

/**
 * SliceReveal — cuts the children region into N horizontal bands
 * and wipes each one open with a clip-path animation, creating a
 * crisp 2-D "slicing" entrance effect.
 */
const SliceReveal = ({
  children,
  slices = 8,
  stagger = 0.055,
  duration = 0.55,
  direction = 'alternate',
  delay = 0,
  className = '',
  once = true,
}: SliceRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const sliceHeight = 100 / slices;

  return (
    <div
      ref={ref}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Render the children once as the real content layer */}
      <div style={{ visibility: isInView ? 'visible' : 'hidden' }}>
        {children}
      </div>

      {/* Overlay slices that wipe away to reveal content */}
      {Array.from({ length: slices }).map((_, i) => {
        // Determine which direction this slice slides
        const goLeft =
          direction === 'left' ||
          (direction === 'alternate' && i % 2 === 0);

        const translateX = goLeft ? '-102%' : '102%';

        const sliceStyle: CSSProperties = {
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${i * sliceHeight}%`,
          height: `${sliceHeight + 0.5}%`, // tiny overlap prevents hairline gaps
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 10,
        };

        return (
          <motion.div
            key={i}
            style={sliceStyle}
            initial={{ x: 0 }}
            animate={
              isInView
                ? { x: translateX, transition: { duration, delay: delay + i * stagger, ease: [0.77, 0, 0.175, 1] } }
                : { x: 0 }
            }
          >
            {/* Each slice shows a solid background that slides away */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--color-royal-black, #0a0a0a)',
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default SliceReveal;
