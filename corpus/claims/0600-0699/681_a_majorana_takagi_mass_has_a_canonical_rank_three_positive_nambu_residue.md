# A Majorana Takagi Mass Has a Canonical Rank-Three Positive Nambu Residue

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the Majorana/Nambu carrier branch  
**Claim status:** exact finite-dimensional positive completion; derivation as a physical spectral residue remains open  
**Certificate:** [verify_minimal_positive_takagi_nambu_residue.mjs](../../../verification/verify/verify_minimal_positive_takagi_nambu_residue.mjs)

## Executive result

Let a full-rank complex symmetric Majorana mass have Takagi form

\[
M=U^*DU^\dagger,
\qquad
D=\operatorname{diag}(m_1,m_2,m_3)>0.
\]

Define

\[
|M|=(M^\dagger M)^{1/2},
\qquad
|M^\dagger|=(MM^\dagger)^{1/2}.
\]

Then the Nambu block

\[
\boxed{
\mathcal R_M=
\begin{pmatrix}
|M^\dagger|&M\\
M^\dagger&|M|
\end{pmatrix}
\succeq0
}
\]

is a canonical positive residue of rank three. It contains:

- the normal positive mass data in its diagonal blocks;
- the anomalous Majorana mass in its off-diagonal blocks;
- the Dirac and Majorana mixing phases through the Takagi matrix \(U\).

This is the smallest positive six-by-six Nambu completion of a full-rank three-generation Majorana mass.

## 1. Polar factorization

The polar decomposition is

\[
M=U_p|M|,
\qquad
U_p=U^*U^\dagger.
\]

The polar factor \(U_p\) is unitary and symmetric. Therefore

\[
\begin{aligned}
\mathcal R_M
&=
\begin{pmatrix}
U_p|M|U_p^\dagger&U_p|M|\\
|M|U_p^\dagger&|M|
\end{pmatrix}\\
&=
\begin{pmatrix}
U_p\\I
\end{pmatrix}
|M|
\begin{pmatrix}
U_p^\dagger&I
\end{pmatrix}.
\end{aligned}
\]

This is a Gram factorization, proving positivity.

Because \(|M|>0\) has rank three,

\[
\boxed{
\operatorname{rank}\mathcal R_M=3.
}
\]

No smaller internal residue rank can reproduce a full-rank three-generation anomalous mass block.

## 2. Support graph

The support projector is

\[
\boxed{
\Pi_M=\frac12
\begin{pmatrix}
I&U_p\\
U_p^\dagger&I
\end{pmatrix}.
}
\]

It obeys

\[
\Pi_M^2=\Pi_M,
\qquad
\Pi_M\mathcal R_M=\mathcal R_M.
\]

Thus the Majorana residue lives on the graph of the symmetric polar unitary \(U_p\). This is the Nambu analogue of the CKM graph projector, with the additional particle--hole/Takagi constraint.

## 3. Relation to Hermitian mass-square data

The lower normal block is

\[
|M|=U D U^\dagger
\]

and satisfies

\[
|M|^2=M^\dagger M.
\]

The upper block is its particle--hole conjugate:

\[
|M^\dagger|=U^*DU^T,
\qquad
|M^\dagger|^2=MM^\dagger.
\]

Squaring removes part of the Takagi phase information, which is why \(H_\nu\) is Majorana blind. The off-diagonal \(M\) and graph unitary \(U_p\) retain it.

## 4. Carrier enlargement

The original relational carrier used a two-by-two real source index. The minimal Majorana completion instead introduces a six-dimensional complex Nambu space with a rank-three supported corner.

On its support, the full Hermitian observable algebra is naturally

\[
H_3(\mathbb C),
\]

not another copy of \(H_2(\mathbb R)\). The original face carrier may embed as an independent factor or subtriple, but Majorana data cannot be compressed into it without losing phases.

This is a concrete reason the low-energy broken-\(B-L\) carrier may have higher rank.

## 5. What is and is not physical

Established here:

1. canonical construction from any invertible Takagi mass;
2. Hermiticity and positivity;
3. rank-three minimality;
4. retention of Majorana phases;
5. exact graph support.

Not established:

1. that \(\mathcal R_M\) is the residue of a particular gauge-invariant correlator;
2. its Lorentz and momentum dependence;
3. compatibility with the seesaw heavy-state continuum;
4. reflection positivity after the full field-theory quotient;
5. a dynamical coupling to the \(Spin_0(2,3)\) face carrier.

## 6. Stop-everything criteria

Stop treating \(\mathcal R_M\) as a physical spectral residue if:

1. no anomalous Nambu correlator produces its off-diagonal block;
2. gauge or Lorentz typing forbids the proposed source pair;
3. positivity fails after removing redundant Nambu degrees of freedom;
4. the Takagi phases are unobservable in the selected process;
5. the six Nambu coordinates are counted as six new particles.

## 7. Next gates

1. Derive \(\mathcal R_M\) from a free Majorana Euclidean two-point function.
2. Add the \(B-L\)-breaking order parameter and seesaw heavy states.
3. Determine the Jordan triple of the supported Nambu corner.
4. Embed the original \(H_2(\mathbb R)\) face triple and test mixed curvature.
5. Extend positive continuum quadrature to anomalous Nambu spectral measures.

## Reproducibility

    node scripts\verify_minimal_positive_takagi_nambu_residue.mjs
