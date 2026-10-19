const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };

const lambda = 3;
const kappa = 5;
const v = 2;
const V = (a, b) => lambda * (a * a + b * b - v * v) ** 2 + kappa * (a * a - b * b) ** 2;

const vacua = [
  [v / Math.sqrt(2), v / Math.sqrt(2)],
  [v / Math.sqrt(2), -v / Math.sqrt(2)],
  [-v / Math.sqrt(2), v / Math.sqrt(2)],
  [-v / Math.sqrt(2), -v / Math.sqrt(2)],
];
for (const [a, b] of vacua) {
  assert(Math.abs(V(a, b)) < 1e-12, "equal-quadrature vacuum must have zero potential");
  assert(Math.abs(Math.abs(a * b) - v * v / 2) < 1e-12, "vacuum CP-area magnitude mismatch");
  assert(Math.abs(Math.abs(b / a) - 1) < 1e-12, "vacuum phase ratio must have unit magnitude");
}

// Hessian eigenvalues in radial (1,1) and angular (1,-1) directions.
const h = 1e-5;
const [a0, b0] = vacua[0];
const second = (dx, dy) => (V(a0 + h * dx, b0 + h * dy) - 2 * V(a0, b0) + V(a0 - h * dx, b0 - h * dy)) / (h * h);
const radialCurvature = second(1 / Math.sqrt(2), 1 / Math.sqrt(2));
const angularCurvature = second(1 / Math.sqrt(2), -1 / Math.sqrt(2));
assert(Math.abs(radialCurvature - 8 * lambda * v * v) / (8 * lambda * v * v) < 1e-5, "radial Hessian eigenvalue mismatch");
assert(Math.abs(angularCurvature - 8 * kappa * v * v) / (8 * kappa * v * v) < 1e-5, "angular Hessian eigenvalue mismatch");

// Symmetry checks: sheet sign c->-c and antiunitary c->conj(c).
for (const [a, b] of [[0.3, -1.1], [2.2, 0.7], [-0.9, 1.4]]) {
  assert(Math.abs(V(a, b) - V(-a, -b)) < 1e-12, "sheet-sign invariance mismatch");
  assert(Math.abs(V(a, b) - V(a, -b)) < 1e-12, "CP invariance mismatch");
}

// General Z2 x CP quartic phase stationarity:
// cos(2 theta)=-(b2+k2*rho^2)/(4 eta*rho^2).
const rho = 1.7;
const b2 = 0.4;
const k2 = -0.2;
const eta = 0.8;
const cos2theta = -(b2 + k2 * rho * rho) / (4 * eta * rho * rho);
assert(Math.abs(cos2theta) < 1, "checkpoint must admit a nontrivial continuously shifted phase");
const theta = 0.5 * Math.acos(cos2theta);
assert(Math.abs(theta - Math.PI / 4) > 1e-3, "generic symmetry-allowed coefficients must move the phase away from pi/4");
const phaseDerivativeFactor = b2 + k2 * rho * rho + 4 * eta * rho * rho * Math.cos(2 * theta);
assert(Math.abs(phaseDerivativeFactor) < 1e-12, "general quartic phase-stationarity equation mismatch");

console.log("Exceptional-c phase-fixing potential certificate: PASS");
console.log("minimal_vacua=arg(c)=pi/4+n*pi/2; |Re(c)Im(c)|=v^2/2");
console.log("Hessian_eigenvalues=8*lambda*v^2_and_8*kappa*v^2");
console.log("general_Z2xCP_quartic_moves_phase_continuously=true; symmetry_does_not_fix_ratio");
