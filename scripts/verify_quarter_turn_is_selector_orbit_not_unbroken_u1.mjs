const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const mmul = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())
));
const sub = (A, B) => A.map((row, i) => row.map((z, j) => add(z, scale(-1, B[i][j]))));
const maxNorm = A => Math.max(...A.flat().map(z => Math.hypot(z.re, z.im)));
const close = (A, B, tolerance = 1e-12) => maxNorm(sub(A, B)) < tolerance;

const I = [[C(1), C()], [C(), C(1)]];
const sx = [[C(), C(1)], [C(1), C()]];
const sy = [[C(), C(0, -1)], [C(0, 1), C()]];
const sz = [[C(1), C()], [C(), C(-1)]];

// U_x(pi/2) = exp(-i*pi*sigma_x/4).
const s = 1 / Math.sqrt(2);
const Ux = [[C(s), C(0, -s)], [C(0, -s), C(s)]];
assert(close(mmul(Ux, dagger(Ux)), I), "quarter-turn must be unitary");
assert(close(mmul(mmul(Ux, sy), dagger(Ux)), sz), "quarter-turn must carry the y-normal to the z-normal");
assert(close(mmul(mmul(Ux, sz), dagger(Ux)), sy.map(row => row.map(z => scale(-1, z)))), "quarter-turn must rotate z to -y");

// It does not stabilize either endpoint real form: its generator fails to
// commute with both endpoint normals.
const comm = (A, B) => sub(mmul(A, B), mmul(B, A));
assert(maxNorm(comm(sx, sy)) > 1, "sigma_x must be broken at the y selector");
assert(maxNorm(comm(sx, sz)) > 1, "sigma_x must be broken at the z selector");

// The unbroken relative-face U(1) at the population-normal selector is the
// z-axis subgroup.  It fixes sigma_z and cannot move sigma_y out of the xy plane.
const phi = 0.731;
const Vz = [[C(Math.cos(phi / 2), -Math.sin(phi / 2)), C()], [C(), C(Math.cos(phi / 2), Math.sin(phi / 2))]];
assert(close(mmul(mmul(Vz, sz), dagger(Vz)), sz), "relative-face U(1) must fix the population normal");
const rotatedY = mmul(mmul(Vz, sy), dagger(Vz));
const hsInner = (A, B) => {
  const product = mmul(A, B);
  return 0.5 * (product[0][0].re + product[1][1].re);
};
assert(Math.abs(hsInner(rotatedY, sz)) < 1e-12, "z-axis U(1) cannot map y normal to z normal");

// On the selector sphere, the path is n(t)=(0,cos t,sin t).  Its initial
// tangent is the broken z direction and it reaches the population normal at pi/2.
const n = t => [0, Math.cos(t), Math.sin(t)];
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const ny = n(0);
const nz = n(Math.PI / 2);
const tangent0 = [0, 0, 1];
assert(Math.abs(dot(ny, tangent0)) < 1e-12, "selector velocity must be tangent to RP2 at the wall real form");
assert(Math.abs(dot(nz, [0, 0, 1]) - 1) < 1e-12, "selector orbit must reach the population normal");
assert(Math.abs(dot(ny, nz)) < 1e-12, "the endpoint director lines must be orthogonal");

console.log("Selector-orbit quarter-turn certificate: PASS");
console.log("Ad_Ux(pi/2): sigma_y -> sigma_z; endpoint_real_forms_conjugate=true");
console.log("Ux_not_in_connected_stabilizer_of_Jy_or_Jz=true");
console.log("retained_z_axis_U1_cannot_generate_quarter_turn=true; broken_selector_mode_required=true");
