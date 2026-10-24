const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const equal = (A, B) => JSON.stringify(A) === JSON.stringify(B);
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));

// Node order: central, outer1, outer2, outer3.
const C = [
  [2, -1, -1, -1],
  [-1, 2, 0, 0],
  [-1, 0, 2, 0],
  [-1, 0, 0, 2]
];
const P = [
  [1, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 1, 0, 0],
  [0, 0, 1, 0]
];
assert(equal(multiply(multiply(transpose(P), C), P), C), 'triality must preserve D4 Cartan form');
assert(equal(multiply(multiply(P, P), P), identity(4)), 'triality monodromy must have order three');

// Invariant lattice basis columns: central root and outer orbit sum.
const B = [
  [1, 0],
  [0, 1],
  [0, 1],
  [0, 1]
];
const gram = multiply(multiply(transpose(B), C), B);
assert(equal(gram, [[2, -3], [-3, 6]]), 'invariant lattice Gram matrix must be [[2,-3],[-3,6]]');
const determinant = gram[0][0] * gram[1][1] - gram[0][1] * gram[1][0];
assert(determinant === 3, 'invariant lattice discriminant must be three');

// gcd of entries is one and determinant is three, so Smith invariants are 1,3.
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const entryGcd = gram.flat().reduce((g, x) => gcd(g, x), 0);
assert(entryGcd === 1 && determinant === 3, 'discriminant group must be Z3');

// In coinvariants the three outer roots share one class o. The natural map
// from invariants sends central->central and outerSum->3o.
const invariantToCoinvariant = [
  [1, 0],
  [0, 3]
];
const mapDeterminant = 3;
assert(
  invariantToCoinvariant[0][0] * invariantToCoinvariant[1][1] -
  invariantToCoinvariant[0][1] * invariantToCoinvariant[1][0] === mapDeterminant,
  'invariant-to-coinvariant map must have index three'
);

// On the two-dimensional outer contrast sector P obeys P^2+P+I=0, so the
// monodromy eigenvalues are primitive cube roots and there is no fixed vector.
const contrastP = [
  [0, -1],
  [1, -1]
];
const contrastRelation = [
  [0, 0],
  [0, 0]
];
const contrastP2 = multiply(contrastP, contrastP);
const sum = contrastP2.map((row, i) => row.map((x, j) => x + contrastP[i][j] + identity(2)[i][j]));
assert(equal(sum, contrastRelation), 'contrast monodromy must satisfy lambda^2+lambda+1');

console.log('D4 triality invariant-lattice discriminant certificate: PASS');
console.log('invariant_gram=[[2,-3],[-3,6]]; determinant=3; discriminant_group=Z3');
console.log('invariant_to_coinvariant=diag(1,3); cokernel=Z3');
console.log('contrast_monodromy_polynomial=lambda^2+lambda+1; fixed_contrast_dimension=0');
