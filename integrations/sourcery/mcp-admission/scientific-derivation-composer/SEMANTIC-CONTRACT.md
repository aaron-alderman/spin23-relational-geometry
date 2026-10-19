# Scientific Derivation Composer

## Purpose

The composer turns a provenance-bearing scientific claim graph into a bounded set of **derived claim proposals**. It is a search and bookkeeping capability, not a theorem prover, empirical validator, truth oracle, or corpus-admission mechanism.

Its intended use in Claimipedia is to expose long, cross-domain chains that a person may not think to inspect manually, while making every join auditable and every loss of information visible.

## Semantic objects

### `ScientificObjectSignature`

A scientific object is identified by `id` and typed by a signature with these dimensions:

- `domain`: what mathematical or physical space the object inhabits;
- `rank` and `variance`: tensor or matrix shape;
- `basis`: representation or probe basis;
- `regime`: such as off-shell Euclidean or vacuum Lorentzian;
- `order`: perturbative or renormalization order;
- `scheme`: subtraction or renormalization scheme;
- `symmetry`: enforced symmetry and Ward constraints;
- `cp`: CP sector;
- `support`: local, nonlocal, or spectral support.

Each object also carries a `dimension` record: a named SI-base exponent vector
with coordinates `mass`, `length`, `time`, `current`, `temperature`, `amount`,
and `luminousIntensity`. For example, stress has mass exponent 1, length exponent
-1, and time exponent -2. Named coordinates make rejection receipts identify the
physical ruler involved instead of relying on an opaque array position.

These dimensions are deliberately explicit. A transformation may change one only when it lists that dimension in `changes`.

### `ScientificTransformation`

A transformation is a directed, evidence-bearing edge with:

- exact `from` and `to` object identities;
- exact endpoint signatures;
- a named operation `kind`;
- declared `changes`, `assumptions`, and irreversible `losses`;
- `evidenceRefs` supporting use of the edge;
- an analogy firewall;
- explicit proposal-only authority.

Every edge additionally declares `dimensionRule: si-base-exponent-delta`, exact
`fromDimension` and `toDimension` records, and a `dimensionDelta`. The composer
checks both endpoint dimensions against their objects and checks, coordinate by
coordinate, that `toDimension = fromDimension + dimensionDelta`. A nonzero change
must also be named in `changes`. Missing, unknown, stale, or arithmetically invalid
dimension metadata rejects the edge and remains visible in the rejection receipt.

An edge is admissible to path search only if both endpoints exist uniquely, both signatures match the corresponding objects, all context changes are declared, evidence is present, projections declare losses, analytic continuation declares removal of local contact polynomials, and authority remains non-entailing and non-empirical.

### `DerivationCandidate`

A candidate is a source-to-target path no longer than `maxDepth`. It contains the ordered transformation IDs and the distinct union of assumptions, losses, and evidence references accumulated along the path.

The candidate status is always `derived-claim-proposal`. It carries no empirical authority and performs no application or corpus admission.

### `VerificationReceipt`

Every run reports the depth bound, graph sizes, valid transformation count, candidate count, rejected transformation checks, and unexplored frontier. Rejected edges remain visible as counterevidence rather than disappearing from the result.

## Claimipedia workbench projection

A thin workbench needs only one request and four result panes:

1. **Query** — choose source, target, and bounded depth.
2. **Candidate paths** — ordered edges for each proposed chain.
3. **Assumption/loss ledger** — accumulated assumptions and irreversible information losses per path.
4. **Rejection and authority receipt** — invalid edges with failed checks, remaining frontier, and the fixed non-entailment flags.

The workbench may let a researcher promote a candidate into Claimipedia's ordinary review lifecycle, but it must not promote it automatically. Review, evidence adjudication, empirical comparison, and corpus admission remain separate authority-bearing acts.

## Standard Model pilot

The bundled pilot composes:

`curved-space action -> Hilbert stress tensor -> conserved Lorentz quotient -> two-probe response -> spectral response`

It deliberately includes canonical and rotated probe bases, plus negative fixtures for rank mismatch, contact-term unsafety, undeclared context changes, analogy-only linkage, and an independently dimensionally invalid edge. The two successful paths therefore demonstrate basis-covariant discovery while preserving the loss of subtraction-polynomial information. The action-to-stress edge also demonstrates a real nonzero dimension delta; later projections preserve the declared stress dimension.

This pilot re-expresses evidence already present in the repository. It is not a claim of new physics and does not privilege Spin(2,3) or any other speculative framework.

## Non-claims and frontiers

- Path existence does not establish semantic truth, physical realizability, novelty, or usefulness.
- Bounded search is incomplete by construction.
- Signature equality is structural compatibility, not a proof of equivalence.
- Evidence references are provenance pointers, not evidence-quality judgments.
- Dimensional analysis currently proves only consistency of declared SI-base exponent deltas. It does not parse unit strings, convert scales or affine units, infer dimensions from formulas, or establish that a chosen physical dimension convention is correct.
- The current algebra does not perform symbolic theorem proving, uncertainty propagation, numerical fitting, or literature retrieval.
- Analogy may suggest a separately reviewed transformation, but cannot itself enter an accepted derivation path.
