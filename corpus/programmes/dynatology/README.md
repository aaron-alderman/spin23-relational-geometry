# Dynatology Programme

Dynatology is the corpus-wide investigation ontology for structured physical possibility.

It asks:

> What can become actual, under which admissibility conditions, through which transformations, and with which observable residue of the alternatives?

It does not replace physics, ontology, dynamics, optimization or modal logic. It provides a typed language for connecting them without treating possibility, realizability and observation as synonyms.

## Canonical documents

1. [Ontology and scope](dynatology_00_ontology_and_scope.md) defines the object
   \[
   \mathfrak D=(X,A,T,J,\rho,L,D,I,R)
   \]
   and its interpretation.
2. [Investigation protocol](dynatology_01_investigation_protocol.md) turns that object into a reusable research card, evidence ladder and stop rule.
3. [Corpus crosswalk](dynatology_02_corpus_crosswalk.md) organizes existing programmes by dynatological function without moving or reclassifying their source documents.
4. [Machine-readable register](dynatology_register_v1.json) records representative instantiated investigations.

## Relation to neighbouring programmes

- [Admissibility](../admissibility/admissibility_00_foundational_programme.md) determines which states, maps and records are physically legitimate.
- [Quotient scars](../quotient-scars/README.md) classify what is erased, retained or recoverable under a declared reduction.
- [Frontier physics targets](../frontier-physics-targets/README.md) connect the ontology to calculations, apparatus and kill tests.
- [Closure](../closure/programme_closure_manifest.json) records where a route ends at a theorem, no-go, external datum or new-model requirement.

Dynatology is therefore an overlay. It does not change the epistemic status of any source claim and does not assert that structurally similar carriers are physically identical.

## Verification

Run:

```text
node verification/verify/verify_dynatology_register.mjs
```

