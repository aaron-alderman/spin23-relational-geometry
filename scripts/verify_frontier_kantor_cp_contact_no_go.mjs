import assert from 'node:assert/strict';

const E = [[1, 0], [0, 1]];
const dot = (x, y) => x[0] * y[0] + x[1] * y[1];
const add = (...xs) => [xs.reduce((s, x) => s + x[0], 0), xs.reduce((s, x) => s + x[1], 0)];
const scale = (a, x) => [a * x[0], a * x[1]];

// Pairing the six matrix words with their transpose-reversed words gives the
// complete transpose-covariant, metric-built cubic family on R^2.
const V = ([a, b, c], x, y, z) => add(
  scale(a * dot(y, z), x),
  scale(b * dot(y, x), z),
  scale(c * dot(x, z), y),
);
const K = (q, x, y, z) => add(V(q, x, z, y), scale(-1, V(q, y, z, x)));

const identityValues = q => {
  const out = [];
  for (const u of E) for (const v of E) for (const x of E) for (const y of E) for (const z of E) {
    const first = add(
      V(q, u, v, V(q, x, y, z)),
      scale(-1, V(q, x, y, V(q, u, v, z))),
      scale(-1, V(q, V(q, u, v, x), y, z)),
      V(q, x, V(q, v, u, y), z),
    );
    const second = add(
      K(q, K(q, u, v, x), y, z),
      scale(-1, K(q, u, v, V(q, x, y, z))),
      scale(-1, V(q, y, x, K(q, u, v, z))),
    );
    out.push(...first, ...second);
  }
  return out;
};

// Every component is a homogeneous quadratic in (a,b,c). Recover its six
// monomial coefficients by polarization and row-reduce the constraint space.
const unit = i => [0, 1, 2].map(j => i === j ? 1 : 0);
const samples = [unit(0), unit(1), unit(2), [1, 1, 0], [1, 0, 1], [0, 1, 1]].map(identityValues);
const polynomialRows = [];
for (let i = 0; i < samples[0].length; i++) {
  const aa = samples[0][i], bb = samples[1][i], cc = samples[2][i];
  const row = [aa, bb, cc, samples[3][i] - aa - bb, samples[4][i] - aa - cc, samples[5][i] - bb - cc];
  if (row.some(Boolean)) polynomialRows.push(row);
}

const rref = rows => {
  const A = rows.map(row => row.map(Number)); const pivots = []; let r = 0;
  for (let col = 0; col < A[0].length && r < A.length; col++) {
    let p = r; while (p < A.length && Math.abs(A[p][col]) < 1e-12) p++;
    if (p === A.length) continue;
    [A[r], A[p]] = [A[p], A[r]];
    const d = A[r][col]; A[r] = A[r].map(v => v / d);
    for (let i = 0; i < A.length; i++) if (i !== r && Math.abs(A[i][col]) > 1e-12) {
      const f = A[i][col]; A[i] = A[i].map((v, j) => v - f * A[r][j]);
    }
    pivots.push(col); r++;
  }
  return {matrix: A.slice(0, r), pivots, rank: r};
};
const reduced = rref(polynomialRows);
const expectedRref = [
  [0, 1, 0, -1, -1 / 3, 1 / 3],
  [0, 0, 1, 0, 1, 0],
];
assert.equal(reduced.rank, 2);
assert.ok(reduced.matrix.every((row, i) => row.every((x, j) => Math.abs(x - expectedRref[i][j]) < 1e-12)));

const passes = q => identityValues(q).every(x => Math.abs(x) < 1e-12);
const kNonzero = q => E.some(x => E.some(y => E.some(z => K(q, x, y, z).some(Boolean))));
const integerSolutions = [];
for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) for (let c = -4; c <= 4; c++) {
  if ((a || b || c) && passes([a, b, c])) integerSolutions.push({q: [a, b, c], kNonzero: kNonzero([a, b, c])});
}
assert.ok(integerSolutions.length > 0);

const solutionRays = [[1, 0, 0], [1, 1, 0], [1, 1, -1], [3, 1, -3]];
for (const ray of solutionRays) assert.ok(passes(ray));
assert.ok(kNonzero(solutionRays[0]));
assert.ok(!kNonzero(solutionRays[1]));
assert.ok(!kNonzero(solutionRays[2]));
assert.ok(kNonzero(solutionRays[3]));

const jordan = (x, y, z) => scale(0.5, add(scale(dot(y, z), x), scale(dot(y, x), z)));
for (const x of E) for (const y of E) for (const z of E) {
  assert.deepEqual(scale(0.5, add(V(solutionRays[0], x, y, z), V(solutionRays[0], z, y, x))), jordan(x, y, z));
}

const transpose = A => A[0].map((_, j) => A.map(r => r[j]));
const mm = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const madd = (...As) => As[0].map((r, i) => r.map((_, j) => As.reduce((s, A) => s + A[i][j], 0)));
const mscale = (s, A) => A.map(r => r.map(x => s * x));
const word = (p, q, r) => mm(mm(p, transpose(q)), r);
const sixWordCoefficients = ([a, b, c]) => [(a + b - c) / 2, (a + c - b) / 2, (b + c - a) / 2];
const matrixProduct = (q, x, y, z) => {
  const [p, d, e] = sixWordCoefficients(q);
  return madd(
    mscale(p, madd(word(x, y, z), word(z, y, x))),
    mscale(d, madd(word(x, z, y), word(y, z, x))),
    mscale(e, madd(word(y, x, z), word(z, x, y))),
  );
};
const columns = E.map(x => x.map(v => [v]));
let matrixCpChecks = 0;
for (const ray of solutionRays) for (const x of columns) for (const y of columns) for (const z of columns) {
  const left = matrixProduct(ray, x, y, z);
  const right = transpose(matrixProduct(ray, transpose(x), transpose(y), transpose(z)));
  assert.deepEqual(left, right);
  matrixCpChecks++;
}

console.log(JSON.stringify({
  protocol: 'frontier-kantor-cp-contact-classification/2',
  carrier: 'M_2,1(R) paired by transpose with M_1,2(R)',
  cpCovariantAnsatz: 'a x<y,z> + b z<y,x> + c y<x,z>',
  monomialOrder: ['a^2', 'b^2', 'c^2', 'ab', 'ac', 'bc'],
  independentIdentityEquationRank: reduced.rank,
  identityEquationRref: reduced.matrix,
  exactQuadraticConstraints: ['c(c+a)=0', '3b^2-3ab-ac+bc=0'],
  projectiveSolutionRays: solutionRays.map(q => ({q, kNonzero:kNonzero(q)})),
  distinguishedCompatibleRay: {
    q:[1,0,0],
    sixTransposePairedWordCoefficients:sixWordCoefficients([1,0,0]),
    kantor:true,
    cpTransposeCovariant:true,
    nonzeroK:true,
    outerSymmetrization:'the established Hermitian Jordan triple',
  },
  matrixCpChecks,
  integerSolutions,
  conclusion: 'The complete transpose-covariant metric contraction family has four projective Kantor rays. Two have nonzero K. The ray (1,0,0) also outer-symmetrizes exactly to the established Jordan triple, so the CP/contact compatibility gate remains live through a noncanonical six-word completion.',
  passed: true,
}, null, 2));
