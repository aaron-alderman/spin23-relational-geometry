import assert from "node:assert/strict";

const plus = ["PN", "NI", "IP"];
const minus = ["NP", "PI", "IN"];
const all = [...plus, ...minus];
const idxPlus = Object.fromEntries(plus.map((x, i) => [x, i]));
const idxMinus = Object.fromEntries(minus.map((x, i) => [x, i]));

const r = Object.fromEntries([
  ...plus.map((x, i) => [x, plus[(i + 1) % 3]]),
  ...minus.map((x, i) => [x, minus[(i + 1) % 3]]),
]);
const identity = Object.fromEntries(all.map((x) => [x, x]));
const compose = (f, g) => Object.fromEntries(all.map((x) => [x, f[g[x]]]));
const equalMap = (f, g) => all.every((x) => f[x] === g[x]);
const power = (f, n) => {
  let out = identity;
  for (let i = 0; i < n; i += 1) out = compose(f, out);
  return out;
};
const order = (f) => {
  for (let n = 1; n <= 12; n += 1) if (equalMap(power(f, n), identity)) return n;
  return null;
};
const firstOrderAllowed = (x, y) => x[0] === y[0] || x[1] === y[1];

const deltas = [0, 1, 2].map((shift) => {
  const delta = {};
  for (const x of plus) {
    const i = idxPlus[x];
    delta[x] = minus[(i + shift) % 3];
  }
  for (const y of minus) {
    const j = idxMinus[y];
    delta[y] = plus[(j - shift + 3) % 3];
  }
  assert.ok(equalMap(power(delta, 2), identity));
  assert.ok(equalMap(compose(delta, r), compose(r, delta)));
  const pairs = plus.map((x) => {
    const y = delta[x];
    return { pair: x + "<->" + y, firstOrderAllowed: firstOrderAllowed(x, y) };
  });
  assert.equal(pairs.filter((x) => x.firstOrderAllowed).length, 2);
  assert.equal(pairs.filter((x) => !x.firstOrderAllowed).length, 1);
  const lift = compose(delta, r);
  assert.equal(order(lift), 6);
  return { shift, pairs, liftOrder: order(lift) };
});

const J = { PN: "NP", NP: "PN", NI: "IN", IN: "NI", IP: "PI", PI: "IP" };
assert.ok(deltas.every(({ shift }) => {
  const delta = {};
  for (const x of plus) delta[x] = minus[(idxPlus[x] + shift) % 3];
  for (const y of minus) delta[y] = plus[(idxMinus[y] - shift + 3) % 3];
  return !equalMap(delta, J);
}));

const result = {
  protocol: "parallel-deck-involutions-first-order-obstruction/1",
  naturalRotationCycles: { plus, minus },
  commutingDeckInvolutionCount: deltas.length,
  candidates: deltas,
  realityEqualsAnyParallelDeck: false,
  theorem:
    "Exactly three sheet-exchanging involutions commute with the natural compositional rotation. Each makes delta r an order-six cycle, but every candidate contains exactly one diagonal relation-reversal pair forbidden as a complex-linear first-order edge.",
  consequence:
    "No parallel deck involution can be implemented wholly by allowed first-order linear arrows. A Mobius lift using delta must remain structural/categorical, use a generalized non-first-order sector, or acquire extra mediator data.",
  passed: true,
};

console.log(JSON.stringify(result, null, 2));
