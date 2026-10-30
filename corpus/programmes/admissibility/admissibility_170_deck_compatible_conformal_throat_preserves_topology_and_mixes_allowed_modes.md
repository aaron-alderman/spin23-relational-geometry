# A deck-compatible conformal throat preserves topology and mixes allowed modes

**Date:** 30 October 2026

**Status:** exact geometry and quadrature gate closed; curved viscous evolution remains open

**Parent:** [equal-dimension rotation control](admissibility_169_equal_dimension_rotation_control_isolates_the_signed_return.md)

**Evidence and verifier:** [conformal-throat contract](../../../evidence/data/admissibility-klein-conformal-throat-v1.json); [geometry verifier](../../../verification/admissibility/verify_klein_conformal_throat.mjs)

## Result

A throat can be added without confusing local geometry with global topology.
On the common torus cover define

\[
g=e^{2\sigma(x)}(dx^2+dy^2),
\qquad
\sigma(x)=c+\varepsilon\cos 2x.
\]

The period-\(\pi\) profile satisfies

\[
\sigma(x+\pi)=\sigma(x),
\]

so it descends through both return maps:

\[
I(x,y)=(x+\pi,-y),\qquad
R(x,y)=(x+\pi,y).
\]

The same local throat can therefore be tested with either global topology.
Any difference that remains after the metric is matched belongs to the
return law or selected dynamics rather than to an unmatched constriction.

## Area normalization

Choose \(c\) so that the mean area density is one:

\[
\frac1{2\pi}\int_0^{2\pi}e^{2\sigma(x)}\,dx=1.
\]

For \(\varepsilon=0.25\), the numerical normalization is

\[
c=-0.0307748595927407.
\]

The cover area is then

\[
\operatorname{Area}_g=4\pi^2
\]

with relative quadrature error \(9.0\times10^{-16}\). The throat changes
where area is carried without changing the total area budget.

Its maximum-to-minimum linear scale ratio is

\[
e^{2\varepsilon}=e^{1/2}=1.648721\ldots,
\]

and its area-density ratio is

\[
e^{4\varepsilon}=e.
\]

These values make the deformation visible without approaching a metric
pinch or singular throat.

## Curvature closes globally

For a two-dimensional conformal metric,

\[
K=-e^{-2\sigma}\Delta\sigma
=4\varepsilon e^{-2\sigma}\cos 2x.
\]

Because \(dA_g=e^{2\sigma}dx\,dy\),

\[
\int_{\widetilde K}K\,dA_g
=4\varepsilon\int_{\widetilde K}\cos 2x\,dx\,dy
=0.
\]

The numerical residual is \(-1.21\times10^{-15}\). This is the
Gauss--Bonnet result expected for the torus cover and Klein quotient, both of
Euler characteristic zero. The throat redistributes positive and negative
curvature but cannot change the global topological invariant.

This is an important corpus distinction:

\[
\boxed{\text{local curvature may vary while global topology remains fixed}.}
\]

## The two-dimensional conformal surprise

For a scalar test mode \(f\), the Dirichlet numerator is conformally invariant
in two dimensions:

\[
\int |\nabla_gf|_g^2\,dA_g
=\int|\nabla f|^2\,dx\,dy.
\]

The metric still changes the weighted norm

\[
\int f^2\,dA_g=\int f^2e^{2\sigma}\,dx\,dy
\]

and therefore its Rayleigh quotient. The measured test-function values are:

| mode | flat eigenvalue | throat Rayleigh quotient |
|---|---:|---:|
| \(\cos x\cos y\) | 2 | 1.60965845 |
| \(\cos3x\cos y\) | 10 | 9.97518956 |
| \(\sin2x\sin y\) | 5 | 5.15464741 |
| \(\cos2y\) | 4 | 4.00000000 |

These are Rayleigh quotients of declared test functions, not exact curved
eigenvalues. The generalized eigenproblem must still be solved before calling
them a spectrum.

## Geometry mixes only admitted neighbours

The weighted mass matrix gains a normalized cross term

\[
\frac{\langle \cos x\cos y,\cos3x\cos y\rangle_g}
{\|\cos x\cos y\|_g\|\cos3x\cos y\|_g}
=0.24416354.
\]

The period-two throat therefore mixes axial harmonics separated by two,
exactly as its Fourier content predicts. Both modes remain inside the Klein
anti-invariant sector.

By contrast, the measured normalized cross terms between
\(\cos x\cos y\) and the incompatible modes \(\sin2x\sin y\) and
\(\cos2y\) are respectively

\[
3.36\times10^{-19},\qquad1.32\times10^{-18}.
\]

Local geometry opens new relations inside the admissible sector without
breaking the global selector.

## Corpus grammar

- **Carrier:** scalar or fluid modes on the shared cover.
- **Selector:** Klein or rotation return law together with the compatible
  metric.
- **Dual face:** deck-related points, still exchanged exactly after the
  deformation.
- **Relation:** the weighted mass and curved differential operators.
- **Detector:** Rayleigh shifts, allowed cross-mode mass and signed return.

The throat does not overwrite topology. It enriches the relational matrix
within each topological sector.

## Bounds

This model is a closed curved surface, not a three-dimensional pipe with
no-slip walls. A conformal scale modulation is a controlled analogue of a
throat, not yet a fabrication drawing. Moreover:

- scalar Laplace--Beltrami geometry is not the complete viscous vector
  operator;
- test-function Rayleigh quotients are not solved eigenvalues;
- curvature-dependent velocity terms and pressure projection remain to be
  implemented;
- the throat is static and has no moving-wall work port.

## Next gate

Construct the finite generalized eigenproblem

\[
Ka=\lambda Ma
\]

in separately projected Klein and rotation bases, where \(K\) is the
Dirichlet stiffness matrix and \(M\) is the throat-weighted mass matrix.
Then insert the resulting curved linear operator into the existing nonlinear
solver while preserving its energy ledger.

Only after that operator-level test should a helical connection or
three-dimensional torsion be added.

The finite operator gate is now closed by the
[shared-versus-topology-sensitive throat spectrum](admissibility_171_throat_spectrum_splits_into_shared_and_topology_sensitive_blocks.md).
Four Ritz values coincide because the quotients share one mode block, while
four separate because their complementary admissible blocks differ.

## Verdict

The first throat gate closes. A smooth constriction can redistribute
curvature, shift response scales and mix permitted modes while leaving both
Gauss--Bonnet topology and the orientation return law intact. Geometry
modifies the dynamics available inside an admissible sector; it does not
silently replace the sector.
