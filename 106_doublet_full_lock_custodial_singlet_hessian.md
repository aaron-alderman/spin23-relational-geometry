# Custodial Singlet Hessian in the Doublet–Full-Lock Theory

**Date:** 17 October 2026  
**Branches:** B05, B06 and B11  
**Claim status:** exact neutral Hessian block structure in the reduced custodial potential; the charged/CP-odd physical-triplet Hessian remains to be completed

## 1. Canonically normalized neutral directions

Around

\[
H^0=\frac{v+h}{\sqrt2},
\qquad
k\to t+\delta k,
\qquad
w\to t+\delta w,
\]

the bitriplet kinetic norm is

\[
2(\partial\delta k)^2+(\partial\delta w)^2.
\]

Define the normalized custodial singlet and neutral-fiveplet directions

\[
s=\frac{2\delta k+\delta w}{\sqrt3},
\]

\[
f=\sqrt{\frac23}(\delta k-\delta w).
\]

Equivalently,

\[
\delta k=\frac{s}{\sqrt3}+\frac{f}{\sqrt6},
\qquad
\delta w=\frac{s}{\sqrt3}-\frac{2f}{\sqrt6}.
\]

## 2. Neutral Hessian before rotation

For the reduced potential of the companion vacuum document, the nonzero entries in coordinates \((h,\delta k,\delta w)\) are

\[
H_{hh}=2\lambda_Hv^2
\]

after imposing the doublet stationarity equation,

\[
H_{hk}=2v(c_k+2d_kt+d_{wk}t),
\]

\[
H_{hw}=2v(c_w+2d_wt+d_{wk}t),
\]

\[
H_{kk}=-4m_b^2+2\kappa t+4\lambda_{ab}t^2
+48\lambda_bt^2+2v^2d_k,
\]

\[
H_{kw}=2\kappa t+8\lambda_{ab}t^2+v^2d_{wk},
\]

\[
H_{ww}=-2m_a^2+12\lambda_at^2
+4\lambda_{ab}t^2+2v^2d_w.
\]

## 3. Custodial block diagonalization

In the \((h,s,f)\) basis,

\[
M_{hs}=\frac{H_{hk}+H_{hw}}{\sqrt3},
\]

\[
M_{hf}=\frac{H_{hk}-2H_{hw}}{\sqrt6},
\]

\[
M_{ss}=\frac{H_{kk}+2H_{kw}+H_{ww}}3,
\]

\[
M_{ff}=\frac{H_{kk}-4H_{kw}+4H_{ww}}6,
\]

\[
M_{sf}=\frac{H_{kk}-H_{kw}-2H_{ww}}{\sqrt{18}}.
\]

At the custodial coefficient relations,

\[
\boxed{M_{hf}=M_{sf}=0.}
\]

Thus the neutral fiveplet does not mix with either custodial singlet. The neutral Hessian becomes

\[
\boxed{
M_0^2=
\begin{pmatrix}
M_{hh}&M_{hs}&0\\
M_{hs}&M_{ss}&0\\
0&0&M_{ff}
\end{pmatrix}.
}
\]

## 4. Two-singlet masses and mixing

The physical singlet eigenvalues are

\[
m_{1,2}^2
=\frac12\left[
M_{hh}+M_{ss}
\mp\sqrt{(M_{hh}-M_{ss})^2+4M_{hs}^2}
\right].
\]

The mixing angle can be defined by

\[
\tan2\alpha=\frac{2M_{hs}}{M_{hh}-M_{ss}}.
\]

One eigenstate can reproduce an observed Higgs-like scalar only if its doublet fraction yields the required fermion and gauge couplings. Neutrality and a suitable mass are insufficient.

## 5. Verified stable checkpoint

The executable checkpoint satisfies all vacuum and custodial relations and gives

\[
m_1^2\simeq289.17,
\qquad
m_2^2\simeq362.58,
\qquad
m_5^2\simeq79.05
\]

in its arbitrary internal units, with zero singlet–fiveplet mixing to numerical precision. These numbers are not phenomenological predictions; they certify that the aligned block structure admits locally stable examples.

## 6. Branch decision

**Positive:** the source theory fixes \(M_{hs}\), predicting a Higgs mixing angle or a relation between the two singlet masses and the fiveplet mass.

**Negative:** every entry of the singlet matrix remains independently adjustable through the six doublet–lock portals.

**Current result:** the complete neutral custodial block structure and singlet eigenvalue formulas are exact.

**Unsafe shortcut:** identify the lighter singlet with the observed Higgs without checking its doublet fraction and couplings.

## 7. Certificate

The [singlet-Hessian certificate](scripts/verify-doublet-lock-custodial-singlet-hessian.mjs) constructs the full reduced Hessian at a stationary custodial point, performs the kinetic-normalized rotation, verifies exact fiveplet decoupling and requires positive singlet and fiveplet curvatures.

## Companion documents

- [Neutral vacuum alignment](103_doublet_full_lock_neutral_vacuum_alignment.md)
- [Doublet-diluted rho and triplet mixing](104_doublet_lock_rho_and_goldstone_mixing.md)
- [Minimal doublet–full-lock portals](102_minimal_doublet_full_lock_portals.md)
- [Pure-bitriplet custodial Hessian](94_full_lock_custodial_hessian_and_charge_spectrum.md)

