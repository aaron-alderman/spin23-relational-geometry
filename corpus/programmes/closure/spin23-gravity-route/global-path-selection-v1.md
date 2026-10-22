# Spin(2,3) Global Path Selection v1

**Frozen:** 22 October 2026

## Objective

Continue the critical Spin(2,3)/PGT programme until global, rather than
subtask, exhaustion.  At every checkpoint select the executable branch with
the greatest ability to change downstream decisions.  When a branch reaches
a proved obstruction, return to the frontier and select the next branch.

## Terminal rule

A branch is terminal only when it is:

1. **completed** with a reproducible certificate;
2. **rejected** by a proved incompatibility or falsifier; or
3. **externally blocked** by a specifically named datum, experimental input,
   regulator construction, protecting principle or mathematical tool that is
   absent from the repository and cannot be derived from its assumptions.

Difficulty, calculation size, completion of one response block, or the
existence of a publishable intermediate result is not exhaustion.  Global
exhaustion occurs only when no frontier node is executable.

## Current frontier

| ID | Branch | State | Unlocks | Immediate test |
|---|---|---|---|---|
| Q | Complete quadratic one-loop shell | completed | E, L, P | all 14 quadratic responses closed |
| E | Torsion-inclusive order-reduced EFT | completed | P | complete basis envelope and cutoff inequalities |
| B | Higher-field beta functional as rescue | rejected | L, U | cannot repair torsionless normal beta |
| L | Enlarged local action, unchanged spectrum | rejected | U | nonzero beta_C; finite p4 resummation has opposite residues |
| P | Low-energy phenomenology | externally blocked | — | needs observable and finite matching data |
| U | Protecting symmetry or UV parent | externally blocked | — | needs explicit Ward identity or parent action |
| N | Nonperturbative definition | externally blocked | — | needs regulator, continuum limit and positive reconstruction |

The original sparse-action closure branch is already rejected: known
torsionless and axial poles leave it.  The published-general-PGT shortcut is
also rejected by the 1-versus-24 connection-symbol rank discontinuity.

## Selection rule

Among nodes whose prerequisites are satisfied, order by:

1. whether the result can falsify or unlock another branch;
2. whether all inputs are local and frozen;
3. exactness and independent verifiability;
4. computational cost.

This selects `Q:t132-coupling-function`.  The profile has response row
((2,0,\ldots,0)), so one pole fixes (h^{TT}_1), while its nonzero overlap
with the rank-one connection channel exercises the genuinely difficult part
of the packet.  Failure to construct a consistent source Hessian closes the
current implementation route but does not close Q: the selector must then
try an equivalent covariant symbolic implementation before declaring an
external-tool boundary.  The source vertices and flat zero-source
34-component propagator are complete.  The logarithmic pole is nonzero at
the regular witness point.  A converged twelve-point coupling scan selects
the rational surface
\(h^{TT}_1=(18a_1^2+3a_1-7)/(4608\pi^2\epsilon)\), independent of
\(B=\kappa b_X\).  Analytic external-momentum differentiation recovers it
direction by direction.  The live operation is to parameterize the source
tensor and advance the same engine to the other six flat rows.  That
generalization and the `t021` row are now complete, giving
\(h^{TT}_4=-(21a_1^2+27a_1+10)/(1152\pi^2\epsilon)\).  The live profile is
`t102` is also complete, giving
\(h^{TT}_6=(3a_1^2+42a_1+31)/(4608\pi^2\epsilon)\).  The live profile is
`t112` is complete and fixes
\(h^{TT}_2+h^{TT}_3=(-3a_1^2+28a_1+23)/(2304\pi^2\epsilon)\).  The live
`t011` is complete and gives
\(h^{TT}_9=-(99a_1^2+196a_1+113)/(2304\pi^2\epsilon)\).  The live profile is
`t001+t122` is complete and fixes
\(2h^{TT}_2+h^{TT}_7=(6a_1^2+11a_1+5)/(2304\pi^2\epsilon)\).  The live
`t001` is complete and equals the mixed response, implying
\(h^{TT}_8=2h^{TT}_1+h^{TT}_2-h^{TT}_3\).  All seven new flat probes are
closed.  The common-normalization axial rows and exact inverse now close all
nine \(h^{TT}\) poles.  Two Bianchi-compatible Fourier probes now also give
\(h^{RT}_3=3(a_1+1)/(256\pi^2\epsilon)\) and
\(h^{RT}_5=-(459a_1+491)/(13824\pi^2\epsilon)\).  The complete quadratic
shell is closed.  Its torsion-inclusive order-reduced EFT envelope is also
complete.  The enlarged unchanged-spectrum local action is rejected by the
nonzero normal Weyl-square beta and opposite-residue finite resummation.
Higher-field torsion operators cannot change that torsionless response.

## Backtracking policy

- If `t132` succeeds, complete the other six flat rows and two curved rows.
- If the quadratic shell succeeds, advance E first because it yields
  physical bounds without presupposing a fundamental UV completion.
- In parallel logical order, use the quadratic result to decide whether L has
  any healthy local candidate.  A no-go sends the programme to U and N.
- Advance B only to the degree needed to decide RG tangency or quantitative
  EFT closure; do not mistake coefficient accumulation for physical progress.
- U and N become executable only when an explicit candidate symmetry, parent
  action, regulator or fixed functional is supplied.  Generic appeals to
  asymptotic safety, nonlocality or lattice methods do not satisfy this gate.

## Current stopping status

Global exhaustion is **true** for the frozen programme.  Every frontier node
is completed, rejected by a local certificate, or externally blocked by a
named reopening datum.  The allowed reopenings are finite observable
matching, an explicit protecting parent with its full beta/spectrum audit,
or a nonperturbative regulator with continuum and positivity proofs.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_global_path_selection_v1.mjs
~~~
