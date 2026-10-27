# Four cells calibrate, but a finite projector ladder pays for the quarter-turn

**Date:** 28 October 2026

**Status:** exact finite-projector calculation and convergence witness; physical adiabatic LC implementation remains open

**Parents:** [transformer synthesis and its control-work port](admissibility_157_transformer_synthesis_closes_the_trifilar_matrix_but_opens_a_control_work_port.md), [universal projector connection](admissibility_22_universal_projector_connection_as_quarter_turn_crossbar.md), [passive loss and the holonomy gap](admissibility_153_passive_loss_requires_a_bath_ledger_and_can_destroy_the_holonomy_gap.md)

**Evidence:** [finite-projector-ladder ledger](../../../evidence/data/admissibility-trifilar-finite-projector-ladder-v1.json); [independent verifier](../../../verification/admissibility/verify_trifilar_finite_projector_ladder.mjs)

## Result

Four frozen transformer-capacitor settings are enough to test whether the
requested matrices can be built and measured. They are not enough to claim a
quarter-turn geometric return.

For the latitude loop used in AZ-156 and AZ-157, sequential projection through
\(N\) dark planes gives a finite, exactly calculable map. Its orthogonal part
converges to the expected \(-90^\circ\) return, but its singular values remain
below one at finite \(N\). The same operation that follows the moving admitted
plane also discards the component rejected at every step.

| steps \(N\) | returned angle | singular values of the return |
| ---: | ---: | ---: |
| 4 | \(-68.707^\circ\) | \(0.4181,\ 0.2394\) |
| 8 | \(-85.477^\circ\) | \(0.6521,\ 0.5119\) |
| 16 | \(-88.911^\circ\) | \(0.8082,\ 0.7196\) |
| 32 | \(-89.730^\circ\) | \(0.8991,\ 0.8489\) |
| 64 | \(-89.933^\circ\) | \(0.9482,\ 0.9214\) |
| 128 | \(-89.983^\circ\) | \(0.9738,\ 0.9599\) |

Thus 32 steps are sufficient for a sub-degree angle in this ideal fixture,
but 128 are required before both returned singular values exceed \(0.95\).
Angle convergence and survival are different acceptance tests.

## Exact discrete transport

Work in coordinates where

\[
n(\phi)=(s\cos\phi,s\sin\phi,c),
\qquad c=\frac34,
\qquad s=\frac{\sqrt7}{4},
\]

and let \(P(\phi)=I-n(\phi)n(\phi)^T\). For
\(\phi_j=2\pi j/N\), define

\[
A_N=P(\phi_N)P(\phi_{N-1})\cdots P(\phi_1).
\]

The initial and final planes coincide. Using the orthonormal tangent frame

\[
Q(\phi)=
\begin{pmatrix}
-\sin\phi & c\cos\phi\\
 \cos\phi & c\sin\phi\\
 0 & -s
\end{pmatrix},
\]

the observable two-dimensional return is

\[
R_N=Q(0)^T A_N Q(0).
\]

Its polar factor supplies the closest rotation; the singular values of
\(R_N\) report survival and anisotropic distortion. As \(N\to\infty\), the
rotation tends to

\[
-2\pi(1-c)=-\frac\pi2
\]

modulo orientation convention, while both singular values tend to one.
Reversing the order reverses the angle.

## Why this is not yet an LC propagation model

The product \(A_N\) is a sequence of orthogonal projections. Physically it is
closest to repeated filtering, lossy mode stripping or a Zeno-type transport
protocol. It is not the transfer matrix of a lossless static LC cell merely
because each \(P(\phi_j)\) came from the eigenspaces of a positive energy
matrix.

That distinction creates two honest routes.

### Projection ladder

Deliberately filter out the bright component at every station. The predicted
attenuation is then part of the signal, not a nuisance to normalize away.
Measure the complete \(2\times2\) return, including both singular values and
lost power. The finite-\(N\) table is the null model.

### Adiabatic dynamical ladder

Propagate through coupled resonators whose dark doublet remains degenerate and
gapped from the bright mode. Here the state follows the instantaneous
eigenspace dynamically rather than being projected after every step. The
relevant error depends on gap, dwell time, coupling dispersion and loss. The
projector product gives the geometric target, but a coupled-mode transfer
calculation must predict the actual amplitudes and dynamical phase.

The two implementations must not be blended. A lossy projection experiment
can demonstrate relation-valued transport, but it does not by itself
demonstrate lossless Hamiltonian holonomy.

## Revised build sequence

1. **Four-setting calibration:** build or emulate
   \(\phi=0,\pi/2,\pi,3\pi/2\); reconstruct each full terminal matrix and its
   bright/dark projectors. Do not close a loop claim here.
2. **Eight-to-32-step emulator:** implement the projector product digitally or
   with explicit filters. Compare the entire measured return matrix with the
   frozen finite-\(N\) prediction, including attenuation and reversal.
3. **At least 128 projection steps for high survival:** use this only if the
   design criterion is both singular values above \(0.95\) without correcting
   loss in post-processing.
4. **Continuous or resonant adiabatic device:** replace repeated projection by
   a spatially varying, gapped coupled-mode generator. Freeze its transfer
   model before measuring the loop.
5. **Temporal version:** if couplings move while energy is stored, add the
   AZ-157 controller-work record.

## Detector contract

A returned angle alone is insufficient. At each \(N\), retain:

- the full complex \(2\times2\) return matrix;
- its polar rotation and both singular values;
- total reflected, transmitted, dissipated and filtered power;
- the reconstructed three-port projector sequence;
- the forward/reverse comparison;
- a dynamical-phase control with the same path length and frozen spectra.

Scalar amplitude normalization can erase the very contraction that separates
a projection ladder from adiabatic transport. A scalar Smith chart can help
calibrate each port, but the claim lives in a matrix return.

## Corpus implication

This calculation gives the “admissibility channel” a literal operational
meaning. Repeated selectors can force a carrier to remain inside a moving
allowed subspace, and the accumulated relation becomes a rotation. But finite
selection has a price: rejected components become loss records. In the
continuous limit, the geometric relation survives while that discretization
loss vanishes. The detector must retain both facts.

## Verdict

The quarter-turn is not a four-component trick. Four cells are a useful
tomographic calibration cross; the transport itself needs a finer ladder or a
continuous adiabatic generator. For the declared latitude, 32 ideal
projections give sub-degree angular accuracy but substantial contraction, and
128 are needed to keep both return singular values above \(0.95\). This turns
“run down the channel” into a quantitative design rule and prevents the
geometric angle from being rescued by silently normalizing away the cost of
selection.
