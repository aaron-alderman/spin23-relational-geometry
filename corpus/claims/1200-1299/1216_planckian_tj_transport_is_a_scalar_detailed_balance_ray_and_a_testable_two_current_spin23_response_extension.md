# Planckian (t)-(J) transport is a scalar detailed-balance ray and a testable two-current (Spin(2,3)) response extension

**Date:** 19 October 2026  
**Status:** exact response-matrix algebra, current-construction rule and source-code audit; production periodic current remains open and no microscopic (Spin(2,3)) symmetry is derived
**Role in the corpus:** external transport test of the two-face/Jordan response carrier

## Result in one sentence

The Planckian (t)-(J) calculation supplies a clean scalar detailed-balance transport ray, while a genuine (H_2(\mathbb R)) response cone—and hence its kinematic (Sp(4,\mathbb R)\cong Spin_0(2,3)) conformal completion—would require the full positive two-current particle/energy spectral matrix; the existing public code does not yet construct the physical energy current.

## What the paper and code establish

The Nature Physics work reports broad strange-metal optical transport in the two-dimensional (t)-(J) model. Its low-frequency conductivity is organized by a detailed-balance factor of the form

\[
\sigma(\omega)=C_0\frac{1-e^{-\omega/T}}{\omega},
\]

with a nearly temperature-independent low-energy current spectrum and a charge diffusivity close to a quantum-limited scale. This is important evidence for incoherent, Planckian transport over a broad regime. It is not evidence by itself for a microscopic (Spin(2,3)) invariance: the model is a lattice Hamiltonian with its ordinary charge, spin and lattice symmetries, and the reported strange-metal regime is not identified with a unique (Spin(2,3))-controlled critical point.

The public exact-diagonalization/FTLM script computes a **single charge-current autocorrelation**. It contains no derived local energy current and no thermoelectric (2\times2) spectral matrix. Some transverse-current scaffolding is present, but it does not change this scalar status.

## The exact correspondence that is available

Let (J_N) be the particle current and (J_E) the physical energy current. At positive frequency define the spectral matrix

\[
C_{ab}(\omega)=\frac{\pi}{Z}\sum_{m,n}e^{-\beta E_n}
\langle n|J_a|m\rangle\langle m|J_b|n\rangle
\delta\!\left(\omega-E_m+E_n\right),
\qquad a,b\in\{N,E\}.
\]

For every complex vector (z),

\[
z^\dagger C(\omega)z\ge 0.
\]

Thus each frequency bin is a positive Hermitian (2\times2) response. In a real, time-reversal-compatible channel this reduces to

\[
C(\omega)=
\begin{pmatrix}
C_{NN} & C_{NE}\\
C_{NE} & C_{EE}
\end{pmatrix}
\in H_2(\mathbb R)_+,
\qquad
\det C=C_{NN}C_{EE}-C_{NE}^2\ge0.
\]

Writing (C=x^0I+x^1\sigma_x+x^2\sigma_z) gives

\[
\det C=(x^0)^2-(x^1)^2-(x^2)^2,
\]

so the positive cone is the future Lorentz cone in (2+1) dimensions. Its linear automorphisms include (SL(2,\mathbb R)) acting by congruence, while its conformal completion is (Sp(4,\mathbb R)\cong Spin_0(2,3)). This is an exact statement about the geometry of a two-current positive response cone. It does **not** imply that the (t)-(J) Hamiltonian has that group as a microscopic or dynamical symmetry.

The paper's scalar conductivity is only the (NN) entry: a ray or one face of this cone. Detailed balance multiplies the unsymmetrized spectrum by a common thermal factor and therefore acts radially when the same convention is used for all entries. It does not manufacture the missing (NE) and (EE) data.

## Thermoelectric operations have a clean geometric meaning

The heat current is

\[
J_Q=J_E-\mu J_N.
\]

Changing from ((J_N,J_E)) to ((J_N,J_Q)) is a triangular (GL(2,\mathbb R)) basis change. The response transforms by congruence,

\[
C\mapsto A C A^T,
\qquad
A=\begin{pmatrix}1&0\\-\mu&1\end{pmatrix},
\]

which preserves positivity and, because (\det A=1), preserves the determinant. Likewise, imposing an open-circuit condition removes the charge channel by a Schur complement. These are exact response-geometry operations and supply the most concrete present bridge between thermoelectric transport and the corpus's two-face Jordan language.

## Code experiment and its strict limitation

A diagnostic proxy revision is now visible in the authors' public repository. The audited script remains a scalar charge-current FTLM calculation; its proxy machinery is useful for plumbing tests but does not provide a physical thermoelectric matrix.

For validation only, it uses

\[
J_E^{\mathrm{proxy}}=\frac12\{H,J_N\}.
\]

This operator is useful for testing matrix plumbing, but it is **not** the physical lattice energy current. In an energy eigenbasis it gives matrix elements proportional to (E_m+E_n), so the supposed second channel is constrained to be an energy-centroid weighting of the first rather than an independently conserved flow. Any apparent cone boundary, interior or determinant collapse obtained from this proxy is therefore diagnostic, not physical evidence.

## The decisive next calculation

The physical gate is now specified in detail in the [physical energy-current construction packet](../../programmes/admissibility/admissibility_34_physical_energy_current_construction_gate.md). In brief:

1. choose a local decomposition (H=\sum_r h_r) compatible with the periodic (t)-(J) lattice;
2. construct an energy polarization (P_E=\sum_r x_r h_r), treating boundary terms consistently;
3. derive (J_E=i[H,P_E]), or equivalently derive it from the lattice continuity equation;
4. compute (C_{NN}(\omega)), (C_{NE}(\omega)), and (C_{EE}(\omega)) with the same FTLM samples and binning;
5. test Hermiticity, positivity, the determinant inequality and the normalized rank indicator
   \[
   \rho(\omega)=\frac{\det C(\omega)}{\operatorname{tr}(C(\omega))^2};
   \]
6. compare the temperature, doping, size and broadening dependence against null ensembles and proxy currents.

The informative outcomes are:

- (\rho\approx0) robustly: effectively one dissipative current mode, a boundary ray of the cone;
- (\rho>0) robustly: a genuine interior two-current response;
- positivity violations beyond numerical tolerance: estimator, convention or current-construction failure;
- approximate closure under a larger set of fractional-linear response transformations: evidence for emergent response covariance, still not a proof of microscopic (Spin(2,3)).

## Verdict

This correspondence is worth pursuing because it turns a broad algebraic motif into a falsifiable numerical observable. Its justified formulation is:

> Planckian (t)-(J) transport may realize a ray inside the positive two-current response cone whose conformal geometry is (Spin_0(2,3))-related.

The unjustified formulation is:

> The Nature Physics result demonstrates a hidden (Spin(2,3)) symmetry of the (t)-(J) model.

The first statement defines a concrete experiment. The second is not supported by the paper or by the present code.

## Sources and artifacts

- [Nature Physics article: “Strange metal behaviour from underlying bad metallicity”](https://www.nature.com/articles/s41567-026-03441-x)
- [Authors' Planckian-tJ repository](https://github.com/djfrat/Planckian-tJ)
- [Physical energy-current construction gate](../../programmes/admissibility/admissibility_34_physical_energy_current_construction_gate.md)
- [Terminal reflexive-closure audit](1203_terminal_reflexive_closure_audit_conditional_eft_closure_and_sharp_indeterminacy_of_absolute_flavour_selection.md)
- [Finite isotropic-link no-go](1215_any_number_of_fully_integrated_isotropic_links_remains_blind_to_the_complementary_frame.md)

