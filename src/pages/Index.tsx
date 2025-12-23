import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import HeroSection from '@/components/HeroSection';
import CountdownTimer from '@/components/CountdownTimer';
import MessageSection from '@/components/MessageSection';
import TogethernessSection from '@/components/TogethernessSection';
import CelebrationSection from '@/components/CelebrationSection';
import GratitudeSection from '@/components/GratitudeSection';
import PersonalizationInput from '@/components/PersonalizationInput';
import ModeToggle from '@/components/ModeToggle';
import AudioControl from '@/components/AudioControl';
import ShareButton from '@/components/ShareButton';
import Footer from '@/components/Footer';

const Index = () => {
  const [mode, setMode] = useState<'party' | 'warm'>('party');
  const [recipientName, setRecipientName] = useState('');

  // Check for URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forName = params.get('for');
    if (forName) {
      setRecipientName(decodeURIComponent(forName));
    }
  }, []);

  return (
    <div className={`relative min-h-screen overflow-x-hidden ${mode === 'warm' ? 'warm-mode' : ''}`}>
      {/* Animated background */}
      <AnimatedBackground mode={mode} />
      
      {/* Fixed controls */}
      <ShareButton recipientName={recipientName} />
      <ModeToggle mode={mode} onModeChange={setMode} />
      <AudioControl />

      {/* Main content */}
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <HeroSection recipientName={recipientName} />

        {/* Personalization Input */}
        <section className="py-12 px-4">
          <PersonalizationInput 
            currentName={recipientName} 
            onNameChange={setRecipientName} 
          />
        </section>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Message & Inspiration */}
        <MessageSection />

        {/* Togetherness Section */}
        <TogethernessSection />

        {/* Interactive Celebration */}
        <CelebrationSection />

        {/* Gratitude Section */}
        <GratitudeSection />

        {/* Footer */}
        <Footer />
      </motion.main>
    </div>
  );
};

export default Index;
