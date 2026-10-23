# The Complete Two-Mode Surrogate Closes Every Low-Energy Shortcut to the Stabilized Vacuum

**Date:** 23 October 2026

**Status:** global-exhaustion certificate after general quadratic mixing

**Depends on:** [the two-mode mixing theorem](1757_healthy_axion_torsion_mixing_preserves_only_a_total_residue_norm_not_the_pgt_pole_coupling.md) and [the concrete compactification checkpoint](1756_three_generation_topology_succeeds_but_the_stabilized_torsional_vacuum_is_the_irreducible_missing_input.md)

**Evidence:** [path ledger](../../../evidence/data/spin23-new-model-path-selection-v5.json), [path note](../../programmes/closure/spin23-gravity-route/global-path-selection-v17.md), and [verifier](../../../verification/verify/verify_spin23_new_model_path_selection_v5.mjs)

## Result

The entire healthy quadratic low-energy image of a stabilized heterotic
axion mixed with the PGT \(0^-\) mode is parameterized by \((K,M^2,g)\).
Canonicalization and diagonalization determine the poles exactly.  They yield
one basis-independent source norm,

\[
 \sum_i h_i^2=g^TK^{-1}g,
\]

but no basis-independent rule assigning a prescribed fraction of that norm
to the PGT-like pole.  A finite family with fixed positive masses and fixed
source norm contains light-pole couplings \(0\), \(1/8\), and \(1/4\).

This eliminates every shortcut based only on:

- positive kinetic energy;
- absence of tachyons;
- a fixed pair of pole masses;
- orthogonality of the mass rotation;
- the three-generation chiral index; or
- the existence of a torsion or axion label before diagonalization.

The microscopic stabilized vacuum is needed precisely because it calculates
\(K\), \(M^2\), and \(g\).  Without those matrices, choosing the pole coupling
is choosing a mixing angle.  The alternative fixed-point path remains at its
independent complete-beta-and-matching boundary.

## Verdict

\[
 \boxed{
 \text{healthy two-mode EFT data admit }1/8
 \text{ but do not select it.}
 }
\]

No further low-energy algebra can recover the missing microscopic number.
Continuation now means performing a genuine stabilized compactification or a
genuine nonperturbative quantum-gravity calculation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_new_model_path_selection_v5.mjs
~~~
