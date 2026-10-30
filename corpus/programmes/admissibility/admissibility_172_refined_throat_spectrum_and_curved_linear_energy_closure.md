# Refined throat spectrum and curved linear energy closure

**Date:** 30 October 2026

**Status:** scalar generalized-operator branch closed under basis refinement and exact linear dissipation; vector-Laplacian choice is now the blocking gate

**Parent:** [shared and topology-sensitive throat spectrum](admissibility_171_throat_spectrum_splits_into_shared_and_topology_sensitive_blocks.md)

**Evidence and executable:** [generalized-spectrum contract](../../../evidence/data/admissibility-klein-throat-generalized-spectrum-v1.json); [refinement and evolution verifier](../../../verification/admissibility/verify_klein_throat_generalized_spectrum.mjs)

## Result

The low finite Ritz spectrum survives basis doubling, and the resulting
generalized operator produces an exact curved linear energy ledger.

Each quotient basis is enlarged from four to eight axial modes per transverse
block:

\[
\dim V_h:8\longrightarrow16.
\]

The largest relative change among the lowest four Ritz values is

\[
5.14\times10^{-5}
\]

for both quotient sectors, below the declared \(10^{-4}\) gate.

## Refined low spectra

| index | Klein | rotation |
|---:|---:|---:|
| 1 | 1.59147759 | 0.97197942 |
| 2 | 5.02688121 | 5.02688121 |
| 3 | 10.32046075 | 5.48676369 |
| 4 | 17.58041140 | 17.58041140 |

The shared-versus-distinct pattern is stable under the enlargement. The
second and fourth values remain common because they belong to the shared
even-axial/sine block; the first and third remain selector-sensitive.

This is still finite Ritz convergence rather than a complete spectral proof.
It is sufficient to remove the most immediate basis-truncation ambiguity from
the low response.

## Curved linear evolution

The throat operator evolves coefficients by

\[
M\dot a=-\nu Ka.
\]

After Cholesky reduction, its generalized modes evolve independently:

\[
c_j(t)=c_j(0)e^{-\nu\lambda_jt}.
\]

The natural curved energy is

\[
E(t)=\frac12a(t)^TMa(t),
\]

and its dissipation law is

\[
\frac{dE}{dt}=-\nu a(t)^TKa(t).
\]

Both sectors begin from their first flat-normalized basis carrier, rescaled
to equal throat-weighted energy \(E(0)=0.5\). With
\(\nu=0.01\) and \(t=2\):

| record | Klein | rotation |
|---|---:|---:|
| final energy | 0.46887650 | 0.48044182 |
| integrated dissipation | 0.03112350 | 0.01955818 |
| energy-identity residual | \(-2.15\times10^{-16}\) | \(-5.59\times10^{-16}\) |

The first coordinate carrier excites eight generalized modes in each sector
because the throat-weighted mass matrix mixes compatible axial harmonics.

The different decay totals do not by themselves isolate orientation. The two
initial basis carriers belong to different selector-specific families. The
strong result is instead that each sector's decay is predicted by the same
geometry-derived \(M,K\) pair that produced its refined spectrum, with no
additional damping fit.

## What has closed

The scalar curved branch now contains:

1. a deck-compatible, area-normalized throat;
2. Gauss--Bonnet closure;
3. symmetry-preserving weighted mode mixing;
4. a positive generalized mass/stiffness problem;
5. a shared calibration block and differential spectral block;
6. low-spectrum basis refinement;
7. exact curved linear energy dissipation.

This is a complete scalar operator ladder from geometry to a time-dependent
detector record.

## Why the next step is genuinely different

A fluid velocity is a tangent vector or one-form, not a scalar. On a curved
surface, “the Laplacian” can mean related but nonidentical operators:

- the Hodge Laplacian on one-forms;
- the Bochner or rough Laplacian with Ricci correction;
- the deformation-tensor viscosity used in surface-fluid models.

Boundary conditions and the pressure/Leray projection further affect the
operator. Choosing among these is a physical constitutive declaration, not a
numerical implementation detail.

The scalar calculation cannot decide that choice. Reusing its eigenvalues as
fluid decay rates without a declared vector operator would collapse types.

## Next gate

Construct a convention ledger for surface Navier--Stokes viscosity:

1. write each candidate operator and its energy identity;
2. state when Weitzenböck curvature terms make two conventions equivalent;
3. test whether each commutes with the Klein deck action;
4. identify which convention follows from a thin three-dimensional fluid
   layer, which follows from intrinsic one-form diffusion, and which is most
   realizable experimentally;
5. choose one before extending the nonlinear solver.

This literature-and-operator decision must precede any claim of curved
Navier--Stokes simulation.

The three-way decision is now resolved in the
[surface-viscosity energy and kernel atlas](admissibility_173_three_surface_viscosities_separate_by_curvature_and_kernel.md).
All conventions are coherent, but Hodge protects harmonic circulation,
deformation protects Killing motion and Bochner protects parallel fields.

## Verdict

The scalar throat programme is exhausted at the appropriate boundary. Its
low spectrum refines, and its generalized evolution closes the curved energy
ledger exactly. Further progress requires declaring what physical viscosity
means for a tangent fluid carrier; it cannot be obtained by silently
relabeling the scalar Laplace--Beltrami operator.
