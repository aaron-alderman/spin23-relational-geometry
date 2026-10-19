# Three-Port \(H_3(\mathbb R)\), Cubic Consistency, and the \(Spin(2,3)\) Edge Reduction

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B08 and B09  
**Claim status:** exact Euclidean-Jordan and Schur-complement result; physical identification of the three ports remains open

## 1. From one edge to three relationships

A reciprocal real two-port response is an element of

\[
H_2(\mathbb R)
=
\operatorname{Sym}_2(\mathbb R),
\]

whose positive cone has conformal group \(Sp(4,\mathbb R)\), locally \(Spin_0(2,3)\).

Three reciprocal real ports instead form

\[
R=
\begin{pmatrix}
a&x&y\\
x&b&z\\
y&z&c
\end{pmatrix}
\in H_3(\mathbb R).
\]

The three off-diagonal entries are exactly the three pairwise relationships

\[
(12):x,
\qquad
(23):z,
\qquad
(31):y.
\]

They cannot be varied independently of the three self-responses if the full matrix is to remain positive.

## 2. The cubic norm

The Jordan determinant is

\[
\boxed{
\det R
=abc+2xyz-az^2-by^2-cx^2.
}
\]

The term

\[
2xyz
\]

is the real three-edge loop product. The remaining terms compare each pairwise relationship with the capacity of the opposite diagonal channel.

For positive definiteness one requires, in addition to positive diagonals,

\[
ab-x^2>0,
\quad
ac-y^2>0,
\quad
bc-z^2>0,
\quad
\det R>0.
\]

Thus the cubic norm is literally a local consistency condition among one carrier, three faces and three relationships.

## 3. Exact reduction to a two-face carrier

Eliminate port three. With

\[
A=
\begin{pmatrix}a&x\\x&b\end{pmatrix},
\qquad
u=
\begin{pmatrix}y\\z\end{pmatrix},
\]

the Schur response is

\[
R_{12|3}
=A-\frac1c uu^T
=
\begin{pmatrix}
a-y^2/c&x-yz/c\\
x-yz/c&b-z^2/c
\end{pmatrix}
\in H_2(\mathbb R).
\]

The determinants obey

\[
\boxed{
\det R
=c\,\det R_{12|3}.
}
\]

If \(R>0\), then \(R_{12|3}>0\). The cubic three-face norm therefore descends exactly to the quadratic Lorentz-cone norm of the effective two-face carrier.

This is a concrete local mechanism by which a higher Jordan rung can reduce to the \(Spin(2,3)\) rung.

## 4. Group ladder

For the real symmetric Jordan family,

\[
\operatorname{Conf}(H_n(\mathbb R))
\cong Sp(2n,\mathbb R)
\]

up to the usual finite coverings and centers. Hence

\[
H_2(\mathbb R)
\longleftrightarrow
Sp(4,\mathbb R)
\simeq_{\rm loc}Spin_0(2,3),
\]

while

\[
H_3(\mathbb R)
\longleftrightarrow
Sp(6,\mathbb R).
\]

Their dimensions are

\[
\dim H_2(\mathbb R)=3,
\quad
\dim Sp(4,\mathbb R)=10,
\]

and

\[
\dim H_3(\mathbb R)=6,
\quad
\dim Sp(6,\mathbb R)=21.
\]

Therefore the three-port lift does not make \(Spin(2,3)\) the symmetry of the whole three-face object. It makes it the conformal symmetry of every effective two-face reduction.

## 5. Sewing interpretation

The three principal \(H_2(\mathbb R)\) faces share diagonal entries:

\[
R_{12}=
\begin{pmatrix}a&x\\x&b\end{pmatrix},
\quad
R_{23}=
\begin{pmatrix}b&z\\z&c\end{pmatrix},
\quad
R_{31}=
\begin{pmatrix}c&y\\y&a\end{pmatrix}.
\]

Pairwise positivity is necessary but not sufficient for positivity of \(R\). The cubic determinant is the additional global sewing condition.

This gives a precise answer to why a cubic norm appears when three pairwise carriers are assembled: quadratic edge consistency does not control the sign of the full three-way determinant.

## 6. Complex loop orientation

For a Hermitian three-port response

\[
\rho=
\begin{pmatrix}
a&u&\overline w\\
\overline u&b&v\\
w&\overline v&c
\end{pmatrix}
\in H_3(\mathbb C),
\]

the determinant is

\[
\det\rho
=abc
+2\operatorname{Re}(uvw)
-a|v|^2-b|w|^2-c|u|^2.
\]

The cubic norm retains only the real part of the loop product. The independent pseudoscalar

\[
\operatorname{Im}(uvw)
\]

is precisely the three-port orientation observable found in the previous branch.

Thus:

- \(H_3(\mathbb R)\) has a real cubic consistency loop;
- \(H_3(\mathbb C)\) admits an additional oriented loop phase;
- the determinant controls positivity but does not record the sign of that orientation.

## 7. Rank and dynamics

A rank-one Gram response has trivial normalized loop phase. Rank two is the first level at which a nonzero imaginary loop can appear. This mirrors the need for at least two coherent alternatives to define relational phase curvature.

Schur sewing of real symmetric positive kernels can never generate an imaginary loop: realness and positivity are preserved at every elimination step. A nonzero loop orientation therefore requires at least one of:

1. a complex transport connection;
2. absorptive or multi-mode phases not sharing one real structure;
3. time-reversal/nonreciprocal data;
4. an internal CP-sensitive response map;
5. a lift to a complex Hermitian Jordan carrier.

## 8. Relation to the exceptional cubic

The determinant on \(H_3(\mathbb R)\) is not the exceptional determinant on \(H_3(\mathbb O)\). It is the associative real member of the same rank-three Euclidean-Jordan pattern.

This distinction matters. The three-port calculation gives a sourced reason for a cubic norm—three-way response consistency—without proving that octonions, \(E_6\), the Leech lattice or exceptional incidence govern the ports.

It nevertheless supplies a clean ladder for comparison:

\[
H_2(\mathbb R)
\subset
H_3(\mathbb R)
\subset
H_3(\mathbb C)
\subset
H_3(\mathbb H)
\subset
H_3(\mathbb O),
\]

with progressively richer relationship and orientation data.

## 9. Stop-everything and falsification gates

**Network derivation:** a physical three-boundary stress or walk response lands canonically in \(H_3(\mathbb R)_+\) and its measured elimination reproduces the two-face \(Spin(2,3)\) carrier.

**Cubic prediction:** the full determinant constraint relates three independently measurable pair responses beyond their individual positivity bounds.

**Orientation lift:** a nonzero imaginary loop forces a well-defined lift from the real to complex rank-three carrier.

**Exceptional selection:** incidence or dynamics uniquely requires the octonionic rather than real or complex rank-three Jordan algebra.

**Mere linear algebra:** every result is exhausted by ordinary multi-port Schur complements and yields no new observable or selection rule. Then the Jordan language is explanatory organization, not new physics.

## 10. Certificate

The [three-port cubic-consistency certificate](scripts/verify_three_port_h3r_cubic_consistency.mjs) verifies the cubic determinant formula, principal-minor conditions, positive Schur descent, determinant factorization, group dimensions, real-loop orientation loss and the complex rank-two Gram example.

## Companion documents

- [Two-port transport gauge and three-port loop](199_two_port_transport_gauge_obstruction_and_three_port_loop_escape.md)
- [Finite-walk two-port response](156_walk_two_port_h2r_boundary_response.md)
- [Jordan triple to Sp(4,R)](42_jordan_triple_to_sp4r_determination.md)
- [Exceptional cubic audit](184_exceptional_cubic_norm_cp_even_and_13_27_selection_audit.md)
