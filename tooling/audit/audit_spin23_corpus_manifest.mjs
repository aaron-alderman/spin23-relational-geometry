import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const write = process.argv.includes("--write");
const manifestName = "corpus/registers/spin23_corpus_manifest.json";
const claimsDirectory = "corpus/claims";
const governanceFiles = [
  "corpus/claims/0000-0099/00_research_document_map.md",
  "corpus/claims/0000-0099/30_research_frontier.md",
  "corpus/claims/0000-0099/40_grand_synthesis_spin23_pole.md",
  "corpus/claims/0000-0099/49_multi_branch_research_registry.md",
  "corpus/claims/0000-0099/91_multi_branch_active_goal_log.md",
];
const includedDirectories = [
  ".github",
  "book",
  "corpus",
  "docs",
  "evidence",
  "integrations",
  "legal",
  "tests",
  "tooling",
  "verification",
];
const excludedDirectories = new Set([
  ".codex-remote-attachments",
  ".corpus-review",
  ".git",
  ".research-cache",
  ".venv-alpaca",
  ".worktrees",
  "external",
  "node_modules",
  "__pycache__",
]);

function posix(path) {
  return path.split(sep).join("/");
}

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    const rel = posix(relative(root, absolute));
    if (rel === manifestName) continue;
    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) files.push(...walk(absolute));
    } else if (entry.isFile()) {
      files.push(rel);
    }
  }
  return files;
}

function sha256(file) {
  return createHash("sha256").update(canonicalFileBytes(file)).digest("hex");
}

function canonicalFileBytes(file) {
  const bytes = readFileSync(join(root, file));
  if (bytes.includes(0)) return bytes;
  return Buffer.from(bytes.toString("utf8").replaceAll("\r\n", "\n"), "utf8");
}

function localMarkdownLinks(file) {
  const text = readFileSync(join(root, file), "utf8");
  const links = [];
  const regex = /\]\(([^)]+)\)/g;
  for (const match of text.matchAll(regex)) {
    let target = match[1].trim();
    if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
    if (/^(?:https?:|mailto:|codex:|#)/i.test(target)) continue;
    target = target.split("#", 1)[0].split("?", 1)[0];
    if (!target) continue;
    try {
      target = decodeURIComponent(target);
    } catch {
      // Preserve malformed legacy links so the existence check reports them.
    }
    links.push({ source: file, target: posix(join(dirname(file), target)) });
  }
  return links;
}

const topLevelFiles = readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => entry.name);
const numberedDocuments = walk(join(root, claimsDirectory))
  .map((path) => ({ path, name: path.split("/").at(-1), match: /^(\d+)_.*\.md$/i.exec(path.split("/").at(-1)) }))
  .filter(({ match }) => match)
  .map(({ path, name, match }) => ({ id: Number(match[1]), name, path }))
  .sort((a, b) => a.id - b.id || a.name.localeCompare(b.name));
const latestId = Math.max(...numberedDocuments.map(({ id }) => id));
const latestDocumentRecords = numberedDocuments.filter(({ id }) => id === latestId);
const latestDocuments = latestDocumentRecords.map(({ path }) => path);
const byId = new Map();
for (const document of numberedDocuments) {
  const names = byId.get(document.id) ?? [];
  names.push(document.name);
  byId.set(document.id, names);
}
const duplicateIds = [...byId.entries()]
  .filter(([, names]) => names.length > 1)
  .map(([id, names]) => ({ id, files: names }));

const missingGovernanceFiles = governanceFiles.filter((file) => !existsSync(join(root, file)));
const governanceCurrent = governanceFiles
  .filter((file) => existsSync(join(root, file)))
  .map((file) => {
    const text = readFileSync(join(root, file), "utf8");
    return { file, mentionsLatest: latestDocumentRecords.every(({ name }) => text.includes(name)) };
  });
const brokenCoreLinks = governanceFiles
  .concat(latestDocuments, ["README.md", "LICENSE.md", "CHRISTIAN_STEWARDSHIP_COVENANT.md", "THIRD_PARTY_NOTICES.md", "corpus/governance/REPOSITORY_PROPOSAL.md"])
  .filter((file, index, all) => all.indexOf(file) === index && existsSync(join(root, file)))
  .flatMap(localMarkdownLinks)
  .filter(({ target }) => !existsSync(join(root, target)));

const repositoryFiles = [
  ...topLevelFiles,
  ...includedDirectories.filter((directory) => existsSync(join(root, directory))).flatMap((directory) => walk(join(root, directory))),
]
  .filter((file, index, all) => all.indexOf(file) === index)
  .sort();
const repositoryEntries = repositoryFiles.map((file) => ({
  path: file,
  bytes: canonicalFileBytes(file).length,
  sha256: sha256(file),
}));

const errors = [
  ...missingGovernanceFiles.map((file) => `missing governance file: ${file}`),
  ...governanceCurrent.filter(({ mentionsLatest }) => !mentionsLatest).map(({ file }) => `governance file does not mention latest document: ${file}`),
  ...brokenCoreLinks.map(({ source, target }) => `broken local link from ${source}: ${target}`),
];
const warnings = duplicateIds.map(({ id, files }) => `duplicate legacy document id ${id}: ${files.join(", ")}`);
const manifest = {
  schema: "spin23-corpus-manifest/v1",
  generatedAt: new Date().toISOString(),
  sourceRootName: "spin23-relational-geometry",
  proposedRepositoryScope: "owned corpus files; excludes external checkouts, caches, local environments and private review state",
  passed: errors.length === 0,
  summary: {
    latestDocumentId: latestId,
    latestDocuments,
    numberedDocumentCount: numberedDocuments.length,
    repositoryFileCount: repositoryEntries.length,
    repositoryBytes: repositoryEntries.reduce((sum, entry) => sum + entry.bytes, 0),
  },
  governanceCurrent,
  duplicateIds,
  brokenCoreLinks,
  errors,
  warnings,
  excludedDirectories: [...excludedDirectories].sort(),
  files: repositoryEntries,
};

if (write) writeFileSync(join(root, manifestName), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({
  passed: manifest.passed,
  summary: manifest.summary,
  governanceCurrent,
  errors,
  warnings,
  wrote: write ? manifestName : null,
}, null, 2));
if (!manifest.passed) process.exitCode = 1;
