# RDG--Maxwell Bridge 02: fixed-complex selector and topology certificate

**Date:** 26 October 2026

**Status:** exact finite certificate; good selector passes and untyped selector fails

**Programme:** [RDG--Maxwell bridge](README.md)

**Evidence:** [fixed-complex selector record](../../../evidence/data/rdg-maxwell-fixed-complex-selector-v1.json)

**Verifier:** [fixed-complex selector verifier](../../../verification/verify/verify_rdg_maxwell_fixed_complex_selector.mjs)

## Question

Does the exact RDG--MFE--Q Haar projector

\[
 Q^\square=I-\Pi_{\rm rel}
\]

automatically define a valid electromagnetic admission rule?

No. Orthogonality and idempotence are insufficient. The projector must be a
natural transformation of the complete cochain complex: it must commute with
the differential on every degree.

## Typed carrier

The certificate constructs the oriented periodic \(2\times2\times2\) cubical
complex

\[
 C^0\xrightarrow{d_0}C^1\xrightarrow{d_1}C^2
 \xrightarrow{d_2}C^3
\]

with dimensions

\[
 (\dim C^0,\dim C^1,\dim C^2,\dim C^3)=(8,24,24,8).
\]

The differential ranks are \((7,14,7)\), and direct matrix multiplication
gives

\[
 d_1d_0=0,
 \qquad
 d_2d_1=0.
\]

Consequently the computed Betti numbers are

\[
 (b_0,b_1,b_2,b_3)=(1,3,3,1),
\]

as required for a three-torus.

## The selector that passes

Let \(T_k\) translate every \(k\)-cochain by one cell in the \(x\) direction.
Because the translation acts on vertices, oriented edges, oriented faces and
volumes compatibly,

\[
 d_kT_k=T_{k+1}d_k.
\]

The \(\mathbb Z_2\) Haar projectors

\[
 \Pi_k=\frac{I+T_k}{2},
 \qquad
 Q_k=I-\Pi_k
\]

therefore satisfy, exactly,

\[
 \Pi_k^2=\Pi_k,
 \qquad
 d_k\Pi_k=\Pi_{k+1}d_k,
 \qquad
 d_kQ_k=Q_{k+1}d_k.
\]

This is the first literal RDG--Maxwell bridge in the arm. The projector is safe
not because Haar averaging is intrinsically electromagnetic, but because the
averaged representation is a cochain representation.

The split is not topologically symmetric. Both image spaces have dimensions
\((4,12,12,4)\), but their restricted differential ranks are

\[
 (3,6,3)\quad\text{and}\quad(4,8,4),
\]

respectively. Hence

\[
 H^\bullet(\operatorname{im}\Pi)=(1,3,3,1),
 \qquad
 H^\bullet(\operatorname{im}Q)=(0,0,0,0).
\]

All global torus cohomology remains in the admitted translation-even
subcomplex. The equally large translation-odd detector subcomplex is acyclic.
For this selector, Wilson periods and closed global flux are therefore not
defects; the defect channel contains only non-harmonic modes.

## The selector that fails

The counterexample uses projectors that are individually idempotent:

- identity on scalars and volumes;
- retain only the \(x\)-component of edge potentials;
- retain only the \(x\)-normal face fluxes.

All three commuting squares fail. Their commutator ranks are

\[
 \bigl(\operatorname{rank}[d_0,P],
       \operatorname{rank}[d_1,P],
       \operatorname{rank}[d_2,P]\bigr)
 =(6,12,6).
\]

More decisively, for an explicitly found vertex basis scalar \(\chi\),

\[
 d_1P_1d_0\chi\ne0.
\]

The input \(d_0\chi\) is pure gauge and has zero curvature before selection.
The component selector manufactures magnetic curvature. An admissibility repair
can therefore create the very defect its detector subsequently reports.

## Harmonic remainder

The three constant axial one-forms are curl-free. Adding them to the columns of
\(d_0\) increases the rank from 7 to 10, exactly filling the three-dimensional
\(H^1\) quotient. Each has a nonzero periodic sum and is not a periodic
gradient. These are the discrete Wilson coordinates anticipated by Wave 7.229.

This produces a three-part decomposition:

\[
 C^1=\operatorname{im}d_0
 \oplus \mathcal H^1
 \oplus \operatorname{im}d_1^*,
\]

once a compatible inner product/Hodge structure is selected. Admission must
not confuse the exact gauge sector with the harmonic physical remainder.

## Dynamic carrier implication

The same translation matrices can be read as a topology-preserving carrier
update. They pass

\[
 d_{k,t+1}T_t^k=T_t^{k+1}d_{k,t}
\]

with zero residual. The bad projector supplies the converse example: a map can
be stable, linear and idempotent while failing to transport curvature or gauge
equivalence.

Comparing the torus with a contractible 3-simplex changes Betti numbers from
\((1,3,3,1)\) to \((1,0,0,0)\). Such a carrier transition removes three Wilson
sectors and three closed-flux sectors. No invertible degreewise chain map can
make it an ordinary geometry update. It must be recorded as topology change,
with creation, annihilation or boundary transfer of the affected records.

## Implication for RDG--MFE--Q

The strongest exact RDG object survives, but with a new admission condition:

> A symmetry defect projector is compatible with gauge physics only when the
> symmetry acts functorially on the complete field complex.

This narrows the phrase “admissible geometry.” The admissible subspace cannot
be selected independently at each carrier degree. It must form a subcomplex.
The complementary detector must form one as well.

## Next experiment

The next gate adds a positive discrete Hodge star and source-free Maxwell
evolution. It must distinguish three commutators:

\[
 [\Pi,d],
 \qquad
 [\Pi,*],
 \qquad
 [\Pi,H_{\rm Maxwell}].
\]

The current certificate closes the first. The second asks whether admission
respects metric and constitutive structure; the third asks whether the admitted
sector is dynamically invariant. A selector can pass the topological gate and
still exchange energy with its rejected complement.

## Logical boundary

- **Exact:** matrix dimensions, ranks, nilpotence, Betti numbers, projector
  identities, commuting residuals, counterexample ranks and harmonic-rank
  augmentation.
- **Constructive interpretation:** translation averaging is an RDG-style
  admission selector on a discrete Maxwell carrier.
- **Not yet supplied:** Hodge stars, constitutive response, electric fields,
  time evolution, energy conservation, sources or continuum convergence.
- **Not claimed:** that translation invariance is the physically correct
  admissible sector or that topology change occurs in electromagnetism.

## Corpus links

- [Source recovery and Maxwell bridge gate](01_rdg_mfe_q_source_recovery_and_maxwell_bridge_gate.md)
- [Maxwell curl quotient, helicity and dynamics gate](../frontier/wave-7/frontier_wave7_229_maxwell_curl_quotient_helicity_and_dynamics_gate.md)
- [Locally invariant carrier and mirror-face spine](../admissibility/admissibility_123_locally_invariant_carrier_and_mirror_face_spine.md)
- [Relation-face compiler from adjacency to Jordan holonomy](../admissibility/admissibility_124_relation_face_compiler_from_adjacency_to_jordan_holonomy.md)

