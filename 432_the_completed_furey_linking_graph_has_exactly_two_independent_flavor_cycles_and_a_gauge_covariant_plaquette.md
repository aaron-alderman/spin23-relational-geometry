# The Completed Furey Linking Graph Has Exactly Two Independent Flavor Cycles and a Gauge-Covariant Plaquette

**Date:** 17 October 2026  
**Branches:** B03, B06, B08, B11 and B14  
**Claim status:** exact graph/linking-holonomy theorem; physical edge transports and their Yukawa identification remain open

## 1. The completed matter graph

The completed Furey TRO has five linking vertices

\[
O_2,quad H,quad C,quad D,quad E
\]

and six matter arrows:

\[
\begin{aligned}
Q &: O_2\leftarrow H,\\
u^c &: C\leftarrow O_2,\\
d^c &: D\leftarrow O_2,\\
L &: H\leftarrow E,\\
e^c &: E\leftarrow C,\\
\nu^c &: E\leftarrow D.
\end{aligned}
\]

Ignoring orientation only for the graph count, this graph is connected with

\[
V=5,
\qquad
E=6.
\]

Its first Betti number is therefore

\[
\boxed{
b_1=E-V+1=2.
}

The completed relational graph has exactly two independent cycles.

## 2. The two naturally labelled cycles

Using the arrow directions where possible, both cycles may be based at \(H\):

\[
\gamma_C:
H\xrightarrow{Q}O_2
\xrightarrow{u^c}C
\xrightarrow{e^c}E
\xrightarrow{L}H,
\]

and

\[
\gamma_D:
H\xrightarrow{Q}O_2
\xrightarrow{d^c}D
\xrightarrow{\nu^c}E
\xrightarrow{L}H.
\]

They share the \(H\leftrightarrow O_2\) and \(E\leftrightarrow H\) relational legs and differ only through the \(C\) versus \(D\) branch.

The sterile-neutrino completion \(\nu^c:E\leftarrow D\) is essential: without it the \(D\) branch does not close into the second cycle.

Thus the same arrow that completed the ternary system and cancelled the puncture anomaly also raises the graph cycle rank to two.

## 3. Generation-amplified edge transports

Attach a three-dimensional generation space to every linking vertex. Assign to each oriented edge \(e:s\to t\) a unitary flavor transport

\[
T_e:F_s\longrightarrow F_t.
\]

A change of flavor frame \(g_v\in U(3)\) at each vertex acts by

\[
T_e\longmapsto T'_e=g_tT_eg_s^\dagger.
\]

The two based holonomies are

\[
\begin{aligned}
U_C&=T_L T_{e^c}T_{u^c}T_Q,\\
U_D&=T_L T_{\nu^c}T_{d^c}T_Q.
\end{aligned}
\]

All intermediate vertex transformations cancel, leaving

\[
U_C\mapsto g_HU_Cg_H^\dagger,
\qquad
U_D\mapsto g_HU_Dg_H^\dagger.
\]

Therefore traces of words in \(U_C,U_D\) are invariant under every vertex-frame choice.

## 4. Exact plaquette from the two graph cycles

The group commutator

\[
\boxed{
W_{CD}=U_CU_DU_C^{-1}U_D^{-1}
}

transforms only by conjugation at the base vertex:

\[
W_{CD}\mapsto g_HW_{CD}g_H^\dagger.
\]

Hence

\[
\operatorname{Tr}W_{CD},
\qquad
\operatorname{ImTr}W_{CD}
\]

are exact global linking-graph invariants. Also

\[
\det W_{CD}=1.
\]

This gives the rectangular flavor plaquette a source-defined topological location: it is the commutator of the two independent completed-Furey cycle holonomies.

## 5. Spanning-tree normal form

Choose any spanning tree of the five-vertex graph. Vertex-frame transformations can set all four tree-edge transports to the identity. The two remaining chord transports represent the two independent cycle holonomies.

Thus, modulo vertex gauge,

\[
\{\text{six edge transports}\}
\longrightarrow
\{U_C,U_D\}/\text{simultaneous conjugation}.
\]

This is the usual representation variety

\[
\operatorname{Hom}(F_2,U(3))/U(3)
\]

of the free group on two generators, with the physical branch labels \(C,D\) selecting a preferred generating pair.

The plaquette character is therefore not an arbitrary extra loop added to the TRO. It is the first non-Abelian invariant of the graph’s own two-generator cycle space.

## 6. Relation to the Jarlskog loop

> **Refinement.** After the required Higgs arrows are included, these two matter-only holonomies factor as paired quark–lepton Yukawa holonomies rather than individual up/down holonomies. See [the Higgs-augmented four-cycle theorem](435_the_higgs_augmented_linking_graph_has_four_yukawa_cycles_and_the_two_matter_cycles_are_paired_composites.md). The conditional calculation below remains algebraically correct, but a direct CKM interpretation of \(H_C,H_D\) is not justified.

If dynamics produces small cycle holonomies

\[
U_C=e^{itH_C},
\qquad
U_D=e^{itH_D},
\]

then

\[
\operatorname{ImTr}W_{CD}
=-\frac{t^6}{6}
\operatorname{ImTr}[H_C,H_D]^3
+O(t^7).
\]

If \(H_C,H_D\) are identified with the appropriate up/down or charged/neutral flavor Hermitian spurions, the leading graph invariant is the Jarlskog commutator cubic.

That identification is conditional. The graph supplies the two cycles and their gauge law, not the numerical edge transports or Yukawa dynamics.

## 7. Why the sterile completion matters again

Remove the \(\nu^c\) edge. Then

\[
E=5,qquad V=5,qquad b_1=1.
\]

Only the \(C\)-branch cycle remains. A single cycle holonomy has no second independent generator with which to form a non-Abelian commutator plaquette.

Restoring \(\nu^c\) therefore simultaneously:

1. closes the completed matter TRO;
2. cancels the rank-one anomaly-code puncture defect;
3. creates the second independent relational cycle;
4. makes a graph-internal Jarlskog-type plaquette possible.

This is a genuine cross-branch convergence. It does not yet prove that the physical CP phase is caused by the sterile state.

## 8. Relation to the user’s carrier intuition

The graph realizes a concrete version of the proposed relational pattern:

- one connected carrier graph;
- two inequivalent cycle faces, \(C\) and \(D\);
- three layers of relation: edge transport, individual cycle holonomy and their non-Abelian commutator.

This is not yet the claimed three-strand braid or \(Spin(2,3)\) itself. It is an exact finite relational structure on which those intuitions can now be tested.

## 9. Branch decision

- **Closed:** the completed Furey linking graph has cycle rank exactly two.
- **Closed:** the two cycles are naturally distinguished by the \(C\) and \(D\) branches.
- **Closed:** their holonomies transform by simultaneous conjugation under all vertex flavor frames.
- **Closed:** their group commutator supplies an exact gauge-invariant trace character with unit determinant.
- **Closed:** deleting \(\nu^c\) reduces the cycle rank to one and removes the internal plaquette construction.
- **Open:** derivation of edge transports from Higgs/Yukawa/Furey dynamics.
- **Open:** identification of the two infinitesimal holonomies with physical flavor spurions.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive the six edge transports from the completed Furey/Higgs action and show that the two graph holonomies reproduce the measured CKM or PMNS commutator invariant without arbitrary loop assignments.

**Topology falsifier:** the declared completed graph has a different connected cycle rank after all shared vertices and arrows are counted correctly.

**Gauge falsifier:** a proposed loop trace changes under independent unitary frame changes at internal vertices.

**Sterile overclaim falsifier:** infer that \(\nu^c\) dynamically causes CP merely because it creates the second available cycle.

**Transport falsifier:** choose edge matrices freely and present the resulting Jarlskog value as a prediction.

## 11. Certificate

The [completed linking-graph flavor-holonomy certificate](scripts/verify_completed_furey_graph_has_two_flavor_cycles_and_covariant_plaquette.mjs) checks the graph cycle rank, the loss of one cycle after puncturing \(\nu^c\), vertex-gauge covariance of both holonomies, invariance of the plaquette trace and unit determinant.

## Companion documents

- [Flavor plaquette in the amplified Furey TRO](431_the_flavor_plaquette_lifts_to_an_inner_ternary_automorphism_only_after_generation_amplification_of_the_furey_tro.md)
- [Rectangular flavor group-commutator loop](430_a_rectangular_flavor_group_commutator_loop_has_the_jarlskog_cubic_as_its_leading_cp_odd_character.md)
- [Completed Furey TRO/five-bit intertwiner](412_the_completed_furey_tro_carries_the_so10_five_bit_code_as_a_cartan_ternary_intertwiner.md)
- [Puncture-neutral Standard-Model stabilizer](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md)
