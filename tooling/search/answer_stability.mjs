import { createHash } from "node:crypto";

const verdicts = new Set(["established", "supported", "conditional", "interpretive", "open", "obstruction", "rejected", "uncertain"]);
function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableValue(value[key])]));
  return value;
}
const stableStringify = value => JSON.stringify(stableValue(value));
const sha256 = value => createHash("sha256").update(typeof value === "string" ? value : stableStringify(value)).digest("hex");

function exactObject(value, name) {
  if (!value || Array.isArray(value) || typeof value !== "object") throw new Error(`${name} must be an object`);
  return value;
}

export function createAnswerReceipt({ contextReceipt, contextSources, model, prompt, answer, claims }) {
  exactObject(contextReceipt, "contextReceipt");
  exactObject(model, "model");
  if (!/^[0-9a-f]{64}$/u.test(contextReceipt.contextSha256 ?? "") || !/^[0-9a-f]{64}$/u.test(contextReceipt.sourceSetSha256 ?? "")) throw new Error("contextReceipt must contain context and source-set SHA-256 identities");
  if (!Array.isArray(contextSources) || contextSources.length < 1 || contextSources.length > 20) throw new Error("contextSources must contain 1 to 20 source identities");
  if (typeof model.name !== "string" || !model.name || model.name.length > 200) throw new Error("model.name is required");
  if (typeof prompt !== "string" || !prompt || prompt.length > 100000) throw new Error("prompt must contain 1 to 100000 characters");
  if (typeof answer !== "string" || !answer || answer.length > 200000) throw new Error("answer must contain 1 to 200000 characters");
  if (!Array.isArray(claims) || claims.length < 1 || claims.length > 100) throw new Error("claims must contain 1 to 100 atomic claims");
  const sourceMap = new Map(contextSources.map(source => {
    if (!source || typeof source.path !== "string" || !source.path || !/^[0-9a-f]{64}$/u.test(source.sourceSha256 ?? "")) throw new Error("every context source requires path and sourceSha256");
    return [source.path, source.sourceSha256];
  }));
  if (sourceMap.size !== contextSources.length) throw new Error("context source paths must be unique");
  const seen = new Set();
  const normalizedClaims = claims.map(claim => {
    if (!claim || typeof claim.key !== "string" || !/^[a-z0-9][a-z0-9._-]{0,79}$/u.test(claim.key) || seen.has(claim.key)) throw new Error("claim keys must be unique lowercase stable identifiers");
    seen.add(claim.key);
    if (typeof claim.statement !== "string" || !claim.statement.trim() || claim.statement.length > 2000) throw new Error(`claim ${claim.key} requires a bounded statement`);
    if (!verdicts.has(claim.verdict)) throw new Error(`claim ${claim.key} has an invalid verdict`);
    if (!Array.isArray(claim.sourcePaths) || claim.sourcePaths.length > 20 || claim.sourcePaths.some(path => typeof path !== "string")) throw new Error(`claim ${claim.key} sourcePaths are invalid`);
    const sourcePaths = [...new Set(claim.sourcePaths)].sort();
    const unsupportedSourcePaths = sourcePaths.filter(path => !sourceMap.has(path));
    return {
      key: claim.key,
      statement: claim.statement.trim(),
      statementSha256: sha256(claim.statement.trim()),
      verdict: claim.verdict,
      sourcePaths,
      sourceSetSha256: sha256(sourcePaths.map(path => `${path}\0${sourceMap.get(path) ?? "outside-context"}`).join("\n")),
      unsupportedSourcePaths,
      notes: typeof claim.notes === "string" ? claim.notes.slice(0, 2000) : null,
    };
  });
  const payload = {
    protocol: "spin23-corpus-answer-receipt/1",
    context: {
      contextSha256: contextReceipt.contextSha256,
      sourceSetSha256: contextReceipt.sourceSetSha256,
      selector: contextReceipt.selector ?? null,
      sources: [...sourceMap].map(([path, sourceSha256]) => ({ path, sourceSha256 })),
    },
    execution: {
      model: { name: model.name, version: model.version ?? null, settings: model.settings ?? {} },
      promptSha256: sha256(prompt),
      answerSha256: sha256(answer),
      promptCharacters: prompt.length,
      answerCharacters: answer.length,
    },
    claims: normalizedClaims,
    coverage: {
      claims: normalizedClaims.length,
      citedClaims: normalizedClaims.filter(claim => claim.sourcePaths.length).length,
      unsupportedClaims: normalizedClaims.filter(claim => claim.unsupportedSourcePaths.length).length,
      contextSources: sourceMap.size,
      citedContextSources: new Set(normalizedClaims.flatMap(claim => claim.sourcePaths.filter(path => sourceMap.has(path)))).size,
    },
    authority: { entails: false, empiricalAuthority: false, corpusPromotion: false, semanticEquivalenceCertified: false },
  };
  return { ...payload, receiptSha256: sha256(payload) };
}

export function compareAnswerReceipts(receipts) {
  if (!Array.isArray(receipts) || receipts.length < 2 || receipts.length > 8) throw new Error("answer stability comparison requires 2 to 8 receipts");
  for (const receipt of receipts) {
    if (receipt?.protocol !== "spin23-corpus-answer-receipt/1" || !/^[0-9a-f]{64}$/u.test(receipt.receiptSha256 ?? "")) throw new Error("every answer receipt must be a valid v1 receipt");
    const { receiptSha256, ...payload } = receipt;
    if (sha256(payload) !== receiptSha256) throw new Error("answer receipt integrity check failed");
  }
  const promptHashes = unique(receipts.map(receipt => receipt.execution.promptSha256));
  const models = unique(receipts.map(receipt => stableStringify(receipt.execution.model)));
  const contextHashes = unique(receipts.map(receipt => receipt.context.contextSha256));
  const keys = unique(receipts.flatMap(receipt => receipt.claims.map(claim => claim.key))).sort();
  const comparisons = keys.map(key => {
    const observations = receipts.map((receipt, index) => {
      const claim = receipt.claims.find(item => item.key === key);
      return claim ? { run: index + 1, contextSha256: receipt.context.contextSha256, verdict: claim.verdict, statementSha256: claim.statementSha256, sourceSetSha256: claim.sourceSetSha256, unsupported: claim.unsupportedSourcePaths.length > 0 } : null;
    }).filter(Boolean);
    const verdictSet = unique(observations.map(item => item.verdict));
    const statementSet = unique(observations.map(item => item.statementSha256));
    let classification;
    if (observations.some(item => item.unsupported)) classification = "unsupported";
    else if (verdictSet.length > 1) classification = "conflict";
    else if (observations.length < receipts.length) classification = "context-conditional";
    else if (statementSet.length === 1) classification = "stable-exact";
    else classification = "stable-verdict-wording-varies";
    return { key, classification, presence: observations.length, runs: receipts.length, verdicts: verdictSet, statementVariants: statementSet.length, observations };
  });
  const counts = Object.fromEntries(["stable-exact", "stable-verdict-wording-varies", "context-conditional", "conflict", "unsupported"].map(name => [name, comparisons.filter(item => item.classification === name).length]));
  const payload = {
    protocol: "spin23-corpus-answer-stability/1",
    comparable: promptHashes.length === 1 && models.length === 1 && contextHashes.length > 1,
    comparability: {
      samePrompt: promptHashes.length === 1,
      sameModelAndSettings: models.length === 1,
      distinctContexts: contextHashes.length > 1,
      promptHashes,
      contextHashes,
    },
    counts,
    claims: comparisons,
    authority: { entails: false, semanticEquivalenceCertified: false, empiricalAuthority: false, corpusPromotion: false },
    warning: "Claim keys and exact statement hashes are caller-supplied comparison aids. This report detects declared drift; it does not prove semantic equivalence or scientific correctness.",
  };
  return { ...payload, comparisonSha256: sha256(payload) };
}

function unique(values) {
  return [...new Set(values)];
}
