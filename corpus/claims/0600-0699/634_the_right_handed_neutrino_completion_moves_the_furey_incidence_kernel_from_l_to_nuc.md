# The Right-Handed-Neutrino Completion Moves the Furey Incidence Kernel from \(L\) to ν<sup>c</sup>

**Date:** 17 October 2026  
**Branches:** B03, B04, B05, B11 and the neutrino/\(Spin(2,3)\) fork  
**Claim status:** exact sixteen-state exchanged-TRO incidence calculation; physical interpretation remains conditional  
**Certificate:** [derive_sixteen_state_furey_incidence_kernel.mjs](../../../verification/derive/derive_sixteen_state_furey_incidence_kernel.mjs)

## Executive result

The unique ternary-compatible right-handed-neutrino completion does not preserve the fifteen-state lepton-doublet incidence kernel. Adding the relational arrow

\[
ν^c:D\longrightarrow E
\]

changes the positive incidence weights from

\[
(Q,u^c,d^c,L,e^c)=(5,5,1,0,1)
\]

to

\[
\boxed{(Q,u^c,d^c,L,e^c,ν^c)=(5,5,1,1,1,0).}
\]

Consequently,

\[
\boxed{\ker\Lambda_{15}=L,
\qquad
\ker\Lambda_{16}=ν^c.}
\]

The anomaly-free-current completion and the pure lepton-doublet selector do not coexist unchanged in the same naïve incidence law. Instead, the sixteen-state law selects the sterile-neutrino direction.

## 1. Exact completed topology

For the representative topology \((D,E)=(O_1,R)\), the six matter arrows are

\[
\begin{aligned}
Q&:O_2\leftarrow H,
&u^c&:C\leftarrow O_2,
&d^c&:O_1\leftarrow O_2,\\
L&:H\leftarrow R,
&e^c&:R\leftarrow C,
&ν^c&:R\leftarrow O_1.
\end{aligned}
\]

The last arrow is precisely the unique one-dimensional TRO extension derived in [document 167](../0100-0199/167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md).

The certificate rebuilds every exchanged Jordan triple product. It finds 82 response components with multiplicity, 31 distinct polynomial equations and 15 positive diagonal equations.

## 2. Positive zero locus

The positive equations jointly force all coordinates in

\[
Q\oplus u^c\oplus d^c\oplus L\oplus e^c
\]

to vanish. The sole positivity-unconstrained coordinate is \(ν^c\). Once the other fifteen coordinates vanish, all remaining mixed equations vanish as well. Hence

\[
\mathcal Z_{16}^{\rm Herm}=ν^c\otimes F
\]

for arbitrary finite-dimensional complex flavor space \(F\), under the same Hermitian coefficient rule used in the fifteen-state theorem.

Unlike the fifteen-state case, \(ν^c\) does occur in the full response through mixed monomials. It survives because every such term also contains a coordinate already forced to zero. Thus “absent from the response” and “in the positive zero locus” become different notions after completion.

## 3. Why \(L\) loses kernel status

The new neutral arrow completes the cycle

\[
H\xrightarrow{h_D}D
\xrightarrow{ν^c}E
\xrightarrow{L}H.
\]

This creates new ternary incidences involving the lepton arrow. Both components of \(L\) acquire positive weight one. The direction invisible to positive incidence moves to the new endpoint arrow \(D\to E\) itself.

The selector therefore tracks the open relational direction of the TRO rather than a representation label fixed independently of completion.

## 4. Revised neutrino/\(Spin(2,3)\) fork

### Fifteen-state branch

- positive kernel: \(L\);
- unique \(M_2(\mathbb C)\) linking factor survives;
- clean lepton-doublet \(H_2(\mathbb R)\) compression;
- no Dirac right-handed-neutrino arrow;
- neutrino mass must use a Majorana/Weinberg or external completion.

### Sixteen-state branch

- positive kernel: \(ν^c\);
- anomaly-free \(B-L\) becomes available;
- the Dirac neutrino Yukawa cycle closes;
- the unique linking \(M_2(\mathbb C)\) factor disappears;
- a sterile-neutrino \(H_2(\mathbb R)\) source is selected instead of the lepton doublet.

This is a sharper fork than the earlier linking-factor tradeoff: the same completion changes the selector kernel itself.

## 5. Possible physical meaning

The sixteen-state outcome is not automatically a failure. A selected \(ν^c\) channel could organize Dirac-neutrino suppression, Majorana mass generation, \(B-L\) breaking, seesaw spectral mixing, or a sterile boundary response. These are new hypotheses; the calculation does not derive a mass scale or seesaw hierarchy.

## 6. Stop-everything result

The following combined claim is false for the unmodified incidence law:

\[
\text{add the canonical }ν^c
\quad\text{and retain}\quad
\ker\Lambda=L.
\]

Any synthesis asserting both must introduce and justify a modified response, a projection order, a symmetry-breaking limit or a different neutral orientation.

The exact surviving alternatives are

\[
\mathcal M_{15}:L\text{ kernel}
\qquad\text{or}\qquad
\mathcal M_{16}:ν^c\text{ kernel}.
\]

## 7. Next gates

1. Compute the six-sector Standard-Model-plus-\(B-L\) commutant on \(\mathcal M_{16}\) and its exchange-fixed face cones.
2. Test whether the \(ν^c\) source cone connects naturally to the canonical neutrino Peirce corner inside the completed \(M_3(\mathbb C)\) linking factor.
3. Add a Majorana mass or \(B-L\)-breaking scalar and determine how the incidence kernel and spectral positivity change.
4. Compare the order of operations: project to the fifteen-state charged module before completion versus complete first and take the zero-spectral projector.

The first gate is resolved in [document 635](635_b_minus_l_supplies_a_source_derived_six_cone_aggregation_while_incidence_selects_nuc.md): the commutant is \(\mathbb C^6\), the face response is a sum of six \(H_2(\mathbb R)\) cones, incidence selects the sterile cone, and the \(B-L\) current supplies a distinct charge-squared aggregation.

## Reproducibility

```powershell
node scripts\derive_sixteen_state_furey_incidence_kernel.mjs
```
