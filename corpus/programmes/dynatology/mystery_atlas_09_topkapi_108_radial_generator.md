# Mystery Atlas 09: The First Recovered Muqarnas Generator

**Date:** 24 October 2026  
**Status:** first source-derived computation; principal radial scaffold recovered independently of cell interpretation  
**Machine record:** [drawing 108 radial scaffold](topkapi_108_radial_scaffold_v0.json)  
**Certificate:** [radial scaffold certificate](../../../verification/verify/verify_dynatology_topkapi_108_radial_scaffold.mjs)

## Result

A blind radial scan of Topkapı catalogue drawing 108 recovers the plan's principal construction generator.

Starting from the visually selected lower-right radial origin, the scan scores mean ink density along candidate rays across the quarter-vault. Peak suppression at \(4.5^\circ\) separates broad line responses. The resulting ordered peak set contains:

- two quadrant boundaries;
- eleven internal principal rays;
- twelve angular intervals across the quarter vault.

The detected span is \(89.1^\circ\), with mean interval

\[
\bar\theta=7.425^\circ,
\]

against the ideal

\[
\theta_0=\frac{90^\circ}{12}=7.5^\circ=\frac{\pi}{24}.
\]

The largest interval residual from \(7.5^\circ\) is \(0.45^\circ\), consistent with a low-resolution historical scan, line thickness, imperfect crop and manual origin estimate. Mirroring the twelve quarter-vault sectors produces twenty-four half-vault sectors, independently reproducing the catalogue description.

This is the first actual generator recovered from the source:

\[
\boxed{
\text{one }\pi/24\text{ angular step}
\ +\ 
\text{quarter/half-vault boundary conditions}
\longrightarrow
\text{principal radial scaffold}.
}
\]

## 1. Why this matters

The earlier branch spoke generally about local rules generating global form. Drawing 108 now supplies a concrete rule. The visible complexity is organized around an extremely small generator: equal angular subdivision subject to a selected origin and boundary sector.

This is a direct example of the corpus's foundational proposal:

> admissibility is not merely imposed on a finished geometry; a generator plus boundary admissibility produces the space in which the geometry can be built.

The generator does not determine the completed muqarnas. It supplies the scaffold on which subsidiary circles, polygon cells, star units, stippled levels and boundary units are admitted.

## 2. Boundary before group completion

Repeated \(\pi/24\) rotation would close after forty-eight steps around a full circle. But drawing 108 does not present an unconstrained forty-eightfold rosette. It presents a quarter-vault construction intended to sew into a half vault.

The correct object is therefore not initially the abstract cyclic group \(C_{48}\), but a restricted orbit or action groupoid:

\[
\{0,1,\ldots,12\}
\subset
\mathbb Z_{48},
\]

with specified boundary operations. The half-vault extension reaches twenty-four sectors without licensing the remaining twenty-four. Group completion is a possible mathematical envelope, not source evidence.

This is precisely the distinction between ambient symmetry and admissible realization that the corpus has repeatedly needed.

## 3. The scaffold is not the cell algebra

The twelve-sector grid determines candidate directions and intersections. It does not by itself specify:

- which construction intersections become vertices;
- which arcs or segments become cell boundaries;
- which polygons are stars, bipeds, fillers or hexagons;
- which units bend into another spatial level;
- which bottom-edge units are exposed for sewing.

Accordingly,

\[
G_{\rm scaffold}\ne K_{\rm cell}.
\]

Treating every line crossing as a cell incidence would turn the construction algorithm into a false dense graph. The scaffold should instead be a coordinate and constraint layer referenced by cell vertices.

## 4. Implication for the octonion comparison

The recovered native count is eleven internal rays and twelve quarter sectors, not seven Fano points. The main scaffold is cyclic and essentially associative. It therefore supplies a valuable negative control:

> the most visually dominant generative structure in drawing 108 is not octonionic.

Any later octonion contact would have to arise in the **cell junction grammar**, macro-cell collapse or three-dimensional lift—not in the principal radial subdivision.

This sharply localizes the search. It prevents the entire plan from being redescribed vaguely as exceptional geometry and gives the Fano hypothesis a place where it can fail.

## 5. Relation to phase and the quarter-turn corpus

The angular step

\[
\theta_0=\frac{\pi}{24}

\]

generates a quarter turn after twelve applications:

\[
12\theta_0=\frac{\pi}{2}.

\]

This is an exact formal contact with the corpus's quarter-turn motif: a macroscopic quarter-vault is discretized into twelve elementary turns. But it is not the complex structure \(J^2=-1\), Wick rotation or a Goldstone mode. It is an architectural angular subdivision whose twelfth iterate reaches a right-angle boundary.

The correct shared abstraction is:

\[
\text{iterated local rotation}
\longrightarrow
\text{distinguished quarter-turn closure}.

\]

Whether this angular clock participates in cell-type transitions is an open and testable next question.

## 6. A new possible compiler variable

Index the rays by \(r=0,\ldots,12\) and the angular sectors by \(s=0,\ldots,11\). Every transcribed cell can then carry a radial support word:

\[
w(C)=(r_{\min},r_{\max},\text{circle bands crossed},\text{orientation}).

\]

This allows three first tests:

1. **finite-state grammar:** does cell type at sector \(s+1\) depend only on cell type and band at \(s\)?
2. **monodromy:** after the prescribed half-vault sewing, do cell labels return unchanged, permute or reverse orientation?
3. **macro-collapse defect:** does replacing a run of sector cells by one macro-cell commute with the three-dimensional lift?

These are better targeted than immediately computing octonion associators.

## 7. Experimental caveats

The extraction is a derived raster observation, not vector ground truth. Its limitations are recorded in the machine file:

- the radial origin is manually estimated;
- the scan is a 220 dpi rendering of a historical reproduction;
- broad lines and nearby cell edges perturb peak locations;
- peak exclusion was fixed at \(4.5^\circ\);
- the calculation does not classify subsidiary circles or cell edges.

The agreement with the catalogue is therefore a validation of the layer-separation method, not a discovery that supersedes the historical description.

## 8. Decision

The generative angle has produced its first hard result:

\[
\text{source plan}
\to
\pi/24\text{ angular generator}
\to
12\text{-sector quarter scaffold}
\to
24\text{-sector half-vault extension}.

\]

This is already valuable for Dynatology: a small transformation and explicit boundary conditions generate the admissible scaffold of a complex sacred architectural form.

The octonion hypothesis is neither confirmed nor discarded. It has been displaced from the radial scaffold to the later cell/lift compiler, where a genuine nonassociative effect would have to live.

## Corpus companions

- [Drawing 108 multiplex pretranscription](mystery_atlas_08_topkapi_108_multiplex_pretranscription.md)
- [Drawing 108 source observation](topkapi_drawing_108_observation_v0.json)
- [Muqarnas compiler boundary](mystery_atlas_07_muqarnas_compiler_boundary_and_source_packet.md)
- [Quarter-turn synthesis](../admissibility/admissibility_21_quarter_turn_wick_goldstone_cloud_and_open_closure.md)

