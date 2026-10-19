# Lane Expansion 08: The Naive Six-Point Yukawa Geometry Fails First Order and Points to the Furey Bimodule

**Date:** 17 October 2026  
**Lane:** L5, spectral triples and graded superconnections  
**Claim status:** exact finite toy-model obstruction and typed continuation; not yet a Standard-Model finite spectral triple  
**Certificate:** [verify_programme_naive_yukawa_spectral_triple_obstruction.mjs](scripts/verify_programme_naive_yukawa_spectral_triple_obstruction.mjs)

## Result

A tempting first construction is to treat the six completed matter species

\[
(Q,u^c,d^c,L,e^c,\nu^c)
\]

as six points, represent \(A=\mathbb C^6\) diagonally, and use the four Yukawa incidences as the off-diagonal entries of a finite Dirac operator.

This construction has a grading, a self-adjoint odd Dirac matrix and commuting left/right diagonal actions. Nevertheless it fails the real spectral-triple first-order condition for every nonzero Yukawa edge.

The failure is informative. Standard finite spectral triples encode matter as algebra bimodules, with Yukawa links represented in a Krajewski-type diagram. The Furey TRO already has precisely this arrow/bimodule character. Therefore the next bridge should not identify the six species with six points; it should attempt to identify the Furey source-target rectangles with the left-right bimodules of a finite geometry.

## 1. Naive finite data

Let

\[
\mathcal H_6=\mathbb C^6
\]

and represent

\[
A=\mathbb C^6
\]

by diagonal multiplication. Assign grading

\[
\gamma=\operatorname{diag}(+1,-1,-1,+1,-1,-1),
\]

so \(Q,L\) occupy one grade and \(u^c,d^c,e^c,\nu^c\) the other.

The Yukawa-support Dirac matrix has edges

\[
Q\leftrightarrow u^c,
\quad Q\leftrightarrow d^c,
\quad L\leftrightarrow e^c,
\quad L\leftrightarrow\nu^c,
\]

with arbitrary complex coefficients \(y_u,y_d,y_e,y_\nu\) and their Hermitian conjugates. It obeys

\[
D=D^\dagger,
\qquad
\{D,\gamma\}=0.
\]

Take the naive real structure \(J=K\), entrywise complex conjugation. Because both left and right diagonal actions commute,

\[
[a,JbJ^{-1}]=0.
\]

Thus the order-zero condition passes.

## 2. Exact first-order failure

The first-order condition demands

\[
[[D,a],JbJ^{-1}]=0
\qquad\text{for all }a,b\in A.
\]

For diagonal \(a,b\), its \((i,j)\) entry is

\[
D_{ij}(a_j-a_i)(b_j-b_i).
\]

Choose \(a\) and \(b\) to distinguish the two endpoints of any nonzero Yukawa edge. The product is nonzero. Hence

\[
\boxed{
[[D,a],JbJ^{-1}]=0\ \forall a,b
\quad\Longrightarrow\quad
D_{ij}=0\text{ for every inter-point edge}.}
\]

The naive six-point real geometry permits no Yukawa graph at all.

Restricting \(A\) to scalar multiples of the identity makes the first-order condition trivial, but also erases the internal algebraic distinctions one wanted to geometrize. That is not a repair.

## 3. Why a bimodule changes the problem

In a finite real spectral triple, a state may carry a left representation of one algebra summand and a right representation of another. It is therefore naturally labelled by an ordered pair of representation vertices—an arrow rather than a point.

This matches the established Furey/TRO language:

\[
\text{matter state}
\sim
\text{source-to-target rectangle}
\sim
\text{finite-algebra bimodule arrow}.
\]

The left and right actions can then differ while still commuting, and the first-order condition constrains which Dirac links between arrows are allowed. This is the setting of Krajewski diagrams, where vertices encode chiral gauge multiplets and links encode Yukawa couplings.

The match is structural, not yet an equivalence. A valid intertwiner must identify:

1. the finite algebra summands and their left/right actions;
2. the grading and real structure;
3. the four Furey Yukawa triangles with allowed Dirac links;
4. the sterile \(NN\) pairing with a Majorana block;
5. the source-current plane with one-forms or fluctuations of the Dirac operator.

## 4. Coefficient freedom remains

Even before imposing the full spectral axioms, the Yukawa-support matrix contains four independent complex coefficients in one generation. The grading and self-adjointness conditions determine where coefficients may occur, not their magnitudes.

This gives a concrete test for the lane: after building the correct bimodule geometry, count the surviving Dirac moduli and ask whether any axiom ties them to the incidence weights, the response selector or the source normalization. If all physical data remain arbitrary matrix entries, the construction is an action-generating organization rather than an explanation.

## 5. The right-handed-neutrino clue

The earlier gauge-invariant pairing audit found that \(NN\) is the unique bare holomorphic matter pairing. In almost-commutative Standard-Model geometries, a right-handed-neutrino Majorana term is likewise special and is known to put pressure on the orientability axiom in KO-dimension six.

This is a real cross-lane correspondence:

\[
\text{unique neutral Furey pairing}
\longleftrightarrow
\text{special Majorana block in finite geometry}.
\]

It does not yet fix the Majorana coefficient or prove that the two constructions are the same.

## 6. Landscape and closure ledgers

### Landscape value

- rules out the naive six-points-plus-Yukawa-edges model;
- identifies bimodule arrows as the correct comparison type;
- connects the Furey TRO to Krajewski-diagram methodology;
- isolates the sterile Majorana/orientability issue as a shared structural feature.

### Closure value

No source selector or numerical relation is obtained yet. The lane becomes closure-relevant only if the finite-geometry axioms reduce the Furey source or Dirac moduli.

## 7. Concrete continuation

Construct the smallest doubled arrow Hilbert space from the four anomaly-free Furey TRO choices. For each choice:

1. define candidate left and right algebra actions;
2. solve the order-zero and first-order matrix equations;
3. test grading, reality and orientability;
4. count admissible Yukawa and Majorana coefficients;
5. compute inner fluctuations and compare their gauge representations with the Higgs/source portals.

**Go signal:** one TRO choice uniquely passes the axioms and reduces source or Yukawa freedom.

**No-go signal:** all choices require the same arbitrary Standard-Model Dirac data, or the unique \(NN\) block forces an unacceptable axiom failure with no physical payoff.

## Primary literature boundary

- [Krajewski, classification of finite spectral triples and diagrammatic Yukawa structure](https://arxiv.org/abs/hep-th/9701081)
- [Stephan, Krajewski diagrams for Standard-Model finite geometries](https://arxiv.org/abs/0809.5137)
- [Stephan, right-handed neutrinos and the orientability issue](https://arxiv.org/abs/hep-th/0610097)
- [Gesteau, finite spectral geometry and Yukawa renormalization](https://arxiv.org/abs/1906.02297)

## Reproducibility

```powershell
node scripts\verify_programme_naive_yukawa_spectral_triple_obstruction.mjs
```

