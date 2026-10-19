# Frontier Parallel Topology 01: The Source-to-Furey-Face Intertwiner Has a Relative-Parity Gate

**Date:** 18 October 2026  
**Frontier threads:** topology-first Furey bridge; physical source selection; CP/real structure  
**Status:** exact two-dimensional classification, followed by a physical underdetermination  
**Certificate:** [classify_frontier_source_to_face_intertwiners.mjs](scripts/classify_frontier_source_to_face_intertwiners.mjs)

## Executive result

The abstract isomorphism between the Standard-Model current response cone and the Furey two-face cone can be sharpened substantially, but it still does not become a physical intertwiner.

Let the source plane be

\[
V_{\rm src}=\operatorname{span}_{\mathbb R}\{\lambda,q\},
\]

where \(q=B-L\) is the Ward-protected direction and \(\lambda\) is the Yukawa-broken incidence direction. Let the diagonal part of the Furey face plane be written in exchange eigenvectors

\[
s=p_A+p_B,
\qquad
d=p_A-p_B,
\]

with face exchange acting as

\[
\tau_F(s)=s,
\qquad
\tau_F(d)=-d.
\]

The exact result is:

\[
\boxed{
\text{a full-rank }\tau\text{-equivariant linear map}
\ V_{\rm src}\to\operatorname{span}\{s,d\}
\text{ exists iff the source plane contains one even and one odd line.}
}
\]

After requiring the protected \(B-L\) line to map to the exchange-even face sum, the only compatible split is

\[
q\mapsto s,
\qquad
\lambda_{\rm odd}\mapsto d.
\]

The present Standard-Model vector-current pair does not itself furnish that relative source-label parity. Both currents have the same Lorentz/charge-conjugation transformation type. Therefore identifying Furey face exchange with physical CP or reversal gives a rank-one obstruction unless an additional CP-odd spurion, boundary orientation, or genuinely opposite-parity probe is supplied.

This is the first-break statement for the topology-first bridge.

## 1. The intertwining equation

Use the ordered source basis \((\lambda,q)\) and target basis \((s,d)\). Write

\[
C_F=\begin{pmatrix}1&0\\0&-1\end{pmatrix},
\qquad
C_S=\begin{pmatrix}\epsilon_\lambda&0\\0&\epsilon_q\end{pmatrix},
\qquad
M=\begin{pmatrix}a&b\\c&e\end{pmatrix}.
\]

Equivariance is

\[
C_FM=MC_S.
\]

An entry \(M_{ij}\) can be nonzero only when the target and source eigenvalues agree. The four cases are therefore exhaustive:

| Source-label parities \((\epsilon_\lambda,\epsilon_q)\) | General equivariant form | Maximum rank | Ward line \(q\to s\)? |
|---|---|---:|---|
| \((+,+)\) | \(\begin{psmallmatrix}a&b\\0&0\end{psmallmatrix}\) | 1 | yes, but rank collapses |
| \((-,-)\) | \(\begin{psmallmatrix}0&0\\c&e\end{psmallmatrix}\) | 1 | no |
| \((-,+)\) | \(\begin{psmallmatrix}0&b\\c&0\end{psmallmatrix}\) | 2 | yes |
| \((+,-)\) | \(\begin{psmallmatrix}a&0\\0&e\end{psmallmatrix}\) | 2 | no |

Thus Ward typing plus full rank selects the *conditional* parity pattern

\[
\epsilon_q=+1,
\qquad
\epsilon_\lambda=-1.
\]

It does not derive that pattern.

## 2. Adding the free ultraviolet metric

The established three-generation free ultraviolet Gram matrix in the source basis \((\lambda,q)\) is

\[
G=
\begin{pmatrix}
231&9\\
9&48
\end{pmatrix}.
\]

Normalize the target \((s,d)\) plane to the Euclidean metric and demand

\[
M^TM=G,
\qquad
Mq=\sqrt{48}\,s.
\]

Then

\[
M_\pm=
\begin{pmatrix}
\dfrac{9}{\sqrt{48}}&\sqrt{48}\\[6pt]
\pm\sqrt{231-\dfrac{81}{48}}&0
\end{pmatrix}.
\]

There are exactly two solutions after the positive orientation of the protected axis is fixed. They differ by

\[
d\mapsto-d.
\]

This makes the surviving ambiguity precise:

\[
\boxed{
\text{Ward line} + \text{UV metric}
\Longrightarrow
\text{a }\mathbb Z_2\text{ orientation torsor, not a selected map.}
}
\]

The result agrees with the independently derived flux-orientation torsor. It does not eliminate it.

## 3. Why ordinary CP does not provide the missing split

The two proposed probes are internal charge currents of the same Lorentz type. Their spacetime components transform under CP in the standard vector-current way; after factoring out that shared Lorentz action, CP acts identically on their two-dimensional label space. It does not naturally act as

\[
\operatorname{diag}(-1,+1)
\]

on \((\lambda,q)\).

Consequently, the tempting identification

\[
\text{physical CP}
\stackrel{?}{=}
\text{Furey face exchange}
\]

fails as a full-rank linear intertwiner on the present source pair.

This does not forbid a bridge. It classifies what extra datum it needs:

1. a CP-odd scalar or flavor spurion multiplying \(J_\lambda\);
2. an oriented boundary normal or retarded/advanced choice that grades the incidence coupling;
3. a second probe of genuinely opposite parity;
4. a semilinear or nonlinear construction whose domain is larger than the bare current-label plane.

Each option changes the physical problem and must be declared.

## 4. Complete positivity is a separate gate

The matrix \(M\) above is a linear isometry of label spaces. That is not yet a completely positive map.

Complete positivity is defined for an operator system or \(C^*\)-algebra with an order unit and matrix-positive cones. The currents \(J_\lambda\) and \(J_q\) span a real vector space of Hermitian operators, not a canonically ordered copy of \(\mathbb R^2_+\). Therefore one cannot promote the metric-matched \(M_\pm\) to a source-to-face quantum channel by vocabulary alone.

The required next object is an operator-system extension

\[
\widehat\Phi:
\mathcal S_{\rm src}longrightarrow
\mathcal S_{\rm face}
\]

whose restriction to the selected current plane is \(M_\pm\), and which preserves:

- the \(B-L\) Ward identity and contacts;
- the incidence-current breaking term;
- engineering dimensions and normalization;
- the physical real structure;
- positivity at every matrix level;
- the distinction between the two face orientations.

No such extension is currently derived from the Standard-Model action.

## 5. Live paths and exact stops

### Live A: CP-odd spurion bridge

Dress the incidence source with an independently defined CP-odd spurion. The representation-theoretic obstruction disappears and \(M_\pm\) becomes an allowed equivariant form. The spurion must be derived, not chosen to force the result.

### Live B: causal-boundary bridge

Let an oriented wall normal or retarded boundary condition provide the odd line. This naturally links the two metric-matched maps to opposite causal orientations. The boundary action must show that the odd sign survives in a measurable response.

### Live C: enlarge the probe space

Add a pseudoscalar, axial or tensor probe with the correct gauge and Lorentz typing, calculate its mixing with the current plane, and then search for a rank-two quotient carrying \(1\oplus\mathrm{sgn}\).

### Exact stop: same-parity linear bridge

If both source coordinates carry the same source-label reversal parity, every exchange-equivariant linear map has rank at most one. This branch is closed.

### Type stop: cone isomorphism as CP map

An invertible real matrix matching two quadratic forms is not a completely positive operator intertwiner. This inference is closed.

## 6. Claimipedia boundary

The publishable claim is the conditional classification:

> The Ward-protected axis and free ultraviolet metric reduce a source-to-face isometry to two orientation-related maps, but exchange/CP equivariance is full rank only if the source plane contains a relative odd line not supplied by the bare incidence and \(B-L\) vector-current pair.

The non-publishable overclaim is:

> The Standard Model currents have been identified with the two Furey faces.

They have not.

## Reproducibility

```powershell
node scripts\classify_frontier_source_to_face_intertwiners.mjs
```

## Dependencies

- [source/topology route separation](programme_closure_05_the_source_first_and_topology_first_routes_meet_only_at_an_abstract_cone.md)
- [free ultraviolet metric](programme_closure_06_the_free_standard_model_uv_cut_fixes_a_relative_metric_but_not_the_physical_ports.md)
- [Furey exchange as a two-topology correspondence](621_the_hermitian_furey_selector_is_a_two_topology_correspondence.md)
- [even/odd Furey response axes](709_fureys_su3_stabilizer_leaves_a_circle_of_clifford_response_lines_until_conjugation_parity_selects_an_axis.md)
- [flux-orientation torsor](800_flux_reversal_exchanges_the_two_global_furey_to_projector_assignments_so_the_last_bit_is_an_orientation_torsor.md)

