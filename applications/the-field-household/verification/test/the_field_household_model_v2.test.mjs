import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { simulateHousehold } from '../derive/the_field_household_model_v1.mjs';
import { createAdaptiveHousehold, simulateAdaptiveHousehold, updateHouseholdWillingness, validateAdaptiveHousehold } from '../derive/the_field_household_model_v2.mjs';

const read = file => JSON.parse(readFileSync(new URL(`../../evidence/data/the-field/${file}`, import.meta.url)));
const base = read('household-orientations-v1.json');
const feedback = read('household-orientations-v2.json');
const scenario = (profile = 'constructive', orientation = 'roles', change = 'values') => createAdaptiveHousehold(base, feedback, orientation, change, profile);
const run = simulateAdaptiveHousehold;
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);
const only = (input, key, value) => { for (const id of ['A', 'B']) for (const rate of Object.keys(input.feedback[id])) input.feedback[id][rate] = rate === key ? value : 0; };

test('disabled learning and full implementation reproduce every v1 physical trajectory exactly', () => {
  const pick = (object, reference) => Object.fromEntries(Object.keys(reference).map(key => [key, object[key]]));
  for (const orientation of base.orientations) for (const change of base.changes) {
    const input = scenario('constructive', orientation.id, change.id);
    input.feedback.enabled = false;
    const old = simulateHousehold(input.material);
    const next = run(input);
    for (let i = 0; i < old.history.length; i++) {
      const row = pick(next.history[i], old.history[i]);
      row.review = pick(row.review, old.history[i].review);
      row.people = row.people.map((person, j) => pick(person, old.history[i].people[j]));
      assert.deepEqual(row, old.history[i]);
    }
  }
});

test('all 100 combinations replay deterministically without mutating their inputs', () => {
  for (const orientation of base.orientations) for (const change of base.changes) for (const profile of feedback.profiles) {
    const input = scenario(profile.id, orientation.id, change.id);
    const frozen = JSON.stringify(input);
    assert.deepEqual(run(input), run(input));
    assert.equal(JSON.stringify(input), frozen);
  }
});

test('period-end evidence changes the next period rather than the current review inputs', () => {
  const rows = run(scenario()).history;
  assert.equal(rows[0].willingnessOpening.B, 0.8);
  near(rows[0].willingnessClosing.B, 0.808);
  assert.equal(rows[1].willingnessOpening.B, rows[0].willingnessClosing.B);
  assert.equal(rows[4].assumptions[1].willingness, rows[4].willingnessOpening.B);
});

test('dismissal updates the requester only and can reduce future movement capacity', () => {
  const input = scenario('dismissal');
  only(input, 'dismissedLoss', 0.25);
  const rows = run(input).history;
  assert.equal(rows[4].review.status, 'request-dismissed');
  assert.equal(rows[4].willingnessClosing.A, 0.8);
  near(rows[4].willingnessClosing.B, 0.6);
  assert.ok(rows.at(-1).willingnessClosing.B < 0.1);
  assert.ok(rows.every(row => row.shareA === input.material.initial.shareA));
});

test('a respectful refusal can increase willingness without granting the remedy', () => {
  const input = scenario();
  only(input, 'heardGain', 0.1);
  input.material.initial.people[0].willingness = 0;
  const row = run(input).history[4];
  assert.equal(row.review.status, 'review-not-open');
  assert.equal(row.evidence.find(e => e.source === 'request-response').kind, 'heard');
  near(row.willingnessClosing.B, 0.82);
  assert.equal(row.shareA, input.material.initial.shareA);
});

test('unknown response quality is neutral and silence is not request evidence', () => {
  const input = scenario('unknown');
  only(input, 'dismissedLoss', 0.5);
  const rows = run(input).history;
  assert.ok(rows.every(row => row.willingnessClosing.A === 0.8 && row.willingnessClosing.B === 0.8));
  assert.ok(rows.slice(0, 4).every(row => row.evidence.every(e => e.source !== 'request-response')));
  assert.equal(rows[4].evidence.find(e => e.source === 'request-response').kind, 'unknown');
});

test('implementation shortfall changes actual work, backlog and the other observer willingness', () => {
  const input = scenario('unkept');
  only(input, 'missedLoss', 0.2);
  const row = run(input).history[4];
  assert.ok(row.people[0].domestic < row.people[0].plannedDomestic);
  assert.ok(row.backlog > 0);
  near(row.willingnessClosing.B, 0.64);
  assert.equal(row.willingnessClosing.A, 0.8);
  assert.equal(row.commitmentOutcomes.find(e => e.owner === 'A' && e.delivered !== undefined).kind, 'implementation-shortfall');
});

test('agreeing alone supplies no kept evidence when actual assigned work is not delivered', () => {
  const input = scenario('unkept');
  input.experienceEvents[0].deliveryFraction = 0;
  const row = run(input).history[4];
  assert.equal(row.review.status, 'revised');
  assert.ok(!row.evidence.some(e => e.actor === 'A' && e.kind === 'kept'));
  assert.ok(row.evidence.some(e => e.actor === 'A' && e.kind === 'implementation-shortfall'));
});

test('capacity shortfall is distinguished from non-implementation and neutral by default', () => {
  const input = scenario('constructive', 'roles', 'none');
  only(input, 'capacityLoss', 0);
  input.material.initial.people[0].capacity = 1;
  input.material.initial.people[0].willingness = 0;
  const rows = run(input).history;
  assert.ok(rows.some(row => row.evidence.some(e => e.kind === 'capacity-shortfall')));
  assert.ok(rows.every(row => row.willingnessClosing.A === 0 && row.willingnessClosing.B === 0.8));
});

test('mixed capacity and implementation limits remain explicitly ambiguous', () => {
  const input = scenario('unkept');
  input.material.initial.people[0].capacity = 1;
  input.material.initial.people[0].willingness = 0;
  const rows = run(input).history;
  const event = rows[4].evidence.find(e => e.actor === 'A' && e.source === 'agreement-execution');
  assert.equal(event.kind, 'mixed-shortfall');
  assert.equal(rows[4].willingnessUpdates.find(e => e.evidenceId === event.id).delta, 0);
});

test('revised agreements preserve prior history and actual shortfalls remain visible', () => {
  const result = run(scenario('repair'));
  assert.ok(result.agreements.length > 1);
  assert.ok(result.agreements.some(a => a.endedAt !== null));
  assert.ok(result.evidence.some(e => e.period < 9 && e.kind === 'implementation-shortfall'));
  assert.equal(result.history[8].backlog, 0);
  assert.ok(result.history.at(-1).willingnessClosing.B > result.history[7].willingnessClosing.B);
  assert.ok(result.history.at(-1).willingnessClosing.B < 1);
});

test('a mutually revised prior agreement is superseded rather than labeled breached', () => {
  const row = run(scenario()).history[4];
  assert.equal(row.review.status, 'revised');
  assert.ok(row.commitmentOutcomes.some(e => e.agreementId === 'initial-agreement' && e.kind === 'superseded'));
  assert.ok(!row.evidence.some(e => e.agreementId === 'initial-agreement'));
});

test('time, work and money stay conserved under implementation and feedback', () => {
  for (const profile of feedback.profiles) for (const row of run(scenario(profile.id)).history) {
    row.people.forEach((p, i) => near(p.domestic + p.paid + p.free + p.reviewHours, row.assumptions[i].capacity));
    near(row.priorBacklog + row.recurringDemand, row.completed + row.backlog);
    near(row.openingReserve + row.income, row.spent + row.reserve);
    near(row.expensesDue, row.spent + row.unmetExpenses);
  }
});

test('zero work does not manufacture fulfilled promises or positive willingness evidence', () => {
  const input = scenario('constructive', 'equal', 'none');
  input.material.initial.domesticHours = 0;
  const result = run(input);
  assert.ok(result.history.every(row => row.evidence.every(e => e.kind === 'no-task-due')));
  assert.ok(result.history.every(row => row.willingnessClosing.A === 0.8 && row.willingnessClosing.B === 0.8));
});

test('willingness remains bounded and explicit outreach can reopen a zero value', () => {
  const input = scenario('constructive', 'equal', 'none');
  input.material.initial.domesticHours = 0;
  input.material.initial.people[0].willingness = 0;
  input.experienceEvents = [{ id: 'outreach', period: 3, person: 'A', outreach: 'respectful' }];
  const result = run(input);
  near(result.history[2].willingnessClosing.A, 0.1);
  const rates = { heardGain: 1, dismissedLoss: 1, keptGain: 1, missedLoss: 1, capacityLoss: 0 };
  assert.equal(updateHouseholdWillingness(0, 'outreach', rates), 1);
  assert.equal(updateHouseholdWillingness(1, 'dismissed', rates), 0);
  for (const row of result.history) assert.ok(Object.values(row.willingnessClosing).every(w => w >= 0 && w <= 1));
});

test('an authored willingness reset is explicit and precedes that period evidence', () => {
  const input = scenario();
  input.material.events.push({ id: 'manual-reset', period: 7, patch: { people: [{ id: 'A', willingness: 0.2 }] } });
  const row = run(input).history[6];
  assert.ok(row.appliedEvents.includes('manual-reset'));
  assert.equal(row.willingnessOpening.A, 0.2);
  assert.ok(row.willingnessClosing.A > 0.2);
});

test('an invitation and respectful response in one period do not duplicate hearing gains', () => {
  const row = run(scenario('repair')).history[8];
  const heard = row.evidence.find(e => e.observer === 'B' && e.kind === 'heard');
  assert.ok(heard.outreachEventIds.includes('invitation-to-B'));
  assert.equal(row.willingnessUpdates.filter(e => e.person === 'B' && ['heard', 'outreach'].includes(e.kind)).length, 1);
});

test('rates may differ by observer and zero sensitivities hold willingness fixed', () => {
  const input = scenario('constructive', 'equal', 'none');
  only(input, 'keptGain', 0);
  input.feedback.A.keptGain = 0.5;
  const row = run(input).history[0];
  near(row.willingnessClosing.A, 0.9);
  assert.equal(row.willingnessClosing.B, 0.8);
});

test('evidence ids are unique and each update names exactly one recorded causal event', () => {
  const result = run(scenario('repair'));
  assert.equal(new Set(result.evidence.map(e => e.id)).size, result.evidence.length);
  for (const row of result.history) {
    assert.equal(row.willingnessUpdates.length, row.evidence.length);
    assert.deepEqual(row.willingnessUpdates.map(e => e.evidenceId), row.evidence.map(e => e.id));
    assert.deepEqual(row.trust, { AtoB: null, BtoA: null });
    assert.deepEqual(row.standing, { A: 'unchanged', B: 'unchanged' });
  }
});

test('invalid rates, attribution kinds, identities and overlapping events are rejected', () => {
  const mutations = [
    s => { s.feedback.A.keptGain = NaN; }, s => { s.feedback.B.missedLoss = -1; },
    s => { s.feedback.enabled = 1; }, s => { s.feedback.A.character = 1; },
    s => { s.experience.A.handling = 'bad-person'; }, s => { s.experience.B.deliveryFraction = 1.1; },
    s => { s.experienceEvents = [{ id: 'x', period: 13, person: 'A', handling: 'unknown' }]; },
    s => { s.experienceEvents = [{ id: 'x', period: 3, person: 'C', outreach: 'respectful' }]; },
    s => { s.experienceEvents = [{ id: 'x', period: 3, person: 'A', outreach: 'apology-erases-history' }]; },
    s => { s.experienceEvents = [{ id: 'x', period: 3, person: 'A' }]; },
    s => { s.experienceEvents = [{ id: 'x', period: 3, person: 'A', handling: 'unknown' }, { id: 'y', period: 3, person: 'A', handling: 'respectful' }]; },
  ];
  for (const mutate of mutations) { const input = scenario(); mutate(input); assert.throws(() => validateAdaptiveHousehold(input)); }
});
