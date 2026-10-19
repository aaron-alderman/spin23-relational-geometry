import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, normalize, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const posix = value => value.split(sep).join("/");

if (existsSync(join(root, "corpus", "claims")) && !existsSync(join(root, "00_research_document_map.md"))) {
  console.log(JSON.stringify({ status: "already-migrated", corpus: "corpus/claims" }, null, 2));
  process.exit(0);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if ([".git", "node_modules"].includes(entry.name)) return [];
    const absolute = join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [posix(relative(root, absolute))];
  });
}

function claimBucket(id) {
  const first = Math.floor(id / 100) * 100;
  return `${String(first).padStart(4, "0")}-${String(first + 99).padStart(4, "0")}`;
}

function programmePath(name) {
  if (name.startsWith("freudenthal_")) return `corpus/programmes/freudenthal/${name}`;
  if (name.startsWith("frontier_epistemology_")) return `corpus/programmes/epistemology/${name}`;
  if (name.startsWith("frontier_parallel_")) return `corpus/programmes/frontier/parallel/${name}`;
  if (name.startsWith("frontier_wave2_")) return `corpus/programmes/frontier/wave-2/${name}`;
  if (name.startsWith("frontier_wave3_")) return `corpus/programmes/frontier/wave-3/${name}`;
  if (name.startsWith("frontier_wave4_")) return `corpus/programmes/frontier/wave-4/${name}`;
  if (name.startsWith("frontier_wave5_")) return `corpus/programmes/frontier/wave-5/${name}`;
  if (name.startsWith("programme_closure_")) return `corpus/programmes/closure/${name}`;
  if (name.startsWith("programme_foundations_")) return `corpus/programmes/foundations/${name}`;
  if (name.startsWith("programme_lane_expansion_")) return `corpus/programmes/lane-expansion/${name}`;
  if (name.startsWith("representation_trunk_")) return `corpus/programmes/representation/${name}`;
  if (name === "orientation_architecture.md") return `corpus/programmes/orientation/${name}`;
  if (name.startsWith("programme_")) return `corpus/registers/programme/${name}`;
  return null;
}

function destination(source) {
  if (source.startsWith("evidence/figures/")) return `evidence/figures/${source.slice("evidence/figures/".length)}`;
  if (source.startsWith("evidence/data/")) return `evidence/evidence/data/${source.slice("evidence/data/".length)}`;
  if (source.startsWith("LICENSES/")) return `legal/third-party/${source.slice("LICENSES/".length)}`;
  if (source.startsWith("integrations/claimipedia/discovery-campaigns/")) return `integrations/claimipedia/discovery-campaigns/${source.slice("integrations/claimipedia/discovery-campaigns/".length)}`;
  if (source.startsWith("integrations/claimipedia/research-method/")) return `integrations/claimipedia/research-method/${source.slice("integrations/claimipedia/research-method/".length)}`;
  if (source.startsWith("integrations/claimipedia/orientation-pilot/")) return `integrations/claimipedia/orientation-pilot/${source.slice("integrations/claimipedia/orientation-pilot/".length)}`;
  if (source.startsWith("integrations/sourcery/mcp-admission/")) return `integrations/sourcery/mcp-admission/${source.slice("integrations/sourcery/mcp-admission/".length)}`;
  if (source === "test/edition3_book_preview.test.mjs") return "tests/publication/edition3_book_preview.test.mjs";
  if (source.startsWith("book/edition-3/") && /^book\/edition-3\/\d{2}-.*\.md$/u.test(source)) {
    return source.replace("book/edition-3/", "book/edition-3/chapters/");
  }
  if (source.startsWith("scripts/")) {
    const name = source.slice("scripts/".length);
    if (["audit_markdown_links.mjs", "audit_spin23_corpus_manifest.mjs"].includes(name)) return `tooling/audit/${name}`;
    if (name === "generate_edition3_book_preview.mjs") return `tooling/publication/${name}`;
    const verb = /^([a-z]+)(?:_|-)/u.exec(name)?.[1] ?? "other";
    return `verification/${verb}/${name}`;
  }
  if (source.includes("/")) return source;

  const claim = /^(\d+)_.*\.md$/iu.exec(source);
  if (claim) return `corpus/claims/${claimBucket(Number(claim[1]))}/${source}`;
  if (source === "aarons_spin23_research_thesis.md") return `corpus/syntheses/grand-synthesis/${source}`;
  if (source === "claimipedia_sync_status_2026-10-19.md") return `corpus/governance/${source}`;
  if (source === "REPOSITORY_PROPOSAL.md") return `corpus/governance/${source}`;
  if (source === "corpus/registers/spin23_corpus_manifest.json") return "corpus/registers/corpus/registers/spin23_corpus_manifest.json";
  if (source.startsWith("reflexive_closure_claimipedia_")) return `integrations/claimipedia/manifests/${source}`;
  return programmePath(source) ?? source;
}

const files = walk(root);
const moves = new Map(files.map(source => [source, destination(source)]).filter(([source, target]) => source !== target));

for (const [source, target] of moves) {
  if (existsSync(join(root, target))) throw new Error(`Destination exists: ${target}`);
  mkdirSync(dirname(join(root, target)), { recursive: true });
  renameSync(join(root, source), join(root, target));
}

function rewriteMarkdownLinks(text, oldSource, newSource) {
  return text.replace(/(!?\[[^\]]*\])\((<?)([^)\s>]+)(>?)(\s+"[^"]*")?\)/gu, (whole, label, open, rawTarget, close, title = "") => {
    if (/^(?:https?:|mailto:|data:|codex:|#)/iu.test(rawTarget)) return whole;
    const hashAt = rawTarget.search(/[?#]/u);
    const pathPart = hashAt === -1 ? rawTarget : rawTarget.slice(0, hashAt);
    const suffix = hashAt === -1 ? "" : rawTarget.slice(hashAt);
    let decoded;
    try { decoded = decodeURIComponent(pathPart); } catch { decoded = pathPart; }
    const oldTarget = posix(normalize(join(dirname(oldSource), decoded)));
    const newTarget = moves.get(oldTarget) ?? oldTarget;
    if (newTarget === oldTarget && newSource === oldSource) return whole;
    let next = posix(relative(dirname(newSource), newTarget));
    if (!next) next = ".";
    return `${label}(${open}${next}${suffix}${close}${title})`;
  });
}

function rewriteRootPaths(text) {
  return text
    .replace(/scripts\/([A-Za-z0-9_.-]+\.mjs)/gu, (whole, name) => moves.get(`scripts/${name}`) ?? whole)
    .replaceAll("corpus/registers/spin23_corpus_manifest.json", "corpus/registers/corpus/registers/spin23_corpus_manifest.json")
    .replaceAll("integrations/claimipedia/discovery-campaigns/", "integrations/claimipedia/discovery-campaigns/")
    .replaceAll("integrations/claimipedia/research-method/", "integrations/claimipedia/research-method/")
    .replaceAll("integrations/claimipedia/orientation-pilot/", "integrations/claimipedia/orientation-pilot/")
    .replaceAll("integrations/sourcery/mcp-admission/", "integrations/sourcery/mcp-admission/")
    .replaceAll("evidence/figures/", "evidence/figures/")
    .replaceAll("evidence/data/", "evidence/evidence/data/");
}

for (const oldSource of files) {
  const newSource = moves.get(oldSource) ?? oldSource;
  const absolute = join(root, newSource);
  if (!existsSync(absolute) || statSync(absolute).size === 0) continue;
  const extension = extname(newSource).toLowerCase();
  if (![".md", ".mjs", ".json", ".yml", ".yaml", ".html", ".css", ".txt"].includes(extension)) continue;
  const bytes = readFileSync(absolute);
  if (bytes.includes(0)) continue;
  let text = bytes.toString("utf8");
  if (extension === ".md") text = rewriteMarkdownLinks(text, oldSource, newSource);
  text = rewriteRootPaths(text);
  writeFileSync(absolute, text);
}

console.log(JSON.stringify({ movedFiles: moves.size, destinations: [...new Set([...moves.values()].map(path => path.split("/")[0]))].sort() }, null, 2));
