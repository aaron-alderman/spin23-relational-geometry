# Frontier Wave 7.102: A Monitorable Record-POVM Benchmark

**Date:** 25 October 2026
**Status:** exact positive finite measurement model; no photon identification
**Certificate:** [record-POVM verifier](../../../../verification/verify/verify_chain_theory_record_povm_benchmark.mjs)

**Gate-level realization:** the [cubed-commutator detector](frontier_wave7_103_cubed_commutator_binary_detector.md) implements the binary port, while the [random-Weyl unread channel](frontier_wave7_105_random_weyl_implementation_of_unread_channel.md) implements the connected correlation carrier using the same local gate alphabet.

## Result

The complete finite Chain fingerprint can be made into a valid measurement
probability without identifying it with the electromagnetic coupling.

Complexify the (31104)-dimensional real record space to a record Hilbert
space (\mathcal H_{\rm rec}).  Define a diagonal positive operator (K) with
eigenvalue multiplicities

\[
\begin{array}{c|ccccc}
\text{eigenvalue}&0&1&\sqrt2&\sqrt3&\sqrt6\\
\hline
\text{multiplicity}&30932&79&48&42&3.
\end{array}
\]

Since the largest eigenvalue is √6,

\[
E=\frac K{\sqrt6}
\]

satisfies (0\le E\le I).  Therefore

\[
\{E,I-E\}
\]

is a valid two-outcome POVM.  On the uniform record state

\[
\rho_*=\frac{I_{31104}}{31104},
\]

its click probability is

\[
p_*=\operatorname{Tr}(\rho_*E)
=\frac{79+48\sqrt2+42\sqrt3+3\sqrt6}
       {31104\sqrt6}
=0.002979131709027206.
\]

The finite invariant is recovered as

\[
\boxed{r_{\rm fin}=\sqrt6\,p_*.}
\]

This gives the arithmetic construction a real, positive and monitorable
meaning: it is the normalized mean of a finite record observable.

## 1. What this achieves

The benchmark simultaneously tests:

- the (31104)-dimensional record support;
- the (79,48,42,3) sector multiplicities;
- the orbit-norm weights (1,\sqrt2,\sqrt3,\sqrt6);
- the binary detector's three additional Pauli records;
- positivity of the resulting readout.

No negative quasiprobability or super-unit effect is required.  The division
by √6 converts the weighted record operator into an ordinary effect.

## 2. Competing record hypotheses

The closest simple alternatives predict different probabilities:

| hypothesis | final multiplicity | predicted click probability |
|---|---:|---:|
| no additional commutator records | 0 | 0.0028826810917432556 |
| binary-character rule | 3 | 0.002979131709027206 |
| include all eight qutrit bracket directions as well | 11 | 0.0032363333551177413 |

The target--no-commutator separation is especially transparent:

\[
\Delta p=\frac3{31104}=\frac1{10368}.
\]

Under ideal independent Bernoulli sampling, a simple five-standard-deviation
separation from that nearest alternative requires approximately eight million
uniform trials.  This is large but finite.  Stratified sampling of the active
sectors can reduce experimental cost, provided the denominator and sampling
weights are independently audited rather than inferred from the desired
answer.

## 3. Physical implementation boundary

The (31104) dimensions are dimensions of a Liouville/record carrier, not
automatically (31104) microscopic energy levels.  A practical
implementation can use ancilla-assisted process tomography or randomized
operator sampling:

1. sample decorations from the two 36-dimensional read algebras and the
   24-dimensional connected unread carrier;
2. implement the ordered Weyl pair associated with that label;
3. use the binary-character ancilla to classify its order record;
4. assign the pre-registered orbit weight;
5. average using the declared uniform measure.

The experiment must separately verify that its sampling measure is uniform
on the claimed carrier.  Otherwise source preparation can manufacture the
target average.

## 4. Interaction with the unread channel

The POVM lives at the record layer.  The physical qutrit--qubit state reaches
that layer through the unread correlation channel, whose maximal covariant
gain is (1/8).  There are two distinct calibrations:

- **support calibration:** verify that all 24 connected directions remain
  distinguishable;
- **amplitude calibration:** measure the common attenuation η rather than
  silently absorbing it into state preparation or detector efficiency.

The finite POVM probability is meaningful after those calibrations.  It does
not cause η to disappear from an unrelated absolute response.

## 5. Why this still is not \(\alpha\)

The same number can be a valid expectation value in one finite apparatus and
fail to be the residue of a four-dimensional massless gauge field.  The POVM
construction supplies:

\[
\text{positive state} + \text{positive effect} + \text{dimensionless output}.
\]

The photon claim additionally requires:

\[
\text{local conserved current}
+\text{ transverse massless pole}
+\text{ canonical Maxwell normalization}
+\text{ infrared matching}.
\]

The benchmark is therefore the right immediate experimental target: validate
or falsify the finite mechanism first, without using the observed value of
α as its calibration.

## Verdict

The finite Chain result has crossed from arithmetic into operational quantum
measurement.  It defines an exact two-outcome POVM probability on the record
carrier and admits clear competing hypotheses.  What remains beyond this
benchmark is the genuinely field-theoretic map from this record expectation
to the photon pole residue.

## Corpus anchors

- [orbit-norm weights](frontier_wave7_96_chain_theory_orbit_norm_weights.md)
- [CRT Weyl sewing](frontier_wave7_95_chain_theory_crt_weyl_sewing.md)
- [unread-correlation channel](frontier_wave7_90_chain_theory_unread_correlation_channel.md)
- [photon-normalization no-go](frontier_wave7_100_chain_theory_photon_normalization_no_go.md)
