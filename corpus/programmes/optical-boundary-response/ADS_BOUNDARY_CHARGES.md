# Boundary charges of the matched AdS slab

**Date:** 13 November 2026  
**Status:** exact classical wall charges in one matched metric Dirichlet ensemble; no physical measurement or admission  
**Evidence family:** matched-ads-tidal-fixture  
**Evidence:** [charge record](../../../evidence/data/ads-boundary-charges-v1.json) and [symbolic replay](../../../verification/verify/verify_ads_boundary_charges.py)

The conserved pulse from the [tidal calculation](ADS_TIDAL_RESPONSE.md) leaves the induced metric on both radial walls equal to the vacuum wall metric. It changes the metric's normal derivative, which the wall stress retains. Both walls carry positive vacuum-subtracted energy for a positive pulse. The full wall stress and all charges defined from it agree across curvature GR, TEGR, STEGR, and the minimal fixed-norm Spin(2,3) action when their Dirichlet boundary terms are matched.

## Match the boundary actions before varying them

Use the original Poincaré slab \(1\le z\le2\), \(\Lambda=-3/\ell^2\), \(\kappa=8\pi G\), and \(H=\epsilon f(u)(z^2-3z^3/7-4/7)\). The pulse has \(\kappa T_{uu}=\epsilon f(u)\) with \(f(u)=64u^3(1-u)^3\) on \(0<u<1\), zero elsewhere. The normal dust flux vanishes. Use the fixed-induced-metric action and the same spinless, metric-coupled dust. The induced metric is fixed for the variational principle and allowed to vary when taking the functional derivative that defines the stress. Take the derivative before restricting it to the family \(H\,du^2\).

Write \(K_{ab}=\tfrac12\mathcal L_n h_{ab}\) with outward spacelike normal \(n\). The reference action is Einstein–Hilbert plus \(\Lambda\), the Gibbons–Hawking–York term \(+\int\sqrt{-h}K/\kappa\), and the dust action. The boundary stress with both indices down is

\[
\tau_{ab}=\frac{1}{\kappa}(K h_{ab}-K_{ab}).
\]

For a tangent Killing field \(\xi\) use the Brown–York contraction with a future unit observer on the wall, \(Q[\xi]=\int\sqrt{\sigma}\,w^a\tau_{ab}\xi^b\). This convention fixes the sign of the signed translation charges below. Subtract the vacuum stress wall by wall with the same induced metrics and generators. Intrinsic additions that depend only on the fixed wall metric cancel in this difference. Work in the original framed coordinate slab with end-cap variations of compact support. On the charge cuts the radial and time normals are orthogonal, and the pulse vanishes at the longitudinal ends. [Brown and York](https://arxiv.org/abs/gr-qc/9209012) · [Harlow and Wu, §§3.5–3.6](https://arxiv.org/abs/1906.08616)

| Formulation | Boundary completion used in the comparison |
|---|---|
| GR | Metric Dirichlet action with the outward \(K/\kappa\) term. |
| TEGR | Add the oriented flux \(-n_\mu T^\mu/\kappa\) to the torsion action together with the same \(K/\kappa\). The total is the reference action on the flat metric-compatible sector. |
| STEGR | Add \(-n_\mu(Q^\mu-\widetilde Q^\mu)/(2\kappa)\) to the non-metricity action together with \(K/\kappa\). The total is the reference action on the flat torsionless sector. |
| Minimal Spin(2,3) | Cancel the Euler term by its local transgression on the chosen framed slab. The first-order Dirichlet term cancels the boundary variation of the independent Lorentz connection and becomes \(K/\kappa\) after solving its spinless torsion equation. |

The TEGR and STEGR action identities apply before restricting the metric variation. In this radial gauge, \(g=N(z)^2dz^2+h_{ab}dx^a dx^b\) and the TEGR coframe is block diagonal with radial leg \(N\,dz\). The traces obey \(T_z=\partial_z\log\sqrt{-h}\) and \(Q_z-\widetilde Q_z=2\partial_z\log\sqrt{-h}\) in their respective gauges. Hence both oriented fluxes cancel the explicit \(K/\kappa\) term in this gauge, even under variations of the tangential metric outside the wave ansatz. The stress still comes from variation of the resulting first-order action. For the Cartan formulation the first-order term can be written \((2\kappa)^{-1}\int_{\partial M}\varepsilon_{abcd}e^a\wedge e^b\,n^c D_\omega n^d\) with the induced boundary orientation. Its connection variation cancels the Einstein–Cartan boundary variation. Eliminating \(\omega\) gives the same metric functional, including its response to boundary metric variations. [Geometrical trinity, eqs. (3.6) and (4.3)](https://arxiv.org/pdf/1903.06830) · [Claim 1596](../../claims/1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md)

## Wall stress and charges

For \(s=-1\) at \(z=1\) and \(s=+1\) at \(z=2\), \(n=s(z/\ell)\partial_z\). Differentiating the metric before restricting to the wall gives

\[
K_{ab}=-\frac{s}{\ell}h_{ab}+\frac{s\ell}{2z}H_z(du)_a(du)_b,\qquad
K=-\frac{3s}{\ell},\qquad
\Delta\tau_{ab}=-\frac{s\ell}{2\kappa z}H_z(du)_a(du)_b .
\]

The stress is traceless and conserved on both walls. Its only nonzero covariant component is \(uu\). The conjugate contravariant component is \(vv\), so varying only \(h_{uu}\) within the pulse ansatz returns zero even though the physical wall stress is nonzero. A variation in \(h_{vv}\) detects it.

Use dimensionless \(t=(u+v)/\sqrt2\) and \(y=(v-u)/\sqrt2\). At fixed \(t\), the wall observer is \(w=(z/\ell)\partial_t\), and the cut measure is \((\ell/z)^2dx\,dy\). The generator \(\partial_t\) is the same on both walls. The integrated charges below are per unit coordinate \(x\), with all \(y\) included. The conversion is \(|dy|=\sqrt2|du|\) and \(\int_0^1 f(u)\,du=16/35\).

| Wall | \(\Delta\tau_{uu}\) in units of \(\ell\epsilon f/\kappa\) | \(Q[\partial_t]\) | \(Q[\partial_y]\) | \(Q[\partial_x]\), \(Q[\partial_v]\) |
|---|---:|---:|---:|---:|
| \(z=1\) | \(5/14\) | \(4/49\) | \(-4/49\) | \(0,0\) |
| \(z=2\) | \(2/7\) | \(8/245\) | \(-8/245\) | \(0,0\) |
| Sum | | \(4/35\) | \(-4/35\) | \(0,0\) |

The translation charges use the common unit \(\sqrt2\,\ell^2\epsilon/\kappa\). The signed longitudinal translation charge follows from \(du=(dt-dy)/\sqrt2\). The full tensor above gives the density for any tangent boundary Killing field, subject to convergence or an explicitly chosen spatial regulator.

The replay computes \(K_{ab}=-n_z\Gamma^z{}_{ab}\) from the four matched metric connections, checks both divergence fluxes, and evaluates the wall stresses and charges exactly. As a balance check, the dust current \(J^\mu=-T^\mu{}_\nu(\partial_t)^\nu\) is conserved on this solution and has no radial flux. Its constant-\(t\) density is \(\sqrt{-g}J^t=\ell^2\epsilon f/(2\kappa z^2)\). Integrating in \(z\) gives \(\ell^2\epsilon f/(4\kappa)\), precisely the sum of the two wall energy densities per \(dx\,dy\), even before integration over the pulse. This is a check within the same sourced fixture.

## Scope and next discriminator

The zero residual concerns finite-wall Brown–York charges in the matched metric Dirichlet ensemble. Independent affine or Lorentz frame charges, edge degrees of freedom, and an uncanceled Euler boundary sector require their own boundary data and generators. The next comparison would fix one such ensemble and derive an integrable, gauge-invariant charge on these same cuts. Its pulse-on minus pulse-off value can then be compared with this Dirichlet control.

Replay from the repository root with SymPy:

~~~powershell
& .venv-alpaca/Scripts/python.exe verification/verify/verify_ads_boundary_charges.py
~~~
