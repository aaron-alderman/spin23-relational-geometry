# Recursive Schur–Jordan Descent and Functorial Sewing

**Date:** 17 October 2026  
**Branches:** B01, B02, B04 and B08  
**Claim status:** exact finite-dimensional theorem for real positive Jordan response matrices; physical port hierarchy remains open

## 1. General carrier hierarchy

Let

\[
R_n\in H_n(\mathbb R)_+
\]

be a positive reciprocal \(n\)-port response. Split off the last port:

\[
R_n=
\begin{pmatrix}
A&u\\
u^T&c
\end{pmatrix},
\qquad c>0.
\]

Define the effective retained response

\[
\mathscr S_c(R_n)
:=
A-\frac1c uu^T.
\]

Then

\[
\mathscr S_c(R_n)
\in H_{n-1}(\mathbb R)_+.
\]

This produces the exact hierarchy

\[
H_n(\mathbb R)_+
\longrightarrow
H_{n-1}(\mathbb R)_+
\longrightarrow\cdots\longrightarrow
H_2(\mathbb R)_+
\longrightarrow
H_1(\mathbb R)_+.
\]

## 2. Determinant recursion

Every step obeys

\[
\boxed{
\det R_n
=c\,\det\mathscr S_c(R_n).
}
\]

Iterating gives an \(LDL^T\)-type factorization. If \(d_n,d_{n-1},\ldots,d_1\) are the successive positive conditional pivots, then

\[
\det R_n
=\prod_{k=1}^n d_k.
\]

The degree-\(n\) Jordan determinant is therefore a product of conditional one-port capacities along any fixed elimination order.

Different orders produce different intermediate carriers and pivots, but the final determinant is unchanged.

## 3. Cone congruence followed by a corner projection

Define the unit-determinant lower-triangular congruence

\[
G=
\begin{pmatrix}
1_{n-1}&-u/c\\
0&1
\end{pmatrix}.
\]

Then

\[
GR_nG^T
=
\begin{pmatrix}
\mathscr S_c(R_n)&0\\
0&c
\end{pmatrix},
\qquad
\det G=1.
\]

The Schur operation is thus exactly:

1. a cone-preserving structure-group congruence;
2. followed by projection onto the retained Peirce corner.

The congruence is not generally a Jordan automorphism—it need not preserve the unit—but it belongs to the structure group of the symmetric cone and preserves the determinant here because \(\det G=1\).

This is the precise Jordan meaning of response elimination.

## 4. Associativity of elimination

Partition the ports into retained variables \(A\) and two disjoint interior sets \(B,C\). Whenever the eliminated block is invertible,

\[
\mathscr S_B\!left(\mathscr S_C(R)\right)
=
\mathscr S_{B\cup C}(R),
\]

after the natural relabeling of indices.

Thus exact Schur sewing is associative: eliminating interior ports one at a time or as one block gives the same effective boundary response.

This is a genuine composition law, not an analogy.

## 5. Covariance on retained ports

For an invertible change of retained coordinates \(Q\),

\[
R_n\mapsto
\begin{pmatrix}Q&0\\0&1\end{pmatrix}
R_n
\begin{pmatrix}Q^T&0\\0&1\end{pmatrix},
\]

the Schur response transforms as

\[
\mathscr S_c(R_n)
\mapsto
Q\mathscr S_c(R_n)Q^T.
\]

Elimination therefore commutes with boundary congruence. It is functorial with respect to the natural structure-group action on the retained carrier.

## 6. Relation to Jordan triples

For special Euclidean Jordan algebras, the triple product is

\[
\{X,Y,Z\}
=\frac12(XYZ+ZYX).
\]

Cone congruences and Peirce corners are native operations of the associated Jordan triple system. The Schur map is rational rather than trilinear, because it uses the inverse of the eliminated positive corner. But it is assembled from triple-system data:

- structure-group action by congruence;
- inversion in the positive corner;
- Peirce decomposition relative to the retained idempotent;
- projection back to the retained triple subsystem.

Therefore “Jordan-triple recursion” should be stated as recursive structure-group normalization plus Peirce restriction, not as repeated pointwise application of \(\{A,X,B\}\) alone.

This resolves a long-standing ambiguity in the programme's original implication.

## 7. Symmetry ladder

The conformal groups of the real symmetric Jordan cones form

\[
H_n(\mathbb R)
\longleftrightarrow
Sp(2n,\mathbb R).
\]

Recursive elimination gives

\[
Sp(2n,\mathbb R)
\rightsquigarrow
Sp(2n-2,\mathbb R)
\rightsquigarrow\cdots\rightsquigarrow
Sp(4,\mathbb R).
\]

The last nontrivial two-port rung has the accidental local isomorphism

\[
Sp(4,\mathbb R)
\simeq_{\rm loc}
Spin_0(2,3).
\]

This makes \(Spin(2,3)\) a universal two-port terminus of the real symmetric response hierarchy, not the symmetry of every higher-rank carrier.

## 8. What is order dependent

Although the effective response for a fixed retained boundary is independent of how the same interior set is eliminated, choosing a different retained boundary changes the result.

The hierarchy therefore needs physical incidence data specifying:

- which ports are observable;
- which are interior;
- which coarse-graining order corresponds to locality or scale;
- how port labels transform under the underlying dynamics.

The determinant alone does not choose this filtration.

## 9. Relation to statistics and conditional covariance

For a covariance matrix, the Schur complement is the conditional covariance of retained variables after conditioning on the eliminated variables. For a Dirichlet-to-Neumann or impedance matrix, it is the effective boundary response after solving the interior equations.

These are two standard physical readings of the same Jordan-cone operation. Both explain why positivity and determinant factorization survive recursion.

## 10. Stop-everything and falsification gates

**Physical filtration:** a microscopic causal or cellular model selects a canonical nested port filtration whose terminal nontrivial response is \(H_2(\mathbb R)\).

**Triple-system theorem:** the model's composition law is proved to coincide with structure-group normalization plus Peirce restriction.

**Observable determinant hierarchy:** successive conditional determinants or response volumes are measurable and obey the predicted product law.

**Order-arbitrariness failure:** no physical principle selects retained versus eliminated ports, leaving the hierarchy as coordinate-dependent linear algebra.

**Complex escape:** absorptive transport prevents a common real structure at some rung, replacing the real hierarchy by complex symmetric or Hermitian domains.

## 11. Certificate

The [recursive Schur--Jordan certificate](scripts/verify_recursive_schur_jordan_descent.mjs) verifies positivity, determinant recursion, unit-determinant block diagonalization, sequential-versus-block elimination, retained-coordinate covariance and the complete positive-pivot product on a four-port response.

## Companion documents

- [Three-port cubic consistency](200_three_port_h3r_cubic_consistency_and_spin23_edge_reduction.md)
- [Jordan-triple to Sp(4,R) determination](42_jordan_triple_to_sp4r_determination.md)
- [Finite-walk two-port response](156_walk_two_port_h2r_boundary_response.md)
- [Scalar-network subdivision](66_scalar_network_subdivision_invariants.md)
