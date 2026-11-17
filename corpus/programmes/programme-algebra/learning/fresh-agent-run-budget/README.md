# Trial budget for a direct 136.47 keV iron-57 photon

The nominal minimum is **22,824 successfully prepared trials for BART** and **9,909 for LORAX**. Each trial begins with one ordinary iron-57 nucleus in the 136.47 keV level. A success requires a direct photon emitted within 20 ns of preparation and eventually registered in the corresponding full-energy peak.

| Setup | Calibration distance | Absolute peak efficiency | True registration per trial | Minimum trials | Chance at minimum | Chance one trial fewer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| BART | 30 cm | 0.1537(24)% | 0.00013124512749 | 22,824 | 95.00001554% | 94.99935923% |
| LORAX | 16.5 cm | 0.354(6)% | 0.00030228220646 | 9,909 | 95.00017458% | 94.99866276% |

The 136.47 keV \(5/2^-\) level has a mixed M1+E2 transition to the 14.4 keV level and a direct E2 transition to the ground state. Each can proceed by gamma emission or internal conversion. DDEP gives relative photon weights of 100 and 12.53(18) and total electron-to-gamma rate ratios of 0.0236(4) and 0.1487(21), respectively. The four exit weights are \(100,\ 2.36,\ 12.53,\ 1.863211\). The direct photon accounts for 0.1073203888 of upper-level exits. The competing 122.06 keV transition ends the initial excitation even when the 14.4 keV level subsequently decays. The calculation starts with the upper level already populated, so the cobalt-57 feeding fraction and absolute photon yield per parent decay are outside the conditional probability. [DDEP §2.2 and Comments Table 5](https://www.bipm.org/documents/d/guest/co-57_report) · [ENSDF adopted levels and gammas](https://www.nndc.bnl.gov/ensnds/57/Fe/adopted.pdf)

Using the measured population half-life of 8.730(17) ns, the constant-hazard probability of any exit by 20 ns is \(1-2^{-20/8.730}=0.7956591915\). Multiplying by the direct branch share gives a source-emission probability of 0.0853904538. The timing study used a lower fit bound of 10 ns in its nominal analysis of this level. The calculation applies that exponential law from preparation at time zero. [Bergmann, Javora and Smolyanskiy (2025), §4, Eq. (6)](https://doi.org/10.1140/epja/s10050-025-01659-6)

Collins et al. calibrated with 1 g aqueous standards in 2 mL ISO ampoules. Their efficiency equation uses live time, water-normalized attenuation and photon yield to express the absolute full-energy peak efficiency per emitted photon. The 136.47 keV row supplies the fractions 0.001537 and 0.00354. Multiplying each by the source-emission probability gives the true-registration probability \(p\) per successful preparation. The article text was checked in a mirror and the row against a coauthor's reproduction of the same table. [Collins et al. (2015), §2.3.1 and Table 3](https://doi.org/10.1016/j.apradiso.2015.04.008) · [Article mirror](https://www.academia.edu/93004558/Precise_measurements_of_the_absolute_%CE%B3_ray_emission_probabilities_of_223_Ra_and_decay_progeny_in_equilibrium) · [Table reproduction](https://indico.cern.ch/event/1339442/attachments/2943554/5173805/231Regan.pdf)

For independent trials with fixed \(p\), the chance of at least one true registration is \(1-(1-p)^n\). The planner solves for the smallest integer \(n\) meeting the 95% target. Direct arithmetic with the published inputs and successive multiplication of the zero-count probability independently reproduced both adjacent thresholds.

## Replay

The [learning notes](../README.md) and [run planning note](../run-planning.md) led to the existing planner. It uses the four saved operations for finite-window exits, branch selection, absolute peak acceptance and independent repetition. The earlier detector case supplied the fact structure. The 20 ns window, direct branch and line-specific detector efficiencies were supplied for this case in [BART facts](bart.json) and [LORAX facts](lorax.json).

From the checkout root, run the following commands.

```powershell
$runner = 'tooling/programme-algebra/compose-trial-budget.mjs'
$lane = 'corpus/programmes/programme-algebra/learning/fresh-agent-run-budget'
foreach ($setup in 'bart', 'lorax') {
    node $runner plan "$lane/$setup.json"
    foreach ($stage in 'helium', 'calcium', 'detector', 'trials') {
        node $runner plan "$lane/$setup.json" "--omit-$stage"
    }
}
```

Both runs supplied zero routes and executed four learned operations with zero microscopic dynamics runs. Each omission returned the runner status no-complete-chain. Omitting helium or calcium prevented the branch prediction. Omitting detector acceptance preserved only the source-event probability. Omitting the repetition operation preserved the single-trial peak probability. The [replay receipt](replay.json) records the commands, outputs, local hashes and arithmetic checks.

## Limits

The budget uses central inputs and conditions on known successful preparations, ordinary electronic occupancy, exponential free decay and stable, independent live acquisition. Applying the cobalt-57 efficiencies to prepared iron-57 assumes matched position, attenuation, orientation-averaged emission and peak acceptance, including any effect of coincident atomic radiation and true summing. The 20 ns window applies to emission. A hardware time gate, detector dead time or pile-up outside the matched regime, false positives, shared calibration uncertainty and correlated preparations require additional modeling. The 95% is a nominal event probability at fixed \(p\). The calculation assigns no uncertainty coverage to the trial budget.
