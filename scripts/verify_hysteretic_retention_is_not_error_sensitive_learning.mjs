import assert from "node:assert/strict";

const a = 1;
const gamma = 1.4;
const criticalTilt = 2 * a / (3 * Math.sqrt(3));
const dt = 0.002;
const totalTime = 30;

function drive(t, amplitude) {
  return t >= 2 && t <= 10 ? amplitude : 0;
}

function derivative(t, s, amplitude) {
  const h = drive(t, amplitude);
  return -gamma * (a * s * (s * s - 1) - h);
}

function rk4Step(t, s, amplitude) {
  const k1 = derivative(t, s, amplitude);
  const k2 = derivative(t + dt / 2, s + dt * k1 / 2, amplitude);
  const k3 = derivative(t + dt / 2, s + dt * k2 / 2, amplitude);
  const k4 = derivative(t + dt, s + dt * k3, amplitude);
  return s + dt * (k1 + 2 * k2 + 2 * k3 + k4) / 6;
}

function simulate(amplitude) {
  let s = -1;
  let minimumPostPulseEnergyDrop = Infinity;
  let lastEnergy;
  for (let n = 0; n < totalTime / dt; n += 1) {
    const t = n * dt;
    s = rk4Step(t, s, amplitude);
    if (t > 10) {
      const energy = a * (s * s - 1) ** 2 / 4;
      if (lastEnergy !== undefined) {
        minimumPostPulseEnergyDrop = Math.min(minimumPostPulseEnergyDrop, lastEnergy - energy);
      }
      lastEnergy = energy;
    }
  }
  const poles = [2.3, 3.1, 4.6].map((d, i) => d + [0.18, -0.14, 0.11][i] * Math.tanh(s));
  return { s, poles, minimumPostPulseEnergyDrop };
}

const weak = simulate(0.30);
const strong = simulate(0.62);

assert.ok(0.30 < criticalTilt);
assert.ok(0.62 > criticalTilt);
assert.ok(weak.s < -0.999, "subthreshold pulse should return to the original well");
assert.ok(strong.s > 0.999, "superthreshold pulse should switch and remain in the other well");
assert.ok(weak.poles.every((p) => p > 0) && strong.poles.every((p) => p > 0));
assert.ok(weak.minimumPostPulseEnergyDrop > -1e-12);
assert.ok(strong.minimumPostPulseEnergyDrop > -1e-12);

console.log(JSON.stringify({
  criticalTilt,
  weakPulse: { amplitude: 0.30, ...weak },
  strongPulse: { amplitude: 0.62, ...strong },
  retainedPoleDifference: strong.poles.map((p, i) => p - weak.poles[i]),
  verdict: {
    thresholdedRetention: true,
    energyDissipationAfterPulse: true,
    truthOrErrorSensitivity: false,
    consciousnessRequired: false,
  },
}, null, 2));
