# Frontier Wave 7.83: The Chain-Theory Read-End Rectangular Gate

**Date:** 25 October 2026
**Status:** exact directional and kernel near-hit; partial-isometry normalization and physical kernel identity remain open
**Certificate:** [read-end rectangular verifier](../../../../verification/verify/verify_chain_theory_read_end_rectangular_gate.mjs)

## Result

The target's asymmetric read rule has a substantially closer corpus match
than a shared dimension.

The target qutrit-end read transports from the larger endpoint to the smaller
one,

\[
K_{\rm target}:\mathbb C^3\longrightarrow\mathbb C^2,
\]

and necessarily leaves one qutrit direction invisible. The corpus's typed
partial-sewing channel is

\[
E:\mathbb C^2\longrightarrow\mathbb C^3,
\]

so its adjoint has precisely the target direction:

\[
K=E^\dagger:\mathbb C^3\longrightarrow\mathbb C^2.
\]

At the exact corpus checkpoint, (K) has rank two and a one-dimensional
kernel. This is a typed directional match. It is not yet an identification of
the two reads.

## 1. Exact checkpoint

The partial-sewing columns are

\[
E=
\begin{pmatrix}
3/5&5/13\\
4/5&0\\
0&12/13
\end{pmatrix}.
\]

Therefore

\[
K=E^T
=
\begin{pmatrix}
3/5&4/5&0\\
5/13&0&12/13
\end{pmatrix},
\]

with

\[
\ker K
=
\operatorname{span}
\left\{
\begin{pmatrix}12\\-9\\-5\end{pmatrix}
\right\}.
\]

Thus the map has exactly one invisible qutrit ray, as does any rank-two read
from a three-dimensional endpoint onto a two-dimensional endpoint.

## 2. The exact obstruction

A maximally entangled qutrit--qubit link on its common two-dimensional support
uses a partial isometry on that support. Its two nonzero singular values are
equal after the unit convention is fixed.

The corpus checkpoint instead has range Gram matrix

\[
KK^\dagger
=
\begin{pmatrix}
1&3/13\\
3/13&1
\end{pmatrix},
\]

whose eigenvalues are

\[
\frac{16}{13},
\qquad
\frac{10}{13}.
\]

They are unequal. No unitary change of endpoint bases can turn this checkpoint
map into the target partial isometry, because singular values are unitary
invariants.

The match is therefore:

\[
\boxed{
\text{direction + rank + kernel dimension match};
\qquad
\text{metric normalization does not.}
}
\]

## 3. Positive whitening closes the algebraic shape

Because (KK^\dagger) is positive definite, define

\[
K_{\rm flat}
=(KK^\dagger)^{-1/2}K.
\]

Then

\[
K_{\rm flat}K_{\rm flat}^\dagger=I_2,
\qquad
\ker K_{\rm flat}=\ker K.
\]

Thus the existing rectangular channel canonically determines a coisometry
with the target's algebraic read shape once its positive range metric is used
to whiten the outputs.

This does not make the whitening physically free. In the corpus, positive
metrics encode response normalization, detector calibration or a selected
Gram datum. The required normalization must be derived or measured before
the flattened map can be called the physical read.

## 4. Relation to the parabolic and Grassmannian lanes

The two orientations already have distinct corpus roles:

- (K:\mathbb C^3\to\mathbb C^2) lies in the nilradical of the
  \((2,3)\) parabolic stabilizing the reference two-plane;
- (E:\mathbb C^2\to\mathbb C^3) lies in the opposite nilradical and is the
  graph coordinate on the big cell of \(\operatorname{Gr}(2,5)\).

The target's larger-to-smaller read therefore aligns with the parabolic
compression direction, while the experimentally accessible partial-sewing
channel aligns with the opposite Grassmannian displacement. Adjoint passage
relates them, but its physical phase and metric remain data rather than
automatic consequences.

## 5. What would close this gate

Three checks remain:

1. derive the positive whitening metric from the same conserved readout that
   normalizes the proposed coupling;
2. identify the kernel ray with the target's unbroken qutrit direction rather
   than merely an arbitrary one-dimensional null space; and
3. show that the flattened read intertwines the corpus selector exchanges
   used in the 172-record census.

If these pass, the qutrit-end rule would no longer be imported wholesale from
the target. It would descend from the corpus rectangular response. If the
checkpoint singular-value anisotropy is physically invariant and cannot be
whitened by the conserved trace unit, the proposed identification fails.

## Verdict

The asymmetric end rule has moved from **unexplained target input** to
**exact corpus near-hit with one metric and one kernel-identity gate**. This
is stronger than numerology because rank, direction, kernel and singular
values are basis-independent data.

## Corpus anchors

- [typed partial sewing](../../../claims/1000-1099/1021_a_six_dimensional_typed_partial_sewing_realizes_the_causal_gram_centre_with_one_reference_ray_and_an_a2_residual_doublet.md)
- [rectangular mediator audit](frontier_wave7_52_rectangular_mediator_candidate_audit.md)
- [bifundamental retyping](frontier_wave7_53_bifundamental_retyping_and_selection_gate.md)
- [Grassmannian globalization](frontier_wave7_58_grassmannian_globalization_of_the_kenotic_channel.md)
- [inverse arithmetic target](frontier_wave7_82_chain_theory_two_by_three_inverse_reconstruction.md)
