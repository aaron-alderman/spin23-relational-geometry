# Frontier Wave 7.120: A Numerical Monster Interaction Target at Tau = i

**Date:** 25 October 2026

**Status:** executable genus-one numerical prediction in a fixed modular convention; laboratory trace dictionary open

**Evidence:** [connected-ratio benchmark](../../../../evidence/data/monster-order46-connected-ratio-benchmark-v1.json)

**Certificate:** [eta-product and error-envelope verifier](../../../../verification/verify/verify_monster_order46_connected_ratio_benchmark.mjs)

## Prediction

The order-46 connected detector of Wave 7.119 can be evaluated without an
unknown function. In the displayed right-action generalized-moonshine
convention,

\[
Z(h^2,h^{23};\tau)=
T_h\!\left(\frac{\tau+11}{2\tau+23}\right)
\]

after choosing the canonical anomaly trivialization and eta-product branch.
At \(\tau=i\), the two Monster branches robustly predict the magnitudes

\[
\boxed{|R_{46AB}|=0.00373794542221053},
\qquad
\boxed{|R_{46CD}|=0.0784643601781287},
\]

where the factorized \(C_2\otimes C_{23}\) null is exactly \(R=1\).

The branches are not a fitted model. The certificate computes them from

\[
A(\tau)=\frac{\eta(\tau)\eta(23\tau)}
{\eta(2\tau)\eta(46\tau)},
\]

\[
T_{46AB}=1+A,
\qquad
T_{46CD}=1+A+\frac2A,
\qquad
T_{23}=\frac{(A+1)(A^2+4)}{A^2},
\]

together with the standard \(2A\), \(2B\), and \(J\) functions. It evaluates
the Dedekind eta function by a direct complex logarithmic Euler product,
repeats the calculation at two truncation tolerances, and freezes the values
to absolute tolerance \(10^{-9}\).

## Intermediate targets

At the same point the canonical values are

| observable | value |
|---|---:|
| transported \(T_{46AB}\) | 1.0903387146566248 |
| transported \(T_{46CD}\) | 23.22924126160949 |
| \(T_{23}(-1/i)\) | 535.499149791993 |
| \(T_{2B}(i)\) | 536.0000000002793 |
| \(T_{2A}(i)\) | 544.0000000002750 |
| \(J(i)\) | 984 |

These provide diagnostic checkpoints: a failed ratio can be localized to the
order-46 transport, order-23 twisted sector, involution insertion, or ambient
partition function.

## Error budget

Suppose every trace magnitude entering the ratio has worst-case relative
error at most \(r\), and neither denominator crosses zero. Then the inferred
ratio lies within the multiplicative interval

\[
\left[\frac{(1-r)^2}{(1+r)^2},
      \frac{(1+r)^2}{(1-r)^2}\right]
\]

around the exact magnitude. Even at the deliberately loose \(r=50\%\), the upper
bounds are

\[
R_{46AB}<0.033642,
\qquad
R_{46CD}<0.706180,
\]

so both still reject the factorized null \(R=1\). The \(46CD\) branch is the
limiting one. This does not mean a real experiment automatically attains 50%
relative trace accuracy; it shows that the effect-size target is not small.

## Experimental meaning

The four required records are thermal or Euclidean twisted traces. A platform
must therefore implement:

1. untwisted and order-23-twisted boundary conditions;
2. switchable identity and \(2A\) or \(2B\) insertions;
3. a common complex phase reference across all four measurements;
4. a temperature/modular calibration representing \(\tau=i\);
5. a deliberately factorized \(C_2\otimes C_{23}\) control;
6. blind comparison with the two frozen ratios.

Measuring only magnitudes can reject factorization at this point. Compatible
generalized-moonshine phases have not been evaluated by the existing
order-46 normalization audit, so the displayed eta-product representatives
must not be mistaken for a convention-independent phase prediction. Establishing
the full generalized-moonshine function still requires phase-sensitive
measurements across several \(\tau\) values and modular covariance checks.

## Claim boundary

This is the first concrete, branch-sensitive Monster number in the present
laboratory programme. It is a prediction of the Monster CFT in a declared
normalization, not yet a prediction for an existing material. Mapping the
four CFT traces to one Hamiltonian's preparation and readout operations is the
remaining P3 carrier problem.

## Sources and corpus links

- Ford, McKay and Norton, [*More on replicable functions*](https://doi.org/10.1080/00927879408825072).
- Tuite, [*Generalised Moonshine and Abelian Orbifold Constructions*](https://arxiv.org/abs/hep-th/9412036).
- [Order-46 observable ladder](../../moonshine-program-lattice/order-46-observable-ladder.md)
- [Order-46 factorization no-go](frontier_wave7_119_order46_cyclic_factorization_no_go_and_connected_witness.md)
