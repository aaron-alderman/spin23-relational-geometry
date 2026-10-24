# Threshold spectra give the two-current reduction a resolution ceiling

**Date:** 25 October 2026
**Status:** leading Yukawa threshold spectrum computed; leading unbroken-phase anomaly normalization included; broken-phase anomaly matching remains open
**Topic:** OT-047
**Parent:** [AZ-068 five-coordinate source quotient](admissibility_68_five_coordinate_source_quotient_and_two_current_no_go.md)
**Evidence:** [threshold-spectrum ledger](../../../evidence/data/yukawa-threshold-singular-spectrum-v1.json)
**Generator:** [threshold-spectrum calculation](../../../scripts/run-yukawa-threshold-singular-spectrum.mjs)
**Verifier:** [threshold-spectrum certificate](../../../verification/admissibility/verify_yukawa_threshold_singular_spectrum.mjs)

## Result

The five-coordinate quotient does not have one operational rank at every energy or every resolving power. The exact rank counts every nonzero physical cut. The effective rank counts only modes that a declared theory-and-detector budget can distinguish. These answers differ sharply.

Using the broken-phase free-fermion threshold model already derived in the corpus, the Yukawa response is effectively one-dimensional near 4 GeV because the tau mode overwhelms the nonzero Dirac-neutrino mode. Between the bottom and top thresholds it is **not** one-dimensional at percent precision: the second generalized mode remains about 7–11% of the first in the sampled 10–300 GeV range. Once the top channel opens, the hierarchy reverses. At 400 GeV the second Yukawa mode is about $8.1\times10^{-4}$ of the first, and at 1 TeV it is about $4.4\times10^{-4}$.

The independent weak-anomaly cut changes the high-energy answer again. With the declared leading vacuum normalization and the illustrative weak-coupling inputs inherited from the source-native spectroscopy calculation, the second five-coordinate mode is

\[
\frac{\sigma_2}{\sigma_1}=1.217\times10^{-3}.
\]

The top-dominated broken response is therefore rank one at 1% resolution but rank two at 0.1% resolution in this benchmark. This is the first quantitative resolution ceiling on the proposed operational two-current reduction.

## Why the exact source metric matters

The four Yukawa violations are not orthogonal source directions. Their exact quotient metric is $M=VD^{-1}V^T$. For mutually exclusive absorptive cuts with diagonal channel weights $W(s)$, the nonzero generalized response eigenvalues are those of

\[
\boxed{\sqrt{W(s)}\,M\,\sqrt{W(s)}}.
\]

This is equivalent to solving the seven-current problem $V^T W Vx=rDx$ but removes the protected kernel before numerical conditioning is assessed. Counting raw channel weights without this metric would miss the mixing induced by shared $Q$, $L$ and Higgs fields.

For the full five-coordinate quotient, append the anomaly row $A_2=(3,0,0,1,0,0,0)$ to $V$. With $T=(V;A_2)$, the induced metric is $N=TD^{-1}T^T$, and the same construction applies with a five-by-five $W$.

## Broken-phase threshold diagnostic

For each fermion channel the inherited leading two-particle model uses

\[
w_f(E)=n_fm_f^2\sqrt{1-\frac{4m_f^2}{E^2}}\,\Theta(E-2m_f).
\]

Rounded masses are diagnostic inputs, not a precision Standard-Model prediction. The resulting sampled ranks are:

| $E$ | open Yukawa cuts | exact rank | effective rank at 1% | $\sigma_2/\sigma_1$ |
|---:|---|---:|---:|---:|
| 4 GeV | $\tau,\nu$ | 2 | 1 | $1.66\times10^{-21}$ |
| 10 GeV | $b,\tau,\nu$ | 3 | 2 | $1.13\times10^{-1}$ |
| 100 GeV | $b,\tau,\nu$ | 3 | 2 | $6.97\times10^{-2}$ |
| 300 GeV | $b,\tau,\nu$ | 3 | 2 | $6.96\times10^{-2}$ |
| 400 GeV | $t,b,\tau,\nu$ | 4 | 1 | $8.11\times10^{-4}$ |
| 1 TeV | $t,b,\tau,\nu$ | 4 | 1 | $4.38\times10^{-4}$ |

Every open exclusive cut adds an exact positive direction. Thus no exact rank-one broken window exists above the tau threshold on the nonzero-Dirac-neutrino branch. Operational rank one is a statement about a tolerance, not a new conservation law.

The 10–300 GeV interval fails the proposed one-broken-mode reduction at percent resolution before the weak anomaly is even added. The high-energy interval reopens it because top absorption dominates, but only conditionally.

## Weak-anomaly normalization

Use the standard topological-density convention

\[
\chi=\frac{g_2^2}{64\pi^2}\epsilon^{\mu\nu\rho\sigma}W^a_{\mu\nu}W^a_{\rho\sigma}.
\]

The leading zero-temperature continuum cut for $SU(2)$ is

\[
\frac{\rho_\chi(s)}{s^2}=\frac{d_Ac_\chi^2g_2^4}{\pi},
\qquad d_A=3,\quad c_\chi=\frac1{64\pi^2}.
\]

Relative to the common Yukawa factor $s^2/(192\pi^3)$, the anomaly coordinate therefore has weight

\[
\boxed{w_{a_2}=\frac{9g_2^4}{64\pi^2}}.
\]

For the declared illustrative inputs $(w_u,w_d,w_e,w_\nu)=(3,0.0018,0.0001,10^{-24})$ and $g_2=0.65$, this gives $w_{a_2}=0.0025434$. It is loop suppressed relative to top but comparable to, and slightly larger than, the illustrative bottom weight. The full relative spectrum is

\[
(1, 1.2171\times10^{-3}, 2.4238\times10^{-4},
3.1818\times10^{-5}, 4.07\times10^{-25}).
\]

The perturbative topological-density normalization is taken from Laine, Niemi, Procacci and Rummukainen, [*Shape of the hot topological charge density spectral function*](https://arxiv.org/abs/2209.13804), equations (2.1) and the continuum result accompanying (A.42). Their thermal analysis also warns that the low-frequency anomaly response is not obtained by copying the vacuum cut: sphaleron and plasma scales enter.

## Open and closed

Closed:

- the exact four- and five-coordinate source metrics;
- the generalized-spectrum formula for exclusive leading cuts;
- the sampled broken-phase Yukawa threshold ranks;
- the fact that the bottom-dominated interval retains a percent-visible tau mode;
- the leading unbroken-phase weak-anomaly normalization;
- the illustrative high-energy ceiling: rank one at 1%, rank two at 0.1%.

Open:

- running couplings with uncertainty propagation;
- hadronic spectral data in the bottom and lower-energy regions;
- electroweak broken-phase $WW$, $ZZ$, $Z\gamma$ and $\gamma\gamma$ matching and interference;
- radiative mixing and physical detector covariance;
- a preregistered energy interval rather than isolated samples;
- the finite-temperature KMS tensor, including the anomaly's nonperturbative infrared response;
- the separate Majorana branch.

## Implication

The operational two-current idea is neither recovered nor simply dead. It has become an engineering statement with a number attached. A detector or calculation resolving only percent-level subleading response can legitimately use protected $B-L$ plus one top-dominated broken port in a suitable high-energy window. A per-mille analysis cannot make that reduction under the illustrative inputs because the anomaly direction becomes visible. Between bottom and top thresholds even a percent-level reduction fails because the tau mode survives.

This is the admissibility-zone logic: the boundary moves with energy, available cuts and record resolution. The place to look is the top-open high-energy response; the thing to measure is the stability of the singular gap under running, electroweak matching and held-out energies.

## Reproduction

~~~powershell
node scripts/run-yukawa-threshold-singular-spectrum.mjs --write
node verification/admissibility/verify_yukawa_threshold_singular_spectrum.mjs
~~~
