import fs from "node:fs";
import { execFileSync } from "node:child_process";

const path = "evidence/data/admissibility-four-mode-quotient-scar-bench-v1.json";
const before = fs.readFileSync(path, "utf8");
execFileSync(process.execPath, ["scripts/run-four-mode-quotient-scar-bench.mjs", "--write"], { stdio: "pipe" });
const after = fs.readFileSync(path, "utf8");
if (before !== after) throw new Error("bench evidence was stale");
const record = JSON.parse(after);

const exactSingular = record.exactSymmetry.normalizedKrylovSingularValues;
const resolvedSingular = record.resolvedBreaking.normalizedKrylovSingularValues;
if (exactSingular.filter(value => value > 1e-7).length !== 2) throw new Error("exact symmetric port must have Krylov rank two");
if (resolvedSingular.filter(value => value > 1e-7).length !== 4) throw new Error("resolved breaking must have Krylov rank four");
if (Math.abs(record.orientation.orientedCubic + record.orientation.swappedCubic) > 1e-12) throw new Error("oriented cubic must reverse under port exchange");
if (Math.abs(record.orientation.orientedCubic) < 0.1) throw new Error("orientation witness is too small");

const scaling = record.memoryScaling;
for (let i = 1; i < scaling.length; i += 1) {
  const ratio = scaling[i].selfEnergyDifference / scaling[i - 1].selfEnergyDifference;
  const scaleRatioSquared = (scaling[i].scaleMHz / scaling[i - 1].scaleMHz) ** 2;
  if (Math.abs(ratio / scaleRatioSquared - 1) > 0.25) throw new Error("weak-breaking memory is not quadratic within tolerance");
}

const monteCarlo = record.toleranceMonteCarlo;
if (monteCarlo.passing !== monteCarlo.samples) throw new Error("not every frozen tolerance sample passed");
if (monteCarlo.minimumGapToLinewidth <= monteCarlo.thresholds.gapToLinewidth) throw new Error("gap/linewidth budget failed");
if (monteCarlo.minimumHubResidue <= monteCarlo.thresholds.minimumHubResidue) throw new Error("hub residue budget failed");
if (monteCarlo.minimumNormalizedKrylovSingularValue <= monteCarlo.thresholds.minimumNormalizedKrylovSingularValue) throw new Error("rank conditioning budget failed");
if (record.authority.entailsFundamentalD4OrG2Physics !== false) throw new Error("scientific firewall missing");

console.log(`Four-mode quotient-scar bench verified: rank 2->4, odd orientation, quadratic memory, ${monteCarlo.samples}/${monteCarlo.samples} tolerance samples pass.`);
