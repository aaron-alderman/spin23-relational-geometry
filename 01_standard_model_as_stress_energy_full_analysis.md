# The Standard Model as stress–energy: full in-depth analysis

**Prepared for Aaron's Spin(2,3) research programme — 16 October 2026**  
**Status:** established Standard Model and GR results first; proposed Spin(2,3) extensions explicitly marked.  
**Conventions:** natural units \(\hbar=c=1\) unless restored; metric signature \((-+++)\); \(T_{\mu\nu}=-(2/\sqrt{-g})\,\delta S_m/\delta g^{\mu\nu}\).

## 1. What “the Standard Model as a stress–energy tensor” can and cannot mean

The Standard Model is not literally identical to a single tensor. It is a local chiral quantum gauge theory whose fields, representations, action, state and renormalisation prescription contain much more information than \(T_{\mu\nu}\). Once coupled to a background geometry, however, the entire matter theory has a single universal **metric response**:

\[
T^{\rm SM}_{\mu\nu}(x)
=-\frac{2}{\sqrt{-g(x)}}\frac{\delta S_{\rm SM}}{\delta g^{\mu\nu}(x)}.
\]

This is the most precise defensible meaning of “the Standard Model as stress–energy.” It says that every gauge field, Higgs gradient, fermion momentum, interaction energy, condensate, pressure and flux enters gravity through the response of one action to the metric. It does **not** say that \(T_{\mu\nu}\) remembers every colour amplitude, flavour phase, entanglement relation or gauge redundancy. Many microscopically different states have the same stress tensor.

Classically, the complete statement is

\[
S[g,\mathcal A,H,\Psi]
=S_{\rm grav}[g]+S_{\rm SM}[g,\mathcal A,H,\Psi],
\qquad
G_{\mu\nu}+\Lambda g_{\mu\nu}=8\pi G\,T^{\rm SM}_{\mu\nu},
\]

with quantum gravity still absent. In semiclassical gravity the right-hand side becomes a renormalised state-dependent expectation value,

\[
G_{\mu\nu}+\Lambda_{\rm ren}g_{\mu\nu}
=8\pi G_{\rm ren}\,\langle\hat T^{\rm SM}_{\mu\nu}\rangle_{\rm ren},
\]

and this equation is an effective approximation, not a complete theory of quantum spacetime.

## 2. Exact field content and global gauge group

The Lie algebra usually quoted is

\[
\mathfrak g_{\rm SM}=\mathfrak{su}(3)_c\oplus\mathfrak{su}(2)_L\oplus\mathfrak u(1)_Y.
\]

With the observed hypercharge assignments, the faithful global group may be written

\[
G_{\rm SM}=\frac{SU(3)_c\times SU(2)_L\times U(1)_Y}{\mathbb Z_6},
\]

although global-form questions can depend on what line operators and possible extensions are admitted. Per generation, using \(Q=T_3+Y\), the left-handed Weyl multiplets are

| Field | \(SU(3)_c\) | \(SU(2)_L\) | \(Y\) |
|---|---:|---:|---:|
| \(Q_L=(u_L,d_L)^T\) | \(\mathbf 3\) | \(\mathbf 2\) | \(+1/6\) |
| \(u_R\) | \(\mathbf 3\) | \(\mathbf 1\) | \(+2/3\) |
| \(d_R\) | \(\mathbf 3\) | \(\mathbf 1\) | \(-1/3\) |
| \(L_L=(\nu_L,e_L)^T\) | \(\mathbf 1\) | \(\mathbf 2\) | \(-1/2\) |
| \(e_R\) | \(\mathbf 1\) | \(\mathbf 1\) | \(-1\) |
| \(H\) | \(\mathbf 1\) | \(\mathbf 2\) | \(+1/2\) |

The minimal renormalisable Standard Model has no \(\nu_R\) and predicts massless neutrinos. Oscillation data therefore require an extension: for example right-handed neutrinos and Dirac/Majorana terms, or the dimension-five Weinberg operator. That extension has its own stress–energy contribution and must not be silently counted as part of the minimal model.

The gauge connection and field strengths are

\[
\mathcal A_\mu=g_sG^A_\mu T^A+gW^I_\mu\frac{\tau^I}{2}+g'YB_\mu,
\]

\[
\begin{aligned}
G^A_{\mu\nu}&=\partial_\mu G^A_\nu-\partial_\nu G^A_\mu
+g_sf^{ABC}G^B_\mu G^C_\nu,\\
W^I_{\mu\nu}&=\partial_\mu W^I_\nu-\partial_\nu W^I_\mu
+g\epsilon^{IJK}W^J_\mu W^K_\nu,\\
B_{\mu\nu}&=\partial_\mu B_\nu-\partial_\nu B_\mu.
\end{aligned}
\]

For spinors on curved spacetime,

\[
D_\mu=\partial_\mu+\frac14\omega_{\mu ab}\gamma^{ab}
-ig_sG^A_\mu T^A-igW^I_\mu\frac{\tau^I}{2}-ig'YB_\mu.
\]

The tetrad \(e^a{}_{\mu}\), spin connection \(\omega_{\mu ab}\), and a spin structure are essential. Fermions cannot be coupled to an arbitrary metric by replacing \(\eta\) with \(g\) alone.

## 3. The complete classical matter action

A compact gauge-invariant, generally covariant form is

\[
S_{\rm SM}=\int d^4x\sqrt{-g}\,
(\mathcal L_{\rm gauge}+\mathcal L_H+\mathcal L_f+\mathcal L_Y),
\]

where

\[
\begin{aligned}
\mathcal L_{\rm gauge}={}&
-\frac14G^A_{\mu\nu}G^{A\mu\nu}
-\frac14W^I_{\mu\nu}W^{I\mu\nu}
-\frac14B_{\mu\nu}B^{\mu\nu},\\
\mathcal L_H={}&-(D_\mu H)^\dagger D^\mu H-V(H),\\
V(H)={}&-\mu^2H^\dagger H+\lambda(H^\dagger H)^2+V_0,\\
\mathcal L_f={}&\frac{i}{2}\sum_{r=1}^{3}\sum_{\psi=Q,L,u,d,e}
\bar\psi_r\gamma^\mu\overleftrightarrow{D}_\mu\psi_r,\\
\mathcal L_Y={}&-\sum_{r,s=1}^{3}\left[
\bar Q_{Lr}(Y_d)_{rs}H d_{Rs}
+\bar Q_{Lr}(Y_u)_{rs}\widetilde H u_{Rs}
+\bar L_{Lr}(Y_e)_{rs}H e_{Rs}+\mathrm{h.c.}\right],\\
\widetilde H={}&i\tau^2H^*.
\end{aligned}
\]

The constant \(V_0\) changes no nongravitational classical field equation, but contributes

\[
T^{(V_0)}_{\mu\nu}=-V_0g_{\mu\nu}.
\]

This is the sharp reason “shifting the potential by a constant” stops being physically harmless when gravity is dynamical.

A renormalisable matter theory in curved spacetime generally also requires the nonminimal operator

\[
S_\xi=-\int d^4x\sqrt{-g}\,\xi R H^\dagger H,
\]

even if one chooses a renormalisation condition \(\xi=0\) at one scale. In four dimensions \(\xi=1/6\) is the conformal value for a massless scalar sector. The gravitational counterterm action must contain

\[
S_{\rm grav}=\int d^4x\sqrt{-g}
\left[\frac{R-2\Lambda}{16\pi G}+aR^2+bR_{\mu\nu}R^{\mu\nu}
+cR_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma}+d\Box R\right].
\]

Thus “Standard Model plus classical GR” is already an effective curved-spacetime field theory with more structure than the flat-space textbook Lagrangian suggests.

## 4. Metric variation: the full classical tensor

### 4.1 Gauge fields

For each factor, with adjoint index \(a\),

\[
T^{\rm gauge}_{\mu\nu}[F]
=F^a{}_{\mu\rho}F^{a}{}_{\nu}{}^{\rho}
-\frac14g_{\mu\nu}F^a{}_{\rho\sigma}F^{a\rho\sigma}.
\]

Therefore

\[
T^{\rm SM,gauge}_{\mu\nu}
=T_{\mu\nu}[G]+T_{\mu\nu}[W]+T_{\mu\nu}[B].
\]

The non-Abelian self-interactions are not missing: they are inside \(G^A_{\mu\nu}\) and \(W^I_{\mu\nu}\). Expanding the field strengths yields quadratic, cubic and quartic powers of the gauge potentials. Leaving them in \(F^2\) form is compact, not incomplete.

In a local orthonormal frame, a Maxwell field illustrates the component meaning:

\[
T_{\hat0\hat0}=\frac12(\mathbf E^2+\mathbf B^2),\quad
T_{\hat0\hat i}=(\mathbf E\times\mathbf B)_i,
\]

\[
T_{\hat i\hat j}=-E_iE_j-B_iB_j
+\frac12\delta_{ij}(\mathbf E^2+\mathbf B^2).
\]

The diagonal spatial pieces are pressure/tension; off-diagonal pieces are shear stresses.

### 4.2 Higgs field

For the minimally coupled complex doublet,

\[
\boxed{
T^H_{\mu\nu}=(D_\mu H)^\dagger D_\nu H
+(D_\nu H)^\dagger D_\mu H
-g_{\mu\nu}\left[(D_\rho H)^\dagger D^\rho H+V(H)\right].}
\]

For the nonminimal term, the additional metric response is

\[
\boxed{
\Delta T^{(\xi)}_{\mu\nu}=2\xi\left[
G_{\mu\nu}H^\dagger H
+(g_{\mu\nu}\Box-\nabla_\mu\nabla_\nu)(H^\dagger H)
\right].}
\]

Moving the \(G_{\mu\nu}H^\dagger H\) term to the geometric side can be interpreted as a field-dependent effective Planck mass. Whether it is called “matter” or “gravity” is then partly a choice of frame; observable predictions must agree after a valid field redefinition.

### 4.3 Chiral fermions

Varying spinors requires varying the tetrad and spin connection. At a classical solution, the symmetric Dirac contribution can be written

\[
\boxed{
T^f_{\mu\nu}=\frac{i}{4}\sum_\psi
\left[
\bar\psi\gamma_\mu\overleftrightarrow{D}_\nu\psi
+\bar\psi\gamma_\nu\overleftrightarrow{D}_\mu\psi
\right].}
\]

This expression includes kinetic momentum and gauge coupling through \(D_\mu\). There are two equivalent-looking bookkeeping choices that must not be confused:

1. An **off-shell sector split** can display a term \(g_{\mu\nu}\mathcal L_Y\) from the Yukawa density and a corresponding \(-g_{\mu\nu}\mathcal L_f\).
2. Using the fermion equations of motion combines those terms into the on-shell symmetric expression above, so the Yukawa interaction is present indirectly through the solution and its mass.

The absence of a separate visible \(Y\) in the boxed on-shell tensor does not mean Yukawa energy fails to gravitate.

### 4.4 One-line full output

Suppressing gauge-fixing and ghost terms and using the classical equations of motion, the requested full tensor is

\[
\boxed{
\begin{aligned}
T^{\rm SM}_{\mu\nu}={}&
G^A{}_{\mu\rho}G^A{}_{\nu}{}^{\rho}
-\frac14g_{\mu\nu}G^A{}_{\rho\sigma}G^{A\rho\sigma}\\
&+W^I{}_{\mu\rho}W^I{}_{\nu}{}^{\rho}
-\frac14g_{\mu\nu}W^I{}_{\rho\sigma}W^{I\rho\sigma}\\
&+B_{\mu\rho}B_{\nu}{}^{\rho}
-\frac14g_{\mu\nu}B_{\rho\sigma}B^{\rho\sigma}\\
&+(D_\mu H)^\dagger D_\nu H+(D_\nu H)^\dagger D_\mu H\\
&-g_{\mu\nu}\left[(D_\rho H)^\dagger D^\rho H+V(H)\right]\\
&+\frac{i}{4}\sum_{r,\psi}left[
\bar\psi_r\gamma_\mu\overleftrightarrow{D}_\nu\psi_r
+\bar\psi_r\gamma_\nu\overleftrightarrow{D}_\mu\psi_r\right]\\
&+2\xi\left[G_{\mu\nu}H^\dagger H
+(g_{\mu\nu}\Box-\nabla_\mu\nabla_\nu)(H^\dagger H)\right].
\end{aligned}}
\]

Indices \(A=1,\ldots,8\), \(I=1,2,3\); the fermion sum covers every colour, weak component and generation through the displayed multiplets. This is “ugly” only if every internal component is expanded. The covariant expression is the full output because it retains all interactions and makes the symmetries manifest.

## 5. Conservation is an identity of the whole system

Diffeomorphism invariance gives a Noether identity. When all matter field equations hold,

\[
\nabla^\mu T^{\rm SM}_{\mu\nu}=0.
\]

Individual sectors need not be conserved:

\[
\nabla^\mu T^{(a)}_{\mu\nu}=f^{(a)}_\nu,
\qquad \sum_a f^{(a)}_\nu=0.
\]

The exchange forces \(f^{(a)}_\nu\) describe energy–momentum transfer among gauge, Higgs and fermion sectors. In electromagnetism, for example, \(\nabla^\mu T^{\rm EM}_{\mu\nu}=-F_{\nu\rho}J^\rho\), while charged matter gains the opposite amount. A proposed hidden Spin(2,3) sector cannot simply make visible \(T_{\mu\nu}\) nonconserved; the complete action must supply the compensating exchange and satisfy the Bianchi identity.

## 6. After electroweak symmetry breaking

In unitary gauge,

\[
H(x)=\frac{1}{\sqrt2}\begin{pmatrix}0\\v+h(x)\end{pmatrix},
\qquad v^2=\frac{\mu^2}{\lambda},
\]

and

\[
W_\mu^\pm=\frac{W^1_\mu\mp iW^2_\mu}{\sqrt2},\quad
\begin{pmatrix}A_\mu\\Z_\mu\end{pmatrix}
=\begin{pmatrix}\sin\theta_W&\cos\theta_W\\
\cos\theta_W&-\sin\theta_W\end{pmatrix}
\begin{pmatrix}W^3_\mu\\B_\mu\end{pmatrix},
\]

with \(\tan\theta_W=g'/g\). The mass terms contained in \(T^H_{\mu\nu}\) become

\[
m_W^2W^+_\mu W^{-\mu}+\frac12m_Z^2Z_\mu Z^\mu,
\qquad
m_W=\frac{gv}{2},\quad m_Z=\frac{v}{2}\sqrt{g^2+g'^2},
\]

while the photon remains massless. Yukawa matrices give

\[
M_u=\frac{vY_u}{\sqrt2},\quad
M_d=\frac{vY_d}{\sqrt2},\quad
M_e=\frac{vY_e}{\sqrt2}.
\]

Biunitary diagonalisation moves flavour mismatch into CKM mixing in the charged quark current. With massive neutrinos, an analogous lepton mismatch gives PMNS mixing. The stress tensor is basis independent: field redefinitions redistribute terms without changing the total metric response.

For a massive vector \(V_\mu\), the Proca contribution illustrates the broken-phase form:

\[
T^{\rm Proca}_{\mu\nu}=V_{\mu\rho}V_\nu{}^\rho
-\frac14g_{\mu\nu}V_{\rho\sigma}V^{\rho\sigma}
+m^2\left(V_\mu V_\nu-\frac12g_{\mu\nu}V_\rho V^\rho\right).
\]

The longitudinal \(W\) and \(Z\) modes are not new hidden spacetime directions; they arise from the Higgs mechanism and gauge constraints.

## 7. Canonical, Belinfante and Hilbert tensors

Translation invariance in flat space gives the canonical Noether tensor

\[
T^\mu{}_{\nu,\rm can}
=\sum_\phi\frac{\partial\mathcal L}{\partial(\partial_\mu\phi)}\partial_\nu\phi
-\delta^\mu_\nu\mathcal L.
\]

It is generally neither symmetric nor gauge invariant. Adding the divergence of a superpotential gives a Belinfante–Rosenfeld improvement, which incorporates spin current and agrees with the Hilbert tensor for ordinary minimally coupled first-derivative theories under appropriate assumptions. The agreement is not a universal theorem for every higher-derivative or nonminimal theory.

For gravitational sourcing, the metric/tetrad response is the clean definition. Improvements are physically relevant because curvature couplings can change local stress, traces and contact terms even when total flat-space momentum is unchanged.

## 8. Gauge fixing, ghosts and what gravitates

Perturbation theory adds a gauge-fixing functional and Faddeev–Popov ghosts:

\[
\mathcal L_{\rm quant}=\mathcal L_{\rm SM}+\mathcal L_{\rm gf}+\mathcal L_{\rm ghost}+\mathcal L_{\rm ct}.
\]

Metric variation then produces gauge-fixing, ghost and counterterm contributions. They are required in intermediate Green functions and in a BRST-consistent composite operator. They are not additional observable negative-energy matter. Matrix elements between physical states are gauge independent after all required terms are combined. A “full tensor” that expands only classical physical fields is complete for classical gravity, but not a complete renormalised operator definition.

## 9. The quantum stress tensor

\(T_{\mu\nu}(x)\) is a composite operator. Products of fields at one point are singular, so its expectation value requires regularisation and renormalisation. Allowed finite ambiguities include conserved local curvature tensors obtained by varying

\[
\int\sqrt{-g}\,(\Lambda,R,R^2,R_{\mu\nu}R^{\mu\nu},R_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma}).
\]

Consequently, “the vacuum energy of the Standard Model” is not obtained consistently by placing a hard momentum cutoff on \(\frac12\sum\omega\) and treating the result as unique. The observed cosmological constant is a renormalised gravitational parameter receiving radiative contributions; its extreme smallness relative to particle scales is the cosmological-constant problem.

The renormalised trace schematically contains

\[
\langle T^\mu{}_{\mu}\rangle
=\sum_i\frac{\beta_i(g_i)}{2g_i}\langle F_i^2\rangle
+\beta_\lambda\langle\mathcal O_\lambda\rangle
+\sum_f(1+\gamma_{m_f})m_f\langle\bar f f\rangle
+\text{Higgs and curvature terms}.
\]

Even classically massless gauge theory therefore acquires a quantum trace through running couplings. In QCD,

\[
T^\mu{}_{\mu}\supset
\frac{\beta_s(g_s)}{2g_s}G^A_{\rho\sigma}G^{A\rho\sigma}
+\sum_q(1+\gamma_{m_q})m_q\bar q q.
\]

For a one-particle hadron state, the matrix element of the full tensor fixes its four-momentum and mass. Most proton and neutron mass is generated by QCD confinement and the trace anomaly, not by adding the current quark rest masses. The Higgs sets the quark masses that explicitly break chiral symmetry, but it is misleading to say the Higgs directly supplies nearly all ordinary material mass.

## 10. Stress–energy form factors and gravitational structure

For a spin-\(1/2\) hadron, a conventional decomposition is

\[
\langle p',s'|T^{\mu\nu}_a|p,s\rangle
=\bar u(p',s')\left[
A_a(t)\gamma^{(\mu}P^{\nu)}
B_a(t)\frac{P^{(\mu}i\sigma^{\nu)\rho}\Delta_\rho}{2M}
D_a(t)\frac{\Delta^\mu\Delta^\nu-g^{\mu\nu}\Delta^2}{4M}
+\bar C_a(t)Mg^{\mu\nu}
\right]u(p,s),
\]

where \(P=(p'+p)/2\), \(\Delta=p'-p\), \(t=\Delta^2\). These “gravitational form factors” encode momentum, angular momentum and internal pressure/shear distributions. Only the total conserved tensor has the simplest conservation constraints; quark and gluon pieces exchange momentum and are scale dependent.

This provides a concrete lesson for the programme: stress–energy can reveal relational mechanical structure not visible in a charge density alone, but it still does not reconstruct the complete quantum state.

## 11. Energy conditions

For timelike \(u^\mu\) and null \(k^\mu\):

- weak energy condition: \(T_{\mu\nu}u^\mu u^\nu\ge0\);
- null energy condition: \(T_{\mu\nu}k^\mu k^\nu\ge0\);
- dominant energy condition: the energy flux is causal and future directed;
- strong energy condition: \((T_{\mu\nu}-\tfrac12Tg_{\mu\nu})u^\mu u^\nu\ge0\).

Classical Yang–Mills fields satisfy familiar positivity properties. Scalar potentials, nonminimal coupling and quantum states can violate some pointwise conditions. Quantum field theory routinely permits local negative renormalised energy density subject to quantum inequalities; this does not provide unrestricted exotic matter for warp engineering.

## 12. What gravity actually sees

Gravity couples to every contribution to total energy–momentum, including electromagnetically dark fields. Therefore the thesis's statement that gravity may “see more” than luminosity is already true in a modest operational sense: neutrinos, QCD binding energy, cold gas and hypothetical dark matter gravitate despite being faint or invisible.

The stronger proposed claim is that a larger configuration geometry contributes to the effective source while ordinary Standard Model detectors sample only a selected Lorentzian sector. That requires an action. A generic decomposition would be

\[
S_{\rm total}=S_{\rm grav}[G]+S_{\rm select}[G,n]
+S_{\rm SM}[g(G,n),\Phi_{\rm SM}]+S_{\rm hidden}[G,n,\chi]
+S_{\rm portal},
\]

leading after reduction to

\[
G_{\mu\nu}[g]=8\pi G_N
\left(T^{\rm SM}_{\mu\nu}+T^{\rm hidden}_{\mu\nu}
+T^{\rm selection}_{\mu\nu}+T^{\rm projection}_{\mu\nu}\right).
\]

The final two terms cannot be inserted by hand. They follow from varying the selection field and the dependence of the induced metric on the higher-dimensional fields.

## 13. The Spin(2,3) extension: exact requirements

### 13.1 What the group supplies

\(\mathrm{Spin}(2,3)\) is the double cover of the identity component of \(SO(2,3)\) and is isomorphic to \(Sp(4,\mathbb R)\). It is the spin/isometry group associated with four-dimensional anti-de Sitter geometry embedded in \(\mathbb R^{2,3}\). Its even Clifford algebra supports a four-real-dimensional spinor representation. These are genuine facts.

They do not produce \(SU(3)_c\), three generations, hypercharges, Yukawa matrices or the Standard Model action. Nor does the maximal compact \(U(2)\subset Sp(4,\mathbb R)\) equal \(SU(3)\times SU(2)\times U(1)\).

### 13.2 A five-dimensional Hilbert tensor

If the fundamental arena really is a five-dimensional spacetime with metric \(G_{AB}\) of signature \((2,3)\), define

\[
\mathcal T_{AB}=-\frac{2}{\sqrt{|G|}}\frac{\delta S_m}{\delta G^{AB}}.
\]

An embedded observed sector \(X^A(x^\mu)\) has induced metric

\[
g_{\mu\nu}=G_{AB}(X)\partial_\mu X^A\partial_\nu X^B.
\]

But the effective four-dimensional Einstein equation is generally **not** obtained by the naive projection \(T_{\mu\nu}=\partial_\mu X^A\partial_\nu X^B\mathcal T_{AB}\). Gauss–Codazzi relations, extrinsic curvature, bulk Weyl curvature, boundary conditions and selection-field terms also enter.

If T2 is instead an internal or configuration coordinate, \(G_{AB}\) is not automatically a spacetime metric and \(\mathcal T_{AB}\) is not automatically gravitational stress–energy. The programme must decide which ontology it uses.

### 13.3 Two-time sign obstruction

For

\[
ds^2=-dt_1^2+d\mathbf x^2-dt_2^2,
\]

a free scalar mode \(\Phi=\phi(t_1,\mathbf x)e^{i\omega_2t_2}\) gives

\[
(-\partial_{t_1}^2+\nabla^2+\omega_2^2)\phi=0,
\qquad m_{\rm eff}^2=-\omega_2^2.
\]

The simplest periodic hidden-time momentum is tachyonic, not an ordinary positive mass. More generally, two independent physical times make the field equations ultrahyperbolic, spoil the usual Cauchy problem and commonly introduce negative-norm or unbounded-energy modes. A viable theory needs constraints or gauge symmetry that remove the extra-time ghosts; simply relabelling T2 as “configuration” does not perform that removal.

### 13.4 Minimum viable response law

Let \(n^A\) select the effective Lorentzian sector and \(P^A{}_B(n)\) project onto its tangent directions. A serious model must derive, not assume,

\[
g_{\mu\nu}=P^A{}_{C}P^B{}_{D}G_{AB}\,
\partial_\mu X^C\partial_\nu X^D,
\]

and specify an action such as

\[
S=\int d^5X\sqrt{|G|}\left[
\frac{\mathcal R[G]-2\Lambda_5}{2\kappa_5}
-\frac{Z}{2}(\nabla_An_B)(\nabla^An^B)-U(n^2)
+\mathcal L_{\rm matter}(G,n,\Psi)
\right].
\]

Required outputs are:

1. the constraint algebra and physical degrees of freedom;
2. a positive physical inner product and Hamiltonian;
3. a well-posed initial-value problem;
4. recovery of a local \(3+1\) light cone;
5. the exact Standard Model chiral representations and anomaly cancellation;
6. an effective conserved \(T^{\rm eff}_{\mu\nu}\);
7. a new observable linked to the same parameters that generate the reduction.

## 14. Why stress–energy is the right interface but not the final unifier

The strongest version of the thesis can now be stated cleanly:

> One action on a larger constrained geometry should yield both the Standard Model's internal gauge currents and the effective metric stress tensor, with the observed Lorentzian sector selected dynamically and with no independent tuning of electromagnetic and gravitational response kernels.

Varying a connection gives gauge current,

\[
J^\mu_a=\frac{1}{\sqrt{-g}}\frac{\delta S}{\delta A^a_\mu},
\]

while varying the metric/tetrad gives stress–energy. Varying the selection structure would give a third response equation. This response-based triangle is more promising than identifying a particle with a tensor component:

\[
\boxed{
\text{connection response}\leftrightarrow\text{internal charge},\quad
\text{tetrad response}\leftrightarrow\text{energy--momentum},\quad
\text{selection response}\leftrightarrow\text{sector orientation}.}
\]

What is not yet known is whether one Spin(2,3)-related algebraic action can generate all three with the correct spectrum.

## 15. Concrete calculation programme

1. **Fix ontology.** Decide whether T2 is a second spacetime time, an internal negative-sign coordinate, a phase, or a gauge redundancy.
2. **Write the action.** Include the selection field, constraints, boundary conditions and every portal to Standard Model fields.
3. **Perform Dirac constraint analysis.** Count physical modes and locate ghosts before fitting any phenomenon.
4. **Linearise about the selected vacuum.** Compute propagators and pole residues; require positive mass squared and positive norm.
5. **Derive the low-energy action.** It must reduce to the curved-spacetime Standard Model above plus controlled higher-dimensional operators.
6. **Vary the reduced action.** Obtain \(J^\mu_a\), \(T_{\mu\nu}\), and the selection-field equation from the same functional.
7. **Check Ward identities.** Gauge, diffeomorphism and BRST identities must be mutually consistent and anomalies must cancel.
8. **Renormalise as an EFT.** List all operators permitted by the surviving symmetries and estimate their coefficients.
9. **Choose one discriminator.** Examples are a correlated phase/gravitational response or a fixed lensing–dynamics relation. It must not be an adjustable hidden function.

### 15.1 Executed stress-spectral reduction

The programme now has an explicit kinematic realization of step 7. At nonzero Euclidean momentum, the conserved stress spectral kernel decomposes into rank-five spin-two and rank-one transverse-trace projectors, with four longitudinal Ward-null directions. Two conserved stress probes obey the exact singular-Schur range condition and reduce to a positive \(H_2(\mathbb R)\) response. See [Conserved-stress spectral quotient to an H2 response](206_conserved_stress_spectral_quotient_to_h2_response.md).

This advances the reduction from a proposed interface to a verified projector theorem. It does not yet calculate the Standard-Model spectral weights, fix the conserved contact terms or select the two probes uniquely.

## 16. Bottom line

The complete Standard Model stress tensor is not an enormous mysterious matrix. It is a symmetric rank-two spacetime response with ten components at each point, compactly generated by variation of a very rich action. Its apparent simplicity is exactly why it is useful: it is the universal channel through which gravity samples Standard Model matter. Its limitation is equally important: it is a many-to-one summary.

For the Spin(2,3) programme, the task is therefore not to “put all Standard Model particles inside the entries of \(T_{\mu\nu}\).” The task is to produce a deeper action whose metric variation yields the known tensor, whose connection variation yields the known gauge currents, whose constrained state space yields the known chiral particles, and whose extra structure predicts something new without ghosts or arbitrary response kernels.

## Primary sources and technical references

- V. Branding, A. Lindström and M. Sobak, [*The energy-momentum tensor of the Standard Model with applications to energy conditions*](https://arxiv.org/abs/2605.08216), arXiv:2605.08216 (2026). This is the most directly relevant geometric full-SM derivation used here.
- D. N. Blaschke, F. Gieres, M. Reboud and M. Schweda, [*The Energy-Momentum Tensor(s) in Classical Gauge Theories*](https://arxiv.org/abs/1605.01121), arXiv:1605.01121.
- Particle Data Group, [*Standard Model and related topics*](https://pdg.lbl.gov/2025/reviews/standard_model_and_related.html), 2025 update to the 2024 Review of Particle Physics.
- J. C. Collins, A. Duncan and S. D. Joglekar, *Trace and dilatation anomalies in gauge theories*, Phys. Rev. D 16 (1977) 438, DOI: 10.1103/PhysRevD.16.438.
- C. G. Callan, S. Coleman and R. Jackiw, *A new improved energy-momentum tensor*, Annals of Physics 59 (1970) 42, DOI: 10.1016/0003-4916(70)90394-5.
- N. D. Birrell and P. C. W. Davies, *Quantum Fields in Curved Space*, Cambridge University Press (1982).
- R. M. Wald, *Quantum Field Theory in Curved Spacetime and Black Hole Thermodynamics*, University of Chicago Press (1994).

