# Exceptional-parent frontier 02: the \(\mathbb Z_9\) lift protects the block split but cannot select seven of nine vertices

**Date:** 18 October 2026  
**Frontier:** second-stage exceptional/\(Spin(10)\) selector  
**Status:** exact component-level obstruction for the minimal \(27^3\) exceptional cubic; proton-protecting block rule survives conditionally  
**Certificate:** [test_exceptional_z9_heavy_threshold_and_seven_nine_mask.mjs](scripts/test_exceptional_z9_heavy_threshold_and_seven_nine_mask.mjs)

## Result

The gauge-dressed \(\mathbb Z_9\) lift does **not** enforce the desired seven-versus-nine incidence mask. It assigns charge zero to all nine Standard-Model component vertices in the \(Spin(10)\) invariant

\[
16_F\,16_F\,10_H.
\]

It therefore cannot retain the four ordinary Yukawa vertices and the three oriented Furey/leptoquark vertices while deleting only the two diquark vertices. The omitted two are symmetry-allowed, not symmetry-forbidden zeros.

The same \(\mathbb Z_9\) remains useful for a different and narrower job. It forbids both holomorphic and Hermitian mixing between the leptoquark component \(T\) and its diquark companion \(D\). Consequently it can protect proton stability against the dangerous cross-sector Schur complement even though it leaves the \(D\) source block intact.

The minimal exceptional threshold makes the distinction unavoidable. Under

\[
E_6\supset Spin(10)\times U(1),
\qquad
\mathbf{27}=\mathbf{16}_{1}\oplus\mathbf{10}_{-2}\oplus\mathbf{1}_{4},
\]

the exceptional cubic contains

\[
16\,16\,10+1\,10\,10.
\]

The \(Spin(10)\) quadratic on the \(10\) contains both the electroweak bidoublet pairing \(H_uH_d\) and the coloured-six Pfaffian pairing \(TD\). With the established charges,

\[
q(H_uH_d)=0,
\qquad
q(TD)=-3=6\pmod 9.
\]

No single charge for the same exceptional singlet \(x\) makes both components of \(x\,10\,10\) invariant. Thus the low-energy \(\mathbb Z_9\) cannot be imposed on the complete minimal exceptional cubic without splitting that invariant.

## 1. Exact nine-vertex ledger

Use left-chiral fields and the established order-nine lift

\[
q(Q)=1,
\quad q(u^c)=q(d^c)=-1,
\quad q(L)=q(e^c)=q(\nu^c)=0,
\]

with neutral electroweak Higgs fields and

\[
q(T)=-1,
\qquad q(D)=-2.
\]

The full component ledger is:

| class | vertex | total charge mod 9 | target mask |
|---|---|---:|---|
| ordinary | \(Q u^c H_u\) | 0 | retain |
| ordinary | \(Q d^c H_d\) | 0 | retain |
| ordinary | \(L e^c H_d\) | 0 | retain |
| ordinary | \(L \nu^c H_u\) | 0 | retain |
| Furey | \(TQL\) | 0 | retain |
| Furey | \(T^\dagger u^c e^c\) | 0 | retain |
| Furey | \(T^\dagger d^c\nu^c\) | 0 | retain |
| diquark | \(DQQ\) | 0 | delete |
| diquark | \(D^\dagger u^c d^c\) | 0 | delete |

Hence

\[
\boxed{
\ker q_{\mathbb Z_9}\text{ contains all nine vertices.}
}
\]

This is an exact selection-rule obstruction. No threshold calculation can turn a charge-zero vertex into a symmetry-forbidden one without adding a second datum.

## 2. What the symmetry really selects

The scalar bilinear charges are

| bilinear | charge mod 9 | status |
|---|---:|---|
| \(H_uH_d\) | 0 | allowed |
| \(TD\) | 6 | forbidden |
| \(T^\dagger D\) | 8 | forbidden |
| \(T^\dagger T\) | 0 | allowed |
| \(D^\dagger D\) | 0 | allowed |

Thus the heavy inverse propagator is block diagonal in the \(T/D\) split whenever \(\mathbb Z_9\) is exact. The consequences are:

- exchange inside the \(T\) block is allowed and produces the desired leptoquark Wilson channels;
- exchange inside the \(D\) block is allowed and produces a four-quark block;
- the mixed \(T\)-to-\(D\) exchange needed to combine a leptoquark current with a diquark current is forbidden.

The \(D\)-only exchange is not by itself a proton-decay statement: the two \(D\) vertices admit a consistent baryon-number assignment and their product is baryon conserving. The protection comes from excluding the cross block. This is why the precise positive statement is

\[
\boxed{
\mathbb Z_9\text{ is a mixing selector, not a vertex selector.}
}
\]

## 3. Complete minimal exceptional threshold test

Let \(x\) be the \(Spin(10)\)-singlet component of the exceptional \(\mathbf{27}\), with a single \(\mathbb Z_9\) eigencharge \(q_x\). The \(1\,10\,10\) invariant requires the same coefficient and the same \(x\) for the two Pati--Salam pieces

\[
xH_uH_d,
\qquad
xTD.
\]

Invariance demands simultaneously

\[
q_x=0,
\qquad
q_x+6=0\pmod 9.
\]

The second equation gives \(q_x=3\), so there is no common solution:

\[
\boxed{
\nexists q_x\in\mathbb Z_9:
x(10\cdot10)_{Spin(10)}\text{ is invariant component by component.}
}
\]

The alternatives are exact and mutually exclusive:

1. **\(q_x=0\).** The rank-one vacuum preserves \(\mathbb Z_9\), and \(xH_uH_d\) is allowed, but \(xTD\) is forbidden. The full \(Spin(10)\) quadratic has been split; the exceptional cubic is no longer retained as one invariant.
2. **\(q_x=3\).** The coloured Pfaffian term \(xTD\) is allowed, but \(xH_uH_d\) is forbidden. A nonzero \(x\) vacuum leaves only an order-three subgroup. In the established lift that subgroup is generated by the cube of the order-nine element, which is colour-centre gauge. The faithful baryon-triality protection is therefore lost.
3. **Any other \(q_x\).** Neither complete threshold pairing is available.

This is the sharpest obstruction obtainable without specifying a larger exceptional Higgs sector.

## 4. Scope of “complete inventory”

The theorem covers the complete component inventory forced by the **minimal exceptional cubic**

\[
27^3\supset16\,16\,10+1\,10\,10
\]

and the full Standard-Model decomposition of the single \(Spin(10)\) vector mediator relevant to the nine-channel problem. It also includes every quadratic pairing of its \(T\), \(D\), \(H_u\), and \(H_d\) components under the declared \(\mathbb Z_9\).

It does not claim an exhaustive theorem for arbitrary added \(120\), \(126\), \(351\), \(351'\), boundary sectors, or multiple singlets. Such additions are new representation data. They can evade the one-singlet equation only by supplying an independent selector, which is precisely what the minimal route lacks.

In a nonsupersymmetric theory, Hermitian masses such as \(10^\dagger10\) remain allowed. They can make \(D\) heavy while keeping the cross block zero. But \(\mathbb Z_9\) does not force a hierarchy between \(D\) and \(T\), and a finite heavy \(D\) still has its two allowed vertices. Calling this the exact seven-channel mask would therefore hide the required hierarchy as extra input.

## 5. Exact verdicts

| question | verdict |
|---|---|
| Does the gauge-dressed lift remain a valid low-energy charge assignment? | yes, conditional on the finite-normalizer and anomaly assumptions already stated in documents 1088--1095 |
| Does it allow the seven desired component vertices? | yes |
| Does it forbid the other two \(16\,16\,10\) vertices? | no; both have charge zero |
| Does it forbid \(T/D\) cross mixing? | yes |
| Does it protect against the corresponding proton-decay cross exchange? | yes, while exact |
| Does it preserve the complete minimal \(x\,10\,10\) exceptional threshold? | no for every single \(q_x\) |
| Does it derive an exact seven-versus-nine incidence mask? | no |
| Can a hierarchy make a seven-channel low-energy approximation? | yes, but the hierarchy is independent data |

## 6. Branch decision

### Retain: proton-protecting block symmetry

Keep the \(\mathbb Z_9\) lift as a candidate exact reason that the leptoquark and diquark source blocks do not communicate. This is its demonstrated high-value role.

### Close: \(\mathbb Z_9\) as the seven-versus-nine vertex selector

This branch is an exact no-go under the stated field and charge inventory. All nine source vertices are invariant.

### Close: unsplit minimal \(27^3\) plus exact unbroken \(\mathbb Z_9\)

The two components of \(x\,10\,10\) require incompatible singlet charges. One cannot retain the complete minimal exceptional cubic and the declared order-nine symmetry simultaneously.

### Keep open: a genuinely independent second selector

The remaining routes are:

- a represented finite-one-form incidence rule that deletes the two \(D\) arrows;
- a boundary/orbifold rule acting directly on vertices;
- additional exceptional representations with a derived Clebsch zero;
- a dynamical mass hierarchy, explicitly labelled approximate rather than an exact mask.

Any viable completion must also show that its new selector does not regenerate \(T/D\) mixing through heavy thresholds.

## 7. Stop-everything criteria

**Mask stop:** do not cite baryon triality as the reason \(DQQ\) or \(D^\dagger u^cd^c\) vanishes; both are neutral.

**Exceptional-invariant stop:** do not retain both \(xH_uH_d\) and \(xTD\) while assigning one definite \(\mathbb Z_9\) charge to \(x\).

**Hierarchy stop:** if \(D\) is merely heavy, describe the seven-channel result as an effective approximation and expose the mass ratio. It is not a symmetry-exact incidence mask.

**Reopening trigger:** supply a concrete enlarged representation inventory and prove, rather than stipulate, a protected zero for the two diquark source maps while preserving the oriented Furey Clebsch pair and the \(T/D\) block rule.

## Position in the corpus

- [rank-one exceptional vacuum selector no-go](frontier_parallel_exceptional_01_rank_one_vacuum_selector_no_go.md)
- [full \(Spin(10)\) nine-channel restoration](1073_the_spin10_16_16_10_Clebsch_tensor_supplies_the_FCp_relative_minus_but_also_restores_the_third_edge_and_diquark_channels.md)
- [proton-safe projector after breaking](1076_the_proton_safe_current_projector_exists_only_after_breaking_the_pati_salam_colour_lepton_roots.md)
- [minimal low-energy \(\mathbb Z_9\) protector](1088_Z9_is_the_minimal_family_universal_cyclic_lift_that_protects_triplet_companion_mixing_and_its_three_family_quotient_is_baryon_triality.md)
- [Pati--Salam factorization](1089_the_Z9_quark_number_lift_factors_exactly_into_a_chiral_module_phase_times_Pati_Salam_BminusL_and_its_gauge_quotient_is_baryon_triality.md)
- [exact residual stabilizer and colour-centre cube](1094_the_Majorana_vacuum_stabilizer_is_the_Z6_quotiented_standard_model_times_a_split_baryon_triality_with_the_Z9_lift_cubing_to_colour_centre.md)
