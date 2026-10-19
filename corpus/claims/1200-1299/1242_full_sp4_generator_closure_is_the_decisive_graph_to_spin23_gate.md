# Full \(Sp(4,\mathbb R)\) generator closure is the decisive graph-to-\(Spin(2,3)\) gate

**Date:** 20 October 2026  
**Status:** exact finite closure certificate; physical two-mode selector and graph action remain open  
**Verifier:** `verification/verify/verify_graph_to_spin23_closure_gate.mjs`

## Result

The graph source packet reaches \(Spin(2,3)\) only conditionally. The finite certificate proves three exact facts:

1. an oriented graph incidence operator produces a Dirac operator whose square separates vertex and edge Laplacians;
2. a real positive two-channel response carries the Lorentz determinant of \(H_2(\mathbb R)^+\);
3. the general two-mode Hamiltonian block form has ten independent generators satisfying the \(\mathfrak{sp}(4,\mathbb R)\) condition.

It also records the decisive negative result: none of the 32 supplied papers derives the required real two-mode selection and its physical interpretation.

## Exact closure test

Given candidate graph-derived generators \(K_a\), compute

\[
\epsilon_a=\lVert K_a^TJ+JK_a\rVert,
\]

then iteratively add commutators \([K_a,K_b]\) until the linear span stabilizes. The outcomes are:

- **dimension 10, zero residual:** full \(\mathfrak{sp}(4,\mathbb R)\) closure;
- **dimension below 10:** a proper symplectic subgroup only;
- **nonzero residual:** dissipative or non-Hamiltonian dynamics requiring an open-system extension;
- **dimension above 10 after including noise/drift:** the fitted family is not a pure two-mode Hamiltonian symmetry.

The ten-dimensional reference basis is

\[
K(A,B,C)=
\begin{pmatrix}A&B\\C&-A^T\end{pmatrix},
\quad A\in M_2(\mathbb R),\quad B,C\in\operatorname{Sym}_2(\mathbb R).
\]

The executable certificate constructs all ten basis directions and verifies zero symplectic residual and full linear rank.

## Required graph experiment

For a concrete graph model:

1. declare the graph family, weights, boundary and refinement rule;
2. derive \(D_G\), its action and the physical observables rather than choosing a convenient adjacency matrix;
3. identify two boundary channels using a covariant criterion fixed before fitting;
4. estimate their full complex response and test whether a stable real slice exists;
5. reconstruct the accessible linear generators from perturbations;
6. run the ten-dimensional closure test;
7. repeat under graph refinement and disorder;
8. compare against unrestricted \(Sp(2n,\mathbb R)\), complex \(Spin(2,4)\), lower-dimensional subgroup and dissipative rivals.

## Promotion rule

Promote the graph-to-\(Spin(2,3)\) bridge only if all of the following hold:

- the two-mode sector is selected without using the target group;
- the response is positive and real within preregistered uncertainty;
- the generator closure is ten-dimensional and stable;
- the selection and closure survive refinement;
- an action or stress calculation assigns the carrier a physical role;
- competing real forms and larger symplectic groups lose on held-out observables.

## What the packet already contributes

The source atlas supplies credible implementations for each local step: operator relations, graph Dirac operators, spectral metrics/actions, causal continuum tests, graph symplectic currents and Gaussian canonical dynamics. That is enough to make the bridge executable.

It is not enough to make the bridge true. The missing object is a model-derived selector \(\Pi_2\) together with measured or calculated generator closure.

