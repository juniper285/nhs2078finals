const fs = require('fs');

let content = fs.readFileSync('src/app/data/tarot-cards.ts', 'utf8');

// Add image property to each card object
for (let i = 0; i < 78; i++) {
  const pattern = new RegExp(`id: ${i},([\\s\\S]*?)interpretation: '([^']*)'`, 'g');
  content = content.replace(pattern, `id: ${i},$1interpretation: '$2',\n    image: getCardImage(${i})`);
}

fs.writeFileSync('src/app/data/tarot-cards.ts', content);
console.log('Updated all cards with image property');
