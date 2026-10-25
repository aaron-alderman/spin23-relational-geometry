# Frontier Wave 7.124: A Local XXZ-23–Ising Order-46 Trace Architecture

**Date:** 25 October 2026

**Status:** exact small-system local Hamiltonian control; commensurate TY-MPO and Monster limits open

**Evidence:** [local ladder record](../../../../evidence/data/xxz23-ising-ladder-order46-toy-v1.json)

**Certificate:** [sector-resolved exact diagonalization](../../../../verification/verify/verify_xxz23_ising_ladder_order46_toy.mjs)

## Result

There is a local one-Hamiltonian implementation of the algebra needed by the
order-46 trace protocol. Put the root-of-unity XXZ chain on one leg and a
transverse-field Ising chain on a second leg:

\[
\begin{aligned}
H={}&\sum_j\left(sigma_j^+\sigma_{j+1}^-
+\sigma_j^-\sigma_{j+1}^+
+\frac{\Delta}{2}\sigma_j^z\sigma_{j+1}^z\right)\\
&-J_I\sum_j\tau_j^x\tau_{j+1}^x
-h_I\sum_j\tau_j^z
+\lambda\sum_j\sigma_j^z\tau_j^z,
\end{aligned}
\]

with \(\Delta=\cos(\pi/23)\). Define

\[
g=e^{2\pi iQ_\sigma/23},
\qquad z=\prod_j\tau_j^z,
\qquad h=g^{12}z.
\]

Every term commutes with \(g\) and \(z\). Hence \(h\) is a unitary
order-46 symmetry satisfying \(h^2=g\) and \(h^{23}=z\). Unlike the natural
dihedral spin-flip extension of the single XXZ chain, this architecture
contains the correct cyclic root.

## 1. Exact finite verification

The certificate builds the periodic four-site-per-leg Hamiltonian on eight
qubits, resolves all 256 basis states into ten \((Q_\sigma,z)\) sectors,
diagonalizes every real-symmetric block, and evaluates the symmetry-twined
thermal traces at \(\beta=1\).

| \(\lambda\) | \(\operatorname{Re}R\) | \(\operatorname{Im}R\) | \(|R|\) |
|---:|---:|---:|---:|
| 0 | 1.0000000000 | 0 | 1.0000000000 |
| 0.2 | 0.9994441511 | 0.0207571328 | 0.9996596770 |
| 0.5 | 0.9962383828 | 0.0623354833 | 0.9981866699 |
| 1.0 | 0.9758723211 | 0.2150437662 | 0.9992850487 |
| 2.0 | 1.1589918731 | 0.9877789574 | 1.5228162826 |

The uncoupled limit gives the factorized result exactly. The local interaction
produces a connected complex trace while preserving the full cyclic symmetry.
This verifies that the preparation/insertion/readout algebra can coexist with
local dynamics.

## 2. Why this is not yet the XXZ Monster experiment

The published periodic XXZ duality MPO becomes directly commensurate when
\(L\) is a multiple of \(2N=46\). The eight-qubit calculation has
\(L=4\), so it verifies the local Hamiltonian and cyclic trace architecture,
not the \(TY(\mathbb Z_{23})\) MPO. Its connected ratios also do not resemble
the Monster magnitudes.

The required next computation is therefore unambiguous:

1. set \(L=46\) on both legs or use an equivalent transfer-matrix geometry;
2. represent \(D_\pm\), \(g\), \(z\), and the flux twist as MPOs;
3. contract the five normalized amplitudes at three temperatures;
4. extract the TY associator independently from MPO recoupling;
5. compare against the factorized, fitted-clock, and Monster curves without
   retuning \(\lambda\).

Matrix-product methods are necessary because the full Hilbert dimension is
\(2^{92}\). The relevant operators already have MPO descriptions; what is
missing is the coupled-ladder contraction and its finite-size scaling.

## 3. Epistemic role

This construction closes the phrase “one Hamiltonian” at toy scale. It does
not close “Monster carrier.” Its role is to show that locality, the cyclic
power relations and a nonfactorized trace are mutually compatible, while
providing a concrete conventional model that the Monster curve must defeat.

## Sources and corpus links

- Vernier, Miao and Yamazaki, [*Lattice non-invertible symmetry from non-commuting transfer matrices*](https://arxiv.org/abs/2606.25660).
- [XXZ-23 carrier gap](frontier_wave7_122_xxz23_physical_dictionary_and_order46_gap.md)
- [Finite fitted-clock control](frontier_wave7_123_one_hamiltonian_order46_toy_and_heldout_rejection.md)
