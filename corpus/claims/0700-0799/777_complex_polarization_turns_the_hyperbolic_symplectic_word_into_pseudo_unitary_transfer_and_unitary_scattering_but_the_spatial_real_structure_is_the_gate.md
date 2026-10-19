# Complex Polarization Turns the Hyperbolic Symplectic Word into Pseudo-Unitary Transfer and Unitary Scattering, but the Spatial Real Structure Is the Gate

## Claim

The fully hyperbolic real symplectic word \(N=(UPHR)^2\) admits an exact complex polarization into a Bogoliubov transfer matrix

\[
\mathcal T=
\begin{pmatrix}
\alpha&\beta\\
\bar\beta&\bar\alpha
\end{pmatrix}
\]

that preserves the flux metric

\[
\Sigma=\operatorname{diag}(I_2,-I_2).
\]

With the transfer convention

\[
\binom{\mathrm{out}_R}{\mathrm{in}_R}
=\mathcal T
\binom{\mathrm{in}_L}{\mathrm{out}_L},
\]

the associated four-channel scattering matrix is exactly unitary.

This proves mathematical compatibility with passive flux-conserving scattering. It does **not** prove that the Standard Model/Furey carrier supplies the necessary spatial real structure. Under a temporal Nambu interpretation, the same nonzero \(\beta\) block is active pair conversion.

## 1. Complex polarization

Write the real symplectic matrix in \(2\times2\) blocks,

\[
N=\begin{pmatrix}A&B\\C&D\end{pmatrix},
\]

and introduce

\[
a=\frac{q+ip}{\sqrt2}.
\]

Then

\[
\alpha=\frac12\left(A+D+i(C-B)\right),
\]

\[
\beta=\frac12\left(A-D+i(C+B)\right).
\]

Symplecticity is equivalent to the Bogoliubov identities

\[
\alpha\alpha^\dagger-\beta\beta^\dagger=I,
\qquad
\alpha\beta^T=\beta\alpha^T.
\]

The executable certificate verifies both identities directly for the integral word.

The resulting \(\beta\) is nonzero, with

\[
\|\beta\|_F^2=6.
\]

Thus the transformation is not passive in the positive-metric temporal Gaussian sense, in agreement with document 776.

## 2. Pseudo-unitary transfer

The doubled complex matrix obeys

\[
\mathcal T^\dagger\Sigma\mathcal T=\Sigma.
\]

This is the appropriate conservation law for a transfer matrix whose first block carries right-moving positive flux and whose second block carries left-moving negative-oriented flux. Expansion of an amplitude coordinate is compensated by reciprocal contraction so that net flux is conserved.

Pseudo-unitarity is therefore the exact mathematical structure behind the earlier claim that hyperbolic transfer can be passive even though Euclidean amplitude norm grows.

## 3. Transfer-to-scattering conversion

Writing

\[
\mathcal T=\begin{pmatrix}a&b\\c&d\end{pmatrix}
\]

and assuming \(d\) is invertible, solve the transfer relation for the outgoing amplitudes. The scattering matrix is

\[
\mathcal S=
\begin{pmatrix}
-d^{-1}c&d^{-1}\\
a-bd^{-1}c&bd^{-1}
\end{pmatrix}.
\]

For the selected word,

\[
\mathcal S^\dagger\mathcal S=I_4
\]

to numerical precision. Thus there is no gain or loss in the associated flux scattering problem.

## 4. The remaining real-structure gate

The same algebra has two inequivalent physical readings.

### Temporal/Nambu reading

The lower half represents creation amplitudes \(a^\dagger\). Nonzero \(\beta\) mixes annihilation and creation operators. The transformation is an active Gaussian operation requiring squeezing or a pumped background.

### Spatial-transfer reading

The lower half represents waves propagating in the opposite spatial direction. Nonzero \(\beta\) is ordinary reflection. The scattering matrix is unitary and the system may be passive.

Mathematics alone does not choose between these readings. The Furey/sewn-response construction must provide an involution and boundary orientation identifying

\[
\bar a\quad\text{with either}\quad a^\dagger
\quad\text{or}\quad a_{\rm opposite\ direction}.
\]

That choice is now the exact passivity gate.

## 5. Connection to the programme

This result supplies a viable route around the positive-unitary matter no-go:

\[
\text{compact microscopic matter}
\longrightarrow
\text{sewn boundary polarization}
\longrightarrow
\mathcal T\in U(2,2)\text{-type flux transfer}
\longrightarrow
\mathcal S\text{ unitary}
\]

while the real four-carrier still transforms through \(Sp(4,\mathbb R)\) and its primitive two-forms through \(SO(2,3)\).

The route becomes physical only if the boundary channels, involution and frequency dependence arise from a causal positive-real or Herglotz response. A formal complex polarization is necessary evidence, not sufficient construction.

## 6. Stop conditions

- Do not call pseudo-unitary transfer ordinary unitary time evolution.
- Do not interpret \(\bar a\) as a counterpropagating channel without a source-derived spatial orientation.
- Do not interpret it as a creation operator while calling the operation passive.
- Do not infer causality from a single frequency-independent matrix.
- Pin passive realization if no analytic positive-real response can produce this transfer checkpoint on the physical contour.

## 7. Executable certificate

```powershell
node verification/convert/convert_fully_hyperbolic_symplectic_word_to_bogoliubov_transfer_and_unitary_scattering.mjs
```

The certificate computes \(\alpha,\beta\), verifies the Bogoliubov identities and pseudo-unitarity, converts transfer to scattering variables, and verifies exact numerical unitarity.

## Companion documents

- [Active canonical step versus passive transfer](776_the_fully_hyperbolic_selector_requires_active_squeezing_as_a_canonical_step_but_can_still_be_a_passive_flux_transfer_matrix.md)
- [Furey complex conjugation and the Nambu/neutral-exchange boundary](../0100-0199/166_furey_complex_conjugation_repairs_nambu_but_not_neutral_exchange.md)
