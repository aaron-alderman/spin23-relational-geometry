# Two-Port Transport-Gauge Obstruction and the Three-Port Loop Escape

**Date:** 17 October 2026  
**Branches:** B02, B04, B06, B08 and B11  
**Claim status:** exact response-phase and Gram-matrix result; physical network realization remains open

## 1. Reassessing the two-frequency area

The normalized two-port observable

\[
\mathcal A(\omega_1,\omega_2)
=
\operatorname{Im}
\left[c(\omega_1)\overline{c(\omega_2)}\right]
\]

is invariant under a frequency-independent relative phase of the two ports. That is not the most general calibration freedom in a distributed response experiment.

Each port may have a clock delay or reference-plane displacement. Such a change produces a frequency-dependent phase. The observable is therefore not transport-gauge invariant until a connection between frequency fibers or a canonical propagation convention is supplied.

## 2. Reciprocal delay produces a nonzero area

Take the simplest lossless reciprocal link with normalized cross-coherence

\[
c(\omega)=e^{i\omega\tau},
\]

where \(\tau\) is a propagation delay. Then

\[
\mathcal A(\omega_1,\omega_2)
=
\sin\left[(\omega_1-\omega_2)\tau\right].
\]

This can be nonzero in a completely CP-even, reciprocal scalar system. Nonzero two-frequency area therefore does not by itself imply microscopic orientation breaking or restoration of a \(Spin(2,4)\) parent.

## 3. Delay-gauge transformation

Under independent port-clock shifts \(t_a\mapsto t_a+\tau_a\), the cross-coherence transforms as

\[
c_{12}(\omega)
\mapsto
e^{i\omega(\tau_1-\tau_2)}c_{12}(\omega).
\]

Choosing \(\tau_1-\tau_2=-\tau\) makes the reciprocal example real at every frequency. The earlier area is invariant only under the restricted subgroup with frequency-independent phase.

This does not make it useless. It means one must specify one of:

1. calibrated physical port clocks;
2. a geometric parallel transport between ports;
3. subtraction of a known vacuum propagation phase;
4. a loop observable in which local phases cancel.

## 4. Three-port closure phase

For a positive three-port spectral matrix \(\rho(\omega)\), define normalized coherences

\[
c_{ab}
=
\frac{\rho_{ab}}
{\sqrt{\rho_{aa}\rho_{bb}}}.
\]

The loop product is

\[
\boxed{
\mathcal B_{123}(\omega)
:=
c_{12}(\omega)c_{23}(\omega)c_{31}(\omega).
}
\]

Under arbitrary local phase conventions, even frequency dependent,

\[
c_{ab}\mapsto e^{i(\phi_b-\phi_a)}c_{ab},
\]

and therefore

\[
\mathcal B_{123}\mapsto\mathcal B_{123}.
\]

Its imaginary part

\[
\mathcal O_{123}:=\operatorname{Im}\mathcal B_{123}
\]

is an orientation-odd, transport-gauge-invariant loop observable. Reversing the loop order complex conjugates \(\mathcal B\) and flips \(\mathcal O\).

## 5. Rank-one carrier gives no loop orientation

If the spectral matrix at a frequency has rank one,

\[
\rho_{ab}=v_a\overline{v_b},

\]

then

\[
c_{12}c_{23}c_{31}=1
\]

whenever all components are nonzero. The loop phase vanishes.

A nonzero \(\mathcal O_{123}\) therefore requires at least rank-two coherent spectral structure. It detects relational incompatibility among three pairwise coherences, not merely phase accumulation along one carrier mode.

## 6. Positive rank-two example

Let three normalized port vectors in \(\mathbb C^2\) be

\[
v_1=(1,0),
\quad
v_2=\frac1{\sqrt2}(1,1),
\quad
v_3=\frac1{\sqrt2}(1,i).
\]

Their Gram matrix is positive semidefinite with rank two. Its coherences satisfy

\[
c_{12}=\frac1{\sqrt2},
\quad
c_{23}=\frac{1+i}{2},
\quad
c_{31}=\frac1{\sqrt2},
\]

so

\[
\mathcal B_{123}=\frac{1+i}{4},
\qquad
\mathcal O_{123}=\frac14.
\]

This is a positive response with a nonzero intrinsic loop orientation.

## 7. Relation to the relational-carrier narrative

A single two-face carrier has one off-diagonal relationship but no closed phase loop. Three ports carry three pairwise relationships:

\[
(12),\ (23),\ (31).
\]

Their product is the first local-phase-invariant orientation holonomy. This gives precise mathematical content to the heuristic “one carrier, two faces, three relationships” only after distinguishing:

- one \(H_2\) edge for each pair;
- a three-edge network for the loop;
- composition/parallel transport as extra structure beyond one \(H_2\) cone.

Jordan-triple recursion may be relevant to how pairwise carriers compose, but the loop invariant does not by itself derive \(Sp(4,\mathbb R)\).

## 8. Stress-response interpretation

For smeared stress operators \(T[f_a]\), a positive spectral Gram matrix has entries

\[
\rho_{ab}(s)
=
\sum_n
\langle0|T[f_a]|n\rangle
\langle n|T[f_b]|0\rangle
\delta(s-m_n^2).
\]

Three smearings or boundary ports can therefore define \(\mathcal B_{123}\) without introducing a flavor portal. A nonzero loop phase would require at least two contributing spectral amplitudes with nontrivial relative geometry.

The next physical task is to choose conserved, gauge-invariant stress smearings for which the loop cannot be removed by spacetime translation or a trivial reference-plane choice.

## 9. Consequences for the earlier observable

The two-frequency area remains valid under a fixed calibrated connection, but its claim status must be narrowed:

- it tests phase curvature relative to the chosen port transport;
- ordinary propagation delay can source it;
- it is not invariant under arbitrary frequency-dependent port gauges;
- a loop closure phase or explicit parallel transporter is needed for an intrinsic network observable.

This is a refinement, not a deletion, of the earlier response branch.

## 10. Stop-everything and falsification gates

**Intrinsic stress loop:** a source-derived three-port stress response has nonzero \(\mathcal O_{123}\) after all geometric propagation phases are accounted for.

**Jordan composition:** the pairwise \(H_2\) carriers and their sewing law uniquely determine the loop holonomy.

**Rank-one theorem:** every admissible fundamental response residue is rank one, forcing all loop orientations to vanish. Then orientation can arise only through mixtures or interactions.

**Calibration failure:** every observed two-frequency area is removable by port delays and every loop phase vanishes. Then the earlier area contains no intrinsic orientation data.

**Nonuniversality:** different stress smearings give arbitrary unrelated loop phases with no source-derived selection principle.

## 11. Certificate

The [transport-gauge/loop certificate](../../../verification/verify/verify_two_port_transport_gauge_and_three_port_loop.mjs) verifies the reciprocal-delay counterexample, its removal by a delay gauge, local-phase invariance and orientation reversal of the three-port product, rank-one triviality, and a positive rank-two Gram example with loop area \(1/4\).

## Companion documents

- [Dimensionless two-frequency orientation observable](189_dimensionless_two_frequency_orientation_observable.md)
- [Spectral wedge and phase curvature](137_spectral_wedge_and_phase_curvature.md)
- [Finite-walk two-port response](156_walk_two_port_h2r_boundary_response.md)
- [Scalar interval response](../0000-0099/64_scalar_interval_dirichlet_to_neumann_branch.md)
