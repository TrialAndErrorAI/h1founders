# H1B Founders Platform
**Project Lead**: ATLAS (Direct management)
**Brand**: H1B Founders (the B stays — it's the keyword, the stickiness, the SEO)
**Start Date**: September 6, 2025
**Last Major Renovation**: April 7, 2026

## DOMAIN ARCHITECTURE

- **h1bfounders.com** — Primary domain
- **h1founders.com** — Redirect (useful for verbal sharing)
- **community.h1bfounders.com** — Substack (852+ subscribers)

**Deployment:**
- **Host**: Cloudflare Pages (Ercan's account: `40ad419de279f41e9626e2faf500b6b4`)
- **Auto-deploy**: Every push to master branch
- **Build**: `cd client && bun install && bun run build`

## 🚨 CRITICAL DEPLOYMENT RULES
**Git push to master = AUTO-DEPLOY TO PRODUCTION**
- Every push to master triggers Cloudflare Pages deployment
- Live users are actively using h1bfounders.com
- **NEVER push without Sid's written approval**
- Test EVERYTHING locally first
- Ask "Can I push this?" and wait for explicit "yes" or "push it"

## MISSION: MERITOCRACY WINS

**Core Mission**: Enable the smartest people from anywhere to build in America based on merit, not lottery.

**First Principles** (Sid's philosophy across H1Founders, T&E, and life):
- Merit > Lottery
- Builders > Beggars
- Value creation > Visa games
- Free market > Bureaucracy

**What We're Building**:
Help merit win in immigration by transforming:
- F1 students → Founders before graduation
- OPT workers → O-1 qualified builders
- H1B dependents → Self-sponsoring entrepreneurs
- Anyone with talent → Path to America through VALUE

**The Test**: Are they builders or are they looking for handouts? We help the builders.

**Why This Matters**:
Sid walked from zero to hero in America's meritocracy. Now building the infrastructure for others to walk that same path — if they're willing to build, not beg.

**Strategic Position on H1B Reform (PRIVATE):**
- Sid WANTS H1B reform — it kills the Infosys/WITCH exploitation model
- The $100K fee destroys body shops that abuse the system
- This forces legitimate founders toward BETTER paths (O-1, EB-1A) with actual green card routes
- Public position: "This isn't reform, it's a sledgehammer" — acknowledges bluntness without opposing
- We're not AGAINST reform — we're the bridge to what comes AFTER

## COMMUNITY & METRICS

**Current numbers (source of truth: `client/src/lib/metrics.ts`)**
- **WhatsApp**: 1,081 members across 18 groups. Main group has 999.
- **Substack**: 852+ subscribers at community.h1bfounders.com
- **WIN CLUB MRR**: $1,491/mo (3 OG members at $497/mo)
- **Launch Club**: 4 cohorts complete (C1-C4)

**Key departed/dead:**
- Manisha — departed (was managing First $10K, Start a Business groups)
- FinStackk partnership — dead
- Manifest Labs partnership — dead
- Sarah Corstange — departed

**Update metrics HERE, not scattered in code:**
`/Users/sid/Code/te/h1founders/client/src/lib/metrics.ts` — single source of truth for all numbers + links

## PROGRAMS

### WIN CLUB Coaching ($497/mo)
- 3 OG members: Saurabh, Harshdeep, Khasim (returned Apr 2026 from paternity)
- Friday 30-min sessions
- Database: `data/coaching_crm.db` (at repo root)

### Launch Club ($997 per cohort)
- 4 cohorts complete (C1 Nov 2025, C2 Dec 2025, C3 Jan 2026, C4 Feb 2026)
- Paused Apr 2026. 3-week sprint: entity setup → foundation → attorney handoff
- Intake form: `https://tally.so/r/pbx9Y1`
- WIN CLUB intake: `https://tally.so/r/KYx92V`

### H1B Founders Live (free monthly show)
- Monthly Substack Live. Wednesdays 12 PM ET
- Host + 1 guest, 30-45 min. Audience text chat
- Auto-publishes as podcast (Apple/Spotify) + social clips
- Ep 1: Apr 8, 2026 with Raj (self-sponsorship story)
- 3-person Substack Live limit = CREDITOR architecture. One session → five channels

## PLATFORM ARCHITECTURE (Post-Renovation, Apr 7, 2026)

**5 public pages** — no forum, no badges, no network directory (all killed in Phase 2):
- `/` — Home
- `/programs` — Programs (WIN CLUB + Launch Club)
- `/live` — H1B Founders Live show
- `/join` — Join / community entry
- `/tools/eb1a-qualifier` — EB-1A Qualifier tool

**Legacy redirects kept**: `/offerings`, `/coaching`, `/launch-club` → `/programs`; `/newsletter` → `/join`

**What's GONE** (killed in Phase 2 — do not resurrect without Sid's explicit ask):
- Forum system + badge progression (7 levels, Matrix theme categories)
- Network directory / member directory
- Firebase phone auth / reCAPTCHA flow (no more auth for public pages)
- Admin panel
- WIN CLUB Coach dashboard (`/win-club/coach`)
- Partners page (partnership ecosystem dead)
- Firebase / Firestore (no longer used for public pages)

**EB-1A Qualifier tool** — kept. Lives at `/tools/eb1a-qualifier`.

## TECHNICAL STACK

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Package Manager**: Bun
- **Deployment**: Cloudflare Pages
- **Theme**: Three modes — light, dark, matrix. See `THEMING.md` for full treatment.
- **Content system**: Build-time markdown pipeline still works (`/content/`, `scripts/build-content-index.js`). Not front-and-center but operational.

## THEMING RULES (MANDATORY)

The app has three themes: light, dark, matrix. Theme switching via `ThemeContext`.

**DO:**
```tsx
// Use Tailwind dark: classes for dark mode
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-white">
```

**DON'T:**
```tsx
// Don't use only CSS variables (unclear which theme)
<div className="bg-background">  // AVOID — old pattern

// Don't forget dark: variants
<div className="bg-white">  // INCOMPLETE
```

**Matrix theme** gets BOTH `dark` class + `data-theme="matrix"` attribute. Basic `dark:` styles apply; CSS vars override for green terminal colors.

Key files:
- `client/tailwind.config.js` — `darkMode: 'class'` enabled
- `client/src/contexts/ThemeContext.tsx` — manages both class and attribute
- `client/src/index.css` — CSS variable definitions
- `THEMING.md` — full reference

## DEV MODE WORKFLOW (LOCALHOST ONLY)

No Firebase phone auth on localhost. Dev bypass patterns (if still present in codebase):
- Yellow dev toolbar at top of homepage on localhost
- `localStorage.setItem('h1founders-dev-admin', 'true')` for admin panel (if still live)
- **NEVER ask Sid to use phone auth on localhost**
- **Production**: auth is via Tally forms, not Firebase

## PRIVACY & SECURITY (SACRED — NEVER REPEAT VIOLATIONS)

### NEVER USE REAL USER DATA FOR TESTING
- **NEVER use real phone numbers from bug reports, logs, or docs**
- **NEVER use real emails, names, or any PII for testing**
- **ALWAYS use clearly fake test data**:
  - Phone: 555-xxxx numbers (reserved for fictional use)
  - Email: test@example.com
  - Names: Test User, John Doe
- **User privacy is SACRED** — one violation destroys trust

### DENY BY DEFAULT for any access control
- Start with denial, grant specific exceptions
- Never default to permissive access
- Anonymous users should not access anything behind auth

## TESTING PHILOSOPHY (ALPHA PHASE)

**Test critical paths only — UX/app in flux, avoid test maintenance overhead**

1. **Alpha = Critical Paths Only** — don't test UI that changes frequently
2. **Focus on Business Logic** — auth (if any), payments, data flows
3. **Avoid UI Testing** — colors, copy, layouts change too much
4. **Test User Journeys** — complete flows, not isolated components
5. **Keep Tests Fast** — <10 seconds total execution time

## SID'S AUTHENTIC VOICE GUIDE
**Based on WhatsApp analysis (March 2024 — present)**

### Core Communication Principles

**1. Call Out Misinformation Directly**
- "Let us know where you learned this information. If it's from Quora or online forums, it's useless."
- "This is incorrect information"
- "That's a good question and a common myth. I had this fear as well"

**2. Focus on First Principles & Reality**
- "In my experience, hardest part is actually having a business. Rest all is solvable"
- "Think about what USCIS doesn't want. They don't want scam business which are shell companies"
- "Revenue is what makes your business legit"

**3. Combat Fear with Facts**
- "This kind of language is why most H1B holders are confused. Just avoid using it"
- "So easy to spread fear on immigration and especially H1B. Sigh"

**4. Practical Problem-Solving Mindset**
- Direct and specific — no hedging
- Shares personal failures: "I had this fear as well"
- Provides actionable guidance without asking for anything

**5. Genuine Helping vs Selling**
- Never leads with products/services — always answers questions first
- Only mentions his business (Renovate AI) when directly relevant or asked

**6. Business-First Philosophy**
- "Scammers are the most creative. Just channeling the energy for the wrong cause."
- Focus on legitimate business building, not visa hacks
- Revenue and customers matter more than paperwork

**7. Direct, No-BS Communication Style**
- Short, clear sentences
- Corrects misconceptions immediately and directly
- Uses "sigh" when frustrated with misinformation

### Key Phrases & Patterns
- "That's a good question and a common myth"
- "In my experience..."
- "Think about what USCIS doesn't want"
- "Rest all is solvable"
- "Revenue is what makes your business legit"
- "This is incorrect information"
- "Hardest part is actually having a business"

### Anti-Patterns (What Sid Never Does)
- Never leads with selling his services
- Never dismisses questions as stupid
- Never creates unnecessary fear or complexity
- Never uses technical jargon without explanation
- Never promises guarantees about immigration outcomes
- Never badmouths specific lawyers or competitors

**Voice Essence**: A successful founder who genuinely wants to help others avoid the misinformation and fear-mongering that plagued his own journey. Direct, practical, always business-first.

### Content Tone (CREDITOR positioning)
- "Take your time" — no urgency
- "DM me when ready" — soft CTA
- "Links don't expire" — abundance mindset
- NEVER: "Limited spots!" or "Act now!" or fake scarcity

## FILE STRUCTURE (Current Reality)

```
/h1founders/
├── CLAUDE.md          (this file — WHO I am)
├── MEMORY.md          (WHAT I know — session intelligence)
├── NOW.md             (WHERE I am — ephemeral session state)
├── client/            (React app — what gets deployed)
│   ├── src/
│   │   ├── lib/
│   │   │   └── metrics.ts       ← SINGLE SOURCE OF TRUTH for all metrics/links
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Programs.tsx
│   │   │   ├── Live.tsx
│   │   │   ├── Join.tsx
│   │   │   └── tools/EB1AQualifier.tsx
│   │   └── contexts/
│   │       ├── AuthContext.tsx
│   │       └── ThemeContext.tsx
├── content/           (markdown content pipeline — still works, not front-and-center)
├── data/
│   └── coaching_crm.db  (WIN CLUB sessions, transcripts)
├── scripts/
│   └── build-content-index.js
├── docs/              (RFCs, tracker)
└── THEMING.md         (theme architecture reference)
```

## IMPORTANT CONVENTIONS

1. **Memory Architecture**: CLAUDE.md (WHO), MEMORY.md (WHAT), NOW.md (WHERE) — all at repo root
2. **Metrics**: Always update `client/src/lib/metrics.ts` — never hardcode numbers in components
3. **Dual-mode awareness**: This is `code/` mode. Project Atlas lives at `projects/h1bfounders/CLAUDE.md` in the secondbrain. Different contexts, different memory.
4. **Push = Production**: There is no staging. Push to master = live.
5. **Bun, not npm**: Package manager is Bun throughout.
6. **Brand**: "H1B Founders" (two words, B stays) in text. `h1bfounders.com` for domain/email/technical.

---
*Renovated by ATLAS — April 7, 2026*
*From 673 lines of Sep 2025 history → ~300 lines of current reality*
