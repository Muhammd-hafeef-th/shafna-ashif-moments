'use client';

import { motion } from 'framer-motion';

export default function VenueSection({ data }) {
  const { event, venue, reception } = data || {};

  const occasions = [
    {
      type: 'CEREMONY',
      title: 'Nikah Ceremony',
      name: venue?.name || 'Masjid Kunjali',
      address: venue?.address || 'Ayipuzha, Irikkur, Kannur',
      date: event?.displayDate || 'Saturday, 21 November 2026',
      time: event?.displayTime || event?.time || '04:00 PM',
      hijri: event?.hijriDate || '12 جمادى الآخرة 1448 هـ',
      mapUrl:
        venue?.googleMapLink ||
        `https://maps.google.com/?q=${encodeURIComponent(`${venue?.name || 'Masjid Kunjali'} ${venue?.address || 'Ayipuzha'}`)}`,
    },
    {
      type: 'CELEBRATION',
      title: 'Wedding Reception',
      name: reception?.venue || "Bride's Residence",
      address: reception?.address || 'Anseeraz, Ayipuzha, Irikkur, Kannur',
      date: reception?.displayDate || 'Sunday, 22 November 2026',
      time: reception?.time || '11:00 AM Onwards',
      hijri: reception?.hijriDate || '13 جمادى الآخرة 1448 هـ',
      mapUrl:
        reception?.googleMapLink ||
        `https://maps.google.com/?q=${encodeURIComponent(`Ayipuzha Irikkur Kerala`)}`,
    },
  ];

  return (
    <section
      id="venue"
      className="relative pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      style={{ background: '#F7F5EF' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header: Minimal Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-16 md:mb-20"
        >
          <p className="font-body text-[#C5AD7B] text-[10px] sm:text-xs tracking-[0.38em] uppercase font-semibold mb-3">
            CEREMONY &amp; RECEPTION
          </p>
          <h2 className="font-heading text-[#242424] text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
            Venues &amp; Locations
          </h2>
          <div className="w-12 h-[1px] bg-[#C5AD7B]/60 mx-auto mt-5" />
        </motion.div>

        {/* 2 Bespoke Architectural Arched Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {occasions.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-[#FFFDF8] border border-[#D8D2C7] rounded-t-[90px] sm:rounded-t-[120px] rounded-b-2xl p-8 sm:p-10 md:p-12 flex flex-col items-center text-center shadow-[0_10px_35px_rgba(0,0,0,0.02)] hover:border-[#C5AD7B]/70 transition-colors duration-300"
            >
              {/* Subtle Inset Double Hairline Border Accent */}
              <div className="absolute inset-2 sm:inset-3 rounded-t-[82px] sm:rounded-t-[110px] rounded-b-xl border border-[#D8D2C7]/40 pointer-events-none" />

              {/* Eyebrow Label */}
              <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C5AD7B] font-semibold mb-4">
                {item.type}
              </span>

              {/* Venue Name */}
              <h3 className="font-heading text-[#242424] text-2xl sm:text-3xl font-normal tracking-wide">
                {item.name}
              </h3>

              {/* Event Subtitle (Nikah Ceremony / Wedding Reception) */}
              <p className="font-script text-[#C5AD7B] text-xl sm:text-2xl italic mt-1 mb-2">
                {item.title}
              </p>

              {/* Address */}
              <p className="font-body text-[#55514B] text-xs sm:text-sm font-light leading-relaxed max-w-xs">
                {item.address}
              </p>

              {/* Minimal Divider Hairline */}
              <div className="w-10 h-[1px] bg-[#D8D2C7] my-6 sm:my-7" />

              {/* Date & Time Block */}
              <div className="flex flex-col items-center">
                <p className="font-heading text-[#242424] text-base sm:text-lg font-medium tracking-wide">
                  {item.date}
                </p>
                <p className="font-body text-[#55514B] text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium mt-1">
                  {item.time}
                </p>
                {item.hijri && (
                  <p className="font-arabic text-[#C5AD7B] text-sm mt-3">
                    {item.hijri}
                  </p>
                )}
              </div>

              {/* Google Maps Location Button */}
              <div className="mt-8 sm:mt-10 z-10">
                <a
                  href={item.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[10px] sm:text-[11px] tracking-[0.24em] uppercase font-semibold text-[#242424] bg-[#F7F5EF] hover:bg-[#242424] hover:text-[#FFFDF8] border border-[#D8D2C7] hover:border-[#242424] transition-all duration-300 shadow-sm group cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#C5AD7B] group-hover:text-[#FFFDF8] transition-colors"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>VIEW ON GOOGLE MAPS</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
