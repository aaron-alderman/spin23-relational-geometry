# Claimipedia discovery docket: Schur–Herglotz convergence

**Campaign:** `herglotz-convergence-2026-10-17`  
**Review stage:** Triage  
**Disposition:** retain the shared-interface and stratified-sewing proposals for review; reject physical-unification inference  
**Authority:** proposal only; no entailment, empirical confirmation, corpus promotion, or application admission

## Result

Three independently sourced constructions reach the same deliberately weak response interface:

```text
thermal stress ── Ward channels ── two-probe/KMS response ──┐
                                                            │
conserved current ── Ward support inverse ──────────────────┼─> causal-passive
                                                            │   two-face
finite domain wall ── projected resolvent ── Schur boundary ┘   response
```

The common structure is a probe-covariant, matrix-valued, causal-passive response with a positive operator measure and Schur-composition law. The routes do **not** preserve the same physical decorations. Reaching the common interface explicitly discards thermal/KMS meaning, current-polarization meaning, or wall/index meaning.

That makes the result useful as an interoperability seam and unsafe as a unification claim.

## Ranked candidate paths

The score orders review attention only.

| Rank | Route | Score | Path | Principal burden |
|---:|---|---:|---|---|
| 1 | Thermal stress, direct spectral route | 33 | Ward channels → two-probe spectrum → KMS causal lift → common interface | Nine assumptions; loses Ward-null, omitted-channel, KMS and microscopic-stress information |
| 2 | Thermal stress, hydrodynamic route | 30 | Ward channels → hydrodynamic specialization → KMS causal lift → common interface | Prototype normalization and hydrodynamic validity; ten assumptions |
| 3 | Finite domain wall | 27 | projected resolvent → Schur bulk elimination → common interface | Gauge/spinor completion absent; wall/index interpretation is lost |
| 4 | Conserved current | 22 | analytic Ward quotient → common interface | Requires constant support rank and conserved probes; current meaning is lost |

## Proposed insights

### D-01 — A decorated Herglotz interface is the reusable object

**Proposal.** The shared algebra should not identify all responses with one undifferentiated carrier. It should use a small causal-passive Herglotz core decorated by domain-specific obligations:

- `KMS(β)` for equilibrium thermal systems;
- `Ward(N, P_R)` for conserved-current or stress null/support bundles;
- `Index/Wall(Γ, residue)` for domain-wall resolvents;
- pole, threshold and rank-stratum metadata for every route.

**Why it matters.** Schur composition can operate on the core, while a separate rule decides which decorations survive. This is a more reusable architecture than either duplicating three sewing engines or erasing the distinctions that make the results physical.

**Status.** Retain as a design/research proposal. The campaign establishes common core structure in bounded models; it does not yet establish a complete decorated composition algebra.

### D-02 — Singularities require one stratified sewing law

**Proposal.** Ward null modes, hydrodynamic rank changes and wall resolvent poles are three versions of the same implementation hazard: elimination is lawful only on a declared support stratum. Crossing a rank-changing or pole locus must retain the mode, use a measure/residue treatment, or change patches.

**Obscure linkage.** The current route uses a Moore–Penrose inverse on a fixed Ward support; the wall route uses an ordinary inverse away from spectrum; the hydrodynamic route encounters poles and zero modes. Treating these as a shared “support-stratified Schur” problem could prevent silent invalid eliminations across all three domains.

**Status.** Retain for a targeted theorem/implementation experiment. A first executable synthesis certificate now distinguishes fixed Ward nulls, wall poles and rank-changing loci and refuses ordinary inversion at the latter two; it is a contract witness, not yet the general theorem.

### D-03 — KMS is a decoration, not the common carrier

**Proposal.** Equilibrium closure should sit above the passive response layer. A common temperature gives a scalar KMS multiplier and is preserved by the bounded thermal sewing theorem. Unequal temperatures fail that scalar factorization, while a passive response interface may still exist.

**Status.** Retain. The unequal-temperature shortcut was rejected by the live composer and by the independent certificate.

### D-04 — Common carriage does not imply physical coupling

**Rejected inference.** The existence of the same Herglotz–Schur mathematics does not establish a coupling between Standard Model stress response and domain-wall matter, a shared microscopic mechanism, a `Spin(2,3)` dynamics, or empirical novelty.

**Status.** No-go. Any future physical bridge must provide a shared action or portal, matching observables, preserved decorations and a discriminating test.

## Strongest falsifier

Require composition to retain the domain-specific decorations rather than projecting them away. If no nontrivial rule can simultaneously preserve the thermal KMS factor, Ward support bundle, and wall/index data, then the convergence is only generic linear-response mathematics. The current campaign does not pass that stronger test; it explicitly exposes this as its principal information loss.

## Verification

- 11 source documents bound to Claimipedia source-ledger snapshot `6b7c7f…7542`
- 23 source anchors verified
- compiled graph SHA-256 `5b7ad6f6…c575`
- live execution on `host-claim-adapter-v18`, the exact data-only successor of the admitted composer v17
- 4 candidate paths across all 3 queries
- unequal-temperature shortcut rejected
- 10 independent route certificates and 1 new cross-domain synthesis certificate passed
- campaign regression tests: 5/5 passed
- verification receipt SHA-256 `6039b529…6d34`
- discovery docket SHA-256 `08d98c40…54dd`

## Recommended Triage actions

1. **Retain D-01** as a typed-algebra design question.
2. **Retain D-02** as the highest-value theorem and implementation target.
3. **Retain D-03** as an explicit equilibrium/non-equilibrium boundary.
4. **Record D-04 as a no-go guard** against unification-by-shared-mathematics.
5. Do not promote any item until a reviewer checks the quoted source anchors and the decoration-preservation question.

## Process continuation

D-02 is now instantiated as the first use case of the reusable option-preserving lightning-strike method in `../../integrations/claimipedia/research-method/`. The method keeps eight explanatory layers separate, retains fifteen alternatives across four decision points, records six scoped symmetry families and turns the proposal into a continuous nine-link falsifiable chain.

