# Frontier Wave 7.92: The \(\mathbb Z_6\) Binary Record Character

**Date:** 25 October 2026
**Status:** exact conditional derivation of the sign-only phase rule
**Certificate:** [binary record character verifier](../../../../verification/verify/verify_chain_theory_z6_binary_record_character.mjs)

**Subsequent implementation:** [Wave 7.103](frontier_wave7_103_cubed_commutator_binary_detector.md) proves that the character is the unitary cube map (z\mapsto z^3) on the central commutator phase and implements it by three ordered loops.

## Result

The previously imported “sign-only” rule has a minimal algebraic realization
already adjacent to the corpus's (3+2) carrier.  If exchange phases are
assembled into

\[
C_6\cong C_3\times C_2,
\]

and the detector is required to produce a multiplicative binary record, then
there is exactly one nontrivial character

\[
\boxed{
\chi:C_6\longrightarrow C_2,
\qquad
\chi(k)=k\pmod2.
}
\]

Its kernel is the complete order-three subgroup:

\[
\ker\chi=\{0,2,4\}\cong C_3.
\]

Writing ζ₆ for a primitive sixth root,

\[
\chi(\omega)=\chi(\zeta_6^2)=+1,
\qquad
\chi(-1)=\chi(\zeta_6^3)=-1.
\]

Thus every qutrit cubic exchange phase is invisible to the binary record,
while the qubit sign is retained.  This is precisely the phase selection
needed for (169+3=172), without pretending that the qutrit bracket itself
vanishes.

## 1. Why the character is forced

A multiplicative binary detector is a group homomorphism into (C_2).  Since
there is no nontrivial homomorphism

\[
C_3\longrightarrow C_2,
\]

all cubic phases must map to the identity.  The order-two subgroup of (C_6)
can map nontrivially, and requiring it to do so selects χ uniquely.

Equivalently, the detector performs the quotient

\[
C_6/C_3\cong C_2.
\]

This is not an arbitrary instruction to ignore colour-like phases.  It is the
only nontrivial multiplicative compression of the joint coprime phase group
to a one-bit output.

## 2. Recovery of the record count

The 169 ordinary degree-two products are retained independently of their
central order labels.  The extra record channel asks only whether reversing a
pair produces the nontrivial binary character.

For the three Pauli axes, every unordered distinct pair has central
commutation phase (-1).  Hence

\[
\binom32=3
\]

additional binary order records survive.  Generalized qutrit Weyl pairs
produce phases (1,\omega,\omega^2), all of which lie in the kernel of χ,
so they contribute no additional binary phase record.  Therefore

\[
\boxed{169+3=172.}
\]

The full qutrit Lie bracket remains mathematically present.  What disappears
is only its image under this deliberately one-bit record functor.

## 3. Why this fits the corpus unusually well

The corpus independently derives two ingredients near the same (3+2)
carrier:

1. octonion-product compatibility reduces the colour comparison phase to
   (C_3);
2. a specified matched CAR real structure reduces the weak comparison phase
   to (C_2).

Together they give (C_3\times C_2\cong C_6).  The faithful Standard Model
global group also contains the diagonal (\mathbb Z_6) quotient.  The new
observation is that a one-bit character of this arithmetic has exactly the
record selectivity demanded by the Chain target.

It also explains how a qutrit multiplicity can still contribute a
√3 amplitude weight while its cubic *phase label* is absent: orbit size and
the detector's output alphabet are different pieces of data.

## 4. The essential firewall

The faithful Standard Model (\mathbb Z_6) is a subgroup that acts trivially
on completed matter representations and is divided out.  A nontrivial
character of that gauge kernel is therefore not automatically a physical
observable.  Three objects must not be conflated:

- the diagonal gauge kernel in
  ((SU(3)\times SU(2)\times U(1))/\mathbb Z_6);
- the residual (C_3\times C_2) comparison ambiguity of two carrier frames;
- the phase group presented to a detector by ordered read operations.

Their abstract groups can agree while their physical types differ.  The
binary character becomes a real bridge only if an explicit sewing map sends
the read-order cocycle into the carrier comparison phase before the gauge
kernel is quotiented away.

## 5. Minimal detector realization

A concrete realization needs one reference bit (r\in\{+1,-1\}) whose update
under an ordered exchange phase ζ₆ᵏ is

\[
r\longmapsto(-1)^k r.
\]

The detector must satisfy three checks:

1. two successive phase compositions update the bit multiplicatively;
2. ω and ω² leave the bit unchanged;
3. −1 flips it.

Interferometric readout must then show that the missing qutrit information is
still recoverable in a phase-complete detector, even though it is absent from
the binary channel.  That comparison distinguishes detector-relative
admissibility from a false claim that the qutrit commutator is zero.

## 6. Status of the backward bridge

The target's final (3) is no longer merely a hand-selected dimension.  It
follows from three explicit assumptions:

\[
\boxed{
\text{joint }C_6\text{ phase carrier}
+\text{ multiplicative one-bit detector}
+\text{ read-order sewing}
}
\]

The first two give a unique character and the desired kernel.  The third is
not yet derived.  It is now the sole algebraic bridge required to turn the
conditional theorem into a corpus result.

## Verdict

This is the first natural mechanism found that reproduces the target's
asymmetric Lie-record census without deleting qutrit noncommutativity.  A
binary multiplicative detector sees the qubit sign and quotients out every
qutrit cubic phase.  The mechanism is exact and unique once its input and
output groups are chosen; its physical application remains conditional on a
typed read-order-to-carrier sewing map.

## Corpus anchors

- [faithful global \(\mathbb Z_6\) quotient](../../../claims/0400-0499/418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [octonion colour phase and weak phase blindness](../../../claims/0400-0499/420_the_octonion_cross_product_fixes_the_colour_phase_but_the_weak_jordan_algebra_is_phase_blind.md)
- [conditional CAR sign reduction](../../../claims/0400-0499/422_a_specified_CAR_real_structure_reduces_the_weak_phase_to_a_sign_but_does_not_canonically_choose_that_real_structure.md)
- [Jordan--Lie record fork](frontier_wave7_85_chain_theory_jordan_lie_record_fork.md)
- [gain and covariance gate](frontier_wave7_91_chain_theory_gain_and_covariance_gate.md)
