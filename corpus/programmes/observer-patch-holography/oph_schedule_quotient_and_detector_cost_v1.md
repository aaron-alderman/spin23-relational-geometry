# OPH schedule quotient and detector cost

**Date:** 27 October 2026  
**Status:** complete for the three-record adjacent witness  
**Topic:** OT-055  
**Evidence:** [quotient census](../../../evidence/data/oph-schedule-quotient-census-v1.json)  
**Verification:** `node verification/admissibility/verify_oph_schedule_quotient_census.mjs`

## Result

Yes: a declared detector quotient can erase the adjacent-order witness without erasing the four named record-law distinctions. But this is not confluence. It works by refusing to remember which of two non-common endpoints carried the current.

For the minimal diagonal witness, the two schedules produce

\[
P_F=(1/2,1/2,0),\qquad P_R=(1/2,1/4,1/4).
\]

The three labels are the outcome shared by both schedules, the forward endpoint and the reverse endpoint. There are exactly five deterministic partitions of three labels. Exhaustive enumeration gives a simple result:

> A quotient makes the two pushed-forward distributions equal if and only if it identifies the forward and reverse endpoints.

Two of the five partitions do that: the indiscrete one-label quotient and the nontrivial two-label quotient

\[
\{\text{shared}\},\quad
\{\text{forward endpoint},\text{reverse endpoint}\}.
\]

The latter retains whether the outcome is common or non-common, but discards which non-common endpoint occurred.

## What survives

The law detector does not need that endpoint label. Its two independent coordinates are the phase-sensitive `g` probe and the empty--full `k` probe:

| law | `g` | `k` |
|---|---:|---:|
| `C0` | `1/sqrt(2)` | `1` |
| `C` | `1/2` | `1` |
| `E` | `0` | `1` |
| `T` | `0` | `0` |

All four pairs are distinct. A product detector can therefore coarsen only the schedule-record coordinate while retaining `g` and `k`. In that precise sense the answer to OT-055's quotient question is positive.

## What is paid

Before quotienting, an equally weighted unknown schedule leaves a positive mutual information between schedule and record. After either order-erasing quotient that information is exactly zero. The quotient has not reconciled the two repair maps; it has removed the observation that distinguished them.

This matters for the corpus's detector language. Local closure can hold at one resolution and fail at another. A detector can make a process appear closed by discarding orientation, endpoint, phase, timing or memory. Such closure is valid only with the quotient written beside it.

## Open and closed implications

**Closed:** the minimal adjacent witness admits an order-erasing detector quotient; the quotient condition is completely classified; the named `g/k` law detector can survive in a separate retained coordinate.

**Open:** whether a physically natural apparatus implements this product factorization; whether the complete process tensor has further order witnesses outside the three-record statistic; and whether any operational task benefits from erasing endpoint identity while retaining phase-law identity.

The result therefore changes no channel theorem. Adjacent repair maps still fail to commute. It does sharpen the experiment: publish both the fine record and every declared quotient. If apparent closure appears only after endpoint identification, report it as detector-relative closure rather than global closure.
