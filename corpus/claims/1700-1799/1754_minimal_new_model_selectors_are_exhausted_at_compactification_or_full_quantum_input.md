# Minimal New-Model Selectors Are Exhausted at Compactification or Full Quantum Input

**Date:** 23 October 2026

**Status:** terminal exhaustion certificate for the explicit minimal new-model programme

**Depends on:** [the heterotic normalization audit](1753_heterotic_torsion_normalization_becomes_moduli_dependent_before_reaching_the_pgt_axial_mode.md), [the supersymmetry audit](1751_n1_local_supersymmetry_organizes_but_does_not_fix_the_axial_torsion_coupling.md), and [the gauged-axial completion](1749_a_minimal_gauged_axial_locking_completion_adds_spectrum_but_still_does_not_select_one_eighth.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v3.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v15.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v3.mjs)

## Result

Crossing the old theory boundary did not reveal a hidden minimal selector.
Each explicit enlargement relocates the axial coefficient into new continuous
data:

\[
\begin{array}{c|c}
\text{completion}&\text{surviving continuous datum}\\ \hline
U(1)_A\ \text{locking}&g\rho\\
N=1\ \text{supergravity}&c\ \text{in the Kähler geometry}\\
\text{heterotic reduction}&Z_H^{-1/2}\ \text{and the mode-mixing matrix}
\end{array}
\]

All three also change the target spectrum or field identity.  The gauged model
adds a massive vector and anomaly-completing sector.  Supergravity adds
superpartners.  The heterotic model supplies a two-form/axion whose identification
with the independent PGT connection pole must be derived and whose mass needs an
extra stabilization mechanism.

The two remaining pathways are no longer generic model labels:

1. provide one fully specified compactification—internal geometry, bundle,
   fluxes, stabilized moduli, normalized modes, mixing matrix and thresholds—and
   calculate the four-dimensional coefficient; or
2. supply the complete Spin(2,3) quantization packet and compute its interacting
   fixed point and matched trajectory.

Neither input exists in the repository.  This is therefore the next genuine
global exhaustion point: all minimal locally constructible selector families
have been evaluated, and continuing requires a large external model dataset or
the irreducible quantum calculation already specified.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v3.mjs
~~~
