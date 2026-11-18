# Revising the observation selector from its own losses

The original disagreement selector sometimes chose a probe that left more rules consistent with the observation than taking the first offered probe. Its prior receipt contains 13 such cases. On 384 fresh synthetic menus, the revision reduced this failure from 83 to 57 across 2,304 equally budgeted target cases. It changed which targets remained ambiguous. Both selectors left 3,406 surviving candidates in total.

## Training and freeze

The [runner](../../../../tooling/programme-algebra/revise-observation-selector.py) replays the archived choices and checks survivor counts. Candidate loss frequencies were 4 for all, 3 each for first and last, 2 for odd parity, 1 for any and 0 for majority. I supplied five possible tie-breaking methods. The learner ranked them by prior losses still outstanding, then all regressions versus the passive first probe, then total remaining candidates. With no losses its fallback is the frozen selector.

The chosen method considers only probes tied for maximum disagreement. For each hypothetical true rule it computes how many additional candidates would survive relative to the first probe, clips improvements to zero, multiplies by one plus that rule’s historical loss count, and sums across rules. It takes the smallest penalty, breaking residual ties in supplied order. This repaired five historical losses and introduced two. The [lock](observation-selector-revision-frozen.json) binds training receipts, runner, method, weights, seed and scoring protocol before the new test.

## Held evaluation

Each policy chose from the same eight probes before receiving one aggregate label over four histories of five samples. All six rules were tested as hidden truths on each menu. There were 128 fresh menus per family. Truths on a shared menu are counterfactual outcomes of the same choice. The passive comparison is computed by the evaluator after selection. Neither selector receives its label as extra evidence. Sparse binary windows were generated at a 10% probability of a one per sample. New menu hashes were checked against the archived menus and each other.

| Family | Frozen → revised losses vs first probe | Repaired / introduced | Revised left fewer / same / more than frozen | Frozen → revised unique |
|---|---:|---:|---:|---:|
| Binary | 56 → 36 | 25 / 5 | 32 / 704 / 32 | 465 → 465 |
| Integer | 0 → 0 | 0 / 0 | 0 / 768 / 0 | 768 → 768 |
| Sparse binary | 27 → 21 | 6 / 0 | 10 / 747 / 11 | 187 → 190 |

For a probe with outcome groups of sizes n₁, n₂, …, the sum of survivors over all equally represented truths is the sum of the squared group sizes. Maximizing separated pairs already minimizes that sum. A tie-break can change who benefits and how many cases have a unique answer, but cannot lower this mean on the exact-label benchmark. The revised policy changed 30 of 384 probe choices. On the other 354 menus it took the frozen selector’s probe. [Paired results](observation-selector-revision-test.json)

A diagnostic replay after scoring set each rule’s loss frequency to zero while retaining the excess-survivor penalty. It verified the menu hashes and reproduced the revised loss and unique-identification totals in each family. The historical losses selected a useful tie-break. This test supplies no aggregate advantage for weighting individual rules by their loss histories. [Diagnostic receipt](observation-selector-revision-ablation.json)

## Replay

From the repository root with Python 3.12, run the fitter and then the held evaluation against the saved lock. The final command reproduces the diagnostic.

~~~powershell
python -B tooling/programme-algebra/revise-observation-selector.py fit
python -B tooling/programme-algebra/revise-observation-selector.py test
python -B tooling/programme-algebra/ablate-observation-loss-weights.py
~~~
