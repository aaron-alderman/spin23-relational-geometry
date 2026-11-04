# Routing selector qualification — 2026-11-04

Selected source remains clean at `dd39e52b7552f9fd1f18730afb460b2f8c6071d5`. No production source, generic export, opcode or original retained test changed in this tranche.

Two additional files now have explicit Sourcery-owned input-contract amendments. All **eight expected assertions and four case names** match their retained originals, checked by Acorn AST comparison in `prepare.cjs`.

| Original | Qualified authored-fact contract | Explicit amendment |
| --- | --- | --- |
| `boot-query-param-algebra.test.mjs` | `bootQueryParamForBoot` | Record becomes fact source plus boot subject. Same `token` result and missing-query-parameter refusal. |
| `route-selector-algebra.test.mjs` | `routeTargetByRole`, `routeTargetBySubject`, `pageRendererSupportsDomSsr` | Target array becomes authored `RouteTarget` facts; separate role/subject APIs replace mode selection. Renderer record becomes `PageRendererContract` facts. Same lookup, empty-selector and hydration-mode expectations. |

These are domain-specific authored route, renderer and PageBoot policies, consistent with `PLATFORM.md` and the shared owner's domain-neutral scope. They are **not** recovered generic operations, generic input equivalence, executable-algebra evidence or deployment certification. Amended tests live in this audit rather than altering the selected source. The original cohort's imports remain recorded in the ledger. Original copies, exact diffs, source hashes, assertion ASTs and input changes are retained here.

## Boundaries and unresolved normalization

The selected APIs reproduce four value expectations from `route-target-normalization-algebra.test.mjs`: trimmed path, trimmed port, path fallback and explicit href. Its fifth assertion requires a mode dispatcher to reject an unknown mode. The selected source exposes separate functions with no mode argument. The file therefore remains unresolved as `blocked-owner-contract-difference`; a new dispatcher was not invented. This joins the previously recorded access-policy default/input difference.

Focused tests also establish explicit owner membership versus type-subject fallback, whitespace selector handling, absent lookup, ambiguous renderer refusal, latest non-negated boot values, callback fault identity and absence of all four generic exports. A `one()`-only boot source object throws `source is not iterable` because PageBoot also reads lane bindings. A source exposing both `one()` and `factsForSubjectPredicate()` works. The first exploratory run used an incomplete source fixture and failed; the final test explicitly retains that failure boundary and checks the complete source interface. No runtime behavior was changed to make the fixture pass.

## Verification and preservation

| Receipt | Passed |
| --- | ---: |
| `routing-tests.txt` | 9/9 |
| `platform-tests.txt` | 60/60 |
| `core-tests.txt` | 71/71 plus source check |
| `shared-algebra-tests.txt` | 99/99 |

All 145 original cohort SHA-256 hashes matched. Platform, Core and shared-algebra repositories remained clean and passed Git connectivity checks. User tracked edits matched the original preservation patch. These are overlapping receipts from one local run, not independent confirmations. The source is unchanged and its existing verified routing bundle remains its preservation witness; this audit preserves the additional tests and metadata transition in the main repository.

The updated cohort has **8 scoped qualified files and 137 unresolved**: 2 unchanged-test ports, 1 existing-runtime qualification, 5 explicit ownership amendments, 90 missing shared-owner contracts, 2 owner/input-contract differences, 38 missing platform-source/export contracts, 4 missing resource contracts and 3 invalid retained files.

The latest full assembly still qualifies `04ded46`, predating the selected source. Missing local histories, semantic residuals, cache generation authority and research-output reproducibility remain separate holds. No source copies, caches or outputs were retired; nothing was pushed or deployed.

## Reproduction and next work

From the main repository root:

```powershell
node tooling/maintenance/routing-selector-qualification-2026-11-04/prepare.cjs
node --test tooling/maintenance/routing-selector-qualification-2026-11-04/*.test.mjs
```

`prepare.cjs` requires the exact clean source and writes only this audit's amended tests/evidence. `finalize.cjs` is an exact-source-gated metadata update requiring all passing receipts and original hashes; its snapshots preserve the preceding record. Do not run against newer source or assembly metadata.

Next review another bounded group from the 90 missing shared-owner contracts. Preserve the two recorded contract differences until the intended input/default/refusal contract is explicitly decided. A full assembly refresh is still required before claiming the latest source has a complete assembly certificate.
