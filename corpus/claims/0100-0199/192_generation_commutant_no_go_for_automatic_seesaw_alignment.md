# Generation-Commutant No-Go for Automatic Exceptional–Seesaw Alignment

**Date:** 17 October 2026  
**Branches:** B03, B05, B09 and B11  
**Claim status:** exact for the generation-blind extension of the one-generation Furey linking algebra; enlarged flavor dynamics remain open

## 1. Question

Can the neutral two-cycle in the completed Furey linking algebra force the multi-flavor exceptional coefficient to obey

\[
C=\kappa M?
\]

For one generation the answer is vacuously yes: two nonzero complex numbers are always proportional. The real test begins with two or more generations.

## 2. Generation-blind extension

The currently constructed Furey matter TRO and linking algebra describe one generation. The minimal replication to \(n\) generations is

\[
\mathcal H_{\rm int}
\longrightarrow
\mathcal H_{\rm int}\otimes F,
\qquad F\cong\mathbb C^n,
\]

with every source-algebra element acting as

\[
a\longmapsto a\otimes 1_F.
\]

Its commutant contains

\[
1_{\rm int}\otimes\operatorname{End}(F)
\cong M_n(\mathbb C).
\]

If the internal representation is irreducible on a block, this is the full multiplicity commutant by Schur's lemma. The copied linking incidence distinguishes particle types and neutral corners, but it does not distinguish directions in generation space.

## 3. Symmetric sterile-pair space

Both the Majorana matrix and the sterile-pair exceptional coefficient lie in

\[
\operatorname{Sym}^2(F^*),
\qquad
\dim_\mathbb C\operatorname{Sym}^2(F^*)
=\frac{n(n+1)}2.
\]

The generation commutant supplies a full \(U(n)_F\) basis freedom. Under \(V\in U(n)_F\),

\[
S\mapsto V^T S V.
\]

There is no nonzero \(U(n)_F\)-invariant vector in this symmetric space. The central transformation \(V=e^{i\theta}1\) alone gives

\[
S\mapsto e^{2i\theta}S.
\]

Invariance for every \(\theta\) forces \(S=0\).

Therefore the generation-blind linking algebra cannot manufacture a nonzero canonical Majorana matrix, a canonical exceptional coefficient, or a canonical proportionality direction between them.

## 4. Why the neutral two-cycle does not solve this

The one-generation exchange-paired arrows close a neutral two-cycle in the internal corner. After replication, that operator has the form

\[
T_{\rm neutral}\otimes 1_F.
\]

It can select the internal support on which a Majorana interaction may live, but it remains scalar in generation space. A general mass matrix requires insertion of a flavor spurion

\[
M\in\operatorname{Sym}^2(F^*).
\]

An exceptional coefficient requires another insertion

\[
C\in\operatorname{Sym}^2(F^*).
\]

The internal two-cycle supplies neither their entries nor their relative direction.

## 5. The single-spurion escape

Alignment follows if a larger theory contains exactly one symmetric flavor spurion \(S\) and both structures are linear in it:

\[
M=aS,
\qquad
C=bS.
\]

For \(a\ne0\),

\[
C=\frac ba M.
\]

This is a legitimate route, but it is an additional **single-spurion hypothesis**, not a consequence of the current linking algebra.

With two independent symmetric spurions \(S,T\),

\[
M=aS+bT,
\qquad
C=cS+dT,
\]

generic alignment fails. If \(S,T\) are linearly independent, proportionality requires

\[
ad-bc=0.
\]

The condition is a tuning unless a symmetry or incidence rule enforces it.

## 6. Orthogonal flavor symmetry is too restrictive

One can reduce the commutant by postulating a real orthogonal flavor symmetry. The invariant symmetric direction is then

\[
S\propto 1_n.
\]

This does give a unique ray, but at the unbroken level it produces degenerate sterile masses and no nontrivial generation texture. Realistic mixing again requires symmetry-breaking spurions, reopening the alignment problem.

Thus “choose the identity” is not a solution unless the breaking sector also preserves the required proportionality.

## 7. Exceptional incidence does not yet act on generation

The oriented exceptional determinant selects a unique cubic contraction for one complement field. Replicating complement fields produces polarized determinants rather than a unique generation tensor. The previously counted multiplicity

\[
\binom{n+2}{3}
\]

is evidence in the same direction: exceptional incidence alone does not erase flavor multiplicity.

A genuine rescue would require generation to be intrinsic to the exceptional incidence geometry rather than attached as an external multiplicity index.

## 8. Result

For the presently defined generation-blind Furey completion:

\[
\boxed{
\text{neutral two-cycle}
\not\Longrightarrow
C\propto M
\quad(n\ge2).
}
\]

The two-cycle selects **where** the neutral interaction lives. It does not select **which flavor tensor** occupies that support.

This pins the alignment branch at a clear dependency: a flavor algebra, a unique symmetric spurion, or an incidence construction that generates the three families internally.

## 9. Stop-everything and falsification gates

**Intrinsic-generation success:** the exceptional/Furey algebra derives a three-dimensional multiplicity space with a one-dimensional allowed symmetric-pair invariant after all physical symmetries are imposed.

**Single-spurion success:** one source-derived field or invariant generates both \(M\) and \(C\), with no second symmetric spurion permitted.

**Radiative success:** loops preserve the single-spurion ray rather than generating independent insertions.

**Commutant no-go:** the full source algebra continues to act as \(a\otimes1_F\) and all \(U(3)_F\)-covariant symmetric counterterms remain allowed. Then automatic alignment is impossible.

**Degeneracy failure:** the only unique invariant is the orthogonal identity and its required breaking reintroduces unrestricted misalignment.

## 10. Certificate

The [generation-commutant alignment certificate](../../../verification/verify/verify_generation_commutant_alignment_no_go.mjs) checks symmetric-space dimensions, the central-\(U(1)\) no-invariant argument, commutation of generation endomorphisms with a generation-blind source action, single-spurion alignment, generic two-spurion failure and the orthogonal invariant ray.

## Companion documents

- [Multi-flavor exceptional seesaw alignment gate](191_multiflavor_exceptional_seesaw_alignment_gate.md)
- [Exchange-paired neutrino two-cycle](170_exchange_paired_neutrino_two_cycle_and_majorana_gate.md)
- [Surviving TRO linking algebras](112_furey_surviving_tro_linking_algebras.md)
- [Oriented exceptional cubic](185_oriented_exceptional_flag_unique_cubic_odd_invariant.md)
