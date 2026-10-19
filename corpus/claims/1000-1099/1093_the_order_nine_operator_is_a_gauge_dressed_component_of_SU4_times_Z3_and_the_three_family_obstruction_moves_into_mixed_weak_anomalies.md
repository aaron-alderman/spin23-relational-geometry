# The Order-Nine Operator Is a Gauge-Dressed Component of \(SU(4)\times\mathbb Z_3\), and the Three-Family Obstruction Moves into Mixed Weak Anomalies

**Date:** 18 October 2026  
**Branches:** Pati–Salam global group, disconnected gauge extensions, Majorana-vacuum stabilizer, discrete anomaly matching, three-family selection  
**Claim status:** exact finite-group and representation calculation under the stated Pati–Salam matter contract; full bordism and Higgs-phase anomaly matching remain open  
**Certificate:** [prove_the_z9_lift_is_a_gauge_dressed_ps_component_and_locate_its_parent_anomalies.mjs](../../../verification/prove/prove_the_z9_lift_is_a_gauge_dressed_ps_component_and_locate_its_parent_anomalies.mjs)

## Executive result

Let

\[
\omega=e^{2\pi i/9},
\qquad
U=\operatorname{diag}(\omega,\omega,\omega,1),
\]

and define the subgroup

\[
H=\langle SU(4),U\rangle\subset U(4).
\]

The exact group is

\[
\boxed{
H=\{h\in U(4):\det h\in\mu_3\}
\cong SU(4)\times\mu_3.
}
\]

The determinant map gives the component quotient:

\[
1\longrightarrow SU(4)
\longrightarrow H
\overset{\det}{\longrightarrow}\mu_3
\longrightarrow1.
\]

This sequence splits centrally because \(\lambda\mapsto\lambda I_4\), for
\(\lambda^3=1\), satisfies

\[
\det(\lambda I_4)=\lambda^4=\lambda.
\]

Thus the order-nine matrix \(U\) is not itself the abstract component generator.
It is a **gauge-dressed representative** of that generator:

\[
U=\zeta_3 I_4\,s,
\qquad
\zeta_3=\omega^3,
\qquad
s=\operatorname{diag}(\omega^{-2},\omega^{-2},\omega^{-2},\omega^{-3})
\in SU(4).
\]

This distinction resolves an apparent contradiction:

- the central representative \(\zeta_3I_4\) charges the lepton coordinate and therefore does not preserve the rank-one Majorana direction by itself;
- its \(SU(4)\)-dressed representative \(U\) acts trivially on that coordinate and does preserve the Majorana direction;
- after symmetry breaking, the surviving discrete operation is the dressed representative, not the bare central factor.

For one left-chiral Pati–Salam generation

\[
F_L=(\mathbf4,\mathbf2,\mathbf1),
\qquad
F_R^c=(\bar{\mathbf4},\mathbf1,\mathbf2),
\]

the central component charges are \(+1\) and \(-1\) modulo three. Consequently:

\[
\sum q=8-8=0,
\qquad
\sum q^3=8-8=0,
\]

and the mixed \(SU(4)^2\mathbb Z_3\) coefficient also vanishes per generation.
But the two weak factors carry

\[
\mathcal A_{SU(2)_L^2\mathbb Z_3}=4=1\pmod3,
\qquad
\mathcal A_{SU(2)_R^2\mathbb Z_3}=-4=-1\pmod3.
\]

They vanish only when the family number is divisible by three.

The three-family obstruction has therefore not disappeared in the Pati–Salam
parent. It has moved:

\[
\boxed{
\text{low-energy pure Dai--Freed class}
\quad\longleftrightarrow\quad
\text{parent mixed left/right weak anomaly data}
}
\]

is now the anomaly-matching problem. This displayed arrow is a research target,
not yet a proved equality of bordism classes.

## 1. Sourced inputs and derived statements

The representation input is standard and independently explicit in
[You and Xu, arXiv:1412.4784](https://arxiv.org/abs/1412.4784): sixteen
left-chiral states form
\((\mathbf4,\mathbf2,\mathbf1)\oplus
(\bar{\mathbf4},\mathbf1,\mathbf2)\).

The NCG Pati–Salam setting and its complex
\((\mathbf6,\mathbf1,\mathbf1)\) scalar are documented by
[Aydemir, Minic, Sun and Takeuchi, arXiv:1804.05844](https://arxiv.org/abs/1804.05844).
The detailed finite-geometry scalar assignments used earlier in this corpus
remain model-specific.

The low-energy endpoint is sourced by
[García-Etxebarria and Montero, arXiv:1808.00009v3](https://arxiv.org/abs/1808.00009):
baryon triality has a \(\mathbb Z_9\)-valued Dai–Freed anomaly that cancels when
the number of generations is divisible by three.

Everything in Sections 2–6 below is a direct group or representation
calculation. The bordism transgression connecting the parent and broken phases
is not imported from those sources and is not claimed as proved.

## 2. Exact structure of the enlarged colour–lepton group

Since

\[
\det U=\omega^3=\zeta_3,
\]

every word in \(SU(4)\) and \(U\) has determinant in \(\mu_3\). Conversely, if
\(\det h=\lambda\in\mu_3\), then

\[
s_h=(\lambda I_4)^{-1}h
\]

has determinant

\[
\det s_h=\lambda^{-4}\det h=\lambda^{-3}=1.
\]

Therefore \(s_h\in SU(4)\) and \(h=\lambda I_4s_h\). The intersection of the
central \(\mu_3\) with \(SU(4)\) is trivial, because a scalar fourth root and a
scalar third root of unity coincide only at one. Hence the product is direct.

The order-nine lift nevertheless contains information not visible in the
abstract component group:

\[
U^3=\operatorname{diag}(\zeta_3,\zeta_3,\zeta_3,1)\in SU(4),
\qquad
U^9=I.
\]

It specifies a preferred path through the disconnected group whose cube is a
nontrivial gauge transformation. This is precisely why reducing its elementary
charges modulo three is the wrong way to read the quotient action.

## 3. The faithful Pati–Salam global group

On

\[
(\mathbf4,\mathbf2,\mathbf1)\oplus
(\bar{\mathbf4},\mathbf1,\mathbf2),
\]

the kernel of

\[
SU(4)\times SU(2)_L\times SU(2)_R
\]

is

\[
\mathbb Z_2^{\rm diag}
=\langle(-I_4,-I_2,-I_2)\rangle.
\]

Indeed, writing the centre phases as

\[
(i^k,(-1)^\ell,(-1)^r),
\]

faithfulness requires

\[
k+2\ell=0\pmod4,
\qquad
-k+2r=0\pmod4,
\]

whose only solutions are \((0,0,0)\) and \((2,1,1)\).

Because the added \(\mu_3\) intersects this kernel trivially, the enlarged
faithful group is

\[
\boxed{
\widehat G_{\rm PS}
=
\frac{H\times SU(2)_L\times SU(2)_R}{\mathbb Z_2^{\rm diag}}
\cong
\mathbb Z_3\times
\frac{SU(4)\times SU(2)_L\times SU(2)_R}{\mathbb Z_2^{\rm diag}}.
}
\]

This is the exact parent global group for the declared representation-level
contract. Whether the source NCG construction gauges this disconnected
component, treats it as global, or removes it by unimodularity remains open.

## 4. Why the Majorana vacuum chooses the dressed representative

Let \(e_4\) denote the lepton coordinate. Then

\[
Ue_4=e_4,
\]

so \(U\) preserves both the line \(\mathbb Ce_4\) and the symmetric-square
Majorana direction \(e_4\otimes e_4\).

By contrast,

\[
(\zeta_3I_4)e_4=\zeta_3e_4,
\]

so its symmetric square has charge two modulo three. The compensating gauge
factor obeys

\[
se_4=\omega^{-3}e_4=\zeta_3^{-1}e_4,
\]

and therefore

\[
(\zeta_3I_4)s\,e_4=e_4.
\]

The unbroken discrete symmetry is consequently a diagonal combination of:

1. the disconnected \(\mathbb Z_3\) component;
2. a broken \(SU(4)\) gauge transformation;
3. in the fully broken model, whatever \(SU(2)_R\) dressing is required by the
   chosen triplet/singlet vacuum convention.

This is the group-theoretic mechanism by which an abstract component symmetry
becomes baryon triality after the Pati–Salam vacuum is selected.

## 5. Parent anomaly ledger

Use left-chiral fields throughout. The central component generator assigns

\[
q(F_L)=+1,
\qquad
q(F_R^c)=-1
\pmod3.
\]

### 5.1 Pure and gravitational residues

There are eight Weyl components in each multiplet, so

\[
\mathcal A_{\rm grav}=8-8=0,
\qquad
\mathcal A_{\rm cubic}=8(1)^3+8(-1)^3=0.
\]

Thus the bare central representative has no standalone pure
\(\operatorname{Spin}\times\mathbb Z_3\) residue per Pati–Salam generation.

### 5.2 Mixed colour–lepton residue

With \(2T(\mathbf4)=2T(\bar{\mathbf4})=1\), weak multiplicity gives

\[
\mathcal A_{SU(4)^2\mathbb Z_3}
=2(+1)+2(-1)=0.
\]

### 5.3 Mixed weak residues

There are four \(SU(2)_L\) doublets in \(F_L\) and four \(SU(2)_R\) doublets in
\(F_R^c\). Therefore

\[
\mathcal A_L=4,
\qquad
\mathcal A_R=-4.
\]

For an odd-order \(\mathbb Z_3\), the elementary mixed congruence is modulo
three:

\[
\mathcal A_L=1\pmod3,
\qquad
\mathcal A_R=-1\pmod3.
\]

For \(N_f\) identical generations these become \(\pm4N_f\), so both vanish iff

\[
\boxed{N_f=0\pmod3.}
\]

The cancellation between left and right coefficients is not sufficient when
\(SU(2)_L\) and \(SU(2)_R\) are independent gauge factors.

## 6. What changed across the breaking threshold

The low-energy representative \(B-2Y\) from document 1092 has nonzero pure
Dai–Freed class \(3\pmod9\) per generation. The bare parent component
representative has zero pure class but nonzero mixed weak coefficients.

This is not a contradiction. The two representatives differ by gauge
transformations that are harmless only before fixing the symmetry-breaking
vacuum. Higgsing can redistribute an anomaly among:

- a residual discrete symmetry;
- broken gauge transformations;
- Goldstone/Wess–Zumino terms;
- local counterterms;
- heavy fermion and scalar thresholds.

The exact result established here is the parent anomaly ledger. The equality
between its anomaly inflow and the low-energy \(\mathbb Z_9\) Dai–Freed class
still requires a calculation in the combined global group.

## 7. Stop-everything criteria

**Direct-product stop:** do not describe
\(\langle SU(4),U\rangle\) as a nontrivial abstract \(\mathbb Z_3\) extension.
It is \(SU(4)\times\mathbb Z_3\). The nontrivial datum is the chosen order-nine
gauge-dressed representative.

**Pure-anomaly stop:** do not assign the low-energy pure baryon-triality class
directly to the bare central parent generator. Its pure linear and cubic sums
vanish per generation.

**Cancellation stop:** do not cancel the \(SU(2)_L^2\mathbb Z_3\) and
\(SU(2)_R^2\mathbb Z_3\) coefficients against one another while the two weak
groups are independently gauged.

**NCG stop:** if the exact finite-triple normalizer or unimodularity condition
excludes the disconnected component, this entire parent-symmetry branch closes
as a physical derivation even though its group theory remains correct.

**Bordism stop:** if the combined-group Atiyah–Hirzebruch spectral sequence or
an equivalent \(\eta\)-invariant computation does not reproduce the broken-phase
class after all threshold terms are included, the proposed anomaly matching is
false.

## 8. Positive triggers

The branch advances decisively if any of the following is achieved:

1. compute \(\Omega_5^{\mathrm{Spin}}(B\widehat G_{\rm PS})\) and evaluate the
   fermion representation on its generators;
2. derive the Higgsed residual group as an explicit stabilizer, including
   \(SU(2)_R\), hypercharge and all centre quotients;
3. construct the Wess–Zumino or invertible-field-theory term transporting the
   parent mixed anomaly into the low-energy pure \(\mathbb Z_9\) class;
4. verify from the source finite spectral triple that \(R_9\) belongs to its
   physical normalizer and survives its unimodularity prescription.

## 9. Verdict

The global-group problem has narrowed substantially:

\[
\boxed{
U\text{ is an order-nine lift of a split }\mathbb Z_3\text{ component,}
}
\]

but its physical importance lies in being the unique gauge-dressed component
representative that preserves the Majorana direction and protects the companion
zero.

Three families remain selected in the parent description, now through the two
mixed weak anomaly congruences. The next hard problem is no longer to guess the
group. It is to compute anomaly transport through its symmetry-breaking
stabilizer.

## Position in the corpus

- [exact Majorana-vacuum global stabilizer](1094_the_Majorana_vacuum_stabilizer_is_the_Z6_quotiented_standard_model_times_a_split_baryon_triality_with_the_Z9_lift_cubing_to_colour_centre.md)
- [gauge quotient and low-energy Dai–Freed class](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)
- [unique Majorana lift and four-sector admissibility](1091_the_rank_one_Majorana_vacuum_uniquely_selects_the_3B_mod9_lift_and_its_four_sector_operator_closes_only_for_three_family_unimodularity.md)
- [Pati–Salam module-phase factorization](1089_the_Z9_quark_number_lift_factors_exactly_into_a_chiral_module_phase_times_Pati_Salam_BminusL_and_its_gauge_quotient_is_baryon_triality.md)
- [NCG Pati–Salam Model C source reconstruction](1079_NCG_Pati_Salam_Model_C_realizes_the_safe_source_split_but_its_minimal_left_right_pair_still_closes_the_Wilson_triangle.md)

