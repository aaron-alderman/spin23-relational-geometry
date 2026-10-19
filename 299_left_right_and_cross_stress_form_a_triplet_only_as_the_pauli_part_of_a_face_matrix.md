# Left, Right and Cross Stress Form a Triplet Only as the Pauli Part of a Face Matrix

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B08 and B11  
**Claim status:** exact face-matrix/Pauli decomposition and covariant Gram construction; existence of a gauge-neutral off-diagonal Furey stress operator remains open

## 1. Correcting the informal “left/right/cross triplet”

In the Furey-oriented ternary bimodule, left products, right products and the carrier itself occupy different corners:

\[
A_L=MM^\dagger,
\qquad
A_R=M^\dagger M,
\qquad
M\subset\operatorname{Hom}(V_R,V_L).
\]

They are not automatically three components of one vector representation. Their dimensions and gauge transformation laws can differ.

The unified object is instead a Hermitian linking matrix with spacetime-tensor entries:

\[
\boxed{
\mathbb T^{\mu\nu}=
\begin{pmatrix}
T_{LL}^{\mu\nu}&T_{LR}^{\mu\nu}\\
T_{RL}^{\mu\nu}&T_{RR}^{\mu\nu}
\end{pmatrix},
\qquad
T_{RL}=(T_{LR})^\dagger.
}
\]

This is the operator-valued version of the two-face response matrix suggested by \(AXB\).

## 2. The genuine triplet is the traceless Pauli part

Expand

\[
\mathbb T^{\mu\nu}
=T_0^{\mu\nu}I
+T_x^{\mu\nu}\sigma_x
+T_y^{\mu\nu}\sigma_y
+T_z^{\mu\nu}\sigma_z,
\]

where

\[
T_0=\frac12(T_{LL}+T_{RR}),
\qquad
T_z=\frac12(T_{LL}-T_{RR}),
\]

\[
T_x=\operatorname{Re}T_{LR},
\qquad
T_y=-\operatorname{Im}T_{LR}.
\]

Under a two-face basis transformation \(U\in SU(2)\),

\[
U\sigma_aU^\dagger=R_{ab}(U)\sigma_b,
\qquad R(U)\in SO(3).
\]

Therefore

\[
\boxed{(T_x,T_y,T_z)\ \text{is a genuine internal }SO(3)\text{ triplet}.}
\]

The scalar \(T_0\) is separate. “Left, right, cross” becomes mathematically correct only after this linking-matrix reorganization.

## 3. The stress Gram selector is now non-circular

Define

\[
Q_{ab}=T_a^{\mu\nu}T_{b\mu\nu},
\qquad a,b\in\{x,y,z\}.
\]

Under a face change,

\[
Q\mapsto RQR^T.
\]

An isolated eigenline of \(Q\) therefore selects a director \([n]\in\mathbb{RP}^2\) covariantly with respect to both Lorentz transformations and face-basis rotations. No fixed internal vector has been inserted.

This fills the representation-theoretic part of the previously missing arrow:

\[
\text{two-face linking stress}
\longrightarrow
(T_x,T_y,T_z)
\longrightarrow Q
\longrightarrow[n].
\]

## 4. Relation to the complex and real carriers

For a scalar positive response

\[
G=\begin{pmatrix}\ell&c\\\bar c&r\end{pmatrix}
=t_0I+t_x\sigma_x+t_y\sigma_y+t_z\sigma_z,
\]

one has

\[
\det G=\ell r-|c|^2
=t_0^2-t_x^2-t_y^2-t_z^2.
\]

This is the \(H_2(\mathbb C)\) Minkowski determinant of signature \((1,3)\). The real-form director chooses which one-dimensional Bloch component is excluded. The fixed carrier then has

\[
\det G_{\rm real}=t_0^2-t_1^2-t_2^2,
\]

the \(H_2(\mathbb R)\) determinant of signature \((1,2)\).

Crucially, the selector must be derived from the full three-component parent Gram before the excluded component is set to zero. Starting with a real off-diagonal block would remove \(T_y\) in advance and make the derivation circular.

## 5. The Standard-Model gauge gate

For actual chiral matter, \(T_{LR}\) is not automatically gauge neutral. Left- and right-handed Standard-Model fields generally carry different weak and hypercharge representations. A bilinear connecting them transforms like the corresponding Higgs/Yukawa intertwiner.

Thus one needs one of:

1. a Higgs-dressed neutral cross stress;
2. a gauge-invariant composite or spectral matrix element;
3. external relational faces unrelated to electroweak chirality;
4. a broken-phase construction with a fully covariant ultraviolet completion.

Without this dressing, the Pauli triplet exists only as block algebra, not as three physical observables.

## 6. Relation to Furey’s ternary closure

The TRO supplies the exact compositional setting:

\[
M M^\dagger\subset A_L,
\qquad
M^\dagger M\subset A_R,
\qquad
MM^\dagger M\subset M.
\]

It therefore naturally populates the two diagonal linking corners and the off-diagonal relationship corner. But ternary closure does not guarantee:

- equality of the corner dimensions;
- a canonical trace/compression to one two-face matrix;
- gauge neutrality of \(T_{LR}\);
- a conserved symmetric stress tensor in every corner;
- common renormalization of the three Pauli channels.

Those are now explicit construction requirements rather than hidden assumptions.

## 7. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey linking algebra yields a gauge-neutral Hermitian face-valued stress matrix whose Pauli Gram eigenline matches the independently inferred real-form selector.

**Higgs trigger:** the unique gauge-neutral dressing of \(T_{LR}\) is the same Higgs/Yukawa orientation selected by the cyclic Furey topology.

**Representation falsifier:** \(T_{LL},T_{RR},T_{LR}\) are called an \(SO(3)\) triplet without first assembling a Hermitian \(2\times2\) face matrix.

**Gauge falsifier:** a bare left–right cross stress is treated as observable despite nonmatching electroweak charges.

**Circularity falsifier:** the imaginary cross component is removed before its Gram matrix is used to derive the real-form normal.

## 8. Certificate

The [face-valued stress Pauli-triplet certificate](scripts/verify_face_valued_stress_pauli_triplet.mjs) checks \(SO(3)\) covariance of the Lorentz-contracted channel Gram, the \(H_2(\mathbb C)\) determinant decomposition and removal of one genuinely present Bloch direction by the real selector.

## Companion documents

- [Stress-derived selector requires a channel triplet](298_stress_can_select_the_rp2_director_only_after_a_physical_channel_triplet_exists.md)
- [Furey orientation as an exact ternary bimodule](108_furey_oriented_bimodule_ternary_closure.md)
- [Independent face/flavor complex parent](295_independent_face_and_complex_flavor_close_naturally_on_h6c_not_h12r.md)
- [Triplet intertwiner compatibility gates](287_the_three_triplet_branches_admit_isomorphisms_but_not_yet_a_canonical_intertwiner.md)
