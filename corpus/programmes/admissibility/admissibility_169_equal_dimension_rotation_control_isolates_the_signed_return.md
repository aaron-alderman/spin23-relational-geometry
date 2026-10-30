# Equal-dimension rotation control isolates the signed return

**Date:** 30 October 2026

**Status:** matched aggregate control closed; isospectral and curved-domain controls remain open

**Parent:** [finite-amplitude Klein flow](admissibility_168_finite_amplitude_klein_flow_closes_the_flat_domain_gate.md)

**Evidence and executable:** [simulation contract](../../../evidence/data/admissibility-klein-pseudospectral-flow-v1.json); [joint Klein/rotation verifier](../../../verification/admissibility/verify_klein_pseudospectral_flow.mjs)

## Result

The first orientation-preserving control is now included in the same solver.
It replaces the Klein deck map

\[
I(x,y)=(x+\pi,-y)
\]

by the half-translation

\[
R(x,y)=(x+\pi,y).
\]

The Klein streamfunction is anti-invariant under \(I\); the rotation-control
streamfunction is invariant under \(R\). Both evolutions use the same
viscosity, final time, Runge--Kutta method, Fourier cutoff and diagnostic
pipeline.

## Dimension matching is not automatic

At \(K=8\), the zero-mean Klein anti-invariant sector has 144 real degrees of
freedom. The even-axial rotation sector has 152. Calling those controls
“matched” would therefore be false.

The control removes four reality-conjugate high-frequency pairs,

\[
|k|=8,\qquad |m|\in\{7,8\},
\]

leaving 144 real degrees of freedom. The mask is fixed before evolution and
is applied as an ordinary Galerkin projection. Spectral-boundary energy ends
at \(7.29\times10^{-8}\), so those removed corner modes are not carrying a
material fraction of the final energy.

## Initial invariants are matched

The Klein initial state mixes Laplacian eigenvalues \(2\) and \(5\). The
rotation quotient excludes the required odd-axial eigenvalue-\(2\) mode, so a
fully isospectral initial state is unavailable inside this simple control.

Instead the rotation state mixes eigenvalues \(4\) and \(5\) with energy
fractions \(6/7\) and \(1/7\). This gives exactly

\[
E(0)=1,\qquad Z(0)=\frac{29}{7}=4.142857142857\ldots,
\]

matching the Klein run's initial energy and enstrophy. This is an
aggregate-invariant match, not an isospectral match. Final scalar differences
cannot therefore be attributed uniquely to topology.

## Scalar budgets nearly coincide

At \(t=0.4\):

| record | Klein | rotation |
|---|---:|---:|
| energy | 0.9674627743 | 0.9674045863 |
| enstrophy | 3.9910768388 | 4.0066445971 |
| energy-ledger residual | \(-2.31\times10^{-12}\) | \(4.04\times10^{-12}\) |

Both sectors remain closed under their raw nonlinear right-hand sides and
both dissipate without an unexplained work port. Total energy is therefore a
poor topology detector in this experiment.

## The spectral and signed records separate

The Klein run develops the predicted odd-axial daughters

\[
(1,0),(3,0),(1,2),(3,2).
\]

Every one is identically absent in the rotation control because its sector
contains only even axial harmonics. The rotation interaction instead creates
its own \((2,3)\) daughter with amplitude

\[
0.08339447.
\]

More decisively, the one-lap transverse return is

\[
\begin{array}{rcl}
\text{Klein:}&u_y(x+\pi,-y)&=-u_y(x,y),\\
\text{rotation:}&u_y(x+\pi,y)&=+u_y(x,y).
\end{array}
\]

This sign is fixed by the return law rather than inferred from a small
difference between dissipative scalars. Squaring the response erases it in
both cases.

## Interpretation

The comparison supplies three levels of detector:

1. **weak:** total energy and enstrophy, which barely separate;
2. **intermediate:** daughter-mode accessibility, which separates the
   interaction graphs but also reflects their different spectra;
3. **strong:** signed one-lap return, which directly reads the
   orientation-reversing versus orientation-preserving identification.

This ranking matters experimentally. A pressure drop or total dissipated
power may show almost nothing even when a phase-sensitive or directional
detector gives an exact sign distinction.

## Bounds

The control is equal-dimensional and matches the first two quadratic
invariants, but it is not isospectral. The absence of the Klein
eigenvalue-\(2\) carrier from the rotation sector is itself part of the
topological spectral difference, yet it prevents a clean claim that every
later scalar difference is caused solely by orientation.

A stronger control would pair finite spectral windows by an explicit
isospectral transplantation or optimize two initial ensembles to match a
larger set of spectral moments. That is optional for the signed-return test,
whose opposite multiplier follows exactly from the declared maps.

## Next gate

The flat quotient branch is now sufficient for its purpose. The next useful
move is to introduce geometry one variable at a time:

1. add a smooth conformal throat metric while retaining the same deck map;
2. compare throat-off and throat-on within each topology;
3. preserve matched area, initial invariants and forcing;
4. track whether curvature changes only amplitudes or also creates new
   symmetry-allowed couplings;
5. keep the signed return detector as the invariant topology control.

Torsion and a three-dimensional tube should follow only after the
two-dimensional throat metric passes this test.

The first geometry gate is now closed by the
[deck-compatible conformal throat](admissibility_170_deck_compatible_conformal_throat_preserves_topology_and_mixes_allowed_modes.md).
It preserves area and Gauss--Bonnet closure while opening only
symmetry-compatible weighted mode couplings.

## Verdict

The equal-dimension rotation control closes the principal ambiguity of the
flat-domain sprint. Nonorientability is not best detected through a tiny
change in total dissipation. It is detected through the modes the return law
admits and, most cleanly, through the sign acquired by a directional carrier
after one traversal.
