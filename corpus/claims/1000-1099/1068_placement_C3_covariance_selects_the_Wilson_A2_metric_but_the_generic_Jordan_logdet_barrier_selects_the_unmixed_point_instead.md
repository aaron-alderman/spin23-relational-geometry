# Placement \(C_3\) Covariance Selects the Wilson \(A_2\) Metric, but the Generic Jordan Log-Det Barrier Selects the Unmixed Point Instead

**Date:** 18 October 2026  
**Branches:** Wilson \(A_2\) critical metric, placement symmetry, equal-relationship action, Jordan determinant barrier, dynamical selection  
**Claim status:** exact selector comparison inside the one-parameter metric family; microscopic origin of the placement-symmetric potential open  
**Certificate:** [compare_placement_symmetry_and_jordan_logdet_as_selectors_of_the_wilson_a2_metric.mjs](../../../verification/compare/compare_placement_symmetry_and_jordan_logdet_as_selectors_of_the_wilson_a2_metric.mjs)

> **Forward result (document 1069).** Complex \(C_3\) covariance alone
> permits an additional Hermitian \(i\varepsilon\) counterterm. A compatible
> Real structure removes it and protects the \(G_{A_2}\) metric ray. The
> source cycle crosses the \(S_1/S_1^\dagger\) orientation grading, so this
> protection cannot be an ordinary gauge-linear internal symmetry.

## Executive result

Document 1067 found the exact Wilson/placement match at

\[
r=\frac{\kappa}{m^2}=1.
\]

Two natural-looking selection principles behave differently.

First, require the inverse-mass metric

\[
K(r)=
\begin{pmatrix}
1+r&-r\\
-r&1+r
\end{pmatrix}
\]

to be invariant under the already established placement cycle

\[
A=
\begin{pmatrix}
0&-1\\
1&-1
\end{pmatrix}.
\]

Direct calculation gives

\[
\boxed{
\left\|A^TK(r)A-K(r)\right\|_F^2
=3(r-1)^2.
}
\]

Therefore

\[
\boxed{
A^TK(r)A=K(r)
\quad\Longleftrightarrow\quad
r=1.
}
\]

The same result follows from treating the three Wilson directions

\[
e_1,\qquad e_2,\qquad e_1+e_2
\]

as three symmetry-related relationships. Their squared \(K(r)\)-norms are

\[
1+r,\qquad1+r,\qquad2,
\]

and their variance is

\[
\boxed{
\sum_i\left(\lVert q_i\rVert_K^2-\overline n\right)^2
=\frac23(r-1)^2.
}
\]

Thus exact \(C_3\) covariance or equal relationship weighting selects the \(A_2\) point uniquely.

Second, try a generic Jordan isotropy principle: normalize \(K\) to fixed trace and maximize its determinant, equivalently minimize a negative log-determinant barrier. One finds

\[
\det\frac{K(r)}{\operatorname{tr}K(r)}
=
\frac{1+2r}{4(1+r)^2},
\]

with

\[
\frac{d}{dr}
\log\det\frac{K(r)}{\operatorname{tr}K(r)}
=
-\frac{2r}{(1+2r)(1+r)}<0
\qquad(r>0).
\]

It selects

\[
\boxed{r=0,}
\]

the unmixed isotropic metric, not \(r=1\).

So the \(A_2\) ratio is conditionally selected by relationship/placement symmetry, but not by the generic Jordan log-det barrier alone.

## 1. Exact placement covariance

The placement matrix obeys

\[
A^3=I.
\]

For the Wilson metric family,

\[
A^TK(r)A
=
\begin{pmatrix}
1+r&-1\\
-1&2
\end{pmatrix}.
\]

Subtracting \(K(r)\) gives

\[
A^TK(r)A-K(r)
=
\begin{pmatrix}
0&r-1\\
r-1&1-r
\end{pmatrix}.
\]

It vanishes exactly at \(r=1\). At that point,

\[
K(1)=
\begin{pmatrix}
2&-1\\
-1&2
\end{pmatrix}
=G_{A_2},
\]

the unique positive metric in this family preserved by the placement cycle.

This is a real symmetry statement, not merely a choice to make the three angles attractive.

## 2. Equal weighting of three relationships

The same selector has an action-like form. Define

\[
n_u=\lVert e_1\rVert_K^2=1+r,
\]

\[
n_d=\lVert e_2\rVert_K^2=1+r,
\]

\[
n_l=\lVert e_1+e_2\rVert_K^2=2.
\]

A permutation-symmetric imbalance cost is

\[
V_{\rm rel}(r)
=\lambda\sum_{q=u,d,l}(n_q-\bar n)^2
=\frac{2\lambda}{3}(r-1)^2.
\]

For \(\lambda>0\), its unique minimum is \(r=1\).

This gives a minimal candidate term whose extremum is the Wilson/\(A_2\) point. It is not yet a derivation. Writing \(V_{\rm rel}\) is justified only if a physical \(C_3\) symmetry permutes the three coupling rays or an equal-response principle makes them dynamically comparable.

## 3. Why the determinant barrier chooses differently

The unnormalized determinant

\[
\det K(r)=1+2r
\]

grows without bound and cannot select a finite ratio. Fixing the trace removes this scale ambiguity:

\[
\widehat K(r)
=\frac{K(r)}{2(1+r)}.
\]

Then

\[
\det\widehat K(0)=\frac14,
\qquad
\det\widehat K(1)=\frac3{16}.
\]

The determinant is largest at \(r=0\), where \(\widehat K=I/2\). This is exactly what a generic log-det isotropy pressure should do: it suppresses anisotropy and mixing.

The \(A_2\) point is not the most isotropic two-dimensional metric. It is the metric that makes **three specified relationship rays** equivalent. The distinction is central:

- Jordan log-det sees the eigenvalues of \(K\);
- placement symmetry sees \(K\) together with the marked ray triple.

The relationship labels supply selection data that the bare positive cone does not contain.

## 4. A candidate effective action

The smallest conditional action on the one-parameter family is

\[
V_{\rm eff}(r)
=
\alpha\,\left\|A^TK(r)A-K(r)\right\|_F^2
+V_{\rm radial}(r),
\qquad \alpha>0.
\]

If \(V_{\rm radial}\) fixes the overall scale without shifting the ratio, the first term selects \(r=1\).

Equivalently use \(V_{\rm rel}\). Both forms encode the same marked-ray \(C_3\) covariance.

A generic additional log-det term competes with this selector and pulls toward \(r=0\). Any full action must therefore compute the balance rather than assume the exact \(A_2\) point survives.

## 5. What this says about Jordan versus relationship

This calculation realizes a recurring theme of the programme in a controlled miniature:

- the Jordan positive-cone barrier prefers a smooth, maximally isotropic carrier;
- the marked relational triple prefers the \(A_2\) metric in which three links are equally weighted;
- the exact physical point depends on how carrier stability competes with relationship symmetry.

The relationship structure is not recoverable from the unmarked determinant alone. Conversely, relationship symmetry still needs the positive Jordan metric to define lengths and reflections.

This is a precise version of the proposed “dance between singular and relationships,” not a proof that the full universe chooses the same potential.

## 6. Stop-everything criteria

**Placement-symmetry trigger:** derive an exact or emergent \(C_3\) action permuting the three Wilson bilinear rays and preserving their kinetic kernel. Then \(r=1\) follows inside the present family.

**Equal-response trigger:** a Ward identity or self-consistency equation enforces \(n_u=n_d=n_l\). This also gives \(r=1\).

**Barrier falsifier:** claim that a generic trace-normalized log-det/Jordan isotropy action selects the \(A_2\) point. It selects \(r=0\).

**Hand-insertion warning:** add \(\|A^TKA-K\|^2\) solely because its minimum is desired, without deriving why \(A\) acts on the mediator sector.

**Competition gate:** compute radiative and Jordan-barrier terms in the same normalization and verify whether \(r=1\) remains stationary.

**RG gate:** establish that placement covariance protects \(r=1\) under running; otherwise it is only a matching-scale condition.

## Verdict

| Candidate selector | Selected ratio |
|---|---:|
| exact placement \(C_3\) covariance | \(r=1\) |
| equal norm of the three marked Wilson rays | \(r=1\) |
| trace-normalized determinant maximization | \(r=0\) |
| generic negative log-det isotropy barrier | \(r=0\) |

The \(A_2\) metric is selected by the marked relationship geometry, not by the unmarked Jordan cone.

## Position in the corpus

- [unique Wilson/\(A_2\) critical metric](1067_the_Wilson_rays_become_exactly_the_A2_placement_root_system_at_the_unique_shared_leg_strength_kappa_equals_m_squared.md)
- [placement/mediator arrow identity](../0900-0999/991_the_two_mediator_faces_are_exactly_adjacent_reflection_arrows_in_the_three_placement_groupoid.md)
- [Jordan determinant barrier](1011_the_face_population_jordan_determinant_supplies_a_polar_barrier_but_the_coherent_rank_one_projector_cannot.md)
- [Gram-centre selection boundary](1019_the_existing_jordan_and_rate_actions_do_not_select_asinh1_but_causal_gram_extremality_does_conditionally.md)

