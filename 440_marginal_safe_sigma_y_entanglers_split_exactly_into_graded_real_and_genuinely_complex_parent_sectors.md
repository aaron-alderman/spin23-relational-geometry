# Marginal-Safe \(\sigma_y\) Entanglers Split Exactly into Graded-Real and Genuinely Complex Parent Sectors

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B06, B08 and B11  
**Claim status:** exact linear and positivity classification for the lowest face-odd entanglers; dynamical coefficients remain open

## 1. The active interacting leakage channel

On

\[
\mathbb C^2_{\rm face}\otimes\mathbb C^3_{\rm flavor},
\]

the lowest operator capable of leaving the factor-local real-face algebra is

\[
\delta R_y=\sigma_y\otimes F,
\qquad F=F^\dagger.
\]

Its flavor partial trace is

\[
\operatorname{Tr}_{\rm flavor}\delta R_y
=\sigma_y\operatorname{Tr}F.
\]

Therefore it preserves an \(H_2(\mathbb R)\) face marginal exactly when

\[
\boxed{\operatorname{Tr}F=0.}
\]

This condition leaves an eight-real-dimensional space of traceless Hermitian flavor coefficients.

## 2. Real symmetric plus imaginary antisymmetric decomposition

Every Hermitian \(F\in M_3(\mathbb C)\) has a unique decomposition

\[
F=S+iK,
\]

where

\[
S^T=S,
\qquad
K^T=-K,
\qquad
S,K\in M_3(\mathbb R).
\]

For traceless \(F\):

- \(S\) is real symmetric traceless, dimension five;
- \(K\) is real antisymmetric, dimension three and automatically traceless.

Hence

\[
\operatorname{Herm}_3^0(\mathbb C)
\cong
\operatorname{Sym}_3^0(\mathbb R)
\oplus i\operatorname{Alt}_3(\mathbb R)
\]

as an eight-real-dimensional decomposition.

## 3. Which part belongs to the graded-real parent

Write

\[
\sigma_y=iJ,
\qquad
J=\begin{pmatrix}0&-1\\1&0\end{pmatrix}
\]

with \(J\) real antisymmetric.

For the imaginary-antisymmetric flavor part,

\[
\sigma_y\otimes(iK)
=(iJ)\otimes(iK)
=-J\otimes K.
\]

This matrix is real and symmetric because it is the tensor product of two real antisymmetric matrices. Therefore

\[
\boxed{
\sigma_y\otimes(iK)\in H_6(\mathbb R).
}

It is exactly the odd–odd component of the graded-real completion

\[
(\operatorname{Sym}_2\otimes\operatorname{Sym}_3)
\oplus
(\operatorname{Alt}_2\otimes\operatorname{Alt}_3).
\]

## 4. Which part requires a complex parent

For a nonzero real symmetric \(S\),

\[
\sigma_y\otimes S=iJ\otimes S
\]

is purely imaginary and Hermitian. It is not a real symmetric \(6\times6\) matrix in the selected product basis.

Thus

\[
\boxed{
\sigma_y\otimes S
\notin H_6(\mathbb R)
\quad(S\ne0),
}

although it belongs to \(H_6(\mathbb C)\).

The five-dimensional symmetric-traceless flavor sector is therefore the lowest marginal-invisible leakage that cannot be absorbed by the graded-real parent without changing the chosen real structure.

## 5. Exact positivity bound around a flavor-isotropic residue

Consider

\[
R=cI_6+\epsilon\,\sigma_y\otimes F,
\qquad c>0.
\]

A face unitary diagonalizes \(\sigma_y\), giving

\[
R\sim
\begin{pmatrix}
cI_3+\epsilon F&0\\
0&cI_3-\epsilon F
\end{pmatrix}.
\]

Therefore

\[
\boxed{
R\ge0
\iff
cI_3\pm\epsilon F\ge0
\iff
|\epsilon|\,\|F\|_{\rm op}\le c.
}

Both the graded-real and genuinely complex marginal-safe sectors admit an open positive neighborhood. Positivity alone does not select between them.

For a general positive flavor background \(\rho>0\),

\[
I_2\otimes\rho+\epsilon\sigma_y\otimes F\ge0
\]

is equivalent to

\[
\rho\pm\epsilon F\ge0.
\]

## 6. Gauge and marginal tests are insufficient

When the two dressed faces have the same gauge representation, gauge conjugation acts trivially on face matrices. Both

\[
\sigma_y\otimes S
\quad\text{and}\quad
\sigma_y\otimes(iK)
\]

are gauge allowed whenever their flavor coefficients are allowed.

Both are invisible to the unweighted face marginal when \(S\) is traceless. Both can preserve positivity for small enough coefficient.

Thus neither gauge invariance, partial-trace reality nor positivity decides between:

- the graded-real \(H_6(\mathbb R)\) completion;
- the genuinely complex \(H_6(\mathbb C)\) completion.

A further antiunitary, transpose parity, reflection, locality or dynamical counterterm calculation is necessary.

## 7. Flavor transformation caveat

The split \(F=S+iK\) is tied to a chosen flavor real structure. Under a generic \(U(3)\) conjugation, the real-symmetric and imaginary-antisymmetric pieces mix.

Therefore selecting only the three-dimensional \(iK\) sector is not invariant under unrestricted flavor basis changes unless the theory also supplies a preferred antiunitary or real flavor structure.

This is a major gate: the graded-real rescue is basis-covariant only relative to additional real-structure data. Without it, the full traceless Hermitian octet is the natural \(SU(3)\)-covariant space, and the complex parent is favored.

## 8. Relation to flavor CP holonomy

The projector quadrilateral can remain nonzero while the unweighted face marginal is real. The present classification shows two possible interacting embeddings:

1. encode complex flavor orientation through odd–odd real correlations \(-J\otimes K\);
2. retain genuinely imaginary face–flavor operators \(iJ\otimes S\) in a complex parent.

Which description preserves the physical Jarlskog invariant under all allowed basis changes is a dynamical and representation-theoretic question, not a positivity question.

## 9. Branch decision

- **Closed:** marginal-safe face-odd entanglers are exactly \(\sigma_y\otimes F\) with traceless Hermitian \(F\).
- **Closed:** their eight dimensions split as five real-symmetric traceless plus three imaginary-antisymmetric.
- **Closed:** the three-dimensional imaginary-antisymmetric sector lies in \(H_6(\mathbb R)\).
- **Closed:** the five-dimensional symmetric-traceless sector requires \(H_6(\mathbb C)\) in the selected real structure.
- **Closed:** both sectors have open positive neighborhoods and pass the real-marginal test.
- **Open:** a source-defined flavor real structure making the graded-real sector basis covariant.
- **Open:** radiative coefficients selecting or populating the five-dimensional complex leakage sector.

## 10. Stop-everything and falsification gates

**Stop-everything trigger:** derive a source antiunitary that selects the odd–odd sector, prove radiative closure on \(H_6(\mathbb R)\), and retain a nonzero physical projector CP invariant.

**Complex-parent trigger:** compute a nonzero symmetric-traceless \(\sigma_y\otimes S\) counterterm that cannot be removed by a source-preserving basis change.

**Marginal falsifier:** a traceless \(F\) produces a nonzero unweighted \(\sigma_y\) face marginal.

**Positivity falsifier:** violate the exact bound \(|\epsilon|\|F\|_{\rm op}\le c\) in the isotropic model while claiming positivity.

**Covariance warning:** do not call the \(S/iK\) split intrinsic without specifying the flavor real structure.

## 11. Certificate

The [marginal-safe entangler certificate](scripts/verify_marginal_safe_sigma_y_entanglers_split_real_and_complex_parents.mjs) checks the 5+3 dimension split, marginal cancellation, real-symmetric versus genuinely complex combined matrices and exact positivity thresholds for representative sectors.

## Companion documents

- [Real face-marginal perturbation classification](127_real_face_marginal_perturbation_classification.md)
- [Inverse-closed graded-real parent](289_the_inverse_closed_graded_real_escape_is_the_full_combined_real_symmetric_algebra.md)
- [Projector CP holonomy in the real face commutant](439_the_projector_cp_quadrilateral_factors_through_the_commutant_of_the_exchange_real_h2r_face_carrier.md)
- [Complex \(H_2(\mathbb C)\) fallback](129_h2c_fallback_restores_spin24_parent.md)
