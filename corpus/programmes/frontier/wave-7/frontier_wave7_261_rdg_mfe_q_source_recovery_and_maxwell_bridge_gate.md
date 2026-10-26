# Frontier Wave 7.261: RDG--MFE--Q source recovery and Maxwell bridge gate

**Date:** 26 October 2026

**Status:** source vocabulary recovered; exact projector isolated; Maxwell equivalence and continuum recovery unproved

**Primary source snapshots:**

- [RDG--MFE--Q repository](https://github.com/JDRedding/RDG-MFE-Q), commit `5a43c796286e402f6863d824b87f4e38b6b12cb9`
- [Domain papers repository](https://github.com/JDRedding/Domain-papers), commit `fbc3836218487a124a5dbfc23dd24f767750090f`

**Parent:** [Maxwell curl quotient, helicity and dynamics gate](frontier_wave7_229_maxwell_curl_quotient_helicity_and_dynamics_gate.md)

## Result

The repositories materially improve the evidential position of Wave 7.229.
RDG, SID/PED, MFE and the quotient vocabulary are not empty labels: they form
an inspectable speculative programme with several explicit finite maps and one
clean representation-theoretic projector. They do **not**, at the audited
commits, derive Maxwell theory on evolving relational geometry. The source's
own `MAXWELL--QUATERNION ⇄ RDG--MFE EQUI` note correctly identifies the main
gaps: its graph d'Alembertian is unspecified, its fields do not yet implement
the quaternion product, and Maxwell recovery is an analogy rather than a
containment theorem.

The useful relationship is therefore a bridge target, not an identification:

\[
 \text{relational carrier}
 \longrightarrow
 \text{typed cochain complex}
 \longrightarrow
 \text{gauge quotient and harmonic remainder}
 \longrightarrow
 \text{constitutive metric}
 \longrightarrow
 \text{Maxwell dynamics}.
\]

## What the source actually contains

The current materials contain at least four distinct constructions.

| Source object | Implemented meaning | Present status |
|---|---|---|
| RDG | a directed relation graph or a graph whose adjacency may evolve | defined at proposal level |
| SID | nested Structure--Interaction--Dynamics relation layers | defined as an ontology; closure laws mostly stipulated |
| MFE/PED | either a four-coordinate bipolar update engine or a PDE solution/flux layer, depending on document | versioned meanings are not yet reconciled |
| \(Q\), \(\sigma\), \(\delta\) | admissibility test, reconstruction by radial scaling, and residual \(X-\Gamma X\) | exact in the two-node/simplex toy, but not Maxwell |
| \(Q^\square=I-\Pi_{\rm rel}\) | orthogonal projector onto non-invariant representation sectors | exact for a unitary action of a finite or compact group |
| \(Q=\phi+\mathbf A\) | quaternion-valued electromagnetic potential | stated, but the toy code does not implement quaternion multiplication |
| \(\square\) | sometimes the spacetime wave operator; elsewhere a metaphorical seal or operator class | must remain type-separated |

The executable code confirms the boundary. `rdg_core.py` averages node values,
tests a total-sum bound and radially scales an inadmissible vector. The larger
toy applies a Conway-Life-like node update and stochastic degree repair. These
are legitimate finite algorithms. Neither code path contains curl, a de Rham
complex, gauge symmetry, helicity, quaternion multiplication or a convergence
test to Maxwell's equations.

The `Domain-papers` material is a live research notebook rather than a single
coherent formal specification. It usefully supplies the intended semantics,
including a correction that the d'Alembertian is not an idempotent projector.
It also assigns incompatible meanings to MFE and \(Q\) across documents. Those
differences should be treated as versioned hypotheses rather than silently
merged.

## The exact object worth importing

Let a finite or compact group \(G\) act unitarily on a Hilbert space
\(\mathcal H\). Haar averaging gives

\[
 \Pi_{\rm rel}f=\int_G U(g)f\,d\mu(g),
 \qquad
 (Q^\square f)=(I-\Pi_{\rm rel})f .
\]

Then

\[
 \Pi_{\rm rel}^2=\Pi_{\rm rel}=\Pi_{\rm rel}^*,
 \qquad
 (Q^\square)^2=Q^\square=(Q^\square)^*,
\]

with

\[
 \ker Q^\square=\mathcal H^G,
 \qquad
 \operatorname{im}Q^\square=(\mathcal H^G)^\perp .
\]

This is sound mathematics. In the corpus's intuitive grammar, the field
configuration is the **thing**, the invariant projector is a **selector**, and
the complementary output is a **detector** for violation of the declared
symmetry. Calling \(\mathcal H^G\) “admissible” remains a modelling decision;
physics has not established that every nontrivial representation sector is a
defect. The construction is therefore a reusable admission operator, not yet a
law of nature and not the spacetime d'Alembertian.

## Why an arbitrary graph gradient is not yet Maxwell

Maxwell's kinematics are typed by differential degree. On a cell complex the
minimal discrete sequence is

\[
 C^0\xrightarrow{d_0}C^1\xrightarrow{d_1}C^2
 \xrightarrow{d_2}C^3,
 \qquad d_1d_0=0,\quad d_2d_1=0.
\]

The assignments are not optional decoration:

- a gauge scalar \(\chi\) belongs on vertices, \(C^0\);
- the vector potential \(A\) belongs on oriented edges, \(C^1\);
- magnetic flux \(B=d_1A\) belongs on oriented faces, \(C^2\);
- magnetic charge testing \(d_2B=0\) belongs on volumes, \(C^3\).

The identity \(d_1d_0=0\) is the discrete gauge kernel
\(A\mapsto A+d_0\chi\). The identity \(d_2d_1=0\) is the magnetic Gauss
constraint. A weighted neighbor difference acting only on node fields supplies
neither typed identity. Adjacency alone also does not supply the Hodge stars
needed to identify primal and dual degrees, define energy, encode a material
law or construct adjoints. The claimed expansion
\(\Psi_j-\Psi_i\sim h\nabla_R\Psi\cdot e_{ij}\) already introduces a scale
\(h\), directions \(e_{ij}\) and regularity that must be derived or declared;
they cannot simultaneously be used and denied as geometric data.

This matches the established finite-element exterior-calculus gate: stable
discretization requires a differential subcomplex and a bounded commuting
cochain projection, not merely a fine graph.

## The new difficulty created by dynamic geometry

If the relational complex changes from time \(t\) to \(t+1\), the carrier
spaces themselves change. A field cannot be subtracted from its successor
until a transport map is supplied:

\[
 T_t^k:C^k(K_t)\longrightarrow C^k(K_{t+1}).
\]

For curvature and gauge equivalence to survive the move, the maps must form a
commuting square,

\[
 d_{k,t+1}T_t^k=T_t^{k+1}d_{k,t}.
\]

This is the decisive bridge condition. Without it, “updating geometry” can
create magnetic charge, destroy gauge-equivalent classes or change helicity by
remeshing artefact. If topology changes, the Betti numbers can change too, so
the flat/Wilson sector identified in Wave 7.229 can appear or disappear. The
dimension of the quotient is then dynamical. That is a real and potentially
interesting effect, but it must be tracked as topology change rather than
called field evolution by default.

The repository's projective-limit proposal points in the right general
direction, but does not prove existence, uniqueness or refinement-independent
convergence. Projective-limit compatibility, operator convergence and
Gamma-convergence of energies are distinct statements; none implies the
others without additional hypotheses.

## Relation to the corpus algebra

The source language meets the corpus most cleanly at three interfaces.

1. **Admission and reconstruction.** The finite \(Q/\sigma\) toy is a literal
   test-then-project process. It is a useful example of an admissibility lane,
   although radial normalization is only one chosen repair and need not be a
   physical relaxation.
2. **Selector and detector.** \(\Pi_{\rm rel}\) retains the declared invariant
   face and \(I-\Pi_{\rm rel}\) detects the rejected representation content.
   This is a precise instance of the corpus grammar.
3. **Quotient and missing face.** Curl forgets exact gauge directions but not
   necessarily harmonic ones. The RDG programme becomes physically sharper
   when its quotient records the residual cohomology instead of treating all
   kernel directions as one undifferentiated seal.

The proposed identification of \(\delta=X-\Gamma X\) as a “boundary” is only
terminological unless \(\delta\) is typed as a boundary/coboundary operator and
shown to satisfy the appropriate nilpotence law. It is presently a residual
detector.

## Minimal bridge experiment

The fastest honest route does not begin with an evolving arbitrary graph.

1. Choose a fixed periodic oriented cell complex and publish its incidence
   matrices \(d_0,d_1,d_2\).
2. Verify exactly that \(d_1d_0=0\) and \(d_2d_1=0\).
3. Place \(A\) on edges and check that \(A\) and \(A+d_0\chi\) give identical
   \(B=d_1A\).
4. Enumerate the harmonic one-cochains and retain their independent Wilson
   periods, rather than projecting them away.
5. Add positive discrete Hodge stars and a constitutive law, then integrate
   the Maxwell Hamiltonian while monitoring energy and both Gauss constraints.
6. Demonstrate convergence of dispersion, fields and constraints under a
   declared refinement family.
7. Only then allow \(K_t\) to change. Publish \(T_t^k\), verify the commuting
   equations above, and separately record any topology-changing event.

Passing this sequence would turn the repository's “same language” intuition
into a formal containment result. Failure is equally useful: it would locate
whether the obstruction lies in field typing, metric/constitutive structure,
dynamic transport, topology or convergence.

## Decision table

| Claim | Assessment |
|---|---|
| The repositories define RDG/MFE/Q vocabulary | **Yes, with unresolved version conflicts** |
| The Haar-average split is an exact selector/detector | **Yes, under finite/compact unitary-action assumptions** |
| The finite \(Q/\sigma\) code is an admissibility algorithm | **Yes** |
| The supplied code discretizes quaternion Maxwell theory | **No** |
| Arbitrary adjacency refinement uniquely produces grad/div/curl | **Not shown** |
| The continuum limit recovers Heaviside--Maxwell equations | **Open; no theorem or numerical convergence certificate supplied** |
| Dynamic relational geometry can preserve the Maxwell quotient | **Plausible only with explicit commuting transport and topology accounting** |

## Logical boundary

- **Exact:** the group-average projector; its invariant/defect decomposition;
  the finite averaging, threshold and radial-scaling algorithms; the cochain
  identities required by the proposed bridge.
- **Constructive proposal:** reinterpret RDG nodes/relations as an oriented
  cellular cochain complex and require commuting transport across updates.
- **Unproved in the sources:** Maxwell recovery, quaternion equivalence,
  refinement-independent continuum limits, stability of the evolving theory
  and physical selection of the declared admissible sector.
- **Rejected conflations:** projector \(Q^\square\), quaternion potential
  \(Q\), admissibility predicate \(Q\), quotient map \(Q\) and wave operator
  \(\square\) are not interchangeable.

## Corpus links

- [Maxwell curl quotient, helicity and dynamics gate](frontier_wave7_229_maxwell_curl_quotient_helicity_and_dynamics_gate.md)
- [Relation-face compiler from adjacency to Jordan holonomy](../../admissibility/admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md)
- [Locally invariant carrier and mirror-face spine](../../admissibility/admissibility_123_locally_invariant_carrier_and_mirror_face_spine.md)
- [Dynamic response, geometry, detection and metastability](../../admissibility/admissibility_06_dynamic_response_geometry_detection_metastability.md)

## Sources

- J. D. Redding, [RDG--MFE--Q source repository](https://github.com/JDRedding/RDG-MFE-Q), audited at commit `5a43c796286e402f6863d824b87f4e38b6b12cb9`.
- J. D. Redding, [Domain papers source repository](https://github.com/JDRedding/Domain-papers), audited at commit `fbc3836218487a124a5dbfc23dd24f767750090f`.
- D. N. Arnold, R. S. Falk and R. Winther, [*Finite element exterior calculus: from Hodge theory to numerical stability*](https://arxiv.org/abs/0906.4325), *Bulletin of the American Mathematical Society* **47** (2010), 281--354.
- A. N. Hirani, [*Discrete Exterior Calculus*](https://resolver.caltech.edu/CaltechETD:etd-05202003-095403), PhD thesis, California Institute of Technology (2003).
