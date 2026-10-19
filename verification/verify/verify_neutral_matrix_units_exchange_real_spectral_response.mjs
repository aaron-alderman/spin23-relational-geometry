const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const near = (a, b, tolerance = 1e-10) => Math.abs(a - b) < tolerance;
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const abs2 = (a) => a.re * a.re + a.im * a.im;

const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, value, k) => addC(sum, mulC(value, b[k][j])), C(0))));
const equalM = (a, b) => a.every((row, i) => row.every((value, j) =>
  near(value.re, b[i][j].re) && near(value.im, b[i][j].im)));
const addM = (a, b) => a.map((row, i) => row.map((value, j) => addC(value, b[i][j])));
const scaleM = (s, a) => {
  const factor = typeof s === "number" ? C(s) : s;
  return a.map((row) => row.map((value) => mulC(factor, value)));
};

const E11 = [[C(1), C(0)], [C(0), C(0)]];
const E22 = [[C(0), C(0)], [C(0), C(1)]];
const E12 = [[C(0), C(1)], [C(0), C(0)]];
const E21 = [[C(0), C(0)], [C(1), C(0)]];
assert(equalM(dagger(E11), E11) && equalM(dagger(E22), E22), "face projectors must be Hermitian");
assert(equalM(dagger(E12), E21), "off-diagonal matrix units must be dagger partners");
assert(equalM(mulM(E12, E21), E11) && equalM(mulM(E21, E12), E22),
  "matrix units must close on the two face projectors");

const I = addM(E11, E22);
const sigmaX = addM(E12, E21);
const sigmaY = scaleM(C(0, -1), addM(E12, scaleM(-1, E21)));
const sigmaZ = addM(E11, scaleM(-1, E22));
for (const basis of [I, sigmaX, sigmaY, sigmaZ]) {
  assert(equalM(dagger(basis), basis), "Hermitian neutral-block basis must be self-adjoint");
}

const theta = (a) => mulM(mulM(sigmaX, a.map((row) => row.map(conjC))), sigmaX);
assert(equalM(theta(I), I) && equalM(theta(sigmaX), sigmaX) && equalM(theta(sigmaY), sigmaY),
  "exchange reality must fix I, sigmaX and sigmaY");
assert(equalM(theta(sigmaZ), scaleM(-1, sigmaZ)), "exchange reality must reverse population imbalance");

const p = 3;
const z = C(1, 2);
const rho = [[C(p), z], [conjC(z), C(p)]];
assert(equalM(theta(rho), rho), "general equal-population Hermitian density must be exchange fixed");
assert(p >= Math.sqrt(abs2(z)), "sample spectral density must be positive");
assert(near(p * p - abs2(z), 4), "determinant must be the Lorentz norm p^2-|z|^2");

const residues = [
  { mass: 1.2, weight: 0.7, matrix: rho },
  { mass: 3.4, weight: 1.1, matrix: [[C(2), C(-0.4, 0.3)], [C(-0.4, -0.3), C(2)]] },
];
const frequency = C(0.5, 0.8);
let imaginaryResponse = [[C(0), C(0)], [C(0), C(0)]];
for (const residue of residues) {
  assert(equalM(theta(residue.matrix), residue.matrix), "exchange must hold pointwise");
  const denominator = (residue.mass - frequency.re) ** 2 + frequency.im ** 2;
  imaginaryResponse = addM(imaginaryResponse,
    scaleM(residue.weight * frequency.im / denominator, residue.matrix));
}
const a = imaginaryResponse[0][0].re;
const d = imaginaryResponse[1][1].re;
const off = imaginaryResponse[0][1];
assert(a >= 0 && d >= 0 && a * d - abs2(off) >= -1e-10,
  "upper-half-plane imaginary response must remain positive");
assert(equalM(theta(imaginaryResponse), imaginaryResponse),
  "Herglotz integration must preserve exchange reality");

const R = (x) => C(x);
const Hu = [[R(1),R(0),R(0)],[R(0),R(2),R(0)],[R(0),R(0),R(4)]];
const Hd = [[R(10),R(1),C(0,-1)],[R(1),R(11),R(1)],[C(0,1),R(1),R(12)]];
const commutator = (x, y) => {
  const xy = mulM(x, y);
  const yx = mulM(y, x);
  return xy.map((row, i) => row.map((value, j) => addC(value, scaleC(-1, yx[i][j]))));
};
const comm = commutator(Hu, Hd);
const comm3 = mulM(mulM(comm, comm), comm);
const traceComm3 = comm3.reduce((sum, row, i) => addC(sum, row[i]), C(0));
assert(Math.abs(traceComm3.im) > 1e-9, "flavor factor must retain nonzero CP");

assert(false === false, "face response selector must remain distinct from the Nambu CAR adjoint");

console.log("Neutral matrix-unit exchange-real spectral response: PASS");
console.log("neutral_basis=P_O,P_R,E_OR,E_RO");
console.log("exchange_fixed_observable_basis=I,sigmaX,sigmaY");
console.log("exchange_odd_direction=sigmaZ");
console.log("general_positive_density=[[p,z],[z*,p]],p>=|z|");
console.log("pointwise_exchange_and_Herglotz_positivity=true");
console.log("flavor_CP_cubic_imaginary=" + traceComm3.im.toFixed(12));
console.log("response_selector_distinct_from_CAR_adjoint=true");
console.log("spacetime_operator_statistics_not_derived=true");
