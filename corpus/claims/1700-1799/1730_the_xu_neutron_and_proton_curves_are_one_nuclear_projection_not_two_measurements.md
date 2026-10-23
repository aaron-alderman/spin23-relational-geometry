# The Xu Neutron and Proton Curves Are One Nuclear Projection, Not Two Measurements

**Date:** 23 October 2026

**Status:** simultaneous-coupling correction to the one-coupling-at-a-time maps

**Depends on:** [the neutron point](1724_the_2025_electron_neutron_dipole_limit_adds_independent_0minus_flavor_tomography.md), [the proton reconstruction](1729_the_xu_proton_point_is_analytically_recoverable_but_weaker_than_the_neutron_point.md), and [the hadronic map](1727_proton_and_neutron_dipole_channels_leave_one_light_quark_axial_direction_invisible.md)

**Evidence:** [joint-coupling ledger](../../../evidence/data/spin23-xu-simultaneous-nucleon-coupling-map-v1.json) and [verifier](../../../verification/verify/verify_spin23_xu_simultaneous_nucleon_coupling_map.mjs)

## Correction

The published electron-neutron and electron-proton curves are not independent
measurements.  They reinterpret the same comagnetometer time series by setting
the other nucleon coupling to zero.  If both couplings are present, the signal
constrains the coherent nuclear combination

\[
\left|y_e\left[y_n+{\eta_p\over\eta_n}{m_n\over m_p}y_p\right]\right|
\le2.4\times10^{-9},
\]

where \(\eta_n=0.58\) and \(\eta_p=0.04\).

For the torsion normalization \(y_f=2m_fc_f/\sqrt A\), the fermion masses
cancel inside the nuclear response:

\[
\boxed{
{A\over |c_e|\,|c_n+0.0689655c_p|}
>8.00195\times10^5\ {\rm GeV}^2 }.
\]

There is an exact blind line

\[
\boxed{c_p=-14.5c_n},
\]

or, in pseudoscalar couplings, \(y_p=-14.4800y_n\).  Along this line proton
and neutron amplitudes cancel in this apparatus.

## Quark-level projection

Using the matched proton and neutron rows, this one experiment measures

\[
\eta_nc_n+\eta_pc_p
=-0.21144c_u+0.48300c_d-0.028396c_s.
\]

Its hadronic response therefore has rank one, not rank two.  Plotting separate
one-at-a-time neutron and proton exclusion curves does not change that rank.

## Revised universal witness

For the positive universal light-quark benchmark
\(c_p=c_n=0.049025\), the two nuclear contributions add.  The correct joint
interpretation gives

\[
\boxed{A>5.2419\times10^3\ {\rm GeV}^2},
\qquad
\boxed{\sqrt A>72.401\ {\rm GeV}},
\]

and \(B>5.8243\times10^{30}\).  This is only 3.39 percent stronger in
\(\sqrt A\) than the neutron-only convention and remains much weaker than the
direct electron-electron constraint.

## Implication

The experiment supplies genuine electron-versus-nuclear flavor information,
but it does not separately determine proton and neutron couplings.  A second
nuclear target with a different \(\eta_p/\eta_n\) ratio is required even to
span the two-dimensional nucleon space.  A third independent quark-level
projection or a theory prior is still required to determine three light-quark
coefficients.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_xu_simultaneous_nucleon_coupling_map.mjs
~~~
