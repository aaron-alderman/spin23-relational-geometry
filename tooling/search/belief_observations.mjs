import { sha256 } from "./belief_state.mjs";
import { compareAnswerReceipts } from "./answer_stability.mjs";

function uniqueObservations(observations) {
  const seen = new Set();
  return observations.filter(observation => {
    const key = `${observation.type}\0${observation.sourcePath}\0${observation.evidenceSha256 ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function observationsFromContextSweep(sweep) {
  if (sweep?.protocol !== "spin23-corpus-context-sweep/1") throw new Error("a v1 context sweep is required");
  const evidenceSha256 = sha256({ task: sweep.task, sweep: sweep.sweep, stability: sweep.stability });
  const observations = [];
  const provenance = { evidenceSha256, evidenceFamilySha256: evidenceSha256, producer: "context-sweep", independenceClass: "same-run", selectionArm: "baseline" };
  for (const source of sweep.stability.invariantSources ?? []) observations.push({ type: "sweep-invariant", sourcePath: source.path, sourceVersionSha256: source.sourceSha256, ...provenance, note: "Present in every bounded selector variant." });
  for (const source of sweep.stability.selectorSensitiveSources ?? []) observations.push({ type: "retrieved", sourcePath: source.path, sourceVersionSha256: source.sourceSha256, ...provenance, note: `Selector-sensitive presence ${source.presence}/${sweep.variants.length}.` });
  return uniqueObservations(observations);
}

export function observationsFromAnswerStability(comparison, receipts) {
  if (comparison?.protocol !== "spin23-corpus-answer-stability/1") throw new Error("a v1 answer-stability comparison is required");
  if (!Array.isArray(receipts) || receipts.length < 2) throw new Error("the compared answer receipts are required");
  const rebuilt = compareAnswerReceipts(receipts);
  if (rebuilt.comparisonSha256 !== comparison.comparisonSha256) throw new Error("answer-stability comparison does not match the supplied receipts");
  const evidenceSha256 = comparison.comparisonSha256;
  const sourceVersions = new Map(receipts.flatMap(receipt => receipt.context.sources.map(source => [source.path, source.sourceSha256])));
  const selectionArm = receipts.some(receipt => receipt.context.selector?.beliefStateSha256) ? "adaptive" : "baseline";
  const observations = [];
  for (const claim of comparison.claims ?? []) {
    const paths = new Set(receipts.flatMap(receipt => receipt.claims?.find(item => item.key === claim.key)?.sourcePaths ?? []));
    const type = claim.classification === "conflict" ? "answer-conflict"
      : claim.classification === "stable-exact" || claim.classification === "stable-verdict-wording-varies" ? "answer-stable"
        : claim.classification === "context-conditional" ? "answer-cited"
          : null;
    if (!type) continue;
    for (const sourcePath of paths) observations.push({ type, sourcePath, evidenceSha256, evidenceFamilySha256: evidenceSha256, sourceVersionSha256: sourceVersions.get(sourcePath), producer: "answer-stability", independenceClass: "same-model", selectionArm, note: `Claim ${claim.key}: ${claim.classification}.` });
  }
  return uniqueObservations(observations);
}

export function observationsFromVerification({ sourcePaths, sourceVersions, passed, verificationSha256, evidenceFamilySha256 = verificationSha256, producer = "declared-verification", independenceClass = "independent-verifier", selectionArm = "external", note } = {}) {
  if (!Array.isArray(sourcePaths) || sourcePaths.length < 1 || sourcePaths.length > 100) throw new Error("sourcePaths must contain 1 to 100 paths");
  if (typeof passed !== "boolean") throw new Error("passed must be boolean");
  if (!/^[0-9a-f]{64}$/u.test(verificationSha256 ?? "")) throw new Error("verificationSha256 must be a SHA-256 identity");
  if (!sourceVersions || Array.isArray(sourceVersions) || typeof sourceVersions !== "object") throw new Error("sourceVersions must map every source path to its SHA-256 identity");
  return uniqueObservations(sourcePaths.map(sourcePath => ({
    type: passed ? "verification-pass" : "verification-fail",
    sourcePath,
    sourceVersionSha256: sourceVersions[sourcePath],
    evidenceSha256: verificationSha256,
    evidenceFamilySha256,
    producer,
    independenceClass,
    selectionArm,
    note: note ?? null,
  })));
}

