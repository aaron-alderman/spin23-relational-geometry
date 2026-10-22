# Published Spin Experiments Bound Two 0-Minus Flavor Combinations but Do Not Select the Parent

**Date:** 23 October 2026

**Status:** decision closure of the published direct-laboratory reopening

**Depends on:** [the electron-electron map](1723_the_eotwash_dipole_limit_bounds_the_critical_0minus_electron_portal_directly.md) and [the electron-neutron map](1724_the_2025_electron_neutron_dipole_limit_adds_independent_0minus_flavor_tomography.md)

**Evidence:** [selection ledger](../../../evidence/data/spin23-experimental-constraint-selection-v3.json), [verifier](../../../verification/verify/verify_spin23_experimental_constraint_selection_v3.mjs), and [selector v3](../../programmes/closure/spin23-gravity-route/global-path-selection-v3.md)

## Result

Primary laboratory data now impose two independent constraints on the
critical \(0^-\) portal near the micro-eV scale:

\[
|y_e|<7.4162\times10^{-9}
\quad(m_\varphi<30\,\mu{\rm eV}),
\]

and

\[
|y_ey_n|\le2.4\times10^{-9}
\quad(m_\varphi\simeq30\,\mu{\rm eV}).
\]

Equivalently, they bound \(A/c_e^2\) and
\(A/|c_ec_n|\).  They do not determine \(c_n/c_e\), because both are null
upper limits and either underlying coupling may be arbitrarily smaller than
its bound.

For equal effective derivative couplings, the electron--electron experiment
is stronger by a factor of about 154 in the common coupling.  The 2025 mixed
result remains important because a nonuniversal parent could suppress
\(c_e\) relative to \(c_n\).

Neither result approaches the natural Planck-mass, Planck-suppressed benchmark:
that point has no laboratory-range Yukawa tail.  The experiments instead
exclude portions of deliberately light, strongly enhanced parameter space.

The next discriminating calculation is no longer another force-law
manipulation.  It is either:

1. hadronic matching from quark axial coefficients to \(c_n,c_p\);
2. full numerical experimental response tables for continuous exclusion
   curves; or
3. a broken Spin(2,3) parent predicting \(A,B,c_f\).

All three require inputs absent from the frozen action and repository.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_experimental_constraint_selection_v3.mjs
~~~
