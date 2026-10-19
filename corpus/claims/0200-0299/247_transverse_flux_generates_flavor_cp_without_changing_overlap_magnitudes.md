# Transverse Flux Generates Flavor CP Without Changing Overlap Magnitudes

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B07, B08, B09 and B11  
**Claim status:** exact finite Gaussian/Wilson-phase construction and one-dimensional Abelian no-go; dynamical gauge background and Standard-Model embedding remain open

## 1. Separating hierarchy from CP

Gaussian distances can control Yukawa magnitudes, but real overlaps have no flavor CP. The desired phase mechanism should:

1. leave the magnitude-rank relation intact;
2. produce a nonfactorizable rephasing invariant;
3. preserve the face-local real Jordan carrier by acting only in flavor/internal transport.

A transverse Wilson phase can do this, but only when it encloses genuine flux or path topology.

## 2. Why a one-dimensional Abelian connection is insufficient

On a simply connected transverse interval,

\[
A_w=\partial_w\chi.
\]

An Abelian Wilson line is

\[
W(a_i,b_j)
=e^{iq[\chi(b_j)-\chi(a_i)]},
\]

which factorizes into a left endpoint phase and a right endpoint phase.

For gauge-consistent up and down sectors sharing the same left doublet phase,

\[
Y_u=D_L\,O_u\,D_{Ru},
\qquad
Y_d=D_L\,O_d\,D_{Rd},
\]

with real \(O_u,O_d\). Right phases cancel from \(H_f=Y_fY_f^\dagger\), and the common left phase conjugates both \(H_u,H_d\). Their commutator is conjugate to a real antisymmetric matrix, so

\[
\boxed{
\det[H_u,H_d]=0.}
\]

A single pure-gauge one-dimensional Abelian background cannot generate CKM-type CP.

## 3. Two-dimensional flux phase

Place left and right centers at \(a_i,b_j\in\mathbb R^2\). In a constant Abelian magnetic-type flux, a straight Wilson segment in symmetric gauge has endpoint phase

\[
\theta_{ij}=\kappa\,a_i\wedge b_j,
\]

up to gauge-dependent row and column terms. Define

\[
Y_{ij}=O_{ij}e^{i\theta_{ij}},
\qquad
O_{ij}=\exp\!\left[-\frac{\|a_i-b_j\|^2}{4\sigma^2}\right].
\]

Then

\[
|Y_{ij}|=O_{ij}
\]

exactly, so the logarithmic magnitude-rank theorem is untouched.

## 4. Gauge-invariant plaquette phase

The row/column rephasing invariant is

\[
\Phi_{ik;jl}
=\theta_{ij}+\theta_{kl}-\theta_{il}-\theta_{kj}.
\]

For the flux phase,

\[
\boxed{
\Phi_{ik;jl}
=\kappa\,(a_i-a_k)\wedge(b_j-b_l).}
\]

It is the flux through the endpoint quadrilateral. It vanishes for collinear one-dimensional geometry and is generically nonzero in two dimensions.

The phase invariant is the antisymmetric counterpart of the magnitude invariant:

\[
C_{ik;jl}
\propto(a_i-a_k)\cdot(b_j-b_l),
\]

\[
\Phi_{ik;jl}
\propto(a_i-a_k)\wedge(b_j-b_l).
\]

The dot product controls hierarchy geometry; the wedge product controls oriented CP geometry.

## 5. Explicit CP checkpoint

The certificate constructs real Gaussian \(Y_u\) and flux-dressed \(Y_d\) for three families. It verifies:

\[
|Y_d|=O_d,
\qquad
\Phi\neq0,
\]

and obtains

\[
\operatorname{Im}\det[H_u,H_d]\neq0.
\]

Replacing the flux phase by common-left plus right-factorized endpoint phases makes the same invariant vanish.

Thus:

\[
\boxed{
\text{nonzero transverse flux can generate flavor CP
without altering overlap magnitudes}.}
\]

## 6. What remains physical rather than kinematic

The construction does not identify the flux with hypercharge or any observed gauge field. A physical model must answer:

- which internal/transverse connection carries the flux;
- why it does not create forbidden four-dimensional gauge breaking;
- how its quantization and backreaction are controlled;
- whether one flux parameter can reproduce the required phase while the positions also fit magnitudes;
- whether radiative corrections preserve the approximate rank hierarchy.

If the extra direction is literally only one-dimensional and simply connected, this mechanism is unavailable. It requires at least two transverse directions, a nontrivial loop/multiple paths, or a non-Abelian connection.

## 7. Spin\((2,3)\) and Jordan interpretation

The result gives “orientation” a precise flavor meaning. The real \(H_2(\mathbb R)\) face carrier can remain reciprocal while the flavor factor carries an oriented Wilson-loop phase. Dot and wedge invariants coexist without forcing the carrier itself back to \(H_2(\mathbb C)\).

This also supplies a concrete target for the proposed twist:

- the carrier records two faces and real causal response;
- profile displacement records relational magnitude;
- transverse flux records oriented loop phase.

No claim is made that Spin\((2,3)\) uniquely demands this flux.

## 8. Stop-everything and falsification gates

**CP trigger:** one quantized or algebraically selected flux parameter fits a nonzero flavor invariant while the same centers satisfy the magnitude-rank relation.

**Dimension trigger:** hierarchy and CP together require two transverse directions, independently matching another branch of the carrier construction.

**Furey trigger:** a source-native noncommutative phase or cyclic orientation reproduces the Wilson plaquette invariant.

**Falsifier:** the proposed phase factorizes into common-left and right endpoint rephasings, or produces CP only by changing arbitrary seed magnitudes.

## 9. Certificate

The [holonomy CP/magnitude certificate](../../../verification/verify/verify_holonomy_cp_without_magnitude_change.mjs) verifies the one-dimensional pure-gauge Jarlskog zero, constructs a nonzero two-dimensional plaquette phase, confirms unchanged Gaussian magnitudes and evaluates a nonzero CP-odd commutator determinant.

## Companion documents

- [Localization rank and dimension](245_logarithmic_yukawa_rank_counts_dimensions_only_when_widths_are_universal.md)
- [Width-splitting stability](246_small_width_splittings_only_perturb_logarithmic_rank_continuously.md)
- [Real face carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
- [Exchange-paired Yukawas and CP orientation](../0100-0199/164_exchange_paired_yukawas_and_cp_orientation_gate.md)
