# Transfer a calibrated timestamp gate to a new source

The [count-observation design](observation-design.md) calls for
matched source normalization and detector acceptance. I screened
Arnqvist et al.'s archive. Its run notes provide live time, and
its published response generator uses a monoenergetic parallel
beam from a randomly oriented disk. The code is in
`detector_response_function/geant4_DRF_HPGe_b12806_b12810_10Mev/src/EPrimaryGenerator.cc`
inside the simulation deposit. I found no calibration-source
geometry and acceptance mapping for the particular recorded runs.
The response matrix could not supply a forward absolute-count
test for those spectra. [Uppsala archive](https://doi.org/10.57804/43jy-vw03)

The archive does support a different question. The July 9
calibration runs contain recorded energy and timestamp pairs
from the same board. The cobalt run spans about 600.12 s in
its run notes and about `6.0012e14` timestamp units, consistent
with picoseconds. The two readout channels are 3 and 4. I
calibrated energy from the caesium and cobalt singles peaks
using the [initial plan](detector-timing-uppsala-plan.json).
The cobalt full-energy pair gives two pairs in one channel
orientation and zero in the other within ±2 μs of zero delay.
This cannot supply a prompt region for the intended full-energy
transfer. [Full-energy screening receipt](detector-timing-uppsala-full-energy-screen.json)
[Experiment](https://doi.org/10.1016/j.nima.2026.171461) · [Evaluated line energies](https://www-nds.iaea.org/IRDFF/Recomm-DecayData-IRDFF-II.pdf)

I then declared an [inclusive timestamp-pair test](detector-timing-uppsala-inclusive-plan.json).
It uses all recorded hits in the two channels and counts every
pair in the specified delay window. The cobalt delay histogram
fixes the center at +10 ns for channel 4 minus channel 3. Four
windows shifted to ±25 and ±50 μs estimate accidental pairs. The
benchmark is the fraction of the background-subtracted excess
retained from a wide ±2 μs window. The
[calibration](detector-timing-uppsala-inclusive-calibration.json)
was saved before the scorer read the sodium event data. Its wide
window contains 453 net cobalt pairs. The matching sodium
window contains 28,013.75 net pairs.

| Gate half-width | Frozen cobalt forecast | Sodium retention | Absolute error |
| --- | ---: | ---: | ---: |
| 10 ns | 19.09% | 21.99% | 2.89 percentage points |
| 50 ns | 55.24% | 63.58% | 8.34 points |
| 100 ns | 77.87% | 86.29% | 8.42 points |
| 200 ns | 92.72% | 98.91% | 6.19 points |
| 400 ns | 94.04% | 99.85% | 5.81 points |

All five errors meet the plan's 10-point engineering tolerance.
The [scoring receipt](detector-timing-uppsala-inclusive-result.json)
keeps prompt and shifted counts separately. The source runs are
distinct acquisitions on the same apparatus and form one
experimental evidence family. The inclusive prompt excess may
include scatter or electronic correlations. Reuse the gate
retention only with its pair selection, reference window, and
accidental-subtraction rule. These data provide no timing
forecast for the two full-energy lines and no emission time
relative to physical state preparation.

The next discriminating run needs enough independently documented
energy-tagged prompt pairs to freeze a full-energy gate. Test
whether delay changes with pulse energy before applying that
gate to another source. Use matched source geometry and an
independent source normalization to connect an absolute peak
count to any timing acceptance.

The [pulse-energy follow-up](detector-timing-uppsala-strata.md)
tests how much of the transfer error can be explained by a change
in the recorded energy mixture.

```powershell
# Download the three archive paths in the plan as co60.root, cs137.root
# and na22.root into the same folder. The runner verifies their hashes.
$lane = 'corpus/programmes/programme-algebra/learning'
$runner = 'tooling/programme-algebra/audit-detector-timing.py'
$dir = Join-Path ([IO.Path]::GetTempPath()) 'grand-theory-hpge-2025-324'
$plan = "$lane/detector-timing-uppsala-inclusive-plan.json"
python -B $runner "$lane/detector-timing-uppsala-plan.json" $dir --screen-full-energy
python -B $runner $plan $dir
python -B $runner $plan $dir --score "$lane/detector-timing-uppsala-inclusive-calibration.json"
```

The runner uses NumPy and uproot.
