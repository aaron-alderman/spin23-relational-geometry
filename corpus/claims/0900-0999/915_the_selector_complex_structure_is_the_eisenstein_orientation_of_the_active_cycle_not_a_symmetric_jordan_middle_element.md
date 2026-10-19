# The Selector Complex Structure Is the Eisenstein Orientation of the Active Cycle, Not a Symmetric Jordan Middle Element

**Date:** 17 October 2026  
**Branches:** Jordan-middle typing, Furey frame comparison, selector complex structure, Eisenstein orientation, and neutral Peirce matching  
**Claim status:** exact typing and no-go theorem; source-native Furey intertwiner remains open  
**Certificate:** [type_the_selector_complex_structure_against_jordan_middle_elements_and_furey_frames.mjs](../../../verification/type/type_the_selector_complex_structure_against_jordan_middle_elements_and_furey_frames.mjs)

## Executive result

The unique selector-compatible complex structure from documents 913–914 is completely determined by the active order-three cycle and handle:

\[
\mathcal I_{0,\mathrm{act}}
=-(I+2A),
\qquad
\mathcal I_{0,\mathrm{act}}^2=-3I,
\]

where

\[
A=\begin{pmatrix}1&3\\-1&-2\end{pmatrix},
\qquad
A^3=I.
\]

The handle conjugator transports it to the neutral plane:

\[
\mathcal I_{0,\nu}
=X\mathcal I_{0,\mathrm{act}}X,
\qquad
X=\begin{pmatrix}1&1\\0&-1\end{pmatrix}.
\]

Conversely,

\[
A=-\frac12(\mathcal I_{0,\mathrm{act}}+I).
\]

Thus the integral $\sqrt{-3}$ orientation and the active Coxeter rule contain the same information once orientation is chosen.

Crucially, this operator cannot be the symmetric middle argument of the $H_2(\mathbb R)$ Jordan triple, nor the positive Furey middle-slot frame. A real symmetric matrix cannot square to $-3I$.

The correct relation is

\[
\mathcal I_0=3G_0^{-1}J:
\]

the complex orientation is derived from the combination of a positive response metric and an alternating symplectic form. It is an automorphism/orientation operator **of** the Jordan response geometry, not an element **in** the symmetric Jordan carrier.

## 1. Active Eisenstein orientation

The active integral generator satisfies

\[
A^2+A+I=0.
\]

Therefore

\[
(I+2A)^2
=I+4A+4A^2
=-3I.
\]

The sign selected by the carrier symplectic orientation gives

\[
\mathcal I_{0,\mathrm{act}}=-(I+2A)
=\begin{pmatrix}-3&-6\\2&3\end{pmatrix}.
\]

This is the integral Eisenstein orientation associated with the $A_2$ rotation. Dividing by $\sqrt3$ gives the normalized real complex structure.

## 2. Handle transport to the neutral plane

The handle block $X$ is an involution. Commutation of the full complex structure with the four-dimensional handle requires

\[
\mathcal I_{0,\nu}X=X\mathcal I_{0,\mathrm{act}}.
\]

Hence

\[
\mathcal I_{0,\nu}
=X\mathcal I_{0,\mathrm{act}}X
=\begin{pmatrix}-1&2\\-2&1\end{pmatrix},
\]

which again squares to $-3I$.

The neutral orientation is therefore not chosen independently. Once the active Coxeter orientation and handle are fixed, it is forced.

## 3. Symmetric negative-square no-go

Let

\[
S=\begin{pmatrix}a&b\\b&c\end{pmatrix}
\]

be real symmetric. Then

\[
\operatorname{tr}(S^2)=a^2+c^2+2b^2\ge0.
\]

If $S^2=-3I$, its trace would be $-6$, a contradiction.

Therefore none of the following can equal $\mathcal I_0$ directly:

- a symmetric Feshbach propagator $G$;
- a symmetric Jordan middle argument in $H_2(\mathbb R)$;
- the positive Hilbert--Schmidt middle-slot frame $\mathcal B^*\mathcal B$;
- a positive spectral residue.

This is a typing theorem, not a failure of the Jordan programme. Those symmetric objects supply $G_0$; the alternating sewing supplies $J$; their ratio supplies the complex orientation.

## 4. Correct Jordan relationship

The established identity is

\[
\mathcal I_0=3G_0^{-1}J.
\]

This is analogous to the construction of a complex structure from a compatible metric and symplectic form in Kähler geometry.

Accordingly, the programme now contains three distinct “middle” objects:

1. **Jordan middle argument:** the symmetric internal propagator in $\{A,G,C\}$;
2. **Furey middle-slot frame:** the positive operator measuring all outer relations mediated by a candidate;
3. **selector complex orientation:** $G_0^{-1}J$, an endomorphism of the completed four-carrier.

They are linked, but they are not the same matrix.

## 5. Comparison with the neutral Furey Peirce candidate

Document 251 isolated the gauge-neutral $D\leftrightarrow E$ Peirce complex line as the only current source-native Furey candidate with square $-I$.

After normalization, it has the same real conjugacy type as

\[
\mathcal I_\nu=\mathcal I_{0,\nu}/\sqrt3.
\]

But every oriented real two-plane has that conjugacy type. Physical identification still requires an intertwiner which simultaneously respects:

- the neutrino Peirce arrow;
- Higgs/Yukawa dressing;
- the primitive neutral determinant area;
- the handle transport to the active $A_2$ orientation;
- the selector-invariant metric.

The new result makes this test rigid: the target operator is no longer arbitrary. It is the explicit matrix $\mathcal I_{0,\nu}$ in the primitive carrier basis.

## 6. Consequence for “A X B”

The original nested-dolls intuition should now be written with typed layers:

\[
A\,G\,B
\xrightarrow{\text{polarization}}
\{A,G,B\}
\xrightarrow{\text{frame/response reduction}}
G_0
\xrightarrow{\text{symplectic sewing }J}
\mathcal I_0=3G_0^{-1}J.
\]

The $X$ in the first expression is a symmetric propagator or relational metric. The orientation operator appears only after the alternating sewing is supplied.

This is a more precise nested-dolls mechanism than identifying every intermediate operator with the final complex structure.

## 7. Stop-everything and falsification criteria

**Furey-intertwiner trigger:** the neutral Peirce multiplication-by-$i$ maps to $\mathcal I_{0,\nu}/\sqrt3$ while preserving the Higgs-dressed response metric and determinant area.

**Frame trigger:** the completed Furey middle-slot frame reduces to the unique $G_0$ ray on the full neutral-plus-active carrier.

**Sewing trigger:** the same reduction supplies the alternating form $J$, so that $3G_0^{-1}J$ is derived rather than assembled.

**Typing falsifier:** a real symmetric middle propagator or positive frame is asserted to equal an operator squaring to $-I$.

**Orbit-warning:** matching only the negative-square conjugacy class is called a physical intertwiner.

## 8. Verdict

| Question | Verdict |
|---|---|
| Is the selector complex structure determined by the active $C_3$? | **yes** |
| Is its neutral block fixed by the handle? | **yes** |
| Can it be a symmetric Jordan middle element? | **no** |
| Is it derived from metric plus symplectic form? | **yes** |
| Does the neutral Furey Peirce $J$ have the same orbit type? | **yes** |
| Is the source-native intertwiner proved? | **not yet** |

## 9. Position in the corpus

- [selector centralizer and integral $\sqrt{-3}$ orientation](914_the_full_selector_centralizer_is_complex_scalar_and_its_commuting_symplectic_dynamics_is_only_u1.md)
- [unique selector-invariant metric](913_the_full_selector_fixes_a_unique_positive_response_metric_and_a_compatible_complex_structure.md)
- [Furey middle-slot frame](../0800-0899/878_the_basis_independent_middle_slot_frame_of_the_furey_triple_selects_the_same_signed_k3_active_module.md)
- [Jordan triple as polarized Feshbach self-energy](../0600-0699/668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
- [neutral Peirce complex-structure candidate](../0200-0299/251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md)
