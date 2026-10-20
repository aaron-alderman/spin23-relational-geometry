# The Gapped 0-Minus Torsion Mode Survives AdS and Hyperbolicity, but Not Radiative Closure

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** AdS, characteristic, canonical and one-loop stress test of claim 1603; viable EFT patch, not a closed fundamental action

**Depends on:** [the first-order healthy torsion sector](1603_the_first_order_spin23_extension_has_a_nonempty_healthy_gapped_pseudoscalar_torsion_sector.md), [the local curvature-square ghost gate](../1500-1599/1599_the_minimal_propagating_spin23_extension_admits_gapped_scalars_but_local_weyl_square_forces_a_spin2_ghost.md), and [the explicit algebraic parent action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md)

**Evidence:** [stress-test ledger](../../../evidence/data/spin23-pseudoscalar-torsion-stress-test.json) and [verifier](../../../verification/verify/verify_spin23_pseudoscalar_torsion_stress_test.mjs)

## Result

The positive $0^-$ torsion pole from claim 1603 survives three additional classical tests:

1. on torsionless AdS$_4$ it is an ordinary minimally coupled pseudoscalar and lies above the Breitenlohner--Freedman bound throughout the positive-mass region;
2. its principal symbol has exactly the metric null cone, so the isolated mode is luminal and normally hyperbolic; and
3. its canonical system has six second-class constraints and exactly one physical torsion degree of freedom whenever the axial algebraic coefficient is nonzero.

It fails a different test. The action containing only the pseudoscalar-curvature square $\widehat X^2$ is not radiatively closed. The propagating torsion pseudoscalar itself generates nonzero $C^2$ and $R^2$ curvature counterterms at one loop, and full Poincare-gauge calculations likewise find that sparse coupling sets populate additional invariants.

The strongest honest conclusion is therefore:

\[
\boxed{
\text{healthy gapped torsion EFT patch}
\quad\neq\quad
\text{radiatively closed fundamental theory}.
}
\]

## Input sector

The isolated axial block is

\[
\mathcal L_{0^-}^{(2)}
=\frac{a_S}{2}S_\mu S^\mu
+\frac{b_X}{2}(\nabla_\mu S^\mu)^2,
\qquad
a_S=\frac{M_{\rm Pl}^2(1-4\lambda)}{24}.
\]

Its exact auxiliary dual is

\[
\mathcal L_\chi
=-\frac1{2a_S}(\nabla\chi)^2
-\frac1{2b_X}\chi^2,
\qquad
m_{0^-}^2=\frac{a_S}{b_X}.
\]

The flat quadratic health region found in claim 1603 is

\[
M_{\rm Pl}^2>0,
\qquad \lambda<\frac14,
\qquad b_X>0,
\qquad \lambda\neq-\frac12.
\]

## AdS4 stability

Take the natural broken-$Spin(2,3)$ background

\[
\Lambda=-\frac3{\ell^2}
\]

with zero background torsion. At linear order the curvature pseudoscalar remains

\[
\widehat X^{(1)}=\nabla_\mu S^\mu,
\]

and the auxiliary reduction is covariant. The canonical pseudoscalar obeys

\[
(\Box-m_{0^-}^2)\varphi=0.
\]

For a scalar in AdS$_4$, stability requires

\[
m^2\ell^2\geq-\frac94.
\]

The claim-1603 region has $m_{0^-}^2>0$, so it passes with room to spare. For the finite witness

\[
M_{\rm Pl}^2=\ell^2=1,
\qquad\lambda=0,
\qquad b_X=\frac1{24},
\]

one obtains

\[
m_{0^-}^2\ell^2=1,
\qquad m^2\ell^2+\frac94=\frac{13}{4}.
\]

The two AdS weights are

\[
\Delta_\pm=\frac{3\pm\sqrt{9+4m^2\ell^2}}2
=\frac{3\pm\sqrt{13}}2.
\]

Global AdS still requires a boundary condition. The claim assumes the standard energy-preserving quantization; positivity of the bulk mass is not a substitute for specifying the boundary-value problem.

## Characteristics and propagation speed

The dual equation has principal symbol

\[
\mathcal P(k)=-\frac1{a_S}g^{\mu\nu}k_\mu k_\nu.
\]

For $a_S>0$ it is nondegenerate, and the characteristic equation is simply

\[
g^{\mu\nu}k_\mu k_\nu=0.
\]

The isolated torsion mode therefore propagates on the metric light cone with $c_{0^-}=1$. On globally hyperbolic patches the Klein--Gordon reduction is normally hyperbolic. This result does not automatically survive once other curvature/torsion operators are activated or the constraint matrix loses rank.

## Canonical constraint count

Treat the four components $S_\mu$ as configuration variables. Only $\partial_0S^0$ occurs in $\nabla\!\cdot S$, giving three primary constraints

\[
\pi^i\approx0.
\]

Their preservation gives three secondary constraints

\[
\mathcal C_i=a_SS_i-\partial_i\pi^0\approx0.
\]

For $a_S\neq0$,

\[
\{\pi^i,\mathcal C_j\}=a_S\delta^i{}_j,
\]

so all six constraints are second class. The exact count is

\[
N_{\rm dof}=\frac{8-6}{2}=1.
\]

Equivalently, the six-constraint Dirac determinant is proportional to $a_S^6$. It collapses at $a_S=0$, precisely $\lambda=1/4$. At $b_X=0$, the momentum of $S^0$ is also constrained and the propagating mode disappears. These limits cannot be reached by naively continuing the one-pole formula.

## Nonlinear constraint bifurcation

The full Poincare-gauge Hamiltonian analysis by Yo and Nester supports normal propagation of the massive $0^-$ mode, but also finds constraint bifurcation on special nonlinear field/parameter surfaces. The rank of the constraint matrix can change there, altering the physical degree count and potentially the predictability of the equations.

Accordingly, the healthy region must be refined to a field-space statement:

\[
\det\mathcal D_{\rm full}\neq0
\]

on the connected patch containing the vacuum. The present reduced determinant $a_S^6$ verifies the vacuum block but is not a proof that the full nonlinear determinant never vanishes. Coupling the $0^-$ sector to higher-spin torsion modes is especially unsafe: nonlinear analyses find mode activation and further bifurcation in such enlarged sectors.

## One-loop radiative-closure spurion

There is no symmetry that singles out $\widehat X^2$. Diffeomorphism, local Lorentz and parity invariance also permit

\[
C_{\mu\nu\rho\sigma}^2,
\qquad R^2,
\qquad E_4,
\]

as well as the remaining parity-even curvature/torsion invariants. All have the relevant dimension for logarithmic four-dimensional counterterms. Setting their coefficients to zero restores no enhanced symmetry, so the sparse surface is not technically natural.

The exact low-energy dual makes the failure explicit. In a common dimensional-regularization convention, one real minimally coupled pseudoscalar contributes the standard one-loop divergence

\[
\Gamma_{\rm div}^{(1)}
\supset\frac1{(4\pi)^2\epsilon}
\int d^4x\sqrt{-g}\left[
\frac1{120}C^2
-\frac1{360}E_4
+\frac1{72}R^2
\right],
\]

up to total derivatives and mass-dependent lower-dimension terms. In particular,

\[
\beta_{C^2}\big|_{C^2=0}\neq0,
\qquad
\beta_{R^2}\big|_{R^2=0}\neq0.
\]

This is a finite spurion proof that the one-invariant surface is not closed. An explicit one-loop Poincare-gauge calculation by Melichev and Percacci reaches the same structural conclusion in a different sparse model: starting from one term of each type generates the other terms and additional operators. It is corroboration, not a numerical beta function for this exact $0^-$ truncation.

## Does the generated Weyl term kill the mode?

Two meanings must be separated.

As a fundamental local polynomial action extrapolated to arbitrary momentum and quantized with ordinary Feynman poles, resumming the generated $C^2$ term recreates claim 1599's opposite-residue massive spin-2 pole. The minimal action therefore fails as a radiatively closed fundamental completion.

As an effective field theory below a cutoff $\Lambda_{\rm EFT}$, a curvature counterterm is treated perturbatively. Its formal extra pole need not lie within the regime of validity. The healthy torsion excitation survives as a controlled low-energy state provided

\[
m_{0^-}<\Lambda_{\rm EFT}
\]

and the induced higher-derivative corrections remain perturbative.

## Strongest surviving region

The programme can retain the following, but no more:

\[
\boxed{
\begin{gathered}
M_{\rm Pl}^2>0,
\quad\lambda<\frac14,
\quad\lambda\neq-\frac12,
\quad b_X>0,\\
m_{0^-}<\Lambda_{\rm EFT},
\quad\det\mathcal D_{\rm full}\neq0,
\quad\text{energy-preserving AdS boundary data}.
\end{gathered}}
\]

On such a patch the spectrum is the massless AdS graviton plus one luminal, positive-residue, positive-mass $0^-$ torsion excitation. The minimal coupling surface is not an exact quantum theory.

## Stop rules

1. Stop wherever the full nonlinear Dirac matrix changes rank.
2. Stop calling the $\widehat X^2$-only surface radiatively stable: one scalar loop already disproves it.
3. Do not resum EFT counterterms into claimed particles above the cutoff.
4. Any proposed local fundamental completion must include the generated operator basis and repeat every spin-parity residue and constraint test.
5. Repeat the analysis with actual matter couplings and explicit AdS boundary conditions before phenomenology.

## Sources

- H.-J. Yo and J. M. Nester, [*Hamiltonian Analysis of Poincare Gauge Theory Scalar Modes*](https://arxiv.org/abs/gr-qc/9902032), *International Journal of Modern Physics D* **8** (1999) 459--479.
- P. Breitenlohner and D. Z. Freedman, [*Stability in Gauged Extended Supergravity*](https://doi.org/10.1016/0003-4916(82)90116-6), *Annals of Physics* **144** (1982) 249--281.
- E. Sezgin and P. van Nieuwenhuizen, [*New Ghost-Free Gravity Lagrangians with Propagating Torsion*](https://doi.org/10.1103/PhysRevD.21.3269), *Physical Review D* **21** (1980) 3269--3280.
- O. Melichev and R. Percacci, [*On the Renormalization of Poincare Gauge Theories*](https://arxiv.org/abs/2307.02336), *Universe* **10** (2024) 101.
- G. 't Hooft and M. Veltman, [*One-Loop Divergencies in the Theory of Gravitation*](https://www.numdam.org/item/AIHPA_1974__20_1_69_0/), *Annales de l'Institut Henri Poincare A* **20** (1974) 69--94.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pseudoscalar_torsion_stress_test.mjs
~~~
