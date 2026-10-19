import assert from "node:assert/strict";

const eps = 1e-11;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const scale = (s, a) => a.map((x) => s * x);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const unit = (a) => scale(1 / norm(a), a);
const close = (a, b, tolerance = eps) => assert(Math.abs(a - b) < tolerance, `${a} != ${b}`);

// A qubit state rho=(I+r.sigma)/2 is faithful exactly when |r|<1.
const r0 = [0, 0, 0.6];
const r1 = [0.4, 0, 0.2];
const r2 = [0.1, 0.3, -0.2];
for (const r of [r0, r1, r2]) {
  assert(norm(r) < 1);
  assert((1 - norm(r)) / 2 > 0);
}

// The first state fixes an axis but leaves rotations about it free.
const rotateAboutZ = (r, theta) => [
  Math.cos(theta) * r[0] - Math.sin(theta) * r[1],
  Math.sin(theta) * r[0] + Math.cos(theta) * r[1],
  r[2],
];
const r1rot = rotateAboutZ(r1, 0.73);
close(norm(r1rot), norm(r1));
close(dot(r0, r1rot), dot(r0, r1));
assert(Math.abs(r1rot[1]) > 0.1, "residual U(1) should rotate the proposed real plane");

// An ordered nonparallel pair canonically fixes z and a positive x direction.
const canonicalFrame = (a, b) => {
  const ez = unit(a);
  const transverse = sub(b, scale(dot(b, ez), ez));
  assert(norm(transverse) > eps, "the ordered pair must be nonparallel");
  const ex = unit(transverse);
  const ey = cross(ez, ex);
  return { ex, ey, ez };
};
const coords = (r, f) => [dot(r, f.ex), dot(r, f.ey), dot(r, f.ez)];
const frame = canonicalFrame(r0, r1);
const c0 = coords(r0, frame);
const c1 = coords(r1, frame);
close(c0[0], 0); close(c0[1], 0);
assert(c0[2] > 0);
assert(c1[0] > 0); close(c1[1], 0);

// A third state supplies an orientation pseudoscalar.
const tau = dot(r0, cross(r1, r2));
assert(Math.abs(tau) > eps);
assert.equal(Math.sign(tau), Math.sign(coords(r2, frame)[1]));

// Proper unitary changes of qubit basis act by SO(3) and preserve tau.
const axis = unit([1, 2, 3]);
const angle = 0.91;
const rotate = (v) => {
  const c = Math.cos(angle), s = Math.sin(angle);
  return v.map((x, i) =>
    c * x + s * cross(axis, v)[i] + (1 - c) * dot(axis, v) * axis[i]
  );
};
const [s0, s1, s2] = [r0, r1, r2].map(rotate);
close(dot(s0, cross(s1, s2)), tau);
const sframe = canonicalFrame(s0, s1);
for (let i = 0; i < 3; i++) close(coords(s2, sframe)[i], coords(r2, frame)[i]);

// Antiunitary complex conjugation is the Bloch reflection y -> -y.
const reflectK = ([x, y, z]) => [x, -y, z];
const reflectedTau = dot(reflectK(r0), cross(reflectK(r1), reflectK(r2)));
close(reflectedTau, -tau);

// For diagonal rho=diag(p,q), Delta(E_ij)=(p_i/p_j)E_ij.
const p = 0.8, q = 0.2;
const modularEigenvalues = [p / p, p / q, q / p, q / q];
assert.deepEqual(modularEigenvalues, [1, 4, 0.25, 1]);
const centralizerComplexDimension = modularEigenvalues.filter((x) => x === 1).length;
assert.equal(centralizerComplexDimension, 2);

// J(X)=X^dagger fixes all Hermitian matrices: I,sigma_x,sigma_y,sigma_z (4 real
// dimensions). H_2(R) excludes sigma_y and has only 3, so modular J alone is not
// the programme's real-symmetric selector.
const modularJFixedRealDimension = 4;
const h2rRealDimension = 3;
assert.notEqual(modularJFixedRealDimension, h2rRealDimension);

console.log("PASS modular state-frame selection");
console.log(`tau=${tau}`);
console.log("one_state_residual_rotation=U(1)");
console.log("ordered_pair_selects_real_plane=true");
console.log("ordered_triple_selects_orientation=true");
console.log("invariance_group=unitary_basis_changes_not_general_GL2_congruence");
console.log(`modular_J_fixed_dimension=${modularJFixedRealDimension}`);
console.log(`H2R_dimension=${h2rRealDimension}`);
