# Mystery Atlas 13: The Topkapı Scaffold–Plan–Realization Fibre Tower

**Date:** 24 October 2026  
**Status:** source-derived lower bound; family classification open  
**Machine record:** [angular scaffold fibre](topkapi_angular_scaffold_fibre_v0.json)  
**Certificate:** [scaffold-fibre verifier](../../../verification/verify/verify_dynatology_topkapi_angular_scaffold_fibre.mjs)

## Result

The Topkapı catalogue contains a source-native fibre tower:

\[
\boxed{
A_{11}
\longleftarrow
P_{\rm typed}
\longleftarrow
R_P(H_P)
}
\]

where (A_{11}) is the quarter-vault angular signature with eleven internal principal rays and twelve angular intervals, (P_{\rm typed}) is a complete muqarnas plan carrying cells, level marks and boundary data, and (R_P(H_P)) is its family of admitted three-dimensional realizations.

The catalogue supplies at least four distinct typed plans over the same angular signature: drawings 5, 16, 108 and 110. Drawing 5 then supplies at least two height realizations of one such plan. The tower is therefore not metaphorical: each forgetful step erases selection data that the next layer needs.

## 1. The held invariant

All four catalogue entries describe a quarter-vault construction with eleven principal radii. Including the two quarter boundaries gives twelve angular intervals and the step

\[
\Delta\theta=\frac{90^\circ}{12}=7.5^\circ=\frac{\pi}{24}.
\]

This is the same signature independently recovered from the raster scan of drawing 108. The comparison holds only the angular skeleton fixed. It does not claim identical concentric-circle spacing, subsidiary circle systems or cell incidences.

Define the forgetful map

\[
q:P_{\rm typed}\longrightarrow A_{11}
\]

which discards cell types, subsidiary scaffold, level marks and boundary interpretation while retaining the angular signature. The catalogue witnesses

\[
q(P_5)=q(P_{16})=q(P_{108})=q(P_{110})=A_{11}.
\]

Hence, within the located catalogue witnesses alone,

\[
\boxed{|q^{-1}(A_{11})|\ge4.}
\]

This is a lower bound, not a complete enumeration.

## 2. What varies above the angular base

The four plans vary in precisely the data that the angular generator does not carry:

| Drawing | Squinch star | Other documented star content | Boundary completion |
|---|---:|---|---|
| 5 | 8-point | alternating 5- and 4-point stars | half vault only |
| 16 | 9-point | 4/5- and 4/6-point rows | full vault allowed |
| 108 | 6-point | pentagon-contained 5-point stars flanked by 4-point stars | half vault only |
| 110 | 6-point | 5-point stars plus subsidiary 4-point row | half vault only |

The angular signature therefore does not determine star order, motif sequence, filler arrangement, level coding or boundary use.

## 3. The boundary bit is independent

Drawings 5, 108 and 110 carry asymmetric edge units and are intended to be doubled into half vaults, not quadrupled into full vaults. Drawing 16, with the same eleven-ray angular signature, is catalogued as a forty-eightfold full-vault construction.

Let

\[
\beta(P)\in\{\text{half only},\text{full allowed}\}
\]

record the completion type. Then

\[
q(P)=A_{11}
\quad\not\Rightarrow\quad
\beta(P)\text{ is fixed}.
\]

This is the cleanest source example yet of the difference between ambient symmetry and admissible completion. The abstract rotation closes after forty-eight steps, but the boundary word can forbid using the second half of that completion.

## 4. The second fibre

Mystery Atlas 12 established that for catalogue drawing 5 the admissible height set (H_{P_5}) is non-singleton:

\[
|H_{P_5}|\ge2.
\]

Combining the two results gives a two-stage underdetermination:

\[
A_{11}
\xleftarrow{\text{forget cells/boundary}}
P_i
\xleftarrow{\text{forget height}}
R_{P_i}(h).
\]

At the first stage, one angular generator supports multiple symbolic plans. At the second, one typed plan supports multiple valid geometries. The source thus realizes the corpus's “filled and unfilled” admissibility zone as nested fibres rather than one undifferentiated possibility cloud.

## 5. What the tower says about dynamics

There are now two different dynamics to keep separate:

1. **discrete grammar dynamics**, selecting or generating a typed plan (P_i) over (A_{11});
2. **continuous or parametric realization dynamics**, moving through (H_{P_i}) to fit tier closure and the external arch.

A plausible compiler therefore has the form

\[
(A_{11},c,b)
\xrightarrow{G}
P
\xrightarrow{R_h}
M,
\]

where (c) is cell/motif choice and (b) is boundary data. The historical catalogue proves variation in (c) and (b); the worked reconstruction proves variation in (h). It does not yet provide the complete rule (G).

## 6. Implication for the exceptional-algebra branch

The dominant angular action remains cyclic and associative. But the fibre tower improves the location of any stronger algebraic test:

- it cannot live in (A_{11}) alone, because (A_{11}) forgets the distinguishing data;
- it may live in transformations among the typed plans (P_i), if a closed source-native rule set exists;
- it may live in a quotient scar between plan reduction and realization, if two histories produce the same exterior and different internal interfaces;
- it must predict withheld catalogue structure, rather than merely relabel one completed plan.

This gives a new negative control: any proposed octonion map that assigns the same exceptional state to all four plans because their angular scaffold matches is too coarse to explain the catalogue.

## 7. Next exact calculation

The next source computation should normalize the four plans to the common (A_{11}) frame and record, sector by sector:

\[
w_s=(\text{band},\text{cell type},\text{star membership},\text{level mark},\text{boundary role}).
\]

Then test whether one finite-state transducer with a small parameter word generates all four sequences. The decisive outcomes are:

- **shared grammar found:** the catalogue family becomes a controlled orbit over one generator;
- **boundary-conditioned grammars:** half/full completion is a distinct input, not an emergent consequence;
- **no compact shared grammar:** the common angular base is only a scaffold coincidence and the generative claim weakens.

No new experiment is required. The gate is vector transcription of four historical plans.

## Decision

The corpus can now state a bounded structural result:

> A small angular generator creates an admissibility base, not a unique geometry. Typed cell grammar and boundary completion select a plan within the first fibre; tier-height and arch-fit data select a realization within the second.

That is the precise form of the “tower” presently supported by the source.

## Corpus companions

- [Drawing 108 radial generator](mystery_atlas_09_topkapi_108_radial_generator.md)
- [Topkapı lift fibre and boundary adapter](mystery_atlas_12_topkapi_lift_fibre_and_boundary_adapter.md)
- [Typed compiler specification](muqarnas_typed_compiler_spec_v1.json)
- [Muqarnas source packet](muqarnas_source_packet_v1.json)
