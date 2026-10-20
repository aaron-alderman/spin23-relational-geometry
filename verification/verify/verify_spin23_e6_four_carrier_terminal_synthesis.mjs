import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-four-carrier-terminal-synthesis.json','utf8'));

assert.equal(evidence.schema,'spin23.e6-four-carrier-terminal-synthesis/1');
assert.deepEqual(evidence.claimsIntegrated,[1559,1560,1561,1562]);
assert.equal(evidence.routes['16'].ordinaryJ,false);
assert.equal(evidence.routes['27'].ordinaryJ,false);
assert.equal(evidence.routes['32'].ordinaryJ,true);
assert.equal(evidence.routes['54'].ordinaryJ,true);
assert.equal(evidence.intermediate43.fullE6Representation,false);
assert.equal(evidence.intermediate43.retainsU1PsiCovariance,false);

const p=evidence.e6PositiveResults;
assert.equal(p.h16EmbeddedIn27,true);
assert.deepEqual(p.extraPatiSalamContent,['(6,1,1)','(1,2,2)','(1,1,1)']);
assert.equal(p.chiral27AnomalyGatePassed,true);
assert.equal(p.ordinary54Reality,true);
assert.equal(p.shared351PrimeParentInvariantCoefficient,true);

const o=evidence.e6Obstructions;
assert.equal(o.ordinaryRealityOn27,false);
assert.equal(o.minimal27CubicContainsMajorana126,false);
assert.equal(o.e6EquivariantRank16Projector,false);
assert.equal(o.linearE6Intertwiner27ToBar27,false);
assert.equal(o.exceptionalCubicClosesOnH16,false);
assert.equal(o.sharedParentInvariantImpliesNormalizedLowEnergyWardLine,false);

assert.equal(evidence.decision.claim1559RequiredScopeCorrection,true);
assert.equal(evidence.decision.e6ParentBranchAdmitted,true);
assert.equal(evidence.decision.physicalSpin23LiftComplete,false);

for(const path of [
  'corpus/claims/1500-1599/1559_the_first_joined_physical_lift_attempt_finds_a_family_match_but_requires_a_declared_real_carrier_and_new_parallel_source_law.md',
  'corpus/claims/1500-1599/1560_the_chiral_E6_27_is_a_third_carrier_branch_but_its_cubic_does_not_close_reality_grading_or_the_portal_Ward_line.md',
  'corpus/claims/1500-1599/1561_the_ordinary_real_E6_carrier_repairs_J_and_shares_a_parent_yukawa_ray_but_cannot_isolate_the_oriented_family_or_portal_line.md',
  'corpus/claims/1500-1599/1562_the_four_carrier_counts_split_into_fixed_spectrum_and_parent_enlarged_reality_branches.md'
]) assert.ok(existsSync(path),`missing ${path}`);

console.log('PASS 1563: E6 admits the chiral 27 and ordinary-real 54 carrier routes and supplies one parent invariant coefficient with fixed Clebsch projections, but neither route derives the H16 support projector or normalized threshold-parallel portal Ward line.');
