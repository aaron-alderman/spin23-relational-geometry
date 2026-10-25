# Frontier Wave 7.182: One-Quantum Quartic Mixing Audit

**Date:** 25 October 2026

**Status:** complete projected quartic block; higher quantum sectors open

**Evidence:** [one-quantum mixing record](../../../../evidence/data/leech-one-quantum-quartic-mixing-v1.json)

**Certificate:** [projected-block reconstruction verifier](../../../../verification/verify/verify_leech_one_quantum_quartic_mixing.mjs)

## Why diagonal Kerr shifts needed an audit

Wave 7.181 derived the diagonal first-order transition shifts. The second and
third harmonic frequencies are close, so the local cosine quartic can in
principle hybridize their one-quantum states. The complete transition block is

\[
 M_{ab}=\omega_a\delta_{ab}
 -{u\over2}\sqrt{s_as_b}\sum_i O_{ia}O_{ib}v_i,
 \qquad v_i=\sum_cO_{ic}^2s_c.
\]

This includes every diagonal and off-diagonal quartic matrix element after
subtracting the vacuum correction. The executable analysis reconstructs the
Gram-first eigenvectors, forms the full $24\times24$ block and diagonalizes it.

## Result

The nearest harmonic pair is modes 2 and 3 in ascending-frequency order. The
strongest off-diagonal matrix element instead connects modes 22 and 24, which
are much farther apart. Consequently the diagonal fingerprint is stable:

| $U/u$ | largest off-diagonal element | largest relative change after block diagonalization |
|---:|---:|---:|
| $10^{-4}$ | $2.562\times10^{-5}$ | $2.23\times10^{-6}$ |
| $10^{-3}$ | $2.562\times10^{-4}$ | $2.51\times10^{-5}$ |
| $10^{-2}$ | $2.562\times10^{-3}$ | $4.03\times10^{-4}$ |

Thus Wave 7.181 remains the correct leading nondegenerate asymptotic law. At
the strongest declared point, the complete projected-block mixing changes no
transition by more than 0.0404% relative. The evidence freezes all 24 mixed
transition frequencies at each of the three tunable-ratio settings.

## Boundary and next calculation

Diagonalizing this block is a useful mixing diagnostic, but it is not a
systematic second-order calculation. The quartic interaction also connects a
one-quantum state to three- and five-quantum states; higher cosine terms and
compact interwell tunnelling are absent. The next controlled calculation is
therefore a selected multimode Fock-space convergence study that includes all
states through a total excitation cutoff, not another diagonal correction.

[Wave 7.183](frontier_wave7_183_leech_four_mode_full_cosine_active_space.md)
executes that step for the four softest modes. The full-cosine gap is stable
through total excitation cutoff eight; active-mode-count convergence remains
the next open axis.

## Corpus links

- [Coupled anharmonic spectroscopy](frontier_wave7_181_leech_coupled_anharmonic_spectroscopy.md)
- [Coupled-metric gap audit](frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
- [24-port commissioning packet](frontier_wave7_177_leech_24port_admittance_commissioning_packet.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Four-mode full-cosine active space](frontier_wave7_183_leech_four_mode_full_cosine_active_space.md)
