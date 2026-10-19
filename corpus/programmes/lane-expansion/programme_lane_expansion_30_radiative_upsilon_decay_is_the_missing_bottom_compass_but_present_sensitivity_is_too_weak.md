# Result 30: radiative Upsilon decay is the missing bottom compass but present sensitivity is too weak

## Result in ordinary language

Kaon and B flavor-changing production mostly tell us how strongly the ALP talks to the top sector. Its low-mass lifetime tells us how strongly it talks to charged leptons. Neither is a clean ruler for the bottom coefficient.

Radiative \(\Upsilon\) decay supplies that ruler because the \(\Upsilon\) is a bottom--antibottom bound state.

## ALPaca comparison

At \(m_a=100\) MeV, \(f=10^6\) GeV and a 10 TeV matching scale:

| UV pattern | \(\mathrm{BR}(\Upsilon(1S)\to\gamma a)\) |
|---|---:|
| top-right only \((-10,0,0)\) | \(5.91\times10^{-12}\) |
| incidence \((-10,-6,-2)\) | \(4.89\times10^{-10}\) |
| incidence multiplicity \((-10,-6,-4)\) | \(4.89\times10^{-10}\) |
| equal axial \((-10,-10,-10)\) | \(1.24\times10^{-9}\) |

The incidence prediction is 82.8 times the top-only prediction, while the equal-axial prediction is 2.54 times incidence. The two incidence normalizations coincide here because they differ in the lepton rather than bottom coefficient. Combining \(\Upsilon\) production with lifetime would therefore separate exactly the coordinates that NA62 alone confounds.

## Present experimental reach

The Belle invisible bound represented in ALPaca at 100 MeV is approximately

\[
\mathrm{BR}(\Upsilon(1S)\to\gamma+\mathrm{invisible})
<1.07\times10^{-6}.
\]

That is about 2190 times above the incidence prediction at \(f=10^6\) GeV. Interpreted with simple \(f^{-2}\) scaling, it reaches only \(f\sim2.1\times10^4\) GeV for the incidence ray, far below the \(10^6\)--\(10^8\) GeV scales probed by the kaon analysis.

So \(\Upsilon\) decay is the correct missing compass, but current data cannot use it at the parameter scales where NA62 becomes decisive.

## Programme consequence

Current experiments can test a top--lepton slice of the incidence hypothesis. They cannot reconstruct the complete top--bottom--lepton ray without either:

- a much stronger bottomonium search;
- another bottom-sensitive observable with comparable scale reach;
- or an algebraic derivation fixing the bottom coordinate before fitting.

This sharply limits the near-term paper claim. A current-data paper should be framed as discrimination of restricted UV rays, not measurement of the complete incidence vector.

## Reproduction and sources

- Driver: `scripts/run_programme_alpaca_bottom_compass.py`
- Compact results: `programme_alp_identifiability_summary.json`
- Certificate: `verification/verify/verify_programme_alp_identifiability_summary.mjs`
- [Belle radiative \(\Upsilon(1S)\) invisible search](https://arxiv.org/abs/1809.05222)
- [BaBar radiative \(\Upsilon(3S)\) invisible search](https://arxiv.org/abs/0808.0017)
