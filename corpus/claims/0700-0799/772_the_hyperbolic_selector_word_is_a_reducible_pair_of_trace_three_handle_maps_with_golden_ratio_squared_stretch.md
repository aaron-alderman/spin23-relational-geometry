# The Hyperbolic Selector Word Is a Reducible Pair of Trace-Three Handle Maps with Golden-Ratio-Squared Stretch

## Claim

The infinite-order word

\[
W=(PHR)^2
\]

does not mix the two canonical handles. After reordering the carrier basis from

\[
(p_1,p_2,q_1,q_2)
\quad\text{to}\quad
(p_1,q_1,p_2,q_2),
\]

it becomes

\[
W\cong
\begin{pmatrix}
1&-1\\-1&2
\end{pmatrix}
\oplus
\begin{pmatrix}
0&1\\-1&3
\end{pmatrix}.
\]

Each block lies in \(SL(2,\mathbb Z)\), has trace three, and has characteristic polynomial \(x^2-3x+1\). The stretch factor is

\[
\lambda_+=\frac{3+\sqrt5}{2}=\varphi^2.
\]

Thus the word is a doubled one-handle hyperbolic response, not yet a mutually coupled genus-two mechanism.

## 1. Exact handle decomposition

In the original canonical order,

\[
W=
\begin{pmatrix}
1&0&-1&0\\
0&0&0&1\\
-1&0&2&0\\
0&-1&0&3
\end{pmatrix}.
\]

The first and third coordinates form one invariant symplectic plane; the second and fourth form the other. Consequently, both stable and unstable dynamics preserve the same handle splitting selected earlier by the sewn carrier.

This explains why the characteristic polynomial is a square:

\[
\chi_W(x)=(x^2-3x+1)^2.
\]

## 2. Stable and unstable Lagrangians

Let \(\lambda\) be either root. Two eigenvectors are

\[
v_1(\lambda)=(1,0,1-\lambda,0),
\qquad
v_2(\lambda)=(0,1,0,\lambda).
\]

For \(\lambda_+=\varphi^2\), they span the unstable plane \(E_+\); for \(\lambda_-=\varphi^{-2}\), they span the stable plane \(E_-\). With the canonical symplectic pairing,

\[
\omega|_{E_+}=0,
\qquad
\omega|_{E_-}=0.
\]

Both are two-dimensional, hence Lagrangian. Their cross-pairings are nondegenerate:

\[
\omega(v_1^+,v_1^-)=\sqrt5,
\qquad
\omega(v_2^+,v_2^-)=-\sqrt5.
\]

The hyperbolic carrier therefore has the standard stable/unstable Lagrangian polarization expected of a symplectic transfer problem.

## 3. Mapping-class interpretation and its boundary

Each \(SL(2,\mathbb Z)\) block is a torus Anosov action. Their direct sum admits an obvious reducible genus-two lift: apply one torus mapping class on each handle, separated by the reducing curve.

This does **not** prove that every genus-two mapping-class lift of the same homology matrix is reducible. Multiplication by a Torelli element leaves homology unchanged and can alter Nielsen–Thurston type. Conversely, a hyperbolic homology matrix alone does not certify a pseudo-Anosov mapping class.

The licensed conclusion is narrower and more useful:

\[
\boxed{\text{the certified carrier word itself requires no mutual-handle gate}.}
\]

That mirrors the earlier result that the order-three carrier color action is one-handle local.

## 4. Physical interpretation

The golden-ratio-squared factor should not be treated as a predicted physical constant. It is the algebraic stretch of one short word in the selected integral generator set. Its significance is structural:

- compact finite-order inputs can produce noncompact transfer dynamics;
- the resulting stable and unstable variables are relational Lagrangian coordinates;
- the present word still factorizes by handle; and
- a genuinely joint genus-two interaction requires a mutual transvection, off-diagonal response, or Torelli-level operation not visible in this homology word.

## 5. Next fork

Two paths are now cleanly separated.

1. **Independent-handle response:** derive the two trace-three blocks from separate sewn boundary transfer problems and use the handle exchange only to equate their symplectic normalization.
2. **Genuine relational coupling:** insert the already known mutual sum-cycle transvection and classify the shortest hyperbolic words whose characteristic polynomial is irreducible over \(\mathbb Q\).

An irreducible reciprocal quartic would be evidence that the homology action itself no longer preserves a rational handle splitting. It would still not, by itself, prove a pseudo-Anosov lift.

## 6. Executable certificate

```powershell
node verification/analyze/analyze_hyperbolic_selector_word_as_two_reducible_trace_three_handle_maps.mjs
```

The certificate verifies block decomposition, determinant, trace, golden-ratio spectrum, Lagrangian eigenspaces and the absence of mutual-handle mixing.

## Companion documents

- [The carrier color action is one-handle local](765_the_carrier_color_unipotent_is_exactly_a_one_handle_inverse_twist_fourier_word_not_a_microscopic_color_permutation_or_mutual_gate.md)
- [The combined selectors contain a hyperbolic infinite-order word](771_the_three_carrier_selectors_generate_a_hyperbolic_infinite_order_word_so_no_positive_unitary_matter_intertwiner_can_realize_them_all.md)
