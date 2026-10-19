const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const canonicalAngle = (a, b) => {
  let theta = Math.atan2(b, a);
  while (theta < 0) theta += 2 * Math.PI;
  return theta;
};

const enumerateGaussian = (bound) => {
  const points = [];
  for (let a = -bound; a <= bound; a += 1) {
    for (let b = -bound; b <= bound; b += 1) {
      if (a === 0 && b === 0) continue;
      points.push({ a, b, norm: a * a + b * b, angle: canonicalAngle(a, b) });
    }
  }
  return points;
};

const target = 0.371234;
const error = (theta) => {
  const d = Math.abs(theta - target);
  return Math.min(d, 2 * Math.PI - d);
};
const best = (bound) => enumerateGaussian(bound).reduce((p, q) => (error(q.angle) < error(p.angle) ? q : p));
const best10 = best(10);
const best100 = best(100);
assert(error(best100.angle) < error(best10.angle), "larger integral height must improve angular approximation");
assert(error(best100.angle) < 2e-4, "Gaussian lattice directions must approximate a generic target angle closely");

const normShell = (n, bound = Math.ceil(Math.sqrt(n))) => enumerateGaussian(bound).filter((z) => z.norm === n);
const units = normShell(1);
assert(units.length === 4, "Gaussian norm-one shell must contain four units");
assert(units.every(({ a, b }) => a * b === 0), "Gaussian units must be CP-area trivial");

const normTwo = normShell(2);
assert(normTwo.length === 4, "Gaussian norm-two shell must contain four points");
assert(normTwo.every(({ a, b }) => Math.abs(a) === 1 && Math.abs(b) === 1), "norm two must force equal quadratures");
assert(normTwo.every(({ a, b }) => Math.abs(a * b) === 1), "norm-two orbit must carry nonzero equal CP area");

const normFive = normShell(5);
assert(normFive.length === 8, "Gaussian norm-five shell must contain eight points");
assert(normFive.some(({ a, b }) => Math.abs(a) !== Math.abs(b)), "a different fixed norm need not give equal quadratures");

// Sheet sign and conjugation generate the full norm-two orbit from 1+i.
const orbit = new Set();
for (const sign of [1, -1]) {
  for (const conjugate of [1, -1]) orbit.add(String(sign) + "," + String(sign * conjugate));
}
assert(orbit.size === 4, "sign and conjugation must generate four norm-two vacua");

console.log("Exceptional-phase arithmetic norm gate certificate: PASS");
console.log("generic_target_angle_error_bound10=" + error(best10.angle) + "; bound100=" + error(best100.angle));
console.log("Gaussian_integrality_alone_has_dense_directions=true");
console.log("norm1_units_CP_trivial=true; norm2_equal_quadrature=true; norm5_not_equal=true");
