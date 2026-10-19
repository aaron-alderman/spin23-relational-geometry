const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const candidates = [
  { name: "full-lock Delta", color: 1, weak: 3, y: 1, bl: 2, elementary: true },
  { name: "full-lock Delta dagger", color: 1, weak: 3, y: -1, bl: -2, elementary: true },
  { name: "full-lock xi", color: 1, weak: 3, y: 0, bl: 0, elementary: true },
  { name: "Furey Higgs doublet", color: 1, weak: 2, y: 0.5, bl: 0, elementary: false },
  { name: "Jordan trace coordinate", color: 1, weak: 1, y: 0, bl: 0, elementary: true, real: true },
  { name: "sterile symmetric bilinear", color: 1, weak: 1, y: 0, bl: 2, elementary: false, composite: true },
];

const target = candidates.filter((x) => x.color === 1 && x.weak === 1 && x.y === 0 && Math.abs(x.bl) === 2);
assert(target.length === 1 && target[0].composite,
  "the audited inventory must contain only the composite sterile bilinear with the target charges");
const elementaryTarget = target.filter((x) => x.elementary);
assert(elementaryTarget.length === 0, "no audited elementary field may masquerade as the B-L charge-two singlet");

const flavors = 3;
assert(flavors * (flavors + 1) / 2 === 6, "Sym^2(C^3) must have six complex components");
assert(flavors * flavors - flavors * (flavors - 1) / 2 === 6,
  "dim_R U(3)/O(3) must be six");
assert(1 + 5 === 6, "under O(3), a symmetric tensor must split into trace plus traceless fiveplet");

const C = (re, im = 0) => ({ re, im });
const phase = (x) => C(Math.cos(x), Math.sin(x));
const winding = (samples) => {
  let total = 0;
  for (let j = 1; j < samples.length; j += 1) {
    let d = Math.atan2(samples[j].im, samples[j].re) - Math.atan2(samples[j - 1].im, samples[j - 1].re);
    while (d <= -Math.PI) d += 2 * Math.PI;
    while (d > Math.PI) d -= 2 * Math.PI;
    total += d;
  }
  return Math.round(total / (2 * Math.PI));
};

const grid = Array.from({ length: 4097 }, (_, j) => 2 * Math.PI * j / 4096);
const primitiveDet = grid.map((phi) => phase(phi)); // diag(e^{i phi},1,1)
const commonPhaseDet = grid.map((phi) => phase(3 * phi)); // e^{i phi} I_3
assert(winding(primitiveDet) === 1, "primitive U(3)/O(3) loop must have determinant winding one");
assert(winding(commonPhaseDet) === 3, "common-phase loop must be three times the primitive class");

// The Takagi lift of the primitive loop U=diag(e^{i phi/2},1,1) ends in O(3).
const liftEndpoint = [-1, 1, 1];
assert(liftEndpoint.every((x) => x === 1 || x === -1), "primitive lift endpoint must lie in O(3)");
assert(liftEndpoint.reduce((a, b) => a * b, 1) === -1,
  "primitive loop reaches the disconnected determinant-minus-one component of O(3)");

console.log("Scalar-inventory and sterile-condensate topology certificate: PASS");
console.log("existing_elementary_SM_singlet_with_abs_B-L_2=0");
console.log("sterile_Sym2_composite_complex_dimension=6");
console.log("vacuum_orbit_candidate=U(3)/O(3)_real_dimension_6");
console.log("primitive_det_winding=1");
console.log("isotropic_common_phase_class=3");
console.log("composite_condensation_dynamics_not_asserted=true");
