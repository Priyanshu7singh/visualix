import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface WordRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  /** Wrap each word in a given tag (for semantics) */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i,
      duration: 0.65,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  }),
};

/**
 * WordReveal — animates each word of a text string in with a staggered
 * fade + upward slide + blur-clear, delivering a premium "reveal" feel.
 *
 * Usage:
 *   <WordReveal as="h1" className="text-7xl text-white" delay={0.4}>
 *     Crafting Cinematic Visuals
 *   </WordReveal>
 */
const WordReveal = ({
  children,
  className = '',
  delay = 0,
  stagger = 0.08,
  duration: _duration = 0.65,
  once = true,
  as: Tag = 'span',
}: WordRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const words = children.split(' ');

  return (
    // @ts-ignore – dynamic tag
    <Tag ref={ref} className={className} aria-label={children} style={{ display: 'block' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={delay + i * stagger}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default WordReveal;
