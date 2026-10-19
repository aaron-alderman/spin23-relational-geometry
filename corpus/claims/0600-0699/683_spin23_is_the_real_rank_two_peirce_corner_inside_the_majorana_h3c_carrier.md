# \(Spin(2,3)\) Is the Real Rank-Two Peirce Corner Inside the Majorana \(H_3(\mathbb C)\) Carrier

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B07, B08, B10, B11 and the nested-Jordan carrier branch  
**Claim status:** exact matrix-Jordan nesting; physical selection of the corner remains open  
**Certificate:** [verify_spin23_carrier_as_real_rank2_peirce_corner_of_h3c.mjs](../../../verification/verify/verify_spin23_carrier_as_real_rank2_peirce_corner_of_h3c.mjs)

## Executive result

The dynamic Majorana Nambu corner is \(H_3(\mathbb C)\), but the original \(Spin(2,3)\) carrier is not unrelated to it.

Let

\[
e=\operatorname{diag}(1,1,0)
\in H_3(\mathbb C).
\]

The rank-two Peirce corner is

\[
eH_3(\mathbb C)e
\cong H_2(\mathbb C).
\]

Entrywise complex conjugation fixes exactly its real symmetric slice:

\[
\boxed{
\left(eH_3(\mathbb C)e\right)^{\rm conj}
\cong H_2(\mathbb R).
}
\]

Therefore the carrier ladder is

\[
\boxed{
H_2(\mathbb R)
\subset
H_2(\mathbb C)
\subset
H_3(\mathbb C).
}
\]

Its conformal algebras are

\[
\boxed{
\mathfrak{sp}(4,\mathbb R)
\subset
\mathfrak{su}(2,2)
\subset
\mathfrak{su}(3,3),
}
\]

with

\[
\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3),
\qquad
\mathfrak{su}(2,2)\cong\mathfrak{so}(2,4).
\]

The earlier \(Spin(2,4)\to Spin(2,3)\) real-slice descent is thus nested inside the larger Majorana response carrier.

## 1. Exact corner embedding

Embed

\[
A\in H_2(\mathbb R)
\]

as

\[
\iota(A)=
\begin{pmatrix}
A&0\\
0&0
\end{pmatrix}
\in H_3(\mathbb C).
\]

Then

\[
e\iota(A)e=\iota(A).
\]

Ordinary matrix multiplication stays in the upper-left block, so

\[
\boxed{
\iota(A\circ B)=\iota(A)\circ\iota(B)
}
\]

and

\[
\boxed{
\iota(\{A,B,C\})
=\{\iota(A),\iota(B),\iota(C)\}.
}
\]

The certificate verifies both identities directly.

## 2. The rank-two corner is a boundary face

Every matrix supported on \(e\) has

\[
\det_{3\times3}\iota(A)=0.
\]

Hence the entire \(H_2\) corner lies on the rank-at-most-two boundary of the \(H_3(\mathbb C)\) positive cone.

This gives a precise geometric reading of the “middle pole”:

\[
\boxed{
\text{the \(Spin(2,3)\) carrier is a real rank-two boundary face of a larger rank-three complex response cone.}
}
\]

The statement is exact geometry. It does not explain why dynamics should remain on that face.

## 3. Three conformal rungs

The carrier nesting gives:

| Carrier | Real dimension | Conformal algebra |
|---|---:|---|
| \(H_2(\mathbb R)\) | 3 | \(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\) |
| \(H_2(\mathbb C)\) | 4 | \(\mathfrak{su}(2,2)\cong\mathfrak{so}(2,4)\) |
| \(H_3(\mathbb C)\) | 9 | \(\mathfrak{su}(3,3)\) |

This organizes three previously separate observations:

1. the real \(H_2\) carrier produces \(Spin(2,3)\);
2. allowing its missing imaginary Pauli direction produces the \(Spin(2,4)\) parent;
3. allowing the full three-generation Majorana-supported corner produces \(SU(3,3)\).

## 4. Exceptional-Jordan continuation

After choosing a complex subalgebra

\[
\mathbb C\subset\mathbb O,
\]

entrywise inclusion gives

\[
H_3(\mathbb C)\subset H_3(\mathbb O).
\]

The exceptional Jordan algebra has conformal algebra

\[
\mathfrak e_{7(-25)}.
\]

This produces the candidate larger ladder

\[
\boxed{
H_2(\mathbb R)
\subset
H_2(\mathbb C)
\subset
H_3(\mathbb C)
\subset
H_3(\mathbb O).
}
\]

The last embedding depends on a chosen complex direction in the octonions. It is not a canonical identification with Furey's particle ideals, nor evidence that \(E_{7(-25)}\) is a physical symmetry.

## 5. Relation to Furey's nested division algebras

Furey's programme emphasizes

\[
\mathbb R\subset\mathbb C\subset\mathbb H\subset\mathbb O
\]

and the way conjugations and left/right actions select Standard-Model representations.

The present ladder is different but compatible in spirit:

- division-algebra nesting changes allowed matrix entries;
- Peirce rank changes the number of observable faces;
- conjugation selects a real response slice;
- TKK completion converts the selected Jordan carrier into a conformal algebra.

The precise bridge to Furey's ideals must specify how her CAR/bimodule operators populate the entries of these Hermitian matrix systems.

## 6. The selection problem becomes sharper

There are now three possible physical regimes:

1. **real rank-two face:** \(H_2(\mathbb R)\), giving the desired \(Spin(2,3)\);
2. **complex rank-two parent:** \(H_2(\mathbb C)\), giving \(Spin(2,4)\);
3. **dynamic rank-three flavor/Nambu carrier:** \(H_3(\mathbb C)\), giving \(SU(3,3)\).

A valid theory must explain both reductions:

\[
H_3(\mathbb C)\longrightarrow H_2(\mathbb C)
\longrightarrow H_2(\mathbb R),
\]

or explain why the larger directions are external, massive, gauge, constrained or unobservable.

## 7. Stop-everything criteria

Stop calling \(Spin(2,3)\) the universal carrier symmetry if:

1. physical closure requires the full \(H_3(\mathbb C)\) corner;
2. no mechanism selects the rank-two Peirce projection;
3. the imaginary \(H_2(\mathbb C)\) direction remains dynamical;
4. Majorana/flavor variations leave the boundary face;
5. the exceptional continuation is treated as evidence without an operator map.

## 8. Next gates

1. Find a dynamical or operational origin for the rank-two Peirce projector \(e\).
2. Determine whether Furey exchange/conjugation selects the real fixed corner.
3. Compute the normal modes transverse to \(H_2(\mathbb R)\) inside \(H_3(\mathbb C)\).
4. Test whether stress--energy or causal positivity suppresses the third Peirce face.
5. Compare the \(H_3(\mathbb C)\subset H_3(\mathbb O)\) ladder with explicit exceptional-Jordan Standard-Model embeddings.

## Reproducibility

    node scripts\verify_spin23_carrier_as_real_rank2_peirce_corner_of_h3c.mjs
