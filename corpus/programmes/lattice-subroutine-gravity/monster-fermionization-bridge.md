# Monster fermionization supplies the missing kind of seam carrier

**Date:** 24 October 2026  
**Status:** exact published fermionization and defect source; genus-two seam intertwiner open  
**Evidence:** [machine-readable gate ledger](../../../evidence/data/lattice-subroutine-monster-fermionization-bridge-v1.json)  
**Certificate:** [bridge verifier](../../../verification/verify/verify_lattice_subroutine_monster_fermionization_bridge.mjs)

## Result

The oriented modular seam no longer needs an imported hypothetical fermion. The Monster CFT already contains a source-derived route to one.

Lin and Shao proved that fermionizing the Monster CFT by its non-anomalous \(2A\) involution gives

\[
\mathcal F_{2A}
\cong
\text{Majorana--Weyl}
\otimes
\text{Baby Monster}_{\rm fermionic},
\]

with

\[
c=\frac12+\frac{47}{2}=24.
\]

The free Majorana factor supplies spin structures, NS/R sectors, fermion parity and a Pfaffian/determinant line. The same construction identifies a non-invertible Kramers--Wannier duality defect; together with the \(2A\) symmetry it generates an Ising subcategory of topological defect lines.

This is exactly the *type* of additional structure demanded by the \(\chi_5\) result: fermionic spin data with a coherent sign line rather than an ordinary positive bosonic scalar.

## Why the carrier has exactly ten live components

A genus-two surface has sixteen spin structures: ten even and six odd. The free chiral Majorana factor has a zero mode on an odd spin structure, so its zero-insertion Pfaffian—and hence the corresponding partition amplitude—vanishes. Lin and Shao use the same zero-mode fact to explain the vanishing odd-spin amplitude and invariance under stacking with the Arf spin theory.

Consequently the \(2A\)-fermionized Monster does not merely provide “some spin data.” At genus two its potentially nonzero vacuum amplitudes are indexed by precisely the ten even characteristics on which the corpus's seam representation acts:

\[
16\ {\rm spin\ structures}
\;=\;
10\ {\rm even,\ potentially\ nonzero}
\;+\;
6\ {\rm odd,\ zero}.
\]

This is an exact match of carrier type. It is not yet an equality of amplitudes or determinant lines.

## The decisive distinction: a sum is not a determinant

Fermionization supplies a **vector** of spin-sector amplitudes. Bosonization returns the bosonic theory by a weighted **sum** over those sectors. By contrast,

\[
\chi_5=\prod_{\delta\ {\rm even}}\theta[\delta]
\]

is a **product** over all ten even genus-two characteristics. These constructions cannot be identified merely because they use the same labels. Under independent rescalings \(Z_\delta\mapsto\lambda_\delta Z_\delta\), a sector sum is linear and mixes ten different weights; the product has multidegree \((1,1,\ldots,1)\). No choice of constant bosonization phases turns one into the other.

This closes one tempting but incorrect shortcut:

> summing the Monster's fermionic spin sectors does not itself produce the \(\chi_5\) orientation line.

It also says what must be calculated instead. The surviving ten-sector carrier has a nine-dimensional sum-zero part that remembers marked transitions. Its determinant or top exterior construction is the natural place a one-dimensional sign character could occur. Thus the precise question is whether the determinant/anomaly line of the *family* of fermionic sectors is \(\chi_5\), not whether any one partition function or their bosonization sum equals \(\chi_5\).

The finite part of that question is now answered. The determinant of the nine-dimensional characteristic seam carrier takes values \(+1\) and \(-1\) on 360 group elements each, hence is the nontrivial sign character of \(Sp(4,\mathbb F_2)\). It matches the finite characteristic shadow required by \(\chi_5\). What remains is not a guess about representation type: it is the analytic calculation showing that the sewn Majorana--Baby-Monster amplitudes carry the required theta multipliers and determinant line.

## A useful coefficient witness

The fermionized sector expansions contain the arithmetic relation

\[
4372+192512=196884.
\]

It shows that the familiar first Monster coefficient is compatible with the fermionized NS/R organization. It does not prove the genus-two seam map; the terms belong to declared spin-sector expansions and must not be reinterpreted as an arbitrary particle decomposition.

## The two involutions must remain distinct

The Monster has two relevant non-anomalous involutions:

- the \(2A\) branch is self-dual under orbifolding and yields the Majorana--Weyl times Baby Monster fermionization;
- the \(2B\) orbifold returns the Leech lattice CFT, while its fermionization gives the “Beauty and the Beast” \(\mathcal N=1\) theory.

This is promising because the fermionic and Leech branches meet in one bosonic parent. It is not yet an intertwiner. The Rule-60/Golay deck bit belongs to the corpus's Leech seam construction; the free-fermion parity belongs to the \(2A\) branch. Their equality cannot be inferred from both being \(\mathbb Z_2\).

## Genus-two technology exists

Independent work on fermionic vertex-operator superalgebras gives explicit genus-two sewing formulae for free fermions in terms of Szegő kernels, infinite determinants and theta functions, with controlled modular properties on the sewing domain.

That removes a technical excuse. The decisive calculation is now well posed:

1. construct the genus-two spin-structure vector of
   \(\text{MW}\otimes\text{Baby}\);
2. restrict its modular action to the nine-dimensional sum-zero seam carrier;
3. compute the determinant/anomaly line of that carrier and test whether it is the \(\chi_5\) sign character;
4. sum over spin structures and verify recovery of the Monster genus-two partition function;
5. test whether the Rule-60 deck exchange maps to fermion parity or the \(2A\) duality defect;
6. seek a \(2A\)-\(2B\) defect junction coupling the result to Leech pair-Gram data.

## What this means

The programme has advanced from:

> perhaps an unspecified fermionic Pfaffian supplies the seam

to:

> the Monster theory contains a canonical fermionization and Ising defect sector that could supply it; one genus-two multiplier and defect-junction calculation decides whether it actually does.

The calculation is no longer allowed to confuse three different objects: an individual spin-sector Pfaffian, the additive bosonization sum, and the multiplicative determinant line. Only the third has the correct structural type to match \(\chi_5\).

This is a real narrowing of the frontier. It remains two-dimensional CFT data. No four-dimensional spacetime, stress tensor or EFE follows until the later worldsheet/target-space gates are passed.

## Sources

- Lin and Shao, [*Duality Defect of the Monster CFT*](https://arxiv.org/abs/1911.00042)
- Tuite and Zuevsky, [*Genus Two Partition and Correlation Functions for Fermionic Vertex Operator Superalgebras I*](https://arxiv.org/abs/1007.5203)
- Tuite and Zuevsky, [Part II](https://arxiv.org/abs/1308.2441)

