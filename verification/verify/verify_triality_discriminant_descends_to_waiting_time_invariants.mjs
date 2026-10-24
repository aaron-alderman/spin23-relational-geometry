const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const approx = (a, b, tolerance = 1e-9) => Math.abs(a - b) <= tolerance;

const invariants = delta => {
  assert(delta.reduce((a, b) => a + b, 0) === 0, 'contrast triple must sum to zero');
  const q = delta.reduce((sum, x) => sum + x * x, 0);
  const c = delta[0] * delta[1] * delta[2];
  const vandermonde =
    (delta[0] - delta[1]) *
    (delta[1] - delta[2]) *
    (delta[2] - delta[0]);
  const discriminant = q ** 3 / 2 - 27 * c ** 2;
  return { q, c, vandermonde, discriminant };
};

const cycle = d => [d[1], d[2], d[0]];
const transpose12 = d => [d[1], d[0], d[2]];

const samples = [
  [1, -1, 0],
  [1, 2, -3],
  [2, 3, -5],
  [4, -1, -3],
  [7, -2, -5]
];

for (const delta of samples) {
  const inv = invariants(delta);
  assert(inv.vandermonde ** 2 === inv.discriminant, 'Vandermonde square must equal cubic discriminant');

  const cycled = invariants(cycle(delta));
  assert(cycled.q === inv.q && cycled.c === inv.c, 'quadratic and cubic invariants must survive C3');
  assert(cycled.vandermonde === inv.vandermonde, 'Vandermonde must be even under a three-cycle');

  const reflected = invariants(transpose12(delta));
  assert(reflected.q === inv.q && reflected.c === inv.c, 'symmetric invariants must survive transposition');
  assert(reflected.vandermonde === -inv.vandermonde, 'Vandermonde must be odd under transposition');

  // For M(t)=1/3 sum exp(-delta_i t), derivatives at zero are:
  // M''(0)=q/3 and M'''(0)=-c because sum delta_i^3=3c.
  const M2 = delta.reduce((sum, x) => sum + x * x, 0) / 3;
  const M3 = -delta.reduce((sum, x) => sum + x ** 3, 0) / 3;
  assert(3 * M2 === inv.q, 'second waiting-time derivative must recover q');
  assert(M3 === -inv.c, 'third waiting-time derivative must recover c');

  const reconstructedDiscriminant = 27 * M2 ** 3 / 2 - 27 * M3 ** 2;
  assert(approx(reconstructedDiscriminant, inv.discriminant), 'unlabeled waiting-time derivatives must recover discriminant');
}

const collision = invariants([1, 1, -2]);
assert(collision.vandermonde === 0 && collision.discriminant === 0, 'channel collision must lie on discriminant zero');

const invariantLine = invariants([0, 0, 0]);
assert(invariantLine.q === 0 && invariantLine.c === 0 && invariantLine.vandermonde === 0, 'full orbit collapse must kill contrast invariants');

console.log('Triality discriminant and waiting-time descent certificate: PASS');
console.log('C3_invariants={q=sum(delta_i^2),c=product(delta_i)}; vandermonde_C3_even=true');
console.log('residual_transposition:vandermonde_odd=true; unlabeled_observable=vandermonde_squared');
console.log('discriminant=vandermonde^2=q^3/2-27c^2');
console.log('waiting_derivatives:q=3M2,c=-M3,discriminant=(27/2)M2^3-27M3^2');
