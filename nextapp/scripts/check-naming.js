import fs from "fs";
import path from "path";

const RULES = {
  components: {
    pattern: /^[A-Z][a-zA-Z0-9]*\.tsx?$/,
    description: "Component files must use PascalCase",
  },
  utils: {
    pattern: /^[a-z][a-z0-9_]*\.tsx?$/,
    description: "Utility files must use snake_case or camelCase",
  },
  default: {
    pattern: /^[a-z][a-z0-9_-]*\.(tsx?|jsx?)$/,
    description: "Files must be lowercase with hyphens or underscores",
  },
};

function checkDir(dir, category = "default") {
  const rule = RULES[category] || RULES.default;
  const files = fs.readdirSync(dir);
  const violations = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === "components") {
        violations.push(...checkDir(fullPath, "components"));
      } else if (file === "utils") {
        violations.push(...checkDir(fullPath, "utils"));
      } else {
        violations.push(...checkDir(fullPath, category));
      }
    } else if (!rule.pattern.test(file)) {
      violations.push(`${fullPath}: ${rule.description}`);
    }
  });

  return violations;
}

const violations = checkDir("src");

if (violations.length > 0) {
  console.error("❌ File naming violations found:");
  violations.forEach((v) => console.error(`  ${v}`));
  process.exit(1);
}

console.log("✅ All files follow naming conventions");
