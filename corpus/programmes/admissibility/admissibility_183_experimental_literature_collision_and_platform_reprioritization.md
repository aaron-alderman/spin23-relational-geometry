# Experimental literature collision and platform reprioritization

**Date:** 30 October 2026

**Status:** primary-literature comparison completed; programmable photonic/electrical feasibility admitted without conflating momentum-space topology with material surface flow

**Parents:** [coherent double-cover emulator](admissibility_179_coherent_double_cover_emulator_and_topology_only_control.md), [material handoff](admissibility_182_material_handoff_and_experimental_stop_boundary.md)

## Finding

The proposed C1--C3 ladder is not technically isolated. Recent experiments
have already implemented Klein-bottle **parameter or momentum spaces** in
programmable photonic and electrical systems. They sharply increase confidence
that nonorientable boundary identification, phase-sensitive reconstruction and
spectral measurement are feasible.

They do not implement the corpus's real-space tangent flow, Hodge/Bochner/
deformation comparison or material surface viscosity. The overlap is in the
experimental language; the remaining claim is different.

## Closest implementations

### Programmable silicon photonics

Xu *et al.*, [“Non-Hermitian exceptional topology on a Klein bottle photonic
circuit”](https://doi.org/10.1038/s41377-026-02516-x), use a programmable
Mach--Zehnder-interferometer mesh and ancilla-assisted unitary dilation to
emulate a two-band non-Hermitian Hamiltonian on a Klein-bottle parameter space.
Their experiment reconstructs amplitude and phase and retrieves the complex
Hamiltonian over sampled parameter points.

This supports three design choices in the present programme:

- a synthetic coordinate is a legitimate way to realize the identification;
- coherent reconstruction is experimentally available;
- a programmable unitary embedding can realize effective loss without
  pretending that the synthetic dynamics is a literal material surface.

The difference is equally important. Their Klein bottle is the fundamental
domain of a non-symmorphic Hamiltonian symmetry and their target is exceptional
topology. The present target is a deck-equivariant carrier, three dissipative
operators and a signed ring-down ledger.

### Klein-bottle electrical circuits

Lai *et al.*, [“Observation of exceptional topology and nonlocal skin effect
in Klein bottle electric circuits”](https://arxiv.org/abs/2601.07615), report a
two-dimensional non-Hermitian circuit with a Brillouin Klein bottle and a
nonlocal skin effect. Shen *et al.*, [“Observation of Klein bottle quadrupole
topological insulators in electric circuits”](https://arxiv.org/abs/2407.07470),
report an electrical realization of a Klein-bottle topoelectrical model under
gauge fields.

These results move active RLC/topoelectrical circuits from speculative to
demonstrated platform class. They do not remove the need for the matched
reflection/rotation control, because their observables and Hamiltonians answer
different questions.

### Efficient circuit tomography

Franca *et al.*, [“Impedance spectroscopy of chiral symmetric topoelectrical
circuits”](https://doi.org/10.1103/PhysRevB.109.L241103), experimentally recover
an \(N\)-site circuit spectrum from frequency-resolved two-point impedance
under their chiral-symmetry assumptions, rather than measuring every one of
the \(N^2\) admittance entries.

The present programme should therefore use a tiered tomography strategy:

1. use two-point impedance spectroscopy when its symmetry assumptions have
   been independently verified;
2. use a sparse set of additional ports to recover residues and signed mode
   shapes;
3. reserve full \(N^2\) transfer measurement for validation, broken-symmetry
   cases and defect localization.

Spectrum alone does not recover the signed topology record required here.

### Nonorientable mechanical memory

Guo *et al.*, [“Non-orientable order and non-commutative response in frustrated
metamaterials”](https://doi.org/10.1038/s41586-023-06022-7), experimentally
connect nonorientable order with protected nodes, mechanical memory and
path-order-sensitive response. This supports adding ordered perturbation
sequences to the defect campaign. A response to defects \(A\) then \(B\) that
differs from \(B\) then \(A\) is a higher-order record not captured by a static
disorder average.

## Material-surface anchors

The material branch remains distinct. Curved lipid membranes and surfactant
interfaces provide established settings in which two-dimensional viscosity,
bulk-fluid coupling and curvature affect observable velocity fields. Relevant
anchors include Arroyo and DeSimone's descendants in membrane hydrodynamics,
the [Scriven--Love number formulation](https://doi.org/10.1103/PhysRevE.101.052401),
and curved membrane force/flow calculations such as
[Bagaria and Samanta](https://doi.org/10.1103/PhysRevFluids.7.093101).

These works reinforce, rather than weaken, the corpus warning: a material
experiment adds surrounding-fluid drag, tension, curvature coupling, possible
viscoelasticity and finite thickness. Its measured operator cannot be copied
unchanged from a graph emulator.

## Reprioritized route

| priority | platform | purpose |
|---:|---|---|
| 1 | active RLC/topoelectrical circuit | cheapest switchable return and impedance spectrum |
| 2 | programmable photonic mesh | high-fidelity complex evolution and synthetic coordinates |
| 3 | mechanical metamaterial | defect memory and ordered perturbation response |
| 4 | membrane/surfactant interface | constitutive C5 test with bulk coupling |

The immediate novelty is therefore not “put a Klein bottle in a circuit.” It
is to join a matched topology-only return test to the Hodge/Bochner/deformation
kernel ledger, throat-gap scaling and nonlinear admissibility boundary.

## New experimental branch

The defect campaign should include the commutator observable

\[
\Delta_{AB}=R(B\circ A)-R(A\circ B),
\]

where \(A\) and \(B\) are localized, time-ordered perturbations and \(R\) is the
full signed response record. A nonzero \(\Delta_{AB}\) is not automatically
topological: hysteresis, active latency and ordinary nonlinearity are matched
controls. It is nevertheless a literature-grounded extension capable of
testing whether the return geometry stores ordered histories.

## Verdict

Existing research validates the platform family but not the corpus claim. The
capability frontier has moved from “can a nonorientable synthetic space be
built?” to “can one frozen apparatus independently identify return topology,
dissipation kernel, curvature lifting and nonlinear closure?” That joined
experiment remains open.

