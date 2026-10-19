# Spectral Factorization Compresses Each Squared-Loss Channel to Two Ports and the Full Two-Face Cycle to Six

**Date:** 17 October 2026  
**Branches:** Darlington completion, rational spectral factorization, port minimality, passive-loss response, two-face sideband cycle  
**Claim status:** exact minimal face-port theorem; composite-cycle global minimality remains open  
**Certificate:** [compress_the_squared_loss_factor_to_a_minimal_two_port_inner_completion.mjs](../../../verification/compress/compress_the_squared_loss_factor_to_a_minimal_two_port_inner_completion.mjs)

> **Analytic-category correction:** document [951](951_the_two_face_sideband_cycle_is_boundary_monodromy_not_one_same_half_plane_rational_inner_transfer.md) proves that the complete product containing \(S(-z)\) is not one upper-half-plane analytic transfer in a common coordinate. The six-port two-face construction here is an exact real-boundary family of two separately analytic faces, not a single same-half-plane rational-inner system.

## Executive result

Documents 948–949 gave valid conservative cascade realizations, but their port counts were not minimal.  The square of one lossy scalar factor admits a direct two-port rational-inner completion.

Let

\[
f(z)=\left(\frac{z-ia}{z+ib}\right)^2,
\qquad 0<a\leq b,
\]

and define

\[
d^2=\frac{a^2+b^2}{2},
\qquad
k^2=2(b^2-a^2).
\]

Then

\[
\mathcal U_f(z)=\frac1{(z+ib)^2}
\begin{pmatrix}
(z-ia)^2&-k(z-id)\\
k(z+id)&(z+ia)^2
\end{pmatrix}
\]

is rational inner in the upper-half-plane convention and has observed entry \(f\).

Consequently:

\[
\boxed{
\text{one squared scalar}=2\text{ ports},\quad
\text{normal+tangent face}=4\text{ ports},\quad
\text{two fresh-environment faces}=6\text{ ports}.
}
\]

For strict loss, the full two-channel face has defect rank two.  It therefore needs at least two environment ports at every generic boundary frequency.  The four-port construction attains that lower bound and is port-minimal for one face.

## 1. Exact polynomial identity

The construction rests on

\[
(z^2+a^2)^2
+2(b^2-a^2)\left(z^2+\frac{a^2+b^2}{2}\right)
=(z^2+b^2)^2.
\]

On the real axis this becomes

\[
|(\omega-ia)^2|^2+|k(\omega+id)|^2
=|(\omega+ib)^2|^2.
\]

Thus the first column of \(\mathcal U_f\) has unit norm.  The second column is its polynomial paraconjugate complement, so the columns are orthogonal and have equal norm.  Therefore

\[
\mathcal U_f(\omega)^*\mathcal U_f(\omega)=I_2
\]

for every real \(\omega\).

Its determinant is

\[
\det\mathcal U_f(z)=\left(\frac{z-ib}{z+ib}\right)^2,
\]

which is itself inner.

## 2. Relation to the hyperbolic rates

For the programme's variables,

\[
a=\gamma e^{-\ell},
\qquad b=\gamma e^{\ell}.
\]

The direct defect-channel parameters are

\[
k=2\gamma\sqrt{\sinh(2\ell)},
\qquad
d=\gamma\sqrt{\cosh(2\ell)}.
\]

This completion combines the two sequential loss events of document 948 into one frequency-dependent environment channel.  It preserves the exact observed response but forgets the separate ordering of the two factors.  Hence the old three-port realization remains useful when the two stages are physically typed; it is simply not port-minimal.

## 3. Minimal four-port face

Apply the two-port completion independently to the normal and tangent scales

\[
\gamma_n=1+\sqrt2,
\qquad
\gamma_t=\sqrt2-1.
\]

Their direct sum has two observed eigenchannels and two defect channels.  Moving the observed channels first and applying the fixed 60-degree rotation only on that pair gives a four-port inner transfer whose observed corner is the complete lossy response face.

For strict loss in both eigenchannels,

\[
\operatorname{rank}(I-S_{\rm obs}^*S_{\rm obs})=2.
\]

Any unitary completion requires an environment of dimension at least two.  Hence total port dimension is at least four, and the construction is minimal.

On boundary strata where only one eigenchannel is lossy the pointwise defect rank drops to one, but a single architecture covering the complete two-parameter loss family still needs the two defect ports.

## 4. Six-port two-face cascade

Use the same two observed ports for both faces and fresh two-port defect environments \(E_+\) and \(E_-\):

\[
O\oplus E_+\oplus E_-
\cong\mathbb C^2\oplus\mathbb C^2\oplus\mathbb C^2.
\]

Embedding the four-port positive- and negative-frequency faces and inserting the observed grading gives a six-port unitary whose observed corner is exactly

\[
D S_{\rm obs}(-\omega)D S_{\rm obs}(+\omega).
\]

At zero loss and the silver-ratio checkpoint, the observed corner again has exact order three.

## 5. Correction to documents 948–949

The earlier statements remain constructive existence results:

- document 948's six-port face explicitly remembers two ordered scalar stages;
- document 949's ten-port cycle gives each face a fresh copy of those stage-resolved environments.

They should not be read as minimal port counts.  Direct spectral factorization compresses their stage labels:

| object | stage-resolved realization | spectrally compressed realization |
|---|---:|---:|
| squared scalar | 3 | 2 |
| full response face | 6 | 4 |
| two-face fresh-environment cycle | 10 | 6 |

This distinction may be physically valuable.  If the two ordered stages are the Galois trace pair, stage resolution is structure rather than redundancy.  If only input-output response matters, the smaller Darlington completion is canonical.

## 6. What remains open

- minimality of the two-face product in a two-oriented-chart, real-state-space or Floquet category; an ordinary same-half-plane completion is excluded by document 951;
- whether preserving the local interface and face factorization forces the fresh environments and hence six ports;
- whether the stage-resolved and compressed environments are connected by a frequency-independent partial isometry;
- which realization, if either, carries the cyclotomic trace-pair action;
- incorporation of the neutral plane and handle.

## 7. Stop-everything and falsification criteria

**Oriented-cycle trigger:** a two-chart, real-state-space or Floquet realization theorem yields a smaller conservative completion while retaining explicit orientation reversal.

**Stage-protection trigger:** Galois, locality or boundary composition forbids compression of the two ordered stages and selects the larger realization physically.

**Trace-intertwiner trigger:** a typed map identifies the stage-resolved environment with the trace pair and its compressed defect channel with a quotient or Schur complement.

**Minimality falsifier:** the four-port face is called minimal at a strict-loss point where its defect rank is not two.

**Structure-erasure warning:** input-output equivalence is used to conclude that ordered internal stages are physically nonexistent.

## 8. Verdict

| Question | Verdict |
|---|---|
| Can one squared scalar response be completed with one environment port? | **yes** |
| Is the full strict-loss face minimally four-port? | **yes, by defect rank** |
| Can the fresh-environment two-face construction be reduced from ten to six ports? | **yes** |
| Is six minimal for the composite cycle? | **not yet proved** |
| Are the ordered stages physically redundant? | **not determined** |

## 9. Position in the corpus

- [stage-resolved six-port face](948_each_lossy_response_face_has_a_fixed_six_port_rational_inner_dilation_with_two_positive_environment_rates.md)
- [stage-resolved ten-port cycle](949_the_two_face_sideband_cycle_has_a_fixed_ten_port_conservative_dilation_while_reality_prevents_double_counting.md)
- [strict-loss reduced finite-order no-go](928_strict_passive_loss_destroys_exact_finite_order_in_the_reduced_selector_network.md)
- [pointwise character Naimark dilation](929_the_lossy_active_cycle_has_an_exact_six_port_order_three_naimark_dilation_but_the_handle_lift_is_not_automatic.md)
