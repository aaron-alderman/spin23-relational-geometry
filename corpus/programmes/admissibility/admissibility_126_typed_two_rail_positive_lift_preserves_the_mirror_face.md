# A Typed Two-Rail Positive Lift Preserves the Mirror Face

**Date:** 26 October 2026
**Status:** exact free positive lift on the captured Claimipedia relation set; directed typed adjacency, mirror reversal and the scalar-collapse loss are verified; path composition and semantic adjoint remain open
**Target:** OT-026
**Evidence:** [typed two-rail lift](../../../evidence/data/claimipedia-typed-two-rail-positive-lift-v1.json)
**Verifier:** [executable audit](../../../verification/admissibility/verify_claimipedia_typed_two_rail_positive_lift.mjs)

## The repair suggested by AZ-125

AZ-125 found a positive kernel (BB^T), but only after arrow direction and
relation type had disappeared. That loss was not forced by positivity. It was
caused by placing source and target in the same vertex space and summing the
four relation channels too early.

Keep them separate. For the 38 Claimipedia nodes and four authored relation
types, define the free carrier

\[
\mathcal H_{m rel}
=\mathbb R^V\otimes
\mathbb R^{\{S,T\}}\otimes
\mathbb R^{\{C,D,Q,Sup\}}.
\]

The middle factor is the pair of rails: authored source and authored target.
The last factor keeps Challenges, DependsOn, Qualifies and Supports orthogonal
until a semantic relation between them has actually been supplied. Its
dimension is

\[
38\times2\times4=304.
\]

For a record $e=(u\to v,t)$, define

\[
d_e=|v,T,t\rangle-|u,S,t\rangle
\]

and the Gram kernel

\[
K=\sum_e d_e d_e^T\succeq0.
\]

This is again a free counting-measure construction. It does not assign a
physical strength or declare the relation types equivalent. It asks only that
distinct authored roles remain distinct coordinates.

## Positivity no longer erases the relation

The source-to-target block of (K) satisfies

\[
K_{(u,S,t),(v,T,t)}=-N_t(u\to v),
\]

where (N_t) is the exact record multiplicity. Consequently the original
directed typed adjacency is reconstructible from the positive kernel. No
reverse edge has to be present, and no sign convention has to be inferred
after the fact.

On the captured graph:

- 43 records become 43 edge vectors;
- the two exact duplicate records leave 41 distinct typed vectors;
- those 41 vectors are linearly independent; and
- (K) therefore has rank 41 on the 304-dimensional free carrier.

The rank equality is useful. Before quotienting, every distinct authored
relationship occupies an independent positive direction. The construction is
not discovering hidden physics; it is proving that positivity and faithful
relation storage are compatible.

## The mirror face is a rail swap

Let (J) exchange source and target rails while leaving node and relation type
fixed. Then $J^2=I$, and

\[
Jd_{u\to v,t}=-d_{v\to u,t}.
\]

The sign disappears in the Gram kernel, giving the exact equivariance

\[
\boxed{J K(G)J^T=K(G^{\rm rev}).}
\]

This is the first global mirror operation on the live Claimipedia relation
set that does not require the reverse records to exist in the source. It also
explains why AZ-112's no-go remains true: (J) acts on an enlarged free
source/target carrier, not as an internal permutation or anti-automorphism of
the original 35-dimensional path algebra.

The distinction is constructive rather than evasive. The corpus now knows
exactly where the mirror lives and exactly why it was absent from the smaller
carrier.

## The ordinary Laplacian is a quotient scar

Let (C) identify the two rails and sum the four type channels:

\[
C|v,S,t\rangle=C|v,T,t\rangle=|v\rangle.
\]

Then

\[
CKC^T=\sum_{u\to v}(e_v-e_u)(e_v-e_u)^T=L.
\]

Thus AZ-125's support Laplacian is not a rival construction. It is the exact
quotient of the typed two-rail kernel obtained by forgetting both authored
role and relation channel. Its rank is 33 rather than 41. The eight lost
directions are a measured quotient scar, not a metaphor.

This makes the compiler more precise:

\[
\text{directed typed records}
\to\text{two-rail positive carrier}
\to\text{rail/type quotient}
\to\text{support Laplacian}
\to\text{Schur face}.
\]

Direction and type disappear at the second arrow, not when positivity is
introduced.

## What the lift does not yet supply

The lift is intentionally free. Orthogonal unit relation-type channels are a
faithful bookkeeping choice, not a derived semantic geometry. In particular:

- it does not say whether Supports is the adjoint, opposite or independent
  companion of Challenges;
- it does not supply a reverse type for DependsOn or Qualifies;
- it does not concatenate composable records into paths;
- it does not select Spin and Temple, the river triangle or any other nodes as
  physical detector ports;
- it does not attach units, causal transfer functions, amplitudes or
  probabilities to an edge; and
- it makes no held-out prediction.

The rail swap (J) is an involution, not the quarter-turn complex structure or
the antisymmetric locally invariant carrier of AZ-123. A symplectic form can
be written on any even-dimensional free rail space, but the source has not
selected one or shown that its transformations preserve it. Calling this
(Spin(2,3)), Wick rotation or physical duality would therefore be premature.

## Relation to established mathematics

The finite Gram lift is elementary. Its next step touches established path and
groupoid operator-algebra territory: graph inverse semigroups and path
groupoids formalize how directed paths and partial inverses generate
operator algebras ([Paterson, arXiv:math/0304355](https://arxiv.org/abs/math/0304355)),
while higher-rank graph $C^*$-algebras make multi-channel path composition
explicit ([Kumjian and Pask, arXiv:math/0007029](https://arxiv.org/abs/math/0007029)).
Those theories are signposts, not evidence that Claimipedia already satisfies
their relations.

## Decision and next gate

This packet repairs the strongest weakness of the scalar adjacency reading:
a positive kernel can retain the entire directed typed relation set when the
thing and its mirror role are not prematurely identified. It is the cleanest
mathematical realization so far of the user's “something and its mirror face”
intuition at the graph level.

OT-026 remains open at a narrower boundary. The next construction must compose
this two-rail incidence carrier with the existing path algebra while keeping
the rails distinct. It must then obtain a relation-type adjoint from authored
semantics or independent observations, not from the desired Jordan quotient.
Only after product, adjoint and positive order coexist on one carrier should a
source-selected boundary be Schur-reduced and tested against a held-out record.
