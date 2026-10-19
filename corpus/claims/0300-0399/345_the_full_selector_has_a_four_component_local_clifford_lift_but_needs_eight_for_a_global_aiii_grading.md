# The Full Selector Has a Four-Component Local Clifford Lift but Needs Eight for a Global AIII Grading

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08 and B11  
**Claim status:** exact complex Clifford representation and minimal global-grading obstruction; identification of the required doubling with an existing gauge-compatible physical factor remains sector dependent

## 1. Requirements for the full selector

A one-dimensional full-selector Dirac operator needs:

- one kinetic matrix \(\alpha\);
- three selector mass matrices \(\beta_1,\beta_2,\beta_3\);
- one fixed chiral grading \(C\).

They must obey

\[
\alpha^2=\beta_a^2=C^2=I
\]

and pairwise anticommutation.

This is a complex Clifford system with five generators.

## 2. Four components give the minimal local representation

Let two independent Pauli factors be available. Define

\[
\alpha=\sigma_x\otimes I,
\]

\[
\beta_a=\sigma_z\otimes\sigma_a,
\qquad
a=1,2,3,
\]

and

\[
C=\sigma_y\otimes I.
\]

All five matrices square to one and anticommute pairwise.

Thus

\[
\boxed{
\widetilde D
=-i\alpha\partial_x
+m\sum_{a=1}^3n_a(x)\beta_a}
\]

has the fixed local grading

\[
\{C,\widetilde D\}=0
\]

for every selector direction \(n\in S^2\).

The minimal complex Clifford module has dimension four. The local transverse-mass obstruction of the two-component Pauli model is removed without adding an independent flavor generation.

## 3. The antipodal deck lift flips the local grading

The selector director identifies

\[
n\sim-n.
\]

In the four-component module, take

\[
G_4=\alpha.
\]

Then

\[
[G_4,\alpha]=0,
\qquad
G_4\beta_aG_4^{-1}=-\beta_a.
\]

It correctly implements the antipodal selector transition while preserving the kinetic term.

But

\[
\boxed{
G_4CG_4^{-1}=-C.}
\]

The local AIII grading changes sign across the deck transition. It is not a single globally defined grading on the \(\mathbb{RP}^2\) selector bundle.

## 4. Why no other four-component deck lift fixes this

Suppose a four-component \(G\) commutes with both \(\alpha\) and \(C\). In the irreducible representation above, their joint commutant is

\[
I\otimes M_2(\mathbb C).
\]

Write

\[
G=I\otimes g.
\]

To flip every selector mass, \(g\) must anticommute with all three Pauli matrices:

\[
\{g,\sigma_a\}=0,
\qquad
a=1,2,3.
\]

Expanding

\[
g=a_0I+\sum_ia_i\sigma_i
\]

gives

\[
\{g,\sigma_i\}=2a_0\sigma_i+2a_iI.
\]

All four coefficients must vanish. There is no invertible solution.

Therefore the minimal four-component module cannot simultaneously implement the antipodal deck map and preserve one global chiral grading.

## 5. An eight-component globally graded lift

Add one two-state factor \(\tau\), and define

\[
\alpha_8=\sigma_x\otimes I\otimes I,
\]

\[
\beta_{a,8}
=\sigma_z\otimes\sigma_a\otimes\tau_z,
\]

\[
C_8=\sigma_y\otimes I\otimes I.
\]

Now choose

\[
\boxed{
G_8=I\otimes I\otimes\tau_x.}
\]

Then

\[
[G_8,\alpha_8]=0,
\qquad
[G_8,C_8]=0,
\]

while

\[
G_8\beta_{a,8}G_8^{-1}=-\beta_{a,8}.
\]

Thus eight complex components provide a globally grading-preserving lift of the full \(\mathbb{RP}^2\) selector.

Because irreducible complex \(Cl_5\) modules have dimension four, and the four-component case is obstructed, this doubling is minimal for an ordinary untwisted global AIII grading.

## 6. The extra factor must already exist

The eight-component construction is physically credible only if the \(\tau\) factor is already present as:

- a neutral Nambu/Majorana pair;
- an identical-sheet pair;
- an existing Lorentz or boundary doubling;
- another gauge-compatible CAR multiplicity.

It must not be counted as a new independent mirror generation.

For charged \(R\oplus\bar R\), the unitary Nambu swap \(\tau_x\) is not gauge equivariant. It can work directly in a gauge-neutral sterile sector or on two identical charged sheets where the gauge action is the same on both components.

## 7. The \(8+7\) internal grading cannot compensate

One might try to retain the four-component wall module and cancel

\[
C\mapsto-C
\]

by an internal transition

\[
W_Y\mapsto-W_Y.
\]

This requires an invertible internal map \(R\) satisfying

\[
\{R,W_Y\}=0.
\]

Such a map bijects the positive and negative eigenspaces of \(W_Y\). Therefore their dimensions must agree.

For one uncompleted Standard-Model generation,

\[
\dim V_+=8,
\qquad
\dim V_-=7.
\]

No invertible compensation exists.

After Dirac completion,

\[
8+8,
\]

an exchange becomes possible—but the AIII product index is then balanced to zero.

This is a genuine tension:

\[
\boxed{
\text{uncompleted }8+7\text{ gives the integer index but cannot globally compensate the selector deck;}
}
\]

\[
\boxed{
\text{completed }8+8\text{ can compensate but removes the index.}
}
\]

## 8. Twisted alternative

The four-component local grading may still define a grading twisted by the selector orientation line bundle. Such a problem would not be the ordinary globally graded AIII Fredholm operator used in the index-three theorem.

Its invariant may reduce to a \(\mathbb Z_2\) parity or belong to twisted equivariant \(K\)-theory. This possibility is mathematically credible but has not been computed here.

The ordinary integer AIII claim must not be carried across the antipodal transition without either the eight-component lift or an explicit twisted-index theorem.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** an existing neutral Nambu or identical-sheet factor realizes \(G_8\) on the physical Furey carrier and yields a global defect invariant with no new matter.

**Twisted-index trigger:** the four-component selector bundle has a computed twisted index that recovers the required zero-mode count.

**Minimality falsifier:** a nonzero four-component \(G\) commuting with \(\alpha,C\) and anticommuting with all three \(\beta_a\) is exhibited.

**Gauge falsifier:** the charged particle–antiparticle swap is used as \(G_8\) without checking gauge covariance.

**Index falsifier:** the local grading is treated as globally defined despite \(G_4CG_4^{-1}=-C\).

**Counting falsifier:** the extra Clifford factor is counted as new matter rather than identified with an existing spin, CAR or sheet multiplicity.

## 10. Pinned dependency

The full-selector local Clifford problem is solved. The global physical problem is narrowed to:

1. realize the minimal extra factor in a gauge-compatible existing sector; or
2. compute the twisted index of the four-component selector bundle.

## 11. Certificate

The [full-selector globally graded Clifford-lift certificate](../../../verification/verify/verify_full_selector_clifford_lift_needs_global_grading_double.mjs) checks the local \(Cl_5\) relations, the four-component grading flip, the commutant no-go, the eight-component lift and the \(8+7\) internal compensation obstruction.

## Companion documents

- [Selector great-circle bundle lift](317_the_selector_great_circle_has_a_unique_exchange_bundle_lift_but_full_rp2_requires_doubling.md)
- [Dynamical wall versus selector loop](341_a_phi4_field_generates_the_fredholm_wall_but_the_rp2_selector_requires_a_loop_lift.md)
- [Three-sheet CAR gauge gate](328_the_three_sheet_car_count_is_consistent_but_the_charged_nambu_swap_cannot_be_the_full_selector_lift.md)
- [Continuum AIII Fredholm theorem](340_the_textured_aiii_operator_is_fredholm_when_the_wall_mass_stays_gapped_at_infinity.md)
