import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PartyPopper, Heart, Sparkles } from 'lucide-react';

const celebrationMessages = [
  "Cheers to the people who make every year special.",
  "Here's to happiness and bright futures.",
  "Let's celebrate new beginnings.",
  "Wishing you joy all year long.",
  "May your days be filled with wonder.",
];

const CelebrationSection = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isExploding, setIsExploding] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const triggerCelebration = () => {
    setIsExploding(true);
    setClickCount(prev => prev + 1);

    // Confetti explosion
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#fbbf24', '#f59e0b', '#ec4899'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#fbbf24', '#f472b6', '#8b5cf6'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#fbbf24', '#ec4899', '#06b6d4'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#fbbf24', '#f59e0b', '#ec4899'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#fbbf24', '#8b5cf6', '#f472b6'],
    });

    // Heart confetti
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 },
        shapes: ['circle'],
        colors: ['#ec4899', '#f472b6', '#fb7185'],
        scalar: 2,
      });
    }, 200);

    // Cycle through messages
    setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length);

    // Reset explosion state
    setTimeout(() => setIsExploding(false), 1000);
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Time to <span className="text-gradient-gold">Celebrate!</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Click the button below and let the celebration begin! 🎊
          </p>
        </motion.div>

        {/* Main celebration button */}
        <motion.div
          className="relative inline-block mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            onClick={triggerCelebration}
            className="btn-celebrate text-xl md:text-2xl flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isExploding ? { 
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 4px 20px hsl(43 96% 56% / 0.4)',
                '0 8px 40px hsl(43 96% 56% / 0.8)',
                '0 4px 20px hsl(43 96% 56% / 0.4)',
              ]
            } : {}}
          >
            <PartyPopper className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>Celebrate Together</span>
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🎊
            </motion.span>
          </motion.button>

          {/* Glow ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full -z-10"
            animate={{
              boxShadow: [
                '0 0 30px hsl(43 96% 56% / 0.3)',
                '0 0 60px hsl(43 96% 56% / 0.5)',
                '0 0 30px hsl(43 96% 56% / 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Click counter */}
        {clickCount > 0 && (
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🎉 Celebrations: <span className="text-gold font-bold">{clickCount}</span>
          </motion.p>
        )}

        {/* Message display */}
        <motion.div
          className="glass-card-warm rounded-2xl p-8 md:p-12 min-h-[150px] flex items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Floating decorations */}
          <AnimatePresence>
            {isExploding && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1,
                      scale: 0,
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                      opacity: 0,
                      scale: 1,
                      rotate: Math.random() * 360,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {i % 2 === 0 ? (
                      <Heart className="w-6 h-6 text-rose" fill="currentColor" />
                    ) : (
                      <Sparkles className="w-6 h-6 text-gold" />
                    )}
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-xl md:text-2xl lg:text-3xl text-foreground">
                ✨ {celebrationMessages[currentMessage]} ✨
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Secondary animated elements */}
        <motion.div
          className="mt-12 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {['🎆', '🎇', '🎉', '🎊', '✨'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-3xl"
              animate={{ 
                y: [0, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: index * 0.2 
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto" />
    </section>
  );
};

export default CelebrationSection;
