# Electroweak Breaking and the Higgs Frame Select Two Crossed Octonion-Shaped Generation Modules

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08, B09, B10, B11, B12, B13, B14 and the electroweak octonion-regrouping branch  
**Claim status:** exact representation and finite-enumeration result; canonical algebra-product intertwiner remains open  
**Certificate:** [verify_higgs_channels_select_two_crossed_octonion_shaped_standard_model_modules.mjs](scripts/verify_higgs_channels_select_two_crossed_octonion_shaped_standard_model_modules.mjs)

## Executive result

Document 714 proved that the full generation has the color representation of two complexified octonions, but not in the physical left/right Dirac-face grouping. Electroweak data select a sharper regrouping.

Before electroweak symmetry breaking, there is no eight-complex-dimensional Standard-Model invariant submodule with color content

\[
\mathbf1\oplus\mathbf1\oplus\mathbf3\oplus\bar{\mathbf3}.
\]

After breaking to \(SU(3)_c\times U(1)_{\rm em}\), require:

1. octonion-shaped color content;
2. closure under charge conjugation;
3. homogeneity under the Higgs/Yukawa channel \(h\) or \(\widetilde h\).

The generation then splits uniquely into

\[
\boxed{
\mathcal O_{\rm up}
=\{\nu,\nu^c,u,u^c\}
\cong\mathbf1\oplus\mathbf1\oplus\mathbf3\oplus\bar{\mathbf3},
}
\]

and

\[
\boxed{
\mathcal O_{\rm down}
=\{e,e^c,d,d^c\}
\cong\mathbf1\oplus\mathbf1\oplus\mathbf3\oplus\bar{\mathbf3}.
}
\]

Each has complex dimension eight. These modules cross the Prakash–Ramya Dirac faces: each contains both left and conjugate-right fields.

## 1. No octonion-shaped submodule before breaking

With a right-handed neutrino, the unbroken Standard-Model irreducible multiplets are

\[
\begin{array}{c|c|c}
\text{multiplet}&SU(3)_c\times SU(2)_L&\dim_{\mathbb C}\\ \hline
Q_L&(\mathbf3,\mathbf2)&6\\
u^c&(\bar{\mathbf3},\mathbf1)&3\\
d^c&(\bar{\mathbf3},\mathbf1)&3\\
L_L&(\mathbf1,\mathbf2)&2\\
e^c&(\mathbf1,\mathbf1)&1\\
\nu^c&(\mathbf1,\mathbf1)&1
\end{array}
\]

An invariant submodule must be a sum of complete irreducible multiplets. An octonion-shaped color module requires two singlets, one triplet and one antitriplet.

The only source of a color triplet is the entire weak doublet \(Q_L\), which contributes two triplets and dimension six. Selecting only \(u_L\) or \(d_L\) violates \(SU(2)_L\).

The certificate enumerates every sum of the six irreducible multiplets and finds no eight-dimensional submodule with the required color multiplicities.

Therefore:

\[
\boxed{
\text{an individual }\mathbb O_{\mathbb C}\text{-shaped generation module is electroweak-broken data.}
}
\]

## 2. Sector choices after breaking

After choosing a nonzero Higgs frame,

\[
Q_L\to u\oplus d,
\qquad
L_L\to\nu\oplus e.
\]

The particle-type sectors are

\[
\nu,\nu^c,e,e^c,u,u^c,d,d^c.
\]

An octonion-shaped choice contains two singlet sectors, one triplet sector and one antitriplet sector. There are initially

\[
\binom42\cdot2\cdot2=24
\]

such choices.

## 3. Charge-conjugation closure

Require closure under

\[
Q\mapsto-Q,
\qquad
\mathbf3\leftrightarrow\bar{\mathbf3}.
\]

The colored choice must be \(\{u,u^c\}\) or \(\{d,d^c\}\). The singlet choice must be \(\{\nu,\nu^c\}\) or \(\{e,e^c\}\).

This leaves four modules and two possible complementary partitions:

\[
\begin{aligned}
&\{\nu,\nu^c,u,u^c\}
\oplus
\{e,e^c,d,d^c\},\\
&\{\nu,\nu^c,d,d^c\}
\oplus
\{e,e^c,u,u^c\}.
\end{aligned}
\]

Color and electromagnetism alone do not distinguish them.

## 4. Higgs-channel homogeneity

The Higgs frame separates the Yukawa channels

\[
\widetilde h:
\quad u^c\leftrightarrow u,
\quad\nu^c\leftrightarrow\nu,
\]

and

\[
h:
\quad d^c\leftrightarrow d,
\quad e^c\leftrightarrow e.
\]

The homogeneous modules are therefore precisely \(\mathcal O_{\rm up}\) and \(\mathcal O_{\rm down}\). The alternative partition mixes \(h\) and \(\widetilde h\) in each proposed octonion copy.

Thus the nonzero Higgs frame removes the remaining twofold ambiguity.

## 5. Furey representation match

Under the \(SU(3)\) stabilizer of an octonion imaginary unit,

\[
\mathbb O_{\mathbb C}
\cong
\mathbf1\oplus\mathbf1\oplus\mathbf3\oplus\bar{\mathbf3}.
\]

The selected modules have exactly this content:

\[
\begin{array}{c|c|c|c}
\text{module}&\mathbf1&\mathbf1&\mathbf3\oplus\bar{\mathbf3}\\ \hline
\mathcal O_{\rm up}&\nu&\nu^c&u\oplus u^c\\
\mathcal O_{\rm down}&e&e^c&d\oplus d^c
\end{array}
\]

This is the cleanest representation-level Furey/Prakash–Ramya bridge presently available. It does not yet prove that octonion multiplication or Furey ladder operators act correctly on these modules.

## 6. Two transverse decompositions

The Prakash–Ramya doubling is

\[
\begin{array}{c|c}
\text{conjugate-right face}&\nu^c,e^c,u^c,d^c\\
\text{left face}&\nu,e,u,d
\end{array}
\]

whereas the octonion-shaped decomposition is

\[
\begin{array}{c|c}
\widetilde h\text{ channel}&\nu,\nu^c,u,u^c\\
h\text{ channel}&e,e^c,d,d^c.
\end{array}
\]

They are transverse cuts of the same sixteen states:

\[
\boxed{
\text{chirality/Dirac face}
\times
\text{Higgs up/down channel}.
}
\]

## 7. Response architecture

This result does not authorize applying the Clifford multiplicity depolarizer to either physical matter module. Instead it supplies two natural sources for typed response copies:

\[
\mathcal O_{\rm up}
\longrightarrow
\mathbb O_{\mathbb C}^{\rm response,up},
\qquad
\mathcal O_{\rm down}
\longrightarrow
\mathbb O_{\mathbb C}^{\rm response,down}.
\]

Hermitian kernels may combine these response copies before the Clifford conditional expectation selects \(H_2(\mathbb R)\).

The Higgs frame therefore does more than repair weak covariance. It selects an octonionic polarization of the generation at the representation level.

## 8. Response-line alignment

The two Higgs channels may source different even/odd response vectors:

\[
r_{\rm up}=(r_{u,e},r_{u,o}),
\qquad
r_{\rm down}=(r_{d,e},r_{d,o}).
\]

A common projective Clifford response line requires

\[
\boxed{
\Delta_{\rm align}
=r_{u,e}r_{d,o}-r_{u,o}r_{d,e}
=0.
}
\]

If \(\Delta_{\rm align}\ne0\), no single \(H_2(\mathbb R)\) selector captures both sectors without further mixing. This becomes the next executable sewing target.

## 9. Higgs-zero boundary

At a Higgs zero, the distinction between \(h\) and \(\widetilde h\) channels loses its normalized frame. The octonion-shaped polarization is therefore undefined there.

This agrees with the frame defect of document 696. The defect may encode transition data between local octonionic polarizations, although the Standard Model vacuum manifold does not give a topologically protected string.

## 10. Stop-everything criteria

Stop claiming an octonion-shaped Standard-Model submodule before electroweak breaking; none exists as a sum of full gauge irreducibles.

Stop identifying the Higgs-selected modules with the Prakash–Ramya left/right faces; the partitions cross.

Stop promoting the representation match to an algebra isomorphism until the octonion product or Furey TRO action is constructed.

Stop a universal response line if \(\Delta_{\rm align}\ne0\) and no alignment mechanism exists.

## 11. Highest-value next calculations

1. Construct the two-by-two grid of Dirac face versus Higgs channel explicitly.
2. Compute allowed Hermitian gauge-invariant kernels from both selected modules into response copies.
3. Test \(\Delta_{\rm align}\) for Yukawa-polar and stress kernels.
4. Determine whether flavor CP generates an alignment obstruction or merely a common projective rotation.
5. Examine Higgs-zero patch transitions between octonionic polarizations.

## Companion documents

- [Prakash–Ramya color obstruction and two-octonion match](714_the_standard_model_color_module_is_two_complexified_octonion_copies_but_not_in_the_prakash_ramya_dirac_face_factorization.md)
- [Higgs/Yukawa dressed exchange](695_a_higgs_and_yukawa_polar_dressed_dirac_exchange_closes_the_pauli_algebra_without_erasing_ckm_cp.md)
- [Higgs frame defect](696_the_higgs_dressed_exchange_has_a_hopf_frame_defect_but_not_a_topologically_protected_standard_model_string.md)
- [Furey technical algebraic guide](03_furey_technical_algebraic_guide.md)
