# The Exact Global Z3 Portal Protection Produces a Three-Point Electroweak Orbit and a Domain-Wall Gate

> **Subsequent gauge-quotient refinement (claim 1582).** A single nonzero portal doublet has a Z3 phase that can be compensated by hypercharge. Genuine gauge-distinct breaking is detected when both opposite-hypercharge doublets have nonzero gauge-invariant product; its first pure Z3 phase-locking power is dimension six. See [1582](1582_the_electroweak_gauge_quotient_makes_z3_breaking_depend_on_two_doublet_support.md).

**Date:** 20 October 2026

**Gates:** A5, A6 and A8

**Status:** exact stabilizer/orbit theorem; cosmological completion remains open

**Depends on:** [the residual Z3 three-family construction](1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md)

**Evidence:** [electroweak domain-wall ledger](../../../evidence/data/spin23-e6-z3-electroweak-domain-wall-gate.json) and [deterministic verifier](../../../verification/verify/verify_spin23_e6_z3_electroweak_domain_wall_gate.mjs)

## Result

The same exact global \(Z_3\) that protects the portal through the E6
matching regime creates a sharp cosmological gate when the portal
bidoublet condenses.

Write charges additively modulo three:

\[
q(S_0)=q(27_H)=0,
\qquad q(S_1)=2.
\]

The high-scale singlet VEVs are neutral and preserve all of \(Z_3\).  For
a nonzero electroweak VEV \(\langle S_1\rangle\), a group element \(k\)
fixes the vacuum only if

\[
2k=0\pmod3.
\]

Because \(\gcd(2,3)=1\), only \(k=0\) survives. The stabilizer is trivial
and the symmetry orbit contains three degenerate points. If the complete
scalar potential makes those points isolated connected components modulo
gauge, then

\[
\boxed{\pi_0(\mathcal V)\supset Z_3}
\]

and stable domain walls are expected.

Charge data alone do not prove disconnectedness: an accidental continuous
vacuum manifold could connect the three images, and a gauged Z3 could
identify them. The exact theorem here is the trivial stabilizer and
three-point orbit; topology of the full vacuum is the next scalar-potential
calculation.

This does not invalidate the high-scale Ward protection proved in claim
1575.  It proves that the symmetry-breaking history is part of the model,
not an optional cosmological appendix.

## Finite escape classification

Four routes remain, each with a new cost:

1. **Discrete gauge Z3.**  The three representatives may be gauge
   equivalent, but discrete anomalies and the resulting defect spectrum
   must be calculated.
2. **Breaking before or during inflation.**  Walls can be inflated away
   only if reheating does not restore the symmetry.
3. **Soft explicit breaking.**  A vacuum bias removes stable walls but the
   same breaking can regenerate forbidden portal-mixing operators; their
   magnitude must be bounded.
4. **A different order parameter.**  The present charge-two VEV has no
   nontrivial residual subgroup, so this route changes the construction.

The immediate quantitative target is a joint interval: explicit breaking
large enough to remove walls early, yet small enough that induced
\(S_0^\dagger S_1\) and \(H_{27}^\dagger H_{S_1}\) mixing remains below the
portal-alignment tolerance.

## Topological significance

This is the first direct topological gate of the positive E6 frame
construction. The family cycle is not merely combinatorial: once its
charged scalar condenses, it forces a nontrivial degenerate orbit whose
connectedness must be decided by the full vacuum. Any proposed Spin(2,3) topological completion must therefore
explain whether the Z3 is global, gauged, emergent, or only an approximate
remnant of a connected parent.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_e6_z3_electroweak_domain_wall_gate.mjs
~~~
