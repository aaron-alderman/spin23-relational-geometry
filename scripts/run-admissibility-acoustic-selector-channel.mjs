import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/admissibility-acoustic-selector-channel-v1.json");

const m = 1 / 3;
const y = [[1, 0], [0, 0]];
const perturbations = [0.001, 0.003, 0.01, 0.03];

const pureDensity = theta => {
  const x = Math.cos(theta);
  const z = Math.sin(theta);
  return [[x * x, x * z], [x * z, z * z]];
};
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const scale = (A, q) => A.map(row => row.map(v => q * v));
const traceDistanceRealQubit = (A, B) => {
  const D = A.map((row, i) => row.map((v, j) => v - B[i][j]));
  const tr = D[0][0] + D[1][1];
  const a = D[0][0] - tr / 2;
  const d = D[1][1] - tr / 2;
  const b = D[0][1];
  const radius = Math.sqrt(((a - d) / 2) ** 2 + b * b);
  return radius;
};
const affine = rho => add(scale(rho, m), scale(y, 1 - m));
const filter = (rho, r) => {
  const raw = [[rho[0][0], r * rho[0][1]], [r * rho[1][0], r * r * rho[1][1]]];
  const tr = raw[0][0] + raw[1][1];
  return raw.map(row => row.map(v => v / tr));
};

const rows = perturbations.map(theta => {
  const rho = pureDensity(theta);
  const inputDistance = traceDistanceRealQubit(rho, y);
  const affineOut = affine(rho);
  const filterOut = filter(rho, m);
  return {
    thetaRadians: theta,
    inputTraceDistance: inputDistance,
    neutralUnitaryDistanceRatio: 1,
    affineReplacementDistanceRatio: traceDistanceRealQubit(affineOut, y) / inputDistance,
    passiveFilterDistanceRatio: traceDistanceRealQubit(filterOut, y) / inputDistance,
    affineOutput: affineOut,
    passiveFilterOutput: filterOut,
  };
});

const result = {
  protocol: "admissibility-acoustic-selector-channel/1",
  date: "2026-10-25",
  exactClaims: {
    unitaryNoGo: "For a fixed lossless coherent transfer U, trace distance and projective angle are preserved; repeated U cannot create an attracting selector fixed point.",
    passiveLinearNoGo: "For a fixed passive transfer M, any generic projective attraction is controlled by unequal singular/eigenvalue magnitudes and is therefore ordinary filtering, loss or gain selection.",
    affineType: "R(rho;Y)=m rho+(1-m)Y Tr(rho) is a linear trace-preserving replacement channel on density/covariance matrices, not a linear map on coherent pressure vectors.",
  },
  parameters: {
    tangentSlope: m,
    selectorProjector: y,
    matchedPassiveFilterSingularValues: [1, m],
    matchedPassiveFilterLogSingularValueRatio: Math.log(1 / m),
    orthogonalInputPowerTransmission: m * m,
  },
  localComparison: rows,
  implementation: {
    ensembleChannel: {
      protocol: "On each independently indexed shot or time slot, route the loop-returned field with probability m and inject the independently calibrated Y preparation with probability 1-m; tomograph the ensemble covariance after preserving branch labels for audit.",
      realizes: "the exact affine replacement channel",
      limitation: "individual coherent shots do not contract; only the ensemble covariance does",
    },
    singleTrajectoryOption: {
      protocol: "measure the state, compute the declared update, and actively synthesize the next input, or couple to a separately characterized nonlinear reservoir",
      requiredLedger: ["measurement noise", "feedback latency", "control work", "amplifier noise", "reset cost", "branch record"],
      limitation: "this is an engineered feedback dynamics and must not be described as spontaneous selection",
    },
  },
  discriminator: {
    records: [
      "complex pressure vector on every shot",
      "shot/time-slot branch label",
      "unnormalized transmitted power",
      "2x2 ensemble covariance",
      "singular values of every deterministic block",
      "coherence and population perturbations about Y",
    ],
    decision: "Affine replacement scales every traceless covariance perturbation by m. A matched passive filter has log singular-value ratio ln(3), transmits the orthogonal input with power 1/9, and scales coherence and population anisotropically. Loss-matched tomography separates them.",
  },
  sourcePrecedents: [
    {
      role: "order-sensitive acoustic transport",
      url: "https://arxiv.org/abs/2110.08789",
      boundary: "Z3 pump cycles cross band degeneracies and do not implement repeated affine selection",
    },
    {
      role: "discrete quaternionic acoustic phase composition",
      url: "https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.132.216602",
      boundary: "endpoint phase classes do not supply selector dynamics",
    },
  ],
  verdict: {
    passiveLoopPlusSelector: "closed_as_a_distinct_nonloss_selection_test",
    ensembleReplacementEmulator: "exact_and_buildable",
    singleTrajectorySelection: "active_feedback_or_nonlinear_reservoir_required",
    physicalFirewall: "The emulator tests typing and detector discipline; it does not evidence spontaneous symmetry breaking or new physics.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, rows, verdict: result.verdict }, null, 2));
