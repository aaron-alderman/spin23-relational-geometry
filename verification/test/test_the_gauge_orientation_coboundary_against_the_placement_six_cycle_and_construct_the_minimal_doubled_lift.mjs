import assert from 'node:assert/strict';

const xor = (a, b) => (a + b) & 1;
const labels = ['u', 'd', 'l'];

// Physical scalar orientation: u,d couple through S^dagger; l through S.
// Encode S^dagger=0, S=1.
const physicalSection = [0, 0, 1];
const coboundary = (section) => section.map((x, i) => xor(x, section[(i + 1) % 3]));
const flux = (voltage) => voltage.reduce((s, x) => xor(s, x), 0);
const gaugeVoltage = coboundary(physicalSection);
assert.deepEqual(gaugeVoltage, [0, 1, 1]);
assert.equal(flux(gaugeVoltage), 0);

// Every edge pattern induced solely by vertex orientation differences has
// zero total flux. It gives two disconnected triangles, never one six-cycle.
for (let mask = 0; mask < 8; mask++) {
  const section = [0, 1, 2].map((i) => (mask >> i) & 1);
  assert.equal(flux(coboundary(section)), 0);
}

// One antiunitary insertion per placement step gives odd voltage and the
// unique connected double cover.
const uniformAntiunitaryVoltage = [1, 1, 1];
assert.equal(flux(uniformAntiunitaryVoltage), 1);
const step = ([i, s]) => [(i + 1) % 3, xor(s, 1)];
const orbit = [];
let state = [0, physicalSection[0]];
for (let n = 0; n < 6; n++) {
  orbit.push(state);
  state = step(state);
}
assert.deepEqual(state, orbit[0]);
assert.equal(new Set(orbit.map(([i, s]) => String(i) + ':' + String(s))).size, 6);

// The uniform lift does not preserve the three-state physical section on
// each step. This is why the conjugate partners are required.
const sectionMembership = orbit.map(([i, s]) => s === physicalSection[i]);
assert(sectionMembership.some(Boolean));
assert(sectionMembership.some((x) => !x));
assert.equal(sectionMembership[1], false);

// The physical-section edge map instead uses the coboundary voltage and
// closes after three steps without a deck transformation.
const physicalStep = ([i, s]) => {
  const a = gaugeVoltage[i];
  return [(i + 1) % 3, xor(s, a)];
};
state = [0, physicalSection[0]];
const physicalOrbit = [];
for (let n = 0; n < 3; n++) {
  physicalOrbit.push(state);
  state = physicalStep(state);
  assert.equal(state[1], physicalSection[state[0]]);
}
assert.deepEqual(state, physicalOrbit[0]);

console.log(JSON.stringify({
  protocol: 'gauge-orientation-coboundary-versus-placement-six-cycle-minimal-doubled-lift/1',
  baseLabels: labels,
  physicalGaugeOrientation: {
    encoding: 'S-dagger=0, S=1',
    section: physicalSection,
    inducedEdgeVoltage: gaugeVoltage,
    totalFlux: flux(gaugeVoltage),
    cover: 'two disconnected triangles / gauge-trivial lift',
  },
  theorem: 'every edge voltage induced as the Z2 difference of a vertex orientation section has zero flux around a closed cycle',
  uniformAntiunitaryLift: {
    edgeVoltage: uniformAntiunitaryVoltage,
    totalFlux: flux(uniformAntiunitaryVoltage),
    orbit: orbit.map(([i, s]) => labels[i] + ':' + (s ? 'S' : 'S-dagger')),
    orbitLength: orbit.length,
    preservesMinimalPhysicalSection: false,
    requiredSourceSpace: 'all three labels in both conjugation orientations',
  },
  boundary: {
    projectiveSixCycle: 'realized only on the six-state conjugation-complete lift',
    physicalThreeLinkSection: 'closes in three steps and cannot itself supply odd placement flux',
    neutralQuotient: 'can forget conjugation orientation, but then also forgets the deck distinction unless a coherent root retains it',
  },
  conclusion: 'The established per-edge antiunitary has the correct odd placement voltage only after conjugation-completing the Wilson source triplet; gauge-orientation changes of the three physical links alone are a coboundary and cannot generate the six-cycle.',
  passed: true,
}, null, 2));
