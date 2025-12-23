import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const powerQuotes = [
  "New Year. New Beginnings.",
  "The best chapters are yet to be written.",
  "Every ending makes space for a brighter beginning.",
  "Dream big. Start fresh. Shine bright.",
  "This is your year to bloom.",
];

interface HeroSectionProps {
  recipientName: string;
}

const HeroSection = ({ recipientName }: HeroSectionProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % powerQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 text-4xl"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        🎆
      </motion.div>
      <motion.div
        className="absolute top-32 right-16 text-3xl"
        animate={{ y: [0, -20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-2xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🌟
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-10 text-3xl"
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        🎇
      </motion.div>

      {/* Main content */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Celebration emoji row */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <motion.span 
            className="text-5xl md:text-6xl"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.span>
          <motion.span 
            className="text-5xl md:text-6xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🎊
          </motion.span>
          <motion.span 
            className="text-5xl md:text-6xl"
            animate={{ rotate: [10, -10, 10] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-gradient-gold text-glow">Happy New Year</span>
          <motion.span
            className="block text-6xl md:text-8xl lg:text-9xl mt-2"
            animate={{ 
              textShadow: [
                '0 0 20px hsl(43 96% 56% / 0.5)',
                '0 0 40px hsl(43 96% 56% / 0.8)',
                '0 0 20px hsl(43 96% 56% / 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-gradient-gold">2026</span>
          </motion.span>
        </motion.h1>

        {/* Personalized greeting */}
        {recipientName && (
          <motion.p
            className="text-gold text-xl md:text-2xl mb-4 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Dear <span className="text-rose">{recipientName}</span>, this wish is for you ❤️
          </motion.p>
        )}

        {/* Subtext */}
        <motion.p
          className="text-foreground/80 text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Wishing you happiness, success, and meaningful moments in the year ahead.
        </motion.p>

        {/* Rotating power quotes */}
        <motion.div
          className="h-20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="glass-card rounded-2xl px-8 py-4 inline-flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-gold" />
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                className="text-foreground/90 text-lg md:text-xl font-medium italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                "{powerQuotes[currentQuote]}"
              </motion.p>
            </AnimatePresence>
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-3 bg-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
