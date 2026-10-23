# Local Supersymmetry Fails as a Selector and String Normalization Is the Next Model Branch

**Date:** 23 October 2026

**Status:** nonterminal new-model path-selection checkpoint

**Depends on:** [the N=1 supergravity audit](1751_n1_local_supersymmetry_organizes_but_does_not_fix_the_axial_torsion_coupling.md)

**Evidence:** [new-model path ledger](../../../evidence/data/spin23-new-model-path-selection-v2.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v14.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v2.mjs)

## Result

Local supersymmetry fails the coefficient-selection test for two independent
reasons.  Its linear multiplet has the wrong transverse kinematics, while its
chiral embedding admits a continuous supersymmetric Kähler deformation.  Both
embeddings change the spectrum, and broken supersymmetry reopens thresholds.

The next selected new-model branch is therefore a specific string or
higher-dimensional construction.  Unlike generic supersymmetry, such a parent
can contain quantized levels, fluxes or charges that normalize a torsionful
connection.  The decisive test is whether dimensional reduction preserves that
normalization or converts it into a moduli-dependent mixing angle and whether
the resulting four-dimensional mode is the same longitudinal \(0^-\) torsion
pole.

No claim of string selection is made yet.  The branch is selected because it
is the remaining locally researchable mechanism with genuinely discrete UV
data; the nonperturbative fixed-point route still requires its missing
quantization packet.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v2.mjs
~~~
