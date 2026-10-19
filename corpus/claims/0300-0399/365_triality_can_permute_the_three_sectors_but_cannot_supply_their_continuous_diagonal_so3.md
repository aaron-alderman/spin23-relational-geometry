# Triality Can Permute the Three Sectors but Cannot Supply Their Continuous Diagonal \(SO(3)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B10, B11 and B13  
**Claim status:** exact finite-group representation and Lie-component obstruction; a larger exceptional dynamical locking field remains possible but underived

## 1. The proposed rescue

The three-fiveplet branch needs a common rotation group relating:

\[
SO(3)_F,
\qquad SO(3)_\nu,
\qquad SO(3)_R.
\]

Exceptional triality also contains a distinguished threefold structure. It is
therefore natural to ask whether triality supplies the missing diagonal group.

The answer is negative at the level currently derived: triality can permute
three sectors, but a finite permutation does not identify their continuous
rotation indices.

## 2. The sheet representation is (1+2), not a rotation triplet

On three sheets, triality acts through the permutation representation

\[
\mathbb R^3_{\rm sheet}=\mathbf1\oplus\mathbf2.
\]

Odd permutations have determinant \(-1\). Hence the ordinary sheet action lies
in \(O(3)\), not wholly in \(SO(3)\).

One can multiply every odd permutation matrix by \(-1\). The sign-twisted
representation then lies in \(SO(3)\), but its decomposition becomes

\[
\mathbf1_{\rm sign}\oplus\mathbf2,
\]

not the original trivial-singlet-plus-doublet carrier. In particular, the
vector \((1,1,1)\) changes sign under odd permutations.

Thus an \(SO(3)\) embedding exists only after changing the character of the
distinguished sheet singlet. It does not canonically extend the existing flavor
carrier.

## 3. The identity component is decisive

Triality is discrete:

\[
\dim S_3^0=0.
\]

Adjoining it to three continuous rotation factors gives the semidirect product

\[
SO(3)^3\rtimes S_3.
\]

Its Lie algebra remains

\[
\mathfrak{so}(3)\oplus\mathfrak{so}(3)\oplus\mathfrak{so}(3),
\]

of dimension nine. The diagonal algebra has dimension three. Therefore

\[
\boxed{
S_3\text{ permutation symmetry does not imply }
SO(3)^3\to SO(3)_{\rm diag}.}
\]

No tangent generator connects the three factors.

## 4. What permutation symmetry can do

If the three sectors were genuinely exchangeable, \(S_3\) could require equal
self-couplings:

\[
V_1(Q_F)+V_1(Q_\nu)+V_1(Q_R).
\]

It could also permute already-defined bifundamental locking fields and enforce
equal coefficients among their potentials.

It cannot by itself define a contraction

\[
Q_F:Q_\nu
\]

because the two index spaces still rotate independently. An explicit
Lie-algebra calculation again gives zero fixed cross-intertwiner. Permuting
three zero intertwiner spaces does not make one nonzero.

## 5. Exceptional triality acts on different objects

Classical \(Spin(8)\) triality exchanges its vector and two chiral spinor
representations. The three objects in the present locking problem are instead:

- an endomorphism Pauli triplet;
- a sterile-family symmetric tensor;
- an external response relationship tensor.

No existing construction identifies these with the three \(Spin(8)\) triality
representations. Even a formal threefold count is therefore insufficient.

A successful exceptional route must provide explicit maps from each physical
sector into one common triality module and show that its invariant form reduces
to the desired fiveplet contractions.

## 6. Relation to the generation branch

The triality-orbit generation carrier

\[
V_{16}\otimes\mathbb C[S_3/S_2]
\]

uses the discrete \(1+2\) sheet module. That construction can label three
families and select a singlet-doublet grading, but it supplies no continuous
family \(SO(3)\). Promoting its real vector space to an arbitrary \(SO(3)\)
would erase the distinguished singlet-doublet structure and impose more
symmetry than triality derives.

The discrete flavor and continuous locking branches must therefore remain
separate unless an additional exceptional tangent or connection joins them.

## 7. What could still work

Triality could participate indirectly if a larger exceptional field has a
vacuum whose stabilizer is the desired diagonal \(SO(3)\). The required proof
would need:

1. a named exceptional representation containing the relevant bifundamentals;
2. an invariant potential and a specified vacuum;
3. a stabilizer calculation yielding exactly the diagonal group;
4. the six broken-generator modes, or a gauge mechanism that eats them;
5. explicit projections to all three physical fiveplets.

No such field has yet been identified in the corpus.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** an exceptional representation and vacuum have
stabilizer \(SO(3)_{\rm diag}\), project canonically to the three physical
sectors and account for every broken-generator mode.

**Discrete-to-continuous falsifier:** finite triality is called a continuous
diagonal rotation group without additional generators.

**Representation falsifier:** the ordinary \(1+2\) permutation carrier is
called the vector representation of \(SO(3)\) while retaining odd permutation
matrices of determinant \(-1\).

**Twist falsifier:** the sign-twisted \(SO(3)\) embedding is used while the
sheet singlet is still claimed to be trivial under odd permutations.

**Contraction falsifier:** permutation equality of coefficients is confused
with an invariant contraction of independently rotating indices.

## 9. Pinned dependency and continuation

Pin triality as a discrete organizer, not the missing continuous lock. Continue
the common-group search through the response construction itself: test whether
the neutral Pauli triplet and external relationship triplet are two functorial
images of one two-face carrier, which would make their rotation group
kinematically identical rather than spontaneously locked.

The sterile flavor factor would then be the only remaining nontrivial locking
problem.

## 10. Certificate

The [triality/diagonal-group certificate](../../../verification/verify/verify_triality_does_not_generate_continuous_diagonal_so3.mjs) verifies the determinants and character change of the two sheet representations, computes the unchanged nine-dimensional Lie algebra of the semidirect product, and confirms that independent rotations still forbid a fixed cross-index contraction.

## Companion documents

- [Three-fiveplet diagonal-locking gate](364_a_common_so3_uniquely_aligns_the_three_fiveplets_but_spontaneous_diagonal_locking_costs_six_modes.md)
- [Triality orbit and flavor sheets](323_quantizing_the_triality_orbit_gives_three_flavor_sheets_but_exact_s3_or_s2_forbids_observed_mixing.md)
- [Triality singlet-doublet grading](338_triality_selects_a_unique_singlet_doublet_reality_grading_up_to_sign.md)
- [Triality generation overlap obstruction](322_triality_gives_three_overlapping_generation_choices_not_three_independent_generations.md)
- [Neutral relationship fiveplet](363_the_neutral_m2_triplet_generates_the_selector_fiveplet_only_as_an_external_relationship_square.md)
