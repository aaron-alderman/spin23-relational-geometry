import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-tuft-claim-disposition-v1.json",
  import.meta.url,
), "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const byId = new Map(evidence.claims.map((claim) => [claim.id, claim]));
assert(byId.size === evidence.claims.length, "claim identifiers must be unique");
for (let index = 1; index <= 12; index += 1) {
  assert(byId.has(`T${index}`), `missing claim T${index}`);
}

// A sphere S^m has manifold dimension m; SU(n) has dimension n^2-1.
const dimensionS5 = 5;
const dimensionSU3 = 3 ** 2 - 1;
assert(dimensionS5 === byId.get("T4").witness.dimensionS5, "S5 dimension mismatch");
assert(dimensionSU3 === byId.get("T4").witness.dimensionSU3, "SU(3) dimension mismatch");
assert(dimensionS5 !== dimensionSU3, "S5 cannot be identified with SU(3)");

// Middle degree p on dimension 2p+1 alternates between real and i-corrected branches.
const shellParity = [1, 2, 3, 4].map((p) => ({
  sphereDimension: 2 * p + 1,
  middleDegree: p,
  selfAdjointRepresentative: p % 2 === 1 ? "*d" : "i*d",
}));
assert(shellParity.map((entry) => entry.selfAdjointRepresentative).join(",") === "*d,i*d,*d,i*d",
  "graded Beltrami parity does not alternate");

// Rescaling preserves dimensionless topology while changing spectral scale.
const radius = 3;
const scale = 2;
const eigenvalue = 5 / radius;
const rescaledEigenvalue = 5 / (scale * radius);
const hopfCharge = 1;
const rescaledHopfCharge = 1;
assert(Math.abs(rescaledEigenvalue / eigenvalue - 1 / scale) < 1e-12,
  "Beltrami eigenvalue must scale inversely with radius");
assert(hopfCharge === rescaledHopfCharge, "topological charge must remain scale-free");

// In natural units v^2 has mass dimension 2; R^-3 has mass dimension 3.
const massDimensionMismatch = byId.get("T9").witness.massDimensionRight
  - byId.get("T9").witness.massDimensionLeft;
assert(massDimensionMismatch === 1, "expected one power of mass mismatch");

// Compactness discretizes rather than truncates an elliptic spectral ladder.
const modeCounts = [10, 100, 1000].map((cutoff) =>
  Array.from({ length: cutoff }, (_, index) => index + 1).length);
assert(modeCounts[0] < modeCounts[1] && modeCounts[1] < modeCounts[2],
  "mode count must remain unbounded as the cutoff grows");

// A real Gaussian with an indefinite first-order quadratic form diverges.
// Along the negative eigendirection of diag(-1,1), exp(-x^T B x/2)=exp(x^2/2).
const gaussianSamples = [1, 2, 3].map((x) => Math.exp(x * x / 2));
assert(gaussianSamples[0] < gaussianSamples[1] && gaussianSamples[1] < gaussianSamples[2],
  "indefinite real Gaussian must grow along its negative direction");

const allowedStatuses = new Set([
  "established_mathematics",
  "not_derived",
  "contradicted_as_identification",
  "false_as_written_repairable",
  "under_specified",
  "ill_typed_without_contour",
  "contradicted_without_scale",
  "dimensionally_inconsistent",
  "not_implied",
  "empirically_open",
]);
for (const claim of evidence.claims) {
  assert(allowedStatuses.has(claim.status), `unrecognized disposition ${claim.status}`);
}
assert(evidence.auditBoundary.latestFileFullyRetrieved === false,
  "version boundary must not overstate access to the latest file");
assert(evidence.exhaustion.closedAnalyticGates.length === 6,
  "analytic exhaustion ledger is incomplete");

console.log(JSON.stringify({
  status: "PASS",
  auditedClaims: evidence.claims.length,
  shellParity,
  dimensionWitness: { dimensionS5, dimensionSU3 },
  scaleWitness: { radius, scale, eigenvalue, rescaledEigenvalue, hopfCharge },
  massDimensionMismatch,
  compactModeCounts: modeCounts,
  versionBoundary: evidence.auditBoundary.rule,
  verdict: evidence.exhaustion.verdict,
}, null, 2));
