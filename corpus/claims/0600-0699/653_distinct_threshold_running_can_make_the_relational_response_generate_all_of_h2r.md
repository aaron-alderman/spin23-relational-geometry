# Distinct Threshold Running Can Make the Relational Response Generate All of \(H_2(\mathbb R)\)

**Date:** 17 October 2026  
**Branches:** B04, B05, B07, B08, B11 and the relational-carrier/Jordan-triple branch  
**Claim status:** exact existence theorem for a declared positive six-threshold model; physical Standard-Model spectral functions remain open  
**Certificate:** [test_threshold_running_spans_relational_h2.mjs](../../../verification/test/test_threshold_running_spans_relational_h2.mjs)

## Executive result

Keep the source operators fixed as

\[
(J_\Lambda,J_{B-L}).
\]

Let each Standard-Model sector contribute a positive Stieltjes term

\[
G(t)=\sum_r
\frac{d_r}{t+m_r^2}
v_rv_r^T,
\qquad
v_r=(\lambda_r,q_r)^T.
\]

For the six incidence/charge vectors and distinct declared thresholds

\[
m_r^2=(4,9,16,25,36,49),
\]

the three positive response matrices at

\[
t=0,5,30
\]

are pairwise noncommuting and linearly span all of

\[
\boxed{Sym_2(\mathbb R).}
\]

Their Jordan-triple closure therefore reaches the full carrier whose TKK algebra is \(\mathfrak{sp}(4,\mathbb R)\).

This is an existence result showing that physical threshold running can supply the missing third direction without changing source coordinates. It is not yet a calculation of the actual interacting Standard-Model spectral matrix.

## 1. The fixed-frame spectral model

Use

\[
\lambda=(5,5,1,1,1,0),
\qquad
q=(1,-1,-1,-3,3,3),
\]

and sector multiplicities

\[
d=(6,3,3,2,1,1).
\]

Every summand

\[
\frac{d_r}{t+m_r^2}v_rv_r^T
\]

is positive semidefinite for \(t\ge0\). Because the six source vectors span the two-dimensional source space, the total response is positive definite.

No parameter-dependent source transformation is used. The labels and units of \(J_\Lambda\) and \(J_{B-L}\) remain fixed while the spectral weights run.

## 2. Why thresholds create a third direction

The sector source rays are not all collinear. For example,

\[
v_Q=(5,1),
\qquad
v_{u^c}=(5,-1),
\qquad
v_{\nu^c}=(0,3).
\]

Their rank-one matrices span \(Sym_2(\mathbb R)\). Distinct denominators weight these rays differently as \(t\) changes, so the total matrices need not share one eigenbasis.

The certificate verifies

\[
[G(0),G(5)]\ne0,
\qquad
[G(0),G(30)]\ne0,
\qquad
[G(5),G(30)]\ne0,
\]

and

\[
\operatorname{rank}
\begin{pmatrix}
\operatorname{flat}G(0)\\
\operatorname{flat}G(5)\\
\operatorname{flat}G(30)
\end{pmatrix}
=3.
\]

Thus the family, rather than one point, generates the full simple Jordan carrier.

## 3. Degenerate-threshold control

If every sector has the same threshold \(m^2\), then

\[
G(t)=\frac1{t+m^2}
\sum_rd_rv_rv_r^T.
\]

All matrices are proportional. The sampled family has linear span one, and its unital Jordan closure remains the two-dimensional commuting algebra identified in [document 651](651_one_relational_gram_point_generates_only_a_six_dimensional_tkk_subalgebra.md).

Therefore full accessibility comes from differential spectral running, not from multiplying one Gram by a scalar function.

## 4. Exact algebraic consequence

Because the sampled matrices span \(Sym_2(\mathbb R)\), the triple

\[
\{A,B,C\}=ABC+CBA
\]

closes on the full three-dimensional carrier. Applying the canonical TKK construction gives

\[
\operatorname{TKK}(Sym_2(\mathbb R))
\cong\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3).
\]

This is the first explicit fixed-source response family in the programme whose physically motivated running can generate the complete algebra rather than a commuting subalgebra.

## 5. What is not yet proved

The thresholds in the certificate are deliberately distinct positive values, not fitted particle masses or computed interacting thresholds. The model does not establish:

- the actual Standard-Model current spectral densities;
- conservation of \(J_\Lambda\);
- scheme-independent normalization of the incidence operator;
- stability under operator mixing;
- a microscopic \(Sp(4,\mathbb R)\) invariance;
- identification with Furey topology or chirality.

It proves possibility and identifies the exact degeneracy that would prevent it.

## 6. Symmetry versus generation

The statement

\[
\text{response matrices generate }H_2(\mathbb R)
\]

does not imply

\[
Sp(4,\mathbb R)\text{ preserves the physical action}.
\]

It licenses the TKK algebra as the canonical conformal completion of the accessible response carrier. A symmetry claim additionally requires covariance of the spectral family, source normalization, subtraction data and dynamics.

## 7. Stop-everything criteria

Stop the fixed-frame threshold route if:

1. all sector spectral functions are proportional at every scale;
2. the physical family is simultaneously diagonalizable by one fixed source basis;
3. operator mixing destroys the declared incidence source;
4. full rank appears only after frequency-dependent source whitening;
5. the TKK completion is advertised as an action symmetry without a covariance proof.

## 8. Next gates

1. Replace the declared thresholds by free Standard-Model masses and continuum spectral densities.
2. Include Majorana breaking and determine the valid ultraviolet interval for \(B-L\).
3. Test simultaneous diagonalizability of the physical response family.
4. Construct TKK generators from three sampled response matrices and distinguish generated algebra from dynamical symmetry.

## Reproducibility

```powershell
node scripts\test_threshold_running_spans_relational_h2.mjs
```
