# Result 28: low-mass ALP data identify a five-coordinate quotient but only three or four directions practically

## Grounded picture

Eight knobs were placed behind the panel: five universal fermion coefficients and three gauge coefficients. Ten readings were placed on the front: kaon production, B production, total lifetime, dominant lepton branching and photon branching at 100 and 300 MeV.

Mathematically every knob moves at least one reading. But three combinations move the readings by less than one part in roughly half a million, two million and one hundred million relative to the leading response. Calling this “rank eight” would confuse numerical dust with experimental information.

## Local ALPaca result

At the universal incidence point, the singular values of the logarithmic response Jacobian are

\[
(4.945,1.292,0.562,0.304,0.00561,
9.91\times10^{-6},2.47\times10^{-6},4.68\times10^{-8}).
\]

At a relative resolution threshold of \(10^{-3}\), the complete ten-observable system has effective rank five. Those five coordinates have a clear EFT interpretation:

\[
c_{u_R}-c_{q_L},\quad
c_{d_R}-c_{q_L},\quad
c_{e_R}-c_{\ell_L},\quad
c_G^{\rm eff},\quad
c_\gamma^{\rm eff}.
\]

The nearly invisible directions align with common quark and lepton vector-current shifts and the low-energy-orthogonal \(c_W-c_B\) combination. These are basis/current redundancies or require electroweak-scale information.

## What realistic low-mass measurements see

Using production and total width but omitting the very small photon branching fractions, the singular values are

\[
(1.333,0.563,0.0161,0.00746,0.000932,5.3\times10^{-15}).
\]

The effective rank is:

| relative resolving power | rank |
|---:|---:|
| \(10^{-2}\) | 3 |
| \(10^{-3}\) | 4 |
| \(10^{-4}\) | 5 |

Kaon production plus lifetime alone resolves only three directions at \(10^{-3}\).

## Consequence

The proposed NA62 production/lifetime programme can strongly test the top-to-lepton relation, but it does not by itself reconstruct the full UV fermion ray. The bottom component is a weak direction and needs a bottom-sensitive observable. Tiny photon modes are also needed to separate gauge nuisance directions.

This replaces an indiscriminate eight-dimensional nuisance scan with a physically typed quotient and an experimental-rank question.

## Reproduction

- Driver: `scripts/run_programme_alpaca_local_identifiability.py`
- Compact certificate data: `programme_alp_identifiability_summary.json`
- Certificate: `verification/verify/verify_programme_alp_identifiability_summary.mjs`
