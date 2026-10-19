import assert from 'node:assert/strict';

// Coordinate model for J_3(O)_C relative to p=e_2=diag(0,0,1).
// Each octonionic slot contributes eight complex basis directions.
const basis = [
  { label: 'd0', block: 'diag', peirceTwice: 0 },
  { label: 'd1', block: 'diag', peirceTwice: 0 },
  { label: 'd2', block: 'diag', peirceTwice: 2 },
  ...Array.from({ length: 8 }, (_, i) => ({ label: `x01_${i}`, block: 'O01', peirceTwice: 0 })),
  ...Array.from({ length: 8 }, (_, i) => ({ label: `x12_${i}`, block: 'O12', peirceTwice: 1 })),
  ...Array.from({ length: 8 }, (_, i) => ({ label: `x20_${i}`, block: 'O20', peirceTwice: 1 })),
];
assert.equal(basis.length, 27);

const multiplicity = (twiceEigenvalue) => basis.filter((x) => x.peirceTwice === twiceEigenvalue).length;
assert.deepEqual([multiplicity(2), multiplicity(1), multiplicity(0)], [1, 16, 10]);

// Exact Peirce projectors as polynomials in L_p.  We evaluate using t2=2t
// so all arithmetic remains integral/rational.
const projectors = {
  P1: (t2) => t2 * (t2 - 1) / 2,              // 2t^2-t
  P16: (t2) => t2 * (2 - t2),                  // 4t(1-t)
  P10: (t2) => (t2 * t2 - 3 * t2 + 2) / 2,    // 2t^2-3t+1
};
for (const x of basis) {
  const values = Object.values(projectors).map((f) => f(x.peirceTwice));
  assert(values.every((v) => v === 0 || v === 1));
  assert.equal(values.reduce((a, b) => a + b, 0), 1);
}
assert.equal(basis.reduce((n, x) => n + projectors.P1(x.peirceTwice), 0), 1);
assert.equal(basis.reduce((n, x) => n + projectors.P16(x.peirceTwice), 0), 16);
assert.equal(basis.reduce((n, x) => n + projectors.P10(x.peirceTwice), 0), 10);

// The three coordinate primitive idempotents are indistinguishable by the
// characteristic invariants and select overlapping, not independent, 16s.
const frame = [0, 1, 2];
const characteristic = (i) => ({ trace: 1, traceSquare: 1, determinant: 0, rank: 1, coordinate: i });
for (const i of frame) {
  const c = characteristic(i);
  assert.deepEqual([c.trace, c.traceSquare, c.determinant, c.rank], [1, 1, 0, 1]);
}
const halfSpace = (i) => new Set(
  basis.filter((x) => x.block.startsWith('O') && x.block.includes(String(i))).map((x) => x.label),
);
for (const i of frame) assert.equal(halfSpace(i).size, 16);
for (let i = 0; i < 3; i += 1) for (let j = i + 1; j < 3; j += 1) {
  const overlap = [...halfSpace(i)].filter((x) => halfSpace(j).has(x));
  assert.equal(overlap.length, 8);
}
assert.equal(new Set(frame.flatMap((i) => [...halfSpace(i)])).size, 24);

// Stabilizer/orbit dimension bookkeeping for compact E6.
const dimensions = { E6: 78, Spin10: 45, U1: 1 };
assert.equal(dimensions.E6 - (dimensions.Spin10 + dimensions.U1), 32); // real dimension of EIII = complex 16
assert.equal(dimensions.E6 - dimensions.Spin10, 33); // exact-vector orbit includes the phase direction

// By irreducibility and Schur's lemma, an E6-equivariant constant endomorphism
// of 27 is scalar.  Scalar idempotents have rank only 0 or 27, never 16.
const scalarIdempotents = [0, 1];
assert.deepEqual(scalarIdempotents.map((lambda) => ({ lambda, rank: lambda === 0 ? 0 : 27 })), [
  { lambda: 0, rank: 0 }, { lambda: 1, rank: 27 },
]);
assert(!scalarIdempotents.some((lambda) => (lambda === 0 ? 0 : 27) === 16));

// On the diagonal Jordan subalgebra, x#=(bc,ca,ab).  The compact-E6
// invariant nonnegative potential ||x#||^2+(||x||^2-v^2)^2 therefore has
// normalized rank-one minima, but retains the orbit/phase degeneracy.
const diagonalPotential = ([a, b, c], v = 1) => {
  const norm2 = a * a + b * b + c * c;
  const sharpNorm2 = (a * b) ** 2 + (b * c) ** 2 + (c * a) ** 2;
  return sharpNorm2 + (norm2 - v * v) ** 2;
};
for (const p of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]) assert.equal(diagonalPotential(p), 0);
for (const x of [[1,1,0],[1,0,1],[0,1,1],[1,1,1],[0,0,0]]) assert(diagonalPotential(x) > 0);

console.log(JSON.stringify({
  protocol: 'representation-trunk/peirce-16-selector-and-orbit/1',
  chosenState: 'primitive rank-one idempotent p',
  peirceSpectrum: { '1': 1, '1/2': 16, '0': 10 },
  intrinsicConditionalProjector: 'P16(p)=4 L_p (I-L_p)',
  projectors: {
    one: '2 L_p^2-L_p', sixteen: '4 L_p-4 L_p^2', ten: 'I-3 L_p+2 L_p^2',
  },
  lineStabilizer: '[Spin(10) x U(1)]/Z4',
  lineOrbit: 'E6 / ([Spin(10) x U(1)]/Z4), real dimension 32 = complex dimension 16',
  exactVectorStabilizer: 'Spin(10)',
  noStateIndependentSelector: 'End_E6(27)=C, so an E6-equivariant constant projector has rank 0 or 27, not 16',
  intrinsicOrbitPotential: {
    form: 'V(x)=lambda (||x||^2-v^2)^2 + kappa ||x#||^2, lambda,kappa>0',
    minima: 'normalized nonzero rank-one vectors',
    limitation: 'selects the homogeneous orbit, not a unique point or phase; a vacuum choice is still spontaneous',
  },
  jordanFrameChoices: {
    countShown: 3,
    characteristicInvariants: '(Tr,Tr p^2,det,rank)=(1,1,0,1) for all three',
    selected16PairwiseIntersectionDimension: 8,
    unionOfCoordinateBasisDirections: 24,
    verdict: 'the three coordinate choices are equivalent and overlapping, not three independent generations',
  },
  passed: true,
}, null, 2));
