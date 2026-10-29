import assert from "node:assert/strict";

const vectors = Array.from({ length: 16 }, (_, value) => value);
const bit = (vector, coordinate) => (vector >> coordinate) & 1;
const q = (vector) => (
  bit(vector, 0) * bit(vector, 1)
  + bit(vector, 2) * bit(vector, 3)
) & 1;
const polar = (left, right) => q(left ^ right) ^ q(left) ^ q(right);

function applyMatrix(matrix, vector) {
  let image = 0;
  for (let column = 0; column < 4; column += 1) {
    if (bit(vector, column)) image ^= (matrix >> (4 * column)) & 0xf;
  }
  return image;
}

function isInvertible(matrix) {
  return new Set(vectors.map((vector) => applyMatrix(matrix, vector))).size === 16;
}

const orthogonalMatrices = [];
for (let matrix = 0; matrix < 2 ** 16; matrix += 1) {
  if (!isInvertible(matrix)) continue;
  if (vectors.every((vector) => q(applyMatrix(matrix, vector)) === q(vector))) {
    orthogonalMatrices.push(matrix);
  }
}
assert.equal(orthogonalMatrices.length, 72, "O+(4,2) must have order 72");

const nonsingular = vectors.filter((vector) => q(vector) === 1);
assert.equal(nonsingular.length, 6, "the plus-type four-space must have six nonsingular vectors");
const indexByVector = new Map(nonsingular.map((vector, index) => [vector, index]));
const adjacent = (leftIndex, rightIndex) => (
  leftIndex !== rightIndex && polar(nonsingular[leftIndex], nonsingular[rightIndex]) === 1
);

const unseen = new Set(nonsingular.keys());
const components = [];
while (unseen.size > 0) {
  const seed = unseen.values().next().value;
  const queue = [seed];
  const component = [];
  unseen.delete(seed);
  while (queue.length > 0) {
    const current = queue.shift();
    component.push(current);
    for (const candidate of [...unseen]) {
      if (adjacent(current, candidate)) {
        unseen.delete(candidate);
        queue.push(candidate);
      }
    }
  }
  components.push(component);
}
assert.deepEqual(components.map((component) => component.length).sort(), [3, 3]);
for (const component of components) {
  for (const left of component) {
    for (const right of component) {
      if (left !== right) assert.equal(adjacent(left, right), true, "each component must be a triangle");
    }
  }
}

const actionKeys = new Set();
for (const matrix of orthogonalMatrices) {
  const permutation = nonsingular.map((vector) => indexByVector.get(applyMatrix(matrix, vector)));
  assert.ok(permutation.every((image) => image !== undefined), "orthogonal action must preserve nonsingular vectors");
  for (let left = 0; left < 6; left += 1) {
    for (let right = 0; right < 6; right += 1) {
      assert.equal(adjacent(left, right), adjacent(permutation[left], permutation[right]), "orthogonal action must preserve the two-triangle graph");
    }
  }
  actionKeys.add(permutation.join(","));
}
assert.equal(actionKeys.size, 72, "the action on nonsingular vectors must be faithful");

function permutations(values) {
  if (values.length === 0) return [[]];
  return values.flatMap((value, index) => permutations(values.toSpliced(index, 1)).map((tail) => [value, ...tail]));
}

const graphAutomorphisms = permutations([0, 1, 2, 3, 4, 5]).filter((permutation) => {
  for (let left = 0; left < 6; left += 1) {
    for (let right = 0; right < 6; right += 1) {
      if (adjacent(left, right) !== adjacent(permutation[left], permutation[right])) return false;
    }
  }
  return true;
});
assert.equal(graphAutomorphisms.length, 72, "Aut(2 K3) must have order (3!)^2 * 2 = 72");
assert.equal(actionKeys.size, graphAutomorphisms.length, "the faithful orthogonal action must fill Aut(2 K3)");

const compose = (left, right) => right.map((image) => left[image]);
const inverse = (permutation) => {
  const result = Array(permutation.length);
  permutation.forEach((image, preimage) => { result[image] = preimage; });
  return result;
};
const permutationOrder = (permutation) => {
  const identity = permutation.map((_, index) => index);
  let power = identity;
  for (let order = 1; order <= 72; order += 1) {
    power = compose(permutation, power);
    if (power.every((image, index) => image === index)) return order;
  }
  throw new Error("permutation order exceeded ambient group order");
};
const blocks = components
  .map((component) => [...component].sort((left, right) => left - right))
  .sort((left, right) => left[0] - right[0]);
const preservesBlock = (permutation, block) => block.every((point) => block.includes(permutation[point]));
const parityOnBlock = (permutation, block) => {
  const restricted = block.map((point) => block.indexOf(permutation[point]));
  let inversions = 0;
  for (let left = 0; left < restricted.length; left += 1) {
    for (let right = left + 1; right < restricted.length; right += 1) {
      if (restricted[left] > restricted[right]) inversions += 1;
    }
  }
  return inversions & 1;
};

const blockBase = graphAutomorphisms.filter((permutation) => blocks.every((block) => preservesBlock(permutation, block)));
assert.equal(blockBase.length, 36, "the block-preserving base must be S3 x S3 of order 36");
const matchedParity = blockBase.filter((permutation) => (
  parityOnBlock(permutation, blocks[0]) === parityOnBlock(permutation, blocks[1])
));
assert.equal(matchedParity.length, 18, "the equal-sign fiber product must have order 18");
const matchedKeys = new Set(matchedParity.map((permutation) => permutation.join(",")));
for (const ambient of blockBase) {
  for (const matched of matchedParity) {
    const conjugate = compose(compose(ambient, matched), inverse(ambient));
    assert.ok(matchedKeys.has(conjugate.join(",")), "the matched-parity group must be normal in S3 x S3");
  }
}

const evenEven = blockBase.filter((permutation) => blocks.every((block) => parityOnBlock(permutation, block) === 0));
assert.equal(evenEven.length, 9, "the even-even base must be C3 x C3");
assert.ok(evenEven.every((permutation) => [1, 3].includes(permutationOrder(permutation))), "the even-even base must have exponent three");
const simultaneousInvolution = matchedParity.find((permutation) => (
  blocks.every((block) => parityOnBlock(permutation, block) === 1)
  && permutationOrder(permutation) === 2
));
assert.ok(simultaneousInvolution, "the matched group must contain a simultaneous odd-odd involution");
for (const element of evenEven) {
  assert.deepEqual(
    compose(compose(simultaneousInvolution, element), simultaneousInvolution),
    inverse(element),
    "the selected C2 must invert both C3 coordinates"
  );
}

const coordinatePermutation = (permutation, block) => block.map((point) => block.indexOf(permutation[point]));
const diagonalS3 = matchedParity.filter((permutation) => (
  coordinatePermutation(permutation, blocks[0]).join(",")
  === coordinatePermutation(permutation, blocks[1]).join(",")
));
assert.equal(diagonalS3.length, 6, "the equal-coordinate diagonal must be S3 of order six");
const diagonalKeys = new Set(diagonalS3.map((permutation) => permutation.join(",")));
assert.ok(matchedParity.some((ambient) => diagonalS3.some((diagonal) => {
  const conjugate = compose(compose(ambient, diagonal), inverse(ambient));
  return !diagonalKeys.has(conjugate.join(","));
})), "the diagonal S3 must be nonnormal in the order-18 matched group");

const selectedPoint = blocks[0][0];
const flagStabilizer = graphAutomorphisms.filter((permutation) => permutation[selectedPoint] === selectedPoint);
assert.equal(flagStabilizer.length, 12, "a point/flag stabilizer must have order 12 and index six");
const localC2 = flagStabilizer.filter((permutation) => blocks[1].every((point) => permutation[point] === point));
const otherS3 = flagStabilizer.filter((permutation) => blocks[0].every((point) => permutation[point] === point));
assert.equal(localC2.length, 2, "the selected triangle contributes the residual S2 ~= C2 factor");
assert.equal(otherS3.length, 6, "the other triangle contributes the S3 factor");
const factorProducts = new Set();
for (const left of localC2) {
  for (const right of otherS3) {
    assert.deepEqual(compose(left, right), compose(right, left), "the flag-stabilizer factors must commute");
    factorProducts.add(compose(left, right).join(","));
  }
}
assert.equal(factorProducts.size, 12, "the commuting C2 and S3 factors must generate the full flag stabilizer");
assert.ok([...factorProducts].every((key) => flagStabilizer.some((permutation) => permutation.join(",") === key)));

console.log(
  `Mathematical group O+(4,2) wreath witness: PASS matrices=${orthogonalMatrices.length}; `
  + `nonsingular=${nonsingular.length}; components=${components.map((component) => component.length).join("+")}; `
  + `graphAutomorphisms=${graphAutomorphisms.length}; matchedParity=${matchedParity.length}; `
  + `diagonalS3=${diagonalS3.length}; flagStabilizer=${flagStabilizer.length}`
);
