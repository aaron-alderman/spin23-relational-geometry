# Rapid seen/suppressed neural alternation defines a testable \(Spin(2,4)\to Spin(2,3)\) response slice, not an Orch OR derivation

**Date:** 20 October 2026  
**Status:** exact response-space construction; empirical phase selection and microtubule mechanism open

## Claim

The reported rapid alternation of conscious and suppressed stimulus representations can be placed in the corpus as a two-channel response problem. The unrestricted complex cross-spectrum belongs to the positive Hermitian cone \(H_2(\mathbb C)^+\), whose conformal carrier is \(SU(2,2)\simeq Spin_0(2,4)\). If experiment finds a stable zero-or-\(\pi\) relative phase, the response lies on the real slice \(H_2(\mathbb R)^+\), whose conformal completion is \(Sp(4,\mathbb R)\simeq Spin_0(2,3)\).

That is a conditional, falsifiable bridge. The approximately 15 Hz population alternation does not by itself establish microtubule coherence, objective reduction, or a fundamental \(Spin(2,3)\) dynamics.

## Evidence layers

1. **Neural-population result.** Hesse *et al.* report in an unreviewed 2026 preprint that inferotemporal and prefrontal population representations of seen and suppressed images alternate at about fifteen cycles per second. The experiment measures neural population activity, not microtubule fields or gravitational collapse.
2. **Microtubule interface.** Kalra *et al.* measured electronic energy migration in microtubules and anesthetic-sensitive changes in that optical observable. Khan *et al.* found that microtubule stabilization delayed isoflurane-induced loss of righting reflex in eight rats. These results motivate microtubules as an anesthetic-sensitive candidate interface; neither establishes quantum consciousness.
3. **Orch OR interpretation.** Hameroff's post and related reviews propose that faster microtubule oscillations interfere to produce slower conscious moments and that objective reduction terminates them. This remains a theory-level interpretation requiring a simultaneous multiscale experiment.

## Exact response carrier

Let \(z=(z_s,z_u)^T\) denote decoded seen and suppressed stimulus channels. Their cross-spectrum is

\[
S(\omega)=\begin{pmatrix}
P_s & C e^{i\phi}\\
C e^{-i\phi} & P_u
\end{pmatrix}\succeq0,
\qquad \det S=P_sP_u-C^2\ge0.
\]

Writing

\[
S=\begin{pmatrix}t+z&x-iy\\x+iy&t-z\end{pmatrix}
\]

gives \(\det S=t^2-x^2-y^2-z^2\). This is the ordinary Lorentz determinant on \(H_2(\mathbb C)\), with conformal group \(SU(2,2)\simeq Spin_0(2,4)\). A measured selector \(\phi\in\{0,\pi\}\) forces \(y=0\), leaving

\[
S_{\mathbb R}=\begin{pmatrix}t+z&x\\x&t-z\end{pmatrix}\in H_2(\mathbb R)^+,
\qquad \det S_{\mathbb R}=t^2-x^2-z^2,
\]

whose conformal completion is \(Sp(4,\mathbb R)\simeq Spin_0(2,3)\). Pure seen or suppressed states are rank-one boundary rays; unresolved mixtures occupy the cone interior.

The reduction is therefore empirical, not verbal: estimate the full complex cross-spectrum and ask whether the imaginary cross component vanishes reproducibly across stimuli, subjects and sessions.

## Dynamical gate

For quadratures \(\xi=(q_s,q_u,p_s,p_u)^T\), a linear Hamiltonian generator must satisfy

\[
K^T J+JK=0,
\qquad
J=\begin{pmatrix}0&I_2\\-I_2&0\end{pmatrix}.
\]

A compact rotation can produce 15 Hz alternation while satisfying this identity. That demonstrates only that the observed rhythm is compatible with a subgroup of \(Sp(4,\mathbb R)\); it does not identify the full group. Real neural covariance more generally obeys an open-system equation \(\dot V=KV+VK^T+D\), so damping and noise must be measured rather than hidden inside a symmetry claim.

## Where microtubules could enter

The sharpest compatible hypothesis is that an anesthetic-sensitive microtubule observable supplies a phase reference selecting the real cross-spectral slice. RIO-038-W1's movable \(\mathbb Z_2\) seam holonomy is a possible address or parity variable for such a reference, but currently remains a bounded geometric construction.

The decisive prediction is not merely that anesthesia changes both signals. It is that graded anesthesia, or a selective microtubule perturbation, disrupts seen/suppressed phase locking and increases the imaginary cross component before or alongside loss of reportability, with matched ion-channel, arousal and network controls.

## Firewalls

- Neural holographic coding is not AdS/CFT merely because \(Spin(2,3)\) is the isometry group of \(AdS_4\).
- The Penrose relation \(\tau\sim\hbar/E_G\) is an additional nonunitary physical law; it is not derived by the response cone or symplectic condition.
- Frequency nesting across hertz, kilohertz, megahertz and gigahertz does not establish coherent interference without cross-frequency phase measurements and perturbational controls.
- An anesthetic-sensitive microtubule effect is evidence for a target or pathway, not automatically for a quantum mechanism or consciousness theory.

## Preregistered experiment

Record simultaneously: (i) decoded seen and suppressed representations in visual and frontal cortex, (ii) a validated microtubule optical or electromagnetic observable, and (iii) behavioural reportability. Compare awake, sedated, anesthetized and recovered states, plus microtubule-directed and non-microtubule controls. Fit the full complex \(S(\omega)\), estimate \(K\), report the symplectic residual \(\lVert K^TJ+JK\rVert\), and compare real-slice, unrestricted-complex and dissipative models on held-out trials.

Promotion requires replicated phase-specific coupling and selective perturbational mediation. Failure of the real-slice test retires this \(Spin(2,3)\) bridge while leaving the neural alternation result intact.

## Sources

- Hesse *et al.*, [Rapid alternation of conscious and suppressed stimulus representations in the primate brain](https://www.biorxiv.org/content/10.64898/2026.10.15.759299v1) (preprint, 2026).
- Hameroff, [commentary connecting the result to Orch OR](https://x.com/StuartHameroff/status/2111486176452649249) (2026).
- Hameroff and Penrose, [Consciousness in the universe: a review of the 'Orch OR' theory](https://pubmed.ncbi.nlm.nih.gov/35782391/) (2022 review/perspective record).
- Kalra *et al.*, [Electronic Energy Migration in Microtubules](https://doi.org/10.1021/acscentsci.2c01114) (2023).
- Khan *et al.*, [Epothilone B delays anesthetic-induced unconsciousness in rats](https://pubmed.ncbi.nlm.nih.gov/39147581/) (2024).
- Wiest, [Quantum aspects of life](https://doi.org/10.1093/nc/niaf011) (2025 theory/review).

The finite matrix checks are reproduced by [`verify_neural_alternation_spin23_response_slice.mjs`](../../../verification/verify/verify_neural_alternation_spin23_response_slice.mjs).
