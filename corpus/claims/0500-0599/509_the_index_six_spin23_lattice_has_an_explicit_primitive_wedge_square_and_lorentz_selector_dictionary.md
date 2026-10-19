# The Index-Six \(Spin(2,3)\) Lattice Has an Explicit Primitive Wedge-Square and Lorentz-Selector Dictionary

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B09, B10, B11, B13 and B14  
**Claim status:** exact integral exterior-algebra realization; Standard-Model/Furey identification of the basis vectors remains open

## 1. Result

The standard signature-\((2,3)\) lattice and the new index-six cross-prime sublattice can be written directly inside the primitive exterior square of a rank-four symplectic lattice.

Let

\[
V=\mathbb Z\langle a_1,a_2,b_1,b_2\rangle,
\qquad
\omega=a_1\wedge b_1+a_2\wedge b_2.
\]

The primitive exterior square is

\[
\Lambda_0^2V
=\{\alpha\in\Lambda^2V:\alpha\wedge\omega=0\}.
\]

With bilinear form

\[
B(\alpha,\beta)
=-\frac{\alpha\wedge\beta}
{a_1\wedge a_2\wedge b_1\wedge b_2},
\]

it has an explicit integral basis with Gram lattice

\[
\boxed{\Lambda_0^2V\cong U\oplus U\oplus\langle-2\rangle.}
\]

This is the five-dimensional orthogonal representation through which \(Sp(4)\) realizes the exceptional \(Spin(2,3)\) isomorphism.

## 2. Standard primitive basis

Define

\[
\begin{aligned}
E_1&=a_1\wedge a_2,\\
F_1&=-b_1\wedge b_2,\\
E_2&=a_1\wedge b_2,\\
F_2&=-a_2\wedge b_1,\\
R&=a_1\wedge b_1-a_2\wedge b_2.
\end{aligned}
\]

Every vector is primitive because its wedge with \(\omega\) vanishes. Their only nonzero pairings are

\[
B(E_1,F_1)=1,
\qquad
B(E_2,F_2)=1,
\qquad
B(R,R)=-2.
\]

Therefore

\[
\operatorname{Gram}(E_1,F_1,E_2,F_2,R)
=U\oplus U\oplus\langle-2\rangle.
\]

No abstract real Lie-algebra isomorphism is being invoked here: this is an integral exterior-algebra model.

## 3. The selector and complement in exterior coordinates

The index-six basis becomes

\[
\begin{aligned}
v&=E_1+F_1
=a_1\wedge a_2-b_1\wedge b_2,\\
w&=E_1-F_1
=a_1\wedge a_2+b_1\wedge b_2,\\
r&=R
=a_1\wedge b_1-a_2\wedge b_2,\\
s&=E_2
=a_1\wedge b_2,\\
t&=-3F_2
=3a_2\wedge b_1.
\end{aligned}
\]

Their Gram matrix is

\[
\begin{pmatrix}
2&0&0&0&0\\
0&-2&0&0&0\\
0&0&-2&0&0\\
0&0&0&0&-3\\
0&0&0&-3&0
\end{pmatrix}.
\]

Thus \(v\) is a positive norm-two selector and

\[
v^\perp\cap M
=\mathbb Z\langle w,r,s,t\rangle
\cong\langle-2\rangle^2\oplus U(-3).
\]

## 4. Geometric interpretation

The vector \(v\) is not decomposable: \(v\wedge v\ne0\). It is a nondegenerate primitive two-form independent of the original symplectic form \(\omega\). Selecting \(v\) inside the five-dimensional \(Spin(2,3)\) vector representation reduces the real orthogonal symmetry to the Lorentz group of its complement:

\[
\operatorname{Stab}_{Spin(2,3)}(v)
\cong Spin(1,3)
\cong SL(2,\mathbb C).
\]

This realizes, in explicit exterior coordinates, the programme's proposed descent

\[
\text{five-dimensional relational carrier}
\xrightarrow{\text{positive selector}}
\text{four-dimensional Lorentzian sector}.
\]

The selector is an additional primitive two-form on the symplectic four-space, not a preferred vector in that four-space.

## 5. Prime data in the wedge basis

The two arithmetic seams have distinct exterior-algebra locations:

- binary selector split: \(E_1,F_1\mapsto v,w\), an index-two change of basis;
- qutrit restriction: \(F_2\mapsto-3F_2\), an index-three null-leg scaling;
- the root \(R\) supplies the second binary norm-minus-two direction.

The determinant-six change of basis is therefore not an unexplained scalar. It is the product of a face-selector split in the first hyperbolic plane and a level-three restriction in the second.

## 6. Relation to Jordan triples

The primitive exterior square is the five-dimensional vector representation of \(Spin(2,3)\), while \(V\) is its four-dimensional real symplectic spinor representation. This makes the programme's two recurring carriers simultaneous:

\[
\boxed{
V\cong\mathbb R^4\text{ symplectic spinor},
\qquad
\Lambda_0^2V\cong\mathbb R^{2,3}\text{ relational vector}.}
\]

The Jordan-triple recursion acts naturally on the four-dimensional symplectic carrier; its exterior square produces the five-dimensional quadratic carrier in which the selector lives. This is a precise mathematical version of “one carrier, two faces, three relationships,” but it is not yet a derivation from Furey matter operators or stress-energy components.

## 7. Furey mapping gate

The five-field support found for the integral transvection word also has five labels, while the wedge construction has one selector plus four complement vectors. Cardinality alone is not a bridge. The subsequent rank calculation proves that the five compact sign weights have rank four and therefore cannot map pointwise to these five independent vectors.

A real bridge must instead pass through the rank-four quotient of the five fields by their unique primitive relation, then identify that quotient with the symplectic carrier \(V\). The earlier pointwise assignment

\[
\{u^c_1,d_1,e,\nu,d^c_1\}
\longrightarrow
\{v,w,r,s,t\}
\]

is retained only as a falsified naive target. The revised quotient-to-\(V\) map must explain:

1. why the source relation is \(u^c_1+2d_1-e+\nu+d^c_1=0\);
2. which unimodular alternating form lives on the rank-four quotient;
3. how its primitive wedge acquires the selector and \((2,3)\) metric;
4. why the construction is independent of arbitrary field ordering and generation labels.

Until those four conditions are met, the exact rank match is a candidate interface rather than a derivation.

See [The five Furey support weights present a rank-four spinor quotient, not a rank-five vector basis](517_the_five_furey_support_weights_present_a_rank_four_spinor_quotient_not_a_rank_five_vector_basis.md).

## 8. Stop-everything and falsification criteria

### Stop-everything

A Furey or Standard-Model bilinear construction that produces the exact Gram matrix above on the five certified support fields would directly connect matter incidence, the cross-prime code and the \(Spin(2,3)\) vector carrier.

### Falsifiers

- A mere bijection of five labels is insufficient.
- The selector must be positive and orthogonal to all four Lorentzian directions.
- The qutrit pair must be null individually and pair to \(-3\).
- A proposed map that depends on a freely chosen field permutation has not selected the carrier.
- Exterior-square covariance must be preserved by the relevant \(Sp(4)\) action.

## 9. Next calculations

1. Compute the induced five-dimensional matrices for the integral handle generators in this wedge basis.
2. Determine the congruence conditions for preserving the index-six basis \((v,w,r,s,t)\).
3. Search the Furey five-field charge and weak-root incidence data for the target Gram matrix.
4. Test whether stress-energy bilinears naturally occupy the primitive two-form sector.

The first dynamic test finds that this basis defines one fiber in a 240-element congruence orbit, not a lattice fixed by the full handle group. See [The handle group transports a 240-fiber family of cross-prime phase lattices instead of preserving one](510_the_handle_group_transports_a_240_fiber_family_of_cross_prime_phase_lattices_instead_of_preserving_one.md).

## Certificate and companions

- [Primitive wedge-square certificate](../../../verification/verify/verify_primitive_wedge_square_realizes_spin23_lattice_and_cross_prime_selector.mjs)
- [Index-six selector embedding](508_the_cross_prime_lorentzian_lattice_plus_one_selector_is_an_index_six_sublattice_of_the_standard_spin23_lattice.md)
- [Jordan-triple to \(Sp(4)\) determination](../0000-0099/42_jordan_triple_to_sp4r_determination.md)

