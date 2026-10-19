# Result 26: the published NA62 curve preserves embedding separation but weakens the rough scale estimate

## Result in ordinary language

The earlier estimate treated the experimental limit as a flat fence at \(10^{-11}\). The real fence is uneven. Near 100 MeV it rises sharply, so the programme's predicted particle can be more strongly coupled than the rough estimate suggested without yet crossing the published curve.

Reading the actual vector curve changes the characteristic scale, but not the main conclusion: the generation-universal and third-family-only embeddings remain separated by more than an order of magnitude in their inferred scale.

## What NA62 actually supplies

NA62 scans mass hypotheses in steps of 1.4 MeV. The source archive for arXiv:2507.17286v2 contains the vector PDF used for Figure 2a. Extracting the red observed-limit path gives the grid points surrounding 100 MeV:

| mass hypothesis | observed 90% CL limit on \(\mathrm{BR}(K^+\to\pi^+X)\) |
|---:|---:|
| 99.4 MeV | \(3.421\times10^{-11}\) |
| 100.8 MeV | \(5.987\times10^{-11}\) |

A linear interpolation to exactly 100 MeV gives

\[
L_{100}=4.521\times10^{-11}.
\]

This interpolation is a convenience for comparing the 100 MeV ALPaca benchmark. It is not an additional experimental hypothesis or a reconstructed likelihood.

## Revised characteristic crossings

Logarithmically interpolating the programme's self-consistent \(\Lambda=4\pi f\) scan against \(L_{100}\) gives:

| embedding | characteristic crossing \(f\) | interpolated \(c\tau\) | proper lifetime |
|---|---:|---:|---:|
| generation-universal | \(6.50\times10^7\) GeV | \(4.01\times10^7\) m | 0.134 s |
| third-family-only | \(7.28\times10^8\) GeV | \(1.25\times10^{10}\) m | 41.6 s |

Both lifetimes are enormously above the paper's order-10-ns transition to the invisible limit, so Figure 2a is the appropriate acceptance regime at these crossings.

The ratio of scales is about 11.2. Because a common production branching ratio roughly scales as \(f^{-2}\), this is the square-root expression of the much larger flavor-production difference between the embeddings.

## What has and has not been established

Established at curve level:

- the earlier \(1.4\times10^8\) GeV and \(1.5\times10^9\) GeV figures were too aggressive because they used a representative \(10^{-11}\) limit;
- the corrected characteristic crossings are approximately \(6.5\times10^7\) and \(7.3\times10^8\) GeV;
- the embedding choice remains experimentally decisive;
- lifetime acceptance is not a concern at the crossing for the 100 MeV points.

Not established:

- a formal exclusion confidence interval for the programme embedding;
- a recast of the underlying CLs likelihood with theory uncertainties;
- coverage of the independent-gauge-coefficient and alternative-flavor nuisance directions;
- sensitivity in the 110--150 MeV gap around the neutral-pion peak or above the 260 MeV endpoint of the invisible analysis.

The 300 MeV example in Result 25 lies outside the invisible-search mass range. It is useful for demonstrating charge-pattern discrimination, but it must be tested with the visible dimuon analysis and its lifetime-dependent acceptance, not with Figure 2a.

## Reproduction

- Extractor: `scripts/extract_na62_observed_limit_from_vector_pdf.py`
- Digitized summary: `programme_na62_100mev_limit_summary.json`
- Crossing certificate: `verification/verify/verify_programme_na62_100mev_crossing.mjs`

The extractor expects the Figure 2a asset from the open arXiv source archive. It reads the vector path, not raster pixels.

## Primary source

- [NA62, *Searches for hidden sectors using \(K^+\to\pi^+X\) decays*](https://arxiv.org/abs/2507.17286), especially sections 2.1 and Figure 2.
