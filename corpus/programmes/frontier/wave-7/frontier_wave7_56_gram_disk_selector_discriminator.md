# Frontier Wave 7.56: Gram-Disk Selector Discriminator

**Date:** 24 October 2026  
**Status:** exact preregistration mathematics; suitable apparatus and physical port identification remain open  
**Protocol:** [selector discriminator v1](gram_disk_selector_discriminator_v1.json)  
**Certificate:** [discriminator verifier](../../../../verification/verify/verify_gram_disk_selector_discriminator.mjs)

## Result

The competing optimization principles in Wave 7.55 are experimentally
distinguishable without first deciding what the environment “really is.” At
each frequency measure

\[
(f_0,f_1,s)\in\mathbb C^3,
\]

where \(f_0,f_1\) are the two reference-compressed transfers and \(s\) is the
coherence retained after the environment is ignored.

Construct

\[
c=\overline{f_1}f_0,
\qquad
R^2=(1-|f_0|^2)(1-|f_1|^2),
\]

and the normalized disk coordinate

\[
\boxed{u=\frac{|s-c|^2}{R^2}.}
\]

The common-environment model requires \(0\le u\le1\).

## 1. Four hypotheses

| Hypothesis | Prediction | Interpretation |
|---|---|---|
| volume selector | \(u=0\) | Gram centre; residual ports orthogonal |
| dephasing/entropy selector | \(s\) is the disk point nearest zero | conditioned states maximally distinguishable |
| minimum-rank selector | \(u=1\) | Gram boundary; environment rank two |
| causal-volume selector | \(u=0\) across the band plus Schur analyticity | centre selection and causal globalization |

If \(|c|\le R\), the entropy prediction is simply \(s=0\). Otherwise it is
the radial projection

\[
s_{\min}=c\left(1-\frac{R}{|c|}\right).
\]

## 2. Measurement contract

The two complex transfers require phase-referenced amplitude measurements.
The coherence \(s\) requires a prepared superposition of the two channel
labels and readout of both output quadratures. Equivalently, the established
four-setting tomography packet

\[
L,\quad R,\quad L+R,\quad L+iR
\]

reconstructs the relevant complex Hermitian response. On an independently
verified real slice, the quadrature-shifted setting may be omitted.

Intensity-only measurements of the separate channels cannot distinguish the
selectors because they determine \(|f_0|\) and \(|f_1|\) but not the complex
overlap \(s\).

## 3. Exact checkpoint separation

For

\[
f_0=3/5,
\qquad
f_1=5/13,
\]

the centre and squared radius are

\[
c=3/13,
\qquad
R^2=2304/4225.
\]

The three pointwise hypotheses give

\[
u_{\rm volume}=0,
\qquad
u_{\rm entropy}=\frac{25}{256},
\qquad
u_{\rm min\ rank}=1.
\]

They are separated before any microscopic model fitting.

## 4. Causality is not a one-frequency observable

A centre hit at one frequency supports volume selection only. The causal
claim additionally requires a frequency sweep, analytic fit and pole/zero
audit. In the silver family the decisive global condition is

\[
a_n=b_t,
\]

equivalently \(\ell=\operatorname{arsinh}(1)\). A pointwise disk fit cannot
establish this.

## 5. Decision rules

Define the admissibility slack

\[
\Delta=R^2-|s-c|^2.
\]

- \(\Delta<0\), after propagation of calibration uncertainty, falsifies the
  proposed joint environment.
- \(u\simeq0\) supports the volume class but not its microscopic cause.
- \(u\simeq1\) supports a rank-minimal dilation but leaves a boundary phase.
- \(s\simeq s_{\min}\) supports the dephasing/entropy class.
- intermediate points reject all three pure objectives but remain admissible
  and motivate a combined functional.

The frequency band, nuisance model, covariance propagation and decision
thresholds must be fixed before unblinding.

## Implication

This converts the philosophical claim into an empirical hierarchy:

\[
\text{first test the admissibility region};
\quad
\text{then identify which selector, if any, nature follows}.
\]

The experiment can therefore return a useful result in every case: violation
of the disk rejects the architecture; a centre, nearest-origin or boundary hit
identifies an objective class; an interior non-special point proves that an
additional dynamical tradeoff is present.

## Boundary

The protocol is a mathematical measurement contract, not a claim that a
present experiment exposes these abstract ports. Physical port identification
and a platform-specific noise model remain mandatory.
