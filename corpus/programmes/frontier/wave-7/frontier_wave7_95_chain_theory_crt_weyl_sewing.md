# Frontier Wave 7.95: CRT Weyl Sewing of the Binary Record

**Date:** 25 October 2026
**Status:** exact algebraic sewing map; operational identification remains open
**Certificate:** [CRT Weyl sewing verifier](../../../../verification/verify/verify_chain_theory_crt_weyl_sewing.mjs)

**Subsequent implementation:** [Wave 7.103](frontier_wave7_103_cubed_commutator_binary_detector.md) realizes the binary projection by cubing the joint Weyl commutator; [Wave 7.104](frontier_wave7_104_cubed_commutator_dynamics_and_error_budget.md) supplies its phase, visibility and sweep diagnostics.

## Result

The read-order-to-(C_6) map left open in Wave 7.92 exists canonically for
the generalized Pauli/Weyl read algebra.  Let

\[
V_2=\mathbb F_2^2,
\qquad
V_3=\mathbb F_3^2
\]

be the qubit and qutrit displacement-label spaces.  Their Weyl commutators
are controlled by the alternating forms

\[
[u,v]_2\in\mathbb F_2,
\qquad
[a,b]_3\in\mathbb F_3.
\]

The combined commutator bicharacter is

\[
\boxed{
B((u,a),(v,b))
=(-1)^{[u,v]_2}\omega^{[a,b]_3}
=\zeta_6^{,3[u,v]_2+2[a,b]_3}.
}
\]

It takes values in μ₆ and is multiplicative in both arguments.  Applying
the unique binary character from Wave 7.92 gives

\[
\boxed{
\chi(B((u,a),(v,b)))=(-1)^{[u,v]_2}.
}
\]

The entire qutrit symplectic phase cancels because its exponent is even.  The
binary record is therefore exactly the mod-two primary projection of a joint
cross-prime commutator, not a declaration that qutrit operations commute.

## 1. Relation to the existing cross-prime carrier

The corpus already contains the state module

\[
(\mathbb Z_2)^2\oplus(\mathbb Z_3)^2
\cong(\mathbb Z_6)^2
\]

with a quadratic refinement valued in μ₁₂.  The present construction is its
alternating commutator shadow.  Polarization removes the primary quadratic
self-phases and leaves the bilinear value group

\[
\mu_2\times\mu_3\cong\mu_6.
\]

Thus the Chain read-order candidate and the independently built
binary--qutrit phase module meet at the correct categorical level:

\[
\text{quadratic phase module}
\longrightarrow
\text{commutator bicharacter}
\longrightarrow
\text{binary detector character}.
\]

## 2. Why exactly three extra records survive

The three nonidentity points of (V_2) label the three Pauli directions.
Every two distinct nonzero points have symplectic product one.  There are

\[
\binom32=3
\]

unordered pairs, and all three map to the detector value −1.

The eight nonidentity points of (V_3) label the eight qutrit Weyl
directions.  Their ordered commutators can have phases ω or ω², but the binary
character sends both to (+1).  Hence the extra phase-record count is three,
while all eight qutrit directions remain available to the ordinary-product
and Jordan sectors.

This reconstructs the target census

\[
169+3=172
\]

from a finite Heisenberg operation rather than from a Lie-bracket rank rule.

## 3. What this closes

Conditioned on Weyl operations as the read primitives, the following pieces
are now exact:

1. the joint phase target μ₆;
2. the multiplicative read-order cocycle;
3. the unique binary compression;
4. the erasure of cubic phase labels;
5. the survival of all three Pauli pair signs.

The algebraic sewing requested by Wave 7.92 is therefore closed for this
operator basis.

## 4. What it does not close

The target's eight qutrit letters are often described as traceless Hermitian
observables, naturally represented by a Gell-Mann basis.  The nonidentity
qutrit Weyl operators also span the traceless complex operator space, but they
are generally unitary rather than Hermitian.  A change of linear basis
preserves dimension; it does not preserve the statement that pairwise
commutators are central phases.

Therefore the remaining operational gate is precise:

\[
\boxed{
\text{Are the reads ordered Weyl operations, or measurements of Hermitian
generators?}
}
\]

The first supports the binary-character theorem.  The second exposes the
full (\mathfrak{su}(3)) bracket and does not by itself yield the target
quotient.  A laboratory protocol must implement controlled operation order
with a phase reference, not merely measure eight qutrit observables.

## 5. Experimental form

Use an ancilla-controlled sequence to compare (W_xW_y) with (W_yW_x).
Run the same protocol on the qubit and qutrit endpoint operations and retain
both:

- a phase-complete interferometric output;
- a deliberately coarse binary output implementing χ.

The predicted table is

| operation pair | phase-complete port | binary port |
|---|---|---|
| distinct Pauli pair | −1 | −1 |
| noncommuting qutrit Weyl pair | ω or ω² | +1 |
| commuting pair | +1 | +1 |

If the coarse port shows qutrit dependence, it is not the character χ.  If
the phase-complete port cannot recover ω and ω², the apparatus has erased the
very information whose quotient is being claimed.

## Verdict

The missing finite sewing map is available: the cross-prime Weyl commutator
lands canonically in μ₆, and its binary primary projection produces exactly
the three extra qubit records and no qutrit phase records.  This substantially
strengthens the backward bridge.  The unresolved step is now operational,
not arithmetic: justify ordered Weyl operations as the physical read
primitive and connect their calibrated record ratio to the photon residue.

## Corpus anchors

- [cross-prime phase module](../../../claims/0500-0599/506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md)
- [odd-prime Heisenberg and mutual qutrit phase](../../../claims/0500-0599/541_odd_prime_heisenberg_conjugacy_restores_the_exchange_symmetry_and_the_qutrit_phase_is_mutual.md)
- [binary record character](frontier_wave7_92_chain_theory_z6_binary_record_character.md)
- [Jordan--Lie record fork](frontier_wave7_85_chain_theory_jordan_lie_record_fork.md)
