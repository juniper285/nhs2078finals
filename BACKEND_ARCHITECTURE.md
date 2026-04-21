# Backend Architecture Specification
## Tarot AI + Reading History System

**Version:** 1.0  
**Last Updated:** April 21, 2026  
**Status:** Planning / Not Implemented

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [API Specification](#api-specification)
5. [Database Schema](#database-schema)
6. [AI Integration](#ai-integration)
7. [Data Flow](#data-flow)
8. [Security & Authentication](#security--authentication)
9. [Implementation Phases](#implementation-phases)
10. [Scalability Considerations](#scalability-considerations)

---

## Overview

### Current State
The tarot application currently operates as a **client-side only** React application with:
- Static card data (78 cards with predefined meanings)
- No AI-generated interpretations
- No reading history persistence
- No user accounts

### Future State
A **serverless backend architecture** that enables:
- AI-generated, context-aware tarot interpretations
- Persistent reading history storage
- User authentication (optional)
- Analytics and personalization

### Design Principles
- **Serverless-first**: No server management, auto-scaling
- **Stateless APIs**: Each request is independent
- **Separation of Concerns**: Frontend, API, AI, Database are distinct layers
- **Progressive Enhancement**: Features can be added incrementally
- **Performance**: Sub-second response times for tarot readings

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   React Frontend (Vercel/Netlify)                    │  │
│  │   - Tarot grid UI                                    │  │
│  │   - Card animations                                  │  │
│  │   - Reading history display                          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                          API LAYER                           │
│                   (Serverless Functions)                     │
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │ /api/generate- │  │ /api/save-     │  │ /api/history │  │
│  │ reading        │  │ reading        │  │              │  │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
│                                                              │
│  ┌────────────────┐                                         │
│  │ /api/cards     │                                         │
│  └────────────────┘                                         │
└─────────────────────────────────────────────────────────────┘
           │                         │
           ▼                         ▼
┌──────────────────────┐   ┌─────────────────────────┐
│    AI SERVICE        │   │    DATABASE LAYER       │
│                      │   │                         │
│  ┌────────────────┐ │   │  ┌──────────────────┐  │
│  │  OpenAI API    │ │   │  │   Supabase       │  │
│  │  GPT-4         │ │   │  │   PostgreSQL     │  │
│  └────────────────┘ │   │  │                  │  │
│                      │   │  │  Tables:         │  │
│  Context-aware       │   │  │  - cards         │  │
│  interpretation      │   │  │  - readings      │  │
│  generation          │   │  │  - users         │  │
│                      │   │  └──────────────────┘  │
└──────────────────────┘   └─────────────────────────┘
```

---

## Technology Stack

### Frontend (Current)
- **Framework**: React 18.3.1
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Routing**: React Router v7
- **Hosting**: Vercel / Netlify
- **Build Tool**: Vite

### Backend (Proposed)
- **Serverless Functions**: Vercel Functions or Netlify Functions
- **Runtime**: Node.js 20+
- **API Format**: RESTful JSON

### Database (Proposed)
- **Primary Option**: Supabase (PostgreSQL + Real-time + Auth)
- **Alternative**: Firebase Firestore
- **Why Supabase**:
  - PostgreSQL (relational data model)
  - Built-in authentication
  - Real-time subscriptions
  - Row-level security
  - RESTful auto-generated API
  - Free tier: 500MB database, 2GB file storage

### AI Service (Proposed)
- **Primary**: OpenAI API (GPT-4 or GPT-4-turbo)
- **Alternative**: Anthropic Claude API
- **Prompt Engineering**: Custom system prompts for tarot interpretation style

### Authentication (Future)
- **Provider**: Supabase Auth
- **Methods**: Email/password, Magic links, OAuth (Google, GitHub)
- **Session**: JWT tokens

---

## API Specification

### Base URL
```
Production: https://cosmic-tarot.vercel.app/api
Development: http://localhost:3000/api
```

### Endpoints

#### 1. Generate Reading

**Endpoint**: `POST /api/generate-reading`

**Description**: Generates an AI-powered tarot interpretation for selected card(s)

**Request Body**:
```json
{
  "cardIds": [0],
  "userQuestion": "What should I focus on today?",
  "readingType": "single" // or "three-card", "celtic-cross"
}
```

**Response**:
```json
{
  "success": true,
  "reading": {
    "id": "uuid-v4",
    "cards": [
      {
        "id": 0,
        "name": "The Fool",
        "suit": "major",
        "interpretation": "Today calls for a leap of faith..."
      }
    ],
    "overallMessage": "Your reading suggests...",
    "timestamp": "2026-04-21T10:30:00Z"
  }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "AI service unavailable",
  "message": "Please try again later"
}
```

**Status Codes**:
- `200`: Success
- `400`: Invalid request (missing cardIds)
- `429`: Rate limit exceeded
- `500`: Server error
- `503`: AI service unavailable

---

#### 2. Save Reading

**Endpoint**: `POST /api/save-reading`

**Description**: Saves a tarot reading to the database

**Request Body**:
```json
{
  "cardIds": [0],
  "interpretation": "AI-generated text...",
  "userQuestion": "What should I focus on?",
  "userId": "optional-user-id"
}
```

**Response**:
```json
{
  "success": true,
  "readingId": "uuid-v4",
  "timestamp": "2026-04-21T10:30:00Z"
}
```

**Authentication**: Optional (required only if user system is implemented)

---

#### 3. Get Reading History

**Endpoint**: `GET /api/history`

**Description**: Retrieves past readings for a user (or session)

**Query Parameters**:
- `limit` (optional): Number of readings to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)
- `userId` (optional): Filter by user ID

**Response**:
```json
{
  "success": true,
  "readings": [
    {
      "id": "uuid-v4",
      "cardIds": [0, 5, 12],
      "interpretation": "Your reading suggests...",
      "userQuestion": "What should I focus on?",
      "timestamp": "2026-04-21T10:30:00Z"
    }
  ],
  "total": 45,
  "hasMore": true
}
```

---

#### 4. Get Card Metadata

**Endpoint**: `GET /api/cards`

**Description**: Returns all tarot card metadata

**Query Parameters**:
- `suit` (optional): Filter by suit (cups, pentacles, swords, wands)
- `arcana` (optional): Filter by arcana (major, minor)

**Response**:
```json
{
  "success": true,
  "cards": [
    {
      "id": 0,
      "name": "The Fool",
      "arcana": "major",
      "keywords": ["New beginnings", "Innocence", "Adventure"],
      "meaning": "The Fool represents new beginnings...",
      "designer": "Chloe",
      "image": "/cards/0fool.jpg"
    }
  ],
  "total": 78
}
```

**Note**: This endpoint may not be necessary if card data remains static in the frontend. Consider implementing only if cards need to be managed via CMS.

---

## Database Schema

### Supabase PostgreSQL Schema

#### Table: `cards`

```sql
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

-- Index for faster filtering
CREATE INDEX idx_cards_suit ON cards(suit);
CREATE INDEX idx_cards_arcana ON cards(arcana);
```

**Sample Data**:
```sql
INSERT INTO cards (id, name, arcana, keywords, meaning, interpretation, designer, image_url)
VALUES (
  0,
  'The Fool',
  'major',
  ARRAY['New beginnings', 'Innocence', 'Adventure', 'Freedom'],
  'The Fool represents new beginnings, having faith in the future...',
  'You stand at the edge of a new journey...',
  'Chloe',
  '/cards/0fool.jpg'
);
```

---

#### Table: `readings`

```sql
CREATE TABLE readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id VARCHAR(255), -- For anonymous users
  card_ids INTEGER[] NOT NULL,
  user_question TEXT,
  interpretation TEXT NOT NULL,
  overall_message TEXT,
  reading_type VARCHAR(50) DEFAULT 'single',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_readings_user_id ON readings(user_id);
CREATE INDEX idx_readings_session_id ON readings(session_id);
CREATE INDEX idx_readings_created_at ON readings(created_at DESC);
```

**Sample Data**:
```sql
INSERT INTO readings (user_id, card_ids, user_question, interpretation, overall_message)
VALUES (
  'user-uuid',
  ARRAY[0],
  'What should I focus on today?',
  'The Fool appears to guide you toward...',
  'Today calls for courage and new beginnings.'
);
```

---

#### Table: `users` (Future)

```sql
-- This table is auto-created by Supabase Auth
-- Extended with custom fields:

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(100),
  favorite_cards INTEGER[],
  reading_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

#### Row-Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

-- Users can only read their own readings
CREATE POLICY "Users can view own readings"
  ON readings FOR SELECT
  USING (
    auth.uid() = user_id 
    OR session_id = current_setting('request.jwt.claims')::json->>'session_id'
  );

-- Users can insert their own readings
CREATE POLICY "Users can insert own readings"
  ON readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

---

## AI Integration

### OpenAI GPT-4 Integration

#### Configuration

```typescript
// /api/lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const TAROT_SYSTEM_PROMPT = `
You are a mystical tarot reader and reflective guide.

Your interpretations should be:
- Introspective and journaling-friendly
- Empowering, not prescriptive
- Poetic yet grounded
- Personal and intimate in tone

Format:
- 2-3 paragraphs
- Use "you" to address the querent
- Blend card symbolism with practical insight
- End with a reflective question or affirmation

Tone: Calm, wise, compassionate, mystical
`;
```

#### Interpretation Generation

```typescript
export async function generateInterpretation(
  cardName: string,
  cardMeaning: string,
  userQuestion?: string
): Promise<string> {
  const userPrompt = userQuestion
    ? `The querent asks: "${userQuestion}"\n\nCard drawn: ${cardName}\nTraditional meaning: ${cardMeaning}\n\nProvide a personalized interpretation.`
    : `Card drawn: ${cardName}\nTraditional meaning: ${cardMeaning}\n\nProvide a general interpretation for reflection.`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: TAROT_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.8,
    max_tokens: 300,
  });

  return completion.choices[0].message.content || '';
}
```

#### Cost Estimation

**OpenAI Pricing** (as of 2026):
- GPT-4 Turbo: ~$0.01 per 1K input tokens, ~$0.03 per 1K output tokens
- Average reading: ~150 input tokens + 250 output tokens
- **Cost per reading**: ~$0.009 (~1 cent)

**Monthly estimate**:
- 1000 readings/month = ~$9
- 10,000 readings/month = ~$90

**Optimization**:
- Cache common interpretations
- Use GPT-3.5 for simpler readings (~10x cheaper)
- Implement rate limiting

---

## Data Flow

### Flow 1: Single Card Reading (AI-Generated)

```
User Interaction Flow:
┌──────────────────────────────────────────────────────────┐
│ 1. User selects card from shuffled grid                 │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 2. Frontend sends POST /api/generate-reading             │
│    Payload: { cardIds: [0], userQuestion: "..." }       │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 3. API Function:                                         │
│    a. Fetch card metadata from database/static data     │
│    b. Build AI prompt with card + user question         │
│    c. Call OpenAI API                                   │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 4. OpenAI returns interpretation text                   │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 5. API saves reading to database (optional)             │
│    INSERT INTO readings (card_ids, interpretation, ...)  │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 6. API returns JSON response to frontend                │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 7. Frontend displays:                                    │
│    - 3D card flip animation                             │
│    - AI-generated interpretation panel                  │
└──────────────────────────────────────────────────────────┘
```

### Flow 2: Reading History Retrieval

```
┌──────────────────────────────────────────────────────────┐
│ 1. User navigates to "My Readings" page                 │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 2. Frontend sends GET /api/history?limit=20              │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 3. API queries database:                                 │
│    SELECT * FROM readings                                │
│    WHERE user_id = $1 OR session_id = $2               │
│    ORDER BY created_at DESC LIMIT 20                    │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 4. API returns chronological list of past readings      │
└──────────────────────────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────┐
│ 5. Frontend displays reading history with timestamps    │
└──────────────────────────────────────────────────────────┘
```

---

## Security & Authentication

### Current State
- No authentication
- No user accounts
- All data client-side

### Future State

#### Phase 1: Anonymous Sessions
- Use browser `localStorage` or session cookies
- Generate unique session IDs
- Store readings tied to session (not user)
- **Pro**: No login required
- **Con**: Readings lost if cookies cleared

#### Phase 2: Optional User Accounts
- Supabase Auth integration
- Email/password or magic link login
- **Pro**: Persistent history across devices
- **Con**: Adds complexity

### API Security

#### Rate Limiting
```typescript
// Vercel Edge Config or Redis
const rateLimit = {
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per IP
};
```

#### API Key Protection
```typescript
// Environment variables (never exposed to client)
process.env.OPENAI_API_KEY
process.env.SUPABASE_SERVICE_KEY
```

#### CORS Policy
```typescript
// Only allow requests from production domain
const allowedOrigins = [
  'https://cosmic-tarot.vercel.app',
  'http://localhost:3000' // Dev only
];
```

#### Input Validation
```typescript
// Validate all API inputs
import { z } from 'zod';

const ReadingRequestSchema = z.object({
  cardIds: z.array(z.number().min(0).max(77)).min(1).max(10),
  userQuestion: z.string().max(500).optional(),
});
```

---

## Implementation Phases

### Phase 1: Database Setup (Week 1)
- [ ] Create Supabase project
- [ ] Define database schema (cards, readings)
- [ ] Migrate card data from `tarot-cards.ts` to database
- [ ] Set up Row-Level Security policies
- [ ] Create database indexes

**Deliverable**: Working database with 78 cards

---

### Phase 2: Reading History (Week 2)
- [ ] Create `/api/save-reading` endpoint
- [ ] Create `/api/history` endpoint
- [ ] Implement session-based storage (localStorage)
- [ ] Build "My Readings" page in frontend
- [ ] Add "Save This Reading" button

**Deliverable**: Users can save and view past readings (no AI yet)

---

### Phase 3: AI Integration (Week 3-4)
- [ ] Set up OpenAI API account
- [ ] Create `/api/generate-reading` endpoint
- [ ] Design and test tarot interpretation prompts
- [ ] Implement AI response caching (optional)
- [ ] Update frontend to call AI endpoint
- [ ] Add loading states and error handling

**Deliverable**: AI-generated interpretations for single-card readings

---

### Phase 4: Enhanced Features (Week 5+)
- [ ] Multi-card spreads (3-card, Celtic Cross)
- [ ] User authentication (optional)
- [ ] Reading analytics (most-drawn cards, etc.)
- [ ] Share reading via URL
- [ ] Export reading as image/PDF

**Deliverable**: Full-featured tarot AI platform

---

## Scalability Considerations

### Performance Targets
- **API Response Time**: < 2 seconds (including AI generation)
- **Database Query Time**: < 100ms
- **Frontend Load Time**: < 1 second

### Optimization Strategies

#### 1. Caching
```typescript
// Cache AI responses for common card combinations
const cacheKey = `reading:${cardId}:${questionHash}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Generate new interpretation
const interpretation = await generateInterpretation(...);

// Cache for 24 hours
await redis.set(cacheKey, JSON.stringify(interpretation), 'EX', 86400);
```

#### 2. Database Indexing
- Index on `created_at` for history queries
- Index on `user_id` and `session_id`
- Consider partitioning `readings` table by date

#### 3. Edge Functions
- Deploy API functions to edge locations (Vercel Edge Functions)
- Reduce latency for global users

#### 4. CDN for Card Images
- Serve card images from CDN (Vercel automatically does this)
- Use WebP format for smaller file sizes

### Cost Projections

**Monthly Cost Estimate** (10,000 readings/month):

| Service | Usage | Cost |
|---------|-------|------|
| Supabase (Free Tier) | 500MB DB, 2GB storage | $0 |
| Vercel (Hobby) | Serverless functions | $0 |
| OpenAI API | 10K readings × $0.009 | $90 |
| **Total** | | **~$90/month** |

**At Scale** (100,000 readings/month):
- Supabase Pro: $25/month
- Vercel Pro: $20/month
- OpenAI API: $900/month
- **Total**: ~$945/month

---

## Environment Variables

Create `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... # Server-side only

# OpenAI
OPENAI_API_KEY=sk-proj-...

# App Config
NEXT_PUBLIC_APP_URL=https://cosmic-tarot.vercel.app
NODE_ENV=production
```

---

## Next Steps

1. **Review this specification** with the team
2. **Prioritize features** (AI first vs. history first?)
3. **Set up Supabase project** and create database schema
4. **Create API scaffolding** (start with `/api/save-reading`)
5. **Integrate incrementally** - one feature at a time

---

## References

- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [React Router Documentation](https://reactrouter.com)

---

**Document Status**: Draft  
**Last Updated**: April 21, 2026  
**Next Review**: Before Phase 1 implementation
