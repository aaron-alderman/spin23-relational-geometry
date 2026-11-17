# A 14.4 keV photon from a prepared iron-57 nucleus

**The probability of emission at the source within 100 ns is about 5.31%.** The
first excited level of ordinary electronically occupied iron-57 is prepared at
time zero. Count the nuclear gamma photon in any direction. Internal conversion
and gamma emission both end the initial excitation, and internal conversion
carries away the transition energy by ejecting a bound electron.

## Evidence and calculation

- The DDEP evaluation gives the 14.41295 keV level a population half-life of
  98.0 ± 0.4 ns (evaluation comments, Tables 2 and 3). The level has spin-parity
  \(3/2^-\) and decays to the \(1/2^-\) ground state through a predominantly
  M1 transition with a small E2 admixture. The evaluated total internal conversion
  coefficient \(\alpha_T=8.55\pm0.12\) is the ratio of the all-shell conversion
  rate to the gamma rate (table §2.2, \(\gamma_{1,0}(\mathrm{Fe})\)). The
  evaluation adopted a BrIcc value and compared it with measurements in the
  comments to §2.2. [DDEP evaluation](https://www.bipm.org/documents/d/guest/co-57_report)
- ENSDF gives 98.3 ± 0.3 ns and \(\alpha_T=8.56\pm0.26\), which yield 5.29%
  when substituted together. The ENSDF intensity column and DDEP's 9.18% photon
  emission intensity use all parent cobalt-57 decays as the denominator. This
  question conditions on the first excited iron-57 level already being populated.
  [ENSDF decay dataset](https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=57co+ec+decay&nucleus=57FE),
  [DDEP evaluation §4.2](https://www.bipm.org/documents/d/guest/co-57_report)
- Bergmann, Javora and Smolyanskiy measured 97.82 ± 0.05 ns by delayed coincidences
  in 2025. Substituting this half-life with DDEP's conversion coefficient gives
  5.32%. [Original timing measurement](https://doi.org/10.1140/epja/s10050-025-01659-6)

With exponential population decay, the mean lifetime is \(\tau=T_{1/2}/\ln 2\),
about 141.38 ns. The total and radiative rates are \(\lambda=1/\tau\) and
\(\lambda_\gamma=\lambda/(1+\alpha_T)\). Under constant competing rates,

\[
P_\gamma(t)=\int_0^t\lambda_\gamma e^{-\lambda s}\,ds
=\frac{1-2^{-t/T_{1/2}}}{1+\alpha_T}.
\]

At 100 ns the probability of any decay is 50.702%. The gamma share of those decays
is 10.471%, giving 5.309%. Holding the coefficient fixed and moving the half-life
to its reported endpoints gives 5.294% to 5.324%. Moving both inputs to the
endpoint combinations that minimize and maximize the answer gives 5.229% to
5.392%. These are sensitivity calculations, with no statistical coverage assigned.

## What was found and reused

1. A local `rg --files` search for transition material surfaced
   [AZ-127](../../../admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md)
   and the [transition learning README](../README.md). The latter led to the
   [helium survival operation](../helium-learned-operation.json), the
   [calcium exit operation](../calcium-learned-operation.json) and the existing
   composer described in its reuse commands. The calcium record was earned from
   a driven case where the event and survival regime mattered. Its branch
   operation states a conditional-probability calculation for absorbing exits
   with calibrated shares.
2. A nuclear-data search surfaced ENSDF, the DDEP evaluation and the Bergmann
   et al. measurement. I used the DDEP half-life and conversion coefficient in
   [the facts input](iron57.json), recorded the original half-life alongside its
   conversion to seconds of mean lifetime, and set the relative rates on a scale
   where the radiative rate is one. I evaluated the half-life expression
   directly in Node as an arithmetic cross-check.
3. I ran the composer and both omission controls on those same facts. The saved
   helium operation supplied the all-exit probability and the saved calcium
   operation selected the gamma share. Each omission returned `no-complete-chain`.
   A direct call using only the saved helium operation with the photon question
   returned `operation-inapplicable` and reported the event-type mismatch.
   [Replay commands, outputs and local hashes](replay.json)

AZ-127 separates symmetry-allowed channels, partial rates, the total lifetime
and the observable. The iron-57 case places a measured population half-life and
an evaluated conversion coefficient at the partial-rate stage of that programme.
The composition gives the source event with zero microscopic dynamics runs.
The replay tests reuse of these operations on one independently sourced case.
The composer checks the declared event and rate inputs. Completeness of the
rate set and applicability of the exponential model come from the physical
preparation and decay evidence.

The estimate applies to ordinary occupied electronic shells and free decay
without subsequent driving or feeding. Changing shell occupancy can change
conversion and the lifetime. Detector coverage, efficiency, attenuation and
recoil-free selection would enter a prediction about recorded photons.
[ENSDF adopted levels and gammas](https://www.nndc.bnl.gov/ensnds/57/Fe/adopted.pdf)

Run the receipt's four `command` entries from the checkout root. The composer's
`probabilityAtReportedLifetimeEndpoints` varies the mean lifetime alone and
uses the nominal branch share throughout.
