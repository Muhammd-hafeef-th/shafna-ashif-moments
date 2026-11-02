'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RSVPSection() {
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [submittedName, setSubmittedName] = useState('');
  const [submittedAttendance, setSubmittedAttendance] = useState('yes');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: guestName.trim(),
          attendance,
          guestCount: attendance === 'yes' ? Math.max(1, guestCount || 1) : 1,
        }),
      });

      if (res.ok) {
        setSubmittedName(guestName.trim());
        setSubmittedAttendance(attendance);
        setStatus('success');

        if (typeof window !== 'undefined') {
          import('canvas-confetti').then(({ default: confetti }) => {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.65 },
              colors: ['#C5AD7B', '#EAE6DD', '#242424', '#D8D2C7'],
            });
          });
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Failed to submit RSVP. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setGuestName('');
    setAttendance('yes');
    setGuestCount(1);
    setStatus('idle');
    setErrorMsg('');
  };

  return (
    <section
      id="rsvp"
      className="relative pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      style={{ background: '#F7F5EF' }}
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Editorial Branded Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="font-body text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#C5AD7B] font-semibold mb-3 block">
            R.S.V.P.
          </span>
          <h2 className="font-heading text-[#242424] text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
            Celebrate With Us
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#55514B] font-light mt-3 max-w-md mx-auto leading-relaxed">
            Please kindly reply on or before November 21, 2026
          </p>
          <div className="w-12 h-[1px] bg-[#C5AD7B]/60 mx-auto mt-5" />
        </motion.div>

        {/* Spacious, Branded Luxury Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl sm:rounded-[32px] p-8 sm:p-12 md:p-14 shadow-[0_12px_40px_rgba(0,0,0,0.02)]"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="w-14 h-14 rounded-full border border-[#C5AD7B] flex items-center justify-center mx-auto mb-5 text-[#C5AD7B]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-[#242424] text-2xl sm:text-3xl font-normal mb-3">
                  Response Recorded
                </h3>
                <p className="font-body text-[#55514B] text-sm leading-relaxed max-w-sm mx-auto mb-8 font-light">
                  {submittedAttendance === 'yes'
                    ? `Thank you, ${submittedName}. We are truly honoured to have you celebrate with us!`
                    : `Thank you for letting us know, ${submittedName}. You will be warmly remembered in our celebrations.`}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-body text-[11px] tracking-[0.24em] uppercase text-[#55514B] hover:text-[#242424] border-b border-[#D8D2C7] hover:border-[#242424] pb-1 transition-all cursor-pointer font-medium"
                >
                  Change Response &rarr;
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8 sm:space-y-10"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* 1. Full Name */}
                <div className="space-y-2.5">
                  <label
                    htmlFor="guest-name"
                    className="block font-body text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#55514B] font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] focus:bg-[#FFFDF8] border border-[#D8D2C7] focus:border-[#C5AD7B] rounded-2xl px-5 sm:px-6 py-4 font-body text-base text-[#242424] placeholder-[#55514B]/35 outline-none transition-all shadow-sm"
                  />
                </div>

                {/* 2. Attendance Selection */}
                <div className="space-y-3">
                  <label className="block font-body text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#55514B] font-medium">
                    Will You Attend?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setAttendance('yes')}
                      className={`py-4 px-6 rounded-2xl border text-xs sm:text-sm font-body tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer text-center flex items-center justify-center font-medium ${attendance === 'yes'
                          ? 'bg-[#242424] border-[#242424] text-[#FFFDF8] shadow-md'
                          : 'bg-[#F7F5EF]/40 border-[#D8D2C7] text-[#55514B] hover:border-[#C5AD7B] hover:bg-[#F7F5EF]'
                        }`}
                    >
                      Joyfully Accept
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('no')}
                      className={`py-4 px-6 rounded-2xl border text-xs sm:text-sm font-body tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer text-center flex items-center justify-center font-medium ${attendance === 'no'
                          ? 'bg-[#242424] border-[#242424] text-[#FFFDF8] shadow-md'
                          : 'bg-[#F7F5EF]/40 border-[#D8D2C7] text-[#55514B] hover:border-[#C5AD7B] hover:bg-[#F7F5EF]'
                        }`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                {/* 3. Number of Guests (Only when attending) */}
                <AnimatePresence>
                  {attendance === 'yes' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2.5 overflow-hidden"
                    >
                      <label
                        htmlFor="guest-count"
                        className="block font-body text-[10px] sm:text-[11px] tracking-[0.26em] uppercase text-[#55514B] font-medium"
                      >
                        Number of Guests Attending
                      </label>
                      <div className="relative">
                        <select
                          id="guest-count"
                          value={guestCount}
                          onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                          className="w-full bg-[#F7F5EF]/60 hover:bg-[#F7F5EF] focus:bg-[#FFFDF8] border border-[#D8D2C7] focus:border-[#C5AD7B] rounded-2xl px-5 sm:px-6 py-4 font-body text-base text-[#242424] outline-none transition-all shadow-sm appearance-none cursor-pointer pr-12"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20].map((num) => (
                            <option key={num} value={num} className="bg-[#FFFDF8] text-[#242424] py-2">
                              {num} {num === 1 ? 'Guest (Just me)' : 'Guests'}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#55514B]">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Banner */}
                {errorMsg && (
                  <p className="font-body text-xs text-red-600 text-center font-medium">
                    {errorMsg}
                  </p>
                )}

                {/* 4. Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 sm:py-4.5 rounded-full bg-[#242424] hover:bg-[#383531] text-[#FFFDF8] font-body text-[11px] sm:text-xs font-semibold tracking-[0.26em] uppercase cursor-pointer flex items-center justify-center gap-2 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_30px_-5px_rgba(0,0,0,0.25)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <span>SEND RSVP</span>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
