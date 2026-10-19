# Only the Untwisted \(\mathbb Z_3\) Defect Has the Two-Qutrit Exponent Module, and the BF Orbifold Projects Bulk Discrete Theta Out of the Zero Modes

**Date:** 19 October 2026  
**Branches:** Dijkgraaf–Witten twist, discrete theta, BF orbifold, discriminant group, two-qutrit factorization  
**Claim status:** exact \(K\)-matrix/Smith classification and bulk zero-mode projection; localized counterterms remain conditional  
**Certificate:** [classify_z3_dw_twists_and_prove_only_the_untwisted_class_is_two_qutrit.mjs](../../../verification/classify/classify_z3_dw_twists_and_prove_only_the_untwisted_class_is_two_qutrit.mjs)

## Executive result

The possible discrete topological twist isolated in document 1181 is not harmless.

A convenient Abelian \(K\)-matrix presentation of the three \(2+1\)-dimensional \(\mathbb Z_3\) Dijkgraaf–Witten classes is

\[
K_p=
\begin{pmatrix}
0&3\\
3&2p
\end{pmatrix},
\qquad
p=0,1,2\pmod3.
\]

All three have

\[
|\det K_p|=9,
\]

so all have nine torus states. But their Smith invariants differ:

\[
\operatorname{SNF}(K_0)=(3,3),
\]

\[
\operatorname{SNF}(K_1)
=
\operatorname{SNF}(K_2)
=(1,9).
\]

Therefore:

\[
\boxed{
\begin{array}{c|c|c}
p&\text{discriminant group}&\text{carrier}\\ \hline
0&\mathbb Z_3\oplus\mathbb Z_3&\text{two-qutrit exponent module}\\
1,2&\mathbb Z_9&\text{cyclic nine-level module}
\end{array}}
\]

Only the untwisted class has the \(\mathbb F_3^2\) anyon group and \(\mathbb F_3^4\) Wilson exponent module required by the programme.

The orbifold construction provides a real selection mechanism. A four-dimensional bulk discrete-theta term is represented schematically by

\[
\int b_2\wedge b_2.
\]

Under circle reduction it contains

\[
\int b_2^{(3)}\wedge c_1.
\]

The orbifold parity of document 1178 makes \(b_2^{(3)}\) odd and removes its zero mode. Consequently the bulk discrete-theta term contributes nothing to the retained topological zero-mode action.

Thus the orbifold bulk selects \(p=0\) at zero-mode level. The remaining threat is a localized \(2+1\)-dimensional parity-odd Chern–Simons counterterm on a fixed plane. If the reflection/Real symmetry forbids such a term, the exact two-qutrit carrier follows. If it is generated, the interface still has nine states but no longer has the required two-qutrit finite symplectic module.

## 1. Smith classification

For an integral nondegenerate \(2\times2\) matrix, the first Smith invariant is the gcd of all entries, and the second is \(|\det K|/d_1\).

For \(p=0\):

\[
\gcd(0,3,3,0)=3,
\]

so

\[
(d_1,d_2)=(3,3).
\]

For \(p=1,2\), \(2p\) is coprime to three, so

\[
d_1=1,\qquad d_2=9.
\]

The equality of Hilbert-space dimensions therefore conceals inequivalent finite carriers. Dimension nine alone is insufficient.

## 2. Mutual response versus self twist

The inverse matrix is

\[
K_p^{-1}
=
\begin{pmatrix}
-2p/9&1/3\\
1/3&0
\end{pmatrix}.
\]

The mutual response coefficient remains \(1/3\) for every \(p\). The twist adds a self-statistics term \(-2p/9\).

This explains why the one-third response and nine-state count cannot determine the full topological theory. The two-qutrit claim needs the stronger Smith/exponent condition.

For \(p\ne0\), some anyon has order nine. There is no basis in which every exponent is a pair of order-three labels.

## 3. Four-dimensional origin of the twist

The four-dimensional \(\mathbb Z_3\) BF theory can admit a quadratic two-form term, with quantization depending on spin and global conventions. Its schematic zero-mode reduction is enough for the present gate.

Write

\[
b=b_2^{(3)}+c_1\wedge dy.
\]

Then

\[
b\wedge b
=
2b_2^{(3)}\wedge c_1\wedge dy.
\]

Document 1178 assigns

\[
b_{\mu\nu}\text{ odd},
\qquad
b_{\mu y}=c_\mu\text{ even}.
\]

Hence \(b_2^{(3)}\) has no constant mode and the quadratic bulk term vanishes in the retained zero-mode sector.

This conclusion does not require choosing the coefficient of the bulk term. Every coefficient multiplies a projected-out zero-mode expression.

## 4. Localized counterterms

The orbifold fixed planes can in principle carry intrinsic Chern–Simons terms. A term shifting \(p\) is orientation odd. It is forbidden if the complete defect preserves the reflection/Real symmetry that exchanges or reverses the two faces without an anomalous sign.

But a single oriented wall normal, chiral boundary spectrum or parity anomaly can permit it. Therefore the untwisted conclusion requires one of:

1. exact reflection/Real invariance of the fixed-plane effective action;
2. paired fixed planes with cancelling localized levels;
3. explicit anomaly calculation showing zero induced level;
4. a counterterm prescription fixed by the ultraviolet completion.

Choosing \(p=0\) merely to recover two qutrits would be circular without one of these.

## 5. Relation to orientation

The untwisted mutual theory still has two orientations:

\[
\omega^{ab}
\quad\text{and}\quad
\omega^{-ab}=\omega^{2ab}.
\]

These are related by reversing the defect orientation and do not change the Smith group.

The Dijkgraaf–Witten twist is different. It changes self statistics and, for \(\mathbb Z_3\), changes the finite group extension from \(\mathbb Z_3^2\) to \(\mathbb Z_9\). Orientation reversal sends \(p\to-p\), exchanging the two nonzero twisted classes, but does not turn them into \(p=0\).

## 6. Consequence for \(Sp(4,\mathbb F_3)\)

The programme's finite symplectic group acts on a four-dimensional vector space over \(\mathbb F_3\). This requires every basic exponent to have order three.

Therefore:

- \(p=0\) supports the declared \(Sp(4,\mathbb F_3)\) carrier;
- \(p=1,2\) do not, despite having nine states;
- the mutual \(1/3\) response alone cannot distinguish them;
- the orbifold plus Real/reflection symmetry is the candidate twist selector.

## 7. Claim ledger

- **Exact:** all three twist classes have nine torus states.
- **Exact:** only \(p=0\) has Smith group \(\mathbb Z_3^2\).
- **Exact:** \(p=1,2\) have cyclic group \(\mathbb Z_9\).
- **Exact:** every class retains mutual inverse coefficient \(1/3\).
- **Exact:** the orbifold projects the bulk \(b\wedge b\) zero-mode contribution out.
- **Conditional:** no localized fixed-plane Chern–Simons level is generated.
- **Open:** parity-anomaly audit of the localized matter spectrum.
- **Open:** microscopic Real/reflection protection.

## 8. Stop-everything and positive gates

**Dimension stop:** nine states do not imply two qutrits.

**Response stop:** mutual coefficient \(1/3\) does not fix the self twist.

**Bulk stop:** projecting out the bulk twist does not automatically forbid localized Chern–Simons terms.

**Orientation stop:** \(p=\pm1\) are exchanged by orientation; neither equals the untwisted class.

**Positive Real trigger:** prove the fixed-plane spectrum and regulator preserve the reflection/Real symmetry and induce zero self level.

**Negative trigger:** any unavoidable parity anomaly induces \(p=\pm1\), converting the finite carrier to \(\mathbb Z_9\) and closing the two-qutrit \(Sp(4,\mathbb F_3)\) identification.

## 9. Verdict

\[
\boxed{
\text{orbifold bulk}+\text{no localized parity-odd level}
\Longrightarrow
K=3H
\Longrightarrow
\mathbb Z_3^2
\Longrightarrow
\text{two qutrits}.
}
\]

The twist ambiguity is reduced to a concrete localized parity-anomaly calculation.

## Corpus position

- [colour-centre symplectic reduction](1181_symplectic_reduction_by_the_gauged_colour_centre_takes_the_z9_lift_from_81_to_9_torus_states_and_descends_the_pairing_to_level_three.md)
- [orbifold BF projection](1178_an_s1_over_z2_bf_orbifold_projects_out_the_extra_zero_mode_sector_and_retains_exactly_the_nine_state_level_three_interface.md)
- [typed BF ports](1179_the_orbifold_bf_fields_have_a_typed_electric_flux_port_map_and_the_furey_punctured_torus_supplies_their_two_canonical_qutrit_pairs.md)
