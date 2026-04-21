# API Implementation Examples

Quick reference code snippets for implementing the backend.

## Table of Contents
1. [Serverless Function Setup](#serverless-function-setup)
2. [Generate Reading Endpoint](#generate-reading-endpoint)
3. [Save Reading Endpoint](#save-reading-endpoint)
4. [History Endpoint](#history-endpoint)
5. [Frontend Integration](#frontend-integration)

---

## Serverless Function Setup

### Vercel Functions Structure
```
/api
  /generate-reading.ts
  /save-reading.ts
  /history.ts
  /lib
    /openai.ts
    /supabase.ts
    /validation.ts
```

### Environment Setup
```typescript
// /api/lib/config.ts
export const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: 'gpt-4-turbo',
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey: process.env.SUPABASE_SERVICE_KEY!,
  },
};
```

---

## Generate Reading Endpoint

### `/api/generate-reading.ts`

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { generateInterpretation } from './lib/openai';
import { getCardById } from './lib/supabase';

// Request validation schema
const ReadingRequestSchema = z.object({
  cardIds: z.array(z.number().min(0).max(77)).min(1).max(1),
  userQuestion: z.string().max(500).optional(),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request body
    const { cardIds, userQuestion } = ReadingRequestSchema.parse(req.body);

    // Fetch card data
    const cardId = cardIds[0];
    const card = await getCardById(cardId);

    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    // Generate AI interpretation
    const interpretation = await generateInterpretation(
      card.name,
      card.meaning,
      userQuestion
    );

    // Return response
    return res.status(200).json({
      success: true,
      reading: {
        id: crypto.randomUUID(),
        cards: [
          {
            id: card.id,
            name: card.name,
            suit: card.suit,
            interpretation,
          },
        ],
        overallMessage: interpretation,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error generating reading:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to generate reading',
    });
  }
}
```

### OpenAI Integration

```typescript
// /api/lib/openai.ts
import OpenAI from 'openai';
import { config } from './config';

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
});

export const TAROT_SYSTEM_PROMPT = `You are a mystical tarot reader and reflective guide.

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

Tone: Calm, wise, compassionate, mystical`;

export async function generateInterpretation(
  cardName: string,
  cardMeaning: string,
  userQuestion?: string
): Promise<string> {
  const userPrompt = userQuestion
    ? `The querent asks: "${userQuestion}"\n\nCard drawn: ${cardName}\nTraditional meaning: ${cardMeaning}\n\nProvide a personalized interpretation.`
    : `Card drawn: ${cardName}\nTraditional meaning: ${cardMeaning}\n\nProvide a general interpretation for reflection.`;

  try {
    const completion = await openai.chat.completions.create({
      model: config.openai.model,
      messages: [
        { role: 'system', content: TAROT_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 300,
    });

    return completion.choices[0].message.content || 'No interpretation generated.';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate interpretation');
  }
}
```

---

## Save Reading Endpoint

### `/api/save-reading.ts`

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { saveReading } from './lib/supabase';

const SaveReadingSchema = z.object({
  cardIds: z.array(z.number()),
  interpretation: z.string(),
  userQuestion: z.string().optional(),
  sessionId: z.string().optional(),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = SaveReadingSchema.parse(req.body);

    const readingId = await saveReading({
      cardIds: data.cardIds,
      interpretation: data.interpretation,
      userQuestion: data.userQuestion,
      sessionId: data.sessionId || req.headers['x-session-id'] as string,
    });

    return res.status(200).json({
      success: true,
      readingId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error saving reading:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to save reading',
    });
  }
}
```

### Supabase Integration

```typescript
// /api/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { config } from './config';

const supabase = createClient(
  config.supabase.url,
  config.supabase.serviceKey
);

export async function getCardById(cardId: number) {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', cardId)
    .single();

  if (error) throw error;
  return data;
}

export async function saveReading(reading: {
  cardIds: number[];
  interpretation: string;
  userQuestion?: string;
  sessionId?: string;
}) {
  const { data, error } = await supabase
    .from('readings')
    .insert([
      {
        card_ids: reading.cardIds,
        interpretation: reading.interpretation,
        user_question: reading.userQuestion,
        session_id: reading.sessionId,
      },
    ])
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

export async function getReadingHistory(sessionId: string, limit = 20) {
  const { data, error } = await supabase
    .from('readings')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
```

---

## History Endpoint

### `/api/history.ts`

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { getReadingHistory } from './lib/supabase';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sessionId = req.headers['x-session-id'] as string;
    const limit = parseInt(req.query.limit as string) || 20;

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID required' });
    }

    const readings = await getReadingHistory(sessionId, limit);

    return res.status(200).json({
      success: true,
      readings,
      total: readings.length,
      hasMore: readings.length === limit,
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch reading history',
    });
  }
}
```

---

## Frontend Integration

### Session Management

```typescript
// /src/app/lib/session.ts
export function getSessionId(): string {
  let sessionId = localStorage.getItem('tarot-session-id');
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('tarot-session-id', sessionId);
  }
  
  return sessionId;
}
```

### API Client

```typescript
// /src/app/lib/api.ts
const API_BASE = '/api';

export async function generateReading(
  cardIds: number[],
  userQuestion?: string
) {
  const response = await fetch(`${API_BASE}/generate-reading`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Id': getSessionId(),
    },
    body: JSON.stringify({ cardIds, userQuestion }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate reading');
  }

  return response.json();
}

export async function saveReading(
  cardIds: number[],
  interpretation: string,
  userQuestion?: string
) {
  const response = await fetch(`${API_BASE}/save-reading`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Session-Id': getSessionId(),
    },
    body: JSON.stringify({ cardIds, interpretation, userQuestion }),
  });

  if (!response.ok) {
    throw new Error('Failed to save reading');
  }

  return response.json();
}

export async function getReadingHistory(limit = 20) {
  const response = await fetch(`${API_BASE}/history?limit=${limit}`, {
    headers: {
      'X-Session-Id': getSessionId(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  return response.json();
}
```

### React Hook for AI Reading

```typescript
// /src/app/hooks/useAIReading.ts
import { useState } from 'react';
import { generateReading } from '../lib/api';

export function useAIReading() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (cardIds: number[], userQuestion?: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateReading(cardIds, userQuestion);
      return result.reading;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
}
```

### Usage in Component

```typescript
// /src/app/pages/ReadingPage.tsx
import { useAIReading } from '../hooks/useAIReading';

export function ReadingPage() {
  const { generate, loading, error } = useAIReading();

  const handleCardSelect = async (cardId: number) => {
    try {
      const reading = await generate([cardId]);
      // Display AI-generated interpretation
      setInterpretation(reading.cards[0].interpretation);
    } catch (err) {
      console.error('Failed to generate reading:', err);
    }
  };

  return (
    // ... component JSX
  );
}
```

---

## Testing

### Test Generate Reading Endpoint

```bash
curl -X POST http://localhost:3000/api/generate-reading \
  -H "Content-Type: application/json" \
  -H "X-Session-Id: test-session-123" \
  -d '{
    "cardIds": [0],
    "userQuestion": "What should I focus on today?"
  }'
```

### Test Save Reading Endpoint

```bash
curl -X POST http://localhost:3000/api/save-reading \
  -H "Content-Type: application/json" \
  -H "X-Session-Id: test-session-123" \
  -d '{
    "cardIds": [0],
    "interpretation": "The Fool appears to guide you...",
    "userQuestion": "What should I focus on?"
  }'
```

### Test History Endpoint

```bash
curl http://localhost:3000/api/history?limit=10 \
  -H "X-Session-Id: test-session-123"
```

---

## Error Handling Best Practices

```typescript
// Centralized error handler
export function handleAPIError(error: unknown) {
  if (error instanceof z.ZodError) {
    return {
      status: 400,
      message: 'Invalid request',
      details: error.errors,
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
    };
  }

  return {
    status: 500,
    message: 'An unexpected error occurred',
  };
}
```

---

**Last Updated**: April 21, 2026
