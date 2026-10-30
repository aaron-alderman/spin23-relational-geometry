import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { posix, relative, resolve, sep } from "node:path";
import { searchCorpus } from "./search_corpus.mjs";
import { composeFederatedContext } from "./federated_context.mjs";

const normalizePath = value => value.replaceAll("\\", "/");
const exactHash = bytes => createHash("sha256").update(bytes).digest("hex");

function safeSource(root, sourcePath) {
  const absoluteRoot = resolve(root);
  const absolute = resolve(absoluteRoot, sourcePath);
  if (absolute !== absoluteRoot && !absolute.startsWith(`${absoluteRoot}${sep}`)) throw new Error(`federation source escapes root: ${sourcePath}`);
  const relativePath = normalizePath(relative(absoluteRoot, absolute));
  if (relativePath !== sourcePath) throw new Error(`federation source identity is not canonical: ${sourcePath}`);
  const bytes = readFileSync(absolute);
  return { absolute, bytes, text: bytes.toString("utf8"), contentSha256: exactHash(bytes) };
}

function firstCanonicalAuthoredLink(publicationPath, markdown) {
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/gu)) {
    const href = match[1].split("#", 1)[0];
    if (!href || /^[a-z][a-z0-9+.-]*:/iu.test(href) || href.startsWith("/")) continue;
    let decoded;
    try { decoded = decodeURIComponent(href); } catch { continue; }
    const target = posix.resolve("/", posix.dirname(publicationPath), decoded).slice(1);
    if (target.startsWith("corpus/") && !target.includes("../")) return target;
  }
  return null;
}

export function adaptLocalFederationResult({ root, corpusContentSha256, result }) {
  const lane = result.path.startsWith("corpus/")
    ? "canonical-corpus"
    : result.path.startsWith("book/edition-3/")
      ? "publication"
      : null;
  if (!lane) return null;
  const source = safeSource(root, result.path);
  const authoredTarget = lane === "publication" ? firstCanonicalAuthoredLink(result.path, source.text) : null;
  return {
    objectId: result.path,
    revision: `sha256:${source.contentSha256}`,
    contentSha256: source.contentSha256,
    status: lane === "publication" ? `publication-reading-surface; source-status=${result.status}` : result.status,
    withinLaneScore: result.score,
    relation: authoredTarget ? { kind: "authored-link", target: authoredTarget } : { kind: lane === "canonical-corpus" ? "same-source" : "query-generated", target: result.path },
    readAuthority: true,
    promotionAuthority: false,
    corpusContentSha256,
    title: result.title,
    snippet: result.snippet,
    retrievalSupport: result.retrievalSupport,
  };
}

export function createLocalFederatedContext({ root = process.cwd(), query, profile = "all", perLaneLimit = 6, maxSources = 10, search = searchCorpus } = {}) {
  if (!Number.isSafeInteger(perLaneLimit) || perLaneLimit < 1 || perLaneLimit > 25) throw new Error("perLaneLimit must be an integer from 1 to 25");
  const searchResult = search({ root, query, profile, limit: Math.max(maxSources * 6, perLaneLimit * 8) });
  const lanes = { "canonical-corpus": [], publication: [] };
  for (const result of searchResult.results) {
    const adapted = adaptLocalFederationResult({ root, corpusContentSha256: searchResult.corpusContentSha256, result });
    if (adapted && lanes[adapted.objectId.startsWith("corpus/") ? "canonical-corpus" : "publication"].length < perLaneLimit) {
      lanes[adapted.objectId.startsWith("corpus/") ? "canonical-corpus" : "publication"].push(adapted);
    }
  }
  const packet = composeFederatedContext({ lanes, quotas: { "canonical-corpus": perLaneLimit, publication: perLaneLimit }, maxSources });
  return {
    protocol: "spin23-local-federation/1",
    query: searchResult.query,
    profile: searchResult.profile,
    corpusContentSha256: searchResult.corpusContentSha256,
    evidenceSpineSha256: searchResult.evidenceSpineSha256,
    adapters: {
      "canonical-corpus": { authority: "canonical source lane", revisionPinned: true },
      publication: { authority: "reading surface only", revisionPinned: true },
    },
    ...packet,
  };
}
