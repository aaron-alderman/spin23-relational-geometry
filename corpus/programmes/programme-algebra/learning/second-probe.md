# Choosing a second probe after the first answer

With two observations per case, the selected conditional policy identified 2,055 of 2,304 fresh synthetic targets. Repeating the frozen ranking over all rules identified 1,894. Choosing the best fixed follow-up for the shared first probe identified 2,032. Thus 23 additional identifications are attributable to conditioning compared with this stronger fixed design.

## Fit and controls

The [runner](../../../../tooling/programme-algebra/learn-second-probe.py) regenerated the 384 menus of the previous revision experiment, checked every menu digest and recovered the recorded first probe, label and survivor count for each truth. Counterfactual second labels were computed from each known synthetic rule. Training reused the historical first observations and simulated the follow-ups.

Four programmer-supplied policies competed on unique identifications, then total survivors, then declared order. Their training scores, respectively, were 1,906 for repeating the frozen ranking over unused probes, 2,038 for a fixed joint design, and 2,060 each for reranking on survivors and directly maximizing unique outcomes on survivors. The tie selected the existing frozen ranker applied to surviving rules. Both the ordinary and survivor-restricted rankings use the preceding revision's loss weights and tie-break. The fixed joint control chooses the unused probe that gives the most uniquely identifying pairs of labels over all possible truths for the shared first probe, with total survivors breaking ties. Its choice is independent of the observed first label. [Frozen policy and protocol](second-probe-frozen.json)

## Fresh comparison

A new fixed seed generated 128 menus per family. Hash checks excluded prior menus and duplicates. All six rules served as hidden truths on each menu. The six cases on a menu share the design. Each policy purchased the same first aggregate label and one additional label from a distinct probe, even if the first label already identified the rule. Each probe measured four length-five histories. No hidden truth or second label was provided to the selection function.

| Family | Cases | First alone | Repeat frozen | Best fixed follow-up | Conditional follow-up |
|---|---:|---:|---:|---:|---:|
| Binary | 768 | 462 | 710 | 766 | 768 |
| Integer | 768 | 768 | 768 | 768 | 768 |
| Sparse binary | 768 | 190 | 416 | 498 | 519 |
| Total unique | 2,304 | 1,420 | 1,894 | 2,032 | 2,055 |

Against the repeated frozen ranking, the conditional policy left fewer candidates in 196 cases and more in five, all sparse binary. Relative to the best fixed follow-up, the net gains were two binary and 21 sparse-binary identifications. Across 84 menus, different still-ambiguous first labels actually triggered different second choices. On the binary menu whose hash starts with 9848cda3, a first total of two left odd parity and majority. Both predicted three on the fixed follow-up. Their predictions on the conditional follow-up were one and two, respectively, resolving either truth. A first total of three on the same menu led to a different follow-up that distinguished first sample from last sample. [Paired choices, labels and survivor counts](second-probe-test.json)

The evidence supports choosing which remaining uncertainty to investigate in these finite, noiseless tasks. The learned change was the choice of conditioning strategy from a supplied set. Acquisition noise, cost differences and physical measurements were outside the evaluation.

## Replay

Run from the repository root with Python 3.12. Training emits the lock and testing verifies the saved lock before using it.

~~~powershell
python -B tooling/programme-algebra/learn-second-probe.py train
python -B tooling/programme-algebra/learn-second-probe.py test
~~~
