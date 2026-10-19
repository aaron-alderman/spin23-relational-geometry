import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const readJson = relative => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const integration = readJson('evidence/data/spin23-zenodo-preprint-terminal-gate-integration.json');
const terminal = readJson('evidence/data/spin23-terminal-exhaustion-register.json');
const qzw = readJson('evidence/data/zenodo-19874093-exact-liouvillian-kubo-audit.json');
const oct = readJson('evidence/data/spin23-zenodo-octonionic-two-branch-lindblad-audit.json');

assert.equal(integration.documentId, 1456);
assert.equal(integration.baselineDocumentId, 1453);
assert.deepEqual(integration.sourceAudits, [1454, 1455]);
assert.equal(integration.terminalPartition.unchanged, true);
assert.equal(integration.terminalPartition.physicalAdmission, false);
assert.equal(integration.reopenConditionsMet.length, 0);
assert.ok(integration.sources.every(source => source.fundamentalSpin23Evidence === false));
assert.equal(integration.paperWorthiness.jointSpin23Paper, false);
assert.ok(integration.paperWorthiness['1454'].includes('correction/no-go'));
assert.ok(integration.paperWorthiness['1455'].includes('independently publishable'));

const terminalByGate = new Map(terminal.gates.map(gate => [gate.id, gate]));
assert.equal(integration.gateMap.length, terminal.gates.length);
for (const gate of integration.gateMap) {
  const baseline = terminalByGate.get(gate.gate);
  assert.ok(baseline, `unknown gate ${gate.gate}`);
  assert.equal(gate.baselineClass, baseline.terminalClass, `${gate.gate} baseline class drift`);
  assert.equal(gate.postAuditClass, baseline.terminalClass, `${gate.gate} was reclassified without a reopen condition`);
  assert.equal(gate.changed, false);
  assert.ok(gate.reason.length > 20);
}
assert.deepEqual(integration.terminalPartition.internallyExhaustedGates, terminal.terminalVerdict.internallyExhaustedGates);
assert.deepEqual(integration.terminalPartition.conditionallyConstructedGates, terminal.terminalVerdict.conditionallyConstructedGates);
assert.deepEqual(integration.terminalPartition.externallyOpenGates, terminal.terminalVerdict.externallyOpenGates);
assert.deepEqual(integration.terminalPartition.failedWholeGates, terminal.terminalVerdict.failedWholeGates);

assert.equal(oct.source.doi, '10.5281/zenodo.19643326');
assert.equal(oct.source.pdfMd5, integration.sources[0].pdfMd5);
assert.equal(oct.asWrittenModel.internallyConsistent, false);
assert.equal(oct.minimalCorrection.invariant, 'A B');
assert.equal(oct.minimalCorrection.oppositePhaseCovariant, true);
assert.equal(oct.minimalCorrection.reducedEquationsThenCorrect, true);
assert.equal(oct.rankThreeBilinearClosure.closureDimension, 3);
assert.equal(oct.fourDimensionalLift.fullSp4Generated, false);
assert.equal(oct.cpLindbladCompletion.octonionicOperatorIdentificationDerived, false);
assert.equal(oct.verdict.physicalAdmission, false);

function complex(re, im) { return {re, im}; }
function add(a, b) { return complex(a.re + b.re, a.im + b.im); }
function mul(a, b) { return complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re); }
function conj(a) { return complex(a.re, -a.im); }
function scale(a, x) { return complex(x * a.re, x * a.im); }
function cis(x) { return complex(Math.cos(x), Math.sin(x)); }
function distance(a, b) { return Math.hypot(a.re - b.re, a.im - b.im); }

const A = complex(0.7, -1.2);
const B = complex(-0.3, 0.8);
const omega = 0.61;
const gamma = 0.17;
const kappa = -0.44;
const alpha = 0.39;
const drift = (a, b) => add(mul(complex(-gamma, omega), a), scale(conj(b), kappa));
const oppositeA = mul(cis(alpha), A);
const oppositeB = mul(cis(-alpha), B);
assert.ok(distance(drift(oppositeA, oppositeB), mul(cis(alpha), drift(A, B))) < 1e-12,
  'opposite-phase covariance failed');
const commonA = mul(cis(alpha), A);
const commonB = mul(cis(alpha), B);
assert.ok(distance(drift(commonA, commonB), mul(cis(alpha), drift(A, B))) > 1e-3,
  'common-phase covariance should fail for generic coupling');
assert.ok(distance(mul(oppositeA, oppositeB), mul(A, B)) < 1e-12, 'AB should be invariant');
assert.ok(distance(mul(oppositeA, conj(oppositeB)), mul(A, conj(B))) > 1e-3,
  'A conjugate(B) should not be invariant under opposite phases');

const abs2 = z => z.re * z.re + z.im * z.im;
const AB = mul(A, B);
const S0 = (abs2(A) + abs2(B)) / 2;
const coneDet = S0 * S0 - AB.re * AB.re - AB.im * AB.im;
const coneDetExpected = (abs2(A) - abs2(B)) ** 2 / 4;
assert.ok(Math.abs(coneDet - coneDetExpected) < 1e-12);
assert.ok(coneDet >= -1e-12);

assert.equal(qzw.source.doi, '10.5281/zenodo.19874093');
assert.equal(qzw.source.sourcePdfMd5, integration.sources[1].pdfMd5);
assert.equal(qzw.programmeMapping.spin23Evidence, false);
assert.equal(qzw.exactLiouvillian.genericSteadyState, 'rho_ss=I/2 for gamma>0 and sin(kx)^2+sin(ky)^2>0');
assert.equal(qzw.exactLiouvillian.exactSteadyStateKubo.includes('sigma_xy=0'), true);
assert.equal(qzw.consistencyDiagnosis.retardedOnlySelfEnergyIsInsufficient, true);
assert.equal(integration.sources[1].exactSteadyStateResponse, 0);
assert.ok(Math.abs(integration.sources[1].killPoint.phenomenologicalResponse - 0.9720664178754965) < 1e-12);
assert.ok(Math.abs(integration.sources[1].killPoint.phenomenologicalResponse - integration.sources[1].exactSteadyStateResponse) > 0.9);

for (const doc of [1454, 1455, 1456]) {
  const claimDir = path.join(root, 'corpus', 'claims', '1400-1499');
  const matches = fs.readdirSync(claimDir).filter(name => name.startsWith(`${doc}_`) && name.endsWith('.md'));
  assert.equal(matches.length, 1, `expected exactly one document ${doc}`);
}

console.log(JSON.stringify({
  result: 'PASS',
  documentId: 1456,
  sourceAudits: integration.sourceAudits,
  correctedOctonionicModel: {
    invariant: oct.minimalCorrection.invariant,
    symmetry: oct.minimalCorrection.symmetry,
    closureDimension: oct.rankThreeBilinearClosure.closureDimension,
    fullSp4Generated: oct.fourDimensionalLift.fullSp4Generated
  },
  exactQzwKill: {
    phenomenologicalResponse: integration.sources[1].killPoint.phenomenologicalResponse,
    exactSteadyStateResponse: integration.sources[1].exactSteadyStateResponse
  },
  gateClasses: Object.fromEntries(integration.gateMap.map(gate => [gate.gate, gate.postAuditClass])),
  terminalPartitionUnchanged: integration.terminalPartition.unchanged,
  physicalAdmission: integration.terminalPartition.physicalAdmission,
  fundamentalSpin23Evidence: integration.fundamentalEvidence.spin23
}, null, 2));
