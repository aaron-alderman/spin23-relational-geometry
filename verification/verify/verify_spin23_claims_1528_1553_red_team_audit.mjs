import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const load=path=>JSON.parse(readFileSync(path,'utf8'));
const audit=load('evidence/data/spin23-claims-1528-1553-red-team-audit.json');
assert.equal(audit.schema,'spin23.claims-1528-1553-red-team-audit/1');

const expectedIds=[1528,1529,1530,1531,1532,1533,1534,1535,1536,1537,1538,1539,
  1540,1542,1543,1544,1546,1547,1548,1549,1550,1551,1552,1553];
assert.deepEqual(audit.scope.presentClaimIds,expectedIds);
assert.deepEqual(audit.scope.unusedNumberingSlots,[1541,1545]);
assert.equal(audit.scope.presentClaimCount,24);
assert.equal(audit.verifierInventory.length,24);

const claimDir='corpus/claims/1500-1599';
const claimNames=readdirSync(claimDir);
const claimPath=new Map();
for(const id of expectedIds){
  const matches=claimNames.filter(name=>name.startsWith(`${id}_`)&&name.endsWith('.md'));
  assert.equal(matches.length,1,`claim ${id} must have exactly one file`);
  claimPath.set(id,resolve(claimDir,matches[0]));
}

// Every claim has exactly one primary verifier link, and every local Markdown
// link and reproduction target resolves.
let brokenLinks=0,missingReproductionTargets=0;
for(const item of audit.verifierInventory){
  assert.ok(expectedIds.includes(item.claim));
  assert.ok(existsSync(item.path),`missing verifier ${item.path}`);
  const path=claimPath.get(item.claim);
  const text=readFileSync(path,'utf8');
  const primary=[...text.matchAll(/\.\.\/\.\.\/\.\.\/verification\/verify\/([^\)]+\.mjs)/g)];
  assert.equal(primary.length,1,`claim ${item.claim} primary verifier count`);
  assert.equal(`verification/verify/${primary[0][1]}`,item.path);

  for(const match of text.matchAll(/\]\(([^\)]+)\)/g)){
    const target=match[1];
    if(/^https?:\/\//.test(target)||target.startsWith('#'))continue;
    if(!existsSync(resolve(dirname(path),target)))brokenLinks++;
  }
  for(const match of text.matchAll(/(?:node\s+)?(verification\/(?:verify|prove)\/[^\s`]+\.mjs)/g)){
    if(!existsSync(match[1]))missingReproductionTargets++;
  }
}
assert.equal(brokenLinks,0);
assert.equal(missingReproductionTargets,0);

// Rerun the complete prior certificate set. The claim-1554 verifier is not
// in this list, so the execution graph is finite and nonrecursive.
let passed=0;
for(const item of audit.verifierInventory){
  const run=spawnSync(process.execPath,[item.path],{encoding:'utf8'});
  assert.equal(run.status,0,`${item.path} failed:\n${run.stdout}\n${run.stderr}`);
  passed++;
}
assert.equal(passed,audit.execution.verifiersPassed);
assert.equal(audit.execution.verifiersFailed,0);
assert.equal(audit.execution.brokenLocalMarkdownLinks,brokenLinks);
assert.equal(audit.execution.missingReproductionTargets,missingReproductionTargets);

// Shared finite-geometry ledger.
const h12=load('evidence/data/spin23-six-character-ordinary-correspondence-completion.json');
const repair=load('evidence/data/spin23-six-character-zero-mode-repair-exhaustion.json');
const h16=load('evidence/data/spin23-six-character-sixteen-state-gauge-higgs-mass-audit.json');
assert.equal(h12.hilbertSpace.complexDimension,12);
assert.equal(h12.finiteDiracSupport.allowedEdges.length,10);
assert.equal(h12.finiteDiracSupport.edgeOrbitsUnderJ.length,5);
assert.equal(h12.finiteDiracSpectrum.genericKernelDimensionFullJCompletedSpace,4);
assert.match(repair.minimum.rankLowerBound,/four additional complex Hilbert dimensions/);
assert.equal(h16.addedStates.length,4);
assert.equal(h16.massGapAndParity.completeAllowedEdgeCount,14);
assert.equal(h16.jEdgeOrbitAudit.length,7);
assert.equal(h16.massGapAndParity.unitWeightDiracDeterminant,1);

// Central gauge kernel, perturbative anomalies and Higgs/link ranks.
const anomaly12=load('evidence/data/spin23-six-character-gauge-kernel-unimodularity-anomalies.json');
const links12=load('evidence/data/spin23-six-character-anomaly-free-higgs-link-audit.json');
assert.equal(anomaly12.centralGaugeAction.incidenceRank,5);
assert.equal(anomaly12.maximalSimultaneousAnomalyFreeSubspace.effectiveDimension,2);
assert.equal(h16.gaugeKernelAndUnimodularity.chargeMatrixRank,5);
assert.equal(h16.maximalAnomalyFreeSubalgebra.effectiveDimension,2);
assert.equal(h16.maximalAnomalyFreeSubalgebra.comparisonToTwelveStateResult.oldPlaneSurvivesOnlyInDimension,1);
assert.equal(links12.bareInvariantOrbitCount,0);
assert.equal(links12.chargedLinkRequiredOrbitCount,5);
assert.equal(links12.linkChargeLattice.rank,2);
assert.match(links12.compatibilityDecision.massGapOnExactTwelveStateSupport,/UNSAT/);
assert.equal(h16.bareInvariantOrbitCount,1);
assert.equal(h16.chargedLinkRequiredOrbitCount,6);
assert.equal(h16.linkChargeLattice.rank,2);
assert.equal(h16.massGapAndParity.genericFullRank,true);

// Potential, selector and weighted-chamber cross-checks.
const potential=load('evidence/data/spin23-six-link-renormalizable-potential-vacuum-audit.json');
const selector=load('evidence/data/spin23-anchor-projector-positive-action-selection.json');
const chamber=load('evidence/data/spin23-anchor-cut-weighted-robustness.json');
assert.equal(potential.renormalizableEnumeration.phaseSensitiveClassesByDegree['2'],7);
assert.equal(potential.renormalizableEnumeration.phaseSensitiveClassesByDegree['4'],76);
assert.equal(potential.stableVacuumWitness.openStableVacuumStatement.includes('all-nonzero vacuum'),true);
assert.deepEqual(selector.sixteenStateSectorRepair.cutMinimizers,['AB','DG','FH']);
assert.equal(chamber.H12.irredundantFacetCount,6);
assert.equal(chamber.H16.irredundantFacetCount,6);
assert.match(chamber.H16.unitPoint,/y=u=v/);
assert.equal(chamber.potentialAndChargeAudit.enforcedByRenormalizablePotential,false);
assert.equal(chamber.decision.newOrderingLawNeededForPrediction,true);

// Exact Feshbach versus projected-resolvent and strict-grading distinctions.
const feshbach=load('evidence/data/spin23-sixteen-state-five-role-feshbach-resolvent.json');
const leaves=load('evidence/data/spin23-five-chain-minimal-auxiliary-feshbach-topology.json');
assert.deepEqual(feshbach.feshbach.inducedDiagonals,{I:'0',P:'0',N:'0',Z:'alpha',X:'beta'});
assert.equal(feshbach.forbiddenSupportAndCofactor.effectiveOperatorSelectedCofactorPP,'zero identically because deleting P isolates a zero-diagonal I row');
assert.equal(feshbach.forbiddenSupportAndCofactor.intervalProtectedResolventZero,false);
assert.equal(feshbach.massAndSupportDecision.noNonzeroEdgeRelationProtectsINOnInterval,true);
assert.equal(leaves.unconstrainedMassiveScalarAuxiliaries.twoAuxiliaries.necessaryForIndependentDiagonalOnlySelfEnergies,true);
assert.equal(leaves.intervalAndEFTDecision.supportStability.includes('for every z'),true);
assert.match(leaves.intervalAndEFTDecision.constantTextureStatus,/low-energy EFT/);
assert.match(leaves.strictGradingRelationAudit.allSizeResult,/UNSAT at zero energy/);

// Portal flow and one-generator closure remain conditional rather than a
// physical Pati-Salam result.
const rg=load('evidence/data/spin23-common-coefficient-line-rg-invariance.json');
const oneGenerator=load('evidence/data/spin23-one-generator-selector-unification-no-go.json');
assert.equal(rg.decision.treeLevelCommonSymbolSufficient,false);
assert.match(rg.decision.physicalPatiSalamStatus,/underdetermined/);
assert.equal(oneGenerator.composableShift.generatedAlgebra,'M_3(C)');
assert.deepEqual(oneGenerator.composableShift.forbiddenSupport,['I-to-N','N-to-I after star closure']);

// Presentation repairs are asserted so malformed formulas cannot silently
// return while the underlying semantic evidence stays unchanged.
const text=id=>readFileSync(claimPath.get(id),'utf8');
assert.match(text(1530),/s_1=0,\\qquad s_2=/);
assert.match(text(1547),/PN-IN-IP-TP-SP,\\qquad TP-TU,\\qquad SP-SI,\\qquad TU-NU/);
assert.doesNotMatch(text(1551),/,qquad/);
assert.match(text(1552),/u=a\\,s\+b\\,t/);
assert.doesNotMatch(text(1552),/u=a,s\+b,t/);
assert.doesNotMatch(text(1553),/,qquad/);
assert.equal(audit.semanticCorrections,0);
assert.equal(audit.decision.internalAlgebraGraphAnomalySchurConsistency,'PASS');
assert.equal(audit.decision.materialOverclaimFound,false);

console.log('PASS 1554: all 24 present claims in 1528-1553 rerun; links and cross-claim finite-geometry, anomaly, Higgs, selector, Schur, EFT and scope boundaries agree. Five files received presentation-only math repairs; no semantic theorem correction was required.');
