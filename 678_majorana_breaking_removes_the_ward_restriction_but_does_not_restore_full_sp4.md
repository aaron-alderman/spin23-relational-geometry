# Majorana Breaking Removes the Ward Restriction but Does Not Restore Full \(Sp(4)\)

**Date:** 17 October 2026  
**Branches:** B04, B05, B07, B08, B11 and the Majorana-broken response branch  
**Claim status:** exact fixed-UV stabilizer classification under a closed two-source assumption; actual low-energy source closure remains unresolved  
**Certificate:** [verify_post_bl_breaking_fixed_uv_stabilizer_is_rotation_semidirect_contacts.mjs](scripts/verify_post_bl_breaking_fixed_uv_stabilizer_is_rotation_semidirect_contacts.mjs)

## Executive result

When continuous \(B-L\) is broken to matter parity, the fixed-current Ward restriction of document 657 disappears. That does **not** restore the full ten-dimensional \(\mathfrak{sp}(4,\mathbb R)\) as a symmetry of one normalized response.

Whiten one fixed positive UV slope to

\[
M=I_2.
\]

Preserving its linear high-energy behavior forces

\[
C=0,
\qquad
A+A^T=0.
\]

Thus \(A\) spans only \(\mathfrak{so}(2)\), while the three symmetric \(B\) directions are contact translations:

\[
\boxed{
\mathfrak g_{\rm fixed\ UV}
=\mathfrak{so}(2)\ltimes Sym_2(\mathbb R)_{\rm contact}.
}
\]

If contacts are also fixed, only the one-dimensional compact source rotation remains. With two generic independently fixed UV slopes, even that rotation is lost.

## 1. Matter parity imposes no current-row constraint

After a charge-six Majorana order parameter breaks \(3(B-L)\), all matter fermions are odd under the residual \(\mathbb Z_2\). Bilinear vector sources are even.

Therefore matter parity does not distinguish the incidence and former \(B-L\) bilinears by a continuous Ward normalization. Algebraically, the protected-row condition can be removed.

This only removes one restriction. UV behavior, contacts, operator closure and the Majorana breaking sector remain.

## 2. Fixed-UV algebra

Choose the rotation generator

\[
R:
\quad
A_R=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}.
\]

Decompose contact translations into

\[
T_0\leftrightarrow I_2,
\qquad
T_1\leftrightarrow
\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
T_2\leftrightarrow
\begin{pmatrix}0&1\\1&0\end{pmatrix}.
\]

The only nonzero brackets are

\[
\boxed{
[R,T_1]=2T_2,
\qquad
[R,T_2]=-2T_1.
}
\]

The trace contact \(T_0\) is central. Hence

\[
\mathfrak g_{\rm fixed\ UV}
\cong
\mathbb RT_0\oplus\mathfrak e(2)
\]

after rescaling the rotation generator.

This four-dimensional algebra is different from the Ward-compatible dilation--Heisenberg algebra. Breaking \(B-L\) changes the type of the remnant rather than simply enlarging it monotonically.

## 3. Dimension ladder after breaking

Under the temporary assumption that the old two-source response remains closed:

\[
\begin{array}{c|c}
\text{data held fixed}&\text{continuous dimension}\\ \hline
\text{response domain only}&10\\
\text{one positive UV slope}&4\\
\text{one UV slope plus contacts}&1\\
\text{two generic UV slopes plus contacts}&0
\end{array}
\]

The one-dimensional remnant rotates the whitened source plane. It is not automatically physical because the incidence and broken-\(B-L\) operators generally have different masses, thresholds and couplings.

## 4. The closure problem remains decisive

Below the Majorana-breaking scale, the former \(B-L\) current satisfies a broken Ward identity involving:

- the Majorana order parameter;
- its phase or longitudinal mode;
- the radial mode;
- the Majorana mass operator;
- possible anomaly and contact terms.

The two-by-two response is therefore generally not closed. The four-dimensional classification above is the stabilizer of a *projected* two-source kernel, conditional on consistently integrating out or adjoining those modes.

The full low-energy carrier may be larger than \(H_2(\mathbb R)\).

## 5. Consequence for the twist branch

Majorana breaking reopens a compact source-rotation direction, but:

- it is killed by two generic UV tensors;
- it is not the full \(Sp(4)\);
- it is unrelated to non-Abelian Heisenberg curvature;
- it may disappear when the breaking sector is included;
- a one-dimensional rotation still requires a physical closed loop to produce holonomy.

Thus Majorana breaking is a legitimate reopened branch, not an automatic solution.

## 6. Stop-everything criteria

Stop claiming post-Majorana restoration of \(Sp(4,\mathbb R)\) if:

1. the UV slope remains fixed;
2. contacts and threshold data break source rotation;
3. the order-parameter and longitudinal sectors are omitted despite nonclosure;
4. residual \(\mathbb Z_2\) is treated as a continuous current;
5. the one-dimensional compact remnant is promoted to the full conformal group.

## 7. Next gates

1. Enlarge the response by the Majorana order-parameter operator and recompute the positive carrier.
2. Derive the broken Ward identity and its operator-mixing connection.
3. Test whether integrating out the radial mode induces a measurable contact phase.
4. Determine whether any compact source loop survives two physical UV tensors.
5. Compare the enlarged carrier's Jordan algebra with \(H_2(\mathbb R)\), a spin factor or a higher-rank system.

## Reproducibility

    node scripts\verify_post_bl_breaking_fixed_uv_stabilizer_is_rotation_semidirect_contacts.mjs
