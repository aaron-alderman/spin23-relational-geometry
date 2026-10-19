# The binary lift offsets reproduce the \(5+2\) filtration of the correction module

## Executive result

The fixed affine lifting geometry now has explicit coordinates.

The ten-dimensional continuing direction space

\[
U\subset\mathbb F_2^{17}
\]

has a seven-dimensional quotient

\[
Q=\mathbb F_2^{17}/U.
\]

Across the compatible tower through \(2^{16}\), the affine offsets

\[
q_n\in Q
\]

span a five-dimensional subspace:

\[
\boxed{\dim\langle q_n\rangle=5.}
\]

Two quotient functionals remain identically zero:

\[
\boxed{\dim\bigl(Q/\langle q_n\rangle\bigr)=2.}
\]

This exactly matches the independently computed filtration of the seven-dimensional first congruence correction module \(W\):

\[
\boxed{
\dim[G,W]=5,
\qquad
\dim W_G=2.}
\]

Thus both constructions have the same \(5+2\) architecture:

\[
0\to\text{five moving directions}
\to\text{seven-dimensional module}
\to\text{two stationary coinvariants}
\to0.
\]

The dimensional and dynamical match is exact. A canonical basis-level intertwiner \(Q\to W\) has not yet been constructed, so equality of the two modules remains a candidate theorem rather than an established identification.

## 1. Explicit basis of the fixed ten-plane

Write a 17-bit vector as an integer mask in the fixed free-variable coordinates of the presentation lift.

One basis of the stationary ten-plane \(U\) is:

\[
\boxed{
6,\ 16,\ 40,\ 76,\ 128,\ 352,\ 1024,\ 8512,\ 16384,\ 73728.}
\]

In bit-support notation these are:

\[
\begin{aligned}
6&=\{1,2\},\\
16&=\{4\},\\
40&=\{3,5\},\\
76&=\{2,3,6\},\\
128&=\{7\},\\
352&=\{5,6,8\},\\
1024&=\{10\},\\
8512&=\{6,8,13\},\\
16384&=\{14\},\\
73728&=\{13,16\}.
\end{aligned}
\]

Here bit positions begin at zero.

Every freely continuing correction direction is a binary combination of these ten masks.

## 2. Seven quotient functionals

The annihilator

\[
U^\perp\subset(\mathbb F_2^{17})^*
\]

has dimension seven. A basis is represented by the masks

\[
\boxed{
1,\ 326,\ 73832,\ 512,\ 2048,\ 4096,\ 32768.}
\]

Define

\[
\pi:\mathbb F_2^{17}\to\mathbb F_2^7
\]

by

\[
\pi_i(x)=\langle \lambda_i,x\rangle\pmod2,
\]

where the \(\lambda_i\) are the seven displayed masks.

Then

\[
\ker\pi=U,
\]

so \(\pi\) gives explicit coordinates on

\[
Q=\mathbb F_2^{17}/U.
\]

At lifting level \(n\), the continuing set is exactly

\[
\mathcal C_n=\{x:\pi(x)=q_n\}.
\]

The original quadratic compatibility system therefore has the same zero set as seven affine-linear quotient equations.

## 3. Explicit offset sequence

For the selected compatible chain, the quotient offsets are

\[
\boxed{
64,\ 34,\ 42,\ 98,\ 96,\ 106,\ 100,\ 0,\ 12,\ 36,\ 66,\ 46.}
\]

These correspond to the lifts:

\[
16\to32,\ 32\to64,\ldots,\ 32768\to65536.
\]

The offsets are not constant and do not exhibit a repeated short period in the observed window. This is consistent with Cycle 476's falsification of a stationary full compatibility polynomial.

## 4. The offset span has rank five

Binary elimination on the twelve offsets gives

\[
\boxed{\operatorname{rank}\langle q_n\rangle=5.}
\]

Thus the moving offsets occupy only a five-dimensional subspace

\[
R\subset Q.
\]

The annihilator of \(R\) inside \(Q^*\) has dimension two. In the chosen seven quotient coordinates, a basis is:

\[
\boxed{1,\ 16.}
\]

Equivalently, quotient coordinates zero and four vanish on every observed offset.

Therefore the offset dynamics has a filtration

\[
0\longrightarrow R
\longrightarrow Q
\longrightarrow Q/R
\longrightarrow0
\]

with

\[
\dim R=5,
\qquad
\dim Q/R=2.
\]

## 5. Independent correction-module filtration

Cycle 473 constructed the seven-dimensional correction module

\[
W\subseteq K(2)/K(4).
\]

Under conjugation by

\[
G=O(q_J),
\]

the difference submodule is

\[
[G,W]
=\langle w+g\cdot w\rangle.
\]

It was computed independently that

\[
\dim[G,W]=5.
\]

The coinvariant quotient is therefore

\[
W_G=W/[G,W]
\]

with

\[
\dim W_G=2.
\]

This calculation used kernel correction matrices and the conjugation action. It did not use the later 17-bit presentation-section geometry.

## 6. The \(5+2\) correspondence

The two independently derived filtrations are:

\[
0\to R_5\to Q_7\to C_2\to0
\]

and

\[
0\to [G,W]_5\to W_7\to W_{G,2}\to0.
\]

The subscripts denote dimensions.

The match now includes:

- total dimension seven;
- moving/conjugation-difference dimension five;
- stationary/coinvariant dimension two;
- the fact that only the five-dimensional part is explored by the observed level-to-level offsets.

This suggests an intertwiner

\[
\Psi:Q\overset{?}{\longrightarrow}W
\]

with

\[
\Psi(R)=[G,W]
\]

and

\[
\overline\Psi:Q/R\overset{?}{\longrightarrow}W_G.
\]

No such \(\Psi\) has yet been constructed. The agreement is a strong structural target, not proof of canonical equality.

## 7. Consequence for the two stationary bits

The two stationary quotient directions are natural candidates for data that do not participate in ordinary congruence retuning.

Possible interpretations include:

- Brown-orientation data;
- the two-bit coinvariant found in Cycle 473;
- a theta or Clifford central character;
- real orientation and time orientation;
- determinant/Pfaffian trivializations.

However, Cycle 473 proved that the raw scalar projections of the first-layer cocycle are coboundaries. Therefore the two stationary directions cannot be promoted directly to physical orientation characters without additional quadratic, spinorial or state-space structure.

The correct statement is narrower:

\[
\text{two stationary quotient directions exist;}
\]

their physical meaning remains open.

## 8. Consequence for an inductive lifting proof

The continuation problem can now be phrased in seven coordinates:

\[
\pi(x_n)=q_n.
\]

The ten-dimensional kernel \(U\) supplies free choices. The five-dimensional moving part of \(q_n\) appears to track conjugation-difference corrections, while two quotient directions remain fixed.

An inductive proof would follow if one constructs \(\Psi\) and proves that the next obstruction always lies in

\[
[G,W],
\]

never in the two-dimensional coinvariant quotient.

The observed rank-five offset motion is exactly what that theorem would predict.

## 9. Claim status

### Established computationally through \(2^{16}\)

- the displayed ten masks span the fixed continuing direction space;
- the displayed seven masks give quotient functionals;
- the twelve quotient offsets are as listed;
- their span has dimension five;
- their annihilator in the seven-dimensional quotient has dimension two;
- the resulting \(5+2\) profile matches the independent correction-module dimensions.

### Candidate theorem

- \(Q\) is canonically isomorphic to \(W\);
- the moving offset subspace equals \([G,W]\);
- the stationary two-dimensional quotient equals \(W_G\);
- every future obstruction lies in the moving five-dimensional subspace and is therefore cancellable.

> **Cycle 481 refinement.** The coinvariant targets are now exactly identified: inclusion induces \(W_G\cong\mathfrak o_G\), with both sides two-dimensional. However, cocycle evaluation does not give the conjectured full map \(Q/R\to W_G\). Only the \(e_4\) line descends cleanly; \(e_0\) remains inaccessible to every linear combination of group-element evaluations. See [The tangent coinvariants match the correction coinvariants, but evaluation recovers only one stationary bit](565_the_tangent_coinvariants_match_the_correction_coinvariants_but_evaluation_recovers_only_one_stationary_bit.md).

### Not established

- an explicit intertwining matrix \(\Psi\);
- equality of the group actions on \(Q\) and \(W\);
- an all-level inductive lift;
- a physical interpretation of the two stationary directions.

## 10. Stop-everything and falsification gates

### Stop-everything results reached

1. The explicit seven quotient functionals have been constructed.
2. Offset motion has exact rank five, leaving two stationary quotient directions.
3. The lift geometry reproduces the independent \(5+2\) correction-module filtration.

### Next stop-everything gates

1. Construct \(\Psi:Q\to W\) and verify \(G\)-equivariance.
2. Prove the offset recurrence always lands in \([G,W]\).
3. Identify the two stationary directions with a known theta/Clifford or orientation module.
4. Use the filtration to prove a full \(\mathbb Z_2\)-section.

### Falsification boundaries

1. Matching dimensions do not prove isomorphic modules.
2. Twelve offsets do not prove all future offsets remain in the same five-plane.
3. The two stationary bits are not automatically physical phases.

## 11. Next calculations

1. Express the seven quotient functionals directly in generator-correction matrices.
2. Compute the induced \(G\)-action on \(Q\).
3. Solve the intertwiner equations between \(Q\) and \(W\).
4. Test theta and Clifford characters only on the stationary two-dimensional quotient.

## Certificate and companions

> **Cycle 478 correction and refinement.** The natural conjecture \(U=B^1\) is false: \(\dim B^1=13\) and \(\dim(U\cap B^1)=9\). Inside the seven-dimensional quotient, the four-dimensional coboundary image lies inside the five-dimensional moving-offset plane, yielding an exact \(4+1+2\) flag. See [The seven-dimensional lift quotient has an exact \(4+1+2\) flag](562_the_seven_dimensional_lift_quotient_has_an_exact_four_plus_one_plus_two_flag.md).

- [Explicit quotient and offset certificate](scripts/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Fixed affine ten-plane](560_the_1024_continuing_sections_are_translates_of_one_fixed_ten_plane.md)
- [Seven-dimensional correction module](557_the_shell_lift_cocycle_is_trivial_modulo_four_and_the_nonsplitting_may_be_archimedean.md)

