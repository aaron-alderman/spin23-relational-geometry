# Within the Bounded Signed-Mass Graph, One Intermediate Real Pair Is the Minimal Categorical Repair

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact classification within the declared bounded signed-mass-graph repair class; physical Pati--Salam finite-algebra embedding remains underdetermined

**Depends on:** [the primitive spectator-connector no-go](1522_the_unique_charged_matter_free_spectator_is_a_Delta_coupled_singlet_but_any_primitive_null_connector_destroys_the_texture.md), [the physical carrier search](1517_the_sourced_pati_salam_skeleton_has_four_relational_lifts_but_physical_SAT_is_underdetermined_by_two_rows.md), [the relation-sheet tensor theorem](1506_arbitrary_physical_multiplicity_preserves_relation_sheet_parity_and_generalized_fluctuations_cannot_create_odd_leakage.md), and [complete Schur composition](1515_complete_Schur_composition_is_associative_but_matrix_lowering_forgets_primitive_versus_composite_provenance.md)

**Evidence:** [minimal-repair ledger](../../../evidence/data/spin23-spectator-connector-minimal-repair-exhaustion.json) and [executable exhaustion verifier](../../../verification/verify/verify_spin23_spectator_connector_minimal_repair_exhaustion.mjs)

## Result

Within the declared signed-mass-graph repair class, the spectator-connector
obstruction of claim 1522 has one minimal categorical repair, but none of the
three naive repairs works as stated.

- A junk-trivial connector cannot connect the finite metric because junk
  removes represented differential forms, not a nonzero bare finite-(D)
  entry.
- A zero-vacuum or kinetic-only connector preserves the cofactor only by
  removing the edge from the physical vacuum Dirac operator, so the same
  operator is no longer metrically connected.
- A direct rank-one Schur block restores the cofactor algebraically, but its
  two required diagonal terms cross the relation sheets and violate the
  protecting parity.

The smallest surviving repair adds one intermediate real pair (Z/JZ) and
replaces the direct connector at the symmetric Weyl-coefficient level by

\[
\boxed{N\longleftrightarrow Z\longleftrightarrow X}
\]

together with its (J)-partner. On the doubled Hilbert space a symmetric
coefficient (u-v) is represented by the edges (u-Jv) and (v-Ju). Assign
equal KO-6 chirality and alternating relation parity to the Weyl roles
(N,Z,X). Both primitive doubled-Hilbert edges are then Dirac-odd and
relation-even.

On the heavy basis \((P,I,N,Z,X)\), take

\[
M_5=
\begin{pmatrix}
a&x&y&0&0\\
x&d&0&0&0\\
y&0&0&g&0\\
0&0&g&0&h\\
0&0&0&h&0
\end{pmatrix}.
\]

The complementary (N-Z-X) chain has the exact null vector

\[
(h,0,-g)^T,
\]

so the selected cofactor remains zero. Yet

\[
\boxed{\det M_5=d y^2 h^2}
\]

is nonzero for the required \(d,y,h\ne0\). Thus the complete heavy matrix has
no exact zero mode, while \(g,h\ne0\) make the finite graph genuinely
connected. Invertibility alone does not supply a quantitative lower bound on
its smallest nonzero mass.

The lower bound is exact within this repair class: zero intermediate pairs is
the direct no-go of claim 1522, while one intermediate pair supplies the
witness. The minimal repair therefore costs one additional \(J\)-pair and
one additional primitive connector edge orbit.

## 1. Why junk cannot do both jobs

Finite-metric connectedness is determined by the support of the finite Dirac
operator. If the connector matrix element is nonzero in (D_F), quotienting
a represented two-form as junk does not remove that fermion mass entry. The
cofactor remains

\[
-d m^2.
\]

If instead the proposed connector exists only as a junk-trivial form while
the corresponding (D_F) entry is zero, it does not connect the finite
metric. The two desired statements would refer to different objects.

Therefore

\[
\boxed{
\text{junk-trivial physical connector}
\;\not\Rightarrow\;
\text{connected finite metric plus zero cofactor}.}
\]

## 2. Why zero vacuum is not actual connectedness

Let a scalar connector have vacuum value \(m(v)\). The cofactor obstruction
is

\[
\operatorname{cof}_{PP}=-d m(v)^2.
\]

Choosing (m(v)=0) restores the cofactor, but the vacuum Dirac operator then
has no (N-X) edge. A kinetic term for the scalar does not change this: it
propagates a field but does not supply finite spectral distance when its
finite-(D) support or vacuum entry is absent.

This repair is viable only under a weaker convention in which connectedness
is demanded of a reference (D_F) but not of the physical vacuum operator.
The present test requires the same physical operator to satisfy both, so the
zero-vacuum branch is UNSAT.

## 3. The smallest direct Schur packet and its parity failure

Allow the (N-X) block

\[
B_{NX}=
\begin{pmatrix}e&m\\m&M_X\end{pmatrix}.
\]

Then the selected cofactor is

\[
d\det B_{NX}=d(eM_X-m^2).
\]

A rank-one Schur packet

\[
(e,m,M_X)=\lambda(p^2,pq,q^2)
\]

does restore the cofactor exactly. At matrix level this is the cheapest
correlation repair: one additional (N-N) coefficient tied to the connector
and spectator self coefficient.

But in the direct Row-B relation assignment:

- (N-X) is within-sheet and relation-even;
- (N-JN) crosses sheets and is relation-odd;
- (X-JX) crosses sheets and is relation-odd.

The complete rank-one matrix packet therefore contains two operators that
break (Gamma_{\rm rel}). Treating them as correlated does not make their
sum commute with the grading. The direct Schur repair is algebraically SAT
but parity UNSAT.

## 4. Minimal subdivision of the connector

Replace the one-edge coefficient by a two-edge coefficient path. Choose

\[
\gamma(N)=-1,
\qquad
\gamma(Z)=-1,
\qquad
\gamma(X)=-1,
\]

and use the opposite signs on the (J)-partners. Give the Weyl roles relation
parities

\[
\Gamma_{\rm rel}(N)=-1,
\qquad
\Gamma_{\rm rel}(Z)=+1,
\qquad
\Gamma_{\rm rel}(X)=-1,
\]

again reversing them under (J).

The actual doubled-Hilbert edges are

\[
N-JZ,
\qquad Z-JX,
\qquad JN-Z,
\qquad JZ-X.
\]

Then every new edge obeys

\[
\gamma_u\gamma_{Jv}=-1,
\qquad
\Gamma_{{\rm rel},u}\Gamma_{{\rm rel},Jv}=+1.
\]

This requires exchanging \(X/JX\) between the two spectator character slots
relative to the direct-edge four-character witness. The abstract Weyl-role
assignment \(\gamma(X)=-1\) is retained, but \(X\) now occupies the slot that
previously carried \(JX\). Hence the KO-6 sign attached to that character
slot is reversed. At the four-character level this multiplies the spectator
row and column of the intersection form by \(-1\), a congruence whose
determinant remains one.

The new (Z/JZ) pair still requires its own physical bimodule realization;
the claim is a categorical signed-graph witness, not yet a full spectral
triple.

## 5. Cofactor and invertibility proof

Deleting the selected (P) row and column gives

\[
B=
\begin{pmatrix}
d&0&0&0\\
0&0&g&0\\
0&g&0&h\\
0&0&h&0
\end{pmatrix}.
\]

The vector

\[
v_0=(0,h,0,-g)^T
\]

satisfies

\[
Bv_0=0.
\]

Hence

\[
\operatorname{cof}_{PP}(M_5)=\det B=0.
\]

Direct expansion of the full matrix gives

\[
\det M_5=d y^2 h^2.
\]

The important division of labour is now explicit:

- (g\ne0) and (h\ne0) connect (N,Z,X);
- the odd-length complementary carrier retains one null direction;
- (y\ne0) joins that null direction to (P) and makes the full heavy matrix
  invertible;
- (d\ne0) retains the complementary image mass.

Thus connectedness and the cofactor zero no longer compete.

## 6. Extra-state and term lower bound

With no intermediate state, a nonzero connector gives

\[
\operatorname{cof}_{PP}=-dm^2\ne0.
\]

Therefore zero extra (J)-pairs is impossible under the declared nonzero
conditions.

One intermediate (J)-pair gives the displayed witness. Relative to the
single direct edge, the minimal repair uses:

- one additional physical/categorical role pair (Z/JZ);
- two primitive connector edge orbits in place of one;
- one additional independent connector coefficient;
- no (N), (Z), or (X) self terms.

The lower bound is consequently

\[
\boxed{
\text{one extra }J\text{-pair and one extra primitive edge orbit}.}
\]

The structural zeros are not arbitrary numerical cancellations in the signed
graph. Self terms cross the real/relation grading or violate its bipartite
support and are excluded at this categorical level.

## 7. Gauge interpretation and remaining admission gate

At gauge-EFT level both \(X\) and \(Z\) can be sterile Pati--Salam singlets.
The \(N-Z\) edge uses the sourced \(\Delta\) channel classified in claim 1522;
the \(Z-X\) edge is a singlet connector. No charged multiplet is added, and
the nonzero determinant proves only that there is no exact extra massless
neutral mode.

The unreduced Pati--Salam finite algebra still has no isolated
one-dimensional complex module. The repair therefore does not evade the
physical algebra obstruction by notation. It supplies the smallest
**categorical** object that a correspondence, normalizer or generalized
module must realize.

The remaining finite task is to construct (Z/JZ) and the two connector
arrows as represented correspondences, then recompute:

- orientability including the new pair;
- the physical intersection form rather than only its four-character block;
- the junk quotient;
- the gauge-map kernel and anomalies;
- the scalar potential enforcing the zero diagonal pattern.

## Verdict

The minimal repair exhaustion returns

\[
\boxed{
\begin{array}{rcl}
\text{junk-trivial connector}&:&\mathrm{UNSAT},\\
\text{zero-vacuum connector}&:&\mathrm{UNSAT},\\
\text{direct rank-one Schur packet + parity}&:&\mathrm{UNSAT},\\
N-Z-X\text{ graded chain}&:&\mathrm{SAT\ at\ categorical\ level}.
\end{array}}
\]

One extra real pair is both necessary and sufficient within the bounded
signed-mass-graph repair class. Physical Pati--Salam admission remains
underdetermined by the missing correspondence functor, not by the cofactor or
connectedness constraints.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_spectator_connector_minimal_repair_exhaustion.mjs
node verification/verify/verify_spin23_pati_salam_spectator_connector_classification.mjs
node verification/verify/verify_spin23_physical_carrier_bounded_embedding_search.mjs
~~~
