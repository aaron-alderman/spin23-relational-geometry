import assert from "node:assert/strict";

const signWeight = ({ minus = [], plusOnly = null }) => plusOnly === null
  ? Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1)
  : Array.from({ length: 5 }, (_, i) => plusOnly === i + 1 ? 1 : -1);

const states = [];
for (let color = 1; color <= 3; color += 1) {
  states.push({ field: `d_${color}`, q: signWeight({ minus: [color, 4] }) });
  states.push({ field: `u_${color}`, q: signWeight({ minus: [color, 5] }) });
  states.push({ field: `u^c_${color}`, q: signWeight({ minus: [1, 2, 3].filter((i) => i !== color) }) });
  states.push({ field: `d^c_${color}`, q: signWeight({ plusOnly: color }) });
}
states.push({ field: "nu", q: signWeight({ plusOnly: 4 }) });
states.push({ field: "e", q: signWeight({ plusOnly: 5 }) });
states.push({ field: "e^c", q: signWeight({ minus: [4, 5] }) });
states.push({ field: "nu^c", q: signWeight({ minus: [] }) });

const puncture = states.find(({ field }) => field === "nu^c");
const physical = states.filter((state) => state !== puncture);
const equal = (a, b) => a.every((x, i) => x === b[i]);
const sum = (...vectors) => Array.from({ length: 5 }, (_, i) => vectors.reduce((s, vector) => s + vector[i], 0));
const scale = (a, vector) => vector.map((x) => a * x);
const isVectorWeight = (vector) => vector.filter((x) => Math.abs(x) === 2).length === 1
  && vector.filter((x) => x === 0).length === 4;
const vectorCoordinate = (vector) => vector.findIndex((x) => Math.abs(x) === 2) + 1;

const logicals = [];
for (let i = 0; i < physical.length; i += 1) {
  for (let j = i + 1; j < physical.length; j += 1) {
    for (let k = j + 1; k < physical.length; k += 1) {
      const triple = [physical[i], physical[j], physical[k]];
      for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) {
        if (equal(sum(scale(a, triple[0].q), scale(b, triple[1].q), scale(c, triple[2].q)), puncture.q)) {
          logicals.push({ triple, signs: [a, b, c] });
        }
      }
    }
  }
}

assert.equal(logicals.length, 25);
const profileCounts = { difference: 0, zeroSum: 0 };
const coordinateCounts = new Map();
const factorizationMultiplicities = new Map();
const smChannelClasses = { colorOnly: 0, weakOnly: 0, mixedAlternative: 0 };

for (const { triple, signs } of logicals) {
  // q0 - sum_i signs_i q_i = 0.
  const signed = [{ coefficient: 1, state: puncture }, ...triple.map((state, i) => ({ coefficient: -signs[i], state }))];
  const positive = signed.filter(({ coefficient }) => coefficient === 1).map(({ state }) => state);
  const negative = signed.filter(({ coefficient }) => coefficient === -1).map(({ state }) => state);
  const mediators = [];

  if (positive.length === 2 && negative.length === 2) {
    profileCounts.difference += 1;
    const positiveSum = sum(positive[0].q, positive[1].q);
    const negativeSum = sum(negative[0].q, negative[1].q);
    assert(equal(positiveSum, negativeSum));
    assert(isVectorWeight(positiveSum));
    mediators.push(positiveSum);
  } else {
    assert.equal(positive.length, 4);
    assert.equal(negative.length, 0);
    profileCounts.zeroSum += 1;
    for (const puncturePartner of positive.filter((state) => state !== puncture)) {
      const candidate = sum(puncture.q, puncturePartner.q);
      if (!isVectorWeight(candidate)) continue;
      const otherPair = positive.filter((state) => state !== puncture && state !== puncturePartner);
      if (equal(sum(otherPair[0].q, otherPair[1].q), scale(-1, candidate))) mediators.push(candidate);
    }
    assert(mediators.length > 0, "zero-sum quartet must factor through at least one vector-weight pair");
  }

  for (const mediator of mediators) {
    const coordinate = vectorCoordinate(mediator);
    coordinateCounts.set(coordinate, (coordinateCounts.get(coordinate) ?? 0) + 1);
  }
  factorizationMultiplicities.set(mediators.length, (factorizationMultiplicities.get(mediators.length) ?? 0) + 1);
  const coordinates = mediators.map(vectorCoordinate);
  if (coordinates.every((coordinate) => coordinate <= 3)) smChannelClasses.colorOnly += 1;
  else if (coordinates.every((coordinate) => coordinate >= 4)) smChannelClasses.weakOnly += 1;
  else smChannelClasses.mixedAlternative += 1;
}

assert.deepEqual(profileCounts, { difference: 15, zeroSum: 10 });
assert.deepEqual(Object.fromEntries([...coordinateCounts].sort(([a], [b]) => a - b)), { 1: 7, 2: 7, 3: 7, 4: 7, 5: 7 });
assert.deepEqual(Object.fromEntries([...factorizationMultiplicities].sort(([a], [b]) => a - b)), { 1: 15, 2: 10 });
assert.deepEqual(smChannelClasses, { colorOnly: 12, weakOnly: 7, mixedAlternative: 6 });

console.log("All minimum logicals factor through the SO(10) vector 10: PASS");
console.log("logical_supports=25 difference_channels=15 zero_sum_channels=10");
console.log("mediator_weights=plus_or_minus_2e_i_for_i_1_through_5");
console.log("mediator_coordinate_incidences=7,7,7,7,7");
console.log("factorization_multiplicity=15_unique_plus_10_double");
console.log("sm_3_plus_2_channel_classes=" + JSON.stringify(smChannelClasses));
console.log("interpretation=two_spinor_bilinears_share_or_exchange_one_vector_10_weight");
