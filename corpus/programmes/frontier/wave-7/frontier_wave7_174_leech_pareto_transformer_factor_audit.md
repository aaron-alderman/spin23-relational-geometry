# Frontier Wave 7.174: Transformer-Factor Audit of the Leech Pareto Bases

**Date:** 25 October 2026

**Status:** exact rational factor comparison; physical layout and loss model open

**Evidence:** [transformer-factor audit](../../../../evidence/data/leech-pareto-transformer-factor-audit-v1.json)

**Executable:** [factor-analysis programme](../../../../scripts/analyze-leech-pareto-transformers.mjs)

**Certificate:** [factor reconstruction and selection verifier](../../../../verification/verify/verify_leech_pareto_transformer_factor_audit.mjs)

## The coordinate proxy was not the circuit cost

Wave 7.173 compared integral coordinate-transform entries. Exact rational
(G=LDL^T) factorization of all four shortlisted Gram matrices changes the
engineering ranking:

| basis | (kappa_2) | nonzero (L) ratios | distinct signed ratios | largest (|L_{ij}|) | capacitor range |
|---|---:|---:|---:|---:|---:|
| precision-first | 740.225 | 271 | 210 | (1/2) | 16 |
| transform-first | 916.479 | 271 | 200 | (1/2) | 16 |
| Gram-first | 953.032 | 252 | 174 | (1/2) | 16 |
| coordinate-small-entry | 954.159 | 264 | 202 | (1/2) | 16 |

Every exact factor has the same maximum transformer ratio (1/2) and the
same positive-capacitor dynamic range 16. The maximum entry of the integral
coordinate map was therefore not a physical turns-ratio proxy.

## Selected ideal circuit coordinate

The Gram-first basis is selected for the next ideal circuit pass. It has 19
fewer nonzero transformer ratios and 36 fewer distinct signed ratios than the
precision-first basis, reductions of 7.01% and 17.14%. Its condition number
is 28.75% larger, but remains below 1000 and permits the conservative
one-percent inverse tolerance (1.039\times10^{-5}).

Its 24 exact positive diagonal capacitances, up to a common scale, are

\[
\begin{split}
D=\operatorname{diag}(&4,4,3,4,11/4,106/33,807/424,342/269,
229/342,811/687,1324/811,371/331,\\
&183/212,4135/5124,3984/4135,137/249,56/137,111/224,
15/37,7/15,8/21,3/8,1/3,1/4).
\end{split}
\]

The executable reconstructs every entry of every factor with exact rational
arithmetic before reporting its component counts.

## Commissioning contract

Implement the selected (L^T) signed mode transformer and the recorded 24
positive capacitors. Measure the complete 24-port capacitance matrix, fit one
positive global scale and propagate the measured covariance through the
matrix inverse. A global claim requires less than one-percent inverse-metric
error globally; a subspace claim must preregister the occupied subspace and
pass there. Failure means the network lacks Leech quadratic provenance at the
claimed scope.

## Boundary

This is an ideal lossless multiport synthesis. Rational-coefficient counts do
not supply a planar layout, finite-bandwidth transformer, parasitic or loss
model. Platform measurements can change the selected Pareto point. Passing
this quadratic test would commission part of Gate A, not the Leech edge or
Monster orbifold.

## Corpus links

- [Hardware-basis Pareto frontier](frontier_wave7_173_leech_hardware_basis_pareto_frontier.md)
- [Integral hardware-basis search](frontier_wave7_172_leech_integral_hardware_basis_search.md)
- [Exact transformer recovery](frontier_wave7_170_leech_transformer_capacitance_recovery.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Structured tolerance and yield](frontier_wave7_175_leech_transformer_structured_tolerance.md)
