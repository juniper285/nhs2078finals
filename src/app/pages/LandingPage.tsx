import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Starfield } from '../components/Starfield';
import { CARD_BACK_IMAGE } from '../data/tarot-cards';
import { Library } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a1030] to-[#0a0118] overflow-hidden">
      <Starfield />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-violet-300 to-purple-200 mb-4">
            Wanderer's Tarot
          </h1>
          <p className="text-purple-300/70 text-lg max-w-md mx-auto">
            Wyrd Bið Ful Aræd
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-16 relative"
        >
          <div className="w-32 h-48 rounded-lg overflow-hidden relative">
            <img
              src={CARD_BACK_IMAGE}
              alt="Tarot card back"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 20px rgba(124, 58, 237, 0.4)',
                '0 0 40px rgba(124, 58, 237, 0.6)',
                '0 0 20px rgba(124, 58, 237, 0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-4"
        >
          <button
            onClick={() => navigate('/reading')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-semibold text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Begin Reading</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </button>

          <button
            onClick={() => navigate('/browse')}
            className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-purple-500/50 text-purple-300 rounded-lg font-semibold text-lg hover:border-purple-400 hover:text-purple-200 transition-colors"
          >
            <Library size={20} />
            Browse Deck
          </button>
        </motion.div>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
