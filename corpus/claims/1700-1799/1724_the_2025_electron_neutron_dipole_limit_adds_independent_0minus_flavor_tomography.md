# The 2025 Electron-Neutron Dipole Limit Adds Independent 0-Minus Flavor Tomography

**Date:** 23 October 2026

**Status:** exact single-mass map of the published electron-neutron pseudoscalar product bound

**Depends on:** [the electron-electron laboratory map](1723_the_eotwash_dipole_limit_bounds_the_critical_0minus_electron_portal_directly.md) and [the fermion portal](../1600-1699/1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md)

**Evidence:** [mixed-flavor ledger](../../../evidence/data/spin23-xu-electron-neutron-bound-map-v1.json) and [verifier](../../../verification/verify/verify_spin23_xu_electron_neutron_bound_map.mjs)

## Result

The 2025 self-compensating-comagnetometer experiment of Xu *et al.* constrains
the same pseudoscalar dipole--dipole tensor structure as the critical \(0^-\)
torsion mode, now between source electrons and detector neutrons.  At a force
range of about 7 mm, corresponding to
\(m_\varphi\simeq30\,\mu\mathrm{eV}\), it reports

\[
\boxed{|g_p^eg_p^n|\le2.4\times10^{-9}}
\qquad(95\%\ {\rm confidence}).
\]

With \(g_p^f=y_f=2m_ff_f\) and \(f_f=c_f/\sqrt A\), this is

\[
|y_ey_n|={4m_em_n|c_ec_n|\over A}.
\]

Therefore

\[
\boxed{{A\over|c_ec_n|}>8.0019\times10^5\ {\rm GeV}^2},
\]

or

\[
{\sqrt A\over\sqrt{|c_ec_n|}}>894.54\ {\rm GeV}.
\]

Using \(B=A/m_\varphi^2\) at the quoted mass gives

\[
\boxed{{B\over|c_ec_n|}>8.8911\times10^{32}}.
\]

## Why this is complementary rather than stronger

The corresponding derivative-coupling product is

\[
|f_ef_n|<1.2497\times10^{-6}\ {\rm GeV}^{-2},
\]

so

\[
\sqrt{|f_ef_n|}<1.1179\times10^{-3}\ {\rm GeV}^{-1}.
\]

If one artificially sets the two effective coefficients equal, this common
coupling reach is about 154 times weaker than the electron--electron limit in
claim 1723.  The value of the newer result is instead flavor tomography: it
constrains \(c_ec_n\), whereas the torsion-pendulum result constrains
\(c_e^2\).

The effective neutron coefficient is not obtained by simply assigning
\(c_n=1/8\).  It is a matched nucleon axial coefficient built from quark
coefficients, nucleon spin fractions, and threshold running.  Consequently,
the mixed bound cannot yet be converted into a unique fundamental Spin(2,3)
coupling relation.

Under the special pseudo-Goldstone convention
\(g_p^e=m_e/F\), \(g_p^n=m_n/F\), the same point would give only

\[
F>447.27\ {\rm GeV},
\]

again showing why the electron--electron result dominates a universal
mass-proportional benchmark despite the 2025 experiment's major improvement
over previous mixed-flavor limits.

## Experimental inputs retained

The experiment used an iron-shielded SmCo5 source with
\(4.63\times10^{20}\) net electron spins and a K--Rb--\(^{21}\)Ne
comagnetometer.  From 80 hours of data it measured an exotic field
\(0.08\pm0.22_{\rm stat}\pm0.12_{\rm syst}\) fT.  Its electron--neutron
limit includes the reported neutron spin fraction and apparatus simulation.

The published result also supplies electron--proton constraints as a curve,
but not a single numerical point in the main text.  A precise proton map
therefore requires the authors' numerical limit table or a controlled
digitization; it is not inferred from the neutron number.

## Source

- Z. Xu *et al.*,
  [*Constraints on Axion Mediated Dipole-Dipole Interactions*](https://link.aps.org/pdf/10.1103/PhysRevLett.134.181801),
  *Physical Review Letters* **134** (2025) 181801.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_xu_electron_neutron_bound_map.mjs
~~~
