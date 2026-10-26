# Frontier Wave 7.229: Maxwell curl quotient, helicity and the dynamics gate

**Date:** 26 October 2026

**Status:** supplied diagram audited; gauge reconstruction certificate exact; source vocabulary subsequently recovered but Maxwell recovery remains unproved

**Source post:** [J. D. Redding](https://x.com/JDRedding/status/2114493830603096480)

**Source image:** [Maxwell vector-potential diagram](https://pbs.twimg.com/media/HVgw7DuaMAE8u8C?format=jpg&name=large)

**Evidence:** [vector-potential reconstruction gate](../../../../evidence/data/maxwell-vector-potential-reconstruction-gate-v1.json)

**Certificate:** [periodic curl-kernel verifier](../../../../verification/verify/verify_maxwell_vector_potential_reconstruction_gate.mjs)

## The standard core

The diagram correctly displays

\[
 \mathbf B=\nabla\times\mathbf A,
 \qquad
 B_i=\epsilon_{ijk}\partial_jA_k .
\]

Writing \(\mu\mathbf H=\nabla\times\mathbf A\) additionally assumes the
constitutive equation \(\mathbf B=\mu\mathbf H\). A scalar \(\mu\) is adequate
only for a restricted local, linear and isotropic medium. Anisotropy requires
\(B_i=\mu_{ij}H_j\); dispersion may require
\(\mu_{ij}(\omega,\mathbf k)\); hysteresis requires state or history variables.
The constitutive arrow is therefore a separate physical lane, not part of the
definition of the vector potential.

The displayed Cartesian component expansion is correct. By itself it establishes
neither a new “Maxwell group” nor the RDGMFEQ, SID/PED, O-mode, \(Q\), or
PED-power terminology. The later source-repository audit in [Wave
7.261](frontier_wave7_261_rdg_mfe_q_source_recovery_and_maxwell_bridge_gate.md)
recovers partial definitions for RDG, SID/PED, MFE and several inequivalent
objects called \(Q\). It does not supply the missing typed electromagnetic
complex, quaternion product, continuum theorem or dynamical recovery proof.

## Curl is an encoder with a kernel

The appropriate typed map is

\[
 C:\mathbf A\longmapsto\nabla\times\mathbf A=\mathbf B .
\]

It is non-injective because

\[
 C(\mathbf A+\nabla\chi)=C(\mathbf A).
\]

On a multiply connected domain there is a second obstruction: two connections
can have the same curvature while differing by a flat, closed non-exact
component. The Wilson periods

\[
 \oint_{\gamma_a}\mathbf A\cdot d\boldsymbol\ell
\]

on independent one-cycles retain that information. Reconstructing
\(\mathbf A\) therefore needs \(\mathbf B\), a gauge condition, boundary data
and the independent periods. The field \(\mathbf B\) alone can reconstruct
only a quotient.

The executable certificate demonstrates both losses on a periodic
\(4^3\) lattice:

1. a nonzero discrete gradient has identically zero discrete curl;
2. adding it to any potential leaves the curl unchanged;
3. a constant periodic connection is curl-free but has nonzero period and
   cannot be the gradient of a single-valued periodic scalar.

This is the exact electromagnetic analogue of the Wave 7.228 decoder rule:
name the quotient, or add the missing observable.

## Where the knot belongs

The drawing becomes physically meaningful through magnetic helicity,

\[
 \mathcal H_m=\int_\Omega\mathbf A\cdot\mathbf B\,d^3x
 =\int_\Omega A\wedge dA .
\]

Under the appropriate closed-flux or vanishing-boundary-term conditions,
helicity measures flux-weighted linkage of magnetic field tubes. On open
magnetic boundaries one needs relative helicity. A decorative knot drawn from
\(\mathbf A\)-streamlines is not itself gauge-invariant evidence of magnetic
linking.

There is also an operator-typing correction. The matrix
\(\mathbf k\times\) is real skew-symmetric, but the Fourier symbol of curl is
\(i\mathbf k\times\), which is Hermitian. Correspondingly curl is formally
self-adjoint under suitable boundary conditions. Antisymmetry of
\(\epsilon_{ijk}\) does not by itself make curl an antisymmetric Hilbert-space
operator.

## Dynamics requires the missing half of the potential

The equation \(\mathbf B=\nabla\times\mathbf A\) is kinematic. Dynamics enters
through

\[
 \mathbf E=-\partial_t\mathbf A-\nabla\phi,\qquad
 \partial_t\mathbf B=-\nabla\times\mathbf E,\qquad
 \nabla\times\mathbf H=\mathbf J+\partial_t\mathbf D .
\]

Thus a dynamical claim must specify the scalar potential, sources, action or
Hamiltonian, constitutive response, and initial/boundary conditions. A static
curl identity cannot supply resonance, lag, hysteresis or power transfer.

## Corpus implication

This image lands directly in the admissibility architecture:

- local curvature \(\mathbf B\), global holonomy and material response are
  different detector coordinates;
- gauge redundancy is a quotient, not an experimental signal;
- Wilson loops detect global information erased by local curvature;
- helicity supplies a legitimate conditional knot/link invariant;
- dynamics supplies \(\partial_t\mathbf A\), not another label on the static
  diagram.

It also sharpens the Monster analogy without identifying the theories. Just as
the scalar Moonshine trace collapses \(23A\) and \(23B\), curl collapses
\(\mathbf A\) and \(\mathbf A+\nabla\chi\). In both cases the honest response is
to reconstruct the quotient or enlarge the observable set.

## Logical boundary

- **Exact:** the curl identities, gauge kernel, periodic flat-sector
  counterexample and Fourier adjoint typing.
- **Conditional physics:** \(\mathbf B=\mu\mathbf H\) and gauge invariance of
  absolute helicity require their stated material and boundary assumptions.
- **Unsupported in the supplied image:** RDGMFEQ, SID/PED tagging, O-mode,
  \(\nabla\times Q\) and PED-power scaling. The linked repositories define
  parts of this vocabulary, but definition is not yet derivation.
- **Not claimed:** electromagnetism and Moonshine share a physical carrier;
  their common feature here is the mathematics of non-injective observation.

## Corpus links

- [Typed self-description and Monster reconstruction gate](frontier_wave7_228_typed_self_description_and_monster_reconstruction_gate.md)
- [RDG--MFE--Q source recovery and Maxwell bridge gate](frontier_wave7_261_rdg_mfe_q_source_recovery_and_maxwell_bridge_gate.md)
- [Dynamic response, geometry, detection and metastability](../../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)
- [The field closes continuity but screening needs its own carrier](../../admissibility/admissibility_119_the_field_closes_continuity_but_screening_needs_its_own_carrier.md)
- [Hopf frame defect and Chern--Simons completion](../../../claims/0600-0699/696_the_higgs_dressed_exchange_has_a_hopf_frame_defect_but_not_a_topologically_protected_standard_model_string.md)

## Sources

- H. K. Moffatt, [*The degree of knottedness of tangled vortex lines*](https://doi.org/10.1017/S0022112069000991), *Journal of Fluid Mechanics* **35** (1969).
- M. A. Berger and G. B. Field, [*The topological properties of magnetic helicity*](https://doi.org/10.1017/S0022112084002019), *Journal of Fluid Mechanics* **147** (1984).
