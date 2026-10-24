# Contextual triangle bound: real global content, but standard positivity

**Date:** 25 October 2026  
**Status:** natural candidate closed as full-matrix positivity; OT-018 remains open  
**Topic:** OT-018  
**Parents:** [finite contextual reconstruction](admissibility_08_finite_contextual_casimir_experiment.md), [wide frontier atlas](admissibility_32_wide_frontier_atlas_and_iterative_research_queue.md)  
**Evidence:** [response-bound ledger](../../../evidence/data/admissibility-contextual-response-bound-v1.json)  
**Generator:** [triangle-bound calculation](../../../scripts/run-admissibility-contextual-response-bound.mjs)  
**Verifier:** [triangle-bound certificate](../../../verification/admissibility/verify_contextual_response_bound.mjs)

## Result

Three normalized two-port responses can each be positive while failing to coexist as one positive three-port response. The obstruction contains exactly the sort of contextual information the programme has been seeking: it depends on a loop phase invisible to any individual pair. It yields an exact, basis-independent inequality with explicit counterexamples and saturating cases.

It is nevertheless **not a new admissibility inequality**. For the declared response family, the contextual triangle bound is precisely the determinant condition in the standard positive-semidefinite principal-minor test. The candidate is stronger than pairwise positivity, but not stronger than ordinary positivity of the full response.

This is a productive no-go. It identifies the baseline any genuinely new OT-018 inequality must exceed.

## Response family

Consider a normalized Hermitian response matrix

\[
R=
\begin{pmatrix}
1&a&b^*\\
a^*&1&c\\
b&c^*&1
\end{pmatrix}.
\]

Every two-port principal block is positive exactly when

\[
|a|\leq1,\qquad |b|\leq1,\qquad |c|\leq1.
\]

Those pairwise tests do not guarantee a joint realization. The missing condition is

\[
\boxed{
1-|a|^2-|b|^2-|c|^2+2\operatorname{Re}(acb^*)\geq0.
}
\]

The product \(acb^*\) is unchanged when the three ports are independently rephased. Its argument

\[
\Phi=\arg(acb^*)
\]

is therefore a genuine loop coordinate. Pairwise magnitudes do not determine it.

## Real anticorrelation witness

Set \(a=b=c=r\in\mathbb R\). Then

\[
\det R=(1-r)^2(1+2r).
\]

Every pair allows \(-1\leq r\leq1\), but the joint matrix requires

\[
-\frac12\leq r\leq1.
\]

At \(r=-3/4\), all pairwise minors equal \(7/16>0\), while

\[
\det R=-\frac{49}{32}<0.
\]

Thus the three pairwise responses cannot be one Gram or covariance system. The lower boundary is saturated at \(r=-1/2\), where \((1,1,1)^T\) is a null vector. This is the familiar geometric fact that three unit vectors may have mutual correlation no smaller than \(-1/2\) when they close into a centered equilateral configuration.

## Complex loop-phase witness

Set all three magnitudes to \(\rho=3/5\). Every pairwise minor is then

\[
1-\rho^2=\frac{16}{25}>0

\]

for every phase. The global determinant is

\[
\det R=1-3\rho^2+2\rho^3\cos\Phi.
\]

Positivity requires

\[
\cos\Phi\geq\frac{5}{27},
\]

so the principal admitted window is

\[
|\Phi|\leq\arccos\frac{5}{27}
\approx1.384536
\approx0.440712\pi.
\]

The boundary is exact and saturating. It is also detector-relevant: measuring only the three pairwise magnitudes would admit phases that no joint passive response can realize.

## Why this does not close OT-018

For a \(3\times3\) Hermitian matrix, nonnegative diagonal entries, nonnegative \(2\times2\) principal minors and nonnegative determinant are exactly the principal-minor criterion for positive semidefiniteness. The displayed contextual inequality is the final member of that standard test.

Changing vocabulary does not change its mathematical authority:

- “global compatibility” means the three blocks assemble into one positive matrix;
- “contextual loop closure” is encoded by the determinant and gauge-invariant phase;
- “joint realizability” is Gram representability;
- “admissibility” adds no restriction beyond full-matrix positivity in this family.

The candidate therefore fires OT-018's kill test. It is algebraically equivalent to standard positivity.

## What the result changes

The branch is narrower now. A future candidate cannot compare a global condition only with pairwise positivity and call the difference new. It must begin with the complete conventional object—including all joint principal minors, complete positivity where channels are involved, causality/dispersion relations and the detector's full covariance—and then exclude at least one point that survives those tests.

Promising directions must add structure not already contained in one fixed positive matrix:

1. **cross-frequency joint realizability:** separately passive frequency slices may fail to share one causal spectral measure;
2. **shared-environment interventions:** channels that are completely positive separately may fail to arise from one environment and one intervention-independent dilation;
3. **detector-context composition:** independently calibrated folds may be incompatible with one common latent carrier even though each fold is positive;
4. **uniform limits:** every finite regulator may be positive while no uniform continuum or relaxation bound exists.

Each direction still risks reducing to an established theorem. That is the correct next audit, not a reason to weaken the novelty criterion.

## Open and closed

Closed:

- pairwise positivity does not imply joint three-context positivity;
- the real and complex triangle gaps have exact counterexamples and saturation;
- the loop phase is basis-independent under port rephasing;
- this entire candidate is ordinary full-matrix positivity, not new physics.

Open:

- derive a bound on a full positive causal family rather than on incomplete pairwise data;
- construct a conventional saturating model on both sides of the proposed extra structure;
- identify which new premise comes specifically from contextual composition;
- prove basis independence and exhibit a point excluded only by that premise.

## Implication

The programme has found a useful warning sign. Context can reveal information erased by pairwise inspection, but that fact alone does not make the resulting constraint novel. Standard positivity is already global. The hoped-for theoretical-engineering improvement must therefore live in compatibility across frequencies, interventions, dilations, detectors or limits—not in rediscovering the determinant of a response matrix.

## Reproduction

~~~powershell
node scripts/run-admissibility-contextual-response-bound.mjs --write
node verification/admissibility/verify_contextual_response_bound.mjs
~~~
