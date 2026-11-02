'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard data state
  const [activeTab, setActiveTab] = useState('wishes'); // 'wishes' | 'rsvp'
  const [wishes, setWishes] = useState([]);
  const [rsvps, setRsvps] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Search & Filters
  const [wishSearch, setWishSearch] = useState('');
  const [rsvpSearch, setRsvpSearch] = useState('');
  const [rsvpFilter, setRsvpFilter] = useState('all'); // 'all' | 'yes' | 'no'

  // Delete confirmation modals
  const [deletingWishId, setDeletingWishId] = useState(null);
  const [deletingRsvpId, setDeletingRsvpId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Check login state on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('wedding_admin_auth');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      // localStorage unavailable
    }
    setCheckingAuth(false);
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [wishesRes, rsvpRes] = await Promise.all([
        fetch('/api/wishes'),
        fetch('/api/rsvp'),
      ]);

      if (wishesRes.ok) {
        const wishesData = await wishesRes.json();
        setWishes(Array.isArray(wishesData) ? wishesData : []);
      }

      if (rsvpRes.ok) {
        const rsvpData = await rsvpRes.json();
        setRsvps(Array.isArray(rsvpData) ? rsvpData : []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem('wedding_admin_auth', 'true');
        } catch (e) {}
      } else {
        setLoginError(data.error || 'Invalid email or password.');
      }
    } catch (err) {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('wedding_admin_auth');
      document.cookie = 'admin_token=; path=/; max-age=0';
    } catch (e) {}
  };

  // Delete wish handler
  const handleDeleteWish = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/wishes?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setWishes((prev) => prev.filter((item) => item._id !== id));
        setDeletingWishId(null);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete wish.');
      }
    } catch (err) {
      alert('Network error while deleting wish.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete RSVP handler
  const handleDeleteRsvp = async (id) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/rsvp?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRsvps((prev) => prev.filter((item) => item._id !== id));
        setDeletingRsvpId(null);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete RSVP.');
      }
    } catch (err) {
      alert('Network error while deleting RSVP.');
    } finally {
      setActionLoading(false);
    }
  };

  // Export RSVPs to CSV
  const exportRsvpCSV = () => {
    if (!rsvps.length) {
      alert('No RSVP data to export.');
      return;
    }

    const headers = ['Guest Name', 'Attendance', 'Guest Count', 'Date Submitted'];
    const rows = rsvps.map((r) => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      r.attendance === 'yes' ? 'Attending' : 'Declined',
      r.guestCount || 0,
      `"${new Date(r.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `shafna-ashif-rsvps-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats calculation
  const totalRsvps = rsvps.length;
  const attendingRsvps = rsvps.filter((r) => r.attendance === 'yes');
  const declinedRsvps = rsvps.filter((r) => r.attendance === 'no');
  const totalGuestsCount = attendingRsvps.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const totalWishes = wishes.length;

  // Filtered lists
  const filteredWishes = wishes.filter((w) => {
    const q = wishSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      w.guestName?.toLowerCase().includes(q) ||
      w.message?.toLowerCase().includes(q)
    );
  });

  const filteredRsvps = rsvps.filter((r) => {
    const q = rsvpSearch.toLowerCase().trim();
    const matchesSearch = !q || r.guestName?.toLowerCase().includes(q);
    const matchesFilter =
      rsvpFilter === 'all' ||
      (rsvpFilter === 'yes' && r.attendance === 'yes') ||
      (rsvpFilter === 'no' && r.attendance === 'no');
    return matchesSearch && matchesFilter;
  });

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F5EF]">
        <div className="w-8 h-8 border-2 border-[#C5AD7B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 1. LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5EF] px-4 py-12 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden"
        >
          {/* Subtle gold accent header bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5AD7B]" />

          <div className="text-center mb-8">
            <span className="font-script text-[#C5AD7B] text-3xl block mb-1">
              S &amp; A
            </span>
            <span className="font-body text-[10px] tracking-[0.35em] uppercase text-[#C5AD7B] font-semibold block mb-2">
              MANAGEMENT CONSOLE
            </span>
            <h1 className="font-heading text-3xl font-normal text-[#242424]">
              Admin Sign In
            </h1>
            <p className="font-body text-xs text-[#55514B] mt-2 font-light">
              Shafna &amp; Ashif Wedding &middot; 21 November 2026
            </p>
          </div>

          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 font-body text-xs text-center"
            >
              {loginError}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-body text-[11px] font-semibold tracking-wider uppercase text-[#242424] block mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adminwedding@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-[#D8D2C7] bg-[#F7F5EF]/60 focus:bg-[#FFFDF8] focus:border-[#C5AD7B] focus:outline-none font-body text-xs text-[#242424] transition-all"
              />
            </div>

            <div>
              <label className="font-body text-[11px] font-semibold tracking-wider uppercase text-[#242424] block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-[#D8D2C7] bg-[#F7F5EF]/60 focus:bg-[#FFFDF8] focus:border-[#C5AD7B] focus:outline-none font-body text-xs text-[#242424] pr-12 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-body text-[10px] uppercase font-semibold text-[#55514B]/70 hover:text-[#242424] px-1 py-1"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 px-6 rounded-full bg-[#C5AD7B] hover:bg-[#b89f6b] text-[#FFFDF8] font-body text-xs font-semibold tracking-[0.22em] uppercase transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loggingIn ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#FFFDF8] border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                'SIGN IN TO CONSOLE'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#D8D2C7]/50 text-center">
            <Link
              href="/"
              className="font-body text-xs text-[#55514B] hover:text-[#242424] transition-colors inline-flex items-center gap-1.5"
            >
              &larr; Return to Wedding Invitation
            </Link>
          </div>
        </motion.div>

        <p className="font-body text-[10px] tracking-[0.25em] text-[#55514B]/60 uppercase font-medium mt-8">
          DEVELOPED BY HAFEEF
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. AUTHENTICATED DASHBOARD
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#242424] pb-24">
      {/* ── TOP NAV BAR ── */}
      <header className="sticky top-0 z-30 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#D8D2C7] px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-script text-[#C5AD7B] text-2xl font-bold">
              S &amp; A
            </span>
            <div className="h-5 w-[1px] bg-[#D8D2C7]" />
            <div>
              <h1 className="font-heading text-lg sm:text-xl font-medium text-[#242424] leading-tight">
                Shafna &amp; Ashif
              </h1>
              <span className="font-body text-[9px] uppercase tracking-[0.22em] text-[#55514B]">
                Admin Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 py-2 px-4 rounded-full border border-[#D8D2C7] hover:border-[#242424] text-[#242424] font-body text-[11px] font-semibold tracking-wider uppercase transition-all"
            >
              <span>View Site</span>
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                <path d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              className="py-2 px-4 rounded-full bg-[#242424] hover:bg-[#383838] text-[#FFFDF8] font-body text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-10">
        {/* ── OVERVIEW STATS CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
          <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase text-[#55514B] font-semibold block mb-1">
              Total RSVPs
            </span>
            <p className="font-heading text-2xl sm:text-4xl text-[#242424] font-normal">
              {totalRsvps}
            </p>
          </div>

          <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase text-[#C5AD7B] font-semibold block mb-1">
              Attending Guests
            </span>
            <p className="font-heading text-2xl sm:text-4xl text-[#C5AD7B] font-normal">
              {totalGuestsCount}
            </p>
          </div>

          <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase text-[#55514B] font-semibold block mb-1">
              Accepted / Declined
            </span>
            <p className="font-heading text-2xl sm:text-4xl text-[#242424] font-normal">
              {attendingRsvps.length} <span className="text-sm sm:text-lg text-[#55514B]/60 font-light">/ {declinedRsvps.length}</span>
            </p>
          </div>

          <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-2xl p-4 sm:p-5 shadow-xs">
            <span className="font-body text-[9.5px] sm:text-[10px] tracking-[0.25em] uppercase text-[#55514B] font-semibold block mb-1">
              Total Wishes
            </span>
            <p className="font-heading text-2xl sm:text-4xl text-[#242424] font-normal">
              {totalWishes}
            </p>
          </div>
        </div>

        {/* ── TABS NAVIGATION ── */}
        <div className="flex items-center justify-between border-b border-[#D8D2C7] mb-6 pb-2 gap-4 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('wishes')}
              className={`py-2 px-4 sm:px-6 rounded-full font-body text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'wishes'
                  ? 'bg-[#C5AD7B] text-[#FFFDF8] shadow-xs'
                  : 'text-[#55514B] hover:text-[#242424] hover:bg-[#FFFDF8]'
              }`}
            >
              Guest Wishes ({wishes.length})
            </button>

            <button
              onClick={() => setActiveTab('rsvp')}
              className={`py-2 px-4 sm:px-6 rounded-full font-body text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'rsvp'
                  ? 'bg-[#C5AD7B] text-[#FFFDF8] shadow-xs'
                  : 'text-[#55514B] hover:text-[#242424] hover:bg-[#FFFDF8]'
              }`}
            >
              Guest RSVPs ({rsvps.length})
            </button>
          </div>

          <button
            onClick={fetchAllData}
            disabled={loadingData}
            className="text-[#55514B] hover:text-[#242424] font-body text-[11px] font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-[#FFFDF8] transition-all"
          >
            <svg
              className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{loadingData ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* ───────────────────────────────────────────────────────── */}
        {/* TAB 1: GUEST WISHES */}
        {/* ───────────────────────────────────────────────────────── */}
        {activeTab === 'wishes' && (
          <div>
            {/* Search & Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search wishes by guest name or message..."
                  value={wishSearch}
                  onChange={(e) => setWishSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D8D2C7] bg-[#FFFDF8] focus:border-[#C5AD7B] focus:outline-none font-body text-xs text-[#242424]"
                />
                <svg
                  className="w-4 h-4 text-[#55514B]/60 absolute left-3 top-1/2 -translate-y-1/2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>

              <span className="font-body text-xs text-[#55514B] self-center sm:self-auto">
                Showing {filteredWishes.length} of {wishes.length} wishes
              </span>
            </div>

            {/* Wishes Grid */}
            {filteredWishes.length === 0 ? (
              <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-12 text-center">
                <p className="font-heading text-xl text-[#242424] mb-1">No Wishes Found</p>
                <p className="font-body text-xs text-[#55514B]">
                  {wishSearch ? 'Try a different search term.' : 'No guest blessings submitted yet.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWishes.map((wish) => (
                  <motion.div
                    key={wish._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-[#C5AD7B]/60 transition-all relative group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-heading text-lg font-semibold text-[#242424]">
                          {wish.guestName}
                        </h3>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setDeletingWishId(wish._id)}
                          className="p-1.5 rounded-lg text-[#55514B]/50 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                          title="Delete Wish"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>

                      <p className="font-body text-xs sm:text-[13px] text-[#55514B] font-light leading-relaxed mb-4">
                        &ldquo;{wish.message}&rdquo;
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D8D2C7]/40 flex items-center justify-between text-[10px] text-[#55514B]/60 font-body">
                      <span>
                        {wish.createdAt
                          ? new Date(wish.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Recent'}
                      </span>
                      <span className="text-[#C5AD7B] font-medium uppercase tracking-wider">
                        Approved
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ───────────────────────────────────────────────────────── */}
        {/* TAB 2: GUEST RSVPS */}
        {/* ───────────────────────────────────────────────────────── */}
        {activeTab === 'rsvp' && (
          <div>
            {/* Search & Actions Bar */}
            <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <input
                    type="text"
                    placeholder="Search by guest name..."
                    value={rsvpSearch}
                    onChange={(e) => setRsvpSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D8D2C7] bg-[#FFFDF8] focus:border-[#C5AD7B] focus:outline-none font-body text-xs text-[#242424]"
                  />
                  <svg
                    className="w-4 h-4 text-[#55514B]/60 absolute left-3 top-1/2 -translate-y-1/2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>

                {/* Filter Selector */}
                <div className="flex items-center gap-1 bg-[#FFFDF8] border border-[#D8D2C7] p-1 rounded-xl">
                  <button
                    onClick={() => setRsvpFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-body text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      rsvpFilter === 'all'
                        ? 'bg-[#242424] text-[#FFFDF8]'
                        : 'text-[#55514B] hover:text-[#242424]'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setRsvpFilter('yes')}
                    className={`px-3 py-1.5 rounded-lg font-body text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      rsvpFilter === 'yes'
                        ? 'bg-[#C5AD7B] text-[#FFFDF8]'
                        : 'text-[#55514B] hover:text-[#242424]'
                    }`}
                  >
                    Attending ({attendingRsvps.length})
                  </button>
                  <button
                    onClick={() => setRsvpFilter('no')}
                    className={`px-3 py-1.5 rounded-lg font-body text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      rsvpFilter === 'no'
                        ? 'bg-red-700 text-[#FFFDF8]'
                        : 'text-[#55514B] hover:text-[#242424]'
                    }`}
                  >
                    Declined ({declinedRsvps.length})
                  </button>
                </div>
              </div>

              {/* Export to CSV Button */}
              <button
                type="button"
                onClick={exportRsvpCSV}
                className="py-2.5 px-5 rounded-full border border-[#242424] hover:bg-[#242424] hover:text-[#FFFDF8] text-[#242424] font-body text-xs font-semibold tracking-wider uppercase transition-all inline-flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Export CSV</span>
              </button>
            </div>

            {/* RSVP Table / List */}
            {filteredRsvps.length === 0 ? (
              <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-12 text-center">
                <p className="font-heading text-xl text-[#242424] mb-1">No RSVPs Found</p>
                <p className="font-body text-xs text-[#55514B]">
                  {rsvpSearch ? 'No guests match your search criteria.' : 'No RSVP responses received yet.'}
                </p>
              </div>
            ) : (
              <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#D8D2C7] bg-[#F7F5EF]/70">
                        <th className="py-3.5 px-5 font-body text-[10.5px] font-semibold uppercase tracking-wider text-[#55514B]">
                          Guest Name
                        </th>
                        <th className="py-3.5 px-5 font-body text-[10.5px] font-semibold uppercase tracking-wider text-[#55514B]">
                          Status
                        </th>
                        <th className="py-3.5 px-5 font-body text-[10.5px] font-semibold uppercase tracking-wider text-[#55514B] text-center">
                          Guests Count
                        </th>
                        <th className="py-3.5 px-5 font-body text-[10.5px] font-semibold uppercase tracking-wider text-[#55514B]">
                          Submitted On
                        </th>
                        <th className="py-3.5 px-5 font-body text-[10.5px] font-semibold uppercase tracking-wider text-[#55514B] text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D8D2C7]/50 font-body text-xs">
                      {filteredRsvps.map((rsvp) => (
                        <tr key={rsvp._id} className="hover:bg-[#F7F5EF]/40 transition-colors">
                          <td className="py-4 px-5 font-heading text-sm font-semibold text-[#242424]">
                            {rsvp.guestName}
                          </td>

                          <td className="py-4 px-5">
                            {rsvp.attendance === 'yes' ? (
                              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                Attending
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-semibold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                                Declined
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-5 text-center font-heading text-sm font-semibold text-[#242424]">
                            {rsvp.attendance === 'yes' ? rsvp.guestCount || 1 : '—'}
                          </td>

                          <td className="py-4 px-5 text-[#55514B] text-[11px]">
                            {rsvp.createdAt
                              ? new Date(rsvp.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : '—'}
                          </td>

                          <td className="py-4 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => setDeletingRsvpId(rsvp._id)}
                              className="p-1.5 rounded-lg text-[#55514B]/60 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                              title="Delete RSVP"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── DELETE WISH CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {deletingWishId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h3 className="font-heading text-xl text-[#242424] mb-2 font-semibold">
                Delete Guest Blessing?
              </h3>
              <p className="font-body text-xs text-[#55514B] mb-6 leading-relaxed">
                Are you sure you want to permanently delete this wish? This action cannot be undone.
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingWishId(null)}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 px-4 rounded-full border border-[#D8D2C7] hover:border-[#242424] text-[#242424] font-body text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteWish(deletingWishId)}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-body text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── DELETE RSVP CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {deletingRsvpId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h3 className="font-heading text-xl text-[#242424] mb-2 font-semibold">
                Delete RSVP Entry?
              </h3>
              <p className="font-body text-xs text-[#55514B] mb-6 leading-relaxed">
                Are you sure you want to permanently remove this RSVP record?
              </p>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setDeletingRsvpId(null)}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 px-4 rounded-full border border-[#D8D2C7] hover:border-[#242424] text-[#242424] font-body text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteRsvp(deletingRsvpId)}
                  disabled={actionLoading}
                  className="flex-1 py-2.5 px-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-body text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
