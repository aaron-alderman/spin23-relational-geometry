import assert from "node:assert/strict";

const weight = ({ minus = [], plusOnly = null }) => plusOnly === null
  ? Array.from({ length: 5 }, (_, i) => minus.includes(i + 1) ? -1 : 1)
  : Array.from({ length: 5 }, (_, i) => plusOnly === i + 1 ? 1 : -1);
const states = [];
for (let i = 1; i <= 3; i += 1) {
  states.push({ field: `d_${i}`, q: weight({ minus: [i, 4] }) });
  states.push({ field: `u_${i}`, q: weight({ minus: [i, 5] }) });
  states.push({ field: `u^c_${i}`, q: weight({ minus: [1, 2, 3].filter((j) => j !== i) }) });
  states.push({ field: `d^c_${i}`, q: weight({ plusOnly: i }) });
}
states.push({ field: "nu", q: weight({ plusOnly: 4 }) });
states.push({ field: "e", q: weight({ plusOnly: 5 }) });
states.push({ field: "e^c", q: weight({ minus: [4, 5] }) });
states.push({ field: "nu^c", q: weight({ minus: [] }) });

const q0 = states.find(({ field }) => field === "nu^c");
const physical = states.filter((state) => state !== q0);
const add = (...vectors) => Array.from({ length: 5 }, (_, i) => vectors.reduce((s, v) => s + v[i], 0));
const scale = (a, vector) => vector.map((x) => a * x);
const equal = (a, b) => a.every((x, i) => x === b[i]);
const isVectorWeight = (v) => v.filter((x) => Math.abs(x) === 2).length === 1 && v.filter((x) => x === 0).length === 4;
const isD5Root = (v) => v.filter((x) => Math.abs(x) === 2).length === 2 && v.filter((x) => x === 0).length === 3;
const isStandardModelRoot = (v) => {
  const support = v.map((x, i) => ({ x, i: i + 1 })).filter(({ x }) => x !== 0);
  if (support.length !== 2 || support[0].x !== -support[1].x) return false;
  return (support[0].i <= 3 && support[1].i <= 3) || (support[0].i >= 4 && support[1].i >= 4);
};
const coordinate = (v) => v.findIndex((x) => Math.abs(x) === 2) + 1;
const type = (field) => field.replace(/_\d$/, "");
const index = (field) => Number(field.match(/_(\d)$/)?.[1] ?? 0);

const logicals = [];
for (let i = 0; i < physical.length; i += 1) for (let j = i + 1; j < physical.length; j += 1) for (let k = j + 1; k < physical.length; k += 1) {
  const triple = [physical[i], physical[j], physical[k]];
  for (const a of [-1, 1]) for (const b of [-1, 1]) for (const c of [-1, 1]) {
    if (equal(add(scale(a, triple[0].q), scale(b, triple[1].q), scale(c, triple[2].q)), q0.q)) {
      logicals.push({ triple, signs: [a, b, c] });
    }
  }
}
assert.equal(logicals.length, 25);

const classify = ({ triple, signs }) => {
  const entries = triple.map((state, i) => ({ ...state, sign: signs[i], type: type(state.field), index: index(state.field) }));
  const byType = (name) => entries.filter((entry) => entry.type === name);
  const one = (name) => byType(name)[0];
  if (one("nu") && one("u") && one("u^c") && one("u").index === one("u^c").index
      && one("u").sign === 1 && one("u^c").sign === 1 && one("nu").sign === -1) return "up_dirac";
  if (one("nu") && one("d") && one("d^c") && one("d").index === one("d^c").index
      && entries.every((entry) => entry.sign === -1)) return "down_dirac";
  if (one("nu") && one("e") && one("e^c") && entries.every((entry) => entry.sign === -1)) return "lepton_dirac";
  if (one("e^c") && one("u^c") && one("d^c") && one("u^c").index === one("d^c").index
      && one("e^c").sign === 1 && one("u^c").sign === 1 && one("d^c").sign === -1) return "right_handed_current";
  if (one("d") && one("u^c") && one("e") && one("d").index === one("u^c").index
      && one("d").sign === 1 && one("u^c").sign === 1 && one("e").sign === -1) return "mixed_current";
  if (one("d") && one("u") && one("d^c") && new Set(entries.map((entry) => entry.index)).size === 3
      && one("d").sign === 1 && one("u").sign === 1 && one("d^c").sign === -1) return "delta_b_equals_delta_l_left";
  if (byType("d^c").length === 2 && one("u^c") && new Set(entries.map((entry) => entry.index)).size === 3
      && entries.every((entry) => entry.sign === -1)) return "delta_b_equals_delta_l_right";
  if (one("u") && one("d^c") && one("e") && one("u").index === one("d^c").index
      && entries.every((entry) => entry.sign === -1)) return "scalar_charged_current";
  throw new Error(`unclassified relation: ${entries.map((entry) => `${entry.sign}:${entry.field}`).join(",")}`);
};

const categoryCounts = new Map();
const channelClasses = new Map();
let gaugeExchangeCount = 0;
let brokenGaugeExchangeCount = 0;
for (const logical of logicals) {
  const category = classify(logical);
  categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
  const signed = [{ coefficient: 1, state: q0 }, ...logical.triple.map((state, i) => ({ coefficient: -logical.signs[i], state }))];
  const positive = signed.filter(({ coefficient }) => coefficient === 1).map(({ state }) => state);
  const negative = signed.filter(({ coefficient }) => coefficient === -1).map(({ state }) => state);
  const mediatorCoordinates = [];
  if (positive.length === 2) {
    const v = add(positive[0].q, positive[1].q);
    assert(equal(v, add(negative[0].q, negative[1].q)) && isVectorWeight(v));
    mediatorCoordinates.push(coordinate(v));

    const gaugePairings = [negative, [negative[1], negative[0]]];
    const validPairing = gaugePairings.find((pairing) => positive.every((state, i) => isD5Root(add(state.q, scale(-1, pairing[i].q)))));
    assert(validPairing);
    const punctureIndex = positive.indexOf(q0);
    const punctureRoot = add(q0.q, scale(-1, validPairing[punctureIndex].q));
    assert(isD5Root(punctureRoot) && !isStandardModelRoot(punctureRoot));
    gaugeExchangeCount += 1;
    brokenGaugeExchangeCount += 1;
  } else {
    assert.equal(positive.length, 4);
    for (const partner of positive.filter((state) => state !== q0)) {
      const v = add(q0.q, partner.q);
      if (!isVectorWeight(v)) continue;
      const rest = positive.filter((state) => state !== q0 && state !== partner);
      if (equal(add(rest[0].q, rest[1].q), scale(-1, v))) mediatorCoordinates.push(coordinate(v));
    }
  }
  assert(mediatorCoordinates.length > 0);
  const channelClass = mediatorCoordinates.every((i) => i <= 3) ? "color_only"
    : mediatorCoordinates.every((i) => i >= 4) ? "weak_only" : "mixed_alternative";
  const key = `${category}:${channelClass}`;
  channelClasses.set(key, (channelClasses.get(key) ?? 0) + 1);
}

assert.deepEqual(Object.fromEntries(categoryCounts), {
  down_dirac: 3,
  up_dirac: 3,
  mixed_current: 3,
  right_handed_current: 3,
  delta_b_equals_delta_l_left: 6,
  delta_b_equals_delta_l_right: 3,
  scalar_charged_current: 3,
  lepton_dirac: 1,
});
assert.deepEqual(Object.fromEntries(channelClasses), {
  "down_dirac:mixed_alternative": 3,
  "up_dirac:weak_only": 3,
  "mixed_current:weak_only": 3,
  "right_handed_current:color_only": 3,
  "delta_b_equals_delta_l_left:color_only": 6,
  "delta_b_equals_delta_l_right:color_only": 3,
  "scalar_charged_current:mixed_alternative": 3,
  "lepton_dirac:weak_only": 1,
});
assert.equal(gaugeExchangeCount, 15);
assert.equal(brokenGaugeExchangeCount, 15);

console.log("Twenty-five logical operator taxonomy and SO(10) exchange audit: PASS");
console.log("types=3_up_Dirac+3_down_Dirac+1_lepton_Dirac+3_RH_current+3_mixed+6_BL_left+3_BL_right+3_scalar_current");
console.log("scalar_10_exchange=25 gauge_45_exchange=15");
console.log("all_15_gauge_routes_use_broken_SO10_over_SM_roots_at_the_nu_c_vertex");
console.log("weak_only=7 color_only=12 mixed_alternative=6");
console.log("nine_baryon_violating_plus_three_RH_currents_require_colored_triplet");
console.log("Cartan_neutral_components_require_full_gauge_multiplet_contractions");
