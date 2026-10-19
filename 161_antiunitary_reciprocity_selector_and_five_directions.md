# Antiunitary Reciprocity Selects (Spin(2,3)) and Identifies the Five Broken Directions

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact carrier and conformal-generator decomposition; derivation of the selector from the microscopic action remains open

## 1. Carrier-level antiunitary selector

Write a general Hermitian two-port carrier as

\[
X=tI+xσ_x+yσ_y+zσ_z
=
\begin{pmatrix}
t+z&x-iy\\
x+iy&t-z
\end{pmatrix}.
\]

Entrywise complex conjugation acts as

\[
κ(X)=\overline X
=tI+xσ_x-yσ_y+zσ_z.
\]

Therefore

\[
\operatorname{Fix}(κ)
=
\{X:y=0\}
=H_2(\mathbb R).
\]

The odd space is the single real carrier direction

\[
\mathbb Rσ_y.
\]

This is an explicit antiunitary form of the real-slice selector.

## 2. Determinant descent

The parent determinant is

\[
\det X=t^2-x^2-y^2-z^2,
\]

with Lorentz signature ((1,3)). On the fixed slice,

\[
\det X_{κ}=t^2-x^2-z^2,
\]

with signature ((1,2)).

Thus the same involution gives

\[
H_2(\mathbb C)
\longrightarrow
H_2(\mathbb R),
\]

and

\[
Spin_0(2,4)
\longrightarrow
Spin_0(2,3).
\]

## 3. Response-level reciprocity

For the causal tube response, reciprocity is transpose symmetry:

\[
τ(Z)=Z^T.
\]

Decompose

\[
Z=Z_++Z_-,
\]

where

\[
Z_+=\frac{Z+Z^T}{2},
\qquad
Z_-=\frac{Z-Z^T}{2}.
\]

Then (Z_+) is complex symmetric and (Z_-) is a one-complex-dimensional antisymmetric orientation coordinate.

If the Hermitian imaginary part of (Z) is positive, the entrywise imaginary part of (Z_+) is

\[
\operatorname{Im}_{\rm entry}Z_+
=\operatorname{Re}\operatorname{Im}_{\rm Herm}Z>0.
\]

Hence reciprocal projection maps the parent causal tube into the Siegel upper half-space.

But projection is lossy:

\[
Z_+
\not\Rightarrow
Z.
\]

Exact reconstruction requires retaining the odd coordinate (Z_-) somewhere.

## 4. The five broken conformal directions

The conformal algebra of (H_2(\mathbb C)) has the three-grading

\[
\mathfrak{su}(2,2)
=J_-
\oplus
\mathfrak{str}(J)
\oplus
J_+,
\]

with dimensions

\[
4+7+4=15.
\]

For (H_2(\mathbb R)),

\[
\mathfrak{sp}(4,\mathbb R)
=J^{κ}_-
\oplus
\mathfrak{str}(J^{κ})
\oplus
J^{κ}_+,
\]

with

\[
3+4+3=10.
\]

The five removed directions are therefore exactly:

1. one translation along the forbidden (σ_y) carrier coordinate;
2. three Lorentz/structure generators mixing (σ_y) with the three retained carrier coordinates;
3. one special conformal generator along (σ_y).

Thus

\[
5=1+3+1.
\]

This is the explicit generator content of the previously abstract (15=10+5) split.

## 5. External reciprocity, internal orientation

The selector cannot be imposed indiscriminately on the full Standard-Model data. Complex flavor matrices carry nonzero CKM/PMNS-type phases, and the earlier spectral analysis showed that a universal real slice is generically obstructed.

The viable factorized architecture is

\[
H_2(\mathbb R)_{\rm external}
\otimes_{\mathbb R}
\operatorname{Herm}_3(\mathbb C)_{\rm flavor/Fock}.
\]

Antiunitary reciprocity acts on the external two-port factor. The oriented remainder, flavor CP data and particle/antiparticle structure remain in the internal factor.

This is not automatic. A tensor-product action must be defined so that:

- the external response stays transpose symmetric;
- internal complex phases remain physical;
- gauge covariance is preserved;
- the complete theory is unitary and anomaly correct;
- orientation does not radiatively leak back into the forbidden external coordinate.

## 6. Relation to Furey dagger

Furey's natural dagger reverses directed internal block maps. The external reciprocity involution instead fixes a two-port response real form. They should not be identified without an explicit tensor antiunitary.

A candidate combined operation has schematic form

\[
Θ=κ_{\rm external}\otimes Θ_{\rm internal},
\]

where (Θ_{\rm internal}) implements charge conjugation or adjoint pairing without fixing all flavor matrices to be real.

The construction must distinguish adjoint operators from independent mirrors, as established previously.

## 7. Stop-everything and falsification gates

**Selector derivation:** the walk/Furey action possesses a canonical antiunitary (Θ) whose external fixed response is exactly (H_2(\mathbb R)) and whose internal action preserves the selected chiral TRO.

**Radiative stability:** gauge and Yukawa corrections cannot generate the external (σ_y) response coordinate when (Θ) is unbroken.

**Controlled breaking:** observed CP violation breaks only (Θ_{\rm internal}) or a commuting flavor symmetry, not the external reciprocity condition.

**Parent restoration:** any physical oriented phase necessarily sources external (Z_-), restoring (Spin(2,4)).

**No-go:** no antiunitary can preserve the Furey chiral sector and the external real slice simultaneously without forcing flavor CP to vanish.

## 8. Certificate

The [antiunitary reciprocity certificate](scripts/verify_antiunitary_reciprocity_selector.mjs) verifies the (σ_y) flip, fixed (H_2(\mathbb R)) carrier, determinant descent, positivity of reciprocal tube projection, exact reconstruction with the odd coordinate and the (1+3+1=5) conformal-direction count.

## Companion documents

- [Orientation-complete response and the (Spin(2,4)) parent](160_orientation_complete_response_restores_spin24_parent.md)
- [Real carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
- [Why dagger is not a chiral projector](75_dagger_does_not_select_chirality.md)
- [Dagger closure: antiparticles versus mirrors](151_dagger_antiparticle_vs_mirror_distinction.md)
