# Locking Tensor Geometry: The Selector Is an Oriented Internal Two-Plane

**Date:** 17 October 2026  
**Branches:** B01, B03, B04 and B05  
**Claim status:** exact compact-group orbit classification; physical origin of the locking field remains open

## 1. The minimal nontrivial portal datum

The external traceless Jordan carrier transforms as a two-dimensional real representation, while the internal weak traceless block transforms as a three-dimensional real representation. A nontrivial locking portal therefore needs

\[
K:\mathbb R^2_{\rm ext}\longrightarrow\mathbb R^3_{\rm int},
\qquad
K\in\operatorname{Mat}_{3\times2}(\mathbb R).
\]

Under independent connected automorphisms,

\[
K\longmapsto RKS^T,
\qquad
R\in SO(3)_{\rm int},
\quad
S\in SO(2)_{\rm ext}.
\]

The singular values of \(K\) classify its continuous orbits.

## 2. Four orbit types

### Zero lock

\[
K=0.
\]

The full four-dimensional Lie algebra \(\mathfrak{so}(3)\oplus\mathfrak{so}(2)\) is unbroken.

### Rank-one lock

\[
K=
\begin{pmatrix}
1&0\\0&0\\0&0
\end{pmatrix}.
\]

Its connected stabilizer has dimension one: internal rotations around the selected line. The orbit has dimension three.

### Isotropic rank-two lock

\[
K_0=
\begin{pmatrix}
1&0\\0&1\\0&0
\end{pmatrix},
\qquad
K_0^TK_0=I_2.
\]

Its connected stabilizer is the diagonal \(SO(2)\) that rotates the external frame and internal plane together. The orbit has dimension three.

### Anisotropic rank-two lock

\[
K=
\begin{pmatrix}
2&0\\0&1\\0&0
\end{pmatrix}.
\]

Its singular axes are distinguished, and the connected stabilizer is trivial. The orbit has dimension four.

## 3. The isotropic lock constructs the real slice

For

\[
K^TK=\lambda I_2,
\]

the columns of \(K/\sqrt\lambda\) form an oriented orthonormal two-frame in the internal Pauli space. If \(\mathbf n\) is its unit normal, then

\[
KK^T=\lambda(I_3-\mathbf n\mathbf n^T).
\]

Thus \(K\) selects exactly the internal two-plane that becomes the traceless part of \(H_2(\mathbb R)\). The previously abstract real-form selector can be written as a rank-two projector.

This is constructive but not yet explanatory: introducing \(K\) by hand is equivalent to introducing the missing plane by hand.

## 4. Invariants and a selecting potential

The two basic invariants are

\[
I_1=\operatorname{tr}(K^TK),
\qquad
I_2=\det(K^TK).
\]

Their discriminant

\[
\Delta_K=I_1^2-4I_2
\]

is nonnegative and vanishes exactly when the two singular values agree.

A potential such as

\[
V(K)=
\alpha\bigl(\operatorname{tr}K^TK-v^2\bigr)^2
+\beta\left[
\bigl(\operatorname{tr}K^TK\bigr)^2-4\det(K^TK)
\right],
\qquad \alpha,\beta>0,
\]

selects

\[
K^TK=\frac{v^2}{2}I_2.
\]

The equal-singular-value condition is therefore dynamically possible without choosing an internal plane explicitly. The vacuum chooses the plane spontaneously.

## 5. Goldstone interpretation

For global \(SO(3)\times SO(2)\), the isotropic orbit is

\[
\frac{SO(3)\times SO(2)}{SO(2)_{\rm diag}},
\]

of dimension three. A vacuum therefore has three Goldstone directions.

If the external frame rotation is a redundancy rather than a physical symmetry, only the normal \(\mathbf n\in S^2\) is observable, giving two plane-orientation modes. The ontology of the external \(SO(2)\) is therefore decisive for Goldstone counting.

## 6. Stop-everything and falsification tests

**Positive:** stress, boundary orientation or a Furey volume element generates this isotropic \(K\) and fixes its scale or potential coefficients.

**Negative:** \(K\) is merely a freely chosen spurion, or its generic vacuum is anisotropic and destroys the residual \(U(1)\)-like symmetry.

**Current result:** the missing selector has a precise field space and orbit geometry.

## 7. Certificate

The [locking-stabilizer certificate](scripts/verify-locking-tensor-stabilizers.mjs) solves the infinitesimal equation

\[
AK-KB=0
\]

for representative zero, rank-one, isotropic rank-two and anisotropic rank-two tensors and verifies their stabilizer and orbit dimensions.

## Companion documents

- [Minimal symmetry-safe portal](78_minimal_symmetry_safe_external_internal_portal.md)
- [Weak real-form stabilizer obstruction](71_weak_real_form_stabilizer_obstruction.md)
- [Jordan selection and conformal descent](44_jordan_selection_axioms_and_spin24_to_spin23_descent.md)
- [Locking-potential Hessian and scalar decoupling](81_locking_potential_hessian_and_scalar_decoupling.md)
- [Locking gauge mixing and hypercharge gate](82_locking_gauge_mixing_and_hypercharge_gate.md)
