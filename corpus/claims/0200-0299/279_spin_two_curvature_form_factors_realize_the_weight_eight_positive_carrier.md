# Spin-Two Curvature Form Factors Realize the Weight-Eight Positive Carrier

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B07, B08, B09, B10 and B11  
**Claim status:** exact massless spinor-helicity and positive-Gram construction; no claim that the Standard-Model stress tensor contains a physical massless spin-two pole

## 1. A noncomposite realization of \(S^4\)

For a null momentum

\[
p_{\alpha\dot\alpha}
=
\lambda_\alpha\widetilde\lambda_{\dot\alpha},
\]

the commuting momentum spinor \(\lambda_\alpha\) defines a self-dual spin-two curvature polarization

\[
\boxed{
C_{\alpha\beta\gamma\delta}
=
\lambda_\alpha\lambda_\beta
\lambda_\gamma\lambda_\delta.}
\]

It lies in

\[
\operatorname{Sym}^4\mathbb C^2,
\]

the five-dimensional spin-two representation found in the relationship-square decomposition.

In normalized binary-quartic coordinates its five components are

\[
\lambda_0^4,quad
2\lambda_0^3\lambda_1,quad
\sqrt6\lambda_0^2\lambda_1^2,quad
2\lambda_0\lambda_1^3,quad
\lambda_1^4.
\]

Their squared norm is

\[
(|\lambda_0|^2+|\lambda_1|^2)^4.
\]

No Grassmann fields are multiplied. This is a commuting polarization/form-factor construction.

## 2. Face weight four and relationship weight eight

Under the little-group phase

\[
\lambda\mapsto e^{i\theta}\lambda,
\qquad
\widetilde\lambda\mapsto e^{-i\theta}\widetilde\lambda,
\]

the two opposite spin-two faces transform as

\[
A_+\mapsto e^{4i\theta}A_+,
\qquad
A_-\mapsto e^{-4i\theta}A_-.
\]

Their coherence transforms as

\[
\boxed{
A_+\overline{A_-}
\mapsto
e^{8i\theta}A_+\overline{A_-}.}
\]

This is the weight-eight relationship transition derived topologically in the earlier bundle branch.

## 3. Positive two-face Gram response

For one intermediate state or form-factor channel, define

\[
G=
\begin{pmatrix}
|A_+|^2&A_+\overline{A_-}\\
A_-\overline{A_+}&|A_-|^2
\end{pmatrix}
=
\begin{pmatrix}A_+\\A_-\end{pmatrix}
\begin{pmatrix}A_+\\A_-\end{pmatrix}^{\!\dagger}.
\]

Then

\[
G\succeq0,
\qquad
\det G=0.
\]

A spectral sum over states \(n\),

\[
\rho(s)=\sum_n w_n(s)G_n,
\qquad w_n(s)\geq0,
\]

remains positive and can become full rank when the state amplitude vectors are not all proportional.

The entrywise real projection

\[
\operatorname{Re}G
=
\begin{pmatrix}
G_{++}&\operatorname{Re}G_{+-}\\
\operatorname{Re}G_{+-}&G_{--}
\end{pmatrix}
\]

also remains positive, because

\[
G_{++}G_{--}-(\operatorname{Re}G_{+-})^2
\geq
G_{++}G_{--}-|G_{+-}|^2
\geq0.
\]

Thus every local real trivialization gives an \(H_2(\mathbb R)_+\) response.

## 4. Global twist remains

The diagonal face intensities are little-group invariant. The off-diagonal relationship has weight eight and therefore lives in the Chern-eight line over the null sphere.

Consequently:

- the Hermitian \(H_2(\mathbb C)\) Gram carrier is globally natural;
- a fixed real \(H_2(\mathbb R)\) slice exists only locally or after a compensating selector;
- the local positive cone and Schur recursion remain valid in every patch.

The explicit form factor therefore reproduces, rather than removes, the earlier topology obstruction.

## 5. Curvature is not the stress tensor

The Weyl curvature polarization and the stress tensor are different objects.

- The curvature is the gauge-invariant field strength of a massless spin-two excitation.
- The stress tensor is a conserved source/operator.
- A stress form factor into a spin-two state inherits the same helicity weights but also contains coupling constants, momentum powers and Ward-normalized tensor structures.

In the Standard Model without dynamical gravity, the stress two-point function need not contain a one-particle massless spin-two pole. It instead has multiparticle spectral continua and, depending on the state, spin-two tensor channels.

Therefore the construction proves the correct carrier for a null spin-two form-factor sector, not that the Standard Model has generated a graviton.

## 6. Relation to stress spectral positivity

For any Hermitian operator and physical intermediate states, the discontinuity of a two-point function is a positive sum of outer products of form factors. After Ward quotienting, the spin-two helicity pair has exactly the Gram form above.

This aligns the spinor-helicity branch with the earlier stress-response branch:

\[
\text{Ward quotient}
\longrightarrow
\text{helicity face amplitudes}
\longrightarrow
\text{positive }H_2(\mathbb C)\text{ spectral Gram}.
\]

The remaining physical question is whether a concrete Standard-Model, boundary or gravitational spectral sector supplies both faces with nonproportional amplitudes and a canonical real selector.

## 7. Relationship to \(Spin(2,3)\)

One state gives a rank-one null ray. Multiple independent states can give a positive interior point. Varying kinematics and states can in principle explore the cone.

But full \(Spin_0(2,3)\) symmetry requires more than positivity:

- an open response image;
- closure under the Jordan/conformal transformations;
- compatible UV normalization and causality;
- treatment of the global Chern-eight twist.

The form-factor construction supplies the correct positive local carrier and transition weight, not the full symmetry derivation.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a Ward-normalized Standard-Model or boundary stress spectral density produces two nonproportional null spin-two face amplitudes whose Gram explores an open \(H_2\) cone and obeys the established Schur/Herglotz recursion.

**Pole trigger:** a genuine massless spin-two pole appears with universal positive residue and consistent gauge/gravitational Ward identities.

**Topology trigger:** a physical selector or compensator cancels the weight-eight transition without breaking the required symmetries.

**Graviton falsifier:** the kinematic \(\lambda^4\) polarization is cited as evidence that a graviton pole exists in the Standard-Model stress correlator.

**Symmetry falsifier:** one rank-one Gram ray is cited as proof of the full \(Spin(2,3)\) response symmetry.

## 9. Certificate

The [spin-two form-factor Gram certificate](../../../verification/verify/verify_spin_two_form_factor_h2_gram.mjs) verifies the five normalized quartic components, little-group weights four and eight, rank-one Gram positivity, positive full-rank spectral summation and positive real projection.

## Companion documents

- [Relationship determinant and spin-two fiveplet](277_the_relationship_square_splits_into_jordan_determinant_and_spin_two_fiveplet.md)
- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Opposite-helicity Chern-eight carrier](217_opposite_helicity_carrier_has_chern_eight_relationship_obstruction.md)
- [Null-helicity topology scope audit](225_null_helicity_topology_is_not_generic_stress_spectral_topology.md)
