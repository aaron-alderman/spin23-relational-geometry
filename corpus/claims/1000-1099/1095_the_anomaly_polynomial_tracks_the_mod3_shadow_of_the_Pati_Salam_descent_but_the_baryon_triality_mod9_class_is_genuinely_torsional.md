# The Anomaly Polynomial Tracks the Mod-Three Shadow of the Pati–Salam Descent, but the Baryon-Triality Mod-Nine Class Is Genuinely Torsional

**Date:** 18 October 2026  
**Branches:** anomaly descent, Dai–Freed torsion, Pati–Salam breaking, baryon triality, three-family selection  
**Claim status:** exact finite charge and perturbative-anomaly ledger plus a rigorous limitation theorem; the combined-group \(\eta\)-invariant remains uncomputed  
**Certificate:** [prove_the_parent_and_broken_anomaly_ledgers_and_the_mod9_torsion_boundary.mjs](../../../verification/prove/prove_the_parent_and_broken_anomaly_ledgers_and_the_mod9_torsion_boundary.mjs)  
**Primary source:** García-Etxebarria and Montero, [*Dai–Freed anomalies in particle physics*, arXiv:1808.00009v3](https://arxiv.org/abs/1808.00009)

## Executive result

The parent and broken descriptions impose the same three-family divisibility, but
through two different layers of anomaly data.

For the split parent component acting on

\[
(\mathbf4,\mathbf2,\mathbf1)_{+1}
\oplus
(\bar{\mathbf4},\mathbf1,\mathbf2)_{-1},
\]

one generation has

\[
\operatorname{Tr}q
=
\operatorname{Tr}q^3
=
\mathcal A_{SU(4)^2\mathbb Z_3}
=0,
\]

but

\[
\mathcal A_{SU(2)_L^2\mathbb Z_3}=4=1\pmod3,
\qquad
\mathcal A_{SU(2)_R^2\mathbb Z_3}=-4=-1\pmod3.
\]

After the Majorana vacuum, use the inverse-convention baryon-triality
representative

\[
q_{B_3}=B-2Y=(0,1,-1,1,1,0)
\]

on

\[
(Q,u^c,d^c,L,e^c,\nu^c).
\]

Then one generation gives

\[
\operatorname{Tr}q_{B_3}
=
\operatorname{Tr}q_{B_3}^3
=3,
\]

\[
\mathcal A_{SU(3)^2\mathbb Z_3}=0,
\qquad
\mathcal A_{SU(2)^2\mathbb Z_3}=1\pmod3.
\]

Thus the perturbative mixed weak anomaly still detects

\[
N_f=0\pmod3.
\]

The refined Dai–Freed invariant detects

\[
3N_f=0\pmod9,
\]

which is the same family condition but a strictly finer modulus.

The central conclusion is negative and important:

\[
\boxed{
\text{a degree-six de Rham anomaly polynomial cannot by itself compute the }
\mathbb Z_9\text{ torsion class.}
}
\]

The polynomial records the continuously connected/local anomaly and its
mod-three discrete shadow. The modulo-nine refinement lives in
\(\Omega_5^{\mathrm{Spin}}(B\mathbb Z_3)\) and requires an \(\eta\)-invariant,
bordism generator, or an anomaly-free continuous embedding with fully specified
integer lifts and thresholds.

## 1. Source theorem

For odd \(n\), García-Etxebarria and Montero give the spin-\(\mathbb Z_n\)
conditions

\[
\sum_i
\left[
s_i^3-\frac14(n^2+3)s_i
\right]
=0\pmod{6n},
\qquad
\sum_i s_i=0\pmod n.
\]

For \(n=3\), these reduce to the statement that the net signed number of charge
\(+1\) minus charge \(-1\) Weyl fermions must vanish modulo nine:

\[
\boxed{\sum_i s_i=0\pmod9.}
\]

The paper then evaluates baryon triality and obtains total signed charge three
per generation. It therefore cancels only for a number of generations divisible
by three.

This is a torsion statement evaluated by \(\eta\)-invariants on generators of
\(\Omega_5^{\mathrm{Spin}}(B\mathbb Z_3)\), not merely a triangle-anomaly
calculation.

## 2. Parent coefficient ledger

Use left-chiral Pati–Salam matter

\[
F_L=(\mathbf4,\mathbf2,\mathbf1),\qquad q_X=+1,
\]

\[
F_R^c=(\bar{\mathbf4},\mathbf1,\mathbf2),\qquad q_X=-1.
\]

The dimensions immediately give

\[
\operatorname{Tr}q_X=8-8=0,
\qquad
\operatorname{Tr}q_X^3=8-8=0.
\]

With \(2T(\mathbf4)=2T(\bar{\mathbf4})=1\),

\[
\mathcal A_{SU(4)^2X}=2-2=0.
\]

The weak factors must be treated independently:

\[
\mathcal A_{SU(2)_L^2X}=4,
\qquad
\mathcal A_{SU(2)_R^2X}=-4.
\]

Reducing modulo three,

\[
(\mathcal A_L,\mathcal A_R)=(1,-1).
\]

For \(N_f\) generations, both vanish iff \(N_f=0\pmod3\).

At the level of a formal continuous background \(U(1)_X\), the mixed part of
the degree-six anomaly polynomial is proportional—up to standard normalization
conventions—to

\[
I_6^{\rm parent}
\supset
N_f\,c_1(X)
\left[
2c_2(SU(2)_L)-2c_2(SU(2)_R)
\right].
\]

The coefficient two rather than four here uses \(T(\mathbf2)=1/2\). The
executable certificate stores the integer \(2T\) normalization to avoid
fractions.

## 3. Broken-phase coefficient ledger

Choose

\[
q=(0,1,-1,1,1,0),
\qquad
y=6Y=(1,-4,2,-3,6,0).
\]

Including gauge multiplicities:

\[
\operatorname{Tr}q=3,
\qquad
\operatorname{Tr}q^3=3.
\]

The non-Abelian mixed coefficients in \(2T\) normalization are

\[
\mathcal A_{SU(3)^2q}
=
2q_Q+q_{u^c}+q_{d^c}
=0,
\]

\[
\mathcal A_{SU(2)^2q}
=
3q_Q+q_L
=1.
\]

The hypercharge-mixed integer sums are

\[
\operatorname{Tr}(q\,y^2)=90,
\qquad
\operatorname{Tr}(q^2y)=-6.
\]

Both are zero modulo three, while the weak coefficient is not. Hence all the
listed elementary discrete congruences cancel for three generations.

The split representative constructed in document 1094 has residues

\[
q_\tau=(1,0,1,1,1,0)\pmod3.
\]

Using \(0,1\) representatives gives signed sum twelve, whereas \(B-2Y\) gives
three. Their difference is nine because they differ by the colour-centre
character. Therefore

\[
\sum q_\tau=\sum q_{B_3}=3\pmod9.
\]

The Dai–Freed class is well defined on the gauge-equivalence class even though
the elementary-field tables look different.

## 4. What the degree-six polynomial can prove

A formal \(U(1)_X\) lift with charges \(q_i\) has local polynomial terms

\[
I_6\supset
\frac{\operatorname{Tr}q^3}{6}c_1(X)^3
-\frac{\operatorname{Tr}q}{24}c_1(X)p_1(T)
+c_1(X)\sum_G\mathcal A_{G^2X}c_2(G)
+\cdots .
\]

This polynomial can:

1. compute the parent mixed weak coefficients;
2. restrict continuous generators through
   \(Y=T_R^3+(B-L)/2\);
3. recover ordinary mixed discrete congruences after reducing integer charges;
4. prove the common \(N_f=0\pmod3\) necessary condition.

It cannot, without additional integral data:

1. distinguish a charge sum \(3\) from zero modulo three;
2. evaluate a torsion \(\mathbb Z_9\) bordism character;
3. determine counterterm choices on nontrivial flat \(\mathbb Z_3\) bundles;
4. construct the threshold/Wess–Zumino contribution of the Higgsed fields.

The reason is structural. A flat finite-group background has torsion
characteristic classes, which map to zero in real de Rham cohomology. The local
polynomial is therefore blind to precisely the integral refinement that changes
“zero modulo three” into “three modulo nine.”

## 5. Why an arbitrary continuous embedding is insufficient

For one generation, the displayed baryon-triality representatives have

\[
\operatorname{Tr}q=\operatorname{Tr}q^3=3\neq0.
\]

For three identical generations these become nine, not zero. Therefore simply
declaring a generation-independent \(U(1)_X\) with these same integer charges
does not produce an anomaly-free continuous parent.

As emphasized by García-Etxebarria and Montero, an anomaly-free \(U(1)\)
embedding may exist with generation-dependent integer lifts

\[
q_{i,a}=r_i+3m_{i,a},
\]

where all generations reduce to the same \(\mathbb Z_3\) residues. Those
integers—and any heavy fields required by them—are ultraviolet data. They are
not fixed by the residual triality table.

This gives a precise fork:

- **intrinsic torsion branch:** compute the \(\eta\)-invariant directly for the
  combined group;
- **continuous-completion branch:** solve for generation-dependent integer
  lifts and heavy thresholds, then derive the modulo-nine condition from exact
  \(U(1)\) anomaly cancellation.

## 6. Stop-everything criteria

**Polynomial stop:** no calculation using only real differential forms and the
degree-six anomaly polynomial may be advertised as a computation of the
\(\mathbb Z_9\) Dai–Freed invariant.

**Modulus stop:** cancellation modulo three is necessary but does not imply
cancellation modulo nine.

**Embedding stop:** multiplying three identical anomalous continuous
\(U(1)\) spectra does not cancel their exact polynomial; generation-dependent
integer lifts, extra matter, Green–Schwarz data, or a TQFT must be specified.

**Representative stop:** colour-centre-related elementary charge tables must
give the same modulo-nine signed sum. If they do not, multiplicities or
representative conventions have been mishandled.

**Transgression stop:** matching the family divisibility condition on both
sides is evidence of compatibility, not proof that the parent anomaly maps to
the low-energy class.

## 7. Positive triggers

This branch advances if one of the following is supplied:

1. an explicit generator set for
   \(\Omega_5^{\mathrm{Spin}}(BG_{\rm vac})\) and its \(\eta\)-invariants;
2. an Atiyah–Hirzebruch spectral-sequence computation including extension
   problems and the \(\mathbb Z_6\) gauge quotient;
3. a generation-dependent anomaly-free \(U(1)\) lift compatible with all
   Yukawa and Majorana operators;
4. a derived Higgs/Goldstone Wess–Zumino term whose variation gives the
   difference between the parent and broken anomaly representatives.

## 8. Verdict

The perturbative descent has reached its honest endpoint:

\[
\boxed{
\text{parent mixed weak anomaly}
\Longrightarrow
N_f=0\pmod3
\Longleftarrow
\text{broken mixed weak anomaly},
}
\]

while the stronger low-energy statement is

\[
\boxed{
\nu_{\rm DF}=3N_f\pmod9.
}
\]

The agreement in their zero loci is striking and useful. Their equality as
anomaly classes is not proved. The remaining information is torsional and must
be computed with bordism/\(\eta\)-invariant methods or derived from a fully
specified anomaly-free continuous completion.

## Position in the corpus

- [minimal generation-dependent continuous lift and flavon texture](1096_three_families_admit_a_minimal_anomaly_free_continuous_baryon_triality_lift_but_it_forces_a_one_plus_two_lepton_texture_repaired_by_a_charge_three_flavon.md)
- [exact Majorana-vacuum stabilizer](1094_the_Majorana_vacuum_stabilizer_is_the_Z6_quotiented_standard_model_times_a_split_baryon_triality_with_the_Z9_lift_cubing_to_colour_centre.md)
- [parent component and mixed weak anomalies](1093_the_order_nine_operator_is_a_gauge_dressed_component_of_SU4_times_Z3_and_the_three_family_obstruction_moves_into_mixed_weak_anomalies.md)
- [low-energy Dai–Freed quotient audit](1092_the_Z9_extension_not_its_naive_mod3_reduction_realizes_baryon_triality_and_matches_the_Dai_Freed_mod9_anomaly.md)

