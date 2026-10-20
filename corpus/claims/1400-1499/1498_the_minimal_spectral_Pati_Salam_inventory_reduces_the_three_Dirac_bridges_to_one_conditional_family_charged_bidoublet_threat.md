# The Minimal Spectral Pati--Salam Inventory Reduces the Three Dirac Bridges to One Conditional Family-Charged Bidoublet Threat

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** primary-source inventory plus exact representation-containment triage; the family-extended scalar calculus remains open

**Depends on:** [the three-topology census](1496_exactly_three_single_mediator_tree_bridges_generate_the_dimension_five_Dirac_leakage_and_each_requires_two_incidence_portals.md) and [the correlated selected-neutrino bridge](1497_the_selected_heavy_neutrino_bridge_generates_an_apparent_Dirac_leakage_but_its_complete_Schur_package_preserves_the_texture_zero.md)

**Primary source:** [Chamseddine--Connes--van Suijlekom, *Beyond the Spectral Standard Model: Emergence of Pati-Salam Unification*](https://arxiv.org/abs/1304.8050)

**Evidence:** [mediator-inventory ledger](../../../evidence/data/spin23-pati-salam-mediator-inventory-triage.json) and [executable representation verifier](../../../verification/verify/verify_spin23_pati_salam_mediator_inventory_triage.mjs)

## Result

The published spectral Pati--Salam inventory sharply reduces the three
abstract one-mediator leakage topologies.

Use the convention

\[
G_{PS}=SU(2)_R\times SU(2)_L\times SU(4),
\]

with fermion carriers

\[
R=(2,1,4),
\qquad
L=(1,2,4),
\]

and a Dirac bidoublet carrier

\[
H=(2,2,1)
\]

plus the possible adjoint bidoublet extension \((2,2,15)\).

Then the three topology classes of claim 1496 become:

| topology | Pati--Salam mediator carrier | source status |
|---|---|---|
| \((L_PH)|(\nu_N^cS)\) | \(R=(2,1,4)\) | present, but Schur-correlated |
| \((L_PS)|(\nu_N^cH)\) | \(L=(1,2,4)\) | no independent heavy vectorlike copy |
| \((L_P\nu_N^c)|(HS)\) | \(\Phi=(2,2,1\oplus15)\) | gauge carrier exists; charged family face is conditional |

Therefore

\[
\boxed{
\text{the minimal sourced inventory has no independent one-mediator tree
leakage.}
}
\]

After adjoining family structure, the sole leading independent threat is a
charge-three bidoublet \(\Phi_{\pm3}\) carrying both

\[
L_P\Phi_{\pm3}\nu_N^c
\]

and

\[
S H\Phi_{\pm3}^\dagger.
\]

The next physical gate is consequently a represented-one-form multiplicity
calculation in the bidoublet sector, not a generic search over all mediators.

## 1. Source inventory

The primary spectral Pati--Salam construction contains sixteen fermions in

\[
(2,1,4)+(1,2,4).
\]

Its listed fundamental Higgs representations are

\[
(2,2,1),
\qquad
(2,1,4),
\qquad
(1,1,1\oplus15),
\]

with additional representations fundamental or composite depending on the
order-one assumptions. The generalized scalar sector can include the
bidoublet-adjoint carrier \((2,2,15)\).

The source does not add an independent vectorlike fermion multiplet. This is
important: the ordinary chiral \(L\) multiplet exists, but it is a light
physical carrier, not a heavy duplicate that can simply be integrated out.

## 2. Fermion bridge through the right multiplet

The first topology pairs \(L\) with \(H\). Representation arithmetic gives

\[
(1,2,4)\otimes(2,2,1)
\supset(2,1,4),
\]

because

\[
2_L\otimes2_L=1_L\oplus3_L.
\]

Thus its mediator has the same carrier as \(R\), and the selected
right-handed neutrino is already available. Claim 1497 proves that this
bridge is not an independent leakage coefficient: its full sequential
matching packet preserves the texture zero.

It should be retained, not vetoed.

## 3. Fermion bridge through the left multiplet

The second topology pairs \(L\) with the gauge-singlet \(S\), so its mediator
has the same gauge carrier as \(L\). The other vertex is allowed at the level
of representations because

\[
(2,2,1)\otimes(2,1,4)
\supset(1,2,4).
\]

But a tree-level Wilson matching requires a heavy propagating copy of this
carrier. The source inventory contains only the ordinary chiral family
multiplets, not a new vectorlike \((1,2,4)\) pair.

Therefore this topology is absent in the minimal sourced model. It reopens
only if the family completion adds heavy vectorlike matter.

## 4. Scalar bidoublet bridge

The fermion bilinear joining \(L\) and \(R\) transforms through

\[
\overline4\otimes4=1\oplus15.
\]

Together with the two weak doublets, the scalar carrier is

\[
\Phi=(2,2,1\oplus15).
\]

This carrier is natural in the spectral Pati--Salam scalar sector. Gauge
representation theory alone therefore does not remove the scalar topology.

However, the published model is generation blind. To mediate the forbidden
selected-to-null transition, \(\Phi\) must acquire an independent family
charge-three face. It must then possess both:

1. the cross-family Yukawa portal \(L_P\Phi\nu_N^c\);
2. the scalar mixing portal \(SH\Phi^\dagger\).

Neither follows from the sourced gauge representation by itself. Their
presence is precisely what the family-extended represented-one-form and
scalar-potential calculations must decide.

## 5. Updated missing middle

The fan now converges on one sharply typed scalar question:

\[
\begin{array}{c}
\text{minimal Pati--Salam fermions}\\
\Downarrow\\
\text{existing right bridge is correlated}\\
\text{heavy left bridge is absent}
\end{array}
\quad\longleftrightarrow\quad
\boxed{\Phi_{\pm3}\ ?}
\quad\longleftrightarrow\quad
\begin{array}{c}
\text{family-charged bidoublet one-form}\\
\Downarrow\\
\text{independent Dirac leakage or exact veto}.
\end{array}
\]

The physical embedding need not solve an unrestricted mediator problem. It
must prove that the family extension does not create the charged bidoublet
with both portals, or else show that its full matching packet is correlated
like the selected-neutrino bridge.

## 6. Boundaries

**Minimal-inventory boundary:** a family extension may add vectorlike
fermions, charged bidoublets or new scalar copies. Their absence from the
published generation-blind source is not a no-go for all completions.

**Gauge-versus-family stop:** the existence of \((2,2,1\oplus15)\) does not
imply a charge-three family face.

**Light-carrier stop:** the physical chiral \(L\) multiplet must not be
counted as an integrable heavy mediator without an actual mass-generating
vectorlike partner or other decoupling mechanism.

**Potential stop:** even if \(\Phi_{\pm3}\) exists, leakage requires the
scalar mixing portal as well as the Yukawa portal.

**Positive trigger:** compute the family-extended bidoublet one-form module
and prove either \(\Phi_{\pm3}=0\), one portal vanishes, or the induced packet
obeys an exact Schur-type correlation.

## Verdict

The sourced Pati--Salam inventory removes two thirds of the independent
leading UV problem:

\[
\boxed{
\text{safe correlated }R
\;\oplus\;
\text{no heavy }L
\;\oplus\;
\text{one conditional charged-bidoublet threat}.}
\]

The highest-value next calculation is now the charge-three bidoublet
multiplicity and portal audit in the family-extended finite calculus.

[Claim 1499](1499_the_family_charged_bidoublet_is_exactly_the_forbidden_Dirac_cross_one_form_so_the_central_mask_closes_all_minimal_tree_leakage.md) completes that support audit conditionally: the charged bidoublet one-form is exactly the forbidden Dirac \(P-N\) block, so a physically realized central mask removes the scalar bridge as well.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_pati_salam_mediator_inventory_triage.mjs
~~~
