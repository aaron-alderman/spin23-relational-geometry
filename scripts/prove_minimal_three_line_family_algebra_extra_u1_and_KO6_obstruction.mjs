const partitions = [
  [[0,1,2]],
  [[0],[1,2]],
  [[1],[0,2]],
  [[2],[0,1]],
  [[0],[1],[2]],
];

const separatesAll = partition => partition.length === 3;
const minimalSeparating = partitions.filter(separatesAll);
if (minimalSeparating.length !== 1) throw new Error('partition classification failed');

// Primitive trace-zero basis for equal multiplicities (P,I,N).
const X = [-2, 1, 1];       // old 1+2 generator
const Z = [0, 1, -1];       // new image/null splitter
const trace = v => v.reduce((a,b) => a+b, 0);
if (trace(X) !== 0 || trace(Z) !== 0) throw new Error('unimodular basis failed');

const charge = (v, source, target) => v[target] - v[source];
const edges = {
  P_to_image: [charge(X,0,1), charge(Z,0,1)],
  P_to_null: [charge(X,0,2), charge(Z,0,2)],
  image_to_null: [charge(X,1,2), charge(Z,1,2)],
};
if (edges.P_to_image[0] !== 3 || edges.P_to_null[0] !== 3) throw new Error('charge-three face failed');
if (edges.P_to_image[1] === edges.P_to_null[1]) throw new Error('splitter failed');
if (edges.image_to_null[0] !== 0 || Math.abs(edges.image_to_null[1]) !== 2) throw new Error('internal Q charge failed');

// Any 3x3 antisymmetric matrix is singular.  Use a generic symbolic-number
// witness and the exact determinant formula.
const skew3 = (a,b,c) => [[0,a,b],[-a,0,c],[-b,-c,0]];
const det3 = A => A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])
  - A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])
  + A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);
for (const abc of [[1,2,3],[-2,5,7],[0,4,-9]]) {
  if (det3(skew3(...abc)) !== 0) throw new Error('odd skew determinant should vanish');
}

// A four-character skew form can be unimodular; reuse the established repair.
const cap4 = [[0,0,1,1],[0,0,-1,0],[-1,1,0,0],[-1,0,0,0]];
const det4 = A => {
  let total = 0;
  for (let j=0;j<4;j++) {
    const minor = A.slice(1).map(r => r.filter((_,k) => k!==j));
    total += (j%2?-1:1)*A[0][j]*det3(minor);
  }
  return total;
};
if (det4(cap4) !== 1) throw new Error('four-character repair determinant failed');

console.log(JSON.stringify({
  protocol: 'minimal-three-line-family-algebra-extra-u1-KO6/1',
  diagonalSubalgebrasAsPartitions: partitions,
  uniqueAlgebraSeparatingPImageNull: 'C^3',
  connectedUnitaryRank: 3,
  equalMultiplicityUnimodularRank: 2,
  primitiveGenerators: {X, Z},
  edgeChargePairs_X_Z: edges,
  interpretation: {
    X: 'retains the old selected-versus-complement charge three',
    Z: 'distinguishes the image and null lines but is an additional relative U(1)',
  },
  associativeRankOneNoGo: 'Every two-dimensional diagonal unital *-subalgebra identifies at least one pair of the three lines.',
  KO6: {
    threeCharacterIntersection: 'antisymmetric 3x3 and therefore singular',
    fourCharacterRepairDeterminant: det4(cap4),
    remainingCost: 'a fourth character raises the naive relative abelian rank again and needs Dirac connectivity',
  },
  passed: true,
}, null, 2));
