# Frontier Wave 6.9: Triality--Furey Intertwiner Boundary

**Date:** 24 October 2026  
**Status:** exact two-plane intertwiner classification; reflection identification remains unproved  
**Certificate:** [verify_triality_furey_complex_intertwiner_boundary.mjs](../../../../verification/verify/verify_triality_furey_complex_intertwiner_boundary.mjs)

## Result

The oriented magic-square triality sector and the Furey/Clifford response sector now have the same local linear-algebra type:

\[
(D_{\rm tri},J_{\rm tri}),
\qquad
(D_{\rm F},J_{\rm F}),
\]

where each \(D\) is a real two-plane and

\[
J_{\rm tri}^2=J_{\rm F}^2=-1.
\]

This makes a complex-linear bridge possible, but not unique.

Choose oriented orthonormal bases so both complex structures are

\[
J=
\begin{pmatrix}
0&-1\\
1&0
\end{pmatrix}.
\]

A real map \(T:D_{\rm tri}\to D_{\rm F}\) intertwines the complex structures when

\[
TJ=JT.
\]

The complete solution is

\[
T=aI+bJ.
\]

Therefore

\[
\dim_{\mathbb R}\operatorname{Hom}_{\mathbb C}
(D_{\rm tri},D_{\rm F})=2.
\]

After unit normalization, the ambiguity is a full phase circle \(U(1)\). The new canonical \(J_{\rm tri}\) does not by itself select the Furey/response angle.

## What would collapse the ambiguity

Let the sheet transposition act as

\[
K_{\rm tri}=
\begin{pmatrix}
1&0\\
0&-1
\end{pmatrix},
\qquad
K_{\rm tri}J_{\rm tri}K_{\rm tri}=-J_{\rm tri}.
\]

Furey conjugation acts similarly on its even/odd response plane:

\[
K_{\rm F}J_{\rm F}K_{\rm F}=-J_{\rm F}.
\]

If a physical bridge identifies these real structures,

\[
TK_{\rm tri}=K_{\rm F}T,
\]

then \(b=0\) and

\[
T=aI.
\]

The two-real-dimensional phase ambiguity collapses to one real ray; unit normalization leaves only \(T=\pm I\).

This is the exact missing datum:

> identify the magic-square sheet reflection with Furey conjugation on the same physical carrier.

## Why the identification cannot be assumed

The two involutions presently act on differently typed objects:

- \(K_{\rm tri}\) exchanges triality sheets or reverses their cyclic orientation;
- \(K_{\rm F}\) conjugates the selected complex octonionic direction and separates even/odd response axes.

Their matrices can be made identical after choosing bases, but matrix equality is not an intertwiner. A valid identification must preserve:

1. the Standard-Model gauge action;
2. the CAR or TRO product;
3. the matter/response factorization;
4. the exceptional polarized cubic or another source map; and
5. the conjugation parity of the observable response.

This restates and sharpens the two-dimensional ambiguity in [claim 325](../../../claims/0300-0399/325_the_triality_orbit_has_a_unique_sign_cubic_but_it_does_not_yet_fix_the_cp_doublet.md) and the response-line circle in [claim 709](../../../claims/0700-0799/709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md).

## Implication for the quarter-turn motif

The quarter-turn is now present on both sides:

\[
J_{\rm tri}
\quad\text{and}\quad
J_{\rm F}.
\]

But the space of maps taking one quarter-turn to the other is itself a phase circle. “Both sides contain \(i\)” establishes compatibility, not alignment.

The reflection data are what can turn compatibility into a selected real axis. This matches the broader corpus pattern:

\[
\text{complex structure}
+\text{real structure}
\longrightarrow
\text{oriented real form}.
\]

## Branch verdict

The abstract intertwiner classification is exhausted:

| Requirements on \(T\) | Real dimension | Normalized ambiguity |
|---|---:|---|
| arbitrary real-linear | 4 | \(O(2)\)-scale family |
| complex-linear | 2 | \(U(1)\) |
| complex-linear and matched-reflection | 1 | \(\mathbb Z_2\) |
| plus orientation/sign convention | 1 positive ray | unique after normalization |

The branch remains open only at the typed identification of the two reflections. Without that map, triality does not select the Furey response line or CP phase.

