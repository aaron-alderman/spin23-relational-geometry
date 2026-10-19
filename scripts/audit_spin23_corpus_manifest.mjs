import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const write = process.argv.includes("--write");
const manifestName = "spin23_corpus_manifest.json";
const governanceFiles = [
  "00_research_document_map.md",
  "30_research_frontier.md",
  "40_grand_synthesis_spin23_pole.md",
  "49_multi_branch_research_registry.md",
  "91_multi_branch_active_goal_log.md",
];
const includedDirectories = [
  "applications",
  "assets",
  "claimipedia-discovery-campaigns",
  "claimipedia-research-method",
  "data",
  "LICENSES",
  "orientation-claimipedia-pilot",
  "scripts",
  "sourcery-mcp-admission",
  "spin23-action-pilot",
  "test",
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
    if (entry.name === manifestName) continue;
    const absolute = join(directory, entry.name);
    const rel = posix(relative(root, absolute));
    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) files.push(...walk(absolute));
    } else if (entry.isFile()) {
      files.push(rel);
    }
  }
  return files;
}

function sha256(file) {
  return createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
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

const topLevelFiles = readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name !== manifestName)
  .map((entry) => entry.name);
const numberedDocuments = topLevelFiles
  .map((name) => ({ name, match: /^(\d+)_.*\.md$/i.exec(name) }))
  .filter(({ match }) => match)
  .map(({ name, match }) => ({ id: Number(match[1]), name }))
  .sort((a, b) => a.id - b.id || a.name.localeCompare(b.name));
const latestId = Math.max(...numberedDocuments.map(({ id }) => id));
const latestDocuments = numberedDocuments.filter(({ id }) => id === latestId).map(({ name }) => name);
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
    return { file, mentionsLatest: latestDocuments.every((latest) => text.includes(latest)) };
  });
const brokenCoreLinks = governanceFiles
  .concat(latestDocuments, ["README.md", "LICENSE.md", "CHRISTIAN_STEWARDSHIP_COVENANT.md", "THIRD_PARTY_NOTICES.md", "REPOSITORY_PROPOSAL.md"])
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
  bytes: statSync(join(root, file)).size,
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
  sourceRootName: "grand-theory",
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
