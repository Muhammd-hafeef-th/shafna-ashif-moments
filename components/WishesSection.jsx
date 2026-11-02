'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishesSection({ data }) {
  const bride = data?.bride?.firstName || 'Shafna';
  const groom = data?.groom?.firstName || 'Ashif';

  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const [form, setForm] = useState({ guestName: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch real wishes from backend
  const fetchWishes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/wishes');
      if (res.ok) {
        const items = await res.json();
        if (Array.isArray(items)) {
          setWishes(items);
        } else {
          setWishes([]);
        }
      } else {
        setWishes([]);
      }
    } catch {
      setWishes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.guestName.trim() || !form.message.trim()) {
      setErrorMsg('Please enter your name and heartfelt message.');
      return;
    }

    setSubmitStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'Submission failed');
      }

      const { wish } = await res.json();
      if (wish) {
        setWishes((prev) => [wish, ...(Array.isArray(prev) ? prev : [])]);
      }
      setForm({ guestName: '', message: '' });
      setSubmitStatus('success');

      // Close form smoothly after success notice
      setTimeout(() => {
        setSubmitStatus('idle');
        setIsFormOpen(false);
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Could not submit your blessing. Please try again.');
      setSubmitStatus('error');
    }
  };

  const safeWishes = Array.isArray(wishes) ? wishes : [];
  const visibleWishes = safeWishes.slice(0, visibleCount);
  const hasMore = visibleCount < safeWishes.length;

  return (
    <section
      id="wishes"
      className="relative pt-16 sm:pt-20 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
      style={{ background: '#F7F5EF' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header: Luxury Editorial Branding */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="font-body text-[10px] sm:text-xs tracking-[0.38em] uppercase text-[#C5AD7B] font-semibold mb-3 block">
            GUESTBOOK &amp; BLESSINGS
          </span>
          <h2 className="font-heading text-[#242424] text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
            Words of Love
          </h2>
          <p className="font-body text-xs sm:text-sm text-[#55514B] font-light mt-3 max-w-md mx-auto leading-relaxed">
            Heartfelt prayers and wishes for {bride} &amp; {groom}
          </p>

          {/* Centered Trigger Button (Opens Luxury Modal / Expandable Card) */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="group inline-flex items-center gap-2.5 py-3.5 px-8 rounded-full bg-[#C5AD7B] hover:bg-[#b89f6b] text-[#FFFDF8] font-body text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
            >
              <span className="text-sm leading-none font-light transition-transform duration-300 group-hover:rotate-90">
                {isFormOpen ? '✕' : '+'}
              </span>
              <span>{isFormOpen ? 'Close Form' : 'Send a Blessing'}</span>
            </button>
          </div>
        </motion.div>

        {/* ── COLLAPSIBLE SUBMISSION FORM ── */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -16 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mb-14 max-w-xl mx-auto"
            >
              <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-6 sm:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative">
                <div className="text-center mb-6">
                  <span className="font-body text-[9.5px] uppercase tracking-[0.3em] text-[#C5AD7B] font-semibold block mb-1">
                    SHARE YOUR PRAYERS
                  </span>
                  <h3 className="font-heading text-2xl text-[#242424] font-normal">
                    Leave a Blessing
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-body text-[10.5px] font-semibold tracking-wider uppercase text-[#242424] block mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayoob &amp; Family"
                      value={form.guestName}
                      onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D8D2C7] bg-[#F7F5EF]/60 focus:bg-[#FFFDF8] focus:border-[#C5AD7B] focus:outline-none font-body text-xs text-[#242424] transition-all"
                    />
                  </div>

                  <div>
                    <label className="font-body text-[10.5px] font-semibold tracking-wider uppercase text-[#242424] block mb-1.5">
                      Your Blessing &amp; Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={`Write your prayer or heartfelt wish for ${bride} & ${groom}...`}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#D8D2C7] bg-[#F7F5EF]/60 focus:bg-[#FFFDF8] focus:border-[#C5AD7B] focus:outline-none font-body text-xs text-[#242424] resize-none transition-all"
                    />
                  </div>

                  {errorMsg && (
                    <p className="font-body text-xs text-red-600 text-center">{errorMsg}</p>
                  )}

                  {submitStatus === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-3 px-4 rounded-xl bg-[#EAE6DD]/60 border border-[#C5AD7B]/50 text-center font-body text-xs text-[#242424]"
                    >
                      ✨ May Allah bless you! Your warm wish has been added.
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={submitStatus === 'loading'}
                        className="flex-1 py-3.5 px-6 rounded-full bg-[#242424] hover:bg-[#383838] text-[#FFFDF8] font-body text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-50"
                      >
                        {submitStatus === 'loading' ? 'Submitting...' : 'Post Blessing'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="py-3.5 px-6 rounded-full border border-[#D8D2C7] text-[#55514B] hover:text-[#242424] font-body text-[11px] tracking-[0.2em] uppercase transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BLESSINGS CONTENT ── */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-[#C5AD7B] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-body text-xs text-[#55514B]/70 tracking-wider uppercase">
              Loading blessings...
            </p>
          </div>
        ) : safeWishes.length === 0 ? (
          /* Clean Empty State when no real wishes yet */
          <div className="text-center py-12 px-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full border border-[#D8D2C7] bg-[#FFFDF8] flex items-center justify-center mx-auto mb-4 text-[#C5AD7B]">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-heading text-xl text-[#242424] font-medium mb-1">
              No Blessings Yet
            </p>
            <p className="font-body text-xs text-[#55514B] font-light leading-relaxed mb-6">
              Be the first to share your heartfelt prayers and blessings for {bride} &amp; {groom}.
            </p>
            {!isFormOpen && (
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="py-3 px-6 rounded-full bg-[#C5AD7B] hover:bg-[#b89f6b] text-[#FFFDF8] font-body text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-sm cursor-pointer"
              >
                Send First Blessing
              </button>
            )}
          </div>
        ) : (
          /* Blessings Grid (Real wishes from MongoDB) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {visibleWishes.map((wish, index) => (
              <motion.div
                key={wish._id || index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
                className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_6px_24px_rgba(0,0,0,0.015)] hover:border-[#C5AD7B]/70 transition-colors duration-300"
              >
                <div>
                  <span className="font-heading text-3xl sm:text-4xl text-[#C5AD7B]/60 leading-none select-none block -mb-1">
                    &ldquo;
                  </span>

                  <p className="font-body text-xs sm:text-sm text-[#55514B] font-light leading-relaxed italic my-2">
                    {wish.message}
                  </p>
                </div>

                {/* Author Footer */}
                <div className="pt-4 mt-2 border-t border-[#D8D2C7]/40 flex items-baseline justify-between">
                  <span className="font-heading text-sm sm:text-base text-[#242424] font-medium tracking-wide">
                    {wish.guestName}
                  </span>

                  {wish.createdAt && (
                    <span className="font-body text-[9px] tracking-wider text-[#55514B]/50 uppercase">
                      {new Date(wish.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── SHOW MORE BUTTON ── */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full border border-[#242424] hover:bg-[#242424] text-[#242424] hover:text-[#FFFDF8] font-body text-[10.5px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Show More Blessings</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
