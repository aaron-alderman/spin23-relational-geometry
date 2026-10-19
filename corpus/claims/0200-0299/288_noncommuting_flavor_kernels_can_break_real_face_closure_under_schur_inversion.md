# Noncommuting Flavor Kernels Can Break Real-Face Closure Under Schur Inversion

**Date:** 17 October 2026  
**Branches:** B01, B02, B03, B04, B06, B07, B08 and B11  
**Claim status:** exact finite-dimensional counterexample and sufficient commuting-coefficient escape; classification of the full interacting flavor algebra remains open

## 1. The factorized architecture needs an inversion test

A real two-face carrier can coexist algebraically with complex flavor CP because face operations and flavor operations act on separate tensor factors. Positive sums of products

\[
G_a^{\rm face}\otimes F_a^{\rm flavor}
\]

remain positive.

Recursive response dynamics requires more than addition and multiplication by separate factors. Schur elimination uses matrix inverses. The real-face subspace need not be closed under inversion when its flavor coefficients fail to commute.

## 2. Face reality as partial-transpose symmetry

On a Hermitian face--flavor operator, absence of the face \(\sigma_y\) direction is equivalently invariance under partial transpose on the face factor:

\[
\tau_F(M)=M,
\qquad
\tau_F=T_{\rm face}\otimes\operatorname{id}_{\rm flavor}.
\]

The face matrices

\[
I,\quad\sigma_x,\quad\sigma_z
\]

are fixed, while \(\sigma_y\) changes sign.

Partial transpose is linear and preserves the desired real-face subspace. It is not an algebra automorphism on general tensor products with noncommuting flavor coefficients.

## 3. Explicit positive counterexample

Use a two-dimensional toy flavor space with Pauli matrices \(\tau_x,\tau_z\), and set

\[
X=\sigma_x\otimes\tau_x,
\qquad
Z=\sigma_z\otimes\tau_z.
\]

Each term is face-real. Because both the face and flavor factors anticommute,

\[
[X,Z]=0,
\qquad
X^2=Z^2=I.
\]

Take

\[
M=aI+bX+cZ,
\qquad a>|b|+|c|.
\]

Then \(M\succ0\) and \(\tau_F(M)=M\). Its inverse has the joint-eigenvalue expansion

\[
M^{-1}=\alpha I+\beta X+\gamma Z+\delta XZ.
\]

Generically \(\delta\neq0\). But

\[
XZ=(\sigma_x\sigma_z)\otimes(\tau_x\tau_z)
\propto\sigma_y\otimes\tau_y
\]

is odd under face partial transpose. Therefore

\[
\boxed{\tau_F(M)=M\quad\text{but}\quad\tau_F(M^{-1})\neq M^{-1}.}
\]

Positivity does not prevent the leakage.

## 4. Origin of the leakage

For face-real coefficients

\[
M=I\otimes A+\sigma_x\otimes B+\sigma_z\otimes C,
\]

products contain

\[
(\sigma_x\sigma_z)\otimes BC
+
(\sigma_z\sigma_x)\otimes CB
\propto
\sigma_y\otimes[B,C].
\]

Thus the missing face-antisymmetric direction is sourced precisely by flavor commutators.

This is where physical CP and mixing data can feed back into the face factor even though the original selector acts only on faces.

## 5. Sufficient escapes

### 5.1 Commuting flavor coefficient algebra

If all flavor coefficients appearing with different face directions commute, the commutator leakage vanishes. The face-real algebra is then closed under analytic functional calculus and inversion on its support.

This is sufficient but potentially too restrictive for physical CKM/PMNS CP, which requires noncommuting flavor structures.

### 5.2 Central flavor dependence

If the interior pivot is proportional to the flavor identity, inversion remains factorized while external residues may retain complex flavor matrices.

### 5.3 Paired antiunitary/graded selector

A selector combining face transpose with a nontrivial flavor automorphism could fix \(\sigma_y\otimes\tau_y\). This preserves a larger twisted-real subspace rather than the simple real face factor. It must be checked against CP invariants and gauge action.

### 5.4 Leakage vanishes after the physical reduction

The generated flavor coefficient may be traceless, so a flavor partial trace can remove it. This protects a reduced face response but not the full face--flavor operator. Later interactions can still expose the hidden term.

## 6. Schur-complement consequence

For a block response

\[
\mathcal M=
\begin{pmatrix}
A&Y\\Y^\dagger&C
\end{pmatrix},
\]

the effective face--flavor response is

\[
S=A-YC^{-1}Y^\dagger.
\]

Even if \(A,Y,C\) are initially face-real, a non-face-real \(C^{-1}\) can generate a \(\sigma_y\) face component in \(S\). Exact Schur/Jordan recursion therefore requires more than factor-local reality at the input.

The strong condition is closure of the relevant coefficient algebra under inversion and sewing.

## 7. Reconciliation with flavor CP

The result does not reimpose a universal real flavor structure. It instead creates a three-way choice:

1. isolate noncommuting CP data in external flavor residues while keeping the sewn pivot flavor-central;
2. use a graded/twisted selector that accommodates the correlated antisymmetric term;
3. accept controlled face-complex leakage and work in the parent \(H_2(\mathbb C)\) carrier.

This is the interacting refinement of the earlier statement that real faces and complex flavor CP can coexist kinematically.

## 8. Stop-everything and falsification gates

**Stop-everything trigger:** the full Standard-Model/Furey response algebra places all noncommuting CP data outside the inverted pivots, so exact real-face Schur closure survives without making flavor real.

**Graded-selector trigger:** a symmetry-derived flavor automorphism extends partial transpose and fixes the full inverse-closed algebra while retaining a nonzero CP invariant.

**Leakage trigger:** the generated \(\sigma_y\)-face term has a calculable CP-odd spectral or transport observable.

**Factorization falsifier:** input tensor-factor separation is cited as proof of closure under inverse or Schur complement.

**CP falsifier:** commuting every flavor coefficient is imposed and thereby forces all physical CP-odd invariants to vanish.

## 9. Certificate

The [flavor-noncommutative Schur-closure certificate](../../../verification/verify/verify_flavor_noncommutativity_breaks_face_real_schur_closure.mjs) constructs a positive face-real matrix whose inverse contains a nonzero partial-transpose-odd cross term, and verifies closure in a commuting-coefficient comparison.

## Companion documents

- [Real two-face carrier with complex flavor CP](../0100-0199/120_real_face_carrier_complex_flavor_cp.md)
- [Three-flavor real-face/complex-PMNS carrier](../0100-0199/174_three_flavor_real_face_complex_pmns_spectral_carrier.md)
- [Channel aggregation and matrix Schur covariance](267_matrix_interior_schur_covariance_needs_no_commutativity.md)
- [Twisted \(H_2(\mathbb C)\) parent carrier](219_twisted_helicity_carrier_glues_as_h2c_spin24_before_spin23_reduction.md)
