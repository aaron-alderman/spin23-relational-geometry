# The Graded Spectator Chain Has No Sourced Pati--Salam Bimodule Lift, and an Ordinary Completion Requires Six Characters

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact bounded representation and first-order embedding search; six-character sterile subdiagram constructed, full physical family embedding remains open

**Depends on:** [the minimal graded-chain repair](1523_one_intermediate_real_pair_is_the_minimal_categorical_repair_of_the_spectator_connector_no_go.md), [the spectator representation census](1522_the_unique_charged_matter_free_spectator_is_a_Delta_coupled_singlet_but_any_primitive_null_connector_destroys_the_texture.md), [the unreduced character obstruction](../1100-1199/1122_the_unreduced_Pati_Salam_algebra_has_no_character_for_S_so_the_null_mask_splits_into_reduced_first_order_and_generalized_branches.md), and [the direct-sum two-slot obstruction](../1100-1199/1124_the_exact_four_direct_sum_has_a_two_sided_slot_obstruction_to_decorating_physical_SM_fermions.md)

**Evidence:** [physical-lift ledger](../../../evidence/data/spin23-pati-salam-graded-chain-physical-lift.json) and [executable embedding verifier](../../../verification/verify/verify_spin23_pati_salam_graded_chain_physical_lift.mjs)

## Result

The one-intermediate repair of claim 1523 does not embed in any already
sourced Pati--Salam fermion carrier.

At gauge-EFT level the smallest chain is still attractive:

\[
R_N\xleftrightarrow{\Delta}Z
\longleftrightarrow X,
\qquad
X=Z=(1,1,1).
\]

It adds no charged components, admits its (J)-partner, and realizes the
invertible cofactor-preserving mass graph of claim 1523. But the sourced
fermion inventory contains only

\[
(2,1,4)\oplus(1,2,4)
\]

per generation and no independent Pati--Salam singlet fermion. Both sterile
roles are new.

The unchanged unreduced finite algebra cannot repair this. Its smallest
singlet-containing ordinary bimodule has complex dimension four and
decomposes as

\[
(1,1,1)\oplus(3,1,1),
\]

so it brings an unwanted (SU(2)_R) triplet and is a self-pair subject to the
KO-6 orientability obstruction. There is no isolated one-dimensional module.

The reduced four-character carrier also fails. Exhaustive first-order
enumeration gives only

\[
Z\in\{IP,NP,SP\},
\]

and each choice collapses onto an already occupied physical role. A fresh
(Z/JZ) requires a fifth character (T), uniquely through (TP/PT). But a
five-character KO-6 intersection form is antisymmetric of odd order and hence
singular.

The smallest ordinary first-order label completion therefore has six
characters. Add (T,U), the (Z)-pair (TP/PT), and one duality-repair pair
(TU/UT). The resulting intersection form has determinant one and all new
edges are first-order and (J)-compatible.

Thus

\[
\boxed{
\text{the one-pair categorical repair necessarily introduces a new
correspondence/defect module}.}
\]

If one insists on an ordinary associative character geometry, it expands to
a new six-character sterile subdiagram with an additional real pair and new
central gauge directions.

## 1. Gauge-representation minimum

The exact Delta product from claim 1522 contains one singlet:

\[
(2,1,\overline4)\otimes(2,1,4)
\supset(1,1,1).
\]

Choose (Z=(1,1,1)) for the first coefficient and (X=(1,1,1)) for the
second. The second coefficient is gauge-singlet mixing. This is the unique
minimum with no charged partners.

The next choices already enlarge the physical spectrum:

| representation | dimension | unavoidable extra content |
|---|---:|---|
| ((3,1,1)) | 3 | (SU(2)_R) charged triplet |
| ((1,2,4)) | 8 | weak and colour charged (L)-like multiplet |
| ((2,1,4)) | 8 | vectorlike (R)-like multiplet |
| ((1,1,15)) | 15 | (SU(4)) adjoint partners |

None is an independent sourced heavy fermion. Reusing one of the three
ordinary (L/R) family carriers does not supply the additional independent
(J)-pair required by the determinant proof; it identifies distinct matrix
roles and invalidates the claim-1523 witness.

## 2. Unreduced ordinary bimodules

For

\[
\mathcal A_{PS}=\mathbb H_R\oplus\mathbb H_L\oplus M_4(\mathbb C),
\]

there is no one-dimensional complex representation. Gauge singlets can occur
inside diagonal conjugation bimodules, but only with partners:

\[
\begin{array}{c|c|c}
\text{bimodule}&\dim_{\mathbb C}&\text{gauge decomposition}\\ \hline
\mathbb H_R-\mathbb H_R&4&(1,1,1)\oplus(3,1,1)\\
\mathbb H_L-\mathbb H_L&4&(1,1,1)\oplus(1,3,1)\\
M_4-M_4&16&(1,1,1)\oplus(1,1,15).
\end{array}
\]

The four-dimensional option is the smallest, but it fails the requested
charged-matter-free condition and is not present in the sourced fermion
Hilbert space. A diagonal self-pair also cannot by itself solve KO-6
orientability: opposite-grade copies carry the same algebra labels, so a
represented zero-cycle cannot distinguish them.

Therefore the unchanged unreduced ordinary-bimodule branch is UNSAT for the
isolated (X,Z) roles.

## 3. Exhaustive four-character first-order search

After the claim-1523 sheet and chirality reassignment, use

\[
R_N=PI,
\qquad
X=PS,
\qquad
JX=SP.
\]

For a candidate (Z=ab), its partner is (JZ=ba). The two mass
coefficients are represented by edges

\[
PI-JZ,
\qquad
Z-SP.
\]

First order requires each pair to share its left or right character. Among
all twelve non-self sectors over ({P,I,N,S}), exactly three pass:

\[
IP,
\qquad NP,
\qquad SP.
\]

They fail independently:

- (Z=IP) gives (JZ=PI), identical to the (R_N) role;
- (Z=NP) uses the orbit already occupied by (L_P/JL_P);
- (Z=SP) is identical to (JX).

Hence the existing four-character Hilbert table has no fresh slot for the
extra pair.

## 4. A fifth character supplies (Z) but breaks duality

Adjoin one new scalar character (T). Repeating the enumeration, the unique
fresh solution is

\[
Z=TP,
\qquad
JZ=PT.
\]

Indeed,

\[
PI-PT
\]

shares left character (P), while

\[
TP-SP
\]

shares right character (P). With

\[
\gamma(TP)=-1,
\qquad
\gamma(PT)=+1,
\]

both edges have the required KO-6 parity and reality closes them.

But any five-by-five KO-6 intersection form is antisymmetric and therefore
has zero determinant. This is not a coefficient accident:

\[
\boxed{
\text{one new character solves first order but necessarily fails Poincare
duality}.}
\]

## 5. Minimal ordinary six-character completion

Add a sixth character (U) and the real pair

\[
TU_{+},
\qquad
UT_{-}.
\]

In the order ((P,I,N,S,T,U)), after the spectator chirality reversal required
by claim 1523, the intersection form is

\[
\cap_6=
\begin{pmatrix}
0&-1&1&-1&1&0\\
1&0&-1&0&0&0\\
-1&1&0&0&0&0\\
1&0&0&0&0&0\\
-1&0&0&0&0&1\\
0&0&0&0&-1&0
\end{pmatrix}.
\]

Direct calculation gives

\[
\boxed{\det\cap_6=1.}
\]

The additional connector

\[
TP-TU
\]

is horizontal and first-order compatible; its (J)-partner

\[
PT-UT
\]

is vertical. Their endpoint chiralities are opposite. Thus the six-character
sterile subdiagram is real, even, first-order, metrically connected at label
level, and Poincare nondegenerate.

It costs more than the categorical repair:

- two new algebra characters (T,U);
- the required (Z/JZ) pair;
- one further (TU/UT) real pair;
- new central unitary directions whose gauge kernel and anomalies are not
  controlled.

## 6. Why this still is not the physical family embedding

The six-character construction realizes the sterile subdiagram. It does not
solve the universal family-decoration problem. Ordinary simple bimodules have
only one left and one right algebra slot; adding scalar direct-sum characters
still cannot attach an independent family label to every weak and coloured
Pati--Salam or Standard-Model bimodule.

Consequently there are two honest continuation branches:

1. treat the one-pair (Z/JZ) repair as a new correspondence, normalizer,
   groupoid or Jordan defect module and define its action on the sourced
   carrier;
2. accept the six-character ordinary extension and perform the full
   gauge-kernel, anomaly, junk, scalar-potential and two-slot audits.

Neither branch is already contained in the source.

## Verdict

The physical lift search closes the hoped-for reuse of existing matter:

\[
\boxed{
X/Z\text{ graded chain}
\not\subset
\text{the sourced ordinary Pati--Salam bimodule table}.}
\]

The minimal gauge content is two sterile singlets, but the one-pair
categorical implementation is necessarily a new correspondence/defect
module. The smallest ordinary first-order character implementation requires
six characters and two new real pairs, one more than the cofactor calculation
alone predicted.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pati_salam_graded_chain_physical_lift.mjs
node verification/verify/verify_spin23_spectator_connector_minimal_repair_exhaustion.mjs
node verification/prove/prove_unreduced_Pati_Salam_has_no_character_for_the_spectator_S.mjs
node verification/prove/prove_direct_sum_family_two_sided_slot_obstruction.mjs
~~~
