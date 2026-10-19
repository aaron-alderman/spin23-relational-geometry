# The Oriented Source Wedge Meets the Index-Six Selector Lattice at Index 192

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B09, B10, B11, B13 and B14  
**Claim status:** exact primitive-wedge and lattice-intersection theorem; physical identification of the common intersection remains open

## 1. Executive result

Let

\[
V_{\rm supp}\subset\widetilde V_{S_1}
\]

be the index-four inclusion selected by the oriented half-pairs. Equip \(\widetilde V_{S_1}\) with the unimodular symplectic form for which

\[
\langle z_D,\widehat z\rangle,
\qquad
\widehat z=\frac{z_D+z_C}{2},
\]

is Lagrangian.

Then

\[
\Lambda_0^2\widetilde V_{S_1}
\cong
N:=2U\oplus\langle-2\rangle,
\]

the standard integral \(Spin(2,3)\) lattice.

The primitive wedge inherited from the original support quotient,

\[
K=
\Lambda^2V_{\rm supp}
\cap
\Lambda_0^2\widetilde V_{S_1},
\]

has index

\[
\boxed{[N:K]=64.}
\]

It is not the previously constructed index-six selector lattice

\[
M=\langle2\rangle\oplus\langle-2\rangle^2\oplus U(-3).
\]

The two lattices are incomparable. Their intersection

\[
I=K\cap M
\]

satisfies

\[
\boxed{
[K:I]=3,\qquad
[M:I]=32,\qquad
[N:I]=192.}
\]

Equivalently,

\[
\boxed{
192=64\cdot3=6\cdot32.}
\]

This separates the arithmetic seams exactly:

- the qutrit condition cuts the source wedge by index three;
- the source wedge cuts the binary selector-split lattice by index \(32=2^5\).

## 2. The symplectic basis of the oriented carrier

Use

\[
\begin{aligned}
a_1&=z_D,\\
a_2&=\widehat z,\\
b_1&=d_1,\\
b_2&=h_D=\frac{u^c_1+d_1}{2}.
\end{aligned}
\]

These form a unimodular basis of \(\widetilde V_{S_1}\), with

\[
\Omega(a_i,b_j)=\delta_{ij}.
\]

Therefore its primitive exterior square has the standard basis

\[
\begin{aligned}
E_1&=a_1\wedge a_2,\\
F_1&=-b_1\wedge b_2,\\
E_2&=a_1\wedge b_2,\\
F_2&=-a_2\wedge b_1,\\
R&=a_1\wedge b_1-a_2\wedge b_2
\end{aligned}
\]

and Gram lattice

\[
N=U\oplus U\oplus\langle-2\rangle.
\]

Thus the oriented overlattice itself produces no exotic \(Spin(2,3)\) lattice: its primitive wedge is the standard one.

## 3. The original support quotient inside the oriented carrier

In the symplectic basis \((a_1,a_2,b_1,b_2)\), the original quotient basis has inclusion matrix

\[
A=
\begin{pmatrix}
0&0&1&-2\\
0&0&-2&2\\
-1&1&0&-1\\
2&0&-2&2
\end{pmatrix},
\qquad
|\det A|=4.
\]

The induced exterior-square inclusion has determinant

\[
\det(\Lambda^2A)
=(\det A)^3
=4^3
=64.
\]

Intersecting with the primitive hyperplane does not remove this factor: the induced primitive constraint on the six source-wedge coefficients is

\[
5n_1-6n_2-n_3+2n_4-n_5=0,
\]

whose coefficients have gcd one.

Hence

\[
\boxed{[N:K]=64.}
\]

## 4. Explicit source-wedge basis

In the standard primitive basis

\[
(E_1,F_1,E_2,F_2,R),
\]

one basis of \(K\) is given by the columns of

\[
\begin{pmatrix}
0&0&0&0&-2\\
2&8&-12&2&0\\
0&-2&4&0&-2\\
0&-8&10&-2&0\\
0&-4&4&0&0
\end{pmatrix}.
\]

Its Gram matrix is

\[
\begin{pmatrix}
0&0&0&0&-4\\
0&0&-20&4&0\\
0&-20&48&-8&4\\
0&4&-8&0&0\\
-4&0&4&0&0
\end{pmatrix}.
\]

Its determinant is

\[
\det K
=\det N\,[N:K]^2
=-2\cdot64^2.
\]

## 5. The binary selector split is automatic

Inside \(N\), define the index-two binary selector-split lattice

\[
B_2
=
\langle
E_1+F_1,\,
E_1-F_1,\,
E_2,\,
F_2,\,
R
\rangle.
\]

Membership in \(B_2\) is the parity condition

\[
x_{E_1}\equiv x_{F_1}\pmod2.
\]

Every vector of \(K\) satisfies this condition. Therefore

\[
K\subset B_2\subset N.
\]

The indices are

\[
[N:B_2]=2,
\qquad
[B_2:K]=\frac{64}{2}=32.
\]

Thus

\[
\boxed{[B_2:K]=32=2^5.}
\]

This is the same power of two as the index of the fermion-number-plus-charge lattice inside the affine five-sign-bit lattice.

The equality is structurally explained:

\[
4^3=2^6
\]

comes from exterior-squaring an index-four inclusion in rank four, and the selector parity accounts for one factor of two, leaving

\[
2^{6-1}=2^5.
\]

The appearance of the order \(2^5\) is therefore built into the exterior-square index arithmetic. It does **not** imply five independent order-two quotient directions.

The subsequent Smith calculation gives

\[
M/I\cong\mathbb Z_4\oplus(\mathbb Z_2)^3,
\]

not \((\mathbb Z_2)^5\). The index arithmetic fixes the order; the Smith form retains an additional quartic lift.

## 6. The qutrit condition is transverse

The old index-six lattice is

\[
M=
\langle
E_1+F_1,\,
E_1-F_1,\,
E_2,\,
-3F_2,\,
R
\rangle.
\]

Relative to \(B_2\), it imposes the level-three condition

\[
x_{F_2}\equiv0\pmod3.
\]

On the coefficient lattice of \(K\), this becomes the surjective congruence

\[
n_1+n_2+n_3\equiv0\pmod3.
\]

Therefore

\[
[K:K\cap M]=3.
\]

Combining indices yields

\[
[N:K\cap M]=64\cdot3=192,
\]

and

\[
[M:K\cap M]=\frac{192}{6}=32.
\]

## 7. Why \(K\) and \(M\) are incomparable

If \(K\subset M\), then

\[
\frac{[N:K]}{[N:M]}=\frac{64}{6}
\]

would be an integer. It is not.

If \(M\subset K\), then

\[
\frac{[N:M]}{[N:K]}=\frac{6}{64}
\]

would be an integer. It is not.

Thus neither candidate is a refinement of the other.

The common arithmetic object is their index-192 intersection, not either lattice alone.

## 8. Research interpretation

The computation separates three structures that had previously been visually close:

1. \(N\): the standard unimodular symplectic primitive wedge;
2. \(K\): the wedge inherited from the original five-field coefficient lattice;
3. \(M\): the selector plus binary/qutrit phase lattice.

Their relation is

\[
\begin{array}{ccc}
&N&\\
/&&\backslash\\
K&&M\\
\backslash&&/\\
&I=K\cap M&
\end{array}
\]

with indices

\[
[N:K]=64,\quad
[N:M]=6,\quad
[N:I]=192.
\]

This rules out the simplest hoped-for conclusion:

> the oriented support wedge is not automatically the old index-six phase/selector lattice.

But it exposes a stronger local-global pattern:

\[
\text{source wedge}
\xleftarrow{\ 3\ }
\text{common intersection}
\xrightarrow{\ 32\ }
\text{phase/selector lattice}.
\]

The prime-three and five-bit binary refinements meet exactly at \(I\).

## 9. What is exact and what is still a candidate

### Exact

- the primitive wedge \(N\) of the oriented carrier;
- the index-64 source wedge \(K\);
- automatic containment \(K\subset B_2\);
- the index \(32\) inside the binary selector split;
- the transverse qutrit index-three condition;
- the intersection indices \(3,32,192\);
- incomparability of \(K\) and \(M\).

### Candidate interpretation

- \(I\) is the true arithmetic interface lattice;
- the three order-two Smith factors reproduce the support defect while the order-four factor retains the qubit/theta phase lift;
- the index \(3\) is the integral origin of the qutrit mutual seam;
- a Jordan or stress-energy selector should naturally live on \(I\).

These interpretations require explicit intertwiners, not only matching indices.

## 10. Stop-everything and falsification gates

### Stop-everything triggers

1. The support defect maps canonically onto the three order-two factors of \(M/I\).
2. The order-four factor of \(M/I\) carries the exact binary theta/metaplectic phase.
3. The qutrit charge lattice maps canonically onto \(K/I\cong\mathbb Z_3\).
4. Furey ternary transport preserves \(I\).
5. The handle group preserving the relevant phase fiber acts on \(I\).
6. Stress-energy/Jordan bilinears land in \(I\) without a fitted basis.

### Falsifiers

- \(K\) is not \(M\).
- Neither lattice contains the other.
- \(M/I\) has exponent four and is not the elementary binary group \((\mathbb Z_2)^5\).
- Equality of the two index-32 orders does not construct an isomorphism.
- The primitive wedge depends on the conditional oriented section.
- The intersection lattice is arithmetic data, not automatically spacetime.

## 11. Next calculations

1. Compute explicit generators for the \(\mathbb Z_4\) and three \(\mathbb Z_2\) factors.
2. Compare the two-torsion filtration of \(M/I\) with the support defect.
3. Compute the discriminant form of \(I\).
4. Test the support Weyl and integral handle actions on \(I\).
5. Seek a direct qutrit source map for \(K/I\cong\mathbb Z_3\).

## Certificate and companions

- [Primitive-wedge intersection certificate](../../../verification/compute/compute_primitive_wedge_of_oriented_support_overlattice.mjs)
- [Oriented index-four carrier](524_the_oriented_section_makes_the_doubled_sum_axis_a_primitive_half_axis.md)
- [Old index-six selector lattice](508_the_cross_prime_lorentzian_lattice_plus_one_selector_is_an_index_six_sublattice_of_the_standard_spin23_lattice.md)
- [Explicit primitive wedge dictionary](509_the_index_six_spin23_lattice_has_an_explicit_primitive_wedge_square_and_lorentz_selector_dictionary.md)
- [Two-puncture sign-bit index](519_the_two_puncture_smith_defect_makes_the_qubit_plane_a_discriminant_shadow.md)
- [Exact Smith quotient types](526_the_common_intersection_separates_one_qutrit_glue_from_a_quartic_binary_lift.md)
