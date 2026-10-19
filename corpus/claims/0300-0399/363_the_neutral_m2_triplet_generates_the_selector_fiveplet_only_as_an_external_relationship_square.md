# The Neutral \(M_2\) Triplet Generates the Selector Fiveplet Only as an External Relationship Square

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B11 and B13  
**Claim status:** exact compact-form representation, matrix-product and equivariance theorem; the external \(H_2(\mathbb R)\) fiveplet is a split real form, and physical triplet field, generation action and dynamics remain open

## 1. Reopening the pinned mediator branch

The corrected neutral endomorphism algebra is

\[
\mathcal A_0=M_2(\mathbb C)\oplus\mathbb C^3.
\]

Its Hermitian \(M_2\) factor decomposes as

\[
\operatorname{Herm}_2(\mathbb C)=\mathbb RI\oplus
\operatorname{span}_{\mathbb R}\{\sigma_1,\sigma_2,\sigma_3\}.
\]

The traceless part is a canonical rotation triplet. This does not provide a
linear fiveplet, but its symmetric square obeys

\[
\operatorname{Sym}^2(\mathbf3)=\mathbf1\oplus\mathbf5.
\]

That is exactly the trace-plus-fiveplet pattern sought in the sterile and
external relationship branches. The crucial question is which multiplication
retains it.

## 2. Internal Jordan multiplication kills the fiveplet

For the Pauli basis,

\[
\sigma_i\circ\sigma_j
=\frac12(\sigma_i\sigma_j+\sigma_j\sigma_i)
=\delta_{ij}I.
\]

Therefore the internal Jordan multiplication map

\[
\mu_J:\operatorname{Sym}^2(\mathbf3)
\longrightarrow\operatorname{Herm}_2(\mathbb C)
\]

projects onto the scalar trace and annihilates the traceless symmetric
fiveplet:

\[
\boxed{\ker\mu_J\supset\mathbf5.}
\]

The commutator retains the antisymmetric triplet instead. Neither ordinary nor
Jordan multiplication inside \(M_2\) produces a spin-two element.

This explains why searching the endomorphism algebra itself for a native
fiveplet failed.

## 3. The external relationship square retains it

Let

\[
X=x_i\sigma_i
\]

be a traceless Hermitian direction. Do not multiply away the two relationship
indices. Instead form

\[
\boxed{
Q_{ij}(x)=x_ix_j-\frac{|x|^2}{3}\delta_{ij}.}
\]

Then \(Q\) is real, symmetric and traceless, so it lies in the five-dimensional
spin-two representation. For every \(R\in SO(3)\),

\[
Q(Rx)=RQ(x)R^T.
\]

Thus the fiveplet survives in the coefficient or relationship tensor even
though the internal matrix product collapses it.

This is a precise instance of the programme's relational-carrier principle:
the missing information lives between algebra elements, not in their product.

## 4. The selector orbit appears automatically

The map is antipodally even:

\[
Q(-x)=Q(x).
\]

At fixed nonzero \(|x|\), its orbit is therefore

\[
S^2/(x\sim-x)=\mathbb{RP}^2.
\]

The eigenvalues are

\[
\frac{2|x|^2}{3},
\qquad-\frac{|x|^2}{3},
\qquad-\frac{|x|^2}{3},
\]

so this is the uniaxial subvariety of the full five-dimensional traceless
symmetric space. Its invariants obey

\[
\operatorname{tr}Q^2=\frac23|x|^4,
\qquad
\operatorname{tr}Q^3=\frac29|x|^6.
\]

The previously introduced \(\mathbb{RP}^2\) real-form selector is therefore the
Veronese relationship square of the canonical neutral \(M_2\) triplet—at the
level of representation geometry.

## 5. One vector does not span a generic fiveplet point

For a fixed \(x\), \(Q(x)\) is uniaxial and has only an amplitude plus two
orientation parameters. The linear span of all such quadrupoles is the full
five-dimensional space, but an individual quadrupole does not realize a generic
biaxial tensor.

Accordingly:

- one triplet field naturally produces the \(\mathbb{RP}^2\) selector;
- multiple independent triplet sources or fluctuations can span the full
  fiveplet;
- identifying the uniaxial selector with every external spin-two relationship
  mode would overclaim.

## 6. Connection to the sterile composite

After an isotropic sterile condensate selects \(O(3)\), its perturbations split
as

\[
\operatorname{Sym}^2(\mathbf3)=\mathbf1\oplus\mathbf5.
\]

The neutral \(M_2\) triplet now supplies a representation-theoretically natural
source for another \(\mathbf5\) through \(Q_{ij}\). A candidate locking term is

\[
\lambda\,Q_{ij}(x),Sigma^{ij}_0,
\]

where \(\Sigma_0\) is the sterile traceless symmetric tensor.

This contraction is canonical only after the two rotation groups have been
identified. The current algebra does not yet derive that diagonal locking, nor
does it show that \(x_i\) is a propagating bosonic field. The result supplies
the missing form of the intertwiner, not its physical source.

## 7. Relation to \(Spin_0(2,3)\)

The external Jordan carrier has a scalar determinant direction and a
five-dimensional complement in the relevant relationship-square branch. The
present theorem gives a concrete descent:

\[
\text{neutral }M_2\text{ triplet}
\xrightarrow{\text{external symmetric square}}
\mathbf1\oplus\mathbf5
\xrightarrow{\text{uniaxial slice}}
\mathbb{RP}^2.
\]

The same triplet cannot produce this structure through its internal Jordan
product. Hence the distinction between carrier and relationship tensor is not
philosophical decoration; it is algebraically necessary to preserve the
spin-two information that multiplication discards.

This makes the neutral \(M_2\) factor a credible interface candidate, but it
still does not prove that the physical conformal group of the response is
\(Sp(4,\mathbb R)\cong Spin_0(2,3)\). That requires the existing positivity,
triple-recursion and causal-sewing gates.

There is also a real-form distinction: the Pauli triplet carries compact
\(SO(3)\), while the full \(H_2(\mathbb R)\) carrier is a split
\(SO_0(1,2)\) three-vector. Their \(1+5\) symmetric-square patterns agree after
complexification, not as an automatic real-group identity. The dedicated
[compact/split audit](366_the_neutral_pauli_triplet_and_external_h2r_carrier_share_a_complexification_not_a_real_so3.md) makes this gate explicit.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the Furey grading makes the neutral Pauli triplet a
positive bosonic response field, while a source-derived diagonal \(SO(3)\)
locking couples its relationship square simultaneously to the sterile fiveplet
and external Jordan fiveplet.

**Multiplication falsifier:** the Pauli Jordan product is claimed to contain the
fiveplet; it retains only \(\delta_{ij}I\).

**Dimension falsifier:** one uniaxial \(Q(x)\) is treated as a generic point of
the full five-dimensional space.

**Group falsifier:** internal Pauli rotations, sterile flavor \(O(3)\), and the
external relationship \(SO(3)\) are silently identified without a diagonal
locking term.

**Dynamics falsifier:** an endomorphism coordinate is called a propagating
order parameter without statistics, kinetic term, or spectral residue.

## 9. Pinned dependency and continuation

The representation map and selector topology are closed positively. Pin the
physical bridge at the diagonal-group identification and the nature of the
triplet coordinate.

Continue by classifying all lowest-degree invariants among the three triplets:

\[
x_i,
\qquad \Sigma_{0,ij},
\qquad R_{0,ij}^{\rm external},
\]

and determine whether one coupling can align both fiveplets without producing
unwanted Goldstones or a discretionary portal coefficient.

## 10. Certificate

The [neutral \(M_2\) relationship-fiveplet certificate](../../../verification/verify/verify_neutral_m2_triplet_relationship_fiveplet.mjs) proves the Pauli Jordan-product collapse, constructs the external traceless symmetric tensor, verifies exact \(SO(3)\) equivariance and antipodal descent, and checks the uniaxial quadratic and cubic invariants.

## Companion documents

- [Corrected neutral endomorphism mediator gate](362_the_furey_neutral_endomorphism_sector_has_seven_not_eleven_copies_and_no_canonical_pairing_mediator.md)
- [Dynamical real-form selector](../0200-0299/297_a_dynamical_real_form_selector_has_rp2_order_parameter_and_two_orientation_modes.md)
- [Relationship square decomposition](../0200-0299/277_the_relationship_square_splits_into_jordan_determinant_and_spin_two_fiveplet.md)
- [Sterile composite topology](360_no_existing_elementary_bminusl_two_singlet_but_the_sterile_symmetric_composite_has_u3_over_o3_topology.md)
- [Veronese embedding](../0200-0299/276_symmetric_square_veronese_embedding_preserves_rotations_and_relationship_doubling.md)
