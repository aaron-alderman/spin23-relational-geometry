# A Free Conformal Field's Stress Spectrum Is One Jordan Ray

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** standard free-conformal spectral form and exact projected-family consequence; interacting Standard-Model thresholds remain open

## 1. Concrete test of the dimension bound

Take a free massless real scalar in four dimensions with the conformally improved stress tensor. In flat space it is conserved and traceless on shell, up to contact/anomaly qualifications that do not create an ordinary positive-mass spin-zero cut in the exact free conformal theory.

The nonlocal stress two-point function therefore occupies only the transverse spin-two projector:

\[
\Pi_T(q)
=F_2(q^2)P_2(q),
\qquad
F_0(q^2)=0.
\]

## 2. Spectral scaling

The four-dimensional stress tensor has scaling dimension four. Its momentum-space two-point function has the nonlocal form

\[
F_2(q^2)
\propto
C_T(q^2)^2\log(-q^2-i0)
\]

up to convention-dependent normalization and local polynomials.

Across the massless cut,

\[
\rho_2(s)
=\kappa_T s^2\Theta(s),
\qquad
\kappa_T>0,
\]

while

\[
\rho_0(s)=0.
\]

The coefficient \(\kappa_T\) is proportional to the positive stress central charge and depends on normalization conventions. Its precise value is not needed for the geometric conclusion.

## 3. Projected two-probe response

For fixed conserved probe tensors,

\[
(G_2)_{ab}
=\langle f_a,P_2f_b\rangle.
\]

The complete positive spectral family is

\[
\boxed{
\rho_{ab}(s)
=\kappa_Ts^2(G_2)_{ab}.
}

Every nonzero spectral matrix is a positive scalar multiple of the same \(G_2\). Hence:

- all normalized eigenvalue ratios are constant;
- eigenvectors do not run with \(s\);
- every pair of spectral matrices is linearly dependent;
- spectral phase curvature vanishes;
- the family explores one ray of \(H_2(\mathbb R)_+\).

This explicitly realizes the conformal-ray theorem.

## 4. Adding free conformal species

Free massless Weyl fermions and gauge fields also have conserved traceless stress tensors after the relevant improvement/gauge treatment. Their positive spin-two spectral contributions add:

\[
\rho_2^{\rm total}(s)
=\left(
\sum_r\kappa_{T,r}
\right)s^2\Theta(s).
\]

For common fixed probes, changing the conformal field content changes only the overall ray weight. It does not generate a second or third matrix direction.

Thus the classically massless free Standard-Model field content would still occupy the same projected spin-two ray, modulo gauge and improvement details.

## 5. How the spin-zero plane direction appears

Mass terms, nonconformal improvement, spontaneous symmetry breaking and running couplings can activate the trace channel:

\[
\rho(s)
=\rho_2(s)G_2
+\rho_0(s)G_0.
\]

Thresholds make the ratio \(\rho_0/\rho_2\) vary with \(s\), so the family can explore a two-dimensional plane. It still cannot reach the third \(H_2\) direction without an additional tensor structure or varying probes.

## 6. Trace anomaly qualification

In an interacting quantum theory, the trace anomaly contains beta functions and local curvature terms. It can generate nonlocal scalar spectral weight when scale-breaking operators couple to physical states.

For an exact flat-space free conformal theory, curvature-anomaly terms contribute contact/background dependence rather than a new ordinary continuum projector. They do not invalidate the one-ray discontinuity result.

The physical Standard Model is not an exact CFT: the Higgs scale, masses and running couplings break the ray structure.

## 7. Consequence for \(Spin(2,3)\)

The ambient cone still has

\[
\operatorname{Conf}(H_2(\mathbb R))
=Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

But the free conformal stress spectrum selects only one ray. The subgroup preserving that ray, not the whole cone group, is relevant to this physical family.

Full \(Spin(2,3)\) dynamics cannot be inferred from conformal stress positivity alone.

## 8. Observable null tests

For the exact free conformal model:

\[
\det\left[
v(\rho(s_1)),v(\rho(s_2))
\right]=0
\]

for every pair of spectral values, in any two-coordinate minor. Equivalently,

\[
\rho(s_1)
=\left(\frac{s_1}{s_2}\right)^2
\rho(s_2).
\]

Any scale-dependent change in normalized matrix shape signals mass, interactions, boundary effects, probe variation or another response channel.

## 9. Stop-everything and falsification gates

**Free-field check:** an explicit loop calculation reproduces the \(s^2G_2\) ray with the expected positive normalization.

**Standard-Model threshold signal:** Higgs and mass thresholds generate a calculable second plane direction whose ratio to the spin-two channel is experimentally meaningful.

**Third-direction success:** a sourced boundary or medium response produces a matrix outside \(\operatorname{span}\{G_2,G_0\}\).

**Ambient-only confirmation:** all vacuum stress spectra, free and interacting, remain in the two-form-factor plane. Then the full Jordan cone remains a completion rather than a dynamically explored state space.

## 10. Certificate

The [free-conformal stress-ray certificate](scripts/verify_free_conformal_stress_ray.mjs) verifies \(s^2\) scaling, collinearity of all projected spectral matrices, invariance of normalized shape under adding conformal species, activation of only a second plane direction by a model trace threshold and the continued absence of a third \(H_2\) direction.

## Companion documents

- [Stress spectral-family dimension](208_stress_spectral_family_dimension_and_ambient_sp4_obstruction.md)
- [Stress contact obstruction and spectral escape](207_stress_contact_counterterm_obstruction_and_spectral_escape.md)
- [Conserved-stress quotient](206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Standard Model as stress-energy](01_standard_model_as_stress_energy_full_analysis.md)
