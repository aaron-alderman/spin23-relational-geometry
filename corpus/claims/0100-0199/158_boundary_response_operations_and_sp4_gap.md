# Boundary Response Operations and the Gap to Full (Sp(4,\mathbb R))

**Date:** 17 October 2026  
**Branches:** B04, B07 and B08  
**Claim status:** exact finite-dimensional group calculation; physical realizability of the generators remains open

## 1. The question after obtaining (H_2(\mathbb R)_+)

The finite walk supplies a positive response

\[
X\in H_2(\mathbb R)_+.
\]

That identifies the Jordan cone. It does not yet identify the physical transformation group. The next question is:

> Which operations on a two-port response are induced by boundary redefinitions, passive attachments and duality, and which additional operations are required to generate (Sp(4,\mathbb R))?

## 2. Fractional action

Write a symplectic matrix in (2\times2) blocks:

\[
M=
\begin{pmatrix}
A&B\\C&D
\end{pmatrix}
\in Sp(4,\mathbb R).
\]

Its Jordan fractional action is

\[
\boxed{
X\mapsto(AX+B)(CX+D)^{-1}.
}

Where defined, symmetric (X) is mapped to another symmetric matrix.

The Lie algebra has the form

\[
\mathfrak{sp}(4,\mathbb R)
=
\left\{
\begin{pmatrix}
a&b\\c&-a^T
\end{pmatrix}
: b=b^T, c=c^T
\right\}.
\]

Its dimensions split as

\[
4+3+3=10.
\]

## 3. Three generator types

### 3.1 Boundary-coordinate changes

For (G\in GL(2,\mathbb R)),

\[
M_G=
\begin{pmatrix}
G&0\\0&G^{-T}
\end{pmatrix}
\]

acts by

\[
X\mapsto GXG^T.
\]

This is the four-dimensional structure group acting by congruence. It preserves (H_2(\mathbb R)_+).

### 3.2 Boundary quadratic additions

For symmetric (B),

\[
T_B=
\begin{pmatrix}
I&B\\0&I
\end{pmatrix}
\]

acts by

\[
X\mapsto X+B.
\]

If (B\ge0), this preserves positivity and represents adding passive boundary precision. But positive additions form a semigroup: the inverse uses (-B), which need not preserve the cone.

### 3.3 Duality and lower shears

The Fourier/Legendre element

\[
S=
\begin{pmatrix}
0&-I\\I&0
\end{pmatrix}
\]

acts by

\[
X\mapsto-X^{-1}.
\]

Conjugating upper translations by (S) yields lower shears

\[
X\mapsto(X^{-1}+C)^{-1},
\qquad C=C^T.
\]

Congruences, arbitrary symmetric upper translations and arbitrary symmetric lower generators span all ten Lie-algebra directions.

## 4. Positivity is not invariant under the full conformal group

The real positive cone is preserved by congruence, and mapped into itself by positive additions. It is not preserved by every conformal generator:

- (X=I) translated by (B=-2I) becomes (-I);
- the Fourier element maps (I) to (-I).

This is not a contradiction. The full conformal group acts naturally on the compactified Jordan algebra, or on an associated Siegel tube domain, not as a global automorphism group of the positive real cone.

The cone automorphism/structure group and conformal group must therefore be distinguished:

\[
GL(2,\mathbb R)
\subsetneq
Sp(4,\mathbb R).
\]

## 5. What the passive walk supplies

The verified walk operations presently supply:

- a positive cone point (X);
- changes of normalized boundary basis, hence congruences;
- Schur elimination and passive positive additions;
- order-independent sewing.

These form a restricted positivity-preserving category or semigroup. They do not automatically supply:

- arbitrary negative boundary translations;
- response inversion as a physical Dirichlet/Neumann duality;
- all lower-shear directions;
- passage through the conformal boundary where (CX+D) becomes singular.

Therefore the inference

\[
\text{positive two-port response}
\Longrightarrow
\text{physical }Sp(4,\mathbb R)
\]

is invalid without additional boundary operations.

## 6. A precise bridge criterion

To derive the full group, the programme must exhibit physically admissible operations realizing:

1. all (GL(2,\mathbb R)) congruences or a generating subgroup;
2. three independent symmetric boundary additions with both signs or an analytic continuation justifying them;
3. a canonical response/impedance duality implementing inversion;
4. closure under composition on a specified compactified or complexified response domain;
5. compatibility with passivity, causality and the selected real structure.

If only positive additions are physical, the correct object is a semigroup, not (Sp(4,\mathbb R)).

## 7. Relation to the Jordan-triple goal

The exact algebraic implication

\[
H_2(\mathbb R)
\Longrightarrow
\operatorname{Conf}(H_2(\mathbb R))
\cong Sp(4,\mathbb R)/\{\pm I\}
\]

remains valid as a statement about the Jordan conformal completion. The walk result establishes the carrier but not the premise that every conformal transformation is dynamically available.

This separates two meanings of “emergence”:

- **kinematic emergence:** the state/response variable belongs to the Jordan cone;
- **dynamical emergence:** physically realizable compositions generate the conformal group.

Only the first has been achieved by the current walk.

## 8. Stop-everything and falsification gates

**Full-group advance:** derive response inversion and signed boundary translations from causal boundary experiments or canonical phase-space exchange.

**Semigroup result:** prove passivity restricts the physical operations permanently to a proper compression semigroup; then (Sp(4,\mathbb R)) is a mathematical completion, not a microscopic symmetry.

**Complex-domain rescue:** show that retarded response naturally lives in the Siegel upper half-space, where the full symplectic action preserves the positive imaginary part.

**Failure:** admissible walk operations generate only trivial rescalings or a subgroup too small to constrain physics.

## 9. Certificate

The [boundary-operation (Sp(4)) gap certificate](../../../verification/verify/verify_h2r_boundary_operations_sp4_gap.mjs) verifies the symplectic generators, their fractional actions, the ten-dimensional Lie-algebra span and explicit failures of global real-cone positivity.

## Companion documents

- [Finite-walk (H_2(\mathbb R)) response](156_walk_two_port_h2r_boundary_response.md)
- [Exact Jordan triple to (Sp(4,\mathbb R))](../0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [Contractive scattering coordinates](../0000-0099/68_jordan_response_to_contracting_scattering.md)
- [Lorentzian passivity and causal response](../0000-0099/70_lorentzian_passivity_and_causal_response.md)
