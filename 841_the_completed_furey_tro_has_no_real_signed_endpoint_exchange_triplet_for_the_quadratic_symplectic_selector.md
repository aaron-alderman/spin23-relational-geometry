# The Completed Furey TRO Has No Real Signed Endpoint-Exchange Triplet for the Quadratic Symplectic Selector

**Date:** 17 October 2026  
**Branches:** completed Furey TRO, color covariance, quadratic twirl, and microscopic selector realization  
**Claim status:** exhaustive finite no-go for real signed endpoint involutions; nonmonomial and bilocal branches remain open  
**Certificate:** [classify_color_triplet_signed_endpoint_exchanges_of_the_completed_furey_tro.mjs](scripts/classify_color_triplet_signed_endpoint_exchanges_of_the_completed_furey_tro.mjs)

## Executive result

The completed eight-endpoint Furey TRO contains no real signed endpoint-exchange realization of the three relationship legs required by the quadratic symplectic selector of document 839.

The certificate exhaustively enumerates:

- all \(8!=40,320\) permutations of the endpoint basis;
- the 24 permutations preserving the full directed support of the sixteen Standard Model matter arrows;
- all \(2^8\) real sign lifts of those support automorphisms;
- the 1,440 lifted matrices that are involutions;
- every orbit of those involutions under the physical color three-cycle.

There is no lifted involution \(S\) for which

\[
\left\{S,CSC^{-1},C^2SC^{-2}\right\}
\]

has three distinct members and

\[
S+CSC^{-1}+C^2SC^{-2}=0.
\]

Thus

\[
\boxed{
\text{completed TRO incidence}
+\text{real signed endpoint involution}
\not\Longrightarrow
\text{three zero-sum quadratic-twirl legs}.
}
\]

This closes a natural microscopic ansatz. It does not invalidate the exact response-level twirl, and it does not classify general partial isometries, complex phases, nonmonomial maps, bilocal kernels, or background-dependent relationship operators.

## 1. The finite object being classified

Use the endpoint basis

\[
(O_2^1,O_2^2,O_2^3,H_4,H_5,C,D,E).
\]

The completed one-generation matter incidence consists of sixteen directed matrix-unit arrows:

\[
\begin{aligned}
d_i&:O_2^i\leftarrow H_4,
&u_i&:O_2^i\leftarrow H_5,\\
u_i^c&:C\leftarrow O_2^i,
&d_i^c&:D\leftarrow O_2^i,
\end{aligned}
\qquad i=1,2,3,
\]

together with

\[
\nu:H_4\leftarrow E,
\quad e:H_5\leftarrow E,
\quad e^c:E\leftarrow C,
\quad \nu^c:E\leftarrow D.
\]

The tested color operation is the three-cycle

\[
C:O_2^1\mapsto O_2^2\mapsto O_2^3\mapsto O_2^1
\]

fixing the remaining five endpoints.

An endpoint permutation is admitted only when applying it simultaneously to the source and target of every arrow preserves this full directed support. This is stricter than preserving dimensions or an undirected incidence graph: it preserves the multiplication typing used by the completed TRO.

## 2. Unsigned classification

Exactly 24 of the 40,320 endpoint permutations preserve the directed matter support.

Their conjugacy-orbit counts under \(C\) are:

| orbit size | number of support automorphisms |
|---:|---:|
| 1 | 12 |
| 3 | 12 |

The orbit-size-three cases are not enough. Every ordinary permutation matrix is entrywise nonnegative and nonzero, so the sum of its three color conjugates is also entrywise nonnegative and nonzero. Consequently no unsigned endpoint-permutation orbit can obey the required zero-sum law.

This is a simple but exact obstruction: cancellation requires phases, signs, or genuinely nonmonomial linear combinations.

## 3. Exhaustive real signed lift

For each support automorphism \(p\), the certificate constructs every signed monomial lift

\[
S e_j=\epsilon_j e_{p(j)},
\qquad \epsilon_j\in\{+1,-1\}.
\]

It retains only involutions,

\[
S^2=I,
\]

because the candidate is meant to generalize the established exchange relation. There are exactly 1,440 such real signed involutive lifts.

For each lift the code computes

\[
S_0=S,
\qquad S_1=CS_0C^{-1},
\qquad S_2=C^2S_0C^{-2},
\]

and tests both:

1. \(|\{S_0,S_1,S_2\}|=3\);
2. \(S_0+S_1+S_2=0\) entry by entry.

The number of survivors is zero.

## 4. What the theorem says—and what it does not

The negative result is exact for this ansatz:

- one common endpoint map acts on both ends of every TRO matrix unit;
- the map is monomial over the real numbers;
- its nonzero coefficients are \(\pm1\);
- it preserves the entire directed sixteen-arrow support;
- it is involutive before color conjugation;
- the zero-sum law is imposed on the endpoint carrier itself.

It does **not** prove that the quadratic selector lacks a microscopic Standard Model origin. In particular, the search does not cover:

- nonmonomial orthogonal or symplectic endpoint maps;
- complex monomial phases, including cube-root phases;
- partial isometries acting only between compatible rectangular TRO components;
- left and right endpoint maps that are different but covariance-compatible;
- cancellation only after projection to a response quotient;
- bilocal triplet–antitriplet kernels;
- Higgs-, vacuum-, momentum-, or background-dressed relationship maps.

The conclusion must therefore be read as an ansatz boundary, not a universal impossibility theorem.

## 5. Why the no-go is informative

The established neutral exchange succeeded because it is an incidence automorphism and a gauge intertwiner. Document 840 showed that it is a color singlet. The present classification asks whether another equally elementary endpoint exchange could transform nontrivially under color and provide the missing three legs.

The answer is no even after permitting every real sign assignment compatible with involutivity.

This means that the cancellation

\[
H_0+H_1+H_2=0
\]

seen on the four-dimensional selector carrier is not the shadow of a literal signed relabelling of the completed Furey endpoints. If it descends from the Furey construction, some information must be added or some quotient must perform the cancellation.

## 6. Highest-value surviving branches

### Branch A: complex-phase monomial lifts

Replace \(\epsilon_j\in\{\pm1\}\) by unit complex phases. Cube-root phases can satisfy \(1+\omega+\omega^2=0\) and are therefore the smallest extension capable of producing a color-zero average without nonmonomial support.

**Gate:** classify finite-order phase lifts preserving the adjoint/TRO product and the real-time conjugate sideband structure. A phase solution that violates the star operation or creates independent mirror states is inadmissible.

**Resolved in document 842:** this branch is closed more strongly than the finite gate requested. Sixth-root involutive lifts give no solution, and the support pattern excludes every unit-phase monomial lift of any order. Continue with Branches B--E.

### Branch B: rectangular partial isometries

Allow different typed maps on the left and right endpoint spaces of each rectangular component rather than a single global endpoint permutation.

**Gate:** preserve ternary closure and produce a well-defined completely positive quadratic response after summing color conjugates.

### Branch C: quotient-level cancellation

Relax the demand that the three microscopic legs sum to zero before projection. Seek a surjective source-to-response map \(\Pi\) such that

\[
\Pi(S_0+S_1+S_2)=0
\]

while

\[
\Pi\!\left(\frac13\sum_i S_i^\dagger A S_i\right)
\]

reproduces the exact four-carrier twirl.

**Gate:** the kernel of \(\Pi\) must be gauge stable, must not erase the lepton/color-singlet response, and must not insert the desired symplectic form by hand.

### Branch D: bilocal triplet–antitriplet kernels

Form the response from a color triplet source and a conjugate antitriplet source. The linear legs need not be gauge singlets; only their quadratic contraction must be.

**Gate:** derive the positive Kraus channel and show that its alternating fixed space is exactly one-dimensional.

### Branch E: background-dressed relationship operators

Treat the noncommuting handle as a relation between a source and a Higgs/vacuum/background choice, not as a bare gauge generator.

**Gate:** exact covariance must account for the background transformation. Merely choosing three matrices similar to \(H_i\) is not a derivation.

## 7. Stop-everything criteria

The following would materially change the programme:

1. **Positive trigger:** an admissible Furey-derived three-leg channel whose alternating fixed space is uniquely \(\mathbb R J_0\) and whose symmetric action is positive. This would provide the first typed microscopic derivation of the response-level \(Sp(4,\mathbb R)\) selector.
2. **Stronger no-go:** a representation-theoretic proof that every gauge-covariant completely positive channel obtainable from the completed TRO has an alternating fixed space of dimension other than one. That would close the entire TRO-to-selector route, not merely signed exchanges.
3. **Shortcut falsifier:** any explicit real signed endpoint involution satisfying the stated support, orbit, and zero-sum conditions. The exhaustive certificate rules this out within the encoded incidence data.

## 8. Branch verdict

| Question | Verdict |
|---|---|
| Does the completed directed support have nontrivial color-orbit automorphisms? | **yes; 12 of orbit size three** |
| Can unsigned permutations have zero color-orbit sum? | **no, by entrywise positivity** |
| Can a real signed involutive lift have a three-member zero-sum orbit? | **no; 1,440 lifts exhausted** |
| Is the exact quadratic selector thereby falsified? | **no** |
| Is a literal real endpoint-exchange derivation closed? | **yes** |
| Are complex, partial-isometry, quotient, bilocal, or dressed derivations open? | **yes** |

## 9. Position in the corpus

- [quadratic color twirl and unique symplectic fixed line](839_color_twirling_kills_the_linear_handle_but_its_quadratic_relationship_channel_selects_the_unique_symplectic_carrier.md)
- [neutral exchanged-TRO comparison](840_the_established_neutral_exchanged_tro_response_is_a_color_singlet_and_cannot_supply_the_three_quadratic_twirl_legs.md)
- [commuting-generator obstruction and central repair](838_commuting_microscopic_color_and_handle_exchange_cannot_descend_to_R_and_H_and_the_central_repair_loses_the_singlet_lines.md)
- [intrinsic Hermitian exchanged-TRO response](617_the_hermitian_furey_selector_is_a_standard_exchanged_tro_response.md)
- [all unit-phase monomial endpoint maps are excluded](842_no_unit_phase_monomial_map_on_the_completed_furey_endpoints_can_realize_the_zero_sum_color_triplet.md)

