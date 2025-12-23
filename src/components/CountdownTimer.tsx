import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const motivationalLines = [
  "Every second brings a new opportunity.",
  "Let go of yesterday, welcome tomorrow.",
  "This is your time to begin again.",
  "The countdown to your best year yet.",
  "New beginnings are just moments away.",
];

interface CountdownTimerProps {
  onCountdownComplete?: () => void;
}

const CountdownTimer = ({ onCountdownComplete }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentMotivation, setCurrentMotivation] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const difference = newYear.getTime() - now.getTime();

    if (difference <= 0) {
      setIsComplete(true);
      onCountdownComplete?.();
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [onCountdownComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMotivation((prev) => (prev + 1) % motivationalLines.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isComplete) {
      // Celebration fireworks
      const duration = 5000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6'],
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isComplete]);

  const FlipCard = ({ value, label }: { value: number; label: string }) => {
    const displayValue = value.toString().padStart(2, '0');

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="glass-card rounded-2xl p-4 md:p-6 lg:p-8 min-w-[80px] md:min-w-[100px] lg:min-w-[120px] overflow-hidden">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={displayValue}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-center"
              >
                <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold text-glow">
                  {displayValue}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gold/10 blur-xl -z-10" />
        </div>
        <span className="mt-3 text-sm md:text-base text-muted-foreground uppercase tracking-widest font-medium">
          {label}
        </span>
      </div>
    );
  };

  return (
    <section className="py-20 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {isComplete ? (
            <span className="text-gradient-gold text-glow">🎉 Happy New Year 2026! 🎉</span>
          ) : (
            <>Countdown to <span className="text-gradient-gold">2026</span></>
          )}
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-lg mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isComplete 
            ? "The celebration has begun! Welcome to a year of endless possibilities."
            : "A new chapter awaits..."
          }
        </motion.p>

        {/* Countdown grid */}
        <div className="flex justify-center gap-3 md:gap-6 lg:gap-8 mb-12">
          <FlipCard value={timeLeft.days} label="Days" />
          <div className="flex items-center text-3xl md:text-4xl text-gold font-bold self-start mt-6 md:mt-8">:</div>
          <FlipCard value={timeLeft.hours} label="Hours" />
          <div className="flex items-center text-3xl md:text-4xl text-gold font-bold self-start mt-6 md:mt-8">:</div>
          <FlipCard value={timeLeft.minutes} label="Minutes" />
          <div className="flex items-center text-3xl md:text-4xl text-gold font-bold self-start mt-6 md:mt-8">:</div>
          <FlipCard value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Motivational line */}
        <motion.div
          className="h-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMotivation}
              className="text-foreground/70 text-lg md:text-xl italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              ✨ {motivationalLines[currentMotivation]} ✨
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CountdownTimer;
