# The Two Named Peirce Faces Uniquely Select the Contraction and an Exact Split Jordan Lift

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B13 and B14  
**Claim status:** exact conditional selection theorem and correction of an implicit identification; the physical/source derivation of the face axioms remains pinned

## Executive result

The three-corner image established in Cycles 482–483 lies in

\[
G_{\rm ab}^{*}\otimes \mathfrak o_G,
\]

where both factors happen to have dimension two over \(\mathbb F_2\). Choosing ordered bases writes its three generators as

\[
p=E_{11},\qquad a=E_{12},\qquad q=E_{22}.
\]

There was a hidden step in the previous interpretation. The two tensor factors are different spaces. A tensor in their product can be displayed as a matrix, but matrix multiplication and transpose require a contraction identifying the output factor with the input factor. Dimension equality alone does not supply one.

Exhaustion of all six nondegenerate binary contractions gives:

\[
\boxed{
6\text{ nondegenerate contractions}
\supset
2\text{ unital triangular-algebra contractions}
\supset
1\text{ normalized two-face contraction}.}
\]

The unique last contraction is the identity matching in the certified bases. It is selected by requiring

\[
p^2=p,\qquad q^2=q,\qquad pq=qp=0,\qquad p+q=1.
\]

With this contraction fixed, the entire split ladder is exact:

\[
T_2(\mathbb F_2)
\xleftarrow{\bmod 2}
T_2(\mathbb Z)
\xrightarrow{\text{transpose--TRO envelope}}
M_2(\mathbb Z),
\]

\[
M_2(\mathbb Z)\otimes\mathbb R
=M_2(\mathbb R),
\qquad
M_2(\mathbb R)^{T=1}
=\operatorname{Sym}_2(\mathbb R),
\]

and the already certified TKK construction gives

\[
\operatorname{Sym}_2(\mathbb R)
\Longrightarrow
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

This advances the programme from “some chosen matrix realization has the desired completion” to a precise conditional theorem: **two normalized orthogonal source faces uniquely choose the contraction needed for that completion**.

It does not yet prove that the two diagonal cocycle classes are physical Peirce faces. That is now the sharply isolated dependency.

There is also a real-form fork after the associative envelope is reached. The transpose-fixed carrier retains the two selected faces individually, whereas Furey exchange selects a charge-compatible population-normal real form that retains only their sum in the original population basis. See [the binary/Furey face-interpretation theorem](570_the_binary_peirce_faces_and_furey_charge_compatible_carrier_are_isomorphic_but_not_face_preserving.md).

## 1. Why a matrix display is not yet an algebra

Let

\[
U=G_{\rm ab}^{*},\qquad W=\mathfrak o_G.
\]

The universal evaluation target is \(U\otimes W\). After bases are chosen it is a four-dimensional array space, but the two slots retain different meanings:

- the first is an abelianized group-character channel;
- the second is an orthogonal-tangent coinvariant channel.

To compose two tensors one needs a bilinear contraction between the inner factors. In coordinates every nondegenerate contraction is represented by

\[
S\in GL_2(\mathbb F_2),
\]

and the induced product is

\[
A\star_S B=ASB.
\]

The previous use of ordinary multiplication was the special case \(S=I\). Therefore the unconditional Cycle 482 theorem is only that the residual quotient occupies three tensor positions. Its associative and TRO interpretations require a contraction.

This is a correction in claim scope, not a rejection of the computed products.

## 2. Exhaustion of all binary contractions

There are exactly

\[
|GL_2(\mathbb F_2)|=6
\]

nondegenerate contraction matrices. The executable certificate checks all six.

Let

\[
\mathcal T=\langle p,a,q\rangle
=\left\{
\begin{pmatrix}x&y\\0&z\end{pmatrix}
:x,y,z\in\mathbb F_2
\right\}.
\]

Only two contractions make \(\mathcal T\) closed and unital:

\[
S_0=
\begin{pmatrix}1&0\\0&1\end{pmatrix},
\qquad
S_1=
\begin{pmatrix}1&1\\0&1\end{pmatrix}.
\]

Thus associative closure alone does not remove all ambiguity.

For \(S_1\), however, the unit is \(S_1^{-1}=S_1\), not \(p+q\), and the two displayed diagonal elements are not orthogonal under \(\star_{S_1}\). In particular,

\[
p\star_{S_1}q=a\ne0.
\]

Demanding that \(p\) and \(q\) remain the two normalized orthogonal faces eliminates \(S_1\). The remaining four contractions already failed closure or internal unitality. Hence

\[
\boxed{S=I\text{ is unique under the normalized Peirce-face axioms}.}
\]

## 3. Basis-independent content of the selection

The result should not be read as “the identity matrix is intrinsically special.” The invariant statement is:

> Given two rank-one tensor classes declared to be complementary normalized orthogonal idempotents, there is a unique nondegenerate contraction for which those declarations are true.

In the certified source bases that contraction has matrix \(I\). A simultaneous relabeling changes its coordinate matrix while preserving the theorem.

The face declarations do real mathematical work. Without them, all six nondegenerate pairings remain available before closure, and two remain after triangular unital closure.

## 4. Exact integral lift

Once \(S=I\) is selected, the multiplication table is the based \(A_2\) path-algebra table:

\[
p^2=p,\quad q^2=q,\quad pa=a=aq,
\]

\[
pq=qp=qa=ap=a^2=0.
\]

Every structure constant is \(0\) or \(1\). The same presentation therefore defines the split integral based algebra

\[
\mathcal T_{\mathbb Z}=T_2(\mathbb Z),
\]

and reduction modulo two gives exactly \(\mathcal T\):

\[
\mathcal T_{\mathbb Z}\otimes\mathbb F_2
\cong T_2(\mathbb F_2).
\]

This is an exact lift, not merely a dimension match. It is not a proof that no deformed or nonsplit integral lift exists. Its canonical status is relative to preserving the selected based matrix-unit relations.

## 5. TRO envelope and real Jordan fixed part

Write \(a^*=a^T=E_{21}\). Under the transpose ternary product

\[
[x,y,z]=xy^Tz,
\]

the selected faces and arrow give

\[
[q,a,p]=qa^Tp=a^*.
\]

The four matrix units then span

\[
M_2(\mathbb Z).
\]

Scalar extension gives \(M_2(\mathbb R)\). Its transpose-fixed part is

\[
J=M_2(\mathbb R)^{T=1}
=\operatorname{Sym}_2(\mathbb R)
=\left\{
\begin{pmatrix}r&s\\s&t\end{pmatrix}
:r,s,t\in\mathbb R
\right\}.
\]

It is closed under

\[
X\circ Y=\frac12(XY+YX)
\]

and under the outer-symmetric Jordan triple

\[
\{X,Y,Z\}=XYZ+ZYX.
\]

In coordinates

\[
X=
\begin{pmatrix}
x_0+x_1&x_2\\
x_2&x_0-x_1
\end{pmatrix},
\]

the determinant is

\[
\det X=x_0^2-x_1^2-x_2^2.
\]

Thus the selected split lift produces the exact three-dimensional spin factor with determinant signature \((1,2)\).

## 6. Completion to the target group

The independent Jordan certificate proves

\[
\operatorname{TKK}(J)
=\mathfrak{sp}(4,\mathbb R)
\cong\mathfrak{so}(2,3),
\]

including all ten generators, the double-commutator triple, outer symmetry and the Jordan triple identity. The global exterior-square certificate supplies

\[
Sp(4,\mathbb R)\cong Spin_0(2,3).
\]

Consequently the full conditional chain is now executable:

\[
\boxed{
\begin{aligned}
&\text{three source tensor corners}\\
&+\text{two normalized orthogonal face axioms}\\
&\Longrightarrow T_2(\mathbb F_2)\\
&\Longrightarrow T_2(\mathbb Z)\\
&\Longrightarrow M_2(\mathbb R)\\
&\Longrightarrow \operatorname{Sym}_2(\mathbb R)\\
&\Longrightarrow Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{aligned}}
\]

No arrow in this displayed chain is now merely a dimension analogy. The only unproved input is the source/physical justification of the face axioms and normalization.

## 7. Why source symmetry alone does not presently choose the contraction

Both factors in the tensor target are quotient-level trivial modules for the finite source group:

- \(G_{\rm ab}\) is invariant under inner conjugation;
- \(\mathfrak o_G\) is a coinvariant quotient.

Therefore equivariance at this quotient level cannot distinguish the six linear identifications: every linear map between two trivial modules is equivariant. A stronger structure is required, for example:

1. a source-derived pairing before taking coinvariants;
2. an involution exchanging the character and tangent channels;
3. observable positivity making \(p,q\) spectral faces;
4. an integral discriminant pairing compatible with both source labels;
5. the missing opposite-glue intertwiner.

This closes “finite-group equivariance alone selects transpose” as an available shortcut.

## 8. Claim ledger

### Established

- the tensor factors are distinct and need a contraction for multiplication;
- there are six nondegenerate contractions over \(\mathbb F_2\);
- exactly two preserve a unital triangular algebra on the observed three-plane;
- exactly one also preserves the two named diagonal tensors as normalized orthogonal complementary idempotents;
- this contraction gives the certified \(T_2(\mathbb F_2)\) multiplication;
- the based path algebra has an exact split integral lift \(T_2(\mathbb Z)\);
- transpose-TRO closure gives \(M_2(\mathbb Z)\);
- the real transpose-fixed part is \(\operatorname{Sym}_2(\mathbb R)\);
- its determinant has signature \((1,2)\);
- its TKK group is the already certified \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

### Conditional bridge

- the cocycle classes represented by \(p\) and \(q\) are physical or source-canonical Peirce faces;
- their normalization is fixed rather than chosen;
- source conjugation induces the selected transpose on the real lift.

### Not established

- a pre-coinvariant source pairing deriving \(S=I\);
- uniqueness among all integral deformations reducing to the same binary algebra;
- positivity derived from the Standard Model rather than installed by passing to the real symmetric fixed part;
- a physical identification of \(p,a,q\) with stress, matter or gauge observables.

## 9. Stop-everything and falsification gates

### Stop-everything positive gate

Derive from the original cocycle, discriminant-glue or Furey carrier data that the two diagonal tensor classes are complementary normalized positive faces. The contraction classification would then promote the entire path

\[
\text{finite source}\Longrightarrow Spin_0(2,3)
\]

from conditional to selected.

### Immediate falsifiers

- the source-derived contraction is one of the four pairings under which the three-plane is not a unital algebra;
- the source selects the upper-unipotent contraction, for which the named diagonals are not orthogonal;
- either named diagonal class fails idempotence or positivity in a characteristic-zero lift;
- the physical involution is not compatible with transpose on the completed matrix units.

### Pinned dependency

Construct a pairing before quotienting, preferably from the opposite discriminant-glue face or a Furey conjugation map, and test whether its descent is the uniquely face-normalized contraction.

## Certificates and companions

- [Face-normalized contraction and split-lift certificate](scripts/verify_face_normalized_contraction_selects_jordan_lift.mjs)
- [Three-corner tensor quotient](566_universal_abelianized_evaluation_recovers_an_exact_one_carrier_two_face_quotient.md)
- [Conditional path-algebra/TRO result](567_the_three_corner_residual_is_the_A2_path_algebra_and_TRO_closure_forces_the_reverse_arrow.md)
- [Exact Jordan-to-\(Sp(4,\mathbb R)\) determination](42_jordan_triple_to_sp4r_determination.md)
- [Exact Jordan–\(Sp(4)\) certificate](scripts/verify-jordan-sp4-bridge.mjs)
- [Global group isomorphism](47_global_group_isomorphism_sp4r_spin023.md)
