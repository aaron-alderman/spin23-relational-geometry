# The two Zenodo preprints strengthen response controls but do not change the terminal gate partition

**Date:** 20 October 2026  
**Status:** integrated source audit; corrected conditional response results and an exact open-system kill test; no terminal-gate reclassification and no fundamental \(Spin(2,3)\) evidence  
**Sources:** [Zenodo 10.5281/zenodo.19643326](https://doi.org/10.5281/zenodo.19643326) and [Zenodo 10.5281/zenodo.19874093](https://doi.org/10.5281/zenodo.19874093)  
**Baseline:** [terminal register 1453](1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md)  
**Detailed audits:** [exact Liouvillian kill test 1454](1454_the_zenodo_chern_quadrature_reproduces_but_is_not_the_exact_sigma_z_lindblad_hall_response.md) and [corrected two-branch completion 1455](1455_the_corrected_octonionic_two_branch_flow_has_an_exact_cp_lindblad_completion_and_a_three_coordinate_lorentz_cone_but_not_full_spin23.md)  
**Evidence:** [machine-readable integration](../../../evidence/data/spin23-zenodo-preprint-terminal-gate-integration.json) and [executable verifier](../../../verification/verify/verify_spin23_zenodo_preprint_terminal_gate_integration.mjs)

## Result

The two preprints add useful work, but at a different level from the programme's unsolved gates.

The octonionic two-branch paper contains a repairable definition error. Its equations are equivariant under opposite phase rotations,

\[
A\mapsto e^{i\alpha}A,
\qquad
B\mapsto e^{-i\alpha}B,
\]

and use the invariant \(AB\), whose phase is \(\theta_A+\theta_B\). The paper instead names \(A\bar B\) and a common-phase \(U(1)\). Correcting those two labels preserves the displayed \((\rho,\Phi)\) equations. The corrected flow then has an exact three-coordinate \(SO(2,1)\) response cone and an exact two-mode squeezing Hamiltonian with completely positive Lindblad loss. That is a real positive result. It is a conditional open-bosonic model, not a derivation of its octonionic operator map and not full \(Sp(4,\mathbb R)\cong Spin_0(2,3)\).

The dissipative Chern paper has the opposite outcome. Its released Berry-curvature quadrature and doubled cusp reproduce, but the quadrature is not the exact steady-state response of the stated unital \(L=\sigma_z\) Lindbladian. At every \(\gamma>0\), generic momentum sectors relax to \(I/2\), so the exact linear-response forcing vanishes. At the registered kill point the phenomenological result is \(0.9720664\), while the exact stationary Hall response is zero. The curve survives only as a phenomenological broadening model or as the response of a different, fully specified bath and preparation.

These are **source-rich continuations**: one corrected realization and one reusable no-go/control. Neither is evidence that fundamental spacetime symmetry is \(Spin(2,3)\), neither supplies a protected \(\mathbb Z_3\) sector, and neither satisfies a reopen condition in document 1453.

## 1. What is retained from the octonionic two-branch source

The written system is

\[
\dot A=(i\omega-\gamma)A+\kappa\bar B,
\qquad
\dot B=(i\omega-\gamma)B+\kappa\bar A.
\]

With \(A=r_1e^{i\theta_1}\) and \(B=r_2e^{i\theta_2}\),

\[
A\bar B=r_1r_2e^{i(\theta_1-\theta_2)},
\qquad
AB=r_1r_2e^{i(\theta_1+\theta_2)}.
\]

Therefore the phase-sum variable in the paper is \(\Phi=\arg(AB)\), not \(\arg(A\bar B)\). Under the opposite-phase action, \(AB\) is invariant and the equations are covariant. Under a common-phase action, the conjugate coupling has the wrong weight.

This is a correction, not a reason to discard the reduced portrait. Direct differentiation gives

\[
{\dot R\over R}=-\gamma+\kappa\cos\Phi,
\qquad
\dot\Phi=2\omega-2\kappa\sin\Phi
\]

on the equal-amplitude slice. The full corrected three-bilinear system closes on

\[
S_0={|A|^2+|B|^2\over2},
\quad
S_1=\operatorname{Re}(AB),
\quad
S_2=\operatorname{Im}(AB),
\]

and preserves the positive response cone

\[
S_0^2-S_1^2-S_2^2
={\bigl(|A|^2-|B|^2\bigr)^2\over4}\ge0
\]

up to the loss scale \(e^{-4\gamma t}\). The exact bosonic completion in document 1455 shows that this response model is not merely formal.

Its ceiling is nevertheless sharp:

- its Hamiltonian Lie closure is three-dimensional \(\mathfrak{sp}(2,\mathbb R)\cong\mathfrak{so}(2,1)\), not ten-dimensional \(\mathfrak{sp}(4,\mathbb R)\);
- the octonionic projections have not been derived as canonical bosonic operators;
- the preferred complex axis \(u\) and coupling sign are chosen rather than selected dynamically;
- the result supplies no chiral boundary domain or physical-state completion for the programme action.

It therefore strengthens A9's library of conditional response systems and the independent graph lane's lower-dimensional cone examples. It does not reclassify A4, A5, A9, or the graph lane.

## 2. What is retained from the dissipative Chern source

For the QWZ Hamiltonian \(H=\mathbf d\cdot\boldsymbol\sigma\) and the written master equation

\[
\dot\rho=-i[H,\rho]+\gamma(\sigma_z\rho\sigma_z-\rho),
\]

the exact traceless Bloch generator has determinant

\[
\det A=-8\gamma\bigl(\sin^2 k_x+\sin^2 k_y\bigr).
\]

Thus, away from four measure-zero commuting momenta, the only stationary Bloch vector at \(\gamma>0\) is zero. A Hamiltonian probe about \(\rho_{\rm ss}=I/2\) has source

\[
i[v_y,I/2]=0,
\]

so the exact stationary Liouvillian response is zero at every frequency. A scalar retarded width does not encode the stationary distribution, lesser/noise component, or vertex corrections of this jump operator.

The following pieces remain useful:

- the published code evaluates a definite phenomenological Berry-curvature quadrature;
- its doubled cusp is a reproducible shape template;
- the exact calculation is a compact kill test for any claim that a retarded linewidth alone defines an open-system transport observable;
- the noncommuting \(\gamma\to0\) and \(t\to\infty\) limits must be stated in future A9/A11 work.

This strengthens method and controls. It does not provide the microscopic programme Hamiltonian, a matched physical port, a device prediction, protected sectors, or data.

## 3. Terminal-gate map

| Gate | 1453 class | After 1454--1455 | What the sources add | Why the class does not change |
|---|---|---|---|---|
| A2 | conditionally constructed | unchanged | nothing typed to the defect | no neutral-wall origin, compact domain, or orientation history |
| A4 | externally open | unchanged | an exact CP-Lindblad completion of a separate two-mode model | no chiral fold domain, full BRST cohomology, or programme pole audit |
| A5 | internally exhausted | unchanged | an explicitly chosen complex axis \(u\) | no physical phase reference or exchange-odd carrier lock |
| A6 | externally open | unchanged | nothing typed to family chirality | no anomaly-free three-generation family operator |
| A7 | internally exhausted | unchanged | model observables | no curved renormalized stress or calibrated programme ports |
| A9 | conditionally constructed | unchanged | corrected open-bosonic realization and exact bath-response kill test | no matched microscopic spectrum, residues, linewidths, or port map |
| A11 | externally open | unchanged | conventional null/control model | no device-specific effect, protected \(\mathbb Z_3\), execution, or data |

The independent graph lane also remains internally exhausted at conditional response symmetry. The corrected two-mode source reaches only an \(SO(2,1)\) subclosure and supplies none of the addressed anisotropies needed for full \(Sp(4,\mathbb R)\).

## 4. Status theorem

Let a new source change a terminal classification only if it does at least one of the following:

1. supplies the gate's named first external datum;
2. satisfies a declared reopen condition;
3. invalidates the surviving theorem or scoped no-go.

The two audited sources do none of these for A2, A4, A5, A6, A7, A9, or A11. Consequently the 1453 partition remains

\[
\boxed{
\begin{aligned}
\text{internally exhausted}:&\quad A5,A7,\\
\text{conditionally constructed}:&\quad A2,A9,\\
\text{externally open}:&\quad A4,A6,A11.
\end{aligned}}
\]

No whole gate is failed and physical admission remains false.

This theorem is epistemic and programme-relative. It says the new documents do not cross the already declared evidence boundaries. It does not say that the physical ideas are impossible, nor that conventional open-system or octonionic models are unworthy of further study.

## 5. Correct next uses

The high-value continuations are now more precise:

1. derive, rather than name, a map from the octonionic branch pair to two canonical bosonic modes and obtain the squeezing sign from the same action;
2. for every dissipative response, solve the stationary state and exact response superoperator before importing a scalar linewidth;
3. use the QWZ cusp as a conventional null/shape control, not as a programme prediction;
4. return to the seven named external data in 1453 for any attempted gate change.

The forbidden promotions are equally explicit: the repaired two-mode \(SO(2,1)\) closure is not full \(Spin(2,3)\); the scalar-broadened QWZ curve is not the response of its written Lindbladian; and neither preprint is fundamental \(Spin(2,3)\) evidence.

## 6. Paper-worthiness

The two audits have different publication postures.

Document 1454 is best treated as an exact correction/no-go note or as a prerequisite to a revised dissipative-Chern paper. Its publishable core is the clean separation between the reproducible phenomenological quadrature and the zero exact stationary response of the declared Lindbladian, including the noncommuting limits. It should not be presented as a new \(Spin(2,3)\) result.

Document 1455 is the stronger independent paper candidate. The corrected invariant and symmetry, exact three-bilinear closure, conformally symplectic lift, CP-Lindblad completion, fixed-point correction, and sharp \(SO(2,1)\)-versus-\(Sp(4,\mathbb R)\) boundary make a substantive corrected extension. Publication would require presenting the original source error plainly and keeping the octonionic operator identification as an open bridge rather than a derived fact.

A joint paper claiming fundamental \(Spin(2,3)\) would not be warranted. A methods paper on disciplined promotion of algebraic response models could cite both, but its claim would be methodological rather than ontological.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_zenodo_preprint_terminal_gate_integration.mjs
~~~
