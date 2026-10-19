# Exactly Twelve \(D_5\) Weyl Elements Exchange the Two \(S_1\) Channels, and All Swap the \(\nu^c\) and \(e^c\) Punctures

**Date:** 18 October 2026  
**Branches:** unpunctured \(Spin(10)\), Prakash–Ramya puncture, \(S_1\) Wilson matching, Pati–Salam \(SU(2)_R\), Furey channel flow  
**Claim status:** exhaustive finite Weyl-group theorem at weight-support level; spin-lift phases and viable UV dynamics remain open  
**Certificate:** [classify_D5_Weyl_maps_between_the_two_S1_FCp_operator_families.mjs](scripts/classify_D5_Weyl_maps_between_the_two_S1_FCp_operator_families.mjs)

## Executive result

Document 1071 found that the two \(S_1\) arms required by \(F_Cp\) have different grades after the \(\nu^c\) puncture. The open escape was an unpunctured symmetry that relates them before the logical coordinate is removed.

That symmetry exists, and its location is exact.

An exhaustive enumeration of the order-1920 Weyl group

\[
W(D_5)=S_5\ltimes(\mathbb Z_2)^4
\]

finds exactly twelve elements mapping the six component supports of

\[
\mathcal Q_{ue}=(QL)(u^ce^c)
\]

onto the six component supports of

\[
\mathcal Q_{\nu d}=(QL)(d^c\nu^c).
\]

They form the coset

\[
\boxed{
W_{\rm SM}\,r_{e_4+e_5},
\qquad
W_{\rm SM}\cong S_3^{\rm colour}\times S_2^{\rm weak},
}
\]

where \(r_{e_4+e_5}\) is the broken \(SU(2)_R\) Weyl reflection. Every one of the twelve obeys

\[
\nu^c\longleftrightarrow e^c.
\]

Therefore:

\[
\boxed{
\text{the unpunctured \(Spin(10)\) shell relates the two channels,}
\quad
\text{but fixing the physical \(\nu^c\) puncture breaks every exchanger.}}
\]

This is the exact symmetry-breaking mechanism anticipated in document 1071. It can protect equality of the two support families in a Weyl-invariant ultraviolet action, but the weight permutation alone does not determine the required spinor-lift/Clebsch phase.

## 1. The two support families

Using

\[
\epsilon QL=ue-d\nu,
\]

define the logical-neutral family

\[
\mathcal F_0=
\left\{
\{u_i,e,u_i^c,e^c\},
\{d_i,\nu,u_i^c,e^c\}
:i=1,2,3
\right\}
\]

and the puncture-logical family

\[
\mathcal F_1=
\left\{
\{u_i,e,d_i^c,\nu^c\},
\{d_i,\nu,d_i^c,\nu^c\}
:i=1,2,3
\right\}.
\]

Their intersections already force the puncture motion:

\[
\bigcap_{S\in\mathcal F_0}S=\{e^c\},
\qquad
\bigcap_{S\in\mathcal F_1}S=\{\nu^c\}.
\]

Any bijection carrying the complete family \(\mathcal F_0\) to \(\mathcal F_1\) must therefore send

\[
e^c\mapsto\nu^c.
\]

The finite enumeration strengthens this elementary argument: within \(W(D_5)\), every such map also sends \(\nu^c\mapsto e^c\), and no puncture-fixing exchanger exists.

## 2. The canonical exchanger

The clean representative is the root reflection in

\[
\alpha=e_4+e_5.
\]

On the five-sign weights it acts as

\[
r_\alpha(q_1,q_2,q_3,q_4,q_5)
=(q_1,q_2,q_3,-q_5,-q_4).
\]

Its field action is

\[
\begin{aligned}
u_i&\mapsto u_i,& d_i&\mapsto d_i,&
e&\mapsto e,& \nu&\mapsto\nu,\\
u_i^c&\leftrightarrow d_i^c,&
e^c&\leftrightarrow\nu^c.
\end{aligned}
\]

Thus it fixes every left-handed weak-doublet component and exchanges the two members of each right-handed-conjugate \(SU(2)_R\) doublet. Directly,

\[
\{u_i,e,u_i^c,e^c\}
\mapsto
\{u_i,e,d_i^c,\nu^c\},
\]

\[
\{d_i,\nu,u_i^c,e^c\}
\mapsto
\{d_i,\nu,d_i^c,\nu^c\}.
\]

The map exchanges the two operators component by component without needing to swap the left-handed weak components.

## 3. Why there are exactly twelve

Multiplying \(r_{e_4+e_5}\) by a Standard-Model Weyl transformation preserves the target family:

- \(S_3\) freely permutes the three colour coordinates;
- \(S_2\) exchanges the two weak coordinates and hence the two components of \(QL\).

This produces

\[
|S_3\times S_2|=6\cdot2=12
\]

exchangers.

The exhaustive search proves there are no others. In signed-permutation coordinates, every exchanger has:

- an arbitrary permutation of coordinates \(1,2,3\);
- either permutation of coordinates \(4,5\);
- sign vector \((+,+,+,-,-)\).

Consequently the exchanger set is one right coset of the Standard-Model Weyl group, not a new independent symmetry group.

## 4. Puncturing is the symmetry breaking

In the complete sixteen-weight shell, \(r_{e_4+e_5}\) is an ordinary \(D_5\) Weyl reflection. Once \(\nu^c\) is selected as the deleted/logical coordinate, the same reflection moves the puncture to \(e^c\).

The Prakash–Ramya paper notes that the Weyl group is transitive on all sixteen weights, while Standard-Model gauge neutrality selects \(\nu^c\) as the puncture (with the known exceptional mod-three ambiguity involving \(e^c\)). The present calculation gives this general statement a direct operator consequence:

\[
\text{channel exchange}
\quad\Longleftrightarrow\quad
\text{puncture exchange }\nu^c\leftrightarrow e^c
\]

within the complete \(D_5\) Weyl system.

This explains the grade mismatch of document 1071. The exchanger does not violate logical grading; it changes which coordinate is called logical.

## 5. What this says about the Wilson coefficients

At support level, an ultraviolet action invariant under \(r_{e_4+e_5}\) cannot assign unrelated magnitudes to the two complete operator families. The equality

\[
|C_{ue}|=|C_{\nu d}|
\]

therefore has a credible protection mechanism in the unpunctured parent theory.

But the Weyl enumeration does not establish

\[
\arg C_{ue}-\arg C_{\nu d}=\pi.
\]

A Weyl transformation on weights is a permutation of one-dimensional weight spaces. Its lift to the chiral spinor representation carries convention-sensitive signs, and the physical relative coefficient is fixed only after specifying:

1. the lift of \(r_{e_4+e_5}\) to \(Spin(10)\);
2. the \(16_F\,16_F\,10_H\) Clebsch–Gordan tensor;
3. the phase convention for the \(SU(2)_L\) and \(SU(2)_R\) epsilon tensors;
4. the scalar-triplet mass and conjugation convention;
5. the symmetry-breaking vacuum that selects the \(\nu^c\) puncture.

The next exact calculation is therefore representation-theoretic, not another support census.

## 6. The Pati–Salam reading

Under

\[
Spin(10)\supset SU(4)\times SU(2)_L\times SU(2)_R,
\]

the chiral spinor splits as

\[
\mathbf{16}=(\mathbf4,\mathbf2,\mathbf1)
\oplus(\bar{\mathbf4},\mathbf1,\mathbf2).
\]

The reflection \(r_{e_4+e_5}\) is exactly the Weyl exchange inside the \(SU(2)_R\) factor. This makes a relative epsilon sign plausible: the antisymmetric \(SU(2)_R\) contraction pairs schematically

\[
u^ce^c-d^c\nu^c
\]

up to field ordering and phase conventions.

If the full \(16_F16_F10_H\) invariant gives this sign while the left-handed contraction supplies \(QL\), the desired opposite Wilson orientation would be a genuine ultraviolet Clebsch relation.

That statement remains a trigger, not a result of the present certificate.

## 7. The price: proton safety and low-energy breaking

The same completion that restores \(Spin(10)\) or Pati–Salam covariance also enlarges the allowed interaction set. The colored component of a full \(\mathbf{10}_H\) generally belongs to a multiplet whose invariant couplings include diquark as well as leptoquark channels.

Therefore the attractive symmetry explanation comes with two hard gates:

- **doublet/triplet and puncture breaking:** explain why the low-energy theory keeps the desired effective relationship after \(SU(2)_R\) and \(Spin(10)\) are broken;
- **proton stability:** suppress the baryon-violating partners that the proton-safer isolated \(S_1\) assignment excluded by hand.

This is precisely the kind of uncomfortable branch the programme should retain rather than smooth over. The symmetry that can explain the coefficient relation is also the symmetry that removes the low-energy safety simplification.

## 8. Relation to \(Spin(2,3)\)

The result does not place \(Spin(2,3)\) inside \(Spin(10)\). It identifies a candidate ultraviolet origin for one generator needed by the response-level closure:

\[
\text{broken }SU(2)_R\text{ Weyl relation}
\longrightarrow
\text{paired }S_1\text{ Wilson arms}
\longrightarrow
F_Cp
\longrightarrow
\mathfrak{sp}_4(\mathbb R).
\]

Only the first arrow at support level is now exact. The Clebsch phase, mediator matching and positive response descent remain required.

The conceptual payoff is nevertheless substantial: the continuous response generator need not be an unbroken particle symmetry. It may be the effective remnant of a discrete parent relation whose breaking is exactly the physical puncture.

## 9. Stop-everything and falsification criteria

**Phase trigger:** an explicit \(16_F16_F10_H\) calculation gives \(\lambda_d=-\lambda_u\) in the same convention as the \(F_Cp\) intertwiner.

**Descent trigger:** after \(Spin(10)\) or Pati–Salam breaking and integrating out the colored mediator, the normalized low-energy response retains the protected opposite orientation.

**Puncture theorem:** derive the \(\nu^c\) puncture/vacuum as the same order parameter that breaks the channel-exchange coset.

**Proton-stability trigger:** a symmetry, missing-partner mechanism or sufficiently high mediator scale suppresses every dangerous diquark channel without destroying the required leptoquark matching.

**Weight-level falsifier:** find a puncture-fixing \(D_5\) Weyl element mapping \(\mathcal F_0\) to \(\mathcal F_1\). The exhaustive order-1920 certificate excludes one.

**Phase-warning:** infer the relative minus sign from the weight permutation alone. Support exchange does not fix spin-lift phases.

## 10. Verdict

| Question | Result |
|---|---|
| Does unpunctured \(W(D_5)\) exchange the two \(S_1\) families? | yes |
| How many elements do so? | exactly 12 |
| What are they? | \((S_3\times S_2)r_{e_4+e_5}\) |
| Is there a puncture-fixing exchanger? | no |
| What breaks the equality at code level? | selecting \(\nu^c\), which every exchanger swaps with \(e^c\) |
| Is the required relative phase proved? | no; it requires the spin lift and \(16\,16\,10\) invariant |

The code-grade obstruction and the parent-symmetry rescue are two sides of the same operation: the channel exchanger is exactly a puncture exchanger.

## Forward result

The spin-lift/Clebsch gate closes positively. In the five-mode Clifford model, all ten \(C\Gamma_A\) are symmetric and the isotropic vector bilinear gives \(ue-d\nu\) and \(u^ce^c-d^c\nu^c\). Hence the unified \(16_F16_F10_H\) tensor supplies the equal-and-opposite two-arm orientation required by \(F_Cp\). The unresolved problem is no longer the sign; it is retaining that sign while removing the rank-one third edge and the unified diquark partners. See [document 1073](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md).

## Position in the corpus

- [the two-channel code-grade split](1071_the_standard_model_code_separates_the_two_S1_FCp_channels_into_stabilizer_and_logical_sectors.md)
- [minimal \(S_1\) completion](1061_the_minimal_sm_field_completion_of_the_furey_channel_pulse_is_a_pair_of_dimension_six_S1_exchange_operators_with_an_underived_relative_phase.md)
- [puncture-neutral Standard-Model stabilizer](417_the_puncture_neutral_ternary_stabilizer_inside_so10_is_exactly_the_standard_model_lie_algebra.md)
- [Prakash–Ramya code re-entry](579_prakash_ramya_reentry_the_code_rigidifies_the_puncture_but_not_the_response_arrow.md)
