# Rank-24 detector ladder

**Date:** 26 October 2026

**Status:** exact on the declared E8-cubed/Leech/Moonshine candidate family; general c=24 identification remains open

**Parent:** [translation-free exceptional topology](README.md)

**Evidence:** [detector ledger](../../../evidence/data/translation-free-rank24-detector-ladder-v1.json)

**Certificate:** [character detector verifier](../../../verification/verify/verify_translation_free_rank24_detector_ladder.mjs)

## The collision and its first resolution

The bulk detector

\[
D_0=(\operatorname{rank},\det,\operatorname{signature},c_-)
\]

returns \((24,1,24,24)\) for both \(E_8^3\) and the Leech lattice. It also
cannot distinguish the Leech lattice edge from its Monster orbifold by thermal
transport alone: all have the same chiral central charge.

For a rank-24 lattice VOA,

\[
\dim V_1=24+N_2(L),
\]

because the Heisenberg currents contribute 24 and every norm-two lattice root
contributes a weight-one exponential current. Therefore

\[
\begin{array}{c|c|c}
\text{candidate}&N_2&\dim V_1\\\hline
E_8^3&720&744\\
V_\Lambda&0&24\\
V^\natural&\text{not a lattice root count}&0
\end{array}
\]

The weight-one detector \(D_1=\dim V_1\) separates the declared three-way
family immediately.

## Why this is not the end of reconstruction

Every holomorphic \(c=24\) character is constrained to have the form

\[
\operatorname{Tr}_V q^{L_0-1}=J(q)+\dim V_1.
\]

Consequently the untwined genus-one character adds no information beyond
\(c\) and \(\dim V_1\) inside this family. In particular, \(V_1=0\) and the
scalar character \(J\) are a strong Moonshine filter but are not treated by
the corpus as an unrestricted uniqueness theorem.

The detector ladder must continue:

| detector | record | remaining ambiguity |
|---|---|---|
| D0 | bulk rank, determinant, signature, thermal response | all declared rank-24 candidates collide |
| D1 | weight-one current dimension | separates E8-cubed, Leech and Moonshine in the declared family |
| D2 | framed Ising/Griess data | selects the required weight-two multiplication corner |
| D3 | marked 2A, 23AB and order-46 defects | retains conjugacy/orientation information |
| D4 | nontrivial sewing plus held-out prediction | tests compositional reconstruction |

## Experimental reading

Central charge is an integrated heat detector. \(V_1\) is a current-spectrum
detector. D2--D4 are operator and history detectors. The ladder makes a
practical rule precise: do not spend defect-tomography resources until the
coarser current spectrum has rejected the E8-cubed and Leech-only rivals.

## Boundary

This result does not prove that a disordered E8 edge flows to Leech or
Moonshine. It tells an experiment or simulation exactly which new observable
must be opened at each promotion and prevents identical thermal response from
being misread as identical boundary physics.
