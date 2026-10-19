# A Sector-Dependent Krajewski Anchor Mask Allows Majorana Null Sewing while Forbidding Dirac Null Leakage

**Date:** 18 October 2026  
**Branches:** B-GENERATION-BLIND-FIRST-ORDER-NULL-LINE-NO-GO, B-MINIMAL-THREE-LINE-FAMILY-ALGEBRA, finite-one-form incidence  
**Claim status:** exact bimodule-label existence and necessity theorem; embedding into a complete KO-6 Pati–Salam spectral triple remains open  
**Certificate:** [prove_sector_dependent_Krajewski_anchor_mask_for_Majorana_null_sewing.mjs](../../../verification/prove/prove_sector_dependent_Krajewski_anchor_mask_for_Majorana_null_sewing.mjs)

## Executive result

The local incidence obstruction has a minimal combinatorial solution.

For a family algebra with three characters \(P,I,N\), label a bimodule sector by

\[
(i,j),
\]

where \(i\) is its left character and \(j\) its opposite-algebra character. First order permits an edge precisely when

\[
\boxed{(i,j)\longleftrightarrow(k,\ell)
\quad\Longrightarrow\quad
i=k\ \text{or}\ j=\ell.}
\]

Assign the Dirac-sector endpoints

\[
D_P=(P,P),
\qquad
D_I=(I,P),
\qquad
D_N=(N,N),
\]

and the Majorana-sector endpoints

\[
M_P=(P,I),
\qquad
M_N=(N,I).
\]

Then:

\[
D_P\leftrightarrow D_I
\quad\text{is horizontal and allowed},
\]

\[
D_P\leftrightarrow D_N
\quad\text{is diagonal and forbidden},
\]

\[
M_P\leftrightarrow M_N
\quad\text{is horizontal and allowed}.
\]

Reality maps the allowed horizontal edges to allowed vertical partners and the forbidden diagonal edge to another forbidden diagonal edge.

This is exactly the requested mask: image-line Dirac leakage may occur only quadratically in the texture zero, null-line Dirac leakage is absent, and the Majorana null-line sewing needed to restore full heavy rank remains available.

## 1. Why charges alone cannot do this

The three-line family charges are

\[
X=(-2,1,1),
\qquad
Z=(0,1,-1).
\]

Therefore

\[
q(P\to I)=(3,1),
\qquad
q(P\to N)=(3,-1).
\]

The desired Majorana \(P\to N\) edge and the dangerous Dirac \(P\to N\) edge carry the same family charge vector. No ordinary \(U(1)_X\times U(1)_Z\) selection rule can allow one and forbid the other.

The distinction must be in the bimodule incidence, not in the charge lattice.

## 2. The first-order mask

For a matrix element from \((i,j)\) to \((k,\ell)\), the double commutator contains

\[
(a_k-a_i)(b_\ell-b_j)D_{(i,j),(k,\ell)}.
\]

It vanishes for all algebra elements only if the edge preserves its left character or its opposite character. Applying this rule to the witness gives

\[
\begin{array}{c|c|c|c}
\text{edge}&\text{left labels}&\text{opposite labels}&\text{status}\\ \hline
D_P\leftrightarrow D_I&P\leftrightarrow I&P=P&\text{allowed}\\
D_P\leftrightarrow D_N&P\leftrightarrow N&P\ne N&\text{forbidden}\\
D_I\leftrightarrow D_N&I\leftrightarrow N&P\ne N&\text{forbidden}\\
M_P\leftrightarrow M_N&P\leftrightarrow N&I=I&\text{allowed}
\end{array}
\]

The null line is consequently isolated from the selected and image lines in the Dirac-sector one-form graph while remaining connected to the selected line in the Majorana-sector graph.

## 3. Sector dependence is necessary

Suppose instead that each family line had one universal opposite-character anchor, used identically in the Dirac and Majorana sectors. Then the endpoints of the two \(P\leftrightarrow N\) edges would carry identical bimodule labels.

The first-order test would therefore give them identical status:

\[
\text{Majorana }P\leftrightarrow N\text{ allowed}
\iff
\text{Dirac }P\leftrightarrow N\text{ allowed}.
\]

An exhaustive enumeration of all \(3^3=27\) sector-independent anchor assignments finds no solution. Allowing sector-dependent anchors gives

\[
3\times2\times3=18
\]

valid assignments: three choices for the common Dirac \(P/I\) anchor, two different choices for the Dirac \(N\) anchor, and three choices for the common Majorana \(P/N\) anchor.

Thus:

\[
\boxed{
\text{the incidence solution exists, and sector-dependent opposite characters are necessary}.
}
\]

## 4. Reality and grading

Reality exchanges the two bimodule labels:

\[
J:(i,j)\mapsto(j,i).
\]

It maps each allowed horizontal edge to an allowed vertical edge. It maps the forbidden Dirac diagonal edge

\[
(P,P)\leftrightarrow(N,N)
\]

to itself with reversed orientation. The mask is therefore closed under the label-level real structure.

A grading can assign opposite signs to the endpoints of each retained Dirac-operator edge. This proves compatibility at the incidence level, but not the complete KO-6 sign table. The latter requires the full particle/conjugate Hilbert-space representation.

## 5. Physical interpretation

The construction says that “family label” is insufficient data. A physical state must carry both:

1. the family character \(P,I,N\);
2. a sector-dependent opposite-algebra anchor.

This is a relational rather than purely charge-based distinction. The same \(P\to N\) family transformation can be present in the Majorana relationship module and absent in the Dirac relationship module because those modules occupy different rectangles of the bimodule grid.

That mechanism is already familiar in the proton-safe Pati–Salam source masks: identical low-energy gauge permission need not imply identical represented one-form incidence. Here it is applied to the neutrino null-line problem.

## 6. What has and has not been solved

Solved at the finite-label level:

- allow the safe Dirac \(P\leftrightarrow I\) edge;
- forbid the dangerous Dirac \(P\leftrightarrow N\) edge by first order;
- allow the rank-restoring Majorana \(P\leftrightarrow N\) edge;
- retain closure under the label-level real structure;
- prove that a sector-independent family representation cannot do the job.

Not yet solved:

- embedding these bimodules into the actual Pati–Salam particle and conjugate sectors;
- the KO-6 signs \((J^2,JD,J\gamma)\);
- orientability and Poincaré duality of the completed intersection form;
- the junk quotient and physical scalar multiplicities;
- unimodularity and the global spin–weak quotient on the extended representation;
- whether the spectral action retains the mask radiatively.

## 7. Stop-everything criteria

**Universal-anchor stop:** any construction assigning the same opposite character to a family line in every particle sector cannot distinguish the two \(P\leftrightarrow N\) edges.

**Charge-only stop:** the Majorana and Dirac null edges have the same \((X,Z)\) vector, so charge selection alone cannot implement the mask.

**Reality stop:** every retained horizontal edge must include its vertical \(J\)-partner.

**Embedding stop:** do not claim a physical spectral triple until the witness is placed in the actual Pati–Salam bimodule table and passes KO-6, orientability, duality and junk tests.

**Phenomenology trigger:** after symmetry breaking, the represented Dirac one-form must still have zero projection on \(L_{\rm ker}\), not merely a zero bare matrix entry.

## 8. Verdict

The generation-blind no-go is not a no-go for finite geometry itself. It identifies the precise missing datum:

\[
\boxed{
\text{sector-dependent opposite-algebra anchoring}.
}
\]

At Krajewski-label level this datum produces exactly the needed separation between Majorana null sewing and Dirac null leakage. The next gate is no longer “find some selection principle”; it is concrete:

\[
\text{embed this five-endpoint mask into a complete real-even Pati–Salam finite triple}.
\]

## Corpus position

- [generation-blind first-order null-line no-go](1115_the_generation_blind_Pati_Salam_first_order_calculus_cannot_protect_the_Majorana_null_line_from_Dirac_leakage.md)
- [minimal three-line family algebra](1116_the_minimal_associative_family_algebra_that_separates_selected_image_and_null_lines_is_C3_and_it_forces_an_extra_U1_plus_the_odd_KO6_obstruction.md)
- [first-order horizontal/vertical Krajewski rule](1101_the_first_order_condition_allows_the_charge_three_family_edge_only_as_a_horizontal_vertical_real_pair_but_does_not_complete_the_standard_model_finite_triple.md)
- [spin–weak-kernel scalar closure](1119_the_spin_weak_kernel_is_closed_under_bilinear_scalar_generation_and_the_odd_Z_repair_defines_a_distinct_UV_branch.md)
- [orientable \(A_2\) triangle and connected four-character completion](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)
