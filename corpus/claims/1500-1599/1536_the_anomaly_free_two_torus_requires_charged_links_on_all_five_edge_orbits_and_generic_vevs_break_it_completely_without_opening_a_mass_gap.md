# The Anomaly-Free Two-Torus Requires Charged Links on All Five Edge Orbits, and Generic VEVs Break It Completely Without Opening a Mass Gap

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exact state-charge, link-charge and residual-group audit on the claim-1529 twelve-state support, restricted to the maximal anomaly-free \(U(1)^2\) of claim 1532

**Depends on:** [the six-character completion](1529_the_six_character_completion_is_an_exact_real_even_label_geometry_but_not_a_physical_pati_salam_completion.md) and [its maximal anomaly-free central subalgebra](1532_the_six_character_center_has_five_effective_directions_but_only_a_maximal_two_dimensional_subalgebra_is_perturbatively_anomaly_free.md)

**Evidence:** [charge and Higgs-link ledger](../../../evidence/data/spin23-six-character-anomaly-free-higgs-link-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_six_character_anomaly_free_higgs_link_audit.mjs)

## Result

The anomaly-free \(U(1)^2\) does coexist with the exact finite support and
relation parity, but it does not make the required Dirac entries into bare
masses. Every one of the five required \(J\)-edge orbits is charged. Turning
on all five therefore requires charged link fields, charged spurions, or an
equivalent new Yukawa construction.

In the faithful primitive normalization, the five representative link
charges are

\[
(-1,0),\quad(0,-1),\quad(2,-1),\quad(1,0),\quad(0,1).
\]

They span a saturated rank-two charge lattice. Generic nonzero VEVs on all
five edge orbits consequently break the faithful \(U(1)^2\) completely:
there is neither a continuous nor a discrete residual gauge subgroup.

This still does not open a mass gap. The two state-graph components retain
chiral bipartition sizes \(4+2\) and \(2+4\). Any grading-odd Dirac operator
on this support has at least two zero modes per component, hence at least
four in the full real-completed space.

Therefore

\[
\boxed{
\begin{array}{rcl}
\text{anomaly-free subgauging plus charged links}&:&\mathrm{SAT},\\
\text{relation parity and edge support}&:&\mathrm{SAT},\\
\text{generic faithful residual gauge group}&:&1,\\
\text{mass gap on the exact support}&:&\mathrm{UNSAT},\\
\text{physical scalar/N--Z--X identification}&:&\mathrm{UNDERDETERMINED}.
\end{array}}
\]

The subgauging moves the obstruction into unsourced scalar/link data and
leaves the older support-imbalance obstruction intact.

## 1. Faithful normalization of the anomaly-free torus

Claim 1532 exhibited the unimodular Lie-algebra basis

\[
w_1=(0,1,0,0,-1,0),\qquad
w_2=(-1,-1,1,1,1,1)
\]

in character order \((P,I,N,S,T,U)\). All state charges under \(w_2\) are
even. This is not an accidental common divisor: the half-period obeys

\[
\exp(\pi i w_2)=(-1,-1,-1,-1,-1,-1),
\]

which is precisely the common diagonal already removed from the effective
gauge group. A primitive faithful cocharacter basis is therefore

\[
h_1=w_1,\qquad h_2=\frac12w_2\pmod{\mathfrak u(1)_{\rm diag}}.
\]

Using \((h_1,h_2)\) avoids mistaking the trivial diagonal kernel for a
physical residual \(\mathbb Z_2\).

## 2. Charges of all twelve states

For \(e_{ab}\), the charge is \(h_a-h_b\). The complete table is

\[
\begin{array}{c|rrrrrrrrrrrr}
&PN&NP&IN&NI&IP&PI&PS&SP&TP&PT&TU&UT\\ \hline
q_1&0&0&1&-1&1&-1&0&0&-1&1&-1&1\\
q_2&-1&1&-1&1&0&0&-1&1&1&-1&0&0
\end{array}
\]

Every \(J\)-partner has the opposite charge, as required.

## 3. Charges of all allowed edges

For an oriented link \(\phi_{u\leftarrow v}\), use

\[
q(\phi_{u\leftarrow v})=q(u)-q(v).
\]

The ten allowed oriented edges, paired into five \(J\)-orbits, are

\[
\begin{array}{c|c@{\qquad}c|c}
\text{representative}&q&J\text{-partner}&q\\ \hline
PN\leftarrow IN&(-1,0)&NP\leftarrow NI&(1,0)\\
IN\leftarrow IP&(0,-1)&NI\leftarrow PI&(0,1)\\
IP\leftarrow TP&(2,-1)&PI\leftarrow PT&(-2,1)\\
SP\leftarrow TP&(1,0)&PS\leftarrow PT&(-1,0)\\
TP\leftarrow TU&(0,1)&PT\leftarrow UT&(0,-1)
\end{array}
\]

No representative has zero charge. Hence none of the five orbit
coefficients can be a gauge-invariant bare constant while this \(U(1)^2\)
is unbroken. Each needs a link transforming with the displayed charge; the
partner uses its conjugate.

There are five required link entries but only three charge types up to
conjugation:

\[
(1,0),\qquad(0,1),\qquad(2,-1).
\]

Whether one scalar multiplet can feed several edge entries through distinct
Yukawa couplings is model data, not a consequence of the label geometry.

## 4. Link lattice and residual gauge group

The representative charge matrix has rank two. Its Smith invariant factors
are \((1,1)\): the rows contain primitive generators for both charge axes,
so their lattice is saturated in the faithful character lattice.

A gauge transformation stabilizing generic nonzero VEVs must satisfy

\[
e^{-i\alpha}=1,\qquad e^{-i\beta}=1.
\]

Thus the faithful stabilizer is trivial. In the nonprimitive \((w_1,w_2)\)
coordinates one instead sees a formal \(\mathbb Z_2\). It is generated by
\(\exp(\pi i w_2)\), acts trivially on every state, and is exactly the
diagonal kernel rather than a surviving physical discrete gauge symmetry.

## 5. What remains compatible

Bosonic link fields do not modify the perturbative chiral anomaly tensor,
so the anomaly cancellation of claim 1532 survives. Assigning the links
even relation parity also preserves the relation grading: every allowed
edge already joins states of equal relation parity. Nonzero VEVs can supply
all five permitted edge-orbit coefficients without introducing forbidden
finite-Dirac support.

The N--Z--X conclusion is weaker. Claim 1529 established coexistence only
as a coefficient-level Schur/texture projection. Nothing presently maps
the five charged label links to the physical entries of that matrix. Gauge
compatibility therefore does not supply the missing descent functor.

## 6. Why Higgsing cannot give a mass gap here

Each connected component is grading bipartite. One has four positive- and
two negative-chirality vertices; its \(J\)-partner has the reverse counts.
For either component, an odd Dirac operator has block form

\[
D=\begin{pmatrix}0&M\\M^*&0\end{pmatrix},
\qquad M\in\operatorname{Mat}_{4\times2}(\mathbb C).
\]

Its rank is at most four and its nullity at least two. Link VEVs change the
entries of \(M\), not its rectangular shape. The full twelve-state operator
therefore retains at least four zero modes for every vacuum on the exact
allowed support. Generic nonzero edge weights attain that bound but cannot
remove it.

## 7. Minimal reopening datum

A genuine completion must specify relation-even dynamical scalar or link
fields carrying the three primitive charge types, their independent edge
Yukawa maps, and a potential whose vacuum turns on the required entries.
That is enough to realize the charged finite support and fully Higgs the
label \(U(1)^2\), but not enough for a mass gap.

Removing the four protected zero modes additionally requires new
grading-odd support or multiplicity that repairs the \(4\)-versus-\(2\)
component imbalance. Connecting this construction to the N--Z--X ansatz
still requires the separate physical correspondence/descent map already
missing in claim 1529.

## Boundaries

**Scalar boundary:** the calculation derives required representations and
stabilizers; it does not derive a scalar potential or vacuum.

**Texture boundary:** N--Z--X compatibility remains coefficient-level and
does not identify physical fermions, Higgs fields or Yukawa couplings.

**Gauge boundary:** the residual-group statement is for the faithful
quotient of the central anomaly-free torus. Other global forms require a
specified lift.

**Mass boundary:** the zero-mode lower bound assumes exactly the twelve
states and ten allowed edges of claim 1529. Enlarging support or
multiplicities is new input.

## Verdict

The maximal anomaly-free subgauging is algebraically compatible with the
finite label rules, but every required mass edge becomes a Higgs/link edge.
Its generic vacuum completely Higgses the faithful two-torus while leaving
four protected fermion zero modes. It therefore relocates, rather than
solves, the physical-completion problem.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_six_character_anomaly_free_higgs_link_audit.mjs
node verification/verify/verify_spin23_six_character_gauge_kernel_unimodularity_anomalies.mjs
node verification/verify/verify_spin23_six_character_ordinary_correspondence_completion.mjs
~~~
