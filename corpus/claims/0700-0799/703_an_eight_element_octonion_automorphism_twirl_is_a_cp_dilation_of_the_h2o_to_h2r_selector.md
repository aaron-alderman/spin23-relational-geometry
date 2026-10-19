# An Eight-Element Octonion-Automorphism Twirl Is a CP Dilation of the \(H_2(\mathbb O)\to H_2(\mathbb R)\) Selector

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B10, B11, B14 and the exceptional-selector branch  
**Claim status:** exact finite Jordan-positive selector and associative completely positive dilation; microscopic action selecting this twirl remains open  
**Certificate:** [verify_finite_g2_subgroup_twirl_is_cp_h2o_to_h2r_selector.mjs](../../../verification/verify/verify_finite_g2_subgroup_twirl_is_cp_h2o_to_h2r_selector.mjs)

## Executive result

The \(G_2\)-fixed real slice of \(H_2(\mathbb O)\) has an explicit finite selector and an ordinary completely positive matrix dilation.

Grade the seven imaginary Fano basis units by the nonzero vectors of \(\mathbb F_2^3\). Every character

\[
\chi_a(v)=(-1)^{a\cdot v},
\qquad a\in\mathbb F_2^3,
\]

defines the sign map

\[
g_a(e_v)=\chi_a(v)e_v,
\qquad g_a(1)=1.
\]

Because

\[
\chi_a(v+w)=\chi_a(v)\chi_a(w),
\]

each \(g_a\) is an octonion automorphism. The eight maps form a subgroup

\[
G_{\rm sign}\cong(\mathbb Z_2)^3\subset G_2.
\]

Their average is exactly

\[
\boxed{
\frac18\sum_{g\in G_{\rm sign}}g(z)
=\operatorname{Re}z.
}
\]

Therefore the entrywise Jordan map

\[
\mathcal E_{\mathbb O}
\begin{pmatrix}
a&z\\\bar z&b
\end{pmatrix}
=
\begin{pmatrix}
a&\operatorname{Re}z\\
\operatorname{Re}z&b
\end{pmatrix}
\]

is a positive, unital, trace-preserving idempotent retraction

\[
H_2(\mathbb O)\to H_2(\mathbb R).
\]

In the left-regular real-matrix representation, the same finite average is a random-orthogonal channel and hence completely positive, trace preserving and unital.

This supplies the explicit CP realization left open by document 702.

## 1. The finite automorphism group

Label the imaginary units by

\[
1\leftrightarrow001,
\quad2\leftrightarrow010,
\quad\ldots,
\quad7\leftrightarrow111.
\]

Every Fano line has the form

\[
u+v=w
\]

in \(\mathbb F_2^3\). If

\[
e_ue_v=\pm e_w,
\]

then

\[
g_a(e_u)g_a(e_v)
=\chi_a(u)\chi_a(v)(\pm e_w)
=\chi_a(w)(\pm e_w)
=g_a(e_ue_v).
\]

Thus the character signs preserve every basis product and extend linearly to genuine algebra automorphisms.

The certificate checks all \(8\times8\) basis products for all eight maps rather than assuming this argument informally.

## 2. Exact real-part Reynolds operator

For every nonzero \(v\in\mathbb F_2^3\), half the characters have \(\chi_a(v)=+1\) and half have \(-1\). Hence

\[
\frac18\sum_a\chi_a(v)=0.
\]

The scalar component is fixed by every automorphism. Therefore the finite Reynolds operator has fixed space exactly

\[
\mathbb R1\subset\mathbb O.
\]

It produces the same fixed subspace as Haar averaging over full \(G_2\), although the finite subgroup depends on a chosen Fano grading and is not itself a canonical replacement for the full compact group.

## 3. Positivity on the rank-two Jordan cone

An element

\[
A=
\begin{pmatrix}
a&z\\\bar z&b
\end{pmatrix}
\]

is positive in the rank-two Euclidean Jordan cone only if

\[
a\ge0,
\qquad b\ge0,
\qquad ab\ge|z|^2.
\]

Since

\[
|\operatorname{Re}z|^2\le|z|^2,
\]

one also has

\[
ab\ge|\operatorname{Re}z|^2.
\]

Thus \(\mathcal E_{\mathbb O}(A)\) is positive in \(H_2(\mathbb R)\). Positivity also follows because the map is an average of Jordan automorphisms.

## 4. Associative left-regular dilation

Let

\[
L_z:\mathbb O\to\mathbb O,
\qquad L_z(q)=zq,
\]

be represented by an eight-by-eight real matrix. For an automorphism \(g\) with orthogonal matrix \(R_g\),

\[
R_gL_zR_g^T=L_{g(z)}.
\]

Therefore

\[
\frac18\sum_gR_gL_zR_g^T
=L_{\operatorname{Re}z}
=(\operatorname{Re}z)I_8.
\]

The matrices

\[
K_g=\frac1{\sqrt8}R_g
\]

satisfy

\[
\sum_gK_g^TK_g=I_8.
\]

Consequently

\[
\Phi(X)=\sum_gK_gXK_g^T
\]

is an ordinary CP, trace-preserving, unital channel on the complexification of the real matrix algebra.

## 5. Rank-two block encoding

Encode the octonionic Hermitian matrix as

\[
\iota(A)=
\begin{pmatrix}
aI_8&L_z\\
L_z^T&bI_8
\end{pmatrix}.
\]

Let

\[
U_g=\operatorname{diag}(R_g,R_g).
\]

Then

\[
\frac18\sum_gU_g\iota(A)U_g^T
=
\begin{pmatrix}
aI_8&(\operatorname{Re}z)I_8\\
(\operatorname{Re}z)I_8&bI_8
\end{pmatrix}.
\]

This is eight identical copies of the selected \(H_2(\mathbb R)\) matrix.

Complete positivity is therefore obtained without defining a problematic “octonionic tensor product.” It lives in the associative left-regular dilation.

## 6. Essential range boundary

On the full sixteen-by-sixteen matrix algebra, the fixed algebra of the sign twirl is larger than the embedded \(H_2(\mathbb R)\) image. Exact selection uses the special left-regular Jordan encoding.

This repeats a pattern seen in the conjugate-topology dilation:

- the random-unitary channel is fully CP on the ambient associative algebra;
- the desired small Jordan range appears only on a structurally constrained encoded sector.

The physical action must explain why observables occupy that sector.

## 7. Relation to Furey matter

The selector kills every imaginary octonion direction. Applied directly to Furey's internal matter algebra, it would destroy the selected complex unit and the color structure stabilized by \(SU(3)\).

Therefore it can act only on:

- a separate external response factor;
- a source/observable copy of the octonionic carrier;
- or a doubled representation in which the internal complex structure survives in the multiplicity factor.

This is not a minor implementation choice. It is the core factorization requirement exposed by the exceptional branch.

## 8. Commutation with topology exchange

If the Furey/topology exchange acts on a separate two-face factor while \(G_{\rm sign}\) acts on the octonionic response entry, the two group actions commute and their twirls compose without Trotter error.

If both act on the same octonionic coefficients, commutation must be checked from the actual Furey conjugation matrices. The present certificate does not assume it.

## 9. Stop-everything and falsification criteria

Stop a synthesis if:

1. it calls a Jordan-positive map “completely positive” without an associative dilation;
2. it applies the real-part twirl directly to the Furey matter factor and still claims to retain its complex/color algebra;
3. it assumes the full matrix fixed algebra equals the encoded \(H_2(\mathbb R)\) range;
4. it treats the chosen finite Fano subgroup as uniquely canonical;
5. it introduces an octonionic tensor product to define CP without resolving nonassociativity.

A stop-everything positive result would derive the left-regular encoded sector and the finite/full \(G_2\) twirl from the same action that produces the Furey matter factor while keeping all observed complex phases.

## 10. Next gates

1. Compute the full fixed algebra of the eight-element twirl and identify all unwanted ambient sectors.
2. Test the actual Furey exchange/conjugation matrices for commutation with the finite selector.
3. Build the factorized response–matter action and classify mixed counterterms.
4. Compare the finite selector with Haar \(G_2\) averaging and determine which is dynamically natural.
5. Insert the selector into the exceptional cubic defect and compute finite-time norm evolution.

## Reproducibility

    node scripts\verify_finite_g2_subgroup_twirl_is_cp_h2o_to_h2r_selector.mjs

## Companion documents

- [Exceptional cubic polarization and the \(G_2\)-fixed real slice](702_the_exceptional_jordan_cubic_polarizes_to_h2o_and_reaches_spin23_only_on_the_g2_fixed_real_slice.md)
- [Combined CP Peirce/topology selector](../0600-0699/688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
- [Furey technical algebraic guide](../0000-0099/03_furey_technical_algebraic_guide.md)
