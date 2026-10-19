# D-02 final report: bounded exhaustion

## Outcome

D-02 now has a complete value-level dispatcher for finite-dimensional analytic or polynomial block-response germs.

The invariant object is the full Schur correction `C=B D^-1 B^T` on the regular locus. At a rank-changing point:

- one finite cluster value gives a unique removable glued response;
- multiple finite cluster values give an approach-arc-groupoid-valued response and must not be collapsed;
- any unbounded admitted approach retains the interior or refuses elimination;
- a subtracted pole value is scheme-relative and must retain its normal coordinate and subtraction prescription.

This contains the original constant-support theorem, the valuation normal cone, unequal-order non-diagonal mixing, higher-contact paths and support-bundle holonomy without conflating them.

## What changed from the first result

The original result said that the limiting block alone cannot select a rank-changing continuation. The continuation programme identifies exactly what can replace it:

1. The leading valuation and normal direction resolve simple bounded-order crossings.
2. The full meromorphic correction removes basis dependence and handles unequal orders.
3. An arc-groupoid retains higher-contact data when no finite decoration suffices.
4. Descent to one response is a theorem to prove—constancy of the finite arc response—not a default quotient.

## Strongest no-go results

For every fixed finite jet depth, a higher-contact family produces paths with identical retained jets and different finite outputs. There is therefore no universal finite metadata packet for arbitrary contact order.

For pole corrections, nonlinear regular reparameterization changes the apparent finite part. A canonical finite part cannot be recovered without adding scheme data.

For smooth flat germs, even all Taylor coefficients can agree while quotient limits differ. Analyticity is an essential boundary, not a convenience.

## Sourcery disposition

The admitted v19 host found one complete proposal-only derivation through:

`rank-changing germ -> approach-arc groupoid -> correction functor -> typed dispatcher -> Triage`.

It found zero candidates for:

- collapse of all arcs to an undecorated single value;
- a scheme-free canonical finite part;
- reconstruction of bulk index from projected response.

## Remaining programmes

The remaining work is deliberately outside this bounded result: smooth full-germ calculus, infinite-dimensional/Fredholm and essential-spectrum extensions, interacting gauge-wall constructions, and nonequilibrium fluctuation relations. Each now has a re-entry condition in the final docket. None is an unresolved case capable of changing the bounded finite-dimensional disposition.
