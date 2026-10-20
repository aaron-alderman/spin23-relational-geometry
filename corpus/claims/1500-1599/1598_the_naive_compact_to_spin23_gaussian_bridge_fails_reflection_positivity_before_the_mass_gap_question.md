# The Naive Compact-to-Spin(2,3) Gaussian Bridge Fails Reflection Positivity Before the Mass-Gap Question

**Date:** 20 October 2026

**Gates:** A1, A2, A4, A6, A7 and A8

**Status:** exact Gaussian obstruction for the unbroken full-adjoint kinetic form; no obstruction claimed for correctly constrained broken Cartan gravity

**Depends on:** [the compact-real-form bridge audit](1592_compact_real_forms_and_internal_branching_do_not_transport_the_yang_mills_mass_gap.md), [the gap-type firewall](1593_six_inequivalent_gaps_require_a_type_firewall_before_the_yang_mills_problem_can_join_spin23.md), and [the joined exhaustion boundary](1594_the_joined_mass_gap_investigation_closes_every_shortcut_and_leaves_five_irreducible_proof_arms.md)

**Evidence:** [reflection-positivity ledger](../../../evidence/data/spin23-noncompact-reflection-positivity-obstruction.json) and [deterministic verifier](../../../verification/verify/verify_spin23_noncompact_reflection_positivity_obstruction.mjs)

## Result

The compact-real-form laboratory cannot be continued into an ordinary unbroken Spin(2,3) adjoint Yang--Mills theory while retaining every adjoint component as a positive-norm oscillator. The obstruction appears already in the free Gaussian Osterwalder--Schrader form:

\[
\boxed{
Q_\eta(v,f)=
{v^T\eta v\over2m}
\left|\sum_i f_i e^{-mt_i}\right|^2,
\qquad t_i>0.}
\]

The scalar factor is nonnegative. The internal factor is not: the invariant Killing form of the split real algebra has mixed signature. A test vector in a negative direction therefore has negative reflected norm. One cannot ask whether this Gaussian theory has a positive physical mass gap because it fails positivity first.

## Why the obstruction is structural

Compact \(Spin(5)\) admits a positive-definite adjoint inner product obtained from minus its Killing form. For the split algebra,

\[
\mathfrak{spin}(2,3)\simeq\mathfrak{sp}(4,\mathbb R),
\]

the Killing signature is \((6,4)\), up to overall sign. Reversing that sign gives \((4,6)\), not \((10,0)\). More generally, a real semisimple Lie algebra admitting a positive-definite ad-invariant inner product is of compact type. Thus there is no choice of overall sign that turns the full Spin(2,3) adjoint Killing metric into the positive compact Yang--Mills kinetic form.

This is stronger than noting that the real forms differ. It exhibits the precise axiom lost by naive analytic continuation: reflection positivity, and hence the positive reconstructed Hilbert space.

## Exact finite witness

Choose \(m=1.3\), positive times

\[
(t_1,t_2,t_3)=(0.25,0.8,1.4)
\]

and coefficients \((f_1,f_2,f_3)=(1,-0.4,0.7)\). The scalar reflected Gram form factorizes and gives

\[
Q_{+}=0.1855455632994728.
\]

With internal metric

\[
\eta=\operatorname{diag}(1,1,1,1,1,1,-1,-1,-1,-1),
\]

the same test function gives \(+Q_+\) on a positive internal basis vector and \(-Q_+\) on a negative one. The violation is exact and does not depend on an interacting infrared approximation.

## What this closes

It closes the proposed bridge

\[
\text{compact Spin(5) positive adjoint measure}
\xrightarrow{\text{analytic continuation only}}
\text{positive full-adjoint Spin(2,3) measure}.
\]

Shared complexification, a shared Casimir polynomial or a common one-loop coefficient cannot repair the negative Osterwalder--Schrader norm.

## What it does not close

The result is deliberately narrower than a no-go theorem for quantum gravity. In a broken Cartan formulation:

- the coframe is a soldering form, not an ordinary internal Yang--Mills vector;
- diffeomorphism and local-Lorentz constraints remove redundant variables;
- gauge-fixed fields need not themselves have positive componentwise correlators;
- BRST cohomology, conserved-source saturation or gauge-invariant observables determine the physical state space; and
- symmetry breaking can select a physical kinetic form that is not the unbroken adjoint Killing form.

There are examples in which apparently indefinite gauge-algebra directions become cohomologically trivial, so indefiniteness is an admission alarm rather than a universal interacting no-go. The required escape, however, must be demonstrated rather than assumed.

## Remaining bridge theorem

A viable Spin(2,3) construction must now do one of the following:

1. exhibit gauge-invariant Euclidean observables satisfying reflection positivity after symmetry breaking;
2. derive the complete constraint or BRST cohomology and show that every negative adjoint direction is nonphysical;
3. construct a positive physical projector and prove that it is stable under interactions and renormalization; or
4. work directly in Lorentzian signature and prove positive saturated residues and unitary evolution for all physical poles.

Until one of these succeeds, compact Spin(5) results remain a laboratory rather than a transported solution. This completes the first actual positivity calculation demanded by claim 1594 and converts its “bridge or no-go” arm into a no-go for the naive full-adjoint bridge plus a sharply reduced constrained-gravity problem.

## Sources

- [Osterwalder and Schrader, Euclidean Green functions I](https://projecteuclid.org/journals/communications-in-mathematical-physics/volume-31/issue-2/Axioms-for-Euclidean-Greens-functions/cmp/1103858969.pdf)
- [Osterwalder and Schrader, Euclidean Green functions II](https://projecteuclid.org/journals/communications-in-mathematical-physics/volume-42/issue-3/Axioms-for-Euclidean-Greens-functions-II-with-an-Appendix-by/cmp/1103899050.pdf)
- [Spin(2,3)-invariant MacDowell--Mansouri symmetry breaking](https://arxiv.org/abs/2010.12515)
- [Indefinite gauge metric and BRST-cohomological qualification](https://arxiv.org/abs/1512.02191)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_noncompact_reflection_positivity_obstruction.mjs
~~~
