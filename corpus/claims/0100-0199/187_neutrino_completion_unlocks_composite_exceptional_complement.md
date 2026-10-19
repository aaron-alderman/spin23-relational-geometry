# The Neutrino Completion Unlocks a Composite Exceptional Complement

**Date:** 17 October 2026  
**Branches:** B03, B05, B06, B09 and B11  
**Claim status:** exhaustive one-generation gauge-bilinear classification; no source-native Furey-to-exceptional map yet

## 1. The composite question

The exceptional complement transforms as

\[
(\mathbf3,\mathbf2)_{1/6}
\oplus
(\mathbf3,\mathbf1)_{-1/3}.
\]

Directly interpreting these coordinates as fermions fails the three-spinor Lorentz-scalar test. A natural escape is to make each complement coordinate a Lorentz-scalar bilinear of two left-handed Weyl fields.

The question is finite:

> Which one-generation Standard-Model fermion bilinears have exactly the two exceptional-complement gauge representations?

## 2. Matter inventory

Use the all-left multiplets

\[
Q:(\mathbf3,\mathbf2)_{1/6},
\quad
u^c:(\bar{\mathbf3},\mathbf1)_{-2/3},
\quad
d^c:(\bar{\mathbf3},\mathbf1)_{1/3},
\]

\[
L:(\mathbf1,\mathbf2)_{-1/2},
\quad
e^c:(\mathbf1,\mathbf1)_1,
\quad
\nu^c:(\mathbf1,\mathbf1)_0.
\]

The \(\nu^c\) field is precisely the unique one-state TRO extension found in the sixteen-state completion branch.

## 3. Unique doublet bilinear

To obtain a color triplet weak doublet, one can combine \(Q\) only with a colorless weak singlet, or combine two antitriplets and somehow obtain a weak doublet. The latter is impossible because \(u^c,d^c\) are weak singlets.

The possible \(Q\)-singlet products are

\[
Qe^c:(\mathbf3,\mathbf2)_{7/6},
\]

and

\[
\boxed{
Q\nu^c:(\mathbf3,\mathbf2)_{1/6}.
}
\]

Thus \(Q\nu^c\) is the unique bilinear with the exceptional doublet quantum numbers.

Without the right-handed-neutrino completion, no bilinear in the minimal fifteen-state matter TRO realizes the complement doublet.

This is a genuine cross-branch dependency:

\[
\text{unique }\nu^c\text{ TRO completion}
\Longrightarrow
\text{possible composite exceptional complement}.
\]

## 4. Two singlet bilinears

The target singlet is

\[
(\mathbf3,\mathbf1)_{-1/3}.
\]

There are exactly two one-generation bilinear routes.

### 4.1 Quark–lepton route

Contract the weak indices of \(Q\) and \(L\):

\[
\boxed{
(QL)_{\mathbf1}:(\mathbf3,\mathbf1)_{-1/3}.
}
\]

### 4.2 Two-antiquark route

Use the antisymmetric color projection

\[
\bar{\mathbf3}\otimes\bar{\mathbf3}
\supset\mathbf3
\]

to obtain

\[
\boxed{
(u^cd^c)_{\mathbf3}:(\mathbf3,\mathbf1)_{-1/3}.
}
\]

Gauge symmetry alone does not choose between these two composites.

## 5. Composite complement candidates

The two gauge-complete assignments are therefore

\[
Z_A
\sim
\big(Q\nu^c,\;QL\big),
\]

and

\[
\boxed{
Z_B
\sim
\big(Q\nu^c,\;u^cd^c\big).
}

Each entry is a Lorentz scalar formed by contracting two left-handed spinor indices with \(\epsilon_{\alpha\beta}\). The complement field is bosonic and the determinant contains six, not three, fermion fields.

## 6. Baryon and lepton numbers distinguish the two routes

Use

\[
B(Q)=\frac13,
\qquad
B(u^c)=B(d^c)=-\frac13,
\]

and

\[
L(L)=1,
\qquad
L(\nu^c)=-1.
\]

The doublet composite has

\[
B(Q\nu^c)=\frac13,
\qquad
L(Q\nu^c)=-1.
\]

### Determinant of \(Z_A\)

Two doublet columns plus the \(QL\) singlet give

\[
\Delta B=1,
\qquad
\Delta L=-1.
\]

This route is baryon violating.

### Determinant of \(Z_B\)

Two doublet columns plus the \(u^cd^c\) singlet give

\[
\boxed{
\Delta B=0,
\qquad
\Delta L=-2.
}
\]

Imposing baryon conservation therefore selects \(Z_B\) from the two gauge-equivalent composite assignments.

This is conditional selection: baryon number is an additional physical requirement, not part of the bare exceptional flag.

## 7. Operator dimension

Each Weyl field has canonical mass dimension \(3/2\). The determinant of three bilinears contains six fermion fields and has dimension

\[
6\cdot\frac32=9.
\]

A four-dimensional effective Lagrangian term therefore requires

\[
\frac{c}{\Lambda^5}\operatorname{Im}\det Z_B.
\]

The operator is highly irrelevant. This is compatible with strong suppression, but it does not explain the scale \(\Lambda\) or coefficient \(c\).

## 8. Explicit field structure of the baryon-safe determinant

Schematically,

\[
\det Z_B
\sim
\epsilon_{abc}\epsilon_{ij}
(Q^{ai}\nu^c)
(Q^{bj}\nu^c)
(u^cd^c)^c,
\]

where

\[
(u^cd^c)^c
\sim
\epsilon^{cab}u^c_a d^c_b.
\]

All parentheses denote Lorentz-scalar Weyl contractions. The result is:

- an \(SU(3)\) singlet;
- an \(SU(2)\) singlet;
- hypercharge neutral;
- baryon conserving;
- lepton-number violating by two units;
- antiunitary odd after taking its imaginary part.

It is therefore structurally closer to a Majorana/lepton-number-violating orientation portal than to an ordinary Yukawa interaction.

## 9. Relation to the Furey block incidence

The representation match does not yet prove a source-native map. In the selected Furey topology:

- \(Q\) and \(\nu^c\) occupy distinct directed blocks without an already-derived binary product landing in the exceptional complement;
- \(u^c\) and \(d^c\) share a source block, making an antisymmetric color composite plausible but not automatic;
- the TRO operation is ternary \(XY^\dagger Z\), while the proposed complement entries are binary fermion bilinears.

A real bridge must define a functor or contraction from the Furey linking algebra/CAR system into \(M_3(\mathbb C)\) and verify its behavior under gauge transformations, dagger, Lorentz conjugation and ternary composition.

The present result establishes representation-level existence and uniqueness properties only.

## 10. Low-energy caveat

The operator contains two \(\nu^c\) fields. If \(\nu^c\) is heavy, it does not directly survive in the low-energy action. Contracting or integrating out the sterile fields requires their Majorana propagator and the Yukawa couplings that connect them to active matter.

This may induce lower-field operators, but their coefficient, CP phase and locality must be computed in an explicit seesaw model. One cannot simply replace \(\nu^c\nu^c\) by a number.

## 11. Stop-everything and falsification gates

**Source-native composite:** the Furey CAR/linking construction canonically produces \(Q\nu^c\) and the color-antisymmetric \(u^cd^c\) in one exceptional complement matrix.

**Majorana bridge:** integrating out the unique \(\nu^c\) completion yields the previously derived polynomial Majorana invariant or a fixed low-energy descendant.

**Baryon selection:** baryon conservation follows from the same algebraic grading and uniquely excludes the \(QL\) route.

**Scale prediction:** the exceptional/Jordan response fixes \(c/\Lambda^5\) or relates it to a measured seesaw parameter.

**Composite failure:** Furey's ternary incidence admits no covariant binary contraction into the complement, leaving the construction as representation matching only.

**Phenomenological failure:** the induced \(\Delta L=2\) or four-quark descendants violate experimental bounds for every natural scale.

## 12. Certificate

The [composite-complement certificate](../../../verification/verify/verify_composite_exceptional_complement.mjs) exhausts unordered one-generation bilinear representation products, proves uniqueness of \(Q\nu^c\), finds exactly the two singlet composites, and verifies the gauge, baryon/lepton and operator-dimension ledger for both determinants.

## Companion documents

- [Exceptional complement statistics gate](186_exceptional_complement_quark_partial_match_and_statistics_gate.md)
- [Unique right-handed-neutrino TRO completion](167_unique_right_handed_neutrino_tro_completion_and_spin23_tradeoff.md)
- [Exchange-paired neutrino/Majorana gate](170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Furey anomaly-free TROs](110_furey_anomaly_free_one_generation_tros.md)
- [Polynomial Majorana invariant](182_low_degree_polynomial_majorana_cp_invariant.md)
