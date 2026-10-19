# The Mixed-Spurion Flow Has an Exact Frame Connection, but One-Parameter Running Has No Intrinsic Curvature

**Date:** 17 October 2026  
**Branches:** B02, B03, B06, B08 and B11  
**Claim status:** exact nondegenerate perturbation theorem and one-dimensional curvature no-go

## 1. From frame rotation to a connection

The mixed-spurion calculation shows that the singular frame rotates. This document computes that rotation exactly to first order and asks what part of it is invariant.

Let

\[
L(t)=C(t)C(t)^\dagger
\]

be the positive left spectral product, and suppose at \(t=0\)

\[
L(0)=\Lambda=\operatorname{diag}(\lambda_1,\ldots,\lambda_n)
\]

has nondegenerate eigenvalues. Write

\[
\dot L(0)=K=K^\dagger.
\]

Choose a differentiable eigenframe \(U(t)\) with \(U(0)=I\), and define its anti-Hermitian connection

\[
A=U^\dagger\dot U\big|_{t=0}.
\]

## 2. Exact off-diagonal connection formula

Differentiating

\[
U(t)^\dagger L(t)U(t)=\Lambda(t)
\]

gives

\[
K+[\Lambda,A]=\dot\Lambda.
\]

The right-hand side is diagonal. Hence for \(i\ne j\),

\[
K_{ij}+(\lambda_i-\lambda_j)A_{ij}=0,
\]

and therefore

\[
\boxed{
A_{ij}=\frac{K_{ij}}{\lambda_j-\lambda_i}
\qquad(i\ne j).
}
\]

Hermiticity of \(K\) implies \(A_{ji}=-\overline{A_{ij}}\), as required. The diagonal \(A_{ii}\) is an arbitrary phase gauge for each eigenvector; the parallel-transport gauge sets it to zero.

The eigenvalue derivatives are

\[
\dot\lambda_i=K_{ii}.
\]

Thus the mixed-spurion off-diagonal matrix elements and inverse spectral gaps completely determine the infinitesimal frame rotation.

## 3. Applied to the mixed-spurion correction

For

\[
C(t)=(I+tH_N)D,
\qquad H_N=H_N^\dagger,
\]

one has

\[
L(t)=D^2+t(H_ND^2+D^2H_N)+O(t^2).
\]

With \(\lambda_i=d_i^2\),

\[
K_{ij}=(d_i^2+d_j^2)(H_N)_{ij}.
\]

Therefore

\[
\boxed{
A_{ij}
=\frac{d_i^2+d_j^2}{d_j^2-d_i^2}(H_N)_{ij}.
}

Near a degeneracy, the inverse gap amplifies the frame response. At exact degeneracy the individual eigenvectors cease to be canonical and the correct object is the higher-rank spectral projector.

## 4. Why one RG parameter does not yet give invariant curvature

For a connection one-form on a one-dimensional parameter line,

\[
\mathcal A=A(t)\,dt,
\]

the curvature is

\[
\mathcal F=d\mathcal A+\mathcal A\wedge\mathcal A.
\]

But

\[
dt\wedge dt=0,
\]

so

\[
\boxed{\mathcal F=0}
\]

identically on an ordinary one-dimensional RG trajectory.

Locally, the connection can be gauged away by solving the parallel-transport equation. An open-path frame rotation depends on endpoint conventions. Only extra global data—such as a closed loop, singularity, quotient identification or comparison with a separately fixed frame—can turn one-dimensional transport into invariant holonomy.

Therefore the running singular frame is real and calculable, but it is not by itself a gauge-invariant CP observable.

## 5. What is needed for a curvature/CP bridge

A nonzero curvature requires at least two independent parameters, for example:

- two independent Yukawa-spurion deformations;
- energy and renormalization scale;
- momentum direction and mass/coupling variation;
- two Higgs-background coordinates;
- a parameter surface encircling a degeneracy.

For coordinates \(x,y\), an isolated eigenline of a Hermitian family has Berry curvature

\[
F^{(i)}_{xy}
=2\,\operatorname{Im}
\sum_{j\ne i}
\frac{(\partial_xL)_{ij}(\partial_yL)_{ji}}
{(\lambda_i-\lambda_j)^2},
\]

up to the stated orientation/sign convention.

This formula is explicitly sensitive to complex relative phases and commutators. It is the correct next place to test for Jarlskog-type data.

## 6. Local Jordan gluing

At each nondegenerate parameter value, the singular frame identifies the local response with a direct sum of real \(H_2(\mathbb R)\) blocks. On overlaps, two frames differ by unitary transition functions.

To glue the *real* Jordan slices rather than merely the ambient complex response spaces, those transition functions must normalize the chosen real form. Generic complex flavor rotations need not do so on each fixed flavor label; instead they may mix the direct-sum factors.

The bundle programme therefore requires three separate checks:

1. smooth spectral projectors across the parameter domain;
2. transition functions preserving the direct-sum Jordan product or acting by its automorphisms;
3. compatible transport of the positive cones.

These conditions have not yet been established for the full interacting Standard Model response.

## 7. Branch decision

- **Closed:** the infinitesimal frame connection is fixed off diagonal by matrix elements divided by spectral gaps.
- **Closed:** the mixed-spurion connection is explicitly \((d_i^2+d_j^2)/(d_j^2-d_i^2)(H_N)_{ij}\).
- **Closed:** a one-dimensional RG trajectory has identically zero curvature two-form.
- **Closed:** open-path frame rotation alone is basis/convention dependent.
- **Open:** curvature on a two-parameter physical family and its relation to Jarlskog invariants.
- **Open:** Jordan-product and positive-cone gluing under the resulting transition functions.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** derive a two-parameter response family whose Berry curvature is a basis-invariant nonzero multiple of a Standard-Model CP invariant and whose parallel transport also supplies the missing exceptional/Furey phase comparison.

**Connection falsifier:** in the nondegenerate case, find an off-diagonal derivative not cancelled by

\[
A_{ij}=K_{ij}/(\lambda_j-\lambda_i).
\]

**Curvature falsifier:** claim a local curvature two-form from a single ordinary RG coordinate without additional noncommuting parameter directions.

**Degeneracy warning:** do not use inverse-gap eigenvector formulas at an exact degeneracy; use spectral projectors and non-Abelian transport.

**Holonomy warning:** do not identify an open-path basis rotation with a physical Wilson loop.

## 9. Certificate

The [mixed-spurion frame-connection certificate](scripts/verify_mixed_spurion_frame_connection_and_one_parameter_flatness.mjs) checks anti-Hermiticity, cancellation of every first-order off-diagonal term, the explicit mixed-spurion gap formula and the one-parameter curvature identity.

## Companion documents

- [Single- versus mixed-spurion real-frame theorem](426_single_spurion_self_energies_preserve_the_real_face_frame_but_mixed_yukawa_spurions_generically_rotate_it.md)
- [Multiflavor free spectral alignment](425_a_fixed_mass_matrix_aligns_the_full_free_multiflavor_spectrum_while_relative_singular_frames_retain_cp.md)
- [Helicity Hopf-bundle obstruction](122_helicity_hopf_bundle_real_carrier_obstruction.md)
- [Hopf phase descent](123_hopf_phase_descent_and_carrier_correction.md)
