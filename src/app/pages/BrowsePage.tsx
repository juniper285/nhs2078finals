import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { TarotCard } from '../components/TarotCard';
import { Starfield } from '../components/Starfield';
import { tarotCards } from '../data/tarot-cards';
import { Home, Sparkles } from 'lucide-react';

export function BrowsePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'major' | 'cups' | 'pentacles' | 'swords' | 'wands'>('all');

  const filteredCards = tarotCards.filter(card => {
    if (filter === 'all') return true;
    if (filter === 'major') return card.arcana === 'major';
    return card.suit === filter;
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a1030] to-[#0a0118] overflow-hidden">
      <Starfield />

      {/* Navigation */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between">
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

      <div className="relative z-10 p-8 pt-20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-purple-200 mb-6">The Tarot Deck</h2>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              All Cards
            </button>
            <button
              onClick={() => setFilter('major')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'major'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Major Arcana
            </button>
            <button
              onClick={() => setFilter('cups')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'cups'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Cups
            </button>
            <button
              onClick={() => setFilter('pentacles')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'pentacles'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Pentacles
            </button>
            <button
              onClick={() => setFilter('swords')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'swords'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Swords
            </button>
            <button
              onClick={() => setFilter('wands')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filter === 'wands'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/30'
              }`}
            >
              Wands
            </button>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-7 gap-6 max-w-[1600px] mx-auto"
        >
          {filteredCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/card/${card.id}`)}
            >
              <div className="flex flex-col items-center">
                <TarotCard cardId={card.id} size="medium" showBack={false} />
                <div className="text-center mt-2 w-full">
                  <p className="text-purple-300 text-sm font-semibold">{card.name}</p>
                  {card.designer && (
                    <p className="text-purple-400/60 text-xs italic">✦ Designed by {card.designer}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
