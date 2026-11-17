# Preparation budget for the 122.06 keV iron-57 photon

At nominal calibration, the minimum is **5,465 successfully prepared nuclei for BART** or **2,254 for LORAX**. To reach the same 99% target throughout the declared sensitivity box, the respective minima are **5,522** and **2,279**. A budget that works with either setup throughout its box is **5,522**.

Each independent trial starts with one ordinary, electronically occupied iron-57 nucleus already in the 136.47 keV level. A success is emission of its 122.06 keV photon within 12 ns of preparation and eventual true registration of that photon in the full-energy peak in matched live acquisition.

| Setup | Calibration | Per-trial success probability | Minimum preparations \(N\) | Chance at \(N-1\) | Chance at \(N\) |
| --- | --- | ---: | ---: | ---: | ---: |
| BART | Nominal | 0.000842414776574 | 5,465 | 98.99972400% | 99.00056665% |
| BART | Least favorable | 0.000833700638583 | 5,522 | 98.99961074% | 99.00044476% |
| LORAX | Nominal | 0.002041579845788 | 2,254 | 98.99921060% | 99.00125379% |
| LORAX | Least favorable | 0.002018709093425 | 2,279 | 98.99809521% | 99.00011776% |

## Inputs and probability

| Input | Nominal | Declared endpoints |
| --- | ---: | ---: |
| Upper-level population half-life \(h\) | 8.730(17) ns | 8.713, 8.747 ns |
| 122.06 keV relative photon weight | 100 | 100, 100 |
| 136.47 keV relative photon weight \(r\) | 12.53(18) | 12.35, 12.71 |
| 122.06 keV total conversion coefficient \(\alpha_{122}\) | 0.0236(4) | 0.0232, 0.0240 |
| 136.47 keV total conversion coefficient \(\alpha_{136}\) | 0.1487(21) | 0.1466, 0.1508 |
| BART 122.06 keV absolute full-energy peak efficiency | 0.1601(11)% | 0.1590%, 0.1612% |
| LORAX 122.06 keV absolute full-energy peak efficiency | 0.388(3)% | 0.385%, 0.391% |

The timing input comes from the measured upper-level population half-life. The nominal fit starts at 10 ns. This case applies the exponential survival model from preparation time zero, using mean lifetime \(h/\ln 2\). [Bergmann, Javora and Smolyanskiy (2025), §4, Eq. (6)](https://doi.org/10.1140/epja/s10050-025-01659-6)

The upper level can exit to the 14.4 keV level or directly to the ground state. Each transition has a photon branch and an internal-conversion branch. The nominal exit weights in that order are \(100,\ 2.36,\ 12.53,\ 1.863211\), with the two conversion weights given by \(100\alpha_{122}\) and \(r\alpha_{136}\). The later 14.4 keV decay is outside the set of initial exits. Conditioning on successful upper-level preparation removes the parent feeding factor. The relative photon weights give the ratio of the two upper-level photon rates, while the absolute Co-57 photon yields are per parent decay. [DDEP Co-57 evaluation, §2.2 and Comments Table 5](https://www.bipm.org/documents/d/guest/co-57_report)

The absolute peak efficiencies refer to a 1 g aqueous standard in a 2 mL ISO ampoule, at 30 cm from the BART window or 16.5 cm from the LORAX window. The calibration equation uses live time and photon yield and includes correction factors for self-absorption, pile-up and true coincidence summing. The authors treated true coincidence summing as negligible at these distances and left its correction factor at unity. Dividing the Table 3 percentages by 100 gives probabilities per emitted photon. Applying them here assumes matching position, attenuation and orientation-averaged peak acceptance, with any coincidence effects consistent with the calibration transfer. The 12 ns interval applies to emission before eventual registration. The original paper text was checked via a mirror, with the efficiencies cross-checked against a coauthor's reproduction of the same table. [Collins et al. (2015), §2.3.1 Eq. (1) and Table 3](https://doi.org/10.1016/j.apradiso.2015.04.008) · [Article mirror](https://www.academia.edu/93004558/Precise_measurements_of_the_absolute_%CE%B3_ray_emission_probabilities_of_223_Ra_and_decay_progeny_in_equilibrium) · [Table reproduction](https://indico.cern.ch/event/1339442/attachments/2943554/5173805/231Regan.pdf)

For absolute peak efficiency \(\varepsilon\), the probability from one successfully prepared nucleus is

\[
p(h,r,\alpha_{122},\alpha_{136},\varepsilon)
=\left(1-2^{-12\,\mathrm{ns}/h}\right)
\frac{100}{100(1+\alpha_{122})+r(1+\alpha_{136})}\,\varepsilon.
\]

The factors are the probability of any initial exit within the window, the share of those exits that emit the 122.06 keV photon, and the conditional peak efficiency. The combined probability of in-window source emission is 0.5261803726 at the center and 0.5243400243 at the minimizing corner.

At each fixed calibration, the probability of at least one true registration in \(n\) preparations is \(1-(1-p)^n\). The smallest integer meeting 99% is \(\lceil\ln(0.01)/\ln(1-p)\rceil\). The chance increases with \(p\), so the worst-case budget follows from the minimum \(p\). The window factor decreases with \(h\), the photon share decreases with \(r,\alpha_{122},\alpha_{136}\), and \(p\) increases with \(\varepsilon\). The minimizing corner therefore uses \(8.747\) ns, \(12.71\), \(0.0240\), \(0.1508\), and the lower efficiency for each setup. The two 136.47 keV weights share \(r\) and attain their maxima together, so the worst corner in the planner's componentwise rate box is also attainable in the box of original reported-input endpoints.

The box is a sensitivity convention formed by taking the central values plus or minus the reported uncertainties. It carries no assigned statistical coverage. The 99% target refers to repeated preparations with one fixed calibration throughout the run. The calculation assumes matched live acquisition and independence at that calibration.

## Replay

The [learning notes](../README.md), [nominal run planning](../run-planning.md), and [calibration bounds](../calibration-bounds.md) led to the existing planner and the [saved calibration-box operation](../run-budget-learned-operation.json). The [BART facts](bart.json) and [LORAX facts](lorax.json) each supplied zero routes. The planner applied the survival, branching, peak acceptance, independent repetition and calibration-box operations, with two upstream budget replays and zero microscopic dynamics runs per setup.

The [replay receipt](replay.json) records the source checks, byte hashes, commands, central and worst-corner outputs, and all ten omission runs. An independent calculation evaluated all 32 reported-input corners per setup and reproduced each minimum by successive multiplication of the zero-count probability, including the adjacent threshold checks above.

Each omission returned the status *no-complete-chain*. Omitting either survival or branch selection prevented a source-event probability. Omitting detector acceptance left the source-emission probability. Omitting trial budgeting left the single-preparation registration probability. Omitting the calibration-box operation left the nominal minimum.

From the checkout root, run the following commands.

~~~powershell
$runner = 'tooling/programme-algebra/compose-robust-budget.mjs'
$lane = 'corpus/programmes/programme-algebra/learning/fresh-agent-calibration-box'
node $runner record-run-budget
foreach ($setup in 'bart', 'lorax') {
    node $runner plan "$lane/$setup.json"
    foreach ($stage in 'helium', 'calcium', 'detector', 'trials', 'envelope') {
        node $runner plan "$lane/$setup.json" "--omit-$stage"
    }
}
~~~
