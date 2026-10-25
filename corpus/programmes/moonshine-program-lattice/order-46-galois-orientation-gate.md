# The order-46 Galois orientation gate

**Date:** 25 October 2026

**Status:** inner power transport and finite label action closed; twisted-character Galois transport open

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
available in the Monster.  They are genuine separate inputs to the next
trace calculation, even though their resulting functions may still agree.

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

## 3. The reduced trace matrix

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

Thus at most eight oriented nonidentity traces are required:

\[
2\cdot3+2\cdot1=8.
\]

The identity-coset traces are the four cyclic cases already reduced to two
scalar Hauptmoduln.  No 529-function computation is required.

For each quotient label \(\lambda\), compute

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

An equality means the label carries no extra oriented information.  A
failure, after cocycle phases are accounted for, is the desired
orientation-sensitive character.

## 4. Admissibility consequence

The finite quotient and the arithmetic orientation occupy different layers:

- \(Q_h\) supplies the smallest additional **input labels**;
- the Monster normalizer supplies only square-power **inner covariance**;
- \(\sigma_5\) supplies the nonsquare **Galois comparison**;
- the twisted-module projective character decides whether the comparison is
  observable.

This prevents a recurrent category error in the wider corpus: an outer
arithmetic symmetry may pair observables without being a physical symmetry
operator or an element of the ambient group.  Promotion to dynamics still
requires an operator, state space and detector map.

## 5. Exhaustion boundary

The group-theoretic search is exhausted at this level.  The quotient types,
number of labels, inner normalizer image and its action are fixed.  What
remains is not more finite-group guessing but one explicit projective
character computation, bounded by eight oriented nonidentity traces.

If every pair is Galois-covariant, scalar genus-one centralizer insertions
fail as orientation detectors.  The next admissible carrier is then a
vector-valued module or genus-two sewing representation.  If a pair splits,
its multiplier and degeneration become the data to match to the genus-two
determinant line.

## Sources and corpus links

- [ATLAS Monster conjugacy classes, centralizers and power maps](https://brauer.maths.qmul.ac.uk/Atlas/v3/spor/M)
- Breuer, Magaard and Wilson, [*Verification of the conjugacy classes and ordinary character table of the Monster*](https://arxiv.org/abs/2412.12182)
- Carnahan, [*Generalized Moonshine IV: Monstrous Lie algebras*](https://arxiv.org/abs/1208.6254)
- Gaberdiel, Persson and Volpato, [*Generalised Moonshine and Holomorphic Orbifolds*](https://arxiv.org/abs/1302.5425)
- [Centralizer augmentation gate](order-46-centralizer-augmentation.md)
- [Order-46 observable ladder](order-46-observable-ladder.md)
- [Joined bridge map](joined-bridge-map.md)
