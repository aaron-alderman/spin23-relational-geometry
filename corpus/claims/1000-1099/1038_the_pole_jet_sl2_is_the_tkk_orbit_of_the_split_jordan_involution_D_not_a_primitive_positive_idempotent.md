# The Pole-Jet (\mathfrak{sl}_2) Is the TKK Orbit of the Split Jordan Involution (D), Not a Primitive Positive Idempotent

**Date:** 18 October 2026  
**Branches:** real symplectic nilpotent orbits, Jordan tripotents, TKK triples, pole-jet intertwiner, Furey grading, primitive-idempotent no-go  
**Claim status:** exact conjugacy and orbit-separation theorem; microscopic meaning of the canonical coordinate exchange remains open  
**Certificate:** [identify_the_pole_jet_sl2_with_the_split_jordan_tripoten_tkk_orbit.mjs](../../../verification/identify/identify_the_pole_jet_sl2_with_the_split_jordan_tripoten_tkk_orbit.mjs)

## Executive correction and result

Document 1037 established an exact pole-jet (\mathfrak{sl}_2\subset\mathfrak{sp}_4) and left its Jordan object untyped. A primitive-idempotent interpretation is now excluded.

The pole-jet raising nilpotent has rank two. A TKK raising operator built from a primitive rank-one idempotent of (H_2(\mathbb R)) has rank one. They cannot be symplectically conjugate.

The positive identity idempotent also gives a rank-two nilpotent, but it belongs to the positive real orbit with inertia ((2,0)). The pole-jet nilpotent belongs to the split orbit with inertia ((1,1)).

An explicit real symplectic transformation sends the pole-jet triple to

\[
\boxed{
E_D=\begin{pmatrix}0&D\\0&0\end{pmatrix},
\qquad
F_D=\begin{pmatrix}0&0\\D&0\end{pmatrix},
\qquad
H_0=\begin{pmatrix}I&0\\0&-I\end{pmatrix},}
\]

where

\[
D=\operatorname{diag}(1,-1),
\qquad D^2=I.
\]

Thus the correct Jordan object is the full-rank split involution/tripotent (D), not a primitive positive idempotent.

This identifies the algebraic TKK orbit with the same split grading already supplied by the Furey–Higgs channel structure. The remaining physical question is why the required symplectic coordinate exchange—mixing one pole-jet coordinate with its conjugate momentum—is realized by the source dynamics.

## 1. Three candidate TKK orbits

For (u\in H_2(\mathbb R)), consider

\[
E_u=\begin{pmatrix}0&u\\0&0\end{pmatrix},
\qquad
F_u=\begin{pmatrix}0&0\\u^{-1}&0\end{pmatrix}
\]

when (u) is invertible. If (u^2=I), then (u^{-1}=u) and

\[
[E_u,F_u]
=\begin{pmatrix}I&0\\0&-I\end{pmatrix}=H_0.
\]

Relevant cases are:

1. a primitive projector (e=\operatorname{diag}(1,0));
2. the positive identity (I);
3. the split involution (D=\operatorname{diag}(1,-1)).

The first is noninvertible but still generates a rank-one local TKK (\mathfrak{sl}_2) on its Peirce two-plane. The latter two generate full-rank square-zero nilpotents in distinct real orbits.

## 2. Primitive idempotents are excluded by rank

The pole-jet embedding of document 1037 is

\[
\iota(E_{12})
=\begin{pmatrix}
E_{12}&0\\0&-E_{21}
\end{pmatrix}.
\]

It has

\[
\operatorname{rank}\iota(E_{12})=2.
\]

For a primitive idempotent (e),

\[
E_e=\begin{pmatrix}0&e\\0&0\end{pmatrix}
\]

has rank one. Matrix rank is invariant under conjugation, so

\[
\boxed{
\iota(E_{12})\not\sim_{Sp_4(\mathbb R)}E_e.}
\]

The missing object in document 1037 cannot be a primitive positive idempotent.

## 3. Explicit canonical coordinate exchange

Use original canonical coordinates

\[
(q_1,q_2,p_1,p_2).
\]

Define new coordinates

\[
Q_1=q_1,
\qquad
Q_2=p_2,
\qquad
P_1=p_1,
\qquad
P_2=-q_2.
\]

This preserves

\[
dq_1\wedge dp_1+dq_2\wedge dp_2
=dQ_1\wedge dP_1+dQ_2\wedge dP_2.
\]

It is therefore symplectic.

In these coordinates, the pole-jet nilpotents become TKK block nilpotents with

\[
u=-\sigma_x
=\begin{pmatrix}0&-1\\-1&0\end{pmatrix}.
\]

An orthogonal (45^\circ) channel rotation diagonalizes this matrix:

\[
O^T(-\sigma_x)O=D.
\]

Lifting (O) as (\operatorname{diag}(O,O)) is symplectic, giving the displayed ((E_D,F_D,H_0)) triple.

## 4. Why the positive identity orbit is different

Both (E_I) and (E_D) have rank two and square to zero. Over the real symplectic group, the remaining invariant is the inertia of the induced symmetric form on the quotient by the common image/kernel Lagrangian.

For (I), the inertia is

\[
(2,0).
\]

For (D), it is

\[
(1,1).
\]

Sylvester inertia is preserved under real congruence. Hence

\[
\boxed{
E_D\not\sim_{Sp_4(\mathbb R)}E_I.}
\]

The pole-jet triple is genuinely split, not a disguised positive-cone identity triple.

## 5. Idempotent versus tripotent

The matrix (D) obeys

\[
D^2=I,
\qquad
D^3=D.
\]

It is not an idempotent because

\[
D^2\ne D.
\]

It is a Jordan involution and tripotent. In the Jordan-pair/TKK language, the pair ((D,D^{-1})=(D,D)) generates the full split (\mathfrak{sl}_2) triple.

Its spectral projectors are

\[
e_+=\frac{I+D}{2},
\qquad
e_-=\frac{I-D}{2}.
\]

These are the complementary normal/tangent primitive idempotents. The tripotent packages the ordered pair rather than selecting only one member.

This fits the physical branch better than a lone primitive projector because Higgs exchange swaps the two channels while preserving their split relationship.

## 6. Role conversion of the grading

Before the symplectic coordinate exchange, the pole-jet Cartan is

\[
\iota(D)=\operatorname{diag}(D,-D).
\]

After the exchange, the Cartan becomes the universal conformal grading

\[
H_0=\operatorname{diag}(I,-I),
\]

while (D) moves into the positive- and negative-grade Jordan entries (E_D,F_D).

Therefore one must distinguish two roles:

- (D) as the Cartan matrix in the pole-jet/Levi realization;
- (D) as the split Jordan tripotent in the TKK realization.

The explicit symplectic intertwiner converts one role into the other. Conflating them without this map would be a type error.

## 7. Consequences for the programme

The response-to-Jordan chain is now

\[
\text{pole jet }\mathfrak{sl}_2
\xrightarrow{\text{explicit symplectic transform}}
\text{TKK triple of }D
\subset
\mathfrak{sp}_4(\mathbb R).
\]

This closes the algebraic Jordan-object identification up to the physical meaning of the canonical transform.

It also explains why the programme repeatedly selects an ordered pair rather than one channel:

\[
D=e_+-e_-.
\]

The split tripotent is the relationship between the two primitive faces.

## 8. Stop-everything and falsification tests

**Physical-canonical trigger:** the source boundary action implements (Q_2=p_2, P_2=-q_2) as the established Fourier/sideband or bound/free exchange.

**Furey trigger:** the (h\chi) grading descends to the same (D) in the TKK Jordan slots under the source intertwiner.

**Peirce trigger:** (e_+) and (e_-) coincide with the physical normal/tangent residual channels and Higgs exchange swaps them.

**Full-closure trigger:** adjoining the remaining (H_2(\mathbb R)) translation and conformal generators to this split triple reproduces the already certified ten-dimensional (\mathfrak{sp}_4) basis with correct physical labels.

**Falsifier:** the pole-jet triple is identified with a primitive idempotent despite the rank invariant.

**Falsifier:** it is identified with the positive identity orbit despite the real inertia mismatch.

**Boundary warning:** the canonical coordinate exchange is treated as physically derived merely because it is symplectic.

## Verdict

| Question | Verdict |
|---|---|
| Is the pole-jet triple a primitive-idempotent TKK triple? | **No** |
| Is it the positive identity TKK orbit? | **No over real (Sp_4)** |
| What is its Jordan object? | **The split involution/tripotent (D)** |
| Is the conjugacy explicit? | **Yes** |
| Does (D) package the normal/tangent primitive pair? | **Yes, (D=e_+-e_-)** |
| Is the physical origin of the symplectic coordinate exchange derived? | **No** |

## Position in the corpus

- [pole-jet (\mathfrak{sl}_2\subset\mathfrak{sp}_4)](1037_the_pole_jet_residue_shear_and_furey_grading_close_an_exact_sl2_triple_inside_sp4_but_the_physical_jordan_idempotent_is_still_untyped.md)
- [graded-reactance/TKK unit bridge](../0900-0999/987_the_hchi_graded_reactance_fold_identifies_the_silver_checkpoint_with_the_joint_tkk_unit_fixed_point.md)
- [Furey grading/Coxeter normalization](../0900-0999/989_the_furey_higgs_product_grading_is_the_silver_reactance_direction_and_a2_monodromy_fixes_its_unit_amplitude.md)
- [normal/tangent carrier shears](../0900-0999/985_higgs_exchanges_the_two_carrier_shears_hchi_orients_them_and_only_response_anisotropy_can_select_a_channel.md)
