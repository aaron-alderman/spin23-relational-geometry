# Selected Length-Two Returns Recover the Protected Texture, but Require a New Endpoint Projector and Do Not Select the Common Ray

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive degree-at-most-two path classification on both minimum repairs; conditional candidate constructed, symmetry-canonical correspondence UNSAT

**Depends on:** [the linear descent no-go](1537_neither_minimal_rank_repair_has_a_natural_linear_descent_to_the_invertible_five_role_texture.md), [the minimum rank repairs](1533_the_four_zero_modes_require_exactly_four_new_real_completed_dimensions_and_no_edge_only_repair_exists.md), and [the protected five-state chain](1523_one_intermediate_real_pair_is_the_minimal_categorical_repair_of_the_spectator_connector_no_go.md)

**Evidence:** [degree-two correspondence ledger](../../../evidence/data/spin23-degree-two-path-correspondence-classification.json) and [deterministic path-classification verifier](../../../verification/verify/verify_spin23_degree_two_path_correspondence_classification.mjs)

## Result

Length-two return paths can generate the two diagonal coefficients missing
from the linear compression of claim 1537. There is an explicit unit-normalized
candidate:

\[
A=\kappa(x^2+y^2),
\qquad
d=\kappa x^2,
\]

where \(\kappa\) has inverse mass dimension. It cannot be omitted in a
physical Dirac matrix because a length-two path has mass dimension two.

Together with the primitive chain coefficients \((x,y,g,h)\), this gives

\[
M_{\rm ret}=
\begin{pmatrix}
\kappa(x^2+y^2)&x&y&0&0\\
x&\kappa x^2&0&0&0\\
y&0&0&g&0\\
0&0&g&0&h\\
0&0&0&h&0
\end{pmatrix}
\]

in \((P,I,N,Z,X)\) order. It satisfies

\[
\operatorname{cof}_{PP}(M_{\rm ret})=0,
\qquad
\det M_{\rm ret}=\kappa x^2y^2h^2.
\]

Thus it is invertible for the required nonzero \((x,y,h)\), independently of
\(g\), and it introduces no primitive \(L-N\) edge.

This candidate is not the unqualified square of the chain Dirac operator.
The global square also creates

\[
I-N:xy,
\qquad P-Z:yg,
\qquad N-X:gh,
\]

and nonzero diagonal returns at (N,Z,X). To obtain the displayed texture one
must first take a diagonal conditional expectation and then retain only the
returns based at (P,I):

\[
\boxed{\Pi_{PI}E_{\rm diag}(D_{\rm chain}^2).}
\]

Neither \(J\), the KO-6 grading nor relation parity selects this projector.
Closed returns at \((N,Z,X)\) have the same symmetry type as those at \((P,I)\).

For the multiplicity repair there is a second no-go. The two primitive
coupling vectors are linearly independent in the doubled multiplicity space.
Their Gram determinant is one and is invariant under \(U(2)\). Degree-two
invariants can measure norms and inner products, but cannot select a nonzero
linear functional \(\mathbb C^2\to\mathbb C\). Any successful compression
therefore inserts a rank-one multiplicity projector—the common ray—by hand.

For the multiplicity-one \(SI/IS+NU/UN\) repair, primitive chain coefficients
are already scalar and the return formula is an exact conditional candidate.
It still requires the two new structural operations

\[
E_{\rm diag}
\quad\hbox{and}\quad
\Pi_{PI}.
\]

The programme has therefore advanced from “missing diagonal coefficients” to
a precise minimal correspondence datum, but symmetry has not derived either
its projector or its inverse mass scale.

## 1. Complete degree-two path inventory

Write the retained chain in the order

\[
I-P-N-Z-X
\]

with primitive weights \((x,y,g,h)\). Its closed length-two returns are

\[
\begin{array}{c|c}
\text{base vertex}&\text{return monomials}\\ \hline
I&x^2\\
P&x^2,\ y^2\\
N&y^2,\ g^2\\
Z&g^2,\ h^2\\
X&h^2.
\end{array}
\]

The open length-two paths are

\[
I-P-N:xy,
\qquad
P-N-Z:yg,
\qquad
N-Z-X:gh.
\]

This list exhausts all paths of degree at most two. Primitive edges are
grading odd and relation even on the doubled carrier. Closed returns are
grading even, relation even and paired by \(J\). The open paths have the same
even polynomial degree but lie outside the desired coefficient support; the
first is precisely the effective \(I-N\), or dangerous \(L-N\), leakage.

Consequently a raw polynomial

\[
D_{\rm chain}+D_{\rm chain}^2
\]

fails three ways:

1. it generates \(xy\) on the forbidden open two-step path;
2. it generates \(yg\) and \(gh\) outside the target texture; and
3. it generates unwanted diagonal entries at \((N,Z,X)\).

A path-type conditional expectation is therefore necessary before any choice
of coefficients is considered.

## 2. Classification of selected return maps

After projecting onto closed returns based at (P,I), the most general real
degree-two map has

\[
A=\alpha_xx^2+\alpha_yy^2,
\qquad
d=\beta x^2.
\]

The coefficients \(\alpha_x,\alpha_y,\beta\) have inverse mass dimension.

The other three diagonals remain zero. Direct expansion gives

\[
\operatorname{cof}_{PP}=0,
\qquad
\det M_5=\beta x^2y^2h^2.
\]

Hence the exact invertibility condition is

\[
\beta x y h\ne0.
\]

The coefficient \(A\) does not enter the determinant, but requiring it to be a
nonzero return polynomial excludes \((\alpha_x,\alpha_y)=(0,0)\). Over
\((\alpha_x,\alpha_y,\beta)\in\{-1,0,1\}^3\), 16 of 27 triples meet these two
conditions. The minimum common-scale choice

\[
(\alpha_x,\alpha_y,\beta)=(\kappa,\kappa,\kappa)
\]

is the raw sum of the selected return paths with one inverse mass scale. The
verifier sets \(\kappa=1\) as a dimensionless normalization; that convention
does not derive the physical scale.

The verifier checks the unit-normalized candidate on all

\[
4^4=256
\]

nonzero assignments of \((x,y,g,h)\) from \((-2,-1,1,2)\). Every assignment is
invertible and has zero selected cofactor.

## 3. Why the endpoint mask is new information

Apply the raw return sum at an arbitrary subset of the five vertices. There
are (2^5=32) vertex masks. Requiring exactly the physical diagonal support
and requiring both \(A\) and \(d\) leaves one mask:

\[
\boxed{\{P,I\}.}
\]

This uniqueness is a classification inside the requested texture, not a
derivation from the source symmetry. The symmetry tests do not distinguish
the five closed-return projectors:

- every closed return is even under the KO-6 grading;
- every closed return stays inside a relation sheet;
- \(J\) simply supplies the conjugate return.

Thus the mask is a new selected endpoint projector \(\Pi_{PI}\). The
diagonal conditional expectation \(E_{\rm diag}\) is also new: without it,
the forbidden open path \(xy\) appears for every nonzero bounded assignment.

## 4. Multiplicity-basis naturality

In the least exotic matrix-multiplicity repair, the two edges meeting the
doubled \(IN\) space can be represented by

\[
v_x=(1,0),
\qquad
v_y=(0,1).
\]

Their Gram matrix is

\[
G=
\begin{pmatrix}1&0\\0&1\end{pmatrix},
\qquad
\det G=1.
\]

Under a change of multiplicity basis \(U\in U(2)\), \(G\) is invariant up to the
corresponding conjugation, and its determinant stays one. The two source
columns therefore remain linearly independent. A basis rotation cannot turn
them into a common ray.

Degree-two invariant scalars are generated by their norms and inner product.
They do not furnish a nonzero linear functional on (\mathbb C^2). More
directly, if a functional \(q\) were invariant under every \(U\in U(2)\), then
invariance under \(U=-1\) would give

\[
q=-q,
\]

so \(q=0\).

The verifier checks the four signed nonzero candidate rays. All project the
two primitive vectors to nonzero scalar coefficients, and none is preferred.
Adding the doubled \(TP\) choice gives the 16 compressions of claim 1537. A
chosen ray makes the algebraic return construction work, but the choice is
exactly an inserted rank-one projector.

Therefore the matrix-multiplicity branch is

\[
\boxed{
\text{degree-two algebraic SAT, }U(2)\text{-natural descent UNSAT}.}
\]

## 5. Multiplicity-one sector repair

In the \(SI/IS+NU/UN\) repair, every retained chain sector has multiplicity one.
There is no multiplicity-basis group and the four primitive coefficients
descend directly. The unit selected-return rule produces \(M_{\rm ret}\) exactly,
with no primitive \(I-N\) edge.

This is the strongest positive result of the search:

\[
\boxed{
M_{\rm ret}=D_{\rm primitive}+
\Pi_{PI}E_{\rm diag}(D_{\rm primitive}^2)
}
\]

after folding the real-completed edge orbits to the five coefficient roles.
It is a concrete degree-two path-algebra correspondence, not merely a desired
matrix written down after the fact.

Its limitation is equally concrete. The two projectors are not generated by
the stated finite symmetries. They must be declared as part of the
correspondence functor. This is less input than six arbitrary matrix
coefficients, but it is still new structural input.

## 6. Forbidden-support and Schur audit

The selected-return map preserves primitive support: its degree-one part is
only the four chain edges. It also deletes all open degree-two paths, so no
effective \(I-N\) coefficient survives.

The unprojected square fails this test maximally within the bounded nonzero
box:

\[
xy\ne0
\]

in all 256 assignments. The protection therefore comes from
\(E_{\rm diag}\), not from a cancellation.

The map may be read as a derived/path-algebra rule. It is not an ordinary
Feshbach Schur complement of the claim-1533 auxiliary block, which remains
singular by claim 1537. Calling it Feshbach therefore requires an additional
regularized auxiliary resolvent and brings further scale data beyond the
degree-two classification.

## Verdict

The degree-two reopening is conditionally successful:

\[
\boxed{
A=\kappa(x^2+y^2),
\quad d=\kappa x^2,
\quad \operatorname{cof}_{PP}=0,
\quad \det M=\kappa x^2y^2h^2.}
\]

But the success is not canonical from the existing symmetries:

\[
\boxed{
\text{minimum new datum}
=\kappa\Pi_{PI}E_{\rm diag},}
\]

and the matrix-multiplicity repair additionally needs a rank-one projector in
its doubled multiplicity spaces.

Length-two returns therefore solve the diagonal algebra but do not solve the
selection problem. The most economical next question is no longer “can a
return path work?” It is whether \(\Pi_{PI}E_{\rm diag}\) and its scale
\(\kappa\) can be characterized by a sourced algebra, rather than imposed as
a texture mask and matching constant.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_degree_two_path_correspondence_classification.mjs
node verification/verify/verify_spin23_five_role_correspondence_descent_no_go.mjs
node verification/verify/verify_spin23_six_character_zero_mode_repair_exhaustion.mjs
node verification/verify/verify_spin23_spectator_connector_minimal_repair_exhaustion.mjs
~~~
