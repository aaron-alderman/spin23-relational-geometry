# Scalar Dressing Forces Coherent Relational Residue Channels and Cannot Supply Nontrivial Coordinate-Local Furey Residues

## Claim

For the scalar rational-inner embedding

\[
S(z)=f(z)S_0,
\]

the Cayley-Herglotz response is a rational function of the fixed checkpoint matrix:

\[
H(z)=i(I+f(z)S_0)(I-f(z)S_0)^{-1}.
\]

Consequently,

\[
[H(z),S_0]=0
\]

at every frequency, and every pole residue lies in the commutant of \(S_0\).

In the declared scattering-channel basis, every off-diagonal entry of \(S_0\) is nonzero. Its diagonal commutant is therefore only the scalar identity. No nontrivial coordinate-local handle, side or singleton projector commutes with it.

Thus the scalar dressing cannot supply separate field-local Furey residues. Its spectral channels are necessarily coherent relational combinations, unless the frequency dependence is promoted from a common scalar factor to a genuinely matrix-valued inner function.

## 1. Coordinate-support theorem

Let

\[
D=\operatorname{diag}(d_1,d_2,d_3,d_4).
\]

Then

\[
[D,S_0]_{ij}=(d_i-d_j)(S_0)_{ij}.
\]

Since

\[
(S_0)_{ij}\ne0
\qquad(i\ne j),
\]

commutation requires

\[
d_1=d_2=d_3=d_4.
\]

Therefore

\[
\{D\text{ diagonal}:[D,S_0]=0\}=\mathbb C I_4.
\]

Exhausting all sixteen binary diagonal projectors leaves only

\[
0,qquad I_4.
\]

In particular, none of the following commutes with the checkpoint:

- the first-handle projector;
- the second-handle projector;
- the left-boundary block projector;
- the right-boundary block projector; or
- any single-coordinate field projector.

## 2. Residue implication

If

\[
H(z)=r_z(S_0)
\]

for a scalar rational function \(r_z\), then its Laurent coefficients at every pole are also functions of \(S_0\). Hence each residue commutes with \(S_0\).

A residue of the form

\[
R_j=r_j|e_k\rangle\langle e_k|
\]

or a diagonal sum restricted to a proper coordinate subset cannot occur in this scalar-dressed model. The response eigenchannels are delocalized across the coordinate graph.

This is consistent with the irreducible rational coupling of the underlying carrier word: the causal interpolation inherits relational rather than handle-factorized channels.

## 3. Consequence for Furey typing

There are now two viable branches.

### Coherent support map

The physical \(u,d,e,\nu\) or survivor response vectors may map to non-diagonal coherent combinations in the scattering basis. Then typed residues can coincide with spectral projectors after a source-derived unitary or isometric support map.

### Matrix-valued frequency dependence

Replace \(f(z)S_0\) by a genuine matrix inner function with different pole factors on different support subspaces. Such factors need not commute with \(S_0\), allowing field-local residues while retaining the checkpoint at \(\omega_0\).

The first route preserves the elegant scalar construction but demands a nontrivial matter-to-response intertwiner. The second introduces more analytic freedom and weakens predictivity unless its Potapov factors are selected by source data.

## 4. What is not ruled out

The no-go is basis-typed. It excludes residue supports local to the current coordinate channels, not every possible Furey support realization. A non-diagonal source map could make a coherent spectral channel physically local in a different microscopic basis.

Nor does it exclude the identity residue, which is coordinate-uniform. Such a residue cannot distinguish the four matter sectors and therefore does not solve the typed-threshold problem.

## 5. Stop conditions

- Do not label scalar-dressed spectral projectors as \(u,d,e,\nu\) without constructing their support map.
- Do not call a uniform identity residue a field-resolved prediction.
- Do not retain scalar frequency dependence if the source requires coordinate-local distinct thresholds.
- Pin the scalar typed-residue branch if no gauge-compatible coherent support intertwiner exists.

## 6. Executable certificate

```powershell
node verification/prove/prove_scalar_dressing_residues_cannot_be_nontrivial_coordinate_local_for_the_selected_scattering_matrix.mjs
```

The certificate checks every off-diagonal matrix element, enumerates all coordinate projectors, computes named commutator norms and proves the diagonal commutant is one-dimensional.

## Companion documents

- [One-point spectral non-identifiability](782_one_scattering_checkpoint_cannot_identify_furey_thresholds_or_positive_residues_when_hermitian_contact_terms_are_free.md)
- [The rational-inner scalar embedding](780_the_selected_unitary_scattering_checkpoint_embeds_in_a_reciprocal_rational_inner_response_with_positive_real_cayley_impedance.md)
- [The irreducible fully hyperbolic carrier word](774_the_shortest_fully_hyperbolic_coupled_word_has_an_irreducible_quartic_and_a_one_plus_two_reciprocal_pair_spin23_spectrum.md)
