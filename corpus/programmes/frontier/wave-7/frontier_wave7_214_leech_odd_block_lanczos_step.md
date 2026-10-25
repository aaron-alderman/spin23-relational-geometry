# Frontier Wave 7.214: First Odd Block-Lanczos Enrichment

**Date:** 25 October 2026

**Status:** constructive convergence; six Ritz directions and exterior residual remain

**Evidence:** [block-Lanczos record](../../../../evidence/data/leech-odd-block-lanczos-step-v1.json)

**Executable:** [first block step](../../../../scripts/analyze-leech-odd-block-lanczos-step.py)

**Certificate:** [scope verifier](../../../../verification/verify/verify_leech_odd_block_lanczos_step.mjs)

## Construction

Start from Wave 7.213's 24 orthonormal product vectors \(Q_0\). Form their
full residual block

\[
R_0=HQ_0-Q_0(Q_0^\dagger HQ_0),
\]

whose support contains 14,632 product configurations. Since
\(R_0^\dagger R_0\) is positive definite, orthonormalize it to \(Q_1\) and
construct the \(48\times48\) block-Lanczos Rayleigh matrix on
\(\operatorname{span}(Q_0,Q_1)\).

The calculation evaluates 15,058,434 charging transitions, of which
1,490,986 return to the residual support. A four-site dense reconstruction
agrees with the algebraic projected matrix within \(6.3\times10^{-15}\) and
with its spectrum within \(8.9\times10^{-15}\).

## Result

The lowest odd Ritz value falls from the bare seed's

\[
4.3491721940
\]

to

\[
4.2268329143.
\]

This is a \(0.1223392796\) improvement and approaches the independently
optimized DMRG upper value \(4.2054738255\).

More importantly, 18 Ritz values now lie below the exact separator

\[
\beta_{25}^{(-)}=4.3134665205.
\]

The bare seed had none. One Hamiltonian-generated residual layer therefore
captures most of the required low odd cluster.

## Refusal

Admission still fails:

- the 24th Ritz value is \(4.6146634585>\beta_{25}^{(-)}\);
- only 18 of the required 24 values lie below the separator;
- the exterior residual of the enriched 48-dimensional subspace has not yet
  been computed;
- no Lehmann bounds follow from the projected spectrum alone.

The next step is a second block-Lanczos/Davidson layer targeted at the six
missing directions, followed by the exterior residual matrix and a validated
cluster-bound solve. The strong first-step improvement is evidence of
convergence, not a certified odd lower endpoint.

## Corpus links

- [Bare odd Ritz-seed failure](frontier_wave7_213_leech_odd_ritz_seed_failure.md)
- [Temple separator and odd burden](frontier_wave7_212_leech_temple_separator_burden.md)
- [Spectral-enclosure admission](frontier_wave7_207_leech_spectral_enclosure_admission.md)
