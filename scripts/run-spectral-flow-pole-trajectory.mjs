#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outputPath = path.join(root, "evidence", "data", "admissibility-spectral-flow-pole-trajectory-v1.json");

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, x) => C(a.re * x, a.im * x);
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const abs = (a) => Math.hypot(a.re, a.im);
const arg = (a) => Math.atan2(a.im, a.re);
const csqrt = (z) => {
  const r = abs(z);
  const re = Math.sqrt(Math.max(0, (r + z.re) / 2));
  const im = Math.sign(z.im || 1) * Math.sqrt(Math.max(0, (r - z.re) / 2));
  return C(re, im);
};

function zeros(n) {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => C()));
}

function cloneMatrix(a) {
  return a.map((row) => row.map((z) => C(z.re, z.im)));
}

function determinant(input) {
  const a = cloneMatrix(input);
  let out = C(1, 0);
  for (let k = 0; k < a.length; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < a.length; i += 1) {
      if (abs(a[i][k]) > abs(a[pivot][k])) pivot = i;
    }
    if (abs(a[pivot][k]) < 1e-14) return C(0, 0);
    if (pivot !== k) {
      [a[k], a[pivot]] = [a[pivot], a[k]];
      out = scale(out, -1);
    }
    const p = a[k][k];
    out = mul(out, p);
    for (let i = k + 1; i < a.length; i += 1) {
      const f = div(a[i][k], p);
      for (let j = k + 1; j < a.length; j += 1) a[i][j] = sub(a[i][j], mul(f, a[k][j]));
    }
  }
  return out;
}

function inverse(input) {
  const n = input.length;
  const a = input.map((row, i) => [
    ...row.map((z) => C(z.re, z.im)),
    ...Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0, 0)),
  ]);
  for (let k = 0; k < n; k += 1) {
    let pivot = k;
    for (let i = k + 1; i < n; i += 1) if (abs(a[i][k]) > abs(a[pivot][k])) pivot = i;
    if (abs(a[pivot][k]) < 1e-14) throw new Error("singular matrix");
    [a[k], a[pivot]] = [a[pivot], a[k]];
    const p = a[k][k];
    for (let j = 0; j < 2 * n; j += 1) a[k][j] = div(a[k][j], p);
    for (let i = 0; i < n; i += 1) {
      if (i === k) continue;
      const f = a[i][k];
      for (let j = 0; j < 2 * n; j += 1) a[i][j] = sub(a[i][j], mul(f, a[k][j]));
    }
  }
  return a.map((row) => row.slice(n));
}

function physicalLocalGreen(z, t = 1) {
  const disc = sub(mul(z, z), C(4 * t * t, 0));
  let s = csqrt(disc);
  if (abs(sub(s, z)) > abs(add(s, z))) s = scale(s, -1);
  return div(C(1, 0), s);
}

function makeCluster({ cells = 4, t1, t2, localEnergy, localCoupling = 0.42 }) {
  const railSites = cells * 2;
  const n = railSites + 1;
  const h = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < railSites - 1; i += 1) {
    const hopping = i % 2 === 0 ? t1 : t2;
    h[i][i + 1] = hopping;
    h[i + 1][i] = hopping;
  }
  h[railSites - 1][railSites] = localCoupling;
  h[railSites][railSites - 1] = localCoupling;
  h[railSites][railSites] = localEnergy;
  return { h, railSites, localIndex: railSites };
}

function effectiveMatrix(z, cluster, contact, sheet = "physical") {
  const n = cluster.h.length;
  const m = zeros(n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) m[i][j] = C((i === j ? z.re : 0) - cluster.h[i][j], i === j ? z.im : 0);
  }
  let g = physicalLocalGreen(z);
  if (sheet === "continued") g = scale(g, -1);
  m[0][0] = sub(m[0][0], scale(g, contact * contact));
  return m;
}

function clusterGreen00(z, cluster) {
  const n = cluster.h.length;
  const m = zeros(n);
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) m[i][j] = C((i === j ? z.re : 0) - cluster.h[i][j], i === j ? z.im : 0);
  }
  return inverse(m)[0][0];
}

function scatteringEigenvalue(energy, cluster, contact, eta = 0) {
  const z = C(energy, eta);
  let u;
  try {
    u = scale(clusterGreen00(z, cluster), contact * contact);
  } catch {
    return C(-1, 0);
  }
  const sinK = Math.sqrt(Math.max(0, 1 - (energy / 2) ** 2));
  const a = C(0, 2 * sinK);
  return div(add(a, u), sub(a, u));
}

function unwrap(values) {
  const out = [values[0]];
  for (let i = 1; i < values.length; i += 1) {
    let x = values[i];
    while (x - out[i - 1] > Math.PI) x -= 2 * Math.PI;
    while (x - out[i - 1] < -Math.PI) x += 2 * Math.PI;
    out.push(x);
  }
  return out;
}

function scanScattering(cluster, contact) {
  const energies = Array.from({ length: 1201 }, (_, i) => -1.98 + (3.96 * i) / 1200);
  const eigenvalues = energies.map((e) => scatteringEigenvalue(e, cluster, contact));
  const phases = unwrap(eigenvalues.map((value) => arg(value)));
  let maxDelay = { value: -Infinity, energy: null };
  let minDelay = { value: Infinity, energy: null };
  for (let i = 1; i < energies.length - 1; i += 1) {
    const delay = (phases[i + 1] - phases[i - 1]) / (energies[i + 1] - energies[i - 1]);
    if (delay > maxDelay.value) maxDelay = { value: delay, energy: energies[i] };
    if (delay < minDelay.value) minDelay = { value: delay, energy: energies[i] };
  }
  return {
    phaseChange: phases.at(-1) - phases[0],
    phaseWinding: (phases.at(-1) - phases[0]) / (2 * Math.PI),
    maxUnitarityError: Math.max(...eigenvalues.map((value) => Math.abs(abs(value) - 1))),
    maxDelay,
    minDelay,
    samples: energies.filter((_, i) => i % 200 === 0).map((energy, i) => ({
      energy,
      phase: phases[i * 200],
    })),
  };
}

function bisect(fn, a, b) {
  let fa = fn(a);
  let fb = fn(b);
  if (fa === 0) return a;
  if (fb === 0) return b;
  for (let i = 0; i < 90; i += 1) {
    const m = (a + b) / 2;
    const fm = fn(m);
    if (Math.sign(fm) === Math.sign(fa)) {
      a = m;
      fa = fm;
    } else {
      b = m;
      fb = fm;
    }
  }
  return (a + b) / 2;
}

function boundRoots(cluster, contact) {
  const fn = (e) => determinant(effectiveMatrix(C(e, 0), cluster, contact, "physical")).re;
  const roots = [];
  const intervals = [[-5, -2.00001], [2.00001, 5]];
  for (const [lo, hi] of intervals) {
    const steps = 3000;
    let x0 = lo;
    let y0 = fn(x0);
    for (let i = 1; i <= steps; i += 1) {
      const x1 = lo + ((hi - lo) * i) / steps;
      const y1 = fn(x1);
      if (Number.isFinite(y0) && Number.isFinite(y1) && Math.sign(y0) !== Math.sign(y1)) {
        const root = bisect(fn, x0, x1);
        if (!roots.some((x) => Math.abs(x - root) < 1e-6)) roots.push(root);
      }
      x0 = x1;
      y0 = y1;
    }
  }
  return roots.sort((a, b) => a - b).map((energy) => ({
    energy,
    localizationLength: 1 / Math.acosh(Math.abs(energy) / 2),
  }));
}

function newtonPole(seed, cluster, contact) {
  let z = seed;
  for (let i = 0; i < 80; i += 1) {
    const f = determinant(effectiveMatrix(z, cluster, contact, "continued"));
    if (abs(f) < 1e-10) break;
    const h = 1e-6;
    const fp = determinant(effectiveMatrix(add(z, C(h, 0)), cluster, contact, "continued"));
    const fm = determinant(effectiveMatrix(sub(z, C(h, 0)), cluster, contact, "continued"));
    const derivative = scale(sub(fp, fm), 1 / (2 * h));
    if (abs(derivative) < 1e-12) return null;
    const step = div(f, derivative);
    if (abs(step) > 1) return null;
    z = sub(z, step);
  }
  const residual = abs(determinant(effectiveMatrix(z, cluster, contact, "continued")));
  if (!Number.isFinite(residual) || residual > 1e-7 || z.im > 1e-7 || abs(z) > 8) return null;
  return { real: z.re, imag: z.im, width: Math.max(0, -2 * z.im), residual };
}

function resonancePoles(cluster, contact) {
  const poles = [];
  for (let re = -2.2; re <= 2.201; re += 0.2) {
    for (const im of [-0.015, -0.05, -0.15, -0.4, -0.8]) {
      const p = newtonPole(C(re, im), cluster, contact);
      if (p && !poles.some((q) => Math.hypot(p.real - q.real, p.imag - q.imag) < 1e-5)) poles.push(p);
    }
  }
  return poles.sort((a, b) => a.real - b.real).slice(0, 16);
}

function jacobiEigenvalues(matrix) {
  const a = matrix.map((row) => [...row]);
  const n = a.length;
  for (let iter = 0; iter < 100 * n * n; iter += 1) {
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
      if (Math.abs(a[i][j]) > largest) {
        largest = Math.abs(a[i][j]);
        p = i;
        q = j;
      }
    }
    if (largest < 1e-12) break;
    const theta = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    const app = c * c * a[p][p] - 2 * s * c * a[p][q] + s * s * a[q][q];
    const aqq = s * s * a[p][p] + 2 * s * c * a[p][q] + c * c * a[q][q];
    for (let k = 0; k < n; k += 1) {
      if (k === p || k === q) continue;
      const akp = a[k][p];
      const akq = a[k][q];
      a[k][p] = a[p][k] = c * akp - s * akq;
      a[k][q] = a[q][k] = s * akp + c * akq;
    }
    a[p][p] = app;
    a[q][q] = aqq;
    a[p][q] = a[q][p] = 0;
  }
  return a.map((row, i) => row[i]).sort((x, y) => x - y);
}

function casimirProxy(cluster, contact, separation = 2, r2 = -0.75) {
  const n = 3000;
  const maxXi = 12;
  let integral = 0;
  for (let i = 0; i <= n; i += 1) {
    const xi = (maxXi * i) / n;
    const z = C(0, xi + 1e-7);
    const u = scale(clusterGreen00(z, cluster), contact * contact);
    const root = csqrt(add(C(1, 0), scale(mul(z, z), -0.25)));
    const sinK = root;
    const a = mul(C(0, 2), sinK);
    const r1 = div(u, sub(a, u));
    const decay = Math.exp(-2 * separation * Math.asinh(xi / 2));
    const x = scale(r1, r2 * decay);
    const logTerm = Math.log(Math.max(1e-14, abs(sub(C(1, 0), x))));
    const weight = i === 0 || i === n ? 0.5 : 1;
    integral += weight * logTerm;
  }
  return integral * (maxXi / n) / (2 * Math.PI);
}

function cyclicMemory({ rate = 0.06, relaxation = 0.18, steps = 8000 }) {
  let p = 1 / (1 + Math.exp(-10));
  let area = 0;
  let previous = null;
  const dt = 1 / steps;
  for (let i = 0; i <= steps; i += 1) {
    const s = i / steps;
    const lambda = s <= 0.5 ? -2 + 8 * s : 6 - 8 * s;
    const equilibrium = 1 / (1 + Math.exp(5 * lambda));
    p += dt * (relaxation / rate) * (equilibrium - p);
    if (previous) area += 0.5 * (p + previous.p) * (lambda - previous.lambda);
    previous = { p, lambda };
  }
  return { sweepRate: rate, relaxationRate: relaxation, signedLoopArea: area, absoluteLoopArea: Math.abs(area) };
}

function radiativeBathDynamics({ excitedEnergy = 0.65, boundEnergy = -0.55, modes = 121, gamma = 0.09, totalTime = 80, dt = 0.005 }) {
  const photonMin = 0.3;
  const photonMax = 2.1;
  const spacing = (photonMax - photonMin) / (modes - 1);
  const resonantPhotonEnergy = excitedEnergy - boundEnergy;
  const photons = Array.from({ length: modes }, (_, i) => photonMin + spacing * i);
  const couplings = photons.map((omega) => {
    const envelope = Math.exp(-0.5 * ((omega - resonantPhotonEnergy) / 0.62) ** 2);
    return Math.sqrt((gamma * spacing) / (2 * Math.PI)) * envelope;
  });
  const energies = [excitedEnergy, ...photons.map((omega) => boundEnergy + omega)];
  let re = Array(modes + 1).fill(0);
  let im = Array(modes + 1).fill(0);
  re[0] = 1;

  const derivative = (xr, xi) => {
    const dr = Array(modes + 1).fill(0);
    const di = Array(modes + 1).fill(0);
    let h0r = excitedEnergy * xr[0];
    let h0i = excitedEnergy * xi[0];
    for (let j = 0; j < modes; j += 1) {
      h0r += couplings[j] * xr[j + 1];
      h0i += couplings[j] * xi[j + 1];
      const hjr = energies[j + 1] * xr[j + 1] + couplings[j] * xr[0];
      const hji = energies[j + 1] * xi[j + 1] + couplings[j] * xi[0];
      dr[j + 1] = hji;
      di[j + 1] = -hjr;
    }
    dr[0] = h0i;
    di[0] = -h0r;
    return { dr, di };
  };

  const shifted = (x, k, factor) => x.map((value, i) => value + factor * k[i]);
  const checkpoints = [];
  const steps = Math.round(totalTime / dt);
  for (let step = 0; step <= steps; step += 1) {
    if (step % Math.round(10 / dt) === 0) {
      const survival = re[0] ** 2 + im[0] ** 2;
      checkpoints.push({ time: step * dt, excitedSurvival: survival, capturedPopulation: 1 - survival });
    }
    if (step === steps) break;
    const k1 = derivative(re, im);
    const k2 = derivative(shifted(re, k1.dr, dt / 2), shifted(im, k1.di, dt / 2));
    const k3 = derivative(shifted(re, k2.dr, dt / 2), shifted(im, k2.di, dt / 2));
    const k4 = derivative(shifted(re, k3.dr, dt), shifted(im, k3.di, dt));
    for (let i = 0; i < re.length; i += 1) {
      re[i] += (dt / 6) * (k1.dr[i] + 2 * k2.dr[i] + 2 * k3.dr[i] + k4.dr[i]);
      im[i] += (dt / 6) * (k1.di[i] + 2 * k2.di[i] + 2 * k3.di[i] + k4.di[i]);
    }
  }

  const populations = re.map((x, i) => x * x + im[i] * im[i]);
  const norm = populations.reduce((sum, x) => sum + x, 0);
  const survival = populations[0];
  const captured = populations.slice(1).reduce((sum, x) => sum + x, 0);
  const boundMatterEnergy = boundEnergy * captured;
  const photonEnergy = populations.slice(1).reduce((sum, p, j) => sum + p * photons[j], 0);
  const interactionEnergy = couplings.reduce((sum, g, j) => sum + 2 * g * (re[0] * re[j + 1] + im[0] * im[j + 1]), 0);
  const excitedEnergyRemaining = excitedEnergy * survival;
  const finalTotalEnergy = excitedEnergyRemaining + boundMatterEnergy + photonEnergy + interactionEnergy;
  return {
    model: "unitary_friedrichs_one_excitation_bath",
    excitedEnergy,
    boundEnergy,
    resonantPhotonEnergy,
    photonWindow: [photonMin, photonMax],
    modes,
    gamma,
    totalTime,
    dt,
    checkpoints,
    final: {
      excitedSurvival: survival,
      capturedPopulation: captured,
      conditionalMeanPhotonEnergy: photonEnergy / captured,
      norm,
      normResidual: norm - 1,
      excitedEnergyRemaining,
      boundMatterEnergy,
      photonEnergy,
      interactionEnergy,
      totalEnergy: finalTotalEnergy,
      energyResidual: finalTotalEnergy - excitedEnergy,
    },
    limitations: [
      "finite scalar bath in the one-excitation sector",
      "phenomenological spectral density rather than microscopic QED matrix elements",
      "bound matter state and photon modes are prescribed rather than derived from Spin(2,3)"
    ]
  };
}

const parameters = {
  continuumHopping: 1,
  continuumBand: [-2, 2],
  railCells: 4,
  contactCoupling: 0.52,
  localCoupling: 0.42,
  controlValues: [-2.6, -1.8, -0.8, 0, 0.8, 1.8, 2.6],
};

const rails = {
  trivial: { t1: 1.0, t2: 0.45, winding: 0 },
  topological: { t1: 0.45, t2: 1.0, winding: 1 },
};

const runs = {};
for (const [railName, rail] of Object.entries(rails)) {
  runs[railName] = parameters.controlValues.map((localEnergy) => {
    const cluster = makeCluster({
      cells: parameters.railCells,
      t1: rail.t1,
      t2: rail.t2,
      localEnergy,
      localCoupling: parameters.localCoupling,
    });
    const resonances = resonancePoles(cluster, parameters.contactCoupling);
    const trackedResonance = resonances
      .filter((pole) => pole.real > -2 && pole.real < 2)
      .sort((a, b) => Math.abs(a.real - localEnergy) - Math.abs(b.real - localEnergy))[0] ?? null;
    const bounds = boundRoots(cluster, parameters.contactCoupling);
    const trackedBound = [...bounds].sort((a, b) => Math.abs(a.energy - localEnergy) - Math.abs(b.energy - localEnergy))[0] ?? null;
    const trackedLocalBranch = Math.abs(localEnergy) > 2
      ? { kind: "physical_sheet_bound", real: trackedBound.energy, imag: 0, width: 0 }
      : { kind: "continued_sheet_resonance", ...trackedResonance };
    return {
      localEnergy,
      closedClusterEigenvalues: jacobiEigenvalues(cluster.h),
      boundStates: bounds,
      resonances,
      trackedLocalBranch,
      scattering: scanScattering(cluster, parameters.contactCoupling),
      casimirProxy: casimirProxy(cluster, parameters.contactCoupling),
    };
  });
}

const midTrivial = runs.trivial.find((x) => x.localEnergy === 0);
const midTopological = runs.topological.find((x) => x.localEnergy === 0);
const slowMemory = cyclicMemory({ rate: 0.015, relaxation: 0.18 });
const fastMemory = cyclicMemory({ rate: 0.12, relaxation: 0.18 });

const output = {
  schema: "admissibility.spectral-flow-pole-trajectory/1",
  id: "AZ-052",
  generatedBy: "scripts/run-spectral-flow-pole-trajectory.mjs",
  model: {
    description: "one-dimensional tight-binding continuum side-coupled to a finite SSH rail and one tunable local level",
    hbar: 1,
    parameters,
    rails,
    limitations: [
      "finite SSH rail rather than a thermodynamic boundary band",
      "one-particle scattering model rather than an electron-capture derivation",
      "Casimir value is a scalar one-dimensional scattering proxy",
      "radiative bath is unitary but its scalar spectral density is phenomenological rather than microscopic QED",
      "cyclic memory is a declared Markov relaxation extension",
      "no Spin(2,3) Hamiltonian or coupling is assumed",
      "no three-body kernel or Efimov claim is present"
    ]
  },
  runs,
  comparisons: {
    zeroControl: {
      trivialBoundCount: midTrivial.boundStates.length,
      topologicalBoundCount: midTopological.boundStates.length,
      trivialPhaseWinding: midTrivial.scattering.phaseWinding,
      topologicalPhaseWinding: midTopological.scattering.phaseWinding,
      trivialCasimirProxy: midTrivial.casimirProxy,
      topologicalCasimirProxy: midTopological.casimirProxy,
      topologyChangesSpectralResponse: Math.abs(midTrivial.casimirProxy - midTopological.casimirProxy) > 1e-5
    },
    cyclicMemory: {
      slow: slowMemory,
      fast: fastMemory,
      finiteRateMemoryObserved: fastMemory.absoluteLoopArea > slowMemory.absoluteLoopArea
    },
    radiativeCapture: radiativeBathDynamics({})
  },
  admission: {
    poleTrajectoryExecutable: true,
    sharedScatteringLedgerExecutable: true,
    universalCombinedIndexEstablished: false,
    unitaryRadiativeCaptureToyEstablished: true,
    microscopicCaptureEstablished: false,
    spin23ConstraintEstablished: false,
    decision: "toy_bridge_supported_stronger_identifications_open"
  }
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`wrote ${path.relative(root, outputPath)}`);
console.log(`trivial/topological Casimir proxy: ${midTrivial.casimirProxy.toFixed(8)} / ${midTopological.casimirProxy.toFixed(8)}`);
console.log(`slow/fast loop area: ${slowMemory.absoluteLoopArea.toFixed(8)} / ${fastMemory.absoluteLoopArea.toFixed(8)}`);

