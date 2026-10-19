# A Minimal Metaplectic Loop Interferometer

**Date:** 17 October 2026  
**Branches:** B07 and B09  
**Claim status:** exact quantum-mechanical observable for specified symplectic paths; no physical braid implementation selected

## 1. The missing observable

The braid and Hopf branches repeatedly produced signs that disappear from Jordan density matrices. A sign becomes measurable only by comparing two coherent paths.

The minimal construction uses two paths in \(Sp(4,\mathbb R)\) with the same classical endpoint.

## 2. Two loops

Let \(\gamma_0\) be the constant loop at \(I_4\).

Let \(\gamma_1\) rotate one canonical plane through \(2\pi\):

\[
\begin{aligned}
q_1&\mapsto\cos\theta\,q_1+\sin\theta\,p_1,\\
p_1&\mapsto-\sin\theta\,q_1+\cos\theta\,p_1,
\end{aligned}
\qquad
0\le\theta\le2\pi.
\]

Both end at

\[
I_4.
\]

They therefore have identical classical action on the phase-space endpoint and on every Jordan relation there.

## 3. Metaplectic lifts

For one oscillator mode,

\[
U(\theta)
=
\exp[-i\theta(N+\tfrac12)].
\]

At \(2\pi\),

\[
U(2\pi)
=
-I.
\]

Thus the lifts obey

\[
\widetilde\gamma_0(1)=+I,
\qquad
\widetilde\gamma_1(1)=-I.
\]

The sign is scalar on the entire internal state space because these are two lifts of the identity endpoint, not lifts of \(-I_4\), whose action is parity.

## 4. Interference protocol

Introduce a coherent path label and prepare

\[
\frac{|0\rangle+|1\rangle}{\sqrt2}
\otimes|\psi\rangle.
\]

Transport branch \(0\) along \(\gamma_0\) and branch \(1\) along \(\gamma_1\). The final state is

\[
\frac{|0\rangle-|1\rangle}{\sqrt2}
\otimes|\psi\rangle.
\]

Recombining in the basis

\[
|\pm\rangle
=
\frac{|0\rangle\pm|1\rangle}{\sqrt2}
\]

switches the output deterministically:

\[
P_+=0,
\qquad
P_-=1.
\]

This is a genuine phase-sensitive observable even though the classical Jordan endpoint is unchanged.

## 5. Relation to the braid center

The existing braid representation gives

\[
z\mapsto-I_4,
\qquad
z^2\mapsto I_4.
\]

The squared center is therefore the appropriate closed classical operation for a scalar metaplectic sign.

But its endpoint does not determine the homotopy class of the physical path. To identify \(z^2\) with \(\gamma_1\), one must specify:

1. how the braid motion varies continuously in \(Sp(4,\mathbb R)\);
2. its Maslov/winding class;
3. a coherent state space on which the two histories can interfere;
4. a recombination operation.

Without these, the braid representation alone predicts no interferometer output.

## 6. Relation to the Hopf sign

The helicity Berry loop also gives a \(-1\) state holonomy. The two signs can be compared experimentally only if a canonical map identifies:

- the momentum-space helicity loop;
- the one-plane symplectic loop;
- their coherent path labels and dynamical phases.

Matching \(-1\) algebraically is insufficient. Matching interferometric phase after subtracting dynamical contributions would be meaningful.

## 7. Stop-everything criteria

**Advance:** a physical braid or transport protocol selects the odd-winding loop and predicts the output-port switch independently of adjustable dynamical phases.

**Pin:** the endpoint representation is known but its path class is not physically fixed.

**Falsify the bridge:** every admissible realization of the squared braid center has even Maslov parity, or decoherence prevents coherent comparison.

## 8. Certificate

The [metaplectic interferometer certificate](scripts/verify-metaplectic-loop-interferometer.mjs) verifies the symplectic loop, identical endpoints, opposite metaplectic lifts and deterministic interference probabilities.

## Companion documents

- [Metaplectic lift and Maslov correction](59_metaplectic_and_maslov_correction_branch.md)
- [Common central sign versus relative face reflection](125_common_central_sign_vs_relative_face_reflection.md)
- [Hopf phase descent and carrier correction](123_hopf_phase_descent_and_carrier_correction.md)
- [Three-strand braid central twist](57_braid_central_twist_to_sp4z_branch.md)
