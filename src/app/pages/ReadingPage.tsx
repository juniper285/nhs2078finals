import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { TarotCard } from '../components/TarotCard';
import { Starfield } from '../components/Starfield';
import { tarotCards } from '../data/tarot-cards';
import { X, Library } from 'lucide-react';

export function ReadingPage() {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<number[]>([]);

  // Shuffle cards on mount
  useEffect(() => {
    const cardIds = tarotCards.map((_, index) => index);
    const shuffled = [...cardIds].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
  }, []);

  const handleCardSelect = (id: number) => {
    if (selectedCardId === null) {
      setSelectedCardId(id);
      setTimeout(() => setIsRevealed(true), 300);
    }
  };

  const handleReset = () => {
    setIsRevealed(false);
    setTimeout(() => setSelectedCardId(null), 300);
  };

  const selectedCard = selectedCardId !== null ? tarotCards[selectedCardId] : null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0118] via-[#1a1030] to-[#0a0118] overflow-hidden">
      <Starfield />

      {/* Navigation */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center gap-2 px-4 py-2 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-900/60 hover:border-purple-400/50 transition-all"
        >
          <Library size={16} />
          <span className="text-sm">Browse Deck</span>
        </button>
      </div>

      <div className="relative z-10 p-8">
        {selectedCardId === null ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-serif text-purple-200 mb-2">Choose Your Card</h2>
              <p className="text-purple-400/70">Focus your intention and select one card from the deck</p>
            </div>

            <div className="grid grid-cols-13 gap-3 max-w-[1600px] mx-auto">
              {shuffledCards.map((cardId) => (
                <TarotCard
                  key={cardId}
                  cardId={cardId}
                  onSelect={() => handleCardSelect(cardId)}
                  size="small"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex items-center gap-12 max-w-6xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <TarotCard
                  cardId={selectedCardId}
                  isFlipped={isRevealed}
                  isSelected={true}
                  size="large"
                />
              </motion.div>

              <AnimatePresence>
                {isRevealed && selectedCard && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="max-w-md"
                  >
                    <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 relative">
                      <button
                        onClick={handleReset}
                        className="absolute top-4 right-4 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <X size={20} />
                      </button>

                      <h3 className="text-3xl font-serif text-purple-200 mb-2">{selectedCard.name}</h3>

                      {selectedCard.designer && (
                        <p className="text-xs text-purple-300/60 italic mb-4">
                          ✦ Designed by {selectedCard.designer}
                        </p>
                      )}

                      <div className="flex gap-2 mb-4">
                        {selectedCard.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-purple-800/30 text-purple-300 rounded-full"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-purple-300/70 text-sm mb-1">Meaning</h4>
                          <p className="text-purple-200/90 leading-relaxed">{selectedCard.meaning}</p>
                        </div>

                        <div>
                          <h4 className="text-purple-300/70 text-sm mb-1">Your Message</h4>
                          <p className="text-purple-100 leading-relaxed italic">{selectedCard.interpretation}</p>
                        </div>
                      </div>

                      <button
                        onClick={handleReset}
                        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-semibold hover:from-purple-500 hover:to-violet-500 transition-all"
                      >
                        Draw Another Card
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
