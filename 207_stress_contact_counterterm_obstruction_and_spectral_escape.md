# Stress Contact-Counterterm Obstruction and the Spectral Escape

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact tensor-structure and analytic-discontinuity result; explicit Standard-Model spectral functions remain open

## 1. The remaining ambiguity

The conserved-stress quotient gives a legal positive two-probe response. Its direct/contact block \(A(q)), however, is not automatically physical. Local gravitational and source counterterms shift stress two-point functions by conserved polynomials in momentum.

The question is whether any entry or algebraic combination of the Euclidean \(H_2\) response is immune to those shifts.

## 2. Conserved tensor structures

At nonzero momentum in a parity-even four-dimensional vacuum, the conserved symmetric two-point kernel decomposes as

\[
\Pi_T(q)
=F_2(q^2)P_2(q)
+F_0(q^2)P_0(q),
\]

up to contact terms and phase-specific complications.

Local diffeomorphism-compatible quadratic counterterms have the same projector form:

\[
\Pi_{\rm ct}(q)
=p_2(q^2)P_2(q)
+p_0(q^2)P_0(q),
\]

where \(p_2,p_0\) are real polynomials whose allowed degree depends on the effective-field-theory truncation.

## 3. Projection onto two probes

For conserved probe tensors \(f_a\), define the two fixed Gram matrices

\[
(G_s)_{ab}
=\langle f_a,P_s f_b\rangle,
\qquad s=2,0.
\]

The projected correlator is

\[
R(q)
=F_2(q^2)G_2
+F_0(q^2)G_0
+p_2(q^2)G_2
+p_0(q^2)G_0.
\]

At one momentum, the physical and contact contributions inhabit exactly the same subspace

\[
\operatorname{span}\{G_2,G_0\}
\subseteq H_2(\mathbb R).
\]

Any linear functional that annihilates all such contact shifts also annihilates the physical spin-two and spin-zero contributions at that momentum.

Thus there is no nontrivial fixed-momentum algebraic projection that retains the stress spectrum while removing all diffeomorphism-compatible contact ambiguity.

## 4. Probe-local counterterms are even worse

If the two channels are treated as independent external detector/source fields rather than two smearings of one metric source, local terms

\[
c_{11}J_1^2+2c_{12}J_1J_2+c_{22}J_2^2
\]

can span all of \(H_2(\mathbb R)\). Then every static response entry is scheme dependent unless a physical calibration or microscopic detector model fixes the coefficients.

The distinction between metric smearings and arbitrary ports must therefore be declared.

## 5. Lorentzian discontinuity removes local polynomials

Analytically continue to the retarded/Lorentzian correlator. Across a physical cut,

\[
\operatorname{Disc}p_s(q^2)=0
\]

for every local polynomial, while

\[
\operatorname{Disc}F_s(q^2)
=2i\,\operatorname{Im}F_s(q^2+i0)
\]

contains the physical spectral density.

Therefore

\[
\boxed{
\rho_{ab}(s)
=\rho_2(s)(G_2)_{ab}
+\rho_0(s)(G_0)_{ab}
}
\]

is free of ordinary local contact-polynomial ambiguity at positive spectral support.

This justifies using the spectral matrix—not the subtraction-dependent Euclidean value—as the primary positive Jordan-response datum.

## 6. Positivity survives

For \(\rho_2,\rho_0\ge0\), each \(G_s\) is a positive semidefinite Gram matrix, so

\[
\rho(s)
=\rho_2(s)G_2+\rho_0(s)G_0
\succeq0.
\]

If the two probe responses are linearly independent on the physical spectral support, \(\rho(s)\) can lie in the interior of \(H_2(\mathbb R)_+\). Otherwise it lies on a rank-one boundary ray.

## 7. Subtractions and dispersion

A dispersion relation reconstructs the correlator only up to subtraction polynomials:

\[
F_s(q^2)
=P_s(q^2)
+\int_0^\infty
\frac{\rho_s(\mu^2)}{\mu^2-q^2-i0}
\,d\mu^2.
\]

The spectral density is the invariant content; \(P_s\) encodes renormalization conditions and local gravitational terms.

Consequently:

- pole locations and residues are contact independent;
- cut discontinuities are contact independent;
- absolute Euclidean response values are not;
- low-order derivatives may still contain subtraction ambiguity unless enough derivatives are taken.

## 8. Consequence for the \(Spin(2,3)\) carrier

The most defensible carrier is frequency or spectral-parameter dependent:

\[
\rho(s)\in H_2(\mathbb R)_+.
\]

The \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) cone acts kinematically on each positive spectral matrix. A physical symmetry claim requires transformations that also respect:

- the dispersion relation;
- spectral support and thresholds;
- normalization sum rules;
- Ward identities;
- the chosen probe Gram matrices.

The group of one isolated matrix is larger than the symmetry of the complete spectral family.

## 9. Orientation qualification

Ordinary local counterterms cannot create an absorptive cut, so a calibrated imaginary loop or phase wedge built directly from spectral discontinuities is more robust than one built from subtraction-dependent Euclidean kernels.

However, propagation and port-transport phases still require the loop/connection analysis developed previously.

## 10. Stop-everything and falsification gates

**Spectral prediction:** the Standard Model fixes a dimensionless ratio or loop invariant of \(\rho_2G_2+\rho_0G_0\) across thresholds.

**Sum-rule success:** Ward identities and ultraviolet behavior fix enough subtractions to reconstruct a measurable response invariant.

**Contact obstruction:** every proposed static Jordan observable changes under allowed local counterterms, forcing the programme to use spectral data only.

**Probe failure:** arbitrary probe Gram matrices absorb all candidate predictions even after passing to the discontinuity.

**Symmetry failure:** \(Sp(4,\mathbb R)\) does not preserve the full spectral family or dispersion constraints and remains only a pointwise cone automorphism.

## 11. Certificate

The [stress-contact/spectral-escape certificate](scripts/verify_stress_contact_spectral_escape.mjs) verifies that physical and contact terms span the same two projector Gram matrices at fixed momentum, that every contact-annihilating linear functional also removes the physical contribution, and that analytic discontinuities cancel polynomial contacts while retaining a positive spectral response.

## Companion documents

- [Conserved-stress spectral quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Spectral wedge and phase curvature](137_spectral_wedge_and_phase_curvature.md)
- [Lorentzian passivity](70_lorentzian_passivity_and_causal_response.md)
- [Standard Model as stress-energy](01_standard_model_as_stress_energy_full_analysis.md)
