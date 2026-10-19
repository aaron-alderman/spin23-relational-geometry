# The Character Channel Factors to the Handle Class Sum after Complexification, but the Four-Carrier Compression Is Not Canonical

**Date:** 17 October 2026  
**Branches:** cyclotomic-to-selector channel, handle class-sum channel, simultaneous Kraus factorization, complex structure, four-carrier compression, and real-structure selection  
**Claim status:** exact complex channel factorization; canonical physical compression remains open  
**Certificate:** [factor_the_balanced_character_channel_to_the_handle_class_sum_after_complexification.mjs](../../../verification/factor/factor_the_balanced_character_channel_to_the_handle_class_sum_after_complexification.mjs)

## Executive result

The dimension mismatch between the six-dimensional character channel and four-dimensional handle channel does not obstruct an algebraic factorization. After complexification, the balanced character channel contains the handle class-sum channel as a reflection-compatible four-dimensional compression.

The character channel's two Kraus matrices can be reduced by an output permutation to complementary rank-three projections

\[
D_1+D_2=I_6.
\]

Selecting two dimensions from each projection block gives a reflection-stable four-plane and compressed Kraus operators

\[
Q_1=\operatorname{diag}(1,1,0,0),
\qquad
Q_2=\operatorname{diag}(0,0,1,1).
\]

Independently, the handle class-sum Kraus pair \(K_1,K_2\) becomes, after a real Hadamard rotation in environment space and an output orthogonal transformation,

\[
\frac{I}{\sqrt2},
\qquad
\frac{\mathcal I}{\sqrt2},
\]

where

\[
\mathcal I^2=-I,
\qquad
\mathcal I^T=-\mathcal I
\]

is the selector's compatible complex structure. A complex environment rotation then gives

\[
P_\pm=\frac12(I\pm i\mathcal I),
\]

the two rank-two spectral projectors of \(i\mathcal I\). A unitary change of basis sends \(P_\pm\) exactly to \(Q_{1,2}\).

Therefore the two channels are exactly equivalent after:

1. choosing a reflection-stable four-plane inside the six-dimensional source/target;
2. orthogonal input/output identification;
3. complex environment rotation.

What remains open is not existence but canonical selection. The source multiplicity spaces are three-dimensional, and choosing which conjugate one-dimensional pair to discard is not fixed by \(C_3\) and reflection alone.

## 1. Character-channel normal form

The explicit isometry of document 944 assigns each source basis vector to one target basis vector and one of two environment characters. Its environment-resolved Kraus operators \(A_1,A_2\) have disjoint source supports and disjoint target ranges. Their sum

\[
A=A_1+A_2
\]

is a permutation matrix.

Conjugating the output by \(A^T\) gives

\[
A^TA_1=D_1,
\qquad
A^TA_2=D_2,
\]

where \(D_1,D_2\) are complementary rank-three projections. Thus the channel is a \(3+3\) dephasing channel in disguise.

Reflection exchanges the two blocks and pairs their three multiplicity directions. Selecting any two paired directions gives a four-dimensional invariant compression. In the explicit witness the retained source coordinates are

\[
(0,4;3,1),
\]

and the omitted reflection pair is \((5,2)\).

The resulting compressed channel is

\[
\mathcal D_4(X)=Q_1XQ_1+Q_2XQ_2.
\]

## 2. Handle-channel normal form

The minimal handle Kraus operators satisfy

\[
K_1^TK_1=K_2^TK_2=\frac12I.
\]

Their Hadamard combinations

\[
O_+=K_1+K_2,
\qquad
O_-=K_1-K_2
\]

are orthogonal. After output conjugation by \(O_+^T\), the Kraus pair becomes

\[
\frac{I}{\sqrt2},
\qquad
\frac{\mathcal I}{\sqrt2},
\qquad
\mathcal I=O_+^TO_-.
\]

Direct calculation gives

\[
\mathcal I^T=-\mathcal I,
\qquad
\mathcal I^2=-I.
\]

The handle class-sum channel is therefore a two-point twirl by the canonical complex structure.

## 3. Complex spectral factorization

Rotate the two Kraus labels complex-linearly:

\[
P_+=\frac12(I+i\mathcal I),
\qquad
P_-=\frac12(I-i\mathcal I).
\]

These obey

\[
P_\pm^2=P_\pm,
\qquad
P_+P_-=0,
\qquad
P_++P_-=I,
\qquad
\operatorname{rank}P_\pm=2.
\]

Hence the complexified handle channel is a \(2+2\) dephasing channel. Choosing unitary eigenbases of \(i\mathcal I\) gives

\[
S^*P_+S=Q_1,
\qquad
S^*P_-S=Q_2.
\]

This proves the simultaneous Kraus factorization requested after document 944.

## 4. What is and is not canonical

Canonical on the handle side:

- the complex structure \(\mathcal I\) is fixed by the selector metric and alternating form;
- its two complex spectral planes are fixed up to unitary basis inside each plane;
- the handle channel determines their dephasing operation.

Not canonical on the character side:

- each nontrivial source character has multiplicity three;
- reflection pairs the two multiplicity spaces but does not select a two-plane in either;
- the possible compressions form a Grassmannian family, with the opposite plane fixed by reflection;
- the omitted conjugate one-dimensional pair has no current Standard-Model label.

Thus the channel factorization does not yet select the physical four-carrier.

## 5. Real versus complex typing

The original Kraus operators on both sides are real. The displayed equivalence uses the complex environment rotation that diagonalizes the real complex structure \(\mathcal I\).

This is mathematically legitimate for quantum channels, because Kraus representations are related by unitary transformations. But the programme's four-real-dimensional response carrier carries a specific sideband/real structure. A physical identification must prove that the complex Kraus rotation is compatible with that sewing rather than silently doubling independent degrees of freedom.

The existing antiunitary sideband construction is a plausible home for this step, but the compatibility has not yet been checked.

## 6. Candidate selectors for the omitted pair

The unresolved one-dimensional conjugate pair could be selected by:

- the sterile-neutrino puncture;
- the pure-lepton root in the mediator triangle;
- the color-average versus color-standard decomposition;
- a Higgs-frame neutral direction;
- the kernel of a source-derived incidence or stress operator.

These are competing hypotheses. Each must produce the same reflection-paired line without a discretionary basis choice.

## 7. Stop-everything and falsification criteria

**Canonical-compression trigger:** a Standard-Model/Furey operator on the multiplicity-three source has a simple eigenline whose orthogonal complement is exactly the required two-plane, with reflection selecting the conjugate line.

**Neutrino trigger:** the discarded pair is precisely the two-face image of the \(\nu^c\) puncture/neutral handle direction.

**Real-structure trigger:** the complex Kraus rotation is induced by the established sideband sewing and preserves the real four-carrier without adding matter degrees of freedom.

**Loss-law trigger:** the same selected compression reproduces the full loss-dependent effects, not only the balanced witness.

**Noncanonicity falsifier:** all source-native invariant operators act scalarly on the multiplicity-three spaces, leaving the Grassmannian unresolved.

**Typing falsifier:** the selected line is gauge charged, fails reflection pairing, or removes a physically required response mode.

## 8. Verdict

| Question | Verdict |
|---|---|
| Does a four-dimensional Kraus factorization exist? | **yes, after complexification** |
| Is it reflection compatible? | **yes, for paired subspaces** |
| Does it reproduce the handle class-sum channel? | **yes, exactly** |
| Is the four-plane selected canonically? | **no** |
| Is the complex Kraus rotation physically typed by the real sideband sewing? | **not yet** |

## 9. Position in the corpus

- [minimal cyclotomic-to-selector channel](944_a_unique_minimal_a2_doublet_environment_embeds_the_cyclotomic_source_into_the_balanced_selector_dilation.md)
- [minimal handle relationship environment](../0800-0899/859_the_three_handle_class_sum_has_a_minimal_two_dimensional_relational_environment.md)
- [selector complex structure](913_the_full_selector_fixes_a_unique_positive_response_metric_and_a_compatible_complex_structure.md)
- [sideband implementation boundary](906_the_sideband_exchange_in_the_a2_cycle_is_an_antiunitary_boundary_sewing_not_a_single_mode_passive_bosonic_evolution.md)

**Subsequent arithmetic selection:** document [946](946_galois_covariance_canonically_selects_the_trace_zero_four_plane_and_removes_the_handle_factorization_grassmannian.md) removes the Grassmannian ambiguity if Galois covariance is retained. The multiplicity triples are the three embeddings above each cubed character, and their canonical trace-zero $A_2$ planes supply the required $2+2$ compression. Physical enforcement of the field-trace projection remains open.
