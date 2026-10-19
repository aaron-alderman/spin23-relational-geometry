# A Neutrino–Lepton Anchor and One Weak-Orientation Bit Uniquely Align the Three A2 Frames

**Date:** 17 October 2026  
**Branches:** cyclic label typing, mediator roots, Furey multiplicity edges, handle conjugacy class, neutrino complement, and weak/Pfaffian orientation  
**Claim status:** exact finite alignment classification; physical realization of the two anchors remains conditional  
**Certificate:** [classify_the_dihedral_frame_alignments_and_the_two_physical_anchors_that_select_one.mjs](../../../verification/classify/classify_the_dihedral_frame_alignments_and_the_two_physical_anchors_that_select_one.mjs)

## Executive result

After the Gram matrices and cyclic actions are fixed, there are exactly six abstract identifications among the mediator-root, multiplicity-edge and handle frames:

\[
D_3=C_3\rtimes C_2.
\]

They consist of three cyclic starting-label choices and two orientation choices.

Two pieces of already-motivated physical data reduce these six possibilities to one:

1. map the pure-lepton coherent mediator root to the base handle whose neutral leg is the neutrino complement;
2. preserve the weak/Pfaffian orientation ordering the up/neutrino and down/electron mediator faces.

With root order

\[
g_+\to g_0\to g_-\to g_+,
\]

and handle order

\[
O_0\to O_1\to O_2\to O_0,
\]

the selected mapping is

\[
g_0\mapsto O_0,
\qquad
g_-\mapsto O_1,
\qquad
g_+\mapsto O_2.
\]

Reversing the weak orientation gives the sole alternative after the lepton anchor and exchanges the up/down assignments.

Thus no continuous alignment freedom remains. The physical problem is reduced to deriving two discrete anchors.

## 1. The six dihedral identifications

Label the root indices by

\[
(0,1,2)=(g_+,g_0,g_-).
\]

Every frame isometry compatible with the unlabelled triangle acts on indices as

\[
p(i)=si+k\pmod3,
\qquad
s\in\{+1,-1\},quad k\in\mathbb Z_3.
\]

The sign $s$ records whether cyclic orientation is preserved or reversed; $k$ records the starting-label offset.

These are the six residual ambiguities identified abstractly in documents 879 and 918.

## 2. First anchor: the pure-lepton root

In aggregate coordinates $(L,Q)$,

\[
g_+=(1,\sqrt3),
\qquad
g_-=(1,-\sqrt3),
\]

so their coherent sum is

\[
-g_0=(2,0).
\]

The third root is therefore the unique pure-lepton direction in the completed frame.

On the full carrier, $O_0$ is the chosen base handle exchanging the primitive neutrino complement with the active response plane. Requiring

\[
g_0\mapsto O_0
\]

fixes the cyclic offset and leaves exactly two alignments, differing only by orientation reversal.

This anchor is natural but still conditional: the physical defect must establish that the named base handle is indeed the neutrino-attached member of the conjugacy class.

## 3. Second anchor: weak/Pfaffian orientation

The two primitive mediator faces are not anonymous:

- $g_+$ comes from the up/neutrino weak channel;
- $g_-$ comes from the down/electron weak channel.

The weak symplectic form and Higgs orientation distinguish an ordered passage between these channels. Choosing the orientation

\[
g_+\to g_0\to g_-
\]

selects the orientation-preserving dihedral map. The unique result is

\[
(g_+,g_0,g_-)
\mapsto
(O_2,O_0,O_1).
\]

The opposite Pfaffian orientation gives

\[
(g_+,g_0,g_-)
\mapsto
(O_1,O_0,O_2).
\]

The remaining choice is exactly one orientation bit, not an arbitrary orthogonal rotation.

Documents 937 and 938 sharpen the status of that bit. The $h\chi$ reflection itself exchanges the two primitive faces and reverses the cycle, so it does not choose one orientation while unbroken. The Pfaffian sign transforms in the required odd line and can pair invariantly with the cycle-orientation observable, but the local coupling and its magnitude remain underived. Thus the orientation used here is a conditional chosen or spontaneously selected Pfaffian sign, not an automatic consequence of Pfaffian typing alone.

## 4. Relation to the multiplicity edges

Once the mediator roots are aligned with the handles, the exact isometry

\[
e_i\mapsto g_i/\sqrt2
\]

from document 918 transports the same labeling to the signed multiplicity edges.

Therefore the two anchors simultaneously align all three frames:

\[
\text{Furey/multiplicity}
\leftrightarrow
\text{mediator roots}
\leftrightarrow
\text{handle Kraus orientations}.
\]

No separate matter-to-handle label choice remains.

## 5. What has and has not closed

Closed mathematically:

- the residual alignment group is exactly $D_3$;
- the pure-lepton/neutrino anchor reduces six choices to two;
- one weak-orientation bit reduces two choices to one;
- the selected permutation is explicit.

Still open physically:

- derivation that the base handle $O_0$ is selected by the Higgs-dressed neutrino complement;
- derivation of the Pfaffian orientation sign from the microscopic boundary action;
- proof that radiative corrections preserve these discrete labels;
- reconciliation with three-generation flavor phases.

## 6. Stop-everything and falsification criteria

**Neutrino-anchor trigger:** a microscopic defect calculation identifies one handle orientation as the unique one coupled to the neutrino complement.

**Weak-orientation trigger:** the Higgs/Pfaffian boundary term orders the up/neutrino and down/electron faces and selects one of the two maps above.

**Label trigger:** the same selected permutation appears in the Furey middle-slot outer-leg tensor without post-hoc relabelling.

**Anchor falsifier:** more than two alignments survive after the pure-lepton root is paired with the neutrino handle.

**Orientation warning:** the remaining sign is claimed fixed solely by abstract $C_3$ equivariance.

## 7. Verdict

| Alignment datum | Remaining choices |
|---|---:|
| Gram and unlabelled cyclic frame only | 6 |
| Plus pure-lepton/neutrino anchor | 2 |
| Plus weak/Pfaffian orientation | 1 |

The cyclic typing problem is now a pair of discrete microscopic tests, not an open continuous matching problem.

## 8. Position in the corpus

- [three-way $A_2$ frame](918_the_mediator_root_orbit_multiplicity_edges_and_handle_kraus_operators_are_one_three_way_a2_frame.md)
- [mediator Gaussian to handle class sum](921_the_completed_mediator_root_gaussian_pushes_forward_to_the_exact_handle_class_sum_channel.md)
- [primitive neutrino complement and handle boundary](../0800-0899/866_the_neutrino_puncture_pair_supplies_a_primitive_fixed_complement_but_neither_known_furey_exchange_supplies_the_handle.md)
- [weak Pfaffian phase orientation](../0800-0899/892_pfaffian_skewness_or_even_real_structure_collapses_the_higgs_hopf_phase_to_the_two_weak_symplectic_signs.md)
- [Pfaffian sign/cycle-orientation parity pairing](938_the_weak_pfaffian_sign_has_exactly_the_right_odd_parity_to_pair_with_cycle_orientation_but_the_coupling_is_not_yet_derived.md)
