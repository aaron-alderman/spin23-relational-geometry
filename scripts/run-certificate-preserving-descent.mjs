import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const outPath = path.join(root, "evidence", "data", "admissibility-certificate-preserving-descent-v1.json");

const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const frob = (A) => Math.sqrt(A.flat().reduce((s, x) => s + x * x, 0));
const comm = (A, B) => sub(mul(A, B), mul(B, A));
const vector = (x) => x.map((v) => [v]);
const unvector = (x) => x.map((r) => r[0]);
const apply = (A, x) => unvector(mul(A, vector(x)));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));

function rank(A, tol = 1e-12) {
  const M = A.map((r) => [...r]);
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c++) {
    let p = r;
    for (let i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
    if (Math.abs(M[p][c]) <= tol) continue;
    [M[p], M[r]] = [M[r], M[p]];
    const q = M[r][c];
    for (let j = c; j < M[0].length; j++) M[r][j] /= q;
    for (let i = 0; i < M.length; i++) if (i !== r) {
      const q2 = M[i][c];
      for (let j = c; j < M[0].length; j++) M[i][j] -= q2 * M[r][j];
    }
    r++;
  }
  return r;
}

const P = [[1, 0, 0], [0, 1, 0]];
const J = [[1, 0], [0, 1], [0, 0]];
const IminusJP = sub(eye(3), mul(J, P));
const Fexact = [[0, -1, 0], [1, 0, 0], [0, 0, 0.5]];
const Fapprox = [[0, -1, 0.02], [1, 0, 0], [0, 0, 0.5]];
const Fimpossible = [[0, -1, 0.4], [1, 0, 0], [0, 0, 0.5]];

function descent(F) {
  const f = mul(mul(P, F), J);
  const defect = sub(mul(P, F), mul(f, P));
  const rightInverseForm = mul(mul(P, F), IminusJP);
  return {
    sourceDynamics: F,
    shadowDynamics: f,
    defect,
    defectFrobeniusNorm: frob(defect),
    rightInverseIdentityResidual: maxAbs(sub(defect, rightInverseForm)),
    kernelLeakageColumn: apply(F, [0, 0, 1]).slice(0, 2)
  };
}

const exact = descent(Fexact);
const approximate = descent(Fapprox);
const impossible = descent(Fimpossible);
const x = [0, 0, 0];
const xPlusKernel = [0, 0, 1];

const R = [[0, -1], [1, 0]];
const H = [[1, 0], [0, -1]];
const targetCommutator = comm(R, H);

// Exact hidden-state elimination.  With F=[[A,B],[C,D]], the visible recurrence is
// y_(n+1)=A y_n + B D^n h_0 + sum_(j=0)^(n-1) B D^(n-1-j) C y_j.
const Ablock = [[0, -1], [1, 0]];
const Bblock = [[0.2], [0]];
const Cblock = [[0.3, 0]];
const Dblock = 0.5;
const Fmemory = [[0, -1, 0.2], [1, 0, 0], [0.3, 0, 0.5]];
const memoryInitial = [0.4, -0.2, 0.7];
const fullTrajectory = [memoryInitial];
for (let n = 0; n < 8; n++) fullTrajectory.push(apply(Fmemory, fullTrajectory.at(-1)));
const reconstructedVisible = [memoryInitial.slice(0, 2)];
for (let n = 0; n < 8; n++) {
  const y = reconstructedVisible[n];
  const next = apply(Ablock, y);
  const initialSlip = apply(Bblock, [Dblock ** n * memoryInitial[2]]);
  let memory = [0, 0];
  for (let j = 0; j < n; j++) {
    const cy = apply(Cblock, reconstructedVisible[j])[0];
    const term = apply(Bblock, [(Dblock ** (n - 1 - j)) * cy]);
    memory = memory.map((v, i) => v + term[i]);
  }
  reconstructedVisible.push(next.map((v, i) => v + initialSlip[i] + memory[i]));
}
const memoryResidual = Math.max(...reconstructedVisible.flatMap((y, n) => y.map((v, i) => Math.abs(v - fullTrajectory[n][i]))));

// A three-scale chain X --P1--> Y --P2--> Z.  For chosen shadow maps
// f1 and f2, Delta21 = P2 Delta1 + Delta2 P1 exactly.
const P1 = P;
const P2 = [[1, 0]];
const f1 = approximate.shadowDynamics;
const f2 = [[0]];
const delta1 = approximate.defect;
const delta2 = sub(mul(P2, f1), mul(f2, P2));
const directDefect = sub(mul(mul(P2, P1), Fapprox), mul(mul(f2, P2), P1));
const composedDefect = add(mul(P2, delta1), mul(delta2, P1));

function add(A, B) { return A.map((row, i) => row.map((v, j) => v + B[i][j])); }

const az52 = JSON.parse(fs.readFileSync(path.join(root, "evidence", "data", "admissibility-spectral-flow-pole-trajectory-v1.json"), "utf8"));
const az53 = JSON.parse(fs.readFileSync(path.join(root, "evidence", "data", "admissibility-boundary-compiler-v1.json"), "utf8"));
const az54 = JSON.parse(fs.readFileSync(path.join(root, "evidence", "data", "admissibility-transverse-boundary-joint-detector-v1.json"), "utf8"));
const zero = az52.comparisons.zeroControl;

const rhoMixed = [[0.5, 0], [0, 0.5]];
const rhoCoherent = [[0.5, 0.3], [0.3, 0.5]];
const purity = (rho) => mul(rho, rho).reduce((s, row, i) => s + row[i], 0);
const zExpectation = (rho) => rho[0][0] - rho[1][1];

const externalCases = [
  {
    id: "gravity-compton-4pm",
    source: "worldline-QFT classical gravitational Compton amplitude at O(G^4)",
    map: "N-matrix extraction",
    target: "gravitational-wave scattering phase shift",
    certificate: "agreement with black-hole perturbation theory at the stated order",
    kernelOrLoss: "finite perturbative order; nonspinning compact object; not an all-orders equivalence",
    detector: "phase shift and independent perturbation-theory comparison",
    status: "ORDER_RESTRICTED_CERTIFIED_DESCENT",
    url: "https://journals.aps.org/prd/abstract/10.1103/nbxl-68tz"
  },
  {
    id: "k215-pa",
    source: "Peano-arithmetic formalization of a fixed 215-state Turing machine and coded ZFC proofs",
    map: "formal arithmetization and Metamath Zero proof compilation",
    target: "K215 halts iff ZFC is inconsistent",
    certificate: "machine-checked PA derivation with declared axioms, hashes and receipt",
    kernelOrLoss: "the theorem proves an equivalence; it proves neither that K215 halts nor that ZFC is inconsistent",
    detector: "small proof verifier plus false-conclusion control",
    status: "FORMALLY_CERTIFIED_EQUIVALENCE",
    url: "https://github.com/elliotglazer/k215-pa"
  },
  {
    id: "qft-four-manifolds",
    source: "supersymmetric quantum field theories on four-manifolds or complex surfaces",
    map: "topological twist and protected correlation-function construction",
    target: "intersection-theoretic invariants of instanton, sheaf or Higgs-sheaf moduli spaces",
    certificate: "protected/topological quantities related across physics and geometry",
    kernelOrLoss: "metric-dependent and unprotected dynamical content is not retained by the topological sector",
    detector: "twisted correlators and corresponding moduli-space invariants",
    status: "PROTECTED_SECTOR_DESCENT_REVIEW",
    url: "https://arxiv.org/abs/2610.30288"
  },
  {
    id: "sw-ssb-processor",
    source: "dephased matrix-product mixed states on a superconducting processor",
    map: "measurement plus channel-aware classical reconstruction",
    target: "fidelity, Renyi-2, linear and string correlators",
    certificate: "finite-size crossings and scaling collapse in nonlinear correlators while linear correlations decay",
    kernelOrLoss: "linear observables erase the order; finite-size evidence is not a thermodynamic-limit proof",
    detector: "two-setting nonlinear mixed-state reconstruction",
    status: "FINITE_SIZE_NONLINEAR_DETECTOR_WITNESS",
    url: "https://arxiv.org/abs/2610.26229"
  },
  {
    id: "riemann-modular-signpost",
    source: "social post pointing from an introductory Riemann-hypothesis talk toward modular forms",
    map: "unspecified",
    target: "unspecified",
    certificate: "none supplied in the linked post",
    kernelOrLoss: "no accessible theorem, construction or artifact was supplied from which to infer a descent",
    detector: "none",
    status: "UNRESOLVED_SIGNPOST",
    url: "https://x.com/cosminnegruseri/status/2113692628923584934"
  }
];

const corpusIntertwinerInventory = [
  {
    claim: 811,
    sourceRef: "corpus/claims/0800-0899/811_the_completed_furey_matter_tro_has_no_proper_four_channel_ternary_quotient_so_the_bridge_must_use_higgs_dressed_pairing.md",
    classification: "NO_GO",
    map: "completed Furey matter TRO to a proper four-channel ternary quotient",
    certificate: "classification of ternary ideals in the four full rectangular summands",
    residual: "use a paired or Gram functor rather than a proper ternary quotient"
  },
  {
    claim: 838,
    sourceRef: "corpus/claims/0800-0899/838_commuting_microscopic_color_and_handle_exchange_cannot_descend_to_R_and_H_and_the_central_repair_loses_the_singlet_lines.md",
    classification: "NO_GO",
    map: "commuting microscopic color and handle exchange to target R and H",
    certificate: "surjective-intertwiner commutator theorem; target commutator has rank four",
    residual: "treat H as a dressed response or accept a color-difference quotient that kills fixed lines"
  },
  {
    claim: 843,
    sourceRef: "corpus/claims/0800-0899/843_a_color_equivariant_split_quotient_can_lift_the_quadratic_selector_but_is_highly_nonunique_and_not_yet_gauge_typed.md",
    classification: "EXACT_BUT_NONUNIQUE",
    map: "split rank-four quotient Pi:R8->R4 with Pi J=I and color intertwining",
    certificate: "exact quadratic congruence descent for every response matrix",
    residual: "fourteen-dimensional intertwiner space, eight-dimensional section freedom and missing gauge typing"
  },
  {
    claim: 528,
    sourceRef: "corpus/claims/0500-0599/528_the_field_labelled_two_torsion_map_stops_at_two_intertwiners_and_needs_a_theta_extension.md",
    classification: "FINITE_AMBIGUITY_AND_OBSTRUCTION",
    map: "field-labelled binary support to a three-dimensional two-torsion shadow",
    certificate: "168 maps reduce to two under flags, orientation and puncture exchange",
    residual: "neither survivor preserves the natural mod-four quadratic data; a theta/metaplectic extension is required"
  },
  {
    claim: 999,
    sourceRef: "corpus/claims/0900-0999/999_the_central_sign_is_invisible_on_even_furey_bilinears_and_reduces_coherent_c12_to_observable_c6.md",
    classification: "EXACT_OBSERVABLE_DESCENT",
    map: "coherent C12 carrier action to C6 on even bilinear observables",
    certificate: "the central -I acts trivially on same-character quadratic tensors",
    residual: "no microscopic Standard-Model gauge identification of the central sign"
  }
].map((entry) => ({ ...entry, sourceExists: fs.existsSync(path.join(root, entry.sourceRef)) }));

function walkMarkdown(dir) {
  const files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) files.push(...walkMarkdown(full));
    else if (item.isFile() && item.name.endsWith(".md")) files.push(full);
  }
  return files;
}

const corpusMarkdown = walkMarkdown(path.join(root, "corpus"));
const censusTerms = {
  intertwiner: /\bintertwin(?:e|er|es|ers|ing)\b/i,
  commutingSquare: /commuting[ -]square/i,
  quotient: /\bquotient(?:s|ed|ing)?\b/i,
  descent: /\bdescen(?:t|d|ds|ded|ding)\b/i,
  kernel: /\bkernel(?:s)?\b/i,
  coarseGraining: /coarse[- ]grain(?:ing|ed)?/i,
  detector: /\bdetector(?:s)?\b/i,
  noGo: /\bno[- ]go\b/i
};
const corpusTexts = corpusMarkdown.map((file) => ({ file, text: fs.readFileSync(file, "utf8") }));
const termFileCounts = Object.fromEntries(Object.entries(censusTerms).map(([name, re]) => [name, corpusTexts.filter((x) => re.test(x.text)).length]));
const matched = corpusTexts.filter((x) => Object.values(censusTerms).some((re) => re.test(x.text)));
const corpusLexicalCensus = {
  scope: "all Markdown files below corpus/ at generation time",
  caveat: "lexical navigation census only; occurrence does not establish a typed map, proof or physical relation",
  scannedMarkdownFiles: corpusMarkdown.length,
  filesMatchingAtLeastOneTerm: matched.length,
  termFileCounts,
  maintainedSemanticOwners: [
    "corpus/programmes/frontier-physics-targets/frontier_gate_coverage_audit_v1.json",
    "corpus/programmes/frontier-physics-targets/frontier_wave_gate_audit_v1.json",
    "corpus/programmes/frontier-physics-targets/residual_programme_gate_audit_v1.json",
    "corpus/programmes/frontier-physics-targets/open_topics_register_v1.json"
  ]
};

const record = {
  schema: "admissibility.certificate-preserving-descent/1",
  id: "AZ-056",
  generatedAt: new Date().toISOString(),
  generatedBy: "scripts/run-certificate-preserving-descent.mjs",
  theorem: {
    exactDescent: "For a surjective linear map P:X->Y and F:X->X, a unique f:Y->Y with PF=fP exists iff ker(P) is F-invariant.",
    chosenSectionDefect: "For PJ=I and f=PFJ, Delta=PF-fP=PF(I-JP).",
    certificateFactorization: "A certificate D factors through P iff D is constant on every fibre of P.",
    detectorIntersection: "For a stacked linear detector D=(D1,D2), ker(D)=ker(D1) intersect ker(D2); common apparatus symmetries remain invisible to every invariant component.",
    composition: "For X--P1->Y--P2->Z with defects Delta1=P1F-f1P1 and Delta2=P2f1-f2P2, Delta21=(P2P1)F-f2(P2P1)=P2Delta1+Delta2P1.",
    hiddenStateElimination: "For F=[[A,B],[C,D]], exact elimination gives y_(n+1)=A y_n+B D^n h_0+sum_(j=0)^(n-1) B D^(n-1-j) C y_j. Kernel invariance is B=0; otherwise the exact shadow carries memory and initial slip."
  },
  linearWitnesses: {
    projection: P,
    rightInverse: J,
    rightInverseResidual: maxAbs(sub(mul(P, J), eye(2))),
    exact,
    approximate: {
      ...approximate,
      declaredLeakage: 0.02,
      errorBound: "||Delta x||_2 <= ||Delta||_2 ||x||_2; here the only leak is 0.02 times the hidden coordinate."
    },
    impossible: {
      ...impossible,
      collision: {
        x,
        xPlusKernel,
        sameInitialShadow: JSON.stringify(apply(P, x)) === JSON.stringify(apply(P, xPlusKernel)),
        nextShadowX: apply(P, apply(Fimpossible, x)),
        nextShadowXPlusKernel: apply(P, apply(Fimpossible, xPlusKernel))
      }
    }
  },
  compositionWitness: {
    firstDefectNorm: frob(delta1),
    secondDefectNorm: frob(delta2),
    directDefect,
    composedDefect,
    identityResidual: maxAbs(sub(directDefect, composedDefect)),
    triangleBound: frob(mul(P2, delta1)) + frob(mul(delta2, P1)),
    directDefectNorm: frob(directDefect)
  },
  memoryClosureWitness: {
    blockDynamics: { A: Ablock, B: Bblock, C: Cblock, D: Dblock },
    initialState: memoryInitial,
    steps: 8,
    memoryKernelScalars: Array.from({ length: 8 }, (_, n) => 0.2 * (Dblock ** n) * 0.3),
    fullVisibleTrajectory: fullTrajectory.map((v) => v.slice(0, 2)),
    reconstructedVisibleTrajectory: reconstructedVisible,
    maximumResidual: memoryResidual,
    conclusion: "Non-invariant hidden directions admit exact non-Markovian visible closure even when autonomous Markovian descent is impossible."
  },
  commutatorNoGo: {
    statement: "If PA=RP and PB=HP for a surjective P and commuting A,B, then [R,H]P=P[A,B]=0, hence [R,H]=0. A noncommuting target pair therefore cannot be the exact image of a commuting source pair.",
    targetRotation: R,
    targetReflection: H,
    targetCommutator,
    targetCommutatorRank: rank(targetCommutator),
    targetCommutatorFrobeniusNorm: frob(targetCommutator)
  },
  nonlinearDetectorWitness: {
    rhoMixed,
    rhoCoherent,
    sharedLinearZExpectation: zExpectation(rhoMixed),
    secondLinearZExpectation: zExpectation(rhoCoherent),
    mixedPurity: purity(rhoMixed),
    coherentPurity: purity(rhoCoherent),
    conclusion: "A nonlinear certificate can split a selected linear-detector fibre, but this two-state witness is not a tomography theorem."
  },
  corpusCrossChecks: {
    az052: {
      sameControl: 0,
      sameBoundCount: zero.trivialBoundCount === zero.topologicalBoundCount,
      boundCount: zero.trivialBoundCount,
      phaseWindingDifference: zero.topologicalPhaseWinding - zero.trivialPhaseWinding,
      casimirProxyDifference: zero.topologicalCasimirProxy - zero.trivialCasimirProxy,
      conclusion: "Bound count alone is not a sufficient certificate for the phase or boundary-response shadow."
    },
    az053: {
      placementFibreSize: az53.completePlacementFibre.size,
      inventoryClasses: 1,
      symmetricSeebeckClasses: az53.completePlacementFibre.seebeckRange.distinctAt1e9,
      orientationSensitiveBoundaryClasses: az53.completePlacementFibre.casimirProxyRange.distinctAt1e9,
      reversalOrbitCount: az53.completePlacementFibre.reversalAudit.orbitCount
    },
    az054: {
      placementFibreSize: az54.fibre.placements,
      longitudinalNernstJointClasses: az54.fibre.jointLongitudinalNernstClasses,
      allDetectorClasses: az54.fibre.jointAllClasses,
      apparatusReflectionOrbitCount: 21,
      saturatesApparatusSymmetryBound: az54.admission.jointDetectorSaturatesTopBottomOrbitBound
    }
  },
  corpusIntertwinerInventory,
  corpusLexicalCensus,
  externalCases,
  admission: {
    exactDescentCriterionProvedAndWitnessed: exact.defectFrobeniusNorm === 0,
    approximateLeakageQuantified: Math.abs(approximate.defectFrobeniusNorm - 0.02) < 1e-12,
    quotientDynamicsNoGoWitnessed: Math.abs(apply(P, apply(Fimpossible, xPlusKernel))[0] - 0.4) < 1e-12,
    compositionIdentityCloses: maxAbs(sub(directDefect, composedDefect)) < 1e-12,
    exactMemoryClosureCloses: memoryResidual < 1e-12,
    noncommutingTargetBlocksCommutingSourceDescent: rank(targetCommutator) === 2,
    nonlinearDetectorLiftsSelectedBlindSpot: purity(rhoCoherent) !== purity(rhoMixed),
    commonPhysicalMechanismEstablishedAcrossExternalCases: false,
    spin23PhysicalDescentEstablished: false
  },
  irreducibleGates: [
    { topicId: "OT-019", missing: "one source-native three-scale carrier with direct and composed physical pushforwards and held-out substitutions" },
    { topicId: "OT-027", missing: "an action generating the operator, amplitude, loss and calibrated detector maps" },
    { topicId: "OT-034", missing: "global injectivity or a characterized residual quotient over a frozen nonlinear model family" },
    { topicId: "OT-038", missing: "one labelled, unit-preserving, orientation- and loss-aware cross-carrier commuting square" },
    { topicId: "OT-045", missing: "an explicit operator domain satisfying preregistered Hecke or modular identities" }
  ]
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`wrote ${path.relative(root, outPath)}`);
console.log(JSON.stringify({
  exactDefect: exact.defectFrobeniusNorm,
  approximateDefect: approximate.defectFrobeniusNorm,
  impossibleNextShadowSplit: record.linearWitnesses.impossible.collision,
  compositionResidual: record.compositionWitness.identityResidual,
  commutatorRank: record.commutatorNoGo.targetCommutatorRank,
  detectorClassLadder: [1, 19, 35, 21]
}, null, 2));
