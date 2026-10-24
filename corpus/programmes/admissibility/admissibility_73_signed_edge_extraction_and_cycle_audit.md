# Two edges identify the signs; a third edge audits the bridge

**Date:** 25 October 2026

**Status:** signed extraction protocol and graph audit closed; both physical edge kernels and the scale bridge remain open

**Topics:** OT-047, OT-048

**Parent:** [AZ-072 candidate processes](admissibility_72_candidate_phase_edges_and_scale_bridge.md)

**Evidence:** [signed-edge extraction ledger](../../../evidence/data/five-coordinate-phase-edge-extraction-gate-v1.json)

**Generator:** [signed factorial calculation](../../../scripts/run-five-coordinate-phase-edge-extraction-gate.mjs)

**Verifier:** [extraction certificate](../../../verification/admissibility/verify_five_coordinate_phase_edge_extraction_gate.mjs)

## Result

AZ-072 found two plausible processes but left “compute the cross terms” underspecified. The calculation now has a finite contract. For any two coefficients, fit each differential bin to

\[
y(c_i,c_j)=B+L_i c_i+L_j c_j+F_{ii}c_i^2+2F_{ij}c_ic_j+F_{jj}c_j^2.
\]

The sign-safe design evaluates the full (3\times3) grid (c_i,c_j\in\{-1,0,+1\}). Its four mixed-sign corners isolate the interference even if a baseline or terms linear in one coefficient exist:

\[
F_{ij}=\frac{y_{++}-y_{+-}-y_{-+}+y_{--}}{8}.
\]

The five axis and origin samples independently recover the baseline, two linear terms and two diagonal terms. Because nine records determine six coefficients, three residual contrasts test whether the assumed quadratic EFT description is actually adequate. Under equal independent corner noise (s), the interference estimator has (\sigma(F_{ij})=s/4). Real simulations must propagate the full signed covariance, especially when common random numbers are used.

## What the two papers already supply

The heavy-meson calculation writes

\[
\Gamma=\frac{c_Q^2\widetilde\Gamma_Q+c_q^2\widetilde\Gamma_q+c_Qc_q\widetilde\Gamma_{Qq}}{f_a^2}.
\]

In the canonical quadratic convention its off-diagonal kernel is (F_{Qq}=\widetilde\Gamma_{Qq}/2). This is more than a topology: the paper explicitly defines a signed interference coefficient and reports a sizeable negative quark contribution in its illustrated (B) channel. It does not publish the required binned (B_c) coefficients or their form-factor covariance, so the corpus cannot infer the (v_u-v_d) edge numerically from the figure.

The published (tW+a) analysis supplies separate top-like and weak-gauge samples. Those determine diagonal sensitivity only. If absence of a signal baseline and linear terms is established, two additional mixed samples, ((+,+)) and ((+,-)), are enough to obtain

\[
F_{ij}=\frac{y_{++}-y_{+-}}4.
\]

Otherwise the nine-point signed design is required. A held-out coupling point must be predicted by the fitted polynomial; a nonzero generator-level cross term that becomes collinear with detector nuisances does not count as an admitted edge.

## Positivity is a useful failure test

For a rate constructed from two coherent amplitudes, the quadratic kernel is positive semidefinite:

\[
F_{ii}\ge0,\qquad F_{jj}\ge0,\qquad |F_{ij}|\le\sqrt{F_{ii}F_{jj}}.
\]

The normalized interference (\rho_{ij}=F_{ij}/\sqrt{F_{ii}F_{jj}}) lies in ([-1,1]). A violation identifies inconsistent normalization, background subtraction, Monte Carlo error or a failure of the assumed two-amplitude quadratic model. Passing the bound does not prove the corpus relation; it only admits the edge as a coherent response.

## Identification and validation are different graph jobs

Two nonzero edges forming a spanning tree determine the two relative coefficient-sign bits after the process-template signs and one global node convention are fixed. That is enough to test (a_2=v_u+v_d) up to the unavoidable simultaneous reversal.

It is not enough to check the scale bridge from inside the data. Independent sign redefinitions at a node change the signs of both incident edges. With all three edges present, however, the cycle product

\[
\chi=\operatorname{sgn}(F_{ud}F_{ua}F_{da})
\]

is unchanged by every redefinition of (v_u), (v_d) or (a_2). The verifier checks all eight node-sign choices. The third edge is therefore not required for minimal identification; it is the first internal, convention-independent validation channel for the transported phase graph. Its expected value remains process-dependent and must be calculated rather than guessed.

## The scale bridge has a typed object

If coefficients are transported by (c_{\rm low}=M c_{\rm high}), a quadratic response must obey

\[
F_{\rm high}=M^{T}F_{\rm low}M,
\]

with covariance carried by the corresponding Jacobian. A usable ledger must state the signed operator definitions, scheme and scale, RG matrix, electroweak threshold matrix, hadronic convention, Jacobian and shared nuisance blocks. Comparing coefficient names or multiplying two independently profiled likelihoods does not perform this transport.

## Open and closed

Closed:

- the minimal signed sampling design, including possible baseline and linear terms;
- exact extraction formulas for every quadratic coefficient;
- three independent closure residuals for the nine-point design;
- the positive-semidefinite interference bound;
- the distinction between a two-edge identification tree and a three-edge validation cycle;
- the tensor rule that the scale bridge must satisfy.

Open:

- binned (B_c) values of (F_{cc}), (F_{bb}) and (F_{cb}) with form-factor covariance;
- the top/weak (tW+a) cross term after cuts and nuisance profiling;
- a candidate physical process for the third ((v_d,a_2)) validation edge;
- the explicit signed matching matrix (M) across the electroweak and hadronic thresholds;
- precision adequate for the AZ-071 detector budgets.

## Implication

The programme no longer needs an open-ended “multi-coefficient analysis.” It needs a signed factorial response table. The first useful outcome may be engineering rather than discovery: a null mixed contrast can justify treating two source directions independently over a declared range. A surviving, PSD-consistent cross term makes relative sign observable. Two such edges test the incidence relation. A third closes the first convention-resistant loop and can reveal that the apparent cross-scale agreement was only a naming convention.

## Reproduction

~~~powershell
node scripts/run-five-coordinate-phase-edge-extraction-gate.mjs --write
node verification/admissibility/verify_five_coordinate_phase_edge_extraction_gate.mjs
~~~
