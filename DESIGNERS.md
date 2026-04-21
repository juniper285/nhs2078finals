# Designer Attribution Guide

All 78 cards currently have `designer: null` and are marked as **Available ✧**

## How to Assign Designers

Edit `src/app/data/tarot-cards.ts` and update the `designer` field for each card.

### Example

```typescript
{
  id: 0,
  name: 'The Fool',
  arcana: 'major',
  keywords: ['New beginnings', 'Innocence', 'Adventure', 'Freedom'],
  meaning: '...',
  interpretation: '...',
  designer: 'Chloe'  // ← Change from null to name in Title Case
},
```

### Naming Conventions

Use **Title Case** for consistency:
- ✅ "Chloe"
- ✅ "E Xun"
- ✅ "Jo Ee"
- ✅ "Leng Sang"
- ❌ "chloe"
- ❌ "e xun"

## Visual Indicators

### Available Cards (designer: null)
- 70% opacity
- Dashed border
- "Available ✧" badge on hover
- White glow on hover

### Claimed Cards (designer: "Name")
- Full opacity
- Solid purple border
- Designer name shown on hover
- Purple glow on hover

## Browse Page Filters

Users can filter cards by:
- **All** - Shows all 78 cards
- **Available ✧** - Shows only unclaimed cards
- **Designed ✦** - Shows only cards with a designer

Current status is displayed at the top:
"X designed · Y available"

## Where Designer Names Appear

1. **Card hover** (grid/browse) - Small badge at bottom-left
2. **Reading page** - Below card name with "✦ Designed by [Name]"
3. **Card detail page** - Below card name with "✦ Designed by [Name]"
4. **Browse page** - Under each card thumbnail

## Quick Assign Template

Find the card by ID in `tarot-cards.ts` and change:

```typescript
designer: null
```

to:

```typescript
designer: "Artist Name"
```

Card IDs:
- 0-21: Major Arcana
- 22-35: Cups (Ace through King)
- 36-49: Pentacles (Ace through King)
- 50-63: Swords (Ace through King)
- 64-77: Wands (Ace through King)
