import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/admissibility-thermal-hall-discriminator-v1.json");

const solve3 = (A, b) => {
  const M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < 3; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < 3; row += 1) if (Math.abs(M[row][col]) > Math.abs(M[pivot][col])) pivot = row;
    [M[col], M[pivot]] = [M[pivot], M[col]];
    const scale = M[col][col];
    for (let j = col; j < 4; j += 1) M[col][j] /= scale;
    for (let row = 0; row < 3; row += 1) {
      if (row === col) continue;
      const q = M[row][col];
      for (let j = col; j < 4; j += 1) M[row][j] -= q * M[col][j];
    }
  }
  return M.map(row => row[3]);
};

const profileActivation = (temperatures, logs, gap) => {
  const rows = temperatures.map(T => [1, Math.log(T), -gap / T]);
  const gram = Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => rows.reduce((s, row) => s + row[i] * row[j], 0)));
  const rhs = Array.from({ length: 3 }, (_, i) => rows.reduce((s, row, k) => s + row[i] * logs[k], 0));
  const [offset, power, activationOrder] = solve3(gram, rhs);
  const inverseActivationColumn = solve3(gram, [0, 0, 1]);
  const assumedLogNoise = 0.02;
  const residuals = rows.map((row, i) => logs[i] - (offset * row[0] + power * row[1] + activationOrder * row[2]));
  return {
    offset,
    power,
    activationOrder,
    activationOrderStandardErrorAtTwoPercentLogNoise: assumedLogNoise * Math.sqrt(inverseActivationColumn[2]),
    rmsLogResidual: Math.sqrt(residuals.reduce((s, x) => s + x * x, 0) / residuals.length),
  };
};

const logSignal = (T, { offset, power, activationOrder, gap }) => offset + power * Math.log(T) - activationOrder * gap / T;
const temperatureWindows = [
  { id: "deep", minimum: 0.08, maximum: 0.25, points: 18 },
  { id: "middle", minimum: 0.15, maximum: 0.40, points: 18 },
  { id: "narrow", minimum: 0.20, maximum: 0.30, points: 12 },
];
const truthModels = {
  hybridBand: { offset: 0.2, power: -1, activationOrder: 1, gap: 1 },
  manyBodySkew: { offset: -0.1, power: -2, activationOrder: 2, gap: 1 },
};

const activationFits = temperatureWindows.flatMap(window => {
  const temperatures = Array.from({ length: window.points }, (_, i) => window.minimum + (window.maximum - window.minimum) * i / (window.points - 1));
  return Object.entries(truthModels).map(([truth, parameters]) => ({
    window: window.id,
    truth,
    temperaturesOverGap: temperatures,
    fitWithSpectroscopicGap: profileActivation(temperatures, temperatures.map(T => logSignal(T, parameters)), 1),
    boundary: "The fitted order is meaningful only when the relevant single-particle gap is measured independently and the low-temperature asymptotic regime is established.",
  }));
});

const interventions = [-1, 0, 1].map(control => {
  const magnonShift = 0.08 * control;
  const phononShift = 0.50 * control;
  const crossingShift = phononShift - magnonShift;
  const hybridHallFeatureShift = crossingShift;
  const skewHallFeatureShift = 0;
  return { control, magnonShift, phononShift, crossingShift, hybridHallFeatureShift, skewHallFeatureShift };
});

const slope = (rows, key) => {
  const numerator = rows.reduce((s, row) => s + row.control * row[key], 0);
  const denominator = rows.reduce((s, row) => s + row.control * row.control, 0);
  return numerator / denominator;
};
const crossingSlope = slope(interventions, "crossingShift");
const trackingRatios = {
  hybridBand: slope(interventions, "hybridHallFeatureShift") / crossingSlope,
  manyBodySkew: slope(interventions, "skewHallFeatureShift") / crossingSlope,
};

const result = {
  protocol: "admissibility-thermal-hall-discriminator/1",
  date: "2026-10-25",
  target: "OT-011",
  headlineCollision: "A field-odd or sign-changing thermal Hall trace can be produced by hybrid-band Berry curvature or intrinsic many-body skew scattering.",
  correctedBoundary: {
    disorder: "Controlled disorder remains necessary to exclude extrinsic side-jump and impurity-skew backgrounds, but it does not separate the two named mechanisms because the many-body skew mechanism is itself disorder-free.",
    linewidth: "Linewidth is a shared constraint and consistency check, not a unique mechanism label.",
    signChange: "A sign change is not a unique tag of hybrid-band geometry.",
  },
  activationAudit: {
    model: "log|kappa_xy| = a + p log(T) - n Delta_spec/T, with a and p profiled and Delta_spec measured independently",
    hybridBandExpectation: "n approximately 1 for a leading one-quasiparticle Berry-curvature contribution",
    manyBodySkewExpectation: "n approximately 2 in the low-temperature asymptotic derived for the magnon collision mechanism",
    gapCalibrationRule: "A fractional bias in Delta_spec produces the inverse fractional bias in fitted n; the spectroscopic gap and its covariance must therefore enter the joint fit.",
    fits: activationFits,
  },
  movingCrossingAudit: {
    intervention: "Tune a phonon frequency by isotope, strain or another lattice-native control while measuring the magnon and phonon spectra on the same specimen.",
    residualCoordinate: "Remove the measured direct magnon shift, then compare the Hall-feature shift with the measured avoided-crossing shift.",
    rows: interventions,
    trackingRatios,
    interpretation: "A hybrid-band contribution should track the moving anticrossing; a pure magnon-skew contribution has no necessary phonon-locking. Mixed mechanisms give an intermediate, temperature-dependent ratio.",
  },
  minimumExecutableBundle: [
    "same-specimen field- and temperature-resolved kappa_xx and kappa_xy",
    "same-specimen magnon and phonon spectroscopy resolving the relevant gap and avoided crossing",
    "a low-temperature activation fit with the spectroscopic gap frozen rather than inferred from Hall data",
    "a lattice-native phonon-moving intervention with the magnetic-spectrum shift retained as a nuisance control",
    "linewidth, geometry, contact, magnetization, domain and disorder records",
    "a held-out temperature or intervention setting and a joint mixture fit allowing both mechanisms",
  ],
  decision: {
    hybridSupported: "activation order near one and nuisance-corrected Hall-feature tracking ratio near one",
    skewSupported: "activation order near two and tracking ratio near zero, with collision phase space and linewidth jointly consistent",
    mixtureOrUnresolved: "intermediate or temperature-dependent coordinates, or either coordinate unstable to the declared nuisance model",
    killTest: "If both mechanisms remain freely refittable after the independently measured gap and moving-crossing intervention, report the detector-equivalence class rather than assigning geometry.",
  },
  sources: [
    {
      title: "Magnon-Polaron Driven Thermal Hall Effect in a Heisenberg-Kitaev Antiferromagnet",
      url: "https://arxiv.org/abs/2201.11396",
      role: "hybrid-band Berry-curvature mechanism and Na2Co2TeO6 thermal Hall data",
    },
    {
      title: "Thermal Hall Effect of Magnons from Many-Body Skew Scattering",
      url: "https://arxiv.org/abs/2407.00423",
      role: "disorder-free collision mechanism and doubled low-temperature activation asymptotic",
    },
    {
      title: "Direct observation of topological magnon polarons in a multiferroic material",
      url: "https://www.nature.com/articles/s41467-023-41791-9",
      role: "spectroscopic precedent for resolving hybridization and band inversion",
    },
  ],
  verdict: {
    oldBundle: "corrected_not_minimal",
    minimumDiscriminator: "activation_order_plus_moving_crossing",
    status: "protocol_specified_source_native_data_required",
    physicalFirewall: "The calculation identifies a separating measurement coordinate; it does not assign either mechanism to an existing material without same-specimen data.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, activationFits: activationFits.map(({ window, truth, fitWithSpectroscopicGap }) => ({ window, truth, ...fitWithSpectroscopicGap })), trackingRatios, verdict: result.verdict }, null, 2));
