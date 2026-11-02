'use client';

import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';

export default function CountdownSection({ data }) {
  const { event } = data || {};
  const timeLeft = useCountdown(event?.date || '2026-11-21', event?.countdownTime || '16:00');

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <section
      id="countdown"
      className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-4 select-none overflow-hidden"
      style={{ background: '#F7F5EF' }}
    >
      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Single minimal heading */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-lg sm:text-xl md:text-2xl text-[#242424] tracking-wider mb-5 sm:mb-6 font-normal"
        >
          Until We Say I Do
        </motion.p>

        {/* Small, minimal countdown */}
        {timeLeft.expired ? (
          <p className="font-heading text-base sm:text-lg text-[#242424]">
            Today is the Day
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8"
          >
            {units.map((unit, index) => (
              <div key={unit.label} className="flex items-center gap-3 sm:gap-6 md:gap-8">
                <div className="flex flex-col items-center min-w-[38px] sm:min-w-[48px]">
                  <span className="font-heading font-light text-2xl sm:text-3xl md:text-4xl text-[#242424] leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="font-body text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#C5AD7B] font-semibold mt-1.5">
                    {unit.label}
                  </span>
                </div>

                {index < units.length - 1 && (
                  <span className="font-heading text-sm sm:text-base text-[#C5AD7B]/60 select-none -translate-y-2">
                    :
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
