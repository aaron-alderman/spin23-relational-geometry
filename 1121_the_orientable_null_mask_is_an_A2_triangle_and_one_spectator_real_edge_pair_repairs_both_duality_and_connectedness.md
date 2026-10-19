# The Orientable Null Mask Is an \(A_2\) Triangle, and One Spectator Real-Edge Pair Repairs Both Duality and Connectedness

**Date:** 18 October 2026  
**Branches:** B-SECTOR-DEPENDENT-KRAJEWSKI-NULL-MASK, KO-6 completion, Poincaré duality and finite-metric connectedness  
**Claim status:** exact finite complex-character toy-model theorem; physical Pati–Salam realization and junk quotient remain open  
**Certificate:** [prove_KO6_A2_triangle_and_connected_four_character_completion_of_null_mask.mjs](scripts/prove_KO6_A2_triangle_and_connected_four_character_completion_of_null_mask.mjs)

## Executive result

The [sector-dependent null mask](1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md) admits an orientable KO-6 label completion, but its shape is forced.

Among the 18 incidence-compatible three-character anchor assignments, exactly two avoid self-conjugate bimodule sectors. Closing either under the real structure produces all six off-diagonal sectors

\[
(P,I),(I,P),(P,N),(N,P),(I,N),(N,I).
\]

Oddness of the retained Dirac and Majorana edges and \(J\gamma=-\gamma J\) then fix the chirality pattern up to overall sign. The intersection form is

\[
\cap_{PIN}=
\begin{pmatrix}
0&-1&1\\
1&0&-1\\
-1&1&0
\end{pmatrix}.
\]

This is the oriented \(A_2\) triangle. It has rank two and kernel \((1,1,1)\), so it is orientable but necessarily Poincaré-degenerate.

A single fourth character \(S\), added through the real pair

\[
(P,S)_+,
\qquad
(S,P)_-,
\]

gives a unimodular four-character intersection form with determinant one. Unlike a disconnected spectator repair, one additional real edge pair

\[
(S,P)\leftrightarrow(I,P),
\qquad
(P,S)\leftrightarrow(P,I)
\]

is first-order compatible, grading odd and connects the fourth algebra character to the existing finite metric. Thus one spectator pair plus one real connector pair repairs both Poincaré duality and connectedness at toy-model level.

## 1. Why self-conjugate sectors must be removed

In KO dimension six,

\[
J\gamma=-\gamma J.
\]

A self-conjugate label \((i,i)\) must therefore occur in opposite-grading copies. A represented Hochschild zero-cycle cannot distinguish those copies, so orientability fails exactly as in the earlier two-point quartet.

For the null mask, write the common Dirac \(P/I\) anchor as \(a\), the distinct Dirac null anchor as \(b\), and the common Majorana \(P/N\) anchor as \(c\). Avoiding all self-conjugate endpoints forces

\[
a=N,
\qquad
c=I,
\qquad
b\in\{P,I\}.
\]

These are the only two self-conjugate-free assignments among the 18 witnesses.

## 2. Reality forces the full directed triangle

For either surviving assignment, closure under

\[
J:(i,j)\mapsto(j,i)
\]

produces the same six sectors:

\[
\{PI,IP,PN,NP,IN,NI\}.
\]

There is no smaller orientable real closure. The Majorana/Dirac incidence solution therefore does not merely resemble an \(A_2\) arrangement; its minimal real-even label completion is the complete directed triangle on the three family characters.

## 3. Chirality is fixed by the physical edge mask

Choose

\[
\gamma(P,N)=+1.
\]

The allowed Dirac edge

\[
(P,N)\leftrightarrow(I,N)
\]

must be odd, so \(\gamma(I,N)=-1\). Reality gives

\[
\gamma(N,P)=-1,
\qquad
\gamma(N,I)=+1.
\]

The allowed Majorana edge

\[
(P,I)\leftrightarrow(N,I)
\]

then requires \(\gamma(P,I)=-1\), and reality fixes \(\gamma(I,P)=+1\).

Thus all six signs are determined up to simultaneous reversal.

## 4. The \(A_2\) intersection obstruction

Each sector \((i,j)\) contributes its chirality to the intersection-form entry \(\cap_{ij}\). In the order \(P,I,N\),

\[
\cap_{PIN}=
\begin{pmatrix}
0&-1&1\\
1&0&-1\\
-1&1&0
\end{pmatrix}.
\]

It obeys

\[
\cap_{PIN}(1,1,1)^T=0,
\qquad
\operatorname{rank}\cap_{PIN}=2,
\qquad
\det\cap_{PIN}=0.
\]

This recovers the general odd-antisymmetric obstruction, but now with more structure: the null-line mask itself fixes the primitive \(A_2\) cycle whose null direction is the common diagonal character.

This is a genuine convergence with the programme's repeated \(A_2\) appearances, but it is not yet an identification with the Furey, charge or Golay \(A_2\) planes. An explicit intertwiner is still required.

## 5. Minimal duality repair

Add a fourth character \(S\) and the real pair

\[
(P,S)_+,
\qquad
(S,P)_-.
\]

The intersection form becomes

\[
\cap_{PINS}=
\begin{pmatrix}
0&-1&1&1\\
1&0&-1&0\\
-1&1&0&0\\
-1&0&0&0
\end{pmatrix},
\]

with

\[
\boxed{\det\cap_{PINS}=1.}
\]

The repair is therefore integral and unimodular, not merely nondegenerate over \(\mathbb R\).

## 6. Minimal connectedness repair

The original Dirac and Majorana edges impose the left-algebra equalities

\[
a_P=a_I,
\qquad
a_P=a_N.
\]

Without an additional edge, \(a_S\) remains free. Add

\[
(S,P)\leftrightarrow(I,P).
\]

It is horizontal, first-order compatible and odd. It imposes

\[
a_S=a_I.
\]

Reality supplies the vertical partner

\[
(P,S)\leftrightarrow(P,I),
\]

which is also first-order compatible and odd. The full left Dirac commutant then satisfies

\[
a_P=a_I=a_N=a_S,
\]

so only scalar algebra elements commute with the toy \(D_F\).

## 7. What the completion means

The four-character construction simultaneously supplies:

- the required Majorana/Dirac null-line incidence mask;
- KO-6 real pairing and grading at label level;
- orientability without repeated opposite-grade labels;
- a unimodular Poincaré intersection form;
- connected finite metric.

It does not yet identify \(S\). The preferred physical possibility is that \(S\) is an existing Pati–Salam internal character and the connector is an existing Higgs/Yukawa edge. If \(S\) is a new complex summand, it risks another gauge \(U(1)\), new fermion sectors and new scalars.

## 8. Stop-everything criteria

**Three-character duality stop:** the orientable null mask has an odd antisymmetric intersection form and cannot satisfy Poincaré duality by coefficient tuning.

**Self-label stop:** using one of the other 16 anchor assignments introduces self-conjugate sectors and revives the orientability obstruction.

**Disconnected-spectator stop:** the fourth real pair repairs the intersection form but not the Dirac commutant unless a connector is present.

**Gauge stop:** a new \(S\) summand is not acceptable until unimodularity, anomalies and symmetry breaking remove any unwanted gauge field.

**Physical-embedding stop:** label-level equality is not proof that the Pati–Salam representation contains these sectors or that the junk quotient retains only the desired scalars.

**Positive trigger:** identify \(S\) and the connector inside the existing physical finite triple, retain the null mask after junk reduction and verify the full global quotient.

## 9. Verdict

The local finite-geometry branch has advanced from a no-go to a minimal complete toy geometry:

\[
\boxed{
\text{null-line mask}
\Longrightarrow
\text{oriented }A_2\text{ triangle}
\Longrightarrow
\text{one spectator pair + one real connector pair}.
}
\]

The next question is sharply physical rather than combinatorial: can the existing Pati–Salam finite Hilbert space supply \(S\) and the connector without adding an unwanted gauge sector?

## Corpus position

- [sector-dependent Krajewski null mask](1120_a_sector_dependent_Krajewski_anchor_mask_allows_Majorana_null_sewing_while_forbidding_Dirac_null_leakage.md)
- [three-character duality obstruction and spectator repair](1103_the_orientable_three_character_family_model_fails_Poincare_duality_while_a_fourth_spectator_repairs_the_intersection_form_but_not_Dirac_connectedness.md)
- [KO-6 orientability anchor theorem](1102_the_minimal_two_point_KO6_family_quartet_fails_orientability_but_one_anchor_character_gives_an_explicit_real_even_first_order_completion.md)
- [minimal three-line family algebra](1116_the_minimal_associative_family_algebra_that_separates_selected_image_and_null_lines_is_C3_and_it_forces_an_extra_U1_plus_the_odd_KO6_obstruction.md)
- [Pati–Salam character obstruction and branch split](1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md)
