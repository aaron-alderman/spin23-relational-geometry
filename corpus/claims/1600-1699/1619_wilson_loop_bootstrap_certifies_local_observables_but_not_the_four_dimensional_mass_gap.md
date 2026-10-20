# Wilson-Loop Bootstrap Certifies Local Observables but Not the Four-Dimensional Mass Gap

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** explicit Schwinger--Dyson plus Toeplitz-positivity hierarchy with convergent two-sided plaquette bounds and finite-cutoff spurious solutions; no uniform temporal support exclusion

**Depends on:** [the positive spectral-moment audit](1614_finite_positive_euclidean_moments_bound_a_gap_from_above_but_noisy_data_do_not_certify_a_positive_lower_gap.md), [the numerical lattice continuum audit](1608_numerical_lattice_glueball_convergence_is_strong_gap_evidence_not_a_constructive_r4_theorem.md), and [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md)

**Evidence:** [loop-bootstrap ledger](../../../evidence/data/spin23-wilson-loop-schwinger-dyson-bootstrap.json) and [deterministic verifier](../../../verification/verify/verify_spin23_wilson_loop_schwinger_dyson_bootstrap.mjs)

## Result

Wilson-loop bootstrap is a genuine constructive tool. Schwinger--Dyson equations impose linear relations among loop moments, while positivity turns the remaining freedom into a semidefinite feasible set. Increasing the loop cutoff can give certified, nested upper and lower bounds on a local Wilson loop.

The finite witness below solves that hierarchy explicitly. It also shows the two limitations that matter for the mass-gap problem:

1. every finite cutoff admits multiple positive solutions, including solutions that cannot remain positive at the next cutoff; and
2. convergence of a one-plaquette expectation does not exclude arbitrarily low spectral support in temporal connected correlators.

## Exactly solvable loop hierarchy

Consider the compact U(1) measure

\[
d\mu_\beta(\theta)={e^{\beta\cos\theta}\over2\pi I_0(\beta)}d\theta,
\qquad \beta=2,
\]

and Wilson moments

\[
w_n=\langle\cos(n\theta)\rangle,\qquad w_0=1.
\]

This is a one-plaquette model and the independent-plaquette building block of two-dimensional U(1) lattice gauge theory on a simply connected lattice. Integration by parts gives the Schwinger--Dyson recurrence

\[
w_{n+1}=w_{n-1}-{2n\over\beta}w_n,
\qquad n\ge1.
\]

Once (u=w_1) is chosen, every retained (w_n) is affine in (u). The loop equations alone do not determine the plaquette.

The exact infinite solution is

\[
w_n={I_n(\beta)\over I_0(\beta)},
\qquad
u={I_1(2)\over I_0(2)}=0.697774657964\ldots.
\]

The verifier computes the Bessel ratio from its convergent series; it is used to audit, not to generate, the bootstrap bounds.

## Positivity becomes a semidefinite program

For coefficients (c_0,\ldots,c_K), positivity of the measure implies

\[
\left\langle\left|\sum_{j=0}^Kc_je^{ij\theta}\right|^2\right\rangle
=c^*T_Kc\ge0,
\]

where

\[
(T_K)_{ij}=w_{|i-j|}.
\]

Thus (T_K(u)\succeq0). Because every entry is affine in (u), the two optimization problems

\[
u_K^-=\min u,\qquad u_K^+=\max u,\qquad T_K(u)\succeq0
\]

are one-variable semidefinite programs. The verifier constructs the recurrence exactly in affine form, diagonalizes the Toeplitz matrix, and brackets both feasibility endpoints by bisection.

For (K=1,\ldots,8), the feasible intervals are nested, every lower bound is nondecreasing, every upper bound is nonincreasing, and the exact Bessel ratio remains strictly feasible. This is the same machinery used in higher-dimensional loop bootstrap: loop equations reduce variables and Wilson-loop positivity bounds what remains.

## Finite-cutoff solutions are not unique

At any finite (K), the feasible interval has nonzero width. Every interior (u) gives moments satisfying all retained loop equations and a positive (T_K). Hence loop equations plus finite positivity do not select a unique state.

More sharply, the verifier chooses points inside the (K)-feasible interval but outside the (K+1)-feasible interval. Their (T_K) is positive semidefinite, while (T_{K+1}) has a negative eigenvalue. These are explicit spurious truncated solutions: positive for every tested polynomial up to degree (K), but not extendable through even the next stated relaxation.

This does not undermine the method. It explains why monotone bounds, cutoff convergence and an infinite extension theorem are essential. A visually stable finite solution is not by itself the physical measure.

## Relation to the lattice Yang--Mills bootstrap

Anderson and Kruczenski construct positive matrices from open Wilson paths and combine them with lattice loop equations. Kazakov and Zheng use Makeenko--Migdal equations, symmetry reduction and loop-length cutoffs to bound the plaquette in large-(N) Yang--Mills theory in two, three and four dimensions.

For fixed SU(3), factorization does not close the single-trace equations. Guo, Li, Yang and Zhu add multiple-trace variables and combine Hermitian, reflection and twist-reflection positivity. Their calculations give rigorous finite-relaxation plaquette bounds in two, three and four dimensions.

The U(1) witness omits the combinatorics of self-intersections, loop splitting and multiple traces, but retains the logical core exactly: linear loop equations plus a hierarchy of positive Wilson matrices.

## Why a plaquette certificate is not a gap certificate

The plaquette is a local vacuum expectation value. The mass gap is the lower edge of the nonvacuum Hamiltonian spectrum, extracted from large-time connected correlators such as

\[
C_O(t)=\langle O(t)O(0)\rangle_c
=\int_0^\infty e^{-Et}d\rho_O(E).
\]

To prove \(\Delta>0\), the bootstrap must exclude spectral support for \(0<E<\Delta\), uniformly over a sufficiently complete family of gauge-invariant operators. Two-sided convergence of \(\langle W_\square\rangle\) does not impose that support exclusion. An arbitrarily light state may carry arbitrarily small positive residue while changing the local plaquette by less than any fixed relaxation width.

Reflection positivity can build temporal moment matrices, but Claim 1614 shows their directionality: finite positive samples readily give upper bounds on a lowest energy or refute a gap that is too large; under nonzero uncertainty they do not give a positive lower gap without a residue or tail theorem.

## The four limits that must be uniform

A four-dimensional SU(3) gap certificate would have to control simultaneously:

1. loop cutoff (K\to\infty), including self-intersections and multiple traces;
2. temporal extent (t_{\max}\to\infty), so tiny low-energy residues cannot hide;
3. volume (L\to\infty), so winding and finite-box gaps are removed; and
4. lattice spacing (a\to0), with (e^{-a\Delta}\to1) resolved at the required rate.

Pointwise convergence in (K) for each fixed loop, coupling and lattice does not justify interchanging these limits. The continuum gap appears as a support edge approaching one in lattice transfer-matrix units, precisely where fixed-precision moment constraints become least discriminating.

## Spurious phases and solution selection

Even an infinite formal loop equation can admit multiple branches or phases. Finite positivity removes parts of this solution set but does not automatically establish uniqueness, clustering, reflection-positive reconstruction or selection of the continuum branch. At large (N), factorization further changes the hierarchy and can conceal (1/N^2)-residue states; at fixed SU(3), multiple traces prevent that closure.

The missing theorem is therefore stronger than a narrow plaquette interval. It must identify a unique reflection-positive continuum state and prove a uniform temporal support gap in its reconstructed Hilbert space.

## Spin(2,3) consequence

Wilson-loop positivity is a useful gauge-invariant interface for any compact internal sector proposed alongside Spin(2,3). It can falsify candidate loop data without gauge fixing and can impose rigorous local-observable bounds.

Spin(2,3) symmetry neither closes the fixed-(N) Wilson hierarchy nor supplies the temporal support exclusion. Spacetime representation theory cannot replace construction of the compact gauge measure.

## Exhaustion boundary

The finite bootstrap mechanism is exhausted in the witness: exact loop recurrence, affine moment reduction, semidefinite positivity, nested two-sided optimization, comparison with the exact solution and explicit nonextendable finite-cutoff solutions.

The next proof-bearing step is not a larger plaquette bootstrap. It is a temporal Wilson-loop/correlator hierarchy with quantitative support-localizing constraints and errors uniform in loop cutoff, time, volume and lattice spacing. No current four-dimensional SU(3) bootstrap result supplies all four uniformities.

## Sources

- [Anderson and Kruczenski, loop equations and lattice bootstrap](https://arxiv.org/abs/1612.08140)
- [Kazakov and Zheng, bootstrap for lattice Yang--Mills theory](https://arxiv.org/abs/2203.11360)
- [Guo, Li, Yang and Zhu, SU(3) lattice Yang--Mills bootstrap](https://arxiv.org/abs/2502.14421)
- [Makeenko and Migdal, exact loop equation](https://doi.org/10.1016/0550-3213(81)90258-6)
- [Jaffe and Witten, official Yang--Mills existence and mass-gap problem](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_wilson_loop_schwinger_dyson_bootstrap.mjs
~~~
