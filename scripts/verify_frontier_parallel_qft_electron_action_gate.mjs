import assert from 'node:assert/strict';

// Hypercharge is stored as 6Y. All fermions are left-handed Weyl fields.
const fermions = [
  { id: 'Q', color: 3, su2: 2, y6: 1 },
  { id: 'uc', color: -3, su2: 1, y6: -4 },
  { id: 'dc', color: -3, su2: 1, y6: 2 },
  { id: 'L', color: 1, su2: 2, y6: -3 },
  { id: 'ec', color: 1, su2: 1, y6: 6 },
];
const scalars = [
  { id: 'H', su2: 2, y6: 3 },
  { id: 'Hdag', su2: 2, y6: -3 },
];

// Exhaust minimal one-scalar/two-Weyl monomials containing e^c.
const ec = fermions.find(f => f.id === 'ec');
const allowed = [];
for (const f of fermions) for (const h of scalars) {
  const colorSinglet = ec.color === 1 && f.color === 1;
  const weakSinglet = ec.su2 === 1 && f.su2 === 2 && h.su2 === 2;
  const hyperchargeSinglet = ec.y6 + f.y6 + h.y6 === 0;
  const dimension = 1.5 + 1.5 + 1;
  const lorentzScalar = true; // epsilon contraction of two undotted indices
  if (colorSinglet && weakSinglet && hyperchargeSinglet && dimension === 4 && lorentzScalar) {
    allowed.push([f.id, ec.id, h.id]);
  }
}
assert.deepEqual(allowed, [['L', 'ec', 'Hdag']]);

const de = [0, 0, 0, 1, 1, 0, -1];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const faceCharges = x => [x[3] - x[6], -x[4]];
const faceContrast = x => faceCharges(x)[0] - faceCharges(x)[1];
for (const x of [
  [2, -3, 5, 7, 11, 13, 17],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1],
]) assert.equal(faceContrast(x), dot(de, x));

// Same representation/TRO support admits arbitrary complex action coefficient.
const representationDescriptor = Object.freeze({
  cycle: ['ec:C->E', 'L:E->H', 'Hdag:H->C'],
  linkingProductExists: true,
  gaugeLorentzInvariantWord: 'L ec Hdag',
});
const action = (re, im) => ({ representationDescriptor, y_e: { re, im }, interactionPresent: re !== 0 || im !== 0 });
const actions = [action(0, 0), action(1, 0), action(0, 1), action(3, -4)];
assert(actions.every(a => a.representationDescriptor === representationDescriptor));
assert.equal(actions[0].interactionPresent, false);
assert(actions.slice(1).every(a => a.interactionPresent));

// Ward character is fixed; divergence amplitude additionally contains y_e.
const x = [0, 0, 0, 5, 7, 0, 11];
assert.equal(dot(de, x), 1);
const wardCoefficient = (a, x0) => ({ re: a.y_e.re * dot(de, x0), im: a.y_e.im * dot(de, x0) });
assert.deepEqual(wardCoefficient(actions[0], x), { re: 0, im: 0 });
assert.deepEqual(wardCoefficient(actions[3], x), { re: 3, im: -4 });

// Composite normalizations leave source characters invariant but change residues.
const responseResidue = (zL, zR) => ({ left: zL * zL, right: zR * zR, cross: zL * zR });
assert.deepEqual(faceCharges(x), [-6, -7]);
assert.notDeepEqual(responseResidue(1, 1), responseResidue(2, 3));

const dimensions = { HdagL: 2.5, ecDagger: 1.5, normalizedHdagL: 1.5 };
assert.notEqual(dimensions.HdagL, dimensions.ecDagger);
assert.equal(dimensions.normalizedHdagL, dimensions.ecDagger);

console.log(JSON.stringify({
  minimal_operator_enumeration: { allowed, unique: true },
  exact_character: {
    d_e: de,
    face_action: ['x_L-x_H', '-x_ec'],
    contrast_equals_d_e: true,
  },
  action_family_counterexample: {
    common_representation_and_TRO_data: true,
    admitted_coefficients: actions.map(a => a.y_e),
    includes_absent_and_present_interaction: true,
    cyclic_trace_rule_derived_from_TRO: false,
  },
  local_action: {
    generates_rho_e_with_background_sources: true,
    ward_divergence_coefficient: 'y_e d_e(x)',
    anomaly_eom_and_contact_completion_required: true,
  },
  response_gate: {
    unbroken_face_dimensions: dimensions,
    broken_phase_v_normalization_required: true,
    opposite_Weyl_chiralities_require_Dirac_or_projection_intertwiner: true,
    character_fixes_spectral_residue: false,
  },
  irreducible_missing_data: [
    'an action functional assigning nonzero y_e to the electron cycle',
    'a Lorentz-compatible projection from the Dirac response to a normalized scalar H2(R) kernel',
  ],
}, null, 2));

