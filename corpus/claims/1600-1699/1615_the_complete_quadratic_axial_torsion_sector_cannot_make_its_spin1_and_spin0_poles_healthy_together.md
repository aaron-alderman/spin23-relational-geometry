# The Complete Quadratic Axial-Torsion Sector Cannot Make Its Spin-1 and Spin-0 Poles Healthy Together

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** exact flat-space two-derivative axial-vector pole, residue, constraint and finite-scan no-go

**Depends on:** [the fermion portal and its loop-generated transverse kinetic term](1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md), [the isolated healthy $0^-$ pole](1603_the_first_order_spin23_extension_has_a_nonempty_healthy_gapped_pseudoscalar_torsion_sector.md), and [its EFT stress test](1607_the_gapped_0minus_torsion_mode_survives_ads_and_hyperbolicity_but_not_radiative_closure.md).

**Evidence:** [quadratic axial-torsion ledger](../../../evidence/data/spin23-complete-quadratic-axial-torsion-no-go.json) and [verifier](../../../verification/verify/verify_spin23_complete_quadratic_axial_torsion.mjs)

## Result

The fermion-loop operator identified in claim 1611 cannot simply be added to the healthy $0^-$ action while retaining both poles. In the most general isolated, parity-even axial-vector action with at most two derivatives, the transverse massive spin-1 mode and longitudinal massive spin-0 mode require opposite signs of the same algebraic torsion coefficient.

In the conventions below,

\[
\text{healthy }1:\quad z>0,\ a<0,
\qquad
\text{healthy }0^-:\quad a>0,\ b>0.
\]

Therefore

\[
\boxed{\text{there is no open parameter region with both poles healthy}.}
\]

This is an exact sign no-go for the isolated axial block, not a no-go for every quadratic Poincare-gauge theory. Larger theories can remove modes on critical constraint surfaces or mix axial torsion with other connection components, but must then pass the full spin-parity test rather than inherit health from this truncation.

## Complete quadratic axial action

Use signature $\eta=(-,+,+,+)$ and define

\[
F_{\mu\nu}=\partial_\mu S_\nu-\partial_\nu S_\mu.
\]

The action is

\[
\mathcal L
=\frac a2S_\mu S^\mu
+\frac b2(\partial_\mu S^\mu)^2
-\frac z4F_{\mu\nu}F^{\mu\nu}
+S_\mu J^\mu.
\]

Thus $z>0$ is the ordinary positive-energy Maxwell sign. At $z=0$, $a>0,b>0$ reproduces claims 1603 and 1607. Up to integration by parts, these three operators span the flat-space parity-even quadratic action of one axial vector with no more than two derivatives.

## Exact projector decomposition

For

\[
P_L^{\mu\nu}=\frac{p^\mu p^\nu}{p^2},
\qquad P_T=\eta-P_L,
\]

the quadratic kernel is

\[
K=(a-zp^2)P_T+(a+bp^2)P_L,
\]

and

\[
K^{-1}=\frac{P_T}{a-zp^2}+\frac{P_L}{a+bp^2}.
\]

The poles are

\[
m_1^2=-\frac az,
\qquad
m_0^2=\frac ab.
\]

There are three transverse massive-vector polarizations and one longitudinal scalar degree of freedom at a generic point $abz\neq0$.

## Residues and the sign contradiction

### Transverse spin 1

For $z>0$, rescale $A_\mu=\sqrt z\,S_\mu$. The transverse action has standard Proca form only when

\[
\mathcal L_T=-\frac14F_A^2-\frac12m_1^2A_T^2,
\qquad
a=-zm_1^2.
\]

Positive norm requires $z>0$ and absence of a tachyon requires $m_1^2>0$. Hence

\[
\boxed{z>0,\quad a<0.}
\]

### Longitudinal spin 0

The Maxwell term vanishes on a pure longitudinal configuration. The exact auxiliary dual remains

\[
\mathcal L_\chi
=-\frac1{2a}(\partial\chi)^2-\frac1{2b}\chi^2.
\]

Positive scalar norm requires $a>0$, while $m_0^2=a/b>0$ then requires $b>0$:

\[
\boxed{a>0,\quad b>0.}
\]

The two boxes have no intersection. Changing the sign of $z$ can make $m_1^2$ positive for $a>0$, but makes the Maxwell sector a ghost. Choosing $a<0,b<0,z>0$ makes both mass squares positive, but the scalar kinetic term has the wrong sign.

At the claim-1603 signs $a>0,b>0,z>0$, the loop-generated transverse pole is a tachyon. The scalar pole itself remains healthy only as an EFT before the new operator is resummed.

## Canonical constraint count

The constraint count makes the decoupling surfaces explicit.

| Surface | Velocity-Hessian rank | Second-class constraints | Physical axial degrees |
|---|---:|---:|---:|
| $b,z\neq0$ | 4 | 0 | 4 |
| $z=0$, $a,b\neq0$ | 1 | 6 | 1 |
| $b=0$, $a,z\neq0$ | 3 | 2 | 3 |
| $b=z=0$, $a\neq0$ | 0 | 8 | 0 |

Thus $z=0$ is the one-scalar surface of claims 1603--1611. The $b=0$ surface is ordinary Proca and is healthy for $z>0,a<0$. Neither is an open four-degree region.

At $a=0$ the mass formulas and constraint organization change. With $b,z\neq0$ the velocity Hessian is still full rank, but the Maxwell-plus-divergence kinetic system contains an indefinite unprotected four-component sector. It is not a healthy continuous bridge between the two massive branches.

## Coupling to a nonconserved axial current

Integrating out $S_\mu$ gives

\[
\mathcal L_{\rm eff}
=-\frac12J_\mu\left[
\frac{P_T^{\mu\nu}}{a-zp^2}
+\frac{P_L^{\mu\nu}}{a+bp^2}
\right]J_\nu.
\]

The scalar exchange is

\[
\mathcal L_{{\rm eff},L}
=-\frac{(p\!\cdot J)^2}{2p^2(a+bp^2)}.
\]

An exactly conserved external current has $p\!\cdot J=0$ and does not exchange this pole. That does not remove the pole from the theory. More importantly, the fermionic axial current obeys

\[
\partial_\mu J_5^\mu
=2im_f\bar\psi_f\gamma_5\psi_f
+\text{gauge anomalies},
\]

so masses and anomalies expose the longitudinal ghost or tachyon. Conservation cannot rescue the physical descendant.

At low momentum,

\[
K^{-1}=\frac\eta a
+\frac{p^2}{a^2}(zP_T-bP_L)+O(p^4),
\]

showing the common algebraic axial-current contact plus different derivative corrections.

## Decoupling surfaces

- $z=0$: transverse torsion is algebraic; the healthy $0^-$ scalar EFT survives for $a,b>0$. Fermion loops do not preserve this surface.
- $b=0$: longitudinal torsion is algebraic; healthy Proca survives for $z>0,a<0$.
- $b=z=0$: axial torsion is wholly auxiliary.
- $J=0$: matter exchange disappears, but free-field pole health is unchanged.
- $p\!\cdot J=0$: only that source fails to excite the scalar.
- $a=0$: rank-changing boundary; stop the massive continuation.

## Finite scan witness

The verifier scans

\[
a,b,z\in\{-2,-1,1,2\}.
\]

Among 64 nonzero points it finds

\[
16\ \text{scalar-healthy},
\qquad16\ \text{vector-healthy},
\qquad0\ \text{both-healthy}.
\]

Eight points have both mass squares positive but a scalar ghost. The scan is a finite witness; the opposite inequalities on $a$ are the proof.

## Broken-Spin(2,3) invariant map

The three coefficients have a direct broken-phase interpretation:

- $a$ comes from Einstein--Cartan plus torsion-square terms. In the one-parameter action of claim 1603,
  \[
  a=\frac{M_{\rm Pl}^2(1-4\lambda)}{24}.
  \]
- $b$ comes from the square of the Riemann--Cartan pseudoscalar curvature $\widehat X$, whose linear axial projection is $\partial\!\cdot S$.
- $z$ comes from a complementary combination of parity-even Riemann--Cartan curvature squares whose axial projection contains $F_S^2$. The fermion vacuum polarization of claim 1611 generates the same allowed broken-phase operator.

The last map is not one invariant equals one isolated coefficient. Generic curvature squares also excite the torsion trace, the 16-component tensor torsion, metric curvature modes and their mixings. The remaining full Poincare-gauge spectrum contains the $0^\pm,1^\pm,2^\pm$ connection blocks in addition to the massless graviton. Critical parameter surfaces can remove selected modes, as the systematic PGT classifications show, but those surfaces require their own constraint audit.

Therefore the axial no-go closes the generic isolated completion. The only next action-level route is a deliberately critical full curvature/torsion invariant combination followed by a complete spin-projector and nonlinear constraint calculation. Health cannot be inferred from the axial sub-block.

## Stop rules

1. Reject every generic $bz\neq0$ axial completion as simultaneously healthy: at least one pole is a ghost or tachyon.
2. Keep $z=0$ only as a low-energy scalar EFT surface, not an exact fermion-coupled action.
3. Keep $b=0,z>0,a<0$ only as the Proca decoupling branch, not as a continuation of the healthy $0^-$ branch.
4. Stop at $a=0$ and redo the constraint analysis.
5. Repeat all spin-parity residues and constraints for any proposed full broken-$Spin(2,3)$ curvature-square combination.

## Sources

- E. Sezgin and P. van Nieuwenhuizen, [*New Ghost-Free Gravity Lagrangians with Propagating Torsion*](https://doi.org/10.1103/PhysRevD.21.3269), *Physical Review D* **21** (1980) 3269--3280.
- G. K. Karananas, [*The Particle Spectrum of Parity-Violating Poincare Gravitational Theory*](https://arxiv.org/abs/1411.5613), *Classical and Quantum Gravity* **32** (2015) 055012.
- Y.-C. Lin, M. P. Hobson and A. N. Lasenby, [*Ghost and Tachyon Free Poincare Gauge Theories: A Systematic Approach*](https://arxiv.org/abs/1812.02675), *Physical Review D* **99** (2019) 064001.
- G. de Berredo-Peixoto, J. A. Helayel-Neto and I. L. Shapiro, [*On the Consistency of a Fermion-Torsion Effective Theory*](https://arxiv.org/abs/hep-th/9910168), *Journal of High Energy Physics* **02** (2000) 003.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_complete_quadratic_axial_torsion.mjs
~~~
