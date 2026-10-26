# Programme Algebra Parallel Lane

**Date:** 26 October 2026

**Status:** parallel compilation lane; complete structural projection, partial epistemic, route, empirical-return and scientific admission

**Authority:** the existing corpus remains canonical; this lane may not replace or promote it without an explicit later decision

## Purpose

This lane expresses the science programme through the same compositional grammar
used by Sourcery's `common-algebra-2` work. It is deliberately parallel to the
existing corpus. Its first job is to reveal whether an algebraic representation
can preserve more structure, provenance and refusal information than the
current filesystem-and-link projection before it is considered as a replacement.

The compilation route is:

\[
\text{canonical corpus sources}
\longrightarrow
\text{typed programme algebra}
\longrightarrow
\text{receipts, navigation and generated readings}.
\]

The generated algebra is not another editable source of truth. Corpus Markdown
remains canonical for prose, argument and explanation. Authored algebra
declarations remain canonical for object identities, profiles and admitted
transformations. Generated JSON and reports are disposable projections of those
two source classes.

## Six depths of conversion

1. **Structural projection.** Every retained corpus Markdown document, JSON
   ledger and image becomes a hash-bound object. Every Markdown heading and
   bounded semantic unit receives its own address. Containment and explicit
   links become observed relations. This layer is complete by construction.
2. **Epistemic projection.** Declared status, date, evidence, parent, continuation,
   source, generator and verifier fields become typed coordinates or relations.
   Missing declarations remain visible as missing; the compiler does not invent
   them.
3. **Scientific admission.** A movement is a scientific transformation only when
   its endpoint signatures, changed coordinates, dimensions, assumptions,
   losses, evidence and authority pass the common-algebra gates. The four D02
   families are the initial admitted seed. Ordinary Markdown links never become
   scientific transformations merely because they connect scientific prose.
4. **Research-state transformations.** An explicit `Parent` declaration may
   become a proposal-only epistemic transformation when both documents exist,
   the target has a declared status, evidence is attached and every changed
   kernel coordinate is named. Failed candidates remain refusal records.
5. **Composed routes.** Maximal parent chains are composed into bounded ALE
   receipts: assumptions, losses and evidence travel with the route. One failed
   edge, a cycle or a depth overflow rejects the whole route without erasing it.
6. **Empirical return.** Experiment-shaped records are normalized to preparation,
   intervention, detector, nuisance model, record and decision rule. A complete
   six-field packet means the proposed protocol closes syntactically; it does
   not mean the experiment ran or its hypothesis was confirmed.

## Shared kernel and profiles

Every object carries the twelve-coordinate epistemic kernel

\[
(K,D,R,C,F,S,G,E,U,P,A,T),
\]

meaning kind, domain, role, context, form, status, governing scheme,
equivalence, admissibility, support, authority and time. Domain profiles extend
that kernel without changing its meanings. The initial profiles are declared in
[`programme_algebra_profiles_v1.json`](programme_algebra_profiles_v1.json).
Machine-record schema views and their deliberately provisional matching rules
are declared separately in
[`programme_algebra_adapters_v1.json`](programme_algebra_adapters_v1.json).

This is a family of typed categories, not one forced vector algebra. Scientific,
mathematical, physical, experimental, epistemic and governance objects may
compose internally under profile rules. A cross-profile passage is partial and
must retain its assumptions, losses, evidence, falsifier and authority ceiling.

## Generated outputs

Run:

~~~powershell
node tooling/programme-algebra/compile_programme_algebra.mjs --write
node verification/admissibility/verify_programme_algebra_parallel_lane.mjs
~~~

The compiler writes:

- `generated/programme_algebra_v1.json` — the inspectable manifest, source
  identities, counts, coverage and archive hashes;
- `generated/programme_algebra_records_v1.json.gz` — the deterministic complete
  machine-readable projection and admission receipts, compressed to avoid
  repeating the twelve-coordinate kernel tens of thousands of times. This
  disposable archive is intentionally ignored by Git and is regenerated
  locally or in CI; its exact hashes and sizes remain in the tracked manifest;
- `generated/PROGRAMME_ALGEBRA_COVERAGE.md` — the human-readable coverage and
  boundary report.

Running without `--write` performs the same compilation and prints the summary
without changing files.

## Replacement gate

This lane may replace any part of the existing corpus only after it demonstrates:

1. lossless source identity and stable object identity;
2. no silent status, authority or evidence promotion;
3. explicit failure on stale or mismatched endpoint signatures;
4. strictly better retrieval or reasoning on held-out tasks;
5. readable generated journeys for humans;
6. reproducible compilation without a live Claimipedia or Sourcery service; and
7. an explicit migration and rollback decision.

Until those gates close, the lane is an instrument for examining the corpus,
not its successor.
