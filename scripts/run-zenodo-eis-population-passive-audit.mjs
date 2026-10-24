import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const runner = resolve(import.meta.dirname, "run-zenodo-eis-held-out-passive-fit.mjs");
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const cells = [];
for (let index = 1; index <= 54; index += 1) {
  const id = `ID${String(index).padStart(2, "0")}`;
  const source = resolve(sourceRoot, `${id}.csv`);
  const output = JSON.parse(execFileSync(process.execPath, [runner, "--source", source], { encoding: "utf8", maxBuffer: 2_000_000 }));
  cells.push({ id, sourceSha256: output.source.localNormalizedSha256, rows: output.source.rows, training: output.trainingMetrics, heldOut: output.heldOutMetrics, fittedParameters: output.fittedParameters, activeParameters: output.activeParameters, passed: output.decision.heldOutThresholdPassed });
}
const sortedMedian = [...cells].sort((a, b) => a.heldOut.medianRelativeError - b.heldOut.medianRelativeError);
const sortedMaximum = [...cells].sort((a, b) => a.heldOut.maximumRelativeError - b.heldOut.maximumRelativeError);
const passedCells = cells.filter(cell => cell.passed);
const output = {
  protocol: "zenodo-eis-population-passive-audit/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", cells: cells.length, condition: "NMC811 21700 cells at 30% state of charge", localDirectory: "evidence/sources/zenodo-15422339" },
  frozenProtocol: { splitRule: "source row index modulo 3 equals 1 is held out", model: "nonnegative series R + series L + five fixed-centre Debye arcs + semi-infinite Warburg", thresholds: { heldOutMedianRelativeErrorMaximum: 0.05, heldOutMaximumRelativeErrorMaximum: 0.20 }, perCellRefittingWithinFrozenBasis: true, crossCellParameterSharing: false },
  population: {
    passedCells: passedCells.length,
    failedCells: cells.length - passedCells.length,
    passFraction: passedCells.length / cells.length,
    medianOfCellMedianRelativeErrors: sortedMedian[Math.floor(cells.length / 2)].heldOut.medianRelativeError,
    worstCellMedianRelativeError: sortedMedian.at(-1).heldOut.medianRelativeError,
    medianOfCellMaximumRelativeErrors: sortedMaximum[Math.floor(cells.length / 2)].heldOut.maximumRelativeError,
    worstCellMaximumRelativeError: sortedMaximum.at(-1).heldOut.maximumRelativeError,
    worstMedianCell: sortedMedian.at(-1).id,
    worstMaximumCell: sortedMaximum.at(-1).id,
  },
  cells,
  decision: { allCellsPassFrozenHeldOutThresholds: passedCells.length === cells.length, populationPassiveBaselineEstablished: passedCells.length === cells.length, sharedPopulationParameterModelEstablished: false, measurementCovarianceEstablished: false, detectorLikelihoodClosed: false, newPhysicsEvidence: false },
};
output.implication = output.decision.allCellsPassFrozenHeldOutThresholds ? "The frozen passive basis and held-out rule pass all 54 measured cells. This establishes a population-wide conventional response baseline under per-cell fitting, not one shared parameter law, detector likelihood or new physics." : "At least one measured cell defeats the frozen passive basis or threshold. The failure cells define the next conventional-model and uncertainty audit; their residuals are not new-physics evidence without that work.";
if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-population-passive-audit-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
