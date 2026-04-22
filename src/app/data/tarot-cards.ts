export interface TarotCard {
  id: number;
  name: string;
  arcana: 'major' | 'minor';
  suit?: 'cups' | 'pentacles' | 'swords' | 'wands';
  keywords: string[];
  meaning: string;
  interpretation: string;
  designer: string | null;
}

// Map card IDs to image filenames
export function getCardImage(id: number): string {
  const cards = [
    // Major Arcana (0-21)
    '0fool', '1magician', '2highpriestess', '3empress', '4emperor',
    '5hierophant', '6lovers', '7chariot', '8strength', '9hermit',
    '10wheeloffortune', '11justice', '12hangedman', '13death', '14temperance',
    '15devil', '16tower', '17star', '18moon', '19sun', '20judgement', '21world',

    // Cups (22-35) - Ace through King
    'cups1', 'cups2', 'cups3', 'cups4', 'cups5', 'cups6', 'cups7', 'cups8',
    'cups9', 'cups10', 'cupsp', 'cupskn', 'cupsq', 'cupsk',

    // Pentacles (36-49) - Ace through King
    'pentacles1', 'pentacles2', 'pentacles3', 'pentacles4', 'pentacles5',
    'pentacles6', 'pentacles7', 'pentacles8', 'pentacles9', 'pentacles10',
    'pentaclesp', 'pentacleskn', 'pentaclesq', 'pentaclesk',

    // Swords (50-63) - Ace through King
    'swords1', 'swords2', 'swords3', 'swords4', 'swords5', 'swords6',
    'swords7', 'swords8', 'swords9', 'swords10', 'swordsp', 'swordskn',
    'swordsq', 'swordsk',

    // Wands (64-77) - Ace through King
    'wands1', 'wands2', 'wands3', 'wands4', 'wands5', 'wands6', 'wands7',
    'wands8', 'wands9', 'wands10', 'wandsp', 'wandskn', 'wandsq', 'wandsk'
  ];

  return `/cards/${cards[id]}.png`;
}

export const CARD_BACK_IMAGE = '/cards/patchwork.png';

export const tarotCards: TarotCard[] = [
  // Major Arcana (0-21)
  {
    id: 0,
    name: 'The Fool',
    arcana: 'major',
    keywords: ['New beginnings', 'Innocence', 'Adventure', 'Freedom'],
    meaning: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, and having beginner\'s luck.',
    interpretation: 'You stand at the edge of a new journey. Trust your instincts and take that leap of faith. The universe supports those who dare to begin.',
    designer: 'Chloe'
  },
  {
    id: 1,
    name: 'The Magician',
    arcana: 'major',
    keywords: ['Manifestation', 'Power', 'Action', 'Creation'],
    meaning: 'The Magician represents having the tools and resources needed, using one\'s talents, taking action, and manifesting one\'s desires.',
    interpretation: 'You have everything you need to succeed. Channel your will and focus your energy. The power to create your reality is in your hands.',
    designer: 'Daryl'
  },
  {
    id: 2,
    name: 'The High Priestess',
    arcana: 'major',
    keywords: ['Intuition', 'Mystery', 'Subconscious', 'Wisdom'],
    meaning: 'The High Priestess represents intuition, sacred knowledge, divine feminine, and the subconscious mind.',
    interpretation: 'Listen to your inner voice. The answers you seek lie within. Trust the wisdom that comes from stillness and reflection.',
    designer: 'Leng Sang'
  },
  {
    id: 3,
    name: 'The Empress',
    arcana: 'major',
    keywords: ['Abundance', 'Nurturing', 'Fertility', 'Nature'],
    meaning: 'The Empress represents motherhood, fertility, nature, abundance, and nurturing.',
    interpretation: 'Abundance flows to you naturally. Nurture your dreams and watch them grow. You are surrounded by creative potential.',
    designer: 'Nadrah'
  },
  {
    id: 4,
    name: 'The Emperor',
    arcana: 'major',
    keywords: ['Authority', 'Structure', 'Control', 'Leadership'],
    meaning: 'The Emperor represents authority, structure, control, and fatherhood.',
    interpretation: 'Step into your power with confidence. Create structure where there is chaos. Your leadership is needed now.',
    designer: 'Elvin'
  },
  {
    id: 5,
    name: 'The Hierophant',
    arcana: 'major',
    keywords: ['Tradition', 'Conformity', 'Education', 'Belief'],
    meaning: 'The Hierophant represents tradition, conformity, education, and belief systems.',
    interpretation: 'Honor the wisdom of tradition while finding your own truth. Seek guidance from those who have walked this path before.',
    designer: 'Bernie'
  },
  {
    id: 6,
    name: 'The Lovers',
    arcana: 'major',
    keywords: ['Love', 'Harmony', 'Choice', 'Partnership'],
    meaning: 'The Lovers represent love, harmony, relationships, values alignment, and choices.',
    interpretation: 'A significant choice awaits you. Follow your heart, but use your head. True partnership requires both passion and alignment.',
    designer: 'Jesslyn'
  },
  {
    id: 7,
    name: 'The Chariot',
    arcana: 'major',
    keywords: ['Determination', 'Willpower', 'Victory', 'Control'],
    meaning: 'The Chariot represents control, willpower, success, action, and determination.',
    interpretation: 'Victory comes through focused determination. Harness opposing forces and direct them toward your goal. You are in control.',
    designer: 'Alice'
  },
  {
    id: 8,
    name: 'Strength',
    arcana: 'major',
    keywords: ['Courage', 'Patience', 'Compassion', 'Inner strength'],
    meaning: 'Strength represents inner strength, courage, patience, control, and compassion.',
    interpretation: 'True strength is gentle. Face challenges with courage and compassion. Your resilience is greater than you know.',
    designer: 'Niharika'
  },
  {
    id: 9,
    name: 'The Hermit',
    arcana: 'major',
    keywords: ['Solitude', 'Wisdom', 'Introspection', 'Guidance'],
    meaning: 'The Hermit represents soul-searching, introspection, being alone, and inner guidance.',
    interpretation: 'Retreat into solitude to find your answers. The light you seek shines from within. Wisdom comes through reflection.',
    designer: 'Chrio'
  },
  {
    id: 10,
    name: 'Wheel of Fortune',
    arcana: 'major',
    keywords: ['Change', 'Cycles', 'Destiny', 'Fortune'],
    meaning: 'The Wheel of Fortune represents good luck, karma, life cycles, destiny, and a turning point.',
    interpretation: 'The wheel turns in your favor. What goes around comes around. Embrace the cycle of change and trust in divine timing.',
    designer: 'Ziying'
  },
  {
    id: 11,
    name: 'Justice',
    arcana: 'major',
    keywords: ['Fairness', 'Truth', 'Law', 'Balance'],
    meaning: 'Justice represents fairness, truth, cause and effect, and law.',
    interpretation: 'Truth prevails and balance is restored. Your actions have consequences. Seek fairness in all things.',
    designer: 'Yiqing'
  },
  {
    id: 12,
    name: 'The Hanged Man',
    arcana: 'major',
    keywords: ['Surrender', 'Perspective', 'Release', 'Suspension'],
    meaning: 'The Hanged Man represents surrender, letting go, new perspectives, and waiting.',
    interpretation: 'Sometimes surrender is the path forward. See your situation from a new angle. What seems like sacrifice may be liberation.',
    designer: 'Vayers'
  },
  {
    id: 13,
    name: 'Death',
    arcana: 'major',
    keywords: ['Transformation', 'Endings', 'Change', 'Transition'],
    meaning: 'Death represents endings, change, transformation, and transition.',
    interpretation: 'An ending makes way for a new beginning. Release what no longer serves you. Transformation is inevitable and necessary.',
    designer: 'JJ'
  },
  {
    id: 14,
    name: 'Temperance',
    arcana: 'major',
    keywords: ['Balance', 'Moderation', 'Patience', 'Harmony'],
    meaning: 'Temperance represents balance, moderation, patience, purpose, and meaning.',
    interpretation: 'Find the middle path. Blend opposing forces into harmony. Patience and moderation bring lasting success.',
    designer: 'Lily'
  },
  {
    id: 15,
    name: 'The Devil',
    arcana: 'major',
    keywords: ['Bondage', 'Materialism', 'Temptation', 'Addiction'],
    meaning: 'The Devil represents bondage, materialism, sexuality, and temptation.',
    interpretation: 'Examine what binds you. The chains are often of your own making. Liberation begins with awareness of your attachments.',
    designer: 'Aadhi'
  },
  {
    id: 16,
    name: 'The Tower',
    arcana: 'major',
    keywords: ['Upheaval', 'Revelation', 'Awakening', 'Chaos'],
    meaning: 'The Tower represents sudden change, upheaval, chaos, revelation, and awakening.',
    interpretation: 'Sometimes structures must fall for truth to emerge. Embrace the chaos—it clears the way for something authentic.',
    designer: 'Larissa'
  },
  {
    id: 17,
    name: 'The Star',
    arcana: 'major',
    keywords: ['Hope', 'Faith', 'Renewal', 'Inspiration'],
    meaning: 'The Star represents hope, faith, purpose, renewal, and spirituality.',
    interpretation: 'Hope shines bright even in darkness. Have faith in your dreams. Renewal and healing are on the horizon.',
    designer: 'Jo Ee'
  },
  {
    id: 18,
    name: 'The Moon',
    arcana: 'major',
    keywords: ['Illusion', 'Intuition', 'Mystery', 'Subconscious'],
    meaning: 'The Moon represents illusion, fear, anxiety, subconscious, and intuition.',
    interpretation: 'Not everything is as it seems. Trust your intuition through uncertain times. The path will become clear.',
    designer: 'Trang'
  },
  {
    id: 19,
    name: 'The Sun',
    arcana: 'major',
    keywords: ['Joy', 'Success', 'Celebration', 'Vitality'],
    meaning: 'The Sun represents positivity, fun, warmth, success, and vitality.',
    interpretation: 'Joy radiates from within and around you. Success is assured. Celebrate life and let your light shine.',
    designer: 'Anh'
  },
  {
    id: 20,
    name: 'Judgement',
    arcana: 'major',
    keywords: ['Reflection', 'Reckoning', 'Awakening', 'Renewal'],
    meaning: 'Judgement represents judgement, rebirth, inner calling, and absolution.',
    interpretation: 'A moment of reckoning arrives. Reflect on your journey and make peace with the past. You are ready to rise renewed.',
    designer: 'E Xun'
  },
  {
    id: 21,
    name: 'The World',
    arcana: 'major',
    keywords: ['Completion', 'Achievement', 'Fulfillment', 'Travel'],
    meaning: 'The World represents completion, accomplishment, travel, and fulfillment.',
    interpretation: 'A cycle completes and you achieve what you set out to do. Celebrate your success. The world is yours to explore.',
    designer: 'Natasja'
  },

  // Minor Arcana - Cups (22-35)
  {
    id: 22,
    name: 'Ace of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['New love', 'Emotions', 'Creativity', 'Intuition'],
    meaning: 'The Ace of Cups represents new relationships, love, compassion, and creativity.',
    interpretation: 'Your heart overflows with new emotional possibilities. Love, creativity, and intuition flow freely. Open yourself to receive.',
    designer: 'Julia'
  },
  {
    id: 23,
    name: 'Two of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Partnership', 'Union', 'Harmony', 'Connection'],
    meaning: 'The Two of Cups represents unified love, partnership, and mutual attraction.',
    interpretation: 'A harmonious connection forms. Partnership and mutual understanding create something beautiful together.',
    designer: 'Koo An'
  },
  {
    id: 24,
    name: 'Three of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Celebration', 'Friendship', 'Community', 'Joy'],
    meaning: 'The Three of Cups represents celebration, friendship, creativity, and community.',
    interpretation: 'Celebrate with those you love. Community and friendship bring joy. Share your abundance.',
    designer: 'Bridget'
  },
  {
    id: 25,
    name: 'Four of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Contemplation', 'Apathy', 'Meditation', 'Reevaluation'],
    meaning: 'The Four of Cups represents meditation, contemplation, apathy, and reevaluation.',
    interpretation: 'Look within before looking outward. What you seek may already be present, just unseen. Shift your perspective.',
    designer: 'Vernon'
  },
  {
    id: 26,
    name: 'Five of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Loss', 'Regret', 'Disappointment', 'Moving on'],
    meaning: 'The Five of Cups represents loss, grief, self-pity, and regret.',
    interpretation: 'Acknowledge your loss, but don\'t dwell in sorrow. What remains can sustain you. Look forward with hope.',
    designer: 'Luoqi'
  },
  {
    id: 27,
    name: 'Six of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Nostalgia', 'Memories', 'Innocence', 'Childhood'],
    meaning: 'The Six of Cups represents revisiting the past, childhood memories, and innocence.',
    interpretation: 'The past offers comfort and wisdom. Reconnect with what brought you joy. Innocence and simplicity have their place.',
    designer: 'Clarence'
  },
  {
    id: 28,
    name: 'Seven of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Choices', 'Illusion', 'Fantasy', 'Confusion'],
    meaning: 'The Seven of Cups represents opportunities, choices, wishful thinking, and illusion.',
    interpretation: 'Many options present themselves. Not all that glitters is gold. Choose wisely and ground your dreams in reality.',
    designer: null
  },
  {
    id: 29,
    name: 'Eight of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Walking away', 'Seeking truth', 'Journey', 'Withdrawal'],
    meaning: 'The Eight of Cups represents walking away, disillusionment, leaving behind, and seeking truth.',
    interpretation: 'It\'s time to leave something behind. The journey ahead requires courage, but deeper fulfillment awaits.',
    designer: null
  },
  {
    id: 30,
    name: 'Nine of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Satisfaction', 'Wishes', 'Contentment', 'Luxury'],
    meaning: 'The Nine of Cups represents contentment, satisfaction, gratitude, and wishes coming true.',
    interpretation: 'Your wishes are fulfilled. Enjoy this moment of satisfaction. Gratitude amplifies your blessings.',
    designer: 'Liong Leong'
  },
  {
    id: 31,
    name: 'Ten of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Happiness', 'Family', 'Harmony', 'Fulfillment'],
    meaning: 'The Ten of Cups represents divine love, blissful relationships, harmony, and alignment.',
    interpretation: 'Emotional fulfillment and harmony surround you. Family and relationships bring deep joy. This is what happiness feels like.',
    designer: null
  },
  {
    id: 32,
    name: 'Page of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Creativity', 'Intuition', 'Messages', 'Curiosity'],
    meaning: 'The Page of Cups represents creative opportunities, intuitive messages, and curiosity.',
    interpretation: 'A message from your heart arrives. Embrace your creative impulses. Stay curious and open to emotional growth.',
    designer: 'Mirella'
  },
  {
    id: 33,
    name: 'Knight of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Romance', 'Charm', 'Idealism', 'Following the heart'],
    meaning: 'The Knight of Cups represents romance, charm, imagination, and following your heart.',
    interpretation: 'Follow your heart with courage. Romance and idealism inspire action. Let your emotions guide you forward.',
    designer: null
  },
  {
    id: 34,
    name: 'Queen of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Compassion', 'Intuition', 'Nurturing', 'Emotional depth'],
    meaning: 'The Queen of Cups represents compassion, calm, comfort, and emotional stability.',
    interpretation: 'Lead with compassion and emotional intelligence. Your intuition is your strength. Nurture yourself and others.',
    designer: 'Yujun'
  },
  {
    id: 35,
    name: 'King of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['Emotional balance', 'Wisdom', 'Diplomacy', 'Control'],
    meaning: 'The King of Cups represents emotional balance, control, and generosity.',
    interpretation: 'Master your emotions without suppressing them. Balance feeling with wisdom. Your calm leadership inspires others.',
    designer: 'Felix'
  },

  // Minor Arcana - Pentacles (36-49)
  {
    id: 36,
    name: 'Ace of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Opportunity', 'Prosperity', 'New venture', 'Manifestation'],
    meaning: 'The Ace of Pentacles represents new financial or career opportunity, manifestation, and abundance.',
    interpretation: 'A new opportunity for prosperity appears. Plant seeds for future abundance. The material world supports your dreams.',
    designer: null
  },
  {
    id: 37,
    name: 'Two of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Balance', 'Adaptability', 'Priorities', 'Juggling'],
    meaning: 'The Two of Pentacles represents multiple priorities, time management, and adaptability.',
    interpretation: 'Balance is found in motion, not stillness. Adapt to changing circumstances. Prioritize what matters most.',
    designer: null
  },
  {
    id: 38,
    name: 'Three of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Teamwork', 'Collaboration', 'Skill', 'Quality'],
    meaning: 'The Three of Pentacles represents teamwork, collaboration, learning, and implementation.',
    interpretation: 'Your skills are recognized and valued. Collaboration brings success. Quality work yields lasting results.',
    designer: null
  },
  {
    id: 39,
    name: 'Four of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Security', 'Control', 'Conservation', 'Possessiveness'],
    meaning: 'The Four of Pentacles represents control, stability, security, and possession.',
    interpretation: 'Examine your relationship with security. Holding too tight may limit growth. Find balance between saving and spending.',
    designer: null
  },
  {
    id: 40,
    name: 'Five of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Hardship', 'Loss', 'Isolation', 'Struggle'],
    meaning: 'The Five of Pentacles represents financial loss, poverty, worry, and isolation.',
    interpretation: 'Hardship is temporary. Help is available if you look for it. Don\'t let pride prevent you from seeking support.',
    designer: null
  },
  {
    id: 41,
    name: 'Six of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Generosity', 'Charity', 'Giving', 'Receiving'],
    meaning: 'The Six of Pentacles represents gifts, generosity, charity, and sharing wealth.',
    interpretation: 'Give freely without expectation. Receive graciously without shame. Generosity creates abundance for all.',
    designer: 'Kenneth'
  },
  {
    id: 42,
    name: 'Seven of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Assessment', 'Patience', 'Reward', 'Investment'],
    meaning: 'The Seven of Pentacles represents long-term view, sustainable results, and perseverance.',
    interpretation: 'Pause to assess your progress. Patience yields rewards. Your investment of time and energy will pay off.',
    designer: 'Ellery'
  },
  {
    id: 43,
    name: 'Eight of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Skill', 'Dedication', 'Mastery', 'Craftsmanship'],
    meaning: 'The Eight of Pentacles represents apprenticeship, skill development, and quality.',
    interpretation: 'Dedicate yourself to mastery. Each repetition refines your skill. Quality work brings fulfillment and success.',
    designer: null
  },
  {
    id: 44,
    name: 'Nine of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Independence', 'Luxury', 'Self-sufficiency', 'Success'],
    meaning: 'The Nine of Pentacles represents abundance, luxury, self-sufficiency, and financial independence.',
    interpretation: 'Enjoy the fruits of your labor. You\'ve earned this success through discipline. Independence brings true luxury.',
    designer: 'Justin'
  },
  {
    id: 45,
    name: 'Ten of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Legacy', 'Wealth', 'Family', 'Long-term success'],
    meaning: 'The Ten of Pentacles represents wealth, financial security, family, and long-term success.',
    interpretation: 'Lasting prosperity and security are yours. Build a legacy that endures. Family and tradition provide foundation.',
    designer: null
  },
  {
    id: 46,
    name: 'Page of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Opportunity', 'Study', 'Ambition', 'Planning'],
    meaning: 'The Page of Pentacles represents manifestation, financial opportunity, and skill development.',
    interpretation: 'A new opportunity for learning or earning appears. Stay curious and ambitious. Plan carefully and take practical steps.',
    designer: null
  },
  {
    id: 47,
    name: 'Knight of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Efficiency', 'Routine', 'Reliability', 'Hard work'],
    meaning: 'The Knight of Pentacles represents hard work, productivity, routine, and conservatism.',
    interpretation: 'Steady progress wins the race. Be reliable and methodical. Hard work and dedication bring results.',
    designer: 'Harry'
  },
  {
    id: 48,
    name: 'Queen of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Nurturing', 'Practical', 'Abundance', 'Security'],
    meaning: 'The Queen of Pentacles represents practicality, creature comforts, financial security, and luxury.',
    interpretation: 'Nurture your resources and relationships. Practical wisdom creates abundance. Comfort and security are within reach.',
    designer: 'Amy'
  },
  {
    id: 49,
    name: 'King of Pentacles',
    arcana: 'minor',
    suit: 'pentacles',
    keywords: ['Wealth', 'Business', 'Leadership', 'Abundance'],
    meaning: 'The King of Pentacles represents wealth, business, leadership, security, and abundance.',
    interpretation: 'Lead with practical wisdom and generosity. Your business acumen creates lasting wealth. Share your abundance.',
    designer: 'Kevin'
  },

  // Minor Arcana - Swords (50-63)
  {
    id: 50,
    name: 'Ace of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Clarity', 'Breakthrough', 'Truth', 'Mental power'],
    meaning: 'The Ace of Swords represents breakthroughs, new ideas, mental clarity, and success.',
    interpretation: 'A breakthrough in understanding arrives. Cut through confusion with clarity. Truth and mental power are your allies.',
    designer: 'Joseph'
  },
  {
    id: 51,
    name: 'Two of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Difficult choice', 'Stalemate', 'Avoidance', 'Balance'],
    meaning: 'The Two of Swords represents difficult decisions, weighing options, and stalemate.',
    interpretation: 'A decision must be made. Remove the blindfold and see clearly. Avoiding choice is itself a choice.',
    designer: 'Emmy'
  },
  {
    id: 52,
    name: 'Three of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Heartbreak', 'Sorrow', 'Pain', 'Release'],
    meaning: 'The Three of Swords represents heartbreak, emotional pain, sorrow, and grief.',
    interpretation: 'Heartbreak is real, but temporary. Allow yourself to feel and heal. Pain acknowledged can be released.',
    designer: 'Jem'
  },
  {
    id: 53,
    name: 'Four of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Rest', 'Contemplation', 'Recovery', 'Meditation'],
    meaning: 'The Four of Swords represents rest, relaxation, meditation, and contemplation.',
    interpretation: 'Rest is necessary for renewal. Step back from the battle. Quiet contemplation restores your strength.',
    designer: 'Devesh'
  },
  {
    id: 54,
    name: 'Five of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Conflict', 'Defeat', 'Win at all costs', 'Betrayal'],
    meaning: 'The Five of Swords represents conflict, disagreements, competition, and defeat.',
    interpretation: 'Not all victories are worth the cost. Choose your battles wisely. Sometimes walking away is winning.',
    designer: 'Danny'
  },
  {
    id: 55,
    name: 'Six of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Transition', 'Moving on', 'Travel', 'Recovery'],
    meaning: 'The Six of Swords represents transition, change, moving on, and leaving behind.',
    interpretation: 'Move toward calmer waters. The journey away from difficulty has begun. Trust the transition.',
    designer: null
  },
  {
    id: 56,
    name: 'Seven of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Deception', 'Strategy', 'Cunning', 'Theft'],
    meaning: 'The Seven of Swords represents betrayal, deception, getting away with something, and acting strategically.',
    interpretation: 'Question what you\'re told. Strategy and cunning have their place, but beware of self-deception. Act with integrity.',
    designer: 'Koi'
  },
  {
    id: 57,
    name: 'Eight of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Trapped', 'Restriction', 'Victim mentality', 'Self-imposed'],
    meaning: 'The Eight of Swords represents self-imposed restriction, imprisonment, victim mentality, and powerlessness.',
    interpretation: 'The bonds that hold you are often self-imposed. Remove the blindfold. Freedom is closer than you think.',
    designer: null
  },
  {
    id: 58,
    name: 'Nine of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Anxiety', 'Worry', 'Nightmares', 'Fear'],
    meaning: 'The Nine of Swords represents anxiety, worry, fear, and depression.',
    interpretation: 'Your fears may be worse than reality. Dawn always follows darkness. Reach out for support—you don\'t have to suffer alone.',
    designer: null
  },
  {
    id: 59,
    name: 'Ten of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Ending', 'Rock bottom', 'Betrayal', 'Crisis'],
    meaning: 'The Ten of Swords represents painful endings, deep wounds, betrayal, and crisis.',
    interpretation: 'This is the darkest before dawn. An ending is complete. From rock bottom, the only way is up. Rebirth awaits.',
    designer: 'Siting'
  },
  {
    id: 60,
    name: 'Page of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Curiosity', 'Communication', 'Ideas', 'Vigilance'],
    meaning: 'The Page of Swords represents new ideas, curiosity, thirst for knowledge, and new ways of communicating.',
    interpretation: 'Stay curious and alert. New ideas energize you. Communicate clearly and listen carefully.',
    designer: 'Jackson'
  },
  {
    id: 61,
    name: 'Knight of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Action', 'Ambition', 'Fast pace', 'Direct'],
    meaning: 'The Knight of Swords represents ambitious action, fast thinking, and rushing headlong.',
    interpretation: 'Act decisively but not recklessly. Your speed and determination are assets. Balance urgency with wisdom.',
    designer: null
  },
  {
    id: 62,
    name: 'Queen of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Independence', 'Clear thinking', 'Direct', 'Honest'],
    meaning: 'The Queen of Swords represents independent thinking, clear boundaries, direct communication, and honesty.',
    interpretation: 'Speak your truth with clarity and compassion. Set firm boundaries. Independent thought is your power.',
    designer: 'Ezann'
  },
  {
    id: 63,
    name: 'King of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['Authority', 'Logic', 'Truth', 'Intellectual power'],
    meaning: 'The King of Swords represents mental clarity, intellectual power, authority, and truth.',
    interpretation: 'Lead with logic and fairness. Your intellectual authority commands respect. Truth and justice guide your decisions.',
    designer: 'Jaymeson'
  },

  // Minor Arcana - Wands (64-77)
  {
    id: 64,
    name: 'Ace of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Inspiration', 'New opportunity', 'Growth', 'Potential'],
    meaning: 'The Ace of Wands represents inspiration, new opportunities, growth, and potential.',
    interpretation: 'Creative fire ignites within you. A new opportunity sparks with potential. Act on your inspiration while it\'s hot.',
    designer: 'Christine'
  },
  {
    id: 65,
    name: 'Two of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Planning', 'Future', 'Discovery', 'Decisions'],
    meaning: 'The Two of Wands represents future planning, progress, decisions, and discovery.',
    interpretation: 'The world is yours to explore. Make plans for future expansion. Bold decisions lead to discovery.',
    designer: 'Denise'
  },
  {
    id: 66,
    name: 'Three of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Expansion', 'Foresight', 'Progress', 'Overseas'],
    meaning: 'The Three of Wands represents progress, expansion, foresight, and overseas opportunities.',
    interpretation: 'Your efforts are beginning to pay off. Expansion and growth await. Look to the horizon with confidence.',
    designer: 'Ashley'
  },
  {
    id: 67,
    name: 'Four of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Celebration', 'Harmony', 'Home', 'Community'],
    meaning: 'The Four of Wands represents celebration, harmony, marriage, home, and community.',
    interpretation: 'Celebrate your achievements and milestones. Community supports you. Home and harmony bring joy.',
    designer: 'Keith'
  },
  {
    id: 68,
    name: 'Five of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Conflict', 'Competition', 'Disagreement', 'Tension'],
    meaning: 'The Five of Wands represents conflict, competition, tension, and diversity of opinion.',
    interpretation: 'Healthy competition spurs growth. Navigate disagreements constructively. Tension can be creative when channeled well.',
    designer: 'Justin'
  },
  {
    id: 69,
    name: 'Six of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Victory', 'Success', 'Recognition', 'Pride'],
    meaning: 'The Six of Wands represents success, public recognition, progress, and self-confidence.',
    interpretation: 'Victory is yours. Your efforts receive recognition. Enjoy this moment of triumph with humble pride.',
    designer: 'Erik'
  },
  {
    id: 70,
    name: 'Seven of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Defense', 'Perseverance', 'Challenge', 'Standing ground'],
    meaning: 'The Seven of Wands represents perseverance, defensive stance, maintaining position, and standing your ground.',
    interpretation: 'Stand your ground against challenges. Your position is worth defending. Perseverance brings victory.',
    designer: 'Raida'
  },
  {
    id: 71,
    name: 'Eight of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Speed', 'Movement', 'Action', 'Travel'],
    meaning: 'The Eight of Wands represents rapid action, movement, swift change, and air travel.',
    interpretation: 'Events unfold rapidly. Swift action brings results. Movement and momentum carry you forward.',
    designer: null
  },
  {
    id: 72,
    name: 'Nine of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Resilience', 'Persistence', 'Boundaries', 'Last stretch'],
    meaning: 'The Nine of Wands represents resilience, courage, persistence, and test of faith.',
    interpretation: 'You\'re almost there. Guard your boundaries while staying open. Your resilience will carry you through this final stretch.',
    designer: null
  },
  {
    id: 73,
    name: 'Ten of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Burden', 'Responsibility', 'Hard work', 'Completion'],
    meaning: 'The Ten of Wands represents burden, extra responsibility, hard work, and completion.',
    interpretation: 'You carry a heavy load, but the end is near. Delegate where possible. Completion brings relief and reward.',
    designer: 'Rev'
  },
  {
    id: 74,
    name: 'Page of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Enthusiasm', 'Exploration', 'Discovery', 'Free spirit'],
    meaning: 'The Page of Wands represents inspiration, ideas, discovery, and free spirit.',
    interpretation: 'Embrace your enthusiasm and curiosity. Explore new territories. Let your free spirit guide you to discovery.',
    designer: null
  },
  {
    id: 75,
    name: 'Knight of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Energy', 'Passion', 'Adventure', 'Impulsiveness'],
    meaning: 'The Knight of Wands represents energy, passion, adventure, and impulsiveness.',
    interpretation: 'Channel your passion into action. Adventure calls. Balance enthusiasm with focus for best results.',
    designer: null
  },
  {
    id: 76,
    name: 'Queen of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Confidence', 'Independence', 'Determination', 'Vibrancy'],
    meaning: 'The Queen of Wands represents courage, confidence, independence, and determination.',
    interpretation: 'Step into your power with confidence. Your vibrant energy inspires others. Lead with passionate determination.',
    designer: 'Amber'
  },
  {
    id: 77,
    name: 'King of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['Leadership', 'Vision', 'Entrepreneur', 'Honor'],
    meaning: 'The King of Wands represents natural-born leader, vision, entrepreneur, and honor.',
    interpretation: 'Your vision and leadership create reality. Take bold action with honor. Entrepreneurial spirit brings success.',
    designer: 'Dhruv'
  }
];
