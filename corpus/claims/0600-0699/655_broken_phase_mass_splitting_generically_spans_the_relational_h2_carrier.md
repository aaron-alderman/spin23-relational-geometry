# Broken-Phase Mass Splitting Generically Spans the Relational \(H_2(\mathbb R)\) Carrier

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B07, B08, B11 and the relational-carrier/Jordan-triple branch  
**Claim status:** exact symbolic one-generation free-field theorem; confined and interacting spectral completion remains open  
**Certificate:** [verify_broken_phase_mass_threshold_relational_span.mjs](../../../verification/verify/verify_broken_phase_mass_threshold_relational_span.mjs)

## Executive result

Physical masses cannot be assigned one-per-unbroken-sector because electroweak breaking splits the \(Q\) and \(L\) doublets. Refining the incidence/\(B-L\) response into broken-phase chiral components gives four threshold coefficient matrices:

\[
U=\begin{pmatrix}150&0\\0&6\end{pmatrix},
\qquad
D=\begin{pmatrix}78&12\\12&6\end{pmatrix},
\]

\[
E=\begin{pmatrix}2&0\\0&18\end{pmatrix},
\qquad
N=\begin{pmatrix}1&-3\\-3&18\end{pmatrix}.
\]

Already

\[
\boxed{U,D,E\text{ span }Sym_2(\mathbb R),}
\]

because their flattened determinant is

\[
\det
\begin{pmatrix}
150&0&6\\
78&12&6\\
2&0&18
\end{pmatrix}
=32256\ne0.
\]

Hence distinct up-type, down-type and charged-lepton spectral functions generically make the fixed-frame relational response generate the full Jordan carrier. The neutrino channel is not required for the rank-three result, although \(\nu^c\) remains essential to anomaly-free \(B-L\).

## 1. Broken-phase refinement

In the all-left-handed convention, group fields by the physical mass joining the chiral components:

| Threshold | Chiral components | \((\lambda,3(B-L))\) | Multiplicity |
|---|---|---|---:|
| \(u\) | \(u_L\subset Q\), \(u^c\) | \((5,1),(5,-1)\) | \(3,3\) |
| \(d\) | \(d_L\subset Q\), \(d^c\) | \((5,1),(1,-1)\) | \(3,3\) |
| \(e\) | \(e_L\subset L\), \(e^c\) | \((1,-3),(1,3)\) | \(1,1\) |
| \(\nu\) | \(\nu_L\subset L\), \(\nu^c\) | \((1,-3),(0,3)\) | \(1,1\) |

Each coefficient matrix is the positive sum

\[
C_f=\sum_{a\in f}d_a
\begin{pmatrix}\lambda_a\\q_a\end{pmatrix}
\begin{pmatrix}\lambda_a&q_a\end{pmatrix}.
\]

This yields the four matrices in the executive result.

## 2. Symbolic threshold theorem

Let

\[
G(t)=f_u(t)U+f_d(t)D+f_e(t)E+f_\nu(t)N,
\]

with positive spectral functions \(f_f\). Since \(U,D,E\) form a basis, the linear span of the response family is all of \(Sym_2(\mathbb R)\) whenever the three coefficient functions \(f_u,f_d,f_e\) are linearly independent over the sampled domain.

For free Stieltjes functions

\[
f_f(t)=\frac1{t+m_f^2},
\]

distinct squared masses make these rational functions linearly independent. Thus generic electroweak mass splitting supplies exactly the differential running required by [document 653](653_distinct_threshold_running_can_make_the_relational_response_generate_all_of_h2r.md).

## 3. What is genuinely stronger

The earlier certificate used six arbitrary distinct thresholds. The present result shows:

- the unbroken-sector model must be refined after Higgs condensation;
- three familiar mass channels already carry a basis of the Jordan algebra;
- no special numerical mass relation is required beyond nondegeneracy;
- the off-diagonal Jordan direction comes specifically from the asymmetric incidence weights of the down channel;
- the neutrino threshold is not being used merely to force the rank count.

## 4. QCD boundary

The matrices \(U\) and \(D\) are exact algebraic coefficients in the free chiral model. Free colored quark poles are not infrared observables because quarks are confined.

A physical low-energy spectral response must replace them with hadronic continua, resonances and operator mixing. The symbolic rank theorem survives only if the resulting up-sensitive, down-sensitive and leptonic spectral functions remain linearly independent and keep the source coefficient matrices from collapsing into a common ray.

At sufficiently high Euclidean momentum, a perturbative/OPE treatment may recover the chiral component bookkeeping with calculable QCD corrections. That calculation has not yet been supplied.

## 5. Majorana and flavor boundaries

The relational source uses continuous \(B-L\), so its clean conserved-current interpretation holds above the Majorana breaking scale. Below that scale, the longitudinal mode and breaking-sector spectral data must be included.

For three generations, physical thresholds proliferate and CKM/PMNS matrices enter. The face/source Jordan index should remain real while flavor data remain complex. Summing flavor indiscriminately could erase or distort the mixed incidence/charge response.

## 6. Stop-everything criteria

Stop treating free broken-phase masses as a physical spectral proof if:

1. confined quark poles are used directly at infrared momentum;
2. QCD operator mixing makes the relevant coefficient functions proportional;
3. the incidence insertion lacks a renormalized definition;
4. Majorana breaking invalidates the continuous \(B-L\) source in the claimed regime;
5. flavor mixing is projected to a real carrier in a way that removes physical CP invariants.

## 7. Next gates

1. Replace free quark poles by an OPE or hadronic spectral model.
2. Compute the renormalization mixing of the incidence-weighted vector insertion.
3. Extend the coefficient matrices to three generations while retaining complex flavor structure.
4. Determine the scale window above \(B-L\) breaking and below any ultraviolet completion where both sources are meaningful.

## Reproducibility

```powershell
node scripts\verify_broken_phase_mass_threshold_relational_span.mjs
```
