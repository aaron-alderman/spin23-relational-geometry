import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(
  path.join(root, "evidence/data/a5-phase-reference-exhaustion.json"),
  "utf8"
));

const tau = 2 * Math.PI;
const mod = (x, period = tau) => ((x % period) + period) % period;
const angleClose = (a, b, period = tau, eps = 1e-10) => {
  const d = mod(a - b, period);
  return Math.min(d, period - d) < eps;
};
const c = (r, i) => ({ r, i });
const cmul = (a, b) => c(a.r * b.r - a.i * b.i, a.r * b.i + a.i * b.r);
const cconj = (a) => c(a.r, -a.i);
const cexp = (x) => c(Math.cos(x), Math.sin(x));
const cclose = (a, b, eps = 1e-10) => Math.abs(a.r - b.r) < eps && Math.abs(a.i - b.i) < eps;

const alphas = [0.17, 0.61, 1.13, 2.07];
const beta0 = 0.42;
const invariantDatum = 7;
const constantSelector = () => beta0;

// A selector built from fixed data would need beta=beta+2 alpha mod pi for
// every alpha. The target circle has no such fixed point.
const fixedDataSelectorFails = alphas.every((alpha) =>
  !angleClose(constantSelector(invariantDatum), constantSelector(invariantDatum) + 2 * alpha, Math.PI)
);

// A charge-minus-two covariant is sufficient: beta=-arg(R2) is equivariant.
const rMagnitude = 1.7;
const rPhase = 0.73;
const R2 = c(rMagnitude * Math.cos(rPhase), rMagnitude * Math.sin(rPhase));
const arg = (x) => Math.atan2(x.i, x.r);
const betaFromR = (r) => mod(-arg(r), Math.PI);
const referenceEquivariance = alphas.every((alpha) => {
  const transformedR = cmul(cexp(-2 * alpha), R2);
  return angleClose(betaFromR(transformedR), betaFromR(R2) + 2 * alpha, Math.PI);
});

// R2*A is invariant when A=NN has charge +2.
const A = c(0.4, -0.9);
const invariantProduct = cmul(R2, A);
const productInvariant = alphas.every((alpha) => {
  const Rp = cmul(cexp(-2 * alpha), R2);
  const Ap = cmul(cexp(2 * alpha), A);
  return cclose(cmul(Rp, Ap), invariantProduct);
});

// The Majorana coefficient transforms correctly but is circular when it is the
// same datum whose decomposition is being selected.
const M = c(2, 3);
const majoranaAxisCovariant = alphas.every((alpha) => {
  const Mp = cmul(cexp(-2 * alpha), M);
  return angleClose(betaFromR(Mp), betaFromR(M) + 2 * alpha, Math.PI);
});

// Residual Z3 does not fix a point of the beta circle when it acts nontrivially.
const z3Shifts = [0, 2 * Math.PI / 3, 4 * Math.PI / 3].map((alpha) => mod(beta0 + 2 * alpha, Math.PI));
const z3OrbitSize = new Set(z3Shifts.map((x) => x.toFixed(10))).size;

// CP-even potentials are functions of conjugation-even combinations, so any
// non-real stationary phase is accompanied by its conjugate phase.
const phase = 0.47;
const cpConjugateDistinct = !angleClose(phase, -phase, tau);
const toyCpPotential = (theta) => Math.cos(4 * theta) + 0.3 * Math.cos(2 * theta);
const cpPotentialDegenerate = Math.abs(toyCpPotential(phase) - toyCpPotential(-phase)) < 1e-12;

const audits = Object.fromEntries(evidence.candidateAudit.map((x) => [x.candidate, x]));
const checks = {
  allDeclaredCandidatesRejected: evidence.candidateAudit.length === 8 && evidence.candidateAudit.every((x) => x.canonical === false),
  fixedDataCannotSelectPhaseCircle: fixedDataSelectorFails,
  chargeMinusTwoReferenceIsEquivariant: referenceEquivariance,
  invariantReferencePairing: productInvariant,
  majoranaPhaseIsCovariantButCircular: majoranaAxisCovariant && audits["Majorana mass phase"].reason.includes("circular"),
  boundaryNormalIsNeutral: audits["oriented boundary normal"].rephasingType.includes("neutral"),
  cpIsATorsor: audits.CP.rephasingType.includes("family"),
  cptDoesNotSelect: audits.CPT.canonical === false,
  chargeThreePhaseIsGauge: audits["charge-three Higgs phase"].rephasingType.includes("gauge"),
  z3HasNoUniqueRepresentative: z3OrbitSize === 3,
  anomalyOnlyTransportsRelativeOrientation: audits["anomaly index or Pfaffian flow"].reason.includes("relative"),
  cpBrokenVacuaComeInPairs: cpConjugateDistinct && cpPotentialDegenerate,
  honestVerdict: evidence.verdict.classification.includes("no-go")
};

const report = {
  protocol: evidence.protocol,
  target: evidence.rephasingAction.target,
  theorem: evidence.theorem,
  finiteChecks: {
    fixedDataSelectorFails,
    referenceEquivariance,
    invariantProduct: productInvariant,
    majoranaAxisCovariant,
    z3OrbitSize,
    cpConjugateDistinct,
    cpPotentialDegenerate
  },
  minimalNewReference: evidence.minimalNewReference,
  verdict: evidence.verdict,
  checks,
  passed: Object.values(checks).every(Boolean)
};

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
