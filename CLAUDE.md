# H1BFounders Website Project
**Project Lead**: ATLAS (Direct management)
**CPTO**: NEXUS (Chief Product & Technology Officer - Claude)
**Start Date**: September 6, 2025
**Status**: Active

## NEXUS: My Role as CPTO
As Chief Product & Technology Officer, I (NEXUS) make critical product decisions with security-first mindset:
- **Product Strategy**: Protect member privacy, prevent scraping, think like a founder
- **Technical Architecture**: Scale-aware, security-conscious, performance-optimized
- **Community Protection**: Hide sensitive metrics, gate valuable data, prevent abuse
- **Growth Decisions**: Balance openness for SEO with protection for members
- **Key Principles**: 
  - Never expose exact member counts (attracts scrapers)
  - Network directory always behind auth (protect members)
  - Think like a PM: "Will this decision hurt us in 6 months?"
  - Security > Features > Convenience

## Project Vision
Transform H1BFounders from WhatsApp community to scalable platform with clear value proposition.

## Community Scale (September 2025)
- **WhatsApp**: 781 members
- **Substack**: 600+ subscribers
- **Slack**: Active community
- **Total Reach**: ~1,400+ H1B founders
- **Growth**: From 0 to 1,400 in 6 months

## Context Sources (to be added)
- [ ] WhatsApp chat history (March 2024 - present)
- [ ] Viral LinkedIn post that started it all
- [ ] Substack content
- [ ] Call transcripts
- [ ] Coaching materials
- [ ] Community feedback patterns

## Project Structure
```
/h1founders/
├── CLAUDE.md (this file - project memory)
├── next_session.md (session bootstrap - KEEP IN ROOT ONLY)
├── client/ (React app)
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── docs/
│   ├── rfc001_founder_directory.md
│   ├── rfc002_tools_resources.md
│   ├── rfc003_authentication.md
│   ├── rfc004_design_system.md
│   ├── rfc005_platform_architecture.md
│   └── rfc006_optimization.md
└── context/ (planned)
    ├── whatsapp-history/
    ├── substack-content/
    └── coaching-materials/
```

## Platform Architecture
Current implementation features 6 main sections:
- **Forum**: Matrix-themed discussion forum with badge progression (NEW)
- **Tools**: Visa Timeline Calculator, EB1A Points Calculator
- **Resources**: Investment guides, visa information, legal resources  
- **Stories**: Success narratives from community members
- **Events**: Office hours, networking, educational content
- **Network**: Founder directory (781+ members from WhatsApp)

**Design Theme**: Matrix terminal aesthetic with green text on black background
**Current Version**: v0.5.0 (Forum System Implemented)
**Live Status**: Functional prototype with forum, awaiting Firebase backend

## Technical Stack
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Package Manager**: Bun (faster than npm/yarn)
- **Deployment**: Cloudflare Pages (planned)
- **Authentication**: Firebase Auth (planned for v0.5.0)
- **Data Management**: JSON files for content, local state
- **Build Target**: Modern ES modules, phone-first responsive

## Important Conventions
1. **next_session.md**: Always keep in root folder ONLY (not in docs/)
2. **RFCs**: Active in docs/, completed in docs/rfc/archive/
3. **PRFAQs**: Numbered as prfaq001, prfaq002, etc.
4. **Partnership features**: Behind VITE_ENABLE_PARTNERSHIPS flag

## Key Design Decisions
1. **Phone-first Authentication**: H1B founders primarily use WhatsApp on mobile
2. **Pre-populate Directory**: Import existing 781 WhatsApp members as foundation
3. **No Passwords Strategy**: Phone verification → immediate access (like WhatsApp)
4. **Matrix Theme**: Appeals to technical founder audience, creates memorable brand
5. **Content-First Approach**: 36+ pieces of valuable content before asking for anything
6. **Tool Integration**: Calculators and resources embedded in narrative flow

## Key Questions to Answer
1. What transformation are we selling? (Not just community)
2. Who is the ideal member? (Beyond "H1B founder")
3. What's the measurable outcome?
4. Why now? What's the urgency?
5. What's the moat? Why can't others replicate?

## Success Metrics
**Achieved (v0.6.0 - September 9, 2025)**:
- ✅ **Firebase Phone Authentication**: End-to-end SMS verification working
- ✅ **Automated Test Suite**: 10 critical path tests (6.2s execution)
- ✅ **Member Directory Structure**: Ready for 781 WhatsApp member import
- ✅ **Security**: Phone validation, rate limiting, proper Firestore rules
- Matrix Forum System with 7-level badge progression
- 36+ content pieces created across all sections
- 2 functional tools (Visa Timeline Calculator, EB1A Points Calculator)  
- 6-section platform architecture live
- Mobile-first responsive design
- Forum with voting, replies, search functionality

**Planned**:
- Import 781 WhatsApp members to member directory
- Build MVP member directory UI components
- Bundle size optimization (currently 1.27MB)
- Clear value prop in 10 seconds
- Community → Customer journey mapped

## Testing Strategy (Alpha Phase)

**Philosophy**: Test critical paths only - UX/app in flux, avoid test maintenance overhead

**Current Test Suite**:
- **Phone Authentication**: 10 automated tests covering complete auth flow
- **Execution**: 6.2 seconds, all platforms
- **Coverage**: Login, logout, validation, error handling, UI states

**Test Commands**:
```bash
# Run auth tests only (critical path)
npm run test:auth

# View detailed results
npx playwright show-report

# Debug mode (see browser)
npm run test:auth:debug
```

**Testing Principles**:
1. **Alpha = Critical Paths Only** - Don't test UI that changes frequently
2. **Focus on Business Logic** - Auth, payments, data flows
3. **Avoid UI Testing** - Colors, copy, layouts change too much
4. **Test User Journeys** - Complete flows, not isolated components
5. **Keep Tests Fast** - <10 seconds total execution time

**When to Add New Tests**:
- ✅ New authentication methods (Google, email)
- ✅ Payment/subscription flows (Club H1)
- ✅ Critical user actions (member directory search)
- ❌ Visual/copy changes
- ❌ Feature flags or A/B tests
- ❌ Complex UI interactions (modals, dropdowns)

## Next Phase
Current focus on **Member Directory Launch**
- Import 781 WhatsApp members to Firestore
- Build MVP member directory UI components
- Bundle size optimization (1.27MB → <300KB)
- Test with real phone numbers
- Cloudflare Pages deployment

## Original Next Steps (Completed)
1. ✅ Load all context materials
2. ✅ Extract patterns from WhatsApp history  
3. ✅ Identify core transformation stories
4. ✅ Define website architecture
5. ✅ Create compelling copy

---
*Created by ATLAS - September 6, 2025*