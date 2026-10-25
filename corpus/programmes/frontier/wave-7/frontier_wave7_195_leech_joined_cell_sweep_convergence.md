# Frontier Wave 7.195: Joined-Cell Sweep Convergence

**Date:** 25 October 2026

**Status:** fixed-bond sweep diagnostic; bond capacity remains limiting

**Evidence:** [sweep-convergence record](../../../../evidence/data/leech-joined-cell-sweep-convergence-v1.json)

**Executable:** [checkpointable sector runner](../../../../scripts/reconnoiter-leech-joined-cell-dmrg.py)

**Certificate:** [sweep-shift verifier](../../../../verification/verify/verify_leech_joined_cell_sweep_convergence.mjs)

## Two more sweeps, no new numerical axis

The saved cutoff-four, bond-64 states from Wave 7.194 were resumed for two
additional alternating sweeps. Even and odd sectors were run independently,
and the expensive \(H^2\) diagnostic was deferred. This isolates sweep depth
without changing cutoff, bond, ordering or initialization.

The even energy moves from 2.34176073 to 2.34133974. Its two sweep shifts are
\(-3.18\times10^{-4}\) and \(-1.03\times10^{-4}\). The odd energy moves from
2.45850150 to 2.45784537, with shifts approximately
\(-4.79\times10^{-4}\) and \(-1.77\times10^{-4}\). Both sequences contract.

The variational gap changes

\[
0.1167407768\longrightarrow0.1165056332,
\]

a shift of \(-2.35\times10^{-4}\). That is only 17.4% of the preceding
bond-48-to-64 gap shift. Thus the present leading tensor error is bond
capacity rather than insufficient sweeps at bond 64.

This does not mean sweep convergence is complete. The last individual shifts
are still much larger than a precision target for comparison with the
0.02072 perturbative gap, and residuals were deliberately not recomputed.
The parity expectations remain 0.999955 and -0.99999994.

## Algorithmic implication

Simply adding sweeps has diminishing value. The next useful intervention is
a symmetry-native global-inversion sector or controlled subspace expansion,
then resumed bonds 80 and 96. Exact parity blocks would eliminate the global
penalty MPO, forbid leakage by construction and reduce the especially costly
odd-state optimization. Residuals should be recomputed only at accepted
checkpoints rather than after every monitoring continuation.

## Boundary

All values are variational upper estimates. Contracting sweep shifts provide
no lower enclosure. The joined-cell gap remains uncertified.

## Corpus links

- [Fixed-cutoff bond convergence](frontier_wave7_194_leech_joined_cell_bond_convergence.md)
- [Full joined-cell DMRG reconnaissance](frontier_wave7_193_leech_joined_cell_dmrg_reconnaissance.md)
- [Joined-cell MPO certificate architecture](frontier_wave7_191_leech_joined_cell_mpo_certificate_architecture.md)
