# Common Central Sign versus Relative Face Reflection

**Date:** 17 October 2026  
**Branches:** B07, B08 and B09  
**Claim status:** exact matrix-level separation; physical selection remains open

## 1. The question

The braid-center branch supplies

\[
-I_4\in Sp(4,\mathbb R),
\]

while the two-face classification leaves one visible real-carrier action,

\[
b\longmapsto-b.
\]

Are these the same transformation after a metaplectic lift?

They are not.

## 2. The Levi embedding

For \(A\in GL(2,\mathbb R)\), define

\[
\iota(A)=
\begin{pmatrix}
A&0\\
0&A^{-T}
\end{pmatrix}
\in Sp(4,\mathbb R).
\]

On the symmetric-matrix chart,

\[
X\longmapsto AXA^T.
\]

This formula includes both signs that must be distinguished.

## 3. Common inversion

Take

\[
A_c=-I_2.
\]

Then

\[
\iota(A_c)=-I_4,
\qquad
A_cXA_c^T=X.
\]

This is exactly the image of the \(B_3\) central full twist in the existing representation. It fixes every Jordan matrix.

In the oscillator representation, a lift acts as total two-mode parity, up to the choice of metaplectic lift. That operator is not a universal scalar on the Hilbert space, but it remains invisible on the classical Jordan carrier.

## 4. Relative reflection

Take instead

\[
A_r=\operatorname{diag}(1,-1).
\]

Then

\[
\iota(A_r)=
\operatorname{diag}(1,-1,1,-1),
\]

and

\[
A_r
\begin{pmatrix}a&b\\b&c\end{pmatrix}
A_r^T
=
\begin{pmatrix}a&-b\\-b&c\end{pmatrix}.
\]

This is the visible relative face reflection.

It is not central in \(Sp(4,\mathbb R)\), and it is not the braid-center image.

## 5. A continuous symplectic path exists

Although \(A_r\) lies in the negative-determinant component of \(GL(2,\mathbb R)\), its symplectic embedding is connected to the identity inside the full \(Sp(4,\mathbb R)\).

Rotate only the second canonical plane:

\[
\begin{aligned}
q_2&\mapsto \cos\theta\,q_2+\sin\theta\,p_2,\\
p_2&\mapsto-\sin\theta\,q_2+\cos\theta\,p_2.
\end{aligned}
\]

At \(\theta=\pi\),

\[
(q_2,p_2)\mapsto(-q_2,-p_2),
\]

and the endpoint is exactly \(\iota(A_r)\).

The path leaves the \(GL(2)\) Levi subgroup at intermediate angles. In a fixed symmetric-matrix chart it acts fractionally and can encounter chart caustics. Thus the discrete real reflection can arise as the endpoint of continuous symplectic transport without being a continuous diagonal \(U(1)\) face action.

## 6. Metaplectic distinction

The half-rotation of one canonical plane lifts, up to convention, as

\[
\exp[-i\pi(N_2+\tfrac12)]
=-i\,(-1)^{N_2}.
\]

This is single-mode parity with a path phase.

By contrast, \(-I_4\) acts as total parity

\[
(-1)^{N_1+N_2}
\]

up to its lift convention. These operators and their classical endpoints are different.

The topology also differs:

- the full \(2\pi\) one-plane rotation has one unit of symplectic winding and lifts to a minus sign;
- the \(2\pi\) configuration-space rotation \(A=R(\theta)\) embedded as \(\operatorname{diag}(A,A)\) has unitary determinant one, lies in the \(SU(2)\) part of the maximal compact subgroup and is contractible in \(Sp(4,\mathbb R)\).

Therefore an endpoint sign is not enough; which plane rotates and how it sits inside \(Sp(4)\) determine the Maslov/metaplectic data.

## 7. Consequence for the braid branch

The current braid representation sends its center to the **common** inversion:

\[
z\mapsto-I_4.
\]

It cannot generate \(b\mapsto-b\) on the Jordan carrier. In fact, every word in the existing braid representation lands in the embedded \(SL(2,\mathbb Z)\) and therefore has determinant \(+1\) in its Levi block, whereas

\[
\det\operatorname{diag}(1,-1)=-1.
\]

So no braid word in the existing representation has this endpoint. Producing the relative reflection requires a different representation or an additional physical operation selecting one canonical plane.

This closes one tempting shortcut:

\[
\boxed{
\text{braid central twist}
\ne
\text{relative Jordan-face reflection}.
}
\]

## 8. Stop-everything tests

**Advance:** a physical selector singles out one canonical phase plane and the associated half-rotation acts on the off-diagonal relation while preserving the rest of the construction.

**Pin:** the only selected braid datum remains the center \(-I_4\); then it stays invisible to Jordan observables and cannot supply the relative sign.

**Falsify the proposed identification:** any claim equating the two transformations while retaining the existing \(B_3\to SL(2,\mathbb Z)\to Sp(4,\mathbb Z)\) representation contradicts their explicit matrices.

## 9. Certificate

The [common-versus-relative sign certificate](../../../verification/verify/verify-common-versus-relative-symplectic-sign.mjs) verifies symplecticity, the two distinct Jordan actions, the one-plane rotation path and the inequivalent endpoints.

## Companion documents

- [Three-strand braid central twist](../0000-0099/57_braid_central_twist_to_sp4z_branch.md)
- [Metaplectic lift and Maslov correction](../0000-0099/59_metaplectic_and_maslov_correction_branch.md)
- [Two-face patch actions and real-slice gate](124_two_face_patch_actions_and_real_slice_gate.md)
