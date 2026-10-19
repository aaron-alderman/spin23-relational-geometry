# The Signed Class-D Localizer Does Not Descend, but a Radial Pin Localizer Survives the Boundary Test

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09 and B11  
**Claim status:** exact descent obstruction plus boundary-stable numerical candidate; real-K-theory identification remains open

## 1. The theorem-backed starting point

For a one-dimensional class-D Hamiltonian written in a Majorana basis, the
reduced spectral-localizer marker is

\[
z_{2,x}=\operatorname{sign}\det\!\left[
\kappa(X-xI)-iH
\right].
\]

The corresponding localizer gap is the smallest singular value of the reduced
block; it controls stability under perturbations smaller than that gap. This is
the class-D specialization used in the recent real-space dimensional-crossover
analysis, while the systematic real-index theory identifies the relevant
\(\mathbb Z_2\) values with Pfaffian or determinant signs of skew localizers.
See the primary [class-D localizer construction](https://doi.org/10.1038/s42005-025-02382-w)
and [skew-localizer real-index theorem](https://arxiv.org/abs/2101.09226).

Our Majorana Hamiltonian has \(H_M=iA\), so the reduced block becomes the real
matrix

\[
B_{x,\kappa}=\kappa(X-xI)+A.
\]

## 2. Exact obstruction on the Pin quotient

The signed transverse coordinate obeys

\[
U_gYU_g^{-1}=-Y
\]

under the glide. If \(Q_+\) is a basis for one real glide sector, then

\[
\boxed{Q_+^TYQ_+=0}
\]

to machine precision in the finite construction.

This is not a numerical accident. An operator odd under an involution has zero
compression to either eigenspace of that involution. Consequently the ordinary
signed-coordinate class-D localizer does not descend to one deck sector.

On the full oriented double, the two deck-related markers pair and every tested
signed-coordinate determinant has positive sign. The ordinary formula therefore
forgets precisely the quotient information we need.

## 3. The glide-even radial replacement

The unsigned distance

\[
R=|Y|
\]

is glide even and has a nonzero sector compression. This motivates the reduced
radial matrix

\[
B^{\rm rad}_{r,\kappa}
=A_++\kappa\bigl(Q_+^TRQ_+-rI\bigr).
\]

Define the candidate marker

\[
\zeta_{\rm rad}(r,\kappa)
=\operatorname{sign}\det B^{\rm rad}_{r,\kappa}.
\]

At \(r=1/2\), \(\delta=1.25\), and \(\kappa=0.1,0.2,0.3\), the tested systems
give

\[
\zeta_{\rm rad}^{\rm ref}=+1,
\qquad
\zeta_{\rm rad}^{\rm def}=-1.
\]

The result persists for both zero edge mass and the remote perturbation
\(b=0.3\), at \(L=2,M=2\) and \(L=4,M=2\).

## 4. The localizer gap survives the remote-boundary test

For \(L=4,M=2\), \(r=1/2\), and \(\kappa=0.2\):

| boundary mass | reference sign | defect sign | reference gap | defect gap |
|---:|---:|---:|---:|---:|
| 0 | +1 | -1 | 0.2121 | 0.0380 |
| 0.3 | +1 | -1 | 0.2491 | 0.0371 |

The remote edge intervention that flipped the global relative Pfaffian leaves
both the radial sign and the defect localizer gap essentially unchanged.

This is the first candidate diagnostic in this branch to pass the explicit
boundary-locality test.

## 5. Why this is not yet a theorem

The standard one-dimensional construction uses an oriented coordinate that
represents the Dirac/Fredholm-module direction. The function \(|Y|\) is a
quotient-defined radial coordinate with a fold at the defect row. Its
determinant sign is mathematically well defined and homotopy-stable while its
gap stays open, but we have not yet shown that it computes the desired real
K-theory pairing for the nonorientable Pin quotient.

Three interpretations remain open:

1. it is the correct half-line or radial real-index pairing;
2. it is a useful but nonuniversal finite local obstruction;
3. it requires a doubled/twisted Clifford generator carrying the missing
   orientation line before it becomes a true quotient invariant.

Calling it the class-D defect invariant now would outrun the proof.

## 6. The likely mathematical repair

The vanishing of \(Q_+^TYQ_+\) says that the missing object is not another scalar
coordinate. It is a twisted coordinate valued in the orientation line. On the
oriented double this should have the schematic form

\[
Y\otimes J_{\rm or},
\]

where \(J_{\rm or}\) is also glide odd, making the product glide even. The
operator must additionally respect Majorana reality and supply the correct real
Clifford generator.

This connects directly to the programme's repeated distinction between a
carrier and an oriented relationship: the coordinate alone is deck odd, while
the relationship factor may make the combined observable descend.

## 7. Consequence for the causal checkpoint

Unlike the global open-strip relative Pfaffian, the radial candidate classifies
the defect as nontrivial at \(\delta=1.25\) for both tested edge masses. This
restores boundary-stable compatibility at the level of a candidate local
obstruction.

It does **not** restore a prediction. The result depends on the chosen radial
center and localizer scale, and its real-index meaning has not been proved.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** construct the glide-odd real Clifford factor
\(J_{\rm or}\), prove the resulting skew localizer represents the appropriate
real K-pairing, and recover the same sign as the radial candidate with a
nonvanishing stable gap.

**Descent falsifier:** use the ordinary signed coordinate within one deck sector
despite its exactly vanishing compression.

**Doubling falsifier:** call the positive oriented-double determinant evidence
of trivial defect topology without accounting for deck pairing.

**Radial falsifier:** call \(\zeta_{\rm rad}\) a universal topological invariant
before proving independence from admissible radial functions, centers and
\(\kappa\) paths that preserve the localizer gap.

**Locality falsifier:** the radial sign or gap changes under a remote boundary
perturbation smaller than its certified localizer gap.

## 9. Pinned dependency and continuation

Pin the K-theory interpretation of the radial sign. Continue along two parallel
paths:

1. enumerate glide-odd, Majorana-compatible internal matrices that can serve as
   the orientation-line Clifford factor;
2. map the radial marker and gap over \((r,\kappa,\delta)\) to distinguish a
   stable region from a tuned point.

## 10. Certificate and exploration

The [radial-localizer certificate](../../../verification/verify/verify_pin_radial_class_d_localizer_candidate.mjs)
checks the signed-coordinate descent obstruction, oriented-double pairing,
radial sign, nonzero gaps and remote-boundary stability.

The [localizer exploration script](../../../verification/explore/explore_class_d_oriented_double_localizer.mjs)
implements the determinant signs and optional reduced-localizer gaps.

## Companion documents

- [Remote edge-mass locality test](395_a_remote_edge_mass_moves_the_reference_root_fourteen_times_more_than_the_defect_root.md)
- [Circumference scaling and reference contamination](394_circumference_scaling_preserves_the_defect_root_but_exposes_reference_boundary_contamination.md)
- [Finite Majorana partner accounting](379_a_finite_majorana_lattice_has_even_total_nullity_so_pin_defect_parity_must_be_relative_or_local.md)
