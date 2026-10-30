import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { basename, join, relative, resolve } from "node:path";
import { stableStringify } from "./belief_state.mjs";
import { composeFederatedContext } from "./federated_context.mjs";
import { createLocalFederatedContext } from "./local_federation_adapters.mjs";

const sha256 = value => createHash("sha256").update(value).digest("hex");
const normalizePath = value => value.replaceAll("\\", "/");
const words = value => String(value ?? "").toLowerCase().match(/[a-z0-9]{2,}/gu) ?? [];
const queryTokens = query => [...new Set(words(query))];
const objectHash = value => sha256(stableStringify(value));

function loadJson(root, path) {
  const bytes = readFileSync(resolve(root, path));
  return { path, bytes, sha256: sha256(bytes), value: JSON.parse(bytes.toString("utf8")) };
}
function score(query, title, body) {
  const titleWords = words(title);
  const bodyWords = words(body);
  return queryTokens(query).reduce((sum, token) => sum + titleWords.filter(word => word === token).length * 4 + bodyWords.filter(word => word === token).length, 0);
}
function rank(results, limit) {
  return results.filter(item => item.withinLaneScore > 0).sort((left, right) => right.withinLaneScore - left.withinLaneScore || left.objectId.localeCompare(right.objectId)).slice(0, limit);
}
function baseResult({ objectId, contentSha256, fileSha256, status, withinLaneScore, relation, ...rest }) {
  return { objectId, contentSha256, revision: `file-sha256:${fileSha256};object-sha256:${contentSha256}`, status, withinLaneScore, relation, readAuthority: true, promotionAuthority: false, ...rest };
}

export function adaptClaimipediaManifest({ root, query, limit = 6, path = "integrations/claimipedia/manifests/reflexive_closure_claimipedia_manifest.json" } = {}) {
  const source = loadJson(root, path);
  if (!Array.isArray(source.value.claims)) throw new Error("Claimipedia manifest lacks claims");
  const canonicalManifest = loadJson(root, "corpus/registers/spin23_corpus_manifest.json").value;
  const pathsByBasename = new Map();
  for (const entry of canonicalManifest.files ?? []) {
    const name = basename(entry.path);
    pathsByBasename.set(name, [...(pathsByBasename.get(name) ?? []), entry.path]);
  }
  return rank(source.value.claims.map(claim => {
    const identity = objectHash(claim);
    const evidence = Array.isArray(claim.evidence) ? claim.evidence : [];
    const targetName = evidence.find(value => typeof value === "string" && value.endsWith(".md"));
    const targetPaths = targetName ? pathsByBasename.get(basename(targetName)) ?? [] : [];
    if (targetPaths.length > 1) throw new Error(`Claimipedia evidence basename is ambiguous: ${targetName}`);
    return baseResult({
      objectId: `${path}#claim:${claim.id}`,
      contentSha256: identity,
      fileSha256: source.sha256,
      status: `claimipedia:${claim.epistemicState ?? "undeclared"}; disposition=${claim.disposition ?? "undeclared"}`,
      withinLaneScore: score(query, `${claim.id} ${claim.type}`, `${claim.statement} ${stableStringify(claim.dependencies ?? [])} ${stableStringify(claim.falsifier ?? "")}`),
      relation: targetPaths.length === 1 ? { kind: "revision-pinned-join", target: targetPaths[0] } : { kind: "query-generated", target: `${path}#claim:${claim.id}` },
      claimipediaIdentity: { id: claim.id, type: claim.type, manifestProtocol: source.value.protocol },
      title: claim.statement,
      sourcePath: path,
    });
  }), limit);
}

export function adaptSourceryDerivations({ root, query, limit = 6, path = "integrations/sourcery/mcp-admission/scientific-derivation-composer/admissibility-vertical-slices-v1.json" } = {}) {
  const source = loadJson(root, path);
  if (!Array.isArray(source.value.slices)) throw new Error("Sourcery derivation source lacks slices");
  const results = [];
  for (const slice of source.value.slices) for (const transformation of slice.transformations ?? []) {
    const identity = objectHash({ sliceId: slice.id, transformation });
    const target = transformation.evidenceRefs?.find(value => typeof value === "string" && value.startsWith("corpus/"))?.split("#", 1)[0];
    results.push(baseResult({
      objectId: `${path}#slice:${slice.id}/transformation:${transformation.id}`,
      contentSha256: identity,
      fileSha256: source.sha256,
      status: `sourcery-proposal; composer-admitted=${transformation.admitted === true}; application-admission=false`,
      withinLaneScore: score(query, `${slice.id} ${transformation.id} ${transformation.kind}`, stableStringify({ assumptions: transformation.assumptions, losses: transformation.losses, refusal: transformation.refusal, observable: slice.observable, decisionRule: slice.decisionRule })),
      relation: target ? { kind: "authored-link", target } : { kind: "query-generated", target: `${path}#slice:${slice.id}` },
      derivationIdentity: { composerProtocol: source.value.composerProtocol, sliceId: slice.id, transformationId: transformation.id },
      title: `${slice.id}: ${transformation.id}`,
      sourcePath: path,
    }));
  }
  return rank(results, limit);
}

export function adaptExperimentEvidence({ root, query, limit = 6, directory = "evidence/data" } = {}) {
  const absolute = resolve(root, directory);
  const results = [];
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    const path = normalizePath(join(directory, entry.name));
    const source = loadJson(root, path);
    const id = source.value.id ?? source.value.schema ?? source.value.protocol ?? entry.name.replace(/\.json$/u, "");
    const authoredTarget = stableStringify(source.value).match(/corpus\/[A-Za-z0-9_./-]+\.md/u)?.[0] ?? null;
    const authority = source.value.authority ?? {};
    results.push(baseResult({
      objectId: path,
      contentSha256: source.sha256,
      fileSha256: source.sha256,
      status: `experiment-artifact; declared=${source.value.status ?? source.value.adjudication?.reason ?? "status-not-declared"}; empirical-authority=${authority.empiricalAuthority === true}`,
      withinLaneScore: score(query, `${id} ${entry.name}`, stableStringify(source.value)),
      relation: authoredTarget ? { kind: "authored-link", target: authoredTarget } : { kind: "query-generated", target: path },
      experimentIdentity: { id, schema: source.value.schema ?? source.value.protocol ?? null },
      title: String(id),
      sourcePath: path,
    }));
  }
  return rank(results, limit);
}

export function adaptExternalLiterature({ root, query, limit = 6, path = "corpus/programmes/frontier-physics-targets/literature_frontier_search_register_v1.json" } = {}) {
  const source = loadJson(root, path);
  if (!Array.isArray(source.value.records) || !/^\d{4}-\d{2}-\d{2}$/u.test(source.value.commonProtocol?.searchedAt ?? "")) throw new Error("literature register lacks dated records");
  const results = [];
  for (const record of source.value.records) for (const role of ["strongestSupport", "strongestOpposition"]) {
    const citation = record[role];
    if (!citation?.url || !citation?.finding) throw new Error(`${record.targetId} lacks ${role} bibliographic identity`);
    const identity = objectHash({ targetId: record.targetId, role, citation, searchedAt: source.value.commonProtocol.searchedAt });
    results.push(baseResult({
      objectId: `${path}#${record.targetId}:${role}`,
      contentSha256: identity,
      fileSha256: source.sha256,
      status: `dated-literature-search; role=${role}; scientific-admission=false`,
      withinLaneScore: score(query, `${record.targetId} ${record.label} ${role}`, `${citation.finding} ${stableStringify(record.queries)} ${stableStringify(record.synonyms)} ${record.presentBounds} ${record.conflicts}`),
      relation: { kind: "revision-pinned-join", target: `corpus/programmes/frontier-physics-targets/frontier_physics_target_register_v1.json#${record.targetId}` },
      bibliographicIdentity: { url: citation.url, searchedAt: source.value.commonProtocol.searchedAt, role },
      title: `${record.label}: ${role === "strongestSupport" ? "support" : "opposition"}`,
      sourcePath: path,
    }));
  }
  return rank(results, limit);
}

export function createRepositoryFederatedContext({ root = process.cwd(), query, profile = "all", perLaneLimit = 4, maxSources = 18, search } = {}) {
  const local = createLocalFederatedContext({ root, query, profile, perLaneLimit, maxSources: perLaneLimit * 2, ...(search ? { search } : {}) });
  const lanes = {
    "canonical-corpus": local.sources.filter(item => item.lane === "canonical-corpus").map(({ lane, withinLaneRank, crossingPenalty, packetOrder, ...item }) => item),
    claimipedia: adaptClaimipediaManifest({ root, query, limit: perLaneLimit }),
    "sourcery-derivation": adaptSourceryDerivations({ root, query, limit: perLaneLimit }),
    publication: local.sources.filter(item => item.lane === "publication").map(({ lane, withinLaneRank, crossingPenalty, packetOrder, ...item }) => item),
    experiment: adaptExperimentEvidence({ root, query, limit: perLaneLimit }),
    "external-literature": adaptExternalLiterature({ root, query, limit: perLaneLimit }),
  };
  return { protocol: "spin23-repository-federation/1", query, profile, corpusContentSha256: local.corpusContentSha256, ...composeFederatedContext({ lanes, quotas: Object.fromEntries(Object.keys(lanes).map(lane => [lane, perLaneLimit])), maxSources }) };
}
