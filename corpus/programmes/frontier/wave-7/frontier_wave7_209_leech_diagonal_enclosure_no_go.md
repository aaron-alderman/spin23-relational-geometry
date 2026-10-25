# Frontier Wave 7.209: Diagonal-Enclosure No-Go

**Date:** 25 October 2026

**Status:** exact no-go for all positive diagonal charging splits at cutoffs two and three

**Evidence:** [no-go record](../../../../evidence/data/leech-diagonal-enclosure-no-go-v1.json)

**Executable:** [diagonal ceiling analysis](../../../../scripts/analyze-leech-diagonal-enclosure-no-go.mjs)

**Certificate:** [no-go verifier](../../../../verification/verify/verify_leech_diagonal_enclosure_no_go.mjs)

## Question

Wave 7.208 proposed strengthening the separable lower operator by writing

\[
K=D+R,\qquad D=\operatorname{diag}(d_1,\ldots,d_{24})\succeq0,\quad
R\succeq0.
\]

Could an optimized \(D\), rather than a uniform scalar bound, close the
cutoff-two interval?

## Exact ceiling

Since \(K-D\succeq0\), for each site

\[
K-d_i e_i e_i^T=(K-D)+\sum_{j\ne i}d_j e_j e_j^T\succeq0.
\]

The rank-one downdate criterion therefore gives

\[
d_i\le {1\over e_i^TK^{-1}e_i}={1\over G_{ii}}={1\over4}.
\]

All 24 Leech Gram diagonal entries are four, so
\(\sum_i d_i\le6\). On charge cutoff \(N\),

\[
0\le {U\over2}d_iq_i^2\le {U\over2}d_iN^2I.
\]

Consequently, no diagonal separable construction can raise the Wave 7.208
odd lower endpoint by more than \(UN^2\sum_i d_i/2\).

## Result

At \(U/u=0.01\):

| cutoff | potential-only odd lower | maximum diagonal gain | universal diagonal odd ceiling | even Ritz upper | best possible gap-lower ceiling |
|---:|---:|---:|---:|---:|---:|
| 2 | 3.5814157130 | 0.1200000000 | 3.7014157130 | 3.8731239100 | -0.1717081970 |
| 3 | 2.0436639711 | 0.2700000000 | 2.3136639711 | 2.7707832342 | -0.4571192632 |

Even the unattainably optimistic ceiling stays negative. Thus **every**
positive diagonal split fails to certify the cutoff-two and cutoff-three
gaps. This is a structural no-go, not a failed numerical search.

## Implication

The missing lower energy is intrinsically correlation-sensitive. The next
enclosure must preserve off-diagonal charging information through:

1. certified two-site or larger positive blocks;
2. a correlation-preserving sum-of-squares lower operator; or
3. a validated Lehmann or shifted-inertia calculation.

The result narrows the theory programme while preserving Wave 7.208's
positive cutoff-one certificate. It makes no continuum or laboratory claim.

## Corpus links

- [Positive-charging enclosure](frontier_wave7_208_leech_positive_charging_enclosure.md)
- [Spectral-enclosure admission](frontier_wave7_207_leech_spectral_enclosure_admission.md)
- [Joined-cell MPO architecture](frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
