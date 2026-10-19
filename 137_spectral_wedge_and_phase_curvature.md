# Spectral Wedge and Phase Curvature

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08 and B11  
**Claim status:** exact spectral criterion and finite-pole certificate; Standard-Model discontinuities remain uncomputed

## 1. Complex cross form factor

Combine the scalar and pseudoscalar face connectors into

\[
M(q^2)=x(q^2)-iy(q^2).
\]

For a finite spectral model,

\[
M(q^2)
=
\sum_n\frac{\rho_n}{q^2+m_n^2},
\]

and in the continuum,

\[
M(q^2)
=
\int_0^\infty
\frac{\rho(s)}{q^2+s}\,ds
\]

up to subtractions and contact terms.

The complex spectral weight \(\rho\) is the off-diagonal discontinuity data.

## 2. Spectral wedge

Define

\[
\boxed{
\mathcal W_\rho(s,t)
=
\operatorname{Im}
\bigl[\rho(s)\overline{\rho(t)}\bigr].
}
\]

All spectral weights share one phase modulo \(\pi\) exactly when

\[
\mathcal W_\rho(s,t)=0
\]

for every pair in the support, apart from zero weights.

This is the spectral-density form of the real-carrier gate.

## 3. Momentum-space wedge

For two Euclidean momenta,

\[
\mathcal W(p,q)
=
\operatorname{Im}
\bigl[M(p^2)\overline{M(q^2)}\bigr].
\]

If the spectral density has one common phase, then

\[
\mathcal W(p,q)=0
\]

for every pair.

Conversely, vanishing of the complete Euclidean family implies one real Stieltjes transform after a fixed phase rotation; uniqueness of the spectral representation then forces aligned spectral density, subject to the usual subtraction and distributional qualifications.

## 4. Local phase-curvature diagnostic

Taking \(q^2\) infinitesimally close to \(p^2\) gives

\[
\boxed{
\Omega(q^2)
=
\operatorname{Im}
\left[
\overline{M(q^2)}
\frac{dM(q^2)}{dq^2}
\right].
}
\]

Writing

\[
M=|M|e^{i\theta},
\]

one obtains

\[
\Omega=|M|^2\theta'.
\]

Thus \(\Omega\) measures momentum-dependent phase rotation without choosing a chiral basis.

Where \(M\ne0\):

\[
\Omega=0
\]

is the local constant-phase condition. Global alignment additionally requires consistent continuation across zeros and disconnected support.

## 5. Absorptive interpretation

On a Lorentzian cut, the discontinuity determines \(\rho(s)\). Two channels with different absorptive phases give

\[
\mathcal W_\rho(s,t)\ne0.
\]

Therefore the programme’s decisive quantity can, in principle, be extracted from:

- pole residues;
- cut discontinuities;
- scalar and pseudoscalar self-energy form factors;
- dispersive reconstruction of the dressed two-point function.

This is more physical than inspecting a scheme-dependent local counterterm alone.

## 6. Minimal momentum-dependent obstruction

Take

\[
m_s(r)=m(1+ar),
\qquad
m_p(r)=\mathcal J(b+cr).
\]

Then

\[
\mathcal W(p,q)
=
m\mathcal J(c-ab)(q-p).
\]

The constant pseudoscalar part \(b\) is harmless only when its momentum dependence remains proportional to the scalar form factor:

\[
c=ab.
\]

One independent slope is sufficient to produce a nonzero, rephasing-invariant obstruction.

This does not calculate a Standard-Model coefficient. It states exactly which combination a diagrammatic calculation must determine.

## 7. Stop-everything criteria

**Preserve \(Spin(2,3)\):** all pole and cut weights obey \(\mathcal W_\rho=0\), including absorptive contributions.

**Restore \(Spin(2,4)\):** find one pair of physical discontinuities with nonzero spectral wedge, or one momentum with \(\Omega\ne0\).

**Pin:** local counterterms are known but nonlocal discontinuities have not been computed.

**Caution:** zeros of \(M\), subtraction polynomials and unstable-particle definitions must be treated before turning \(\Omega=0\) into a global theorem.

## 8. Certificate

The [spectral-wedge certificate](scripts/verify-spectral-wedge-and-phase-curvature.mjs) compares aligned and misaligned two-pole families, evaluates pairwise wedges and phase curvature, and verifies the minimal two-form-factor obstruction.

## Companion documents

- [Dirac form-factor wedge](136_dirac_form_factor_wedge_obstruction.md)
- [Spectral phase-alignment gate](128_spectral_phase_alignment_real_carrier_gate.md)
- [Jarlskog-sourced pseudoscalar gate](131_jarlskog_sourced_sigma_y_counterterm_gate.md)
- [Lorentz and chiral-phase audit](132_lorentz_dimension_and_chiral_phase_audit.md)
