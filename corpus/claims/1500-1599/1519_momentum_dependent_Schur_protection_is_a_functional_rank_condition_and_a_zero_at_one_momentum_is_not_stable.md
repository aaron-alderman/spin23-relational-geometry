# Momentum-Dependent Schur Protection Is a Functional-Rank Condition, and a Zero at One Momentum Is Not Stable

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact finite-packet functional determinant theorem and analytic-interval tangency criterion; physical Pati--Salam loop inventory and beta functions remain open

**Depends on:** [the minimal masked Pati--Salam tree census](1512_the_minimal_pati_salam_tree_census_leaves_one_correlated_Schur_column_but_does_not_derive_the_family_intertwiner.md), [the single-bubble tangency test](1514_a_single_mediator_bubble_leaves_the_rank_one_Schur_cone_unless_its_loop_portal_shares_the_tree_coupling_ray.md), and [the real same-sign packet theorem](1509_sums_of_rank_one_Schur_packets_preserve_the_texture_only_when_all_mediator_paths_share_one_projective_coupling_ray.md)

**Evidence:** [functional tangency ledger](../../../evidence/data/spin23-functional-Schur-loop-tangency.json) and [exact polynomial verifier](../../../verification/verify/verify_spin23_functional_Schur_loop_tangency.mjs)

## Result

Momentum-dependent loop matching strengthens the common-ray problem; it does
not weaken it.

Let a finite collection of tree and loop contributions to the two-endpoint
kernel be

\[
G(z)=\sum_{i=0}^{m}w_i(z)u_i u_i^T,
\qquad
u_i=\begin{pmatrix}d_i\\y_i\end{pmatrix},
\]

where \(z=q^2\) lies in a connected domain avoiding thresholds and the
weights are analytic there. Then the exact two-row Cauchy--Binet identity is

\[
\boxed{
\det G(z)=
\sum_{i<j}w_i(z)w_j(z)\Delta_{ij}^{\,2},
\qquad
\Delta_{ij}=d_i y_j-d_j y_i.}
\]

Protection over a momentum interval is therefore a **functional-rank
condition**. The fixed squared-minor vector
\((\Delta_{ij}^{\,2})\) must lie in the kernel of the linear map

\[
(A_{ij})\longmapsto
\sum_{i<j}A_{ij}w_i(z)w_j(z)
\]

as an identity of functions, not merely at one chosen \(z\).

If the active product functions \(w_iw_j\) are linearly independent, every
active minor must vanish and all coupling vectors share one projective ray.
For real vectors with weights of one sign on the interval, the same
conclusion follows pointwise from positivity.

A cancellation at one momentum is generically only a root of a nonzero
analytic function. It is not radiative or off-shell protection.

## 1. One-loop tangency with several loop packets

Separate the retained tree packet from the loop packets:

\[
u_0=v,\qquad
w_0=-\frac1a,\qquad
w_\alpha(z)=\hbar f_\alpha(z)+O(\hbar^2).
\]

The determinant through first loop order is

\[
\det G(z)
=
\hbar w_0
\sum_{\alpha=1}^{m}
f_\alpha(z)\Delta_{0\alpha}^{\,2}
+O(\hbar^2),
\]

because loop--loop packet pairs enter only at \(O(\hbar^2)\). Thus the exact
one-loop normal component is

\[
\boxed{
D_1(z)=w_0\sum_\alpha
f_\alpha(z)\det(v,g_\alpha)^2.}
\]

The RG or matching flow is tangent over the analytic domain precisely when
\(D_1(z)\equiv0\).

Three increasingly strong sufficient tests follow.

1. If every \(g_\alpha\) is absent or proportional to \(v\), every
   coefficient vanishes separately.
2. If the \(f_\alpha\) are linearly independent, interval tangency forces
   every admitted \(g_\alpha\) to be proportional to \(v\).
3. If the real \(f_\alpha\) have one sign throughout the interval, cancellation
   is impossible even without functional independence; every active squared
   minor must vanish.

The only remaining nonaligned branch requires an exact null relation among
the form factors with the signs or phases needed to cancel their squared
minors.

## 2. One momentum versus an interval

Use

\[
v=(1,1)^T,\qquad
g_1=(1,-1)^T,\qquad
g_2=(2,1)^T.
\]

The squared tree--loop minors are \(4\) and \(1\). Choose

\[
f_1(z)=1+z,
\qquad
f_2(z)=-4-3z.
\]

Then

\[
4f_1(z)+f_2(z)=z.
\]

The determinant correction vanishes at \(z=0\), but is nonzero at every
nearby nonzero \(z\). No change of basis turns this isolated cancellation
into a protected kernel.

By contrast, choosing

\[
f_2(z)=-4f_1(z)
\]

makes the one-loop normal component vanish identically despite the two
nonaligned rays. This is a real indefinite, functionally dependent
cancellation branch. It is stable over the interval only if a symmetry or
exact identity enforces that functional relation. An equality imposed at one
subtraction point is insufficient.

For analytic form factors, a nonzero determinant has isolated zeros.
Vanishing throughout an open interval is equivalent to vanishing of every
Taylor coefficient, or every derivative at one interior point. Across a
threshold one must repeat the test on each analytic domain and include the
appropriate discontinuity.

## 3. Exact all-packet criterion

At finite packet order, loop--loop terms matter. The complete criterion is

\[
\boxed{
\sum_{i<j}w_i(z)w_j(z)\Delta_{ij}^{\,2}\equiv0.}
\]

This admits three structural readings:

- **common ray:** every active \(\Delta_{ij}=0\), so protection is independent
  of the detailed form factors;
- **absence:** incidence or representation constraints remove every
  transverse packet;
- **functional null relation:** nonzero minors survive but their product
  functions obey an exact indefinite or complex relation.

The third is strictly more fragile. Changes in a mediator mass, threshold,
anomalous dimension or numerator generally alter one form factor without
altering the others in the required ratio. Unless a Ward identity ties the
complete functions together, this branch is tuning rather than a
technical-naturalness theorem.

Linear independence of all active products \(w_iw_j\) is sufficient, but not
necessary, for common-ray necessity. Same-sign positivity is a separate
sufficient condition. The theorem does not assume either when stating the
kernel criterion.

## 4. Exact polynomial audit

The verifier constructs four vectors and four polynomial weights. It checks,
coefficient by coefficient, that direct evaluation of

\[
c(z)s(z)-p(z)^2
\]

equals the sum of weighted squared minors. It then checks both contrasting
two-packet examples:

- the point-tuned normal component is exactly the polynomial \(z\);
- the interval cancellation is exactly zero only after imposing the
  dependent indefinite relation \(f_2=-4f_1\).

It also verifies that a proportional loop vector has zero minor before any
form factor is evaluated. No floating-point sampling is used.

## 5. Connection to the minimal Pati--Salam inventory

Claim 1512 found one retained tree column in the bounded central-mask
completion. That makes tree-level alignment automatic, but it does not bound
the number of loop packets. Existing scalar, fermion and gauge carriers can
generate several two-point structures even when there is only one eliminated
tree mediator.

The next physical inventory must therefore attach four items to every
admitted loop topology:

1. its endpoint vector \(g_\alpha\) in family/sector space;
2. its mediator masses and thresholds;
3. its analytic form factor \(f_\alpha(z)\);
4. the Ward, reality or incidence relation—if any—that ties it to the tree
   vector or to another complete form factor.

The bounded survivor passes the loop gate only if every transverse packet is
absent, every loop vector factors through the retained tree line, or an exact
symmetry enforces a functional null relation. The published
generation-blind Pati--Salam gauge multiplicity does not establish any of
these family-space statements.

A particularly cheap physical kill test is now available:

\[
\boxed{
\text{one admitted }g_\alpha\not\parallel v
\text{ with a form factor outside every exact Ward null relation}
\Longrightarrow
\text{no interval protection at one loop}.}
\]

Distinct particle masses and thresholds often make form factors functionally
distinguishable, but this claim does not assume that they do; the actual
carrier calculation must test it.

## 6. Spin(2,3) consequence

The desired aggregate intertwiner line must control a module of functions,
not only a finite matrix of constant couplings. A viable relational or
Spin(2,3) lift must act compatibly on tree portals, loop numerators,
propagator masses and threshold structure. Aligning coupling constants at one
scale is weaker than identifying the complete momentum-dependent morphisms.

This supplies a sharper categorical target:

\[
\boxed{
\text{the lowering functor must have functional rank one on the full
counterterm and form-factor module}.}
\]

Without such a statement, an on-shell or zero-momentum texture zero can
coexist with off-shell transverse leakage.

## Boundaries

**Physical-model boundary:** the theorem classifies finite rank-one packet
sums. It does not enumerate the physical Pati--Salam diagrams or compute
their form factors.

**Analytic-domain boundary:** thresholds and branch cuts divide momentum
space into separate analytic domains; matching conditions across them need an
additional discontinuity audit.

**Packet boundary:** a general loop tensor need not decompose into a finite
set of momentum-independent rank-one vectors. In that case the direct
condition is simply \(\det G(z)\equiv0\), or equivalently functional rank at
most one.

**Complex boundary:** with complex transpose packets, squared minors can
cancel by phase. The functional-kernel criterion remains valid, but the
same-sign positivity corollary does not.

**All-orders boundary:** one-loop functional tangency does not prove
higher-loop or nonperturbative closure.

## Verdict

The multi-packet loop extension converts a pointwise determinant zero into a
functional identity:

\[
\boxed{
\det G(z)\equiv0
\Longleftrightarrow
(\Delta_{ij}^{\,2})\in
\ker\{A_{ij}\mapsto\sum A_{ij}w_i(z)w_j(z)\}.}
\]

For independent or same-sign real form factors, this collapses to one common
projective coupling ray. Nonaligned interval cancellation is possible only
through an exact dependent indefinite or complex form-factor relation. A
zero at one momentum supplies no evidence for that stronger condition.

The minimal masked Pati--Salam tree survivor of claim 1512 therefore remains
conditional: its next decisive calculation is a loop topology and
form-factor inventory, not another tree-level rank audit.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_functional_Schur_loop_tangency.mjs
node verification/verify/verify_spin23_one_loop_Schur_tangency_toy.mjs
node verification/verify/verify_spin23_minimal_pati_salam_aggregate_intertwiner_census.mjs
~~~
