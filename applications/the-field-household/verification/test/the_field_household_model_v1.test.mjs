import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assents, createHouseholdScenario, simulateHousehold, validateHousehold } from '../derive/the_field_household_model_v1.mjs';

const fixture = JSON.parse(readFileSync(new URL('../../evidence/data/the-field/household-orientations-v1.json', import.meta.url)));
const scenario = (orientation = 'roles', change = 'values') => createHouseholdScenario(fixture, orientation, change);
const run = input => simulateHousehold(input);
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-7, `${a} != ${b}`);

test('all 20 preset comparisons replay without changing inputs', () => {
  for (const orientation of fixture.orientations) for (const change of fixture.changes) {
    const input = scenario(orientation.id, change.id);
    const before = JSON.stringify(input);
    assert.deepEqual(run(input), run(input));
    assert.equal(JSON.stringify(input), before);
    assert.equal(run(input).history.length, 12);
  }
});

test('every period conserves each time budget, unpaid task balance and monetary balance', () => {
  for (const orientation of fixture.orientations) for (const change of fixture.changes) {
    for (const row of run(scenario(orientation.id, change.id)).history) {
      row.people.forEach((p, i) => {
        near(p.domestic + p.paid + p.free + p.reviewHours, row.assumptions[i].capacity);
        near(p.domesticDue, p.domestic + p.unusedAssignment);
        assert.ok([p.domestic, p.paid, p.free, p.income].every(n => n >= 0));
      });
      near(row.priorBacklog + row.recurringDemand, row.completed + row.backlog);
      near(row.openingReserve + row.income, row.spent + row.reserve);
      near(row.expensesDue, row.spent + row.unmetExpenses);
    }
  }
});

test('unchanged roles and equal sharing are stable negative controls', () => {
  for (const id of ['roles', 'equal', 'capacity']) {
    const input = scenario(id, 'none');
    const rows = run(input).history;
    assert.ok(rows.every(row => row.review.status === 'no-request'));
    assert.ok(rows.every(row => row.shareA === input.initial.shareA));
  }
});

test('value change persists and can initiate a jointly assented revision', () => {
  const rows = run(scenario()).history;
  assert.equal(rows[3].assumptions[1].values.paidHours, 8);
  assert.equal(rows[4].assumptions[1].values.paidHours, 32);
  assert.ok(rows.slice(4).every(row => row.assumptions[1].values.paidHours === 32));
  assert.ok(rows.slice(4).some(row => row.review.status === 'revised'));
  assert.ok(rows.at(-1).people[1].paid > rows[3].people[1].paid);
});

test('either person declining review preserves allocation and unknown trust without standing loss', () => {
  for (const index of [0, 1]) {
    const input = scenario();
    input.initial.people[index].willingness = 0;
    for (const row of run(input).history) {
      assert.equal(row.shareA, input.initial.shareA);
      assert.deepEqual(row.standing, { A: 'unchanged', B: 'unchanged' });
      assert.deepEqual(row.trust, { AtoB: null, BtoA: null });
    }
    assert.equal(run(input).history[4].review.status, 'review-not-open');
  }
});

test('willingness bounds the speed of reallocation rather than guaranteeing agreement', () => {
  const input = scenario();
  input.initial.people.forEach(p => { p.willingness = 0.15; });
  const rows = run(input).history;
  for (const row of rows) assert.ok(Math.abs(row.shareA - row.previousShareA) * row.demand <= 8 * 0.15 + 1e-7);
  assert.ok(rows.some(row => row.review.status === 'revised'));
});

test('high willingness cannot overcome incompatible strict role bounds', () => {
  const input = scenario('roles', 'none');
  input.initial.people.forEach(p => { p.willingness = 1; p.values.shareTolerance = 0; });
  input.events = [{ id: 'incompatible', period: 3, patch: { people: [{ id: 'B', values: { domesticShare: 0.2 } }] } }];
  const rows = run(input).history;
  assert.ok(rows.slice(2).every(row => row.review.status === 'no-joint-proposal-on-grid'));
  assert.ok(rows.every(row => row.shareA === input.initial.shareA));
});

test('assent permits an acceptable tradeoff but does not collapse dimensions into total utility', () => {
  const before = { gaps: { paid: 4, free: 0, role: 0 }, goalsWithinBounds: false };
  assert.equal(assents(before, { gaps: { paid: 2, free: 0, role: 0 }, within: { paid: false, free: true, role: true }, goalsWithinBounds: false }), true);
  assert.equal(assents(before, { gaps: { paid: 0, free: 0, role: 0.1 }, within: { paid: true, free: true, role: false }, goalsWithinBounds: false }), false);
  assert.equal(assents(before, { gaps: { paid: 0, free: 0, role: 0.1 }, within: { paid: true, free: true, role: true }, goalsWithinBounds: true }), true);
});

test('capacity adaptation can proceed gradually inside role tolerance before paid goals are met', () => {
  const input = scenario('equal', 'capacity');
  const rows = run(input).history;
  assert.equal(rows[4].review.status, 'revised');
  assert.equal(rows[4].people[1].goalsWithinBounds, false);
  assert.ok(rows[4].people[1].within.role);
  assert.ok(rows[4].people[1].paid > 12);
  assert.ok(rows[4].shareA > 0.5);
});

test('capacity loss is a persistent constraint and does not rewrite values or wages', () => {
  const input = scenario('equal', 'capacity');
  const rows = run(input).history;
  assert.equal(rows[3].assumptions[1].capacity, 60);
  assert.ok(rows.slice(4).every(row => row.assumptions[1].capacity === 36));
  assert.deepEqual(rows[4].assumptions[1].values, input.initial.people[1].values);
  assert.equal(rows[4].assumptions[1].wage, input.initial.people[1].wage);
});

test('more demand does not silently lower goals or create outside resources', () => {
  const rows = run(scenario('equal', 'demands')).history;
  assert.equal(rows[4].recurringDemand, 48);
  assert.deepEqual(rows[4].assumptions.map(p => p.values), rows[3].assumptions.map(p => p.values));
});

test('overdue unpaid tasks carry forward once and deficits do not create hidden debt', () => {
  const input = scenario('equal', 'none');
  input.periods = 3;
  input.initial.people.forEach(p => { p.capacity = 2; p.willingness = 0; });
  input.initial.domesticHours = 10;
  input.initial.reserve = 0;
  const rows = run(input).history;
  assert.deepEqual(rows.map(row => row.backlog), [6, 12, 18]);
  assert.ok(rows.every(row => row.reserve === 0 && row.unmetExpenses === 160));
  assert.equal(rows.at(-1).cumulativeUnmetExpenses, 480);
});

test('review consumes actual time, including unsuccessful deliberation', () => {
  const input = scenario();
  const row = run(input).history[4];
  assert.equal(row.review.reviewHours, 0.5);
  assert.ok(row.people.every(p => p.reviewHours === 0.5));
  const tooLittle = scenario();
  tooLittle.initial.people[0].capacity = 0;
  assert.equal(run(tooLittle).history[0].review.status, 'review-time-unavailable');
});

test('zero demand cannot manufacture a role conflict and zero wages cannot create income', () => {
  const input = scenario('equal', 'none');
  input.initial.domesticHours = 0;
  input.initial.people.forEach(p => { p.wage = 0; p.values.domesticShare = 0; p.values.shareTolerance = 0; });
  const rows = run(input).history;
  assert.ok(rows.every(row => row.review.status === 'no-request' && row.income === 0));
});

test('planned turn is an event, not a guarantee that reallocation will be agreed', () => {
  const input = scenario('alternating', 'none');
  input.initial.people[0].willingness = 0;
  const rows = run(input).history;
  assert.ok(rows[7].appliedEvents.includes('planned-turn'));
  assert.equal(rows[7].assumptions[1].values.paidHours, 36);
  assert.equal(rows[7].shareA, input.initial.shareA);
});

test('invalid numbers, units, endpoints and unknown fields are rejected before execution', () => {
  const mutations = [
    s => { s.initial.people[0].capacity = NaN; },
    s => { s.initial.people[0].willingness = 1.1; },
    s => { s.initial.people[0].values.domesticShare = -0.1; },
    s => { s.initial.people[0].values.happiness = 1; },
    s => { s.initial.people[0].capacity = '60'; },
    s => { s.initial.people.reverse(); },
    s => { s.periods = 37; },
    s => { s.policy.gridSteps = 0; },
    s => { s.events[0].period = 13; },
    s => { s.events[0].patch.people[0].id = 'C'; },
    s => { s.events[0].patch.people.push({ id: 'B', capacity: 5 }); },
    s => { s.events[0].patch.people[0].values.freeHours = Infinity; },
  ];
  for (const mutate of mutations) {
    const input = scenario();
    mutate(input);
    assert.throws(() => validateHousehold(input));
  }
});

test('conflicting event edits are rejected and disjoint edits are order-independent', () => {
  const input = scenario();
  input.events.push({ id: 'duplicate-field', period: 5, patch: { people: [{ id: 'B', values: { paidHours: 0 } }] } });
  assert.throws(() => run(input), /Conflicting same-period/);
  input.events[1].patch = { people: [{ id: 'A', capacity: 40 }] };
  const expected = run(input);
  input.events.reverse();
  assert.deepEqual(run(input), expected);
});

test('higher willingness can incur review cost without improving every outcome', () => {
  const open = scenario('roles', 'none');
  open.initial.people.forEach(p => { p.values.shareTolerance = 0; });
  open.events = [{ id: 'incompatible', period: 2, patch: { people: [{ id: 'B', values: { domesticShare: 0.2 } }] } }];
  const closed = structuredClone(open);
  closed.initial.people[0].willingness = 0;
  assert.ok(run(open).history[1].people[0].free < run(closed).history[1].people[0].free);
  assert.equal(run(open).history[1].review.status, 'no-joint-proposal-on-grid');
});
