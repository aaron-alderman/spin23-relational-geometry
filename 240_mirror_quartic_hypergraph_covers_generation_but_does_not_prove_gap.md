# The Mirror Quartic Hypergraph Covers a Generation but Does Not Prove a Gap

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B08, B11 and B13  
**Claim status:** exhaustive representation-level dimension-six census and charged-sector cover; existence of a symmetric massive phase remains unproved

## 1. From the bilinear obstruction to the first interaction layer

The mirror bilinear census leaves fifteen charged Weyl components massless under the unbroken Standard-Model gauge group. The next local Lorentz-scalar candidates contain four Weyl fields and have engineering dimension six.

This note asks only:

> Which four-field representation multisets can contain a gauge singlet?

That is a necessary support test for symmetric mass generation. It is not a strong-coupling phase calculation.

## 2. Census rule

For fields drawn from

\[
\{Q,u^c,d^c,L,e^c,\nu^c\},
\]

a four-field multiset survives the representation census when:

- its color triality is zero and its \(SU(3)\) tensor product can contain a singlet;
- it contains an even number of weak doublets;
- its total hypercharge is zero.

For products of at most four factors from \(\mathbf1,\mathbf3,\bar{\mathbf3}\) and \(\mathbf1,\mathbf2\), these tests give the following eight representation-level classes:

\[
\begin{aligned}
&QQQL, &&QQu^cd^c, &&Qu^cLe^c, &&Qd^cL\nu^c,\\
&u^cu^cd^ce^c, &&u^cd^cd^c\nu^c,
&&LLe^c\nu^c, &&(\nu^c)^4.
\end{aligned}
\]

Independent Lorentz/gauge contractions and possible one-generation Grassmann identities must still be resolved within each class. In particular, the list counts allowed representation support, not an independent-operator basis.

## 3. A two-hyperedge charged cover

Two standard nonzero contraction classes suffice to touch every charged representation:

\[
\boxed{QQQL}
\qquad\text{and}\qquad
\boxed{u^cu^cd^ce^c}.
\]

The first contains \(Q,L\); the second contains \(u^c,d^c,e^c\). Together they cover

\[
\{Q,u^c,d^c,L,e^c\}.
\]

They carry

\[
(\Delta B,\Delta L)=(1,1)
\quad\text{and}\quad
(-1,-1),
\]

so they preserve \(B-L\) and violate \(B+L\).

This is stronger than merely saying “some four-fermion operators exist”: there is no representation left isolated from the interaction hypergraph.

## 4. Why coverage is not symmetric mass generation

A connected interaction hypergraph does not determine its infrared phase. At strong coupling the quartics may:

1. generate a fermion bilinear condensate and break gauge or global symmetry;
2. leave massless composite fermions;
3. produce topological order;
4. encounter a first-order transition rather than a symmetric massive phase;
5. gap the mirror sector symmetrically.

Only the fifth outcome would solve the desired finite-wall problem without additional low-energy structure.

One must therefore construct a regulated mirror Hamiltonian, identify all exact symmetries, and establish its spectrum or phase by an analytic limit, sign-controlled simulation, tensor-network calculation or another reliable nonperturbative method.

## 5. The \(B-L\) question

The minimal charged cover preserves \(B-L\). With a sterile neutrino, \(B-L\) can be gauged only after the usual anomaly conditions are included, and a \(\nu^c\nu^c\) Majorana term would break it by two units.

This gives two separate mirror experiments:

- preserve \(B-L\) and ask whether the quartic system admits a unique symmetric gap;
- add the neutral Majorana channel and test whether reducing the global symmetry removes an obstruction.

The phase diagram, not representation arithmetic, decides between them.

## 6. Jordan-triple and Furey interpretation

A TRO operation is ternary:

\[
(x,y,z)\longmapsto xy^\dagger z.
\]

Fermion parity requires an even Hamiltonian. Pairing a ternary output with a fourth fermionic leg is therefore a natural algebraic route to quartic interactions. The eight gauge-invariant hyperedges give concrete targets for such a construction.

The critical operator-level test is not whether a ternary product can be written abstractly, but whether the source-native Furey block product:

1. lands in the required fourth representation;
2. gives the correct color and weak invariant tensors;
3. respects the selected chiral TRO without restoring mirrors;
4. yields a Hermitian, local, gauge-invariant even interaction.

No such full derivation is claimed here.

## 7. Stop-everything and falsification gates

**Positive trigger:** one Furey-native quartic combination has a demonstrably unique, symmetric, fully gapped mirror ground state and leaves the physical-wall Schur response unchanged up to exponentially small corrections.

**Global-symmetry trigger:** the existence of the gap depends sharply on preserving versus breaking \(B-L\), converting the sterile-neutrino completion into a regulator prediction.

**Topological trigger:** every symmetric gapped realization carries unavoidable topological order, which must then enter the boundary-response/Jordan sewing data.

**Falsifier of the support argument:** explicit Lorentz and Grassmann contraction reduces the hypergraph so that some charged representation has no nonvanishing interaction incidence.

**Falsifier of a claimed mirror solution:** interaction coverage is presented as proof of a gap without a nonperturbative phase calculation.

## 8. Certificate

The [mirror quartic invariant census](scripts/verify_mirror_quartic_invariant_census.mjs) enumerates all four-field multisets, imposes color triality, weak-singlet parity and exact integer hypercharge cancellation, confirms the eight representation-level classes and verifies that \(QQQL\) plus \(u^cu^cd^ce^c\) covers every charged representation while preserving \(B-L\).

## Companion documents

- [Mirror bilinear obstruction](239_mirror_wall_has_no_symmetric_bilinear_gap_for_charged_generation.md)
- [One-generation anomaly gate](228_one_standard_model_generation_passes_domain_wall_anomaly_gate.md)
- [Four anomaly-free Furey TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Furey orientation as a ternary bimodule](108_furey_oriented_bimodule_ternary_closure.md)
