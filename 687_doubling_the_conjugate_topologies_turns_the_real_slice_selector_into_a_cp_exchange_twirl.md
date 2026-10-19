# Doubling the Conjugate Topologies Turns the Real-Slice Selector into a Completely Positive Exchange Twirl

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B07, B08, B11 and the doubled-topology selector branch  
**Claim status:** exact completely positive realization on a doubled encoded sector; topology-superselection origin remains open  
**Certificate:** [verify_doubled_conjugate_exchange_gives_cp_real_slice_selector.mjs](scripts/verify_doubled_conjugate_exchange_gives_cp_real_slice_selector.mjs)

## Executive result

The direct projection

\[
A\mapsto\operatorname{Re}A
\]

is positive but not completely positive on one complex two-level system. It acquires a completely positive realization after doubling the conjugate topology.

Encode

\[
\boxed{
\iota(A)=
\begin{pmatrix}
A&0\\
0&\bar A
\end{pmatrix}.
}
\]

Let \(S\) exchange the two blocks. Define the exchange twirl

\[
\boxed{
\mathcal T(O)=\frac12(O+SOS).
}
\]

Then

\[
\boxed{
\mathcal T(\iota(A))
=\iota(\operatorname{Re}A).
}
\]

Unlike direct transpose averaging, \(\mathcal T\) is a random-unitary quantum channel with Kraus operators

\[
\frac{I}{\sqrt2},
\qquad
\frac{S}{\sqrt2}.
\]

It is completely positive, trace preserving, unital and idempotent.

## 1. Linearizing conjugation

Complex conjugation is anti-linear on one sector. On the doubled conjugate pair

\[
\mathcal H\oplus\bar{\mathcal H},
\]

it becomes the linear unitary exchange

\[
S:
\mathcal H\leftrightarrow\bar{\mathcal H}.
\]

For the encoded observable,

\[
S\iota(A)S
=
\begin{pmatrix}
\bar A&0\\
0&A
\end{pmatrix}.
\]

Averaging gives

\[
\mathcal T(\iota(A))
=
\begin{pmatrix}
(A+\bar A)/2&0\\
0&(A+\bar A)/2
\end{pmatrix}.
\]

For Hermitian \(A\), this is the encoded real symmetric observable.

## 2. Why complete positivity is restored

The twirl has the Kraus form

\[
\mathcal T(O)
=K_0OK_0^\dagger+K_1OK_1^\dagger,
\]

with

\[
K_0=\frac{I}{\sqrt2},
\qquad
K_1=\frac{S}{\sqrt2},
\]

and

\[
K_0^\dagger K_0+K_1^\dagger K_1=I.
\]

Thus the obstruction in document 686 is not bypassed locally. It is resolved by changing the system: conjugation becomes an ordinary unitary symmetry only after the conjugate sector is included.

## 3. The essential superselection boundary

The full exchange-fixed algebra on the doubled space is larger than \(H_2(\mathbb R)\). It includes topology-coherent observables of the form

\[
\begin{pmatrix}
0&Q\\
Q&0
\end{pmatrix},
\]

which are fixed by exchange but are not encoded real-corner observables.

Therefore

\[
\boxed{
\text{exchange fixing alone does not select exactly }H_2(\mathbb R).
}
\]

One must additionally restrict to the conjugate-paired block-diagonal encoded sector. This requires:

- topology superselection;
- absence of coherent transitions between conjugate sectors;
- a large energy penalty for off-diagonal topology coherence;
- or an operator-typing rule that declares those blocks auxiliary.

## 4. Connection to the Furey branch

The Furey analysis already produced:

- two exchanged topology sectors;
- a neutral exchange intertwining the completed Standard-Model module;
- an exchange-fixed \(H_2(\mathbb R)\) observable carrier;
- a distinction between topology exchange and CAR charge conjugation.

The doubled channel supplies the missing quantum-information mechanism:

\[
\boxed{
\text{conjugate topology doubling}
+\text{unitary exchange twirl}
+\text{topology superselection}
\Longrightarrow
\text{CP real-slice selection}.
}
\]

The remaining question is whether the Furey action or vacuum actually enforces the required block-diagonal superselection without adding propagating mirror matter.

## 5. Flavor CP is not erased

The twirl need act only on the external topology/face factor. Complex CKM, PMNS and Takagi data can remain in an internal flavor factor:

\[
\mathcal T_{\rm topology}\otimes\operatorname{id}_{\rm flavor}.
\]

This preserves complete positivity and leaves internal CP invariants untouched.

A nonfactorizable topology--flavor exchange would require a separate audit.

## 6. Stop-everything criteria

Stop claiming exact \(H_2(\mathbb R)\) selection from doubling if:

1. off-diagonal topology coherences remain physical and gapless;
2. the doubled sector creates propagating mirror states;
3. exchange does not preserve the Standard-Model module or action;
4. the twirl acts on flavor and erases observed CP;
5. topology superselection is imposed solely to obtain the desired answer.

## 7. Next gates

1. Identify the doubled blocks with the explicit Furey exchanged TRO sectors.
2. Compute whether gauge and Yukawa interactions generate topology coherences.
3. Construct an exchange-invariant gap for off-diagonal topology operators.
4. Verify that only one physical matter copy propagates.
5. Combine the heavy-third-face gap with the doubled exchange selector in one action.

## Reproducibility

    node scripts\verify_doubled_conjugate_exchange_gives_cp_real_slice_selector.mjs
