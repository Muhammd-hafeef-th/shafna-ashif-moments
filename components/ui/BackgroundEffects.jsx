'use client';

import { motion } from 'framer-motion';

// Delicate, simple micro-bubbles in warm champagne gold
const microBubbles = [
  { left: '6%', top: '92%', size: 2.5, duration: 11, delay: 0, drift: 8, opacity: 0.75 },
  { left: '12%', top: '75%', size: 3, duration: 13, delay: 2.2, drift: -6, opacity: 0.8 },
  { left: '18%', top: '40%', size: 2, duration: 12, delay: 4.5, drift: 7, opacity: 0.7 },
  { left: '24%', top: '85%', size: 3.5, duration: 14, delay: 1.1, drift: -9, opacity: 0.8 },
  { left: '31%', top: '60%', size: 2.5, duration: 10.5, delay: 5.8, drift: 8, opacity: 0.75 },
  { left: '38%', top: '25%', size: 3, duration: 13.5, delay: 3.2, drift: -7, opacity: 0.8 },
  { left: '45%', top: '90%', size: 2, duration: 11.5, delay: 0.6, drift: 6, opacity: 0.7 },
  { left: '52%', top: '70%', size: 3.5, duration: 14.5, delay: 4.8, drift: -8, opacity: 0.8 },
  { left: '59%', top: '35%', size: 2.5, duration: 12.5, delay: 1.8, drift: 7, opacity: 0.75 },
  { left: '66%', top: '82%', size: 3, duration: 13, delay: 6.2, drift: -9, opacity: 0.8 },
  { left: '73%', top: '50%', size: 2, duration: 10, delay: 2.8, drift: 6, opacity: 0.7 },
  { left: '80%', top: '88%', size: 3.5, duration: 15, delay: 0.3, drift: -8, opacity: 0.85 },
  { left: '87%', top: '65%', size: 2.5, duration: 12, delay: 5.1, drift: 7, opacity: 0.75 },
  { left: '93%', top: '30%', size: 3, duration: 13.5, delay: 3.7, drift: -6, opacity: 0.8 },
  { left: '96%', top: '80%', size: 2, duration: 11, delay: 7.0, drift: 5, opacity: 0.7 },
  // Extra upper specks to ensure full screen coverage immediately
  { left: '9%', top: '20%', size: 2.5, duration: 12, delay: 1.4, drift: 6, opacity: 0.75 },
  { left: '28%', top: '15%', size: 3, duration: 13, delay: 4.1, drift: -7, opacity: 0.8 },
  { left: '72%', top: '18%', size: 2.5, duration: 11.5, delay: 2.5, drift: 6, opacity: 0.75 },
  { left: '84%', top: '12%', size: 3, duration: 14, delay: 6.0, drift: -8, opacity: 0.8 },
];

export default function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {microBubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.left,
            top: b.top,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: '#C5AD7B',
            boxShadow: '0 0 5px rgba(197, 173, 123, 0.45)',
            opacity: 0,
          }}
          animate={{
            y: [0, -140, -280],
            x: [0, b.drift, -b.drift * 0.5, 0],
            opacity: [0, b.opacity, b.opacity * 0.8, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: b.delay,
          }}
        />
      ))}
    </div>
  );
}
