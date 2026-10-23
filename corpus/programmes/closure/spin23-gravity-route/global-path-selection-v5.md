# Spin(2,3) Global Path Selection v5: Coherent Nuclear Response

**Frozen:** 23 October 2026

## Reopening and correction

Version 4 treated a numerical electron-proton curve as a possible second
nucleon input.  The 30-microeV proton point is analytically recoverable from
the published \(^{21}\mathrm{Ne}\) spin fractions, but the deeper result is
that the proton and neutron curves share one likelihood.  They are alternative
one-coupling projections of one coherent nuclear response.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| EP | Xu proton point | completed | \(|y_ey_p|\lesssim3.4752\times10^{-8}\) at 30 microeV |
| JX | Simultaneous Xu response | completed | \(c_n+0.0689655c_p\); blind line \(c_p=-14.5c_n\) |
| 2I | Add \(^{129}\mathrm{Xe}\) direction | completed | rank two, but 2.204-degree separation and \(\kappa=52.38\) |
| 2C | Precision two-isotope inversion | externally blocked | joint numerical likelihoods and nuclear covariance |
| H3 | Third quark projection | externally blocked | observable outside the proton-neutron span |
| UV | Parent flavor prediction | externally blocked | matched UV Wilson coefficients |

## Decision

For simultaneous torsion coefficients the Xu experiment constrains

\[
{A\over|c_e|\,|c_n+0.0689655c_p|}
>8.00195\times10^5\ {\rm GeV}^2.
\]

Under the positive universal benchmark, proton and neutron contributions add
and revise the conditional result to \(\sqrt A>72.401\) GeV.  For general
coefficients they can cancel exactly.

The existing \(^{129}\mathrm{Xe}\) experiment supplies a different isotope
direction in principle.  With a selected detailed shell-model spin fraction,
the neon-xenon response matrix is full rank, but its condition number 52.38
makes inversion highly sensitive to experimental and nuclear-model errors.

## Stopping status

The selected public experimental-hadronic route is exhausted at reproducible
numerical depth.  A defensible next calculation cannot be obtained by dividing
published upper-limit curves.  It requires common-mass joint likelihoods or
response tables and nuclear-spin covariance.  Even successful nucleon
tomography leaves the exact third light-quark direction for a new observable or
UV flavor relation.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_xu_electron_proton_bound_map.mjs
node verification/verify/verify_spin23_xu_simultaneous_nucleon_coupling_map.mjs
node verification/verify/verify_spin23_two_isotope_nucleon_tomography.mjs
node verification/verify/verify_spin23_experimental_hadronic_path_selection_v5.mjs
~~~
