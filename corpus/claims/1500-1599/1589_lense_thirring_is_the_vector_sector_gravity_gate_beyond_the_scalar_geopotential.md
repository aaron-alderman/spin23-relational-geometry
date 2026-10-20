# Lense–Thirring Is the Vector-Sector Gravity Gate Beyond the Scalar Geopotential

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A6, A7 and A8

**Status:** exact weak-field separation and Earth-orbit numerical witness; no unique Spin(2,3) prediction

**Depends on:** [the external-phenomena validation map](1588_eight_external_phenomena_define_typed_validation_lanes_not_one_spin23_explanation.md), [the Yang--Mills/QFT closure gate](1587_sakharov_t_yang_mills_and_vacuum_energy_form_a_joint_cosmological_qft_closure_gate.md), and [the causal-spectrum separation](1576_tachyons_superluminal_characteristics_and_warp_shortcuts_are_three_independent_admission_gates.md)

**Evidence:** [Lense--Thirring ledger](../../../evidence/data/spin23-lense-thirring-gravitomagnetic-gate.json) and [deterministic verifier](../../../verification/verify/verify_spin23_lense_thirring_gravitomagnetic_gate.mjs)

## Result

Lense--Thirring frame dragging tests a gravitational sector absent from a scalar geopotential model:

\[
\boxed{\text{mass multipoles }(g_{00})\quad\ne\quad\text{current dipole/frame dragging }(g_{0i}).}
\]

Earth's \(C_{\ell m},S_{\ell m}\) coefficients describe the gravitoelectric mass multipoles and their classical orbital perturbations. The angular momentum vector \(\mathbf J\) sources the gravitomagnetic/off-diagonal metric and spin-connection sector. A successful Spin(2,3) Cartan completion must recover both from one rotating-source solution.

## Orbital witness

For a satellite with semimajor axis \(a\) and eccentricity \(e\), the leading general-relativistic nodal rate is

\[
\dot\Omega_{\rm LT}={2GJ\over c^2a^3(1-e^2)^{3/2}}.
\]

The leading Newtonian quadrupole rate is

\[
\dot\Omega_{J_2}=-{3\over2}nJ_2\left({R\over a}\right)^2{\cos i\over(1-e^2)^2},
\qquad n=\sqrt{GM\over a^3}.
\]

Using a LAGEOS-like orbit,

\[
a=12{,}270\ \mathrm{km},\quad e=0.0045,\quad i=109.84^\circ,
\]

and standard Earth parameters gives

\[
\dot\Omega_{\rm LT}\simeq30.67\ \mathrm{mas/yr},
\]

whereas the raw \(J_2\) contribution is approximately

\[
\dot\Omega_{J_2}\simeq4.5032\times10^8\ \mathrm{mas/yr}.
\]

Thus

\[
\left|{\dot\Omega_{J_2}\over\dot\Omega_{\rm LT}}\right|\simeq1.4683\times10^7.
\]

Frame dragging is therefore not read directly from a generic node drift. Satellite combinations, long orbit determination, geopotential covariance, tides, thermal recoil, drag and station/systematic models must suppress a classical signal more than seven orders of magnitude larger.

## Independent gyroscope check

Gravity Probe B reported frame-dragging drift \(-37.2\pm7.2\ \mathrm{mas/yr}\) against the GR prediction \(-39.2\ \mathrm{mas/yr}\), together with geodetic drift \(-6601.8\pm18.3\ \mathrm{mas/yr}\) against \(-6606.1\). The frame-dragging value is about \(0.28\) quoted standard deviations from the GR prediction.

This is a real weak-field observation. It is not unique evidence for a Spin(2,3) formulation because ordinary GR, tetrad GR and several gauge/Cartan reformulations share the same solution at this order.

## Path back to Spin(2,3)

The Cartan connection introduced in claim 1587 is

\[
\mathcal A={1\over2}\omega^{ab}J_{ab}+{1\over\ell}e^aJ_{a4}.
\]

Lense--Thirring makes its missing physical task precise. The programme must:

1. specify the Spin(2,3)-breaking action rather than only the connection;
2. couple a conserved rotating stress-energy source;
3. solve for the stationary coframe and spin connection;
4. derive the \(g_{0i}\) or equivalent spin-connection holonomy coefficient;
5. show whether torsion, portal fields or selector dynamics add new radial, inclination or composition dependence; and
6. fit those corrections jointly with the same \(J_2,J_4,\ldots\), tidal and non-gravitational nuisance model used in the measurement.

Agreement with GR is a necessary recovery test, not a distinctive prediction. A programme-shifting result would be a protected relation between the scalar and vector gravitational responses, or a small parameter-free deviation still allowed by Earth, pulsar and strong-field measurements.

## T-symmetry distinction

A rotating source selects a state with \(\mathbf J\ne0\). Under microscopic time reversal, \(\mathbf J\to-\mathbf J\) and the frame-dragging sense reverses. The classical field equations can remain T invariant while mapping the rotating solution to its oppositely rotating partner. Consequently,

\[
\boxed{\text{frame dragging is not microscopic T violation}.}
\]

This is the gravitational analogue of the distinction in claim 1587 between an oriented state or historical arrow and an antiunitary symmetry violation.

## Consequences

- The geopotential harmonic model is an indispensable nuisance model for Earth-based frame-dragging tests, not a competing explanation.
- Satellite orbital planes and gyroscope spin axes probe complementary forms of the same gravitomagnetic sector.
- Pulsar spin-orbit precession can turn the effect into a neutron-star moment-of-inertia and equation-of-state probe.
- Strong-field disk/jet precession is potentially sensitive to Kerr dragging, but its astrophysical interpretation is more model dependent.
- Connection holonomy alone is not a portal, wormhole or faster-than-light channel; it is ordinary transport in curved spacetime.

## Sources

- [Gravity Probe B final results](https://arxiv.org/abs/1105.3456)
- [LARES/LAGEOS with a GRACE gravity model](https://pmc.ncbi.nlm.nih.gov/articles/PMC4946852/)
- [Improved LARES/LAGEOS frame-dragging test](https://doi.org/10.1007/s10052-019-7386-z)
- [NASA satellite-laser-ranging time-variable gravity](https://earth.gsfc.nasa.gov/geo/data/slr)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_lense_thirring_gravitomagnetic_gate.mjs
~~~
