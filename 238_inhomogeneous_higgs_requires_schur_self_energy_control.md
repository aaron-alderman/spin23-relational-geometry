# An Inhomogeneous Higgs Profile Requires Schur Self-Energy Control

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact finite-dimensional projection identity and quantitative sufficient bounds; continuum renormalization and realistic profile dynamics remain open

## 1. Why the simple overlap can fail

The projected wall mass

\[
m_0=y\langle f_L,hf_R\rangle
\]

is exact only if the wall-mode subspace is invariant under multiplication by the Higgs profile. A constant transverse profile has this property when \(f_L=f_R\). A varying profile generally sends \(f\) partly into massive transverse modes.

The correction is not mysterious new physics. It is the same nested-doll operation already central to the programme: integrate out the bulk by a Schur complement.

## 2. Exact block identity

Let \(P\) project onto the two wall faces and \(Q=1-P\). For the full Hermitian wall/Higgs Hamiltonian \(H\), write

\[
H=
\begin{pmatrix}
H_{PP}&H_{PQ}\\
H_{QP}&H_{QQ}
\end{pmatrix}.
\]

Then the exact wall response is

\[
\boxed{
P(H-z)^{-1}P=
\left[
H_{PP}-z-
\Sigma(z)
\right]^{-1}},
\]

with

\[
\boxed{
\Sigma(z)=H_{PQ}(H_{QQ}-z)^{-1}H_{QP}.}
\]

Thus the overlap Hamiltonian \(H_{PP}\) is the first term, while \(\Sigma\) contains all virtual bulk-mode corrections.

## 3. Profile variance is the mixing parameter

For a common normalized wall profile \(f\) and a diagonal transverse Higgs profile \(h(w)\),

\[
\|Qhf\|^2
=\langle h^2\rangle_f-\langle h\rangle_f^2
\equiv \operatorname{Var}_f(h),
\]

where \(\langle a\rangle_f=\sum_w|f(w)|^2a(w)\). Hence

\[
\|H_{QP}P\|^2
\sim |y|^2\operatorname{Var}_f(h).
\]

The mean Higgs profile sets the leading mass; its weighted variance sets the leakage into the bulk. For constant \(h\), the variance and the Schur correction vanish exactly in the symmetric toy model.

## 4. Two useful bounds

For \(z=E+i\eta\), Hermiticity gives the universal bound

\[
\|\Sigma(z)\|
\leq \frac{\|H_{PQ}\|^2}{\eta}.
\]

This is useful for causal/Herglotz response but becomes loose near the real axis. If the unperturbed transverse bulk gap is \(\Delta\), the portal norm is \(v_H=\|yh\|_\infty\), and

\[
|E|<\Delta-v_H,
\]

then Weyl stability supplies the real-energy estimate

\[
\|\Sigma(E)\|
\leq
\frac{\|H_{PQ}\|^2}
{\Delta-v_H-|E|}.
\]

A controlled projected Dirac pole therefore requires both small profile variance and a denominator safely below the dressed bulk threshold.

## 5. Consequences for the research narrative

This separates three regimes:

1. **Flat-profile regime:** the wall subspace is invariant and the overlap Dirac Hamiltonian is exact.
2. **Adiabatic regime:** \(\Sigma\) is nonzero but bounded; it shifts the mass, residue and higher-derivative terms without destroying the isolated pole.
3. **Resonant regime:** the denominator approaches zero; wall and bulk modes hybridize, and a standalone \(H_2(\mathbb R)\) wall carrier is no longer an adequate closed description.

The third regime is not a failure of Jordan-triple recursion. It says the chosen two-face boundary was too small and must be enlarged before sewing.

## 6. Herglotz stability

The full resolvent of Hermitian \(H\) is matrix Herglotz for \(\operatorname{Im}z>0\). Compression by \(P\) remains Herglotz, and the Schur formula is exact. Consequently, bulk dressing cannot violate passivity when the complete self-energy is retained.

An arbitrary truncated series for \(\Sigma\), however, need not preserve positivity. Approximation schemes should therefore be tested at the response level, not merely by comparing pole locations.

## 7. Stop-everything and falsification gates

**Hierarchy trigger:** one common family of localization profiles predicts several observed Yukawa ratios through overlap and variance data with fewer free parameters than the Yukawa matrices.

**Carrier-enlargement trigger:** a necessary Standard-Model channel lies in the resonant regime, forcing additional bulk faces into the minimal Jordan carrier.

**Robustness gate:** the exact dressed pole remains isolated and positive for gauge-covariant, dynamically generated Higgs profiles.

**Falsifier of the overlap approximation:** \(|y|^2\operatorname{Var}_f(h)\) is not small relative to the squared dressed bulk separation, while the bare overlap formula is still used as though exact.

## 8. Certificate

The [inhomogeneous-Higgs Schur certificate](scripts/verify_inhomogeneous_higgs_schur_correction.mjs) builds a finite transverse model with one exact wall mode and three bulk modes per face, verifies the exact compressed-resolvent/Schur identity, proves numerically the profile-variance mixing identity, checks the upper-half-plane norm bound and confirms exact decoupling for a flat profile.

## Companion documents

- [Exact wall Yukawa Dirac pole](236_colocalized_wall_chiralities_and_higgs_portal_give_exact_dirac_pole.md)
- [Full one-generation Higgs/Yukawa covariance](237_full_one_generation_higgs_yukawa_portal_is_gauge_covariant.md)
- [Finite domain-wall Schur carrier](229_finite_domain_wall_resolvent_is_a_schur_herglotz_carrier.md)
- [Constant-kernel Ward sewing](215_constant_kernel_ward_herglotz_pseudoinverse_sewing.md)
