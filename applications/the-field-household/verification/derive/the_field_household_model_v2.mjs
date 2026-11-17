import { validateHousehold, createHouseholdScenario, evaluateAllocation, patchHouseholdState, negotiateHouseholdState } from './the_field_household_model_v1.mjs';

const adaptiveClone = value => structuredClone(value);
const adaptiveCheck = (condition, message) => { if (!condition) throw new Error(message); };
const adaptiveUnit = (value, name) => adaptiveCheck(Number.isFinite(value) && value >= 0 && value <= 1, `${name} must be in [0,1]`);
const adaptiveKeys = (object, keys, name) => {
  adaptiveCheck(object && typeof object === 'object' && !Array.isArray(object), `${name} must be an object`);
  adaptiveCheck(Object.keys(object).every(key => keys.includes(key)), `Unknown ${name} field`);
};
const feedbackRateKeys = ['heardGain', 'dismissedLoss', 'keptGain', 'missedLoss', 'capacityLoss'];
const handlingKinds = ['respectful', 'dismissive', 'unknown'];

function validateExperience(experience) {
  adaptiveKeys(experience, ['A', 'B'], 'experience');
  for (const id of ['A', 'B']) {
    adaptiveKeys(experience[id], ['handling', 'deliveryFraction'], 'participant experience');
    adaptiveCheck(handlingKinds.includes(experience[id].handling), 'Unknown request handling');
    adaptiveUnit(experience[id].deliveryFraction, 'deliveryFraction');
  }
}

export function validateAdaptiveHousehold(input) {
  adaptiveKeys(input, ['protocol', 'id', 'material', 'feedback', 'experience', 'experienceEvents'], 'adaptive scenario');
  adaptiveCheck(input.protocol === 'the-field/household-scenario/2', 'Unsupported adaptive protocol');
  adaptiveCheck(typeof input.id === 'string' && input.id.length > 0, 'Adaptive id required');
  validateHousehold(input.material);
  adaptiveKeys(input.feedback, ['enabled', 'A', 'B'], 'feedback');
  adaptiveCheck(typeof input.feedback.enabled === 'boolean', 'Explicit feedback switch required');
  for (const id of ['A', 'B']) {
    adaptiveKeys(input.feedback[id], feedbackRateKeys, 'feedback rates');
    for (const key of feedbackRateKeys) adaptiveUnit(input.feedback[id][key], key);
  }
  validateExperience(input.experience);
  adaptiveCheck(Array.isArray(input.experienceEvents) && input.experienceEvents.length <= 100, 'Bounded experience events required');
  const ids = new Set();
  const fields = new Set();
  for (const event of input.experienceEvents) {
    adaptiveKeys(event, ['id', 'period', 'person', 'handling', 'deliveryFraction', 'outreach'], 'experience event');
    adaptiveCheck(typeof event.id === 'string' && !ids.has(event.id), 'Unique experience event id required');
    ids.add(event.id);
    adaptiveCheck(Number.isInteger(event.period) && event.period >= 1 && event.period <= input.material.periods, 'Experience event outside horizon');
    adaptiveCheck(['A', 'B'].includes(event.person), 'Experience event person must be A or B');
    adaptiveCheck(['handling', 'deliveryFraction', 'outreach'].some(key => event[key] !== undefined), 'Empty experience event');
    for (const key of ['handling', 'deliveryFraction', 'outreach']) if (event[key] !== undefined) {
      const field = `${event.period}:${event.person}:${key}`;
      adaptiveCheck(!fields.has(field), 'Conflicting experience events');
      fields.add(field);
    }
    if (event.handling !== undefined) adaptiveCheck(handlingKinds.includes(event.handling), 'Unknown event handling');
    if (event.deliveryFraction !== undefined) adaptiveUnit(event.deliveryFraction, 'event deliveryFraction');
    if (event.outreach !== undefined) adaptiveCheck(event.outreach === 'respectful', 'Outreach must explicitly be respectful');
  }
  return input;
}

export function createAdaptiveHousehold(materialFixture, adaptiveFixture, orientation = 'roles', change = 'values', profile = 'constructive') {
  adaptiveCheck(adaptiveFixture.protocol === 'the-field/household-fixture/2', 'Unsupported adaptive fixture');
  const selected = adaptiveFixture.profiles.find(item => item.id === profile);
  adaptiveCheck(selected, 'Unknown experience profile');
  const input = { protocol: 'the-field/household-scenario/2', id: `${orientation}/${change}/${profile}`,
    material: createHouseholdScenario(materialFixture, orientation, change),
    feedback: adaptiveClone(adaptiveFixture.feedback), experience: adaptiveClone(adaptiveFixture.experience),
    experienceEvents: adaptiveClone(selected.events) };
  validateAdaptiveHousehold(input);
  return input;
}

export function updateHouseholdWillingness(current, kind, rates, enabled = true) {
  adaptiveUnit(current, 'current willingness');
  for (const key of feedbackRateKeys) adaptiveUnit(rates[key], key);
  adaptiveCheck(typeof enabled === 'boolean', 'Feedback enabled must be boolean');
  const effects = {
    heard: ['heardGain', 1], outreach: ['heardGain', 1], dismissed: ['dismissedLoss', -1],
    kept: ['keptGain', 1], 'implementation-shortfall': ['missedLoss', -1],
    'capacity-shortfall': ['capacityLoss', -1], unknown: [null, 0],
    'mixed-shortfall': [null, 0], superseded: [null, 0], 'no-task-due': [null, 0],
  };
  adaptiveCheck(Object.hasOwn(effects, kind), 'Unknown willingness evidence');
  const [rateKey, direction] = effects[kind];
  if (!enabled || !rateKey) return current;
  const rate = rates[rateKey];
  return direction > 0 ? current + rate * (1 - current) : current * (1 - rate);
}

function executeDelivery(plan, person, deliveryFraction) {
  if (deliveryFraction === 1) return { ...plan, plannedDomestic: plan.domestic, deliveryFraction };
  const domestic = plan.domestic * deliveryFraction;
  // Non-implementation frees time; it does not create extra hours. Remaining
  // time follows v1's paid-work target and free-time priority.
  const paid = Math.min(person.values.paidHours, plan.paid + plan.domestic - domestic);
  const free = person.capacity - plan.reviewHours - domestic - paid;
  const gaps = { ...plan.gaps, paid: person.values.paidHours - paid, free: Math.max(0, person.values.freeHours - free) };
  const within = { ...plan.within, paid: gaps.paid <= person.values.paidTolerance + 1e-8, free: gaps.free <= 1e-8 };
  return { ...plan, plannedDomestic: plan.domestic, domestic, paid, free,
    unusedAssignment: plan.domesticDue - domestic, income: paid * person.wage,
    deliveryFraction, gaps, within, goalsWithinBounds: Object.values(within).every(Boolean) };
}

export function simulateAdaptiveHousehold(input) {
  validateAdaptiveHousehold(input);
  const state = adaptiveClone(input.material.initial);
  const experience = adaptiveClone(input.experience);
  const history = [];
  const evidence = [];
  const agreements = [{ id: 'initial-agreement', signedAt: 0, firstDue: 1, shareA: state.shareA, endedAt: null }];
  let activeAgreement = agreements[0];
  let backlog = 0;
  const materialEvents = [...input.material.events].sort((a, b) => a.period - b.period || a.id.localeCompare(b.id));
  const experienceEvents = [...input.experienceEvents].sort((a, b) => a.period - b.period || a.id.localeCompare(b.id));
  for (let period = 1; period <= input.material.periods; period++) {
    const appliedEvents = materialEvents.filter(event => event.period === period);
    for (const event of appliedEvents) patchHouseholdState(state, event.patch);
    const appliedExperience = experienceEvents.filter(event => event.period === period);
    for (const event of appliedExperience) {
      for (const key of ['handling', 'deliveryFraction']) if (event[key] !== undefined) experience[event.person][key] = event[key];
    }
    const opening = Object.fromEntries(state.people.map(person => [person.id, person.willingness]));
    const assumptions = adaptiveClone(state.people);
    const priorBacklog = backlog;
    const demand = state.domesticHours + backlog;
    let review = negotiateHouseholdState(state, demand, input.material.policy, period);
    const requester = review.requester;
    const responder = requester === 'A' ? 'B' : 'A';
    const requestVoiced = requester !== null && opening[requester] > 0;
    if (requestVoiced && experience[responder].handling === 'dismissive') {
      review = { ...review, status: 'request-dismissed', shareA: state.shareA, reviewHours: 0, candidates: 0, assent: [] };
    }
    const periodEvidence = [];
    const record = (id, observer, actor, kind, source, details = {}) => {
      adaptiveCheck(!evidence.some(item => item.id === id), 'Duplicate causal experience');
      const row = { id, period, observer, actor, kind, source, claimType: 'synthetic-assumption', ...details };
      evidence.push(row); periodEvidence.push(row);
    };
    if (requestVoiced) {
      const handling = experience[responder].handling;
      record(`request-${period}`, requester, responder,
        handling === 'respectful' ? 'heard' : handling === 'dismissive' ? 'dismissed' : 'unknown', 'request-response',
        { reviewStatus: review.status, requestedRemedyGranted: review.status === 'revised' });
    }
    for (const event of appliedExperience.filter(event => event.outreach)) {
      const heard = periodEvidence.find(item => item.observer === event.person && item.kind === 'heard');
      // One invitation/response interaction must not receive two hearing gains.
      if (heard) (heard.outreachEventIds ??= []).push(event.id);
      else record(`outreach-${event.id}`, event.person, event.person === 'A' ? 'B' : 'A', 'outreach', 'explicit-outreach');
    }
    const previousShareA = state.shareA;
    state.shareA = review.shareA;
    const commitmentOutcomes = [];
    if (review.status === 'revised') {
      activeAgreement.endedAt = period;
      // A mutual revision supersedes the earlier allocation; it is not a breach.
      for (const owner of ['A', 'B']) commitmentOutcomes.push({ agreementId: activeAgreement.id, owner, kind: 'superseded' });
      activeAgreement = { id: `agreement-${period}`, signedAt: period, firstDue: period, shareA: state.shareA, endedAt: null };
      agreements.push(activeAgreement);
    }
    const plans = evaluateAllocation(state.people, state.shareA, demand, review.reviewHours);
    const people = plans.map((plan, i) => executeDelivery(plan, state.people[i], experience[plan.id].deliveryFraction));
    if (period >= activeAgreement.firstDue) {
      for (const person of people) {
        const capacityLimited = person.plannedDomestic + 1e-8 < person.domesticDue;
        const implementationLimited = person.domestic + 1e-8 < person.plannedDomestic;
        const kind = person.domesticDue <= 1e-8 ? 'no-task-due'
          : capacityLimited && implementationLimited ? 'mixed-shortfall'
          : capacityLimited ? 'capacity-shortfall' : implementationLimited ? 'implementation-shortfall' : 'kept';
        const outcome = { agreementId: activeAgreement.id, owner: person.id, kind,
          due: person.domesticDue, achievable: person.plannedDomestic, delivered: person.domestic,
          capacityLimited, implementationLimited };
        commitmentOutcomes.push(outcome);
        record(`delivery-${period}-${person.id}`, person.id === 'A' ? 'B' : 'A', person.id, kind,
          'agreement-execution', outcome);
      }
    }
    const completed = people.reduce((sum, person) => sum + person.domestic, 0);
    backlog = Math.max(0, demand - completed);
    const openingReserve = state.reserve;
    const income = people.reduce((sum, person) => sum + person.income, 0);
    const spent = Math.min(state.expenses, openingReserve + income);
    state.reserve = openingReserve + income - spent;
    const willingnessUpdates = [];
    for (const item of periodEvidence) {
      const person = state.people.find(person => person.id === item.observer);
      const before = person.willingness;
      person.willingness = updateHouseholdWillingness(before, item.kind, input.feedback[person.id], input.feedback.enabled);
      willingnessUpdates.push({ evidenceId: item.id, person: person.id, kind: item.kind,
        before, after: person.willingness, delta: person.willingness - before });
    }
    history.push({ period, appliedEvents: appliedEvents.map(event => event.id),
      appliedExperienceEvents: appliedExperience.map(event => event.id), assumptions,
      experience: adaptiveClone(experience), recurringDemand: state.domesticHours,
      priorBacklog, demand, completed, backlog, previousShareA, shareA: state.shareA,
      review: { ...review, requestVoiced }, people, openingReserve, income,
      expensesDue: state.expenses, spent, unmetExpenses: state.expenses - spent, reserve: state.reserve,
      cumulativeUnmetExpenses: (history.at(-1)?.cumulativeUnmetExpenses ?? 0) + state.expenses - spent,
      willingnessOpening: opening,
      willingnessClosing: Object.fromEntries(state.people.map(person => [person.id, person.willingness])),
      willingnessUpdates, evidence: adaptiveClone(periodEvidence), commitmentOutcomes,
      standing: { A: 'unchanged', B: 'unchanged' }, trust: { AtoB: null, BtoA: null } });
  }
  return { protocol: 'the-field/household-run/2', id: input.id,
    status: 'synthetic-feedback-not-human-prediction', history, agreements, evidence };
}
