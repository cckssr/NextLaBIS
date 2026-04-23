#!/bin/bash
set -e

REPO="cckssr/NextLaBIS"

# Epic issue numbers (§2-§39 = #62-#99)
EPIC_START=62
EPIC_END=99

echo "🔗 Linking sub-issues to parent epics..."
echo ""

for epic_num in $(seq $EPIC_START $EPIC_END); do
  echo "Processing Epic #$epic_num..."
  
  # Get all sub-issues that reference this epic
  sub_issues=$(gh issue list --repo "$REPO" --search "\"Parent Epic\" #$epic_num in:body" --json number --limit 200 | jq -r '.[].number' | sort -n)
  
  if [ -z "$sub_issues" ]; then
    echo "  ⚠️  No sub-issues found for epic #$epic_num"
    continue
  fi
  
  # Count sub-issues
  count=$(echo "$sub_issues" | wc -l | xargs)
  echo "  Found $count sub-issues"
  
  # Get current epic body
  echo "  Fetching current body..."
  current_body=$(gh issue view "$epic_num" --repo "$REPO" --json body -q .body)
  
  # Build tasklist
  tasklist="## Sub-Issues"
  while IFS= read -r sub_num; do
    tasklist="$tasklist"$'\n'"- [ ] #$sub_num"
  done <<< "$sub_issues"
  
  # Append tasklist to epic body
  new_body="$current_body"$'\n\n'"$tasklist"
  
  # Update epic with new body
  echo "  Updating epic..."
  echo "$new_body" | gh issue edit "$epic_num" --repo "$REPO" --body-file -
  
  echo "  ✅ Linked $count sub-issues to epic #$epic_num"
  sleep 0.5
done

echo ""
echo "✅ All sub-issues linked to their parent epics!"
