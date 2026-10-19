# Standard-Model Gauge Commutant: Why External Selectors Do Not Yet Predict Flavor

**Date:** 16 October 2026  
**Branches:** B03 and B11  
**Claim status:** gauge-theory commutant established; Furey-specific reduction remains pinned

## 1. One generation

Ignoring a right-handed neutrino, one Standard-Model generation contains five inequivalent complex gauge irreducibles:

\[
Q_L,quad u_R,quad d_R,quad L_L,quad e_R.
\]

Each occurs with multiplicity one. Therefore the commutant of the gauge action is

\[
\boxed{
\operatorname{End}_{G_{SM}}(\mathcal F_1)
\cong\mathbb C^5.
}
\]

Gauge symmetry permits an independent scalar action on every species. Adding \(\nu_R\) gives \(\mathbb C^6\).

## 2. Three generations

With three equivalent copies of each species,

\[
\mathcal F_3
=\bigoplus_{r=1}^{5}(V_r\otimes\mathbb C^3).
\]

Schur’s lemma gives

\[
\boxed{
\operatorname{End}_{G_{SM}}(\mathcal F_3)
\cong\bigoplus_{r=1}^{5}M_3(\mathbb C).
}
\]

Its complex dimension is

\[
5\times9=45,
\]

or \(54\) with three right-handed neutrinos.

## 3. Consequence for the external selector

A Standard-Model-singlet external field may couple through any element of this commutant unless more structure forbids it. Gauge symmetry alone therefore allows independent family matrices for each species.

This means that adding the \(Spin(2,3)\) carrier as a gauge singlet does not predict Yukawa textures, family universality or mixing angles.

The Furey programme becomes explanatory only if its additional multiplication, ideal, triality or compatibility operations reduce this commutant.

## 4. Exact next target

Let \(\mathcal A_F\) be the full algebra of selected Furey actions, including more than the Standard-Model gauge generators. The relevant object is

\[
\operatorname{End}_{\mathcal A_F}(\mathcal F)
\subseteq
\operatorname{End}_{G_{SM}}(\mathcal F).
\]

Three outcomes are possible:

1. **Scalar commutant:** strong universality, potentially too restrictive for observed flavor.
2. **Structured noncommutative commutant:** possible restricted family mixing and a high-value prediction.
3. **Full species-wise family algebra:** no flavor prediction beyond the Standard Model.

This turns “Furey may constrain Yukawas” into a finite linear-algebra problem once the action table is encoded.

## 5. Stop-everything and falsification criteria

**Positive:** the Furey commutant is strictly smaller than \(\bigoplus_rM_3(\mathbb C)\) and its invariant intertwiners match a nontrivial observed mass or mixing relation.

**Negative:** the full Furey action leaves the same arbitrary family matrices, or a smaller commutant incompatible with observed nondegenerate masses and mixing.

## 6. Certificate

[`scripts/verify-sm-gauge-commutant.mjs`](scripts/verify-sm-gauge-commutant.mjs) records the multiplicity decomposition and verifies dimensions \(5\), \(45\), and \(54\) with optional \(\nu_R\).

## Branch state

The gauge-only baseline is complete. The Furey-specific commutant remains pinned on the canonical module table, but its success and failure conditions are now quantitative.

## Companion documents

- [Furey external/internal interface](54_furey_external_internal_interface_branch.md)
- [Furey technical guide](03_furey_technical_algebraic_guide.md)
- [Multi-branch registry](49_multi_branch_research_registry.md)
