# Frontier Parallel 4d: The Nambu-to-Boundary Bridge Is Either Covariantly Rotating or Quadratic

**Date:** 18 October 2026  
**Status:** exact (2\times2) intertwiner classification

## Result

The two surviving real-selector mechanisms cannot be connected by a generic linear map.

The charged Nambu fixed plane carries the nontrivial real rotation representation

\[
R(q\theta)\in SO(2),
\]

whereas a gauge-neutral boundary response carries the trivial representation. A real-linear gauge intertwiner (S) would have to obey

\[
S R(q\theta)=S
\]

for every (	heta). Differentiating at the identity gives

\[
SJ=0,
\qquad
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}.
\]

Since (J) is invertible,

\[
\boxed{S=0.}
\]

Thus there is no invertible linear gauge-equivariant bridge from a charged Nambu contact plane to a neutral boundary contact plane.

Two honest exits remain:

1. the boundary retains the same rotating real-bundle connection;
2. the map to observables is gauge-invariant and quadratic, requiring at least two charged faces.

## 1. Covariantly rotating boundary

Suppose the boundary plane transforms by the same (R(q\theta)). Then an intertwiner obeys

\[
SJ=JS.
\]

Every solution is

\[
S=aI+bJ.
\]

Metric preservation gives

\[
a^2+b^2=1,

\]

so complex structure plus metric alone leaves a (U(1)) torsor.

The Nambu plane also has a natural reflection inherited from particle-hole exchange restricted to the fixed plane,

\[
D=\operatorname{diag}(1,-1),
\qquad
DR(\theta)D=R(-\theta).
\]

The local boundary construction uses the same reflection. Requiring

\[
SD=DS

\]

forces (b=0), hence

\[
\boxed{S=\pm I.}
\]

If the target rotation orientation is reversed, the corresponding solutions are

\[
\boxed{S=\pm D.}
\]

This exactly reproduces the recurring pattern

\[
\text{complex/rotation intertwiner }U(1)
+\text{matched real reflection}
\longrightarrow\{\pm1\}.
\]

It also matches the independent Peirce-to-selector classification in [document 916](916_the_neutral_peirce_to_selector_intertwiner_is_a_u1_torsor_collapsing_to_two_signs_when_real_structure_is_preserved.md).

## 2. Gauge-neutral quadratic bridge

If the target really is gauge neutral, the map must factor through gauge invariants.

For one charged complex mode (z), the degree-two invariant algebra begins with only

\[
|z|^2.
\]

That is one real coordinate and cannot carry the two-dimensional contact Kantor system.

For two equally charged faces (z_1,z_2), the Hermitian Gram matrix

\[
G_{ij}=\bar z_i z_j
\]

is gauge invariant. If an antiunitary or common-spurion theorem aligns its cross term on one real axis, then

\[
G\in H_2(\mathbb R)_+.
\]

The real two-face amplitude plane can carry the contact Kantor product, while its symmetric Gram observable is the Jordan carrier. This is precisely the level at which Higgs dressing is useful: it supplies two operators of matching gauge type before the common phase is quotiented.

## 3. Updated physical picture

The admissible chain is no longer a linear restriction of charged matter:

\[
\begin{array}{c}
\text{two Higgs-dressed equal-charge faces}\\
\downarrow\ \text{Nambu/CAR realification or common antiunitary}\\
\text{rotating real two-plane}\\
\downarrow\ \text{quadratic Gram/response map}\\
H_2(\mathbb R)_+\ \text{neutral Jordan observable}.
\end{array}
\]

The contact (K)-line belongs to the oriented real amplitude plane. The Jordan determinant belongs to its symmetric gauge-invariant Gram shadow. They are related, but they are not the same representation.

This is a disciplined version of “one carrier, two faces, three relationships”: the two-face amplitudes are the carrier, their antisymmetric area is the contact/orientation datum, and their three symmetric Gram components form the Jordan observable.

## 4. Remaining obstruction

The quadratic Gram map forgets orientation:

\[
(z_1,z_2)\mapsto G

\]

is invariant under a simultaneous orthogonal reflection of the real amplitude frame. Therefore the local (K)-sign does not descend into (G) by itself.

A measurable orientation witness must retain interference, a boundary normal, a Pfaffian sign, or another pseudoscalar datum alongside the Gram response. This is where the boundary reflection and Walsh/flux witness must enter.

## 5. Branch decision

- **Linear charged-to-neutral bridge:** closed exactly.
- **Rotating real-bundle bridge:** open and unique up to signs once the reflection is matched.
- **Quadratic two-face bridge:** structurally viable and gauge invariant; phase alignment and orientation retention remain open.
- **One-face quadratic bridge:** closed by dimension.

The next calculation should use the already defined Higgs-dressed two faces and ask whether their Nambu/CAR conjugation and the boundary reflection produce the same (D) before forming the Gram matrix. If yes, the sign can survive as an attached orientation line even though the Gram carrier alone forgets it.

## 6. Reproduction

```powershell
node scripts/classify_frontier_kantor_nambu_boundary_intertwiners.mjs
```

The certificate proves the zero-dimensional charged-to-neutral linear Hom space, classifies the rotating isometries, shows reflection matching reduces them to (pm I) or (pm D), and verifies why one charged mode has too few quadratic invariants while two faces produce a positive real Gram example.

## Dependencies

- [Real-subbundle selector classification](frontier_parallel_kantor_04_real_subbundle_selector_classification.md)
- [Local real boundary interface](908_a_local_real_interface_supplies_the_antiunitary_sideband_twist_and_closes_the_boundary_monodromy_model.md)
- [Antiunitary/common-spurion alignment criteria](130_antiunitary_and_common_spurion_alignment_criteria.md)

