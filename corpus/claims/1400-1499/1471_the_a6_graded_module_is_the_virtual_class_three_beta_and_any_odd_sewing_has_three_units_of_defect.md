# The A6 graded module is the virtual class (3\beta), and any odd sewing has three units of defect

**Date:** 20 October 2026

**Gate:** A6

**Status:** exact graded (K)-class and sewing obstruction; conditional superconnection packaging

**Depends on:** [the unique anomaly-free spectator](1458_o0_is_the_unique_zero_index_cp1_spectator_but_no_single_ordinary_dirac_or_real_structure_generates_the_flux_split.md), [the charge-to-Picard boundary](1470_the_unique_sterile_charge_to_picard_functor_hits_o3_and_o0_but_cannot_generate_the_full_a6_bundle_split.md), and [the absence of a holomorphic sterile-pair coefficient](1466_the_o3_sterile_triplet_has_no_holomorphic_majorana_coefficient_and_any_smooth_o_minus6_repair_is_a_new_defect_sector.md)

**Evidence:** [machine-readable certificate](../../../evidence/data/spin23-a6-graded-superconnection-kclass.json) and [executable verifier](../../../verification/verify/verify_spin23_a6_graded_superconnection_kclass.mjs)

## Result

The species-independent grading sought after claim 1470 has a unique minimal (K)-theory package once the selected and spectator bundles are fixed:

\[
E^+=\mathcal O(3)\otimes R_{\rm SM},
\qquad
E^-=\mathcal O(0)\otimes R_{\rm SM}.
\]

Let

\[
\beta=[\mathcal O(1)]-[\mathcal O(0)]
\]

generate the reduced (K)-theory of (mathbb{CP}^1). Since (\beta^2=0),

\[
[\mathcal O(n)]=1+n\beta,
\]

and therefore

\[
\boxed{[E^+]-[E^-]=3\beta\otimes R_{\rm SM}.}
\]

This packages the full parent/spectator split uniformly over every Standard Model representation. It also proves that any self-adjoint odd superconnection sewing between the two graded halves must vanish with signed total index three. A globally invertible uniform sewing does not exist.

## 1. What the superconnection repairs

Claim 1458 ruled out treating (mathcal O(3)) and (mathcal O(0)) as the two spin-chiral halves of one ordinary Clifford twist. A graded module avoids that error. The two independently valid Weyl complexes are placed in an auxiliary (mathbb Z_2) grading, and a Quillen-type superconnection has the schematic form

\[
\mathbb A=
\begin{pmatrix}
\nabla_{\mathcal O(3)}&0\\
0&\nabla_{\mathcal O(0)}
\end{pmatrix}
+
\begin{pmatrix}
0&s\\
s^\dagger&0
\end{pmatrix}.
\]

The principal symbols remain those of the two separate Weyl complexes. The auxiliary grading is not falsely identified with spin chirality, so the Clifford-compatibility no-go is respected rather than evaded by notation.

## 2. Odd sewing necessarily has defects

With the displayed ordering, the forward odd block lies in

\[
\operatorname{Hom}(\mathcal O(0),\mathcal O(3))
=\mathcal O(3).
\]

Its holomorphic section space has dimension four. Every nonzero holomorphic section has a zero divisor of degree three. More generally, a generic smooth section has signed zero index

\[
\sum_p\operatorname{ind}_p(s)=c_1(\mathcal O(3))=3.
\]

The reverse holomorphic block would lie in (mathcal O(-3)), whose regular holomorphic section space is zero. A Hermitian superconnection may use (s^\dagger), but the joint odd mass

\[
T=
\begin{pmatrix}0&s\\s^\dagger&0\end{pmatrix}
\]

still loses rank precisely where (s=0). Thus the different-degree halves cannot be sewn by an everywhere-invertible odd mass. Any such attempt carries a three-unit defect ledger.

## 3. A new localization ansatz, with a non-double-counting rule

The three zeros suggest a bounded incarnation/defect experiment: treat them as candidate localization sites for three family modes. This is a legitimate ansatz because the sites arise from a section of the exact inter-bundle Hom, not from the number three alone.

But the zero count and the twisted Dirac index are two representatives of the same degree-three topology. They are not independent evidence and must not be multiplied into nine states or counted as two explanations. The next calculation must solve the coupled Dirac--superconnection operator near the zeros and determine whether its kernel is precisely the already known index-three kernel, a redistribution of it, or an unwanted additional light sector.

## 4. What remains underived

The construction makes the missing datum smaller but does not remove it. Specifying

\[
E=E^+\oplus E^-
\]

still supplies an auxiliary grading. Anomaly cancellation plus the zero-index/no-mirror condition uniquely fixes its two line bundles within the tested class, but (Spin(2,3)) alone has not produced the graded module or its odd section.

The next origin test is therefore precise:

> Construct the auxiliary grading as a (Spin(2,3))-equivariant boundary incidence, spectral-triple grading or defect orientation, and compute the coupled kernel at the forced three zeros.

The route fails if the grading is merely an unconstrained central projector, or if the odd sewing creates unobserved light modes.

## 5. Beautiful interpretation

The graded object has virtual rank zero but degree three. Its global obstruction to annihilation is exactly what prevents the selected and spectator sectors from cancelling completely. In that limited mathematical sense, the three families can be read as the residue of an attempted parent--spectator annihilation:

\[
\boxed{\text{rank cancels},\qquad\text{topological degree does not}.}
\]

This is a precise realization of the death/return and incarnation motifs from the ansatz playground. It is an index statement, not yet a physical account of birth, identity or consciousness.

## Verdict

\[
\boxed{
\begin{array}{ll}
\text{graded parent/spectator class}:&3\beta,\\
\text{species-independent packaging}:&\textbf{yes},\\
\text{everywhere-invertible odd sewing}:&\textbf{no},\\
\text{forced defect index}:&3,\\
\text{grading derived from }Spin(2,3):&\textbf{not yet}.
\end{array}}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_a6_graded_superconnection_kclass.mjs
~~~
