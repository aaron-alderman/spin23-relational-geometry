# Positive Exchange/Diagonal Locking Leaves Exactly \(H_2(\mathbb R)\)

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B09 and B11  
**Claim status:** exact minimal quadratic selector model on paired neutral response corners; source origin, matter quantization and Higgs compatibility remain open

## 1. Coordinates on the paired corners

Write each neutral Peirce observable as

\[
X_A=(a_A,d_A,x_A,y_A),
\qquad
X_B=(a_B,d_B,x_B,y_B),
\]

corresponding to

\[
\begin{pmatrix}
a&x+iy\\
x-iy&d
\end{pmatrix}.
\]

Let

\[
K(a,d,x,y)=(a,d,x,-y)
\]

be entrywise conjugation.

## 2. Minimal positive locking potential

Consider

\[
\boxed{
V=
\frac{\mu}{2}\|X_A-X_B\|^2
+\frac{\lambda}{2}\|X_B-KX_A\|^2,
\qquad
\mu,\lambda>0.}
\]

The first term penalizes the survivor anti-diagonal. The second penalizes departure from exchange-conjugation reality.

The potential is invariant under

\[
\Theta(X_A,X_B)=(KX_B,KX_A)
\]

and is gauge neutral because both Peirce faces carry trivial Standard-Model charge.

## 3. Exact spectrum

For the three \(K=+1\) coordinates \(a,d,x\):

- the diagonal mode \(X_A=X_B\) has eigenvalue zero;
- the anti-diagonal mode \(X_A=-X_B\) has Hessian eigenvalue

\[
2(\mu+\lambda).
\]

For the imaginary coordinate \(y\), where \(K=-1\):

- the diagonal imaginary mode has eigenvalue

\[
2\lambda;
\]

- the anti-diagonal imaginary mode has eigenvalue

\[
2\mu.
\]

Thus the Hessian is positive semidefinite and has nullity exactly three.

## 4. Exact low-energy fixed space

The zero modes obey simultaneously

\[
X_A=X_B,
\qquad
X_B=KX_A.
\]

Hence

\[
X_A=X_B=KX_A,
\]

so \(y=0\) and

\[
\boxed{
\ker \operatorname{Hess}V
\cong H_2(\mathbb R).}
\]

The two required operations from the previous document—diagonal gluing and exchange reality—are implemented by independent positive penalties.

## 5. What the model establishes

It proves that the selector is dynamically possible without negative quadratic modes:

- the anti-diagonal real survivor is gapped;
- both imaginary combinations are gapped;
- precisely one real symmetric two-face carrier remains;
- the construction is exchange symmetric and gauge neutral.

This is a response/scalar locking model. It does not prove that a fermionic Fock theory contains only one chiral generation, nor does it derive the coefficients \(\mu,\lambda\) from Furey's algebra.

## 6. Flavor and CP discipline

The conjugation penalty must act on the neutral two-face response coordinate, not entrywise on three-generation Yukawa matrices. A flavor-blind extension is

\[
V\otimes I_{\rm flavor},
\]

with complex flavor observables remaining in the commutant.

Applying \(K\) to the full flavor algebra would revive the universal-real-selector obstruction and erase physical CP invariants.

## 7. Higgs/TRO compatibility gate

The paired Peirce corners share the \(D\to E\) neutrino relation, but the charged Higgs cycles also involve the rest of the TRO. A complete locking term must be lifted from corner coordinates to the full carrier and checked to:

1. preserve all four gauge-covariant Higgs intertwiners;
2. avoid mixing the selected matter TRO with independent mirror blocks;
3. retain the unique neutrino arrow;
4. preserve positivity after Schur compression;
5. leave complex flavor coefficients unconstrained.

The current quadratic model does not perform that lift.

## 8. Stop-everything and falsification gates

**Source trigger:** the two positive penalties arise from one source-native Furey invariant or boundary action with fixed coefficient relation.

**Fock trigger:** quantization of the locked theory has one independent chiral CAR generation and no hidden survivor duplicate.

**Higgs trigger:** the locking commutes with the complete four-channel Higgs coin and preserves nonzero flavor CP.

**Falsifier:** a negative Hessian mode appears after the full-carrier lift, the diagonal sector contains more than \(H_2(\mathbb R)\), or the locking acts as conjugation on flavor matrices.

## 9. Certificate

The [exchange/diagonal Peirce-locking certificate](scripts/verify_exchange_diagonal_peirce_locking.mjs) diagonalizes the exact eight-real-coordinate Hessian, verifies the three zero modes, computes all five positive eigenvalues and checks invariance under the exchange antiunitary.

## Companion documents

- [Exchange restriction and diagonal-gluing gate](252_survivor_exchange_pairs_neutrino_corners_but_needs_diagonal_gluing_for_h2r.md)
- [Neutrino Peirce carrier](168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
- [Furey complex-structure inventory](251_neutrino_peirce_line_is_the_only_gauge_neutral_furey_complex_structure_candidate.md)
- [Real face carrier with complex flavor CP](120_real_face_carrier_complex_flavor_cp.md)
