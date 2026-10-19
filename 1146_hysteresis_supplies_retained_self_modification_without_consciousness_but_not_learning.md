# Hysteresis Supplies Retained Self-Modification Without Consciousness but Not Learning

**Date:** 19 October 2026  
**Branches:** nonlinear response, slow variables, retention, learning, consciousness spike  
**Claim status:** exact minimal gradient-flow construction; physical stress implementation remains open  
**Certificate:** [verify_hysteretic_retention_is_not_error_sensitive_learning.mjs](scripts/verify_hysteretic_retention_is_not_error_sensitive_learning.mjs)

## Executive result

Document 1145 produced endogenous response backreaction but not retained change. A single dissipative bistable slow variable supplies retention:

\[
\boxed{
\dot s=-\Gamma\frac{\partial U(s;h)}{\partial s},
\qquad
U(s;h)=\frac a4(s^2-1)^2-hs.
}
\]

At zero drive, \(s=\pm1\) are stable response states. A subcritical pulse tilts the landscape but leaves the system in its original well. A supercritical pulse removes the barrier, switches the slow state, and the changed state persists after the pulse is removed.

Let the three response poles depend on the retained state through

\[
m_i(s)=d_i+\kappa_i\tanh s,
\qquad
d_i>|\kappa_i|.
\]

Then the switched \(s\)-state leaves a persistent, positive change in the three-ray response after the immediate excitation has disappeared.

This establishes:

\[
\boxed{
\text{ordinary open-system physics can supply persistent self-modification.}
}
\]

Consciousness is not needed for this gate either.

But hysteresis is not yet learning. The device retains whichever perturbation crosses its threshold. It does not ask whether the change reduced prediction error, improved control, or tracked truth.

\[
\boxed{
\text{retention of influence}\neq\text{retention of correction}.
}
\]

The remaining live gate is therefore **error-sensitive retention**.

## 1. The minimal retention variable

Take the symmetric double-well potential

\[
U_0(s)=\frac a4(s^2-1)^2,
\qquad
a>0.
\]

It has stable minima at

\[
s_\pm=\pm1
\]

and an unstable maximum at \(s=0\). A scalar drive \(h\) tilts the potential:

\[
U(s;h)=U_0(s)-hs.
\]

The overdamped dynamics is

\[
\dot s
=-\Gamma\left[a\,s(s^2-1)-h(t)\right],
\qquad
\Gamma>0.
\]

When \(h=0\),

\[
\frac{dU_0}{dt}
=\frac{\partial U_0}{\partial s}\dot s
=-\Gamma\left(\frac{\partial U_0}{\partial s}\right)^2
\le0.
\]

Thus after the drive is removed the slow variable relaxes toward whichever local minimum contains it. Energy is exported to the omitted environment represented by the overdamped limit.

## 2. Exact switching threshold

The stationary equation during a constant drive is

\[
a\,s(s^2-1)=h.
\]

A metastable well disappears at a simultaneous stationary inflection:

\[
\frac{\partial U}{\partial s}=0,
\qquad
\frac{\partial^2U}{\partial s^2}=a(3s^2-1)=0.
\]

Hence

\[
s_{\mathrm{sp}}=\pm\frac1{\sqrt3}
\]

and the magnitude of the spinodal tilt is

\[
\boxed{
h_c=\frac{2a}{3\sqrt3}.
}
\]

For a sufficiently long positive pulse:

- \(0<h<h_c\): the negative well remains, so a state beginning near \(-1\) returns there;
- \(h>h_c\): the negative well disappears, so the state crosses to the positive basin and remains near \(+1\) after \(h\to0\).

The threshold is not put in by a discrete update rule. It follows from the bifurcation of the continuous potential.

## 3. Retained response poles

Couple the slow state to the three-ray tangent poles by

\[
m_i(s)=d_i+\kappa_i\tanh s.
\]

The bounded function \(\tanh s\) ensures

\[
m_i(s)\ge d_i-|\kappa_i|>0.
\]

The frozen three-ray response is

\[
\Sigma(z;s)
=\sum_{i=1}^3
\frac{w_i b_ib_i^T}{m_i(s)-z}.
\]

For \(\operatorname{Im}z>0\), its imaginary part remains positive semidefinite exactly as in documents 1143 and 1145. If the ray vectors span \(\mathbb R^2\), it remains positive definite.

After a supercritical pulse,

\[
s:-1\longrightarrow+1
\]

and the lasting pole displacement relative to the original state is

\[
\Delta m_i
=2\kappa_i\tanh1.
\]

The system now presents a different response after the triggering signal has vanished.

## 4. What the certificate verifies

For \(a=1\),

\[
h_c=\frac{2}{3\sqrt3}
\approx0.38490018.
\]

The numerical integration starts at \(s=-1\), applies a finite pulse, removes it, and continues until relaxation:

| Pulse | Amplitude | Final state |
|---|---:|---:|
| subcritical | \(0.30\) | \(-1\) |
| supercritical | \(0.62\) | \(+1\) |

The three final poles are:

\[
\begin{aligned}
m_{\mathrm{weak}}
&=(2.1629131,\ 3.2066232,\ 4.5162246),\\
m_{\mathrm{strong}}
&=(2.4370869,\ 2.9933768,\ 4.6837754).
\end{aligned}
\]

The response retains the difference

\[
\Delta m
=(0.2741739,\ -0.2132464,\ 0.1675507)
\]

after both pulses have ended. All poles remain positive and the post-pulse potential energy is nonincreasing.

## 5. Why this is stronger than nonlinear modulation

In document 1145,

\[
m_i(t)=d_i+3\lambda_i\xi_i(t)^2
\]

changed with the instantaneous bath amplitude. When that amplitude returned, the pole shift returned.

Here the fast or intermediate excitation can disappear while the slow state remains in a different basin:

\[
\text{pulse}
\longrightarrow
\text{basin crossing}
\longrightarrow
\text{pulse removed}
\longrightarrow
\text{changed response retained}.
\]

This is genuine physical memory at the level of the response law seen by the fast subsystem.

On the enlarged state \((x,\xi,s)\), the law is still fixed. What changes is the slow internal state. The word “self-modification” is therefore reduced-state language, not a violation of fixed dynamics.

## 6. Why this is still not learning

The bistable variable distinguishes

\[
|h|<h_c
\quad\text{from}\quad
|h|>h_c.
\]

It does not distinguish:

\[
\text{true from false},
\quad
\text{successful from unsuccessful},
\quad
\text{prediction-confirming from prediction-refuting},
\quad
\text{beneficial from harmful}.
\]

A sufficiently strong misleading signal is retained. A weak but accurate correction is rejected.

The update is therefore sensitive to **magnitude and duration**, not to **error and consequence**.

This yields a useful hierarchy:

| Mechanism | Memory | Backreaction | Retention | Error-sensitive |
|---|---:|---:|---:|---:|
| fixed linear bath | yes | no | transient | no |
| nonlinear conservative bath | yes | yes | reversible | no |
| bistable dissipative slow state | yes | yes | yes | no |
| learner | yes | yes | yes | yes |
| reflexive learner | yes | yes | yes | yes, including error in its own learning rule |

Consciousness has now been excluded as necessary for the first three rows.

## 7. The next lawful construction

To cross from hysteresis to learning, the landscape tilt must be produced by a physically defined performance residual rather than raw excitation.

Let

\[
\varepsilon_n
=y_n-\widehat y_n(s_n)
\]

compare returned response with predicted response. A candidate slow update would have the form

\[
\dot s
=-\Gamma
\frac{\partial}{\partial s}
\left[
U_0(s)
+\frac{\beta}{2}\|\varepsilon(s)\|^2
\right].
\]

This is not yet admitted as a physical law. It becomes more than an optimization metaphor only when:

1. \(y\) and \(\widehat y\) are represented by actual carrier variables;
2. their subtraction is implemented by an interaction;
3. the residual energy is dissipated into specified degrees of freedom;
4. the update decreases a physically meaningful mismatch;
5. the retained state improves held-out response rather than merely fitting the last perturbation.

The important new fork is:

\[
\boxed{
\text{hysteresis stores a cause;}
\qquad
\text{learning stores a correction.}
}
\]

## 8. Consequence for consciousness

Persistent self-modification is not consciousness-specific. Ferromagnets, memristive devices, biochemical switches and many other non-conscious systems exhibit hysteresis or multistability.

If consciousness remains relevant, its candidate contribution has narrowed to one or more of:

- constructing a counterfactual prediction;
- representing mismatch as mismatch;
- selecting which error should alter the model;
- making the result globally available across tasks;
- revising the update rule itself;
- attributing the consequence to the system's own prior action.

Even these operations may be implemented non-consciously. The empirical burden remains to show what phenomenal consciousness contributes beyond the complete causal organization.

## 9. Relation to the programme

The slow state \(s\) is an independently transported relational datum, so it respects document 1139's no-go against a fully equivariant state-only generator.

The three poles remain attached to the tensor, vector and scalar relationship rays of documents 1141–1145. The construction changes their spectral positions without rotating their ray directions.

No Spin(2,3)-specific invariant selects the double well, its threshold or the pole map \(m_i(s)\). This is a general dynamical mechanism inserted to classify what is and is not missing.

Its value is subtractive as much as constructive:

\[
\boxed{
\text{memory, feedback and retention are all achievable before consciousness enters.}
}
\]

## 10. Stop-everything tests

**Physical slow-mode trigger:** identify a stress, defect, order-parameter or environmental coordinate with two metastable response states.

**Derived tilt trigger:** show that an admitted carrier excitation produces the landscape tilt \(h\) with calculable sign and magnitude.

**Retention trigger:** calculate a post-excitation pole or residue change that survives longer than the fast relaxation time.

**Error-comparator trigger:** derive a physical interaction whose energy is an observable prediction residual and whose relaxation changes \(s\).

**Generalization trigger:** show that the retained update improves a new response not used to drive the switch.

**Hysteresis stop:** if switching tracks only amplitude, duration or accumulated dose, classify it as retention rather than learning.

**Consciousness stop:** do not infer consciousness from multistability, irreversible switching or persistent response change.

## 11. Verdict

| Question | Verdict |
|---|---|
| Can an ordinary slow variable retain a response change? | **yes** |
| Is the switching threshold derived? | **yes, \(h_c=2a/(3\sqrt3)\)** |
| Can all three poles remain positive after switching? | **yes** |
| Is dissipation required for robust relaxation into a retained basin? | **yes in this minimal model** |
| Does retention require consciousness? | **no** |
| Is thresholded hysteresis learning? | **no** |
| What remains missing? | **a physical error comparator and correction-sensitive retention** |

The consciousness spike has now survived only in a narrower form:

\[
\boxed{
\text{perhaps consciousness matters to what is treated as an error,}
\quad
\text{not to feedback or retention by themselves.}
}
\]

## 12. Dependencies

- [nonlinear backreaction without learning](1145_a_nonlinear_three_ray_bath_backreacts_on_its_own_poles_without_consciousness_but_does_not_learn.md)
- [consciousness compile-out trilemma](1144_consciousness_is_a_live_organizational_spike_but_not_yet_the_missing_physical_coupling.md)
- [three-ray conservative memory](1143_three_relationship_rays_have_a_minimal_self_adjoint_memory_realization_but_no_adaptive_couplings.md)
- [state-only covariance no-go](1139_full_spin23_covariance_forbids_a_nonzero_state_only_feedback_generator.md)
