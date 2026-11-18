import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { createAdaptiveHousehold, simulateAdaptiveHousehold, updateHouseholdWillingness } from '../derive/the_field_household_model_v2.mjs';
import { evaluateAllocation } from '../derive/the_field_household_model_v1.mjs';

const root = new URL('../../', import.meta.url);
const read = file => readFileSync(new URL(file, root));
const basePath = 'evidence/data/the-field/household-orientations-v1.json';
const adaptivePath = 'evidence/data/the-field/household-orientations-v2.json';
const base = JSON.parse(read(basePath)), adaptive = JSON.parse(read(adaptivePath));
const other = id => id === 'A' ? 'B' : 'A';
const close = (a, b) => Math.abs(a - b) < 1e-8;
const swapPerson = person => ({ ...structuredClone(person), id: other(person.id) });

function exchange(input) {
  const output = structuredClone(input);
  output.material.initial.people = [...output.material.initial.people].reverse().map(swapPerson);
  output.material.initial.shareA = 1 - output.material.initial.shareA;
  for (const event of output.material.events) if (event.patch.people) event.patch.people = event.patch.people.map(swapPerson);
  output.feedback.A = structuredClone(input.feedback.B);
  output.feedback.B = structuredClone(input.feedback.A);
  output.experience = { A: structuredClone(input.experience.B), B: structuredClone(input.experience.A) };
  for (const event of output.experienceEvents) event.person = other(event.person);
  return output;
}

let localAllocationChecks = 0, localFeedbackChecks = 0;
for (const share of [0, 0.125, 0.5, 0.825, 1]) {
  const people = base.base.initial.people;
  const a = evaluateAllocation(people, share, 32, 0.5);
  const b = evaluateAllocation([...people].reverse().map(swapPerson), 1 - share, 32, 0.5).reverse();
  for (let i = 0; i < 2; i++) for (const key of ['domesticDue', 'domestic', 'paid', 'free', 'income']) {
    if (!close(a[i][key], b[i][key])) throw new Error(`Local allocation exchange failed: ${key}`);
    localAllocationChecks++;
  }
}
for (const id of ['A', 'B']) for (const w of [0, 0.2, 0.8, 1]) for (const kind of ['heard', 'dismissed', 'kept', 'implementation-shortfall', 'capacity-shortfall', 'unknown']) {
  const own = updateHouseholdWillingness(w, kind, adaptive.feedback[id]);
  const renamed = updateHouseholdWillingness(w, kind, { ...adaptive.feedback[id] });
  if (own !== renamed) throw new Error('Local feedback depends on participant name');
  localFeedbackChecks++;
}

const comparisons = [];
for (const orientation of base.orientations) for (const change of base.changes) for (const profile of adaptive.profiles) {
  const input = createAdaptiveHousehold(base, adaptive, orientation.id, change.id, profile.id);
  const original = simulateAdaptiveHousehold(input);
  const exchanged = simulateAdaptiveHousehold(exchange(input));
  const differences = [];
  original.history.forEach((row, index) => {
    const renamed = exchanged.history[index];
    const fields = [];
    if (!close(row.shareA, 1 - renamed.shareA)) fields.push('assignment');
    if (!close(row.reserve, renamed.reserve)) fields.push('reserve');
    if (!close(row.backlog, renamed.backlog)) fields.push('backlog');
    for (const id of ['A', 'B']) {
      if (!close(row.willingnessClosing[id], renamed.willingnessClosing[other(id)])) fields.push(`willingness-${id}`);
    }
    if (fields.length) differences.push({ period: row.period, fields,
      requester: row.review.requester, exchangedRequesterMappedBack: renamed.review.requester ? other(renamed.review.requester) : null,
      shareA: row.shareA, exchangedShareMappedBack: 1 - renamed.shareA });
  });
  comparisons.push({ id: input.id, equivariantOnRecordedOutputs: differences.length === 0, firstDifference: differences[0] ?? null });
}
const paths = [basePath, adaptivePath, 'verification/derive/the_field_household_model_v1.mjs',
  'verification/derive/the_field_household_model_v2.mjs', 'verification/verify/verify_the_field_household_symmetry_v1.mjs'];
const receipt = { protocol: 'the-field/household-symmetry-receipt/1',
  evidenceFamily: 'the-field-household-v2-local-same-model',
  status: 'local-algebra-and-finite-comparison-not-empirical-validation',
  transformation: 'Exchange A and B with all their properties, directed experiences and rates; complement assignment shares; retain the executable agenda and tie-break rules.',
  tolerance: 1e-8,
  sources: paths.map(path => ({ path, sha256: createHash('sha256').update(read(path)).digest('hex') })),
  localAllocationChecks, localFeedbackChecks,
  scope: 'Local rules do not use sex or names. Whole-run exchange need not commute because the period agenda starts at a named participant and ties prefer smaller shareA. No universal role-neutrality or moral equivalence follows.',
  comparisons };
writeFileSync(new URL('evidence/data/the-field/household-symmetry-v1-receipt.json', root), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify({ localAllocationChecks, localFeedbackChecks, runs: comparisons.length,
  equivariant: comparisons.filter(c => c.equivariantOnRecordedOutputs).length,
  orderSensitive: comparisons.filter(c => !c.equivariantOnRecordedOutputs).length,
  firstCounterexample: comparisons.find(c => !c.equivariantOnRecordedOutputs) ?? null }, null, 2));
