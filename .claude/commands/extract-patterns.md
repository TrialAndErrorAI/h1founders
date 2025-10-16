# Extract Coaching Patterns Protocol

**Purpose**: Extract coaching patterns from session transcripts using 4-pass methodology

**When to use**: After Sid shares coaching session transcripts (WIN CLUB or Tough Love)

---

## Phase 0: DETECTION (Know Where You Are)

**Questions to answer:**
1. What's the input?
   - Session transcripts (one or batch?)
   - Which client(s)?
   - Session type (baseline, breakthrough, tactical, check-in)?

2. Where is the data?
   - Transcript file paths
   - Session already in database? (verify with SQL)
   - WIN CLUB or Tough Love?

3. What's the session context?
   - Session number for this client
   - Date of session
   - Any pre-existing patterns we're tracking?

**Verification**: Confirm all transcript files exist, session IDs confirmed

---

## Pass 1: READ (Understand the Whole)

**Goal**: Build mental map without extracting yet

**Actions**:
1. Read full transcript start to finish
2. Identify session arc:
   - What problem did founder bring?
   - What breakthroughs happened?
   - What frameworks did Sid use?
   - How did founder respond?

3. Note session type:
   - **Baseline**: Discovery, assessment, setting foundation
   - **Breakthrough**: Identity shifts, major reframes
   - **Tactical**: Systems, homework, execution design
   - **Check-in**: Progress review, adjustment, accountability

**Output**: 2-3 sentence session summary capturing essence

---

## Pass 2: PATTERN SCAN (Identify Frameworks)

**Goal**: Identify all coaching patterns used in session

**Look for**:

### 🔍 Diagnostic Patterns
- Root cause identification techniques
- Dependency mapping ("which is foundational?")
- Problem decomposition methods
- Assessment frameworks

### 🧠 Mindset Patterns
- Reframes ("competition = validation")
- Identity work ("you're not a business yet")
- Belief system updates
- Perspective shifts

### 🎯 Tactical Patterns
- Homework assignments with structure
- System design frameworks
- Launch protocols
- Time management patterns

### 🤝 Accountability Patterns
- Self-enforcing commitment mechanisms
- "Show up or it gets harder" patterns
- Consequence design
- Progress tracking methods

### 🎨 Metaphor Patterns
- Analogies that landed
- Stories that reframed
- Physical metaphors (workout = therapy)
- Vivid language that unlocked

**Output**: List of 5-15 potential patterns with timestamps

---

## Pass 3: EXTRACT & CATEGORIZE (Codify Learnings)

**Goal**: Document each pattern with full context

**For each pattern, capture**:

### Pattern Template
```markdown
## Pattern Name

**Category**: [diagnostic|mindset|tactical|accountability|metaphor]
**Status**: experimental (will auto-promote with usage)

### The Problem
What recurring challenge does this address?

### The Context
When does this pattern apply?
- Founder stage/situation
- Emotional state
- Specific triggers

### The Solution
The actual coaching framework:
1. Step by step if tactical
2. Exact reframe if mindset
3. Questions to ask if diagnostic
4. Mechanism design if accountability
5. Metaphor + explanation if metaphor

### First Use
**Client**: [Name]
**Session**: [Type + Number]
**Date**: [ISO date]
**Outcome**: [breakthrough|landed|neutral|missed]

### What Made It Work
Why was this effective? What conditions enabled success?

### Reusability Assessment
Can this work with other founders?
What needs adapting vs what's universal?

### Example Exchange
[Actual transcript excerpt showing pattern in action]
```

**Critical**:
- Use founder's actual words in examples
- Capture Sid's exact language (don't paraphrase)
- Note founder's response (did it land?)
- Be specific about context and conditions

**Output**: 5-15 fully documented pattern files

---

## Pass 4: CROSS-REFERENCE (Find Universal Patterns)

**Goal**: Identify patterns used across multiple clients/sessions

**Actions**:

1. **Load existing patterns from DB**:
   ```sql
   SELECT slug, name, category, times_used
   FROM patterns
   ORDER BY category, name;
   ```

2. **Match new extractions to existing patterns**:
   - Is this the same pattern as something already in DB?
   - Variation of existing pattern?
   - Genuinely new?

3. **For matches**: Log usage in pattern_usage table instead of creating duplicate

4. **For new patterns**: Create pattern file + DB entry

5. **Identify universal signals**:
   - Pattern used in 2+ sessions? → Flag as emerging universal
   - Pattern used with 2+ different clients? → Strong universal signal
   - Pattern referenced in multiple session types? → Core framework

6. **Document relationships**:
   - Does this pattern build on another?
   - Prerequisite for another pattern?
   - Combines with other patterns?
   - Alternative approach to existing pattern?

**Output**:
- Universal pattern candidates flagged
- Pattern relationships documented
- Duplicate patterns merged
- Usage logged in database

---

## Phase N: VERIFICATION (Confirm Completeness)

**Checklist**:
- [ ] All transcripts read completely
- [ ] All identifiable patterns extracted
- [ ] Pattern files created in correct category folders
- [ ] Database entries created for new patterns
- [ ] Usage logged for existing patterns
- [ ] Relationships documented where applicable
- [ ] MEMORY.md updated with raw session intelligence
- [ ] generate_index.py run to update INDEX.md

**Database Verification**:
```sql
-- Verify new patterns were added
SELECT COUNT(*) FROM patterns WHERE first_discovered_date = '[today]';

-- Check auto-promotion worked
SELECT slug, status, times_used
FROM patterns
WHERE first_discovered_date = '[today]'
ORDER BY times_used DESC;

-- Verify usage logged
SELECT p.name, pu.client_name, pu.outcome
FROM patterns p
JOIN pattern_usage pu ON p.id = pu.pattern_id
WHERE pu.session_date = '[today]'
ORDER BY pu.created_at DESC;
```

**Output**: Summary report showing:
- Patterns extracted (count by category)
- Patterns reused (which ones, how many times)
- Universal patterns identified (2+ uses)
- Database integrity confirmed
- INDEX.md regenerated

---

## Protocol Notes

### Don't Overthink Pattern Boundaries
- If uncertain whether something is one pattern or two → extract as two, merge later if needed
- Better to over-extract and prune than miss valuable frameworks
- Patterns can have variations - that's natural

### First Use = Experimental
- Don't worry about "is this universal?" on first extraction
- Database triggers auto-promote at 2 uses
- Trust the process - natural selection works

### Exact Language Matters
- Capture Sid's specific words ("not afraid of being vulnerable")
- Framework power often in precise phrasing
- Don't sanitize or academicize the language

### Failed Patterns Count Too
- Pattern that didn't land? Still extract it
- Document outcome as "missed"
- Learn what doesn't work = valuable

### Build on MEMORY.md
- Raw session intelligence still goes to MEMORY.md
- Pattern files are refined, reusable extractions
- MEMORY.md = archive, patterns/ = playbook

---

**Duration**: 60-90 minutes per session batch
**Database**: coaching_crm.db (read-write)
**Updates**: patterns/ folder, MEMORY.md, INDEX.md
