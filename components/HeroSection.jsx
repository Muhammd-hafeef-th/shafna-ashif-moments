'use client';

import { motion } from 'framer-motion';

export default function HeroSection({ data }) {
  const brideName = data?.bride?.firstName || 'Shafna';
  const groomName = data?.groom?.firstName || 'Ashif';

  // Format date parts safely
  const dateStr = data?.event?.date || '2026-11-21';
  const eventTime = data?.event?.time || data?.event?.displayTime || '04:00 PM';

  const parseSafeDate = (str) => {
    const parts = str.split('-');
    if (parts.length === 3) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    }
    return new Date(str);
  };

  const dateObj = parseSafeDate(dateStr);
  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
  ];
  const isValid = !isNaN(dateObj.getTime());
  const dayOfWeek = isValid ? dayNames[dateObj.getDay()] : 'SATURDAY';
  const dayNum = isValid ? dateObj.getDate() : 21;
  const month = isValid ? monthNames[dateObj.getMonth()] : 'NOVEMBER';
  const year = isValid ? dateObj.getFullYear() : 2026;

  const venueName = data?.venue?.name || 'MASJID KUNJALI';
  const venueAddress = data?.venue?.city || data?.venue?.address || 'AYIPUZHA';
  const venueTitle = venueAddress ? `${venueName}, ${venueAddress}` : venueName;

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:h-screen lg:max-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-28 lg:py-0 overflow-hidden select-none"
      style={{
        background: '#F7F5EF',
      }}
    >
      {/* Centered Main Invitation Content */}
      <motion.div
        className="relative z-10 w-full max-w-xl md:max-w-2xl mx-auto flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 1. Arabic Bismillah */}
        <motion.p
          className="font-arabic text-[#C5AD7B] text-xl sm:text-2xl md:text-2xl lg:text-[1.75rem] leading-relaxed mb-4 sm:mb-6 md:mb-7 lg:mb-6"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        {/* 2. Intro invitation text */}
        <motion.div
          className="font-body text-[9.5px] sm:text-[10.5px] md:text-[11px] lg:text-[11px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#55514B] leading-relaxed mb-6 sm:mb-8 md:mb-9 lg:mb-5 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <p>TOGETHER WITH THEIR FAMILIES, WE JOYFULLY</p>
          <p className="mt-1">INVITE YOU TO CELEBRATE THE UNION OF</p>
        </motion.div>

        {/* 3. Bride Name — High-Fashion Luxury Editorial Serif */}
        <motion.h1
          className="font-couple text-[#242424] text-5xl sm:text-6xl md:text-7xl lg:text-[4.3rem] font-normal leading-[1.5] tracking-[0.03em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          {brideName}
        </motion.h1>

        {/* 4. Decorative 'and' */}
        <motion.span
          className="font-script text-2xl sm:text-3xl lg:text-2xl text-[#C5AD7B] my-1 sm:my-2 lg:my-1 italic leading-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.7 }}
        >
          and
        </motion.span>

        {/* 5. Groom Name — High-Fashion Luxury Editorial Serif */}
        <motion.h2
          className="font-couple text-[#242424] text-5xl sm:text-6xl md:text-7xl lg:text-[4.2rem] font-normal leading-[1.0.5] tracking-[0.03em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          {groomName}
        </motion.h2>

        {/* 6. Request honor of presence */}
        <motion.div
          className="font-body text-[9.5px] sm:text-[10.5px] md:text-[11px] lg:text-[10.5px] tracking-[0.24em] sm:tracking-[0.28em] uppercase text-[#55514B] leading-relaxed mt-6 sm:mt-8 md:mt-9 lg:mt-5 mb-6 sm:mb-8 md:mb-9 lg:mb-5 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          <p>REQUEST THE HONOR OF YOUR PRESENCE</p>
          <p className="mt-1">AT THEIR NIKAH CEREMONY</p>
        </motion.div>

        {/* 7. Date Row (3 Columns: Day & Time | Big Date Number | Month & Year) */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-6 md:gap-7 lg:gap-7 my-1 md:my-2 lg:my-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          {/* Left: Day & Time */}
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right min-w-[75px] sm:min-w-[100px]">
            <span className="font-body text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-[10px] tracking-[0.22em] text-[#C5AD7B] uppercase font-semibold">
              {dayOfWeek}
            </span>
            <span className="font-body text-[8.5px] sm:text-[9.5px] md:text-[10px] lg:text-[9.5px] tracking-[0.18em] text-[#55514B]/80 uppercase mt-0.5">
              {eventTime}
            </span>
          </div>

          {/* Center: Prominent Date Number */}
          <span className="font-heading font-light text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] text-[#242424] px-3 sm:px-6 leading-none">
            {dayNum}
          </span>

          {/* Right: Month & Year */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-[75px] sm:min-w-[100px]">
            <span className="font-body text-[9.5px] sm:text-[10px] md:text-[10.5px] lg:text-[10px] tracking-[0.22em] text-[#C5AD7B] uppercase font-semibold">
              {month}
            </span>
            <span className="font-body text-[8.5px] sm:text-[9.5px] md:text-[10px] lg:text-[9.5px] tracking-[0.18em] text-[#55514B]/80 uppercase mt-0.5">
              {year}
            </span>
          </div>
        </motion.div>

        {/* 8. Venue Block */}
        <motion.div
          className="flex flex-col items-center mt-6 sm:mt-8 md:mt-9 lg:mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.8 }}
        >
          <p className="font-body text-[8.5px] sm:text-[9.5px] tracking-[0.3em] uppercase text-[#C5AD7B] font-semibold mb-1">
            NIKAH AT
          </p>
          <p className="font-heading text-xs sm:text-sm md:text-base lg:text-sm tracking-[0.16em] uppercase text-[#242424] font-medium">
            {venueTitle.toUpperCase()}
          </p>
        </motion.div>

        {/* 9. Reception to follow */}
        <motion.p
          className="font-script text-xl sm:text-2xl md:text-3xl lg:text-[1.85rem] text-[#C5AD7B] mt-3 sm:mt-4 md:mt-5 lg:mt-3 italic tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.8 }}
        >
          Reception to follow
        </motion.p>
      </motion.div>

      {/* 10. Right-side Vertical Scroll Indicator */}
      <motion.div
        className="absolute right-4 sm:right-6 md:right-8 lg:right-10 bottom-16 sm:bottom-20 lg:bottom-8 z-20 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span
          className="font-body text-[8.5px] tracking-[0.32em] text-[#55514B]/70 uppercase font-medium"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <div className="w-[1px] h-10 sm:h-12 bg-[#D8D2C7] relative overflow-hidden">
          <motion.div
            className="w-full h-4 bg-[#C5AD7B]"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
