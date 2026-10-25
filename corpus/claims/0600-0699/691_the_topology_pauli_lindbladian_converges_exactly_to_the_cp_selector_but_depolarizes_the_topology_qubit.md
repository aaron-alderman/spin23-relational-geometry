# The Topology Pauli Lindbladian Converges Exactly to the CP Selector but Depolarizes the Topology Qubit

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11 and the action-level selector branch  
**Claim status:** exact finite-dimensional Lindblad realization of the topology twirl; not a closed-system mass-gap derivation  
**Certificate:** [verify_topology_pauli_lindbladian_converges_to_selector_twirl.mjs](../../../verification/verify/verify_topology_pauli_lindbladian_converges_to_selector_twirl.mjs)

## Executive result

The topology exchange/dephasing part of the combined completely positive selector is the exact infinite-time limit of a two-jump Lindblad generator:

\[
\mathcal L(O)
=\gamma_x(SOS-O)+\gamma_z(ZOZ-O),
\qquad \gamma_x,\gamma_z>0.
\]

Here

\[
S=\sigma_x\otimes I_{\rm carrier},
\qquad
Z=\sigma_z\otimes I_{\rm carrier}.
\]

Its asymptotic channel is

\[
\mathcal E(O)
=\frac14\left(O+SOS+ZOZ+SZOZS\right),
\]

the same topology Pauli twirl used in the selector of [document 688](688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md).

The result comes with an uncomfortable but useful clarification:

> The steady observable algebra has no surviving topology qubit. It is exactly \(I_{\rm topology}\otimes M_{\rm carrier}\).

This generator realizes topology erasure/decoherence, not a Hamiltonian energy splitting leaving a pure symmetric topology state.

## 1. Why this is a valid Lindbladian

Take jump operators

\[
L_x=\sqrt{\gamma_x}\,S,
\qquad
L_z=\sqrt{\gamma_z}\,Z.
\]

Because \(S\) and \(Z\) are Hermitian unitaries, the GKSL terms are

\[
L_aOL_a^\dagger-\frac12\{L_a^\dagger L_a,O\}
=\gamma_a(U_aOU_a-O).
\]

The two conjugation superoperators commute even though \(S\) and \(Z\) anticommute, because the minus sign is central and disappears under conjugation.

Therefore the semigroup factors exactly into two independent random-unitary channels.

## 2. Exact finite-time channel

For one involution \(U\),

\[
e^{t\gamma(\operatorname{Ad}_U-I)}
=p_0(t)\,\mathrm{id}+p_1(t)\,\operatorname{Ad}_U,
\]

where

\[
p_0(t)=\frac{1+e^{-2\gamma t}}2,
\qquad
p_1(t)=\frac{1-e^{-2\gamma t}}2.
\]

Both coefficients are nonnegative and sum to one. Multiplying the \(S\) and \(Z\) channels gives a four-term random-unitary channel with weights

\[
p_{ab}=p_a^{(x)}p_b^{(z)}.
\]

Thus complete positivity and trace preservation hold at every finite time, not only asymptotically.

## 3. Complete decay spectrum

Decompose the topology operator into the Pauli sectors

\[
I,\quad X,\quad Y,\quad Z.
\]

Tensoring any of them with an arbitrary carrier operator gives an eigenoperator of \(\mathcal L\):

| Topology sector | Lindblad eigenvalue | Finite-time factor |
|---|---:|---:|
| \(I\) | \(0\) | \(1\) |
| \(X\) | \(-2\gamma_z\) | \(e^{-2\gamma_z t}\) |
| \(Z\) | \(-2\gamma_x\) | \(e^{-2\gamma_x t}\) |
| \(Y\) | \(-2(\gamma_x+\gamma_z)\) | \(e^{-2(\gamma_x+\gamma_z)t}\) |

The slowest nontrivial decay rate is

\[
2\min(\gamma_x,\gamma_z).
\]

In Hilbert–Schmidt norm,

\[
\|e^{t\mathcal L}O-\mathcal E(O)\|_2
\le e^{-2\min(\gamma_x,\gamma_z)t}
\|O-\mathcal E(O)\|_2.
\]

This supplies a controlled finite-time error estimate for the topology part of the selector.

## 4. The fixed algebra

An operator fixed by both conjugations must commute with both \(\sigma_x\) and \(\sigma_z\) on the topology factor. Those matrices generate \(M_2(\mathbb C)\), so their commutant is scalar:

\[
\operatorname{Fix}(\mathcal L)
=I_2\otimes M_{\rm carrier}.
\]

Equivalently,

\[
\mathcal E(O)
=\frac{I_2}{2}\otimes\operatorname{Tr}_{\rm topology}(O).
\]

The asymptotic topology state is maximally mixed. There is no surviving pure \(S=+1\) face state because \(S\) and \(Z\) have no common eigenvector.

## 5. Recovery of the real observable on paired inputs

For the conjugate-paired encoding

\[
\iota(A)=\operatorname{diag}(A,\bar A),
\]

the asymptotic map gives

\[
\mathcal E(\iota(A))
=\operatorname{diag}(\operatorname{Re}A,\operatorname{Re}A).
\]

After the rank selector \(K=I_2\otimes e\), this is exactly the doubled \(H_2(\mathbb R)\) image of the combined selector.

For arbitrary doubled inputs, however, the map gives the topology average. It does not create the conjugate-pair relation. The input constraint remains dynamical data.

## 6. What kind of “gap” has been obtained

The eigenvalues above are Liouvillian decay rates. They are not particle masses and not energy gaps of a closed Hamiltonian.

The construction is physically appropriate if topology is:

- coupled to an environment;
- a gauge-redundant label subject to effective dephasing;
- an unobserved boundary degree of freedom;
- or a coarse-grained sector whose coherences are operationally inaccessible.

It is not by itself appropriate if the universe is required to evolve as a closed unitary system and the topology doublet represents two propagating matter species.

## 7. A noncommuting-constraint obstruction

It is tempting to interpret \(S\) and \(Z\) as two Hamiltonian constraints selecting a common light state. That cannot work on a two-dimensional topology Hilbert space:

\[
SZ=-ZS.
\]

They possess no simultaneous eigenvector. Their common fixed *observable algebra* exists, but their common fixed *pure-state subspace* does not.

Therefore the full Pauli twirl naturally describes removal of the topology qubit, not selection of one topology wavefunction.

This distinction should govern future language:

- “superselection/depolarization” is supported;
- “symmetric topology ground state” is not supported by this generator;
- “mirror mass gap” requires a different Hamiltonian calculation.

## 7.1 Gauge-center refinement

The later one-generation audit identifies

\[
Z=q_4q_5=(-1)^{2j_L}
\]

as the \(SU(2)_L\) center action. Hence \(\operatorname{Ad}_Z\) is already trivial on the gauge-invariant observable algebra. The \(\gamma_z\) term should not be interpreted as an independent physical decoherence rate there. It is gauge averaging or bookkeeping before the physical-algebra quotient.

The \(S\) term remains nontrivial and does not commute with the unbroken Standard-Model representation on bare fermions. Its microscopic realization requires Higgs/gauge dressing or an enlarged left-right/\(SO(10)\) covariance. See [document 694](694_topology_parity_is_the_su2l_center_all_yukawas_are_even_but_dirac_exchange_requires_enlarged_covariance.md).

## 8. Stop-everything and falsification criteria

Stop treating this Lindbladian as fundamental if:

1. no environment, gauge reduction or coarse-graining mechanism exists;
2. the required rates violate Lorentz, gauge or flavor covariance;
3. the paired input sector is not invariant under the full interacting dynamics;
4. topology coherences are physically observable and do not decay;
5. a Hamiltonian mirror mass gap is claimed from Liouvillian decay rates.

A stop-everything positive result would be a covariant microscopic model whose reduced dynamics produces the two jumps with calculable \(\gamma_x,\gamma_z\), preserves the Furey paired sector and leaves the Standard-Model S-matrix unitary.

## 9. Next gates

1. Add the heavy third-face Hamiltonian and derive the joint finite-\(\Delta\), finite-time error bound.
2. Test whether Standard-Model gauge generators commute with both jump superoperators.
3. Insert the exact Dirac/Furey permutation \(P\) and test covariance of the twisted paired sector.
4. Test Yukawa interactions for leakage into the \(X,Y,Z\) topology sectors.
5. Seek a gauge-constraint or Stinespring origin if fundamental dissipation is unacceptable.

## Reproducibility

    node scripts\verify_topology_pauli_lindbladian_converges_to_selector_twirl.mjs

## Companion documents

- [The combined CP selector](688_the_combined_peirce_exchange_superselection_selector_is_completely_positive_on_the_doubled_carrier.md)
- [Dirac face exchange at the Hermitian seam](690_dirac_face_exchange_becomes_the_cp_topology_real_structure_only_on_hermitian_observables.md)
- [A heavy third face dynamically selects the rank-two Peirce corner but not its real slice](685_a_heavy_third_face_dynamically_selects_the_rank_two_peirce_corner_but_not_its_real_slice.md)

## Revisit after the Clifford typing audit

The “carrier” preserved by this topology depolarizer must be a tensor factor separate from the topology qubit. It may contain the Clifford \(H_2(\mathbb R)\) face, but the topology qubit may not be identified with that face: a full Pauli twirl on the same \(M_2\) leaves only its identity. See [the typed joint-fixed-algebra audit](../0700-0799/708_the_topology_face_and_clifford_carrier_must_be_separately_typed_or_the_joint_selector_collapses_to_scalars.md).
