# An Unpolarized Spin Trace Can Erase the Majorana-Quartet Interference, While Polarization Restores It Unless the Paths Are Operator-Orthogonal

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the spin-survival branch  
**Claim status:** exact finite-dimensional spin-trace theorem and two-level certificate; gauge-complete process realization remains open  
**Certificate:** [verify_spin_trace_can_erase_or_polarization_restore_majorana_quartet_interference.mjs](scripts/verify_spin_trace_can_erase_or_polarization_restore_majorana_quartet_interference.mjs)

## Executive result

Spin summation does not merely multiply the quartet interference by a universal degeneracy. It inserts an overlap of the two path operators.

Let

\[
\mathcal M=Pp\,A+Qq\,B,
\]

where \(A\) and \(B\) act on the relevant spin space and \(\rho\) is its preparation or analyzer density matrix. The cross term contains

\[
C_\rho=\operatorname{Tr}(\rho A B^\dagger).
\]

If CP conjugates the weak coherence \(pq^*\) while the matched kinematic-spin factor is held fixed, then

\[
\boxed{
\Delta_{CP}
=-4\operatorname{Im}[PQ^*C_\rho]\operatorname{Im}(pq^*) .
}
\]

The spin question therefore has three distinct answers:

1. \(C_\rho\neq0\): spin preserves and possibly rotates the measurable quadrature;
2. \(C_{I/d}=0\) but \(AB^\dagger\neq0\): an unpolarized trace erases coherence, but a polarization or spin-correlation analyzer can restore it;
3. \(AB^\dagger=0\): the two paths are operator-orthogonal and no choice of \(\rho\) can restore their cross term.

## 1. Recoverable unpolarized null

Take a two-level spin space with

\[
A=I,
\qquad B=\sigma_z,
\qquad
\rho(r)=\frac{I+r\sigma_z}{2}.
\]

Then

\[
C_{\rho(r)}=r.
\]

The unpolarized state \(r=0\) kills the interference exactly, but opposite polarizations \(r\) and \(-r\) recover equal and opposite CP-sensitive kernels. Averaging those samples reproduces the unpolarized zero.

This is a projection loss, not a missing amplitude.

## 2. Irrecoverable operator orthogonality

If

\[
A=|0\rangle\langle0|,
\qquad
B=|1\rangle\langle1|,
\]

then \(AB^\dagger=0\), hence

\[
C_\rho=0
\]

for every density matrix or analyzer \(\rho\). The paths populate orthogonal spin sectors and do not interfere.

This is a genuine coherence obstruction. No statistical weight can recover information absent from the probability distribution.

## 3. Complex spin overlap and phase accounting

In general

\[
\operatorname{Im}[PQ^*C_\rho]
=\operatorname{Re}C_\rho\,\operatorname{Im}(PQ^*)
+\operatorname{Im}C_\rho\,\operatorname{Re}(PQ^*).
\]

A complex spin overlap mixes the two kinematic quadratures. It can supply an analyzer phase, but it must not be mislabeled as a weak CP phase. The CP-conjugate comparison must transform the spin preparation and analyzer consistently; otherwise a polarization asymmetry can masquerade as CP violation.

## 4. Relation to the carrier and score

The spin density matrix defines another positive compression before the \(H_2(\mathbb R)\) path carrier is read out:

\[
(A,B,\rho)
\longmapsto C_\rho
\longmapsto \text{path Gram coordinate}
\longmapsto \text{CP score}.
\]

An unpolarized trace can project away the odd coordinate just as an inclusive phase-space integral can. If polarization restores it, the optimal score of document 736 must be built from the spin-resolved observed likelihood. If operator orthogonality kills it, the score is identically zero.

## 5. Stop-everything criteria

Stop the channel if the gauge-complete path operators satisfy \(AB^\dagger=0\) after all unobserved spins are traced.

Stop treating an unpolarized null as fundamental until polarized or spin-correlated overlaps have been tested.

Stop assigning a complex analyzer overlap to Majorana CP without the correctly transformed CP-conjugate spin configuration.

Stop optimizing an event weight before deciding which spin information is experimentally observable.

## 6. Highest-value next calculations

1. Derive \(A\) and \(B\) for an explicit LNV decay or scattering topology.
2. Apply helicity projectors and identify mass-suppressed versus unsuppressed overlaps.
3. Determine the CP action on beam polarization and final-state analyzers.
4. Combine spin and pairing exchange into one joint involution.
5. Recompute the efficient score after unobservable spin components are marginalized.

## Companion documents

- [Optimal exchange-odd CP score](736_the_optimal_exchange_odd_observable_is_the_cp_score_and_recovers_all_local_information_lost_by_the_inclusive_rate.md)
- [Pairing-exchange cancellation and signed recovery](735_pairing_exchange_can_cancel_the_inclusive_majorana_quartet_asymmetry_while_a_signed_differential_moment_restores_it.md)
- [Four-mode Pfaffian interference](734_the_four_mode_majorana_pfaffian_contains_the_quartet_interference_but_a_cp_rate_asymmetry_needs_a_relative_kinematic_phase.md)
