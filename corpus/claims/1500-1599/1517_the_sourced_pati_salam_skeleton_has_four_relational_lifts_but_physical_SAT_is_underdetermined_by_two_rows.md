# The Sourced Pati--Salam Skeleton Has Four Relational Lifts, but Physical SAT Is Underdetermined by Two Rows

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive finite carrier-skeleton search; decorated relational graph SAT, three ordinary realizations UNSAT, complete physical carrier underdetermined

**Depends on:** [the physical minimal-tree census](1512_the_minimal_pati_salam_tree_census_leaves_one_correlated_Schur_column_but_does_not_derive_the_family_intertwiner.md), [the first bounded real-even search](1516_the_minimal_real_even_embedding_is_relationally_satisfiable_but_its_ordinary_field_descent_has_a_three_constraint_UNSAT_core.md), [the KO-6 relation-sheet reflection](1505_the_real_completed_two_path_geometry_uniquely_lifts_the_mask_reflection_as_J_odd_relation_sheet_parity.md), [the spectator-character obstruction](../1100-1199/1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md), and [the two-slot obstruction](../1100-1199/1124_the_exact_four_direct_sum_has_a_two_sided_slot_obstruction_to_decorating_physical_SM_fermions.md)

**Evidence:** [physical-carrier search ledger](../../../evidence/data/spin23-physical-carrier-bounded-embedding-search.json) and [exhaustive verifier](../../../verification/verify/verify_spin23_physical_carrier_bounded_embedding_search.mjs)

## Result

Joining the actual minimal Pati--Salam census to the eight-label real-even
constraint model gives a sharper result than either input alone.

At the decorated relation-graph level the physical skeleton is satisfiable.
Assign four \(J\)-paired physical roles,

\[
(L_P,JL_P),\quad(R_P,JR_P),\quad(R_N,JR_N),\quad(X,JX),
\]

bijectively to the four \(J\)-pair orbits of

\[
\{PN,IN,IP,SP,NP,NI,PI,PS\}.
\]

Require one selected Dirac edge orbit, one selected-null Majorana edge orbit,
one spectator connector orbit, and an absent selected-null Dirac primitive.
Among all

\[
4!\,2^4=384
\]

\(J\)-equivariant assignments, exactly four realize all six required
within-sheet edges. Every one sends the forbidden Dirac primitive across the
relation sheets.

Claim 1512 independently reduces the bounded physical mediator inventory to
one retained correlated column. Hence no multi-column minor is imposed in
this search. With two overall signs of relation parity and four nonzero sign
assignments for the single coupling column, the joined graph has

\[
\boxed{4\times2\times4=32}
\]

decorated relational witnesses.

This is not yet physical SAT. Three ordinary realizations are already UNSAT:

1. the unreduced Pati--Salam algebra cannot supply the required spectator
   character;
2. the reduced exact-four direct sum cannot add an independent family label
   to physical bimodules that already use both algebra slots;
3. ordinary unduplicated field parity has the three-vertex UNSAT core of
   claim 1516.

The remaining commutant, normalizer, correspondence, Jordan or generalized
relation-module branch is **UNDERDETERMINED**. Its smallest missing input is a
two-row physical table: the family-anchor action and the spectator connector.

## 1. Physical carrier and \(J\)-partners

The bounded sourced roles are:

| role orbit | Pati--Salam carrier | status |
|---|---|---|
| \(L_P/JL_P\) | \((1,2,4)\) and its \(J\)-conjugate | sourced |
| \(R_P/JR_P\) | \((2,1,4)\) and its \(J\)-conjugate | sourced |
| \(R_N/JR_N\) | null-family copy of \((2,1,4)\) and its \(J\)-conjugate | gauge carrier sourced; family anchor not sourced |
| \(X/JX\) | spectator pair | physical representation unknown |

Each particle-side \(L\) or \(R\) gauge carrier has complex dimension eight.
The selected and null labels are multiplicity-space data; they are not new
Pati--Salam irreducibles.

One graph witness is

\[
\begin{array}{c|cccccccc}
\text{role}&L_P&JL_P&R_P&JR_P&R_N&JR_N&X&JX\\ \hline
\text{label}&PN&NP&IN&NI&PI&IP&SP&PS.
\end{array}
\]

The other three solutions are its \(J\)-reversal and path reversal variants.

## 2. Vertex multiplicities and provenance

The witness assigns the following edge orbits.

### Selected Dirac primitive

\[
L_P-R_P:PN-IN,
\qquad
JL_P-JR_P:NP-NI.
\]

The sourced scalar channel \(H_1=(2,2,1)\) has gauge-intertwiner multiplicity
one. A conditional \(H_{15}=(2,2,15)\) channel also has multiplicity one when
present. After projection onto the chosen light Higgs direction, these enter
the same \(d_{\rm eff}\) of the selected mediator column.

### Selected-null Majorana primitive

\[
R_P-JR_N:IN-IP,
\qquad
JR_P-R_N:NI-PI.
\]

This is the particle-conjugate finite-\(D\) support dressed in the sourced
unreduced theory by

\[
\Delta=(2,1,4),
\qquad
\operatorname{Sym}^2\Delta
\supset(3,1,10)\oplus(1,1,6).
\]

The gauge mechanism is sourced. The multiplicity of the neutral and
charge-minus-three family faces needed for the full family texture is not.

### Spectator connector primitive

\[
JR_N-X:IP-SP,
\qquad
R_N-JX:PI-PS.
\]

This edge orbit repairs finite-metric connectedness in the label model. No
physical Pati--Salam representation or sourced scalar intertwiner has yet
been assigned to it.

### Forbidden primitive and retained composite

The dangerous physical Dirac orbit maps to

\[
L_P-R_N:PN-PI,
\qquad
JL_P-JR_N:NP-IP.
\]

It crosses relation sheets and is therefore \(\Gamma_{\rm rel}\)-odd. It is
absent as a primitive.

By contrast,

\[
L_P\longrightarrow R_P\longrightarrow JR_N
\]

maps to the within-sheet path

\[
PN\longrightarrow IN\longrightarrow IP.
\]

This is the graph's candidate factored Schur path. Its endpoint is \(JR_N\),
whereas the forbidden physical Dirac primitive above ends at \(R_N\).
Identifying their induced coefficients in the physical Weyl/Majorana kernel
requires a real-structure and fermionic-action dictionary that this graph
search does not provide. If that dictionary identifies the two effective
endpoint slots, the path must be matched to its complete Schur packet and
claim 1515's provenance warning applies. Without it, the graph proves parity
separation only; it does not yet prove the physical Schur cancellation.

## 3. Aggregate Hom rank is now computed, not imposed

Claim 1516 used three hypothetical mediator columns and imposed every minor.
The joined physical census replaces that artificial multiplicity by the
actual bounded inventory:

\[
V_{\rm physical,bounded}
=
\begin{pmatrix}d_{\rm eff}\\y_{\rm eff}\end{pmatrix}.
\]

Therefore

\[
\operatorname{rank}V\le1,
\qquad
\#\{2\times2\text{ minors}\}=0.
\]

The common-ray condition is automatic because only one mediator column is
admitted. It is no longer an independent constraint inserted into the SAT
model. This is the main gain from joining claims 1512 and 1516.

The result remains conditional on the central family mask and chosen light
Higgs projection. New vectorlike matter or a mask-evading bidoublet adds a
column and reopens the minors.

## 4. What the four graph lifts do and do not prove

Every graph lift makes the dangerous physical Dirac edge cross-sheet, so the
unique relation parity forbids it while retaining all required primitive
edges and their \(J\)-partners.

However, the physical lift does not identify \(L_P-R_N\) with either of the
two particular dangerous label pairs named in the earlier toy-anchor search.
It places that edge on another cross-sheet pair, such as \(PN-PI\). The parity
conclusion remains exact because every cross-sheet block is odd, but the
semantic identification of toy anchors with physical fields has not been
derived. There is a second version of the same boundary: the within-sheet
candidate composite terminates at \(JR_N\), while the forbidden primitive is
written with endpoint \(R_N\). Their relation in the physical fermionic
kernel belongs to the missing functor, not to the graph enumeration.

This is useful rather than cosmetic. It shows that the remaining problem is
not graph satisfiability. It is the missing functor from actual physical
bimodules to the relation labels.

## 5. Branch-by-branch decision

### Unreduced ordinary first-order Pati--Salam: UNSAT

The connected four-character label completion requires a one-dimensional
spectator character \(S\). But

\[
\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C)
\]

has no one-dimensional complex representation. This is the two-clause core
proved in claim 1122.

### Reduced exact-four direct sum: UNSAT as universal family decoration

The direct sum

\[
\mathcal A_{SM}\oplus\mathbb C^3
\]

has four scalar characters, but a simple physical bimodule has only a left
and a right simple-factor support. A weak/colour bimodule already uses those
slots. An additional independent family point requires a third slot. Claim
1124 therefore excludes this ordinary associative realization.

### Ordinary field parity: UNSAT

The required Dirac and Majorana vertices multiply to the composite leakage
vertex, so no ordinary field \(\mathbb Z_2\) can make the first two even and the
third odd. Claim 1516 gives the inclusion-minimal three-constraint core.

### Generalized relation-module lift: UNDERDETERMINED

The relation graph is SAT, arbitrary within-sheet physical multiplicity is
compatible with \(\Gamma_{\rm rel}\), and the minimal aggregate rank is safe.
But no local source supplies the remaining physical algebra action and
connector. The branch therefore cannot honestly be labelled SAT or UNSAT.

## 6. The smallest unresolved data

Only two rows remain independent at the present bounded level.

### Row A: family-anchor action

Specify the represented and opposite family/normalizer action on
\(L_P,R_P,R_N\) and their \(J\)-partners. It must:

- implement the displayed relation-label map without erasing weak or colour
  actions;
- remain sheet diagonal;
- exclude primitive \(L_P-R_N\) support while retaining \(R_P-JR_N\);
- state whether and how the \(JR_N\) endpoint of the factored path is
  identified with the \(R_N\) slot of the effective Dirac coefficient;
- state the \((\Delta_0,\Delta_{-3})\) one-form multiplicities if the full family
  Majorana texture is required.

### Row B: spectator connector

Specify the Pati--Salam representation of \(X/JX\) and the primitive
\(JR_N-X\) intertwiner with its \(J\)-partner. That one row then determines
whether the physical intersection form, junk quotient, gauge kernel and
light-matter spectrum pass.

All other bounded ingredients are fixed: sourced \(L/R\) carriers, their
\(J\)-partners, the three primitive edge orbits, primitive-versus-composite
provenance, relation parity, and the one-column aggregate rank.

## Verdict

The requested physical-carrier search is not globally SAT or globally
UNSAT. Its exact classification is

\[
\boxed{
\begin{array}{rcl}
\text{decorated relation graph}&:&\mathrm{SAT}\ (32\text{ witnesses}),\\
\text{three ordinary realizations}&:&\mathrm{UNSAT},\\
\text{full generalized physical carrier}&:&\mathrm{UNDERDETERMINED}.
\end{array}
}
\]

The underdetermination is now finite rather than vague: supply the
family-anchor action row and spectator-connector row. A concrete choice can
then be checked without changing the rest of the solver.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_physical_carrier_bounded_embedding_search.mjs
node verification/verify/verify_spin23_minimal_pati_salam_aggregate_intertwiner_census.mjs
node verification/verify/verify_spin23_minimal_real_even_bounded_embedding_search.mjs
node verification/prove/prove_unreduced_Pati_Salam_has_no_character_for_the_spectator_S.mjs
node verification/prove/prove_direct_sum_family_two_sided_slot_obstruction.mjs
~~~
