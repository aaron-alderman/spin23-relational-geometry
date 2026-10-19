import assert from "node:assert/strict";

const steps = 40;
const a = 0.91;
const b = 0.23;
const eta = 0.17;
const gain = 0.38;
const gamma = 0.12;
const sigmoid = (z) => 1 / (1 + Math.exp(-z));

function evolve({ explicitDerivedConsciousness = false, independentConsciousness = false }) {
  let x = 0.8;
  let model = -0.35;
  let consciousness = independentConsciousness ? 0.6 : sigmoid(model);
  const trace = [];

  for (let t = 0; t < steps; t += 1) {
    const derived = sigmoid(model);
    const consciousTerm = independentConsciousness ? consciousness : derived;
    const control = explicitDerivedConsciousness || independentConsciousness
      ? -gain * model + gamma * consciousTerm
      : -gain * model + gamma * sigmoid(model);

    x = a * x + b * control;
    model = model + eta * (x - model);
    if (independentConsciousness) {
      consciousness = 0.77 * consciousness + 0.19 * Math.tanh(x - model);
    } else {
      consciousness = sigmoid(model);
    }
    trace.push([x, model, consciousness]);
  }
  return trace;
}

const explicit = evolve({ explicitDerivedConsciousness: true });
const compiled = evolve({});
const independent = evolve({ independentConsciousness: true });

let compileOutError = 0;
let independentDifference = 0;
for (let i = 0; i < steps; i += 1) {
  compileOutError = Math.max(
    compileOutError,
    Math.abs(explicit[i][0] - compiled[i][0]),
    Math.abs(explicit[i][1] - compiled[i][1]),
  );
  independentDifference = Math.max(
    independentDifference,
    Math.abs(independent[i][0] - compiled[i][0]),
  );
}

assert.ok(compileOutError < 1e-14, `derived variable failed to compile out: ${compileOutError}`);
assert.ok(independentDifference > 1e-4, "independent state did not produce a distinguishable future");

// A reflexive state can change positive realization data without invoking
// consciousness: exponential parametrization keeps a pole frequency positive.
let theta = -0.2;
for (let t = 0; t < 20; t += 1) {
  const occupation = (0.4 + 0.02 * t) ** 2;
  theta += 0.03 * (occupation - 0.25);
  assert.ok(Math.exp(theta) > 0);
}

console.log(JSON.stringify({
  compileOutError,
  independentDifference,
  positiveAdaptivePole: Math.exp(theta),
  verdict: {
    derivedConsciousness: "dynamically eliminable",
    independentConsciousness: "distinct dynamics, but phenomenology is not thereby established",
    reflexiveAdaptation: "possible without a consciousness postulate",
  },
}, null, 2));
