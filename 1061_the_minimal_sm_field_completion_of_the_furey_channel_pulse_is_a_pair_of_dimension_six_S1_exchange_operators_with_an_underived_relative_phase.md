# The Minimal Standard-Model-Field Completion of the Furey Channel Pulse Is a Pair of Dimension-Six \(S_1\)-Exchange Operators with an Underived Relative Phase

**Date:** 18 October 2026  
**Branches:** Furey channel pulse, SMEFT operator dimension, scalar leptoquark \(S_1\), baryon/lepton conservation, proton stability, response matching  
**Claim status:** exact one-generation representation and dimension audit; response matching coefficient and phenomenology open  
**Certificate:** [classify_the_minimal_sm_operator_completion_of_the_furey_channel_pulse.mjs](scripts/classify_the_minimal_sm_operator_completion_of_the_furey_channel_pulse.mjs)

## Executive result

The effective \(iF_Cp\) pulse has a minimal local completion using Standard-Model fermions plus a right-handed neutrino. It begins at dimension six, not dimension eight, and is generated at tree level by the proton-safer \(S_1\) leptoquark branch already isolated by the doubled-Furey geometry.

In left-handed Weyl notation define the weak-singlet bilinears

\[
B_L=(QL)_{\mathbf3,\mathbf1_{-1/3}},
\]

\[
B_u=(u^ce^c)_{\bar{\mathbf3},\mathbf1_{+1/3}},
\qquad
B_d=(d^c\nu^c)_{\bar{\mathbf3},\mathbf1_{+1/3}}.
\]

Then the two local operators

\[
\boxed{
\mathcal Q_{ue}=B_LB_u,
\qquad
\mathcal Q_{\nu d}=B_LB_d
}
\]

are:

- Lorentz scalars after antisymmetric Weyl contraction;
- \(SU(3)_c\times SU(2)_L\times U(1)_Y\) singlets;
- dimension six;
- separately baryon- and lepton-number conserving.

No Standard-Model-only dimension-five operator can perform the same cross-channel task because color-singlet Higgs insertions cannot neutralize the triplet \(QL\) bilinear or the antitriplet right-singlet bilinears.

One scalar representation

\[
S_1=(\bar{\mathbf3},\mathbf1)_{1/3}
\]

with

\[
B(S_1)=-\frac13,
\qquad
L(S_1)=-1
\]

can couple to all three bilinears:

\[
S_1B_L,
\qquad
S_1^\dagger B_u,
\qquad
S_1^\dagger B_d.
\]

Tree-level \(S_1\) exchange can generate both dimension-six operators. [Document 1062](1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md) subsequently proves that one field copy necessarily generates an additional right–right operator; two orthogonal copies are minimal if the target is the pure sparse \(F_Cp\) pulse.

This is a credible microscopic lane, but not yet the desired pulse. The \(iF_Cp\) response matrix requires the two crossed Wilson coefficients to have equal magnitude and opposite oriented phase in the established channel convention. Gauge symmetry and \(B,L\) conservation do not impose that relation.

> **Forward result (document 1073).** The phase is underived in the isolated Standard-Model \(S_1\) theory, but it is fixed in the unpunctured \(Spin(10)\) parent. The exact five-mode \(16_F16_F10_H\) Clebsch tensor contains \(u^ce^c-d^c\nu^c\), supplying the required equal-and-opposite orientation. This does not yet produce a viable pure pulse: the same unified invariant restores the rank-one third edge and diquark partners. See [the \(Spin(10)\) Clebsch theorem](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md).

## 1. Field conventions

Use one generation of left-handed Weyl fields:

\[
\begin{array}{c|c|c|c}
&SU(3)_c&SU(2)_L&Y\\ \hline
Q&\mathbf3&\mathbf2&1/6\\
L&\mathbf1&\mathbf2&-1/2\\
u^c&\bar{\mathbf3}&\mathbf1&-2/3\\
d^c&\bar{\mathbf3}&\mathbf1&1/3\\
e^c&\mathbf1&\mathbf1&1\\
\nu^c&\mathbf1&\mathbf1&0.
\end{array}
\]

The baryon and lepton charges are

\[
B(Q)=\frac13,
\qquad
B(u^c)=B(d^c)=-\frac13,
\]

\[
L(L)=1,
\qquad
L(e^c)=L(\nu^c)=-1.
\]

Each Weyl field has engineering dimension \(3/2\).

## 2. The two crossed operators

For \(QL\), the weak product contains

\[
\mathbf2\otimes\mathbf2
=\mathbf1\oplus\mathbf3.
\]

The singlet branch has

\[
QL:
\quad
(\mathbf3,\mathbf1)_{-1/3},
\qquad
B=\frac13,
\qquad
L=1.
\]

The two right-singlet pairs have identical quantum numbers:

\[
u^ce^c,\ d^c\nu^c:
\quad
(\bar{\mathbf3},\mathbf1)_{+1/3},
\qquad
B=-\frac13,
\qquad
L=-1.
\]

Their products are therefore complete singlets:

\[
\mathcal Q_{ue}
=(QL)(u^ce^c),
\]

\[
\mathcal Q_{\nu d}
=(QL)(d^c\nu^c).
\]

Every gauge and global charge cancels. Their engineering dimension is

\[
4\times\frac32=6.
\]

The weak-triplet \(QL\) branch cannot pair with either right-singlet bilinear without an additional triplet insertion, so the minimal common completion uses \(S_1\), not \(S_3\).

## 3. Why dimension five is impossible

A dimension-five four-dimensional operator containing fermions normally has two Weyl fields and two scalar dimensions, or two Weyl fields plus one field strength.

The crossed bilinears relevant here carry color:

\[
QL\sim\mathbf3,
\]

\[
u^ce^c,\ d^c\nu^c\sim\bar{\mathbf3}.
\]

The Standard-Model Higgs and gauge field strengths are color singlets or adjoints. No insertion of only color-singlet Higgs fields can turn one of these bilinears into a color singlet. A single adjoint also does not contain the conjugate fundamental needed for contraction.

Therefore a Standard-Model-only dimension-five cross completion is excluded. The first color-neutral local operator pairs the triplet with an antitriplet and contains four Weyl fields, giving dimension six.

This result assumes no new colored field appears explicitly in the low-energy operator. With a propagating \(S_1\), the renormalizable UV vertices are dimension four and the dimension-six operators arise after it is integrated out.

## 4. Tree-level \(S_1\) completion

Take

\[
S_1=(\bar{\mathbf3},\mathbf1)_{1/3}.
\]

A schematic interaction is

\[
\mathcal L_{S_1}
=
\lambda_L S_1(QL)
+\lambda_u S_1^\dagger(u^ce^c)
+\lambda_d S_1^\dagger(d^c\nu^c)
+\text{h.c.}
-M_{S_1}^2|S_1|^2.
\]

Integrating out \(S_1\) generates

\[
\frac{C_{ue}}{M_{S_1}^2}\mathcal Q_{ue}
+\frac{C_{\nu d}}{M_{S_1}^2}\mathcal Q_{\nu d}
+\text{h.c.},
\]

with coefficients proportional, up to convention, to

\[
C_{ue}\sim\lambda_L\lambda_u,
\qquad
C_{\nu d}\sim\lambda_L\lambda_d.
\]

One mediator therefore supplies both crossed edges.

## 5. Matching to \(iF_Cp\)

In channel order

\[
(u,\nu,d,e),
\]

the source generator is

\[
F_Cp=
\begin{pmatrix}
0&0&0&-1\\
0&0&1&0\\
0&-1&0&0\\
1&0&0&0
\end{pmatrix}.
\]

Thus the two oriented planes have opposite signs:

\[
u\leftarrow-e,
\qquad
e\leftarrow+u,
\]

\[
\nu\leftarrow+d,
\qquad
d\leftarrow-\nu.
\]

The Hermitian pulse \(iF_Cp\) consequently requires the two effective crossed coefficients to share one magnitude and carry opposite oriented phases in this basis.

Schematically,

\[
|C_{ue}|=|C_{\nu d}|,
\qquad
\arg C_{ue}-\arg C_{\nu d}=\pi
\]

after extracting the common \(i\) and fixing operator conventions.

The exact sign can shift under Weyl-field and bilinear phase conventions, but the invariant statement remains: one relative orientation is required between the two planes.

Gauge symmetry permits independent \(\lambda_u\) and \(\lambda_d\). It does not enforce the Furey relation. A source grading, CP condition, left-right symmetry or unified mediator texture must supply it.

## 6. Proton stability

The gauge representation \(S_1\) also permits diquark couplings in a generic extension. Those couplings allow proton decay when combined with the leptoquark vertices.

The Furey first-order classifier excludes the basic

\[
QQ
\qquad\text{and}\qquad
u^cd^c
\]

links. Independently, assigning exact separate baryon and lepton charges

\[
B(S_1)=-\frac13,
\qquad
L(S_1)=-1
\]

allows the displayed leptoquark vertices but forbids the diquark ones.

This gives a perturbative proton-safer branch. It is not a complete theorem because:

- electroweak anomalies violate \(B+L\) nonperturbatively;
- Majorana neutrino terms break lepton number;
- a scalar potential or higher-dimensional operators may violate the assigned charges;
- ultraviolet unification such as a full \(Spin(10)\) \(10_H\) restores the diquark completion.

The proton-safe claim must therefore be attached to the exact \(B,L\)-preserving \(S_1\) effective theory, not to the gauge representation alone.

## 7. Three microscopic readings

### Spurion/source path

Rotate the four dimension-four Yukawa source coefficients directly. This is gauge invariant and renormalizable as a time-dependent coupling path, but it is external control unless the sources become fields.

### Dimension-six EFT

Use \(\mathcal Q_{ue}\) and \(\mathcal Q_{\nu d}\) as local four-fermion operators. This is the minimal Standard-Model-field completion.

### Renormalizable \(S_1\) UV completion

Introduce a heavy \(S_1\) and integrate it out. This gives a concrete mediator but creates collider, flavor and proton-stability obligations.

These levels must be kept distinct.

## 8. What is still not proved

The existence of the two dimension-six operators does not prove that their low-energy response reduction is exactly

\[
iF_Cp.
\]

The missing matching calculation must determine:

- normalization and relative phase of \(C_{ue}\) and \(C_{\nu d}\);
- loop and Fierz factors;
- channel wavefunction normalization;
- flavor matrices over three generations;
- whether the pulse acts on sources, composite modes or physical asymptotic states;
- whether the induced response is local enough to be approximated by document 1060.

Until then, \(S_1\) is the minimal credible completion, not a derivation.

## 9. Stop-everything tests and falsifiers

**Matching trigger:** explicit tree/loop reduction gives the antisymmetric response kernel proportional to \(iF_Cp\) with one common coefficient.

**Furey-phase trigger:** the doubled-arrow/linking algebra fixes \(\lambda_d/\lambda_u\) to the required oriented value.

**Proton-safety trigger:** exact \(B\) and \(L\), or another source symmetry, forbids every \(S_1\) diquark coupling and remains stable under renormalization.

**Dimension-six falsifier:** a claimed lower-dimensional Standard-Model-only operator fails to neutralize color.

**Gauge-only overclaim:** the allowed \(S_1\) representation is said to enforce equal magnitudes or relative phase; it does not.

**Spin(10) warning:** embedding the mediator in a complete \(10_H\) restores the proton-dangerous diquark partners unless additional splitting or selection is supplied.

## Verdict

| Question | Verdict |
|---|---|
| Lowest Standard-Model-field operator dimension? | **Six** |
| Minimal operators? | **\((QL)(u^ce^c)\) and \((QL)(d^c\nu^c)\)** |
| Common mediator representation? | **\(S_1=(\bar3,1)_{1/3}\)** |
| Copies needed for the pure two-edge pulse? | **Two; one copy produces an extra edge** |
| Can the branch conserve \(B\) and \(L\)? | **Yes, with the displayed \(S_1\) charges** |
| Are diquarks automatically absent from the gauge representation? | **No** |
| Does gauge symmetry fix the \(iF_Cp\) phase relation? | **No** |
| Is exact response matching complete? | **No** |

## Position in the corpus

- [gauge dressing of the doubled Furey links](programme_foundations_parallel_03_gauge_dressing_turns_the_three_extra_furey_links_into_s1_s3_leptoquark_channels.md)
- [Spin(10) restoration of dangerous diquarks](programme_foundations_parallel_04_the_spin10_ten_cubic_completes_the_furey_s1_links_by_restoring_the_forbidden_diquarks.md)
- [positive effective Furey pulse](1060_a_positive_first_order_response_pulse_generates_the_full_furey_channel_flow_without_bulk_degeneracy_but_needs_microscopic_charge_completion.md)
- [complete neutral-probe mixing graph](814_exact_standard_model_quantum_numbers_allow_the_complete_cross_channel_mixing_graph_so_the_r4_center_is_not_symmetry_protected.md)
- [rank-one obstruction and two-copy repair](1062_one_S1_mediator_cannot_generate_a_pure_FCp_pulse_but_two_orthogonal_copies_realize_the_exact_oriented_star.md)
