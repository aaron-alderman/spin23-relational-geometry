# Stone–von Neumann Fixes the Regular Quantum Parent While Index Three Requires Selector Compression

> **Subsequent dynamical realization (claim 1585).** A three-copy Chern-insulator witness realizes the full parent--gap--projector--Toeplitz--index chain with absolute edge index three. Its residual U(3) channel freedom proves that bulk topology protects family count but does not select the Z3 Yukawa frame. See [1585](1585_quantum_hall_bulk_boundary_dynamics_realizes_index_three_but_not_the_z3_flavor_frame.md).

**Date:** 20 October 2026

**Gates:** A1, A2, A4 and A5

**Status:** exact quantum-kinematic bridge and selector boundary; dynamics and physical compression remain open

**Depends on:** [the primitive symplectic Spin(2,3) construction](../0700-0799/745_the_primitive_two_forms_of_a_symplectic_four_space_give_the_genuine_five_dimensional_spin23_module.md) and [the index-three Fredholm carrier](1583_a_third_power_fredholm_shift_gives_an_exact_index_three_z3_family_carrier.md)

**Evidence:** [Stone–von Neumann compression ledger](../../../evidence/data/spin23-stone-von-neumann-selector-compression.json) and [deterministic verifier](../../../verification/verify/verify_spin23_stone_von_neumann_selector_compression.mjs)

## Result

The established four-dimensional symplectic carrier has a canonical
quantum interpretation. Let \((V,\omega)\) be real symplectic four-space.
Its Weyl operators obey

\[
W(v)W(w)=
e^{-i\omega(v,w)/(2\hbar)}W(v+w).
\]

For fixed nonzero central character \(\hbar\), the Stone--von Neumann
theorem states that every irreducible strongly continuous regular
representation of these finite-dimensional Weyl relations is unitarily
equivalent. Thus the programme cannot obtain three families by choosing
three inequivalent regular quantizations of the same finite canonical
carrier.

The same theorem supplies a positive bridge. Every
\(S\in Sp(4,\mathbb R)\) acts by

\[
W(v)\longmapsto W(Sv).
\]

In the unique irreducible representation this automorphism is implemented
unitarily up to phase; passing to the metaplectic cover \(Mp(4,\mathbb R)\)
makes the implementation exact. Since

\[
Sp(4,\mathbb R)\cong Spin_0(2,3),
\]

the programme's Spin(2,3) symmetry has a canonical finite-mode quantum
implementation. This is a kinematic QM bridge, not yet quantum gravity.

## Why the index-three carrier is compatible

Claim 1583 does not evade Stone--von Neumann by postulating an inequivalent
regular CCR representation. It changes the operator category through a
selector compression.

Begin with the bilateral unitary shift \(U\) on \(L^2(S^1)\), whose index
is zero. Choose the Hardy/nonnegative-mode projector \(P_+\) and compress:

\[
T=P_+UP_+,
\qquad B=T^\dagger.
\]

The resulting unilateral operator has a boundary, and

\[
\operatorname{ind}B^3=3.
\]

Therefore

\[
\boxed{
\text{unique regular quantum parent}
+\text{selector/polarization boundary}
\longrightarrow
\text{topological family index}.
}
\]

The nonzero index belongs to the compressed Toeplitz/Fredholm problem, not
to the uncompressed Heisenberg representation.

## The new joining target

This identifies a plausible common role for the Spin(2,3) selector:

1. the symplectic four-space supplies the Heisenberg/Weyl quantum parent;
2. Stone--von Neumann removes arbitrary finite-mode quantization choices;
3. the metaplectic lift implements Spin(2,3)-symplectic transformations;
4. a selected polarization or boundary produces the Fredholm operator;
5. its third-power kernel carries the three E6 families.

The decisive missing theorem is now

\[
P_+\quad\text{derived from Spin(2,3) selector dynamics},
\]

with the compressed Yukawa operators reproducing the Z3 Parseval frame of
claim 1575.

## Scope and failure conditions

Stone--von Neumann does not cover quantum field theory's infinitely many
degrees of freedom, where inequivalent representations occur. It also does
not choose a Hamiltonian, vacuum, gauge constraint, Born rule, E6 carrier
or gravitational action. The bridge fails if the required selector
compression is arbitrary, violates the Weyl/Spin(2,3) covariance needed by
the action, or loses its index under physical perturbations.

The result nevertheless closes one ambiguity: family multiplicity should
not be sought in multiple regular quantizations of the same finite
symplectic carrier. It must enter through topology, boundary conditions,
superselection, or the infinite-field limit.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_stone_von_neumann_selector_compression.mjs
~~~
