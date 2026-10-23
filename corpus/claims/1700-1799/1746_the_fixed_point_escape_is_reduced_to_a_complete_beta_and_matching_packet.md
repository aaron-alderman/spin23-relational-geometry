# The Fixed-Point Escape Is Reduced to a Complete Beta and Matching Packet

**Date:** 23 October 2026

**Status:** terminal current-input exhaustion certificate for axial-coefficient fixed-point selection

**Depends on:** [the fixed-point identifiability result](1745_the_known_rg_slice_cannot_identify_an_interacting_one_eighth_axial_fixed_point.md) and [the generic selector exhaustion](1744_conformal_and_topological_selectors_fail_and_only_specific_new_dynamics_can_reopen_torsion_flavor.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-uv-torsion-flavor-path-selection-v11.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v11.md), and [verifier](../../../verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v11.mjs)

## Result

The interacting-fixed-point label does not itself predict the axial torsion
coefficient.  The only available beta function is a zero-gravity restriction,
and it admits mutually incompatible interacting completions.  Fixed points of
the neighboring Immirzi coupling do not fill the missing beta row.

The remaining route is now one indivisible new calculation:

\[
\boxed{
\text{complete beta functional}
\to \text{simultaneous fixed point}
\to \text{full stability matrix}
\to \text{unitarity}
\to \text{threshold-matched }\eta_{\rm IR}.
}
\]

Omitting any arrow fails to establish prediction.  A zero of one beta
component does not give a critical exponent; a fixed point does not by itself
give a unitary Lorentzian theory; and a UV critical surface does not determine
the measured low-energy coefficient without a trajectory and thresholds.

This is global exhaustion for all coefficient-selection operations encoded by
the present action, symmetries, perturbative running and neighboring
fixed-point literature.  It is not a proof that no suitable UV completion
exists.  It is the sharper statement that any further progress must import or
calculate a concrete matter--gravity theory rather than relabel the existing
data.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_uv_torsion_flavor_path_selection_v11.mjs
~~~
