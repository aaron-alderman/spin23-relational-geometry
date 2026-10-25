# Frontier Wave 7.113: Monster Z23 Tambara--Yamagami Recoupling

**Date:** 25 October 2026

**Status:** sourced Monster defect category; executable recoupling certificate; fifth-power categorical no-go; Frobenius--Schur measurement gate

**Evidence:** [TY recoupling record](../../../../evidence/data/monster-z23-ty-recoupling-v1.json)

**Certificate:** [TY recoupling verifier](../../../../verification/verify/verify_monster_z23_ty_recoupling.mjs)

## Result

The composition input requested by Wave 7.112 is no longer wholly missing.
Volpato proves that every non-anomalous Fricke Monster element of order
\(N\), including class \(23AB\), produces a self-orbifold duality defect
\(\mathcal N\). Together with the invertible defects \(L_{g^a}\), it generates

\[
 \operatorname{TY}(\mathbb Z_N,\chi,\epsilon),\qquad
 \chi(g^a,g^b)=e^{2\pi iab/N}.
\]

At \(N=23\), the noninvertible object has quantum dimension \(\sqrt{23}\) and

\[
 \mathcal N\otimes\mathcal N=\bigoplus_{a\in\mathbb Z_{23}}L_{g^a}.
\]

In the standard skeletal gauge, the three-duality-defect associator is the
Fourier recoupling matrix

\[
 [F^{\mathcal N\mathcal N\mathcal N}_{\mathcal N}]_{ab}
 =\tau\,\chi(g^a,g^b)^{-1}
 =\frac{\epsilon}{\sqrt{23}}e^{-2\pi iab/23},
 \qquad \epsilon\in\{+1,-1\}.
\]

The verifier constructs both candidates and checks every entry, unitarity,
\(F^2=C\) with \(C:a\mapsto-a\), and \(F^4=1\). This is a sourced,
quantitative Monster composition law rather than the illustrative
\(H^3(\mathbb Z_{23},U(1))\) cocycle of Wave 7.112.

## 1. The physical content

This result crosses a meaningful line. It does not merely attach the Monster
to degeneracies or a partition function. It supplies a noninvertible
topological line in a consistent chiral CFT and a definite 23-channel change
of fusion basis. The observable predictions of that defect sector include:

- 23 equal-magnitude recoupling channels, each of magnitude
  \(1/\sqrt{23}=0.208514\ldots\);
- relative phases on the 23rd-root Fourier grid;
- exact return to the charge-conjugated channel after two recouplings;
- exact return to the original channel after four recouplings;
- a categorical sign \(\epsilon\), equivalently
  \(\tau=\epsilon/\sqrt{23}\).

These are interaction data. They are invisible to a ledger containing only
objects, fusion multiplicities or scalar genus-one traces.

## 2. The sign is physical but not yet fixed here

Volpato fixes the bicharacter by showing that the defect maps the
\(g^a\)-twisted module \(V_{a,0}\) to the eigenspace \(V_{0,a}\), but the cited
construction labels the resulting category by \(\epsilon\) without evaluating
which sign the Monster realization has. The two signs are not removable by
a fusion-basis change: they are inequivalent spherical fusion categories.

The closed discriminator is the second Frobenius--Schur indicator of the
noninvertible object,

\[
 \nu_2(\mathcal N)=\operatorname{sign}(\tau)=\epsilon.
\]

Basak and Johnson show more generally that higher Frobenius--Schur indicators
distinguish Tambara--Yamagami categories. Turaev and Vainerman show that for
odd \(|A|\), closed three-manifold state sums distinguish both the sign and
the bicharacter. Thus \(\epsilon\) is not an open, basis-dependent matrix
phase: it has a closed-network detector. The immediate Monster calculation
is to evaluate the cap--rotation--cup indicator, or an equivalent lens-space
state sum, using the actual defect junction normalization.

## 3. Fifth power: exact response and exact no-go

If the marked generator is changed from \(g\) to \(g^u\), the displayed
kernel becomes

\[
 F^{(u)}_{ab}=\frac{\epsilon}{\sqrt{23}}
 e^{-2\pi i u^2ab/23}.
\]

For the corpus's fifth-power map, \(u=5\) and \(u^2=25\equiv2\pmod {23}\).
The verifier checks the entrywise map \(s=1\mapsto s=2\). However, cyclic TY
categories with kernels \(\chi_s(a,b)=e^{2\pi i s ab/23}\) are equivalent
when their parameters differ by a square. Because \(2=5^2\), the change is
implemented exactly by the label permutation \(a\mapsto5a\).

Therefore:

> An unmarked closed invariant of the abstract
> \(\operatorname{TY}(\mathbb Z_{23},\chi,\epsilon)\) category cannot detect
> the fifth-power orientation. It can detect \(\epsilon\) and the
> square-class of \(\chi\), but not the choice of generator within one
> square-class.

The quadratic Gauss-sum control makes this explicit. Since \(23\equiv3\pmod4\),
the normalized Gauss sum is \(+i\) for a quadratic-residue parameter and
\(-i\) for a nonresidue. Both \(s=1\) and \(s=2\) lie in the residue class,
so fifth power leaves this closed diagnostic unchanged.

This is not a failure of the defect bridge. It says exactly what additional
physical datum is required: a marked identification between the laboratory
charge/twist channels and the powers of the chosen Monster element. Without
that marking, category equivalence correctly erases orientation.

## 4. Replacement for the toy protocol

The sourced protocol is now:

1. prepare four \(\mathcal N\) defect endpoints with total trivial charge;
2. resolve the middle pair through all 23 invertible channels;
3. reassociate the endpoints and tomographically recover the relative
   \(23\times23\) transition matrix;
4. quotient independent input/output channel rephasings;
5. test flat magnitude, Fourier plaquette phases, unitarity and \(F^2=C\);
6. close the defect line into the Frobenius--Schur indicator to determine
   \(\epsilon\);
7. only test fifth-power orientation after fixing an external physical marking
   of \(g\), because an unmarked device admits the relabelling \(a\mapsto5a\).

The rephasing-resistant local quantity for tomography is the plaquette ratio

\[
 R_{a,a';b,b'}=
 \frac{F_{ab}F_{a'b'}}{F_{ab'}F_{a'b}}
 =e^{-2\pi i(a-a')(b-b')/23}.
\]

Row and column phase conventions cancel. A complete set of adjacent
plaquettes therefore certifies the Fourier bicharacter without treating a
gauge choice as an observable.

## 5. Claim boundary

This tranche establishes that the Monster CFT contains a specific
noninvertible defect fusion category with a quantitatively fixed Fourier
recoupling law, up to one categorical sign. That is a genuine realization
inside mathematical quantum field theory.

It does not establish that a laboratory material realizes the Monster CFT,
that nature selects it, or that the \(23A/23B\) orientation is visible without
a marked embedding. The shortest next proof obligation is now much smaller:
determine \(\epsilon\) for the Monster duality defect and design a carrier in
which the 23 channels have an independently calibrated physical meaning.

## Primary sources

- Volpato, [*Monstrous parafermionic defects and other non-invertible symmetries in chiral CFTs*](https://arxiv.org/abs/2609.03043), especially eqs. (2.55)--(2.57) and §3.1.
- Tambara and Yamagami, [*Tensor categories with fusion rules of self-duality for finite abelian groups*](https://doi.org/10.1006/jabr.1998.7558).
- Basak and Johnson, [*Indicators of Tambara--Yamagami categories and Gauss sums*](https://arxiv.org/abs/1405.7950).
- Turaev and Vainerman, [*The Tambara--Yamagami categories and 3-manifold invariants*](https://arxiv.org/abs/1009.1798).

## Corpus links

- [Z23 composition-witness toy](frontier_wave7_112_z23_composition_witness_toy_reconstruction.md)
- [Heterotic BPS orientation gate](frontier_wave7_111_heterotic_bps_orientation_no_go_and_interaction_gate.md)
- [Monster physical-realization ladder](frontier_wave7_110_monster_physics_realization_ladder.md)
- [Moonshine programme](../../moonshine-program-lattice/README.md)
