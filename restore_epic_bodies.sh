#!/bin/bash
set -e

REPO="cckssr/NextLaBIS"
EPIC_DIR=".github/epic-issues"

echo "🔄 Restoring epic bodies from markdown files..."
echo ""

# Map: Epic file number -> Issue number
# §2 (file 02) -> #62, §3 (file 03) -> #63, etc.
for file in "$EPIC_DIR"/*.md; do
  filename=$(basename "$file")
  file_num=$(echo "$filename" | sed 's/^0*//' | sed 's/-.*//')
  
  # Calculate issue number: file_num + 60
  issue_num=$((file_num + 60))
  
  echo "Processing file $filename -> Issue #$issue_num..."
  
  # Extract body (everything after the YAML frontmatter)
  body=$(awk 'BEGIN{p=0} /^---$/{p++; next} p>=2' "$file")
  
  if [ -z "$body" ]; then
    echo "  ⚠️  No body found in $filename"
    continue
  fi
  
  # Update issue with original body
  echo "  Restoring body..."
  echo "$body" | gh issue edit "$issue_num" --repo "$REPO" --body-file -
  
  echo "  ✅ Restored issue #$issue_num"
  sleep 0.3
done

echo ""
echo "✅ All epic bodies restored from markdown files!"
