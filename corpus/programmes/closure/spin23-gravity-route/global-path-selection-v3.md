# Spin(2,3) Global Path Selection v3: Published Experimental Constraints

**Frozen:** 23 October 2026

## Reopening

Version 2 stopped at the apparatus-data boundary.  Version 3 uses primary
published null results as the supplied apparatus data, restricted to
experiments probing the same pseudoscalar dipole--dipole tensor operator.

| ID | Path | State | Result or blocker |
|---|---|---|---|
| EE | Electron--electron Eot-Wash plateau | completed | \(|y_e|<7.4162\times10^{-9}\) below 30 microeV |
| EN | 2025 electron--neutron point | completed | \(|y_ey_n|\le2.4\times10^{-9}\) near 30 microeV |
| U | EN as a stronger universal bound | rejected | common derivative-coupling reach is 154 times weaker than EE |
| FC | Reconstruct complete mass curves | externally blocked | numerical response tables or controlled digitization and full geometry |
| HM | Match neutron coefficient | externally blocked | quark coefficients, spin fractions and threshold running |
| UV | Predict rather than bound the portal | externally blocked | broken-parent values of \(A,B,c_f\) |

## Decision

The electron--electron result is the decisive direct laboratory bound for an
equal-effective-coupling or minimal electron benchmark.  The newer
electron--neutron result is valuable because it probes an independent flavor
product, not because it is numerically stronger in that benchmark.

The two null results constrain

\[
{A\over c_e^2}
\quad\hbox{and}\quad
{A\over|c_ec_n|},
\]

but do not determine \(c_n/c_e\): two upper limits cannot be divided to infer
a coupling ratio when either coupling may lie below its bound.

## Stopping status

The selected experimental reopening is exhausted at the level supported by
text-extractable primary numerical results.  Further direct work requires
author response tables or controlled curve digitization.  Physical
interpretation beyond effective coupling products requires hadronic or UV
matching not contained in the critical gravity action.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_terrano_electron_bound_map.mjs
node verification/verify/verify_spin23_xu_electron_neutron_bound_map.mjs
node verification/verify/verify_spin23_experimental_constraint_selection_v3.mjs
~~~
