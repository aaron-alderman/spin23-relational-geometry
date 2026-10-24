import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/admissibility-photonic-selector-chip-sweep-v1.json");

const s = Math.sqrt(7) / 4;
const c = 3 / 4;
const epsAdMax = 0.02;
const epsRel = 0.05;
const ratioLimit = epsRel * epsAdMax / (2 * Math.PI * s);

const add = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, q) => a.map(x => q * x);
const norm2 = state => state.reduce((sum, x) => sum + x * x, 0);

function derivative(state, z, cfg) {
  const { kappa, length, orientation, deltaRatio, gammaRatio, commonLossRatio } = cfg;
  const phi = orientation * 2 * Math.PI * z / length;
  const n = [s * Math.cos(phi), s * Math.sin(phi), c];
  const delta = deltaRatio * kappa;
  const gamma = gammaRatio * kappa;
  const common = commonLossRatio * kappa;
  const detuning = [0, delta / 2, -delta / 2, 0];
  const loss = [common, common + gamma / 2, common - gamma / 2, common];
  const A = [
    [0, kappa * n[0], kappa * n[1], kappa * n[2]],
    [kappa * n[0], detuning[1], 0, 0],
    [kappa * n[1], 0, detuning[2], 0],
    [kappa * n[2], 0, 0, detuning[3]],
  ];
  const out = Array(8).fill(0);
  for (let i = 0; i < 4; i += 1) {
    let ay = 0;
    let ax = 0;
    for (let j = 0; j < 4; j += 1) {
      ay += A[i][j] * state[2 * j + 1];
      ax += A[i][j] * state[2 * j];
    }
    out[2 * i] = ay - loss[i] * state[2 * i];
    out[2 * i + 1] = -ax - loss[i] * state[2 * i + 1];
  }
  return out;
}

function evolve(initial, cfg) {
  const steps = Math.max(4000, Math.ceil(cfg.kappa * cfg.length * 40));
  const h = cfg.length / steps;
  let state = initial;
  for (let step = 0; step < steps; step += 1) {
    const z = step * h;
    const k1 = derivative(state, z, cfg);
    const k2 = derivative(add(state, scale(k1, h / 2)), z + h / 2, cfg);
    const k3 = derivative(add(state, scale(k2, h / 2)), z + h / 2, cfg);
    const k4 = derivative(add(state, scale(k3, h)), z + h, cfg);
    state = add(state, scale(add(add(k1, scale(k2, 2)), add(scale(k3, 2), k4)), h / 6));
  }
  return state;
}

const dark = [
  [0, c, 0, -s],
  [0, 0, 1, 0],
];

const inner = (basis, state) => {
  let re = 0;
  let im = 0;
  for (let i = 0; i < 4; i += 1) {
    re += basis[i] * state[2 * i];
    im += basis[i] * state[2 * i + 1];
  }
  return [re, im];
};

function metrics(cfg) {
  const outputs = dark.map(vector => {
    const initial = vector.flatMap(x => [x, 0]);
    return evolve(initial, cfg);
  });
  const M = dark.map(row => outputs.map(output => inner(row, output)));
  const gram = [
    [0, 0],
    [0, 0],
  ];
  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      let re = 0;
      let im = 0;
      for (let k = 0; k < 2; k += 1) {
        const [ar, ai] = M[k][i];
        const [br, bi] = M[k][j];
        re += ar * br + ai * bi;
        im += ar * bi - ai * br;
      }
      gram[i][j] = [re, im];
    }
  }
  const tr = gram[0][0][0] + gram[1][1][0];
  const det = gram[0][0][0] * gram[1][1][0] - (gram[0][1][0] ** 2 + gram[0][1][1] ** 2);
  const disc = Math.sqrt(Math.max(0, tr * tr - 4 * det));
  const sv = [Math.sqrt(Math.max(0, (tr + disc) / 2)), Math.sqrt(Math.max(0, (tr - disc) / 2))];
  const nu = Math.log(sv[0] / sv[1]);
  const darkPowers = outputs.map(output => dark.reduce((sum, row) => {
    const [re, im] = inner(row, output);
    return sum + re * re + im * im;
  }, 0));
  const totalPowers = outputs.map(norm2);
  const retention = darkPowers.reduce((a, b) => a + b, 0) / totalPowers.reduce((a, b) => a + b, 0);
  const targets = {
    plus: [[0, -1], [1, 0]],
    minus: [[0, 1], [-1, 0]],
  };
  const fidelity = target => {
    let re = 0;
    let im = 0;
    for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
      re += target[i][j] * M[i][j][0];
      im += target[i][j] * M[i][j][1];
    }
    return Math.hypot(re, im) / Math.max(1e-15, sv[0] + sv[1]);
  };
  const orientedAmplitude = [
    (M[1][0][0] - M[0][1][0]) / 2,
    (M[1][0][1] - M[0][1][1]) / 2,
  ];
  return {
    orientation: cfg.orientation,
    couplingLengthProduct: cfg.kappa * cfg.length,
    deltaRatio: cfg.deltaRatio,
    gammaRatio: cfg.gammaRatio,
    adiabaticEstimate: 2 * Math.PI * s / (cfg.kappa * cfg.length),
    relativeSplittingAccumulation: cfg.deltaRatio * cfg.kappa * cfg.length,
    differentialLossAccumulation: cfg.gammaRatio * cfg.kappa * cfg.length,
    darkSubspacePowerRetention: retention,
    singularValues: sv,
    logSingularValueRatio: nu,
    transferMatrix: M,
    orientedAntisymmetricAmplitude: orientedAmplitude,
    phaseBlindProjectiveQuarterTurnFidelity: Math.max(fidelity(targets.plus), fidelity(targets.minus)),
    phaseBlindSignDegeneracy: Math.abs(fidelity(targets.plus) - fidelity(targets.minus)) < 1e-12,
  };
}

const products = [12, 24, 48, 96, 144, 208, 240, 300];
const ratios = [0, 0.0001, ratioLimit, 0.0005, 0.001];
const sweep = [];
for (const product of products) {
  for (const ratio of ratios) {
    for (const orientation of [1, -1]) {
      sweep.push(metrics({
        kappa: 20,
        length: product / 20,
        orientation,
        deltaRatio: ratio,
        gammaRatio: ratio,
        commonLossRatio: 0.001,
      }));
    }
  }
}

const baselineConfig = {
  kappaPerMillimetre: 20,
  deviceLengthMillimetres: 12,
  couplingLengthProduct: 240,
  outerPath: "n(z)=(sqrt(7)/4 cos(2pi z/L), sqrt(7)/4 sin(2pi z/L), 3/4)",
  assumedResidualSplittingRatio: 0.0001,
  assumedDifferentialAmplitudeLossRatio: 0.0001,
  assumedCommonAmplitudeLossRatio: 0.001,
};
const baseline = sweep.filter(row => row.couplingLengthProduct === 240 && row.deltaRatio === 0.0001);

const result = {
  protocol: "admissibility-photonic-selector-chip-sweep/1",
  date: "2026-10-25",
  model: {
    carrier: "four-waveguide chiral star with one bright central guide and a two-dimensional dark outer subspace",
    equation: "i dpsi/dz = (H(z)-i Gamma) psi",
    scope: "coupled-mode preflight; not full-wave electromagnetic simulation and not a fabrication certificate",
  },
  publishedAnchor: {
    source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12006547/",
    reported: {
      platform: "two-layer silicon-nitride-on-insulator",
      waveguideCrossSectionNanometres: [800, 450],
      so2FootprintMicrometres: [5, 2, 600],
      darkOutputPowerApproximately: 0.95,
      operatingBandwidthNanometresGreaterThan: 100,
      insertionLossDecibelsLessThan: 2,
      matrixFidelityRange: [0.991, 0.999],
    },
    notReportedInRequiredForm: ["kappa0", "residual dark-doublet splitting delta/kappa0", "differential dark-subspace loss gamma/kappa0"],
  },
  corpusBudget: {
    latitudeSine: s,
    adiabaticTolerance: epsAdMax,
    relativeEvolutionTolerance: epsRel,
    maximumRelativeSplittingOrDifferentialLoss: ratioLimit,
    minimumCouplingLengthProduct: 2 * Math.PI * s / epsAdMax,
    couplingRequiredForPublishedLengthPerMillimetre: (2 * Math.PI * s / epsAdMax) / 0.6,
  },
  baselineConfig,
  baseline,
  sweep,
  fabricationPathGate: {
    verdict: "signed-coupling-schedule-not-yet-fabrication-native",
    reason: "The exact constant-latitude quarter-turn schedule crosses negative components of kappa, whereas ordinary passive gap-controlled evanescent couplings are nonnegative. The published SO(2) work treats theta=pi/2 as a limiting or separate braiding construction rather than a generic finite fixed-coupling loop.",
    reopenRoutes: [
      "supply independently calibrated pi phase sections or auxiliary paths that realize signed effective couplings",
      "cascade two separately returned SO(2) modules whose calibrated angles sum to pi/2",
      "replace the exact latitude by a full-wave-verified positive-octant/braiding path and recompute the robustness budget",
    ],
  },
  twoModuleAlternative: {
    target: "two independently calibrated pi/4 holonomy modules with reversed copies",
    publishedStatus: "architecture-supported but not reported as the complete AZ-027 tuple",
    retainedPowerIfEachModuleRetains095: 0.95 ** 2,
    caution: "Published matrix fidelity and approximately 95% dark power do not identify delta/kappa0 or differential gamma/kappa0 and therefore do not certify the analytic budget.",
  },
  selectorCompatibility: {
    verdict: "separate-stage-required",
    reason: "A passive anisotropic selector strong enough to contract a dark-state projective coordinate is itself differential loss or splitting; leaving it active during the holonomy stage spends the same nu/delta budget used to certify geometry.",
    admissibleArchitecture: "calibrate Y independently; switch or spatially separate it from the holonomy loop; perform measurement-conditioned reinjection or a separately modelled dissipative cascade; report Y-off and Y-on records independently",
    forbiddenShortcut: "do not interpret unreported passive filtering inside the holonomy guide as independent two-datum selection",
  },
  admission: {
    coupledModePassRequires: ["adiabaticEstimate <= 0.02", "delta*kappa0*L <= 0.05", "gamma*kappa0*L <= 0.05", "reversal flips the reference-anchored oriented amplitude", "dark-subspace retention and full complex transfer are reported"],
    physicalPassRequires: ["measured kappa(z)", "measured residual dark-doublet propagation-constant split", "measured differential dark-mode attenuation", "full-wave verification", "fabrication-tolerance ensemble", "complex 2x2 process tomography against an external phase reference", "independently calibrated selector stage"],
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputPath,
  minimumCouplingLengthProduct: result.corpusBudget.minimumCouplingLengthProduct,
  baseline,
  rows: sweep.length,
}, null, 2));
