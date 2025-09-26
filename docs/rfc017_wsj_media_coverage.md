# RFC 017: WSJ Media Coverage Integration
**Status**: URGENT - IMPLEMENT NOW
**Created**: September 26, 2025
**Owner**: NEXUS

## Context
WSJ article just dropped featuring Sid and Manisha prominently. Need to capitalize on this credibility IMMEDIATELY.

## Article Details
- **Title**: "The Path to the American Dream Is Narrowing for Indian Tech Workers"
- **Author**: Tripti Lahiri (WSJ South Asia Bureau Chief)
- **Date**: September 26, 2025
- **URL**: https://www.wsj.com/world/india/h1b-visas-india-tech-engineering-834e079a
- **Full PDF**: `/docs/wsj-article-sep26-2025.pdf`

## Key Quotes
1. **Sid Quote**: "H-1B needed reform. But this isn't reform, it's a sledgehammer… this ensures that only companies with the deepest pockets can play."
2. **Platform Mention**: "Puppala works for an AI firm called Trial and Error, where she is developing its community platform H1Founders, set up to help tech immigrants start their own businesses"

## Implementation Requirements

### 1. Homepage Media Banner
**Location**: Above Hero section, below CrisisBanner
**Design**:
- Subtle but prominent - not screaming, but visible
- Dark theme compliant (use theme variables)
- Mobile responsive
- Include WSJ logo/text
- Link to article

### 2. Media Page/Section
**Path**: `/media` or add to existing About section
**Content**:
- WSJ article excerpt with Sid's quote
- Link to full article
- Other media mentions if any
- Position as thought leader

### 3. Tough Love Landing Page Update
**Add "As Featured In WSJ" badge**
- Near the top, builds instant credibility
- Before they even read the pitch

### 4. Email Signature Update
For Manisha/team:
```
As featured in The Wall Street Journal
"The Path to the American Dream Is Narrowing"
```

## Technical Specs
- Use existing theme variables (NO hardcoded colors)
- Component: `MediaBanner.tsx`
- Add to Home.tsx between CrisisBanner and Hero
- Keep it fast - no external image loads
- Text-based WSJ logo or simple SVG

## Copy Options

**Option 1 (Subtle)**:
"AS FEATURED IN THE WALL STREET JOURNAL"

**Option 2 (With Context)**:
"AS FEATURED IN WSJ: 'H1Founders helps tech immigrants start their own businesses'"

**Option 3 (Quote Focus)**:
"'This isn't reform, it's a sledgehammer' - Sid Sarasvati to WSJ"

## Success Metrics
- Increased trust/credibility on landing
- Higher conversion to Tough Love applications
- Social proof for WIN CLUB members

## Timeline
IMPLEMENT TODAY - This is hot news, capitalize while fresh

---
*For NEXUS: This is priority #1. Simple implementation, massive credibility boost.*