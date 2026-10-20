# Asymptotic Safety Can Conditionally Fix the Color Boundary but Not Without a Spin(2,3) Universality Class

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** explicit coupled fixed-point, stability-matrix, critical-trajectory and portal-matching calculation; conditional color prediction exists, but its coefficients are not presently universal or derived for the Spin(2,3) theory

**Depends on:** [the radiative selector portal](1612_a_radiative_selector_portal_joins_spin23_planck_and_yang_mills_scales_but_retains_one_color_boundary.md), [the explicit minimal Spin(2,3) action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), and [the E6 threshold/shared-scale no-go](../1500-1599/1597_e6_threshold_descent_leaves_lambda_qcd_exponentially_sensitive_and_no_spin5_su3_scale_is_protected.md)

**Evidence:** [gauge--gravity fixed-point ledger](../../../evidence/data/spin23-gauge-gravity-fixed-point-color-boundary.json) and [deterministic verifier](../../../verification/verify/verify_spin23_gauge_gravity_fixed_point_color_boundary.mjs)

## Result

An interacting gauge--gravity fixed point **can**, in an explicit coupled beta
system, make the color coupling an irrelevant direction. Once the one relevant
gravity trajectory is fixed by the Planck-to-portal ratio, the same model then
predicts \(g_3(v)\) and hence \(\Lambda_{\rm YM}/M_{\rm Pl}\). This is the
mechanism needed to close the residual boundary in claim 1612.

The result is conditional rather than a present prediction:

\[
\boxed{
\text{irrelevant }g_3\text{ at a specified fixed point}
\Longrightarrow g_3(v)\text{ fixed on its critical trajectory};
\quad
\text{an assumed fixed point}\not\Longrightarrow\text{a universal number}.}
\]

For ordinary asymptotically free color, the Gaussian gauge direction is
relevant or marginal and its trajectory amplitude remains free. For the
interacting construction, modest changes in the unestablished gravity and
higher-order gauge coefficients move the exponentially generated infrared
scale by many orders of magnitude. The boundary datum has been removed only
inside a fully specified beta system; in the present programme it has been
traded for fixed-point/universality-class data.

## Explicit two-coupling flow

Let \(t=\log(k/k_{\rm tr})\), let \(G=k^2G_N(k)\) be a dimensionless Newton
coupling, and retain a canonically normalized color coupling \(g\). Consider
the finite test system

\[
\beta_G=2G(1-G),
\]

\[
\beta_g=g\left[-fG-bg^2+cg^4\right],
\qquad b={11\over16\pi^2}>0.
\]

The \(-bg^3\) term is the pure \(SU(3)\) one-loop contribution. The coefficient
\(f\) represents gravitational antiscreening, while \(c\) summarizes the
first stabilizing higher-order gauge--gravity closure. This polynomial is a
test system, not a claimed beta function of the corpus Spin(2,3) action.

The gravitational fixed point is \(G_*=1\). At the Gaussian color point
\((G_*,g_*)=(1,0)\), the stability matrix is

\[
B_{ij}={\partial\beta_i\over\partial u_j}\bigg|_*
=\begin{pmatrix}-2&0\\0&-f\end{pmatrix},
\qquad \theta_i=-\operatorname{eig}(B)=(2,f).
\]

With the asymptotic-safety convention \(\theta>0\), both directions are
relevant/UV-attractive and label renormalized trajectories. The condition
\(g(k)\to0\) does not determine the amplitude at finite \(k\). At \(f=0\),
color is marginally asymptotically free and the usual transmutation constant
remains free:

\[
{1\over g^2(k)}=2b\log{k\over\Lambda_{\rm color}}.
\]

Thus a Gaussian or asymptotically free endpoint does not close claim 1612.

## Interacting fixed point and critical exponents

For \(f,c>0\), there is also a positive root

\[
x_*=g_*^2={b+\sqrt{b^2+4cf}\over2c}.
\]

At \((G_*,g_*)=(1,\sqrt{x_*})\),

\[
B=
\begin{pmatrix}
-2&0\\
-fg_*&L
\end{pmatrix},
\qquad
L=4f+2bx_*>0,
\]

so

\[
(\theta_G,\theta_g)=(2,-L).
\]

The gauge direction is irrelevant/UV-repulsive: UV completeness removes its
independent integration constant. Near the fixed point, the one-dimensional
UV critical surface has tangent

\[
\delta g=q\,\delta G,
\qquad q={fg_*\over L+2}.
\]

This is the precise distinction between a fixed endpoint and a prediction.
The endpoint plus a negative gauge critical exponent selects a unique
\(g(G)\) trajectory; the Gaussian point does not.

## Finite critical-trajectory solution

Choose the benchmark

\[
f=0.01,\qquad c=0.5,\qquad b={11\over16\pi^2}.
\]

Then

\[
g_*=0.476764486,\quad L=0.071667279,\quad
(\theta_G,\theta_g)=(2,-0.071667279),\quad
q=0.00230135645.
\]

The gravity equation is exactly soluble:

\[
G(k)={1\over1+(k_{\rm tr}/k)^2}.
\]

Claim 1612 has \(M_{\rm Pl}/v=1.154700538\). Identify the gravitational
crossover \(k_{\rm tr}=M_{\rm Pl}\), so

\[
t_v=\log(v/M_{\rm Pl})=-0.143841036,\qquad G(v)={3\over7}.
\]

Starting on the UV critical surface and integrating the coupled flow down to
\(t_v\) gives

\[
g_3(v)=0.474833851.
\]

Insert this into the already derived colored-scalar threshold formula of
claim 1612, with \(k_T=1/30\):

\[
{\Lambda_{\rm YM}\over M_{\rm Pl}}
={k_T^{1/22}\over M_{\rm Pl}/v}
\exp\left[-{8\pi^2\over11g_3^2(v)}\right]
=1.10750\times10^{-14}.
\]

Within this exact toy system the previous color boundary has disappeared.
The number is predicted from the fixed-point coefficients and the portal's
\(M_{\rm Pl}/v\), not fitted as a separate \(g_3(v)\).

## Why this is not yet a programme prediction

The higher-order coefficient that creates the interacting color root and the
gravity coefficient that locates it are not established universal data. The
finite scan makes the consequence quantitative:

\[
\begin{array}{c|c|c|c}
f&c&g_3(v)&\Lambda_{\rm YM}/M_{\rm Pl}\\\hline
0.005&0.5&0.436739&3.36660\times10^{-17}\\
0.010&0.5&0.474834&1.10750\times10^{-14}\\
0.020&0.5&0.526339&4.14809\times10^{-12}\\
0.010&0.25&0.616441&4.64413\times10^{-9}\\
0.010&1.00&0.373598&3.43628\times10^{-23}
\end{array}
\]

Changing \(c\) by a factor four moves the predicted hierarchy by roughly
fourteen orders of magnitude. This is the exponential magnifier from claim
1612 acting on truncation-level fixed-point data.

There is also a structural sign test. If \(c=0\) and \(f>0\), color has only
the Gaussian fixed point, whose critical exponent \(\theta_g=f>0\) leaves a
free trajectory. If \(f<0\), the two-term system has an interacting root
\(g_*^2=-f/b\), but

\[
\theta_g=-2f>0,
\]

so that interacting color direction is still relevant and free. A nonzero
fixed-point coupling is therefore not enough; its critical exponent must have
the predictive sign.

## Scheme, truncation and real-form gates

The literature itself explains why \(f\) and \(c\) cannot yet be promoted to
corpus constants:

- perturbative Einstein--Yang--Mills calculations have found a proposed
  gravitational gauge correction to be gauge dependent or absent after
  counterterms and field redefinitions;
- functional RG calculations in asymptotically safe metric gravity find
  antiscreening contributions in declared truncations, but their coordinates
  and critical exponents must stabilize under gauge, regulator, vertex and
  operator enlargement;
- higher-dimensional operators mix with the gauge kinetic term and can create,
  move or remove the interacting root represented here by \(c\);
- an Einstein--Cartan/independent-connection theory can lie in a different
  universality class from metric quantum Einstein gravity. A result in the
  latter does not automatically apply to the broken Spin(2,3) Cartan theory.

Fixed-point coordinates themselves are scheme dependent. A physical
prediction may nevertheless be universal when expressed through a complete
renormalized trajectory and observables, but that requires convergence of the
critical exponents and matching map. The five-point scan is not claiming that
arbitrary scheme changes are physical; it demonstrates that the present
truncation uncertainty lies exactly where the exponentially sensitive
prediction needs control.

## Exact closure condition

The residual boundary of claim 1612 would genuinely close if one could:

1. define the quantum broken-Spin(2,3) plus portal theory nonperturbatively;
2. establish a gauge--gravity fixed point with a finite-dimensional UV critical surface;
3. show that the color direction is irrelevant and that its exponent is stable under systematic truncation enlargement;
4. derive the unique critical trajectory through the selector threshold, including every induced operator;
5. match a gauge-invariant color observable to the low-energy \(\overline{\rm MS}\) coupling and then to the pure-YM threshold.

If these hold, \(g_3(v)\) is predicted and the portal produces a genuine
dimensionless hierarchy. Until they hold, asymptotic safety is a concrete
candidate mechanism, not a numerical closure:

\[
\boxed{
\text{the color boundary can be removed in principle, but presently it is
traded for }(f,c,G_*,\text{trajectory and matching})\text{ data}.}
\]

## Primary sources

- S. P. Robinson and F. Wilczek, [*Gravitational Correction to Running of Gauge Couplings*](https://arxiv.org/abs/hep-th/0509050), *Phys. Rev. Lett.* **96** (2006) 231601.
- A. R. Pietrykowski, [*Gauge Dependence of Gravitational Correction to Running of Gauge Couplings*](https://arxiv.org/abs/hep-th/0606208), *Phys. Rev. Lett.* **98** (2007) 061801.
- D. Ebert, J. Plefka and A. Rodigast, [*Absence of Gravitational Contributions to the Running Yang--Mills Coupling*](https://arxiv.org/abs/0710.1002), *Phys. Lett. B* **660** (2008) 579.
- J.-E. Daum, U. Harst and M. Reuter, [*Running Gauge Coupling in Asymptotically Safe Quantum Gravity*](https://arxiv.org/abs/0910.4938), *JHEP* **01** (2010) 084.
- A. Eichhorn and F. Versteegen, [*Upper Bound on the Abelian Gauge Coupling from Asymptotic Safety*](https://arxiv.org/abs/1709.07252), *JHEP* **01** (2018) 030.
- J.-E. Daum and M. Reuter, [*Einstein--Cartan Gravity, Asymptotic Safety, and the Running Immirzi Parameter*](https://arxiv.org/abs/1301.5135), *Annals Phys.* **334** (2013) 351, for the independent-connection universality-class warning.
