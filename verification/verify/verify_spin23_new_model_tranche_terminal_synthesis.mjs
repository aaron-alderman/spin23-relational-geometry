import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-new-model-tranche-terminal-synthesis.json','utf8'));

assert.equal(evidence.schema,'spin23.new-model-tranche-terminal-synthesis/1');
assert.deepEqual(evidence.claimRange,[1528,1555]);
assert.equal(evidence.redTeam.primaryVerifiersPassed,24);
assert.equal(evidence.redTeam.primaryVerifiersFailed,0);
assert.equal(evidence.redTeam.semanticCorrections,0);
assert.equal(evidence.redTeam.materialOverclaimFound,false);

const p=evidence.portalLawBranch;
assert.equal(p.genuineWardSymmetryInSourcedPatiSalam,false);
assert.equal(p.genericRgInvariant,false);
assert.equal(p.finiteFixedPatiSalamEnlargementSufficient,false);
assert.equal(p.literalExchangeInAuditedCompactParents,false);
assert.equal(p.universalShared126PreservesSectorNullMask,false);
assert.equal(p.breakingProjectorsSelectSupport,true);
assert.equal(p.breakingProjectorsSelectCommonCoefficientRay,false);
assert.equal(p.majoranaAnchorContainsPartialIsometryLine,true);
assert.equal(p.canonicalNormalizedTransporterDerived,false);

const c=evidence.correspondenceBranch;
assert.equal(c.sixCharacterRealEvenGeometry,true);
assert.equal(c.twelveStateGenericZeroModes,4);
assert.equal(c.minimumAddedJCompletedDimensions,4);
assert.equal(c.sixteenStateUnitDeterminant,1);
assert.equal(c.maximalPerturbativeAnomalyFreeCentralDimension,2);
assert.equal(c.stableAllLinkFullRankVacuum,true);
assert.equal(c.physicalPatiSalamDescent,false);
assert.equal(c.strictLinearQuotientToFiveRoles,false);
assert.equal(c.degreeTwoSelectedReturnCandidate,true);
assert.equal(c.selectedCornerCanonicalFromDeclaredAlgebra,false);
assert.equal(c.anchorCutHasOpenUniqueSelectionChamber,true);
assert.equal(c.stableVacuumEnforcesSelectionChamber,false);
assert.equal(c.projectedResolventIntervalProtection,false);
assert.equal(c.strictOddAuxiliaryZeroEnergyEndpointMass,false);

const s=evidence.selectorConvergence;
assert.equal(s.minimalSafeAlgebra,'C^8 direct-sum M_2(C)');
assert.equal(s.transporterAndReturnCornerCompatible,true);
assert.equal(s.transporterDerivesReturnCorner,false);
assert.equal(s.returnCornerDerivesTransporter,false);
assert.equal(s.portalCoefficientDimension,2);
assert.equal(s.singleComposableGeneratorDerivesBoth,true);
assert.equal(s.singleGeneratorClosure,'M_3(C)');
assert.equal(s.singleGeneratorForbiddenComposite,'I-to-N');
assert.equal(s.safeTypedAlternativeUnifiesSelectors,false);

assert.equal(evidence.spin23Status.derivesPortalWardLaw,false);
assert.equal(evidence.spin23Status.derivesSelectedReturnCorner,false);
assert.equal(evidence.spin23Status.derivesPhysicalPatiSalamLift,false);
assert.equal(evidence.currentInputDecision.sourcedMinimalCarrierPhysicalAdmission,false);
assert.equal(evidence.currentInputDecision.conditionalLabelModelInternallyConsistent,true);
assert.equal(evidence.currentInputDecision.conditionalLabelModelPhysicallyComplete,false);
assert.ok(evidence.currentInputDecision.nextReopeningPackage.length>=6);

const claimFiles=readdirSync('corpus/claims/1500-1599');
for(const id of [...evidence.presentClaimsBeforeSynthesis,1555]){
  assert.ok(claimFiles.some(name=>name.startsWith(`${id}_`)),`missing claim ${id}`);
}
for(const path of [
  'evidence/data/spin23-claims-1528-1553-red-team-audit.json',
  'evidence/data/spin23-minimal-oriented-correspondence-algebra.json',
  'evidence/data/spin23-one-generator-selector-unification-no-go.json',
  'evidence/data/spin23-anchor-cut-weighted-robustness.json'
]) assert.ok(existsSync(path),`missing ${path}`);

console.log('PASS 1555: the new-model tranche converges on one internally consistent but physically unlifted oriented-correspondence model; all shorter portal-exchange, ordinary-descent, strict-auxiliary and one-generator selector routes are closed in their declared classes.');
