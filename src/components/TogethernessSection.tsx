import { motion } from 'framer-motion';
import { Users, Heart, Sparkles, Star } from 'lucide-react';

const togetherMessages = [
  "Life feels better when shared with good people.",
  "Connections make every celebration brighter.",
  "Some moments become memories because of the people in them.",
];

const TogethernessSection = () => {
  return (
    <section className="py-24 px-4 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="w-4 h-4 text-rose/30" fill="currentColor" />
            ) : i % 3 === 1 ? (
              <Star className="w-3 h-3 text-gold/30" fill="currentColor" />
            ) : (
              <Sparkles className="w-4 h-4 text-gold/20" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 glass-card rounded-full px-6 py-3 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-5 h-5 text-gold" />
            <span className="text-foreground/80 font-medium">Celebrating Together</span>
            <Users className="w-5 h-5 text-gold" />
          </motion.div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Better <span className="text-gradient-gold">Together</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The joy of celebration multiplies when shared with those who matter most.
          </p>
        </motion.div>

        {/* Illustration cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {/* Friends card */}
          <motion.div
            className="glass-card rounded-3xl p-8 text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px hsl(43 96% 56% / 0.2)' }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              👯‍♀️
            </motion.div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Friends</h3>
            <p className="text-muted-foreground">
              Those who turn ordinary moments into extraordinary memories.
            </p>
            <motion.div 
              className="mt-4 flex justify-center gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  ✨
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Family card */}
          <motion.div
            className="glass-card rounded-3xl p-8 text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px hsl(350 80% 65% / 0.2)' }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              👨‍👩‍👧‍👦
            </motion.div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Family</h3>
            <p className="text-muted-foreground">
              The foundation of love, laughter, and endless support.
            </p>
            <motion.div 
              className="mt-4 flex justify-center gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                >
                  ❤️
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Someone special card */}
          <motion.div
            className="glass-card-warm rounded-3xl p-8 text-center group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px hsl(350 80% 65% / 0.3)' }}
          >
            <motion.div
              className="text-6xl mb-6"
              animate={{ 
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              💑
            </motion.div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">Someone Special</h3>
            <p className="text-muted-foreground">
              That one person who makes every moment feel magical.
            </p>
            <motion.div 
              className="mt-4 flex justify-center gap-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="text-lg"
                  animate={{ y: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  💕
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Togetherness quotes */}
        <div className="space-y-6">
          {togetherMessages.map((message, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl p-6 md:p-8 text-center"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <p className="font-display text-xl md:text-2xl text-foreground/90 italic">
                "{message}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TogethernessSection;
