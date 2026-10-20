# A Balanced Finite Chiral Carrier Has Zero Index, So the Three-Family Kernel Is Not Yet Topological

> **Subsequent minimal escape (claim 1583).** The third power of the backward unilateral shift has index three and a three-dimensional kernel carrying the regular Z3 action. Tensoring with the Spin(10) 16 gives equivariant index class (3[16]), providing an exact topological ansatz but not yet a physical defect lift. See [1583](1583_a_third_power_fredholm_shift_gives_an_exact_index_three_z3_family_carrier.md).

**Date:** 20 October 2026

**Gates:** A2, A4 and A5

**Status:** exact finite-dimensional index obstruction and minimal escape criterion

**Depends on:** [the Z3 three-family E6 kernel](1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md)

**Evidence:** [finite-index ledger](../../../evidence/data/spin23-balanced-finite-index-obstruction.json) and [deterministic verifier](../../../verification/verify/verify_spin23_balanced_finite_index_obstruction.mjs)

## Result

The current \(48=3\times16\) chiral kernel is a rank-selection result, not
yet a topological index theorem.

For any finite chiral block

\[
D_+:H_+\longrightarrow H_-,
\]

rank--nullity gives

\[
\begin{aligned}
\operatorname{ind}D_+
&=\dim\ker D_+-\dim\ker D_+^\dagger\\
&=(\dim H_+-r)-(\dim H_--r)\\
&=\dim H_+-\dim H_-.
\end{aligned}
\]

Consequently every balanced finite carrier with
\(\dim H_+=\dim H_-\) has index zero, independently of its entries and
independently of a Z3 action.  A 48-dimensional mass kernel inside a
balanced real-completed carrier therefore does not imply index three.

The smallest finite dimensional witness of index three is unbalanced: a
full-rank map

\[
D_+:\mathbb C^{51}\longrightarrow\mathbb C^{48}
\]

has a three-dimensional kernel, zero cokernel and index three.  For three
full Spin(10) families the multiplicity must be combined with the internal
16-dimensional representation carefully; the displayed witness fixes the
family index, not the total number of component zero modes.

## What topology must add

A genuine topological derivation of three families now has three sharply
typed routes:

1. an unbalanced graded carrier whose index is three;
2. an infinite-dimensional Fredholm or domain-wall Dirac operator;
3. a gauge/gravitational bundle background whose index density integrates
   to three.

The third route would require an explicit characteristic-class formula,
boundary conditions and anomaly audit.  Merely identifying an A2 orbit,
three defects, or a ternary code is not sufficient.

The positive content of claim 1575 remains: three supplied physical
families solve the frame-compression problem and leave three chiral 16s.
Claim 1579 isolates the additional object required to *explain why three*.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_balanced_finite_index_obstruction.mjs
~~~
