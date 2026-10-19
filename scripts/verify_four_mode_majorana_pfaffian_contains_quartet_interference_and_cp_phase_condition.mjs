const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (r, a) => C(r * a.re, r * a.im);
const abs2 = (a) => a.re ** 2 + a.im ** 2;

const Faa = C(0.8, 0.3);
const Fab = C(-0.4, 0.9);
const Fbb = C(1.1, -0.2);
const p = mul(Faa, Fbb);
const q = mul(Fab, Fab);
const weakQuartet = mul(p, conj(q));

const s12 = C(0.7, 0.1);
const s34 = C(-0.2, 0.6);
const s13 = C(0.4, -0.3);
const s24 = C(0.5, 0.2);
const s14 = C(-0.1, 0.8);
const s23 = C(0.6, -0.4);
const P = mul(s12, s34);
const Q = add(scale(-1, mul(s13, s24)), mul(s14, s23));

const K12 = mul(Faa, s12);
const K34 = mul(Fbb, s34);
const K13 = mul(Fab, s13);
const K24 = mul(Fab, s24);
const K14 = mul(Fab, s14);
const K23 = mul(Fab, s23);
const pfaffian = add(sub(mul(K12, K34), mul(K13, K24)), mul(K14, K23));
const pathForm = add(mul(P, p), mul(Q, q));
const pathError = Math.hypot(pfaffian.re - pathForm.re, pfaffian.im - pathForm.im);

const interference = 2 * mul(mul(P, conj(Q)), weakQuartet).re;
const rateDecompositionError = Math.abs(abs2(pathForm) - (abs2(mul(P, p)) + abs2(mul(Q, q)) + interference));

const cpRate = (P0, Q0) => {
  const particle = abs2(add(mul(P0, p), mul(Q0, q)));
  const conjugate = abs2(add(mul(P0, conj(p)), mul(Q0, conj(q))));
  return { particle, conjugate, difference: particle - conjugate };
};
const genericCp = cpRate(P, Q);
const predictedGenericDifference = -4 * mul(P, conj(Q)).im * weakQuartet.im;
const realKinematic = cpRate(C(0.9, 0), C(-0.6, 0));
const controlledQuadrature = cpRate(C(1, 0), C(0, 1));

const incoherentRate = abs2(mul(P, p)) + abs2(mul(Q, q));
const result = {
  protocol: "four-mode-majorana-pfaffian-quartet-interference/1",
  pfaffianFormula: "K12 K34 - K13 K24 + K14 K23",
  flavorAssignment: ["alpha", "alpha", "beta", "beta"],
  compositeFlavorPaths: { p, q },
  kinematicPairingCoefficients: { P, Q },
  pfaffian,
  pathForm,
  pathFactorizationError: pathError,
  weakQuartet,
  interferenceTerm: interference,
  rateDecompositionError,
  genericCpRates: genericCp,
  predictedGenericCpDifference: predictedGenericDifference,
  genericCpDifferenceError: Math.abs(genericCp.difference - predictedGenericDifference),
  realKinematicCpDifference: realKinematic.difference,
  controlledQuarterTurnCpDifference: controlledQuadrature.difference,
  incoherentMixtureRate: incoherentRate,
  coherentRate: abs2(pathForm),
  coherenceBoundary: "If source labels or phase-space tracing make the two pairings distinguishable, the density matrix loses the Pp-Qq cross term and the quartet orientation disappears.",
};
result.passed =
  pathError < 1e-12 &&
  rateDecompositionError < 1e-12 &&
  result.genericCpDifferenceError < 1e-12 &&
  Math.abs(realKinematic.difference) < 1e-12 &&
  Math.abs(controlledQuadrature.difference) > 1e-12;

console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
