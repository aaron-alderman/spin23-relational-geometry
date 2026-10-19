# The Standard-Model flag is an index-six stabilizer inside the ambient five-bit orthogonal group

## Executive result

Cycle 468 produced a finite quadratic isometry

\[
\Phi:(\mathbb F_2^5,q_{\rm SM})\longrightarrow(\mathbb F_2^5,q_J),
\]

where

\[
q_{\rm SM}(x)=3(x_1+x_2+x_3)+x_4+x_5\pmod4
\]

and

\[
q_J(a,b,c,d,e)=2ab+3c+2de\pmod4.
\]

The next question is whether this isometry merely matches phase tables or also transports the Standard-Model (3+2) flag into an intrinsic subgroup of the ambient shell.

An exhaustive calculation gives

\[
\boxed{|O(q_J)|=72}
\]

and

\[
\boxed{
\Phi(S_3\times S_2)\Phi^{-1}
=
\operatorname{Stab}_{O(q_J)}(C_\Phi),
\qquad |\operatorname{Stab}(C_\Phi)|=12,}
\]

where (C_\Phi) is the transported three-dimensional color subspace. Consequently the ambient shell contains exactly

\[
[O(q_J):S_3\times S_2]=6
\]

symmetry-related (3+2) flags of this type.

This is an exact finite theorem. Cycles 470–471 subsequently lift the correspondence and the entire order-72 finite group integrally. Selection of one of the six flags and derivation of the phase assignment from Furey's algebra remain open.

## 1. The two quadratic spaces

Let

\[
V_{\rm SM}=\mathbb F_2^5=C\oplus W,
\qquad
\dim C=3,
\quad
\dim W=2,
\]

with the evident coordinate actions of (S_3) on (C) and (S_2) on (W). The additive refinement is

\[
q_{\rm SM}=3x_1+3x_2+3x_3+x_4+x_5.
\]

The ambient discriminant shell is

\[
V_J=\mathbb F_2^5,
\qquad
q_J=2ab+3c+2de.
\]

The associated bilinear pairing is recovered from

\[
b_q(x,y)=\frac{q(x+y)-q(x)-q(y)}2\pmod2.
\]

Both refinements are nondegenerate. The color and weak summands of (V_{\rm SM}) are mutually orthogonal, so transporting (C) also transports its two-dimensional orthogonal complement (W).

## 2. The explicit finite isometry

Using column vectors, take (Phi) to have columns

\[
\begin{aligned}
u_1&=(1,0,1,0,0)^T,\\
u_2&=(0,1,1,0,0)^T,\\
u_3&=(1,1,1,1,1)^T,\\
v_1&=(1,1,1,1,0)^T,\\
v_2&=(1,1,1,0,1)^T.
\end{aligned}
\]

Direct evaluation on all 32 vectors proves

\[
q_J(\Phi x)=q_{\rm SM}(x).
\]

The transported color and weak spaces are therefore

\[
C_\Phi=\langle u_1,u_2,u_3\rangle,
\qquad
W_\Phi=\langle v_1,v_2\rangle=C_\Phi^\perp.
\]

This map is non-coordinate: individual source bits become mixtures of the two hyperbolic pairs and the odd ambient coordinate. That mixing is precisely how the construction escapes the coordinate-normal obstruction of Cycle 467.

## 3. Exhausting the ambient orthogonal group

The certificate constructs every ordered image of the standard basis that preserves both (q_J) and its polar pairing. It finds 72 distinct invertible matrices and verifies

\[
q_J(Ax)=q_J(x)
\]

for every matrix (A) and all 32 vectors (x).

The refinement has the characteristic odd vector

\[
\kappa=(0,0,1,0,0),
\qquad q_J(\kappa)=3,
\]

and every element of (O(q_J)) fixes (kappa). Its orthogonal complement carries the corresponding four-dimensional plus-type binary quadratic geometry. Thus the computed group has the expected structure and order of

\[
O^+(4,2)\cong (S_3\times S_3)\rtimes C_2,
\qquad |O^+(4,2)|=72.
\]

The fixed odd line is important: the ambient symmetry is not an unrestricted permutation of five equivalent bits. It already distinguishes the anisotropic singleton from the two hyperbolic planes.

## 4. Transporting the Standard-Model permutation group

For each source permutation

\[
P\in S_3\times S_2,
\]

form

\[
\widehat P=\Phi P\Phi^{-1}.
\]

All 12 transported matrices lie in (O(q_J)), and they are distinct. Hence

\[
G_{\rm SM}^{\rm fin}:=\Phi(S_3\times S_2)\Phi^{-1}
\hookrightarrow O(q_J)
\]

is an exact subgroup embedding.

This statement concerns the Weyl-like permutation shadow of the (3+2) split. It is not an embedding of the continuous Standard Model gauge group into (O(q_J)).

## 5. The exact stabilizer theorem

The exhaustive search then tests all 72 ambient isometries against the transported color plane. Exactly 12 obey

\[
A(C_\Phi)=C_\Phi.
\]

Their matrix set agrees exactly with the transported source group:

\[
\boxed{
\operatorname{Stab}_{O(q_J)}(C_\Phi)
=G_{\rm SM}^{\rm fin}
\cong S_3\times S_2.}
\]

Because (W_\Phi=C_\Phi^\perp), this is equally the stabilizer of the full orthogonal decomposition

\[
V_J=C_\Phi\perp W_\Phi.
\]

The orbit-stabilizer theorem gives an orbit of size six:

\[
|O(q_J)\cdot C_\Phi|=72/12=6.
\]

Therefore the (3+2) flag is intrinsic as a *type* of decomposition inside the ambient form, but the form alone does not distinguish one member of its six-element orbit.

## 6. Interpretation

The result sharpens the bridge in three ways.

First, the Standard-Model flag is not imposed by an arbitrary subgroup choice after the isometry is found. Its permutation shadow is the **full stabilizer** of the transported color plane.

Second, the ambient form restores a larger symmetry. Choosing a (3+2) flag breaks the order-72 ambient group to the order-12 source subgroup:

\[
O(q_J)\longrightarrow S_3\times S_2.
\]

Third, there are six candidate embeddings. A successful physical construction must explain why one flag is realized, or else show that the six are gauge-equivalent, summed over, or related to another multiplicity such as generations, polarizations or boundary faces.

The present result is therefore a finite symmetry-breaking geometry, not yet a dynamical symmetry-breaking mechanism.

## 7. What this does and does not establish

### Established in the finite model

- (O(q_J)) has order 72.
- Every ambient isometry fixes the characteristic odd vector (kappa).
- The transported (S_3\times S_2) has order 12.
- It is exactly the stabilizer of the transported color plane and its (3+2) orthogonal decomposition.
- The ambient group acts transitively on six such transported flags.

### Candidate bridge

- the six flags may encode six admissible arithmetic or boundary embeddings of the Standard-Model support data;
- selecting one flag may be the finite shadow of the selector that reduces a larger Jordan or symplectic symmetry;
- the fixed characteristic vector may connect the odd Brown orientation to the previously found quartic orientation line.

### Still not established

- a derivation of the nondegenerate phase lattice from the natural source sign lattice;
- a preferred oriented \(Spin(2,3)\), \(Pin(2,3)\) or metaplectic lift;
- a Furey/Jordan derivation of \((-i)^3(+i)^2\);
- a physical identification of the six-element orbit;
- any new particle, coupling or observable.

## 8. Stop-everything and falsification gates

### Stop-everything

1. **Reached in Cycles 470–471:** the finite isometry \(\Phi\), and then all of \(O(q_J)\), lift integrally to the ambient intersection lattice. Derivation from the natural source support lattice remains open.
2. Furey's color/weak operators select \(C_\Phi\perp W_\Phi\) and derive the opposite quarter phases without an added convention.
3. The six flags acquire a forced interpretation already present elsewhere in the programme—for example six oriented boundary polarizations or a quotient of the 240-fiber family.
4. The fixed characteristic vector is proved to be the same orientation datum as the quartic theta line.

### Falsification and boundary tests

1. If no source operation produces the signed phase lattice despite the integral lift, the result remains an arithmetic completion rather than a physical derivation.
2. If the six flags have no natural action under the established handle group, they should not be promoted to physical sectors.
3. If Furey's actual operator action mixes color and weak axes incompatibly with \(q_{\rm SM}\), the selected additive refinement is not source-derived.
4. If choosing a flag necessarily violates chirality, hypercharge or anomaly cancellation, this bridge must be demoted.

## 9. Next calculations

1. Test whether the surjection \(O(J)\to O(q_J)\) admits a multiplicative section.
2. Compute the action of the established code and handle generators on the six-flag orbit.
3. Compare the characteristic odd vector and its Gauss phase with the quartic theta-orientation character.
4. Transport explicit Furey color and weak generators through the five-bit source quotient rather than only their permutation Weyl groups.

## Certificate and companions

> **Cycles 470–471 resolution.** The finite matrix \(\Phi\) has an explicit determinant-minus-one lift from the diagonal phase lattice to \(J\), and every element of \(O(q_J)\) lifts integrally. See [The finite phase isometry lifts exactly](554_the_finite_standard_model_phase_isometry_lifts_exactly_to_the_integral_spin23_intersection_lattice.md) and [All six flags lift integrally, but orientation does not descend](555_all_six_standard_model_flags_lift_integrally_but_orientation_does_not_descend.md). What remains open is source derivation, orientation and physical selection.

- [Orthogonal-group and flag-stabilizer certificate](../../../verification/transport/transport_sm_flag_into_orthogonal_group_of_ambient_five_bit_shell.mjs)
- [Flag-invariant additive refinement](552_the_standard_model_3_plus_2_flag_plus_additivity_selects_an_ambient_five_bit_form.md)
- [Coordinate-normal obstruction](551_no_ambient_type_five_bit_twist_is_selected_by_the_standard_model_3_plus_2_flag.md)
- [Ambient five-bit quadratic shell](549_the_two_ambient_spin23_lattices_intersect_in_a_five_bit_quadratic_shell.md)

