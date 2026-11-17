# Evidence families and reproduction

**Date:** 8 November 2026  
**Status:** provenance and reproduction guide; no additional physical admission  
**Parent:** [programme record](README.md)  
**Machine index:** [hashed packet manifest](../../../evidence/data/optical-boundary-response-research-packet-v1.json)

## What counts as evidence

| Family | Records | Independence boundary |
|---|---|---|
| Supplied E8 charge rotor | Charge projection, shell refinement, frozen higher-line predictions and selector counterfamilies | Multiple numerical checks of one supplied model; not independent material measurements |
| Constructed four-site boundary model | Gauge elimination, source normalization and optical/Casimir–Polder response | A separate mathematical example; not a reduction of the E8 model or the hybrid device |
| Published hybrid-device release | Paper and public figure workbooks | One experimental release; fitted curves and raw maps do not count as separate experiments |
| Hybrid model and instrument design | Source-action alternatives, ratio tests, Rabi protocol and pickup simulations | Conditional deductions and proposed measurements; no new acquisitions |
| Corpus selector/action audit | Existing Clifford, scalar-wall, minimal gravity and critical torsion certificates; new support and coupling counterexamples | One source audit with conditional mathematical witnesses; no joined physical T1/T2 realization |
| Periodic Maxwell fixture | Fourier-derived counterpropagating-wave coupling and plane-wave band calculation | One newly declared medium model; no experimental aether evidence or selector identification |
| Cavity–shield antinode scan | Two-balance model, RF degeneracy example and verification | One phenomenological comparison with no physical admission or new measurements |
| Matched AdS tidal fixture | Conserved null source, four curvature reconstructions, and matched Dirichlet wall stresses and charges | One exact slab fixture with both bulk and wall readouts; no physical measurement or independent connection/frame charge test |

The [manifest generator](../../../scripts/index-optical-boundary-response-research-packet.mjs) records exact paths, SHA-256 hashes, family assignments and verification commands. Its selection is a curated packet, not a complete environment lockfile or an assertion that every historical dependency has been archived. Existing result-specific verifiers check their recorded source hashes and numerical contracts.

## Result index

| Stage | Result record | Reading note |
|---|---|---|
| Charge source and shell response | [shell convergence](../../../evidence/data/translation-free-e8-charge-shell-convergence-result-v1.json) | [E8 source](E8_SELECTOR_AND_OPTICAL_SOURCE.md) |
| Original frozen test, including failure | [coarse replay](../../../evidence/data/translation-free-e8-multifrequency-replay-v1.json) | [E8 source](E8_SELECTOR_AND_OPTICAL_SOURCE.md) |
| Refined higher-line test | [holdout score](../../../evidence/data/translation-free-e8-refined-holdout-score-v1.json) | [E8 source](E8_SELECTOR_AND_OPTICAL_SOURCE.md) |
| Selector non-uniqueness | [identifiability audit](../../../evidence/data/translation-free-e8-selector-identifiability-v1.json) | [E8 source](E8_SELECTOR_AND_OPTICAL_SOURCE.md) |
| Gauge-covariant boundary example | [boundary action](../../../evidence/data/selector-flux-boundary-action-audit-v1.json) | [flux and force](GAUGE_FLUX_AND_CASIMIR_BRIDGE.md) |
| Same-model fluctuation force | [optical/Casimir–Polder bridge](../../../evidence/data/selector-flux-optical-casimir-polder-bridge-v1.json) | [flux and force](GAUGE_FLUX_AND_CASIMIR_BRIDGE.md) |
| Cavity–shield gap, reflection phase and matched-velocity crossings | [force calculation](../../../scripts/model-cavity-shield-antinode.mjs) | [antinode scan and motion discriminator](CAVITY_SHIELD_ANTINODE_SCAN.md) |
| Cavity–shield physical scales and rotor comparison | [force and precession benchmarks](../../../scripts/model-cavity-shield-antinode.mjs) | [calibration and rotor scales](CAVITY_SHIELD_ANTINODE_SCAN.md#physical-force-scales-and-rotation) |
| Physical-scale inventory | [device-scale audit](../../../evidence/data/selector-device-physical-scale-audit-v1.json) | [device audit](HYBRID_DEVICE_DATA_AUDIT.md) |
| Source and contact terms | [field-source derivation](../../../evidence/data/hcq-device-field-source-derivation-v1.json) | [device audit](HYBRID_DEVICE_DATA_AUDIT.md) |
| Scalar cancellation and its limits | [lever-arm ratio test](../../../evidence/data/hcq-lever-arm-ratio-test-v1.json) | [measurement protocol](INDUCTIVE_STRENGTH_AND_LOCAL_FLUX_PROTOCOL.md) |
| Public-data extraction | [unscored strength test](../../../evidence/data/hcq-public-inductive-strength-test-v1.json) | [device audit](HYBRID_DEVICE_DATA_AUDIT.md) |
| Paired-frequency Rabi experiment | [protocol simulation](../../../evidence/data/hcq-isofrequency-rabi-protocol-v1.json) | [measurement protocol](INDUCTIVE_STRENGTH_AND_LOCAL_FLUX_PROTOCOL.md) |
| Independent drive witness | [local-flux witness](../../../evidence/data/hcq-independent-local-flux-witness-v1.json) | [measurement protocol](INDUCTIVE_STRENGTH_AND_LOCAL_FLUX_PROTOCOL.md) |
| Formal pickup identifiability | [row-span proof](../../../verification/lean/LocalFlux.lean), [exact witness](../../../verification/lean/LocalFluxWitness.lean), [axiom audit](../../../verification/lean/LocalFluxAudit.lean) | [Python replay](../../../verification/verify/verify_hcq_local_flux_lean.py) |
| Screening-current-aware layout | [geometry and budget](../../../evidence/data/hcq-screening-pickup-geometry-v1.json) | [measurement protocol](INDUCTIVE_STRENGTH_AND_LOCAL_FLUX_PROTOCOL.md) |
| Matched AdS gravitational response | [tidal-response record](../../../evidence/data/ads-tidal-response-v1.json) | [source, walls and tidal calculation](ADS_TIDAL_RESPONSE.md) |
| Matched AdS wall charges | [wall-charge record](../../../evidence/data/ads-boundary-charges-v1.json) | [boundary actions and Brown–York charges](ADS_BOUNDARY_CHARGES.md) |

The primary experimental source is [Dunstan et al., version 1](https://arxiv.org/abs/2601.06682v1), with its [public data release](https://osf.io/q4dav/). Downloaded figure workbooks are retained under `evidence/data/hcq-device-primary-v1/`; their hashes appear in the manifest and extraction records. These records preserve the printed parameter inconsistency rather than silently repairing it.

## Local-flux proof intake, 18 November 2026

The Windows copy supplies the 210-artifact packet and its retained negative
results. The server copy supplies the four proof and replay files linked
above. The audit used the same [local-flux witness](../../../evidence/data/hcq-independent-local-flux-witness-v1.json)
as the protocol. Its SHA-256 is
`d98a29623d70d18ad1536d27faddc463834938597d1c5db157d03b9d500c8694`.
The numerical verifier maps the recorded Windows checkout path to the same
source coordinate in the current checkout and still checks the original digest.
The reconciliation checkout preserves the original bytes for packet inputs
whose recorded SHA-256 includes CRLF line endings.

The proof models the pickup rows and device flux as rational linear
functionals on the current coordinates. Equal pickup readings leave a
difference in the common pickup kernel. The device flux is identifiable
exactly when it vanishes there, equivalently when its row is in the span of
the pickup rows. The proof builds span coefficients by subtracting a
multiple of the new row chosen on a current invisible to the preceding
rows. The stored witness has equal single-pickup readings of 1 while device
flux changes by a factor of 11/10. Two independent rows reconstruct that
factor exactly. The single-pickup criterion still fails for the declared
model.

The replay compiled under stock Lean 4.33.0 and audited eight declarations
against `propext`, `Classical.choice` and `Quot.sound`. The proof and
the numerical witness belong to the same model evidence family. Physical
use requires an independent calibration of the device and pickup response
rows. The next discriminator is whether the measured device row lies
within the calibrated pickup span at the uncertainty needed by the
[proposed local-flux protocol](INDUCTIVE_STRENGTH_AND_LOCAL_FLUX_PROTOCOL.md).

## Verification

Run commands from the repository root. Node verifiers use the built-in Node runtime. Python calculations requiring NumPy/SciPy use `.venv-alpaca/Scripts/python.exe`; workbook readers use the bundled Python environment with `openpyxl`. The machine manifest lists each check and runtime separately. Environment availability is distinct from scientific validity.

```powershell
node verification/verify/verify_translation_free_e8_multifrequency.mjs
node verification/verify/verify_translation_free_e8_refined_holdout.mjs
node verification/verify/verify_translation_free_e8_selector_identifiability.mjs
.venv-alpaca/Scripts/python.exe verification/verify/verify_selector_flux_optical_casimir_polder.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_hcq_lever_arm_ratios.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_hcq_isofrequency_rabi_protocol.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_hcq_local_flux_witness.py
python3 verification/verify/verify_hcq_local_flux_lean.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_hcq_screening_pickups.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_ads_tidal_response.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_ads_boundary_charges.py
```

Use the bundled Python executable for `verification/verify/verify_hcq_device_field_source.py` and `verification/verify/verify_hcq_public_inductive_strengths.py`. Its current absolute location is recorded in the manifest; it is a local runtime dependency, not part of the scientific model.

After an intentional packet edit, regenerate and verify the index:

```powershell
node scripts/index-optical-boundary-response-research-packet.mjs
node verification/verify/verify_optical_boundary_response_research_packet.mjs
```

The packet check verifies hashes, local document links, evidence-family assignments and retained status boundaries. It does not recompute all spectra or establish experimental truth. A numerical verifier can pass while confirming that a particular frozen scientific criterion failed.

**Initial documentation-pass verification, 8 November 2026:** all ten original result-specific checks passed: three E8 checks, the optical/Casimir–Polder check, and six hybrid source/ratio/public-data/protocol/witness/geometry checks. The scoped packet integrity check also passed. This pass checked saved evidence and its stated contracts; it did not repeat the large charge-shell solves or acquire experimental data. In particular, the original coarse numerical criterion remains failed, the public strength test remains unscored, and measured 0.5% drive equality remains unachieved. The later action-level audit and its additional verification commands are recorded below.

## Recomputing rather than verifying

The calculation scripts are indexed with the reports. Large E8 diagonalizations and full-shell inverse solves require their charge basis, numerical dependencies and substantial resources. Hash verification of saved results is not a fresh diagonalization. The original frozen prediction files must remain unchanged; do not rerun a freeze generator after inspecting its target and call it a held-out prediction.

Geometry simulations can be rerun with `scripts/design-hcq-screening-pickups.py`; the resulting matrices remain a filament/kinetic-inductance surrogate until actual film geometry and screening modes are supplied. Re-rendering the drawing adds no physical evidence. Rerunning public-data extraction adds no independent experiment.

## Remaining admission gates

The missing joined packet still consists of a physically normalized source action, fixed constitutive/dipole blocks, measured or derived geometry and material scales, complete relevant screening modes, and independently calibrated acquisitions at paired working points. A force prediction additionally needs the full electromagnetic response, boundary geometry and controlled backgrounds. The 0.5% target is an acceptance contract awaiting measurements.

Future contributions should attach a reproducible record to the relevant note, identify which gate it addresses, and retain the earlier failure or ambiguity. Programme documentation can become reviewable immediately; promotion to a physical claim requires its own evidence and corpus admission process.

The [T1/T2 clarification](E8_SELECTOR_AND_OPTICAL_SOURCE.md#t1t2-propagation-and-a-possible-mass-gap) adds an analytic two-component comparison, with its assumptions and corpus source. Its mass-gap identity is obtained by Pauli-matrix anticommutation; it adds no simulation, experimental evidence or selector identification. No existing numerical result is changed by that clarification.

The subsequent [action-level audit](T1_T2_ACTION_AND_MASS_GAP.md) records the [support and gap report](../../../evidence/data/t1-t2-action-mass-gap-audit-v1.json) and [six existing-certificate execution receipts](../../../evidence/data/t1-t2-action-source-checks-v1.json). All six source certificates passed on 8 November 2026. They certify their stated constructions, not their identification with one another. The new verifier checks cross-sector anticommutation, unequal singular values, an unmatched 8+7 zero, a diagonal-term counterexample, and the normalized Yukawa family. Reproduce with:

```powershell
node scripts/audit-t1-t2-action-mass-gap.mjs
node verification/verify/verify_t1_t2_action_mass_gap.mjs
```

The audit generator preserves archived source-check output; it hashes the receipt and source files but does not rerun the six historical commands. To obtain a fresh execution receipt, execute those listed commands and archive their actual outputs. Regenerating an index alone is not a fresh execution.

The [Yukawa/vacuum continuation](YUKAWA_VACUUM_SCALE_SELECTION.md) adds a [trace-linked action report](../../../evidence/data/yukawa-vacuum-scale-selection-v1.json) and [five further source-check receipts](../../../evidence/data/yukawa-vacuum-source-checks-v1.json), all passed on 8 November 2026. These remain in the same corpus-selector/action evidence family. The new comparison action is explicitly supplied; claim 1110 supplies its trace invariants, not its complete quadratic term or physical matching. The new check distinguishes a cancelled bare-amplitude redundancy from the surviving physical shape and scale freedom, and independently brackets the radiative minimum:

```powershell
node scripts/audit-yukawa-vacuum-scale-selection.mjs
node verification/verify/verify_yukawa_vacuum_scale_selection.mjs
```

As with the preceding action audit, the generator hashes and preserves the archived source-check outputs rather than treating their reuse as a fresh execution. Neither the trace cancellation nor the positive radiative benchmark is a new experimental confirmation.

The [spectral mass-ratio continuation](SPECTRAL_MASS_RATIO_CLOSURE.md) adds the [explicit coefficient/shape calculation](../../../evidence/data/spectral-mass-ratio-closure-v1.json) and [two additional existing-certificate receipts](../../../evidence/data/spectral-mass-ratio-source-checks-v1.json), both source checks passed on 8 November 2026. The primary-source endpoints and reviewed equations are recorded in the report; full remote source bytes are not archived here. The new calculation is a declared flat Dirac/scalar model, in the existing corpus-selector/action evidence family. It is not a new measurement or an admitted physical T1/T2 action.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-spectral-mass-ratio-closure.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_spectral_mass_ratio_closure.py
```

The verifier checks the heat-kernel derivative trace, cutoff-moment family, scalar-reference cancellation, finite-shape freedom, non-diagonal fixed-trace bound, full-rank cross-block repair and an independently integrated unexpanded Gaussian negative control. The comparison also distinguishes optimizing a dynamical finite spectrum from supplying one as input. Reusing archived source-check outputs is not a fresh execution of those source certificates.

The [dynamical finite-Dirac continuation](DYNAMICAL_FINITE_DIRAC_AND_FULL_ACTION.md) adds the [full-cutoff and stabilization report](../../../evidence/data/dynamical-finite-dirac-full-action-v1.json). It retains the same corpus-selector/action evidence-family identity. New results are an exact flat constant-mass monotonicity/convexity calculation and supplied hard/soft constraint comparisons. The finite-Dirac ensemble literature is recorded as an external neighbouring construction, not a corpus-derived physical implementation.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-dynamical-finite-dirac-full-action.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_dynamical_finite_dirac_full_action.py
```

The verifier compares closed forms with direct momentum integrals, checks fixed-radius convexity on random spectra, computes the soft model's amplitude Hessian independently, and retains the radial-mode loss, orientation degeneracy, measure-divergence and physical-identification boundaries. There are no new experimental acquisitions or repeated source-certificate execution claims in this continuation.

The [potential/metric continuation](PEIRCE_POTENTIAL_AND_KINETIC_METRIC.md) adds the [leading block-trace calculation](../../../evidence/data/peirce-potential-kinetic-metric-v1.json) and [one pairing-certificate execution receipt](../../../evidence/data/peirce-metric-source-checks-v1.json), passed on 8 November 2026. It shares the existing corpus-selector/action evidence family. The declared comparison derives a potential and kinetic metric through the leading heat coefficient; it does not derive the full stabilizer or a physical representation of its backgrounds.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-peirce-potential-kinetic-metric.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_peirce_potential_kinetic_metric.py
```

The verifier tests complex non-diagonal trace identities, frame covariance, an independently differentiated real-coordinate Hessian and kinetic normalization, background-dependent full fermion gaps, the pure-cross unmatched zero, the full Gaussian gradient, and the scope of allowed EFT kinetic corrections. The source receipt is archived evidence of one execution; regenerating this report does not rerun it. No target mass or new experimental datum is fitted.

The [joint-background continuation](JOINT_BACKGROUND_VACUUM_AND_KINETIC_PROTECTION.md) adds the [fully varied polynomial and protection report](../../../evidence/data/joint-background-vacuum-kinetic-protection-v1.json) and [three existing-certificate execution receipts](../../../evidence/data/joint-background-source-checks-v1.json), all source checks passed on 8 November 2026. They remain in the same corpus-selector/action family. Primary-source renormalization results and their scope are recorded in the report; remote source bytes are not archived here.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-joint-background-vacuum-kinetic-protection.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_joint_background_vacuum_kinetic_protection.py
```

The new check completes the quartic square, independently differentiates all nine real Hermitian directions, tests the background orbit and tree-ratio invariance, and retains the full-Gaussian descent and symmetry-allowed coefficient deformations. Its formal RG identity is not a beta-function calculation. A unique UV action plus calculated running remains a possible route even without a scale-independent mass relation; neither physical route is admitted here.

The [UV/pole continuation](UV_BOUNDARY_RUNNING_AND_POLE_MATCHING.md) adds the [boundary and matching audit](../../../evidence/data/uv-boundary-running-pole-matching-v1.json) and [three existing UV-source check receipts](../../../evidence/data/uv-pole-source-checks-v1.json), all source checks passed on 8 November 2026. This is the same corpus-selector/action evidence family. Known color and axial beta examples are not used as the target model's beta functions.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-uv-boundary-running-pole-matching.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_uv_boundary_running_pole_matching.py
```

The new calculation is a fixed-reference, single-scalar-channel dispersive surrogate. The verifier independently integrates its original spectral variable, solves its below-threshold poles, checks positive residues and the Dirac two-body threshold factor, and verifies both finite-matching sensitivity and compensated scheme invariance. It omits complete fermion/scalar/gauge self-energies, target RG flow, tadpoles and heavy-threshold matching; no numerical physical pole correction is claimed. The report archives source executions without rerunning them during regeneration.

The [periodic-medium hypothesis](PERIODIC_PHOTON_MEDIUM_AND_UV_IR.md) records the user-specified aether premise separately from the [declared Maxwell calculation](../../../evidence/data/periodic-photon-medium-bridge-v1.json). Michelson–Morley is set aside for the hypothetical calculation; that is not an empirical conclusion about its sensitivity. This numerical fixture has its own causal evidence-family identity and does not turn the premise into experimental evidence.

```powershell
.venv-alpaca/Scripts/python.exe scripts/derive-periodic-photon-medium-bridge.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_periodic_photon_medium_bridge.py
```

The calculation derives the leading coupling from the supplied dielectric Fourier coefficient and compares it without refitting against a larger plane-wave eigenproblem. Verification checks a positive dielectric metric, Maxwell residuals, basis convergence, the uncoupled limit, weak-grating accuracy and the distinction between envelope labels and absolute energy. It establishes neither a physical photon aether nor a genuine UV/IR duality.

The [period/amplitude continuation](PHOTON_MEDIUM_PERIOD_AND_AMPLITUDE.md) adds the [pattern/optical-join report](../../../evidence/data/photon-medium-period-amplitude-v1.json) and [three existing source-check execution receipts](../../../evidence/data/photon-medium-scale-source-checks-v1.json), all source checks passed on 8 November 2026. They remain within the periodic-Maxwell comparison family; the source certificates and numerical refinements are not independent physical confirmations. Primary pattern-model literature is recorded as a neighbouring construction, not a corpus-derived aether action.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-photon-medium-period-and-amplitude.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_photon_medium_period_amplitude.py
```

The verifier checks source hashes, independently reconstructed spectral derivatives and energy, harmonic refinement, a variable cell wave number, local Hessian positivity with the translation zero mode retained, exact period/amplitude deformation families, and a larger Maxwell eigenproblem without fitting its gap. An initial sampled-FFT derivative check failed because numerical roundoff at absent high modes was amplified by differentiation; differentiation of the declared represented coefficients resolves this numerical issue while separately checking their sampled Fourier transform. Local one-cell stability is not a full sideband/global/dynamical stability result. The generator preserves archived source-check outputs rather than rerunning those three source certificates. No physical period, optical modulation or aether admission follows from these checks.

The [source-native pattern/photon continuation](SOURCE_NATIVE_PATTERN_AND_PHOTON_ACTION.md) adds the [joined-action audit and controls](../../../evidence/data/photon-medium-native-action-v1.json) and [two photon-normalization source executions](../../../evidence/data/photon-medium-native-action-source-checks-v1.json), both passed on 8 November 2026. These mathematical source certificates and declared comparison calculations share the periodic-Maxwell evidence family; they are not new independent physical observations.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-photon-medium-native-action.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_photon_medium_native_action.py
```

The new verifier checks exact Gaussian auxiliary minimization, matrix Schur-complement monotonicity, a derivative-truncation negative control, positive linear-port families at fixed substrate normalization, field-coordinate invariance and the Fourier weights of an even optical port. The stable-mode obstruction is confined to positive static two-derivative quadratic matrices; it is not a theorem excluding all modulated media. The even-port test is a sinusoidal Fourier control rather than a new full-pattern Maxwell solve. Report regeneration preserves the archived source outputs without reexecuting those certificates. The source-native action and physical period/modulation/gap prediction criteria remain failed.

The [full spectral continuation](FULL_SPECTRAL_KERNEL_AND_PATTERN_GATE.md) adds the [exact momentum-kernel report](../../../evidence/data/full-spectral-finite-k-v1.json) in the same periodic-Maxwell comparison family. The existing entire-completion matching-degeneracy verifier was executed and passed on 8 November 2026; the command and a labelled summary of its observed outcome are embedded in the report, rather than a claimed byte-for-byte stdout receipt. That source concerns a different spin-two carrier and is used only for its higher-response non-uniqueness boundary. The primary Gaussian heat-trace source and reviewed equations are recorded; full remote bytes are not archived.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-full-spectral-finite-k.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_full_spectral_finite_k.py
```

The verifier compares a direct four-dimensional divided-difference bubble with the reduced exact form factor, checks the radial integration identity, tests nonnegative-cutoff ordering, preserves the false fourth-derivative instability, compares profiles with identical leading scalar coefficients, integrates the unexpanded constant-field potential and checks Gaussian constant-scalar heat factorization. Exactness in momentum does not mean exactness to all scalar orders. No finite-amplitude periodic solution, full-pattern mixed gauge response, Lorentzian stability or physical optical spectrum is claimed. The conditional gauge ratio is a new mathematical join within the specified model, not an independent measurement or a source-native choice of cutoff and geometry. Report regeneration does not reexecute the source certificate.

The [stationary-background continuation](STATIONARY_SPECTRAL_BACKGROUND_AND_COUPLED_RESPONSE.md) adds the [nonzero matrix and photon report](../../../evidence/data/stationary-spectral-background-v1.json). It remains in the periodic-Maxwell comparison family. The existing claim-1567 reduced-vacuum verifier was executed and passed on 8 November 2026; the report embeds a labelled summary, not a byte-for-byte stdout receipt. That reduced E6 result does not supply the comparison's stabilizer or physical field identification.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-stationary-spectral-background.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_stationary_spectral_background.py
```

The new verifier checks eighteen stationary backgrounds, directly integrates the massive four-dimensional bubble, reconstructs all nine scalar quadratic directions from random complex Hermitian fields, retains four mixed-sign orbit zero modes, checks transverse gauge positivity and the exact Gaussian gauge identity, and tests nonlinear constant-matrix energy comparisons. Analytic positivity covers all Euclidean momenta in the stated class; the saved grid is not the sole stability argument. Nonconstant nonlinear global stability, first-order branches, charged/noncentral gauge or gravitational blocks, Lorentzian residues and physical source/contact matching remain open. An initial verification invocation preceded completion of the generator and found no report file; verification was rerun successfully after generation completed. This execution-order failure has no mathematical status. Regeneration does not rerun the embedded source certificate or create independent physical evidence.

The [noncentral/competing continuation](NONCENTRAL_AND_COMPETING_INTERACTION_GATE.md) adds the [full gauge/scalar and helical-control report](../../../evidence/data/noncentral-competing-sector-v1.json) and [two archived source-check executions](../../../evidence/data/noncentral-competing-source-checks-v1.json), both passed on 8 November 2026. The source certificates, gauge extension and helicity comparison remain in the periodic-Maxwell comparison family, with no new independent physical measurement. The source action's gauge-group and anomaly-matching boundaries are preserved.

```powershell
.venv-alpaca/Scripts/python.exe scripts/audit-noncentral-competing-sector.py
.venv-alpaca/Scripts/python.exe verification/verify/verify_noncentral_competing_sector.py
```

The verifier independently integrates the noncentral transverse orbital/spin bubble and seagull, compares the full forty-five eigenvalues with analytic channels, retains all nine gauge nulls and checks the longitudinal square. For the separately supplied helical functional it verifies the exact band edges, stable endpoints, Fourier curl eigenfield and nonlinear square-completion identity. Static saturation holds in the declared periodic divergence-free class with a compatible wave number; no dynamical UV completion, physical photon source or source-native competing coefficient is claimed. The Gaussian gauge extension is also supplied and is not an admitted enlargement of the corpus carrier. The report generator preserves source execution outputs without rerunning those certificates.
