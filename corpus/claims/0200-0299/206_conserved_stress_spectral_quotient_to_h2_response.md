# Conserved-Stress Spectral Quotient to an \(H_2(\mathbb R)\) Response

**Date:** 17 October 2026  
**Branches:** B01, B02, B04, B06, B07 and B11  
**Claim status:** exact Euclidean spin-projector prototype; full Standard-Model spectral densities and contact terms remain open

## 1. Stress-tensor Ward identity

For a conserved symmetric stress tensor at nonzero Euclidean momentum,

\[
q^\mu T_{\mu\nu}(q)=0.
\]

Its positive spectral kernel acts on the ten-dimensional real space of symmetric rank-two sources. Conservation restricts physical spectral support to transverse symmetric tensors.

Define

\[
\theta_{\mu\nu}
=\delta_{\mu\nu}
-\frac{q_\mu q_\nu}{q^2}.
\]

In four dimensions, the transverse symmetric space has dimension six and decomposes into spin-two and scalar-trace sectors of dimensions five and one.

## 2. Euclidean spin projectors

For a symmetric source \(h_{\rho\sigma}\), define

\[
(P_0h)_{\mu\nu}
=\frac13\theta_{\mu\nu}
\theta^{\rho\sigma}h_{\rho\sigma},
\]

and

\[
P_2h
=\theta h\theta-P_0h.
\]

They obey

\[
P_0^2=P_0,
\qquad
P_2^2=P_2,
\qquad
P_0P_2=0,
\]

with

\[
\operatorname{rank}P_0=1,
\qquad
\operatorname{rank}P_2=5.
\]

The remaining four symmetric directions contain at least one longitudinal index and lie in the Ward null space.

## 3. Positive stress spectral block

A general parity-even positive Euclidean stress spectral block has the form

\[
C_T(q)
=\rho_2(q^2)P_2
+\rho_0(q^2)P_0,
\]

with

\[
\rho_2\ge0,
\qquad
\rho_0\ge0.
\]

For strictly positive spectral weights on both sectors, the Moore--Penrose inverse is

\[
C_T^+
=\rho_2^{-1}P_2
+\rho_0^{-1}P_0.
\]

The four longitudinal directions remain null.

## 4. Conserved stress probes

Let \(f_a^{\mu\nu}\), \(a=1,2\), be two real symmetric probe profiles satisfying

\[
q_\mu f_a^{\mu\nu}=0.
\]

After expressing them as rows of a coupling matrix \(B\), conservation gives

\[
B\ker C_T=0.
\]

Thus the stress Ward identity again supplies exactly the range condition required for singular Peirce--Schur reduction.

For direct/contact response \(A=A^T\), the effective two-probe kernel is

\[
\boxed{
R_2
=A-BC_T^+B^T.
}
\]

If the combined spectral/contact kernel is positive, then

\[
R_2\in H_2(\mathbb R)_+.
\]

## 5. Conformal and massive cases

For a traceless conformal stress tensor, the spin-zero spectral weight vanishes:

\[
\rho_0=0.
\]

The transverse trace direction becomes an additional null mode. A valid conformal probe must then be traceless as well as conserved, or the trace component must be retained rather than eliminated.

In a massive or nonconformal theory, \(\rho_0\) can be nonzero because the trace couples to scalar states. The quotient support then contains all six transverse symmetric directions.

This distinction prevents one from using one universal pseudoinverse across conformal and massive phases.

## 6. Longitudinal failure

If a source profile violates

\[
q_\mu f^{\mu\nu}=0,
\]

it couples to a Ward-null direction. The block kernel becomes indefinite, and regulating the longitudinal projector generates a \(1/\varepsilon\) Schur divergence.

The same diagnostic found for vector currents therefore persists on the full stress-source space.

## 7. Relation to the Standard Model stress tensor

The Standard Model stress tensor contains gauge, fermion, Higgs, improvement and gauge-fixing contributions. A physical spectral calculation must include:

- a gauge-invariant or BRST-consistent stress operator;
- conserved contact terms;
- spin-two and spin-zero spectral densities;
- threshold and absorptive structure;
- possible trace anomaly contributions;
- the chosen two probe smearings.

The projector theorem fixes the kinematic quotient. It does not calculate \(\rho_2\), \(\rho_0\) or the contact matrix \(A\).

For fixed probes, the resulting spectral family spans at most the two matrices obtained by projecting \(P_2\) and \(P_0\); it does not generically explore all three dimensions of \(H_2(\mathbb R)\). See [Stress spectral-family dimension and the ambient Sp(4) obstruction](208_stress_spectral_family_dimension_and_ambient_sp4_obstruction.md).

## 8. Why this is closer to the original thesis

The carrier is now derived from stress spectral data rather than an arbitrary scalar stiffness:

\[
\text{conserved stress spectrum}
\longrightarrow
\text{physical transverse quotient}
\longrightarrow
\text{two-probe positive response}
\longrightarrow
H_2(\mathbb R)_+.
\]

The route is mathematically legal. Its predictivity depends on whether the two probes and their contact terms are fixed by physical boundary conditions rather than chosen freely.

## 9. Lorentzian qualification

Euclidean spectral positivity does not make the raw Lorentzian stress tensor a positive matrix. In real time, the appropriate structures are positive spectral measures on physical states, reflection positivity after continuation, or passive retarded response.

Massless poles and gauge modes must be separated before taking zero-momentum limits.

## 10. Stop-everything and falsification gates

**Full Standard-Model calculation:** explicit \(\rho_2\) and \(\rho_0\) produce a two-probe response whose scale or orientation is not removable by contact counterterms.

**Canonical probes:** causal boundaries, detectors or asymptotic fluxes select exactly two conserved stress smearings.

**Trace prediction:** the spin-zero channel links Higgs/trace-anomaly data to a measurable Jordan-response invariant.

**Counterterm failure:** arbitrary conserved local terms in \(A\) span all of \(H_2(\mathbb R)\), eliminating predictive content.

**Ward failure:** a claimed carrier depends on longitudinal regulator, gauge fixing or a nonconserved stress operator.

## 11. Certificate

The [conserved-stress quotient certificate](../../../verification/verify/verify_conserved_stress_h2_response.mjs) builds the ten-dimensional symmetric-tensor representation, verifies spin-projector ranks and orthogonality, constructs the pseudoinverse spectral block, produces a positive \(H_2\) response from two conserved probes and detects longitudinal indefiniteness and regulator divergence.

## Companion documents

- [Conserved-current Ward quotient](205_conserved_current_ward_quotient_to_h2_response.md)
- [Standard Model as stress-energy](../0000-0099/01_standard_model_as_stress_energy_full_analysis.md)
- [Stress-energy reduction gate](../0000-0099/46_stress_energy_to_jordan_carrier_reduction_gate.md)
- [Peirce--Schur triple recursion](202_peirce_schur_triple_recursion_to_spin23.md)
