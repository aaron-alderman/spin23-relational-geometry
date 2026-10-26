import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const write = process.argv.includes("--write");
const trackedOnly = process.argv.includes("--tracked-only");
const manifestName = "corpus/registers/spin23_corpus_manifest.json";
const derivedReleaseSurfaces = new Set([
  // These generated navigation/search surfaces bind back to the canonical
  // manifest or to one another. They remain independently freshness-tested,
  // but including their bytes here would make the manifest self-referential.
  "corpus/EVIDENCE_SPINE.md",
  "corpus/FRONT_DOOR.md",
  "corpus/registers/corpus_evidence_spine.json",
  "corpus/registers/corpus_front_door.json",
  "corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.json",
  "corpus/programmes/frontier-physics-targets/documentation_linking_retrieval_gate_v1.md",
  "corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.json",
  "corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.md",
  "tooling/search/benchmark_baseline_v1.json",
  "tooling/search/sourcery_admission_candidate_v1.json",
]);
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
const candidateFiles = execFileSync(
  "git",
  trackedOnly ? ["ls-files"] : ["ls-files", "--cached", "--others", "--exclude-standard"],
  { cwd: root, encoding: "utf8" },
).split(/\r?\n/).filter(Boolean).map(posix);
const presentCandidateFiles = candidateFiles.filter((file) => existsSync(join(root, file)));

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
const numberedDocuments = presentCandidateFiles
  .filter((path) => path.startsWith(`${claimsDirectory}/`))
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

const repositoryFiles = presentCandidateFiles
  .filter((file) => file !== manifestName)
  .filter((file) => !derivedReleaseSurfaces.has(file))
  // Release receipts attest a frozen projection and are deliberately outside
  // the content inventory they certify. They remain tracked audit evidence.
  .filter((file) => !file.startsWith("verification/releases/"))
  .filter((file) => !file.includes("/") || includedDirectories.some((directory) => file.startsWith(`${directory}/`)))
  .filter((file, index, all) => all.indexOf(file) === index)
  .sort();
const repositoryEntries = repositoryFiles.map((file) => ({
  path: file,
  bytes: canonicalFileBytes(file).length,
  sha256: sha256(file),
}));

// Accretive ledgers preserve provenance; standalone syntheses must not be
// forced to narrate repository chronology. `mentionsLatest` remains a useful
// diagnostic, while freshness is established by the complete file hashes.
const errors = [
  ...missingGovernanceFiles.map((file) => `missing governance file: ${file}`),
  ...brokenCoreLinks.map(({ source, target }) => `broken local link from ${source}: ${target}`),
];
const warnings = duplicateIds.map(({ id, files }) => `duplicate legacy document id ${id}: ${files.join(", ")}`);
const manifest = {
  schema: "spin23-corpus-manifest/v1",
  generatedAt: "2026-10-25T00:00:00.000Z",
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
  excludedDerivedReleaseSurfaces: [...derivedReleaseSurfaces].sort(),
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
