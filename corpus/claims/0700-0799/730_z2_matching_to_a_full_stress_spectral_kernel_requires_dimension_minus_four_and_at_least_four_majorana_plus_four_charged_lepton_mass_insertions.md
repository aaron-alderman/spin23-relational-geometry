# (Z_2) Matching to a Full Stress Spectral Kernel Requires Dimension (-4) and at Least Four Majorana Plus Four Charged-Lepton Mass Insertions

**Date:** 17 October 2026  
**Branches:** B01, B03, B04, B05, B06, B08, B09, B11, B13, B14 and the stress form-factor branch  
**Claim status:** exact engineering-dimension and analytic spurion-count lower bound; perturbative loop order remains open  
**Certificate:** [verify_z2_stress_matching_dimension_and_spurion_insertion_lower_bound.mjs](../../../verification/verify/verify_z2_stress_matching_dimension_and_spurion_insertion_lower_bound.mjs)

## Executive result

The complex weak-basis scalar is

\[
Z_2
=\operatorname{Tr}(H_\ell H_\nu G_{\ell\nu}),

\]

with

\[
H_\ell=M_\ell M_\ell^\dagger,
\qquad
H_\nu=m_\nu m_\nu^\dagger,
\qquad
G_{\ell\nu}=m_\nu H_\ell^*m_\nu^\dagger.

\]

After electroweak breaking,

\[
[Z_2]=8.

\]

For an unfactored momentum-space stress two-point kernel in four dimensions,

\[
\left[
\int d^4x\,e^{iqx}
\langle T_{\mu\nu}(x)T_{\rho\sigma}(0)\rangle
\right]
=4.

\]

Therefore a matching

\[
E+iI=g_{TT}(s,q^2;\mu)Z_2

\]

requires

\[
\boxed{[g_{TT}]=-4.}

\]

The flavor word contains exactly:

\[
\boxed{
4\text{ Majorana-mass insertions}
+4\text{ charged-lepton-mass insertions}.
}

\]

This is an exact analytic-spurion lower bound. It is not yet a loop-order theorem.

## 1. Dimension of the stress spectral matrix

In (d=4), the stress tensor has engineering dimension four. The Fourier-transformed two-point function has

\[
2[T]-d=8-4=4.

\]

For a dispersion relation

\[
\Pi(q^2)
=\int ds\,
\frac{\rho(s)}{s-q^2-i0},

\]

the measure and denominator both have dimension two. Hence

\[
[\rho]=[\Pi]=4.

\]

After contraction with dimensionless conserved polarization probes, the two-by-two spectral Gram entries (t,E,I) retain this dimension.

## 2. The reduced-form-factor convention

Stress correlators are often written with an explicit momentum tensor carrying four powers of (q):

\[
\Pi_{\mu\nu,\rho\sigma}(q)
=q^4P_{\mu\nu,\rho\sigma}(q)\widehat\Pi(q^2).

\]

Then the reduced scalar (widehat\Pi) is dimensionless. In that convention,

\[
[\widehat g_{TT}]=-8.

\]

The (-4) and (-8) statements refer to different placements of the explicit kinematic (q^4). They must not be compared without fixing the convention.

## 3. Exact broken-phase insertion count

Expand the word:

\[
Z_2
=\operatorname{Tr}
\left[
(M_\ell M_\ell^\dagger)
(m_\nu m_\nu^\dagger)
(m_\nu M_\ell^*M_\ell^Tm_\nu^\dagger)
\right].

\]

It contains:

- two charged-lepton masses in the first (H_\ell);
- two more in the conjugated (H_\ell^*) inside (G_{\ell\nu});
- two Majorana masses in (H_\nu);
- two more in (G_{\ell\nu}).

Hence the total is four plus four.

Any perturbative coefficient analytic in the flavor spurions must reach at least this order before it can contain (Z_2).

## 4. Unbroken electroweak counting

Use schematically

\[
M_\ell\sim vY_\ell,
\qquad
m_\nu\sim v^2C_5.

\]

Then

\[
\boxed{
Z_2
\sim
v^{12}Y_\ell^4C_5^4.
}

\]

Since ([C_5]=-1), this has dimension

\[
12-4=8,

\]

as required.

Thus an unbroken-phase diagram or operator matching must contain at least:

- four charged-lepton Yukawa spurions;
- four Weinberg coefficients;
- the corresponding twelve Higgs fields or vacuum insertions after symmetry breaking.

## 5. Type-I seesaw scaling

For

\[
C_5\sim Y_\nu M_R^{-1}Y_\nu^T,

\]

four (C_5) factors imply at least

\[
Y_\nu^8M_R^{-4}

\]

in addition to (Y_\ell^4), before index contractions and loop factors are counted.

This makes the Majorana response parametrically high order in a conventional seesaw completion. It does not prove the coefficient is numerically negligible in every ultraviolet model.

## 6. Why this is not a loop-order theorem

Spurion insertions do not uniquely determine graph topology. Several insertions can occur on one loop, on multiple loops, through effective vertices, or through resummed propagators.

The following remain to be specified:

- how charged-lepton and neutrino lines are connected by weak/Higgs interactions;
- how four lepton-number-violating coefficients combine to net zero external lepton number;
- where the two stress insertions attach;
- whether lower-order terms vanish by flavor trace identities;
- and whether operator mixing generates the word indirectly.

Accordingly, “at least four plus four spurions” is proved; “first appears at (L) loops” is not.

## 7. Scope of the lower bound

The count assumes analytic polynomial dependence on the spurions. It may be reorganized by:

- inverse mass matrices from integrating out fields;
- normalized spectral projectors containing eigenvalue denominators;
- nonperturbative resummation;
- degenerate limits with singular coordinate charts.

Such reorganizations must reproduce the same weak-basis invariant and cannot be used to claim genuinely lower physical flavor order without an explicit finite amplitude.

## 8. Stop-everything criteria

Stop quoting a matching dimension without stating whether the kinematic (q^4) has been factored out.

Stop claiming a low-order Majorana stress effect from one or two mass insertions when the target invariant is (Z_2).

Stop converting the spurion count directly into a loop count.

Stop using inverse flavor invariants to evade the count unless the amplitude is finite and nonsingular at degeneracy.

Stop the measurable Majorana-stress branch if the first allowed diagrams are parametrically beyond any conceivable sensitivity and no lower-order independent invariant exists.

## 9. Highest-value next calculations

1. Draw the lowest-topology electroweak diagrams containing four (C_5), four (Y_\ell) and two stress insertions.
2. Test flavor traces before evaluating integrals to identify algebraic zeros.
3. Compare with independent lower-degree CP-odd weak-basis invariants in three families.
4. Determine whether a non-vacuum or LNV external channel accesses Majorana CP at lower order.
5. Estimate the seesaw and loop suppression only after a nonzero topology is established.

## Companion documents

- [Spectral half-trace carrier coordinate](729_half_the_trace_of_a_positive_two_probe_spectral_gram_is_the_canonical_carrier_coordinate_but_z2_matching_remains_a_form_factor_gate.md)
- [Weak-basis invariant and spurion order](718_the_majorana_alignment_obstruction_requires_a_charged_lepton_weak_basis_invariant_and_is_high_spurion_order.md)
- [CP-odd source operator dimension ladder](720_the_lowest_dimension_cp_odd_response_sources_form_a_gauge_phase_and_metric_relevance_ladder.md)
