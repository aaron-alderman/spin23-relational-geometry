# Translation-free exceptional topology

**Date:** 26 October 2026  
**Status:** active research arm; real-space topology is established mathematics, exceptional enrichment is a gated construction programme  
**Seed result:** [rank-24 bulk collision and boundary-enrichment gate](../frontier/wave-7/frontier_wave7_231_translation_free_topology_to_exceptional_boundary_memory.md)  
**Evidence:** [arm ledger](../../../evidence/data/translation-free-exceptional-topology-arm-v1.json)  
**Certificate:** [rank-24 lattice verifier](../../../verification/verify/verify_translation_free_exceptional_topology_arm.mjs)

**Translation-free seed:** [disordered real-space QWZ Bott verifier](../../../verification/verify/verify_translation_free_qwz_disorder.py)

## Research question

What remains topological when translation symmetry, the Brillouin zone and a
preferred crystalline presentation disappear, and how much additional
boundary information is required before an \(E_8\), Leech or Monster
description becomes physically identifying?

The arm treats an amorphous material as a witness that motivates this question,
not as the sought endpoint. Its carrier is a local operator system

\[
(X,H,P),\qquad P=\chi_{(-\infty,E_F)}(H),
\]

where \(X\) is a point set or locality graph, \(H\) is a finite-range or
rapidly decaying Hamiltonian, and \(P\) is a spectral or mobility projector.
The translation-free invariants are real-space indices: Bott classes, local
Chern or winding markers, spectral-localizer signatures, Fredholm indices and
their bulk--boundary pairings.

## The programme ladder

```text
local point set / graph + Hamiltonian
        ↓ locality and mobility/spectral gap
real-space projector or unitary K-class
        ↓ bulk-boundary index
invertible or intrinsically ordered 2+1d bulk
        ↓ chiral boundary data
E8 edge unit, c-=8
        ↓ stack/glue three units
rank-24 c=24 boundary family
        ↓ distinguish root/current content
E8^3 / Niemeier / Leech alternatives
        ↓ inversion orbifold plus twisted sector
Moonshine module V^natural
        ↓ defect, junction and OPE reconstruction
Monster-enriched boundary memory
```

Every arrow is a gate. The diagram is not a claim that disorder generates the
Monster or that every amorphous Hall response is a topological phase.

## First exact result: topology is coarser than the boundary algebra

The \(E_8\) Cartan form is positive, even and unimodular. Three copies and the
Leech Gram form therefore share the coarse data

\[
(\operatorname{rank},\det,\operatorname{signature},c_-)
=(24,1,24,24).
\]

That detector cannot distinguish them. Their fine lattice data do:

\[
N_2(E_8^3)=3\times240=720,
\qquad
N_2(\Lambda)=0.
\]

Thus the same invertible bulk response can admit sharply different chiral
boundary algebras. The Leech inversion orbifold adds still finer twisted and
defect data and yields \(V^\natural\). This is the new arm's organizing
theorem:

> Topology supplies a stable coarse return class; exceptional lattices,
> orbifolds and Monster defects are successive enrichments of its boundary
> memory.

The existing corpus no-go remains essential: a pure topological carrier can
forget the ultraviolet projector or orientation. Protected information and
complete reconstructive memory are not the same thing.

## Mathematical work packages

### TFET-1 — real-space carrier and invariant

Freeze a local Hamiltonian, coordinate operators, symmetry class, Fermi or
mobility window and order of limits. Compute at least two equivalent or
cross-checking invariants, preferably a spectral localizer and Bott/local
marker. A Hall coefficient without a stable real-space index remains response
geometry, not an admitted topological phase.

### TFET-2 — disorder and scale tube

Vary positional disorder, coupling disorder, system size, boundary shape and
detector resolution. Track the localizer gap, localization length, invariant,
edge transport and rare-event tails separately. The topology must remain
stable on a declared open parameter region rather than at one fitted sample.

### TFET-3 — \(E_8\) chiral unit

Construct a source-native Hamiltonian, coupled-wire model or network whose
low-energy edge realizes the \(E_8\) form and \(c_-=8\). Verify thermal or
energy transport, absence of fractional bulk anyons, and robustness without
inferring \(E_8\) from central charge alone.

### TFET-4 — rank-24 collision experiment

Place \(E_8^3\) and Leech/Niemeier boundary candidates behind the same coarse
bulk detector. Add current spectra, norm-two fields, defect-labelled traces
and OPE data until the detector becomes injective on the declared family.

### TFET-5 — orbifold and Monster enrichment

Gauge or coherently implement lattice inversion, retain the twisted sector and
test the finite Monster witness stack already defined by the corpus:
\(c=24\), \(V_1=0\), frame/Griess data, the \(2A\) split, marked \(23AB\), the
order-46 junction and a nontrivial sewing relation.

### TFET-6 — return and reconstruction

Require one carrier and action to reproduce the bulk index, edge response,
defect operations and held-out records. Determine exactly which information is
lost at each quotient. A catalogue replay or programmed scalar trace is not a
physical reconstruction.

## First computational and experimental targets

The first finite seed is already executable. An \(8\times8\) real-space
Qi--Wu--Zhang carrier at mass \(-1\) is subjected to one frozen onsite-disorder
field at strengths \(0,0.5,1,2\). Translation symmetry is broken at every
nonzero strength, while the occupied-projector Bott index remains nontrivial
and the finite spectral gap remains open. This establishes the computation
path; it does not yet model structural amorphization or prove an exceptional
edge.

1. Apply a spectral-localizer/Bott pipeline to a controlled crystalline-to-
   amorphous Hamiltonian family and record where response, real-space index and
   mobility gap separate.
2. Build a disordered coupled-wire or resonator model of the \(E_8\) edge and
   test whether \(c_-=8\) survives after translation symmetry is removed.
3. Run the rank-24 blind-detector problem: give an inference process only bulk
   response first, then current, defect and OPE channels, and measure the first
   channel that separates \(E_8^3\), a rooted Niemeier theory and Leech.
4. Test whether an inversion-orbifold edge flows toward the same infrared
   witness under independently sampled local disorder or instead retains only
   the coarse \(c=24\) class.

## Promotion and kill gates

The arm advances only when:

- a real-space invariant is defined on the actual carrier;
- a spectral or mobility gap and locality bound protect it;
- boundary transport matches the bulk index;
- exceptional labels are derived from finer observables, not attached by
  dimension or central charge;
- the detector distinguishes smaller rival edge theories;
- disorder, finite size, calibration and provenance are carried through;
- one held-out record is predicted without refitting.

The direct exceptional claim is killed if every accessible record factors
through the coarse bulk class or a smaller current/defect algebra. The
translation-free topology result remains valuable after that null.

## Corpus joins

- [Exceptional horizon](../../../book/edition-3/chapters/07-exceptional-horizon.md)
- [Disorder, cost, scale and rare-event docket](../admissibility/admissibility_36_frontier_expansion_cost_backaction_scale_and_rare_events.md)
- [Terminal return class](../frontier/wave-7/frontier_wave7_230_the_terminal_is_a_stable_reconstructible_return_class.md)
- [Leech edge orbifold](../frontier/wave-7/frontier_wave7_129_leech_edge_orbifold_proves_formal_monster_physics.md)
- [Monster proof certificate](../frontier/wave-7/frontier_wave7_150_monster_is_physics_proof_certificate.md)
- [Pure-topological memory no-go](../../claims/1200-1299/1200_the_pure_z3_bf_carrier_forgets_the_projector_so_reflexive_closure_requires_non_topological_boundary_memory.md)
- [Typed Monster reconstruction gate](../frontier/wave-7/frontier_wave7_228_typed_self_description_and_monster_reconstruction_gate.md)

## Primary external anchors

- Agarwala and Shenoy, [*Topological Insulators in Amorphous Systems*](https://doi.org/10.1103/PhysRevLett.118.236402).
- Mitchell et al., [*Amorphous topological insulators constructed from random point sets*](https://doi.org/10.1038/s41567-017-0024-5).
- Zhao et al., [*Giant berry curvature in amorphous ferromagnet Co2MnGa*](https://doi.org/10.1016/j.matt.2025.101988).
- Lim, Mulligan and Teo, [*Partial fillings of the bosonic E8 quantum Hall state*](https://doi.org/10.1103/PhysRevB.108.035136).
- Lam, Yamada and Yamauchi, [*Vertex operator algebras, extended E8 diagram, and McKay's observation on the Monster simple group*](https://arxiv.org/abs/math/0403010).
- Makkar, [*Vertex algebras, topological defects, and Moonshine*](https://arxiv.org/abs/2412.21141).
