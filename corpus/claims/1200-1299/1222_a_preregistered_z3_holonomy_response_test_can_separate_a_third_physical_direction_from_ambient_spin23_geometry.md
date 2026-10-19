# A preregistered \(Z_3\)-holonomy response test can separate a third physical direction from ambient \(Spin(2,3)\) geometry

**Date:** 19 October 2026  
**Status:** exact observable construction and synthetic-control certificate; no microscopic defect-to-stress coupling or physical data  
**Role in the corpus:** executable resolution of candidate-action blocker A11 into a bounded falsification protocol

## Result in one sentence

For three controlled \(Z_3\) sectors, fixed positive two-probe response matrices admit a preregistered first-harmonic transverse statistic that is zero for every two-form-factor plane family, nonzero for a synthetic third-direction family, invariant in rank under one common nonsingular probe recalibration, and insensitive to one sector-independent additive contact matrix; passing this test would advance the programme beyond *ambient geometry*, but would not by itself establish a microscopic \(Spin(2,3)\) symmetry.

## 1. The everyday picture

Imagine repeatedly measuring objects on a table with the same two rulers. Ordinary
objects happen to lie on one sheet of card. Rotating a label through three settings
does not become new geometry merely because the measured lengths change.

A meaningful result requires an object to lift reproducibly off the card when—and
only when—the controlled three-position switch is changed. The rulers must not be
replaced between settings, and a constant warp in the tabletop must not be mistaken
for the lift.

Here:

- the card is the ordinary two-form-factor response plane;
- the two rulers are the fixed physical probes;
- the three-position switch is the prepared \(Z_3\) holonomy sector;
- a fixed tabletop warp is a sector-independent contact contribution;
- lifting off the card is a third linearly independent response direction.

## 2. Preregistered objects

For sector \(h\in\{0,1,2\}\) and frequency \(\omega\), measure the real symmetric
spectral response

\[
C_h(\omega)=
\begin{pmatrix}
C_{11}&C_{12}\\
C_{12}&C_{22}
\end{pmatrix}\succeq0.
\]

Use Frobenius-compatible coordinates

\[
v(C)=(C_{11},C_{22},\sqrt2 C_{12}).
\]

The ordinary parity-even, fixed-probe vacuum response has

\[
C(\omega)=\rho_2(\omega)G_2+\rho_0(\omega)G_0.
\]

The plane must be fixed from the tensor projectors or from an independent training
set before the holonomy labels are revealed. Its unit normal is

\[
w={v(G_2)\times v(G_0)\over
\|v(G_2)\times v(G_0)\|}.
\]

Two diagnostics are recorded. The first is the cone-depth diagnostic

\[
\rho_h(\omega)={\det C_h(\omega)\over \operatorname{tr}C_h(\omega)^2},
\qquad 0\le\rho_h\le {1\over4}.
\]

The second is the signed fixed-coordinate plane residual

\[
\ell_h(\omega)={w\cdot v(C_h(\omega))\over\|v(C_h(\omega))\|}.
\]

Neither scalar is promoted to a general calibration invariant. They are meaningful
only after the same probe basis has been calibrated and frozen across all sectors.

## 3. The \(Z_3\) correlation statistic

Let \(\theta_h=2\pi h/3\). Form the two real first-harmonic contrasts

\[
D_c={2\over3}\sum_h\cos\theta_h\,C_h,
\qquad
D_s={2\over3}\sum_h\sin\theta_h\,C_h.
\]

The preregistered transverse amplitude is

\[
\boxed{
A_\perp(\omega)=
{\sqrt{[w\cdot v(D_c)]^2+[w\cdot v(D_s)]^2}
\over {1\over3}\sum_h\|v(C_h)\|}.}
\]

This does not assume whether the physical response is the cosine or sine phase of
the three-sector control. If every sector remains in
\(\operatorname{span}\{G_2,G_0\}\), both numerator terms vanish exactly. A
nonzero value therefore measures a holonomy-correlated component transverse to
the frozen plane rather than a generic change of response magnitude.

## 4. Identifiability conditions

The experiment or calculation is interpretable only if all of the following hold:

1. \(G_2\) and \(G_0\) are independently fixed and linearly independent.
2. The two probe definitions, frequency grid, contact prescription and calibration
   map have identical hashes in all three sectors.
3. The common probe calibration map is nonsingular.
4. Every retained \(C_h(\omega)\) is positive semidefinite within a declared
   numerical or measurement tolerance.
5. At least three independent runs are made per sector in randomized order.
6. The response span has a resolved third singular direction, not merely a best-fit
   residual below the numerical or experimental floor.
7. At least two frequency bins and two independent replications pass the frozen
   threshold and multiple-testing rule.

Outcome Dynamics may supply a numerical observable only after its element, mass,
lateral and support representation gates close. Checkpoint 194 still has an open
mass/mesh gate, so its present output cannot be used as A11 physical evidence.

## 5. Controls and invariants

### Common calibration

A common change of probe coordinates has

\[
C_h\mapsto A C_h A^T,
\qquad \det A\ne0.
\]

The numerical values of \(\rho\) and \(\ell\) generally change under arbitrary
\(A\). The following stronger checks do not:

- the dimension of the linear span of the response matrices;
- exact linear dependence coefficients;
- \(\det C_h/\det C_0\) at fixed frequency;
- \(\operatorname{tr}(C_0^{-1}C_h)\) when \(C_0\) is positive definite.

The primary fixed-coordinate statistic and these common-congruence invariants must
tell a compatible story. A sector-dependent calibration is disqualifying.

### Contact terms

Spectral discontinuities are preferred because local polynomial contact terms are
absent. If a raw response must be used and the same additive contact matrix \(K\)
appears in every sector, then

\[
(C_h+K)-(C_0+K)=C_h-C_0.
\]

Sector contrasts therefore cancel \(K\). If the inferred transverse result changes
with an admissible contact prescription, it fails rather than becoming evidence.

### Required negative controls

- sham switching with holonomy unchanged;
- forward and reverse sector order;
- matched temperature, drive, geometry and material state;
- pre/post probe calibration;
- a two-form-factor synthetic null passed through the complete analysis;
- an independent implementation or experimental replication.

## 6. Exact synthetic certificate

The verifier constructs fixed positive matrices \(G_2,G_0,G_x\), with \(G_x\)
transverse to the reference plane.

The null fixture changes with sector but always has

\[
C_h=a_hG_2+b_hG_0,
\qquad a_h,b_h\ge0.
\]

It remains positive, has response-span rank two and gives \(A_\perp=0\) to floating
point tolerance.

The positive fixture adds

\[
\gamma_hG_x,
\qquad
\gamma_h>0
\]

with a \(Z_3\) first harmonic. It remains positive, has response-span rank three and
crosses the preregistered transverse threshold. The certificate additionally
checks cancellation of a common contact matrix and preservation of rank,
determinant ratios and relative traces under a common nonsingular calibration.

This establishes that the protocol can distinguish its declared synthetic null
and positive cases. It is not physical evidence for the positive case.

## 7. Decision table

| Outcome | Decision |
|---|---|
| Positivity fails | Invalid estimator, convention or physical-state construction; stop and repair |
| Probe/contact/calibration identity changes by sector | Confounded; reject the run |
| Reference plane has rank below two | Test is not identifiable; redesign probes |
| Sham switch produces transverse signal | Instrumental or numerical systematic; reject the run |
| Physical span stays at rank \(\le2\) with adequate power | A11 is null in the preregistered window; retain ambient-only reading |
| Rank three appears but does not track \(Z_3\) | Additional ordinary response structure, not the proposed branch signature |
| Rank three tracks \(Z_3\) but disappears under contact/calibration controls | Artifact; reject |
| Positive, replicated, controlled \(Z_3\)-correlated rank-three response | Operational A11 advance; require microscopic derivation next |

## 8. What would falsify the branch

Once a microscopic defect-to-stress coupling predicts an effect region and
frequency window, two independent implementations with at least 90% power that
bound \(A_\perp\) below that region falsify that A11 realization. The branch also
fails if the only apparent transverse direction requires sector-dependent probes,
contact terms or calibration, or if the proposed holonomy cannot be prepared and
distinguished.

At present no microscopic coupling fixes an effect size or frequency dependence.
Consequently a null result now can rule out the tested operational realization,
but cannot honestly rule out every possible \(Spin(2,3)\) theory. This limitation is
part of the preregistration, not an escape clause added after the result.

## 9. What would advance Spin(2,3) beyond ambient geometry

The minimum empirical advance is:

1. positive holonomy-resolved spectral matrices from exactly the same two probes;
2. a held-out, resolved rank-three response family;
3. nonzero \(A_\perp\) reproducibly locked to the prepared \(Z_3\) sector;
4. null sham/contact/calibration controls;
5. independent replication; and
6. a microscopic action that predicts the observed sector harmonic without using
   it as a fitted input.

Items 1--5 show that the physical family explores more than the ordinary plane.
Item 6 connects that fact to this programme. Even all six would establish a new
response structure, not yet the full \(Sp(4,\mathbb R)\) or \(Spin_0(2,3)\) as a
dynamical symmetry. That stronger claim would additionally require a source-derived
group action mapping probes, thresholds and the complete measured response family
into themselves.

## 10. Programme verdict

Blocker A11 has moved from an evocative target to a preregisterable test. It has
not moved from `missing` to `passed`: the microscopic coupling, preparation,
physical spectra and independent data remain absent.

The protocol makes the possible wrong-way result explicit. If every controlled
physical response remains on a one- or two-dimensional slice, then \(Spin(2,3)\)
is an elegant geometry of the containing cone rather than an observed engine of
the dynamics.

## Evidence

- [Machine-readable protocol](../../../evidence/data/spin23-a11-observable-protocol.json)
- [Synthetic-control verifier](../../../verification/verify/verify_spin23_a11_observable_protocol.mjs)
- [Ambient-plane obstruction](../0200-0299/208_stress_spectral_family_dimension_and_ambient_sp4_obstruction.md)
- [Conserved-stress response carrier](../0200-0299/206_conserved_stress_spectral_quotient_to_h2_response.md)
- [Candidate-action pilot](../../programmes/closure/spin23-action-pilot/candidate-action-v1.json)
- [Outcome Dynamics numerical boundary](1219_outcome_dynamics_consistent_mass_converges_but_disagrees_with_lumped_mass_so_the_gate_remains_open.md)
