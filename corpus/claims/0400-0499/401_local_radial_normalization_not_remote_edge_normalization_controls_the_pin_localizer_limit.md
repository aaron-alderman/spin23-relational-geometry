# Local Radial Normalization, Not Remote-Edge Normalization, Controls the Pin-Localizer Limit

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** finite-width correction and convergent local-coordinate evidence; half-line real-index theorem remains open

## 1. The width test corrects the first homotopy

At transverse half-width \(M=2\), the path

\[
(1-t)|y|+t\frac{y^2}{M}
\]

stays gapped. That result is correct for the tested lattice, but it does not
survive width enlargement at its quadratic endpoint.

At \(t=1\), the defect marker for \(y^2/M\) is

| \(M\) | defect sign | defect gap |
|---:|---:|---:|
| 2 | -1 | 0.01792 |
| 3 | +1 | 0.00489 |
| 4 | +1 | 0.02014 |

For \(M=3\), the homotopy closes near

\[
t\approx0.93784.
\]

For \(M=4\), the closure already lies between \(t=0.7\) and \(0.8\). Thus the
edge-normalized quadratic endpoint is not in a width-stable component with
absolute distance.

## 2. Why edge normalization is the wrong limit

The function

\[
f_M(y)=\frac{y^2}{M}
\]

is normalized by the remote boundary, since \(f_M(M)=M\). But its first-shell
radius is

\[
f_M(1)=\frac1M\longrightarrow0.
\]

At fixed radial cut \(r=1/2\), the local metric near the defect collapses as the
outer edge is moved away. The family is not a fixed local coordinate on an
increasing half-line; its geometry changes with system size.

The observed sign change is therefore informative rather than pathological. It
rejects remote-edge normalization as part of the admissible continuum limit.

## 3. Locally normalized quadratic distance

Use instead

\[
g(y)=y^2,
\]

which preserves

\[
g(0)=0,
\qquad
g(1)=1
\]

at every width. It is glide even, smooth, proper on a half-line and independent
of the remote edge.

The homotopy

\[
g_t(y)=(1-t)|y|+t y^2
\]

preserves reference \(+1\), defect \(-1\) at \(t=0,1/2,1\) for every tested
\(M=2,3,4\).

## 4. Width convergence

At the locally normalized quadratic endpoint:

| \(M\) | reference sign | defect sign | reference gap | defect gap |
|---:|---:|---:|---:|---:|
| 2 | +1 | -1 | 0.21959 | 0.03207 |
| 3 | +1 | -1 | 0.21932 | 0.03236 |
| 4 | +1 | -1 | 0.21932 | 0.03237 |
| 5 | +1 | -1 | 0.21932 | 0.03237 |
| 6 | +1 | -1 | 0.21932 | 0.03237 |

The defect gap converges rapidly to approximately

\[
0.03236596.
\]

The equality of the displayed \(M=4,5,6\) values at this precision is strong
evidence that the radial localizer is insensitive to sufficiently remote rows.

## 5. Revised admissible-coordinate principle

The evidence supports a sharper condition for radial-coordinate homotopies:

> Preserve the local coarse geometry near the radial cut as volume grows; do
> not normalize the coordinate using a boundary that is being sent to infinity.

This is exactly the distinction expected in a half-line Fredholm module. The
coordinate operator is fixed while finite-volume restrictions expand. One does
not rescale the unbounded coordinate to the current box.

## 6. Correction to the previous checkpoint

The previous document proved a gapped homotopy at \(M=2\); it did not prove
width-uniform homotopy stability. The stronger extrapolation is withdrawn.

The valid replacement is:

- edge-normalized \(y^2/M\): finite-width path only, rejected for the large-width
  limit;
- locally normalized \(y^2\): gapped, sign-stable and rapidly convergent over
  \(M=2\) through \(6\).

## 7. Computational scaling correction

The first \(M=6\) run exposed a JavaScript argument-stack overflow in a
spread-based dense-matrix maximum. Replacing that operation with an iterative
maximum removed the software ceiling. The rerun completed and produced the
converged values above.

This was a computational implementation limit, not a spectral closure.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** identify the locally normalized quotient radius as
the unbounded operator of the relevant real Fredholm module and prove the
finite-volume determinant converges to its mod-two pairing.

**Normalization falsifier:** use a volume-dependent coordinate whose first-shell
scale vanishes, then interpret its sign drift as failure of local topology.

**Homotopy falsifier:** cite the \(M=2\) edge-normalized homotopy as uniform after
the explicit \(M=3,4\) closures.

**Convergence falsifier:** infer a continuum index solely from numerical gap
convergence without proving the real pairing.

**Software falsifier:** interpret an argument-stack exception as a physical
large-width obstruction.

## 9. Pinned dependency and continuation

The finite-width radial branch is now considerably sharper. Pin the final index
claim at the half-line real Fredholm module and normalization formula.

The next mathematical step is to write the quotient sector directly as fibers
over \(r=0,1,2,\ldots\), identify the finite-volume compression as the first
\(M+1\) fibers, and determine whether the determinant sign needs the reference
factor appearing in the skew-localizer theorem.

## 10. Certificate

The [local-normalization certificate](../../../verification/verify/verify_radial_local_normalization_controls_width_stability.mjs)
checks failure of \(y^2/M\), survival and gap convergence of \(y^2\), and the
large-width dense-matrix execution path.

## Companion documents

- [Finite gapped absolute-to-quadratic homotopy](400_the_radial_marker_survives_a_gapped_homotopy_from_absolute_distance_to_quadratic_distance.md)
- [Open radial center-scale phase](../0300-0399/399_the_radial_pin_localizer_has_an_open_center_scale_phase_not_a_tuned_negative_point.md)
- [Radial Pin localizer construction](../0300-0399/396_the_signed_class_d_localizer_does_not_descend_but_a_radial_pin_localizer_survives_the_boundary_test.md)
