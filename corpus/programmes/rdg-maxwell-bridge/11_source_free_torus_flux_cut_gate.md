# RDG--Maxwell Bridge 11: source-free torus-flux cut gate

**Date:** 26 October 2026

**Status:** exact non-bounding two-cycle topology receipt

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [torus-flux-cut record](../../../evidence/data/rdg-maxwell-torus-flux-cut-v1.json)

**Verifier:** [torus-flux-cut verifier](../../../verification/verify/verify_rdg_maxwell_torus_flux_cut.mjs)

## Why this gate was needed

Bridge 07 proves the two-cycle cut rule on a tetrahedral sphere, but nonzero
magnetic flux through a sphere bounding a volume is not source-free Maxwell.
The remaining question was whether the same record transfer works for a
non-bounding cycle that can carry flux without magnetic charge.

It does.

## Periodic torus and cut cylinder

The certificate builds a \(2\times2\) periodic square cellulation of the
two-torus. Its cochain dimensions, differential ranks and Betti numbers are

\[
 (4,8,4),qquad(3,3),qquad(1,2,1).
\]

Cut one periodic direction by duplicating the seam. The resulting cylinder has

\[
 (6,10,4),qquad(5,4),qquad(1,1,0).
\]

Identifying the two cylinder boundaries reconstructs the torus. The quotient
is a chain map and its cochain pullback commutes with both differentials with
zero residual.

## Flux record

On the torus take the constant face cochain

\[
 B=(1,1,1,1).
\]

It raises the rank of \(\operatorname{im}d_1\) from 3 to 4 and therefore spans
the \(H^2\) quotient. Its total flux is 4.

After cutting, the same four face values are exact. The certificate constructs
an edge potential \(A\) satisfying

\[
 d_1A=B.
\]

The boundary of the cylinder is the difference of its two circular seams, and
discrete Stokes gives

\[
 \int_{T^2}B
 =\int_{\rm cylinder}B
 =\oint_{C_{\rm right}}A-\oint_{C_{\rm left}}A
 =4.
\]

The particular gauge used by the solver assigns circulations 0 and \(-4\) in
the corresponding orientations; only their relative value is invariant.

The compact record is also exact:

\[
 e^{i\int_{T^2}B}
 =e^{i(\oint_{C_{\rm right}}A-\oint_{C_{\rm left}}A)}.
\]

The numerical residual is zero.

## Source-free interpretation

Interpret the two-torus as an \(xy\) cross-section of the periodic
three-torus in Bridge 02, and the face cochain as constant \(B_z\). In the full
three-dimensional complex,

\[
 d_2B=0.
\]

The \(xy\) torus is non-bounding, so its nonzero flux does not imply magnetic
charge. This is the clean source-free counterpart to the punctured sphere:

| Closed carrier | Flux status | Cut record |
|---|---|---|
| Sphere bounding a volume | nonzero flux requires a source or deleted interior | disk boundary circulation plus cap flux |
| Non-bounding torus cycle | nonzero source-free flux permitted | relative circulation of two cylinder boundaries |

## Unified topology rule

The one- and two-cycle certificates now share one grammar:

\[
 \text{absolute class on a closed carrier}
 \xrightarrow{\text{cut}}
 \text{relative class plus boundary transition data}.
\]

Closing the carrier internalizes the transition as holonomy or flux. Opening
the carrier externalizes it on boundary components. Relative cohomology is the
natural general language for the next theorem.

## Implication for detectors

A topology-aware detector must change basis when the carrier is cut:

- before cutting: measure the global flux period;
- after cutting: measure the relative boundary Wilson circulation;
- during the event: retain the chain-map receipt joining the two.

Local curvature samples alone do not determine which global record is being
carried.

## Logical boundary

- **Exact:** both complexes, Betti numbers, chain/cochain map identities,
  non-exactness before cutting, exactness afterwards, Stokes equality and
  compact phase equality.
- **Source-free:** the corresponding constant three-torus face field satisfies
  the magnetic Gauss equation and occupies a non-bounding cycle.
- **Open:** arbitrary cuts, relative differential cohomology, energetic cost
  of the cut and continuum limits.
- **Not claimed:** physical cutting of spacetime or observation of a changing
  electromagnetic topology.

## Corpus links

- [Two-cycle flux, puncture and cap-record gate](07_two_cycle_flux_puncture_and_cap_record_gate.md)
- [Topology cut, holonomy and boundary-record gate](06_topology_cut_holonomy_and_boundary_record_gate.md)
- [Fixed-complex selector and topology certificate](02_fixed_complex_selector_and_topology_certificate.md)

