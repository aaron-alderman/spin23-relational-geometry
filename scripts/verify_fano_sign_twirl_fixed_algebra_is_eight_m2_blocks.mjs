import assert from "node:assert/strict";

const parity = (n) => ((n & 1) + ((n >> 1) & 1) + ((n >> 2) & 1)) % 2;

// The octonion basis is indexed by its F_2^3 degree.  The doubled carrier
// has two copies of each of the eight distinct characters.
const characters = [];
for (let face = 0; face < 2; face += 1) {
  for (let degree = 0; degree < 8; degree += 1) {
    characters.push(Array.from(
      { length: 8 },
      (_, a) => parity(a & degree) === 0 ? 1 : -1
    ));
  }
}

const survivesTwirl = (i, j) => {
  const coefficient = Array.from(
    { length: 8 },
    (_, a) => characters[i][a] * characters[j][a]
  ).reduce((sum, x) => sum + x, 0) / 8;
  assert(Math.abs(coefficient) < 1e-12 || Math.abs(coefficient - 1) < 1e-12);
  return Math.abs(coefficient - 1) < 1e-12;
};

const survivingUnits = [];
for (let i = 0; i < 16; i += 1) {
  for (let j = 0; j < 16; j += 1) {
    if (survivesTwirl(i, j)) survivingUnits.push([i, j]);
  }
}

// Equality of characters is equality of F_2^3 degree.  Each degree has
// multiplicity two, one in each face, and therefore contributes M_2(R).
assert.equal(survivingUnits.length, 8 * 2 * 2);
for (const [i, j] of survivingUnits) assert.equal(i % 8, j % 8);

const blockSizes = Array(8).fill(0);
for (let degree = 0; degree < 8; degree += 1) {
  const indices = Array.from({ length: 16 }, (_, i) => i).filter((i) => i % 8 === degree);
  assert.deepEqual(indices, [degree, 8 + degree]);
  blockSizes[degree] = indices.length;
}
assert.deepEqual(blockSizes, Array(8).fill(2));

const fullFixedDimension = blockSizes.reduce((sum, m) => sum + m * m, 0);
const symmetricFixedDimension = blockSizes.reduce((sum, m) => sum + m * (m + 1) / 2, 0);
const synchronizedH2RDimension = 3;
assert.equal(fullFixedDimension, 32);
assert.equal(symmetricFixedDimension, 24);
assert.equal(symmetricFixedDimension - synchronizedH2RDimension, 21);

// Full compact G_2 acts on O=R1 + Im(O), with inequivalent irreducibles
// of dimensions 1 and 7.  Doubling gives multiplicity two for each,
// so its commutant is M_2(R) + M_2(R).
const haarG2FullCommutantDimension = 2 * 2 * 2;
const haarG2SymmetricCommutantDimension = 2 * (2 * 3 / 2);
assert.equal(haarG2FullCommutantDimension, 8);
assert.equal(haarG2SymmetricCommutantDimension, 6);
assert.equal(haarG2SymmetricCommutantDimension - synchronizedH2RDimension, 3);

console.log(JSON.stringify({
  protocol: "fano-sign-twirl-fixed-algebra/1",
  doubledRepresentation: "two copies of the eight distinct real characters of (Z_2)^3",
  finiteFixedAlgebra: "direct sum over eight character sectors of M_2(R)",
  finiteFullDimension: fullFixedDimension,
  finiteSymmetricDimension: symmetricFixedDimension,
  synchronizedH2RDimension,
  finiteUnwantedSymmetricDimension: symmetricFixedDimension - synchronizedH2RDimension,
  haarG2Commutant: "M_2(R) on the scalar isotypic sector plus M_2(R) on the imaginary isotypic sector",
  haarG2FullDimension: haarG2FullCommutantDimension,
  haarG2SymmetricDimension: haarG2SymmetricCommutantDimension,
  haarG2UnwantedSymmetricDimension: haarG2SymmetricCommutantDimension - synchronizedH2RDimension,
  noGo: "octonion automorphisms fix 1, so automorphism twirling alone cannot synchronize scalar and imaginary response blocks on the full dilation",
  passed: true
}, null, 2));
