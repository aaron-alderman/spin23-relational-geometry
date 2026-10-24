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
const contentIdentityExcludedPaths = new Set(["corpus/FRONT_DOOR.md"]);
const cacheValidationIntervalMs = 5000;
let cache = null;

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
  return text.replace(/^\s*```[^\r\n]*\r?\n[\s\S]*?^\s*```\s*$/gmu, "");
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
      text,
      semanticText,
      lowerText: semanticText.toLowerCase(),
      length: Math.max(bodyTokens.length, 1),
      counts,
      links: localLinks(resolvedRoot, path, text),
    };
  });
  const pathToId = new Map(documents.map(document => [document.path, document.id]));
  const documentFrequency = new Map();
  for (const document of documents) for (const token of document.counts.keys()) documentFrequency.set(token, (documentFrequency.get(token) ?? 0) + 1);
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
  const index = {
    root: resolvedRoot,
    documents,
    documentFrequency,
    vocabulary: [...documentFrequency.keys()],
    adjacency,
    contentSha256: contentHash.update(`evidence-spine\0${evidenceSpine.sha256 ?? "missing"}`).digest("hex"),
    evidenceSpineSha256: evidenceSpine.sha256,
    averageLength: documents.reduce((sum, document) => sum + document.length, 0) / Math.max(documents.length, 1),
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
  for (const document of index.documents) {
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
      const edges = index.adjacency[source];
      if (!edges.size) {
        dangling += rank[source];
        continue;
      }
      const totalWeight = [...edges.values()].reduce((sum, value) => sum + value, 0);
      for (const [target, weight] of edges) next[target] += (1 - mixing) * rank[source] * weight / totalWeight;
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
  const lines = document.semanticText.split(/\r?\n/u).filter(line => line.trim() && !/^\s*(?:```|\||[-*]\s*\[)/u.test(line));
  let best = { score: -1, line: "" };
  for (const line of lines) {
    const normalized = line.toLowerCase();
    const score = tokens.reduce((sum, token) => sum + (normalized.includes(token) ? 1 : 0), 0) + (/^#{1,6}\s/u.test(line) ? 0.3 : 0);
    if (score > best.score) best = { score, line };
  }
  const clean = best.line.replace(/^#{1,6}\s*/u, "").replaceAll(/[*_`]/gu, "").trim();
  return clean.length > 260 ? `${clean.slice(0, 257)}…` : clean;
}

export function searchCorpus({ root = process.cwd(), query, limit = 12, profile = "all", graphWeight = 0.3 } = {}) {
  if (!query?.trim()) throw new Error("search query is required");
  const index = buildIndex(root);
  const initialTokens = tokenize(query);
  const { tokens, corrections } = correctTokens(initialTokens, index);
  const lexical = lexicalScores(index, tokens, query);
  const teleport = personalization(index, lexical, profile);
  const teleportMass = teleport.reduce((sum, value) => sum + value, 0);
  if (teleportMass === 0) return { query, correctedQuery: tokens.join(" "), corrections, profile, documents: index.documents.length, results: [] };
  const mixingValues = [0.08, 0.15, 0.35];
  const ranks = mixingValues.map(value => personalizedPageRank(index, teleport, value));
  const defaultRank = ranks[1];
  const maxLexical = Math.max(...lexical, 1e-30);
  const maxGraph = Math.max(...defaultRank, 1e-30);
  const finalScores = index.documents.map(document => {
    const lexicalPart = lexical[document.id] / maxLexical;
    const graphPart = defaultRank[document.id] / maxGraph;
    // Let links expand a relevant result set without allowing generic, highly
    // connected navigation pages to outrank documents that answer the query.
    const relevanceGatedGraphPart = graphPart * (0.2 + 0.8 * Math.sqrt(lexicalPart));
    return (1 - graphWeight) * lexicalPart + graphWeight * relevanceGatedGraphPart;
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
      return {
        rank: position + 1,
        path: document.path,
        title: document.title,
        status: document.status,
        claimEvidence: document.claimEvidence,
        score: Number(finalScores[document.id].toFixed(6)),
        lexicalScore: Number((lexical[document.id] / maxLexical).toFixed(6)),
        graphScore: Number((defaultRank[document.id] / maxGraph).toFixed(6)),
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
    method: {
      lexical: "BM25-style weighted title, heading, path and body relevance",
      graph: "personalized PageRank over local Markdown links with 0.35 reverse-navigation edges",
      finalWeights: { lexical: 1 - graphWeight, graph: graphWeight },
      selectorSweep: mixingValues,
      authorityBoundary: "Scores order navigation candidates; they do not change epistemic status or establish truth.",
    },
    documents: index.documents.length,
    corpusContentSha256: index.contentSha256,
    evidenceSpineSha256: index.evidenceSpineSha256,
    results,
  };
}

function parseArguments(argv) {
  const options = { limit: 12, profile: "all", graphWeight: 0.3, json: false };
  const positional = [];
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--query" || value === "-q") options.query = argv[++index];
    else if (value === "--limit" || value === "-n") options.limit = Number(argv[++index]);
    else if (value === "--profile") options.profile = argv[++index];
    else if (value === "--graph-weight") options.graphWeight = Number(argv[++index]);
    else if (value === "--json") options.json = true;
    else positional.push(value);
  }
  options.query ??= positional.join(" ");
  return options;
}

function renderText(result) {
  const correction = result.corrections.length ? `\nCorrected: ${result.corrections.map(item => `${item.from}→${item.to}`).join(", ")}` : "";
  const header = `Corpus search: ${result.query}${correction}\n${result.documents} documents · profile=${result.profile} · lexical/PageRank=${result.method.finalWeights.lexical.toFixed(2)}/${result.method.finalWeights.graph.toFixed(2)}`;
  const rows = result.results.map(item => `\n${item.rank}. ${item.title}\n   ${item.path}\n   score=${item.score.toFixed(4)} lexical=${item.lexicalScore.toFixed(4)} graph=${item.graphScore.toFixed(4)} selector-ranks=${Object.values(item.selectorSweep).join("/")} status=${item.status}\n   ${item.snippet}`);
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
    console.error("Usage: node tooling/search/search_corpus.mjs --query \"casimir boundary response\" [--limit 12] [--profile all|interpret|choose-work|audit|experiment] [--json]");
    process.exitCode = 1;
  }
}

