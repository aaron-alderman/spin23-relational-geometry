import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
const cataloguePath = "corpus/programmes/mathematical-group-atlas/mathematical_group_catalogue_v1.json";
const ambiguityRegisterPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_token_ambiguity_register_v1.json";
const outputPath = "corpus/programmes/mathematical-group-atlas/mathematical_group_corpus_scan_v1.json";
const scanRoots = ["corpus/claims", "corpus/programmes", "verification", "evidence/data"];
const extensions = new Set([".md", ".json", ".mjs", ".js", ".py", ".txt", ".yaml", ".yml"]);
const maximumFileBytes = 20_000_000;
const excludedPrefixes = ["corpus/programmes/mathematical-group-atlas/"];
const progressEnabled = process.env.MATHEMATICAL_GROUP_SCAN_PROGRESS === "1";

const catalogue = JSON.parse(fs.readFileSync(path.join(root, cataloguePath), "utf8"));
const ambiguityRegister = JSON.parse(fs.readFileSync(path.join(root, ambiguityRegisterPath), "utf8"));

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(absolute));
    else if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(absolute);
  }
  return files;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalize(value) {
  return value
    .replace(/ℤ/g, "Z")
    .replace(/\\mathbb\s*\{?([A-Za-z])\}?/g, "$1")
    .replace(/\\mathbf\s*\{?([A-Za-z0-9]+)\}?/g, "$1")
    .replace(/\\operatorname\s*\{([^}]+)\}/g, "$1")
    .toLowerCase()
    .replace(/[{}_$\\\s]/g, "");
}

const aliases = [];
for (const group of catalogue.groups) {
  for (const alias of [group.notation, group.name, ...(group.aliases ?? [])]) {
    if (alias.length < 2 || ["B", "M", "S1"].includes(alias)) continue;
    aliases.push({ groupId: group.id, alias, normalized: normalize(alias) });
  }
}
aliases.sort((left, right) => right.alias.length - left.alias.length);

const aliasLookup = new Map();
for (const entry of aliases) {
  const key = normalize(entry.alias);
  const records = aliasLookup.get(key) ?? [];
  records.push(entry);
  aliasLookup.set(key, records);
}
const aliasAnchorIndex = new Map();
for (const entry of aliases) {
  const operatorAnchor = /\\oplus/i.test(entry.alias)
    ? "oplus"
    : (/\\times/i.test(entry.alias)
      ? "times"
      : (/\\wr/i.test(entry.alias) ? "wr" : null));
  const anchor = operatorAnchor ?? (entry.alias.toLowerCase().match(/[a-z0-9]+/g) ?? [])
    .sort((left, right) => right.length - left.length)[0];
  if (!anchor || anchor.length < 2) continue;
  const multiplicationAlias = /(?:\\times|×|\sx\s)/i.test(entry.alias);
  const additiveAlias = /(?:\\oplus|⊕)/i.test(entry.alias);
  let escapedAlias;
  if (multiplicationAlias) {
    const pieces = entry.alias.split(/\s*(\\times|×|x)\s*/i);
    escapedAlias = escapeRegex(pieces[0]).replace(/\s+/g, "\\s*");
    for (let index = 1; index < pieces.length; index += 2) {
      const operator = escapeRegex(pieces[index]);
      const factor = escapeRegex(pieces[index + 1]).replace(/\s+/g, "\\s*");
      escapedAlias += `(?:_\\{[^}\\n]+\\}|_[A-Za-z][A-Za-z0-9]*)?\\s*${operator}\\s*${factor}`;
    }
    escapedAlias += "(?:_\\{[^}\\n]+\\}|_[A-Za-z][A-Za-z0-9]*)?";
  } else if (additiveAlias) {
    const pieces = entry.alias.split(/\s*(\\oplus|⊕)\s*/i);
    escapedAlias = escapeRegex(pieces[0]).replace(/\s+/g, "\\s*");
    for (let index = 1; index < pieces.length; index += 2) {
      const operator = escapeRegex(pieces[index]);
      const factor = escapeRegex(pieces[index + 1]).replace(/\s+/g, "\\s*");
      escapedAlias += `\\s*${operator}\\s*${factor}`;
    }
  } else {
    escapedAlias = escapeRegex(entry.alias).replace(/\s+/g, "\\s+");
  }
  const rightBoundary = multiplicationAlias || additiveAlias ? "(?![A-Za-z0-9])" : "(?![A-Za-z0-9_])";
  const leftBoundary = /^[A-Za-z0-9_]/.test(entry.alias) ? "(?<![A-Za-z0-9_])" : "";
  entry.matcher = new RegExp(
    `${leftBoundary}${escapedAlias}${rightBoundary}`,
    "i"
  );
  const anchored = aliasAnchorIndex.get(anchor) ?? [];
  anchored.push(entry);
  aliasAnchorIndex.set(anchor, anchored);
}
const aliasAnchorPattern = new RegExp(
  `\\b(?:${[...aliasAnchorIndex.keys()].sort((left, right) => right.length - left.length).map(escapeRegex).join("|")})\\b`,
  "i"
);

const relationshipPatterns = [
  ["short_exact_sequence", /short exact|exact sequence/i],
  ["isomorphism", /isomorph|\\cong|\\simeq|≅|\bisomorphic\b/i],
  ["conjugacy", /\bconjug(?:ate|ated|ates|ating|acy)\b/i],
  ["normal_subgroup", /normal subgroup/i],
  ["semidirect_product", /semidirect|\\rtimes|⋊/i],
  ["direct_product", /direct product|direct sum|\\times|×|\\oplus|⊕/i],
  ["central_extension", /central extension|central cover/i],
  ["cover", /double cover|covering (?:map|group)|\bcover of\b/i],
  ["quotient", /\bquotient\b|\bmodulo\b/i],
  ["subgroup", /\bsubgroup\b|\bembeds?\b|\bembedding\b|\\hookrightarrow|↪/i],
  ["automorphism_group", /automorphism group|\bAut\s*\(/i],
  ["weyl_group", /Weyl group|\bW\s*\([ADEFG][0-9]/i],
  ["centralizer", /\bcentralizer\b/i],
  ["normalizer", /\bnormalizer\b/i],
  ["stabilizer", /\bstabilizer\b/i],
  ["composition_factor", /composition factor|Jordan.?H[oö]lder/i],
  ["action", /\bacts? on\b|\baction on\b|orbit|transitive/i],
  ["representation", /\brepresentation\b|\bmodule\b/i],
  ["extension", /\bextension\b/i]
];
const relationshipPrefilter = new RegExp(
  relationshipPatterns.map(([, pattern]) => `(?:${pattern.source})`).join("|"),
  "i"
);

const genericTokenPatterns = [
  /\b(?:P?SL|P?SU|P?Sp|Spin|SO|SU|U|GL|Sp)\s*\([^\n)]{1,28}\)/g,
  /\bO(?:\^?\+|_?\+)\s*\([^\n)]{1,28}\)/g,
  /\bO\s*\(q_[A-Za-z0-9{}\\]{1,24}\)/g,
  /(?:A|S|D|C|Q)_?\{?[0-9]{1,3}\}?\s*\\times_\{(?:[^{}\n]|\{[^{}\n]*\}){1,64}\}\s*(?:A|S|D|C|Q)_?\{?[0-9]{1,3}\}?/g,
  /\bW\s*\([ADEFG][0-9]+\)/g,
  /\b(?:Monster|Baby Monster|Co[0-3]|Mathieu group|Heisenberg group|Clifford group)\b/gi,
  /\b(?:A|S|D|C|Q)_?\{?[0-9]{1,3}\}?(?![A-Za-z0-9_])/g,
  /\\mathbb\s*\{?Z\}?\s*_?\{?[0-9]{1,3}\}?/g,
  /\bZ_?\{?[0-9]{1,3}\}?\b/g,
  /ℤ_?\{?[0-9]{1,3}\}?/g,
  /\bB_?3\b/g
];

const structuralPredicates = new Set([
  "short_exact_sequence", "isomorphism", "conjugacy", "normal_subgroup", "semidirect_product",
  "direct_product", "central_extension", "cover", "quotient", "subgroup",
  "automorphism_group", "weyl_group", "centralizer", "normalizer", "composition_factor",
  "extension"
]);

function isMathematicalContext(line, predicates) {
  return predicates.some((predicate) => structuralPredicates.has(predicate))
    || /(?:\\\(|\\\[|\$|≅|⋊|×|⊕|\\times|\\oplus|\\rtimes|\bgroup\b|\bWeyl\b)/i.test(line);
}

function isNonGroupShortSymbolContext(alias, line) {
  if (!/^[ABCD][0-9]{1,3}$/i.test(normalize(alias))) return false;
  if (/^B_?3$/i.test(alias) && /\bbraid\b|Z\s*\(\s*B_?3\s*\)/i.test(line)) return false;
  const normalizedAlias = normalize(alias);
  const programmeGate = normalizedAlias.match(/^a([1-9]|1[01])$/i);
  if (programmeGate) {
    const gateToken = `A_?\\{?${programmeGate[1]}\\}?`;
    const gateVocabulary = "gate|gates|branch|branches|lane|protocol|selector|selection|obstruction|audit|test|result|status|dependency|dependencies|root|roots|advance|closure|open|closed|exhausted|passes|reopen|reopening|solve|solving|family|physical|programme|import";
    const gateContext = new RegExp(
      `(?:\\b(?:${gateVocabulary})\\b[^\\n]{0,40}\\b${gateToken}\\b|\\b${gateToken}\\b[^\\n]{0,40}\\b(?:${gateVocabulary})\\b)`,
      "i"
    );
    if (gateContext.test(line)) return true;
  }
  const escaped = escapeRegex(alias);
  const typeOrRootContext = new RegExp(
    `(?:root\\s+system|Dynkin|Weyl|Lie\\s+type|type)\\s*(?:[^\\n]{0,18})${escaped}|${escaped}(?:[^\\n]{0,18})(?:root\\s+system|Dynkin|Weyl|Lie\\s+type|type)`,
    "i"
  );
  const pairedTypeContext = new RegExp(`${escaped}\\s*[/=]\\s*[ABCD][0-9]+|[ABCD][0-9]+\\s*[/=]\\s*${escaped}`, "i");
  return typeOrRootContext.test(line) || pairedTypeContext.test(line);
}

function groupsInLine(line, predicates, rawTokens) {
  const found = new Map();
  for (const token of rawTokens) {
    for (const entry of aliasLookup.get(normalize(token)) ?? []) {
      if (/^B_?3$/i.test(entry.alias) && !/\bbraid\b|Z\s*\(\s*B_?3\s*\)/i.test(line)) continue;
      if (isNonGroupShortSymbolContext(entry.alias, line)) continue;
      found.set(entry.groupId, token);
    }
  }
  const candidateEntries = new Set();
  if (aliasAnchorPattern.test(line)) {
    for (const token of new Set(line.toLowerCase().match(/[a-z0-9]+/g) ?? [])) {
      for (const entry of aliasAnchorIndex.get(token) ?? []) candidateEntries.add(entry);
    }
  }
  for (const entry of candidateEntries) {
    const match = line.match(entry.matcher);
    if (!match) continue;
    const ambiguousShortSymbol = /^(?:A|C|D|Q|S|Z)\d{1,3}$/i.test(entry.alias);
    if (ambiguousShortSymbol && !isMathematicalContext(line, predicates)) continue;
    if (isNonGroupShortSymbolContext(entry.alias, line)) continue;
    found.set(entry.groupId, match[0]);
  }
  return [...found].map(([groupId, matchedAlias]) => ({ groupId, matchedAlias }));
}

function rawTokensInLine(line, predicates) {
  if (!isMathematicalContext(line, predicates)) return [];
  const values = new Set();
  for (const pattern of genericTokenPatterns) {
    pattern.lastIndex = 0;
    for (const match of line.matchAll(pattern)) {
      if (/^B_?3$/i.test(match[0]) && !/\bbraid\b|Z\s*\(\s*B_?3\s*\)/i.test(line)) continue;
      const texShortFiniteToken = /^(?:A|S|D|C|Q)_\{?[0-9]{1,3}\}?$/i.test(match[0]);
      const reviewedTexShortAlias = (aliasLookup.get(normalize(match[0])) ?? [])
        .some((entry) => /[_{}]/.test(entry.alias));
      if (texShortFiniteToken && (!predicates.includes("isomorphism") || !reviewedTexShortAlias)) continue;
      const previous = match.index > 0 ? line[match.index - 1] : "";
      if (previous === "-" || previous === "_") continue;
      values.add(match[0]);
    }
  }
  return [...values].sort();
}

function excerpt(line) {
  const compact = line.trim().replace(/\s+/g, " ");
  return compact.length <= 600 ? compact : `${compact.slice(0, 597)}...`;
}

function linksInLine(line) {
  const links = new Set();
  for (const match of line.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) links.add(match[1]);
  for (const match of line.matchAll(/(?:corpus|verification|evidence)\/[A-Za-z0-9_./-]+\.(?:md|json|mjs|js|py)/g)) links.add(match[0]);
  return [...links];
}

const files = scanRoots.flatMap((relative) => walk(path.join(root, relative))).sort();
const skippedLargeFiles = [];
const excludedFiles = [];
const relationshipCandidates = [];
const mentionFiles = new Map();
const mentionLines = new Map();
const mentionEvidence = new Map();
const documentDependencies = new Map();
const unresolvedTokens = new Map();
let filesScanned = 0;
let bytesScanned = 0;

for (const absolute of files) {
  const stats = fs.statSync(absolute);
  const relativePath = path.relative(root, absolute).replaceAll("\\", "/");
  if (progressEnabled && filesScanned % 100 === 0) console.error(`scan-progress files=${filesScanned} path=${relativePath}`);
  if (excludedPrefixes.some((prefix) => relativePath.startsWith(prefix))) {
    excludedFiles.push({ path: relativePath, reason: "self_generated_atlas_exclusion" });
    continue;
  }
  if (stats.size > maximumFileBytes) {
    skippedLargeFiles.push({ path: relativePath, bytes: stats.size, reason: "exceeds_maximum_file_bytes" });
    continue;
  }
  const text = fs.readFileSync(absolute, "utf8");
  filesScanned += 1;
  bytesScanned += stats.size;
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const predicates = relationshipPrefilter.test(line)
      ? relationshipPatterns.filter(([, pattern]) => pattern.test(line)).map(([name]) => name)
      : [];
    const rawTokens = rawTokensInLine(line, predicates);
    const resolved = groupsInLine(line, predicates, rawTokens);
    if (!resolved.length && !rawTokens.length) continue;
    for (const match of resolved) {
      const filesForGroup = mentionFiles.get(match.groupId) ?? new Set();
      filesForGroup.add(relativePath);
      mentionFiles.set(match.groupId, filesForGroup);
      mentionLines.set(match.groupId, (mentionLines.get(match.groupId) ?? 0) + 1);
      const evidenceForGroup = mentionEvidence.get(match.groupId) ?? [];
      evidenceForGroup.push({ path: relativePath, line: index + 1, matchedAlias: match.matchedAlias });
      mentionEvidence.set(match.groupId, evidenceForGroup);

      const dependency = documentDependencies.get(relativePath) ?? { path: relativePath, groupIds: new Set(), relationCandidateIds: [], predicates: new Set() };
      dependency.groupIds.add(match.groupId);
      documentDependencies.set(relativePath, dependency);
    }
    const resolvedAliases = new Set(resolved.map((entry) => normalize(entry.matchedAlias)));
    for (const token of rawTokens) {
      if (resolvedAliases.has(normalize(token))) continue;
      const record = unresolvedTokens.get(token) ?? { token, occurrences: 0, files: new Set(), examples: [] };
      record.occurrences += 1;
      record.files.add(relativePath);
      if (record.examples.length < 3) record.examples.push({ path: relativePath, line: index + 1, excerpt: excerpt(line) });
      unresolvedTokens.set(token, record);
    }
    if (!predicates.length) continue;
    const isNegative = /\b(?:not|no|cannot|does not|fails? to|without)\b/i.test(line);
    const hasStructuralPredicate = predicates.some((predicate) => structuralPredicates.has(predicate));
    const confidence = resolved.length >= 2 && hasStructuralPredicate
      ? "high"
      : (resolved.length >= 1 && (rawTokens.length >= 1 || hasStructuralPredicate) ? "medium" : "low");
    const digest = crypto.createHash("sha256").update(`${relativePath}:${index + 1}:${line}`).digest("hex").slice(0, 16);
    const candidate = {
      id: `scan:${digest}`,
      path: relativePath,
      line: index + 1,
      resolvedGroups: resolved,
      rawGroupTokens: rawTokens,
      predicates,
      polarity: isNegative ? "negative_or_qualified" : "positive_or_descriptive",
      confidence,
      status: "candidate_unreviewed",
      sourceLinks: linksInLine(line),
      excerpt: excerpt(line)
    };
    relationshipCandidates.push(candidate);
    const dependency = documentDependencies.get(relativePath) ?? { path: relativePath, groupIds: new Set(), relationCandidateIds: [], predicates: new Set() };
    dependency.relationCandidateIds.push(candidate.id);
    for (const predicate of predicates) dependency.predicates.add(predicate);
    documentDependencies.set(relativePath, dependency);
  }
}

const groupMentions = catalogue.groups.map((group) => ({
  groupId: group.id,
  files: mentionFiles.get(group.id)?.size ?? 0,
  matchingLines: mentionLines.get(group.id) ?? 0
})).filter((entry) => entry.matchingLines > 0).sort((left, right) => right.matchingLines - left.matchingLines || left.groupId.localeCompare(right.groupId));

const unresolved = [...unresolvedTokens.values()].map((record) => ({
  token: record.token,
  occurrences: record.occurrences,
  files: record.files.size,
  examples: record.examples
})).sort((left, right) => right.occurrences - left.occurrences || left.token.localeCompare(right.token));

const ambiguityByToken = new Map(ambiguityRegister.rules.map((rule) => [rule.token, rule]));
const classifiedUnresolvedTokens = unresolved.filter((record) => ambiguityByToken.has(record.token)).map((record) => ({
  ...record,
  ...ambiguityByToken.get(record.token)
}));
const unclassifiedGroupTokens = unresolved.filter((record) => !ambiguityByToken.has(record.token));
const ambiguityClassificationCounts = Object.fromEntries([...new Set(classifiedUnresolvedTokens.map((record) => record.classification))]
  .sort().map((classification) => [classification, classifiedUnresolvedTokens.filter((record) => record.classification === classification).length]));

const exactMentionEvidence = [...mentionEvidence.entries()].map(([groupId, evidence]) => ({
  groupId,
  evidence
})).sort((left, right) => left.groupId.localeCompare(right.groupId));

const documents = [...documentDependencies.values()].map((record) => ({
  path: record.path,
  groupIds: [...record.groupIds].sort(),
  predicates: [...record.predicates].sort(),
  relationCandidateIds: record.relationCandidateIds
})).sort((left, right) => left.path.localeCompare(right.path));

const clusterMap = new Map();
for (const candidate of relationshipCandidates) {
  const groupIds = [...new Set(candidate.resolvedGroups.map((entry) => entry.groupId))].sort();
  const predicates = [...candidate.predicates].sort();
  const key = `${groupIds.join("|")}::${predicates.join("|")}::${candidate.polarity}`;
  const cluster = clusterMap.get(key) ?? {
    id: `cluster:${crypto.createHash("sha256").update(key).digest("hex").slice(0, 16)}`,
    groupIds,
    predicates,
    polarity: candidate.polarity,
    evidenceIds: [],
    paths: new Set(),
    confidenceCounts: { high: 0, medium: 0, low: 0 },
    status: "candidate_cluster_unreviewed"
  };
  cluster.evidenceIds.push(candidate.id);
  cluster.paths.add(candidate.path);
  cluster.confidenceCounts[candidate.confidence] += 1;
  clusterMap.set(key, cluster);
}
const relationshipClusters = [...clusterMap.values()].map((cluster) => ({
  ...cluster,
  paths: [...cluster.paths].sort()
})).sort((left, right) => right.evidenceIds.length - left.evidenceIds.length || left.id.localeCompare(right.id));

const output = {
  schema: "mathematical-group-corpus-scan/1",
  basis: { catalogueDate: catalogue.date, ambiguityRegisterDate: ambiguityRegister.date, algorithmVersion: "17" },
  authority: "deterministic_candidate_extraction_not_promoted_mathematical_claims",
  catalogue: cataloguePath,
  ambiguityRegister: ambiguityRegisterPath,
  scanConfig: { roots: scanRoots, extensions: [...extensions], maximumFileBytes, excludedPrefixes },
  coverage: {
    filesDiscovered: files.length,
    filesScanned,
    bytesScanned,
    excludedFiles,
    skippedLargeFiles,
    skippedMeaning: "explicit_coverage_gap_not_negative_evidence"
  },
  statistics: {
    cataloguedGroupsMentioned: groupMentions.length,
    relationshipCandidates: relationshipCandidates.length,
    highConfidenceCandidates: relationshipCandidates.filter((candidate) => candidate.confidence === "high").length,
    unresolvedTokenKinds: unresolved.length,
    classifiedAmbiguityKinds: classifiedUnresolvedTokens.length,
    unclassifiedTokenKinds: unclassifiedGroupTokens.length,
    classifiedAmbiguityOccurrences: classifiedUnresolvedTokens.reduce((sum, record) => sum + record.occurrences, 0),
    unclassifiedTokenOccurrences: unclassifiedGroupTokens.reduce((sum, record) => sum + record.occurrences, 0),
    ambiguityClassificationCounts,
    documentsWithGroupDependencies: documents.length,
    relationshipClusters: relationshipClusters.length,
    exactMentionEvidence: exactMentionEvidence.reduce((sum, record) => sum + record.evidence.length, 0)
  },
  groupMentions,
  exactMentionEvidence,
  documentDependencies: documents,
  unresolvedGroupTokens: unresolved,
  classifiedUnresolvedTokens,
  unclassifiedGroupTokens,
  relationshipClusters,
  relationshipCandidates
};

fs.writeFileSync(path.join(root, outputPath), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Mathematical group corpus scan: groups=${groupMentions.length}; candidates=${relationshipCandidates.length}; high=${output.statistics.highConfidenceCandidates}; unresolved=${unresolved.length}; skippedLarge=${skippedLargeFiles.length}`);
