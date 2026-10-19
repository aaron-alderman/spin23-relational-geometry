import assert from 'node:assert/strict';

const cases = [
  {
    id: 'A',
    chargedDefectMatter: 'excluded or infinitely heavy',
    localizedCS: 0,
    finiteCarrier: 'exact TQFT factor',
    splitting: 0,
    verdict: 'viable exact effective boundary theory',
  },
  {
    id: 'B',
    chargedDefectMatter: 'massive with gap m>0',
    localizedCS: 'depends on signed mass spectrum; cancels for Real-paired masses',
    finiteCarrier: 'asymptotically protected',
    splitting: 'O(exp(-m L)) from virtual winding',
    verdict: 'viable approximate sector if induced twist is zero',
  },
  {
    id: 'C',
    chargedDefectMatter: 'gapless',
    localizedCS: 'regulator/anomaly dependent',
    finiteCarrier: 'not isolated',
    splitting: 'not exponentially suppressed',
    verdict: 'fails exact finite-carrier claim',
  },
];
assert.equal(cases.length, 3);
assert.equal(cases[0].localizedCS, 0);
assert(cases[1].splitting.includes('exp'));
assert(cases[2].finiteCarrier.includes('not isolated'));

const anomalyFreeBulkForcesGaplessBoundary = false;
assert.equal(anomalyFreeBulkForcesGaplessBoundary, false);

console.log(JSON.stringify({
  cases,
  anomalyFreeBulkForcesGaplessBoundary,
  reason: 'The continuous U(1) extension is anomaly-free with three right-handed neutrinos, so no uncancelled perturbative inflow mandates charged gapless boundary modes.',
  missingMicroscopicData: ['orbifold parities of every fermion', 'defect-localized spectrum', 'signed mass matrix', 'boundary regulator/counterterm', 'couplings to neutral gapless modes'],
  classification: 'The effective topological branch is viable, but its realization in the declared Standard-Model/Jordan system is indeterminate without boundary spectrum data.',
}, null, 2));
