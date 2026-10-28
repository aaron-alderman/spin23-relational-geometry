import assert from "node:assert/strict";

// Work in exponent coordinates for ninth roots of unity.  The selected
// generator is U=diag(omega,omega,omega,1), with omega of exact order nine.
const mod = (value, modulus) => ((value % modulus) + modulus) % modulus;
const add = (left, right) => left.map((value, index) => mod(value + right[index], 9));
const scale = (multiple, vector) => vector.map((value) => mod(multiple * value, 9));
const identity = [0, 0, 0, 0];
const U = [1, 1, 1, 0];
const determinantExponent = (vector) => mod(vector.reduce((sum, value) => sum + value, 0), 9);
const component = (vector) => mod(determinantExponent(vector) / 3, 3);

const cyclicSubgroup = [];
let current = identity;
for (let exponent = 0; exponent < 9; exponent += 1) {
  cyclicSubgroup.push(current);
  current = add(current, U);
}
assert.deepEqual(current, identity, "U must have order dividing nine");
assert.equal(new Set(cyclicSubgroup.map((vector) => vector.join(","))).size, 9, "U must have exact order nine");

const cube = scale(3, U);
assert.deepEqual(cube, [3, 3, 3, 0]);
assert.equal(determinantExponent(cube), 0, "U cubed must lie in SU(4)");
assert.equal(new Set([identity, cube, scale(2, cube)].map((vector) => vector.join(","))).size, 3, "the cube subgroup must be C3");

const componentFibres = new Map([0, 1, 2].map((value) => [value, []]));
for (let exponent = 0; exponent < 9; exponent += 1) {
  componentFibres.get(component(cyclicSubgroup[exponent])).push(exponent);
}
assert.deepEqual([...componentFibres.entries()], [[0, [0, 3, 6]], [1, [1, 4, 7]], [2, [2, 5, 8]]], "C9 must surject onto C3 with cube kernel");

// A section C3 -> C9 would have to send a generator to an order-three element
// outside the kernel.  C9 has only one order-three subgroup, namely <U^3>.
const orderThreeExponents = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  .filter((exponent) => mod(3 * exponent, 9) === 0 && exponent !== 0);
assert.deepEqual(orderThreeExponents, [3, 6]);
assert.ok(orderThreeExponents.every((exponent) => component(cyclicSubgroup[exponent]) === 0), "the cyclic quotient sequence must not split");

// The ambient component sequence does split: lambda I4 for lambda in mu3.
// In ninth-root exponents these are scalar vectors with exponent 0,3,6.
const scalarSection = [0, 3, 6].map((exponent) => [exponent, exponent, exponent, exponent]);
assert.deepEqual(scalarSection.map(component), [0, 1, 2], "the scalar mu3 section must split the ambient component quotient");
assert.deepEqual(scalarSection.filter((vector) => determinantExponent(vector) === 0), [identity], "the scalar section must intersect SU(4) trivially");

console.log("Mathematical group H4mu3 order-nine seam: PASS C9=9; cubeKernel=3; componentImage=3; ambientSplit=true; cyclicSplit=false");
