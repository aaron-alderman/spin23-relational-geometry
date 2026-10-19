# The three-by-three trace identity forces a degree-eight no-go for an isolated full-family mixing vacuum

## Main result

For two \(3\times3\) Hermitian matrices \(A\) and \(B\), the apparently independent alternating trace satisfies

\[
\boxed{
\begin{aligned}
\operatorname{Tr}(ABAB)
={}&(\operatorname{Tr}AB)^2-2\operatorname{Tr}(A^2B^2)
 +2\operatorname{Tr}(B)\operatorname{Tr}(A^2B)\\
&+2\operatorname{Tr}(A)\operatorname{Tr}(AB^2)
-2\operatorname{Tr}(A)\operatorname{Tr}(B)\operatorname{Tr}(AB)\\
&+\frac12\bigl((\operatorname{Tr}A)^2-\operatorname{Tr}(A^2)\bigr)
\bigl((\operatorname{Tr}B)^2-\operatorname{Tr}(B^2)\bigr).
\end{aligned}
}
\]

This is the missing identity behind the degree-eight flavour branch. Once the spectra of \(A\) and \(B\) are fixed, every term on the right is constant, Birkhoff-linear, or proportional to \((\operatorname{Tr}AB)^2\). Therefore degree eight contains only one independent nonlinear orientation generator.

The consequence is a no-go:

> A complete two-Hermitian potential through total Yukawa degree eight cannot have a strict isolated stationary minimum in the generic four-dimensional three-family relative-frame space.

## 1. Four local linear coordinates

Write

\[
A=\operatorname{diag}(a_i),
\qquad
B=U\operatorname{diag}(b_j)U^\dagger,
\qquad
P_{ij}=|U_{ij}|^2.
\]

The doubly stochastic constraints leave four independent real entries in \(P\). For nondegenerate spectra, the four mixed moments

\[
y_{pq}=\operatorname{Tr}(A^pB^q)
=\sum_{ij}a_i^p b_j^qP_{ij},
\qquad p,q\in\{1,2\},
\]

form generic local coordinates. Algebraically, the change of coordinates factors through two Vandermonde matrices built from \((a_i)\) and \((b_j)\); their nonzero gaps make the map invertible on the four-dimensional zero-row-sum, zero-column-sum tangent space. A direct PMNS-parameter Jacobian check also has rank four at a generic interior point.

Set

\[
y_1=y_{11},\quad y_2=y_{21},\quad y_3=y_{12},\quad y_4=y_{22}.
\]

## 2. Complete degree-eight normal form

The cyclic-word and multi-trace classification, followed by the boxed identity, gives

\[
\boxed{
V_{\le8}(y)=c_0+c_1y_1+c_2y_2+c_3y_3+c_4y_4+\alpha y_1^2.
}
\]

No second nonlinear direction survives in dimension three. In particular, writing the same potential with a commutator norm does not enlarge the invariant ring; it only changes basis.

## 3. Stationarity forces the rank-one Hessian

At a generic interior stationary point,

\[
c_1+2\alpha y_1=0,
\qquad
c_2=c_3=c_4=0.
\]

The Hessian in the local \(y\)-coordinates is

\[
\boxed{
H_y=2\alpha
\begin{pmatrix}
1&0&0&0\\
0&0&0&0\\
0&0&0&0\\
0&0&0&0
\end{pmatrix}.
}
\]

Hence

\[
\operatorname{rank}H_y\le1,
\qquad
\dim\ker H_y\ge3.
\]

At a stationary point, a smooth coordinate change transforms the Hessian by congruence because the gradient term vanishes. Its rank is therefore invariant. The three flat directions are not a coordinate artifact.

## 4. Why the one-angle construction remains valid

Document 1206 restricts the relative frame to an \(R_{12}(\theta)\) slice. On that one-dimensional submanifold, the single nonlinear generator can provide positive curvature and an interior noncommuting minimum. This was a correct existence proof on the slice.

The invalid inference was that slice stability implied isolation in the full family orbit. Once the other three physical directions are restored, the degree-eight Hessian cannot stabilize them.

This is a useful methodological result: a successful low-dimensional slice can reveal a live mechanism while still concealing an exact higher-dimensional obstruction.

## 5. Revised degree ladder

\[
\boxed{
\begin{array}{rcl}
\text{Yukawa degree }\le6&:&\text{Birkhoff-linear; permutation extrema or flats},\\
\text{degree }8&:&\text{one nonlinear direction; slice mixing but no full isolation},\\
\text{degree }12&:&\text{the CP-odd Jarlskog pseudoscalar first appears}.
\end{array}
}
\]

What remains open is whether degree ten already supplies enough independent CP-even curvature for full mixing-angle stabilization, or whether degree twelve is the first viable closure order and simultaneously carries CP orientation.

## 6. Stop-everything significance

This result removes a tempting false closure. Degree eight is not the full answer, even though it visibly escapes alignment in a reduced model. Any claimed two-Yukawa degree-eight derivation of a unique three-family PMNS frame must either:

1. violate the stated fixed-spectrum/two-Hermitian assumptions;
2. use additional family tensors or explicit symmetry breaking;
3. sit on a nongeneric singular stratum; or
4. have overlooked the trace identity and the resulting flat directions.

The programme should now search the degree-ten and degree-twelve invariant rings for the first full-rank stationary Hessian, while keeping the projector-return and CP-pairing tests explicit.

## Computational certificates

- `verification/verify/verify_degree_eight_three_family_no_go.mjs` checks the exact trace identity on deterministic generic symmetric matrices and records the Hessian-rank bound.
- `scripts/search_degree_eight_three_family_vacuum.py` checks the identity on random Hermitian matrices, verifies generic rank four of the mixed-moment coordinate map, and numerically observes the predicted rank-one stationary Hessian.
