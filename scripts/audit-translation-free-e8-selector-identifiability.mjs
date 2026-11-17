import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {dipoleMatrix,eigenSymmetric} from './lib/e8-charge-dipole.mjs';

const paths={
 dictionary:'evidence/data/translation-free-e8-local-charge-dictionary-r13-shell14-direct-v1.json',
 locking:'corpus/claims/0200-0299/253_positive_exchange_diagonal_locking_leaves_exactly_h2r.md',
 metric:'corpus/programmes/translation-free-exceptional-topology/E8_CONSTITUTIVE_METRIC_GATE.md',
 metricPerturbation:'corpus/programmes/translation-free-exceptional-topology/E8_KINETIC_METRIC_PERTURBATION.md',
 amplitudePerturbation:'corpus/programmes/translation-free-exceptional-topology/E8_CHANNEL_AMPLITUDE_PERTURBATION.md',
 pulses:'corpus/claims/0800-0899/858_positive_quadratic_hamiltonian_pulses_generate_the_exact_bilocal_selector_without_finite_dimensional_instability.md',
 localAction:'corpus/claims/0900-0999/936_two_positive_rank_one_edge_pulses_are_the_minimal_local_action_for_the_two_face_selector_cycle.md',
 source:'corpus/claims/0800-0899/837_oriented_color_intertwines_exactly_at_transfer_level_but_not_as_an_ordinary_scattering_or_four_atom_action.md',
 normalization:'corpus/claims/0800-0899/850_rescaling_naturality_classifies_linear_stress_to_symplectic_maps_but_leaves_one_relative_normalization_free.md',
 hodge:'corpus/claims/0800-0899/875_the_color_laplacian_factor_three_is_canonical_hodge_data_but_the_selector_equation_and_index_two_saturation_are_additional_physics.md',
 maxwell:'corpus/programmes/rdg-maxwell-bridge/04_sources_resonance_and_material_memory_gate.md'
};
const dictionary=JSON.parse(fs.readFileSync(paths.dictionary));
const positions=Array.from({length:8},(_,i)=>i-3.5);
const D=dipoleMatrix(dictionary.projectedChargeMatrices,positions);
const gaps=dictionary.levels.map(x=>x.energy-dictionary.levels[0].energy);
const parities=dictionary.parities,first=1,delta=gaps[first],eta=.2,zeta=.2;
assert.equal(parities[0],1);assert.equal(parities[first],-1);
const odd=parities.map((p,j)=>p===-1?j:-1).filter(j=>j>first);
const A=gaps.map(x=>x/delta);
const Dchanged=D.map((row,a)=>row.map((x,b)=>x*(1+zeta*(A[a]+A[b])/2)));
const norm=matrix=>Math.sqrt(matrix.flat().reduce((s,x)=>s+x*x,0));
const block=(matrix,a,b)=>matrix.map((row,i)=>row.map((x,j)=>parities[i]===a&&parities[j]===b?x:0));
const parityErrors=matrix=>({evenEven:norm(block(matrix,1,1)),oddOdd:norm(block(matrix,-1,-1)),
 hermiticity:Math.max(...matrix.flatMap((row,a)=>row.map((x,b)=>Math.abs(x-matrix[b][a]))))});
const alpha=1/(1+eta),beta=1/(1+zeta/2)**2;
const rows=odd.map(j=>({state:j,originalFrequencyRatio:A[j],
 changedCalibratedFrequencyRatio:A[j]*(1+eta*A[j])/(1+eta),
 frequencyRelativeChange:(1+eta*A[j])/(1+eta)-1,
 originalStrengthRatio:D[j][0]**2/D[first][0]**2,
 changedCalibratedStrengthRatio:Dchanged[j][0]**2*beta/D[first][0]**2,
 strengthRelativeChange:Dchanged[j][0]**2*beta/D[j][0]**2-1}));
assert.ok(Math.abs(alpha*(delta+eta*delta**2/delta)/delta-1)<1e-14);
assert.ok(Math.abs(beta*Dchanged[first][0]**2/D[first][0]**2-1)<1e-14);

// A different real-space electrode/site placement with the same charge matrices.
// Coordinates are relative to the same compensating-charge reference at x=0.
const alternativePositions=positions.map((x,i)=>x+(i===3?.2:0));
const Dgeometry=dipoleMatrix(dictionary.projectedChargeMatrices,alternativePositions);
const geometryGain=D[first][0]**2/Dgeometry[first][0]**2;
const geometryRows=odd.map(j=>({state:j,relativeStrengthChange:geometryGain*Dgeometry[j][0]**2/D[j][0]**2-1}));

// Exact locking Hessian from corpus claim 253, with unit kinetic metric only
// for reporting illustrative oscillator frequencies. No identification with E8.
const survivor=Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>
 i%4<3&&j%4===i%4?.5:0));
const locking=[2,4].map(lambda=>{
 const mu=1,K=[1,1,1,-1];
 const Q=Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>{
  if(i%4!==j%4)return 0;
  return i===j?mu+lambda:-mu-lambda*K[i%4];
 }));
 const values=eigenSymmetric(Q).map(x=>x.value);
 const nullError=Math.max(...Q.flatMap((row,i)=>survivor[0].map((_,j)=>Math.abs(row.reduce((s,x,k)=>s+x*survivor[k][j],0)))));
 assert.ok(nullError<1e-12);assert.equal(values.filter(x=>Math.abs(x)<1e-10).length,3);
 const massive=[Math.sqrt(2*mu),Math.sqrt(2*lambda),...Array(3).fill(Math.sqrt(2*(mu+lambda)))];
 return {mu,lambda,hessianEigenvalues:values,survivorProjectorResidual:nullError,
  massiveFrequencyRatios:massive.map(x=>x/massive[0])};
});
const logExample={
 baseEnergies:[0,2*Math.PI/3,Math.PI],
 otherPositiveEnergies:[0,2*Math.PI/3,3*Math.PI],
 firstGapUnchanged:true,
 higherGapOverFirst:[1.5,4.5],
 endpointError:Math.hypot(Math.cos(Math.PI)-Math.cos(3*Math.PI),Math.sin(Math.PI)-Math.sin(3*Math.PI)),
 scope:'Illustration of positive Hermitian logarithm ambiguity for a fixed finite-order unitary endpoint; not a microscopic E8 Hamiltonian or a proof of a full selector-to-E8 intertwiner.'
};
const report={schemaVersion:'e8-selector-identifiability-audit-v1',date:'2026-11-08',
 sources:Object.fromEntries([...Object.values(paths), 'scripts/audit-translation-free-e8-selector-identifiability.mjs'].map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')])),
 conclusion:'The searched selector, positivity, projector, and source-covariance results do not uniquely determine the constitutive Hamiltonian or physical dipole blocks. The corpus supplies constructive actions and restricted invariant forms, but not a typed selector-to-E8 electromagnetic action fixing their coefficients.',
 lockingCounterfamily:{source:paths.locking,commonSurvivorProjector:survivor,cases:locking,
  scope:'Exact continuum of positive locking actions with the same H2(R) survivor. Unit kinetic metric assumed for the illustrative frequencies; the quadratic Hessian nonuniqueness is independent of that illustration.'},
 logarithmCounterexample:logExample,
 e8ParityCounterfamily:{dictionary:paths.dictionary,eta,zeta,alpha,beta,
  hamiltonian:'H_eta=H+eta*(H-E0)^2/Delta1; eigenvectors and spectral projectors unchanged; nonnegative gaps remain ordered for eta>=0.',
  dipole:'d_zeta=d+(zeta/2){(H-E0)/Delta1,d}; Hermitian and parity-odd, with identical parity-block support.',
  originalParityErrors:parityErrors(D),changedParityErrors:parityErrors(Dchanged),rows,
  maximumFrequencyRelativeChange:Math.max(...rows.map(x=>Math.abs(x.frequencyRelativeChange))),
  maximumStrengthRelativeChange:Math.max(...rows.map(x=>Math.abs(x.strengthRelativeChange))),
  scope:'Counterexample to uniqueness from the known E8 parity/projector constraints, not a claim that the complete order-18 selector acts on these E8 states. H_eta need not retain the supplied quadratic charging ansatz; d_zeta is an admissible covariant operator, not a derived electric dipole. A microscopic action could exclude them, but that exclusion is the missing datum.'},
 chargeGeometryCounterfamily:{positions,alternativePositions,firstLineStrengthGain:geometryGain,rows:geometryRows,
  maximumRelativeStrengthChange:Math.max(...geometryRows.map(x=>Math.abs(x.relativeStrengthChange))),
  scope:'Same projected charge operators and unchanged Hamiltonian, but different physical geometry. Both are charge-dipole candidates until a physical placement/field map is supplied. Not a freedom once that geometry is measured or independently derived.'},
 projectorBlockConstraint:'If Pi d Pi=-d, P_+ d P_+=P_- d P_-=0 and P_- d P_+=(P_+ d P_-)^dagger. This restricts support, not the entries of the allowed cross block.',
 strongerCovarianceStatement:'For any already-defined unitary internal symmetry commuting with H, f(H) also commutes with it; {f(H),d} transforms in the same operator representation as d. This statement does not turn the nonlinear Redheffer action into a unitary symmetry of E8.',
 partialRigidity:{source:paths.hodge,result:'On the C3 augmentation plane the invariant positive metric is fixed up to scale. This constrains one representation metric; it does not identify the E8 charging matrix, the constitutive matching law, or a physical electric dipole.'},
 selectorTypes:{
  warning:'These are distinct corpus constructions. No identification between them is assumed.',
  locking:'Paired neutral response-corner locking selects an H2(R) survivor.',
  order18:'Symplectic transfer selectors induce a nonlinear Redheffer scattering action. This is not automatically a unitary internal symmetry of an E8 charge Hilbert space.',
  e8:'Only the supplied rotor inversion parity and computed spectral projectors are used in the E8 counterfamily.',
  rdg:'The separate Maxwell branch uses a translation/Haar cochain selector; it is a physical comparison, not an established Spin(2,3)-to-E8 dictionary.'
 },
 maxwellComparison:{source:paths.maxwell,
  corpusModel:'P_ext=Pi_1 directsum Pi_2 directsum Pi_1 directsum Pi_1 commutes with the homogeneous field-plus-Lorentz-oscillator generator; the example chooses omega0^2=4 and omegap^2=2.25.',
  derivedFreedom:'Spatially homogeneous positive resonance/coupling constants multiply identity in the spatial indices and commute with the translation selector. With several homogeneous material oscillators this remains true independently for each oscillator.',
  susceptibilityFamily:'chi(omega)=sum_j f_j/(omega_j^2-(omega+i0+)^2), f_j>0, omega_j>0, with consistently extended material-memory selector.',
  conclusion:'Selector compatibility constrains spatial symmetry and closure, not the individual positive pole frequencies and strengths. These must come from a constitutive or microscopic action.',
  scope:'An extension derived from the corpus homogeneous Lorentz equations. No claim that this distinct cochain selector is the order-18 Spin(2,3) selector.'
 },
 conditionalPhysicalAction:{
  authority:'Derived conditional canonical rotor/circuit template, not an identified corpus electromagnetic realization.',
  assumptions:'Dimensionless compact phases theta_i, canonical charges q n_i, positive capacitance C, Josephson/locking energies EJ_i, and a fixed physical field geometry x_i. These are additional inputs. Compact charge quantization requires the appropriate winding/charge measure in a quantum path integral.',
  phaseSpaceLagrangian:'L=hbar n^T theta_dot -(q^2/2)n^T C^{-1}n -sum_i EJ_i(1-cos theta_i) + E q x^T n',
  derivedHamiltonian:'H_0=(q^2/2)n^T C^{-1}n+sum_i EJ_i(1-cos theta_i)',
  derivedDipole:'d=delta L/delta E=q x^T n; d_ab=q sum_i x_i (P_a n_i P_b)',
  legendrePhaseLagrangian:'L_theta=(1/(2q^2))(hbar theta_dot+q x E)^T C(hbar theta_dot+q x E)-sum_i EJ_i(1-cos theta_i)',
  explicitPhaseContact:'delta^2 L_theta/delta E^2=x^T C x at fixed theta; this is one term in the full response, not an added independently adjustable susceptibility.',
  unresolved:'The selector must determine or independently constrain C, EJ_i, the physical charge realization and x, rather than receive them as fitted data. This construction shows how one common action would link H, dipole and contacts once those data are fixed.'
 },
 missingBridge:[
  'An explicit selector representation/intertwiner on the E8 charge Hilbert space, compatible with its physical inner product and charge lattice.',
  'One microscopic or boundary action S[fields,A] whose zero-field dynamics determines the constitutive Hamiltonian, including kinetic and potential coefficients.',
  'The same action must derive J=delta S/delta A and the relevant contact terms, then yield the geometry-normalized dipole blocks P_a d P_b.',
  'Show that after two common calibrations the admissible higher-line frequency and strength ratios are unique, or provide an independently fixed finite-parameter prediction with uncertainty.'
 ],
 scientificBoundary:'Same supplied-model numerical evidence family; no new physical validation, corpus admission, or general impossibility theorem for future selector actions.',
 reproduction:'node scripts/audit-translation-free-e8-selector-identifiability.mjs'
};
const output='evidence/data/translation-free-e8-selector-identifiability-v1.json';
fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({output,locking,parity:report.e8ParityCounterfamily.originalParityErrors,
 maxFrequencyChange:report.e8ParityCounterfamily.maximumFrequencyRelativeChange,
 maxStrengthChange:report.e8ParityCounterfamily.maximumStrengthRelativeChange,
 maxGeometryStrengthChange:report.chargeGeometryCounterfamily.maximumRelativeStrengthChange,rows},null,2));
