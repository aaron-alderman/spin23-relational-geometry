# Frontier Wave 7.67: Q Transport and the Reverse-Channel Fork

**Date:** 25 October 2026
**Status:** exact invariant-form classification and transport no-go
**Ledger:** [Q-provenance audit](q_provenance_audit_v1.json)
**Certificate:** [rectangular fork verifier](../../../../verification/verify/verify_rectangular_q_provenance_fork.mjs)

## Result

The rectangular channel's native positive dagger does not by itself select
the noncompact real form. It reduces the question to one exact sign—or,
after complexification, coherent-phase—fork.

On

\[
U\oplus Z=\mathbb R^2\oplus\mathbb R^3,
\]

the forms invariant under the compact endpoint rotations
\(SO(2)\times SO(3)\) are exactly

\[
S_{a,b}=\operatorname{diag}(aI_2,bI_3).
\]

There are therefore two parameters before cross-channel dynamics is imposed.

For every \(E:U\to Z\), consider the two adjoint completions

\[
X_+(E)=
\begin{pmatrix}0&E^T\\E&0\end{pmatrix},
\qquad
X_-(E)=
\begin{pmatrix}0&-E^T\\E&0\end{pmatrix}.
\]

Requiring \(X_+(E)\) to preserve \(S_{a,b}\) for all \(E\) forces

\[
b=-a.
\]

The invariant line is therefore

\[
Q=\operatorname{diag}(-I_2,+I_3),
\]

and the six cross directions close to \(\mathfrak{so}(2,3)\).

Requiring \(X_-(E)\) instead forces

\[
b=a,
\]

so the invariant line is positive definite and the closure is
\(\mathfrak{so}(5)\).

## Exact meaning of the Q-adjoint

Embed the one-way channel as

\[
N_E=\begin{pmatrix}0&0\\E&0\end{pmatrix}.
\]

For \(Q=\operatorname{diag}(-I_2,+I_3)\), its \(Q\)-adjoint obeys

\[
N_E^{\sharp_Q}=Q^{-1}N_E^TQ
=\begin{pmatrix}0&-E^T\\0&0\end{pmatrix},
\]

and hence

\[
N_E-N_E^{\sharp_Q}=X_+(E).
\]

Once \(Q\) is fixed, the reverse block is unique. What is not fixed by the
positive dagger alone is whether dynamics uses the self-adjoint combination
\(N_E+N_E^T\), producing the noncompact branch, or the skew-adjoint
combination \(N_E-N_E^T\), producing the compact branch.

This is the precise mathematical location of the Wick-like quarter-turn in
the channel: multiplication by \(i\), or its real coherent surrogate, changes
self-adjoint response into an anti-Hermitian evolution generator. It is not a
license to identify Euclidean and Lorentzian metrics without naming the
dynamical role.

## Transport theorem and no-go

The selector primitive module and the rectangular real carrier have the same
dimension and signature, so an isometry exists. But a split-preserving
isometry is not unique: after one is chosen, it remains a torsor under

\[
O(2)\times O(3),
\]

of continuous dimension four. The label, basis and phase ambiguities from
Wave 7.62 remain on top of this orthogonal freedom.

Therefore matching signatures proves existence, not identity. No authored
corpus map currently intertwines:

1. the selector action on \(\Lambda^2_0V^*\);
2. the \(\kappa_{\mathcal I}\) two-plus-three eigensplitting;
3. the partial-sewing endpoint actions; and
4. the measured channel \(E\).

## Terminal classification

| Input | What it fixes | What remains |
|---|---|---|
| endpoint positive metrics | dagger and singular values | relative dynamical phase |
| block decomposition | a canonical grading involution | conserved form |
| noncompact cross completion | \(Q\) uniquely up to scale | why this completion is physical |
| compact cross completion | positive \(I_5\) uniquely up to scale | why this completion is physical |
| selector primitive module | source-native \(Q\) and \(2+3\) split | transport to ports |

The rectangular problem is thus a branch-selection and intertwining problem,
not a remaining search for possible quadratic forms.
