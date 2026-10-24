import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const record = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/girih_figure4_pretranscription_v0.json"), "utf8"));

assert.equal(record.schema, "dynatology-girih-figure4-pretranscription/0");
assert.equal(record.status, "source_figure_audited_orbit_compression_conditional_edge_alphabet_unfilled");
assert.equal(record.sources.length, 2);
for (const source of record.sources) {
  assert.match(source.sha256, /^[A-F0-9]{64}$/);
  assert.ok(source.bytes > 1_000_000);
}

const panels = Object.fromEntries(record.canonicalPanels.map((x) => [x.tile, x]));
assert.equal(panels.hexagon.coarseSideSlots, 6);
assert.equal(panels.bowtie.coarseSideSlots, 6);
assert.equal(panels.decagon.coarseSideSlots, 10);
assert.equal(panels.hexagon.choiceOrbitSize, 2);
assert.equal(panels.bowtie.choiceOrbitSize, 2);
assert.equal(panels.decagon.choiceOrbitSize, 10);
assert.ok(record.canonicalPanels.every((x) => x.coarseSideTuple === null && x.microEdgeCounts === null));

const independent = record.canonicalPanels.reduce((sum, x) => sum + x.coarseSideSlots * x.choiceOrbitSize, 0);
const canonical = record.canonicalPanels.reduce((sum, x) => sum + x.coarseSideSlots, 0);
assert.equal(independent, 124);
assert.equal(canonical, 22);
assert.equal(record.orbitCompression.independentChoiceCoarseSideRecords, independent);
assert.equal(record.orbitCompression.canonicalCoarseSideRecords, canonical);
assert.equal(record.orbitCompression.savedCoarseSideRecords, independent - canonical);
assert.ok(Math.abs(record.orbitCompression.savedFraction - (independent - canonical) / independent) < 1e-15);
assert.match(record.orbitCompression.condition, /must_equal/);
assert.equal(record.orbitCompression.microSymbolCompressionClaimed, false);

assert.deepEqual(record.visibleBoundaryData.penroseRibbonColours, ["red", "blue"]);
assert.equal(record.visibleBoundaryData.colourAloneDeclaredCompleteAlphabet, false);
assert.equal(record.visibleBoundaryData.coarseSideIsAtomicSymbol, false);
assert.equal(record.visibleBoundaryData.coarseSideCarriesOrderedMicroWord, true);
assert.equal(record.vectorAudit.imageXObjectCount, 0);
assert.equal(record.vectorAudit.nativeVectorArtwork, true);
assert.equal(record.vectorAudit.blueFilledPathComponents, 416);
assert.equal(record.vectorAudit.redFilledPathComponents, 407);
assert.equal(record.vectorAudit.totalRibbonColouredFilledPathComponents, 823);
assert.equal(record.vectorAudit.blueFilledPathComponents + record.vectorAudit.redFilledPathComponents, record.vectorAudit.totalRibbonColouredFilledPathComponents);
assert.match(record.vectorAudit.componentSemanticBoundary, /not_yet_identified/);
assert.equal(record.repairWitness.changesLocalPlacement, true);
assert.equal(record.repairWitness.isOnlyAChoiceChangeOnFixedAdjacency, false);
assert.deepEqual(record.repairWitness.globalTileCountChange, {decagon: 0, hexagon: 0, bowtie: 0});
assert.equal(record.nestedOptimization.physicalEnergyClaimed, false);

console.log("Dynatology girih Figure 4 pretranscription: PASS");
console.log(JSON.stringify({canonicalPanels: record.canonicalPanels.length, independentCoarseSideRecords: independent, canonicalCoarseSideRecords: canonical, savedCoarseSideRecords: independent - canonical, vectorRibbonComponents: record.vectorAudit.totalRibbonColouredFilledPathComponents, rasterTracingRequired: false, microSymbolCompressionClaimed: false, countPreservingRepair: true, edgeAlphabetFilled: false}));

