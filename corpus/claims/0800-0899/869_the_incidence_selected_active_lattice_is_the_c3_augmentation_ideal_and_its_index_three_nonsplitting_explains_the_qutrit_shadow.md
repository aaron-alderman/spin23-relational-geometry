# The Incidence-Selected Active Lattice Is the \(C_3\) Augmentation Ideal, and Its Index-Three Nonsplitting Explains the Qutrit Shadow

**Date:** 17 October 2026  
**Branches:** color local coefficients, integral representation theory, qutrit reduction, Furey incidence, and active handle mode  
**Claim status:** exact integral-module identification; topological embedding across matter sectors remains conditional  
**Certificate:** [identify_incidence_selected_lattice_with_the_c3_augmentation_ideal.mjs](../../../verification/identify/identify_incidence_selected_lattice_with_the_c3_augmentation_ideal.mjs)

## Executive result

The incidence-selected active lattice is integrally isomorphic to the augmentation ideal of the color-cycle group ring:

\[
\boxed{
L_{\rm inc}
\cong_{\mathbb Z[C_3]}
\ker\!\left(\epsilon:\mathbb Z[C_3]\to\mathbb Z\right).
}
\]

This gives the active plane a canonical algebraic and topological interpretation: it is the zero-sum local-coefficient module of a three-sheet color cover.

The invariant singlet plus augmentation ideal fail to split the group ring integrally by index three. This explains three facts simultaneously:

1. the rational selector requires division by three;
2. the initial selected column lattice required one index-three saturation;
3. reduction modulo three produces a nonsemisimple \(J_2\) block.

## 1. Augmentation ideal

Let

\[
\mathbb Z[C_3]
=\mathbb Z\{1,g,g^2\},
\qquad g^3=1.
\]

The augmentation map is

\[
\epsilon(a_0+a_1g+a_2g^2)=a_0+a_1+a_2.
\]

Its kernel has basis

\[
b_1=1-g,
\qquad
b_2=g-g^2.
\]

Multiplication by \(g\) acts by

\[
A=
\begin{pmatrix}
0&-1\\
1&-1
\end{pmatrix}.
\]

This is exactly the active handle block.

## 2. Integral identification with the selected code lattice

The incidence-selected lattice carries

\[
C=
\begin{pmatrix}
1&3\\
-1&-2
\end{pmatrix}.
\]

For

\[
X=
\begin{pmatrix}
1&1\\
0&-1
\end{pmatrix},
\qquad
\det X=-1,
\]

one has

\[
CX=XA.
\]

Since \(X\in GL(2,\mathbb Z)\), this is an integral module isomorphism, not a rational approximation.

## 3. The index-three nonsplitting

The invariant vector in the group ring is

\[
s=1+g+g^2.
\]

The three vectors \((s,b_1,b_2)\) span a sublattice of determinant three:

\[
\left|
\det
\begin{pmatrix}
1&1&0\\
1&-1&1\\
1&0&-1
\end{pmatrix}
\right|=3.
\]

Therefore

\[
\mathbb Zs\oplus\ker\epsilon
\subset\mathbb Z[C_3]
\]

has index three. The permutation lattice is not the integral direct sum of its singlet and standard parts.

Over \(\mathbb Q\), the singlet projector is

\[
\frac13(1+g+g^2),
\]

making the source of the denominator explicit.

This exactly mirrors the incidence construction:

- the rational color projector uses \(1/3\);
- the first column lattice in the selected plane had saturation index three;
- saturation recovered the primitive augmentation lattice.

## 4. Characteristic three

Modulo three,

\[
x^2+x+1=(x-1)^2.
\]

On the augmentation ideal,

\[
(A-I)^2=0,
\qquad
\operatorname{rank}(A-I)=1.
\]

Thus

\[
\ker\epsilon\otimes\mathbb F_3
\cong J_2(1).
\]

The qutrit unipotent shadow is not an accidental degeneration. It is forced by the failure of the singlet/augmentation decomposition to split at the prime dividing \(|C_3|\).

## 5. Topological interpretation

For a regular three-sheet cover, the cellular chains carry \(\mathbb Z[C_3]\). The augmentation quotient records the color-averaged sheet, while the augmentation ideal records zero-sum differences among sheets.

Therefore:

- ordinary Furey sector homology sees the augmentation quotient;
- the active handle mode lives in the augmentation ideal;
- a local-coefficient or color-cover refinement can retain both.

This supplies a possible topological definition of the abstract active lattice independent of the response metric.

## 6. What remains selected by incidence

There are four colored Standard-Model triplet orbits, hence four copies of the augmentation ideal before constraints. Gauge neutrality leaves three copies. The abstract augmentation module does not decide which diagonal combination across those sectors is physical.

Furey incidence and Hilbert–Schmidt compression select that embedding:

\[
I^{\oplus3}\longrightarrow L_{\rm inc}\cong I.
\]

Thus the roles are complementary:

- group-ring topology protects the integral module type;
- Furey incidence selects its placement inside matter space.

## 7. Stop-everything and falsification criteria

**Topological trigger:** construct the color-resolved Furey ribbon chain complex and find that its local-coefficient cycle kernel is exactly the embedded \(L_{\rm inc}\), not merely another copy of the augmentation ideal.

**Protection trigger:** show interactions preserve the augmentation kernel even when they rotate the Hilbert–Schmidt spectral projector.

**Sewing trigger:** pair the augmentation cycle with the neutrino complement to recover the unimodular rank-four symplectic lattice and transported \(H\).

**Negative trigger:** color gauge covariance forces tracing over the cover before the response is formed, eliminating the augmentation component.

**Falsifier:** claiming an integral singlet-plus-doublet decomposition of \(\mathbb Z[C_3]\). Its index is three.

## 8. Verdict

The active mode now has a canonical integral identity:

\[
\boxed{
\text{active relationship mode}
=
\text{color augmentation ideal}.
}
\]

This explains both the saturation arithmetic and the characteristic-three behavior. It does not yet make the particular Furey incidence embedding topologically invariant.

## 9. Dependencies

- [ordinary cycle-homology no-go](868_ordinary_furey_cycle_homology_annihilates_the_incidence_selected_color_plane_and_cannot_protect_it.md)
- [integral active-mode bridge](864_the_incidence_selected_code_doublet_is_integrally_conjugate_to_the_active_handle_c3_module.md)
- [three-doublet census](861_the_punctured_generation_code_contains_three_gauge_compatible_color_doublets_and_does_not_select_the_unique_handle_environment.md)

