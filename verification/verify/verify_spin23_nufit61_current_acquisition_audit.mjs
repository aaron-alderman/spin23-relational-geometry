import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const audit = JSON.parse(readFileSync(
  'evidence/data/spin23-nufit61-current-acquisition-audit.json',
  'utf8',
));
const prior = JSON.parse(readFileSync(
  audit.priorIdentifiabilityEvidence,
  'utf8',
));

assert.equal(audit.schema, 'spin23.nufit61-current-acquisition-audit/1');
assert.equal(audit.auditDate, '2026-10-20');
assert.equal(audit.officialReleaseStatus.latestListedRelease, '6.1');
assert.equal(audit.officialReleaseStatus.newerOfficialReleaseListed, false);

const configurations = audit.publishedDataInventory.releaseConfigurations;
assert.equal(configurations.length, 4);
assert.equal(audit.publishedDataInventory.releaseConfigurationCount, 4);
assert.deepEqual(
  new Set(configurations.map(x => `${x.atmosphericVariant}/${x.ordering}`)),
  new Set(['TBno/NO', 'TBno/IO', 'TByes/NO', 'TByes/IO']),
);

const sections = audit.publishedDataInventory.sections;
assert.equal(sections.length, 22);
assert.equal(sections.filter(x => x.length === 1).length, 6);
assert.equal(sections.filter(x => x.length === 2).length, 15);
assert.equal(sections.filter(x => x.length === 3).length, 1);
assert.deepEqual(
  audit.publishedDataInventory.sectionDimensions,
  {oneDimensional: 6, twoDimensional: 15, threeDimensional: 1},
);
assert.deepEqual(
  audit.publishedDataInventory.onlyThreeDimensionalSection,
  ['T23', 'DMA', 'DCP'],
);

const required = new Set(audit.target.requiredJointOscillationCoordinates);
assert.deepEqual(required, new Set(['T12', 'T13', 'DMS', 'DMA']));
const overlap = section => section.filter(x => required.has(x)).length;
assert.equal(Math.max(...sections.map(overlap)), 2);
assert.equal(sections.some(section => [...required].every(x => section.includes(x))), false);
assert.equal(audit.publishedDataInventory.maximumOverlapWithRequiredCoordinates, 2);
assert.equal(audit.publishedDataInventory.containsRequiredFourCoordinateJointProfile, false);

const checks = audit.officialAcquisitionChecks;
assert.equal(checks.length, 5);
assert.ok(checks.every(check => check.found === false));
assert.ok(checks.every(check => /^https:\/\/(www\.nu-fit\.org|arxiv\.org)\//.test(check.url)));
assert.ok(checks.some(check => /newer than 6\.1/.test(check.query)));
assert.ok(checks.some(check => /electron-zero or texture-zero/.test(check.query)));
assert.ok(checks.some(check => /joint four-coordinate grid/.test(check.query)));

assert.equal(audit.publishedDataInventory.callableJointEvaluator, false);
assert.equal(audit.publishedDataInventory.directElectronZeroProfile, false);
assert.equal(audit.decision.usableArtifactFound, false);
assert.equal(audit.decision.constrainedProfileRun, false);
assert.equal(audit.decision.blockerRemains, true);
assert.match(audit.decision.epistemicBoundary, /public acquisition surface/);
assert.match(audit.decision.epistemicBoundary, /not evidence.*internal joint likelihood/i);
assert.match(audit.decision.reopenTrigger, /T12\/T13\/DMS\/DMA/);

// The current acquisition decision must agree with the previously proved
// non-identifiability of the released lower-dimensional profiles.
assert.equal(prior.containsFullRelevantJointProfile, false);
assert.equal(prior.largestPublishedJointOverlapWithRelevantSet, 2);
assert.match(prior.verdict, /not identifiable/);

console.log(
  'PASS 1524: as of 2026-10-20 the official NuFIT surface still lists 6.1 as latest and exposes only proper-subset profile projections; no callable four-coordinate likelihood or direct electron-zero profile was acquired, so the constrained profile remains blocked.',
);
