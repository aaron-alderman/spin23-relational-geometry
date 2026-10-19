# The Radial Pin Localizer Has an Open Center–Scale Phase, Not a Tuned Negative Point

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** finite open localizer phase established; real-index interpretation and continuum stability remain open

## 1. Why an open region matters

A single negative determinant can be produced by tuning the localizer center or
scale. A credible localizer phase must occupy an open region and can change only
when its reduced block becomes singular.

The radial candidate is

\[
\zeta_{\rm rad}(r,\kappa)
=\operatorname{sign}\det\left[
A_++\kappa(Q_+^T|Y|Q_+-rI)
\right].
\]

This document maps its two auxiliary parameters at \(\delta=1.25\).

## 2. Radial-center window

For both \((L,M)=(2,2)\) and \((4,2)\), with \(\kappa=0.2\), the reference
marker remains positive. The defect marker follows

\[
+1\quad(r\le0.3),
\qquad
-1\quad(0.4\le r\le0.8),
\qquad
+1\quad(r\ge0.9)
\]

on the sampled grid.

The center boundaries are not independent of scale. At the smaller system and
\(\kappa=0.4\), the negative region expands to include \(r=0.3\). The common
interior \(0.4\le r\le0.8\) is the robust statement; identical boundary
locations are not claimed.

At \((L,M)=(4,2)\), the defect localizer gaps are

| radial center | defect sign | defect gap |
|---:|---:|---:|
| 0.4 | -1 | 0.01880 |
| 0.5 | -1 | 0.03800 |
| 0.8 | -1 | 0.01025 |

The negative region has a resolved interior gap and smaller gaps toward both
sampled edges, as expected near localizer phase boundaries.

## 3. Localizer-scale window

At \(L=4,M=2,r=1/2\), the defect sign is positive at \(\kappa=0.006\), negative
at \(0.007\), remains negative through \(0.97\), and is positive at \(0.98\).
Thus the sampled finite phase occupies approximately

\[
\boxed{0.006<\kappa<0.98}.
\]

The scale endpoint behavior is structurally sensible.

As \(\kappa\to0\),

\[
\det[A_+]=\operatorname{Pf}(A_+)^2>0
\]

away from a Hamiltonian zero. The radial sign must therefore return to positive
through a low-scale closure.

At large \(\kappa\), the coordinate term dominates and the sign again becomes
positive in this finite sector. The observed upper closure is therefore also
required by the two limiting matrices rather than being an unexplained isolated
event.

## 4. Gap samples across scale

At the central radial point:

| \(\kappa\) | defect sign | defect gap |
|---:|---:|---:|
| 0.025 | -1 | 0.00409 |
| 0.2 | -1 | 0.03800 |
| 0.8 | -1 | 0.04611 |

The low-scale gap shrinks toward the required \(\kappa\to0\) closure, while the
interior remains well resolved.

## 5. Combined evidence

The radial candidate has now survived:

- a broad center interval;
- almost two decades of localizer scale;
- circumference enlargement;
- remote boundary masses through at least \(b=0.8\);
- comparison against reference, global-Pfaffian and twisted-coordinate false
  positives;
- explicit localizer-gap checks.

This makes accidental tuning unlikely in the tested finite family.

## 6. What the map does not prove

The map proves a homotopy component of finite invertible real matrices for the
chosen compressed radial coordinate. It does not by itself prove that this
component equals the physical Pin-defect real-index pairing.

Still required are:

1. a half-line or local-coefficient Fredholm module whose finite localizer is
   this matrix;
2. the normalization Pfaffian required by the skew-localizer theorem;
3. stability under admissible deformations of the radial function;
4. simultaneous \(L,M\) and regulator limits;
5. a proof that the index counts local mod-two spectral flow of one defect.

## 7. Interpretation of the center

The interval \(0.4\lesssim r\lesssim0.8\) sits between the defect row
\(|y|=0\) and the first neighboring rows \(|y|=1\). The localizer is therefore
placing a radial cut around the defect core. The sign change as the cut passes
through the neighboring shell is compatible with a localized obstruction.

This geometric reading is plausible but remains dependent on proving that
radial cuts represent the quotient's correct real cycle.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** derive the radial cut as the fundamental real
K-homology cycle of the Pin quotient and prove its determinant sign equals the
mod-two defect index.

**Tuning falsifier:** describe the result as one negative checkpoint rather than
the measured open center–scale region.

**Limit falsifier:** extend the negative phase through \(\kappa=0\), where the
determinant-square argument requires positive sign.

**Gap falsifier:** infer homotopy stability across either sampled boundary
without resolving the localizer-gap closure.

**Physical-index falsifier:** treat an open finite matrix phase as sufficient
proof of the continuum Pin-defect invariant.

## 9. Pinned dependency and continuation

The numerical tuning objection is now substantially answered. Pin the
topological interpretation at radial-function homotopy and the half-line
real-index construction.

The next executable step is to replace \(|Y|\) by a continuous family of
glide-even monotone radial functions and verify that the sign remains fixed
whenever the reduced-localizer gap stays open.

## 10. Certificate

The [radial phase-map certificate](scripts/verify_radial_localizer_has_open_center_scale_region.mjs)
checks center and scale brackets at both small and larger circumference and the
resolved central gap.

## Companion documents

- [Twisted-marker falsification and radial survival](398_the_twisted_sigma_y_marker_fails_the_remote_boundary_test_while_the_radial_marker_survives.md)
- [Radial Pin localizer construction](396_the_signed_class_d_localizer_does_not_descend_but_a_radial_pin_localizer_survives_the_boundary_test.md)
- [Finite Majorana partner accounting](379_a_finite_majorana_lattice_has_even_total_nullity_so_pin_defect_parity_must_be_relative_or_local.md)
