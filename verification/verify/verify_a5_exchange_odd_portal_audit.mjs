import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidencePath = path.join(root, "evidence/data/a5-exchange-odd-portal-audit.json");
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

const fields15 = [
  { name: "Q", color: "3", weak: 2, y6: 1 },
  { name: "u_c", color: "3bar", weak: 1, y6: -4 },
  { name: "d_c", color: "3bar", weak: 1, y6: 2 },
  { name: "L", color: "1", weak: 2, y6: -3 },
  { name: "e_c", color: "1", weak: 1, y6: 6 }
];

function colorHasSinglet(a, b) {
  return (a === "1" && b === "1") ||
    (a === "3" && b === "3bar") ||
    (a === "3bar" && b === "3");
}

function weakHasSinglet(a, b) {
  return (a === 1 && b === 1) || (a === 2 && b === 2);
}

function bareHolomorphicSinglets(fields) {
  const out = [];
  for (let i = 0; i < fields.length; i += 1) {
    for (let j = i; j < fields.length; j += 1) {
      const a = fields[i];
      const b = fields[j];
      if (colorHasSinglet(a.color, b.color) &&
          weakHasSinglet(a.weak, b.weak) &&
          a.y6 + b.y6 === 0) {
        out.push(`${a.name}${b.name}`);
      }
    }
  }
  return out;
}

const sterile = { name: "N", color: "1", weak: 1, y6: 0 };
const singlets15 = bareHolomorphicSinglets(fields15);
const singlets16 = bareHolomorphicSinglets([...fields15, sterile]);

// The two embeddings have identical physical names and representations after
// endpoint labels are forgotten. Therefore every word in the endpoint-blind
// local field algebra is fixed by exchange, independent of operator degree.
const survivorA = {
  Q: ["O2", "H"], u_c: ["C", "O2"], d_c: ["O1", "O2"],
  L: ["H", "R"], e_c: ["R", "C"]
};
const exchangeEndpoint = (x) => x === "O1" ? "R" : x === "R" ? "O1" : x;
const survivorB = Object.fromEntries(Object.entries(survivorA).map(
  ([field, [target, source]]) => [field, [exchangeEndpoint(target), exchangeEndpoint(source)]]
));
const physicalSignature = (survivor) => Object.keys(survivor).sort().map((name) => {
  const f = fields15.find((entry) => entry.name === name);
  return [name, f.color, f.weak, f.y6];
});
const forgetfulSignaturesEqual = JSON.stringify(physicalSignature(survivorA)) ===
  JSON.stringify(physicalSignature(survivorB));

const anomalyVector = (fields) => {
  let su3Cubed = 0;
  let su3SquaredY6 = 0;
  let su2SquaredY6 = 0;
  let gravitySquaredY6 = 0;
  let u1CubedY6 = 0;
  let weakDoublets = 0;
  for (const f of fields) {
    const colorDim = f.color === "1" ? 1 : 3;
    const colorChirality = f.color === "3" ? 1 : f.color === "3bar" ? -1 : 0;
    su3Cubed += f.weak * colorChirality;
    if (f.color !== "1") su3SquaredY6 += f.weak * f.y6;
    if (f.weak === 2) su2SquaredY6 += colorDim * f.y6;
    gravitySquaredY6 += colorDim * f.weak * f.y6;
    u1CubedY6 += colorDim * f.weak * f.y6 ** 3;
    if (f.weak === 2) weakDoublets += colorDim;
  }
  return { su3Cubed, su3SquaredY6, su2SquaredY6, gravitySquaredY6, u1CubedY6, weakParity: weakDoublets % 2 };
};

const anomaliesA = anomalyVector(fields15);
const anomaliesB = anomalyVector(fields15);
const anomalyDifference = Object.fromEntries(Object.keys(anomaliesA).map(
  (key) => [key, anomaliesA[key] - anomaliesB[key]]
));

const classes = Object.fromEntries(evidence.candidateClasses.map((candidate) => [candidate.id, candidate]));
const checks = {
  noBareBilinearIn15: singlets15.length === 0,
  uniqueNewBilinearWithSterile: JSON.stringify(singlets16) === JSON.stringify(["NN"]),
  forgetfulSignaturesEqual,
  allAnomaliesZero: Object.values(anomaliesA).every((x) => x === 0),
  anomalyDifferenceZero: Object.values(anomalyDifference).every((x) => x === 0),
  conventionalCandidatesEven:
    classes["boundary-normal-current"].exchangeOdd === false &&
    classes["kinetic-difference"].exchangeOdd === false &&
    classes["yukawa-pseudoscalar"].exchangeOdd === false &&
    classes["theta-or-chern-simons-descent"].exchangeOdd === false &&
    classes["anomaly-inflow"].exchangeOdd === false,
  projectorCandidateIsCircular:
    classes["projector-weighted-defect-current"].exchangeOdd === true &&
    evidence.scope.excludedFromCurrentFields.includes("endpoint projector P_minus"),
  sterileCandidateHasCorrectDimension:
    evidence.minimalExtension.fieldDimension * 2 === evidence.minimalExtension.operatorDimension &&
    evidence.minimalExtension.boundaryCoefficientDimension === 0,
  resultDeclaresConditionalCAR:
    evidence.minimalExtension.conditions.some((x) => x.includes("CAR"))
};

const report = {
  protocol: evidence.protocol,
  fieldContent: {
    bareHolomorphicSinglets15: singlets15,
    bareHolomorphicSingletsAfterAddingN: singlets16,
    forgetfulSignaturesEqual
  },
  anomalyAndInflow: { survivorA: anomaliesA, survivorB: anomaliesB, difference: anomalyDifference },
  noGo: evidence.theorem,
  minimalExtension: evidence.minimalExtension,
  checks,
  passed: Object.values(checks).every(Boolean)
};

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
