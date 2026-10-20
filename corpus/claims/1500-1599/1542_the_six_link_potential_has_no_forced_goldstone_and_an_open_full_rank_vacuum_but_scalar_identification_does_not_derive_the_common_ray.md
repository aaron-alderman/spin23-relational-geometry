# The Six-Link Potential Has No Forced Goldstone and an Open Full-Rank Vacuum, but Scalar Identification Does Not Derive the Common Ray

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive degree-four invariant and vacuum audit for the six distinct charged link fields of claim 1539; physical scalar representations and spectral-action coefficients remain absent

**Depends on:** [the sixteen-state gauge/Higgs/mass audit](1539_the_sixteen_state_repair_rotates_the_anomaly_free_two_torus_and_its_link_vevs_can_both_higgs_it_and_open_the_label_level_mass_gap.md) and [the RG common-line obstruction](1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md)

**Evidence:** [potential and vacuum ledger](../../../evidence/data/spin23-six-link-renormalizable-potential-vacuum-audit.json), [complete phase-monomial catalog](../../../evidence/data/spin23-six-link-renormalizable-phase-monomials.json), and [deterministic verifier](../../../verification/verify/verify_spin23_six_link_renormalizable_potential_vacuum_audit.mjs)

## Result

Treat the six charged edge-orbit coefficients of claim 1539 as distinct
complex, relation-even link fields

\[
(a,b,c,e,f,g)
\]

with faithful \(U(1)^2\) charges

\[
(1,0),(1,0),(0,-1),(-1,0),(-1,0),(0,1).
\]

The complete renormalizable invariant enumeration contains

\[
\boxed{7\text{ quadratic and }76\text{ quartic phase-sensitive classes}}
\]

up to Hermitian conjugation, and no phase-sensitive linear or cubic class.
The seven quadratic phase vectors already have rank four, exactly the number
of phases left after quotienting the two gauge phases. Their exponent lattice
is saturated. A generic allowed potential therefore has no accidental
continuous rephasing symmetry beyond gauge and forces no physical Goldstone.

An explicit bounded-below witness has a stable vacuum with all six VEVs
nonzero:

\[
\begin{split}
V={}&\sum_{x=a,b,c,e,f,g}(|x|^2-1)^2
 +|a-b|^2+|e-f|^2\\
 &+|ae-1|^2+|cg-1|^2.
\end{split}
\]

At \(a=b=c=e=f=g=1\), the real constraint Jacobian has rank ten. The
Hessian has exactly two zero modes, both tangent to the gauge orbit, and is
positive definite on the ten-dimensional gauge quotient. With the neutral
edge coefficient set to one, the induced sixteen-state Dirac matrix is the
unit-weight matrix of claim 1539 and has determinant one.

Consequently an open stable region—not merely a tuned point—has every
required VEV nonzero, completely Higgses the faithful two-torus, and gives a
full-rank \(D_{16}\).

Identifying the repeated-charge fields, \(a=b=X_+\) and \(e=f=X_-\), is also
consistent. It reduces the scalar sector to four complex fields and retains
a stable all-nonzero full-rank vacuum. But it does not identify the edge
Yukawa maps: independent Yukawa coefficients can still reproduce arbitrary
edge masses from the shared VEVs. If the Yukawas are tied as well, two mass
equalities are imposed. Full rank survives, but that is an additional
unsourced alignment, not a derivation of the common Schur/RG ray.

## 1. Complete invariant enumeration

For holomorphic and antiholomorphic exponent vectors
\(r,s\in\mathbb Z_{\ge0}^6\), a monomial is

\[
M_{r,s}=\prod_i\phi_i^{r_i}(\phi_i^*)^{s_i}.
\]

It is retained when

\[
\sum_i(r_i-s_i)q_i=0,
\qquad |r|+|s|\le4,
\]

and is phase-sensitive when \(r-s\ne0\). The catalog exhausts all such
nonnegative exponent vectors and retains one lexicographic representative
from each conjugate pair \((r,s)\leftrightarrow(s,r)\).

The counts are

| degree | phase-sensitive classes |
|---:|---:|
| 1 | 0 |
| 2 | 7 |
| 3 | 0 |
| 4 | 76 |

The seven quadratic representatives may be written

\[
a^*b,\quad e^*f,\quad ae,\quad af,\quad be,\quad bf,\quad cg,
\]

plus their conjugates. Phase-insensitive terms contribute the usual six
quadratic moduli and 21 quartic products \(|\phi_i|^2|\phi_j|^2\). Thus the
most general real renormalizable potential is a constant plus those 27 real
modulus classes and twice the real part of independent complex coefficients
multiplying the 83 cataloged phase-sensitive representatives.

All link fields are relation-even, so relation parity removes none of these
gauge invariants. The neutral \(SP-TP\) edge coefficient is held as a bare
invariant parameter. Promoting it to another complex scalar would add
neutral-field cubic and quartic operators and is outside this six-field
enumeration.

## 2. Gauge phases and accidental symmetry

Six nonzero complex VEVs carry six phases. The faithful gauge group removes
two. Four phase directions are physical before adding phase-sensitive
couplings.

A saturated rank-four subset of the quadratic exponent vectors is

\[
\begin{array}{rrrrrr}
-1&1&0&0&0&0\\
0&0&0&-1&1&0\\
1&0&0&1&0&0\\
0&0&1&0&0&1.
\end{array}
\]

Its Smith factors are \((1,1,1,1)\). Its continuous nullspace is precisely
the two gauge-phase directions. Therefore the general potential has no
forced global \(U(1)\) and no unavoidable physical Goldstone. Special
coefficient choices can restore accidental symmetries, but those occupy
proper lower-dimensional loci.

## 3. Stable all-link vacuum

The displayed witness potential is a sum of nonnegative gauge-invariant
renormalizable squares. Its zero locus imposes

\[
|a|=|b|=|c|=|e|=|f|=|g|=1,
\quad a=b,\quad e=f,\quad ae=1,\quad cg=1.
\]

Modulo gauge this is an isolated vacuum. Linearizing the real constraints at
the all-one representative gives rank ten in twelve real dimensions. Hence
the Hessian kernel has dimension two and equals the gauge tangent space; all
physical scalar masses are positive.

This proves more than existence at one coefficient choice. Nondegeneracy on
the gauge quotient implies, by ordinary stability of a strict local minimum,
that sufficiently small perturbations retain a nearby stable vacuum. Since
all six VEVs and \(\det D_{16}=1\) are nonzero at the witness, continuity
preserves both properties on a sufficiently small open neighborhood.

## 4. Minimal repeated-charge identification

The smallest charge-faithful field content identifies

\[
a=b=X_+,
\qquad e=f=X_-,
\]

and keeps \(c,g\). Its phase-sensitive count becomes 2 quadratic and 12
quartic classes. A stable witness is

\[
V_{\rm id}=\sum_{x=X_+,X_-,c,g}(|x|^2-1)^2
+|X_+X_--1|^2+|cg-1|^2.
\]

Its eight-real-dimensional Hessian has only the two gauge zero modes. At the
all-one vacuum, assigning unit Yukawa coefficients to all six edge maps still
reproduces the determinant-one \(D_{16}\).

Field identification alone does not force edge-coefficient identification:

\[
m_a=y_a\langle X_+\rangle,
\quad m_b=y_b\langle X_+\rangle,
\quad m_e=y_e\langle X_-\rangle,
\quad m_f=y_f\langle X_-\rangle.
\]

Independent \(y_a,y_b,y_e,y_f\) leave all four masses independent. Thus the
minimal scalar economy neither overconstrains the Yukawa data nor derives a
common ray. Tying the Yukawas too would force \(m_a=m_b\) and \(m_e=m_f\) at
this vacuum. Those equalities do not destroy full rank—the all-unit witness
already obeys them—but they are new Ward/alignment assumptions and may
overconstrain a desired independent physical texture.

## 5. Physical boundary

This is an exact existence and exhaustion result for the central label
charges. It does not show that the spectral action generates the required
coefficient region, that the link fields form sourced Pati--Salam scalar
multiplets, or that radiative flow preserves the chosen vacuum and Yukawa
relations.

Nor does a full-rank \(D_{16}\) prove the N--Z--X Schur identity for the
physical operator. Eliminating the repair sectors can induce effective
entries, and neither the distinct-field nor identified-field potential
provides the missing descent map.

## Verdict

The link-potential problem is formally soluble at label level: the complete
renormalizable invariant ring contains enough phase locking to avoid forced
Goldstones, and an open stable all-nonzero vacuum overlaps the open
full-rank-Dirac locus. Scalar economy by charge identification is also
possible.

What remains missing is not another label-level vacuum. It is the physical
origin of the scalar multiplets, their potential and Yukawa maps, plus a Ward
or correspondence principle that would make any common-ray relation more
than an optional coupling identification.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_six_link_renormalizable_potential_vacuum_audit.mjs
node verification/verify/verify_spin23_six_character_sixteen_state_gauge_higgs_mass_audit.mjs
~~~
