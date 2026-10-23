# The Xu Proton Point Is Analytically Recoverable but Weaker Than the Neutron Point

**Date:** 23 October 2026

**Status:** controlled same-apparatus reconstruction from published numerical inputs

**Depends on:** [the Xu neutron map](1724_the_2025_electron_neutron_dipole_limit_adds_independent_0minus_flavor_tomography.md) and [the nucleon flavor map](1727_proton_and_neutron_dipole_channels_leave_one_light_quark_axial_direction_invisible.md)

**Evidence:** [proton-point ledger](../../../evidence/data/spin23-xu-electron-proton-bound-map-v1.json) and [verifier](../../../verification/verify/verify_spin23_xu_electron_proton_bound_map.mjs)

## Reconstruction

Xu *et al.* publish a numerical electron-neutron point but show the
electron-proton result only as a curve.  Pixel digitization is unnecessary at
the quoted 30-microeV point.  Both interpretations use the same measured
field, electron-spin source, geometry and dipole potential.  The paper gives
the nuclear spin fractions

\[
\eta_n=0.58,\qquad \eta_p=0.04.
\]

Because the dipole potential is proportional to
\(g_p^eg_p^N/(m_em_N)\), the same field limit gives

\[
{L_{ep}\over L_{en}}={\eta_n\over\eta_p}{m_p\over m_n}=14.4800.
\]

Starting from \(L_{en}=2.4\times10^{-9}\), therefore,

\[
\boxed{|g_p^eg_p^p|\lesssim3.4752\times10^{-8}}
\qquad(m_\varphi\simeq30\ \mu{\rm eV},\ 95\%\ {m confidence}).
\]

This is a reconstruction from the rounded published spin fractions, not an
author-supplied table entry; the precision shown preserves reproducibility and
must not be interpreted as experimental significant figures.

## Spin(2,3) normalization

With \(g_p^f=y_f=2m_fc_f/\sqrt A\), the reconstructed point is

\[
\boxed{{A\over|c_ec_p|}>5.5186\times10^4\ {\rm GeV}^2},
\]

\[
{\sqrt A\over\sqrt{|c_ec_p|}}>234.92\ {\rm GeV},
\qquad
{B\over|c_ec_p|}>6.1318\times10^{31}.
\]

For the universal light-quark witness \(c_e=1/8\),
\(c_p=0.049025\), this becomes only

\[
\boxed{\sqrt A>18.390\ {\rm GeV}},
\qquad B>3.758\times10^{29}.
\]

The proton constraint has 1/14.5 of the neutron channel's reach in \(A\) for
equal effective nucleon coefficients.  Its value is therefore directional:
it displays the proton row under a one-coupling-at-a-time convention, but it
neither improves the universal benchmark nor removes the exact light-flavor
kernel.  Claim 1730 gives the required simultaneous-coupling interpretation:
the proton and neutron curves share one likelihood and are not independent.

## Source

- Z. Xu *et al.*,
  [*Constraints on Axion Mediated Dipole-Dipole Interactions*](https://link.aps.org/pdf/10.1103/PhysRevLett.134.181801),
  *Physical Review Letters* **134** (2025) 181801.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_xu_electron_proton_bound_map.mjs
~~~
