# Negative Results and Reopening Ledger

**Date:** 28 October 2026

**Status:** canonical corpus-wide discipline; initial admitted seed and candidate scan

## Purpose

A negative result is scientific content only when its scope survives retelling.
“It failed” can mean a software defect, a parameter-dependent obstruction, an
exact no-go theorem or a test that simply lacked information. Collapsing those
outcomes either kills viable routes or repeatedly resurrects closed ones.

This lane gives negative knowledge the same durable structure as positive
claims. It complements the existing
[programme no-go atlas](../../registers/programme/programme_no_go_atlas.json):
that atlas records the first failed bridge on six end-to-end Spin(2,3) routes;
this ledger can admit negative results from any corpus programme at the
granularity of an individual test, calculation, detector or implementation.

## Canonical artifacts

1. [Negative-result schema](negative_result_schema_v1.md) defines the four
   classifications, evidence burden, lifecycle and reopening semantics.
2. [Admitted negative-result register](negative_result_register_v1.json)
   records scoped results with evidence, non-inferences and reopening data.
3. [Candidate scan](../../../evidence/data/negative-result-candidate-scan-v1.json)
   finds language that may deserve adjudication but never auto-promotes text
   into a no-go.
4. [Register verifier](../../../verification/verify/verify_negative_result_register.mjs)
   enforces classification, evidence, scope and reopening requirements.

## Core rule

Every admitted negative record answers:

1. What exact claim was tested?
2. Was the test adequate for that claim?
3. What assumptions and parameter domain were active?
4. What was observed or proved?
5. What inference is licensed?
6. What stronger inference is explicitly refused?
7. What cheapest new datum or changed assumption can reopen the route?
8. Has the result subsequently been reopened, superseded or retracted?

Negative records are append-only in identity. A later repair changes lifecycle
and links a successor; it does not erase the earlier obstruction.

## Initial finding

The seed register exposes a recurring pattern. Several apparent failures are
really **detector-rank failures**:

- extra thermal and photorefractive state variables remain unresolved through
  one scalar lock record;
- scalar impedance can hide a moving dark eigenspace;
- scalar transfer cannot identify an unobservable internal mode;
- detector clipping destroys amplitude information.

This is directly relevant to the corpus grammar. A larger carrier does not
create a richer detector. The missing relation is often an additional port,
phase reference, designed excitation or matrix-valued residue.

## Workflow

1. Run the candidate scan after a substantial research tranche.
2. Humanly adjudicate candidates against the schema.
3. Admit only records with source evidence and an authority ceiling.
4. Link any repair as a reopening rather than rewriting history.
5. Use retained negatives when planning experiments and retrieval, so failed
   routes become constraints rather than forgotten anecdotes.

Run:

```powershell
node scripts/generate-negative-result-candidate-scan.mjs --write
node verification/verify/verify_negative_result_register.mjs
```
