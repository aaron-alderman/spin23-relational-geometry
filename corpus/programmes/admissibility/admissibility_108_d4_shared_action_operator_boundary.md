# A shared D4 action does not choose a localized operator

**Date:** 25 October 2026

**Status:** OT-046 sharpened; existing D4-shaped carriers fail operator identification and the source-native operator dependency remains open

**Topic:** OT-046

**Evidence:** [operator comparison](../../../evidence/data/d4-shared-action-operator-boundary-v1.json)

**Generator:** [D4 shared-action audit](../../../scripts/run-d4-shared-action-operator-boundary.mjs)

**Verifier:** [operator nonidentification certificate](../../../verification/admissibility/verify_d4_shared_action_operator_boundary.mjs)

## Result

The corpus contains three four-coordinate objects on which triality cyclically permutes three outer coordinates around one centre. That common action does not make them one operator.

- The D4 Cartan matrix is a positive intersection or root form. Its spectrum is \(2-\sqrt3,2,2,2+\sqrt3\), and its determinant is four.
- The D4 star Laplacian is a positive Markov or diffusion generator. Its spectrum is \(0,1,1,4\); its kernel is the conserved constant mode.
- The D4 star adjacency is a coherent hopping skeleton before diagonal terms are chosen. Its spectrum is \(-\sqrt3,0,0,\sqrt3\).

All three commute exactly with the same order-three outer permutation. All split into a two-dimensional fixed sector and a two-dimensional contrast sector. Yet their kernels, spectra and physical meanings disagree.

After restriction to the normalized fixed sector, the matrices are respectively

\[
\begin{pmatrix}2&-\sqrt3\\-\sqrt3&2\end{pmatrix},\qquad
\begin{pmatrix}3&-\sqrt3\\-\sqrt3&1\end{pmatrix},\qquad
\begin{pmatrix}0&\sqrt3\\\sqrt3&0\end{pmatrix}.
\]

The quotient chooses the fixed subspace. It does not choose which operator acts there.

## Why this does not yet localize anything

A localized topological mode requires more than a finite representation: it needs a spatial or geometric base, an operator family over a deformation parameter, boundary or asymptotic conditions, and an index or pole ledger stable under the allowed regulators. None of those data is supplied by the shared D4 action.

The dark contrast modes of the four-resonator bench are detector-hidden normal modes, not defect-localized states. The constant kernel of the Markov generator is conservation, not a quotient singularity index. The positive Cartan form records intersections, but does not by itself say which Hamiltonian, Dirac or Fredholm operator uses them.

This is precisely the corpus relation “shares action, not carrier”: the same permutation grammar survives while carrier and operator semantics do not.

## Open and closed

**Closed here**

- the existing root, Markov and resonator objects cannot be identified merely from their common D4 triality action;
- quotienting each object gives different descended operators;
- neither dark modes nor the Markov zero mode closes OT-046's localization criterion;
- another four-by-four spectral calculation without operator provenance cannot advance the branch.

**Still open**

- choose one source-native family \(D(\lambda)\) on a declared spatial or geometric domain;
- derive its boundary or asymptotic conditions rather than fitting them after the spectrum is seen;
- construct the pre- and post-quotient maps on the same carrier;
- prove a regulator-stable index change or localized pole with a detector-facing residue.

## Implication

The D4 frontier is not asking for a prettier quotient spectrum. It is asking what physical thing the quotient acts on and why that action governs a state localized near the deformation. Until those nouns are supplied, the four-mode bench remains valuable quotient engineering and hidden-mode metrology, while the singularity reading remains a mathematical neighbour. A successful next step would improve defect-device design even if the spectrum is conventional; only a source-native unexplained residue could reopen the new-physics reading.

## Reproduction

~~~powershell
node scripts/run-d4-shared-action-operator-boundary.mjs --write
node verification/admissibility/verify_d4_shared_action_operator_boundary.mjs
~~~
