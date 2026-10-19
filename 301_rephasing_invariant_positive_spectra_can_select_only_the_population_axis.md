# Rephasing-Invariant Positive Spectra Can Select Only the Population Axis

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B08 and B11  
**Claim status:** exact positive-spectral and rephasing-commutant classification with a transverse toy kernel; full Standard-Model correlator remains open

## 1. Minimal Ward-compatible spectral model

After quotienting gauge or stress sources by their Ward-null directions, let the three Pauli response channels have a positive matrix-valued spectral density

\[
\rho_{ab}(s)=\sum_k w_k(s)v_{k,a}(s)v_{k,b}(s),
\qquad w_k(s)\geq0.
\]

Every spectral moment

\[
Q_{ab}=\int ds\,f(s)\rho_{ab}(s),
\qquad f(s)\geq0,
\]

is positive semidefinite. It can therefore serve as the selector anisotropy tensor without using a nonzero stress one-point function.

A conserved tensor kernel may be built from transverse projectors multiplying \(\rho_{ab}\). The Ward quotient and internal selector analysis then factor cleanly: conservation controls spacetime indices, while positivity and eigenlines are tested on the three-channel matrix.

## 2. Face rephasing acts around the population axis

A relative face phase

\[
U(\phi)=e^{i\phi\sigma_z/2}
\]

rotates the relationship quadratures \((T_x,T_y)\) and leaves the population difference \(T_z\) fixed. On the triplet,

\[
R_z(\phi)=
\begin{pmatrix}
\cos\phi&-\sin\phi&0\\
\sin\phi&\cos\phi&0\\
0&0&1
\end{pmatrix}.
\]

If rephasing is an exact unbroken symmetry and no charged spurion is present, the spectral moment must satisfy

\[
R_z(\phi)Q R_z(\phi)^T=Q
\quad\text{for all }\phi.
\]

The complete solution is

\[
\boxed{Q=\operatorname{diag}(q_\perp,q_\perp,q_z).}
\]

The relationship plane is necessarily degenerate.

## 3. What can still be selected

If \(q_z\neq q_\perp\), the population axis \([e_z]\) is an isolated director. Its fixed real-form plane is

\[
\operatorname{span}_{\mathbb R}\{\sigma_x,\sigma_y\}.
\]

Including the identity gives a valid Jordan algebra

\[
J_z=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_y\}
\cong H_2(\mathbb R).
\]

Its elements have equal diagonal populations:

\[
\begin{pmatrix}t&x-iy\\x+iy&t\end{pmatrix},
\qquad
\det=t^2-x^2-y^2.
\]

Thus exact rephasing can select a real rank-two Jordan algebra, but not the usual entrywise-real slice \(\operatorname{span}\{I,\sigma_x,\sigma_z\}\). The physical interpretation changes: population imbalance is excluded, while the full complex relationship plane remains.

## 4. Why the standard real slice needs a spurion

The standard entrywise-real carrier removes \(\sigma_y\). Its normal lies inside the relationship plane. Exact rephasing rotates that normal, so no fixed \(\sigma_y\) direction can be selected while the full \(U(1)\) remains unbroken and acts nontrivially.

One must therefore introduce one of:

1. a Higgs/Yukawa spurion transforming covariantly under rephasing;
2. spontaneous phase locking in the broken theory;
3. an external boundary/source phase convention with measurable relational meaning;
4. a compensating flavor/Furey transformation;
5. the population-normal real form instead of entrywise reality.

This recovers the earlier charged-real-slice obstruction in the new spectral language.

## 5. Positive toy example and phase averaging

Take positive residues along the three Pauli axes with moment

\[
Q=\operatorname{diag}(1,4,9).
\]

Averaging over the exact face phase gives

\[
\langle R_zQR_z^T\rangle_{U(1)}
=\operatorname{diag}\!\left(\frac52,\frac52,9\right).
\]

The relationship-plane selector is erased, but the population axis remains isolated. This is not loss of positivity; it is symmetry restoration.

## 6. Three-flavor CP does not by itself choose the face phase

The Jarlskog invariant is a rephasing-invariant pseudoscalar. It can distinguish CP-even from CP-odd flavor data, but a scalar cannot supply a charged vector in the face relationship plane.

To orient \((T_x,T_y)\), the theory needs a covariant complex cross response or at least two spurions with a physical relative phase. The resulting selector must be defined from rephasing-invariant relative data, not from the phase of one Yukawa entry.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the Ward-completed Furey/Yukawa spectral matrix has a nondegenerate director whose covariance under face rephasing is fixed by a physical spurion and whose projector is basis independent.

**Alternative-real-form trigger:** the population-normal algebra \(J_z\) matches the physically measured relational carrier better than the entrywise-real convention.

**Symmetry falsifier:** an exact unbroken face \(U(1)\) is claimed together with a fixed nondegenerate relationship-plane normal and no transforming spurion.

**CP falsifier:** the scalar Jarlskog invariant alone is said to orient a two-component face phase vector.

**Ward falsifier:** positivity of a channel matrix is invoked before gauge/stress null sources and contact terms are removed.

## 8. Certificate

The [Ward-positive spectral selector/rephasing certificate](scripts/verify_ward_positive_spectral_selector_rephasing_gate.mjs) checks a positive residue sum, exact phase-averaged commutant form, transverse source projector and the determinant of the population-normal fixed carrier.

## Companion documents

- [Minimal Yukawa-dressed cross stress](300_the_minimal_gauge_neutral_cross_stress_is_yukawa_dressed_but_not_independently_conserved.md)
- [Charged real-slice \(U(1)\) no-go](117_charged_real_slice_u1_no_go.md)
- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Dynamical \(\mathbb{RP}^2\) selector](297_a_dynamical_real_form_selector_has_rp2_order_parameter_and_two_orientation_modes.md)
