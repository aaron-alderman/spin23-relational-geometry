# Interaction Closure Forces Lepton Stress Back to the Total Standard-Model Tensor

**Date:** 17 October 2026  
**Branches:** B02, B03, B04, B05, B06 and B11  
**Claim status:** exact subsystem-exchange identity and exact hypergraph closure under the declared nonzero Standard-Model interactions; full renormalized stress decomposition remains scheme dependent  
**Certificate:** [verify_sector_stress_exchange_and_total_conservation.mjs](../../../verification/verify/verify_sector_stress_exchange_and_total_conservation.mjs)

## Executive result

The incidence-derived lepton projector does not define a separately conserved stress tensor in the interacting Standard Model.

Starting from the lepton doublet sector,

\[
L
\xrightarrow{,y_e,}
L\cup e^c\cup H
\xrightarrow{,y_u,y_d,}
Q\cup u^c\cup d^c\cup L\cup e^c\cup H
\xrightarrow{,g,}
\text{all matter, Higgs and gauge fields}.
\]

Thus the smallest interaction-closed stress sector containing \(L\) is the full Standard-Model dynamical system. The projected operator \(T_L^{\mu\nu}\) may be a legitimate composite insertion, but it is not the independently conserved source of ordinary gravity.

## 1. Exact subsystem exchange identity

The mechanism is already visible for two real fields with

\[
V_{\rm int}=\frac g2\phi^2\chi^2.
\]

On the coupled equations of motion, the free-sector stress tensors satisfy

\[
\partial_\mu T_\phi^{\mu\nu}
=-g\phi\chi^2\partial^\nu\phi,
\]

\[
\partial_\mu T_\chi^{\mu\nu}
=-g\phi^2\chi\partial^\nu\chi.
\]

The interaction contribution has

\[
\partial_\mu T_{\rm int}^{\mu\nu}
=\partial^\nu V_{\rm int}
=g\phi\chi^2\partial^\nu\phi
+g\phi^2\chi\partial^\nu\chi.
\]

Therefore

\[
\partial_\mu
\left(T_\phi^{\mu\nu}+T_\chi^{\mu\nu}+T_{\rm int}^{\mu\nu}\right)=0,
\]

while neither subsystem tensor is conserved. The certificate verifies this cancellation as an exact coefficient identity.

## 2. Standard-Model interaction closure

Represent the relevant interaction terms as hyperedges:

\[
\{Q,u^c,H\},
\quad
\{Q,d^c,H\},
\quad
\{L,e^c,H\},
\]

together with gauge edges joining every charged matter/Higgs sector to the gauge fields.

The closure algorithm starts with \(\{L\}\) and repeatedly includes every field in an interaction touching the current set. It gives:

1. \(LH^\dagger e^c\) adds \(e^c,H\);
2. gauge coupling adds the gauge sector;
3. \(QHu^c\) adds \(Q,u^c\);
4. \(QH^\dagger d^c\) adds \(d^c\).

The result is

\[
\boxed{\operatorname{cl}_{\rm int}(L)
=\{Q,u^c,d^c,L,e^c,H,\text{gauge}}.}
\]

This assumes the observed charged-fermion Yukawa and gauge couplings are nonzero. Turning couplings off defines different limiting theories, not the interacting Standard Model.

## 3. Consequence for the stress–Jordan bridge

The original stress programme seeks a response sourced by metric variation:

\[
T_{\mu\nu}^{\rm total}
=-\frac2{\sqrt{-g}}\frac{\delta S_{SM}}{\delta g^{\mu\nu}}.
\]

The diffeomorphism Ward identity constrains this total tensor. It does not privilege the zero eigenspace of the internal incidence Laplacian.

Hence the two exact results have different roles:

\[
\begin{aligned}
P_L&=\chi_{\{0\}}(\Lambda)
&&\text{selects an internal composite channel},\\
T_{\mu\nu}^{\rm total}
&&&\text{is the conserved gravitational source}.
\end{aligned}
\]

They cannot be identified without adding a new interaction or response map.

## 4. Three surviving branches

### 4.1 Total-stress carrier

Couple the face response to \(T_{\mu\nu}^{\rm total}\). This preserves the universal gravitational Ward identity, but the lepton projector no longer selects the source. The five-sector aggregation and its spectral weights return as dynamical data.

### 4.2 Lepton-stress insertion

Use \(T_L^{\mu\nu}\) as a nonconserved operator insertion in a correlation function. This may still have a positive spectral representation, but it lacks transverse stress Ward identities and depends on operator mixing, improvement and renormalization scheme.

### 4.3 New tensor interaction

Couple a new two-face tensor source to the projected operator. Then it is not ordinary gravity. Its longitudinal modes, unitarity, fifth-force bounds and radiative mixing must be tested explicitly.

## 5. Stop-everything result

The statement

\[
\text{ordinary universal gravity couples only to }P_L\,T_{\mu\nu}
\]

is incompatible with the interaction closure and the standard diffeomorphism Ward identity. It must stop unless the theory modifies gravity or changes the interacting field content.

The weaker statement survives:

\[
P_L\text{ defines a distinguished lepton composite insertion inside the total theory.}
\]

## 6. Next gates

1. **Total-stress branch:** determine whether the five-sector face aggregation is fixed by ultraviolet stress two-point coefficients rather than representation dimensions.
2. **Current branch:** identify a conserved or anomalous global current whose internal support contains the lepton projector and classify its two-face response.
3. **New-tensor branch:** write the quadratic Lorentz projectors and test ghost freedom before treating face positivity as physical positivity.
4. **Operator-mixing branch:** calculate whether renormalization preserves the zero-spectral incidence projector as a useful composite insertion.

## Reproducibility

```powershell
node scripts\verify_sector_stress_exchange_and_total_conservation.mjs
```
