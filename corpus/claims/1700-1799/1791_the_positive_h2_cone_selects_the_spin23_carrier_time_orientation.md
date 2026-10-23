# The Positive \(H_2(\mathbb R)\) Cone Selects the \(Spin_0(2,3)\) Carrier Time Orientation

**Date:** 23 October 2026  
**Status:** exact Jordan-causal result; empirical clock identification remains conditional  
**Certificate:** [positive-cone time-orientation verifier](../../../verification/verify/verify_h2_positive_cone_selects_spin23_time_orientation.mjs)

## Result

Write a real symmetric two-by-two matrix as

\[
X(t,x,y)=\begin{pmatrix}t+x&y\\y&t-x\end{pmatrix}.
\]

Then

\[
\det X=t^2-x^2-y^2,
\]

and $X$ is positive definite exactly when

\[
t>\sqrt{x^2+y^2}.
\]

Thus the established positive Jordan cone $H_2(\mathbb R)_+$ is not merely compatible with an unoriented Lorentz cone: it is exactly one component, the future timelike cone, of the $1+2$-dimensional determinant form. Its rank-one boundary is the future null cone.

For every connected structure transformation $X\mapsto AXA^T$, positivity is preserved and

\[
\det(AXA^T)=\det(A)^2\det X.
\]

Translations, structure transformations, and co-translations give the Jordan conformal completion

\[
Sp(4,\mathbb R)\cong Spin_0(2,3),
\]

the identity component rather than compact $Spin(5)$ or a time-reversing component. The positive order therefore selects the causal orientation of the programme's mathematical carrier.

## Boundary

This closes the causal-real-form gate at carrier level. It does not prove that the coordinate $t=\tfrac12\operatorname{tr}X$ is laboratory time, cosmological time, or a physical clock observable. That requires the still-missing source/response dictionary. The exact statement is causal order on the Jordan carrier, not an empirical spacetime identification.

