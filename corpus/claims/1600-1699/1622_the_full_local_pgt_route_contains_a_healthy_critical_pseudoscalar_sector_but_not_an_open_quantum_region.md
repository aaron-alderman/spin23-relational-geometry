# The Full Local PGT Route Contains a Healthy Critical Pseudoscalar Sector but Not an Open Quantum Region

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** exact published critical-class, pole-sign, nonlinear constraint-rank and radiative-closure audit

**Depends on:** [the first-order admission result](1603_the_first_order_spin23_extension_has_a_nonempty_healthy_gapped_pseudoscalar_torsion_sector.md), [its AdS and radiative stress test](1607_the_gapped_0minus_torsion_mode_survives_ads_and_hyperbolicity_but_not_radiative_closure.md), [the fermionic portal](1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md), and [the complete isolated axial-sector no-go](1615_the_complete_quadratic_axial_torsion_sector_cannot_make_its_spin1_and_spin0_poles_healthy_together.md)

**Evidence:** [critical-class ledger](../../../evidence/data/spin23-critical-pgt-pseudoscalar-class.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_pseudoscalar_class.mjs)

## Result

The remaining local parity-even route does contain a genuine positive example. In the full first-order Poincare-gauge invariant basis, the massive $0^-$ critical class isolated by Yo and Nester has

\[
\boxed{2\ \hbox{massless }2^+\hbox{ helicities}+1\ \hbox{massive healthy }0^-\hbox{ torsion mode}}
\]

and no other linear particle poles. An explicit healthy point is

\[
\ell^2=\kappa=1,\quad
a_0=2,\ a_1=1,\ a_2=-2,\ a_3=-\frac12,
\quad b_3=-1,
\quad b_1=b_2=b_4=b_5=b_6=0.
\]

This is stronger than a reduced ansatz: the published nonlinear Hamiltonian count gives exactly three configuration degrees of freedom, and its relevant constraint determinant is strictly positive for every nondegenerate spatial coframe when the pseudoscalar is massive.

But this does not define an open healthy region of the unrestricted theory. It lies on a critical surface fixed by seven algebraic equalities. No known symmetry protects those equalities from loop counterterms. The endpoint is therefore a consistent classical critical sector, or a tuned low-energy EFT, rather than a radiatively closed quantum action.

## The explicit published critical class

Use the standard parity-even PGT notation: $a_0$ multiplies scalar curvature, $a_1,a_2,a_3$ multiply the three irreducible torsion squares, and $b_1,\ldots,b_6$ multiply the irreducible curvature squares. Yo and Nester's massive $0^-$ class is

\[
2a_1+a_2=0,\qquad a_1+2a_3=0,
\]

\[
b_1=b_2=b_4=b_5=b_6=0,
\qquad a_0\ne0,\quad b_3\ne0.
\]

The spin-projector combinations relevant to $0^-$ reduce to

\[
b_2+b_3=b_3,
\qquad
\frac{a_0}{2}+a_3=\frac{a_0-a_1}{2}.
\]

The Hamiltonian positivity conditions reported for this mode are

\[
a_1>0,\qquad \frac{b_3}{\kappa}<0.
\]

Taking in addition $a_0>a_1$ gives a positive projected mass coefficient and $a_0>0$ gives the Einstein graviton sign. These strict inequalities define a nonempty region *within* the critical surface.

In a positive-normalized reduced basis, set

\[
A=\frac{a_0-a_1}{\ell^2}>0,
\qquad B=-\frac{b_3}{\kappa}>0.
\]

The isolated axial block is equivalent, up to nonzero convention-dependent field rescalings, to

\[
\mathcal L_{0^-}=\frac A2S_\mu S^\mu+
\frac B2(\partial_\mu S^\mu)^2.
\]

Its transverse components have the algebraic eigenvalue $A$. Introducing an auxiliary pseudoscalar gives

\[
\mathcal L_\chi=-\frac{1}{2A}(\partial\chi)^2-
\frac{1}{2B}\chi^2,
\qquad m_{0^-}^2=\frac AB>0.
\]

Thus there is one positive-residue longitudinal pseudoscalar pole, while the transverse axial components do not propagate. The displayed point has $A=B=1$ and hence $m^2=1$ in this stated reduced normalization. Numerical masses quoted in another irreducible-curvature convention require restoring its projector normalization factors; the pole count and signs do not.

## Exact nonlinear constraint witness

The canonical analysis begins with 80 phase-space variables. For the massive $0^-$ class it finds 20 first-class constraints and 34 second-class constraints, so

\[
N_{\rm configuration}
=\frac{80-2(20)-34}{2}=3.
\]

Those are precisely two graviton helicities and one pseudoscalar. More importantly, the determinant of the field-dependent primary-if-constraint bracket block is

\[
\det\Delta=J^{-12}
\left[\left(\frac{{}^p\!\pi}{6J}\right)^2+m^2\right]^6,
\qquad m=\frac{a_0-a_1}{\ell^2}.
\]

For a real massive mode $m\ne0$ and nondegenerate spatial volume $J>0$, this is strictly positive for every value of the pseudoscalar momentum. The analyzed block therefore cannot suffer nonlinear rank bifurcation anywhere in that domain.

At $a_0=a_1$, $m=0$ and the determinant can vanish. That is not an additional healthy massless particle obtained by continuity: it is the separate gauge class identified as dynamically equivalent to GR. The determinant result also should not be inflated into a theorem for arbitrary added invariants, matter couplings, degenerate tetrads or global boundary conditions.

## Precise broken-$Spin(2,3)$ map

With a fixed-norm Stelle--West selector $V^A$,

\[
e^a=\ell\mathcal A^{a4},\qquad
\omega^{ab}=\mathcal A^{ab}.
\]

The $a_0$ term is supplied by the MacDowell--Mansouri/Stelle--West cross term. The selector defines the Lorentz Hodge star and the irreducible projectors needed to write

\[
T^{(I)a}\wedge\star T^{(I)}{}_a,
\qquad I=1,2,3,
\]

whose coefficients must satisfy

\[
a_2=-2a_1,\qquad a_3=-\frac12a_1.
\]

The surviving $b_3$ term is the square of the pseudoscalar irreducible Riemann--Cartan curvature; the other five displayed curvature coefficients vanish. This is a real enlargement of the minimal action. The single $T_{\mu\nu\rho}T^{\mu\nu\rho}$ deformation of claim 1596 cannot generically enforce both independent torsion relations.

The map also assumes that $V^AV_A$ is fixed and the selector has no propagating radial or orientation mode. If it is dynamical, its scalars mix with $0^-$ and the three-degree-of-freedom count must be redone.

## Constraint bifurcation: what survives

This critical class passes the strongest tractable nonlinear rank test: the explicit determinant above never vanishes for $m\ne0$. That resolves the main ambiguity left in claim 1603 for this selected class.

It does not rescue arbitrary neighboring couplings. Relaxing a critical equality changes the primary-constraint structure and generally activates other $0^\pm,1^\pm,2^\pm$ sectors. The no-go in claim 1615 explains one immediate danger: generating an ordinary transverse axial kinetic term alongside the longitudinal scalar cannot make both poles healthy in the isolated two-derivative vector theory.

The natural unbroken-$Spin(2,3)$ vacuum is AdS rather than Minkowski. Claim 1607 established the reduced $0^-$ mode's AdS stability and luminal principal characteristic when its mass is positive. Nevertheless, the full critical PGT spin-projector and Dirac algebra on AdS remains a necessary final background-specific check.

## Radiative closure fails

The selected theory imposes two torsion relations and five curvature zeros. They are a critical degeneracy, not an identified gauge symmetry. General PGT one-loop calculations require the larger allowed counterterm basis. With fermions, the axial-current coupling studied in claim 1611 generates a transverse $F_S^2$ term. Either effect leaves the exact critical surface and can activate modes removed by its constraints.

Power-counting-renormalizable critical cases found in later classifications do not by themselves solve this problem: power counting limits operator dimension, whereas radiative closure requires the chosen coupling relations to be preserved by beta functions or symmetry. No such protection has been established for this broken-$Spin(2,3)$ embedding.

Hence the honest classification is:

- an exact healthy classical linear spectrum;
- a strong nonlinear no-bifurcation result for the relevant massive $0^-$ constraint block;
- an open set only relative to a codimension critical surface;
- a viable tuned EFT below the scale at which generated operators matter; and
- not yet a radiatively closed quantum theory.

## Stop rules

1. Admit the spectrum only after all critical equalities and $a_0>a_1>0$, $a_1>0$, $b_3/\kappa<0$ are checked.
2. Do not describe the solution as open in the full PGT coupling space.
3. At $a_0=a_1$, switch to the separate GR gauge-class analysis; do not count a continuous massless torsion particle.
4. Recompute the complete projector and Dirac system if any forbidden $b_i$ is generated or either torsion equality is relaxed.
5. Treat loop departures as EFT counterterms with a cutoff unless a protecting parent symmetry is demonstrated.
6. Repeat the full critical-class calculation on AdS before promoting it to a complete broken-$Spin(2,3)$ vacuum.

## Sources

- H.-J. Yo and J. M. Nester, [*Hamiltonian Analysis of Poincare Gauge Theory Scalar Modes*](https://arxiv.org/abs/gr-qc/9902032), *International Journal of Modern Physics D* **8** (1999) 459--479.
- E. Sezgin and P. van Nieuwenhuizen, [*New Ghost-Free Gravity Lagrangians with Propagating Torsion*](https://doi.org/10.1103/PhysRevD.21.3269), *Physical Review D* **21** (1980) 3269--3280.
- W. E. V. Barker, A. N. Lasenby, M. P. Hobson and W. J. Handley, [*Systematic study of background cosmology in unitary Poincare gauge theories with application to emergent dark radiation and Hubble tension*](https://arxiv.org/abs/2003.02690), *Physical Review D* **102** (2020) 024048.
- C. Lin, M. P. Hobson and A. N. Lasenby, [*Ghost and tachyon free Poincare gauge theories: a systematic approach*](https://arxiv.org/abs/1812.02675), *Physical Review D* **99** (2019) 064001.
- C. Lin, M. P. Hobson and A. N. Lasenby, [*Power-counting renormalizable, ghost-and-tachyon-free Poincare gauge theories*](https://arxiv.org/abs/1910.14197), *Physical Review D* **101** (2020) 064038.
- I. G. Melichev and R. Percacci, [*On the renormalization of Poincare gauge theories*](https://arxiv.org/abs/2307.02336).

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_pseudoscalar_class.mjs
~~~
