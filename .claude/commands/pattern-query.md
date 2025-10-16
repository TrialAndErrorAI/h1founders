# Query Pattern Language

**Purpose**: Query patterns for specific insights, connections, and coaching prep

**Usage**: `/pattern-query [criteria]`

**When to use**:
- Prepping for specific founder challenge
- Looking for patterns by category or status
- Finding most/least used patterns
- Identifying pattern relationships
- Discovering pattern sequences

---

## Query Types

### By Founder Challenge

**Example**: "patterns for analysis paralysis"

**Action**:
1. Search pattern names and file content for keywords
2. Check diagnostic + tactical categories first
3. Look for related patterns via relationships table

**SQL**:
```sql
SELECT p.name, p.category, p.status, p.times_used, p.file_path
FROM patterns p
WHERE p.name LIKE '%[keyword]%'
   OR p.slug LIKE '%[keyword]%'
ORDER BY p.times_used DESC, p.status;
```

Then read matching pattern files for full context.

---

### By Category

**Example**: "show me all mindset patterns"

**Action**: List all patterns in specified category with stats.

**SQL**:
```sql
SELECT
    name,
    status,
    times_used,
    first_discovered_date,
    last_used_date,
    file_path
FROM patterns
WHERE category = '[category]'
ORDER BY times_used DESC, name;
```

Categories: diagnostic, mindset, tactical, accountability, metaphor

---

### By Status

**Example**: "what patterns are validated?"

**Action**: Show patterns at specified maturity level.

**SQL**:
```sql
SELECT
    category,
    name,
    times_used,
    last_used_date,
    file_path
FROM patterns
WHERE status = '[status]'
ORDER BY category, times_used DESC;
```

Status: validated (2+ uses), emerging (1 use), experimental (0 uses)

---

### By Usage

**Example**: "most used patterns" or "unused patterns"

**Action**: Sort by usage count, show top N or bottom N.

**Top patterns**:
```sql
SELECT
    name,
    category,
    times_used,
    status,
    file_path
FROM patterns
ORDER BY times_used DESC
LIMIT 10;
```

**Unused patterns** (candidates for pruning):
```sql
SELECT
    name,
    category,
    first_discovered_date,
    JULIANDAY('now') - JULIANDAY(first_discovered_date) as days_old,
    file_path
FROM patterns
WHERE times_used = 0
ORDER BY first_discovered_date ASC;
```

---

### By Client

**Example**: "patterns used with Harshdeep"

**Action**: Show which patterns applied to specific founder.

**SQL**:
```sql
SELECT DISTINCT
    p.name,
    p.category,
    pu.session_date,
    pu.outcome,
    pu.notes
FROM patterns p
JOIN pattern_usage pu ON p.id = pu.pattern_id
WHERE pu.client_name LIKE '%[name]%'
ORDER BY pu.session_date DESC;
```

---

### By Relationships

**Example**: "patterns that build on weekend discipline"

**Action**: Find connected patterns via relationships table.

**SQL**:
```sql
SELECT
    p2.name as related_pattern,
    pr.relationship_type,
    p2.category,
    p2.times_used,
    pr.notes
FROM patterns p1
JOIN pattern_relationships pr ON p1.id = pr.from_pattern_id
JOIN patterns p2 ON pr.to_pattern_id = p2.id
WHERE p1.slug = '[pattern-slug]'

UNION

SELECT
    p2.name as related_pattern,
    pr.relationship_type || ' (reverse)',
    p2.category,
    p2.times_used,
    pr.notes
FROM patterns p1
JOIN pattern_relationships pr ON p1.id = pr.to_pattern_id
JOIN patterns p2 ON pr.from_pattern_id = p2.id
WHERE p1.slug = '[pattern-slug]'

ORDER BY relationship_type;
```

Relationship types: prerequisite, builds_on, combines_with, alternative_to, sequence, reinforces

---

### Recent Activity

**Example**: "patterns used in last 7 days"

**Action**: Show recent pattern applications.

**SQL**:
```sql
SELECT
    p.name,
    p.category,
    pu.client_name,
    pu.session_date,
    pu.outcome
FROM patterns p
JOIN pattern_usage pu ON p.id = pu.pattern_id
WHERE pu.session_date >= DATE('now', '-7 days')
ORDER BY pu.session_date DESC;
```

---

### For Coaching Prep

**Example**: "patterns for first session with technical founder"

**Action**: Combine multiple filters + reasoning.

1. Query tactical + diagnostic patterns (baseline session)
2. Look for patterns with "first session" in usage notes
3. Check pattern sequences for "first session sequence"
4. Consider founder profile (technical = developer trap patterns?)

**Multi-query**:
```sql
-- Baseline/diagnostic patterns
SELECT name, file_path FROM patterns
WHERE category IN ('diagnostic', 'tactical')
AND status = 'validated'
ORDER BY times_used DESC
LIMIT 5;

-- Check sequences
SELECT name, description, use_case
FROM pattern_sequences
WHERE name LIKE '%first%' OR use_case LIKE '%baseline%';
```

Then read pattern files and recommend 3-5 patterns to prep.

---

## Output Format

### List Query Result
```
🔍 Query: "patterns for analysis paralysis"

Found 3 matches:

✅ Launch Speed Mandate (Tactical)
   Used 8x | Last: 2025-10-10
   → patterns/tactical/launch-speed-mandate.md

✅ Production Sequencing Framework (Tactical)
   Used 5x | Last: 2025-10-10
   → patterns/tactical/production-sequencing.md

🌱 Developer Trap Recognition (Diagnostic)
   Used 2x | Last: 2025-10-10
   → patterns/diagnostic/developer-trap.md
```

### Coaching Prep Result
```
🎯 Coaching Prep: First session with technical founder

Recommended patterns to prep:

1. Root Cause Dependency Chain (Diagnostic) ✅
   Used 4x | Helps identify foundational vs symptom problems
   → patterns/diagnostic/root-cause-dependency.md

2. Developer Trap Recognition (Diagnostic) 🌱
   Used 2x | "Building before validating" pattern
   → patterns/diagnostic/developer-trap.md

3. Launch Speed Mandate (Tactical) ✅
   Used 8x | Constraint forcing simplicity
   → patterns/tactical/launch-speed-mandate.md

Sequence to consider:
→ First Session Sequence (if exists in pattern_sequences)

Read these 3 files before session for full context.
```

---

## Protocol Notes

### Natural Language → SQL
- Parse user intent from natural language
- Map to appropriate query type
- Combine multiple queries if needed
- Always show SQL used (transparency)

### Read Files After Querying
- Database has metadata only
- Pattern files have full framework
- After query, read relevant pattern files
- Provide actual coaching context, not just lists

### Combine with Other Data
- Cross-reference with session notes
- Check calendar for upcoming sessions
- Review MEMORY.md for client context
- Use patterns as preparation, not scripts

### Query Iteration
- First query might not find what needed
- Iterate with different keywords
- Try related categories
- Check relationships if direct match fails

---

**Duration**: ~30-60 seconds per query
**Database**: coaching_crm.db (read-only)
**Files**: May read pattern files after query
**Output**: Query results + actionable coaching prep
