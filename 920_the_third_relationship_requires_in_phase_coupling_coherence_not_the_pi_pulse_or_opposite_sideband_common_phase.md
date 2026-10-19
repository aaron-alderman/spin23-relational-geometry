# The Third Relationship Requires In-Phase Coupling Coherence, Not the π Pulse or Opposite Sideband Common Phase

**Date:** 17 October 2026  
**Branches:** phase ledger, Jordan polarization, sideband monodromy, coherent Feshbach addition, and real-response typing  
**Claim status:** exact phase classification; autonomous common-node phase control remains open  
**Certificate:** [separate_coupling_coherence_from_pulse_and_sideband_phases_in_the_three_relationship_construction.mjs](scripts/separate_coupling_coherence_from_pulse_and_sideband_phases_in_the_three_relationship_construction.mjs)

## Executive result

Three different phases occur in the current construction and must remain distinct:

1. the relative **coupling coherence** $\theta_c$ used when adding $g_+$ and $g_-$ inside one Feshbach self-energy;
2. the relative eigenchannel phase $\pi$ inside each rational-inner face, which produces a Householder reflection;
3. the opposite common sideband phases $-i$ and $+i$, which cancel in the sequential boundary cascade.

Only the first controls generation of the third root projector.

For

\[
h(\theta_c)=g_++e^{i\theta_c}g_-,
\]

the Hermitian self-energy is

\[
h(\theta_c)h(\theta_c)^\dagger
=
\begin{pmatrix}
2+2\cos\theta_c&2i\sqrt3\sin\theta_c\\
-2i\sqrt3\sin\theta_c&6-6\cos\theta_c
\end{pmatrix},
\]

up to the sign convention for the off-diagonal entry.

Real-response compatibility restricts the distinguished phases to $0$ or $\pi$. At

\[
\theta_c=0,
\]

one gets the equal-norm horizontal third root projector. At

\[
\theta_c=\pi,
\]

one gets a vertical projector of norm squared twelve, not the $A_2$ tight-frame member.

Therefore the third relationship needs an in-phase common-node coupling sum. It is not automatically supplied by the $\pi$ reflection pulse or by the opposite sideband common phases.

## 1. General coherent sum

With

\[
g_+=(1,\sqrt3),
\qquad
g_-=(1,-\sqrt3),
\]

the phased sum is

\[
h(\theta)
=\bigl(1+e^{i\theta},\sqrt3(1-e^{i\theta})\bigr).
\]

Its two intensities are

\[
|h_1|^2=2+2\cos\theta,
\]

\[
|h_2|^2=6-6\cos\theta.
\]

The off-diagonal entry is purely imaginary and proportional to $\sin\theta$. Generic phase therefore leaves the real two-dimensional response category and enters a complex Hermitian one.

## 2. The two real phases

### In phase

For $\theta=0$,

\[
h(0)=(2,0),
\qquad
h(0)h(0)^T=\begin{pmatrix}4&0\\0&0\end{pmatrix}.
\]

This is the missing equal-norm third $A_2$ projector.

### Opposite phase

For $\theta=\pi$,

\[
h(\pi)=(0,2\sqrt3),
\qquad
h(\pi)h(\pi)^T=\begin{pmatrix}0&0\\0&12\end{pmatrix}.
\]

It is real and rank one but has the wrong direction and norm for the tight frame.

Thus a generic statement that “a protected relative $\pi$ phase generates the third relationship” would be false. The relevant phase is zero.

## 3. Why this does not contradict the Coxeter cycle

The reflection phase in document 904 is a phase **between the normal and tangent eigenchannels within one face**. It makes the transfer matrix proportional to a Householder reflection.

The sideband common phases are overall factors multiplying the two face matrices. They cancel when the matrices are multiplied sequentially across the real interface.

Neither is automatically the relative source phase $\theta_c$ between two coupling vectors added before a common internal block is eliminated.

The construction can therefore use:

- $\pi$ eigenchannel phase differences to execute the two reflections;
- conjugate common phases to cancel in the sequential monodromy;
- a separate in-phase source preparation to reconstruct the third Feshbach projector.

## 4. Operational versus autonomous recursion

Jordan polarization requires access to

\[
\Sigma(g_+),
\qquad
\Sigma(g_-),
\qquad
\Sigma(g_++g_-).
\]

These may be three separately controlled response evaluations. In that operational reading, no single pulse must execute the Coxeter cascade and synthesize the third projector simultaneously.

An autonomous device-level claim is stronger. It must contain a boundary mixer or phase reference which brings the two transported face amplitudes to $\theta_c=0$ at their common Feshbach node.

Without such a mechanism, the algebraic recursion remains valid but the third projector is tomographically reconstructed rather than dynamically populated.

## 5. Consequence for protection

There are now two credible forms of tight-frame protection:

1. **Ward/class-sum protection:** the effective action is invariant under the complete $C_3$ orbit, so all three projector weights are equal without a literal coherent summing device;
2. **coherent-node protection:** one common internal block receives $g_+$, $g_-$ and their in-phase superposition with equal residue.

The first is structurally cleaner. The second is more constructive but carries an additional phase-control gate.

## 6. Stop-everything and falsification criteria

**Phase-reference trigger:** derive a real boundary mixer that converts the transported sideband outputs to an in-phase common-node coupling.

**Tomography trigger:** identify independently controllable source strengths whose mixed Hessian reconstructs the third projector operationally.

**Ward trigger:** show full $C_3$ invariance of the effective quadratic action, making explicit phase preparation unnecessary for protection.

**Phase-conflation falsifier:** identify the eigenchannel $\pi$ pulse, sideband common phase and coupling coherence $\theta_c$ as one variable.

**Autonomy warning:** an operational polarization protocol is described as an autonomous single-cycle dynamical process.

## 7. Verdict

| Phase datum | Required value/role |
|---|---|
| Eigenchannel phase difference inside each face | $\pi$, producing reflection |
| Positive/negative sideband common phase | conjugate $\mp i$, cancelling in product |
| Coupling coherence for the third projector | $0$, producing $g_++g_-$ |

The mathematical third-root recursion is exact. Its autonomous physical realization still requires a distinct in-phase coupling mechanism.

## 8. Position in the corpus

- [coherent Feshbach generation of the third projector](919_the_third_a2_relationship_is_the_coherent_two_face_feshbach_self_energy_and_its_cross_term_is_the_jordan_polarization.md)
- [rational-inner sideband Coxeter cycle](904_a_sideband_reversing_rational_inner_boundary_cycle_realizes_the_exact_a2_coxeter_element_with_positive_pole_scales.md)
- [local real interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [Jordan polarization theorem](668_the_jordan_triple_is_the_polarization_of_feshbach_relational_self_energy.md)
