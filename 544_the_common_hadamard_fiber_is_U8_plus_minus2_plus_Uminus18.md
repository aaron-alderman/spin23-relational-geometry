# The common Hadamard fiber is \(U(8)\oplus\langle-2\rangle\oplus U(-18)\)

## Status

**Exact intersection-basis, Gram-lattice and discriminant-form result.**

The common lattice beneath the degree-24 Hadamard correspondence is

\[
I_H=M\cap W_HM
\cong
U(8)\oplus\langle-2\rangle\oplus U(-18).
\]

It has signature \((2,3)\), index 24 in each adjacent fiber, determinant \(-41472\), and quotient

\[
\boxed{
M/I_H\cong C_4\oplus C_6
\cong C_2\oplus C_{12}.}
\]

This makes the correspondence concrete: the common observables are not an unspecified finite-index overlap but an explicit \(Spin(2,3)\)-signature lattice with simultaneously deepened two- and three-primary levels.

## 1. Congruence description

Use the selected basis

\[
(v,w,r,s,t)
\]

of

\[
M\cong\langle2\rangle\oplus\langle-2\rangle^2\oplus U(-3).
\]

A vector

\[
x=av+bw+cr+ds+et
\]

lies in \(W_HM\) precisely when the inverse transition has integral coordinates. The resulting congruences are

\[
\boxed{
a+b\equiv0\pmod4,}
\]

and

\[
\boxed{
2c+d-3e\equiv0\pmod6.}
\]

The first is the quartic/two-primary condition; the second combines the level-three null restriction with parity.

## 2. Explicit intersection basis

Choose

\[
\begin{aligned}
p&=v-w,\\
q&=2v+2w,\\
u&=r-2s,\\
z&=3r-3s+t,\\
y&=6s.
\end{aligned}
\]

These vectors satisfy both congruences. Their coordinate matrix in the \(M\)-basis has determinant

\[
\det K=-24.
\]

Because the previously computed intersection index is 24, they form a full basis of \(I_H\), not merely a sublattice.

## 3. Orthogonal decomposition

The nonzero pairings in this basis are

\[
(p,q)=8,
\qquad
(u,u)=-2,
\qquad
(z,y)=-18.
\]

All other pairings vanish. Hence

\[
\operatorname{Gram}(I_H)=
\begin{pmatrix}
0&8\\8&0
\end{pmatrix}
\oplus(-2)
\oplus
\begin{pmatrix}
0&-18\\-18&0
\end{pmatrix}.
\]

Therefore

\[
\boxed{
I_H\cong U(8)\oplus\langle-2\rangle\oplus U(-18).}
\]

The signature remains \((2,3)\), so the common lattice is itself a valid arithmetic \(Spin(2,3)\) carrier.

## 4. Quotient and determinant

The two congruence blocks have Smith data

\[
(1,4)
\qquad\text{and}\qquad
(1,1,6).
\]

Thus

\[
M/I_H
\cong C_4\oplus C_6.
\]

Its order is 24 and its exponent is 12. The determinant check is

\[
\det M=-72,
\]

\[
\det I_H
=\det M\,[M:I_H]^2
=-72\cdot24^2
=-41472.
\]

This independently verifies the basis and index.

## 5. Discriminant group and form

The discriminant group is

\[
\boxed{
A_{I_H}
\cong
(\mathbb Z_8)^2
\oplus\mathbb Z_2
\oplus(\mathbb Z_{18})^2.}
\]

Its order is \(41472\). In primary form,

\[
A_{I_H,2}
\cong
(\mathbb Z_8)^2\oplus(\mathbb Z_2)^3,
\]

and

\[
A_{I_H,3}
\cong
(\mathbb Z_9)^2.
\]

Using the even-lattice convention \(q(x)=(x,x)/2\pmod{\mathbb Z}\), the orthogonal summands have quadratic forms

\[
q_{U(8)}(a,b)=\frac{ab}{8},
\]

\[
q_{\langle-2\rangle}(c)=-\frac{c^2}{4},
\]

\[
q_{U(-18)}(d,e)=-\frac{de}{18}.
\]

The correspondence therefore raises the visible two-primary depth to eighth roots and the three-primary depth to ninth roots while retaining the central norm-\(-2\) line.

## 6. Relation to the earlier quartic quotient

The earlier common-intersection quotient beneath the phase fiber was

\[
\mathbb Z_4\oplus(\mathbb Z_2)^3.
\]

The present quotient

\[
C_4\oplus C_6
\]

is different. It belongs to the rational Hadamard correspondence, not to the original intersection \(M/I\) used to define \(\chi_r\).

What is shared is the quartic direction. What is new is the simultaneous order-six obstruction that couples parity to the level-three leg. The two quotients must not be conflated.

## 7. Why this is useful

The common lattice provides a precise candidate for the data that can be transported between the two integral presentations:

- \(U(8)\) retains a two-face hyperbolic plane with refined binary level;
- \(\langle-2\rangle\) preserves the Lorentz-selector norm scale;
- \(U(-18)\) retains the ternary null pair at refined level;
- \(C_4\oplus C_6\) records exactly what is lost when choosing either integral chart.

This is the most concrete current realization of “two faces of one carrier”: the faces are distinct integral overlattices of a shared arithmetic core.

## 8. Stop-everything and falsification gates

### Stop-everything

1. The Standard-Model/Furey field labels land canonically on \(p,q,u,z,y\).
2. A theta or anomaly representation of \(A_{I_H}\) recovers both the binary quartic and qutrit mutual phases.
3. The two adjacent fibers are reconstructed as distinguished isotropic overlattices of \(I_H\).
4. Jordan-triple recursion selects those two overlattices and their Hadamard correspondence.

### Boundaries

- \(I_H\) is an arithmetic common carrier, not yet a physical Hilbert space;
- eighth- and ninth-root discriminant phases are available algebraically but are not yet observables;
- \(C_4\oplus C_6\) is not the code automorphism group;
- the common lattice does not by itself select which integral face is physical.

## Certificate and companions

- [Common Hadamard-fiber lattice certificate](scripts/derive_common_hadamard_fiber_intersection_lattice_and_discriminant.mjs)
- [Degree-24 rational symplectic correspondence](543_the_hadamard_transition_is_a_degree_24_rational_symplectic_correspondence_between_index_six_fibers.md)
- [Primitive-wedge \(Spin(2,3)\) dictionary](509_the_index_six_spin23_lattice_has_an_explicit_primitive_wedge_square_and_lorentz_selector_dictionary.md)
- [Quartic phase quotient](537_the_binary_theta_phase_is_the_quartic_character_pulled_back_along_a_nonsplit_quadratic_section.md)
