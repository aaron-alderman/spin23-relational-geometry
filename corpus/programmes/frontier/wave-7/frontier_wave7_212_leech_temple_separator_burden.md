# Frontier Wave 7.212: Temple Separator and Odd-Subspace Burden

**Date:** 25 October 2026

**Status:** even numerical enclosure candidate; odd 24-vector requirement exact

**Evidence:** [separator and residual record](../../../../evidence/data/leech-temple-separator-burden-v1.json)

**Executables:** [residual contraction](../../../../scripts/measure-leech-z2-checkpoint-residual.py), [separator analysis](../../../../scripts/analyze-leech-temple-separator-burden.mjs)

**Certificate:** [scope verifier](../../../../verification/verify/verify_leech_temple_separator_burden.mjs)

## Exact lower spectrum

At cutoff two the potential-only local eigenvalues are

\[
v_k=1-\cos(k\pi/6),\qquad k=1,\ldots,5,
\]

with alternating inversion parity. Since the charging operator is positive,
the min--max principle transports every ordered potential eigenvalue into a
lower bound for the corresponding full-Hamiltonian eigenvalue.

In the even sector, the first excitation is two lowest local odd factors:

\[
\beta_2^{(+)}=22v_1+2v_2=3.9474411167\ldots .
\]

This lies above the bond-56 even Rayleigh value
\(3.87312390996\), so the one-vector Temple premise is satisfied.

In the odd sector the lowest potential band is

\[
23v_1+v_2=3.5814157130\ldots
\]

with multiplicity 24. The next ordered level is

\[
\beta_{25}^{(-)}=21v_1+3v_2=4.3134665203\ldots ,
\]

above the odd Ritz value \(4.2054738255\). Thus this lower operator does not
offer a one-vector odd separator, but it proves that a 24-vector Ritz block is
sufficient for a Lehmann/block-Temple route. The number 24 is derived from
the finite spectrum, not guessed from the Leech rank.

## Full-state residual

The final cutoff-two bond-56 even checkpoint is identified by SHA-256
f62f9a90756a5a96a90050335ce499d39560dea7112636abc40b7d1a4e0dee54.
Direct uncompressed contraction gives

\[
\rho=3.8731239099585166,\qquad
\lVert(H-\rho)\psi\rVert=0.0086196568444.
\]

Compressed contractions at tolerances \(10^{-8},10^{-10},10^{-12}\) vary
in residual by less than \(2\times10^{-12}\). Four-site even and odd controls
reproduce dense energy, \(H^2\), and variance within
\(1.4\times10^{-15}\).

Using deliberately outward-padded decimal inputs in the Temple expression
gives the numerical candidate

\[
E_+^{(N=2)}\in
[3.872124\ldots,\;3.87312391],
\]

of width below \(1.1\times10^{-3}\).

## Boundary

The spectral separator and the 24-state count are exact. The tensor
contraction is direct and passes dense controls, but it uses ordinary
floating-point arithmetic rather than interval arithmetic. Therefore this
packet records a numerically validated even enclosure candidate, not a
rigorous machine interval.

The decisive remaining computation is now specific: construct 24 mutually
orthonormal odd-sector MPS Ritz vectors and their residual block, or replace
that calculation with a validated shifted-inertia count. Once an odd lower
endpoint exceeds the even Ritz upper endpoint, cutoff two has a positive
certified gap.

## Corpus links

- [Spectral-enclosure admission](frontier_wave7_207_leech_spectral_enclosure_admission.md)
- [Positive cutoff-one enclosure](frontier_wave7_208_leech_positive_charging_enclosure.md)
- [Triple-block reconnaissance](frontier_wave7_211_leech_triple_block_reconnaissance.md)
