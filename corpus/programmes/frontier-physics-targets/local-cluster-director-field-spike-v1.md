# No local Galactic dog-ear is detected in the first cluster-director field spike

## Question

If the Galactic neighbourhood is a three-dimensional hypersurface in a four-dimensional ambient space, could nearby clusters reveal spatial variation of its local orientation—a smooth bend, a sharp paper-like dog-ear, or a twist?

The relevant object would be a local normal or three-plane field, not a single M44 angle. For an unoriented candidate direction (u(x)), the sign-independent representation is

\[
Q(x)=u(x)u(x)^T.
\]

This spike asks a prior question: do ordinary Gaia residual-gradient directors across nearby clusters support any coherent spatial field at all?

## Frozen sample and method

Before inspecting any fitted directions, eight well-populated nearby clusters were fixed from the corrected Hunt--Reffert Gaia DR3 catalogue: Hyades, Coma Berenices, Pleiades, Alpha Persei, IC 2391, IC 2602, NGC 2451A and M44. Members must lie within the catalogue tidal radius, have membership probability at least 0.5, positive parallax, RUWE at most 1.4 and no Gaia non-single-star flag. The RV analysis additionally requires uncertainty at most 5 km/s and applies a three-robust-sigma residual cut.

For each cluster, one common space velocity is fitted from proper motions and parallaxes. Its predicted astrometric radial velocity is subtracted from Gaia's spectroscopic RV. A three-dimensional linear residual gradient then supplies an ordinary candidate director. This is not a (T_1) identification.

Three models are compared by leaving out one entire cluster:

1. a constant or flat mean director tensor;
2. a smooth affine field (Q(x));
3. a two-region field separated by a fitted plane, the smallest dog-ear surrogate.

## Result

The flat model generalizes best.

| model | mean held-out projector-component squared error | median error |
|---|---:|---:|
| flat | 0.5313 | 0.3395 |
| smooth affine | 0.5980 | 0.5096 |
| two-region crease | 0.7730 | 0.7919 |

The more structured hypotheses fail in the direction opposite to discovery: smooth bending worsens held-out prediction, and the crease model is worst. Individual directions are also fragile. Maximum fold-to-full direction changes range from 19.96 degrees for Hyades to 76.62 degrees for NGC 2451A. The homogeneous-catalogue M44 direction is 26.29 degrees from the previously frozen M44 direction derived from a different membership construction.

## Interpretation

This pass finds no evidence for a smooth local bend or paper-dog-ear transition. It does not show that the four-dimensional picture is false. It shows that the current ordinary residual-gradient proxies are not yet precise or coherent enough to support derivatives of a frame field.

Calling the present variation “curl” would skip two gates:

- the data-derived directors require a source-derived lift into four-dimensional normals;
- the estimated field must first generalize better than a constant field.

Neither condition is met. Frobenius, holonomy and crease-location calculations are therefore held rather than fitted post hoc.

The next admissible step is to improve the per-cluster directions using full astrometric covariance and independent spectroscopy, enlarge the preregistered spatial sample, and repeat the whole-cluster holdout. Only a stable non-flat field should graduate to curvature or integrability tests.

## Sources

- E. L. Hunt and S. Reffert, [*Improving the open cluster census. II. An all-sky cluster catalogue with Gaia DR3*](https://doi.org/10.1051/0004-6361/202346285), *Astronomy & Astrophysics* **673** (2023), A114.
- CDS/VizieR, [J/A+A/673/A114 corrected cluster and member tables](https://vizier.cds.unistra.fr/local//viz-bin/VizieR-3?-source=J/A%2BA%2F673%2FA114).
