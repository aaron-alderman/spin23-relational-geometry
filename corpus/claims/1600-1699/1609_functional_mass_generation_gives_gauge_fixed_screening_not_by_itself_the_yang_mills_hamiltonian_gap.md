# Functional Mass Generation Gives Gauge-Fixed Screening, Not by Itself the Yang--Mills Hamiltonian Gap

**Date:** 21 October 2026

**Gates:** A1, A2, A3, A4, A6, A7, A8 and A11

**Status:** finite propagator, reflection-positivity, gap-equation, Schwinger-pole and physical-correlator audit; the functional shortcut is exhausted without exact BRST closure and positive gauge-invariant reconstruction

**Depends on:** [the constructive Yang--Mills gate](../1500-1599/1590_four_dimensional_yang_mills_mass_gap_is_a_constructive_qft_gate_not_a_group_theory_corollary.md), [the six-gap firewall](../1500-1599/1593_six_inequivalent_gaps_require_a_type_firewall_before_the_yang_mills_problem_can_join_spin23.md), and [the explicit minimal Spin(2,3) spectrum](../1500-1599/1596_the_explicit_minimal_spin23_action_has_only_the_massless_graviton_and_torsion_square_does_not_create_a_gap.md)

**Evidence:** [functional mass-generation ledger](../../../evidence/data/spin23-functional-ym-mass-generation-audit.json) and [deterministic verifier](../../../verification/verify/verify_spin23_functional_ym_mass_generation_audit.mjs)

## Result

Dyson--Schwinger equations (DSEs), the functional renormalisation group (FRG)
and the Schwinger mechanism provide strong evidence that Landau-gauge
Yang--Mills Green functions develop an infrared scale. They also support
quantitatively successful glueball calculations. But a finite gauge-fixed
gluon propagator at zero momentum is neither a positive one-particle pole nor
a proof of a gap in the gauge-invariant Hamiltonian spectrum.

The exact boundary is

\[
\boxed{
\Delta_A(0)<\infty
\ \not\Rightarrow\
\rho_A\ge0
\ \not\Rightarrow\
\operatorname{spec}(H_{\rm phys})\cap(0,\Delta)=\varnothing .}
\]

Functional equations can bridge these statements only after the complete
hierarchy, Slavnov--Taylor identities, renormalised BRST cohomology,
gauge-invariant bound-state kernels and positive continuum reconstruction are
controlled together. Current truncations do not constitute that theorem.

## Same screening mass, opposite spectral meaning

Compare two Euclidean scalar dressings, in dimensionless units,

\[
D_+(p^2)={1\over p^2+1},
\qquad
D_G(p^2)={p^2+1\over p^4+p^2+1}.
\]

Both have \(D(0)=1\), so the commonly used screening definition
\(m_{\rm scr}^2=D(0)^{-1}\) gives \(m_{\rm scr}=1\) in both cases. But
\(D_+\) has a positive Källén--Lehmann delta measure and

\[
C_+(t)={1\over2}e^{-|t|}>0.
\]

The Gribov--Stingl witness has complex-conjugate \(p^2\) poles
\(-\tfrac12\pm i\tfrac{\sqrt3}{2}\) and zero-spatial-momentum correlator

\[
C_G(t)={1\over\sqrt3}e^{-\sqrt3|t|/2}\cos(|t|/2).
\]

Numerically,

\[
C_G(0)=0.577350,\quad C_G(2)=0.0551895,\quad
C_G(4)=-0.00752048.
\]

The \(2\times2\) Hankel minor

\[
\det\begin{pmatrix}C_G(0)&C_G(1)\\C_G(1)&C_G(2)\end{pmatrix}
=-0.0135550
\]

is negative. Hence no nonnegative Källén--Lehmann measure represents this
propagator, despite its finite nonzero screening scale. This is admissible for
a gauge-fixed color field in an indefinite BRST state space and is commonly
interpreted as excluding the gluon from the physical spectrum. It does not by
itself establish that every gauge-invariant color-singlet excitation lies
above a common positive energy.

## Nonlinear gap equations generate scales but inherit closure data

An exact DSE is one equation in an infinite coupled hierarchy; an exact FRG
flow contains the full effective action. Practical calculations close vertex
and tensor sectors. The finite toy equation

\[
m^2=\lambda m^2\log(1+\Lambda^2/m^2)
\]

has a zero solution and, for \(\lambda>0\), the nonzero branch

\[
{m\over\Lambda}=[e^{1/\lambda}-1]^{-1/2}.
\]

For \(\lambda=(0.2,0.5,1)\), this gives
\(m/\Lambda=(0.0823629,0.395623,0.762874)\). Thus nonlinear self-consistency
can generate an exponentially small scale, but its value changes strongly
with the effective kernel coefficient. In the real hierarchy, vertex
closures, renormalisation conditions, regulator consistency and infrared
boundary data play this role. In particular, scaling versus decoupling
solutions can be selected by infrared boundary conditions while sharing the
same perturbative ultraviolet theory.

This does not make functional calculations arbitrary. Self-consistent vertex
expansions, comparison among DSE/FRG/lattice results, regulator variation and
Slavnov--Taylor checks progressively constrain the answer. It does mean that
apparent convergence within a truncation is evidence, not the uniform
constructive bound demanded by the mass-gap problem.

## The Schwinger mechanism preserves transversality through a pole

A gauge-boson inverse dressing can take the infrared form

\[
\Delta^{-1}(q^2)=q^2J(q^2)+m^2(q^2)
\]

without an explicit Proca term if vertices develop longitudinally coupled
massless poles. At the elementary tensor level,

\[
\Pi_{\mu\nu}(q)=m^2\left(\delta_{\mu\nu}-{q_\mu q_\nu\over q^2}\right)
\]

obeys \(q_\mu\Pi_{\mu\nu}=0\) while containing the longitudinal \(1/q^2\)
structure required to reconcile a nonzero infrared inverse propagator with
the Slavnov--Taylor identities. For the finite vectors \((0.3,0.4)\),
\((1,2)\) and \((-2,1)\), direct contraction vanishes to rounding accuracy;
the projector eigenvalues are \((1,0)\).

This pole is part of a composite longitudinal vertex. It is not automatically
a positive-norm massless asymptotic particle. A complete account must show
that the pole activates the transverse self-energy, that all pole residues
satisfy the coupled Slavnov--Taylor identities, and that unphysical massless
excitations cancel in BRST cohomology. Conversely, the disappearance of a
colored gluon pole is not the existence proof for a lowest color-singlet pole.

## What a physical gap witness looks like

For contrast, supply a positive gauge-invariant toy correlator

\[
C_{\cal O}(t)=0.8e^{-1.6t}+0.2e^{-2.4t},
\qquad {\cal O}\sim {\rm tr}\,F^2.
\]

Its values at integer \(t=0,\ldots,5\) are

\[
(1, 0.179661, 0.0342557, 0.00673311,
0.00134279, 0.000269599).
\]

The effective masses
\(\log[C(t)/C(t+1)]\) descend from \(1.71668\) to \(1.60557\), approaching
the supplied lowest mass \(1.6\). Its \(2\times2\) reflection/Hankel minor is
positive, \(0.00197771\); the \(3\times3\) determinant vanishes because the
toy has exactly two states. This is the correct logic: positivity plus a
gauge-invariant spectral representation lets exponential decay reveal a gap.
The example assumes those ingredients and therefore illustrates the target;
it does not derive them from the gluon propagator.

Functional glueball Bethe--Salpeter calculations move in this correct
direction by constructing color-singlet poles from propagators and matched
kernels. Existing computations are truncated and set the overall physical
scale externally (often from lattice data). Agreement with lattice spectra is
high-value evidence, but it is not an all-channel lower bound, proof of
positivity, or regulator-independent construction of four-dimensional
Yang--Mills.

## Exact admission conditions

A functional proof route must supply all of the following:

1. a regulator-defined continuum measure or equivalent exact solution of the complete DSE/FRG hierarchy;
2. closure under every Slavnov--Taylor identity, including the longitudinal pole vertices, with anomaly-free renormalisation;
3. a nilpotent renormalised BRST charge and a positive physical Hilbert space \(\ker Q/\operatorname{im}Q\), or an equivalent gauge-invariant construction avoiding the Gribov obstruction;
4. gauge-parameter independence of physical poles, controlled for example by Nielsen identities;
5. Bethe--Salpeter kernels derived consistently from the same effective action, including ghosts and all channels that can lie below the candidate state;
6. positive spectral measures for a separating family of gauge-invariant local operators;
7. infinite-volume, regulator-removal and continuum limits with a uniform positive lower bound above the vacuum.

Slavnov--Taylor identities alone enforce gauge covariance of the hierarchy;
they do not establish positivity or bound-state completeness. BRST closure
alone removes gauge artifacts; it does not calculate the lowest cohomology
energy. A finite glueball spectrum alone does not exclude a lighter state in
an omitted channel. The three layers must close together.

## Spin(2,3) connection: methodology only

The functional result supplies no group-theoretic scale map to Spin(2,3).
What transfers is the pole discipline. A gauge-fixed Spin(2,3) connection
component may have a saturated two-point dressing without representing a
physical massive torsion or graviton state. The broken theory must instead be
reduced by its constraints/BRST cohomology and tested through gauge-invariant
curvature or matter observables. It must retain the positive-residue massless
Einstein spin-2 pole while any claimed auxiliary gap appears as a separate
positive physical pole or threshold.

Therefore:

\[
\boxed{
\text{functional screening is useful evidence and a calculational engine,}
\quad\text{not a scale bridge or mass-gap theorem.}}
\]

The route reopens as a proof only if the seven admission conditions are met.
Short of that, its highest-value programme role is quantitative: improve
symmetry-complete truncations, compute gauge-invariant glueball channels, test
gauge/regulator stability and cross-check lattice spectral information.

## Primary sources

- J. Schwinger, [*Gauge Invariance and Mass. II*](https://doi.org/10.1103/PhysRev.128.2425), *Phys. Rev.* **128** (1962) 2425.
- J. M. Cornwall, [*Dynamical Mass Generation in Continuum Quantum Chromodynamics*](https://doi.org/10.1103/PhysRevD.26.1453), *Phys. Rev. D* **26** (1982) 1453.
- C. S. Fischer, A. Maas and J. M. Pawlowski, [*On the infrared behavior of Landau gauge Yang--Mills theory*](https://arxiv.org/abs/0810.1987), for the scaling/decoupling boundary-condition analysis.
- R. Alkofer, W. Detmold, C. S. Fischer and P. Maris, [*Analytic properties of the Landau gauge gluon and quark propagators*](https://arxiv.org/abs/hep-ph/0309077), *Phys. Rev. D* **70** (2004) 014014.
- A. Cucchieri, T. Mendes and A. R. Taurines, [*Positivity violation for the lattice Landau gluon propagator*](https://arxiv.org/abs/hep-lat/0406020), *Phys. Rev. D* **71** (2005) 051902.
- A. K. Cyrol et al., [*Landau gauge Yang--Mills correlation functions*](https://arxiv.org/abs/1605.01856), for a self-consistent FRG vertex expansion.
- A. C. Aguilar et al., [*Schwinger poles of the three-gluon vertex: symmetry and dynamics*](https://arxiv.org/abs/2306.16283), for longitudinal pole residues and Slavnov--Taylor constraints.
- M. Q. Huber, C. S. Fischer and H. Sanchis-Alepuz, [*Spectrum of scalar and pseudoscalar glueballs from functional methods*](https://arxiv.org/abs/2004.00415), for a self-contained DSE/BSE truncation whose scale is fixed from lattice input.
