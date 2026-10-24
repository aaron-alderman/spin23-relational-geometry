# Frontier Wave 7.29: The Filled and Unfilled Monster-Address Frontier

**Date:** 24 October 2026  
**Status:** exact formal geometry; empirical occupancy transcribed but not reproduced; reachability frontier open  
**Ledger:** [Monster–Lean fold frontier geometry v1](monster_lean_fold_frontier_geometry_v1.json)  
**Certificate:** [Monster–Lean fold verifier](../../../../verification/verify/verify_monster_lean_fold_admissibility.mjs)

## Result

The Monster address space gives a literal instance of the corpus's filled/unfilled admissibility zone. It factors as

\[
A_{\mathbb M}\cong A_{\mathrm{deep}}\times\{0,1\}^{9},
\]

where the six deeper coordinate bounds are

\[
(46,20,9,6,2,3),
\qquad |A_{\mathrm{deep}}|=829{,}080,
\]

and the remaining nine Monster exponents are one. Hence

\[
829{,}080\times512=424{,}488{,}960.
\]

The post reports only 908 occupied addresses. If reproduced, the observed environment fills approximately

\[
2.139\times10^{-6}
\]

of the formal box, or \(0.0002139\%\). The important unknown is therefore not the size of the container but the shape of the realizable image inside it.

## 1. A 96-level tower

The address rank is

\[
\rho(a)=\sum_{j=1}^{15}a_j.
\]

Its generating polynomial is

\[
P(q)=\prod_{j=1}^{15}(1+q+\cdots+q^{b_j}).
\]

There are 96 levels, from rank zero to rank 95. Complementation

\[
a\longmapsto b-a
\]

reverses the lattice and sends rank \(r\) to \(95-r\), so the rank distribution is symmetric. It peaks at ranks 47 and 48, each containing 9,031,664 addresses.

The worked example has rank 72. The formal box contains 4,087,649 rank-72 addresses and 24,979,682 addresses at rank 72 or above. Rank is therefore a coarse height coordinate, not an identifier.

## 2. Boundary is typical, not exceptional

Only 298,080 addresses have no saturated coordinate. The remaining 424,190,880—more than 99.929%—lie on at least one cap face. A uniformly selected formal address has about 5.395 saturated coordinates on average.

This happens mainly because nine coordinates are Boolean. For them, value one is simultaneously ordinary presence and the formal cap. Consequently:

- a saturation mask is an exact stratum label;
- it is not evidence that the source overflowed;
- `IsExact` remains necessary to distinguish exact contact with a face from approach from beyond it;
- even `IsExact = false` does not record how far beyond the face the source lay.

This is a useful correction to the naive language of “inside versus boundary.” The operative geometry is a stratified cube/box with provenance attached, not a bulk with rare edge cases.

## 3. Five zones rather than two

Let \(F\) be the 908 reported addresses, \(R\) the addresses realized by at least one valid Lean kernel expression, and \(A_{\mathbb M}\) the formal Monster box. Then

\[
F\subseteq R\subseteq A_{\mathbb M}.
\]

The apparently unfilled region \(A_{\mathbb M}\setminus F\) must be separated into:

1. **reachable but unobserved:** valid expression profiles absent from this project;
2. **structurally forbidden:** count combinations incompatible with expression-tree and logical-incidence constraints;
3. **encoding-unstable:** points whose assignment changes under meaning-preserving representation choices;
4. **semantically collided:** occupied addresses whose declarations are inequivalent under the semantic relation of interest.

This is the corpus's known/unknown frontier in a finite form. A raw empty cell is not yet an admissible possibility; it may be unreachable. A filled cell is not yet a semantic type; it may combine distinct declarations.

## 4. What the reported census already bounds

For 1,979 uniformly weighted declaration identities mapping to at most 908 observed addresses,

\[
H(D\mid A)\ge
\log_2(1979)-\log_2(908)
=1.124\text{ bits}.
\]

This is only a lower bound; actual loss depends on the fibre-size distribution. The average reported fibre size is 2.180 declarations per occupied address. Approximately 39.87% of declarations are reported unclamped, and the 13 displayed kernel-certified folds cover about 0.657% of the declaration census if they are distinct census members.

These figures are diagnostics, not independent results, until the data file is available and reproduced.

## 5. The next experiment

The next calculation should build three nested atlases:

\[
\text{formal box}
\supset
\text{constructibly realizable profiles}
\supset
\text{observed project profiles}.
\]

For each address, record:

- reachability by a generated well-formed `Lean.Expr`;
- minimum expression size and depth;
- saturation mask and overflow provenance;
- observed fibre size;
- variation under definitional equality and elaboration choices;
- semantic labels that disagree within the fibre.

Only after that atlas exists should new detector coordinates be selected. Candidate additions include depth, binder incidence, ordered constructor transitions and small expression-DAG motifs. Greedy selection can then target a declared semantic distinction rather than merely maximize address count.

## Relation to the corpus

This object instantiates the original admissibility-zone proposal almost literally:

- the Monster box is the **known formal bound**;
- the 908 occupied addresses are the presently **filled region**;
- constructible but unseen expressions are the **known possible frontier**;
- unclassified empty addresses are the **unknown reachability frontier**;
- definitional-equivalence tests establish the **theory/encoding bound**;
- additional profile channels establish the **detector bound**.

It is therefore valuable even if every Monster or Hecke promotion fails. It gives the corpus a finite, executable laboratory in which formal possibility, realizability, observation and recoverability can be computed separately.

## Boundary

The factorization \(6+9\), the 96-level tower and the occupancy fraction are properties of the imposed Monster bounds and reported project census. They do not establish a Monster action on Lean, a relation to the corpus's unrelated \(12+15\), \(24+3\) or \(7+5+3+2\) decompositions, or any physical content. Numerical recurrences must pass an explicit intertwiner test before those lanes are joined.
