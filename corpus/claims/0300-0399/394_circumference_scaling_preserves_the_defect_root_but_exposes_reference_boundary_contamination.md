# Circumference Scaling Preserves the Defect Root but Exposes Reference-Boundary Contamination

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** explicit finite-size correction checkpoint; a boundary-free or local invariant is now required

## 1. Why circumference scaling was decisive

Transverse-width scaling showed that the Pfaffian root above the causal
checkpoint carries a defect-localized zero pair. That was necessary but not
sufficient. A mode can be localized in the open direction and still delocalize
around the periodic circumference, while the reference system can acquire its
own boundary crossing.

The next calculation therefore holds

\[
M=2,\qquad r=m_0=0.8,\qquad \mu=0.7
\]

and increases the half-circumference parameter \(L\).

## 2. The defect root is stable and increasingly core-enhanced

The upper defect-Pfaffian root is

| \(L\) | defect root | core weight | uniform core baseline | edge weight | effective sites / total |
|---:|---:|---:|---:|---:|---:|
| 2 | 1.263992 | 0.3399 | 0.1000 | 0.1010 | 10.79 / 20 |
| 3 | 1.261130 | 0.3118 | 0.0667 | 0.1049 | 13.80 / 30 |
| 4 | 1.257363 | 0.2843 | 0.0500 | 0.1099 | 16.54 / 40 |

The root varies by less than \(0.007\) across all three circumferences. The raw
core fraction falls as the two defects separate, but its enhancement above a
uniform state grows from approximately \(3.4\) to \(5.7\). More than half the
weight remains on the central row, and the occupied fraction of the full
lattice decreases.

This supports a finite localization length around each defect. It does not yet
prove saturation as \(L\to\infty\), since the effective number of sites still
grows over these small circumferences.

## 3. The uncomfortable result at \(L=4,M=2\)

At \(L=4,M=2\), a reference Pfaffian root appears extremely close to the defect
root:

\[
\delta_{\rm ref}\approx1.250488,
\qquad
\delta_{\rm def}\approx1.257363.
\]

The resulting nontrivial relative-Pfaffian interval is only

\[
\boxed{1.250488\lesssim\delta\lesssim1.257363}.
\]

Direct sign checks give

\[
\mathcal Q_{\rm rel}(1.25)=+1,\qquad
\mathcal Q_{\rm rel}(1.254)=-1,\qquad
\mathcal Q_{\rm rel}(1.26)=+1.
\]

Therefore the normalized causal checkpoint \(\delta=1.25\) is trivial at this
size. It lies just below the interval by approximately

\[
1.250488-1.25\approx4.88\times10^{-4}.
\]

The earlier statement that the checkpoint had survived the tested size
enlargements remains historically correct for \((L,M)=(3,1)\) and \((2,2)\),
but it must not be promoted to general size robustness.

## 4. The two roots have different spatial identities

The close roots are not the same type of state.

### 4.1 Reference root

At \(\delta_{\rm ref}\):

- \(73.5\%\) of the zero-pair weight lies on the two open outer edges;
- only \(2.08\%\) lies on the central row;
- the density is uniform over all eight circumference sites.

This is an outer-boundary mode of the reference system.

### 4.2 Defect root

At \(\delta_{\rm def}\):

- \(52.3\%\) lies on the central row;
- \(28.4\%\) lies on the two defect-core sites;
- only \(11.0\%\) lies on the outer edges;
- its circumference profile peaks sharply at the two defect positions.

This is the defect-localized crossing tracked from smaller systems.

The narrow relative interval is therefore produced by the ordering of a
reference boundary transition and a defect transition. It is not evidence that
the defect state itself disappeared.

## 5. Correction to the invariant strategy

The finite relative Pfaffian

\[
\operatorname{sgnPf}(A_{\rm ref})
\operatorname{sgnPf}(A_{\rm def})
\]

is only as clean as its reference. With open transverse boundaries, a
reference edge mode can flip the comparison sign and create or destroy a narrow
interval unrelated to the local defect core.

The programme must now separate three objects:

1. the local defect spectral flow;
2. the outer-boundary spectral flow;
3. the global finite-volume relative Pfaffian.

The third cannot substitute for the first when the second is active.

## 6. Best next formulations

The highest-value repairs are:

1. a local mod-two spectral-flow index obtained from the defect-region spectral
   projector;
2. a scattering/reflection-matrix invariant evaluated through a contour around
   one defect;
3. a reference with matched and spectrally inert outer boundaries;
4. a periodic transverse regulator with a separated defect/antidefect pair;
5. an infinite-strip transfer-matrix calculation that removes outer edges.

These are alternative branches. The local-projector and transfer-matrix paths
are the most direct because the zero-pair localization data already identify a
spatial separation between defect and edge states.

## 7. Consequence for the causal-kernel bridge

The equality \(\delta=5/4\) remains an exact algebraic result of the normalized
causal kernel, but its claimed physical compatibility is size- and
boundary-condition dependent. It agrees closely with the observed transition
scale, yet at \(L=4,M=2\) it lands just outside the global relative phase.

This is not a prediction and no longer qualifies as a size-robust phase
checkpoint. A meaningful comparison must use the repaired local or
boundary-free invariant and must match the remaining normalized parameters as
well as \(\delta\).

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a boundary-free local mod-two invariant changes at
the stable defect root near \(1.26\), and the fully normalized causal source
lands on a protected side without fitting.

**Reference falsifier:** the open-boundary reference Pfaffian is treated as
inert after its edge-localized crossing has been explicitly observed.

**Robustness falsifier:** survival at two selected enlargements is called
large-size stability despite failure at \((L,M)=(4,2)\).

**Collapse falsifier:** the narrow relative interval is said to prove that the
defect root vanished, despite its separately localized eigenprojector.

**Locality falsifier:** a proposed local invariant changes when only the remote
outer boundary condition is varied at fixed defect core.

## 9. Pinned dependency and continuation

Pin all claims that \(\delta=1.25\) lies in a robust topological phase. Continue
tracking the localized defect root, but replace the open-boundary reference
Pfaffian before making continuum or source-matching claims.

The immediate next calculation should construct a spatially resolved mod-two
spectral-flow diagnostic and test whether it assigns the reference root to the
edge and the defect root to the core.

## 10. Certificates and exploration

The [circumference and contamination certificate](../../../verification/verify/verify_pin_circumference_scaling_and_reference_boundary_contamination.mjs)
checks defect-root scaling and localization, the reference root's edge profile,
the narrow relative interval and the trivial sign at \(\delta=1.25\).

The [paired-nullspace exploration script](../../../verification/explore/explore_pin_pfaffian_crossing_localization.mjs)
provides the spatial profiles.

## Companion documents

- [Transverse localization checkpoint](393_the_upper_pin_boundary_is_defect_localized_and_nearly_converged_in_transverse_width.md)
- [Finite Pin phase-band scan](392_the_finite_pin_benchmark_has_four_pfaffian_bands_below_delta_two_and_the_causal_checkpoint_is_not_deep_inside_one.md)
- [Normalized causal Pin checkpoint](391_a_causal_inverse_propagator_can_land_exactly_on_a_verified_nontrivial_pin_checkpoint_after_canonical_normalization.md)
