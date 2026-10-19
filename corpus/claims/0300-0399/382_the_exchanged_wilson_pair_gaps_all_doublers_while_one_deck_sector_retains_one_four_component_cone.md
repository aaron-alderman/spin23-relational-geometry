# The Exchanged Wilson Pair Gaps All Doublers While One Deck Sector Retains One Four-Component Cone

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact translation-invariant bulk spectrum and glide-sector species count; textured relative topology remains open

## 1. The first spectral gate

The eight-component Wilson repair is acceptable only if its auxiliary
\(\tau\) factor does not survive as an independent low-energy mirror carrier in
the quotient. This can be tested exactly on the translation-invariant bulk
symbol before returning to the defect texture.

Define

\[
H_W(\mathbf k)
=\sin k_x\,\widetilde\alpha_x
+\sin k_y\,\widetilde\alpha_y
+rW(\mathbf k)M_W,
\]

where

\[
W(\mathbf k)=2-\cos k_x-\cos k_y,
\]

\[
\widetilde\alpha_i=\alpha_i\otimes I,qquad
M_W=(\sigma_z\otimes I)\otimes\tau_z.
\]

All three matrices anticommute and square to one.

## 2. Exact dispersion

The Clifford relations give

\[
H_W(\mathbf k)^2
=\left[
\sin^2k_x+\sin^2k_y+r^2W(\mathbf k)^2
\right]I_8.
\]

Thus

\[
E(\mathbf k)^2
=\sin^2k_x+\sin^2k_y
+r^2(2-\cos k_x-\cos k_y)^2.
\]

For (r\ne0), a zero requires both sine terms and (W) to vanish. Among the
four naive Dirac points,

\[
\begin{array}{c|c|c}
\mathbf k&W(\mathbf k)&\text{gap magnitude}\\ \hline
(0,0)&0&0\\
(\pi,0)&2&2|r|\\
(0,\pi)&2&2|r|\\
(\pi,\pi)&4&4|r|
\end{array}
\]

Only the intended low-momentum cone remains.

## 3. Glide-sector count at the surviving cone

At the glide-invariant point (mathbf k=0), the internal part of the extended
deck lift is

\[
\widetilde S=\alpha_x\otimes\tau_x,
\qquad \widetilde S^2=1.
\]

It is traceless on the eight-component oriented-double fiber. Therefore

\[
\dim\ker(\widetilde S-1)
=\dim\ker(\widetilde S+1)=4.
\]

Either physical deck sector contains one four-component low-energy cone. The
two \(\tau_z\) regulator signs are related by the deck constraint and do not
appear as two independent quotient cones.

This clears the first mirror-counting gate:

\[
\boxed{
8\text{ components on the oriented double}
\longrightarrow
4\text{ components in one quotient deck sector}.}
\]

## 4. What happens at the other glide-invariant momenta

At (k_y=0) or (pi), reflection leaves momentum invariant and the glide can
be diagonalized. The half-translation contributes a momentum phase, possibly
interchanging the names of the (+) and (-) sectors when (L) is odd, but it
does not change their equal dimension or the Wilson gaps.

At generic (k_y), the glide relates (k_y) to (-k_y). Quotient states are
formed from that momentum pair. No additional zero can appear because the
exact squared dispersion is strictly positive away from (mathbf k=0).

## 5. Class-D and glide compatibility

The bulk symbol obeys

\[
C H_W(\mathbf k)C^{-1}=-H_W(-\mathbf k),
\qquad C=(\alpha_x\otimes I)K,
\]

and

\[
\widetilde S H_W(k_x,-k_y)\widetilde S^{-1}
=H_W(k_x,k_y).
\]

The Wilson gap therefore does not purchase species removal by breaking the two
symmetries needed by the Pin quotient.

## 6. Limits of the result

This bulk calculation proves:

- all naive doubler momenta except the target cone are gapped;
- each deck sector has one four-component cone at low momentum;
- the regulator pair is not an independent mirror doubling at that cone.

It does not yet prove:

- a nontrivial defect/reference relative Pfaffian;
- localization of a Majorana pair;
- absence of texture-induced low-energy bands near the open boundary;
- equivalence to a Furey neutral physical module.

Those require the regulated real-space glide lattice.

## 7. Interpretation

The result makes the “Russian dolls” intuition precise in one narrow sense.
The larger oriented-double carrier is not automatically more physical content:
the deck constraint selects a smaller quotient module. Here the additional
factor exists to make UV regularization compatible with the relational sewing,
not to introduce another generation.

This is an example of a legitimate nested extension because the larger module
solves a named obstruction and the quotient degree count is explicit.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the regulated textured lattice retains this single
quotient cone and yields a robust negative defect/reference relative Pfaffian
with defect/boundary localization.

**Species falsifier:** a second independent four-component cone survives in
one deck sector.

**Doubler falsifier:** any of ((\pi,0),(0,\pi),(\pi,\pi)) remains gapless for
nonzero (r).

**Symmetry falsifier:** the projected regulator loses exact glide or class-D
reality.

**Continuum falsifier:** texture or boundary bands close the bulk gap over the
parameter range used for the claimed invariant.

## 9. Next calculation

Insert the exchanged Wilson term into the real-space double-cylinder matrix.
Construct an explicit real Majorana basis common to reference and defect
textures, project to one glide sector, and compute relative Pfaffians. Then
repeat over sizes and Wilson parameters while localizing the lowest pair.

## 10. Certificate

The [exchanged Wilson-pair spectrum certificate](../../../verification/verify/verify_exchanged_wilson_pair_bulk_spectrum_and_quotient_count.mjs)
checks the Clifford square, all four naive Dirac points, uniqueness of the
surviving cone, exact class-D/glide relations and the four-dimensional deck
eigenspaces.

## Companion documents

- [Glide Wilson-mass obstruction and repair](381_the_glide_forbids_a_constant_four_component_wilson_mass_but_an_exchanged_regulator_pair_repairs_it.md)
- [Glide-covariant Pin double cylinder](380_an_exact_glide_covariant_double_cylinder_realizes_the_pin_domain_architecture.md)
- [Finite Majorana nullity gate](379_a_finite_majorana_lattice_has_even_total_nullity_so_pin_defect_parity_must_be_relative_or_local.md)
