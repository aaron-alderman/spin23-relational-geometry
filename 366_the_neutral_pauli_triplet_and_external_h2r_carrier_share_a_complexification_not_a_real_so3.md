# The Neutral Pauli Triplet and External \(H_2(\mathbb R)\) Carrier Share a Complexification, Not a Real \(SO(3)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact compact/split real-form and fixed-point theorem; physical selection among three inequivalent \(M_2(\mathbb C)\) origins remains open

## 1. Qualified answer to the common-carrier question

One \(H_2(\mathbb C)\) contains both the Pauli selector space and an
\(H_2(\mathbb R)\) fixed slice. However, the Pauli triplet and the full real
carrier are not the same real representation. Their spin-one and spin-two
patterns agree only after complexification or a change of real form.

## 2. What one \(H_2(\mathbb C)\) contains

Write

\[
X=tI+x\sigma_1+y\sigma_2+z\sigma_3.
\]

The traceless Hermitian part is a compact Pauli triplet. Conjugation by
\(SU(2)\) acts through \(SO(3)\) and preserves \(x^2+y^2+z^2\).

Entrywise conjugation acts as

\[
\kappa:(t,x,y,z)\mapsto(t,x,-y,z).
\]

Its fixed algebra is

\[
\boxed{H_2(\mathbb R)=\mathbb RI\oplus
\operatorname{span}_{\mathbb R}\{\sigma_1,\sigma_3\}.}
\]

The real carrier is therefore scalar plus a selected two-plane inside the Pauli
triplet. It is not a second copy of that triplet. The removed Pauli direction is
the selector normal.

## 3. Compact and split three-vectors differ over the reals

The determinant descends from

\[
t^2-x^2-y^2-z^2
\]

to

\[
t^2-x^2-z^2.
\]

The external carrier is consequently the vector representation of
\(SO_0(1,2)\), not the compact \(SO(3)\) acting on Pauli coordinates. The
compact generator trace form is definite; the split trace form has two boost
and one rotation directions. Sylvester inertia forbids a real metric isometry:

\[
\boxed{
\mathbf3_{SO(3)}\not\cong
\mathbf3_{SO_0(1,2)}
\text{ as real metric representations}.}
\]

## 4. Why both still give \(1+5\)

Both Lie algebras complexify to

\[
\mathfrak{so}(3,\mathbb C)\cong\mathfrak{sl}(2,\mathbb C).
\]

Their three-dimensional modules become the same complex spin-one module, so

\[
\operatorname{Sym}^2(\mathbf3_{\mathbb C})
=\mathbf1\oplus\mathbf5.
\]

The compact Pauli quadrupole and split relationship fiveplet are two real forms
of one complex representation pattern. This explains the repeated (1+5)
without identifying their real groups. A map between them requires the
real-form selector or an analytic continuation.

## 5. Correction to the three-\(SO(3)\) model

The preceding diagonal-locking theorem is valid as a compact-form model. The
literal external response instead carries a split fiveplet. Its identification
with the compact Pauli fiveplet requires the same involution selecting
\(H_2(\mathbb R)\) inside \(H_2(\mathbb C)\).

If both genuinely descend from one complex carrier, this is not an independent
spontaneous lock. It is a real-form selection. That reduces the number of
independent sectors, but only after a physical complex carrier and involution
have been selected.

## 6. Three inequivalent \(M_2(\mathbb C)\) origins

The corpus contains at least three physically different occurrences:

1. the weak centralizer block in Furey's 2026 endomorphic construction;
2. the neutral block
   \(\operatorname{End}(O_1\oplus R)\cong M_2(\mathbb C)\);
3. the charged \(C\leftrightarrow E\) linking factor in the fifteen-state TRO.

They are abstractly isomorphic but have different gauge actions and physical
roles.

- The weak block has the clearest electroweak interpretation.
- The neutral block avoids hypercharge but lacks derived statistics and source
  selection.
- The linking block is algebraically selected, but its relation is charged and
  its unique \(M_2\) status disappears after the neutrino completion.

Abstract matrix-algebra isomorphism does not canonically identify these blocks.

## 7. Exact conditional functor

For one selected physical block, the compatible maps are

\[
H_2(\mathbb C)
\xrightarrow{\text{traceless part}}
\mathbf3_{\rm Pauli}
\xrightarrow{\text{choose }n}
n^\perp
\]

and

\[
H_2(\mathbb C)
\xrightarrow{\kappa_n\text{ fixed points}}
\mathbb RI\oplus n^\perp
\cong H_2(\mathbb R).
\]

The selector and external carrier then share one origin, eliminating a separate
lock between them. The remaining problem is why that block and antiunitary are
physical while charge, chirality and flavor CP remain correct.

## 8. Revised locking problem

If the common-origin route succeeds, the earlier three-sector problem reduces
to

\[
\text{one complex two-face carrier}
\quad\text{versus}\quad
\text{sterile flavor }O(3).
\]

Only the sterile fiveplet requires an additional physical intertwiner. In a
compact comparison, locking two \(SO(3)\) factors would break three generators,
not six. The actual compact/split mechanism may instead be an explicit
real-form selection, so its spectrum must be computed in the chosen field
model.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** one gauge-compatible physical \(M_2(\mathbb C)\)
block supplies both the selector antiunitary and positive external response,
with no arbitrary block isomorphism.

**Real-form falsifier:** compact \(SO(3)\) and split \(SO_0(1,2)\) triplets are
identified over the reals despite different invariant signatures.

**Block falsifier:** weak, neutral and charged-linking blocks are conflated
solely because all are \(M_2(\mathbb C)\).

**Fiveplet falsifier:** the common complex (1+5) decomposition is called a
real field identity without specifying its reality condition.

**Functoriality falsifier:** an arbitrary matrix-block isomorphism is called a
canonical common origin.

## 10. Pinned dependency and continuation

Pin the common-origin route at selection among the three blocks. Score each
candidate against gauge neutrality, survival of the neutrino completion, CAR
and flavor-CP compatibility, and existence of a positive causal source map.

## 11. Certificate

The [compact/split real-form certificate](scripts/verify_compact_pauli_vs_split_h2r_real_form_gate.mjs) verifies the fixed slice and determinant descent, computes the definite versus indefinite generator forms, confirms the common complex \(1+5\) pattern, and records the three inequivalent \(M_2(\mathbb C)\) origins.

## Companion documents

- [Neutral Pauli relationship square](363_the_neutral_m2_triplet_generates_the_selector_fiveplet_only_as_an_external_relationship_square.md)
- [Conditional compact diagonal-locking theorem](364_a_common_so3_uniquely_aligns_the_three_fiveplets_but_spontaneous_diagonal_locking_costs_six_modes.md)
- [Unique charged linking factor](116_unique_m2_linking_factor_to_h2r_spin23.md)
- [Furey weak Jordan ladder](69_furey_weak_jordan_ladder_spin23.md)
- [Jordan real-form descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
