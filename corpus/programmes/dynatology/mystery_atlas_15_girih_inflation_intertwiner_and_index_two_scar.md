# Mystery Atlas 15: Girih Inflation, the Corpus Hyperbolic Word and the Index-Two Scar

**Date:** 24 October 2026  
**Status:** exact transformation-level bridge; carrier identification not established  
**Machine record:** [girih inflation intertwiner](girih_inflation_intertwiner_v1.json)  
**Certificate:** [girih inflation verifier](../../../verification/verify/verify_dynatology_girih_inflation_intertwiner.mjs)

## Result

The golden-ratio branch has moved beyond a shared number. The corpus's trace-three hyperbolic action is exactly the integral conjugacy class of the standard two-tile Fibonacci/Penrose inflation matrix

\[
S=\begin{pmatrix}2&1\\1&1\end{pmatrix},
\qquad \chi_S(x)=x^2-3x+1,
\qquad \operatorname{spec}(S)=\{\varphi^2,\varphi^{-2}\}.
\]

The published three-tile girih subdivision does not equal (S). It reaches (S^3) after an exact sequence of quotient, projective normalization and index-two lattice embedding. Those intermediate operations are the evidence-bearing part.

## 1. Evidence boundary

Lu and Steinhardt's [primary study](https://doi.org/10.1126/science.1135491) establishes self-similar subdivision in the Darb-i Imam girih pattern, a choice-bearing map into Penrose tiles, an asymptotic hexagon-to-bowtie ratio of \(\varphi\), and eleven local mismatches among 3,700 Penrose tiles in their reported mapping.

The exact tile-count transcription used here is published by Tennant in [*Medieval Islamic Architecture, Quasicrystals, and Penrose and Girih Tiles*](https://archive.bridgesmathart.org/2008/bridges2008-297.pdf), based on the subdivision figures. In input basis

\[
(\text{large bowtie},\text{large hexagon},\text{large decagon})
\]

and output basis

\[
(\text{small decagon},\text{small bowtie},\text{small hexagon}),
\]

the count map is

\[
G=\begin{pmatrix}14&22&80\\14&22&80\\6&10&36\end{pmatrix}.
\]

This is a girih result, not yet a muqarnas result. Its contact is with the corpus's broader architectural generative lane.

## 2. The first quotient scar

The matrix has rank two and

\[
G\begin{pmatrix}-1\\-3\\1\end{pmatrix}=0.
\]

Equivalently,

\[
\text{decagon column}=\text{bowtie column}+3\,\text{hexagon column}.
\]

The descendant-count detector cannot distinguish one large decagon from one large bowtie plus three large hexagons. Distinct coarse inputs have the same fine count record.

The first two rows of (G) are also equal, so every output satisfies

\[
n_{\rm small\ decagon}=n_{\rm small\ bowtie}.
\]

After one step, the dynamics lands in a two-dimensional image.

## 3. The surviving two-state action

Write the common decagon/bowtie count as (t) and the hexagon count as (h). On the image,

\[
Q=\begin{pmatrix}36&80\\16&36\end{pmatrix}=4B,
\qquad
B=\begin{pmatrix}9&20\\4&9\end{pmatrix}.
\]

The literal count action is (Q). Dividing by four is a projective normalization: it preserves tile-frequency ratios but is not itself the original count substitution. The normalized action has

\[
\chi_B(x)=x^2-18x+1,
\qquad \operatorname{spec}(B)=\{\varphi^6,\varphi^{-6}\},
\]

the spectrum of three iterations of (S).

## 4. Exact intertwiner and index-two scar

The spectral match lifts to the exact integer equation

\[
S^3P=PB,
\qquad
P=\begin{pmatrix}1&1\\0&2\end{pmatrix},
\qquad \det P=2.
\]

Thus (B) is rationally conjugate to (S^3), but the displayed map is not a unimodular lattice basis change. Its image has index two:

\[
\boxed{
\text{girih quotient lattice}
\hookrightarrow_{\,[\mathbb Z^2:P\mathbb Z^2]=2}
\text{three-step Penrose lattice}.
}
\]

This is not an artifact of the chosen (P). Solving the integer intertwining equation (S^3X=XB) gives the complete family

\[
X(a,c)=
\begin{pmatrix}
a&a+2c\\
c&2a-c
\end{pmatrix},
\qquad
\det X=2(a^2-ac-c^2).
\]

Every integral determinant is even, and determinant magnitude two is attained. Therefore no unimodular integral intertwiner exists and index two is minimal. Its present meaning is lattice parity, not a spin cover.

## 5. Exact relation to the corpus word

Claim 772 decomposed the corpus word into

\[
M_1=\begin{pmatrix}1&-1\\-1&2\end{pmatrix},
\qquad
M_2=\begin{pmatrix}0&1\\-1&3\end{pmatrix}.
\]

Both are unimodularly conjugate to (S):

\[
SJ=JM_1,
\quad J=\begin{pmatrix}0&1\\-1&0\end{pmatrix},
\quad \det J=1,
\]

and

\[
SK=KM_2,
\quad K=\begin{pmatrix}1&0\\-2&1\end{pmatrix},
\quad \det K=1.
\]

Hence the corpus action is not merely isospectral to Penrose inflation:

\[
\boxed{W\cong_{GL(4,\mathbb Z)}S\oplus S.}
\]

It is two independent integral copies of that action.

## 6. The Riccati contact

Claim 1138 already used the same matrix (S) as a scalar symplectic return. Under the corpus convention,

\[
f(x)=\frac{1+x}{2+x},
\qquad x_*=\varphi^{-1}.
\]

In tile-count coordinates, the Perron eigenvector of (S) is proportional to ((\varphi,1)), giving asymptotic ratio \(\varphi\). The response fixed point and tile ratio are reciprocal projective charts of the same matrix action.

This is an exact arithmetic dictionary, not yet a dictionary between architectural tiles and physical response channels.

## 7. Why this moves the corpus

The result adds four things not supplied by observing a pentagon:

1. an externally established generative transformation;
2. exact integral conjugacy to the corpus word;
3. a rank-one erased input direction in the three-tile grammar;
4. an index-two lattice obstruction between reduced girih dynamics and three Penrose/corpus steps.

The admissibility chain is

\[
\text{three tile types}
\xrightarrow{\text{rank-two quotient}}
\text{frequency dynamics}
\xrightarrow{\text{projectivize}}
B
\xrightarrow{\det P=2}
S^3.
\]

## 8. What remains unlicensed

The carriers differ:

- girih uses a nonnegative tile-count cone and geometric subdivision;
- Penrose refinement uses two tile types and discrete choices when applied to girih tiles;
- the corpus word acts on a signed integral homology/symplectic response lattice.

Equal matrices do not identify those carriers. This does not prove that muqarnas tiers obey girih substitution, tile counts are response amplitudes, the index-two scar is a spin cover, or (H_4/E_8) generates the subdivision.

## 9. Next decisive calculation

The remaining gate is a typed lift of (P) from counts to boundary words:

\[
\begin{array}{ccc}
\text{girih boundary module} & \xrightarrow{\widetilde P} & \text{Penrose/corpus boundary module}\\
\downarrow G && \downarrow S^3\\
\text{girih boundary module} & \xrightarrow{\widetilde P} & \text{Penrose/corpus boundary module}.
\end{array}
\]

Failure because refinement choices obstruct boundary matching would close the result at count level. A local orientation-preserving lift that predicts mismatch locations would promote it to a compiler morphism.

## Decision

The golden ratio is no longer merely a motif signpost. Medieval girih subdivision and the corpus hyperbolic selector share an exact projective integral transformation after declared reductions. The kernel and index-two mismatch are retained as quotient scars. The branch advances to boundary-word lifting, not to a physical or exceptional-algebra identification.

## Corpus companions

- [Golden ratio as local fivefold module](mystery_atlas_14_golden_ratio_local_module.md)
- [Parity triangle and three-step return](mystery_atlas_16_parity_triangle_and_three_step_return.md)
- [Hyperbolic selector word](../../claims/0700-0799/772_the_hyperbolic_selector_word_is_a_reducible_pair_of_trace_three_handle_maps_with_golden_ratio_squared_stretch.md)
- [Natural Spin(2,3) Riccati return](../../claims/1100-1199/1138_the_natural_spin23_riccati_return_is_fixed_transport_not_yet_a_feedback_bifurcation.md)
- [Quotient-scar programme](../quotient-scars/README.md)
