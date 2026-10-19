# The Carrier-Selecting Shear Is a Translation-Dressed Special-Conformal Generator in One Peirce Channel

**Date:** 18 October 2026  
**Branches:** Jordan/TKK transport, Peirce channels, normal/tangent choice, conformal sl2, and carrier selection  
**Claim status:** exact transported-generator identity  
**Certificate:** [transport_the_carrier_selecting_transvections_to_the_jordan_tkk_channels.mjs](../../../verification/transport/transport_the_carrier_selecting_transvections_to_the_jordan_tkk_channels.mjs)

## Executive result

The two primitive shears that map the recursion saturation to the common-mode carrier have now been transported back to the canonical Jordan/TKK basis.

They are not the off-diagonal relationship translation. Instead:

\[
e_3\longleftrightarrow\text{tangent }E_{22}\text{ channel},
\qquad
e_4\longleftrightarrow\text{normal }E_{11}\text{ channel}.
\]

For either diagonal Peirce channel $i$, let

- $T_i$ be its Jordan translation;
- $C_i$ be its special-conformal/opposite-grade translation;
- $H_i$ be its dilation generator.

The carrier-selecting rank-one nilpotent is exactly

\[
\boxed{N_i=C_i+H_i-T_i.}
\]

More strongly,

\[
\boxed{
N_i=\operatorname{Ad}_{\exp(T_i)}C_i,
\qquad
\exp(T_i)=I+T_i.
}
\]

Thus the minimal relational shear is a translation-dressed special-conformal generator inside one channel’s $\mathfrak{sl}_2$ conformal triple.

## 1. Explicit channel matrices

For $E_i=E_{ii}$, write

\[
T_i=
\begin{pmatrix}0&E_i\\0&0\end{pmatrix},
\quad
C_i=
\begin{pmatrix}0&0\\E_i&0\end{pmatrix},
\quad
H_i=
\begin{pmatrix}E_i&0\\0&-E_i\end{pmatrix}.
\]

Then

\[
N_i=
\begin{pmatrix}
E_i&-E_i\\
E_i&-E_i
\end{pmatrix},
\qquad
N_i^2=0.
\]

Since $T_i^2=0$,

\[
\exp(T_i)=I+T_i,
\]

and direct multiplication gives

\[
(I+T_i)C_i(I-T_i)=C_i+H_i-T_i.
\]

## 2. Normal versus tangent

The coordinate transports give

\[
N_{e_3}=N_{22},
\qquad
N_{e_4}=N_{11}.
\]

Hence the twofold transvection ambiguity of document 983 is exactly the normal/tangent choice already present in the silver response and Jordan cone charts.

Arithmetic treats the two diagonal idempotents symmetrically. It cannot choose between them. The physical selector must come from data that already distinguishes the channels:

- unequal silver scales;
- face reflection/Higgs population swap;
- Pfaffian orientation;
- loss ordering;
- boundary normal-versus-tangent geometry.

## 3. Bound/free and singular/relationship interpretation

Each diagonal Peirce channel contains the conformal triple

\[
(T_i,H_i,C_i).
\]

Translation and special conformal transformation are the two nilpotent ends; dilation sits between them. The selected shear is not one end alone but the conjugate of the opposite end by the first.

This gives an exact algebraic version of the project’s bound/free intuition:

\[
\text{free translation}
\quad\stackrel{\operatorname{Ad}}{\longleftrightarrow}\quad
\text{dressed opposite-grade/boundary operation},
\]

with the dilation necessarily appearing in the composite. No Efimov or Casimir dynamics is derived here, but the conformal $\mathfrak{sl}_2$ structure to which such threshold phenomena would couple is explicit.

## 4. Relation to the off-diagonal relationship

The finite carrier map does not use $T_r=T(E_{12}+E_{21})$. This does not make the relationship direction dispensable.

- A diagonal dressed shear selects $W_P$ from the recursion saturation.
- The off-diagonal relationship is still required for the four physical seeds to close from two uncoupled channel algebras to full $\mathfrak{sp}(4)$.
- Placement completion can use any conjugate translation only because the first placement already contains the relational generator.

Carrier selection and inter-channel coupling are therefore separate roles.

## 5. Stop-everything tests

**TKK typing trigger — passed:** the two finite shears transport exactly to $N_{22}$ and $N_{11}$.

**Conformal conjugacy trigger — passed:** $N_i=\operatorname{Ad}_{\exp(T_i)}C_i$.

**Relationship falsifier — passed negatively:** neither shear is the off-diagonal relationship translation.

**Channel-selection trigger:** derive whether the physical carrier uses $N_{11}$ or $N_{22}$ from Higgs, loss, Pfaffian, or boundary data.

**Microscopic-action trigger:** a Jordan/Furey action independently supplies $T_i$ and $C_i$, so their conjugation is dynamical rather than an imposed matrix identity.

## Verdict

| Question | Verdict |
|---|---|
| What is the $e_3$ shear? | **Tangent-channel $N_{22}$** |
| What is the $e_4$ shear? | **Normal-channel $N_{11}$** |
| Is either the off-diagonal relationship? | **No** |
| Exact TKK form? | **$C_i+H_i-T_i$** |
| Exact group interpretation? | **$\operatorname{Ad}_{\exp(T_i)}C_i$** |
| What remains open? | **Physical normal-versus-tangent selection** |

## Position in the corpus

- [minimal carrier transvection](983_a_single_imaginary_quadrature_symplectic_transvection_maps_the_recursion_saturation_to_the_common_mode_carrier.md)
- [physical Jordan-handle closure](971_two_face_translations_their_off_diagonal_relationship_and_one_grade_reversing_handle_generate_all_of_sp4.md)
- [silver/Jordan channel parity threshold](965_the_silver_loss_law_fits_one_global_diagonal_jordan_cone_chart_only_above_a_finite_attenuation_threshold.md)
- [two-chart Jordan/Hopf atlas](966_two_jordan_cone_charts_cover_every_positive_a2_loss_density_and_their_transition_is_the_hopf_complex_structure.md)
