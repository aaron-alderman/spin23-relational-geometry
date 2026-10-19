# Dirac Misalignment Lifts the Selected Texture Zero Linearly Only Toward the Complementary Majorana Null Line

**Date:** 18 October 2026  
**Branches:** B-RANK-ONE-Q-SEESAW-SELECTED-TEXTURE-ZERO and B-SELECTED-FLAVOUR-TEXTURE-ZERO-NUFIT-SPLIT  
**Claim status:** exact perturbative matrix theorem; microscopic size and orientation of the misalignment remain open  
**Certificate:** [prove_Dirac_misalignment_lifts_texture_zero_along_null_line.mjs](scripts/prove_Dirac_misalignment_lifts_texture_zero_along_null_line.mjs)

## Executive result

The exact texture zero from [1111](1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md) is lifted by Dirac-sector misalignment in a geometrically selective way.

In the Takagi-adapted (P\oplus Q) basis, write

\[
M_R^{-1}=
\begin{pmatrix}
0&c^T\\
c&H
\end{pmatrix}
\]

and let the selected row of the Dirac matrix be

\[
v^T=(d_P,\varepsilon r^T).
\]

Then the selected light-neutrino entry is exactly

\[
\boxed{
(m_\nu)_{PP}
=-2\varepsilon d_Pc^Tr
-\varepsilon^2r^THr.
}
\]

For the rank-one complementary heavy block, (c) points along its null line. Therefore:

- leakage toward the null line lifts the zero at first order;
- leakage along the nonzero image direction has no linear term and begins at second order.

The dangerous misalignment direction is not arbitrary. It is the same direction that the charged cross-face must reach to restore full heavy rank.

## 1. Canonical inverse geometry

Use the heavy matrix

\[
M_R=
\begin{pmatrix}
a&x&y\\
x&d&0\\
y&0&0
\end{pmatrix},
\qquad dy\ne0.
\]

Its inverse is

\[
M_R^{-1}=
\begin{pmatrix}
0&0&1/y\\
0&1/d&-x/(dy)\\
1/y&-x/(dy)&(x^2-ad)/(dy^2)
\end{pmatrix}.
\]

Thus

\[
c^T=(0,1/y).
\]

The first complementary coordinate is the image of

\[
QM_RQ=
\begin{pmatrix}d&0\\0&0\end{pmatrix},
\]

and the second is its kernel. Hence (c) is supported precisely on

\[
\ker(QM_RQ).
\]

## 2. Exact expansion

The selected seesaw entry depends only on the selected Dirac row:

\[
(m_\nu)_{PP}=-v^TM_R^{-1}v.
\]

Substitution gives

\[
(m_\nu)_{PP}
=-
\begin{pmatrix}d_P&\varepsilon r^T\end{pmatrix}
\begin{pmatrix}0&c^T\\c&H\end{pmatrix}
\begin{pmatrix}d_P\\\varepsilon r\end{pmatrix},
\]

and therefore

\[
(m_\nu)_{PP}
=-2\varepsilon d_Pc^Tr
-\varepsilon^2r^THr.
\]

This is an exact polynomial for a linearly deformed selected row, not merely an asymptotic statement.

## 3. Two inequivalent leakage directions

Decompose

\[
r=r_{\rm im}+r_{\rm ker}
\]

with respect to the image and kernel lines of (QM_RQ).

### 3.1 Image-direction leakage

If

\[
r\in\operatorname{im}(QM_RQ),
\]

then

\[
c^Tr=0
\]

and

\[
(m_\nu)_{PP}=-\varepsilon^2r^THr.
\]

The texture zero is first-order protected.

### 3.2 Null-direction leakage

If (r) has a nonzero component along

\[
\ker(QM_RQ),
\]

then

\[
(m_\nu)_{PP}
=-\frac{2\varepsilon d_P}{y}r_{\rm ker}
+O(\varepsilon^2).
\]

The zero is lifted linearly.

## 4. Structural interpretation

Document 1111 showed

\[
\det M_R=-dy^2.
\]

The coefficient (y) is the charged cross-face coupling from the selected direction into the complementary null line. It performs two roles:

1. (y\ne0) restores the third heavy eigenvalue;
2. (1/y) appears in the inverse cross block and controls first-order sensitivity to null-line Dirac leakage.

This creates a precise tension:

\[
\boxed{
\text{the direction required for full heavy rank is also the direction most dangerous to the low-energy zero}.
}
\]

That is a useful microscopic target. A successful finite geometry must permit the charged Majorana sewing while suppressing or grading the corresponding Dirac leakage.

## 5. Relation to the proposed Jordan face

The population-normal Jordan selector removed the neutral population-difference direction in scalar-copy space. The present theorem acts in family/Yukawa space and must not be conflated with that projection.

Nevertheless, the structures communicate:

- the Jordan quartic gate makes the complementary Majorana block rank one;
- rank one defines an image line and a null line;
- the charged relation couples the selected face to the null line;
- the Dirac sector must respect this flag to protect the light texture zero.

The appropriate next algebraic question is whether the finite spectral triple supplies a grading under which the Majorana charged edge is allowed but the analogous Dirac null-line edge is absent.

## 6. Naturalness and approximate prediction

If the null-line leakage is generated at order (arepsilon), then

\[
|m_{\beta\beta}|
\simeq
2|\varepsilon d_Pc^Tr|
\]

for the electron-selected branch. A measured small nonzero value could therefore quantify the symmetry-breaking spurion, provided competing neutrinoless-double-beta mechanisms are controlled.

If the microscopic selection removes the null component but allows image-direction leakage, then

\[
|m_{\beta\beta}|=O(\varepsilon^2),
\]

which is a stronger technical-naturalness statement than generic approximate alignment.

## 7. Stop-everything criteria

**Positive trigger:** the represented finite Dirac operator forbids (r_{\rm ker}) while the Majorana sector retains (y\ne0). Then the texture zero is protected to first order by a structural incidence distinction.

**Failure trigger:** the same allowed one-form that generates (y) necessarily generates an unsuppressed (r_{\rm ker}) in the Dirac sector. Then exact alignment is unnatural and the zero becomes a tuned cancellation.

**Quadratic branch:** if (r_{\rm ker}=0) but (r_{\rm im}\ne0), retain an approximate texture with calculable (O(\varepsilon^2)) lifting.

**Phenomenology boundary:** translating (arepsilon) into eV requires the normalized Dirac and heavy scales; the dimensionless matrix theorem alone does not set an observable magnitude.

## 8. Verdict

The alignment hypothesis has split into two physically inequivalent deviations:

\[
\boxed{
r_{\rm ker}\ne0
\Rightarrow
\delta(m_\nu)_{PP}=O(\varepsilon),
}
\]

whereas

\[
\boxed{
r_{\rm ker}=0, r_{\rm im}\ne0
\Rightarrow
\delta(m_\nu)_{PP}=O(\varepsilon^2).
}
\]

The next high-value finite-geometry audit is therefore not merely whether (m_D) is block diagonal. It is whether its permitted off-block component can reach the complementary Majorana null line.

## Corpus position

- [Majorana-phase branches](1113_the_surviving_electron_normal_texture_zero_has_two_mirror_Majorana_phase_branches_and_a_narrow_absolute_mass_band.md)
- [selected-flavour NuFIT split](1112_the_selected_flavour_texture_zero_keeps_electron_normal_ordering_open_excludes_electron_inverted_ordering_and_leaves_mu_tau_branches_parameter_dependent.md)
- [rank-one seesaw theorem](1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md)
- [generation-blind first-order protection no-go](1115_the_generation_blind_Pati_Salam_first_order_calculus_cannot_protect_the_Majorana_null_line_from_Dirac_leakage.md)
