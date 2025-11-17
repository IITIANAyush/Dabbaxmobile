import { motion } from 'motion/react';
import { Utensils } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="w-full h-full gradient-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
      </div>

      {/* Logo Animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
        className="relative z-10"
      >
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
          <Utensils className="text-primary" size={48} strokeWidth={2.5} />
        </div>
      </motion.div>

      {/* App Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-6 text-center relative z-10"
      >
        <h1 className="text-white">DabbaX</h1>
        <p className="text-white/90 mt-2">Campus Food Delivery</p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-12 text-white/80 text-sm"
      >
        IIT Bombay
      </motion.p>

      {/* Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-6 flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 bg-white rounded-full"
          />
        ))}
      </motion.div>
    </div>
  );
}
