# Frontier Wave 7.167: Selective-Exchange Trotter Budget

**Date:** 25 October 2026

**Status:** exact one-excitation commutator and conservative digital budget; many-excitation bound open

**Evidence:** [Trotter budget](../../../../evidence/data/leech-selective-exchange-trotter-budget-v1.json)

**Certificate:** [commutator-spectrum and resource verifier](../../../../verification/verify/verify_leech_selective_exchange_trotter_budget.mjs)

## Exact even--odd commutator

In the one-excitation sector, the onsite term is \(\Delta I\) and commutes
with the hopping. Split the open-chain exchange into disjoint even and odd
bond layers \(A\) and \(B\). For an even length \(M\) divisible by four,

\[
 \lVert[A,B]\rVert
 =2t^2\cos{\pi\over M/2+1}.
\]

The dimensionless coefficient approaches two without growing extensively:

| cells \(M\) | \(\lVert[A,B]\rVert/t^2\) |
|---:|---:|
| 24 | 1.9418836349 |
| 72 | 1.9927949771 |
| 168 | 1.9986341203 |
| 744 | 1.9999290619 |

The verifier obtains the same values from the exact tridiagonal singular-value
problem.

## First-order product-formula budget

The conservative Lie--Trotter bound

\[
 \left\|e^{-iT(A+B)}
 -(e^{-iTA/r}e^{-iTB/r})^r\right\|
 \le {T^2\lVert[A,B]\rVert\over2r}
\]

turns a one-percent operator-error budget into explicit step counts. For 744
cells:

| \(T\Delta\) | \(t/\Delta\) | steps \(r\) | exchange gates | total logical gates including basis I/O |
|---:|---:|---:|---:|---:|
| 1 | 0.30 | 9 | 6,687 | 113,823 |
| 1 | 0.40 | 16 | 11,888 | 119,024 |
| 1 | 0.45 | 21 | 15,603 | 122,739 |
| 5 | 0.30 | 225 | 167,175 | 274,311 |
| 5 | 0.40 | 400 | 297,200 | 404,336 |
| 5 | 0.45 | 507 | 376,701 | 483,837 |
| 10 | 0.30 | 900 | 668,700 | 775,836 |
| 10 | 0.40 | 1,600 | 1,188,800 | 1,295,936 |
| 10 | 0.45 | 2,025 | 1,504,575 | 1,611,711 |

Short-time brickwork is a concrete commissioning route. The longest strong
benchmark exceeds 1.6 million logical gates before platform decomposition,
so it selects a native analog exchange, a free-fermion/matchgate compiler or
a higher-order product formula rather than brute-force first order.

## Falsifiable use

For each held-out hopping value, double the step count and compare the
measured change with the commutator envelope. Failure to decrease with the
predicted \(1/r\) scaling identifies gate or model error rather than Trotter
error. Passing it calibrates the digital simulation; it does not validate the
underlying Leech edge.

## Boundary

This norm is exact only in the one-excitation sector used by the spreading
experiment. At finite excitation density, commutator norms and gate counts
can scale differently. The bound is sufficient, not necessarily tight, and
does not include hardware error or the cost of decomposing logical Givens
rotations.

## Source and corpus links

- Childs, Su, Tran, Wiebe and Zhu, [*A Theory of Trotter Error*](https://arxiv.org/abs/1912.08854).
- [Transition-selective exchange compiler](frontier_wave7_166_leech_transition_selective_exchange_compiler.md)
- [Excitation-hopping stress lane](frontier_wave7_164_leech_pendulum_excitation_hopping_stress_lane.md)
- [Exact free-fermion evolution selected by this budget](frontier_wave7_168_leech_free_fermion_matchgate_evolution.md)
