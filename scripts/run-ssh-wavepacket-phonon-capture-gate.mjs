import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/ssh-wavepacket-phonon-capture-gate-v1.json");
const poleLedger = JSON.parse(await readFile(resolve(root, "evidence/data/admissibility-finite-band-levinson-pole-ledger-v1.json"), "utf8"));

const parameters = {
  rail: "trivial", t1: 1, t2: 0.45, localEnergy: 0, localCoupling: 0.42, contactCoupling: 0.52, cells: 4,
  bondDerivativeBenchmark: 0.2, matterEnergyMin: -1.55, matterEnergyMax: -0.25,
  packetEnergy: -0.808396372627451, packetSigma: 0.12, packetCentreSite: -30,
  totalTime: 60, timeStep: 0.02
};
const boundEnergy = poleLedger.result.results.trivial.ledgers.find(row => row.epsilon === 0).boundEnergies[0];

const makeCluster = () => {
  const n = 2 * parameters.cells + 1;
  const h = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n - 2; i++) {
    const hopping = i % 2 === 0 ? parameters.t1 : parameters.t2;
    h[i][i + 1] = hopping; h[i + 1][i] = hopping;
  }
  h[n - 2][n - 1] = parameters.localCoupling; h[n - 1][n - 2] = parameters.localCoupling;
  h[n - 1][n - 1] = parameters.localEnergy;
  return h;
};
const h = makeCluster();
const physicalLocalGreen = energy => Math.sign(energy) / Math.sqrt(energy * energy - 4);
const jacobiEigen = input => {
  const a = input.map(row => [...row]);
  const n = a.length;
  const vectors = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
  for (let iteration = 0; iteration < 100 * n * n; iteration++) {
    let p = 0; let q = 1; let largest = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.abs(a[i][j]) > largest) {
      largest = Math.abs(a[i][j]); p = i; q = j;
    }
    if (largest < 1e-14) break;
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle); const s = Math.sin(angle);
    const app = c * c * a[p][p] - 2 * s * c * a[p][q] + s * s * a[q][q];
    const aqq = s * s * a[p][p] + 2 * s * c * a[p][q] + c * c * a[q][q];
    for (let k = 0; k < n; k++) if (k !== p && k !== q) {
      const x = a[k][p]; const y = a[k][q];
      a[k][p] = a[p][k] = c * x - s * y;
      a[k][q] = a[q][k] = s * x + c * y;
    }
    a[p][p] = app; a[q][q] = aqq; a[p][q] = a[q][p] = 0;
    for (let k = 0; k < n; k++) {
      const x = vectors[k][p]; const y = vectors[k][q];
      vectors[k][p] = c * x - s * y; vectors[k][q] = s * x + c * y;
    }
  }
  return a.map((row, i) => ({ value: row[i], vector: vectors.map(rowVector => rowVector[i]) }));
};
const sigma = parameters.contactCoupling ** 2 * physicalLocalGreen(boundEnergy);
const boundMatrix = h.map((row, i) => row.map((value, j) => (i === j ? boundEnergy : 0) - value - (i === 0 && j === 0 ? sigma : 0)));
let boundCluster = jacobiEigen(boundMatrix).sort((a, b) => Math.abs(a.value) - Math.abs(b.value))[0].vector;
const leadSiteAmplitude = parameters.contactCoupling * physicalLocalGreen(boundEnergy) * boundCluster[0];
const lambda = (Math.abs(boundEnergy) - Math.sqrt(boundEnergy ** 2 - 4)) / 2;
const rawBoundNorm = boundCluster.reduce((sum, value) => sum + value * value, 0) + leadSiteAmplitude ** 2 * (1 + lambda ** 2) / (1 - lambda ** 2);
boundCluster = boundCluster.map(value => value / Math.sqrt(rawBoundNorm));

const solveReal = (matrix, rhs) => {
  const n = matrix.length; const a = matrix.map((row, i) => [...row, rhs[i]]);
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(a[i][k]) > Math.abs(a[pivot][k])) pivot = i;
    [a[k], a[pivot]] = [a[pivot], a[k]];
    for (let i = k + 1; i < n; i++) {
      const factor = a[i][k] / a[k][k];
      for (let j = k; j <= n; j++) a[i][j] -= factor * a[k][j];
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) x[i] = (a[i][n] - a[i].slice(i + 1, n).reduce((sum, value, j) => sum + value * x[i + 1 + j], 0)) / a[i][i];
  return x;
};
const scatteringCluster = energy => {
  const k = Math.acos(-energy / 2); const velocity = 2 * Math.sin(k);
  const column = solveReal(h.map((row, i) => row.map((value, j) => (i === j ? energy : 0) - value)), [1, ...Array(h.length - 1).fill(0)]);
  const U = parameters.contactCoupling ** 2 * column[0];
  const denominator2 = U * U + 4 * Math.sin(k) ** 2;
  const transmission = { re: 4 * Math.sin(k) ** 2 / denominator2, im: 2 * Math.sin(k) * U / denominator2 };
  const energyNorm = 1 / Math.sqrt(2 * Math.PI * velocity);
  return { k, velocity, cluster: column.map(value => ({ re: parameters.contactCoupling * value * transmission.re * energyNorm, im: parameters.contactCoupling * value * transmission.im * energyNorm })) };
};

const simulate = ({ matterBins, phononSites }) => {
  const dE = (parameters.matterEnergyMax - parameters.matterEnergyMin) / matterBins;
  const matter = Array.from({ length: matterBins }, (_, j) => {
    const energy = parameters.matterEnergyMin + (j + 0.5) * dE;
    return { energy, ...scatteringCluster(energy) };
  });
  const phonons = Array.from({ length: phononSites - 1 }, (_, index) => {
    const mode = index + 1; const k = 2 * Math.PI * mode / phononSites;
    const omega = 2 * Math.abs(Math.sin(k / 2));
    return { mode, k, omega, energy: boundEnergy + omega };
  });
  const couplings = matter.map(state => phonons.map(mode => {
    let re = 0; let im = 0;
    for (let bond = 0; bond < h.length - 1; bond++) {
      const a = state.cluster[bond]; const b = state.cluster[bond + 1];
      const fr = boundCluster[bond] * b.re + boundCluster[bond + 1] * a.re;
      const fi = boundCluster[bond] * b.im + boundCluster[bond + 1] * a.im;
      const phase = mode.k * (bond + 0.5);
      const strain = 2 * Math.sin(mode.k / 2) / Math.sqrt(2 * phononSites * mode.omega);
      const pr = Math.cos(phase) * strain; const pi = Math.sin(phase) * strain;
      re += fr * pr - fi * pi; im += fr * pi + fi * pr;
    }
    const scale = parameters.bondDerivativeBenchmark * Math.sqrt(dE);
    return { re: scale * re, im: scale * im };
  }));
  const n = matter.length + phonons.length;
  const re = Array(n).fill(0); const im = Array(n).fill(0);
  let packetNorm = 0;
  for (let j = 0; j < matter.length; j++) {
    const envelope = Math.exp(-0.25 * ((matter[j].energy - parameters.packetEnergy) / parameters.packetSigma) ** 2);
    const phase = -matter[j].k * parameters.packetCentreSite;
    re[j] = envelope * Math.cos(phase) * Math.sqrt(dE);
    im[j] = envelope * Math.sin(phase) * Math.sqrt(dE);
    packetNorm += re[j] ** 2 + im[j] ** 2;
  }
  for (let j = 0; j < matter.length; j++) { re[j] /= Math.sqrt(packetNorm); im[j] /= Math.sqrt(packetNorm); }
  const derivative = (xr, xi) => {
    const dr = Array(n).fill(0); const di = Array(n).fill(0);
    for (let j = 0; j < matter.length; j++) {
      let hr = matter[j].energy * xr[j]; let hi = matter[j].energy * xi[j];
      for (let k = 0; k < phonons.length; k++) {
        const g = couplings[j][k]; const p = matter.length + k;
        hr += g.re * xr[p] + g.im * xi[p]; hi += g.re * xi[p] - g.im * xr[p];
      }
      dr[j] = hi; di[j] = -hr;
    }
    for (let k = 0; k < phonons.length; k++) {
      const p = matter.length + k; let hr = phonons[k].energy * xr[p]; let hi = phonons[k].energy * xi[p];
      for (let j = 0; j < matter.length; j++) {
        const g = couplings[j][k];
        hr += g.re * xr[j] - g.im * xi[j]; hi += g.re * xi[j] + g.im * xr[j];
      }
      dr[p] = hi; di[p] = -hr;
    }
    return { dr, di };
  };
  const shifted = (x, dx, amount) => x.map((value, i) => value + amount * dx[i]);
  const step = dt => {
    const k1 = derivative(re, im);
    const k2 = derivative(shifted(re, k1.dr, dt / 2), shifted(im, k1.di, dt / 2));
    const k3 = derivative(shifted(re, k2.dr, dt / 2), shifted(im, k2.di, dt / 2));
    const k4 = derivative(shifted(re, k3.dr, dt), shifted(im, k3.di, dt));
    for (let i = 0; i < n; i++) {
      re[i] += dt * (k1.dr[i] + 2 * k2.dr[i] + 2 * k3.dr[i] + k4.dr[i]) / 6;
      im[i] += dt * (k1.di[i] + 2 * k2.di[i] + 2 * k3.di[i] + k4.di[i]) / 6;
    }
  };
  const ledger = () => {
    const population = re.map((value, i) => value * value + im[i] * im[i]);
    const captured = population.slice(matter.length).reduce((sum, value) => sum + value, 0);
    const norm = population.reduce((sum, value) => sum + value, 0);
    let energy = 0;
    for (let j = 0; j < matter.length; j++) energy += matter[j].energy * population[j];
    for (let k = 0; k < phonons.length; k++) energy += phonons[k].energy * population[matter.length + k];
    for (let j = 0; j < matter.length; j++) for (let k = 0; k < phonons.length; k++) {
      const g = couplings[j][k]; const p = matter.length + k;
      energy += 2 * (g.re * (re[j] * re[p] + im[j] * im[p]) + g.im * (re[j] * im[p] - im[j] * re[p]));
    }
    const phononEnergy = population.slice(matter.length).reduce((sum, value, k) => sum + value * phonons[k].omega, 0);
    return { norm, energy, captured, conditionalMeanPhononEnergy: captured > 0 ? phononEnergy / captured : 0 };
  };
  const initial = ledger(); const checkpoints = [];
  const steps = Math.round(parameters.totalTime / parameters.timeStep);
  for (let s = 0; s <= steps; s++) {
    if (s % Math.round(2 / parameters.timeStep) === 0) checkpoints.push({ time: s * parameters.timeStep, ...ledger() });
    if (s < steps) step(parameters.timeStep);
  }
  const final = ledger();
  const spectrumBins = 24; const spectrumWidth = 2 / spectrumBins;
  const emittedSpectrum = Array.from({ length: spectrumBins }, (_, bin) => ({ omegaMin: bin * spectrumWidth, omegaMax: (bin + 1) * spectrumWidth, population: 0 }));
  for (let k = 0; k < phonons.length; k++) {
    const p = matter.length + k;
    const population = re[p] ** 2 + im[p] ** 2;
    const bin = Math.min(spectrumBins - 1, Math.floor(phonons[k].omega / spectrumWidth));
    emittedSpectrum[bin].population += population;
  }
  for (let s = 0; s < steps; s++) step(-parameters.timeStep);
  const reversed = ledger();
  const reverseAmplitudeError = Math.sqrt(re.reduce((sum, value, i) => sum + (value - (i < matter.length ? (() => {
    const envelope = Math.exp(-0.25 * ((matter[i].energy - parameters.packetEnergy) / parameters.packetSigma) ** 2);
    return envelope * Math.cos(-matter[i].k * parameters.packetCentreSite) * Math.sqrt(dE) / Math.sqrt(packetNorm);
  })() : 0)) ** 2 + (im[i] - (i < matter.length ? (() => {
    const envelope = Math.exp(-0.25 * ((matter[i].energy - parameters.packetEnergy) / parameters.packetSigma) ** 2);
    return envelope * Math.sin(-matter[i].k * parameters.packetCentreSite) * Math.sqrt(dE) / Math.sqrt(packetNorm);
  })() : 0)) ** 2, 0));
  return { matterBins, phononSites, dE, initial, final, emittedSpectrum, reversed, reverseAmplitudeError, maximumCaptured: Math.max(...checkpoints.map(x => x.captured)), maximumCaptureTime: checkpoints.sort((a, b) => b.captured - a.captured)[0].time, checkpoints };
};

const coarse = simulate({ matterBins: 32, phononSites: 80 });
const fine = simulate({ matterBins: 64, phononSites: 160 });
const refined = simulate({ matterBins: 96, phononSites: 240 });
const coarseToFineRelativeCaptureChange = Math.abs(fine.final.captured - coarse.final.captured) / Math.max(fine.final.captured, coarse.final.captured, 1e-30);
const fineToRefinedRelativeCaptureChange = Math.abs(refined.final.captured - fine.final.captured) / Math.max(refined.final.captured, fine.final.captured, 1e-30);
const result = {
  schema: "admissibility.ssh-wavepacket-phonon-capture-gate/1", date: "2026-10-25", targets: ["OT-036"], parent: "AZ-121",
  authority: "normalized finite wavepacket and one-phonon benchmark on the declared AZ-055 graph; not a material capture rate",
  parameters: { ...parameters, boundEnergy },
  normalization: {
    matterRule: "energy-normalized scattering amplitudes are multiplied by sqrt(dE) before entering the finite normalized packet",
    phononRule: "each displaced cluster bond contributes coherently with its mode phase and acoustic strain factor",
    interactionRule: "the same declared benchmark derivative multiplies every displaced cluster bond",
    initialNorm: fine.initial.norm
  },
  convergence: { coarse, fine, refined, coarseToFineRelativeCaptureChange, fineToRefinedRelativeCaptureChange },
  verdict: {
    closed: "A normalized incoming continuum packet, the AZ-121 scattering-to-bound form factors and the AZ-120 acoustic modes now evolve in one finite Hermitian Hamiltonian with coherent multi-bond phases.",
    implication: "Continuum normalization is no longer a semantic gap: the graph overlap becomes a finite capture probability only after integration over a normalized packet and phonon modes.",
    open: "The common bond derivative remains a benchmark rather than a named material calibration; the one-phonon truncation, finite rails and fixed cluster geometry remain model boundaries.",
    nextCalculation: "Replace the common benchmark derivative by bond-resolved dt/du, masses and spring constants from one material or engineered device, then repeat joint matter/phonon refinement and thermal detailed balance."
  }
};
if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, parameters: result.parameters, normalization: result.normalization, convergence: { coarse: { ...coarse, checkpoints: undefined }, fine: { ...fine, checkpoints: undefined }, refined: { ...refined, checkpoints: undefined }, coarseToFineRelativeCaptureChange, fineToRefinedRelativeCaptureChange }, verdict: result.verdict }, null, 2));
