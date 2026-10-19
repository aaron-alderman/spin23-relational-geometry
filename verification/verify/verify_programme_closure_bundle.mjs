import { spawnSync } from "node:child_process";

const scripts = [
  "verification/verify/verify_programme_closure_manifest.mjs",
  "verification/verify/verify_programme_source_frame_affine_torsor.mjs",
  "verification/verify/verify_programme_controlled_external_source_action.mjs",
  "verification/verify/verify_programme_vacuum_two_current_h2r_closure.mjs",
  "verification/verify/verify_programme_route_separation.mjs",
  "verification/verify/verify_programme_free_uv_current_metric.mjs",
  "verification/verify/verify_programme_no_go_atlas.mjs",
  "verification/verify/verify_programme_paperworthiness_register.mjs",
  "verification/verify/verify_programme_completion_audit.mjs",
  "verification/verify/verify_freudenthal_h2r_source_response_restriction.mjs",
  "verification/verify/verify_freudenthal_selector_uniqueness_and_line_degeneracy.mjs",
  "verification/verify/verify_freudenthal_symplectic_and_triple_restriction.mjs",
  "verification/verify/verify_freudenthal_ward_uv_covariance_and_contact_obstruction.mjs",
  "verification/verify/verify_freudenthal_logdet_action_and_scale_no_go.mjs",
  "verification/verify/verify_freudenthal_gaussian_schur_boundary_realization.mjs",
  "verification/verify/verify_freudenthal_causal_spectral_contact_no_go.mjs",
  "verification/verify/verify-furey-oriented-sector-anomalies.mjs",
  "verification/verify/verify-furey-one-generation-subtro.mjs",
  "verification/verify/verify_neutral_extension_tro_closure.mjs",
  "verification/test/test_the_completed_furey_tro_unsymmetrized_product_against_the_kantor_identities.mjs",
  "verification/construct/construct_the_structurable_furey_kantor_five_grading_and_identify_its_classical_lie_closure.mjs",
  "verification/construct/construct_the_full_complex_furey_structurable_five_grading_and_compare_its_real_slice.mjs",
  "verification/test/test_cp_transpose_pairing_against_the_real_lepton_structurable_kantor_slice.mjs"
];

let passed = 0;
for (const script of scripts) {
  const result = spawnSync(process.execPath, [script], { encoding: "utf8", timeout: 180000 });
  if (result.status !== 0) {
    console.error(`FAIL ${script}`);
    if (result.stdout) console.error(result.stdout.trim());
    if (result.stderr) console.error(result.stderr.trim());
    process.exit(1);
  }
  passed++;
  console.log(`PASS ${script}`);
}
console.log(`PASS programme closure bundle ${passed}/${scripts.length}`);
