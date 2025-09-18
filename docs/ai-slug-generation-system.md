# AI Slug Generation

**Status**: WORKING
**Script**: `/scripts/generate-seo-slug.py`
**Method**: Claude CLI (`claude -p`)

## What It Does
- Analyzes full content (200K context), not just titles
- Finds viral hooks buried deep in articles
- Generates SEO-optimized slugs under 60 chars

## Success Story
**Title**: "I have been in the US for 15 years"
**AI Found**: "I sponsored my own H1B" (line 156)
**Generated**: `i-sponsored-my-own-h1b-visa`

## Generated Slugs
- `i-sponsored-my-own-h1b-visa`
- `h1b-founders-700-members-year-review-2024`
- `founding-company-legal-h1b-visa-guide`
- `h1b-no-board-required-january-2025-rule-changes`
- `h1b-f1-visa-2025-rule-changes-immigrant-founders`

## Usage
```bash
python scripts/generate-seo-slug.py "title" "content"
```