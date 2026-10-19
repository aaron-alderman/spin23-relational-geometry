# The Explicit Spin(10) 16×16→10 Clebsch Map Gives Only an Overall Weak Sign, So the Minimal Paired-Mediator C3 Route Closes Negatively

**Date:** 17 October 2026  
**Branches:** five-mode Fock model, $Spin(10)$ Clebsch map, weak orientation, vector mediator, $A_2$ Coxeter candidate, and selector dynamics  
**Claim status:** exact in the standard exterior/Fock realization; nonminimal mediator and color-relative local-coefficient routes remain open  
**Certificate:** [construct_the_spin10_16_16_10_bilinear_and_extract_weak_channel_clebsch_signs.mjs](scripts/construct_the_spin10_16_16_10_bilinear_and_extract_weak_channel_clebsch_signs.mjs)

**Subsequent resolution:** document 902 identifies the product of the established Furey-handle and Higgs-channel gradings, $h\chi$, as exactly the missing lepton/color sign after normalized aggregation. The minimal Clebsch map alone still fails, but the response/local-coefficient route is reopened conditionally.

## Executive result

Document 898 proved a sharp conditional theorem: mediator normals $(1,\sqrt3)$ and $(1,-\sqrt3)$ generate the exact $A_2$ Coxeter element through two relative-$\pi$ reflections.

The explicit minimal $Spin(10)$ Clebsch map does **not** supply those two projectively different normals.

Using the standard five-mode realization

\[
S^+=\Lambda^{\rm even}\mathbb C^5,
\]

the vector bilinear

\[
S^+\otimes S^+\longrightarrow V_{10}
\]

is constructed from Clifford wedge/contraction and the invariant top-form pairing. In one coherent convention, the neutral weak channels have coefficients

\[
\begin{array}{c|c|ccc}
&\text{lepton}&\text{color 1}&\text{color 2}&\text{color 3}\\
\hline
+2e_4&-1&+1&-1&+1\\
-2e_4&+1&-1&+1&-1.
\end{array}
\]

The second row is exactly the overall negative of the first:

\[
c_{-4}=-c_{+4}.
\]

After projection onto one common oriented color-singlet sum, the canonical two-channel directions are

\[
g_{+}=(-1,\sqrt3),
\qquad
g_{-}=(1,-\sqrt3)=-g_+.
\]

They define the same rank-one projector:

\[
P_{g_-}=P_{g_+}.
\]

Therefore their mediator reflections are identical and

\[
S_-S_+=S_+^2=I,
\]

not the order-three Coxeter element.

The weak partner supplies a whole-channel sign, while document 898 requires a sign on only one of the lepton/color response sectors. An ordinary weak Pfaffian cannot convert an overall sign into that sector-relative sign by itself.

This closes the **minimal** single-$\mathbf{10}$ paired-reflection origin of $R$ negatively. The exact $A_2$ construction remains available if another structure supplies the missing color-relative local coefficient.

## 1. Exterior/Fock construction

Let $W=\mathbb C^5$ with ordered basis $e_1,\ldots,e_5$. The positive-chirality spinor is

\[
S^+=\Lambda^{\rm even}W.
\]

A basis state $e_I$ is labelled by an even occupation set $I\subset\{1,\ldots,5\}$, with weight

\[
q_i=1-2\mathbf1_{i\in I}.
\]

This is exactly the completed Furey/Spin(10) intertwiner of document 888.

The complex vector representation is

\[
V=W\oplus W^*.
\]

Its Clifford action is represented by

\[
c(e_i)=e_i\wedge,
\qquad
c(e^i)=\iota_i.
\]

Define the top-form pairing

\[
B(\alpha,\beta)
=
[\tau(\alpha)\wedge\beta]_{e_1\wedge\cdots\wedge e_5},
\]

where $\tau$ reverses exterior factors. The vector bilinear is specified componentwise by

\[
\Gamma_i^+(s,t)=B(s,e_i\wedge t),
\qquad
\Gamma_i^-(s,t)=B(s,\iota_i t).
\]

The certificate verifies on every allowed weight pair that

\[
\Gamma(s,t)=\Gamma(t,s),
\]

as required for the symmetric vector-$\mathbf{10}$ channel in $16\otimes16$.

## 2. Complete channel census

For every signed vector weight $\pm2e_i$, the bilinear has exactly four nonzero unordered spinor pairs. Across all ten weights this gives 40 pairs. Every nonzero Clebsch coefficient is $\pm1$ in the chosen exterior basis.

For the two neutral weak components:

\[
\begin{aligned}
\Gamma_4^+:quad
&-\nu^c\nu
+u_1^cu_1
-u_2^cu_2
+u_3^cu_3,\\
\Gamma_4^-:quad
&+e^ce
-d_1^cd_1
+d_2^cd_2
-d_3^cd_3.
\end{aligned}
\]

The alternating signs across color labels are basis-orientation signs. They define a common oriented invariant color contraction once the triplet and dual-triplet bases are fixed.

Let

\[
s=(+1,-1,+1)
\]

be that common color orientation. Then

\[
\Gamma_4^+=-B_\nu+\sum_i s_iB_{u,i},
\]

and

\[
\Gamma_4^-=+B_e-\sum_i s_iB_{d,i}.
\]

Under the natural weak matching

\[
B_\nu\leftrightarrow B_e,
\qquad
B_{u,i}\leftrightarrow B_{d,i},
\]

all four coefficient ratios are $-1$.

## 3. Why the result is not a removable convention

Individual field rephasings can relocate signs among component formulas. The physically relevant statement is projective and weak covariant.

If rephasings preserve the weak/Pati–Salam pairings, then $u_i$ and $d_i$ share one left-doublet phase, while $u_i^c$ and $d_i^c$ share the corresponding right-doublet phase. Both matched bilinears acquire the same factor, so the ratio between their Clebsch coefficients is unchanged. The same argument applies to the lepton pair.

Rephasing the entire $-2e_4$ vector component multiplies all four entries together. It can change the common ratio $-1$ to $+1$, but it cannot make the lepton ratio differ from the three color ratios.

Thus the invariant content is

\[
[c_{-4}]=[c_{+4}]
\]

in projective lepton-plus-color response space.

Document 898 requires instead

\[
[c_{-4}]=[D c_{+4}],
\qquad
D=\operatorname{diag}(1,-1,-1,-1)
\]

or its negative: a relative sign between the lepton and color sectors.

## 4. Ordinary weak Pfaffian is insufficient alone

The skew weak tensor

\[
\varepsilon=
\begin{pmatrix}0&1\\-1&0\end{pmatrix}
\]

reverses orientation between the two ordered weak components. But it acts on the weak index shared by both the leptonic and quark doublets. It therefore contributes the same channel-level sign to both sectors.

That is exactly what the explicit Clebsch map already displays:

\[
c_{-4}=-c_{+4}.
\]

The missing operation must distinguish the lepton response from the color-contracted response while remaining well typed after gauge contraction. It is not merely another weak sign.

## 5. Status of the conditional A2 theorem

Nothing in document 898's mathematics fails. If two response normals are

\[
(1,\sqrt3),
\qquad
(1,-\sqrt3),
\]

their reflections still generate the exact $A_2$ Coxeter action, with the explicit integral conjugacy and metric pullback proved there.

What fails is the simplest proposed physical source of the second normal:

\[
\boxed{
\text{minimal }16\,16\,10
+\text{ ordinary weak orientation}
\not\Rightarrow
\text{sector-relative sign}.
}

The branch is pinned at a precise dependency rather than discarded.

## 6. Remaining credible sources of the missing local coefficient

### A. Incidence/color local system

The Furey response already uses nontrivial local coefficients on the color-resolved incidence graph. A map acting as $+1$ on the leptonic determinant line and $-1$ on the color-contracted relationship line would supply the required $D$ after contraction.

It must be derived from graph orientation or boundary sewing, not inserted as a response-space sign by hand.

### B. Nonminimal Higgs channel

The other irreducible bilinear channels in

\[
16\otimes16=10\oplus120\oplus126
\]

have different symmetry and Clebsch structures. A second mediator representation or interference between channels may produce projectively distinct lepton/color directions.

This requires a fresh component calculation and cannot be inferred from representation names alone.

### C. Threshold or boundary holonomy

A boundary operation after $SO(10)$ breaking may act differently on the color-singlet composite and the lepton composite. If it contributes the missing $D$ while preserving the response symplectic form, the conditional Coxeter construction reopens below the breaking scale.

### D. Twisted weak-center incidence

Document 889 identified the Furey incidence signs as a weak-center-twisted local coefficient rather than an ordinary charge relation. Composing that twist with the vector bilinear is now a concrete test: does it induce $D$ on the contracted two-sector response?

## 7. Consequence for the main programme

The result separates three layers that had been in danger of being conflated:

1. **Spin(10) Clebsch layer:** supplies the common mediator and an overall weak-partner sign;
2. **color contraction layer:** supplies the $\sqrt3$ canonical multiplicity and $A_2$ geometry;
3. **local-coefficient layer:** must supply any relative lepton/color orientation needed to turn the two reflections into distinct simple roots.

The candidate route to the active selector is therefore

\[
\Gamma_{16,16,10}
\xrightarrow{\text{color contraction}}
g
\xrightarrow{\text{incidence/boundary twist }D}
Dg
\xrightarrow{\pi\text{ reflections}}
C_3.
\]

Only the middle twist remains structurally unidentified.

## 8. Stop-everything and falsification criteria

**Incidence trigger:** the already-established Furey local coefficient induces exactly $D=\operatorname{diag}(1,-1)$ on the lepton/color response after normalized contraction.

**Nonminimal-mediator trigger:** an explicit $120$ or $126$ component calculation produces a second projective direction at the $A_2$ angle and fits the known Standard-Model charge channels.

**Boundary trigger:** a derived gauge-invariant boundary/holonomy operation supplies $D$ and quantizes the two reflection phases.

**Minimal-route falsifier:** the minimal $16\,16\,10$ Clebsch coefficients alone yield projectively different weak-partner directions. The explicit exterior calculation finds they are projectively identical.

**Sign-convention falsifier:** a rephasing claimed to repair the route changes the lepton/color projective ratio while preserving all common weak-doublet and vector-basis conventions. Ordinary covariant rephasings cannot do this.

## 9. Verdict

| Question | Verdict |
|---|---|
| Is the $16\,16\to10$ bilinear explicit in the five-mode basis? | **yes** |
| Are all 40 allowed pair coefficients obtained? | **yes, each is $\pm1$** |
| Is the vector channel symmetric in its spinor inputs? | **yes** |
| Do the two neutral weak components differ projectively? | **no** |
| Does ordinary weak Pfaffian orientation supply the required sector-relative sign? | **no, it supplies only an overall channel sign** |
| Does the minimal paired-$\mathbf{10}$ route generate $C_3$? | **no; the two reflections coincide** |
| Can an additional color-relative local coefficient reopen it? | **yes, exactly if it induces $D$** |

## 10. Position in the corpus

- [completed Furey/Fock module equals the $Spin(10)$ weight system](888_the_completed_furey_five_mode_module_is_exactly_the_spin10_triorthogonal_weight_system_and_the_punctured_anomaly_is_rank_one.md)
- [weak-center-twisted incidence relation](889_the_furey_incidence_quartet_is_a_weak_center_twist_of_an_exact_spin10_neutral_relation_not_one_of_the_25_minimum_code_logicals.md)
- [weak Pfaffian phase lock](892_pfaffian_skewness_or_even_real_structure_collapses_the_higgs_hopf_phase_to_the_two_weak_symplectic_signs.md)
- [single vector-mediator kernel](897_the_so10_vector_mediator_forces_a_lepton_color_cross_kernel_but_generates_the_handle_only_after_a_normalization_and_phase_gate.md)
- [conditional paired-reflection $A_2$ theorem](898_color_multiplicity_and_an_oriented_weak_sign_turn_the_paired_so10_mediator_reflections_into_the_exact_a2_coxeter_generator.md)
