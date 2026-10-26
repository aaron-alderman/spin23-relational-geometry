# E8 operator-completeness gate

**Date:** 26 October 2026

**Status:** exact truncation correction; inverse branch requires shell 15

**Parent:** [restarted nonlinear eigensolver](E8_RESTARTED_DAVIDSON.md)

**Evidence:** [operator-completeness ledger](../../../evidence/data/translation-free-e8-operator-completeness-gate-v1.json)

**Certificate:** [step-energy and theta-series verifier](../../../verification/verify/verify_translation_free_e8_operator_completeness_gate.mjs)

## Complete states do not guarantee complete operators

The common E8-shell basis retains every charge state below a kinetic-energy
cutoff. That alone does not ensure that every declared cosine generator acts
nontrivially on the retained vacuum.

For the (K)-kernel branch, the eight steps are (e_i), and each has kinetic
energy (e_i^TKe_i/2=1). All eight cosine directions are present from shell
one. For the inverse branch the common-basis steps are (K^{-1}e_i), with
exact energies

\[
 {1\over2}(K^{-1}e_i)^TK(K^{-1}e_i)
 ={1\over2}(K^{-1})_{ii}
 =(2,7,15,10,6,3,1,4).
\]

The inverse branch therefore cannot contain the full vacuum action of all
eight cosines until kinetic cutoff 15.

| cutoff | active vacuum channels | missing fraction of (\|V|0\rangle\|^2) | states |
|---:|---:|---:|---:|
| 2 | 2 | 75.0% | 2,401 |
| 4 | 4 | 50.0% | 26,641 |
| 6 | 5 | 37.5% | 117,361 |
| 8 | 6 | 25.0% | 340,321 |
| 10 | 7 | 12.5% | 794,161 |
| 12 | 7 | 12.5% | 1,604,401 |
| 15 | 8 | 0% | 3,721,681 |

The norm fraction follows because the sixteen signed vacuum steps are
orthogonal and each carries amplitude one half.

## Correction to the convergence narrative

The inverse-kernel shell-eight eigenvalues remain valid eigenvalues of the
projected Hamiltonian, and they still demonstrate that the two sparse graphs
differ. They are not yet an admissible approximation to the full eight-cosine
Hamiltonian: two entire vacuum channels are projected away. Even shell twelve
misses one.

This does not affect the (K)-kernel convergence ladder, whose operator set
was complete from shell one. It bifurcates the next computation:

- continue the (K)-kernel at shells 10 and 12 with leakage and transitions;
- treat the inverse branch below shell 15 as reconnaissance only, and use a
  distributed/reduced-memory run or a better representation before its first
  operator-complete convergence point.

Operator completeness at shell 15 is necessary but still not sufficient.
Further shells must show that the spectrum and detector weights stabilize.
