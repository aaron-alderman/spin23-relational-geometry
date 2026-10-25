# Frontier Wave 7.183: Four-Mode Full-Cosine Active Space

**Date:** 25 October 2026

**Status:** excitation-cutoff converged four-mode projection; 24-mode convergence open

**Evidence:** [full-cosine active-space record](../../../../evidence/data/leech-four-mode-full-cosine-active-space-v1.json)

**Certificate:** [active-space reconstruction and convergence verifier](../../../../verification/verify/verify_leech_four_mode_full_cosine_active_space.mjs)

## Beyond the quartic one-quantum block

The next calculation must include virtual higher excitations and all orders of
the cosine. Wave 7.183 does this for the four softest Gram-first normal modes.
The other twenty modes are projected onto their harmonic vacuum, including
their coordinate-resolved Debye--Waller factors. Inside that declared
projection, the Hamiltonian retains the full cosine and is diagonalized in all
four-mode Fock states with total excitation at or below $N_{\rm tot}$.

Parity is exact, so the even ground sector and odd candidate first-excitation
sector are diagonalized separately. The final rung contains 295 even and 200
odd states.

## Convergence

| $U/u$ | gap at $N_{\rm tot}=4$ | gap at 6 | gap at 8 | relative 6-to-8 change |
|---:|---:|---:|---:|---:|
| $10^{-3}$ | 0.006659691194 | 0.006659691057 | 0.006659691057 | $2.68\times10^{-12}$ |
| $10^{-2}$ | 0.02073980640 | 0.02073979019 | 0.02073979017 | $5.75\times10^{-10}$ |

The first excitation remains odd at every cutoff. Relative to the complete
projected quartic block of Wave 7.182, the full-cosine converged gap shifts by
only 0.00402% at $U/u=10^{-3}$ and 0.04086% at $10^{-2}$. Thus higher active-
sector excitations and all cosine orders do not destabilize this four-soft-
mode result in the declared semiclassical window.

## What this does and does not prove

This is the first nonlinear gap convergence result for the actual joined
Gram-first metric, rather than for 24 independent pendula. It is nevertheless
a Ritz spectrum of a four-mode projection. The twenty omitted modes can still
contribute through virtual excitation, and compact tunnelling between wells
is not recovered merely by increasing a harmonic Fock cutoff.

The next convergence axis is therefore active-mode count: repeat the full-
cosine calculation for 6, 8 and more soft modes, independently converging the
total-excitation cutoff at every step. Only stability along both axes can
support a quantitative 24-mode nonlinear gap claim.

[Wave 7.184](frontier_wave7_184_leech_full_cosine_active_mode_ladder.md)
begins that second axis. Six modes are independently excitation-cutoff
converged and an eight-mode reconnaissance remains stable, but the omitted-
mode tail has no rigorous bound yet.

## Corpus links

- [One-quantum quartic mixing audit](frontier_wave7_182_leech_one_quantum_quartic_mixing.md)
- [Coupled anharmonic spectroscopy](frontier_wave7_181_leech_coupled_anharmonic_spectroscopy.md)
- [Coupled-metric gap audit](frontier_wave7_180_leech_coupled_metric_pendulum_gap_audit.md)
- [Monster laboratory-promotion DAG](frontier_wave7_137_monster_laboratory_promotion_dag.md)
- [Full-cosine active-mode ladder](frontier_wave7_184_leech_full_cosine_active_mode_ladder.md)
