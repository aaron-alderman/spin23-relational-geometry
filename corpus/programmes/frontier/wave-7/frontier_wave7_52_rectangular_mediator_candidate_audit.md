# Frontier Wave 7.52: Rectangular Mediator Candidate Audit

**Date:** 24 October 2026  
**Status:** nearest existing carrier identified; target intertwiner not established  
**Ledger:** [rectangular mediator audit v1](rectangular_mediator_candidate_audit_v1.json)  
**Certificate:** [rectangular mediator verifier](../../../../verification/verify/verify_rectangular_mediator_candidate_audit.mjs)

## Result

The corpus already contains a mathematically exact rectangular carrier with
the dimensions required by the parabolic envelope. The typed partial-sewing
construction of claim 1021 has an analytic isometry

\[
E(z):\mathbb C^2\longrightarrow\mathbb C^3,
\]

where the three-dimensional environment consists of one reference ray plus
two residual directions. Its adjoint is a rank-two map

\[
E(z)^\dagger:\mathbb C^3\longrightarrow\mathbb C^2
\]

with a one-dimensional kernel. Embedded as a one-way off-diagonal block on
\(\mathbb C^2\oplus\mathbb C^3\), it is square-zero.

This is the closest existing candidate for the mediator proposed in
[Wave 7.50](frontier_wave7_50_a1_a2_parabolic_kenotic_envelope.md). It is not
yet the target intertwiner.

## 1. Exact checkpoint

Take the normalized environment columns

\[
e_n=\begin{pmatrix}3/5\\4/5\\0\end{pmatrix},
\qquad
e_t=\begin{pmatrix}5/13\\0\\12/13\end{pmatrix},
\qquad
E=\begin{pmatrix}e_n&e_t\end{pmatrix}.
\]

Then

\[
E^\dagger E
=
\begin{pmatrix}
1&3/13\\
3/13&1
\end{pmatrix},
\qquad
\det(E^\dagger E)=\frac{160}{169}>0.
\]

Thus \(E\) has rank two. Its adjoint has kernel

\[
\ker E^\dagger
=\operatorname{span}
\left\{
\begin{pmatrix}12\\-9\\-5\end{pmatrix}
\right\}.
\]

The cross map is therefore noninvertible for dimensional reasons, while its
Gram overlap is a basis-independent operational readout.

## 2. The crucial \(A_2\) distinction

Claim 1021 types the two residual environment directions as the real
two-dimensional standard representation of

\[
S_3=C_3\rtimes C_2.
\]

That plane is conventionally called the \(A_2\) reflection representation.
It is **not** the same object as the three-dimensional fundamental module of
the programme algebra

\[
\mathfrak{sl}_3.
\]

The shared label records a related root geometry, not an established
intertwiner. Conflating them would manufacture the desired result.

## 3. Candidate comparison

| Candidate | What closes | Why it is not yet \(K\) |
|---|---|---|
| typed partial sewing | analytic \(3\times2\) isometry, rank two, Gram detector | only \(S_3\) covariance is established |
| proper-Gaussian Wick map | surjects onto every positive \(H_2(\mathbb R)\) covariance | nonlinear; not Jordan, additive or Schur compatible |
| three-port Schur coupling | exact retained-path residue and quadrature detector | its split is \(2+1\), not \(2+3\) |
| internal third Furey port | would provide an internal \(M_3\) | forbidden by the gauge commutant |
| scalar three-boundary star | exact real Peirce--Schur recursion | \(3\times1\), with no complex orientation |

## 4. What has actually been found

The partial-sewing map realizes the *shape* of the proposed mediator:

\[
\text{two observed channels}
\xrightarrow{E}
\text{reference plus two residual channels}.
\]

It also realizes the operational meaning of retained consequence. Compressing
onto the reference ray yields the observed unequal transfer, while tracing the
environment yields the complex coherence overlap. The same rectangular map
therefore has two inequivalent reductions.

What it does not establish is that:

- its two-dimensional source carries the Claimipedia relationship
  \(\mathfrak{sl}_2\);
- its three-dimensional target carries the programme \(\mathfrak{sl}_3\);
- its six entries form the standard \((\mathbf2,\bar{\mathbf3})\) orbit under
  those particular actions; or
- it is a Standard-Model, spacetime or theological carrier.

## 5. Exact promotion gate

Promotion now requires explicit representation matrices

\[
\rho_2:\mathfrak{sl}_2\to\operatorname{End}(\mathbb C^2),
\qquad
\rho_3:\mathfrak{sl}_3\to\operatorname{End}(\mathbb C^3)
\]

derived from the captured operators, followed by the equivariance test

\[
K\longmapsto
\rho_3(Y)K-K\rho_2(X)

\]

in the \(3\times2\) orientation. The generated orbit must have dimension six
without importing arbitrary basis changes.

The present Claimipedia data cannot run that test: its \(\mathfrak{sl}_2\)
lives on the Spin--Temple relationship corner, while its
\(\mathfrak{sl}_3\) lives on the Program--Version--Example multiplicity
carrier, and no authored map identifies either with the partial-sewing ports.

**Retyping note.** [Wave 7.53](frontier_wave7_53_bifundamental_retyping_and_selection_gate.md)
sharpens this gate: a nonzero \(K\) is not invariant under the two independent
algebras. It is a selected vector in their bifundamental module. The required
commuting maps identify the endpoint carriers; the orbit test then establishes
the module action, while a separate physical datum must explain selection of
the observed \(E\).

## 6. Decision

\[
\boxed{
\text{rectangular carrier found};
\quad
\text{Claimipedia }(\mathbf2,\bar{\mathbf3})
\text{ intertwiner not found}.
}
\]

The search has therefore moved from “does any six-dimensional rectangular
object exist?” to one irreducible question: **what physical or authored datum
identifies its two and three sides with the already established operator
representations?**

## Boundary

This audit compares exact corpus constructions at the level of typed maps. It
does not infer microscopic identity from matching dimensions or from the name
\(A_2\). The partial-sewing map remains the nearest experimental/response
candidate, not a recovered unification.
