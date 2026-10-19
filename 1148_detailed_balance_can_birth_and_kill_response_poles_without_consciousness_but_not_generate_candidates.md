# Detailed Balance Can Birth and Kill Response Poles Without Consciousness but Not Generate Candidates

**Date:** 19 October 2026  
**Branches:** structural learning, pole birth and death, complexity control, passive response, consciousness spike  
**Claim status:** exact two-architecture selection model; candidate-generation mechanism remains open  
**Certificate:** [verify_detailed_balance_pole_birth_selects_structure_with_complexity_cost.mjs](scripts/verify_detailed_balance_pole_birth_selects_structure_with_complexity_cost.mjs)

## Executive result

The model-class revision gate left open by document 1147 also has a minimal non-conscious physical realization.

Let an architecture \(\mathcal M_K\) contain \(K\) active positive-residue poles and let its held-out response error be \(\chi_K^2\). Assign the structural energy

\[
\boxed{
E_K
=\frac12\chi_K^2+\lambda K,
}
\]

where \(\lambda>0\) is the energetic or material cost per retained internal mode.

Allow thermal transitions between the \(K\)-pole and \((K+1)\)-pole architectures with rates satisfying detailed balance:

\[
\frac{k_{K\to K+1}}{k_{K+1\to K}}
=e^{-\beta(E_{K+1}-E_K)}.
\]

The additional pole is favored precisely when

\[
\boxed{
\frac12\left(\chi_K^2-\chi_{K+1}^2\right)>\lambda.
}
\]

Thus a new pole is retained only when its reduction of held-out mismatch exceeds its complexity cost. An unnecessary pole is removed because it adds cost without sufficient explanatory gain.

If every admitted residue is positive semidefinite, both architectures remain matrix Herglotz. Structural revision need not leave the passive response class.

The certificate verifies both directions:

- a one-pole model that fits calibration but misses a genuine second pole transitions to the two-pole architecture with probability \(0.99909\);
- an unnecessary second pole in a one-pole world is rejected with probability \(0.99960\).

This means memory, feedback, retention, parameter learning, held-out generalization and elementary model-class revision all admit non-conscious realizations.

The remaining unsolved step is **candidate generation**. Detailed balance can select between supplied structures; it does not explain where a correctly placed new pole, ray or state variable comes from.

## 1. Why held-out error must drive structural revision

A model can achieve

\[
\chi_{\mathrm{cal}}^2=0
\]

while retaining nonzero error away from the calibration condition.

Document 1147 gave the explicit example

\[
f^\star(z)
=\frac{0.6}{2.1-z}
+\frac{0.4}{5.0-z},
\]

whose value at \(z_0=0\) is matched exactly by

\[
\widehat f_1(z)
=\frac1{2.734375-z}.
\]

The one-pole model has zero calibration error but nonzero spectral residual. Parameter relaxation has stopped because its local comparator force is zero.

Structural revision must therefore be driven by an independently retained residual:

\[
\chi_K^2
=\sum_{a\in\mathrm{held\ out}}
\left\|
R_K(z_a)-R^\star(z_a)
\right\|^2.
\]

The held-out condition is not merely a statistical nicety. It supplies a force that cannot be eliminated by retuning the already calibrated parameters.

## 2. Complexity as physical cost

Without a cost for internal structure, every unexplained fluctuation could recruit another hidden mode. The model would grow without bound.

Assign

\[
E_{\mathrm{complexity}}(K)=\lambda K.
\]

The parameter \(\lambda\) can represent:

- material needed to maintain an internal oscillator;
- metabolic or control cost;
- additional phase-space volume requiring stabilization;
- free-energy cost of a defect or bound state;
- a prior or description-length penalty in an effective inference description.

Only the first four are immediately physical. The last is a useful coarse-grained interpretation unless a coding or information-bearing substrate is specified.

The total structural energy is

\[
E_K
=E_{\mathrm{mismatch}}+E_{\mathrm{complexity}}
=\frac12\chi_K^2+\lambda K.
\]

The mode-admission inequality follows directly:

\[
E_{K+1}<E_K
\quad\Longleftrightarrow\quad
\frac12(\chi_K^2-\chi_{K+1}^2)>\lambda.
\]

## 3. A physical birth/death switch

Let a structural gate have two metastable states:

\[
g=0:\ \mathcal M_K,
\qquad
g=1:\ \mathcal M_{K+1}.
\]

Thermal activation across the gate barrier gives rates that can be chosen in symmetric detailed-balance form:

\[
\begin{aligned}
k_{0\to1}
&=k_0e^{-\beta(E_1-E_0)/2},\\
k_{1\to0}
&=k_0e^{+\beta(E_1-E_0)/2}.
\end{aligned}
\]

Their ratio is

\[
\frac{k_{0\to1}}{k_{1\to0}}
=e^{-\beta(E_1-E_0)}.
\]

The stationary probability of the enlarged architecture is

\[
p_1
=\frac{e^{-\beta E_1}}
{e^{-\beta E_0}+e^{-\beta E_1}}
=\frac1{1+e^{\beta(E_1-E_0)}}.
\]

At low effective temperature, the lower structural energy is selected with high probability.

This is a stochastic open-system mechanism. It does not require a homunculus that compares models and makes a choice.

## 4. Preservation of passive response

Suppose the \(K\)-pole response is

\[
R_K(z)
=\sum_{j=1}^{K}
\frac{W_j}{m_j-z},
\qquad
W_j\succeq0,
\qquad
m_j\in\mathbb R.
\]

A pole birth adds

\[
\frac{W_{K+1}}{m_{K+1}-z},
\qquad
W_{K+1}\succeq0.
\]

For \(\operatorname{Im}z>0\),

\[
\operatorname{Im}R_{K+1}(z)
=\operatorname{Im}R_K(z)
+\frac{\operatorname{Im}z}
{|m_{K+1}-z|^2}W_{K+1}
\succeq0.
\]

Pole death removes a positive spectral atom but leaves the remaining response Herglotz.

Strict positivity may be lost if the removed residues were required to span the observed space. The structural selector must therefore distinguish:

- passivity: every residue is positive;
- strict observability: active residue ranges span the response space.

## 5. Numerical selection test

For the genuine two-pole target, the one-pole calibration fit has held-out squared error

\[
\chi_1^2=0.10854563,
\]

while the supplied two-pole architecture has

\[
\chi_2^2=0.
\]

The certificate sets

\[
\lambda=\frac14\chi_1^2
=0.02713641.
\]

Therefore

\[
E_1=0.08140922,
\qquad
E_2=0.05427281,
\]

and the two-pole architecture is favored.

Under the chosen inverse temperature, its stationary probability is

\[
p_2=0.99908895.
\]

For a genuine one-pole target, adding an unnecessary fixed positive pole produces

\[
\chi_2^2=0.00647411
\]

as well as the extra complexity cost. The one-pole architecture then has probability

\[
p_1=0.99960452.
\]

The transition-rate ratios satisfy detailed balance to numerical precision, and both active response models have positive upper-half-plane imaginary part.

## 6. What has genuinely been achieved

The structural gate does more than tune a continuous parameter. It changes the dimension of the retained realization:

\[
\dim E:K\longleftrightarrow K+1.
\]

In reduced response language, a spectral atom is born or dies. In an enlarged microscopic description, a dormant positive-residue mode is activated or deactivated.

The decision is:

- driven by held-out mismatch rather than calibration error;
- opposed by a cost for internal complexity;
- stochastic but biased by a thermodynamic energy difference;
- compatible with passive matrix response.

This meets a minimal operational definition of structural learning between supplied candidates.

## 7. What remains unsolved

The correct extra mode was available in advance:

\[
\frac{0.4}{5-z}.
\]

The selector did not derive:

- the pole location \(m=5\);
- the residue \(0.4\);
- the ray direction of a matrix residue;
- whether the residual calls for a pole, branch cut, delay, nonlinearity or new observed coordinate.

Candidate generation is a different problem from candidate selection.

A general residual

\[
\Delta R(z)
=R^\star(z)-R_K(z)
\]

must be converted into a proposed positive spectral atom

\[
\frac{W_{\mathrm{new}}}{m_{\mathrm{new}}-z},
\qquad
W_{\mathrm{new}}\succeq0.
\]

This is an inverse spectral problem. With finite noisy samples it is nonunique. Positivity, causality, sum rules and complexity bounds can constrain it, but do not generally make it unique.

## 8. Consequence for consciousness

The functional territory initially assigned to consciousness has repeatedly contracted:

| Gate | Non-conscious realization |
|---|---|
| memory | self-adjoint bath |
| endogenous backreaction | nonlinear quartic bath |
| persistent state change | dissipative hysteresis |
| prediction-error learning | passive comparator |
| held-out generalization | correct parametric response family |
| supplied model-class selection | detailed-balance structural gate |

None of these gates supplies evidence that phenomenal consciousness is an independent physical state.

The remaining candidates are:

1. generating a novel representation rather than selecting a supplied one;
2. choosing which discrepancies count as errors;
3. combining incompatible domains into a globally available model;
4. attributing consequences to the system's own acts;
5. revising the rule by which revision occurs;
6. phenomenal character itself.

The first five remain implementable in principle by larger non-conscious systems. If they are fully specified as causal operations, they face the compile-out result of document 1144. Phenomenal character may still be real and central without being the missing term in the response dynamics.

## 9. Relation to Spin(2,3)

Pole birth changes the dimension of the hidden realization, not the dimension of the observed four-dimensional symplectic carrier. The observed response remains a positive \(2\times2\) graph whenever the active residues span \(\mathbb R^2\).

Thus different hidden model classes can project to the same Spin(2,3) carrier:

\[
\text{many internal realizations}
\longrightarrow
\text{one observed positive }H_2(\mathbb R)\text{ response}.
\]

This reinforces a recurring programme lesson: the carrier geometry constrains admissible observed response, but it does not uniquely reconstruct hidden ontology.

No Spin(2,3) invariant currently generates the candidate pole or fixes \(\lambda\).

## 10. Stop-everything tests

**Residual factorization trigger:** derive a positive-residue pole proposal directly from an observed held-out matrix residual.

**Uniqueness trigger:** prove that causality, positivity, asymptotics and programme typing select a unique minimal additional mode.

**Microscopic gate trigger:** identify a dormant physical mode whose activation energy equals the complexity cost and whose coupling produces the proposed residue.

**Strict-positivity trigger:** verify that pole death does not collapse the response to a rank-one boundary.

**Novel-representation trigger:** demonstrate a system generating the correct new pole/ray without the candidate being pre-enumerated.

**Consciousness trigger:** show that conscious state changes candidate generation under controls that fix all accessible physical model-selection variables.

**Selection stop:** do not call selection among pre-existing candidates creation of a new representation.

## 11. Verdict

| Question | Verdict |
|---|---|
| Can a passive stochastic mechanism add or remove a pole? | **yes** |
| Can held-out error rather than calibration error drive it? | **yes** |
| Can complexity prevent unlimited mode growth? | **yes** |
| Is matrix Herglotz positivity preserved? | **yes, for positive residues** |
| Is strict response rank automatically preserved under death? | **no** |
| Does supplied model-class selection require consciousness? | **no** |
| Does the mechanism generate the correct candidate? | **no** |
| Is candidate generation unique from finite response data? | **generally no** |

The consciousness spike has reached a provisional stopping point:

\[
\boxed{
\text{no functional necessity for consciousness has appeared in the response-learning hierarchy.}
}
\]

The project can continue into inverse spectral candidate generation, but that is a problem of underdetermined model construction—not presently evidence of a missing conscious physical field.

## 12. Dependencies

- [passive comparator learning and generalization](1147_a_passive_three_ray_comparator_learns_the_response_and_generalizes_without_consciousness.md)
- [hysteretic retention](1146_hysteresis_supplies_retained_self_modification_without_consciousness_but_not_learning.md)
- [nonlinear pole backreaction](1145_a_nonlinear_three_ray_bath_backreacts_on_its_own_poles_without_consciousness_but_does_not_learn.md)
- [consciousness compile-out trilemma](1144_consciousness_is_a_live_organizational_spike_but_not_yet_the_missing_physical_coupling.md)
- [finite positive-response realization theorem](666_every_finite_rational_positive_matrix_response_has_a_finite_relational_carrier_realization.md)
