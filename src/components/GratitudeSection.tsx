import { motion } from 'framer-motion';
import { Heart, Flower2, Star } from 'lucide-react';

const gratitudeMessages = [
  "Thank you for being part of this journey.",
  "Grateful for the lessons, memories, and people of the past year.",
  "With gratitude for what was, and hope for what's coming.",
];

const GratitudeSection = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose/5 to-transparent pointer-events-none" />
      
      {/* Floating flowers */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Flower2 className="w-8 h-8" />
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-6 h-6 text-rose" fill="currentColor" />
            <span className="text-rose text-lg font-medium">With Gratitude</span>
            <Heart className="w-6 h-6 text-rose" fill="currentColor" />
          </motion.div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Thank You <span className="text-gradient-gold">For Everything</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            As we step into a new year, we pause to appreciate all that brought us here.
          </p>
        </motion.div>

        {/* Gratitude messages */}
        <div className="space-y-8">
          {gratitudeMessages.map((message, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="glass-card rounded-2xl p-8 md:p-10 text-center relative overflow-hidden group hover:bg-card/60 transition-all duration-300">
                {/* Decorative star */}
                <motion.div
                  className="absolute top-4 right-4 text-gold/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="w-6 h-6" fill="currentColor" />
                </motion.div>

                <motion.p
                  className="font-display text-xl md:text-2xl text-foreground/90 italic"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  🙏 "{message}"
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing heart animation */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="flex items-center gap-3"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Star className="w-5 h-5 text-gold" fill="currentColor" />
            <Heart className="w-8 h-8 text-rose" fill="currentColor" />
            <Star className="w-5 h-5 text-gold" fill="currentColor" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GratitudeSection;
