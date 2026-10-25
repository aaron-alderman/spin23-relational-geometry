# Frontier Wave 7.213: Bare Odd Ritz-Seed Failure

**Date:** 25 October 2026

**Status:** exact 24-dimensional seed constructed; admission fails

**Evidence:** [Ritz-seed record](../../../../evidence/data/leech-odd-ritz-seed-v1.json)

**Executable:** [odd seed and residual block](../../../../scripts/analyze-leech-odd-ritz-seed.py)

**Certificate:** [scope verifier](../../../../verification/verify/verify_leech_odd_ritz_seed.mjs)

## Seed selected by the exact lower spectrum

Wave 7.212 proves that 24 odd-sector Ritz directions are required by the
potential-only separator. The canonical first seed places the lowest local
inversion-odd potential eigenmode on one of the 24 sites and the lowest even
mode on every other site. These 24 product vectors are exactly orthonormal.

The full charging operator is applied algebraically to each vector. The
calculation retains 14,656 distinct product configurations, builds the exact
\(24\times24\) Rayleigh matrix and obtains the residual Gram matrix

\[
R^\dagger R=Q^\dagger H^2Q-(Q^\dagger HQ)^2.
\]

A four-site dense control reproduces the Rayleigh matrix within
\(1.6\times10^{-15}\) and the residual Gram matrix within
\(6.3\times10^{-17}\).

## Failure

The exact lower-operator separator is

\[
\beta_{25}^{(-)}=4.3134665205\ldots .
\]

The bare seed's Ritz spectrum instead begins at

\[
\theta_1=4.3491721940\ldots
\]

and ends at \(4.8493632438\ldots\). None of its 24 Ritz values lies below the
separator. Its residual-block norm is \(0.6339192917\), with individual
residuals between \(0.4317\) and \(0.6318\).

Therefore the seed has the right dimension but not the right invariant
subspace. No Lehmann lower bound is computed or implied.

## Implication

The physical odd ground at \(4.20547\ldots\) is lowered substantially by
configurations outside the one-odd potential band. The next implementation
must enrich and optimize the 24 directions, for example by:

1. block DMRG with mutual orthogonality constraints;
2. a block-Davidson correction using the recorded residual configurations;
3. Krylov enrichment by \(Q,HQ,H^2Q,\ldots\), followed by compression; or
4. shifted inertia that bypasses explicit eigenvectors.

This failure is useful: dimension alone is insufficient, and using the bare
potential band would have produced a formally shaped but invalid enclosure.

## Corpus links

- [Temple separator and odd burden](frontier_wave7_212_leech_temple_separator_burden.md)
- [Spectral-enclosure admission](frontier_wave7_207_leech_spectral_enclosure_admission.md)
- [Matrix-free bond-56 carrier](frontier_wave7_205_leech_z2_matrix_free_bond56.md)
