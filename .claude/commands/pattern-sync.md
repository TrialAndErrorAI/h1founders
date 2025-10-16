# Sync Pattern Catalog

**Purpose**: Regenerate INDEX.md from database (single source of truth)

**When to use**:
- After extracting new patterns
- After logging pattern usage
- After updating pattern metadata in database
- When INDEX.md seems out of sync
- Before sharing catalog with others

---

## Protocol

### Phase 0: Verify Database State
Quick sanity check before regenerating.

**Check pattern count**:
```sql
SELECT
    COUNT(*) as total,
    SUM(CASE WHEN status = 'validated' THEN 1 ELSE 0 END) as validated,
    SUM(CASE WHEN status = 'emerging' THEN 1 ELSE 0 END) as emerging,
    SUM(CASE WHEN status = 'experimental' THEN 1 ELSE 0 END) as experimental
FROM patterns;
```

**Expected**: Numbers should make sense (not 0, not impossibly high)

### Pass 1: Run Generation Script
Execute the Python script that reads DB and writes INDEX.md.

```bash
cd /Users/sid/Code/te/h1founders
python3 scripts/generate_index.py
```

**Script behavior**:
- Reads all patterns from database
- Groups by category
- Sorts by usage within category
- Generates markdown with statistics
- Writes to patterns/INDEX.md
- Reports success/failure

### Pass 2: Verify Output
Check that INDEX.md was updated correctly.

**Verification checks**:
1. File timestamp updated (check with `ls -l`)
2. Pattern count matches database query
3. Categories present and correctly grouped
4. Status badges (✅🌱🧪) match database status
5. Usage counts match database

**Read**: `patterns/INDEX.md` (first 50 lines to spot-check)

### Phase N: Confirmation
Report sync success with summary.

---

## Output Format

```
✅ Pattern Catalog Synced

📊 Database → INDEX.md:
- 16 patterns total
- 10 validated | 6 emerging | 0 experimental
- 5 categories represented
- 3 sequences documented

📝 INDEX.md updated:
- Size: 4.2 KB
- Last modified: 2025-10-13 14:23:45
- Ready for distribution

🔗 Catalog location: patterns/INDEX.md
```

---

## Error Handling

**If script fails**:
1. Check database connection (coaching_crm.db exists?)
2. Check Python version (Python 3.7+)
3. Check file permissions (can write to patterns/?)
4. Read error message carefully
5. Fix issue and retry

**If output seems wrong**:
1. Run database verification queries manually
2. Compare counts (DB vs INDEX.md)
3. Check for recent DB changes not reflected
4. Consider if pattern files out of sync with DB

**Recovery**:
- INDEX.md is always regenerable from DB
- Never edit INDEX.md manually
- DB is source of truth - fix there first

---

**Duration**: ~5 seconds
**Database**: coaching_crm.db (read-only)
**Files**: INDEX.md (write), generate_index.py (execute)
**Safety**: Idempotent - safe to run multiple times
