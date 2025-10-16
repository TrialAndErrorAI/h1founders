#!/usr/bin/env python3
"""
Generate INDEX.md from pattern database
Auto-generates catalog of all patterns with metadata
NEVER EDIT INDEX.md MANUALLY - always regenerate from DB
"""

import sqlite3
from pathlib import Path
from datetime import datetime

DB_PATH = Path(__file__).parent.parent / "data" / "coaching_crm.db"
INDEX_PATH = Path(__file__).parent.parent / "patterns" / "INDEX.md"

def get_patterns_by_category(cursor):
    """Get all patterns grouped by category with metadata"""
    cursor.execute("""
        SELECT
            category,
            slug,
            name,
            status,
            times_used,
            first_discovered_date,
            last_used_date,
            file_path
        FROM patterns
        ORDER BY category, times_used DESC, name
    """)

    patterns_by_cat = {}
    for row in cursor.fetchall():
        cat, slug, name, status, times_used, first_date, last_date, file_path = row

        if cat not in patterns_by_cat:
            patterns_by_cat[cat] = []

        patterns_by_cat[cat].append({
            'slug': slug,
            'name': name,
            'status': status,
            'times_used': times_used,
            'first_date': first_date,
            'last_date': last_date,
            'file_path': file_path
        })

    return patterns_by_cat

def get_sequences(cursor):
    """Get all pattern sequences"""
    cursor.execute("""
        SELECT
            slug,
            name,
            description,
            times_used
        FROM pattern_sequences
        ORDER BY times_used DESC, name
    """)

    return [dict(zip(['slug', 'name', 'description', 'times_used'], row))
            for row in cursor.fetchall()]

def get_stats(cursor):
    """Get overall pattern statistics"""
    cursor.execute("SELECT COUNT(*), SUM(times_used) FROM patterns")
    total_patterns, total_uses = cursor.fetchone()

    cursor.execute("SELECT COUNT(*) FROM patterns WHERE status = 'validated'")
    validated = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM patterns WHERE status = 'emerging'")
    emerging = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM patterns WHERE status = 'experimental'")
    experimental = cursor.fetchone()[0]

    return {
        'total': total_patterns or 0,
        'total_uses': total_uses or 0,
        'validated': validated or 0,
        'emerging': emerging or 0,
        'experimental': experimental or 0
    }

def format_status_badge(status):
    """Return emoji badge for pattern status"""
    badges = {
        'validated': '✅',
        'emerging': '🌱',
        'experimental': '🧪'
    }
    return badges.get(status, '❓')

def format_category_emoji(category):
    """Return emoji for category"""
    emojis = {
        'diagnostic': '🔍',
        'mindset': '🧠',
        'tactical': '🎯',
        'accountability': '🤝',
        'metaphor': '🎨'
    }
    return emojis.get(category, '📁')

def generate_index():
    """Generate INDEX.md from database"""

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        patterns_by_cat = get_patterns_by_category(cursor)
        sequences = get_sequences(cursor)
        stats = get_stats(cursor)

        # Build INDEX.md content
        lines = []
        lines.append("# Pattern Language Catalog\n")
        lines.append("> **Auto-generated from database** - Do not edit manually\n")
        lines.append(f"> Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        lines.append("---\n")

        # Statistics
        lines.append("## 📊 Statistics\n")
        lines.append(f"- **Total Patterns**: {stats['total']}\n")
        lines.append(f"- **Total Uses**: {stats['total_uses']}\n")
        lines.append(f"- **Status Breakdown**:\n")
        lines.append(f"  - ✅ Validated: {stats['validated']}\n")
        lines.append(f"  - 🌱 Emerging: {stats['emerging']}\n")
        lines.append(f"  - 🧪 Experimental: {stats['experimental']}\n")
        lines.append("\n---\n")

        # Patterns by category
        lines.append("## 📚 Patterns by Category\n")

        category_order = ['diagnostic', 'mindset', 'tactical', 'accountability', 'metaphor']

        for cat in category_order:
            if cat not in patterns_by_cat:
                continue

            patterns = patterns_by_cat[cat]
            emoji = format_category_emoji(cat)
            lines.append(f"\n### {emoji} {cat.title()}\n")
            lines.append(f"*{len(patterns)} pattern(s)*\n\n")

            for p in patterns:
                status_badge = format_status_badge(p['status'])
                uses_text = f"Used {p['times_used']}x" if p['times_used'] > 0 else "Not yet used"

                lines.append(f"- **[{p['name']}]({p['file_path']})** {status_badge}\n")
                lines.append(f"  - {uses_text}")

                if p['last_date']:
                    lines.append(f" | Last: {p['last_date']}")

                lines.append(f" | Since: {p['first_date']}\n")

        # Sequences
        if sequences:
            lines.append("\n---\n")
            lines.append("## 🔄 Pattern Sequences\n")
            lines.append(f"*{len(sequences)} sequence(s)*\n\n")

            for seq in sequences:
                lines.append(f"- **{seq['name']}** (`{seq['slug']}`)\n")
                if seq['description']:
                    lines.append(f"  - {seq['description']}\n")
                lines.append(f"  - Used {seq['times_used']}x\n")

        # Footer
        lines.append("\n---\n")
        lines.append("## 🔧 Usage\n")
        lines.append("- **Load patterns**: `/pattern-context` (loads this catalog)\n")
        lines.append("- **Extract new**: `/extract-patterns` (from transcripts)\n")
        lines.append("- **Query patterns**: `/pattern-query <criteria>`\n")
        lines.append("- **Regenerate index**: `/pattern-sync` (runs this script)\n")
        lines.append("\n---\n")
        lines.append("*See [CONTEXT.md](CONTEXT.md) for philosophy and architecture*\n")

        # Write to file
        INDEX_PATH.write_text("".join(lines), encoding='utf-8')

        print(f"✅ INDEX.md generated successfully")
        print(f"   {stats['total']} patterns | {stats['validated']} validated | {stats['emerging']} emerging")

    except Exception as e:
        print(f"❌ Error generating INDEX.md: {e}")
        raise
    finally:
        conn.close()

if __name__ == "__main__":
    generate_index()
