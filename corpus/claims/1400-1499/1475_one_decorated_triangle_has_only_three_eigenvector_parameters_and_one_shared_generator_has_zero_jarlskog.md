# One decorated triangle has only three eigenvector parameters, and one shared generator has zero Jarlskog

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact minimal-operator kill test; constrained two-operator repair remains open

**Depends on:** [the raw (3+1) parameter-role match](1474_a_metric_three_defect_triangle_plus_one_loop_phase_matches_the_ckm_parameter_count_but_predicts_no_values.md) and [the bidirectional defect-family middle](1473_top_down_defect_geometry_and_bottom_up_family_space_meet_in_one_plus_a2_but_three_points_have_no_flavour_modulus.md)

**Evidence:** [machine-readable kill test](../../../evidence/data/spin23-single-triangle-ckm-kill-test.json) and [executable verifier](../../../verification/verify/verify_spin23_single_triangle_ckm_kill_test.mjs)

## Result

The first downward fan of claim 1474 kills the most economical CKM interpretation. After vertex rephasing, a minimal Hermitian triangle hopping operator can be written

\[
H(a,b,c,\delta)=
\begin{pmatrix}
0&a&ce^{-i\delta}\\
a&0&b\\
ce^{i\delta}&b&0
\end{pmatrix},
\qquad a,b,c>0.
\]

Although this contains three edge magnitudes and one loop phase, its eigenvectors obey

\[
H(\lambda a,\lambda b,\lambda c,\delta)
=\lambda H(a,b,c,\delta).
\]

The common scale changes eigenvalues, not the diagonalizing basis. Hence the mixing eigenvectors depend on at most

\[
\boxed{a/c,\quad b/c,\quad\delta,}
\]

only three independent real parameters. The raw (3+1) middle count is therefore not four independent CKM mixing coordinates for one minimal operator.

More decisively, CKM CP violation is relational between two fermion sectors. One Hermitian operator is insufficient, and two operators that are merely spectral functions of one shared triangle generator commute:

\[
H_u=f(H_0),
\qquad
H_d=g(H_0)
\quad\Longrightarrow\quad
[H_u,H_d]=0.
\]

Their relative mixing is trivial, apart from arbitrary conventions inside exact degeneracies, and every Jarlskog commutator invariant vanishes.

## 1. The spectral quotient

The characteristic polynomial is

\[
\det(xI-H)
=x^3-x(a^2+b^2+c^2)-2abc\cos\delta.
\]

The overall edge scale controls the spectral scale. Removing it leaves two independent magnitude ratios and one loop phase. This makes the distinction between two kinds of parameters explicit:

- eigenvalue parameters can set mass scales and splittings;
- eigenvector parameters can affect mixing.

Counting them together created the apparent four-parameter coincidence in the minimal one-operator reading.

## 2. Why a graph holonomy is not automatically the CKM phase

The Wilson-loop phase

\[
\arg(H_{12}H_{23}H_{31})
\]

is invariant under rephasing of the three defect fibers. It is a genuine property of the graph connection. But physical quark CP violation requires a rephasing-invariant mismatch between the up- and down-sector diagonalizations. In standard language it is detected by a nonzero invariant built from

\[
[H_u,H_d].
\]

Therefore a topological loop phase can be a source for CKM phase only after one action couples it differently, and noncommutatively, to the two sectors.

## 3. Smallest honest repair

The middle must fan downward to two noncommuting overlap operators. Acceptable minimal sources include:

1. two sector-dependent connections derived from one higher action;
2. one common connection plus a derived diagonal contrast that does not reduce to the identity or a function of the common generator;
3. a typed left/right or up/down incidence operator that forces different edge weights.

An arbitrary second Hermitian matrix is not a repair; it simply reinstates the Standard Model flavour data as a fit. Independent adjustment of all six sector edges is likewise prohibited.

The next construction must produce (H_u) and (H_d) from fewer inputs than a generic pair and then predict a held-out invariant, preferably

\[
J\propto\operatorname{Im}\det[H_u,H_d]
\]

or its correctly normalized equivalent.

## 4. Convergence verdict

The beautiful (3+1) correspondence survives as a guide to the decorated middle, but not as a completed mixing model. The kill test has improved the missing-middle statement:

\[
\boxed{
\text{one metric triangle}+\text{one connection}
\not\Rightarrow
\text{generic CKM};
\quad
\text{two derived noncommuting sectors are required}.}
\]

This is convergence doing useful work: the two fronts came close enough for the first false identification to become calculable and fail.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_single_triangle_ckm_kill_test.mjs
~~~
