# The Known RG Slice Cannot Identify an Interacting One-Eighth Axial Fixed Point

**Date:** 23 October 2026

**Status:** exact beta-function non-identifiability result and fixed-point false-analogy audit

**Depends on:** [the perturbative RG selection no-go](1739_no_unbroken_symmetry_can_fix_the_minimal_axial_coefficient_and_perturbative_rg_does_not_select_one_eighth.md), [the critical-PGT beta information-rank audit](../1600-1699/1639_the_known_normal_beta_data_have_rank_two_and_the_exact_critical_pgt_loop_is_the_irreducible_missing_calculation.md), and [the quantization-packet gate](../1600-1699/1640_the_critical_spin23_loop_is_not_yet_well_posed_without_a_complete_quantization_packet.md)

**Evidence:** [identifiability ledger](../../../evidence/data/spin23-axial-fixed-point-identifiability-v1.json) and [verifier](../../../verification/verify/verify_spin23_axial_fixed_point_identifiability.mjs)

## Result

The published matter-background beta function

\[
 \beta_\eta(\eta,h,g=0)=a\eta h^2,\qquad a>0,
\]

is only a restriction of the unknown matter--gravity beta functional to a
zero-gravity slice.  It establishes that the ordinary perturbative equation
does not select \(\eta=1/8\), but it contains no information that can decide
whether a nonzero gravitational fixed point selects that value.

This is an exact identifiability statement, not merely an appeal to missing
calculation.  Three complete functions can agree with every value of the
known slice while giving incompatible answers:

\[
\begin{aligned}
 \beta_+&=a\eta h^2+g(\eta-1/8),\\
 \beta_R&=a\eta h^2+g(\eta-1/3),\\
 \beta_-&=a\eta h^2-g(\eta-1/8).
\end{aligned}
\]

All reduce identically to the published expression at \(g=0\).  At the
interacting witness point \((h,g)=(0,1)\), however, \(\beta_+\) fixes
\(\eta=1/8\), \(\beta_R\) rejects it, and \(\beta_-\) fixes it with the
opposite local slope.  Therefore the known data determine neither fixedness
nor even the sign of the local \(\eta\)-direction.

## Why this does not yet assign a critical exponent

In a real truncation the axial coefficient mixes with gravity, torsion,
four-fermion and other matter couplings.  The physical linearized data are the
eigenvalues and eigenvectors of

\[
 B_{ij}=\left.{\partial\beta_i\over\partial g_j}\right|_{g_*},
\]

not the single partial derivative \(\partial\beta_\eta/\partial\eta\).
Consequently even a future zero of \(\beta_\eta\) at \(1/8\) would not show
that the coefficient is predicted: the UV critical surface must make its
infrared value insensitive to an independent boundary datum, and the full
trajectory must survive threshold matching.

## The Immirzi fixed-point analogy does not close the gap

First-order gravity studies have found fixed points for the Holst/Immirzi
coupling in particular Euclidean truncations.  That coupling multiplies a
gravitational parity-odd invariant.  It is not the independent coefficient of
\(S_\mu\bar\psi\gamma^\mu\gamma_5\psi\).  Fermions can make the Immirzi
parameter observable through induced four-fermion terms, but this does not
identify the axial Wilson coefficient with it or turn a fixed point at
\(|\gamma|=1\) into \(|\eta|=1/8\).

The distinction is reinforced by functional-RG work: changing from metric,
tetrad-only, Einstein--Cartan, or metric--torsion field spaces changes the
universality-class question and requires additional field-space and
truncation input.  A fixed point in a neighboring theory space is evidence
for a possible route, not a beta-function row for the present critical
Spin(2,3) action.

## Minimum reopening packet

A genuine prediction requires one joined object:

1. a declared Spin(2,3) matter--gravity truncation containing every operator
   that mixes with the axial coupling;
2. its complete beta vector and a simultaneous fixed point;
3. the full stability matrix, with regulator, gauge and truncation tests;
4. a unitary Lorentzian spectrum or equivalent reconstruction; and
5. an RG trajectory with scale-, scheme- and threshold-declared matching to
   the low-energy coefficient.

Until then the interacting-fixed-point escape is mathematically open but has
zero present identifying power for \(1/8\).

## Sources

- I. L. Shapiro, [*Physical Aspects of the Space-Time Torsion*](https://arxiv.org/abs/hep-th/0103093), for the independent nonminimal axial coupling and its perturbative running.
- D. Benedetti and S. Speziale, [*Perturbative Quantum Gravity with the Immirzi Parameter*](https://arxiv.org/abs/1104.4028), for the distinct Immirzi-flow example.
- J.-E. Daum and M. Reuter, [*Einstein--Cartan Gravity, Asymptotic Safety, and the Running Immirzi Parameter*](https://arxiv.org/abs/1301.5135), for the independent-connection universality-class analysis.
- M. Reuter and G. M. Schollmeyer, [*The Metric on Field Space, Functional Renormalization, and Metric-Torsion Quantum Gravity*](https://arxiv.org/abs/1509.05041), for field-space dependence of the functional flow.

## Reproduction

~~~powershell
node verification/verify/verify_spin23_axial_fixed_point_identifiability.mjs
~~~
