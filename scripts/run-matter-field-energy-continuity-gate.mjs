import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/matter-field-energy-continuity-gate-v1.json");

const C = (re = 0, im = 0) => [re, im];
const add = (a, b) => C(a[0] + b[0], a[1] + b[1]);
const sub = (a, b) => C(a[0] - b[0], a[1] - b[1]);
const scale = (s, a) => C(s * a[0], s * a[1]);
const mulI = a => C(-a[1], a[0]);
const conj = a => C(a[0], -a[1]);
const abs = a => Math.hypot(a[0], a[1]);
const vAdd = (a, b) => a.map((x, i) => add(x, b[i]));
const vSub = (a, b) => a.map((x, i) => sub(x, b[i]));
const vScale = (s, a) => a.map(x => scale(s, x));
const vConj = a => a.map(conj);
const vMulI = a => a.map(mulI);
const dot = (a, b) => a.reduce((sum, x, i) => add(sum, [x[0] * b[i][0] - x[1] * b[i][1], x[0] * b[i][1] + x[1] * b[i][0]]), C());
const cross = (a, b) => [
  sub([a[1][0] * b[2][0] - a[1][1] * b[2][1], a[1][0] * b[2][1] + a[1][1] * b[2][0]], [a[2][0] * b[1][0] - a[2][1] * b[1][1], a[2][0] * b[1][1] + a[2][1] * b[1][0]]),
  sub([a[2][0] * b[0][0] - a[2][1] * b[0][1], a[2][0] * b[0][1] + a[2][1] * b[0][0]], [a[0][0] * b[2][0] - a[0][1] * b[2][1], a[0][0] * b[2][1] + a[0][1] * b[2][0]]),
  sub([a[0][0] * b[1][0] - a[0][1] * b[1][1], a[0][0] * b[1][1] + a[0][1] * b[1][0]], [a[1][0] * b[0][0] - a[1][1] * b[0][1], a[1][0] * b[0][1] + a[1][1] * b[0][0]])
];
const realVector = k => k.map(x => C(x, 0));
const key = k => k.join(",");
const parseKey = value => value.split(",").map(Number);
const minus = k => k.map(x => -x);
const sumK = (a, b) => a.map((x, i) => x + b[i]);
const diffK = (a, b) => a.map((x, i) => x - b[i]);

const seeds = [
  { k: [1, 0, 0], A: [[0.2, 0.1], [-0.4, 0.3], [0.1, -0.2]], Adot: [[0.1, -0.2], [0.3, 0.1], [-0.2, 0.2]], Addot: [[-0.3, 0.1], [0.2, -0.1], [0.1, 0.3]], phi: [0.17, -0.08], phidot: [-0.11, 0.04], chi: [0.07, 0.03], chidot: [-0.02, 0.05], chiddot: [0.06, -0.01] },
  { k: [0, 1, 0], A: [[-0.1, 0.25], [0.2, -0.15], [0.35, 0.05]], Adot: [[0.22, 0.08], [-0.12, 0.18], [0.07, -0.16]], Addot: [[0.05, -0.09], [-0.14, 0.12], [0.19, 0.02]], phi: [-0.09, 0.13], phidot: [0.03, -0.07], chi: [-0.04, 0.06], chidot: [0.08, 0.01], chiddot: [-0.03, 0.02] },
  { k: [1, 1, 0], A: [[0.13, -0.04], [0.06, 0.09], [-0.21, 0.17]], Adot: [[-0.08, 0.11], [0.16, -0.03], [0.12, 0.07]], Addot: [[0.09, 0.05], [-0.07, 0.08], [0.04, -0.12]], phi: [0.05, 0.02], phidot: [-0.06, -0.03], chi: [0.02, -0.05], chidot: [0.01, 0.04], chiddot: [-0.02, 0.03] }
];

const potentials = new Map();
for (const row of seeds) {
  potentials.set(key(row.k), row);
  potentials.set(key(minus(row.k)), {
    k: minus(row.k),
    A: vConj(row.A), Adot: vConj(row.Adot), Addot: vConj(row.Addot),
    phi: conj(row.phi), phidot: conj(row.phidot), chi: conj(row.chi),
    chidot: conj(row.chidot), chiddot: conj(row.chiddot)
  });
}

const fieldsFrom = row => {
  const k = realVector(row.k);
  const gradPhi = vMulI(vScale(1, k.map((entry, i) => scale(row.k[i], row.phi))));
  const gradPhiDot = vMulI(k.map((entry, i) => scale(row.k[i], row.phidot)));
  const E = vScale(-1, vAdd(row.Adot, gradPhi));
  const B = vMulI(cross(k, row.A));
  const dE = vScale(-1, vAdd(row.Addot, gradPhiDot));
  const dB = vMulI(cross(k, row.Adot));
  const current = vSub(vMulI(cross(k, B)), dE);
  return { E, B, dE, dB, current };
};
const fields = new Map([...potentials].map(([name, row]) => [name, fieldsFrom(row)]));

const qs = new Map();
for (const first of potentials.values()) for (const second of potentials.values()) {
  const q = sumK(first.k, second.k);
  qs.set(key(q), q);
}
const getField = k => fields.get(key(k));
const convolution = (q, fn) => {
  let total = C();
  for (const row of potentials.values()) {
    const other = getField(diffK(q, row.k));
    if (other) total = add(total, fn(getField(row.k), other));
  }
  return total;
};
const poyntingRows = [];
for (const q of qs.values()) {
  const duField = add(
    scale(0.5, convolution(q, (a, b) => add(dot(a.dE, b.E), dot(a.E, b.dE)))),
    scale(0.5, convolution(q, (a, b) => add(dot(a.dB, b.B), dot(a.B, b.dB))))
  );
  const S = [0, 1, 2].map(component => convolution(q, (a, b) => cross(a.E, b.B)[component]));
  const work = convolution(q, (a, b) => dot(a.current, b.E));
  const divergenceS = mulI(dot(realVector(q), S));
  const residual = add(add(duField, divergenceS), work);
  poyntingRows.push({ q, duField, divergenceS, work, residual, residualNorm: abs(residual) });
}

let maxGaugeFieldResidual = 0;
for (const row of potentials.values()) {
  const k = realVector(row.k);
  const transformed = {
    ...row,
    A: vAdd(row.A, vMulI(row.k.map(value => scale(value, row.chi)))),
    Adot: vAdd(row.Adot, vMulI(row.k.map(value => scale(value, row.chidot)))),
    Addot: vAdd(row.Addot, vMulI(row.k.map(value => scale(value, row.chiddot)))),
    phi: sub(row.phi, row.chidot),
    phidot: sub(row.phidot, row.chiddot)
  };
  const before = fieldsFrom(row);
  const after = fieldsFrom(transformed);
  for (const label of ["E", "B", "dE", "dB", "current"]) {
    for (let i = 0; i < 3; i++) maxGaugeFieldResidual = Math.max(maxGaugeFieldResidual, abs(sub(before[label][i], after[label][i])));
  }
}

const selected = poyntingRows.find(row => key(row.q) === "1,1,0");
const q = selected.q;
const matterCurrent = [C(0.31, -0.07), C(-0.12, 0.09), C(0.04, 0.02)];
const G = [C(0.08, 0.03), C(-0.05, 0.04), C(0.02, -0.01)];
const Gdot = [C(-0.03, 0.06), C(0.07, -0.02), C(-0.01, 0.05)];
const divMatter = mulI(dot(realVector(q), matterCurrent));
const duMatter = sub(selected.work, divMatter);
const totalResidual = add(add(selected.duField, selected.divergenceS), add(duMatter, divMatter));
const shiftedDuMatter = add(duMatter, mulI(dot(realVector(q), Gdot)));
const shiftedMatterCurrent = vSub(matterCurrent, Gdot);
const shiftedResidual = add(
  add(selected.duField, selected.divergenceS),
  add(shiftedDuMatter, mulI(dot(realVector(q), shiftedMatterCurrent)))
);

const omegaScan = [1, 0.1, 0.01, 0.001].map(omega => ({
  omega,
  currentGaugeShiftNorm: Math.hypot(...vScale(omega, G).flat()),
  shiftOverOmega: Math.hypot(...vScale(omega, G).flat()) / omega
}));

const screeningRatios = [0.01, 0.1, 1, 10, 100].map(qOverKappa => ({
  qOverKappa,
  gradientFieldFraction: qOverKappa ** 2 / (1 + qOverKappa ** 2),
  screeningSectorFraction: 1 / (1 + qOverKappa ** 2)
}));

const result = {
  schema: "admissibility.matter-field-energy-continuity-gate/1",
  date: "2026-10-25",
  targets: ["OT-040", "OT-008"],
  parent: "AZ-047",
  authority: "finite Fourier-mode identity and infrared bookkeeping certificate; not a material thermal-conductivity calculation",
  convention: "periodic Fourier amplitudes with epsilon0=mu0=c=1; products are exact finite convolutions",
  maxwellMatterCertificate: {
    equations: ["dE/dt=i k cross B-j", "dB/dt=-i k cross E", "du_field/dt+i q dot S=-j dot E", "du_matter/dt+i q dot J_matter=+j dot E"],
    fieldModeCount: fields.size,
    testedTotalWavevectors: poyntingRows.length,
    maximumPoyntingResidual: Math.max(...poyntingRows.map(row => row.residualNorm)),
    selectedTotalContinuityResidual: abs(totalResidual),
    rows: poyntingRows
  },
  electromagneticGaugeCertificate: {
    transformation: "A->A+grad chi; phi->phi-d_t chi",
    checkedObjects: ["E", "B", "dE/dt", "dB/dt", "j"],
    maximumResidual: maxGaugeFieldResidual
  },
  energyDensityGaugeCertificate: {
    transformation: "u_m->u_m+div G; J_m->J_m-d_t G",
    unshiftedContinuityResidual: abs(totalResidual),
    shiftedContinuityResidual: abs(shiftedResidual),
    finiteFrequencyCurrentShift: "Delta J=+i omega G for exp(-i omega t)",
    omegaScan,
    dcCondition: "The current-gauge difference vanishes linearly as omega->0 only when G and its correlations remain bounded; singular infrared polarization is an explicit failure mode."
  },
  screenedLongitudinalLedger: {
    staticKernel: "V_kappa(q)=1/[epsilon0(q^2+kappa^2)]",
    localCompletion: "minimal quadratic scalar completion epsilon0[(grad phi)^2+kappa^2 phi^2]/2-rho phi",
    totalModeEnergy: "|rho_q|^2/[2 epsilon0(q^2+kappa^2)]",
    decomposition: "within that completion, gradient electric fraction=q^2/(q^2+kappa^2); non-gradient screening-sector fraction=kappa^2/(q^2+kappa^2)",
    screeningRatios,
    limitCollision: {
      "q_over_kappa_to_zero": "non-gradient screening sector holds all of the static mode energy in the minimal local completion",
      "q_over_kappa_to_infinity": "electric gradient holds all of the static mode energy",
      implication: "In the minimal local completion a phenomenologically screened Coulomb kernel cannot be completed by Maxwell E^2 alone; a physical model must identify the sector represented by the kappa term and give it dynamics, energy and flux."
    }
  },
  sourceBoundary: {
    established: [
      "Poynting continuity gives a local gauge-invariant total current when finite-speed electromagnetic fields and matter work are retained.",
      "Equivalent local energy densities shift the current by a total time derivative, so a regular dc Green-Kubo coefficient is unchanged.",
      "In the minimal local scalar completion, longitudinal screening moves energy between the electric gradient and the non-gradient screening sector as q/kappa changes."
    ],
    notEstablished: [
      "a source-native dynamical photon or polarization completion of the projected t-J plus Ewald Hamiltonian",
      "commutation of thermodynamic-size, q->0, kappa->0 and c->infinity limits",
      "the transport/magnetization subtraction and low-frequency KMS response of that completion"
    ],
    literature: [
      { title: "Gauge invariance of thermal transport coefficients", url: "https://arxiv.org/abs/1601.00158", use: "energy-density gauges differ by a divergence and macroscopic fluxes by a total time derivative under extensivity and regularity assumptions" },
      { title: "Thermoelectric transport coefficients in gapped systems", url: "https://doi.org/10.1103/PhysRevB.103.235101", use: "energy-current gauge covariance and the separation of transport from magnetization currents" },
      { title: "Relative and absolute transport coefficients", url: "https://doi.org/10.1103/PhysRevB.104.035150", use: "transport/magnetization ambiguity and gauge-invariant heat-current combinations" }
    ]
  },
  verdict: {
    closed: "The finite-q matter-plus-Maxwell continuity identity, potential-gauge invariance and bounded energy-density retyping are exact on the finite Fourier packet. The field route is therefore mathematically available and does not require assigning every Coulomb bond to a matter site.",
    newlyLocated: "Screening is not a harmless replacement of 1/q^2 by 1/(q^2+kappa^2): in the minimal local scalar completion, at q much smaller than kappa the non-gradient screening sector, not the electric gradient, holds nearly all longitudinal mode energy. A physical realization of that sector must appear in any total-current comparison.",
    open: "The corpus Hamiltonian has instantaneous Ewald interactions and no dynamical photon or explicit screening carrier. Its physical thermal response cannot be equated to the finite-c field certificate until one such completion is matched and the size, q, screening, frequency and c limits are collided with magnetization currents removed.",
    nextCalculation: "Choose a concrete dynamical completion of the same projected lattice matter—finite-c lattice electrodynamics for the unscreened arm and an explicit polarizable screening field for the screened arm. Integrate each out to recover the audited Ewald kernel, derive the total finite-q KMS current, and compare dc transport after common limit ordering."
  }
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, maxwellMatterCertificate: { ...result.maxwellMatterCertificate, rows: undefined }, electromagneticGaugeCertificate: result.electromagneticGaugeCertificate, energyDensityGaugeCertificate: result.energyDensityGaugeCertificate, screenedLongitudinalLedger: result.screenedLongitudinalLedger }, null, 2));
