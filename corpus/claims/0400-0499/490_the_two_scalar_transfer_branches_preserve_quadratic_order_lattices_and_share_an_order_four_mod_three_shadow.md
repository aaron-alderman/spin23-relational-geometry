# The Two Scalar Transfer Branches Preserve Quadratic-Order Lattices and Share an Order-Four Mod-Three Shadow

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10 and B12  
**Claim status:** exact arithmetic transfer-lattice construction; modular partition-function interpretation remains open

## 1. The apparent half-integral problem

The two exact scalar transfer matrices are

\[
T_-=\begin{pmatrix}3&1\\8&3\end{pmatrix},
\qquad
T_+=\begin{pmatrix}\frac32&\frac12\\[2pt]\frac52&\frac32\end{pmatrix}.
\]

The first lies in \(SL(2,\mathbb Z)\), while the second is only rational in the original boundary position/flux basis. This does not mean that the \(K_+\) branch lacks an integral transfer lattice.

For any determinant-one matrix \(T\) with integral trace, the cyclic basis

\[
(v,Tv)
\]

gives the companion action

\[
\begin{pmatrix}0&-1\\1&\operatorname{tr}T\end{pmatrix}
\]

whenever \(v,Tv\) are independent.

## 2. Explicit invariant lattices

Choose \(v=e_1\). The cyclic basis matrices are

\[
B_-=\begin{pmatrix}1&3\\0&8\end{pmatrix},
\qquad
B_+=\begin{pmatrix}1&\frac32\\[2pt]0&\frac52\end{pmatrix}.
\]

Direct conjugation gives

\[
B_-^{-1}T_-B_-=
C_-=\begin{pmatrix}0&-1\\1&6\end{pmatrix},
\]

and

\[
B_+^{-1}T_+B_+=
C_+=\begin{pmatrix}0&-1\\1&3\end{pmatrix}.
\]

Both companion matrices lie in \(SL(2,\mathbb Z)\). Thus both transfer branches preserve explicit rank-two lattices; they simply use different embeddings into the rational boundary phase space.

## 3. Quadratic-order discriminants

The characteristic polynomials are

\[
\lambda^2-6\lambda+1
\]

and

\[
\lambda^2-3\lambda+1.
\]

Their discriminants are

\[
\Delta_-=6^2-4=32,
\qquad
\Delta_+=3^2-4=5.
\]

Accordingly:

- the \(K_-\) transfer is a norm-one unit in a quadratic order of discriminant \(32\) inside \(\mathbb Q(\sqrt2)\);
- the \(K_+\) transfer is a norm-one unit in the maximal order of discriminant \(5\) inside \(\mathbb Q(\sqrt5)\).

Repeated interval sewing is multiplication by powers of these units. Cayley–Hamilton gives integral recurrences

\[
C_\pm^{n+2}
=(\operatorname{tr}C_\pm)C_\pm^{n+1}-C_\pm^n,
\]

so every sewn transfer remains integral in its adapted lattice.

## 4. Common reduction modulo three

Both companion matrices reduce to

\[
\overline C_-=overline C_+
=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
\in SL(2,\mathbb F_3).
\]

This matrix satisfies

\[
\overline C_\pm^2=-I,
\qquad
\overline C_\pm^4=I.
\]

It is the order-four finite symplectic quarter-turn underlying the one-qutrit Fourier operation. Hence the two arithmetically inequivalent real transfers share the same finite Fourier shadow, just as their response shears share the same mutual Clifford shadow.

The finite theory is losing two kinds of information:

1. Jordan determinant and quadratic field;
2. hyperbolic rapidity and integral transfer lattice.

## 5. Relation to the modular branch

This result supplies genuine arithmetic dynamics:

\[
\text{interval sewing}
\longrightarrow
\text{quadratic-unit powers}
\longrightarrow
SL(2,\mathbb Z)
\longrightarrow
SL(2,\mathbb F_3).
\]

It does not yet supply a modular partition function, genus-two automorphic form or Moonshine module. The appearance of discriminants five and thirty-two is completely explained by the two transfer traces and should not be promoted beyond that evidence.

## 6. Claim ledger

- **Exact:** both transfer matrices preserve explicit integral lattices.
- **Exact:** the adapted matrices have traces six and three and discriminants thirty-two and five.
- **Exact:** every sewing power obeys an integral second-order recurrence.
- **Exact:** both adapted transfers reduce to the same order-four matrix modulo three.
- **Exact:** the common finite reduction forgets the distinct quadratic orders.
- **Candidate bridge:** these rank-two transfer lattices embed as handle sublattices of the genus-two \(Sp(4,\mathbb Z)\) carrier.
- **Open:** a partition function, mapping-class anomaly and physical selection of one quadratic order.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the same quadratic order controls both a source-derived weak/Higgs transfer kernel and the genus-two Weil state space, fixing the lift across finite, integral and real levels.

**Modular trigger:** sewing the two handle transfers produces a genus-two partition function transforming under the certified \(Sp(4,\mathbb Z)\) action.

**Integrality falsifier:** half-integrality of \(T_+\) in the original basis is used to deny the explicit invariant lattice.

**Arithmetic falsifier:** equal mod-three reductions are used to identify the discriminant-five and discriminant-thirty-two orders.

**Moonshine falsifier:** quadratic-unit recurrences are called Moonshine without a graded module or modular function.

## 8. Certificate

The [quadratic-order transfer certificate](../../../verification/verify/verify_scalar_lift_transfers_preserve_quadratic_order_lattices_and_reduce_to_order_four.mjs) constructs both cyclic bases, verifies integral companion actions, computes discriminants and checks the common order-four reduction and sewing recurrence.

## Companion documents

- [Exact scalar boundary realizations](489_both_positive_code_lifts_are_exact_scalar_interval_boundary_hessians_with_quadratic_unit_rapidities.md)
- [Scalar network subdivision invariants](../0000-0099/66_scalar_network_subdivision_invariants.md)
- [Genus-two Weil/code equivalence](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Braid congruence finite shadows](../0100-0199/140_braid_congruence_reductions_and_finite_shadows.md)
