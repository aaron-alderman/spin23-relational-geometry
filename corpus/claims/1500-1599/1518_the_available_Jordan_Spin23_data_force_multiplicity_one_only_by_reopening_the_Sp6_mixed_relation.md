# The Available Jordan--Spin(2,3) Data Force Multiplicity One Only by Reopening the Sp(6) Mixed Relation

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact Hom-factorization and commutant no-go for the currently represented carriers; a cross-anchor sewing morphism remains open

**Depends on:** [the physical aggregate census](1512_the_minimal_pati_salam_tree_census_leaves_one_correlated_Schur_column_but_does_not_derive_the_family_intertwiner.md), [the complex and indefinite three-packet null cone](1513_three_Schur_packets_admit_a_nonaligned_complex_or_indefinite_null_cone_but_two_packets_do_not.md), [the population-normal Jordan carrier](../1100-1199/1109_the_population_normal_Jordan_selector_removes_the_extra_neutral_Delta_and_recovers_Spin23_but_charge_six_lives_in_an_external_symmetric_square.md), [the overlapping-wheel Sp(6) closure](../1100-1199/1126_two_overlapping_H2R_null_mask_wheels_generate_H3R_and_raise_Spin23_to_Sp6.md), and [the opposite-anchor split](../1100-1199/1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md)

**Evidence:** [Jordan/Spin(2,3) multiplicity audit](../../../evidence/data/spin23-jordan-aggregate-multiplicity-one-audit.json) and [exact commutant verifier](../../../verification/verify/verify_spin23_jordan_aggregate_multiplicity_one_audit.mjs)

## Result

The existing Jordan and Spin(2,3) representation data do not force the
physical aggregate intertwiner to have multiplicity one.

There is one finite-matrix route in the current corpus that reduces the
family commutant to a single scalar: place both the safe Dirac relation
\(P-I\) and the required Majorana relation \(P-N\) on one untyped family
carrier. But their mixed Jordan product is

\[
(E_{PI}+E_{IP})(E_{PN}+E_{NP})
+(E_{PN}+E_{NP})(E_{PI}+E_{IP})
=E_{IN}+E_{NI}.
\]

That is exactly the mixed relation which enlarges the two local
\(H_2(\mathbb R)\) wheels to \(H_3(\mathbb R)\), with conformal group
\(Sp(6,\mathbb R)\), rather than retaining two protected local
Spin(2,3) sectors.

Keeping the opposite-anchor types prevents this composition, but then the
commutant contains one independent scalar on each wheel:

\[
\boxed{
\operatorname{Comm}(A_D\oplus A_M)
\cong\mathbb C\oplus\mathbb C.}
\]

Thus the present data give an exact trilemma:

\[
\boxed{
\begin{array}{ll}
\text{generation-blind physical carrier:}&\dim_{\mathbb C}\operatorname{Hom}=9,\\
\text{protected typed local wheels:}&\dim_{\mathbb C}\operatorname{Comm}=2,\\
\text{untyped joined wheels:}&\dim_{\mathbb C}\operatorname{Comm}=1
\text{ but closure is }H_3/Sp(6).
\end{array}}
\]

The missing object is not another analogy. It is a represented cross-anchor
sewing morphism which identifies the two typed scalar intertwiners without
making the mixed \(I-N\) arrow a physical primitive relation.

## 1. Generation-blind Hom factorization

Let \(A\) denote the sourced Pati--Salam action, optionally enlarged by any
Jordan/Spin(2,3) action that remains external to family multiplicity. If

\[
U_F=U\otimes F,
\qquad
U'_F=U'\otimes F,
\qquad
F\cong\mathbb C^3,
\]

and \(A\) acts trivially on \(F\), then

\[
\boxed{
\operatorname{Hom}_A(U\otimes F,U'\otimes F)
\cong
\operatorname{Hom}_A(U,U')\otimes\operatorname{End}(F).}
\]

Claim 1512 found one gauge Clebsch channel for each fixed irreducible
bidoublet carrier. Therefore

\[
\dim_{\mathbb C}\operatorname{Hom}_A(U_F,U'_F)
=1\times3^2=9.
\]

This remains true after adding an external irreducible response carrier: its
commutant is scalar on the response factor but still contains
\(I\otimes M_3(\mathbb C)\) on family multiplicity. Spin(2,3) covariance of
an auxiliary response cannot select a family intertwiner unless its action
is explicitly sewn to the family space.

The bounded masked tree sector of claim 1512 is nevertheless safe because it
contains only one eliminated mediator packet. Its rank-one result is an
absence theorem; it is not evidence that this nine-dimensional Hom space has
collapsed.

## 2. Exact family-centralizer ladder

Use the ordered family basis \((P,I,N)\). Direct solution of

\[
[K,g]=0
\]

for a general complex \(3\times3\) matrix \(K\) gives:

| represented family data | complex commutant dimension |
|---|---:|
| none; generation blind | 9 |
| selected projector \(P\) | 5 |
| three idempotents \(P,I,N\) | 3 |
| \(P,I,N\) and one local edge \(X_{PI}\) | 2 |
| \(P,I,N,X_{PI},X_{PN}\) on one untyped carrier | 1 |

The steps have direct meanings.

The projector alone leaves

\[
\mathbb C\oplus M_2(\mathbb C),
\]

so selecting the line does not select a basis or intertwiner in its
rank-two complement. Resolving \(I\) and \(N\) leaves three independent
diagonal scalars. Joining \(P\) to \(I\) equates two of them, but the
spectator \(N\) retains the second scalar.

Only the second joining edge equates all three. At precisely that step the
mixed Jordan product generates \(X_{IN}\), recovering the closure theorem of
claim 1126.

Multiplicity one and preservation of the two-wheel mask therefore do not
coincide in the current untyped matrix representation.

## 3. Opposite-anchor typing preserves two scalars

Claim 1127 prevents the mixed product by retaining different right anchors
for the two local relations. The minimal faithful typed representation is a
direct sum

\[
\mathcal H_D\oplus\mathcal H_M,
\qquad
\dim\mathcal H_D=\dim\mathcal H_M=2,
\]

with a full irreducible two-state relation algebra on each summand and with
the sector projectors retained. Its exact commutant is

\[
\operatorname{Comm}\bigl(M_2(\mathbb C)_D\oplus
M_2(\mathbb C)_M\bigr)
=\mathbb C I_D\oplus\mathbb C I_M.
\]

Typing has done its intended job: no operator is allowed to compose the two
relations merely because their coarse left label is \(P\). But the same
central type idempotents prevent symmetry from equating the two scalar
normalizations.

An assertion that the two coefficients are equal is therefore new sewing
data. To derive it, a morphism must relate the sectors at a level where it
does not restore the forbidden mixed family arrow.

## 4. The raw 1+2 family split cannot carry the H2 exchange

The population-normal two-face Jordan carrier uses an exchange real
structure between equal-dimensional endpoints. The physical family selector
has

\[
\operatorname{rank}P=1,
\qquad
\operatorname{rank}Q=2.
\]

No invertible raw-family operator can satisfy

\[
SPS^{-1}=Q,
\]

because similarity preserves rank and trace. This is the exact form of the
typing boundary already identified in claim 1109.

Consequently one cannot evade the commutant result by declaring that the
full local H2 exchange acts directly on \(P\mathbb C^3\) and
\(Q\mathbb C^3\). It must act on equal-dimensional scalar copies, a
Morita-stabilized module, or a response carrier. None of those choices by
itself removes the family \(M_3(\mathbb C)\) freedom.

## 5. What the claim-1513 null cone can and cannot add

For three packets, claim 1513 found the real-indefinite cancellation
condition

\[
\Delta_0^2-\Delta_1^2-\Delta_2^2=0.
\]

There is a precise conditional Spin route. If an explicit physical
intertwiner identifies the three minors with the standard vector
representation of \(SO(1,2)\), then the quadratic form is invariant. The
common fixed subspace of that vector representation is zero:

\[
(\mathbb R^{1,2})^{SO_0(1,2)}=\{0\}.
\]

Therefore an unbroken symmetry acting on a fixed coupling vector would force

\[
\Delta=0,
\]

which is the common Schur ray.

But a nonzero null vector such as \((5,4,3)\) is not invariant. It belongs to
a symmetry-preserved orbit and requires a null spurion or vacuum that breaks
the group to its stabilizer. Preserving the quadratic equation is not the
same as forcing a coupling onto its zero set.

The existing corpus has neither:

- an equivariant physical map from packet minors to the Lorentz three-vector;
- nor an invariant constraint or potential whose admissible vacuum is
  forced to be null.

Thus the null-cone observation supplies a crisp representation test, not an
existing multiplicity-one mechanism.

## 6. Exact reopening datum

The primary reopening datum is a **cross-anchor sewing morphism** \(S\) with
all of the following verified on the complete physical real-even module:

1. \(S\) identifies the scalar generator of the Dirac local-Hom with the
   scalar generator of the Majorana local-Hom;
2. the aggregate typed Hom space has complex dimension one;
3. every physically admitted mediator column factors through its generator;
4. the composite \(X_{PI}\circ X_{PN}\) remains junk, noncomposable, or
   otherwise absent as a physical primitive \(I-N\) arrow;
5. the construction respects \(J\), grading, Pati--Salam covariance and the
   support mask.

This is stronger than stating that both local Hom spaces are individually
one-dimensional. It must relate their bases without erasing their types.

The alternative null-orbit reopening datum is equally explicit:

1. exhibit the physical three-packet minor representation;
2. give the equivariant map to \(\mathbb R^{1,2}\);
3. derive a sourced constraint or potential forcing \(q(\Delta)=0\);
4. declare whether the allowed vacuum is \(\Delta=0\), which gives the
   common ray, or \(\Delta\ne0\), which breaks symmetry and uses the
   cancellation branch.

## Boundaries

**Minimal-tree boundary:** claim 1512 has one packet, so no cross-mediator
minor exists. This claim concerns derivation and nonminimal stability, not a
new failure of that bounded census.

**Category boundary:** the two-scalar typed result is exact for the minimal
direct-sum representation of two noncomposable irreducible relation sectors.
A richer category can reduce it only by supplying the cross-anchor sewing
whose absence is the result.

**Group boundary:** Spin(2,3) organizing an external Jordan response is not
automatically a representation on family or mediator multiplicity.

**Null-orbit boundary:** an invariant cone does not force a fixed coupling to
be null. A vacuum-selection or constraint equation is additional dynamics.

**Loop boundary:** even a dimension-one tree Hom must be checked against the
loop and functional tangency results of claims 1514 and 1519.

## Verdict

The desired multiplicity-one theorem is not present in the available
Jordan/Spin(2,3) data:

\[
\boxed{
9\ \xrightarrow{\ P\ }\ 5
\ \xrightarrow{\ P,I,N\ }\ 3
\ \xrightarrow{\ X_{PI}\ }\ 2
\ \xrightarrow{\ X_{PN}\ }\ 1,
}
\]

but the last arrow simultaneously creates the mixed relation and the
\(H_3(\mathbb R)/Sp(6,\mathbb R)\) envelope. Keeping the physically motivated
opposite-anchor split stops at two.

The programme can cross this gate only by constructing a typed cross-anchor
sewing which reduces two scalars to one while keeping the mixed arrow out of
the physical calculus, or by deriving the fully specified Lorentz-minor
constraint. Until then, the common ray is automatic only in the one-packet
minimal census and imposed rather than derived in multi-packet relational
witnesses.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_jordan_aggregate_multiplicity_one_audit.mjs
node verification/verify/verify_spin23_minimal_pati_salam_aggregate_intertwiner_census.mjs
node verification/verify/verify_spin23_complex_indefinite_Schur_locus.mjs
node verification/prove/prove_overlapping_H2R_null_mask_wheels_generate_H3R.mjs
~~~
