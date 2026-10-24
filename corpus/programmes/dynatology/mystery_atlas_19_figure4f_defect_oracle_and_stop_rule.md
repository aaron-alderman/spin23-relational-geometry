# Mystery Atlas 19: The Figure 4F Defect Oracle and Final Stop Rule

**Date:** 24 October 2026  
**Status:** exact source-annotation oracle; blind gate resolved at partial success in Atlas 20  
**Machine record:** [Figure 4F defect oracle](girih_figure4f_defect_oracle_v1.json)  
**Source extractor:** [Figure 4 vector-path extractor](../../../verification/extract/extract_girih_figure4_vector_paths.py)  
**Certificate:** [Figure 4F oracle verifier](../../../verification/verify/verify_dynatology_girih_figure4f_defect_oracle.mjs)

## Result

The primary vector figure supplies an exact local gold standard for the last worthwhile girih test.

Figure 4F contains two purple outlined versions of the same local support:

- a pre-repair bowtie--hexagon placement;
- a post-repair placement obtained by exchanging those tile positions.

The outlined regions have equal vertical extent and equal width to source rounding. Their horizontal registration is

\[
\Delta x=136.3815\pm0.0005
\]

PDF points. They can therefore be compared in a common local frame without estimating a scale, rotation or projective transform.

## 1. One point defect, two violated seams

The pre-repair panel contains two yellow filled path components. Each component comprises six closed dot subpaths, forming one dotted mismatch segment. The post-repair panel contains no yellow component.

Thus the source annotation distinguishes three levels:

\[
12\ \text{display dots}
\longrightarrow
2\ \text{violated seams}
\longrightarrow
1\ \text{point defect}.
\]

The display primitives are not defect counts. A valid detector must aggregate local edge failures into a connected defect charge.

## 2. Frozen oracle

Let \(d_e\in\{0,1\}\) be the inferred ribbon-continuity violation on a candidate seam. The required local output is

\[
\text{before}:\quad \sum_e d_e=2,
\qquad
\#\pi_0(\operatorname{supp}d)=1,
\]

and

\[
\text{after}:\quad \sum_e d_e=0.
\]

Both states have the same tile populations:

\[
\Delta(n_D,n_H,n_B)=(0,0,0).
\]

Therefore neither the count matrix nor the parity triangle can distinguish the oracle states.

## 3. Why the oracle is not yet the detector

Reading the yellow annotation and returning its count would be circular. The independent detector must use only:

- black Penrose subdivision boundaries;
- red and blue ribbon geometry;
- declared edge reversal; and
- the common registered support.

Yellow and purple may define evaluation masks and ground truth, but must be withheld from the detector input. This creates a genuine train/test separation inside one published figure:

\[
\text{red/blue/black geometry}
\xrightarrow{\text{detector}}
\widehat d
\quad\text{compared with}\quad
d_{\rm yellow}.
\]

## 4. Final acceptance and stop rules

**Advance to a reusable compiler detector** only if one fixed, reversal-aware rule returns:

1. two seam violations grouped into one defect before repair;
2. zero seam violations after repair;
3. invariance under the exact panel translation;
4. invariance under simultaneous rotation/reflection with the declared ribbon action; and
5. no use of yellow pixels or the caption during inference.

**Close at source-annotation level** if the rule needs hand-selected thresholds or panel-specific seam positions.

**Close the parity branch** if the detector succeeds but its output is constant under, or has no defined map to, the \(L_0,L_1,L_2\) count-parity orbit.

**Reopen the parity branch** only if an equivariant map from boundary-defect state to parity channel predicts held-out rotated choices or a second independent patch.

## 5. Value assessment

The local oracle is valuable because it converts an open-ended historical reconstruction into one falsifiable unit test. It does not justify transcribing the 3,700-tile panel. Once the independent detector either passes or fails this oracle, further girih work is warranted only by a new held-out source or a demonstrated parity coupling.

## Decision

The branch now has a terminal test rather than an indefinite programme. The publication supplies exact registration, two labelled mismatch seams, one connected point defect and a count-preserving repair. The remaining work is a blind red/blue continuity calculation. No new-physics claim depends on a positive result; the value is a source-native validation or falsification of the corpus's proposed boundary-admissibility compiler.

## Companions

- [Blind Figure 4F continuity result](mystery_atlas_20_figure4f_blind_continuity_result.md)
- [Figure 4 orbit compression](mystery_atlas_18_figure4_orbit_compression_and_nested_optimization.md)
- [Boundary-lift no-go](mystery_atlas_17_boundary_lift_no_go_and_collared_choice_system.md)
- [Parity triangle](mystery_atlas_16_parity_triangle_and_three_step_return.md)

