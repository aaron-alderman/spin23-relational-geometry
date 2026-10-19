# A Minimal Four-Component Dirac Model Descends the Hamiltonian but Reverses the Chiral Grading

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact minimal Clifford representative and deck-sewing theorem; identification with the physical Furey carrier and quotient kernel remains open

## 1. Minimal Clifford requirement

The selector defect needs:

- one kinetic Clifford generator \(\alpha\);
- two mass generators \(\beta_1,\beta_2\) for a rotating complex mass;
- one chiral grading \(\Gamma\).

Require all four to be Hermitian involutions and mutually anticommute. The
complex Clifford algebra \(Cl_4(\mathbb C)\) has minimal irreducible module
dimension four. A two-component model cannot carry all four independent
generators.

No extra selector, Nambu and chiral tensor factors are required beyond this
four-component module.

## 2. Explicit representative

Take

\[
\alpha=\sigma_x\otimes I,\qquad
\beta_1=\sigma_z\otimes\sigma_x,\qquad
\beta_2=\sigma_z\otimes\sigma_z,
\]

and

\[
\Gamma=\sigma_y\otimes I.
\]

They obey

\[
\{\alpha,\beta_a\}=0,\qquad
\{\beta_1,\beta_2\}=0,\qquad
\{\Gamma,\alpha\}=\{\Gamma,\beta_a\}=0,
\]

with every square equal to \(I_4\).

## 3. Primitive half-winding mass

Define

\[
H(k,\varphi)
=k\alpha
+\cos\frac{\varphi}{2}\,\beta_1
+\sin\frac{\varphi}{2}\,\beta_2.
\]

After one physical selector circuit,

\[
H(k,\varphi+2\pi)
=k\alpha
-\cos\frac{\varphi}{2}\,\beta_1
-\sin\frac{\varphi}{2}\,\beta_2.
\]

Choose the mass-sign repair

\[
\boxed{S=\alpha.}
\]

Then

\[
S\alpha S^{-1}=\alpha,\qquad
S\beta_aS^{-1}=-\beta_a,
\]

so

\[
\boxed{
S H(k,\varphi+2\pi)S^{-1}=H(k,\varphi).}
\]

The full Hamiltonian is therefore a well-defined bundle on the primitive
quotient.

## 4. Why the integer index does not descend

The same deck operator reverses the chiral grading:

\[
\boxed{S\Gamma S^{-1}=-\Gamma.}
\]

Thus the ungraded Hamiltonian descends, but its decomposition into
\(\Gamma=\pm1\) chiral sectors does not. The deck transformation exchanges the
two chiral blocks used to define the integer index.

This gives a local model of grading loss, but it does **not** resolve the
global odd-cover obstruction:

- the full Hamiltonian may have an honest quotient sewing;
- the **graded Fredholm operator** is not an ordinary grading-preserving
  quotient;
- an integer quotient index cannot be assigned from this local family;
- only a grading-insensitive mod-two target is allowed by the local symmetry.

If (S) extends to an exact symmetry of a full Fredholm operator, its grading
reversal pairs opposite-chirality kernels and forces the ordinary cover index
to zero. Therefore this model cannot simultaneously describe the conventional
index-three vortex and its exact deck quotient.

## 5. Particle--hole reality

All \(\alpha,\beta_a\) are real in this basis. Define

\[
C=SK.
\]

Then

\[
C^2=+1
\]

and

\[
C H(k,\varphi)C^{-1}
=-H(-k,\varphi).
\]

This is the class-D particle--hole relation. Relative to the abstract
classification, the model realizes

\[
(\epsilon_S,\epsilon_\Gamma)=(+1,+1).
\]

The chiral integer refinement exists on the double-cover representative, while
the primitive quotient retains particle--hole symmetry but not a globally
defined chiral grading.

## 6. Projective companion

The product

\[
S\Gamma
\]

satisfies

\[
(S\Gamma)^2=-1.
\]

It is the projective quarter-turn identified in the abstract table. It is not
needed to sew the ungraded Hamiltonian in this representative, but records the
failure of \(S\) and \(\Gamma\) to coexist as commuting quotient structures.

## 7. Topological interpretation

The hierarchy is now:

\[
\begin{array}{c|c}
\text{local double-cover family}&\mathbb Z\text{ grading available}\\
\text{primitive quotient Hamiltonian}&\text{class D in the one-momentum model}\\
\text{allowed stable target}&\mathbb Z_2\text{ parity, value not yet computed}.
\end{array}
\]

This is structurally consistent with the earlier BDI-to-D reduction. The new
result supplies a local algebraic reason the chiral grading is lost: the
selector deck operator reverses it. It does not establish that the resulting
\(\mathbb Z_2\) value is nonzero, and a second spatial kinetic direction tests
whether the repair is internal or frame reversing.

The conventional oriented vortex with complex index three is now a separate
branch. It cannot be the same Fredholm operator if the deck is an exact
grading-reversing symmetry.

It still does not compute the physical quotient kernel. A mod-two index theorem
must connect the deck-twisted family to actual normalizable defect modes.

## 8. Relation to Furey conjugation

The model writes \(C=SK\), so extracting \(S\) from \(C\) requires a separately
chosen coefficient conjugation \(K\). Furey's construction supplies an
intrinsic CAR conjugation, but a matrix representation of its unitary and
coefficient-conjugation parts depends on the common basis.

Therefore the model demonstrates that the \((+,+)\) branch is coherent; it does
not prove that Furey data select it uniquely. A second real structure or
physical probe basis is still needed to identify \(K\) and hence \(S\).

## 9. No hidden generation doubling

The four components are Clifford/Nambu components of one minimal Dirac family.
They are not four generations or four independent sterile fields. Flavor
tensoring occurs only after the deck, CAR and grading operations have been
realized on this common module.

This respects the earlier warning against multiplying independent two-state
factors for every involution.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** the physical Furey neutral carrier realizes these
four Clifford matrices, and its primitive class-D mod-two index equals the
selector \(w_1\).

**Grading falsifier:** an integer quotient index is assigned even though
\(S\Gamma S^{-1}=-\Gamma\).

**Dimension falsifier:** a two-component complex module is claimed to realize
four mutually anticommuting involutions.

**CAR falsifier:** \(C=SK\) is identified with Furey's intrinsic conjugation
without constructing the common basis and coefficient real structure.

**Counting falsifier:** the four Clifford components are counted as additional
generations or mirror particles.

## 11. Pinned dependency and continuation

The minimal common-basis operator is now explicit. Pin physical selection at
the map from Furey's neutral block to this Clifford module.

The next mathematical step is a mod-two spectral-flow calculation for the
primitive family, independent of the unavailable integer chiral grading. The
next physical step is to derive \(S\) from Furey conjugation plus a selected
coefficient real structure.

## 12. Certificate

The [minimal four-component deck certificate](../../../verification/verify/verify_minimal_4x4_selector_dirac_deck_lift.mjs) checks the full Clifford algebra, primitive mass sewing, grading reversal, \(C^2=+1\), class-D particle--hole symmetry and the projective square of \(S\Gamma\).

## Companion documents

- [Abstract deck-lift classification](373_minimal_selector_deck_lifts_form_four_clifford_branches_not_one_furey_selected_operator.md)
- [Odd-cover obstruction](372_the_odd_double_cover_index_proves_the_primitive_selector_operator_is_twisted_not_an_ordinary_quotient.md)
- [Class-D parity reduction](355_the_selector_index_reduces_to_class_d_parity_only_with_a_reality_sewing.md)
- [Furey CAR reality](356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)
