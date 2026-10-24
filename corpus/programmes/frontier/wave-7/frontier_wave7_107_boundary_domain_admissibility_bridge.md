# Frontier Wave 7.107: Boundary--Domain Admissibility Bridge

**Date:** 25 October 2026
**Status:** four current research exemplars typed; common architecture retained; Spin(2,3), Jordan and Standard-Model identifications not claimed
**Certificate:** [boundary--domain bridge audit](../../../../verification/verify/verify_boundary_domain_admissibility_bridge.mjs)
**Evidence packet:** [typed four-paper record](../../../../evidence/data/boundary-domain-admissibility-bridge-v1.json)

## Result

Four papers posted together are related, but not because they independently
derive one hidden theory.  They occupy four different arrows of one rigorous
construction pattern:

\[
\boxed{
\text{bulk carrier}
\longrightarrow
\text{admissible boundary/domain}
\longrightarrow
\text{regulated microscopic realization}
\longrightarrow
\text{scale flow}
\longrightarrow
\text{observable spectrum}.
}
\]

The papers respectively supply:

1. a common topological bulk with code-classified boundary conditions;
2. a tunable monodromy boundary whose flux is read as a defect spectrum;
3. an exact lattice algebra whose continuum symmetry is *emanant* in a
   transformed representation;
4. a geometric/RG flow whose reduced quantum Hamiltonian is a spectral
   operator, while its physical domain remains extra data.

Together they give a precise contemporary form of the admissibility thesis:

> An algebra, operator or bulk action does not yet specify a physical system.
> The admitted domain, boundary condition, positivity cone, regulator map and
> probe determine which part of that structure is physically realized.

This is a structural bridge and an experimental design grammar.  It is not an
identification of any of the four systems with the corpus's Spin(2,3), Jordan,
E6, Chain-Theory or fine-structure candidates.

## 1. The four typed roles

### 1.1 Bulk-to-boundary classification: Narain code CFTs

Sammani and Sebbar show that twenty-two even self-dual gluing codes over
\(\mathbb Z_4\), representing seven inequivalent CFTs for two hyperbolic
pairs, are topological boundary conditions of one abelian Chern--Simons
theory.  Invertible bulk symmetries arrange the boundaries into free, mixed
and torsion orbits; transitions between some orbits require gauging.

The exact lesson for this corpus is not that its existing finite carrier is a
Narain code.  It is that several apparently different boundary theories can
be fibers of one bulk carrier, with orbit and gauging data controlling which
translations between them are legal.

The paper also supplies a decisive positivity warning.  Its handlebody
coefficient

\[
c_d=4^{1-d}-2^{-d}
\]

is zero at \(d=2\) and negative for every integer \(d\geq3\).  The resulting
handlebody state is then not a nonnegative combination of code boundary
states.  A valid linear expansion is therefore not automatically a positive
physical ensemble.  Enlarging the bulk sum by line insertions or other
topologies remains a possible repair, not a completed theorem.

### 1.2 Boundary-to-spectrum transduction: monodromy defects

Tang and Zhu implement monodromy boundary conditions on the fuzzy sphere by
threading a symmetry-selective Aharonov--Bohm flux through its two poles.  A
\(\pi\)-twist shifts the angular-momentum grid of the odd fermions by one
half.  The topological boundary datum is thereby converted into fractional
transverse spin, defect spectra and bulk-to-defect and defect-to-defect OPE
coefficients.

For the five defects examined, the resolved low-energy spectrum contains no
symmetry-preserving relevant scalar.  This is evidence for stable conformal
lines within the numerical and finite-size reach of the calculation.  It is
not a theorem about every regulator size or interacting defect.

The authors state that the numerical energies and matrix elements for all
sizes and defects, together with their extrapolation, fit and figure code,
will be released upon publication.  They are not linked in the present
preprint.  The exact half-grid construction and the tabulated extrapolations
can therefore be audited now; an independent finite-size reproduction is an
external release gate, not work already completed by this packet.

This paper supplies the cleanest detector arrow:

\[
\text{declared twist}
\to
\text{half-grid displacement}
\to
\text{fractional spin}
\to
\text{measured defect conformal data}.
\]

### 1.3 Microscopic-to-continuum translation: Onsager lattice algebra

Kourkoulou and Tong identify exact Onsager algebras for free staggered,
Wilson and overlap fermions.  For \(N\) massless Dirac fermions, the
low-energy limit carries the full \(U(2N)\) chiral symmetry.  They call this
symmetry *emanant*: it is already present in the microscopic algebra, but not
in the same representation in which it appears in the infrared.

The construction also exposes a non-negotiable tradeoff.  Depending on the
lattice realization, one cannot simultaneously maximize ultra-locality,
charge quantization and compact chiral symmetry.  Exact microscopic
structure can survive a scale change while locality class and generator
interpretation change.

The present result is for free fermions.  Standard gauging destroys much of
the algebra, and the authors explicitly leave the interacting significance
open.  The corpus must therefore use the paper as a translation model, not
as an already interacting Standard-Model regulator.

### 1.4 Flow-to-spectral dynamics: Ricci, Hitchin and Perelman

Bonelli, Lacroix, Pedroni and Tanzini construct integrable two-dimensional
sigma models from four-dimensional Chern--Simons theory.  Their classical
point-particle reductions are Hitchin systems.  In the cases examined, the
quantized Hitchin Hamiltonian coincides with the Perelman operator associated
with one-loop Ricci flow; its lowest eigenvalue is related to the
\(c\)-function.  For the sausage model, exponentially small corrections are
needed for agreement with numerical finite-volume results.

This is a genuine example of geometry, RG flow and spectrum meeting in one
computable object.  Its most important admissibility qualification is stated
by the authors: the operator alone does not fix the domain, equivalently the
appropriate real slice and eigenfunction boundary conditions.  The spectral
problem is not physically complete until that domain is selected.

The result is a one-loop point-particle reduction, not a proof of an all-loop
equivalence for the full field theory.

## 2. The two-rail ladder

The user's earlier two-rail image can now be made precise without importing a
new universal operator.

| Bulk/operator rail | Boundary/domain rail | Rung | Readout |
|---|---|---|---|
| abelian Chern--Simons carrier | even self-dual code boundary | gauging or invertible bulk symmetry | boundary CFT partition data |
| Wilson--Fisher bulk CFT | monodromy line | symmetry-selective flux | fractional-spin defect spectrum and OPE data |
| free lattice Hamiltonian | locality/quantization choice | infrared scaling map | continuum chiral symmetry |
| Perelman/Hitchin operator | real slice and eigenfunction domain | one-loop RG/quantization dictionary | eigenvalues and \(c\)-function data |

The rails are not interchangeable.  The bulk operator determines possible
motions; the boundary/domain determines which motions are admitted.  The
rungs are typed translations--gauging, flux insertion, scaling or
quantization--and each requires its own invariants.

## 3. What becomes monitorable and tunable

The combined architecture supplies concrete controls:

- **topological control:** code/Lagrangian subgroup, orbit and gauging choice;
- **defect control:** monodromy element and inserted flux;
- **regulator control:** sphere size, lattice spacing and locality class;
- **flow control:** sigma-model coupling and RG time;
- **domain control:** real slice and boundary conditions;
- **admissibility control:** nonnegative state or ensemble weights;
- **detector control:** low spectrum, gaps, fractional spin, OPE coefficients,
  finite-volume levels and symmetry generators.

This gives a reusable experimental protocol:

1. hold the bulk carrier fixed;
2. vary exactly one boundary/domain selector;
3. transport it through a declared regulator or scale map;
4. measure a spectrum or response carrying a selector-specific invariant;
5. test positivity, stability and regulator convergence;
6. use a trivial-boundary and a symmetry-breaking boundary as controls;
7. reject any bridge that requires retuning the bulk law for each boundary.

## 4. Corpus consequences

### 4.1 Defect and BF lane

The Narain and monodromy results strengthen the *form* of the existing
boundary/defect programme in documents 1176--1181: a common bulk may admit a
classified family of boundaries, central information may live on line
endpoints, and gauging is a typed operation between boundary sectors.  They
do not derive the corpus's required \(\mathbb Z_3\) lift or nine-state carrier.

### 4.2 Jordan positivity lane

The negative handlebody coefficient is an external worked example of the
corpus's positivity firewall.  Closure under linear combination, modular sum
or representation theory is weaker than admission to a positive state cone.
This is a structural corroboration of the firewall, not evidence that the
Narain ensemble is the corpus's Jordan carrier.

### 4.3 Dynamics lane

The Ricci--Hitchin--Perelman result gives a clean answer to how dynamics fits:
a family of admissible operators/domains may itself flow, while spectral
invariants monitor the flow.  Dynamics is neither “the matrix” nor “the
boundary” alone; it is the covariant transport of admitted state spaces and
observables along a declared flow.

### 4.4 Search and context lane

The word *emanant* names a useful retrieval relation for the corpus.  A target
symmetry need not appear literally in the microscopic vocabulary.  Search
should also retrieve structures whose exact algebra maps to the target only
after quotient, scaling or change of representation.  Such a result must
store the translation functor and its losses, not merely a semantic match.

## 5. Admission gates for a stronger claim

A future claim that these papers instantiate one corpus mechanism must pass
all of the following:

1. **carrier:** one explicitly defined bulk algebra/action;
2. **selector:** a classified positive family of boundaries or domains;
3. **translation:** an intertwiner, functor or controlled scaling map;
4. **flow:** a law transporting carrier, selector and observables;
5. **positivity:** admitted states and ensemble weights remain nonnegative;
6. **probe:** at least one normalized measurable response;
7. **controls:** trivial selector, symmetry-breaking selector and
   regulator-refinement controls;
8. **shared parameters:** no boundary-specific repair of the bulk law.

Until these gates are passed, the four papers are a high-value architecture
and experimental grammar, not a derived universal theory.

For the nearest no-new-laboratory experiment, the release gate is explicit:
obtain the promised fuzzy-sphere energy, matrix-element and fit bundle; freeze
the published bulk critical coupling; preregister untwisted, pi-twisted and
symmetry-breaking controls; reproduce the size extrapolation; and withhold a
set of fractional-spin levels and OPE coefficients from fitting.  Failure
under regulator refinement or a need to retune the bulk separately for each
boundary kills the proposed selector reading.

## Sources and corpus anchors

- Tang and Zhu, [*Monodromy Defects of 3D Wilson--Fisher Criticality on the Fuzzy Sphere*](https://arxiv.org/abs/2610.31269)
- Kourkoulou and Tong, [*Onsager Algebras and Lattice Fermions*](https://arxiv.org/abs/2610.31653)
- Bonelli, Lacroix, Pedroni and Tanzini, [*Ricci flow of Integrable Sigma Models, Hitchin Systems and Quantum Seiberg--Witten theory*](https://arxiv.org/abs/2610.31672)
- Sammani and Sebbar, [*TQFT gravity dual to the orbifold groupoid of Narain code CFTs over \(\mathbb Z_4\)*](https://arxiv.org/abs/2610.30525)
- [defect frontier complexity card](../../frontier-physics-targets/frontier_complexity_cards_v1.md)
- [detector frontier atlas](../../frontier-physics-targets/detector_frontier_atlas_v1.md)
- [boundary central-lift requirement](../../../claims/1100-1199/1176_the_jordan_peirce_derivation_generates_the_charge_three_relation_but_quotients_out_the_residual_z3_so_a_fermionic_central_lift_is_essential.md)
- [orbifold BF projection](../../../claims/1100-1199/1178_an_s1_over_z2_bf_orbifold_projects_out_the_extra_zero_mode_sector_and_retains_exactly_the_nine_state_level_three_interface.md)
- [level-three boundary positivity gate](../../../claims/1100-1199/1181_symplectic_reduction_by_the_gauged_colour_centre_takes_the_z9_lift_from_81_to_9_torus_states_and_descends_the_pairing_to_level_three.md)
- [connected-state positivity firewall](frontier_wave7_89_chain_theory_connected_state_positivity_firewall.md)
