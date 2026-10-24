# The canonical period-matrix map does not send separation to the Jordan boundary

**Date:** 24 October 2026
**Status:** exact no-go for \(Q=\operatorname{Im}\Omega\); noncanonical response maps remain open
**Evidence:** [machine-readable gate](../../../evidence/data/lattice-subroutine-period-matrix-jordan-boundary-gate-v1.json)
**Certificate:** [gate verifier](../../../verification/verify/verify_lattice_subroutine_period_matrix_jordan_boundary_gate.mjs)

## Result

The most economical proposed base-space bridge fails.

A genus-two period matrix belongs to the Siegel upper half-space:

\[
\Omega=X+iY,
\qquad
\Omega^T=\Omega,
\qquad
Y=\operatorname{Im}\Omega>0.
\]

Because \(Y\) is a positive real symmetric \(2\times2\) matrix, it looks exactly like the corpus's rank-two Jordan response carrier \(H_2(\mathbb R)_+\). This makes

\[
Q=Y=\operatorname{Im}\Omega
\]

the canonical first map to test.

But the separating divisor is

\[
\Omega=
\begin{pmatrix}
\tau_1&0\\
0&\tau_2
\end{pmatrix},
\qquad
\operatorname{Im}\tau_1>0,\quad\operatorname{Im}\tau_2>0.
\]

Therefore

\[
Q=
\begin{pmatrix}
\operatorname{Im}\tau_1&0\\
0&\operatorname{Im}\tau_2
\end{pmatrix},
\qquad
\det Q=
\operatorname{Im}\tau_1\,\operatorname{Im}\tau_2>0.
\]

The surface separates while the Jordan carrier remains in the interior of its positive cone. The \(\chi_5\) zero at separation is therefore not the response-root sheet meeting at \(\det Q=0\).

## Two different meanings of “boundary”

The distinction is structural:

- \(\Omega_{12}=0\) is a complex codimension-one locus where a genus-two surface factorizes into two genus-one components;
- \(\det Q=0\) is a real codimension-one boundary of the positive-semidefinite Jordan cone where a two-channel response loses rank.

For \(Q=\operatorname{Im}\Omega\), the first locus lies over diagonal **positive-definite** matrices. The second is not contained in the Siegel upper half-space at all.

The Siegel modular action does not repair this. If

\[
\Omega'=(A\Omega+B)(C\Omega+D)^{-1},
\]

then

\[
\operatorname{Im}\Omega'
=(C\bar\Omega+D)^{-T}
(\operatorname{Im}\Omega)
(C\Omega+D)^{-1},
\]

which is positive definite whenever \(\operatorname{Im}\Omega\) is. No ordinary modular transport of an interior period matrix reaches \(\det Q=0\).

## Implication for the Pfaffian bridge

The two sign lines can still be representation-compatible, but their zero sets are not identified by the canonical positive-cone projection. The proposed commuting square

\[
\text{separating divisor}
\longrightarrow
\text{rank-one response boundary}
\]

needs additional structure.

A surviving map must do at least one of the following:

1. use a derived response matrix rather than \(\operatorname{Im}\Omega\);
2. include sewing/defect amplitudes whose vanishing is transferred into a physical response determinant;
3. approach a genuine cusp or degeneration where the positive metric itself becomes singular after a declared normalization;
4. introduce a detector map that converts the off-diagonal sewing channel into a rank-losing two-port response.

Each option is new physics or new model data, not a consequence of the shared \(2\times2\) matrix shape.

The [local sewing-response gate](sewing-response-codimension-gate.md) sharpens the alternatives. A phase-blind positive scalar built from the complex sewing normal necessarily begins with \(|\epsilon|^2\), so it squares the seam and loses orientation. A linear signed response requires either two coherent quadratures or a separately sourced phase reference.

## What remains useful

The identification \(Y\in H_2(\mathbb R)_+\) is still mathematically exact. It says that genus-two complex structures carry a natural positive rank-two Jordan datum. What fails is the stronger claim that the modular seam zero is automatically the Jordan rank-one boundary.

This is a good example of the programme's central discipline:

> the carriers match, but the physically important strata do not.

The next bridge should therefore be tested on strata and zeros before comparing symmetry groups.

## Reopening test

Supply an explicit observable response map

\[
R:\Omega\longmapsto Q_{\rm phys}(\Omega)\in H_2(\mathbb R)_{\geq0}
\]

with:

- a declared transformation law;
- positivity on the physical domain;
- \(\det Q_{\rm phys}=0\) exactly on the intended separating/defect locus;
- a microscopic or experimental interpretation for both channels;
- no arbitrary multiplication by \(\chi_5\) inserted merely to force the zero.

Without those conditions, the period-matrix/Jordan resemblance remains a carrier analogy rather than a physical seam map.
