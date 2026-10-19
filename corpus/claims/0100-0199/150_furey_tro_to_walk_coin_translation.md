# Translating a Surviving Furey TRO into Walk-Coin Support

**Date:** 17 October 2026  
**Branches:** B03, B05, B11 and B13  
**Claim status:** exact support-level translation for one surviving topology; particle conjugation, dynamics and anomalies are additional inputs

## 1. Selected topology

Choose one of the two TROs that survives the anomaly and cyclic-Yukawa tournaments:

\[
Q:H\to O_2,
\qquad u^c:O_2\to C,
\]

\[
d^c:O_2\to O_1,
\qquad L:R\to H,
\qquad e^c:C\to R.
\]

The other surviving topology is obtained by (O_1\leftrightarrow R). Nothing established so far physically distinguishes the pair.

The required positive-hypercharge Higgs arrows are

\[
h_C:C\to H,
\qquad h_D=h_{O_1}:H\to O_1.
\]

## 2. Exact internal cycles

The three charged sectors close as

\[
H\xrightarrow{Q}O_2\xrightarrow{u^c}C\xrightarrow{h_C}H,
\]

\[
H\xrightarrow{Q}O_2\xrightarrow{d^c}O_1\xrightarrow{h_D^\dagger}H,
\]

and

\[
C\xrightarrow{e^c}R\xrightarrow{L}H\xrightarrow{h_C^\dagger}C.
\]

This block-incidence statement is exact under the previously declared cyclic-trace interaction rule.

## 3. Convention change required by a Dirac walk

The Furey matter TRO is written entirely with left-handed Weyl multiplets (Q,u^c,d^c,L,e^c). A conventional Dirac walk instead places ordinary particle modules on two chiral faces:

\[
V_L=Q\oplus L,
\qquad V_R=u_R\oplus d_R\oplus e_R.
\]

Here (u_R,d_R,e_R) are charge conjugates of the Furey (u^c,d^c,e^c) sectors. This is not merely a relabeling of directed block arrows: it invokes the particle/antiparticle real structure and complex conjugates the gauge representations.

That conversion is a genuine missing bridge. The calculation below is conditional on choosing the standard conversion.

## 4. Dimensions and the unmatched state

For one generation,

\[
\dim_{\mathbb C}V_L=6+2=8,
\qquad \dim_{\mathbb C}V_R=3+3+1=7.
\]

In the minimal Standard Model without a right-handed neutrino, the mismatch is exactly one complex state.

After electroweak symmetry breaking, order the bases as

\[
V_L=(u_L^r,u_L^g,u_L^b,d_L^r,d_L^g,d_L^b,ν_L,e_L)
\]

and

\[
V_R=(u_R^r,u_R^g,u_R^b,d_R^r,d_R^g,d_R^b,e_R).
\]

The support selected by the charged cycles has the rectangular form

\[
\Phi=
\begin{pmatrix}
y_u I_3&0&0\\
0&y_d I_3&0\\
0&0&0\\
0&0&y_e
\end{pmatrix},
\]

where the block rows are (u_L,d_L,ν_L,e_L) and the columns are (u_R,d_R,e_R).

For nonzero (y_u,y_d,y_e),

\[
\operatorname{rank}\Phi=7,
\]

and the sole unmatched left state is (ν_L).

This does not derive a massless-neutrino prediction: the programme already contains triplet and possible right-handed-neutrino branches. It shows exactly what the minimal selected support does before either extension is added.

The right-handed-neutrino branch is now exact at the support level. Among the seven canonical neutral endomorphism directions, the unique one-dimensional TRO extension is \(\nu^c:D\to E\). It closes the triangle \(H\xrightarrow{h_D}D\xrightarrow{\nu^c}E\xrightarrow{L}H\), adds the missing conventional \(\nu_R\) column and permits an \(8\times8\) full-rank coin. This completion simultaneously removes the unique \(M_2(\mathbb C)\) linking factor; see the [sixteen-state TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md).

## 5. Hermitian unitary-coin generator

The corresponding one-particle mixing generator is

\[
K_\Phi=
\begin{pmatrix}
0&\Phi\\
\Phi^\dagger&0
\end{pmatrix}
\]

on the fifteen-dimensional space (V_L\oplus V_R). Its nonzero eigenvalues are

\[
\pm |y_u|\text{ three times},
\qquad \pm |y_d|\text{ three times},
\qquad \pm |y_e|\text{ once},
\]

with one zero eigenvalue for the unmatched neutrino. Exponentiating (K_\Phi) yields a unitary broken-phase coin. The topology fixes its support, not the numerical Yukawa values.

## 6. What Furey fixes here

Under the cyclic-trace hypothesis, the selected topology fixes:

- which matter sectors may mix;
- which internal Higgs arrow closes each mixing relation;
- absence of arbitrary cross-channel blocks at this support level;
- one common relational pattern up to (O_1\leftrightarrow R).

It does not fix:

- the conversion from (u^c,d^c,e^c) to a particle (V_R);
- the magnitudes or phases of Yukawa matrices;
- whether (h_C) and (h_D) are locked into one field;
- the neutrino completion;
- spin/statistics and second quantization;
- the action on the Floquet (pi) sector;
- anomaly flow of the walk.

## 7. Why this matters for the grand synthesis

This is the first explicit common data structure shared by three branches:

1. the Furey TRO supplies directed internal incidence;
2. the Standard Model supplies the chiral particle modules and Higgs-vacuum support;
3. the null walk supplies the unitary dynamical coin in which that support acts.

The Jordan/(Spin(2,3)) branch is not yet forced. It must still arise from the response or sewing structure of this walk, or constrain the unresolved particle real structure and Higgs locking.

## 8. Stop-everything and falsification gates

**Advance:** derive the particle/antiparticle real structure and (V_L\oplus V_R) polarization from the same Jordan or Furey involution, instead of imposing conventional charge conjugation.

**Selection:** distinguish (O_1) from (R) and uniquely choose one of the two surviving TROs.

**Predictivity:** derive a nontrivial relation among singular values or flavor invariants of (Phi).

**Mirror failure:** the required real structure necessarily restores dagger-reverse TRO blocks or the Floquet (pi) sector as light mirrors.

**Demotion:** if the selected block support becomes exactly the ordinary unconstrained Yukawa support after the convention change, retain the Furey topology only as a representation encoding.

## 9. Certificate

The [Furey-TRO walk-support certificate](../../../verification/verify/verify_furey_tro_walk_coin_support.mjs) verifies the three directed cycles, constructs the (8\times7) broken-phase coin support, checks rank seven and the unique unmatched (ν_L), and verifies the squared Hermitian coin spectrum.

## Companion documents

- [Four anomaly-free one-generation TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Cyclic Yukawa topology selection](111_furey_cyclic_yukawa_topology_selection.md)
- [Compact-group coin intertwiner theorem](149_compact_group_coin_intertwiner_theorem.md)
- [Minimal null-streaming Dirac quantum walk](147_null_streaming_dirac_quantum_walk.md)
