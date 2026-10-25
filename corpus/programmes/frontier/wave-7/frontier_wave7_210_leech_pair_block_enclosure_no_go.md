# Frontier Wave 7.210: Pair-Block Enclosure No-Go

**Date:** 25 October 2026

**Status:** exact no-go for every disjoint positive one-site/two-site charging split at cutoffs two and three

**Evidence:** [no-go record](../../../../evidence/data/leech-pair-block-enclosure-no-go-v1.json)

**Executable:** [pair-block ceiling analysis](../../../../scripts/analyze-leech-pair-block-enclosure-no-go.mjs)

**Certificate:** [no-go verifier](../../../../verification/verify/verify_leech_pair_block_enclosure_no_go.mjs)

## From numerical failure to a universal bound

After Wave 7.209 excludes diagonal lower operators, the next candidate is a
block-diagonal \(B\) made from twelve disjoint two-charge blocks, with

\[
K=B+R,\qquad B,R\succeq0.
\]

For any pair \(S\), positivity of the other blocks gives

\[
K-E_SB_SE_S^T\succeq0.
\]

The block shorting criterion implies

\[
B_S\preceq (E_S^TK^{-1}E_S)^{-1}=(G_{SS})^{-1}.
\]

Every two-coordinate principal minor in the selected Leech basis is

\[
G_{SS}=\begin{pmatrix}4&g\\g&4\end{pmatrix},
\qquad |g|\le2.
\]

Therefore \(\lambda_{\min}(G_{SS})\ge2\) and
\(\lVert B_S\rVert\le1/2\), independently of the pairing.

At charge cutoff \(N\), every pair charge vector satisfies
\(\lVert q_S\rVert^2\le2N^2\). Across twelve blocks the largest possible
increase of any pair-separable lower endpoint is therefore

\[
{U\over2}\,12\,{1\over2}\,(2N^2)=6UN^2.
\]

## Result

At \(U/u=0.01\):

| cutoff | potential-only odd lower | universal pair gain | universal pair odd ceiling | even Ritz upper | best possible gap-lower ceiling |
|---:|---:|---:|---:|---:|---:|
| 2 | 3.5814157130 | 0.2400000000 | 3.8214157130 | 3.8731239100 | -0.0517081970 |
| 3 | 2.0436639711 | 0.5400000000 | 2.5836639711 | 2.7707832342 | -0.1871192632 |

Even an independently saturated optimal block on every pair cannot make the
lower gap endpoint positive. Thus every disjoint one-site or two-site
positive-block enclosure is ruled out.

## Physical implication

The lower-bound obstruction now has a minimum correlation order. A successful
operator enclosure must use at least one of:

1. irreducible blocks containing three or more charges;
2. overlapping correlation terms whose sum remains below \(K\);
3. a global sum-of-squares decomposition; or
4. Lehmann or shifted-inertia eigenvalue-order certification.

This does not show that the physical gap vanishes. It shows that the proof
cannot erase the Leech correlations down to pairs and still retain enough
energy to certify it.

## First block size not excluded

The executable also enumerates all 2,024 three-coordinate principal minors.
The smallest eigenvalue is

\[
4-2\sqrt2,
\]

so the largest possible three-site shorted-block norm is
\((2+\sqrt2)/4\). Eight independently saturated triple blocks would have a
cutoff-two gain ceiling of \(0.4097056275\), enough to cross the remaining
potential-only deficit in principle. This is not a constructed partition or
a lower-bound certificate. It establishes that block size three is the first
disjoint correlation order not eliminated by the universal ceiling.

## Corpus links

- [Diagonal-enclosure no-go](frontier_wave7_209_leech_diagonal_enclosure_no_go.md)
- [Positive-charging enclosure](frontier_wave7_208_leech_positive_charging_enclosure.md)
- [Spectral-enclosure admission](frontier_wave7_207_leech_spectral_enclosure_admission.md)
