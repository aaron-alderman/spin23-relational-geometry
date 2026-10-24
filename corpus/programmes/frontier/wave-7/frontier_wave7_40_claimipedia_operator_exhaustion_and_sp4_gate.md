# Frontier Wave 7.40: Claimipedia Operator Exhaustion and the Exact \(Sp_4\) Reopen Gate

**Date:** 24 October 2026  
**Status:** relationship, nonlocal-path, programme, evidence and provenance branches exhausted for the pinned capture  
**Ledger:** [operator exhaustion v1](claimipedia_operator_exhaustion_v1.json)  
**Aggregate check:** [operator exhaustion verifier](../../../../verification/verify/verify_claimipedia_operator_exhaustion.mjs)  
**Checks:** [relationship corner](../../../../verification/verify/verify_claimipedia_relationship_operator_corner.mjs), [programme \(A_2\)](../../../../verification/verify/verify_claimipedia_programme_a2_double_centralizer.mjs), [provenance symplectic no-go](../../../../verification/verify/verify_claimipedia_provenance_symplectic_no_go.mjs)

## Result

The pinned Claimipedia capture has now been exhausted across every currently
available operator-bearing layer named in the goal.  The exact semisimple Lie
content is

\[
\mathfrak{sl}_2(\mathbb Q)\oplus\mathfrak{sl}_3(\mathbb Q),
\]

with only one-way radical extensions between the surrounding data layers.  It
does not contain \(\mathfrak{sp}_4\), the \(C_2\) Cartan matrix or a second root
channel coupled to the Spin--Temple \(\mathfrak{sl}_2\).

This verdict includes arbitrary linear combinations of all finite relationship
paths, not merely individual arrows.

## 1. Full relationship-path exhaustion

On all 38 relationship nodes, the 66-dimensional algebra has a
58-dimensional nilpotent radical and semisimple quotient

\[
\mathcal A_{38}/J
\cong
\mathbb Q\oplus M_2(\mathbb Q)\oplus\mathbb Q[C_3].
\]

The factors come from:

- the common scalar action on acyclic singleton components;
- the Spin--Temple two-cycle, giving \(M_2(\mathbb Q)\);
- the nitrate--flow--calibration three-cycle, giving the commutative cyclic
  algebra \(\mathbb Q[C_3]\cong\mathbb Q\oplus\mathbb Q(\zeta_3)\).

Under commutators, the scalar and cyclic factors vanish.  The only nonabelian
semisimple Lie factor is therefore

\[
[M_2,M_2]=\mathfrak{sl}_2.
\]

Any semisimple Lie subalgebra of \(\mathcal A_{38}\) intersects the associative
nilpotent radical in a solvable ideal, hence trivially, and must inject into the
semisimple quotient.  Therefore no second \(\mathfrak{sl}_2\), no
\(\mathfrak{sl}_2\oplus\mathfrak{sl}_2\), and no \(\mathfrak{sp}_4\) can be
hidden in nonlocal path combinations.

## 2. Programme branch

The reciprocal Program--Version--Example core generates
\(M_3(\mathbb Q)\) on stage space with an \(M_3(\mathbb Q)\) policy-multiplicity
commutant.  Its root system is exactly \(A_2\):

\[
\begin{pmatrix}2&-1\\-1&2\end{pmatrix}.
\]

It fails the asymmetric \(C_2\) Cartan requirement.  All three programme
examples point one-way to `claim.riverNitrate`; that edge joins the programme
sector to the cyclic relationship sector only through the radical.  There is no
return operator and hence no new strongly connected semisimple block.

## 3. Evidence branch

The seven evidence records consist of four Supports, two Challenges and one
Qualifies edge.  Every edge runs from an EvidenceItem to a Claim and none runs
back.  Consequently every product of two evidence-incidence operators is zero:

\[
N_{\mathrm{evidence}}^2=0.
\]

The unital evidence algebra has semisimple quotient \(\mathbb Q\) and no
nonabelian Lie factor.  Adjoining transpose edges would manufacture reversible
matrix blocks, but transpose is not an authored evidence operation.

## 4. Provenance branch

All 659 declaration receipts, 659 contributions and 659 contribution reviews
were inspected from the fixed source.  They form exact one-to-one chains:

\[
\text{Review}\longrightarrow
\text{Contribution}\longrightarrow
\text{DeclarationReceipt},
\]

and every member of each triple names the same unique claim-version target.
There are no missing references or target mismatches; all reviews are Accepted.

On the four administrative stages Target, Receipt, Contribution and Review, the
authored maps generate

\[
\mathbb Q I\oplus\mathfrak n_4,
\]

where \(\mathfrak n_4\) is the six-dimensional strictly triangular algebra.
This seven-dimensional algebra has only scalar semisimple quotient.

The four-dimensional stage space could host a chosen symplectic form, so it has
mere \(Sp_4\) capacity.  But solving

\[
X^{\mathsf T}J+JX=0
\]

for every authored stage transition leaves a one-dimensional space of
alternating forms whose nonzero members have rank two.  No nondegenerate
invariant symplectic form exists.  Adjoining inverse lookup maps and choosing a
new form would add precisely the missing structure rather than derive it.

## 5. Combined no-go

One-way incidence edges among evidence, examples, claims and provenance enter
the radical and do not merge the simple factors.  The combined authored
semisimple Lie algebra is therefore

\[
\mathfrak{sl}_2\oplus\mathfrak{sl}_3.
\]

If simple \(\mathfrak{sp}_4\) embedded in this direct sum, projection to each
factor would be either zero or injective.  Injection is impossible because

\[
\dim\mathfrak{sp}_4=10>
\dim\mathfrak{sl}_3=8>
\dim\mathfrak{sl}_2=3.
\]

Thus the combined present corpus cannot conceal \(\mathfrak{sp}_4\) in these
operator layers.

## 6. Exact reopen gate

The route reopens only when a new, evidence-bound operator supplies all of:

1. a shared invariant carrier containing the existing Spin--Temple root pair;
2. a second raising/lowering pair not absorbed into the radical;
3. a nondegenerate alternating form preserved by the generated operators;
4. asymmetric Cartan integers \((-1,-2)\), up to root ordering;
5. the corresponding \(C_2\) Serre relations;
6. a declared intertwiner to either the corpus's established
   \(H_2(\mathbb R)\)/\(Sp_4(\mathbb R)\) carrier or a finite \(Sp_4\) module.

Absent that packet, adding reverse arrows, transpose operators or a symplectic
form is a model extension, not a discovery in the captured corpus.

## Boundary

This is an exhaustive algebraic result for the fixed local Claimipedia capture,
its exposed collections and the declared aggregation rules.  A future corpus
version can change the result.  Nothing here promotes an authored knowledge
graph to physical evidence; it identifies exactly what algebra is present,
what is absent and what data would be required to cross the boundary.
