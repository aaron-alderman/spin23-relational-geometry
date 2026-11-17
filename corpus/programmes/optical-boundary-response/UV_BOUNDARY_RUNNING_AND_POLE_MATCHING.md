# UV boundary conditions, running and physical pole matching

**Date:** 8 November 2026  
**Status:** bounded current-input audit and scalar-channel threshold/matching calculation; no derived UV action or physical T1/T2 pole ratio  
**Parent:** [joint background and kinetic-protection investigation](JOINT_BACKGROUND_VACUUM_AND_KINETIC_PROTECTION.md)  
**Evidence:** [UV/pole audit](../../../evidence/data/uv-boundary-running-pole-matching-v1.json), [source-check receipts](../../../evidence/data/uv-pole-source-checks-v1.json)  
**Certificate:** [threshold/matching verifier](../../../verification/verify/verify_uv_boundary_running_pole_matching.py)

The request now needs one microscopic theory, not another isolated coefficient identity. A pole-mass prediction requires its action, independently fixed boundary data, quantization, beta functions, heavy spectrum and matching, vacuum/tadpole prescription, and physical scalar/fermion two-point functions on the same carrier.

## 1. What the inspected corpus actually contains

| Candidate | Positive result | Remaining boundary for this investigation |
|---|---|---|
| [Radiative selector portal, 1612](../../claims/1600-1699/1612_a_radiative_selector_portal_joins_spin23_planck_and_yang_mills_scales_but_retains_one_color_boundary.md) | Positive one-loop scalar vacuum and joined scale relations at a supplied benchmark | Absolute transmutation scale, dimensionless inputs and a full covariant parent remain supplied/open; no T1/T2 radial/fermion pole packet |
| [Gauge–gravity fixed point, 1616](../../claims/1600-1699/1616_asymptotic_safety_can_conditionally_fix_the_color_boundary_but_not_without_a_spin23_universality_class.md) | A declared beta system can remove one color integration constant on its critical trajectory | The beta coefficients and Spin(2,3) universality class are not derived; this is not the beta system for \(y,c_{\rm kin},c_4\) |
| [Critical PGT/UV audit, 1760](../../claims/1700-1799/1760_both_surviving_routes_now_end_at_new_construction_not_unexecuted_local_inference.md) | The existing local quantization and quadratic one-loop routes have been audited | The unchanged-spectrum local fundamental route fails; an enlarged/nonperturbative theory or stabilized microscopic vacuum is new construction |
| [Fixed-point identifiability, 1745](../../claims/1700-1799/1745_the_known_rg_slice_cannot_identify_an_interacting_one_eighth_axial_fixed_point.md) | Explicit beta completions share the known slice but disagree on the fixed point and slope | Missing beta rows cannot be reconstructed from a neighbouring coupling or a fixed-point label |
| [Complete-beta gate, 1746](../../claims/1700-1799/1746_the_fixed_point_escape_is_reduced_to_a_complete_beta_and_matching_packet.md) | Defines the necessary joined fixed-point, stability, positivity and matching packet | That packet is not supplied by the declared programme |

The color and axial examples have different fields and observables from the present link/radial problem. Their calculations cannot be relabelled as its Yukawa running. Nor does a stable classical polynomial potential establish a UV-complete quantum theory.

The critical-PGT rejection concerns that fixed local gravitational spectrum. It is not a universal exclusion of a newly constructed scalar or enlarged UV model.

This is a bounded retrieval conclusion about the inspected corpus and its declared routes, not a proof against every possible UV completion. The requested full running and threshold calculation is not presently well posed from those inputs. This continuation does not invent beta functions or silently supply a new microscopic action.

## 2. The pole calculation that would be required

After canonicalization, the physical scalar poles solve the determinant of its full momentum-dependent inverse propagator, not the zero-momentum potential Hessian alone. Fermion poles likewise require the full kinetic and mass self-energy matrices. Tadpole and mixing terms must be included consistently.

For a stable one-channel comparison, define

\[
M_f=m_f(\mu)(1+\delta_f),\qquad
M_r^2=m_r^2(\mu)(1+\delta_r).
\]

At first order,

\[
\frac{M_f}{M_r}
=\frac{m_f(\mu)}{m_r(\mu)}
\left(1+\delta_f-\frac12\delta_r\right).
\]

In the closed classical ansatz, running its tree combination gives

\[
\frac{d\log R_{\rm tree}}{d\log\mu}
=\frac{\beta_y}{y}
+\frac12\frac{\beta_{\rm kin}}{c_{\rm kin}}
-\frac12\frac{\beta_4}{c_4}.
\]

Finite threshold matching and finite self-energies are additional terms, not determined by this derivative. The displayed ansatz itself may cease to be closed when extra invariants or modes are generated. A complete prediction should be unchanged by a consistent change of renormalization scheme and independent of the arbitrary matching scale to the calculated order.

For unstable radial excitations a complex-pole prescription is needed. [Grassi–Kniehl–Sirlin](https://arxiv.org/html/hep-ph/0109228), sections 1–2, explain pole-based mass definitions, threshold issues and the role of tadpoles in gauge consistency. The matrix potential's curvature is not a substitute for that construction.

## 3. The tree ratio sits at an actual two-particle threshold

If a canonically normalized real radial scalar \(h\) couples through \(-g h\bar\psi\psi\), its allowed fermion-pair channel begins at

\[
s=4M_f^2.
\]

The spin trace and two-body phase space give

\[
\Gamma_{h\to f\bar f}(\sqrt s)
=\frac{N g^2\sqrt s}{8\pi}
\left(1-\frac{4M_f^2}{s}\right)^{3/2}
\quad(s>4M_f^2),
\]

with zero width below threshold. Thus the classical relation \(m_r=2m_f\) lies at the opening of this channel when the vertex and quantum numbers permit it. This is not an inconsistency or an automatic divergence; it means the analytic continuation, finite mass shifts and possible width must be handled rather than identifying a curvature with a pole.

## 4. What a known cut still leaves free

The new calculation declares a single scalar-channel dispersive surrogate with fixed reference fermion mass \(M_f=1\), tree scalar squared mass \(m_{r,0}^2=4\), \(N=1\) and \(g=0.3\). These are model inputs in arbitrary units, not corpus-derived physical values. Fermion self-energies, other scalar/gauge loops, tadpoles, heavy thresholds and the target model's RG flow are not calculated in this surrogate.

In the convention \(\Gamma_r(s)=s-m_{r,0}^2+\Pi_R(s)\), use the positive absorptive weight

\[
\rho(t)=\frac{N g^2t}{8\pi}
\left(1-\frac4t\right)^{3/2}\theta(t-4).
\]

A twice-subtracted self-energy is

\[
\Pi_R(s)=A+Bs+\frac{s^2}{\pi}
\int_4^\infty\frac{\rho(t)}{t^2(t-s-i0)}\,dt.
\]

Here \(A\) is a local mass-squared matching term and \(B\) a local kinetic matching term. The common cut fixes neither. Below threshold the integral is real; with \(z=\sqrt{1-4/t}\) it becomes

\[
\Pi_{\rm nonlocal}(s)=\frac{g^2s^2}{4\pi^2}
\int_0^1\frac{z^4}{4-s+sz^2}\,dz.
\]

The saved benchmark solves the stable below-threshold root of \(\Gamma_r(s)=0\), checks its positive residue, and changes the supplied finite matching terms while preserving the cut. The scalar-channel pole ratio changes. This demonstrates the missing finite input, not an uncertainty within a fully specified UV theory.

It is also not a pure scheme change: holding the renormalized tree parameter fixed while changing \(A\) compares different matching data. A compensating transformation \(A\mapsto A+\delta\), \(m_{r,0}^2\mapsto m_{r,0}^2+\delta\) leaves the inverse propagator and pole unchanged. The verifier checks that control explicitly. Choosing \(A\) from the desired pole would be fitting the target; deriving it from a fixed UV action would be legitimate prediction.

## 5. Decision and stopping boundary

The corpus supplies useful separate modules: conditional scale generation, fixed-point trajectory examples, kinetic and source typing, threshold controls and a classical mass-ratio identity. It does not supply the stable full UV action and independently fixed boundary data that join them into this pole-mass prediction.

The new threshold calculation exposes exactly where finite information is required. It is not the missing physical loop calculation, and its numerical ratios must not be reported as Spin(2,3) predictions. No justified numerical RG correction for the target ratio follows from the current inspected inputs.

Further progress at this gate requires a new microscopic action or a supplied, fully specified UV model, followed by the complete beta/matching/self-energy calculation. Reusing the existing color or torsion toy beta systems, resetting the tree relation after each threshold, or defining finite subtractions from the target mass would not close the gate.
