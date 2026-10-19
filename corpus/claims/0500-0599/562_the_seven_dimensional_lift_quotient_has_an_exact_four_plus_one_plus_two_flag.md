# The seven-dimensional lift quotient has an exact \(4+1+2\) flag

## Executive result

The seven-dimensional section-lift quotient

\[
Q=Z^1/U
\]

contains two independently defined subspaces that fit into one exact flag:

\[
\boxed{
\overline{B^1}_4
\subset
R_5
\subset
Q_7.}
\]

Here:

- \(Z^1\) is the 17-dimensional homogeneous presentation-lift space;
- \(U\) is the fixed ten-dimensional continuing direction plane;
- \(B^1\) is the 13-dimensional infinitesimal-conjugation coboundary space;
- \(\overline{B^1}\) is its four-dimensional image in \(Q\);
- \(R\) is the five-dimensional span of the level-dependent lift offsets.

The successive dimensions are therefore

\[
\boxed{4+1+2=7.}
\]

After quotienting by infinitesimal conjugation, the remaining space has dimension three and a canonical tested filtration

\[
\boxed{
0\to R/\overline{B^1}\cong\mathbb F_2
\to Q/\overline{B^1}
\to Q/R\cong\mathbb F_2^2
\to0.}
\]

Thus the non-gauge lift data splits dimensionally into:

- one moving direction;
- two stationary directions.

This is an exact finite-linear result. Its resemblance to the programme's “one carrier, two faces, three relationships” language is mathematically suggestive but not yet a physical identification.

## 1. The homogeneous lift space as \(Z^1\)

The linearized lift equations for the three wreath-product generators have:

\[
75\text{ variables},
\qquad
\operatorname{rank}=58.
\]

Their homogeneous solution space therefore has dimension

\[
\dim Z^1=75-58=17.
\]

This is naturally the space of generator assignments satisfying the linearized relations, hence the presentation realization of one-cocycles:

\[
Z^1=Z^1(G,\mathfrak o),
\]

where

\[
G=O(q_J)\cong S_3\wr C_2
\]

and \(\mathfrak o\) is the binary orthogonal tangent module.

## 2. The tangent module

Let

\[
\mathfrak o
=\{Y\in M_5(\mathbb F_2):
Y^TH_J+H_JY=0\}.
\]

Exact binary elimination gives

\[
\boxed{\dim\mathfrak o=15.}
\]

The infinitesimal conjugation associated with \(Y\) changes each generator \(A_g\) by

\[
\delta_Y(A_g)=YA_g+A_gY.
\]

This defines the coboundary map

\[
\delta:\mathfrak o\to Z^1.
\]

Its kernel is the invariant tangent subspace:

\[
\mathfrak o^G
=\{Y:YA_g=A_gY\text{ for all }g\}.
\]

The certificate finds

\[
\boxed{\dim\mathfrak o^G=2.}
\]

Therefore

\[
\boxed{
\dim B^1
=\dim\operatorname{im}\delta
=15-2
=13.}
\]

Consequently

\[
\boxed{
\dim H^1(G,\mathfrak o)
=\dim Z^1-\dim B^1
=17-13
=4.}
\]

## 3. The first natural hypothesis is false

The fixed continuing direction plane has dimension

\[
\dim U=10.
\]

A tempting hypothesis was

\[
U=B^1.
\]

It is false:

\[
\dim B^1=13.
\]

Nor is \(U\) simply contained in \(B^1\). Exact intersection calculations give

\[
\boxed{
\dim(U\cap B^1)=9,
\qquad
\dim(U+B^1)=14.}
\]

Thus:

- one direction of \(U\) survives nontrivially in \(H^1\);
- four coboundary directions survive in \(Q=Z^1/U\).

Quantitatively,

\[
\dim\frac{U}{U\cap B^1}=1
\]

and

\[
\dim\frac{B^1}{U\cap B^1}=4.
\]

## 4. The cohomological \(4+3\) filtration

Pass to

\[
Q=Z^1/U,
\qquad
\dim Q=7.
\]

The image of \(B^1\) is

\[
\overline{B^1}
=\frac{B^1+U}{U}
\cong
\frac{B^1}{B^1\cap U}.
\]

Hence

\[
\boxed{\dim\overline{B^1}=13-9=4.}
\]

The quotient is

\[
\frac{Q}{\overline{B^1}}
\cong
\frac{Z^1}{U+B^1},
\]

with

\[
\boxed{\dim(Q/\overline{B^1})=17-14=3.}
\]

This gives the cohomological filtration

\[
0\to\overline{B^1}_4
\to Q_7
\to (Q/\overline{B^1})_3
\to0.
\]

The three-dimensional quotient is also

\[
H^1/\operatorname{im}(U),
\]

because \(U\) has a one-dimensional image in the four-dimensional \(H^1\).

## 5. The dynamical \(5+2\) filtration

Independently, Cycle 477 defined:

\[
R=\langle q_n\rangle\subset Q,
\]

where the \(q_n\) are the level-dependent affine offsets.

It found

\[
\dim R=5
\]

and

\[
\dim Q/R=2.
\]

Thus:

\[
0\to R_5\to Q_7\to(Q/R)_2\to0.
\]

This is the dynamical moving/stationary filtration.

## 6. The two filtrations are nested

Projecting the 13-dimensional coboundary space into the explicit seven quotient coordinates gives a four-dimensional image.

The certificate computes:

\[
\dim(\overline{B^1}\cap R)=4
\]

and

\[
\dim(\overline{B^1}+R)=5.
\]

Since

\[
\dim\overline{B^1}=4,
\]

these equalities prove

\[
\boxed{\overline{B^1}\subset R.}
\]

Therefore:

\[
\boxed{
0
\subset\overline{B^1}_4
\subset R_5
\subset Q_7.}
\]

The successive quotient dimensions are:

\[
4,\qquad1,\qquad2.
\]

This refines both earlier decompositions.

## 7. One non-gauge moving direction

The quotient

\[
R/\overline{B^1}
\]

has dimension one.

Thus four of the five observed moving directions are infinitesimal-conjugation artifacts after passing to \(Q\). Only one moving direction survives after removing those gauge-like section changes.

The remaining two-dimensional quotient

\[
Q/R
\]

is stationary across the observed lifting tower.

Therefore the genuinely non-coboundary quotient has the filtration

\[
0\to\mathbb F_2
\to Q/\overline{B^1}
\to\mathbb F_2^2
\to0.
\]

This is the exact \(1+2=3\) residual structure.

## 8. Relation to the correction module

The correction module \(W\) has the independent filtration

\[
0\to[G,W]_5\to W_7\to W_{G,2}\to0.
\]

The lift quotient \(Q\) has:

\[
0\to R_5\to Q_7\to(Q/R)_2\to0.
\]

Those \(5+2\) profiles still agree. The new cohomological computation shows that one must not identify:

\[
U\stackrel{\rm false}{=}B^1.
\]

Instead, the lift quotient contains a finer flag:

\[
\overline{B^1}_4\subset R_5\subset Q_7.
\]

Any future intertwiner \(Q\to W\) must respect this extra four-dimensional subspace or explain why \(W\) lacks an analogous visible refinement.

## 9. Candidate relational interpretation

The residual non-coboundary data has dimension three:

\[
\dim(Q/\overline{B^1})=3.
\]

Within it:

- one direction moves with congruence depth;
- two directions remain stationary.

This is mathematically consonant with the programme's heuristic:

\[
\text{one carrier}
+\text{two faces}
=\text{three relational directions}.
\]

The exact theorem is only the \(1+2\) filtration. Calling the one-dimensional factor a physical carrier or the two-dimensional factor physical faces requires an explicit action on states, observables or Furey modules. That interpretation remains speculative.

## 10. Claim status

### Established

- \(\dim\mathfrak o=15\);
- \(\dim\mathfrak o^G=2\);
- \(\dim B^1=13\);
- \(\dim Z^1=17\);
- \(\dim H^1=4\);
- \(\dim(U\cap B^1)=9\);
- \(\dim(U+B^1)=14\);
- \(\dim\overline{B^1}=4\) inside \(Q\);
- \(\overline{B^1}\subset R\);
- the exact flag has successive dimensions \(4+1+2\).

### Falsified

- \(U=B^1\);
- direct identification of the ten continuing directions with all infinitesimal conjugations;
- treating the \(5+2\) offset filtration and the cohomological filtration as the same construction.

### Candidate bridge

- the single non-gauge moving direction may be the carrier/orientation recursion;
- the two stationary directions may encode two faces or coinvariant phase data;
- an intertwiner to \(W\) may refine its five-dimensional moving submodule by a four-dimensional coboundary image.

### Not established

- a physical meaning for the \(1+2\) residual flag;
- a \(G\)-equivariant isomorphism between \(Q\) and \(W\);
- the action of \(G\) on the residual three-space;
- an all-level two-adic theorem.

## 11. Stop-everything and falsification gates

### Stop-everything results reached

1. The fixed ten-plane is not the coboundary space.
2. The exact intersection produces a \(4+3\) cohomological filtration.
3. Combining it with offset motion yields the nested \(4+1+2\) flag.
4. Only one moving direction survives after infinitesimal conjugation is removed.

### Next stop-everything gates

1. Identify the one-dimensional moving quotient with a known theta, Maslov or quartic character.
2. Identify the stationary two-plane with a Clifford/Heisenberg phase plane.
3. Compute the \(G\)-action on the \(1+2\) residual quotient.
4. Use the nested flag to prove uniform two-adic lifting.

### Falsification boundaries

1. A dimension \(1+2\) flag is not a physical derivation.
2. Infinitesimal conjugation is gauge-like but has not been identified with physical gauge redundancy.
3. The filtration does not itself select a Standard-Model observable.

## 12. Next calculations

1. Output bases for \(\overline{B^1}\), \(R/\overline{B^1}\) and \(Q/R\).
2. Compute the finite-group action on each graded piece.
3. Compare the one-dimensional moving quotient with quartic theta orientation.
4. Compare the stationary two-plane with the binary Heisenberg phase plane.

## Certificate and companions

> **Cycle 479 refinement.** In explicit quotient coordinates, the flag diagonalizes as \(\overline{B^1}=\langle e_2,e_3,e_5,e_6\rangle\), \(R/\overline{B^1}=\langle e_1\rangle\), and \(Q/R=\langle e_0,e_4\rangle\). Theta and Clifford identifications remain pinned pending a derived character and pairing. See [The \(4+1+2\) flag diagonalizes, but theta and Clifford identifications remain pinned](563_the_four_plus_one_plus_two_flag_diagonalizes_but_theta_and_clifford_identifications_remain_pinned.md).

- [Cohomological filtration certificate](../../../verification/compute/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Offset \(5+2\) filtration](561_the_binary_lift_offsets_reproduce_the_five_plus_two_filtration_of_the_correction_module.md)
- [Fixed affine ten-plane](560_the_1024_continuing_sections_are_translates_of_one_fixed_ten_plane.md)

