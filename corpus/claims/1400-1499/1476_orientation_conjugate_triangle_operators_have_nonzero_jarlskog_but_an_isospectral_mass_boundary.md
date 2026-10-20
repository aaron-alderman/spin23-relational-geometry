# Orientation-conjugate triangle operators have nonzero Jarlskog, but an isospectral mass boundary

**Date:** 20 October 2026

**Gates:** A5 and A6

**Status:** exact constrained two-sector construction; physical sector assignment and mass hierarchy open

**Depends on:** [the single-generator kill test](1475_one_decorated_triangle_has_only_three_eigenvector_parameters_and_one_shared_generator_has_zero_jarlskog.md) and [the metric triangle ansatz](1474_a_metric_three_defect_triangle_plus_one_loop_phase_matches_the_ckm_parameter_count_but_predicts_no_values.md)

**Evidence:** [machine-readable construction](../../../evidence/data/spin23-orientation-conjugate-triangle-jarlskog.json) and [executable verifier](../../../verification/verify/verify_spin23_orientation_conjugate_triangle_jarlskog.mjs)

> **Subsequent held-out falsifier (claim 1477).** Exact orientation conjugacy implies a symmetric relative mixing matrix, up to eigenvalue orderings. The 2025 PDG CKM global fit violates the resulting magnitude symmetry at about 23 conservative combined standard deviations through |Vub| versus |Vtd|. The construction remains an exact noncommuting toy model, but its direct CKM interpretation is excluded.

## Result

The smallest noncommuting repair of claim 1475 does not require an arbitrary second matrix. Use the two orientations of the same decorated triangle:

\[
H_+=H(a,b,c,\delta),
\qquad
H_-=H(a,b,c,-\delta)=\overline{H_+}.
\]

Their commutator has determinant

\[
\boxed{
\det[H_+,H_-]
=-8i\,c^4(a^2-b^2)\sin^2\delta\,\sin(2\delta).
}
\]

It is generically nonzero. Thus one triangle, one anisotropy and one orientation-sensitive loop phase can produce two noncommuting three-family operators and a nonzero Jarlskog-type invariant without fitting two independent edge matrices.

The construction has a sharp boundary: (H_-) is the complex conjugate of (H_+), so the two are isospectral. Affine sector shifts and scales preserve their eigenvectors but constrain their spectra to be affine images of one common triple. The construction therefore supplies a restricted mixing ansatz, not the observed quark masses or a generic CKM matrix.

## 1. Exact commutator

With

\[
H_+=
\begin{pmatrix}
0&a&ce^{-i\delta}\\
a&0&b\\
ce^{i\delta}&b&0
\end{pmatrix},
\]

the orientation reverse is (H_-=overline{H_+}). Direct multiplication gives an anti-Hermitian commutator whose determinant vanishes only on the declared special surfaces:

\[
c=0,
\quad a^2=b^2,
\quad\sin\delta=0,
\quad\sin2\delta=0.
\]

For the explicit witness

\[
(a,b,c,\delta)=(2,3,5,\pi/4),
\]

one obtains

\[
\det[H_+,H_-]=12500i.
\]

The two required ingredients have clean meanings:

- (a^2\ne b^2) is triangle anisotropy;
- generic (delta) is oriented loop holonomy.

Either perfect edge-exchange symmetry or a CP-even/special-quarter-turn phase kills the invariant.

## 2. Positive sector operators

Hermitian mass-squared candidates can be made positive without changing their diagonalizing bases:

\[
K_u=\mu_u I+\beta_uH_+,
\qquad
K_d=\mu_d I+\beta_dH_-.
\]

Taking (mu_u,mu_d) larger than the respective spectral radii ensures positivity. Their commutator is

\[
[K_u,K_d]=\beta_u\beta_d[H_+,H_-],
\]

so its determinant is multiplied by ((\beta_u\beta_d)^3) and remains generically nonzero.

This establishes algebraic compatibility with positive mass-squared operators. It does not derive the shifts or scales.

## 3. The isospectral boundary

Complex conjugation preserves the characteristic polynomial, hence

\[
\operatorname{spec}(H_+)=\operatorname{spec}(H_-).
\]

With affine sector maps, corresponding eigenvalues obey

\[
\lambda_{u,j}=\mu_u+\beta_u\lambda_j,
\qquad
\lambda_{d,j}=\mu_d+\beta_d\lambda_j.
\]

This is far more restrictive than the six observed quark masses. It may be useful as a falsifiable zeroth-order relation, but it cannot be called a mass derivation. Adding unrelated diagonal entries would remove the prediction by hand.

The mixing family also depends on at most the two edge ratios and (delta), so it lies on a lower-dimensional submanifold of generic CKM space. A held-out relation among mixing observables must be derived before phenomenological promotion.

## 4. Generalized-CP caveat

Orientation conjugation may define a generalized CP operation that exchanges the two sector operators. Whether the nonzero commutator represents physical CP violation depends on the rest of the action: if an exact symmetry also exchanges the physical sectors, the apparent violation may be relabeling. The Standard Model up/down gauge assignments distinguish the sectors, but the map from that distinction to (H_+) versus (H_-) has not been derived.

The next gate is therefore not another matrix calculation. It is a typed incidence rule assigning opposite triangle orientations to two physically distinct Standard Model sectors while preserving gauge invariance and anomaly accounting.

## 5. Convergence verdict

The bidirectional middle has now passed one stronger test:

- one geometry produces two noncommuting operators;
- anisotropy and loop orientation have separate algebraic roles;
- the CP-odd determinant is exact and generically nonzero;
- no arbitrary second edge matrix is introduced.

It also makes two new predictions/debts:

- affine isospectrality of sector masses;
- a lower-dimensional mixing relation still to be extracted.

\[
\boxed{
\text{nonzero constrained Jarlskog source: yes},\qquad
\text{realistic masses and generic CKM: not yet}.}
\]

## Reproduction

~~~powershell
node verification/verify/verify_spin23_orientation_conjugate_triangle_jarlskog.mjs
~~~
