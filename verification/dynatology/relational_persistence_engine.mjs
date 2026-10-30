// Newtonian planar three-body dynamics and exact directional derivatives of
// a fourth-order symplectic splitting. No force softening or fitted damping.
export const TAU = 2 * Math.PI;
const C1 = 1 / (2 - Math.cbrt(2));
const C0 = -Math.cbrt(2) / (2 - Math.cbrt(2));

export function initialState({masses = [1, .001, .001], ratio = 2 ** (2 / 3),
  eccentricities = [.2, .2], phase = 0, innerPhase = 0, apsis = 0,
  lengthScale = 1, variations = false} = {}) {
  const q = new Float64Array(6), v = new Float64Array(6);
  const dq = new Float64Array(6), dv = new Float64Array(6);
  const d2q = new Float64Array(6), d2v = new Float64Array(6);
  for (let p = 1; p <= 2; p++) {
    const a = lengthScale * (p === 1 ? 1 : ratio), e = eccentricities[p - 1];
    const mean = p === 1 ? innerPhase : phase, angle = p === 1 ? 0 : apsis;
    const mu = masses[0] + masses[p], n = Math.sqrt(mu / a ** 3);
    let E = mean;
    for (let k = 0; k < 20; k++) {
      const step = (E - e * Math.sin(E) - mean) / (1 - e * Math.cos(E));
      E -= step; if (Math.abs(step) < 1e-15) break;
    }
    const c = Math.cos(angle), s = Math.sin(angle), f = Math.sqrt(1 - e * e);
    const local = [a * (Math.cos(E) - e), a * f * Math.sin(E)];
    const speed = [-a * n * Math.sin(E) / (1 - e * Math.cos(E)),
      a * n * f * Math.cos(E) / (1 - e * Math.cos(E))];
    const x = c * local[0] - s * local[1], y = s * local[0] + c * local[1];
    const vx = c * speed[0] - s * speed[1], vy = s * speed[0] + c * speed[1];
    q[2 * p] = x; q[2 * p + 1] = y; v[2 * p] = vx; v[2 * p + 1] = vy;
    if (p === 2 && variations) {
      const r = Math.hypot(x, y), dot = x * vx + y * vy;
      const ax = -mu * x / r ** 3, ay = -mu * y / r ** 3;
      const jx = -mu * (vx / r ** 3 - 3 * x * dot / r ** 5);
      const jy = -mu * (vy / r ** 3 - 3 * y * dot / r ** 5);
      dq[4] = vx / n; dq[5] = vy / n; dv[4] = ax / n; dv[5] = ay / n;
      d2q[4] = ax / n ** 2; d2q[5] = ay / n ** 2;
      d2v[4] = jx / n ** 2; d2v[5] = jy / n ** 2;
    }
  }
  // Barycentric conversion applies to the parameter derivatives as well.
  const total = masses.reduce((a, b) => a + b, 0);
  for (const field of [q, v, dq, dv, d2q, d2v]) for (let axis = 0; axis < 2; axis++) {
    let mean = 0;
    for (let p = 0; p < 3; p++) mean += masses[p] * field[2 * p + axis] / total;
    for (let p = 0; p < 3; p++) field[2 * p + axis] -= mean;
  }
  return {q, v, dq, dv, d2q, d2v, masses: Float64Array.from(masses), variations,
    a: new Float64Array(6), da: new Float64Array(6), d2a: new Float64Array(6),
    period: TAU * Math.sqrt(lengthScale ** 3 / (masses[0] + masses[1])), lengthScale};
}

export function accelerations(state) {
  const {q, dq, d2q, masses, a, da, d2a, variations} = state;
  a.fill(0); if (variations) { da.fill(0); d2a.fill(0); }
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
    const ix = 2 * i, jx = 2 * j;
    const x = q[jx] - q[ix], y = q[jx + 1] - q[ix + 1];
    const r2 = x * x + y * y, r3 = r2 * Math.sqrt(r2), r5 = r3 * r2, r7 = r5 * r2;
    const fx = x / r3, fy = y / r3;
    a[ix] += masses[j] * fx; a[ix + 1] += masses[j] * fy;
    a[jx] -= masses[i] * fx; a[jx + 1] -= masses[i] * fy;
    if (!variations) continue;
    const ux = dq[jx] - dq[ix], uy = dq[jx + 1] - dq[ix + 1];
    const wx = d2q[jx] - d2q[ix], wy = d2q[jx + 1] - d2q[ix + 1];
    const dot = x * ux + y * uy, dot2 = x * wx + y * wy, norm = ux * ux + uy * uy;
    const dfx = ux / r3 - 3 * x * dot / r5, dfy = uy / r3 - 3 * y * dot / r5;
    const d2fx = wx / r3 - 3 * x * dot2 / r5 - 6 * ux * dot / r5
      - 3 * x * norm / r5 + 15 * x * dot * dot / r7;
    const d2fy = wy / r3 - 3 * y * dot2 / r5 - 6 * uy * dot / r5
      - 3 * y * norm / r5 + 15 * y * dot * dot / r7;
    for (const [field, fx0, fy0] of [[da, dfx, dfy], [d2a, d2fx, d2fy]]) {
      field[ix] += masses[j] * fx0; field[ix + 1] += masses[j] * fy0;
      field[jx] -= masses[i] * fx0; field[jx + 1] -= masses[i] * fy0;
    }
  }
  return a;
}

function drift(s, h) {
  for (let k = 0; k < 6; k++) {
    s.q[k] += h * s.v[k];
    if (s.variations) { s.dq[k] += h * s.dv[k]; s.d2q[k] += h * s.d2v[k]; }
  }
}
function kick(s, h) {
  accelerations(s);
  for (let k = 0; k < 6; k++) {
    s.v[k] += h * s.a[k];
    if (s.variations) { s.dv[k] += h * s.da[k]; s.d2v[k] += h * s.d2a[k]; }
  }
}
export function step(s, h) {
  // Yoshida triple jump; merged neighbouring drifts, three force evaluations.
  drift(s, .5 * C1 * h); kick(s, C1 * h);
  drift(s, .5 * (C1 + C0) * h); kick(s, C0 * h);
  drift(s, .5 * (C0 + C1) * h); kick(s, C1 * h); drift(s, .5 * C1 * h);
}
export function invariants(s) {
  let energy = 0, angularMomentum = 0, px = 0, py = 0;
  for (let p = 0; p < 3; p++) {
    const k = 2 * p, m = s.masses[p];
    energy += .5 * m * (s.v[k] ** 2 + s.v[k + 1] ** 2);
    angularMomentum += m * (s.q[k] * s.v[k + 1] - s.q[k + 1] * s.v[k]);
    px += m * s.v[k]; py += m * s.v[k + 1];
    for (let j = p + 1; j < 3; j++) energy -= m * s.masses[j] /
      Math.hypot(s.q[2 * j] - s.q[k], s.q[2 * j + 1] - s.q[k + 1]);
  }
  return {energy, angularMomentum, linearMomentum: Math.hypot(px, py)};
}
export function relational(s, derivatives = false) {
  const values = [], first = [], second = [];
  for (const [i, j] of [[0, 1], [0, 2], [1, 2]]) {
    const x = s.q[2 * j] - s.q[2 * i], y = s.q[2 * j + 1] - s.q[2 * i + 1];
    const r = Math.hypot(x, y); values.push(r / s.lengthScale);
    if (derivatives) {
      const ux = s.dq[2 * j] - s.dq[2 * i], uy = s.dq[2 * j + 1] - s.dq[2 * i + 1];
      const wx = s.d2q[2 * j] - s.d2q[2 * i], wy = s.d2q[2 * j + 1] - s.d2q[2 * i + 1];
      const dot = x * ux + y * uy;
      first.push(dot / r / s.lengthScale);
      second.push(((ux * ux + uy * uy + x * wx + y * wy) / r - dot * dot / r ** 3) / s.lengthScale);
    }
  }
  return {values, first, second};
}

export function integrate(options, {cycles = 10, stepsPerPeriod = 160, config = null,
  variations = false, sampleEvery = stepsPerPeriod} = {}) {
  const s = initialState({...options, variations}), initial = invariants(s);
  const h = s.period / stepsPerPeriod, total = Math.round(cycles * stepsPerPeriod);
  let maxEnergyError = 0, maxAngularMomentumError = 0, minimumPairDistance = Infinity;
  let event = null, completedSteps = 0;
  const samples = [], checkpoints = new Set(config?.monitorCycles ?? []);
  const hill = Math.cbrt((s.masses[1] + s.masses[2]) / (3 * s.masses[0])) * (1 + options.ratio) / 2;
  for (let n = 1; n <= total; n++) {
    step(s, h); completedSteps = n;
    const rel = relational(s).values;
    minimumPairDistance = Math.min(minimumPairDistance, rel[2]);
    let reason = null;
    if (!rel.every(Number.isFinite)) reason = 'numerical_nonfinite';
    else if (config && rel[2] < config.closeEncounterInitialMutualHillRadii * hill) reason = 'close_encounter';
    else if (config && Math.max(rel[0], rel[1]) > config.radialExitInnerSemimajorAxes) reason = 'radial_exit';
    else if (config && Math.min(rel[0], rel[1]) < config.stellarApproachInnerSemimajorAxes) reason = 'stellar_approach';
    if (n % sampleEvery === 0 || reason || n === total) {
      const inv = invariants(s);
      maxEnergyError = Math.max(maxEnergyError, Math.abs((inv.energy - initial.energy) / initial.energy));
      maxAngularMomentumError = Math.max(maxAngularMomentumError,
        Math.abs((inv.angularMomentum - initial.angularMomentum) / initial.angularMomentum));
      if (variations || checkpoints.has(n / stepsPerPeriod)) samples.push({cycles: n / stepsPerPeriod,
        ...relational(s, variations), energyError: maxEnergyError});
    }
    if (reason) { event = reason; break; }
  }
  const numericalStatus = !Number.isFinite(maxEnergyError) || event === 'numerical_nonfinite'
    || (config && maxEnergyError > config.relativeEnergyErrorTolerance) ? 'unresolved' : 'accepted';
  return {state: s, samples, completedCycles: completedSteps / stepsPerPeriod, event, numericalStatus,
    maxEnergyError, maxAngularMomentumError, minimumPairDistance, initialInvariants: initial,
    finalRelations: relational(s, variations)};
}

export function summary(run) {
  const {state, samples, ...record} = run;
  return record;
}
