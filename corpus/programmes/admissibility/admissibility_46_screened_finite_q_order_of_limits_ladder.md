# Screened finite-q order-of-limits ladder

**Date:** 24 October 2026  
**Status:** dilute surrogate screening collision passes; production-density gate remains  
**Target:** FPT-004  
**Parent:** [AZ-045](admissibility_45_finite_q_odd_torus_gauge_ladder.md)  
**Evidence:** [Machine-readable register](../../../evidence/data/admissibility-planckian-screened-finite-q-ladder-v1.json)

## Decision

The exact odd-torus surrogate now supports a declared reciprocal Yukawa regularization, multiplying every nonzero Ewald coefficient by (|k|/\sqrt{k^2+\mu^2}) while retaining the removed neutral mode. Three paths were collided on (L=3,5,7,9): unscreened, fixed (\mu=0.5), and size-scaled (\mu=q_{\min}). Their centre/endpoint gauge-separation exponents are 1.902, 1.922 and 1.937. All remain consistent with a zero-intercept (O(q^2)) limit. At L=9 the screened paths differ from the unscreened normalized separation by only 2.33% and 3.38%.

This rejects a screening-induced persistent gauge split on the dilute oracle. It does not prove commutation in the source-complete near-filled t-J model: the interaction contribution is subleading to kinetic carriage in this sector, and spin/exchange channels are absent.

## Remaining gate

The reachable next step is a source-complete equal-time moment calculation. Full fixed-density Hilbert spaces beyond 3x3 grow exponentially, so the admissible implementation is a matrix-free stochastic trace or linked/local-algebra moment estimator, not exact diagonalization. Spectra and rank remain withheld until that estimator reproduces the 3x3 exact moments and carries at least one larger odd cluster.

This is conventional infrared convergence, not anomalous transport or Spin(2,3) evidence.

## Continuation

[AZ-047](admissibility_47_source_complete_finite_q_gauge_ladder.md) restores spin and all audited t, t', J, J' and V families. Its L>=5 sequence again approaches q-min-squared convergence, including both screened paths, leaving fixed density as the isolated computational gate.
