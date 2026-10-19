# A Rank-One Complementary Majorana Block Can Give Three Heavy Masses, but Block-Preserving Seesaw Forces a Selected-Flavour Texture Zero

**Date:** 18 October 2026  
**Branches:** B-PATI-SALAM-MAJORANA-DIAGONAL-DELTA-SQUARE, B-TWO-DELTA-FACES-THREE-MAJORANA-SECTORS, B-POPULATION-NORMAL-DELTA-JORDAN-SPIN23 and B-DELTA-COPY-KINETIC-QUARTIC-RANK-ONE-GATE  
**Claim status:** exact matrix and seesaw theorem under an explicit alignment hypothesis; phenomenological viability and spectral derivation remain open  
**Certificate:** [prove_rank_one_Q_Majorana_seesaw_texture_zero.mjs](../../../verification/prove/prove_rank_one_Q_Majorana_seesaw_texture_zero.mjs)

## Executive result

The quartic Jordan-exchange gate found in [1110](1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md) requires

\[
\operatorname{rank}(Q M_R Q)\le 1.
\]

That condition does **not** force a massless heavy neutrino. If the charged cross-face couples the selected family direction to the null direction of the rank-one complementary block, the complete (3\times3) Majorana matrix is invertible.

There is nevertheless a sharp low-energy consequence. If the neutrino Dirac matrix preserves the same selected-versus-complementary splitting,

\[
[m_D,P]=0,
\]

then the type-I seesaw matrix

\[
m_\nu=-m_D M_R^{-1}m_D^T
\]

obeys

\[
\boxed{P m_\nu P=0.}
\]

For a rank-one selected projector (P=P_\alpha) in the charged-lepton mass basis, this is the one-zero texture

\[
\boxed{(m_\nu)_{\alpha\alpha}=0.}
\]

The result is therefore neither “rank-one complement implies a massless neutrino” nor a free texture claim. It is an alignment theorem linking the proposed Jordan copy symmetry to a directly testable light-neutrino matrix element.

## 1. Canonical form of the rank-one complement

Let

\[
\mathbb C^3=P\mathbb C^3\oplus Q\mathbb C^3,
\qquad
\operatorname{rank}P=1,
\qquad
\operatorname{rank}Q=2.
\]

Write the complex symmetric heavy Majorana matrix as

\[
M_R=
\begin{pmatrix}
a & b^T\\
b & B
\end{pmatrix},
\qquad B^T=B,
\qquad \operatorname{rank}B=1.
\]

A unitary congruence inside the (Q)-plane puts (B) in Takagi form. In the resulting basis,

\[
M_R=
\begin{pmatrix}
a & x & y\\
x & d & 0\\
y & 0 & 0
\end{pmatrix},
\qquad d\ne0.
\]

The third basis vector spans the null line of (B). The coordinate (y) is precisely the component of the charged cross-face that reaches this null line.

## 2. The cross-face restores full heavy rank

Direct expansion gives

\[
\det M_R=-d y^2.
\]

Thus

\[
\boxed{
M_R\text{ invertible}
\iff
d\ne0\text{ and }y\ne0.
}
\]

Coordinate-free, for any (2\times2) symmetric (B),

\[
\det M_R=a\det B-b^T\operatorname{adj}(B)b.
\]

On the rank-one stratum (det B=0), so

\[
\det M_R=-b^T\operatorname{adj}(B)b.
\]

The adjugate of a nonzero rank-one (2\times2) matrix has image on the complementary null line. Hence the full heavy rank is restored exactly when (b) has a nonzero component toward that line.

This gives the three-face interpretation a concrete job:

- the selected neutral face supplies (a);
- the complementary neutral face supplies the single nonzero Takagi direction (d);
- the charged relation supplies (x) and (y), with (y\ne0) sewing the otherwise-null direction into the full matrix.

## 3. Exact inverse and the hidden zero

When (dy\ne0),

\[
M_R^{-1}=
\begin{pmatrix}
0 & 0 & y^{-1}\\
0 & d^{-1} & -x/(dy)\\
y^{-1} & -x/(dy) & (x^2-ad)/(dy^2)
\end{pmatrix}.
\]

The important entry is not a fitted cancellation:

\[
\boxed{(M_R^{-1})_{PP}=0.}
\]

It follows immediately from the cofactor identity

\[
(M_R^{-1})_{PP}=\frac{\det(QM_RQ)}{\det M_R}=0.
\]

The rank-one quartic gate therefore becomes an inverse-matrix zero whenever the full heavy matrix is invertible.

## 4. Propagation through type-I seesaw

Assume the Dirac matrix respects the family flag:

\[
m_D=
\begin{pmatrix}
d_P&0\\
0&D_Q
\end{pmatrix},
\qquad d_P\ne0,
\qquad \det D_Q\ne0.
\]

Then

\[
P m_\nu P
=-d_P^2 P M_R^{-1}P
=0.
\]

Equivalently,

\[
m_\nu^{-1}=-m_D^{-T}M_Rm_D^{-1},
\]

so the complementary principal block of (m_\nu^{-1}) remains rank one. Jacobi's complementary-minor identity gives

\[
\det\bigl((m_\nu^{-1})_{QQ}\bigr)
=\frac{(m_\nu)_{PP}}{\det m_\nu}=0.
\]

Both routes produce the same selected-flavour zero.

## 5. No forced massless light state

For invertible (m_D) and (M_R),

\[
\det m_\nu
=-\frac{(\det m_D)^2}{\det M_R}.
\]

Since (det M_R=-dy^2\ne0), all three light masses can also be nonzero. Therefore:

\[
\boxed{
\operatorname{rank}(QM_RQ)=1
\not\Longrightarrow
\det M_R=0
\text{ or }
\det m_\nu=0.
}
\]

The actual prediction is a matrix element, not a vanishing eigenvalue.

## 6. Flavor-basis meaning

The earlier charged-lepton spectral construction canonically labels

\[
P_e,quad P_\mu,quad P_\tau.
\]

If one of these is the selected projector and the neutrino Dirac map is block preserving in that charged-lepton mass basis, the theorem becomes

\[
(m_\nu)_{ee}=0,
\quad
(m_\nu)_{\mu\mu}=0,
\quad\text{or}\quad
(m_\nu)_{\tau\tau}=0.
\]

For (alpha=e), the same entry is the standard light-neutrino contribution to neutrinoless double-beta decay:

\[
m_{\beta\beta}=|(m_\nu)_{ee}|.
\]

An exact electron-selected branch would therefore predict a vanishing tree-level light-neutrino exchange amplitude. This does not imply that every neutrinoless double-beta mechanism vanishes, and radiative or Dirac-misalignment corrections can lift the zero.

The official NuFIT analysis supplies the oscillation-parameter ranges needed for the next numerical compatibility scan, but oscillation data alone do not fix the two Majorana phases or the absolute lightest mass. The zero must therefore be tested as a complex triangle condition, not by inserting mixing angles alone.

## 7. The alignment hypothesis is essential

If (m_D) mixes the (P) and (Q) sectors, the selected row of (m_D) samples nonzero entries of (M_R^{-1}) and generally gives

\[
P m_\nu P\ne0.
\]

The certificate includes an explicit counterexample. Hence the implication has the exact logical form

\[
\boxed{
\operatorname{rank}(QM_RQ)=1
+[m_D,P]=0
+\det M_R\ne0
\Longrightarrow
P m_\nu P=0.
}
\]

This is valuable because it exposes the next microscopic burden. The programme must decide whether the same family selector that acts on the (Delta)-copy sector also constrains the Dirac Yukawa map, or whether the two sectors are misaligned.

## 8. Basis-invariant formulation

Let (P) be the rank-one spectral projector selected by the charged-lepton Dirac operator. The assumptions can be stated without naming a generation:

\[
Q M_R Q\text{ has rank one},
\qquad
Pm_DQ=Qm_DP=0.
\]

Then

\[
P m_\nu P=0.
\]

This is invariant under independent changes of basis within (P\mathbb C^3) and (Q\mathbb C^3). It is not invariant under rotations that move (P), because (P) is physical data fixed by the charged-lepton spectrum.

## 9. Stop-everything and branch criteria

**Stop-everything positive trigger:** a complete finite spectral triple derives both the rank-one (QM_RQ) quartic gate and (P/Q)-preserving (m_D). Then a measurable one-zero light-neutrino texture follows from the Jordan selector rather than being imposed.

**Alignment stop:** if the represented Dirac Yukawa sector generically has (Pm_DQ\ne0), the exact texture-zero consequence is lost. The approximate branch must then quantify the induced entry.

**Rank stop:** if the complete spectral action supplies unavoidable terms making (QM_RQ) rank two, the exact Jordan-exchange branch closes, although the hierarchy-controlled approximate branch remains.

**Phenomenology stop:** if the selected one-zero texture is excluded for all masses and Majorana phases compatible with current data, that selected-family branch closes even if the algebraic construction survives.

**Interpretation stop:** the theorem does not derive which of (e,\mu,\tau) is selected and does not derive the observed PMNS matrix.

## 10. Verdict

The quartic rank-one condition is not a sterile singularity. The charged relation can restore a fully invertible heavy Majorana matrix:

\[
\boxed{
\det M_R=-d y^2\ne0.
}
\]

But the same rank-one condition leaves a cofactor zero. With a block-preserving Dirac map, seesaw transports it into a selected-flavour light-neutrino texture zero:

\[
\boxed{
\operatorname{rank}(QM_RQ)=1, [m_D,P]=0
\Longrightarrow
(m_\nu)_{\alpha\alpha}=0.
}
\]

This is the first route in the present Pati–Salam/Jordan branch from the (Spin(2,3)) copy-space proposal to a crisp low-energy constraint. The next calculation is a full NuFIT-compatible complex-phase scan for all three choices of (P_\alpha), followed by a controlled Dirac-misalignment expansion.

## Sources and corpus position

- [NuFIT 6.0 global analysis](https://arxiv.org/abs/2410.05380) for the oscillation-parameter likelihoods needed by the next scan.
- [Prakash–Ramya, one Standard-Model generation as a quantum error-correcting code](https://arxiv.org/abs/2610.21879v1), already used elsewhere in this programme to keep code grading distinct from the present family projector.
- [quartic rank-one gate](1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md)
- [population-normal Jordan selector](1109_the_population_normal_Jordan_selector_removes_the_extra_neutral_Delta_and_recovers_Spin23_but_charge_six_lives_in_an_external_symmetric_square.md)
- [charged-lepton spectral projectors](../1000-1099/1099_the_charged_lepton_Dirac_spectrum_canonically_labels_all_three_family_projectors_but_neither_selects_one_B_minus_3Li_vertex_nor_generates_its_charge_three_flavon.md)
- [NuFIT texture-zero branch scan](1112_the_selected_flavour_texture_zero_keeps_electron_normal_ordering_open_excludes_electron_inverted_ordering_and_leaves_mu_tau_branches_parameter_dependent.md)
