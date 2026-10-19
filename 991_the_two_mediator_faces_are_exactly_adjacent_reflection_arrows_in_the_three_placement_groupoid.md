# The Two Mediator Faces Are Exactly Adjacent Reflection Arrows in the Three-Placement Groupoid

**Date:** 18 October 2026  
**Branches:** three-placement holonomy, (A_2) Weyl group, mediator reflections, integral boundary protection, and relational carrier  
**Claim status:** exact representation-level intertwiner; physical mediator-to-placement functor remains open  
**Certificate:** [intertwine_the_three_placement_groupoid_arrows_with_the_two_integral_mediator_faces.mjs](scripts/intertwine_the_three_placement_groupoid_arrows_with_the_two_integral_mediator_faces.mjs)

## Executive result

Documents 955–956 constructed a groupoid-like orbit of three index-four carrier placements. On its trace-zero amplitude plane, the placement cycle and handle reflection act as

\[
A=\begin{pmatrix}0&-1\\1&-1\end{pmatrix},
\qquad
F=\begin{pmatrix}1&0\\1&-1\end{pmatrix}.
\]

Document 990 independently transported the two mediator faces into the integral (A_2) basis and found

\[
F_-=\begin{pmatrix}1&0\\1&-1\end{pmatrix},
\qquad
F_+=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}.
\]

The comparison is exact:

\[
\boxed{F_-=F,\qquad F_+=FA.}
\]

Therefore

\[
\boxed{F_-F_+=F(FA)=A.}
\]

The two mediator reflections are precisely the handle arrow and its adjacent cycle translate in the trace-zero placement representation. Their ordered two-face cascade is literally the placement cycle.

This is stronger than saying both constructions realize abstract (A_2), have the same character, or are conjugate over the reals. They are the same integral matrices in the already-established basis.

## 1. Placement representation

Let (C_{\rm pl}) cyclically permute the three placement objects and let (F_{\rm pl}) fix one placement while exchanging the other two. For the integral trace-zero basis

\[
B=(e_0-e_1,\ e_1-e_2),
\]

document 956 established

\[
C_{\rm pl}B=BA,
\qquad
F_{\rm pl}B=BF.
\]

The relations are

\[
A^3=I,
\qquad F^2=I,
\qquad FAF=A^{-1}.
\]

Thus (A,F) generate the six-element Weyl group (W(A_2)\cong S_3).

## 2. Mediator faces as groupoid arrows

The first mediator face is exactly the handle reflection (F). The second is the reflection obtained by following the cycle and then applying the handle in the active representation:

\[
F_+=FA.
\]

Because (F^2=I), their ordered composition collapses without a fitted similarity transform:

\[
F_-F_+=F^2A=A.
\]

Reversing the order gives (A^{-1}). The direction of face traversal is therefore the orientation of the placement cycle.

This gives the user's “one carrier, two faces, three relationships” language an exact finite form:

- one saturated carrier;
- three placement objects;
- two adjacent reflection arrows;
- their ordered relational composition is the three-cycle.

## 3. Weyl subgroup versus full lattice normalizer

Document 990 found the full twelve-element normalizer (O(G_{A_2},\mathbb Z)). The placement arrows generate its six-element Weyl subgroup. Explicitly,

\[
O(G_{A_2},\mathbb Z)
=W(A_2)\sqcup(-I)W(A_2).
\]

The central-minus coset contains the amplitude-level lifts absent from the three-point permutation action. The physical mediator reflections lie in (W(A_2)), so their quantization requires no use of the extra coset.

This cleanly separates:

- placement/Weyl relations on trace-zero amplitudes;
- central phase lifts on coherent amplitudes;
- the full integral lattice normalizer containing both.

## 4. Consequence for silver-phase protection

If physical face traversal is a morphism of the integral placement groupoid, then each face lands automatically in (W(A_2)) and is an exact reflection. Its projective eigenvalue ratio is therefore (-1), so document 990 forces the positive reactance amplitude to (k=1).

The new dependency chain is

\[
\text{integral placement groupoid}
\longrightarrow
\text{adjacent reflection arrows }(F,FA)
\longrightarrow
\text{exact Coxeter path }A
\longrightarrow
\text{unit silver amplitude}.
\]

The arithmetic protection is therefore already native to the placement branch. What remains is to prove that the analytic/Feshbach mediator process realizes those groupoid arrows rather than merely sharing their real two-dimensional representation.

## 5. The missing functor

An actual physical identification requires a functorial map assigning:

1. each of the three saturated lattice placements to a boundary or mediator configuration;
2. the handle and cycle arrows to admissible physical face traversals;
3. trace-zero placement amplitudes to the lepton–colour response pair;
4. composition of groupoid arrows to ordered composition of scattering/Feshbach maps.

Documents 956 and 963 prove that the representation types match. Documents 989–990 prove the response matrices match. They do not yet construct this object-and-arrow assignment from a local action.

## 6. Stop-everything and falsification tests

**Functor trigger:** construct an explicit mediator/placement functor that sends (F_{\rm pl}\mapsto F_-), (F_{\rm pl}C_{\rm pl}\mapsto F_+), and preserves composition.

**Charge trigger:** show that trace-zero placement amplitudes are quantized source charges carried by the outgoing (A_2) port pair.

**Local-action trigger:** derive both face arrows by integrating out the same Furey/Higgs mediator sector in two adjacent placement backgrounds.

**Arrow falsifier:** the physical second face is not the cycle translate of the first, or their product differs from (A).

**Category overclaim:** equality of two representation matrices is presented as an already-constructed physical functor.

**Central-phase warning:** the six-element placement Weyl action is used as if it automatically included the coherent (-I) lift; that belongs to the second normalizer coset and sideband sewing.

## Verdict

| Question | Verdict |
|---|---|
| Is the first mediator face the placement handle reflection? | **Yes, exactly** |
| Is the second its adjacent cycle translate? | **Yes, (F_+=FA)** |
| Is their ordered product the placement cycle? | **Yes, exactly** |
| What subgroup do they generate? | **(W(A_2)\cong S_3)** |
| Is the physical mediator-to-placement functor derived? | **No** |
| Does this include the coherent central phase automatically? | **No** |

## Position in the corpus

- [three-placement arithmetic holonomy](955_the_selector_c3_cycles_three_index_four_sublattices_so_the_common_mode_saturation_quotient_is_not_itself_the_a2_environment.md)
- [trace-zero placement (A_2) representation](956_the_trace_zero_amplitudes_of_the_three_sublattice_holonomy_are_exactly_the_a2_environment_and_galois_doublet.md)
- [integral boundary quantization](990_exact_a2_lattice_preservation_quantizes_the_boundary_reflection_and_independently_forces_unit_silver_reactance.md)
- [outgoing-port (A_2) representation](963_the_minimal_outgoing_port_pair_is_canonically_the_a2_doublet_and_its_three_face_loss_orbit_is_globally_isotropic.md)
