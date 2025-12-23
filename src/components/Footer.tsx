import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border/30">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative line */}
        <motion.div
          className="flex justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Star className="w-4 h-4 text-gold/50" fill="currentColor" />
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <Heart className="w-5 h-5 text-rose" fill="currentColor" />
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <Star className="w-4 h-4 text-gold/50" fill="currentColor" />
        </motion.div>

        {/* Main message */}
        <motion.p
          className="font-display text-xl md:text-2xl text-foreground/80 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Wishing you a year filled with love, laughter, and endless possibilities.
        </motion.p>

        {/* Year badge */}
        <motion.div
          className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-3 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles className="w-5 h-5 text-gold" />
          <span className="text-gradient-gold font-display text-xl font-bold">Happy 2026</span>
          <Sparkles className="w-5 h-5 text-gold" />
        </motion.div>

        {/* Bottom text */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-muted-foreground text-sm">
            Made with <Heart className="w-4 h-4 text-rose inline-block mx-1" fill="currentColor" /> for everyone special
          </p>
          <p className="text-muted-foreground/60 text-xs">
            ✨ May your dreams take flight ✨
          </p>
        </motion.div>

        {/* Floating emojis */}
        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {['🎆', '🥂', '🎊', '💫', '🎇'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-2xl"
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.2 
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
