# Vacuum Locality Closes the Two-Current Spectral Measure on \(H_2(\mathbb R)\), but Not the Thermal Response

**Date:** 17 October 2026  
**Programme gate:** G03, with consequences for G04 and G06  
**Claim status:** exact conditional theorem for the Lorentz-invariant vacuum; finite-temperature/KMS and subtraction completion remain conditional  
**Certificate:** [verify_programme_vacuum_two_current_h2r_closure.mjs](../../../verification/verify/verify_programme_vacuum_two_current_h2r_closure.mjs)

## Result in ordinary language

Imagine two microphones listening to the same room. A raw list of complex wave amplitudes need only produce a complex Hermitian covariance matrix. But if the room has no preferred direction or motion, the microphones are represented by local Hermitian observables, and exchanging the two listening events is physically the same experiment in reverse order, the vacuum two-point function has an extra reciprocity relation. After separating its Lorentz tensor structure, its two-by-two source-label spectral matrix is real, symmetric and positive.

For the Standard-Model source plane spanned by the incidence current \(J_\lambda^\mu\) and the \(B-L\) current \(J_q^\mu\), this gives a direct vacuum route

\[
\rho_T(s)\in \operatorname{Sym}_2(\mathbb R)_+\cong H_2(\mathbb R)_+.
\]

It does **not** derive the source frame, normalize it, identify it with the older Furey topology pair, or prove the same statement in a thermal medium.

## 1. Typed setup

Let

\[
J_i^\mu=(J_\lambda^\mu,J_q^\mu),\qquad i=1,2,
\]

be local Hermitian gauge-singlet bosonic vector operators in a Poincare-invariant vacuum. Their time-ordered two-point function is

\[
\Pi_{ij}^{\mu\nu}(q)
=i\int d^4x\,e^{iq\cdot x}
\langle0|T J_i^\mu(x)J_j^\nu(0)|0\rangle.
\]

The index \(i\) labels the two external probes. It is not a spacetime index, gauge index or Furey topology index.

## 2. Exchange plus Lorentz covariance forces a symmetric source matrix

Bosonic time ordering and translation invariance give

\[
\Pi_{ij}^{\mu\nu}(q)=\Pi_{ji}^{\nu\mu}(-q).
\]

In a Lorentz-invariant vacuum, a vector-vector correlator has only the parity-even symmetric rank-two structures built from \(\eta^{\mu\nu}\) and \(q^\mu q^\nu\):

\[
\Pi_{ij}^{\mu\nu}(q)
=P_T^{\mu\nu}(q)\Pi^T_{ij}(q^2)
+P_L^{\mu\nu}(q)\Pi^L_{ij}(q^2)
+\text{local contacts}.
\]

Both projectors are symmetric in \(\mu,\nu\) and even under \(q\mapsto-q\). Therefore

\[
\boxed{\Pi^A_{ij}(z)=\Pi^A_{ji}(z)},\qquad A=T,L.
\]

No CP assumption is needed for this vacuum two-point statement. The required ingredients are locality/exchange, Hermiticity and vacuum Lorentz covariance. A medium four-velocity, external field, nonlocal probe or extra oriented tensor can invalidate the restricted tensor decomposition.

## 3. Spectral positivity then gives the real Jordan cone

Hermitian analyticity gives

\[
\Pi^A(z^*)=\Pi^A(z)^\dagger.
\]

Together with source-index symmetry, the discontinuity

\[
\rho_A(s)=\frac{1}{2\pi i}
\left[\Pi^A(s+i0)-\Pi^A(s-i0)\right]
\]

is entrywise real and symmetric. Inserting complete physical states shows that for every complex source vector \(c\), after contraction with a physical polarization,

\[
c^\dagger\rho_T(s)c\ge0.
\]

Hence

\[
\boxed{\rho_T(s)\in\operatorname{Sym}_2(\mathbb R)_+\cong H_2(\mathbb R)_+.}
\]

The Euclidean response and the subtracted causal response inherit the cone:

\[
K_T(Q^2)=\int_0^\infty\frac{\rho_T(s)}{s+Q^2}\,ds\succeq0,
\]

\[
F_T(z)=\int_0^\infty\frac{\rho_T(s)}{s-z}\,ds,
\qquad \operatorname{Im}z>0,
\qquad \operatorname{Im}F_T(z)\succeq0.
\]

Full rank is dynamical, not automatic: it holds exactly when no nonzero real combination of the two currents has zero transverse spectral support throughout the admitted measure.

## 4. Ward typing is asymmetric but consistent

With a Dirac \(\nu_R\) completion and no Majorana mass, \(J_q=J_{B-L}\) is conserved. Its nonlocal longitudinal spectral row and column vanish, up to the usual local Ward contacts. The incidence current is broken by Yukawa terms, so its longitudinal spectral component need not vanish. Consequently

\[
\rho_L(s)=
\begin{pmatrix}
\rho_{\lambda\lambda}^L(s)&0\\
0&0
\end{pmatrix}
\]

in the protected branch, while the transverse block may occupy the full \(H_2(\mathbb R)_+\) cone.

A Majorana mass removes the continuous \(B-L\) Ward identity. It does not destroy Hilbert-space positivity, but it changes the quotient and invalidates the claim of one exactly protected source direction.

## 5. Why this does not close G03 completely

Three pieces remain outside the vacuum theorem.

1. **Subtractions and contacts.** The positive spectral cut is scheme independent, but the full renormalized correlator contains a real symmetric polynomial/contact tensor. A sufficiently high polynomial is not itself a Herglotz function. One must state a subtraction prescription, take enough derivatives, or work directly with the spectral measure.
2. **Thermal/KMS response.** A thermal state supplies a preferred four-velocity. KMS relates positive and negative frequencies, but does not by itself remove all antisymmetric or parity-odd tensor structures. The vacuum proof therefore cannot simply be copied to finite temperature.
3. **Source calibration.** A real change of source frame \(J\mapsto MJ\), \(M\in GL(2,\mathbb R)\), acts by congruence \(\rho\mapsto M\rho M^T\) and preserves the cone. Positivity cannot select the scale-and-shear frame left open at G01.

## 6. Relation to the older exchange-fixed carrier

This result is a second route to the same abstract cone but not an identification of physical meanings:

\[
\underbrace{\text{two Standard-Model source labels}}_{\lambda,\,B-L}
\quad\neq\quad
\underbrace{\text{two Furey topology faces}}_{A,\,B}
\]

unless an explicit intertwiner is supplied. The vacuum current response does not need the separately assumed equal-diagonal face-exchange condition of document 626. Conversely, it does not derive that topology exchange or its selector.

## 7. Exact updated frontier

The vacuum part of G03 is now closed at the spectral-measure level. The first unresolved datum for full G03 is:

\[
\boxed{\text{one renormalized subtraction prescription and, if thermal claims are retained,}\
\text{ one explicit KMS tensor decomposition for the chosen source pair}.}
\]

The decisive calculation is the renormalized \(2\times2\) current correlator in a declared scheme. It must report the transverse spectral density, the incidence longitudinal density, operator mixing, and the symmetric contact tensor. Only after that calculation can pole/residue observables be claimed without fitting an arbitrary response matrix.

## 8. Scope and falsifiers

The theorem fails as applied if:

- either source is nonlocal or non-Hermitian;
- the state is not Poincare invariant but the vacuum tensor basis is still used;
- a complex Hermitian source matrix is called \(H_2(\mathbb R)\) without the exchange/covariance proof;
- Majorana breaking is present while exact \(B-L\) Ward protection is claimed;
- a contact polynomial is silently included in a claimed Herglotz function;
- the source-label cone is identified with the Furey topology cone without an intertwiner.

## Reproducibility

```powershell
node scripts\verify_programme_vacuum_two_current_h2r_closure.mjs
```

The certificate checks the finite-dimensional algebra behind the theorem: exchange-paired amplitudes produce real symmetric positive spectral atoms; Stieltjes and upper-half-plane kernels preserve positivity; real source-frame congruences preserve the cone; and a single Ward-protected direction leaves only the incidence longitudinal component.

## Primary references

- [Gesztesy and Tsekanovskii, matrix-valued Herglotz functions](https://arxiv.org/abs/funct-an/9712004)
- [Jorgensen and Tian, reflection positivity and spectral theory](https://arxiv.org/abs/1705.05262)

