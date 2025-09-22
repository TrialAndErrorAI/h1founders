# H1Founders Platform Architecture
**Last Updated**: 2025-09-22
**Version**: 0.7.6 (from package.json)

## Current Technology Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS with Matrix theme (green on black)
- **Build Tool**: Vite (sub-second builds)
- **Package Manager**: Bun (faster than npm/yarn)
- **Bundle Size**: 520KB optimized

### Backend Services
- **Authentication**: Firebase Phone Auth (SMS OTP)
- **Database**: Firestore (NoSQL)
- **Hosting**: Cloudflare Pages (auto-deploy from GitHub)
- **Domain**: h1founders.com (primary), h1bfounders.com (redirect)

### Key Architecture Decisions

#### 1. Phone-First Authentication
**Decision**: Firebase Phone Auth with SMS OTP only
**Rationale**:
- H1B founders primarily use WhatsApp
- Phone numbers are unique identifiers
- No password complexity issues
- 3.3 second smooth flow achieved

#### 2. Client-Side Rendering
**Decision**: React SPA without SSR
**Rationale**:
- Simplicity for MVP
- No SSR complexity needed yet
- Faster development iteration
- Can migrate to Next.js later for SEO

#### 3. Build-Time Content Processing
**Decision**: Markdown files processed at build time to JSON
**Rationale**:
- No runtime processing overhead
- Version controlled content
- Simple content management
- Fast page loads

#### 4. Matrix Design Theme
**Decision**: Terminal aesthetic with green text
**Rationale**:
- Appeals to technical founder audience
- Creates memorable brand
- Differentiates from typical platforms
- Aligns with "unplugging from the system" narrative

#### 5. Firebase over Custom Backend
**Decision**: Firebase for all backend services
**Rationale**:
- Rapid development for MVP
- Built-in security features
- Scalable without infrastructure management
- Real-time capabilities for forum

## Security Architecture

### Authentication Flow
1. User enters phone number
2. Firebase sends SMS with OTP
3. User enters OTP code
4. Firebase verifies and creates session
5. Profile created/updated in Firestore

### Access Control
- **Badge Levels**: 7-level Matrix progression system
- **WhatsApp Members**: Automatically get FREED_MIND badge
- **New Users**: Start at UNPLUGGED level
- **Premium Content**: Gated behind CLUB_H1 membership

### Critical Security Fix (Sept 22, 2025)
- **Issue**: Double reCAPTCHA conflict (v3 + Firebase)
- **Solution**: Removed reCAPTCHA v3, use Firebase's built-in only
- **File**: `/client/src/contexts/AuthContext.tsx` lines 133-167

## Data Architecture

### Firestore Collections
- `members`: User profiles with badge levels
- `forum_threads`: Discussion topics
- `forum_replies`: Thread responses

### Content System
- **Source**: `/content/` directory with markdown files
- **Build Script**: `/scripts/build-content-index.js`
- **Output**: `/client/src/data/contentIndex.json`
- **Types**: STORY, EVENT, GUIDE, TOOL, WISDOM, SUBSTACK, ANNOUNCEMENT

## Deployment Architecture

### Production
- **Primary**: h1founders.com (Cloudflare Pages)
- **Auto-Deploy**: Push to master branch triggers deployment
- **Build Command**: `cd client && bun install && bun run build`
- **Environment**: Production Firebase project

### Local Development
- **Command**: `cd client && bun run dev`
- **Port**: 5173
- **Note**: Firebase auth doesn't work on localhost (domain restriction)

## Performance Metrics

### Current State
- **Bundle Size**: 520KB (59% reduction from 1.27MB)
- **Auth Flow**: 3.3 seconds end-to-end
- **Build Time**: ~1 second with Vite
- **Lighthouse Score**: Not yet measured

### Optimizations Applied
- Tree shaking with Vite
- Dynamic imports for code splitting
- Tailwind CSS purging unused styles
- Image optimization with lazy loading

## Technical Debt

### Immediate (Before Oct 8, 2025)
- Fix Firestore security rules (lines 53-55 too permissive)

### Short Term
- Add error boundaries for better error handling
- Implement proper logging system
- Add performance monitoring
- Set up automated testing pipeline

### Long Term
- Consider SSR for SEO (Next.js migration)
- Implement caching strategy
- Add CDN for static assets
- Set up staging environment

## Architecture Principles

1. **Simplicity First**: Choose boring technology that works
2. **Mobile First**: Optimize for phone users (WhatsApp community)
3. **Security by Default**: Gate content, protect member data
4. **Performance Matters**: Sub-second interactions
5. **Pragmatic Choices**: Ship MVP, iterate based on usage

---
*For current platform status, see CURRENT_STATE.md*
*For future plans, see ROADMAP.md*