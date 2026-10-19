# The Localized Crossing Projector Is Spectrally Isolated on the Path and Its Edge Leakage Decays Rapidly

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** strong finite Riesz-projector evidence; a uniform infinite-volume isolation bound remains open

## 1. The next requirement after the crossing ledger

The localization-filtered parity ledger used the paired nullspace at each root.
To approach a Riesz-projector definition, the same two-dimensional spectral
subspace must remain:

1. isolated from the rest of the spectrum;
2. continuously identifiable away from the exact zero;
3. localized near the defect rather than the outer boundary;
4. stable as circumference and transverse width increase.

## 2. Spectral isolation on the declared path

For \(M=2\), \(L=2,3,4\), evaluate the lowest paired eigenspace of

\[
-A_{\rm def}(\delta)^2
\]

at \(\delta=1.2\), the localized root, and \(\delta=1.3\).

At the interval endpoints, the ratio

\[
\frac{\lambda_{\rm next}^2}{\lambda_{\rm pair}^2}
\]

is greater than 18 in every tested system and greater than approximately 30 in
the largest circumference samples. At the root, the lowest pair vanishes while
the next pair stays nonzero.

This supplies a finite spectral contour separating the crossing pair from the
rest of the spectrum throughout the sampled path.

## 3. Spatial identity along the path

Across all nine \((L,\delta)\) samples:

- central-row weight is at least approximately \(49\%\);
- two-core-site weight exceeds \(26\%\);
- outer-edge weight remains below \(13\%\).

The lowest pair does not exchange identity with an edge or extended state as it
passes through zero.

## 4. Transverse leakage

At the localized root, outer-edge weight behaves as

| \(M\) | root | outer-edge weight |
|---:|---:|---:|
| 1 | 1.321239 | 0.43156 |
| 2 | 1.263992 | 0.10104 |
| 3 | 1.266541 | 0.01887 |
| 4 | 1.266465 | 0.00213 |

Each enlargement reduces leakage by more than a factor of four. The \(M=3\)
and \(M=4\) roots agree within \(10^{-4}\).

At \(M=4\), effective support is approximately 10.96 sites out of 36, and the
radial shell weights are

\[
0.5218, 0.3714, 0.0873, 0.0174, 0.00213
\]

for radii \(0,1,2,3,4\). The profile decreases monotonically away from the
defect row.

## 5. Finite Riesz projector

For each tested finite system, choose a contour in the squared-energy plane that
encloses the lowest pair but excludes the next eigenvalue. The corresponding
Riesz projector

\[
P_{\rm cross}(\delta)
=\frac{1}{2\pi i}\oint_\Gamma
(z+A_{\rm def}(\delta)^2)^{-1}\,dz
\]

has rank two and follows the same localized branch across the declared path.

The paired density used in the ledger is exactly the diagonal spatial density
of this finite projector.

## 6. What remains open

The next squared singular value at the root decreases as transverse width first
increases. Although it remains nonzero in every tested system, no uniform lower
bound has been proved.

Therefore we do not yet have:

- one contour \(\Gamma\) valid for every \(L,M\);
- a proof of exponential decay with a volume-independent localization length;
- norm convergence of finite projectors to an infinite-volume projector;
- a theorem equating its crossing number with the Pin mod-two index.

The leakage data strongly support these possibilities but do not prove them.

## 7. Improved local event definition

At finite volume, replace threshold language by:

> Count a crossing when an isolated rank-two Riesz projector passes through zero
> and its spatial density converges toward the defect region as the remote
> boundary recedes.

The current branch satisfies this definition through \(M=4\) and \(L=4\).

## 8. Consequence for the causal path

On \(\delta\in[1.2,1.3]\), the causal starting point and its localized crossing
belong to one spectrally isolated branch. The event is not produced by an
exchange with the reference-edge state, which lives in a separate Hamiltonian
and spatial sector.

This makes the finite local parity count substantially more credible while
leaving source predictivity unchanged.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** prove a volume-uniform Riesz contour and exponential
decay for the crossing projector, then identify its mod-two spectral flow with
the infinite half-line/Pin index.

**Isolation falsifier:** the lowest pair collides with the next pair as volume
grows, preventing a stable rank-two projector.

**Localization falsifier:** outer-edge leakage stops decaying or effective
support grows proportionally to volume.

**Continuity falsifier:** the lowest pair exchanges spatial identity with
another branch inside the declared interval.

**Theorem falsifier:** describe the observed leakage ratios as a proved
exponential bound without controlling all larger sizes.

## 10. Pinned dependency and continuation

Pin the infinite-volume Riesz theorem. Continue by tracking the next-pair gap
for larger \(M\), fitting only provisional asymptotics, and constructing a
transfer-matrix decay exponent for the zero mode at the converged root.

## 11. Certificate

The [crossing-projector certificate](scripts/verify_defect_crossing_projector_is_isolated_and_leakage_decays.mjs)
checks sampled spectral isolation, spatial identity, transverse leakage decay,
root convergence and monotone radial profile.

## Companion documents

- [Localized crossing ledger](404_the_localized_crossing_ledger_retains_defect_parity_when_a_reference_edge_event_cancels_the_global_sign.md)
- [Radial phase versus event parity](403_the_radial_localizer_classifies_the_defect_phase_but_does_not_count_the_bound_state_parity_flip.md)
- [Defect-localized root scaling](393_the_upper_pin_boundary_is_defect_localized_and_nearly_converged_in_transverse_width.md)
