# Lane Expansion 05: One Response Has No Calibration Invariant, but Two Responses Have a Generalized Spectrum

**Date:** 17 October 2026  
**Lane:** L1, measurement-first inverse reconstruction  
**Claim status:** exact two-channel calibration theorem and minimal tomography design  
**Certificate:** [verify_programme_two_response_calibration_invariants.mjs](scripts/verify_programme_two_response_calibration_invariants.mjs)

## Result in ordinary language

One photograph of a triangle beside an unmarked ruler cannot tell you its absolute size or shear: the ruler itself may be stretched or skewed. Two photographs taken with the same ruler can be compared. Their relative deformation is meaningful even if the ruler remains uncalibrated.

The same is true here. A single positive two-channel response

\[
R\in\operatorname{Sym}_2(\mathbb R)_+
\]

has no nontrivial invariant under an unknown invertible source calibration

\[
R\mapsto MRM^T,
\qquad M\in GL(2,\mathbb R).
\]

For two responses \(R_0,R_1\) measured with the same source hardware, the generalized eigenvalues of

\[
R_1v=\mu R_0v
\]

are calibration invariant. Thus the minimum calibration-free experiment needs at least two kinematic points, thermodynamic states or boundary conditions.

## 1. Why a single response contains no invariant shape

Every positive-definite matrix has a Cholesky factorization

\[
R=LL^T.
\]

Choosing \(M=L^{-1}\) maps it to the identity:

\[
MRM^T=I.
\]

Therefore \(GL(2,\mathbb R)\) acts transitively on the interior of the positive cone. Any scalar invariant of one matrix is constant throughout that cone.

This includes the scale-and-shear subgroup already left open by the source-frame analysis. Quantities such as the off-diagonal correlation coefficient are invariant under independent rescalings but not under shear.

## 2. Two-response invariants

Let

\[
R_a'=MR_aM^T,
\qquad a=0,1.
\]

Then

\[
(R_0')^{-1}R_1'
=M^{-T}(R_0^{-1}R_1)M^T.
\]

The relative response is transformed by similarity. Its eigenvalues are invariant. Equivalently, in two dimensions the two basic invariants are

\[
\boxed{
I_1=\operatorname{tr}(R_0^{-1}R_1),
\qquad
I_2=\det(R_0^{-1}R_1)=\frac{\det R_1}{\det R_0}.}
\]

They determine the unordered generalized spectrum \(\{\mu_+,\mu_-\}\).

These observables are dimensionless when \(R_0\) and \(R_1\) have the same physical units. They survive arbitrary common source calibration, not merely diagonal rescaling.

## 3. Minimal operational experiment

Use one fixed pair of source protocols and measure the complete symmetric response at two settings:

\[
R_0=R(Q_0^2),
\qquad
R_1=R(Q_1^2),
\]

or at two temperatures, boundary separations or background fields. Report \(I_1,I_2\), not the basis-dependent matrix entries.

This creates a clean interface between experiment and theory:

- the Standard Model can calculate the generalized spectrum;
- a passive analogue can reproduce it or fail;
- a topology-first model must constrain it beyond arbitrary positive matrix functions;
- different source protocols can be compared without pretending their raw matrices share a canonical frame.

## 4. Three responses reveal noncommutativity but not orientation sign

With a third matrix \(R_2\), whiten by \(R_0\):

\[
A=R_0^{-1/2}R_1R_0^{-1/2},
\qquad
B=R_0^{-1/2}R_2R_0^{-1/2}.
\]

The residual calibration freedom is orthogonal. The magnitude

\[
\boxed{\mathcal N=-\tfrac12\operatorname{tr}[A,B]^2\ge0}
\]

is invariant and vanishes exactly when the two relative responses are simultaneously diagonalizable.

For real symmetric \(2\times2\) matrices the commutator is proportional to the oriented area form. Its magnitude is observable, but its sign reverses under a reflection in the residual \(O(2)\) calibration. Consequently response tomography alone detects relative-axis rotation but cannot choose the global orientation bit.

This recovers the orientation torsor in operational language:

\[
\text{unoriented response data}
\quad\not\Rightarrow\quad
\text{orientation sign}.
\]

A physical handedness—ordered ports, magnetic field, wall normal, pump direction or CP-labelled process—must be supplied or dynamically generated.

## 5. Landscape and closure ledgers

### Landscape value

- identifies the quotient space of experimentally meaningful response data;
- supplies minimal two- and three-setting tomography protocols;
- distinguishes relative spectral shape from calibration artifacts;
- connects measurement-first, amplitude, defect and analogue lanes through the same invariants.

### Closure value

The theorem does not predict \(I_1,I_2\) or \(\mathcal N\). It shows exactly what a theory must predict and why a single fitted carrier matrix cannot be evidence for the programme.

## 6. Concrete go/no-go test

**Go:** the programme fixes the generalized spectrum or the three-response noncommutativity magnitude from its source/topology structure, and an operationally defined handedness fixes the remaining sign.

**No-go:** arbitrary positive spectral measures can vary all generalized invariants independently while satisfying every admitted algebraic condition.

## Reproducibility

```powershell
node scripts\verify_programme_two_response_calibration_invariants.mjs
```

