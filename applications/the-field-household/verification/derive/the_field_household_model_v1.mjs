// Browser-safe, deterministic synthetic arithmetic. No assessment of actual people.
const EPS = 1e-8;
const copy = value => structuredClone(value);
const check = (condition, message) => { if (!condition) throw new Error(message); };
const bounded = (value, min, max, name) => check(Number.isFinite(value) && value >= min && value <= max, `${name} must be in [${min}, ${max}]`);
const allowed = (object, keys, name) => {
  check(object && typeof object === 'object' && !Array.isArray(object), `${name} must be an object`);
  check(Object.keys(object).every(key => keys.includes(key)), `Unknown ${name} field`);
};
const personKeys = ['id', 'capacity', 'wage', 'willingness', 'values'];
const valueKeys = ['paidHours', 'freeHours', 'domesticShare', 'shareTolerance', 'paidTolerance'];

function validatePerson(person) {
  allowed(person, personKeys, 'person');
  check(['A', 'B'].includes(person.id), 'Person must be A or B');
  bounded(person.capacity, 0, 168, 'capacity');
  bounded(person.wage, 0, 1000, 'wage');
  bounded(person.willingness, 0, 1, 'willingness');
  allowed(person.values, valueKeys, 'values');
  for (const key of ['paidHours', 'freeHours', 'paidTolerance']) bounded(person.values[key], 0, 168, key);
  for (const key of ['domesticShare', 'shareTolerance']) bounded(person.values[key], 0, 1, key);
}

function applyPatch(state, patch) {
  allowed(patch, ['people', 'domesticHours', 'expenses'], 'patch');
  if (patch.people !== undefined) {
    check(Array.isArray(patch.people) && patch.people.length <= 2, 'Patch people must be an array');
    check(new Set(patch.people.map(p => p.id)).size === patch.people.length, 'Duplicate patch person');
    for (const update of patch.people) {
      allowed(update, personKeys, 'person patch');
      const index = state.people.findIndex(person => person.id === update.id);
      check(index >= 0, 'Unknown patch person');
      if (update.values !== undefined) allowed(update.values, valueKeys, 'values patch');
      state.people[index] = { ...state.people[index], ...copy(update),
        values: { ...state.people[index].values, ...copy(update.values ?? {}) } };
      validatePerson(state.people[index]);
    }
  }
  for (const key of ['domesticHours', 'expenses']) if (patch[key] !== undefined) {
    bounded(patch[key], 0, key === 'domesticHours' ? 168 : 100000, key);
    state[key] = patch[key];
  }
}

export function validateHousehold(input) {
  allowed(input, ['protocol', 'id', 'periods', 'initial', 'policy', 'events'], 'scenario');
  check(input.protocol === 'the-field/household-scenario/1', 'Unsupported household protocol');
  check(typeof input.id === 'string' && input.id.length > 0, 'Scenario id required');
  check(Number.isInteger(input.periods) && input.periods >= 1 && input.periods <= 36, 'periods must be 1 to 36');
  allowed(input.initial, ['people', 'domesticHours', 'expenses', 'reserve', 'shareA'], 'initial');
  check(Array.isArray(input.initial.people) && input.initial.people.length === 2
    && input.initial.people[0].id === 'A' && input.initial.people[1].id === 'B', 'People must be ordered A then B');
  input.initial.people.forEach(validatePerson);
  bounded(input.initial.domesticHours, 0, 168, 'domesticHours');
  bounded(input.initial.expenses, 0, 100000, 'expenses');
  bounded(input.initial.reserve, 0, 1000000, 'reserve');
  bounded(input.initial.shareA, 0, 1, 'shareA');
  allowed(input.policy, ['maxReallocationHours', 'reviewHours', 'gridSteps'], 'policy');
  bounded(input.policy.maxReallocationHours, 0, 168, 'maxReallocationHours');
  bounded(input.policy.reviewHours, 0, 24, 'reviewHours');
  check(Number.isInteger(input.policy.gridSteps) && input.policy.gridSteps >= 4 && input.policy.gridSteps <= 200, 'gridSteps must be 4 to 200');
  check(Array.isArray(input.events) && input.events.length <= 100, 'Bounded events required');
  const ids = new Set();
  const preview = copy(input.initial);
  const changed = new Set();
  for (const event of input.events) {
    allowed(event, ['id', 'period', 'patch'], 'event');
    check(typeof event.id === 'string' && !ids.has(event.id), 'Unique event id required');
    ids.add(event.id);
    check(Number.isInteger(event.period) && event.period >= 1 && event.period <= input.periods, 'Event outside horizon');
    // Overlapping same-period edits would otherwise depend silently on array order.
    const paths = [];
    for (const key of ['domesticHours', 'expenses']) if (event.patch?.[key] !== undefined) paths.push(key);
    for (const p of event.patch?.people ?? []) {
      for (const key of Object.keys(p).filter(key => key !== 'id' && key !== 'values')) paths.push(`${p.id}.${key}`);
      for (const key of Object.keys(p.values ?? {})) paths.push(`${p.id}.values.${key}`);
    }
    for (const path of paths) {
      const key = `${event.period}:${path}`;
      check(!changed.has(key), `Conflicting same-period event: ${path}`);
      changed.add(key);
    }
    applyPatch(preview, event.patch);
  }
  return input;
}

// Time is a stipulated usable-hours budget, not measured physiological energy.
// Unpaid work is attempted first, paid work up to its target next, with preferred
// free time reserved where possible. This priority rule is an assumption.
export function evaluateAllocation(people, shareA, demand, reviewHours = 0) {
  return people.map((person, index) => {
    const share = index === 0 ? shareA : 1 - shareA;
    const due = demand * share;
    const available = Math.max(0, person.capacity - reviewHours);
    const domestic = Math.min(due, available);
    const remaining = available - domestic;
    const paid = Math.min(person.values.paidHours, Math.max(0, remaining - person.values.freeHours));
    const free = remaining - paid;
    const gaps = {
      paid: person.values.paidHours - paid,
      free: Math.max(0, person.values.freeHours - free),
      role: demand > EPS ? Math.abs(share - person.values.domesticShare) : 0,
    };
    const within = { paid: gaps.paid <= person.values.paidTolerance + EPS,
      free: gaps.free <= EPS, role: gaps.role <= person.values.shareTolerance + EPS };
    return { id: person.id, assignedShare: share, domesticDue: due, domestic, paid, free,
      reviewHours, unusedAssignment: due - domestic, income: paid * person.wage,
      gaps, within, goalsWithinBounds: Object.values(within).every(Boolean) };
  });
}

export function assents(before, after) {
  // Explicit synthetic assent rule: acceptable bounds OR improvement without
  // worsening any deviation outside its acceptable bound. Movement inside a
  // declared tolerance is allowed even while a different goal remains unmet.
  // No sum of welfare, household happiness, dignity or moral worth is computed.
  return after.goalsWithinBounds || (Object.keys(before.gaps).every(k => after.within[k] || after.gaps[k] <= before.gaps[k] + EPS)
    && Object.keys(before.gaps).some(k => after.gaps[k] < before.gaps[k] - EPS));
}

export function createHouseholdScenario(fixture, orientationId = 'roles', changeId = 'values') {
  check(fixture.protocol === 'the-field/household-fixture/1', 'Unsupported fixture');
  const orientation = fixture.orientations.find(item => item.id === orientationId);
  const change = fixture.changes.find(item => item.id === changeId);
  check(orientation && change, 'Unknown orientation or change');
  const input = copy(fixture.base);
  input.id = `${orientationId}/${changeId}`;
  input.initial.shareA = orientation.shareA;
  applyPatch(input.initial, orientation.patch);
  input.events = [...copy(orientation.events), ...copy(change.events)].sort((a, b) => a.period - b.period || a.id.localeCompare(b.id));
  validateHousehold(input);
  return input;
}

function negotiate(state, demand, policy, period) {
  const baseline = evaluateAllocation(state.people, state.shareA, demand);
  const order = period % 2 === 0 ? [1, 0] : [0, 1];
  const requester = order.find(i => !baseline[i].goalsWithinBounds);
  if (requester === undefined) return { status: 'no-request', requester: null, shareA: state.shareA, reviewHours: 0, candidates: 0 };
  const result = { status: 'review-not-open', requester: state.people[requester].id,
    shareA: state.shareA, reviewHours: 0, candidates: 0 };
  const blockers = state.people.filter(person => person.willingness === 0).map(person => person.id);
  if (blockers.length) return { ...result, blockers };
  if (state.people.some(person => person.capacity + EPS < policy.reviewHours)) return { ...result, status: 'review-time-unavailable' };
  result.reviewHours = policy.reviewHours;
  const before = evaluateAllocation(state.people, state.shareA, demand, result.reviewHours);
  const limit = policy.maxReallocationHours * Math.min(...state.people.map(person => person.willingness));
  const candidates = new Set([state.shareA, state.people[0].values.domesticShare, 1 - state.people[1].values.domesticShare]);
  for (let i = 0; i <= policy.gridSteps; i++) candidates.add(i / policy.gridSteps);
  if (demand > EPS) {
    candidates.add(Math.max(0, state.shareA - limit / demand));
    candidates.add(Math.min(1, state.shareA + limit / demand));
  }
  const options = [...candidates].filter(share => Math.abs(share - state.shareA) > EPS
    && Math.abs(share - state.shareA) * demand <= limit + EPS).map(share => {
    const people = evaluateAllocation(state.people, share, demand, result.reviewHours);
    return { share, people, distance: Math.abs(share - state.shareA) };
  });
  // Requester's paid-work gap first, then free-time gap, then role gap; ties favor
  // smaller changes and finally smaller shareA. This is a declared agenda, not optimum welfare.
  options.sort((a, b) => {
    for (const key of ['paid', 'free', 'role']) {
      const delta = a.people[requester].gaps[key] - b.people[requester].gaps[key];
      if (Math.abs(delta) > EPS) return delta;
    }
    return a.distance - b.distance || a.share - b.share;
  });
  result.candidates = options.length;
  for (const option of options) {
    if (!option.people.every((person, i) => assents(before[i], person))) continue;
    // Do not create churn when the initiator gains nothing on any stated goal.
    const gains = Object.keys(before[requester].gaps).some(key => option.people[requester].gaps[key] < before[requester].gaps[key] - EPS);
    if (!gains) continue;
    return { ...result, status: 'revised', shareA: option.share,
      assent: state.people.map(person => person.id) };
  }
  return { ...result, status: 'no-joint-proposal-on-grid' };
}

export function simulateHousehold(input) {
  validateHousehold(input);
  const state = copy(input.initial);
  let backlog = 0;
  const history = [];
  const events = [...input.events].sort((a, b) => a.period - b.period || a.id.localeCompare(b.id));
  for (let period = 1; period <= input.periods; period++) {
    const appliedEvents = events.filter(event => event.period === period);
    for (const event of appliedEvents) applyPatch(state, event.patch);
    const priorBacklog = backlog;
    const demand = state.domesticHours + priorBacklog;
    const review = negotiate(state, demand, input.policy, period);
    const previousShareA = state.shareA;
    state.shareA = review.shareA;
    const people = evaluateAllocation(state.people, state.shareA, demand, review.reviewHours);
    const completed = people.reduce((sum, person) => sum + person.domestic, 0);
    backlog = Math.max(0, demand - completed);
    const openingReserve = state.reserve;
    const income = people.reduce((sum, person) => sum + person.income, 0);
    const spent = Math.min(state.expenses, openingReserve + income);
    state.reserve = openingReserve + income - spent;
    history.push({ period, appliedEvents: appliedEvents.map(event => event.id),
      assumptions: copy(state.people), recurringDemand: state.domesticHours,
      priorBacklog, demand, completed, backlog, previousShareA, shareA: state.shareA,
      review, people, openingReserve, income, expensesDue: state.expenses, spent,
      unmetExpenses: state.expenses - spent, reserve: state.reserve,
      cumulativeUnmetExpenses: (history.at(-1)?.cumulativeUnmetExpenses ?? 0) + state.expenses - spent,
      standing: { A: 'unchanged', B: 'unchanged' }, trust: { AtoB: null, BtoA: null } });
  }
  return { protocol: 'the-field/household-run/1', id: input.id,
    status: 'synthetic-execution-not-human-prediction', history };
}

// Shared by the adaptive successor. These wrappers do not change v1 execution.
export function patchHouseholdState(state, patch) { applyPatch(state, patch); }
export function negotiateHouseholdState(state, demand, policy, period) { return negotiate(state, demand, policy, period); }
