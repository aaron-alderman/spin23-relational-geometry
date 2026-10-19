# The Orientation-Line Pauli Audit Selects a Relational σᵧ Pair, but Its Twisted Gap Is Fragile

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** complete finite Pauli audit and surviving numerical candidate; uniqueness and real-index theorem remain open

## 1. The finite search problem

To repair the signed-coordinate descent obstruction, seek an internal factor
\(J_{\rm or}\) such that

\[
\widetilde Y=YJ_{\rm or}
\]

is a real observable in one glide sector. In the complete three-factor Pauli
basis, impose:

1. \(J_{\rm or}=J_{\rm or}^{\dagger}\) and \(J_{\rm or}^2=I\);
2. glide oddness, \(GJ_{\rm or}G^{-1}=-J_{\rm or}\);
3. particle-hole evenness;
4. reality in the Majorana basis.

Exactly sixteen of the 64 Pauli products survive.

## 2. Kinetic compatibility leaves four

Requiring the factor to commute with both regulated kinetic generators leaves

\[
IIz,\qquad Ixz,\qquad Iyy,\qquad Izz,
\]

where a label such as \(Iyy\) denotes
\(I\otimes\sigma_y\otimes\sigma_y\).

Algebra alone does not select one of these four.

## 3. A failed premature selection

At \((L,M)=(2,2)\), both \(Ixz\) and \(Iyy\) give

\[
\zeta_{\rm twist}^{\rm ref}=+1,
\qquad
\zeta_{\rm twist}^{\rm def}=-1
\]

for \(\kappa=0.2\).

Because \(Ixz\) also commutes with the exchanged Wilson regulator, it initially
looks uniquely attractive. But at \((L,M)=(4,2)\) it gives

\[
\zeta_{\rm twist}^{\rm ref}
=\zeta_{\rm twist}^{\rm def}=-1.
\]

Its discriminatory power was a finite-circumference effect. Compatibility
filters plus one small lattice do not establish a canonical orientation line.

## 4. The surviving relational factor

The factor

\[
\boxed{J_{\rm or}=I\otimes\sigma_y\otimes\sigma_y}
\]

continues to give reference \(+1\), defect \(-1\) at \((L,M)=(4,2)\) for
\(\kappa=0.1,0.2,0.3\), both at boundary mass zero and at remote boundary mass
\(b=0.3\).

Its algebraic signature is:

- commutes with both kinetic generators;
- anticommutes with both texture masses;
- anticommutes with the Wilson regulator;
- commutes with the neutral chiral-breaking selector
  \(I\otimes\sigma_y\otimes I\).

The product of two imaginary \(\sigma_y\) factors is real in the Majorana basis.
One factor is precisely the oriented neutral relationship already identified in
the Furey block; the second supplies an orientation factor in the exchanged
regulator pair. This is an exact matrix identity, not yet a physical derivation
from Furey's algebra.

## 5. The gap is the warning

At \(\kappa=0.2\), the twisted reduced-localizer gaps are approximately

| boundary mass | reference gap | defect gap |
|---:|---:|---:|
| 0 | 0.00739 | 0.00580 |
| 0.3 | 0.00668 | 0.000962 |

The signs survive, but the edge-perturbed defect gap becomes small. The radial
candidate's corresponding defect gap was about \(0.037\), nearly forty times
larger than the most fragile twisted value.

Therefore \(Iyy\) is a surviving relational candidate, not a robustly selected
invariant.

## 6. Mathematical interpretation

The construction solves the elementary descent problem:

\[
G(YJ_{\rm or})G^{-1}=YJ_{\rm or}.
\]

It does not yet prove that the determinant sign computes the relevant real
K-theory pairing. That proof must specify:

- the real Clifford-module degree;
- the finite-volume restriction and normalization Pfaffian;
- admissible homotopies of \(J_{\rm or}\);
- why the selected matrix represents the orientation line rather than an
  arbitrary internal decoration;
- stability as \(L,M\) and regulator parameters vary.

## 7. Connection to relational-carrier language

The outcome is structurally aligned with “one carrier, two faces, three
relationships.” The signed carrier \(Y\) cannot descend alone. It becomes a
quotient observable only after multiplication by an orientation-changing
relationship. The numerically surviving factor contains the same
\(\sigma_y\) that represents the oriented \(O/R\) relationship, paired with a
second orientation factor so the total operator is real.

This is a concrete representation-level connection. It is not evidence that
the universe selects this matrix or that the Standard Model derives from it.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the \(Iyy\) factor is derived as the unique
orientation-line Clifford action from the Furey/Jordan bimodule, its skew
localizer is proved to compute the correct real index, and its gap remains open
under scaling and all remote perturbations below a controlled bound.

**Uniqueness falsifier:** \(Iyy\) is called unique merely because the other
candidate tested first failed at larger \(L\).

**Gap falsifier:** a sign protected by a \(9.6\times10^{-4}\) finite gap is
described as robust without parameter scaling.

**Furey falsifier:** the occurrence of a \(\sigma_y\) factor is called a Furey
derivation without constructing the actual intertwiner.

**K-theory falsifier:** the twisted determinant is identified with the real
index before its Clifford degree and normalization are proved.

## 9. Pinned dependency and continuation

Pin the twisted-index claim. The next calculation should map the \(Iyy\) gap
over \((\kappa,\delta,b,L,M)\) and determine whether its small value signals a
nearby unavoidable closure. In parallel, compare the matrix with the exact
Furey oriented-relationship action and ask whether the second \(\sigma_y\)
arises canonically from the regulator/deck bimodule.

## 10. Certificate

The [orientation-line audit certificate](scripts/verify_orientation_line_pauli_audit_and_twisted_localizer.mjs)
checks the complete candidate count, kinetic-compatible subset, failed \(Ixz\)
selection, surviving \(Iyy\) signs and fragile nonzero gaps.

## Companion documents

- [Radial Pin localizer candidate](396_the_signed_class_d_localizer_does_not_descend_but_a_radial_pin_localizer_survives_the_boundary_test.md)
- [Furey oriented neutral selector](384_the_minimal_pin_phase_selector_is_the_oriented_neutral_furey_relationship_but_its_phase_is_not_canonical.md)
- [Remote edge-mass locality test](395_a_remote_edge_mass_moves_the_reference_root_fourteen_times_more_than_the_defect_root.md)
