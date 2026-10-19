# Exchange-Fixed Survivor Amplitudes Compress to a Positive \(H_2(\mathbb R)\) Spectral Carrier

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B08 and B11  
**Claim status:** exact positive Gram compression, antiunitary intertwining and Herglotz closure; identification of the amplitudes with gauge-neutral physical probes remains open

## 1. The missing operational compression

The completed Furey survivor pair carries the exchange antiunitary

\[
\Theta_{\rm ex}(a,b)=(Cb,Ca),
\qquad C^2=1,
\]

where \(C\) is coefficient conjugation in a chosen real structure. To turn that pair into an observable two-face carrier, use the ordinary Gram map

\[
\boxed{
\Gamma(a,b)=
\begin{pmatrix}
\langle a,a\rangle&\langle a,b\rangle\\
\langle b,a\rangle&\langle b,b\rangle
\end{pmatrix}.}
\]

For all amplitudes, \(\Gamma(a,b)\geq0\). This is not an assumed cone: it is positivity of a Gram matrix.

## 2. Exact exchange intertwining

The Gram map obeys

\[
\Gamma(Cb,Ca)
=\sigma_x\overline{\Gamma(a,b)}\sigma_x.
\]

Thus it intertwines the Furey exchange with the population-normal carrier antiunitary:

\[
\boxed{
\Gamma\circ\Theta_{\rm ex}
=\Theta_{J_z}\circ\Gamma.}
\]

This fills one square in the previously open triplet/intertwiner diagram with an explicit positive map.

## 3. Fixed amplitudes land in \(J_z\)

For an exchange-fixed pair,

\[
b=Ca.
\]

Then

\[
\Gamma(a,Ca)=
\begin{pmatrix}
\|a\|^2&\langle a,Ca\rangle\\
\overline{\langle a,Ca\rangle}&\|a\|^2
\end{pmatrix}
\in J_z\cap H_2(\mathbb C)_+.
\]

The determinant is

\[
\boxed{
\det\Gamma(a,Ca)
=\|a\|^4-|\langle a,Ca\rangle|^2\geq0,}
\]

by Cauchy–Schwarz. Equal populations follow from antiunitarity, while the complex relationship remains unrestricted inside the positivity disk.

## 4. Boundary and interior meaning

When \(C\) is ordinary coefficient conjugation, equality holds precisely when \(a\) is real up to a common phase:

\[
a=e^{i\phi}r,
\qquad r\in\mathbb R^N.
\]

Then the carrier lies on the rank-one boundary of the Lorentz cone. Generic genuinely complex amplitude structure gives a positive determinant and therefore an interior carrier point.

This assigns a concrete interpretation to the Jordan norm:

\[
\det\Gamma
=\text{failure of the survivor amplitude to be phase-real relative to }C.
\]

It is a relational complex-structure measure, not an arbitrary quadratic coordinate.

## 5. Positive spectral sums

Let \(a_k(s)\) be exchange-fixed channel amplitudes with positive spectral weights \(w_k(s)\). Define

\[
\rho(s)=\sum_k w_k(s)\,Gamma(a_k(s),Ca_k(s)).
\]

Then pointwise

\[
\rho(s)\in J_z\cap H_2(\mathbb C)_+.
\]

The causal response

\[
G(z)=\int\frac{\rho(s)}{s-z}\,ds,
\qquad \operatorname{Im}z>0,
\]

satisfies

\[
\operatorname{Im}G(z)\geq0
\]

and remains in the complexification of the same population-normal real form. The Furey exchange, positive cone and Herglotz causal structure therefore commute at the amplitude-to-response level.

## 6. What this establishes

The chain is now exact on the completed carrier:

\[
\text{exchange-fixed survivor amplitudes}
\xrightarrow{\ \Gamma\ }
J_z^+
\xrightarrow{\text{spectral integral}}
\text{causal }H_2(\mathbb R)\text{ response}
\xrightarrow{\mathrm{Conf}}
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

This is stronger than an abstract isomorphism between triplets. It supplies positivity, selector compatibility and causal closure from one explicit construction.

## 7. What remains unproved

The amplitudes must still be obtained from physical probes. Specifically:

- the survivor modules must admit a common gauge-invariant inner product;
- Ward-null and gauge-dependent source directions must be quotiented first;
- the cross overlap must be a neutral observable or dressed response;
- spectral weights must come from a unitary Hilbert/Fock completion;
- renormalization must preserve exchange equality pointwise, not only after integration;
- the two Gram entries must be identified operationally with the external relational faces.

Until then, \(\Gamma\) is the canonical mathematical compression on the completed carrier, not yet a derived Standard-Model measurement map.

The exchange used by this Gram compression need not—and for charged same-representation survivor supports cannot—serve as the CAR adjoint. The response compression remains valid with a separate self-dual Nambu involution; see [The response selector and the CAR adjoint are two distinct antiunitaries](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md).

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** one pair of gauge-neutral external probes has matrix elements \((a,Ca)\) on the two Furey survivors and reproduces the observed positive response through \(\Gamma\).

**Spectral trigger:** the pointwise exchange-fixed spectral density survives Ward quotient and renormalization with a nonzero determinant over a measurable range.

**Intertwiner falsifier:** the physical compression fails \(\Gamma\Theta_{\rm ex}=\Theta_{J_z}\Gamma\).

**Positivity falsifier:** proposed survivor residues cannot be represented by positive Gram weights after removal of gauge-null states.

**Integration falsifier:** exchange holds only after accidental cancellation in an integrated moment while the pointwise spectral density violates it.

## 9. Certificate

The [exchange-fixed survivor Gram certificate](../../../verification/verify/verify_exchange_fixed_survivor_gram_compression.mjs) checks Gram positivity, antiunitary intertwining, the phase-real cone boundary, positive spectral summation and the upper-half-plane Herglotz sign.

## Companion documents

- [Furey exchange induces the population-normal real form](303_furey_survivor_exchange_induces_the_charge_compatible_population_normal_real_form.md)
- [Common selector lines in positive spectral sums](../0200-0299/286_common_selector_lines_survive_positive_spectral_sums_without_full_commutativity.md)
- [Conserved-stress spectral quotient](../0200-0299/206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Three-triplet intertwiner gates](../0200-0299/287_the_three_triplet_branches_admit_isomorphisms_but_not_yet_a_canonical_intertwiner.md)
