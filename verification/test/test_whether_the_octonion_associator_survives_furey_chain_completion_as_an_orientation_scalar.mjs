import assert from "node:assert/strict";

const fano = [
  [1, 2, 3], [1, 4, 5], [1, 7, 6], [2, 4, 6],
  [2, 5, 7], [3, 4, 7], [3, 6, 5]
];

const basisProduct = (i, j) => {
  if (i === 0) return [1, j];
  if (j === 0) return [1, i];
  if (i === j) return [-1, 0];
  for (const [a, b, c] of fano) {
    for (const [u, v, w] of [[a, b, c], [b, c, a], [c, a, b]]) {
      if (i === u && j === v) return [1, w];
      if (i === v && j === u) return [-1, w];
    }
  }
  throw new Error(`missing product e${i}e${j}`);
};

const zero = () => Array(8).fill(0);
const unit = (i) => { const x = zero(); x[i] = 1; return x; };
const add = (x, y) => x.map((v, i) => v + y[i]);
const sub = (x, y) => x.map((v, i) => v - y[i]);
const scale = (s, x) => x.map((v) => s * v);
const dot = (x, y) => x.reduce((s, v, i) => s + v * y[i], 0);
const norm2 = (x) => dot(x, x);
const mul = (x, y) => {
  const out = zero();
  for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
    const [s, k] = basisProduct(i, j);
    out[k] += s * x[i] * y[j];
  }
  return out;
};
const comm = (x, y) => sub(mul(x, y), mul(y, x));
const assoc = (x, y, z) => sub(mul(mul(x, y), z), mul(x, mul(y, z)));
const jacobiator = (x, y, z) => add(add(comm(comm(x, y), z), comm(comm(y, z), x)), comm(comm(z, x), y));
const eq = (x, y, eps = 1e-12) => x.every((v, i) => Math.abs(v - y[i]) <= eps);

const mat = (entry) => Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => entry(i, j)));
const mmul = (A, B) => mat((i, j) => A[i].reduce((s, v, k) => s + v * B[k][j], 0));
const msub = (A, B) => mat((i, j) => A[i][j] - B[i][j]);
const mvec = (A, x) => A.map((row) => dot(row, x));
const frob2 = (A) => A.reduce((s, row) => s + norm2(row), 0);
const left = (a) => mat((i, j) => mul(a, unit(j))[i]);

// Find a basis triple with a genuine octonionic associator, without baking in
// a convention-specific sign.
let witness;
for (let i = 1; i < 8 && !witness; i += 1) {
  for (let j = i + 1; j < 8 && !witness; j += 1) {
    for (let k = j + 1; k < 8 && !witness; k += 1) {
      const A = assoc(unit(i), unit(j), unit(k));
      if (norm2(A) > 0) witness = { i, j, k, A };
    }
  }
}
assert(witness);

const { i, j, k, A } = witness;
const a = unit(i), b = unit(j), c = unit(k);
const swapped = assoc(c, b, a);
assert(eq(swapped, scale(-1, A)));                         // orientation odd
assert.equal(A[0], 0);                                    // no scalar part
assert.equal(norm2(swapped), norm2(A));                    // norm loses the sign
assert(eq(jacobiator(a, b, c), scale(6, A)));              // Malcev shadow

const La = left(a), Lb = left(b), Lc = left(c);
const chainLeftBracket = mmul(mmul(La, Lb), Lc);
const chainRightBracket = mmul(La, mmul(Lb, Lc));
assert.equal(frob2(msub(chainLeftBracket, chainRightBracket)), 0);

// Nonassociativity survives as the distinction between multiplying octonion
// labels first and composing their actions.  It is not an associator of the
// completed operator algebra itself.
const collapsedLeft = mmul(left(mul(a, b)), Lc);
const collapsedRight = mmul(La, left(mul(b, c)));
const collapseDefect = msub(collapsedLeft, collapsedRight);
assert(frob2(collapseDefect) > 0);
assert(eq(mvec(collapseDefect, unit(0)), A));

// Turning the odd associator vector into a number needs a chosen imaginary
// direction.  A direction parallel to A sees it; an orthogonal basis direction
// does not.  The canonical scalar data available without that choice are even.
const parallelDirection = scale(1 / Math.sqrt(norm2(A)), A);
const orthogonalIndex = Array.from({ length: 7 }, (_, q) => q + 1).find((q) => Math.abs(dot(unit(q), A)) < 1e-12);
assert(orthogonalIndex);
const orientedProjection = dot(parallelDirection, A);
const orthogonalProjection = dot(unit(orthogonalIndex), A);
assert(orientedProjection > 0);
assert.equal(orthogonalProjection, 0);

console.log(JSON.stringify({
  protocol: "octonion-associator-versus-furey-chain-orientation/1",
  fanoConvention: fano,
  witness: { basisTriple: [i, j, k], associator: A, normSquared: norm2(A) },
  outerSwap: { associator: swapped, flipsSign: true, normSquaredUnchanged: true },
  malcevJacobiator: "J_comm(a,b,c)=6[a,b,c] on the witness",
  operatorChainAssociatorFrobeniusSquared: frob2(msub(chainLeftBracket, chainRightBracket)),
  collapsedLabelDefectFrobeniusSquared: frob2(collapseDefect),
  collapseDefectOnIdentity: mvec(collapseDefect, unit(0)),
  scalarization: {
    realPart: A[0],
    normSquared: norm2(A),
    chosenParallelProjection: orientedProjection,
    chosenOrthogonalBasisDirection: orthogonalIndex,
    orthogonalProjection
  },
  conclusion: "The octonion associator is an orientation-odd imaginary vector, but operator-chain composition is associative. A signed scalar requires a chosen imaginary direction; canonical scalarization by norm is orientation-even.",
  decision: "Retain the associator as a possible frame-dependent witness, but close it as a canonical source of the global Spin(2,3)/Walsh orientation bit unless an independently selected G2 frame is supplied.",
  passed: true
}, null, 2));
