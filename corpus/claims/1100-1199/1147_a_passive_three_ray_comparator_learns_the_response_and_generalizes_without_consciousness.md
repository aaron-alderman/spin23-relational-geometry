# A Passive Three-Ray Comparator Learns the Response and Generalizes Without Consciousness

**Date:** 19 October 2026  
**Branches:** physical comparator, error-sensitive retention, three-ray response, learning, consciousness spike  
**Claim status:** exact well-specified learning theorem and numerical certificate; microscopic Standard-Model realization remains open  
**Certificate:** [verify_three_ray_error_comparator_learns_poles_and_generalizes.mjs](../../../verification/verify/verify_three_ray_error_comparator_learns_poles_and_generalizes.mjs)

## Executive result

A passive, non-conscious physical comparator can satisfy the operational learning gate left open by document 1146.

At a real calibration point \(z_0\) below all poles, write the three-ray response as

\[
R(z_0)
=\sum_{i=T,V,S}a_iQ_i,
\qquad
a_i=\frac{w_i}{m_i-z_0}>0,
\qquad
Q_i=b_ib_i^T.
\]

Let \(a_i^\star\) denote the corresponding returned environmental response. Couple each predicted compliance \(a_i\) to its returned value by a quadratic comparator energy

\[
\boxed{
\mathcal E(a;a^\star)
=\frac12\sum_i k_i(a_i-a_i^\star)^2.
}
\]

Overdamped relaxation gives

\[
\boxed{
\dot a_i
=-\gamma_i(a_i-a_i^\star).
}
\]

This is not merely a verbal instruction to minimize error. It is the force law of a spring-like comparator joining a predicted response coordinate to a returned response coordinate, with dissipation into an environment.

The solution is exact:

\[
a_i(t)
=a_i^\star
+\bigl(a_i(0)-a_i^\star\bigr)e^{-\gamma_i t}.
\]

Positive initial and target compliances imply \(a_i(t)>0\) for all time. The inferred poles

\[
\boxed{
m_i(t)=z_0+\frac{w_i}{a_i(t)}
}
\]

remain above the calibration point and converge to the true poles.

If the target really belongs to the assumed three-ray, one-pole-per-ray family, convergence at one calibration point identifies every pole and therefore predicts the response at every untrained spectral point:

\[
R(z;a(t))
\longrightarrow
R^\star(z).
\]

The certificate verifies that the held-out matrix-response error falls from

\[
0.7169037
\quad\text{to}\quad
2.45\times10^{-11}.
\]

Thus ordinary physical dynamics now supplies:

- memory;
- backreaction;
- retention;
- an explicit prediction-error comparator;
- error-sensitive parameter change;
- held-out generalization in a correct model class.

Consciousness is not required for any of these gates.

The new boundary is **structural model revision**. A wrong internal model can fit the calibration response exactly while failing at an untrained frequency. Parameter learning cannot by itself discover that a missing pole, ray or state variable is required.

## 1. Exact extraction of the three channel coefficients

Use

\[
b_T=\begin{pmatrix}1\\0\end{pmatrix},
\qquad
b_V=\begin{pmatrix}0\\1\end{pmatrix},
\qquad
b_S=\begin{pmatrix}1\\1\end{pmatrix}.
\]

Then

\[
R
=a_TQ_T+a_VQ_V+a_SQ_S
=
\begin{pmatrix}
a_T+a_S&a_S\\
a_S&a_V+a_S
\end{pmatrix}.
\]

The response matrix therefore determines the three coefficients exactly:

\[
\boxed{
a_S=R_{12},
\qquad
a_T=R_{11}-R_{12},
\qquad
a_V=R_{22}-R_{12}.
}
\]

These are the dual channel functionals for the tensor, vector and scalar ray basis. They require the full two-probe response matrix; a single scalar contraction would not generally identify all three.

This extraction makes the comparator typed. It does not compare an undifferentiated scalar error. It compares the returned and predicted coefficient in each established relationship channel.

## 2. The comparator as a physical interaction

Represent the returned channel displacement by \(y_i\) and the predicted channel displacement by \(\widehat y_i=a_iq_i\) under a calibration probe \(q_i\). A compliant link between them has energy

\[
E_i
=\frac{k_i}{2}(y_i-\widehat y_i)^2.
\]

If \(a_i\) is a slow configurational coordinate, its generalized force is

\[
F_{a_i}
=-\frac{\partial E_i}{\partial a_i}.
\]

With overdamped mobility \(\mu_i>0\),

\[
\dot a_i
=-\mu_i\frac{\partial E_i}{\partial a_i}.
\]

For unit-normalized probes this becomes

\[
\dot a_i
=-\gamma_i(a_i-a_i^\star),
\qquad
\gamma_i=\mu_i k_i>0.
\]

The comparator therefore requires four physical ingredients:

1. a returned response line;
2. an internal predicted response line;
3. a coupling whose stored energy depends on their mismatch;
4. a dissipative slow coordinate changed by the resulting force.

No observer needs to inspect the error. The residual acts because it stores energy.

## 3. Lyapunov theorem

The comparator energy is a Lyapunov function:

\[
\dot{\mathcal E}
=\sum_i
\frac{\partial\mathcal E}{\partial a_i}\dot a_i
=-\sum_i\gamma_i k_i(a_i-a_i^\star)^2
\le0.
\]

Equality holds only when

\[
a_i=a_i^\star
\]

for every active channel.

Thus the returned response is the unique attracting fixed point in compliance coordinates.

If both \(a_i(0)\) and \(a_i^\star\) are positive, the exact solution is a convex combination:

\[
a_i(t)
=e^{-\gamma_i t}a_i(0)
+\bigl(1-e^{-\gamma_i t}\bigr)a_i^\star
>0.
\]

The positive response cone is forward invariant.

## 4. From learned compliance to learned poles

In the one-pole-per-ray model,

\[
a_i(z_0)
=\frac{w_i}{m_i-z_0}.
\]

Assuming \(w_i>0\) is independently known,

\[
m_i
=z_0+\frac{w_i}{a_i}.
\]

Hence

\[
a_i(t)\longrightarrow a_i^\star
\quad\Longrightarrow\quad
m_i(t)\longrightarrow m_i^\star.
\]

Because \(a_i(t)>0\),

\[
m_i(t)>z_0
\]

throughout learning. The calibration response remains in the static positive domain.

At every intermediate time the reconstructed rational response

\[
R_t(z)
=\sum_i
\frac{w_iQ_i}{m_i(t)-z}
\]

is matrix Herglotz in the upper half-plane because its residues remain positive and its poles remain real.

## 5. Why held-out generalization follows

Suppose the environmental response is exactly

\[
R^\star(z)
=\sum_i
\frac{w_iQ_i}{m_i^\star-z}
\]

with the same known weights and ray directions.

At \(z_0\), equality of the three extracted compliances gives

\[
\frac{w_i}{m_i-z_0}
=
\frac{w_i}{m_i^\star-z_0}.
\]

Since \(w_i\ne0\),

\[
m_i=m_i^\star.
\]

Therefore

\[
\boxed{
R(z)=R^\star(z)
}
\]

for every \(z\) away from the poles.

This is real generalization, but it is conditional. It follows because the correct functional form was already present and calibration identifies its parameters.

## 6. Numerical certificate

The certificate uses

\[
w=(0.8,\ 0.65,\ 0.5),
\]

target poles

\[
m^\star=(2.4,\ 3.2,\ 4.8),
\]

and initial poles

\[
m(0)=(4.2,\ 1.9,\ 7.0).
\]

Learning occurs only at

\[
z_0=0.
\]

The independent held-out test is performed at

\[
z_1=1.2.
\]

The verified results are:

| Quantity | Value |
|---|---:|
| initial comparator loss | \(2.03977\times10^{-2}\) |
| final comparator loss | \(1.73\times10^{-23}\) |
| maximum learned-pole error | \(2.55\times10^{-10}\) |
| largest numerical loss increase | \(0\) |
| initial held-out matrix error | \(0.7169037\) |
| final held-out matrix error | \(2.45\times10^{-11}\) |

The learned poles are

\[
(2.400000000014,\ 3.199999999998,\ 4.800000000255).
\]

The comparator both fits its training response and reconstructs the untrained spectral response to numerical precision.

## 7. The structural-mismatch counterexample

Calibration success does not validate the internal model class.

Take a true scalar response with two poles:

\[
f^\star(z)
=\frac{0.6}{2.1-z}
+\frac{0.4}{5.0-z}.
\]

Fit a one-pole unit-residue model

\[
\widehat f(z)=\frac1{m-z}
\]

at \(z_0=0\). Choosing

\[
m_{\mathrm{fit}}
=\frac1{f^\star(0)}
=2.734375
\]

gives exactly

\[
\widehat f(0)=f^\star(0).
\]

But at the held-out point \(z_1=1.2\), the error is

\[
\boxed{
|\widehat f(1.2)-f^\star(1.2)|
=0.1201987.
}
\]

The training residual is zero while the structural error is large.

This creates a precise distinction:

\[
\boxed{
\text{parameter learning asks “which value?”;}
\qquad
\text{model revision asks “which family?”}
}
\]

No amount of further relaxation at the calibration point can repair a missing pole.

## 8. Does this count as learning?

Under a minimal operational definition, yes. The system:

1. has internal response parameters;
2. receives a returned signal;
3. physically represents prediction mismatch as stored energy;
4. changes its internal parameters because of that mismatch;
5. retains the zero-force parameter state;
6. improves response at an untrained frequency when the model class is correct.

This is stronger than the hysteresis of document 1146. The direction of change is selected by error, not merely by pulse magnitude.

Two qualifications remain.

First, robust consolidation against noise requires pinning, multistability, structural change or continued energetic maintenance. The ideal deterministic slow coordinate remains at the learned zero-force state, but a physical implementation must specify its retention timescale.

Second, the target response and the prediction must be physically co-present during calibration. The construction does not explain how a system chooses probes, decides which mismatch matters or knows when its model class is inadequate.

## 9. Why consciousness is still unnecessary

Nothing in the comparator requires:

- reportability;
- phenomenal character;
- global broadcasting;
- self-attribution;
- confidence judgment;
- awareness of error.

The error is causally effective because it is an energetic displacement. The parameter changes because a generalized force acts on it.

Therefore

\[
\boxed{
\text{error-sensitive learning and held-out generalization are not consciousness-specific.}
}
\]

This does not show that conscious learning is unreal or reducible to this device. It shows that the functional gates reached so far do not require consciousness as an additional physical variable.

## 10. What remains potentially reflexive

The comparator assumes:

- the three ray channels;
- one pole per channel;
- fixed positive residues;
- a chosen calibration probe;
- a defined error norm;
- fixed learning rates.

A stronger system must detect failure of those assumptions and change them.

That requires a second-order loop:

\[
\text{held-out residual}
\longrightarrow
\text{evidence of model-class failure}
\longrightarrow
\text{change of poles, residues, rays, arity or probe policy}.
\]

An even stronger reflexive loop would revise the criterion by which model failure is judged.

These capacities are associated with sophisticated cognition and sometimes with consciousness, but association is not necessity. Automated system identification, immune adaptation and evolutionary search already perform partial structural revision without an agreed consciousness attribution.

## 11. Relation to Spin(2,3)

The learned object is the positive \(H_2(\mathbb R)\) response that supplies the third graph in the two-face symplectic carrier. Positivity preservation ensures the Legendre completion remains available throughout learning.

The comparator is not fully \(Sp(4,\mathbb R)\)-invariant by itself. It uses:

- a selected source/response polarization;
- the typed tensor/vector/scalar ray frame;
- a real calibration coordinate \(z_0\);
- an Euclidean mismatch energy in the extracted channel coordinates.

These are extra relational data, consistent with the state-only covariance no-go in document 1139.

The exact physical insight is not that Spin(2,3) creates learning. It is that a learned positive response can continue to define a valid Spin(2,3) carrier geometry while its pole parameters change.

## 12. Stop-everything tests

**Comparator realization trigger:** identify physical Standard-Model or stress variables that simultaneously instantiate the returned and predicted two-probe response.

**Channel-extraction trigger:** derive the three dual coefficient measurements without arbitrary coordinate calibration.

**Dissipation trigger:** identify the environment that absorbs comparator energy and calculate fluctuation/noise required by that dissipation.

**Retention trigger:** show that learned \(a_i\) persist after calibration signals are removed.

**Model-failure trigger:** demonstrate nonzero held-out residual after perfect calibration fit and derive a physical mechanism that adds or splits a pole.

**Consciousness trigger:** find an observable learning or revision effect that cannot be reproduced by any complete non-conscious comparator state and passes the compile-out test of document 1144.

**Overclaim stop:** successful one-point calibration is not evidence that the internal response family is true.

## 13. Verdict

| Question | Verdict |
|---|---|
| Can prediction error be represented as physical energy? | **yes** |
| Can passive relaxation update the three response channels? | **yes** |
| Is the positive response domain invariant? | **yes** |
| Are the true poles learned in the well-specified family? | **yes** |
| Does the learned response generalize to an untrained frequency? | **yes** |
| Does calibration fit prove the model class? | **no** |
| Does error-sensitive learning require consciousness? | **no** |
| What remains open? | **physical model-class revision and revision of the update rule** |

The consciousness spike has now produced a mostly negative but highly useful answer:

\[
\boxed{
\begin{aligned}
&\text{consciousness is not needed for memory, backreaction, retention,}\\
&\text{prediction error, parameter learning or conditional generalization.}
\end{aligned}
}
\]

If consciousness is the missing thing, its distinctive work must lie beyond these—in structural re-description, global availability, self-attribution, value selection, revision of the learning rule, or phenomenal character itself.

## 14. Dependencies

- [hysteretic retention without learning](1146_hysteresis_supplies_retained_self_modification_without_consciousness_but_not_learning.md)
- [nonlinear backreaction without learning](1145_a_nonlinear_three_ray_bath_backreacts_on_its_own_poles_without_consciousness_but_does_not_learn.md)
- [consciousness compile-out trilemma](1144_consciousness_is_a_live_organizational_spike_but_not_yet_the_missing_physical_coupling.md)
- [three-ray conservative memory](1143_three_relationship_rays_have_a_minimal_self_adjoint_memory_realization_but_no_adaptive_couplings.md)
- [state-only covariance no-go](1139_full_spin23_covariance_forbids_a_nonzero_state_only_feedback_generator.md)
