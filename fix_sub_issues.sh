#!/bin/bash
set -e

REPO="cckssr/NextLaBIS"

# Epic issue numbers (§2-§39 = #62-#99)
EPIC_START=62
EPIC_END=99

echo "🔧 Fixing sub-issue links in epics..."
echo ""

for epic_num in $(seq $EPIC_START $EPIC_END); do
  echo "Processing Epic #$epic_num..."
  
  # Get current epic body
  echo "  Fetching current body..."
  current_body=$(gh issue view "$epic_num" --repo "$REPO" --json body -q .body)
  
  # Remove the "## Sub-Issues" section and all task list items after it
  # We'll extract everything before "## Sub-Issues"
  new_body=$(echo "$current_body" | sed '/^## Sub-Issues$/,$d')
  
  # Get sub-issues for this epic
  sub_issues=$(gh issue list --repo "$REPO" --search "\"Parent Epic\" #$epic_num in:body" --json number --limit 200 | jq -r '.[].number' | sort -n)
  
  if [ -z "$sub_issues" ]; then
    echo "  ⚠️  No sub-issues found for epic #$epic_num"
    # Update with cleaned body (removing Sub-Issues section if it existed)
    echo "$new_body" | gh issue edit "$epic_num" --repo "$REPO" --body-file -
    continue
  fi
  
  # Count sub-issues
  count=$(echo "$sub_issues" | wc -l | xargs)
  echo "  Found $count sub-issues"
  
  # Build tasklist WITHOUT header (GitHub will auto-detect and create sub-issue relationship)
  tasklist=""
  while IFS= read -r sub_num; do
    if [ -n "$tasklist" ]; then
      tasklist="$tasklist"$'\n'
    fi
    tasklist="$tasklist- [ ] #$sub_num"
  done <<< "$sub_issues"
  
  # Combine: original body + blank line + tasklist (no header)
  final_body="$new_body"$'\n\n'"$tasklist"
  
  # Update epic
  echo "  Updating epic..."
  echo "$final_body" | gh issue edit "$epic_num" --repo "$REPO" --body-file -
  
  echo "  ✅ Fixed $count sub-issues for epic #$epic_num"
  sleep 0.5
done

echo ""
echo "✅ All sub-issues fixed!"
