# The Exceptional Phase Crosses the Aligned Seesaw but Has a Transmission Zero

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08 and B11  
**Claim status:** exact type-I seesaw calculation for real diagonal Dirac Yukawas; general Yukawa misalignment and experimental matching remain open

## 1. Heavy exceptional texture

Use the sterile Majorana matrix

\[
M_R=
\begin{pmatrix}
S&r&a\\
r&T&i b\\
a&i b&O
\end{pmatrix},
\qquad
S,T,O,r,a,b\in\mathbb R.
\]

Its heavy-sector triangle is

\[
\mathcal I_R
=\operatorname{Im}
\left[
(M_R)_{12}(M_R)_{23}(M_R)_{31}
(M_R)_{11}^*(M_R)_{22}^*(M_R)_{33}^*
\right]
=r a b S T O.
\]

Here \(a=\operatorname{Re}c\), \(b=\operatorname{Im}c\), so this is the exceptional CP area dressed by the flag-even entries.

## 2. Aligned type-I seesaw

Let the Dirac Yukawa matrix be real and diagonal in the charged-lepton frame:

\[
Y_D=\operatorname{diag}(y_1,y_2,y_3).
\]

With \(\kappa=v^2\), the light Majorana matrix is

\[
m_\nu=-\kappa Y_D M_R^{-1}Y_D^T.
\]

The determinant of the heavy matrix is

\[
D
=STO+Sb^2-Ta^2-Or^2+2irab.
\]

The relevant adjugate entries are

\[
\begin{aligned}
A_{11}&=TO+b^2,&
A_{22}&=SO-a^2,&
A_{33}&=ST-r^2,\\
A_{12}&=-rO+iab,&
A_{23}&=ar-iSb,&
A_{31}&=-aT+irb.
\end{aligned}
\]

Thus

\[
(m_\nu)_{ij}
=-\frac{\kappa y_i y_j}{D}A_{ij}.
\]

## 3. Exact light-sector triangle

Define the charged-frame light invariant

\[
\mathcal I_\nu
=\operatorname{Im}
\left[
(m_\nu)_{12}(m_\nu)_{23}(m_\nu)_{31}
(m_\nu)_{11}^*(m_\nu)_{22}^*(m_\nu)_{33}^*
\right].
\]

All determinant phases cancel between the three entries and three conjugate diagonal entries. Direct multiplication gives

\[
\boxed{
\begin{aligned}
\mathcal I_\nu
={}&
\frac{\kappa^6(y_1y_2y_3)^4}{|D|^6}
(TO+b^2)(SO-a^2)(ST-r^2)\\
&\times
arb\left[Sb^2-r^2O-STO-a^2T\right].
\end{aligned}}
\]

Real diagonal Yukawas therefore introduce only the positive factor \((y_1y_2y_3)^4\). They cannot create, remove or reverse the phase except by making a Yukawa vanish.

But inversion contributes a second, genuinely dynamical cofactor factor.

## 4. The checkpoint transmits CP

For

\[
(S,T,O,r,a,b)=(5,7,11,2,1,1),
\]

the heavy triangle is

\[
\mathcal I_R=770,
\]

while

\[
\operatorname{Im}(A_{12}A_{23}A_{31})=-862.
\]

All three diagonal cofactors are nonzero, so the light triangle is nonzero. The exceptional phase crosses the aligned seesaw, although the light orientation is reversed for this checkpoint.

This sign reversal is not paradoxical. The inverse sums multiple cofactor paths; its orientation need not equal the orientation of the original edge triangle.

## 5. A sharp transmission-zero hypersurface

The heavy phase can be nonzero while the light triangle vanishes. The nontrivial cancellation condition is

\[
\boxed{
Sb^2-r^2O-STO-a^2T=0.}
\]

For example,

\[
(S,T,O,r,a,b)=(2,3,5,1,1,\sqrt{19})
\]

has

\[
\mathcal I_R=30\sqrt{19}\ne0,
\]

nonzero diagonal cofactors, an invertible \(M_R\), but

\[
\mathcal I_\nu=0.
\]

Therefore the seesaw does not topologically protect transmission of the exceptional phase.

## 6. Interpretation as path cancellation

Each inverse entry is a cofactor divided by the common determinant. The three cofactors mix direct heavy edges with two-step paths through the remaining sterile state. The light triangle measures the orientation of these effective paths, not merely the original heavy loop.

The transmission zero is a destructive-interference surface in the relational network.

This is the seesaw analogue of Schur interference:

\[
\boxed{
\text{heavy loop orientation}
\not\Rightarrow
\text{light loop orientation without a noncancellation condition}.}
\]

## 7. What remains open

- General complex, nondiagonal \(Y_D\) can supply additional phases and misalignment invariants.
- Renormalization-group running may cross or avoid the transmission-zero surface.
- The low-energy invariant must be expressed with charged-lepton spectral projectors when the charged frame is not fixed.
- Oscillation experiments do not directly measure Majorana phases; a production–propagation–detection observable remains necessary.
- No present derivation fixes the heavy real parameters or the Dirac Yukawas from the exceptional algebra.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the exceptional determinant fixes \(M_R\) and \(Y_D\) such that the observed light masses and CP invariants follow without phase fitting and away from the transmission zero.

**Algebraic falsifier:** direct inversion fails to reproduce the boxed light-triangle formula.

**Protection falsifier:** the heavy phase is claimed to guarantee light CP without excluding the displayed cancellation surface.

**Physical falsifier:** the triangle is identified with an oscillation observable without separating Dirac and Majorana phase sensitivity.

## 9. Certificate

The [aligned type-I seesaw phase-transmission certificate](scripts/verify_exceptional_phase_through_aligned_type_i_seesaw.mjs) checks the checkpoint, the exact cofactor formula, diagonal-Yukawa scaling and an explicit nonzero-heavy/zero-light cancellation point.

## Companion documents

- [Exceptional phase in Dirac and Majorana spectra](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
- [Weak-basis Majorana triangle invariant](330_the_exceptional_majorana_phase_has_a_weak_basis_three_projector_triangle_invariant.md)
- [Majorana CP as three-port holonomy](331_majorana_cp_is_the_holonomy_obstructing_three_local_spin23_edges_from_one_global_real_carrier.md)
- [Minimal causal spectral orientation](332_two_spectral_modes_are_the_minimum_for_causal_three_port_orientation.md)
