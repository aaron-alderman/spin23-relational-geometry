# Claimipedia Has a Support-Native Order, Not Yet a Semantic One

**Date:** 26 October 2026
**Status:** exact live-source collision; canonical incidence positivity and the Spin--Temple Schur face are closed; typed dagger, semantic weights, source-selected ports and held-out response remain open
**Target:** OT-026
**Evidence:** [support-native order boundary](../../../evidence/data/claimipedia-support-native-order-boundary-v1.json)
**Verifier:** [executable audit](../../../verification/admissibility/verify_claimipedia_support_native_order_boundary.mjs)

## Question

AZ-124 supplied the finite relation--face compiler. The next gate was not to
invent another algebra, but to ask whether Claimipedia itself supplies the
dagger, positive kernel and boundary needed to run that compiler before the
desired Jordan answer is inspected.

On 26 October 2026 the active Sourcery Temple operator read returned the same
captured Claimipedia source identity already pinned in the corpus:

```text
application: app.claimipedia
context: claimipedia.captured-witness.operator.v1
source hash: 82d9c5a47f4957ddbd302927baed0acb05522773762966a4c9ffc34ed86f94c3
assurance: exact captured operator corpus; not live service or public projection
```

The source contains 43 immutable relationship records on 38 named nodes, with
two Challenges, seven DependsOn, twenty-seven Qualifies and seven Supports
records. This packet uses those records unchanged.

## The strongest canonical construction

Every finite directed record has a source and target. Give the finite vertex
and edge sets their counting inner products and form the oriented incidence
map

\[
B:\mathbb R^E\longrightarrow\mathbb R^V,
\qquad
B e_{u\to v}=e_v-e_u.
\]

Then

\[
L=BB^T=\sum_{u\to v}(e_v-e_u)(e_v-e_u)^T\succeq0.
\]

This is an exact positive kernel derived without fitting a matrix. Its adjoint
$B^T$ is also canonical **after** choosing the counting inner products. Thus
the live graph does have a support-native positive order.

But this is not the missing dagger on the typed path algebra. Reversing every
arrow replaces an incidence column by its negative and leaves $L$ unchanged.
Permuting every Supports, Challenges, Qualifies and DependsOn label also leaves
$L$ unchanged. The construction remembers endpoints and multiplicity while
erasing authored direction and relationship meaning:

\[
\boxed{\text{source-native support positivity}
\ne\text{source-native semantic order}.}
\]

This is the exact answer to AZ-124's first gate. Positivity was not absent; it
was underdetermined at the level that matters for interpretation.

## Spin--Temple closes algebraically but not semantically

Select Spin and Temple as two visible ports and Schur-eliminate the rest of
their connected component. At the level of immutable relationship records the
effective kernel is

\[
L_{\mathrm{eff}}^{\mathrm{record}}
=2\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
\]

It is an exact rank-one boundary ray of $H_2(\mathbb R)^+$. The factor two
arises because Claimipedia authors two reciprocal records:

\[
\text{Spin}\xrightarrow{\rm Supports}\text{Temple},
\qquad
\text{Temple}\xrightarrow{\rm Qualifies}\text{Spin}.
\]

If these are treated instead as the two faces of one undirected relation, the
deduplicated kernel is

\[
L_{\mathrm{eff}}^{\mathrm{relation}}
=\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
\]

So even the scale of the exact face depends on an unresolved ontology:
**records or relations?** Neither the adjacency data nor the counting metric
decides whether reciprocal, differently typed statements are two conductance
channels, one mirrored channel or incomparable semantic operations.

There is a second imported choice: the corpus research question selected Spin
and Temple as ports. The relationship records do not declare them to be a
detector boundary. A Schur complement conditional on those ports is exact but
does not make the port selection source-native.

## Cycle census and the better experimental seed

The multigraph has five undirected connected components and cycle rank

\[
43-38+5=10.
\]

After collapsing duplicate records and reciprocal arrows to simple undirected
relations, forty edges remain and the cycle rank is seven. The difference is
not yet physics: three apparent cycles arise only from record multiplicity or
opposite authored arrows. None of the ten slots carries a source-native unitary
gain, phase connection or dynamical return map.

One cycle is nevertheless qualitatively better than the Spin--Temple pair.
Claimipedia contains the directed triangle

\[
\text{river flow}
\to\text{instrument calibration}
\to\text{river nitrate}
\to\text{river flow},
\]

with all three edges typed DependsOn. Its active claims concern comparable
2024/2025 flow, declared instrument tolerance and a claimed nitrate reduction.
This is an epistemic dependency loop, not yet physical holonomy. But it is the
smallest source-native location where three fitted transfer maps could be
composed and tested for closure.

The current evidence items are explicitly fixtures and support only the
nitrate claim; they contain no time series, calibration map, covariance or
held-out flow record. Consequently no numerical loop residual can honestly be
computed from the captured corpus.

## What a real river-cycle test would be

Let the three calibrated local maps be

\[
T_{FC}:F\to C,
\qquad
T_{CN}:C\to N,
\qquad
T_{NF}:N\to F.
\]

The return operator is

\[
H_F=T_{NF}T_{CN}T_{FC}.
\]

The null is not automatically $H_F=I$: seasonal dynamics, sampling delay and
model mismatch can generate a legitimate return. The preregistered test must
therefore specify the state spaces, units, time alignment, uncertainty
transport and expected null return before viewing the held-out year or site.
An oriented residual $H_F-H_F^{-1}$, or its scalar analogue after a declared
reference, would retain information that an even norm or determinant loses.

This would be useful whichever way it lands:

- closure supports a consistent three-map dependency model;
- nonclosure localized to calibration indicates instrument drift or an omitted
  nuisance rather than new physics;
- rate-dependent nonclosure indicates lag or hysteresis;
- site-dependent nonclosure indicates an omitted spatial carrier; and
- a reproducible residual surviving calibration, lag, hydrology and detector
  controls would justify a new mechanism search.

## Decision

The graph-to-positive-kernel arrow is now closed on the actual Claimipedia
capture. The result does not close OT-026, because the kernel is invariant
under precisely the authored distinctions the translation is supposed to
explain. The transpose $B^T$ is an adjoint of incidence spaces, not a lifted
anti-involution of the relationship path algebra. The Spin--Temple face is
exact, but its scale and boundary interpretation are convention-dependent.

The next admissible work is therefore concrete: derive or author a typed
involution and positive weight rule independently of the desired quotient,
declare why a pair of nodes are physical ports, and reserve a response or
orientation-sensitive cycle statistic. The river triangle is the closest
honest experimental seed in the current source, but it requires real
flow--calibration--nitrate data rather than the present fixtures.
