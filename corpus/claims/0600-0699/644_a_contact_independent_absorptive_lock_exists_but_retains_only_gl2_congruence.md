# A Contact-Independent Absorptive Lock Exists but Retains Only \(GL(2,\mathbb R)\) Congruence

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B05, B07, B08 and B11  
**Claim status:** exact positive-metric construction and exact symmetry counterexample; microscopic spectral matrices remain open  
**Certificate:** [verify_contact_independent_absorptive_spd_lock.mjs](../../../verification/verify/verify_contact_independent_absorptive_spd_lock.mjs)

## Executive result

The contact-scheme obstruction has a mathematically clean fallback. For two causal response matrices, retain only

\[
Y_a(z)=\operatorname{Im}Z_a(z)>0.
\]

The positive-definite matrices carry the affine-invariant distance

\[
\boxed{
d_{\rm SPD}(Y_{\rm top},Y_{\rm chi})^2
=\sum_{i=1}^2
\log^2\lambda_i(Y_{\rm top}^{-1}Y_{\rm chi}).
}
\]

This distance is positive, vanishes exactly when the absorptive matrices coincide, and is unaffected by either common or independent real contact terms.

The cost is exact and unavoidable:

\[
\boxed{
\text{scheme independence from }\operatorname{Im}Z
\quad\Longrightarrow\quad
GL(2,\mathbb R)\text{ congruence, not full }Sp(4,\mathbb R).
}
\]

This gives the programme a viable observable locking functional while sharply lowering the associated physical symmetry claim.

## 1. The positive absorptive geometry

The cone of positive-definite real symmetric matrices is

\[
Sym_2^+(\mathbb R)\cong GL(2,\mathbb R)/O(2).
\]

Its standard affine-invariant metric is

\[
ds^2=\operatorname{Tr}\bigl(Y^{-1}dY\,Y^{-1}dY\bigr).
\]

The corresponding distance is the generalized-eigenvalue formula above. It has the diagonal congruence invariance

\[
d_{\rm SPD}(AY_1A^T,AY_2A^T)
=d_{\rm SPD}(Y_1,Y_2),
\qquad A\in GL(2,\mathbb R).
\]

The certificate verifies this on noncommuting positive matrices and a nonsymmetric invertible \(A\).

## 2. Exact contact independence

Any real symmetric finite counterterm acts as

\[
Z_a(z)\mapsto Z_a(z)+Q_a,
\qquad Q_a=Q_a^T\in Sym_2(\mathbb R).
\]

Therefore

\[
\operatorname{Im}(Z_a+Q_a)=\operatorname{Im}Z_a.
\]

Unlike the full-point Siegel distance, the absorptive distance is invariant even when \(Q_{\rm top}\) and \(Q_{\rm chi}\) are chosen independently. It is consequently a candidate spectral observable rather than a subtraction-dependent comparison.

## 3. Why full \(Sp(4,\mathbb R)\) is lost

Fractional symplectic transformations do not act on \(Y=\operatorname{Im}Z\) independently of \(X=\operatorname{Re}Z\). The failure is already exact on the scalar slice.

Take

\[
Z_1=iI_2,
\qquad
Z_2=(1+i)I_2.
\]

They have identical imaginary parts, so their absorptive distance is zero. Under the symplectic Fourier inversion

\[
Z\mapsto-Z^{-1},
\]

their imaginary scales become

\[
1,qquad\frac12.
\]

The new absorptive distance is

\[
d_{\rm SPD}=\sqrt2\log2>0.
\]

Thus no functional depending only on these two imaginary matrices can simultaneously reproduce this metric and remain invariant under the full fractional group.

## 4. Revised meaning of the \(Spin(2,3)\) pole

The result separates two legitimate geometries:

| Geometry | Data | Exact symmetry | Contact independent? |
|---|---|---|---:|
| Siegel | full \(Z=X+iY\) | \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) | only after relative-contact fixing |
| absorptive SPD | \(Y\) alone | \(GL(2,\mathbb R)\) congruence | yes |

The first is the larger causal-domain geometry. The second is presently the cleaner candidate for a directly spectral physical lock.

This does not eliminate \(Spin_0(2,3)\). It relocates it to a completion of the observable absorptive geometry that also tracks dispersive contacts and their transformation law.

## 5. Relation to the topology-source problem

The new functional still requires

\[
Y_{\rm top}(z)>0,
\qquad
Y_{\rm chi}(z)>0.
\]

[Document 643](643_the_bare_topology_auxiliary_kernel_lies_at_infinite_siegel_boundary_distance.md) showed that the bare auxiliary contact kernel has \(Y_{\rm top}=0\). Hence the decisive source problem remains: construct a dressed topology correlator with full-rank positive spectral support from existing Standard-Model composites.

Once such a correlator exists, the absorptive lock can be evaluated without first solving the relative-contact problem.

## 6. Stop-everything criteria

Stop calling the absorptive functional a full \(Spin(2,3)\)-invariant lock if:

1. its input is only \(\operatorname{Im}Z\);
2. fractional generators with nonzero lower-left block are admitted;
3. real dispersive data are not transformed alongside the imaginary part.

Stop the absorptive-lock branch altogether if:

1. the topology spectral matrix is rank deficient at every frequency;
2. no common frequency or momentum variable types the two response sectors;
3. positivity holds only after a nonphysical regulator;
4. the resulting distance is not tied to an operational spectral measurement.

## 7. Next gates

1. Construct full-rank \(Y_{\rm top}(\omega)\) from the gauge-invariant source multiplets of [document 628](628_gauge_invariant_two_face_sources_form_five_h2r_multiplets_but_one_redundant_image_is_null.md).
2. Determine whether total-stress, \(B-L\)-current or Higgs-dressed scalar correlators supply two non-collinear spectral channels.
3. Compare \(Y_{\rm top}\) and \(Y_{\rm chi}\) only after matching Lorentz tensor structure and spectral variable.
4. Test whether dispersion relations reconstruct enough of \(X\) from \(Y\) to recover a controlled larger symmetry after subtraction data are supplied.

## Reproducibility

```powershell
node scripts\verify_contact_independent_absorptive_spd_lock.mjs
```
