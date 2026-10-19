# NCG Pati–Salam Model C Realizes the Safe Source Split, but Its Minimal Left–Right Pair Still Closes the Wilson Triangle

**Date:** 18 October 2026  
**Branches:** noncommutative geometry, Pati–Salam Model C, proton-safe \(S_1\), \(F_Cp\) Wilson response  
**Claim status:** source-level literature reconstruction plus exact positive-Gram comparison; no identification with the Furey finite geometry is claimed  
**Certificate:** [audit_ncg_pati_salam_model_c_against_the_safe_FCp_source_and_wilson_targets.mjs](scripts/audit_ncg_pati_salam_model_c_against_the_safe_FCp_source_and_wilson_targets.mjs)  
**Primary source:** [Aydemir, Minic, Sun and Takeuchi, *B-decay anomalies and scalar leptoquarks in unified Pati–Salam models from noncommutative geometry*](https://arxiv.org/abs/1804.05844)

## Executive result

There is already a published noncommutative-geometric Pati–Salam construction that realizes the mechanism class demanded by documents 1076–1078.

In Model C of Aydemir–Minic–Sun–Takeuchi:

- a complex \(H_L(\mathbf6,\mathbf1,\mathbf1)\) contains a triplet \(H_{3L}\) that couples only to a left leptoquark current and a conjugate companion \(H_{\bar3L}\) that couples only to diquarks;
- a complex \(H_R(\mathbf6,\mathbf1,\mathbf1)\) supplies the corresponding right-sector pair;
- the leptoquark currents have the alternating weak contractions required by the present \(F_Cp\) branch;
- the absence of diquark couplings for \(H_{3L/R}\) is attributed to the underlying finite geometry, not to an extra low-energy \(U(1)\).

This is the strongest external contact yet with the programme’s proton-safe source projector.

But it does **not** solve the whole Wilson problem. To connect the left and right currents, \(H_{3L}\) and \(H_{3R}\) must communicate through their mass/inverse-propagator matrix. Positivity then gives

\[
C_{ud}=-\lVert\lambda_u\rVert_K^2<0,
\]

because the right current already packages the two components with opposite sign. Thus the minimal NCG left–right pair gives the beautiful two-arm orientation **and** the unwanted third edge.

The result is:

\[
\boxed{
\text{finite geometry can solve proton-safe incidence,}
\qquad
\text{but the minimal pair still produces the closed Wilson triangle}.}
\]

This is convergence, not failure. It assigns the two problems to two distinct structures:

- represented one-form incidence removes the diquark sources;
- an additional copy-space split or acceptance of the \(\pi\)-flux triangle decides Wilson sparsity.

## 1. What the paper actually constructs

The paper studies Pati–Salam models emerging from noncommutative geometry, with gauge group

\[
SU(4)_C\times SU(2)_L\times SU(2)_R.
\]

Model C contains separate complex multiplets

\[
H_L(\mathbf6,\mathbf1,\mathbf1),
\qquad
H_R(\mathbf6,\mathbf1,\mathbf1).
\]

Their Standard-Model decompositions contain leptoquark and diquark-source companions. The essential coupling equations are the paper’s Eqs. (85) and (102).

For the right sector, Eq. (85) has the source structure

\[
\left(d_R^C\nu_R-u_R^Ce_R\right)H_{3R}^*
+
\epsilon^{ijk}u_{Ri}^Cd_{Rj}H_{\bar3Rk}^*.
\]

For the left sector, Eq. (102) has

\[
\left(d_L^C\nu_L-u_L^Ce_L\right)H_{3L}^*
+
\epsilon^{ijk}u_{Li}^Cd_{Lj}H_{\bar3Lk}^*.
\]

Therefore the incidence table is

| Scalar component | Source type |
|---|---|
| \(H_{3L}\) | left leptoquark only |
| \(H_{3R}\) | right leptoquark only |
| \(H_{\bar3L}\) | left diquark only |
| \(H_{\bar3R}\) | right diquark only |

The paper explicitly states that the \(H_{3L/R}\) diquark couplings are absent because of the underlying NCG, while the companion fields carry the diquark couplings. It also states that mixing between the safe leptoquark and dangerous companion sectors must be suppressed.

## 2. Exact match to the source mask

Up to overall signs and translation between four-component and all-left Weyl conventions, define

\[
B_L=ue-d\nu,
\qquad
B_R=u^ce^c-d^c\nu^c.
\]

The paper’s two leptoquark currents are \(-B_L\) and \(-B_R\). Their product therefore has the same orientation as

\[
B_LB_R
=(ue-d\nu)(u^ce^c-d^c\nu^c).
\]

This is exactly the alternating weak contraction that the five-mode \(Spin(10)\) calculation found in document 1073.

At source-incidence level, Model C therefore realizes the target logic:

\[
\text{leptoquark current present},
\qquad
\text{diquark current routed to a different field}.
\]

That is subtler than simply deleting a component of one real six. The NCG model uses a **complex** six and separates its color–lepton and color–color source maps among independent complex triplet fields. This is why it evades the single-real-six mediator projector obstruction of document 1076.

## 3. Why this is not the single \(Spin(10)\) vector

The \(Spin(10)\) vector branch used one real

\[
\mathbf{10}\to(\mathbf6,\mathbf1,\mathbf1)\oplus(\mathbf1,\mathbf2,\mathbf2).
\]

Reality ties the triplet and antitriplet inside that \(\mathbf6\), and the unique \(16_F16_F10_H\) tensor ties leptoquark and diquark currents.

Model C instead contains separate complex \(H_L\) and \(H_R\) sixes generated in a larger NCG scalar sector. Consequently:

- it has more mediator degrees of freedom than one \(10_H\);
- left and right source currents couple to different complex fields;
- leptoquark and diquark currents couple to different companion components;
- the relation to a \(Spin(10)\) vector Clebsch is structural, not an equality of ultraviolet models.

The NCG result therefore does not contradict the earlier no-go. It exits through exactly the loopholes stated there: complexification, source-level selection and extra mediator structure.

## 4. The left–right mass mixing needed for the crossed response

Let the leptoquark mediator space be

\[
\mathcal M_{\mathrm{lq}}
=
\operatorname{span}\{H_{3L},H_{3R}\}.
\]

Write its positive inverse mass metric as

\[
K_{\mathrm{lq}}
=
\begin{pmatrix}
a&c\\
\bar c&b
\end{pmatrix},
\qquad
a>0,
\quad b>0,
\quad |c|^2<ab.
\]

The source vectors are

\[
\lambda_L=(1,0),
\qquad
\lambda_u=(0,1),
\qquad
\lambda_d=(0,-1).
\]

The desired crossed coefficients are

\[
C_{Lu}=\lambda_L^\dagger K\lambda_u=c,
\qquad
C_{Ld}=\lambda_L^\dagger K\lambda_d=-c.
\]

Therefore nonzero \(H_{3L}\)–\(H_{3R}\) propagation supplies the exact equal-and-opposite arm pattern.

This is the positive bridge:

\[
\boxed{c\ne0\Longrightarrow C_{Lu}=-C_{Ld}.}
\]

## 5. Positivity still forces the third edge

The same right current contains both \(u^ce^c\) and \(d^c\nu^c\), so

\[
\lambda_d=-\lambda_u.
\]

Consequently

\[
C_{ud}
=
\lambda_u^\dagger K\lambda_d
=
-\lambda_u^\dagger K\lambda_u
=-b<0.
\]

No choice of the left–right mixing \(c\) removes this. The minimal NCG pair therefore reproduces the same all-copy positive-Gram obstruction as document 1074.

It generates:

- the desired \(B_LB_u\) arm;
- the opposite \(B_LB_d\) arm;
- the unavoidable \(B_uB_d\) relation;
- diagonal self-current terms.

Thus Model C naturally lands on the closed relational triangle, not the pure open star.

## 6. Proton safety has its own mass-mixing gate

The complete colored mediator space is

\[
\mathcal M
=
\mathcal M_{\mathrm{lq}}
\oplus
\mathcal M_{\mathrm{dq}},
\]

where

\[
\mathcal M_{\mathrm{dq}}
=
\operatorname{span}\{H_{\bar3L},H_{\bar3R}\}.
\]

NCG source incidence is block diagonal: leptoquark currents couple to the first block and diquark currents to the second. But after integrating out the scalars, a mixed inverse-mass block

\[
K_{\mathrm{lq,dq}}\ne0
\]

reconnects a leptoquark source to a diquark source and regenerates proton-decay operators.

Exact proton safety therefore requires

\[
\boxed{K_{\mathrm{lq,dq}}=0}
\]

or a sufficiently strong quantitative suppression. This matches the paper’s explicit assumption that mixing between the safe leptoquark and dangerous companion fields is suppressed.

The finite geometry solves the **vertex incidence** problem. A complete model must still solve the **scalar-potential/mass-mixing** problem.

## 7. Relationship to the two-copy \(D\)-twist

The pair \((H_{3L},H_{3R})\) supplies two mediator directions, but not the two right-current faces required by the split-involution repair.

Its coupling pattern is

\[
\lambda_L=e_L,
\qquad
\lambda_u=e_R,
\qquad
\lambda_d=-e_R.
\]

Both right components occupy the same mediator ray. The required repair instead needs

\[
\lambda_d=-D\lambda_u
\]

with \(\lambda_u\) balanced across both eigenspaces of a nontrivial involution. Model C, as reconstructed here, does not provide that split.

A successful extension would need an additional multiplicity inside the right leptoquark one-form sector, or a boundary construction in which the effective right-current vectors separate after Schur reduction.

## 8. Why this is a major programme contact

The contact is unusually specific:

| Programme requirement | NCG Model C status |
|---|---|
| Pati–Salam \((6,1,1)\) carrier | present |
| separate left and right leptoquark sources | present |
| alternating weak contraction | present |
| diquark source absent from safe leptoquark field | present by finite geometry |
| dangerous companion sector identified | present |
| exact protection against companion mixing | assumed/suppressed, not derived in the cited analysis |
| two desired \(F_Cp\) arms | generated if left–right propagation/mixing is nonzero |
| pure open star | absent; positivity gives the third edge |
| derivation from Furey’s algebra | absent |

This is not a superficial resemblance. It is a worked example of the exact categorical distinction established in document 1077: gauge representation and coarse multiplet content do not determine source incidence; the finite differential geometry can.

## 9. Research consequences

### Immediate positive branch

Reconstruct the actual finite algebra, Hilbert bimodule and Dirac operator behind Model C, then compare its represented \(H_L/H_R\) one-forms with the Furey endpoint maps.

### Immediate negative branch

Do not claim that importing Model C produces the pure \(F_Cp\) pulse. Its minimal left–right leptoquark pair has the same positive-Gram third-edge obstruction already proved in the programme.

### Closed-triangle branch

Model C makes the closed triangle more credible: the third edge is not a random defect but the unavoidable self-response of the right alternating current. Its previously derived \(\pi\) flux and placement lift should now be tested in the NCG mass-mixing frame.

### Sparse-star repair branch

Search the represented finite calculus for another right-sector \(S_1\) multiplicity. If it exists, test whether a finite-geometric grading supplies the split involution \(D\) and simultaneously keeps the leptoquark–diquark mass block zero.

## 10. Stop-everything and reopening criteria

**Identification stop:** Model C is not the same theory as one real \(Spin(10)\) \(10_H\), and it is not yet the Furey finite geometry.

**Pure-star stop:** two fields \(H_{3L},H_{3R}\) with both right components on the same ray cannot remove \(C_{ud}\) under a positive inverse-mass metric.

**Proton-safety stop:** geometric absence of direct diquark coupling for \(H_3\) is insufficient if the scalar mass matrix mixes \(H_3\) with \(H_{\bar3}\).

**Strong reopening trigger:** derive, from one explicit finite spectral triple, all of:

1. the \(H_{3L/R}\) leptoquark-only source maps;
2. a protected zero leptoquark–diquark mass block;
3. a right-current multiplicity at least two carrying the split involution;
4. the exact positive kinetic metric needed for the open star.

**Alternative promotion trigger:** accept the third edge, derive its phase from the same NCG scalar potential, and match it to the established \(\pi\)-flux/placement-cover branch.

## 11. Verdict

The NCG Pati–Salam literature supplies the first concrete external witness that proton-safe source projection can be a theorem of finite geometry rather than an imposed low-energy charge. That materially advances the programme.

It also reinforces the programme’s recurring law: once the safe relationships are allowed to propagate through a positive mediator sector, completion tries to close the loop. The geometry can decide **which sources exist**; it does not automatically make their response graph sparse.

## Position in the corpus

- [proton-safe current projector](1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md)
- [one-form multiplicity underdetermination](1077_coarse_Furey_arrow_incidence_cannot_determine_the_represented_one_form_or_S1_copy_number.md)
- [minimal continuous \(U(1)\) no-go](1078_no_minimal_family_universal_anomaly_free_U1_can_protect_the_proton_safe_S1_source_mask.md)
- [positive-copy no-go and split-involution repair](1074_positive_Spin10_Clebsch_preserving_copies_can_never_remove_the_third_edge_but_a_twisted_two_copy_involution_can.md)
- [Wilson-triangle \(\pi\)-flux theorem](1065_the_one_S1_triangle_has_trivial_Bargmann_holonomy_but_shared_leg_mixing_generates_a_rephasing_invariant_pi_flux.md)
- [complex-six Pfaffian mixing gate](1080_the_complex_Pati_Salam_six_has_a_gauge_invariant_Pfaffian_that_reconnects_leptoquark_and_diquark_sources_unless_a_phase_grading_forbids_it.md)
