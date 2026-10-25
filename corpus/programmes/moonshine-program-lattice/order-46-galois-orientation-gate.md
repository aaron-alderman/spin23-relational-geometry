# The order-46 Galois orientation gate

**Date:** 25 October 2026

**Status:** all genus-one centralizer representation routes exhausted; cross-grade and genus-two transport open

**Evidence:** [Galois-orientation ledger](../../../evidence/data/moonshine-order46-galois-orientation-v1.json)  
**Certificate:** [arithmetic and automorphism verifier](../../../verification/verify/verify_moonshine_order46_galois_orientation.mjs)

## Result

The orientation exchange at order 46 is an **outer arithmetic** operation on
the Monster class data, not an inner group operation.  This distinction
locates the remaining information exactly.

For \(h\) of order 46, the unit group

\[
U_{46}=(\mathbb Z/46\mathbb Z)^\times
\]

is cyclic of order 22.  Its square subgroup has order 11.  The ATLAS power
map divides the generators of \(\langle h\rangle\) into the two classes
\(46A/46B\), or \(46C/46D\), according to these two square cosets.  Hence

\[
N_{\mathbb M}(\langle h\rangle)/C_{\mathbb M}(h)\cong C_{11}.
\]

The element \(5\) generates \(U_{46}\), satisfies

\[
5^{11}\equiv-1\pmod {46},
\]

and is not a square.  It therefore exchanges the two Monster classes but is
not induced by conjugation in \(\mathbb M\).  Were
\(nhn^{-1}=h^5\) possible, \(h\) and \(h^5\) would be in the same conjugacy
class, contradicting the power map.

## 1. Inner transport cannot consume the new labels

The minimal noncyclic quotients are already known:

\[
Q_{46AB}\cong C_2^2,\qquad Q_{46CD}\cong C_2.
\]

The inner power transport \(C_{11}\) acts through their automorphism groups,

\[
C_{11}\longrightarrow \operatorname{Aut}(C_2^2)\cong S_3,
\qquad
C_{11}\longrightarrow \operatorname{Aut}(C_2)=1.
\]

Both maps are trivial: an image order must divide both 11 and 6 on the first
rail, and the second automorphism group is trivial.  Conjugation by the
centralizer also acts trivially on the quotient because both quotients are
abelian.

Consequently the three nonidentity \(C_2^2\) labels and the single
nonidentity \(C_2\) label are not merged by any inner power transport
available in the Monster. They remain distinct quotient coordinates. The
full centralizer census, however, now proves that evaluating one scalar trace
at each coordinate cannot restore the orientation: each insertion forms a
cyclic subgroup with the order-23 element and reduces to an ordinary
McKay--Thompson branch.

## 2. What fifth power actually acts on

The fifth-power comparison belongs to cyclotomic Galois covariance.  At each
graded degree, a twisted--twining coefficient is a projective character value
of a centralizer action.  The comparison is therefore between:

1. the 46A and 46B, or 46C and 46D, twisted modules;
2. their compatible projective centralizer characters;
3. the Galois automorphism sending the relevant roots of unity to their
   fifth powers; and
4. the corresponding normalization and three-cocycle phases.

This is stronger than relabelling \(h\) inside one module.  There is no
canonical Monster conjugator transporting an auxiliary insertion \(k\)
between the two classes.  A correspondence of their \(Q_h\)-labels must be
constructed from character data or a common rational form.

## 3. The reduced label matrix, and why its scalar realization closes

Before Galois comparison, the complete nonidentity insertion inventory has
shape

\[
\begin{array}{c|c|c}
\text{rail} & \text{oriented classes} & \text{auxiliary quotient labels}\\
\hline
2B & 46A,46B & 3\text{ nonzero elements of }C_2^2\\
2A & 46C,46D & 1\text{ nonzero element of }C_2
\end{array}
\]

The quotient bookkeeping therefore contains eight oriented nonidentity
slots:

\[
2\cdot3+2\cdot1=8.
\]

This was formerly an eight-trace ceiling. The complete order-23 centralizer
calculation closes it without requiring eight independent VOA character
computations. ATLAS gives

\[
C_{\mathbb M}(g)\cong C_{23}\times S_4.
\]

The five conjugacy classes of the \(S_4\) complement have orders
\(1,2,2,3,4\), and their products with \(g\) have orders
\(23,46,46,69,92\). Because every insertion order is coprime to 23,
\(\langle g,k\rangle\) is cyclic in every case. The resulting product classes
are \(23AB,46AB,46CD,69AB,92AB\), and each A/B scalar series pair agrees.
The eight slots are therefore useful labels for a future centralizer
representation, but not eight missing scalar functions.

Had the scalar route remained open, one would have computed

\[
F_{X,\lambda}(\tau)
=Z(h_X^2,h_X^{23}k_\lambda;\tau),
\qquad X\in\{46A,46B,46C,46D\},
\]

with one compatible cocycle normalization.  The orientation test is whether
the Galois-conjugated pairs are equal:

\[
F_{46B,\lambda^{\sigma_5}}
\stackrel{?}{=}\sigma_5(F_{46A,\lambda}),
\qquad
F_{46D,\lambda^{\sigma_5}}
\stackrel{?}{=}\sigma_5(F_{46C,\lambda}).
\]

The centralizer census decides this test structurally: all such individual
scalar functions are modular branches of orientation-blind cyclic series.
The failure condition is realized. A surviving observable must retain how
several \(S_4\) operations compose, or retain their action on a multiplicity
space, rather than trace one insertion at a time.

## 4. Admissibility consequence

The finite quotient and the arithmetic orientation occupy different layers:

- \(Q_h\) supplies the smallest additional **input labels**;
- the Monster normalizer supplies only square-power **inner covariance**;
- \(\sigma_5\) supplies the nonsquare **Galois comparison**;
- an individual scalar character loses the comparison;
- cross-grade VOA composition or genus-two relational sewing may still
  retain it.

This prevents a recurrent category error in the wider corpus: an outer
arithmetic symmetry may pair observables without being a physical symmetry
operator or an element of the ambient group.  Promotion to dynamics still
requires an operator, state space and detector map.

## 5. Exhaustion boundary

The group-theoretic and scalar genus-one searches are exhausted at this
level. The quotient types, number of labels, inner normalizer image, full
\(S_4\) insertion census and scalar product classes are fixed. No additional
single-insertion scalar trace can distinguish the orientation.

The projective-centralizer no-go subsequently proves that the transgressed
cocycle is trivial and the five class traces determine the full ordinary
\(S_4\) module. What remains is a change of compositional level: cross-grade
VOA products or order-23-twined genus-two sewing. A successful refinement
must state which relation survives that every graded group character
quotients away.

## Sources and corpus links

- [ATLAS Monster conjugacy classes, centralizers and power maps](https://brauer.maths.qmul.ac.uk/Atlas/v3/spor/M)
- Breuer, Magaard and Wilson, [*Verification of the conjugacy classes and ordinary character table of the Monster*](https://arxiv.org/abs/2412.12182)
- Carnahan, [*Generalized Moonshine IV: Monstrous Lie algebras*](https://arxiv.org/abs/1208.6254)
- Gaberdiel, Persson and Volpato, [*Generalised Moonshine and Holomorphic Orbifolds*](https://arxiv.org/abs/1302.5425)
- [Centralizer augmentation gate](order-46-centralizer-augmentation.md)
- [Complete order-23 centralizer exhaustion](order-23-centralizer-exhaustion.md)
- [Order-23 projective-centralizer no-go](order-23-projective-centralizer-no-go.md)
- [Order-46 observable ladder](order-46-observable-ladder.md)
- [Joined bridge map](joined-bridge-map.md)
