# The Completed Mediator-Root Gaussian Pushes Forward to the Exact Handle Class-Sum Channel

**Date:** 17 October 2026  
**Branches:** mediator tight frame, Gaussian pushforward, handle class sum, Stinespring environment, and typed response reduction  
**Claim status:** exact effective superoperator theorem; microscopic Gaussian/color/alignment realization remains open  
**Certificate:** [push_the_mediator_root_tight_frame_gaussian_into_the_exact_handle_class_sum_channel.mjs](../../../verification/push/push_the_mediator_root_tight_frame_gaussian_into_the_exact_handle_class_sum_channel.mjs)

**Subsequent qualification:** document 922 closes the color-contraction gate for the canonical fully traced Furey middle-frame response using the exact factorization and environment-gauge theorems of documents 881–883. Color remains open only for noncanonical or partially observed vertices.

## Executive result

The completed mediator-root frame now maps directly into the established handle class-sum channel, not merely into an isomorphic abstract triangle.

Arrange the three cyclic roots as the rows of

\[
M=
\begin{pmatrix}
1&\sqrt3\\
-2&0\\
1&-\sqrt3
\end{pmatrix}.
\]

Their tight-frame identities are

\[
M^TM=6I_2,
\]

and

\[
MM^T=6P_{\rm std},
\qquad
P_{\rm std}=I_3-\frac13\mathbf1\mathbf1^T.
\]

Therefore an isotropic Gaussian mediator-plane variable $z$ with covariance

\[
\operatorname{Cov}(z)=\frac16I_2
\]

pushes forward under

\[
y=Mz
\]

to

\[
\operatorname{Cov}(y)=P_{\rm std}.
\]

This is exactly the covariance used in document 880. Coupling the three labels to the whitened handle operators $O_i$ consequently gives

\[
\frac13\sum_{i,j}(P_{\rm std})_{ij}
O_i(\cdot)O_j^T
=
\frac13\sum_iO_i(\cdot)O_i^T.
\]

The right side is the complete handle class-sum channel. The equality was checked on all sixteen matrix units of the carrier algebra.

Thus the mediator-to-handle map closes at effective Gaussian superoperator level.

## 1. Tight-frame synthesis and analysis

The map

\[
z\longmapsto y=Mz
\]

is the analysis operator of the three-root frame. Its adjoint obeys

\[
M^TM=6I_2,
\]

so, after division by $\sqrt6$, it is an isometric embedding of the active plane into the three-label zero-sum plane.

The reverse product

\[
MM^T=6P_{\rm std}
\]

shows that its image is exactly the standard representation and that the singlet label direction is absent.

This supplies a canonical factorization of the covariance used in the mismatch-to-handle construction:

\[
P_{\rm std}
=M\left(\frac16I_2\right)M^T.
\]

No arbitrary choice of the usual two orthonormal standard-plane basis vectors is needed.

## 2. Pushforward into the handle environment

Let $O_0,O_1,O_2$ be the cyclically aligned whitened handles. The mediator Gaussian induces label correlations

\[
\langle y_iy_j\rangle=(P_{\rm std})_{ij}.
\]

The resulting quadratic carrier channel is

\[
\Phi_M(X)
=\frac13\sum_{i,j}
(P_{\rm std})_{ij}
O_iXO_j^T.
\]

Because

\[
\sum_iO_i=0,
\]

the singlet subtraction in $P_{\rm std}$ vanishes, leaving

\[
\Phi_M(X)
=\frac13\sum_iO_iXO_i^T.
\]

This is the central three-handle class sum of documents 839, 848 and 880.

## 3. What has now closed

The effective chain is exact:

\[
\boxed{
\text{two mediator faces}
\xrightarrow{\text{coherent Jordan closure}}
\text{three-root tight frame}
\xrightarrow{\text{Gaussian pushforward}}
P_{\rm std}
\xrightarrow{\text{handle coupling}}
\mathcal E_{\rm handle}.
}
\]

Every arrow is now represented by an explicit matrix or complete superoperator identity.

The previous arbitrary standard-plane factorization has been replaced by the mediator root synthesis matrix itself.

## 4. Remaining physical assumptions

Three gates remain:

### Isotropic active Gaussian

The mediator-plane fluctuations must have covariance proportional to $I_2$. Documents 911 and 917 provide two possible protection mechanisms—crossed Ward symmetry or complete equal-weight orbit closure—but neither is yet derived microscopically.

### Color contraction

The actual Standard-Model mismatch sector also carries the color augmentation factor. It must be contracted through its unique invariant quadratic form without leaving an additional color Kraus index.

### Cyclic label alignment

The mediator root order and handle conjugacy order must be identified physically. Document 918 proves that the labelled frame map is unique once one orientation and starting label are selected, but gauge covariance alone does not choose them.

## 5. Relation to Jordan recursion

Document 919 derived the third root from the quadratic self-energy and identified its mixed term as Jordan polarization. The present document continues that recursion through Gaussian elimination:

\[
\text{quadratic Feshbach response}
\to
\text{tight-frame covariance}
\to
\text{completely positive handle channel}.
\]

This supplies an explicit multi-level meaning for Jordan-triple recursion: the triple cross term generates the missing relation, and the completed relation frame becomes the environment whose elimination acts on the next carrier rung.

## 6. Stop-everything and falsification criteria

**Gaussian trigger:** derive $\operatorname{Cov}(z)=cI_2$ from the microscopic mediator or boundary action.

**Color trigger:** perform the gauge-singlet color contraction and recover no environment dimension beyond two.

**Alignment trigger:** derive one common orientation convention pairing $g_i$ with $O_i$.

**Full-channel trigger:** reproduce the class-sum superoperator before any fitted Kraus rotation or post-processing.

**Anisotropy falsifier:** the physical mediator covariance is not scalar and no Ward identity restores isotropy.

**Color falsifier:** a residual color label raises the minimal environment dimension from two to four or more.

**Typing warning:** the exact effective superoperator identity is presented as a microscopic Standard-Model derivation before the three gates above close.

## 7. Verdict

| Question | Verdict |
|---|---|
| Does the root frame canonically factor $P_{\rm std}$? | **yes** |
| Does its Gaussian pushforward give the handle class sum? | **yes** |
| Is the equality valid on the complete carrier algebra? | **yes** |
| Is an arbitrary Kraus rotation required? | **no** |
| Are Gaussianity, color contraction and label alignment derived microscopically? | **not yet** |

## 8. Position in the corpus

- [coherent Jordan generation of the third root](919_the_third_a2_relationship_is_the_coherent_two_face_feshbach_self_energy_and_its_cross_term_is_the_jordan_polarization.md)
- [three-way $A_2$ frame](918_the_mediator_root_orbit_multiplicity_edges_and_handle_kraus_operators_are_one_three_way_a2_frame.md)
- [Gaussian mismatch-to-handle channel](../0800-0899/880_isotropic_gaussian_reduction_of_the_signed_multiplicity_mismatch_plane_produces_the_exact_three_handle_class_sum_channel.md)
- [central full-selector class sum](../0800-0899/848_the_quadratic_handle_twirl_is_a_central_class_sum_for_the_full_order_18_selector.md)
- [canonical color-contraction gate closure](922_for_the_canonical_middle_frame_the_color_contraction_gate_is_closed_and_only_physical_cyclic_typing_remains.md)
