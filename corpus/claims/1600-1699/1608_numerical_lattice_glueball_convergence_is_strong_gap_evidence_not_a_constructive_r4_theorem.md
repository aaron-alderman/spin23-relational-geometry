# Numerical Lattice Glueball Convergence Is Strong Gap Evidence, Not a Constructive R4 Theorem

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** exact positive-correlator witness and complete correlated synthetic continuum/volume regression; published SU(3) and Sp(4)/Spin(5) benchmarks agree after Casimir normalization, but no constructive theorem follows

**Depends on:** [the exact compact transfer calculation](../1500-1599/1595_exact_su2_heat_kernel_transfer_system_is_reflection_positive_but_does_not_scale_to_the_4d_mass_gap.md), [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md), and [the large-N transport audit](1604_large_n_volume_reduction_reconstructs_planar_momenta_but_does_not_transport_a_finite_n_mass_gap.md)

**Evidence:** [numerical lattice ledger](../../../evidence/data/spin23-numerical-lattice-glueball-continuum-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_numerical_lattice_glueball_continuum_audit.mjs)

## Result

Numerical lattice gauge theory supplies the strongest quantitative evidence that four-dimensional pure Yang--Mills theory has a positive mass gap. The inference chain is coherent and highly overconstrained: reflection-positive lattice actions give positive spectral correlators; a variational basis isolates low energies; repeated volumes control wrapping and winding states; several lattice spacings support an (a^2) continuum extrapolation; dimensionless ratios remove the cutoff scale; and independent actions and groups test universality.

That chain remains an inference from finitely many stochastic ensembles. It neither constructs the continuum measure on \(\mathbb R^4\) nor supplies a uniform theorem excluding spectral weight arbitrarily close to zero. The distinction is not philosophical. It is a mismatch of quantifiers.

## Positive correlators and the variational spectrum

For gauge-invariant spatial operators (O_i), a reflection-positive transfer system gives

\[
C_{ij}(t)=\langle O_i(t)O_j(0)\rangle_c
=\sum_n Z_{in}Z^*_{jn}e^{-E_nt}.
\]

Hence (C(t)) is positive semidefinite. The generalized eigenvalue problem

\[
C(t)v_n=\lambda_n(t,t_0)C(t_0)v_n
\]

has asymptotic principal correlators \(\lambda_n\sim e^{-E_n(t-t_0)}\), subject to excited-state corrections and the span of the operator basis.

The finite witness uses two energies (E=(0.45,0.95)) and

\[
Z=\begin{pmatrix}1&0.35\\0.45&1.1\end{pmatrix}.
\]

Every (C(t)=Z\operatorname{diag}(e^{-0.45t},e^{-0.95t})Z^T) for (t=1,\ldots,5) is positive definite. With (t_0=1), the two generalized eigenvalues recover both energies exactly at every later witness time. This verifies positivity and spectral extraction in a closed finite system.

It also exposes the limitation. A real basis is finite, estimated with noise, and loses signal exponentially in Euclidean time. A lighter state with negligible overlap can be absent from every resolved principal correlator. Positivity constrains fitted states; it does not certify completeness of the numerical spectral measure.

## Source-calibrated continuum and volume witness

The published SU(3) calculation of Athenodorou and Teper uses the Wilson plaquette action, large blocked-loop bases, a finite-volume comparison, topology decorrelation checks, and continuum fits of

\[
{M(a)\over\sqrt\sigma}=M_0+c_1a^2\sigma+c_2(a^2\sigma)^2+\cdots.
\]

It reports (M_{0^{++}}/\sqrt\sigma=3.405(21)) from the linear fit and (3.391(23)) from a quadratic alternative. The difference is small, but it is empirical model stability, not a remainder bound valid to (a=0).

The regression witness is synthetic, with its intercept calibrated to 3.405. It contains ten observations, including paired volumes at fixed cutoff so volume and discretization effects are not confounded, over

\[
x=a^2\sigma\in[0.007,0.08],\qquad
\ell=L\sqrt\sigma\in[2.5,5.5],
\]

and fits

\[
y=M_0+c_ax+c_Le^{-\ell}.
\]

Its generalized least-squares covariance contains per-ensemble statistical variance, a rank-one common scale uncertainty, and a rank-one correlated cutoff nuisance. The verifier checks positive definiteness, performs the full GLS fit, drops the coarsest point, removes the explicit volume term, adds (x^2), and constructs an envelope with an independent fit-window allowance.

This is a protocol witness, not fabricated lattice evidence: the individual observations, slopes and residuals are explicitly labelled synthetic. Its point is to make every inference and covariance operation executable rather than hide the continuum estimate behind a plot.

## Finite volume is more than an exponential correction

An ordinary self-energy finite-volume effect is exponentially suppressed, schematically as (e^{-mL}). The SU(3) benchmark notes that its typical (m_GL\sim10) makes this term statistically invisible.

There is a second hazard: pairs of winding flux tubes can have the same cubic quantum numbers as a glueball, mix with it, and move through the spectrum as (L) changes. A robust analysis therefore needs several volumes at fixed (a), operators for multi-particle and winding states, and stability of eigenvectors as well as eigenvalues. Merely adding (c_Le^{-L\sqrt\sigma}) is a sensitivity test, not a theorem controlling all finite-volume states.

## Scale setting and covariance

The ratio \(M/\sqrt\sigma\) is dimensionless and permits a continuum comparison without choosing physical units. Converting the SU(3) result with the conventional illustration \(\sqrt\sigma=0.44(2)\,\mathrm{GeV}\) gives

\[
M_{0^{++}}=1.498\,\mathrm{GeV},
\]

with (0.068\,\mathrm{GeV}) uncertainty from the scale choice alone, before the lattice statistical error. Pure Yang--Mills has no experimentally unique scale, so a number in GeV imports a convention. The dimensionless ratio is the cleaner theorem-facing observable.

A defensible covariance must propagate configurations through correlator estimation, the variational problem, mass fits and scale extraction. It must include autocorrelation, common scale uncertainty, correlated cutoff effects and model variations. Treating all ensemble points as independent overstates continuum precision.

## SU(3) versus Sp(4)/Spin(5)

The pure Sp(4) lattice study reports

\[
\eta={m_{0^+}^2\over\sigma}{C_2(F)\over C_2(A)}=5.27(15).
\]

For physicists' compact Sp(4), which is isomorphic to compact Spin(5), (C_2(F)=5/4) and (C_2(A)=3). Therefore

\[
{m_{0^+}\over\sqrt\sigma}=3.556(51).
\]

The raw SU(3) and Sp(4) ratios differ by about (2.76) combined quoted standard deviations. That is not evidence for equality. But the same Casimir normalization gives

\[
\eta_{SU(3)}=3.405^2{4/3\over3}=5.152(64),
\]

only (0.72) combined standard deviations from the Sp(4) value. This supports an approximate cross-group regularity worth testing with higher precision; it does not prove universality.

The notation is a trap. Compact Spin(5) is the group adjacent to Sp(4). It is not the noncompact spacetime group Spin(2,3). A numerical regularity between compact gauge groups is not a bridge to gravitational dynamics.

## What a serious lattice audit must vary

The minimal protocol is:

1. propagate autocorrelation-aware resamples through the correlator matrix, GEVP, fit and scale extraction;
2. audit condition numbers and positive definiteness instead of silently clipping noisy modes;
3. vary operator bases and fit windows, including scattering and winding-flux operators;
4. compare volumes at fixed \(a\) with \(m_{\rm gap}L\) large;
5. compare linear and quadratic Symanzik fits and successively remove coarse ensembles;
6. verify restoration of rotational multiplets across cubic irreducible representations;
7. demonstrate topological tunneling or validate fixed-topology corrections at the finest spacings; and
8. repeat with independent actions and scales such as \(\sqrt\sigma,r_0,t_0,w_0\).

Passing these checks turns a mass estimate into very strong evidence. No finite checklist turns statistical confidence into exact continuum existence.

## Exact constructive boundary

The Jaffe--Witten problem asks for existence of a nontrivial quantum Yang--Mills theory on \(\mathbb R^4\) and a positive mass gap. A numerical sequence would need new theorems establishing, rather than fitting:

- convergence of lattice measures and gauge-invariant Schwinger functions as (a\to0) and (L\to\infty);
- the Osterwalder--Schrader properties needed for Hilbert-space reconstruction;
- uniform control of the cutoff, thermodynamic and large-time limits;
- a positive lower edge of the reconstructed spectrum; and
- the statement for every compact simple gauge group required by the problem.

Finitely many ensembles cannot exclude a state whose energy tends to zero while its overlap with every sampled operator tends to zero faster than the statistical resolution. Continuum-fit convergence is evidence for the gap, not a proof of the spectral-support quantifier.

## Spin(2,3) consequence

The glueball spectrum is an excellent falsification target. Any Spin(2,3)-adjacent proposal claiming to reproduce a compact internal Yang--Mills sector should reproduce the dimensionless spectrum, its cubic-to-rotational multiplet pattern and its cross-group trends.

Agreement would validate an effective description. It would not construct the compact gauge measure or prove its continuum gap. Spin(2,3) representation theory supplies neither the missing probability measure nor uniform spectral convergence near zero.

## Exhaustion boundary

Within the empirical-continuum arm, the finite calculations are exhausted by the exact GEVP, full covariance construction, GLS fit suite, scale propagation, and SU(3)--Sp(4)/Spin(5) normalization comparison. Adding more synthetic points cannot cross the constructive boundary.

The next genuine advances require real ensembles plus one of two qualitatively new ingredients: rigorous, action-uniform continuum/volume bounds on gauge-invariant correlators, or a computer-assisted proof whose interval and truncation errors remain uniform as the cutoff is removed and the box grows. Better central values alone do not address the theorem.

## Sources

- [Athenodorou and Teper, detailed SU(3) glueball spectrum and continuum analysis](https://arxiv.org/abs/2007.06422)
- [Athenodorou and Teper, SU(N) spectra through N=12](https://arxiv.org/abs/2106.00364)
- [Bennett et al., pure Sp(4) glueball spectrum](https://arxiv.org/abs/1710.07043)
- [Lüscher and Wolff, variational finite-volume energy extraction](https://doi.org/10.1016/0550-3213(90)90540-T)
- [Jaffe and Witten, official Yang--Mills existence and mass-gap problem](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_numerical_lattice_glueball_continuum_audit.mjs
~~~
