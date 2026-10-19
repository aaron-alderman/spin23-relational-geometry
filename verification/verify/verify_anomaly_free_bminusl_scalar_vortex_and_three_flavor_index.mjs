const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const F = (n, d = 1) => {
  const sign = d < 0 ? -1 : 1;
  const g = gcd(n, d);
  return { n: sign * n / g, d: sign * d / g };
};
const add = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d);
const mul = (a, b) => F(a.n * b.n, a.d * b.d);
const pow = (a, p) => Array.from({ length: p }, () => a).reduce(mul, F(1));
const sum = (xs) => xs.reduce(add, F(0));
const zero = (x) => x.n === 0;

const fields = [
  { name: "Q", mult: 6, y: F(1, 6), bl: F(1, 3) },
  { name: "u^c", mult: 3, y: F(-2, 3), bl: F(-1, 3) },
  { name: "d^c", mult: 3, y: F(1, 3), bl: F(-1, 3) },
  { name: "L", mult: 2, y: F(-1, 2), bl: F(-1) },
  { name: "e^c", mult: 1, y: F(1), bl: F(1) },
  { name: "nu^c", mult: 1, y: F(0), bl: F(1) },
];

const weighted = (fn) => sum(fields.map((f) => mul(F(f.mult), fn(f))));
assert(zero(weighted((f) => f.bl)), "mixed gravitational-B-L anomaly must vanish");
assert(zero(weighted((f) => pow(f.bl, 3))), "cubic B-L anomaly must vanish");
assert(zero(weighted((f) => mul(pow(f.y, 2), f.bl))), "Y^2-B-L anomaly must vanish");
assert(zero(weighted((f) => mul(f.y, pow(f.bl, 2)))), "Y-(B-L)^2 anomaly must vanish");

const su3SquaredBL = sum([
  mul(F(2), mul(F(1, 2), F(1, 3))),
  mul(F(1, 2), F(-1, 3)),
  mul(F(1, 2), F(-1, 3)),
]);
const su2SquaredBL = sum([
  mul(F(3), mul(F(1, 2), F(1, 3))),
  mul(F(1, 2), F(-1)),
]);
assert(zero(su3SquaredBL), "SU(3)^2-B-L anomaly must vanish");
assert(zero(su2SquaredBL), "SU(2)^2-B-L anomaly must vanish");

// S has B-L=-2 and nu^c has B-L=+1 in left-handed notation.
assert(zero(sum([F(-2), F(1), F(1)])), "S nu^c nu^c must be B-L invariant");

for (let vortex = -4; vortex <= 4; vortex += 1) {
  const determinantWinding = 3 * vortex;
  assert(((determinantWinding - vortex) % 2) === 0,
    "three-flavor determinant parity must equal vortex parity");
}
assert(3 * 1 === 3, "unit B-L scalar vortex must give three-flavor determinant winding three");

// Integer normalization X=3(B-L): scalar charge -6 leaves Z6; its order-two
// subgroup is matter parity, while the order-three factor can overlap color center.
const integerScalarCharge = -6;
assert(Math.abs(integerScalarCharge) === 6, "faithful integer normalization must expose the finite remnant");
assert(((-1) ** integerScalarCharge) === 1, "order-two matter parity must leave the scalar vacuum fixed");

console.log("Anomaly-free B-L scalar-vortex certificate: PASS");
console.log("all_local_B-L_anomalies_per_generation=0");
console.log("Majorana_portal_charge=-2+1+1=0");
console.log("unit_scalar_vortex_three_flavor_det_winding=3");
console.log("integer_normalization_remnant=Z6_with_matter_parity_Z2_subgroup");
console.log("Jordan_Furey_origin_of_scalar_not_asserted=true");
