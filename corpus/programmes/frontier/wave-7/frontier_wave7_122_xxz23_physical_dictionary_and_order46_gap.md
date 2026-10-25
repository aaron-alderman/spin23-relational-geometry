# Frontier Wave 7.122: The XXZ-23 Physical Dictionary and Its Order-46 Gap

**Date:** 25 October 2026

**Status:** source-grounded one-Hamiltonian dictionary through TY fusion algebra; exact obstruction to the natural order-46 promotion

**Evidence:** [XXZ-23 carrier-gap record](../../../../evidence/data/xxz23-order46-carrier-gap-v1.json)

**Certificate:** [dihedral/order-46 verifier](../../../../verification/verify/verify_xxz23_order46_carrier_gap.mjs)

## Result

The root-of-unity XXZ chain is not merely an analogy to the Monster defect
layer. At

\[
q=e^{i\pi/23},\qquad \Delta=\cos(\pi/23),\qquad L=46,
\]

Vernier, Miao and Yamazaki provide one spin-half Hamiltonian with:

- a physical twisted boundary condition produced by magnetic flux through
  the ring;
- a conserved \(\mathbb Z_{23}\) subgroup of magnetization rotations;
- explicit matrix-product duality operators \(D_\pm\) commuting with the
  Hamiltonian;
- the lattice relation
  \[
  D_\pm^2=\left(\sum_{k=0}^{22}Z_\pm^k\right)T(0),
  \qquad Z_\pm D_\pm=D_\pm;
  \]
- a \(c=1\) compact-boson continuum limit with \(R^2=23/2\).

This is the strongest present physical dictionary for the
\(TY(\mathbb Z_{23})\) fusion algebra. The twist is a flux, the invertible
line is a magnetization rotation, the noninvertible line is an MPO limit of a
semicyclic transfer matrix, and the trace can be represented by a transfer
matrix or thermal circuit.

## 1. The source boundary

The source paper proves the fusion algebra, not the full fusion category. It
explicitly leaves extraction of the associator/F-symbols to future tensor
network work. Consequently the XXZ model currently establishes W0 of the
corpus witness ladder. It is a candidate for W1 tomography, but the Monster
bicharacter and Frobenius--Schur sign have not been derived from this lattice
MPO.

This corrects a possible overreading of Wave 7.115: its 484 Fourier-plaquette
test is a preregistered target, not a published property of the XXZ carrier.

## 2. Why its natural twofold symmetry is not the Monster junction

The chain also has a twofold operation involving global spin flip and time
reversal that exchanges \(D_+\) and \(D_-\). The unitary spin-flip action on
the order-23 rotation has the dihedral relation

\[
rgr^{-1}=g^{-1}.
\]

In the resulting group of size 46, every reflected element obeys

\[
(g^a r)^2=1.
\]

The executable census finds one identity, 22 rotations of order 23 and 23
reflections of order 2. Its maximum element order is 23. It contains no
order-46 element.

This distinction is decisive: a group *of order* 46 is not the cyclic
order-46 Monster root required by

\[
h^2=g,\qquad h^{23}=z.
\]

Time reversal does not repair the dictionary because it is antiunitary and
does not supply the ordinary unitary trace insertion assumed by the Monster
benchmark.

## 3. Minimal repair

The smallest algebraic repair is a unitary involution \(z\) satisfying

\[
z^2=1,\qquad[z,g]=[z,H]=0.
\]

Then

\[
h=g^{12}z
\]

has order 46 and obeys the required power relations. But simply tensoring an
extra qubit or Ising chain onto XXZ gives the factorized connected ratio
\(|R|=1\). A useful carrier additionally needs an interaction

\[
H_{\rm candidate}=H_{\rm XXZ23}+H_2+\lambda V,
\qquad [V,g]=[V,z]=0,
\]

where \(V\) cannot be removed by a tensor-product basis change. The order-46
ratio then detects whether the repair is genuinely coupled.

## 4. What would count as progress and what would not

A first carrier experiment should:

1. implement the XXZ flux twist and \(D_\pm\) MPO;
2. tomographically extract the associator rather than assume the Fourier
   matrix;
3. add or identify a commuting unitary involution;
4. show \(h=g^{12}z\) has order 46 on the same Hilbert space;
5. measure \(|R|\) and reject the tensor-product null;
6. predict its dependence on a held-out modular/temperature point.

Tuning \(\lambda\) to reproduce one Monster ratio proves emulatability only.
Monster provenance begins when one calibration predicts the second branch or
held-out \(\tau\)-dependence and the carrier also approaches the required
ambient \(c=24\), \(V_1=0\) structure.

## Sources and corpus links

- Vernier, Miao and Yamazaki, [*Lattice non-invertible symmetry from non-commuting transfer matrices*](https://arxiv.org/abs/2606.25660).
- Wen, Inamura and Schafer-Nameki, [*Non-Invertible Symmetries on Tensor-Product Hilbert Spaces and Quantum Cellular Automata*](https://arxiv.org/abs/2605.15194).
- [XXZ-23 quantitative protocol](frontier_wave7_115_xxz23_quantitative_preregistered_protocol.md)
- [Order-46 trace cost](frontier_wave7_121_order46_trace_estimation_cost.md)
