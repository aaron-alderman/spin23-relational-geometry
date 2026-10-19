const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const addC = (a, b) => C(a.re + b.re, a.im + b.im);
const mulC = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjC = (a) => C(a.re, -a.im);
const scaleC = (s, a) => C(s * a.re, s * a.im);
const addM = (a, b) => a.map((row, i) => row.map((x, j) => addC(x, b[i][j])));
const scaleM = (s, a) => a.map((row) => row.map((x) => scaleC(s, x)));
const mulM = (a, b) => a.map((row) => b[0].map((_, j) =>
  row.reduce((sum, x, k) => addC(sum, mulC(x, b[k][j])), C(0))));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conjC(row[j])));
const star = (a) => a.map((row) => row.map(conjC));
const equalM = (a, b, tolerance = 1e-10) => a.every((row, i) => row.every((x, j) =>
  Math.abs(x.re - b[i][j].re) < tolerance && Math.abs(x.im - b[i][j].im) < tolerance));
const kron = (a, b) => a.flatMap((rowA) => b.map((rowB) =>
  rowA.flatMap((x) => rowB.map((y) => mulC(x, y)))));
const comm = (a, b) => addM(mulM(a, b), scaleM(-1, mulM(b, a)));
const anticomm = (a, b) => addM(mulM(a, b), mulM(b, a));

const I2 = [[C(1), C(0)], [C(0), C(1)]];
const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];
const Z2 = scaleM(0, I2);

const PO = [[C(1), C(0)], [C(0), C(0)]];
const PR = [[C(0), C(0)], [C(0), C(1)]];
const EOR = [[C(0), C(1)], [C(0), C(0)]];
const ERO = [[C(0), C(0)], [C(1), C(0)]];
assert(equalM(addM(PO, PR), I2), "neutral projectors must resolve the identity");
assert(equalM(addM(EOR, ERO), sx), "symmetric relationship quadrature must be sigma_x");
// Directly use -i(E_OR-E_RO).
const sigmaYFromUnits = addM(scaleM(1, EOR).map((row) => row.map((x) => mulC(C(0, -1), x))),
  ERO.map((row) => row.map((x) => mulC(C(0, 1), x))));
assert(equalM(sigmaYFromUnits, sy), "oriented neutral relationship must equal sigma_y");
assert(equalM(dagger(sigmaYFromUnits), sigmaYFromUnits), "oriented relationship must be Hermitian");

const thetaFace = sx;
assert(equalM(mulM(mulM(thetaFace, star(sy)), thetaFace), sy),
  "response exchange sigma_x K must fix sigma_y");
assert(equalM(mulM(mulM(thetaFace, star(sz)), thetaFace), scaleM(-1, sz)),
  "response exchange must reverse the population imbalance");

const paulis = [I2, sx, sy, sz];
const labels = ["I", "x", "y", "z"];
const ax = kron(sx, I2);
const C8 = kron(ax, I2);
const glide8 = kron(ax, sx);
const Gamma = kron(sz, sy);
const Q = kron(Gamma, sy);
const I8 = kron(kron(I2, I2), I2);
const Z8 = scaleM(0, I8);
const allowed = [];
for (let a = 0; a < 4; a += 1) for (let b = 0; b < 4; b += 1) for (let c = 0; c < 4; c += 1) {
  const matrix = kron(kron(paulis[a], paulis[b]), paulis[c]);
  const glideEven = equalM(mulM(mulM(glide8, matrix), dagger(glide8)), matrix);
  const particleHoleOdd = equalM(mulM(mulM(C8, star(matrix)), dagger(C8)), scaleM(-1, matrix));
  const breaksQ = !equalM(anticomm(Q, matrix), Z8);
  if (glideEven && particleHoleOdd && breaksQ) allowed.push(`${labels[a]}${labels[b]}${labels[c]}`);
}
assert(allowed.length === 8, "there must be exactly eight Pauli-basis allowed chiral breakers");
const pureInternal = allowed.filter((label) => label[0] === "I" && label[2] === "I");
assert(pureInternal.length === 1 && pureInternal[0] === "IyI",
  "sigma_y must be the unique breaker acting only on the neutral face factor");

const V = kron(kron(I2, sy), I2);
assert(equalM(mulM(mulM(glide8, V), dagger(glide8)), V), "neutral relationship term must be glide even");
assert(equalM(mulM(mulM(C8, star(V)), dagger(C8)), scaleM(-1, V)),
  "neutral relationship Hamiltonian term must be particle-hole odd");

for (const theta of [0.2, 0.7, 1.4]) {
  const U = [[C(Math.cos(theta / 2), Math.sin(theta / 2)), C(0)],
    [C(0), C(Math.cos(theta / 2), -Math.sin(theta / 2))]];
  const rotatedX = mulM(mulM(U, sx), dagger(U));
  const expectedX = addM(scaleM(Math.cos(theta), sx), scaleM(-Math.sin(theta), sy));
  const rotatedY = mulM(mulM(U, sy), dagger(U));
  const expectedY = addM(scaleM(Math.sin(theta), sx), scaleM(Math.cos(theta), sy));
  assert(equalM(rotatedX, expectedX) && equalM(rotatedY, expectedY),
    "relative O/R rephasing must continuously rotate the relationship quadratures");
}

assert(equalM(comm(sy, I2), Z2), "gauge-trivial action must commute with the oriented relationship");

console.log("Furey neutral oriented-relationship Pin selector: PASS");
console.log("minimal_operator=-i(E_OR-E_RO)=sigma_y");
console.log("gauge_neutral_hermitian_response_fixed=true");
console.log("CAR_parity=odd_as_required_for_BdG_Hamiltonian_term");
console.log(`allowed_chiral_breakers=${allowed.length}`);
console.log("unique_pure_Furey_face_breaker=IyI");
console.log("canonical_relative_phase=false_without_additional_source");
