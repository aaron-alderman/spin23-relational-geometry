# \(2n\) Moments Generically Recover \(n\) Positive Thresholds and Weights per Coherent Channel, while \(2n-1\) Do Not

## Claim status

Exact finite positive-atomic moment theorem with an explicit undersampling counterexample; continuum spectra, noise and unknown model order remain open.

## 1. From response asymptotics to moments

In one coherent projector channel, write the fixed-contact Herglotz response as

\[
h(z)=h_\infty+\sum_{j=1}^n\frac{r_j}{m_j-z},
\qquad
r_j>0,\quad m_j>0.
\]

Its large-\(z\) expansion supplies moments

\[
\mu_k=\sum_{j=1}^n r_jm_j^k.
\]

The question is whether these moments determine the unknown thresholds \(m_j\) and weights \(r_j\).

## 2. Hankel/Prony recovery from \(2n\) moments

Let the monic annihilating polynomial be

\[
p(t)=\prod_{j=1}^n(t-m_j)
=t^n+c_{n-1}t^{n-1}+\cdots+c_0.
\]

The moments obey

\[
\mu_{k+n}+c_{n-1}\mu_{k+n-1}+\cdots+c_0\mu_k=0,
\qquad k=0,\ldots,n-1.
\]

This is the Hankel system

\[
\begin{pmatrix}
\mu_0&\cdots&\mu_{n-1}\\
\vdots&&\vdots\\
\mu_{n-1}&\cdots&\mu_{2n-2}
\end{pmatrix}
\begin{pmatrix}c_0\\ \vdots\\ c_{n-1}\end{pmatrix}
=-
\begin{pmatrix}\mu_n\\ \vdots\\ \mu_{2n-1}\end{pmatrix}.
\]

For \(n\) distinct atoms with positive weights, the Hankel matrix is positive definite and invertible. The roots of \(p\) recover the thresholds. The first \(n\) moments then recover the weights through an invertible Vandermonde system.

Thus the moment list

\[
\mu_0,\mu_1,\ldots,\mu_{2n-1}
\]

contains \(2n\) numbers and generically determines the \(2n\) unknown pole and weight parameters up to permutation.

## 3. Positivity and positive support checks

For a positive atomic measure,

\[
H_0=(\mu_{a+b})_{a,b=0}^{n-1}\succ0.
\]

For atoms on the positive half-line, the shifted Hankel matrix

\[
H_1=(\mu_{a+b+1})_{a,b=0}^{n-1}\succ0
\]

is also required in the full-rank distinct-atom case.

After Prony recovery, the decisive checks are:

- all polynomial roots are real, distinct and positive;
- all Vandermonde-recovered weights are positive;
- the reconstructed moments match the supplied moments.

Failure of any condition falsifies the proposed \(n\)-positive-threshold model.

## 4. Exact two-atom example

Take

\[
(m_1,m_2)=(2,5),
\qquad
(r_1,r_2)=(3,1.5).
\]

The first four moments are

\[
(\mu_0,\mu_1,\mu_2,\mu_3)
=(4.5,13.5,49.5,211.5).
\]

The Hankel recurrence recovers

\[
p(t)=t^2-7t+10=(t-2)(t-5),
\]

and the Vandermonde solve recovers weights \(3\) and \(1.5\).

## 5. Why \(2n-1\) moments do not suffice

For the same first three moments,

\[
(\mu_0,\mu_1,\mu_2)=(4.5,13.5,49.5),
\]

the distinct positive measure

\[
(m'_1,m'_2)=(1,4),
\qquad
(r'_1,r'_2)=(1.5,3)
\]

agrees exactly. Their fourth moments differ:

\[
\mu_3=211.5,
\qquad
\mu'_3=193.5.
\]

Therefore even positivity and positive support do not make \(2n-1\) moments generically identifying.

## 6. Lift to the four relational checkpoint channels

For known orthogonal projectors \(P_a\), matrix moments decompose as

\[
M_k=\sum_a\mu_{a,k}P_a,
\qquad
\mu_{a,k}=\operatorname{Tr}(P_aM_k).
\]

The scalar theorem applies independently to each channel. If channel \(a\) contains \(n_a\) thresholds, it requires \(2n_a\) exact moments for generic recovery.

This gives the most concrete present target for a Furey/Jordan/stress calculation:

\[
\boxed{
\text{derive the projector-resolved UV moments and test their Hankel positivity and rank.}
}
\]

## 7. Boundaries

The theorem does not cover:

- continuous spectral densities;
- repeated or confluent poles;
- noisy or approximate moments;
- unknown atomic order \(n\);
- contact terms not independently subtracted;
- a missing physical map to the projectors.

Those cases require truncated moment semidefinite methods, rank selection and uncertainty bounds.

## 8. Stop-everything tests

- **Finite-atom trigger:** the Hankel rank stabilizes at a small \(n\), roots are positive and weights are positive.
- **Continuum trigger:** Hankel rank continues to grow with additional exact moments, rejecting a small finite-pole model.
- **Positivity falsifier:** \(H_0\) or \(H_1\) has a negative eigenvalue.
- **Threshold falsifier:** the annihilating polynomial has nonreal or nonpositive roots.
- **Data stop:** fewer than \(2n\) moments may not be used to claim generic recovery of \(n\) unknown thresholds and weights.

## 9. Executable certificate

    node verification/recover/recover_positive_thresholds_and_weights_from_hankel_moments_and_exhibit_undersampled_nonuniqueness.mjs

The certificate performs exact two-atom Prony recovery, checks Hankel positivity and constructs a distinct positive two-atom measure sharing the first three moments.

## Companion documents

- [Fixed-UV known-pole Cauchy identifiability](793_fixed_uv_and_known_poles_turn_residue_recovery_into_a_cauchy_rank_problem_with_an_exact_minimum_data_theorem.md)
- [Explicit positive coherent-projector residues](792_checkpoint_spectral_projectors_give_an_explicit_positive_rank_one_relational_residue_model_but_not_furey_typing_or_threshold_prediction.md)
- [One-point non-identifiability with free contacts](782_one_scattering_checkpoint_cannot_identify_furey_thresholds_or_positive_residues_when_hermitian_contact_terms_are_free.md)
