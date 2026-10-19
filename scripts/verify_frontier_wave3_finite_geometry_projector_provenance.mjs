import assert from "node:assert/strict";

const I = { re: 0, im: 1 };
const z = (re = 0, im = 0) => ({ re, im });
const addz = (a, b) => z(a.re + b.re, a.im + b.im);
const subz = (a, b) => z(a.re - b.re, a.im - b.im);
const mulz = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conjz = (a) => z(a.re, -a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => z()));
const eye = (n) => { const a = zero(n); for (let i = 0; i < n; i++) a[i][i] = z(1); return a; };
const mm = (a, b) => a.map((row, i) => b[0].map((_, j) => row.reduce((s, x, k) => addz(s, mulz(x, b[k][j])), z())));
const ms = (a, c) => a.map((r) => r.map((x) => mulz(x, c)));
const madd = (a, b, sign = 1) => a.map((r, i) => r.map((x, j) => sign === 1 ? addz(x, b[i][j]) : subz(x, b[i][j])));
const dagger = (a) => a[0].map((_, j) => a.map((r) => conjz(r[j])));
const comm = (a, b) => madd(mm(a, b), mm(b, a), -1);
const flatReal = (a) => a.flatMap((r) => r.flatMap((x) => [x.re, x.im]));

function rank(rows, eps = 1e-10) {
  const a = rows.map((r) => [...r]);
  let row = 0;
  for (let col = 0; col < (a[0]?.length ?? 0) && row < a.length; col++) {
    let p = row;
    for (let r = row + 1; r < a.length; r++) if (Math.abs(a[r][col]) > Math.abs(a[p][col])) p = r;
    if (Math.abs(a[p][col]) < eps) continue;
    [a[row], a[p]] = [a[p], a[row]];
    const d = a[row][col];
    for (let c = col; c < a[row].length; c++) a[row][c] /= d;
    for (let r = 0; r < a.length; r++) if (r !== row) {
      const f = a[r][col];
      for (let c = col; c < a[r].length; c++) a[r][c] -= f * a[row][c];
    }
    row++;
  }
  return row;
}

const P0 = zero(3);
P0[0][0] = z(1); P0[1][1] = z(1);

// A real basis of u(3): 3 diagonal imaginary, 3 real-skew, 3 imaginary-symmetric.
const u3 = [];
for (let i = 0; i < 3; i++) { const x = zero(3); x[i][i] = I; u3.push(x); }
for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
  const x = zero(3); x[i][j] = z(1); x[j][i] = z(-1); u3.push(x);
  const y = zero(3); y[i][j] = I; y[j][i] = I; u3.push(y);
}
const so3 = [];
for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
  const x = zero(3); x[i][j] = z(1); x[j][i] = z(-1); so3.push(x);
}

const complexOrbitDimension = rank(u3.map((x) => flatReal(comm(x, P0))));
const realOrbitDimension = rank(so3.map((x) => flatReal(comm(x, P0))));
assert.equal(complexOrbitDimension, 4); // CP^2
assert.equal(realOrbitDimension, 2);    // RP^2

// One safe electron anchor a=e_1 leaves a continuous CP^1 (or RP^1) of danger lines.
const projectorFromDanger = (n) => {
  const norm2 = n.reduce((s, x) => s + x.re * x.re + x.im * x.im, 0);
  const q = eye(3);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++)
    q[i][j] = subz(q[i][j], z(
      (n[i].re * n[j].re + n[i].im * n[j].im) / norm2,
      (n[i].im * n[j].re - n[i].re * n[j].im) / norm2,
    ));
  return q;
};
const thetaSamples = [0, Math.PI / 7, Math.PI / 4, Math.PI / 2];
const anchored = thetaSamples.map((t) => projectorFromDanger([z(), z(Math.cos(t)), z(Math.sin(t))]));
for (const p of anchored) {
  assert.equal(Math.abs(p[0][0].re - 1) < 1e-12, true);
  assert.equal(Math.abs(p[1][1].re + p[2][2].re - 1) < 1e-12, true);
}
assert.notDeepEqual(flatReal(anchored[0]), flatReal(anchored[1]));

// Once the exceptional Clebsch covector q_QQ=(1,1,1) is supplied, its orthogonal
// kernel projector is unique and the danger-overlap functional vanishes.
const qQQ = [z(1), z(1), z(1)];
const Psafe = projectorFromDanger(qQQ);
const expected = [
  [2 / 3, -1 / 3, -1 / 3],
  [-1 / 3, 2 / 3, -1 / 3],
  [-1 / 3, -1 / 3, 2 / 3],
];
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
  assert.equal(Math.abs(Psafe[i][j].re - expected[i][j]) < 1e-12, true);
  assert.equal(Math.abs(Psafe[i][j].im) < 1e-12, true);
}
const pq = mm(Psafe, qQQ.map((x) => [x])).flat();
assert.equal(pq.every((x) => Math.abs(x.re) < 1e-12 && Math.abs(x.im) < 1e-12), true);

// Product-carrier check: existing Furey operators T tensor I_3 commute with every
// multiplicity rotation I tensor U. A representative nontrivial T and U suffice
// to certify the tensor-factor identity used in the theorem.
const kron = (a, b) => {
  const out = Array.from({ length: a.length * b.length }, () => Array.from({ length: a[0].length * b[0].length }, () => z()));
  for (let i = 0; i < a.length; i++) for (let j = 0; j < a[0].length; j++)
    for (let k = 0; k < b.length; k++) for (let l = 0; l < b[0].length; l++)
      out[i * b.length + k][j * b[0].length + l] = mulz(a[i][j], b[k][l]);
  return out;
};
const T = [[z(1), z(2)], [z(3), z(4)]];
const U = [[z(), z(1), z()], [z(-1), z(), z()], [z(), z(), z(1)]];
const productCommutator = comm(kron(T, eye(3)), kron(eye(2), U));
assert.equal(flatReal(productCommutator).every((x) => Math.abs(x) < 1e-12), true);

const report = {
  unconstrainedProjectors: {
    family: "Gr_C(2,3)=CP^2",
    commutantAction: "U(3)",
    orbitDimension: complexOrbitDimension,
    stabilizer: "U(2) x U(1)",
  },
  strongerInternalFixedRealitySubset: {
    family: "Gr_R(2,3)=RP^2",
    commutantAction: "O(3)",
    orbitDimension: realOrbitDimension,
    stabilizer: "O(2) x O(1)",
    note: "The actual KO-six swap-conjugation pairs P with conjugate(P) and leaves the full CP^2; RP^2 requires the extra condition P=conjugate(P).",
  },
  oneSafeAnchor: {
    complexResidualFamily: "CP^1",
    realResidualFamily: "RP^1",
    completeGenericOrbitInvariant: "t=Tr(A_e P)",
  },
  uniqueOnlyAfterImportingDangerCovector: {
    qQQ: [1, 1, 1],
    projector: expected,
    functional: "F_QQ(P)=Tr(A_QQ P)>=0, uniquely minimized at zero",
  },
  conclusion: "Existing Furey-factor data do not orient the mediator multiplicity factor; q_QQ does, but importing it is the missing provenance datum.",
};

console.log(JSON.stringify(report, null, 2));
console.log("frontier wave-3 finite-geometry provenance checks passed");
