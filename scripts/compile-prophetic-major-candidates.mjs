import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const transforms = JSON.parse(await readFile(resolve(root, "evidence/data/biblical-time-transform-register-v0.json"), "utf8"));
const candidates = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-major-candidates-v0.json"), "utf8"));
const control = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-interpreter-forecasts-v0-result.json"), "utf8"));
const admission = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-admissibility-pilot-v0-result.json"), "utf8"));
const outputPath = resolve(root, "evidence/data/prophetic-major-candidates-v0-result.json");
const asOfYear = Number(process.env.PROPHETIC_AS_OF_YEAR ?? candidates.date.slice(0, 4));

const knownOperators = new Set(transforms.transforms.map((entry) => entry.id));
const compiledFamilies = candidates.families.map((family) => ({
  id: family.id,
  anchorUnique: family.anchor.independentlyUnique,
  candidates: family.candidates.map((candidate) => ({
    ...candidate,
    operatorRegistered: knownOperators.has(candidate.operator),
    weightWithheld: candidate.predictiveWeight === null,
    temporalAudit: candidate.temporalClaim.kind === "lower-bound"
      ? {
          status: asOfYear < candidate.temporalClaim.earliestYear ? "not-yet-testable" : "bound-active",
          falsifiedBy: `adjudicated target occurrence before ${candidate.temporalClaim.earliestYear}`,
          notFalsifiedBy: `non-occurrence in ${candidate.temporalClaim.earliestYear} or any later finite year`,
          finiteResolutionYear: null
        }
      : candidate.temporalClaim.latestYear < asOfYear
        ? {
            status: "window-elapsed-outcome-uncoded",
            falsifiedBy: "adjudicated non-occurrence throughout the bounded window",
            notFalsifiedBy: null,
            finiteResolutionYear: candidate.temporalClaim.latestYear
          }
        : {
            status: "future-bounded-window",
            falsifiedBy: "adjudicated non-occurrence throughout the bounded window",
            notFalsifiedBy: null,
            finiteResolutionYear: candidate.temporalClaim.latestYear
          }
  })),
  decision: family.decision
}));

const rankingAuthorized = admission.predictiveRankingIdentified === true && control.rankingIdentified === true;
const result = {
  protocol: candidates.protocol,
  generatedAt: candidates.date,
  asOfYear,
  predictiveRankingAuthorized: rankingAuthorized,
  compiledFamilies,
  decision: rankingAuthorized
    ? "Validated operator weights are available; a predictive ranking may be compiled."
    : "Candidate generation is allowed, but predictive weights remain withheld because no held-out operator ranking is identified.",
  boundary: candidates.withholdingRule,
  temporalBoundary: "A lower bound has no finite resolution year. Surviving past its threshold is not fulfilment and non-occurrence at the threshold is not falsification."
};

if (process.argv.includes("--write")) {
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify(result, null, 2));

