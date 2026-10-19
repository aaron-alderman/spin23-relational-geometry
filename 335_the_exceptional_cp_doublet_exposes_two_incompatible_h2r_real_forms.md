# The Exceptional CP Doublet Exposes Two Incompatible (H_2(\mathbb R)) Real Forms

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact residual-(S_2) intertwiner audit and real-form theorem; dynamical selection of either real form remains open

## 1. Residual-(S_2) sheet decomposition

In the flag basis, the three-sheet permutation carrier decomposes as

\[
\mathbb C^3=E\oplus O,
\qquad
E\cong\mathbb C^2,
\qquad
O\cong\mathbb C,
\]

where the residual transposition acts as

\[
P=\operatorname{diag}(1,1,-1).
\]

The endomorphism space has the parity decomposition

\[
\operatorname{End}(\mathbb C^3)
=
\underbrace{\left[M_2(\mathbb C)\oplus\mathbb C\right]}_{5\text{ complex, even}}
\oplus
\underbrace{\left[\operatorname{Hom}(O,E)\oplus\operatorname{Hom}(E,O)\right]}_{4\text{ complex, odd}}.
\]

For transpose-symmetric Majorana tensors,

\[
\operatorname{Sym}_3(\mathbb C)
=
\underbrace{\left[\operatorname{Sym}_2(\mathbb C)\oplus\mathbb C\right]}_{4\text{ complex, even}}
\oplus
\underbrace{E}_{2\text{ complex, odd}}.
\]

Exact \(S_2\) kills the odd block and leaves a \(2+1\) system. Allowing an arbitrary complex odd doublet restores all six complex dimensions of a general symmetric \(3\times3\) matrix. Residual symmetry alone is therefore either too restrictive or completely nonpredictive once broken arbitrarily.

## 2. The exceptional construction supplies a real slice, not an arbitrary complex doublet

The canonical exceptional odd vector is

\[
z=(\alpha,i\beta)^T,
\qquad
\alpha,\beta\in\mathbb R.
\]

It occupies the real two-plane

\[
\mathcal Z=Q\mathbb R^2\subset\mathbb C^2,
\qquad
Q=\operatorname{diag}(1,i).
\]

This is only two real dimensions, rather than the four real dimensions of an unrestricted complex doublet. The exceptional determinant has therefore supplied a genuine real-structure restriction.

## 3. Stabilizer of the exceptional slice

A complex-linear map preserves \(\mathcal Z\) exactly when it has the form

\[
T=QBQ^{-1},
\qquad
B\in M_2(\mathbb R).
\]

Hence

\[
\boxed{
\operatorname{Stab}_{\operatorname{End}_{\mathbb C}(\mathbb C^2)}(\mathcal Z)
=QM_2(\mathbb R)Q^{-1}.}
\]

Its Hermitian part is

\[
QH_2(\mathbb R)Q^\dagger.
\]

Explicitly,

\[
Q
\begin{pmatrix}
a&r\\r&d
\end{pmatrix}
Q^\dagger
=
\begin{pmatrix}
a&-ir\\ir&d
\end{pmatrix}.
\]

Thus the exceptional CP slice does not abandon the real rank-two Jordan carrier. It selects a quarter-turned copy of it.

Its positive cone has the same conformal group:

\[
\operatorname{Co}\left(QH_2(\mathbb R)Q^\dagger\right)
\cong Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

## 4. The two real carriers are incompatible away from the diagonal

The original real carrier is

\[
H_2(\mathbb R)
=\left\{
\begin{pmatrix}a&r\\r&d\end{pmatrix}
:a,r,d\in\mathbb R
\right\}.
\]

The exceptional-slice carrier is

\[
QH_2(\mathbb R)Q^\dagger
=\left\{
\begin{pmatrix}a&-ir\\ir&d\end{pmatrix}
:a,r,d\in\mathbb R
\right\}.
\]

Their intersection is

\[
\boxed{
H_2(\mathbb R)
\cap
QH_2(\mathbb R)Q^\dagger
=\{\text{real diagonal matrices}\}.}
\]

This is the algebraic version of the quarter-turn found earlier between the domain-wall and population-normal carriers.

## 5. The CP source measures failure to preserve the rotated slice

Let the original even carrier act on the exceptional vector:

\[
H=
\begin{pmatrix}
S&r\\r&T
\end{pmatrix},
\qquad
z=
\begin{pmatrix}
\alpha\\i\beta
\end{pmatrix}.
\]

Then

\[
Q^\dagger Hz
=
\begin{pmatrix}
S\alpha+ir\beta\\
T\beta-ir\alpha
\end{pmatrix}.
\]

This lies in \(\mathbb R^2\) precisely when

\[
r\beta=0,
\qquad
r\alpha=0.
\]

For a genuine CP-capable vector with \(\alpha\beta\ne0\), the original carrier preserves the exceptional real slice only if \(r=0\). But the Majorana triangle source is

\[
\boxed{
\mathcal I_\triangle
\propto r\alpha\beta.}
\]

Therefore nonzero exceptional CP is exactly tied to the failure of the original real carrier to preserve the quarter-turned real slice.

The phase is not an extra decoration placed on one \(H_2(\mathbb R)\). It is the incompatibility between two individually valid \(H_2(\mathbb R)\) reductions.

## 6. Consequence for seesaw predictivity

The residual-(S_2) representation content does not constrain the seesaw enough:

- exact \(S_2\) removes the odd doublet and yields only a \(2+1\) system;
- an unrestricted complex odd doublet restores the full symmetric-matrix freedom;
- the exceptional real slice is restrictive, but a generic even \(M_2(\mathbb C)\) block rotates it out of itself;
- demanding closure selects the rotated \(QM_2(\mathbb R)Q^{-1}\) algebra;
- retaining the real off-diagonal \(r\) instead produces CP and the cofactor leakage seen in the seesaw calculation.

The predictive question is now sharper:

\[
\boxed{
\text{what dynamics fixes the relative quarter-turn and the allowed failure of real-slice closure?}}
\]

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** one stress/Jordan/Furey construction derives both real carriers and fixes their relative quarter-turn, with \(r\alpha\beta\) matching a measured flavor invariant.

**Representation-only falsifier:** residual \(S_2\) is claimed to predict flavor while its unrestricted odd doublet spans the full missing symmetric sector.

**Real-slice falsifier:** a generic nonzero real \(r\) is claimed to preserve \(\mathcal Z\).

**Carrier falsifier:** the Hermitian stabilizer of \(Q\mathbb R^2\) is not unitarily equivalent to \(H_2(\mathbb R)\).

## 8. Certificate

The [residual-\(S_2\) intertwiner and rotated-carrier certificate](scripts/verify_s2_intertwiner_and_rotated_h2r_real_forms.mjs) checks the parity dimensions, the exceptional-slice stabilizer, the rotated Hermitian \(H_2(\mathbb R)\), its diagonal intersection with the original carrier and the exact \(r\beta,-r\alpha\) leakage.

## Companion documents

- [General complex-Yukawa seesaw no-go](334_general_complex_yukawas_make_the_type_i_seesaw_congruence_surjective.md)
- [Canonical CP-capable odd operator](326_the_flag_sign_gradient_and_complex_structure_build_a_canonical_cp_capable_odd_operator.md)
- [Carrier quarter-turn as broken selector direction](315_the_carrier_quarter_turn_is_a_broken_selector_direction_not_the_surviving_u1.md)
- [Aligned seesaw transmission and its zero](333_the_exceptional_phase_crosses_the_aligned_seesaw_but_has_a_transmission_zero.md)
