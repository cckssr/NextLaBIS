#!/bin/bash
set -e

REPO="cckssr/NextLaBIS"

# Epic issue numbers (§2-§39 = #62-#99)
EPIC_START=62
EPIC_END=99

echo "🧹 Removing sub-issue task lists from epics..."
echo ""

for epic_num in $(seq $EPIC_START $EPIC_END); do
  echo "Processing Epic #$epic_num..."
  
  # Get current epic body
  echo "  Fetching current body..."
  current_body=$(gh issue view "$epic_num" --repo "$REPO" --json body -q .body)
  
  # Remove everything from "## Sub-Issues" onwards
  cleaned_body=$(echo "$current_body" | sed '/^## Sub-Issues$/,$d')
  
  # Also remove any trailing task list items (in case there's no header)
  # Remove lines that match "- [ ] #" or "- [x] #" at the end
  cleaned_body=$(echo "$cleaned_body" | sed -E ':a; $!{N; ba}; s/(\n- \[([ x])\] #[0-9]+)+$//')
  
  # Remove trailing whitespace
  cleaned_body=$(echo "$cleaned_body" | sed -e :a -e '/^\s*$/d;N;ba')
  
  # Update epic with cleaned body
  echo "  Updating epic..."
  echo "$cleaned_body" | gh issue edit "$epic_num" --repo "$REPO" --body-file -
  
  echo "  ✅ Cleaned epic #$epic_num"
  sleep 0.3
done

echo ""
echo "✅ All task lists removed from epics!"
