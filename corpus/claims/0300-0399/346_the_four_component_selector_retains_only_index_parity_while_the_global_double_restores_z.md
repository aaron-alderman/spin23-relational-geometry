# The Four-Component Selector Retains Only Index Parity, While the Global Double Restores \(\mathbb Z\)

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B06, B08 and B11  
**Claim status:** exact local-coefficient calculation of the grading monodromy; analytic identification with a physical mod-two Fredholm index still requires a globally defined real or twisted-chiral operator

> **Later correction (Document 378):** the local-system calculation below is
> exact, but inserting the conventional vortex index (3) is only a formal
> local label. If the grading-reversing deck is an exact symmetry of the same
> Fredholm operator, its ordinary complex cover index is forced to zero. The
> conventional index-three vortex and the Pin/twisted quotient are now separate
> branches.

## 1. The local index changes sign under the selector deck map

The four-component selector module has a local grading \(C\), but its antipodal transition satisfies

\[
GCG^{-1}=-C.
\]

For a chiral Fredholm operator, reversing the grading exchanges its two off-diagonal blocks. Therefore

\[
\operatorname{ind}_{-C}\mathcal D
=-\operatorname{ind}_{C}\mathcal D.
\]

Transport around the nontrivial loop of \(\mathbb{RP}^2\) acts on the local integer index by

\[
\nu\mapsto-\nu.
\]

The index is not an ordinary globally constant integer. It is a section of an integer local system with sign monodromy.

## 2. Cellular calculation of the local system

Restrict to the nontrivial selector loop. Topologically it is a circle carrying the local coefficient system

\[
\mathbb Z_-,
\]

whose generator acts by \(-1\).

With one zero-cell and one one-cell, the cellular boundary is

\[
\partial_1=t-1.
\]

For sign monodromy,

\[
t=-1,
\]

so

\[
\boxed{\partial_1=-2.}
\]

Consequently,

\[
\boxed{
H_0(S^1;\mathbb Z_-)
=\operatorname{coker}(-2)
=\mathbb Z_2,}
\]

while

\[
H_1(S^1;\mathbb Z_-)
=\ker(-2)
=0.
\]

The global coinvariant of the local integer is its parity.

## 3. What survives globally

The deck relation identifies

\[
\nu\sim-\nu.
\]

Over an additive integer classification, this gives

\[
\nu-(-\nu)=2\nu\sim0.
\]

Hence

\[
\boxed{
[\nu]_{\rm twisted}=\nu\bmod2.}
\]

For the uncompleted three-generation local product index,

\[
\nu=3,
\]

the twisted class is nontrivial:

\[
[3]_{\rm twisted}=1\in\mathbb Z_2.
\]

But

\[
[1]_{\rm twisted}
=[3]_{\rm twisted}
=[5]_{\rm twisted}.
\]

The minimal selector topology distinguishes odd from even, not one generation from three.

## 4. Dirac completion

With one right-handed neutrino per generation,

\[
8+7\longrightarrow8+8,
\]

and the local AIII product index becomes

\[
\nu=0.
\]

Its twisted parity also vanishes.

Thus the selector parity retains the same broad distinction:

\[
\begin{array}{ccl}
\text{uncompleted odd family count}&:&\text{nontrivial parity},\\
\text{Dirac-balanced completion}&:&\text{trivial parity}.
\end{array}
\]

It still does not derive the observed value \(N_g=3\).

## 5. The eight-component lift restores the integer

For the doubled selector module,

\[
G_8C_8G_8^{-1}=C_8.
\]

The index local system has trivial monodromy:

\[
t=+1.
\]

Its cellular boundary is

\[
\partial_1=t-1=0.
\]

There is no quotient \(\nu\sim-\nu\). The full oriented integer survives:

\[
\boxed{
\text{globally graded eight-component lift}
\quad\Longrightarrow\quad
\nu\in\mathbb Z.}
\]

This is the precise topological value of the extra two-state factor: it orients the chiral-index local system.

## 6. What this calculation proves

It proves:

- the local index has sign monodromy in the minimal selector bundle;
- ordinary integer index data cannot be transported globally;
- the natural additive coinvariant is \(\mathbb Z_2\);
- three local modes define the nontrivial parity class;
- the globally graded double removes the sign twist and restores \(\mathbb Z\).

It does not yet prove:

- a mod-two analytic index for the complete differential operator;
- that an odd zero mode remains pinned at exactly zero without an additional real or particle-hole symmetry;
- that the physical selector texture realizes the required Fredholm family;
- that the parity class is free of gauge and gravitational anomalies.

## 7. Analytic protection gate

A finite-dimensional complex Hermitian operator with no global chiral or particle-hole symmetry can move a lone local zero away from zero. Topological parity bookkeeping is not by itself spectral protection.

To upgrade the \(\mathbb Z_2\) class to a physical zero-mode theorem, one needs one of:

- a globally defined real skew-adjoint Fredholm operator with a mod-two index;
- particle-hole symmetry placing the defect in a real Altland–Zirnbauer class;
- a twisted chiral Fredholm theorem with the grading line bundle included;
- a Pfaffian sign invariant at the selector endpoints;
- a spectral-flow parity theorem for the deck-equivariant family.

Until then, \(\mathbb Z_2\) is the correct candidate classification of the index local system, not a completed zero-energy theorem.

## 8. Cross-branch consequence

This result reinforces the earlier generation-count audit:

\[
\boxed{
\text{selector topology detects generation parity, not }N_g=3.}
\]

The integer three belongs to the untwisted AIII wall with a global grading. The minimal full-selector bundle retains only its odd parity.

The two claims must not be conflated.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the physical CAR/Furey operator admits a deck-equivariant real Fredholm formulation whose mod-two analytic index equals the selector parity.

**Integer-restoration trigger:** an existing gauge-compatible two-state factor realizes the eight-component lift and restores the integer index without new matter.

**Integer falsifier:** the four-component grading-reversing bundle is assigned one global signed integer index.

**Parity falsifier:** indices differing by two are claimed to define different classes after sign monodromy.

**Spectral falsifier:** the local-system \(\mathbb Z_2\) calculation is claimed by itself to pin a complex eigenvalue at zero.

**Generation falsifier:** odd parity is presented as a derivation of exactly three generations.

## 10. Pinned dependency

The topological coefficient system is now computed. The remaining dependency is analytic:

1. construct the deck-equivariant real/twisted Fredholm operator;
2. identify its mod-two index or Pfaffian invariant;
3. verify gauge covariance and anomaly freedom.

## 11. Certificate

The [twisted selector-index parity certificate](../../../verification/verify/verify_twisted_selector_index_reduces_to_parity.mjs) checks the sign-monodromy boundary map, the \(\mathbb Z_2\) coinvariant, the odd three-generation class, Dirac balancing and restoration of \(\mathbb Z\) by the globally graded double.

## Companion documents

- [Full-selector Clifford and global-grading gate](345_the_full_selector_has_a_four_component_local_clifford_lift_but_needs_eight_for_a_global_aiii_grading.md)
- [Selector topology cannot select three generations](321_selector_topology_anomalies_and_the_aiii_index_do_not_by_themselves_select_three_generations.md)
- [Continuum AIII Fredholm theorem](340_the_textured_aiii_operator_is_fredholm_when_the_wall_mass_stays_gapped_at_infinity.md)
- [Selector great-circle bundle lift](317_the_selector_great_circle_has_a_unique_exchange_bundle_lift_but_full_rp2_requires_doubling.md)
