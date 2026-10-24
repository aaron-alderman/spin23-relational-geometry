# The Jordan-face involution does not lift through the path memory

**Date:** 25 October 2026

**Status:** ordinary transpose and typed edge-reversal routes exhausted on the predecessor-closed carrier

**Topic:** OT-026

**Evidence:** [involution-lift audit](../../../evidence/data/relation-jordan-involution-lift-audit-v1.json)

**Generator:** [exact lift analyzer](../../../scripts/run-relation-jordan-involution-lift-audit.py)

**Verifier:** [lift no-go certificate](../../../verification/admissibility/verify_relation_jordan_involution_lift_audit.mjs)

## Result

AZ-111 found an exact $H_2(\mathbb Q)$ Jordan face after the 30-dimensional path radical was removed from the 15-node relation algebra. AZ-112 asks the necessary reverse question: was the transpose that selected that face already present on the full typed graph?

It was not. The predecessor-closed carrier contains 17 relationship records and generates a 35-dimensional associative algebra. The transpose of each of its four aggregate generators—`Challenges`, `DependsOn`, `Qualifies` and `Supports`—raises the exact rational span by one dimension. None belongs to the generated algebra. The full algebra is therefore not closed under ordinary matrix transpose.

The record-level test is even more direct. Every one of the 24 permutations of the four relation labels was applied while reversing every edge. The best rule recovers only two of the 17 records: the Spin--Temple pair. No global typed edge reversal exists.

In plain language, the graph contains one reversible conversation inside a much larger one-way ecology of reasons. Once the one-way histories are erased, the surviving conversation can be read as a symmetric two-channel response. Before erasure, there is no graph-wide operation that turns every reason around while staying inside the authored relation system.

## What closed

- ordinary transpose does not preserve the full 35-dimensional relation algebra;
- no permutation of the four relation labels makes edge reversal a global symmetry;
- the exact Jordan face is quotient-local rather than the fixed space of a hidden full-graph involution;
- the obstruction is carried by the directed path-memory radical, not by a failed Jordan identity on the local face.

## What remains open

The result does not prove that no useful involution or positive order can exist. It excludes the two canonical free choices. A reopening now needs new information:

- an authored dagger or order relation with provenance;
- a nonlocal weighted anti-automorphism built from evidence or programme records;
- new reverse records that genuinely change the strongly connected structure; or
- a held-out composition or physical observable that selects one candidate order over the others.

## Implication and look-here instruction

This strengthens the Jordan--Lie balance rather than weakening it. The Jordan face is real, but admission is doing substantive work: it decides which directional history may be forgotten and which symmetric combination may count as a positive possibility. Lie-style reversible transport does not automatically supply that decision.

OT-026 remains gated. The next valid move must add a reason, not another basis choice. Define the reversal or order before taking the quotient, retain its provenance, and ask it to predict a record not used in its construction. If it succeeds, the graph-to-Jordan bridge becomes explanatory. If it does not, the local $H_2$ face remains a mathematically exact summary of one reversible corner.

## Reproduction

~~~powershell
python scripts/run-relation-jordan-involution-lift-audit.py --write
node verification/admissibility/verify_relation_jordan_involution_lift_audit.mjs
~~~
