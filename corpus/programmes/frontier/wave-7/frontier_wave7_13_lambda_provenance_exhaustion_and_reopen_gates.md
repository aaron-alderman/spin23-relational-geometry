# Frontier Wave 7.13: Provenance Exhaustion for the Wall–Selector Coupling

**Date:** 24 October 2026  
**Status:** current-corpus exhaustion theorem; finite reopen gates

## Verdict

The effective wall-selector coupling

\[
V_{\rm bridge}=-\lambda\,w\,\chi(P,Y)
\]

is symmetry legal and produces exact oriented selection, but the current corpus does not derive a nonzero, fixed \(\lambda\) from a microscopic source.

The available routes separate cleanly:

\[
\boxed{
\begin{array}{c|c}
\text{route}&\text{current result}\\ \hline
\text{factorized wall/face carrier}&\lambda=0\\
\text{minimal gauge-linked wall}&\lambda=0\text{ by squared-operator factorization}\\
\text{anomaly inflow}&\text{does not fix the local bridge}\\
\text{Peirce}\to\text{sterile linear map}&\operatorname{Hom}=0\\
\text{charge-correct quadratic repair}&\text{opposite wall rays collapse projectively}\\
\text{full-wall scalar completion}&\lambda\text{-type terms allowed but freely renormalized}\\
\text{material/analogue interface}&\lambda\text{ measurable, not universal}
\end{array}}
\]

Thus the generic mechanism is feasible, but the proposed source-native fundamental coefficient is not presently predicted.

## 1. Factorized wall response

[The wall-orientation theorem](../../lane-expansion/programme_lane_expansion_06_wall_reversal_flips_helicity_but_not_the_spin_summed_h2r_face_response.md) has carrier

\[
\mathcal H_{\rm face}\otimes
\mathcal H_{\rm spin}\otimes
\mathcal H_{\rm internal}.
\]

In the reference construction, the factors commute. Wall chirality lives in the spin factor and the selector response lives in the face factor. The face-only response is therefore independent of wall sign.

For the bridge coefficient this means

\[
\boxed{\lambda_{\rm factorized}=0.}
\]

This is not a small-coupling approximation. It is exact until a declared interaction couples the factors.

## 2. Minimal gauge loading does not generate the bridge

[The gauge-linked wall Hamiltonian](../../../claims/0200-0299/232_gauge_linked_wall_hamiltonian_preserves_covariance_and_passivity.md) is

\[
H_{\rm DW}[U]
=H_\perp\otimes I
+\Gamma_\perp\otimes H_U,
\]

with

\[
H_{\rm DW}[U]^2
=H_\perp^2\otimes I
+I\otimes H_U^2.
\]

The cross terms cancel by grading anticommutation. Gauge links preserve covariance and passivity but do not create a transverse-wall/face pseudoscalar coupling in this minimal construction.

Gauge loading is therefore compatible with a future bridge, but it is not its origin.

## 3. Anomaly inflow does not fix \(\lambda\)

The corpus's one-generation wall anomaly audit finds cancellation of the complete perturbative Standard Model anomaly. Inflow may be required for other boundary realizations or global phases, but anomaly matching constrains gauge variation and quantized topological terms. It does not, in the present construction, fix the finite coefficient of the gauge-invariant local scalar \(w\chi(P,Y)\).

Consequently,

\[
\boxed{
\text{anomaly consistency}\not\Rightarrow
\text{a predicted nonzero }\lambda.
}
\]

Invoking inflow without an explicit descent term producing the bridge would only rename the missing calculation.

## 4. The specific Peirce-to-sterile route is closed

[Claim 1463](../../../claims/1400-1499/1463_the_rephasing_equivariant_peirce_to_majorana_linear_hom_vanishes_and_every_charge_two_repair_collapses_the_wall_pair.md) restores the omitted sterile-rephasing weights and proves

\[
\operatorname{Hom}_{U(1)_N\times G_{\rm SM}\times Spin_\partial\times\mathbb Z_2}
(V_\nu,L^{-2})=0.
\]

The lowest charge-correct repair is quadratic. But for the two wall-selected source rays \(z\) and \(iz\),

\[
Q(iz)=-Q(z),
\]

and the target Majorana phase is projective, so the two images are the same ray.

Therefore the present one-line Peirce carrier cannot transmit the wall orientation into the sterile Majorana projector. In this declared channel, a nonzero orientation-distinguishing \(\lambda\) is not merely uncalculated; it is ruled out.

## 5. The full-wall theory permits but does not predict cross-coupling

[Claim 1465](../../../claims/1400-1499/1465_the_full_wall_reader_has_an_exact_positive_stability_margin_but_the_zero_cross_coupling_surface_is_not_symmetry_closed.md) proves that the tree-level reader has a finite stable interval. It also proves that the zero-cross-coupling surface is not symmetry closed.

Terms coupling the wall, reader and response scalars are allowed counterterms. Their coefficients require:

1. a complete counterterm basis;
2. beta functions;
3. renormalization conditions;
4. the corrected wall background;
5. the matrix fluctuation Hessian;
6. an RG interval preserving positivity.

An allowed coefficient is not a predicted coefficient. Unless a symmetry or matching calculation fixes its finite part,

\[
\boxed{\lambda\text{ is a phenomenological boundary parameter}.}
\]

## 6. What remains physically useful

The effective mechanism is still valuable in conventional platforms. At a magnetic, photonic, acoustic or electronic interface, spin-orbit coupling, exchange, anisotropy or chiral boundary conditions can generate an empirical \(\lambda\). The three-record experiment can measure it through

\[
\tan2\theta_*=\frac{2\lambda w}{g}.
\]

That would demonstrate wall-conditioned oriented selection. It would not show that \(\lambda\) is universal or forced by the exceptional algebraic corpus.

## 7. Finite reopen gates

The fundamental branch reopens only if at least one of the following is supplied:

### Gate A — source-native primitive carrier

A field or response line with the correct primitive transformation weight, whose opposite wall sectors remain distinct before projectivization.

### Gate B — second phase-bearing datum

A second independently derived line or spurion such that a relative invariant transmits orientation without the one-line quadratic collapse.

### Gate C — fixed microscopic matching

A gauge-complete local action whose integration produces \(w\chi(P,Y)\) with a calculable coefficient and sign, together with its counterterm and RG packet.

### Gate D — quantized descent

An explicit anomaly/descent or topological term whose variation and boundary reduction yield this specific bridge rather than only a mode count or global phase.

### Gate E — empirical same-carrier closure

A conventional interface measures the predicted even/odd/reversal relations and independently reconstructs the microscopic interaction producing \(\lambda\). This promotes the physical mechanism, though not its universality.

## 8. Consequence for the larger programme

The lightning path has reached a precise fork:

\[
\boxed{
\begin{array}{ll}
\text{effective admissibility loop:}&\textbf{closed},\\
\text{generic laboratory realization:}&\textbf{plausible and testable},\\
\text{current Peirce--sterile realization:}&\textbf{ruled out},\\
\text{universal/fundamental coefficient:}&\textbf{not derived},\\
\text{next work:}&\textbf{new carrier or measured microscopic matching}.
\end{array}}
\]

This is progress rather than retreat. The corpus now knows exactly which successful mathematics is portable to experiments and exactly where the claimed fundamental ascent stops.

## Machine-readable audit and certificate

The [provenance ledger](lambda_provenance_ledger_v1.json) records every present route, result and reopen condition. The companion [verifier](../../../../verification/verify/verify_lambda_provenance_exhaustion.mjs) checks that no current route is silently classified as a derived fixed coefficient and that the exact no-go and counterterm boundaries remain explicit.

