# The Dirichlet Cut Action Selects the Anchor on H12, and One Marked Orbit Restores Uniqueness on H16

**Date:** 20 October 2026

**Gates:** A2, A5 and A6

**Status:** exhaustive positive-action audit over every rank-four diagonal (J)-invariant two-orbit projection in the explicit twelve- and sixteen-state sector models

**Depends on:** [the projection-lattice audit](1548_the_selected_anchor_projection_exists_as_a_nonminimal_sector_sum_but_is_not_sourced_or_central_in_the_path_algebra.md), [the selected-return canonicity result](1543_the_diagonal_expectation_is_canonical_but_the_selected_PI_return_corner_is_new_marked_projector_data.md), and [the explicit six-character representation](1529_the_six_character_completion_is_an_exact_real_even_label_geometry_but_not_a_physical_pati_salam_completion.md)

**Evidence:** [positive-action enumeration](../../../evidence/data/spin23-anchor-projector-positive-action-selection.json) and [deterministic verifier](../../../verification/verify/verify_spin23_anchor_projector_positive_action_selection.mjs)

## Result

There is a small but genuine dynamical result hidden inside the projection
lattice of claim 1548.  Give every primitive quotient edge unit norm and vary
over rank-four diagonal projections made from two complete (J)-orbits.  Then

\[
S_{\rm cut}(Q)=\frac14\operatorname{Tr}([D,Q]^*[D,Q])
\]

is exactly the number of quotient edges crossing the selected two-vertex
set.

On the twelve-state model the quotient support is the tree

\[
A-B-C-E-F,
\qquad D-E,
\]

where

\[
A=PN/NP,quad B=IN/NI,quad C=IP/PI,quad
D=SP/PS,quad E=TP/PT,quad F=TU/UT.
\]

Among all \(\binom62=15\) choices, the desired lift

\[
Q_{\rm anc}=A+B
\]

is the **unique** cut minimizer.  It is the only two-orbit subset separated
from the rest by one edge.

The sixteen-state new-sector repair adds terminal branches

\[
D-G,\qquad F-H,
\]

with \(G=SI/IS\) and \(H=NU/UN\).  Among its \(\binom82=28\) choices the same
action has three minimizers,

\[
AB,\qquad DG,\qquad FH.
\]

Thus the unmarked action selects the anchor on \(H_{12}\), but not on the
minimal invertible \(H_{16}\) sector repair.

One rank-two marked orbit is sufficient to restore uniqueness.  Let \(P_B\)
project onto \(B=IN/NI\), the orbit already identified with the selected
cofactor's physical \(P\) role in the claim-1548 descent dictionary, and put

\[
S_\mu(Q)=S_{\rm cut}(Q)
+\mu\left(1-\frac12\operatorname{Tr}(P_BQ)\right),
\qquad \mu>0.
\]

For every positive \(\mu\), \(AB\) is the unique minimizer on both models.
This term marks only \(B\); it does not name \(A\).  The unique cheapest
partner is selected by the support graph.  Equivalently, imposing the hard
condition \(B\leq Q\) leaves five candidates on \(H_{12}\) and seven on
\(H_{16}\), and the cut action uniquely chooses \(AB\).

The result is therefore

\[
\boxed{
\begin{array}{ll}
H_{12}:&\text{intrinsic unit-cut selection is SAT},\\
H_{16}:&\text{intrinsic unit-cut selection is UNSAT (threefold tie)},\\
H_{16}+\text{one marked orbit}:&\text{selection is SAT for every }\mu>0.
\end{array}}
\]

The qualification is essential.  The mark uses an already declared physical
descent dictionary.  If that dictionary is not granted, \(P_B\) is new
correspondence data.  The action derives the partner \(A\), not the physical
meaning of \(B\).

## 1. Exact enumeration

For a selected quotient pair \(X\), every crossed quotient edge represents
two \(J\)-related state edges.  Each undirected state edge contributes twice
to the Hilbert--Schmidt commutator norm, so

\[
\operatorname{Tr}([D,Q_X]^*[D,Q_X])=4|\partial X|.
\]

The exhaustive cut histograms are

\[
\begin{array}{c|ccccc}
|\partial X|&1&2&3&4&5\\ \hline
H_{12}&1&6&6&1&1\\
H_{16}&3&4&12&8&1.
\end{array}
\]

They account for all 15 and 28 candidates respectively.  On \(H_{12}\) the
single boundary-one pair is \(AB\).  On \(H_{16}\) the three boundary-one
pairs are precisely the three terminal branches \(AB,DG,FH\).

## 2. Why the other minimal positive actions do not select the anchor

Graph distance only asks that the two chosen orbits be adjacent.  Its minima
are all five edges on \(H_{12}\) and all seven edges on \(H_{16}\).  It cannot
choose one branch.

The diagonal volume functional \(\operatorname{Tr}(QD^2)\), equivalently the
sum of selected vertex degrees up to normalization, does worse.  Its minima
are the disconnected leaf pairs

\[
AD,AF,DF
\]

on \(H_{12}\), and

\[
AG,AH,GH
\]

on \(H_{16}\).

Every candidate is diagonal in the joint occupied-sector basis.  Hence all
of the following positive commutator tests vanish identically for every
candidate:

\[
\|[Q,\pi(a)]\|_2^2,quad
\|[Q,\pi^o(a)]\|_2^2,quad
\|[Q,\gamma]\|_2^2,quad
\|[Q,\Gamma_{\rm rel}]\|_2^2.
\]

The represented algebra, opposite algebra, KO grading and relation parity
therefore certify admissibility but supply no selection pressure.

## 3. What is and is not canonical

The unit-edge convention is the smallest isotropic action on the declared
primitive support.  Positivity by itself is not enough.  With primitive edge
coefficients \(w_e\), the three terminal branch actions are

\[
S(AB)=|w_{BC}|^2,\qquad
S(DG)=|w_{DE}|^2,\qquad
S(FH)=|w_{EF}|^2.
\]

Unequal positive weights can make any of the three branches win.  Nor can a
penalty that only marks \(B\) universally repair arbitrary weights: it is
constant over all candidates containing \(B\), so sufficiently distorted
weights can make another \(B\)-containing pair cheaper than \(AB\).

Consequently the strongest result is conditional but sharp:

1. the minimally normalized, unweighted Dirichlet action really does derive
   \(Q_{\rm anc}\) on the sourced twelve-state graph;
2. the new-sector invertibility repair introduces exactly two degenerate
   terminal competitors;
3. one already motivated rank-two orbit mark removes that degeneracy without
   encoding the desired second orbit; and
4. a fully canonical result still requires a sourced reason for equal edge
   normalization and for the physical identification of \(B\).

The added functional creates no new primitive Dirac support.  It evaluates
the existing support and a diagonal projector only.  It therefore preserves
the no-forbidden-primitive-edge result of claim 1548.

## Boundary

The enumeration is exhaustive for diagonal rank-four \(J\)-invariant
two-orbit projections in the explicit twelve-state and sixteen-state
new-sector models.  It does not classify the continuous Grassmannian of
non-diagonal rank-four projections, and it does not derive equality of
primitive edge norms from the spectral action.  Those are the two exact
reopening directions.
