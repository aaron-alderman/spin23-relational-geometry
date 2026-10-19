# The Radial Marker Survives a Gapped Homotopy from Absolute Distance to Quadratic Distance

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** finite radial-function homotopy established with nonzero gaps; half-line real-index theorem remains open

> **Width-scaling correction:** the edge-normalized endpoint \(y^2/M\) changes
> sign for \(M\ge3\). The gapped result below is valid at \(M=2\), not uniform in
> width. The locally normalized replacement \(y^2\) remains negative and gapped
> through \(M=6\); see [Local radial normalization, not remote-edge normalization, controls the Pin-localizer limit](401_local_radial_normalization_not_remote_edge_normalization_controls_the_pin_localizer_limit.md).

## 1. The nonsmooth-fold objection

The radial candidate was initially built from \(|Y|\). Although that operator
is glide even, it has a cusp at the defect row. A determinant sign tied only to
that particular fold would be weak evidence for a geometric quotient index.

The next test deforms absolute distance into a smooth quadratic radial
coordinate.

## 2. Admissible homotopy

For \(M>0\), define

\[
f_t(y)=(1-t)|y|+t\frac{y^2}{M},
\qquad 0\le t\le1.
\]

Every member is:

- real and glide even;
- nonnegative and monotone in \(|y|\);
- zero at the defect row;
- equal to \(M\) on the outer rows;
- diagonal in position space and particle-hole even.

The reduced radial block is

\[
B_t=A_++\kappa\left(Q_+^Tf_t(Y)Q_+-rI\right).
\]

## 3. Signs along the path

At

\[
(L,M)=(4,2),\quad \delta=1.25,\quad
\kappa=0.2,\quad r=1/2,
\]

the reference and defect signs remain

\[
\zeta_t^{\rm ref}=+1,
\qquad
\zeta_t^{\rm def}=-1
\]

for every sampled \(t=0,0.25,0.5,0.75,1\).

The same signs persist at \(t=0,0.5,1\) after adding remote boundary mass
\(b=0.5\), which lies inside the interval that falsified the twisted
\(\sigma_y\) determinant.

## 4. The path stays gapped

With zero boundary mass, the sampled gaps are

| \(t\) | reference gap | defect gap |
|---:|---:|---:|
| 0 | 0.21212 | 0.03800 |
| 0.25 | 0.20501 | 0.04314 |
| 0.5 | 0.19781 | 0.04198 |
| 0.75 | 0.19052 | 0.03159 |
| 1 | 0.18319 | 0.02018 |

At boundary mass \(b=0.5\), the defect gaps at \(t=0,0.5,1\) are approximately

\[
0.03547,\qquad0.03548,\qquad0.02204.
\]

No sampled point approaches a closure closely enough to make the constant sign
numerically ambiguous.

## 5. Consequence

The radial obstruction does not depend on the cusp of \(|Y|\). Absolute and
quadratic distance lie in the same tested component of invertible reduced
localizers, both with and without the remote boundary perturbation.

This answers one of the explicit dependencies in the previous checkpoint:
there exists at least one nontrivial admissible radial-function homotopy that
preserves the sign and gap.

## 6. What is still unproved

A sampled path is not the full space of admissible radial functions. Nor does
finite-matrix homotopy alone identify the determinant with the desired
real-index pairing.

The remaining mathematical questions are:

1. whether every monotone glide-even radial function with the same endpoints
   can be connected without closing the localizer gap;
2. what normalization factor compares this determinant with the trivial radial
   Dirac operator;
3. whether the radial coordinate defines a half-line real Fredholm module or a
   local-coefficient cycle on the nonorientable quotient;
4. whether the resulting index equals mod-two defect spectral flow.

## 7. Relation to the orientation line

The successful homotopy uses no chosen internal orientation factor. It works
with a scalar function on the quotient itself. This may explain why it is more
boundary-stable than the twisted signed coordinate: it measures radial
separation of the defect from its environment without attempting to choose a
global sign of the orientation line.

The Furey \(\sigma_y\) relationship may still act on states or intertwiners,
while the topological cycle is supplied by the quotient radius. These roles
should not be conflated.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** prove that the quotient radius defines the relevant
real K-homology cycle and that the gapped finite homotopy converges to its
mod-two index.

**Cusp falsifier:** claim that the radial sign is an artifact of \(|Y|\) after
the explicit gapped deformation to \(Y^2/M\).

**Universality falsifier:** infer stability under all radial functions from one
linear homotopy.

**Index falsifier:** treat connected finite determinant signs as sufficient to
identify the continuum real pairing without its normalization and Fredholm
module.

## 9. Pinned dependency and continuation

Pin the theorem, not the numerical radial branch. The next constructive path is
to formulate the quotient as a half-line problem with fiber multiplicity and
derive the real class-D localizer directly on that half-line. In parallel, test
larger transverse width to see whether the radial gap remains nonzero.

## 10. Certificate

The [radial-function homotopy certificate](../../../verification/verify/verify_radial_function_homotopy_stays_gapped.mjs)
checks signs and gaps at both endpoint functions, their midpoint, and two remote
boundary conditions.

## Companion documents

- [Open radial center-scale phase](../0300-0399/399_the_radial_pin_localizer_has_an_open_center_scale_phase_not_a_tuned_negative_point.md)
- [Twisted-marker falsification](../0300-0399/398_the_twisted_sigma_y_marker_fails_the_remote_boundary_test_while_the_radial_marker_survives.md)
- [Radial Pin localizer construction](../0300-0399/396_the_signed_class_d_localizer_does_not_descend_but_a_radial_pin_localizer_survives_the_boundary_test.md)
