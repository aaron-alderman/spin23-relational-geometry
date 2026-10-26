# E8 projected two-cell coupling

**Date:** 26 October 2026

**Status:** projected two-cell gap promoted; full two-cell and width gaps open

**Evidence:** [two-cell ledger](../../../evidence/data/translation-free-e8-two-cell-projected-coupling-v1.json)
**Certificate:** [two-cell verifier](../../../verification/verify/verify_translation_free_e8_two_cell_projected_coupling.mjs)

The first explicit spatial extension uses two identical compact cells and

\[
H_{AB}=H_A+H_B-J\sum_{i=1}^8\cos(\theta_{A,i}-\theta_{B,i}).
\]

Each cell is projected onto its four lowest resolved states. Within that
manifold the interaction is constructed from signed matrices, not transition
weights:

\[
-J\sum_i(C_i\otimes C_i-A_i\otimes A_i),
\]

where \(C_i\) represents \(\cos\theta_i\) and the real antisymmetric \(A_i\)
is the \(i\sin\theta_i\) proxy. Their symmetry identities hold numerically to
better than \(3\times10^{-14}\).

At every sampled \(J=0,0.01,0.025,0.05,0.1\), the projected first gap and,
for \(J>0\), the first-doublet splitting pass two successive sub-one-percent
shell increments from cutoffs 6 to 8 to 10. At \(J=0.1\), the projected gap is
0.1822513372 and the splitting is 0.0051948553. The lower one-excitation state
is swap-even and therefore collective; the upper is swap-odd and therefore a
relative-cell mode. Both remain inversion-odd.

This is the first dynamical meaning of the cell index in the nonlinear rotor
lane: coupling does not merely shift the local line, it resolves motion in
phase and out of phase between cells. The result is nevertheless a projected
two-cell certificate. Four local roots have not been compared with a larger
retained manifold, the full product charge basis was not diagonalized, and no
width-independent or thermodynamic gap follows. Root-count convergence is the
next gate, followed by three- and four-cell projected chains.
