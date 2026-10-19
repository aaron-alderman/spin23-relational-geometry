# Lane Expansion 24: Full ALP Running Makes the Embedding Choice Experimentally Decisive

**Date:** 17 October 2026  
**Lanes:** L2, RG/OPE closure; L6, flavor and decay observables  
**Claim status:** reproducible numerical benchmark using ALPaca 1.2.0; not yet an experimental exclusion analysis  
**Numerical driver:** [run_programme_incidence_alpaca_benchmark.py](../../../verification/run/run_programme_incidence_alpaca_benchmark.py)  
**Compact data:** [programme_incidence_alpaca_summary.json](../../registers/programme/programme_incidence_alpaca_summary.json)  
**Certificate:** [verify_programme_incidence_alpaca_summary.mjs](../../../verification/verify/verify_programme_incidence_alpaca_summary.mjs)

## Result

The programme's incidence current can now be run through a maintained implementation of the complete ALP effective theory rather than a hand-built proxy. This confirms the qualitative findings of Results 21–23 and reveals a large quantitative fork between two ultraviolet embeddings.

Starting from

\[
(c_Q,c_u,c_d,c_L,c_e)=(5,-5,-1,1,-1)
\]

at 10 TeV, with no independent gauge-topological coefficients, full numerical running to 100 GeV gives:

| embedding | \(c_{tt}\) | \(c_{bb}\) | \(c_{\tau\tau}\) | \(|k_{bs}|\) | \(|k_{bd}|\) | \(|k_{sd}|\) |
|---|---:|---:|---:|---:|---:|---:|
| third family only | -8.141 | -6.925 | -3.194 | 0.1986 | 0.04355 | 0.001805 |
| three-generation universal | -8.022 | -6.797 | -3.181 | 0.008202 | 0.001798 | 0.0000751 |

The third-family-only \(b\to s\) coupling is about 24 times the universal one. Rates controlled by its square can differ by roughly three orders of magnitude.

Thus “apply the incidence weights to the Standard Model” is not yet a complete benchmark definition. One must say whether those weights apply to one family or all three.

## 1. What was actually computed

ALPaca 1.2.0 was installed in a project-local virtual environment and initialized in its derivative basis. Two charge matrices were tested:

\[
\text{third-family only}:\quad
c_F=x_F\operatorname{diag}(0,0,1),
\]

\[
\text{generation universal}:\quad
c_F=x_F\mathbbm1_3.
\]

The package then performed:

- full numerical running from 10 TeV to the electroweak scale;
- rotation to the fermion mass basis;
- weak-scale matching;
- running to 5 GeV;
- meson-production and ALP-decay calculations.

The package does not include a right-handed neutrino. The charged-fermion and meson results are therefore a Standard-Model ALP test of the first three incidence entries, not a calculation of the Dirac-neutrino component.

## 2. Why the two embeddings differ so much

For universal charges, a common identity matrix is invisible to CKM rotation. Flavor change arises only after top-Yukawa running creates a modest third-family splitting. The numerical result

\[
|k_{bs}|=0.00820
\]

is close to the leading-log estimate \(0.0104\) in Result 23.

For third-family-only charges, the ultraviolet matrix is already \(\operatorname{diag}(0,0,1)\). Rotating it to the down basis immediately produces a term proportional to \(V_{3i}^*V_{3j}\) with coefficient of order five. Running changes it, but does not create it from zero. This yields

\[
|k_{bs}|=0.1986.
\]

The distinction is structural: radiatively generated flavor versus tree-level flavor after basis rotation.

## 3. A clean 100 MeV observable point

At \(m_a=100\) MeV, below hadronic complications and with a long lifetime, the fixed 10 TeV benchmark at \(f=10^6\) GeV gives:

| embedding | \(\mathcal B(B^+\to K^+a)\) | \(\mathcal B(K^+\to\pi^+a)\) | \(c\tau_a\) |
|---|---:|---:|---:|
| third family only | \(7.68\times10^{-3}\) | \(2.74\times10^{-5}\) | 157 km |
| generation universal | \(9.74\times10^{-6}\) | \(3.29\times10^{-8}\) | 20.7 km |

These values are intentionally not presented as viable fits. They show that \(f=10^6\) GeV is far inside the range probed by rare-meson searches for these integer-normalized coefficients.

The ALP is effectively invisible at this mass and scale: its dominant 100 MeV decay is to an electron pair, but the predicted decay length is much larger than a detector.

## 4. Self-consistent high-scale scan

Holding the matching scale at 10 TeV while increasing \(f\) is useful for simple \(1/f^2\) scaling, but a natural ALP ultraviolet relation is

\[
\Lambda=4\pi f.
\]

Rerunning the RG at each value gives:

| embedding | \(f\) (GeV) | \(\mathcal B(K^+\to\pi^+a)\) | \(c\tau_a\) |
|---|---:|---:|---:|
| universal | \(10^7\) | \(1.67\times10^{-9}\) | \(1.02\times10^6\) m |
| universal | \(10^8\) | \(1.97\times10^{-11}\) | \(9.31\times10^7\) m |
| universal | \(10^9\) | \(2.26\times10^{-13}\) | \(8.52\times10^9\) m |
| third family only | \(10^7\) | \(2.50\times10^{-7}\) | \(3.20\times10^6\) m |
| third family only | \(10^8\) | \(2.44\times10^{-9}\) | \(2.69\times10^8\) m |
| third family only | \(10^9\) | \(2.36\times10^{-11}\) | \(2.30\times10^{10}\) m |

NA62 reports mass-dependent \(K^+\to\pi^+X\) limits at the \(10^{-11}\) level. The deliberately rough estimate below used a representative \(10^{-11}\) limit and pointed to characteristic sensitivity around

\[
f\sim1.4\times10^8\ \text{GeV}
\]

for the universal embedding and

\[
f\sim1.5\times10^9\ \text{GeV}
\]

for the third-family-only embedding.

These were search-scale estimates, not exclusion limits. Result 26 supersedes them using the published vector curve: at 100 MeV the interpolated observed limit is \(4.52\times10^{-11}\), giving characteristic crossings near \(6.5\times10^7\) GeV and \(7.3\times10^8\) GeV. A formal exclusion still requires the underlying likelihood and theory uncertainties.

## 5. A numerical-tool boundary

At 1–3 GeV, ALPaca exposes both partonic labels such as \(a\to gg\) or \(c\bar c\) and hadronic labels such as \(a\to\text{hadrons}\). These are alternative or overlapping descriptions in parts of the interpolation region, not an exclusive list to be summed. Some displayed channel ratios can consequently exceed one when read outside their intended domain.

The present result therefore uses 100 MeV for the clean production comparison. A publication-quality mass scan must follow the package's domain prescriptions and validate the transition region separately.

## 6. What this does to paper prospects

The general RGE, matching, CKM flavor generation and meson formulas are established ALP phenomenology. Merely inserting the incidence integers is not a theory paper.

A potentially paper-worthy result now has a precise shape:

1. define the incidence UV embedding unambiguously;
2. run a full mass-and-scale scan with experimental likelihoods;
3. compare it against standard ALP benchmarks with the same number of free parameters;
4. identify a correlated production/decay pattern that those benchmarks cannot reproduce;
5. explain why the incidence charges follow from the underlying algebra rather than being selected after seeing the limits.

The third item is crucial. Without benchmark discrimination, this is a new named point in an existing EFT, not a new physical prediction class.

## Primary software and experimental boundary

- [ALPaca: The ALP Automatic Computing Algorithm](https://arxiv.org/abs/2508.08354) and its [open-source repository](https://github.com/alp-aca/alp-aca) provide the numerical running, matching and meson phenomenology used here.
- [Bauer et al., low-energy ALP EFT](https://arxiv.org/abs/2012.12272) supplies the underlying evolution and matching formalism.
- [NA62, hidden-sector searches in \(K^+\to\pi^+X\)](https://arxiv.org/abs/2507.17286) reports the mass-dependent experimental limits whose scale is used for orientation here.

## Reproducibility

```powershell
.\.venv-alpaca\Scripts\python.exe scripts\run_programme_incidence_alpaca_benchmark.py
node scripts\verify_programme_incidence_alpaca_summary.mjs
```

On Windows the script applies a launch-time compatibility shim because ALPaca's pinned `flavio` dependency requests the Unix-only multiprocessing context `fork`. No installed package source is modified.
