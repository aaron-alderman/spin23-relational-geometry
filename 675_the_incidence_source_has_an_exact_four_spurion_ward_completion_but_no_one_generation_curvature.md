# The Incidence Source Has an Exact Four-Spurion Ward Completion but No One-Generation Curvature

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the renormalized-source/spurion branch  
**Claim status:** exact classical charge-quotient and spurion theorem; quantum anomalous-dimension matrix remains open  
**Certificate:** [verify_incidence_spurion_ward_completion_and_breaking_quotient.mjs](scripts/verify_incidence_spurion_ward_completion_and_breaking_quotient.mjs)

## Executive result

The failure of incidence-current conservation has a canonical algebraic form. Define the Yukawa-violation map

\[
\mathcal V:\mathbb R^7\longrightarrow\mathbb R^4
\]

on charges of

\[
(Q,u^c,d^c,L,e^c,\nu^c,H)
\]

by

\[
\mathcal V(x)=
\begin{pmatrix}
x_Q+x_{u^c}+x_H\\
x_Q+x_{d^c}-x_H\\
x_L+x_{e^c}-x_H\\
x_L+x_{\nu^c}+x_H
\end{pmatrix}.
\]

This map has rank four and a three-dimensional conserved kernel. Therefore it induces an isomorphism

\[
\boxed{
\mathbb R^7/\ker\mathcal V
\cong\mathbb R^4.
}
\]

The incidence source defines the exact quotient class

\[
\boxed{
[\lambda]\longmapsto(10,6,2,1).
}
\]

Adding hypercharge, \(B-L\), or any other conserved charge cannot change this class.

The broken current does, however, possess an exact spurionic Ward completion: assign the four Yukawa spurions charges

\[
\boxed{
q(y_u,y_d,y_e,y_\nu)=(-10,-6,-2,-1).
}
\]

Every Yukawa term is then invariant in the extended source--spurion system.

## 1. The conserved kernel

The violation matrix is

\[
\mathcal V=
\begin{pmatrix}
1&1&0&0&0&0&1\\
1&0&1&0&0&0&-1\\
0&0&0&1&1&0&-1\\
0&0&0&1&0&1&1
\end{pmatrix}.
\]

It has rank four. One kernel basis is

\[
\begin{aligned}
k_1&=(1,-1,-1,0,0,0,0),\\
k_2&=(0,0,0,1,-1,-1,0),\\
k_3&=(0,-1,1,0,1,-1,1).
\end{aligned}
\]

Hypercharge and \(B-L\) are particular linear combinations in this kernel. The quotient removes every ambiguity caused by adding conserved currents.

Consequently, \((10,6,2,1)\) is not merely one inconvenient choice of source basis. It is the invariant breaking class of the incidence direction.

## 2. Spurionic Ward identity

Let \(A_\Lambda^\mu\) be a background source for the incidence insertion and allow the Yukawa coefficients to transform as external spurions. Under a local incidence phase \(\alpha(x)\),

\[
\delta y_f=-i\,v_f\alpha\,y_f,
\qquad
v=(10,6,2,1).
\]

The extended generating functional obeys the schematic local identity

\[
\boxed{
\partial_\mu\frac{\delta W}{\delta A_{\Lambda\mu}}
=i\sum_f v_f
\left(
y_f\frac{\delta W}{\delta y_f}
-y_f^*\frac{\delta W}{\delta y_f^*}
\right),
}
\]

up to anomaly, equation-of-motion and convention-dependent contact terms.

Freezing the spurions to fixed observed Yukawa matrices breaks the extended symmetry and returns the nonconserved incidence insertion.

## 3. Why four breaking components matter

The earlier one-Higgs-phase repair failed because it supplied only the sign pattern

\[
(c,-c,-c,c).
\]

The spurion completion instead gives each Yukawa structure its required compensating charge. Since

\[
-10,\;-6,\;-2,\;-1
\]

are distinct, four independently transforming linear spurion components are required if every Yukawa coefficient appears once and renormalizably.

One could imitate these charges with powers of one formal spurion, but that changes operator dimensions and does not identify the four observed Yukawa couplings.

## 4. The canonical breaking operator

At fixed spurion values, the classical divergence is the Hermitian breaking insertion

\[
\mathcal B_\Lambda
=
10y_u\mathcal O_u
+6y_d\mathcal O_d
+2y_e\mathcal O_e
+y_\nu\mathcal O_\nu
+\text{h.c.}
\]

The smallest tree-level Ward-closed description is therefore not the two-current pair alone. It is

\[
\boxed{
(J_\Lambda^\mu,\;J_{B-L}^\mu;\;
\mathcal O_u,\mathcal O_d,\mathcal O_e,\mathcal O_\nu).
}
\]

Quantum renormalization can mix these operators with equation-of-motion, total-derivative and other gauge-singlet operators. The exact quantum closure has not been computed.

## 5. Cross-branch consequence for curvature

The four Yukawa spurions provide a natural multidimensional parameter base, apparently satisfying the dimensional requirement found in document 673.

But in one generation their phase generators are diagonal and commute. Therefore

\[
[\theta_i,\theta_j]=0
\]

and the non-Abelian graph-curvature mechanism gives

\[
\boxed{
\mathcal F_{ij}=0
\quad\text{for the pure one-generation spurion-phase family}.
}
\]

Multiple parameters are necessary but not sufficient. Nonzero curvature requires noncommuting matrix-valued Yukawa directions, which first become available with genuine flavor mixing.

This revisits and tightens the curvature branch: the four-component breaking vector opens parameter space but does not itself generate the proposed twist.

## 6. Implication for the Jordan carrier

The incidence/\(B-L\) two-face kernel may still be used at one fixed scale. Across scale, the correct object is a bundle whose source frame is transported together with the spurion/operator basis.

The Jordan triple remains algebraically defined fiber by fiber. A covariant derivative should act on it by the induced source-frame connection. Whether that connection preserves the triple, has mixed flavor curvature, or reduces to the Ward-compatible solvable algebra is a quantum operator-mixing question.

## 7. Stop-everything criteria

Stop calling the spurion completion a conserved physical current if:

1. the Yukawa spurions are frozen;
2. their compensating transformation is not included;
3. anomalies or regulator terms violate the extended Ward identity;
4. quantum operator mixing is omitted in a multi-scale comparison;
5. commuting one-generation spurion phases are claimed to generate non-Abelian curvature.

## 8. Next gates

1. Compute the anomalous-dimension matrix for the Ward-closed operator set in a simplified Yukawa theory.
2. Replace scalar spurions by three-generation Yukawa matrices.
3. Evaluate curvature from noncommuting variations of \(Y_uY_u^\dagger\) and \(Y_dY_d^\dagger\).
4. Determine whether the induced source connection lies in the four-dimensional Ward-compatible algebra of document 657.
5. Add anomaly and Majorana-breaking terms to the local Ward identity.

## Reproducibility

    node scripts\verify_incidence_spurion_ward_completion_and_breaking_quotient.mjs
