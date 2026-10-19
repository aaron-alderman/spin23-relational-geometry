# A Finite Majorana Lattice Has Even Total Nullity, So Pin Defect Parity Must Be Relative or Local

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact finite-dimensional no-go and corrected numerical protocol; an infinite-volume or relative Pin invariant remains to be implemented

## 1. A second numerical no-go

The corrected programme asks for a finite Pin/Möbius lattice and its mod-two
kernel. Taken literally, that request contains a trap.

Any finite class-D BdG Hamiltonian can be written in a Majorana basis as

\[
H=iA,
\qquad A^T=-A,
\qquad A\in M_{2N}(\mathbb R).
\]

The rank of a real antisymmetric matrix is even. Since the total dimension
(2N) is even,

\[
\dim\ker A=2N-\operatorname{rank}A
\]

is also even. Therefore

\[
\boxed{\dim\ker H=0\pmod2}
\]

for every finite closed Majorana matrix.

A finite exact diagonalization cannot return a single unpaired Majorana zero
in the full spectrum.

## 2. Where the partner lives

A defect described as carrying one Majorana mode always has a second member of
the finite-system accounting somewhere else:

- at another vortex;
- at a physical boundary;
- at the far end of a wire;
- in the regulator sector;
- or at infinity in the Fredholm/infinite-volume limit.

In a large finite sample the pair may have exponentially small splitting, but
the exact total nullity is still generically zero; at an exactly tuned point it
jumps by an even number.

Thus “odd defect parity” means a **local or relative** parity, not odd total
matrix nullity.

## 3. Consequence for the Möbius/Pin experiment

Consider the oriented double lattice with glide reflection

\[
g:(x,y)\mapsto(x+L,-y)
\]

and spin lift (S=\alpha_x). A mass texture satisfying

\[
m_a(gp)=-m_a(p)
\]

can place a deck-related vortex--antivortex pair on the double. The quotient
may appear to contain one primitive defect, but a finite strip has a boundary
or regulator sector that supplies the global partner.

Projecting to one deck sector does not evade the theorem. If exact class-D
particle--hole symmetry remains, the quotient Majorana matrix is still an
even-dimensional real antisymmetric matrix and has even total nullity.

## 4. Correct computable invariants

At least four finite-size diagnostics are legitimate.

### 4.1 Relative Pfaffian parity

Compare two gapped Hamiltonians with identical boundary regulator but different
defect or flux sectors:

\[
\mathcal Q_{\rm rel}
=\operatorname{sgn}
\left[
\frac{\operatorname{Pf}A_{\rm defect}}
     {\operatorname{Pf}A_{\rm reference}}
\right].
\]

This is meaningful only after fixing a common Majorana orientation. It detects
a parity switch between sectors, not an odd total kernel at one endpoint.

### 4.2 Mod-two spectral flow

Interpolate (A(t)) between reference and defect sectors and count zero
crossings modulo two. A closed finite path has even total crossing constraints;
an open relative path can record a parity switch through its endpoint
Pfaffians.

### 4.3 Localized near-zero pair

For increasing system size, identify the two lowest states and measure their
spatial weights. Evidence for a defect mode consists of one member localizing
at the defect, the partner localizing at the boundary or distant defect, and
their splitting decaying exponentially. This is strong numerical evidence but
not by itself an exact index theorem.

### 4.4 Infinite-volume real Fredholm index

On a noncompact domain, define the real skew-adjoint Fredholm operator and its
mod-two index directly. The missing partner is then carried by infinity rather
than the finite kernel count. This is the clean analytic target.

## 5. Revised lattice protocol

The first Pin lattice should report:

1. exact Hermiticity;
2. exact glide/deck covariance;
3. the deck-lift square and Pin sign;
4. exact particle--hole symmetry;
5. the reference and defect Pfaffians in one oriented Majorana basis;
6. mod-two spectral flow between them;
7. localization and finite-size scaling of the lowest pair;
8. boundary-condition dependence.

It should **not** use odd total nullity as its success criterion.

## 6. Relation to the index-three correction

This finite-size theorem is independent of the earlier complex-index no-go:

- Document 377 says an exact grading-reversing deck symmetry forces the
  ordinary complex chiral index of the cover to zero.
- The present document says a finite class-D matrix has even total Majorana
  nullity.

Together they force the primitive claim into a genuinely relative or
infinite-volume real index problem. Neither conventional complex index three
nor a finite odd kernel can be used as a shortcut.

## 7. Furey implications

The Furey neutral carrier is finite-dimensional at each point. Its CAR
conjugation can supply the real fiber, but it cannot by itself create an odd
total finite Majorana kernel. Spatial/domain structure is indispensable.

Therefore the five-field Furey audit must distinguish:

- finite internal carrier dimension;
- spatial operator and boundary domain;
- local defect sector;
- regulator/boundary partner;
- relative or Fredholm invariant.

This is another reason that representation matching alone is not dynamics.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** a glide-covariant lattice shows a regulator-stable
relative Pfaffian switch and exponentially separated defect/boundary partners,
and an infinite-volume theorem identifies the limiting real index.

**Nullity falsifier:** odd total nullity is reported for an even-dimensional
finite real antisymmetric Majorana matrix.

**Localization falsifier:** a near-zero pair is called one defect mode without
showing where both states localize.

**Pfaffian falsifier:** endpoint Pfaffians are compared in independently
oriented Majorana bases.

**Boundary falsifier:** a purported local invariant changes arbitrarily under
distant boundary modifications without a gap closing near the defect.

## 9. Pinned dependency and next calculation

Replace “compute odd finite kernel” with “compute a relative Pfaffian switch,
mod-two spectral flow and localization scaling.” The analytic target remains
an infinite-volume Pin Fredholm operator.

The next executable model should first certify the glide symmetry and common
Majorana orientation. Only then should it diagonalize a sequence of sizes and
compare reference and defect sectors.

## 10. Certificate

The [finite Majorana nullity certificate](../../../verification/verify/verify_finite_majorana_even_nullity_and_relative_parity.mjs)
checks even rank and even nullity across explicit antisymmetric matrices and
separates total nullity from relative Pfaffian parity.

## Companion documents

- [Selector parity correction ledger](378_correction_ledger_for_selector_index_parity_and_primitive_deck_claims.md)
- [Grading-reversing deck index no-go](377_a_grading_reversing_deck_symmetry_forces_zero_cover_index_so_the_index_three_parent_cannot_be_the_same_operator.md)
- [Finite-family parity audit](375_the_minimal_deck_model_loses_the_integer_grading_but_does_not_yet_prove_odd_fermion_parity.md)
- [Pfaffian wall theorem](347_particle_hole_symmetry_upgrades_selector_parity_to_a_pfaffian_zero_mode_invariant.md)
