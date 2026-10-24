import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/alp-current-only-rg-stability-gate-v1.json");

const evolve = ({ U, cttUV, a2UV, cWW }) => {
  const r = Math.exp(-18 * U);
  const ctt = r * cttUV;
  const tildeUV = cWW - a2UV / 2;
  const tildeWW = tildeUV - (1 - r) * cttUV / 6;
  const a2 = a2UV + (1 - r) * cttUV / 3;
  return {
    U,
    r,
    ctt,
    a2,
    tildeWW,
    reconstructedDirectCoefficient: tildeWW + a2 / 2,
    identityResidual: tildeWW - (cWW - a2 / 2),
  };
};

const UGrid = [0, 0.005, 0.01, 0.02];
const currentOnly = UGrid.map(U => evolve({ U, cttUV: -10, a2UV: 16, cWW: 0 }));
const directWeak = UGrid.map(U => evolve({ U, cttUV: -10, a2UV: 16, cWW: 2.5 }));
const blindShifted = UGrid.map(U => evolve({ U, cttUV: -10, a2UV: 30, cWW: 7 }));

const maxAbs = xs => Math.max(...xs.map(Math.abs));
const result = {
  protocol: "alp-current-only-rg-stability-gate/1",
  date: "2026-10-25",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-076",
  sourceApproximation: {
    reference: "Bauer et al., arXiv:2012.12272v2, Eqs. (17), (26)-(28), (55)-(58)",
    domain: "above the electroweak threshold; top-Yukawa approximation used for the displayed analytic solution; higher-order gauge terms in ctt omitted in the witness",
    equations: [
      "d c_WW / d ln(mu)=0 through the stated order",
      "r=exp[-18 U(mu,Lambda)]",
      "c_tt(mu)=r c_tt(Lambda) in the Yukawa-only part",
      "ctilde_WW(mu)=ctilde_WW(Lambda)-(1-r)c_tt(Lambda)/6",
      "a_2(mu)=a_2(Lambda)+(1-r)c_tt(Lambda)/3",
      "ctilde_WW(mu)=c_WW-a_2(mu)/2",
    ],
  },
  witnesses: {
    UGrid,
    currentOnly,
    directWeak,
    blindShifted,
    currentOnlyMaximumIdentityResidual: maxAbs(currentOnly.map(x => x.identityResidual)),
    directWeakMaximumIdentityResidual: maxAbs(directWeak.map(x => x.identityResidual)),
    currentOnlyDirectCoefficientMaximum: maxAbs(currentOnly.map(x => x.reconstructedDirectCoefficient)),
    directWeakCoefficientDriftMaximum: maxAbs(directWeak.map(x => x.reconstructedDirectCoefficient - 2.5)),
    scaleSweepBlindDegeneracyMaximum: maxAbs(currentOnly.map((x, i) => x.tildeWW - blindShifted[i].tildeWW)),
  },
  thresholdBoundary: {
    unprimedBosonicMatching: "For a light ALP far below the weak scale, Delta c_GG=Delta c_gammagamma=0 at the stated dimension-five order.",
    tildeMatching: "In the pseudoscalar basis, top-threshold terms remove the top contribution from ctilde_GG and ctilde_gammagamma.",
    consequence: "Below the weak scale there is no W coordinate in the EFT. A low-energy B_c or photon record is a matched validation arm, not the same weak node transported unchanged.",
  },
  verdict: {
    closed: "The current-only condition c_WW=0 is stable under the published running through the stated order, even though ctilde_WW and a_2 run. The identity ctilde_WW=c_WW-a_2/2 is preserved exactly.",
    noGo: "An energy sweep of ctilde_WW within this approximation cannot separate a_2 from c_WW: the blind shift (delta a_2,delta c_WW)=(2 lambda,lambda) survives at every scale.",
    open: "Full three-generation matrix running, gauge contributions, weak-scale fermion matching, covariance, and a source-native amplitude remain open.",
    nextCalculation: "Build the full coefficient-and-covariance transport at a declared UV scale and collider scale. Do not use scale variation alone as the sixth-coordinate detector; add an independently sensitive electroweak or UV record.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, witnesses: result.witnesses, verdict: result.verdict }, null, 2));
