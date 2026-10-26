#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, normalize, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";

const root = resolve(process.cwd());
const write = process.argv.includes("--write");
const laneRoot = join(root, "corpus", "programmes", "programme-algebra");
const outputRoot = join(laneRoot, "generated");
const importPath = join(laneRoot, "programme_algebra_imports_v1.json");
const profilePath = join(laneRoot, "programme_algebra_profiles_v1.json");
const imports = JSON.parse(readFileSync(importPath, "utf8"));
const profiles = JSON.parse(readFileSync(profilePath, "utf8"));
const kernelCoordinates = profiles.kernel.coordinates;
const signatureFields = ["domain", "rank", "variance", "basis", "regime", "order", "scheme", "symmetry", "cp", "support"];
const dimensionFields = ["mass", "length", "time", "current", "temperature", "amount", "luminousIntensity"];

const posix = value => value.split(sep).join("/");
const sha256 = value => createHash("sha256").update(value).digest("hex");
const stable = value => {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stable(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
};
const stableHash = value => sha256(stable(value));
const objectId = (kind, value) => `${kind}::${value}`;
const relationId = value => `relation::${stableHash(value).slice(0, 24)}`;
const anchorId = value => String(value).normalize("NFKD").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/gu, "");

function walk(directory) {
  const output = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    const path = posix(relative(root, absolute));
    if (imports.corpus.excludePrefixes.some(prefix => path.startsWith(prefix))) continue;
    if (entry.isDirectory()) output.push(...walk(absolute));
    else if (entry.isFile() && extname(entry.name).toLowerCase() === imports.corpus.extension) output.push(path);
  }
  return output.sort();
}

function declaredField(text, labelPattern) {
  return new RegExp(`^\\*\\*(?:${labelPattern}):\\*\\*\\s*(.+)$`, "imu").exec(text)?.[1]?.trim() ?? null;
}

function titleOf(text, path) {
  return /^#\s+(.+)$/mu.exec(text)?.[1]?.trim() ?? path.split("/").at(-1).replace(/\.md$/iu, "").replaceAll("_", " ");
}

function sectionRole(heading) {
  if (/\b(result|theorem|proposition|finding)\b/iu.test(heading)) return "result";
  if (/\b(boundary|limit|non-implication|does not close|no-go|obstruction)\b/iu.test(heading)) return "boundary";
  if (/\b(open|remain|frontier|next|look-here)\b/iu.test(heading)) return "frontier";
  if (/\b(implication|meaning|consequence)\b/iu.test(heading)) return "implication";
  if (/\b(reproduction|verification|certificate|test)\b/iu.test(heading)) return "verification-instruction";
  if (/\b(source|evidence|reference|literature)\b/iu.test(heading)) return "evidence-context";
  return "discourse-section";
}

function parseSections(text, documentPath, documentId, inherited) {
  const lines = text.split(/\r?\n/u);
  const headings = [];
  let fenced = false;
  for (let index = 0; index < lines.length; index += 1) {
    if (/^\s*(?:```|~~~)/u.test(lines[index])) { fenced = !fenced; continue; }
    if (fenced) continue;
    const match = /^(#{1,6})\s+(.+)$/u.exec(lines[index]);
    if (match) headings.push({ level: match[1].length, heading: match[2].trim(), lineStart: index + 1 });
  }
  return headings.map((item, index) => {
    const lineEnd = (headings[index + 1]?.lineStart ?? lines.length + 1) - 1;
    const source = lines.slice(item.lineStart - 1, lineEnd).join("\n");
    const anchor = anchorId(item.heading);
    return {
      id: objectId("section", `${documentPath}#${anchor}:${item.lineStart}`),
      profile: "source-section",
      label: item.heading,
      kernel: {
        kind: "source-section",
        domain: "science-programme",
        role: sectionRole(item.heading),
        context: documentPath,
        form: "markdown-section",
        status: inherited.status,
        governingScheme: "spin23-corpus",
        equivalence: "source-location-and-byte-content",
        admissibility: "observed-in-canonical-document",
        support: documentId,
        authority: inherited.authority,
        time: inherited.time,
      },
      extension: { documentId, heading: item.heading, level: item.level, anchor, lineStart: item.lineStart, lineEnd, sha256: sha256(source) },
      provenance: { sourcePath: documentPath, sourceSha256: inherited.sha256, extraction: "deterministic-markdown-heading" },
    };
  });
}

function resolveTarget(sourcePath, rawTarget) {
  let value = rawTarget.trim();
  if (value.startsWith("<") && value.endsWith(">")) value = value.slice(1, -1);
  if (/^(?:https?:|mailto:|data:)/iu.test(value)) return { kind: "external", locator: value };
  if (value.startsWith("#")) return { kind: "anchor", locator: `${sourcePath}${value}` };
  const withoutQuery = value.split("?", 1)[0];
  const [filePart, fragment = ""] = withoutQuery.split("#", 2);
  if (!filePart || /[|{}]/u.test(filePart)) return null;
  let decoded = filePart;
  try { decoded = decodeURIComponent(filePart); } catch { /* preserve source spelling */ }
  let path = posix(normalize(join(dirname(sourcePath), decoded)));
  const absolute = join(root, path);
  if (existsSync(absolute) && statSync(absolute).isDirectory()) path = posix(join(path, "README.md"));
  return { kind: "local", locator: path, fragment: fragment || null, exists: existsSync(join(root, path)) };
}

function observedRelations(text, sourcePath, documentId, sections) {
  const lines = text.split(/\r?\n/u);
  const metadataKinds = new Map([
    ["Evidence", "declares-evidence"], ["Parent", "continues-from"], ["Continued by", "continued-by"],
    ["Source", "declares-source"], ["Verifier", "verified-by"], ["Generator", "generated-by"],
  ]);
  const rows = [];
  let sectionIndex = -1;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    while (sectionIndex + 1 < sections.length && sections[sectionIndex + 1].extension.lineStart <= index + 1) sectionIndex += 1;
    const section = sectionIndex >= 0 ? sections[sectionIndex] : null;
    const from = section?.id ?? documentId;
    const metadata = /^\*\*(Evidence|Parent|Continued by|Source|Verifier|Generator):\*\*/iu.exec(line);
    for (const match of line.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/gu)) {
      const target = resolveTarget(sourcePath, match[1]);
      if (!target) continue;
      rows.push({
        kind: metadata ? metadataKinds.get(metadata[1]) : "references",
        from,
        sourcePath,
        sourceLine: index + 1,
        rawTarget: match[1],
        target,
      });
    }
  }
  return rows;
}

function makeArtifact(target, artifacts, documentIdByPath, sectionIdByLocator) {
  if (target.kind === "anchor") {
    const sectionId = sectionIdByLocator.get(target.locator.toLowerCase());
    if (sectionId) return sectionId;
    const id = objectId("anchor", target.locator);
    if (!artifacts.has(id)) artifacts.set(id, {
      id, profile: "referenced-artifact", label: target.locator,
      kernel: { kind: "document-anchor", domain: "science-programme", role: "referenced-location", context: target.locator.split("#", 1)[0], form: "markdown-anchor", status: "unresolved", governingScheme: "spin23-corpus", equivalence: "exact-anchor-spelling", admissibility: "reference-observed-anchor-unresolved", support: "source-markdown-link", authority: "structural-only", time: null },
      extension: { locator: target.locator, existence: "unresolved", sha256: null },
      provenance: { extraction: "observed-markdown-anchor" },
    });
    return id;
  }
  if (target.kind === "external") {
    const id = objectId("external", target.locator);
    if (!artifacts.has(id)) artifacts.set(id, {
      id, profile: "referenced-artifact", label: target.locator,
      kernel: { kind: "external-reference", domain: "external", role: "referenced-source", context: "outside-repository", form: "uri", status: "uninspected", governingScheme: "external-reference", equivalence: "exact-uri", admissibility: "reference-observed-not-verified", support: "source-markdown-link", authority: "external-unresolved", time: null },
      extension: { locator: target.locator, existence: "not-tested", sha256: null },
      provenance: { extraction: "observed-markdown-link" },
    });
    return id;
  }
  if (target.fragment) {
    const sectionId = sectionIdByLocator.get(`${target.locator}#${target.fragment}`.toLowerCase());
    if (sectionId) return sectionId;
  }
  const canonicalDocumentId = documentIdByPath.get(target.locator.toLowerCase());
  if (canonicalDocumentId) return canonicalDocumentId;
  const id = objectId("artifact", target.locator);
  if (!artifacts.has(id)) {
    const absolute = join(root, target.locator);
    let digest = null;
    if (target.exists && statSync(absolute).isFile()) digest = sha256(readFileSync(absolute));
    artifacts.set(id, {
      id, profile: "referenced-artifact", label: target.locator,
      kernel: { kind: "repository-artifact", domain: "science-programme-support", role: "referenced-artifact", context: dirname(target.locator), form: extname(target.locator).slice(1) || "unknown", status: target.exists ? "present" : "missing", governingScheme: "repository", equivalence: digest ? "byte-identical-sha256" : "exact-locator", admissibility: target.exists ? "artifact-present" : "unresolved-reference", support: "source-markdown-link", authority: "inherits-declared-artifact-scope", time: null },
      extension: { locator: target.locator, existence: target.exists ? "present" : "missing", sha256: digest },
      provenance: { extraction: "observed-markdown-link" },
    });
  }
  return id;
}

async function loadFamily(definition) {
  const absolute = join(root, definition.path);
  if (definition.kind === "module") {
    const module = await import(`${pathToFileURL(absolute).href}?sha=${sha256(readFileSync(absolute))}`);
    return { graph: module[definition.graphExport], queries: module[definition.queriesExport] };
  }
  const source = JSON.parse(readFileSync(absolute, "utf8"));
  return { graph: source[definition.graphPointer], queries: source[definition.queriesPointer] };
}

function validateTransformation(rule, byId) {
  const reasons = [];
  const from = byId.get(rule.from);
  const to = byId.get(rule.to);
  if (!from) reasons.push("from-object-missing");
  if (!to) reasons.push("to-object-missing");
  if (from && stable(rule.fromSignature) !== stable(from.extension.science.signature)) reasons.push("from-signature-mismatch");
  if (to && stable(rule.toSignature) !== stable(to.extension.science.signature)) reasons.push("to-signature-mismatch");
  if (from && stable(rule.fromDimension) !== stable(from.extension.science.siDimension)) reasons.push("from-dimension-mismatch");
  if (to && stable(rule.toDimension) !== stable(to.extension.science.siDimension)) reasons.push("to-dimension-mismatch");
  if (rule.dimensionRule !== "si-base-exponent-delta") reasons.push("dimension-rule-unrecognized");
  if (from && to && dimensionFields.some(field => to.extension.science.siDimension[field] !== from.extension.science.siDimension[field] + rule.dimensionDelta[field])) reasons.push("dimension-delta-invalid");
  if (!rule.authority || rule.authority.proposalOnly !== true || rule.authority.entails !== false || rule.authority.empiricalAuthority !== false) reasons.push("authority-unbounded");
  if (rule.analogyOnly !== false) reasons.push("analogy-not-admissible");
  if (!Array.isArray(rule.evidenceRefs) || rule.evidenceRefs.length === 0) reasons.push("evidence-missing");
  if (rule.kind === "projection" && (!Array.isArray(rule.losses) || rule.losses.length === 0)) reasons.push("projection-loss-missing");
  if (from && to) {
    const changed = signatureFields.filter(field => rule.fromSignature[field] !== rule.toSignature[field]);
    for (const field of changed) if (!rule.changes.includes(field)) reasons.push(`undeclared-change:${field}`);
  }
  return { admitted: reasons.length === 0, reasons };
}

function compose(graph, query) {
  const valid = graph.transformations.filter(item => item.validation.admitted);
  let frontier = [{ current: query.source, steps: [], assumptions: [], losses: [], evidenceRefs: [] }];
  const accepted = [];
  for (let depth = 0; depth < query.maxDepth; depth += 1) {
    const next = [];
    for (const path of frontier) {
      for (const rule of valid.filter(item => item.from === path.current)) {
        const candidate = {
          current: rule.to,
          steps: [...path.steps, rule.id],
          assumptions: [...new Set([...path.assumptions, ...rule.assumptions])],
          losses: [...new Set([...path.losses, ...rule.losses])],
          evidenceRefs: [...new Set([...path.evidenceRefs, ...rule.evidenceRefs])],
        };
        if (candidate.current === query.target) accepted.push(candidate);
        else next.push(candidate);
      }
    }
    frontier = next;
  }
  return {
    query,
    candidates: accepted.map(path => ({ ...path, candidateId: stableHash(path.steps), claimStatus: "derived-claim-proposal", entails: false, empiricalAuthority: false, applicationAdmission: false })),
    frontierCount: frontier.length,
  };
}

const corpusFiles = walk(join(root, imports.corpus.root));
const documents = [];
const sections = [];
const rawRelations = [];
for (const path of corpusFiles) {
  const text = readFileSync(join(root, path), "utf8");
  const digest = sha256(text);
  const status = declaredField(text, "Status|Claim status|Outcome") ?? "unclassified";
  const date = declaredField(text, "Date") ?? null;
  const authority = declaredField(text, "Authority") ?? "source-declared; no automatic empirical promotion";
  const declaredFields = Object.fromEntries([
    ["status", status === "unclassified" ? null : status], ["date", date], ["evidence", declaredField(text, "Evidence")],
    ["parent", declaredField(text, "Parent")], ["continuedBy", declaredField(text, "Continued by")],
    ["source", declaredField(text, "Source")], ["verifier", declaredField(text, "Verifier")], ["generator", declaredField(text, "Generator")],
  ].filter(([, value]) => value !== null));
  const id = objectId("document", path);
  const document = {
    id,
    profile: "source-document",
    label: titleOf(text, path),
    kernel: {
      kind: "source-document", domain: "science-programme", role: "canonical-source", context: posix(dirname(path)), form: "markdown",
      status, governingScheme: "spin23-corpus", equivalence: "byte-identical-sha256", admissibility: "canonical-file-present",
      support: Object.keys(declaredFields).includes("evidence") ? "declared-evidence" : "source-content", authority, time: date,
    },
    extension: { canonicalPath: path, sha256: digest, mediaType: "text/markdown", declaredFields },
    provenance: { sourcePath: path, sourceSha256: digest, extraction: "deterministic-source-scan" },
  };
  documents.push(document);
  const localSections = parseSections(text, path, id, { status, authority, time: date, sha256: digest });
  sections.push(...localSections);
  for (const section of localSections) rawRelations.push({ kind: "contains", from: id, to: section.id, sourcePath: path, sourceLine: section.extension.lineStart, observed: true });
  rawRelations.push(...observedRelations(text, path, id, localSections));
}

const documentIds = new Set(documents.map(item => item.id));
const sectionIds = new Set(sections.map(item => item.id));
const documentIdByPath = new Map(documents.map(item => [item.extension.canonicalPath.toLowerCase(), item.id]));
const sectionIdByLocator = new Map(sections.map(item => [`${item.provenance.sourcePath}#${item.extension.anchor}`.toLowerCase(), item.id]));
const artifacts = new Map();
const relations = rawRelations.map(item => {
  let to = item.to;
  let target = item.target ?? null;
  if (!to && target) to = makeArtifact(target, artifacts, documentIdByPath, sectionIdByLocator);
  if (to?.startsWith("document::") && !documentIds.has(to)) {
    const path = to.slice("document::".length);
    to = makeArtifact({ kind: "local", locator: path, exists: existsSync(join(root, path)) }, artifacts, documentIdByPath, sectionIdByLocator);
  }
  const record = {
    kind: item.kind, from: item.from, to,
    sourceLocation: { path: item.sourcePath, line: item.sourceLine },
    observation: "authored-source-structure",
    authority: "structural-only; not a scientific transformation",
    target: target ? { kind: target.kind, locator: target.locator, fragment: target.fragment ?? null, exists: target.exists ?? null } : null,
  };
  return { id: relationId(record), ...record };
});

const scientificObjects = [];
const scientificTransformations = [];
const scientificQueries = [];
const familySources = [];
for (const definition of imports.scientificTransformationFamilies) {
  const loaded = await loadFamily(definition);
  const sourceSha256 = sha256(readFileSync(join(root, definition.path)));
  familySources.push({ id: definition.id, path: definition.path, sha256: sourceSha256 });
  for (const source of loaded.graph.objects) {
    const id = objectId("scientific", `${definition.id}:${source.id}`);
    scientificObjects.push({
      id, profile: "science", label: source.id,
      kernel: {
        kind: "scientific-object", domain: source.signature.domain, role: "derivation-state", context: definition.id,
        form: `${source.signature.variance}:${source.signature.basis}`, status: "declared", governingScheme: definition.governingScheme,
        equivalence: "exact-signature-and-dimension", admissibility: "common-algebra-2-endpoint", support: source.signature.support,
        authority: "proposal-only", time: "2026-10-25",
      },
      extension: { science: { signature: source.signature, siDimension: source.dimension } },
      provenance: { sourcePath: definition.path, sourceSha256, sourceObjectId: source.id, extraction: "declared-scientific-family-import" },
    });
  }
  const localById = new Map(scientificObjects.filter(item => item.kernel.context === definition.id).map(item => [item.provenance.sourceObjectId, item]));
  for (const source of loaded.graph.transformations) {
    const normalized = {
      ...source,
      id: objectId("transformation", `${definition.id}:${source.id}`),
      sourceId: source.id,
      family: definition.id,
      from: localById.get(source.from)?.id,
      to: localById.get(source.to)?.id,
      governingScheme: definition.governingScheme,
      provenance: { sourcePath: definition.path, sourceSha256 },
    };
    normalized.validation = validateTransformation(normalized, new Map([...localById.entries()].map(([key, value]) => [value.id, value])));
    scientificTransformations.push(normalized);
  }
  for (const query of loaded.queries) scientificQueries.push({
    ...query,
    id: objectId("query", `${definition.id}:${query.id}`),
    sourceId: query.id,
    family: definition.id,
    source: localById.get(query.source)?.id,
    target: localById.get(query.target)?.id,
  });
}

const scientificGraph = { objects: scientificObjects, transformations: scientificTransformations };
const compositionReceipts = scientificQueries.map(query => compose(scientificGraph, query));
const allObjects = [...documents, ...sections, ...artifacts.values(), ...scientificObjects];
const objectIds = new Set(allObjects.map(item => item.id));
const duplicateObjectCount = allObjects.length - objectIds.size;
const missingKernelCoordinates = allObjects.flatMap(item => kernelCoordinates.filter(coordinate => !(coordinate in item.kernel)).map(coordinate => ({ objectId: item.id, coordinate })));
const danglingRelationCount = relations.filter(item => !objectIds.has(item.from) || (!objectIds.has(item.to) && !sectionIds.has(item.to))).length;
const declaredStatusDocuments = documents.filter(item => item.kernel.status !== "unclassified").length;
const admittedTransformations = scientificTransformations.filter(item => item.validation.admitted);
const rejectedTransformations = scientificTransformations.filter(item => !item.validation.admitted);

const summary = {
  corpusDocuments: documents.length,
  sourceSections: sections.length,
  referencedArtifacts: artifacts.size,
  observedRelations: relations.length,
  declaredStatusDocuments,
  unclassifiedStatusDocuments: documents.length - declaredStatusDocuments,
  scientificFamilies: imports.scientificTransformationFamilies.length,
  scientificObjects: scientificObjects.length,
  admittedScientificTransformations: admittedTransformations.length,
  rejectedScientificTransformations: rejectedTransformations.length,
  scientificQueries: scientificQueries.length,
  queriesWithCandidates: compositionReceipts.filter(item => item.candidates.length > 0).length,
  queriesWithoutCandidates: compositionReceipts.filter(item => item.candidates.length === 0).length,
  duplicateObjectCount,
  missingKernelCoordinateCount: missingKernelCoordinates.length,
  danglingRelationCount,
};

const output = {
  protocol: "spin23-programme-algebra/1",
  generatedAt: "2026-10-26T00:00:00.000Z",
  mode: "parallel-non-replacing",
  authorityBoundary: "Corpus Markdown remains canonical for prose. Authored profile and transformation sources remain canonical for algebra declarations. This generated projection grants no scientific, empirical, Claimipedia, publication or application authority.",
  sources: {
    corpus: { root: imports.corpus.root, documentCount: documents.length, digest: stableHash(documents.map(item => [item.extension.canonicalPath, item.extension.sha256])) },
    profiles: { path: posix(relative(root, profilePath)), sha256: sha256(readFileSync(profilePath)) },
    imports: { path: posix(relative(root, importPath)), sha256: sha256(readFileSync(importPath)) },
    scientificFamilies: familySources,
  },
  summary,
  coverage: {
    structural: { status: "complete", documentsProjected: documents.length, documentsInScope: corpusFiles.length, sectionsProjected: sections.length },
    epistemic: { status: "partial", declaredStatusDocuments, unclassifiedStatusDocuments: documents.length - declaredStatusDocuments, observedRelations: relations.length },
    scientific: { status: "seed-only", admittedFamilies: imports.scientificTransformationFamilies.map(item => item.id), admittedTransformations: admittedTransformations.length, boundary: "No ordinary Markdown link is promoted to a scientific transformation." },
  },
  profiles,
  objects: allObjects,
  relations,
  transformations: scientificTransformations,
  queries: scientificQueries,
  compositionReceipts,
  verification: { duplicateObjectCount, missingKernelCoordinates, danglingRelationCount },
};
const projectionJson = JSON.stringify(output);
const projectionBytes = Buffer.from(projectionJson);
const archiveBytes = gzipSync(projectionBytes, { level: 9, mtime: 0 });
const manifestSummary = { ...summary, projectedJsonBytes: projectionBytes.length, projectedGzipBytes: archiveBytes.length };
const manifest = {
  protocol: "spin23-programme-algebra-manifest/1",
  generatedAt: output.generatedAt,
  mode: output.mode,
  authorityBoundary: output.authorityBoundary,
  projectionProtocol: output.protocol,
  summary: manifestSummary,
  coverage: output.coverage,
  sources: output.sources,
  archive: {
    path: "programme_algebra_records_v1.json.gz",
    encoding: "gzip",
    mediaType: "application/json",
    uncompressedBytes: projectionBytes.length,
    compressedBytes: archiveBytes.length,
    uncompressedSha256: sha256(projectionBytes),
    compressedSha256: sha256(archiveBytes),
  },
  verification: output.verification,
};

const coverage = `# Programme Algebra Coverage\n\n**Generated:** 26 October 2026\n\n**Mode:** parallel, non-replacing\n\n**Protocol:** \`spin23-programme-algebra/1\`\n\n## Result\n\nThe compiler projects all **${summary.corpusDocuments.toLocaleString("en")}** in-scope corpus Markdown documents and **${summary.sourceSections.toLocaleString("en")}** authored sections into the twelve-coordinate epistemic kernel. It retains **${summary.observedRelations.toLocaleString("en")}** observed containment or link relations and **${summary.referencedArtifacts.toLocaleString("en")}** referenced artifacts.\n\nScientific admission remains intentionally narrower. The four D02 seed families contribute **${summary.scientificObjects}** typed scientific objects and **${summary.admittedScientificTransformations}** admitted transformations; **${summary.rejectedScientificTransformations}** transformations fail the strict gate. Of **${summary.scientificQueries}** bounded queries, **${summary.queriesWithCandidates}** have at least one admitted candidate and **${summary.queriesWithoutCandidates}** retain the negative boundary.\n\n## Coverage by depth\n\n| Depth | Status | Meaning |\n|---|---|---|\n| Structural | **Complete** | Every in-scope document and heading has a stable, hash-bound object. |\n| Epistemic | **Partial** | ${summary.declaredStatusDocuments} documents declare status; ${summary.unclassifiedStatusDocuments} remain visibly unclassified. Explicit links and labelled provenance fields are retained without semantic promotion. |\n| Scientific | **Seed only** | Only transformations satisfying exact endpoint, dimension, assumption, loss, evidence and authority gates are admitted. Current admitted families: D02 local, operator, rank-change and boundary. |\n\n## Integrity\n\n- Duplicate object identities: **${summary.duplicateObjectCount}**\n- Missing kernel coordinates: **${summary.missingKernelCoordinateCount}**\n- Dangling compiled relations: **${summary.danglingRelationCount}**\n- Corpus source digest: \`${output.sources.corpus.digest}\`\n\n## Boundary\n\nThis report does not mean that every scientific argument has been formalized. It means every source has a lossless algebraic address and that the compiler can distinguish observed documentary relations from admitted scientific transformations. The untyped remainder is now measurable rather than hidden.\n\nThe existing corpus remains canonical. Replacement requires the gates in the [parallel-lane README](../README.md), including held-out retrieval or reasoning improvements and an explicit migration decision.\n`;

if (write) {
  mkdirSync(outputRoot, { recursive: true });
  writeFileSync(join(outputRoot, "programme_algebra_v1.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  writeFileSync(join(outputRoot, "programme_algebra_records_v1.json.gz"), archiveBytes);
  writeFileSync(join(outputRoot, "PROGRAMME_ALGEBRA_COVERAGE.md"), coverage, "utf8");
}

console.log(JSON.stringify({ ...manifestSummary, corpusDigest: output.sources.corpus.digest, wrote: write ? posix(relative(root, outputRoot)) : false }, null, 2));
if (duplicateObjectCount || missingKernelCoordinates.length || danglingRelationCount) process.exitCode = 1;
