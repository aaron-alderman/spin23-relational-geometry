# The Minimal Twist–Antitwist Pair Has Two Chiral Placement Orbits Preserved by the Physical Real Reflection

**Date:** 18 October 2026  
**Branches:** placement symmetry, defect-pair chirality, Real reflection, seam orbit classification  
**Claim status:** exact finite orbit classification; physical chirality interpretation conditional on the established sign-reversing Real action  
**Certificate:** [classify_sparse_twist_seam_orbits_under_placement_dihedral_symmetry.mjs](scripts/classify_sparse_twist_seam_orbits_under_placement_dihedral_symmetry.mjs)

## Executive result

Document 1043 found 12 minimal twist–antitwist schedules compatible with the central six-cycle. Placement symmetry does not leave 12 independent choices.

Under cyclic edge translation $C_6$, the schedules split into exactly two orbits of size six. They are distinguished by the oriented displacement from the positive twist to the negative twist:

\[
\delta=+2\pmod6
\quad\text{or}\quad
\delta=-2\equiv4\pmod6.
\]

A bare geometric reflection exchanges these two cyclic orbits, so the unsigned dihedral group acts transitively on all 12 schedules.

The physical Real reflection is not bare. It reverses the placement orientation and also reverses the quarter-turn sign:

\[
n\mapsto-n,
\qquad
\sigma\mapsto-\sigma.
\]

Those two reversals cancel in the oriented displacement. Consequently the physical sign-reversing dihedral action preserves the two six-element sectors rather than identifying them.

The minimal paired interface therefore has a conditional $\mathbb Z_2$ chirality.

## 1. Minimal schedules

A minimal schedule contains one $+1$ turn and one $-1$ turn on edges of the same parity. If the positive turn is at edge $i$ and the inverse turn at edge $j$, centrality requires

\[
j-i=2\quad\text{or}\quad4\pmod6.
\]

There is no variable separation length: the two seams always occupy adjacent vertices of one of the two parity triangles embedded in the six-cycle. What remains is their orientation around that triangle.

Define

\[
\chi=
\begin{cases}
+1,&j-i=2\pmod6,\\
-1,&j-i=4\pmod6.
\end{cases}
\]

Then $\chi$ labels the two cyclic orbits.

## 2. Orbit counts

The exact partitions are:

| Symmetry action | Number of orbits | Orbit sizes | Treatment of $\chi$ |
|---|---:|---|---|
| cyclic rotations $C_6$ | 2 | $6+6$ | preserved |
| bare dihedral permutations $D_6$ | 1 | $12$ | exchanged by reflection |
| Real dihedral action | 2 | $6+6$ | preserved |

Here “Real dihedral” means that a reflection of edge positions is accompanied by reversal of the controlled Fourier orientation, as required by

\[
\Gamma_{\mathbb R}S_-\Gamma_{\mathbb R}^{-1}=S_+^{-1}.
\]

## 3. Why the physical reflection preserves chirality

Under a bare reflection,

\[
i\mapsto-i,\qquad j\mapsto-j,
\]

so

\[
\delta=j-i\mapsto-\delta.
\]

Under the Real reflection, the signs of the two defects are also exchanged. The image positive defect comes from the old negative defect and vice versa. Therefore the oriented displacement is measured in the opposite endpoint order:

\[
\delta'=(-i)-(-j)=j-i=\delta.
\]

The spatial reversal and internal orientation reversal cancel exactly.

## 4. Interpretation

The two sectors are not left-handed and right-handed merely in geometric space. Their label couples:

- placement orientation;
- which endpoint creates the $+J$ twist;
- which endpoint applies the $-J$ antitwist;
- the Real/antiunitary rule transporting those orientations.

This makes $\chi$ a relational chirality of the entire defect interval.

The most natural candidate for selecting it is the retarded/advanced arrow: exchanging retarded and advanced reverses the orientation of the quarter-turn while time or placement reflection reverses the interval. A causal prescription could therefore choose one $\chi$ without breaking the combined Real symmetry. This has not yet been derived.

## 5. Consequences for the interface programme

The classification removes two spurious moduli:

- absolute seam position is removed by $C_6$ translation;
- separation magnitude is fixed to two edges by minimal centrality.

Only one discrete datum remains:

\[
\chi\in\{+1,-1\}.
\]

Thus a microscopic paired-defect action needs to explain one binary orientation, not 12 unrelated placements.

If bare reflection rather than the sign-reversing Real operation is the physical symmetry, the two sectors are equivalent and no chirality remains. Determining the correct action on the defect sign is therefore the decisive typing question.

## 6. Stop-everything and falsification tests

**Causal trigger:** the retarded prescription selects $\chi=+1$ and the advanced prescription selects $\chi=-1$. Then the defect chirality is the finite placement shadow of the causal arrow.

**Furey trigger:** the graded antiunitary acts on microscopic seam operators with the same simultaneous position and sign reversal used here. Then the $\mathbb Z_2$ orbit split is physically typed rather than combinatorial.

**CP trigger:** a CP-odd invariant changes sign between the two sectors even though the combined Real symmetry preserves each. Then the paired seam could carry a discrete CP label.

**Falsifier:** the physical reflection reverses positions but leaves the quarter-turn sign unchanged. Then bare $D_6$ is the correct action and all 12 schedules form one orbit.

**Falsifier:** the seams can move continuously off the six marked edges without a locking gap. Then this finite $\mathbb Z_2$ classification is not a stable physical sector.

**Boundary warning:** the existence of two symmetry orbits is not evidence that nature populates both, that they are particle generations, or that the label is Standard-Model chirality.

## Verdict

| Question | Verdict |
|---|---|
| How many cyclic orbits do the 12 minimal pairs form? | **Two** |
| Is there a continuous seam-separation modulus? | **No** |
| Does bare reflection identify the two sectors? | **Yes** |
| Does the established sign-reversing Real reflection identify them? | **No** |
| Is the resulting $\mathbb Z_2$ chirality microscopically selected? | **Not yet** |

## Position in the corpus

- [minimal sparse twist–antitwist seams](1043_semilinearity_does_not_repair_an_all_edge_quarter_turn_but_a_minimal_same_face_twist_antitwist_pair_preserves_the_six_cycle.md)
- [all-edge holonomy obstruction](1042_a_quarter_turn_on_every_sewn_edge_obstructs_the_six_cycle_central_holonomy_and_generically_doubles_the_coherent_cover.md)
- [passive square-root angle](1041_passivity_and_the_square_root_of_D_quantize_the_projected_oscillator_action_to_a_quarter_turn_modulo_orientation.md)
