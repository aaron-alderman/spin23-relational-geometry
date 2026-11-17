import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const sources={
 inventory:'corpus/claims/1400-1499/1464_no_existing_named_platform_contains_the_generator_state_port_and_sector_packet_needed_for_a11.md',
 protocol:'corpus/claims/1400-1499/1452_the_scheme_invariant_a11_experiment_is_a_calibrated_spectral_pole_and_band_contrast_with_a_device_prediction_gate.md',
 stressAction:'corpus/claims/1200-1299/1232_the_candidate_action_has_a_conditional_classical_stress_tensor_but_a7_stops_at_improvement_contacts_and_physical_probe_normalization.md',
 e8Metric:'corpus/programmes/translation-free-exceptional-topology/E8_CONSTITUTIVE_METRIC_GATE.md',
 e8Hardware:'corpus/programmes/translation-free-exceptional-topology/E8_FEW_BODY_CLOCK_GAP.md',
 backplane:'corpus/programmes/translation-free-exceptional-topology/QUASICRYSTAL_BACKPLANE_BRIDGE.md',
 manifest:'corpus/programmes/frontier/wave-7/frontier_wave7_224_leech_gram_first_network_manifest.md',
 twin:'corpus/programmes/frontier/wave-7/frontier_wave7_225_leech_24port_commissioning_digital_twin.md',
 radiative:'corpus/claims/1600-1699/1612_a_radiative_selector_portal_joins_spin23_planck_and_yang_mills_scales_but_retains_one_color_boundary.md',
 coverage:'corpus/programmes/admissibility/admissibility_58_casimir_spectral_coverage_and_distance_gate.md',
 conditionalForce:'evidence/data/selector-flux-optical-casimir-polder-bridge-v1.json'
};
const candidates=[
 {id:'named-josephson-ac-fluxonium',sources:[sources.protocol,sources.inventory],
  available:'Physical superconducting charge convention, circuit Hamiltonians, energy parameters and interference/spectroscopy precedents. Parameters are measured or fitted, not selector predictions.',
  missing:'Selector-to-device intertwiner, normalized free-space field/dipole map, complete relevant electromagnetic scattering response, fixed Casimir geometry and same-device no-refit optical/force packet.',
  completeSelectorOpticalForcePacket:false},
 {id:'e8-clock-and-quasicrystal',sources:[sources.e8Hardware,sources.backplane,sources.e8Metric],
  available:'Relative integral mixer, finite-qudit couplers, gap and proposed calibrated backplane protocol.',
  missing:'Native charged material couplers, absolute constitutive energies, physical dipole/source identification and device electromagnetic layout.',
  completeSelectorOpticalForcePacket:false},
 {id:'leech-ideal-component-manifest',sources:[sources.manifest,sources.twin],
  available:'Exact relative capacitance/transformer coefficients, declared ports and synthetic held-out commissioning.',
  missing:'Global capacitance scale is explicitly chosen; no planar electromagnetic layout, fabricated device, source-derived selector coupling or Casimir boundary response.',
  completeSelectorOpticalForcePacket:false},
 {id:'typed-selector-field-action',sources:[sources.stressAction],
  available:'Gauge/scalar/projector action and conditional classical stress tensor.',
  missing:'Physical boundary probes, finite contacts/improvements and named device action with dimensionful matching.',
  completeSelectorOpticalForcePacket:false},
 {id:'radiative-shared-scale-portal',sources:[sources.radiative],
  available:'Conditional scale relations from one symmetry-breaking vev.',
  missing:'Absolute transmutation scale and boundary couplings remain inputs; no optical device, charge-lever-arm map or Casimir scattering geometry.',
  completeSelectorOpticalForcePacket:false}
];
assert.equal(candidates.some(x=>x.completeSelectorOpticalForcePacket),false);

// A normalization ambiguity at the level of the existing dimensionless model.
// These are parameter embeddings, not certified fabricated devices.
const embeddings=[{energyScale:1,lengthScale:1},{energyScale:2,lengthScale:2}].map(x=>({
 ...x,chargeScale:1,relativeOpticalFrequency:x.energyScale,
 relativeDipoleSquared:x.lengthScale**2,
 relativePolarizabilityScale:x.lengthScale**2/x.energyScale,
 relativeRetardedForceAtFixedExternalSeparation:x.lengthScale**2/x.energyScale,
 relativeABFluxPeriod:1
}));
assert.equal(embeddings[1].relativeRetardedForceAtFixedExternalSeparation,2);
const report={
 schemaVersion:'selector-device-physical-scale-audit-v1',date:'2026-11-08',
 authority:'Bounded local-corpus inventory with primary-source cross-checks, not an exhaustive claim about all existing devices or a new physical admission.',
 sources:Object.fromEntries([...Object.values(sources),'scripts/audit-selector-device-physical-scales.mjs'].map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')])),
 conclusion:'No complete selector-coupled named device action was found that fixes the physical normalization and predicts both flux-dependent spectroscopy and Casimir force without a separate response fit.',
 candidates,
 primaryCrossChecks:[
  {url:'https://arxiv.org/html/1104.3999',role:'Pop chain action and phase-slip mechanism',finding:'A circuit action separates phase-slip amplitudes from charge-induced phases. It is a genuine device precedent, not a microscopic Spin(2,3) coupling.'},
  {url:'https://arxiv.org/html/2404.02989',role:'Fluxonium Hamiltonian and array corrections',finding:'EJ, EC and EL are extracted from spectroscopy; the full capacitance matrix enters charge phases. Their values are not determined by the selector.'},
  {url:'https://arxiv.org/html/2601.06682',role:'Named 2026 hybrid charge interference device already cited by the corpus',finding:'A physical two-state Hamiltonian has measured flux slopes and fitted phase-slip rates; inductive readout and poisoning are described. No selector action or complete optical/Casimir packet is supplied.'}
 ],
 closestConcreteDevice:{
  name:'Dunstan et al. hybrid charge quantum interference device',
  source:sources.protocol,primary:'https://arxiv.org/html/2601.06682',
  Hamiltonian:'H=-(epsilon(Phi) sigma_z+E_S(Q) sigma_x)/2 in an instantaneously rephased energy model; epsilon=2 I_p DeltaPhi.',
  phaseSlipMagnitude:'E_S(Q)=h |nu1+nu2 exp(i pi Q/e)| with physical island charge Q. This uses the physical 2e period; do not use exp(i 2pi Q) with dimensionful Q.',
  fittedValues:{persistentCurrentNanoAmpere:11.5,phaseSlipRatesGHz:[1.48,1.08]},
  scope:'These values anchor that device spectrum. They must not be assigned to the E8 charge model or the four-site fixture.',
  opticalSourceGap:'Transition frequencies alone do not determine source strengths. Differentiating a bias-dependent rephased Hamiltonian requires the corresponding source/basis connection; replacing a complex tunneling amplitude by its modulus and then attaching a dipole loses information.',
  forceGap:'An inductive microwave readout operator is not the complete electric/magnetic free-space scattering response of the patterned chip.'
 },
 conditionalSourceMatching:{
  authority:'Diagnostic algebra for a capacitively driven circuit, not an identified selector-device action.',
  chargingTerm:'H_C=4 EC (n-ng(E))^2, EC=e^2/(2 C_Sigma), ng(E)=ng0+kappa_E E.',
  physicalDipole:'d=-partial_E H_C=8 EC kappa_E (n-ng), assuming this is the only field-dependent term.',
  physicalContact:'partial_E^2 H_C=8 EC kappa_E^2.',
  leverArm:'If Vg=ell_eff E and ng=Cg Vg/(2e), then kappa_E=Cg ell_eff/(2e). Geometry, screening and the actual Maxwell field determine ell_eff.',
  conclusion:'Knowing 2e and EC is insufficient to fix d; the same action and physical field map must determine kappa_E and contacts.'
 },
 scaleFreedom:{
  definitions:'H_phys=E_star Hbar; D_phys=q a dbar; alphaScale=q^2 a^2/E_star. For the prior retarded parallel dipole-plane model, F=-hbar c alpha_x(0)/(8 pi^2 eps0 L^5).',
  embeddings,
  interpretation:'The same dimensionless Hamiltonian, dipole ratios and AB period admit different physical frequency, residue and force scales. A quantized charge or a relative integral metric cannot remove the independent energy/length matching.',
  limitation:'Both embeddings are normalization counterfamilies; no claim that all such embeddings are realizable by a particular microscopic circuit.'
 },
 acquisitionContract:[
  'Name one device and freeze its circuit/netlist, dimensions, constituent electromagnetic response and calibrated flux/charge controls.',
  'Derive or independently identify the selector action on its physical modes; distinguish an engineered emulator from a selector-specific microscopic prediction.',
  'Fix C, L, EJ and disorder from independent characterization or a declared training set; retain covariance and freeze them before held-out scoring.',
  'Compute the physical field source vertices and contacts, including electric and magnetic form factors and relevant high-frequency completion.',
  'Specify preparation, temperature, baths, opposing body, separation and geometry; predict unseen flux-dependent transitions and force with no force-data refit.'
 ],
 noRefitMeaning:'Independent device calibration is allowed. It is distinct from deriving parameters from the selector, and from refitting material response separately to force data. The corpus currently lacks the joined packet needed for the stronger selector-specific prediction.',
 reproduction:'node scripts/audit-selector-device-physical-scales.mjs',
 verificationCommands:[
  'node verification/verify/verify_spin23_a11_named_platform_packet_inventory.mjs',
  'node verification/verify/verify_spin23_radiative_selector_portal_construction.mjs',
  'node verification/verify/verify_leech_gram_first_network_manifest.mjs'
 ]
};
const out='evidence/data/selector-device-physical-scale-audit-v1.json';
fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output:out,conclusion:report.conclusion,candidates:candidates.map(x=>({id:x.id,complete:x.completeSelectorOpticalForcePacket})),scaleEmbeddings:embeddings},null,2));
