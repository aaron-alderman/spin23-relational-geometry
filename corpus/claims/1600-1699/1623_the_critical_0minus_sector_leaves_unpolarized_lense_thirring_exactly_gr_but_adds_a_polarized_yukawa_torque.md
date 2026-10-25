# The Critical 0-Minus Sector Leaves Unpolarized Lense--Thirring Exactly GR but Adds a Polarized Yukawa Torque

**Date:** 21 October 2026

**Gates:** A1, A2, A4, A7, A8 and A11

**Status:** exact linear stationary-source split, frame-dragging coefficient and polarized finite-range force for the claim-1622 critical class

**Depends on:** [the explicit critical PGT class](1622_the_full_local_pgt_route_contains_a_healthy_critical_pseudoscalar_sector_but_not_an_open_quantum_region.md), [the fermionic portal](1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md), and [the first-order pole construction](1603_the_first_order_spin23_extension_has_a_nonempty_healthy_gapped_pseudoscalar_torsion_sector.md)

**Evidence:** [weak-field ledger](../../../evidence/data/spin23-critical-pgt-lense-thirring-spin-yukawa.json) and [verifier](../../../verification/verify/verify_spin23_critical_pgt_lense_thirring_spin_yukawa.mjs)

## Result

The explicit healthy $0^-$ PGT class makes a clean weak-field prediction:

\[
\boxed{C_{\rm LT}=1,\qquad \delta\Omega_{\rm LT}^{\rm unpolarized}=0}
\]

at linear tree level. Mass, momentum and macroscopic orbital rotation source the same gravitoelectric and gravitomagnetic metric fields as GR. They do not source axial torsion. The new field couples to intrinsic fermion spin, not to orbital angular momentum.

The leading separated-body deviation is instead

\[
\boxed{
V_{SS}=f_1f_2\,\sigma_1^i\sigma_2^j
\partial_i\partial_j\frac{e^{-m_\varphi r}}{4\pi r},
}
\]

which requires net polarization in both source and detector. It is an orientation-dependent Yukawa torque, not a change in the universal Lense--Thirring coefficient.

## Linearized source equations

Around torsionless Minkowski space, use harmonic gauge for the metric and the positive-normalized critical axial block of claim 1622. The two diagonal linear sectors are

\[
\Box\bar h_{\mu\nu}=-16\pi G T_{\mu\nu},
\]

\[
\mathcal L_{0^-}=\frac A2S_\mu S^\mu
+\frac B2(\partial_\mu S^\mu)^2+S_\mu J_c^\mu,
\qquad A>0,\quad B>0,
\]

\[
A S_\mu-B\partial_\mu(\partial\!\cdot S)=-J_{c\mu},
\qquad
J_c^\mu=\sum_f c_f\bar\psi_f\gamma^\mu\gamma_5\psi_f.
\]

The coframe equation sees energy--momentum. The Lorentz-connection equation sees intrinsic spin current. In particular:

- $T_{00}$ sources the Newtonian potential;
- $T_{0i}$ and the associated macroscopic angular momentum source $h_{0i}$;
- the coarse-grained spatial axial current measures net intrinsic polarization; and
- an unpolarized rotating body has $T_{0i}\ne0$ but $J_c^i=0$.

This is the Poincare-gauge distinction emphasized by Hehl, Obukhov and Puetzfeld: macroscopic orbital angular momentum is not a torsion charge. It closes the ambiguity surrounding Gravity Probe B-like gyroscopes.

## Gravitoelectric and gravitomagnetic fields

For stationary mass $M$ and orbital angular momentum $\mathbf J$,

\[
h_{00}=\frac{2GM}{r},
\qquad
h_{0i}=-2G\frac{(\mathbf J\times\mathbf r)_i}{r^3}
\]

in the stated $c=1$ metric convention. Restoring $c$, a gyroscope has the usual frame-dragging precession

\[
\boldsymbol\Omega_{\rm LT}
=\frac{G}{c^2r^3}
\left[3(\mathbf J\!\cdot\!\hat{\mathbf r})\hat{\mathbf r}-\mathbf J\right].
\]

The secular node rate for a satellite of semimajor axis $a$ and eccentricity $e$ is

\[
\dot\Omega_{\rm node}
=\frac{2GJ}{c^2a^3(1-e^2)^{3/2}}.
\]

Why is its coefficient unchanged? The $b_3$ pseudoscalar-curvature square has no torsionless metric quadratic block, the critical spectrum has no additional metric pole, and an unpolarized source has no axial current. Therefore no $0^-$ exchange diagram exists between the Earth's rotational mass current and an unpolarized satellite.

Torsion stress can source the metric at quadratic order in a nonzero intrinsic-spin density. That source-dependent backreaction neither changes the universal linear coefficient nor exists for the unpolarized idealization.

## Exact polarized force

The connection inverse is

\[
K^{-1}=\frac{P_T}{A}+\frac{P_L}{A+Bp^2},
\qquad
m_\varphi^2=\frac AB,
\qquad f_f=\frac{c_f}{\sqrt A}.
\]

The transverse term is a zero-range axial contact. For separated point spins, define $Y_m=e^{-mr}/(4\pi r)$. The pole potential is

\[
V_{SS}=f_1f_2\sigma_1^i\sigma_2^j\partial_i\partial_jY_m.
\]

For $r>0$,

\[
\begin{aligned}
V_{SS}=\frac{f_1f_2e^{-mr}}{4\pi}\Bigg[&
-(\boldsymbol\sigma_1\!\cdot\!\boldsymbol\sigma_2)
\left(\frac m{r^2}+\frac1{r^3}\right)\\
&+(\boldsymbol\sigma_1\!\cdot\!\hat{\mathbf r})
(\boldsymbol\sigma_2\!\cdot\!\hat{\mathbf r})
\left(\frac{m^2}{r}+\frac{3m}{r^2}+\frac3{r^3}\right)
\Bigg].
\end{aligned}
\]

For extended bodies, each Pauli vector is replaced by the appropriate species-weighted spin-density integral and the tensor kernel is convolved over both volumes. If either net spin density vanishes, the leading separated force averages to zero. There is no monopole--dipole force in this minimal parity-even class.

## Earth-orbit benchmark

Take

\[
J_\oplus=5.86\times10^{33}\ {\rm kg\,m^2s^{-1}},
\quad a=1.2270\times10^7\ {\rm m},
\quad e=0.0045.
\]

The nodal formula gives

\[
\dot\Omega_{\rm LT}=30.669\ {\rm milliarcseconds/year}.
\]

The critical class predicts the same $30.669$ mas/year and a torsion correction of exactly zero for unpolarized source and satellite. As a separate experimental check, Gravity Probe B reported $-37.2\pm7.2$ mas/year against the GR prediction $-39.2$ mas/year. That agreement tests the metric $2^+$ sector; it is not a direct limit on this intrinsic-spin torsion pole.

Even a polarized satellite would require a fantastically light mediator. A one-e-fold range across the LAGEOS-like orbital scale needs

\[
m_\varphi\lesssim\frac{\hbar c}{a}
=1.61\times10^{-14}\ {\rm eV}.
\]

At the natural point of claim 1611, $m_\varphi=2.435\times10^{18}$ GeV and

\[
m_\varphi a\simeq1.51\times10^{41},
\]

so the Yukawa tail is absent for every practical purpose. At a $10$ cm laboratory separation, an unsuppressed tail still requires $m_\varphi\lesssim1.97\,\mu$eV.

## What would falsify or distinguish the theory

A non-GR Lense--Thirring coefficient measured with unpolarized bodies would falsify this isolated critical $0^-$ action; it would indicate another spin-parity sector, nonminimal matter coupling or selector dynamics.

The positive signal is a finite-range torque with all of the following:

1. it switches off when either source or detector is depolarized;
2. it follows the pseudoscalar tensor angular dependence above;
3. it falls as $e^{-m_\varphi r}$ with the same mass in every species channel; and
4. its flavor strengths obey $f_fm_\varphi=c_f/\sqrt B$.

Items 1--3 are generic axion/torsion phenomenology. A uniquely $Spin(2,3)$ falsifiable prediction requires the broken parent and descendant to calculate $A$, $B$ and the ratios $c_f$, rather than fit them. Only then would the combination of exactly-GR unpolarized frame dragging and a fixed correlated polarized-force pattern be a fingerprint.

In a local AdS patch, corrections to the Minkowski fields scale as $r^2/\ell_{\rm AdS}^2$. The stress-energy versus intrinsic-spin source split is unchanged, but a global AdS Green function is required once the apparatus is not small compared with the curvature radius.

## Stop rules

1. Do not use LAGEOS or Gravity Probe B as a direct bound on the isolated $0^-$ pole.
2. Do not identify ordinary macroscopic rotation with axial spin polarization.
3. Set the linear unpolarized Lense--Thirring correction to zero, rather than fitting a small torsion coefficient.
4. Use actual polarized species densities and finite-size convolution for a laboratory prediction.
5. Include $e^{-m_\varphi r}$ before quoting any orbital or laboratory reach.
6. Redo the calculation if another spin-parity sector, parity violation, nonminimal coupling or selector dynamics is introduced.

## Sources

- F. W. Hehl, Y. N. Obukhov and D. Puetzfeld, [*On Poincare gauge theory of gravity, its equations of motion, and Gravity Probe B*](https://arxiv.org/abs/1304.2769), *Physics Letters A* **377** (2013) 1775--1781.
- C. W. F. Everitt *et al.*, [*Gravity Probe B: Final Results of a Space Experiment to Test General Relativity*](https://arxiv.org/abs/1105.3456), *Physical Review Letters* **106** (2011) 221101.
- I. Ciufolini and E. C. Pavlis, [*A confirmation of the general relativistic prediction of the Lense--Thirring effect*](https://doi.org/10.1038/nature03007), *Nature* **431** (2004) 958--960.
- P. Fadeev *et al.*, [*Revisiting Spin-Dependent Forces Mediated by New Bosons*](https://arxiv.org/abs/1810.10364), *Physical Review A* **99** (2019) 022113.
- H.-J. Yo and J. M. Nester, [*Hamiltonian Analysis of Poincare Gauge Theory Scalar Modes*](https://arxiv.org/abs/gr-qc/9902032), *International Journal of Modern Physics D* **8** (1999) 459--479.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_critical_pgt_lense_thirring_spin_yukawa.mjs
~~~
