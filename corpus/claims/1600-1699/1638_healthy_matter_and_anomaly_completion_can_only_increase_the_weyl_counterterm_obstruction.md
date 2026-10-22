# Healthy Matter and Anomaly Completion Can Only Increase the Weyl-Counterterm Obstruction

**Date:** 22 October 2026

**Gates:** A1, A2, A4, A6, A7, A8 and A11

**Status:** exact free-field Weyl-counterterm sign and Abelian anomaly-minimality result; interacting gravity/torsion contribution remains separate

**Depends on:** [the enhanced-protection exhaustion](1637_every_minimal_enhanced_protection_changes_the_target_spectrum_leaving_only_a_dynamical_rg_reopening.md) and [the copy-BRST counterterm no-go](1636_the_local_brst_counterterm_cohomology_defeats_every_commuting_copy_symmetry_completion.md)

**Evidence:** [matter-sign ledger](../../../evidence/data/spin23-matter-weyl-counterterm-and-copy-anomaly-no-go-v1.json) and [verifier](../../../verification/verify/verify_spin23_matter_weyl_counterterm_and_copy_anomaly_no_go.mjs)

## Result

Ordinary healthy matter cannot cancel the known \(C^2\) counterterm of the
torsion pseudoscalar. In the standard four-dimensional normalization, the
free-field coefficient is

\[
 c_{\rm matter}={N_0+3N_{1/2}+12N_1\over120},
\]

where \(N_0\) counts real scalars, \(N_{1/2}\) Weyl fermions and \(N_1\)
healthy vectors. Every term is nonnegative. The existing physical \(0^-\)
mode already gives \(c=1/120\), so adding healthy spectator fields,
supersymmetric partners or a kinetic copy vector moves the \(C^2\) beta
component farther from zero.

The \(R^2\) coefficient of a scalar can be tuned away by conformal coupling,
because it is proportional to

\[
 {1\over2}\left({1\over6}-\xi\right)^2.
\]

At the minimal value \(\xi=0\) this is \(1/72\), while at \(\xi=1/6\) it
vanishes. The Weyl coefficient \(1/120\) is independent of \(\xi\) and remains.

Therefore a weakly coupled cancellation cannot be obtained by adding any
number of ordinary positive-norm scalars, Weyl fermions or vectors. It needs a
negative contribution from the interacting gravitational/torsion/ghost
sector, a nonunitary higher-derivative field, or a genuinely interacting
fixed-point mechanism. This is a sign theorem for the matter determinant, not
a theorem that the full dynamical-gravity beta function can never cancel.

## Free healthy field cone

The individual contributions are

\[
 c_0={1\over120},\qquad
 c_{\rm Weyl}={1\over40}={3\over120},\qquad
 c_1={1\over10}={12\over120}.
\]

They generate the nonnegative integer cone

\[
 120c=N_0+3N_{1/2}+12N_1.
\]

The only point with \(c=0\) is the empty matter theory. A unitary CFT
interpretation sharpens the sign: the \(c\) anomaly is tied to the positive
stress-tensor two-point normalization, and dispersive sum rules express it as
a sum of positive contributions under their stated assumptions.

This observation is narrower than a quantum-gravity positivity theorem.
Gauge-fixed graviton and independent-connection determinants include ghosts
and constrained modes, so their net coefficient must be calculated in the
actual critical theory. But a proposed cancellation cannot be credited to
adding healthy ordinary matter: that sector has the wrong sign for the task.

## Consequences for the candidate completions

An \(N=1\) chiral multiplet containing the pseudoscalar has one complex scalar
and one Weyl fermion, hence

\[
 c_{\rm chiral}={2+3\over120}={1\over24}>0.
\]

An \(N=1\) vector multiplet has one vector and one Weyl fermion,

\[
 c_{\rm vector}={12+3\over120}={1\over8}>0.
\]

Thus minimal supersymmetric matter completion does not cancel the Weyl
counterterm; it increases it. Supersymmetric cancellations can affect vacuum
energy and selected beta functions, but the four-dimensional \(c\) anomaly of
a nontrivial unitary multiplet is not zero.

If the copy \(SO(2)\) connection is made kinetic, the healthy vector alone adds
\(1/10\) and three physical polarizations after Higgsing. Keeping it auxiliary
avoids this determinant only at the unprotected \(Z_q=0\) surface.

## Copy-\(U(1)\) anomaly equations

For left-handed Weyl charges \(q_i\), perturbative copy-gauge and mixed
gauge--gravitational anomaly cancellation require

\[
 \sum_iq_i^3=0,\qquad \sum_iq_i=0.
\]

With at most four nonzero rational charges, every solution is vectorlike:

- for three charges, \(a+b+c=0\) gives
  \(a^3+b^3+c^3=3abc\), so anomaly freedom forces a zero charge and an
  opposite pair;
- for four charges, \(d=-(a+b+c)\) gives
  \[
  a^3+b^3+c^3+d^3=-3(a+b)(a+c)(b+c),
  \]
  so one opposite pair exists and the remaining two also pair.

A genuinely chiral rational/integer solution therefore needs at least five
charged Weyl fermions. One primitive witness is

\[
 (-9,-5,-1,7,8),
\]

whose linear and cubic sums both vanish and which has no opposite pair.
Those five Weyl fields add

\[
 \Delta c={5\over40}={1\over8}.
\]

Together with the original pseudoscalar, the healthy-matter Weyl coefficient
is at least \(1/120+1/8=2/15\) in this minimal genuinely chiral copy-gauge
completion. A vectorlike pair is anomaly-free with fewer fields but is not a
chiral explanation of the copy action and still adds positive \(c\).

## Decision

The weakly coupled matter-cancellation branch is exhausted:

1. scalar nonminimal coupling can remove the scalar \(R^2\) component but not
   \(C^2\);
2. every healthy ordinary matter field adds a positive \(C^2\) coefficient;
3. supersymmetric matter multiplets also add positive \(c\);
4. a kinetic copy vector worsens both the counterterm and spectrum counts; and
5. a genuinely chiral anomaly-free copy gauge sector requires at least five
   Weyl fermions and increases \(c\) further.

Any cancellation must now come from the explicitly gauge-fixed interacting
gravity/torsion complex or from nonunitary/new UV structure. The next task is
to determine exactly how much of that normal beta vector is presently known.

## Sources

- M. J. Duff, [*Twenty Years of the Weyl Anomaly*](https://arxiv.org/abs/hep-th/9308075).
- M. Gillioz, X. Lu and M. A. Luty, [*Graviton Scattering and a Sum Rule for the c Anomaly in 4D CFT*](https://arxiv.org/abs/1801.05807).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_matter_weyl_counterterm_and_copy_anomaly_no_go.mjs
~~~
