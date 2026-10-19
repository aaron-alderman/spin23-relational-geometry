# Triality Gives Three Overlapping Generation Choices, Not Three Independent Generations

**Date:** 17 October 2026  
**Branches:** B01, B03, B06, B08, B09, B10, B11 and B13  
**Claim status:** primary-source reconstruction plus exact incidence, flag-orbit and state-count audit; a triality cover producing independent generation bundles remains open

## 1. The strongest existing exceptional generation proposal

Latham Boyle’s exceptional-Jordan/triality construction identifies one Standard-Model generation, including a right-handed neutrino, with the tangent space

\[
(\mathbb C\otimes\mathbb O)^2
\]

of the complex octonionic projective plane. This is \(32\) real or \(16\) complex dimensions and transforms as the spinor \(\mathbf{16}\) of \(Spin(10)\), reducing to one complete Standard-Model generation.

The proposal further observes that three copies of \(\mathbb C\otimes\mathbb O\) appear symmetrically in the magic-square decomposition of \(\mathfrak e_6\), and that \(SO(8)\) triality permutes them. See [Boyle, *The Standard Model, The Exceptional Jordan Algebra, and Triality*](https://arxiv.org/abs/2006.16265), especially the tangent-space and triality discussion.

This is the correct exceptional branch to test against the new generation-selection burden.

## 2. The magic-square incidence

At the compact-real vector-space level, write schematically

\[
\mathfrak e_6
=\mathfrak{so}(8)\oplus\mathfrak u(1)^2
\oplus A\oplus B\oplus C,
\]

where

\[
\dim_{\mathbb R}A
=\dim_{\mathbb R}B
=\dim_{\mathbb R}C
=16.
\]

To form the isotropy algebra

\[
\mathfrak{spin}(10)\oplus\mathfrak u(1),
\]

one chooses one of \(A,B,C\) to join \(\mathfrak{so}(8)\oplus\mathfrak u(1)^2\). The remaining two modules form the tangent:

\[
\begin{array}{ccl}
T_A&=&B\oplus C,\\
T_B&=&C\oplus A,\\
T_C&=&A\oplus B.
\end{array}
\]

Each \(T_i\) is \(32\)-real-dimensional and can describe one \(16\)-complex generation.

## 3. The three tangents overlap

The three choices are not independent:

\[
T_A\cap T_B=C,
\qquad
T_B\cap T_C=A,
\qquad
T_C\cap T_A=B.
\]

Hence every pair overlaps in \(16\) real dimensions, and

\[
\dim(T_A+T_B+T_C)=48,
\]

not

\[
3\times32=96.
\]

Each base module \(A,B,C\) is reused in two would-be generations.

Therefore triality establishes

\[
\boxed{\text{three equivalent choices of one generation}}
\]

but not yet

\[
\boxed{\text{three independent generation field spaces}.}
\]

This distinction is essential for CAR/Fock counting. Treating all three overlapping tangents as independent annihilation spaces would count the shared modules twice.

## 4. Triality permutes constructions, not particles automatically

The \(S_3\) triality symmetry acts transitively on the three choices \(T_A,T_B,T_C\). This proves their equivalence before further structure is selected.

But a symmetry relating three polarizations or decompositions does not automatically place three simultaneous copies in the physical Hilbert space. The same issue appears throughout the programme:

- three coordinate descriptions are not three particles;
- a carrier and its conjugate are not two independent generations;
- overlapping subspaces are not a direct-sum flavor triplet;
- an orbit of embeddings is not a sum of representations.

A physical generation construction must specify an associated bundle, superselection sectors or independent Fock generators for the three triality sheets.

## 5. The nested Standard-Model flag breaks the triplet to \(1+2\)

Baez and Schwahn derive the faithful Standard-Model gauge group as the stabilizer of a nested pair

\[
H_2(\mathbb C)\subset H_3(\mathbb C)\subset H_3(\mathbb O).
\]

See [Baez and Schwahn, *The Standard Model Gauge Group from the Exceptional Jordan Algebra*](https://arxiv.org/abs/2606.15235).

In a standard Jordan frame, choosing the \(H_2\) corner selects two of the three frame vertices. The permutation subgroup preserving that corner is only \(S_2\), not the full \(S_3\).

On the three frame edges,

\[
\{12,13,23\},
\]

the surviving orbit decomposition is

\[
\boxed{\{12\}\ \sqcup\ \{13,23\}.}
\]

The internal \(H_2\) edge is a singlet; the two edges connecting the selected corner to the remaining vertex form a pair. Thus the very flag that derives the Standard-Model gauge group removes a transitive three-edge generation symmetry.

## 6. Peirce spaces are not complete generations

For a Jordan frame in \(H_3(\mathbb O)\), the off-diagonal Peirce spaces are

\[
V_{12}\oplus V_{23}\oplus V_{31},
\qquad
V_{ij}\cong\mathbb O.
\]

They are three \(8\)-real-dimensional triality modules. A minimal all-left Standard-Model generation has \(15\) complex dimensions; a \(Spin(10)\)-completed generation has \(16\) complex dimensions.

Therefore the individual Peirce \(8\)-spaces cannot themselves be generations. Boyle’s viable one-generation carrier uses a pair of complexified octonionic modules,

\[
(\mathbb C\otimes\mathbb O)^2,
\]

not one Peirce edge.

## 7. The new 16-state versus 15-state tension

The exceptional tangent naturally gives the \(Spin(10)\) \(\mathbf{16}\), including \(\nu^c\). In the doublet/singlet Yukawa grading this is the balanced split

\[
8+8.
\]

Consequently its internal Euler imbalance and the joint AIII index vanish:

\[
\chi_Y=8-8=0.
\]

The forced-neutrino-zero branch instead relies on the uncompleted Furey generation

\[
8+7,
\qquad
\chi_Y=1.
\]

The two attractive mechanisms therefore choose opposite sides of the neutrino fork:

\[
\begin{array}{ccl}
\text{exceptional }Spin(10)\text{ tangent}&:&16\text{ states, Dirac completion allowed},\\
\text{Furey AIII defect}&:&15\text{ states, one protected zero}.
\end{array}
\]

They can be reconciled only if the exceptional theory explains why \(\nu^c\) is projected out, heavy, or coupled by a controlled completion/breaking mechanism.

## 8. What a genuine three-generation construction needs

The triality idea becomes a derivation only after constructing:

1. three independent associated generation bundles or Fock subspaces;
2. a common Standard-Model gauge embedding on all three;
3. a non-overcounting map from the overlapping \(T_i\) descriptions;
4. triality-breaking data compatible with the nested \(H_2\) flag;
5. inter-generation Yukawa maps and physical CP phases;
6. a reason no fourth sector occurs;
7. a definite treatment of the \(\nu^c\) present in every exceptional tangent.

One possible route is a three-sheeted bundle over the space of triality-related \(Spin(10)\) embeddings, with \(S_3\) monodromy. But the sheets must carry independent fibers rather than reuse \(A,B,C\), and the nested flag must induce the observed flavor breaking.

## 9. Branch verdict

**Established:** one exceptional tangent carries exactly one \(16\)-complex \(Spin(10)\) generation.

**Established:** triality gives three equivalent ways to choose that tangent.

**Obstructed:** the three tangent choices overlap and do not form three independent copies.

**Obstructed:** the nested Standard-Model flag splits the frame-edge triplet into \(1+2\).

**Open:** a triality cover, associated bundle or quantization that promotes the three choices to independent generation sectors without overcounting.

**Pinned:** direct statements that triality alone derives three observed generations.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** a triality-equivariant construction produces three independent \(16\)-complex associated bundles, a common faithful Standard-Model action and nontrivial mixing without duplicating the shared magic-square modules.

**Furey trigger:** the three triality sheets map canonically to three Furey TRO generations while preserving their CAR projections.

**Neutrino trigger:** the same construction explains whether \(\nu^c\) is retained, projected or made heavy and reproduces the observed neutrino-mass fork.

**Overlap falsifier:** \(T_A,T_B,T_C\) are counted as a direct sum despite their \(16\)-real pairwise intersections.

**Flag falsifier:** full \(S_3\) generation symmetry is claimed after a fixed \(H_2\) corner has reduced the relevant permutation stabilizer to \(S_2\).

**Dimension falsifier:** one \(8\)-real Peirce space is called a complete \(15\)- or \(16\)-complex generation.

**Index falsifier:** the exceptional \(16\)-state tangent is assigned the \(8-7\) AIII index without removing or otherwise treating \(\nu^c\).

## 11. Certificate

The [triality-generation incidence certificate](scripts/verify_triality_three_tangent_choices_are_not_three_independent_generations.mjs) checks tangent dimensions and overlaps, repeated use of every magic-square module, the \(1+2\) edge orbit after nested-corner selection and the \(8+8\) exceptional-index balance.

## Companion documents

- [Generation-selection no-go](321_selector_topology_anomalies_and_the_aiii_index_do_not_by_themselves_select_three_generations.md)
- [Octonions, Leech lattice and exceptional-Jordan branch](33_octonions_leech_lattice_jordan_branch.md)
- [Exceptional complement quark partial match](186_exceptional_complement_quark_partial_match_and_statistics_gate.md)
- [Neutrino completion and composite exceptional complement](187_neutrino_completion_unlocks_composite_exceptional_complement.md)
- [Fifteen-state Yukawa neutrino zero](312_the_fifteen_state_yukawa_grading_forces_one_neutrino_zero_mode_per_generation.md)
- [Textured joint AIII index](320_the_textured_joint_operator_has_a_three_generation_aiii_index_beyond_kernel_factorization.md)
