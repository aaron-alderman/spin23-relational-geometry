import fs from "node:fs";
import crypto from "node:crypto";

const read = (path) => JSON.parse(fs.readFileSync(path, "utf8"));
const graphPath = "corpus/programmes/quotient-scars/quotient_scar_register_v1.json";
const taxonomyPath = "corpus/registers/three_carrier_admissibility_taxonomy_v1.json";
const outputPath = "corpus/programmes/frontier/wave-7/science_admissibility_instrumentation_v1.json";
const graph = read(graphPath);
const taxonomy = read(taxonomyPath).carriers.scienceProgramme;

const experiment = {
  "QS-001": {platform:"exact D4 lattice and singularity-monodromy computation", protocol:"enumerate the root/discriminant action and compare quotient scars under the declared triality generator", detector:"integer matrix, orbit and discriminant-class certificate", nuisance:"basis relabelling and confusing a shared order-three action with a shared carrier", decision:"accept only invariants unchanged by admissible basis changes and reject any carrier identification not supplied by an intertwiner"},
  "QS-002": {platform:"programmable three-state Markov network", protocol:"prepare resolved hidden states, repeat after detector lumping and fit both transition and memory kernels", detector:"time-tagged state record plus resolved-versus-lumped likelihood", nuisance:"finite-sample bias, nonstationarity and detector dead time", decision:"accept retained memory only when the lumped process fails a calibrated Markov test while the resolved model passes"},
  "QS-003": {platform:"computer-algebra representation audit", protocol:"construct the declared triality, Peirce and source-response modules and solve the equivariant Hom and commutant equations", detector:"exact rank, kernel and intertwiner certificate", nuisance:"complexification, forgotten real form and accidental basis-dependent isomorphism", decision:"accept a bridge only when a nonzero map has the required gauge, reflection and carrier covariance"},
  "QS-004": {platform:"finite-dimensional process-tomography emulator", protocol:"implement the finite selector twirl and compare its fixed algebra with Haar-G2 and Clifford conditional expectations", detector:"tomographed channel, fixed-space dimension and inclusion index", nuisance:"state-preparation-and-measurement error and incomplete group averaging", decision:"accept the claimed selector only when the measured fixed algebra and index agree within preregistered uncertainty"},
  "QS-005": {platform:"Z3 topological-memory or qutrit gauge simulator", protocol:"encode family-projector histories, descend to the BF sector and test which order-three records survive", detector:"Wilson/clock observables and preparation-history comparison", nuisance:"ordinary qutrit phase memory, leakage and finite-size splitting", decision:"accept only the topological remnant that is invariant under local deformations; do not infer erased projector orientation"},
  "QS-006": {platform:"label-randomized detector-folding experiment", protocol:"inject known latent CP-odd contrasts and sweep the symmetric mislabelling probability through one half", detector:"calibrated confusion matrix and observed odd score", nuisance:"asymmetric label errors, drift and correlated readout noise", decision:"accept the folding law only if the odd score follows one-minus-two-epsilon and vanishes at half mixing"},
  "QS-007": {platform:"source-response symbolic and analogue network", protocol:"prepare paired source and dual-response coordinates, impose the Freudenthal restriction and test reflection covariance", detector:"bilinear response matrix, dual pairing and reflection residual", nuisance:"arbitrary normalization, source-frame shear and importing exceptional multiplication", decision:"accept only a source-native pairing with a declared frame and a verified reflection intertwiner"},
  "QS-008": {platform:"programmable photonic or acoustic projection network", protocol:"alternate two calibrated noncommuting projections while varying their principal angle and order", detector:"full complex amplitude tomography after each projection", nuisance:"loss imbalance, phase drift and imperfect idempotence", decision:"accept the model when convergence follows cos-squared theta and order reversal matches the commutator prediction"},
  "QS-009": {platform:"adiabatic three-mode coherent interferometer", protocol:"drive the registered projector loop in both orientations and tomograph the returning doublet frame", detector:"phase-referenced two-mode interferometry plus projector tomography", nuisance:"dynamical phase, nonadiabatic leakage and path miscalibration", decision:"accept quarter-turn holonomy only when the projector returns, the gap remains open and loop reversal inverts the frame turn"},
  "QS-010": {platform:"two-rail feedback controller with persistent memory", protocol:"prepare identical present projectors with distinct stored histories and measure convergence before and after anchoring", detector:"time-resolved rail coordinates and fitted tangent eigenvalues", nuisance:"controller latency, detector memory and common-mode drift", decision:"accept an independent rail only when history predicts later response conditional on the present projector"},
  "QS-011": {platform:"bistable magnetic, photonic, acoustic or electronic wall device", protocol:"write opposite histories, image the wall, measure its width and tension, and probe the restricted gap across it", detector:"spatial field imaging plus local spectroscopy", nuisance:"pinning disorder, thermal creep, finite boundaries and a hidden second mass", decision:"accept the restricted topology gate only when the wall and forced gap closing survive the declared deformation set"},
  "QS-012": {platform:"wall-localized two-channel response device", protocol:"reconstruct the localized response projector, sweep the control-projector angle and fit the free-energy or susceptibility shift", detector:"localized-mode spectroscopy and two-channel response tomography", nuisance:"bulk background, angle calibration, detector folding and unconstrained wall coupling", decision:"accept closure only with positive Hessian, embedding dependence and a return multiplier inside the unit circle"},
  "QS-013": {platform:"phase-sensitive two-projector interferometer", protocol:"prepare matched plus/minus relative angles at fixed overlap and compare static and coherent odd channels", detector:"projector overlap tomography plus an orientation-sensitive quadrature", nuisance:"reference-phase drift, reflection asymmetry and population imbalance", decision:"accept the oriented lift only when the odd channel reverses while the overlap and even response remain fixed"},
  "QS-014": {platform:"three-record even/odd/population experiment", protocol:"combine angle reversal, wall reversal, rate sweeps and deliberate branch-label randomization", detector:"joint spin-summed, helicity-resolved and branch-population records", nuisance:"label error, lag, hysteresis, heating and detector crosstalk", decision:"accept orientation evidence only if it passes physical reversals and contracts to zero under half label randomization"},
  "QS-015": {platform:"helicity-resolved wall-selector device", protocol:"reverse wall orientation at fixed projector overlap and measure the signed lift together with the even equilibrium potential", detector:"spin-summed free energy and helicity-resolved response", nuisance:"magnetic stray fields, contact asymmetry, uncontrolled chirality and fitted counterterms", decision:"accept the effective coupling when wall reversal flips the odd lift but preserves the overlap; do not infer universality"},
  "QS-016": {platform:"same-device coefficient-provenance audit", protocol:"fit the effective wall coefficient, reconstruct all symmetry-allowed material interactions and propagate them without refitting", detector:"joint response data, microscopic parameter metrology and held-out prediction", nuisance:"operator mixing, renormalized counterterms, material inhomogeneity and model nonidentifiability", decision:"promote provenance only when a gauge-complete source fixes nonzero magnitude and sign and predicts held-out data"}
};

const node = new Map(graph.entries.map((entry) => [entry.id, entry]));
const edge = new Map(graph.relations.map((relation) => [relation.id, relation]));
const treeIds = new Set(taxonomy.qrOrderedFundamentalBasis.treeEdgeIds);

function treePath(from, to) {
  const adjacency = new Map(graph.entries.map((entry) => [entry.id, []]));
  for (const relation of graph.relations.filter((item) => treeIds.has(item.id))) {
    adjacency.get(relation.from).push({node:relation.to, edge:relation.id});
    adjacency.get(relation.to).push({node:relation.from, edge:relation.id});
  }
  const queue = [from];
  const previous = new Map([[from, null]]);
  while (queue.length && !previous.has(to)) {
    const current = queue.shift();
    for (const next of adjacency.get(current)) if (!previous.has(next.node)) {
      previous.set(next.node, {node:current, edge:next.edge}); queue.push(next.node);
    }
  }
  const ids = [];
  for (let current = to; current !== from;) {
    const step = previous.get(current); if (!step) throw new Error(`no tree path ${from}->${to}`);
    ids.push(step.edge); current = step.node;
  }
  return ids.reverse();
}

function record(label, relation, name, family, cycleEdgeIds = []) {
  const source = node.get(relation.from);
  const target = node.get(relation.to);
  const design = experiment[target.id];
  return {
    id: label,
    family,
    relationId: relation.id,
    name,
    carrier: "science-programme quotient-scar graph with an explicitly named target platform",
    source: {id:source.id, label:source.label},
    target: {id:target.id, label:target.label},
    relationType: relation.type,
    cycleEdgeIds,
    input: source.parent,
    output: relation.statement,
    invariant: target.scars[0]?.datum ?? "declared typed relation",
    informationLoss: target.killed,
    platform: design.platform,
    protocol: design.protocol,
    observable: target.scars.map((scar) => `${scar.type}: ${scar.datum}`),
    detector: design.detector,
    detectorSufficiency: target.detectorSufficiency,
    nuisanceModel: design.nuisance,
    decisionRule: design.decision,
    falsifier: target.falsifier,
    status: target.status,
    reopenDatum: family === "guardrail"
      ? `supply and verify the missing distinction in ${relation.statement}`
      : family === "return"
        ? "co-realize every cycle leg on one calibrated carrier and retain the stated invariant after detector folding"
        : "derive the relation on a source-native carrier and reproduce the target observable without refitting",
    sourceRefs: [...new Set([...source.sourceRefs, ...target.sourceRefs])]
  };
}

const items = [];
for (const [label, relationId, name] of taxonomy.constructiveTwelve) items.push(record(label, edge.get(relationId), name, "constructive"));
for (const [label, relationId, name] of taxonomy.guardrailFifteen) items.push(record(label, edge.get(relationId), name, "guardrail"));
for (const [label, chordId, name] of taxonomy.qrOrderedFundamentalBasis.returnLabels) {
  const chord = edge.get(chordId);
  items.push(record(label, chord, name, "return", [chordId, ...treePath(chord.from, chord.to)]));
}

const result = {
  schema: "science-admissibility-instrumentation/1",
  date: "2026-10-24",
  source: graphPath,
  sourceSha256: crypto.createHash("sha256").update(fs.readFileSync(graphPath)).digest("hex"),
  authority: "experiment atlas and decision ledger; not evidence that a proposed platform realizes a fundamental carrier",
  fieldContract: ["carrier","input","output","invariant","informationLoss","platform","protocol","observable","detector","detectorSufficiency","nuisanceModel","decisionRule","falsifier","status","reopenDatum","sourceRefs"],
  counts: {constructive:12, guardrail:15, return:12, total:39},
  experimentCatalogue: {declaredNodeClasses:Object.keys(experiment).length, usedTargetPlatforms:new Set(items.map((item) => item.platform)).size, sourceOnlyNodes:["QS-004","QS-008"]},
  items
};

if (process.argv.includes("--write")) fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + "\n");
else console.log(JSON.stringify(result, null, 2));
