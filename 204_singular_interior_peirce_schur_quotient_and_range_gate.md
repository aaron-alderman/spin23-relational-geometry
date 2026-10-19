# Singular-Interior Peirce–Schur Quotient and the Range Gate

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B07 and B08  
**Claim status:** exact finite-dimensional positive-semidefinite block theorem; field-theoretic gauge fixing remains open

## 1. Why singular interiors matter

Gauge theories, ungrounded networks and Goldstone systems naturally produce zero modes. The inverse interior response \(C^{-1}\) used in Peirce--Schur recursion then does not exist on the full interior space.

Replacing it blindly by a pseudoinverse is not always valid. The boundary coupling must be compatible with the null space.

## 2. Positive semidefinite block kernel

Consider

\[
R=
\begin{pmatrix}
A&B\\
B^T&C
\end{pmatrix},
\qquad
A=A^T, C=C^T\ge0.
\]

Let \(C^+\) be the Moore--Penrose inverse. The necessary range condition is

\[
\boxed{
\operatorname{ran}(B^T)
\subseteq
\operatorname{ran}(C).
}
\]

Equivalently,

\[
Bv=0
\quad
\text{for every }v\in\ker C.
\]

Boundary variables must not couple to an interior direction that has exactly zero quadratic cost.

## 3. Generalized Schur complement theorem

Under the range condition, define

\[
S_C(R)
:=
A-BC^+B^T.
\]

Then

\[
\boxed{
R\ge0
\quad\Longleftrightarrow\quad
C\ge0,
\quad
\operatorname{ran}(B^T)\subseteq\operatorname{ran}(C),
\quad
S_C(R)\ge0.
}
\]

Moreover, with

\[
G=
\begin{pmatrix}
1&-BC^+\\
0&1
\end{pmatrix},
\]

one obtains

\[
GRG^T
=
\begin{pmatrix}
S_C(R)&0\\
0&C
\end{pmatrix}.
\]

This is the singular version of structure-group normalization plus Peirce restriction.

## 4. Triple form

Let \(X\) be the off-diagonal Peirce component built from \(B\) and \(B^T\). Then

\[
BC^+B^T

\]

is the retained corner of

\[
\{X,C^+,X\}.
\]

The generalized recursion is therefore

\[
R_{\rm eff}
=A-\{X,C^+,X\},
\]

with the range condition as part of its domain.

## 5. Why the range condition is forced by positivity

Suppose \(v\in\ker C\) but \(Bv\ne0\). Choose a boundary vector proportional to \(-Bv\). Along a sufficiently small boundary displacement and a fixed null direction, the cross term is negative and linear in that displacement, while the boundary self-term is only quadratic.

Consequently the full quadratic form becomes negative. A positive semidefinite block matrix can never couple to a zero-cost interior direction.

This gives the physical reading:

- a pure gauge null mode must decouple from gauge-invariant boundary sources;
- if it couples, either the source is gauge variant, the gauge has not been fixed consistently, or the kernel is not positive.

## 6. Quotient-space interpretation

Decompose the interior space as

\[
\mathcal H_{\rm int}
=\operatorname{ran}(C)
\oplus
\ker C.
\]

Under the range condition, \(B\) vanishes on \(\ker C\). The effective response depends only on the quotient/support space

\[
\mathcal H_{\rm int}/\ker C
\cong
\operatorname{ran}(C),
\]

where \(C\) is invertible and \(C^+\) is its ordinary inverse extended by zero.

The null directions remain exact zero modes of the full kernel. They can be quotiented, gauge fixed or retained as physical flat directions without changing the boundary response.

## 7. Regularization test

Let \(P_0\) project onto \(\ker C\) and define

\[
C_\varepsilon=C+\varepsilon P_0.
\]

If the range condition holds, then

\[
BC_\varepsilon^{-1}B^T
=BC^+B^T
\]

for every \(\varepsilon>0\), because \(BP_0=0\).

If the range condition fails, the correction contains

\[
\frac1\varepsilon BP_0B^T
\]

and diverges as \(\varepsilon\to0\). This is an executable diagnostic for an inconsistent null-mode coupling.

## 8. Determinant qualification

If \(C\) is singular and the range condition holds, every vector in \(\ker C\) extends to a null vector of \(R\). Hence

\[
\det R=0.
\]

The ordinary determinant factorization becomes trivial. A nonzero determinant relation applies only after passing to the support quotient and choosing its induced volume normalization. Pseudodeterminants are not invariant under arbitrary nonorthogonal congruences, so they must not be substituted casually into the earlier formula.

## 9. Implications for gauge and stress kernels

Conserved-current and stress-tensor kernels contain Ward-identity null directions associated with longitudinal or gauge modes. A valid boundary response must:

1. project sources into the conserved/transverse subspace;
2. verify the range condition;
3. invert only on the physical support;
4. retain contact terms needed by the Ward identity;
5. distinguish gauge nulls from physical massless poles.

Only after these steps does the generalized Jordan recursion define a positive observable carrier.

## 10. Stop-everything and falsification gates

**Gauge-compatible success:** the Standard-Model stress/current kernel satisfies the range condition automatically by its Ward identities, and its quotient response reaches \(H_2(\mathbb R)_+\).

**Physical zero mode:** a null direction survives as a measurable Goldstone or massless carrier rather than a redundancy, requiring it to remain among the retained ports.

**Divergence failure:** regularization produces a \(1/\varepsilon\) boundary divergence, proving that a claimed elimination coupled illegally to a null interior mode.

**Positivity failure:** after projection to the physical support, the generalized Schur complement is not positive. Then the proposed response is not a Euclidean Jordan-cone carrier.

## 11. Certificate

The [singular Peirce--Schur certificate](scripts/verify_singular_peirce_schur_range_gate.mjs) verifies the range-compatible block diagonalization and positivity theorem, exact pseudoinverse response, null-vector inheritance, regulator independence when compatible and \(1/\varepsilon\) divergence when the range condition fails.

## Companion documents

- [Three-boundary scalar star](203_three_boundary_scalar_star_realizes_peirce_schur_recursion.md)
- [Peirce--Schur triple recursion](202_peirce_schur_triple_recursion_to_spin23.md)
- [Stress-energy reduction gate](46_stress_energy_to_jordan_carrier_reduction_gate.md)
