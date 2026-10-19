# Passivity and the Square Root of D Quantize the Projected-Oscillator Action to a Quarter-Turn Modulo Orientation

**Date:** 18 October 2026  
**Branches:** split Jordan grading, passive symplectic roots, controlled Fourier transform, boundary action, angle quantization  
**Claim status:** exact classification inside the passive face-controlled subgroup; no microscopic scale selection  
**Certificate:** [classify_passive_face_controlled_symplectic_square_roots_of_the_split_grading.mjs](../../../verification/classify/classify_passive_face_controlled_symplectic_square_roots_of_the_split_grading.mjs)

## Executive result

Document 1040 chose a quarter period to generate the controlled Fourier intertwiner. The choice is not arbitrary once three already motivated requirements are imposed:

1. the positive Jordan face is fixed;
2. the negative face evolves passively by a canonical rotation;
3. the carrier transformation squares to the split relationship $D$.

Writing the integrated oscillator angle as

\[
\Theta=\int\omega(t)\,dt,
\]

the controlled passive flow is

\[
S(\Theta)=I\otimes e_++R(\Theta)\otimes e_-,
\qquad
R(\Theta)=\cos\Theta\,I+\sin\Theta\,J.
\]

Then

\[
S(\Theta)^2=I\otimes e_++R(2\Theta)\otimes e_-.
\]

Requiring $S(\Theta)^2=I\otimes D=I\otimes(e_+-e_-)$ forces

\[
R(2\Theta)=-I,
\]

and therefore

\[
\boxed{\Theta=\frac\pi2\pmod\pi.}
\]

The two classes are the two orientations $+J$ and $-J$ on the negative face. If the action is accumulated continuously with nonnegative frequency and the least positive representative is chosen, then $\Theta=\pi/2$.

The square-root relation therefore selects a quarter-turn, but it does not separately determine frequency and duration.

## 1. The exact angle theorem

The projectors satisfy

\[
e_+e_-=0,
\qquad
e_++e_-=I.
\]

Consequently cross terms vanish when the controlled flow is squared:

\[
\begin{aligned}
S(\Theta)^2
&=(I\otimes e_++R(\Theta)\otimes e_-)^2\\
&=I\otimes e_++R(\Theta)^2\otimes e_-\\
&=I\otimes e_++R(2\Theta)\otimes e_-.
\end{aligned}
\]

Equality with $I\otimes D$ is equivalent to

\[
\cos(2\Theta)=-1,
\qquad
\sin(2\Theta)=0.
\]

The complete solution is $\Theta=\pi/2+k\pi$.

## 2. Classification within passive canonical dynamics

In one canonical plane,

\[
O(2)\cap Sp(2,\mathbb R)=SO(2).
\]

Every passive symplectic operation is therefore a rotation. A passive operation $M$ satisfying $M^2=-I$ must be

\[
M=+J
\quad\text{or}\quad
M=-J.
\]

Thus there is no continuous angle modulus after the square-root condition is imposed. The remaining discrete choice is orientation.

On the positive face, a passive symplectic square root of $+I$ is $+I$ or $-I$. Requiring the connected boundary flow to leave that face inert selects $+I$. The resulting full maps are precisely $S_-$ and its inverse.

## 3. Why passivity is essential

The equation $M^2=-I$ alone does not uniquely select the Fourier matrix. For any $g\in Sp(2,\mathbb R)$,

\[
M_g=gJg^{-1}
\]

also satisfies $M_g^2=-I$. Taking

\[
g=\operatorname{diag}(\lambda,\lambda^{-1})
\]

gives a continuous squeezed family

\[
M_\lambda=
\begin{pmatrix}
0&\lambda^2\\
-\lambda^{-2}&0
\end{pmatrix}.
\]

For $\lambda\ne1$ it is symplectic but not orthogonal. It corresponds to anisotropic squeezing rather than a passive oscillator turn.

Therefore the correct theorem is not “$S^2=D$ uniquely implies $S=S_-$.” It is:

> Within the face-controlled passive symplectic subgroup connected to the identity on the positive face, $S^2=D$ forces a quarter-turn on the negative face, up to orientation.

## 4. What is and is not selected

Selected algebraically:

- the integrated action $\Theta$ modulo $\pi$;
- the quarter-period character of the boundary flow;
- the absence of a continuous passive angle modulus;
- two orientation branches, exchanged by inversion.

Not selected:

- the absolute oscillator frequency $\omega_0$;
- the boundary-layer duration $T$;
- which orientation is physically realized;
- why the negative rather than positive Jordan face is active;
- a microscopic Furey/Higgs coupling.

Only the product $\omega_0T=\Theta$ is fixed. Matching $\omega_0$ to one of the odd-frequency convolution half-scales would then predict a duration, but that is a separate bridge.

## 5. Research consequences

The action-selection problem has split into three cleaner questions:

1. **Projector selection:** what source coupling produces $e_-$?
2. **Orientation selection:** what CP, Pfaffian or retarded/advanced datum chooses $+J$ rather than $-J$?
3. **Scale allocation:** what fixes $\omega_0$ and therefore $T=\pi/(2\omega_0)$?

The integrated quarter-turn no longer needs a separate phase-locking potential if the square-root-of-$D$ relation is a defining boundary condition. Conversely, if that relation is only an observed consequence, the microscopic theory must still explain why it is imposed.

## 6. Stop-everything and falsification tests

**Square-root trigger:** an independent derivation shows that the physical carrier boundary map must square exactly to the Furey grading $D$. Then the passive action angle is already quantized.

**Half-scale trigger:** the oscillator frequency equals $1/2$ or $\sqrt q/2$, turning angle quantization into a definite boundary transit time.

**Orientation trigger:** the retarded/advanced grading or Furey antiunitary fixes one of the two signs without an extra convention.

**Falsifier:** the physical boundary map is symplectic but measurably squeezed. Then $S^2=D$ permits the continuous $gJg^{-1}$ family and the passive uniqueness theorem does not apply.

**Falsifier:** the positive face also acquires a nontrivial $-I$ factor. Then the assumed connected inert-face branch has been left.

**Boundary warning:** do not infer a Planck time, mass or Standard-Model scale from the dimensionless angle alone.

## Verdict

| Question | Verdict |
|---|---|
| Does $S^2=D$ quantize a passive face-controlled angle? | **Yes, to $\pi/2$ modulo $\pi$** |
| Is the Fourier quarter-turn unique up to orientation in that subgroup? | **Yes** |
| Is it unique among all symplectic square roots? | **No** |
| Does the theorem fix frequency or duration separately? | **No** |
| Does it derive the Furey/Higgs projector? | **No** |

## Position in the corpus

- [projected-oscillator boundary action](1040_a_positive_projected_oscillator_generates_the_controlled_fourier_tkk_intertwiner_as_a_passive_quarter_period_boundary_flow.md)
- [controlled-Fourier TKK intertwiner](1039_the_split_tkk_intertwiner_is_a_channel_controlled_fourier_quarter_turn_whose_square_is_D_not_the_realified_furey_antiunitary.md)
- [split-tripoten TKK orbit](1038_the_pole_jet_sl2_is_the_tkk_orbit_of_the_split_jordan_involution_D_not_a_primitive_positive_idempotent.md)
