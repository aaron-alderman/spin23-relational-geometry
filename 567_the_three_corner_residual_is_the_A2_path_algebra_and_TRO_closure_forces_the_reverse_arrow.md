# The Three-Corner Residual Is the \(A_2\) Path Algebra, and TRO Closure Forces the Reverse Arrow

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact binary associative- and ternary-algebra theorem; lifting this finite shadow to the real Jordan carrier remains open

> **Cycle 485 scope correction.** The ambient target is a tensor product of two distinct two-dimensional spaces. Its display as a square matrix does not itself define composition or transpose. The results below are exact after choosing the contraction that matches the displayed row and column bases. Exhaustion subsequently showed that this contraction is uniquely selected if the two diagonal classes are required to be normalized orthogonal complementary Peirce faces. See [the contraction-selection and split-lift theorem](569_the_two_named_peirce_faces_uniquely_select_the_contraction_and_an_exact_split_jordan_lift.md). The raw universal-evaluation result alone does not yet derive those face axioms.

## Executive result

Cycle 482 embedded the exact residual three-space into

\[
G_{\rm ab}^*\otimes\mathfrak o_G
\cong
M_2(\mathbb F_2)
\]

with image

\[
1000,\qquad0100,\qquad0001.
\]

Under the natural matrix identification, these are

\[
E_{11},\qquad E_{12},\qquad E_{22}.
\]

Their span is not an arbitrary three-plane. It is exactly the upper-triangular algebra:

\[
\boxed{
\mathcal T
=
\left\{
\begin{pmatrix}
a&b\\
0&d
\end{pmatrix}
:a,b,d\in\mathbb F_2
\right\}
=T_2(\mathbb F_2).}
\]

Equivalently, \(\mathcal T\) is the path algebra of the directed \(A_2\) quiver

\[
1\longrightarrow2.
\]

It has:

- two face idempotents \(E_{11}\) and \(E_{22}\);
- one directed relational arrow \(E_{12}\);
- one missing reverse arrow \(E_{21}\).

The natural transpose-TRO product forces the missing arrow:

\[
\boxed{
E_{22}\,E_{12}^{T}\,E_{11}=E_{21}.}
\]

Therefore the ternary closure of the exact three-corner residual is the full matrix algebra:

\[
\boxed{
\operatorname{TRO}\langle\mathcal T\rangle
=M_2(\mathbb F_2).}
\]

This is the first exact result in the programme in which Jordan/TRO-style closure, rather than an arbitrary completion, produces the absent relational orientation.

## 1. From the universal tensor to matrices

Universal evaluation takes values in

\[
G_{\rm ab}^*\otimes\mathfrak o_G.
\]

Both factors are two-dimensional over \(\mathbb F_2\). Choose the certified ordered bases:

\[
G_{\rm ab}^*=\langle a^*,t^*\rangle,
\]

where \(a^*\) is the base-reflection character and \(t^*\) the wreath-exchange character, and

\[
\mathfrak o_G=\langle\bar w_1,\bar w_2\rangle.
\]

Identify

\[
a^*\otimes\bar w_1\leftrightarrow E_{11},
\quad
a^*\otimes\bar w_2\leftrightarrow E_{12},
\]

\[
t^*\otimes\bar w_1\leftrightarrow E_{21},
\quad
t^*\otimes\bar w_2\leftrightarrow E_{22}.
\]

The residual classes map as:

\[
c=[u]=[e_1]\longmapsto E_{11},
\]

\[
f_0=e_0\longmapsto E_{12},
\]

\[
f_4=e_4\longmapsto E_{22}.
\]

Thus the “three occupied corners” are exactly:

\[
\mathcal T=\langle E_{11},E_{12},E_{22}\rangle.
\]

## 2. Associative closure

Direct multiplication gives:

\[
E_{11}^2=E_{11},
\qquad
E_{22}^2=E_{22},
\]

\[
E_{11}E_{12}=E_{12},
\qquad
E_{12}E_{22}=E_{12},
\]

while

\[
E_{22}E_{12}=0,
\qquad
E_{12}E_{11}=0,
\qquad
E_{12}^2=0.
\]

Hence the span is closed under multiplication. Exhaustion confirms it contains eight elements:

\[
|\mathcal T|=2^3=8.
\]

Its identity is

\[
I=E_{11}+E_{22}.
\]

Its Jacobson radical is the arrow line

\[
\operatorname{rad}\mathcal T=\langle E_{12}\rangle,
\qquad
E_{12}^2=0,
\]

and the semisimple quotient is

\[
\mathcal T/\operatorname{rad}\mathcal T
\cong
\mathbb F_2\oplus\mathbb F_2.
\]

This is precisely the algebra of two objects and one directed relation.

## 3. Peirce decomposition

Let

\[
p=E_{11},
\qquad
q=E_{22}.
\]

Then

\[
p^2=p,\qquad q^2=q,\qquad pq=qp=0,\qquad p+q=I.
\]

The Peirce corners are:

\[
p\mathcal T p=\mathbb F_2p,
\]

\[
q\mathcal T q=\mathbb F_2q,
\]

\[
p\mathcal T q=\mathbb F_2E_{12},
\]

\[
q\mathcal T p=0.
\]

Thus:

\[
\boxed{
\text{two diagonal faces}
\quad+\quad
\text{one oriented carrier from }p\text{ to }q.}
\]

This is a sharper algebraic reading than the provisional assignment made in Cycle 482. The diagonal classes are the two endpoints/faces, while the nilpotent off-diagonal class is the directed relationship between them.

The source labels remain:

- \(c=[u]=[e_1]\) occupies \(p=E_{11}\);
- \(e_4\) occupies \(q=E_{22}\);
- \(e_0\) occupies the arrow \(E_{12}\).

Whether the physical word “carrier” should name \(c\), \(e_0\), or the complete Peirce configuration remains interpretive. Algebraically, \(E_{12}\) is the relation.

## 4. Why transpose closure matters

The upper-triangular algebra is associative but not closed under transpose:

\[
E_{12}^{T}=E_{21}\notin\mathcal T.
\]

The relational-carrier programme is based not only on multiplication but on ternary products of the form

\[
\{x,y,z\}=xy^{T}z
\]

in the real/binary matrix shadow.

Apply this to three already established elements:

\[
x=E_{22},
\qquad
y=E_{12},
\qquad
z=E_{11}.
\]

Then

\[
\{E_{22},E_{12},E_{11}\}
=
E_{22}E_{21}E_{11}
=
E_{21}.
\]

Therefore:

\[
\boxed{
\mathcal T\text{ is not TRO-closed, and its first missing TRO product is exactly the reverse arrow}.}
\]

This is not an arbitrary adjunction. The established elements force it under the programme’s native ternary operation.

## 5. Completion to the full square

Adjoin

\[
E_{21}.
\]

Then:

\[
\langle E_{11},E_{12},E_{21},E_{22}\rangle
=M_2(\mathbb F_2),
\]

which contains all sixteen binary \(2\times2\) matrices.

Thus:

\[
\boxed{
\operatorname{TRO}\langle T_2(\mathbb F_2)\rangle
=M_2(\mathbb F_2).}
\]

The transpose exchanges the two oriented triangular faces:

\[
T_2(\mathbb F_2)^T
=
\langle E_{11},E_{21},E_{22}\rangle.
\]

Their union generates the full matrix algebra. This is the finite binary version of:

\[
\text{one orientation}
\quad+\quad
\text{opposite orientation}
\quad\longrightarrow\quad
\text{two-sided relational carrier}.
\]

## 6. Relation to the opposite glue face

The discriminant branch independently produced two transverse glue faces:

\[
\overline H_M,
\qquad
\overline H_L\cong\overline H_M^*.
\]

The first supplied one Lagrangian and the second its dual.

The present algebra has the analogous pattern:

\[
E_{12}
\quad\leftrightarrow\quad
\text{forward arrow},
\]

\[
E_{21}
\quad\leftrightarrow\quad
\text{reverse/dual arrow}.
\]

This makes the opposite glue face a mathematically credible source for \(E_{21}\). But no explicit glue-to-tensor intertwiner has yet been constructed. The established statement is that TRO closure forces the same missing location that the opposite-face interpretation predicts.

## 7. Relation to Jordan-triple recursion

The programme’s core target is:

\[
\text{Jordan-triple recursion}
\Longrightarrow
Sp(4,\mathbb R)
\cong Spin_0(2,3).
\]

The present result is a finite shadow of the first step:

\[
\boxed{
\text{directed three-corner data}
\xrightarrow{xy^Tz}
\text{full two-sided matrix carrier}.}
\]

It does not prove the real symplectic group. To reach that target one still needs:

1. a characteristic-zero/integral lift of the three-corner algebra;
2. a real involution and positivity structure;
3. the Hermitian Jordan algebra \(H_2(\mathbb R)\) or a proven equivalent carrier;
4. the conformal/quasiconformal construction yielding \(Sp(4,\mathbb R)\);
5. a map from the finite source classes to physical observables.

What has changed is that the missing reverse relation is no longer merely guessed. The native ternary product generates it exactly in the certified binary shadow.

## 8. Claim-status discipline

### Established

- the residual image is \(T_2(\mathbb F_2)\);
- it is an eight-element unital associative algebra;
- it is the path algebra of the directed \(A_2\) quiver;
- its radical is the square-zero line \(\langle E_{12}\rangle\);
- its diagonal quotient is \(\mathbb F_2\oplus\mathbb F_2\);
- it is not transpose- or TRO-closed;
- \(E_{22}E_{12}^TE_{11}=E_{21}\);
- adjoining \(E_{21}\) generates \(M_2(\mathbb F_2)\).

### Candidate bridge

- the two idempotents are the finite two-face shadow;
- the radical arrow is the oriented relational carrier;
- the transpose arrow is supplied by the opposite glue face;
- TRO completion is the finite precursor of the real Jordan carrier.

### Not established

- a characteristic-zero lift selected by source data;
- positivity or a Euclidean Jordan structure;
- a canonical identification with \(H_2(\mathbb R)\);
- a derivation of \(Sp(4,\mathbb R)\) from this particular finite algebra;
- physical field labels for the two idempotents and arrows.

## 9. Stop-everything and falsification gates

### Stop-everything result reached

The exact residual \(1+2\) image is an algebra with two Peirce faces and one directed arrow, and the native TRO product forces the missing reverse arrow. This is the first direct finite-algebra realization of relational-carrier completion in the current lift branch.

### Next stop-everything gates

1. Construct an integral lift whose mod-two reduction is the certified triangular algebra.
2. Show that source conjugation selects transpose and hence the lower-triangular opposite.
3. Identify the opposite discriminant-glue face with \(E_{21}\) by an explicit intertwiner.
4. Prove that the resulting integral TRO envelope selects \(M_2(\mathbb R)\) and its Hermitian part \(H_2(\mathbb R)\).
5. Apply the established conformal/Jordan functor to recover \(Sp(4,\mathbb R)\) without an added real-form choice.

### Falsification boundaries

- \(M_2(\mathbb F_2)\) is not \(M_2(\mathbb R)\);
- transpose over \(\mathbb F_2\) does not supply positivity;
- the finite TRO closure does not by itself select a Lorentzian signature;
- the path-algebra interpretation must not be promoted to particle dynamics without a physical intertwiner.

## Certificate and companions

- [Triangular/TRO completion certificate](scripts/compute_five_bit_shell_lift_cocycle_first_congruence_layer.mjs)
- [Universal one-carrier/two-face quotient](566_universal_abelianized_evaluation_recovers_an_exact_one_carrier_two_face_quotient.md)
- [Relational carrier and Jordan-triple composition](41_relational_carrier_jordan_triple_composition.md)
- [Exact Jordan-triple to \(Sp(4,\mathbb R)\) determination](42_jordan_triple_to_sp4r_determination.md)
- [Two-face glue and Heisenberg commutator](546_the_two_bit_glue_obstruction_is_exactly_the_binary_heisenberg_commutator.md)
