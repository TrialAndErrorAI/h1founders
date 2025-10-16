# Load Pattern Language Context

**Purpose**: Load the pattern catalog before coaching prep or pattern work

**When to use**:
- Before preparing for coaching sessions
- When identifying which patterns might help a founder
- Before extracting new patterns (to avoid duplicates)
- When designing coaching sequences

---

## Protocol

### Phase 0: Read CONTEXT.md
Load the pattern language philosophy and architecture.

Read: `patterns/CONTEXT.md`

### Pass 1: Load INDEX.md
Read the auto-generated catalog of all patterns.

Read: `patterns/INDEX.md`

### Pass 2: Query Database for Recent Activity
Get the most recently used patterns and any new emerging patterns.

Run SQL query:
```sql
SELECT
    p.name,
    p.category,
    p.status,
    p.times_used,
    p.last_used_date,
    pu.client_name,
    pu.outcome
FROM patterns p
LEFT JOIN pattern_usage pu ON p.id = pu.pattern_id
WHERE pu.id IN (
    SELECT MAX(id)
    FROM pattern_usage
    GROUP BY pattern_id
)
ORDER BY pu.created_at DESC
LIMIT 10;
```

This shows: Which patterns are hot? What's working? What's emerging?

### Pass 3: Summarize Context
Provide brief summary:
- Total patterns (validated vs emerging)
- Most-used patterns (top 5)
- Recent discoveries (last 7 days)
- Categories with most activity

### Phase N: Ready
Confirm pattern context is loaded and ready for:
- Coaching prep
- Pattern extraction
- Sequence design

---

## Output Format

```
✅ Pattern Language Context Loaded

📊 Statistics:
- 10 validated patterns | 6 emerging | 2 experimental
- 47 total uses across 8 coaching sessions

🔥 Most Used:
1. Weekend Discipline Framework (7 uses) - Tactical
2. Brain Externalization Protocol (5 uses) - Tactical
3. Paying Customer Validation (4 uses) - Mindset

🌱 Recent Discoveries:
- Role Play/Rehearsal (Oct 10) - Tactical
- Business Definition Forcing (Oct 10) - Diagnostic

📚 Ready for: coaching prep | pattern extraction | sequence design
```

---

**Duration**: ~30 seconds
**Database**: coaching_crm.db (read-only)
**Files**: CONTEXT.md, INDEX.md
