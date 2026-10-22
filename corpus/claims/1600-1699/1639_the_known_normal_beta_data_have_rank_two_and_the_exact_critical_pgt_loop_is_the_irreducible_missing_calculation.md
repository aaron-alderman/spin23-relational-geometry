# The Known Normal Beta Data Have Rank Two, and the Exact Critical-PGT Loop Is the Irreducible Missing Calculation

> **Update (claims 1672--1674):** the complete packet quadratic axial
> response is now known and proves nonclosure through nonzero \(RS^2\) and
> \(R_{\mu\nu}S^\mu S^\nu\) poles.  Its five-dimensional response-design
> rank is not the rank of the eight-coordinate normal map.  Until the six
> covariant curvature invariants are expanded and quotiented in the packet
> conventions, the embedded displayed-normal information rank below remains
> two; claim 1674 gives the updated boundary.

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact information-rank, fixed-surface and operator-closure audit; specifies the irreducible missing quantum calculation

**Depends on:** [the healthy-matter sign obstruction](1638_healthy_matter_and_anomaly_completion_can_only_increase_the_weyl_counterterm_obstruction.md), [the BRST counterterm audit](1636_the_local_brst_counterterm_cohomology_defeats_every_commuting_copy_symmetry_completion.md), and [the classical critical PGT sector](1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md)

**Evidence:** [normal-beta ledger](../../../evidence/data/spin23-critical-pgt-normal-beta-information-rank-v1.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_normal_beta_information_rank.mjs)

## Result

The present repository does not contain enough quantum information to decide
whether the interacting graviton--torsion--ghost sector accidentally cancels
the known matter obstruction. In the ten-coordinate quadratic presentation
of claim 1636, the target surface has eight displayed normal directions. The
exact target-field calculation fixes only two independent normal components:

\[
 \beta_{C^2}^{(0^-)}={1\over120(4\pi)^2},\qquad
 \beta_{R^2}^{(0^-)}={1\over72(4\pi)^2}
\]

for the minimally coupled pseudoscalar representative. The known-data map into
the eight-dimensional normal space therefore has rank two and deficiency six.

This is already enough to reject the sparse surface when the scalar
determinant is considered alone. It is not enough to prove that the complete
gauge-fixed one-loop sum cannot cancel those two entries. Metric-gravity
coefficients, results from a different PGT action, or a toy asymptotic-safety
flow cannot be substituted for the exact first-order critical Hessian.

Moreover, the eight-coordinate problem is only the first closure shell.
Explicit one-loop work in a simpler PGT generates all curvature-square terms,
derivative-torsion and mixed operators, and higher curvature powers. The exact
critical theory may have cancellations due to its degenerate constraint
structure, but they must be computed. Thus the irreducible missing object is
not one number: it is the gauge-fixed divergent functional of the complete
critical action, reduced modulo BRST-exact, topological and field-redefinition
terms.

## Normal-coordinate audit

Retain the counterterm-adapted coordinates

\[
 g=(t_1,t_2,t_3,c_C,c_R,c_X,c_4,c_5,c_6,z_q)
\]

and the eight normal equations

\[
\begin{aligned}
n_1&=2t_1+t_2,&n_2&=t_1+2t_3,\\
n_3&=c_C,&n_4&=c_R,\\
n_5&=c_4,&n_6&=c_5,&n_7&=c_6,&n_8&=z_q.
\end{aligned}
\]

For the fixed-spurion theory \(z_q\) is absent rather than a running coupling;
for the gauged-copy completion it is present and \(z_q=0\) is required to
avoid an extra vector. Keeping it in the joined audit makes the branch
dependence explicit.

The unconditional calculated normal data for the exact low-energy physical
content span

\[
 K=\operatorname{span}\{e_{C^2},e_{R^2}\},
\qquad \operatorname{rank}K=2.
\]

The following remain unknown for the exact critical action:

- both torsion-relation beta combinations \(n_1,n_2\);
- the graviton, contorsion and ghost contributions to \(n_3,n_4\);
- all three complementary curvature/torsion-derivative directions
  \(n_5,n_6,n_7\); and
- the copy kinetic direction \(n_8\) in the gauged branch.

The fermion portal supplies a conditional nonzero transverse-axial direction,
but introducing that matter changes the theory and does not complete the
remaining matrix.

## Why nearby calculations do not fill the matrix

Pure metric Einstein gravity has a different field space and gauge Hessian.
The critical PGT has an independent 24-component Lorentz connection,
second-class constraints and a propagating longitudinal axial mode. Its ghost
and Jacobian structure is not obtained by adding a scalar coefficient to the
metric-gravity answer.

The explicit calculation by Melichev and Percacci starts from a different PGT
with one curvature-square and one torsion-square term. It establishes the
structural warning: all other \(FF\) terms, \(DTDT\), \(FDT\), and still higher
operators are generated, with a curvature-square obstruction surviving field
redefinitions. It does not provide beta coefficients for the critical
\(0^-\) action.

Likewise, the repository's gauge--gravity fixed-point flow in claim 1616 is an
illustrative two-coupling system. Its coefficients are not derived for this
universality class and cannot determine any row of the critical-PGT normal
matrix.

## Fixed-surface alternatives

There are four logically distinct outcomes.

### 1. No gravitational cancellation

If the unknown gauge-sector contribution has zero or same-sign projection on
\(C^2\), then the target surface immediately fails:

\[
 (C\beta)_{C^2}\ne0.
\]

Healthy extra matter only makes this result stronger.

### 2. Accidental one-loop cancellation

The graviton--torsion--ghost determinant could in principle contribute
\(-1/120\) and \(-1/72\) in the same convention. That would cancel two
entries at one scale/order but would not establish the other six equations,
higher-loop stability or closure against the enlarged operator shell.
Without a Ward identity, it is an accidental equality requiring repetition at
each order.

### 3. Nonzero curvature-square fixed point

Allowing \(c_C\ne0\) can move the flow to an enlarged fixed point. In a finite
local polynomial action with ordinary Feynman quantization, resumming the
Weyl-square term produces the opposite-residue massive spin-two pole already
identified in claim 1599. The original \(2+1\) spectrum is then lost.

An asymptotically safe nonperturbative propagator might evade the naive finite
polynomial pole decomposition, but it must demonstrate a positive physical
spectral measure or an equivalent unitary construction. Fixed-point existence
alone is insufficient.

### 4. EFT treatment

Treating all generated operators perturbatively below a cutoff preserves the
healthy \(2+1\) low-energy poles. This is internally consistent but explicitly
abandons fundamental finite-action closure.

## Exact computation contract

The missing one-loop calculation must start from the same action and AdS
background as claims 1634 and 1635. It must:

1. use independent tetrad and Lorentz-connection fluctuations, plus the
   compensator, multipliers and optional copy connection;
2. fix diffeomorphism, local Lorentz, broken Spin(2,3) and copy gauges with a
   nilpotent BRST complex;
3. include all Faddeev--Popov, Jacobian and second-class determinant factors;
4. reduce the nonminimal Hessian to a valid heat-kernel or equivalent
   functional determinant on Riemann--Cartan AdS;
5. report the full local divergence basis, not only \(C^2\) and \(R^2\);
6. quotient topological, BRST-exact and field-redefinition-redundant terms;
7. project the surviving beta vector onto every critical normal direction;
8. repeat the pole, residue and constraint-rank analysis for any nonzero
   fixed-point couplings; and
9. demonstrate scheme-stable critical exponents and an observable matching
   map before claiming asymptotic safety.

The calculation is technically substantial: even the simpler published PGT
example retains 10 tetrad/metric and 24 connection components and generates a
large invariant basis.

## Exhaustion verdict

The finite perturbative and algebraic routes now end at a precisely measured
information gap:

\[
 \boxed{\operatorname{rank}K=2,\qquad
 \dim N_{\rm displayed}=8,\qquad
 \text{unresolved normal dimension}=6.}
\]

The actual closure problem is larger because the displayed quadratic basis
need not be closed. No further matter scan, copy-group scan, tree-level
spectrum calculation or toy fixed-point flow can supply the missing rows.

The programme reopens only with either:

- the exact gauge-fixed one-loop divergent functional described above,
  followed by higher-order/invariant-surface checks; or
- a nonperturbative definition that directly supplies the full fixed
  functional and a unitary spectral reconstruction.

Until then the RG question is underdetermined, while the EFT classification is
complete.

## Sources

- O. Melichev and R. Percacci, [*On the Renormalization of Poincare Gauge Theories*](https://arxiv.org/abs/2307.02336).
- G. 't Hooft and M. Veltman, [*One-Loop Divergencies in the Theory of Gravitation*](https://www.numdam.org/item/AIHPA_1974__20_1_69_0/).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_normal_beta_information_rank.mjs
~~~
