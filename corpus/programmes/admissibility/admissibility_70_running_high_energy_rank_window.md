# The high-energy one-port window survives one-loop running, but not per-mille resolution

**Date:** 25 October 2026
**Status:** leading one-loop running window computed; precision matching and covariance remain open
**Topic:** OT-047
**Parent:** [AZ-069 resolution ceiling](admissibility_69_threshold_spectrum_and_resolution_ceiling.md)
**Evidence:** [running-window ledger](../../../evidence/data/five-coordinate-running-window-v1.json)
**Generator:** [running-window calculation](../../../scripts/run-five-coordinate-running-window.mjs)
**Verifier:** [running-window certificate](../../../verification/admissibility/verify_five_coordinate_running_window.mjs)

## Result

The high-energy reopening found in AZ-069 is not an isolated-point accident in the leading one-loop diagnostic. Running the third-family Standard-Model gauge and Yukawa couplings from 173 GeV and evaluating the exact five-coordinate generalized spectrum at 400 GeV, 1, 3, 10 and 100 TeV gives

\[
1.315\times10^{-3}
\leq \frac{\sigma_2}{\sigma_1}
\leq 1.637\times10^{-3}.
\]

Across the whole sampled interval:

- the broken response is effectively rank one at 1% resolution;
- it is effectively rank two at 0.1% resolution;
- the leading-mode overlap with its 400 GeV orientation remains above $0.9999983$.

The first operational rank boundary is therefore stable under this running approximation. The leading direction does not wander appreciably; the weak-anomaly/bottom-scale second direction remains small but resolvable to a per-mille instrument or calculation.

## Calculation

The calculation uses the standard one-loop gauge equations and the third-family unbroken-phase Yukawa equations, with rounded $\overline{\mathrm{MS}}$-like boundary inputs at 173 GeV. At every scale,

\[
W(\mu)=\operatorname{diag}\left(
3y_t^2,3y_b^2,y_\tau^2,y_\nu^2,
\frac{9g_2^4}{64\pi^2}
\right),
\]

and the generalized response spectrum is computed from

\[
\sqrt{W(\mu)}\,TD^{-1}T^T\sqrt{W(\mu)}.
\]

The running top Yukawa decreases across the interval. The weak gauge coupling also decreases, but more slowly in the combination relevant to the ratio. Consequently the second-to-first ratio rises gently rather than crossing either the 0.1% or 1% decision boundary.

The beta-function literature boundary is represented by Bednyakov, Pikelner and Velizhanin, [*Yukawa coupling beta-functions in the Standard Model at three loops*](https://arxiv.org/abs/1212.6829). This packet deliberately retains only the one-loop third-family truncation; it does not claim their higher-loop precision.

## Open and closed

Closed:

- instability of the leading direction under ordinary one-loop running is not the immediate obstruction;
- the sampled 400 GeV--100 TeV interval passes a 1% rank-one gate;
- the same interval fails a 0.1% rank-one gate;
- the quantitative second-mode range and orientation-stability bound are executable and recorded.

Open:

- electroweak broken-phase matching near the lower end;
- two-loop and boundary-input uncertainty bands;
- gauge/Yukawa interference and detector covariance;
- a physical observable that measures the generalized source response rather than an unrealized external probe;
- finite-temperature KMS continuation;
- the OT-027 source-bearing operator dependency.

## Implication

The proposed two-current response now has a plausible lightning path, but only as a controlled approximation: protected $B-L$ plus one top-dominated broken port, over a high-energy window, for records no finer than about one percent. A per-mille experiment should be designed to see the second mode rather than treat it as nuisance. Either result is useful. Continued rank one supplies a justified reduced response carrier; a resolved second mode confirms the five-coordinate microscopic picture and closes the stronger two-port claim.

The next work is no longer a broader algebra search. It is a precision bridge: match the electroweak cuts, propagate uncertainties and bind the response to a real interference-sensitive observable.

## Reproduction

~~~powershell
node scripts/run-five-coordinate-running-window.mjs --write
node verification/admissibility/verify_five_coordinate_running_window.mjs
~~~
