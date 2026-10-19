# Multi-Flavor Exceptional Seesaw and the Alignment Gate

**Date:** 17 October 2026  
**Branches:** B03, B05, B06, B09 and B11  
**Claim status:** exact tree-level flavor matching; exceptional selection of the aligned tensor remains open

## 1. The flavor problem left by one generation

The one-generation matching produced the invariant coefficient

\[
\frac{C y_\nu^2}{\Lambda^5M_R^2}.
\]

With several sterile and active flavors, \(C\) is no longer one number. It is a tensor in the same sterile-pair space as the Majorana mass. The central question is whether it adds a new flavor matrix or collapses to the already present neutrino-mass data.

This document isolates that question independently of the quark-flavor contractions multiplying the exceptional operator.

## 2. Matrix conventions

Let \(N\) be an \(n_N\)-component column of left-handed sterile fields and \(X_\alpha=(L_\alpha H)\) the active-flavor source. Write

\[
\mathcal L
\supset
-\frac12N^T M N
-X^TYN
+\frac{1}{\Lambda^5}\,\mathcal Q\,N^T C N
+\text{h.c.},
\]

where

- \(M=M^T\) is the Majorana mass matrix;
- \(Y\) is the active-by-sterile Yukawa matrix;
- \(C=C^T\) is the sterile-pair slice of the exceptional Wilson tensor;
- \(\mathcal Q\) denotes the spectator quark fields and contractions.

For fixed spectator indices, a symmetric \(C\) has

\[
\frac{n_N(n_N+1)}2
\]

complex components. More general quark-flavor labels can only increase the coefficient multiplicity.

## 3. Tree-level matching

At leading order in the exceptional interaction, the heavy-field equation gives

\[
N=-M^{-1}Y^T X+\cdots.
\]

Substitution yields

\[
\mathcal L_{\rm eff}^{\rm ex}
\supset
\frac{1}{\Lambda^5}\,
\mathcal Q\,X^T K X
+\text{h.c.},
\]

with

\[
\boxed{
K
=
Y M^{-1} C M^{-1}Y^T
}.
\]

The ordinary seesaw mass is

\[
m_\nu=-v^2Y M^{-1}Y^T.
\]

The exceptional descendant therefore contains one extra insertion of \(M^{-1}C\).

## 4. Heavy-basis covariance

Under an invertible sterile basis change \(N=VN'\),

\[
M'=V^TMV,
\qquad
C'=V^TCV,
\qquad
Y'=YV.
\]

Direct substitution gives

\[
Y'M'^{-1}C'M'^{-1}Y'^T
=K.
\]

Thus \(K\) is a genuine active-flavor tensor, not a sterile-basis artifact. The relative congruence class of \((C,M)\) carries the new information.

## 5. The alignment gate

There is one immediate covariant alignment:

\[
C=\kappa M.
\]

Then

\[
K
=\kappa Y M^{-1}Y^T
=-\frac{\kappa}{v^2}m_\nu.
\]

This is the exact multi-flavor version of the desired parameter reduction. The exceptional descendant has the same active-flavor eigenvectors and texture zeros as the light Majorana mass matrix. It introduces only the overall scalar \(\kappa/\Lambda^5\), and even its phase could disappear if the orientation structure fixes \(\kappa\) to be real.

But covariance alone does not force this alignment. Any symmetric \(C\) is allowed by the sterile basis transformation law.

## 6. Generic misalignment

For generic \(C\),

\[
K\not\propto m_\nu.
\]

The low-energy interaction then contains an independent symmetric active-flavor tensor. A useful diagnostic is

\[
\mathcal C_{\rm mis}
:=
[K^\dagger K,,m_\nu^\dagger m_\nu].
\]

If this commutator is nonzero, the two tensors cannot be diagonalized by the same left flavor basis. Vanishing is necessary for spectral alignment but not sufficient for proportionality; equal eigenvector data can still carry different eigenvalues and phases.

In a Takagi basis for a nondegenerate \(M\), a general symmetric \(C\) retains \(n_N(n_N+1)/2\) complex entries, modulo only the residual field identifications and other sector rephasings. For \(n_N=3\), this begins with six complex coefficients before spectator quark flavor is counted.

## 7. Rank gate

Because

\[
K=R^T C R,
\qquad R=M^{-1}Y^T,
\]

one has

\[
\operatorname{rank}K
\le
\min(\operatorname{rank}C,\operatorname{rank}Y,n_N).
\]

With fewer sterile than active flavors, the exceptional tensor is necessarily rank deficient. This is an exact possible discriminator, but the ordinary minimal seesaw mass has the same \(n_N\) rank ceiling. Rank alone therefore does not establish the exceptional bridge.

## 8. Relation to CP orientation

The pair \((M,C)\) supports relative phases invariant under sterile basis change. They feed \(K\) even when the ordinary seesaw mass is held fixed.

Consequently:

- generic \(C\) adds CP and flavor data;
- \(C=\kappa M\) removes matrix misalignment;
- real fixed \(\kappa\) removes the remaining new relative phase;
- a complex free \(\kappa\) still supplies one independent orientation phase.

The exceptional/Jordan synthesis must therefore do more than permit the operator. It must select both the congruence direction and, ideally, the phase of \(\kappa\).

## 9. What could select \(C\propto M\)

Credible mechanisms include:

1. the same unique invariant bilinear generating both the sterile Majorana mass and the exceptional pair insertion;
2. a one-dimensional invariant subspace in the symmetric sterile-pair representation;
3. a Furey linking-algebra relation identifying the coefficient insertion with the neutral two-cycle;
4. an exceptional incidence rule leaving no independent symmetric tensor;
5. a renormalization-group fixed ray that preserves proportionality.

None has yet been derived. In ordinary effective field theory, \(M\) and \(C\) are independent spurions with identical transformation law.

## 10. Stop-everything and falsification gates

**Alignment theorem:** the source algebra proves \(C=\kappa M\) and fixes real \(\kappa\). Then the exceptional determinant adds no new neutrino flavor or CP matrix.

**Radiative closure:** the proportionality ray is stable under every interaction retained in the model.

**Predictive misalignment:** the algebra fixes a non-proportional \(C\), producing a calculable flavor pattern distinct from \(m_\nu\).

**EFT failure:** all symmetric \(C\) counterterms are allowed and independently renormalized. Then the exceptional seesaw branch expands the parameter space without explanation.

**Rank signal:** a predicted sterile rank produces a falsifiable zero eigenvalue or forbidden flavor channel shared consistently by both \(K\) and \(m_\nu\).

## 11. Certificate

The [multi-flavor exceptional-seesaw certificate](scripts/verify_multiflavor_exceptional_seesaw_alignment.mjs) verifies heavy-basis covariance, symmetry of \(K\), exact alignment for \(C=\kappa M\), generic misalignment, the symmetric-tensor count and the one-sterile rank bound.

## Companion documents

- [Seesaw matching of the composite exceptional determinant](188_seesaw_matching_of_composite_exceptional_determinant.md)
- [Neutrino flavor orientation and factor locality](190_neutrino_flavor_orientation_observable_and_factor_locality_gate.md)
- [Neutral Fock action and seesaw separation](171_neutral_fock_action_and_positive_response_separation.md)
- [Low-degree polynomial Majorana invariant](182_low_degree_polynomial_majorana_cp_invariant.md)
