# No current principle predicts the reader curvature coupling, so only the traceless threshold is scheme robust

**Date:** 20 October 2026  
**Status:** scalar-improvement normalization exhausted against the principles presently available  
**Role:** final normalization audit following A7 result 1232 and full-stress result 1393

## Result in one sentence

Minimal coupling chooses \(\xi_\chi=0\), defect conformal symmetry would choose
\(\xi_\chi=1/8\), and an operational trace-stress condition can measure
\(\xi_\chi\) at a stated scale, but none is derived by the current gapped defect
programme; curved-space renormalization instead treats \(\xi_\chi\) as an allowed
running coupling, so the signed third response matrix remains conditional while
the positive traceless-stress threshold shift remains scheme robust.

## 1. Everyday picture

A ruler can be calibrated in three different ways.

- One may set its zero mark at the factory. That is a convention.
- A symmetry may force the zero mark to a unique location. That is a prediction.
- One may compare it with a reference object and record the correction. That is a
  measured input.

The curvature coupling \(\xi_\chi\) plays the same role for the trace part of the
reader stress. This document tests whether the programme has a symmetry that fixes
it, a microscopic calculation that derives it, or only a calibration that can
measure it.

## 2. The parameter being audited

For the canonically normalized localized reader,

\[
S_\Sigma\supset-\int_\Sigma\sqrt{-\gamma}\,
\xi_\chi R[\gamma]|\chi|^2.
\]

In \(2+1\) dimensions, \([\chi]=1/2\), so \(R|\chi|^2\) has dimension three.
Its coefficient is dimensionless and is allowed by locality, defect
diffeomorphism invariance, the compact gauge symmetry and the residual
\(\mathbb Z_3\).

At zero external spatial momentum it shifts the two diagonal pair vertices equally,

\[
\delta v_x=\delta v_y=2\,\delta\xi_\chi E.
\]

Therefore the trace port changes, while

\[
v_S=v_x-v_y={K_x-K_y\over E}
\]

does not.

## 3. Minimal coupling is a choice, not a derived theorem

“Minimal coupling” sets

\[
\xi_\chi(\mu_0)=0
\]

at a chosen matching scale. That is a perfectly admissible model definition. It is
not forced by the gauge symmetry, defect geometry or equivalence principle because
\(R|\chi|^2\) obeys all of them.

If the reader were exactly free on a prescribed background, \(\xi_\chi\) would
simply remain an arbitrary parameter. Once reader self-interaction, gauge dynamics,
wall fluctuations or bulk-to-defect matching are admitted, the curvature operator
is available as a counterterm and zero need not be radiatively preserved.

There is an additional matching problem. Even if a four-dimensional parent scalar
were declared minimally coupled, localizing it on a curved wall can generate
intrinsic and extrinsic curvature terms after the transverse profile and heavy
modes are integrated out. The current flat-wall calculation has not performed that
matching.

**Verdict:** \(\xi_\chi=0\) is a boundary condition or convention, not a prediction.

## 4. Conformal coupling is dimension-specific and conflicts with the gapped toy

For a free massless scalar in \(d\) spacetime dimensions, local Weyl invariance
selects

\[
\xi_{\rm conf}(d)={d-2\over4(d-1)}.
\]

Thus

\[
\xi_{\rm conf}(3)={1\over8},
\qquad
\xi_{\rm conf}(4)={1\over6}.
\]

The distinction matters: a four-dimensional value cannot be copied to a
three-dimensional defect without dimensional reduction and matching.

The reader used by A11 is deliberately gapped, has a finite localization width,
lives on a finite cycle, and in result 1292 has a nonzero quartic coupling. Those
features do not describe the free massless Weyl-invariant action for which
\(1/8\) follows. Finite temperature may break Weyl invariance through the state
rather than the operator algebra, but the mass and localization scale already
break it in the action.

An interacting defect conformal fixed point could possess a distinguished stress
tensor. Boundary/defect conformal Ward identities do constrain additional
operators, as the curved-boundary analysis of
[McAvity and Osborn](https://arxiv.org/abs/hep-th/9302068) illustrates. The current
programme has not constructed such a fixed point or matched its relevant mass
deformation to the gapped reader.

**Verdict:** \(1/8\) is the correct candidate under a missing symmetry, not a value
derived for the present phase.

## 5. Curved-space renormalization makes \(\xi_\chi\) a running input

The intrinsic defect counterterm basis begins schematically with

\[
\int_\Sigma\sqrt{-\gamma}\left[
\delta Z|D\chi|^2+
\delta M^2|\chi|^2+
\delta\lambda|\chi|^4+
\delta\xi R|\chi|^2+
\delta\Lambda+
\delta\kappa R+cdots
\right].
\]

Because the defect is embedded, the complete basis can also contain
fold-parity-allowed extrinsic-curvature invariants, normal-derivative terms,
displacement-operator contacts and bulk-to-defect counterterms.

The strongest beta-function statement justified before those interactions are
fixed is

\[
\boxed{
\mu{d\xi_\chi\over d\mu}
=\beta_\xi(\xi_\chi,\lambda_\chi,g_{\rm def},g_{\rm wall},g_{\rm portal},\ldots).}
\]

Near a specified conformal fixed point one may linearize

\[
\beta_\xi=\gamma_\xi(\xi_\chi-\xi_*)+\cdots.
\]

This form does not supply \(\gamma_\xi\), \(\xi_*\), a trajectory or a matching
scale. Curved-space scalar models can have the conformal value emerge as a fixed
point, but the answer depends on dimension, field content, phase and truncation;
see the perturbative multicritical analysis of
[Martini and Zanusso](https://arxiv.org/abs/1810.06395) and the curved-background
flow analysis of
[Merzlikin, Shapiro, Wipf and Zanusso](https://arxiv.org/abs/1711.02224).

No numerical \(\beta_\xi\) coefficient is defensible for the present toy because
its reader self-interaction, dynamical gauge sector, wall-mode couplings, regulator
and subtraction prescription have not been jointly specified. Quoting the
four-dimensional Standard Model Higgs beta function would answer a different
question.

Even an attractive fixed point does not determine the finite-scale value without
an RG boundary condition unless the flow is taken all the way to the fixed point.
The A11 experiment is in a massive phase at a finite frequency, not at that limit.

**Verdict:** RG evolution can transport a measured or matched \(\xi_\chi\); it does
not presently predict it.

## 6. The spectral action could match a coefficient, but the required data are absent

The spectral action can produce curvature--scalar terms once a particular
spectral triple and Dirac operator are specified. That is a genuine possible
microscopic matching route, not a generic reason to import a familiar Higgs
coefficient. The original
[spectral action principle](https://arxiv.org/abs/hep-th/9606001) derives its
relations from the chosen spectral data and at a chosen high scale.

The current typed action does not place the added charge-one reader, its kink
wavefunction, the three-dimensional defect geometry and its boundary conditions
inside a completed spectral triple. Nor has it evaluated the relevant heat-kernel
coefficient. The reader is not the Standard Model Higgs, and the defect is not the
four-dimensional bulk.

**Verdict:** spectral matching remains a concrete future calculation; it fixes
nothing in the current action.

## 7. Defect Weyl symmetry is not presently available

An exact defect Weyl Ward identity would be the cleanest symmetry route. It could
select the improved stress at a massless conformal point, modulo anomaly and
boundary subtleties. But the programme currently uses:

- \(M=0.8\) for the reader fixture;
- a kink scale and finite localization width;
- a finite compact cycle;
- a generic reader quartic;
- an unresolved bulk/defect displacement identity.

No compensating dilaton or spurion transformation has been supplied to make these
data Weyl covariant. Introducing one solely to choose \(\xi_\chi\) would add new
physics rather than derive a consequence of the present model.

**Verdict:** defect Weyl symmetry would be predictive if constructed; it is not a
current symmetry.

## 8. The equivalence principle does not choose \(\xi_\chi\)

A freely falling frame removes the connection at a point, not the curvature over
a finite region. The term \(R|\chi|^2\) is local and generally covariant and
describes coupling to tidal geometry. Nonminimal scalar coupling need not violate
the equivalence principle; explicit analyses can even single out nonminimal values
under additional dynamical requirements, illustrating that “equivalence
principle” alone is insufficient
([Accioly, Blas and Mukai](https://arxiv.org/abs/gr-qc/0202006)).

Matching the response of this extended wall-bound mode to an elementary point
particle would itself be an extra assumption. The mode has finite thickness and
internal binding energy.

**Verdict:** equivalence-principle language does not distinguish \(0\), \(1/8\),
or another matched value.

## 9. An operational condition fixes but does not predict the parameter

One measurement or microscopic matching condition is sufficient. For example,
declare at scale \(\mu_0\)

\[
\langle k,-k|T^i{}_i|0\rangle_{E=E_0}=\mathcal M_0,
\]

with the state normalization, subtraction scheme and metric source fixed. This
determines \(\xi_\chi(\mu_0)\). Equivalent choices include measuring one
trace--traceless cross spectral weight or matching the coefficient of
\(R|\chi|^2\) in a completed curved microscopic action.

The resulting \(\xi_\chi\) is measurable input. Subsequent frequency and holonomy
dependence become predictions. This is scientifically adequate, but it is not a
parameter-free Spin(2,3) result.

Stress renormalization in curved space generally retains finite local ambiguities;
the systematic treatment by
[Décanini and Folacci](https://arxiv.org/abs/gr-qc/0512118) makes clear why a
renormalization prescription is part of defining the observable.

## 10. Quantitative consequence for A11

The executable audit compares three often-invoked choices:

\[
\begin{array}{c|c|c}
\text{choice}&\xi_\chi&|d|\text{ in }R_{\rm orient,-}=d\,\mathrm{diag}(1,-1)\\ \hline
\text{minimal}&0&0.102546\\
\text{three-dimensional conformal}&1/8&0.0900925\\
\text{four-dimensional conformal, imported without matching}&1/6&0.0859413
\end{array}
\]

All are internally admissible flat-response choices, and all give different
third-direction amplitudes. Another allowed value,

\[
\xi_\chi=1.02929398,
\]

sets the integrated third direction to numerical zero. Thus choosing a familiar
value does not make the answer independent of the matched Wilson coupling.

By contrast, the traceless vertex drifts by less than
\(3.2\times10^{-15}\) across the audit, and its thresholds remain

\[
\boxed{
\omega_{S,h=0}=2.56124969,
\qquad
\omega_{S,h=1}=\omega_{S,h=2}=1.74426461.}
\]

The positive spectral support and this onset shift are the strongest robust
observables presently available. CP still makes \(h=1\) and \(h=2\) identical.

## 11. Convention, running coupling and measurable input

The distinctions can now be stated precisely:

| Statement | Status |
|---|---|
| “Set \(\xi_\chi=0\)” | model convention/matching boundary condition |
| “Use \(\xi_\chi=1/8\)” | consequence of a massless 3D Weyl symmetry not derived here |
| “Flow toward \(\xi_*\)” | RG statement requiring completed beta functions and an initial condition |
| “Measure one trace matrix element” | operational input fixing \(\xi_\chi(\mu_0)\) |
| “Spectral action predicts it” | future possibility requiring the reader's actual spectral data |
| “Spin(2,3) fixes it” | unsupported by the current corpus |

No available principle fixes the matched curvature coupling needed to make the A11 integrated third-matrix statistic predictive.
Once \(\xi_\chi\) and the common laboratory port map are fixed, the direction is
well defined and testable, but conditional.

## 12. Final stopping rule

Stop claiming a physical third response direction while either
\(\xi_\chi\) or the common trace/traceless port map remains unfixed. Do not spend
further algebraic effort trying to infer the number from ambient group geometry.

Reopen the normalization lane only if at least one of the following is supplied:

1. a complete curved microscopic action containing the localized reader, from
   which \(\xi_\chi\) is computed by transverse-mode matching;
2. an exact defect conformal fixed point plus a controlled deformation and RG flow
   to the gapped reader phase;
3. an operational trace-stress renormalization condition at a declared scale,
   together with a sector-blind physical port calibration.

Until then, preregister only the traceless spectral support and threshold shift as
the primary A11 observable. The full third matrix direction may be reported as a
secondary, explicitly \(\xi_\chi\)-conditional quantity. Physical admission
remains false.

## Artifacts

- `evidence/data/spin23-xi-normalization-exhaustion.json`
- `verification/verify/verify_spin23_xi_normalization_exhaustion.mjs`
- `corpus/claims/1300-1399/1393_the_full_scalar_stress_preserves_a_traceless_holonomy_threshold_but_not_a_scheme_invariant_third_matrix_direction.md`

