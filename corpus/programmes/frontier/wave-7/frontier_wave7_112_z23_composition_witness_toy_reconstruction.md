# Frontier Wave 7.112: A Z23 Composition Witness Solves What Spectra Cannot

**Date:** 25 October 2026

**Status:** executable toy reconstruction; exact cocycle and gauge-invariant loop verified; methodology established, Monster identification not claimed

**Evidence:** [composition-witness record](../../../../evidence/data/z23-composition-witness-toy-v1.json)

**Certificate and reconstruction:** [composition-witness verifier](../../../../verification/verify/verify_z23_composition_witness_toy.mjs)

## Result

Wave 7.111 proves that the heterotic BPS spectrum and every multiplicity
depending only on \(nm\bmod23\) are blind to the fifth-power orientation.
This toy model demonstrates, executably, how composition can recover data
that spectra cannot.

Take 23 theories with the same object labels \(a\in\mathbb Z_{23}\), the same
fusion rule

\[
a\otimes b=a+b,
\]

and identical declared multiplicities.  Distinguish them only by the
normalized associator

\[
\omega_p(a,b,c)=
\exp\!\left(
\frac{2\pi i p}{23}
a\left\lfloor\frac{b+c}{23}\right\rfloor
\right),
\qquad p\in\mathbb Z_{23}.
\]

The verifier checks the 3-cocycle/pentagon identity on every one of the
\(23^4=279{,}841\) quadruples for all 23 values of \(p\).  It then computes
the closed composition witness

\[
I_p=\prod_{j=0}^{22}\omega_p(1,j,1)
=e^{2\pi i p/23}.
\]

This product is invariant under arbitrary normalized associator gauge changes
\(\omega\mapsto\omega\,\delta\beta\): all \(\beta\)-factors telescope around
the closed loop.  Therefore \(I_p\) is a legitimate observable target, while
an individual associator coefficient is basis/gauge dependent.

The implemented blind reconstruction hides \(p=7\), applies deterministic
phase perturbations to the 23 constituent operations, forms the closed loop,
and recovers \(p=7\) uniquely by nearest-root inference.  The same code confirms
that the complete multiplicity ledger is identical for every candidate.

## 1. Why this is the right toy problem

The earlier type-language proposal separates three layers:

```text
objects and fusion       admissible types
associator               composition law
closed loop              gauge-invariant observation
```

Ordinary spectroscopy sees the first layer and perhaps its multiplicities.
It cannot determine which \(p\) was used.  A closed sequence of controlled
compositions sees the third-cohomology class without assigning physical
meaning to a gauge-dependent coefficient.

This is exactly the logical shape of the Monster problem:

- \(23A\) and \(23B\) share a scalar trace;
- their heterotic BPS multiplicities are related by a product-preserving
  relabelling;
- the surviving information must live in cross-grade composition, a defect
  junction or higher sewing;
- the final target must be a closed, rephasing-invariant amplitude.

The toy does **not** assert that the Monster order-23 defect carries this
particular \(H^3(\mathbb Z_{23},U(1))\) class.  It validates the inference and
detector architecture that the sourced Monster intertwiner must enter.

## 2. Orientation response

If the marked generator is changed from \(1\) to \(u\in\mathbb Z_{23}^{\times}\),
the corresponding closed loop is

\[
I_p(u)=\prod_{j=0}^{22}\omega_p(u,uj,u)
=e^{2\pi i p u^2/23}.
\]

For the corpus's fifth-power operation,

\[
I_p(5)=e^{2\pi i(2p)/23},
\qquad 5^2\equiv2\pmod {23}.
\]

Thus a nontrivial composition class responds to the marked-generator change
even though the product label \(nm\) and all assigned spectral multiplicities
remain fixed.  This is the first complete worked example of an
orientation-sensitive composition observable in the lane.

## 3. Blind reconstruction algorithm

For measured phase \(\widehat I\), score each candidate by circular distance:

\[
\widehat p=arg\min_{p\in\mathbb Z_{23}}
\left|\operatorname{Arg}\left(
\widehat I e^{-2\pi ip/23}
\right)\right|.
\]

The reconstruction reports both the winning class and the angular margin to
the runner-up.  A real protocol must preregister a minimum margin based on the
apparatus phase uncertainty.  If the uncertainty reaches half the adjacent
root spacing, \(\pi/23\), one-shot class identification is no longer safe.

## 4. Translation to a physical experiment

The 23 factors in \(I_p\) can be implemented as a sequence of controlled
reassociations with a phase reference.  The required controls are:

1. prepare the generator sector and its powers;
2. implement both association orders;
3. interfere the resulting paths;
4. close all state labels so external rephasings cancel;
5. repeat with the fifth-power generator convention;
6. compare the measured response with \(p\mapsto2p\).

The controls should include a theory with \(p=0\), a device with randomized
open associator phases, and a device with the same closed \(p\) but a different
gauge.  A valid detector returns the same \(I_p\) for gauge-related devices and
different values for different cohomology classes.

## 5. Monster promotion gate

To replace this toy by a Monster result, supply one of:

- explicit order-23 cross-grade VOA intertwiner coefficients;
- a defect-junction \(F\)-symbol presentation;
- order-23-twined genus-two sewing amplitudes;
- an equivalent BPS OPE algebra with normalized three-point data.

Then construct the smallest closed product invariant under intertwiner basis
changes and test its fifth-power transport.  The reconstruction and
experiment-selection machinery in the verifier can be reused after replacing
the toy cocycle with sourced coefficients.

## 6. Claim boundary

This tranche proves an engineering proposition:

> A finite typed solver can distinguish theories having exactly the same
> sectors, fusion rules and multiplicity spectra when supplied with a closed
> composition observable, and it can recover the hidden class under bounded
> phase noise.

It does not prove that the Monster supplies the chosen cocycle, that a material
implements the controller or that nature selects \(p\ne0\).

## Links

- [Heterotic BPS orientation gate](frontier_wave7_111_heterotic_bps_orientation_no_go_and_interaction_gate.md)
- [Monster physical-realization ladder](frontier_wave7_110_monster_physics_realization_ladder.md)
- [Moonshine programme](../../moonshine-program-lattice/README.md)

