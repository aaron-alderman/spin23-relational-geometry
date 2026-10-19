# The Proper-Gaussian Wick Map from the \(XK\)-Fixed Furey Root Surjects onto Every Positive Residual \(H_2(\mathbb R)\) Covariance

**Date:** 18 October 2026  
**Branches:** Furey aggregate root, proper complex Gaussian state, Wick reduction, quadratic relationship currents, residual Gram covariance, and Jordan-cone surjection  
**Claim status:** exact Gaussian covariance theorem; physical Gaussian state, normalization and dynamical compatibility remain open  
**Certificate:** [prove_the_proper_gaussian_wick_map_surjects_from_the_xk_fixed_furey_root_to_h2r_residual_covariance.mjs](scripts/prove_the_proper_gaussian_wick_map_surjects_from_the_xk_fixed_furey_root_to_h2r_residual_covariance.mjs)

## Executive result

The four-point obstruction isolated in document 1027 has an exact conditional solution.

Let

\[
a=\begin{pmatrix}L\\Q\end{pmatrix}
\]

be a zero-mean proper complex Gaussian doublet with covariance fixed by the exchange real structure \(XK\):

\[
C=\langle aa^\dagger\rangle
=pI+x\sigma_x+y\sigma_y
=
\begin{pmatrix}
p&x-iy\\
x+iy&p
\end{pmatrix},
\qquad
p^2\ge x^2+y^2.
\]

Define the relationship currents

\[
J_x=a^\dagger\sigma_xa,
\qquad
J_y=a^\dagger\sigma_ya.
\]

Their connected symmetrized covariance is

\[
\boxed{
M_J
=2\det(C)I_2
+4rr^T,
\qquad
r=\begin{pmatrix}x\\y\end{pmatrix}.}
\]

Every matrix in \(\operatorname{Sym}_2(\mathbb R)_+\cong H_2(\mathbb R)_+\) is obtained by this formula. Therefore every positive residual Gram/noise kernel—including the normal/tangent kernel used in documents 1021–1025—has a proper-Gaussian root inside the \(XK\)-fixed Furey response cone.

This closes the covariance-existence problem. It does not yet identify the physical aggregate state as Gaussian or make the Wick map a Jordan/dynamical homomorphism.

## 1. Wick calculation

For a proper complex Gaussian vector,

\[
\langle
(a^\dagger A a)(a^\dagger B a)
\rangle_c
=\operatorname{tr}(ACBC).
\]

The real symmetrized current covariance is

\[
(M_J)_{ij}
=\operatorname{Re}\operatorname{tr}(\sigma_iC\sigma_jC),
\qquad i,j\in\{x,y\}.
\]

Using the Pauli trace identities gives

\[
(M_J)_{ij}
=2(p^2-|r|^2)\delta_{ij}
+4r_ir_j.
\]

Since

\[
\det C=p^2-|r|^2,
\]

the boxed formula follows.

The covariance eigenvectors are the radial direction \(r\) and its transverse complement. Their eigenvalues are

\[
\lambda_+=2(p^2+|r|^2),
\qquad
\lambda_-=2(p^2-|r|^2).
\]

Positivity of \(C\) is exactly \(\lambda_-\ge0\).

## 2. Exact surjectivity

Let \(M\in\operatorname{Sym}_2(\mathbb R)_+\) have eigenvalues

\[
\lambda_+\ge\lambda_-\ge0
\]

and let \(n\) be a unit eigenvector for \(\lambda_+\). Set

\[
p^2=\frac{\lambda_++\lambda_-}{4},
\qquad
|r|^2=\frac{\lambda_+-\lambda_-}{4},
\qquad
r=|r|n.
\]

Then

\[
p^2-|r|^2=\frac{\lambda_-}{2}\ge0,
\]

so \(C\succeq0\), and substituting into the Wick formula returns exactly \(M\).

Hence

\[
\boxed{
\mathcal W:operatorname{Fix}_{XK}(H_2(\mathbb C)_+)
\twoheadrightarrow
\operatorname{Sym}_2(\mathbb R)_+.}
\]

Generically the fiber contains the pair

\[
r\leftrightarrow-r,
\]

because \(rr^T\) forgets the root sign. At isotropy \(\lambda_+=\lambda_-\), one has \(r=0\) and the orientation is undefined.

## 3. Diagonal residual Gram kernel

For the typed partial-sewing environment, the centre residual covariance is

\[
K_{\rm res}
=\begin{pmatrix}A&0\\0&B\end{pmatrix},
\qquad A,B>0.
\]

If \(A\ge B\), choose

\[
p^2=\frac{A+B}{4},
\qquad
x^2=\frac{A-B}{4},
\qquad y=0.
\]

If \(B>A\), choose the radial direction along \(y\) instead. The resulting proper-Gaussian Furey covariance has relationship-current covariance exactly \(K_{\rm res}\).

The construction is pointwise in frequency. A causal analytic choice of the square roots and eigenvectors over a band is an additional bundle problem.

## 4. Boundary and rank

If \(C\) lies on its rank-one boundary,

\[
p^2=|r|^2,
\]

then

\[
\lambda_-=0
\]

and \(M_J\) is rank one. Interior maps to interior and boundary maps to boundary.

This is compatible with the rank transition of the Gram disk, but it does not prove that the two boundary notions have the same physical cause.

## 5. The Wick map is not a Jordan homomorphism

The target determinant is

\[
\det M_J
=4(p^2-|r|^2)(p^2+|r|^2).
\]

It is neither \(\det C\) nor \((\det C)^2\) generically. Therefore

\[
-\log\det M_J
\]

does not pull back to the same Jordan barrier on \(C\). The Wick map also does not preserve addition, inversion or Schur complementation.

The theorem is a positive-cone surjection, not a Jordan-algebra morphism or a dynamical equivalence.

This boundary is crucial: the Furey root can realize every desired residual covariance kinematically without automatically generating the established Gram-centre action.

## 6. Physical proof obligations

To promote the construction, the programme still needs:

1. a gauge- and Lorentz-complete identification of \(L,Q\);
2. a state or large-\(N\) limit making the aggregate doublet proper Gaussian;
3. control of anomalous covariance \(\langle aa^T\rangle\), which would add Wick terms;
4. a causal analytic choice of the Gaussian root across frequency;
5. the correct normalization and units for \(J_x,J_y\);
6. an action whose induced relationship covariance follows the target silver kernel.

## 7. Stop-everything and falsification tests

**Gaussian-source trigger:** a microscopic Furey/Higgs bath calculation yields a proper Gaussian aggregate covariance in the \(XK\)-fixed cone.

**Kernel-match trigger:** its Wick current covariance reproduces the full frequency-dependent \(K_{\rm res}(\omega)\), including poles, normalization and the tuned seam.

**Analytic-root trigger:** the inverse eigenvalue construction admits a fixed-basis causal spectral factor over the physical band.

**Anomalous-covariance falsifier:** nonzero \(\langle aa^T\rangle\) changes the Wick covariance and destroys the target formula.

**Dynamics falsifier:** cone surjectivity is used to claim equality of log-determinant actions, inverses or Schur recursions.

**Gauge falsifier:** the required aggregate Gaussian covariance mixes inequivalent Standard-Model charges without the promised Higgs/colour dressing.

## Verdict

| Question | Verdict |
|---|---|
| Does the proper-Gaussian Wick formula close exactly? | **Yes** |
| Does every positive real residual covariance have an \(XK\)-fixed Gaussian root? | **Yes** |
| Is the generic root unique? | **No; it has at least the sign pair \(r\leftrightarrow-r\)** |
| Are rank boundaries preserved? | **Yes** |
| Is the Wick map a Jordan or Schur homomorphism? | **No** |
| Is the physical Furey aggregate state known to be proper Gaussian? | **No** |
| Is the causal frequency-global root derived? | **No** |

## Position in the corpus

- [neutral Furey response root](1001_the_neutral_furey_peirce_line_times_the_lepton_color_doublet_is_the_minimal_four_real_response_root_and_its_gram_is_the_jordan_carrier.md)
- [residual-current typing fork](1027_the_furey_residual_current_gate_splits_into_linear_port_and_quadratic_relationship_typings_with_different_antiunitary_tests.md)
- [Gaussian–Jordan barrier](1023_the_gaussian_gram_selector_is_the_h2r_jordan_logdet_barrier_and_a_peirce_slice_of_the_rank_three_cubic.md)
- [typed partial-sewing environment](1021_a_six_dimensional_typed_partial_sewing_realizes_the_causal_gram_centre_with_one_reference_ray_and_an_a2_residual_doublet.md)
