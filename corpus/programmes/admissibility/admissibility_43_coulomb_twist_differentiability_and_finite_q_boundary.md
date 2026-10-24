# Coulomb twist differentiability and the finite-q boundary

**Date:** 24 October 2026  
**Status:** reciprocal-density Hamiltonian closed; uniform image-twist derivative rejected; finite-q/screened route open  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-042](admissibility_42_ewald_image_cohomology_and_block_cross_boundary.md)  
**Evidence:** [Machine-readable execution register](../../../evidence/data/admissibility-planckian-coulomb-twist-differentiability-v1.json)
**Continuation:** [AZ-044](admissibility_44_finite_q_energy_continuity_kernel_and_gauge_boundary.md) constructs the nonzero-q continuity current and isolates thermodynamic gauge convergence as the next gate.

## Decision

The missing reciprocal object from AZ-042 can be derived by twisting the image index before Poisson resummation. An image character (\(e^{i\lambda\cdot n}\)) shifts every reciprocal vector by (\(\kappa=L^{-1}\lambda\)); differentiating the shifted reciprocal Ewald branch supplies exactly the compensator required by a convergent interaction. On the two-dimensional (1/r^4) control, the uncompensated real-image moment changes by 0.112 and 0.223 under changes of the arbitrary Ewald split, while the real-plus-reciprocal moment changes by only (7.43\times10^{-16}) and (6.74\times10^{-16}). The derivation and its sign are therefore closed.

The production (1/r) interaction does not pass the next, more fundamental gate. Its reciprocal zero mode scales as (1/|q|). Under the continuous image twist the zero-mode factor is

\[
\widehat V(-\kappa)\left(e^{-i\kappa\cdot r}-1\right),
\]

which has a direction-dependent jump at (\kappa=0), not a derivative. The norm of its symmetric difference quotient at steps (2\times10^{-3},10^{-3},5\times10^{-4},2.5\times10^{-4}) is respectively 1,910.69, 3,822.61, 7,646.43 and 15,294.08. Halving the step doubles the quotient. Adding a finite reciprocal correction to the real-image moment would therefore hide an infrared divergence rather than complete the current.

## The dimensional boundary

For a reference-subtracted periodic power law (V(r)\sim1/r^\alpha) in (d) dimensions, the shell contribution to the first image-winding moment scales as (R^{d-1-\alpha}). The moment is absolutely convergent only for

\[
\alpha>d.
\]

The same boundary appears after Poisson resummation: (\widehat V(q)\sim |q|^{\alpha-d}), so the twist difference quotient scales as (|\kappa|^{\alpha-d}). The production point ((d,\alpha)=(2,1)) is inside the nondifferentiable region, not near a numerical threshold. The (\alpha=4) test is deliberately on the other side of the boundary and closes to roundoff.

## Hamiltonian closure is not current closure

The failure is not a failure of the Ewald Hamiltonian. The full 3x3 kernel now has an exact finite-group representation

\[
H_V=\frac12\sum_{ij}V(r_j-r_i)q_iq_j
=\frac{1}{2N}\sum_k V_k\rho_k\rho_{-k}.
\]

The neutralizing-background subtraction gives (V_{k=0}=0), and the real-space and reciprocal-density energies agree below (10^{-12}) on the executable occupation oracle. Thus the finite torus, its background convention and its density interaction are well defined. What fails is the stronger operation of extending the removed zero mode continuously and differentiating it as though a uniform image twist were analytic.

This distinction is consistent with the external controls. Two-dimensional periodic Coulomb energies require a background and careful treatment of conditionally convergent sums; Ewald heat flux has a non-pairwise reciprocal contribution; and thermal vector-potential formulations require consistent equilibrium terms rather than a naive coupling. None of those results supplies the missing order of limits for this quantum lattice model. [Petravic 2005](https://doi.org/10.1063/1.2102867), [Galamba, Nieto de Castro and Ely 2007](https://doi.org/10.1063/1.2734965), [Tatara 2015](https://doi.org/10.1103/PhysRevLett.114.196601), [Ballenegger 2014](https://doi.org/10.1063/1.4872019).

## Consequence for the admissibility zone

This adds a new filled boundary to the map:

- **filled:** exact periodic Ewald Hamiltonian;
- **filled:** exact reciprocal-density representation and removed neutral zero mode;
- **filled:** Poisson-dual twist compensator for (\alpha>d);
- **unfilled by theorem-level failure:** a differentiable uniform image twist for the unscreened two-dimensional (1/r) kernel;
- **open:** finite-wavevector continuity current with the thermodynamic limit taken before (q\to0);
- **open:** screened/Yukawa current with an explicitly tested order of the screening, frequency and size limits;
- **open:** a matter-plus-field formulation in which electromagnetic field energy carries the long-range flux.

The minimum-image cycle current remains a finite-torus candidate, not a uniquely derived Coulomb heat current. The seam current remains an exact polarization derivative. Neither one resolves the zero-mode order of limits.

## Next admitted tranche

The next calculation must not try another uniform winding derivative. It should:

1. define reciprocal energy density (h_q) at nonzero allowed lattice wavevector;
2. obtain (j_E(q)) from the exact continuity equation (\dot h_q+i q\cdot j_E(q)=0) without differentiating through (q=0);
3. compare the lowest nonzero wavevectors across increasing odd tori and, separately, introduce a screening mass;
4. declare and collide the limits (L\to\infty), (q\to0), screening (\mu\to0), frequency (\omega\to0) and broadening (\eta\to0);
5. admit a transport atlas only if the resulting longitudinal current is splitting independent and converges to the same cycle-sector operator under at least two routes.

## Corpus adjudication

This is a useful obstruction, not evidence of new physics or Spin(2,3). It identifies precisely where topology, long range and an order of limits enter the admissibility zone. A genuinely anomalous result can only begin after the conventional finite-q and screened routes disagree despite matched limits and backgrounds.
