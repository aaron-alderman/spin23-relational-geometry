# Frontier Wave 7.68: Selector-Split Fingerprint and the Channel-Breaking Gate

**Date:** 25 October 2026
**Status:** exact finite-representation decomposition and invariant-Hom no-go
**Ledger:** [Q-provenance audit](q_provenance_audit_v1.json)
**Certificate:** [selector fingerprint verifier](../../../../verification/verify/verify_selector_primitive_split_fingerprint.mjs)

## Result

The finite selector that derives the compatible complex structure also
commutes with its pullback involution on primitive two-forms. It therefore
preserves the derived decomposition

\[
W=W_-^{(2)}\oplus W_+^{(3)}.
\]

The restricted generators have the exact fingerprints

| sector | generator \(R\) | generator \(H\) |
|---|---|---|
| \(W_-^{(2)}\) | trace \(-1\), determinant \(1\), order \(3\) | trace \(-2\), determinant \(1\), order \(2\) |
| \(W_+^{(3)}\) | trace \(0\), determinant \(1\), order \(3\) | trace \(-1\), determinant \(1\), order \(2\) |

Most importantly,

\[
\boxed{
\operatorname{Hom}_{\langle R,H\rangle}
(W_-^{(2)},W_+^{(3)})=0.
}
\]

## Meaning

The selector package can derive and protect the \(2+3\) quadratic splitting,
but an exactly selector-invariant nonzero rectangular map between those
sectors is impossible. This is not a failure of the construction; it locates
the required symmetry breaking precisely.

A physical channel \(E:W_-\to W_+\) must therefore be one of:

1. a vector in a nontrivial covariant orbit of the selector;
2. a spurion or boundary datum that breaks the finite selector;
3. an order parameter selected dynamically from the six-dimensional cross
   module; or
4. an operation belonging to a larger TKK/\(Sp(4,\mathbb R)\) action rather
   than the compact finite stabilizer.

The result also prevents a circular strategy: one cannot demand that the same
unbroken finite symmetry both fixes \(Q\) and fixes a generic unequal-singular-
value channel. Wave 7.60 already showed that such a channel lies on the generic
anisotropic stratum.

## Experimental fingerprint

If a calibrated port identification is proposed, the induced order-three and
order-two operations on its two- and three-dimensional sectors must reproduce
the trace, determinant and order table above. Passing that test identifies the
split representation without fitting \(Q\) directly. A subsequently observed
nonzero \(E\) must then exhibit the predicted symmetry reduction rather than
being incorrectly advertised as an invariant tensor.

## Revised gate

The common-carrier bridge must intertwine the selector action on each endpoint
sector while treating \(E\) covariantly, not invariantly. It must also explain
which source, boundary or dynamical instability selects the observed point in
the cross-module orbit and why its reverse phase is the noncompact one.
