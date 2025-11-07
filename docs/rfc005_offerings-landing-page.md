# RFC 005: Offerings Landing Page

**Status:** Draft
**Created:** Nov 6, 2025
**Author:** Atlas (H1Founders Project)
**Implements:** 4-tier coaching architecture public launch

---

## Problem Statement

**Current state:**
- 4-tier coaching architecture complete (Pathfinder, Launch Club, Revenue Club, WIN CLUB)
- Messaging finalized with Grand Slam Offer framework
- Friday community call (Nov 7) launching programs publicly
- No dedicated landing page - using slides/documents

**Problem:**
- Can't screen share documents professionally during call
- No persistent URL to send after call
- No self-serve information for prospects
- Harder to track which tier prospects want

**Solution:**
Single landing page at `/offerings` with:
- 4-tier comparison (scroll-friendly, mobile responsive)
- Success stories (Khasim transformation)
- Authority positioning ($3.5M ARR, EB1A, VP Eng)
- Natural ascension visualization
- FAQ section
- Soft CTA (DM me, CREDITOR positioning)

---

## Design Specification

### Page Structure

```
/offerings page layout:

1. Hero Section
   - H1: "4 Ways I Can Help"
   - Subhead: "(Depending on where you are)"
   - Authority markers (3 pills: $3.5M ARR, Ex-VP Eng, EB1A at 28)
   - LinkedIn link

2. Positioning Statement
   - "I was alone once" message
   - W2 rate vs coaching rate transparency
   - CREDITOR framing (giving back, not income)

3. 4-Tier Cards (2x2 grid, mobile stacks)
   - Pathfinder (top-left)
   - Launch Club (top-right)
   - Revenue Club (bottom-left)
   - WIN CLUB Premium (bottom-right, border accent)

4. Comparison Table
   - Side-by-side tier comparison
   - Stage, Format, Price columns
   - Monospace font (code aesthetic)

5. Success Story: Khasim
   - Before/After layout
   - Quote + attribution
   - Green/blue gradient background

6. Natural Ascension Path
   - Visual progression: Pathfinder → Launch → Revenue → WIN CLUB
   - "Not everyone climbs" disclaimer

7. FAQ Section
   - 5 common questions
   - Expandable cards or static
   - Cancel policy, founding member rate, capacity, equity, unsure which tier

8. CTA Section
   - "DM me, I'll tell you what fits"
   - Contact info (WhatsApp, LinkedIn, Email)
   - "No urgency" messaging
```

### Visual Design

**Theme:** Matrix aesthetic (consistent with h1founders.com)

**Color Palette:**
- Background: `var(--bg-primary)` (dark)
- Cards: `var(--bg-secondary)` with `opacity: 0.5`
- Accent: `var(--accent-primary)` (green/red matrix)
- Borders: `var(--border)` (subtle)
- Text: `var(--foreground)` hierarchy (primary/secondary/tertiary)

**Typography:**
- Headers: Bold, terminal-text, matrix-glow effect
- Body: System font stack
- Code/pricing: Monospace (font-mono)

**Components:**
- Gradient boxes for positioning/success stories
- Border accents for WIN CLUB (elite tier)
- Hover states on tier cards (border glow)

**Responsive:**
- Desktop: 2x2 grid for tier cards, table for comparison
- Tablet: 1-column stack, table scrolls horizontally
- Mobile: Full stack, touch-friendly spacing

---

## Copy & Messaging

### Hero
```
H1: "4 Ways I Can Help"
Subhead: "(Depending on where you are)"

Authority pills:
- $3.5M ARR Bootstrapped (RenovateAI)
- Ex-VP Engineering @ Unicorn
- F1 → H1B (self-sponsored) → EB1A at 28

Link: linkedin.com/in/sidsarasvati
```

### Positioning Statement
```
"I was alone once."

I wasted 2 years researching and building without shipping.
I don't want you to waste 2 years.

W2 hourly rate: $700 (enterprise sales)
Coaching rates: $197-$497 (giving back, not income)
```

### Tier Cards

**Pathfinder:**
```
Title: Pathfinder
For: International founders, visa confusion
Price: $297/session (strikethrough $500)

Description:
You have the idea. You have the prototype. Client wants to buy.
But you don't know the steps.

What you get:
• 45-min strategic session
• C-Corp vs LLC + tax strategy
• O1/EB1A visa roadmap
• WhatsApp access between sessions
• Company setup templates

Format: 1:1 consultant mode
Typical engagement: 1-3 sessions total
Capacity: 10 founding members

Recent win:
"Prasanna (crypto founder): C-Corp + O1 roadmap in one session"
```

**Launch Club:**
```
Title: Launch Club
For: Ideation stage, haven't started yet
Price: $197/month (4 weeks)

Description:
You've "researched" for months. You don't know where to start.
100 small decisions = paralysis.

4-week sprint:
• Week 1: Incorporate (C-Corp or LLC)
• Week 2: Talk to 10 customers
• Week 3: Price it
• Week 4: First sale attempt

Format: Group (10-15 founders)
Sessions: Wed 6-7 PM ET (weekly)
Next cohort: Nov 18, 2025

Guarantee:
"Complete homework but don't achieve outcome? Money back."
```

**Revenue Club:**
```
Title: Revenue Club
For: Built something, no customers yet
Price: $297/month (ongoing)

Description:
You incorporated. You built something. No customers.
Shipping paralysis.

Accountability cadence:
• Monday: "What are you shipping this week?"
• Friday: "Show what you shipped"
• Group pressure = execution
• Stay as long as needed

Format: Group (8-12 founders)
Sessions: Mon/Fri 20-30 min check-ins
Start date: Nov 25, 2025

Goal:
"First paying customer in 60 days. Not cheerleading. Just accountability."
```

**WIN CLUB Premium:**
```
Title: WIN CLUB Premium
For: Already running, but stuck
Price: $497/month (3 months)
Badge: ELITE (top-right corner)

Description:
You have customers/revenue but stuck. Analysis paralysis.
Execution crisis. Know what to do, can't execute.

This is treatment, not coaching:
• Twice weekly tough love
• Wed/Fri 1.5-hour sessions
• "Shocks in the brain"
• Transformation, not tips

Format: Elite group (5 max)
Commitment: 3 months minimum
Q1 2026 cohort: 5 spots only
Applications due: Dec 31, 2025

Testimonial:
"If you talk 'hey please' you guys won't listen. I didn't leave room
for 2 days after our session." — Manisha
```

### Comparison Table
```
| Tier        | Stage                    | Format         | Price              |
|-------------|--------------------------|----------------|--------------------|
| Pathfinder  | Visa confusion, clarity  | 1:1 sessions   | $297/session       |
| Launch Club | Ideation, haven't started| Group (10-15)  | $197/mo (4 weeks)  |
| Revenue Club| Built, no customers      | Group (8-12)   | $297/mo            |
| WIN CLUB    | Running but stuck        | Elite (5 max)  | $497/mo (3 months) |
```

### Success Story: Khasim
```
Title: Khasim's Transformation

Before (Session #1):
• Energy: 3/10, physically 1/10
• No actual business (1 consulting gig)
• "Tired of not making progress"
• Analysis paralysis, shiny object syndrome

After (9 sessions):
• H1B concurrent filing (approved)
• Shopify plugin business ($50K-100K/year potential)
• Foundation systems (sleep, gym, energy)
• Clear execution roadmap

Quote:
"I was tired of not making progress. I'll use anything I can
to make progress now."
— Khasim Shaik, Shopify Data Scientist, WIN CLUB Q4 2025
```

### Natural Ascension Path
```
Pathfinder → Launch Club → Revenue Club → WIN CLUB
(Strategic clarity) → (Incorporate + validate) → (First customers) → (Transformation)

Not everyone climbs the ladder. Some need just clarity (Pathfinder).
Others skip straight to WIN CLUB. Start where you are.
```

### FAQ

**Q: Can I cancel anytime?**
A: Pathfinder, Launch Club, Revenue Club: Yes, cancel anytime. WIN CLUB Premium: 3-month commitment (transformation takes time).

**Q: What's "founding member" rate?**
A: Lock in rate forever. If I raise prices to $397 next year, you keep paying $297. Not temporary. True founding member benefit.

**Q: Why only 5 spots for WIN CLUB?**
A: Real capacity constraint. Twice weekly 1.5-hour sessions = 15 hours/month. Can't dilute quality. 5 founders = sustainable for W2 (40 hrs) + WIN CLUB (15 hrs).

**Q: Do you take equity?**
A: No. Never. Cash payment only. I don't want your equity. I want your progress.

**Q: What if I'm not sure which tier?**
A: DM me. I'll tell you what fits your situation. No pressure, no hard sell. Just honest assessment.

### CTA Section
```
Title: "Ready to Start?"

DM me. I'll tell you what fits your situation.

Contact:
WhatsApp: +1 (857) 919-7117
LinkedIn: linkedin.com/in/sidsarasvati
Email: sid@h1founders.com

// No urgency. No hard sell. Take your time.
I'm here when you're ready.
```

---

## Technical Implementation

### Tech Stack
- **Framework:** React (existing h1founders.com stack)
- **Styling:** Tailwind CSS (reuse design system)
- **Routing:** React Router (add `/offerings` route)
- **Deployment:** Cloudflare Pages (existing pipeline)

### File Structure
```
code/client/src/pages/
  └── Offerings.tsx (main page component)

code/client/src/components/offerings/
  ├── TierCard.tsx (reusable tier card)
  ├── ComparisonTable.tsx (comparison table)
  ├── SuccessStory.tsx (Khasim story)
  ├── FAQ.tsx (FAQ section)
  └── CTASection.tsx (contact CTA)

code/client/src/App.tsx
  └── Add route: <Route path="offerings" element={<Offerings />} />
```

### Component Breakdown

**Offerings.tsx** (main page)
- Imports all sub-components
- Manages layout and scroll behavior
- SEO meta tags (title, description)

**TierCard.tsx** (reusable)
```tsx
interface TierCardProps {
  title: string
  subtitle: string
  price: string
  retailPrice?: string
  description: string
  features: string[]
  format: string
  details: { label: string; value: string }[]
  testimonial?: { text: string; author: string }
  elite?: boolean
}
```

**ComparisonTable.tsx**
- Responsive table (horizontal scroll on mobile)
- Monospace font
- Highlight WIN CLUB row

**SuccessStory.tsx**
- Before/After grid
- Quote with attribution
- Gradient background

**FAQ.tsx**
- Static or accordion (decide during implementation)
- 5 questions hardcoded

**CTASection.tsx**
- Contact info
- Soft messaging
- CREDITOR positioning

### Responsive Breakpoints
- `sm:` 640px (mobile landscape)
- `md:` 768px (tablet)
- `lg:` 1024px (desktop)
- `xl:` 1280px (wide desktop)

**Tier cards:**
- Mobile: 1 column (stack)
- Tablet: 2 columns
- Desktop: 2x2 grid

**Comparison table:**
- Mobile: Horizontal scroll
- Desktop: Full width

### Performance Considerations
- Lazy load images (if any added later)
- Inline critical CSS (Tailwind handles)
- No external dependencies
- Static content (no API calls)

### Accessibility
- Semantic HTML (h1, h2, section, article)
- ARIA labels where needed
- Keyboard navigation (tab order)
- Color contrast ratios (WCAG AA minimum)

---

## Success Metrics

**Page effectiveness:**
1. **Clarity:** User knows which tier fits them in < 30 seconds
2. **Action:** DM rate > 5% of page visitors
3. **Self-selection:** Users correctly identify their tier (validated in DM convos)
4. **Mobile:** 50%+ traffic from mobile (WhatsApp links)

**Friday call usage:**
- Screen share during call (replaces slides)
- Share link in chat
- Send link post-call to attendees

**Post-launch:**
- Track tier preference (Pathfinder vs Launch vs Revenue vs WIN CLUB)
- Conversion rate (page visit → DM → booking)
- Mobile bounce rate (should be < 40%)

---

## Open Questions

1. **Calendar integration:** Should CTA link directly to Cal.com, or keep DM-first approach?
   - **Recommendation:** DM-first (maintains CREDITOR positioning, allows qualification)

2. **Pricing display:** Show Friday 20% discount on page, or only mention in call?
   - **Recommendation:** Don't show on page (urgency is call-specific, page is evergreen)

3. **Testimonials:** Just Khasim, or add Manisha quote to WIN CLUB card?
   - **Recommendation:** Khasim story section + Manisha quote on WIN CLUB card (already in spec)

4. **Application forms:** Link to Google Forms for Launch/Revenue/WIN CLUB?
   - **Recommendation:** Not yet - keep DM-first for founding cohort, add forms later

5. **Video:** Add video intro or keep text-only?
   - **Recommendation:** Text-only for now (faster to implement, easier to update)

---

## Next Steps

**Phase 1: Implementation (This Week)**
1. `/wake-code` session to build page
2. Deploy to staging
3. Test on mobile (WhatsApp preview)
4. Deploy to production before Friday call

**Phase 2: Post-Launch Refinements (Week of Nov 11)**
1. Add actual signup counts (capacity tracking)
2. Add application forms for group tiers
3. Optimize based on Friday call feedback
4. A/B test CTA variations

**Phase 3: Long-term (Dec 2025+)**
1. Video testimonials
2. Stripe payment links (if moving away from Venmo)
3. Automated booking flows
4. Analytics dashboard

---

## Approval Checklist

- [ ] Design spec approved (layout, structure)
- [ ] Copy approved (all messaging, tone, voice)
- [ ] Technical approach approved (React, components, routing)
- [ ] Success metrics agreed upon
- [ ] Ready for `/wake-code` implementation

---

**Status:** Awaiting Sid's approval to proceed with implementation.
