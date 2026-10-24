# Frontier Wave 7.39: The Mixed Interface Is an A8 Transfer Lattice

**Date:** 24 October 2026  
**Status:** exact graph-and-integral-lattice result; physical and exceptional interpretations remain open

## Result

The eight-dimensional mixed interface in the 27-relation quotient-scar graph
is no longer only a dimension count.  Relative to the registered
constructive/guardrail split, its integral form is exactly the root lattice

\[
\boxed{I_{\rm mix}(Q_{\rm QS}^{(1)})\cong A_8.}
\]

This is not an octonion identification.  It is a simpler and more definite
object: the zero-sum transfer lattice on nine corpus structures that can be
reached through both constructive and guardrail vocabularies.

The machine-readable source is the
[mixed-interface register](mixed_admissibility_interface_v1.json), and the
[certificate](../../../../verification/verify/verify_mixed_admissibility_interface_resolution.mjs)
reconstructs every statement below from the quotient-scar register.

## Why nine objects survive

The constructive subgraph has one eleven-vertex connected component and five
isolated vertices.  An integral vector in its incidence image must therefore
vanish on `QS-001`, `QS-003`, `QS-004`, `QS-005` and `QS-007`, and must sum to
zero on the large component.

The guardrail subgraph has one fourteen-vertex connected component and the two
isolated vertices `QS-006` and `QS-008`.  Its incidence image must vanish on
those two vertices and sum to zero on its large component.

Their intersection consequently vanishes on seven vertices and is supported
on the **Mixed Core Nine**:

| Order | Structure | Plain-language role |
|---:|---|---|
| 1 | `QS-002` | detector folding with hidden-state loss |
| 2 | `QS-009` | coherent projector holonomy |
| 3 | `QS-010` | retained boundary memory |
| 4 | `QS-011` | memory promoted into a wall |
| 5 | `QS-012` | wall-localized response |
| 6 | `QS-013` | overlap and its missing orientation |
| 7 | `QS-014` | three-record detector |
| 8 | `QS-015` | wall-conditioned oriented selector |
| 9 | `QS-016` | coefficient provenance boundary |

The only remaining constraint is zero total coordinate sum.  Therefore

\[
I_{\rm mix}(\mathbb Z)
=\{x\in\mathbb Z^9:\sum_i x_i=0\},
\]

which is the standard integral realization of (A_8).

## The eight named transfers

Ordering the core by source identifier gives the simple-root basis

\[
\alpha_i=e_i-e_{i+1},\qquad i=1,\ldots,8.
\]

| Basis | Name | What is balanced |
|---|---|---|
| A01 | detector–holonomy exchange | information-losing detection against coherent return |
| A02 | holonomy–memory exchange | transported frame against retained history |
| A03 | memory–wall exchange | stored history against spatialized record |
| A04 | wall–response exchange | material boundary against localized response |
| A05 | response–overlap exchange | effective selection against projective invariant |
| A06 | overlap–detector exchange | invariant coordinate against operational readout |
| A07 | detector–selector exchange | measured record against oriented selection |
| A08 | selector–provenance exchange | successful effective behavior against its source |

Each row is genuinely mixed.  The register supplies a signed constructive
path and a signed guardrail path with the same boundary.  Subtracting those
paths gives a closed cycle in the full graph.  Neither vocabulary alone fixes
which representative should stand for the quotient class; the shared boundary
does.

## Pairing, index and composition

With the equal-weight vertex counting metric, the basis Gram matrix is the
(A_8) Cartan matrix: diagonal entries two, adjacent entries minus one and all
other entries zero.  It is positive definite with

\[
\det G=9,
\qquad A_8^*/A_8\cong\mathbb Z/9\mathbb Z,
\qquad \min\|x\|^2=2,
\]

and 72 minimum vectors.  Thus the interface is integral but not unimodular.
It cannot be the Leech lattice and its eight dimensions do not by themselves
supply an octonionic carrier.

The abstract zero-sum coordinate model does possess definite operations.  Its
quadratic pairing is

\[
p_2(x,y)=\sum_i x_i y_i,
\]

and it has the permutation-invariant cubic

\[
p_3(x)=\sum_i x_i^3.
\]

Polarizing the cubic gives the commutative projected product

\[
(x\star y)_i=x_i y_i-\frac1{9}\sum_jx_jy_j.
\]

This product is closed on the real zero-sum space, but it is not a Jordan
product: the certificate gives an exact Jordan-identity counterexample.
The abstract coordinate construction admits (S_9) permutations, but the
typed graph does not thereby acquire an (S_9) physical symmetry.  The
pairing and cubic describe the interface carrier; they do not yet prescribe a
physical dynamics.

## What this changes

The former analogy—“there is an eight-dimensional mixed object, perhaps it is
an exceptional slot”—can now be replaced by a named theorem:

> The graph's constructive and critical languages overlap on an (A_8)
> transfer lattice carried by nine structures from detector loss through
> provenance.

This makes the interface useful without inflating it.  A proposed end-to-end
derivation can be assigned an (A_8) transfer coordinate.  Failure to balance
the nine coordinates identifies where a route leaves the jointly realizable
region.  The closed wall–response loop uses A03 and A04.  The deliberately
open selection–memory–holonomy loop contains A02 but passes through the
forced-zero projection node `QS-008`; that is exactly where an orientation
datum must enter rather than being inferred from the interface lattice.

## Open boundary

The result does not establish:

- a physical (A_8) symmetry;
- an octonion multiplication, (E_8), (E_6), Leech or Golay carrier;
- a preferred energy, time evolution or probability measure on the lattice;
- equality between a graph transfer and a laboratory-conserved quantity.

Those require explicit cross-carrier maps.  What is now closed is the finite
graph question: the mixed interface's integral shape, natural pairing,
discriminant and simplest source-native cubic are known.
