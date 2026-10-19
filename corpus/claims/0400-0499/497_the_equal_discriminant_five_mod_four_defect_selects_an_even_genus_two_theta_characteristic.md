# The Equal-Discriminant-Five Mod-Four Defect Selects an Even Genus-Two Theta Characteristic

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B08, B09, B10, B12 and B14  
**Claim status:** exact finite symplectic and quadratic-refinement calculation; physical spin-structure and Standard-Model code identifications remain candidate bridges

## 1. Result

The unique missing first-kernel direction of the equal-discriminant-five handle group is not an arbitrary coordinate defect. Its annihilator

\[
\ell(X)=\operatorname{tr}A+\operatorname{tr}B+\operatorname{tr}C,
\qquad
X=\begin{pmatrix}A&B\\C&A^T\end{pmatrix}in\mathfrak{sp}_4(\mathbb F_2),
\]

selects a unique even quadratic refinement of the genus-two symplectic form:

\[
\boxed{
q_*(x_1,x_2,y_1,y_2)
=x_1y_1+x_2y_2+x_1+x_2+y_1+y_2.}
\]

More precisely, the stabilizer of \(\ell\) under the coadjoint action of \(Sp(4,\mathbb F_2)\) is exactly the stabilizer of \(q_*\). Both have order \(72\).

This is the first exact theta-characteristic datum extracted from the integral carrier.

## 2. Quadratic refinements in characteristic two

Let

\[
V=\mathbb F_2^4,
\qquad
\omega((x,y),(x',y'))=x\cdot y'+x'\cdot y.
\]

A quadratic refinement is a function \(q:V\to\mathbb F_2\) satisfying

\[
q(u+v)=q(u)+q(v)+\omega(u,v).
\]

All sixteen refinements are

\[
q_m(x,y)=x\cdot y+m\cdot(x,y),
\qquad m\in\mathbb F_2^4.
\]

They divide into ten even and six odd refinements according to their Arf invariant. For genus two, an even refinement has ten zeros and an odd refinement has six.

The relevant characteristic is

\[
m_*=(1,1,1,1).
\]

In the chosen symplectic basis,

\[
q_*(e_1)=q_*(e_2)=q_*(f_1)=q_*(f_2)=1,
\]

so

\[
\operatorname{Arf}(q_*)
=q_*(e_1)q_*(f_1)+q_*(e_2)q_*(f_2)
=1+1=0.
\]

Direct enumeration also gives ten zeros, independently confirming that \(q_*\) is even. See the standard [definition of the Arf invariant](https://encyclopediaofmath.org/wiki/Arf-invariant).

## 3. Exact stabilizer calculation

The certificate performs the following finite calculation without relying on a group database:

1. Generate all \(720\) elements of \(Sp(4,\mathbb F_2)\) from its fifteen symplectic transvections.
2. Construct the ten-dimensional Lie algebra \(\mathfrak{sp}_4(\mathbb F_2)\).
3. Retain the elements whose adjoint action preserves \(\ell\).
4. Independently enumerate the stabilizer of each of the sixteen quadratic refinements \(q_m\).
5. Compare the two sets of matrices exactly.

The result is

\[
|\operatorname{Stab}_{Sp(4,2)}(\ell)|=72,
\]

and

\[
\operatorname{Stab}_{Sp(4,2)}(\ell)
=
\operatorname{Stab}_{Sp(4,2)}(q_m)
\quad\Longleftrightarrow\quad
m=(1,1,1,1).
\]

Since there are ten even refinements and \(|Sp(4,2)|=720\), the order \(72=720/10\) also has the correct orbit-stabilizer value.

## 4. The mod-four extension

For an element in the first principal congruence kernel,

\[
g=I+2X\pmod4,
\]

the equal-discriminant-five group contains precisely a \(2^9\)-element kernel whose Lie directions obey

\[
\ell(X)=0.
\]

Thus its exact sequence has the form

\[
1\longrightarrow \ker\ell
\longrightarrow G_{(5,5)}(4)
\longrightarrow S_3\times_{\mathbb Z_2}S_3
\longrightarrow1,
\]

with

\[
|G_{(5,5)}(4)|=2^9\cdot18=9,216.
\]

This does not by itself prove that the extension splits.

## 5. A necessary correction: theta parity is not matched handle parity

The entire block product

\[
S_3\times S_3
\]

of order \(36\) preserves \(\ell\), and therefore lies inside the order-\(72\) stabilizer of \(q_*\). Consequently,

\[
S_3\times_{\mathbb Z_2}S_3
\subsetneq
S_3\times S_3
\subsetneq
\operatorname{Stab}(q_*).
\]

The equal-discriminant-five branch has two different binary restrictions:

1. **At mod two:** the two handle permutations must have the same sign.
2. **In the first mod-four kernel:** only directions with \(\ell(X)=0\) occur.

The second restriction selects an even theta characteristic. The first is strictly stronger handle-sewing information and is not explained merely by preservation of that characteristic.

This falsifies the tempting identification “matched handle parity = theta parity.” They are related layers, not identical invariants.

## 6. Why this matters for the determinant-line branch

A quadratic refinement of the mod-two intersection pairing is the algebraic datum underlying a spin structure on an oriented surface. Even/odd parity is its Arf invariant. The result therefore supplies an exact candidate object for the previously qualitative determinant-line and fermion-parity branch:

\[
\text{equal discriminant five}
\longrightarrow
\ker\ell
\longrightarrow
q_*
\longrightarrow
\text{even genus-two spin structure candidate}.
\]

The first two arrows are exact finite algebra. The final physical interpretation is not yet established. In particular, no fermion determinant, Pfaffian line or worldsheet functional integral has yet been constructed from the handle transfer model.

## 7. Relation to the Standard-Model triorthogonal code

The Prakash–Ramya qubit construction also retains a binary refinement invisible in the naive mod-two cubic equation: integral overlap divisibilities produce a triply-even Reed–Muller code and an exact transversal phase.

The new theta result makes the comparison sharper but does not close it. A valid identification must construct an integral two-logical sewing for which:

- the induced symplectic form is the genus-two intersection form;
- the induced quadratic refinement is \(q_*\), not an arbitrarily chosen even characteristic;
- the code's mod-eight or mod-sixteen phase data induce the carrier's mod-four character \(\ell\);
- the matched handle-sign condition is derived separately rather than silently equated with the Arf invariant.

## 8. Relation to Clifford and metaplectic structure

The finite phase space of two qubits has symplectic quotient \(Sp(4,\mathbb F_2)\). Choosing \(q_*\) reduces this quotient to its even orthogonal stabilizer of order \(72\). This is a plausible finite shadow of a theta or metaplectic refinement of the integral genus-two action.

However:

- a finite Clifford representation is not yet the real Weil representation;
- a theta characteristic is not yet a physical fermionic state;
- a metaplectic double cover is not automatically the Standard-Model spin group;
- none of these facts alone selects the noncompact real form \(Sp(4,\mathbb R)\).

The existing positive Jordan/Dirichlet-to-Neumann construction remains responsible for the real-form and positivity selection.

## 9. Highest-value next calculations

### A. Integral theta multiplier

Compute the action of the three integral handle generators on genus-two theta characteristics and the theta multiplier modulo four or eight. Determine whether the observed kernel character \(\ell\) is exactly the linearization of that multiplier.

**Stop-everything result:** the transfer generators preserve a canonical theta line whose multiplier kernel is exactly the computed mod-four group.

### B. Origin of matched handle parity

Since \(q_*\) does not explain the index-two reduction from \(S_3\times S_3\) to the matched fiber product, identify the missing sewing datum. Candidates include seam orientation, determinant-line gluing, and equality of two local spin-lift signs.

**Stop-everything result:** one integral sewing law simultaneously forces matched local signs and the \(q_*\) theta lift.

### C. Code pullback

Construct the two-logical code sewing and compute its quadratic phase function, rather than matching group orders.

**Stop-everything result:** the code phase pulls back to \(q_*\) and its infinitesimal lift to \(\ell\).

### D. Furey cycle spin structure

Track the two completed Furey matter cycles through the genus-two sewing and determine whether their chord orientations canonically select \(m_*=(1,1,1,1)\).

**Stop-everything result:** the particle-incidence data select the same even characteristic without a basis convention.

## 10. Falsification gates

- **Coordinate gate:** under a change of symplectic marking, \(q_*\) may move within the even orbit; only its orbit and a source-selected representative are invariant.
- **Parity gate:** matched \(S_3\) sign is not the Arf invariant and must not be advertised as such.
- **Spin gate:** an even quadratic refinement is a spin-structure datum, not proof that the carrier describes physical fermions.
- **Metaplectic gate:** group-order agreement is insufficient; the multiplier or central extension must be explicitly intertwined.
- **Code gate:** the Reed–Muller refinement and \(q_*\) remain distinct until an integral sewing map relates their phase functions.

## 11. Current judgement

The exceptional two-adic branch has advanced from an unexplained index to a recognizable genus-two structure. Equal discriminant five removes precisely the first-kernel directions odd under a coadjoint functional whose full symplectic stabilizer is the even-theta stabilizer.

That is a genuine arithmetic-geometric connection. It does not yet explain the additional matched handle parity, and it does not yet connect the Standard-Model code to the carrier. Those two failures are now cleanly separated and individually testable.

## Certificate and companion documents

- [Executable theta-characteristic certificate](../../../verification/identify/identify_equal_discriminant_five_missing_mod_four_direction.mjs)
- [Exact two-adic closure indices](495_the_two_adic_closure_has_index_eighty_for_equal_discriminant_five_and_twenty_otherwise.md)
- [Integral-cubic-to-prime-shadow code comparison](496_the_standard_model_code_supplies_an_integral_cubic_to_prime_shadow_architecture_but_not_yet_the_spin23_map.md)
- [Genus-two \(A_2\) Weil carrier](478_the_genus_two_a2_weil_representation_is_exactly_the_two_qutrit_clifford_carrier_and_derives_the_cross_gate_from_a_sum_cycle_twist.md)
- [Furey-cycle genus-two sewing](479_the_two_furey_matter_cycles_canonically_sew_the_planar_yukawa_ribbon_into_the_genus_two_sp4_carrier.md)
- [Matched handle parity as the orientation line of two odd handle spin structures](498_the_binary_matched_handle_parity_is_the_orientation_line_of_two_odd_handle_spin_structures.md)
