# Mystery Atlas 20: Blind Figure 4F Continuity Result

**Date:** 24 October 2026  
**Status:** partial success; blind topological discriminator found, full defect detector not established  
**Machine record:** [Blind continuity record](girih_figure4f_blind_continuity_v1.json)  
**Analysis:** [Blind continuity analyser](../../../verification/analyze/analyze_girih_figure4f_blind_continuity.py)  
**Certificate:** [Blind continuity verifier](../../../verification/verify/verify_dynatology_girih_figure4f_blind_continuity.mjs)

## Result

There is still value in the girih branch, but the result is narrower and more interesting than a direct mismatch count.

Using only the red and blue filled vectors in Lu and Steinhardt's Figure 4F, the defective and repaired panels are distinguishable without reading the yellow mismatch marks, purple outline or caption. After registration, each colour is rasterized independently and its connected filled components are counted.

Across the full frozen sweep

\[
s\in\{8,12,16,20,24,32,40,48\}\ \text{pixels per PDF point},
\qquad
a_{\min}\in\{0.01,0.03,0.1\}\ \text{PDF points}^2,
\]

all twenty-four trials return the registered difference

\[
\Delta\pi_0=(+2,+2)_{\rm red,blue}.
\]

At the representative scale (s=12), the raw counts are

\[
\begin{array}{c|cc}
&\text{before}&\text{after}\\ \hline
\text{red components}&19&21\\
\text{blue components}&13&15
\end{array}
\]

The repair preserves the girih tile counts while changing the topology of both ribbon families. In the defective state, geometry that is separated after repair is joined or identified. This is a genuine blind signal in the source vectors.

## What this does not prove

The source oracle labels two violated seams grouped into one point defect. The connected-component statistic does **not** localize those seams and does not itself derive the aggregation

\[
2\ \text{seams}\longrightarrow1\ \text{defect}.
\]

It also lacks a second held-out patch, a rotation/reflection test on a semantic ribbon graph and any map to the modulo-two parity triangle. Calling \((+2,+2)\) a defect charge would therefore outrun the evidence.

The absolute component counts are resolution-sensitive: across the sweep, red runs from 19--21 before and 21--23 after, while blue runs from 13--14 before and 15--16 after. This is why the robust result is only the registered after-minus-before delta, not either raw count or a boundary/interior decomposition.

## Implication for admissibility

The local example now supports a precise hierarchy:

\[
\text{same tile inventory}
\not\Rightarrow
\text{same boundary realization}
\not\Rightarrow
\text{same ribbon topology}
\not\Rightarrow
\text{admissible matching}.
\]

Admissibility is therefore not recoverable from population counts alone. A realization layer carries relational information whose topology can change under a count-preserving local move. This is the useful corpus-level result: optimization occurs over lifts and placements, not merely count vectors.

## Decision

The blind-discrimination gate passes, but the stronger detector gate does not. The current girih branch closes at **partial success**.

Reopen it only if one of the following appears:

1. a second independent labelled before/after patch;
2. a semantic transcription of candidate seams and reversal-aware boundary words;
3. a rotation/reflection validation of the same fixed rule; or
4. an explicit equivariant map from boundary topology to the parity triangle.

Do not expand to the 3,700-tile panel merely to accumulate more unlabelled geometry.

## Companions

- [Boundary lift to a Casimir--thermoelectric compiler](../admissibility/admissibility_53_boundary_lift_to_casimir_thermoelectric_compiler.md)
- [Figure 4F oracle and stop rule](mystery_atlas_19_figure4f_defect_oracle_and_stop_rule.md)
- [Figure 4 orbit compression](mystery_atlas_18_figure4_orbit_compression_and_nested_optimization.md)
- [Boundary-lift no-go](mystery_atlas_17_boundary_lift_no_go_and_collared_choice_system.md)
- [Parity triangle](mystery_atlas_16_parity_triangle_and_three_step_return.md)
