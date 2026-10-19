# Universal Abelianized Evaluation Recovers an Exact One-Carrier/Two-Face Quotient

> **Cycle 485 qualification.** “Two-face” here names the tensor-position interpretation. Turning the target into a matrix algebra requires a contraction between its two distinct two-dimensional factors. The normalized orthogonal-face axioms select that contraction uniquely, but those axioms are not yet derived from the raw cocycle. See [the exact contraction audit](569_the_two_named_peirce_faces_uniquely_select_the_contraction_and_an_exact_split_jordan_lift.md).

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact finite cohomological construction in the certified wreath presentation; physical carrier/face interpretation remains a candidate bridge

## Executive result

The failed attempt to map the stationary plane directly into tangent coinvariants has a nontrivial resolution.

There are two distinguished one-dimensional lines:

\[
L_U=U/(U\cap B^1),
\qquad
L_R=R/\overline{B^1}.
\]

The first is the unique non-coboundary direction inside the ten-dimensional continuing plane. The second is the unique non-coboundary moving direction in the seven-dimensional lift quotient.

Let

\[
S=Q/R=\langle e_0,e_4\rangle
\]

be the stationary two-plane. Universal evaluation against the two generators of

\[
G_{\rm ab}\cong C_2\oplus C_2
\]

defines a map

\[
\mathcal E:
L_U\oplus L_R\oplus S
\longrightarrow
\operatorname{Hom}(G_{\rm ab},\mathfrak o_G),
\]

where

\[
\mathfrak o_G\cong W_G\cong\mathbb F_2^2.
\]

In the certificate bases, the four source generators have images

\[
\boxed{
u\mapsto1000,\qquad
e_1\mapsto1000,\qquad
e_0\mapsto0100,\qquad
e_4\mapsto0001.}
\]

Therefore

\[
\operatorname{rank}\mathcal E=3
\]

and

\[
\boxed{\ker\mathcal E=\langle u+e_1\rangle.}
\]

Consequently:

\[
\boxed{
\frac{L_U\oplus L_R\oplus S}
{\langle u+e_1\rangle}
\hookrightarrow
\operatorname{Hom}(G_{\rm ab},\mathfrak o_G)
}
\]

is a faithful three-dimensional representation of the residual data.

The diagonal relation identifies the discarded cohomology line \(L_U\) with the moving line \(L_R\), leaving:

\[
\boxed{
\text{one diagonal carrier line}
\oplus
\text{two independently resolved stationary face lines}.}
\]

This is an exact finite-cohomological realization of the programme’s \(1+2\) relational language. It is not yet a derivation of spacetime, particles or dynamics.

## 1. Why direct stationary evaluation failed

Cycle 481 proved:

- \(W_G\cong\mathfrak o_G\cong\mathbb F_2^2\);
- no nonidentity raw evaluation descends to \(Q=Z^1/U\);
- after coinvariant projection, only the exchange evaluation descends to \(Q/R\);
- that clean evaluation detects \(e_4\) but kills \(e_0\).

The local-reflection evaluation has the missing rank, but it is nonzero on \(U\). It was therefore excluded from the direct map

\[
Q/R\to\mathfrak o_G.
\]

The new question is not whether that dependence can be ignored, but whether it is concentrated on a canonical quotient of \(U\).

## 2. The contamination is purely non-coboundary

The continuing plane satisfies

\[
\dim U=10,
\qquad
\dim(U\cap B^1)=9.
\]

Thus

\[
L_U=U/(U\cap B^1)\cong\mathbb F_2.
\]

The certificate evaluates the local-reflection channel on all nine directions in \(U\cap B^1\) and obtains zero:

\[
\boxed{
\overline{\operatorname{ev}}_a(U\cap B^1)=0.}
\]

Its image on \(U\) has rank one. Therefore the entire failure to descend through \(U\) is carried by the single cohomology line \(L_U\):

\[
U\longrightarrow L_U\longrightarrow\mathfrak o_G.
\]

The obstruction is not spread across arbitrary continuing choices or infinitesimal conjugations.

## 3. The moving line has the same image

The moving quotient is

\[
L_R=R/\overline{B^1}\cong\langle e_1\rangle.
\]

In the selected tangent-coinvariant basis, local-reflection evaluation gives

\[
\overline{\operatorname{ev}}_a(u)=10
\]

for the nonzero class \(u\in L_U\), and

\[
\overline{\operatorname{ev}}_a(e_1)=10.
\]

Hence

\[
\boxed{
\overline{\operatorname{ev}}_a(u+e_1)=0.}
\]

Over \(\mathbb F_2\), two nonzero one-dimensional spaces have a unique nonzero isomorphism. Evaluation therefore supplies a distinguished diagonal relation:

\[
L_U\overset{\sim}{\longrightarrow}L_R.
\]

This is the key step that the direct quotient \(Q=Z^1/U\) erased: the line removed with \(U\) and the line retained as moving data are evaluation-equivalent.

## 4. Universal rather than single-element evaluation

Coinvariant projection makes a one-cocycle additive, so evaluation factors through

\[
G_{\rm ab}.
\]

For

\[
G=S_3\wr C_2,
\]

the abelianization has two canonical wreath-type directions:

1. the common sign of the base \(S_3\) factors, represented by a local reflection \(a\);
2. exchange of the two \(S_3\) factors, represented by \(t\).

The order-three generator \(b\) vanishes in binary abelianization.

Instead of choosing one group element, retain both channels:

\[
\mathcal E(x)
=
\bigl(
\overline{\operatorname{ev}}_a(x),
\overline{\operatorname{ev}}_t(x)
\bigr)
\in
\operatorname{Hom}(G_{\rm ab},\mathfrak o_G).
\]

Since both \(G_{\rm ab}\) and \(\mathfrak o_G\) have dimension two, the target has dimension four.

## 5. Exact image table

Order the target bits as:

\[
(a\otimes\bar w_1,\,
a\otimes\bar w_2,\,
t\otimes\bar w_1,\,
t\otimes\bar w_2).
\]

The certified source table is:

| source class | universal evaluation |
|---|---|
| \(u\in L_U\) | \(1000\) |
| \(e_1\in L_R\) | \(1000\) |
| \(e_0\in S\) | \(0100\) |
| \(e_4\in S\) | \(0001\) |

Three facts are immediate:

1. \(u\) and \(e_1\) are identified;
2. \(e_0\) and \(e_4\) remain distinct despite taking values in the same tangent-coinvariant direction, because they occupy different abelianized evaluation channels;
3. the fourth target corner \(t\otimes\bar w_1\) is absent.

Exact elimination gives:

\[
\operatorname{rank}\{1000,1000,0100,0001\}=3
\]

and the only nonzero kernel vector is

\[
(1,1,0,0).
\]

Thus:

\[
\ker\mathcal E=\langle u+e_1\rangle.
\]

## 6. The exact \(1+2\) quotient

Define

\[
\mathcal R
=
\frac{L_U\oplus L_R\oplus S}
{\langle u+e_1\rangle}.
\]

Then

\[
\dim\mathcal R=1+1+2-1=3
\]

and universal evaluation is injective on \(\mathcal R\):

\[
\boxed{
\mathcal R\hookrightarrow
G_{\rm ab}^*\otimes\mathfrak o_G.}
\]

A basis is:

\[
\begin{aligned}
c&=[u]=[e_1],\\
f_0&=e_0,\\
f_4&=e_4.
\end{aligned}
\]

Their images are:

\[
c\mapsto a^*\otimes\bar w_1,
\]

\[
f_0\mapsto a^*\otimes\bar w_2,
\]

\[
f_4\mapsto t^*\otimes\bar w_2.
\]

This is an exact tensor-position distinction:

- the carrier and first face share the local-reflection channel but use different tangent residues;
- the second face shares the tangent residue with the first face but uses the exchange channel.

The three classes form an “L” inside the four-dimensional tensor square, with the \(t^*\otimes\bar w_1\) corner missing.

## 7. Relation to “one carrier, two faces, three relationships”

The construction now supports a precise finite statement:

\[
\boxed{
\text{one diagonal transport class}
\quad+\quad
\text{two channel-distinguished stationary classes}.}
\]

The word **carrier** can be attached provisionally to

\[
c=[u]=[e_1],
\]

because it is the identification between:

- a continuing cohomology direction, and
- the unique level-moving quotient direction.

The word **faces** can be attached provisionally to \(e_0,e_4\), because they are stationary and remain separately visible in the universal evaluation tensor.

What has been proved is the quotient and injection. No physical ontology follows merely from those names.

## 8. Relation to the glue/Heisenberg branch

The universal target is

\[
G_{\rm ab}^*\otimes\mathfrak o_G,
\]

not the glue face \(\overline H_M\).

Nevertheless, it clarifies what any future glue map must do. A two-bit glue face cannot receive all three residual classes injectively. It must either:

- retain only the two stationary faces;
- combine the carrier with one face;
- or appear as one factor of the tensor target rather than its whole.

The missing fourth tensor corner

\[
t^*\otimes\bar w_1
\]

is a new precise target. If the opposite discriminant-glue face, a dual cocycle construction or Jordan-triple recursion supplies this corner, the \(3\)-dimensional “L” would complete to a \(2\times2\) relational square.

That would be a stop-everything result because the fourth corner is not inserted arbitrarily: its location is forced by the three established ones.

> **Cycle 483 refinement.** The three occupied corners are exactly the upper-triangular algebra \(T_2(\mathbb F_2)\). Its missing corner is \(E_{21}\), and the native TRO product forces it directly: \(E_{22}E_{12}^TE_{11}=E_{21}\). The TRO envelope is therefore the full \(M_2(\mathbb F_2)\). See [The three-corner residual is the \(A_2\) path algebra, and TRO closure forces the reverse arrow](567_the_three_corner_residual_is_the_A2_path_algebra_and_TRO_closure_forces_the_reverse_arrow.md).

## 9. Claim-status discipline

### Established

- \(L_U\) and \(L_R\) are each one-dimensional;
- local-reflection evaluation kills \(U\cap B^1\);
- it maps the nonzero classes of \(L_U\) and \(L_R\) to the same nonzero tangent coinvariant;
- universal abelianized evaluation has rank three on \(L_U\oplus L_R\oplus S\);
- its kernel is exactly \(\langle u+e_1\rangle\);
- the resulting three-dimensional quotient injects into \(G_{\rm ab}^*\otimes\mathfrak o_G\);
- the image occupies exactly three corners of a \(2\times2\) tensor square.

### Candidate bridge

- \([u]=[e_1]\) is the finite carrier;
- \(e_0,e_4\) are its two faces;
- the missing fourth tensor corner is the opposite/dual relational completion;
- the tensor square is the finite shadow of a Jordan-triple or Heisenberg composition.

### Not established

- an identification with named Standard-Model observables;
- an isomorphism with the discriminant-glue Lagrangian pair;
- a canonical fourth-root phase or symplectic pairing on \(\mathcal R\);
- an all-level two-adic theorem;
- a dynamical or spacetime interpretation.

## 10. Stop-everything and falsification gates

### Stop-everything result reached

The residual \(1+2\) structure is no longer only a dimensional flag. After restoring the unique cohomology line removed by \(U\) and identifying it diagonally with the moving line, universal evaluation gives a faithful, explicitly positioned three-dimensional tensor image.

### Next stop-everything gates

1. Derive the missing \(t^*\otimes\bar w_1\) corner from the opposite glue face or a dual cocycle.
2. Map the two glue parity labels into the two tensor factors without choosing a basis by hand.
3. Derive the Heisenberg commutator as a cross-pairing of the completed \(2\times2\) square.
4. Identify \(c,f_0,f_4\) with named Furey or Standard-Model invariants.

### Falsification boundaries

- the construction depends on the certified wreath-product structure and its two abelianized channels;
- “carrier” and “faces” are interpretations of exact quotient classes, not physical conclusions;
- the absent fourth corner must not be silently added;
- injection into a tensor product does not by itself provide a multiplication, symplectic form or quantum state space.

## Certificate and companions

- [Universal evaluation certificate](scripts/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [One-bit evaluation boundary](565_the_tangent_coinvariants_match_the_correction_coinvariants_but_evaluation_recovers_only_one_stationary_bit.md)
- [Exact \(4+1+2\) flag](562_the_seven_dimensional_lift_quotient_has_an_exact_four_plus_one_plus_two_flag.md)
- [Glue-derived Heisenberg commutator](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
