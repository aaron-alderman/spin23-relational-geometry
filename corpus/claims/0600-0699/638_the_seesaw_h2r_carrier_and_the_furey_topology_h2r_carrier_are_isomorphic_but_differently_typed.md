# The Seesaw (H_2(mathbb R)) Carrier and the Furey-Topology (H_2(mathbb R)) Carrier Are Isomorphic but Differently Typed

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08 and B11  
**Claim status:** exact real-form isomorphism and index-typing audit; a physical locking map remains open  
**Certificate:** [verify_topology_face_vs_neutrino_chiral_h2_typing.mjs](../../../verification/verify/verify_topology_face_vs_neutrino_chiral_h2_typing.mjs)

## Executive result

Two distinct constructions in the programme produce Jordan algebras isomorphic to \(H_2(\mathbb R)\):

1. the Furey topology-face carrier on the neutral \(A/B\) response index;
2. the fixed-helicity chiral/Nambu carrier in the neutrino propagator.

Their real forms are

\[
J_{\rm top}=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_y\},
\]

and

\[
J_{\rm chi}=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_z\}.
\]

The unitary quarter-turn

\[
U=\frac{I-i\sigma_x}{\sqrt2}
\]

fixes \(I,\sigma_x\) and sends

\[
U\sigma_zU^\dagger=-\sigma_y.
\]

Hence the two Jordan algebras are exactly isomorphic and have the same determinant cone. But they act on different physical indices. Therefore

\[
\boxed{
\text{seesaw interiority in }J_{\rm chi}
\not\Longrightarrow
\text{topology-face interiority in }J_{\rm top}
}
\]

without an additional locking or intertwining map.

## 1. Topology-face carrier

The topology carrier arose from the antiunitary exchange of the two anomaly-free Furey TRO realizations. Its matrix is

\[
K_{\rm top}=
\begin{pmatrix}
t&x-iy\\
x+iy&t
\end{pmatrix},
\qquad
\det K_{\rm top}=t^2-x^2-y^2.
\]

Its two components label response topology \(A/B\). They are not left/right spinor components and need not propagate as fields.

## 2. Neutrino chiral/Nambu carrier

The seesaw construction uses positive-energy residues

\[
P_i(k)=\frac12
\left(I+\frac{m_i}{\omega_i}\sigma_x
+\frac{k}{\omega_i}\sigma_z\right).
\]

Its two components are chiral, helicity-reduced or Nambu propagator components. Light/heavy spectral mixing moves their convex sum into the interior of

\[
J_{\rm chi}^+=\operatorname{span}_{\mathbb R}\{I,\sigma_x,\sigma_z\}_+.
\]

This remains the exact result of [document 172](../0100-0199/172_seesaw_spectral_mixture_enters_h2r_interior.md).

## 3. Isomorphism is not identification

Conjugation by \(U\) preserves:

- Hermiticity;
- positivity;
- determinant;
- rank-one boundary rays;
- the Lorentz-cone interior;
- the abstract \(Sp(4,\mathbb R)\cong Spin_0(2,3)\) structure associated with the Jordan algebra.

It does not change what an index means. A matrix acting on \(A/B\) is not thereby an operator on left/right chirality.

If both factors are independently present, the combined displayed real operator span contains

\[
3\times3=9
\]

basis tensors

\[
J_{\rm top}\otimes J_{\rm chi}.
\]

Collapsing these nine directions to one three-dimensional factor imposes a diagonal identification that must be derived.

## 4. Possible locking mechanisms

A valid identification could arise from:

1. an action term invariant only under the diagonal subgroup of the two face transformations;
2. a boundary condition mapping topology exchange to chiral exchange;
3. a common antiunitary inherited from the source CAR algebra;
4. a constrained auxiliary field whose equation of motion identifies the two response matrices;
5. a neutrino Yukawa intertwiner that is unitary and covariant on both indices.

Each mechanism must preserve gauge covariance, Lorentz covariance and positivity while avoiding mirror matter.

## 5. Consequence for the sterile-neutrino branch

The sixteen-state incidence kernel selects \(ν^c\), and seesaw mixing supplies an interior chiral response involving \(ν_L,ν^c\). This is suggestive because both results involve the neutral sector. It is not yet a proof that the topology-face and chiral/Nambu indices coincide.

The correct current diagram is

\[
\begin{array}{ccc}
T_A/T_B&\longrightarrow&J_{\rm top}\\
&&\downarrow\ ?\\
ν_L/ν^c&\longrightarrow&J_{\rm chi},
\end{array}
\]

where the vertical arrow is the missing physical intertwiner.

## 6. Stop-everything criteria

Stop identifying the two carriers if:

1. no covariant diagonal locking term exists;
2. the relevant antiunitaries act differently on gauge or flavor data;
3. locking creates propagating mirror modes or removes observed CP phases;
4. the combined response has irreducible tensor-product components outside one diagonal \(H_2(\mathbb R)\);
5. the identification is only a basis rotation between abstract Pauli matrices.

## 7. Next gate

Construct the most general quadratic coupling between a topology-face auxiliary doublet and the neutrino chiral/Nambu doublet. Classify which couplings preserve the diagonal real form, compute the spectrum, and test whether the orthogonal relative mode remains auxiliary, becomes massive and healthy, or becomes a ghost.

The elementary quadratic gate is resolved in [document 639](639_positive_diagonal_locking_conflicts_with_exact_noncompact_carrier_symmetry.md): an auxiliary positive lock is healthy and pole-free, but a positive Euclidean norm breaks the noncompact determinant symmetry, while the invariant Lorentzian lock is indefinite.

## Reproducibility

```powershell
node scripts\verify_topology_face_vs_neutrino_chiral_h2_typing.mjs
```
