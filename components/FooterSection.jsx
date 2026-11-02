'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FooterSection({ data }) {
  const { bride, groom } = data || {};
  const [copied, setCopied] = useState(false);

  const brideName = bride?.firstName || 'Shafna';
  const groomName = groom?.firstName || 'Ashif';

  const handleShare = async () => {
    const shareTitle = `${brideName} & ${groomName} — Wedding Invitation`;
    const shareText = `You're cordially invited to celebrate the wedding of ${brideName} & ${groomName} on 21 November 2026.`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (e) {
        // User dismissed share sheet
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        // Fallback
      }
    }
  };

  return (
    <footer
      id="footer"
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 select-none overflow-hidden border-t border-[#D8D2C7]/60"
      style={{ background: '#EAE6DD' }}
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* 1. Arabic Blessing */}
        <motion.p
          className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#242424] mb-3 leading-relaxed tracking-normal"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          بَارَكَ اللهُ لَكُمَا
        </motion.p>

        {/* 2. Subtitle with Gold Script Accent */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="font-script text-[#C5AD7B] text-2xl sm:text-3xl italic leading-none mb-1.5">
            With Love,
          </p>
          <p className="font-body text-[#55514B] text-xs sm:text-sm font-light tracking-wide mb-4 sm:mb-5">
            Two hearts, one soul, a lifetime of love.
          </p>
        </motion.div>

        {/* 3. Signature Couple Names */}
        <motion.h2
          className="font-couple text-[#242424] text-3xl sm:text-4xl md:text-5xl font-normal leading-snug tracking-[0.04em] my-2"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {brideName} &amp; {groomName}
        </motion.h2>

        {/* 4. Wedding Metadata Line */}
        <motion.p
          className="font-body text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#55514B] font-medium mt-3 mb-8 sm:mb-9"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          21 &middot; NOVEMBER &middot; 2026 &middot; WEDDING &middot; AYIPUZHA
        </motion.p>

        {/* 5. Dual Action Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <button
            type="button"
            onClick={handleShare}
            className="py-3 sm:py-3.5 px-6 sm:px-7 rounded-full bg-[#C5AD7B] hover:bg-[#b89f6b] text-[#FFFDF8] font-body text-[10.5px] sm:text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
          >
            {copied ? 'LINK COPIED! ✓' : 'SHARE INVITATION'}
          </button>

          <a
            href="/admin"
            className="py-3 sm:py-3.5 px-6 sm:px-7 rounded-full border border-[#242424] hover:bg-[#242424] text-[#242424] hover:text-[#FFFDF8] font-body text-[10.5px] sm:text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 active:scale-[0.98]"
          >
            ADMIN PANEL
          </a>
        </motion.div>

        {/* 6. Hairline Divider */}
        <div className="w-12 h-[1px] bg-[#C5AD7B]/60 mx-auto mb-5 sm:mb-6" />

        {/* 7. Copyright & Developer Credit */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-body text-[9.5px] sm:text-[10px] tracking-[0.26em] text-[#55514B]/70 uppercase font-medium">
            &copy; 2026 ALL RIGHTS RESERVED
          </p>
          <p className="font-body text-[9.5px] sm:text-[10px] tracking-[0.26em] text-[#55514B]/80 uppercase font-medium mt-2 inline-flex items-center justify-center flex-wrap gap-1.5">
            <span>DEVELOPED BY</span>
            <a
              href="https://hafeef-portfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 font-semibold text-[#242424] hover:text-[#C5AD7B] transition-colors duration-300 cursor-pointer"
            >
              <span className="relative">
                HAFEEF
                <span className="absolute left-0 -bottom-[2px] w-full h-[1px] bg-[#242424]/30 group-hover:bg-[#C5AD7B] transition-colors duration-300" />
              </span>
              <svg
                className="w-2.5 h-2.5 -mt-0.5 text-[#55514B]/60 group-hover:text-[#C5AD7B] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3.5 8.5L8.5 3.5" />
                <path d="M4.5 3.5H8.5V7.5" />
              </svg>
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
