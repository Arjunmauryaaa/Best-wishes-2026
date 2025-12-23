import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const additionalQuotes = [
  "Progress over perfection.",
  "Small steps today create big wins tomorrow.",
  "Believe in growth, embrace change.",
  "Your potential is limitless.",
  "Every sunrise brings new hope.",
];

const MessageSection = () => {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullMessage = "May this year bring smiles that last longer, dreams that grow stronger, and moments that truly matter.";

  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullMessage.length) {
        setTypedText(fullMessage.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        // Keep cursor blinking for a bit then hide
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 530);
      return () => clearInterval(cursorInterval);
    }
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 text-gold/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Star className="w-16 h-16" fill="currentColor" />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-rose/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Heart className="w-20 h-20" fill="currentColor" />
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Main message card */}
        <motion.div
          className="glass-card-warm rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Sparkle decorations */}
          <motion.div
            className="absolute top-6 left-6"
            animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-gold" />
          </motion.div>
          <motion.div
            className="absolute top-6 right-6"
            animate={{ rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-gold" />
          </motion.div>

          {/* Typewriter message */}
          <div className="mb-12">
            <motion.p
              className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              "{typedText}
              <motion.span
                className="inline-block w-0.5 h-8 bg-gold ml-1 align-middle"
                animate={{ opacity: showCursor ? 1 : 0 }}
              />
              "
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />

          {/* Additional quotes */}
          <div className="space-y-6">
            {additionalQuotes.map((quote, index) => (
              <motion.p
                key={index}
                className="text-foreground/70 text-lg md:text-xl"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
              >
                <span className="text-gold">•</span> {quote}
              </motion.p>
            ))}
          </div>

          {/* Bottom heart decoration */}
          <motion.div
            className="mt-10 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              >
                <Heart 
                  className={`w-5 h-5 ${i === 2 ? 'text-rose' : 'text-gold/60'}`} 
                  fill="currentColor" 
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageSection;
