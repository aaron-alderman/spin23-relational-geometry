# Two Positive Spectral Models Match the Same Finite Data, So Candidate Generation Requires a Prior

**Date:** 19 October 2026  
**Branches:** inverse spectral reconstruction, matrix Herglotz response, passive learning, pole birth, model-class revision  
**Claim status:** exact finite-data nonuniqueness certificate; boundary theorem for the candidate-generation branch

## Executive result

Finite response samples do not, by themselves, generate a unique new pole—even after imposing causality, positive residues, real poles and a fixed relationship-ray direction.

The ambiguity is explicit:

\[
f_1(z)=\frac{1}{3-z},
\qquad
f_2(z)=\frac{1/3}{2-z}+\frac{5/6}{5-z}.
\]

Both are rational Herglotz functions with positive atomic spectral measures. They agree at the two calibration points

\[
f_1(0)=f_2(0)=\frac13,
\qquad
f_1(-1)=f_2(-1)=\frac14,
\]

but at the held-out point \(z=1\),

\[
f_1(1)=\frac12,\qquad
f_2(1)=\frac{13}{24},
\qquad
f_2(1)-f_1(1)=\frac1{24}.
\]

Therefore:

\[
\boxed{
\text{finite fit}+\text{causality}+\text{positivity}
\;\not\Longrightarrow\;
\text{unique hidden spectrum}.
}
\]

This is the missing distinction left open by document 1148. Detailed balance can select among proposed model classes, but the measured residual does not generally nominate a unique candidate. Candidate generation requires an additional prior, experiment or microscopic mechanism.

This is not evidence for consciousness. It is an identifiability boundary.

## 1. Exact scalar certificate

For \(z=x+iy\) with \(y>0\),

\[
\operatorname{Im}\frac{w}{m-z}
=
\frac{wy}{(m-x)^2+y^2}>0
\]

whenever \(w>0\) and \(m\in\mathbb R\). Hence both \(f_1\) and \(f_2\) map the upper half-plane into itself. Their representing measures are

\[
d\mu_1(t)=\delta_3(t),
\qquad
d\mu_2(t)=\frac13\delta_2(t)+\frac56\delta_5(t).
\]

The two calibration equalities are elementary:

\[
f_2(0)=\frac{1}{6}+\frac{1}{6}=\frac13,
\qquad
f_2(-1)=\frac{1}{9}+\frac{5}{36}=\frac14.
\]

Yet the spectral supports \(\{3\}\) and \(\{2,5\}\) are different. No relabelling makes one measure the other. The data therefore fail to determine either the number or locations of the hidden modes.

## 2. Why the one-pole answer can nevertheless look unique

If one assumes in advance that

\[
f(z)=\frac{w}{m-z}
\]

has exactly one pole, then two distinct samples \(a=f(z_0)\) and \(b=f(z_1)\) determine

\[
m=\frac{az_0-bz_1}{a-b},
\qquad
w=a(m-z_0),
\]

provided \(a\neq b\).

This is conditional identifiability. The samples identify the parameters *inside the stipulated one-pole family*. They do not establish that the family is true. The two-pole \(f_2\) proves that positivity does not repair this logical gap.

Thus the inference

\[
\text{two samples}\longrightarrow\text{one pole}
\]

quietly contains a minimum-degree or fixed-order prior.

## 3. Lift to the programme's three-ray matrix response

Let

\[
b_T=\binom10,\qquad
b_V=\binom01,\qquad
b_S=\binom11,
\qquad
Q_i=b_ib_i^T.
\]

Define two response models

\[
R_k(z)
=
\frac{0.7Q_T}{4-z}
+\frac{0.6Q_V}{6-z}
+f_k(z)Q_S,
\qquad k\in\{1,2\}.
\]

Because \(b_T,b_V\) span the probe space and every scalar coefficient has positive imaginary part in the upper half-plane,

\[
\operatorname{Im}R_k(z)>0
\qquad (\operatorname{Im}z>0).
\]

Both models are therefore strict matrix-Herglotz responses. They have identical calibration matrices at \(z=0\) and \(z=-1\), yet

\[
R_2(1)-R_1(1)=\frac1{24}Q_S\neq0.
\]

The ambiguity survives every structural restriction used in the example:

- the response is causal/Herglotz;
- all residues are positive semidefinite;
- all poles are real;
- the tensor/vector/scalar relationship rays are fixed;
- both matrix responses are strict, not merely semidefinite;
- the ambiguity occurs only in the hidden realization along one already-known ray.

So the problem is not caused by allowing arbitrary ray rotations or non-passive fits. It is already present in the narrowest live family.

## 4. Coordinate-free cone statement

Let \(V\) be a Euclidean Jordan algebra with positive cone \(V_+\), and choose any nonzero \(Q\in V_+\). If two scalar Herglotz functions \(f\) and \(g\) agree on a finite calibration set but differ elsewhere, then

\[
F(z)=A(z)+f(z)Q,
\qquad
G(z)=A(z)+g(z)Q
\]

agree on the calibration set and differ elsewhere. If the background \(A\) supplies strict positivity on the complement of the support of \(Q\), both can be strict cone-valued Herglotz functions.

Consequently the nonuniqueness is not a coordinate artifact of \(2\times2\) matrices. It lifts along every positive Jordan ray. The \(H_2(\mathbb R)\) / \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) realization constrains how the response is organized; it does not make a truncated inverse spectral problem unique.

## 5. Relation to established interpolation theory

This result is a concrete instance of mature Nevanlinna–Pick and moment-problem theory. Matrix-valued Nevanlinna–Pick interpolation has solvability criteria and, in nondegenerate cases, parameterized families of solutions rather than a unique interpolant. Delsarte, Genin and Kamp connect the matrix problem with trigonometric moment problems and discuss uniqueness conditions: [The Nevanlinna–Pick Problem for Matrix-Valued Functions](https://doi.org/10.1137/0136005).

Later matrix interpolation work likewise gives parameterized descriptions of all solutions in the nondegenerate case: [A multiple point Nevanlinna–Pick type interpolation problem with both interior and boundary data for Carathéodory matrix-valued functions](https://doi.org/10.1002/mana.200810010).

Passivity-preserving model reduction uses positive-real interpolation, Pick matrices and Loewner matrices precisely because interpolation and realization order must be handled together: [Antoulas, A new result on passivity preserving model reduction](https://doi.org/10.1016/j.sysconle.2004.07.007).

The programme-specific contribution here is not the discovery of interpolation nonuniqueness. It is locating that nonuniqueness exactly inside the three-ray positive response ladder and showing why the pole-birth mechanism of document 1148 cannot generate its own candidate from finite data alone.

## 6. What can supply the missing prior

The branch reopens if at least one additional source of structure is justified.

### 6.1 Minimum realization degree

Choose the passive interpolant of minimum McMillan degree. For the example, this selects \(f_1\). This is mathematically clean, but it is an Occam prior—not a consequence of the two samples.

### 6.2 A bound on the number of atoms

If microscopic theory proves there is exactly one active mode on the ray, two generic samples suffice. If it permits \(K\) modes, enough independent moments or samples are required to identify a \(K\)-atomic measure under suitable nondegeneracy conditions.

### 6.3 Ultraviolet asymptotics and sum rules

The large-\(z\) expansion

\[
f(z)
=
-\frac{\sum_jw_j}{z}
-\frac{\sum_jw_jm_j}{z^2}
-\frac{\sum_jw_jm_j^2}{z^3}
-\cdots
\]

encodes spectral moments. Known equal-time commutators, operator-product asymptotics or conservation-law sum rules can therefore remove otherwise admissible interpolants.

For the counterexample,

\[
\sum w_j=1
\quad\text{for }f_1,
\qquad
\sum w_j=\frac76
\quad\text{for }f_2,
\]

so a known zeroth spectral moment would immediately distinguish them.

### 6.4 More measurements

An extra sample at \(z=1\) separates the two exhibited models. In general, however, any fixed finite number of samples can remain insufficient if model order is unbounded. Experimental design must be coupled to an order or regularity class.

### 6.5 Interventions rather than passive observations

Changing boundary conditions, exciting selected channels or moving the background state may expose a hidden mode that is invisible to a fixed observation protocol. Interventional identifiability can be stronger than interpolation from one response curve.

### 6.6 A microscopic birth mechanism

A physical instability may itself specify a candidate location and ray: an eigenvalue softens, a bound state enters the spectrum, or a symmetry-breaking channel becomes unstable. In that case the candidate is generated by the microscopic dynamics and the detailed-balance gate decides whether it persists.

This is the most physically meaningful escape. It replaces abstract “model creativity” with a detectable instability of an enlarged carrier.

## 7. The sharp boundary

The learning ladder now separates into four logically distinct operations:

\[
\begin{array}{rcl}
\text{parameter learning} &:& \text{fit parameters inside a fixed family},\\
\text{structural detection} &:& \text{show that the family fails held-out tests},\\
\text{candidate generation} &:& \text{propose an enlarged family or new mode},\\
\text{structural selection} &:& \text{retain it when predictive gain pays its cost}.
\end{array}
\]

Documents 1147 and 1148 supply the first, second and fourth operations for the toy response. This document proves that the third is not a function of finite response data plus positivity alone.

There is no contradiction. Learning can detect that its ontology is wrong without the residual uniquely specifying the replacement ontology.

## 8. Consequences for the consciousness spike

This boundary is tempting to label “creativity” or “conscious insight,” but that inference does not follow.

The no-go says only that the available data and constraints underdetermine the next model. A non-conscious system can still generate candidates through:

- random variation followed by selection;
- a pre-existing grammar of structural moves;
- a microscopic instability;
- sparse or minimum-description priors;
- active experimentation;
- hierarchical Bayesian search;
- evolutionary retention across systems.

Consciousness becomes scientifically relevant here only if an independently variable consciousness state changes candidate generation in a way that cannot be compiled into any of those enlarged physical mechanisms and produces a discriminating prediction. No such law is presently available.

The consciousness spike therefore remains at its provisional stopping point. The new result advances the inverse problem, not the case for a new conscious force.

## 9. Stop-everything conditions

Any of the following would materially change the branch:

1. **Uniqueness from a physically derived singular Pick condition.** If the actual response data force the Pick matrix onto a determinate boundary, the family of interpolants may collapse.
2. **Rank stabilization.** If a Loewner or Hankel rank stabilizes under additional exact samples and a finite-order hypothesis is independently justified, the minimal realization can become identifiable.
3. **A Standard-Model sum rule.** A derived asymptotic moment that excludes all but one positive spectral completion would turn candidate generation into deduction.
4. **A microscopic instability.** If the underlying stress/Jordan construction predicts where a new pole must appear, the inverse ambiguity becomes secondary.
5. **Persistent empirical nonuniqueness.** If all available observations leave multiple positive completions, the correct output is an equivalence class or posterior over models—not a single discovered ontology.

## 10. Decision

Promote the following boundary theorem:

\[
\boxed{
\begin{gathered}
\text{Finite positive causal response data can detect model failure,}\\
\text{but do not generally determine the replacement spectrum.}\\
\text{Unique candidate generation requires an additional prior,}\\
\text{an intervention, an asymptotic law or a microscopic mechanism.}
\end{gathered}}
\]

Do not search for a metaphysical ingredient merely because the inverse problem is underdetermined. The next high-value branch is to ask whether the actual Standard-Model stress response supplies spectral sum rules, protected ranks or microscopic instabilities that turn one of these priors into derived physics.

## Executable certificate

Run:

    node verification/verify/verify_two_positive_spectral_models_match_two_samples_but_diverge_elsewhere.mjs

The certificate verifies:

- calibration errors below floating-point tolerance;
- held-out scalar difference \(1/24\);
- positive imaginary parts in the upper half-plane;
- strict matrix-Herglotz positivity after the three-ray lift;
- distinct positive spectral measures and non-unique candidate generation.
