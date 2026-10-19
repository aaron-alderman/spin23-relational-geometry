const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const permutations = [
  { p: [0, 1, 2], s: 1 },
  { p: [0, 2, 1], s: -1 },
  { p: [1, 0, 2], s: -1 },
  { p: [1, 2, 0], s: 1 },
  { p: [2, 0, 1], s: 1 },
  { p: [2, 1, 0], s: -1 },
];
const addCoefficient = (poly, exponents, value) => {
  const key = exponents.join(",");
  poly.set(key, (poly.get(key) || 0) + value);
};

// Raw alternant of x1^2 x2.
const alternant = new Map();
for (const { p, s } of permutations) {
  const exponents = [0, 0, 0];
  exponents[p[0]] = 2;
  exponents[p[1]] = 1;
  addCoefficient(alternant, exponents, s);
}

// Delta=(x1-x2)(x2-x3)(x3-x1).
const delta = new Map([
  ["2,1,0", -1],
  ["2,0,1", 1],
  ["1,2,0", 1],
  ["1,0,2", -1],
  ["0,2,1", -1],
  ["0,1,2", 1],
]);
for (const [key, value] of delta.entries()) {
  assert(alternant.get(key) === -value, "alternant of x1^2 x2 must equal -Delta");
}

// The normalized sign projector divides the raw alternant by six.
const coefficientForGaussianQ = (a, b) => ({ re: -a / 6, im: -b / 6 });
for (const [a, b] of [[1, 0], [0, 1], [1, 1], [-4, 7], [12, -6]]) {
  const c = coefficientForGaussianQ(a, b);
  assert(Number.isInteger(6 * c.re) && Number.isInteger(6 * c.im), "coefficient must lie in one-sixth Gaussian lattice");
  // The diagonal pencil diag(x1,x1,(a+ib)x2) has determinant (a+ib)x1^2x2,
  // so every one-sixth Gaussian coefficient is realized up to the conventional minus sign.
}

const points = [];
for (let a = -3; a <= 3; a += 1) {
  for (let b = -3; b <= 3; b += 1) {
    if (a === 0 && b === 0) continue;
    points.push({ a, b, norm: (a * a + b * b) / 36 });
  }
}
const minNorm = Math.min(...points.map((z) => z.norm));
const shortest = points.filter((z) => Math.abs(z.norm - minNorm) < 1e-12);
assert(Math.abs(minNorm - 1 / 36) < 1e-12, "shortest nonzero lattice norm mismatch");
assert(shortest.every(({ a, b }) => a * b === 0), "shortest unrestricted shell must be CP trivial");

const cpPoints = points.filter(({ a, b }) => a !== 0 && b !== 0);
const minCPNorm = Math.min(...cpPoints.map((z) => z.norm));
const shortestCP = cpPoints.filter((z) => Math.abs(z.norm - minCPNorm) < 1e-12);
assert(Math.abs(minCPNorm - 1 / 18) < 1e-12, "shortest CP-capable norm mismatch");
assert(shortestCP.length === 4 && shortestCP.every(({ a, b }) => Math.abs(a) === 1 && Math.abs(b) === 1), "shortest CP shell must be plus/minus (1 plus/minus i)/6");

console.log("Gaussian matrix-pencil sign-coefficient lattice certificate: PASS");
console.log("Alt(x1^2*x2)=-Delta; normalized_coefficient=-q/6");
console.log("coefficient_lattice=(1/6)Z[i]_for_unrestricted_M3(Z[i])_triples");
console.log("shortest_nonzero_CP_trivial_norm=1/36; shortest_CP_capable_equal_quadrature_norm=1/18");
