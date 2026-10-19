# A Positive Even–Odd Character Interferometer Measures Relational Orientation by Balanced Output Differences

## Claim status

Exact positive two-mode measurement protocol for the relational orientation bit. It provides an operational observable but does not yet derive the required coherent ports from the arithmetic scattering checkpoint.

## 1. Minimal coherence block

Choose one translation-even Walsh character

\[
e\in\{1,H\}
\]

and one translation-odd character

\[
o\in\{C,HC\}.
\]

Their positive response block has the form

\[
G_{eo}=
\begin{pmatrix}
p&c\\
c^*&q
\end{pmatrix}
\succeq0,
\]

with

\[
p,q\ge0,
\qquad
|c|^2\le pq.
\]

Orientation reversal acts by

\[
R=\operatorname{diag}(1,-1),
\qquad
G_{eo}\longmapsto RG_{eo}R,
\]

so

\[
c\longmapsto-c
\]

while \(p\) and \(q\) remain fixed.

## 2. Linear analyzer

Use the balanced ports

\[
|+\rangle=\frac{|e\rangle+|o\rangle}{\sqrt2},
\qquad
|-\rangle=\frac{|e\rangle-|o\rangle}{\sqrt2}.
\]

Their intensities are

\[
I_\pm
=\frac{p+q\pm2\operatorname{Re}c}{2}.
\]

Therefore

\[
\boxed{
I_+-I_-=2\operatorname{Re}c
}

is orientation odd.

## 3. Quadrature analyzer

Use instead

\[
|+i\rangle=\frac{|e\rangle+i|o\rangle}{\sqrt2},
\qquad
|-i\rangle=\frac{|e\rangle-i|o\rangle}{\sqrt2}.
\]

Up to the sign convention assigned to the two outputs,

\[
\boxed{
I_{+i}-I_{-i}=2\operatorname{Im}c.
}


The linear and quadrature analyzers recover the full complex coherence \(c\).

## 4. Stokes-like form

Define

\[
S_0=p+q,
\qquad
S_1=2\operatorname{Re}c,
\qquad
S_2=2\operatorname{Im}c,
\qquad
S_3=p-q.
\]

Orientation acts as

\[
(S_0,S_1,S_2,S_3)
\longmapsto
(S_0,-S_1,-S_2,S_3).
\]

Thus:

- \(S_0,S_3\) are population observables and orientation even;
- \(S_1,S_2\) are coherence observables and orientation odd.

This is the exact relational-phase replacement for the atomic channel-times-flux population index.

## 5. Positive normalized visibility

Define

\[
\mathcal V
=\frac{2|c|}{p+q}.
\]

Positivity gives

\[
|c|\le\sqrt{pq}
\le\frac{p+q}{2},
\]

and hence

\[
0\le\mathcal V\le1.
\]

The orientation is encoded in the phase

\[
\arg c
\longmapsto
\arg c+\pi,
\]

while \(\mathcal V\) measures coherence strength independently of the sign convention.

If \(c=0\), the relational orientation is operationally absent even though the abstract amplitude action remains defined.

## 6. Causal scattering interpretation

In a frequency-dependent boundary experiment, \(p(\omega)\), \(q(\omega)\) and \(c(\omega)\) are entries of a positive spectral or output coherence matrix. A balanced hybrid or beam-splitter-like analyzer implements the linear combinations above.

The observable can therefore be sought as

\[
\Delta I_{\rm lin}(\omega)
=2\operatorname{Re}c(\omega),
\]

and

\[
\Delta I_{\rm quad}(\omega)
=2\operatorname{Im}c(\omega).
\]

Retarded/advanced prescriptions may determine analytic boundary values of \(c(\omega)\), but—as before—they do not by themselves choose which spatial orientation is called positive.

## 7. What must be added to the current checkpoint

The existing positive residue model is diagonal in its spectral projectors. To implement this interferometer, the programme needs:

1. coherent excitation of one even and one odd relational mode;
2. a source-derived phase relation;
3. an analyzer mixing those modes before intensity detection;
4. an off-diagonal spectral kernel or scattering amplitude retaining \(c\).

These requirements are compatible with positivity. They are absent from a purely diagonal residue measure.

## 8. Stop-everything tests

- **Interferometer success:** balanced output differences reverse while total intensity and population imbalance remain fixed.
- **Full-coherence success:** both \(S_1\) and \(S_2\) are measurable with one common phase convention.
- **Dephasing failure:** \(c(\omega)=0\) throughout the physical band.
- **Visibility bound:** any claimed positive coherence has \(\mathcal V>1\).
- **Reference failure:** analyzer phase drifts independently of the Furey/boundary orientation.
- **Population-only warning:** \(S_0\) or \(S_3\) is claimed to distinguish the relational orientation.

## 9. Executable certificate

    node scripts/derive_a_positive_two_character_interferometer_for_measuring_relational_orientation_coherence.mjs

The certificate verifies positivity, computes linear and quadrature analyzer outputs, checks their reversal law and proves the normalized visibility bound.

## Companion documents

- [Full cross-channel Gram retains orientation](823_the_paired_furey_graph_retains_the_walsh_orientation_signs_until_separate_channel_gram_packaging_erases_cross_character_coherence.md)
- [Walsh character phase orientation](822_the_atomic_orientation_bit_becomes_a_walsh_character_phase_and_is_invisible_to_relational_projector_populations.md)
- [Retarded/advanced values do not select spatial orientation](801_retarded_and_advanced_boundary_values_share_the_same_projector_residues_so_causality_alone_does_not_select_the_flux_orientation_torsor.md)
- [Positive coherent relational residues](792_checkpoint_spectral_projectors_give_an_explicit_positive_rank_one_relational_residue_model_but_not_furey_typing_or_threshold_prediction.md)
