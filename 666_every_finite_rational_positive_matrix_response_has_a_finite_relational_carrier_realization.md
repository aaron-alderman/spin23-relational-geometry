# Every Finite Rational Positive Matrix Response Has a Finite Relational-Carrier Realization

**Date:** 17 October 2026  
**Branches:** B01, B04, B05, B07, B08, B11 and the relational-carrier realization branch  
**Claim status:** exact finite-dimensional realization theorem for positive-definite ultraviolet slope  
**Worked certificate:** [verify_full_response_feshbach_hamiltonian.mjs](scripts/verify_full_response_feshbach_hamiltonian.mjs)

## Executive result

Let an (n\times n) rational matrix Herglotz response have the finite form

\[
F(z)=zM+Q+\sum_{a=1}^{N}\frac{R_a}{\lambda_a-z},
\]

where

\[
M>0,
\qquad Q=Q^T,
\qquad R_a\succeq0,
\qquad \lambda_a\in\mathbb R.
\]

Then (F) is, after whitening by (M), the exact Feshbach Schur complement of a finite real symmetric Hamiltonian. Equivalently, (-F^{-1}) is a congruence of a projected finite-dimensional resolvent.

This is not special to the quartic example. It is the general finite rational mechanism:

\[
\boxed{
\text{positive residues}
+\text{positive UV carrier metric}
\Longrightarrow
\text{finite Hermitian relational-carrier system}.
}
\]

## 1. Factor the positive residues

For each distinct pole choose a full-row-rank factor

\[
R_a=B_a^TB_a,
\qquad
B_a\in\mathbb R^{r_a\times n},
\qquad
r_a=\operatorname{rank}R_a.
\]

Stack the factors and pole energies:

\[
B=\begin{pmatrix}B_1\\ \vdots\\ B_N\end{pmatrix},
\qquad
H_0=\operatorname{diag}
(\lambda_1I_{r_1},\ldots,\lambda_NI_{r_N}).
\]

Then

\[
\sum_a\frac{R_a}{\lambda_a-z}
=-B^T(zI-H_0)^{-1}B.
\]

Positive spectral residues are therefore precisely outer products of relation maps from carrier coordinates to internal modes.

## 2. Whiten the ultraviolet carrier metric

Let

\[
C=M^{-1/2},
\qquad
\widehat F(z)=C F(z)C.
\]

Then

\[
\widehat F(z)
=zI-A-V^T(zI-H_0)^{-1}V,
\]

with

\[
A=-CQC,
\qquad
V=BC.
\]

Define the finite symmetric block Hamiltonian

\[
\boxed{
\mathcal H=
\begin{pmatrix}
A&V^T\\
V&H_0
\end{pmatrix}.
}
\]

The carrier block has dimension (n); the internal block has dimension

\[
r=\sum_a\operatorname{rank}R_a.
\]

Taking the Schur complement of (zI-H_0) in (zI-\mathcal H) gives exactly (widehat F(z)).

## 3. The dual response is a projected resolvent

Let (P) project the (n+r) dimensional state space onto its carrier coordinates. Block inversion gives

\[
P(zI-\mathcal H)^{-1}P^T=\widehat F(z)^{-1}.
\]

Undoing the whitening,

\[
\boxed{
F(z)^{-1}
=M^{-1/2}P(zI-\mathcal H)^{-1}P^TM^{-1/2}.
}
\]

Thus every pole of the dual response is an eigenvalue of the enlarged Hermitian system that has nonzero carrier overlap. A complete-system eigenstate invisible to the carrier would cancel from the projected response; minimality excludes such dark modes.

## 4. Minimal dimension

At a pole (lambda_a), a realization with internal eigenspace dimension (d_a) can produce a residue of rank at most (d_a). Therefore

\[
d_a\ge\operatorname{rank}R_a.
\]

The factorization above saturates this bound at every distinct pole. Subject to removal of carrier-invisible states and pole cancellations, the minimal realization dimension is consequently

\[
\boxed{
n+\sum_a\operatorname{rank}R_a.
}
\]

The quartic example has (n=2) and two rank-one residues, so its minimal complete system has dimension four. The explicit Hamiltonian in document 665 saturates the theorem.

## 5. The residue theorem becomes projected Born probability

Let (F(r)v=0) at a simple real zero. In whitened carrier coordinates the corresponding full eigenstate has carrier component

\[
u=M^{1/2}v.
\]

The same norm calculation as in the worked model gives

\[
\|\Psi_r\|^2=v^TF'(r)v.
\]

After normalizing the full state and transforming back to the original source coordinates, its carrier spectral residue is

\[
\boxed{
R_r=\frac{vv^T}{v^TF'(r)v}.
}
\]

The inverse-slope theorem is therefore the ordinary projection rule for normalized eigenstates. Positivity follows from Hilbert-space norm positivity, not merely from an algebraic accident of inversion.

## 6. Why this matters for the programme

This theorem gives a precise mathematical meaning to several recurring intuitions:

- **Russian dolls:** eliminating an internal block nests its resolvent inside the carrier kernel;
- **(A\,X\,B):** every self-energy is a relation--propagator--relation contraction (B^T X B);
- **smallest versus largest tensoring:** low-rank residues add individual relation channels, while block assembly retains their full coupled outer-product structure;
- **singular versus relational:** bare levels are singular data, while (B) determines how they become observable to the carrier;
- **bound versus free:** zeros of the effective inverse propagator are bound eigenmodes of the enlarged system;
- **Jordan carrier:** when (n=2), the symmetric carrier kernels lie in (H_2(\mathbb R)), whose conformal completion is (Sp(4,\mathbb R)\cong Spin_0(2,3)).

The theorem does not make that conformal completion a symmetry of (mathcal H). It establishes the response space on which the completion acts.

## 7. Standard-Model insertion point

The broken-phase incidence/(B-L) branch supplies positive (2\times2) spectral residue matrices from up, down, charged-lepton and neutrino sectors. If a finite rational approximation is made to those spectral measures, the theorem constructs a corresponding block Hamiltonian automatically:

1. factor each sector residue into physical matrix-element vectors;
2. place the associated threshold or pole energies in (H_0);
3. use the UV/OPE coefficient as (M);
4. use the subtraction tensor as (Q);
5. diagonalize the resulting complete relational-carrier Hamiltonian;
6. compare its carrier-projected modes with observable correlator poles.

For continua, sums become direct integrals and the finite Hamiltonian becomes a self-adjoint dilation on an infinite-dimensional space. The finite theorem is the controlled rational approximation, not permission to replace cuts by particles indiscriminately.

## 8. Hard boundaries

The theorem requires modification when:

1. (M) is singular, because ordinary whitening fails and a generalized pencil or self-adjoint relation is required;
2. residues are indefinite, because no Hilbert-space factorization (R=B^TB) exists;
3. poles are complex, because a closed finite Hermitian Hamiltonian cannot have them as eigenvalues;
4. branch cuts are essential, because an infinite bath or continuum is required;
5. gauge-null directions have not been quotiented before declaring positivity.

These are useful stop conditions, not technical footnotes.

## 9. Next gates

1. Apply the construction to the explicit up/down/electron residue matrices of document 655.
2. Replace declared poles by a sequence of positive rational approximants to physical spectral densities.
3. Determine which carrier basis is operationally fixed after incidence-current renormalization.
4. Test whether Feshbach elimination is the physical recursion represented by the Jordan triple.
5. Separate the full (Sp(4,\mathbb R)) response automorphism from the much smaller symmetry stabilizer of a particular realized Hamiltonian.

## Reproducibility

The four-state saturation of the theorem is checked by:

```powershell
node scripts\verify_full_response_feshbach_hamiltonian.mjs
```
