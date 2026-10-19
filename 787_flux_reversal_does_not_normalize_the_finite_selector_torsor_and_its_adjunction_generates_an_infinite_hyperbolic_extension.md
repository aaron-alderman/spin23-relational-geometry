# Flux Reversal Does Not Normalize the Finite Selector Torsor, and Its Adjunction Generates an Infinite Hyperbolic Extension

## Claim

Let

\[
G_{RH}=\langle R,H\rangle\cong C_3\times S_3
\]

be the finite symplectic selector group, and let

\[
\kappa(q,p)=(q,-p)
\]

be the anti-symplectic flux-reversal real structure.

Although \(\kappa\) commutes with handle exchange, it does not normalize the oriented-color generator into \(G_{RH}\). Adjoining it produces an infinite group. The short even-parity word

\[
W=(\kappa R)^2
\]

already contains a trace-three hyperbolic handle block.

Therefore flux reversal cannot be used to quotient the eighteen-point background torsor into nine unoriented pairs. It must remain a fiber antiunitary real structure over the finite base. Treating it as another background generator creates an infinite checkpoint orbit.

## 1. Normalizer test

The real carrier matrices satisfy

\[
\kappa^2=1,
\qquad
\kappa H\kappa=H.
\]

But exhaustive membership testing gives

\[
\kappa R\kappa\notin G_{RH}.
\]

Thus \(\kappa\) does not define an automorphism of the finite \(C_3\times S_3\) selector group.

This rules out the simplest signed semidirect-product extension of order 36.

## 2. Hyperbolic infinite-order witness

Direct multiplication gives

\[
W=(\kappa R)^2=
\begin{pmatrix}
1&0&0&0\\
0&1&0&-1\\
0&0&1&0\\
0&-1&0&2
\end{pmatrix}.
\]

After reordering into handle coordinates \((p_1,q_1,p_2,q_2)\),

\[
W=I_2\oplus
\begin{pmatrix}
1&-1\\-1&2
\end{pmatrix}.
\]

The second block has characteristic polynomial

\[
x^2-3x+1
\]

and eigenvalues \((3\pm\sqrt5)/2\). Hence \(W\) has infinite order. Exact enumeration of \(\langle R,H,\kappa\rangle\) exceeds ten thousand distinct matrices immediately, consistent with the analytic witness.

## 3. The checkpoint orbit is also infinite

It is not enough that the enlarged group is infinite; conceivably the chosen checkpoint could have a finite orbit. It does not.

In handle order, write

\[
W=I_2\oplus M.
\]

The fully hyperbolic checkpoint has a nonzero off-diagonal block from the first handle into the second, containing the row vector \((0,1)\). If \(W^k\) commuted with the checkpoint, block commutation would require

\[
(0,1)M^k=(0,1).
\]

But no nonzero power of \(M\) has eigenvalue one. Therefore

\[
[W^k,N]\ne0
\qquad(k\ne0),
\]

and all conjugates

\[
W^kNW^{-k}
\]

are distinct.

The certificate explicitly checks the first sixteen exact conjugates in addition to the general eigenvalue argument.

## 4. Correct base-versus-fiber architecture

The results force a categorical separation:

### Base transformations

\[
G_{RH}\cong C_3\times S_3
\]

acts on the finite eighteen-point background torsor.

### Fiber real structure

\[
\Theta_{\rm flux}=\sigma_xK
\]

relates positive and negative flux orientations within the complex-polarized response over each background. It is a reality condition, not another motion on the background base.

This is analogous to the separation between a complex vector bundle's base symmetry and its conjugate-linear fiber involution. Combining them into one ordinary discrete group erases the distinction and generates the observed noncompact dynamics.

## 5. Relation to earlier hyperbolicity

The infinite extension is not an unrelated accident. Earlier, finite-order carrier selectors also generated hyperbolic words when combined. The present result identifies the minimal source of that behavior: composing oriented color with flux reversal already yields a one-handle cat-map block.

This strengthens the interpretation that noncompact \(Sp(4)\) dynamics emerges from compositions of finite/disconnected relational operations, while no single compact matter representation carries the complete action.

## 6. Stop conditions

- Do not quotient the eighteen backgrounds by flux reversal as if it normalized the base group.
- Do not report a finite order-36 signed selector group.
- Do not count the infinite conjugates as new vacua without a dynamical energy functional.
- Keep antiunitary reality in the fiber unless a controlled continuous moduli-space interpretation is supplied.
- Pin any finite unoriented-background claim based solely on \(\kappa\).

## 7. Executable certificate

```powershell
node scripts/prove_flux_reversal_does_not_normalize_the_finite_selector_orbit_and_generates_an_infinite_extension.mjs
```

The certificate verifies the failed normalizer condition, constructs the hyperbolic word, classifies its block, enumerates the growing extension and proves the checkpoint conjugation orbit is infinite.

## Companion documents

- [The finite eighteen-background selector torsor](786_oriented_color_and_handle_exchange_generate_c3_times_s3_and_the_hyperbolic_checkpoint_has_a_regular_18_background_spurion_orbit.md)
- [Furey survivor exchange as flux reversal](778_the_furey_survivor_exchange_has_exactly_the_spatial_flux_reversal_real_structure_but_preserves_the_sewn_meridian_plane.md)
- [The selector group contains hyperbolic words](771_the_three_carrier_selectors_generate_a_hyperbolic_infinite_order_word_so_no_positive_unitary_matter_intertwiner_can_realize_them_all.md)
