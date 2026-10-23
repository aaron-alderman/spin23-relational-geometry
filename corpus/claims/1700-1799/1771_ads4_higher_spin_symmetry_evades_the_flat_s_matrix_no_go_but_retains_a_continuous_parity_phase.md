# AdS4 Higher-Spin Symmetry Evades the Flat-S-Matrix No-Go but Retains a Continuous Parity Phase

**Date:** 23 October 2026

**Status:** explicit nonstandard-asymptotic selector audit

**Depends on:** [the cross-sector symmetry classification](1770_cross_sector_symmetry_is_exhausted_at_supersymmetry_or_nonstandard_asymptotic_structure.md) and [the standard-positive bimetric boundary](1768_the_standard_positive_bimetric_route_ends_at_a_genuinely_new_cross_sector_principle.md)

**Evidence:** [higher-spin parity ledger](../../../evidence/data/spin23-ads4-higher-spin-parity-selector-audit-v1.json) and [verifier](../../../verification/verify/verify_spin23_ads4_higher_spin_parity_selector_audit.mjs)

## A genuine theorem-assumption escape

Interacting AdS higher-spin theory does not pretend to be a finite-species
flat-space model.  The Vasiliev/vector-model class contains an infinite tower
of higher-spin gauge fields together with a scalar, and its observables are
organized holographically rather than by the ordinary flat-space S matrix.
It therefore lies outside the finite-species/asymptotic assumptions used in
the preceding Coleman--Mandula classification.

## The escape is a family

The four-dimensional higher-spin equations admit parity-violating families.
Boundary Chern--Simons vector models supply the corresponding continuous
planar parameter.  In a common convention,

\[
 \theta_0={\pi N\over2k}={\pi\lambda\over2},
 \qquad \lambda={N\over k},
\]

with the precise dictionary dependent on normalization and boundary
conditions and fixed by parity-odd correlators.  Taking \(N,k\to\infty\) at
fixed \(N/k\) leaves \(\lambda\), and hence \(\theta_0\), continuous.

Finite witnesses \(N/k=1/8,1/4,1/2,3/4\) give
\(\theta_0/\pi=1/16,1/8,1/4,3/8\).  Special parity-preserving endpoints exist,
but higher-spin consistency does not restrict the theory to a unique one.

## The scalar is not yet torsion

The presence of a bulk scalar does not identify it with the independent
Lorentz-connection pseudoscalar of the critical PGT sector.  The higher-spin
construction currently supplies none of the required:

- field map to axial connection torsion;
- proof of the healthy massive longitudinal \(0^-\) pole;
- normalized coupling to the four-dimensional fermion axial current; or
- consistent truncation/decoupling map to the desired low-spin spectrum.

Even if a future dictionary related \(\eta\) to \(\theta_0\), the continuous
phase would relocate rather than eliminate the selector problem unless
additional boundary data fixed it.

## Sources

- M. A. Vasiliev, [*Higher Spin Gauge Theories: Star-Product and AdS Space*](https://arxiv.org/abs/hep-th/9910096), for the AdS higher-spin framework and its locality structure.
- J. Maldacena and A. Zhiboedov, [*Constraining conformal field theories with a slightly broken higher spin symmetry*](https://arxiv.org/abs/1204.3882), for the large-\(N\) higher-spin/vector-model families and their continuously parametrized correlators.
- C.-M. Chang, S. Minwalla, T. Sharma and X. Yin, [*ABJ Triality: from Higher Spin Fields to Strings*](https://arxiv.org/abs/1207.4485), for supersymmetric parity-violating AdS4 Vasiliev boundary conditions and the phase/correlator dictionary.
- O. Aharony, G. Gur-Ari and R. Yacoby, [*d=3 Bosonic Vector Models Coupled to Chern--Simons Gauge Theories*](https://arxiv.org/abs/1110.4382), for the continuously controlled large-\(N\) Chern--Simons deformation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_ads4_higher_spin_parity_selector_audit.mjs
~~~
