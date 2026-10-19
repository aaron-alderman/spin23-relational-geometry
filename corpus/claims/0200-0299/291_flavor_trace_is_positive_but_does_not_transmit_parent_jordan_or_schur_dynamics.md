# Flavor Trace Is Positive but Does Not Transmit Parent Jordan or Schur Dynamics

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact positive-reduction counterexample and parent/carrier group inventory; a physically invariant low-energy subalgebra remains open

## 1. Positive reduction is not a Jordan quotient

Let

\[
E=\frac1n\operatorname{Tr}_{\rm flavor}:
H_{2n}(\mathbb R)\longrightarrow H_2(\mathbb R)
\]

be normalized flavor partial trace. It is positive and unital. It removes the odd--odd sector and returns a real two-face matrix.

However, it is not a Jordan homomorphism.

For two flavor dimensions, take

\[
X=\sigma_x\otimes\tau_x.
\]

Then

\[
E(X)=0,
\qquad
X\circ X=X^2=I_4,
\qquad
E(X\circ X)=I_2.
\]

Therefore

\[
\boxed{E(X\circ X)\neq E(X)\circ E(X).}
\]

The external \(H_2(\mathbb R)\) is a positive observable image, not automatically a Jordan quotient of the parent.

## 2. Inversion does not commute with partial trace

Let

\[
M=aI+bX,
\qquad a>|b|.
\]

Since \(X^2=I\),

\[
M^{-1}=\frac{aI-bX}{a^2-b^2}.
\]

Hence

\[
E(M)^{-1}=\frac1aI_2,
\]

but

\[
E(M^{-1})=\frac{a}{a^2-b^2}I_2.
\]

These differ whenever \(b\neq0\). Consequently flavor reduction does not commute with the inverse appearing in a Schur complement.

Taking a block response with identity boundary coupling immediately gives

\[
E\!\left(A-YM^{-1}Y^T\right)
\neq
E(A)-E(Y)E(M)^{-1}E(Y)^T
\]

in general.

## 3. Exact factor-central escape

If every inverted pivot has the form

\[
C=C_{\rm face}\otimes I_{\rm flavor},
\]

then

\[
C^{-1}=C_{\rm face}^{-1}\otimes I_{\rm flavor}
\]

and normalized partial trace commutes with inversion.

More generally, reduction is dynamically exact on an invariant subalgebra where the conditional expectation has the needed bimodule and multiplicative properties for the operations actually used.

This formalizes the earlier sufficient condition: complex/noncommuting flavor data may live in residues and external coefficients, but the pivots being inverted must be central or otherwise closed relative to the reduction.

## 4. Parent and carrier inventories

The three relevant simple Euclidean Jordan algebras differ sharply:

\[
\begin{array}{c|c|c|c|c}
J&\dim_{\mathbb R}J&\operatorname{rank}J&\deg\det&\operatorname{Conf}_0(J)\\ \hline
H_2(\mathbb R)&3&2&2&Sp(4,\mathbb R)\\
H_2(\mathbb C)&4&2&2&SU(2,2)\\
H_6(\mathbb R)&21&6&6&Sp(12,\mathbb R).
\end{array}
\]

Their conformal-group dimensions are respectively

\[
10,\qquad15,\qquad78.
\]

The graded parent therefore carries a vastly larger cone and conformal group. Its existence does not enlarge the physical external symmetry from \(Spin(2,3)\) automatically; nor does partial trace make the parent \(Sp(12,\mathbb R)\) dynamics descend to \(Sp(4,\mathbb R)\).

## 5. Conditional expectation versus Jordan homomorphism

The lifted map

\[
\widehat E(M)=E(M)\otimes I_{\rm flavor}
\]

is a positive unital projection onto the factor-central subalgebra

\[
H_2(\mathbb R)\otimes I.
\]

It satisfies a bimodule property with elements of that subalgebra. It is still not multiplicative on arbitrary correlated parent elements.

Therefore a clean low-energy carrier requires one of:

- dynamical suppression of the correlation kernel;
- a large gap followed by controlled Schur elimination;
- decoherence/averaging with an error bound;
- an exact invariant central subalgebra;
- acceptance that the reduced dynamics is non-Markovian and contains memory/self-energy corrections.

## 6. Interpretation of the external \(Spin(2,3)\)

The external response can still take values in \(H_2(\mathbb R)_+\). But its nonlinear dynamics must be derived after reduction; they cannot be copied from the parent merely because the partial trace is positive.

This sharpens the role of \(Spin(2,3)\): it may govern an effective external response law only when the reduction is closed or when correction terms are controlled. Otherwise it describes the kinematic cone of reduced observables, not their exact autonomous symmetry.

## 7. Relation to open-system physics

The failure

\[
E(M^{-1})\neq E(M)^{-1}
\]

is the algebraic signature of hidden flavor correlations. Eliminating them generally produces self-energy and memory terms in the face response.

This is not necessarily a failure of the programme. It indicates that the relational carrier behaves like an open subsystem whose exact effective action is energy dependent. The existing Herglotz/Schur machinery is precisely the correct language, provided the hidden sector is retained until after the causal elimination.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the physical flavor pivots are factor central or an exact invariant subalgebra makes reduction commute with the full causal Schur recursion.

**Controlled-EFT trigger:** a spectral gap bounds the difference \(E(C^{-1})-E(C)^{-1}\) and yields a predictive low-energy correction.

**Memory trigger:** the noncommutation produces a distinctive causal self-energy rather than arbitrary counterterm freedom.

**Inheritance falsifier:** positivity of partial trace is cited as proof that the parent Jordan product or conformal symmetry descends.

**Autonomy falsifier:** the reduced \(H_2\) response is treated as closed while unresolved flavor correlations generate order-one memory terms.

## 9. Certificate

The [flavor-trace Jordan/Schur obstruction certificate](../../../verification/verify/verify_flavor_trace_not_jordan_or_schur_homomorphism.mjs) verifies failure of Jordan multiplicativity, inverse commutation and Schur commutation, checks the factor-central escape and audits the dimensions, ranks and conformal groups of the three parent/carrier candidates.

## Companion documents

- [Graded-real inverse-closed parent](289_the_inverse_closed_graded_real_escape_is_the_full_combined_real_symmetric_algebra.md)
- [CP survives graded realification](290_flavor_cp_survives_the_graded_real_parent_when_the_complex_structure_is_retained.md)
- [Peirce compression as CP retraction](261_peirce_compression_is_a_cp_retraction_not_a_unital_full_algebra_expectation.md)
- [Inhomogeneous Higgs Schur correction](238_inhomogeneous_higgs_requires_schur_self_energy_control.md)
