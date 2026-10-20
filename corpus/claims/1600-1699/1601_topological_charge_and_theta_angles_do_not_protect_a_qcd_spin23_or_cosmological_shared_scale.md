# Topological Charge and Theta Angles Do Not Protect a QCD--Spin(2,3) or Cosmological Shared Scale

**Date:** 20 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** explicit finite-sector, instanton, MacDowell--Mansouri, susceptibility, anomaly and axion exhaustion; no derived cross-bundle scale law

**Depends on:** [the explicit minimal Spin(2,3) action](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md), [the E6 threshold/shared-scale no-go](../1500-1599/1597_e6_threshold_descent_leaves_lambda_qcd_exponentially_sensitive_and_no_spin5_su3_scale_is_protected.md), and [the joined mass-gap programme](../1500-1599/1594_the_joined_mass_gap_investigation_closes_every_shortcut_and_leaves_five_irreducible_proof_arms.md)

**Evidence:** [topological/theta ledger](../../../evidence/data/spin23-topological-theta-shared-scale-no-go.json) and [deterministic verifier](../../../verification/verify/verify_spin23_topological_theta_shared_scale_no_go.mjs)

## Result

Topology provides exact integer labels, angle periodicities and anomaly
coefficients. It does not provide the dimensionful amplitude attached to those
labels. After exhausting the Yang--Mills instanton, gravitational
Euler/Pontryagin, forced diagonal-charge, susceptibility and mixed-axion
routes, the result is

\[
\boxed{
\text{topology protects periodicity and selection rules, not }
\Lambda_{\rm QCD},\ \ell^{-1},\ M_{\rm Pl}\text{ or }\rho_\Lambda.}
\]

The obstruction is structural. Color instanton number is a characteristic
class of the internal \(SU(3)\) bundle. Gravitational Pontryagin and Euler
numbers belong to the tangent/Lorentz bundle. They are independent integers.
Even imposing their equality by hand only adds the corresponding continuous
actions. Neither a gauge coupling, a determinant, a gravitational measure nor
an additive vacuum energy disappears.

## Three independent characteristic numbers

Choose integral normalizations and write

\[
Q_c={1\over8\pi^2}\int {\rm tr}(F_c\wedge F_c)\in\mathbb Z ,
\]

\[
Q_P=\int p_1(TM)\in\mathbb Z ,
\qquad
\chi(M)={1\over32\pi^2}
\int\epsilon_{abcd}R^{ab}\wedge R^{cd}\in\mathbb Z .
\]

Their integrality does not identify them. \(Q_c\) depends on the color bundle,
whereas \(Q_P\) and \(\chi\) depend on the tangent bundle. A correspondence
\(Q_c=Q_P\), or a common sum over them, is an additional bundle map and path
integral restriction. It is not implied by \(E_6\), \(Spin(2,3)\), their
breaking chains, or the fact that all three expressions are four-forms.

This is the first non-promotion rule:

\[
\boxed{\text{same cohomological degree}\not\Rightarrow
\text{same characteristic class or dynamical scale}.}
\]

## Yang--Mills topology leaves the coupling in the exponent

In Euclidean compact Yang--Mills,

\[
S_{\rm YM}\ge {8\pi^2|Q_c|\over g_c^2},
\]

with equality for a self-dual or anti-self-dual instanton. A charge sector is
weighted schematically by

\[
\exp\left[-{8\pi^2|Q_c|\over g_c^2}+i\theta_cQ_c\right].
\]

Integral \(Q_c\) makes \(\theta_c\) periodic modulo \(2\pi\). It does not fix
\(g_c\). This distinction is enormous numerically:

\[
\begin{array}{c|ccc}
g_c&0.8&1.0&1.2\\ \hline
\exp(-8\pi^2/g_c^2)&
2.64\times10^{-54}&5.12\times10^{-35}&1.54\times10^{-24}.
\end{array}
\]

The charge remains one throughout, while the semiclassical factor moves by
more than thirty orders of magnitude. The determinant, instanton-size
integral, matter zero modes and RG matching add further continuous data.

## Finite topological-sector calculation

To isolate exactly what the integer sum can do, truncate to

\[
Z_N(\theta;A)=
\sum_{Q=-N}^{N}e^{-A|Q|+i\theta Q},
\qquad A=2.5,\quad N=8.
\]

Direct summation gives

\[
\begin{array}{c|c|c}
\theta&Z_N(\theta)&-\ln[Z_N(\theta)/Z_N(0)]\\ \hline
0&1.178850979&0\\
\pi/3&1.074199844&0.092964164\\
\pi/2&0.986614298&0.178016316\\
\pi&0.848283640&0.329080435 .
\end{array}
\]

At \(\theta=0\),

\[
\langle Q^2\rangle_{N=8}=0.194844790.
\]

The infinite sum is elementary:

\[
\langle Q^2\rangle_\infty
={2e^{-A}\over(1-e^{-A})^2}
=0.194844816.
\]

Thus the integer sum produces a periodic shape and charge moments **after**
the real suppression \(A\) is supplied. It cannot determine \(A\), and without
a volume or density it has no four-dimensional energy scale.

## The dilute gas makes the missing datum explicit

For independent instantons and anti-instantons of fugacity \(K\),

\[
{Z(\theta)\over Z(0)}
=\exp[2KV(\cos\theta-1)],
\]

so

\[
E(\theta)-E(0)=2K(1-\cos\theta),
\qquad
\chi_{\rm top}={\partial^2E\over\partial\theta^2}\bigg|_0=2K.
\]

For the finite witness \(K=0.01,V=100,\theta=\pi/3\),

\[
{Z(\theta)\over Z(0)}=e^{-1},\qquad
\Delta E=0.01,\qquad\chi_{\rm top}=0.02.
\]

Topology fixes the cosine. The dimension-four number \(K\) fixes the energy.
In a gauge theory \(K\) contains the running coupling, determinant, zero-mode
measure and size integration. Replacing it by
\(\Lambda_{\rm QCD}^4\) transmits an already generated scale; it does not
derive that scale.

The conclusion does not rely on the dilute-gas cosine. A large-\(N\)
multibranch toy has

\[
E(\theta)=\min_{k\in\mathbb Z}
{\chi\over2}(\theta+2\pi k)^2.
\]

For \(\chi=0.02\), the minimum energies at
\(\theta=(0,\pi/2,\pi,3\pi/2,2\pi)\) are

\[
(0,\ 0.0246740,\ 0.0986960,\ 0.0246740,\ 0).
\]

The \(k=0\) and \(k=-1\) branches are degenerate at \(\theta=\pi\), producing
the expected cusp rather than a cosine maximum. Branch minimization restores
periodicity, but \(\chi\) remains an input. Changing the universal
\(\theta\)-dependence therefore does not promote the topological label into a
scale.

## Euler and Pontryagin terms in the Spin(2,3) action

Claim 1596 gives the exact minimal broken action,

\[
S_{\rm MM}={\ell^2\over8\kappa}
\int\epsilon_{abcd}R^{ab}\wedge R^{cd}
+S_{\rm EC}+S_\Lambda .
\]

On a closed oriented four-manifold the normalized Euler contribution is

\[
S_E=4\pi^2{\ell^2\over\kappa}\chi(M).
\]

Define

\[
x={\ell^2\over\kappa}=M_{\rm Pl}^2\ell^2.
\]

The same minimal action has

\[
{\Lambda_{\rm grav}\over M_{\rm Pl}^2}=-{3\over x}.
\]

This is a real relation, but topology does not fix \(x\). For the illustrative
\(x=0.1\), changing \(\chi(M)\) by one changes the Euclidean weight by

\[
\exp(-4\pi^2x)=0.0192963.
\]

Changing \(x\) changes that fugacity continuously. The integrality of
\(\chi(M)\) does not quantize its coefficient.

A constant normalized gravitational Pontryagin term contributes
\(i\theta_gQ_P\). It makes \(\theta_g\) periodic, but on a closed manifold of
fixed topology its bulk variation is zero. Likewise, the torsional identity

\[
d(e^a\wedge T_a)
=T^a\wedge T_a-e^a\wedge e^b\wedge R_{ab}
\]

shows how the full \(Spin(2,3)\) Pontryagin form separates into Lorentz
Pontryagin and a convention-dependent Nieh--Yan boundary density. Constant
coefficients alter phases, boundary data or topology weights; they do not add
a local pole or fix a mass.

## The strongest diagonal-charge ansatz still fails

Impose the most favorable possible join by hand:

\[
Q_c=Q_P=Q.
\]

If the separate real actions per unit charge are \(A_c\) and \(A_g\), the
combined sector weight becomes

\[
\exp[-(A_c+A_g)|Q|+i(\theta_c+\theta_g)Q].
\]

For \(A_c=2,A_g=3\), the separate infinite-sum variances are

\[
0.362031,\qquad0.110282,
\]

while the forced diagonal sum has variance

\[
{2e^{-5}\over(1-e^{-5})^2}=0.0136593.
\]

The identification suppresses fluctuations. It does not determine either
action, either determinant or a dimensional prefactor. It also has not been
derived: it is a restriction on two independent bundles. Hence even the
strongest topological sewing ansatz does not promote a shared-scale claim.

## Susceptibility is an observable, not an integer

Around \(\theta=0\),

\[
E(\theta)=E(0)+{1\over2}\chi_{\rm top}\theta^2+O(\theta^4).
\]

In QCD, \(\chi_{\rm QCD}\) is a dimension-four dynamical observable. Its
magnitude is controlled by strong dynamics and quark masses, not by the
integrality of \(Q_c\). It can be used to infer or transmit a QCD scale after
the theory is solved, but cannot replace the scale-generating calculation.

This also blocks a cosmological-constant shortcut. Minimizing the
\(\theta\)-dependent part can remove
\(E(\theta)-E(0)\). It cannot determine the additive \(E(0)\). That constant,
and every other theta-independent vacuum contribution, renormalizes an
independent cosmological counterterm:

\[
\rho_{\Lambda,\rm ren}
=\rho_{\Lambda,\rm bare}
+E_{\rm QCD}(0)+E_{\rm other}(0).
\]

Neither instanton number nor susceptibility enforces the required
cancellation.

## Anomaly and axion escape

A shared axion is the best legitimate way to correlate the two angular
sectors. Let

\[
V(a)=
\chi_c\!\left[1-\cos\left(\theta_c+N_c{a\over f}\right)\right]
+\chi_g\!\left[1-\cos\left(\theta_g+N_g{a\over f}\right)\right]+C .
\]

The integers \(N_c,N_g\) are anomaly coefficients. At an aligned minimum,

\[
m_a^2={N_c^2\chi_c+N_g^2\chi_g\over f^2}.
\]

For

\[
\chi_c=1,\quad\chi_g=0.2,\quad N_c=1,\quad N_g=2,\quad f=10,
\]

the exact toy result is

\[
m_a^2=0.018.
\]

This is a valid cross-sector observable. It is not a shared-scale prediction:
\(\chi_c,\chi_g\) and \(f\) were inputs. Moreover one axion shift leaves the
orthogonal combination

\[
N_g\theta_c-N_c\theta_g
\]

invariant. One axion therefore relaxes only one direction in the two-angle
space unless another constraint already aligns them. Additional axions can
remove additional angular directions, but introduce decay constants,
potentials and anomaly matrices. The additive \(C\) remains untouched in
every case.

Anomaly coefficients can protect periodicities and domain-wall numbers. They
cannot fix susceptibilities, decay constants, \(\ell\), \(\kappa\), the
color coupling or the cosmological counterterm.

## Why a common modulus still does not help

Even with

\[
M_{\rm Pl}=\sqrt{\xi}\,v,\qquad
\Lambda_{\rm QCD}
=v\exp\left[-{8\pi^2\over b_0g_c^2(v)}\right],
\]

topology does not fix \(g_c(v)\) or \(\xi\). Relating the AdS scale also
requires a selector potential that fixes \(\ell v\). Relating topological
amplitudes requires the gauge and gravitational determinants and a map
between their bundles. Consequently a successful promotion law must derive
all of

\[
g_c(v),\quad \xi,\quad \ell v,\quad
{\cal D}_c/{\cal D}_g,\quad
\text{and}\quad Q_c\leftrightarrow Q_P\text{ or }\chi.
\]

No such law currently exists in the programme.

## Exhaustion result

This arm closes nine finite shortcuts:

1. integer Yang--Mills charge fixes an instanton amplitude;
2. theta periodicity fixes dimensional transmutation;
3. Euler integrality quantizes the MacDowell--Mansouri coefficient;
4. constant Pontryagin or Nieh--Yan terms alter local bulk scale equations;
5. a diagonal gauge/gravity charge removes their continuous actions;
6. susceptibility fixes absolute vacuum energy;
7. large-\(N\) branch periodicity fixes the susceptibility scale;
8. one mixed axion fixes both theta angles and the cosmological constant; and
9. one common modulus plus topology predicts a QCD/AdS/Planck ratio.

The route can advance only with new non-finite input: a controlled sum over
four-manifold topologies and gravitational instanton measure; a UV-derived
bundle correspondence; complete determinants and thresholds; a fixed
trajectory for \(g_c,\xi,\ell v\); enough axionic directions to remove every
physical angle; and a separate principle fixing the additive cosmological
counterterm.

Topology remains valuable. It supplies robust quantum numbers, anomalies,
selection rules and periodic variables. The non-promotion conclusion is that
none of those data presently closes the dimensional shared-scale arm.

## Primary sources

- [Belavin, Polyakov, Schwartz and Tyupkin, Yang--Mills instantons](https://doi.org/10.1016/0370-2693(75)90163-X)
- ['t Hooft, quantum effects of pseudoparticles](https://doi.org/10.1103/PhysRevD.14.3432)
- [Peccei and Quinn, CP conservation in the presence of pseudoparticles](https://doi.org/10.1103/PhysRevLett.38.1440)
- [Witten, theta dependence at large \(N\)](https://arxiv.org/abs/hep-th/9807109)
- [MacDowell and Mansouri, gauge formulation of gravity](https://doi.org/10.1103/PhysRevLett.38.739)
- [Nieh and Yan, the torsional topological identity](https://doi.org/10.1063/1.525379)
- [Endo and Takao, gravitational contribution to chiral anomalies](https://doi.org/10.1143/PTP.73.803)

## Reproduction

~~~powershell
node verification/verify/verify_spin23_topological_theta_shared_scale_no_go.mjs
~~~
