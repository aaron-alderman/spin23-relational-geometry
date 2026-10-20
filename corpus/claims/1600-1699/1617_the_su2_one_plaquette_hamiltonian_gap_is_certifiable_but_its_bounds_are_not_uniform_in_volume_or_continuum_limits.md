# The SU(2) One-Plaquette Hamiltonian Gap Is Certifiable, but Its Bounds Are Not Uniform in Volume or Continuum Limits

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6 and A8

**Status:** exact character-basis Hamiltonian with residual and Schur-complement eigenvalue enclosures; finite gap certified across couplings, but continuum and thermodynamic uniformity fail

**Depends on:** [the positive moment-bound audit](1614_finite_positive_euclidean_moments_bound_a_gap_from_above_but_noisy_data_do_not_certify_a_positive_lower_gap.md), [the exact compact transfer calculation](../1500-1599/1595_exact_su2_heat_kernel_transfer_system_is_reflection_positive_but_does_not_scale_to_the_4d_mass_gap.md), and [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md)

**Evidence:** [Hamiltonian certification ledger](../../../evidence/data/spin23-su2-one-plaquette-hamiltonian-certification.json) and [deterministic verifier](../../../verification/verify/verify_spin23_su2_one_plaquette_hamiltonian_certification.mjs)

## Result

The gauge-invariant SU(2) one-plaquette Kogut--Susskind Hamiltonian is an infinite Jacobi matrix that can be certified, not merely diagonalized. Character truncation gives Ritz upper bounds. Positivity of the magnetic potential gives a rigorous Casimir floor on the omitted tail. A rank-one Schur-complement estimate then gives lower bounds, while the omitted boundary amplitude gives an independent residual certificate.

These enclosures converge rapidly at every tested coupling and prove a positive gap for the isolated plaquette. The proof module is reusable. Its constants are not uniform as the number of plaquettes grows, and the one-plaquette weak-coupling gap remains a cutoff-scale rotor excitation rather than a finite four-dimensional infrared mass.

## Exact character Hamiltonian

On a single open plaquette, maximal-tree gauge fixing leaves one holonomy (U\in SU(2)). Gauge-invariant states are class functions. The irreducible characters

\[
|n\rangle=\chi_{n/2}(U),\qquad n=0,1,2,\ldots
\]

are orthonormal under Haar measure. With the explicit convention

\[
H={2g^2\over a}h_\kappa,\qquad
h_\kappa=C_2+\kappa(2-\chi_{1/2}),\qquad
\kappa={1\over2g^4},
\]

the electric Casimir is diagonal and the character product rule is

\[
\chi_{1/2}\chi_j=\chi_{j+1/2}+\chi_{j-1/2}.
\]

Therefore

\[
\langle n|h_\kappa|n\rangle={n\over2}\left({n\over2}+1\right)+2\kappa,
\qquad
\langle n+1|h_\kappa|n\rangle=-\kappa.
\]

The additive (2\kappa) does not affect gaps. Other normalizations of the Kogut--Susskind Hamiltonian rescale (g,a), and (h); comparisons must first map conventions.

The multiplication operator \(\chi_{1/2}\) has spectrum in \([-2,2]\). Thus

\[
\kappa(2-\chi_{1/2})\succeq0,
\]

so the full Hamiltonian is self-adjoint, bounded below and confining in character number through the growing Casimir.

## Finite truncation and rigorous enclosures

Let \(P_N\) retain \(n=0,\ldots,N\), and write the first two eigenvalues of \(P_NhP_N\) as \(\theta_k^{(N)}\). Rayleigh--Ritz gives

\[
E_k\le U_k=\theta_k^{(N)}.
\]

On the omitted tail (Q_N), positivity of the magnetic term gives

\[
Q_NhQ_N\ge T_NQ_N,
\qquad
T_N={N+1\over2}\left({N+1\over2}+1\right).
\]

Only one matrix element crosses the cutoff:

\[
P_NhQ_N=-\kappa|N\rangle\langle N+1|.
\]

If (U_k<T_N), the Feshbach--Schur complement bounds the omitted resolvent by ((T_N-U_k)^{-1}). Define

\[
\delta_k={\kappa^2\over T_N-U_k}.
\]

Then the (k)-th eigenvalue of

\[
P_NhP_N-\delta_k|N\rangle\langle N|
\]

is a lower bound (L_k\le E_k). Hence the gap obeys the certified interval

\[
L_1-U_0\le E_1-E_0\le U_1-L_0.
\]

This is stronger than quoting converged decimals because the unrepresented infinite character tail is included in the inequality.

## Independent residual certificate

Let (v_k) be a normalized truncated Ritz vector, extended by zero into the omitted tail. Its full-space residual has exactly one component:

\[
\rho_k=\|(h-\theta_k)v_k\|=\kappa|v_k(N)|.
\]

Self-adjointness implies

\[
\operatorname{dist}(\theta_k,\operatorname{spec}h)\le\rho_k.
\]

The verifier reports both the Schur interval and \(\rho_k\). Rapid decay of the boundary component explains the much faster observed convergence than the worst-case operator norm \(\kappa\) would suggest.

## Coupling scan

The executable scan uses

\[
\kappa=0.05,0.5,2,8,32,128
\]

and character cutoffs (N=4,8,12,16,24,32,40). For each coupling it chooses the first cutoff whose gap interval is positive and whose relative width is below (10^{-8}). An independent (N=48) diagonalization must lie inside every certified interval.

At \(\kappa=0\), the Hamiltonian is the Casimir and the exact gap is

\[
C_2(1/2)-C_2(0)={3\over4}.
\]

As \(\kappa\) grows, the wavefunctions spread over more characters and the required \(N\) grows. Nevertheless each fixed coupling is a compact one-dimensional spectral problem, so the certified cutoff sequence converges rapidly once its boundary lies beyond the occupied character range.

## Why weak coupling does not give the continuum mass gap

The physical lattice-unit gap in this convention is

\[
a\Delta_H=2g^2\Delta_h,
\qquad g=(2\kappa)^{-1/4}.
\]

At large \(\kappa\), the magnetic well localizes the compact rotor near the identity and \(\Delta_h\) grows with the oscillator scale. The prefactor \(g^2\) compensates that growth, leaving a nonzero number of order one in lattice units. Thus

\[
\Delta_H\sim {\text{cutoff-scale constant}\over a}.
\]

This is not dimensional transmutation and not a finite physical mass as (a\to0). A four-dimensional mass gap would require a many-plaquette correlation length diverging in lattice units while (a\Delta\to0) along the asymptotically free renormalized trajectory.

## Why the certificate is not volume-uniform

For (P) independent loop labels and representation cutoff (N), the naive tensor basis already grows as

\[
(N+1)^P
\]

before Gauss-law recoupling. More importantly, many magnetic terms cross the cutoff. The one-plaquette rank-one boundary coupling of norm \(\kappa\) becomes an extensive boundary operator whose norm need not remain fixed.

The tail floor also changes character. In one coordinate, entering (Q_N) forces one Casimir above (T_N). In a coupled lattice, the first omitted many-body sector must be controlled relative to an extensive interacting vacuum, and local cutoff errors can accumulate with volume.

Finally, the gap is a difference of two extensive energies. Separate absolute enclosures that grow with volume are useless unless their errors cancel or remain uniformly smaller than the gap. The present Schur bound contains no such linked-cluster or locality estimate.

## Reusable constructive module

The part worth transporting is precise:

1. solve Gauss law and choose a gauge-invariant basis;
2. preserve self-adjointness and positivity under truncation;
3. produce Ritz upper bounds;
4. prove a lower floor for the omitted representation tail;
5. bound the cross-cutoff coupling through a Schur complement; and
6. verify residuals and ordered gap intervals.

A multi-plaquette proof would need tail and boundary estimates uniform in volume, plus a renormalized trajectory on which the certified lattice-unit gap has the correct vanishing rate. Those are the unsolved steps, not larger finite diagonalizations.

## Spin(2,3) consequence

The finite certification module can audit a compact internal gauge Hamiltonian coupled to a separately constrained Spin(2,3) sector. It is particularly useful for detecting loss of positivity or uncontrolled representation truncation in a proposed portal model.

Spin(2,3) symmetry does not make the representation tail, cross-cutoff coupling or thermodynamic limit uniform. Nor does it convert the isolated compact-rotor frequency into the four-dimensional Yang--Mills scale.

## Exhaustion boundary

For the one-plaquette character Hamiltonian, the available finite work is exhausted: exact matrix elements, coupling and cutoff scans, Ritz upper bounds, Schur lower bounds, residual distances and weak-coupling lattice-unit scaling are all executable.

The next proof-bearing advance must be a local many-plaquette estimate: ideally a linked-cluster or frustration-free comparison controlling the first excitation and truncation error uniformly in volume. Without that, more plaquettes provide numerical evidence but not the required theorem.

## Sources

- [Kogut and Susskind, Hamiltonian formulation of Wilson lattice gauge theory](https://doi.org/10.1103/PhysRevD.11.395)
- [Lüscher, positive transfer matrix for Euclidean lattice gauge theories](https://doi.org/10.1007/BF01614090)
- [Bauer and Grabowska, gauge-fixed bases for Hamiltonian SU(2) simulation](https://arxiv.org/abs/2307.11829)
- [Grubišić, Temple--Kato-type eigenvalue estimates](https://arxiv.org/abs/math/0511408)
- [Kahan, quadratic residual bounds for Hermitian eigenproblems](https://doi.org/10.1137/S0895479896310536)
- [Jaffe and Witten, official Yang--Mills existence and mass-gap problem](https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_su2_one_plaquette_hamiltonian_certification.mjs
~~~
