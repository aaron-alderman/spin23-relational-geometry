# Positive Response, Unit Self-Shears and Boundary Legendre Duality Supply the Standard (Sp(4,mathbb Z)) Generators

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact generator identities plus standard elementary-symplectic generation theorem; physical availability and normalization of the boundary operations remain conditional

## 1. From one arithmetic generator to the full group

The positive scalar response supplied

\[
\mathcal S_X=
\begin{pmatrix}I&0\\X&I\end{pmatrix},
\qquad
X=
\begin{pmatrix}2&-1\\-1&2\end{pmatrix},
\]

as an element of \(Sp(4,\mathbb Z)\). One generator is not yet an arithmetic symmetry group.

The next question is whether natural one-port boundary operations complete it to the standard elementary generators of \(Sp(4,\mathbb Z)\).

They do.

## 2. Unit self-shears

Introduce the two integral one-face boundary terms

\[
E_{11}=
\begin{pmatrix}1&0\\0&0\end{pmatrix},
\qquad
E_{22}=
\begin{pmatrix}0&0\\0&1\end{pmatrix}.
\]

Their canonical shears are

\[
P_i=
\begin{pmatrix}I&0\\E_{ii}&I\end{pmatrix}.
\]

Powers provide arbitrary integral diagonal shears. Removing twice each self-response from \(X\) gives

\[
X-2E_{11}-2E_{22}
=
\begin{pmatrix}0&-1\\-1&0\end{pmatrix}.
\]

Correspondingly,

\[
\mathcal S_XP_1^{-2}P_2^{-2}
=
\mathcal S_{\left(\begin{smallmatrix}0&-1\\-1&0\end{smallmatrix}\right)}.
\]

The positive response plus the two self-shears therefore isolate the primitive integral mutual-root shear exactly.

## 3. Boundary Legendre/Fourier transformation

On face 1, use the canonical polarization change

\[
F_1:
(q_1,p_1)\longmapsto(-p_1,q_1),
\]

leaving face 2 fixed. Its matrix is integral and symplectic.

Conjugating the mutual shear gives

\[
F_1
\mathcal S_{\left(\begin{smallmatrix}0&-1\\-1&0\end{smallmatrix}\right)}
F_1^{-1}
=
\begin{pmatrix}
A&0\\0&(A^{-1})^T
\end{pmatrix},
\qquad
A=
\begin{pmatrix}1&1\\0&1\end{pmatrix}.
\]

This is the elementary \(GL(2,\mathbb Z)\) port-mixing or SUM transformation:

\[
q_1\mapsto q_1+q_2,
\qquad
p_2\mapsto p_2-p_1.
\]

Thus the mutual response and one local duality generate an actual mixing of the two faces, not merely a phase correlation.

## 4. (C_2) root generators

The matrices now available include:

- long-root unipotents from \(E_{11}\) and \(E_{22}\);
- a short mutual-root unipotent from the off-diagonal symmetric matrix;
- the other short-root direction from its \(F_1\) conjugate;
- negative-root partners from Fourier conjugation and inverses.

These are the elementary Chevalley generators for type \(C_2\). Over the integers, the elementary symplectic group in rank two equals the full integral symplectic group:

\[
ESp(4,\mathbb Z)=Sp(4,\mathbb Z).
\]

Therefore, conditional on admitting the two unit self-shears and local boundary Legendre transformations,

\[
\boxed{
\langle P_1,P_2,\mathcal S_X,F_1,F_2\rangle
=Sp(4,\mathbb Z).
}

## 5. Finite reductions checked directly

The certificate reduces the fixed integral generator set modulo two and three and closes the finite matrix groups exhaustively. It obtains

\[
|Sp(4,\mathbb F_2)|=720,
\qquad
|Sp(4,\mathbb F_3)|=51840.
\]

Thus the same small integral gate set reproduces the complete finite groups already encountered in the two-logical code branch.

The arithmetic compatibility is no longer only a single-generator observation.

## 6. Exact synthesis of the three ingredients

The group construction separates three roles:

1. **Self response:** \(P_1,P_2\), one for each face.
2. **Mutual response:** \(\mathcal S_X\), supplied by a positive scalar interval.
3. **Polarization duality:** \(F_1,F_2\), exchanging boundary value and flux.

Together they produce the full integral two-port symplectic group.

This is the precise arithmetic version of the proposed dance between singular objects and relationships: neither two independent faces nor mutual coupling alone suffices; canonical duality turns response into transport among polarizations.

## 7. Physical status of the ingredients

The mathematical status differs among the generators.

### Derived

- \(\mathcal S_X\) comes from an explicit positive local scalar boundary action.

### Natural but normalization-dependent

- \(P_1,P_2\) are unit quadratic boundary counterterms. Their unit normalization presupposes an integral dimensionless lattice.

### Canonical change of description, not yet dynamics

- \(F_i\) is a boundary Legendre/Fourier transform exchanging value and flux. It is a standard canonical duality but not automatically a time-evolution operator or physical symmetry.

The full \(Sp(4,mathbb Z)\) conclusion is therefore conditional on treating these chart/polarization operations as admissible physical or sewing transformations.

## 8. Relation to (Spin_0(2,3))

The chain now reads

\[
\begin{aligned}
&\text{positive }H_2(\mathbb R)\text{ boundary response}\\
&\quad+\text{ integral self terms}\\
&\quad+\text{ boundary Legendre duality}\\
&\qquad\Longrightarrow Sp(4,\mathbb Z)
\subset Sp(4,\mathbb R)
\cong Spin_0(2,3).
\end{aligned}
\]

This is an arithmetic subgroup of the desired real carrier, not yet a derivation that the full continuous group is a spacetime symmetry. Density and continuum completion require a declared topology and physical family of transformations.

## 9. Branch decision

- **Closed:** primitive mutual shear isolated from the positive integral response and self-shears.
- **Closed:** local Legendre conjugation produces the elementary port-mixing SUM matrix.
- **Closed:** the matrices realize the long and short \(C_2\) root unipotents.
- **Closed:** standard elementary generation gives \(Sp(4,\mathbb Z)\) conditionally on admissibility of all generators.
- **Closed:** reductions generate the full groups at \(p=2,3\).
- **Open:** canonical dimensionless normalization of unit self-shears.
- **Open:** physical status of boundary Legendre duality.
- **Open:** identification with code logical variables and Furey matter response.
- **Open:** continuous closure and Lorentzian causal interpretation.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** Standard-Model/Furey boundary data canonically quantize the self-shear lattice and implement the Legendre transform as a physical duality, completing the integral carrier without arbitrary normalization.

**Arithmetic trigger:** the code's prime-family logical gates are proven to be the reductions of this same integral generator set.

**Normalization falsifier:** unit self-shears depend on an arbitrary rescaling of dimensionful boundary variables.

**Duality falsifier:** a passive change of polarization is called a physical dynamical symmetry without an implementation or sewing interpretation.

**Group falsifier:** only the finite reductions are verified while integral elementary-generation hypotheses are not stated.

## 11. Certificate

The [integral-generator certificate](../../../verification/verify/verify_positive_response_legendre_and_diagonal_shears_supply_sp4z_generators.mjs) verifies every symplectic identity, isolates the mutual root, constructs the SUM conjugate and exhaustively closes the reductions modulo two and three.

## Companion documents

- [Positive integral response and finite cross shear](457_a_positive_integral_scalar_boundary_response_supplies_the_missing_cross_shear_in_sp4z_and_modulo_every_prime.md)
- [Finite cross shear completes \(Sp(4,\mathbb F_3)\)](456_one_cross_port_shear_completes_the_finite_sp4_and_realizes_the_three_relationships_pattern.md)
- [Scalar interval response](../0000-0099/64_scalar_interval_dirichlet_to_neumann_branch.md)
- [Exact global \(Sp(4,\mathbb R)\cong Spin_0(2,3)\)](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)
- [Braid to integral symplectic branch](../0000-0099/57_braid_central_twist_to_sp4z_branch.md)
