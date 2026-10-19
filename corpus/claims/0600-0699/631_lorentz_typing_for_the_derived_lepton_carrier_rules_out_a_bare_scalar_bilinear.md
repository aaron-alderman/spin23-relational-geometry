# Lorentz Typing for the Derived Lepton Carrier Rules Out a Bare Scalar Bilinear

**Date:** 17 October 2026  
**Branches:** B02, B03, B04, B05 and B11  
**Claim status:** exact Standard-Model quantum-number audit; choice and dynamics of the physical source remain open  
**Certificate:** [classify_lorentz_compatible_lepton_projector_sources.mjs](../../../verification/classify/classify_lorentz_compatible_lepton_projector_sources.mjs)

## Executive result

The derived internal projector \(P_L\) does not by itself specify a Lorentz-compatible action term. In the chiral fifteen-state Standard-Model module there is no bare two-Weyl fermion bilinear that is simultaneously a Lorentz scalar and a gauge singlet.

In particular,

\[
L^\dagger L
\]

is the time component of a vector current in a chosen frame, not a Lorentz scalar. A scalar two-face auxiliary field therefore cannot couple linearly to it in a relativistic action.

The viable source routes have different Lorentz types:

\[
\boxed{
\begin{array}{ll}
\text{vector:}&j_L^\mu=L^\dagger\bar\sigma^\mu L,\\
\text{tensor:}&T_L^{\mu\nu},\\
\text{scalar:}&e^cH^\dagger L+\text{h.c.},\\
\text{dimension five:}&(LH)(LH)+\text{h.c.},\\
\text{dimension six:}&j_L^\mu j_{L\mu}.
\end{array}}
\]

This turns the remaining action gate into a finite choice of typed composite channels.

## 1. Chiral matter convention

Using left-handed Weyl fields and \(Y_6=6Y\),

\[
\begin{array}{c|ccc}
&SU(3)&SU(2)&Y_6\\ \hline
Q&\mathbf3&\mathbf2&1\\
u^c&\bar{\mathbf3}&\mathbf1&-4\\
d^c&\bar{\mathbf3}&\mathbf1&2\\
L&\mathbf1&\mathbf2&-3\\
e^c&\mathbf1&\mathbf1&6.
\end{array}
\]

A Lorentz scalar made from two left-handed Weyl fields uses the antisymmetric spinor contraction. Gauge invariance then requires the internal tensor product to contain the singlet and the hypercharges to sum to zero. Exhaustive enumeration finds no such pair among the five multiplets.

This is the familiar chiral obstruction to a bare Standard-Model fermion mass, now applied to the incidence-derived projector.

## 2. Hermitian bilinears are currents

For every irreducible sector,

\[
j_r^\mu=\psi_r^\dagger\bar\sigma^\mu\psi_r
\]

is a gauge-singlet Lorentz vector. The five projectors in the exact gauge commutant select the five corresponding currents. Therefore \(P_L\) intrinsically selects

\[
j_L^\mu=L^\dagger\bar\sigma^\mu L.
\]

This can couple to a vector-valued two-face auxiliary source \(h_\mu\), but not to the scalar auxiliary variable used in the simplest Gaussian model of [document 627](627_a_nondynamical_two_face_field_realizes_the_h2r_response_without_mirror_poles.md) unless the Lorentz index is contracted with another derived vector.

## 3. Scalar channels require dressing

The exact renormalizable Yukawa singlets are

\[
QHu^c,
\qquad
QH^\dagger d^c,
\qquad
LH^\dagger e^c.
\]

The last is the unique charged-lepton scalar channel involving the selected doublet. It is a credible scalar composite source for a two-face response, but it necessarily includes the Higgs and \(e^c\); the carrier is no longer supported on \(L\) alone.

The neutrino-sector scalar begins at dimension five:

\[
\mathcal O_5=(LH)(LH),
\]

with total hypercharge zero. It violates lepton number and requires either an effective operator or a heavy completion.

A purely current-based scalar begins at dimension six:

\[
\mathcal O_6=j_L^\mu j_{L\mu}.
\]

Each route has different locality, positivity and phenomenological consequences.

## 4. Stress–energy route

The route most closely aligned with the original programme is

\[
P_L
\longrightarrow
T_L^{\mu\nu}
\longrightarrow
\text{two-face tensor response}
\longrightarrow
H_2(\mathbb R).
\]

Here \(P_L\) acts only on the internal module and therefore commutes with Lorentz transformations. The response source carries the symmetric tensor indices required by metric variation, while the face index carries the Jordan structure.

But \(T_L^{\mu\nu}\) is not generally conserved separately in the interacting Standard Model. Gauge and Yukawa interactions transfer energy between sectors. Only the total stress tensor obeys the universal diffeomorphism Ward identity. This becomes the next stress-branch gate.

## 5. Consequence for the auxiliary model

The auxiliary construction remains valid after its Lorentz type is specified:

- scalar \(h\): couple to a scalar composite such as \(LH^\dagger e^c+\text{h.c.}\), \((LH)^2+\text{h.c.}\), or \(j_L^2\);
- vector \(h_\mu\): couple to \(j_L^\mu\);
- tensor \(h_{\mu\nu}\): couple to a stress-type operator.

The face Hessian may still lie in \(H_2(\mathbb R)_+\), but Lorentz indices and their positivity conditions must be audited separately. Positivity of a two-by-two face matrix does not establish unitarity of a vector or tensor field theory.

## 6. Stop-everything criteria

Stop any proposed action that:

1. treats \(L^\dagger L\) as a Lorentz scalar without a frame field;
2. inserts a bare chiral mass forbidden by gauge quantum numbers;
3. suppresses the Higgs or additional fields required to make a scalar composite gauge invariant;
4. assumes \(T_L^{\mu\nu}\) is separately conserved in the interacting theory;
5. infers spacetime ghost freedom solely from positivity in the face indices.

## 7. Next executable gate

Derive the divergence of the sector-resolved stress tensors in a simplified gauge–Yukawa model and identify which exchange-fixed combinations are protected by Ward identities. Determine whether the face carrier must couple to total \(T^{\mu\nu}\), a nonconserved lepton-sector insertion, or a conserved global current instead.

## Reproducibility

```powershell
node scripts\classify_lorentz_compatible_lepton_projector_sources.mjs
```
