'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ data }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const brideInit = data?.bride?.firstName?.[0] || 'S';
  const groomInit = data?.groom?.firstName?.[0] || 'A';
  
  // Format only Month and Date (e.g., NOVEMBER 21)
  const dateStr = data?.event?.date || '2026-11-21';
  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
  ];
  let monthAndDate = 'NOVEMBER 21';
  if (dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (monthNames[monthIdx] && !isNaN(day)) {
        monthAndDate = `${monthNames[monthIdx]} ${day}`;
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-0 left-0 w-full z-40 flex justify-between items-center px-5 sm:px-8 transition-all duration-300 pointer-events-none ${isScrolled
        ? 'py-3 bg-[#F7F5EF]/95 border-b border-[#D8D2C7] shadow-sm backdrop-blur-sm'
        : 'py-4 sm:py-6 bg-transparent'
        }`}
    >
      {/* Monogram on top left */}
      <a
        href="#hero"
        className="font-heading tracking-[0.25em] font-normal pointer-events-auto text-[#242424] hover:text-[#C5AD7B] transition-colors select-none text-base sm:text-lg"
      >
        {brideInit} &amp; {groomInit}
      </a>

      {/* Month and Date on top right */}
      <div className="font-body uppercase pointer-events-auto text-[#55514B] tracking-[0.28em] select-none text-[9px] sm:text-[10px] font-medium">
        {monthAndDate}
      </div>
    </motion.header>
  );
}
