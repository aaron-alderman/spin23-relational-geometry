# Frontier Wave 7.105: Random-Weyl Implementation of the Unread Channel

**Date:** 25 October 2026
**Status:** exact random-unitary realization of the maximal CP channel
**Certificate:** [random-Weyl unread-channel verifier](../../../../verification/verify/verify_random_weyl_unread_channel.mjs)

## Result

The maximal completely positive unread channel

\[
\Phi_{1/8}
=D_6+\frac18(\operatorname{Id}-D_2)
\otimes(\operatorname{Id}-D_3)
\]

is a correlated random-unitary Weyl channel.  It can be implemented using
only local qubit and qutrit Weyl conjugations plus shared classical
randomness.

Let

\[
g\in\mathbb F_2^2,
\qquad
h\in\mathbb F_3^2
\]

label the four qubit and nine qutrit Weyl operations.  Apply

\[
\rho\longmapsto
(W_g\otimes W_h)\rho(W_g\otimes W_h)^\dagger
\]

with probability

\[
\boxed{
p_\eta(g,h)
=\frac1{36}
\left[1+\eta(4\delta_{g0}-1)(9\delta_{h0}-1)\right].
}
\]

At η=1/8, the four probability classes are

| qubit label | qutrit label | entries | probability per entry | total mass |
|---|---|---:|---:|---:|
| identity | identity | 1 | (1/9) | (1/9) |
| identity | nonidentity | 8 | (5/288) | (5/36) |
| nonidentity | identity | 3 | (0) | (0) |
| nonidentity | nonidentity | 24 | (1/32) | (3/4) |

All probabilities are nonnegative and sum to one.

## 1. Channel spectrum

Conjugation by Weyl operations diagonalizes on the Weyl operator basis.  The
finite Fourier transform of (p_\eta) gives the eigenvalues

\[
\begin{array}{c|c}
\text{operator sector}&\text{eigenvalue}\\
\hline
(\mathbf1,\mathbf1)&1\\
(\mathbf3,\mathbf1)&0\\
(\mathbf1,\mathbf8)&0\\
(\mathbf3,\mathbf8)&\eta.
\end{array}
\]

Thus the random circuit erases every local traceless observable and transmits
every connected qutrit--qubit Weyl coordinate with the same gain (1/8).

This is exactly the channel derived abstractly in Wave 7.90.

## 2. Why the complete-positivity bound reappears

Nonnegativity of the four probability classes requires

\[
\begin{aligned}
1+24\eta&\ge0,\\
1-3\eta&\ge0,\\
1-8\eta&\ge0,\\
1+\eta&\ge0.
\end{aligned}
\]

Their intersection is

\[
\boxed{-\frac1{24}\le\eta\le\frac18.}
\]

This exactly reproduces the Choi interval.  The upper endpoint is reached
when the three events with a nontrivial qubit Weyl and identity qutrit Weyl
drop to zero probability.

The CP boundary is therefore visible as the boundary of an ordinary classical
probability simplex, not merely as a zero eigenvalue in a Choi matrix.

## 3. Experimental implementation

For each shot:

1. draw one of the 36 label pairs ((g,h)) from the table above;
2. apply the corresponding local Weyl gates;
3. discard the random label for an operationally unread output, or retain it
   in a sealed calibration log;
4. measure local and connected operator coordinates on separate validation
   batches.

The predicted slopes are

\[
c_{i0}^{\rm out}=0,
\qquad
c_{0a}^{\rm out}=0,
\qquad
c_{ia}^{\rm out}=\frac18c_{ia}^{\rm in}.
\]

Because the implementation is random unitary, trace preservation, unitality
and complete positivity hold shot by shot or by convexity.  No engineered
dissipator is required.

## 4. Calibration and falsifiers

The sealed random-label log permits three independent audits:

- **sampler audit:** observed class frequencies match the declared
  probabilities;
- **channel audit:** the four operator-sector eigenvalues are (1,0,0,1/8);
- **blindness audit:** analysis performed without the label log sees erased
  local marginals but retained joint correlations.

The model fails if connected coordinates acquire direction-dependent gains,
local traceless coordinates survive systematically, or the output depends on
the Weyl basis after accounting for endpoint-unitary covariance.

## 5. Relation to the cubed detector

Both required operations now use the same native gate alphabet:

- the unread channel samples local Weyl conjugations;
- the record detector composes ordered Weyl operations into a commutator and
  cubes the resulting central phase.

This makes a unified finite experiment possible.  The same calibrated qubit,
qutrit and ancilla controls can test channel support, phase completeness,
binary quotienting and the final record POVM.

## Verdict

The unread link is no longer merely an admissible Choi matrix.  It is an
explicit correlated random-Weyl circuit whose probability simplex reproduces
the exact complete-positivity interval.  Together with the cubed commutator,
the full finite mechanism now has a common gate-level realization.  The
remaining open bridge is specifically from that finite response apparatus to
the canonically normalized photon pole.

## Corpus anchors

- [unread-correlation channel](frontier_wave7_90_chain_theory_unread_correlation_channel.md)
- [gain and covariance gate](frontier_wave7_91_chain_theory_gain_and_covariance_gate.md)
- [cubed-commutator detector](frontier_wave7_103_cubed_commutator_binary_detector.md)
- [record-POVM benchmark](frontier_wave7_102_chain_theory_record_povm_benchmark.md)
