#!/usr/bin/env node

/**
 * TODO-to-Issues Script
 *
 * This script has two modes:
 *
 * 1. SCAN MODE (default):
 *    Scans the codebase for TODO/FIXME/FEAT comments and outputs
 *    a JSON file that can be enhanced by the Copilot agent.
 *
 * 2. CREATE MODE (--create):
 *    Reads the enhanced JSON file and creates GitHub Issues,
 *    then updates the code comments with issue numbers.
 *
 * Usage:
 *   npm run sync-todos              # Scan and output JSON
 *   npm run sync-todos:create       # Create issues from JSON
 *   npm run sync-todos -- --dry-run # Preview without changes
 *
 * Workflow:
 *   1. Run `npm run sync-todos` to generate todo-issues.json
 *   2. Ask Copilot to enhance the JSON with detailed descriptions
 *   3. Run `npm run sync-todos:create` to create the issues
 *
 * Environment Variables:
 *   GITHUB_TOKEN       Required for --create mode
 *   GITHUB_PROJECT_ID  Optional. GitHub Projects v2 ID for auto-linking
 *   GITHUB_OWNER       Optional. Repository owner (default: cckssr)
 *   GITHUB_REPO        Optional. Repository name (default: NextLaBIS)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  owner: process.env.GITHUB_OWNER || "cckssr",
  repo: process.env.GITHUB_REPO || "NextLaBIS",
  token: process.env.GITHUB_TOKEN || process.env.GH_PAT,
  projectId: process.env.GITHUB_PROJECT_ID,
  srcDir: path.resolve(__dirname, "../src"),
  jsonPath: path.resolve(__dirname, "../todo-issues.json"),
  extensions: [".ts", ".tsx", ".js", ".jsx"],
  dryRun: process.argv.includes("--dry-run"),
  createMode: process.argv.includes("--create"),
  verbose: process.argv.includes("--verbose"),
};

// Comment patterns to match
const COMMENT_PATTERNS = [
  // Single-line: // TODO: text or // TODO(#123): text
  {
    regex: /^(\s*)\/\/\s*(TODO|FIXME|FEAT)(?:\(#(\d+)\))?:?\s*(.+)$/,
    type: "single",
  },
  // JSX comment: {/* TODO: text */}
  {
    regex:
      /^(\s*)\{\/\*\s*(TODO|FIXME|FEAT)(?:\(#(\d+)\))?:?\s*(.+?)\s*\*\/\}$/,
    type: "jsx",
  },
  // Block comment single line: /* TODO: text */
  {
    regex: /^(\s*)\/\*\s*(TODO|FIXME|FEAT)(?:\(#(\d+)\))?:?\s*(.+?)\s*\*\/$/,
    type: "block",
  },
];

// Phase detection patterns
const PHASE_PATTERNS = [
  { regex: /phase\s*0/i, label: "phase:0-foundations" },
  { regex: /phase\s*1/i, label: "phase:1-api-integration" },
  { regex: /phase\s*2/i, label: "phase:2-eln-features" },
];

// Feature detection based on file path
const FEATURE_PATTERNS = [
  { path: "components/dashboard/", label: "feature:dashboard" },
  { path: "components/spaces/", label: "feature:spaces" },
  { path: "components/objects/", label: "feature:object-view" },
  { path: "components/masterdata/", label: "feature:masterdata" },
  { path: "components/shell/", label: "feature:shell" },
  { path: "components/shared/", label: "feature:shared" },
  { path: "lib/model/", label: "feature:type-system" },
  { path: "lib/spaces/", label: "feature:spaces" },
  { path: "lib/objects/", label: "feature:object-view" },
  { path: "lib/collections/", label: "feature:collections" },
  { path: "lib/projects/", label: "feature:projects" },
];

// Priority mapping
const PRIORITY_MAP = {
  FIXME: "High",
  TODO: "Medium",
  FEAT: "Medium",
};

/**
 * Main entry point
 */
async function main() {
  if (process.argv.includes("--help")) {
    console.log(`
TODO-to-Issues Script

USAGE:
  npm run sync-todos              Scan codebase and generate todo-issues.json
  npm run sync-todos:create       Create GitHub issues from todo-issues.json
  npm run sync-todos -- --dry-run Preview scan without writing files

WORKFLOW:
  1. Run 'npm run sync-todos' to scan and generate JSON
  2. (Optional) Ask Copilot to enhance descriptions in the JSON
  3. Run 'npm run sync-todos:create' to create issues on GitHub

OPTIONS:
  --dry-run   Preview without writing files or creating issues
  --create    Create issues from existing todo-issues.json
  --verbose   Show detailed output
  --help      Show this help message
`);
    process.exit(0);
  }

  console.log("🔍 TODO-to-Issues Script");
  console.log("=".repeat(50));

  if (CONFIG.createMode) {
    await runCreateMode();
  } else {
    await runScanMode();
  }
}

/**
 * SCAN MODE: Find TODOs and output JSON
 */
async function runScanMode() {
  console.log(`Mode: SCAN${CONFIG.dryRun ? " (dry-run)" : ""}`);
  console.log(`Source: ${CONFIG.srcDir}`);
  console.log(`Output: ${CONFIG.jsonPath}`);
  console.log("");

  // Find all TODO comments
  const todos = await scanDirectory(CONFIG.srcDir);
  console.log(`\n📋 Found ${todos.length} TODO/FIXME/FEAT comments\n`);

  // Filter out already-tracked TODOs
  const untrackedTodos = todos.filter((todo) => !todo.issueNumber);
  const trackedTodos = todos.filter((todo) => todo.issueNumber);

  console.log(`   📌 Already tracked: ${trackedTodos.length}`);
  console.log(`   🆕 Untracked: ${untrackedTodos.length}\n`);

  if (untrackedTodos.length === 0) {
    console.log("✅ All TODOs are already tracked");
    process.exit(0);
  }

  // Build JSON structure for each TODO
  const issueData = untrackedTodos.map((todo) => buildIssueData(todo));

  // Output JSON
  const output = {
    $schema: "./todo-issues.schema.json",
    generatedAt: new Date().toISOString(),
    repository: `${CONFIG.owner}/${CONFIG.repo}`,
    totalFound: todos.length,
    alreadyTracked: trackedTodos.length,
    issues: issueData,
  };

  if (CONFIG.dryRun) {
    console.log("\n📄 Would write to todo-issues.json:");
    console.log(JSON.stringify(output, null, 2));
  } else {
    fs.writeFileSync(CONFIG.jsonPath, JSON.stringify(output, null, 2));
    console.log(`\n✅ Written to: ${CONFIG.jsonPath}`);
    console.log("\nNext steps:");
    console.log("  1. Review and enhance the descriptions in todo-issues.json");
    console.log(
      "  2. Or ask Copilot: 'Enhance the todo-issues.json with detailed descriptions'",
    );
    console.log("  3. Run: npm run sync-todos:create");
  }
}

/**
 * CREATE MODE: Read JSON and create GitHub issues
 */
async function runCreateMode() {
  console.log(`Mode: CREATE${CONFIG.dryRun ? " (dry-run)" : ""}`);
  console.log(`Input: ${CONFIG.jsonPath}`);
  console.log("");

  if (!CONFIG.dryRun && !CONFIG.token) {
    console.error("❌ Error: GITHUB_TOKEN environment variable is required");
    console.error("   Set it in .env.local or export it in your shell:");
    console.error("   export GITHUB_TOKEN=ghp_xxxx");
    process.exit(1);
  }

  // Read JSON file
  if (!fs.existsSync(CONFIG.jsonPath)) {
    console.error(`❌ Error: ${CONFIG.jsonPath} not found`);
    console.error("   Run 'npm run sync-todos' first to generate it");
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(CONFIG.jsonPath, "utf8"));
  const issues = data.issues.filter((issue) => !issue.created);

  console.log(`📋 Found ${issues.length} issues to create\n`);

  if (issues.length === 0) {
    console.log("✅ All issues already created");
    process.exit(0);
  }

  const results = {
    created: [],
    errors: [],
  };

  for (const issue of issues) {
    try {
      if (CONFIG.dryRun) {
        console.log(`📝 Would create: ${issue.title}`);
        console.log(`   Labels: ${issue.labels.join(", ")}`);
        console.log(`   File: ${issue.sourceLocation}`);
        console.log("");
        continue;
      }

      // Check for existing issue
      const existing = await findExistingIssue(issue.sourceLocation);
      if (existing) {
        console.log(
          `⏭️  Skipped: ${issue.sourceLocation} (Issue #${existing.number} exists)`,
        );
        issue.created = true;
        issue.issueNumber = existing.number;
        issue.issueUrl = existing.html_url;
        continue;
      }

      // Create the issue
      const created = await createGitHubIssue(issue);
      console.log(
        `✅ Created: #${created.number} - ${issue.title.substring(0, 50)}...`,
      );

      // Update issue data
      issue.created = true;
      issue.issueNumber = created.number;
      issue.issueUrl = created.html_url;

      // Update the source file
      updateFileWithIssueNumber(issue, created.number);

      results.created.push({
        issueNumber: created.number,
        title: issue.title,
        url: created.html_url,
      });

      // Add to project if configured
      if (CONFIG.projectId) {
        await addToProject(created.node_id, issue);
      }
    } catch (error) {
      console.error(
        `❌ Error creating issue for ${issue.sourceLocation}: ${error.message}`,
      );
      results.errors.push({
        sourceLocation: issue.sourceLocation,
        error: error.message,
      });
    }
  }

  // Save updated JSON
  if (!CONFIG.dryRun) {
    fs.writeFileSync(CONFIG.jsonPath, JSON.stringify(data, null, 2));
    console.log(`\n📄 Updated: ${CONFIG.jsonPath}`);
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📊 Summary");
  console.log("=".repeat(50));
  console.log(`Issues created: ${results.created.length}`);
  console.log(`Errors: ${results.errors.length}`);

  if (results.errors.length > 0) {
    console.log("\n❌ Errors:");
    for (const error of results.errors) {
      console.log(`   ${error.sourceLocation} - ${error.error}`);
    }
  }
}

/**
 * Recursively scan directory for TODO comments
 */
async function scanDirectory(dir) {
  const todos = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith(".") || entry.name === "node_modules") {
        continue;
      }
      todos.push(...(await scanDirectory(fullPath)));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (CONFIG.extensions.includes(ext)) {
        todos.push(...scanFile(fullPath));
      }
    }
  }

  return todos;
}

/**
 * Scan a single file for TODO comments
 */
function scanFile(filePath) {
  const todos = [];
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const relativePath = path.relative(CONFIG.srcDir, filePath);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    for (const pattern of COMMENT_PATTERNS) {
      const match = line.match(pattern.regex);
      if (match) {
        const [, indent, type, existingIssue, text] = match;

        todos.push({
          file: relativePath,
          fullPath: filePath,
          line: lineNumber,
          type: type.toUpperCase(),
          text: text.trim(),
          indent: indent,
          originalLine: line,
          issueNumber: existingIssue ? parseInt(existingIssue, 10) : null,
          commentType: pattern.type,
          context: getContext(lines, i),
        });
        break;
      }
    }
  }

  return todos;
}

/**
 * Get surrounding context (5 lines before and after)
 */
function getContext(lines, index) {
  const start = Math.max(0, index - 5);
  const end = Math.min(lines.length - 1, index + 5);
  return lines.slice(start, end + 1).join("\n");
}

/**
 * Build issue data structure from TODO
 */
function buildIssueData(todo) {
  const title = `[${todo.type}] ${todo.text}`.substring(0, 100);
  const labels = [
    "type:tech-debt",
    "source:code-comment",
    "status:needs-scoping",
  ];

  // Add type-specific labels
  if (todo.type === "FIXME") {
    labels.push("priority:high");
  }

  // Detect phase from text
  for (const phase of PHASE_PATTERNS) {
    if (phase.regex.test(todo.text)) {
      labels.push(phase.label);
      break;
    }
  }

  // Detect feature from path
  for (const feature of FEATURE_PATTERNS) {
    if (todo.file.includes(feature.path)) {
      labels.push(feature.label);
      break;
    }
  }

  const phase = detectPhaseText(todo.text);
  const priority = PRIORITY_MAP[todo.type] || "Medium";

  return {
    // Identification
    sourceLocation: `${todo.file}:${todo.line}`,
    sourceType: todo.type,
    commentType: todo.commentType,
    fullPath: todo.fullPath,

    // Issue content (can be enhanced by Copilot)
    title: title,
    description: `<!-- ENHANCE THIS: Add a detailed description of what needs to be done -->

${todo.text}`,
    body: `## Summary

<!-- ENHANCE THIS: Write 2-3 sentences explaining what needs to be done and why -->

${todo.text}

## Source Location

**File:** \`${todo.file}\`
**Line:** ${todo.line}

## Current Code Context

\`\`\`typescript
${todo.context}
\`\`\`

## Analysis

<!-- ENHANCE THIS: Analyze the code context and explain:
- What the TODO is asking for
- Why this work is needed
- Any dependencies or related code
- Potential implementation approach
-->

## Suggested Implementation

<!-- ENHANCE THIS: Provide concrete steps to implement this -->

- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Acceptance Criteria

- [ ] The TODO is addressed
- [ ] Code passes linting and type checks
- [ ] TODO comment updated with issue number

## Phase Alignment

${phase}

## Priority

${priority}

---

*This issue was generated from a code comment. Please review and enhance the description.*
`,

    // Labels
    labels: labels,
    phase: phase,
    priority: priority,

    // Status (updated after creation)
    created: false,
    issueNumber: null,
    issueUrl: null,
  };
}

/**
 * Detect phase text for issue body
 */
function detectPhaseText(text) {
  for (const phase of PHASE_PATTERNS) {
    if (phase.regex.test(text)) {
      switch (phase.label) {
        case "phase:0-foundations":
          return "Phase 0 (Visual-First)";
        case "phase:1-api-integration":
          return "Phase 1 (API Integration)";
        case "phase:2-eln-features":
          return "Phase 2 (Advanced Features)";
      }
    }
  }
  return "Future / Nice-to-have";
}

/**
 * Find existing issue by source location
 */
async function findExistingIssue(sourceLocation) {
  const query = `repo:${CONFIG.owner}/${CONFIG.repo} is:issue label:source:code-comment "${sourceLocation}" in:body`;

  try {
    const response = await fetch(
      `https://api.github.com/search/issues?q=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${CONFIG.token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data.items?.[0] || null;
  } catch (error) {
    console.warn(
      `⚠️  Warning: Could not check for duplicates: ${error.message}`,
    );
    return null;
  }
}

/**
 * Create GitHub issue via REST API
 */
async function createGitHubIssue(issue) {
  const response = await fetch(
    `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONFIG.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: issue.title,
        body: issue.body,
        labels: issue.labels,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Update file with issue number in the TODO comment
 */
function updateFileWithIssueNumber(issue, issueNumber) {
  const content = fs.readFileSync(issue.fullPath, "utf8");
  const lines = content.split("\n");
  const [, lineStr] = issue.sourceLocation.split(":");
  const lineIndex = parseInt(lineStr, 10) - 1;

  let updatedLine;
  const originalLine = lines[lineIndex];

  // Replace TYPE: with TYPE(#123):
  updatedLine = originalLine.replace(
    new RegExp(`(${issue.sourceType}):?\\s*`),
    `$1(#${issueNumber}): `,
  );

  lines[lineIndex] = updatedLine;
  fs.writeFileSync(issue.fullPath, lines.join("\n"), "utf8");

  if (CONFIG.verbose) {
    console.log(`   📝 Updated: ${issue.sourceLocation}`);
    console.log(`   Old: ${originalLine.trim()}`);
    console.log(`   New: ${updatedLine.trim()}`);
  }
}

/**
 * Add issue to GitHub Project v2 via GraphQL
 */
async function addToProject(issueNodeId, issue) {
  const mutation = `
    mutation AddToProject($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {
        projectId: $projectId
        contentId: $contentId
      }) {
        item {
          id
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CONFIG.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          projectId: CONFIG.projectId,
          contentId: issueNodeId,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL error: ${response.status}`);
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    if (CONFIG.verbose) {
      console.log(`   📊 Added to project`);
    }
  } catch (error) {
    console.warn(`⚠️  Warning: Could not add to project: ${error.message}`);
  }
}

// Run main
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
