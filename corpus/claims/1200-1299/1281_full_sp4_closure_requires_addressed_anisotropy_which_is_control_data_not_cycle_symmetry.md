# Full \(\mathfrak{sp}(4,\mathbb R)\) closure requires addressed anisotropy, which is control data rather than cycle symmetry

**Date:** 20 October 2026

**Status:** exact finite Lie-closure certificate with an explicit selector debt

**Evidence:** [machine-readable protocol](../../../evidence/data/graph-two-mode-spin23-exhaustion.json)

**Certificate:** [verifier](../../../verification/verify/verify_graph_two_mode_spin23_exhaustion.mjs)

## Result

The intrinsic two-mode plane of the cycle graph does not by itself generate (Spin(2,3)). With isotropic kinetic and potential blocks, the Hamiltonian generators close on a three-dimensional common-oscillator algebra isomorphic to (\mathfrak{sp}(2,\mathbb R)\), a proper subalgebra of

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3).
\]

Full ten-dimensional closure becomes available only after independently addressed anisotropic perturbations are admitted.

## Exact control construction

On (C_{12}), project three edge Laplacians, for edges (0), (4) and (8), into the real first-harmonic plane. Each projected edge produces a rank-one symmetric matrix

\[
V_e=(u_e-u_{e+1})(u_e-u_{e+1})^T.
\]

The three projected matrices have rank three in (\operatorname{Sym}_2(\mathbb R)). Together with the kinetic generator, their Hamiltonian lifts

\[
K_T=\begin{pmatrix}0&I\\0&0\end{pmatrix},
\qquad
K_{V_e}=\begin{pmatrix}0&0\\-V_e&0\end{pmatrix}
\]

generate, under commutators, a ten-dimensional linear space. Every generated matrix satisfies

\[
K^TJ+JK=0
\]

with zero numerical residual in the finite certificate. This is full (\mathfrak{sp}(4,\mathbb R)) closure.

## Interpretation

The result separates two claims that must not be conflated:

1. **Mathematical accessibility:** a graph-supported, real two-mode system can realize all of (Sp(4,\mathbb R)), hence the connected response symmetry locally is (Spin_0(2,3)).
2. **Intrinsic derivation:** the symmetric cycle action does not choose the three addressed edges, their orientation or their independent control strengths.

The first is now certified. The second remains false for the unaugmented model. Edge addressing is experimental or model-building input unless a larger graph action dynamically produces it. Calling the resulting group fundamental without that derivation would hide the selector inside the control apparatus.

## Falsification and promotion rule

For any proposed graph family, project its action-derived perturbations into the selected two-mode plane and compute Lie closure. A dimension below ten falsifies full \(Spin(2,3)\) response symmetry for that control family. Dimension ten is sufficient for the linear Hamiltonian response claim only if the controls and selector are physically available and survive refinement; it is not sufficient for a spacetime claim.
