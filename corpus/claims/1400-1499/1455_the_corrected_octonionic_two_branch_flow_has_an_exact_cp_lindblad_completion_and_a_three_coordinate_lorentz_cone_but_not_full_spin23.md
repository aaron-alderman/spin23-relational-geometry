# The corrected octonionic two-branch flow has an exact CP-Lindblad completion and a three-coordinate Lorentz cone, but not full \(Spin(2,3)\)

**Date:** 20 October 2026  
**Source audited:** Aaron Alderman, [“Octonionic Two-Branch Transport and Forced Phase Classification”](https://doi.org/10.5281/zenodo.19643326), Zenodo record 19643326  
**Status:** exact corrected closure and exact typed open-system completion; as-written invariant and phase portrait require correction; no A4 or full-\(Spin(2,3)\) promotion  
**Related corpus:** [programme file audit 22](../0000-0099/22_spin23_programme_file_and_folder_analysis.md), [Furey response-plane audit 709](../0700-0799/709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md), [full response closure 1281](../1200-1299/1281_full_sp4_closure_requires_addressed_anisotropy_which_is_control_data_not_cycle_symmetry.md), [graph exhaustion 1282](../1200-1299/1282_the_graph_to_spin23_lane_is_internally_exhausted_at_conditional_response_symmetry_not_spacetime.md), and [A4 physical-state boundary 1451](1451_the_maximal_a4_action_freezes_all_bulk_poles_but_the_chiral_fold_has_no_declared_physical_state_domain.md)  
**Evidence:** [machine-readable audit](../../../evidence/data/spin23-zenodo-octonionic-two-branch-lindblad-audit.json) and [executable verifier](../../../verification/verify/verify_spin23_zenodo_octonionic_two_branch_lindblad_audit.mjs)

## Result

The displayed amplitude equations in the Zenodo paper,

\[
 \dot A=(i\omega-\gamma)A+\kappa\bar B,
 \qquad
 \dot B=(i\omega-\gamma)B+\kappa\bar A,
\]

have a stronger first-principles continuation than the paper records. They are exactly the first-moment equations of a completely positive two-mode bosonic Lindblad system:

\[
 H=-\omega(a^\dagger a+b^\dagger b)
 +i\kappa(a^\dagger b^\dagger-ab),
\]

\[
 L_a=\sqrt{2\gamma}\,a,
 \qquad
 L_b=\sqrt{2\gamma}\,b.
\]

With \(A=\langle a\rangle\) and \(B=\langle b\rangle\), the adjoint GKSL equation reproduces every displayed term exactly:

\[
 {d\langle a\rangle\over dt}
 =(i\omega-\gamma)\langle a\rangle
 +\kappa\langle b^\dagger\rangle,
\]

and similarly for \(b\). The rotation comes from the number Hamiltonian, the conjugate branch coupling from a two-mode squeezing Hamiltonian, and the loss from the two positive Lindblad dissipators.

This is an exact typed alternative origin for the reduced equations. It is not yet an octonionic derivation: identifying the projected bracket values with bosonic first moments, and deriving \(\kappa\) from a local octonionic interaction, remain additional assumptions.

The paper also contains two correctable mathematical faults:

1. For its own parametrization \(A=r_1e^{i\theta_1}\), \(B=r_2e^{i\theta_2}\), the variable used by the reduction is \(AB=R^2e^{i(\theta_1+\theta_2)}\), not \(A\bar B\). The equations have an opposite-phase \(U(1)\), not the stated common-phase \(U(1)\).
2. The complementary fixed-point branch permits only the sign-compatible one of \(\Phi=\pi/2\) and \(3\pi/2\). The supplied plotting script marks both, producing two spurious centers in each displayed panel.

After the first correction, three real bilinears close exactly and form a positive \(H_2(\mathbb R)\) / \(SO(2,1)\) response cone. The Hamiltonian generator algebra is only

\[
 \mathfrak{sp}(2,\mathbb R)\cong\mathfrak{so}(2,1),
\]

of dimension three. The underlying real phase space is four-dimensional, but the construction does not generate the ten-dimensional

\[
 \mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

Therefore this source strengthens the response-dynamics lane but changes neither A4 physical-state admission nor the corpus boundary against interpreting response geometry as literal spacetime.

## 1. The as-written invariant is inconsistent with the equations

The paper writes

\[
 A=r_1e^{i\theta_1},\qquad B=r_2e^{i\theta_2},
 \qquad \Phi=\theta_1+\theta_2,
\]

and then identifies

\[
 \mathcal I=A\bar B=R^2e^{i\Phi}.
\]

But directly,

\[
 A\bar B=r_1r_2e^{i(\theta_1-\theta_2)},
\]

whereas

\[
 AB=r_1r_2e^{i(\theta_1+\theta_2)}=R^2e^{i\Phi}.
\]

The ODE selects the second expression. Under

\[
 A\mapsto e^{i\alpha}A,
 \qquad B\mapsto e^{-i\alpha}B,
\]

both equations are covariant and \(AB\) is invariant. Under a common phase rotation the conjugate coupling transforms with the wrong phase, so the equations are not covariant.

The minimal consistent repair is consequently

\[
 \boxed{\mathcal I=AB,\qquad U(1): (A,B)\mapsto(e^{i\alpha}A,e^{-i\alpha}B).}
\]

With this repair, the paper's equations for \((R,\rho,\Phi)\) are algebraically correct. If \(A\bar B\) and common-phase symmetry are retained instead, the displayed reduction does not follow.

## 2. Exact three-coordinate closure

Define the corrected invariant coordinates

\[
 S_0={|A|^2+|B|^2\over2},
 \qquad S_1=\operatorname{Re}(AB),
 \qquad S_2=\operatorname{Im}(AB).
\]

They satisfy the closed linear system

\[
 {d\over dt}
 \begin{pmatrix}S_0\\S_1\\S_2\end{pmatrix}
 =
 \begin{pmatrix}
 -2\gamma&2\kappa&0\\
 2\kappa&-2\gamma&-2\omega\\
 0&2\omega&-2\gamma
 \end{pmatrix}
 \begin{pmatrix}S_0\\S_1\\S_2\end{pmatrix}.
\]

This is the precise rank-three closure: three independent real observables form an invariant linear subsystem. It does **not** mean that the displayed \(3\times3\) drift matrix has rank three at every parameter value; its rank drops on special parameter surfaces.

Package the same variables as

\[
 G=
 \begin{pmatrix}
 S_0+S_1&S_2\\
 S_2&S_0-S_1
 \end{pmatrix}.
\]

The arithmetic-geometric mean inequality gives

\[
 S_0\ge\sqrt{S_1^2+S_2^2},
\]

so \(G\in H_2(\mathbb R)^+\), with

\[
 \det G=S_0^2-S_1^2-S_2^2
 ={(|A|^2-|B|^2)^2\over4}\ge0.
\]

For \(\eta=\operatorname{diag}(1,-1,-1)\), the bilinear drift \(M_3\) obeys

\[
 M_3^T\eta+\eta M_3=-4\gamma\eta.
\]

Thus

\[
 S_0^2-S_1^2-S_2^2
 =e^{-4\gamma t}
 \left(S_0^2-S_1^2-S_2^2\right)_{t=0}.
\]

The residual is conformally Lorentzian on the response cone. It is not itself symplectic: a three-dimensional space cannot carry a nondegenerate two-form.

## 3. Four-dimensional conformally symplectic lift

Write \(A=x_1+iy_1\), \(B=x_2+iy_2\), and \(z=(x_1,y_1,x_2,y_2)^T\). Then

\[
 \dot z=Kz,
\]

with

\[
 K=
 \begin{pmatrix}
 -\gamma&-\omega&\kappa&0\\
 \omega&-\gamma&0&-\kappa\\
 \kappa&0&-\gamma&-\omega\\
 0&-\kappa&\omega&-\gamma
 \end{pmatrix}.
\]

For the canonical symplectic matrix \(J=J_2\oplus J_2\),

\[
 K^TJ+JK=-2\gamma J.
\]

Therefore the four-real-dimensional amplitude flow is genuinely conformally symplectic, with pullback

\[
 F_t^*\Omega=e^{-2\gamma t}\Omega.
\]

At \(\gamma=0\) it is Hamiltonian. The two Hamiltonian controls proportional to \(\omega\) and \(\kappa\), together with their commutator, close on a three-dimensional algebra isomorphic to \(\mathfrak{sp}(2,\mathbb R)\) or \(\mathfrak{so}(2,1)\). Their Lie closure has dimension three, not ten.

This separates three easily conflated dimensions:

- four real phase-space coordinates \((x_1,y_1,x_2,y_2)\);
- three closed bilinear response coordinates \((S_0,S_1,S_2)\);
- three Hamiltonian Lie generators in \(\mathfrak{sp}(2,\mathbb R)\).

None is a derivation of full \(\mathfrak{sp}(4,\mathbb R)\).

## 4. Exact Hamiltonian and CP-Lindblad derivation

Use the master equation

\[
 \dot\varrho=-i[H,\varrho]
 +\sum_{j=a,b}\left(
 L_j\varrho L_j^\dagger
 -{1\over2}\{L_j^\dagger L_j,\varrho\}
 \right).
\]

The quadratic Hamiltonian

\[
 H=-\omega(N_a+N_b)
 +i\kappa(a^\dagger b^\dagger-ab)
\]

is self-adjoint for real \(\omega,\kappa\). The two jumps

\[
 L_a=\sqrt{2\gamma}\,a,
 \qquad L_b=\sqrt{2\gamma}\,b
\]

give a positive diagonal Kossakowski matrix. Canonical commutation relations yield

\[
 i[H,a]=i\omega a+\kappa b^\dagger,
 \qquad
 \mathcal D^\dagger_{L_a}(a)=-\gamma a,
\]

and the cross dissipator vanishes on \(a\). This gives the manuscript equation exactly; the calculation for \(b\) is identical.

In quadratures the Hamiltonian is

\[
 H=-{\omega\over2}
 (q_1^2+p_1^2+q_2^2+p_2^2)
 +\kappa(q_1p_2+p_1q_2)
 +\text{constant},
\]

and the loss diffusion matrix is \(D=\gamma I_4\) in the convention where the vacuum covariance is \(I_4/2\). The diffusion term is essential: the non-Hermitian mean-amplitude equation alone is not a completely positive quantum evolution.

This completion is exact under the typed identification

\[
 A=\langle a\rangle,
 \qquad B=\langle b\rangle.
\]

It does not prove that

\[
 P_u((ab)c),\quad P_u(a(bc))
\]

are expectation values of these two bosonic annihilation operators. Nor does it derive the associator projection as a two-mode squeezing coefficient. Those are now the two sharply defined bridge questions.

## 5. Corrected fixed points and supplied-figure error

The reduced subsystem is

\[
 \dot\rho=-\kappa\sinh(2\rho)\cos\Phi,
 \qquad
 \dot\Phi=2\omega-2\kappa\cosh(2\rho)\sin\Phi.
\]

On the symmetric branch \(\rho=0\), fixed points obey

\[
 \sin\Phi=\omega/\kappa,
 \qquad |\omega|\le|\kappa|.
\]

On the complementary branch \(\cos\Phi=0\), the sign condition was omitted in the manuscript and script:

\[
\begin{array}{c|c}
\Phi=\pi/2&\cosh(2\rho)=\omega/\kappa\ge1,\\
\Phi=3\pi/2&\cosh(2\rho)=-\omega/\kappa\ge1.
\end{array}
\]

For fixed nonzero \(\omega/\kappa\), only one row is possible. When \(|\omega/\kappa|>1\), it supplies the two points \(\rho=\pm\frac12\operatorname{arcosh}|\omega/\kappa|\), not four. The supplied plotting script unconditionally plots both phases and therefore marks two non-solutions per panel.

At these points \(\dot R/R=-\gamma\). They decay only for \(\gamma>0\); at the allowed endpoint \(\gamma=0\) their amplitude is constant. Thus “always decaying” should read “non-growing, and decaying for strict loss.”

## 6. Instantaneous classes are not dynamical basins

The paper's locking inequality

\[
 |\omega|\le|\kappa|\cosh(2\rho)
\]

tests whether \(\dot\Phi=0\) has a solution when \(\rho\) is frozen. Away from \(\rho=0\) or \(\cos\Phi=0\), however, \(\rho\) itself evolves. Likewise,

\[
 \kappa\cosh(2\rho)\cos\Phi>\gamma
\]

is the instantaneous condition \(\dot R>0\), not proof of asymptotic persistence.

The four named sets are therefore a valid pointwise partition after the invariant correction, but not four invariant basins. Trajectories can cross their boundaries.

The exact global first-moment exponents are

\[
 \lambda_\pm=-\gamma\pm\sqrt{\kappa^2-\omega^2}.
\]

The linear mean dynamics is asymptotically stable precisely when

\[
 \kappa^2<\gamma^2+\omega^2
\]

with strict \(\gamma>0\), and reaches parametric threshold at equality. This is the correct global persistence/instability boundary for the CP completion.

## 7. Relation to the Spin(2,3), graph, and A4 corpus

### What is newly supplied

- an action-derived Hamiltonian origin for \(\omega\) and the conjugate pairing form;
- a completely positive Markov loss model producing \(-\gamma\) exactly;
- an exact three-coordinate positive \(H_2(\mathbb R)\) response cone;
- an exact \(SO(2,1)\) conformal action on that cone;
- a concrete bosonic platform in which the corrected reduced flow is physically meaningful.

### What is not supplied

- a derivation from the programme's declared \(S_{v1}\) action;
- a map from octonionic bracket completions to bosonic mode operators;
- a dynamical derivation of the selected octonionic axis \(u\) or the sign of \(\kappa_u\);
- the addressed anisotropies needed for full \(\mathfrak{sp}(4,\mathbb R)\);
- a Lorentzian spacetime Hilbert space, BRST cohomology, or repair of the A4 chiral fold;
- a physical particle criterion: first moments do not specify the covariance, purity, occupation number, or one-particle sector of a quantum state.

The \(H_2(\mathbb R)\) cone here is consequently an emergent response geometry. It is exactly the kind of lower-dimensional positive cone already admitted by the graph and Clifford-response lanes. Calling it spacetime would repeat the type error those audits were designed to prevent.

## 8. Promotion verdict

The Zenodo source should not be promoted as written because its named invariant and symmetry contradict its displayed ODE, and its figure overcounts complementary centers.

The minimally corrected result **is** worth promoting:

\[
\boxed{
\begin{array}{l}
\text{correct }AB\text{ invariant and opposite-phase }U(1),\\
\text{exact three-coordinate }SO(2,1)\text{ response closure},\\
\text{exact quadratic Hamiltonian plus CP-Lindblad realization}.
\end{array}}
\]

Its authority ceiling is a two-mode open bosonic transport model. It does not advance A4, does not select the physical octonionic embedding, and does not generate full \(Spin(2,3)\).

The strongest next action-derived continuation is now finite and testable: construct a typed interaction map from the octonionic branch pair into two canonical bosonic modes such that the bulk action produces

\[
 i\kappa_u(a^\dagger b^\dagger-ab)
\]

with the associator-defined sign, while the same environment derivation produces the positive jumps \(\sqrt{2\gamma}a,\sqrt{2\gamma}b\). Without that map, the Lindblad model is a rigorous realization of the ODE, not a derivation of octonionic physics.

