'use client';

import { motion } from 'framer-motion';

export default function AudioButton({ isPlaying, onToggle }) {
  return (
    <div className="fixed bottom-6 left-6 z-50 md:bottom-8 md:left-8">
      {/* Outer delicate concentric ring matching luxury reference */}
      <div
        className="relative p-[3px] rounded-full flex items-center justify-center"
        style={{ border: '1px solid rgba(197, 173, 123, 0.45)' }}
      >
        {/* Pulsing ring animation when playing */}
        {isPlaying && (
          <motion.div
            className="absolute -inset-1 rounded-full pointer-events-none"
            style={{ border: '1px solid rgba(197, 173, 123, 0.4)' }}
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        <motion.button
          onClick={onToggle}
          className="relative w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 shadow-sm"
          style={{
            background: 'rgba(255, 253, 248, 0.92)',
            border: '1px solid #D8D2C7',
            backdropFilter: 'blur(8px)',
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
          title={isPlaying ? 'Mute music' : 'Play music'}
        >
          {isPlaying ? (
            // Beamed musical notes
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5AD7B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="#C5AD7B" />
              <circle cx="18" cy="16" r="3" fill="#C5AD7B" />
            </svg>
          ) : (
            // Muted: beamed musical notes with diagonal slash
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5AD7B"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="#C5AD7B" />
              <circle cx="18" cy="16" r="3" fill="#C5AD7B" />
              <line x1="2" y1="2" x2="22" y2="22" stroke="#55514B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </motion.button>
      </div>
    </div>
  );
}
