'use client';

import { motion } from 'framer-motion';

const particles = [
  { left: '10%', top: '15%', size: 2.5, delay: 0, duration: 14 },
  { left: '85%', top: '12%', size: 3, delay: 2, duration: 16 },
  { left: '22%', top: '65%', size: 2, delay: 4, duration: 12 },
  { left: '76%', top: '55%', size: 2.5, delay: 1, duration: 15 },
  { left: '38%', top: '25%', size: 2.2, delay: 5, duration: 13 },
  { left: '60%', top: '75%', size: 2.8, delay: 3, duration: 14 },
  { left: '15%', top: '45%', size: 2, delay: 6, duration: 16 },
  { left: '90%', top: '38%', size: 2.5, delay: 2.5, duration: 13 },
  { left: '28%', top: '85%', size: 2.2, delay: 7, duration: 15 },
  { left: '80%', top: '82%', size: 2, delay: 0.5, duration: 17 },
  { left: '48%', top: '8%', size: 2, delay: 4.5, duration: 12 },
  { left: '5%', top: '80%', size: 2.5, delay: 1.5, duration: 14 },
];

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: '#C5AD7B',
            left: p.left,
            top: p.top,
            opacity: 0,
          }}
          animate={{
            y: [0, -60, -120],
            opacity: [0, 0.45, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
