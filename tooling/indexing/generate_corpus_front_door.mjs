#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, normalize, relative, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const routesPath = "corpus/front-door.routes.json";
const manifestPath = "corpus/registers/spin23_corpus_manifest.json";
const jsonPath = "corpus/registers/corpus_front_door.json";
const markdownPath = "corpus/FRONT_DOOR.md";
const write = process.argv.includes("--write");
const check = process.argv.includes("--check");

const posix = value => value.split(sep).join("/");
const absolute = value => join(root, value);
const readJson = value => JSON.parse(readFileSync(absolute(value), "utf8"));
const canonicalBytes = value => {
  const bytes = readFileSync(absolute(value));
  if (bytes.includes(0)) return bytes;
  return Buffer.from(bytes.toString("utf8").replaceAll("\r\n", "\n"), "utf8");
};
const sha256 = value => createHash("sha256").update(canonicalBytes(value)).digest("hex");
const observedBytes = value => existsSync(absolute(value)) && !lstatSync(absolute(value)).isDirectory() ? canonicalBytes(value).length : 0;

const routes = readJson(routesPath);
const manifest = readJson(manifestPath);
const manifestEntries = new Map(manifest.files.map(entry => [entry.path, entry]));
const controlFiles = [
  routesPath,
  jsonPath,
  markdownPath,
  "corpus/EVIDENCE_SPINE.md",
  "corpus/registers/corpus_evidence_spine.json",
  "tooling/indexing/generate_corpus_front_door.mjs",
  "tooling/indexing/generate_corpus_evidence_spine.mjs",
  "tests/repository/corpus_front_door.test.mjs",
  "tests/repository/corpus_evidence_spine.test.mjs",
];
const inventory = [...new Set([...manifestEntries.keys(), manifestPath, ...controlFiles])].sort();
const inventorySet = new Set(inventory);

function classify(path) {
  const rules = [
    [/^corpus\/claims\//u, ["claims", "append-only claim and provenance ledger"]],
    [/^corpus\/programmes\//u, ["programmes", "bounded research programmes, registers, and closure work"]],
    [/^corpus\/syntheses\//u, ["syntheses", "current and thesis-scale interpretive surfaces"]],
    [/^corpus\/governance\//u, ["governance", "repository and publication governance"]],
    [/^corpus\/registers\//u, ["registers", "machine-readable inventory, state, and audit records"]],
    [/^corpus\//u, ["corpus-navigation", "canonical corpus navigation, vocabulary, and reading rules"]],
    [/^book\//u, ["reader-editions", "curated reader-facing editions"]],
    [/^verification\//u, ["verification", "executable certificates and verification navigation"]],
    [/^evidence\//u, ["evidence", "data, figures, and retained observations"]],
    [/^integrations\//u, ["integrations", "application and publication boundary packets"]],
    [/^tooling\//u, ["tooling", "generation, audit, migration, and publication utilities"]],
    [/^tests\//u, ["tests", "repository and publication invariants"]],
    [/^docs\//u, ["generated-publication", "generated deployable reading surfaces"]],
    [/^legal\//u, ["legal", "legal notices and policy"]],
    [/^\.github\//u, ["automation", "repository workflow automation"]],
    [/^(?:inspect_capability_rule|supervisor_query)\.py$/u, ["tooling", "tracked root-level corpus inspection utilities"]],
    [/^(?:README\.md|AGENTS\.md|llms\.txt|LICENSE\.md|THIRD_PARTY_NOTICES\.md|CHRISTIAN_STEWARDSHIP_COVENANT\.md|CONTRIBUTING\.md|\.gitignore|\.gitattributes)$/u, ["repository-front-door", "root navigation, machine retrieval, agent guidance, stewardship, contribution, legal, and text-identity surfaces"]],
  ];
  for (const [pattern, result] of rules) if (pattern.test(path)) return { zone: result[0], reason: result[1] };
  return null;
}

function resolveTarget(source, rawTarget) {
  let target = rawTarget.trim();
  if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
  if (/^(?:https?:|mailto:|codex:|data:|#)/iu.test(target)) return null;
  target = target.split("#", 1)[0].split("?", 1)[0];
  if (!target) return null;
  // TeX commonly contains link-shaped fragments such as theta[q](0|Omega).
  // These characters are not used by this repository's local Markdown paths.
  if (/[\\|{}]/u.test(target)) return null;
  try { target = decodeURIComponent(target); } catch { /* retain malformed path for diagnostics */ }
  const resolved = posix(normalize(join(dirname(source), target)));
  if (!existsSync(absolute(resolved))) return { path: resolved, broken: true };
  if (lstatSync(absolute(resolved)).isDirectory()) {
    const readme = posix(join(resolved, "README.md"));
    return existsSync(absolute(readme)) ? { path: readme, broken: false } : { path: resolved, broken: false };
  }
  return { path: resolved, broken: false };
}

const linkCache = new Map();

function localLinks(path) {
  if (linkCache.has(path)) return linkCache.get(path);
  if (!path.toLowerCase().endsWith(".md") || !existsSync(absolute(path))) return [];
  const text = readFileSync(absolute(path), "utf8");
  const links = [...text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/gu)]
    .map(match => resolveTarget(path, match[1]))
    .filter(Boolean);
  linkCache.set(path, links);
  return links;
}

function closure(seeds) {
  const visited = new Set();
  const broken = [];
  const edges = [];
  const queue = [...seeds];
  while (queue.length) {
    const source = queue.shift();
    if (visited.has(source) || !existsSync(absolute(source))) continue;
    visited.add(source);
    for (const target of localLinks(source)) {
      edges.push({ source, target: target.path });
      if (target.broken) {
        broken.push({ source, target: target.path });
      } else if (!visited.has(target.path)) {
        queue.push(target.path);
      }
    }
  }
  return {
    files: [...visited].sort(),
    edges: edges.sort((a, b) => a.source.localeCompare(b.source) || a.target.localeCompare(b.target)),
    broken: broken.sort((a, b) => a.source.localeCompare(b.source) || a.target.localeCompare(b.target)),
  };
}

const roots = routes.routes.flatMap(route => route.roots.map(item => ({ ...item, routeId: route.id, routeTitle: route.title })));
const rootById = new Map(roots.map(item => [item.id, item]));
const rootErrors = [];
for (const item of roots) {
  if (!existsSync(absolute(item.path))) rootErrors.push(`missing root ${item.id}: ${item.path}`);
  for (const field of ["epistemicStatus", "authority", "provenance"]) if (!item[field]) rootErrors.push(`root ${item.id} lacks ${field}`);
}
const duplicateRootIds = roots.map(item => item.id).filter((id, index, all) => all.indexOf(id) !== index);
for (const id of duplicateRootIds) rootErrors.push(`duplicate root id: ${id}`);

const classifications = inventory.map(path => ({ path, ...classify(path) })).filter(item => item.zone);
const unmapped = inventory.filter(path => !classify(path));
const allRootClosure = closure(roots.map(item => item.path));
const rootDirectBroken = roots.flatMap(item => localLinks(item.path).filter(link => link.broken).map(link => ({ source: item.path, target: link.path })));

const zones = new Map();
for (const item of classifications) {
  const current = zones.get(item.zone) ?? { id: item.zone, reason: item.reason, files: 0, canonicalBytes: 0, reachableFiles: 0 };
  current.files += 1;
  current.canonicalBytes += manifestEntries.get(item.path)?.bytes ?? 0;
  if (allRootClosure.files.includes(item.path)) current.reachableFiles += 1;
  zones.set(item.zone, current);
}

const profiles = routes.minimumViableProfiles.map(profile => {
  const missingRootIds = profile.rootIds.filter(id => !rootById.has(id));
  const seeds = profile.rootIds.map(id => rootById.get(id)?.path).filter(Boolean);
  const requiredPaths = profile.requiredPaths ?? [];
  const missingRequiredPaths = requiredPaths.filter(path => !existsSync(absolute(path)));
  const entryPaths = [...new Set([...seeds, ...requiredPaths])].sort();
  const result = closure(seeds);
  return {
    ...profile,
    missingRootIds,
    missingRequiredPaths,
    roots: seeds,
    entrySurface: {
      files: entryPaths.length,
      canonicalBytes: entryPaths.reduce((sum, path) => sum + (manifestEntries.get(path)?.bytes ?? 0), 0),
      observedBytes: entryPaths.reduce((sum, path) => sum + observedBytes(path), 0),
      unknownByteFiles: entryPaths.filter(path => !manifestEntries.has(path)).length,
      paths: entryPaths,
    },
    discoverableClosure: {
      files: result.files.length,
      canonicalBytes: result.files.reduce((sum, path) => sum + (manifestEntries.get(path)?.bytes ?? 0), 0),
      observedBytes: result.files.reduce((sum, path) => sum + observedBytes(path), 0),
      unknownByteFiles: result.files.filter(path => !manifestEntries.has(path)).length,
      brokenLinks: result.broken,
      pathSetSha256: createHash("sha256").update(result.files.join("\n")).digest("hex"),
    },
    qualification: "map-only; independently qualify any derived package and add execution dependencies for the selected capability",
  };
});

const errors = [
  ...rootErrors,
  ...unmapped.map(path => `unclassified inventory object: ${path}`),
  ...rootDirectBroken.map(item => `broken direct root link from ${item.source}: ${item.target}`),
  ...profiles.flatMap(profile => profile.missingRootIds.map(id => `profile ${profile.id} references missing root id ${id}`)),
  ...profiles.flatMap(profile => profile.missingRequiredPaths.map(path => `profile ${profile.id} requires missing path ${path}`)),
];

const atlas = {
  schema: "spin23-corpus-front-door/v1",
  principle: routes.principle,
  authorityBoundary: routes.authorityBoundary,
  source: {
    routes: { path: routesPath, sha256: sha256(routesPath) },
    canonicalInventory: {
      path: manifestPath,
      schema: manifest.schema,
      generatedAt: manifest.generatedAt,
      passed: manifest.passed,
      summary: manifest.summary,
      sha256: sha256(manifestPath),
    },
    inventoryBasis: "canonical manifest plus the declared front-door control surfaces",
  },
  passed: errors.length === 0,
  summary: {
    routes: routes.routes.length,
    roots: roots.length,
    inventoryObjects: inventory.length,
    reachableObjects: allRootClosure.files.filter(path => inventorySet.has(path)).length,
    explicitlyClassifiedObjects: classifications.length,
    unclassifiedObjects: unmapped.length,
    rootClosureLinks: allRootClosure.edges.length,
    closureBrokenLinks: allRootClosure.broken.length,
  },
  routes: routes.routes,
  zones: [...zones.values()].sort((a, b) => a.id.localeCompare(b.id)),
  minimumViableProfiles: profiles,
  diagnostics: {
    errors,
    unclassifiedObjects: unmapped,
    directRootBrokenLinks: rootDirectBroken,
    closureBrokenLinks: allRootClosure.broken,
  },
};

const humanBytes = value => {
  if (value >= 1024 ** 2) return `${(value / 1024 ** 2).toFixed(1)} MiB`;
  if (value >= 1024) return `${(value / 1024).toFixed(1)} KiB`;
  return `${value} B`;
};

const routeSections = atlas.routes.map(route => {
  const rows = route.roots.map(item => `| [${item.id}](${relative("corpus", item.path).replaceAll("\\", "/")}) | ${item.epistemicStatus} | ${item.authority} | ${item.provenance} |`).join("\n");
  return `## ${route.title}\n\n${route.purpose}\n\n| Root | Status | Authority | Provenance |\n|---|---|---|---|\n${rows}`;
}).join("\n\n");

const profileRows = atlas.minimumViableProfiles.map(profile =>
  `| ${profile.title} | ${profile.rootIds.map(id => `\`${id}\``).join(", ")} | ${profile.entrySurface.files} | ${humanBytes(profile.entrySurface.observedBytes)} | ${profile.discoverableClosure.files} | ${humanBytes(profile.discoverableClosure.observedBytes)} |`,
).join("\n");
const zoneRows = atlas.zones.map(zone => `| ${zone.id} | ${zone.files} | ${zone.reachableFiles} | ${humanBytes(zone.canonicalBytes)} | ${zone.reason} |`).join("\n");

const markdown = `# Corpus front door\n\n> ${atlas.principle}\n\nThis is a generated atlas, not a claim of truth or completeness. Its machine-readable twin is [\`registers/corpus_front_door.json\`](registers/corpus_front_door.json); its declared roots live in [\`front-door.routes.json\`](front-door.routes.json). Drill down from those roots to exact corpus objects, then use the [canonical file manifest](registers/spin23_corpus_manifest.json) for path, byte and hash identity.\n\n**Authority boundary.** ${atlas.authorityBoundary}\n\n**Coverage.** ${atlas.summary.roots} declared roots across ${atlas.summary.routes} routes; ${atlas.summary.inventoryObjects} retained inventory objects; ${atlas.summary.reachableObjects} objects reachable through local links; ${atlas.summary.explicitlyClassifiedObjects} objects explicitly classified; ${atlas.summary.unclassifiedObjects} unclassified. The atlas ${atlas.passed ? "passes" : "does not pass"} its structural checks.\n\n${routeSections}\n\n## Minimum viable profiles\n\nA minimum dataset is capability-specific, not one universal subset. The **declared core** contains the named roots and explicit resolution/execution dependencies. The **discoverable closure** follows every local Markdown link and is an upper bound for browsing, not a packaging dependency graph: citations, backlinks and navigation are deliberately richer than what execution requires. Displayed sizes are observed working-copy bytes so newly generated control surfaces remain visible; canonical bytes and unknown-manifest counts remain separate in the machine record.\n\n| Capability | Roots | Declared core files | Observed core bytes | Discoverable files | Observed discoverable bytes |\n|---|---|---:|---:|---:|---:|\n${profileRows}\n\nThese profiles are map-only candidates, not admitted packages. Before extracting one, add the selected capability's exact runtime, provenance and falsification dependencies, then independently qualify the derived artifact. Use the full sealed or canonical corpus when custody, exact release reproduction, history, or unknown future questions matter.\n\n## Interior zones\n\nReachability measures what the declared entrances actually expose through local links. Classification accounts for the rest without pretending that navigation alone proves relevance. A zero in the reachable column is therefore a map defect to inspect, not automatic permission to delete.\n\n| Zone | Objects | Reachable | Canonical bytes | Explicit classification |\n|---|---:|---:|---:|---|\n${zoneRows}\n\n## Structural contract\n\nThe generator fails its admission check when a declared root is missing, lacks epistemic status/authority/provenance, contains a broken direct local link, references an unknown profile root or required path, or leaves an inventory object unclassified. Broken links deeper in the closure remain visible in the machine diagnostics because historical material can contain intentionally unresolved or externally restored references.\n\nRegenerate or check from the repository root:\n\n\`\`\`powershell\nnode tooling/indexing/generate_corpus_front_door.mjs --write\nnode tooling/indexing/generate_corpus_front_door.mjs --check\nnode --test tests/repository/corpus_front_door.test.mjs\n\`\`\`\n`;

const json = `${JSON.stringify(atlas, null, 2)}\n`;
if (write) {
  writeFileSync(absolute(jsonPath), json);
  writeFileSync(absolute(markdownPath), markdown);
}
if (check) {
  for (const [path, expected] of [[jsonPath, json], [markdownPath, markdown]]) {
    if (!existsSync(absolute(path)) || readFileSync(absolute(path), "utf8").replaceAll("\r\n", "\n") !== expected) {
      console.error(`${path} is stale; run this generator with --write`);
      process.exitCode = 1;
    }
  }
}
console.log(JSON.stringify({ passed: atlas.passed, summary: atlas.summary, errors, wrote: write ? [jsonPath, markdownPath] : [] }, null, 2));
if (!atlas.passed) process.exitCode = 1;
