# Frontier Wave 7.235: E8 Two-Local Clock Hardware Has a Uniform Bulk Gap

**Date:** 26 October 2026

**Status:** exact finite-qudit surrogate; continuum E8 response open

**Programme:** [translation-free exceptional topology](../../translation-free-exceptional-topology/README.md)

**Protocol:** [few-body clock hardware](../../translation-free-exceptional-topology/E8_FEW_BODY_CLOCK_GAP.md)

**Evidence:** [gap ledger](../../../../evidence/data/translation-free-e8-few-body-clock-gap-v1.json)

**Certificate:** [exact verifier](../../../../verification/verify/verify_translation_free_e8_few_body_clock_gap.mjs)

## Result

The high-body appearance of the E8 null-vector schedule is not invariant.
The integral change (phi'=K_{E_8}phi) reduces all eight column interactions
to two-field interwire locks. A finite-(q) hardware regularization completes
each lock with its commuting conjugate stabilizer, producing independent
generalized-Bell pairs in the bulk and sixteen unpaired edge registers.

Every Hamiltonian term is two-local. The native interaction graph has degree
one; the fixed simple-root-to-dual source mixer has maximum degree four. The
gap above the (q^{16})-dimensional edge ground space is exactly the weakest
bond amplitude. With amplitudes restricted to ([0.75,1.25]), the bulk gap is
uniformly at least (0.75) for any width. The frozen 28-instance sweep reaches
34 wires, 264 bulk pairs and (q=17), with minimum observed gap
(0.750080793514).

## Interpretation

This closes the literal compilation and size-stable many-body-gap request for
an exact digital/clock carrier. It does not yet prove that the carrier has the
E8 chiral anomaly. The integral mixer preserves the null-vector arithmetic,
but the stabilizer completion can forget continuum velocity, current OPE and
thermal response. Those must be recovered rather than inferred.

The resulting promotion ladder is now:

\[
\text{two-local clock gap}
\longrightarrow
\text{clock-to-rotor convergence}
\longrightarrow
\text{chiral }c_-=8
\longrightarrow
\text{held-out 240-root closure}.
\]

Failure of the second arrow would be a useful no-go: bounded-degree gapped
hardware can realize the locking incidence while still failing to realize the
exceptional chiral field theory.
