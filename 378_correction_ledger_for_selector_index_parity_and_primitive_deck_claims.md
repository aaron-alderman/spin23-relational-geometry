# Correction Ledger for Selector Index, Parity and Primitive Deck Claims

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** corpus-level reconciliation after the grading-reversing deck no-go

## 1. Purpose

The selector programme accumulated several individually correct mathematical
constructions and then joined them too quickly. The no-go theorem in Document
377 requires a precise ledger of what survives, what becomes conditional and
what is withdrawn.

The central rule is now:

> An invariant may move between two constructions only after the operators,
> domains, symmetry actions and global base spaces have been identified—not
> merely because both invariants take values in (mathbb Z_2).

## 2. Claims that remain exact

### 2.1 Sign local-system calculation

For an abstract integer local system on (S^1) with monodromy (-1),

\[
H_0(S^1;\mathbb Z_-)=\mathbb Z_2,
\qquad H_1(S^1;\mathbb Z_-)=0.
\]

This is correct. What is not automatic is that a conventional vortex index is
a section of this local system for an exact physical deck symmetry.

### 2.2 Real Pfaffian wall theorem

For a real antisymmetric family with invertible endpoints,

\[
\mathcal Q=\operatorname{sgn}
[\operatorname{Pf}A_-\operatorname{Pf}A_+]
\]

is a stable mod-two crossing invariant. For (N) independent mass sign
reversals, (mathcal Q=(-1)^N). This remains exact for the stated wall model.

### 2.3 One-dimensional BDI-to-D reduction

For the periodic symbol (q_m(k)=e^{imk}) with the stated BDI reality, forgetting
the extra reality while retaining particle--hole symmetry gives

\[
\nu_D=(-1)^m.
\]

This remains exact for that one-dimensional Bloch/BdG model.

### 2.4 Conventional complex vortex theorem

For a full oriented complex vortex

\[
M(r,\varphi)=f(r)e^{i\varphi}M_0,
\]

the complex chiral index equals (w[\det M]=3) for a nonsingular
three-flavor (M_0). This remains exact for the conventional vortex.

### 2.5 Local Clifford sewing

The one-momentum (4\times4) matrices exactly realize mass-sign repair and
grading reversal. They remain a valid local Clifford representation.

## 3. Claims that are now conditional

### 3.1 “Selector parity” as a physical fermion parity

The sign local system may describe selector geometry, but identifying its
nonzero class with a real kernel parity requires a globally defined real
Fredholm operator. The explicit local family instead has an orientable
rank-two occupied bundle and unchanged endpoint Pfaffian.

### 3.2 Three odd BDI channels as the Standard-Model selector

Three copies of the canonical BDI chain are class-D nontrivial. Calling those
copies the physical selector flavors remains conditional on deriving the
selector-to-momentum/domain map and the Furey carrier embedding.

### 3.3 Pfaffian mass wall as the primitive defect

The (N=3) Pfaffian wall is nontrivial, but it has not been derived as the Pin
primitive selector domain. Matching the two requires explicit boundary data
and may fail.

## 4. Claims withdrawn

The following joined claims must no longer be used:

1. the conventional oriented index-three vortex is the double cover of the
   same exact grading-reversing primitive quotient;
2. the primitive quotient parity is automatically (3\bmod2);
3. selector-line (w_1=1) automatically equals occupied-bundle (w_1) or
   Majorana kernel parity;
4. the local one-momentum deck algebra computes a global vortex index;
5. a Pin quotient inherits complex index three from its oriented double.

The first is impossible: exact grading reversal forces complex cover index
zero. The remaining statements lack the required operator-level bridge.

## 5. Corrected branch matrix

| Branch | Base/domain | Exact deck action | Ordinary complex index | Independent invariant |
|---|---|---|---:|---|
| conventional vortex | oriented plane | no grading-reversing quotient asserted | (3) | complex chiral index |
| oriented internal quotient | oriented double cover | grading preserving | even if ordinary pullback | integer quotient index |
| Pin primitive | reflected/nonorientable domain | grading/frame reversing | (0) on symmetric oriented double | possible real mod-two index |
| BDI chain | periodic 1D momentum | reflection reality | (m) in BDI parent | class-D parity ((-1)^m) |
| Pfaffian wall | real endpoint interpolation | particle--hole reality | not the vortex index | endpoint Pfaffian sign |
| local Clifford family | parameter cylinder | local matrix sewing | not defined | algebra/holonomy data |

Equal target groups in the final column do not identify the branches.

## 6. Documents affected

- Document 346: local-system homology retained; insertion of the physical
  three-flavor vortex index is conditional, not derived.
- Document 347: Pfaffian wall theorem retained; identification with the
  primitive selector is conditional.
- Document 355: BDI-to-D theorem retained; “selector” language denotes an
  auxiliary symbol until a physical coordinate/domain map is derived.
- Documents 358 and 372: conventional index three and ordinary-descent
  obstruction retained; any suggestion that a grading-reversing twist carries
  that same nonzero complex cover index is superseded.
- Document 374: local Clifford algebra retained; global index-three quotient
  interpretation withdrawn.
- Documents 375--377: current controlling audit.

Historical cycle logs remain chronological records. Their earlier positive
statements must be read through this correction ledger and the later cycle-293
no-go result.

## 7. New evidence discipline

Every future parity claim must state five fields:

1. **operator:** the explicit differential, lattice or Toeplitz operator;
2. **base/domain:** momentum circle, oriented plane, Pin quotient, wall or
   boundary extension;
3. **symmetry:** the exact linear/antiunitary action and its square;
4. **invariant:** complex index, local-system class, Pfaffian sign or real
   mod-two index;
5. **bridge theorem:** the named calculation transporting an invariant from
   another description.

If the fifth field is absent, matching values are evidence of compatibility,
not identity.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** one explicit Furey-compatible Pin operator passes
the five-field test and has an odd kernel, or a theorem proves no such operator
can exist.

**Group-label falsifier:** two (mathbb Z_2) quantities are equated solely
because their target groups are isomorphic.

**Domain falsifier:** a Bloch, wall or vortex invariant is moved to another
base without an operator/domain map.

**Historical falsifier:** an earlier cycle summary is cited while ignoring a
later explicit correction.

## 9. Next calculations

1. Build and diagonalize a finite Pin/Möbius lattice operator with exact deck
   covariance and explicit boundary domain.
2. Determine its real kernel parity without importing flavor number.
3. Audit the Furey neutral block against the five-field template.
4. Maintain the conventional vortex and BDI-chain branches as independent
   comparison models.

## 10. Certificate

The [selector parity claim-ledger certificate](scripts/verify_selector_parity_claim_ledger.mjs)
encodes the allowed and forbidden invariant transports and rejects the old
merged branch.

## Companion documents

- [Grading-reversing deck index no-go](377_a_grading_reversing_deck_symmetry_forces_zero_cover_index_so_the_index_three_parent_cannot_be_the_same_operator.md)
- [Second kinetic direction audit](376_a_second_kinetic_direction_forces_a_choice_between_chiral_descent_and_orientation_reversal.md)
- [Finite-family parity audit](375_the_minimal_deck_model_loses_the_integer_grading_but_does_not_yet_prove_odd_fermion_parity.md)
- [BDI-to-D theorem](355_the_selector_index_reduces_to_class_d_parity_only_with_a_reality_sewing.md)
- [Pfaffian wall theorem](347_particle_hole_symmetry_upgrades_selector_parity_to_a_pfaffian_zero_mode_invariant.md)
