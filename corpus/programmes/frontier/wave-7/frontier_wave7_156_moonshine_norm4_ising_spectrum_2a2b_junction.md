# Frontier Wave 7.156: The Norm-Four Ising Spectrum and Exact \(2A\)-\(2A\)-\(2B\) Junction

**Date:** 25 October 2026

**Status:** exact first-level Ising decomposition and involution junction; laboratory spectral test open

**Evidence:** [Ising-spectrum junction](../../../../evidence/data/moonshine-norm4-ising-spectrum-2a2b-junction-v1.json)

**Certificate:** [executable verifier](../../../../verification/verify/verify_moonshine_norm4_ising_spectrum_2a2b_junction.mjs)

## The axes

For every norm-four Leech vector \(\alpha\), the sourced lattice construction
gives two mutually orthogonal Ising vectors

\[
 \omega_\alpha^\pm={1\over16}\alpha(-1)^2\mathbf1
 \pm {1\over4}(e^\alpha+e^{-\alpha}).
\]

Combining the zero modes from Waves 7.152 and 7.153 gives, on the retained
twisted sector,

\[
 A_\alpha^\pm={Q_\alpha+I/2\over16}
 \pm{(I-2Q_\alpha)P_{[\alpha]}\over32},
 \qquad Q_\alpha=\alpha\alpha^\flat.
\]

Because \(Q_\alpha\) has eigenvalues four and zero, while the square-plus
Pauli \(P_{[\alpha]}\) has equally large \(\pm1\) eigenspaces, the spectrum is
exactly

| Ising weight | multiplicity on \(T_2\) |
|---:|---:|
| \(0\) | 47104 |
| \(1/2\) | 2048 |
| \(1/16\) | 49152 |

These are precisely the three irreducible Ising highest weights. The first
three trace moments are \(4096,704,268\). For the 24 compiled minimal-vector
seeds this supplies 48 marked Ising axes and 144 spectral checks.

## The junction

The Miyamoto involution is positive on weights zero and \(1/2\), and negative
on weight \(1/16\). The spectral projectors therefore give

\[
 \tau_{\omega_\alpha^+}|_T=-P_{[\alpha]},\qquad
 \tau_{\omega_\alpha^-}|_T=+P_{[\alpha]}.
\]

Consequently,

\[
 \tau_{\omega_\alpha^+}\tau_{\omega_\alpha^-}\big|_T=-I,
 \qquad
 \tau_{\omega_\alpha^+}\tau_{\omega_\alpha^-}\big|_U=+I.
\]

The product is exactly the orbifold quantum symmetry \(z=2B\), while each
Miyamoto involution is Monster class \(2A\). Thus every marked norm-four pair
realizes a Klein four group of type

\[
 (1A,2A,2A,2B).
\]

This is the explicit operator junction previously missing between the \(2A\)
Ising lane and the \(2B\)-graded Leech-orbifold lane.

## Experimental use

A candidate carrier must resolve the three eigenvalues with the frozen
multiplicities, obtain zero inserted trace for each \(2A\) involution on the
twisted block, and verify that the product of the paired involutions is the
already measured \(2B\) sector sign. Matching only an Ising spectrum is
insufficient; the common-carrier product is the provenance test.

## Sources and corpus links

- Lam and Shimakura, [*Ising vectors in the VOA \(V_\Lambda^+\) associated with the Leech lattice*](https://arxiv.org/abs/0810.5395), especially Theorem 3.1 and Lemma 5.14.
- [Minimal-vector zero modes](frontier_wave7_152_moonshine_minimal_vector_twisted_weight2_zero_mode.md)
- [Oscillator-bilinear zero modes](frontier_wave7_153_moonshine_oscillator_bilinear_twisted_zero_modes.md)
- [Ising-pair affine-\(E_8\) atlas](frontier_wave7_117_monster_ising_pair_affine_e8_operator_atlas.md)
