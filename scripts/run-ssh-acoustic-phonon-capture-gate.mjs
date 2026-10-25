import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/ssh-acoustic-phonon-capture-gate-v1.json");
const toyPath = resolve(root, "evidence/data/admissibility-spectral-flow-pole-trajectory-v1.json");

const parameters = {
  excitedEnergy: 0.65,
  boundEnergy: -0.55,
  railSites: 240,
  mass: 1,
  springConstant: 1,
  bondStrainMatrixElement: 0.2,
  totalTime: 100,
  timeStep: 0.01,
  inverseTemperature: 2,
  spectrumBins: 24
};
const gap = parameters.excitedEnergy - parameters.boundEnergy;
const modes = Array.from({ length: parameters.railSites - 1 }, (_, index) => {
  const modeNumber = index + 1;
  const k = 2 * Math.PI * modeNumber / parameters.railSites;
  const omega = 2 * Math.sqrt(parameters.springConstant / parameters.mass) * Math.abs(Math.sin(k / 2));
  const bondFactor = 2 * Math.abs(Math.sin(k / 2));
  const coupling = parameters.bondStrainMatrixElement * bondFactor
    / Math.sqrt(2 * parameters.mass * parameters.railSites * omega);
  return { modeNumber, k, omega, coupling, energy: parameters.boundEnergy + omega };
});

const dimension = modes.length + 1;
const derivative = (re, im) => {
  const dr = Array(dimension).fill(0);
  const di = Array(dimension).fill(0);
  let h0r = parameters.excitedEnergy * re[0];
  let h0i = parameters.excitedEnergy * im[0];
  for (let j = 0; j < modes.length; j++) {
    const { coupling, energy } = modes[j];
    h0r += coupling * re[j + 1];
    h0i += coupling * im[j + 1];
    const hjr = energy * re[j + 1] + coupling * re[0];
    const hji = energy * im[j + 1] + coupling * im[0];
    dr[j + 1] = hji;
    di[j + 1] = -hjr;
  }
  dr[0] = h0i;
  di[0] = -h0r;
  return { dr, di };
};
const shifted = (state, slope, amount) => state.map((value, i) => value + amount * slope[i]);
const rk4Step = (re, im, dt) => {
  const k1 = derivative(re, im);
  const k2 = derivative(shifted(re, k1.dr, dt / 2), shifted(im, k1.di, dt / 2));
  const k3 = derivative(shifted(re, k2.dr, dt / 2), shifted(im, k2.di, dt / 2));
  const k4 = derivative(shifted(re, k3.dr, dt), shifted(im, k3.di, dt));
  for (let i = 0; i < dimension; i++) {
    re[i] += dt * (k1.dr[i] + 2 * k2.dr[i] + 2 * k3.dr[i] + k4.dr[i]) / 6;
    im[i] += dt * (k1.di[i] + 2 * k2.di[i] + 2 * k3.di[i] + k4.di[i]) / 6;
  }
};
const stateLedger = (re, im) => {
  const populations = re.map((value, i) => value * value + im[i] * im[i]);
  const norm = populations.reduce((sum, value) => sum + value, 0);
  const excitedPopulation = populations[0];
  const capturedPopulation = populations.slice(1).reduce((sum, value) => sum + value, 0);
  const phononEnergy = populations.slice(1).reduce((sum, value, j) => sum + value * modes[j].omega, 0);
  const boundMatterEnergy = parameters.boundEnergy * capturedPopulation;
  const excitedMatterEnergy = parameters.excitedEnergy * excitedPopulation;
  const interactionEnergy = modes.reduce((sum, mode, j) => sum + 2 * mode.coupling * (re[0] * re[j + 1] + im[0] * im[j + 1]), 0);
  const totalEnergy = excitedMatterEnergy + boundMatterEnergy + phononEnergy + interactionEnergy;
  return { populations, norm, excitedPopulation, capturedPopulation, phononEnergy, boundMatterEnergy, excitedMatterEnergy, interactionEnergy, totalEnergy };
};

const re = Array(dimension).fill(0);
const im = Array(dimension).fill(0);
re[0] = 1;
const steps = Math.round(parameters.totalTime / parameters.timeStep);
const checkpointStride = Math.round(5 / parameters.timeStep);
const checkpoints = [];
for (let step = 0; step <= steps; step++) {
  if (step % checkpointStride === 0) {
    const ledger = stateLedger(re, im);
    checkpoints.push({ time: step * parameters.timeStep, excitedPopulation: ledger.excitedPopulation, capturedPopulation: ledger.capturedPopulation });
  }
  if (step < steps) rk4Step(re, im, parameters.timeStep);
}
const final = stateLedger(re, im);

const reverseRe = [...re];
const reverseIm = [...im];
for (let step = 0; step < steps; step++) rk4Step(reverseRe, reverseIm, -parameters.timeStep);
const reversed = stateLedger(reverseRe, reverseIm);
const reverseBathPopulation = reversed.populations.slice(1).reduce((sum, value) => sum + value, 0);
const reverseExcitedAmplitudeError = Math.hypot(reverseRe[0] - 1, reverseIm[0]);

const binWidth = 2 * Math.sqrt(parameters.springConstant / parameters.mass) / parameters.spectrumBins;
const spectrum = Array.from({ length: parameters.spectrumBins }, (_, bin) => ({
  omegaMin: bin * binWidth,
  omegaMax: (bin + 1) * binWidth,
  population: 0,
  energy: 0
}));
for (let j = 0; j < modes.length; j++) {
  const population = final.populations[j + 1];
  const bin = Math.min(parameters.spectrumBins - 1, Math.floor(modes[j].omega / binWidth));
  spectrum[bin].population += population;
  spectrum[bin].energy += population * modes[j].omega;
}

const boseOccupation = 1 / (Math.exp(parameters.inverseTemperature * gap) - 1);
const detailedBalance = {
  inverseTemperature: parameters.inverseTemperature,
  gap,
  boseOccupation,
  downwardFactor: boseOccupation + 1,
  upwardFactor: boseOccupation,
  upwardToDownwardRatio: boseOccupation / (boseOccupation + 1),
  expectedBoltzmannRatio: Math.exp(-parameters.inverseTemperature * gap)
};

const toy = JSON.parse(await readFile(toyPath, "utf8"));
const toyCapture = toy.comparisons.radiativeCapture;
const groupVelocityAtGap = Math.sqrt(parameters.springConstant / parameters.mass) * Math.sqrt(1 - (gap / 2) ** 2);
const recurrenceEstimate = parameters.railSites / groupVelocityAtGap;
const result = {
  schema: "admissibility.ssh-acoustic-phonon-capture-gate/1",
  date: "2026-10-25",
  targets: ["OT-036"],
  parent: "AZ-055",
  authority: "finite one-excitation unitary phonon benchmark; not a material-specific electron-capture prediction",
  parameters,
  microscopicChannel: {
    railHamiltonian: "H_ph=sum_n p_n^2/(2M)+K(u_(n+1)-u_n)^2/2",
    dispersion: "omega_k=2 sqrt(K/M)|sin(k/2)|",
    interaction: "H_int=D(u_1-u_0)(|b><e|+|e><b|)",
    modeCoupling: "|g_k|=D*2|sin(k/2)|/sqrt(2 M N omega_k)",
    zeroModeDecouples: true,
    modeCount: modes.length,
    phononBand: [0, 2 * Math.sqrt(parameters.springConstant / parameters.mass)],
    gapInsideBand: gap > 0 && gap < 2 * Math.sqrt(parameters.springConstant / parameters.mass),
    nearestResonantModes: [...modes].sort((a, b) => Math.abs(a.omega - gap) - Math.abs(b.omega - gap)).slice(0, 4)
  },
  dynamics: {
    method: "fourth-order Runge-Kutta evolution of the complete star Hamiltonian, with no sink term",
    checkpoints,
    recurrenceEstimate,
    final: {
      excitedPopulation: final.excitedPopulation,
      capturedPopulation: final.capturedPopulation,
      conditionalMeanPhononEnergy: final.phononEnergy / final.capturedPopulation,
      norm: final.norm,
      normResidual: final.norm - 1,
      excitedMatterEnergy: final.excitedMatterEnergy,
      boundMatterEnergy: final.boundMatterEnergy,
      phononEnergy: final.phononEnergy,
      interactionEnergy: final.interactionEnergy,
      totalEnergy: final.totalEnergy,
      energyResidual: final.totalEnergy - parameters.excitedEnergy
    },
    timeReversal: {
      reverseExcitedPopulation: reversed.excitedPopulation,
      reverseBathPopulation,
      reverseExcitedAmplitudeError,
      interpretation: "Backward evolution with the same Hamiltonian reconstructs the initial coherent state; apparent capture before recurrence is unitary transfer, not an irreversible sink."
    },
    emittedSpectrum: spectrum
  },
  detailedBalance,
  comparisonToToyBath: {
    toyModel: toyCapture.model,
    toyFinalTime: toyCapture.totalTime,
    toyCapturedPopulation: toyCapture.final.capturedPopulation,
    toyConditionalMeanEmissionEnergy: toyCapture.final.conditionalMeanPhotonEnergy,
    phononCapturedPopulation: final.capturedPopulation,
    phononConditionalMeanEmissionEnergy: final.phononEnergy / final.capturedPopulation,
    difference: "The toy bath prescribed a Gaussian-like spectral envelope around the gap. The phonon benchmark derives its finite band, density of states, zero-mode suppression and coupling weights from one harmonic rail and a local bond-strain operator."
  },
  sourceBoundary: {
    admitted: [
      "the phonon frequencies and relative mode couplings follow from the declared harmonic rail and local strain interaction",
      "norm, total energy and complex phase information remain inside one finite unitary state",
      "the Bose upward/downward factors satisfy detailed balance exactly"
    ],
    withheld: [
      "the transition matrix element D is not derived from the static SSH cluster wavefunctions or a named material",
      "the one-excitation truncation omits multiphonon relaxation, lattice anharmonicity and thermal initial mixtures",
      "finite rail dynamics recur; the reported transfer is a pre-recurrence benchmark, not permanent irreversible capture"
    ],
    literature: [
      { title: "Solitons in Polyacetylene", url: "https://doi.org/10.1103/PhysRevLett.42.1698", use: "the SSH ancestor ties electronic hopping to bond displacement" },
      { title: "Strong-coupled electron-acoustic-phonon system in one dimension", url: "https://doi.org/10.1103/PhysRevB.24.714", use: "one-dimensional acoustic deformation-potential coupling and phonon spectral restructuring" },
      { title: "Non-Markovian dynamics of double quantum dot charge qubits due to acoustic phonons", url: "https://arxiv.org/abs/cond-mat/0505621", use: "finite-memory acoustic-phonon dynamics as a warning against assuming a Markov sink" }
    ]
  },
  verdict: {
    closed: "A source-shaped acoustic channel now replaces the hand-shaped scalar spectrum: its dispersion and relative couplings are derived from a harmonic rail and local bond strain, and the finite unitary evolution closes norm, energy, phase reversal and detailed balance.",
    implication: "Substantial pre-recurrence population transfer does not require a fitted sink. It does require the transition gap to lie in the phonon band and a nonzero strain matrix element; the finite bath remains reversible.",
    open: "The strain matrix element has not been computed from the actual SSH-plus-local eigenstates or calibrated to a material, and multiphonon, thermal, anharmonic and infinite-volume limits remain absent.",
    nextCalculation: "Use the AZ-055 cluster eigenvectors to evaluate a declared bond-modulation operator between the incoming/resonant and bound states; attach that matrix element to an infinite or converged phonon rail, scan gap versus band and temperature, and test whether the pre-recurrence plateau converges before calling the process capture."
  }
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, microscopicChannel: result.microscopicChannel, final: result.dynamics.final, timeReversal: result.dynamics.timeReversal, detailedBalance, comparisonToToyBath: result.comparisonToToyBath }, null, 2));
