# Executable bridge laboratory

## Purpose

The diagram becomes scientifically useful only when its arrows can fail. The
laboratory therefore pairs positive commuting witnesses with negative or
conditional witnesses. Run it with:

```powershell
node verification/verify/verify_common_operator_bridges.mjs
```

## Positive witnesses

| Witness | Paths compared | Retained record |
|---|---|---|
| heat/Brownian | analytic heat-kernel variance vs Brownian variance law | second moment |
| OU/Gibbs | Ornstein--Uhlenbeck stationary variance vs quadratic Gibbs variance | stationary covariance |
| Tweedie | Gaussian-mixture conditional mean vs finite-difference noisy score | posterior mean |
| Gibbs/softmax | normalized `exp(-E/T)` vs softmax of `-E/T` | probability vector |
| oscillator/heavy-ball | semi-implicit damped update vs momentum recurrence | discrete trajectory |
| state-space/convolution | recurrent linear output vs impulse-response sum | input--output record |
| RoPE | rotated query/key inner product vs relative rotation | relation score |
| linear attention | batch kernel sum vs recurrent sufficient statistics | causal outputs |

These tests establish only the named record. They do not identify hidden
states, clocks or physical carriers.

## Deliberate noncommutation

The laboratory also checks three refusals:

1. a fixed convolution cannot reproduce an input-selective scalar recurrence
   for two sequences with different gating histories;
2. exact-polar and finite Newton--Schulz maps separate near a small singular
   value, so “Muon equals polar normalization” is not exact at finite depth;
3. a nonzero rotational drift can preserve a Gaussian stationary density while
   carrying nonzero probability current, so Gibbs stationarity does not imply
   detailed balance.

## Admission rule

A bridge graduates from analogy only when the executable record and the
documented edge type agree. If only an endpoint observable agrees, the edge
remains observable equivalence. If a parameter limit is required, it remains a
scaling limit. If the code succeeds only after erasing units, clocks or
boundary data, it has demonstrated the need for a quotient scar, not an exact
physical identity.
