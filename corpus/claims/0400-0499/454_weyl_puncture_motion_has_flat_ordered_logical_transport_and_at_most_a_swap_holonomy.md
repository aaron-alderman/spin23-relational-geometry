# Weyl Puncture Motion Has Flat Ordered Logical Transport and at Most a Swap Holonomy

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10, B11 and B14  
**Claim status:** exact exhaustive (W(D_5)) groupoid calculation

## 1. Question

The visible pointwise Weyl stabilizer of a fixed puncture pair acts trivially on logical phase space. A possible escape was to let the punctures move: perhaps transport among different two-boundary codes could acquire nontrivial holonomy and generate logical symplectic mixing.

The full \(D_5\) Weyl group can be tested exhaustively. The result is negative for pure Weyl transport.

## 2. Full Weyl group

The Weyl group of \(SO(10)\) consists of permutations of five coordinates together with an even number of sign flips:

\[
W(D_5)\cong (\mathbb Z_2)^4\rtimes S_5,
\]

with order

\[
16\cdot120=1920.
\]

It acts transitively on the sixteen even-parity spinor weights.

## 3. Two orbits of ordered puncture pairs

Distinct even-parity sign weights differ in either two or four coordinates. Accordingly, the 240 ordered pairs split into exactly two Weyl orbits:

| Hamming separation | ordered pairs | pointwise stabilizer | setwise stabilizer |
|---:|---:|---:|---:|
| 2 | 160 | 12 | 24 |
| 4 | 80 | 24 | 48 |

For \((\nu^c,e^c)\), the separation is two and the pointwise stabilizer is the previously identified \(S_3\times S_2\).

The two orbit types cannot be connected by Weyl motion because the group preserves the spinor-weight inner product.

## 4. Canonical transport of ordered evaluations

For an ordered puncture pair \((q_a,q_b)\), the logical-\(X\) coordinates are the evaluations

\[
\bigl(q_a\cdot t,q_b\cdot t\bigr).
\]

A signed permutation \(g\) is orthogonal. Transporting both punctures and the charge parameter gives

\[
\bigl((gq_a)\cdot(gt),(gq_b)\cdot(gt)\bigr)
=
\bigl(q_a\cdot t,q_b\cdot t\bigr).
\]

Thus the canonical map between the ordered logical fibers is identity in their puncture-labelled coordinates.

Every closed loop returning to the same ordered pair lies in the pointwise stabilizer and has trivial logical transport.

## 5. Unordered boundaries give only a swap

The setwise stabilizer is twice the pointwise stabilizer in both pair orbits. Its additional elements interchange the two punctures.

If the boundary is treated as unordered, the only possible nontrivial holonomy is therefore

\[
(x_1,x_2)\longmapsto(x_2,x_1).
\]

On the full logical symplectic space this extends to the simultaneous swap

\[
(X_1,X_2,Z_1,Z_2)
\longmapsto
(X_2,X_1,Z_2,Z_1).
\]

The pure Weyl groupoid supplies neither a Fourier exchange of \(X\) and \(Z\), nor a symplectic shear, nor the general mixing needed for \(Sp(4,\mathbb F_p)\).

## 6. Exact no-go

The proposed source-derived mechanism

\[
\text{move punctures by }W(D_5)
\longrightarrow
\text{nontrivial logical }Sp(4)\text{ holonomy}
\]

fails. More precisely,

\[
\boxed{
\text{ordered Weyl puncture transport is flat; unordered transport has holonomy at most }S_2.
}
\]

This is independent of the earlier Hamming-weight obstruction and applies before asking whether the motion is physically local.

## 7. What can still generate logical mixing

The failure isolates the missing ingredients. A nontrivial puncture/deformation connection must include something beyond simultaneous Weyl transport:

1. a change of polarization exchanging \(X\) and \(Z\);
2. measurement or gauge-fixing maps between different stabilizer presentations;
3. non-Weyl automorphisms of the code lattice;
4. braid or mapping-class operations acting on boundary conditions rather than just weight labels;
5. a transfer kernel with nontrivial path-dependent sewing.

These are precisely the kinds of relational operations that could possess a continuum response interpretation.

## 8. Relation to the (3+2) flag

The \((\nu^c,e^c)\) boundary remains important: its pointwise stabilizer selects the Standard-Model \(3+2\) flag. What fails is not flag selection but logical dynamics.

The distinction is now sharp:

\[
\text{puncture geometry selects the internal flag},
\qquad
\text{additional duality/sewing data must generate phase-space motion}.
\]

## 9. Branch decision

- **Closed:** exhaustive order-1920 Weyl action on all ordered puncture pairs.
- **Closed:** exactly two pair orbits, of sizes 160 and 80.
- **Closed:** pointwise stabilizer sizes 12 and 24; setwise sizes 24 and 48.
- **Closed:** ordered evaluation transport is identity along every Weyl arrow.
- **Closed:** unordered holonomy is at most the logical-coordinate swap.
- **Open:** non-Weyl deformation and polarization-changing maps.
- **Open:** braid/mapping-class or transfer-kernel holonomy.
- **Open:** a physical gauge-neutral boundary interpretation.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** a natural non-Weyl boundary move supplies Fourier and shear generators and lifts compatibly across primes.

**Weyl-holonomy falsifier:** a closed ordered Weyl path is claimed to mix logical evaluations despite orthogonality and fixed endpoint labels.

**Orbit falsifier:** a proposed Weyl move connects puncture pairs of Hamming separations two and four.

**Continuum trigger:** the required non-Weyl move is independently identified with a positive transfer or Jordan fractional-linear transformation.

## 11. Certificate

The [Weyl puncture-groupoid certificate](../../../verification/verify/verify_weyl_puncture_motion_groupoid_has_only_identity_or_swap_logical_transport.mjs) enumerates all 1920 signed permutations, all 240 ordered weight pairs, both orbit and stabilizer types, and verifies the evaluation transport identities over \(\mathbb F_3\).

## Companion documents

- [Two-puncture Weyl stabilizer](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
- [Full generic encoded Clifford lift](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Logical-weight transversal obstruction](453_logical_weight_stratification_proves_full_sp4_cannot_be_a_support_preserving_transversal_symmetry.md)
- [Open-branch research method](../0000-0099/32_open_branch_research_method.md)
