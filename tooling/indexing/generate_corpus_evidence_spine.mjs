#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, normalize, resolve, sep } from "node:path";

const root = resolve(process.cwd());
const manifestPath = "corpus/registers/spin23_corpus_manifest.json";
const jsonPath = "corpus/registers/corpus_evidence_spine.json";
const markdownPath = "corpus/EVIDENCE_SPINE.md";
const write = process.argv.includes("--write");
const check = process.argv.includes("--check");

const posix = value => value.split(sep).join("/");
const absolute = value => join(root, value);
const readText = value => readFileSync(absolute(value), "utf8").replaceAll("\r\n", "\n");
const digest = value => createHash("sha256").update(value).digest("hex");
const fileDigest = value => digest(readFileSync(absolute(value)));
const canonicalBytes = bytes => bytes.includes(0) ? bytes : Buffer.from(bytes.toString("utf8").replaceAll("\r\n", "\n"), "utf8");
const manifest = JSON.parse(readText(manifestPath));
const manifestEntries = new Map(manifest.files.map(entry => [entry.path, entry]));
const claimPaths = manifest.files
  .map(entry => entry.path)
  .filter(path => /^corpus\/claims\/\d{4}-\d{4}\/\d+_.+\.md$/u.test(path))
  .sort();
const claimPathSet = new Set(claimPaths);
// Derived navigation surfaces can link back into the claim corpus. Treating
// those links as source observations makes the evidence spine depend on the
// byte identity of its own consumers and creates a regeneration cycle with
// the front door. They are verified independently and are not evidence input.
const derivedConsumerPaths = new Set([
  "corpus/EVIDENCE_SPINE.md",
  "corpus/FRONT_DOOR.md",
  "corpus/programmes/frontier-physics-targets/full_corpus_gate_census_v1.md",
]);
const identityCache = new Map();

function identity(path) {
  if (identityCache.has(path)) return identityCache.get(path);
  const canonical = manifestEntries.get(path) ?? null;
  if (!existsSync(absolute(path))) {
    const result = { path, canonical, observed: null, state: "missing" };
    identityCache.set(path, result);
    return result;
  }
  if (lstatSync(absolute(path)).isDirectory()) {
    const result = { path, canonical, observed: { type: "directory" }, state: canonical ? "canonical-match" : "observed-outside-manifest" };
    identityCache.set(path, result);
    return result;
  }
  const raw = readFileSync(absolute(path));
  const canonicalized = canonicalBytes(raw);
  const observed = {
    bytes: canonicalized.length,
    sha256: digest(canonicalized),
    rawBytes: raw.length,
    rawSha256: digest(raw),
    lineEndingNormalizationApplied: raw.length !== canonicalized.length,
  };
  const result = {
    path,
    canonical,
    observed,
    state: canonical?.sha256 === observed.sha256 && canonical?.bytes === observed.bytes ? "canonical-match" : "working-copy-divergence",
  };
  identityCache.set(path, result);
  return result;
}

function resolveLocalTarget(source, rawTarget) {
  let target = rawTarget.trim();
  if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
  if (/^(?:https?:|mailto:|codex:|data:|#)/iu.test(target)) return null;
  target = target.split("#", 1)[0].split("?", 1)[0];
  if (!target || /[\\|{}]/u.test(target)) return null;
  try { target = decodeURIComponent(target); } catch { /* preserve malformed target for diagnostics */ }
  const resolved = posix(normalize(join(dirname(source), target)));
  if (!existsSync(absolute(resolved))) return { path: resolved, state: "missing" };
  if (lstatSync(absolute(resolved)).isDirectory()) {
    const readme = posix(join(resolved, "README.md"));
    return { path: existsSync(absolute(readme)) ? readme : resolved, state: "observed" };
  }
  return { path: resolved, state: "observed" };
}

function roleFor(path, section, line) {
  const declared = /^\s*\*\*(Evidence|Certificates?|Sources?)\s*:\*\*/iu.exec(line)?.[1]
    ?? /^(Evidence|Certificates?|Sources?)(?:\s|$)/iu.exec(section)?.[1]
    ?? null;
  if (path?.startsWith("evidence/")) return { role: "evidence", roleState: /^Evidence/iu.test(declared ?? "") ? "observed" : "inferred", basis: /^Evidence/iu.test(declared ?? "") ? "declared evidence field or section" : "target namespace" };
  if (path?.startsWith("verification/")) return { role: "certificate", roleState: /^Certificate/iu.test(declared ?? "") ? "observed" : "inferred", basis: /^Certificate/iu.test(declared ?? "") ? "declared certificate field or section" : "target namespace" };
  if (declared) {
    if (/^Evidence/iu.test(declared)) return { role: "evidence", roleState: "observed", basis: "declared field or section" };
    if (/^Certificate/iu.test(declared)) return { role: "certificate", roleState: "observed", basis: "declared field or section" };
    return { role: "source", roleState: "observed", basis: "declared field or section" };
  }
  if (path && claimPathSet.has(path)) return { role: "related-claim", roleState: "inferred", basis: "target namespace" };
  return { role: "local-reference", roleState: "inferred", basis: "target namespace" };
}

function linksIn(path) {
  const lines = readText(path).split("\n");
  const links = [];
  let section = "";
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const heading = /^#{1,6}\s+(.+?)\s*$/u.exec(line);
    if (heading) section = heading[1];
    for (const match of line.matchAll(/!?\[([^\]]*)\]\(([^)]+)\)/gu)) {
      const rawTarget = match[2].trim();
      if (/^https?:/iu.test(rawTarget)) {
        const declaredSource = /^Sources?(?:\s|$)/iu.test(section) || /^\s*\*\*Sources?\s*:\*\*/iu.test(line);
        links.push({
          target: { url: rawTarget },
          state: "observed",
          role: "source",
          roleState: declaredSource ? "observed" : "inferred",
          roleBasis: declaredSource ? "declared source field or section" : "external reference in claim",
          observation: { path, line: index + 1, label: match[1] },
        });
        continue;
      }
      const target = resolveLocalTarget(path, rawTarget);
      if (!target) continue;
      const role = roleFor(target.path, section, line);
      links.push({
        target: { path: target.path },
        state: target.state,
        role: role.role,
        roleState: role.roleState,
        roleBasis: role.basis,
        observation: { path, line: index + 1, label: match[1] },
      });
    }
  }
  return links;
}

function firstHeading(text) {
  return /^#\s+(.+)$/mu.exec(text)?.[1].trim() ?? null;
}

function metadata(text, key) {
  const pattern = new RegExp(`^\\*\\*${key}:\\*\\*\\s*(.+?)(?:\\s{2,})?$`, "gimu");
  return [...text.matchAll(pattern)].map(match => ({ value: match[1].trim(), line: text.slice(0, match.index).split("\n").length }));
}

function scopedVerdicts(text) {
  const lines = text.split("\n");
  const values = [];
  for (let index = 0; index < lines.length; index += 1) {
    const heading = /^#{2,4}\s+(Verdict|Referee verdict|Result(?: in one sentence)?|Conclusion|Status)\s*$/iu.exec(lines[index]);
    if (!heading) continue;
    let value = "";
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (/^#{1,6}\s+/u.test(lines[cursor])) break;
      if (!value && lines[cursor].trim()) value = lines[cursor].trim();
    }
    values.push({ label: heading[1], value: value || null, line: index + 1 });
  }
  return values;
}

function inferredVerdictSignals(title) {
  const patterns = [
    ["no-go-or-obstruction", /\b(?:no[- ]go|cannot|fails?|obstruct(?:s|ion)?|impossible|not enough|does not)\b/iu],
    ["conditional", /\b(?:conditional(?:ly)?|only if|requires?)\b/iu],
    ["exact-or-closed", /\b(?:exact(?:ly)?|closes?|complete(?:s|d)?|unique)\b/iu],
    ["open-or-unresolved", /\b(?:open|unresolved|missing|candidate|conjecture)\b/iu],
    ["exhaustion", /\b(?:exhaust(?:s|ed|ion)?|stopping boundar(?:y|ies))\b/iu],
  ];
  return patterns.filter(([, pattern]) => pattern.test(title ?? "")).map(([signal]) => ({ signal, state: "inferred", basis: "title lexical pattern" }));
}

const claims = claimPaths.map(path => {
  const text = readText(path);
  const title = firstHeading(text);
  const links = linksIn(path);
  const statuses = metadata(text, "Status");
  const scopes = metadata(text, "Scope");
  const verdicts = scopedVerdicts(text);
  const signals = inferredVerdictSignals(title);
  return {
    key: `${path}#sha256:${manifestEntries.get(path).sha256}`,
    legacyId: Number(/^.*\/(\d+)_/u.exec(path)?.[1]),
    identity: identity(path),
    title: { value: title, state: title ? "observed" : "missing", observation: title ? { path, line: 1 } : null },
    declarations: {
      status: statuses.map(item => ({ ...item, state: "observed", observation: { path, line: item.line } })),
      scope: scopes.map(item => ({ ...item, state: "observed", observation: { path, line: item.line } })),
      scopedVerdict: verdicts.map(item => ({ ...item, state: "observed", observation: { path, line: item.line } })),
    },
    inferredVerdictSignals: signals,
    links,
    inboundReferences: [],
    coverage: {},
  };
});

const claimByPath = new Map(claims.map(claim => [claim.identity.path, claim]));
const markdownPaths = manifest.files
  .map(entry => entry.path)
  .filter(path => path.endsWith(".md") && existsSync(absolute(path)) && !derivedConsumerPaths.has(path));
for (const source of markdownPaths) {
  if (claimPathSet.has(source)) continue;
  const lines = readText(source).split("\n");
  let sourceIdentity = null;
  for (let index = 0; index < lines.length; index += 1) {
    for (const match of lines[index].matchAll(/!?\[([^\]]*)\]\(([^)]+)\)/gu)) {
      const target = resolveLocalTarget(source, match[2]);
      if (!target || target.state !== "observed" || !claimByPath.has(target.path)) continue;
      sourceIdentity ??= identity(source);
      claimByPath.get(target.path).inboundReferences.push({
      state: "observed",
      semanticRole: "consumer-candidate",
      semanticRoleState: "inferred",
      semanticRoleBasis: "non-claim document links to claim",
      source: { path: sourceIdentity.path },
      observation: { path: source, line: index + 1, label: match[1] },
    });
    }
  }
}

for (const claim of claims) {
  const relationCoverage = role => {
    const links = claim.links.filter(link => link.role === role && link.state === "observed");
    if (links.some(link => link.roleState === "observed")) return "observed";
    return links.length ? "inferred" : "missing";
  };
  const verdictState = claim.declarations.status.length || claim.declarations.scopedVerdict.length
    ? "observed"
    : claim.inferredVerdictSignals.length ? "inferred" : "missing";
  claim.coverage = {
    source: relationCoverage("source"),
    evidence: relationCoverage("evidence"),
    certificate: relationCoverage("certificate"),
    scopedVerdict: verdictState,
    knownConsumer: claim.inboundReferences.length ? "inferred" : "missing",
  };
}

const duplicateLegacyIds = [...new Map(claims.map(claim => [claim.legacyId, []])).keys()]
  .map(id => ({ id, paths: claims.filter(claim => claim.legacyId === id).map(claim => claim.identity.path) }))
  .filter(item => item.paths.length > 1);
const dimensions = ["source", "evidence", "certificate", "scopedVerdict", "knownConsumer"];
const coverage = Object.fromEntries(dimensions.map(dimension => [dimension, Object.fromEntries(["observed", "inferred", "missing"].map(state => [state, claims.filter(claim => claim.coverage[dimension] === state).length]))]));
const brokenLinks = claims.flatMap(claim => claim.links.filter(link => link.state === "missing").map(link => ({ claim: claim.identity.path, ...link })));
const workingCopyDivergences = claims.filter(claim => claim.identity.state === "working-copy-divergence").map(claim => claim.identity.path);
const linkedObjectPaths = [...new Set(claims.flatMap(claim => [
  ...claim.links.filter(link => link.state === "observed" && link.target.path).map(link => link.target.path),
  ...claim.inboundReferences.map(reference => reference.source.path),
]))].sort();

const spine = {
  schema: "spin23-corpus-evidence-spine/v1",
  // A derived index must be reproducible from its canonical input. Wall-clock
  // time is not evidence and made clean-checkout regeneration change bytes.
  generatedAt: manifest.generatedAt,
  purpose: "A read-only structural join from claims to exact references, declared evidence and certificates, scoped verdict text, and inbound consumer candidates.",
  authorityBoundary: "Observed means text or identity present in the retained repository. Inferred means a reversible path or lexical classification, never scientific promotion. Missing means the join was not found, not that the underlying evidence does not exist. This index grants no scheduling, publication, runtime, corpus-admission, or scientific authority.",
  source: {
    canonicalManifest: { path: manifestPath, sha256: fileDigest(manifestPath), generatedAt: manifest.generatedAt },
    contentBasis: "current working-copy text, paired with canonical manifest identity and divergence state",
  },
  objectIdentities: linkedObjectPaths.map(identity),
  passed: claims.length === manifest.summary.numberedDocumentCount && brokenLinks.length === 0,
  summary: {
    claims: claims.length,
    uniqueLegacyIds: new Set(claims.map(claim => claim.legacyId)).size,
    duplicateLegacyIds: duplicateLegacyIds.length,
    canonicalIdentityMatches: claims.length - workingCopyDivergences.length,
    workingCopyDivergences: workingCopyDivergences.length,
    observedLinks: claims.flatMap(claim => claim.links).filter(link => link.state === "observed").length,
    missingLinks: brokenLinks.length,
    inboundConsumerCandidates: claims.reduce((sum, claim) => sum + claim.inboundReferences.length, 0),
    coverage,
  },
  diagnostics: { duplicateLegacyIds, workingCopyDivergences, brokenLinks },
  claims,
};

const coverageRows = dimensions.map(dimension => `| ${dimension} | ${coverage[dimension].observed} | ${coverage[dimension].inferred} | ${coverage[dimension].missing} |`).join("\n");
const markdown = `# Corpus evidence spine\n\nThis generated surface joins each numbered claim to its exact retained identity and the evidence-bearing links that can be observed in repository text. The complete, drill-down-preserving record is [\`registers/corpus_evidence_spine.json\`](registers/corpus_evidence_spine.json).\n\nIt is deliberately conservative:\n\n- **observed** means an exact declaration, link, path, line, byte count, or hash was found;\n- **inferred** means a reversible namespace, inbound-reference, or title-pattern classification was applied;\n- **missing** means this generator found no join, not that no evidence or consumer exists.\n\nThe spine never promotes a claim, converts a passing script into a broader proof, treats an inbound link as endorsement, or changes the canonical manifest. Its text basis is the current working tree; each record separately carries the canonical manifest identity and reports divergence.\n\n## Coverage\n\n${spine.summary.claims} claim documents are indexed by path plus canonical SHA-256. There are ${spine.summary.uniqueLegacyIds} unique legacy numeric IDs and ${spine.summary.duplicateLegacyIds} preserved collision(s). ${spine.summary.canonicalIdentityMatches} claim files match their canonical identity; ${spine.summary.workingCopyDivergences} differ in the working copy.\n\n| Join | Observed | Inferred | Missing |\n|---|---:|---:|---:|\n${coverageRows}\n\nThe index contains ${spine.summary.observedLinks} observed outgoing links, ${spine.summary.inboundConsumerCandidates} inbound consumer candidates, and ${spine.summary.missingLinks} unresolved local claim links.\n\n## Record contract\n\nEach claim record contains a collision-safe \`key\`, canonical and observed file identity, exact title/status/scope/verdict observations, inferred title signals, typed outgoing links, inbound references, and per-dimension coverage. Observed identity uses the manifest's CRLF-normalized byte convention for direct comparison and also retains raw on-disk bytes and SHA-256. Every link and declaration retains its source path and line. Semantic roles inferred from filenames, namespaces, or backlinks are explicitly marked inferred.\n\nRegenerate or check from the repository root:\n\n\`\`\`powershell\nnode tooling/indexing/generate_corpus_evidence_spine.mjs --write\nnode tooling/indexing/generate_corpus_evidence_spine.mjs --check\nnode --test tests/repository/corpus_evidence_spine.test.mjs\n\`\`\`\n`;

const json = `${JSON.stringify(spine, null, 2)}\n`;
if (write) {
  writeFileSync(absolute(jsonPath), json);
  writeFileSync(absolute(markdownPath), markdown);
}
if (check) {
  const comparable = JSON.parse(json);
  delete comparable.generatedAt;
  const existing = existsSync(absolute(jsonPath)) ? JSON.parse(readText(jsonPath)) : null;
  if (existing) delete existing.generatedAt;
  if (!existing || JSON.stringify(existing) !== JSON.stringify(comparable)) {
    console.error(`${jsonPath} is stale; run this generator with --write`);
    process.exitCode = 1;
  }
  if (!existsSync(absolute(markdownPath)) || readText(markdownPath) !== markdown) {
    console.error(`${markdownPath} is stale; run this generator with --write`);
    process.exitCode = 1;
  }
}
console.log(JSON.stringify({ passed: spine.passed, summary: spine.summary, wrote: write ? [jsonPath, markdownPath] : [] }, null, 2));
if (!spine.passed) process.exitCode = 1;
