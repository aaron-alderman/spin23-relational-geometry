# Gaussian Localization Is Predictive Only After Seed Yukawas Are Constrained

**Date:** 17 October 2026  
**Branches:** B03, B04, B06, B07, B08 and B11  
**Claim status:** exact identifiability and geometric-rank theorem for equal-width Gaussian profiles; realistic wall profiles and algebraic seed selection remain open

## 1. The hierarchy claim needs an identifiability test

Separated wall profiles can make overlap masses exponentially small. That does not by itself explain a hierarchy. If every channel retains an arbitrary Yukawa coefficient, geometry may merely reparameterize the original free matrix.

The correct question is:

> Which relations among masses and mixings survive after all allowed seed couplings are included?

## 2. Equal-width Gaussian model

Let normalized left and right profiles be centered at \(a_i\) and \(b_j\) with common width \(\sigma\). For a constant Higgs background,

\[
O_{ij}
=\int dw\,f_{L,i}(w)f_{R,j}(w)
=\exp\!\left[-\frac{(a_i-b_j)^2}{4\sigma^2}\right].
\]

The effective Yukawa matrix is the Hadamard product

\[
\boxed{Y^{\rm eff}_{ij}=\Lambda_{ij}O_{ij},}
\]

where \(\Lambda\) is the microscopic seed matrix.

## 3. Arbitrary seeds destroy predictivity

Every Gaussian overlap is strictly positive. For any target matrix \(Y^\star\),

\[
\Lambda_{ij}=\frac{Y^\star_{ij}}{O_{ij}}
\]

reconstructs it exactly.

Therefore:

\[
\boxed{
\Lambda_{ij}\ \text{arbitrary}
\quad\Longrightarrow\quad
\text{localization imposes no exact relation on }Y^{\rm eff}.}
\]

The geometry can move hierarchy between \(O\) and \(\Lambda\), but cannot reduce the parameter space.

An “order-one seed” assumption can make localization statistically suggestive, yet it is not a prediction until “order one” is replaced by a measure, symmetry or algebraic constraint.

## 4. A geometric invariant when the seed is universal

If \(\Lambda_{ij}=\lambda\) is common and nonzero, define the logarithmic mixed difference relative to row and column zero:

\[
C_{ij}
=\log|Y_{ij}|
-\log|Y_{i0}|
-\log|Y_{0j}|
+\log|Y_{00}|.
\]

The row-only, column-only and common factors cancel, leaving

\[
\boxed{
C_{ij}
=\frac{(a_i-a_0)(b_j-b_0)}{2\sigma^2}.}
\]

Thus \(C\) is an outer product and

\[
\boxed{\operatorname{rank}C\leq1.}
\]

For three generations, its \(2\times2\) determinant must vanish. This is a genuine falsifiable relation for one-dimensional equal-width localization.

More transverse dimensions replace the scalar product by a sum of outer products and give

\[
\operatorname{rank}C\leq d_\perp.
\]

The logarithmic rank therefore measures the minimum localization dimension only when seed magnitudes are sufficiently constrained.

## 5. Masses determine separations, not the embedding

For one isolated channel with common scale \(M=|\lambda v|\),

\[
m=M\exp\!\left[-\frac{d^2}{4\sigma^2}\right]
\]

implies

\[
|d|=2\sigma\sqrt{\log(M/m)}.
\]

The mass fixes only an absolute separation. Reflection \(d\mapsto-d\), common translation, changes of \(\sigma\), and compensating changes of \(M\) remain degenerate.

For the four one-generation channels, independently movable right-handed centers allow all four masses to be fitted. Sharing the left \(Q\) center between \(u,d\) and the left \(L\) center between \(\nu,e\) does not itself create a cross-channel relation.

## 6. Real geometry does not generate flavor CP

With real profiles and a real universal seed, \(Y_u\) and \(Y_d\) are real matrices. Their Hermitian squares are real symmetric, so their commutator is real antisymmetric. In three dimensions,

\[
\det[H_u,H_d]=0,
\qquad
\operatorname{tr}[H_u,H_d]^3=0.
\]

Localization alone therefore cannot generate the CKM phase in this model. Complex CP data must enter through seed couplings, background holonomy, Berry phases or another oriented structure.

The face-local real Jordan selector remains compatible with such complex flavor data, but does not supply it automatically.

## 7. What would make localization explanatory

At least one of the following is required:

1. Furey/Jordan structure fixes \(\Lambda\) up to a small number of orbit parameters;
2. a discrete geometry fixes the allowed centers and widths;
3. one background field dynamically determines several centers together;
4. a higher-dimensional holonomy supplies constrained complex phases;
5. measured Yukawas satisfy low-rank logarithmic relations not shared by generic matrices.

Without one of these, profile localization is a useful parametrization rather than a theory of flavor.

## 8. Stop-everything and falsification gates

**Rank trigger:** after factoring a source-derived seed matrix, observed Yukawa magnitudes satisfy a stable low-rank logarithmic cross-difference relation.

**Dimension trigger:** the rank determines a small transverse dimension that independently agrees with the wall/Spin\((2,3)\) construction.

**Furey trigger:** the algebra fixes the seed orbit strongly enough that profile positions reduce the physical parameter count.

**CP trigger:** a source-derived holonomy generates the observed complex invariant while preserving the magnitude-rank relation.

**Falsifier:** arbitrary entrywise \(\Lambda_{ij}\) are retained while exponential overlaps are claimed to predict the hierarchy.

## 9. Certificate

The [Gaussian localization identifiability certificate](../../../verification/verify/verify_gaussian_localization_identifiability.mjs) verifies the rank-one logarithmic cross-difference identity, reconstructs an arbitrary target through unconstrained seed couplings, demonstrates reflection degeneracy of fitted masses and confirms vanishing CP-odd commutator invariants for real geometric Yukawas.

## Companion documents

- [Inhomogeneous-Higgs Schur control](238_inhomogeneous_higgs_requires_schur_self_energy_control.md)
- [Exact wall Yukawa Dirac pole](236_colocalized_wall_chiralities_and_higgs_portal_give_exact_dirac_pole.md)
- [Real face carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
- [Universal real-selector CP obstruction](../0000-0099/74_real_selector_cp_violation_obstruction.md)
