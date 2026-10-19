# The Fourier and Handle Forms Define a Split-Quaternionic Bi-Symplectic Recursion with an Index-Four Eigenlattice Seam

**Date:** 18 October 2026  
**Branches:** pairing switch, bi-Hamiltonian recursion, split quaternions, two faces, and index-four saturation  
**Claim status:** exact constructive bridge; equality with the selected physical saturation remains open  
**Certificate:** [derive_the_bisymplectic_recursion_and_its_index_four_eigenlattice_seam.mjs](scripts/derive_the_bisymplectic_recursion_and_its_index_four_eigenlattice_seam.mjs)

## Executive result

The two-pairing obstruction of document 980 has a canonical mathematical bridge. Let $\Omega$ be the Fourier form and $J$ the handle-eigenspace form. Their relative recursion operator is

\[
R=\Omega^{-1}J.
\]

It satisfies

\[
R^2=I.
\]

For the common graded complex structure $G$,

\[
G^2=-I,
\qquad
RG=-GR.
\]

Consequently $K=GR$ also satisfies $K^2=I$. The triple $(G,R,K)$ is split-quaternionic, or para-hypercomplex.

The two eigenspaces of $R$ are real symplectic two-planes exchanged by $G$. Their integral eigenlattices do not sum primitively inside the ambient lattice: the combined eigenbasis has determinant four and Smith invariants

\[
(1,1,2,2).
\]

Thus

\[
\boxed{
\mathbb Z^4/(\Lambda_+\oplus\Lambda_-)
\cong C_2\oplus C_2.
}
\]

The pairing switch itself therefore produces an index-four seam of exactly the same Smith type as the earlier sideband/selector saturation.

## 1. Explicit recursion

In the Fourier coordinates,

\[
R=
\begin{pmatrix}
0&0&0&-1\\
0&0&1&0\\
0&1&0&0\\
-1&0&0&0
\end{pmatrix}.
\]

It is self-adjoint with respect to $\Omega$:

\[
R^T\Omega=\Omega R,
\]

and reproduces the second form:

\[
J=\Omega R.
\]

The form pencil is

\[
J-\lambda\Omega
=\Omega(R-\lambda I),
\]

with determinant

\[
\det(J-\lambda\Omega)=(1-\lambda^2)^2.
\]

It degenerates precisely at the two faces $\lambda=\pm1$.

## 2. Two symplectic faces

Integral bases for the eigenspaces are

\[
E_+=
\begin{pmatrix}
1&0\\0&1\\0&1\\-1&0
\end{pmatrix},
\qquad
E_-=
\begin{pmatrix}
1&0\\0&1\\0&-1\\1&0
\end{pmatrix}.
\]

Their Fourier-form restrictions are

\[
E_+^T\Omega E_+=2\varepsilon,
\qquad
E_-^T\Omega E_-=-2\varepsilon,
\qquad
E_+^T\Omega E_-=0.
\]

Hence they are symplectic, not Lagrangian, faces with opposite orientation and doubled primitive area. The graded operator exchanges them:

\[
GE_+=E_-\varepsilon.
\]

This is an exact realization of one carrier with two oppositely oriented faces and a quarter-turn exchanging them.

## 3. Compatible Poisson pair

The inverse bivectors of $\Omega$ and $J$ are constant. Their Schouten bracket therefore vanishes, so every linear combination is Poisson. The recursion operator is constant and has zero Nijenhuis torsion.

Thus the two forms constitute a compatible constant bi-Hamiltonian pair. This does not yet supply a Hamiltonian or field equation, but it removes the algebraic incompatibility: the two pairings coexist as a pencil rather than being falsely identified.

## 4. Origin of the index four

Let

\[
E=(E_+\;E_-).
\]

Then

\[
|\det E|=4.
\]

Equivalently, the eigenprojectors

\[
P_\pm=\frac{I\pm R}{2}
\]

are genuinely half-integral on the ambient lattice. The two face lattices become independent only after adjoining two half-directions.

This supplies a structural origin for an index-four seam directly from the relative pairing recursion. It is stronger than a numerical coincidence because the quotient has the same $C_2^2$ Smith type.

It is not yet proved that this eigenlattice is the exact $W_P$ saturation selected in documents 953–954. The displayed coordinate lattices are not equal without an additional intertwiner. The proved statement is equality of index and Smith class, plus a canonical construction from the two forms.

## 5. Consequences for the narrative

The central chain can now be written without collapsing typings:

\[
(\Omega,G)
\xleftrightarrow{\;R=\Omega^{-1}J\;}
(J,G),
\]

where

- $G$ gives the Lorentz split in the Fourier typing;
- $G$ gives the coherent handle in the $J$ typing;
- $R$ records which pairing is active;
- the $R$ faces have opposite symplectic orientation;
- $G$ exchanges those faces;
- the integral face decomposition carries an index-four seam.

This is the most literal realization so far of “one carrier, two faces, one twist.”

## 6. Stop-everything tests

**Bi-symplectic trigger — passed:** the two forms define a compatible constant Poisson pair with involutive recursion.

**Split-quaternionic trigger — passed:** $G^2=-I$, $R^2=K^2=I$, and $RG=-GR$.

**Saturation-identification trigger:** construct an integral/rational typed intertwiner carrying $\Lambda_+\oplus\Lambda_-$ to the selected sideband sublattice or its saturated dual while preserving the relevant operators.

**Dynamics trigger:** derive a Hamiltonian flow or action whose recursion operator is $R$ and whose chart change activates the two roles of $G$.

**Equality falsifier:** matching index four and Smith class is presented as literal lattice equality without the required intertwiner.

## Verdict

| Question | Verdict |
|---|---|
| Do the two forms admit a canonical recursion operator? | **Yes** |
| Is it an involution? | **Yes** |
| Does it anticommute with the graded complex structure? | **Yes** |
| What structure results? | **Split-quaternionic/para-hypercomplex** |
| Are the two recursion faces symplectic? | **Yes, with opposite orientations** |
| What is their integral seam? | **Index four, quotient $C_2^2$** |
| Is it proved identical to the selected saturation? | **No; only the Smith class presently matches** |

## Position in the corpus

- [two-pairing obstruction](980_the_lorentz_6_plus_4_split_and_the_coherent_handle_lift_are_two_pairing_dependent_roles_not_one_fixed_symplectic_typing.md)
- [index-four selected saturation](953_an_index_four_saturation_turns_the_realified_twist_into_the_primitive_selector_handle_but_fifteen_symplectic_saturations_compete.md)
- [two-chart Jordan/Hopf atlas](966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md)
- [graded quaternionic interface](969_the_graded_sideband_interface_preserves_pfaffian_alignment_and_is_a_quaternionic_antiunitary_with_square_minus_identity.md)
