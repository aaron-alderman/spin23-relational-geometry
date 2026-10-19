# The A11 effect window requires nuisance-projected power, not only a nonzero transverse response

**Date:** 20 October 2026  
**Status:** exact detectability formulas and synthetic design budget; no physical effect size, frequency prediction or data  
**Parent protocol:** document 1222  
**Machine-readable budget:** `evidence/data/spin23-a11-effect-window-budget.json`  
**Verifier:** `verification/verify/verify_spin23_a11_effect_window_budget.mjs`

## Result

The preregistered A11 observable can be turned into a quantitative effect-window test, but the existing threshold $A_\perp>0.01$ is not by itself a power calculation.

After projecting calibration, contact and plane-estimation nuisances, a balanced three-sector experiment has a two-degree-of-freedom harmonic statistic. For a dimensionless transverse amplitude $a$, $n$ independent runs per sector, projected single-run noise $\sigma_{\rm rel}$, nuisance-information retention $r$, and worst-case residual bias $b_{\rm sys}$, its noncentrality is

\[
\boxed{
\lambda=
\frac{3n\,[r a-b_{\rm sys}]_+^2}{2\sigma_{\rm rel}^2}.
}
\]

This equation exposes three different limits:

- more samples reduce statistical noise;
- nuisance degeneracy reduces $r$, and cannot always be repaired by more samples;
- a systematic floor $b_{\rm sys}\ge ra$ makes the target undetectable at every sample count.

For the explicitly synthetic fixture $a=0.01$, $\sigma_{\rm rel}=0.02$, $r=0.85$, $b_{\rm sys}=0.001$, eight preregistered resolution elements, two required passing elements and two replications:

- 111 runs per sector give 90% power for one frequency/replication event;
- 144 runs per sector per replication give a dependence-robust 90% lower bound for all four required pass events;
- two replications therefore require 864 sector-runs if each run supplies the complete frozen frequency grid.

These numbers describe only the synthetic noise model. They are not a prediction of a physical $Spin(2,3)$ signal or an assertion that 864 laboratory runs are feasible.

The joint-power figure assumes that two particular preregistered resolution elements each carry at least the target amplitude. If the alternative says only “an effect occurs somewhere among eight elements,” there is no comparable power guarantee until its location or distribution is specified.

## 1. Quantity being detected

At one frequency, stack the three independent entries of every symmetric response matrix in all three holonomy sectors into one vector $y$. Write

\[
y=N\eta+aT(\phi)+\epsilon.
\]

Here:

- $N\eta$ contains admitted contact, calibration, plane-estimation and environmental nuisance effects;
- $T(\phi)$ is the transverse $Z_3$ harmonic with unknown phase $\phi$;
- $\epsilon$ is measurement or numerical noise.

With inverse covariance $W=\Sigma^{-1}$, remove nuisance directions with

\[
M_N=I-N(N^TWN)^+N^TW.
\]

The two columns of $T$ are the cosine and sine transverse templates. Their information matrix is

\[
F=T^TWM_NT.
\]

The effect is identifiable precisely when

\[
\lambda_{\min}(F)>0.
\]

Define the worst-phase nuisance retention

\[
r^2=
\frac{\lambda_{\min}(F)}
{\lambda_{\min}(T^TWT)}.
\]

If $r=0$, the proposed signal lies completely inside the nuisance space. Repeating the same measurement more often cannot distinguish the two; the probes or controls must change.

## 2. Why constant contact terms cancel

For $\theta_h=2\pi h/3$, both harmonic weight sums vanish:

\[
\sum_h\cos\theta_h=0,
\qquad
\sum_h\sin\theta_h=0.
\]

Therefore a genuinely sector-independent additive contact matrix cancels exactly in $D_c,D_s$. The uncertainty budget concerns only sector-dependent contact leakage, finite calibration drift and uncertainty in the frozen plane.

The synthetic budget assigns the conservative worst-case total

\[
b_{\rm sys}=0.0003+0.0004+0.0003=0.001.
\]

Those three numbers are design allowances, not measured apparatus properties. A real experiment must replace them with blind sham/calibration bounds.

## 3. Positivity constrains the allowed effect from above

For every sector and retained frequency,

\[
C_h(\omega)\succeq0.
\]

If $C_h=C_h^{(0)}+\delta C_h$, Weyl's inequality gives the sufficient condition

\[
\|\delta C_h\|_2
\le \lambda_{\min}(C_h^{(0)}).
\]

Positivity therefore does not create a detectable transverse effect. It places an upper ceiling on perturbations around a given baseline.

For the synthetic baseline used here,

\[
C^{(0)}=
\begin{pmatrix}
1.61&0.266\\
0.266&1.285
\end{pmatrix},
\]

the minimum eigenvalue is (1.13579), its Frobenius norm is (2.09400), and the simple normalized sufficient ceiling is (0.54240). The planning target (0.01) is safely inside that fixture's cone margin.

For physical data, positivity must be uncertainty-aware. A point estimate just inside the cone is insufficient if its lower confidence margin crosses zero. Conversely, an estimate just outside the cone is not a physical-state failure unless negativity exceeds the declared measurement or numerical uncertainty.

## 4. Exact detection statistic

Let

\[
q=(q_c,q_s)
\]

be the nuisance-projected cosine and sine contrasts. In the balanced homoscedastic case,

\[
s_n^2=\frac{2\sigma_{\rm rel}^2}{3n},
\qquad
Q=\frac{q_c^2+q_s^2}{s_n^2}.
\]

Under the null,

\[
Q\sim\chi_2^2.
\]

Under a harmonic signal,

\[
Q\sim\chi_2^2(\lambda),
\qquad
\lambda=\frac{3n(ra-b_{\rm sys})^2}{2\sigma_{\rm rel}^2}.
\]

For $B$ preregistered resolution elements and familywise false-positive probability $\alpha_{\rm FW}$, a conservative Bonferroni threshold is

\[
\alpha_{\rm bin}=\frac{\alpha_{\rm FW}}B,
\qquad
Q_{\rm crit}=\chi^2_{2,1-\alpha_{\rm bin}}
=-2\log\alpha_{\rm bin}.
\]

For $B=8$ and $\alpha_{\rm FW}=0.01$,

\[
\alpha_{\rm bin}=0.00125,
\qquad
Q_{\rm crit}=13.36922.
\]

The minimum detectable raw amplitude at desired power $1-\beta$ is

\[
\boxed{
a_{\min}(n)=
\frac{b_{\rm sys}
+\sigma_{\rm rel}\sqrt{2\lambda_*/(3n)}}{r},
}
\]

where $\lambda_*$ is chosen so that

\[
\Pr[\chi_2^2(\lambda_*)>Q_{\rm crit}]=1-\beta.
\]

The scalar expression assumes independent runs and equal projected variance in the three sectors. The general calculation uses the complete repeated-run covariance in $W$. Uncertainty in the denominator of $A_\perp$ must be propagated jointly with the numerator by a delta-method calculation or a run-level bootstrap that repeats plane and nuisance fitting. Cross-frequency covariance must likewise be retained; collecting many highly correlated raw bins does not create independent resolution elements.

## 5. One event is not the full protocol

Document 1222 requires two frequency elements and two independent replications. These are four required pass events.

Giving each event 90% power does **not** give the full protocol 90% power. If independent, the probability that all four pass is only

\[
0.9^4=0.6561.
\]

Without assuming independence, allocate the total miss probability (0.1) across the four events. Requiring per-event power

\[
1-\frac{0.1}{4}=0.975

\]

guarantees joint power of at least 0.9 by the union bound.

For the synthetic budget this raises the requirement from 111 to 144 runs per sector per replication. The scaling with single-run relative noise is:

| Projected single-run noise | Runs per sector per replication |
|---:|---:|
| 2% | 144 |
| 1% | 36 |
| 0.5% | 9 |

This quadratic scaling makes noise reduction at the source considerably more valuable than simply accumulating runs.

## 6. Detection and threshold crossing are different powers

There is a subtle issue in the parent protocol. It both tests against zero and requires the observed point estimate to exceed $A_\perp=0.01$.

If the true amplitude is exactly (0.01), no symmetric estimator has 90% probability of producing a point estimate above (0.01). The 144-run calculation gives more than 97.5% per-event power to reject zero, but it does not give 97.5% probability of crossing a threshold equal to the true effect.

With the synthetic noise and nuisance allowances, a raw true amplitude of approximately

\[
0.01489

\]

is required for a 90% chance that the measured radial harmonic exceeds (0.01) at 144 runs per sector. Thus (0.01) should be read as the smallest scientifically interesting **observed** amplitude, while a design alternative must be placed above it by a sampling margin.

This is the principal quantitative correction supplied by the effect-window audit.

## 7. Frequency-window requirements

A frequency window is admissible only when:

1. its endpoints and instrumental resolution are frozen from a microscopic prediction or label-blind training data;
2. bins closer than one response-resolution width count as one resolution element;
3. at least two resolution elements pass—oversampling one peak does not count twice;
4. the recovered $Z_3$ harmonic phase is compatible across the passing elements and replications;
5. probe, contact, calibration, geometry, temperature and drive definitions are unchanged;
6. searches outside the window receive a new multiplicity correction or a new protocol.

Until a microscopic coupling predicts a window, the eight-element window in this document is a synthetic power fixture only. Choosing a favourable window after examining sector labels would invalidate the test.

## 8. Explicit decisions

### Invalid

Stop and repair if positivity fails beyond uncertainty, hashes or conditions differ by sector, the reference/nuisance projection is rank deficient, the sham upper bound exceeds (0.001), or the window changes after unblinding.

### Advance

Advance A11 operationally only if:

- all matrices pass uncertainty-aware positivity;
- the familywise-corrected statistic passes in at least two preregistered resolution elements;
- $A_\perp>0.01$ in those elements;
- a conservative lower bound lies above the measured sham/systematic floor;
- the nuisance-projected third singular direction has a positive lower bound;
- phase-compatible results recur in two independent replications and reversed order;
- common-calibration invariant diagnostics agree.

This would establish an unexplained holonomy-correlated third response direction. It would not by itself identify $Spin(2,3)$ as the cause.

### Powered null

Call the declared effect window null only when:

- achieved noise and sample count certify at least 90% joint power;
- in two independent implementations, fewer than two predicted resolution elements have conservative upper bounds reaching (0.01);
- every validity control passes.

A convenient conservative upper bound is obtained by adding the two-dimensional 95% noise radius and the systematic allowance before undoing the retention factor. If that upper bound remains below (0.01), the target is excluded in that element.

### Inconclusive

Every valid result meeting neither the advance rule nor the powered-null rule is inconclusive. “Not significant” is not automatically a null result.

## 9. Programme verdict

A11 remains **not passed** and physical admission remains false. The calculation adds a genuine experimental design layer:

\[
\text{candidate transverse response}
\rightarrow
\text{nuisance projection}
\rightarrow
\text{positivity window}
\rightarrow
\text{familywise power}
\rightarrow
\text{advance / powered-null / inconclusive}.
\]

The missing physical input is now sharply localized: a microscopic action must predict both an amplitude and a frequency window. Without those two quantities, the apparatus can test a declared operational target, but the programme cannot claim that a null result excludes an arbitrary $Spin(2,3)$ realization.

## Reproduction

Run:

```powershell
node verification/verify/verify_spin23_a11_effect_window_budget.mjs
```

The verifier checks contact cancellation, the positivity ceiling, familywise threshold, exact noncentral-χ² power, nuisance/systematic scaling, four-event joint-power correction, noise scaling and the distinction between zero detection and crossing the nonzero protocol threshold.
