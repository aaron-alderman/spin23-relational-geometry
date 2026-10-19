# The Dyadic Lie Image Is a Unique-Lagrangian Boundary Extension of sl(2,F2) by a Two-Dimensional Abelian Radical

**Date:** 18 October 2026  
**Branches:** dyadic integral order, parabolic boundary, Lagrangian selector, and finite reduction  
**Claim status:** exact finite-linear-algebra theorem  
**Certificate:** [compute_the_integral_order_of_the_doubled_face_common_mode_carrier.mjs](../../../verification/compute/compute_the_integral_order_of_the_doubled_face_common_mode_carrier.mjs)

## Executive result

The five-dimensional mod-two image found in document 976 has now been identified intrinsically. On the four-dimensional symplectic carrier over $\mathbb F_2$, it preserves

\[
W_2=\langle e_2,e_3\rangle,
\]

and exhaustive enumeration shows:

- $W_2$ is the **unique invariant two-plane**;
- $W_2$ is Lagrangian;
- there is no invariant line;
- there is no nonzero common-kernel vector.

The induced action on $W_2$ has dimension three and is the full trace-zero matrix algebra

\[
\mathfrak{sl}(2,\mathbb F_2).
\]

The action on the symplectic quotient is the corresponding three-dimensional dual action. The kernel of the joint diagonal action is a two-dimensional abelian ideal. Therefore the dyadic image $\mathfrak g_2$ fits into the exact sequence

\[
0\longrightarrow \mathbb F_2^2
\longrightarrow \mathfrak g_2
\longrightarrow \mathfrak{sl}(2,\mathbb F_2)
\longrightarrow0.
\]

No splitting of this exact sequence is claimed here.

## 1. Exhaustive invariant-subspace census

There are fifteen lines and thirty-five two-planes in $\mathbb F_2^4$. Testing all of them against a basis of the generated mod-two Lie algebra gives

\[
\#\{\text{invariant lines}\}=0,
\qquad
\#\{\text{invariant planes}\}=1.
\]

The survivor has code set

\[
\{0,2,4,6\},
\]

which is $\langle e_2,e_3\rangle$ in the standard symplectic coordinates used by document 976. Its symplectic pairing vanishes identically, so it is a maximal isotropic plane.

This identifies the reduction as boundary-parabolic data: the arithmetic order remembers one Lagrangian boundary even though its characteristic-zero closure is the full simple algebra.

## 2. Levi image and radical

Restricting the five generators to $W_2$ gives a three-dimensional image. Every image matrix has trace zero, and the space of trace-zero $2\times2$ matrices over $\mathbb F_2$ also has dimension three. Hence the restriction image is exactly $\mathfrak{sl}(2,\mathbb F_2)$.

The quotient action has the same rank, and the combined diagonal action still has rank three. Its kernel inside $\mathfrak g_2$ therefore has dimension

\[
5-3=2.
\]

Direct commutator evaluation shows this kernel is abelian. It is the residual off-diagonal boundary module omitted from the full seven-dimensional Lagrangian parabolic.

## 3. Interpretation

The prime-two defect is now geometrically typed:

\[
\text{full characteristic-zero }\mathfrak{sp}_4
\quad\rightsquigarrow\quad
\text{unique Lagrangian boundary at }p=2.
\]

This makes the parahoric branch substantially more credible. The selected integral order is not merely sparse modulo two; it retains a unique maximal-isotropic carrier and a nontrivial internal $\mathfrak{sl}_2$ action with a two-dimensional abelian boundary ideal.

The result also supplies a sharp comparison target for the project’s repeated $A_2$ doublets. Dimension two alone is not enough: the radical must be compared equivariantly with the placement, Galois, and outgoing-port doublets under the induced $\mathfrak{sl}(2,\mathbb F_2)$ action.

## 4. Stop-everything tests

**Parahoric identification trigger:** identify the integral order as the inverse image of this five-dimensional subalgebra under reduction modulo two. That would give a standard arithmetic definition independent of the generating presentation.

**Environment trigger:** the abelian radical realifies or lifts canonically to the physical $A_2$ environment doublet.

**Placement-completion trigger:** the three saturation placements carry three conjugate Lagrangian planes whose generated mod-two algebra is all of $\mathfrak{sp}(4,\mathbb F_2)$.

**Uniqueness falsifier:** any second invariant line or plane for the same five-dimensional image contradicts the exhaustive finite census.

**Splitting warning:** the exact sequence above must not be written as a semidirect product until a Lie-algebra section is exhibited.

## Verdict

| Question | Verdict |
|---|---|
| Is the mod-two image arbitrary rank-five data? | **No** |
| Does it preserve a Lagrangian plane? | **Yes, uniquely** |
| Does it preserve a line? | **No** |
| What is its diagonal image? | **$\mathfrak{sl}(2,\mathbb F_2)$** |
| What is the kernel dimension? | **Two** |
| Is the kernel abelian? | **Yes** |
| Is the extension proved to split? | **No** |

## Position in the corpus

- [dyadic index-512 integral order](976_the_common_mode_carrier_supports_a_full_rational_sp4_but_its_generated_integral_lie_order_has_dyadic_index_512.md)
- [common-mode carrier selection](975_primitive_face_integrality_obstructs_every_index_four_saturation_but_doubled_faces_uniquely_select_the_common_mode_carrier.md)
- [three-placement arithmetic holonomy](955_the_selector_c3_cycles_three_index_four_sublattices_so_the_common_mode_saturation_quotient_is_not_itself_the_a2_environment.md)
