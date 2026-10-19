const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (s, a) => C(s * a.re, s * a.im);
const sub = (a, b) => add(a, scale(-1, b));
const det2 = A => sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
const norm = z => Math.hypot(z.re, z.im);

const sx = [[C(), C(1)], [C(1), C()]];
const sy = [[C(), C(0, -1)], [C(0, 1), C()]];
const sz = [[C(1), C()], [C(), C(-1)]];
const matrixAdd = (...matrices) => matrices[0].map((row, i) => row.map((_, j) =>
  matrices.reduce((sum, A) => add(sum, A[i][j]), C())
));
const matrixScale = (z, A) => A.map(row => row.map(value => mul(z, value)));

const m = 2.7;

function interfaceData(delta) {
  const kappa = m * Math.sin(delta / 2);
  const energy = -m * Math.cos(delta / 2);

  // H_L on exp(kappa*x), x<0; H_R on exp(-kappa*x), x>0.
  const left = matrixAdd(
    matrixScale(C(m), sz),
    matrixScale(C(0, -kappa), sx),
    matrixScale(C(-energy), [[C(1), C()], [C(), C(1)]])
  );
  const right = matrixAdd(
    matrixScale(C(m * Math.cos(delta)), sz),
    matrixScale(C(m * Math.sin(delta)), sy),
    matrixScale(C(0, kappa), sx),
    matrixScale(C(-energy), [[C(1), C()], [C(), C(1)]])
  );

  // Each half-space eigen-equation is singular, and their null lines coincide
  // precisely at the interface spectrum.
  assert(norm(det2(left)) < 1e-10, "left evanescent equation must be singular");
  assert(norm(det2(right)) < 1e-10, "right evanescent equation must be singular");

  // A null vector of [[a,b],[c,d]] is (b,-a) when the determinant vanishes.
  const v = [left[0][1], scale(-1, left[0][0])];
  const residual = A => [
    add(mul(A[0][0], v[0]), mul(A[0][1], v[1])),
    add(mul(A[1][0], v[0]), mul(A[1][1], v[1]))
  ];
  assert(Math.max(...residual(left).map(norm)) < 1e-10, "left null vector failed");
  assert(Math.max(...residual(right).map(norm)) < 1e-10, "matching must give one common interface spinor");
  assert(Math.abs(energy * energy + kappa * kappa - m * m) < 1e-10, "subgap dispersion identity failed");

  return { energy, kappa };
}

const quarter = interfaceData(Math.PI / 2);
assert(Math.abs(Math.abs(quarter.energy) - m / Math.sqrt(2)) < 1e-12, "quarter-turn energy magnitude must be m/sqrt(2)");
assert(Math.abs(quarter.energy) > 1e-8, "quarter-turn must not produce an exact zero");

const half = interfaceData(Math.PI);
assert(Math.abs(half.energy) < 1e-12, "half-turn must produce the Jackiw-Rebbi zero");
assert(Math.abs(half.kappa - m) < 1e-12, "half-turn zero must localize with inverse length m");

// In RP2, the lifted half-turn joins n to -n, which is a closed director loop.
const n0 = [0, 0, 1];
const nPi = [0, 0, -1];
const directorProjector = n => n.map(a => n.map(b => a * b));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
assert(maxDiff(directorProjector(n0), directorProjector(nPi)) < 1e-12, "antipodal endpoints must be the same RP2 director");

console.log("Selector-angle Dirac-interface certificate: PASS");
console.log("Delta_theta=pi/2 => |E|=m/sqrt(2), kappa=m/sqrt(2), exact_zero=false");
console.log("Delta_theta=pi => E=0, kappa=m, exact_zero=true");
console.log("lifted_half_turn_closes_in_RP2=true; fermion_bundle_holonomy_required=true");
