import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const recordPath = path.join(root, "corpus/programmes/dynatology/golden_golay_pixelation_v1.json");
const record = JSON.parse(fs.readFileSync(recordPath, "utf8"));
const mod = (x, n) => ((x % n) + n) % n;
const mod3 = (x) => mod(x, 3);
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const pow = (A, n) => {
  let out = [[1, 0], [0, 1]];
  for (let i = 0; i < n; i += 1) out = mul(out, A);
  return out;
};
const gcd = (a, b) => b === 0 ? Math.abs(a) : gcd(b, a % b);
const syndrome = (H, e) => H.map((row) => mod3(row.reduce((sum, x, i) => sum + x * e[i], 0)));
const key = (vector) => vector.join("");

assert.equal(record.schema, "dynatology-golden-golay-pixelation/1");
assert.equal(record.openGate.status, "resolved_by_equivariant_successor_no_go");
assert.ok(fs.existsSync(path.join(path.dirname(recordPath), record.openGate.resolutionRecord)));
const golden = record.goldenTransformation;
assert.deepEqual(pow(golden.matrixS, golden.iterate), golden.matrixS5);
assert.equal(golden.matrixS5[0][0] + golden.matrixS5[1][1], golden.trace);
assert.equal(golden.matrixS5[0][0] * golden.matrixS5[1][1] - golden.matrixS5[0][1] * golden.matrixS5[1][0], golden.determinant);
const phi = (1 + Math.sqrt(5)) / 2;
const residual = 55 / phi ** 2 - 21;
assert.ok(Math.abs(residual - phi ** -10) < 1e-14);
assert.ok(Math.abs((34 - 55 / phi) - phi ** -10) < 1e-14);
assert.ok(Math.abs(residual - golden.residualApproximation) < 1e-14);
assert.ok(Math.abs(360 * residual / 55 - golden.perStepAngularErrorDegrees) < 1e-12);

const golay = record.ternaryGolayPixelation;
const H = golay.parityCheckRows;
const errors = [Array(11).fill(0)];
for (let i = 0; i < 11; i += 1) {
  for (const value of [1, 2]) {
    const e = Array(11).fill(0); e[i] = value; errors.push(e);
  }
}
for (let i = 0; i < 11; i += 1) {
  for (let j = i + 1; j < 11; j += 1) {
    for (const a of [1, 2]) for (const b of [1, 2]) {
      const e = Array(11).fill(0); e[i] = a; e[j] = b; errors.push(e);
    }
  }
}
assert.equal(errors.length, 243);
const syndromeMap = new Map(errors.map((error) => [key(syndrome(H, error)), error]));
assert.equal(syndromeMap.size, 3 ** 5, "every syndrome must decode to one unique radius-two error");
assert.equal(golay.radiusTwoBall.coordinatePairSupports, 11 * 10 / 2);
assert.equal(golay.radiusTwoBall.weightTwo, golay.radiusTwoBall.coordinatePairSupports * 4);
assert.equal(golay.radiusTwoBall.total, 1 + 22 + 220);
assert.equal(golay.codewordCount * golay.radiusTwoBall.total, golay.ambientVectorCount);
assert.equal(golay.llmRequired, false);

assert.equal(mod(21 * 21, 55), 1);
assert.equal(mod(34 * 34, 55), 1);
assert.equal(mod(21 * 34, 55), 54);
assert.equal(gcd(21, 55), 1);
assert.equal(gcd(34, 55), 1);
const traversal = (step) => {
  const seen = new Set(); let x = 0;
  while (!seen.has(x)) { seen.add(x); x = mod(x + step, 55); }
  return seen.size;
};
assert.equal(traversal(21), 55);
assert.equal(traversal(34), 55);
// Multiplication by 21 is its own inverse and conjugates +21 to +1:
// 21 * ((21*x)+21) = x+1 mod 55.
for (let x = 0; x < 55; x += 1) {
  assert.equal(mod(21 * (mod(21 * x, 55) + 21), 55), mod(x + 1, 55));
}

// No permutation of eleven coordinates has order 55. Enumerate every cycle
// partition of 11 and check the lcm of its parts.
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);
const partitions = (total, max = total) => {
  if (total === 0) return [[]];
  const out = [];
  for (let part = Math.min(total, max); part >= 1; part -= 1) {
    for (const tail of partitions(total - part, part)) out.push([part, ...tail]);
  }
  return out;
};
const cycleOrders = new Set(partitions(11).map((parts) => parts.reduce(lcm, 1)));
assert.ok(!cycleOrders.has(55));
assert.equal(record.golaySymmetryNoGo.coordinateOrder55Possible, false);

const scheduler = record.schedulerCompiler;
const circuit = scheduler.vertexCircuit;
assert.equal(circuit.length, 56);
assert.equal(circuit[0], circuit.at(-1));
const supportKey = (a, b) => [Math.min(a, b), Math.max(a, b)].join("-");
const supports = circuit.slice(0, -1).map((vertex, i) => [vertex, circuit[i + 1]]);
const supportSet = new Set(supports.map(([a, b]) => supportKey(a, b)));
assert.equal(supportSet.size, 55);
for (let i = 0; i < 11; i += 1) for (let j = i + 1; j < 11; j += 1) {
  assert.ok(supportSet.has(supportKey(i, j)), `scheduler missing support ${i}-${j}`);
}
const labels = supports.map((_, i) => mod(21 * i, 55));
assert.equal(new Set(labels).size, 55);
for (let i = 0; i < labels.length; i += 1) {
  assert.equal(mod(labels[(i + 1) % 55] - labels[i], 55), 21);
  const left = new Set(supports[i]);
  const right = new Set(supports[(i + 1) % 55]);
  const intersection = [...left].filter((x) => right.has(x));
  const symmetricDifference = [...left, ...right].filter((x) => !(left.has(x) && right.has(x)));
  assert.equal(intersection.length, 1);
  assert.equal(symmetricDifference.length, 2);
}
assert.equal(scheduler.sharedCoordinateTransitions, 55);
assert.equal(scheduler.randomCyclicOrderingExpectedSharedTransitions, "55/3");

const signedScheduler = record.signedDoubleErrorScheduler;
const signedStates = [];
for (const [a, b] of supports) {
  for (const [valueA, valueB] of signedScheduler.perOrientedSupportGrayPath) {
    const state = Array(11).fill(0);
    state[a] = valueA;
    state[b] = valueB;
    signedStates.push(state);
  }
}
assert.equal(signedStates.length, 220);
assert.equal(new Set(signedStates.map(key)).size, 220);
assert.equal(new Set(signedStates.map((state) => key(syndrome(H, state)))).size, 220);
const transitionCensus = {1: 0, 2: 0, beyond: 0};
for (let i = 0; i < signedStates.length; i += 1) {
  const left = signedStates[i];
  const right = signedStates[(i + 1) % signedStates.length];
  const distance = left.filter((value, j) => value !== right[j]).length;
  if (distance === 1 || distance === 2) transitionCensus[distance] += 1;
  else transitionCensus.beyond += 1;
}
assert.deepEqual(transitionCensus, {1: 165, 2: 55, beyond: 0});
assert.equal(signedScheduler.uniqueSyndromes, 220);
assert.equal(signedScheduler.cyclicTransitionCensus.hammingDistanceOne, transitionCensus[1]);
assert.equal(signedScheduler.cyclicTransitionCensus.hammingDistanceTwo, transitionCensus[2]);
assert.equal(signedScheduler.cyclicTransitionCensus.beyondCorrectionRadius, transitionCensus.beyond);

const completeScheduler = record.completeSphereScheduler;
const insertionStates = [];
for (let coordinate = 0; coordinate < 11; coordinate += 1) {
  for (const value of [1, 2]) {
    const state = Array(11).fill(0);
    state[coordinate] = value;
    insertionStates.push(state);
  }
}
insertionStates.push(Array(11).fill(0));
const hammingDistance = (left, right) => left.filter((value, i) => value !== right[i]).length;
const completeCycle = signedStates.map((state) => [...state]);
for (const state of insertionStates) {
  let best = null;
  for (let i = 0; i < completeCycle.length; i += 1) {
    const left = completeCycle[i];
    const right = completeCycle[(i + 1) % completeCycle.length];
    const leftDistance = hammingDistance(left, state);
    const rightDistance = hammingDistance(state, right);
    const score = [
      Math.max(leftDistance, rightDistance),
      leftDistance + rightDistance - hammingDistance(left, right),
      i,
    ];
    if (!best
      || score[0] < best.score[0]
      || (score[0] === best.score[0] && score[1] < best.score[1])) {
      best = {index: i, score};
    }
  }
  completeCycle.splice(best.index + 1, 0, state);
}
assert.equal(completeCycle.length, 243);
assert.equal(new Set(completeCycle.map(key)).size, 243);
assert.equal(new Set(completeCycle.map((state) => key(syndrome(H, state)))).size, 243);
const weights = completeCycle.map((state) => state.filter((value) => value !== 0).length);
assert.deepEqual({
  0: weights.filter((weight) => weight === 0).length,
  1: weights.filter((weight) => weight === 1).length,
  2: weights.filter((weight) => weight === 2).length,
}, completeScheduler.weightCensus);
const completeTransitionCensus = {1: 0, 2: 0, beyond: 0};
for (let i = 0; i < completeCycle.length; i += 1) {
  const distance = hammingDistance(completeCycle[i], completeCycle[(i + 1) % completeCycle.length]);
  if (distance === 1 || distance === 2) completeTransitionCensus[distance] += 1;
  else completeTransitionCensus.beyond += 1;
}
assert.deepEqual(completeTransitionCensus, {1: 198, 2: 45, beyond: 0});
assert.equal(completeScheduler.uniqueSyndromes, 243);

const encoderNoGo = record.continuousEncoderNoGo;
assert.equal(Math.round(phi ** -10), encoderNoGo.unitGainNearestIntegerResult);
assert.ok(phi ** -10 < 0.5);
const reachableTrits = new Set();
for (let gain = 0; gain <= 500; gain += 1) reachableTrits.add(mod(Math.round(gain * phi ** -10), 3));
assert.deepEqual([...reachableTrits].sort(), [0, 1, 2]);

for (const contact of record.corpusContacts) {
  assert.ok(fs.existsSync(path.resolve(path.dirname(recordPath), contact.path)), `missing corpus contact ${contact.path}`);
}
for (const boundary of [
  "a_canonical_Z55_labelling_of_Golay_secants",
  "an_M11_invariant_golden_traversal",
  "a_physical_encoder_from_the_golden_mode_to_11_trits",
  "a_Golay_origin_of_the_golden_angle"
]) assert.ok(record.promotionBoundary.doesNotEstablish.includes(boundary), `missing boundary ${boundary}`);

console.log(`Dynatology golden--Golay pixelation: PASS residual=${residual}; syndromes=${syndromeMap.size}; traversal=55; intrinsicOrdering=resolved-no-go`);
