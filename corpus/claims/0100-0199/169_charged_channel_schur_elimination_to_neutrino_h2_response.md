# Charged-Channel Schur Elimination Produces the Neutral \(H_2\) Response

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B07, B08 and B11  
**Claim status:** exact conditional response theorem for positive quadratic kernels; microscopic kernel derivation remains open

## 1. Setup

The neutrino-completed linking component is

\[
M_3(\mathbb C)_{(E;C,D)}.
\]

Reorder it as

\[
(E,D)\oplus C,
\]

so the two neutral boundary faces come first and the charged direction is internal. Let a self-adjoint quadratic kernel be

\[
K=
\begin{pmatrix}
A&b\\
b^\dagger&c
\end{pmatrix},
\]

where

\[
A\in H_2(\mathbb C),
\qquad b\in\mathbb C^2,
\qquad c\in\mathbb R_{>0}.
\]

Assume \(K\ge0\). Treating \(C\) as an unobserved/internal channel means minimizing or Gaussian-integrating over it.

## 2. Exact response

The induced neutral response is the Schur complement

\[
\boxed{
R_\nu=A-bc^{-1}b^\dagger.
}
\]

The block factorization

\[
K=
\begin{pmatrix}
I&bc^{-1}\\0&1
\end{pmatrix}
\begin{pmatrix}
R_\nu&0\\0&c
\end{pmatrix}
\begin{pmatrix}
I&0\\c^{-1}b^\dagger&1
\end{pmatrix}
\]

shows immediately that

\[
K\ge0, c>0
\quad\Longleftrightarrow\quad
R_\nu\ge0.
\]

It also gives

\[
\det K=c\det R_\nu.
\]

Thus the determinant/norm on the two-face response is inherited exactly from the full three-channel kernel.

## 3. Gauge invariance after eliminating the charged channel

Hypercharge acts as

\[
U(\theta)=
\begin{pmatrix}
I_2&0\\0&e^{i\theta}
\end{pmatrix}.
\]

Under

\[
K\mapsto U(\theta)KU(\theta)^\dagger,
\]

the blocks transform as

\[
A\mapsto A,
\qquad
b\mapsto e^{-i\theta}b,
\qquad
c\mapsto c.
\]

Therefore

\[
bc^{-1}b^\dagger
\mapsto
bc^{-1}b^\dagger
\]

and

\[
\boxed{
R_\nu\text{ is exactly gauge invariant.}
}
\]

The charged microscopic phase is removed without selecting a gauge.

## 4. Reciprocity and the real slice

If the microscopic kernel is fixed by entrywise conjugation in the endpoint basis,

\[
\overline K=K,
\]

then \(A,b,c\) are real and

\[
R_\nu\in H_2(\mathbb R).
\]

For a general complex Hermitian positive kernel,

\[
R_\nu\in H_2(\mathbb C)_+.
\]

The reciprocal projection

\[
\mathbb E(R_\nu)
=\frac12(R_\nu+\overline{R_\nu})
=\operatorname{Re}R_\nu
\]

is a real symmetric positive matrix. Indeed, for every real vector \(x\),

\[
x^T\operatorname{Re}(R_\nu)x
=x^\dagger R_\nu x\ge0.
\]

Hence

\[
\boxed{
K\ge0
\Longrightarrow
\mathbb E(R_\nu)\in H_2(\mathbb R)_+.
}
\]

This is the same positive reciprocity projection found in the orientation-complete walk response.

## 5. Exact match to the boundary-response branches

Three independently motivated constructions now use the same operation:

1. scalar interval/network sewing integrates out common boundary values;
2. finite quantum-walk response integrates out interior sites;
3. the neutrino linking factor integrates out the charged \(C\) channel.

In every case:

\[
\text{positive larger kernel}
\xrightarrow{\text{Schur complement}}
\text{positive two-port kernel}.
\]

This does not prove the three systems are physically identical. It establishes a common functorial composition law rather than a shared dimension coincidence.

## 6. Sewing and associativity

If further internal channels are present, Schur complementation is associative whenever the required inverse blocks exist:

\[
\operatorname{Schur}_{I_2}
\bigl(\operatorname{Schur}_{I_1}K\bigr)
=
\operatorname{Schur}_{I_1\oplus I_2}K.
\]

Therefore eliminating charged and microscopic walk channels in stages gives the same final \(D/E\) response as eliminating them together. This is the algebraic sewing property required of a boundary theory.

## 7. What remains conditional

The theorem begins from a positive quadratic kernel. The matter TRO and linking algebra alone do not supply one. A physical derivation must specify:

- whether \(K\) is an Euclidean Hessian, retarded inverse propagator, Dirichlet-to-Neumann operator or transfer-kernel Cayley transform;
- why \(E,D\) are accessible boundary variables while \(C\) is internal;
- how Lorentzian continuation preserves causality and spectral positivity;
- whether Yukawa and gauge loops maintain the block positivity and reciprocity condition;
- how the full \(Sp(4,\mathbb R)\) domain action becomes physically realizable rather than merely a cone automorphism.

## 8. Stop-everything and falsification gates

**Stop-everything positive:** derive \(K(\omega,\mathbf p)\) from the second-quantized Furey/walk action and show that its charged-channel Schur complement equals the external two-port retarded response, including the same spectral measure and sewing law.

**Radiative success:** gauge and Higgs corrections preserve positivity and generate only exchange-even renormalizations of the neutral response.

**Boundary failure:** the physical source couples directly to \(C\) with no superselection or energy separation, so eliminating it is not an observable operation.

**Positivity failure:** the Lorentzian kernel has unavoidable ghosts or upper-half-plane violations even though its Euclidean Hessian is positive.

**Symmetry demotion:** the response remains a generic positive \(H_2\) kernel but no physical operation realizes the noncompact \(Sp(4)\) generators.

## 9. Certificate

The [charged-channel Schur-response certificate](../../../verification/verify/verify_charged_channel_schur_response.mjs) uses exact Gaussian-rational arithmetic to verify Hermiticity, positivity by factorization, gauge invariance, determinant inheritance, positivity of the real reciprocal projection and the real-kernel fixed case.

## Companion documents

- [Neutrino Peirce corner](168_neutrino_peirce_corner_restores_gauge_neutral_h2r.md)
- [Finite-walk two-port response](156_walk_two_port_h2r_boundary_response.md)
- [Scalar-network subdivision invariants](../0000-0099/66_scalar_network_subdivision_invariants.md)
- [Antiunitary reciprocity selector](161_antiunitary_reciprocity_selector_and_five_directions.md)

