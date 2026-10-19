# A Positive Projected Oscillator Generates the Controlled-Fourier TKK Intertwiner as a Passive Quarter-Period Boundary Flow

**Date:** 18 October 2026  
**Branches:** controlled Fourier transform, quadratic boundary action, projected oscillator, passivity, reciprocity, split TKK intertwiner  
**Claim status:** exact effective Hamiltonian realization; microscopic Furey/Higgs origin remains open  
**Certificate:** [derive_the_controlled_fourier_tkk_intertwiner_from_a_passive_projected_oscillator_action.mjs](../../../verification/derive/derive_the_controlled_fourier_tkk_intertwiner_from_a_passive_projected_oscillator_action.mjs)

## Executive result

The controlled Fourier transform of document 1039 is dynamically realizable by the smallest possible conservative quadratic system.

Let

\[
e_-=(I-D)/2
\]

be the negative grading projector. On canonical channel coordinates (q,p\in\mathbb R^2), take

\[
\boxed{
H_-(q,p)=\frac{\omega_0}{2}
\left(q^Te_-q+p^Te_-p\right).}
\]

The positive channel has zero generator; the negative channel is an ordinary positive harmonic oscillator. Evolution for

\[
T=\frac{\pi}{2\omega_0}
\]

gives exactly

\[
\boxed{
S_-=I_{\rm phase}\otimes e_+
+J_{\rm phase}\otimes e_-.}
\]

Hence the split-TKK canonical intertwiner is a quarter-period flow of a positive projected oscillator.

The flow is symplectic, orthogonal and lossless. It therefore requires neither gain nor an indefinite physical Hamiltonian, despite leading to the split Jordan orbit after conjugation.

The realified Furey antiunitary sends this oscillator generator to the oppositely oriented oscillator on the complementary channel, exactly reproducing the face-exchange law of document 1039.

This closes effective-action existence. It does not explain why a Furey/Higgs boundary activates this oscillator for precisely one quarter period.

## 1. Hamilton equations

Use phase-first ordering

\[
x=(q_1,q_2,p_1,p_2)^T
\]

and symplectic matrix

\[
\Omega=J\otimes I,
\qquad
J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}.
\]

The Hamiltonian Hessian is

\[
K_-=\omega_0 I_{\rm phase}\otimes e_-\succeq0.
\]

Hamilton's equation is

\[
\dot x=\Omega K_-x
=\omega_0(J\otimes e_-)x.
\]

Since $e_+e_-=0$, the positive channel is fixed. On the negative channel,

\[
\dot q_2=\omega_0p_2,
\qquad
\dot p_2=-\omega_0q_2.
\]

## 2. Exact flow

The projector decomposition makes the exponential elementary:

\[
e^{t\omega_0J\otimes e_-}
=I\otimes e_+
+\left(\cos\omega_0t\,I
+\sin\omega_0t\,J\right)\otimes e_-.
\]

At a quarter period,

\[
\omega_0T=\frac\pi2,
\]

so

\[
e^{T\Omega K_-}
=I\otimes e_++J\otimes e_-
=S_-.
\]

Thus

\[
(q_2,p_2)\mapsto(p_2,-q_2)
\]

exactly.

## 3. Passivity and stability

The Hamiltonian is positive semidefinite:

\[
H_-\ge0.
\]

The generator belongs to the symplectic Lie algebra:

\[
A_-^T\Omega+\Omega A_-=0.
\]

It is also antisymmetric in the Euclidean metric:

\[
A_-^T+A_-=0.
\]

Therefore

\[
S_-^TS_-=I,
\qquad
S_-^T\Omega S_-=\Omega.
\]

The flow preserves both canonical flux and total quadratic norm. It is lossless passive dynamics, not an amplifier or unstable saddle.

## 4. Boundary implementation

The same transformation can be produced by an impulsive interface Hamiltonian

\[
H_{\rm int}(t)
=\frac\pi4\delta(t-t_0)
\left(q^Te_-q+p^Te_-p\right).
\]

Integrating Hamilton's equation through the interface produces angle $\pi/2$ on the negative channel and zero angle on the positive channel.

Equivalently, one may use a finite boundary layer of duration $T$ with constant frequency $\omega_0$. The finite layer avoids distributional notation and has the same transfer matrix.

## 5. Antiunitary covariance

The realified graded antiunitary is

\[
\Gamma_{\mathbb R}=K_{\rm phase}\otimes\varepsilon_{\rm channel}.
\]

It satisfies

\[
KJK^{-1}=-J,
\qquad
\varepsilon e_-\varepsilon^{-1}=e_+.
\]

Consequently

\[
\Gamma_{\mathbb R}(J\otimes e_-)
\Gamma_{\mathbb R}^{-1}
=-J\otimes e_+.
\]

The antiunitary maps the projected oscillator to the complementary inverse oscillator. At quarter period,

\[
\Gamma_{\mathbb R}S_-\Gamma_{\mathbb R}^{-1}
=S_+^{-1}.
\]

The pair of boundary layers is therefore exchanged by the established Real symmetry.

## 6. What this closes and what it does not

Closed:

- an explicit local quadratic Hamiltonian generates $S_-$;
- the Hamiltonian is positive semidefinite;
- the flow is symplectic, orthogonal and passive;
- the required quarter-turn has a finite-duration and impulsive realization;
- the antiunitary maps it to the complementary inverse face.

Open:

- why the interaction is projected by $e_-$;
- why its integrated angle is exactly $\pi/2$;
- whether $\omega_0$ is one of the convolution half-scales;
- how the boundary oscillator couples to the Furey aggregate and Standard-Model fields;
- whether KMS/noise terms preserve the exact coherent flow.

## 7. Relation to the earlier local interface

Document 997 imposed

\[
q_{n+1}=\varepsilon q_n,
\qquad
p_{n+1}=\varepsilon p_n.
\]

That rotates channel labels identically in coordinate and momentum space. The present boundary layer instead performs

\[
q_2\mapsto p_2,
\qquad
p_2\mapsto-q_2.
\]

They are distinct local canonical operations. A larger interface cell may contain both:

1. a controlled oscillator quarter-turn (S_-);
2. the channel sewing (\varepsilon);
3. Fourier reality supplying the antiunitary interpretation.

Their ordering and microscopic origin remain to be derived.

## 8. Stop-everything and falsification tests

**Half-scale trigger:** $\omega_0$ is independently fixed to $1/2$ or $\sqrt q/2$ by the odd-frequency internal propagators.

**Furey trigger:** a Higgs/Furey bilinear generates $q^Te_-q+p^Te_-p$ with the correct sign and channel projector.

**Angle trigger:** integral lattice, monodromy or Pfaffian data quantize $\int\omega_0dt=\pi/2$.

**Interface trigger:** composing this boundary layer with the document-997 channel sewing reproduces the placement/dicyclic transport without extra fitted operations.

**Falsifier:** the generator requires a negative-energy oscillator or active gain; the explicit positive Hamiltonian shows it does not.

**Falsifier:** effective Hamiltonian existence is presented as a microscopic Standard-Model derivation.

**Boundary warning:** the quarter-period duration is chosen to reproduce $S_-$ and then called dynamically selected without an independent quantization principle.

## Verdict

| Question | Verdict |
|---|---|
| Does a local quadratic action generate the controlled Fourier transform? | **Yes** |
| Is its Hamiltonian positive? | **Yes** |
| Is the flow passive and symplectic? | **Yes** |
| Does the antiunitary exchange it with the complementary inverse flow? | **Yes** |
| Is the quarter-period angle dynamically selected? | **No** |
| Is the Furey/Higgs coupling derived? | **No** |

## Position in the corpus

- [controlled-Fourier TKK intertwiner](1039_the_split_tkk_intertwiner_is_a_channel_controlled_fourier_quarter_turn_whose_square_is_D_not_the_realified_furey_antiunitary.md)
- [split-tripoten TKK orbit](1038_the_pole_jet_sl2_is_the_tkk_orbit_of_the_split_jordan_involution_D_not_a_primitive_positive_idempotent.md)
- [local conservative interface network](../0900-0999/997_a_local_conservative_real_interface_network_realizes_the_nested_c12_transport_as_antiperiodic_six_cycle_holonomy.md)
- [reciprocal Keldysh noise split](1025_a_reciprocal_keldysh_kernel_places_noise_in_h2r_while_retarded_response_remains_complex_and_fdt_preserves_the_split.md)
