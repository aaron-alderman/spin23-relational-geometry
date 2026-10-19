# Frontier Parallel QFT 03: the seven-current Yukawa problem reduces exactly to a protected three-block plus a broken four-block

**Date:** 18 October 2026  
**Status:** exact one-generation selection-rule and block reduction at leading \(O(y^2)\); overall scheme coefficient and finite form factors remain open  
**Certificate:** [verify_frontier_parallel_qft_seven_current_reduction.mjs](scripts/verify_frontier_parallel_qft_seven_current_reduction.mjs)

## Result

The largest tractable part of the one-loop background-source problem can be completed without evaluating an uncontrolled subset of diagrams.

In the representative basis

\[
J=(j_Q,j_{u^c},j_{d^c},j_L,j_{e^c},j_{\nu^c},j_H)^T,
\]

all leading Yukawa-induced breaking factors through the four Yukawa charge rows

\[
V=
\begin{pmatrix}
1&1&0&0&0&0&1\\
1&0&1&0&0&0&-1\\
0&0&0&1&1&0&-1\\
0&0&0&1&0&1&1
\end{pmatrix}.
\]

With the free source metric

\[
D=\operatorname{diag}(6,3,3,2,1,1,1),
\]

the most general leading positive Yukawa/descendant representative has the form

\[
\boxed{
\Gamma_Y=D^{-1}V^T W V,
\qquad
W=\operatorname{diag}(w_u,w_d,w_e,w_\nu).}
\]

The weights may be ultraviolet \(\overline{\mathrm{MS}}\) coefficients, unbroken-phase absorptive weights, or broken-phase threshold functions. Their normalization and finite parts depend on which of those objects is being calculated. The incidence map does not.

With \((u,d,e,n)=(w_u,w_d,w_e,w_\nu)\), the complete lowered-index selection matrix is

\[
K_Y=V^TWV=
\begin{pmatrix}
u+d&u&d&0&0&0&u-d\\
u&u&0&0&0&0&u\\
d&0&d&0&0&0&-d\\
0&0&0&e+n&e&n&-e+n\\
0&0&0&e&e&0&-e\\
0&0&0&n&0&n&n\\
u-d&u&-d&-e+n&-e&n&u+d+e+n
\end{pmatrix}.
\]

The current map is obtained by dividing row \(i\) by \(D_i\): \(\Gamma_Y=D^{-1}K_Y\). This explicit matrix is the complete leading selection-rule answer. A future loop computation supplies the meanings and normalizations of \(u,d,e,n\); it is not free to populate any of the displayed zeros without an additional spurion, anomaly, flavor insertion, or EOM representative.

The exact decomposition is

\[
\mathbb R^7
=\underbrace{\ker V}_{\operatorname{span}\{Y,B,L\}}
\oplus_D
\underbrace{D^{-1}\operatorname{im}V^T}_{\text{four broken directions}}.
\]

Thus the maximal scheme-stable result is a \(3\oplus4\) protected/broken split—not a preferred set of four broken eigenvectors.

## 1. Exact four-channel block

Write a broken source as

\[
x=D^{-1}V^Tz,
\qquad z\in\mathbb R^4.
\]

Then

\[
\Gamma_Yx=D^{-1}V^T(WR)z,
\]

where the entire seven-current geometry is compressed into

\[
\boxed{
R=VD^{-1}V^T=
\begin{pmatrix}
\frac32&-\frac56&-1&1\\
-\frac56&\frac32&1&-1\\
-1&1&\frac52&-\frac12\\
1&-1&-\frac12&\frac52
\end{pmatrix}.}
\]

Its leading principal minors are

\[
\frac32,\qquad
\frac{14}{9},\qquad
\frac{23}{9},\qquad
4,
\]

so \(R\) is positive definite. The nonzero generalized spectrum is equivalently the spectrum of the symmetric matrix

\[
W^{1/2}RW^{1/2}.
\]

This is the smallest exact block on which the remaining loop coefficients can act. Any claimed seven-by-seven result that fails this reduction or moves \(Y,B,L\) under Yukawa mixing has violated a Ward/selection rule.

## 2. Exact threshold stratification

For nonnegative channel weights, every subset of the four rows of \(V\) remains linearly independent. Therefore

\[
\boxed{\operatorname{rank}\Gamma_Y(s)
=\#\{a:w_a(s)>0\}.}
\]

The certificate verifies all sixteen open/closed channel masks. Each threshold that closes one independent Yukawa channel enlarges the instantaneous kernel by one. This turns the qualitative staircase into an exact rank-stratified statement.

Two examples are:

\[
w_a^{\rm unbroken}(s)
=\frac{s^2}{192\pi^3}
(3|y_u|^2,3|y_d|^2,|y_e|^2,|y_\nu|^2)_a,
\]

for the leading three-particle divergence cut, and

\[
w_a^{\rm broken}(s)\propto
n_am_a^2\sqrt{1-\frac{4m_a^2}{s}}\,
\Theta(s-4m_a^2)
\]

for the leading two-particle longitudinal channel. QCD invalidates the free-quark form near light-hadron thresholds, but not the algebraic rank rule once the physical channel weights are supplied.

## 3. The incidence/\(B-L\) plane is exactly not closed

Embed the two incidence candidates in the seven-current basis:

\[
\lambda_d=(5,5,1,1,1,0,0),
\qquad
\lambda_m=(5,5,1,1,3,0,0),
\]

and

\[
q=3(B-L)=(1,-1,-1,-3,3,3,0).
\]

Because \(Vq=0\), \(q\) is protected. Two-plane closure would require

\[
\Gamma_Y\lambda=\alpha\lambda+\beta q.
\]

For each incidence candidate, this is a homogeneous system of seven linear equations in

\[
(w_u,w_d,w_e,w_\nu,\alpha,\beta).
\]

The exact coefficient matrix has rank six. Hence its only solution is

\[
\boxed{w_u=w_d=w_e=w_\nu=\alpha=\beta=0.}
\]

This is stronger than saying that observed Yukawa hierarchies rotate incidence. For the declared metric and four-channel incidence map, **no nonzero Yukawa-weight assignment—even a tuned one with arbitrary signs—makes either incidence/\(B-L\) plane invariant.**

## 4. Generic minimal closure fills the six-dimensional external-source quotient

Repeatedly apply \(\Gamma_Y\) to incidence while retaining \(q\):

\[
\mathcal K_\lambda
=\operatorname{span}
\{q,\lambda,\Gamma_Y\lambda,\Gamma_Y^2\lambda,\ldots\}.
\]

At the exact positive checkpoint \(W=\operatorname{diag}(1,2,3,5)\), the certificate finds

\[
\dim\mathcal K_{\lambda_d}
=\dim\mathcal K_{\lambda_m}=6.
\]

The nonvanishing minor establishing rank six is a polynomial condition in the weights, so rank six holds on an open dense set of positive channel weights. Why is it six rather than five? Incidence has both a four-dimensional broken projection and a protected projection independent of \(B-L\). Repeated Yukawa action generates the four broken directions; the original vector retains that second protected component; and \(q\) supplies \(B-L\).

The certificate then adjoins hypercharge and obtains rank seven. Consequently hypercharge is not already hidden inside the cyclic subspace, and quotienting it leaves the cyclic image at rank six. That is the full external global-source quotient.

Therefore the exact leading answer is

\[
\boxed{
\text{incidence}+B-L
\xrightarrow{\text{generic Yukawa running}}
\text{the full six-dimensional external-source quotient},
}
\]

not a closed two-current system.

## 5. What “one loop” means here

Three related calculations must not be conflated:

1. **current-insertion renormalization:** one-loop Yukawa self-energy and vertex poles determine a minimal-subtraction representative of \(\Gamma_Y\);
2. **descendant norm:** the free contraction of two divergences is already \(O(y^2)\) and fixes the positive form \(V^TWV\);
3. **current-current nonlocal response at \(O(y^2)\):** computed directly, this contains two-loop sunset topologies even though it encodes the leading anomalous dimension.

The present result completes the common algebraic reduction of all three. It does not assign them one common overall coefficient or finite function.

## 6. Anomaly and equation-of-motion boundary

Perturbative Yukawa mixing has kernel \(\operatorname{span}\{Y,B,L\}\). Hypercharge is gauged and is removed in the external-source quotient. Electroweak anomalies distinguish \(B-L\) from \(B+L\), but enter the background Ward functional through gauge-topological operators; they are not an extra row of the Yukawa matrix \(V\).

Likewise, \(\partial_\nu B^{\nu\mu}\) and \(\partial^\mu(H^\dagger H)\) must be retained while renormalizing off-shell Green functions, then removed only under the declared EOM/gradient quotient. Their separated-point absorptive effects and their contact representatives must not be mixed.

## Classification

- **Established:** the \(3\oplus4\) split, the block \(R\), the threshold rank rule, and failure of both incidence/\(B-L\) planes to be Yukawa invariant.
- **Generic no-go:** a two-current RG truncation based on either incidence vector and \(B-L\); its generic cyclic completion is not merely three or five dimensional but the whole six-dimensional external-source quotient.
- **Indeterminate:** the numerical \(\overline{\mathrm{MS}}\) coefficient, finite threshold matching, and whether an operational projection can consistently observe only two combinations.
- **Keep alive:** the full seven-current response and its four-channel generalized spectrum.

## Reproduction

```powershell
node scripts\verify_frontier_parallel_qft_seven_current_reduction.mjs
```

