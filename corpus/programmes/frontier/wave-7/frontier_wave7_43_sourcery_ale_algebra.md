# Frontier Wave 7.43: Sourcery's ALE Algebra Is an Ordered Path with a Join Valuation

**Date:** 24 October 2026  
**Status:** exact operational algebra for the declared composer protocol; not a proof or physical algebra

## Result

Sourcery's assumption-loss-evidence bookkeeping now has an exact algebraic
description. An admitted derivation retains two structures at once:

\[
\boxed{
\text{ordered path word}
\quad+\quad
\nu(p)=(A(p),L(p),E(p))
}
\]

The path word composes by ordered concatenation. The ALE valuation composes by
componentwise canonical distinct union. The valuation is therefore a
commutative idempotent monoid—a finite join-semilattice whenever the token
universes are finite—while the path itself remains noncommutative.

This distinction resolves a latent ambiguity in the earlier phrase “common
algebra.” The system remembers both *what accumulated* and *in what order the
operations occurred*. Two routes can have identical assumptions, losses and
evidence while remaining different derivations.

The [machine specification](sourcery_ale_algebra_v1.json) and
[certificate](../../../../verification/verify/verify_sourcery_ale_algebra.mjs)
check the algebra and run it over the F05 and F01 vertical slices.

## Exact laws

For composable paths (p,q),

\[
\nu(pq)=
(A(p)\cup A(q),L(p)\cup L(q),E(p)\cup E(q)).
\]

The empty path with three empty ledgers is the identity. Composition is
associative. The valuation is commutative and idempotent, but the path word is
not commutative. The valuation is neither cancellative nor invertible: after a
datum has entered a union, the ledger alone cannot determine which earlier
route supplied it.

This is not a defect. It states exactly why the ordered step trace must remain
beside the accumulated ledger.

## Duplicates are semantic, not textual

“Distinct union” is safe only after tokens are given canonical keys:

- an assumption key includes its normalized statement, scope and version;
- a loss key includes the lost distinction and endpoint signature hashes;
- an evidence key includes URI, content hash, version and authority scope;
- a rule key includes its stable identity and exact endpoint signatures.

The same URI with a different content hash is new evidence. The same words in
a different scope are a new assumption. Exact duplicates collapse in the
valuation, while their multiplicity remains available to the audit receipt.

## Losses cannot be unwritten

The loss coordinate is monotone:

\[
L(p)\subseteq L(pq).
\]

A later reconstruction may create a new object supported by new assumptions
and evidence. It does not retroactively delete what an earlier projection
forgot. This prevents a route from laundering an irreversible projection by
appending a persuasive final step.

## Rejection is outside the path algebra

A rule that fails signature, dimension, evidence, loss, analogy or authority
gates never becomes a “negative edge.” It is excluded before path composition,
and its failed checks remain in a rejection receipt. A later successful edge
cannot cancel that refusal.

The F01 slice demonstrates the point. The admitted word ends after projective
selection and the axis-preserving half-turn. The forbidden orientation
promotion is retained in the rejection receipt, while `orientation lift`
remains in the loss ledger. F05, by contrast, composes three admitted steps and
accumulates all of their assumptions, losses and evidence.

## Authority ceiling

Path composition cannot manufacture authority. Every current result remains
proposal-only, non-entailing, without empirical authority and without
application-admission power. Evidence quantity does not change that ceiling;
promotion requires the independent review, proof or experiment appropriate to
the destination claim.

## What this algebra is—and is not

The exact object is a typed free category of admitted transformations equipped
with a homomorphism into an ALE join-semilattice. It is not a vector algebra,
Lie algebra, Jordan algebra, proof calculus or empirical confirmation.

That modest description is useful. It makes refusal, loss and provenance
composable without allowing their accumulation to masquerade as truth.
