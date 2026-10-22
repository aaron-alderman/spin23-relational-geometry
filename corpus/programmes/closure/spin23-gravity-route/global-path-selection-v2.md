# Spin(2,3) Global Path Selection v2: Phenomenology Reopening

**Frozen:** 23 October 2026

## Reopening

Version 1 ended with low-energy phenomenology blocked by the absence of a
chosen observable and finite matching.  The observable choice has now been
supplied constructively: a dual-orientation polarized electron source and
detector targeting the critical \(0^-\) Yukawa tensor force.

The path selector advanced every downstream node that does not require an
actual apparatus or new UV theory.

| ID | Node | State | Result or blocker |
|---|---|---|---|
| O | Dual-orientation observable | completed | coupling-free mass ratio plus absolute-coupling channel |
| S | Uniform-sphere finite size | completed | exact common Yukawa form factor; mass ratio preserved |
| V | Arbitrary geometry | completed | executable voxel response tensor and SI normalization |
| D | Apparatus likelihood | externally blocked | spin map, modulation, noise and backgrounds required |
| M | UV inverse matching | externally blocked | finite \(c_e,A,B\) prediction required |
| U | Protecting parent | externally blocked | explicit action or Ward identity required |
| N | Nonperturbative completion | externally blocked | regulator, continuum and positivity required |

## Selection result

The chosen path produced three new exact or executable layers:

1. \(\rho=-U_R/U_T=x+1+(x+1)^{-1}\) determines \(m_\varphi\) independently
   of the unknown force normalization;
2. two uniform non-overlapping spheres multiply both channels by
   \(F(mR_1)F(mR_2)\), so the ratio survives finite size exactly; and
3. arbitrary rigid-polarization voxel maps now produce the full response
   tensor \(G_{ij}(m)\) and joules per \(y_e^2\).

The next numerical exclusion or forecast cannot be selected from theory.  It
requires measured apparatus inputs.  Likewise, translating \((m_\varphi,y_e)\)
into separate \((c_e,A,B)\) values requires broken-phase UV matching.

## Current stopping status

Global exhaustion is again true for the enlarged local-data frontier.  This
does not undo the conditional nature of the original result.  It means that
the phenomenology branch has been carried from a generic potential to the
boundary of an experimental likelihood, and every remaining decision node
now names the external object that would reopen it.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_polarized_electron_observable.mjs
node verification/verify/verify_spin23_polarized_sphere_form_factor.mjs
node verification/verify/verify_spin23_polarized_geometry_response.mjs
node verification/verify/verify_spin23_phenomenology_reopening_selection_v2.mjs
~~~
