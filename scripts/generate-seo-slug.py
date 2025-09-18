#!/usr/bin/env python3
"""
Generate SEO-friendly slugs using Claude in headless mode
Usage: python generate-seo-slug.py "title" "content"
"""

import sys
import subprocess

def generate_slug(title, content):
    """Generate SEO slug using Claude CLI in headless mode"""

    # Give Claude the FULL content - it has 200K context!
    # The viral hook could be anywhere, not just the beginning
    prompt = f"""Generate an SEO-friendly URL slug (max 60 chars) for this H1B founders content. Analyze the ENTIRE content to find the most viral/important hook. Return ONLY the slug, no explanation.

Title: '{title}'

Full Content:
{content}

Slug:"""

    try:
        # Call claude in headless mode with timeout
        result = subprocess.run(
            ['claude', '-p', prompt],
            capture_output=True,
            text=True,
            check=True,
            timeout=30  # 30 second timeout
        )

        # Return the slug (strip whitespace)
        return result.stdout.strip()

    except (subprocess.CalledProcessError, subprocess.TimeoutExpired) as e:
        print(f"Error calling Claude: {e}", file=sys.stderr)
        # Fallback to simple slug generation
        import re
        slug = re.sub(r'[^a-z0-9]+', '-', title.lower())
        slug = re.sub(r'^-+|-+$', '', slug)
        return slug[:60]

def main():
    if len(sys.argv) < 3:
        print("Usage: python generate-seo-slug.py 'title' 'content'")
        sys.exit(1)

    title = sys.argv[1]
    content = sys.argv[2]

    slug = generate_slug(title, content)
    print(slug)

if __name__ == "__main__":
    main()