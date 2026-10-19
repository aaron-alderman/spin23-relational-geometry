# The Free Standard-Model UV Cut Fixes a Relative Metric, but Not the Physical Ports

**Date:** 17 October 2026  
**Programme gates:** G01, G03 and G06  
**Claim status:** exact leading free-field spectral coefficient in a declared convention; interacting running and finite contacts remain to be calculated  
**Certificate:** [verify_programme_free_uv_current_metric.mjs](../../../verification/verify/verify_programme_free_uv_current_metric.mjs)

## Result in ordinary language

Once the two candidate currents are written with definite integer weights, the Standard-Model fermions act like a calibrated set of rulers: each Weyl component contributes a known amount to the high-energy absorptive response. Adding those contributions fixes a relative metric on the candidate source plane.

For one generation including \(\nu_R\), in the sector order

\[
(Q,u^c,d^c,L,e^c,\nu^c),
\]

take

\[
\lambda=(5,5,1,1,1,0),\qquad
q=3(B-L)=(1,-1,-1,-3,3,3),
\]

with Weyl multiplicities

\[
d=(6,3,3,2,1,1).
\]

The exact charge Gram matrix is

\[
G_{ab}=\sum_r d_r x_{a,r}x_{b,r}
=\begin{pmatrix}231&9\\9&48\end{pmatrix},
\qquad \det G=11007>0.
\]

This proves that the free ultraviolet transverse spectral response has rank two. It also supplies a natural orthogonal convention. It does not tell nature to couple an apparatus to these two currents, and it does not fix the finite contact tensor.

## 1. Spectral normalization

Use the convention

\[
i\int d^4x\,e^{iqx}\langle T J_a^\mu(x)J_b^\nu(0)\rangle
=(q^\mu q^\nu-q^2\eta^{\mu\nu})\Pi_{ab}(q^2)+\cdots
\]

and

\[
\rho_{ab}(s)=\frac1\pi\operatorname{Im}\Pi_{ab}(s+i0).
\]

A massless left-handed Weyl component of unit charge contributes \(1/(24\pi^2)\) to \(\rho\). Therefore, for \(N_g\) generations with generation-universal charges,

\[
\boxed{
\rho_T^{\rm free}(s>0)
=\frac{N_g}{24\pi^2}
\begin{pmatrix}231&9\\9&48\end{pmatrix}.}
\]

For the observed three generations this is \(G/(8\pi^2)\). Mass thresholds replace the constant expression by the usual threshold functions but do not change the ultraviolet coefficient.

## 2. The UV-orthogonal incidence direction

The component of incidence orthogonal to \(B-L\) in this free spectral metric is

\[
\lambda_\perp=\lambda-\frac{G_{\lambda q}}{G_{qq}}q
=\lambda-\frac{3}{16}q.
\]

In the basis \((\lambda_\perp,q)\),

\[
G_\perp=
\begin{pmatrix}
3669/16&0\\
0&48
\end{pmatrix}.
\]

This removes the shear relative to the declared free-UV metric. Unit normalization can then be imposed by dividing by the square roots of these diagonal coefficients.

That is a reproducible renormalization convention, not a dynamical selector. A different operational coupling can still choose any invertible real combination of the two currents.

## 3. What this fixes and what it does not

It fixes:

- the leading nonlocal ultraviolet logarithm/cut for the declared current definitions;
- the relative free-field norm and overlap of incidence and \(B-L\);
- rank-two ultraviolet support;
- one convenient shear-free frame.

It does not fix:

- why incidence and \(B-L\) are the physical ports rather than another source pair;
- the coefficients with which an external apparatus couples to them;
- finite local counterterms in the two-source generating functional;
- the interacting anomalous-dimension and operator-mixing matrix of the nonconserved incidence current;
- infrared pole positions or residues;
- any Furey topology identification or orientation.

## 4. Renormalization consequence

The earlier scale-and-shear torsor can now be stated more precisely. The free ultraviolet cut provides a preferred frame **after** choosing the integer current definitions and a UV normalization condition. Thus the nonlocal leading metric is calculable rather than arbitrary. The remaining ambiguity is physical source selection plus finite scheme/contact data, not ignorance of the free two-point coefficient.

Because \(J_\lambda\) is Yukawa-broken, interactions can mix it with other operators of matching quantum numbers and with improvement/EOM structures. The next calculation is therefore not another abstract cone theorem. It is the renormalized operator-mixing matrix and correlator in a specified Standard-Model scheme.

## 5. Why this is not yet a new prediction

The matrix \(G\) is a weighted sum of squared charges. Any collection of free Weyl fermions produces the same kind of formula. The numerical entries are a useful programme-specific checkpoint, but they follow from the already-declared incidence and \(B-L\) weights. They do not follow from \(Spin(2,3)\), Jordan theory or an exceptional parent.

Accordingly, this result improves normalization discipline but does not promote G10.

## Reproducibility

```powershell
node scripts\verify_programme_free_uv_current_metric.mjs
```

The certificate verifies every Gram entry, rank, the exact orthogonal shear, the three-generation coefficient and invariance of positivity under threshold-positive sums.

## Reference convention

The normalization agrees with the standard massless Dirac relation \(R(s)=12\pi\,\operatorname{Im}\Pi(s)=1\): one Weyl component contributes half a Dirac component. For general current-normalization context, see [Giombi, Tarnopolsky and Klebanov on current two-point coefficients](https://arxiv.org/abs/1602.01076).

