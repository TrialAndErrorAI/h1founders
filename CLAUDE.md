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
**Achieved (v0.5.0)**:
- Matrix Forum System with 7-level badge progression
- 36+ content pieces created across all sections
- 2 functional tools (Visa Timeline Calculator, EB1A Points Calculator)  
- 701KB bundle size (needs optimization to <300KB)
- Matrix terminal theme throughout all components
- 6-section platform architecture live
- Mobile-first responsive design
- Forum with voting, replies, search functionality

**Planned**:
- Clear value prop in 10 seconds
- Conversion path defined
- Community → Customer journey mapped
- Pricing strategy validated
- Bundle size under 300KB

## Next Phase
Current focus on **RFC-006: Platform Optimization**
- Bundle size reduction (627KB → <300KB)
- Performance improvements
- Authentication system integration
- WhatsApp member directory import
- Cloudflare Pages deployment

## Original Next Steps (Completed)
1. ✅ Load all context materials
2. ✅ Extract patterns from WhatsApp history  
3. ✅ Identify core transformation stories
4. ✅ Define website architecture
5. ✅ Create compelling copy

---
*Created by ATLAS - September 6, 2025*