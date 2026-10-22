# The Four Vertex Cycles Form a Rank-Three \(Spin(1,2)\) Packet, Not a Lorentz Tetrad

**Date:** 22 October 2026

**Status:** exact rank obstruction, generic sharpness witness and nested-stabilizer interpretation

**Depends on:** [the Lorentzian seven-point conformal-cycle theorem](1700_the_tetrahedral_seven_point_sphere_extends_to_an_exact_spin23_conformal_cycle.md) and [the global \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) construction](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md)

**Evidence:** [exact rational verifier](../../../verification/verify/verify_spin23_seven_point_cycle.mjs)

## Result

Applying the seven-point construction at all four vertices does **not** produce
four independent vectors in the four-dimensional Lorentzian complement of the
reference cycle.  The four cycle vectors have rank at most three.  This bound
is sharp for a generic tetrahedron: the exact Lorentzian witness in the
verifier has cycle rank three and Gram rank three, while its \(4\times4\)
Gram determinant vanishes exactly.

The obstruction is structural rather than accidental.  Every vertex cycle
contains the same two points

\[
E={G\over q(G)},
\qquad
D=4G,
\]

and is orthogonal to the same reference cycle \(R\).  In the conformal lift,
the two common point conditions reduce to one condition after imposing
orthogonality to \(R\).  Consequently all four cycle vectors lie in one
three-dimensional Lorentzian subspace of the \((2,3)\) carrier.

Thus the packet realizes the nested exact reduction

\[
Spin(2,3)
\supset Spin(1,3)
\supset Spin(1,2),
\]

at the level of stabilizer geometry.  It is a useful model of symmetry
reduction but not a physical spontaneous-symmetry-breaking result.

## 1. The common constraints

Let

\[
\widehat X=\left(X,1,-{q(X)\over2}\right)
\]

be the null conformal lift into \(\mathcal W\cong\mathbb R^{2,3}\), and let

\[
R=(0,-2,-4)
\]

represent the reference cycle \(q(X)=4\).  Write \(S_i\) for the common-cycle
vector obtained by distinguishing vertex \(V_i\).  From the preceding theorem,

\[
\langle S_i,R\rangle=0.
\]

The centroid \(G\) does not depend on the distinguished vertex.  Therefore
every vertex cycle contains the same inversion pair \(E,D\), giving

\[
\langle S_i,\widehat E\rangle
=\langle S_i,\widehat D\rangle=0.
\]

But these are not three independent constraints.  If \(g=q(G)\), direct
substitution gives

\[
\boxed{
\widehat D
=4g\,\widehat E
+{4g-1\over2}R.
}
\tag{1}
\]

Hence incidence with \(D\) follows automatically from incidence with \(E\)
and orthogonality to \(R\).  All four cycles lie in

\[
K=R^\perp\cap\widehat E^{\,\perp}.
\]

For generic \(g\ne1/4\), the vectors \(R\) and \(\widehat E\) are independent,
so

\[
\dim K=5-2=3.
\]

It follows immediately that

\[
\boxed{
\operatorname{rank}\{S_0,S_1,S_2,S_3\}\le3,
\qquad
\det\bigl[\langle S_i,S_j\rangle\bigr]=0.
}
\]

No normalization or coordinate choice can turn this packet into a
four-dimensional tetrad.

## 2. Signature of the surviving packet

The ambient space has signature \((2,3)\), and

\[
\langle R,R\rangle=16>0.
\]

Therefore \(R^\perp\) has signature \((1,3)\).  This is the first stabilizer
step:

\[
SO_0(2,3)\longrightarrow SO_0(1,3).
\]

Project \(\widehat E\) into \(R^\perp\):

\[
e=\widehat E-{langle\widehat E,R\rangle\over16}R.
\]

Because \(\widehat E\) is null,

\[
\langle e,e\rangle
=-{\langle\widehat E,R\rangle^2\over16}<0
\]

away from the exceptional case \(q(E)=4\), equivalently \(g=1/4\).  Removing
this negative direction from \(R^\perp\) leaves

\[
\boxed{K\text{ has signature }(1,2).}
\]

The generic cycle packet therefore spans a \(Spin(1,2)\)-type Lorentzian
three-space inside the \(Spin(2,3)\) conformal carrier.

## 3. Generic sharpness

The verifier constructs exact rational tetrahedra in both Euclidean and
Lorentzian signature.  In the Lorentzian witness it finds

\[
\operatorname{rank}[S_0\ S_1\ S_2\ S_3]=3,
\qquad
\operatorname{rank}[\langle S_i,S_j\rangle]=3,
\]

with a nonzero exact \(3\times3\) Gram minor and zero exact \(4\times4\)
determinant.  Since the nonzero minor is a rational function of the input
coordinates, one exact nonzero witness proves that rank three holds on a
nonempty Zariski-open set.  The rank-three upper bound is therefore generically
sharp.

The verifier also returns the unique projective linear relation among the four
normalized cycle vectors and a scale-independent cycle Gram cross-ratio.

## 4. Interpretation boundary

This result is relevant to the programme's description of \(Spin(2,3)\) as a
"symmetry-breaking factory" in a narrow, exact sense:

1. a selected positive reference-cycle vector leaves a \((1,3)\) orthogonal
   complement;
2. a selected common inversion pair removes one negative direction and leaves
   a \((1,2)\) carrier;
3. the four vertex constructions generically span that surviving carrier.

It does **not** yet supply:

- a dynamical order parameter;
- a vacuum potential selecting \(R\) or \(E\);
- a four-dimensional coframe;
- the Einstein action or graviton spectrum;
- a physical identification of the tetrahedron or its cycle cross-ratio.

The failed tetrad guess is therefore itself a useful exact result.  Any route
from this packet to four-dimensional gravity must add one independent cycle
datum not forced to contain the common pair \(E,D\), or obtain a coframe from a
different representation.

## 5. Next gate

There are now two bounded continuations:

1. determine whether the projective cycle Gram cross-ratio is merely a
   rewriting of an ordinary tetrahedral Gram cross-ratio;
2. classify the minimal covariant fifth construction that escapes the common
   \(E,D\) incidence constraint and raises the cycle span from three to four.

Both are now executed.  [The Gram-data reconstruction theorem](1703_the_cycle_packet_gram_data_are_rationally_determined_by_the_tetrahedron.md) proves that the cross-ratio is derived from the tetrahedral Gram matrix.  [The centroid-cycle rank completion](1702_one_centroid_cycle_supplies_the_unique_missing_lorentz_direction_but_not_a_spacetime_coframe.md) supplies the missing quotient direction without inserting an arbitrary vector.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_seven_point_cycle.mjs
~~~
