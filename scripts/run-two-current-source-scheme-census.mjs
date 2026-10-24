import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const root = resolve(import.meta.dirname, "..");
const outputPath = resolve(root, "evidence/data/two-current-source-scheme-census-v1.json");

const sources = [
  { id: "collins-scalise-1994", url: "https://arxiv.org/abs/hep-ph/9403231", role: "general composite-operator mixing and BRST/physical-matrix-element boundary", imports: ["mixing_basis_must_close", "on_shell_zero_momentum_ir_warning"], doesNotImport: "the incidence/B-L anomalous-dimension matrix" },
  { id: "capri-et-al-2020", url: "https://arxiv.org/abs/2007.01770", role: "explicit vector-composite mixing and Ward-identity precedent in a Higgs phase", imports: ["same_quantum_number_operator_mixing", "ward_identities_can_constrain_z_matrix"], doesNotImport: "a Standard-Model or incidence-current result" },
  { id: "bauer-et-al-2021", url: "https://arxiv.org/abs/2012.12272", role: "ALP dimension-five running, basis equivalence and weak-scale matching", imports: ["broken_current_alp_running", "redundant_higgs_current_handling", "threshold_matching_template"], doesNotImport: "the vector-source two-current correlator or a nonzero B-L ALP channel" },
  { id: "chala-et-al-2023", url: "https://arxiv.org/abs/2012.09017", role: "complete one-loop ALP running above and below the electroweak scale", imports: ["alp_basis_cross_check", "one_loop_running_template"], doesNotImport: "a unique incidence normalization or vector-source contact matrix" },
  { id: "quevillon-et-al-2023", url: "https://arxiv.org/abs/2112.00553", role: "anomalous Ward identities for derivative Goldstone couplings", imports: ["anomalous_ward_identity_accounting"], doesNotImport: "a conserved B-L response port" },
  { id: "jain-kovtun-2023", url: "https://arxiv.org/abs/2309.00511", role: "causal Schwinger-Keldysh hydrodynamic EFT with background sources and dynamical KMS", imports: ["background_source_sk_template", "kms_fluctuation_dissipation_constraints"], doesNotImport: "the ultraviolet completion, Wilson coefficients or incidence relaxation rate" },
  { id: "hongo-et-al-2024", url: "https://arxiv.org/abs/2411.08016", role: "approximate-symmetry Schwinger-Keldysh treatment and relaxation in a broken Ward identity", imports: ["spurion_and_relaxation_template"], doesNotImport: "the Standard-Model incidence-current relaxation coefficient" },
  { id: "gesztesy-tsekanovskii-1997", url: "https://arxiv.org/abs/funct-an/9712004", role: "matrix-valued Herglotz representation", imports: ["positive_matrix_spectral_measure"], doesNotImport: "subtraction constants, source normalization or finite-temperature tensor structure" },
];

const workPackages = [
  { id: "WP-A", name: "ultraviolet operator closure and mixing", requiredOutputs: ["gauge_invariant_operator_basis", "2x2_source_subblock", "mixing_with_eom_brst_total_derivatives", "anomalous_dimension_matrix"], protectedStatement: "With Dirac nu_R and no Majorana mass, the exact B-L Ward identity fixes one current axis; the nonconserved incidence insertion may still rescale and shear by B-L.", cannotBeImported: ["gamma_lambda_lambda", "gamma_lambda_q", "finite_frame_condition"] },
  { id: "WP-B", name: "broken-phase correlator, thresholds and contacts", requiredOutputs: ["renormalized_Pi_ij_munu", "transverse_and_incidence_longitudinal_spectral_parts", "symmetric_local_contact_matrix", "top_weak_bottom_charm_threshold_matching"], protectedStatement: "The nonlocal B-L longitudinal row and column vanish only on the exact Dirac branch, modulo local Ward contacts.", cannotBeImported: ["finite_contact_tensor", "off_diagonal_absorptive_part", "scheme_surviving_ratios"] },
  { id: "WP-C", name: "thermal KMS tensor and approximate-charge dynamics", requiredOutputs: ["rest_frame_tensor_projectors", "retarded_and_symmetric_matrix_correlators", "kms_relation", "incidence_breaking_operator_sector", "relaxation_and_hydrodynamic_limit"], protectedStatement: "KMS relates noise to the spectral response but does not choose the source frame, remove contacts or turn the broken incidence insertion into a conserved density.", cannotBeImported: ["incidence_relaxation_rate", "parity_odd_coefficients", "finite_temperature_rank"] },
];

const result = {
  protocol: "two-current-source-scheme-census/1",
  date: "2026-10-25",
  target: "OT-047",
  scope: "preliminary source and scheme census; no loop integral or closure claim",
  branchAssumptions: ["Standard Model plus right-handed neutrinos", "Dirac-neutrino branch unless explicitly forked", "nondynamical background vector sources", "one declared mass-independent subtraction scheme followed by explicit threshold matching"],
  sources,
  workPackages,
  structuralResult: {
    labelSpaceDimension: 2,
    labelSpaceWarning: "Two source labels do not imply a two-component full response: Lorentz/thermal projectors, breaking operators, contacts and thresholds enlarge the calculation.",
    allowedProtectedBranchMixingForm: "d/dln(mu) [J_lambda,J_q]^T = [[gamma_ll,gamma_lq],[0,0]] [J_lambda,J_q]^T plus EOM/BRST/total-derivative sectors, in a convention where J_q is the protected B-L current.",
    majoranaFork: "A Majorana mass breaks continuous B-L and removes the protected zero row; it must be calculated as a separate branch.",
    alpBoundary: "Published ALP running is a controlled cross-check for the broken incidence direction, but exact B-L is derivative-null and the ALP embedding cannot realize the full two-port vector response.",
  },
  minimumDeliverables: [
    "declare the complete composite-operator basis and subtraction scheme",
    "compute the source subblock and every mixing sector needed for closure",
    "separate nonlocal spectral densities from local contact polynomials",
    "match across electroweak and fermion thresholds without refitting the source frame",
    "write the finite-temperature projector basis and KMS relation before taking omega or momentum limits",
    "report the Dirac and Majorana branches separately",
  ],
  verdict: {
    status: "source_and_scheme_census_complete_calculation_open",
    importedResultCount: sources.reduce((n, source) => n + source.imports.length, 0),
    programmeSpecificUnknownCount: workPackages.reduce((n, wp) => n + wp.cannotBeImported.length, 0),
    physicalFirewall: "The literature fixes the calculation architecture, not the programme-specific anomalous dimensions, contacts, thermal coefficients or observable ratios.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, workPackages: result.workPackages.map(({ id, name }) => ({ id, name })), verdict: result.verdict }, null, 2));
