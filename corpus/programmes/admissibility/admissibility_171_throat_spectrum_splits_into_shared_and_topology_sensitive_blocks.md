# The throat spectrum splits into shared and topology-sensitive blocks

**Date:** 30 October 2026

**Status:** finite generalized eigenproblem closed with exact block attribution; curved vector viscosity remains open

**Parent:** [deck-compatible conformal throat](admissibility_170_deck_compatible_conformal_throat_preserves_topology_and_mixes_allowed_modes.md)

**Evidence and executable:** [generalized-spectrum contract](../../../evidence/data/admissibility-klein-throat-generalized-spectrum-v1.json); [independent Ritz verifier](../../../verification/admissibility/verify_klein_throat_generalized_spectrum.mjs)

## Result

The throat response is now an operator calculation rather than a collection
of isolated Rayleigh quotients. In separately projected eight-dimensional
bases, the verifier assembles

\[
Ka=\lambda Ma,
\]

where \(K\) is the conformally invariant Dirichlet stiffness matrix and \(M\)
is the area-normalized throat-weighted mass matrix.

Cholesky reduction produces the ordinary symmetric problem

\[
L^{-1}KL^{-T}b=\lambda b,\qquad M=LL^T.
\]

The maximum generalized residual is \(2.87\times10^{-14}\). The mass matrices
are symmetric, positive definite and symmetry-blocked; their smallest
eigenvalues are \(0.6304\) in the Klein basis and \(0.5939\) in the rotation
basis.

## Finite Ritz spectra

At throat strength \(\varepsilon=0.25\), the computed values are:

| index | Klein | rotation |
|---:|---:|---:|
| 1 | 1.59147760 | 0.97197943 |
| 2 | 5.02688138 | 5.02688138 |
| 3 | 10.32064774 | 5.48679703 |
| 4 | 17.58131530 | 17.58131530 |
| 5 | 26.97493174 | 17.66192029 |
| 6 | 38.44707001 | 38.44707001 |
| 7 | 56.66083877 | 41.39595185 |
| 8 | 74.58849921 | 74.58849921 |

These are finite-basis Ritz values, not the complete spectrum of the curved
surface.

## The useful structure is shared plus distinct

Four values coincide across the two quotients:

\[
5.02688138,\quad17.58131530,\quad38.44707001,\quad74.58849921.
\]

They arise from the common family

\[
\sin(2nx)\sin y,\qquad n=1,2,3,4,
\]

which satisfies both the Klein anti-invariance rule and the rotation
even-axial rule.

The remaining four values differ. Their bases are:

\[
\begin{array}{ll}
\text{Klein:}&\cos((2n+1)x)\cos y,\\
\text{rotation:}&\cos(2nx)\cos y.
\end{array}
\]

The same throat mass profile acts on different admissible carrier families.
The result is therefore not “all modes know the topology.” It is:

\[
\boxed{
\text{shared admissible block}\to\text{shared spectral response},
\qquad
\text{different admissible block}\to\text{different response}.
}
\]

This is a precise local/global factorization.

## The throat preserves the blocks

The largest mass-matrix coupling between the cosine-transverse and
sine-transverse families is below \(5.3\times10^{-18}\) in both sectors. The
metric therefore mixes axial neighbours within a block but does not erase the
selector that separates the blocks.

This provides a useful detector strategy:

1. use a shared eigenvalue as an internal calibration of metric strength,
   viscosity and timing;
2. use a topology-sensitive eigenvalue as the differential record;
3. require both to be predicted by the same \(K,M\) pair.

The shared channel prevents a mismatch in material or throat geometry from
being misreported as topology.

## Flat-limit check

At \(\varepsilon=0\), \(M\) returns to the identity in the normalized basis
and the generalized values recover the ordinary Fourier eigenvalues. Across
both bases, the maximum flat-limit error is

\[
5.31\times10^{-12}.
\]

The curved calculation therefore joins continuously to the already verified
flat sector.

## Corpus grammar

- **Carrier:** the finite projected mode basis.
- **Selector:** the quotient return law deciding which basis exists.
- **Shared face:** the even-axial/sine block admitted by both selectors.
- **Distinct face:** odd-axial/cosine versus even-axial/cosine blocks.
- **Relation:** the common throat-weighted mass matrix.
- **Detector:** paired shared and differential Ritz values.

The paired detector is stronger than measuring only the shifted lowest mode.
It asks whether the same geometry explains both what remains invariant and
what separates.

## Bounds

The calculation is scalar and finite-dimensional. It does not yet supply:

- a complete spectral convergence study under basis enlargement;
- the Hodge or deformation Laplacian on velocity one-forms;
- curvature terms required by the chosen surface Navier--Stokes convention;
- nonlinear evolution using \(M^{-1}K\);
- no-slip walls or a three-dimensional tube.

## Next gate

Enlarge each symmetry block from four to at least eight axial modes and check
the low Ritz values under basis refinement. Then use the converged
generalized operator in a linear viscous evolution,

\[
M\dot a=-\nu Ka,
\]

and verify the curved energy law

\[
\frac{d}{dt}\frac12a^TMa=-\nu a^TKa.
\]

That is the last scalar-operator step before a declared vector-Laplacian
choice becomes unavoidable.

The scalar step is now closed by the
[refined spectrum and curved linear energy witness](admissibility_172_refined_throat_spectrum_and_curved_linear_energy_closure.md).
The lowest four values pass basis doubling, and \(M\dot a=-\nu Ka\) closes
its energy identity without an added damping fit.

## Verdict

The generalized throat gate closes with a sharper result than a generic
spectral shift. The response decomposes into a shared calibration block and a
topology-sensitive block. This supplies the experiment with an internal
control and shows exactly where the global return law enters an otherwise
common local geometry.
