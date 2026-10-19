# Result 27: NA62 dimuon acceptance turns the scale-free pattern into separated curve crossings

## Result in ordinary language

At 300 MeV the three ALP patterns are produced at almost the same rate, but they travel very different distances before decaying. NA62's dimuon search is therefore not merely counting how many are made; its acceptance acts like a ruler that distinguishes the charge patterns through their lifetimes.

At the reference scale \(f=10^6\) GeV all three benchmark points lie above the published curve-level limit. As \(f\) increases, production falls and lifetime grows. Their crossings of the experimental curve occur at three separated scales.

## Experimental input

The vector path of NA62 Figure 6b gives a prompt observed 90% CL limit near 300 MeV. The surrounding plotted points are

| mass | prompt limit on \(\mathrm{BR}(K^+\to\pi^+X)\mathrm{BR}(X\to\mu^+\mu^-)\) |
|---:|---:|
| 299.5475 MeV | \(1.1760\times10^{-10}\) |
| 300.3570 MeV | \(1.6058\times10^{-10}\) |

Logarithmic interpolation gives \(L_0(300\,\mathrm{MeV})=1.3997\times10^{-10}\).

NA62 reports the lifetime dependence

\[
A(m,\tau)=A(m,0)\left(1-e^{-\tau_0/\tau}\right),
\qquad \tau_0=0.07\ \mathrm{ns}.
\]

The corresponding branching-product limit is

\[
L(m,\tau)=\frac{L_0(m)}{1-e^{-\tau_0/\tau}}.
\]

## Fixed-10-TeV recast

For the Result 25 models, coefficients are matched at a fixed 10 TeV while the common scale \(f\) is varied. Production scales as \(f^{-2}\), and proper lifetime as \(f^2\).

| pattern | \(\tau\) at \(f=10^6\) GeV | curve crossing in \(f\) | \(\tau\) at crossing |
|---|---:|---:|---:|
| top-right only | 6.44 ns | \(1.076\times10^6\) GeV | 7.44 ns |
| incidence universal | 0.760 ns | \(1.804\times10^6\) GeV | 2.47 ns |
| equal axial universal | 0.0573 ns | \(3.389\times10^6\) GeV | 0.658 ns |

The production rates at the reference point differ by less than ten percent. The factor-three spread in crossing scales is therefore chiefly a lifetime effect caused by the different light-lepton charges.

## Interpretation

This supports the operational content of the scale-free quantity

\[
\Xi_K=\mathrm{BR}(K^+\to\pi^+a)c\tau_a.
\]

The detector does not measure \(\Xi_K\) directly. Instead, its lifetime-dependent acceptance converts the same correlation into different exclusion-curve crossings.

This is more concrete than merely proposing a ratio, but it is not yet a model discovery claim. The recast uses the published observed curve and analytic acceptance approximation, not the collaboration's likelihood. It also fixes the matching scale and sets independent UV gauge operators to zero.

## Paper boundary

There is now a defensible phenomenological calculation to perform:

1. scan mass and \(f\) for the incidence and comparator rays with full running;
2. combine invisible, dimuon and diphoton NA62 channels with their lifetime acceptances;
3. add rare-B production and displaced-decay information;
4. profile independent gauge coefficients and flavor embeddings;
5. ask whether the incidence ratio \((-10,-6,-2)\) remains statistically identifiable.

If it does, the result could support a focused phenomenology paper about discriminating UV ALP charge rays. If it does not, that is a clean no-go for this experimental realization of the programme's source pattern.

## Reproduction

- Data: `programme_na62_300mev_dimuon_recast_summary.json`
- Certificate: `verification/verify/verify_programme_na62_300mev_dimuon_recast.mjs`
- Primary source: [NA62 hidden-sector searches](https://arxiv.org/abs/2507.17286), equations (3.1)--(3.2) and Figure 6.
