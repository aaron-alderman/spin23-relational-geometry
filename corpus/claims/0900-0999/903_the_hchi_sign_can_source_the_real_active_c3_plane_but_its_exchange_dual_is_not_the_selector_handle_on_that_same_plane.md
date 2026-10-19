# The hχ Sign Can Source the Real Active C3 Plane, but Its Exchange Dual Is Not the Selector Handle on That Same Plane

**Date:** 17 October 2026  
**Branches:** response grading, Walsh duality, active $A_2$ plane, bilocal complexification, handle typing, and four-carrier sewing  
**Claim status:** exact compatibility/no-go theorem; preserves the $h\chi$ route to $R$ while separating it from the origin of $H$  
**Certificate:** [audit_the_real_active_plane_versus_complex_two_mode_typing_of_the_hchi_sign_exchange_pair.mjs](../../../verification/audit/audit_the_real_active_plane_versus_complex_two_mode_typing_of_the_hchi_sign_exchange_pair.mjs)

## Executive result

Document 902 identifies the product grading $h\chi$ with the missing lepton/color sign and its Walsh-dual channel translation with lepton/color exchange. Those facts are exact. They cannot both be identified with the final selector generators on one unchanged carrier.

On the two-real-dimensional aggregate plane, let

\[
D=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
X=\begin{pmatrix}0&1\\1&0\end{pmatrix},
\qquad
\varepsilon=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

Both sign and exchange reverse the area:

\[
D^T\varepsilon D=-\varepsilon,
\qquad
X^T\varepsilon X=-\varepsilon.
\]

They are reflections and are anti-symplectic on this real plane. Their paired product can generate the symplectic order-three rotation

\[
C^T\varepsilon C=\varepsilon,
\qquad
C^3=I.
\]

This is exactly the correct typing for constructing the selector's **active rank-two plane**.

If the same aggregate pair is promoted to two complex modes, then the realifications of $D$, $X$ and $C$ all become symplectic on four quadratures. In that typing, $X$ is a genuine passive mode exchange. But the order-three action also doubles:

\[
C_{\mathbb R}=C\oplus C,
\]

which has no fixed real plane and trace $-2$. The typed selector generator instead has

\[
R_{\rm typed}=I_2\oplus A_{C_3},
\]

with a fixed plane and trace $1$.

Their characters differ, so they are not conjugate.

Therefore:

\[
\boxed{
h\chi\text{ may source the real active }C_3\text{ plane},
\quad
\text{but its exchange dual is not simultaneously the final }H.
}
\]

The physical handle must still arise after the independent neutral fixed plane is adjoined and symplectically sewn, as in documents 895–897.

## 1. Two-real-dimensional typing

Every invertible map $M$ on a two-dimensional area space satisfies

\[
M^T\varepsilon M=(\det M)\varepsilon.
\]

Since

\[
\det D=det X=-1,
\]

both are anti-symplectic reflections.

The two mediator Householder maps of document 898 are likewise reflections. Their product has determinant $+1$ and is the $120^\circ$ rotation $C$. Hence the two-dimensional source-contrast plane is correctly typed as the precursor of the active relationship plane:

\[
\text{two anti-symplectic faces}
\longrightarrow
\text{one symplectic }C_3\text{ product}.
\]

There is no two-dimensional symplectic handle exchange here, because an exchange has determinant $-1$.

## 2. Complex two-mode typing

For a real orthogonal $2\times2$ matrix $U$ acting complex-linearly on two amplitudes, its realification in quadrature order $(x_1,x_2,p_1,p_2)$ is

\[
\mathcal R(U)=U\oplus U.
\]

With

\[
J_0=\begin{pmatrix}0&I\\-I&0\end{pmatrix},
\]

one has

\[
\mathcal R(U)^TJ_0\mathcal R(U)=J_0.
\]

Thus complexifying resolves the anti-symplectic problem for each reflection. In particular, $\mathcal R(X)$ is the passive two-mode exchange used in the Bogoliubov carrier.

But it changes the order-three representation. The realified rotation has characteristic polynomial

\[
(\lambda^2+\lambda+1)^2
\]

and no eigenvalue $1$. The typed selector color/order-three action has

\[
(\lambda-1)^2(\lambda^2+\lambda+1),
\]

with a two-dimensional fixed complement.

This is the same representation-character obstruction that separated the symplectic bath from the typed carrier in document 894.

## 3. Correct two-stage use

The disciplined construction is:

\[
\begin{aligned}
&\text{four Higgs-dressed response atoms}\\
&\quad\xrightarrow{\text{aggregate and retain }h\chi}
\text{real lepton/color contrast plane}\\
&\quad\xrightarrow{\text{two mediator reflections}}
\text{active }A_2\text{ plane with }C_3\\
&\quad\xrightarrow{\oplus\,(\nu^c,\nu)}
\text{fixed-plus-active rank-four lattice}\\
&\quad\xrightarrow{\text{sewn exchange}}
\text{order-18 symplectic selector}.
\end{aligned}
\]

In this chain, $h\chi$ is a boundary/local-coefficient input to the active-plane construction. It need not act as an element of the final symplectic group.

The final handle exchanges the two rank-two pieces with the orientation-reversing integral conjugator required by document 865. It is not simply the atomic channel translation compressed before sewing.

## 4. Relation to the bilocal C² carrier

Document 856 correctly shows that the final four-real carrier can be described as two complex gauge-singlet modes and that its handle is passive exchange. The present result does not contradict it.

It says the particular lepton/color aggregate plane used to derive the active Coxeter element cannot be naively identified with the complete complex two-mode carrier while retaining the correct order-three character.

An additional change of categorical level is required:

- active source contrast is a real rank-two plane;
- final bilocal response is a complex rank-two, real rank-four carrier;
- the neutral determinant plane supplies the missing fixed directions.

## 5. Consequence for the research programme

The $h\chi$ discovery survives and remains valuable:

- it supplies the missing projective sign for the paired mediator calculation;
- it converts the explicit Clebsch no-go into a conditional active-$C_3$ construction;
- it has an exact Walsh/Furey/Higgs origin.

What must not be claimed is that its compressed channel translation simultaneously derives the final four-dimensional handle.

The two selector generators now have cleanly separated candidate origins:

\[
R: \text{paired mediator reflections on the real active plane},
\]

\[
H: \text{orientation-reversing sewing between active and neutral planes}.
\]

## 6. Stop-everything and falsification criteria

**Active-plane trigger:** a physical one-face $h\chi$ insertion and two protected mediator reflections reproduce the incidence-selected $A_2$ plane and its $C_3$ action.

**Handle trigger:** an independently derived boundary map exchanges the active plane with the Higgs-dressed neutral determinant plane using the required determinant-minus-one conjugator.

**Unified-cycle trigger:** one boundary/Floquet construction realizes both stages while retaining the fixed-plus-active character.

**Character falsifier:** a doubled complex $C\oplus C$ action is identified with $I_2\oplus A$ despite different traces and fixed dimensions.

**Two-dimensional falsifier:** the exchange $X$ is called symplectic on a real area plane despite determinant $-1$.

## 7. Verdict

| Object | Real two-plane typing | Complex two-mode realification |
|---|---|---|
| $h\chi$ sign $D$ | anti-symplectic reflection | symplectic phase operation |
| channel exchange $X$ | anti-symplectic reflection | symplectic passive exchange |
| product $C_3$ | correct active symplectic rotation | doubled $C_3$, no fixed plane |
| typed selector $R$ | requires added fixed plane | $I_2\oplus A$, not $C\oplus C$ |

## 8. Position in the corpus

- [$h\chi$ supplies the missing response sign](902_the_product_of_furey_handle_and_higgs_channel_gradings_is_exactly_the_missing_lepton_color_sign_and_conditionally_reopens_the_a2_route.md)
- [bath/carrier character obstruction](../0800-0899/894_the_product_pfaffian_color_space_is_a_symplectic_bath_not_the_typed_carrier_because_its_color_character_has_no_fixed_plane.md)
- [typed fixed-plus-active carrier sewing](../0800-0899/895_normalized_color_contraction_produces_the_primitive_relationship_area_and_the_ordered_neutrino_pair_completes_the_exact_selector_lattice.md)
- [bilocal complex-two-mode selector typing](../0800-0899/856_the_minimal_bilocal_c2_carrier_supports_the_full_selector_as_typed_two_mode_bogoliubov_transformations.md)
