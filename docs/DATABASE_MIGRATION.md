# Database Migration Guide

Step-by-step instructions for migrating card data from TypeScript to Supabase.

---

## Overview

**Current State**: Card data is stored in `/src/app/data/tarot-cards.ts` as a TypeScript array.

**Target State**: Card data is stored in Supabase PostgreSQL database.

**Migration Strategy**: One-time data migration script.

---

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project:
   - Name: `cosmic-tarot`
   - Database Password: [secure password]
   - Region: Choose closest to your users
4. Wait for database provisioning (~2 minutes)
5. Note your project URL and API keys from Settings > API

---

## Step 2: Create Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Create cards table
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  arcana VARCHAR(10) NOT NULL CHECK (arcana IN ('major', 'minor')),
  suit VARCHAR(20) CHECK (suit IN ('cups', 'pentacles', 'swords', 'wands')),
  keywords TEXT[] NOT NULL,
  meaning TEXT NOT NULL,
  interpretation TEXT NOT NULL,
  designer VARCHAR(100),
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_cards_suit ON cards(suit);
CREATE INDEX idx_cards_arcana ON cards(arcana);
CREATE INDEX idx_cards_designer ON cards(designer);

-- Create readings table
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id VARCHAR(255),
  card_ids INTEGER[] NOT NULL,
  user_question TEXT,
  interpretation TEXT NOT NULL,
  overall_message TEXT,
  reading_type VARCHAR(50) DEFAULT 'single',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for readings
CREATE INDEX idx_readings_user_id ON readings(user_id);
CREATE INDEX idx_readings_session_id ON readings(session_id);
CREATE INDEX idx_readings_created_at ON readings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own readings
CREATE POLICY "Users can view own readings"
  ON readings FOR SELECT
  USING (
    auth.uid() = user_id 
    OR session_id = current_setting('request.jwt.claims', true)::json->>'session_id'
  );

-- RLS Policy: Users can insert their own readings
CREATE POLICY "Users can insert own readings"
  ON readings FOR INSERT
  WITH CHECK (
    auth.uid() = user_id 
    OR session_id IS NOT NULL
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to cards table
CREATE TRIGGER update_cards_updated_at 
  BEFORE UPDATE ON cards 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

---

## Step 3: Migration Script

Create `/scripts/migrate-cards-to-supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { tarotCards } from '../src/app/data/tarot-cards';
import { getCardImage } from '../src/app/data/tarot-cards';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateCards() {
  console.log('Starting card migration...');
  console.log(`Total cards to migrate: ${tarotCards.length}`);

  const cardsData = tarotCards.map((card) => ({
    id: card.id,
    name: card.name,
    arcana: card.arcana,
    suit: card.suit || null,
    keywords: card.keywords,
    meaning: card.meaning,
    interpretation: card.interpretation,
    designer: card.designer,
    image_url: getCardImage(card.id),
  }));

  // Insert cards in batches of 10
  const batchSize = 10;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < cardsData.length; i += batchSize) {
    const batch = cardsData.slice(i, i + batchSize);

    const { data, error } = await supabase
      .from('cards')
      .insert(batch)
      .select();

    if (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      errorCount += batch.length;
    } else {
      successCount += data.length;
      console.log(`✓ Migrated batch ${i / batchSize + 1}: ${data.length} cards`);
    }
  }

  console.log('\n=== Migration Complete ===');
  console.log(`✓ Success: ${successCount} cards`);
  console.log(`✗ Errors: ${errorCount} cards`);
}

// Run migration
migrateCards()
  .then(() => {
    console.log('Migration finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
```

---

## Step 4: Run Migration

```bash
# Install Supabase client
pnpm add @supabase/supabase-js

# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_KEY="eyJhbGc..."

# Run migration script
npx tsx scripts/migrate-cards-to-supabase.ts
```

---

## Step 5: Verify Migration

Run this SQL query in Supabase SQL Editor:

```sql
-- Check total cards
SELECT COUNT(*) as total_cards FROM cards;
-- Expected: 78

-- Check Major Arcana
SELECT COUNT(*) as major_arcana FROM cards WHERE arcana = 'major';
-- Expected: 22

-- Check each suit
SELECT suit, COUNT(*) as count 
FROM cards 
WHERE arcana = 'minor' 
GROUP BY suit 
ORDER BY suit;
-- Expected: 14 cards per suit (cups, pentacles, swords, wands)

-- Check cards with designers
SELECT COUNT(*) as designed_cards FROM cards WHERE designer IS NOT NULL;

-- Sample data
SELECT id, name, arcana, suit, designer 
FROM cards 
ORDER BY id 
LIMIT 10;
```

---

## Step 6: Update Frontend to Use Supabase

### Install Supabase Client

```bash
pnpm add @supabase/supabase-js
```

### Create Supabase Client

```typescript
// /src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Fetch Cards from Database

```typescript
// /src/app/lib/cards.ts
import { supabase } from './supabase';
import type { TarotCard } from '../data/tarot-cards';

export async function fetchAllCards(): Promise<TarotCard[]> {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }

  return data.map((card) => ({
    id: card.id,
    name: card.name,
    arcana: card.arcana,
    suit: card.suit,
    keywords: card.keywords,
    meaning: card.meaning,
    interpretation: card.interpretation,
    designer: card.designer,
  }));
}

export async function fetchCardById(id: number): Promise<TarotCard | null> {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching card:', error);
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    arcana: data.arcana,
    suit: data.suit,
    keywords: data.keywords,
    meaning: data.meaning,
    interpretation: data.interpretation,
    designer: data.designer,
  };
}
```

### Update Components to Use Database

```typescript
// /src/app/pages/BrowsePage.tsx
import { useEffect, useState } from 'react';
import { fetchAllCards } from '../lib/cards';
import type { TarotCard } from '../data/tarot-cards';

export function BrowsePage() {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCards()
      .then(setCards)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading cards...</div>;
  }

  // ... rest of component
}
```

---

## Step 7: Environment Variables

Update `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... # Server-side only

# OpenAI (for future AI features)
OPENAI_API_KEY=sk-proj-...
```

Add to `.gitignore`:
```
.env.local
```

---

## Rollback Plan

If migration fails or causes issues:

1. **Keep static data**: The original `tarot-cards.ts` file remains untouched
2. **Revert frontend changes**: Remove Supabase client calls, restore static imports
3. **Delete database data**: Run `DELETE FROM cards;` in Supabase

---

## Post-Migration Checklist

- [ ] All 78 cards successfully migrated
- [ ] Card data matches original TypeScript file
- [ ] Images display correctly (verify image URLs)
- [ ] Designer names preserved
- [ ] Frontend fetches cards from database
- [ ] Browse page loads correctly
- [ ] Card detail page works
- [ ] Reading page functions normally
- [ ] No console errors

---

## Next Steps After Migration

1. **Test thoroughly** across all pages
2. **Monitor Supabase usage** (check dashboard)
3. **Implement caching** for better performance
4. **Add reading history** endpoint
5. **Integrate AI interpretations**

---

**Last Updated**: April 21, 2026
