# Frontier Wave 7.123: A One-Hamiltonian Order-46 Toy That Fails the Monster Curve

**Date:** 25 October 2026

**Status:** executable interacting-carrier control; one-point Monster emulation achieved and rejected out of sample

**Evidence:** [one-Hamiltonian toy record](../../../../evidence/data/monster-order46-one-hamiltonian-toy-v1.json)

**Certificate:** [toy/Monster curve verifier](../../../../verification/verify/verify_monster_order46_one_hamiltonian_toy.mjs)

## Result

The minimal order-46 repair of Wave 7.122 can be implemented on a finite
46-state Hilbert space without conflating it with a Monster realization. Use
basis states \(|a,s\rangle\), where \(a\in\mathbb Z_{23}\) and
\(s\in\{-1,+1\}\), with

\[
g|a,s\rangle=e^{2\pi ia/23}|a,s\rangle,
\qquad
z|a,s\rangle=s|a,s\rangle,
\qquad
h=g^{12}z.
\]

Then \(h^2=g\), \(h^{23}=z\), and \(h\) has order 46. The interacting
Hamiltonian is

\[
E(a,s)=-J\cos\frac{2\pi a}{23}-ms
+\lambda s\cos\frac{2\pi a}{23},
\qquad J=1,\quad m=0.3.
\]

It commutes with \(g,z,h\). At \(\lambda=0\) the sectors factorize and the
connected ratio is exactly one. The \(\lambda\) term is the smallest explicit
symmetry-preserving interaction making the ratio nontrivial.

## 1. One-point emulation is easy

For

\[
Z(k,l;\beta)=\sum_{a,s}e^{-\beta E(a,s)}
e^{2\pi ika/23}s^l,
\]

define

\[
R_{\rm toy}(\beta)=
\frac{Z(1,1;\beta)Z(0,0;\beta)}
{Z(1,0;\beta)Z(0,1;\beta)}.
\]

Choosing

\[
\lambda=0.22630987161262678
\]

fits the Monster \(46CD\) magnitude at the calibration point:

\[
R_{\rm toy}(1)=0.07846436017812844,
\qquad
|R^{\mathbb M}_{46CD}(i)|=0.07846436017812870.
\]

This demonstrates why one remarkable number cannot establish provenance. A
46-dimensional coupled clock can reproduce it with one adjustable parameter.

## 2. The held-out curve rejects the emulator

Declare the toy calibration \(\beta=\operatorname{Im}\tau\) and freeze
\(\lambda\) at the value above. The held-out comparison is

| point | \(|R_{\rm toy}|\) | \(|R^{\mathbb M}_{46CD}|\) | absolute residual |
|---|---:|---:|---:|
| 0.8 | 0.14901076323533485 | 0.28213154785354394 | 0.13312078461820910 |
| 1.2 | 0.24255020878340394 | 0.07799958122736173 | 0.16455062755604222 |

Both residuals exceed 0.1. The verifier computes the toy trace directly and
independently evaluates the Monster eta products. The one-point-fitted toy is
therefore rejected at both held-out points.

The two Monster branches themselves predict

\[
\begin{array}{c|cc}
\operatorname{Im}\tau & |R_{46AB}| & |R_{46CD}|\\\hline
0.8 & 0.006957609289191271 & 0.28213154785354394\\
1.0 & 0.003737945422212601 & 0.07846436017817025\\
1.2 & 0.006521012526215364 & 0.07799958122736173
\end{array}
\]

This three-point curve is a substantially stronger target than the original
single value.

## 3. Experimental use

The toy provides two essential controls for a future XXZ-plus-involution
device:

1. \(\lambda=0\) is the exact factorized null;
2. fitted \(\lambda\ne0\) is an interacting but non-Monster impostor.

A carrier should be calibrated at \(\tau=i\) and tested blindly at both
held-out points. Passing only the first establishes tunability. Following the
Monster curve constrains the entire state-weight distribution and is harder
to fake with a single coupling.

It still does not prove the full Moonshine VOA. A richer generic Hamiltonian
could fit three points. The curve must eventually be combined with TY
associator tomography, the Ising-pair atlas, \(c=24,V_1=0\), and a
nontrivial modular covariance relation.

## Corpus links

- [XXZ-23 physical dictionary and carrier gap](frontier_wave7_122_xxz23_physical_dictionary_and_order46_gap.md)
- [Order-46 numerical benchmark](frontier_wave7_120_order46_connected_ratio_numerical_benchmark.md)
- [Orthogonal Monster witness stack](frontier_wave7_118_monster_orthogonal_physics_witness_stack.md)
