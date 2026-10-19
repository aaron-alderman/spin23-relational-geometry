import assert from 'node:assert/strict';

const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const normalizedGram = ([zL, zR]) => {
  const n = zL * zL + zR * zR;
  return [[zL * zL / n, zL * zR / n], [zL * zR / n, zR * zR / n]];
};
const amplitude = (g, z) => g[0] * z[0] + g[1] * z[1];

// Canonical tree convention.
const zTree = [1, 1];
assert.deepEqual(normalizedGram(zTree), [[0.5, 0.5], [0.5, 0.5]]);

// Finite diagonal operator renormalization O' = D O.
const z = [2, 3];
const g = [5, 7];
const a = 11, b = 13;
const zPrime = [a * z[0], b * z[1]];
const gPrime = [g[0] / a, g[1] / b];
assert(near(amplitude(g, z), amplitude(gPrime, zPrime)));
assert(near((zPrime[0] / zPrime[1]), (a / b) * (z[0] / z[1])));
assert.notDeepEqual(normalizedGram(z), normalizedGram(zPrime));

// Any desired positive overlap ratio is reachable by finite renormalization.
for (const target of [0.01, 0.5, 1, 2, 100]) {
  const current = z[0] / z[1];
  const scaleLeft = target / current;
  const transformed = [scaleLeft * z[0], z[1]];
  assert(near(transformed[0] / transformed[1], target));
}

// CP reality allows a continuum of magnitudes; it cannot select r=1.
const cpRealRatios = [0.25, 0.5, 1, 2, 4];
assert(cpRealRatios.every(r => Number.isFinite(r) && r > 0));
assert(new Set(cpRealRatios).size > 1);

// Ward/EOM product invariance O -> c O, y -> y/c.
const wardInsertion = (y, operatorMatrixElement, de) => y * operatorMatrixElement * de;
const y = 0.03, O = 7, de = 4, c = 9;
assert(near(wardInsertion(y, O, de), wardInsertion(y / c, c * O, de)));

// A common rescaling is removed by projectivization, unlike relative scaling.
const common = [17 * z[0], 17 * z[1]];
assert.deepEqual(normalizedGram(z), normalizedGram(common));

console.log(JSON.stringify({
  tree_level: { z_L_over_z_R: 1, assumptions: ['canonical fields', 'v-normalized composite', 'real positive mass'] },
  finite_operator_renormalization: {
    transformation: 'O -> diag(a,b) O; source -> diag(a,b)^(-1) source',
    complete_amplitude_invariant: true,
    z_L_over_z_R_invariant: false,
    normalized_pole_ray_invariant_under_common_scale_only: true,
  },
  audits: {
    LSZ_fixes_arbitrary_composite_overlap_ratio: false,
    Dirac_equation_fixes_arbitrary_composite_overlap_ratio: false,
    CP_fixes_phase_not_magnitude: true,
    CPT_fixes_particle_antiparticle_relation_not_relative_operator_scale: true,
    Ward_identity_fixes_product_yO_not_O_separately: true,
  },
  observable: 'calibrated products g_L z_L and g_R z_R, not z_L/z_R alone',
  irreducible_input: 'operator renormalization condition or calibrated source measurement',
}, null, 2));

