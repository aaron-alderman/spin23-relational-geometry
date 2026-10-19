# The Cross-Prime Lorentzian Lattice Plus One Selector Is an Index-Six Sublattice of the Standard \(Spin(2,3)\) Lattice

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B09, B10, B12, B13 and B14  
**Claim status:** exact integral-lattice embedding and real-group bridge; canonicity, physical selector and precise arithmetic-subgroup equality remain open

## 1. Executive result

The rank-four Lorentzian discriminant lattice

\[
L=\langle-2\rangle^2\oplus U(-3)
\]

enters the \(Spin(2,3)\) arithmetic carrier after adjoining one positive norm-two selector:

\[
M=\langle2\rangle\oplus L.
\]

The resulting lattice has signature \((2,3)\), and there is an explicit index-six embedding

\[
\boxed{M\hookrightarrow N:=U\oplus U\oplus\langle-2\rangle.}
\]

The real spin group of either lattice is

\[
Spin(M_\mathbb R)\cong Spin(2,3)\cong Sp(4,\mathbb R).
\]

Most importantly, the index factors as

\[
6=2\times3,
\]

where the factor two comes from splitting one hyperbolic plane into a positive selector and negative companion, while the factor three comes from the qutrit scaling of one null leg in the other hyperbolic plane.

## 2. The standard rank-five lattice

Let

\[
N=U_1\oplus U_2\oplus\langle-2\rangle
\]

with basis \(e_1,f_1,e_2,f_2,r\), pairings

\[
(e_i,f_i)=1,
\qquad
r^2=-2,
\]

and all other pairings zero. Then

\[
\det N=-2,
\qquad
\operatorname{sig}N=(2,3).
\]

This is the standard small integral quadratic lattice underlying the orthogonal model of the genus-two symplectic domain. The exact equality of particular integral subgroups requires convention-sensitive arithmetic work; the real exceptional isomorphism is unambiguous.

## 3. Explicit index-six basis

Define

\[
v=e_1+f_1,
\qquad
w=e_1-f_1,
\qquad
s=e_2,
\qquad
t=-3f_2.
\]

Together with \(r\), these vectors have Gram matrix

\[
\operatorname{Gram}(v,w,r,s,t)=
\begin{pmatrix}
2&0&0&0&0\\
0&-2&0&0&0\\
0&0&-2&0&0\\
0&0&0&0&-3\\
0&0&0&-3&0
\end{pmatrix}.
\]

Therefore their span is exactly

\[
M=\langle2\rangle
\oplus\langle-2\rangle^2
\oplus U(-3).
\]

The change-of-basis determinant is six, so

\[
[N:M]=6.
\]

The determinant check is exact:

\[
\det M=(\det N)[N:M]^2=(-2)(6^2)=-72.
\]

## 4. The selector complement

The vector \(v\) is primitive and has norm two. Inside \(M\),

\[
v^\perp\cap M
=\langle w,r,s,t\rangle
\cong\langle-2\rangle^2\oplus U(-3)
=L.
\]

Thus the phase lattice is literally the orthogonal complement of one positive selector in a signature-\((2,3)\) lattice.

Inside the larger lattice \(N\), the primitive complement is

\[
v^\perp\cap N
\cong\langle-2\rangle^2\oplus U.
\]

The cross-prime lattice \(L\) is index three in this primitive complement, because it replaces \(U\) by the null-leg sublattice \(U(-3)=\langle e_2,-3f_2\rangle\).

## 5. Arithmetic meaning of the factors two and three

The embedding separates the two prime seams geometrically:

### Binary factor

Replacing \(e_1,f_1\) by

\[
v=e_1+f_1,
\qquad
w=e_1-f_1
\]

has determinant two. It turns one hyperbolic plane into orthogonal norm \(+2\) and norm \(-2\) lines. The positive line is the selector; the negative line contributes one binary discriminant factor.

### Qutrit factor

Replacing \(f_2\) by \(-3f_2\) has index three and turns \(U\) into \(U(-3)\). Its discriminant form is the qutrit hyperbolic phase \(2ab/3\).

The remaining root \(r^2=-2\) supplies the second binary discriminant factor.

Hence the previously abstract CRT combination is visible as one index-two selector split and one index-three null-leg restriction inside a single rank-five lattice.

## 6. Relation to the central thesis

This is the strongest exact arithmetic realization so far of the proposed role

\[
Spin(2,3)
\quad\text{as an interface between a five-dimensional carrier and a four-dimensional Lorentzian slice}. 
\]

The five-dimensional lattice \(M\) carries the real \(Spin(2,3)\) quadratic form. Choosing the positive vector \(v\) leaves the Lorentzian complement \(L\), whose discriminant form packages the binary and qutrit projective data.

However, the construction does not yet prove that the Standard Model dynamically chooses \(v\), that \(L\) is spacetime, or that the index-six sublattice is unique. Orthogonal direct sum with \(\langle2\rangle\) is mathematically economical but could still be an imposed completion.

## 7. Stop-everything significance

The result meets a major mathematical stop-everything criterion:

\[
\boxed{
\text{cross-prime phase lattice}
+\text{one norm-2 selector}
\subset_{\mathrm{index} 6}
\text{standard }Spin(2,3)\text{ lattice}.}
\]

The programme should now prioritize whether the selector and index-six restriction are forced by source structures:

1. does the Jordan rank-one idempotent supply \(v^2=2\)?
2. does Furey weak-root transport supply the \(-3f_2\) null-leg restriction?
3. does the anomaly code supply the two norm-minus-two roots?
4. does the resulting arithmetic subgroup reproduce the equal-discriminant-five handle group?

## 8. Falsification and boundary conditions

- The real isomorphism \(Spin(2,3)\cong Sp(4,\mathbb R)\) does not automatically identify their chosen integral groups.
- The norm-two selector is not yet derived or unique.
- An index-six sublattice is not automatically a physical compactification or lattice universe.
- The Lorentzian complement is a phase lattice until an observable or stress-energy map identifies it with spacetime.
- Any claimed canonical embedding must explain both prime factors, not merely reproduce signature \((2,3)\).

## 9. Next calculations

1. Determine the image of the stabilizer of \(v\) in the discriminant group and compare it with \(O(A,q)\).
2. Determine the congruence subgroup of \(O^+(N)\) preserving the index-six sublattice \(M\).
3. Translate the basis \((v,w,r,s,t)\) into the five-dimensional wedge-square representation of \(Sp(4)\).
4. Test whether the Furey five-field spanning tree maps naturally to the four complement vectors and selector.

The subsequent generator analysis shows that the primitive handle generators transport this lattice through a 240-fiber orbit rather than preserving it. See [The handle group transports a 240-fiber family of cross-prime phase lattices instead of preserving one](510_the_handle_group_transports_a_240_fiber_family_of_cross_prime_phase_lattices_instead_of_preserving_one.md).

## Certificate and companions

- [Index-six lattice-embedding certificate](scripts/verify_cross_prime_lattice_index_six_embedding_in_standard_spin23_lattice.mjs)
- [Lorentzian discriminant lattice](506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md)
- [Exact global \(Sp(4,\mathbb R)\)-\(Spin_0(2,3)\) isomorphism](47_global_group_isomorphism_sp4r_spin023.md)

