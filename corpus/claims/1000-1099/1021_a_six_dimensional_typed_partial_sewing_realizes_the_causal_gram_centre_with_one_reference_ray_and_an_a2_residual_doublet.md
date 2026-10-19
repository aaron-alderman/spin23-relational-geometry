# A Six-Dimensional Typed Partial Sewing Realizes the Causal Gram Centre with One Reference Ray and an \(A_2\) Residual Doublet

**Date:** 18 October 2026  
**Branches:** controlled rational-inner dilation, shared reference ray, distinct residual ports, unequal-channel dephasing, and \(A_2\) covariance  
**Claim status:** exact constructive typed lift; microscopic identification of the environment remains open  
**Certificate:** [construct_the_typed_partial_sewing_with_one_reference_ray_and_an_a2_residual_doublet.mjs](../../../verification/construct/construct_the_typed_partial_sewing_with_one_reference_ray_and_an_a2_residual_doublet.mjs)

## Executive result

Document 1020 proves that the scalar silver seam cannot be promoted by identifying the complete normal and tangent Darlington port spaces. There is, however, an exact fixed-port lift if only the reference ray is shared and the residual directions remain typed.

Let

\[
E=\mathbb C e_{\rm ref}
\oplus
\operatorname{span}\{e_n^\perp,e_t^\perp\}
\cong \mathbf1\oplus A_2.
\]

For each squared-loss channel choose the canonical analytic defect factor \(g_j\) satisfying

\[
|f_j(\omega)|^2+|g_j(\omega)|^2=1.
\]

Define the two normalized environment rays

\[
e_n(z)=
\begin{pmatrix}f_n(z)\\g_n(z)\\0\end{pmatrix},
\qquad
e_t(z)=
\begin{pmatrix}f_t(z)\\0\\g_t(z)\end{pmatrix}.
\]

Then the controlled analytic isometry

\[
W(z)|n\rangle=|n\rangle\otimes e_n(z),
\qquad
W(z)|t\rangle=|t\rangle\otimes e_t(z)
\]

lives in

\[
\mathbb C^2\otimes\mathbb C^3\cong\mathbb C^6.
\]

It has both required reductions:

\[
(I\otimes\langle e_{\rm ref}|)W
=\operatorname{diag}(f_n,f_t),
\]

while tracing the environment gives the coherence overlap

\[
\boxed{
\langle e_t|e_n\rangle
=\overline{f_t}f_n=s_c.}
\]

At \(\ell=\operatorname{arsinh}(1)\), this overlap is the causal Schur function found in document 1018. Thus the scalar causal seam does lift to a complete controlled inner architecture—but only by partial sewing, not by the forbidden full relative-matrix identification.

## 1. Analytic defect factors

For

\[
f_j(z)=\left(\frac{z-ia_j}{z+ib_j}\right)^2,
\]

take

\[
g_j(z)=
\frac{k_j(z+id_j)}{(z+ib_j)^2},
\]

with

\[
k_j^2=2(b_j^2-a_j^2),
\qquad
d_j^2=\frac{a_j^2+b_j^2}{2}.
\]

The polynomial identity behind the minimal Darlington completion gives

\[
|f_j(\omega)|^2+|g_j(\omega)|^2=1
\]

for every real frequency. Both entries are rational and upper-half-plane analytic.

The residual directions are orthogonal by construction, so

\[
\langle e_t|e_n\rangle=\bar f_tf_n.
\]

This realizes exactly the centre of the unequal-transfer Gram disk.

## 2. One dilation, two operational reductions

### Reference-port compression

Preparing and postselecting the reference ray gives the unequal observed response

\[
F(z)=\operatorname{diag}(f_n(z),f_t(z)).
\]

The missing norm goes into two separately labelled residual directions.

### Environment trace

For a system density matrix, tracing \(E\) preserves populations and sends

\[
\rho_{nt}\longmapsto
s_c(\omega)\rho_{nt}.
\]

The same interaction therefore realizes amplitude loss under reference compression and complex dephasing under environment trace. These remain operationally distinct channels.

## 3. Full conservative completion

In the normal system sector, embed the canonical \(2\times2\) inner completion \(U_n\) on

\[
\operatorname{span}\{e_{\rm ref},e_n^\perp\}
\]

and leave \(e_t^\perp\) untouched. In the tangent sector, embed \(U_t\) on

\[
\operatorname{span}\{e_{\rm ref},e_t^\perp\}
\]

and leave \(e_n^\perp\) untouched. Their controlled direct sum is a rational-inner \(6\times6\) matrix on \(S\otimes E\), and \(W\) is obtained from its common-reference input columns.

This construction is fixed-port and frequency independent at the level of basis labels. It never multiplies \(U_t^\sharp\) by \(U_n\), so it does not encounter the determinant obstruction of document 1020.

## 4. Minimal environment rank

At the Gram centre,

\[
\det G
=(1-|f_n|^2)(1-|f_t|^2).
\]

For strict loss in both channels this is positive, so the three rays

\[
e_{\rm ref},e_n,e_t
\]

have rank three. The common environment therefore needs one reference direction and two residual directions. The present \(E\cong\mathbb C^3\) attains that lower bound.

This proves minimality of the environment state space for the stated Gram data. It does not assert absolute minimality among every scattering architecture with different operational requirements.

## 5. Exact \(A_2\) typing

The reference ray is an \(S_3\) singlet. Type the residual pair as the irreducible real \(A_2\) doublet. For one face, the normal/tangent splitting is diagonal and commutes with its reflection \(F\), but not with the \(120^\circ\) rotation \(C\) unless the two defect amplitudes coincide.

This is not a failure of covariance. It is the already established local symmetry breaking:

\[
W_k
=
(C^k\otimes(1\oplus C^k))
W_0 C^{-k},
\qquad k=0,1,2.
\]

The three isometries form an equivariant orbit. Their residual defect densities are

\[
B_k=C^kB_0C^{-k},
\]

and obey

\[
\boxed{
B_0+B_1+B_2
=\frac32\operatorname{tr}(B_0)I.}
\]

Thus a single face preserves one reflection, while the complete three-face family restores global isotropy.

## 6. What this closes

- an analytic fixed-basis factorization of the Gram-centre rays;
- one common reference direction and exactly two residual directions;
- a rectangular rational-inner controlled isometry;
- an explicit \(6\times6\) conservative completion;
- simultaneous realization of unequal amplitude loss and Gram-centre dephasing;
- exact \(\mathbf1\oplus A_2\) environment typing;
- reflection covariance locally and \(C_3\) covariance across the face orbit.

## 7. What remains open

- a microscopic reason for selecting the Gram centre rather than another point in the disk;
- identification of the residual \(A_2\) pair with the placement/Galois/Furey environment beyond representation equivalence;
- a local Hamiltonian or boundary action producing the controlled completion;
- whether the tuned unit seam is stable under renormalization;
- the dimensional physical scale of the pole and linewidth.

## 8. Stop-everything and falsification tests

**Microscopic-isometry trigger:** one Furey/Higgs/Jordan boundary coupling produces the displayed controlled columns and their shared reference ray.

**Environment-identity trigger:** a fixed intertwiner identifies the residual pair with the established placement/Galois \(A_2\) doublet and preserves reflection plus cyclic transport.

**Local-action trigger:** integrating out the typed residual pair yields both the observed transfer and the causal overlap without inserting either by hand.

**Rank falsifier:** strict loss in both channels is claimed with an environment of dimension below three while retaining all three Gram rays.

**Symmetry falsifier:** one anisotropic face is claimed to be \(C_3\)-invariant rather than one member of a covariant three-face orbit.

**Sewing warning:** the construction shares the reference ray; it does not identify the complete residual-port completions.

## Verdict

| Question | Verdict |
|---|---|
| Is there a fixed-port typed lift of the Gram-centre environment? | **Yes** |
| Is its minimal environment dimension three? | **Yes, for strict loss and the stated Gram data** |
| Does it have a complete rational-inner extension? | **Yes, on six dimensions** |
| Does it evade the determinant no-go? | **Yes, by partial rather than full sewing** |
| Do the residual directions carry \(A_2\)? | **Yes, equivariantly across the three-face orbit** |
| Is the microscopic field identity known? | **No** |

## Position in the corpus

- [minimal scalar Darlington completion](../0900-0999/950_spectral_factorization_compresses_each_squared_loss_channel_to_two_ports_and_the_full_two_face_cycle_to_six.md)
- [outgoing-port \(A_2\) typing](../0900-0999/963_the_minimal_outgoing_port_pair_is_canonically_the_a2_doublet_and_its_three_face_loss_orbit_is_globally_isotropic.md)
- [unequal-transfer Gram disk](1015_unequal_face_transfers_admit_a_joint_environment_exactly_inside_a_gram_overlap_disk_and_relative_phase_can_exclude_real_dephasing.md)
- [unique causal scalar seam](1018_the_unique_silver_loss_asinh1_cancels_the_two_chart_pole_and_turns_the_complex_gram_center_into_a_causal_schur_overlap.md)
- [minimal full-matrix no-go](1020_the_unique_silver_pole_zero_seam_is_compression_specific_and_does_not_lift_to_the_minimal_darlington_relative_matrix.md)
