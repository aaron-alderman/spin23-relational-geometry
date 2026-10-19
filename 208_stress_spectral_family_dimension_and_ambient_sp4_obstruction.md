# Stress Spectral-Family Dimension and the Ambient \(Sp(4)\) Obstruction

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact form-factor dimension result for fixed conserved probes in a parity-even Lorentz-invariant vacuum; boundary/media extensions remain open

## 1. Ambient cone versus physical image

The conserved-stress construction produces a positive two-probe matrix

\[
\rho(s)\in H_2(\mathbb R)_+.
\]

This establishes a legal ambient Jordan cone. It does not show that physical stress spectra explore the whole three-dimensional cone.

For fixed probes in a parity-even Lorentz-invariant vacuum,

\[
\rho(s)
=\rho_2(s)G_2
+\rho_0(s)G_0,
\]

where \(G_2\) and \(G_0\) are fixed positive Gram matrices determined by the probes.

## 2. Dimension bound

Because only two scalar functions vary,

\[
\dim\operatorname{span}{\rho(s):s>0\}
\le2.
\]

But

\[
\dim H_2(\mathbb R)=3.
\]

Therefore every fixed-probe spectral family obeys one nontrivial linear relation

\[
\mathcal L(\rho(s))=0
\]

whenever \(G_2,G_0\) are linearly independent. If they are dependent, the family is only one dimensional.

The response lives inside the cone but generically on a two-dimensional linear slice of it.

## 3. Conformal limit

For a traceless conformal stress tensor,

\[
\rho_0(s)=0.
\]

Then

\[
\rho(s)=\rho_2(s)G_2
\]

lies on one fixed positive ray. All normalized shape data are constant with spectral parameter. There is no spectral phase curvature, no change of eigenvectors and no exploration of the full \(H_2\) geometry.

The ambient \(Spin(2,3)\) cone is therefore especially non-dynamical in the conformal two-probe limit.

## 4. Explicit annihilating functional

Represent a symmetric two-by-two matrix by

\[
v(M)
=
\left(M_{11},M_{22},\sqrt2M_{12}\right)
\in\mathbb R^3.
\]

Define

\[
w
=v(G_2)\times v(G_0).
\]

Then

\[
w\cdot v(\rho(s))=0
\]

for every \(s\). This gives an exact empirical null relation for the two-form-factor hypothesis.

## 5. Why ambient \(Sp(4,\mathbb R)\) is not automatically a physical symmetry

The conformal group of the full cone can move a generic point in directions transverse to

\[
\operatorname{span}\{G_2,G_0\}.
\]

Unless the group action also transforms the probes, spectral functions and physical setup in a way that preserves the family, the full \(Sp(4,\mathbb R)\) is not a symmetry of the measured response set.

At most, the stabilizer of the physical slice is automatically relevant. Claiming the whole group requires dynamics that generates or relates the missing third direction.

This is the same distinction as:

\[
\text{cone automorphism}
\ne
\text{symmetry of one spectral trajectory}.
\]

## 6. How a third direction could arise

The missing direction may appear through:

1. momentum-dependent probe profiles, so \(G_s\) themselves vary;
2. a medium, boundary or background that breaks Lorentz isotropy and admits additional tensor structures;
3. parity-odd or time-reversal-sensitive response where allowed;
4. nonlocal detector dynamics;
5. mixing with another conserved operator;
6. a genuinely nonseparable internal/external response map.

Each mechanism adds physical structure. None follows from stress conservation alone.

## 7. Three probes do not solve the form-factor bound automatically

With three probes, the spectral matrix lies in \(H_3(\mathbb R)_+\), but still has the form

\[
\rho_3(s)
=\rho_2(s)G_2^{(3)}
+\rho_0(s)G_0^{(3)}.
\]

It occupies at most a two-dimensional cone inside the six-dimensional rank-three Jordan algebra. More ports enlarge the ambient matrix but not the number of vacuum form factors.

The cubic determinant may even vanish identically if the Gram ranks are too small.

## 8. Relation to contact terms

Local contact terms use the same two projector Gram matrices in the metric-probe setting. Passing to spectral discontinuities removes their polynomial coefficients but does not add a new tensor direction.

Thus the spectral escape solves scheme dependence while revealing the physical-family dimension obstruction more starkly.

## 9. Revised status of the stress route

Established:

- Ward quotient to a positive \(H_2\) carrier;
- contact-independent spectral density;
- exact two-form-factor slice;
- conformal one-ray limit.

Open:

- a third physical response direction;
- a source-derived action of \(Sp(4,\mathbb R)\) on the complete spectral family;
- a dimensionless invariant not reducible to arbitrary probe geometry.

## 10. Stop-everything and falsification gates

**Third-direction success:** a specified Standard-Model boundary or medium generates a third independent conserved stress-response matrix with a fixed coefficient.

**Group success:** one action of \(Sp(4,\mathbb R)\) maps the full measured spectral family, thresholds and probes into themselves.

**Null-test success:** data obey the predicted plane relation \(w\cdot v(\rho)=0\) in the vacuum and violate it only when a known extra structure is introduced.

**Ambient-only outcome:** every physical family remains one- or two-dimensional and the full cone group has no action on observables. Then \(Spin(2,3)\) is a useful ambient geometry, not a dynamical symmetry.

## 11. Certificate

The [stress-family dimension certificate](scripts/verify_stress_spectral_family_dimension.mjs) verifies the exact plane relation, conformal-ray collapse, full-rank positive samples within the plane, failure of a generic cone congruence to preserve it and restoration of full \(H_2\) span only after adding a third independent response structure.

## Companion documents

- [Stress contact obstruction and spectral escape](207_stress_contact_counterterm_obstruction_and_spectral_escape.md)
- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Peirce--Schur triple recursion](202_peirce_schur_triple_recursion_to_spin23.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)
