# Public Hadronic Input Closes the Low-Energy Branch, Not the UV Flavor Problem

**Date:** 23 October 2026

**Status:** scoped exhaustion certificate for the hadronic continuation

**Depends on:** [the universal match](1726_universal_light_quark_matching_suppresses_the_nucleon_torsion_portal.md) and [the general flavor map](1727_proton_and_neutron_dipole_channels_leave_one_light_quark_axial_direction_invisible.md)

**Evidence:** [path-selection ledger](../../../evidence/data/spin23-hadronic-path-selection-v4.json), [path-selection note](../../programmes/closure/spin23-gravity-route/global-path-selection-v4.md), and [verifier](../../../verification/verify/verify_spin23_hadronic_path_selection_v4.mjs)

## Result

The hadronic branch has two distinct achievements:

1. a conditional universal witness that converts \(c_q=1/8\) into
   \(c_p=c_n=0.049025\) and \(\sqrt A>70.026\) GeV at the published 2025
   electron-neutron point; and
2. the complete general linear map from \((c_u,c_d,c_s)\) to \((c_p,c_n)\),
   including proof of its one-dimensional invisible direction.

No additional numerical manipulation of those same two nucleon rows can
remove the kernel.  Unique light-flavor reconstruction needs a third
independent hadronic projection or a justified theory prior.

This closes the public, zero-momentum, locally executable matching branch.  It
does not close the UV problem.  Heavy-flavor thresholds, singlet/anomaly
running, and a predicted flavor relation all require Wilson coefficients,
scale, and scheme from a concrete broken-parent realization.  Treating those
missing inputs as though they followed from the low-energy critical action
would turn an assumption into a false prediction.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_hadronic_path_selection_v4.mjs
~~~
