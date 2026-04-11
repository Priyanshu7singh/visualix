import { motion, type MotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'down' | 'up' | 'left' | 'right' | 'scale' | 'flip';
  once?: boolean;
}

const variants = {
  down:  { hidden: { opacity: 0, y: -70, rotateX: 18, filter: 'blur(4px)' },  visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } },
  up:    { hidden: { opacity: 0, y:  70, rotateX: -18, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' } },
  left:  { hidden: { opacity: 0, x: -80, rotateY: -18, filter: 'blur(4px)' }, visible: { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' } },
  right: { hidden: { opacity: 0, x:  80, rotateY:  18, filter: 'blur(4px)' }, visible: { opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' } },
  scale: { hidden: { opacity: 0, scale: 0.75, filter: 'blur(6px)' },           visible: { opacity: 1, scale: 1, filter: 'blur(0px)' } },
  flip:  { hidden: { opacity: 0, rotateY: 90, filter: 'blur(8px)' },           visible: { opacity: 1, rotateY: 0, filter: 'blur(0px)' } },
};

const AnimatedSection = ({
  children,
  delay = 0,
  className = '',
  direction = 'down',
  once = true,
}: AnimatedSectionProps) => {
  const v = variants[direction];

  const whileInView: MotionProps['animate'] = v.visible;

  return (
    <motion.div
      className={className}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
      initial={v.hidden}
      whileInView={whileInView}
      viewport={{ once, margin: '-60px' }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
