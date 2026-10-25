import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/local-z2-inversion-gauge-module-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
const N = evidence.clockOrder;
const mod = (x) => ((x % N) + N) % N;
const key = ([a, s, b]) => `${a},${s},${b}`;
const GL = ([a, s, b]) => [mod(-a), -s, b];
const GR = ([a, s, b]) => [a, -s, mod(-b)];
const both = (state) => GL(GR(state));
const actions = [(x) => x, GL, GR, both];
const bondSatisfied = ([a, s, b]) => b === mod(s * a);

const states = [];
for (let a = 0; a < N; a += 1) for (const s of [-1, 1]) for (let b = 0; b < N; b += 1) states.push([a, s, b]);
assert.equal(states.length, evidence.finiteCertificateTargets.rawBasisStates);

for (const state of states) {
  assert.deepEqual(GL(GL(state)), state);
  assert.deepEqual(GR(GR(state)), state);
  assert.deepEqual(GL(GR(state)), GR(GL(state)));
  for (const action of actions) assert.equal(bondSatisfied(action(state)), bondSatisfied(state), "bond projector must be gauge invariant");
}

function orbitCount(subset) {
  const allowed = new Set(subset.map(key));
  const seen = new Set();
  let count = 0;
  for (const state of subset) {
    if (seen.has(key(state))) continue;
    count += 1;
    for (const action of actions) {
      const image = action(state);
      assert.ok(allowed.has(key(image)), "subset is not gauge stable");
      seen.add(key(image));
    }
  }
  return count;
}

const satisfied = states.filter(bondSatisfied);
assert.equal(orbitCount(states), evidence.finiteCertificateTargets.gaugeOrbits);
assert.equal(satisfied.length, evidence.finiteCertificateTargets.bondSatisfiedStates);
assert.equal(orbitCount(satisfied), evidence.finiteCertificateTargets.bondSatisfiedGaugeOrbits);

const closureCount = (holonomy) => Array.from({length: N}, (_, a) => a).filter((a) => a === mod(holonomy * a)).length;
assert.equal(closureCount(1), evidence.finiteCertificateTargets.untwistedRingClosureLabels);
assert.equal(closureCount(-1), evidence.finiteCertificateTargets.inversionTwistedRingClosureLabels);

const inverseOrbits = [];
const used = new Set();
for (let a = 0; a < N; a += 1) {
  if (used.has(a)) continue;
  const orbit = [...new Set([a, mod(-a)])].sort((x, y) => x - y);
  orbit.forEach((x) => used.add(x));
  inverseOrbits.push(orbit);
}
assert.deepEqual(inverseOrbits.map((orbit) => orbit.length), [1, ...Array(11).fill(2)]);

console.log(JSON.stringify({
  status: "PASS",
  clockOrder: N,
  rawStates: states.length,
  gaugeOrbits: orbitCount(states),
  bondSatisfiedStates: satisfied.length,
  bondSatisfiedGaugeOrbits: orbitCount(satisfied),
  inversionLabelOrbits: inverseOrbits.length,
  twistedClosureLabels: closureCount(-1),
  next: evidence.promotion.next
}));
