import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { TarotCard } from '../components/TarotCard';
import { Starfield } from '../components/Starfield';
import { tarotCards } from '../data/tarot-cards';

export function CardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardId = parseInt(id || '0');
  const card = tarotCards[cardId];

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0118] text-purple-200">
        Card not found
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a1030] to-[#0a0118] overflow-hidden">
      <Starfield />

      <div className="relative z-10 p-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Deck
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-900/60 hover:border-purple-400/50 transition-all"
            >
              <Home size={16} />
              <span className="text-sm">Home</span>
            </button>
            <button
              onClick={() => navigate('/reading')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-900/60 hover:border-purple-400/50 transition-all"
            >
              <Sparkles size={16} />
              <span className="text-sm">Draw a Card</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TarotCard cardId={cardId} isFlipped={true} size="large" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg"
            >
              <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8">
                <div className="mb-3">
                  <span className="text-xs px-3 py-1 bg-purple-800/40 text-purple-300 rounded-full">
                    {card.arcana === 'major' ? 'Major Arcana' : `${card.suit} - Minor Arcana`}
                  </span>
                </div>

                <h2 className="text-4xl font-serif text-purple-200 mb-1">{card.name}</h2>

                {card.designer && (
                  <p className="text-xs text-purple-300/60 italic mb-3">
                    ✦ Designed by {card.designer}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {card.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-sm px-3 py-1 bg-purple-700/30 text-purple-300 rounded-full lowercase"
                    >
                      {keyword.toLowerCase()}
                    </span>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-purple-300 font-semibold mb-2">Meaning</h3>
                    <p className="text-purple-200/90 leading-relaxed">{card.meaning}</p>
                  </div>

                  <div>
                    <h3 className="text-purple-300 font-semibold mb-2">Interpretation</h3>
                    <p className="text-purple-100 leading-relaxed italic">{card.interpretation}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <button
                    onClick={() => navigate('/reading')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-violet-500 transition-all"
                  >
                    Draw This Card in a Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
