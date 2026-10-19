# The Landscape, the Response-Geometry Conjecture, and a Metric–Higgs Strike

**Date:** 17 October 2026  
**Status:** programme-level synthesis, new conjecture and falsifiable next campaign  
**Authority:** exact results are distinguished from proposed identifications; no claim of new physics is admitted here

## Executive assessment

The project is no longer primarily a search for suggestive appearances of `Spin(2,3)`. It has built three substantial structures:

1. an exact Jordan–Schur–symplectic mathematical spine;
2. a surprisingly detailed Standard-Model representation, anomaly and discrete-arithmetic spine;
3. a causal passive-response spine with operator-valued measures, boundary values, conservative dilations and strict no-go theorems.

The three spines do not yet form a physical theory. Their common missing object is a **microscopically defined, gauge-invariant two-source response kernel** whose spectral measure, Schur reductions and physical transformations realize the already-derived carrier without arbitrary probe choices.

The brave but defensible hypothesis is therefore:

> `Spin_0(2,3)` is not fundamentally an extra Standard-Model gauge group and need not be a literal five-dimensional spacetime symmetry. It may be the conformal/dynamical envelope of a selected two-channel causal response of the Standard Model, with Schur elimination acting as physical coarse-graining and the positive operator-valued boundary measure carrying the actual spectrum.

This is a stronger scientific position than a group resemblance and a weaker ontological claim than a new spacetime. It is strong enough to make predictions and weak enough to be falsified by one explicit response calculation.

## 1. The landscape at a glance

| Region | What is solid | What is not yet earned | Present confidence |
|---|---|---|---|
| Jordan geometry | `H_2(R)`, its determinant cone, TKK algebra `sp(4,R)` and global `Spin_0(2,3)` cover | that this full group acts on physical Standard-Model observables | high mathematics; low physical identification |
| Schur sewing | exact finite-dimensional, bounded-operator and real-axis boundary dispatchers | unbounded interacting QFT domains and model-specific LAP estimates | high in declared scope |
| Causal response | Herglotz positivity, operator-valued measures, atom/density/threshold split, outgoing-port dilation | a unique Standard-Model response realizing the special selector data | high framework; open realization |
| Stress route | Ward quotient gives legal positive two-probe responses; media can span all `H_2(R)` | canonical probes, fixed counterterms and a physical full-group action | medium-high kinematics; low dynamics |
| Furey/internal route | exact modules, anomaly-free TRO candidates, Higgs/Yukawa and real-structure obstructions | unique generations, observed masses/mixing and a selected action | substantial representation theory; open physics |
| Code/arithmetic route | exact one-generation weight/code equivalence, cubic anomaly structure and protected `C_3` data | typed dynamical map from code operations to response amplitudes | high discrete mathematics; speculative interface |
| Selector/loss route | `A_2`, `S_3`, silver-reactance and minimal dilation theorems recur exactly | why nature chooses the involutive reactance, phase and scale | high conditional structure; low selection mechanism |
| Phenomenology | many null tests and structural inequalities are available | a parameter-sparse observable not freely adjustable by EFT coefficients | early |

The project has therefore crossed an important threshold. Its main risk is no longer algebraic inconsistency. Its main risk is **ambient-geometry inflation**: mistaking a beautiful cone, dilation or representation containing the data for a symmetry that dynamically constrains the data.

## 2. What the corpus has really discovered

### 2.1 The exact mathematical spine

For a real symmetric positive two-channel response,

\[
M\in H_2(\mathbb R)_+,
\]

the determinant is a Lorentzian quadratic form, the conformal algebra is `sp(4,R)`, and the connected global group is covered by `Spin_0(2,3)`. Schur complements compose such responses, while the TKK construction recovers the ten-dimensional Lie algebra from the Jordan triple product.

This is exact, executable and no longer the speculative part of the programme.

### 2.2 The physical meaning of Schur elimination

Across scalar networks, operator models, spectral measures and dissipative dilations, the same operation appears:

\[
M_{\rm eff}=A-BD^{-1}B^*.
\]

It means integrating out an interior, closing hidden ports, conditioning a Gaussian system, taking a Dirichlet-to-Neumann map, or reducing a coupled response. The D-02 work establishes exactly when this operation survives singular ranges and real-axis limits, and exactly when it does not.

This suggests that the programme's primitive is not a particle multiplet but a **composable response relation**.

### 2.3 Spectrum lives in a measure, not a matrix at one frequency

The real-axis work changes the ontology. The canonical object is the positive operator-valued measure `Sigma`. A boundary matrix, density, residue, threshold exponent or principal value is a typed projection of that measure.

Consequently, a prospective unification cannot be certified at one attractive frequency or one finite matrix. It must constrain the spectral measure, its channel geometry and its transformation law across a nontrivial domain.

### 2.4 Dissipation is not evidence for hidden particles

The minimal outgoing-port theorem shows that a smooth anti-Hermitian response requires retained ports, a continuum or an outgoing boundary condition. Eliminating a finite closed Hermitian multiplet cannot generate it.

This is conceptually important. The repeated `A_2` environment may be a channel space, placement amplitude, continuum multiplicity or Stinespring environment. Its dimension must not be read as a particle count.

### 2.5 The Standard Model appears as structure on sources

The Furey and code branches increasingly identify exact structures on the **space of allowed source labels**:

- anomaly cancellation as a cubic integral constraint;
- weak Weyl reflection as a primitive first-order seam;
- Higgs population exchange as a canonical projector involution;
- color augmentation as an `A_2` metric;
- lepton/color bilocals as two independent response legs;
- mediator exchange as a source of off-diagonal response.

None of these facts proves a new spacetime. Together they suggest that internal algebra may select the sources and involutions of an external response geometry.

## 3. The central convergence

The four most persistent structures can now be placed in one typed chain:

\[
\begin{array}{c}
\text{Standard-Model gauge-invariant source pair}\\
\downarrow\ \text{retarded two-point function / spectral measure}\\
\text{positive two-channel Herglotz response}\\
\downarrow\ \text{Ward quotient and Schur elimination}\\
H_2(\mathbb R)_+\ \text{or a topology-labelled boundary form}\\
\downarrow\ \text{Jordan triple / fractional response transformations}\\
Sp(4,\mathbb R)\cong Spin_0(2,3).
\end{array}
\]

Every arrow except the first is now understood in substantial mathematical detail. The first arrow is the decisive physical frontier.

## 4. The response-geometry conjecture

Let `O_1` and `O_2` be two renormalized gauge-invariant Hermitian Standard-Model composite operators, selected without reference to a desired Jordan basis. Define their retarded response

\[
G^R_{ab}(z,\mathbf k)
=i\int_0^\infty dt\,e^{izt}
\langle[O_a(t,\mathbf k),O_b(0,-\mathbf k)]\rangle,
\qquad \operatorname{Im}z>0.
\]

After the required subtractions and sign convention, suppose the passive response `M(z)` has

\[
\operatorname{Im}M(z)\succeq0
\]

and hence a positive `2 x 2` matrix-valued spectral measure.

### Conjecture

There exists a physically selected Standard-Model source pair and regime for which:

1. the spectral matrices explore an open subset of `H_2(R)_+`, rather than a ray or fixed plane;
2. Ward identities and renormalization fix the admissible contact/subtraction freedom tightly enough to leave invariant shape data;
3. a Higgs/weak reflection supplies the face involution that distinguishes two response eigenchannels;
4. integrating out the complementary sector is represented by the D-02 Schur dispatcher;
5. the physical family is covariant under a nontrivial subgroup mixing all three Jordan coordinates;
6. at a special surface in state or coupling space, the normalized Cayley generator approaches an involution, producing the silver response ratios already derived conditionally;
7. the associated dilation environment carries the same typed `A_2` doublet as the weak/color/code construction, not merely an abstract isomorphic copy.

Items 1–2 would establish a physical Jordan carrier. Items 3–5 would establish a response symmetry. Items 6–7 would connect the more distinctive arithmetic and selector claims. Failure at an earlier item prevents claims at later items.

## 5. Why the next strike should be metric–Higgs

The most economical source pair is not an arbitrary pair of detectors. It is the pair generated by two physically meaningful deformations:

\[
O_g\sim \frac{\delta S}{\delta\sigma}
\quad\text{and}\quad
O_H=\frac{\delta S}{\delta m_H^2},
\]

where `sigma` is a local Weyl/metric source and `m_H^2` is the Higgs mass parameter. Schematically, these are the renormalized trace response and `H^\dagger H`, with operator mixing handled rather than ignored.

This pair is attractive for five reasons:

1. it joins the original stress-energy question directly to electroweak mass generation;
2. both entries are gauge-invariant scalar sources;
3. their cross spectral density is physical information rather than probe geometry inserted by hand;
4. the Higgs ray is already the strongest candidate for the required reflection spurion;
5. finite temperature near the electroweak crossover supplies state variables capable of moving the spectral image in more than one direction.

The proposal is not that `T^mu_mu` and `H^dagger H` are automatically a Jordan doublet. The proposal is to calculate their response and let it decide.

## 6. D-03: the metric–Higgs spectral strike

### D-03.1 — operator and scheme definition

Construct a BRST-consistent renormalized operator basis containing the stress trace, `H^dagger H`, curvature improvements and every operator with which they mix. Define source derivatives of a renormalized generating functional so that basis changes and finite counterterms are explicit congruences or declared losses.

**Pass:** a two-source absorptive spectral matrix is scheme independent up to a known source transformation.  
**Fail:** allowed local redefinitions arbitrarily change its normalized orientation or determinant data.

### D-03.2 — positivity and Ward quotient

Derive the Kallen–Lehmann/thermal spectral representation, determine the positive-frequency cone, and separate contact terms, zero modes, Goldstone mixing and gauge artifacts.

**Pass:** the absorptive matrix is positive semidefinite for physical frequencies and the Ward-null directions satisfy the D-02 range gate.  
**Fail:** positivity exists only after a gauge-dependent or nonlocal choice that erases physical meaning.

### D-03.3 — first calculable model

Do not begin with the full nonperturbative Standard Model. Use an escalating ladder:

1. free Higgs plus an improved stress tensor;
2. Abelian Higgs model;
3. electroweak gauge–Higgs sector at one loop;
4. finite-temperature electroweak plasma;
5. QCD and Yukawa corrections or lattice input.

At each rung calculate the three independent entries of the spectral matrix and its rank, determinant, eigenvector angle and frequency/state dependence.

### D-03.4 — full-carrier discriminant

Let

\[
v(\rho)=(\rho_{11},\rho_{22},\sqrt2\rho_{12}).
\]

Measure the rank of the Jacobian of `v(rho)` with respect to independent controls such as frequency, momentum, temperature and Higgs background.

**Pass:** rank three occurs on an open physical patch.  
**Reduced outcome:** rank two gives a physical `Spin(2,2)`-type slice.  
**Fail:** rank one leaves only a ray and makes the ambient `Spin(2,3)` dynamically empty.

### D-03.5 — transformation test

Determine the actual transformations induced by source redefinitions, RG flow, KMS relations, Higgs reflection and Schur elimination. Test whether they close on the measured spectral family.

**Pass:** a nontrivial transformation mixes all three response coordinates while preserving the physical family and its measure.  
**Ambient-only outcome:** transformations preserve the cone but not the Standard-Model spectral image.

### D-03.6 — selector and arithmetic comparison

Only after D-03.1–5 pass, compare the normalized dissipative defect with the `A_2` environment, the weak/code reflection and the conditional silver involution.

The required evidence is a typed intertwiner preserving:

- source meaning;
- reflection action;
- spectral normalization;
- composition law;
- reality/antiunitary structure;
- and, where claimed, the integral lattice.

Equal dimension, equal character or equal group order is insufficient.

## 7. What would count as new physics

There are four increasingly strong outcomes.

### Outcome A — a new calculational language

The response geometry efficiently organizes Standard-Model spectral data and coarse-graining but adds no new constraint. This would still be useful mathematical physics, not unification.

### Outcome B — a new null relation

Ward identities, source selection and Schur closure force a nontrivial relation among spectral entries or moments. Examples include a determinant inequality stricter than positivity, a frequency-independent cross ratio, a topology-labelled residue constraint, or a forbidden operator-mixing direction.

This is the minimum publishable physical success.

### Outcome C — a correlated multi-regime prediction

One common response parameter controls quantities in two domains—for example a thermal spectral angle and a Higgs/gravitational form-factor combination—while ordinary EFT would allow them to vary independently.

This would be serious evidence for a shared response geometry.

### Outcome D — emergent `Spin(2,3)` covariance

The complete physical spectral family, including sources, thresholds and boundary measure, is closed under transformations generating `Sp(4,R)` or a dense physically meaningful subgroup, and this covariance fixes at least one dimensionless observable.

Only this outcome warrants saying the Standard Model exhibits a dynamical `Spin(2,3)` response symmetry.

## 8. Why this attempt is genuinely risky

The likely failure modes are severe:

1. the metric–Higgs response may occupy only a one- or two-dimensional slice;
2. operator mixing may leave no invariant orientation;
3. the Higgs reflection may not act on the renormalized spectral family;
4. `Sp(4,R)` may be only the automorphism group of an ambient cone;
5. the silver involution may be a tuned network checkpoint with no Standard-Model analogue;
6. the `A_2` recurrences may be multiple realizations of a common small representation rather than one physical object;
7. full covariance may require a medium or boundary and therefore describe a state, not a fundamental law;
8. the calculation may yield generic EFT coefficients and no prediction.

These are strengths of the proposed strike: each failure has a calculable signature and retires a class of claims.

## 9. The deepest possible interpretation

If the conjecture succeeds, the resulting picture is neither conventional grand unification nor extra-dimensional gravity.

- Standard-Model gauge symmetry governs which microscopic operators and states exist.
- Stress-energy and other source derivatives define how those states respond.
- Positivity and causality organize the response into a spectral cone.
- Schur complement composition expresses the fact that observers never retain every channel.
- A selected two-source cone has Jordan geometry.
- `Spin(2,3)` is the symmetry of admissible changes of response chart and composition, not necessarily a symmetry acting linearly on elementary fields.
- Discrete Furey/code/arithmetic data may select the source pair, reflection and integral form, while the continuum spectrum supplies the measure and dissipation.

In one sentence:

> Internal algebra would choose what can couple; causal response would determine what can be observed; Jordan geometry would govern how partial observations compose.

That is a coherent candidate architecture for linking internal quantum numbers, stress-energy and emergent geometry without claiming that the stress tensor contains the whole Standard Model or that an ambient group is automatically fundamental.

## 10. Decision

The highest-value next action is D-03.1–4: define and calculate the metric–Higgs two-source spectral response through the Abelian-Higgs and electroweak-Higgs rungs, with an explicit rank-three/full-carrier discriminant.

Do not extend the combinatorial superstructure before this calculation. The corpus already contains enough candidate selectors, lattices, groups and dilations. What it lacks is one response matrix that nature—or at least a controlled Standard-Model calculation—actually supplies.

## 11. First D-03 checkpoint

The initial execution has sharpened the proposed ladder.

For a free conformally improved Higgs multiplet, the separated-point trace is proportional to `H^dagger H`; the metric–Higgs spectral matrix is therefore a rank-one ray. Adding the leading gauge trace-anomaly channel produces positive spectral innovation and rank-two matrices, but all of them remain in the fixed plane spanned by the Higgs ray and the metric-only anomaly axis.

The exact full-carrier criterion is projective. A resolved state class contributes the rank-one projector of its two source amplitudes. Three finite real ratios `r_i=<i|O_g|0>/<i|O_H|0>` have coordinate determinant

`sqrt(2)(r_2-r_1)(r_3-r_1)(r_3-r_2)`.

Thus three pairwise distinct ratios span `H_2(R)`. The gauge-only channel is the corresponding projective point at infinity. This reduces the next physical gate to the source-amplitude ratio of the lowest mixed or four-scalar Abelian-Higgs cut, followed by a test that its weight varies independently.

See [the executable checkpoint](../../../integrations/claimipedia/research-method/D03-METRIC-HIGGS-CHECKPOINT.md).

## External orientation

- Operator-valued Herglotz functions provide the correct measure-valued analytic setting: https://arxiv.org/abs/math/9802103
- Thermal stress spectral channels are established calculational objects: https://arxiv.org/abs/0806.3914
- Thermal OPE and sum rules show that nonuniform ultraviolet tails require explicit control: https://arxiv.org/abs/0903.3958
- The new Standard-Model code construction gives an independent exact cubic/anomaly structure, but not the response bridge: https://arxiv.org/abs/2610.21879

## Local evidence spine

- [Standard Model as stress-energy](../0000-0099/01_standard_model_as_stress_energy_full_analysis.md)
- [Conserved stress quotient](../0200-0299/206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Vacuum stress-family obstruction](../0200-0299/208_stress_spectral_family_dimension_and_ambient_sp4_obstruction.md)
- [Thermal full-span escape](../0200-0299/211_thermal_stress_channels_can_span_full_h2.md)
- [Bounded real-axis boundary report](../../../integrations/claimipedia/research-method/D02-BOUNDARY-FINAL-REPORT.md)
- [Outgoing-port Schur theorem](962_the_dissipative_cayley_generator_has_a_minimal_outgoing_port_schur_realization_but_no_closed_finite_hermitian_elimination.md)
