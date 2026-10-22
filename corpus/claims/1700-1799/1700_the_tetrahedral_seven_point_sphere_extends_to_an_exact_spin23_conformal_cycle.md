# The Tetrahedral Seven-Point Sphere Extends to an Exact \(Spin(2,3)\) Conformal Cycle

**Date:** 22 October 2026

**Status:** exact signature-independent extension and exact-local \(Spin(2,3)\) incidence theorem; no physical admission or independent novelty verdict

**Source:** Dong Zhang, [*A Seven-Point Sphere of the Tetrahedron*](https://doi.org/10.5281/zenodo.23524018), v1 preprint, 21 October 2026

**Depends on:** [the exact \(H_2(\mathbb R)\) Jordan carrier](../0000-0099/42_jordan_triple_to_sp4r_determination.md), [the global \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) construction](../0000-0099/47_global_group_isomorphism_sp4r_spin023.md), and [the typed ansatz-promotion protocol](../1400-1499/1467_any_source_can_seed_an_ansatz_but_only_typed_translation_collision_and_kill_tests_can_promote_it.md)

**Evidence:** [exact rational verifier](../../../verification/verify/verify_spin23_seven_point_cycle.mjs)

## Result

The seven-point sphere proof is not tied to positive-definite Euclidean
geometry.  Its algebra uses only a nondegenerate symmetric bilinear form,
affine combinations, polarity and quadratic inversion.  It therefore extends
to every nondegenerate real signature in dimension three on the generic chart
where the required inverses and face pole are finite.

For Lorentzian signature \((1,2)\), the common object is not always an ordinary
sphere.  It is a conformal **cycle** whose projective vector lies in a
five-dimensional quadratic space of signature \((2,3)\).  The seven-point
incidence is consequently carried exactly by

\[
SO_0(2,3),
\qquad
Spin_0(2,3)\cong Sp(4,\mathbb R)
\]

on its double cover.

This is a real bridge to the programme, but it has a precise boundary: the
chosen affine centroid and the distinguished reference cycle select an affine
chart and break the full conformal group to appropriate stabilizers.  The
incidence relation is \(Spin(2,3)\)-covariant; the original barycentric recipe
is not itself invariant under every conformal transformation.

## 1. Signature-independent formulation

Let \((V,\beta)\) be a three-dimensional real vector space with a
nondegenerate symmetric bilinear form, and write

\[
q(X)=\beta(X,X).
\]

Choose four points \(V_0,V_1,V_2,V_3\) on the normalized quadric

\[
q(V_i)=1.
\]

Set

\[
G={V_0+V_1+V_2+V_3\over4},
\qquad
s=V_1+V_2+V_3.
\]

Let \(O'\) be the pole-normalized centre of the opposite face, characterized
by

\[
\beta(V_i,O')=q(O')
\qquad(i=1,2,3).
\]

When the opposite affine face has non-null normal, this \(O'\) is finite and
unique.  Define

\[
\begin{aligned}
C&=4G-3V_0,
&H'&=s-2O'=4G-V_0-2O',\\
E&={G\over q(G)},
&D&=4G,\\
B&={O'\over q(O')},
&F&=4O'.
\end{aligned}
\]

Finally, let \(A\) be the second intersection of the line \(V_0G\) with
\(q(X)=1\):

\[
A=V_0+t(G-V_0),
\qquad
t={2\bigl(1-\beta(G,V_0)\bigr)\over q(G-V_0)}.
\]

The finite-chart hypotheses are

\[
q(G)\ne0,
\quad q(O')\ne0,
\quad q(G-V_0)\ne0.
\]

The first two ensure that \(E\) and \(B\) are finite; the third ensures that
the displayed second-intersection formula is non-null and nondegenerate.

## 2. The common cycle

Choose \((\alpha,c)\in\mathbb R\oplus V\), not both zero, satisfying

\[
\begin{aligned}
2\beta(c,G)&=\alpha\bigl(4q(G)+1\bigr),\\
2\beta(c,O')&=\alpha\bigl(4q(O')+1\bigr),\\
2\beta(c,V_0)&=\alpha\bigl(8\beta(G,V_0)-3\bigr).
\end{aligned}
\tag{1}
\]

These are three homogeneous linear equations in the four components of
\((\alpha,c)\), so a nonzero solution always exists.  Then all seven points
satisfy

\[
\boxed{
2\beta(c,X)=\alpha\bigl(q(X)+4\bigr).
}
\tag{2}
\]

For \(E,D\), equation (2) is exactly the first line of (1), before and after
the inversion

\[
J(X)={4X\over q(X)}.
\]

For \(B,F\), it is the second line.  For \(C\), expansion using
\(q(V_0)=1\) reduces (2) to the first and third lines.  For \(H'\), use

\[
4\beta(G,O')-\beta(V_0,O')=3q(O'),
\]

which follows from \(s=4G-V_0\) and the three defining face equations.
For \(A\), subtract the third line of (1) from the first and insert the exact
value of \(t\).  No positivity or Euclidean angle argument occurs anywhere in
these reductions.

Therefore the source theorem is a theorem of nondegenerate quadratic
three-space, not only Euclidean three-space.

## 3. Exact \(Spin(2,3)\) lift

Take \(\beta\) of signature \((1,2)\).  Adjoin a hyperbolic plane and define

\[
\mathcal W=V\oplus\mathbb R^{1,1},
\]

with

\[
\left\langle(x,u,v),(y,u',v')\right\rangle
=\beta(x,y)+uv'+u'v.
\]

Then \(\mathcal W\) has signature \((2,3)\).  The conformal lift

\[
\widehat X=\left(X,1,-{q(X)\over2}\right)
\]

is null:

\[
\langle\widehat X,\widehat X\rangle=0.
\]

Represent the common cycle and the reference quadric \(q(X)=4\) by

\[
S=(2c,2\alpha,-4\alpha),
\qquad
R=(0,-2,-4).
\]

Equation (2) is precisely

\[
\boxed{\langle\widehat X,S\rangle=0.}
\]

Moreover,

\[
\boxed{\langle S,R\rangle=0,}
\]

so the seven-point cycle is conformally orthogonal to the fixed reference
cycle.  This is the projective-null-cone realization on which
\(SO_0(2,3)\) acts linearly and \(Spin_0(2,3)\cong Sp(4,\mathbb R)\) acts on
the double cover.

Under the standard Jordan identification

\[
X=\begin{pmatrix}x_0+x_1&x_2\\x_2&x_0-x_1\end{pmatrix}
\in H_2(\mathbb R),
\qquad
q(X)=\det X=x_0^2-x_1^2-x_2^2,
\]

this is exactly the programme's rank-two Lorentzian carrier.

## 4. What the result does and does not establish

It establishes:

1. an exact Lorentzian seven-point cycle theorem;
2. an explicit null-cone encoding in signature \((2,3)\);
3. two inversion pairs \(E\leftrightarrow D\) and \(B\leftrightarrow F\);
4. an exact incidence packet suitable for a \(Spin(2,3)\) invariant census;
5. a worked example in which a brute-force geometric discovery compresses to
   three linear conditions in the conformal carrier.

It does not establish:

1. that the Euclidean source theorem was previously unknown;
2. that a physical tetrahedron or seven-point cycle occurs in nature;
3. that affine centroids are invariant under the full conformal group;
4. that the cycle selects the positive \(H_2(\mathbb R)_+\) response cone;
5. that the construction closes any action, spectrum, Standard-Model or
   gravitational admission gate.

## 5. Degenerate boundary

The projective conformal formulation suggests meaningful boundary extensions,
but they are different statements from the finite theorem:

- \(q(G)=0\) sends \(E\) to conformal infinity;
- \(q(O')=0\) makes the face pole null and sends \(B\) to infinity;
- \(q(G-V_0)=0\) makes the median direction null and changes the
  second-intersection multiplicity;
- \(\alpha=0\) gives a plane through the origin rather than a finite-centred
  pseudo-sphere;
- rank loss among \(G,O',V_0\) can make the common cycle nonunique.

These cases should be classified in the projective compactification rather
than hidden by division.

## 6. Next gate

Repeat the construction at all four vertices, obtain four cycle vectors
\(S_0,S_1,S_2,S_3\in\mathbb R^{2,3}\), and calculate their Gram matrix

\[
\Gamma_{ij}=\langle S_i,S_j\rangle.
\]

The high-value question is whether the projective class of \(\Gamma\)
contains a nontrivial invariant not already determined tautologically by the
tetrahedral Gram matrix.  A positive answer would produce a compact
\(Spin(2,3)\)-native packet for the programme's incidence-search engine.  A
negative answer would still classify the seven-point theorem as an elegant
repackaging of the original quadratic data.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_seven_point_cycle.mjs
~~~

The verifier uses exact rational arithmetic.  It checks one Euclidean and one
Lorentzian generic tetrahedron, verifies all seven cycle residuals, verifies
the null conformal lifts and \(\langle S,R\rangle=0\), and confirms that the
coefficient-scrambled control \(D=5G\) fails.
