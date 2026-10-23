# Universal Light-Quark Matching Suppresses the Nucleon Torsion Portal

**Date:** 23 October 2026

**Status:** conditional hadronic matching witness, not a Spin(2,3) prediction

**Depends on:** [the 2025 electron-neutron map](1724_the_2025_electron_neutron_dipole_limit_adds_independent_0minus_flavor_tomography.md) and [the generic fermion portal](../1600-1699/1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md)

**Evidence:** [matching ledger](../../../evidence/data/spin23-universal-light-quark-nucleon-matching-v1.json) and [verifier](../../../verification/verify/verify_spin23_universal_light_quark_nucleon_matching.mjs)

## Result

For quark axial coefficients renormalized in one consistent convention, the
zero-momentum nucleon coefficient is

\[
c_N=\sum_{q=u,d,s}c_q\,\Delta q_N.
\]

The physical-point lattice calculation of Alexandrou *et al.* gives the
renormalized proton charges

\[
\Delta u=0.862(17),\qquad
\Delta d=-0.424(16),\qquad
\Delta s=-0.0458(73).
\]

Consequently, under the explicit benchmark assumption

\[
c_e=c_u=c_d=c_s={1\over8},
\]

the light-flavor singlet and matched coefficients are

\[
\Delta\Sigma_{uds}=0.3922,
\qquad
\boxed{c_p=c_n={1\over8}\Delta\Sigma_{uds}=0.049025}.
\]

The equality of proton and neutron coefficients follows only for universal
light-flavor coefficients: isospin interchanges the up and down charges but
leaves their sum unchanged.  The negative down and strange spin fractions
make the nucleon coefficient only 39.22 percent of the elementary benchmark.

Naively adding the quoted single-flavor uncertainties in quadrature gives
\(\Delta\Sigma_{uds}=0.3922\pm0.0245\) and
\(c_N=0.04903\pm0.00306\).  This uncertainty is illustrative because the
published covariance has not been propagated here.

## Propagated 2025 bound

At the Xu *et al.* point, the published limit
\(|y_ey_n|\le2.4\times10^{-9}\) then gives

\[
|c_ec_n|=0.006128125,
\]

and therefore

\[
\boxed{A>4.9037\times10^3\ {\rm GeV}^2},\qquad
\boxed{\sqrt A>70.026\ {\rm GeV}},
\]

\[
\boxed{B>5.4485\times10^{30}}
\qquad(m_\varphi\simeq30\ \mu{\rm eV}).
\]

If \(A=M_{\rm Pl,red}^2\delta/24\), this conditional point corresponds to
\(\delta>1.985\times10^{-32}\).  It is nowhere near a natural Planck-scale
normalization.

The mass-weighted pseudoscalar couplings obey

\[
{y_n\over y_e}={m_n\over m_e}{c_n\over c_e}=721.13.
\]

Saturating the product bound would give \(|y_e|<1.824\times10^{-6}\), far
weaker than the direct electron-electron limit
\(|y_e|<7.416\times10^{-9}\).  Hadronic matching therefore strengthens the
reason to treat the mixed channel as flavor tomography rather than the leading
minimal-benchmark constraint.

## Boundary

This result does **not** derive universal quark coefficients from the broken
Spin(2,3) parent.  It also does not perform singlet-current running, heavy-quark
threshold matching, or anomaly matching.  Those operations require UV Wilson
coefficients and a declared renormalization convention.  The present result is
the simplest controlled low-energy witness: *if* the light-quark coefficients
are universal and equal to the elementary \(1/8\) convention, this is their
nucleon image.

## Source

- C. Alexandrou *et al.*,
  [*Nucleon axial, tensor and scalar charges and sigma-terms in lattice QCD*](https://arxiv.org/abs/1909.00485),
  *Physical Review D* **102** (2020) 054517.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_universal_light_quark_nucleon_matching.mjs
~~~
