#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, extname, join, normalize, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const STOP_WORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "been", "but", "by", "can", "do", "does", "for", "from",
  "has", "have", "how", "if", "in", "into", "is", "it", "its", "may", "not", "of", "on", "or", "our",
  "that", "the", "their", "then", "there", "these", "this", "to", "under", "was", "we", "what", "when",
  "where", "which", "while", "with", "without",
]);

const KNOWN_CORRECTIONS = new Map([
  ["casmir", "casimir"],
  ["nearnst", "nernst"],
  ["efimoff", "efimov"],
  ["eigenvecter", "eigenvector"],
]);

const toPosix = value => value.split(sep).join("/");
const markdownRoots = ["corpus", "book/edition-3/chapters", "verification"];
// Generated navigation certificates remain searchable, but cannot define the
// scientific-content identity that they themselves report.  In particular,
// FRONT_DOOR inventories the retained retrieval baseline; hashing it here
// would make baseline and front-door regeneration recursively invalidate one
// another.  Its dedicated repository test governs its own byte identity.
const contentIdentityExcludedPaths = new Set([
  "corpus/FRONT_DOOR.md",
  // The release certificate contains the projection hash it reports. It stays
  // searchable, but cannot recursively define the retained search identity.
  "corpus/programmes/frontier-physics-targets/corpus_saturation_release_certificate_v1.md",
]);
const cacheValidationIntervalMs = 5000;
let cache = null;

export const DEFAULT_RETRIEVAL_WEIGHTS = Object.freeze({
  graphWeight: 0.2,
  claimWeight: 0.2,
  semanticWeight: 0.2,
});

const claimRolePatterns = [
  ["status", /^\*\*(?:status|claim status|outcome):\*\*/iu],
  ["evidence", /^\*\*evidence:\*\*/iu],
  ["falsifier", /\b(?:falsifier|would falsify|failure condition|rejected if)\b/iu],
  ["boundary", /\b(?:boundary|remain(?:s|ing)? open|limitation|not establish|does not prove|no-go|obstruction|gate(?:d)?)\b/iu],
  ["assumption", /\b(?:assumption|conditional on|provided that|requires?)\b/iu],
  ["result", /\b(?:result|theorem|proposition|lemma|shows?|establish(?:es|ed)?|closes?|demonstrates?)\b/iu],
];

function stem(token) {
  if (token.length <= 4) return token;
  if (token.endsWith("ies") && token.length > 5) return `${token.slice(0, -3)}y`;
  if (token.endsWith("ing") && token.length > 6) return token.slice(0, -3);
  if (token.endsWith("ed") && token.length > 5) return token.slice(0, -2);
  if (token.endsWith("es") && token.length > 5) return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 4) return token.slice(0, -1);
  return token;
}

function tokenize(value) {
  return [...value.normalize("NFKD").toLowerCase().matchAll(/[\p{L}\p{N}]+/gu)]
    .map(match => stem(match[0]))
    .filter(token => token.length >= 2 && !STOP_WORDS.has(token));
}

function walkMarkdown(root, relativeRoot) {
  const start = join(root, relativeRoot);
  if (!existsSync(start)) return [];
  const output = [];
  const visit = directory => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolute = join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile() && extname(entry.name).toLowerCase() === ".md") output.push(toPosix(relative(root, absolute)));
    }
  };
  if (statSync(start).isDirectory()) visit(start);
  else if (extname(start).toLowerCase() === ".md") output.push(toPosix(relative(root, start)));
  return output;
}

function extractTitle(text, path) {
  return /^#\s+(.+)$/mu.exec(text)?.[1]?.trim() ?? path.split("/").at(-1).replace(/\.md$/iu, "").replaceAll("_", " ");
}

function extractStatus(text, path) {
  const declared = /^\*\*(?:Status|Claim status|Outcome):\*\*\s*(.+)$/imu.exec(text)?.[1]?.trim();
  if (declared) return declared;
  if (path.includes("/claims/")) return "claim; inspect local declaration";
  if (path.includes("/programmes/")) return "programme artifact";
  if (path.includes("/syntheses/")) return "synthesis";
  if (path.startsWith("book/")) return "reader edition";
  return "navigation or verification surface";
}

function navigationPrior(path) {
  if (path === "corpus/syntheses/the_admissibility_frontier_current_synthesis.md") return 1.35;
  if (path === "corpus/READING_CONTRACT.md") return 1.3;
  if (path === "corpus/FRONT_DOOR.md" || path === "corpus/EVIDENCE_SPINE.md") return 1.18;
  if (path.includes("/programmes/frontier-physics-targets/")) return 1.12;
  if (path.includes("/syntheses/")) return 1.1;
  if (path.includes("/programmes/")) return 1.04;
  if (path.includes("91_multi_branch_active_goal_log") || path.includes("90_active_goal_research_log")) return 0.28;
  if (path.includes("00_research_document_map") || path.includes("20_corpus_file_by_file_register")) return 0.38;
  if (path.endsWith("INDEX.md")) return 0.55;
  if (path.startsWith("book/")) return 0.82;
  return 1;
}

function addTokens(counts, tokens, weight) {
  for (const token of tokens) counts.set(token, (counts.get(token) ?? 0) + weight);
}

function semanticMarkdown(text) {
  // Commands and examples explain how to use the corpus; they are not claims
  // that should make their container rank for the example query itself.
  return text
    .replace(/^\s*(```|~~~)[^\r\n]*\r?\n[\s\S]*?^\s*\1\s*$/gmu, "")
    .replace(/<!--[\s\S]*?-->/gu, "");
}

function claimRole(text, heading) {
  const value = `${heading}\n${text}`;
  return claimRolePatterns.find(([, pattern]) => pattern.test(value))?.[0] ?? "context";
}

function extractClaimUnits(text, path) {
  const lines = text.split(/\r?\n/u);
  const units = [];
  let heading = extractTitle(text, path);
  let start = null;
  let buffer = [];
  let fenced = false;
  const flush = endLine => {
    const value = buffer.join("\n").trim();
    if (value) {
      const normalized = value.replaceAll(/[*`]/gu, "").trim();
      const unitTokens = tokenize(`${heading} ${normalized}`);
      const counts = new Map();
      for (const token of unitTokens) counts.set(token, (counts.get(token) ?? 0) + 1);
      if (unitTokens.length) units.push({
        id: units.length,
        path,
        heading,
        lineStart: start,
        lineEnd: endLine,
        role: claimRole(normalized, heading),
        text: normalized,
        rawText: value,
        lowerText: normalized.toLowerCase(),
        length: Math.max(unitTokens.length, 1),
        counts,
        tokenSet: new Set(counts.keys()),
        claimSha256: createHash("sha256").update(`${path}\0${start}\0${endLine}\0${value}`).digest("hex"),
      });
    }
    start = null;
    buffer = [];
  };
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*(?:```|~~~)/u.test(line)) {
      if (!fenced) flush(index);
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    const headingMatch = /^#{1,6}\s+(.+)$/u.exec(line);
    if (headingMatch) {
      flush(index);
      heading = headingMatch[1].trim();
      continue;
    }
    if (!line.trim()) {
      flush(index);
      continue;
    }
    // Markdown lists and tables often contain many independent claims without
    // blank lines between them.  Treating the whole block as one passage made
    // navigation maps look semantically relevant to almost every query and
    // produced receipts spanning hundreds of lines.  Start a new bounded unit
    // at each structural row while retaining indented continuation lines.
    const structuralRow = /^(?:[-*+]\s+|\d+[.)]\s+|>|\|)/u.test(line);
    if (structuralRow && buffer.length) flush(index);
    if (/^\|?(?:\s*:?-{3,}:?\s*\|)+\s*$/u.test(line)) continue;
    if (start === null) start = index + 1;
    buffer.push(line);
  }
  flush(lines.length);
  return units;
}

function resolveMarkdownTarget(root, sourcePath, rawTarget) {
  let target = rawTarget.trim();
  if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
  if (/^(?:https?:|mailto:|data:|#)/iu.test(target)) return null;
  target = target.split("#", 1)[0].split("?", 1)[0];
  if (!target || /[\\|{}]/u.test(target)) return null;
  try { target = decodeURIComponent(target); } catch { /* keep source spelling */ }
  let resolved = toPosix(normalize(join(dirname(sourcePath), target)));
  const absolute = join(root, resolved);
  if (existsSync(absolute) && statSync(absolute).isDirectory()) resolved = toPosix(join(resolved, "README.md"));
  return resolved.toLowerCase().endsWith(".md") ? resolved : null;
}

function localLinks(root, path, text) {
  return [...text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/gu)]
    .map(match => resolveMarkdownTarget(root, path, match[1]))
    .filter(Boolean);
}

function localLinkContexts(root, path, units) {
  const contexts = [];
  for (const unit of units) {
    for (const targetPath of new Set(localLinks(root, path, unit.rawText))) contexts.push({
      targetPath,
      unit,
      bridgeSha256: createHash("sha256").update(`${path}\0${unit.lineStart}\0${unit.lineEnd}\0${targetPath}\0${unit.rawText}`).digest("hex"),
    });
  }
  return contexts;
}

function evidenceTarget(link) {
  return {
    role: link.role,
    roleState: link.roleState,
    path: link.target?.path ?? null,
    url: link.target?.url ?? null,
    label: link.observation?.label ?? null,
    line: link.observation?.line ?? null,
  };
}

function loadEvidenceSpine(root) {
  const path = join(root, "corpus", "registers", "corpus_evidence_spine.json");
  if (!existsSync(path)) return { path: null, sha256: null, byPath: new Map() };
  try {
    const raw = readFileSync(path);
    const spine = JSON.parse(raw.toString("utf8"));
    const byPath = new Map((spine.claims ?? []).map(claim => [claim.identity.path, {
      legacyId: claim.legacyId,
      key: claim.key,
      identityState: claim.identity.state,
      titleState: claim.title.state,
      declarations: Object.fromEntries(Object.entries(claim.declarations ?? {}).map(([name, values]) => [name, values.map(item => ({ value: item.value, state: item.state, line: item.line }))])),
      verdictSignals: claim.inferredVerdictSignals ?? [],
      coverage: claim.coverage ?? {},
      evidenceLinks: (claim.links ?? []).filter(link => ["source", "evidence", "certificate"].includes(link.role)).slice(0, 24).map(evidenceTarget),
      inboundConsumerCount: claim.inboundReferences?.length ?? 0,
      inboundConsumers: (claim.inboundReferences ?? []).slice(0, 12).map(reference => ({ path: reference.source?.path ?? reference.path ?? null, line: reference.observation?.line ?? null })),
    }]));
    return { path, sha256: createHash("sha256").update(raw).digest("hex"), byPath };
  } catch {
    return { path: null, sha256: null, byPath: new Map() };
  }
}

function buildIndex(root) {
  const resolvedRoot = resolve(root instanceof URL ? fileURLToPath(root) : root);
  const now = Date.now();
  if (cache?.root === resolvedRoot && now - cache.checkedAt < cacheValidationIntervalMs) return cache.index;
  const paths = [...new Set(markdownRoots.flatMap(item => walkMarkdown(resolvedRoot, item)))].sort();
  const evidenceSpinePath = join(resolvedRoot, "corpus", "registers", "corpus_evidence_spine.json");
  const fingerprintHash = createHash("sha256");
  for (const path of paths) {
    const metadata = statSync(join(resolvedRoot, path));
    fingerprintHash.update(`${path}\0${metadata.size}\0${metadata.mtimeMs}\n`);
  }
  if (existsSync(evidenceSpinePath)) {
    const metadata = statSync(evidenceSpinePath);
    fingerprintHash.update(`corpus/registers/corpus_evidence_spine.json\0${metadata.size}\0${metadata.mtimeMs}\n`);
  }
  const fingerprint = fingerprintHash.digest("hex");
  if (cache?.root === resolvedRoot && cache.fingerprint === fingerprint) {
    cache.checkedAt = now;
    return cache.index;
  }
  const evidenceSpine = loadEvidenceSpine(resolvedRoot);
  const contentHash = createHash("sha256");
  const documents = paths.map((path, id) => {
    const text = readFileSync(join(resolvedRoot, path), "utf8");
    if (!contentIdentityExcludedPaths.has(path)) {
      contentHash.update(`${path}\0`);
      contentHash.update(text);
      contentHash.update("\n");
    }
    const semanticText = semanticMarkdown(text);
    const title = extractTitle(text, path);
    const claimUnits = extractClaimUnits(text, path);
    const linkContexts = localLinkContexts(resolvedRoot, path, claimUnits);
    for (const unit of claimUnits) delete unit.rawText;
    const headings = [...semanticText.matchAll(/^#{2,6}\s+(.+)$/gmu)].map(match => match[1]).join(" ");
    const bodyTokens = tokenize(semanticText);
    const counts = new Map();
    addTokens(counts, bodyTokens, 1);
    addTokens(counts, tokenize(headings), 2.5);
    addTokens(counts, tokenize(title), 7);
    addTokens(counts, tokenize(path.replaceAll(/[\/_-]/gu, " ")), 2);
    return {
      id,
      path,
      title,
      status: extractStatus(text, path),
      claimEvidence: evidenceSpine.byPath.get(path) ?? null,
      prior: navigationPrior(path),
      lowerText: semanticText.toLowerCase(),
      length: Math.max(bodyTokens.length, 1),
      counts,
      claimUnits,
      linkContexts,
      links: [...new Set(linkContexts.map(context => context.targetPath))],
    };
  });
  const pathToId = new Map(documents.map(document => [document.path, document.id]));
  const documentFrequency = new Map();
  const documentIdsByToken = new Map();
  for (const document of documents) for (const token of document.counts.keys()) {
    documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
    if (!documentIdsByToken.has(token)) documentIdsByToken.set(token, []);
    documentIdsByToken.get(token).push(document.id);
  }
  const claimUnits = documents.flatMap(document => document.claimUnits.map(unit => {
    unit.documentId = document.id;
    return unit;
  }));
  const claimDocumentFrequency = new Map();
  const claimUnitIdsByToken = new Map();
  for (const unit of claimUnits) {
    for (const token of unit.tokenSet) {
      claimDocumentFrequency.set(token, (claimDocumentFrequency.get(token) ?? 0) + 1);
      if (!claimUnitIdsByToken.has(token)) claimUnitIdsByToken.set(token, []);
      claimUnitIdsByToken.get(token).push(unit);
    }
  }
  const linkContexts = [];
  for (const document of documents) {
    for (const context of document.linkContexts) {
      const targetDocumentId = pathToId.get(context.targetPath);
      if (targetDocumentId === undefined || targetDocumentId === document.id) continue;
      linkContexts.push({
        ...context,
        sourceDocumentId: document.id,
        targetDocumentId,
        sourcePath: document.path,
        targetPath: context.targetPath,
      });
    }
  }
  const linkContextDocumentFrequency = new Map();
  const linkContextsByToken = new Map();
  for (const context of linkContexts) for (const token of context.unit.tokenSet) {
    linkContextDocumentFrequency.set(token, (linkContextDocumentFrequency.get(token) ?? 0) + 1);
    if (!linkContextsByToken.has(token)) linkContextsByToken.set(token, []);
    linkContextsByToken.get(token).push(context);
  }
  const adjacency = documents.map(() => new Map());
  const connect = (from, to, weight) => {
    if (from === to) return;
    adjacency[from].set(to, Math.max(adjacency[from].get(to) ?? 0, weight));
  };
  for (const document of documents) {
    for (const path of document.links) {
      const target = pathToId.get(path);
      if (target === undefined) continue;
      connect(document.id, target, 1);
      connect(target, document.id, 0.35);
    }
  }
  const graphRows = adjacency.map(edges => {
    const entries = [...edges];
    return { entries, totalWeight: entries.reduce((sum, [, weight]) => sum + weight, 0) };
  });
  const index = {
    root: resolvedRoot,
    documents,
    claimUnits,
    claimUnitIdsByToken,
    claimDocumentFrequency,
    linkContexts,
    linkContextsByToken,
    linkContextDocumentFrequency,
    documentFrequency,
    documentIdsByToken,
    vocabulary: [...documentFrequency.keys()],
    graphRows,
    contentSha256: contentHash.update(`evidence-spine\0${evidenceSpine.sha256 ?? "missing"}`).digest("hex"),
    evidenceSpineSha256: evidenceSpine.sha256,
    averageLength: documents.reduce((sum, document) => sum + document.length, 0) / Math.max(documents.length, 1),
    averageClaimLength: claimUnits.reduce((sum, unit) => sum + unit.length, 0) / Math.max(claimUnits.length, 1),
    averageLinkContextLength: linkContexts.reduce((sum, context) => sum + context.unit.length, 0) / Math.max(linkContexts.length, 1),
  };
  cache = { root: resolvedRoot, fingerprint, checkedAt: now, index };
  return index;
}

function levenshtein(left, right, ceiling) {
  if (Math.abs(left.length - right.length) > ceiling) return ceiling + 1;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    const current = [i];
    let rowMinimum = i;
    for (let j = 1; j <= right.length; j += 1) {
      const value = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1));
      current.push(value);
      rowMinimum = Math.min(rowMinimum, value);
    }
    if (rowMinimum > ceiling) return ceiling + 1;
    previous = current;
  }
  return previous.at(-1);
}

function correctTokens(tokens, index) {
  const corrected = [];
  const corrections = [];
  for (const token of tokens) {
    if (index.documentFrequency.has(token)) {
      corrected.push(token);
      continue;
    }
    const known = KNOWN_CORRECTIONS.get(token);
    if (known && index.documentFrequency.has(stem(known))) {
      corrected.push(stem(known));
      corrections.push({ from: token, to: stem(known), method: "known corpus spelling" });
      continue;
    }
    const ceiling = token.length >= 8 ? 2 : token.length >= 5 ? 1 : 0;
    let best = null;
    if (ceiling > 0) {
      for (const candidate of index.vocabulary) {
        if ((index.documentFrequency.get(candidate) ?? 0) < 2 || Math.abs(candidate.length - token.length) > ceiling) continue;
        const distance = levenshtein(token, candidate, ceiling);
        if (distance <= ceiling && (!best || distance < best.distance || (distance === best.distance && index.documentFrequency.get(candidate) > best.frequency))) {
          best = { token: candidate, distance, frequency: index.documentFrequency.get(candidate) };
        }
      }
    }
    if (best) {
      corrected.push(best.token);
      corrections.push({ from: token, to: best.token, method: `edit distance ${best.distance}` });
    } else corrected.push(token);
  }
  return { tokens: corrected, corrections };
}

function lexicalScores(index, tokens, rawQuery) {
  const scores = new Float64Array(index.documents.length);
  const n = index.documents.length;
  const k1 = 1.35;
  const b = 0.72;
  const candidateIds = tokens.length
    ? new Set(tokens.flatMap(token => index.documentIdsByToken.get(token) ?? []))
    : new Set(index.documents.map(document => document.id));
  for (const id of candidateIds) {
    const document = index.documents[id];
    let score = 0;
    for (const token of tokens) {
      const tf = document.counts.get(token) ?? 0;
      if (!tf) continue;
      const df = index.documentFrequency.get(token) ?? 0;
      const idf = Math.log(1 + (n - df + 0.5) / (df + 0.5));
      const denominator = tf + k1 * (1 - b + b * document.length / index.averageLength);
      score += idf * (tf * (k1 + 1)) / denominator;
    }
    const phrase = rawQuery.trim().toLowerCase();
    if (phrase.length >= 4) {
      if (document.title.toLowerCase().includes(phrase)) score += 8;
      else if (document.lowerText.includes(phrase)) score += 2.5;
    }
    scores[document.id] = score * document.prior;
  }
  return scores;
}

function distributionalExpansion(index, tokens) {
  const combined = new Map();
  for (const sourceToken of tokens) {
    const sourceDocumentFrequency = index.documentFrequency.get(sourceToken) ?? 0;
    if (!sourceDocumentFrequency || sourceDocumentFrequency > index.documents.length * 0.12) continue;
    const units = index.claimUnitIdsByToken.get(sourceToken) ?? [];
    if (!units.length) continue;
    const cooccurrence = new Map();
    for (const unit of units) {
      for (const candidate of unit.tokenSet) {
        if (candidate === sourceToken || tokens.includes(candidate)) continue;
        cooccurrence.set(candidate, (cooccurrence.get(candidate) ?? 0) + 1);
      }
    }
    const candidates = [...cooccurrence]
      .filter(([token, count]) => token.length >= 3
        && token.length <= 32
        && /^[\p{L}][\p{L}-]+$/u.test(token)
        && (index.documentFrequency.get(token) ?? 0) >= 3
        && count >= Math.max(2, Math.ceil(units.length * 0.02)))
      .map(([token, count]) => {
      const candidateFrequency = index.claimDocumentFrequency.get(token) ?? 1;
      const conditional = count / units.length;
      const background = candidateFrequency / index.claimUnits.length;
      const lift = Math.max(0, Math.log((conditional + 1 / index.claimUnits.length) / (background + 1 / index.claimUnits.length)));
      const rarity = Math.log(1 + index.claimUnits.length / candidateFrequency) / Math.log(1 + index.claimUnits.length);
      return { token, via: sourceToken, cooccurrence: count, weight: Math.sqrt(count) * lift * rarity / Math.log(1 + index.claimUnits.length) };
    }).filter(item => item.weight > 0)
      .sort((left, right) => right.weight - left.weight || left.token.localeCompare(right.token))
      .slice(0, 10);
    for (const candidate of candidates) {
      const prior = combined.get(candidate.token);
      if (!prior) combined.set(candidate.token, { ...candidate, vias: new Set([candidate.via]) });
      else {
        prior.weight += candidate.weight;
        prior.cooccurrence += candidate.cooccurrence;
        prior.vias.add(candidate.via);
      }
    }
  }
  const values = [...combined.values()];
  const multiSignal = values.filter(item => item.vias.size >= 2);
  return multiSignal
    .map(item => ({ ...item, via: [...item.vias].sort().join("+") , weight: item.weight * (1 + 0.35 * (item.vias.size - 1)) }))
    .sort((left, right) => right.weight - left.weight || left.token.localeCompare(right.token))
    .slice(0, 12);
}

function linkContextScores(index, tokens, rawQuery) {
  const scores = new Float64Array(index.documents.length);
  const best = new Array(index.documents.length).fill(null);
  const n = index.linkContexts.length;
  if (!n) return { scores, best };
  const k1 = 1.2;
  const b = 0.68;
  const phrase = rawQuery.trim().toLowerCase();
  const candidates = tokens.length
    ? new Set(tokens.flatMap(token => index.linkContextsByToken.get(token) ?? []))
    : new Set(index.linkContexts);
  for (const context of candidates) {
    let score = 0;
    for (const token of tokens) {
      const tf = context.unit.counts.get(token) ?? 0;
      if (!tf) continue;
      const df = index.linkContextDocumentFrequency.get(token) ?? 0;
      const idf = Math.log(1 + (n - df + 0.5) / (df + 0.5));
      const denominator = tf + k1 * (1 - b + b * context.unit.length / index.averageLinkContextLength);
      score += idf * (tf * (k1 + 1)) / denominator;
    }
    if (phrase.length >= 4 && context.unit.lowerText.includes(phrase)) score += 3;
    if (score <= scores[context.targetDocumentId]) continue;
    scores[context.targetDocumentId] = score;
    best[context.targetDocumentId] = {
      kind: "link-context",
      sourcePath: context.sourcePath,
      targetPath: context.targetPath,
      heading: context.unit.heading,
      lineStart: context.unit.lineStart,
      lineEnd: context.unit.lineEnd,
      text: context.unit.text.length > 420 ? `${context.unit.text.slice(0, 417)}…` : context.unit.text,
      bridgeSha256: context.bridgeSha256,
    };
  }
  return { scores, best };
}

function claimLevelScores(index, tokens, rawQuery, expansion) {
  const direct = new Float64Array(index.documents.length);
  const semantic = new Float64Array(index.documents.length);
  const best = new Array(index.documents.length).fill(null);
  const n = index.claimUnits.length;
  const k1 = 1.2;
  const b = 0.68;
  const phrase = rawQuery.trim().toLowerCase();
  const scoreTokens = (unit, weightedTokens) => weightedTokens.reduce((sum, item) => {
    const tf = unit.counts.get(item.token) ?? 0;
    if (!tf) return sum;
    const df = index.claimDocumentFrequency.get(item.token) ?? 0;
    const idf = Math.log(1 + (n - df + 0.5) / (df + 0.5));
    const denominator = tf + k1 * (1 - b + b * unit.length / index.averageClaimLength);
    return sum + item.weight * idf * (tf * (k1 + 1)) / denominator;
  }, 0);
  const scoringTokens = [...tokens, ...expansion.map(item => item.token)];
  const candidates = scoringTokens.length
    ? new Set(scoringTokens.flatMap(token => index.claimUnitIdsByToken.get(token) ?? []))
    : new Set(index.claimUnits);
  const boundaryRequested = /\b(?:open|boundary|gate|limit|fail|falsif|obstruction|no-go)\b/iu.test(rawQuery);
  for (const unit of candidates) {
    let directScore = scoreTokens(unit, tokens.map(token => ({ token, weight: 1 })));
    if (phrase.length >= 4 && unit.lowerText.includes(phrase)) directScore += 3;
    const semanticScore = scoreTokens(unit, expansion.map(item => ({ token: item.token, weight: Math.min(0.45, item.weight) })));
    const roleMultiplier = boundaryRequested && ["boundary", "falsifier", "status"].includes(unit.role) ? 1.12 : 1;
    directScore *= roleMultiplier;
    const total = directScore + semanticScore;
    if (directScore > direct[unit.documentId]) direct[unit.documentId] = directScore;
    if (semanticScore > semantic[unit.documentId]) semantic[unit.documentId] = semanticScore;
    if (!best[unit.documentId] || total > best[unit.documentId].total) best[unit.documentId] = {
      total,
      role: unit.role,
      heading: unit.heading,
      lineStart: unit.lineStart,
      lineEnd: unit.lineEnd,
      text: unit.text.length > 420 ? `${unit.text.slice(0, 417)}…` : unit.text,
      claimSha256: unit.claimSha256,
    };
  }
  return { direct, semantic, best };
}

function profileRootIds(index, profile) {
  if (!profile || profile === "all") return [];
  const path = join(index.root, "corpus", "front-door.routes.json");
  if (!existsSync(path)) return [];
  const routes = JSON.parse(readFileSync(path, "utf8"));
  const rootById = new Map(routes.routes.flatMap(route => route.roots).map(root => [root.id, root.path]));
  const selected = routes.minimumViableProfiles.find(item => item.id === profile);
  return selected ? selected.rootIds.map(id => rootById.get(id)).filter(Boolean).map(pathValue => index.documents.find(item => item.path === pathValue)?.id).filter(id => id !== undefined) : [];
}

function personalization(index, lexical, profile) {
  const vector = new Float64Array(index.documents.length);
  const ranked = [...index.documents].filter(document => lexical[document.id] > 0).sort((a, b) => lexical[b.id] - lexical[a.id]).slice(0, 40);
  const roots = profileRootIds(index, profile);
  for (const document of ranked) vector[document.id] += Math.sqrt(lexical[document.id]);
  const lexicalMass = vector.reduce((sum, value) => sum + value, 0);
  if (roots.length) {
    const rootUnit = lexicalMass > 0 ? lexicalMass * 0.12 / roots.length : 1 / roots.length;
    for (const id of roots) vector[id] += rootUnit;
  }
  let total = vector.reduce((sum, value) => sum + value, 0);
  if (total === 0) return vector;
  for (let i = 0; i < vector.length; i += 1) vector[i] /= total;
  return vector;
}

function personalizedPageRank(index, teleport, mixing, iterations = 160, tolerance = 1e-12) {
  const size = index.documents.length;
  let rank = Float64Array.from(teleport);
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const next = new Float64Array(size);
    for (let i = 0; i < size; i += 1) next[i] = mixing * teleport[i];
    let dangling = 0;
    for (let source = 0; source < size; source += 1) {
      const row = index.graphRows[source];
      if (!row.entries.length) {
        dangling += rank[source];
        continue;
      }
      const propagated = (1 - mixing) * rank[source] / row.totalWeight;
      for (const [target, weight] of row.entries) next[target] += propagated * weight;
    }
    if (dangling) for (let i = 0; i < size; i += 1) next[i] += (1 - mixing) * dangling * teleport[i];
    let delta = 0;
    for (let i = 0; i < size; i += 1) delta += Math.abs(next[i] - rank[i]);
    rank = next;
    if (delta < tolerance) break;
  }
  return rank;
}

function bestSnippet(document, tokens) {
  const lines = document.claimUnits.map(unit => unit.text).filter(line => line.trim() && !/^\s*(?:\||[-*]\s*\[)/u.test(line));
  let best = { score: -1, line: "" };
  for (const line of lines) {
    const normalized = line.toLowerCase();
    const score = tokens.reduce((sum, token) => sum + (normalized.includes(token) ? 1 : 0), 0) + (/^#{1,6}\s/u.test(line) ? 0.3 : 0);
    if (score > best.score) best = { score, line };
  }
  const clean = best.line.replace(/^#{1,6}\s*/u, "").replaceAll(/[*_`]/gu, "").trim();
  return clean.length > 260 ? `${clean.slice(0, 257)}…` : clean;
}

export function searchCorpus({ root = process.cwd(), query, limit = 12, profile = "all", ...weights } = {}) {
  const graphWeight = weights.graphWeight ?? DEFAULT_RETRIEVAL_WEIGHTS.graphWeight;
  const claimWeight = weights.claimWeight ?? DEFAULT_RETRIEVAL_WEIGHTS.claimWeight;
  const semanticWeight = weights.semanticWeight ?? DEFAULT_RETRIEVAL_WEIGHTS.semanticWeight;
  if (!query?.trim()) throw new Error("search query is required");
  for (const [name, value, maximum] of [["graphWeight", graphWeight, 0.6], ["claimWeight", claimWeight, 0.35], ["semanticWeight", semanticWeight, 0.2]]) {
    if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > maximum) throw new Error(`${name} must be from 0 to ${maximum}`);
  }
  if (graphWeight + claimWeight + semanticWeight >= 1) throw new Error("graphWeight + claimWeight + semanticWeight must be less than 1");
  const index = buildIndex(root);
  const initialTokens = tokenize(query);
  const { tokens, corrections } = correctTokens(initialTokens, index);
  const lexical = lexicalScores(index, tokens, query);
  const semanticExpansion = distributionalExpansion(index, tokens);
  const claims = claimLevelScores(index, tokens, query, semanticExpansion);
  const linkContexts = linkContextScores(index, tokens, query);
  const mixingValues = [0.08, 0.15, 0.35];
  const lexicalWeight = Number((1 - graphWeight - claimWeight - semanticWeight).toFixed(12));
  const method = {
    lexical: "BM25-style weighted title, heading, path and body relevance",
    claim: "best structurally bounded Markdown paragraph, list item or table row BM25 relevance with exact line and byte-derived identity",
    semantic: "confidence-gated corpus-local distributional expansion plus exact cross-reference passage bridges; no external embedding model",
    graph: "personalized PageRank over local Markdown links with 0.35 reverse-navigation edges",
    finalWeights: { lexical: lexicalWeight, claim: claimWeight, semantic: semanticWeight, graph: graphWeight },
    semanticExpansion: semanticExpansion.map(item => ({ token: item.token, via: item.via, cooccurrence: item.cooccurrence, weight: Number(item.weight.toFixed(6)) })),
    selectorSweep: mixingValues,
    authorityBoundary: "Scores order navigation candidates; they do not change epistemic status or establish truth.",
  };
  const teleport = personalization(index, lexical, profile);
  const teleportMass = teleport.reduce((sum, value) => sum + value, 0);
  if (teleportMass === 0) return {
    schema: "spin23-corpus-search-result/v1",
    query,
    correctedQuery: tokens.join(" "),
    corrections,
    profile,
    method,
    documents: index.documents.length,
    corpusContentSha256: index.contentSha256,
    evidenceSpineSha256: index.evidenceSpineSha256,
    results: [],
  };
  const ranks = mixingValues.map(value => personalizedPageRank(index, teleport, value));
  const defaultRank = ranks[1];
  const maxLexical = Math.max(...lexical, 1e-30);
  const maxGraph = Math.max(...defaultRank, 1e-30);
  const maxClaim = Math.max(...claims.direct, 1e-30);
  const maxSemantic = Math.max(...claims.semantic, 1e-30);
  const maxLinkContext = Math.max(...linkContexts.scores, 1e-30);
  const finalScores = index.documents.map(document => {
    const lexicalPart = lexical[document.id] / maxLexical;
    const graphPart = defaultRank[document.id] / maxGraph;
    const claimPart = claims.direct[document.id] / maxClaim;
    const semanticPart = Math.max(claims.semantic[document.id] / maxSemantic, linkContexts.scores[document.id] / maxLinkContext);
    // Let links expand a relevant result set without allowing generic, highly
    // connected navigation pages to outrank documents that answer the query.
    const localRelevance = Math.max(lexicalPart, claimPart, semanticPart * 0.75);
    const relevanceGatedGraphPart = graphPart * (0.2 + 0.8 * Math.sqrt(localRelevance));
    return lexicalWeight * lexicalPart + claimWeight * claimPart + semanticWeight * semanticPart + graphWeight * relevanceGatedGraphPart;
  });
  const sweepPositions = ranks.map(rank => {
    const order = index.documents.map(document => document.id).sort((a, b) => rank[b] - rank[a]);
    const positions = new Int32Array(index.documents.length);
    order.forEach((id, position) => { positions[id] = position + 1; });
    return positions;
  });
  const results = index.documents
    .filter(document => finalScores[document.id] > 0)
    .sort((a, b) => finalScores[b.id] - finalScores[a.id] || a.path.localeCompare(b.path))
    .slice(0, Math.max(1, Number(limit)))
    .map((document, position) => {
      const sweepRanks = sweepPositions.map(positions => positions[document.id]);
      const distinctQueryTokens = [...new Set(tokens)];
      const matchedQueryTokens = distinctQueryTokens.filter(token => document.counts.has(token));
      const queryTokenCoverage = distinctQueryTokens.length ? matchedQueryTokens.length / distinctQueryTokens.length : 0;
      const normalizedLexical = lexical[document.id] / maxLexical;
      const normalizedClaim = claims.direct[document.id] / maxClaim;
      const normalizedSemantic = Math.max(claims.semantic[document.id] / maxSemantic, linkContexts.scores[document.id] / maxLinkContext);
      const normalizedGraph = defaultRank[document.id] / maxGraph;
      const supportClass = queryTokenCoverage >= 0.5 && normalizedClaim >= 0.25
        ? "direct-passage"
        : normalizedSemantic >= 0.25 && linkContexts.best[document.id]
          ? "cross-reference-bridge"
          : normalizedGraph > Math.max(normalizedLexical, normalizedClaim, normalizedSemantic)
            ? "graph-assisted"
            : "weak-local-match";
      return {
        rank: position + 1,
        path: document.path,
        title: document.title,
        status: document.status,
        claimEvidence: document.claimEvidence,
        score: Number(finalScores[document.id].toFixed(6)),
        lexicalScore: Number(normalizedLexical.toFixed(6)),
        claimScore: Number(normalizedClaim.toFixed(6)),
        semanticScore: Number(normalizedSemantic.toFixed(6)),
        graphScore: Number(normalizedGraph.toFixed(6)),
        retrievalSupport: {
          class: supportClass,
          queryTokenCoverage: Number(queryTokenCoverage.toFixed(6)),
          matchedQueryTokens,
          authorityBoundary: "Retrieval support explains navigation fit; it is not confidence in truth or claim validity.",
        },
        claimMatch: claims.best[document.id],
        semanticBridge: linkContexts.best[document.id],
        navigationPrior: document.prior,
        selectorSweep: Object.fromEntries(mixingValues.map((value, indexValue) => [value.toFixed(2), sweepRanks[indexValue]])),
        selectorRankSpread: Math.max(...sweepRanks) - Math.min(...sweepRanks),
        snippet: bestSnippet(document, tokens),
      };
    });
  return {
    schema: "spin23-corpus-search-result/v1",
    query,
    correctedQuery: tokens.join(" "),
    corrections,
    profile,
    method,
    documents: index.documents.length,
    corpusContentSha256: index.contentSha256,
    evidenceSpineSha256: index.evidenceSpineSha256,
    results,
  };
}

function parseArguments(argv) {
  const options = { limit: 12, profile: "all", ...DEFAULT_RETRIEVAL_WEIGHTS, json: false };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--query" || value === "-q") options.query = argv[++index];
    else if (value === "--limit" || value === "-n") options.limit = Number(argv[++index]);
    else if (value === "--profile") options.profile = argv[++index];
    else if (value === "--graph-weight") options.graphWeight = Number(argv[++index]);
    else if (value === "--claim-weight") options.claimWeight = Number(argv[++index]);
    else if (value === "--semantic-weight") options.semanticWeight = Number(argv[++index]);
    else if (value === "--json") options.json = true;
    else positional.push(value);
  }
  options.query ??= positional.join(" ");
  return options;
}

function renderText(result) {
  const correction = result.corrections.length ? `\nCorrected: ${result.corrections.map(item => `${item.from}→${item.to}`).join(", ")}` : "";
  const header = `Corpus search: ${result.query}${correction}\n${result.documents} documents · profile=${result.profile} · lexical/claim/semantic/graph=${result.method.finalWeights.lexical.toFixed(2)}/${result.method.finalWeights.claim.toFixed(2)}/${result.method.finalWeights.semantic.toFixed(2)}/${result.method.finalWeights.graph.toFixed(2)}`;
  const rows = result.results.map(item => `\n${item.rank}. ${item.title}\n   ${item.path}\n   score=${item.score.toFixed(4)} lexical=${item.lexicalScore.toFixed(4)} claim=${item.claimScore.toFixed(4)} semantic=${item.semanticScore.toFixed(4)} graph=${item.graphScore.toFixed(4)} selector-ranks=${Object.values(item.selectorSweep).join("/")} status=${item.status}\n   claim=${item.claimMatch?.role ?? "none"}@${item.claimMatch?.lineStart ?? "?"}: ${item.claimMatch?.text ?? item.snippet}`);
  return `${header}\n${rows.join("\n")}\n\nScores are navigation aids, not epistemic promotion.`;
}

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const options = parseArguments(process.argv.slice(2));
    const result = searchCorpus(options);
    console.log(options.json ? JSON.stringify(result, null, 2) : renderText(result));
  } catch (error) {
    console.error(error.message);
    console.error("Usage: node tooling/search/search_corpus.mjs --query \"casimir boundary response\" [--limit 12] [--profile all|interpret|choose-work|audit|experiment] [--graph-weight 0.2] [--claim-weight 0.2] [--semantic-weight 0.2] [--json]");
    process.exitCode = 1;
  }
}

