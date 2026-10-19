# Result 25: production times lifetime discriminates the incidence ALP pattern

## Result in ordinary language

Imagine three whistles blown equally hard. Their loudness is almost the same, but one rings for much longer than another. Loudness alone cannot tell them apart; loudness multiplied by ringing time can.

The ALP realization behaves similarly. When three UV charge patterns are normalized to the same top coupling, their rare-kaon and rare-B production rates are nearly identical. Their decay lengths are not. Combining production with lifetime removes the unknown overall coupling scale and tests the *shape* of the fermion-charge pattern.

This is the first continuation in this lane that separates the incidence pattern from a standard ALP benchmark using a normalization-free observable. It remains conditional on the declared UV embedding, matching scale and absence of independent gauge operators.

## Compared UV patterns

All three models are defined at 10 TeV, set independent \(c_G,c_W,c_B\) to zero and have the same physical top difference \(c_{tt}=-10\):

| model | \((c_{tt},c_{bb},c_{\tau\tau})_{10\,\mathrm{TeV}}\) | meaning |
|---|---:|---|
| incidence, generation-universal | \((-10,-6,-2)\) | programme charge pattern |
| equal axial, generation-universal | \((-10,-10,-10)\) | ALPaca BC10 pattern rescaled to the same top coupling |
| top-right only | \((-10,0,0)\) | declared minimal top-driven comparator |

These are run and matched with ALPaca 1.2.0 using its full beta functions.

## What running does

At 100 GeV:

| model | \(c_{tt}\) | \(c_{bb}\) | \(c_{\tau\tau}\) | \(|c^L_{bs}|\) |
|---|---:|---:|---:|---:|
| incidence | -8.0215 | -6.7968 | -3.1812 | 0.008202 |
| equal axial | -7.9765 | -10.7450 | -11.1754 | 0.008182 |
| top-right only | -8.1647 | -0.9612 | -1.1977 | 0.008264 |

The flavor-changing \(b\to s\) coupling is almost the same in all three cases because it is chiefly seeded by the common top coupling. The diagonal light-lepton pattern remains very different.

## Production alone is nearly blind

For \(m_a=100\) MeV and \(f_a=10^6\) GeV:

| model | \(\mathrm{BR}(K^+\to\pi^+a)\) | \(\mathrm{BR}(B^+\to K^+a)\) | \(c\tau\) |
|---|---:|---:|---:|
| incidence | \(3.294\times10^{-8}\) | \(9.744\times10^{-6}\) | 20.65 km |
| equal axial | \(3.233\times10^{-8}\) | \(9.707\times10^{-6}\) | 1.524 km |
| top-right only | \(3.512\times10^{-8}\) | \(9.860\times10^{-6}\) | 156.2 km |

The full spread is only 8.6% for kaon production and 1.6% for B production, while the lifetimes span two orders of magnitude.

## A normalization-free discriminator

At fixed mass and matching scale,

\[
  \mathrm{BR}(M\to M'a)\propto f_a^{-2},\qquad
  c\tau_a\propto f_a^{2}.
\]

Therefore

\[
  \Xi_M(m_a)=\mathrm{BR}(M\to M'a)\,c\tau_a
\]

is independent of the common unknown scale \(f_a\) at this order. It compares flavor production, controlled mainly by the top-seeded off-diagonal coupling, with decay, controlled by the light charged-fermion and photon couplings.

For kaon production:

| mass | \(\Xi_K^{\rm incidence}/\Xi_K^{\rm equal}\) | \(\Xi_K^{\rm incidence}/\Xi_K^{\rm top}\) |
|---:|---:|---:|
| 100 MeV | 13.81 | 0.1240 |
| 300 MeV | 13.58 | 0.1113 |

The persistence across the electron- and muon-dominated decay regimes shows that this is not a single-threshold numerical accident.

## Honest boundary

This does **not** establish the incidence charges. It establishes a way to distinguish them from two nearby, conventional ALP hypotheses if an ALP is produced and its lifetime is constrained.

The discriminator ceases to be one-parameter if independent UV gauge coefficients, a different generation embedding or additional light states are allowed. A paper-worthy result would therefore require a likelihood analysis showing that production plus displaced/invisible-decay information actually separates the charge patterns after those nuisance directions are profiled.

## Reproduction

- Full driver: `scripts/run_programme_incidence_alpaca_comparators.py`
- Compact data: `programme_incidence_alpaca_comparator_summary.json`
- Certificate: `verification/verify/verify_programme_incidence_alpaca_comparators.mjs`

Run:

```powershell
.\.venv-alpaca\Scripts\python.exe scripts\run_programme_incidence_alpaca_comparators.py
node scripts\verify_programme_incidence_alpaca_comparators.mjs
```

The driver contains a launch-time Windows compatibility shim for flavio's request for the Unix-only `fork` multiprocessing context. It does not modify the installed package.
