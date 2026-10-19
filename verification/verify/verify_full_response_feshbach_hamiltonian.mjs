import assert from "node:assert/strict";

const H0 = [[-1, 0], [0, 1]];
const W = [[1, 0], [1, 1]];
const Wt = [[1, 1], [0, 1]];
const Hfull = [
  [0, 0, 1, 1],
  [0, 0, 0, 1],
  [1, 0, -1, 0],
  [1, 1, 0, 1],
];

const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (x, A) => A.map((row) => row.map((a) => x * a));
const matVec = (A, x) => A.map((row) => row.reduce((s, a, j) => s + a * x[j], 0));
const dot = (x, y) => x.reduce((s, a, i) => s + a * y[i], 0);
const maxAbs = (x) => Math.max(...x.flat(Infinity).map(Math.abs));

const inverse = (A) => {
  const n = A.length;
  const M = A.map((row, i) => [...row, ...eye(n)[i]]);
  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let r = col + 1; r < n; r += 1) if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    [M[col], M[pivot]] = [M[pivot], M[col]];
    const p = M[col][col];
    assert(Math.abs(p) > 1e-13);
    M[col] = M[col].map((x) => x / p);
    for (let r = 0; r < n; r += 1) if (r !== col) {
      const f = M[r][col];
      M[r] = M[r].map((x, j) => x - f * M[col][j]);
    }
  }
  return M.map((row) => row.slice(n));
};

const determinant = (A) => {
  const M = A.map((row) => [...row]);
  let d = 1;
  for (let col = 0; col < M.length; col += 1) {
    let pivot = col;
    for (let r = col + 1; r < M.length; r += 1) if (Math.abs(M[r][col]) > Math.abs(M[pivot][col])) pivot = r;
    if (Math.abs(M[pivot][col]) < 1e-13) return 0;
    if (pivot !== col) { [M[col], M[pivot]] = [M[pivot], M[col]]; d *= -1; }
    const p = M[col][col]; d *= p;
    for (let r = col + 1; r < M.length; r += 1) {
      const f = M[r][col] / p;
      for (let j = col; j < M.length; j += 1) M[r][j] -= f * M[col][j];
    }
  }
  return d;
};

const F = (E) => {
  const internalResolvent = inverse(add(scale(E, eye(2)), scale(-1, H0)));
  return add(scale(E, eye(2)), scale(-1, mul(Wt, mul(internalResolvent, W))));
};
const Fprime = (E) => {
  const R = inverse(add(scale(E, eye(2)), scale(-1, H0)));
  return add(eye(2), mul(Wt, mul(mul(R, R), W)));
};
const Q = (E) => E ** 4 - 4 * E ** 2 - E + 1;
const bisect = (lo, hi) => {
  let a = lo, b = hi, fa = Q(a);
  for (let k = 0; k < 100; k += 1) {
    const m = (a + b) / 2, fm = Q(m);
    if (fa * fm <= 0) b = m;
    else { a = m; fa = fm; }
  }
  return (a + b) / 2;
};

for (const E of [-2.4, -0.6, 0.3, 1.8]) {
  const EIminusH = add(scale(E, eye(4)), scale(-1, Hfull));
  assert(Math.abs(determinant(EIminusH) - Q(E)) < 1e-10);
  const projectedResolvent = inverse(EIminusH).slice(0, 2).map((row) => row.slice(0, 2));
  assert(maxAbs(add(projectedResolvent, scale(-1, inverse(F(E))))) < 1e-10);
}

const roots = [[-2, -1], [-1, 0], [0, 0.5], [2, 3]].map(([a, b]) => bisect(a, b));
const states = roots.map((E) => {
  const FE = F(E);
  let v = [-FE[0][1], FE[0][0]];
  const vNorm = Math.sqrt(dot(v, v)); v = v.map((x) => x / vNorm);
  const internal = matVec(inverse(add(scale(E, eye(2)), scale(-1, H0))), matVec(W, v));
  const psi = [...v, ...internal];
  const residual = add(matVec(Hfull, psi).map((x) => [x]), scale(-E, psi.map((x) => [x]))).flat();
  assert(maxAbs(residual) < 1e-9);
  const fullNormSquared = dot(psi, psi);
  const inverseSlopeDenominator = dot(v, matVec(Fprime(E), v));
  assert(Math.abs(fullNormSquared - inverseSlopeDenominator) < 1e-9);
  const carrierWeight = dot(v, v) / fullNormSquared;
  assert(Math.abs(carrierWeight - 1 / inverseSlopeDenominator) < 1e-9);
  return { eigenvalue: E, carrierDirection: v, internalAmplitude: internal, fullNormSquared, carrierWeight };
});

assert(Math.abs(states.reduce((s, x) => s + x.carrierWeight, 0) - 2) < 1e-9);

console.log(JSON.stringify({
  protocol: "full-response-feshbach-hamiltonian/1",
  fullHamiltonian: Hfull,
  schurComplement: "F(E)=EI-W^T(EI-H0)^-1W",
  projectedResolvent: "P(EI-Hfull)^-1P^T=F(E)^-1",
  characteristicPolynomial: "det(EI-Hfull)=E^4-4E^2-E+1",
  dualResponse: "-F(E)^-1 is the negative carrier-projected resolvent",
  spectralMeaning: "Every dual pole is an eigenvalue of Hfull; every inverse-slope residue is its carrier-sector spectral weight.",
  states,
  carrierWeightSum: states.reduce((s, x) => s + x.carrierWeight, 0),
  passed: true,
}, null, 2));
