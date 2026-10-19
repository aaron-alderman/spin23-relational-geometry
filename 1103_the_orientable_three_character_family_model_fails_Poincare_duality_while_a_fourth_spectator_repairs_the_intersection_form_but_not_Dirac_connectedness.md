# The Orientable Three-Character Family Model Fails Poincaré Duality, while a Fourth Spectator Repairs the Intersection Form but Not Dirac Connectedness

**Date:** 18 October 2026  
**Branches:** finite spectral triple, Poincaré duality, intersection form, family anchor, connectedness  
**Claim status:** exact toy-model intersection-form theorem; physical use of existing Standard-Model summands remains open  
**Certificate:** [prove_the_family_anchor_Poincare_duality_obstruction_and_four_character_repair.mjs](scripts/prove_the_family_anchor_Poincare_duality_obstruction_and_four_character_repair.mjs)

## Executive result

The three-character anchored model of document 1102 is real, even,
first-order and orientable, but it cannot satisfy finite Poincaré duality.

Its KO-6 intersection form is

\[
\cap_3=
\begin{pmatrix}
0&0&1\\
0&0&-1\\
-1&1&0
\end{pmatrix},
\qquad
\det\cap_3=0.
\]

This is not an accident. In KO dimension six the intersection form for
complex summands is antisymmetric. Every odd-dimensional antisymmetric matrix
is singular. A three-character complex model therefore cannot be
Poincaré-nondegenerate.

Adding a fourth character \(t\) and one \(J\)-paired spectator sector

\[
(0,t)_+,\qquad(t,0)_-
\]

gives

\[
\cap_4=
\begin{pmatrix}
0&0&1&1\\
0&0&-1&0\\
-1&1&0&0\\
-1&0&0&0
\end{pmatrix},
\qquad
\det\cap_4=1.
\]

Thus one additional conjugate pair repairs Poincaré duality minimally.

But the repair is not yet a complete geometry: if the spectator sector has no
new Dirac edge, non-scalar algebra elements still commute with \(D_F\).
Intersection nondegeneracy and Dirac connectedness are separate gates.

## 1. Intersection form from the bimodule table

For minimal idempotents \(e_i\), define

\[
\cap_{ij}
=\operatorname{Tr}_{\mathcal H_F}
\left(
\gamma\,\pi(e_i)J\pi(e_j)J^{-1}
\right).
\]

Each bimodule sector \((i,j)\) of chirality \(\gamma=\pm1\) contributes that
sign to entry \((i,j)\).

The anchored quartet has sectors

\[
(0,s)_+,\quad
(1,s)_-,\quad
(s,0)_-,\quad
(s,1)_+.
\]

Using the order \(0,1,s\) gives the displayed matrix \(\cap_3\).

## 2. Why three complex characters can never work

The \(J\gamma=-\gamma J\) relation pairs a contribution at \((i,j)\) with the
opposite sign at \((j,i)\). Hence

\[
\cap^T=-\cap.
\]

For an odd-dimensional antisymmetric matrix,

\[
\det\cap
=\det\cap^T
=\det(-\cap)
=-\det\cap,
\]

so

\[
\det\cap=0.
\]

Therefore the orientable three-character repair is necessarily
Poincaré-degenerate. No choice of edge coefficient or grading magnitude can
fix this while retaining only three complex summands.

## 3. Minimal four-character repair

Introduce a fourth character \(t\) and add the real pair

\[
(0,t)_+,\qquad(t,0)_-.
\]

These sectors add

\[
\cap_{0t}=+1,\qquad
\cap_{t0}=-1.
\]

In the order \(0,1,s,t\), the full form is \(\cap_4\) above. Its Pfaffian is

\[
\operatorname{Pf}(\cap_4)=-1
\]

and therefore

\[
\det\cap_4=\operatorname{Pf}(\cap_4)^2=1.
\]

The repair is primitive: the intersection lattice is unimodular.

## 4. Orientability survives

Extend the orienting zero-cycle of document 1102 by

\[
+e_0\otimes e_t^o-e_t\otimes e_0^o.
\]

It acts with signs \(+,-\) on the two new sectors and leaves the original four
signs unchanged. Thus the six-state grading remains representable by a
Hochschild zero-cycle.

The real structure simply exchanges the new pair, so the KO-6 relations are
also compatible.

## 5. The connectedness obstruction

Let the only nonzero Dirac edges remain the charge-three pair

\[
(0,s)\leftrightarrow(1,s),
\qquad
(s,0)\leftrightarrow(s,1).
\]

For the left algebra representation, \([D,\pi(a)]=0\) requires only

\[
a_0=a_1.
\]

The values \(a_s\) and \(a_t\) remain arbitrary. Hence the Dirac commutant
contains a three-complex-dimensional algebra rather than only the scalar
diagonal.

The fourth spectator repairs the topological intersection pairing but does
not make the finite metric connected.

This is an important separation:

\[
\boxed{
\text{Poincaré duality}
\not\Longrightarrow
\text{Dirac connectedness}.
}
\]

## 6. How the physical Standard Model could repair connectedness

The full Standard-Model/Pati–Salam finite Dirac operator already contains
Higgs, Yukawa and Majorana edges between several algebra summands. If the
anchor \(s\) and spectator \(t\) are existing characters, those edges may
connect the otherwise free algebra directions without adding new family
scalars.

This gives a concrete representation-table search:

1. locate two existing internal characters playing \(s,t\);
2. verify the six required bimodule sectors occur with the needed chiralities;
3. verify existing Dirac arrows connect all four character values;
4. recompute the complete intersection form rather than adding toy forms;
5. impose physical unimodularity only after the full multiplicity table is
   known.

If no such pair exists, a standalone complex-summand extension must add both
the characters and additional admissible Dirac edges, risking extra gauge
bosons and scalars.

## 7. Stop-everything and falsification criteria

**Duality stop:** the three-character anchored model cannot be a complete
Poincaré-dual KO-6 geometry.

**Parity stop:** changing numerical weights cannot make an odd antisymmetric
intersection form nondegenerate.

**Spectator stop:** a fourth character with no physical Dirac connectivity is
only a topological repair, not a connected finite geometry.

**Embedding stop:** toy intersection forms must not be added to the physical
one without checking the complete representation multiplicities.

**Gauge stop:** new complex summands may introduce unwanted abelian gauge
directions; physical unimodularity must remove or Higgs them explicitly.

**Positive trigger:** two existing internal characters realize the anchor and
spectator sectors, the full intersection form is nondegenerate, and the
complete Dirac commutant reduces to scalars.

## 8. Verdict

\[
\boxed{
\begin{array}{c}
3\text{ complex characters}:
\quad\text{orientable but Poincaré-degenerate};\\[1mm]
4\text{ complex characters plus one }J\text{-pair}:
\quad\det\cap=1;\\[1mm]
\text{spectator without additional }D\text{-support}:
\quad\text{still disconnected}.
\end{array}
}
\]

The family branch has reached a precise representation-table dependency.
The next calculation must use the actual finite Standard-Model/Pati–Salam
bimodules to determine whether existing summands already supply both the
anchor and the Poincaré-dual spectator while their known Dirac edges restore
connectedness.

## Position in the corpus

- [KO-6 orientability obstruction and anchor repair](1102_the_minimal_two_point_KO6_family_quartet_fails_orientability_but_one_anchor_character_gives_an_explicit_real_even_first_order_completion.md)
- [first-order charge-three real pair](1101_the_first_order_condition_allows_the_charge_three_family_edge_only_as_a_horizontal_vertical_real_pair_but_does_not_complete_the_standard_model_finite_triple.md)
- [minimal two-point family algebra](1100_the_minimal_two_point_family_algebra_produces_the_A2_vertex_by_unimodularity_and_a_charge_three_one_form_but_its_full_NCG_embedding_remains_open.md)
- [sourced Pati–Salam family-anchor and quadratic-fluctuation fork](1104_the_spectral_Pati_Salam_algebra_does_not_supply_the_family_anchor_by_itself_but_its_non_first_order_quadratic_fluctuation_is_the_natural_charge_six_completion.md)
- [null-mask \(A_2\) triangle and connected spectator repair](1121_the_orientable_null_mask_is_an_A2_triangle_and_one_spectator_real_edge_pair_repairs_both_duality_and_connectedness.md)
