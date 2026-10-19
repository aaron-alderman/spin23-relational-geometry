# The Wilson–Takagi Regulator Fixes Relative Pfaffians but Leaves the Absolute Majorana Orientation Free

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B08, B09, B11, B13 and B14  
**Claim status:** exact regulator-basis no-go; relative spectral-flow results remain valid

## 1. Audit of the actual Majorana construction

The regulated Pin lattice uses particle–hole symmetry

\[
C=U_CK
\]

and a Takagi factor

\[
U_C=WW^T
\]

to reach a Majorana basis where \(C=K\) and \(H=iA\) with \(A\) real antisymmetric.

For the first Pauli factor, the chosen matrix was

\[
W_2=\frac1{\sqrt2}
\begin{pmatrix}1&i\\1&-i\end{pmatrix},
\qquad
W_2W_2^T=\sigma_x.
\]

This is a valid common basis for reference and defect. It does not canonically orient the real Majorana space.

## 2. Exact Takagi freedom

If \(O\) is any real orthogonal matrix, then

\[
W'=WO
\]

is an equally valid Takagi factor because

\[
W'W'^T=WOO^TW^T=WW^T=U_C.
\]

Taking \(\det O=-1\) reverses the Majorana orientation while preserving:

- the particle–hole operator in canonical form;
- Hermiticity and antisymmetry;
- the Hamiltonian spectrum;
- glide covariance;
- the Wilson regulator;
- every local gap and localization property.

## 3. Effect on Pfaffians

The real antisymmetric matrix changes by congruence,

\[
A\mapsto O^TAO,
\]

so

\[
\operatorname{Pf}(O^TAO)=\det(O)\operatorname{Pf}(A).
\]

An orientation-reversing Takagi postfactor flips both reference and defect Pfaffians. Their product and ratio remain unchanged:

\[
\operatorname{sgn}!left[operatorname{Pf}A_{\rm ref}\operatorname{Pf}A_{\rm def}\right]
\quad\text{is invariant.}
\]

This validates the existing relative-Pfaffian calculations while ruling out extraction of an absolute basepoint sign from the Takagi convention.

## 4. Glide-sector Gram–Schmidt has the same freedom

The real glide eigenspace basis is built by Gram–Schmidt. Multiplying that basis by any orthogonal matrix within the sector leaves the projector unchanged. A determinant-minus-one postfactor flips the projected Pfaffian.

Using the same oriented sector basis for reference and defect is sufficient for their relative invariant. The column order and pivot convention used by the algorithm are not physical determinant-line data.

## 5. Why reflection positivity does not choose the sign

Under a real change of Majorana variables, the ordered Grassmann measure transforms with the inverse determinant. Its sign compensates the Pfaffian congruence sign in the Gaussian integral.

Reflection positivity constrains the resulting correlation functional and transfer matrix. It is insensitive to a simultaneous reversal of integration-variable orientation and Pfaffian convention. Therefore it cannot identify the regulator's first basis vector with the octonionic colour volume.

The Wilson mass sign can distinguish topological phases and control relative spectral flow. It does not eliminate the global \(O(N)\) orientation freedom of the Majorana basis.

## 6. Consequence for the ribbon programme

The regulator supplies:

- a common real structure;
- a common orientation convention for endpoint comparison;
- a robust relative defect parity;
- a possible transport law between junctions.

It does not supply:

- the absolute identification of that convention with \(\Omega_C\);
- a preferred sign of the vacuum-to-top Hodge map;
- the initial ribbon orientation.

The missing datum is still an external sewing isomorphism of oriented real lines,

\[
\Lambda^3V_C^*
\otimes
\Lambda^2W^*
\longrightarrow
\operatorname{Pf}(D_{\rm wall}),
\]

including its sign.

## 7. Claim ledger

- **Exact:** every real orthogonal Takagi postfactor preserves the canonical particle–hole form.
- **Exact:** determinant-minus-one postfactors flip absolute Pfaffians.
- **Exact:** relative reference/defect parity is unchanged.
- **Exact:** Grassmann-measure transformation compensates the Pfaffian convention.
- **No-go:** Wilson mass, Takagi factorization and reflection positivity alone do not sew the octonion and Majorana orientations.
- **Open:** a source-defined determinant-line isomorphism.
- **Retained:** all existing relative spectral-flow and localized-crossing results.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the microscopic Furey/domain-wall coupling defines the displayed determinant-line isomorphism and proves it is orientation preserving.

**Negative trigger:** the same physical isomorphism is orientation reversing, selecting the pair-of-pants branch.

**Takagi falsifier:** one numerically convenient Takagi factor is treated as uniquely physical despite \(W\mapsto WO\).

**Positivity falsifier:** reflection positivity is claimed to distinguish two Grassmann orientations whose measure and Pfaffian signs compensate.

**Relative-invariant falsifier:** the valid relative Pfaffian is discarded merely because each endpoint's absolute sign is conventional.

## 9. Certificate

The [Takagi/Wilson orientation certificate](scripts/verify_takagi_and_wilson_regulator_leave_absolute_majorana_orientation_unfixed.mjs) verifies real-orthogonal Takagi freedom, absolute Pfaffian reversal, relative-sign invariance and Grassmann-measure compensation.

## Companion documents

- [Pfaffian orientation transport](475_domain_wall_pfaffian_spectral_flow_can_transport_the_ribbon_sign_but_cannot_supply_its_absolute_octonion_sewing.md)
- [Regulated relative Pfaffian phase](383_the_regulated_pin_lattice_has_a_nontrivial_relative_pfaffian_phase_but_glide_and_car_do_not_force_it.md)
- [Hodge-complement phase freedom](474_the_hodge_complement_extends_the_furey_spinor_to_its_conjugate_but_the_vacuum_to_top_phase_remains_free.md)
- [Exchanged Wilson regulator](381_the_glide_forbids_a_constant_four_component_wilson_mass_but_an_exchanged_regulator_pair_repairs_it.md)
