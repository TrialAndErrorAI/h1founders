# Coaching Intelligence Migrated (Oct 25, 2025)

**All WIN CLUB coaching data has been moved to secondbrain.**

## What Moved

The following files/folders are now maintained in:
`/Users/sid/Code/sid/secondbrain-logseq/projects/h1bfounders-website/`

### Moved Files:
- `data/coaching_crm.db` → `projects/h1bfounders-website/data/coaching_crm.db`
- `patterns/` (entire folder) → `projects/h1bfounders-website/patterns/`
- `.claude/commands/pattern-*.md` → `projects/h1bfounders-website/.claude/commands/`
- `data/setup_coaching_crm.sql` → `projects/h1bfounders-website/data/`
- `scripts/init_pattern_tables.sql` → `projects/h1bfounders-website/data/`

## Why

**Coaching = Intelligence Extraction**
- Session transcripts, pattern frameworks, coaching playbook
- Belongs with MEMORY.md in secondbrain
- Natural decay + natural promotion of patterns

**Code Repo = Platform Features**
- Website, tools, deployment
- RFCs for features like Tough Love video viewer
- Technical implementation only

## What Stays Here

- All platform code (client, server, functions)
- RFCs (platform feature specs)
- Website content and marketing
- Technical documentation

## Dual-Mode Wake Protocol

This migration strengthens the dual-mode architecture:

**Project Atlas** (`/wake-project h1founders`):
- Loads coaching intelligence from secondbrain
- Has access to patterns, sessions, frameworks
- For: Coaching prep, session extraction, WIN CLUB management

**Code AI** (`/wake-code` from secondbrain folder):
- Loads platform technical context
- Has access to website code, deployment
- For: Platform features, technical implementation

## Database Access

If you need the coaching database for platform features (e.g., displaying sessions on website):
- Reference: `../../../sid/secondbrain-logseq/projects/h1bfounders-website/data/coaching_crm.db`
- Or create read-only API endpoint

---
*Migration completed: Oct 25, 2025*
*All coaching intelligence now tracked in secondbrain repo*
