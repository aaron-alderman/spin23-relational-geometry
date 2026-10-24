# Frontier Wave 7.44: Refinement Stability of the Mixed Interface

**Date:** 24 October 2026  
**Status:** exact controlled graph-refinement experiment

## Result

The (A_8) mixed interface is neither a fragile accident nor an invariant of
every imaginable corpus edit. It survives edits that add representation or
redundancy without enlarging joint reachability, and it changes by a precise
rule when genuinely new semantic reach is added.

The [stress register](admissibility_refinement_stress_v1.json) and
[certificate](../../../../verification/verify/verify_admissibility_refinement_stress.mjs)
apply five controlled edits to the 27-relation graph.

| Edit | Cycle effect | Mixed interface | Meaning |
|---|---:|---:|---|
| redundant constructive route | constructive kernel (2\to3) | (A_8) | another route, no new joint reach |
| genuine constructive bridge | mixed rank (8\to9) | (A_9) | a formerly excluded structure becomes jointly reachable |
| internal guardrail | guardrail kernel (2\to3) | (A_8) | another warning, no new joint reach |
| subdivide a constructive edge | node and incidence ranks each rise by one | (A_8) | representational refinement contracts back |
| evidence-only link | none | (A_8) | another carrier cannot silently edit the science graph |

## The stability rule

The interface depends on the connected-component partitions of the
constructive and guardrail subgraphs, not on the number of synonymous paths
inside an existing component. Parallel routes and internal cycles enlarge pure
cycle kernels. They do not enlarge the intersection of incidence images.

Edge subdivision adds a node to one typed component but leaves it isolated in
the other. That coordinate is consequently forced to zero, and the original
interface is recovered after contraction.

A genuine bridge is different. Connecting `QS-001` to the constructive main
component removes one forced-zero coordinate. Because `QS-001` already belongs
to the guardrail main component, the mixed core grows from nine to ten and its
zero-sum lattice grows from (A_8) to (A_9).

## Implication

The correct invariance claim is conditional:

> (I_{\rm mix}) is stable under refinements that preserve the two typed
> component partitions, and changes when new authored relations change joint
> reachability.

This is exactly the behavior wanted from a corpus-derived frontier. Editorial
detail and redundant evidence do not move the scientific boundary. A genuine
new bridge does—and leaves a calculable trace rather than an impressionistic
change of story.

## Reopen test

Any future relation proposed as a bridge into the mixed core should be audited
in three steps:

1. establish that it is a science relation rather than evidence or analogy;
2. verify its constructive or guardrail type on an explicit carrier; and
3. recompute the component partitions and interface lattice.

If it only adds a route within an existing component, (A_8) should survive.
If it joins a formerly isolated component on one side while the other side
already reaches it, the interface should grow by the corresponding zero-sum
direction.
