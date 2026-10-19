# A cycle graph selects a refinement-stable real two-mode plane but not its orientation

**Date:** 20 October 2026

**Status:** exact result for the scaled cycle family; conditional bridge to the response carrier

**Evidence:** [machine-readable protocol](../../../evidence/data/graph-two-mode-spin23-exhaustion.json)

**Certificate:** [verifier](../../../verification/verify/verify_graph_two_mode_spin23_exhaustion.mjs)

## Result

The scaled cycle graph supplies an intrinsic two-dimensional real configuration sector without inserting (Spin(2,3)) into the selection rule. For (C_n), let

\[
L_h=\frac{1}{h^2}L,\qquad h=\frac{2\pi}{n}.
\]

The lowest nonzero eigenspace is the real first-harmonic plane spanned by the sampled sine and cosine modes. Its multiplicity is two, so its canonical phase space has dimension four. The selector is spectral: it depends only on the graph Laplacian and its isolated eigenvalue, not on a fitted target group.

This resolves the **carrier-plane** part of the graph-to-(Spin(2,3)) problem for the cycle family. It does not resolve an orientation within that plane. The eigenspace is invariant, while any ordered sine/cosine basis remains related to any other by (O(2)). A handed basis, addressed channel or phase origin therefore still requires additional structure.

## Refinement certificate

For the (k)-th harmonic,

\[
\lambda_k(n)=\frac{4\sin^2(\pi k/n)}{(2\pi/n)^2}.
\]

Along (n=8,16,32,64,128), the executable certificate verifies

\[
\lambda_1(n)\longrightarrow 1,
\qquad
\lambda_2(n)-\lambda_1(n)\longrightarrow 3,
\]

with a positive isolation gap at every tested refinement. Thus the first-harmonic **projector** is stable under this refinement family. The conclusion is intentionally narrower than universality: arbitrary graph refinement, disorder and topology change remain outside the certificate.

## Response supplied by the quadratic graph action

For a real graph field with

\[
S[q]=\frac12 q^T(m^2I+L_h)q,
\]

projection to the first-harmonic plane gives

\[
R_0=(m^2+\lambda_1)I_2\in H_2(\mathbb R)^+.
\]

This is a derived positive real two-channel Hessian. It is isotropic, however, and therefore occupies only a one-parameter ray of the three-dimensional positive cone. It establishes the correct real carrier but not the full response geometry or its full dynamical symmetry.

## Boundary of the claim

The action above is a graph-field quadratic form. It is not a derivation from the full Chamseddine--Connes trace spectral action, and the result does not promote the cycle graph to spacetime. It closes one precise selector gap: an intrinsic, refinement-stable, real two-mode plane exists in a declared graph model. Orientation, complete generator access and physical interpretation must be tested separately.
