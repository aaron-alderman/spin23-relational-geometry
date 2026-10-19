# The two ambient \(Spin(2,3)\) lattices intersect in a five-bit quadratic shell

## Status

**Exact ambient-intersection and discriminant-form theorem.**

The determinant-two ambient primitive-wedge lattices

\[
N\cong2U\oplus\langle-2\rangle
\]

and

\[
W_HN
\]

intersect in

\[
\boxed{
J=N\cap W_HN
\cong
U(2)\oplus\langle-2\rangle\oplus U(-2).}
\]

The intersection has index four in each ambient lattice and discriminant group

\[
\boxed{
A_J\cong(\mathbb Z_2)^5.}
\]

Thus the rational Hadamard correspondence creates a canonical five-bit discriminant shell around the common \(Spin(2,3)\) carrier.

## 1. From the order-36 common glue

The two order-144 ambient gluing subgroups inside \(A_{I_H}\) intersect in a subgroup of order 36. Adjoining that common subgroup to \(I_H\) gives \(J\).

Since

\[
[N:I_H]=144,
\]

one obtains

\[
[N:J]=\frac{144}{36}=4.
\]

The same calculation applies to \(W_HN\):

\[
\boxed{
[N:J]=[W_HN:J]=4.}
\]

## 2. Explicit basis

In the primitive-wedge basis

\[
(E_1,F_1,E_2,F_2,R),
\]

take

\[
\begin{aligned}
P&=F_1,\\
Q&=2E_1,\\
u&=R-2E_2,\\
Z&=R-E_2-F_2,\\
Y&=2E_2.
\end{aligned}
\]

The coordinate determinant of these vectors inside \(N\) is

\[
|\det K|=4.
\]

Applying the inverse rational Hadamard wedge sends every displayed vector back to an integral vector of \(N\), so this lattice lies in both \(N\) and \(W_HN\). Its index proves it is the full intersection.

## 3. Gram decomposition

The nonzero pairings are

\[
(P,Q)=2,
\qquad
(u,u)=-2,
\qquad
(Z,Y)=-2.
\]

Therefore

\[
\operatorname{Gram}(J)
=U(2)\oplus\langle-2\rangle\oplus U(-2).
\]

Its determinant is

\[
\det J=-32.
\]

This agrees with

\[
\det J
=\det N\,[N:J]^2
=-2\cdot4^2
=-32.
\]

## 4. Five-bit discriminant group

Each hyperbolic \(U(\pm2)\) block contributes \((\mathbb Z_2)^2\), and the norm-\(-2\) line contributes \(\mathbb Z_2\). Hence

\[
A_J
\cong
(\mathbb Z_2)^2
\oplus\mathbb Z_2
\oplus(\mathbb Z_2)^2
\cong
(\mathbb Z_2)^5.
\]

The group is elementary binary, but its quadratic refinement is not merely a bilinear bit form.

## 5. Quarter-valued quadratic refinement

Write a discriminant class as

\[
(a,b,c,d,e)\in\mathbb F_2^5.
\]

Using

\[
q(x)=\frac{(x,x)}2\pmod{\mathbb Z},
\]

define its quarter exponent \(q_4=4q\pmod4\). Then

\[
\boxed{
q_4(a,b,c,d,e)
=2ab+3c+2de\pmod4.}
\]

The value distribution is

\[
\boxed{
0^{10},\quad1^6,\quad2^6,\quad3^{10}.}
\]

Its Gauss sum is

\[
\sum_{x\in A_J}i^{q_4(x)}
=4-4i,
\]

whose magnitude is

\[
\sqrt{32}.
\]

The discriminant form is therefore nondegenerate and carries a genuine fourth-root refinement despite its elementary two-group.

## 6. Relation to the programme's earlier five-bit structures

The programme already contains several order-32 objects:

- the five-bit affine sign-defect quotient;
- the old source quotient \(M/I\), although that group is \(\mathbb Z_4\oplus(\mathbb Z_2)^3\), not elementary;
- the sign-central two-qubit Heisenberg group.

The new object is different:

\[
A_J\cong(\mathbb Z_2)^5
\]

is a discriminant group equipped with the specific quarter-valued form

\[
2ab+3c+2de.
\]

No identification with the source five-bit sign lattice follows from the group order. Such an identification would require an isometry of quadratic forms and field labels.

## 7. Structural interpretation

The lattice tower is now:

\[
I_H
\subset
M,\ W_HM
\subset
N,\ W_HN,
\]

with a second common layer

\[
I_H\subset J=N\cap W_HN.
\]

The face intersection \(I_H\) retains the full \(2\)- and \(3\)-primary arithmetic. The ambient intersection \(J\) forgets the ternary depth and leaves a five-bit quadratic boundary.

This suggests two complementary common structures:

- \(I_H\): the fine arithmetic core;
- \(J\): the coarse binary ambient shell.

## 8. Consequences

### Established

- \(N\cap W_HN\) has index four in each ambient lattice;
- its Gram lattice is \(U(2)\oplus\langle-2\rangle\oplus U(-2)\);
- its discriminant group is \((\mathbb Z_2)^5\);
- its quarter-phase distribution and Gauss sum are exact.

### Open

- whether the five discriminant bits admit the Furey field labels;
- whether the quadratic form is isometric to a source-derived five-bit phase form;
- whether the order-24 code group acts on \(A_J\);
- whether \(J\) has a natural Jordan-triple interpretation;
- whether its fourth-root Gauss phase is a physical anomaly or Pfaffian phase.

## 9. Stop-everything and falsification gates

### Stop-everything

1. The five Furey support fields map isometrically to \(A_J\).
2. The code automorphism group preserves \(q_4=2ab+3c+2de\).
3. A physical determinant line realizes the normalized Gauss phase \((1-i)/\sqrt2\).
4. Jordan-triple recursion produces \(J\) as the common binary boundary of its two integral faces.

### Boundaries

- order 32 alone supplies no identification;
- \(A_J\) is elementary while \(M/I\) is not;
- the quarter-valued refinement must be preserved by any proposed field map;
- the Gauss phase is arithmetic until a physical line is constructed.

## Certificate and companions

- [Ambient intersection and five-bit discriminant certificate](../../../verification/derive/derive_intersection_of_two_ambient_spin23_lattices_and_five_bit_discriminant.mjs)
- [Two-face glue theorem](545_the_two_hadamard_faces_are_transverse_isotropic_glues_with_a_two_bit_obstruction.md)
- [Common fine arithmetic core](544_the_common_hadamard_fiber_is_U8_plus_minus2_plus_Uminus18.md)
- [Primitive-wedge ambient lattice](509_the_index_six_spin23_lattice_has_an_explicit_primitive_wedge_square_and_lorentz_selector_dictionary.md)
