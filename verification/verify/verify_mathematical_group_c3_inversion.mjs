import assert from "node:assert/strict";

const elements = [0, 1, 2];
const mod3 = (value) => ((value % 3) + 3) % 3;

const permutations = (values) => values.length === 0
  ? [[]]
  : values.flatMap((value, index) => permutations(values.filter((_, candidate) => candidate !== index))
    .map((tail) => [value, ...tail]));

const automorphisms = permutations(elements).filter((image) =>
  image[0] === 0
  && elements.every((left) => elements.every((right) =>
    image[mod3(left + right)] === mod3(image[left] + image[right])
  ))
);
assert.deepEqual(automorphisms, [[0, 1, 2], [0, 2, 1]], "Aut(C3) must consist of identity and inversion");

// C3 is abelian, so every inner automorphism is the identity.
const innerAutomorphisms = elements.map(() => [0, 1, 2]);
assert.equal(new Set(innerAutomorphisms.map((image) => image.join(","))).size, 1);
const inversionOrbits = [
  [...new Set([0, mod3(-0)])].sort(),
  [...new Set([1, mod3(-1)])].sort()
];
assert.deepEqual(inversionOrbits, [[0], [1, 2]]);

const pairs = elements.flatMap((rotation) => [0, 1].map((reflection) => [rotation, reflection]));
const multiply = ([rotationLeft, reflectionLeft], [rotationRight, reflectionRight]) => [
  mod3(rotationLeft + (reflectionLeft === 0 ? rotationRight : -rotationRight)),
  (reflectionLeft + reflectionRight) % 2
];
const identity = [0, 0];
const power = (element, exponent) => {
  let result = identity;
  for (let index = 0; index < exponent; index += 1) result = multiply(result, element);
  return result;
};
const order = (element) => {
  for (let candidate = 1; candidate <= 6; candidate += 1) {
    if (power(element, candidate).join(",") === identity.join(",")) return candidate;
  }
  throw new Error(`order not found for ${element}`);
};
const orderCounts = Object.groupBy(pairs, order);
assert.equal(orderCounts[1].length, 1);
assert.equal(orderCounts[2].length, 3);
assert.equal(orderCounts[3].length, 2);
assert.notDeepEqual(multiply([1, 0], [0, 1]), multiply([0, 1], [1, 0]), "the inversion extension must be nonabelian");

console.log("Mathematical group C3 inversion seam: PASS automorphisms=2; innerAutomorphisms=1; inversionOrbit=2; semidirectOrder=6; type=S3");
