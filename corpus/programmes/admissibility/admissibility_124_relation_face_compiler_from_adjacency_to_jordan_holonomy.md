# The Relation--Face Compiler from Adjacency to Jordan Holonomy

**Date:** 26 October 2026
**Status:** exact finite compiler; local edge atoms, graph assembly, Schur descent and the first phase/orientation threshold are verified; source-native order and physical promotion remain open
**Targets:** OT-026, OT-027
**Evidence:** [relation-face compiler v1](../../../evidence/data/relation-face-compiler-v1.json)
**Verifier:** [executable audit](../../../verification/admissibility/verify_relation_face_compiler.mjs)

## What the adjacency matrix actually contributes

An adjacency matrix is the coordinate table of a binary relation. It records
which named objects touch and, when weighted, how strongly. It is therefore
the natural **relation skeleton** of the corpus's thing-and-mirror-face
language. It is not yet the face, an invariant, a positive order or a law of
motion. Those require additional typed operations.

For a vertex set $V$, a selected boundary $F\subseteq V$ has the corner

\[
P_F A P_F.
\]

This is the elementary matrix meaning of a face: retain only the relations
visible inside the selected support. For a directed relation, transposition
$A\mapsto A^T$ reverses every arrow. But AZ-112 already proves that this
reversal need not lift to the full Claimipedia path algebra. The elementary
picture is useful precisely because it exposes which extra structures have
to be earned.

## The missing diagonal completes relation into admission

Let an undirected edge $e=\{i,j\}$ have weight $w_e>0$, and define its
oriented and unoriented incidence columns

\[
b_e=e_i-e_j,
\qquad
c_e=e_i+e_j.
\]

The two local kernels are

\[
L_e=w_e b_e b_e^T
=w_e\begin{pmatrix}1&-1\\-1&1\end{pmatrix},
\qquad
Q_e=w_e c_e c_e^T
=w_e\begin{pmatrix}1&1\\1&1\end{pmatrix}.
\]

Both are rank-one positive-semidefinite matrices with zero determinant. They
are the two elementary boundary rays of the cone $H_2(\mathbb R)^+$. The
edge does not merely say “related”: after its diagonal self-response is
supplied, it becomes a positive admissible comparison of a difference or a
sum mode.

Gluing these atoms over the graph gives

\[
L=\sum_e w_e b_e b_e^T=BWB^T=D-A,
\qquad
Q=\sum_e w_e c_e c_e^T=CWC^T=D+A.
\]

This is the first whole-graph theorem of the compiler:

> A positive graph kernel is assembled by sewing local $H_2(\mathbb R)^+$
> boundary atoms. Adjacency supplies the off-diagonal relation skeleton;
> incidence and the diagonal response supply the positive order.

It is why adjacency alone cannot close OT-026. The same support can carry
different signs, weights, diagonal terms, kernels and dynamics.

## Hidden paths compile to a boundary face

Partition a positive kernel $K\succeq0$ into visible boundary vertices $B$
and hidden interior vertices $I$. Eliminating the interior gives

\[
K_{\mathrm{eff}}
=K_{BB}-K_{BI}K_{II}^{-1}K_{IB}.
\]

This Schur complement is again positive when the required block is positive
and invertible. If two ports remain, $K_{\mathrm{eff}}\in
H_2(\mathbb R)^+$. Thus a two-port Jordan face need not be postulated as a
primitive object: it can be the effective relation seen after all admissible
hidden paths have been integrated out. In electrical-network language this is
Kron reduction; in the corpus it is the concrete relation between path memory
and the response face developed in claims 156, 200 and 201.

The determinant identity

\[
\det K=\det K_{II}\,\det K_{\mathrm{eff}}
\]

shows exactly what survives the descent. The reduced face remembers the
boundary response, not the individual interior histories that produced it.
That loss is the operational counterpart of AZ-111's thirty discarded radical
dimensions.

## Why the complex coordinate is real but not yet observable

The cone $H_2(\mathbb C)^+$ has

\[
X=\begin{pmatrix}t+z&x-iy\\x+iy&t-z\end{pmatrix},
\qquad
\det X=t^2-x^2-y^2-z^2.
\]

Algebraically this is the familiar $1+3$ Lorentz determinant. A Hermitian
adjacency can also encode an oriented edge by conjugate entries $i$ and
$-i$. These facts are exact, but they do not imply that a single edge has a
physical phase observable. Under vertex rephasing,

\[
g_{ij}\longmapsto e^{i\chi_i}g_{ij}e^{-i\chi_j},
\]

the phase of every edge in a spanning tree can be removed. A graph with
$E$ edges, $V$ vertices and $c$ connected components has

\[
b_1=E-V+c
\]

independent Abelian cycle phases. Therefore $K_2$ has none. The complex
off-diagonal direction becomes graph-observable only after either a cycle or
an external coherent phase reference fixes the gauge.

This is the compiler's central promotion firewall:

\[
\boxed{\text{algebraic coordinate}\ne\text{gauge-invariant record}.}
\]

## The triangle is the first holonomy detector

For a triangle, the product

\[
\mathcal H=g_{12}g_{23}g_{31}
=|\mathcal H|e^{i\Phi}
\]

is invariant under all vertex rephasings. It is the first nontrivial global
return built from locally rephasable relations. For

\[
H=\begin{pmatrix}
a&u&\overline w\\
\overline u&b&v\\
w&\overline v&c
\end{pmatrix},
\]

the cubic determinant is

\[
\det H=abc-a|v|^2-b|w|^2-c|u|^2+2\operatorname{Re}(uvw).
\]

It reads $2|uvw|\cos\Phi$. It is therefore invariant under
$\Phi\mapsto-\Phi$: the cubic Jordan norm detects the presence and even
magnitude of holonomy but identifies the two orientations. The missing record
is proportional to

\[
2\operatorname{Im}(uvw)=2|uvw|\sin\Phi,
\]

which changes sign under orientation reversal. This reproduces, in the
smallest graph, the corpus's repeated detector lesson: positivity and scalar
invariants can close a quotient while an orientation-odd port is required to
lift its mirror pair.

## The compiler

The resulting typed route is

\[
\boxed{\text{typed adjacency}}
\to\boxed{\text{incidence or path algebra}}
\to\boxed{\text{positive kernel}}
\to\boxed{\text{Schur boundary face}}
\to\boxed{\text{Jordan determinant}}
\to\boxed{\text{cycle holonomy}}
\to\boxed{\text{orientation-odd detector}}.
\]

Each arrow has a distinct obligation:

| Stage | Adds | Forgets or leaves open |
|---|---|---|
| adjacency | support and relation type | order, scale, dynamics |
| incidence/path algebra | composition and local orientation | positive admission |
| positive kernel | energy, precision or admittance order | microscopic origin |
| Schur face | effective visible response | hidden path history |
| Jordan determinant | rank and cone boundary | orientation sign |
| cycle holonomy | gauge-invariant global return | detector accessibility |
| odd detector | orientation lift | physical interpretation still requires calibration |

This also locates the locally invariant carrier of AZ-123. In a graph model,
the invariant is not generically the raw adjacency matrix. It is the declared
pairing, kernel or connection law that remains compatible under allowed local
changes of perspective. The cycle return can then be globally nontrivial even
while every local comparison remains admissible.

## Collision with the existing corpus

- [AZ-111](admissibility_111_relation_quotient_jordan_face_and_positive_order_boundary.md)
  supplies the exact quotient-local $H_2(\mathbb Q)$ Jordan face.
- [AZ-112](admissibility_112_the_jordan_face_involution_does_not_lift_through_path_memory.md)
  proves that ordinary transpose is not a hidden involution of the full
  35-dimensional relation algebra.
- [Claim 156](../../claims/0100-0199/156_walk_two_port_h2r_boundary_response.md)
  constructs a positive two-port face from a finite walk.
- [Claim 200](../../claims/0200-0299/200_three_port_h3r_cubic_consistency_and_spin23_edge_reduction.md)
  contains the three-port determinant and the real-versus-imaginary holonomy
  split.
- [Claim 201](../../claims/0200-0299/201_recursive_schur_jordan_descent_and_functorial_sewing.md)
  establishes recursive Schur--Jordan sewing.
- [Claims 386](../../claims/0300-0399/386_schur_reduction_turns_three_port_holonomy_into_exactly_the_two_or_spurions_needed_by_the_pin_phase.md)
  and [390](../../claims/0300-0399/390_schur_holonomy_maps_to_the_pin_hamiltonian_only_for_a_kernel_or_admittance_not_an_arbitrary_correlator.md)
  enforce the kernel/admittance typing needed for physical descent.
- [Claim 432](../../claims/0400-0499/432_the_completed_furey_linking_graph_has_exactly_two_independent_flavor_cycles_and_a_gauge_covariant_plaquette.md)
  supplies the higher graph cycle-rank and plaquette precedent.
- [AZ-123](admissibility_123_locally_invariant_carrier_and_mirror_face_spine.md)
  supplies the local-invariance/global-return interpretation.

The novelty is not any one ingredient. It is their exact ordering and the
proof that the first genuine face is already present edge-locally, while the
first genuine phase is necessarily cycle-global.

## Literature boundary

This compiler joins standard mathematical constructions rather than claiming
a new graph theorem. Dörfler and Bullo identify Kron reduction with the Schur
complement of a graph Laplacian ([arXiv:1102.2950](https://arxiv.org/abs/1102.2950)).
Guo and Mohar develop Hermitian adjacency for directed and mixed graphs using
conjugate $i,-i$ entries ([arXiv:1505.01321](https://arxiv.org/abs/1505.01321)).
Mehatari, Kannan and Samanta study adjacency matrices whose oriented edges
carry inverse unit-complex gains ([arXiv:1812.03747](https://arxiv.org/abs/1812.03747));
Samanta and Kannan give tree characterizations in the resulting spectral
family ([arXiv:1908.10668](https://arxiv.org/abs/1908.10668)).
The user-supplied [MathWorld adjacency-matrix entry](https://mathworld.wolfram.com/AdjacencyMatrix.html)
provides the elementary relation representation. The corpus contribution is a
typed synthesis with explicit loss and promotion gates, not priority over
those literatures.

## Decision and next experiment

The mathematical compiler is closed on finite graphs. It does **not** repair
AZ-112 by fiat, derive positivity from Claimipedia, identify a physical
substrate, establish $Spin(2,3)$ dynamics or provide evidence of new physics.

The strongest next move is now sharply finite:

1. choose one source-native Claimipedia relation family without inspecting the
   desired quotient answer;
2. derive its dagger, positive kernel and visible/hidden partition from source
   semantics;
3. Schur-reduce it and test whether the resulting face agrees with the
   quotient-local $H_2$ structure;
4. reserve one boundary response or oriented cycle statistic as held out; and
5. accept promotion only if the compiled model predicts that record without a
   post-hoc sign, phase or diagonal choice.

If it fails, the failure locates the missing structure: dagger, order,
boundary, cycle or detector. If it succeeds, OT-026 advances from a discovered
quotient resemblance to a generative relation-to-observable translation.
