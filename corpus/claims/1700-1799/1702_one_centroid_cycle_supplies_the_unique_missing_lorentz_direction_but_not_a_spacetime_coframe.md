# One Centroid Cycle Supplies the Unique Missing Lorentz Direction, but Not a Spacetime Coframe

**Date:** 22 October 2026

**Status:** exact minimal rank completion in the selected affine chart; physical coframe interpretation remains open

**Depends on:** [the rank-three four-cycle obstruction](1701_the_four_vertex_cycles_form_a_rank_three_spin12_packet_not_a_lorentz_tetrad.md), [the minimal \(Spin(2,3)\) gravity action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), and [the first-order selector construction](../1600-1699/1603_the_first_order_spin23_extension_has_a_nonempty_healthy_gapped_pseudoscalar_torsion_sector.md)

**Evidence:** [exact rational verifier](../../../verification/verify/verify_spin23_seven_point_cycle.mjs)

## Result

The four vertex-associated seven-point cycles span only

\[
K=R^\perp\cap\widehat E^{\,\perp},
\qquad \dim K=3.
\]

The missing direction can nevertheless be supplied without inserting an
arbitrary vector.  The centroid itself defines the cycle

\[
\boxed{
T_G=(2G,2,-4),
}
\]

whose affine equation is

\[
2\beta(G,X)=q(X)+4.
\]

It is orthogonal to the same reference cycle \(R\), but it does not contain
the common inversion point \(E=G/q(G)\) except on one exceptional locus.
Therefore, for a generic tetrahedron, any three independent vertex cycles
together with \(T_G\) form a basis of the full Lorentzian space \(R^\perp\)
of signature \((1,3)\).

This is the smallest possible algebraic repair of the rank-three obstruction:
the quotient \(R^\perp/K\) is one-dimensional, so exactly one escaping cycle
direction is necessary and sufficient.

It is not yet a spacetime coframe.  It is a basis of one internal Lorentz
vector space at one algebraic configuration.

## 1. Exact escape calculation

The centroid cycle remains in the reference orthogonal complement because

\[
\langle T_G,R\rangle=0.
\]

Let

\[
g=q(G),
\qquad
E={G\over g},
\qquad
\widehat E=\left(E,1,-{q(E)\over2}\right).
\]

Then

\[
\begin{aligned}
\langle T_G,\widehat E\rangle
&=2\beta(G,E)-q(E)-4\\
&=2-{1\over g}-4\\
&=-2-{1\over g}.
\end{aligned}
\]

Hence

\[
\boxed{
T_G\notin K
\quad\Longleftrightarrow\quad
g\ne-{1\over2}.
}
\]

Away from this exceptional hypersurface, \(T_G\) represents the nonzero class
in the one-dimensional quotient

\[
R^\perp/K.
\]

If \(S_0,S_1,S_2\) are any independent three-cycle subset of the generic
vertex packet, then

\[
\boxed{
\operatorname{rank}\{S_0,S_1,S_2,T_G\}=4.
}
\]

Because all four lie in the four-dimensional nondegenerate space \(R^\perp\),
their Gram determinant is nonzero.  In Lorentzian signature that space has
signature \((1,3)\), so the four vectors are an internal Lorentz frame.

The exact rational witness gives a nonzero augmented determinant with the
correct negative determinant sign for a \((1,3)\) Gram form.

## 2. Why this is not an arbitrary patch

The added cycle uses only data already declared by the source construction:

- the same normalized circumquadric;
- the same centroid \(G\);
- the same reference orthogonality condition;
- no new fitted direction or coefficient.

For a fixed affine chart, centre \(G\), and reference cycle \(R\), the
coefficient \(+4\) is forced by cycle orthogonality to \(R\).  Thus \(T_G\) is
the canonical centroid-centred member of the same orthogonal cycle family.

The qualification "for a fixed affine chart" matters.  A centroid is affine,
not fully conformal, data.  The complete packet is covariant under the
stabilizer of the declared chart and reference construction; it does not
derive a chart from bare \(Spin(2,3)\) symmetry.

## 3. Relation to the gravity branch

The construction now mirrors one algebraic step of the existing
MacDowell--Mansouri/Stelle--West route:

\[
Spin(2,3)
\xrightarrow{\ R\ }
Spin(1,3),
\]

followed by a basis of the surviving Lorentz vector representation.  It gives
an explicit finite incidence model of the selector-and-frame pattern.

But a gravitational coframe is a one-form

\[
e^a=e^a{}_{\mu}(x)\,dx^\mu
\]

on a four-dimensional manifold.  The present four vectors have no base-point
dependence, differential, soldering map, invertibility field equation,
connection or action.  Therefore the allowed claim is

\[
\boxed{
\text{internal Lorentz-frame prototype}
\ne
\text{spacetime coframe or gravity derivation}.
}

## 4. Promotion gate

To connect this finite packet to the gravity programme, a future construction
must supply all of:

1. a field of tetrahedral/Jordan packets over spacetime;
2. a covariant rule selecting \(R(x)\) and the affine centroid cycle;
3. a soldering map from packet variations to \(T^*M\otimes\mathbb R^{1,3}\);
4. a nondegenerate coframe on an open domain;
5. compatibility with the existing \(Spin(2,3)\) Cartan connection;
6. an action whose selector and frame equations admit the packet without
   adding ghosts or extra physical polarizations.

Until those conditions are met, the construction remains exact-local
geometry rather than a theory of gravity.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_seven_point_cycle.mjs
~~~
