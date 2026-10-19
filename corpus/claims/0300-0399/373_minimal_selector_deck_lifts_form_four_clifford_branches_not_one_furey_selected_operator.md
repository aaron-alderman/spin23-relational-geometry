# Minimal Selector Deck Lifts Form Four Clifford Branches, Not One Furey-Selected Operator

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact abstract Clifford-sign classification; physical mass-repair operator and its common basis with Furey conjugation remain open

## 1. Minimal generators

The primitive quotient needs three logically distinct structures:

- \(S\): a unitary repair of the selector mass sign;
- \(\Gamma\): the chiral grading of the integer-index representative;
- \(C\): the intrinsic Nambu/Furey particle--hole conjugation.

Use the abstract relations

\[
S^2=\Gamma^2=C^2=1,
\qquad
S\Gamma=-\Gamma S.
\]

The remaining information is whether \(S\) and \(\Gamma\) are real or imaginary
relative to \(C\):

\[
CS=\epsilon_S SC,
\qquad
C\Gamma=\epsilon_\Gamma\Gamma C,
\qquad
\epsilon_S,\epsilon_\Gamma\in\{\pm1\}.
\]

These two signs generate four inequivalent algebraic branches.

## 2. Candidate deck lifts

The minimal products are:

\[
\begin{array}{c|c|c}
\text{candidate}&\text{type}&\text{square}\\ \hline
S&\text{unitary}&+1\\
S\Gamma&\text{unitary}&-1\\
SC&\text{antiunitary}&\epsilon_S\\
S\Gamma C&\text{antiunitary}&-\epsilon_S\epsilon_\Gamma.
\end{array}
\]

Thus \(S\Gamma\) is automatically projective: it is a quarter-turn whose square
is the central sign. The two antiunitary candidates can square to either \(+1\)
or \(-1\), depending on the unresolved reality characters.

## 3. Complete four-branch table

\[
\begin{array}{c|c|c|c}
(\epsilon_S,\epsilon_\Gamma)&(SC)^2&(S\Gamma C)^2&
SC\text{ versus }\Gamma\\ \hline
(+,+)&+1&-1&\text{anticommutes}\\
(+,-)&+1&+1&\text{commutes}\\
(-,+)&-1&+1&\text{anticommutes}\\
(-,-)&-1&-1&\text{commutes}.
\end{array}
\]

Different rows lead to different real Clifford extensions and potentially
different \(KO/KR\) index groups. One cannot assign a symmetry class before
fixing both signs.

## 4. Operator meaning of the products

In a Dirac representative, \(S\) should commute with the kinetic Clifford
generator and reverse the mass matrices:

\[
S\alpha S^{-1}=\alpha,
\qquad
S\beta_aS^{-1}=-\beta_a.
\]

The chiral grading reverses the full chiral Hamiltonian. Consequently:

- \(S\) is suited to a deck translation that flips only the mass section;
- \(S\Gamma\) instead changes the kinetic transformation character and is
  natural only if the deck action also reverses an orientation or grading;
- multiplying by \(C\) converts either sewing into an antiunitary condition.

The base-space deck transformation must therefore be included when choosing a
row. Algebraic square alone is insufficient.

## 5. What Furey conjugation fixes

The Furey/CAR construction supplies:

\[
C^2=+1
\]

and gauge equivariance on the self-dual particle/antiparticle carrier. It does
not presently supply:

\[
S,\qquad
\epsilon_S,\qquad
\epsilon_\Gamma.
\]

The selector sign belongs to the external real-form bundle, while \(\Gamma\)
belongs to a chosen chiral Dirac representative. Until both are mapped into the
same Furey basis, the commutation signs are undefined rather than unknown
numbers waiting to be guessed.

Therefore Furey conjugation does not yet choose one of the four branches.

## 6. Relation to the odd-cover obstruction

The pure \(S\) lift has square \(+1\), but an ordinary free quotient with this
lift cannot account for the odd cover index without changing another
assumption. The automatically projective \(S\Gamma\) lift has square \(-1\) and
is a natural candidate for the required twist, but it changes the grading
behavior and must be checked against the physical deck geometry.

The odd-cover theorem therefore narrows the candidates but does not by itself
select one:

- ordinary commuting \(S\) is insufficient for naive descent;
- \(S\Gamma\), \(SC\), and \(S\Gamma C\) provide possible twisted structures;
- their physical validity depends on kinetic, mass, CAR and boundary sewing.

## 7. Avoiding an eightfold overcount

The selector, Nambu and chiral labels are not automatically independent tensor
factors. Treating each binary structure as a separate doubling would create an
eightfold carrier before flavor and generation.

The products above must act on one minimal Clifford/Nambu module. A valid model
should realize \(S,\Gamma,C\) as operations on already-existing degrees of
freedom, not add a fresh two-state factor for each symbol.

## 8. Required next calculation

Choose an explicit minimal Dirac/BdG operator

\[
\mathcal D
=-i\alpha^j\partial_j
+m_a(x)\beta_a
\]

on the selector double cover. For each candidate lift, verify:

\[
\widehat g\,\mathcal D(x+{\rm deck})\,\widehat g^{-1}
=\mathcal D(x),
\]

then compute

\[
\widehat g^2,\qquad
\widehat g C\widehat g^{-1},\qquad
\widehat g\Gamma\widehat g^{-1}.
\]

This will select the applicable real equivariant index group and make the
quotient kernel question well posed.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the physical Furey/selector intertwiner fixes
\((\epsilon_S,\epsilon_\Gamma)\), selects one deck lift and yields a nontrivial
real mod-two index equal to \(w_1\).

**Uniqueness falsifier:** \(C^2=1\) alone is claimed to determine the deck lift.

**Tensoring falsifier:** selector, chiral and Nambu binary labels are introduced
as three independent physical doublings.

**Square falsifier:** \(S\Gamma\) is treated as an ordinary involution despite
\((S\Gamma)^2=-1\).

**Basis falsifier:** \(\epsilon_S\) or \(\epsilon_\Gamma\) is quoted before
\(S,\Gamma,C\) are represented on one common module.

## 10. Pinned dependency and continuation

The abstract lift space is now finite and closed. Pin branch selection at one
explicit common-basis Dirac operator.

The next step is to construct the smallest Clifford representation supporting
kinetic, two mass directions, chiral grading and \(C^2=+1\), then test every
row without adding independent selector or Nambu copies.

## 11. Certificate

The [minimal deck-lift classification certificate](../../../verification/verify/verify_minimal_selector_deck_lift_clifford_classification.mjs) enumerates all four reality-sign branches, verifies every lift square and grading character, and records exactly which data Furey conjugation establishes and leaves open.

## Companion documents

- [Odd-cover quotient obstruction](372_the_odd_double_cover_index_proves_the_primitive_selector_operator_is_twisted_not_an_ordinary_quotient.md)
- [Furey CAR reality](356_furey_conjugation_supplies_car_particle_hole_reality_not_an_exact_flavor_cp.md)
- [Two real structures](308_two_real_structures_generate_either_a_grading_or_a_complex_structure.md)
- [Selector versus CAR adjoint](307_the_response_selector_and_the_car_adjoint_are_two_distinct_antiunitaries.md)
