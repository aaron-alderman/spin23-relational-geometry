# Frontier Wave 7.121: Costing the Monster Order-46 Trace Experiment

**Date:** 25 October 2026

**Status:** conservative idealized shot budget derived; hardware state-preparation and controlled-operation costs open

**Evidence:** [trace shot-budget record](../../../../evidence/data/monster-order46-trace-shot-budget-v1.json)

**Certificate:** [Hoeffding budget verifier](../../../../verification/verify/verify_monster_order46_trace_shot_budget.mjs)

## Result

The connected ratios of Wave 7.120 are far from the factorized null, but one
of their raw amplitudes is small. Normalizing all traces by
\(J(i)=984\) gives

| amplitude | normalized value |
|---|---:|
| mixed \(46AB\) | 0.0011080677994477893 |
| mixed \(46CD\) | 0.02360695250163566 |
| order-23 twisted | 0.5442064530406433 |
| \(2B\) insertion | 0.5447154471547554 |
| \(2A\) insertion | 0.5528455284555640 |

Thus the experiment is not denominator-limited. It is numerator-limited by
the \(46AB\) mixed trace.

## Conservative sampling budget

Assume each real normalized trace is estimated by an independent bounded
\([-1,1]\) sample mean, as in an ideal Hadamard-test readout. For relative
error \(r=50\%\), familywise error \(\alpha=0.01\), and a Bonferroni correction
over the five distinct amplitudes, Hoeffding's inequality gives

\[
N_i=\left\lceil
\frac{2\log(2m/\alpha)}{(r|\mu_i|)^2}
\right\rceil,
\qquad m=5.
\]

The resulting preregistered planning counts are

| amplitude | idealized shots |
|---|---:|
| mixed \(46AB\) | 45,008,472 |
| mixed \(46CD\) | 99,163 |
| order-23 twisted | 187 |
| \(2B\) insertion | 187 |
| \(2A\) insertion | 181 |
| **total** | **45,108,190** |

The \(46AB\) numerator consumes 99.779% of this idealized budget. This is a
useful design result: improving the other channels barely changes total cost.

On the simultaneous confidence event, 50% relative error in each factor
multiplies a ratio by at most nine. The Monster upper bounds remain

\[
|R_{46AB}|<0.033642,
\qquad
|R_{46CD}|<0.706180,
\]

so both still reject the factorized unit null.

## What this count does and does not include

The count includes only sampling variance under independent unbiased bounded
measurements. It excludes:

- preparation of the thermal or Euclidean state;
- implementation of order-23 twisted boundary conditions;
- controlled \(2A/2B\) and order-46 insertions;
- readout, drift, leakage and phase-reference systematics;
- the cost of demonstrating that all operations act on one carrier.

It is therefore a lower-level planning certificate, not a hardware resource
estimate. A device with systematic error near \(10^{-3}\) can fail regardless
of shot count.

## Coherent route

The smallest required absolute tolerance is
\(5.540338997\times10^{-4}\). Conventional sampling scales as
\(O(1/\epsilon^2)\); ideal coherent amplitude estimation scales as
\(O(1/\epsilon)\), whose bare inverse-tolerance indicator here is about
1,805 oracle calls. That number is not a gate count. Controlled Gibbs-state
preparation and symmetry-insertion oracles may dominate and may erase the
asymptotic advantage on near-term hardware.

## Experimental decision

The first implementation should prioritize the \(46CD/2A\) branch. It has a
larger mixed amplitude, reuses the physically familiar Ising/Majorana sector,
and needs about \(10^5\) idealized conventional shots at the same conservative
error specification. The \(46AB/2B\) branch should follow as the harder
Jordan/Leech provenance check. Observing only \(46CD\) would establish a
non-factorized order-23/Ising junction, not the full Monster witness stack.

## Corpus links

- [Connected-ratio numerical benchmark](frontier_wave7_120_order46_connected_ratio_numerical_benchmark.md)
- [Order-46 cyclic factorization no-go](frontier_wave7_119_order46_cyclic_factorization_no_go_and_connected_witness.md)
- [XXZ-23 carrier protocol](frontier_wave7_115_xxz23_quantitative_preregistered_protocol.md)
