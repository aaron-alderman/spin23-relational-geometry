import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/ssh-scattering-bound-phonon-form-factor-v1.json");
const ledger = JSON.parse(await readFile(resolve(root, "evidence/data/admissibility-finite-band-levinson-pole-ledger-v1.json"), "utf8"));

const parameters = { rail: "trivial", t1: 1, t2: 0.45, localEnergy: 0, localCoupling: 0.42, contactCoupling: 0.52, cells: 4, targetPhononEnergy: 1.2, bondDerivativeBenchmark: 0.2 };
const boundEnergy = ledger.result.results.trivial.ledgers.find(row => row.epsilon === 0).boundEnergies[0];
const incomingEnergy = boundEnergy + parameters.targetPhononEnergy;

const makeCluster = () => {
  const n = 2 * parameters.cells + 1;
  const h = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n - 2; i++) {
    const hopping = i % 2 === 0 ? parameters.t1 : parameters.t2;
    h[i][i + 1] = hopping;
    h[i + 1][i] = hopping;
  }
  h[n - 2][n - 1] = parameters.localCoupling;
  h[n - 1][n - 2] = parameters.localCoupling;
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
    let p = 0;
    let q = 1;
    let largest = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.abs(a[i][j]) > largest) {
      largest = Math.abs(a[i][j]); p = i; q = j;
    }
    if (largest < 1e-14) break;
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
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
      vectors[k][p] = c * x - s * y;
      vectors[k][q] = s * x + c * y;
    }
  }
  return a.map((row, i) => ({ value: row[i], vector: vectors.map(rowVector => rowVector[i]) }));
};

const sigma = parameters.contactCoupling ** 2 * physicalLocalGreen(boundEnergy);
const boundMatrix = h.map((row, i) => row.map((value, j) => (i === j ? boundEnergy : 0) - value - (i === 0 && j === 0 ? sigma : 0)));
const nullPair = jacobiEigen(boundMatrix).sort((a, b) => Math.abs(a.value) - Math.abs(b.value))[0];
let boundCluster = nullPair.vector;
const leadSiteAmplitude = parameters.contactCoupling * physicalLocalGreen(boundEnergy) * boundCluster[0];
const lambda = (Math.abs(boundEnergy) - Math.sqrt(boundEnergy ** 2 - 4)) / 2;
const leadNormFactor = (1 + lambda ** 2) / (1 - lambda ** 2);
const rawBoundNorm = boundCluster.reduce((sum, value) => sum + value * value, 0) + leadSiteAmplitude ** 2 * leadNormFactor;
boundCluster = boundCluster.map(value => value / Math.sqrt(rawBoundNorm));
const normalizedLeadSiteAmplitude = leadSiteAmplitude / Math.sqrt(rawBoundNorm);
const matrixResidual = boundMatrix.map(row => row.reduce((sum, value, j) => sum + value * boundCluster[j], 0));

const solveReal = (matrix, rhs) => {
  const n = matrix.length;
  const a = matrix.map((row, i) => [...row, rhs[i]]);
  for (let k = 0; k < n; k++) {
    let pivot = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(a[i][k]) > Math.abs(a[pivot][k])) pivot = i;
    if (Math.abs(a[pivot][k]) < 1e-12) throw new Error("singular cluster resolvent");
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
const clusterGreenColumn = energy => solveReal(h.map((row, i) => row.map((value, j) => (i === j ? energy : 0) - value)), [1, ...Array(h.length - 1).fill(0)]);
const scatteringCluster = energy => {
  const k = Math.acos(-energy / 2);
  const velocity = 2 * Math.sin(k);
  const column = clusterGreenColumn(energy);
  const U = parameters.contactCoupling ** 2 * column[0];
  const denominator = { re: -U, im: 2 * Math.sin(k) };
  const denom2 = denominator.re ** 2 + denominator.im ** 2;
  const transmission = { re: 2 * Math.sin(k) * denominator.im / denom2, im: -2 * Math.sin(k) * denominator.re / denom2 };
  const energyNorm = 1 / Math.sqrt(2 * Math.PI * velocity);
  const lead0 = { re: transmission.re * energyNorm, im: transmission.im * energyNorm };
  return {
    k, velocity, U, transmission, energyNorm, lead0,
    cluster: column.map(value => ({ re: parameters.contactCoupling * value * lead0.re, im: parameters.contactCoupling * value * lead0.im }))
  };
};
const bondRowsAt = energy => {
  const scattering = scatteringCluster(energy);
  const rows = [];
  for (let bond = 0; bond < h.length - 1; bond++) {
    const a = scattering.cluster[bond];
    const b = scattering.cluster[bond + 1];
    const form = {
      re: boundCluster[bond] * b.re + boundCluster[bond + 1] * a.re,
      im: boundCluster[bond] * b.im + boundCluster[bond + 1] * a.im
    };
    rows.push({ bond: [bond, bond + 1], hopping: h[bond][bond + 1], formFactor: form, magnitude: Math.hypot(form.re, form.im) });
  }
  return { energy, phononEnergy: energy - boundEnergy, scattering, bonds: rows, strongest: [...rows].sort((a, b) => b.magnitude - a.magnitude)[0] };
};
const selected = bondRowsAt(incomingEnergy);
const scan = Array.from({ length: 81 }, (_, index) => -1.95 + index * (incomingEnergy + 1.95) / 80).map(bondRowsAt);
const selectedBond = selected.strongest.bond[0];
const selectedBondScan = scan.map(row => ({ energy: row.energy, phononEnergy: row.phononEnergy, magnitude: row.bonds[selectedBond].magnitude }));
const maxInScan = [...selectedBondScan].sort((a, b) => b.magnitude - a.magnitude)[0];

const result = {
  schema: "admissibility.ssh-scattering-bound-phonon-form-factor/1",
  date: "2026-10-25",
  targets: ["OT-036"],
  parent: "AZ-120",
  authority: "exact one-particle form-factor certificate for the declared AZ-055 graph; not a material rate",
  parameters,
  boundState: {
    energy: boundEnergy,
    effectiveNullEigenvalue: nullPair.value,
    maximumEffectiveEquationResidual: Math.max(...matrixResidual.map(Math.abs)),
    decayFactor: lambda,
    clusterAmplitudes: boundCluster,
    contactLeadAmplitude: normalizedLeadSiteAmplitude,
    totalNorm: boundCluster.reduce((sum, value) => sum + value * value, 0) + normalizedLeadSiteAmplitude ** 2 * leadNormFactor
  },
  selectedTransition: {
    incomingEnergy,
    emittedPhononEnergy: incomingEnergy - boundEnergy,
    energyNormalizedIncomingState: true,
    scattering: selected.scattering,
    bondFormFactors: selected.bonds,
    strongestBond: selected.strongest,
    amplitudeDensityPerUnitBondDerivative: selected.strongest.magnitude,
    benchmarkAmplitudeDensity: parameters.bondDerivativeBenchmark * selected.strongest.magnitude,
    normalizationBoundary: {
      az120Object: "dimensionless matrix element between two normalized discrete matter states",
      currentObject: "matrix element between one normalized bound state and one energy-normalized incoming scattering state",
      directNumericalRatioAdmissible: false,
      explanation: "The current form factor carries continuum-normalization dimensions. It must enter a flux-normalized golden-rule kernel or be integrated against a normalized incoming wavepacket; it cannot be substituted directly for AZ-120's discrete D."
    }
  },
  energyScan: {
    selectedBond: [selectedBond, selectedBond + 1],
    samples: selectedBondScan,
    maximum: maxInScan,
    statement: "The scattering-to-bound form factor is energy dependent; a constant D is not source-native even before phonon density-of-states and temperature factors are applied."
  },
  verdict: {
    closed: "The AZ-055 graph now supplies a normalized bound state, an energy-normalized incoming scattering state and a finite bond-modulation form factor. At the 1.2-energy emission point the strongest graph overlap is computed rather than fitted.",
    implication: "The acoustic spectral shape survives, but AZ-120's discrete coefficient and the present scattering amplitude density are differently normalized objects. The graph supplies the energy-dependent overlap; a wavepacket or flux-normalized rate supplies the missing bridge.",
    open: "The material derivative dt/du, dimensional phonon normalization, multi-bond interference and rail backreaction are not fixed. The selected incoming state is stationary energy-normalized scattering data; a normalized wavepacket capture probability has not yet been evolved with this form factor.",
    nextCalculation: "Choose a material or engineered rail to fix dt/du and mass density; coherently sum all physically displaced bonds with their phonon phases; launch a normalized incoming wavepacket and test rail-size-stable bound population, emitted spectrum, time reversal and detailed balance."
  }
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, boundState: { ...result.boundState, clusterAmplitudes: undefined }, selectedTransition: result.selectedTransition, energyScan: { selectedBond: result.energyScan.selectedBond, maximum: result.energyScan.maximum } }, null, 2));
