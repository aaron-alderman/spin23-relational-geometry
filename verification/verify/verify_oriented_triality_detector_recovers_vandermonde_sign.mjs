const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const approx = (a, b, tolerance = 1e-10) => Math.abs(a - b) <= tolerance;

const toContrasts = (u, v) => [
  u / Math.sqrt(2) + v / Math.sqrt(6),
  -u / Math.sqrt(2) + v / Math.sqrt(6),
  -2 * v / Math.sqrt(6)
];
const vandermonde = d =>
  (d[0] - d[1]) * (d[1] - d[2]) * (d[2] - d[0]);
const orientedCubic = (u, v) => u * (u * u - 3 * v * v) / Math.sqrt(2);
const q = d => d.reduce((sum, x) => sum + x * x, 0);
const c = d => d[0] * d[1] * d[2];

for (const [u, v] of [[1, 0], [0.5, 1.25], [-2, 0.75], [3, -1]]) {
  const d = toContrasts(u, v);
  assert(approx(d.reduce((a, b) => a + b, 0), 0), 'contrast coordinates must sum to zero');
  assert(approx(vandermonde(d), orientedCubic(u, v)), 'two-face cubic must equal Vandermonde');

  const reflected = toContrasts(-u, v);
  assert(approx(q(reflected), q(d)), 'reflection must preserve quadratic invariant');
  assert(approx(c(reflected), c(d)), 'selected sheet reflection must preserve symmetric cubic');
  assert(approx(vandermonde(reflected), -vandermonde(d)), 'orientation reversal must flip Vandermonde sign');
}

// A 120-degree rotation in the contrast plane preserves the cubic.
const rotate120 = ([u, v]) => [
  -0.5 * u - Math.sqrt(3) * v / 2,
  Math.sqrt(3) * u / 2 - 0.5 * v
];
for (const point of [[1, 0.2], [-0.3, 1.7]]) {
  const rotated = rotate120(point);
  assert(approx(orientedCubic(...rotated), orientedCubic(...point)), 'C3 rotation must preserve oriented cubic');
}

console.log('Oriented triality detector certificate: PASS');
console.log('contrast_faces={u=(d1-d2)/sqrt2,v=(d1+d2-2d3)/sqrt6}');
console.log('vandermonde=u(u^2-3v^2)/sqrt2=Re[(u+iv)^3]/sqrt2');
console.log('orientation_reversal:u_to_minus_u flips_vandermonde_and_preserves_symmetric_invariants');
