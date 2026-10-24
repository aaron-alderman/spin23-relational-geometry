import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const sourceRoot = resolve(root, "evidence/sources/zenodo-15422339");
const ids = Array.from({ length: 54 }, (_, index) => `ID${String(index + 1).padStart(2, "0")}`);

async function rowsFor(id) {
  const text = await readFile(resolve(sourceRoot, `${id}.csv`), "utf8");
  return text.trim().split(/\r?\n/u).slice(1).map((line, index) => {
    const [frequencyHz, re, im] = line.split(",").map(Number);
    return { index, frequencyHz, re, im };
  }).filter(row => row.index % 3 === 1);
}

const records = new Map(await Promise.all(ids.map(async id => [id, await rowsFor(id)])));
const cells = [];
for (const targetId of ids) {
  const target = records.get(targetId);
  const donors = ids.filter(id => id !== targetId).map(id => records.get(id));
  const points = target.map((row, pointIndex) => {
    const donorRows = donors.map(rows => rows[pointIndex]);
    if (!donorRows.every(item => item.frequencyHz === row.frequencyHz)) throw new Error(`frequency grid mismatch at ${targetId} row ${pointIndex}`);
    const reValues = donorRows.map(item => item.re);
    const imValues = donorRows.map(item => item.im);
    const envelope = { reMin: Math.min(...reValues), reMax: Math.max(...reValues), imMin: Math.min(...imValues), imMax: Math.max(...imValues) };
    const reInside = row.re >= envelope.reMin && row.re <= envelope.reMax;
    const imInside = row.im >= envelope.imMin && row.im <= envelope.imMax;
    return { frequencyHz: row.frequencyHz, measured: { re: row.re, im: row.im }, envelope, reInside, imInside, complexRectangleInside: reInside && imInside };
  });
  cells.push({
    id: targetId,
    heldOutPoints: points.length,
    realCoverage: points.filter(point => point.reInside).length / points.length,
    imaginaryCoverage: points.filter(point => point.imInside).length / points.length,
    complexRectangleCoverage: points.filter(point => point.complexRectangleInside).length / points.length,
    allHeldOutComplexPointsInside: points.every(point => point.complexRectangleInside),
    outsidePoints: points.filter(point => !point.complexRectangleInside),
  });
}

const completeCells = cells.filter(cell => cell.allHeldOutComplexPointsInside);
const scalarChecks = cells.length * 15 * 2;
const scalarInside = cells.reduce((sum, cell) => sum + 15 * (cell.realCoverage + cell.imaginaryCoverage), 0);
const complexChecks = cells.length * 15;
const complexInside = cells.reduce((sum, cell) => sum + 15 * cell.complexRectangleCoverage, 0);
const output = {
  protocol: "zenodo-eis-distribution-free-population-envelope/1",
  date: "2026-10-25",
  source: { doi: "10.5281/zenodo.15422339", cells: ids.length, heldOutPointsPerCell: 15 },
  preregistration: {
    targetCellUsedToConstructEnvelope: false,
    donorsPerTarget: 53,
    splitRule: "source row index modulo 3 equals 1 is evaluated",
    envelope: "componentwise minimum and maximum measured complex impedance among the other 53 cells at the identical frequency",
    tuningParameters: 0,
    exchangeabilityStatement: "For one scalar observation exchangeable with 53 donors, the donor min-max interval has finite-sample marginal rank coverage 52/54 = 96.296%; this does not imply simultaneous 30-coordinate coverage or causal exchangeability.",
  },
  population: {
    cellsWithAll15ComplexPointsInside: completeCells.length,
    cellsWithAnyComplexPointOutside: cells.length - completeCells.length,
    completeCellFraction: completeCells.length / cells.length,
    scalarCoordinateCoverage: scalarInside / scalarChecks,
    complexRectanglePointCoverage: complexInside / complexChecks,
    cellsOutside: cells.filter(cell => !cell.allHeldOutComplexPointsInside).map(cell => cell.id),
  },
  cells,
  decision: {
    allCellsInsideDonorPopulationEnvelope: completeCells.length === cells.length,
    distributionFreeMarginalPopulationEnvelopeEvaluated: true,
    simultaneousCellLevelCoverageProved: false,
    physicalCovariatesExplainHeterogeneity: false,
    measurementCovarianceEstablished: false,
    detectorLikelihoodClosed: false,
    generatedDynamicsEstablished: false,
    newPhysicsEvidence: false,
  },
};
output.implication = output.decision.allCellsInsideDonorPopulationEnvelope
  ? "Every evaluated complex point lies inside the componentwise range measured on the other 53 cells. The failed median law is therefore contained by observed population heterogeneity, without explaining that heterogeneity or supplying simultaneous coverage, covariance, dynamics or new physics."
  : "At least one target record escapes the componentwise range measured on the other 53 cells. The escaped coordinates localize a population-boundary datum that requires replication and nuisance covariance before physical interpretation.";

if (write) await writeFile(resolve(root, "evidence/data/zenodo-eis-distribution-free-population-envelope-v1.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify(output, null, 2));
