import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/admissibility-exceptional-loop-dynamics-v1.json");

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, q) => C(a.re * q, a.im * q);
const div = (a, b) => scale(mul(a, C(b.re, -b.im)), 1 / (b.re * b.re + b.im * b.im));
const abs2 = a => a.re * a.re + a.im * a.im;
const sqrt = z => {
  const r = Math.hypot(z.re, z.im);
  const re = Math.sqrt(Math.max(0, (r + z.re) / 2));
  return C(re, Math.sign(z.im || 1) * Math.sqrt(Math.max(0, (r - z.re) / 2)));
};
const vadd = (a, b) => a.map((x, i) => add(x, b[i]));
const vscale = (a, q) => a.map(x => scale(x, q));
const norm = v => Math.sqrt(v.reduce((s, x) => s + abs2(x), 0));
const normalize = v => vscale(v, 1 / norm(v));

const gamma = 1;
const radius = 0.5;
const matrix = theta => {
  const delta = radius * Math.sin(theta);
  const coupling = gamma + radius * Math.cos(theta);
  return [[C(delta, gamma), C(coupling)], [C(coupling), C(-delta, -gamma)]];
};
const matVec = (M, v) => M.map(row => row.reduce((s, x, i) => add(s, mul(x, v[i])), C()));
const derivative = (theta, v) => matVec(matrix(theta), v).map(x => mul(C(0, -1), x));
const eigenbasis = theta => {
  const M = matrix(theta);
  const a = M[0][0];
  const g = M[0][1];
  const lambda = sqrt(add(mul(a, a), mul(g, g)));
  const vector = sign => normalize([g, sub(scale(lambda, sign), a)]);
  return { plus: vector(1), minus: vector(-1), eigenvaluePlus: lambda };
};
const coefficients = (basis, state) => {
  const [a, c] = basis.plus;
  const [b, d] = basis.minus;
  const determinant = sub(mul(a, d), mul(b, c));
  return [div(sub(mul(d, state[0]), mul(b, state[1])), determinant), div(sub(mul(a, state[1]), mul(c, state[0])), determinant)];
};
const populations = (basis, state) => {
  const weights = coefficients(basis, state).map(abs2);
  const total = weights[0] + weights[1];
  return { plus: weights[0] / total, minus: weights[1] / total };
};
const evolve = (initial, direction, period) => {
  const steps = Math.max(4000, Math.ceil(period * 400));
  const dt = period / steps;
  let state = initial.map(x => C(x.re, x.im));
  for (let n = 0; n < steps; n += 1) {
    const time = n * dt;
    const theta = direction * 2 * Math.PI * time / period;
    const omega = direction * 2 * Math.PI / period;
    const f = (t, v) => derivative(theta + omega * t, v);
    const k1 = f(0, state);
    const k2 = f(dt / 2, vadd(state, vscale(k1, dt / 2)));
    const k3 = f(dt / 2, vadd(state, vscale(k2, dt / 2)));
    const k4 = f(dt, vadd(state, vscale(k3, dt)));
    state = vadd(state, vscale(vadd(vadd(k1, vscale(k2, 2)), vadd(vscale(k3, 2), k4)), dt / 6));
    state = normalize(state);
  }
  return normalize(state);
};

const basis = eigenbasis(0);
const periods = [1, 4, 16, 64];
const runs = periods.flatMap(period => [-1, 1].flatMap(direction => ["plus", "minus"].map(initialLabel => {
  const finalState = evolve(basis[initialLabel], direction, period);
  return { period, direction: direction > 0 ? "counterclockwise" : "clockwise", initial: initialLabel, finalPopulations: populations(basis, finalState) };
})));
const convergence = periods.flatMap(period => [-1, 1].map(direction => {
  const pair = runs.filter(row => row.period === period && row.direction === (direction > 0 ? "counterclockwise" : "clockwise"));
  return { period, direction: pair[0].direction, endpointPlusDifferenceAcrossInitialStates: Math.abs(pair[0].finalPopulations.plus - pair[1].finalPopulations.plus) };
}));

const result = {
  protocol: "admissibility-exceptional-loop-dynamics/1",
  date: "2026-10-25",
  target: "OT-013",
  model: {
    hamiltonian: "H=[[delta+i gamma,g],[g,-delta-i gamma]]",
    loop: "delta=r sin(theta), g=gamma+r cos(theta)",
    parameters: { gamma, radius },
    exceptionalPoint: { delta: 0, coupling: gamma },
    topology: "The discriminant winds once around zero. Analytic continuation of sqrt(discriminant) changes sign, so the instantaneous eigenstate sheets exchange after one loop for either orientation.",
  },
  dynamics: {
    equation: "d psi/dt=-i H(t) psi",
    normalization: "State is rescaled during integration only to avoid overflow; projective endpoint populations are unchanged.",
    runs,
    convergence,
  },
  discriminator: {
    topologyRecord: ["complex eigenvalue braid", "biorthogonal left/right eigenvectors", "discriminant winding", "double-loop return"],
    dynamicsRecord: ["both initial eigenstates", "both loop orientations", "at least three loop periods", "unnormalized gain/loss before projective normalization", "time-resolved nonadiabatic jumps"],
    rule: "Sheet exchange belongs to the instantaneous spectrum. Initial-state erasure or direction-selected endpoints belong to the driven nonunitary propagator. Do not infer one from the other.",
  },
  sources: [
    { title: "Dynamically encircling an exceptional point for asymmetric mode switching", url: "https://www.nature.com/articles/nature18605", role: "experimental dynamical encircling and asymmetric switching" },
    { title: "Observation of chiral state transfer without encircling an exceptional point", url: "https://www.nature.com/articles/s41586-022-04542-2", role: "demonstrates that chiral transfer is not uniquely identified by EP winding" },
    { title: "Observation of Restored Adiabatic State Transfer in Time-Modulated Non-Hermitian Systems", url: "https://www.nature.com/articles/s41467-026-72751-8", role: "same-platform separation of symmetric adiabatic and chiral nonadiabatic transfer" },
    { title: "Counterintuitive collision of exceptional points on nonorientable manifolds", url: "https://www.nature.com/articles/s41467-026-76508-1", role: "complex spectrum plus biorthogonal Berry-phase tomography precedent" },
  ],
  verdict: {
    spectralTopology: "exact_for_declared_two_mode_loop",
    endpointSelection: "rate_orientation_and_nonunitary_dynamics_dependent",
    status: "simulation_closed_physical_protocol_specified",
    physicalFirewall: "An endpoint switch is neither a topology measurement nor evidence of spontaneous selection unless spectral winding and the driven gain/loss dynamics are independently reconstructed.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, runs, convergence, verdict: result.verdict }, null, 2));
