# Iron-57 emission within 10 ns and eventual peak registration

For one ordinary, electronically occupied iron-57 nucleus prepared at time zero in the 136.47 keV level, the estimated probability of **emitting a 122.06 keV photon within 10 ns is 46.93%**. With the emission distribution and acquisition matched to the respective calibration, the estimated probability that this same photon also registers in the full-energy peak is **0.07514% for BART** or **0.1821% for LORAX**.

| Spectrometer | Perpendicular distance from detector window | Full-energy peak efficiency per emitted 122.06 keV photon | Joint probability per prepared nucleus |
| --- | ---: | ---: | ---: |
| BART | 30 cm | 0.1601(11)% | 0.07514% |
| LORAX | 16.5 cm | 0.388(3)% | 0.1821% |

The joint probability is about 2.42 times higher for LORAX in the two published geometries. The common nuclear factor cancels in that ratio. The distances differ, so the ratio includes a geometry effect. The quoted uncertainties in parentheses are the original calibration uncertainties.

## Source emission

The prepared level has spin and parity \(5/2^-\). Its two evaluated transitions are the predominantly M1, mixed M1+E2 branch to the 14.4 keV \(3/2^-\) level and the direct E2 branch to the \(1/2^-\) ground state. Each transition can proceed by photon emission or internal conversion. Once the upper level is left, no feeding or return is assumed. The subsequent 14.4 keV de-excitation occurs after the first exit and can influence the detector response through summing. [ENSDF adopted levels and gammas](https://www.nndc.bnl.gov/ensnds/57/Fe/adopted.pdf) · [DDEP Co-57 evaluation, §2.2 and Comments Table 5](https://www.bipm.org/documents/d/guest/co-57_report)

DDEP gives relative photon intensities of 100 and 12.53(18) for the two lines and total internal conversion coefficients of 0.0236(4) and 0.1487(21), respectively. The coefficients are electron-to-photon rate ratios. On the same relative scale the four exit weights are 100, 2.36, 12.53 and 1.863211. Normalizing these weights gives a 122.06 keV photon share of \(100/[100(1+0.0236)+12.53(1+0.1487)]=0.8565075\). The relative photon intensities cancel the common population of the upper level. The Co-57 electron-capture feeding fraction and absolute photon yield per parent decay have a different initial condition. [DDEP Co-57 evaluation, §2.2 and Comments Table 5](https://www.bipm.org/documents/d/guest/co-57_report)

The measured upper-level population half-life is \(T_{1/2}=8.730(17)\) ns, equivalent to a mean lifetime of \(T_{1/2}/\ln 2=12.5947\) ns. With a constant total hazard, the probability of any exit by 10 ns is \(1-2^{-10/8.730}=0.5479593\). Multiplying by the photon share gives an emission probability of 0.4693312. The timing study fitted the exponential using photon time differences, with a lower fit bound of 10 ns for this level because of instrument response. Applying the resulting half-life from nuclear preparation at \(t=0\) extends the exponential model into the requested emission window. [Bergmann, Javora and Smolyanskiy (2025), §4 Eq. (6)](https://link.springer.com/article/10.1140/epja/s10050-025-01659-6)

## Detector transfer

Collins et al. §2.3.1 specifies a 1 g aqueous standard in a 2 mL ISO ampoule. The 122.06 keV entries in Table 3 are absolute full-energy peak efficiencies in percent. Their calibration equation divides by the photon yield per parent decay to express the efficiencies per emitted photon. After converting to fractions, 0.001601 and 0.00388 multiply the shared source-emission probability. The stated live acquisition and corrected peak acceptance govern the multiplication. The 10 ns condition concerns the photon emission time relative to nuclear preparation. The registration may occur later. [Collins et al. (2015), §2.3.1 and Table 3](https://www.academia.edu/93004558/Precise_measurements_of_the_absolute_%CE%B3_ray_emission_probabilities_of_223_Ra_and_decay_progeny_in_equilibrium) · [Author presentation reproducing Table 3](https://indico.cern.ch/event/1339442/attachments/2943554/5173805/231Regan.pdf)

The transfer assumes the conditional peak efficiency for photons emitted within the window equals the published value after matching source distribution, orientation average, attenuation, geometry, live acquisition and peak selection. The calibration analysis accounts for live time, pulse pile-up and attenuation, with attenuation normalized to water. The authors considered cascade summing negligible for the far geometries (approximately 0.026 sr for BART and 0.075 sr for LORAX under a point-source approximation) and applied no cascade summing correction. A different preparation could change the angular distribution or the coincident atomic and cascade radiation at the detector. Applying the same efficiency would then require a response or correction for those differences, including any material losses from true summing with the 14.4 keV cascade or with X-rays. The published efficiency supplies no hardware timestamp acceptance or accidental-coincidence rate. These are central estimates from a conditional composition of separately published inputs, with no new measured coincidence result. A combined uncertainty interval would require a covariance and calibration-transfer model beyond these nominal calculations. [Collins et al. (2015), §2.3.1](https://doi.org/10.1016/j.apradiso.2015.04.008)

## Retrieval and replay

I searched the checkout for transition and detector material and followed the [learning lane](../README.md) to the [AZ-127 transition programme](../../../admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md) and the detector composer. The previous iron-57 replay concerned the 14.4 keV level and a 100 ns window. Its detector lesson transferred as a rule about matching absolute acceptance. The lifetime, exit weights, line and detector efficiencies came from the present evidence.

I searched the literature by iron-57 level and line energies and by the detector names with cobalt-57. The ENSDF adopted levels verified the topology and evaluated half-life of 8.7(3) ns. I used the more precise 2025 timing measurement and the DDEP relative photon weights and conversion coefficients. The publisher detector article endpoint returned HTTP 403. I read the article text in a mirror for the calibration method and checked the exact 122.06 keV row against the table reproduced in the author's presentation. The table and its reproduction are one evidence family.

[BART facts](bart.json) and [LORAX facts](lorax.json) supply zero candidate routes. From the checkout root, run these commands.

```powershell
$lane = 'corpus/programmes/programme-algebra/learning/fresh-agent-detector'
$runner = 'tooling/programme-algebra/compose-detector-lesson.mjs'
node $runner detect "$lane/bart.json"
node $runner detect "$lane/lorax.json"
```

The [replay receipt](replay.json) pins the local input and operation files and records the full JSON output for both runs and for each of `--omit-helium`, `--omit-calcium` and `--omit-detector` on both inputs. With all three operations it yielded the joint probabilities above. Omitting the detector operation preserved the source-emission probability and prevented a peak prediction. Omitting either upstream operation prevented both predictions. Direct arithmetic agreed with the two computed results to absolute tolerance \(10^{-15}\). The omission controls test the saved runner's dependency on each operation.

The replay instantiates the AZ-127 chain from prepared state to detector-folded decay record. It uses the helium lesson to map the total lifetime to finite-window survival and loss, the calcium lesson to resolve the selected absorbing exit from the upper level, and the iron-57 lesson to fold that physical event through a matched detector response. The evaluated multipolarities identify allowed transition operators. Measured and evaluated data supply the strengths and timing. This case exercises the programme's empirical conversion under a stated preparation and readout, with no microscopic dynamics run or new scientific admission.

