# No global semantic adjoint exists on the current Claimipedia relation source

**Date:** 26 October 2026
**Status:** exact finite exhaustion and no-go theorem; a formal reverse completion exists but is not source-authored
**Parents:** [incidence/co-incidence topology doublet](admissibility_133_the_incidence_coincidence_doublet_detects_odd_cycle_topology.md), [typed two-rail lift](admissibility_126_typed_two_rail_positive_lift_preserves_the_mirror_face.md)
**Evidence:** [semantic-adjoint exhaustion](../../../evidence/data/claimipedia-semantic-adjoint-exhaustion-v1.json)
**Verifier:** [24-permutation and 10-involution audit](../../../verification/admissibility/verify_claimipedia_semantic_adjoint_exhaustion.mjs)

## The required test

A source-native path adjoint must do more than reverse the two free rails. It
must assign an adjoint type (t^*) to every authored relation type and satisfy

\[
(u\xrightarrow{t}v)^*
=v\xrightarrow{t^*}u
\]

using records that actually exist in the captured source. Because an adjoint
is involutive, (t\mapsto t^*) must itself be an involution on

\[
\{\text{Challenges},\text{DependsOn},\text{Qualifies},\text{Supports}\}.
\]

There are only 24 permutations of four types and only 10 involutions. The
finite search is therefore exhaustive.

## Exhaustion result

No type assignment closes the 43 authored records under reversal. The best
involutions match only two records and leave 41 unmatched.

Both best rules exchange Supports and Qualifies. They differ only in whether
Challenges is fixed or exchanged with DependsOn. The only records matched by
either rule are

\[
\text{Spin}\xrightarrow{\rm Supports}\text{Temple},
\qquad
\text{Temple}\xrightarrow{\rm Qualifies}\text{Spin}.
\]

Thus the already-known Spin--Temple reversible cell has a local semantic
adjoint, while the full relationship source does not.

## The odd-cycle detector cannot yet become a star-path detector

The river triangle consists of three DependsOn arrows:

\[
\text{riverFlow}\to\text{instrumentCalibration}
\to\text{riverNitrate}\to\text{riverFlow}.
\]

None of the three reverse endpoint pairs is authored under any relation type.
No permutation of type names can repair a missing reverse endpoint pair.
Consequently the odd-cycle obstruction detected by AZ-133 cannot currently
be transported through a source-native adjoint to form an oriented
(*)-path observable.

## What the free mirror does and does not repair

The typed two-rail carrier always permits a formal mirror: it maps the kernel
of the authored graph to the kernel of the formally reversed graph. One can
also freely adjoin every missing reverse arrow and obtain a (*)-completion.
That construction is mathematically legitimate, but it changes the source.
It cannot be cited as evidence that Claimipedia authored the reverse
semantics.

This separates three levels:

1. **free rail mirror:** exact on the enlarged carrier;
2. **local semantic adjoint:** exact on the Spin--Temple reciprocal cell;
3. **global source adjoint:** absent from the captured relation set.

## Consequence for OT-026

The present-source graph-to-Jordan route is exhausted at a precise boundary.
AZ-131 derives the local Clifford rail cell, and AZ-133 derives its doubled
positive response and odd-cycle topology. AZ-134 proves that the current
authored records cannot supply the global semantic adjoint required to turn
those structures into a path-(*) algebra.

This is a negative completion, not a failure of the earlier constructions.
The source-native algebra exists one level above the path semantics.

## Reopening datum

Reopen only if one of the following is supplied independently:

1. authored reverse-relation semantics and records covering the 41 unmatched
   relations;
2. an external contravariant functor mapping each relation to a tested reverse
   operation; or
3. a physical device dictionary whose reverse controls predict held-out path
   records without adding the missing arrows by definition.

AZ-142 subsequently supplies a physical parity selector on a three-resonator
triangle, but it deliberately does not assign Supports, Challenges,
DependsOn or Qualifies to couplings. It therefore calibrates the
carrier--selector--detector grammar while respecting this semantic no-go.
