'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import weddingData from '@/data/weddingData';

export default function OpeningScreen({ data = weddingData, onOpen, onStartAudio }) {
  const bride = data?.bride || weddingData.bride;
  const groom = data?.groom || weddingData.groom;

  // Phases: 'loading' -> 'ready' -> 'playing' -> 'opened'
  const [phase, setPhase] = useState('loading');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const videoRef = useRef(null);
  const watchdogRef = useRef(null);

  // 1. Sleek, fast, minimal preloader (~1.2s)
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 12;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase('ready');
        }, 220);
      }
      setLoadingProgress(Math.min(Math.round(p), 100));
    }, 90);

    return () => clearInterval(interval);
  }, []);

  // 2. Setup video properties for mobile webkit/iOS & preload
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    return () => {
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
    };
  }, []);

  // 3. Complete opening and transition to Hero section
  const handleFinishAndOpen = useCallback(() => {
    if (isFinishing) return;
    setIsFinishing(true);

    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }

    setTimeout(() => {
      onOpen();
    }, 350);
  }, [isFinishing, onOpen]);

  // 4. Tap envelope or wax seal to open invitation
  const handleOpenInvitation = useCallback(async (e) => {
    if (e) e.stopPropagation();
    if (phase !== 'ready' || isFinishing) return;

    // Start background music immediately
    if (onStartAudio) {
      try {
        onStartAudio();
      } catch (err) {
        console.warn('Audio play notice:', err);
      }
    }

    const video = videoRef.current;
    if (!video) {
      handleFinishAndOpen();
      return;
    }

    setPhase('playing');

    try {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video play interrupted:', err);
          handleFinishAndOpen();
        });
      }
    } catch (err) {
      console.error('Video playback exception:', err);
      handleFinishAndOpen();
      return;
    }

    // Safety watchdog: Video is ~3.9s. Transition cleanly if event doesn't fire
    if (watchdogRef.current) clearTimeout(watchdogRef.current);
    watchdogRef.current = setTimeout(() => {
      handleFinishAndOpen();
    }, 4200);
  }, [phase, isFinishing, onStartAudio, handleFinishAndOpen]);

  // Direct skip
  const handleDirectSkip = useCallback((e) => {
    e?.stopPropagation();
    if (onStartAudio) {
      try { onStartAudio(); } catch (err) {}
    }
    handleFinishAndOpen();
  }, [onStartAudio, handleFinishAndOpen]);

  const isBlurred = phase === 'ready';

  return (
    <motion.div
      className={`intro-fullscreen-container select-none overflow-hidden ${phase === 'ready' ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={phase === 'ready' ? handleOpenInvitation : undefined}
      animate={isFinishing ? { opacity: 0, scale: 1.02 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {/* ── PHASE 1: COMPACT, MINIMAL LUXURY PRELOADER ────────── */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="compact-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F5EF] p-4 select-none"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Minimal Monogram */}
              <div className="font-heading tracking-[0.25em] text-xl sm:text-2xl text-[#242424] font-light mb-3">
                {bride.firstName[0]} <span className="text-[#C5AD7B] font-serif italic text-lg sm:text-xl">&amp;</span> {groom.firstName[0]}
              </div>

              {/* Delicate thin golden line progress */}
              <div className="w-28 sm:w-36 h-[1.5px] bg-[#D8D2C7] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C5AD7B] rounded-full"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {/* Tiny letter-spaced progress note */}
              <span className="font-body text-[8.5px] tracking-[0.3em] uppercase text-[#55514B]/70 mt-2.5 font-medium">
                INVITATION {loadingProgress}%
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BACKGROUND MEDIA WRAPPER WITH FIRST-FRAME BLUR EFFECT ─ */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-500 ease-out"
        style={{
          filter: isBlurred ? 'blur(5px) brightness(0.96)' : 'blur(0px) brightness(1)',
          transform: isBlurred ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        {/* High-res poster */}
        <img
          src="/images/envelope-poster.jpg"
          alt="Wedding Envelope"
          className="intro-fullscreen-video select-none z-[1]"
          draggable={false}
        />

        {/* Full screen HTML5 video */}
        <video
          ref={videoRef}
          src="/video/envelope-intro.mp4"
          poster="/images/envelope-poster.jpg"
          playsInline
          muted
          preload="auto"
          onEnded={handleFinishAndOpen}
          className="intro-fullscreen-video relative z-[2]"
        />
      </div>

      {/* ── CLEAN, SIMPLE & ELEGANT OVERLAY ─────────────────── */}
      <AnimatePresence>
        {phase === 'ready' && (
          <motion.div
            key="simple-envelope-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center pointer-events-none select-none"
          >
            {/* Centered Content Stack */}
            <div className="relative flex flex-col items-center -mt-6 sm:-mt-8 md:-mt-10">
              {/* 1. WEDDING INVITATION header */}
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="font-heading text-xs sm:text-sm tracking-[0.38em] uppercase text-[#C5AD7B] font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)] mb-1 sm:mb-2"
              >
                WEDDING INVITATION
              </motion.p>

              {/* 2. Couple Names in Large Elegant White Script */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="font-script text-white text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-normal tracking-wide leading-none py-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
              >
                {bride.firstName} &amp; {groom.firstName}
              </motion.h1>

              {/* 3. TAP TO OPEN with thin horizontal lines */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex items-center justify-center gap-3 sm:gap-5 mt-2 sm:mt-3"
              >
                <div className="w-12 sm:w-20 md:w-24 h-[1px] bg-[#C5AD7B]/80 shadow-sm" />
                <span className="font-heading tracking-[0.35em] text-[10px] sm:text-xs text-[#C5AD7B] uppercase font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  TAP TO OPEN
                </span>
                <div className="w-12 sm:w-20 md:w-24 h-[1px] bg-[#C5AD7B]/80 shadow-sm" />
              </motion.div>

              {/* 4. Golden Tap Target / Pulse Ring on the Wax Seal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative mt-8 sm:mt-10 md:mt-12 flex items-center justify-center cursor-pointer pointer-events-auto"
                onClick={handleOpenInvitation}
              >
                {/* Outer animated ripple ring */}
                <motion.div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                  style={{ border: '2px solid #E5B869' }}
                  animate={{
                    scale: [1, 1.45, 1],
                    opacity: [0.95, 0.25, 0.95],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Inner glowing golden dot */}
                <div className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#E5B869] shadow-[0_0_10px_#E5B869]" />
              </motion.div>
            </div>

            {/* Discreet Skip Button in corner */}
            <button
              type="button"
              onClick={handleDirectSkip}
              className="absolute bottom-5 right-5 pointer-events-auto font-body text-[9px] tracking-[0.2em] uppercase text-[#55514B]/70 hover:text-[#242424] transition-colors cursor-pointer py-1.5 px-3 z-30"
              aria-label="Skip to Invitation"
            >
              Skip &rarr;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
