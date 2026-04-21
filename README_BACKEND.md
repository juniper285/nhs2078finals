# Backend Implementation Guide

Quick start guide for implementing the tarot AI backend.

---

## 📚 Documentation

This project includes comprehensive backend architecture documentation:

1. **[BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md)** - Complete system design specification
   - System architecture overview
   - Technology stack recommendations
   - API specification
   - Database schema
   - AI integration details
   - Security considerations
   - Implementation phases
   - Cost projections

2. **[docs/API_EXAMPLES.md](./docs/API_EXAMPLES.md)** - Code implementation examples
   - Serverless function setup
   - Complete endpoint implementations
   - OpenAI integration code
   - Supabase integration code
   - Frontend API client
   - React hooks for AI readings
   - Testing examples

3. **[docs/DATABASE_MIGRATION.md](./docs/DATABASE_MIGRATION.md)** - Database setup guide
   - Supabase project creation
   - SQL schema creation
   - Data migration script
   - Frontend integration
   - Verification steps
   - Rollback plan

---

## 🚀 Quick Start

### Current State
✅ Frontend fully functional (client-side only)
- 78 tarot cards with static meanings
- Card browsing by suit
- Single card readings with shuffle
- Designer attribution system
- Responsive design with animations

### To Add Backend Features

#### Phase 1: Reading History (Easiest)
**Time**: ~1 week  
**Cost**: Free (Supabase free tier)

1. Create Supabase project
2. Set up database schema
3. Create `/api/save-reading` endpoint
4. Create `/api/history` endpoint
5. Build "My Readings" page
6. Implement session-based storage

**Result**: Users can save and view past readings

---

#### Phase 2: AI Interpretations (Most Impactful)
**Time**: ~2 weeks  
**Cost**: ~$90/month for 10K readings (OpenAI API)

1. Set up OpenAI API account
2. Create `/api/generate-reading` endpoint
3. Design tarot interpretation prompts
4. Update reading page to call AI
5. Add loading states and error handling

**Result**: Personalized, AI-generated tarot interpretations

---

#### Phase 3: User Accounts (Optional)
**Time**: ~1 week  
**Cost**: Free (Supabase Auth)

1. Enable Supabase Auth
2. Add login/signup UI
3. Update RLS policies
4. Link readings to users

**Result**: Persistent readings across devices

---

## 💰 Cost Breakdown

### Free Tier (Perfect for Starting)
- **Supabase**: 500MB database, 2GB storage, 50K monthly active users
- **Vercel**: Serverless functions, 100GB bandwidth
- **Total**: $0/month

### With AI (10,000 readings/month)
- **Supabase**: $0 (within free tier)
- **Vercel**: $0 (Hobby plan)
- **OpenAI API**: ~$90 (GPT-4 Turbo)
- **Total**: ~$90/month

### At Scale (100,000 readings/month)
- **Supabase Pro**: $25/month
- **Vercel Pro**: $20/month
- **OpenAI API**: ~$900/month
- **Total**: ~$945/month

---

## 🛠️ Technology Stack

### Currently Using
- React 18.3.1
- Tailwind CSS v4
- Motion (animations)
- React Router v7
- Vite (build tool)

### To Add
- **Database**: Supabase (PostgreSQL)
- **Serverless**: Vercel Functions
- **AI**: OpenAI GPT-4 API
- **Auth**: Supabase Auth (optional)
- **Validation**: Zod

---

## 📋 Implementation Checklist

### Pre-Implementation
- [ ] Review [BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md)
- [ ] Decide which features to implement first
- [ ] Set budget for AI costs (if applicable)
- [ ] Create Supabase account
- [ ] Create OpenAI account (if doing AI)

### Phase 1: Database Setup
- [ ] Create Supabase project
- [ ] Run SQL schema from DATABASE_MIGRATION.md
- [ ] Add environment variables to `.env.local`
- [ ] Test database connection
- [ ] (Optional) Migrate card data to database

### Phase 2: Reading History
- [ ] Create `/api/save-reading.ts`
- [ ] Create `/api/history.ts`
- [ ] Add session ID management
- [ ] Build "My Readings" page
- [ ] Test saving and retrieving readings

### Phase 3: AI Integration
- [ ] Set up OpenAI API key
- [ ] Create `/api/generate-reading.ts`
- [ ] Test AI prompt engineering
- [ ] Update reading page UI
- [ ] Add loading and error states
- [ ] Test end-to-end AI flow

### Phase 4: Polish
- [ ] Add rate limiting
- [ ] Implement caching (optional)
- [ ] Add analytics
- [ ] Optimize performance
- [ ] Deploy to production

---

## 🔒 Security Checklist

- [ ] Environment variables never exposed to client
- [ ] API keys stored in `.env.local` (not committed)
- [ ] Input validation with Zod on all endpoints
- [ ] Rate limiting implemented
- [ ] CORS configured for production domain only
- [ ] Supabase RLS policies enabled
- [ ] Session IDs use crypto.randomUUID()

---

## 🧪 Testing Strategy

### Unit Tests
- API endpoint validation
- Database queries
- AI prompt generation

### Integration Tests
- Full reading flow (frontend → API → AI → database)
- Session management
- Error handling

### Manual Testing
- Generate reading with AI
- Save reading to database
- View reading history
- Test edge cases (network errors, invalid input)

---

## 📊 Monitoring

### What to Monitor
- API response times
- OpenAI API costs
- Database query performance
- Error rates
- User sessions

### Tools
- Vercel Analytics (built-in)
- Supabase Dashboard (database metrics)
- OpenAI Usage Dashboard (API costs)

---

## 🚨 Common Issues & Solutions

### Issue: OpenAI API timeout
**Solution**: Increase timeout, add retry logic, show loading state

### Issue: Database slow queries
**Solution**: Add indexes, implement caching, use connection pooling

### Issue: High AI costs
**Solution**: Cache common interpretations, use GPT-3.5 for simpler readings, implement rate limiting

### Issue: Lost session data
**Solution**: Store session ID in localStorage with expiration, add "restore session" flow

---

## 📞 Support Resources

- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Vercel Functions Docs](https://vercel.com/docs/functions)
- [React Router Docs](https://reactrouter.com)

---

## 🎯 Recommended Path

For most projects, we recommend this order:

1. **Week 1**: Set up Supabase, create database schema
2. **Week 2**: Implement reading history (no AI yet)
3. **Week 3**: Add AI interpretations
4. **Week 4**: Polish, test, deploy

This allows you to:
- ✅ Learn the stack incrementally
- ✅ Deliver value early (history without AI)
- ✅ Test with real users before adding costly AI
- ✅ Iterate based on feedback

---

## 🤔 Decision Matrix

| Feature | Complexity | Cost | User Impact |
|---------|-----------|------|-------------|
| Reading History | Low | Free | Medium |
| AI Interpretations | Medium | $90/mo | High |
| User Accounts | Medium | Free | Medium |
| Multi-card Spreads | Low | Same | Medium |
| Reading Analytics | Low | Free | Low |

**Start with**: Reading History + AI Interpretations (highest impact/cost ratio)

---

## 📝 Next Steps

1. **Read** [BACKEND_ARCHITECTURE.md](./BACKEND_ARCHITECTURE.md) for full system design
2. **Review** [docs/API_EXAMPLES.md](./docs/API_EXAMPLES.md) for code examples
3. **Follow** [docs/DATABASE_MIGRATION.md](./docs/DATABASE_MIGRATION.md) to set up database
4. **Decide** which phase to start with
5. **Build** incrementally and test thoroughly

---

**Questions?** Review the documentation files or reach out for clarification.

**Ready to start?** Begin with [docs/DATABASE_MIGRATION.md](./docs/DATABASE_MIGRATION.md)

---

**Last Updated**: April 21, 2026
