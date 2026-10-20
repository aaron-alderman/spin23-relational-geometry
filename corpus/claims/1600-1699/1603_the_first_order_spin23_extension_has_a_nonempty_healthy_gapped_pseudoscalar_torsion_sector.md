# The First-Order Spin(2,3) Extension Has a Nonempty Healthy Gapped Pseudoscalar-Torsion Sector

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A7 and A11

**Status:** exact Minkowski quadratic spin-parity result for the isolated parity-even $0^-$ Poincare-gauge subclass; nonlinear and AdS completion remain open

**Depends on:** [the explicit algebraic torsion calculation](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), [the reduced propagating extension](../1500-1599/1599_the_minimal_propagating_spin23_extension_admits_gapped_scalars_but_local_weyl_square_forces_a_spin2_ghost.md), and [the sector-selective gravity gate](../1500-1599/1591_spin23_requires_a_sector_selective_not_universal_gravitational_mass_gap.md)

**Evidence:** [first-order pseudoscalar-torsion ledger](../../../evidence/data/spin23-first-order-pseudoscalar-torsion-sector.json) and [verifier](../../../verification/verify/verify_spin23_first_order_pseudoscalar_torsion_sector.mjs)

## Result

The larger first-order action class excluded from claim 1599 changes the answer. A smallest literature-supported parity-even curvature square can differentiate one component of the independent Lorentz connection without adding the metric Weyl ghost.

The tractable subclass has the spectrum

\[
\boxed{
2\ \text{healthy massless }2^+\text{ helicities}
+1\ \text{healthy massive }0^-\text{ torsion mode}.
}
\]

The healthy region is nonempty. In the normalization below it is

\[
M_{\rm Pl}^2>0,
\qquad \lambda<\frac14,
\qquad b_X>0,
\qquad \lambda\neq-\frac12.
\]

This is the first explicit action-level realization in the programme of a massless graviton plus a genuinely gapped torsion sector. It is a quadratic admission result, not yet a complete nonlinear or quantum theory.

## Why the first-order class is different

Claims 1596 and 1599 first eliminated the independent connection. Curvature squares built afterward from the Levi--Civita connection can propagate a scalaron or the familiar Weyl ghost, but cannot restore a torsion pole.

Here the Lorentz connection remains independent. After the Stelle--West selector breaks $Spin(2,3)$ to $Spin(1,3)$,

\[
\omega^{ab}=\mathcal A^{ab},
\qquad e^a=\ell\mathcal A^{a4},
\]

and its curvature has invariants unavailable in a torsionless Riemannian reduction. The simplest useful one is the pseudoscalar curvature

\[
\widehat X\propto
\epsilon^{\mu\nu\rho\sigma}R_{\mu\nu\rho\sigma}(\omega),
\]

normalized here so that about torsionless Minkowski space

\[
\widehat X^{(1)}=\partial_\mu S^\mu,
\qquad
S^\mu=\epsilon^{\alpha\beta\gamma\mu}T_{\alpha\beta\gamma}.
\]

Although $\widehat X$ is odd under parity, $\widehat X^2$ is parity even. For the Levi--Civita connection it vanishes by the first Bianchi identity, so its square adds no metric spin-2 pole at quadratic order.

## Explicit broken action and Spin(2,3) mapping

Use the claim-1596 density and add one invariant:

\[
\mathcal L=\sqrt{-g}\left\{
\frac{M_{\rm Pl}^2}{2}
\left[R(\omega)+\lambda T_{\mu\nu\rho}T^{\mu\nu\rho}-2\Lambda\right]
+\frac{b_X}{2}\widehat X^2
\right\}.
\]

Here $M_{\rm Pl}^2=1/\kappa$. The fields $e$ and $\omega$ are the broken components of the original $Spin(2,3)$ connection, while the selector defines the Lorentz epsilon tensor used in $\widehat X$. Thus $b_X$ is a new broken-phase coupling; it is not fixed by the minimal MacDowell--Mansouri coefficient.

The action is a special case of the parity-even quadratic Poincare-gauge theories whose ghost/tachyon-free spectra were classified by Sezgin and van Nieuwenhuizen. The massive $0^-$ mode also has an explicit Hamiltonian analysis by Yo and Nester, including the warning that special nonlinear field/parameter surfaces can change the constraint rank.

## Exact axial reduction

With the conventions already fixed in claim 1596,

\[
R(\omega)=R(\mathring\omega)
-\frac43T^2+\frac1{24}S^2+\frac12q^2
+\text{boundary},
\]

and

\[
T_{\mu\nu\rho}T^{\mu\nu\rho}
=\frac23T^2-\frac16S^2+q^2.
\]

Consequently the axial quadratic block is

\[
\mathcal L_{0^-}^{(2)}
=\frac{a_S}{2}S_\mu S^\mu
+\frac{b_X}{2}(\partial_\mu S^\mu)^2,
\qquad
a_S=\frac{M_{\rm Pl}^2(1-4\lambda)}{24}.
\]

Only the longitudinal divergence propagates. In transverse and longitudinal vector projectors,

\[
P_L^{\mu\nu}=\frac{p^\mu p^\nu}{p^2},
\qquad P_T^{\mu\nu}=\eta^{\mu\nu}-P_L^{\mu\nu},
\]

the Euclidean quadratic kernel and inverse are

\[
K=a_SP_T+(a_S+b_Xp^2)P_L,
\qquad
K^{-1}=\frac{P_T}{a_S}+\frac{P_L}{a_S+b_Xp^2}.
\]

The transverse block has no momentum-dependent denominator, whereas the longitudinal block has one pole at $p^2=-a_S/b_X$. Thus the three transverse components remain algebraic; counting all four components of $S_\mu$ as particles would be wrong.

## Exact pole and residue witness

Introduce one auxiliary pseudoscalar $\chi$:

\[
\frac{b_X}{2}(\partial\!\cdot S)^2
=-\frac{\chi^2}{2b_X}+\chi\,\partial\!\cdot S.
\]

After integration by parts,

\[
\mathcal L_{0^-}^{(2)}
=\frac{a_S}{2}S^2-(\partial_\mu\chi)S^\mu
-\frac{\chi^2}{2b_X}.
\]

The vector is now algebraic:

\[
S_\mu=\frac{\partial_\mu\chi}{a_S}.
\]

Eliminating it gives

\[
\mathcal L_\chi
=-\frac1{2a_S}(\partial\chi)^2
-\frac1{2b_X}\chi^2.
\]

For $a_S>0$, the canonical field $\varphi=\chi/\sqrt{a_S}$ has

\[
\mathcal L_\varphi
=-\frac12(\partial\varphi)^2
-\frac12m_{0^-}^2\varphi^2,
\qquad
m_{0^-}^2=\frac{a_S}{b_X}
=\frac{M_{\rm Pl}^2(1-4\lambda)}{24b_X}.
\]

The residue in the unnormalized $\chi$ two-point function is $a_S$. Hence the exact health conditions are

\[
a_S>0\Longleftrightarrow\lambda<\frac14,
\qquad b_X>0.
\]

The first condition gives positive residue; together they give positive mass squared.

## Finite healthy point

Choose

\[
M_{\rm Pl}^2=1,
\qquad\lambda=0,
\qquad b_X=\frac1{24}.
\]

Then

\[
a_S=\frac1{24},
\qquad m_{0^-}^2=1.
\]

The metric sector still contains only the two positive-residue massless graviton helicities, while the connection contributes one positive-residue massive pseudoscalar. This is a genuine torsion gap, rather than an algebraic stiffness or a metric scalaron.

## Exact failure boundaries

- $\lambda>1/4$ gives $a_S<0$: the $0^-$ pole is a ghost.
- $\lambda<1/4$ with $b_X<0$ gives $m_{0^-}^2<0$: the mode is tachyonic.
- $b_X=0$ removes the derivative term: axial torsion is auxiliary again.
- $\lambda=1/4$ is the axial degeneracy already found in claim 1596. The auxiliary dual is singular there, so it is not an additional massless particle by continuity.
- $\lambda=-1/2$ leaves the 16-component tensor-torsion block degenerate. The isolated one-mode truncation is then unjustified even though the axial coefficient is positive.
- $\lambda=2$ is the trace-torsion degeneracy, already outside the healthy axial half-line.

This gives the requested translation from Poincare-gauge positivity back into the broken-$Spin(2,3)$ variable $\lambda$.

## What succeeds and what remains

Success means more here than in claim 1599: an independent connection component now has a genuine kinetic pole, positive residue and positive mass squared while the graviton remains massless. The long-range Newtonian and Lense--Thirring sectors are not Yukawa suppressed.

The result remains deliberately narrow. It does not establish:

- nonlinear global stability;
- absence of constraint bifurcation on all backgrounds;
- AdS stability around the natural $Spin(2,3)$ vacuum;
- radiative closure of the one-invariant truncation;
- causal characteristic cones; or
- a nonperturbative quantum construction.

Switching on more curvature invariants activates other $0^\pm,1^\pm,2^\pm$ blocks. Their health cannot be inherited from this one-mode calculation. Conversely, the local Weyl-square ghost of claim 1599 is absent here because $\widehat X^2$ is zero in the torsionless metric sector.

## Stop rules

1. Admit the $0^-$ pole only for $M_{\rm Pl}^2>0$, $\lambda<1/4$, $b_X>0$ and $\lambda\neq-1/2$.
2. Stop at $\lambda=1/4$ or $-1/2$ for a nonlinear Dirac-constraint analysis.
3. Do not count transverse algebraic axial components as propagating modes.
4. Repeat the pole/residue analysis on AdS before claiming full Spin(2,3)-vacuum viability.
5. Reject any radiatively generated coupling set that activates a negative-residue or tachyonic spin-parity block.
6. Do not identify this torsion particle gap with the four-dimensional Yang--Mills mass gap.

## Sources

- E. Sezgin and P. van Nieuwenhuizen, [*New Ghost-Free Gravity Lagrangians with Propagating Torsion*](https://doi.org/10.1103/PhysRevD.21.3269), *Physical Review D* **21** (1980) 3269--3280.
- H.-J. Yo and J. M. Nester, [*Hamiltonian Analysis of Poincare Gauge Theory Scalar Modes*](https://arxiv.org/abs/gr-qc/9902032), *International Journal of Modern Physics D* **8** (1999) 459--479.
- P. Baekler, F. W. Hehl and J. M. Nester, [*Poincare Gauge Theory of Gravity: Friedman Cosmology with Even and Odd Parity Modes*](https://arxiv.org/abs/1009.5112), *Physical Review D* **83** (2011) 024001.
- S. W. MacDowell and F. Mansouri, [*Unified Geometric Theory of Gravity and Supergravity*](https://doi.org/10.1103/PhysRevLett.38.1376), *Physical Review Letters* **38** (1977) 1376.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_first_order_pseudoscalar_torsion_sector.mjs
~~~
