# The Paired Furey Graph Retains the Walsh Orientation Signs Until Separate-Channel Gram Packaging Erases Cross-Character Coherence

## Claim status

Exact amplitude/Gram information-flow theorem. It locates the orientation loss at cross-channel dephasing rather than at real transpose pairing or positivity itself.

## 1. The issue

The relational Walsh phase represents orientation reversal by

\[
D=\operatorname{diag}(+1,+1,-1,-1)
\]

in character order

\[
(1,H,C,HC).
\]

Rank-one character projectors are invariant because each sign squares to one. This might suggest that every positive Gram construction necessarily loses orientation. That conclusion is too strong.

## 2. Full Gram versus separate Grams

Let

\[
b=(b_1,b_H,b_C,b_{HC})^T
\]

be a coherent character-amplitude vector. Its full positive Gram matrix is

\[
G=bb^\dagger\succeq0.
\]

Orientation reversal gives

\[
G\longmapsto DGD.
\]

Split the character space into even and odd sectors:

\[
E=\operatorname{span}\{1,H\},
\qquad
O=\operatorname{span}\{C,HC\}.
\]

Then

\[
G=
\begin{pmatrix}
G_{EE}&G_{EO}\\
G_{OE}&G_{OO}
\end{pmatrix}
\]

transforms as

\[
DGD=
\begin{pmatrix}
G_{EE}&-G_{EO}\\
-G_{OE}&G_{OO}
\end{pmatrix}.
\]

Therefore:

- all populations are invariant;
- even–even coherences are invariant;
- odd–odd coherences are invariant;
- exactly the even–odd coherences carry the orientation sign.

## 3. Where the information is erased

Define parity-block dephasing by

\[
\Delta(G)=
\begin{pmatrix}
G_{EE}&0\\
0&G_{OO}
\end{pmatrix}.
\]

Then

\[
\boxed{
\Delta(DGD)=\Delta(G).
}
\]

Packaging four channel responses as a direct sum, or measuring only diagonal character residues, performs precisely this kind of information loss.

Positivity is not the culprit. A full positive semidefinite Gram matrix retains the bit. The culprit is discarding cross-character coherence.

## 4. Relation to the paired Furey graph

The transpose-paired Furey graph is a real linear fixed space. The orientation phases are real signs, so transpose pairing preserves them at amplitude level. Nothing in

\[
(X,X^T)
\]

forces the relative sign between an even and odd channel amplitude to disappear.

The sign is lost only after one forms four isolated channel Grams and omits cross-channel products such as

\[
X_fX_g^\dagger,
\qquad f\ne g.
\]

Those cross terms are precisely the natural TRO/linking-algebra objects that can retain relative orientation.

## 5. Minimal algebraic witness

For an even character \(e\) and odd character \(o\), define

\[
W_{eo}=|e\rangle\langle o|+|o\rangle\langle e|.
\]

Then

\[
DW_{eo}D=-W_{eo}.
\]

The expectation

\[
I_{eo}=\operatorname{Tr}(GW_{eo})
=2\operatorname{Re}(b_e^*b_o)
\]

is orientation odd. Its imaginary companion measures

\[
2\operatorname{Im}(b_e^*b_o).
\]

Together they recover the relative complex coherence.

## 6. Remaining physical gate

Cross-channel coherence is meaningful only after relative phases are fixed. Independent field or source rephasings can change

\[
b_e^*b_o.
\]

A physical witness therefore needs one of:

- a Furey cyclic path fixing the relative phase;
- a common boundary source and analyzer;
- a gauge-invariant multi-channel interferometer;
- a Ward-normalized off-diagonal kernel;
- an oriented TRO product with fixed source and target conventions.

The paired graph proves that retention is algebraically possible. It does not yet supply this reference.

## 7. Stop-everything tests

- **Coherence success:** a source-derived nonzero \(G_{EO}\) is invariant under allowed field conventions.
- **TRO success:** a cyclic composition fixes the relative sign and maps it to the relational witness.
- **Dephasing falsifier:** the physical response is block diagonal between even and odd characters.
- **Convention falsifier:** the witness sign changes under an unfixed independent source rephasing.
- **Positivity warning:** positive Gram construction is blamed for information loss although the full PSD matrix retains the bit.
- **Packaging warning:** four separate response cones are silently treated as one coherent Gram without constructing cross terms.

## 8. Executable certificate

    node verification/prove/prove_full_cross_channel_gram_retains_walsh_orientation_while_block_dephasing_erases_it.mjs

The certificate transforms an explicit coherent amplitude, verifies sign reversal only in even–odd Gram blocks and proves exact invariance after parity-block dephasing.

## Companion documents

- [Orientation becomes a Walsh character phase](822_the_atomic_orientation_bit_becomes_a_walsh_character_phase_and_is_invisible_to_relational_projector_populations.md)
- [Transpose-paired Furey Jordan graph](812_transpose_paired_furey_rectangles_form_a_real_jordan_subtriple_but_the_higgs_vacuum_creates_the_four_channel_split.md)
- [Furey orientation as a ternary bimodule](../0100-0199/108_furey_oriented_bimodule_ternary_closure.md)
- [Channel mixing and center collapse](813_the_four_higgs_dressed_response_blocks_have_an_r4_center_exactly_until_cross_channel_mixing_connects_them_and_the_two_gradings_leave_two_jordan_maps.md)
