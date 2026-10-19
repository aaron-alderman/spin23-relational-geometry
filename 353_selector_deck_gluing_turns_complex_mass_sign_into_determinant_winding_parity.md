# Selector Deck Gluing Turns the Complex Mass Sign into Determinant-Winding Parity

**Date:** 17 October 2026  
**Branches:** B01, B03, B05, B06, B08, B09 and B11  
**Claim status:** exact equivariant winding-parity theorem; its promotion to a physical defect index remains conditional

## 1. Why this branch is open

The neutral Majorana calculation produced

\[
\operatorname{Pf}(M\otimes\varepsilon)=\det M.
\]

For a CP-violating mass, this is complex. The path

\[
M(t)=e^{i\pi t}M_0,
\qquad 0\leq t\leq1,
\]

connects \(M_0\) to \(-M_0\) without closing the mass gap. Therefore an
unqualified real Pfaffian sign is unavailable.

But the selector is not merely an interval with unrelated endpoints. Its two
ends are related by the antipodal deck action. The right question is therefore
whether deck sewing turns the open complex path into an equivariant closed
problem.

## 2. Antipodal sewing condition

Let \(\theta\in\mathbb R/2\pi\mathbb Z\) parametrize the selector double cover,
and let the deck transformation be

\[
\tau:\theta\longmapsto\theta+\pi.
\]

Assume the mass is odd under the selector sheet exchange:

\[
\boxed{M(\theta+\pi)=-M(\theta).}
\]

For \(N\) neutral flavors, define

\[
d(\theta)=\det M(\theta).
\]

Then

\[
\boxed{d(\theta+\pi)=(-1)^N d(\theta).}
\]

This determinant sewing law is exact and basis independent.

## 3. The equivariant winding theorem

Suppose \(d(\theta)\ne0\) everywhere. Its winding on the selector double cover is

\[
w[d]=\frac{1}{2\pi i}\oint d\log d\in\mathbb Z.
\]

Choose a continuous phase lift \(d(\theta)=|d(\theta)|e^{i\phi(\theta)}\).
The sewing condition implies

\[
\phi(\theta+\pi)-\phi(\theta)=N\pi+2\pi k
\]

for an integer \(k\), constant by continuity. Applying the same relation to the
second half of the cover gives

\[
\phi(2\pi)-\phi(0)=2N\pi+4\pi k.
\]

Hence

\[
\boxed{w[d]=N+2k,\qquad w[d]\equiv N\pmod2.}
\]

This is the surviving invariant: arbitrary complex phase removes an endpoint
sign, but antipodal equivariance fixes winding parity.

## 4. Three flavors

For the minimal equivariant family

\[
M(\theta)=e^{i\theta}M_0,
\]

one has

\[
d(\theta)=e^{3i\theta}\det M_0.
\]

At a half-turn,

\[
d(\pi)=-d(0),
\]

while on the complete double cover

\[
\boxed{w[d]=3.}
\]

Equivariant deformations can change this integer by even amounts, but cannot
change its parity without either violating the sewing law or passing through
\(d=0\).

For the explicit checkpoint

\[
\det M_0=339+4i,
\]

the nonzero constant phase offset is irrelevant to the winding.

## 5. Relation to the earlier twisted grading

The four-component selector already produced a sign local system under the
antipodal deck action. The determinant transition is

\[
(-1)^N.
\]

For odd \(N\), this is the same \(\mathbb Z_2\) character that appeared in the
grading monodromy. The present calculation lifts that parity to an integer
winding on the double cover, with only its residue modulo two fixed by sewing.

This makes the hierarchy precise:

\[
\text{double-cover integer winding}
\longrightarrow
\text{deck-equivariant parity}
\longrightarrow
\text{twisted selector }\mathbb Z_2.
\]

## 6. A crucial topology warning

A complex line bundle over a circle is topologically trivial. Therefore the
factor \((-1)^N\) must not be advertised as a first Chern class or as a
standalone topological obstruction of an ordinary complex line bundle.

What is nontrivial here is the **equivariant sewing class** and the parity of
maps obeying it. If one forgets the deck action, the complex interpolation
between the two signs is legal and the obstruction disappears.

Likewise, the half-path phase change is not by itself an integer invariant. It
becomes controlled only after the endpoint is sewn by the specified deck
action and the full double cover is used.

## 7. What this does not yet prove

The winding-parity theorem does not, by itself, prove a Majorana zero mode. For
that one still needs a concrete spatial or momentum-space operator and an index
theorem relating its protected kernel to \(w[d]\) or \(w[d]\bmod2\).

The missing inputs include:

1. identification of selector angle with a physical defect coordinate, loop or
   momentum cycle;
2. a gapped Fredholm/BdG operator along the cycle;
3. the correct particle-hole or generalized-CP sewing;
4. gauge compatibility of the neutral subspace;
5. proof that allowed perturbations preserve the equivariant mass condition;
6. an analytic index or spectral-flow theorem.

Until these are supplied, this is a robust algebraic-topological constraint on
candidate mass families, not a particle prediction.

## 8. Physical interpretations now open

### 8.1 Selector-space defect

If the selector circle is physical order-parameter space, odd winding parity
can label a defect sector.

### 8.2 Momentum-space sewing

If the antipode acts on a Brillouin or compactified momentum cycle, the same
condition can become a topological-band sewing rule.

### 8.3 Determinant-line anomaly

If integrating out the neutral fermions produces a determinant line over
selector space, the \((-1)^N\) deck character may appear as a global sign or
anomaly. This requires a regulated functional determinant, not merely the
finite matrix calculation.

### 8.4 Exceptional cubic phase

If the phase of \(\det M\) is sourced by the exceptional cubic coefficient,
the theorem supplies a concrete target: derive its antipodal transformation and
show that the causal/Furey complexification respects the sewing law.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a selector-derived BdG or Dirac operator satisfies
an index theorem

\[
\dim\ker D\equiv w[\det M]\pmod2.
\]

That would convert the existing selector parity into a protected neutral mode.

**Sewing falsifier:** the physical mass is even, rather than odd, under the
antipodal selector action.

**Gap falsifier:** every equivariant three-flavor family is forced through
\(\det M=0\) for a reason already incompatible with the proposed gapped phase.

**Topology falsifier:** the flat factor \(-1\) is called a nonzero first Chern
class on \(S^1\).

**Index falsifier:** winding parity is asserted to count zero modes without an
operator, symmetry class and Fredholm/index argument.

## 10. Pinned dependency

The finite-dimensional topology is complete. The branch is pinned at building
the physical selector-dependent neutral operator and proving, or disproving,
the mod-two index map.

## 11. Certificate

The [selector-deck determinant-winding parity certificate](scripts/verify_selector_deck_determinant_winding_parity.mjs) verifies the antipodal sewing law, samples full-cover winding, checks \(w\equiv N\pmod2\) across flavor numbers and even winding shifts, and records the minimal three-flavor winding \(w=3\).

## Companion documents

- [Neutral Majorana Pfaffian reality gate](352_the_neutral_majorana_pfaffian_is_det_m_but_cp_makes_it_complex_and_removes_the_sign.md)
- [Four-component selector parity](346_the_four_component_selector_retains_only_index_parity_while_the_global_double_restores_z.md)
- [Pfaffian zero-mode invariant](347_particle_hole_symmetry_upgrades_selector_parity_to_a_pfaffian_zero_mode_invariant.md)
- [Exceptional Majorana phase](329_the_exceptional_cubic_phase_splits_dirac_completion_from_majorana_index_breaking.md)
