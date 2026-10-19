# The Mutual-Shear Support Is the Furey Spanning Tree, and the Two Punctures Are Its Cycle-Closing Chords

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B06, B07, B09, B10, B11 and B14  
**Claim status:** exact code-coordinate/Furey-field identification and coarse-graph locality; fine component locality remains conditional on weak transport

## 1. Identifying the five physical qutrits

The low-weight mutual-shear word touches zero-based code coordinates

\[
\{2,3,6,10,13\}.
\]

Using the established even-sign-spinor/Furey-TRO bijection, these are

\[
\boxed{
u^c_1,quad d_1,quad e,quad \nu,quad d^c_1.
}
\]

Their five-sign weights are respectively

\[
\begin{aligned}
u^c_1&:(+,-,-,+,+),\\
d_1&:(-,+,+,-,+),\\
e&:(-,-,-,-,+),\\
\nu&:(-,-,-,+,-),\\
d^c_1&:(+,-,-,-,-).
\end{aligned}
\]

The code support has therefore landed on specific Standard-Model matter fields rather than anonymous coordinates.

## 2. Their multiplets form the coarse Furey spanning tree

At the linking-graph level the five fields occupy four matter multiplets:

\[
u^c,quad Q,quad L,quad d^c.
\]

Their coarse edges are

\[
C\xleftrightarrow{u^c}O
\xleftrightarrow{Q}H
\xleftrightarrow{L}E,
\qquad
O\xleftrightarrow{d^c}D.
\]

This connected graph has five vertices and four edges. It is a spanning tree of the completed matter graph.

The two removed code coordinates are precisely the missing chord edges

\[
e^c:C\leftrightarrow E,
\qquad
\nu^c:D\leftrightarrow E.
\]

Adding them closes the two fundamental matter cycles:

\[
C-O-H-E-C,
\qquad
D-O-H-E-D.
\]

This is an exact graph-theoretic explanation for why two punctures yield two logical coordinates: relative to the code-selected matter tree, the punctures are the two cycle-closing chords.

## 3. The minimum representatives follow the tree branches

Respecting the paper’s puncture order \((\nu^c,e^c)\), the minimum representatives are

\[
\begin{aligned}
Z_D&=u^c_1+d_1-e,\\
Z_C&=d_1-e+d^c_1,
\end{aligned}
\qquad\pmod3,
\]

with weights three and three. At the multiplet level these lie on the \(C\)-side and \(D\)-side paths of the spanning tree, respectively. The dual pairing is crossed relative to the chord labels, as expected for cycle–cocycle duality rather than naive edge identity.

The sum class has the exceptional weight-two representative

\[
Z_C+Z_D\sim-e-\nu,
\]

supported entirely on the two weak-doublet components of \(L\). This is why the relational axis is cheaper than either individual logical dual.

## 4. How much locality has actually been proved

At the coarse Furey multiplet graph, the support is connected and tree-local. This materially strengthens the previous low-Hamming-weight result.

At matrix-unit resolution, however,

\[
d_1:O_1\to H_4,
\qquad
e:H_5\to E,
\qquad
\nu:H_4\to E.
\]

The charged-lepton and neutrino components terminate on different weak basis states \(H_5\) and \(H_4\). A literal component-level path involving \(e\) therefore requires the weak-root operation converting \(H_4\leftrightarrow H_5\).

The precise conclusion is:

- **coarse linking locality:** proved;
- **fine matrix-unit locality:** proved only after adjoining the Standard-Model weak-root transport;
- **spacetime locality or low circuit depth:** not proved.

## 5. A graph-code dictionary

The combined structure is now

| code object | Furey graph object |
|---|---|
| fourteen retained coordinates | retained matter-field matrix units |
| punctures \(e^c,\nu^c\) | two chord edges |
| two logical coordinates | two independent chord cycles |
| minimum dual representatives | tree-supported cocycles |
| weight-two sum dual | weak-doublet relation \(-e-\nu\) |
| mutual Clifford shear | parity phase coupling the two chord cycles |

This dictionary is source specific; it is not true of a generic two-qutrit stabilizer code.

## 6. Consequence for the research programme

The cross gate no longer lacks a candidate locality carrier. The code itself selects a connected Furey spanning tree on which the three transvection axes live. The remaining task is dynamical: derive the required parity-phase rotations from allowed ternary compositions, Higgs/weak transport or an effective transfer kernel.

The first concrete test is whether the weak-root-completed tree supports a bounded sequence of Furey ternary products whose induced logical action is the weight-\((3,3,2)\) shear word.

## 7. Claim ledger

- **Exact:** the five support coordinates are \(u^c_1,d_1,e,\nu,d^c_1\).
- **Exact:** their four multiplets form a connected spanning tree of the coarse completed matter graph.
- **Exact:** \(e^c\) and \(\nu^c\) are the two omitted chord edges closing its fundamental cycles.
- **Exact:** the weight-two sum representative lies on the weak doublet.
- **Exact:** component-level charged-lepton and neutrino paths differ by the weak basis index.
- **Candidate mechanism:** weak-root transport completes a fine-local implementation of the mutual shear.
- **Open:** ternary-product circuit, spacetime locality, coupling strength and positive-real continuation.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a bounded Furey ternary/weak-root word on this spanning tree induces the certified mutual logical shear.

**Locality trigger:** the same word arises from the source Higgs/Yukawa action with no new nonlocal parity coupling.

**Field-map falsifier:** any of the five sign weights maps to a different completed Furey matrix unit under the established intertwiner.

**Graph falsifier:** the four support multiplets fail to form a connected acyclic graph on \(C,O,H,E,D\).

**Fine-locality falsifier:** \(H_4\) and \(H_5\) are silently identified without the weak-root operation.

## 9. Certificate

The [mutual-shear support/Furey-tree certificate](../../../verification/verify/verify_mutual_shear_support_is_the_coarse_furey_spanning_tree.mjs) reconstructs the sign-weight labels, identifies all five fields, verifies the spanning-tree and chord-cycle statements and records the surviving weak-component distinction.

## Companion documents

- [Low-weight mutual-shear synthesis](483_three_low_weight_code_transvections_realize_exactly_the_genus_two_mutual_seam_shear.md)
- [Completed Furey TRO/five-bit intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Higgs-augmented linking graph](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md)
- [Minimum code logicals versus ternary products](445_the_25_minimum_anomaly_code_logicals_are_not_single_furey_ternary_products.md)
