# PageRank, Perron selection and the finesse trade-off

**Date:** 24 October 2026  
**Status:** exact literature bridge and methodological control; not evidence for a shared microscopic mechanism  
**Source:** Kurt Bryan and Tanya Leise, [“The \$25,000,000,000 Eigenvector: The Linear Algebra behind Google”](https://doi.org/10.1137/050623280), *SIAM Review* 48 (2006), 569–581; [open teaching copy](https://sites.cs.ucsb.edu/~gilbert/cs111/readings/25_Billion_Eigenvector_Original.pdf)

## Why this belongs here

PageRank is an exact, unusually clear control model for four recurring corpus questions:

1. how local directed relations produce a global state;
2. why a stationary state may be a line or surface rather than a unique realization;
3. what additional datum selects one positive state; and
4. how that selector trades structural fidelity for uniqueness, robustness and convergence.

The important lesson is not that physics “is PageRank.” It is that selection can be separated cleanly from transport, and that the mechanism which guarantees a unique answer also changes the answer.

## The exact mechanism

Let \(A\) be the column-stochastic link matrix of a directed graph. A normalized nonnegative stationary state obeys

\[
Ax=x,
\qquad
x_i\ge 0,
\qquad
\mathbf 1^T x=1.
\]

The positivity cone and normalization simplex define the admissible states. The directed links define transport. If the graph has \(r\) disconnected closed components, the eigenspace at eigenvalue one has dimension at least \(r\). Transport therefore supplies a stationary family, not a unique realized member.

Bryan and Leise describe the PageRank repair

\[
M=(1-m)A+mS,
\qquad
S=s\mathbf 1^T,
\qquad
0<m\le 1,
\]

with uniform \(s_i=1/n\) in their presentation. Every entry of \(M\) is then positive. Perron–Frobenius gives one normalized positive fixed point \(q\):

\[
Mq=q,
\qquad
q_i>0,
\qquad
\mathbf 1^Tq=1.
\]

The same law is a dynamics,

\[
x_{k+1}=(1-m)Ax_k+ms,
\]

whose differences contract:

\[
\|x_{k+1}-y_{k+1}\|_1
\le
(1-m)\|x_k-y_k\|_1.
\]

Thus one independently supplied mixing term performs three jobs at once: it joins disconnected sectors, selects a unique positive state and creates a convergence gap.

## The sharper corpus mapping

| PageRank object | Admissibility role | Boundary on the analogy |
|---|---|---|
| nonnegative normalized vector | admitted state on a positive simplex | not a quantum state unless a physical stochastic carrier is independently supplied |
| sparse link matrix \(A\) | local directed transport | not a Lie-group action; it is generally irreversible Markov evolution |
| stationary eigenspace \(V_1(A)\) | unselected family of realizations | degeneracy alone is not spontaneous symmetry breaking |
| teleportation distribution \(s\) | independently sourced selector or reference measure | the uniform choice is a modelling decision, not graph-derived truth |
| mixing weight \(m\) | selector strength and contraction scale | increasing it improves uniqueness while suppressing graph-specific structure |
| Perron vector \(q\) | selected global record | it is relational and context-dependent, not intrinsic to the bare graph |
| spectral gap / contraction | forgetting time and convergence rate | rapid convergence may be evidence of stronger imposed mixing, not deeper natural stability |

This is the cleanest finite answer yet to the earlier intuition that spontaneous selection resembles an optimization with one solution instead of a line or surface. PageRank does collapse a stationary surface to one point, but **not spontaneously**: the positive mixing term is an explicit second datum. The example therefore supports the corpus selector firewall rather than evading it.

## The finesse trade-off

The mixing parameter is also a resolution knob.

- At \(m=0\), the dynamics preserves the graph most faithfully, but disconnected or nearly disconnected sectors can make the selected state nonunique or extremely slow to identify.
- At \(m>0\), the fixed point is unique and iteration is stable, but the global injection allows probability to cross boundaries absent from the original graph.
- As \(m\) increases, convergence improves while the stationary record becomes progressively more determined by the selector \(s\).

This is directly relevant to the finesse thesis. A detector, regularizer, bath or inference prior can make a problem legible by erasing precisely the weakly connected structure one hoped to discover. Robustness and information preservation are therefore different objectives.

The fixed point can be expanded as

\[
q(m)
=
m\bigl[I-(1-m)A\bigr]^{-1}s
=
m\sum_{k=0}^{\infty}(1-m)^kA^ks.
\]

The selector strength sets an effective path horizon. Large \(m\) emphasizes short paths from the reference distribution; small \(m\) admits longer relational histories but approaches the nonunique or slowly mixing boundary. A single reported ranking hides this scale dependence. A **selector sweep** \(q(m,s)\) is therefore more informative than one eigenvector.

## Consequences for dynamics

This bridge corrects a possible over-identification of dynamics with Lie motion. The PageRank evolution is positive, normalized, dissipative and contractive. It has an attractor and a memory-loss time, but generally no inverse. It belongs naturally beside the corpus's coherent Lie transport, open-system selection and metastable memory as a distinct dynamical type.

It also shows how static and dynamic descriptions meet. The Perron eigenvector is the fixed point; the power iteration is the history by which it is reached; the subleading spectrum controls how quickly initial information is forgotten. A “static” eigenvector can therefore encode the terminal state of a real dynamical selection law without revealing the law's cost, path or provenance by itself.

## A corpus-native use

The claim graph can use personalized PageRank as a navigation aid, provided authority is not delegated to the score. Let \(s\) encode a declared reader question or target set, compute \(q(m,s)\) over a range of \(m\), and report:

- claims stable across the selector sweep;
- claims whose rank depends strongly on the chosen question;
- weakly connected components exposed as \(m\to0\);
- dangling or orphaned claims whose score exists only through the completion rule; and
- the subleading gap as a measure of retrieval mixing time, not truth.

This would give AI a precise kenotic role: it can expose the dependence of a reading path on its selector instead of presenting one generated ordering as neutral.

## Implemented context hub

That methodological proposal now has a [local executable realization](../../../tooling/search/MCP.md). Weighted lexical relevance supplies task-specific seeds; personalized PageRank expands through authored Markdown links; a declared profile and graph weight define the selector; and a context compiler chooses a relevance-and-diversity-balanced packet inside a fixed character budget. Navigation hubs are suppressed from scarce context unless the task requests orientation. Each source retains its path, declared status, inclusion reason, evidence-spine joins, selector sensitivity and content hash.

The implementation also executes one-factor context sweeps. Their intersection is an **invariant retrieval core relative to the executed controls**, while sources that enter or leave form a selector-sensitive perimeter. This does not make the invariant core true, nor does it establish model-answer stability. Answer receipts separately bind atomic claims, verdicts and citations to exact context, prompt, model and answer hashes; comparison then distinguishes exact stability, wording drift, context-conditional claims, verdict conflict and citation outside the supplied context.

The first governed [30-case benchmark](../../../tooling/search/benchmark_baseline_v1.json) spans direct lookup, synthesis, experiment, obstruction, audit, planning, claim, spelling, selector and concept-collision lanes. The retained local baseline passes all cases with mean reciprocal rank above the declared 0.8 gate. This is software-validation evidence for retrieval behavior, not evidence for the physical claims retrieved. Protected Sourcery admission, cross-lane federation and a visible Context Hub remain separately gated.

## Physical experiment pattern

On a measured classical Markov carrier—photonic modes, acoustic resonators, chemical states or another calibrated transition network—introduce a tunable weak global mixing channel and measure

\[
q(m,s),
\qquad
\lambda_2(m),
\qquad
\tau_{\rm mix}(m),
\qquad
\Sigma(m),
\]

where \(\Sigma\) is the independently measured thermodynamic or activity cost. Reverse or localize \(s\), then ask which features of \(q\) persist as the selector is weakened. The conventional payoff is a calibrated selection–fidelity–cost curve. A new-physics claim would require a reproducible residual outside the measured transition model and detector covariance; failure of bare PageRank is not such a residual.

## Reopen and kill conditions

**Promote the bridge physically only if:** a declared stochastic carrier realizes the measured matrix, the mixing channel has independent provenance, and stationary state, gap and cost close under common parameters.

**Keep it methodological if:** the relationship is only the shared mathematics of positive matrices and fixed points.

**Kill stronger claims if:** the apparent unique state disappears when the selector is removed, changes arbitrarily with \(s\), or is fully explained by the imposed mixing and detector completion rule.

## Corpus implications

1. A unique global state can be produced by local relation plus a small global selector; the selector must remain visible in the explanation.
2. Positivity and normalization are part of the admissible carrier, not consequences of the eigenvector equation alone.
3. Selection, convergence and loss of structural detail are coupled.
4. The spectral gap is simultaneously a stability resource and a memory-erasure rate.
5. The correct finesse object is not one dominant eigenvector but the response surface under selector, boundary and detector variation.
