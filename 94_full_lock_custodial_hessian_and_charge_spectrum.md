# Full-Lock Custodial Hessian and Charge Spectrum

**Date:** 17 October 2026  
**Branches:** B05, B06 and B11  
**Claim status:** exact tree-level Hessian for the custodial bitriplet sector; mixing with an ordinary Higgs doublet and loop splittings remain open

## 1. Custodial potential

Take

\[
V(L)
=-\mu^2S+\kappa\det L+\lambda_1S^2+\lambda_2Q,
\]

where

\[
S=\operatorname{tr}(L^TL),
\qquad
Q=\operatorname{tr}[(L^TL)^2].
\]

At

\[
L_0=kI_3,
\]

the stationarity condition is

\[
\boxed{
\mu^2=\frac12\kappa k+6\lambda_1k^2+2\lambda_2k^2.
}
\]

## 2. Representation decomposition

Every fluctuation \(X=L-L_0\) decomposes uniquely as

\[
\operatorname{Mat}_3(\mathbb R)
=\underbrace{\mathbb RI}_{\mathbf1}
\oplus
\underbrace{\mathfrak{so}(3)}_{\mathbf3}
\oplus
\underbrace{\operatorname{Sym}_3^0(\mathbb R)}_{\mathbf5}.
\]

These are respectively the trace singlet, antisymmetric triplet and symmetric-traceless fiveplet of the diagonal custodial group.

## 3. Exact Hessian eigenvalues

The field-space Hessian acts diagonally on the three subspaces:

\[
\boxed{
\begin{array}{c|c|c}
\text{custodial sector}&\text{multiplicity}&m^2\\ \hline
\mathbf1&1&\kappa k+24\lambda_1k^2+8\lambda_2k^2\\
\mathbf3&3&0\\
\mathbf5&5&-2\kappa k+8\lambda_2k^2.
\end{array}
}
\]

The triplet is exactly the Goldstone orbit of

\[
SO(3)_L\times SO(3)_R\to SO(3)_{\rm diag}.
\]

After gauging, it is eaten by the three massive electroweak combinations. The physical bitriplet amplitudes are one singlet and one fiveplet.

Local stability in the physical directions requires

\[
\kappa k+24\lambda_1k^2+8\lambda_2k^2>0,
\]

\[
-2\kappa k+8\lambda_2k^2>0.
\]

## 4. Electric-charge content

The unbroken electromagnetic generator is the third generator of the diagonal custodial group on the aligned vacuum. Therefore the spin-two fiveplet contains

\[
\boxed{Q=-2,-1,0,+1,+2.}
\]

The singlet has \(Q=0\). Doubly charged physical scalars are therefore unavoidable in a direct electroweak realization of the full carrier. They are not optional components that can be projected away while retaining the custodial fiveplet.

This provides a much sharper observable branch than the original abstract selector: the full-carrier completion predicts a structured charged multiplet unless its entire physical sector is taken above the accessible scale.

## 5. Relation to the observed Higgs

The custodial singlet could mix with a separate Higgs-doublet singlet in a larger model. The pure bitriplet alone has no Standard-Model fermion Yukawa structure derived here. Identifying its singlet with the observed Higgs requires:

- a chiral matter coupling;
- the measured pattern of gauge and fermion couplings;
- control of singlet mixing;
- viable masses and decays for the charged fiveplet;
- preservation of the custodial alignment under loops.

The Hessian solves the representation and mass-counting problem, not the phenomenology.

## 6. Stop-everything and falsification tests

**Positive:** the source theory predicts \(m_5/m_1\), the singlet mixing angle or a charged-fiveplet coupling without arbitrary potential choices.

**Negative:** no viable mass/coupling region survives once the external-index origin, custodial alignment, chiral matter and charged-state constraints are imposed together.

**Current result:** the complete tree-level physical scalar content and stability conditions are exact.

**Unsafe shortcut:** discuss only the neutral singlet while suppressing the custodially inseparable singly and doubly charged states.

## 7. Certificate

The [custodial Hessian certificate](scripts/verify-full-lock-custodial-hessian.mjs) builds the full linear Hessian operator at \(kI_3\), verifies normalized representative eigenvectors in all three sectors, their multiplicities and the analytic eigenvalues.

## Companion documents

- [Full-Jordan-carrier custodial completion](87_full_jordan_carrier_custodial_completion.md)
- [General Jordan-native full-lock potential](89_jordan_native_full_lock_potential.md)
- [Custodial scalar-loop closure](93_full_lock_custodial_loop_closure.md)
- [Custodial alignment and rho sensitivity](92_custodial_alignment_rho_sensitivity.md)
- [Fiveplet charge eigenstates and vertices](96_custodial_fiveplet_charge_eigenstates_and_vertices.md)

