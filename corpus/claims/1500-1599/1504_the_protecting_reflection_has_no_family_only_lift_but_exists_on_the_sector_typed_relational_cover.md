# The Protecting Reflection Has No Family-Only Lift, but Exists on the Sector-Typed Relational Cover

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact signed-graph obstruction and minimal relational-lift theorem; full KO-6 compatibility remains open

**Depends on:** [the canonical sector reflection](1503_the_sector_reflection_forbids_odd_leakage_sources_but_exact_protection_requires_its_unbroken_positive_mass_phase.md), [the opposite-anchor relational split](../1100-1199/1127_opposite_anchor_typing_splits_the_Sp6_envelope_into_two_local_Spin23_relational_wheels.md), and [the marked-lepton joining theorem](../1400-1499/1489_the_marked_lepton_generator_derives_the_seesaw_flag_but_charge_three_breaking_needs_a_sector_dependent_mask.md)

**Evidence:** [relational-lift ledger](../../../evidence/data/spin23-sector-reflection-relational-lift.json) and [exhaustive signed-graph verifier](../../../verification/verify/verify_spin23_sector_reflection_requires_relational_lift.mjs)

## Result

The protecting reflection of claim 1503 cannot be induced by assigning one
\(\mathbb Z_2\) sign to each visible family endpoint. It can be induced after
lifting those endpoints to the sector/opposite-anchor relation cover.

The obstruction is elementary and exact. The desired Majorana sewing and
the forbidden Dirac leakage have the same visible family endpoints
\(P\!-!N\), but they require opposite parities. Any endpoint parity gives
both edges the product \(s_Ps_N\), so it cannot make one even and the other
odd.

Equivalently, the two parallel edges form an unbalanced signed two-cycle.
The sector-typed cover separates them and removes that cycle.

## 1. Coarse family signs are impossible

Let

\[
s_P,s_I,s_N\in\{+1,-1\}
\]

be signs on the visible family endpoints. Require

\[
\begin{aligned}
s_Ps_I&=+1 &&\text{safe Dirac support},\\
s_Ps_N&=+1 &&\text{desired Majorana sewing},\\
s_Ps_N&=-1 &&\text{dangerous Dirac relation}.
\end{aligned}
\]

The last two equations contradict each other. The verifier exhausts all
\(2^3=8\) sign assignments and finds no solution.

This proves

\[
\boxed{
\text{no family-only endpoint reflection can protect the mask}.}
\]

The result is stronger than the statement that the known \(U(1)\) charge is
insufficient. No ordinary \(\mathbb Z_2\) family charge can do the job either.

## 2. Signed-cycle formulation

An edge-sign pattern \(\epsilon_{uv}\) comes from vertex signs when

\[
\epsilon_{uv}=s_us_v.
\]

The product of such signs around every cycle must be positive because each
vertex sign occurs twice. The coarse graph has a length-two cycle made from
the parallel Majorana and Dirac \(P\!-!N\) edges, with product

\[
(+1)(-1)=-1.
\]

It is therefore an unbalanced signed graph and cannot be switched to an
all-even pattern by vertex signs.

This is the exact graph-theoretic form of the equal-charge collision.

## 3. The relational cover is sufficient

Retain the sector/opposite-anchor labels

\[
D_P,D_I,D_N,M_P,M_N.
\]

The requirements become

\[
\begin{aligned}
s_{D_P}s_{D_I}&=+1,\\
s_{D_P}s_{D_N}&=-1,\\
s_{M_P}s_{M_N}&=+1.
\end{aligned}
\]

One witness is

\[
(s_{D_P},s_{D_I},s_{D_N},s_{M_P},s_{M_N})
=(+1,+1,-1,+1,+1).
\]

Among all \(2^5=32\) typed assignments, exactly four solve the constraints.
If both visible family lifts are glued back together,

\[
D_P=M_P,
\qquad
D_N=M_N,
\]

none of the four survives. Coarse-graining recreates the obstruction.

## 4. Minimality

At least one endpoint of the parallel \(P\!-!N\) relations must remember a
sector bit. Duplicating a carrier by Dirac/Majorana type is sufficient;
duplicating every family state is not logically necessary for this small
constraint set.

The already-derived opposite-anchor cover supplies exactly this type of
memory. Thus the parity calculation independently selects the same middle
as the Jordan-closure and first-order calculations:

\[
\boxed{
\text{visible family label}
+\text{ relational sector/opposite-anchor lift}.}
\]

## 5. Fan downward: why ordinary discrete family symmetries fail

A conventional family \(\mathbb Z_2\) acting only on \(P,I,N\) cannot allow
the Majorana \(P\!-!N\) operator while forbidding the Dirac \(P\!-!N\)
operator. Adding more Abelian endpoint charges does not help if both operators
use the same endpoint characters and all other factors transform equally;
their selection characters remain identical.

The low-energy texture therefore points back to a relationship-dependent
selection rule, not merely another family charge assignment.

## 6. Fan upward: the typed twin wheels

Claim 1127 found that retaining opposite anchors splits the coarse
\(H_3/Sp(6)\) envelope into two orthogonal \(H_2/Spin(2,3)\) wheels. The
present signed-graph theorem finds the same distinction from action
naturalness: only the typed cover admits the protecting reflection.

Three calculations now converge on one datum:

1. first-order incidence needs the sector-dependent anchor;
2. Jordan closure needs it to prevent mixed wheel composition;
3. radiative naturalness needs it to lift the protecting reflection.

## 7. Boundaries

**Real-structure boundary:** the signs on charge-conjugate states and the
commutation or anticommutation of the new reflection with \(J\) are not yet
fixed.

**Chirality boundary:** the relation reflection is not automatically the
ordinary spectral-triple chirality grading.

**Vertex-completeness boundary:** the verifier includes the three decisive
relations, not every quark, charged-lepton and scalar vertex of the physical
Pati--Salam model.

**Anomaly boundary:** existence of a finite signed-graph lift is not a
discrete anomaly calculation.

## Verdict

The reflection cannot be collapsed to a family symmetry:

\[
\boxed{
\text{coarse family graph: no lift}
\qquad
\text{sector-typed relational cover: four lifts}.}
\]

The next gate is to impose the KO-6 reality pairing and the complete physical
Yukawa graph on these four candidates and count which, if any, remain.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_sector_reflection_requires_relational_lift.mjs
node verification/prove/prove_opposite_anchor_typing_splits_H3_envelope_into_two_H2_wheels.mjs
~~~
