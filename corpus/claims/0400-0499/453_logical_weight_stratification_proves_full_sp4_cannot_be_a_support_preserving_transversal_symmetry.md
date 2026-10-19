# Logical-Weight Stratification Proves Full (Sp(4)) Cannot Be a Support-Preserving Transversal Symmetry

**Date:** 17 October 2026  
**Branches:** B01, B04, B07, B09, B10 and B14  
**Claim status:** exhaustive qutrit logical-coset minimization and exact transversal obstruction

## 1. Why representative support was insufficient

The first explicit Clifford lifts used one convenient physical representative for each logical Pauli exponent. Their supports ranged from 3 to 14 qutrits. A logical Pauli can be multiplied by any stabilizer without changing its encoded action, so those raw supports were not invariant.

The correct quantity is the minimum support over the entire stabilizer coset.

## 2. Exact coset minimization

For a logical exponent

\[
\ell=(x_1,x_2,z_1,z_2)\in\mathbb F_3^4,
\]

the certificate exhausts

\[
3^3=27
\]

equivalent \(X\)-representatives and

\[
3^9=19683
\]

equivalent \(Z\)-representatives, minimizing the union of their physical supports.

For the eight generating directions used previously, the exact minima are

\[
7,7,3,3,6,2,8,8.
\]

Thus one mixed logical direction has a weight-two representative, realizing the source code's distance-two bound, while other symplectic directions remain much heavier.

## 3. Complete distribution over logical phase space

There are

\[
3^4-1=80
\]

nonzero logical Pauli exponent classes. Exhaustive minimization gives:

| minimum physical support | number of logical classes |
|---:|---:|
| 2 | 4 |
| 3 | 4 |
| 6 | 36 |
| 7 | 12 |
| 8 | 24 |

The counts sum to 80 exactly.

This five-level stratification is a code invariant for the chosen puncture boundary and physical Hamming geometry.

## 4. Full (Sp(4,mathbb F_3)) is transitive

Every nonzero vector in an alternating symplectic space is isotropic with itself, and \(Sp(4,mathbb F_3)\) acts transitively on the nonzero vectors of \(\mathbb F_3^4\).

Therefore a full logical \(Sp(4,mathbb F_3)\) action sends weight-two logical classes to classes whose minimum physical representatives have weights 3, 6, 7 or 8.

The abstract symplectic symmetry does not preserve the physical Hamming-weight geometry.

## 5. Transversal/local-Clifford obstruction

A tensor product of one-qutrit Clifford operations maps a nonidentity single-site Pauli to another nonidentity Pauli. Coordinate permutations merely move supports. Consequently any local-Clifford-permutation or monomial transversal operation preserves physical Pauli support.

If such an operation preserves the code, it also preserves minimum support in every logical stabilizer coset. Its induced logical action must preserve the five weight strata above.

Since the full symplectic group is transitive and the strata are nontrivial,

\[
\boxed{
\text{no support-preserving transversal Clifford group can induce all of }Sp(4,\mathbb F_3).
}
\]

This is stronger than the earlier observation that the visible Weyl subgroup acts trivially.

## 6. What full logical mixing requires

Any realization of the entire logical symplectic group must use operations that can change support geometry, such as:

- entangling Clifford circuits of nonzero depth;
- measurement and feed-forward;
- code deformation or gauge fixing;
- puncture motion/code switching;
- a transfer process whose physical notion of locality differs from coordinate Hamming support.

The generic physical transvection lift supplies the first option, but not a preferred or low-energy one.

## 7. Relevance to the continuous carrier

The finite code now distinguishes two structures:

\[
\text{symplectic relational kinematics}
\quad\text{versus}\quad
\text{physical support geometry}.
\]

The continuous \(Spin_0(2,3)\) programme similarly needs both:

- an abstract \(Sp(4)\) action;
- positivity, locality or causal response selecting its physical realization.

The qutrit result is therefore instructive: abstract symplectic homogeneity can erase physically meaningful weight strata. A credible real lift must explain which structure is fundamental and how locality emerges or transforms.

## 8. Branch decision

- **Closed:** exact minimum support for all 80 nonzero logical qutrit Pauli classes.
- **Closed:** five distinct support strata \(2,3,6,7,8\).
- **Closed:** the full logical \(Sp(4,\mathbb F_3)\) does not preserve this stratification.
- **Closed:** no support-preserving local-Clifford-permutation realization can equal the full logical symplectic group.
- **Open:** minimum-depth entangling realization.
- **Open:** puncture motion or code switching as a source-derived implementation.
- **Open:** relation between Hamming support and continuous response locality.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** a natural puncture-motion or transfer process changes the logical weight strata exactly as the symplectic generators require and admits a local continuum response interpretation.

**Transversal falsifier:** a claimed support-preserving transversal gate maps between logical classes of different certified minimum weights.

**Locality falsifier:** the existence of an abstract or generic encoded Clifford lift is used as proof of a local physical symmetry.

**Continuum trigger:** the five finite support strata converge under an arithmetic lift to a meaningful orbit or causal stratification of the real carrier.

## 10. Certificate

The exhaustive minimization is part of the [two-puncture qutrit Clifford-lift certificate](../../../verification/verify/verify_two_puncture_qutrit_code_has_nonlocal_clifford_lift_of_full_sp4.mjs). It enumerates all stabilizer representatives for every nonzero logical exponent and asserts the exact distribution.

## Companion documents

- [Full nonlocal Clifford \(Sp(4)\) lift](452_the_two_puncture_qutrit_code_has_a_full_nonlocal_clifford_sp4_lift_but_no_source_derived_mixing_yet.md)
- [Finite two-puncture \(Sp(4)\) shadow](450_two_punctures_produce_an_exact_finite_sp4_shadow_but_do_not_select_the_spin23_real_carrier.md)
- [Weyl stabilizer acts trivially](451_the_nu_c_e_c_two_puncture_stabilizer_selects_the_sm_3_plus_2_flag_but_acts_trivially_on_logical_phase_space.md)
- [Scalar-network transfer and sewing](../0000-0099/66_scalar_network_subdivision_invariants.md)
