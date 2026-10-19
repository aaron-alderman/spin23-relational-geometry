import assert from 'node:assert/strict';

const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const det2 = M => M[0][0] * M[1][1] - M[0][1] * M[1][0];
const trace2 = M => M[0][0] + M[1][1];
const mul2 = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));

function helicityResidue(E, m, h) {
  assert(E >= m && m > 0 && (h === 1 || h === -1));
  const k = Math.sqrt(E * E - m * m);
  return [
    [(E - h * k) / (2 * E), m / (2 * E)],
    [m / (2 * E), (E + h * k) / (2 * E)],
  ];
}

for (const E of [1, 1.25, 2, 10]) for (const h of [-1, 1]) {
  const R = helicityResidue(E, 1, h);
  assert(near(trace2(R), 1));
  assert(near(det2(R), 0));
  const R2 = mul2(R, R);
  assert(R.every((row, i) => row.every((x, j) => near(x, R2[i][j]))));
  assert(R[0][0] >= 0 && R[1][1] >= 0);
}

const rest = helicityResidue(1, 1, 1);
assert.deepEqual(rest, [[0.5, 0.5], [0.5, 0.5]]);

const E = 5, m = 1, k = Math.sqrt(E * E - m * m);
const Rp = helicityResidue(E, m, 1);
const Rm = helicityResidue(E, m, -1);
const unpolarized = Rp.map((row, i) => row.map((x, j) => (x + Rm[i][j]) / 2));
assert(near(unpolarized[0][0], 0.5));
assert(near(unpolarized[1][1], 0.5));
assert(near(unpolarized[0][1], m / (2 * E)));
assert(near(det2(unpolarized), (1 - m * m / (E * E)) / 4));

const asymmetry = Rp[1][1] - Rp[0][0];
const coherence = 2 * Rp[0][1];
assert(near(asymmetry, k / E));
assert(near(coherence, m / E));
assert(near(asymmetry * asymmetry + coherence * coherence, 1));

// General real Kallen-Lehmann block positivity check.
const spectralBlock = (s, rhoL, rhoR, rhoM) => [[Math.sqrt(s) * rhoL, rhoM], [rhoM, Math.sqrt(s) * rhoR]];
const good = spectralBlock(9, 2, 3, 4);
assert(good[0][0] >= 0 && good[1][1] >= 0 && det2(good) >= 0);
const boundary = spectralBlock(9, 2, 3, Math.sqrt(54));
assert(near(det2(boundary), 0));

// A local polynomial contact has zero isolated pole residue.
const contact = s => 7 + 3 * s + 2 * s * s;
const poleResidueOfContact = s0 => (s => (s - s0) * contact(s))(s0);
assert.equal(poleResidueOfContact(m * m), 0);

// Common overlap scaling cancels after trace normalization; relative scaling does not.
const normalizedGram = (zL, zR) => {
  const n = zL * zL + zR * zR;
  return [[zL * zL / n, zL * zR / n], [zL * zR / n, zR * zR / n]];
};
assert.deepEqual(normalizedGram(1, 1), normalizedGram(7, 7));
assert.notDeepEqual(normalizedGram(1, 1), normalizedGram(2, 1));

const wrongChirality = (1 - k / E) / 2;
assert(near(wrongChirality, Rp[0][0]));

console.log(JSON.stringify({
  normalized_helicity_residue: {
    formula: '[[E-hk,m],[m,E+hk]]/(2E)',
    trace: 1,
    determinant: 0,
    positive: true,
    projector: true,
  },
  rest_residue: rest,
  unpolarized_example_E5_m1: unpolarized,
  exact_relations: {
    chirality_asymmetry: 'h k/E',
    chiral_coherence: 'm/E',
    purity_circle: 'A_h^2+C_h^2=1',
  },
  contact_separation: { local_polynomial_pole_residue: 0 },
  normalization_boundary: {
    common_overlap_scale_cancels: true,
    relative_overlap_ratio_cancels: false,
    missing_interacting_datum: 'z_L/z_R',
  },
  classification: 'canonical positive pole; conditional spin/CP/composite-residue realization',
}, null, 2));

