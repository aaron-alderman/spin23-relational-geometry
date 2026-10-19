# Shared Left Geometry Links Flux Phases to Magnitude Cross-Ratios

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B07, B08, B09 and B11  
**Claim status:** exact two-dimensional equal-width relation and parameter audit; extraction from basis-invariant quark data remains open

## 1. The shared-doublet constraint

Up and down Yukawa matrices do not have independent left localization centers. Both couple to the same three quark doublets \(Q_i\). This shared geometry creates a relation between their magnitude and flux-phase plaquettes.

Let the two independent displacement rows be collected into matrices

\[
A=
\begin{pmatrix}
(a_1-a_0)^T\\
(a_2-a_0)^T
\end{pmatrix},
\quad
B_u=
\begin{pmatrix}
(b^u_1-b^u_0)^T\\
(b^u_2-b^u_0)^T
\end{pmatrix},
\quad
B_d=
\begin{pmatrix}
(b^d_1-b^d_0)^T\\
(b^d_2-b^d_0)^T
\end{pmatrix}.
\]

For nondegenerate two-dimensional geometry, these are invertible \(2\times2\) matrices.

## 2. Magnitude and phase matrices

The logarithmic mixed-difference matrices are

\[
C_u=\frac1{2\sigma^2}AB_u^T,
\qquad
C_d=\frac1{2\sigma^2}AB_d^T.
\]

Let

\[
J=
\begin{pmatrix}
0&1\\
-1&0
\end{pmatrix}
\]

encode the oriented area form. The Wilson plaquette matrices are

\[
P_u=\kappa AJB_u^T,
\qquad
P_d=\kappa AJB_d^T.
\]

## 3. Exact cross-sector identity

Eliminating the right-handed displacement matrices gives

\[
\boxed{
P_uC_u^{-1}
=P_dC_d^{-1}
=2\kappa\sigma^2AJA^{-1}.}
\]

Calling the common matrix \(M\), similarity to \(J\) implies

\[
\boxed{
\operatorname{tr}M=0,
\qquad
M^2=-(2\kappa\sigma^2)^2I,
\qquad
\det M=(2\kappa\sigma^2)^2.}
\]

This links hierarchy magnitudes and CP-oriented plaquettes across the up and down sectors. It is stronger than treating their flux phases independently.

## 4. Parameter count remains unfavorable

Three left, three up-right and three down-right points in two dimensions contain 18 real coordinates. Removing:

- two common translations;
- one common rotation;
- one simultaneous coordinate/width rescaling;

leaves 14 dimensionless shape parameters. Adding two overall Yukawa scales and one dimensionless flux strength gives

\[
\boxed{17\ \text{generic continuous parameters}.}
\]

The quark sector has ten physical flavor observables:

\[
6\ \text{masses}
+3\ \text{mixing angles}
+1\ \text{CP phase}.
\]

Generic free point geometry is therefore not a predictive quark-flavor model despite the exact matrix identity. Additional Furey, lattice, symmetry or dynamical constraints on the centers are indispensable.

## 5. Preferred-basis caveat

The entrywise magnitude and plaquette matrices are invariant under row and column **rephasings**, but not under arbitrary weak-basis unitary rotations. Localization selects a preferred basis only if the transverse Hamiltonian has individually identifiable profile eigenstates.

To turn the cross-sector identity into a physical observable one must:

1. derive the localization basis from a source Hamiltonian;
2. show that its residual ambiguity is only permutations and phases;
3. map the physical quark data into that basis;
4. test the common-matrix identity without refitting arbitrary rotations.

Without this step, the identity is a model-coordinate relation rather than a basis-independent Standard-Model prediction.

## 6. Degenerate cases

If \(C_u\) or \(C_d\) is singular, the inverse formula is replaced by a common-image/pseudoinverse condition. Geometrically this means one set of displacements is collinear or has lower effective dimension.

Such degeneracy may be informative—rank one returns to the one-dimensional branch—but it must not be hidden by an unstable inverse.

## 7. Stop-everything and falsification gates

**Shared-geometry trigger:** a source-derived localization basis yields invertible \(C_u,C_d\) and satisfies the same traceless complex-structure matrix \(P_fC_f^{-1}\) in both sectors.

**Parameter-reduction trigger:** Furey/Jordan or discrete geometry reduces the 14 shape parameters below the number of independent flavor observables.

**Dimension trigger:** the common matrix squares to a negative scalar and independently identifies the same oriented two-plane as another Spin\((2,3)\) branch.

**Falsifier:** up and down sectors require different \(P_fC_f^{-1}\) after all source-derived uncertainties are included, or arbitrary weak-basis rotations are used to manufacture agreement.

## 8. Certificate

The [shared-left flux/magnitude certificate](../../../verification/verify/verify_shared_left_flux_magnitude_relation.mjs) constructs explicit nondegenerate up/down geometries, verifies the common-matrix identity and complex-structure square, and audits the generic 17-to-10 parameter surplus.

## Companion documents

- [Transverse-flux flavor CP](247_transverse_flux_generates_flavor_cp_without_changing_overlap_magnitudes.md)
- [Localization rank and dimension](245_logarithmic_yukawa_rank_counts_dimensions_only_when_widths_are_universal.md)
- [Gaussian localization identifiability](244_gaussian_localization_is_predictive_only_after_seed_yukawas_are_constrained.md)
- [Furey cyclic Yukawa topology](../0100-0199/111_furey_cyclic_yukawa_topology_selection.md)
