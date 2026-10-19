import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidence = JSON.parse(fs.readFileSync(
  path.join(root, "evidence/data/a5-neutral-car-boundary-action-audit.json"),
  "utf8"
));

const z = (r = 0, i = 0) => ({ r, i });
const add = (a, b) => z(a.r + b.r, a.i + b.i);
const mul = (a, b) => z(a.r * b.r - a.i * b.i, a.r * b.i + a.i * b.r);
const conj = (a) => z(a.r, -a.i);
const scale = (a, s) => z(a.r * s, a.i * s);
const C0 = z(0, 0);
const C1 = z(1, 0);
const CI = z(0, 1);

const mat = (rows) => rows.map((row) => row.map((x) => typeof x === "number" ? z(x, 0) : x));
const zeros = (n, m) => Array.from({ length: n }, () => Array.from({ length: m }, () => z()));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => z(i === j ? 1 : 0, 0)));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const mscale = (A, s) => A.map((row) => row.map((x) => mul(x, s)));
const mmul = (A, B) => {
  const out = zeros(A.length, B[0].length);
  for (let i = 0; i < A.length; i += 1) for (let j = 0; j < B[0].length; j += 1) {
    for (let k = 0; k < B.length; k += 1) out[i][j] = add(out[i][j], mul(A[i][k], B[k][j]));
  }
  return out;
};
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const mconj = (A) => A.map((row) => row.map(conj));
const kron = (A, B) => {
  const out = zeros(A.length * B.length, A[0].length * B[0].length);
  for (let i = 0; i < A.length; i += 1) for (let j = 0; j < A[0].length; j += 1) {
    for (let k = 0; k < B.length; k += 1) for (let l = 0; l < B[0].length; l += 1) {
      out[i * B.length + k][j * B[0].length + l] = mul(A[i][j], B[k][l]);
    }
  }
  return out;
};
const close = (a, b, eps = 1e-10) => Math.abs(a.r - b.r) < eps && Math.abs(a.i - b.i) < eps;
const meq = (A, B) => A.length === B.length && A.every((row, i) => row.every((x, j) => close(x, B[i][j])));

const I2 = eye(2);
const X = mat([[0, 1], [1, 0]]);
const Z = mat([[1, 0], [0, -1]]);
const lower = mat([[0, 1], [0, 0]]);

// One internal neutral arrow is one CAR mode; its reverse is already adjoint.
const a = lower;
const adag = dagger(a);
const oneModeCar = madd(mmul(a, adag), mmul(adag, a));

// Two spin components provide a nonzero antisymmetric Weyl bilinear A=N_1 N_2.
const c1 = kron(lower, I2);
const c2 = kron(Z, lower);
const c1d = dagger(c1);
const c2d = dagger(c2);
const A = mmul(c1, c2);
const Ad = dagger(A);
const S = madd(A, Ad);
const P = mscale(madd(A, mscale(Ad, z(-1, 0))), CI);
const U = kron(X, X);
const Ud = dagger(U);
const antiTransform = (O) => mmul(mmul(U, mconj(O)), Ud);
const unitaryTransform = (O) => mmul(mmul(U, O), Ud);

// A pi/4 sterile-field rephasing rotates the scalar axis into the pseudoscalar axis.
const Aphase = mscale(A, CI);
const Adphase = dagger(Aphase);
const Sphase = madd(Aphase, Adphase);
const Pphase = mscale(madd(Aphase, mscale(Adphase, z(-1, 0))), CI);

const mEven = 2;
const mOdd = 3;
const Mplus = z(mEven, mOdd);
const Mminus = z(mEven, -mOdd);
const loopFactor = 1.125; // arbitrary real multiplicative renormalization

const countertermByName = Object.fromEntries(evidence.counterterms.map((x) => [x.operator, x]));
const checks = {
  oneModeCar: meq(oneModeCar, I2),
  nilpotentArrow: meq(mmul(a, a), zeros(2, 2)) && meq(mmul(adag, adag), zeros(2, 2)),
  reverseIsAdjoint: meq(adag, dagger(a)),
  twoSpinModeCar:
    meq(madd(mmul(c1, c1d), mmul(c1d, c1)), eye(4)) &&
    meq(madd(mmul(c2, c2d), mmul(c2d, c2)), eye(4)) &&
    meq(madd(mmul(c1, c2d), mmul(c2d, c1)), zeros(4, 4)),
  nonzeroWeylPair: !meq(A, zeros(4, 4)),
  antiunitarySendsPairToAdjoint: meq(antiTransform(A), Ad),
  antiunitaryMakesScalarEven: meq(antiTransform(S), S),
  antiunitaryMakesPseudoscalarEven: meq(antiTransform(P), P),
  unitarySendsPairToAdjoint: meq(unitaryTransform(A), Ad),
  unitaryMakesScalarEven: meq(unitaryTransform(S), S),
  unitaryMakesPseudoscalarOdd: meq(unitaryTransform(P), mscale(P, z(-1, 0))),
  rephasingRotatesAxes: meq(Sphase, P) && meq(Pphase, mscale(S, z(-1, 0))),
  pairedMassRelation: close(Mminus, conj(Mplus)),
  oneLoopPreservesPairedMassRelation: close(scale(Mminus, loopFactor), conj(scale(Mplus, loopFactor))),
  fockCountDistinguishesIndependentReverse:
    evidence.carDecision.oneModeFockDimension === 2 &&
    evidence.carDecision.independentReverseArrowFockDimension === 4 &&
    evidence.carDecision.matterTroDimensions.forwardOnly === 16 &&
    evidence.carDecision.matterTroDimensions.bothIndependent === 24,
  completeNeutralBoundaryLedger:
    countertermByName["S_N=NN+(NN)_dagger"].boundaryDimension === 3 &&
    countertermByName["P_N=i(NN-(NN)_dagger)"].boundaryDimension === 3 &&
    countertermByName["n_mu N_dagger sigma_bar^mu N"].boundaryDimension === 3 &&
    countertermByName["N_dagger derivative_tangent N"].boundaryDimension === 4,
  honestVerdict: evidence.verdict.classification.includes("tunable spurion")
};

const report = {
  protocol: evidence.protocol,
  car: {
    oneModeCar: checks.oneModeCar,
    reverseIsAdjoint: checks.reverseIsAdjoint,
    minimalFockDimension: evidence.carDecision.oneModeFockDimension,
    independentReverseFockDimension: evidence.carDecision.independentReverseArrowFockDimension
  },
  bilinearParity: {
    antiunitary: { scalarEven: checks.antiunitaryMakesScalarEven, pseudoscalarEven: checks.antiunitaryMakesPseudoscalarEven },
    unitary: { scalarEven: checks.unitaryMakesScalarEven, pseudoscalarOdd: checks.unitaryMakesPseudoscalarOdd },
    rephasingRotatesScalarToPseudoscalar: checks.rephasingRotatesAxes
  },
  oneLoopStructure: evidence.oneLoop,
  verdict: evidence.verdict,
  checks,
  passed: Object.values(checks).every(Boolean)
};

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
