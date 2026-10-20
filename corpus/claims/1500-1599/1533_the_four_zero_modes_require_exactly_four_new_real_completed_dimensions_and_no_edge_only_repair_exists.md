# The Four Zero Modes Require Exactly Four New Real-Completed Dimensions, and No Edge-Only Repair Exists

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact edge, bounded-multiplicity and new-sector exhaustion inside the six-character model; formal minimum proved, physical Schur descent remains open

**Depends on:** [the explicit six-character geometry and its four zero modes](1529_the_six_character_completion_is_an_exact_real_even_label_geometry_but_not_a_physical_pati_salam_completion.md), [the six-character physical-lift bound](1526_the_graded_spectator_chain_has_no_sourced_pati_salam_bimodule_lift_and_an_ordinary_completion_requires_six_characters.md), and [the protected categorical chain](1523_one_intermediate_real_pair_is_the_minimal_categorical_repair_of_the_spectator_connector_no_go.md)

**Evidence:** [zero-mode repair ledger](../../../evidence/data/spin23-six-character-zero-mode-repair-exhaustion.json) and [deterministic exhaustion verifier](../../../verification/verify/verify_spin23_six_character_zero_mode_repair_exhaustion.mjs)

## Result

The four zero modes of claim 1529 cannot be lifted by another coefficient on
the same twelve sectors. The ten existing edges are already the complete set
compatible with first order, \(J\), KO-6 grading and relation parity.

The obstruction is a sharp Hall-capacity defect. On one relation sheet the
six-state component has bipartition

\[
\mathcal H_+=\{PN,IP,SP,TU\},
\qquad
\mathcal H_-=\{IN,TP\}.
\]

Thus every admissible odd Dirac operator maps four positive dimensions
through only two negative dimensions. Its kernel has dimension at least two;
the \(J\)-partner component doubles the lower bound to four.

There are exactly two minimum multiplicity repairs. In the component order
\((PN,IN,IP,TP,SP,TU)\), they are

\[
(1,1,1,3,1,1)
\]

and

\[
(1,2,1,2,1,1).
\]

After adding the equal \(J\)-partner multiplicities, either repair costs four
complex Hilbert dimensions. Both admit explicit full-rank matrix-valued edge
blocks and retain nondegenerate intersection forms.

If all original multiplicities must remain one, one new \(J\)-orbit is still
insufficient: it changes the sheet imbalance only from (4:2) to (4:3). Two
new orbits are necessary and sufficient. A determinant-one witness is

\[
SI/IS,
\qquad
NU/UN,
\]

with new edge orbits

\[
SP-SI\;/\;PS-IS,
\qquad
TU-NU\;/\;UT-UN.
\]

The expanded sixteen-state Dirac matrix has unit-weight determinant one.

Both repair classes leave the original five-state texture intact as a
principal projection and add no forbidden old-to-old primitive edge. Neither
proves that the full physical Schur complement retains the protected zero:
matrix-valued multiplicities introduce independent columns, while eliminating
new sectors can generate effective terms. The missing correspondence/descent
map therefore survives the rank repair.

The exact minimum is

\[
\boxed{\text{four additional real-completed complex dimensions}.}
\]

The least novel multiplicity realization is one further (IN/NI) copy and one
further (TP/PT) copy. Even if the former is assigned to another sourced
physical family, the latter is an additional unsourced sterile (Z/JZ) pair.

## 1. Why an extra edge cannot work

For sectors (e_{ab}) and (e_{cd}), the three exact support rules are

\[
\gamma_{ab}\gamma_{cd}=-1,
\qquad
\Gamma_{ab}\Gamma_{cd}=1,
\qquad
(a=c\ \hbox{or}\ b=d).
\]

Among all 66 unordered pairs of the twelve sectors, exactly ten satisfy all
three. Every one is already present in claim 1529. Therefore

\[
\boxed{\text{additional admissible old-sector edges}=0.}
\]

Changing their nonzero coefficients cannot change the structural rank. Each
relation-sheet component is bipartite with chiral dimensions (4) and (2), so
its rank is at most four. The full twelve-state rank is at most eight.

## 2. Multiplicity lower bound and classification

Write the multiplicities on one sheet as

\[
(m_{PN},m_{IN},m_{IP},m_{TP},m_{SP},m_{TU}).
\]

Reality gives the same multiplicities to the reversed sectors. An invertible
odd operator requires equal total chiral dimensions:

\[
m_{PN}+m_{IP}+m_{SP}+m_{TU}=m_{IN}+m_{TP}.
\]

Hall's condition adds the two leaf-capacity inequalities

\[
m_{PN}\leq m_{IN},
\qquad
m_{SP}+m_{TU}\leq m_{TP}.
\]

These three conditions are also sufficient for this tree support. Exhausting
all \(3^6=729\) patterns with each multiplicity in \((1,2,3)\) gives 15
invertible patterns. The least increase per sheet is two, hence four after
real completion. Exactly two patterns attain it:

| pattern | added content on full real completion | (\det\cap_6) |
|---|---|---:|
| \((1,1,1,3,1,1)\) | two further \(TP/PT\) copies | 1 |
| \((1,2,1,2,1,1)\) | one \(IN/NI\) plus one \(TP/PT\) copy | 4 |

For the first pattern, a full-rank chiral block can use (PN-IN) for one
column and three independent (IP,SP,TU)-to-(TP) columns. For the second,
\((PN,IP)\) span the doubled \(IN\) target while \((SP,TU)\) span the doubled
\(TP\) target. The verifier gives explicit determinant-one block matrices in
both cases and retains every original edge type.

This is formal SAT, not a free physical repair. The second pattern is the
least exotic because an additional (IN/NI) carrier might be identified with
a sourced family copy. It nevertheless requires a second, unsourced
(TP/PT) orbit and independent matrix columns. Their common Schur ray is not
forced.

## 3. New-sector lower bound at multiplicity one

A new off-diagonal \(J\)-orbit contributes one state to each relation sheet,
with opposite KO-6 signs. Orient it so that the positive relation sheet gains
one negative-chirality state. Then its imbalance becomes

\[
4-3=1.
\]

So one orbit cannot give an invertible odd operator. At least two are needed.

There are nine unused off-diagonal sector orbits among the same six
characters and eighteen choices of orientation. The verifier checks all 144
ways to choose two distinct oriented orbits:

| test | survivors |
|---|---:|
| oriented two-orbit choices | 144 |
| positive-sheet graph has a perfect matching | 79 |
| also has nondegenerate intersection form | 51 |

One particularly sparse witness adds

\[
SI_{-},\ IS_{+},\ NU_{-},\ UN_{+},
\]

with relation signs \((+,-,+,-)\), respectively. The only newly allowed edge
orbits are

\[
SP-SI\;/\;PS-IS
\]

and

\[
TU-NU\;/\;UT-UN.
\]

On the positive relation sheet the perfect matching is

\[
PN-IN,
\quad IP-TP,
\quad SP-SI,
\quad TU-NU.
\]

The full sixteen-state unit-weight Dirac determinant and the new intersection
determinant are both one. This proves sufficiency at the lower bound.

## 4. Texture and forbidden-support audit

The protected coefficient matrix remains

\[
M_5=
\begin{pmatrix}
A&x&y&0&0\\
x&D&0&0&0\\
y&0&0&g&0\\
0&0&g&0&h\\
0&0&0&h&0
\end{pmatrix},
\]

with

\[
\operatorname{cof}_{PP}(M_5)=0,
\qquad
\det M_5=Dy^2h^2.
\]

Neither minimum repair adds an edge between two previously existing sector
types:

- multiplicity repair changes edge ranks but not their support;
- the new-sector witness adds only edges with a new endpoint.

Thus no forbidden primitive old-to-old edge appears, and restricting to the
declared five-state coefficient projection preserves the texture exactly.

That projection statement is not a full Schur theorem. In the multiplicity
branch, generic full-rank matrices supply independent coupling columns and
can violate aggregate rank one. In the sector branch, integrating out the
new states can induce effective terms. Proving that neither happens requires
the same physical correspondence/descent law isolated by claim 1529.

## 5. Physical cost

Every minimum contains four new complex Hilbert dimensions after \(J\)
completion. The cheapest multiplicity pattern adds

\[
(IN/NI)_{\rm extra}
\oplus
(TP/PT)_{\rm extra}.
\]

The first pair can only conditionally borrow another sourced family carrier;
the relation-to-physical family action is not established. The second pair is
unavoidably a second sterile (Z/JZ) orbit, absent from the sourced
Pati--Salam spectrum.

The multiplicity-one alternative adds two wholly new correspondence orbits.
It is algebraically clean but physically more novel. Consequently no
minimum is a sourced Pati--Salam repair.

## Verdict

The zero-mode problem is exhausted within the declared six-character class:

\[
\boxed{
\begin{array}{rcl}
\text{new coefficient on old sectors}&:&\mathrm{UNSAT},\\
\text{matrix multiplicity repair}&:&\mathrm{SAT},\ +4\text{ dimensions},\\
\text{multiplicity-one sector repair}&:&\mathrm{SAT},\ 2\ J\text{-orbits},\\
\text{sourced physical repair}&:&\mathrm{UNSAT}.
\end{array}}
\]

The exact least new datum is one further sterile (TP/PT) pair plus one unit
of matrix rank, realized minimally by also duplicating (IN/NI). This removes
the formal kernel but does not derive the protected physical Schur law. The
programme has therefore traded a four-zero-mode obstruction for one sharply
specified matrix-correspondence datum, not completed the physical embedding.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_six_character_zero_mode_repair_exhaustion.mjs
node verification/verify/verify_spin23_six_character_ordinary_correspondence_completion.mjs
node verification/verify/verify_spin23_pati_salam_graded_chain_physical_lift.mjs
node verification/verify/verify_spin23_spectator_connector_minimal_repair_exhaustion.mjs
~~~
