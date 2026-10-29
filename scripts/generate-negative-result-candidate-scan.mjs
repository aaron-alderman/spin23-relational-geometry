import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const corpusRoot = path.join(root, "corpus");
const outputPath = path.join(root, "evidence", "data", "negative-result-candidate-scan-v1.json");
const excludedPrefix = "corpus/programmes/negative-results/";
const maximumCandidates = 300;

const patterns = [
  ["structural_no_go", /\b(?:no[- ]go|non[- ]injectiv|impossib|cannot uniquely|rank deficien|exact obstruction)\b/i, 6],
  ["conditional_obstruction", /\b(?:obstruction|counterexample|fails? under|insufficient under|only if|unless)\b/i, 4],
  ["implementation_failure", /\b(?:implementation failure|failed run|did not converge|did not improve|regression|brittle)\b/i, 3],
  ["inconclusive_test", /\b(?:inconclusive|underdetermined|not identifiable|cannot decide|insufficient evidence|missing datum)\b/i, 5],
  ["reopening", /\b(?:reopen(?:ing)? condition|would reopen|repair route|successor route)\b/i, 2],
  ["falsifier", /\b(?:falsifier|falsification|negative control|refused inference)\b/i, 2]
];

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (entry.name.endsWith(".md")) files.push(absolute);
  }
  return files;
}

function relative(absolute) {
  return path.relative(root, absolute).replaceAll("\\", "/");
}

const files = walk(corpusRoot)
  .filter((file) => !relative(file).startsWith(excludedPrefix))
  .sort();

const candidates = [];
for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
  const termCounts = {};
  const samples = [];
  let score = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;
    const hits = [];
    for (const [label, matcher, weight] of patterns) {
      if (matcher.test(line)) {
        termCounts[label] = (termCounts[label] ?? 0) + 1;
        score += weight;
        hits.push(label);
      }
    }
    if (hits.length && samples.length < 3) {
      samples.push({ line: index + 1, labels: hits, text: line.slice(0, 300) });
    }
  }
  if (score > 0) candidates.push({ path: relative(file), score, termCounts, samples });
}

candidates.sort((left, right) => right.score - left.score || left.path.localeCompare(right.path));
const retained = candidates.slice(0, maximumCandidates);
const output = {
  schemaVersion: "negative-result-candidate-scan-v1",
  date: "2026-10-28",
  status: "candidate_only_not_admitted",
  admissionRule: "A lexical match is retrieval evidence only. Human adjudication against the negative-result schema is required before admission.",
  scannedDocuments: files.length,
  matchedDocuments: candidates.length,
  retainedCandidates: retained.length,
  truncatedCandidates: Math.max(0, candidates.length - retained.length),
  patterns: patterns.map(([label, , weight]) => ({ label, weight })),
  candidates: retained
};

if (process.argv.includes("--write")) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`WROTE ${path.relative(root, outputPath)} (${retained.length}/${candidates.length} candidates)`);
} else {
  console.log(JSON.stringify(output, null, 2));
}
