# The Ward and UV Stabilizer Intersection Contains Only Contact Translations

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the relational-carrier/Jordan-triple branch  
**Claim status:** exact infinitesimal stabilizer intersection for positive fixed UV slope; physical contact policy remains open  
**Certificate:** [intersect_bl_ward_and_uv_stabilizers.mjs](../../../verification/intersect/intersect_bl_ward_and_uv_stabilizers.mjs)

## Executive result

The \(B-L\)-Ward-compatible algebra found in [document 657](657_bl_ward_normalization_reduces_the_generated_sp4_to_a_four_dimensional_solvable_subalgebra.md) has

\[
A=\begin{pmatrix}a&b\\0&0\end{pmatrix},
\qquad
B=\begin{pmatrix}u&v\\v&0\end{pmatrix},
\qquad
C=0.
\]

Fixing a positive ultraviolet slope

\[
M=\begin{pmatrix}m_{11}&m_{12}\\m_{12}&m_{22}\end{pmatrix}>0
\]

requires

\[
AM+MA^T=0.
\]

Within the Ward-compatible algebra this forces

\[
\boxed{a=b=0.}
\]

Only the two real contact translations \(B_{11}\) and \(B_{12}\) survive. If the subtraction scheme is also fixed, the continuous stabilizer is trivial.

## 1. Exact positive-matrix argument

The nonzero components of the fixed-slope equation are

\[
a m_{11}+b m_{12}=0,
\]

\[
a m_{12}+b m_{22}=0.
\]

Their coefficient determinant is

\[
m_{11}m_{22}-m_{12}^2=\det M>0.
\]

Therefore the unique solution is \(a=b=0\). This holds for every positive-definite \(M\), not only a generic numerical example.

The certificate uses

\[
M=\begin{pmatrix}3&1\\1&2\end{pmatrix}
\]

as an explicit witness.

## 2. Exact dimension ladder

\[
\begin{array}{c|c}
\text{constraints}&\text{continuous dimension}\\ \hline
\text{full generated }\mathfrak{sp}(4,\mathbb R)&10\\
\text{preserve }Z_{BB}\text{ globally}&4\\
\text{also fix full positive UV slope }M&2\\
\text{also fix contact scheme}&0\\
\text{preserve full }B-L\text{ response row}&1\\
\text{and fix contacts}&0
\end{array}
\]

The two-dimensional intersection consists entirely of

\[
\delta Z=
\begin{pmatrix}u&v\\v&0\end{pmatrix}.
\]

It changes only local real contact data.

## 3. Consequence for the physical symmetry claim

Three statements must remain distinct:

1. threshold responses generate the full Jordan carrier;
2. the carrier has canonical TKK algebra \(\mathfrak{sp}(4,\mathbb R)\);
3. one normalized theory has a continuous symmetry acting on its physical response.

The first two are established for the declared response model. The third is generically false once both Ward and UV data are fixed.

The full group can still act as:

- a domain automorphism;
- a duality between differently normalized theories;
- a transformation of UV and Ward data treated as moduli;
- a spectrum-generating algebra rather than an invariance algebra.

## 4. Contact ambiguity

The two surviving generators shift

\[
Z_{\Lambda\Lambda}
\quad\text{and}\quad
Z_{\Lambda B}.
\]

Whether these are physical depends on the renormalization prescription. If independent finite counterterms are permitted, they are scheme redundancies. If a common microscopic action fixes them, they may encode calibrated response data but cease to be symmetries.

Either way, they do not furnish a nontrivial spectral \(Spin(2,3)\) action inside one fixed theory.

## 5. Stop-everything criteria

Stop claiming a continuous within-theory \(Spin_0(2,3)\) symmetry when:

1. \(B-L\) normalization is fixed;
2. the full positive UV slope is fixed;
3. the subtraction scheme is fixed;
4. UV or Ward data are not allowed to transform as moduli;
5. only contact translations survive the stabilizer intersection.

## 6. Next gates

1. Repeat the classification after Majorana breaking removes continuous \(B-L\).
2. Decide whether the full group is better interpreted as spectrum generating or inter-theory duality.
3. Test whether any discrete remnant survives fixed UV and contact data.
4. Calculate the transformation of the Yukawa-breaking spurion if Ward data are promoted to moduli.

## Reproducibility

```powershell
node scripts\intersect_bl_ward_and_uv_stabilizers.mjs
```
