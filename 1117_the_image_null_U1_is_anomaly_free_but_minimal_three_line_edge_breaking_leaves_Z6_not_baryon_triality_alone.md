# The Image/Null (U(1)) Is Anomaly-Free, but Minimal Three-Line Edge Breaking Leaves (mathbb Z_6), Not Baryon Triality Alone

**Date:** 18 October 2026  
**Branches:** B-MINIMAL-THREE-LINE-FAMILY-ALGEBRA, baryon triality, family-difference gauge symmetry and scalar breaking  
**Claim status:** exact anomaly and charge-lattice theorem for the stated assignments; full spectral scalar content and global anomaly completion remain open  
**Certificate:** [prove_image_null_U1_anomaly_free_but_minimal_edge_breaking_leaves_Z6.mjs](scripts/prove_image_null_U1_anomaly_free_but_minimal_edge_breaking_leaves_Z6.mjs)

> **Faithful-action correction:** the Smith-lattice statement below is correct for the covering \(U(1)_X\times U(1)_Z\) torus. [Document 1118](1118_the_covering_residual_Z6_has_an_order_two_spin_weak_center_kernel_so_its_faithful_new_internal_action_is_baryon_triality.md) proves that the order-two element acts on the stated spectrum as \((-1)^Fz_{2L}\). After the corresponding global spin–gauge quotient, the faithful new internal remnant is \(\mathbb Z_3\), so an extra odd-\(Z\) scalar is not required merely to remove that kernel. [Document 1119](1119_the_spin_weak_kernel_is_closed_under_bilinear_scalar_generation_and_the_odd_Z_repair_defines_a_distinct_UV_branch.md) further shows that a primitive weak-singlet odd-\(Z\) field would not descend through the quotient; it defines the alternative covering-plus-Higgsing UV branch.

## Executive result

The extra generator found in [1116](1116_the_minimal_associative_family_algebra_that_separates_selected_image_and_null_lines_is_C3_and_it_forces_an_extra_U1_plus_the_odd_KO6_obstruction.md),

\[
Z=(0,1,-1),
\]

is not killed by perturbative anomaly cancellation. Interpreted after Standard-Model breaking as a lepton-family difference, it has the (L_i-L_j) anomaly pattern and is anomaly free with right-handed neutrinos. Interpreted at the Pati–Salam level as a family difference on complete multiplets, its mixed non-Abelian, cubic and gravitational anomalies also cancel.

The obstruction moves to symmetry breaking. The elementary three-line edge charges under

\[
U(1)_X\times U(1)_Z
\]

are

\[
(3,1),qquad(3,-1),qquad(0,-2).
\]

They generate a sublattice of index six. Giving VEVs to any independent pair, or to all three, leaves

\[
\boxed{mathbb Z_6,}
\]

not (mathbb Z_3) baryon triality alone. An (X)-neutral field of odd (Z) charge, such as ((0,1)), reduces the index to three, but it is not an elementary difference of the minimal three line characters.

## 1. Low-energy anomaly audit

Use left-handed Weyl fields and let (z_alphain(0,1,-1)). For each family,

\[
L_alpha:(2,-\tfrac12,z_alpha),
\quad
e^c_alpha:(1,+1,-z_alpha),
\quad
\nu^c_alpha:(1,0,-z_alpha).
\]

Quarks are neutral in the low-energy lepton-difference realization.

The anomaly sums are:

\[
SU(2)^2Z:\quad\frac12\sum_alpha z_alpha=0,
\]

\[
Y^2Z:\quad
\sum_alpha\left[
2\left(\frac14\right)z_alpha-z_alpha
\right]
=-\frac12\sum_alpha z_alpha=0,
\]

\[
YZ^2:\quad
\sum_alpha\left[-z_alpha^2+z_alpha^2\right]=0,
\]

\[
Z^3:\quad
\sum_alpha\left[2z_alpha^3-z_alpha^3-z_alpha^3\right]=0,
\]

\[
\mathrm{grav}^2Z:\quad
\sum_alpha(2z_alpha-z_alpha-z_alpha)=0.
\]

Thus perturbative anomaly cancellation does not force the discriminator away.

## 2. Pati–Salam-level anomaly audit

For complete family multiplets, assign

\[
(4,2,1)_{z_alpha},
\qquad
(\bar4,1,2)_{-z_alpha}.
\]

The (SU(4)^2Z) contributions cancel between left and right multiplets family by family. The separate weak anomalies are proportional to

\[
SU(2)_L^2Z\propto\sum_alpha z_alpha,
\qquad
SU(2)_R^2Z\propto-\sum_alpha z_alpha,
\]

and vanish because (0+1-1=0). Cubic and gravitational terms cancel between the equal-dimensional opposite-charge multiplets.

This is a perturbative anomaly statement. The precise quotient group and global/bordism anomaly must still be checked in a completed model.

## 3. The edge-charge lattice

The three elementary oriented relations have charge vectors

\[
q_{PI}=(3,1),
\qquad
q_{PN}=(3,-1),
\qquad
q_{IN}=(0,-2).
\]

They satisfy

\[
q_{IN}=q_{PN}-q_{PI}.
\]

The determinants of the independent pairs are

\[
\det(q_{PI},q_{PN})=-6,
\]

\[
\det(q_{PI},q_{IN})=-6,
\]

\[
\det(q_{PN},q_{IN})=-6.
\]

The greatest common divisor of all entries is one and the gcd of all rank-two minors is six. The Smith normal form is therefore

\[
\operatorname{diag}(1,6).
\]

For compact (U(1)^2), the unbroken finite quotient after these VEVs is

\[
\boxed{mathbb Z_6.}
\]

## 4. Why the result is not merely (mathbb Z_3)

The (X)-charges are multiples of three, so the desired baryon-triality-type (mathbb Z_3) is present. But every (X)-neutral elementary relation has even (Z) charge, and the two charge-three edges have opposite odd (Z) charge. Their lattice retains an additional order-two class.

Abstractly,

\[
\mathbb Z_6\cong\mathbb Z_3\times\mathbb Z_2.
\]

The extra (mathbb Z_2) is not automatically harmful, but it is additional low-energy structure. Its action on fermions, scalars and Majorana VEVs must be computed before it can be accepted or identified with an existing parity.

## 5. Minimal arithmetic repair

Add a field with charge

\[
q_*=(0,1).
\]

The gcd of the enlarged set of rank-two minors becomes three, so the residual group is exactly

\[
\mathbb Z_3.
\]

But (q_*) is not an elementary difference of the minimal characters:

- the only (X)-neutral elementary edge is (I\leftrightarrow N);
- its (Z) charge has magnitude two.

Therefore an odd pure-(Z) breaker requires an additional representation, a composite with suitable primitive charge, a quotient of the gauge lattice, or a different normalization justified by the complete fermion representation.

## 6. Does (Z) itself protect the texture?

Not automatically. The family charge of a (P\leftrightarrow N) Majorana sewing and that of a (P\leftrightarrow N) Dirac leakage are determined by the same endpoint difference. Gauge charge alone cannot distinguish two operators that use the same family characters.

They can still differ in their Pati–Salam representation:

- Majorana sewing uses the (Delta)-type sector;
- Dirac leakage uses a Higgs/Yukawa-type sector.

Thus a complete scalar-incidence rule might allow the former field and omit the latter. The new (Z) makes the distinction expressible, but does not prove the required scalar spectrum.

## 7. Branch consequences

### Anomaly branch

Keep (Z) open. Perturbative anomalies do not exclude it.

### Minimal breaking branch

Record the residual group as (mathbb Z_6), not (mathbb Z_3). Determine whether its (mathbb Z_2) factor is useful, redundant with a known center/parity, or phenomenologically excluded.

### Exact baryon-triality branch

Search for an odd pure-(Z) scalar, a nonprimitive gauge quotient, or an existing Pati–Salam field whose complete charge vector reduces the VEV lattice index from six to three.

### Non-gauge branch

The arithmetic cost strengthens the case for a normalizer, Jordan conditional expectation or shared-spurion realization of image/null selection.

## 8. Stop-everything criteria

**Anomaly stop:** do not reject (Z=(0,1,-1)) as perturbatively anomalous under the stated complete assignments; the explicit sums vanish.

**Residual-group stop:** do not call the minimal elementary-edge breaking “baryon triality only”; its Smith index is six.

**Protection stop:** anomaly freedom and distinguishable charges do not by themselves forbid the dangerous Dirac scalar.

**Positive (mathbb Z_3) trigger:** the complete representation supplies a primitive odd-(Z), (X)-neutral VEV or an equivalent quotient, while preserving the desired Majorana sewing and anomaly cancellation.

**(mathbb Z_2) trigger:** the residual order-two class matches an already required exact parity and introduces no forbidden stable states or domain-wall problem.

## 9. Verdict

The extra family gauge direction survives its first consistency test:

\[
\boxed{Z=(0,1,-1)\text{ is perturbatively anomaly free}.}
\]

But the minimal breaking arithmetic is more structured than expected:

\[
\boxed{
\langle(3,1),(3,-1),(0,-2)\rangle
\subset\mathbb Z^2
\text{ has index }6.
}
\]

So the associative branch does not descend directly to baryon triality alone. It produces a candidate (mathbb Z_6) completion whose extra (mathbb Z_2) must be interpreted or removed.

## Corpus position

- [minimal three-line family algebra](1116_the_minimal_associative_family_algebra_that_separates_selected_image_and_null_lines_is_C3_and_it_forces_an_extra_U1_plus_the_odd_KO6_obstruction.md)
- [generation-blind null-line no-go](1115_the_generation_blind_Pati_Salam_first_order_calculus_cannot_protect_the_Majorana_null_line_from_Dirac_leakage.md)
- [baryon-triality gauge quotient](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
- [minimal continuous baryon-triality lift](1096_three_families_admit_a_minimal_anomaly_free_continuous_baryon_triality_lift_but_it_forces_a_one_plus_two_lepton_texture_repaired_by_a_charge_three_flavon.md)
- [spin–weak-center quotient of the covering \(\mathbb Z_6\)](1118_the_covering_residual_Z6_has_an_order_two_spin_weak_center_kernel_so_its_faithful_new_internal_action_is_baryon_triality.md)
- [bilinear scalar closure and the odd-\(Z\) ultraviolet fork](1119_the_spin_weak_kernel_is_closed_under_bilinear_scalar_generation_and_the_odd_Z_repair_defines_a_distinct_UV_branch.md)
