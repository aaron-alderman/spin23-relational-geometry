# Prophetic admissibility: from minor validation to major candidates

**Status:** v0 source-admission pilot; executable, not yet an identified predictive ranking

**Scope:** historical and theological inference. This programme does not alter any mathematical or physical claim in the corpus.

## High-recall element catalogue

Before admission gates or fulfilment scores, the programme now starts from the [v1 prophecy-element catalogue](../../../evidence/data/prophecy-element-catalogue-v1.json). It records future-directed claims at passage level across Torah, Former Prophets, Writings, Major Prophets, the Twelve, Gospels, Acts and Epistles, Revelation, and a separately typed reception layer. `yes`, `maybe` and `low-probability` classify candidacy as prophecy within the text; they do **not** classify supernatural truth or fulfilment. The catalogue is intentionally marked incomplete and lists the traditions and canons still outside v1.

The [noncanonical seed catalogue](../../../evidence/data/prophecy-element-catalogue-noncanonical-v1.json) adds deuterocanonical, Ethiopian-canonical, Second Temple and Nag Hammadi elements without treating “noncanonical” as a quality judgment. The [text-group registry](../../../evidence/data/prophecy-text-groups-v1.json) permits overlapping membership, while [weight profiles](../../../evidence/data/prophecy-group-weight-profiles-v1.json) express competing reception priors: individual evidence only, Protestant or Ethiopian authority, hidden-knowledge stress and successful-filter stress. The compiled scenarios never add overlapping memberships and never insert a canon multiplier into specificity, dating or fulfilment.

The first [Newton-anchored combinatorial run](../../../evidence/data/newton-combinatorial-analysis-v1.json) freezes one anchor (AD 800), the linked 1260/1290/1335 apocalyptic duration family, three declared operators and a maximum of three terms including the anchor. It enumerates before filtering, rejects arbitrary arithmetic, collapses algebraically equivalent lineages and only then retains date windows intersecting 28 October 2026 through 31 December 2100. Structural dominance is reported separately from probability.

The broader [chronology combinatorics](../../../evidence/data/prophecy-chronology-combinatorics-v1.json) treats that Newton run as a unit test rather than the final search. Its registry adds decree, Antiochene, Roman, papal-historicist, millennial, modern-generation, jubilee, 2300-day and 4 Ezra families while retaining the three-term ceiling. It reports raw convergence, independent-tradition convergence and source-explicit ranking separately and gives every unconverted catalogue element a no-date receipt.

## Question

Assume provisionally that some prophecy is genuine communication rather than only retrospective interpretation. Can historically closed, lower-stakes prophecies identify which interpretive rules are reliable enough to rank candidate readings of still-open major prophecy?

The proposed dependency is

\[
\boxed{\text{minor closed cases}}
\longrightarrow
\boxed{\text{held-out validation of hermeneutic operators}}
\longrightarrow
\boxed{\text{frozen operator ranking}}
\longrightarrow
\boxed{\text{bounded major candidates}}.
\]

The programme ranks **methods that generate candidates**, not attractive dates.

## Typed objects

A prophecy record is

\[
P=(S,D,G,A,E,O,R),
\]

where:

- \(S\) is the source text and textual witness;
- \(D\) is the source-date interval and its authority;
- \(G\) is genre and grammatical form;
- \(A\) is the admissible historical anchor set;
- \(E\) is the event or state of affairs asserted;
- \(O\) is the independently dated outcome record; and
- \(R\) is the reception and reinterpretation history.

A hermeneutic operator is

\[
H=(g,m,a,e,u),
\]

where \(g\) is a genre gate, \(m\) a time transformation, \(a\) an anchor rule, \(e\) a fulfilment predicate and \(u\) an uncertainty model. Examples include literal duration, day--year conversion, symbolic round-number duration, political-world transition, conditional warning and type--antitype recurrence. An operator is not admissible if it chooses among these only after seeing the desired outcome.

## Authority ladder

Every result must stop at the strongest rung actually supported:

1. **Lexical or literary fit** — the reading is possible in the text.
2. **Internal narrative fulfilment** — one work narrates both oracle and outcome.
3. **Historical retrodiction** — the text organizes an event already available to its author or redactor.
4. **Plausible pre-event correspondence** — composition may precede the event, but dating or target identity is not independently closed.
5. **Admitted prediction case** — the source is securely pre-event, the outcome is independent, and the target and time rule were fixed without outcome-conditioned repair.
6. **Held-out rule validation** — one frozen operator succeeds across admitted cases not used to construct it.
7. **Major candidate ranking** — validated operators assign bounded weights to open interpretations or intervals.
8. **Theological attribution** — divine communication is preferred over literary, political, psychological and chance rivals.

No lower rung is evidence for a higher rung merely because the arithmetic is exact.

## Admission gates

A case may enter the predictive calibration split only if all gates pass:

| Gate | Requirement |
|---|---|
| P1: pre-event source | The latest defensible source date is earlier than the independently dated event window. |
| P2: independent outcome | The fulfilment record is not supplied only by the same narrative or a dependent reuse. |
| P3: bounded target | Agent, action, object and event class are specific enough to score misses as well as hits. |
| P4: frozen time rule | Units, scaling, calendar and interval convention are declared before matching. |
| P5: anchor restraint | Anchors arise from the text or independently defined history, not from the desired endpoint. |
| P6: repair ledger | Every changed anchor, translation, event predicate or horizon remains visible and penalized. |
| P7: rival coverage | Literal, literary, ex-eventu, conditional and chance accounts receive the same record. |

Cases failing P1 or P2 can still train literary interpretation or expose repair behaviour; they cannot validate foresight.

## Frozen split and scoring design

Once enough cases pass admission, identifiers will be hash-sorted into construction, validation and held-out partitions. No book, dependent oracle cluster or reception lineage may appear on both sides of a split.

Each operator must return a probability distribution over event and time, not an unranked list:

\[
q_H(e,t\mid P).
\]

Ranking will use a proper score, with explicit penalties for anchor count, window width, free transformations and post-outcome repairs. The posterior predictive mixture for a major prophecy \(P_*\) will be

\[
q(e,t\mid P_*,D_{\rm minor})
=
\sum_H
P(H\mid D_{\rm minor})q_H(e,t\mid P_*).
\]

This calculation is prohibited until the calibration set and scoring rule are frozen and at least one operator has a genuinely held-out record.

## v0 source-admission result

The seed registry deliberately includes famous positive, negative and ambiguous cases. It does not score their theology. It asks whether they can carry the narrower burden of predictive validation.

Run:

```powershell
node scripts/run-prophetic-admissibility-pilot.mjs
node verification/prophetic-admissibility/verify_prophetic_admissibility_pilot.mjs
```

The v0 audit returns **no identified predictive ranking**. The current seed cases are blocked by one or more of:

- source dating that overlaps or follows the outcome;
- fulfilment reported only inside the same narrative;
- ambiguous start and end anchors;
- a target that changes under later reception; or
- an event that remains open and therefore censored.

This is not a verdict that no biblical prophecy was predictive. It is a result about the present registry: none of its seed cases yet supplies all provenance needed to estimate an out-of-sample forecasting advantage.

## Newton 2060 as an open major candidate

Newton's calculation is retained as an **open interpreter forecast**, not a biblical calibration success:

\[
800+1260=2060.
\]

Its arithmetic is exact. Its day--year map, AD 800 anchor and event predicate are the model-dependent objects. Newton explicitly made 2060 a lower bound and allowed a later ending, so the record is right-censored in 2026 and cannot validate the operator. The source transcript is [Yahuda MS 7.3g/related fragments](https://www.newtonproject.ox.ac.uk/view/texts/diplomatic/THEM00437).

## Negative controls

The first identified ranking must beat:

- shuffled prophetic numbers;
- shuffled anchors within the same historical density;
- matched non-prophetic political and poetic texts;
- rival sacred and secular forecast corpora;
- synthetic vague oracles with equal target breadth; and
- an ex-eventu model using the same dating uncertainty.

The decisive statistic is not the number of matches but the improvement in held-out proper score over these controls.

## Immediate work

1. Replace every seed case's broad source note with at least two independent dating authorities and a textual-witness ledger.
2. Add published, pre-outcome interpreter forecasts as a separate modern control lane.
3. Define a blinded annotation manual for agent, action, object, time and conditionality.
4. Recruit independent believing and skeptical encoders; adjudicate without showing model scores.
5. Freeze the first operator family only after the registry contains enough P1--P7 cases to support book- and lineage-separated held-out evaluation.

The [annotation manual](ANNOTATION_MANUAL.md) freezes the source/outcome separation, dating and independence classes, match vector, repair ledger and stop rules. A separate [interpreter-forecast control registry](../../../evidence/data/prophetic-interpreter-forecasts-v0.json) records dated modern forecasts without treating that deliberately selected set as a representative sample.

The generated [source audit](../../../evidence/data/prophetic-source-audit-v0.json) maps every external locator in the v0 registries to its JSON consumers, retrieval date, source class and independence role. It deliberately reports `bibliographicMetadataComplete: false`: locator coverage is complete, but author, title, publication date, edition and archived content hashes have not yet been frozen for every secondary source. Reproducible arithmetic must not be confused with a fully archived evidence base.

The [biblical time-transform register](../../../evidence/data/biblical-time-transform-register-v0.json) supplies a separate textual-admissibility ranking. It distinguishes explicit local day--year assignments, the linked 1260-day/42-month/three-and-a-half-times family, inner-biblical reinterpretation, bounded jubilee legislation, reciprocal day--millennium simile and later fixed-generation inference. This ranking controls which transformations may enter a candidate family; it does not say which transformation predicts history.

The [open-major candidate register](../../../evidence/data/prophetic-major-candidates-v0.json) then applies those typed transformations to Newton's AD 800 anchor. It admits AD 2060 as one generated candidate while withholding every predictive weight: the operator tournament is not identified, and the anchor is not independently unique. Candidate generation and candidate validation therefore remain separate jobs.

The temporal audit also refuses a common equivocation. Newton's wording makes 2060 a lower bound, not a point forecast or bounded window. Before 2060, an adjudicated occurrence of the declared transition could falsify the bound. Nothing occurring during 2060 would not falsify it, because the claim permits every later year. It therefore has no finite resolution date and very low temporal information even though the number itself is precise. The literal 1260-day and 42-month candidates have elapsed windows, but they remain `outcome-uncoded` until Newton's broad transition predicate is decomposed into independently adjudicable indicators.

## First retrospective held-out control

The first executable operator tournament uses the modern interpreter-forecast registry only. Records before 1900 train two Laplace-smoothed baselines; records from 1900 onward are held out by calendar rule. A skeptical exact-terminal null assigns 0.05 success probability in the declared window. Mean Brier score ranks the three models.

This is a **retrospective control**, not prospective validation: the registry was selected and encoded after the historical outcomes were known, and it is not a sample from a defined population. Its legitimate use is narrower. It tests whether the pipeline penalizes terminal date arithmetic and outcome-conditioned repair rather than rewarding exact arithmetic by itself.

In v0 the skeptical terminal null beats both the operator-family and global fitted baselines on the post-1900 records. The result supplies adverse evidence against exact terminal arithmetic in this control lane and identifies no positive hermeneutic operator. Newton's 2060 statement is not scored by this tournament because it is a lower bound with an open outcome, not a closed terminal-date prediction.

## Historical-critical sensitivity lane

Ancient texts rarely supply a surviving manuscript witness from before the event they are read against. A second registry therefore keeps source-layer inference separate from manuscript-secure dating. D1 cases have a strongly argued pre-event source layer but later witnesses; D2 cases have date intervals overlapping the event; D4 cases are materially dated by their apparent historical fit.

The v0 sensitivity lane includes Hosea/Israel, Amos/Samaria, Isaiah's Syro-Ephraimite crisis, Nahum/Nineveh, Jeremiah's seventy years, Ezekiel/Tyre and Daniel/Antiochus. Each case encodes at least two rival models and states how adopting each rival changes the score; the alternatives are not merely listed in commentary after the outcome is known. The lane retains positive, partial and adverse cases and computes interval admission without promoting the annotated mean into a success rate. It can test robustness of an interpretation to historical-critical dating assumptions; it cannot substitute for the D0 primary calibration set.

## Claim boundary

The programme presently establishes a schema, an admission audit and a falsifiable route. It does not establish that prophecy predicts future events, that a biblical time-conversion rule is globally valid, that Newton's 2060 lower bound is correct, or that any surviving predictive residue has divine agency.

The executable [programme assessment](../../../evidence/data/prophetic-admissibility-assessment-v0.json) is the v0 decision record. It applies the one frozen empirical ranking actually identified: in the selected modern held-out control, the skeptical exact-terminal null beats arithmetic baselines. The application is therefore `partial-adverse-only`. It removes any evidential bonus for exact terminal arithmetic, preserves Newton's 2060 only as an unweighted lower-bound candidate, and declines to manufacture a positive ranking from the historical-critical sensitivity lane.

