# The Hadamard core pairs quartic orientation with weak difference in a ternary radical

## Status

**Exact comparison of two quotient constructions on the same integral lattice \(M\).**

The kernel of the glue parity map on the old source quotient is

\[
\boxed{
\ker\overline\pi_H
=\langle r,s+t\rangle
\cong\mathbb Z_4\oplus\mathbb Z_2.}
\]

The two generators mean:

- \(r\): the independent quartic orientation direction;
- \(s+t\): the oriented weak-difference line killed by exchange coinvariants.

In the new Hadamard-face quotient \(M/I_H\cong C_4\oplus C_6\), these same integral vectors become inverse order-three classes:

\[
\boxed{
[r]=2h_6,\qquad
[s+t]=4h_6=-2h_6.}
\]

Equivalently,

\[
\boxed{r+s+t\in I_H.}
\]

Both classes lie in the mutual radical and are invisible to the opposite face.

## 1. Kernel in the old quotient

The old source intersection gives

\[
G=M/I
\cong\mathbb Z_4\oplus(\mathbb Z_2)^3.
\]

The glue parity map is

\[
\overline\pi_H:G\to\mathbb F_2^2,
\qquad
\pi_H(av+bw+cr+ds+et)
=(a+b,d+e)\pmod2.
\]

Its kernel has order eight. Direct enumeration shows

\[
\ker\overline\pi_H
=
\{ar+b(s+t):a\in\mathbb Z_4,\ b\in\mathbb Z_2\}.
\]

The two generators are independent in \(G\), so

\[
\ker\overline\pi_H
\cong\mathbb Z_4\oplus\mathbb Z_2.
\]

Thus the exchange-coinvariant Heisenberg plane is obtained by removing exactly the quartic orientation line and the weak antisymmetric line.

## 2. Their images in the Hadamard face quotient

The new quotient map is

\[
\rho_H:M\to C_4\oplus C_6,
\]

\[
\rho_H(av+bw+cr+ds+et)
=
(a+b,\ 2c+d-3e)
\pmod{(4,6)}.
\]

Applying it gives

\[
\rho_H(r)=(0,2),
\]

and

\[
\rho_H(s+t)=(0,-2)=(0,4).
\]

Both have order three. Their sum vanishes:

\[
\rho_H(r+s+t)=0.
\]

Therefore

\[
r+s+t\in I_H.
\]

The relation is not inferred from group orders; it is an exact integral congruence in the common-core basis.

## 3. Why the orders change

There is no contradiction in one vector having order four modulo \(I\) and order three modulo \(I_H\). The two quotients use different sublattices:

\[
I=K\cap M,
\qquad
I_H=M\cap W_HM.
\]

They impose different congruence conditions. Quotient order is a property of a vector relative to the chosen sublattice, not an intrinsic order of the integral vector.

The exact statement is therefore:

\[
\boxed{
\begin{array}{c|cc}
&M/I&M/I_H\\
\hline
r&4&3\\
s+t&2&3\\
r+s+t&\text{generally nonzero}&0
\end{array}}
\]

This is a cross-prime change of arithmetic presentation, not a literal conversion of a physical fourth root into a cube root.

## 4. Invisibility to the opposite face

The mutual pairing between face coefficients \((A,B)\) and opposite-face coefficients \((C,D)\) is

\[
b((A,B),(C,D))
=\frac{AC+BD}{2}\pmod{\mathbb Z}.
\]

Both

\[
(0,2)
\quad\text{and}\quad
(0,4)
\]

pair trivially with every \((C,D)\). Hence

\[
\boxed{
[r],[s+t]\in\operatorname{Rad}_L(H_M).}
\]

The opposite face's parity characters cannot recover the lost weak orientation. The failure is exact and persists even before quotienting the opposite face by its radical.

## 5. Interpretation

The arithmetic tower now separates three kinds of information:

1. **coinvariant Heisenberg data**
   \[
   G/\langle r,s+t\rangle\cong\mathbb F_2^2;
   \]
2. **quartic orientation data**
   carried by \(r\) relative to the source intersection \(I\);
3. **ambient radical data**
   in which \(r\) and \(s+t\) become inverse ternary classes relative to \(I_H\).

The common Hadamard core therefore does not make weak orientation into a dual Heisenberg character. It binds weak orientation to the independent quartic line inside an order-three ambient-completion channel.

## 6. Consequences

### Established

- the parity kernel is exactly \(\mathbb Z_4\langle r\rangle\oplus\mathbb Z_2\langle s+t\rangle\);
- \(r\) and \(s+t\) become inverse order-three classes modulo \(I_H\);
- their sum lies in the common core;
- both lie in the mutual radical;
- no opposite-face discriminant character detects the weak-difference class.

### Falsified

- the opposite parity face does not restore the lost puncture orientation;
- the quartic centre cannot be recovered as a character of the glue parity quotient;
- the ternary radical relation is not itself a physical identification of fourth- and third-root phases.

### Open

- whether the relation \(r+s+t\in I_H\) has a Furey/Jordan interpretation;
- whether the ternary radical is the correct home for an anomaly-cancellation or family constraint;
- whether a metaplectic line couples the independent quartic orientation to this radical relation;
- whether the ambient completion supplies an operator sensitive to \(s+t\) outside the face pairing.

## 7. Stop-everything and falsification gates

### Stop-everything

1. A source field relation derives \(r+s+t\) directly.
2. The order-three radical is identified with a known qutrit-code constraint or generation-family operation.
3. A determinant/Pfaffian line couples the quartic orientation character to the ternary radical without equating their raw phases.
4. Jordan-triple recursion produces the same relation as an associator or face-transition defect.

### Boundaries

- quotient-dependent order must not be interpreted as intrinsic particle order;
- radical invisibility rules out recovery by the existing Heisenberg commutator;
- the relation joins arithmetic presentations, not yet physical observables;
- further progress requires structure beyond the two face discriminant pairing.

## Certificate and companions

- [Orientation/weak-difference kernel certificate](scripts/analyze_orientation_and_weak_difference_kernel_across_two_intersections.mjs)
- [Exchange-coinvariant glue plane](547_the_glue_parity_plane_is_the_exchange_coinvariant_not_the_two_puncture_plane.md)
- [Two-face glue pairing](545_the_two_hadamard_faces_are_transverse_isotropic_glues_with_a_two_bit_obstruction.md)
- [Old quartic orientation character](536_the_quartic_m_over_i_character_is_an_independent_global_orientation_line.md)
