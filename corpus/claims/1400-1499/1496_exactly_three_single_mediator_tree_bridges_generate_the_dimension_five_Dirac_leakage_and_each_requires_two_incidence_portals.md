# Exactly Three Single-Mediator Tree Bridges Generate the Dimension-Five Dirac Leakage, and Each Requires Two Incidence Portals

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive one-mediator renormalizable tree-topology theorem; multi-mediator, loop and strongly coupled completions remain open

**Depends on:** [the operator-dimension moat](1495_the_charge_three_operator_dimension_moat_is_renormalizable_for_Majorana_sewing_but_the_leading_Dirac_texture_lift_forgets_the_breaking_vev.md), [the central generalized-fluctuation support theorem](1494_generalized_inner_fluctuations_preserve_the_central_family_null_mask_while_dressing_the_present_Pati_Salam_Majorana_defect.md), and [the matrix-valued junk theorem](1493_matrix_multiplicity_enlarges_only_the_loop_sector_while_all_two_step_cross_edges_remain_junk.md)

**Evidence:** [single-mediator completion ledger](../../../evidence/data/spin23-single-mediator-dirac-leakage-completions.json) and [executable topology verifier](../../../verification/verify/verify_spin23_single_mediator_dirac_leakage_completions.mjs)

## Result

The leading charge-compatible Dirac leakage operator is

\[
\mathcal O_D^{(5)}
=S L_P H\nu_N^c,
\]

with conjugations understood according to the charge convention. It contains
two external fermions and two external scalars.

There are exactly three unordered ways to split those four legs between two
renormalizable vertices joined by one propagator. They give:

\[
\boxed{
\begin{array}{c|c|c}
\text{external pairing}&\text{mediator}&\text{matching}\\
\hline
(L_PH)\,|\,(\nu_N^cS)&\text{singlet-like heavy fermion}
&c_D/\Lambda=y_{LH}y_{NS}/M_F\\
(L_PS)\,|\,(\nu_N^cH)&\text{doublet-like heavy fermion}
&c_D/\Lambda=y_{LS}y_{HN}/M_F\\
(L_P\nu_N^c)\,|\,(HS)&\text{Higgs-doublet-like heavy scalar}
&c_D/\Lambda=y_{LN}\mu_{HS}/M_\Phi^2
\end{array}
}
\]

Thus exact protection at single-mediator tree level has a finite test:

\[
\boxed{
\text{forbid at least one portal in each of these three topologies}.}
\]

This translates the abstract sector-dependent incidence mask into a concrete
UV matching requirement.

## 1. Exhaustiveness

The external species are

\[
\{L_P,\nu_N^c,H,S\},
\]

with kinds

\[
\{F,F,B,B\}.
\]

The three unordered pairings of four labelled objects are

\[
\begin{aligned}
&(L_P,H)\,|\,(\nu_N^c,S),\\
&(L_P,S)\,|\,(\nu_N^c,H),\\
&(L_P,\nu_N^c)\,|\,(H,S).
\end{aligned}
\]

For either mixed \((F,B)\) pair, a renormalizable Yukawa vertex requires an
internal fermion; hence the first two pairings are fermion exchange. For the
\((F,F)\) and \((B,B)\) pairing, a scalar couples through a Yukawa vertex on
one side and a cubic scalar vertex on the other.

No fourth pairing exists. Gauge quantum numbers then select the familiar
singlet-like fermion, doublet-like fermion and Higgs-doublet-like scalar
representations, up to conjugation conventions.

## 2. Portal factorization

Each Wilson coefficient factorizes into two portal couplings and a heavy
propagator:

\[
C_F=\frac{y_1y_2}{M_F},
\qquad
C_\Phi=\frac{y\mu}{M_\Phi^2}.
\]

Consequently either missing portal sets that topology's matching coefficient
to zero. The central support condition of claim 1494 can now be imposed as a
vertex-level statement rather than only as a low-energy matrix zero:

- forbid \(L_PHF\) or \(F\nu_N^cS\);
- forbid \(L_PSF\) or \(FH\nu_N^c\);
- forbid \(L_P\Phi\nu_N^c\) or \(SH\Phi^\dagger\).

The choice need not be the same portal in all three cases. What matters is
that no complete path crosses from the selected Dirac carrier to the null
carrier.

## 3. Relation to the junk theorem

These tree completions resemble the two-step paths removed by the degree-two
junk quotient in claims 1492--1493, but they are not the same object.

The junk theorem concerns represented universal differential two-forms:

\[
[D,e_i][D,e_k]\mod d\ker\pi_D.
\]

Integrating out a propagating heavy mediator instead computes a Schur
complement or tree matching coefficient:

\[
D_{\rm eff}supset-D_{LH}M_F^{-1}D_{NS}.
\]

That coefficient belongs to the low-energy action. It is not erased merely
because an analogous two-step differential form is junk. A physical mediator
therefore represents genuine new support, exactly one of the escape routes
left open by claim 1493.

## 4. Spin(2,3) missing-middle interpretation

The top-down and bottom-up demands now constrain the UV graph rather than
only its low-energy shadow:

\[
\begin{array}{c}
\text{retain the Majorana }P-N\text{ sewing}\\
\Downarrow\\
\lambda_M S\nu_P^c\nu_N^c\ne0
\end{array}
\quad\longleftrightarrow\quad
\boxed{\text{sector-tagged portal graph}}
\quad\longleftrightarrow\quad
\begin{array}{c}
\text{break all three Dirac mediator bridges}\\
\Downarrow\\
c_D=0\text{ at one-mediator tree level}.
\end{array}
\]

This is a stronger specification of the plausible middle. It says what the
opposite-algebra anchor must accomplish in any weakly coupled UV realization:
it must distinguish a Majorana sewing vertex from three possible Dirac
bridge pairs, despite their common family-charge magnitude.

## 5. Boundaries

**One-mediator boundary:** chains with two or more heavy propagators can
generate higher-order or equally suppressed operators and require a larger
path enumeration.

**Loop boundary:** loop completions need not factor through one of the three
tree propagators in the same way, although their local operator must still
respect the charge and gauge symmetries.

**Representation boundary:** the topology theorem fixes spin and broad gauge
type, not a unique Pati--Salam representation or finite-triple sector.

**Portal stop:** showing that one preferred mediator is absent is
insufficient; all three topology classes must be cut.

**Junk stop:** differential junk must not be used to discard a Wilson
coefficient produced by integrating out a physical state.

**Positive trigger:** embed the actual Pati--Salam/family carrier table and
prove that its bimodule incidence forbids at least one vertex in every row
while retaining \(S\nu_P^c\nu_N^c\).

## Verdict

At the first UV matching level, the open-ended radiative question becomes a
finite portal problem:

\[
\boxed{
\text{three tree bridges exist; exact protection requires three cuts}.}
\]

The sector-dependent support mask is therefore not just a convenient texture
notation. It is a candidate rule for vetoing an exhaustive set of leading UV
leakage mechanisms.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_single_mediator_dirac_leakage_completions.mjs
~~~
