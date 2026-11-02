'use client';

import { motion } from 'framer-motion';

export default function FamilySection({ data }) {
  const { family, bride, groom, compliments } = data || {};

  const brideSiblings = Array.isArray(family?.bride?.siblings)
    ? family.bride.siblings
    : typeof family?.bride?.siblings === 'string'
      ? family.bride.siblings.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

  const groomSiblings = Array.isArray(family?.groom?.siblings)
    ? family.groom.siblings
    : typeof family?.groom?.siblings === 'string'
      ? family.groom.siblings.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

  const complimentNames = compliments?.names
    ? compliments.names.split(',').map((n) => n.trim()).filter(Boolean)
    : ['Ayoob M', 'Mustafa Kallinkeel', 'Ameer M'];

  return (
    <section
      id="family"
      className="relative pt-16 sm:pt-20 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      style={{ background: '#F7F5EF' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="font-body text-[10px] sm:text-xs tracking-[0.38em] uppercase text-[#C5AD7B] font-semibold mb-3 block">
            WITH THE LOVE OF
          </span>
          <h2 className="font-heading text-[#242424] text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
            Our Beloved Families
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#55514B] font-light mt-3 max-w-md mx-auto leading-relaxed">
            Joined in blessing the sacred union of their children
          </p>
          <div className="w-12 h-[1px] bg-[#C5AD7B]/60 mx-auto mt-5" />
        </motion.div>

        {/* Two Bespoke Family Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto">
          {/* 1. Bride's Family */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex flex-col items-center text-center hover:border-[#C5AD7B]/70 transition-colors duration-300"
          >
            {/* Inset Hairline */}
            <div className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#D8D2C7]/35 pointer-events-none" />

            <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C5AD7B] font-semibold mb-3">
              BRIDE&apos;S FAMILY
            </span>

            <h3 className="font-heading text-[#242424] text-2xl sm:text-3xl font-normal tracking-wide">
              {bride?.fullName || bride?.firstName || 'Shafna'}
            </h3>

            <p className="font-script text-[#C5AD7B] text-xl sm:text-2xl italic mt-1 mb-3">
              Daughter of
            </p>

            <p className="font-heading text-lg sm:text-xl font-medium text-[#242424]">
              {family?.bride?.parents || 'Mr. Rashid & Mrs. Hafsath'}
            </p>

            {family?.bride?.address && (
              <p className="font-body text-xs sm:text-sm text-[#55514B] font-light mt-1.5 leading-relaxed max-w-xs">
                {family.bride.address}
              </p>
            )}

            {brideSiblings.length > 0 && (
              <>
                <div className="w-10 h-[1px] bg-[#D8D2C7] my-6" />
                <span className="font-body text-[9px] sm:text-[9.5px] tracking-[0.25em] uppercase text-[#C5AD7B] font-semibold mb-1.5">
                  SIBLINGS
                </span>
                <p className="font-body text-xs sm:text-sm text-[#242424] font-light tracking-wider">
                  {brideSiblings.join('  \u00b7  ')}
                </p>
              </>
            )}
          </motion.div>

          {/* 2. Groom's Family */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.02)] flex flex-col items-center text-center hover:border-[#C5AD7B]/70 transition-colors duration-300"
          >
            {/* Inset Hairline */}
            <div className="absolute inset-2 sm:inset-3 rounded-[22px] border border-[#D8D2C7]/35 pointer-events-none" />

            <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C5AD7B] font-semibold mb-3">
              GROOM&apos;S FAMILY
            </span>

            <h3 className="font-heading text-[#242424] text-2xl sm:text-3xl font-normal tracking-wide">
              {groom?.fullName || groom?.firstName || 'Ashif'}
            </h3>

            <p className="font-script text-[#C5AD7B] text-xl sm:text-2xl italic mt-1 mb-3">
              Son of
            </p>

            <p className="font-heading text-lg sm:text-xl font-medium text-[#242424]">
              {family?.groom?.parents || 'Mr. Haneefa & Mrs. Hasoora'}
            </p>

            {family?.groom?.address && (
              <p className="font-body text-xs sm:text-sm text-[#55514B] font-light mt-1.5 leading-relaxed max-w-xs">
                {family.groom.address}
              </p>
            )}

            {groomSiblings.length > 0 && (
              <>
                <div className="w-10 h-[1px] bg-[#D8D2C7] my-6" />
                <span className="font-body text-[9px] sm:text-[9.5px] tracking-[0.25em] uppercase text-[#C5AD7B] font-semibold mb-1.5">
                  SIBLINGS
                </span>
                <p className="font-body text-xs sm:text-sm text-[#242424] font-light tracking-wider">
                  {groomSiblings.join('  \u00b7  ')}
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* ── BLESSINGS & COMPLIMENTS (Modern, Minimal, Unboxed) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-18 text-center max-w-xl mx-auto"
        >
          <div className="w-12 h-[1px] bg-[#C5AD7B]/50 mx-auto mb-6" />

          <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.35em] uppercase text-[#C5AD7B] font-semibold block mb-2">
            BLESSINGS &amp; COMPLIMENTS
          </span>

          <h4 className="font-heading text-xl sm:text-2xl md:text-3xl text-[#242424] font-light mb-4 tracking-wide">
            {compliments?.message || 'With Best Compliments & Blessings'}
          </h4>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-body text-[#55514B] font-medium tracking-[0.16em] uppercase">
            {complimentNames.map((name, i) => (
              <span key={`${name}-${i}`} className="inline-flex items-center gap-6">
                <span className="hover:text-[#242424] transition-colors">{name}</span>
                {i < complimentNames.length - 1 && (
                  <span className="hidden sm:inline text-[#C5AD7B] select-none text-[8px]">&bull;</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
