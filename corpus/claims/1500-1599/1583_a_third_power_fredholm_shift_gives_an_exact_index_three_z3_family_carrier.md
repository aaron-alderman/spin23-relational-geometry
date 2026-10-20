# A Third-Power Fredholm Shift Gives an Exact Index-Three Z3 Family Carrier

> **Subsequent quantum-parent bridge (claim 1584).** Stone--von Neumann makes the regular irreducible finite-mode Weyl representation unique, while the nonzero family index arises only after Hardy/selector compression of a bilateral unitary parent. This locates family multiplicity in topology and boundary selection rather than inequivalent regular quantizations. See [1584](1584_stone_von_neumann_fixes_the_regular_quantum_parent_while_index_three_requires_selector_compression.md).

**Date:** 20 October 2026

**Gates:** A1, A2, A4 and A5

**Status:** minimal exact topological ansatz; physical Spin(2,3)/E6 lift remains open

**Depends on:** [the balanced finite-index obstruction](1579_a_balanced_finite_chiral_carrier_has_zero_index_so_the_three_family_kernel_is_not_yet_topological.md) and [the Z3 E6 family frame](1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md)

**Evidence:** [index-three Fredholm ledger](../../../evidence/data/spin23-z3-index-three-fredholm-shift.json) and [deterministic verifier](../../../verification/verify/verify_spin23_z3_index_three_fredholm_shift.mjs)

## Result

The first minimal topological carrier that exactly matches the three-family
multiplicity is explicit.

Let \(B\) be the backward unilateral shift on \(\ell^2(\mathbb N)\):

\[
Be_0=0,
\qquad Be_n=e_{n-1}\quad(n\ge1).
\]

Then

\[
\ker B^3=\operatorname{span}\{e_0,e_1,e_2\},
\qquad\operatorname{coker}B^3=0,
\]

so

\[
\boxed{\operatorname{ind}B^3=3.}
\]

Write the basis as \(e_{3n+r}\) with \(r\in\mathbb Z_3\), and define

\[
Pe_{3n+r}=e_{3n+(r+1\bmod3)}.
\]

Because \(B^3\) lowers \(n\) while preserving \(r\),

\[
[B^3,P]=0.
\]

The three zero modes therefore carry the regular representation of Z3.
Tensoring with the Spin(10) chiral representation gives

\[
D_+=B^3\otimes\mathbf1_{16},
\qquad
\ker D_+\cong\mathbb C^3\otimes16,
\]

with component kernel dimension 48 and equivariant index class

\[
\boxed{3[16].}
\]

This is the exact topological analogue of the rank-48 kernel in claim 1575.

## What has and has not converged

The construction escapes claim 1579 because a Fredholm operator is not a
balanced finite square matrix. It simultaneously supplies:

1. family index three;
2. a canonical three-state kernel;
3. a commuting Z3 family action; and
4. the correct \(3\times16\) multiplicity after the Spin(10) tensor lift.

It does not yet derive:

- the physical origin of the half-infinite shift direction;
- a localized domain wall, extra dimension or relational filtration that
  realizes \(B\);
- the two-copy E6 Yukawa matrices \(Y_0,Y_1\);
- the Spin(2,3) selector action; or
- a local four-dimensional kinetic operator.

The nearest physical lifts are a Toeplitz boundary operator, a domain-wall
Dirac operator, or a graded relation chain whose asymptotic translation is
\(B\). Any lift must reproduce the E6 frame on the three-dimensional kernel
and retain the index under allowed perturbations.

## Spin(2,3) role

The shift supplies family topology, not spacetime geometry. A real joining
would require the Spin(2,3) selector to create or grade the defect normal
direction while its kernel carries the E6 16. The finite target is now
precise: compress the physical Yukawa/source operators to
\(\ker(B^3\otimes1_{16})\) and recover the Z3 Parseval pair of claim 1575.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_z3_index_three_fredholm_shift.mjs
~~~
