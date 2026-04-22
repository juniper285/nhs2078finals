import { motion } from 'motion/react';
import { useState } from 'react';
import { getCardImage, CARD_BACK_IMAGE, tarotCards } from '../data/tarot-cards';

interface TarotCardProps {
  cardId: number;
  isFlipped?: boolean;
  isSelected?: boolean;
  isDimmed?: boolean;
  onSelect?: () => void;
  size?: 'small' | 'medium' | 'large';
  showBack?: boolean;
  showDesignerLabel?: boolean;
}

export function TarotCard({
  cardId,
  isFlipped = false,
  isSelected = false,
  isDimmed = false,
  onSelect,
  size = 'medium',
  showBack = true,
  showDesignerLabel = true
}: TarotCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const card = tarotCards[cardId];
  const isAvailable = !card?.designer;

  const sizeClasses = {
    small: 'w-[100px] h-[141px]',
    medium: 'w-[140px] h-[198px]',
    large: 'w-[280px] h-[396px]'
  };

  return (
    <motion.div
      className={`relative cursor-pointer ${sizeClasses[size]} perspective-1000 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      whileHover={!isSelected && !isDimmed ? { scale: 1.05, y: -8 } : {}}
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        scale: isSelected ? 1.1 : 1
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: showBack ? (isFlipped ? 180 : 0) : (isFlipped ? 0 : 180) }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Card Back */}
        <div
          className={`absolute inset-0 backface-hidden rounded-lg overflow-hidden shadow-xl ${
            isAvailable ? 'border-2 border-dashed border-white/20' : 'border-2 border-purple-500/30'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <img
            src={CARD_BACK_IMAGE}
            alt="Card back"
            className="w-full h-full object-cover"
          />
          {/* Hover glow overlay */}
          {isHovered && !isSelected && !isDimmed && (
            <>
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{
                  boxShadow: isAvailable
                    ? '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.15)'
                    : '0 0 25px rgba(124, 58, 237, 0.8), 0 0 50px rgba(124, 58, 237, 0.5), 0 0 75px rgba(124, 58, 237, 0.3)',
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </>
          )}
          {/* Designer label on hover */}
          {showDesignerLabel && card?.designer && (
            <div className="absolute bottom-2 left-2 text-[10px] text-purple-200/90 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
              {card.designer}
            </div>
          ))}
        </div>

        {/* Card Front */}
        <div
          className="absolute inset-0 backface-hidden rounded-lg overflow-hidden border-2 border-purple-400/40 shadow-xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img
            src={getCardImage(cardId)}
            alt={`Tarot card ${cardId}`}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Selection glow */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            boxShadow: '0 0 30px rgba(167, 139, 250, 0.8), 0 0 60px rgba(124, 58, 237, 0.5)',
          }}
        />
      )}
    </motion.div>
  );
}
