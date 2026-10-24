# Finite-q energy-continuity kernel and gauge boundary

**Date:** 24 October 2026  
**Status:** nonzero-q longitudinal operator kernel admitted; thermodynamic gauge convergence open  
**Target:** [FPT-004](../frontier-physics-targets/frontier_physics_target_assessments_v1.md#fpt-004)  
**Parent:** [AZ-043](admissibility_43_coulomb_twist_differentiability_and_finite_q_boundary.md)  
**Evidence:** [Machine-readable execution register](../../../evidence/data/admissibility-planckian-finite-q-energy-continuity-v1.json)
**Continuation:** [AZ-045](admissibility_45_finite_q_odd_torus_gauge_ladder.md) executes the first odd-size gauge-convergence ladder.

## Decision

The first route around the nondifferentiable Coulomb zero mode is executable. For every nonzero lattice wavevector, a periodic energy-density mode (h(q)) defines its longitudinal scalar current without any derivative through (q=0):

\[
\dot h(q)+i|q|j_L(q)=0,
\qquad
j_L(q)=-\frac{[H,h(q)]}{|q|}.
\]

The production 3x3 oracle now evaluates this identity in two declared energy-density gauges. The centre gauge uses the existing tagged-term centres. The endpoint gauge shares every term equally over its support sites; for the Ewald density interaction this is exactly equivalent to the reciprocal-density energy mode.

At the lowest nonzero x wavevector (q_{\min}=2\pi/3), the centre- and endpoint-gauge continuity residuals are (1.26\times10^{-15}) and (2.02\times10^{-15}). Endpoint mode and scalar-current conjugation residuals are exactly zero. The operator kernel therefore passes its finite-q definition gate.

## Reciprocal-density closure at every finite mode

For endpoint allocation, the interaction mode has both an exact pair form and an exact reciprocal form:

\[
h_V(q)=\frac14\sum_{ij}
\left(e^{-iq\cdot r_i}+e^{-iq\cdot r_j}\right)V_{ij}Q_iQ_j
=\frac{1}{4N}\sum_p\left(V_p+V_{q-p}\right)\rho_{q-p}\rho_p.
\]

All nine modes of the 3x3 Brillouin grid agree between those forms. The maximum residual on the occupation oracle is (4.56\times10^{-15}). This closes the reciprocal-density construction at finite q without restoring or differentiating the removed Coulomb zero mode.

An independent open-chart control takes a continuous small wavevector (q=10^{-6}). Its finite-q centre-gauge current approaches the energy-polarization current (i[H,P_E]) with relative residual (1.57\times10^{-6}), as required by the expansion (h(q)=H-iqP_E+O(q^2)). This checks the sign and normalization of the continuity current.

## The remaining gauge boundary

Exact continuity is necessary but not sufficient for a bulk transport current. On the 3x3 production oracle at (q_{\min}),

| Quantity | Centre gauge | Endpoint gauge | Difference norm |
|---|---:|---:|---:|
| energy-density mode | — | — | 8.7018 |
| longitudinal current | 13.8269 | 11.9522 | 9.7475 |

The two gauges are therefore not interchangeable at this system size and wavevector. This is not a contradiction: local energy-density gauges may differ by bounded redistribution terms while their bulk thermal conductivities converge. Quantum gauge invariance of thermal conductivity supplies the conventional control, but the present long-range model still has to demonstrate its hypotheses and order of limits rather than assume them. [Hübner, Rigamonti and Draxl 2023](https://doi.org/10.1103/PhysRevB.108.245201). Finite-wavevector energy density and the continuity equation are also established routes to thermal-current operators in interacting lattice work. [Werman et al. 2018](https://doi.org/10.1103/PhysRevX.8.031064). Density-fluctuation approaches provide a useful flux-ambiguity cross-check. [Cheng and Frenkel 2020](https://doi.org/10.1103/PhysRevLett.125.130602).

## Admissibility map

- **filled:** exact (h_V(q)) in real-pair and reciprocal-density forms at every finite torus mode;
- **filled:** exact longitudinal continuity current for any declared energy-density gauge at (q\ne0);
- **filled:** conjugation and open small-q normalization controls;
- **unfilled:** convergence of centre, endpoint and screened gauges as (q_{\min}\to0) and (L\to\infty);
- **unfilled:** commutation of thermodynamic, screening, frequency and broadening limits;
- **unfilled:** transverse current, which continuity alone never determines;
- **withheld:** a new uniform rank or thermoelectric atlas.

## Next admitted tranche

The next computation is a size ladder, not another 3x3 convention choice:

1. construct odd periodic clusters or algebraic operator moments at (L=3,5,7,\ldots);
2. evaluate centre, endpoint and screened finite-q currents at (q_{\min}=2\pi/L);
3. compare gauge differences using normalized equal-time moments before attempting full spectra;
4. test both orders (L\to\infty) then screening (\mu\to0), and screening then size;
5. run block/cross spectra only on sequences whose operator moments converge to the same limit.

## Corpus adjudication

The frontier has moved from an undefined uniform twist to a defined family of nonzero-q operators. The large 3x3 gauge separation is a useful bound, not anomalous physics. Only persistent disagreement after controlled long-wavelength and screening limits could reopen a new-physics interpretation; nothing here advances Spin(2,3).
