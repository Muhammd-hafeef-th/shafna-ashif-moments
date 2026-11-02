'use client';

import { useState } from 'react';
import weddingData from '@/data/weddingData';

import OpeningScreen from '@/components/OpeningScreen';
import Navbar from '@/components/Navbar';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import AudioButton from '@/components/ui/AudioButton';
import HeroSection from '@/components/HeroSection';
import VenueSection from '@/components/VenueSection';
import CountdownSection from '@/components/CountdownSection';
import RSVPSection from '@/components/RSVPSection';
import FamilySection from '@/components/FamilySection';
import WishesSection from '@/components/WishesSection';
import FooterSection from '@/components/FooterSection';

import { useAudioPlayer } from '@/hooks/useAudioPlayer';

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { isPlaying, toggle: toggleAudio } = useAudioPlayer();

  return (
    <>
      {/* Opening envelope screen */}
      {!isOpen && (
        <OpeningScreen
          data={weddingData}
          onOpen={() => setIsOpen(true)}
          onStartAudio={() => { if (!isPlaying) toggleAudio(); }}
        />
      )}

      {/* Main wedding invitation */}
      {isOpen && (
        <main className="relative min-h-screen">
          {/* Ambient floating particles */}
          <BackgroundEffects />

          {/* Sticky navigation */}
          <Navbar data={weddingData} />

          {/* Page sections */}
          <HeroSection data={weddingData} />
          <VenueSection data={weddingData} />
          <CountdownSection data={weddingData} />
          <RSVPSection data={weddingData} />
          <FamilySection data={weddingData} />
          <WishesSection data={weddingData} />
          <FooterSection data={weddingData} />

          {/* Floating audio toggle */}
          <AudioButton isPlaying={isPlaying} onToggle={toggleAudio} />
        </main>
      )}
    </>
  );
}
