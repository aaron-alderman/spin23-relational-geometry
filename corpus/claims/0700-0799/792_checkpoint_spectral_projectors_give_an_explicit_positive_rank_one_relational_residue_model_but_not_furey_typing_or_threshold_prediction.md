# Checkpoint Spectral Projectors Give an Explicit Positive Rank-One Relational-Residue Model, but Not Furey Typing or Threshold Prediction

## Claim status

Constructive passive spectral model with explicit poles and positive residues; source typing and scale prediction remain open.

## 1. Coherent supports already selected by the checkpoint

The symmetric unitary checkpoint has four simple eigenvalues

\[
S_0=\sum_{j=1}^4\lambda_jP_j,
\qquad |\lambda_j|=1.
\]

Its spectral projectors obey

\[
P_j^\dagger=P_j,
\qquad
P_j^T=P_j,
\qquad
P_jP_k=\delta_{jk}P_j,
\qquad
\sum_jP_j=I.
\]

In this case the projectors are real symmetric rank-one matrices. Each touches every declared scattering coordinate, both handles and both boundary sides, as established in document 784.

These are therefore canonical coherent supports at one fixed arithmetic background.

## 2. Independent coherent Potapov factors

Choose one normalized Blaschke factor per projector:

\[
D(z)=\sum_j f_j(z)P_j,
\qquad
f_j(\omega_0)=1.
\]

The reciprocal congruence becomes

\[
S(z)=D(z)S_0D(z)
=\sum_j\lambda_jf_j(z)^2P_j.
\]

Because the projectors are mutually orthogonal and symmetric:

- \(S(\omega_0)=S_0\);
- \(S^T=S\);
- \(S\) is unitary for real frequency;
- \(S\) is strictly contractive in the upper half-plane when all factors are nonconstant.

Unlike the coordinate-local construction in document 791, the entire response diagonalizes into the relational checkpoint channels.

## 3. Explicit positive Cayley residues

Let

\[
f_j(z)=
\frac{(z-i\gamma_j)/(z+i\gamma_j)}
     {(\omega_0-i\gamma_j)/(\omega_0+i\gamma_j)},
\qquad \gamma_j>0.
\]

On channel \(j\), the scattering eigenvalue is

\[
s_j(z)=\lambda_j f_j(z)^2.
\]

The Cayley-Herglotz eigenvalue is

\[
h_j(z)=i\frac{1+s_j(z)}{1-s_j(z)}.
\]

Each equation \(s_j(m)=1\) has two finite real solutions for the generic checkpoint. Near either solution,

\[
h_j(z)=\frac{\rho_{j,m}}{m-z}+O(1),
\]

with

\[
\rho_{j,m}
=\frac{m^2+\gamma_j^2}{2\gamma_j}>0.
\]

Therefore the full residue is

\[
R_{j,m}=\rho_{j,m}P_j\succeq0,
\qquad
\operatorname{rank}R_{j,m}=1.
\]

The executable example has eight finite real poles—two for each of four channels—and all eight residues are explicitly positive.

## 4. What has been solved

This answers one branch question positively:

\[
\boxed{
\text{The arithmetic checkpoint admits a reciprocal passive causal model
with explicit positive rank-one relational residues.}
}
\]

No indefinite spectral weights are required. The residue ranges are exactly the coherent scattering eigenchannels already selected by \(S_0\).

## 5. What remains unsolved

The construction remains inside the commutative functional calculus of the fixed checkpoint:

\[
D(z),S(z),H(z)\in\operatorname{span}\{P_1,P_2,P_3,P_4\}.
\]

It therefore does not overcome the representation problem found in document 785:

- the four projectors are not permuted as the \(u,d,e,\nu\) grid by handle exchange or flux reversal;
- no gauge-compatible source map assigns the matter labels to them;
- the four \(\gamma_j\) are arbitrary positive scales;
- normalization at one checkpoint imposes no conditions on those scales;
- a permutation of proposed field labels among the four channels remains external input.

Thus the model establishes positive spectral existence while remaining nonpredictive about physical thresholds.

## 6. The next hard question

The relevant map is no longer a coordinate embedding. It must be a source-level transformation

\[
\{\text{typed neutral Furey responses}\}
\longrightarrow
\{\operatorname{ran}P_j\}_{j=1}^4
\]

that is covariant over the selector-background family rather than equivariant inside one fixed fiber.

If such a map exists, matter thresholds could fix the \(\gamma_j\) and turn the present construction into a physical response model. If not, the coherent residue branch remains a mathematically admissible but untyped spectral completion.

## 7. Stop-everything tests

- **Positive source trigger:** a gauge-neutral Furey/Jordan correlator has residue ranges exactly equal to the transported \(P_j\).
- **Scale trigger:** known thresholds or sum rules fix the four \(\gamma_j\).
- **Covariance trigger:** the support map transports consistently over the finite selector background space.
- **Typing falsifier:** the required source ranges carry incompatible gauge or antiunitary representation types.
- **Predictivity stop:** choosing four masses and a field-to-projector permutation by hand is not a derivation.

## 8. Executable certificate

    node verification/construct/construct_coherent_projector_potapov_response_with_explicit_positive_rank_one_cayley_residues.mjs

The certificate reconstructs the four spectral projectors, verifies their real symmetric rank-one properties, builds the coherent inner response, solves all eight real Cayley pole equations and verifies every residue weight is positive.

## Companion documents

- [The four relational scattering eigenchannels](784_all_four_scattering_eigenchannels_are_rank_one_relational_superpositions_touching_both_handles_and_both_boundary_sides.md)
- [The fixed spectral quartet is not a Furey permutation representation](785_the_scattering_eigenchannel_quartet_is_not_an_equivariant_permutation_copy_of_the_furey_udenu_grid.md)
- [Typed coordinate factors retain relational residues](791_typed_coordinate_potapov_factors_preserve_the_checkpoint_passivity_reciprocity_and_reality_but_their_cayley_residues_remain_relational.md)
- [One checkpoint cannot identify thresholds](782_one_scattering_checkpoint_cannot_identify_furey_thresholds_or_positive_residues_when_hermitian_contact_terms_are_free.md)
