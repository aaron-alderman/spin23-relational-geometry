# Frontier Wave 7.50: The \(A_1+A_2\) Parabolic Kenotic Envelope

**Date:** 24 October 2026  
**Status:** exact minimal representation-theoretic envelope; corpus realization remains open  
**Ledger:** [parabolic kenotic envelope v1](a1_a2_parabolic_kenotic_envelope_v1.json)  
**Certificate:** [parabolic envelope verifier](../../../../verification/verify/verify_a1_a2_parabolic_kenotic_envelope.mjs)

## Result

The smallest standard block algebra joining a two-state local carrier to a
three-state global carrier by a one-way mediator is not \(C_2\). It is the
maximal \((2,3)\) parabolic subalgebra of \(\mathfrak{sl}_5\):

\[
\boxed{
\mathfrak p_{2,3}
=
\left(
\mathfrak{sl}_2
\oplus\mathfrak{sl}_3
\oplus\mathfrak{gl}_1
\right)
\ltimes
\operatorname{Hom}(\mathbb C^3,\mathbb C^2).
}
\]

Its Levi factor has dimension \(3+8+1=12\). Its one-way mediator module has
dimension six, is abelian under the Lie bracket, and is square-zero under block
matrix multiplication. The full parabolic has dimension eighteen.

## 1. The matrix

On

\[
\mathbb C^5=\mathbb C^2\oplus\mathbb C^3,
\]

write

\[
X=
\begin{pmatrix}
A&M\\
0&D
\end{pmatrix},
\qquad
\operatorname{tr}A+\operatorname{tr}D=0.
\]

The diagonal blocks generate

\[
\mathfrak{sl}_2\oplus\mathfrak{sl}_3\oplus\mathfrak{gl}_1.
\]

The off-diagonal block

\[
M\in\operatorname{Hom}(\mathbb C^3,\mathbb C^2)
\cong\mathbb C^2\otimes(\mathbb C^3)^*
\]

transforms under both factors as \((\mathbf2,\bar{\mathbf3})\), but it is not a
new semisimple generator. For two such blocks,

\[
M_1M_2=0,
\qquad [M_1,M_2]=0.
\]

This is the exact algebraic type suggested by a one-way relation between the
two-state and three-state systems.

## 2. Why this matters for the Claimipedia result

The operator exhaustion found

\[
\mathfrak{sl}_2\oplus\mathfrak{sl}_3
\]

as the combined authored semisimple Lie content, surrounded by one-way radical
extensions. The parabolic model shows how those ingredients can belong to one
coherent algebra without becoming \(\mathfrak{sp}_4\): the radical can be a
bimodule carrying typed mediation between the two simple factors.

This changes the role of the missing object. It need not be another root of the
same symmetry algebra. It may be a morphism

\[
K:\mathbb C^3\longrightarrow\mathbb C^2
\]

that transforms under both systems but has no inverse. Such an object is where
the three-port Schur descent, chart change and kenotic non-return can meet.

## 3. The reverse-map test

Adjoin one nonzero reverse block

\[
L:\mathbb C^2\longrightarrow\mathbb C^3.
\]

The Lie closure generates every traceless \(5\times5\) matrix:

\[
\left\langle
\mathfrak p_{2,3},L
\right\rangle_{\mathrm{Lie}}
=\mathfrak{sl}_5,
\qquad \dim\mathfrak{sl}_5=24.
\]

Thus freely restoring the missing inverse does **not** produce
\(C_2\cong\mathfrak{sp}_4\). It produces \(A_4\).

This is an important stop rule:

\[
\boxed{
\text{one-way }(2,3)\text{ mediation}
\xrightarrow{\text{free reverse closure}}
A_4,
\quad\text{not }C_2.
}
\]

Any genuine \(C_2\) route must instead identify a four-dimensional symplectic
carrier and satisfy its asymmetric Cartan and Serre relations. It cannot be
obtained merely by reversing the proposed \(2\leftrightarrow3\) map.

## 4. Wick and kenosis in the parabolic language

The Levi factor governs reversible transformations internal to each carrier.
The nilradical governs typed passage between carriers. Accordingly:

- a Wick-like operation changes the real structure used to interpret a local
  carrier;
- the cross block transports the resulting state or relation into the other
  carrier;
- kenosis is the absence of the lower reverse block;
- retained consequence appears through composites such as Schur terms rather
  than through an inverse symmetry.

The open triangular form is therefore constitutive, not merely incomplete.
Closing it by reflection changes the algebraic species.

## 5. A significant but bounded signpost

The Levi type

\[
A_1+A_2+\mathfrak{gl}_1
\]

is also the complex Lie-algebra type underlying
\(SU(2)\times SU(3)\times U(1)\). The six-dimensional cross module resembles a
bifundamental. This is a representation-theoretic signpost only: the model
does not supply compact real forms, hypercharge normalization, chirality,
anomaly cancellation, particle assignments, an action or measured couplings.

## 6. Exact next gate

To promote this envelope from a minimal model to a corpus result, find one
authored operator \(K\) and prove:

1. its domain carries the programme \(\mathfrak{sl}_3\) representation;
2. its codomain carries the relationship \(\mathfrak{sl}_2\) representation;
3. its orbit under \(\mathfrak{sl}_2\oplus\mathfrak{sl}_3\) has the predicted
   six-dimensional bimodule structure;
4. its same-direction composites are zero or have a separately typed target;
5. no reverse operator is silently introduced; and
6. a detector or semantic query reads a basis-independent invariant of the
   mediated path.

The current Claimipedia capture supplies no such cross-operator. The result is
therefore a sharply specified target, not a discovery of \(SL_5\) in the
corpus.

## Boundary

This is exact matrix algebra and an explicit closure theorem. Its use of
“kenotic” names the one-way, non-invertible role of the nilradical. It does not
identify a gauge group, particle multiplet, divine mechanism or new physics.
