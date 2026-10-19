import assert from "node:assert/strict";

const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const normalize = ([e, o]) => {
  const n = Math.hypot(e, o);
  return [e / n, o / n];
};
const conjugate = ([e, o]) => [e, -o];
const projectiveCpOdd = ([e, o]) => 2 * e * o / (e * e + o * o);
const projectiveCpEven = ([e, o]) => (e * e - o * o) / (e * e + o * o);
const lineDeterminant = ([a, b], [c, d]) => a * d - b * c;

for (const theta of [0, Math.PI / 2, 0.17, 0.61, -0.42]) {
  const q = [Math.cos(theta), Math.sin(theta)];
  const minusQ = q.map((x) => -x);
  assert(near(projectiveCpOdd(q), Math.sin(2 * theta)));
  assert(near(projectiveCpEven(q), Math.cos(2 * theta)));
  assert(near(projectiveCpOdd(minusQ), projectiveCpOdd(q))); // line invariant
  assert(near(projectiveCpOdd(conjugate(q)), -projectiveCpOdd(q)));
  assert(near(projectiveCpEven(conjugate(q)), projectiveCpEven(q)));
  const invariantLine = near(lineDeterminant(q, conjugate(q)), 0);
  assert.equal(invariantLine, near(Math.sin(2 * theta), 0));
}

// A conjugation-covariant quadratic response potential.  The cross
// coefficient c is odd under conjugation and produces a mixed eigenline.
const diagonalizeSymmetric2 = (alpha, beta, c) => {
  const theta = 0.5 * Math.atan2(2 * c, alpha - beta);
  const root = Math.hypot(alpha - beta, 2 * c);
  return {
    theta,
    eigenvalues: [(alpha + beta - root) / 2, (alpha + beta + root) / 2]
  };
};
const alpha = 1.3, beta = 2.1, c = 0.24;
const mixed = diagonalizeSymmetric2(alpha, beta, c);
const mixedConjugate = diagonalizeSymmetric2(alpha, beta, -c);
assert(near(mixedConjugate.theta, -mixed.theta) || near(mixedConjugate.theta, Math.PI - mixed.theta));
assert(near(mixed.eigenvalues[0], mixedConjugate.eigenvalues[0]));
assert(near(mixed.eigenvalues[1], mixedConjugate.eigenvalues[1]));
assert(!near(projectiveCpOdd(normalize([Math.cos(mixed.theta), Math.sin(mixed.theta)])), 0));

console.log(JSON.stringify({
  protocol: "mixed-clifford-response-projective-cp-invariant/1",
  responseLine: "q=[r_even:r_odd] in RP^1",
  conjugation: "[r_even:r_odd] -> [r_even:-r_odd]",
  cpOddInvariant: "I_CP=2 r_even r_odd/(r_even^2+r_odd^2)=sin(2 theta)",
  cpEvenInvariant: "I_even=(r_even^2-r_odd^2)/(r_even^2+r_odd^2)=cos(2 theta)",
  conjugationInvariantLines: ["[1:0] scalar-even axis", "[0:1] imaginary-odd axis"],
  quadraticKernel: "[[alpha,c],[c,beta]]",
  mixedAngleCondition: "tan(2 theta)=2c/(alpha-beta)",
  interpretation: "a nonzero mixed angle requires a conjugation-odd cross coefficient once the matter conjugation frame is fixed",
  sample: { alpha, beta, c, theta: mixed.theta, eigenvalues: mixed.eigenvalues },
  passed: true
}, null, 2));
