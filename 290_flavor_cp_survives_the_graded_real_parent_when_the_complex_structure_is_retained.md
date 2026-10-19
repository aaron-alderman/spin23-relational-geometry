# Flavor CP Survives the Graded-Real Parent When the Complex Structure Is Retained

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact realification of an explicit nonzero CP invariant; a later compatibility audit proves that exact shared-index \(J\)-preservation reduces positively only to the scalar face ray, so a full external carrier requires broken/covariant \(J\) or an independent face factor

> **Compatibility qualification.** The CP invariant below is correct, but it does not by itself identify the real/imaginary doubling with the physical relational face. See [the shared-index complex-structure obstruction](294_exact_flavor_complex_structure_collapses_the_shared_face_reduction_to_a_scalar.md).

## 1. Real matrices do not by themselves mean CP conservation

The graded parent for two faces and three flavors is

\[
H_6(\mathbb R).
\]

Every matrix in it has real entries. It is tempting to conclude that all flavor CP phases have disappeared. That conclusion is false if the six-dimensional real space retains a physical complex structure.

Let

\[
J=
\begin{pmatrix}
0&-I_3\\
I_3&0
\end{pmatrix},
\qquad J^2=-I_6.
\]

Then \((\mathbb R^6,J)\cong\mathbb C^3\).

## 2. Realification of complex Hermitian flavor matrices

For

\[
H=A+iB,
\qquad A^T=A,quad B^T=-B,
\]

define

\[
\boxed{
\mathcal R(H)=
\begin{pmatrix}
A&-B\\
B&A
\end{pmatrix}.}
\]

Then

\[
\mathcal R(H)^T=\mathcal R(H),
\qquad
[\mathcal R(H),J]=0.
\]

Realification is an algebra homomorphism:

\[
\mathcal R(H_1H_2)=\mathcal R(H_1)\mathcal R(H_2).
\]

The imaginary antisymmetric flavor part \(B\) becomes precisely the odd--odd block allowed by the graded-real completion.

## 3. The CP-odd invariant is recoverable from real data plus \(J\)

Take the positive Hermitian example

\[
H_u=\operatorname{diag}(1,2,4),
\]

\[
H_d=
\begin{pmatrix}
10&1&-i\\
1&11&1\\
i&1&12
\end{pmatrix}.
\]

It has

\[
\operatorname{Tr}[H_u,H_d]^3=36i,
\qquad
\det[H_u,H_d]=12i.
\]

Let

\[
R_u=\mathcal R(H_u),
\qquad
R_d=\mathcal R(H_d).
\]

Both are real symmetric. Nevertheless,

\[
\boxed{
-\frac12\operatorname{Tr}
\left(J[R_u,R_d]^3\right)=36\neq0.}
\]

The complex CP-odd invariant survives exactly. The complex structure \(J\) converts the realified commutator data back into its imaginary flavor invariant.

## 4. Physical conjugation is a separate involution

Complex conjugation on \(\mathbb C^3\) is represented on \(\mathbb R^6\) by

\[
K=
\begin{pmatrix}
I_3&0\\
0&-I_3
\end{pmatrix},
\qquad KJ=-JK.
\]

It acts by

\[
K\mathcal R(H)K=\mathcal R(\overline H).
\]

For the complex \(H_d\) above,

\[
KR_dK\neq R_d.
\]

Thus the fact that \(R_d\) is a real matrix does not make it invariant under the physical conjugation defined relative to \(J\).

The triple

\[
(H_6(\mathbb R),J,K)
\]

contains more structure than the real algebra alone.

## 5. Weighted reductions expose the odd sector

The antisymmetric flavor block \(B\) has

\[
\operatorname{Tr}B=0.
\]

An unweighted flavor trace removes it, leaving a real external face response. More generally, every symmetric real flavor weight is orthogonal to \(B\) under the trace pairing.

An odd/antisymmetric flavor probe \(L^T=-L\), however, can detect

\[
\operatorname{Tr}(L^TB)\neq0.
\]

Such a graded probe exposes the face-odd/flavor-odd correlation. This provides a precise route by which CP-sensitive internal information can coexist with a CP-even unweighted external carrier.

## 6. What the result resolves

It resolves the immediate algebraic question:

> Can a nonzero basis-invariant three-flavor CP signal exist inside the inverse-closed graded-real parent?

Yes. The explicit invariant above is nonzero.

It also explains why applying ordinary entrywise reality directly to the \(3\times3\) flavor matrices was too strong. Realification doubles the real dimension and retains \(J\), so the complex information is encoded geometrically rather than erased.

## 7. What remains open

The construction does not yet prove that the physical face index is the real/imaginary doubling used by \(\mathcal R\). A physical model must identify:

- the combined six-dimensional response space;
- its complex structure \(J\);
- its physical conjugation \(K\);
- the external two-face reduction;
- Standard-Model gauge and chiral actions on the same space.

It must also show that renormalization preserves \(J\) or derives its transport.

## 8. Relation to the \(Spin(2,3)\) carrier

The external unweighted reduction is real, but inside the exact \(J\)-central subalgebra it is only proportional to \(I_2\), not a general element of \(H_2(\mathbb R)\). A full three-dimensional external carrier therefore requires response directions outside \(\operatorname{Cent}(J)\), a covariantly transported \(J\), or an independent face factor. The \(Spin(2,3)\) action cannot be assigned to all 21 parent directions merely from the realification.

The extra directions store flavor correlations and CP structure. They must be gapped, quotiented or treated as internal response data if the low-energy external carrier is to remain three-dimensional.

## 9. Stop-everything and falsification gates

**Stop-everything trigger:** the physical Furey/Standard-Model response identifies the same \(J,K\) structure, preserves the nonzero CP invariant and reduces canonically to the external \(H_2(\mathbb R)\) carrier.

**Observable trigger:** a graded flavor probe converts the odd--odd sector into a calculable CP-sensitive face response.

**Renormalization trigger:** the inverse-closed dynamics preserve or covariantly transport \(J\).

**CP falsifier:** the proposed graded model omits \(J\), making physical conjugation indistinguishable from ordinary real-matrix entrywise conjugation.

**Reduction falsifier:** the external reduction removes not only odd correlations but also the known nonzero flavor CP observables from every physical process.

## 10. Certificate

The [CP-survives-realification certificate](scripts/verify_cp_survives_graded_realification.mjs) embeds the explicit complex Hermitian CP-violating pair into real symmetric \(6\times6\) matrices, recovers the cubic CP invariant using \(J\), tests physical conjugation \(K\), and distinguishes even from odd flavor reductions.

## Companion documents

- [Graded-real inverse-closed parent](289_the_inverse_closed_graded_real_escape_is_the_full_combined_real_symmetric_algebra.md)
- [Universal real-selector CP obstruction](74_real_selector_cp_violation_obstruction.md)
- [Real face with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Three-flavor PMNS spectral carrier](174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
