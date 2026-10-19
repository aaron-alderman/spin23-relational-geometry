# Lane Expansion 16: Top-Yukawa Dominance Selects a Broken Mode, but Not the Incidence Direction

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, form-factor hierarchy  
**Claim status:** exact hierarchical positive-spurion result with declared metric; not the full one-loop anomalous-dimension matrix  
**Certificate:** [verify_programme_top_dominant_broken_current_mode.mjs](../../../verification/verify/verify_programme_top_dominant_broken_current_mode.mjs)

## Result

The six-dimensional source quotient is large, but the Yukawa hierarchy suggests a possible low-energy simplification. When the up-type/top channel dominates, the positive breaking form has one sharply separated broken mode.

That mode is not the programme's incidence direction. It is the metric dual of the top Yukawa incidence:

\[
r_t=D^{-1}v_t^T,
\qquad
v_t=(1,1,0,0,0,0,1),
\]

in the seven-current order

\[
(Q,u^c,d^c,L,e^c,N^c,H).
\]

Thus the most plausible emergent two-channel approximation from the observed hierarchy would be

\[
\operatorname{span}\{B-L,r_t\},
\]

not the declared incidence/(B-L) plane.

## 1. Positive broken-current form

With Yukawa incidence matrix (V_H), current metric (D) and positive channel weights

\[
W=\operatorname{diag}(w_t,w_b,w_\tau,w_\nu),
\]

define

\[
K=D^{-1}V_H^TWV_H.
\]

Its symmetric representative is

\[
S=D^{-1/2}V_H^TWV_HD^{-1/2}.
\]

The nonzero eigenvalues of (S) describe the positive broken directions. Its kernel contains all exact Yukawa symmetries.

The certificate declares

\[
D=\operatorname{diag}(6,3,3,2,1,1,2)
\]

and uses illustrative squared-Yukawa ratios

\[
(w_t,w_b,w_\tau,w_\nu)
=(1,6\times10^{-4},10^{-4},10^{-24}).
\]

These values encode the hierarchy rather than a precision running-coupling fit.

## 2. Hierarchical spectrum

In the strict top-only limit, (K) has rank one. Its broken coefficient ray is

\[
r_t=left(\frac16,\frac13,0,0,0,0,\frac12\right)
\]

for the declared metric.

Restoring the illustrative bottom and tau weights leaves the leading eigenvector with overlap greater than (0.999999) with the top-only ray. The leading eigenvalue is over a thousand times the next one in the certificate.

Therefore a separated broken direction is plausible in this positive spurion geometry.

## 3. Exact mismatch with incidence

Let

\[
q=3(B-L),
\qquad y=6Y,
\qquad \lambda_h=(5,5,1,1,1,0,h).
\]

For any (h) and any positive Higgs metric, (r_t) does not lie in

\[
\operatorname{span}\{q,y,\lambda_h\}.
\]

This can be seen without numerical diagonalization. The (N^c), (e^c) and (d^c) components of (r_t) vanish. Those three equations force the coefficients of (q,y,\lambda_h) all to vanish, which cannot reproduce the nonzero (Q,u^c,H) entries of (r_t).

Hence top dominance does not dynamically rescue incidence, even modulo hypercharge.

## 4. Physical interpretation

The dominant Yukawa interaction is a strong spring connecting (Q,u^c,H). When the other springs are much weaker, the stiffest broken motion is localized on those three coordinates. The original incidence vector assigns substantial weights to down quarks and leptons, so it is not aligned with that stiff mode.

This produces a plausible **scale-dependent effective plane**, but it is a different plane from the proposed one. It will also reorganize at the top threshold: once the top is integrated out, the dominant remaining broken direction changes.

The hierarchy therefore suggests a sequence of threshold-dependent frames, not a single universal incidence axis.

## 5. What the actual loop calculation must decide

The positive form is constrained by Yukawa incidence and Ward identities, but it is not a substitute for vertex and wavefunction diagrams. A true one-loop calculation could alter coefficients, introduce scheme-dependent representatives or exhibit cancellations.

It must answer:

1. whether the broken-current anomalous-dimension matrix factorizes through the same incidence space;
2. whether its dominant eigenvector remains close to (r_t);
3. whether that eigenvector is stable under allowed finite current redefinitions;
4. how matching across the top, Higgs and electroweak thresholds transports the frame;
5. whether any form-factor ratio observes the eigenvector without fitting it.

**Go:** the loop matrix has a scheme-stable separated broken eigenoperator and matching gives a reproducible threshold trajectory.

**No-go for original incidence:** the leading mode is (r_t)-like or otherwise remains outside incidence even after the full calculation.

**No-go for any effective two-plane:** several broken eigenvalues become comparable or threshold matching rotates the frame without an operational invariant.

## Reproducibility

```powershell
node scripts\verify_programme_top_dominant_broken_current_mode.mjs
```
