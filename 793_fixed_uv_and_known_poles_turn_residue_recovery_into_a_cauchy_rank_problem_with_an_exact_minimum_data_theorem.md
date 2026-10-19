# Fixed UV Data and Known Poles Turn Residue Recovery into a Cauchy-Rank Problem with an Exact Minimum-Data Theorem

## Claim status

Exact linear identifiability theorem for known poles and fixed contact; unknown thresholds and physical support typing remain nonlinear inputs.

## 1. The inverse problem after fixing the contact

Consider

\[
H(z)=H_\infty+\sum_{j=1}^n\frac{R_j}{m_j-z},
\qquad
R_j\succeq0,
\]

with:

- fixed Hermitian \(H_\infty\);
- distinct known real poles \(m_j\);
- response values at distinct real off-pole points \(x_k\).

Then

\[
H(x_k)-H_\infty
=\sum_j C_{kj}R_j,
\qquad
C_{kj}=\frac1{m_j-x_k}.
\]

Every matrix entry obeys the same scalar Cauchy system.

## 2. Exact uniqueness at \(n\) samples

For \(n\) distinct poles and \(n\) distinct sample points, the Cauchy determinant is nonzero:

\[
\det C
=
\frac{
\prod_{j<\ell}(m_\ell-m_j)
\prod_{k<r}(x_k-x_r)
}{
\prod_{k,j}(m_j-x_k)
}
\]

up to the conventional overall sign.

Therefore

\[
\boxed{\text{\(n\) samples uniquely determine \(n\) unrestricted matrix residues.}}
\]

Positivity is then a test on the recovered matrices, not an additional fitting freedom. A negative recovered eigenvalue falsifies the proposed pole/contact model.

The certificate reconstructs three positive \(2\times2\) residues exactly from three samples.

## 3. Why fewer samples remain non-identifying

With \(K<n\), the \(K\times n\) Cauchy matrix has a nontrivial nullspace. If \(c=(c_1,\dots,c_n)\) is a real null vector, then

\[
R_j\longmapsto R_j+\epsilon c_jQ
\]

leaves all \(K\) samples unchanged for any Hermitian \(Q\).

When the original residues are positive definite, sufficiently small nonzero \(\epsilon\) preserves positivity. Thus positivity alone does not remove the undersampling ambiguity.

The certificate constructs two distinct triples of positive residues that agree at two fixed-contact sample points.

## 4. Known coherent supports reduce the sample burden

Suppose instead that the support decomposition is already known:

\[
R_j=r_jP_j,
\qquad
P_jP_k=\delta_{jk}P_j,
\]

and one known pole is assigned to each orthogonal support. Projecting one response value gives

\[
r_j=(m_j-x)\operatorname{Tr}\!\left[P_j(H(x)-H_\infty)\right].
\]

One generic sample can then recover all weights because the support projectors separate the channels.

More generally, if support \(P_a\) contains \(n_a\) known poles, that channel needs \(n_a\) independent samples. The relevant minimum is the largest unresolved pole multiplicity within a support, not necessarily the total number of poles.

## 5. Consequence for the Furey/Spin(2,3) programme

Documents 784 and 792 supply four candidate coherent rank-one supports. The present theorem says exactly what is still needed to make their residue model evidential:

1. fix the UV contact rather than fit it;
2. derive or independently measure the pole locations;
3. establish the Furey-to-projector support map;
4. provide enough off-pole response samples for the remaining pole multiplicity;
5. test positivity after linear inversion.

This converts “derive the spectral response” into a finite, falsifiable calculation.

## 6. What the theorem does not solve

If the \(m_j\) are unknown, the inverse problem is nonlinear and includes pole permutations, cancellations and model-order ambiguity. The present \(n\)-sample theorem does not apply.

Likewise, assuming the projectors \(P_j\) are the physical field supports is not innocent: document 785 ruled out a fixed equivariant \(u,d,e,\nu\) permutation interpretation. A covariant source map over backgrounds remains necessary.

## 7. Stop-everything tests

- **Positive identification:** fixed-contact data at sufficient points recover positive residues on source-derived supports.
- **Pole-model falsifier:** the recovered residue has a negative eigenvalue.
- **Rank falsifier:** the proposed number of poles exceeds the Cauchy rank supported by the available independent samples.
- **Contact stop:** allowing \(H_\infty\) to refit restores the one-point ambiguity of document 782.
- **Threshold stop:** the known-pole uniqueness theorem may not be cited as recovery of unknown masses.

## 8. Executable certificate

    node scripts/prove_fixed_uv_known_pole_residue_identifiability_by_cauchy_rank_and_positive_undersampling_deformations.mjs

The certificate verifies Cauchy invertibility, exact recovery of three matrix residues, a two-sample positive-residue null deformation and one-sample recovery after orthogonal support decomposition.

## Companion documents

- [One checkpoint cannot identify poles with free contacts](782_one_scattering_checkpoint_cannot_identify_furey_thresholds_or_positive_residues_when_hermitian_contact_terms_are_free.md)
- [Explicit positive coherent-projector residues](792_checkpoint_spectral_projectors_give_an_explicit_positive_rank_one_relational_residue_model_but_not_furey_typing_or_threshold_prediction.md)
- [Typed coordinate factors do not yield local residues](791_typed_coordinate_potapov_factors_preserve_the_checkpoint_passivity_reciprocity_and_reality_but_their_cayley_residues_remain_relational.md)
