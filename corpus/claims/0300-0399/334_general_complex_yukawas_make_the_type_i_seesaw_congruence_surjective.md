# General Complex Yukawas Make the Type-I Seesaw Congruence Surjective

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08 and B11  
**Claim status:** exact algebraic no-go for phase predictivity with an unrestricted invertible Dirac matrix; constrained Furey/exceptional Yukawa origins remain open

## 1. Why the aligned result is not generic

The aligned calculation used a real diagonal Dirac matrix. For a general complex matrix,

\[
m_\nu=-\kappa Y_D M_R^{-1}Y_D^T.
\]

This is a complex congruence, not a similarity transformation. Congruence has enough freedom to change every light-sector mixing angle and phase.

The question is therefore not whether a selected heavy texture can produce a desired light texture. It can. The question is what restricts \(Y_D\) relative to \(M_R\).

## 2. Factorization theorem

Every nonsingular complex symmetric matrix admits a factorization

\[
M_R=RR^T
\]

with invertible \(R\). This follows, for example, from Takagi factorization over \(\mathbb C\).

Likewise, for any desired nonsingular symmetric light congruence \(N\), choose

\[
N=LL^T.
\]

Set

\[
\boxed{Y_D=LR^T.}
\]

Then

\[
\begin{aligned}
Y_DM_R^{-1}Y_D^T
&=LR^T(RR^T)^{-1}RL^T\\
&=LL^T\\
&=N.
\end{aligned}
\]

Therefore

\[
\boxed{
Y_D\ \text{unrestricted and invertible}
\quad\Longrightarrow\quad
M_R\mapsto m_\nu\ \text{is surjective onto nonsingular complex symmetric textures}.}
\]

The overall sign and scale are absorbed into \(L\).

## 3. Heavy CP can be erased completely

Take a heavy matrix with a nonzero Majorana triangle and factor it as

\[
M_R=RR^T.
\]

Choose

\[
Y_D=R^T.
\]

Then

\[
Y_DM_R^{-1}Y_D^T=I_3,
\]

so

\[
m_\nu=-\kappa I_3.
\]

All light mixing and triangle orientation disappear even though the heavy texture is CP-oriented.

An explicit certificate uses

\[
R=
\begin{pmatrix}
1&1+i&0\\
0&1&1+2i\\
1&0&2
\end{pmatrix}.
\]

The matrix \(M_R=RR^T\) has triangle invariant \(-300\), while the resulting light matrix is proportional to the identity.

## 4. Light CP can be manufactured from a real heavy sector

Conversely, let

\[
M_R=I_3,
\qquad
Y_D=R.
\]

Then

\[
m_\nu=-\kappa RR^T.
\]

The real heavy sector carries no CP phase, but the light matrix has the same nonzero triangle \(-300\) up to the positive overall scale.

Thus neither implication survives unrestricted complex Yukawas:

\[
\boxed{
\text{heavy CP}\not\Rightarrow\text{light CP},
\qquad
\text{light CP}\not\Rightarrow\text{heavy CP}.}
\]

## 5. The actual predictive gate

The exceptional/Jordan programme becomes predictive only if it supplies a relation between the two matrices, such as:

- \(Y_D\) is real diagonal in the exceptional flag basis;
- \(Y_D\) belongs to a low-dimensional intertwiner space;
- \(Y_D\) and \(M_R\) arise from different projections of one cubic tensor;
- a residual symmetry fixes their relative Takagi frames;
- the relational carrier admits only a restricted congruence orbit.

Without such a relation, fitting \(M_R\) and \(Y_D\) is equivalent to fitting an arbitrary complex symmetric \(m_\nu\).

## 6. Relation to Furey and the carrier programme

Furey’s algebraic constructions are valuable here only if their bimodule and chirality structure reduce the allowed Dirac intertwiners. Merely reproducing the Standard-Model representation of \(Y_D\) is not enough: the full \(3\times3\) family matrix retains the surjectivity above.

Likewise, local \(Spin(2,3)\) edge geometry does not constrain the global congruence automatically. A common Jordan origin must correlate the edge holonomy with the Yukawa frame.

This turns an attractive narrative into a concrete selection problem:

\[
\boxed{
\text{derive the relative congruence frame, not merely the two matrices}.}
\]

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** an exceptional/Furey construction forces \(Y_D=LR^T\) into a proper subvariety whose residual invariants reproduce the observed light masses and CP data.

**Predictivity falsifier:** \(Y_D\) remains an arbitrary complex \(3\times3\) matrix after all claimed algebraic restrictions are imposed.

**Heavy-origin falsifier:** a claimed heavy-sector prediction is unchanged after allowing the explicit phase-erasing Yukawa \(Y_D=R^T\).

**Light-origin falsifier:** a light phase is attributed uniquely to \(M_R\) even though \(M_R=I_3\) and a complex \(Y_D\) can reproduce it.

## 8. Pinned dependency

The next required object is not another arbitrary seesaw scan. It is the explicit Furey/exceptional intertwiner space for the three triality sheets, including its dimension, real structure and residual \(S_2\) action.

Until that space is derived, the general-Yukawa seesaw branch is pinned at a genuine loss-of-predictivity theorem.

## 9. Certificate

The [general complex-Yukawa congruence certificate](../../../verification/verify/verify_general_complex_yukawa_seesaw_congruence_freedom.mjs) checks explicit phase erasure, phase manufacture from a real heavy sector and the factorized surjectivity identity.

## Companion documents

- [Aligned seesaw transmission and its zero](333_the_exceptional_phase_crosses_the_aligned_seesaw_but_has_a_transmission_zero.md)
- [Furey-track intertwiner dimension trap](../0000-0099/72_furey_track_intertwiner_dimension_trap.md)
- [Canonical CP-capable odd operator](326_the_flag_sign_gradient_and_complex_structure_build_a_canonical_cp_capable_odd_operator.md)
- [Exceptional determinant projection](327_the_polarized_exceptional_determinant_projects_canonically_onto_the_triality_sign_cubic.md)
