# The Redheffer Orbit Preserves Sampled Schur Passivity but Requires Explicit Sideband Doubling for Real-Time Reality

## Claim status

Finite but broad computational audit of the exact selector Redheffer action applied to the actual coupled rational-inner base response. It supplies strong evidence for passivity and chart regularity on the tested domain, falsifies an undoubled entrywise reality claim, and gives an exact doubled-sideband repair. The global upper-half-plane regularity question left open here has since been resolved for this family by the [lossless-feedback factorization theorem](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md).

## 1. Object tested

Use the selected-background response

\[
S_+(z)=\sum_{j=1}^4 b_{\gamma_j}(z)^2P_j,
\qquad
b_\gamma(z)=\frac{z-i\gamma}{z+i\gamma},
\]

which satisfies

\[
S_+(1)=S_0.
\]

For every selector element \(g\), define its positive-frequency envelope by the exact scattering action

\[
S_{g,+}(z)=\Phi_g(S_+(z)).
\]

The audit evaluates all eighteen \(g\) on the grid

\[
x\in\{-4,-2,-1,0,1,2,4\},
\qquad
y\in\{0.05,0.2,0.5,1,2,5\},
\qquad z=x+iy.
\]

This gives \(18\times42=756\) upper-half-plane samples.

## 2. Chart denominators remain separated from zero on the grid

The scattering/transfer action requires inversion of the input transmission block and of the transformed transfer block \(d_g(z)\). Across the full grid, the smallest measured determinant magnitudes are

\[
\min |\det S_{12}(z)|\approx 0.00164283,
\]

and

\[
\min |\det d_g(z)|\approx 3.41803.
\]

Thus no chart singularity occurs in the audited region. The much smaller input-transmission margin warns that a global proof cannot rely on coarse numerical separation alone.

## 3. Strict Schur positivity survives every sample

For each transformed response, form

\[
\Delta_g(z)=I-S_{g,+}(z)^\dagger S_{g,+}(z).
\]

Complex Hermitian Cholesky factorization succeeds at every sample. The smallest Cholesky pivot is

\[
\boxed{0.00218691>0.}
\]

Therefore every sampled transformed response is strictly contractive.

Since the Cayley transform of a strict Schur matrix has positive Hermitian or imaginary part according to convention, these samples also pass the pointwise Herglotz/passivity gate. They do not determine the complete pole measure.

## 4. Reciprocity and boundary unitarity survive

The largest reciprocity error on the upper-half-plane grid is

\[
5.29\times10^{-15}.
\]

On seven nonzero real frequencies for every selector element—126 boundary samples—the largest unitarity error is

\[
7.57\times10^{-15}.
\]

Thus the exact discrete result extends numerically to a substantial analytic sample: the fractional action preserves symmetric scattering and lossless real-boundary behavior there.

## 5. The undoubled reality law fails

The base response was deliberately chosen to obey the strong single-envelope relation

\[
S_+(z)=\overline{S_+(-\bar z)}.
\]

Naively imposing the same identity after pointwise selector transport would require

\[
\Phi_g(S_+(z))
=\overline{\Phi_g(S_+(-\bar z))}.
\]

This fails. The largest grid error is

\[
\boxed{1.97211.}
\]

The failure is not numerical noise. The Bogoliubov coefficients entering \(\Phi_g\) are complex in the fixed polarization, so the positive-envelope fractional map need not commute with entrywise conjugation.

Accordingly, the following claim is closed:

> A single four-channel positive-frequency envelope is mapped by every selector to another envelope obeying the same entrywise sideband identity in the fixed polarization.

## 6. Exact doubled-sideband repair

Real time-domain reality never required the positive-frequency envelope alone to be fixed. The established construction uses a typed sideband double. For each transported positive envelope define

\[
S_{g,-}(z)=\overline{S_{g,+}(-\bar z)}
\]

and

\[
\mathbb S_g(z)=
\begin{pmatrix}
S_{g,+}(z)&0\\
0&S_{g,-}(z)
\end{pmatrix}.
\]

Let \(X\) exchange the two sideband blocks. Then, identically,

\[
X\overline{\mathbb S_g(-\bar z)}X
=\mathbb S_g(z).
\]

Thus the correct covariant order is

\[
S_+
\xrightarrow{\ \Phi_g\ }
S_{g,+}
\xrightarrow{\ \text{sideband completion}\ }
\mathbb S_g.
\]

It is not generally

\[
\mathbb S
\xrightarrow{\ \Phi_g\oplus\Phi_g\ }
\mathbb S_g.
\]

The negative-frequency block is constrained data, not a second independent particle or channel.

## 7. Consequence for the programme

The discrete selector action remains valid, and sampled passivity survives. What changes is the reality bookkeeping:

- selector covariance belongs first to the complex positive-frequency response;
- real-time completion is a typed antiunitary doubling performed after transport;
- the selector action on the negative block is the conjugate-reflected action induced from the positive block;
- a fixed four-channel port realization of the real structure is too restrictive.

This mirrors the earlier distinction between abstract character parity and its moving port realization. Both orientation and reality are global only when their auxiliary typing is retained.

## 8. Analytic dependency subsequently resolved

By itself, the grid did not rule out:

- zeros of a transmission determinant elsewhere in the upper half-plane;
- poles arbitrarily near the sampled region;
- loss of contractivity outside the grid;
- negative weights in a complete partial-fraction expansion after transformation.

A global result requires either:

1. identifying \(\Phi_g\) as an automorphism of an appropriate transfer/scattering Schur domain; or
2. exact rational denominator and residue analysis for the two generators \(R,H\).

The later certificate found a stronger structural route. It factors every transported response as a cascade of two fixed unitary selector networks around the strict-Schur base. The resulting feedback denominator factors have a uniform norm bound, so upper-half-plane zeros are excluded globally and the transported Cayley residues are positive semidefinite. See [the global Redheffer theorem](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md). The reality result of this document is unchanged: sideband doubling is still required.

## 9. Stop-everything and falsification criteria

- **Chart falsifier:** an upper-half-plane zero of an input or transformed transmission determinant.
- **Schur falsifier:** any \(z\) with \(I-S_{g,+}^\dagger S_{g,+}\not\succeq0\).
- **Reciprocity falsifier:** a nonzero antisymmetric part after exact simplification.
- **Undoubled-reality falsifier:** already triggered, with error \(1.97211\); that stronger branch is closed.
- **Doubled-reality falsifier:** failure of the block-exchange antiunitary identity; the identity is definitional and exact for the stated completion.
- **Global success:** factor the generator denominators and prove that all their zeros lie outside the open upper half-plane while all Cayley residues remain positive.
- **Stop-everything signal:** the same doubled fractional response law is independently obtained from a real-time Standard-Model stress or boundary correlator.

## 10. Executable certificate

    node verification/derive/derive_the_selector_redheffer_action_on_scattering_and_test_the_full_18_background_orbit.mjs

The certificate now includes the actual rational-inner response, 756 upper-half-plane orbit samples, exact Cholesky positivity checks, denominator margins, reciprocity, 126 boundary-unitarity samples and the explicit failure of undoubled sideband reality.

## Companion documents

- [Global lossless-feedback factorization and Schur theorem](836_the_selector_redheffer_orbit_is_a_lossless_feedback_cascade_with_global_schur_and_positive_residue_control.md)

- [Exact discrete Redheffer orbit](828_the_selector_group_has_an_exact_redheffer_action_on_scattering_space_transporting_all_18_checkpoints_without_spectral_refitting.md)
- [Sideband-exchange real-time completion](../0700-0799/781_a_sideband_exchange_real_structure_gives_the_complex_scattering_checkpoint_a_real_time_reciprocal_passive_completion.md)
- [Selected-background rational-inner response](826_the_arithmetic_checkpoint_rejects_two_independent_character_interferometers_but_has_an_exact_coupled_four_character_positive_residue_embedding.md)
