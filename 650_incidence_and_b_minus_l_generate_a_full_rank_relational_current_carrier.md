# Incidence and \(B-L\) Generate a Full-Rank Relational Current Carrier

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the relational-carrier branch  
**Claim status:** exact sixteen-state weighted-Gram theorem and free ultraviolet current coefficient; interacting protection and topology identification remain open  
**Certificate:** [derive_incidence_bl_mixed_current_gram.mjs](scripts/derive_incidence_bl_mixed_current_gram.mjs)

## Executive result

The incidence Laplacian and anomaly-free \(B-L\) charge define two real sector vectors on the sixteen-state module:

\[
\lambda=(5,5,1,1,1,0),
\]

\[
q=3(B-L)=(1,-1,-1,-3,3,3).
\]

Give both the same Lorentz-vector typing,

\[
J_\lambda^\mu
=\sum_r\lambda_r\psi_r^\dagger\bar\sigma^\mu\psi_r,
\qquad
J_{B-L}^\mu
=\sum_rq_r\psi_r^\dagger\bar\sigma^\mu\psi_r.
\]

Their free ultraviolet coefficient matrix, using the multiplicity inner product, is

\[
\boxed{
G_{\lambda,B-L}
=\begin{pmatrix}
231&9\\
9&48
\end{pmatrix},
\qquad
\det G=11007>0.
}
\]

This is a canonical full-rank positive \(H_2(\mathbb R)\) Gram carrier whose two indices label **source type**—incidence versus conserved charge—rather than Furey topology or chirality.

It is the first exact realization in the current chain of the proposed “relational carrier” language using two independently derived Standard-Model operators.

## 1. Weighted source Gram

For sector dimensions

\[
d=(6,3,3,2,1,1),
\]

define

\[
\langle a,b\rangle_d=\sum_rd_ra_rb_r.
\]

The two-current ultraviolet coefficient matrix is

\[
G=
\begin{pmatrix}
\langle\lambda,\lambda\rangle_d&
\langle\lambda,q\rangle_d\\
\langle\lambda,q\rangle_d&
\langle q,q\rangle_d
\end{pmatrix}.
\]

The exact entries are

\[
\langle\lambda,\lambda\rangle_d=231,
\qquad
\langle\lambda,q\rangle_d=9,
\qquad
\langle q,q\rangle_d=48.
\]

The mixed entry retains charge signs. This is the channel anticipated—but not realized—by the diagonal \(B-L\) autocorrelator audit in [document 648](648_b_minus_l_aggregates_face_kernels_but_cannot_create_the_missing_face_rank.md).

## 2. Why full rank is kernel robust

The result does not depend on the nonzero incidence eigenvalue ratios. Let \(\lambda\ne0\) be any incidence weighting satisfying

\[
\lambda_{\nu^c}=0.
\]

Because

\[
q_{\nu^c}=3,
\]

the vectors \(\lambda\) and \(q\) cannot be proportional. Strict Cauchy–Schwarz in the positive multiplicity inner product gives

\[
\det G
=\|\lambda\|_d^2\|q\|_d^2
-\langle\lambda,q\rangle_d^2>0.
\]

The multiplicity-preserving incidence normalization

\[
\lambda'=(5,5,1,1,3,0)
\]

gives

\[
G'=
\begin{pmatrix}239&15\\15&48\end{pmatrix},
\qquad
\det G'=11247>0.
\]

Thus normalization changes the metric point but not interiority.

## 3. Why this is genuinely relational

Neither operator alone supplies the two-dimensional source space:

- incidence gives an internal positive classifier with sterile kernel;
- \(B-L\) gives the unique new anomaly-free current direction modulo hypercharge.

Their joint covariance records three relationships:

\[
\text{incidence self-response},
\qquad
\text{charge self-response},
\qquad
\text{mixed incidence/charge response}.
\]

This realizes the pattern

\[
\text{two carriers}+\text{their relationship}
\longrightarrow
H_2(\mathbb R)_+.
\]

The determinant measures their failure to collapse onto one source direction.

## 4. Physical limitations

The two sources do not have equal dynamical status:

- \(J_{B-L}^\mu\) is conserved and anomaly free before Majorana breaking;
- \(J_\lambda^\mu\) is a legitimate gauge-singlet vector insertion but is not conserved by the full Yukawa interaction network;
- the displayed coefficients are free ultraviolet values;
- operator mixing and normalization affect finite-scale entries;
- Majorana mass breaks continuous \(B-L\).

Therefore this is not yet a protected all-scale current algebra.

## 5. Typing boundary

The Gram index is

\[
(\lambda,B-L),
\]

not

\[
(A,B)_{\rm Furey\ topology}
\quad\text{or}\quad
(L,R)_{\rm chirality}.
\]

Abstract isomorphism to the same Jordan cone does not identify these indices. Any synthesis must keep the new carrier as a distinct factor until an action-level map is derived.

## 6. Stop-everything criteria

Stop treating this Gram matrix as a physical protected carrier if:

1. \(J_\lambda\) mixes uncontrollably under renormalization;
2. its normalization is basis dependent with no intrinsic frame-operator definition;
3. Majorana breaking removes the relevant \(B-L\) regime;
4. the two currents have no common operational source or spectral variable;
5. the source-type index is silently relabelled as Furey topology.

## 7. Next gates

1. Compute one-loop or symmetry-based operator mixing of \(J_\lambda\).
2. Replace the coordinate incidence weights by the intrinsic frame operator if that construction succeeds.
3. Evaluate the mixed spectral density beyond the free ultraviolet limit.
4. Search for a Jordan-triple action on the two-source Gram that closes without identifying it with topology or chirality.
5. Test whether the normalized Gram has a natural relation to the joint spectral algebra generated by \((\Lambda,3(B-L))\).

## Reproducibility

```powershell
node scripts\derive_incidence_bl_mixed_current_gram.mjs
```
