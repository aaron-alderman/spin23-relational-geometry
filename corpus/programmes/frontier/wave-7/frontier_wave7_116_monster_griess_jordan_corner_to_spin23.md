# Frontier Wave 7.116: The Monster Griess--Jordan Corner Reaches Spin(2,3)

**Date:** 25 October 2026

**Status:** exact sourced subalgebra and executable downstream embedding; physical sector-selection and dynamics open

**Evidence:** [Griess--Jordan bridge record](../../../../evidence/data/monster-griess-jordan-spin23-v1.json)

**Certificate:** [Griess--Jordan bridge verifier](../../../../verification/verify/verify_monster_griess_jordan_spin23.mjs)

## Result

There is a much shorter exact path from the Monster to the corpus's Jordan
carrier than the speculative exceptional-group route.

Let \(B^\natural=(V^\natural)_2\) be the 196,884-dimensional unital
Griess--Conway algebra, the weight-two part of the Moonshine VOA. If \(C\) is
the centralizer of a Monster \(2B\)-involution, Griess records that the fixed
subalgebra of its extraspecial normal 2-subgroup \(O_2(C)\), of order
\(2^{25}\), is

\[
 (B^\natural)^{O_2(C)}\cong \operatorname{Sym}_{24}(\mathbb R)
\]

with the special Jordan product

\[
 X\circ Y=\frac12(XY+YX).
\]

Selecting any two coordinate directions gives a product-preserving principal
corner

\[
 H_2(\mathbb R)=\operatorname{Sym}_2(\mathbb R)
 \hookrightarrow\operatorname{Sym}_{24}(\mathbb R)
 \hookrightarrow B^\natural.
\]

The established Tits--Kantor--Koecher construction then gives

\[
 \operatorname{TKK}(H_2(\mathbb R))
 =\mathfrak{sp}(4,\mathbb R)
 \cong\mathfrak{so}(2,3).
\]

This is an exact algebraic chain using the actual weight-two product of the
Monster VOA. It replaces the previous concept-map edge “exceptional groups
analogous to Monster” with a direct, typed Jordan subalgebra edge.

## 1. Executable certificate

The verifier constructs \(\operatorname{Sym}_{24}\), embeds its upper-left
\(2\times2\) corner, and checks:

- the 300-dimensional symmetric-matrix count;
- closure of the three corner basis elements under the Jordan product;
- the Jordan identity on a finite exact coefficient grid;
- agreement of the polarized Jordan triple with
  \((XYZ+ZYX)/2\);
- the \((1,2)\) determinant signature of the corner;
- all TKK upper/lower wings and commutators;
- rank ten of the resulting \(4\times4\) symplectic Lie algebra;
- all generators satisfy \(M^T\Omega+\Omega M=0\).

The certificate does not reconstruct the 196,884-dimensional Griess product.
The first embedding is a sourced theorem; the code independently verifies
every downstream step from the stated \(\operatorname{Sym}_{24}\) fixed
subalgebra.

## 2. Physical reading

For weight-two states \(u,v\in(V^\natural)_2\), the Griess product is a VOA
mode product. Thus the Jordan multiplication in the fixed sector is not an
external analogy: it is inherited from chiral operator composition. The real
Moonshine form is positive definite, and the fixed Jordan algebra has its
ordinary spectral calculus and positive-semidefinite cone.

The most disciplined physical interpretation is:

```text
Monster chiral CFT
  -> weight-two operator product
  -> finite-symmetry fixed sector
  -> rank-two Jordan response corner
  -> Jordan triple / TKK conformal completion.
```

This provides a genuine place for the corpus's “Jordan admission before Lie
transport” inside the Monster theory. It does not show that a laboratory
Hamiltonian dynamically projects onto this fixed sector or that its positive
cone is automatically the cone of experimentally accessible observables.

## 3. The exact selection obstruction

A 24-coordinate Jordan algebra contains

\[
 \binom{24}{2}=276
\]

coordinate principal \(H_2(\mathbb R)\) corners. Coordinate permutations move
them transitively. Allowing arbitrary rank-two real subspaces gives a
continuous Grassmannian family. Therefore the existence of the corner cannot
select one physical two-port carrier.

A valid physical dictionary must add a projector or boundary condition \(P\)
and demonstrate, on the same carrier,

1. why \(O_2(C)\)-invariant weight-two operators are retained;
2. why one rank-two projection is operationally marked;
3. why couplings to the other 22 directions are absent or gapped;
4. why the Jordan triple controls measured response or elimination;
5. why the induced TKK dynamics shares the experimental clock and detector.

The selection datum may come from a defect endpoint, boundary module,
two-channel source coupling or controlled symmetry projection. It may not be
inferred from the existence of the subalgebra.

## 4. What this does and does not say about symmetry

The finite Monster group acts on \(B^\natural\). The continuous
\(Sp(4,\mathbb R)\) arises after selecting \(H_2(\mathbb R)\) and applying its
TKK conformal prolongation. Consequently,

\[
 Sp(4,\mathbb R)\not\subset\mathbb M
\]

as the asserted mechanism: a nontrivial connected Lie group cannot be a
subgroup of the finite Monster. The exact statement is about a product-derived
continuous completion of a selected Monster-VOA operator subalgebra.

Likewise, the full Griess algebra must not be called a Jordan algebra. The
source identifies a particular 300-dimensional fixed subalgebra as Jordan.
This distinction is the balanced Jordan/Lie view in its cleanest form:

- Monster supplies a rigid finite automorphism and VOA composition law;
- the fixed sector supplies an admitted Euclidean Jordan algebra;
- a selected rank-two face supplies the corpus carrier;
- TKK supplies continuous transport only after that selection.

## 5. Relation to exceptional structures

This path bypasses the unsupported arrow

\[
 E_8\longrightarrow\mathbb M.
\]

Exceptional Jordan, Leech and \(E_8\) structures remain relevant to arithmetic
selection and other parts of the Moonshine construction, but they are not
needed to prove that a real Jordan carrier occurs inside the Monster VOA. The
new hierarchy is:

1. **direct and exact:** Griess fixed Jordan algebra
   \(\operatorname{Sym}_{24}\), its \(H_2\) corner and TKK closure;
2. **exact but differently typed:** Leech/Monster and Lorentzian
   \(II_{1,1}\) Moonshine constructions;
3. **conditional:** exceptional-Jordan/Leech integral compatibility;
4. **closed as a shortcut:** bare \(E_8\) containment or dimension matching
   as proof of Monster dynamics.

## 6. New experimental discriminator

If a proposed Monster simulator exposes a weight-two sector, test a declared
three-dimensional subspace for the actual Jordan identity and triple law:

\[
 (X^2\circ Y)\circ X=X^2\circ(Y\circ X),
\]

\[
 \{X,Y,Z\}=(X\circ Y)\circ Z+(Z\circ Y)\circ X-(X\circ Z)\circ Y.
\]

Then reconstruct the ten TKK generators from controlled upper/lower response
operations. A dimension-three spectral match without these product tests does
not pass. Conversely, a passing product test plus a sourced fixed-sector
projector would join the Monster and Jordan lanes on the same operator carrier.

## Claim boundary

**Theorem/source:** the Monster Griess algebra contains the fixed
\(\operatorname{Sym}_{24}\) Jordan subalgebra.

**Executable theorem:** any declared principal two-corner is exactly
\(H_2(\mathbb R)\), and its TKK algebra is
\(\mathfrak{sp}(4,\mathbb R)\cong\mathfrak{so}(2,3)\).

**Inference:** this gives an operator-composition route by which a Monster CFT
can contain the corpus's admissibility carrier.

**Open:** physical projection, corner selection, dynamics, experimental
detection and any claim that the TKK group is a fundamental Monster symmetry.

## Sources

- Griess, [*Nonassociativity in VOA theory and finite group theory*](https://www.kurims.kyoto-u.ac.jp/EMIS/journals/CMUC/pdf/cmuc1002/griess.pdf), especially §8.
- Griess, [*A construction of \(F_1\) as automorphisms of a 196,883-dimensional algebra*](https://pmc.ncbi.nlm.nih.gov/articles/PMC319865/).
- Ivanov, [*Algebraic Combinatorics and the Monster Group* excerpt](https://assets.cambridge.org/97810093/38042/excerpt/9781009338042_excerpt.pdf).
- Günaydin, [*Generalized Conformal and Superconformal Group Actions and Jordan Algebras*](https://arxiv.org/abs/hep-th/9301050).

## Corpus links

- [Jordan triple to Sp(4,R)](../../../claims/0000-0099/42_jordan_triple_to_sp4r_determination.md)
- [Monster physical-realization ladder](frontier_wave7_110_monster_physics_realization_ladder.md)
- [Moonshine programme](../../moonshine-program-lattice/README.md)
