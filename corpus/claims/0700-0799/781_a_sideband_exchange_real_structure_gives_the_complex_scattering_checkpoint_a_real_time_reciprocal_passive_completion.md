# A Sideband-Exchange Real Structure Gives the Complex Scattering Checkpoint a Real-Time Reciprocal Passive Completion

## Claim

The complex unitary checkpoint \(S_0\) need not itself be real in order to describe a real time-domain response. Pair the positive-frequency complex envelope with its negative-frequency conjugate:

\[
\mathbb S(z)=
\begin{pmatrix}
S_+(z)&0\\
0&\overline{S_+(-\bar z)}
\end{pmatrix}.
\]

Let \(X\) exchange the two sideband blocks and define \(\Xi=XK\). Then

\[
\Xi^2=1
\]

and

\[
X\overline{\mathbb S(-\bar z)}X=\mathbb S(z).
\]

The doubled response is analytic and contractive in the upper half-plane, symmetric and unitary on the real axis, and contains

\[
S_+(+\omega_0)=S_0,
\qquad
S_-(-\omega_0)=\bar S_0.
\]

Thus real-time reality does not obstruct the arithmetic scattering checkpoint. It requires a typed sideband index and its antiunitary constraint.

## 1. Why a single complex checkpoint is not a reality violation

For a real time-domain kernel, positive and negative frequencies obey

\[
S(-\omega)=\overline{S(\omega)}.
\]

This relates two frequency points; it does not require \(S(\omega)\) to be real at each positive frequency. A complex unitary \(S_0\) is therefore admissible provided its negative-frequency partner is \(\bar S_0\).

The complex-envelope construction in document 780 supplied only the positive-frequency branch. The present sideband completion adds the required partner explicitly.

## 2. Analytic construction

Take

\[
S_+(z)=f(z)S_0
\]

with the normalized Blaschke factor from document 780, and define

\[
S_-(z)=\overline{S_+(-\bar z)}.
\]

If \(z\) lies in the upper half-plane, so does \(-\bar z\). Therefore both blocks are analytic and strictly contractive there. On the real axis both are unitary. Since \(S_0^T=S_0\), both blocks remain reciprocal.

The reality law follows by direct block exchange. It is verified at generic complex frequencies, not only on the real boundary.

## 3. Dimension and doubling

The response is represented on eight complex sideband amplitudes, but the negative-frequency block is not independent. Physical real fields satisfy the \(\Xi\)-fixed condition relating it to the conjugate positive-frequency block.

This is the frequency analogue of the survivor, propagation and Nambu fixed-space reductions in document 779:

\[
\text{larger complex presentation}
\quad+\quad
\text{antiunitary reality}
\quad\Longrightarrow\quad
\text{unchanged real physical content}.
\]

The sideband index must nevertheless remain typed. It is not the handle, survivor, propagation or Nambu index, even though its reality operation again has \(\sigma_xK\) form.

## 4. What remains nonpredictive

The completion closes the real-time consistency gate but preserves the limitations of the scalar all-pass construction:

- the pole scale \(\gamma\) is free;
- the matrix \(S_0\) is inserted as checkpoint data;
- the sideband blocks do not yet arise from matter spectral residues;
- no dispersion relation has been matched to measured thresholds; and
- no local spacetime boundary action has been derived.

The programme should therefore move to typed spectral measures rather than adding more formal reality copies.

## 5. Next mathematical target

Let the neutral response have a positive spectral representation schematically of the form

\[
F(z)=F_\infty+sum_j\frac{R_j}{m_j-z},
\qquad
R_j\succeq0,
\]

with paired negative-frequency terms required by reality. The residue ranges should be restricted by the Furey \(u,d,e,\nu\), survivor and sewing supports.

The next stop-everything calculation is whether positive typed residues can interpolate the Cayley value corresponding to \(S_0\) while preserving the survivor/propagation fixed space.

## 6. Stop conditions

- Do not count negative-frequency envelopes as independent particles.
- Do not identify the sideband bit with any of the four binary indices in document 779.
- Do not call the response predictive while \(S_0\), \(\gamma\) and residue supports are inserted freely.
- Pin the real-time branch if typed positive residues cannot satisfy the checkpoint interpolation.

## 7. Executable certificate

```powershell
node verification/build/build_real_time_sideband_completion_of_complex_reciprocal_inner_scattering_checkpoint.mjs
```

The certificate verifies the analytic reality law, checkpoint pairing, upper-half-plane contractivity, reciprocity and real-axis unitarity.

## Companion documents

- [Rational-inner positive-real embedding](780_the_selected_unitary_scattering_checkpoint_embeds_in_a_reciprocal_rational_inner_response_with_positive_real_cayley_impedance.md)
- [Four binary indices and their fixed dimensions](779_handle_survivor_propagation_and_nambu_are_four_distinct_binary_indices_whose_real_structures_can_leave_exactly_four_real_carrier_dimensions.md)
