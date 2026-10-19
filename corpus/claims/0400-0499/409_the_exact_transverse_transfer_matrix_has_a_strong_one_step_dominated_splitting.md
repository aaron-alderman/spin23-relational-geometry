# The Exact Transverse Transfer Matrix Has a Strong One-Step Dominated Splitting

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact transfer construction and current-form identity; numerical one-step domination; invariant stable bundle still open

## 1. Why this is the next calculation

The inverse-onsite estimate supplies the desired (1/|y|) scale, but the zero-energy recurrence

\[
T_+\psi_{y+1}+V_y\psi_y+T_-\psi_{y-1}=0
\]

is second order. A factorial decay theorem therefore cannot discard either neighbour. It must identify the decaying half of the two-step dynamics.

This document constructs that two-step system without reducing the periodic circumference to one site.

## 2. Exact full-slice transfer matrix

Let (d=8(2L)) be the complete internal-plus-circumference slice dimension. For (r^2\ne1), the transverse hopping is invertible because

\[
T_+^2=\frac{r^2-1}{4}I.
\]

Define

\[
\Phi_y=\begin{pmatrix}\psi_y\\\psi_{y-1}\end{pmatrix}.
\]

Then

\[
\Phi_{y+1}=A_y\Phi_y,
\qquad
A_y=\begin{pmatrix}-T_+^{-1}V_y&-T_+^{-1}T_-\\I&0\end{pmatrix}.
\]

At (L=2), (d=32), so (A_y) is a (64\times64) complex matrix. The computation retains all four circumference sites, all eight internal components per site, both defect masses, circumference kinetic and Wilson hopping, and the neutral selector. It is the exact zero-energy transfer matrix for the regulated defect Hamiltonian, not a continuum or single-channel tail model.

## 3. Exact lattice-current structure

Since (T_-=T_+^\dagger) and (V_y=V_y^\dagger), define

\[
J=\begin{pmatrix}0&-iT_-\\iT_+&0\end{pmatrix}.
\]

Direct block multiplication gives

\[
\boxed{A_y^\dagger J A_y=J.}
\]

Thus the transfer dynamics is pseudo-unitary relative to the lattice-current metric. In particular, (|\det A_y|=1). At the benchmark, the largest numerical residual in (A_y^\dagger J A_y-J) through radius 32 is (1.43\times10^{-14}), and the log absolute determinant reconstructed from singular values stays below (3\times10^{-8}) in magnitude.

## 4. Singular-value split

Use

\[
L=2,\quad r=m_0=0.8,\quad \mu=0.7,
\quad \delta=1.2664482421875.
\]

Writing (s_{32}) for the largest of the lower 32 singular values and (s_{33}) for the smallest of the upper 32 gives:

| (y) | (s_{32}) | (s_{33}) | (s_{33}/s_{32}) | (y s_{32}) |
|---:|---:|---:|---:|---:|
| 2 | 0.893339246 | 1.119395576 | 1.2530 | 1.7867 |
| 4 | 0.765431893 | 1.306451964 | 1.7068 | 3.0617 |
| 8 | 0.256621342 | 3.896792030 | 15.1850 | 2.0530 |
| 16 | 0.100671476 | 9.933300293 | 98.6705 | 1.6107 |
| 32 | 0.044851520 | 22.295788366 | 497.1022 | 1.4352 |

The spectrum separates into 32 contracting and 32 expanding one-step directions. The edge of the contracting half has the anticipated (O(1/y)) scale, while the domination ratio grows rapidly.

For this benchmark the singular values also pair reciprocally to numerical precision. The maximum error in (s_i s_{65-i}=1) is (4.5\times10^{-9}) through radius 32. This reciprocal pairing is reported as a verified property of the present matrix realization, not yet as a general theorem for every regulator.

## 5. What this establishes

The far-tail transfer matrix has exactly the geometry required by a decaying/growing dichotomy:

- equal-dimensional contracting and expanding halves;
- a rapidly increasing one-step separation;
- a conserved nondegenerate current form;
- unit determinant modulus;
- an observed contracting edge proportional to (1/y).

This is substantially stronger than fitting a finite eigenvector tail. It probes the operator that generates every zero-energy tail.

## 6. What it does not establish

The right singular subspace of (A_y) is not automatically an invariant stable subspace of the nonautonomous product

\[
A_{y+n}\cdots A_{y+1}A_y.
\]

Successive one-step contracting planes can rotate. If that rotation feeds a contracting vector into the next expanding plane, the singular-value split alone does not imply contraction of the product. Therefore the statement “every vector in the lower one-step singular subspace decays factorially” is still forbidden.

The missing estimate is a cone or graph-transform bound comparing the outgoing contracting plane at (y) with the incoming contracting plane at (y+1).

## 7. Highest-value continuation

The next calculation should extract the left and right singular frames and measure their principal angles across adjacent radii. There are then two outcomes:

1. **Small rotation relative to the domination gap.** A graph transform should construct an invariant 32-dimensional stable bundle and permit the inverse-radius factors to be multiplied into a factorial bound.
2. **Large or resonant rotation.** The naïve stable bundle fails; the current form and particle-hole structure must be used to find a different invariant polarization.

Either outcome is informative and neither blocks the other programme branches.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** prove an invariant cone field whose contraction is (C/y). Its product gives a volume-independent factorial tail for the localized crossing projector.

**Rotation falsifier:** find adjacent stable planes whose principal angle overwhelms the one-step domination, preventing a uniform graph transform.

**Dimension falsifier:** obtain anything other than a (d/d) split after numerical tolerances and exact symmetries are controlled.

**Current falsifier:** fail (A_y^\dagger J A_y=J) in the exact finite model.

**Overclaim falsifier:** identify one-step singular vectors with covariant Lyapunov subspaces without testing their transport.

## 9. Certificate

The [transfer-splitting certificate](../../../verification/verify/verify_transverse_transfer_has_dominated_one_step_splitting.mjs) checks the exact slice dimensions, current conservation, determinant modulus, reciprocal numerical pairing and growth of the one-step domination ratio.

The exploratory calculation is in [the transfer-splitting script](../../../verification/explore/explore_transverse_transfer_splitting.mjs).

## Companion documents

- [Rigorous inverse-onsite bound](408_the_linear_mass_gives_a_rigorous_inverse_onsite_bound_but_the_two_step_factorial_estimate_remains_open.md)
- [Discrete factorial-tail recurrence](407_the_exact_discrete_linear_mass_recurrence_predicts_a_factorial_tail_beyond_the_finite_gaussian_fit.md)
- [Large-width crossing projector](406_the_crossing_projector_gap_stabilizes_through_width_six_and_its_tail_is_gaussian_like.md)
- [Exact block-Jacobi half-line](402_each_pin_glide_sector_is_exactly_a_block_jacobi_half_line_with_a_doubled_positive_radius_fiber.md)
