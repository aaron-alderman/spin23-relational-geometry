# The Oriented Section Makes the Doubled Sum Axis a Primitive Half-Axis

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B09, B10, B11 and B14  
**Claim status:** exact conditional overlattice and symplectic-saturation theorem; physical choice between the original quotient and the oriented overlattice remains open

## 1. Executive result

Adjoining the two half-pairs selected by the oriented puncture relations,

\[
h_D=\frac{u^c_1+d_1}{2},
\qquad
h_C=\frac{d_1+d^c_1}{2},
\]

produces an index-four overlattice

\[
V_{\rm supp}\subset\widetilde V_{S_1},
\qquad
[\widetilde V_{S_1}:V_{\rm supp}]=4.
\]

In the original support quotient, the meridian plane

\[
\langle z_D,z_C\rangle
\]

was primitive. In the oriented overlattice it has saturation index two, because

\[
\boxed{
\widehat z=\frac{z_D+z_C}{2}
\in\widetilde V_{S_1}.}
\]

The saturated primitive plane is

\[
\boxed{
L_{\rm sat}=\langle z_D,\widehat z\rangle,}
\]

and

\[
z_C=2\widehat z-z_D,
\qquad
z_{C+D}=2\widehat z.
\]

Thus the coefficient two in the integral word has an exact lattice meaning:

\[
\boxed{
\text{the old sum axis is twice a primitive relational direction}.}
\]

This is conditional on the oriented section \(S_1\), but once that section is chosen the result is exact.

## 2. The oriented index-four overlattice

Use the original quotient basis

\[
(u^c_1,d_1,\nu,d^c_1).
\]

The half-pairs are

\[
h_D=\left(\frac12,\frac12,0,0\right),
\qquad
h_C=\left(0,\frac12,0,\frac12\right).
\]

A basis of the enlarged lattice is

\[
H=(h_D,h_C,d_1,\nu).
\]

Relative to the original basis its determinant has absolute value \(1/4\), so

\[
[\widetilde V_{S_1}:V_{\rm supp}]=4.
\]

Conversely, the original basis vectors have \(H\)-coordinates

\[
\begin{aligned}
u^c_1&=2h_D-d_1,\\
d_1&=d_1,\\
\nu&=\nu,\\
d^c_1&=2h_C-d_1.
\end{aligned}
\]

The determinant of this inclusion matrix is four.

## 3. The meridian axes in the enlarged basis

In \(H\)-coordinates,

\[
z_D=(0,-2,0,-1),
\qquad
z_C=(-2,0,0,-1).
\]

Their sum is

\[
z_{C+D}=(-2,-2,0,-2).
\]

The greatest common divisor of the \(2\times2\) minors of \((z_D\ z_C)\) is two. Therefore the plane they generate is not primitive in \(\widetilde V_{S_1}\).

Its half-sum is integral:

\[
\widehat z
=\frac{z_D+z_C}{2}
=(-1,-1,0,-1).
\]

The minors of \((z_D\ \widehat z)\) have gcd one, proving that

\[
L_{\rm sat}=\langle z_D,\widehat z\rangle
\]

is primitive.

## 4. Why the half-axis is source-derived

The common \(11\) element of the selected section is represented by the even field pair

\[
e+\nu.
\]

But

\[
z_{C+D}=-e-\nu
\]

in the support quotient. Hence

\[
\frac{e+\nu}{2}
=-\widehat z.
\]

The primitive relational direction is therefore not inserted as an abstract half-vector. It is the half-sum class already carried by the weak-doublet pair in the selected Smith section.

## 5. Symplectic completion of the saturated plane

The four vectors

\[
(z_D,\widehat z,d_1,h_D)
\]

form a unimodular basis of \(\widetilde V_{S_1}\). Declaring

\[
\Omega(z_D,d_1)=1,
\qquad
\Omega(\widehat z,h_D)=1
\]

and all other elementary pairings zero up to alternation gives a unimodular symplectic form on the overlattice.

Thus:

- \(L_{\rm sat}\) is a primitive Lagrangian plane;
- \(\widetilde V_{S_1}\) is an integral symplectic lattice;
- the original axes \((z_D,z_C)\) are an index-two presentation of that Lagrangian plane.

## 6. The original and enlarged symplectic models are different

The previous cycle constructed a unimodular alternating form directly on

\[
V_{\rm supp}.
\]

A proper integral overlattice cannot preserve that same unimodular form integrally, because a unimodular symplectic lattice is self-dual.

Conversely, the unimodular form on \(\widetilde V_{S_1}\) restricts to a form on \(V_{\rm supp}\) with determinant

\[
\boxed{
[\widetilde V_{S_1}:V_{\rm supp}]^2
=4^2
=16.}
\]

The programme therefore faces a genuine lattice fork:

1. **primitive quotient model:** \(V_{\rm supp}\) is the fundamental symplectic lattice and \(\langle z_D,z_C\rangle\) is primitive;
2. **oriented overlattice model:** \(\widetilde V_{S_1}\) is fundamental and the primitive plane is \(\langle z_D,\widehat z\rangle\).

These models are rationally isomorphic but integrally inequivalent.

## 7. The shear in the primitive basis

Let

\[
a=z_D,
\qquad
b=\widehat z.
\]

Then

\[
z_C=2b-a,
\qquad
z_{C+D}=2b.
\]

Rewriting the three-transvection shear in this primitive basis gives

\[
K_{\rm prim}
=
\begin{pmatrix}
2&-2\\
-2&12
\end{pmatrix},
\qquad
\det K_{\rm prim}=20.
\]

The determinant relation is

\[
\boxed{
20=4\cdot5,}
\]

where the factor four is the square of the axis-plane index and five is the original discriminant of \(K_+\).

This is the expected determinant transformation under the index-two change from \((a,b)\) to \((z_D,z_C)\).

## 8. Interpretation

The coefficient two has appeared in three exact ways:

1. as the overlap multiplicity of the positive charge pairs on \(d_1\);
2. as the coefficient in the primitive support relation;
3. as the saturation index of the original meridian plane.

These are no longer separate observations:

\[
\boxed{
\text{shared field}
\Longleftrightarrow
\text{Smith half-class}
\Longleftrightarrow
\text{primitive half sum-axis}.}
\]

This is one of the strongest integral convergences in the programme.

## 9. What remains open

- whether the oriented section is physically intrinsic;
- whether the fundamental carrier is \(V_{\rm supp}\) or \(\widetilde V_{S_1}\);
- which integral symplectic form is selected by Furey or stress-energy data;
- how the primitive wedge of the enlarged carrier sits relative to the index-six \(Spin(2,3)\) lattice;
- whether the half-axis has a direct Jordan idempotent or Peirce-space meaning.

## 10. Stop-everything and falsification gates

### Stop-everything triggers

1. Furey ternary composition closes integrally on \(\widetilde V_{S_1}\), not merely on \(V_{\rm supp}\).
2. The primitive wedge of \(\widetilde V_{S_1}\) reproduces the selector and cross-prime phase lattice.
3. Stress-energy bilinears couple to \(\widehat z\) as the primitive relational channel.
4. The metaplectic phase of a primitive \(\widehat z\)-transvection explains the doubled sum-axis word.

### Falsifiers

- The two symplectic lattices must not be conflated.
- A unimodular form on \(V_{\rm supp}\) does not extend integrally to the proper overlattice.
- The half-axis depends on selecting \(S_1\).
- Rational isomorphism does not erase the determinant-16 integral distinction.

## 11. Next calculations

1. Extract explicit generators of the common index-192 intersection.
2. Compare the support defect with the \((\mathbb Z_2)^3\) quotient factors.
3. Identify the order-four quotient direction with or distinguish it from the theta multiplier.
4. Test Furey ternary closure on the half-pair generators.

## Certificate and companions

- [Oriented-overlattice certificate](scripts/construct_oriented_section_index4_overlattice_and_half_sum_axis.mjs)
- [Oriented section selector](523_oriented_puncture_charge_relations_select_one_weyl_invariant_section.md)
- [Rank-four support quotient](517_the_five_furey_support_weights_present_a_rank_four_spinor_quotient_not_a_rank_five_vector_basis.md)
- [Integral symplectic-completion classification](518_the_prakash_ramya_cubic_lattice_fixes_a_primitive_meridian_plane_but_not_its_symplectic_duals.md)
- [Primitive wedge-square dictionary](509_the_index_six_spin23_lattice_has_an_explicit_primitive_wedge_square_and_lorentz_selector_dictionary.md)
- [Index-192 source/phase intersection](525_the_oriented_source_wedge_meets_the_index_six_selector_lattice_at_index_192.md)
- [Exact quotient types](526_the_common_intersection_separates_one_qutrit_glue_from_a_quartic_binary_lift.md)
