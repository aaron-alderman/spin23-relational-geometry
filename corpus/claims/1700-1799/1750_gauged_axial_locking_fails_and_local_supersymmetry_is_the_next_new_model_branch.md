# Gauged Axial Locking Fails and Local Supersymmetry Is the Next New-Model Branch

**Date:** 23 October 2026

**Status:** nonterminal new-model path-selection checkpoint

**Depends on:** [the explicit gauged-axial completion](1749_a_minimal_gauged_axial_locking_completion_adds_spectrum_but_still_does_not_select_one_eighth.md)

**Evidence:** [new-model path ledger](../../../evidence/data/spin23-new-model-path-selection-v1.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v13.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v1.mjs)

## Result

The first explicit theory beyond the old exhaustion boundary fails cleanly.
An axial gauge charge can be quantized, but the induced torsion coupling is
\(gq\rho\), with two continuous factors, and the completion changes both the
spectrum and the low-energy operator basis.

The next selected branch is local supersymmetry because it supplies an actual
local Ward identity capable of relating connection and matter vertices.  The
test is not whether minimal supergravity contains a conventional coefficient;
it is whether every independent supersymmetric invariant that reduces to
\(S_\mu J_5^\mu\) is absent.  If such an invariant exists, supersymmetry again
permits a continuous deformation.  If none exists, the enlarged supergravity
spectrum and symmetry-breaking thresholds must still be audited.

The fixed-point branch remains behind the previously specified complete
quantization packet and is therefore not selected for the next local step.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v1.mjs
~~~
