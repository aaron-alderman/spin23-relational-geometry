# The Minimal Pati--Salam Tree Census Leaves One Correlated Schur Column but Does Not Derive the Family Intertwiner

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive bounded one-mediator census and aggregate-rank result; conditional on the central family mask, not a completed physical embedding

**Depends on:** [the three-topology tree census](../1400-1499/1496_exactly_three_single_mediator_tree_bridges_generate_the_dimension_five_Dirac_leakage_and_each_requires_two_incidence_portals.md), [the sourced Pati--Salam inventory](../1400-1499/1498_the_minimal_spectral_Pati_Salam_inventory_reduces_the_three_Dirac_bridges_to_one_conditional_family_charged_bidoublet_threat.md), [the charged-bidoublet support identity](../1400-1499/1499_the_family_charged_bidoublet_is_exactly_the_forbidden_Dirac_cross_one_form_so_the_central_mask_closes_all_minimal_tree_leakage.md), and [the local-Hom/global-rank no-go](1510_one_dimensional_local_arrow_spaces_do_not_force_the_global_rank_one_Schur_alignment_ideal.md)

**Primary-source boundary:** [Chamseddine--Connes--van Suijlekom, arXiv:1304.8050](https://arxiv.org/abs/1304.8050) fixes the generation-blind spectral Pati--Salam gauge carriers used here. It does not supply the programme's represented (P/I/N) family algebra or sector-dependent anchors.

**Evidence:** [aggregate-intertwiner census](../../../evidence/data/spin23-minimal-pati-salam-aggregate-intertwiner-census.json) and [executable verifier](../../../verification/verify/verify_spin23_minimal_pati_salam_aggregate_intertwiner_census.mjs)

## Result

The nearest physical-intertwiner test has a two-level answer.

For the actually sourced generation-blind Pati--Salam carrier, gauge
representation theory gives a one-dimensional Clebsch channel on each
irreducible bidoublet carrier, but the family coefficient remains arbitrary:

\[
\operatorname{Hom}_{PS}(L\otimes H_1,R)\cong\mathbb C,
\qquad
D_{LHR}=T_{LHR}\otimes K,
\qquad
K\in\operatorname{End}(\mathbb C^3).
\]

Thus

\[
\boxed{
\dim_{\mathbb C}\operatorname{End}(\mathbb C^3)=9,
\quad
\text{so gauge multiplicity one does not derive the family mask or common ray.}
}
\]

For the programme's **bounded family-masked completion**, the answer is
different. Impose the already-declared rank-one selected line, retain its
Majorana \(P\)-\(N\) sewing, set the central Dirac \(P\)-\(N\) support to zero, and add
no new vectorlike matter or non-spectral elementary scalar. Then the complete
minimal one-mediator census, after projection onto the chosen light Higgs
direction, contains:

1. one retained selected-neutrino bridge, which is a complete correlated
   Schur packet;
2. no heavy vectorlike left-multiplet bridge;
3. no charged-bidoublet bridge, because its Yukawa face is exactly the
   forbidden Dirac cross one-form.

The aggregate matrix is consequently only

\[
V_{\mathrm{minimal}}=
\begin{pmatrix}d_{\mathrm{eff}}\\y_{\mathrm{eff}}\end{pmatrix},
\]

so

\[
\boxed{
\operatorname{rank}V_{\mathrm{minimal}}\leq1,
\qquad
\#\{2\times2\text{ cross-mediator minors}\}=0.
}
\]

This is an **absence-based conditional survivor**, not a Spin(2,3) or
Pati--Salam multiplicity-one theorem. Priority 1 of claim 1511 is therefore
closed at the current evidence boundary: the minimal masked tree sector is
safe, while the physical derivation of its mask remains open.

## 1. What is genuinely sourced

Use

\[
G_{PS}=SU(2)_R\times SU(2)_L\times SU(4)
\]

and the fermion carriers

\[
R=(2,1,4),
\qquad
L=(1,2,4).
\]

The fundamental Dirac bidoublet is \(H_1=(2,2,1)\). Depending on the
order-one assumptions, the generalized scalar sector can also contain
\(H_{15}=(2,2,15)\). The elementary representation arithmetic is

\[
2\otimes2=1\oplus3,
\qquad
\overline4\otimes4=1\oplus15.
\]

The singlet occurs once in the weak product, so each fixed irreducible
bidoublet carrier has one gauge Clebsch channel. The source also contains no
independent heavy vectorlike \(L=(1,2,4)\) copy.

These are source-level facts. The following are not source-level facts:

- a represented selected/image/null family decomposition;
- the central Dirac \(P\)-\(N\) zero;
- sector-dependent opposite-algebra anchors;
- a theorem identifying all family portal ratios.

The published algebra acts trivially on generation space. As claim 1115
proved,

\[
[[T\otimes K,\pi(a)],\pi^\circ(b)]
=
[[T,\pi_{\rm int}(a)],\pi_{\rm int}^\circ(b)]\otimes K.
\]

Once the internal arrow is allowed, every \(K\in M_3(\mathbb C)\) passes the
same first-order test. One gauge intertwiner must therefore not be reported
as one physical family intertwiner.

## 2. Exhaustive bounded topology table

The four external legs of the leading operator are

\[
\{L_P,H,\nu_N^c,S\}.
\]

Their three unordered two-pair partitions exhaust the one-propagator
renormalizable tree topologies:

| topology | mediator | sourced/minimal status | contribution to \(V\) |
|---|---|---|---|
| \((L_PH)\mid(\nu_N^cS)\) | \(R=(2,1,4)\) | selected right-neutrino present; full matching is correlated | one retained column |
| \((L_PS)\mid(\nu_N^cH)\) | \(L=(1,2,4)\) | no independent heavy vectorlike copy | none |
| \((L_P\nu_N^c)\mid(HS)\) | \(\Phi=(2,2,1\oplus15)\) | family-charged face conditional; zero under the central Dirac mask | none |

The first row deserves care. After symmetry breaking and projection onto the
chosen light Higgs direction, both \(H_1\) and a possible \(H_{15}\) can
contribute to the effective selected Dirac coupling \(d_{\rm eff}\). They do
not by themselves create two eliminated heavy states. Eliminating the single
selected state still produces one outer product,

\[
-\frac1a
\begin{pmatrix}d_{\rm eff}\\y_{\rm eff}\end{pmatrix}
\begin{pmatrix}d_{\rm eff}&y_{\rm eff}\end{pmatrix}.
\]

Scalar-channel multiplicity and mediator-column multiplicity are different
questions. The latter controls the minors of claim 1510.

## 3. Why the charged bidoublet contributes no masked column

The scalar topology has two gauge-distinct carrier possibilities,
\((2,2,1)\) and \((2,2,15)\), but either requires the family-crossing Yukawa
face. In the represented calculus that face has support

\[
\omega_{PN}=p_P[D,p_N],
\qquad
(\omega_{PN})_{L_P,R_N}=D_{L_P,R_N}.
\]

Therefore the assumed central support condition

\[
D_{L_P,R_N}=0
\]

kills the dangerous family face for both gauge carriers. A scalar mixing term
cannot complete the fermionic operator without this Yukawa portal. This is
why two possible gauge carriers still contribute zero aggregate columns in
the masked completion.

It is also where the conditionality enters: the generation-blind published
source neither defines \(p_P,p_N\) nor forces this block to vanish.

## 4. Aggregate-rank conclusion

For mediator packets \(i\), claim 1510 uses

\[
V=
\begin{pmatrix}
d_1&\cdots&d_m\\
y_1&\cdots&y_m
\end{pmatrix}.
\]

The bounded masked census gives \(m=1\). Hence the determinantal ideal has no
generators: there is no pair \(i<j\), and projective alignment is automatic.
The single path already obeys the rank-one Schur identity from claim 1508.

This closes a possible ambiguity in the roadmap. The current minimal tree
sector does not need a nontrivial mechanism aligning several surviving
columns. It needs a physical construction that makes the other columns
absent.

## 5. Immediate reopeners and kill test

Any one of the following reactivates the global-minor problem:

1. an independent heavy vectorlike \(L\) copy;
2. a non-spectral or mask-evading charge-three bidoublet;
3. a selected heavy subspace of dimension greater than one.

With one additional freely coupled packet, the two columns can be

\[
v_1=(1,1)^T,
\qquad
v_2=(1,-1)^T,
\]

and then

\[
\det(v_1,v_2)=-2\ne0.
\]

Thus the present positive result cannot be extrapolated to nonminimal
completions. Each added carrier must be shown absent or tied to the common
ray by a new theorem.

## 6. Programme decision

The census returns neither an unconditional victory nor a generic failure.
It separates them:

\[
\boxed{
\begin{array}{ll}
\text{published generation-blind core:}&
\text{does not derive the family intertwiner};\\[2mm]
\text{bounded central-mask completion:}&
\text{one correlated column, hence automatic rank one}.
\end{array}
}
\]

The next physical task is consequently not another abstract mediator search.
It is the complete family-extended real-even Pati--Salam bimodule test:

- realize the central Dirac \(P\)-\(N\) zero and Majorana \(P\)-\(N\) edge together;
- pass \(J\), grading, first order, orientability and duality;
- retain all required Standard-Model Yukawas;
- then test one-loop tangency on that frozen carrier.

If that embedding fails, the minimal-tree rank-one result has no physical
carrier. If it succeeds, the one-loop/RG test becomes the decisive next gate.

## Boundaries

**Physical-admission stop:** the central family mask is programme input here,
not a consequence of arXiv:1304.8050.

**Multiplicity stop:** one gauge Clebsch channel does not imply a
one-dimensional family Hom space in a generation-blind triple.

**Scalar-channel stop:** \(H_1\) and \(H_{15}\) are distinct gauge channels,
but they are not automatically distinct heavy-mediator columns. More than one
surviving light Higgs direction requires an enlarged source-space audit.

**Nonminimal stop:** new vectorlike matter, elementary scalars or a
higher-rank selected block reopen the minors.

**Loop stop:** absence of independent one-mediator tree packets is not a
proof of radiative stability.

## Verdict

The strongest current bounded answer is

\[
\boxed{
\text{minimal masked tree sector: }m=1\text{ and rank one automatically};
\qquad
\text{published physical derivation: absent}.
}
\]

The result advances the programme by replacing an open aggregate census with
a precise conditional survivor and a precise physical obstruction. The
survivor should now be subjected to the real-even embedding and one-loop
tangency tests; further tree-level mediator speculation is lower value unless
new fields are explicitly added.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_minimal_pati_salam_aggregate_intertwiner_census.mjs
node verification/verify/verify_spin23_pati_salam_mediator_inventory_triage.mjs
node verification/verify/verify_spin23_charged_bidoublet_equals_dirac_cross_support.mjs
node verification/verify/verify_spin23_local_one_dimensional_arrows_do_not_force_global_Schur_alignment.mjs
~~~
