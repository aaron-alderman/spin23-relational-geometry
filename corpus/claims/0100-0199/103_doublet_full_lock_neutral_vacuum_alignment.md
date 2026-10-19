# Neutral Vacuum Equations for the Higgs Doublet and Full Lock

**Date:** 17 October 2026  
**Branches:** B01, B05 and B11  
**Claim status:** exact reduced neutral potential and alignment equation; coefficients are convention-dependent combinations of the complete gauge-invariant portal basis

## 1. Neutral variables

Let

\[
v=\text{doublet vacuum},
\qquad
w=\text{real-triplet vacuum},
\qquad
k=\text{complex-triplet vacuum}.
\]

Along the aligned-orientation ansatz, write the most general reduced neutral potential as

\[
\begin{aligned}
V={}&-\frac12m_H^2v^2+\frac14\lambda_Hv^4
-m_a^2w^2-2m_b^2k^2+\kappa wk^2\\
&+\lambda_aw^4+2\lambda_{ab}w^2k^2+4\lambda_bk^4\\
&+v^2\left(
c_ww+c_kk+d_ww^2+d_kk^2+d_{wk}wk
\right).
\end{aligned}
\]

The coefficients \(c_w,c_k\) are normalization-dependent combinations of the two cubic gauge portals. The \(d\)-coefficients are combinations of the four quartic portals. This reduced form does not discard a neutral vacuum contribution from any portal in the complete basis.

## 2. Stationarity equations

For nonzero \(v\),

\[
0=-m_H^2+\lambda_Hv^2
+2(c_ww+c_kk+d_ww^2+d_kk^2+d_{wk}wk).
\]

The real-triplet equation is

\[
\begin{aligned}
0={}&-2m_a^2w+\kappa k^2+4\lambda_aw^3
+4\lambda_{ab}wk^2\\
&+v^2(c_w+2d_ww+d_{wk}k),
\end{aligned}
\]

and the complex-triplet equation is

\[
\begin{aligned}
0={}&-4m_b^2k+2\kappa wk+4\lambda_{ab}w^2k
+16\lambda_bk^3\\
&+v^2(c_k+2d_kk+d_{wk}w).
\end{aligned}
\]

The factors of two reflect the two real columns contained in the complex triplet.

## 3. Exact custodial-alignment condition

At \(w=k=t\), compare the derivative per triplet column:

\[
\mathcal A
=\frac12\frac{\partial V}{\partial k}
-\frac{\partial V}{\partial w}.
\]

The result is

\[
\boxed{
\begin{aligned}
\mathcal A={}&2(m_a^2-m_b^2)t
+(8\lambda_b-4\lambda_a-2\lambda_{ab})t^3\\
&+v^2\left(\frac{c_k}{2}-c_w\right)
+v^2t\left(d_k-2d_w-\frac{d_{wk}}2\right).
\end{aligned}
}
\]

Custodial alignment requires \(\mathcal A=0\).

The determinant cubic \(\kappa wk^2\) cancels exactly. It is compatible with the full connected right rotation and is not by itself a source of trace/traceless misalignment.

## 4. Sufficient custodial relations

The pure-lock relations are

\[
m_a^2=m_b^2,
\]

\[
\lambda_a=\lambda_1+\lambda_2,
\qquad
\lambda_{ab}=2\lambda_1,
\qquad
\lambda_b=\lambda_1+\frac12\lambda_2.
\]

In the reduced neutral portal normalization, the corresponding portal relations are

\[
\boxed{c_k=2c_w,}
\]

and

\[
\boxed{d_k=2d_w+\frac12d_{wk}.}
\]

Together these make \(\mathcal A\) vanish identically. A tuned cancellation can also give \(\mathcal A=0\) without each relation holding, but it is not symmetry-protected.

## 5. Meaning

The doublet can induce both triplet vacua, but it does not automatically align them. Equal real and complex triplet values require correlated cubic sources, quartic portals and pure-lock parameters.

This isolates the precise burden on the Jordan/Furey source: it must explain coefficient relations, not merely provide fields with the right dimensions.

## 6. Stop-everything and falsification tests

**Positive:** the algebraic source produces \(c_k=2c_w\) and the quartic relation as consequences of one invariant, with stable running.

**Negative:** alignment is maintained only by cancellations among independent native coefficients at every scale.

**Current result:** the complete neutral alignment equation is exact, and the determinant cubic is exonerated as a direct misalignment source.

**Unsafe shortcut:** assume that adding a doublet automatically induces equal real- and complex-triplet vacua.

## 7. Certificate

The [neutral-alignment certificate](../../../verification/verify/verify-doublet-lock-neutral-alignment.mjs) evaluates the exact derivative difference, verifies cancellation of the determinant cubic, checks the custodial coefficient relations and exhibits a controlled breaking checkpoint.

## Companion documents

- [Minimal doublet–full-lock portals](102_minimal_doublet_full_lock_portals.md)
- [Doublet-diluted rho and Goldstone mixing](104_doublet_lock_rho_and_goldstone_mixing.md)
- [General Jordan-native full-lock potential](../0000-0099/89_jordan_native_full_lock_potential.md)
- [Custodial alignment and rho sensitivity](../0000-0099/92_custodial_alignment_rho_sensitivity.md)

