# RDG--Maxwell bridge programme

**Opened:** 26 October 2026

**Status:** active constructive arm; fixed-complex and source-free dynamics gates passed with typed counterexamples

## Purpose

This arm asks how far the useful parts of RDG--MFE--Q can be carried into an
actual electromagnetic complex without mistaking shared language for physical
equivalence. Its target is a sequence of executable containment gates:

\[
 \text{relational carrier}
 \to \text{cochain complex}
 \to \text{admissibility chain map}
 \to \text{metric/constitutive structure}
 \to \text{Maxwell evolution}
 \to \text{typed geometry change}.
\]

Each arrow must preserve the structures already established. A later layer may
add information, but may not silently manufacture curvature, charge or
topology.

## Controlling rule

For cochain spaces \(C^k\), differential \(d_k\) and admission selectors
\(\Pi_k\), admissibility is gauge-compatible only if

\[
 d_k\Pi_k=\Pi_{k+1}d_k.
\]

For a carrier update \(T_t^k:C^k(K_t)\to C^k(K_{t+1})\), transport is
structure-preserving only if

\[
 d_{k,t+1}T_t^k=T_t^{k+1}d_{k,t}.
\]

These are separate conditions. An idempotent or orthogonal projector need not
be a chain map, and a stable numerical update need not preserve the gauge
complex.

## Results

| Gate | Result | Meaning |
|---|---|---|
| Source recovery | bounded positive | RDG/MFE/Q has inspectable definitions and an exact Haar projector, but no Maxwell containment theorem |
| Periodic cochain carrier | exact pass | the \(2^3\) periodic cubical complex has ranks \((7,14,7)\), Betti numbers \((1,3,3,1)\), and \(d_1d_0=d_2d_1=0\) |
| Translation Haar selector | exact pass | \(\Pi_k=(I+T_k)/2\) commutes with every differential because \(T\) is a cochain action |
| Selector cohomology | exact split | the admitted subcomplex retains \((1,3,3,1)\); the equally large defect subcomplex is acyclic |
| Untyped component selector | exact failure | an idempotent keep-\(x\) projector fails all three commuting squares and creates curvature from a pure gauge |
| Wilson remainder | exact pass | three constant axial one-forms span the non-exact flat \(H^1\) sector |
| Topology comparison | exact obstruction | changing from the three-torus to a contractible 3-simplex removes three \(H^1\) and three \(H^2\) sectors |
| Uniform constitutive Maxwell dynamics | exact finite pass | the selector commutes with the energy metric and Maxwell generator; midpoint/Cayley evolution preserves energy and both Gauss records |
| Translation-breaking positive medium | exact finite counterexample | full dynamics remains conservative, but the admitted and defect sectors exchange amplitude |
| Conserved sources | exact finite pass/fail pair | translation-compatible charge/current selection preserves continuity; component-only selection violates it |
| Explicit material memory | exact finite pass/fail pair | homogeneous Lorentz oscillators close with the field; spatially varying resonance mixes selector sectors |
| Homogeneous damping | exact identity | loss stays selector-compatible but exposes the omitted bath carrier required for conservative closure |
| Stellar remesh retract | exact pass | subdivision and collapse induce commuting cochain transport/restriction with \(RT=I\) |
| Remesh reconstruction | exact pass with boundary | \(TR\) is a chain projector and \(I-TR\) an acyclic fine-mode detector, but Euclidean metric compatibility fails |

## Documents

1. [Source recovery and Maxwell bridge gate](01_rdg_mfe_q_source_recovery_and_maxwell_bridge_gate.md)
2. [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)
3. [Hodge, constitutive and dynamics gate](03_hodge_constitutive_and_dynamics_gate.md)
4. [Sources, resonance and material-memory gate](04_sources_resonance_and_material_memory_gate.md)
5. [Cochain-remeshing retract and reconstruction gate](05_cochain_remeshing_retract_and_reconstruction_gate.md)

## Executable spine

- [Fixed-complex analysis](../../../scripts/analyze-rdg-maxwell-fixed-complex.mjs)
- [Machine evidence](../../../evidence/data/rdg-maxwell-fixed-complex-selector-v1.json)
- [Independent verifier](../../../verification/verify/verify_rdg_maxwell_fixed_complex_selector.mjs)
- [Hodge/dynamics analysis](../../../scripts/analyze-rdg-maxwell-hodge-dynamics.mjs)
- [Hodge/dynamics evidence](../../../evidence/data/rdg-maxwell-hodge-dynamics-v1.json)
- [Hodge/dynamics verifier](../../../verification/verify/verify_rdg_maxwell_hodge_dynamics.mjs)
- [Sources/dispersion analysis](../../../scripts/analyze-rdg-maxwell-sources-and-dispersion.mjs)
- [Sources/dispersion evidence](../../../evidence/data/rdg-maxwell-sources-dispersion-v1.json)
- [Sources/dispersion verifier](../../../verification/verify/verify_rdg_maxwell_sources_and_dispersion.mjs)
- [Remeshing-retract analysis](../../../scripts/analyze-rdg-maxwell-remeshing-retract.mjs)
- [Remeshing-retract evidence](../../../evidence/data/rdg-maxwell-remeshing-retract-v1.json)
- [Remeshing-retract verifier](../../../verification/verify/verify_rdg_maxwell_remeshing_retract.mjs)

Run:

```powershell
node scripts/analyze-rdg-maxwell-fixed-complex.mjs --write
node verification/verify/verify_rdg_maxwell_fixed_complex_selector.mjs
node scripts/analyze-rdg-maxwell-hodge-dynamics.mjs --write
node verification/verify/verify_rdg_maxwell_hodge_dynamics.mjs
node scripts/analyze-rdg-maxwell-sources-and-dispersion.mjs --write
node verification/verify/verify_rdg_maxwell_sources_and_dispersion.mjs
node scripts/analyze-rdg-maxwell-remeshing-retract.mjs --write
node verification/verify/verify_rdg_maxwell_remeshing_retract.mjs
```

## Next gates

1. Add an explicit conservative bath or port model so dissipated power becomes
   a typed output rather than disappearance.
2. Construct compatible coarse/fine mass matrices or a variational projection
   so gauge-safe remeshing also has a controlled energy balance.
3. Treat topology change as a separately detected event with an induced map on
   cohomology, never as an ordinary field update.

## Authority boundary

Passing a discrete structural gate does not establish that RDG is fundamental,
that the chosen admissible sector is physically preferred, or that an evolving
relational carrier reproduces continuum electromagnetism. It establishes the
minimum algebra a proposed bridge must preserve and supplies exact
counterexamples when it does not.

