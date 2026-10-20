# A Single Mediator Bubble Leaves the Rank-One Schur Cone Unless Its Loop Portal Shares the Tree Coupling Ray

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact one-loop counterterm-support theorem in the smallest scalar proxy; the physical Pati--Salam one-loop calculation remains conditional on its representation-and-vertex census

**Depends on:** [the typed-path Schur packet](1508_the_typed_path_matching_law_maps_the_required_composite_to_a_rank_one_Schur_packet_not_an_independent_leakage_arrow.md), [the multi-packet common-ray theorem](1509_sums_of_rank_one_Schur_packets_preserve_the_texture_only_when_all_mediator_paths_share_one_projective_coupling_ray.md), [the local/global alignment no-go](1510_one_dimensional_local_arrow_spaces_do_not_force_the_global_rank_one_Schur_alignment_ideal.md), and [the investigation roadmap](1511_the_highest_value_next_investigations_are_the_physical_intertwiner_RG_tangency_and_categorical_closure_tests.md)

**Evidence:** [one-loop tangency ledger](../../../evidence/data/spin23-one-loop-Schur-tangency-toy.json) and [exact verifier](../../../verification/verify/verify_spin23_one_loop_Schur_tangency_toy.mjs)

## Result

The smallest explicit loop test gives a conditional negative result. Tree-level
Schur provenance is not by itself an RG-invariance theorem.

Take three real scalar placeholders \(L,P,N\), with \(P\) the typed mediator.
The quadratic portals are

\[
v=\begin{pmatrix}d\\y\end{pmatrix},
\qquad
V_2\supset \frac12aP^2+dLP+yNP.
\]

Eliminating \(P\) gives the protected endpoint packet

\[
G_{\rm tree}=-\frac1a vv^T,
\qquad
\det G_{\rm tree}=0.
\]

Now admit the smallest cubic interaction that lets the same mediator run in a
one-loop endpoint bubble,

\[
V_3=\frac12P^2(g_LL+g_NN),
\qquad
g=\begin{pmatrix}g_L\\g_N\end{pmatrix}.
\]

The divergent endpoint two-point function has support

\[
\delta G=\kappa gg^T,
\]

where \(\kappa\) is the common nonzero one-loop pole coefficient. Its precise
normalization and subtraction sign do not affect the tangency question. The
sum obeys the exact identity

\[
\boxed{
\det\left(-\frac1a vv^T+\kappa gg^T\right)
=-\frac{\kappa}{a}(d g_N-y g_L)^2.}
\]

Consequently the one-loop vector field is tangent to the protected Schur cone
only when the loop portal is absent or shares the tree coupling ray:

\[
\boxed{d g_N-y g_L=0.}
\]

An independent loop ray supplies a primitive transverse counterterm even
though the tree packet and the loop packet are separately rank one.

## 1. Frozen toy theory

This calculation deliberately uses a scalar counterterm proxy rather than
pretending to be the full Pati--Salam beta function. A complete local
potential may add positive diagonal quartics for stability; they do not
remove the displayed \(P\)-bubble pole. Around the matching point, the terms
needed for the endpoint calculation are

\[
V(L,P,N)=\frac12aP^2+dLP+yNP
+\frac12P^2(g_LL+g_NN)+V_{\rm diagonal\ quartic}.
\]

The two cubic vertices \(LPP\) and \(NPP\) generate the endpoint two-point
counterterm. In a general cubic scalar theory the logarithmic pole has Gram
support

\[
(\delta M^2)_{ij}\propto h_{ikl}h_{jkl}.
\]

Restricting \(i,j\) to \(L,N\) and using only
\(h_{LPP}=g_L\), \(h_{NPP}=g_N\) yields \(gg^T\). The same interaction can
renormalize the mediator mass \(a\); that changes only the scalar coefficient
of \(vv^T\) and is tangent to the rank-one cone. It does not cancel the
squared-minor obstruction.

The model is minimal in the relevant sense: no fourth field, primitive
\(LN\) quadratic term, or second mediator is required to produce the
transverse direction.

## 2. Exact tangency calculation

Write

\[
G=\begin{pmatrix}c&p\\p&s\end{pmatrix}
=-\frac1a
\begin{pmatrix}d^2&dy\\dy&y^2\end{pmatrix}
+\kappa
\begin{pmatrix}g_L^2&g_Lg_N\\g_Lg_N&g_N^2\end{pmatrix}.
\]

For the protected ideal \(I=cs-p^2\), direct expansion gives

\[
I(\kappa)=-\frac{\kappa}{a}\Delta^2,
\qquad
\Delta=d g_N-y g_L.
\]

There is no \(\kappa^2\) term because the loop counterterm is itself rank one.
The normal derivative on the tree cone is therefore

\[
\boxed{
\left.\frac{dI}{d\kappa}\right|_{\kappa=0}
=-\frac1a\Delta^2.}
\]

For nonzero \(a\), this vanishes exactly on the aligned locus. Thus the
calculation is an algebraic tangency test, not a numerical suggestion.

## 3. Exhaustive finite audit

The verifier uses

\[
a\in\{1,2,3\},
\qquad
d,y,g_L,g_N\in\{-2,-1,1,2\}.
\]

Among 768 nonzero-coupling assignments:

- 144 have \(\Delta=0\) and remain on the Schur cone;
- 624 have \(\Delta\ne0\) and acquire nonzero determinant;
- every case satisfies the exact cleared-denominator identity.

The enumeration illustrates genericity but is not needed for the theorem.

## 4. What is proved

The calculation proves three narrow statements.

1. A one-loop counterterm may be a complete rank-one packet and still destroy
   protection when added to a tree packet on another ray.
2. In this smallest mediator-bubble theory, tangency is equivalent to the same
   global projective-alignment condition already found at tree level in claim
   1509.
3. Remembering loop provenance is insufficient unless the typed structure
   also identifies or excludes independent loop coupling rays.

This is a decisive toy-model answer to roadmap priority 3: **generic
tangency fails**. The failure is repaired by an exact common-source law
\(g=\lambda v\), or by a selection rule excluding at least one of the two
cubic endpoint portals.

## 5. What is not proved

The scalar placeholders do not establish that the physical Pati--Salam
carrier admits \(LPP\) and \(NPP\), nor that fermion, gauge and scalar loops
have precisely this field content. The calculation therefore does not prove
that the physical model is radiatively unstable.

It also does not provide:

- the complete one-loop beta functions of a specified Pati--Salam
  Lagrangian;
- threshold matching across every mediator representation;
- a Ward identity deriving \(g\parallel v\);
- all-orders closure of the determinantal ideal;
- loop-momentum or nonlocal form-factor closure.

Those questions cannot be answered honestly until the physical inventory
fixes the representations, allowed vertices and aggregate intertwiner space.

## 6. Consequence for the programme

The physical census must now track loop vertices as vectors in the same
endpoint coupling plane as the tree portals. For every admitted loop topology
it must decide

\[
g_\alpha=0
\quad\text{or}\quad
g_\alpha=\lambda_\alpha v.
\]

Finding one symmetry-allowed \(g_\alpha\) with
\(\det(v,g_\alpha)\ne0\) is enough to reject exact radiative protection in
that carrier. Conversely, showing that every allowed cubic, Yukawa and gauge
counterterm factors through the same aggregate intertwiner line would promote
the present conditional tangent branch into a technical-naturalness result.

This sharpens the Spin(2,3) target. The desired relational structure must be
multiplicity one not only for tree mediator paths but for the complete
counterterm module. Relation-sheet parity alone does not establish that
stronger statement.

## Verdict

The smallest loop model does not preserve the protected variety generically:

\[
\boxed{
\beta(I)\big|_{I=0}\propto
-(d g_N-y g_L)^2\ne0
\quad\text{for an independent loop ray}.}
\]

The surviving positive condition is precise and testable:

\[
\boxed{
\text{all admitted tree and loop portal vectors must share one aggregate
intertwiner line, or be absent}.}
\]

Thus roadmap priority 3 is closed for the minimal proxy and converted into a
finite representation-and-vertex question for the physical Pati--Salam
carrier.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_one_loop_Schur_tangency_toy.mjs
~~~
