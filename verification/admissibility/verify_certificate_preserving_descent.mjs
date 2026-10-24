import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const dataPath = path.join(root, "evidence", "data", "admissibility-certificate-preserving-descent-v1.json");
const docPath = path.join(root, "corpus", "programmes", "admissibility", "admissibility_56_certificate_preserving_descent_and_commuting_square_atlas.md");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const doc = fs.readFileSync(docPath, "utf8");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const close = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;

check(data.schema === "admissibility.certificate-preserving-descent/1", "schema mismatch");
check(data.id === "AZ-056", "packet id mismatch");
check(data.linearWitnesses.rightInverseResidual === 0, "PJ must equal identity");
check(data.linearWitnesses.exact.defectFrobeniusNorm === 0, "exact descent defect must vanish");
check(close(data.linearWitnesses.approximate.defectFrobeniusNorm, 0.02), "approximate leakage must be 0.02");
check(data.linearWitnesses.approximate.rightInverseIdentityResidual === 0, "section defect identity must close");
check(data.linearWitnesses.impossible.collision.sameInitialShadow, "impossible pair must begin in one fibre");
check(data.linearWitnesses.impossible.collision.nextShadowX[0] === 0, "first next shadow mismatch");
check(close(data.linearWitnesses.impossible.collision.nextShadowXPlusKernel[0], 0.4), "kernel representative must alter next shadow by 0.4");
check(data.compositionWitness.identityResidual === 0, "three-scale defect composition must close");
check(data.compositionWitness.directDefectNorm <= data.compositionWitness.triangleBound + 1e-12, "composition norm bound failed");
check(data.memoryClosureWitness.maximumResidual < 1e-12, "hidden-state memory reconstruction must close");
check(close(data.memoryClosureWitness.memoryKernelScalars[0], 0.06), "first memory-kernel coefficient mismatch");
check(close(data.memoryClosureWitness.memoryKernelScalars[1], 0.03), "second memory-kernel coefficient mismatch");
check(data.commutatorNoGo.targetCommutatorRank === 2, "target commutator must have rank two");
check(close(data.commutatorNoGo.targetCommutatorFrobeniusNorm, 2 * Math.sqrt(2)), "target commutator norm mismatch");
check(close(data.nonlinearDetectorWitness.sharedLinearZExpectation, data.nonlinearDetectorWitness.secondLinearZExpectation), "linear Z records must collide");
check(close(data.nonlinearDetectorWitness.mixedPurity, 0.5), "mixed-state purity mismatch");
check(close(data.nonlinearDetectorWitness.coherentPurity, 0.68), "coherent-state purity mismatch");
check(data.corpusCrossChecks.az052.sameBoundCount, "AZ-052 bound-count collision missing");
check(Math.abs(data.corpusCrossChecks.az052.phaseWindingDifference) > 1, "AZ-052 phase distinction too small");
check(Math.abs(data.corpusCrossChecks.az052.casimirProxyDifference) > 0.01, "AZ-052 boundary distinction too small");
check(JSON.stringify([
  data.corpusCrossChecks.az053.inventoryClasses,
  data.corpusCrossChecks.az053.symmetricSeebeckClasses,
  data.corpusCrossChecks.az053.orientationSensitiveBoundaryClasses,
  data.corpusCrossChecks.az054.allDetectorClasses
]) === JSON.stringify([1, 19, 35, 21]), "detector resolution ladder mismatch");
check(data.corpusCrossChecks.az054.allDetectorClasses === data.corpusCrossChecks.az054.apparatusReflectionOrbitCount, "apparatus quotient must be saturated");
check(data.externalCases.length === 5, "five external cases required");
check(data.corpusIntertwinerInventory.length === 5, "five corpus intertwiner cases required");
check(data.corpusIntertwinerInventory.every((x) => x.sourceExists), "every inventoried corpus source must exist");
check(data.corpusIntertwinerInventory.filter((x) => x.classification === "NO_GO").length === 2, "two exact no-go cases required");
check(data.corpusIntertwinerInventory.some((x) => x.classification === "EXACT_BUT_NONUNIQUE"), "nonunique exact descent case required");
check(data.corpusIntertwinerInventory.some((x) => x.classification === "EXACT_OBSERVABLE_DESCENT"), "observable descent case required");
check(data.corpusLexicalCensus.scannedMarkdownFiles > 1000, "corpus-wide Markdown census is unexpectedly small");
check(data.corpusLexicalCensus.filesMatchingAtLeastOneTerm > 500, "descent lexical census is unexpectedly small");
check(Object.values(data.corpusLexicalCensus.termFileCounts).every((n) => n > 0), "every census term must occur");
check(data.corpusLexicalCensus.maintainedSemanticOwners.length === 4, "semantic owner list mismatch");
check(data.corpusLexicalCensus.maintainedSemanticOwners.every((ref) => fs.existsSync(path.join(root, ref))), "semantic owner reference missing");
check(data.externalCases.at(-1).status === "UNRESOLVED_SIGNPOST", "modular-forms post must remain unresolved");
check(data.admission.commonPhysicalMechanismEstablishedAcrossExternalCases === false, "common physical mechanism must not be claimed");
check(data.admission.spin23PhysicalDescentEstablished === false, "Spin(2,3) descent must remain open");
check(JSON.stringify(data.irreducibleGates.map((x) => x.topicId)) === JSON.stringify(["OT-019", "OT-027", "OT-034", "OT-038", "OT-045"]), "irreducible gate list mismatch");

for (const phrase of [
  "admissibility is a property of arrows as well as objects",
  "A point in the atlas is meaningful only with both coordinates",
  "The packet does not establish Spin(2,3) symmetry",
  "proves neither that K215 halts nor that ZFC is inconsistent",
  "finite-size evidence is not a thermodynamic-limit proof",
  "Do not infer a universal mechanism"
]) check(doc.includes(phrase), `document missing firewall: ${phrase}`);

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  id: data.id,
  exactDefect: data.linearWitnesses.exact.defectFrobeniusNorm,
  approximateDefect: data.linearWitnesses.approximate.defectFrobeniusNorm,
  compositionResidual: data.compositionWitness.identityResidual,
  memoryResidual: data.memoryClosureWitness.maximumResidual,
  commutatorRank: data.commutatorNoGo.targetCommutatorRank,
  detectorClassLadder: [1, 19, 35, 21],
  externalCases: data.externalCases.length,
  gates: data.irreducibleGates.map((x) => x.topicId)
}, null, 2));
