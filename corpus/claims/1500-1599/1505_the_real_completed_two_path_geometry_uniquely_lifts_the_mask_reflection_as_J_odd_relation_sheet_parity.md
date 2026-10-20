# The Real-Completed Two-Path Geometry Uniquely Lifts the Mask Reflection as (J)-Odd Relation-Sheet Parity

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact KO-6 label-level lift and uniqueness theorem; complete physical Pati--Salam embedding remains open

**Depends on:** [the relational parity-lift obstruction](1504_the_protecting_reflection_has_no_family_only_lift_but_exists_on_the_sector_typed_relational_cover.md), [the orientable KO-6 null-mask completion](../1100-1199/1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md), and [the real-completed degree-two junk theorem](../1400-1499/1492_degree_two_junk_kills_the_induced_cross_edges_in_the_real_completed_null_mask_path.md)

**Evidence:** [KO-6 sheet-reflection ledger](../../../evidence/data/spin23-KO6-relation-sheet-reflection.json) and [exhaustive involution verifier](../../../verification/verify/verify_spin23_KO6_relation_sheet_reflection.mjs)

## Result

The real-completed null-mask geometry already contains the protecting
reflection required by claims 1503--1504. It is the parity of the two
\(J\)-paired relation paths.

Let

\[
\mathcal P_+=\{PN,IN,IP,SP\},
\qquad
\mathcal P_-=\{NP,NI,PI,PS\}.
\]

Define

\[
\Gamma_{\rm rel}|_{\mathcal P_+}=+I,
\qquad
\Gamma_{\rm rel}|_{\mathcal P_-}=-I.
\]

Then

\[
\boxed{
\Gamma_{\rm rel}^2=I,
\quad
[\Gamma_{\rm rel},D_{\rm allowed}]=0,
\quad
[\Gamma_{\rm rel},\gamma]=0,
\quad
\{\Gamma_{\rm rel},J\}=0.
}
\]

The retained safe Dirac, desired Majorana and spectator connector edges are
even. Both orientable choices for the forbidden Dirac null anchor cross the
two sheets and are odd.

Among all diagonal involutions on the eight states, this nontrivial
reflection is unique up to overall sign.

## 1. Reality supplies the two sheets

The orientable four-character completion and its real partner form the two
paths

\[
PN-IN-IP-SP
\]

and

\[
NP-NI-PI-PS.
\]

The real structure pairs them vertexwise:

\[
PN\leftrightarrow NP,
\quad
IN\leftrightarrow NI,
\quad
IP\leftrightarrow PI,
\quad
SP\leftrightarrow PS.
\]

Every retained finite-Dirac edge stays inside one path. The absent dangerous
Dirac edge instead connects the selected state \(PN\) to either \(NP\) or
\(NI\), according to the two orientable null-anchor choices. It crosses the
sheet decomposition in both cases.

## 2. The reflection algebra

Because \(D_{\rm allowed}\) is supported on within-sheet edges,

\[
[\Gamma_{\rm rel},D_{\rm allowed}]=0.
\]

For a cross-sheet operator \(B\),

\[
\Gamma_{\rm rel}B\Gamma_{\rm rel}=-B.
\]

Thus the even/odd split of claim 1503 is realized directly on the real
finite-label carrier:

- retained Dirac and Majorana transports are even;
- the missing cross-sheet Dirac transport is odd.

Since \(J\) exchanges the sheets,

\[
J\Gamma_{\rm rel}=-\Gamma_{\rm rel}J.
\]

This is compatible with, but distinct from, the ordinary KO-6 chirality.

## 3. It is not the chirality grading

The KO-6 chirality alternates along each path because every retained
Dirac-operator edge is chirality odd. In the state order above it is

\[
\gamma=(+,-,+,-;\ -,+,-,+).
\]

By contrast, relation-sheet parity is

\[
\Gamma_{\rm rel}=(+,+,+,+;\ -,-,-,-).
\]

Both are diagonal, so

\[
[\Gamma_{\rm rel},\gamma]=0.
\]

Both reverse under \(J\), so each anticommutes with the real structure. Their
roles are different:

- \(\gamma\) makes the finite Dirac operator odd;
- \(\Gamma_{\rm rel}\) makes the allowed support even and leakage odd.

Conflating them would reverse the required selection rule.

## 4. Exhaustive uniqueness audit

There are \(2^8=256\) diagonal sign involutions on the eight states.

Requiring every one of the six path edges to be even makes the sign constant
on each connected component, leaving four assignments. Requiring
anticommutation with \(J\) forces the two component signs to be opposite,
leaving two assignments. They differ only by the overall sign of
\(\Gamma_{\rm rel}\).

Both make the two possible dangerous Dirac anchors odd. Therefore

\[
\boxed{
\Gamma_{\rm rel}\text{ is the unique nontrivial }J\text{-odd diagonal
symmetry preserving all retained edges, up to sign}.}
\]

## 5. Fan downward: exact support protection

If the finite action and matter vacuum preserve \(\Gamma_{\rm rel}\), no
operator with one endpoint on each relation sheet can appear linearly. This
forbids the dangerous Dirac null edge while retaining:

- the safe Dirac \(PN-IN\) edge;
- the desired Majorana \(PI-NI\) edge;
- the connector edges needed for finite-metric connectedness;
- all \(J\)-partners.

The low-energy texture protection is therefore compatible with the complete
eight-state toy support, not merely the five-vertex signed-graph proxy.

## 6. Fan upward: twin-wheel and junk compatibility

The two-sheet parity is precisely the extra memory lost when relational
anchors are coarse-grained. It is also compatible with the degree-two junk
result: the canonical represented calculus removes the induced distance-two
cross-relations rather than turning them into physical parity-odd fields.

The same real-completed carrier now supports four mutually consistent facts:

1. the KO-6 chirality pattern;
2. the sector-dependent null mask;
3. the degree-two junk quotient;
4. the unique protecting relation-sheet reflection.

## 7. Spin(2,3) joining interpretation

The two typed local \(Spin(2,3)\) wheels are not only orthogonal Jordan
blocks. Their real completion has a canonical sheet parity. The top-down
twin-wheel geometry and bottom-up naturalness condition therefore meet on
the same involution:

\[
\boxed{
\text{typed twin wheels}
\longrightarrow
\Gamma_{\rm rel}
\longrightarrow
\text{even Majorana sewing, odd Dirac leakage}.}
\]

## Boundaries

**Physical-module boundary:** the eight states are the exact label-level
KO-6 completion, not the full colour, weak, spin and generation-multiplicity
Pati--Salam Hilbert space.

**Yukawa boundary:** every physical quark, charged-lepton and neutrino vertex
must still be tested after lifting \(\Gamma_{\rm rel}\) through those
multiplicities.

**Anomaly boundary:** a \(J\)-odd finite involution is not by itself proof of
an anomaly-free discrete gauge symmetry.

**Dynamics boundary:** the label theorem does not fix the positive sign of
the odd-sector mass term.

## Verdict

The KO-6 label-level lift succeeds and is essentially forced:

\[
\boxed{
\Gamma_{\rm rel}=+1\text{ on one real path and }-1\text{ on its }J\text{-pair},
}
\]

unique up to sign. The next gate is no longer abstract reality compatibility;
it is the explicit tensor lift over the physical Pati--Salam multiplets and
their complete Yukawa graph.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_KO6_relation_sheet_reflection.mjs
node verification/verify/verify_spin23_sector_reflection_requires_relational_lift.mjs
node verification/verify/verify_spin23_null_mask_path_degree_two_junk.mjs
~~~
