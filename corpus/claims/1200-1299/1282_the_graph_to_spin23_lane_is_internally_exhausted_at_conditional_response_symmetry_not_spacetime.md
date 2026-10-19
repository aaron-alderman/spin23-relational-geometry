# The graph-to-\(Spin(2,3)\) lane is internally exhausted at conditional response symmetry, not spacetime

**Date:** 20 October 2026

**Role:** exhaustion verdict for the graph-to-geometry source packet

**Evidence:** [source atlas](../../../evidence/data/graph-to-spin23-source-atlas.json), [two-mode protocol](../../../evidence/data/graph-two-mode-spin23-exhaustion.json)

**Certificates:** [source and closure gate](../../../verification/verify/verify_graph_to_spin23_closure_gate.mjs), [selector, refinement and control closure](../../../verification/verify/verify_graph_two_mode_spin23_exhaustion.mjs)

## Verdict

The graph-to-(Spin(2,3)) lane has reached a finite internal boundary.

What is now established is a complete conditional chain:

\[
\text{cycle graph}
\longrightarrow
\text{isolated real first-harmonic plane}
\longrightarrow
H_2(\mathbb R)^+
\longrightarrow
\mathfrak{sp}(4,\mathbb R)
\cong
\mathfrak{so}(2,3),
\]

where the last arrow requires three independently addressed anisotropic edge controls. This is an exact finite construction of **response-level** (Spin_0(2,3)).

What is not established is that (Spin(2,3)) is the fundamental spacetime symmetry of the graph model. None of the 32 supplied papers makes that derivation, and the new certificate does not manufacture it.

## Closed internal questions

- **Intrinsic two-mode selector:** yes for the lowest nonzero eigenspace of the scaled cycle Laplacian.
- **Basis orientation:** no; the intrinsic plane retains an (O(2)) ambiguity.
- **Refinement stability:** yes for the declared cycle family because the first-harmonic gap remains positive and tends to (3).
- **Static real response:** yes for a real reciprocal quadratic action at zero frequency.
- **Full generator closure:** no for the unaddressed symmetric action; yes after three independent projected edge controls, with exact dimension ten.
- **Passive series refinement as a substitute for controls:** no; its two-terminal Dirichlet-to-Neumann response remains rank one under every tested subdivision.
- **Graph-field action to response:** yes at quadratic Hessian level; no derivation from the full trace spectral action has been shown.

## Real-versus-complex fork

The real form is conditional. Static, lossless, reciprocal response produces (H_2(\mathbb R)^+). At nonzero frequency, damping contributes an imaginary term such as

\[
R(\omega)=V-\omega^2M+i\omega\Gamma,
\]

so generic response is complex and belongs to a complex Hermitian/Herglotz family. The natural conformal parent then reopens toward the previously identified (Spin(2,4)) branch. Remaining on the (Spin(2,3)) slice requires zero frequency, negligible loss, or an independently derived antiunitary real structure.

## External-input frontier

Further algebraic repackaging of the same graph data cannot decide the remaining issues. Promotion beyond conditional response symmetry requires at least one genuinely new input:

1. an action that dynamically derives the addressed anisotropy or orientation rather than assigning it in the laboratory;
2. a Lorentzian physical-state construction with positivity or unitarity on a declared domain;
3. derived stress observables, response poles and positive residues tied to physical probes;
4. a universality result beyond cycles and their protected first-harmonic gap;
5. experimental evidence that the ten-generator closure survives loss, disorder and held-out perturbations better than lower-dimensional or complex alternatives.

These are named calculations or measurements, not missing literature-search steps.

## Stopping rule

This lane is **internally exhausted** because every route available from the present graph packet ends in either an exact derivation, an explicit no-go within its assumptions, or a named external datum. It remains **externally open** to a new action, control mechanism, universality theorem or experiment.

Accordingly, the admissible corpus claim is:

> A declared graph family can realize conditional (Spin_0(2,3)) response symmetry after a refinement-stable real two-mode selection and full addressed-control closure.

The inadmissible stronger claim is:

> The graph formalism derives (Spin(2,3)) as fundamental spacetime symmetry.

Physical spacetime admission remains false.
