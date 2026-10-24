# Frontier Wave 7.96: Orbit Norms Explain the Radical Weights

**Date:** 25 October 2026
**Status:** exact Hilbert-space realization with normalization firewall
**Certificate:** [orbit-norm weight verifier](../../../../verification/verify/verify_chain_theory_orbit_norm_weights.mjs)

## Result

The target weights

\[
1,\qquad\sqrt2,\qquad\sqrt3,\qquad\sqrt6
\]

are the norms of uniform orbit sums for the four sectors of a
(C_2\times C_3) exchange action.  If a record survives neither exchange,
only the twofold exchange, only the threefold exchange, or both, its orbit has
size

\[
1,\qquad2,\qquad3,\qquad6.
\]

For orthonormal orbit histories |(g\rangle), the unnormalized invariant
record

\[
s_O=\sum_{g\in O}|g\rangle
\]

has norm

\[
\|s_O\|=\sqrt{|O|}.
\]

The complete target numerator is therefore the orbit-norm census

\[
\boxed{
79\sqrt1+48\sqrt2+42\sqrt3+3\sqrt6.
}
\]

This is an exact representation-theoretic explanation of the radicals.  It
does not yet prove that a photon two-point residue is the sum of those norms.

## 1. Four stabilizer types

Let (G=C_2\times C_3\cong C_6).  Orbit--stabilizer permits precisely the
four relevant orbit sizes:

| stabilizer | orbit size | norm of uniform orbit record |
|---|---:|---:|
| (G) | 1 | 1 |
| (C_3) | 2 | \(\sqrt2\) |
| (C_2) | 3 | \(\sqrt3\) |
| trivial | 6 | \(\sqrt6\) |

Thus the radical basis is not a fitted choice once records are classified by
which exchange subgroup fixes them and counting measure makes the distinct
histories orthonormal.

The sector census found earlier assigns multiplicities

\[
(79,48,42,3)
\]

to these four stabilizer types.  The target numerator follows immediately.

## 2. Relation to the binary record character

The (C_3) factor can enlarge an orbit norm by √3 even though the binary
detector character is trivial on cubic central phases.  These statements
refer to different structures:

- orbit norm records how many orthogonal histories are coherently grouped;
- the binary character records which central commutator phase flips one bit.

This resolves the apparent tension between retaining √3 and discarding the
qutrit's additional phase-labelled Lie records.

## 3. The normalization firewall

There are two natural maps between an orbit space (\mathbb C^n) and its
invariant line:

\[
F_{\rm sum}(x)=\sum_{j=1}^n x_j,
\qquad
F_{\rm iso}(x)=\frac1{\sqrt n}\sum_{j=1}^n x_j.
\]

The raw sum has operator norm √n; the normalized fold has operator norm one.
Likewise, the uniform invariant vector may be written as either an
unnormalized sum of norm √n or a normalized state of norm one.

Therefore the radicals are forced only after choosing the counting-measure
normalization of the record sum.  A trace-preserving quantum channel or a
normalized state does not create amplitude gain merely because an orbit has
more representatives.  The gain must come from a source sum, detector
aggregation, density of states or another declared measure factor.

This is the same issue exposed independently by the unread-channel gain in
Wave 7.91: shape and support are robust; absolute scale requires a physical
normalization law.

## 4. Minimal calibration test

Build four control sectors with orbit sizes (1,2,3,6), inject equal
unit-amplitude orthogonal histories, and measure both:

1. the norm of the unnormalized aggregate signal;
2. the response after trace-preserving or isometric normalization.

The target requires the first convention to enter the numerator while the
complete (24\cdot36^2) decoration count enters the denominator.  A valid
physical derivation must explain why those two measures are the paired
numerator and denominator of one response functional.

If the detector normalizes each orbit before comparing sectors, all four
radical weights collapse to one.  If it sums incoherent probabilities, the
weights become (1,2,3,6).  The three possibilities are experimentally
distinct:

| detector rule | orbit-size dependence |
|---|---:|
| normalized invariant state | 1 |
| coherent raw amplitude sum | \(\sqrt n\) in Hilbert norm |
| incoherent intensity sum | (n) |

## 5. Status of the finite reconstruction

The finite numerator now has a coherent conditional derivation:

\[
\text{two-copy degree-two sectors}
+\text{ CRT Weyl phase sewing}
+\text{ binary character}
+\text{ orbit counting measure}.
\]

These yield

\[
(79,48,42,3),
\qquad
(1,\sqrt2,\sqrt3,\sqrt6).
\]

The denominator has an independently supported carrier count

\[
24\cdot36^2=31104.
\]

What remains is not another integer coincidence.  It is a single physical
question: why does one calibrated causal response pair this raw orbit norm in
the numerator with this support measure in the denominator?

## Verdict

The radical weights are natural orbit norms of the same (C_2\times C_3)
exchange structure that supplies the binary record character.  This closes
their finite representation-theoretic origin.  Their use as absolute
amplitude coefficients remains conditional on a detector/source
normalization; it cannot be inferred from orbit size alone.

## Corpus anchors

- [CRT Weyl sewing](frontier_wave7_95_chain_theory_crt_weyl_sewing.md)
- [gain and covariance gate](frontier_wave7_91_chain_theory_gain_and_covariance_gate.md)
- [two-by-three inverse reconstruction](frontier_wave7_82_chain_theory_two_by_three_inverse_reconstruction.md)
- [cross-prime phase module](../../../claims/0500-0599/506_the_cross_prime_phase_module_is_the_discriminant_form_of_a_rank_four_lorentzian_even_lattice.md)
