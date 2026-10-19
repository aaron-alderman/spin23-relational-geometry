# The Mediator Root Orbit, Multiplicity Edges, and Handle Kraus Operators Are One Three-Way A2 Frame

**Date:** 17 October 2026  
**Branches:** mediator monodromy, signed multiplicity, handle class sums, tight-frame protection, and source-to-response intertwiners  
**Claim status:** exact three-way abstract-frame theorem; physical action-identification remains open  
**Certificate:** [intertwine_the_mediator_root_orbit_with_multiplicity_edges_and_handle_kraus_triangle.mjs](scripts/intertwine_the_mediator_root_orbit_with_multiplicity_edges_and_handle_kraus_triangle.mjs)

**Subsequent advance:** document 919 derives the third mediator frame vector from coherent Feshbach/Jordan polarization of the two primitive faces, removing the need to posit it as an independent channel.

## Executive result

The completed three-root mediator orbit of document 917 is not a new isolated triangle. It is exactly the same abstract $A_2$ frame already found in:

1. the signed multiplicity-edge plane;
2. the whitened three-handle Kraus environment.

The three frames are:

\[
e_0=(1,-1,0),\quad
e_1=(0,1,-1),\quad
e_2=(-1,0,1),
\]

\[
g_0=(1,\sqrt3),\quad
g_1=(-2,0),\quad
g_2=(1,-\sqrt3),
\]

and the whitened handle operators $O_0,O_1,O_2$.

Their Gram matrices satisfy

\[
\operatorname{Gram}(e_i)=L_{K_3},
\]

\[
\operatorname{Gram}(g_i)
=\operatorname{Gram}_{\rm HS}(O_i)
=2L_{K_3}.
\]

All three frames sum to zero and are cycled by their respective order-three actions. Therefore

\[
e_i\longmapsto\frac{g_i}{\sqrt2}
\longmapsto\frac{O_i}{\sqrt2}
\]

is an exact isometric $C_3$ intertwiner at abstract-frame level.

The tight-frame metric protection in document 917 and the handle class-sum isotropy in documents 839/848/879 are the same rank-two identity.

## 1. The three Gram matrices

The multiplicity edges have

\[
\langle e_i,e_j\rangle
=
\begin{cases}
2&i=j,\\
-1&i\ne j.
\end{cases}
\]

The mediator roots have twice this Gram matrix:

\[
\langle g_i,g_j\rangle
=
\begin{cases}
4&i=j,\\
-2&i\ne j.
\end{cases}
\]

The whitened handle operators obey the identical Hilbert--Schmidt rule:

\[
\operatorname{Tr}(O_i^TO_j)
=
\begin{cases}
4&i=j,\\
-2&i\ne j.
\end{cases}
\]

Each frame has rank two and one relation:

\[
f_0+f_1+f_2=0.
\]

Hence their labelled Gram data determine exact isometries of the quotient standard planes.

## 2. Common cyclic action

The active mediator rotation sends

\[
g_0\to g_1\to g_2\to g_0.
\]

The signed multiplicity cycle permutes

\[
e_0\to e_1\to e_2\to e_0.
\]

Selector conjugation sends

\[
O_0\to O_1\to O_2\to O_0.
\]

Therefore the labelled isometries intertwine the same abstract standard representation of $C_3$.

This adds the mediator boundary-monodromy realization to the two frames already compared in document 879.

## 3. One identity, three interpretations

The common tight-frame identity has three readings:

### Multiplicity synchronization

The three differences impose equality of the switched matter nodes and select the synchronized active module.

### Mediator orbit completion

The two primitive faces close to three root lines whose equal projector sum is scalar, protecting the active metric.

### Handle class sum

The three conjugate handles average to a central quadratic response channel with a two-dimensional minimal environment.

These are not merely analogous Gram matrices. Once cyclic labels are aligned, they are the same abstract framed $C_3$ module.

## 4. What this contributes physically

Document 917 left the third mediator relationship potentially hypothetical. The present theorem shows that its completed frame already exists independently as the handle class-sum environment and the multiplicity mismatch plane.

This does not yet prove that the vector-mediator effective action dynamically generates the handle class sum. But the missing map is now sharply constrained: it must preserve the complete labelled Gram matrix and cyclic action. No continuous frame-shape freedom remains.

The remaining ambiguities are only:

- cyclic relabelling;
- reflection of the cycle orientation;
- overall sign/orientation;
- physical typing of the three actions.

## 5. Typing boundary

The three cycles currently mean different things:

- multiplicity cycling permutes switched matter-response labels;
- mediator cycling is boundary monodromy on the aggregate response plane;
- handle cycling is conjugation in the bilocal symplectic carrier.

Microscopic color acts inside its own augmentation ideal and is not automatically any of these label permutations.

Thus the theorem supplies a unique abstract response intertwiner, not an unbroken gauge identification.

## 6. Stop-everything and falsification criteria

**Response-intertwiner trigger:** one Feshbach/Jordan reduction maps each mediator projector to the correspondingly labelled handle Kraus operator.

**Middle-frame trigger:** the Furey middle-slot response tensor supplies the same cyclic labelling without an arbitrary permutation.

**Class-sum trigger:** integrating one complete boundary orbit gives the established central handle channel with the certified normalization.

**Gram falsifier:** a proposed physical map changes one diagonal or off-diagonal frame inner product.

**Typing falsifier:** abstract $C_3$ equivariance is identified with microscopic color covariance without the response quotient.

## 7. Verdict

| Question | Verdict |
|---|---|
| Are the mediator roots and signed edges the same normalized frame? | **yes** |
| Are the mediator roots and whitened handles the same frame? | **yes** |
| Do all three cyclic actions intertwine abstractly? | **yes** |
| Is the third relationship present elsewhere in the corpus? | **yes, as the handle/mismatch frame** |
| Is the physical map between the three actions derived? | **not yet** |

## 8. Position in the corpus

- [two faces complete to the protected three-root orbit](917_the_two_mediator_faces_generate_c3_but_only_the_completed_three_root_a2_orbit_protects_the_response_metric.md)
- [multiplicity-edge/handle-frame theorem](879_the_signed_multiplicity_edges_and_the_three_handle_kraus_operators_are_the_same_zero_sum_triangle_as_abstract_frames_but_their_c3_actions_are_differently_typed.md)
- [Gaussian reduction to the handle class sum](880_isotropic_gaussian_reduction_of_the_signed_multiplicity_mismatch_plane_produces_the_exact_three_handle_class_sum_channel.md)
- [full-selector central class sum](848_the_quadratic_handle_twirl_is_a_central_class_sum_for_the_full_order_18_selector.md)
- [coherent quadratic derivation of the third root](919_the_third_a2_relationship_is_the_coherent_two_face_feshbach_self_energy_and_its_cross_term_is_the_jordan_polarization.md)

**Subsequent fourth realization:** document [946](946_galois_covariance_canonically_selects_the_trace_zero_four_plane_and_removes_the_handle_factorization_grassmannian.md) adds the trace-zero plane of the three cyclotomic embeddings as another canonical $A_2$ permutation summand. Its channel compression reaches the handle Kraus frame through document 945. The abstract representation bridge is exact; a source-native commuting diagram to the mediator labels remains open.
