# The third edge turns the sign graph into a positivity experiment

**Date:** 25 October 2026

**Status:** three-source extraction and global positivity gate closed; physical electroweak triangle open

**Topics:** OT-047, OT-048

**Parent:** [AZ-073 signed extraction](admissibility_73_signed_edge_extraction_and_cycle_audit.md)

**Evidence:** [three-edge factorial ledger](../../../evidence/data/five-coordinate-three-edge-factorial-gate-v1.json)

**Generator:** [three-source calculation](../../../scripts/run-five-coordinate-three-edge-factorial-gate.mjs)

**Verifier:** [factorial and positivity certificate](../../../verification/admissibility/verify_five_coordinate_three_edge_factorial_gate.mjs)

## Result

The phase tree may not need to be assembled from opposite sides of the electroweak threshold. Published broken-phase axion cross sections for \(t\bar b\to W^+a\) and its crossed channels retain independent \(c_t\) and \(c_b\) contributions, including their mixed product. A separate associated-\(tWa\) study places top-like and weak-gauge emission topologies in one final-state family. Together they locate a sharper target: compute one gauge-complete W-associated amplitude with independent signed \((c_t,c_b,c_W)\), rather than using heavy-meson decay as a necessary first edge.

This is a candidate route, not a completed triangle. The thermal paper does not calculate the weak-gauge coefficient in the same response table. The collider paper does not publish a separated bottom/top/W kernel and mainly studies operator directions separately. Shared diagrams do not prove that all three pairwise cross terms survive helicity, colour, CP, phase-space integration, cuts and nuisance profiling.

Primary sources:

- [Arias-Aragón et al., *Production of Thermal Axions across the ElectroWeak Phase Transition*](https://arxiv.org/abs/2012.04736)
- [Hosseini and Mohammadi Najafabadi, *Exploring Axion-Like Particle Couplings through Single Top tW-Channel and Top Pair Production at the LHC*](https://arxiv.org/abs/2408.11588)

## One finite three-source calculation

For \(c=(c_t,c_b,c_W)\), fit each differential bin to

\[
y(c)=B+L^Tc+c^TFc,
\]

where \(F\) is a symmetric \(3\times3\) response kernel. The complete signed grid \(c_i\in\{-1,0,+1\}\) has 27 settings. The union of its three coordinate planes has only 19 distinct settings: one origin, six signed axes and twelve signed pair corners. Those settings determine the ten coefficients—one baseline, three linear terms and six entries of \(F\)—and leave nine pair-plane closure residuals. The eight all-nonzero corners are then genuine held-out predictions of the quadratic, no-three-way model.

The executable certificate recovers

\[
F=\begin{pmatrix}
9&-3&6\\
-3&4&-4\\
6&-4&16
\end{pmatrix}
\]

exactly from the 19 settings, with all nine internal residuals and all eight held-out residuals zero. This is a protocol certificate, not a physical coefficient prediction.

## Why the third edge changes the kind of test

Each pair can satisfy its ordinary interference bound while the full triple is still impossible. Joint admission requires every principal minor of \(F\) to be nonnegative, including

\[
\det F=
F_{uu}F_{dd}F_{aa}+2F_{ud}F_{ua}F_{da}
-F_{uu}F_{da}^2-F_{dd}F_{ua}^2-F_{aa}F_{ud}^2\ge0.
\]

The cycle product appears inside this determinant. A node-sign change transports the kernel by \(F\mapsto SFS\), where \(S\) is diagonal with entries \(\pm1\). All eight such choices preserve both the determinant and the three-edge product. The third edge therefore does more than audit naming: it activates a global coexistence condition that cannot be reduced to three separate pairwise checks.

This is the Jordan–Lie hinge in practical form. Positivity asks whether the three responses can coexist in one admitted record. Signed changes of basis say how the same record is transported between conventions. Neither job substitutes for the other.

## Open and closed

Closed:

- a 27-setting full design, with 19 fit settings and eight held-out predictions;
- exact extraction of all ten quadratic-model coefficients;
- nine internal pair-plane closure contrasts;
- the full \(3\times3\) positivity condition, not only pairwise bounds;
- invariance of the determinant and edge-cycle product under all eight node sign conventions;
- a source-native high-energy top–bottom interference route in the W-associated amplitude family.

Open:

- one gauge-consistent implementation with independent signed \(c_t,c_b,c_W\);
- survival of the top–weak and bottom–weak cross terms after integration and detector folding;
- the operator map from \((c_t,c_b,c_W)\) to the corpus coordinates \((v_u,v_d,a_2)\);
- a detector-level covariance and nuisance model;
- electroweak running and threshold matching for comparison with the low-energy \(B_c\) validation arm.

## Kill tests

The one-family route closes if any required edge vanishes after the physical sums and integrations, if gauge completion removes the assumed three independent directions, if the 19-point fit fails its closure contrasts, if the eight held-out points expose higher-order dependence, if the full determinant is negative, or if detector profiling erases an edge needed for the triangle.

## Implication

The immediate “look here” instruction is now unusually concrete: generate one W-associated three-source amplitude and run 27 signed settings on common phase-space points. A successful triangle would move the cross-scale bridge from a prerequisite for sign identification to an independent validation arm. A failed edge is still useful theoretical engineering: it identifies which source directions can be simulated and fitted independently, and it tells the corpus exactly where no physical phase information survives.

The ordinary \(3\times3\) positive response matrix must not be inflated into evidence for a magical \(J_3\), \(E_8\), or a fundamental three-source law. What has been found is narrower and testable: the first candidate process family in which the corpus relation could become one joint admissibility experiment.

## Reproduction

~~~powershell
node scripts/run-five-coordinate-three-edge-factorial-gate.mjs --write
node verification/admissibility/verify_five_coordinate_three_edge_factorial_gate.mjs
~~~
