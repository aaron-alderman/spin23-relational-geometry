import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/admissibility-yig-three-four-mode-fork-v1.json");

const gMaMHz = 6.63;
const remotePolaritonGapKHz = 2 * gMaMHz * 1000;
const az027Ratio = 0.00024061965677016708;
const mechanicalBareDampingKHz = 0.155;

const cases = [
  { drivePowerDbm: -6.8, couplingKHz: 3.06, polaritonDecayKHz: 6.99, mechanicalEffectiveDampingKHz: 0.250 },
  { drivePowerDbm: 2.4, couplingKHz: 5.40, polaritonDecayKHz: 0.25, mechanicalEffectiveDampingKHz: 0.255 },
  { drivePowerDbm: 16.53, couplingKHz: 25.71, polaritonDecayKHz: 0.45, mechanicalEffectiveDampingKHz: null },
].map(row => {
  const pairSplittingKHz = 2 * row.couplingKHz;
  const relativePairSplitting = pairSplittingKHz / remotePolaritonGapKHz;
  const measuredResolutionFloorKHz = Math.max(
    row.polaritonDecayKHz,
    row.mechanicalEffectiveDampingKHz ?? mechanicalBareDampingKHz,
  );
  return {
    ...row,
    pairSplittingKHz,
    remotePolaritonGapKHz,
    relativePairSplitting,
    az027Ratio,
    exceedsAz027ByFactor: relativePairSplitting / az027Ratio,
    spectrallyResolvedBySimpleLinewidthTest: pairSplittingKHz > measuredResolutionFloorKHz,
    measuredResolutionFloorKHz,
    strongCouplingByRateTest: row.couplingKHz > measuredResolutionFloorKHz,
  };
});

const maximumAllowedPairSplittingKHz = az027Ratio * remotePolaritonGapKHz;
const maximumAllowedCouplingKHz = maximumAllowedPairSplittingKHz / 2;

const result = {
  protocol: "admissibility-yig-three-four-mode-fork/1",
  date: "2026-10-25",
  source: {
    url: "https://www.nature.com/articles/s41467-025-60799-x",
    title: "Cavity-magnon polaritons strongly coupled to phonons",
    reported: {
      cavityFrequencyGHz: 7.213,
      cavityIntrinsicDecayMHz: 1.98,
      magnonCavityCouplingMHz: gMaMHz,
      magnonDecayMHz: 0.49,
      mechanicalFrequencyMHz: 10.9565,
      mechanicalBareDampingKHz,
      polaritonMechanicalCases: cases.map(({ drivePowerDbm, couplingKHz, polaritonDecayKHz, mechanicalEffectiveDampingKHz }) => ({ drivePowerDbm, couplingKHz, polaritonDecayKHz, mechanicalEffectiveDampingKHz })),
    },
  },
  threeModeChain: {
    rotatingFrameMatrix: "[[Delta_a,g_ma,0],[g_ma,Delta_m,G],[0,G,Delta_b]]",
    exactStructuralResult: "With g_ma and G nonzero this is an irreducible real symmetric tridiagonal (Jacobi) matrix and therefore has simple eigenvalues; it has no exact degenerate doublet.",
    resonantSpectrum: "{0,+sqrt(g_ma^2+G^2),-sqrt(g_ma^2+G^2)}",
    darkDimensionAtTripleResonance: 1,
    implication: "Three strongly coupled species are not the same thing as one bright line plus a protected two-dimensional dark subspace.",
  },
  measuredNearDoubletAudit: {
    interpretation: "Treat the driven upper-polariton/phonon normal-mode pair as a candidate near-doublet and the opposite polariton as the remote line.",
    remotePolaritonGapKHz,
    cases,
    maximumAllowedPairSplittingKHz,
    maximumAllowedCouplingKHz,
    result: "Every reported coupling case exceeds the AZ-027 relative-splitting budget; reducing G below the bound does not create a protected two-dimensional eigenspace or the required coupling-vector loop.",
  },
  fourModeTripod: {
    matrix: "H=[[0,k1,k2,k3],[k1*,0,0,0],[k2*,0,0,0],[k3*,0,0,0]] after a common rotating-frame diagonal is removed",
    spectrum: "{+||k||,-||k||,0,0}",
    protectedDarkDimension: 2,
    minimumHardwareChange: "Add one independently addressable auxiliary mode coupled to the same central mode, so the central mode has three outer partners rather than two.",
    candidateAuxiliaries: ["second cavity mode", "second mechanical sideband with independent complex pump", "second magnon mode"],
    requiredControls: [
      "three independently calibrated complex couplings k1,k2,k3",
      "common outer-mode rotating-frame frequency to within the residual-splitting budget",
      "loop reversal by phase/control reversal rather than port relabeling alone",
      "two-port coherent process tomography against an external reference",
      "selector Y switched or staged separately from the neutral tripod loop",
    ],
    notSuppliedByCurrentExperiment: ["third outer mode", "three-component closed coupling-vector loop", "two-dimensional dark-projector tomography", "independent selector Y"],
  },
  verdict: {
    ot012ThreeModeBranch: "closed_for_protected_doublet_holonomy_in_the_reported_chain",
    ot012FourModeBranch: "structurally_admitted_but_hardware_and_calibration_open",
    physicalFirewall: "The result selects an architecture; it is not evidence for a natural selector, Spin(2,3), or new physics.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, cases, maximumAllowedPairSplittingKHz, maximumAllowedCouplingKHz, verdict: result.verdict }, null, 2));
