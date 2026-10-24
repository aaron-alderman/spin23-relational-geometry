# Frontier Wave 7.82: Chain-Theory Two-by-Three Inverse Reconstruction

**Date:** 25 October 2026
**Status:** exact arithmetic reconstruction; corpus-native carrier overlap established; record kernel and photon identification remain unproved
**Certificate:** [inverse-target verifier](../../../../verification/verify/verify_chain_theory_two_by_three_inverse_target.mjs)

## Result

The proposed fine-structure candidate

\[
\alpha_*
=
\frac{79+48\sqrt2+42\sqrt3+3\sqrt6}{31104}
\]

is not an opaque decimal fit. Once a qutrit--qubit endpoint pair and the
paper's record rules are fixed, its complete arithmetic fingerprint follows
from four small operator-space decompositions. The corpus independently
contains the carrier anatomy behind those decompositions, but it does not yet
derive the full record rules or the identification of their normalized
readout with the photon coupling.

This makes the expression a legitimate inverse target, not a corpus result.

## 1. Carrier anatomy already present in the corpus

The corpus contains three related but deliberately distinct two-by-three
objects:

\[
\mathbb C^2\otimes\mathbb C^3\cong\mathbb C^6,
\qquad
\operatorname{Hom}(\mathbb C^2,\mathbb C^3),
\qquad
\mathbb C^2\oplus\mathbb C^3.
\]

They respectively serve as:

1. a six-dimensional tensor carrier for face--flavour residues and typed
   partial sewing;
2. the six-complex-dimensional rectangular mediator between the two- and
   three-sectors; and
3. the five-dimensional block flag whose determinant-one stabilizer is
   \(S(U(3)\times U(2))\).

The last group is exactly

\[
S(U(3)\times U(2))
\cong
\frac{SU(3)\times SU(2)\times U(1)}{\mathbb Z_6}.
\]

The distinction among tensor product, Hom-space and direct sum is a type
firewall. Their shared dimensions do not identify them without an explicit
intertwiner.

## 2. What the endpoint dimensions force

For endpoint dimensions \((3,2)\), the traceless observable spaces have
dimensions

\[
a=3^2-1=8,
\qquad
b=2^2-1=3.
\]

A complete operator space on one six-dimensional link has dimension

\[
(3\cdot2)^2=36.
\]

The connected traceless product on an unread link has dimension

\[
ab=8\cdot3=24.
\]

Consequently, if the configuration consists of two read links and one unread
state link, its declared readout algebra has dimension

\[
\boxed{N=24\cdot36\cdot36=31104=2^7 3^5.}
\]

No fine-structure value enters this count. The conditional phrase is the
important part: the corpus has not yet proved that this is the uniquely
physical two-point configuration.

## 3. The 169 product records

Write the four read slots as \((Q_1,q_1,Q_2,q_2)\), with letter-space
dimensions \((8,3,8,3)\). Products at two distinct slots contribute

\[
8^2+3^2+4(8\cdot3)
=64+9+96
=169.
\]

The same-end products split under exchange of the two reads into symmetric
and antisymmetric squares:

\[
\begin{aligned}
n_{\rm sym}
&=\frac{8\cdot9}{2}+\frac{3\cdot4}{2}=42,\\
n_{\rm asym}
&=\frac{8\cdot7}{2}+\frac{3\cdot2}{2}=31.
\end{aligned}
\]

The 96 mixed products split evenly under the far-link exchange:

\[
96=48+48.
\]

Therefore the ordinary-product sectors are

\[
31+48=79,
\qquad
48,
\qquad
42.
\]

The three unordered pairs of Pauli letters supply three additional
commutator records,

\[
\binom32=3,
\]

and hence

\[
\boxed{169+3=172},
\qquad
\boxed{172=79+48+42+3}.
\]

The apparent numerology is thus the compressed signature of symmetric-square,
antisymmetric-square, mixed-slot and Pauli-commutator dimensions.

## 4. Why the radicals appear

Under the target record kernel, surviving the far-qubit exchange contributes
an amplitude factor \(\sqrt2\), surviving the shared-qutrit read exchange
contributes \(\sqrt3\), and surviving both contributes \(\sqrt6\). The four
sectors therefore give

\[
79+48\sqrt2+42\sqrt3+3\sqrt6.
\]

Dividing by the readout dimension yields the candidate exactly.

These are amplitude weights. Replacing them by Born weights produces

\[
79+2(48)+3(42)+6(3)=319
\]

and an inverse near \(97.505\), not \(137\). Removing the commutator records,
discarding the weights or swapping the endpoint weights likewise moves the
answer substantially. The full tuple

\[
(N;n_1,n_{\sqrt2},n_{\sqrt3},n_{\sqrt6})
=(31104;79,48,42,3)
\]

is therefore a much stronger target than the decimal \(137.036\) alone.

## 5. Provenance firewall

### Corpus-native

- a two-sector and a three-sector;
- six-dimensional tensor and rectangular carriers;
- a 36-dimensional complete operator space;
- the \(3+2\) determinant-one flag;
- the faithful Standard-Model \(\mathbb Z_6\) quotient;
- positive-map, complete-positivity and Choi admissibility gates;
- exchange, parity and orientation-sensitive detector structures.

### Canonical after choosing the carrier

- the traceless dimensions \(8\) and \(3\);
- the dimensions \(24\) and \(36\);
- the symmetric/antisymmetric counts \(42\) and \(31\);
- the mixed-slot split \(48+48\).

### Still imported from the target

- exactly two read links plus one unread link;
- the rule that the link is read at the qutrit end;
- the precise meanings of read exchange, link exchange and survival;
- promotion of the three Pauli commutators to separate measurement records;
- amplitude rather than probability weighting;
- normalization by the complete decoration algebra;
- interpretation of the result as an on-shell photon two-point function.

Lean verification of the target paper establishes the finite theorem after
these definitions. It does not establish the last physical identification.

## 6. Corpus-native backward programme

The inverse route should now proceed in this order:

1. **Configuration gate.** Derive or reject the two-read/one-unread object from
   the corpus's three-relation and detector semantics.
2. **End-rule gate.** Test whether the existing asymmetric
   \(\mathbb C^2\leftrightarrow\mathbb C^3\) channel selects the qutrit end
   without assuming the desired weight exchange.
3. **Record gate.** Construct the observable algebra using corpus-positive
   maps and determine whether commutators are admissible records.
4. **Exchange gate.** Intertwine the corpus order-two/order-three selector
   operations with the proposed read and link exchanges.
5. **Normalization gate.** Derive the trace unit from a physical response or
   conserved charge, not from the desired coupling.
6. **Dynamics gate.** Produce a momentum-dependent two-point function with a
   massless pole and Ward identity whose zero-transfer residue is the finite
   readout.

Only the final gate can promote the arithmetic invariant to a candidate for
\(\alpha(0)\).

## Verdict

The corpus did not previously contain the fine-structure formula. It did
contain, before this comparison, nearly all of its finite carrier anatomy.
The inverse calculation compresses the remaining problem to a small,
falsifiable record kernel and one substantial field-theory bridge:

\[
\boxed{
\text{derive the record kernel independently, then derive its photon map.}
}
\]

Failure at any gate remains informative. A different record count or weight
law would distinguish the corpus structure from Chain Theory rather than be
adjusted to recover the target.

## Corpus anchors

- [face--flavour entangled six-carrier](../../../claims/0100-0199/126_face_flavor_entangled_spectral_cp_checkpoint.md)
- [minimal complex six-carrier and 36-dimensional envelope](../../../claims/0200-0299/295_independent_face_and_complex_flavor_close_naturally_on_h6c_not_h12r.md)
- [faithful Standard-Model \(\mathbb Z_6\) quotient](../../../claims/0400-0499/418_the_faithful_global_group_of_the_puncture_neutral_ternary_stabilizer_has_the_standard_z6_quotient.md)
- [positive-map/Choi selector boundary](../../../claims/0600-0699/686_the_real_slice_selector_is_positive_but_not_a_completely_positive_quantum_channel.md)
- [typed partial sewing on \(\mathbb C^2\otimes\mathbb C^3\)](../../../claims/1000-1099/1021_a_six_dimensional_typed_partial_sewing_realizes_the_causal_gram_centre_with_one_reference_ray_and_an_a2_residual_doublet.md)
- [two-state/three-symbol operator-space precedent](../../../claims/1700-1799/1738_the_2_state_3_symbol_universal_machine_selects_a_finite_genus_two_theta_seam_but_not_spin23_dynamics.md)
- [two-by-three parabolic mediator](frontier_wave7_50_a1_a2_parabolic_kenotic_envelope.md)
- [two-by-three calibration protocol](frontier_wave7_80_two_by_three_selector_calibration_protocol.md)
