# RDG--Maxwell bridge programme

**Opened:** 26 October 2026

**Status:** finite constructive pass complete; analytical and experimental frontiers isolated

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
| Remesh reconstruction | exact pass with locality boundary | \(TR\) is a chain projector; a positive compatible metric exists, but it is necessarily non-diagonal for this collapse |
| Topology cut | exact record transfer | cutting \(S^1\) to an interval turns a Wilson period into endpoint potential mismatch rather than annihilating it |
| Two-cycle puncture | exact record transfer with physical boundary | puncturing \(S^2\) turns an \(H^2\) flux into boundary circulation plus cap flux; nonzero closed-sphere magnetic flux is not source-free Maxwell |
| Minimal simplicial remesh family | exhaustive finite no-go | all three boundary-fixed collapses are chain retracts; none admits a positive diagonal metric making reconstruction self-adjoint |
| Macroelement metric escape | exact constructive pass | one vertex pair, two edge pairs and a three-face block suffice to make the chain retract energy-adjoint on the refined triangle |
| Two-macroelement assembly | exact overlap pass | adjacent refined triangles assemble to positive sparse global metrics while preserving chain and weighted-adjoint identities |
| Source-free torus flux cut | exact topology receipt | a non-bounding \(H^2\) flux becomes relative Wilson circulation on the two cylinder boundaries without magnetic charge |
| Loss port and finite bath | exact pass/boundary | damping equals typed output power; a finite conservative bath returns transferred energy and cannot supply permanent Markovian loss |
| Detector null budget | compiled eight-channel gate | every demonstrated conventional route has an exact control; new physics begins only at a held-out residual after all are bounded |
| Primary-literature distance | bounded comparison | individual structures land in mature FEEC/DEC, port-Hamiltonian, passivity and differential-cohomology fields; the typed end-to-end audit is the programme-specific synthesis |
| Graded Beltrami/impedance extension | bounded programme admitted | curl parity is repaired as a graded family; a shared operator/domain/defect must predict both gapped-eigenspace holonomy and passive impedance-pole motion without refitting |
| Exhaustion ledger | finite arm complete | further toy matrices no longer move the frontier; convergence theory, differential-character implementation and experiment remain |

## Documents

1. [Source recovery and Maxwell bridge gate](01_rdg_mfe_q_source_recovery_and_maxwell_bridge_gate.md)
2. [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)
3. [Hodge, constitutive and dynamics gate](03_hodge_constitutive_and_dynamics_gate.md)
4. [Sources, resonance and material-memory gate](04_sources_resonance_and_material_memory_gate.md)
5. [Cochain-remeshing retract and reconstruction gate](05_cochain_remeshing_retract_and_reconstruction_gate.md)
6. [Topology cut, holonomy and boundary-record gate](06_topology_cut_holonomy_and_boundary_record_gate.md)
7. [Two-cycle flux, puncture and cap-record gate](07_two_cycle_flux_puncture_and_cap_record_gate.md)
8. [Local diagonal-Hodge remesh-family no-go](08_local_diagonal_hodge_remesh_family_no_go.md)
9. [Sparse macroelement metric escape](09_sparse_macroelement_metric_escape.md)
10. [Two-macroelement assembly gate](10_two_macroelement_assembly_gate.md)
11. [Source-free torus-flux cut gate](11_source_free_torus_flux_cut_gate.md)
12. [Loss-port and finite-bath boundary](12_loss_port_and_finite_bath_boundary.md)
13. [Detector null-test and residual budget](13_detector_null_test_and_residual_budget.md)
14. [Primary literature map and frontier distance](14_primary_literature_map_and_frontier_distance.md)
15. [Exhaustion ledger and handoff](15_exhaustion_ledger_and_handoff.md)
16. [Graded Beltrami, impedance and defect investigation spike](../admissibility/admissibility_149_graded_beltrami_impedance_defect_investigation_spike.md)
17. [Lagrangian boundary selector and Maslov spectral flow](../admissibility/admissibility_150_lagrangian_boundary_selector_and_maslov_spectral_flow.md)
18. [Curl eta asymmetry as an orientation record](../admissibility/admissibility_151_curl_eta_asymmetry_is_an_orientation_record_not_a_mass_formula.md)
19. [Scalar impedance cannot identify dark holonomy](../admissibility/admissibility_152_scalar_impedance_cannot_identify_dark_holonomy_but_matrix_residues_can.md)

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
- [Topology-cut analysis](../../../scripts/analyze-rdg-maxwell-topology-cut.mjs)
- [Topology-cut evidence](../../../evidence/data/rdg-maxwell-topology-cut-v1.json)
- [Topology-cut verifier](../../../verification/verify/verify_rdg_maxwell_topology_cut.mjs)
- [Two-cycle-cut analysis](../../../scripts/analyze-rdg-maxwell-two-cycle-cut.mjs)
- [Two-cycle-cut evidence](../../../evidence/data/rdg-maxwell-two-cycle-cut-v1.json)
- [Two-cycle-cut verifier](../../../verification/verify/verify_rdg_maxwell_two_cycle_cut.mjs)
- [Local-remesh-family analysis](../../../scripts/analyze-rdg-maxwell-local-remesh-family.mjs)
- [Local-remesh-family evidence](../../../evidence/data/rdg-maxwell-local-remesh-family-v1.json)
- [Local-remesh-family verifier](../../../verification/verify/verify_rdg_maxwell_local_remesh_family.mjs)
- [Two-macroelement analysis](../../../scripts/analyze-rdg-maxwell-two-macroelement-assembly.mjs)
- [Two-macroelement evidence](../../../evidence/data/rdg-maxwell-two-macroelement-assembly-v1.json)
- [Two-macroelement verifier](../../../verification/verify/verify_rdg_maxwell_two_macroelement_assembly.mjs)
- [Torus-flux-cut analysis](../../../scripts/analyze-rdg-maxwell-torus-flux-cut.mjs)
- [Torus-flux-cut evidence](../../../evidence/data/rdg-maxwell-torus-flux-cut-v1.json)
- [Torus-flux-cut verifier](../../../verification/verify/verify_rdg_maxwell_torus_flux_cut.mjs)
- [Port/bath analysis](../../../scripts/analyze-rdg-maxwell-port-and-bath.mjs)
- [Port/bath evidence](../../../evidence/data/rdg-maxwell-port-and-bath-v1.json)
- [Port/bath verifier](../../../verification/verify/verify_rdg_maxwell_port_and_bath.mjs)
- [Detector-budget compiler](../../../scripts/compile-rdg-maxwell-detector-budget.mjs)
- [Detector-budget evidence](../../../evidence/data/rdg-maxwell-detector-null-budget-v1.json)
- [Detector-budget verifier](../../../verification/verify/verify_rdg_maxwell_detector_budget.mjs)

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
node scripts/analyze-rdg-maxwell-topology-cut.mjs --write
node verification/verify/verify_rdg_maxwell_topology_cut.mjs
node scripts/analyze-rdg-maxwell-two-cycle-cut.mjs --write
node verification/verify/verify_rdg_maxwell_two_cycle_cut.mjs
node scripts/analyze-rdg-maxwell-local-remesh-family.mjs --write
node verification/verify/verify_rdg_maxwell_local_remesh_family.mjs
node scripts/analyze-rdg-maxwell-two-macroelement-assembly.mjs --write
node verification/verify/verify_rdg_maxwell_two_macroelement_assembly.mjs
node scripts/analyze-rdg-maxwell-torus-flux-cut.mjs --write
node verification/verify/verify_rdg_maxwell_torus_flux_cut.mjs
node scripts/analyze-rdg-maxwell-port-and-bath.mjs --write
node verification/verify/verify_rdg_maxwell_port_and_bath.mjs
node scripts/compile-rdg-maxwell-detector-budget.mjs --write
node verification/verify/verify_rdg_maxwell_detector_budget.mjs
```

## Open frontiers after the finite pass

1. Prove uniform conditioning, approximation and stability for a family of
   changing meshes; the algebraic local-to-global assembly identity is closed.
2. Implement arbitrary cut/glue histories in relative differential cohomology
   or differential characters; the representative (H^1) and (H^2) receipts
   are closed.
3. Execute the same-device held-out detector protocol with calibrated material,
   port and detector uncertainties; the finite passive one-port and bath
   boundaries are closed.
4. Realize a gapped Beltrami-like doublet and require one frozen defect model
   to predict both oriented projector holonomy and complex impedance-pole
   displacement; the finite parity, positivity and pole-ledger checks are
   closed.

## Authority boundary

Passing a discrete structural gate does not establish that RDG is fundamental,
that the chosen admissible sector is physically preferred, or that an evolving
relational carrier reproduces continuum electromagnetism. It establishes the
minimum algebra a proposed bridge must preserve and supplies exact
counterexamples when it does not.

